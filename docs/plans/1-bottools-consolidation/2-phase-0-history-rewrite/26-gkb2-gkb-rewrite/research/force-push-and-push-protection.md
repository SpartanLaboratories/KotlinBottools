# Force-pushing a rewritten history to a public repository: what GitHub can refuse, how a refusal reads, and how to make the update conditional

Researched 2026-11-13. Applies to git 2.55.0.windows.5 (the version run in the local experiment) and git `v2.55.0` source and
documentation, git-filter-repo `v2.47.0`, and GitHub.com as documented in `github/docs` (`main` as read on 2026-11-12) and in
posts of 2023 to 2026. Nothing was written to GitHub: its behaviour is read from its documentation and from logs that people
posted publicly, and git's behaviour was measured on bare repositories that stand in for the server. No Kotlin is written by
this unit; the idioms judged are Bash and awk.

## 1. Question

A rewritten history of a public repository (one branch, `master`; every commit id new) is pushed in place over HTTPS with
`gh auth git-credential`, under an organisation administrator's classic token holding `repo`, from a bare mirror whose
`origin` is the repository. What can GitHub refuse; how does a refusal read in the push's output; and which form of the push
makes the update of `master` conditional on its old tip? An answer must fit these facts: the push updates `master` as a forced
update, deletes nothing, creates nothing and leaves `refs/pull/*` alone; it never overwrites a branch that moved since the
clone; its outcome is read from the porcelain lines and the exit status, and a refusal is told apart from other failures by
fixed markers counted in a kept error file that is never printed (GitHub's message for a blocked secret can carry a commit
id, a path and a line number); the push is a force-push whatever its flags and the procedure makes no bypass of any block.

## 2. Bottom line

- **Push `master` by an explicit refspec with an explicit lease, not by `--mirror`.** The form is
  `git push --porcelain --force-with-lease=refs/heads/master:<old tip> <url> refs/heads/master:refs/heads/master`, preceded by
  the same line with `--dry-run`. It updates exactly one ref, so it cannot delete or create anything and cannot touch
  `refs/pull/*` even if local copies exist. A branch that moved reads `! [rejected] (stale info)` with exit status 1 and the
  remote unchanged. Expected tally for the one forced branch: `forced=1`, everything else 0, `done=1`, exit status 0.
- **The lease does nothing under `--mirror`.** `--mirror` implies `--force`, and `--force` "disables ... the checks in
  `--force-with-lease`" (documented; observed in git 2.55: a deliberately wrong expected value and a moved server branch were
  both overwritten with exit status 0). The same holds for a leading `+` on the refspec. A lease is only conditional when
  neither `--force`, `-f`, `--mirror`, a mirror-configured `origin` nor a `+` is present; the procedure asserts that.
- **Dropping `--force` from the design's `--mirror` form changes nothing.** `git push --porcelain --mirror origin` printed the
  same `+` forced-update line and exited 0 (observed). It is therefore no weaker or stronger; the push stays a force-push
  that needs its grant. `--mirror` also deletes a server-side branch that was created after the clone (observed: `-`, exit 0)
  and lists a local `refs/pull/*` as a new ref that GitHub then rejects (`deny updating a hidden ref`, exit 1).
- **Guard in the same shell: compare the server's heads with the rewrite's old column, then push with the lease.** The
  comparison catches any branch or tag created or moved since the clone; the lease binds `master` to its recorded tip at the
  moment of the push's own ref advertisement. A mirror-configured `origin` makes a refspec push fail at once with `fatal:
  --mirror can't be combined with refspecs` (exit 128, nothing sent), so push to the URL (`git remote get-url origin`) or pass
  `-c remote.origin.mirror=false`; both were measured to work.
- **GitHub push protection for users very probably applies, although the repository's own protection is disabled.** It is
  "enabled by default", "stops you from pushing secrets to public repositories on GitHub", and a 2026 user log shows a block on
  a repository that "does not have Secret Scanning enabled, but is eligible". "Discord Bot Token" is a supported provider
  pattern with push protection. A block reads `remote: error: GH013: Repository rule violations found for refs/heads/<ref>.`
  with a `GITHUB PUSH PROTECTION` section on stderr, and on stdout one `! ... [remote rejected]` line; the push exits 1 and
  `Done` is still printed. A refusal leaves `master` where it was; the procedure stops and hands back, and never bypasses.
- **A dry run cannot show a push-protection block.** `--dry-run` does everything except send the updates, so no server-side
  check runs (observed with a rejecting `pre-receive` hook: dry run exit 0, real push exit 1). The first sign of a block is the
  real push.

## 3. Findings

### 3.1 What `--mirror`, `--force` and a lease each do in git 2.55 (documented, source, observed)

