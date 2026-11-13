# Phase 0 · 7 — Rewriting BotTools, TrumpBot and Support, and replacing the TrumpBot clone: research

This file holds the questions this unit's design rests on that need evidence beyond what the phase's earlier findings
established, and the earlier findings that already answer the rest. Each new question is answered by its own findings
file in this folder. The verification of the claims those findings rest on, and the summary of what they establish,
follow below the questions.

**What the work is.** BotTools, TrumpBot and Support are rewritten, force-pushed and proven clean as GKB2 and GKB were,
what GitHub still serves of their old histories is measured, and the local TrumpBot clone is replaced by a fresh clone
at the same path ([the parent design](../../architecture.md) §6.4, §6.6, §9.5 and §15, unit 7). The work divides into
four parts, each inside one system of the phase:

- **the tools** (the toolchain): the workspace tools extended for these three repositories, with no write to GitHub;
- **the rewrites** (the rewrite pipeline): the pipeline's stages 1 to 8 for each repository, BotTools' pull-request
  residual counted on its fresh mirror;
- **the residual measurement**: the pipeline's stage 9, the probes and the feed reads, over all three repositories once
  the last push is verified;
- **the clone replacement** (the clone realignment): the TrumpBot clone replaced once TrumpBot's push is proven.

**What is already established and not asked again.** The phase's earlier findings were verified at source between
2026-10-20 and 2026-11-13, and the earlier units have run the procedures they describe on this machine, whose tools are
at the same pins today. They are cited instead of researched again:

| What the design needs | Answered by |
|---|---|
| The rewrite: the invocation, its pre-run and post-run checks, and its records | [`../../research/git-filter-repo-on-windows.md`](../../research/git-filter-repo-on-windows.md) §6.4 to §6.7, with the GKB2 and GKB unit's tools as they ran ([its plan, Appendix A](../../26-gkb2-gkb-rewrite/plan.md#appendix-a--the-tools)) |
| The manifests of purged blob ids, the expectation rows, and the variant pinned to the pull-request refs, which predicts that all 39 of BotTools' purged blobs stay reachable through its two pull-request refs | [`../../research/clone-realignment-and-data-extraction.md`](../../research/clone-realignment-and-data-extraction.md) §6.2 and §6.6; [`../../research/purge-blast-radius.md`](../../research/purge-blast-radius.md) §3.A and §6.1; [the preparation unit's as-built record, §3.5](../../21-preparation/final-implementation.md#35-manifests-and-expectation-rows) |
| The positive controls on the untouched backups: TrumpBot's named probes fire, and BotTools and Support hold none of the six owned rule ids | [`../../research/gitleaks-local-and-ci.md`](../../research/gitleaks-local-and-ci.md) §6.7; [the preparation unit's as-built record, §3.6](../../21-preparation/final-implementation.md#36-positive-controls-on-the-untouched-backups) |
| The scan wrapper, the exit tests, and the reading of a default-rule finding in a kept file | `gitleaks-local-and-ci.md` §6.8; the GKB2 and GKB unit's exit tests as they ran ([its as-built record, §3.4](../../26-gkb2-gkb-rewrite/final-implementation.md#34-the-exit-tests)) |
| The one scoped allowlist table of the current scan configuration, which matches a single KotlinBottools document and nothing in the legacy repositories | [`../../24-repository-hygiene/research/scoped-allowlist-semantics.md`](../../24-repository-hygiene/research/scoped-allowlist-semantics.md) |
| The push of one branch: a refspec push under an explicit lease on the old tip read at run time, after a dry run, never `--mirror`; the guards, the expected tally, the classes read from counted markers; GitHub's push protection for users, which applies to pushes to public repositories | [`../../26-gkb2-gkb-rewrite/research/force-push-and-push-protection.md`](../../26-gkb2-gkb-rewrite/research/force-push-and-push-protection.md) |
| The hidden `refs/pull/*`, the receive-pack advertisement (which lists `atomic` among its capabilities), the porcelain format and its tally, the push preparation, and the per-ref verification on two channels | [`../../research/github-residual-exposure-and-visibility.md`](../../research/github-residual-exposure-and-visibility.md) §3.2, §3.6 and §6.2 |
| The residual probes: the routes and what each status means on each, the controls, the budgets, the activity feed and the events; who can read a private repository's objects (anyone with read access, signed in; nobody anonymously) | the same file, §3.1, §3.3, §3.4, §3.7, §6.1 and §6.3, with the publication unit's corrected route rules ([its research summary, §2](../../25-kotlinbottools-publish/research/README.md#2-the-anonymous-measurements-and-the-access-check)) |
| The TrumpBot clone's replacement: the archive of its untracked files, the move of the old clone as the lock probe, the fresh clone, the restore without overwriting, the proofs, and the deletion of the old clone last | `clone-realignment-and-data-extraction.md` §3.6 and §6.5, with the caveat that question 2 below addresses |

**The current state the questions start from**, read on 2026-11-13:

- **The three repositories** each advertise exactly the refs recorded when the workspace mirrors were cloned, and none
  has a tag, a release, a fork, a wiki repository, a ruleset, branch protection or a workflow.
  - **BotTools** is public, with the branches `main` and `Working-Branch` and the pull-request refs `refs/pull/2/head`
    and `refs/pull/3/head`; both pull requests were merged from `Working-Branch`. Secret scanning and push protection are
    off on it. It has one active webhook, to a CircleCI host, subscribed to push events among others, with no delivery in
    GitHub's retained window; no commit of its history holds a CircleCI configuration. The webhook stays as it is, and
    the deliveries the push makes are recorded by count.
  - **TrumpBot** is private, with the branches `main` and `feature/pokercommand`.
  - **Support** is private, with `main` only.
- **The rewrite changes** BotTools' 16 commits into 15, TrumpBot's 11 into 9 and Support's 2 into 1, and removes 39, 199
  and 7,259 purged blobs ([the expectation rows](../../21-preparation/final-implementation.md#35-manifests-and-expectation-rows)).
- **The push** goes from a bare mirror whose `origin` is the repository, with git 2.55.0.windows.5 and
  `gh auth git-credential` as the only credential helper, under an organisation administrator's classic token holding
  `repo`. It is carried out on request by the request service, which runs a request's procedure as one shell and whose
  own settings deny `git push --force`, `git push -f` and `git push --force-with-lease` unless the grant for a job lifts
  them.
- **The local TrumpBot clone,** `%PROJECTS%\TrumpBot`, holds `main` only, one pack and no stash. Besides the four
  `.idea/` files the parent design records (three untracked, one ignored), it now holds a code knowledge graph: 55 files
  under `graphify-out/`, built from the pre-rewrite working tree and ignored through an entry in the clone's own
  `.git/info/exclude`, with two git hooks that rebuild it. Its local configuration holds two keys a plain clone does not
  write, `submodule.active` and `lfs.repositoryformatversion`. The fresh clone keeps the four `.idea/` files only; once
  it is proven, the graph is rebuilt from the rewritten tree by a code-only build, which installs the two hooks.
- **The volumes.** The TrumpBot clone sits in the project-checkouts folder, on a volume other than the system volume
  that holds the user profile and with it the workspace, `%USERPROFILE%\BotWS`.
- **The tools.** The workspace holds the GKB2 and GKB unit's 22 tools in `tools/g26/`, with a parameter table that has
  rows for GKB2 and GKB only and one branch per row, and the gaps and follow-ups that unit recorded for these three
  repositories ([its consequences, §5 and §6](../../26-gkb2-gkb-rewrite/consequences.md#5-known-gaps)), all of which are
  closed before the first push of this work.

---

## The questions

### 1. A repository with two branches: one push of both refs under a lease each, with or without `--atomic`, or one push per branch?

BotTools (`main`, `Working-Branch`) and TrumpBot (`main`, `feature/pokercommand`) each have two branches; Support has
one, which the established form of one ref covers. The earlier findings settle the push of one branch: a refspec push to
the repository's URL under an explicit lease on the old tip, read from `ref-map` when the procedure runs, after a dry run
of the same, with guards before it, a tally of its porcelain lines, and a class read from counted markers. They quote
git's documentation of `--atomic` ("Either all refs are updated, or on error, no refs are updated") and record that
GitHub's receive-pack advertises `atomic`. They do not establish how several explicit leases behave in one push, with and
without `--atomic`, what the push prints when one of them fails, or which states each form can leave on the server.

- **Options worth comparing.**
  - One push of both refspecs with an explicit lease on each, and `--atomic`.
  - The same push without `--atomic`.
  - Two pushes, one per branch, each in the established form of one ref: as two requests, or as two pushes inside one
    request.
- **Requirements an answer must meet.**
  - No branch that has moved since the mirror was cloned is ever overwritten; nothing is created or deleted on the
    server; `refs/pull/*` are untouched.
  - The outcome for the repository is read from the exit status, the porcelain lines and fixed markers counted in the
    error stream, which is never printed. The answer gives, for each option: the expected tally of a clean push of two
    forced refs; what the dry run and the push print, and the exit status, when one lease is stale, when the server
    refuses one ref (a hook, or push protection on the public repository), and when the connection is lost; and which
    server states each failure can leave (neither ref updated, one, or both).
  - Whether a refusal by push protection for users of one ref's commits refuses both refs under each option, for the
    public repository; push protection for users does not apply to the private ones.
  - Whether GitHub applies an atomic push all or nothing on its side, beyond advertising the capability.
  - What a force-push of two branches publishes besides the refs: the activity feed's entries and the events per ref,
    and the push deliveries to BotTools' one webhook, with how each can be counted without reading a payload.
  - git 2.55.0.windows.5 in Git Bash, a bare mirror, `gh auth git-credential` as the only credential helper, the
    repository's URL as the destination; the request service runs a request's entries as one shell.
- **Evidence that would settle it.** git's documentation of `git push` at v2.55.0 (`--atomic`, `--force-with-lease`,
  `--porcelain`, `--dry-run`), and its source where the documentation is silent (how `send-pack` treats the other refs
  of an atomic push when one is rejected on the client side, and how it reports a server's refusal of one ref); a local
  experiment in a scratch folder outside every repository, with bare repositories standing in for the server (one whose
  branch has moved since the clone, one whose pre-receive hook refuses one of the two refs, each with and without
  `--atomic`), recording the porcelain lines, the exit status and the server's refs afterwards; GitHub's documentation and
  changelog on atomic pushes, on push protection for users, on the push webhook event and its `forced` field, on the
  REST endpoints that list a hook's deliveries, and on the repository activity and events endpoints.
- **Findings file:** [`two-branch-lease-push.md`](two-branch-lease-push.md).

### 2. Moving the old TrumpBot clone aside as the lock probe, when the workspace sits on another volume: where does it go, and what does the fresh clone hold?

The earlier procedure moves the clone into the workspace before the fresh clone is made, because a rename of a directory
fails with no effect while any process holds a file inside it, which proves that nothing holds the clone; it was
observed on one volume. The clone sits in the project-checkouts folder, on another volume than the workspace, so that
move is not a rename. The old clone holds every pre-rewrite object of TrumpBot until it is deleted, last.

- **Options worth comparing.**
  - A folder beside the clone, in the project-checkouts folder, on the clone's volume.
  - A folder on the clone's volume outside the project-checkouts folder, created for the replacement, with access
    limited to the account.
  - The workspace as the target, with the rename replaced by a scan for open files (the workspace's `lockprobe.py`)
    followed by a copy and a deletion.
- **Requirements an answer must meet.**
  - The move fails with no effect while any process holds a file inside the clone, and leaves the old clone whole, so
    that a stop after it can move the clone back.
  - The old clone becomes readable or modifiable by no more accounts than the clone is today, and it is deleted last.
  - The answer states what a plain `git clone` writes into `.git` on this machine (the hooks, `info/exclude`, the local
    configuration keys, including whatever an installed Git LFS adds), so that the fresh clone's proofs can name exactly
    what it holds, and how the check of the restored untracked files reads when four of the old clone's 59 untracked or
    ignored files are carried and the graph's files, its exclude entry, its hooks and the two configuration keys are not.
  - Git Bash on Windows 11, NTFS on both volumes, git 2.55.0.windows.5. The clone is not open in IntelliJ IDEA; its two
    hooks run git commands on a commit or a checkout.
  - Nothing of the old clone's content, and no pre-rewrite id, is printed.
- **Evidence that would settle it.** Microsoft's documentation of `MoveFileEx` and `MoveFileWithProgress` on directories
  and volumes, and of NTFS rename semantics with open handles; the Cygwin and MSYS2 `rename` implementation and GNU
  coreutils' `mv` fallback when a rename crosses devices (source); a local experiment on this machine in scratch folders
  on both volumes, outside every repository, with a file held open inside a scratch directory: a rename on one volume,
  and a move across volumes, recording what each leaves behind; git's documentation of `git clone` and of templates; this
  machine's git configuration and installed Git LFS, read only.
- **Findings file:** [`clone-move-aside-on-windows.md`](clone-move-aside-on-windows.md).

### 3. What must change in the workspace tools for BotTools, TrumpBot and Support, and which recorded gap does each change close?

The GKB2 and GKB unit's tools take a repository's name and read its policy from a parameter table and from the
preparation unit's expectation rows, so that a later unit adds rows. They were written for two public repositories with
one branch each and no clone replacement, two of them name GKB2 and GKB outside the table, and the unit recorded their
gaps and follow-ups for this work. This work runs them in three parts: the rewrites (stages 1 to 8), the residual
measurement over three repositories after the last push (stage 9 and the close-out's feed reads), and the clone
replacement, which reuses the preparation unit's clone scripts. The tools part changes them before any push.

- **Options worth comparing.**
  - Extending the tools in their folder, with rows added and edits where these repositories differ.
  - A new tool folder derived from them for this work, the earlier folder kept as it ran.
- **Requirements an answer must meet.**
  - An inventory of every tool the three parts run, the unit's 22 and the earlier tools they call: what each does, what
    it assumes about a repository (one branch, a public repository, a repository named in its text, a pull-request ref
    inside its branch), and what each of the three repositories and each part needs changed.
  - The parameter rows the three repositories need, with where each value comes from (the expectation rows, the
    recorded listings, the lists' checksums, the positive control's probe arguments), as counts and file names only.
  - Each recorded gap and follow-up of the GKB2 and GKB unit ([its consequences, §5 and §6](../../26-gkb2-gkb-rewrite/consequences.md#5-known-gaps);
    [its as-built record, §4](../../26-gkb2-gkb-rewrite/final-implementation.md#4-deviations-from-the-plan)) mapped to the
    files it touches: the reply classifier and the shape in which the request service delivers a reply, the untested
    stops and branches, the self-test run by test level, the output rule for every step, the budget's reading, the
    close-out run twice, the test plan's case labels, and the thirteen documentation points.
  - The preparation unit's clone scripts read against the clone as it is today: which checks stop on the hooks and the
    exclude entry, and what the archive and the check of the restored set take in when only the four `.idea/` files are
    carried.
  - `k0-ready.sh` and `save-tools.sh` are never run.
  - Nothing is run; the tools and records are read only. No pre-rewrite id, purged blob id, path under the legacy data
    folders, name or secret is printed or written.
- **Evidence that would settle it.** The tools themselves in the workspace, read only; the GKB2 and GKB unit's plan
  (Appendix A holds every tool's source, Appendix B its pin), as-built record and consequences; the preparation unit's
  plan and as-built record; the request service's protocol for the shape of a `done` reply; the parameter table and the
  expectation rows.
- **Findings file:** [`tool-changes-for-three-repositories.md`](tool-changes-for-three-repositories.md).

---

## Verification results

The 32 outside-world claims the three findings files end with were checked at their sources on 2026-11-13: 31 hold and
1 fails as cited. The behaviour behind the failed citation holds, so no recommendation changes.

| Findings file | Claims | Result |
|---|---|---|
| [`two-branch-lease-push.md`](two-branch-lease-push.md) §10 | 20 | 19 hold; claim 8 fails as cited |
| [`clone-move-aside-on-windows.md`](clone-move-aside-on-windows.md) §9 | 9 | 9 hold, claim 6 with a caveat |
| [`tool-changes-for-three-repositories.md`](tool-changes-for-three-repositories.md), Load-bearing claims | 3 | 3 hold |

- **`two-branch-lease-push.md`, claim 8, fails as cited.** The function that marks the other refs of an atomic push as
  failed, `reject_atomic_push`, and its comment "Mark other refs as failed" are in
  [`transport-helper.c`](https://github.com/git/git/blob/v2.55.0/transport-helper.c) at `v2.55.0`, with the status
  `REF_STATUS_ATOMIC_PUSH_FAILED` declared in `remote.h`; they are not in `remote.c`. `transport.c` prints the status as
  `atomic push failed`, as the claim says. What the design uses, the sibling label on the other refs of a refused atomic
  push, holds at the corrected source.
- **`two-branch-lease-push.md`, claim 18.** The sentence on three days of deliveries describes the web page's list of
  recent deliveries; the documentation's retention value for GitHub's cloud plans is the same three days, which is what
  the design relies on.
- **`clone-move-aside-on-windows.md`, claim 6, holds with a caveat.** Both quoted passages are in the MSYS2 runtime's
  `syscalls.cc` at the cited commit, but the passage on `STATUS_NOT_SAME_DEVICE` concerns a volume mount point. An
  ordinary rename across volumes gets `EXDEV` from the runtime's own check before any call into Windows (the same file,
  "Check cross-device before touching anything"). Either way GNU `mv` then copies and removes, which is what the finding
  uses; the retry inside the runtime covers only the open of the source, as claimed.
- **`clone-move-aside-on-windows.md`, claim 7.** git's documentation says what `--recurse-submodules` sets; it does not say
  that nothing else sets `submodule.active`. That a plain clone does not set it is the local experiment's observation.
- **Currency.** git `v2.56.1` is the newest release; every quoted git passage is unchanged there. The phase stays at
  2.55.0.windows.5.
- **Claims about this machine and this repository** are not re-sourced; they were read again against the workspace, the
  backups and the clone, as counts: the positive control's probe arguments in the preparation unit's `s8-row.sh` (nine
  for TrumpBot, none for BotTools and Support), the order gate on the other repository's stage 9 in the earlier library,
  the earlier save step's removal of its own folder before saving, the purge lists' sizes (9, 23 and 6 lines), the 13 old
  commits behind BotTools' pull-request refs, none of them reachable only from those refs before the rewrite, the clone's
  inherited access entries, and the system configuration's credential helper, which is not `gh`.

---

## Summary

### 1. The push of a repository's branches

**Found.** In one push with an explicit lease per branch, git checks each lease against the server's advertised value on
the client, before anything is sent. With `--atomic`, a stale lease on either ref sends nothing and labels the other ref
`[rejected] (atomic push failed)`; without it the other ref goes, and one ref is updated
([findings §4.1 and §4.2](two-branch-lease-push.md#41-what-git-does-with-several-leases-and-with---atomic-documented-source-observed)).
On the server, git applies an atomic push as one transaction: an `update` hook refusing one ref, or a ref that moves
after the push's own advertisement, leaves neither ref updated, with the other ref labelled `(atomic push failure)` or
`(atomic transaction failed)`; without `--atomic` each of these leaves one ref updated. A `pre-receive` refusal refuses
every ref in either form. A clean push of N forced refs tallies `forced=N fastforward=0 new=0 deleted=0 uptodate=0
rejected=0 done=1 pull_lines=0 other_refs=0 bad=0` with exit status 0, in either form, and its dry run reads the same. The
dry run catches a stale lease and nothing the server decides. A lost connection prints a lone `Done`, no `To` line, exit
status 1 and `fatal:` lines on the error stream, and leaves neither ref or both, in either form, so only a read-back of
every branch names the state. GitHub advertises `atomic`; that its receive path applies an atomic push all or nothing is
not documented, and one public log of a refused branch whose sibling was refused as `(atomic transaction failed)` is
consistent with it ([§4.3](two-branch-lease-push.md#43-does-github-apply-an-atomic-push-all-or-nothing-documented-capability-one-public-log-not-established)).

**Recommended.** One request per repository, carrying one `git push --porcelain --atomic` with an explicit lease on every
branch, each old tip read from `ref-map` when the procedure runs, the repository's URL as the destination, and the same
line run first as a dry run. N, the number of leases and refspecs, is taken from `ref-map`'s changed heads: 2 for BotTools
and TrumpBot, 1 for Support, which takes the same path. The argument check requires exactly one `--atomic` and one lease
per refspec, and still forbids `--force`, `-f`, `--mirror`, `--all`, `--delete`, `--prune` and a leading `+`. The classes
add the atomic sibling wording to the counted markers, and a transport class read from a missing `To` line with `fatal:`
markers rather than from exit status 128. After every non-zero status, and before any further step, a read-back of every
branch names the server's state: **neither** branch updated, **both**, or **partial**. Partial is not expected under
`--atomic`; it stays a class because GitHub's side is not documented, and it hands back with each branch's reading, with no
push following without a person's decision
([§7](two-branch-lease-push.md#7-recommendation-for-this-repository)).

**What a push publishes.** Per rewritten branch, one push event, one `force_push` entry in the activity feed and, for
BotTools, one push delivery to its webhook: 2 of each for BotTools, inferred from the per-ref fields of the event's schema.
Each is counted by a filter that prints a number only; the list of a webhook's deliveries carries no payload. GitHub lists
deliveries for 3 days, so BotTools' are counted right after its push. The events cover 30 days and can lag by up to 6 hours
([§4.5](two-branch-lease-push.md#45-what-a-force-push-of-two-branches-publishes-and-how-to-count-it-documented-observed-idiom)).

**Options that do not fit.** One push of both refs without `--atomic`: every failure that concerns one ref leaves a
half-rewritten repository, whose only repair is a second force-push, which the phase never makes blindly. One push per
branch: it makes the half-rewritten repository an ordinary state between the two pushes, doubles the requests, and keeps
the same race window in each push.

### 2. Moving the old clone aside, and the fresh clone

**Found.** On Windows a directory rename refuses with no effect while anything inside is open, and cannot cross volumes
(Microsoft's file-system specification). Observed: the rename refused, with the tree whole and nothing at the target, for
nine kinds of holder, a directory handle and a working directory inside the tree among them. Across volumes, GNU `mv`
copies and then removes: with one file held open it left a full copy at the target and 130 of the source's 135 entries
deleted. A renamed tree keeps its own access entries, and a restricted parent folder narrows nothing, because every account
may traverse folders it cannot list. `lockprobe.py` counts open files only, so a working directory or a directory handle
inside the clone scores 0 on it
([findings §1 and §3](clone-move-aside-on-windows.md#1-bottom-line)).

**Recommended** ([§6](clone-move-aside-on-windows.md#6-recommendation-for-this-repository)).

- **Where the old clone goes:** beside the clone, on its own volume, by one rename: `%PROJECTS%\TrumpBot` becomes
  `%PROJECTS%\TrumpBot-old`. Guards before it: the target absent; the clone and the target's parent on the same volume
  (`stat -c %d`), so that `mv` can never copy; `lockprobe.py` at 0 as a pre-check; no git process; the procedure's shell
  outside the clone; the old clone's census recorded.
- **The move, read from state:** a bounded retry of the rename, the outcome read from whether each of the two paths
  exists, never from `mv`'s status. A loop that ends refused is a stop that changed nothing. After a stop that follows the
  rename, the partial fresh clone is removed and the same rename runs back.
- **The old clone is deleted last,** on its own volume. The workspace's deletion does not reach it, so the replacement's
  own acceptance includes "no old-clone path remains".
- **What the fresh clone holds, on this machine:** exactly the ten local configuration keys a plain clone writes, no hook
  beyond the samples, an exclude file of comment lines only, one pack and no `FETCH_HEAD`. `submodule.active` comes only from
  a recursive clone and `lfs.repositoryformatversion` only from a later Git LFS command, so neither is carried or expected.
- **What is carried:** the `.idea/` records of the old clone's untracked-and-ignored listing, behind a closed-set guard: 59
  files, 4 under `.idea/`, 55 under `graphify-out/`, 0 elsewhere, a file outside the two folders being a stop. The
  restored set equals the four-file list. Once the code-only graph build has run, the clone holds the two hooks and the one
  exclude entry again.

**Options that do not fit.** A move into the workspace on the system volume: a copy followed by a deletion, which is no
lock probe and puts the irreversible deletion first. A restricted folder on the clone's volume: one more folder, and
nothing narrowed.

### 3. The tools

**Found.** Nearly every one of the GKB2 and GKB unit's tools changes for these three repositories: the parameter row is
read by position, the push holds one branch in a dozen places, the repositories differ in visibility, hooks and probes,
and the recorded documentation points touch almost every file. The earlier save step removes its folder before saving,
and the earlier unit's records pin the earlier files
([findings §1](tool-changes-for-three-repositories.md#1-bottom-line)).

**Recommended** ([§11](tool-changes-for-three-repositories.md#11-recommendation-for-this-repo)).

- **A new, self-contained tool folder** derived from the earlier one, saved from its own plan and pinned; the earlier
  folder stays as it ran.
- **Four tool sets in it:** the rewrite set (readiness, stages 1 to 8, the reset after a stop); the residual set (a
  readiness check that all three repositories have passed stage 8, stage 9, and the close-out's feed reads and records);
  the clone set (the replacement as a request procedure, with a builder); and the self-test, run by test kind, each kind
  with its own total.
- **The order gate between repositories** moves from the other repository's stage 9 to its stage 8, so that each push
  waits only for the previous repository's verification.
- **The parameter table carries the policy:** the branches, the visibility, the default branch, the hook count, the probe
  arguments and the gate. The rows are given in [§6](tool-changes-for-three-repositories.md#6-the-parameter-rows):
  - BotTools: a 9-line list, 2 heads, 2 pull-request refs, 28 commits on every ref of a fresh mirror (the 15 rewritten and
    the 13 old ones its pull-request refs keep), a residual of 39 and no probe arguments;
  - TrumpBot: a 23-line list, 2 heads, 9 commits and nine probe arguments;
  - Support: a 6-line list, 1 head, 1 commit and no probe arguments.

  The repository ids, read on 2026-11-13, are 540122713 (BotTools), 540208924 (TrumpBot) and 540146440 (Support). The two
  private repositories report no security settings; BotTools reports secret scanning and push protection disabled; none
  has a fork or a Pages site.
- **Four things beyond the recorded gaps would stop a run:**
  - BotTools' and Support's positive control has no probe arguments and no control record (it is "the six owned rule ids
    absent", with five earlier records each, not six);
  - the readiness, verification and close-out steps expect a public repository with no webhook;
  - stage 9 runs anonymous probes whatever the repository's visibility;
  - the preparation unit's clone scripts reach a private repository through the system credential helper rather than
    `gh`, stop on the clone's hooks and exclude entry, and archive all 59 files.
- **Every recorded gap and follow-up is mapped to its files** ([§7](tool-changes-for-three-repositories.md#7-gaps-and-follow-ups-mapped-to-files-and-parts)).
  The ones that guard a write come first: the reply classifier and the form of a stored reply, the class table, the
  untested stops of the push preparation, the push step and the reset, the grant check read from data, and the self-test's
  stand-in, which must run a procedure as one shell.
- **The delivered reply.** The GKB2 and GKB run met a push reply as one document holding the procedure's printed lines as
  list entries on one line, inside its result ([that unit's as-built record, deviation 5](../../26-gkb2-gkb-rewrite/final-implementation.md#4-deviations-from-the-plan));
  the protocol names no field for them. The classifier takes the printed lines from the result's string entries and stops
  plainly on a reply it cannot read.

### Where the sources disagreed

- **When BotTools' webhook deliveries are counted.** The tools findings read them right after the push and again at the
  residual measurement's readiness check. The push findings establish that GitHub lists deliveries for three days only, and
  the residual measurement runs after all three pushes, possibly later than that. The deliveries are therefore counted once,
  right after BotTools' push, in its per-ref verification, and not again.
- **When the residual measurement runs.** The events cover 30 days: a read made later lists no event of the push and counts
  as not valid, never as absent. The residual measurement therefore follows the last push promptly, and a read that falls
  outside the window is recorded as not valid.
- **The move of the old clone.** The earlier procedure calls its move into the workspace a same-volume rename. On this
  machine the clone and the workspace are on different volumes, so the clone findings hold, and the parent design's
  §5.2, §6.7 and §9.5 take a dated note.
