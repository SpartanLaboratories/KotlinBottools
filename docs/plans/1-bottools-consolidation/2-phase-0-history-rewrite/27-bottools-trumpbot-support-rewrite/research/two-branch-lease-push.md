# Pushing a repository's two rewritten branches under a lease each: one push with `--atomic`, one push without it, or one push per branch

Researched 2026-11-13. Applies to git 2.55.0.windows.5 (the version run in the local experiment) and git `v2.55.0` source and
documentation, and to GitHub.com as documented in `github/docs` (`main`, read 2026-11-13) and in public logs of 2024 to 2026.
Nothing was written to GitHub: its behaviour is read from its documentation and from logs people posted publicly, and git's
behaviour was measured on bare repositories that stand in for the server. The tools this unit changes are Bash and Python; the
idioms judged are shell and awk.

## 1. Question and the decision it informs

BotTools (`main`, `Working-Branch`) and TrumpBot (`main`, `feature/pokercommand`) each have two branches; Support has one,
which the established one-ref form covers. Which form pushes the two rewritten branches of one repository: **(a)** one push of
both refspecs with an explicit lease on each and `--atomic`, **(b)** the same without `--atomic`, or **(c)** two pushes, one
per branch in the one-ref form, as two requests or as two pushes inside one request?

The answer decides whether a repository's push is one request or two, what the job's grant names, which classes and hand-back
states the push step needs (including a "one ref updated" state), and what the tools part changes in the push preparation, the
procedure's guards, the classifier and the per-ref verification.

An answer has to meet these requirements: no branch that moved since the mirror was cloned is overwritten; nothing is created
or deleted on the server; `refs/pull/*` are untouched; the outcome is read from the exit status, the porcelain lines and fixed
markers counted in an error file that is never printed; the destination is the repository's URL (a mirror-configured `origin`
refuses a refspec); `gh auth git-credential` is the only credential helper; the request service runs a request's entries as one
shell.

## 2. Bottom line

- **Use (a): one push per repository, both refspecs, an explicit lease on each branch, and `--atomic`, preceded by the same
  command with `--dry-run`.** It is the only form that leaves the server in one of two states, "neither ref updated" or "both
  updated", whatever fails after the push has started. Without `--atomic` every failure that concerns one ref alone (a stale lease, an
  `update` hook, a ref that moves during the push, a refspec with no lease) leaves exactly one ref updated, and the lease
  does not prevent it (observed, rows 2, 3, 5, 6, 9 and 10 of 4.2).
- **The expected tally of a clean push of two forced refs is `forced=2 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0
  done=1 pull_lines=0 other_refs=0 bad=0`, exit status 0, with or without `--atomic`** (observed). The dry run prints the same
  tally and exits 0. So the tally does not change with the form; the failure rows do.
- **The dry run catches a stale lease in every form (exit 1, a `(stale info)` line) and catches nothing the server decides**:
  a hook or push-protection refusal, a ref that moves after the push's own advertisement, and a lost connection all pass the
  dry run clean (observed). The dry run is therefore a gate only against a branch that moved before it. Pushing after a dry run
  that showed a stale lease is the one way to a "one ref updated" state without `--atomic` on a stale lease, which is why the
  procedure stops on the dry run's tally.
- **A lost connection reads as a lone `Done` on stdout, no `To` line, exit status 1, and `fatal:` markers on stderr; it can
  leave neither ref or both, in either form** (observed over HTTP). The exit status alone cannot say which; a read-back of both
  refs does. The phase's tally reads the lone `Done` as `done=0 bad=1`, so the classifier needs a transport class that does
  not depend on the exit status being 128.
- **Whether GitHub applies an atomic push all or nothing on its own side is not documented.** It advertises the `atomic`
  capability (recorded earlier), git documents the capability as one transaction, and one public GitHub log of a refused
  branch shows the sibling tag refused as `(atomic transaction failed)` with a client that passes `--atomic`. That is one
  report, not a guarantee, so the push step keeps a "partial" hand-back state that read-back can name, even though (a) should
  never reach it.
- **The forms publish the same things.** A push of two branches is documented as one push event per ref (`ref`, `before`,
  `after`, `forced` are singular fields), so each form produces, per rewritten branch, one `force_push` activity entry, one
  `PushEvent` and one push delivery to BotTools' webhook: 2 each for BotTools. Each can be counted by a filter that prints
  only a number; the delivery list carries no payload.

## 3. Current state the findings start from

