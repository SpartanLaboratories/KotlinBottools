# Phase 0 · 7.2 — Rewriting BotTools, TrumpBot and Support: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#40](https://github.com/SpartanLaboratories/KotlinBottools/issues/40),
  *"Phase 0 · 7.2 — Rewrite BotTools, TrumpBot and Support"*, unit 2 of
  [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), which is a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **What this document is:** what this unit does to its surroundings and what it leaves behind:
  - the published artifacts;
  - the blast radius on GitHub, on this machine and in the documents;
  - adoption;
  - the sibling units and the neighbouring issues;
  - the known gaps, with the outcome of the plan's assumptions;
  - the follow-ups.

  It is written with the plan and brought up to date with the build, with the outcome of the plan's assumptions,
  before the landing that carries it.
- **Related:**
  - [`plan.md`](plan.md): the procedure, the grant, the requests and the expected values;
  - [`final-implementation.md`](final-implementation.md): what was built and measured, and every departure from the plan;
  - the parent design: [`../architecture.md`](../architecture.md) §8 (the rewrites), with §5.1, §11, §12, §13.4 and §17;
  - the parent consequences: [`../consequences.md`](../consequences.md), whose blast radius, known gaps and follow-ups for
    the whole of #27 this document does not restate;
  - the tools unit's consequences: [`../39-workspace-tools/consequences.md`](../39-workspace-tools/consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing carries documents and generated boards only, and no
README or changelog of KotlinBottools changes.

What changes in public is the history of BotTools, which is public. The histories of TrumpBot and Support changed as well,
and stay private.

---

## 2. Blast radius

### 2.1 GitHub

