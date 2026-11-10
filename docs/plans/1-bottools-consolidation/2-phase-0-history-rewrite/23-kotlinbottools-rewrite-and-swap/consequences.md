# Phase 0 · 3 — KotlinBottools rewrite and swap: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#23](https://github.com/SpartanLaboratories/KotlinBottools/issues/23),
  *"Phase 0 · 3 — KotlinBottools: rewrite with path scrub, fresh repository, number-preserving swap and clone
  realignment"*, a sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit does to its surroundings and leaves behind: the blast radius on GitHub, on
  this machine and in this checkout, what the later units of the phase take from it, the known gaps and the follow-ups.
  It is written with the plan and brought up to date once the unit has run.
- **Related:**
  - [`plan.md`](plan.md): the procedure, its stages, checks and interfaces;
  - [`research/README.md`](research/README.md): the evidence;
  - the parent design [`../architecture.md`](../architecture.md) §6.4, §6.5, §7, §9 and §15 unit 3, and the parent
    [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing changes documents and generated boards only (§2.4).

The rewrite changes the content of two source files in every commit that holds them, through the path scrub
([parent consequences §1](../consequences.md#1-published-artifacts)): `build.gradle.kts`, whose local Maven repository
line names `%PROJECTS%`, and `GuildDataParser.kt`, whose commented-out line names `%USERPROFILE%`. Nothing that runs on
another machine changes.

---

## 2. Blast radius

### 2.1 GitHub

- **The pre-rewrite repository** (id 562658298) becomes `KotlinBottools-legacy`: renamed, made private, then archived. It
  keeps its refs exactly as they were at the mirror clone (`main`, the topic branch, and the pull-request refs of #20, #30
  and #31), its three merged pull requests, its milestone and labels, and its activity feed; no issue is left in it. Its
  public window, open since 2026-11-08, ends when it is made private.
- **The fresh repository**, created private as `KotlinBottools-next` and renamed `KotlinBottools`, has a new repository
  id. It holds:
  - the rewritten history (`main` and the topic branch), and no pull-request ref until this unit's own landing;
  - every number of the pre-rewrite repository: 28 issues transferred on their own numbers, with their comments, labels,
    milestone and state, and closed placeholder issues on the pull requests' numbers 20, 30 and 31, each naming its pull
    request's title and merge date and pointing to it in the legacy repository;
  - the `1.0.0` milestone and the three custom labels, created before the walk;
  - the old repository's settings, except that its wiki is off and the default workflow permissions of GitHub Actions
    are read-only; forking stays off while it is private, as the organisation's policy requires, and follows the
    visibility once it is public.

  Stars and watchers start empty, and its activity feed starts with the rewritten history's push. It stays private until
  the publication unit, so from the swap until then every public link to a KotlinBottools issue (49 citations in
  MagicBot, 6 in WebTools, 5 in `SpartanLaboratories/.github`) answers "not found" to anyone without access.
- **The moved issues' texts** name the repository that held each cited issue when a transfer rewrote them. Once the walk
  ends, every reference to an issue reads `SpartanLaboratories/KotlinBottools-next#N`, permanently. Those references reach
  their issue through the redirect the rename leaves on `KotlinBottools-next`, which holds only while no repository takes
  that name (§6).
- **Pre-rewrite commit ids in public comments.** The resolution comments on #2, #21 and #22 hold 26 pre-rewrite
  merge-commit ids, inside permalinks next to working `main` links. They move with the issues and stay. In the fresh
  repository they resolve to nothing, so those permalinks open only for someone with access to the private legacy
  repository.
- **Relationships.** Every sub-issue and "blocked by" link recorded before the first transfer is present at the end, kept
  or re-created: 26 sub-issue links, 44 "blocked by" links inside the repository, 19 with MagicBot and 2 with WebTools
  #55. Where a transfer drops a link with a MagicBot or WebTools issue, that issue's relationship is written again; that is
  a relationship, not a numbered item, in those repositories.
- **Texts in other repositories** that cite a KotlinBottools issue are read before and after the walk. Whether a transfer
  rewrites them is not known yet; either way they resolve by name and number (§5).
- **The old URLs.** `KotlinBottools/issues/N` resolves to the same number in the fresh repository once it holds the name;
  `KotlinBottools-legacy/issues/N` redirects to the issue's new home, for anyone with access to the legacy repository.
- **No repository is deleted.** The token has no scope to delete one, and none is needed.

### 2.2 This machine

- **`%USERPROFILE%\BotWS`:** this unit's KotlinBottools mirror, untouched backup and fresh mirror; the preparation unit's
  KotlinBottools copies, moved aside; this unit's tools, among them its copy of the privacy gate with the order of equal
  names made total, saved over the preparation unit's `privacy_gate.py` (the later units' gate runs use it); the scratch
  clones on which the realignment is proven. The workspace is deleted by the last unit of the phase.
- **`%USERPROFILE%\BotLegacyData`:** the rewrite's records (`commit-map`, `ref-map`, the push tallies, the probe tallies),
  the walk's and the swap's records, the gate dumps, the privacy gate's allow-list (written from the entries the owner
  confirmed, with the record of each decision by key, never by word), the list of the 26 accepted pre-rewrite ids, the
  realignment's records and a copy of this checkout's untracked and ignored files. Nothing in it is committed, printed or
  quoted.

### 2.3 This checkout

- **Realigned in place** onto the rewritten history:
  - the 41 tracked files the purge removes leave the working tree;
  - `build.gradle.kts` and `GuildDataParser.kt` change content through the scrub;
  - the refs and reflogs move to the rewritten history, and `origin` (the same URL) is the fresh repository, checked by
    id;
  - the old objects are deleted, or stay unreachable until the deferred step runs (§6), whichever the object-deletion
    proofs show.
- **The topic branch** carries this unit's research and plan commits, made before the mirror clone, through the rewrite.
- **Its untracked and ignored files** (`.idea/`, `.gradle/`, `build/`, `docs/plans/.live/`, `graphify-out/`) are unchanged
  by the realignment. IntelliJ IDEA's Local History, if the project is open, may keep copies of the removed files, outside
  git.
- **No commit and no change to a tracked file** happens in this checkout from the mirror clone until the realignment has
  ended; the work boards show the run in their git-ignored live view meanwhile.

### 2.4 Documents and generated boards

The landing is the first on the fresh repository and changes what [plan, Documentation impact](plan.md#documentation-impact)
lists: this unit's documents and research; one link line in the parent's `consequences.md`; dated notes on the parent's
`architecture.md` and `consequences.md`; a dated note in the preparation unit's `consequences.md`, saying what this
unit's copy of the privacy gate makes no longer current there; and the regenerated boards.

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
- **`kotlinbottools-publish`** (#25) takes the corrected privacy gate in the workspace, which its own gate runs; the
  fresh repository's id and its settings snapshot; the count (26) and the
  location of the list of the pre-rewrite ids accepted in the moved resolution comments, which its id-reference check
  accounts for; the privacy gate's allow-list in the data folder, with the record of the owner's decision on each entry,
  which its own gate reuses (a new name there goes through the same proposal and confirmation); the second
  privacy gate's result and the scrub's zero counts; any default-rule finding in a kept file,
  which stops its visibility change; the moved texts naming `KotlinBottools-next`, which its gate reads; the forking and
  wiki settings to read again after the change to public; and the open issue-text edits of §6, to be made before it.
- **`gkb2-gkb-rewrite`** (#26) and **`bottools-trumpbot-support-rewrite`** (#27) take the pipeline as this unit ran it,
  the mirror push request proven, and the five static repositories' backups untouched.
- **`residual-report-and-cleanup`** (#28) takes KotlinBottools' row of the residual report with the public window, the
  deferred step if one is recorded, and the reserved name (§6).

**Neighbouring issues:**

- **#21,** the preparation unit, landed: its records give the privacy gate's size and sha256 and an order of equal
  names that depends on the process's hash seed, which this unit's copy of the gate replaces in the workspace (the gate's
  labels and output are unchanged). A dated note in its `consequences.md` records this after the realignment.
- **#2** and **#1** are not closed by this unit.
- **#3, Phase 1,** starts once this unit has landed, from the rewritten `main` of the fresh repository.
- **#29** moves with the walk like every other issue and stays open.
- **MagicBot** and **WebTools #55:** their relationships with KotlinBottools issues are kept or written again; no code or
  document in either changes.

---

## 5. Known gaps

- **The path scrub has run only on a fixture** until this unit's rewrite. Its before-counts, its fidelity check and its
  zero count over every file and commit message of every ref stop the unit before the push if it misbehaves.
- **What the rehearsal's fixture did not cover:** a target that already holds a pushed history; placeholders next to each
  other (#30 and #31) and at the top number; 31 numbers instead of ten; links with issues in a third repository; and
  references written as URLs in the moved texts. The walk checks each item on its number and maps every reference form
  back before comparing, so each of these is measured, not assumed.
- **Texts in other repositories that cite a moved issue:** whether a transfer rewrites them is unmeasured until the walk.
- **Requests used for the first time:** the mirror push, the repository's settings and the realignment of a checkout have
  not run before this unit. The first two write only to the temporary repository; the realignment is proven on two scratch
  clones before it touches this checkout.
- **The fresh repository's settings:** what GitHub makes the default branch when one push creates several branches, the
  answer to setting `main` when it already is the default, and whether a private repository of a Free organisation stores
  the wiki switch are unobserved until the first run; the read-back after each request is the check.
- **The object deletion in this checkout** may be deferred if IntelliJ IDEA holds a pack or the index; until the deferred
  step runs, the checkout holds unreachable old objects that no push can carry.
- **IntelliJ IDEA's Local History** may hold copies of the files the realignment removes; no git operation reaches them.

---

## 6. Follow-ups

**Standing:**

- **`KotlinBottools-next` stays reserved.** No repository may be created under that name or renamed onto it: every
  reference the walk leaves in the moved texts reaches its issue through the redirect on that name.

**Open, before the publication unit makes the repository public:**

- **One pass of issue-text edits on the fresh repository**, the follow-ups the phase gave to #2's landing
  ([parent consequences §6](../consequences.md#6-follow-ups)), which are still open:
  - the 56 links that name the deleted planning branch, pointed at `main`: 3 in #1's body, 2 in each of #2 to #19, 16 in
    MagicBot #1 to #8 and 1 in WebTools #55;
  - #1's body, which still names that branch;
  - #2's plan-folder line, which still reads `0-<slug>` and must read `2-phase-0-history-rewrite`.

**Possible, not planned:**

- **Restoring the moved texts' references** to their wording before the walk (bare `#N`, which resolves in the fresh
  repository on the same numbers). It would need a request that edits an existing comment, which the request protocol does
  not have, as well as the issue-body edits.

**When the units have landed** (unchanged from the [parent's follow-ups](../consequences.md#6-follow-ups)):

- **The deferred step,** if this unit records one: run its commands in this checkout with IntelliJ IDEA closed.
- **The project's working notes on this machine:** the public repository is a fresh one; the pre-rewrite repository is
  `KotlinBottools-legacy`, private and archived; and whether the deferred step is still due.