- **Documented.** `--mirror`: "locally updated refs will be force updated on the remote end, and deleted refs will be removed
  from the remote end. This is the default if the configuration option `remote.<remote>.mirror` is set."
  ([`Documentation/git-push.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/git-push.adoc), `v2.55.0`.) `--force`
  "disables that check, the other safety checks in PUSH RULES below, and the checks in `--force-with-lease`"; "The `+` is
  optional and does the same thing as `--force`." `--force-with-lease=<refname>:<expect>` "will protect _<refname>_ (alone),
  if it is going to be updated, by requiring its current value to be the same as the specified value _<expect>_". `--atomic`:
  "Either all refs are updated, or on error, no refs are updated."
- **Source.** `builtin/push.c`, `cmd_push` (`v2.55.0`): the `--mirror` option is declared as
  `(TRANSPORT_PUSH_MIRROR|TRANSPORT_PUSH_FORCE)`, a remote with `remote.<name>.mirror` set gets
  `inner_flags |= (TRANSPORT_PUSH_MIRROR|TRANSPORT_PUSH_FORCE)`, and a mirror push with a refspec dies with
  `--mirror can't be combined with refspecs`. `remote.c`, `set_ref_status_for_push`: the lease sets `REF_STATUS_REJECT_STALE`
  when the remote ref differs from `<expect>`, and the function ends by letting force win: `if (!force_ref_update) ref->status
  = reject_reason;`, under the comment `"--force" will defeat any rejection implemented by the rules above.` Both are in
  [`builtin/push.c`](https://github.com/git/git/blob/v2.55.0/builtin/push.c) and
  [`remote.c`](https://github.com/git/git/blob/v2.55.0/remote.c).
- **Observed** (git 2.55.0.windows.5; bare repositories; the "server" hides `refs/pull` from receive-pack with
  `receive.hideRefs` as GitHub does; transport is a file path, so the client logic is the real one and only the server's
  message text is a stand-in). `<old>` is the branch tip recorded at clone time.

| Scenario | Form | stdout (flags) | exit | Server |
|---|---|---|---|---|
| Rewritten branch, server unmoved | `--porcelain --force --mirror` | `+ ... (forced update)`, `Done` | 0 | updated |
| same | `--porcelain --mirror` (no `--force`) | identical to the line above | 0 | updated |
| same | `--mirror --force-with-lease=...:<old>` | identical; lease inert | 0 | updated |
| same, `origin` has `remote.origin.mirror=true` | refspec + `--force-with-lease` | nothing; stderr `fatal: --mirror can't be combined with refspecs` | 128 | untouched |
| same, URL destination or `-c remote.origin.mirror=false` | refspec + `--force-with-lease=...:<old>` | `+ ... (forced update)`, `Done` | 0 | updated |
| same | refspec, no lease, no force | `! ... [rejected] (non-fast-forward)`, `Done` | 1 | untouched |
| Server branch moved after the clone | `--mirror` with or without `--force`, with or without a lease | `+ ... (forced update)` | 0 | **overwritten** |
| same | `--mirror --force-with-lease=...:<wrong value>` (server unmoved) | `+ ... (forced update)` | 0 | overwritten |
| same | refspec + `--force-with-lease=...:<old>` | `! ... [rejected] (stale info)`, `Done` | 1 | untouched |
| same | the same with `--dry-run` | `! ... [rejected] (stale info)`, `Done` | 1 | untouched |
| same | refspec `+refs/heads/master:...` with the lease, or `--force` with the lease | `+ ... (forced update)` | 0 | **overwritten** |
| Branch created on the server after the clone | `--mirror --force` | `- :refs/heads/<name> [deleted]` and the `+` line | 0 | branch **deleted** |
| Local `refs/pull/6/head` kept | `--mirror --force`, real push | `+` for `master`, `! ... [remote rejected] (deny updating a hidden ref)` | 1 | `master` updated |
| same | `--mirror --force --dry-run` | `+` for `master`, `* refs/pull/6/head ... [new reference]` | 0 | untouched |
| `pre-receive` hook that rejects | any form, real push | `! ... [remote rejected] (pre-receive hook declined)`, `Done`; hook text on stderr as `remote:` lines | 1 | untouched |
| same | any form, `--dry-run` | the clean `+` line, `Done` | 0 | untouched |
| Hook that moves `master` after the advertisement | `--mirror --force` | `! ... [remote rejected] (incorrect old value provided)`; stderr `cannot lock ref ... is at ... but expected ...` | 1 | untouched by the push |
| Remote path that does not exist | refspec | empty stdout; stderr `fatal: ... does not appear to be a git repository` | 128 | n/a |

  `Done` is printed whenever the transport itself completed, including after a `!` line (the non-fast-forward, stale-info and hook rows), so it is
  not evidence of success. A rejection by the client (`[rejected]`) and one by the server (`[remote rejected]`) are distinct
  summaries on stdout; only the server's carries `remote:` text on stderr.
- **Observed, objects sent.** Rewriting a three-commit repository with `git filter-branch --index-filter 'git rm --cached ...'`
  (the file removal changes commits and trees, not the surviving blobs) and pushing it over the old history added 3 commits and
  3 trees to the server and no blob. A path-purge rewrite of kept files therefore sends commits and trees, not their content.
- **Observed, race.** The git receive side checks the old value of each ref it was told to update (the push protocol carries it:
  `update = old-id SP new-id SP name`, [`gitprotocol-pack`](https://github.com/git/git/blob/v2.55.0/Documentation/gitprotocol-pack.adoc)),
  so even `--mirror --force` is refused if the ref moves after the client read the advertisement. That narrows the unguarded
  window to the time before the push starts. Whether GitHub's receive path enforces the same check is not observable here (Gaps).

### 3.2 What GitHub can refuse in this push (documented, observed in published logs)

- **Push protection** (3.3). A refusal of the push, reported as a `[remote rejected]` line.
- **Branch protection and rulesets.** A protected branch is refused with `remote: error: GH006: Protected branch update failed for refs/heads/<ref>.` (GitHub Docs, about protected branches); a ruleset violation uses the `GH013` code seen in 3.3; both end in a `[remote rejected]` line. The
  repositories have none (a fact of the work), so this class is not expected; it stays in the classification because the
  stop is the same.
- **Hidden refs.** `refs/pull/*` are read-only: "This command will fail to push any refs starting with `refs/pull/`, since
  GitHub marks those as read-only." ([GitHub Docs, Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).)
  The earlier findings establish that receive-pack never advertises them, so a push that names only `refs/heads/master` never
  meets them.
- **Size.** "GitHub has a maximum 2 GiB limit for a single push" ([Troubleshooting the 2 GiB push limit](https://docs.github.com/en/get-started/using-git/troubleshooting-the-2-gb-push-limit),
  documented); the pack here is commits and trees only (3.1), so this is not a risk.
- **The private-email block.** If the pusher's account has "Block command line pushes that expose my email", GitHub checks "the
  most recent commit": "If the author email on that commit is a private email on your GitHub account, we will block the push"
  ([Blocking command line pushes that expose your personal email address](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/blocking-command-line-pushes-that-expose-your-personal-email-address)).
  The rewritten tip is a new commit, so the check can run on it. The wording of this refusal was not found (Gaps).
- **Authentication or permission.** Reported as `fatal:` with exit status 128 and no porcelain lines (observed for a
  transport failure in 3.1).

### 3.3 Push protection for users on a repository whose own setting is disabled (documented; observed in published logs)

- **Which form applies.** GitHub's concepts page: "Push protection for users ... is specific to your GitHub account. This form
  of push protection: Is enabled by default; Stops you from pushing secrets to public repositories on GitHub; Does not generate
  alerts when you bypass push protection unless push protection is also enabled at the repository level." Push protection for
  repositories "Is disabled by default" and needs GitHub Secret Protection. The account-level form was announced as protecting "your
  pushes ... whenever you push to a public repository on GitHub" (changelog, 2023-08-09) and made the default for all users:
  "Now, we've enabled secret scanning push protection by default for all pushes to public repositories." (GitHub blog,
  2024-02-29.) The 2024-03-11 changelog ("Existing public repositories are not affected, nor are new public repositories that
  belong to an organization") concerns the repository's own settings, not this account setting.
- **Evidence that it blocks where the repository setting is off.** A user log of 2026-03 shows a block with the line "This
  repository does not have Secret Scanning enabled, but is eligible." and the reporter's remark that the repository's
  protection was disabled ([community discussion 140034](https://github.com/orgs/community/discussions/140034)); a staff reply
  of 2024-04 explains "we recently enabled push protection for users across GitHub, and that included apps and bots like GitHub
  Actions" ([discussion 114723](https://github.com/orgs/community/discussions/114723)). One source's observation each, but
  consistent with the concepts page.
- **Does it apply to an organisation-owned public repository?** The documentation says "public repositories on GitHub" without
  an owner distinction; no source found says organisation-owned repositories are exempt. Treated as applying (Gaps).
- **Does the token type matter?** The staff reply says bots were switched off later; no source says a human's classic token
  or an OAuth token from `gh auth git-credential` is exempt. Treated as applying.
- **Which secrets.** Partner (provider) patterns whose push-protection flag is set. Generic patterns need the repository's
  own setting ("Scanning for generic patterns and push protection must be enabled in your repository's security settings"),
  custom patterns are the repository's own, and the AI-detected kind is separately enabled, so on these repositories only the
  provider patterns can fire. In `src/secret-scanning/data/pattern-docs/fpt/public-docs.yml` (GitHub Docs, `main` on
  2026-11-12) 465 of 532 entries carry `hasPushProtection: true`, and the entry for `provider: Discord`,
  `supportedSecret: Discord Bot Token`, `secretType: discord_bot_token` carries `isPublic: true`, `hasPushProtection: true`,
  `hasValidityCheck: true`. "Discord Bot Token" is therefore among the blocked types. Older token versions may not be
  covered ("Push protection may also not apply to legacy tokens").
- **Does it examine every commit new to the repository?** Not documented as exhaustive, and documented as time-bounded:
  "If secret scanning upon a push times out, GitHub will still scan your commits for secrets after the push." A published log
  (2024-03) prints "Scan incomplete: This push was large and we didn't finish on time." with "It can still contain undetected
  secrets." The only figure for the budget, five seconds, comes from a competitor's article and is not GitHub's. What GitHub
  scans inside a push (commits, diffs, blobs, only objects it lacks) is not documented; the local measurement in 3.1 shows
  that a purge rewrite sends no blob (Gaps). Also: "If a particular secret has already been detected in the repository and an
  alert already exists, GitHub will not block that secret", and no alert can exist here with repository scanning disabled.
- **Whole push or only the refs it concerns?** Not documented. The message names a ref ("Repository rule violations found for
  refs/heads/gh-pages") and the client prints one `[remote rejected]` line per ref, but nothing says whether a clean ref in the
  same push still updates; GitHub's own note warns that a push "may be blocked due to additional and unintended refs being
  pushed". Immaterial for a push of one ref; it is a reason not to add refs (Gaps).
- **What the client prints** (published logs, 2024 and 2026; GitHub's own docs show only the `locations` fragment). Stderr:
  `remote: error: GH013: Repository rule violations found for refs/heads/<ref>.`, then a `GITHUB PUSH PROTECTION` block with
  `Resolve the following violations before pushing again`, `Push cannot contain secrets`, one `—— <secret type> ——` heading per
  secret with `locations:` and `- commit: <id>` / `path: <file>:<line>` lines (up to five secrets are shown: "Up to five
  detected secrets will be displayed at a time on the command line"), the hint "To push, remove secret from commit(s) or follow
  this URL to allow the secret.", and `error: failed to push some refs to '<url>'`. Stdout under `--porcelain` carries one
  `!` line whose summary is `[remote rejected]`; the human form seen in 2024 is `! [remote rejected] gh-pages -> gh-pages
  (push declined due to repository rule violations)`. Exit status 1. The reason text is GitHub's and may change; the structural
  summary `[remote rejected]` is git's. (A third-party page quotes an older `GH009: Secrets detected!` form; not relied on.)
- **Bypass.** The block message carries a URL; it must be opened "as the same user that performed the push" (any other user
  gets a 404), the pusher picks a reason ("It's used in tests", "It's a false positive", "I'll fix it later"), clicks "Allow me
  to push this secret", and must "Reattempt the push on the command line within three hours". So a bypass is per blocked
  secret and expires after three hours. For push protection for users "you won't need to specify a reason ... and GitHub won't
  generate an alert" (the reasons apply where the repository has scanning on). The other routes are an account setting ("Under
  'User', to the right of 'Push protection for yourself', update your settings", and "you can also disable push protection
  entirely in your user security settings") and, for repository-level protection, delegated bypass, which these repositories
  do not have. Only the pusher's own account can make the per-secret bypass or change the account setting.
- **What a block leaves.** GitHub: push protection "blocks pushes that contain secrets _before_ they reach your repository."
  The ref stays at its old value; with a single ref there is no partial state.

### 3.4 What GitHub's removal guide recommends for the force-push and for `refs/pull/*` (documented)

- The guide's push step is `git push --force --mirror origin`, with the sentence "Even though `--force` is implied by
  `--mirror`, we include it below as a reminder that you are forcibly updating all branches, tags, and refs and you are
  discarding any changes others may have made to those refs while you were cleaning up the repository." It continues: "If any
  other refs fail to push, you likely have branch protection turned on for that branch and will need to turn it off
  temporarily and redo the push. Repeat until the only failures to update are refs starting with `refs/pull/`."
- `refs/pull/*` failures are expected and are not retried: they "will be handled in the next section", which is a request to
  GitHub Support that supplies the repository, the number of affected pull requests and the First Changed Commit(s), after
  which Support will "Dereference or delete any affected pull requests", "Run a garbage collection on the server to expunge the
  sensitive data from storage" and "Remove cached views". It also says to revoke or rotate any secret first, since that "may
  be sufficient".
- git-filter-repo's manual (`v2.47.0`) gives the same command and adds: "If any of your colleagues have pushed any changes since
  you started, this force push command will discard their changes", "This force push is likely to fail to push some refs, since
  most forges (Gerrit, GitHub, GitLab, etc.) prevent you from updating some refs (e.g. `refs/changes/*`, `refs/pull/*`,
  `refs/merge-requests/*`)", and "Yes, I know that --mirror implies --force and is unnecessary."
  ([manual source](https://github.com/newren/git-filter-repo/blob/v2.47.0/Documentation/git-filter-repo.txt).)

## 4. How comparable practice does it

- **GitHub's guide and git-filter-repo's manual** (3.4): `git push --force --mirror origin`, accepting the `refs/pull/*`
  failures, with the unconditional overwrite called out as a feature ("discard their changes"). Common practice; neither
  offers a conditional form.
- **BFG Repo-Cleaner** ([usage page](https://rtyley.github.io/bfg-repo-cleaner/)) ends with a plain `git push` from a
  `git clone --mirror`, which is a mirror push because that clone sets `remote.origin.mirror=true` ("this push will update
  **all** refs on your remote server"). Same mechanics, same lack of a condition.
- **The lease** is the git-native way to make a forced update conditional on a known old value; git's own documentation
  recommends the `--force-with-lease=<refname>:<expect>` form as the only fully specified one ("all forms other than ... that
  specifies the expected current value of the ref explicitly are still experimental"). It is not combinable with `--mirror`
  (3.1), which is why mirror-based guides cannot use it.
- **Shell idiom.** The phase's existing tally (counts of porcelain flags by `awk -F'\t'`) is the conventional way to read a
  porcelain push; counting markers with `grep -c -F` on a file read, never printed, is the idiom that keeps a message out of
  the log (it prints a number and nothing else). Redirect both streams to files so nothing from git reaches the terminal.

## 5. Pitfalls

- **A lease that is silently off.** `--mirror`, `--force`, `-f`, a leading `+`, and a mirror-configured `origin` that turns a
  plain `git push` into a mirror push all defeat the lease without any warning (3.1). A procedure that "adds a lease" to a
  `--mirror` command guards nothing.
- **`--mirror` deletes and creates.** A branch created on the server since the clone is deleted; a local `refs/pull/*` is sent
  as a new ref and rejected, making the exit status 1 although the branch was updated. Deleting the local pull refs first
  (the earlier procedure) removes the second, never the first.
- **`Done` proves nothing**, and exit status 1 with `forced=1` can still mean a partly applied multi-ref push (not possible
  for one ref, which is why one ref is pushed).
- **The dry run is not a rehearsal of GitHub's checks.** It reports a stale lease but never a push-protection block, a
  private-email block or a size refusal.
- **A scan can finish late.** A large push can end with an incomplete scan and no block, and GitHub then scans after the push;
  a clean push is therefore not proof that nothing matched.
- **A retry after a rejected push is not harmless.** If the refusal was push protection, a bypass opened at the URL has a
  three-hour life and covers that secret only; a second attempt without it is refused again. If the refusal was stale info,
  repeating the push with a refreshed lease would overwrite whoever pushed.
- **A deny list that matches text.** The request service denies `git push --force`, `git push -f` and `git push
  --force-with-lease` unless a grant lifts them. A form that moves words before `push` (`git -c ... push`), puts `--porcelain`
  first or omits `--force` still force-pushes while looking different to a pattern; the grant should name the push as a
  force-push of this ref in the form used, not rely on the deny entry matching.
- **Pull-request refs stay.** The push leaves the pre-rewrite history behind `refs/pull/6/head`; the guide's remedy is a Support
  request, not a push.

## 6. Recommendation for this repository

**The push form.** Per repository, from the bare mirror, after the rewrite checks and the preparation steps pass:

```bash
OLD_MASTER=$(awk 'NR>1 && $3=="refs/heads/master"{print $1}' "$OUT/$REPO/ref-map")     # the rewrite's old column
URL=$(git -C "$MIRROR" remote get-url origin)                                          # destination by URL: a mirror-configured
                                                                                       # origin would refuse a refspec (exit 128)
# G1  guard: the server's heads and tags equal the old column; nothing was created, moved or deleted since the clone
git ls-remote --refs origin 'refs/heads/*' 'refs/tags/*' | awk '{print $1" "$2}' | sort > "$OUT/$REPO/remote-before.txt"
diff -q "$OUT/$REPO/expect-remote-before.txt" "$OUT/$REPO/remote-before.txt" >/dev/null || echo STOP   # 0 expected
# G2  argv assertion: nothing that defeats the lease (checked on the argument array before it is run)
ARGS=(--porcelain "--force-with-lease=refs/heads/master:${OLD_MASTER}")
for a in "${ARGS[@]}" "$URL" refs/heads/master:refs/heads/master; do
  case "$a" in --force|-f|--mirror|--all|--delete|+*|--prune) echo STOP;; esac
done
# P3  dry run, then P4 the push; both streams to files, nothing printed
git -C "$MIRROR" push --dry-run "${ARGS[@]}" "$URL" refs/heads/master:refs/heads/master >"$OUT/$REPO/push-dry.txt" 2>"$OUT/$REPO/push-dry.err"; DRC=$?
git -C "$MIRROR" push           "${ARGS[@]}" "$URL" refs/heads/master:refs/heads/master >"$OUT/$REPO/push.txt"     2>"$OUT/$REPO/push.err";     PRC=$?
```

This is a force-push by git's own definition (`+ ... (forced update)`) and is requested and granted as one; `--force-with-lease`
is the form the request service's settings already name. `--atomic` is not used: one ref makes it redundant, and it adds a
server capability the push would otherwise not need. The local `refs/pull/*` need not be deleted for this push (the refspec
never names them); the earlier procedure's deletion remains harmless and keeps the verification of the mirror's refs simple.

**Expected tally for one forced branch**, from the phase's existing porcelain tally on `push.txt` (the `To` line check is
against `https://github.com/`): `forced=1 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0 done=1 pull_lines=0 other_refs=0
bad=0`, `PRC=0`, and the dry run's tally identical with `DRC=0`. Any other value: STOP and never repeat the push.

**Classifying a refusal without printing it.** After the push, count and print only numbers (`LC_ALL=C`, `|| true` because
`grep -c` exits 1 on zero):

```bash
rr=$(grep -c -F '[remote rejected]'       "$OUT/$REPO/push.txt" || true)   # server refused the ref
cr=$(grep -c -F '[rejected]'              "$OUT/$REPO/push.txt" || true)   # client refused it (stale lease, non-fast-forward)
st=$(grep -c -F '(stale info)'            "$OUT/$REPO/push.txt" || true)
gh=$(grep -c -F 'GH013'                   "$OUT/$REPO/push.err" || true)   # GitHub rule-violation family
pp=$(grep -c -F 'PUSH PROTECTION'         "$OUT/$REPO/push.err" || true)   # push-protection section
loc=$(grep -c -F -- '- commit:'           "$OUT/$REPO/push.err" || true)   # number of secret locations; their content never read
inc=$(grep -c -F 'Scan incomplete'        "$OUT/$REPO/push.err" || true)
```

| Counted | Class | Meaning |
|---|---|---|
| `PRC=0`, clean tally | pushed | go on to the per-ref verification |
| `PRC=1`, `rr>=1`, `gh>=1`, `pp>=1` | refused by push protection | `loc` secret locations, `inc` scan flag; remote unchanged |
| `PRC=1`, `rr>=1`, `gh>=1`, `pp=0` | refused by a rule | none is expected (no ruleset, no protection) |
| `PRC=1`, `rr>=1`, `gh=0` | refused by the server, unattributed | hook, email block or other; the markers are not GitHub's current wording if this appears for a secret |
| `PRC=1`, `cr>=1`, `st>=1`, `gh=0` | branch moved | the lease refused; nothing was sent |
| `PRC=128`, no porcelain line | transport or authentication | nothing is known to have changed until read back |
| anything else | unclassified | stop |

Attribution (`gh`, `pp`) only chooses the hand-back wording; every refusal takes the same stop. The two attribution markers are
ASCII on purpose (the headings use a long dash) and come from published logs of 2024 and 2026, so they are checked against the
live wording at the first refusal rather than trusted.

**What every stop leaves, and what follows.** After any non-zero `PRC` the procedure runs one read-only
`git ls-remote origin refs/heads/master` and records whether the tip equals the old column (unchanged), the new tip
(updated although the exit status said otherwise), or another value (someone moved it); it also records that
`git ls-remote origin 'refs/pull/*'` still equals the list taken before. It then stops: the remote is unchanged in every
refusal class (the one ref is accepted or not), the mirror, the backup and the kept `push.txt`, `push.err` and tally are
untouched, the push is never repeated by the procedure, and the report carries the class, the tally, `rr`, `gh`, `pp`, `loc`,
`inc` and the read-back, no message text. For a push-protection refusal what follows is a person's decision, made from the
kept stderr file read locally: remove the finding from the rewrite (extend the purge list and redo the rewrite from the
backup, which changes the new tip), or open the block's URL as the pushing account within three hours and have the push
requested again as a fresh job under a grant that names it; the procedure itself does neither. A moved branch is handed back
for a fresh clone and rewrite: the old column is no longer true. The other repository waits.

**Why not the design's `--mirror --force` form.** It is the form GitHub's and git-filter-repo's guides print, and it works for
a repository whose server state is known to equal the clone. Here its guard is only the comparison immediately before it: it
deletes a branch that appeared, rewrites a branch that moved in the interval, lists local pull refs as new, and gives the
lease nothing to do. The explicit refspec with the lease moves the condition into the push itself and removes the delete and
create cases by construction, at no cost in a repository whose only branch is `master`; the comparison stays because it
also catches tags and any other ref.

## 7. Load-bearing claims

1. `--mirror` force-updates and deletes. "locally updated refs will be force updated on the remote end, and deleted refs will be
   removed from the remote end.  This is the default if the configuration option `remote.<remote>.mirror` is set." —
   [git-push.adoc](https://github.com/git/git/blob/v2.55.0/Documentation/git-push.adoc), git `v2.55.0`.
2. `--force` defeats the lease. "This flag disables that check, the other safety checks in PUSH RULES below, and the checks in
   `--force-with-lease`." — same file and tag.
3. `+` equals `--force`. "The `+` is optional and does the same thing as `--force`." — same file and tag.
4. The explicit lease form. "`--force-with-lease=<refname>:<expect>` will protect _<refname>_ (alone), if it is going to be
   updated, by requiring its current value to be the same as the specified value _<expect>_" and "Note that all forms other than
   `--force-with-lease=<refname>:<expect>` that specifies the expected current value of the ref explicitly are still
   experimental" — same file and tag.
5. Dry run sends nothing. "Do everything except actually send the updates." — same file and tag. `--atomic`: "Either all refs
   are updated, or on error, no refs are updated." — same.
6. The porcelain format and flags. "`!`;; for a ref that was rejected or failed to push; and"; "rejected:: Git did not try to
   send the ref at all, typically because it is not a fast-forward and you did not force the update."; "remote rejected:: The
   remote end refused the update.  Usually caused by a hook on the remote side" — same file and tag.
7. The mirror option implies force and a mirror remote forces. In `cmd_push`: `OPT_BIT( 0 , "mirror", &flags, N_("mirror all refs"),
   (TRANSPORT_PUSH_MIRROR|TRANSPORT_PUSH_FORCE)),` and `if (r->mirror) inner_flags |= (TRANSPORT_PUSH_MIRROR|TRANSPORT_PUSH_FORCE);`
   and `die(_("--mirror can't be combined with refspecs"));` — [builtin/push.c](https://github.com/git/git/blob/v2.55.0/builtin/push.c),
   `v2.55.0`.
8. Force wins over the stale check. "`--force` will defeat any rejection implemented by the rules above." (written there as
   `"--force" will defeat any rejection implemented by the rules above.`) — `set_ref_status_for_push` in
   [remote.c](https://github.com/git/git/blob/v2.55.0/remote.c), `v2.55.0`.
9. The push protocol carries the old value. "update            =  old-id  SP new-id  SP name" —
   [gitprotocol-pack.adoc](https://github.com/git/git/blob/v2.55.0/Documentation/gitprotocol-pack.adoc), `v2.55.0`.
10. GitHub's removal guide's push step and `refs/pull/*`. "Even though `--force` is implied by `--mirror`, we include it below
    as a reminder that you are forcibly updating all branches, tags, and refs"; "This command will fail to push any refs
    starting with `refs/pull/`, since GitHub marks those as read-only."; "Repeat until the only failures to update are refs
    starting with `refs/pull/`." —
    [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository),
    GitHub Docs source read 2026-11-12 (the rendered page substitutes "GitHub" for the template variable).
11. Support handles the pull-request refs. "Run a garbage collection on the server to expunge the sensitive data from storage."
    and "Remove cached views." — same page.
12. git-filter-repo's manual. "If any of your colleagues have pushed any changes since you started, this force push command will
    discard their changes." and "Yes, I know that --mirror implies --force and is unnecessary." —
    [Documentation/git-filter-repo.txt](https://github.com/newren/git-filter-repo/blob/v2.47.0/Documentation/git-filter-repo.txt), `v2.47.0`.
13. Push protection for users. "Is enabled by default"; "Stops you from pushing secrets to public repositories on GitHub";
    "Does not generate alerts when you bypass push protection unless push protection is also enabled at the repository level".
    Repositories: "Requires GitHub Secret Protection to be enabled"; "Is disabled by default". —
    [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection), GitHub Docs read 2026-11-12.
14. Provider patterns versus generic patterns. "GitHub blocks pushes containing provider-specific credentials where push
    protection is supported for that secret"; "Scanning for generic patterns and push protection must be enabled in your
    repository's security settings or security configuration for this to work." — same page.
15. Block timing. "Rather than alerting you to credential leaks after the fact, push protection blocks pushes that contain
    secrets _before_ they reach your repository." — same page.
16. Discord Bot Token. In `src/secret-scanning/data/pattern-docs/fpt/public-docs.yml` (GitHub Docs, `main`, 2026-11-12):
    `provider: Discord`, `supportedSecret: Discord Bot Token`, `secretType: discord_bot_token`, `isPublic: true`,
    `hasPushProtection: true`. Rendered at the
    [supported patterns reference](https://docs.github.com/en/code-security/reference/secret-security/supported-secret-scanning-patterns).
17. Display limit and existing alerts. "Up to five detected secrets will be displayed at a time on the command line. If a
    particular secret has already been detected in the repository and an alert already exists, GitHub will not block that
    secret." — [Push protection from the command line](https://docs.github.com/en/code-security/concepts/secret-security/command-line-push-protection).
18. The scan can time out. "If secret scanning upon a push times out, GitHub will still scan your commits for secrets after the
    push." — [Push protection from the command line](https://docs.github.com/en/code-security/concepts/secret-security/command-line-push-protection)
    (the note on pushes of several branches, which also says a push "may be blocked due to additional and unintended refs being
    pushed"), read 2026-11-12.
19. Bypass of a command-line block. "Visit the URL returned by GitHub when your push was blocked, **as the same user that
    performed the push**. If a different user attempts to visit this URL, they will receive a `404` error."; "Click **Allow me
    to push this secret**."; "Reattempt the push on the command line within three hours." — same page.
20. Users' bypass has no reason or alert. "With push protection for users, GitHub will automatically block pushes to public
    repositories if these pushes contain supported secrets, but you won't need to specify a reason for allowing the secret, and
    GitHub won't generate an alert." — same page.
21. The account setting. "Under "User", to the right of "Push protection for yourself", update your settings." —
    [Managing push protection for users](https://docs.github.com/en/code-security/how-tos/secure-your-secrets/prevent-future-leaks/manage-user-push-protection).
    "Although we don't recommend it, you can also disable push protection entirely in your user security settings." —
    [Keeping secrets out of public repositories](https://github.blog/2024-02-29-keeping-secrets-out-of-public-repositories/), 2024-02-29.
22. Default for all users. "Now, we've enabled secret scanning push protection by default for all pushes to public
    repositories." — same post. Earlier opt-in: "ensures your pushes are protected whenever you push to a public repository on
    GitHub" — [changelog 2023-08-09](https://github.blog/changelog/2023-08-09-users-can-enable-push-protection-for-themselves/).
    Repository defaults are separate: "Existing public repositories are not affected, nor are new public repositories that
    belong to an organization." — [changelog 2024-03-11](https://github.blog/changelog/2024-03-11-secret-scanning-and-push-protection-are-enabled-by-default-on-new-public-repositories/).
23. A block where the repository has scanning off. "remote: - GITHUB PUSH PROTECTION", "(?) This repository does not have Secret
    Scanning enabled, but is eligible.", "(?) To push, remove secret from commit(s) or follow this URL to allow the secret." —
    [community discussion 140034](https://github.com/orgs/community/discussions/140034), comment of 2026-03-15; one report. The
    line "remote: error: GH013: Repository rule violations found for refs/heads/main." is in the same discussion's opening post,
    of 2024-09-28, by another user.
24. Scan budget and the client line. "Scan incomplete: This push was large and we didn't finish on time." and "! [remote rejected]
    gh-pages -> gh-pages (push declined due to repository rule violations)"; staff reply: "we recently enabled push protection for
    users across GitHub, and that included apps and bots like GitHub Actions." —
    [community discussion 114723](https://github.com/orgs/community/discussions/114723), 2024-03-29 and 2024-04-01; one report.
25. The 2 GiB push limit. "GitHub has a maximum 2 GiB limit for a single push." —
    [Troubleshooting the 2 GiB push limit](https://docs.github.com/en/get-started/using-git/troubleshooting-the-2-gb-push-limit), read 2026-11-12.
26. The private-email block checks the tip. "each time you push to GitHub, we'll check the most recent commit. If the author email
    on that commit is a private email on your GitHub account, we will block the push" —
    [Blocking command line pushes that expose your personal email address](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/blocking-command-line-pushes-that-expose-your-personal-email-address), read 2026-11-12.
27. Pull refs are hidden from receive-pack, and the porcelain format, `Done` and `[remote rejected]` lines as established earlier:
    [`github-residual-exposure-and-visibility.md` §3.2 and §3.6](../../research/github-residual-exposure-and-visibility.md#32-pull-request-refs-observed-documented)
    (their sources are listed there).

## 8. Gaps

- **No GitHub refusal was reproduced.** Writing to either public repository was out of bounds and neither holds a known
  secret, so the stderr markers `GH013` and `GITHUB PUSH PROTECTION` rest on two users' published logs (2024, 2026), the
  porcelain reason text on the 2024 log's human-form line, and the `[remote rejected]` shape on git's source and the local
  experiment. If the live wording differs, the attribution counts read 0 and the push is classed "unattributed", which takes the
  same stop. The first real refusal is the check.
- **Whether the pusher's account has push protection for users on is not read.** Neither the REST description nor the
  documentation was found to expose the setting; the settings page is the only place. It is "enabled by default" and rolled
  out to all users in 2024; the plan treats it as on. If it is off, a push that would have been blocked goes through, and the
  consequence is only that this class never occurs.
- **Organisation-owned repositories and a classic or OAuth token are not addressed explicitly** by the documentation of push
  protection for users; the reading that it applies rests on the absence of an exemption and on the 2024 staff statement.
- **What GitHub scans in a push is undocumented**: new commits, their diffs, or reachable blobs; whether an object the
  repository already stores is skipped; the time budget (five seconds is one competitor's claim); and what an incomplete scan
  does besides letting the push through and scanning afterwards. The local measurement (a purge rewrite sends commits and trees,
  no blob) says the pack is small; it does not say what GitHub reads. The gitleaks result on the kept files is the only
  content evidence, and GitHub's provider patterns are not gitleaks' rules.
- **Whole push versus per ref is not documented** for push protection; irrelevant for one ref.
- **Whether GitHub's receive path rejects an update whose old value changed after the advertisement** (git's receive-pack does,
  observed) is not observable here. If it does not, the unguarded window is from the push's own advertisement to its update.
- **The wording of the private-email refusal and of a branch-protection refusal on the current platform was not collected**;
  both are classed by `[remote rejected]` with `gh=0` or `gh>=1, pp=0`.
- **The experiment used file-path transport.** The client code that decides flags, summaries and exit status is the same for
  HTTPS; the server's text and capabilities are GitHub's own. Windows credential handling (`gh auth git-credential` with a URL
  destination rather than the remote name) was not run against GitHub; it is keyed by host, so the URL form is expected to use
  the same helper, but that is an inference.
- **The request service's deny matching was not examined**; the remark in section 5 is a precaution about text patterns, not a
  finding about that service.