- The established one-ref form, its guards, its expected tally and its marker classes are in
  [`force-push-and-push-protection.md`](../../26-gkb2-gkb-rewrite/research/force-push-and-push-protection.md) §6 and
  [the earlier unit's plan](../../26-gkb2-gkb-rewrite/plan.md) ("The push", "The requests"). That form asserts the argument
  list free of `--force`, `-f`, `--mirror`, `--all`, `--delete`, `--prune`, `--atomic` and a leading `+`, and says `--atomic`
  "is not used: one ref makes it redundant".
- GitHub's receive-pack advertisement lists `atomic` among its capabilities and lists `refs/heads/*` only, never
  `refs/pull/*` ([`github-residual-exposure-and-visibility.md`](../../research/github-residual-exposure-and-visibility.md) §3.2).
- The phase's `porcelain_tally.awk` reads stdout, treats line 1 as the `To` line, counts flag columns, and prints the fixed
  tally line.
- BotTools has one webhook, subscribed to push events among others, with no delivery in GitHub's retained window; TrumpBot
  and Support are private; push protection for users applies to pushes to public repositories only.

## 4. Findings

### 4.1 What git does with several leases and with `--atomic` (documented, source, observed)

- **Documented, `v2.55.0`** ([`git-push.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/git-push.adoc)):
  `--force-with-lease=<refname>:<expect>` "will protect _<refname>_ (alone)", so two options protect two refs, one each.
  `--atomic`: "Use an atomic transaction on the remote side if available. Either all refs are updated, or on error, no refs are
  updated. If the server does not support atomic pushes the push will fail." `--dry-run`: "Do everything except actually send
  the updates." The wire capability: "If the pushing client requests this capability, the server will update the refs in one
  atomic transaction. Either all refs are updated or none."
  ([`gitprotocol-capabilities.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/gitprotocol-capabilities.adoc).)
- **Source, the client.** A stale lease is determined on the client, from the advertised value, before anything is sent. Over HTTPS
  the path is `push_refs_with_push` in [`transport-helper.c`](https://github.com/git/git/blob/v2.55.0/transport-helper.c): for a
  ref whose status is `REF_STATUS_REJECT_STALE` (or non-fast-forward, already-exists, remote-updated) it does
  `if (atomic) { reject_atomic_push(remote_refs, mirror); ... return 0; } else continue;`, so under `--atomic` nothing is sent
  and the other refs are relabelled; without it the ref is skipped and the others go. Over `git://`, ssh and file transports the
  same rule is in `send_pack` in [`send-pack.c`](https://github.com/git/git/blob/v2.55.0/send-pack.c), whose comment reads "When
  we know the server would reject a ref update if we were to send it and we're trying to send the refs atomically, abort the
  whole operation." `reject_atomic_push` in [`remote.c`](https://github.com/git/git/blob/v2.55.0/remote.c) ("Mark other refs as
  failed") sets `REF_STATUS_ATOMIC_PUSH_FAILED` on every other ref that was not already rejected; `transport.c` prints it as
  `[rejected] (atomic push failed)`.
- **Source, git's own server.** `execute_commands_atomic` in
  [`builtin/receive-pack.c`](https://github.com/git/git/blob/v2.55.0/builtin/receive-pack.c) opens one ref transaction, and on
  the first failing command stops and labels every other command `"atomic push failure"` (or `"atomic transaction failed"` when
  the commit of the transaction itself fails); `execute_commands_non_atomic` updates refs one at a time and labels only the
  failing one. A `pre-receive` hook is outside both: "If the pre-receive hook exits with a non-zero exit status no updates will
  be performed" ([`git-receive-pack.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/git-receive-pack.adoc)), so a
  hook of that kind refuses every ref of the push whatever the flags. Only an `update` hook (run once per ref) or a lock or
  old-value failure is per ref.
- **Documented, porcelain statuses.** `rejected`: "Git did not try to send the ref at all, typically because it is not a
  fast-forward and you did not force the update."; `remote rejected`: "The remote end refused the update."; `remote failure`:
  "The remote end did not report the successful update of the ref, perhaps because of a temporary error on the remote side, a
  break in the network connection, or other transient error." The status `[remote failure]` did not appear in the lost
  connection experiments below (4.2): the push died before any per-ref line.

### 4.2 The local experiment (observed)

Setup, all in a scratch folder outside every repository, git 2.55.0.windows.5: bare "server" repositories with `main`, `work`
and a hidden `refs/pull/2/head` (`receive.hideRefs=refs/pull`, `http.receivepack=true`), served over smart HTTP by `git
http-backend` behind a small Python wrapper, so that the client takes the same `git-remote-curl` and transport-helper path as
a push to GitHub over HTTPS and only the server is a stand-in; a bare mirror made by `git clone --mirror` of that URL (its
`origin` is mirror-configured, so the URL is the destination); both branches rewritten to new root commits (non-fast-forward);
the push command is the established form with two leases:

```
git -C <mirror> push [--dry-run] --porcelain \
  --force-with-lease=refs/heads/main:<old main> --force-with-lease=refs/heads/work:<old work> [--atomic] \
  <url> refs/heads/main:refs/heads/main refs/heads/work:refs/heads/work
```

Tallies are the phase's awk with the `To` host pattern widened to the local host. F = `forced`, R = `rejected`, D = `done`,
bad = `bad`. "Server after" is read directly from the server repository: neither, both, or ONE (a single ref updated). Each
row ran dry run first, then the real push, in a fresh repository pair; exit status is of the real push unless the dry run is
named.

| # | Situation | Form | Dry run | Real push: stdout porcelain, tally, exit, stderr markers | Server after |
|---|---|---|---|---|---|
| 1 | clean | a or b | exit 0, F=2 D=1 bad=0 | `+` both `(forced update)`, F=2 D=1 bad=0, exit 0, no marker | both |
| 2 | lease stale on the second ref (moved before the dry run) | a | exit 1: `!` first `[rejected] (atomic push failed)`, `!` second `[rejected] (stale info)`; F=0 R=2 D=1 bad=2 | identical to the dry run, exit 1; stderr only `failed to push some refs`; nothing sent | neither |
| 2 | same | b | exit 1: `+` first, `!` second `(stale info)`; F=1 R=1 D=1 bad=1 | identical, exit 1 (the push, if run anyway, sends the first ref) | **ONE** (first) |
| 3 | lease stale on the first ref | a | as row 2 with the labels swapped | as row 2 | neither |
| 3 | same | b | `!` first `(stale info)`, `+` second | identical | **ONE** (second) |
| 4 | `pre-receive` hook refuses (it refuses by the second ref) | a or b | exit 0, clean F=2 (the dry run cannot see a hook) | exit 1: both `!` `[remote rejected] (pre-receive hook declined)`; F=0 R=2 D=1 bad=2; stderr one `remote:` line and `failed to push some refs` | neither |
| 5 | `update` hook refuses the second ref (per ref) | a | exit 0, clean | exit 1: first `!` `[remote rejected] (atomic push failure)`, second `!` `[remote rejected] (hook declined)`; F=0 R=2 D=1 bad=2; stderr two `remote:` lines | neither |
| 5 | same | b | exit 0, clean | exit 1: first `+` forced, second `!` `[remote rejected] (hook declined)`; F=1 R=1 D=1 bad=1 | **ONE** (first) |
| 6 | `update` hook refuses the first ref | a | exit 0, clean | exit 1: first `(hook declined)`, second `(atomic push failure)`; F=0 R=2 | neither |
| 6 | same | b | exit 0, clean | exit 1: first `!` `(hook declined)`, second `+` forced; F=1 R=1 | **ONE** (second) |
| 7 | connection lost before the server applies (reply dropped on the push request) | a or b | exit 0, clean (a dry run never makes that request) | exit 1; stdout is a lone `Done`; tally `done=0 bad=1`; stderr `RPC failed; curl 52 Empty reply from server`, `unexpected disconnect while reading sideband packet`, `fatal: the remote end hung up unexpectedly`; no per-ref line | neither |
| 8 | connection lost after the server applied (report dropped) | a or b | exit 0, clean | identical to row 7 | **both** |
| 9 | the second ref moves after the push's own advertisement, before the update (the server-side old-value check) | a | exit 0, clean | exit 1: both `!` `[remote rejected] (atomic transaction failed)`; F=0 R=2; stderr one `remote:` line `cannot lock ref ... is at ... but expected ...` | neither |
| 9 | same | b | exit 0, clean | exit 1: first `+` forced, second `!` `[remote rejected] (incorrect old value provided)`; F=1 R=1; one `remote:` line | **ONE** (first) |
| 10 | only the first refspec has a lease | a | exit 1, F=0 R=2: second `[rejected] (non-fast-forward)`, first `(atomic push failed)` | as dry run | neither |
| 10 | same | b | exit 1, F=1 R=1 | as dry run | **ONE** |
| 11 | the server does not advertise `atomic` (`receive.advertiseatomic=false`) | a | exit 1, empty stdout, stderr `fatal: the receiving end does not support --atomic push` | same, nothing sent | neither |

Every row left `refs/pull/2/head` unchanged. Exit status was 1 for every refusal and for the two lost-connection rows, and 128
in the separate case of a repository the server could not find (no porcelain line). `Done` was printed in every row where the
transport finished and in the two lost-connection rows.

Two-pushes form (c), one-ref form each, dry runs of both first (observed):

| Situation | Dry runs | Pushes | Server after |
|---|---|---|---|
| second branch moved before the dry runs | first exit 0 F=1; second exit 1 R=1 `(stale info)` | not run (the dry run's tally stops the procedure) | neither |
| second branch moves after both dry runs, between the pushes | both exit 0, F=1 | first exit 0 F=1; second exit 1 R=1 `(stale info)` | **ONE** (first) |
| `update` hook refuses the second | both exit 0 | first exit 0 F=1; second exit 1 R=1 `[remote rejected] (hook declined)` | **ONE** (first) |

### 4.3 Does GitHub apply an atomic push all or nothing? (documented capability; one public log; not established)

- **Documented.** Git's own text above defines the capability as one transaction. GitHub's 2015 announcement of `--atomic` in
  git 2.4 says "The `--atomic` option guarantees that either all three references will be updated on the remote, or none of them
  will." and adds "Please note that `git push --atomic` is still somewhat experimental, and it is possible to experience partial
  updates if you try to push something unusual." ([GitHub blog, 2015-04-30](https://github.blog/2015-04-30-git-2-4-atomic-pushes-push-to-deploy-and-more/).)
  The post is about git, not about GitHub's servers. GitHub's documentation, searched for atomic pushes, has no statement about
  its own server's behaviour.
- **Advertised.** GitHub's receive-pack advertisement lists `atomic` (observed in the earlier findings, §3.2 of
  `github-residual-exposure-and-visibility.md`). With `--atomic` and a server that does not advertise it the push stops with
  nothing sent (row 11), so the capability's presence is checked by the dry run itself.
- **One public log.** A user of a release tool that passes `--atomic` (the tool's source:
  [`packages/nx/src/command-line/release/utils/git.ts`](https://github.com/nrwl/nx/blob/master/packages/nx/src/command-line/release/utils/git.ts),
  argument list `'--follow-tags', '--no-verify', '--atomic'`) pushed a branch and a tag to a protected branch on github.com and
  got `remote: error: GH006: Protected branch update failed for refs/heads/main.`, `! [remote rejected] main -> main (protected
  branch hook declined)` and `! [remote rejected] @<scope>/<name>/v0.2.1 -> @<scope>/<name>/v0.2.1 (atomic transaction failed)`
  ([nrwl/nx#28141](https://github.com/nrwl/nx/issues/28141), 2024-09-26). The second line carries git's own sibling wording
  from the table above, which is consistent with GitHub running git's atomic path and refusing the whole push when one ref is
  refused. One report; the tag's actual server state was not read in it.
- **Not found.** Any statement of what GitHub does when an atomic push loses a race on one ref, or whether its custom
  refusals (rulesets, push protection, protected branches) are evaluated per ref or per push when `--atomic` is absent.
  A release tool's change that adds `--atomic` to a branch-and-tag push describes the state without it as "typically leaving
  the tag pushed but the branch behind" and shows it with a test fixture, not with GitHub
  ([Extra-Chill/homeboy#14578](https://github.com/Extra-Chill/homeboy/pull/14578), 2026-09-11): the one-ref-updated state
  this unit avoids.

### 4.4 Push protection with two refs (documented gap)

- Push protection for users does not apply to the private repositories; on the public one the block message names a ref
  ("Repository rule violations found for refs/heads/<ref>") and the client prints one `[remote rejected]` line per ref
  (earlier findings §3.3). GitHub's page says only that "If your Git configuration supports pushes to multiple branches, and not
  only to the current branch, your push may be blocked due to additional and unintended refs being pushed", and does not say
  whether a clean ref in a blocked push still updates
  ([Push protection from the command line](https://docs.github.com/en/code-security/concepts/secret-security/command-line-push-protection),
  read 2026-11-13).
- **What follows for each form.** Under (a) both refs are refused if either is, on the evidence of 4.3 and of git's atomic
  transaction; the stdout then carries two `[remote rejected]` lines and the stderr one `GH013` block per refused ref (count
  unknown). Under (b) and (c) a ref whose new commits hold no blocked secret can update while the other is refused, which is
  the "one ref updated" state. For BotTools the two branches share their history, so a secret in a shared commit blocks both
  refs in any form; one only in `Working-Branch`-only commits would block that ref only. The rewrite's exit tests make a
  finding unlikely; the point is the state, not its probability.
- The dry run cannot show any of this (rows 4 to 6: exit 0, clean).

### 4.5 What a force-push of two branches publishes, and how to count it (documented, observed idiom)

- **Webhook push event.** The payload's fields are singular: `ref` "The full git ref that was pushed. Example:
  `refs/heads/main` or `refs/tags/v3.14.1`.", `before` "The SHA of the most recent commit on `ref` before the push.", `forced`
  "Whether this push was a force push of the `ref`." One delivery per ref updated follows from that schema and from the rule
  "Events will not be created if more than 5000 branches are pushed at once." — two branches are far below it. Inference for
  the count (Gaps): 2 push deliveries for BotTools, identical under (a), (b) and (c). Source: `github/docs`
  `src/webhooks/data/fpt/push.json`, read 2026-11-13, rendered at the
  [webhook events reference](https://docs.github.com/en/webhooks/webhook-events-and-payloads#push).
- **Delivery list, countable without a payload.** `GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries` takes `per_page` (max
  100), `cursor` and `status` (`success` is a status code in 200-399, `failure` otherwise); each item holds `id`, `guid`,
  `delivered_at`, `redelivery`, `duration`, `status`, `status_code`, `event`, `action`, `installation_id`, `repository_id`,
  `throttled_at`, no payload. The payload (commit messages, authors, the `ref`) is only in `GET .../deliveries/{delivery_id}`,
  so a per-ref attribution needs that call and is not made; the total of `event == "push"` is. Retention: "All deliveries from
  the past 3 days will be listed." So the count is read right after the push, before the window passes.
  ([REST webhooks](https://docs.github.com/en/rest/repos/webhooks), [Viewing webhook deliveries](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/viewing-webhook-deliveries), read 2026-11-13.)
- **Activity feed.** `GET /repos/{owner}/{repo}/activity` lists "pushes, merges, force pushes, and branch changes", with
  `before`, `after`, `ref`, `timestamp`, `activity_type` (`push`, `force_push`, `branch_creation`, `branch_deletion`,
  `pr_merge`, `merge_queue_merge`), filters `ref`, `actor`, `time_period`, `activity_type`, and `per_page` up to 100. One entry
  per ref and push; so 2 `force_push` entries for BotTools and for TrumpBot, 1 for Support (inference from the per-ref fields;
  the page does not say how a force push is classified). Count by `ref` and `activity_type` with a filter that prints a number.
  ([REST repos, list repository activities](https://docs.github.com/en/rest/repos/repos#list-repository-activities).)
- **Events.** `GET /repos/{owner}/{repo}/events`, `PushEvent` with `ref`, `head`, `before` per event; "The timeline will include
  up to 300 events. Only events created within the past 30 days will be included."; "Depending on the time of day, event
  latency can be anywhere from 30s to 6h." and "This API is not built to serve real-time use cases." So an event count taken
  right after the push can be short, and a count that is short is read again later, never taken as absent
  ([REST events](https://docs.github.com/en/rest/activity/events), [event types](https://docs.github.com/en/rest/using-the-rest-api/github-event-types), read 2026-11-13).
- **Counting idiom (observed with `gh` 2.100.0 against a repository this checkout owns, read only).** With `--paginate`, `--jq`
  runs once per page and prints one number per page (12, 1, 0 on three pages), and `--paginate --slurp` refuses `--jq`
  ("the `--slurp` option is not supported with `--jq` or `--template`"). A total that prints no payload is
  `gh api --paginate '<path>' --jq '.[] | select(.type=="PushEvent") | 1' | wc -l` (13 on the same data; the first form's pages
  sum to 13). The same shape counts `activity_type=="force_push"` entries and deliveries with `event=="push"`.
- **Same publication in every form.** Nothing in the documentation ties the number of events, entries or deliveries to
  whether the refs arrived in one push or two; the push event and the activity entry are per ref. The one visible difference
  is the push identifier carried by a `PushEvent` (`push_id`), which may be shared by the two refs of one push; it is not read.

## 5. How comparable projects do it

- **Release tools that push a branch and its tag** treat the half-updated state as the cost to design out: the tool in
  nrwl/nx passes `--atomic` in its push (4.3), and the Homeboy change quoted above adds `--atomic` because it "removes the
  state instead of recovering from it", off by default so that no existing caller changes. Common practice for a multi-ref
  push whose parts must land together (two tools; neither is an authority on GitHub's server).
- **GitHub's and git-filter-repo's removal guides** push everything with `git push --force --mirror origin` and accept that
  `refs/pull/*` refuse; neither gives a conditional form or an atomic one (earlier findings §3.4, §4). Their partial-state
  answer is to repeat the push until only the hidden refs fail, which this phase does not do.
- **Shell idiom.** The phase's tally plus counted markers read from kept files is the convention; adding a count of `To`
  lines is the one change a lost connection forces (4.2 rows 7 and 8).

## 6. Options against the requirements

| Requirement | (a) one push, two leases, `--atomic` | (b) one push, two leases | (c) two pushes (two requests or one) |
|---|---|---|---|
| A moved branch is never overwritten | yes: stale lease refuses both (row 2, 3) | yes for the moved one; the other ref still goes | yes per push |
| Nothing created or deleted, pull refs untouched | yes (named refspecs, no `+`) | same | same |
| Clean tally | `forced=2 ... done=1 bad=0`, exit 0 | same | `forced=1 ... done=1 bad=0` twice |
| States after any failure after the dry run | neither, or both (a lost report); never one in git's server | neither, one, or both | neither, one, or both; one is the normal state between the pushes |
| A hand-back state "one ref updated" | classified only as an unexpected partial | needed, and a normal outcome | needed, and a normal intermediate state |
| Dry run catches a stale lease | yes (exit 1) | yes (exit 1), but running the push anyway updates one | yes per dry run |
| Dry run catches a server refusal or a race | no | no | no |
| Server must advertise `atomic` | yes; GitHub does; the dry run proves it per run | no | no |
| Marker classes | the established, plus `(atomic push failed)`, `(atomic push failure)`, `(atomic transaction failed)` as sibling wording; transport class by missing `To` line | the established | the established, twice |
| Requests and grants | one request, one grant naming two refs and `--atomic` | one request | two read-backs and two grants, or one request with a stop between pushes |
| Windows between a check and the update | one (advertisement to update) | one | two, plus the gap between the pushes |

(b) fails the requirement that matters most for a rewrite that must be proven whole: a half-rewritten repository (the default
branch new, `Working-Branch` still old, or the reverse) keeps the old history of one branch reachable from the other's old
tip and from the pull-request refs, and the only repair is a second force-push, which this phase never repeats blindly. (c)
makes that state an expected step and doubles the requests and grants for no gain in correctness, because each push still has
the same race window. (a) removes the state from the failure modes git itself can produce, at the cost of one capability that
GitHub advertises and that every dry run proves.

## 7. Recommendation for this repository

**Push each repository's branches in one request, as one `git push` with `--atomic`, an explicit lease per branch, and the
URL as the destination; run the same line with `--dry-run` first.** For BotTools and TrumpBot that is two refspecs and two
leases; Support is the same form with one of each (so the code path is one, not two).

```bash
# built from the rewrite's ref-map, one lease and one refspec per refs/heads/* row (never by hand per repository)
ARGS=(--porcelain --atomic)
for b in "${BRANCHES[@]}"; do ARGS+=("--force-with-lease=refs/heads/${b}:${OLD[$b]}"); done
REFSPECS=(); for b in "${BRANCHES[@]}"; do REFSPECS+=("refs/heads/${b}:refs/heads/${b}"); done
# argv assertion: exactly one --atomic; leases and refspecs one-to-one; none of --force -f --mirror --all --delete --prune; no '+'
git -C "$MIRROR" push --dry-run "${ARGS[@]}" "$URL" "${REFSPECS[@]}" >"$OUT/push-dry.txt" 2>"$OUT/push-dry.err"; DRC=$?
git -C "$MIRROR" push           "${ARGS[@]}" "$URL" "${REFSPECS[@]}" >"$OUT/push.txt"     2>"$OUT/push.err";     PRC=$?
```

**Expected tally, for N forced branches.** `forced=N fastforward=0 new=0 deleted=0 uptodate=0 rejected=0 done=1 pull_lines=0
other_refs=0 bad=0`, `PRC=0`; the dry run's tally identical with `DRC=0`; N is computed from `ref-map`'s changed rows (2
for BotTools and TrumpBot, 1 for Support), never typed. Any other value: stop; the push is never repeated.

**What changes in the tools part.**

1. **Push preparation.** Build the lease and refspec arrays from every `refs/heads/*` row of `ref-map` (the old column is the
   lease), asserting one lease per refspec: a refspec with no lease is refused as non-fast-forward, and with `--atomic` it
   takes the other ref with it (row 10), so a missing lease fails safe but fails the push; a lease with no refspec guards
   nothing.
2. **The argv assertion.** Exactly one `--atomic` is now required, not forbidden; the rest of the forbidden list (`--force`,
   `-f`, `--mirror`, `--all`, `--delete`, `--prune`, a leading `+`) stands. The grant names the push as a force-push of the
   listed refs in this form, with `--atomic`.
3. **Guards before the push.** Unchanged in kind: the server's heads and tags equal `ref-map`'s old column (this now covers
   both branches), and the pull-request listing equals the recorded one (BotTools: `refs/pull/2/head`, `refs/pull/3/head`).
4. **The dry-run gate.** Compare the dry run's tally with the N-ref expectation; a stale lease reads `rejected=N` with
   `(stale info)` count 1 (`atomic` wording on the others) and stops before the push.
5. **The classifier.** Read from counted markers, never printed. Add to the earlier set: `(atomic push failed)` (client),
   `(atomic push failure)` and `(atomic transaction failed)` (server) as sibling wording; a count of `To` lines in stdout; and
   `fatal:`, `RPC failed`, `hung up` and `unexpected disconnect` in stderr. Classes:

   | Counted | Class | Server state to read back |
   |---|---|---|
   | `PRC=0`, clean tally | pushed | both |
   | `PRC=1`, `to=0`, `fatal>=1` (any exit status) | transport | neither or both, never assumed |
   | `PRC=1`, `cr>=1`, `st>=1`, `rr=0` | a lease was stale (nothing sent) | neither |
   | `PRC=1`, `rr>=1`, `gh>=1`, `pp>=1` | refused by push protection | neither (partial only if unexpected) |
   | `PRC=1`, `rr>=1`, `gh>=1`, `pp=0` | refused by a rule | neither |
   | `PRC=1`, `rr>=1`, `gh=0` | refused by the server, unattributed (hook, a lost race, an email block) | neither |
   | `PRC=128`, no porcelain line | transport before the push | neither until read |
   | anything else | unclassified | stop |

   The `rr` count includes sibling lines under `--atomic`; a refusal's cause is the `[remote rejected]` lines without an
   atomic marker, and the race case (row 9) puts `(atomic transaction failed)` on every ref. The class only chooses the
   hand-back wording; every refusal takes the same stop.
6. **The per-ref verification, after any push and after every non-zero status.** One read-only `git ls-remote` of
   `refs/heads/*` and `refs/pull/*`; for each branch the tip is old, new, or another value. The state is **neither** (every
   branch old), **both** (every branch new), or **partial** (anything else). Neither: the mirror and backup stand and a person
   decides whether a new job is requested. Both: proceed to the verification. Partial: hand back with each branch's reading;
   no push follows without a person's decision. A lost connection is never retried before this read.
7. **The request and the grant.** One request per repository: the push is one `git push`, so "one request" means one grant
   naming the two refs, `--atomic`, the URL and the old tips' provenance (read from `ref-map` at run time). TrumpBot and
   BotTools are two requests in the order BotTools, TrumpBot, each only after the previous repository is verified.
8. **The webhook, activity and events counts for BotTools after its push.** Deliveries with `event == "push"` expected 2
   (read at once; the list holds 3 days); `force_push` activity entries per branch expected 1 each; push events expected 2,
   read again later if short. All counts printed as numbers only, recorded; the webhook is not changed.

**Why not the obvious option.** The earlier unit's reasoning, "`--atomic` is not used: one ref makes it redundant", is
correct for one ref and does not carry over: with two refs it is the only thing that removes the "one ref updated" state
(rows 2, 3, 5, 6, 9, 10). Two separate pushes (c) look like the safe generalisation of the proven form, but they make the
half-updated repository an ordinary intermediate state with a read-back in the middle, and each push still has its own race
window.

## 8. Assumptions

- GitHub's receive path updates the refs of an atomic push as one unit. Basis: git's documented capability, the advertisement,
  and one public log (4.3). If false, a failure can leave one ref updated even under (a); the classifier already names that
  state (partial) and hands back, so the only change is that the "partial" row stops being unexpected.
- GitHub's receive path rejects an update whose old value changed after the advertisement (git's does, row 9). If it does
  not, the unguarded window is from the push's own advertisement to its update, in every form, and a stale lease in that window
  would overwrite a branch; the guards and the dry run narrow it to seconds.
- The pusher's push protection for users behaves as the earlier findings assume (applies to the public repository, not the
  private ones). If it applies to refs individually, a refusal under (a) still refuses both because of `--atomic`.
- The lost-connection signature seen over a local HTTP stand-in (`RPC failed`, `hung up`, lone `Done`) is representative of what
  git prints over HTTPS to GitHub. If a real loss prints `fatal: unable to access` with exit status 128 and no `Done`, the
  transport class already covers it (`to=0`, `fatal>=1`).
- The activity feed lists one `force_push` entry per ref, and the push event is delivered once per ref. If the counts differ,
  they are recorded as measured; no decision depends on them.

## 9. Gaps

- **GitHub's server was not exercised.** No push was made; every server-side row in 4.2 is git's own receive-pack, a stand-in.
  GitHub's wording for a refusal, whether it treats a multi-ref push per ref or per push when `--atomic` is absent, and whether
  `--atomic` is all-or-nothing in its implementation are not established beyond the one public log. The first real push is the
  check, and the classifier and read-back are written so that a surprise is handed back rather than misread.
- **Per-ref versus per-push push-protection refusal is not documented** (4.4); under (a) it does not matter.
- **The number of push deliveries per push is not documented as such**; "one per ref" rests on the payload's singular fields and
  on the 5000-branch sentence. BotTools' hook is not readable from this checkout's repository (it has none), so the delivery
  list's shape rests on the REST documentation, not on a call. Whether the token needs more than `repo` for the deliveries
  endpoints was not found (the documentation names `read:repo_hook` or `repo` for the hook configuration endpoints only).
- **The meaning of `push_id` across the refs of one push** was not established.
- **The activity feed's latency** is not documented; the events latency is ("30s to 6h").
- **Whether the nrwl/nx release tool passed `--atomic` on 2024-09-26**, when the issue was opened, was not checked; its source
  on `master` as read on 2026-11-13 does. The log is therefore evidence of GitHub's output for a refused branch with a sibling
  tag, and of an atomic push only if the tool's argument list was the same then.
- **A lost connection was simulated at the HTTP request** (dropped before or after the server ran its receive step). A drop in
  the middle of a pack upload was not run; by git's receive path it leaves no ref changed, the same as row 7.
- **Whether the request service's deny rules match a push that carries `--atomic`** was not examined; the grant is written for
  the form used and does not rely on a pattern.

## 10. Load-bearing claims

Outside-world claims, each with the sentence quoted from its source, the link, and the version or date it applies to.

1. A lease protects one ref. "`--force-with-lease=<refname>:<expect>` will protect _<refname>_ (alone), if it is going to be
   updated, by requiring its current value to be the same as the specified value _<expect>_" —
   [`git-push.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/git-push.adoc), git `v2.55.0`.
2. `--atomic`. "Use an atomic transaction on the remote side if available. Either all refs are updated, or on error, no refs are
   updated. If the server does not support atomic pushes the push will fail." — same file and tag.
3. The dry run. "Do everything except actually send the updates." — same file and tag.
4. Porcelain statuses. "Git did not try to send the ref at all, typically because it is not a fast-forward and you did not force
   the update." and "The remote end refused the update." and "The remote end did not report the successful update of the ref,
   perhaps because of a temporary error on the remote side, a break in the network connection, or other transient error." —
   same file and tag.
5. The capability on the wire. "If the pushing client requests this capability, the server will update the refs in one atomic
   transaction. Either all refs are updated or none." —
   [`gitprotocol-capabilities.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/gitprotocol-capabilities.adoc), git `v2.55.0`.
6. A stale lease under `--atomic` aborts the whole push on the client (direct transports). "When we know the server would reject a
   ref update if we were to send it and we're trying to send the refs atomically, abort the whole operation." —
   `send_pack` in [`send-pack.c`](https://github.com/git/git/blob/v2.55.0/send-pack.c), `v2.55.0`.
7. The same over HTTPS. `case REF_STATUS_REJECT_STALE:` ... `if (atomic) {` `reject_atomic_push(remote_refs, mirror);` ...
   `return 0;` `} else` `continue;` — `push_refs_with_push` in
   [`transport-helper.c`](https://github.com/git/git/blob/v2.55.0/transport-helper.c), `v2.55.0`.
8. The sibling label. `/* Mark other refs as failed */` ... `ref->status = REF_STATUS_ATOMIC_PUSH_FAILED;` —
   `reject_atomic_push` in [`remote.c`](https://github.com/git/git/blob/v2.55.0/remote.c), `v2.55.0`; printed as `atomic push failed`
   in [`transport.c`](https://github.com/git/git/blob/v2.55.0/transport.c).
9. git's server, atomic and not. `const char *reported_error = "atomic push failure";` and `reported_error = "atomic transaction
   failed";` in `execute_commands_atomic`, with `if (use_atomic) execute_commands_atomic(commands, si); else
   execute_commands_non_atomic(commands, si);` — [`builtin/receive-pack.c`](https://github.com/git/git/blob/v2.55.0/builtin/receive-pack.c), `v2.55.0`.
10. A `pre-receive` refusal is all or nothing. "If the pre-receive hook exits with a non-zero exit status no updates will be
    performed, and the update, post-receive and post-update hooks will not be invoked either." —
    [`git-receive-pack.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/git-receive-pack.adoc), `v2.55.0`.
11. GitHub advertises `atomic`. The authenticated receive-pack advertisement lists "`report-status`, `report-status-v2`,
    `delete-refs`, `atomic`, `push-options`, `side-band-64k`, `ofs-delta`" —
    [`github-residual-exposure-and-visibility.md` §3.2](../../research/github-residual-exposure-and-visibility.md#32-pull-request-refs-observed-documented),
    observed 2026-10-20 and recorded there.
12. GitHub's 2015 announcement. "The `--atomic` option guarantees that either all three references will be updated on the remote,
    or none of them will." and "Please note that `git push --atomic` is still somewhat experimental, and it is possible to
    experience partial updates if you try to push something unusual." —
    [GitHub blog, "Git 2.4 - atomic pushes, push to deploy, and more"](https://github.blog/2015-04-30-git-2-4-atomic-pushes-push-to-deploy-and-more/), 2015-04-30.
13. A GitHub log of an atomic push with a refused branch (one report). `! [remote rejected] main -> main (protected branch hook
    declined)` and `! [remote rejected] @YYYY/XXX/v0.2.1 -> @YYYY/XXX/v0.2.1 (atomic transaction failed)` (the issue's own
    redaction) — [nrwl/nx#28141](https://github.com/nrwl/nx/issues/28141), opened 2024-09-26; the tool passes `'--atomic'` in
    `gitPush` of [`git.ts`](https://github.com/nrwl/nx/blob/master/packages/nx/src/command-line/release/utils/git.ts), read 2026-11-13.
14. Push protection and several refs. "If your Git configuration supports pushes to multiple branches, and not only to the current
    branch, your push may be blocked due to additional and unintended refs being pushed." —
    [Push protection from the command line](https://docs.github.com/en/code-security/concepts/secret-security/command-line-push-protection), read 2026-11-13.
15. The push event is per ref. `ref`: "The full git ref that was pushed. Example: `refs/heads/main` or `refs/tags/v3.14.1`."
    `forced`: "Whether this push was a force push of the `ref`." — `src/webhooks/data/fpt/push.json` in
    [`github/docs`](https://github.com/github/docs/blob/main/src/webhooks/data/fpt/push.json), `main` as read 2026-11-13 (the source holds
    these inside `<code>` tags).
16. The branch limit. "Events will not be created if more than 5000 branches are pushed at once. Events will not be created for
    tags when more than three tags are pushed at once." — same file.
17. The deliveries list. `GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries` with `per_page` ("The number of results per page
    (max 100).") and `status` ("A status of success returns deliveries with a status_code in the 200-399 range (inclusive)."),
    items without a payload, and `GET .../deliveries/{delivery_id}` ("Returns a delivery for a webhook configured in a
    repository.") that adds `request` and `response` — [REST webhooks](https://docs.github.com/en/rest/repos/webhooks), read 2026-11-13.
18. Delivery retention. "All deliveries from the past 3 days will be listed." —
    [Viewing webhook deliveries](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/viewing-webhook-deliveries), read 2026-11-13.
19. The activity endpoint. "Lists a detailed history of changes to a repository, such as pushes, merges, force pushes, and branch
    changes"; `activity_type` allowed values `push`, `force_push`, `branch_creation`, `branch_deletion`, `pr_merge`,
    `merge_queue_merge`; `per_page` maximum 100 — [REST repos, list repository activities](https://docs.github.com/en/rest/repos/repos#list-repository-activities), read 2026-11-13.
20. Events limits. "The timeline will include up to 300 events. Only events created within the past 30 days will be included.",
    "Depending on the time of day, event latency can be anywhere from 30s to 6h.", "This API is not built to serve real-time use
    cases." — [REST events](https://docs.github.com/en/rest/activity/events), read 2026-11-13. `PushEvent` payload keys `ref`,
    `head`, `before`: [event types](https://docs.github.com/en/rest/using-the-rest-api/github-event-types), same date.

### Observed on this machine

Local experiments and reads, git 2.55.0.windows.5, `gh` 2.100.0, 2026-11-13. Commands' shape is in 4.2; results are counts and
fixed markers.

- A local smart-HTTP stand-in server and a mirror clone take the push through `git-remote-curl`; the clean push of two forced
  refs, with and without `--atomic`, printed `forced=2 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0 done=1 pull_lines=0
  other_refs=0 bad=0`, exit 0, dry run identical.
- Stale lease on one ref: atomic, exit 1 on dry run and push, `rejected=2`, `(stale info)` 1, `(atomic push failed)` 1, nothing
  updated; non-atomic, exit 1, `forced=1 rejected=1`, one ref updated by the real push.
- Refusal of one ref by an `update` hook: atomic, `(hook declined)` 1 and `(atomic push failure)` 1, neither updated;
  non-atomic, `forced=1 rejected=1`, one updated. A `pre-receive` hook refusal: `[remote rejected]` 2 in both forms, neither
  updated.
- Ref moved after the advertisement: atomic, `(atomic transaction failed)` 2, neither updated; non-atomic, `forced=1 rejected=1`
  with `(incorrect old value provided)`, one updated.
- Lost connection, before or after the server applied: stdout a lone `Done`, exit 1, `fatal:` 1, `hung up` 1, `RPC failed` 1;
  neither updated (before), both updated (after), in both forms.
- Only one refspec with a lease: the other ref refused `(non-fast-forward)`; atomic took both down, non-atomic updated one.
- Server without the `atomic` capability: dry run and push both exit 1 with empty stdout and `fatal: the receiving end does not
  support --atomic push`.
- Two pushes: a stale second branch is caught by its dry run before any real push; a move between the pushes, or an `update`
  hook refusing the second branch, leaves the first updated and exits 1 on the second.
- `gh api --paginate --jq` prints one number per page, `--paginate --slurp --jq` is refused, and the `| 1` and `wc -l` shape
  totals them; against this checkout's repository: 13 push events across three pages, 0 force-push activity entries, no
  webhook.
- Refs `refs/pull/*` were never changed in any row.
