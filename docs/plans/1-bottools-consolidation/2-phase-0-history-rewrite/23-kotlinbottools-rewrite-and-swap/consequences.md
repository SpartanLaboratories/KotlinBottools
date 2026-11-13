# Phase 0 · 3 — KotlinBottools rewrite and swap: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#23](https://github.com/SpartanLaboratories/KotlinBottools/issues/23),
  *"Phase 0 · 3 — KotlinBottools: rewrite with path scrub, fresh repository, number-preserving swap and clone
  realignment"*, a sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit did to its surroundings and leaves behind: the blast radius on GitHub, on
  this machine and in this checkout, what the later units of the phase take from it, the known gaps and the follow-ups.
  The measurements it cites are in the as-built record.
- **Related:**
  - [`plan.md`](plan.md): the procedure, its stages, checks and interfaces;
  - [`final-implementation.md`](final-implementation.md): what was built and measured, and every departure from the plan;
  - [`research/README.md`](research/README.md): the evidence;
  - the parent design [`../architecture.md`](../architecture.md) §6.4, §6.5, §7, §9 and §15 unit 3, and the parent
    [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing changes documents and generated boards only (§2.4).

The rewrite changed the content of two source files in every commit that holds them, through the path scrub
([parent consequences §1](../consequences.md#1-published-artifacts)): `build.gradle.kts`, whose local Maven repository
line named `%PROJECTS%`, and `GuildDataParser.kt`, whose commented-out line named `%USERPROFILE%`. Nothing that runs on
another machine changed.

---

## 2. Blast radius

### 2.1 GitHub

- **The pre-rewrite repository** (id 562658298) is `KotlinBottools-legacy`: renamed, made private, then archived. Its
  refs are exactly those listed at the mirror clone (`main`, the topic branch, and the pull-request refs of #20, #30 and
  #31), with its three merged pull requests, its milestone and labels, and its activity feed; no issue is left in it. Its
  public window ran from 2026-11-08 to 2026-11-11T06:11:18Z, when it was made private
  ([as-built §3.9](final-implementation.md#39-the-swap)).
- **The fresh repository** (id 1453296798), created private as `KotlinBottools-next` and renamed `KotlinBottools`. It
  holds:
  - the rewritten history (`main` and the topic branch), and no pull-request ref until this unit's own landing;
  - every number of the pre-rewrite repository, 1 to 31: 28 issues transferred on their own numbers, with their
    comments, labels, milestone and state, and closed placeholder issues on the pull requests' numbers 20, 30 and 31,
    each naming its pull request's title and merge date and pointing to it in the legacy repository;
  - the `1.0.0` milestone and the three custom labels, created before the walk;
  - the old repository's settings, except that its wiki is off and the default workflow permissions of GitHub Actions
    are read-only; forking stays off while it is private, as the organisation's policy requires, and follows the
    visibility once it is public.

  Stars and watchers start empty, and its activity feed starts with the rewritten history's push. It stays private until
  the publication unit, so from the swap until then every public link to a KotlinBottools issue answers "not found" to
  anyone without access: 76 references in MagicBot's issue texts and 6 in WebTools' after the walk, none in
  `SpartanLaboratories/.github`'s ([as-built §3.8](final-implementation.md#38-references)).
- **The moved issues' texts** name the repository that held each cited issue when a transfer rewrote them: every
  reference to an issue reads `SpartanLaboratories/KotlinBottools-next#N`, permanently, and all 28 resolve to the item on
  the same number. They reach it through the redirect the rename left on `KotlinBottools-next`, which holds only while no
  repository takes that name (§6).
- **The issue texts of MagicBot and WebTools were rewritten too.** The transfers changed the references to KotlinBottools
  issues in those repositories' issue texts: before the walk they all named `KotlinBottools`; after it every one in
  MagicBot's names `KotlinBottools-next`, the URLs included, and 4 of the 6 in WebTools' do. So the reserved name carries
  them as well (§6). This answers the plan's [assumption A7](plan.md#assumptions).
- **Pre-rewrite commit ids in public comments.** The resolution comments on #2, #21 and #22 hold 26 occurrences of 3
  distinct pre-rewrite merge-commit ids, inside permalinks next to working `main` links. They moved with the issues and
  stay. In the fresh repository they resolve to nothing, so those permalinks open only for someone with access to the
  private legacy repository. The publication unit's id-reference check accounts for exactly these.
- **Relationships.** All 91 sub-issue and "blocked by" links recorded before the first transfer are present at the end,
  every one kept by the transfers: 26 sub-issue links, 44 "blocked by" links inside the repository, 19 with MagicBot and 2
  with WebTools #55. No relationship was written again, in KotlinBottools or in the other repositories.
- **The old URLs.** `KotlinBottools/issues/N` resolves to the same number in the fresh repository, which holds the name;
  `KotlinBottools-legacy/issues/N` and `KotlinBottools-next/issues/N` reach the issue's new home, for anyone with access.
- **No repository was deleted.** The token has no scope to delete one, and none was needed.

### 2.2 This machine

- **`%USERPROFILE%\BotWS`:** this unit's KotlinBottools mirror, untouched backup and fresh mirror; the preparation unit's
  KotlinBottools copies, moved aside; this unit's tools, among them its copy of the privacy gate with the order of equal
  names made total, saved over the preparation unit's `privacy_gate.py` (the later units' gate runs use it); the scratch
  clones on which the realignment was proven. The workspace is deleted by the last unit of the phase.
- **`%USERPROFILE%\BotLegacyData`:** the rewrite's records (`commit-map`, `ref-map`, the push tallies, the probe tallies),
  the walk's and the swap's records, the gate dumps, the privacy gate's allow-list (written from the entries the owner
  confirmed, with the record of each decision by key, never by word), the list of the accepted pre-rewrite ids, the
  record of every correction made to a tool during the run, the realignment's records and a copy of this checkout's
  untracked and ignored files. Nothing in it is committed, printed or quoted.

### 2.3 This checkout

- **Realigned in place** onto the rewritten history ([as-built §3.4](final-implementation.md#34-the-realignment)):
  - the 41 tracked files the purge removed left the working tree;
  - `build.gradle.kts` and `GuildDataParser.kt` changed content through the scrub;
  - the refs and reflogs moved to the rewritten history, and `origin` (the same URL) is the fresh repository, checked by
    id;
  - the old objects are deleted, with the deletion proven; nothing was deferred.
- **The topic branch** carried this unit's research and plan commits, made before the mirror clone, through the rewrite.
- **Its untracked and ignored files** (`.idea/`, `.gradle/`, `build/`, `docs/plans/.live/`, `graphify-out/`) are unchanged
  by the realignment. IntelliJ IDEA was not running at the move; its Local History, had it been open, could keep copies of
  the removed files, outside git.
- **No commit and no change to a tracked file** happened in this checkout from the mirror clone until the realignment
  ended; the work boards showed the run in their git-ignored live view meanwhile.

### 2.4 Documents and generated boards

The landing is the first on the fresh repository and changes what [plan, Documentation impact](plan.md#documentation-impact)
lists: this unit's documents and research; one link line in the parent's `consequences.md` and a dated note under its
first known gap; dated notes on the parent's `architecture.md`; a dated note in the preparation unit's
`consequences.md`, saying what this unit's copy of the privacy gate makes no longer current there; and the regenerated
boards.

---

## 3. Adoption

No existing code adopts anything from this unit. Its tools are reused by the later rewrite units: the stage scripts are
the worked example of the pipeline for GKB2 and GKB and for BotTools, TrumpBot and Support, and the corrected realignment
scripts and the push-safety proof are the reference for any later realignment of a checkout in place.

---

## 4. Sibling units and neighbouring issues

**What the later units take from this unit** (the contract is
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units); this is its summary):

- **`repository-hygiene`** (#24) starts from the rewritten `main` on the fresh repository under `KotlinBottools`, with
  this checkout realigned. Nothing lands on KotlinBottools until this unit has.
- **`kotlinbottools-publish`** (#25) takes:
  - the corrected privacy gate in the workspace, which its own gate runs, and the allow-list in the data folder with the
    record of the owner's decision on each entry (a new name there goes through the same proposal and confirmation);
  - the fresh repository's id and its settings snapshots;
  - the list of the 3 distinct pre-rewrite ids accepted in the moved resolution comments, with their 26 occurrences,
    which its id-reference check accounts for;
  - Gate 2's result and the scrub's zero counts;
  - the default-rule finding in a kept file (§5), which holds its visibility change;
  - the moved texts naming `KotlinBottools-next`, which its gate reads;
  - the forking and wiki settings to read again after the change to public;
  - the open issue-text edits of §6, to be made before it.
- **`gkb2-gkb-rewrite`** (#26) and **`bottools-trumpbot-support-rewrite`** (#27) take the pipeline as this unit ran it,
  with the tools as corrected during the run (plan Appendix A), the mirror push request proven, and the five static
  repositories' backups untouched; and the `run-stage.sh` gap of §5, to be closed before them.
- **`residual-report-and-cleanup`** (#28) takes KotlinBottools' row of the residual report with its public window, and the
  reserved name (§6). There is no deferred step.

**Neighbouring issues:**

- **#21,** the preparation unit, landed: its records give the privacy gate's size and sha256 and an order of equal
  names that depends on the process's hash seed, which this unit's copy of the gate replaces in the workspace (the gate's
  labels and output are unchanged). A dated note in [its `consequences.md`](../21-preparation/consequences.md) records it.
- **#2** and **#1** are not closed by this unit.
- **#3, Phase 1,** starts once this unit has landed, from the rewritten `main` of the fresh repository.
- **#29** moved with the walk like every other issue and stays open.
- **MagicBot** and **WebTools #55:** their relationships with KotlinBottools issues were all kept, and no code or
  document in either changed. Their issue texts did change: the transfers rewrote the references to KotlinBottools issues
  to name `KotlinBottools-next` (§2.1).

---

## 5. Known gaps

- **A default-rule finding of gitleaks in a kept file.** The exit tests found 2 findings of one default rule,
  `curl-auth-user`, in 1 kept file, on branches and on every ref alike; no custom rule found anything, so no purged kind of
  file survived, and none is a `private-key` finding, which would have stopped S7. The finding is recorded by rule id and count, and holds the publication unit's change to public until it
  is judged. This is the outcome of the plan's [assumption A13](plan.md#assumptions), which expected none.

  > **Dated note, 2026-11-12.** Closed by the [repository hygiene unit](../24-repository-hygiene/plan.md) (#24). The
  > committed `.gitleaks.toml` exempts this one match with one table scoped to `curl-auth-user`, the document's path and
  > the exact text, and the allowlist controls show on every run of the secret-scan workflow that the table exempts
  > nothing else ([that unit's plan, The scoped allowlist table](../24-repository-hygiene/plan.md#the-scoped-allowlist-table)).
- **`run-stage.sh` writes a run's arguments into the run log,** and a manual run's argument can be a machine path, which
  then sits in `DATA/run/as-run.log`. The runner is the preparation unit's tool, reused at its recorded hash, so it was
  left unchanged; it is fixed before GKB2 and GKB and BotTools, TrumpBot and Support are rewritten (#26, #27).
- **The local run records keep the clones' paths:** `DATA/run/as-run.log` and `DATA/run/swap/steps.jsonl`. They stay in
  `DATA`, which is never committed, printed or quoted, and the last unit of the phase deletes the workspace.
- **Pre-rewrite commit ids in the work boards.** The committed boards hold 30 occurrences of 3 distinct pre-rewrite
  commit ids in their recorded commit fields, across 15 files. The boards' exception in
  [architecture §1.1](../architecture.md#11-what-the-phase-must-achieve), item 9, covers them.
- **The rise of MagicBot's reference count is unexplained.** Before the walk its issue texts held 48 references to
  KotlinBottools issues by name and 2 by URL; after it, 74 by name to `KotlinBottools-next` and 2 by URL. The rewrite left
  no edit history, and the texts before the walk were recorded as counts and a hash only. The plan's estimate for
  `SpartanLaboratories/.github` (5 citations) did not match its issue texts, which hold none, before or after; where the
  estimate's citations were is not established either ([as-built §3.8](final-implementation.md#38-references)).
- **Texts in other repositories that cite a moved issue** now depend on the reserved name `KotlinBottools-next` (§6).
- **IntelliJ IDEA's Local History** may hold copies of the files the realignment removed, from before the run; no git
  operation reaches them.

The plan's other assumptions held: A1 to A6, A8 to A12 and A14 ([plan, Assumptions](plan.md#assumptions); the record of
each is in [as-built §3](final-implementation.md#3-measurements)). A6's link repair was not needed: no transfer dropped a
link. A7 is answered in §2.1.

---

## 6. Follow-ups

**Standing:**

- **`KotlinBottools-next` stays reserved.** No repository may be created under that name or renamed onto it: every
  reference the walk left in the moved texts, and every reference the transfers rewrote in MagicBot's and WebTools'
  issue texts, reaches its issue through the redirect on that name.

**Open, before the publication unit makes the repository public:**

- **One pass of issue-text edits on the fresh repository**, the follow-ups the phase gave to #2's landing
  ([parent consequences §6](../consequences.md#6-follow-ups)), which are still open:
  - the 56 links that name the deleted planning branch, pointed at `main`: 3 in #1's body, 2 in each of #2 to #19, 16 in
    MagicBot #1 to #8 and 1 in WebTools #55;
  - #1's body, which still names that branch;
  - #2's plan-folder line, which still reads `0-<slug>` and must read `2-phase-0-history-rewrite`.

  It needs `edit-issue-body` (and a comment edit where a comment holds such a link), which this unit did not send.

  > **Dated note, 2026-11-13.** The publication unit (#25) made the edits in the bodies of #1 to #19: their links point at `main`,
  > #1's body no longer places the documents on the planning branch, and #2's plan-folder line reads `2-phase-0-history-rewrite`. A
  > plain mention of the branch's name in a comment on #1, 16 links in MagicBot #1 to #8 and 1 in WebTools #55 remain
  > ([its consequences, §6](../25-kotlinbottools-publish/consequences.md#6-follow-ups)).
- **The default-rule finding** of §5, judged before the visibility changes.

  > **Dated note, 2026-11-12.** Closed by the [repository hygiene unit](../24-repository-hygiene/plan.md) (#24), as the
  > note in §5 says.

**For the tools, before the later rewrite units:**

- **`run-stage.sh`'s logging of a run's arguments** (§5), before #26 and #27.
- **The `unlink-N` route** of the walk tool targets the source repository for every relationship, also for one held on
  a MagicBot or WebTools issue. It is the refusal route, which no run has needed (the rehearsal and this unit measured
  that transfers keep their links); a later walk that reuses the tool corrects it first.
- **A 31-number stand-in inside the walk tool's self-test.** The self-test's stand-in holds 9 numbers; adjacent
  placeholders and a placeholder at the top number were exercised by a separate run with 31 numbers and by a placeholder
  guard run in bash, not by the self-test itself.
- **`xrefs` hashes whole texts.** Any edit in MagicBot, WebTools or `SpartanLaboratories/.github` during a walk reads as
  a change; a later use hashes the reference strings instead.

**Possible, not planned:**

- **Restoring the moved texts' references** to their wording before the walk (bare `#N`, which resolves in the fresh
  repository on the same numbers). It would need a request that edits an existing comment, which the request protocol does
  not have, as well as the issue-body edits.
- **A local build override,** if a local build depended on the Maven repository line the scrub replaced.

**When the units have landed** (unchanged from the [parent's follow-ups](../consequences.md#6-follow-ups)):

- **The rehearsal's two repositories,** private and archived, for the organisation's administrator to delete (`delete_repo`
  is out of the token's scope).
- **The project's working notes on this machine:** the public repository is a fresh one, and the pre-rewrite repository is
  `KotlinBottools-legacy`, private and archived. There is no deferred step: the realignment's object deletion was proven
  at the run, so the plan's deferred-step commands (plan S15) are not needed.

A match of the scrub's expressions in an issue text would have been an issue edit on request; Gate 2 counted none over the
70 texts of the fresh repository, so there is none to make.