**Three writes, each one request of the request service, each one atomic push** under an explicit lease on every branch's
recorded tip ([plan, Design](plan.md#design)), made on 2026-11-15
([as built, §1](final-implementation.md#1-what-was-built)):

| Repository | Branches updated | Commits before and after |
|---|---|---|
| `SpartanLaboratories/BotTools` (public) | `main`, `Working-Branch` | 16 → 15 |
| `SpartanLaboratories/TrumpBot` (private) | `main`, `feature/pokercommand` | 11 → 9 |
| `SpartanLaboratories/Support` (private) | `main` | 2 → 1 |

- **Every commit id of the three histories changed,** and the files under the purged paths left every commit, the tips'
  trees included.
- **Nothing else was written:** no issue, pull request, comment, label, setting, webhook or ref other than the five
  branches. No ref was created or deleted; each repository kept its visibility, its default branch and its pull-request
  refs.
- **What the pushes published** is what the parent consequences list for the whole of #27
  ([§2.1](../consequences.md#21-github)): per rewritten branch an event and a force-push entry in the activity feed, five
  in all, and for BotTools one push delivery per branch to its webhook, two in all
  ([as built, §3.4](final-implementation.md#34-per-ref-verification-and-the-exit-tests-steps-7-and-8)).
- **What stays reachable** is as the parent consequences say there: BotTools' two pull-request refs keep 13 old commits
  and its 39 purged blobs fetchable, as this unit counted on BotTools' fresh mirror without removing anything; the old
  objects of TrumpBot and Support stay readable by those with access. The measurement of what GitHub still serves is the
  next unit's.
- **Push protection for users** applied to BotTools' push alone, the other two repositories being private, and did not
  refuse it.

**Other clones.** Since TrumpBot's push, the TrumpBot clone on this machine shares no commit with the server's branches.
This unit did not touch it; the clone replacement (#42) replaces it. No fork of the three repositories exists.

### 2.2 This machine

- **`%USERPROFILE%\BotWS`** (`WS`), deleted by #28:
  - the mirrors of BotTools, TrumpBot and Support, rewritten in place; their untouched backups stay as they were;
  - a fresh mirror of each in `fresh/`, taken anew by each run of step 8;
  - the unit's data file and the grant's wording beside it, in `tmp/g27/units/`, and its scratch folder `tmp/g27/g40/`;
  - the scan reports and logs of the positive controls, the scans before the pushes and the scans of the fresh mirrors.

  The tool folders were not changed: `tools/g27/` was read at its pins and `tools/g26/` was not run.
- **`%USERPROFILE%\BotLegacyData`** (`DATA`):
  - the unit's record folder `run/g40/`: the three request files, the stored replies, the step markers, the classes and
    keys of the requests, the time of each push, BotTools' webhook snapshot and delivery counts, the checksums of the
    preparation unit's records as this unit first read them, and the checksum list over the folder;
  - new files beside the preparation unit's records in each `rewrite/<repo>/`, which were not written: the rewrite's
    outputs, the scans' summaries, the push preparation's records, the push's kept streams, the listings after the push, the
    exit tests' outputs, the residual record, and each folder's checksum list `g40.SHA256SUMS`;
  - the run log's lines for the unit's steps, and the document checks' files under `run/gate/`.

  Everything in both folders holds ids, paths or names and is never committed, printed or quoted.
- **The request service's local state** changed at the owner's console only, as
  [the as-built record, §1](final-implementation.md#1-what-was-built) lists it, with no restart of the service (its
  deviations 1 and 2). It is undone when the section moves to history (§6).
- **This working tree** changes only by the landing. The TrumpBot clone was not touched (§2.1).

### 2.3 Documents and generated boards

The landing carries what [plan, "Documentation impact"](plan.md#documentation-impact) lists: this plan, this document and
the as-built record; the one link line for this unit in [the parent consequences, §4](../consequences.md#4-units-and-neighbouring-issues);
dated notes on the parent design's [§2.4](../architecture.md#24-the-request-service) and
[§12](../architecture.md#12-version-control-and-requests), where the build changed what they describe; and the regenerated
boards.

---

## 3. Adoption

- **The atomic lease push of several branches** was made against GitHub for the first time, on BotTools, and landed whole,
  as TrumpBot's did after it. Its outcome was read from counted markers and from a read of every branch; the one-branch push
  of the GKB2 and GKB unit is its case of one branch, as Support's was.
- **The tools unit's push request, reply store and classifier** were used on real replies for the first time: each reply was
  stored in the form the request service delivered it, and classed.
- Nothing in KotlinBottools' code, build or published surface adopts anything from this unit.

---

## 4. Sibling units and neighbouring issues

**What the later units of #27 take from this unit.** The contract is
[plan, "Interfaces with sibling units"](plan.md#interfaces-with-sibling-units); this is its summary.

| Unit | Takes |
|---|---|
| [#41](https://github.com/SpartanLaboratories/KotlinBottools/issues/41), the residual measurement | its data file names `g40` in `from`: the stage-8 marker of each repository; each repository's records under `rewrite/<repo>/` with their checksum list `g40.SHA256SUMS`; the time of each push, which is the time its push was classed ([as built, deviation 3](final-implementation.md#4-deviations-from-the-plan)); BotTools' webhook delivery counts; the checksums of the preparation unit's records as this unit read them; every branch of the three at its rewritten tip |
| [#42](https://github.com/SpartanLaboratories/KotlinBottools/issues/42), the clone replacement | its data file names `g40` in `from`: TrumpBot's stage-8 marker, with TrumpBot's `ref-map` and `commit-map`, its manifest and its untouched backup. For its own requests, what [the parent design's §2.4](../architecture.md#24-the-request-service) now says of allow lines and restarts, in its dated note |
| [#28](https://github.com/SpartanLaboratories/KotlinBottools/issues/28), the residual report and cleanup | every record of this unit with its checksum list; no default-rule finding arose, so none is handed on |

- **The events of BotTools' push cover 30 days from 2026-11-15,** and lag by up to 6 hours: the residual measurement
  follows this unit's landing promptly ([the parent consequences, §5](../consequences.md#5-known-gaps)).
- **The tools unit's assumptions this run exercised** ([its plan, Assumptions](../39-workspace-tools/plan.md#assumptions)):
  A1, the delivered reply's form, held (this plan's A3); A2, the stand-ins' shapes, held for the rewrite set (A13); A3, what a
  delivery changes on the webhook, held (A6); A7, the scan configuration and binary, held, each positive control equal to its
  record line for line; A12, the wording of a real refusal or lost connection, was not exercised (A8); and A4, A9, A10 and A11
  held again at `S0.repos` and `S0.pins`. The tools unit's own consequences, a landed document, stay as they are.

**What this unit took:**

- from [the tools unit](../39-workspace-tools/consequences.md) (#39): the tool folder at its pins, the format of the unit's
  data file, the rewrite set and the grant check;
- from [the preparation unit](../../21-preparation/consequences.md) (#21): the mirrors and untouched backups, the
  manifests, the expectation rows, the positive-control records, the purge lists and the listings taken at the clone, read
  only and proven unchanged.

**Neighbouring issues:**

- **#27** stays open until its last unit has landed; its consequences gain this unit's link line.
- **#28** stays blocked by #27.
- **#16, Phase 17,** archives the three repositories once every purge of the phase is done; whether BotTools' webhook is
  removed then belongs with it ([the parent consequences, §6](../consequences.md#6-follow-ups)).
- **#2** and **#1** are not closed by this unit.

---

## 5. Known gaps

What the build leaves open:

- **What GitHub still serves of the three old histories is not measured here.** The residual measurement measures it, in
  counts; this unit counted only BotTools' pull-request residual, on its fresh mirror.
- **BotTools' webhook deliveries were counted once,** right after its push: no later count is taken, since GitHub lists a
  webhook's deliveries for three days.
- **Whether GitHub applies a failing atomic push all or nothing stays unknown.** The three pushes landed whole and none
  failed, so the parent's known gap ([§5](../consequences.md#5-known-gaps)) keeps its case of a failure, and the read-back
  after a non-zero status still names the state. The parent's other gap this unit checked, the field of a delivered reply
  that holds the procedure's printed lines, is closed: each reply held them as string entries of its `result` (A3 below).
- **Some evidence lies under no checksum list.** BotTools' refused first call shows in none of the checksummed records under
  `DATA\run\g40\`, and the typed blocks' results leave no line in the run log. The copy of the request service's answer to
  the refused call is in the unit's scratch folder, under no checksum list, and #28 removes the workspace. The as-built record
  ([§3](final-implementation.md#3-measurements)) is their only committed home.
- **What no record proves.** No step files a GitHub Support ticket or reads a webhook delivery's payload, and none reads or
  touches TrumpBot's clone. Nothing records these absences beyond the steps themselves and, for the clone, its state in
  [the as-built record, §1](final-implementation.md#1-what-was-built).

**Outcome of the plan's assumptions** ([plan, Assumptions](plan.md#assumptions); the readings are in
[the as-built record, §3](final-implementation.md#3-measurements)). One failed: A4, at BotTools' first call.

- **A1 held** for the three pushes, each of which landed whole, its state read back as `both`. No push failed, so the case of a
  failure stays open (above).
- **A2 was not exercised:** no branch moved. The server's heads and tags equalled `ref-map`'s old column at each push
  preparation and in each procedure's guards.
- **A3 held:** each delivered reply held the procedure's 11 printed lines as string entries of its `result`, which were stored
  one to a line and classed.
- **A4 failed at BotTools' first call, and held after it.** The grant section was in place (`S0.grant`), but the lift of the
  deny rule did not yet hold in every settings file the request service loads ([as built, §1](final-implementation.md#1-what-was-built)),
  and the service's own check refused the call before anything ran; the service attributes the refusal to that check, not to
  the deny rule. The plan's path for such a call ran as designed: the state read named every branch at its old tip, nothing was
  stored or sent twice, and the service ran the request again itself ([as built, §3.3](final-implementation.md#33-the-pushes-step-6),
  deviations 1 and 2). The deny list the two settings files duplicate is filed as SpartanLaboratories/.github#11.
- **A5 held:** TrumpBot and Support were pushed on their first attempts.
- **A6 held:** after its two push deliveries, BotTools' webhook equalled its snapshot at `S1.7` and again at `S4.reads`.
- **A7 held:** GitHub listed both push deliveries when `S1.7` counted them.
- **A8 was not exercised:** GitHub refused no push and no connection was lost; the one refusal came from the request service,
  before anything ran.
- **A9 held:** every scan ended within seconds.
- **A10 held:** nothing but this unit pushed; every guard found the old column and every lease held.
- **A11 was not exercised:** no default-rule finding arose.
- **A12 held:** BotTools' push was not refused (`gh=0 pp=0`).
- **A13 held:** every step behaved on the real repositories as on their stand-ins, with no `STOP`.
- **A14 held:** the pin list's sha256 was the same before `S0` and after `S4`, `S4.tools` found every pin, and the unit's
  part of the run log holds the unit's own runner calls and nothing else.

---

## 6. Follow-ups

- **The request service's settings for this job.** When the grant section moves to history, as #40 lands, the deny rule on
  `git push --force-with-lease` is restored in both settings files the service loads, and the three allow lines are removed
  from the global settings file, each read back once. The published copy of the service's settings is held back until then.
- **BotTools' pull-request residual stays,** as the parent consequences record: only a request to GitHub Support, which
  the phase does not make, or the repository's removal would end it.
- **The credentials** stay the parent consequences' follow-up.
- **BotTools' webhook** stays as it is; whether to remove it when the repository is archived stays the parent consequences'
  follow-up ([§6](../consequences.md#6-follow-ups)), for Phase 17 (#16).

Of the plan's follow-ups ([plan, Sequencing and follow-ups](plan.md#sequencing-and-follow-ups)), two closed with the build:

- **Default-rule findings:** none arose in BotTools, TrumpBot or Support, before a push or on a fresh mirror, so no
  allowlist and no acceptance is left to decide.
- **Tool defects:** none was met. The tool folder stays at its pins, and the tools unit's consequences take no dated note.
