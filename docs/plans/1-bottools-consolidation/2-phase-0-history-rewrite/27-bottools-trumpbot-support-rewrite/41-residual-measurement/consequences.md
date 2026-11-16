# Phase 0 · 7.3 — Measuring what GitHub still serves of BotTools, TrumpBot and Support: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#41](https://github.com/SpartanLaboratories/KotlinBottools/issues/41),
  *"Phase 0 · 7.3 — Measure what GitHub still serves of BotTools, TrumpBot and Support"*, unit 3 of
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
  - [`plan.md`](plan.md): the procedure, the events gate, the expected lines and the stop table;
  - [`final-implementation.md`](final-implementation.md): what was measured, and every departure from the plan;
  - the parent design: [`../architecture.md`](../architecture.md) §9 (the residual measurement), with §5.1, §11, §13.4 and §17;
  - the parent consequences: [`../consequences.md`](../consequences.md), whose blast radius, known gaps and follow-ups for
    the whole of #27 this document does not restate;
  - the rewrites' consequences, [`../40-rewrites/consequences.md`](../40-rewrites/consequences.md), and the tools unit's,
    [`../39-workspace-tools/consequences.md`](../39-workspace-tools/consequences.md).

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`.

---

## 1. Published artifacts

None. No module is published and no version moves. The landing carries documents and generated boards only, and no
README or changelog of KotlinBottools changes.

---

## 2. Blast radius

### 2.1 GitHub

**Nothing was written.** No ref, pull request, issue, comment, label, setting or webhook of BotTools, TrumpBot or Support
changed, nothing GitHub serves was removed, and no GitHub Support ticket was filed
([plan, "What the unit writes to GitHub"](plan.md#what-the-unit-writes-to-github)). Every branch stayed at its rewritten
tip and the pull-request refs as recorded ([as built, §1](final-implementation.md#1-what-was-built)).

**What the unit read,** between 2026-11-15 and 2026-11-16 ([as built, §3](final-implementation.md#3-measurements)):

- **All three repositories, authenticated:** a `HEAD` of every old branch tip, every first-changed commit and their trees,
  and of a sample of the purged blobs (39 of BotTools' 39, 50 of TrumpBot's 199, 60 of Support's 7,259); a protocol-v2
  `want` of each old tip; the activity feed and the events, twice each; every batch bracketed by controls. These spent
  calls of the authenticated rate limit only.
- **BotTools alone, anonymously:** the web commit route, the `want` route, a bounded REST sample, the web activity page,
  the activity feed and the events. They spent part of the anonymous REST budget of the machine's address, 60 calls an
  hour, which was never short.
- **While the gates waited:** each waiting repository's events, authenticated, at each check of the events gate, about
  once every 9 minutes.

**What GitHub still serves.** Every old object probed is still served: in all three repositories to an authenticated
reader, and in BotTools to anyone, on the web route, the `want` route and the REST routes alike. No answer differed from
the expectation ([as built, §3.3 to §3.5](final-implementation.md#33-bottools-s1)). BotTools' pull-request refs keep its 13
old commits and its 39 purged blobs fetchable, as its report row's pull-request line and
[the parent consequences, §2.1](../consequences.md#21-github) say. The feeds list each force push's old tip: every activity
feed lists them all, and BotTools' web activity page too; BotTools' events list the push of one of its two branches, and
the events of TrumpBot and Support list none of theirs (§5). The unit counted what is served and removed nothing.

### 2.2 This machine

- **`WS`**, deleted by #28:
  - the unit's data file `tmp/g27/units/g41.txt`;
  - its scratch folder `tmp/g27/g41/`: the run log's starting count, the copy of the unit's part of the run log, the
    quick gate's own folders, the feed id files, the probe tallies and the anonymous budget's readings.

  The tool folders, the reused tools, the stage runner, the mirrors, the untouched backups and the fresh mirrors were not
  changed.
- **`DATA`:**
  - in each `rewrite/<repo>/`, new files beside the earlier records, which were not written: `probe-ids/` (the 8 id sets of
    the probes, which hold pre-rewrite ids), `probe-tallies.txt`, `feeds.txt`, `report-row.txt` and the checksum list
    `g41.SHA256SUMS` over those 11 files;
  - the unit's record folder `run/g41/`: `times.txt` (the time of each repository's first and second feed reads), the 12
    step markers, and the checksum list `SHA256SUMS` over those 13 files;
  - the run log's lines for the unit's steps ([as built, §3.6](final-implementation.md#36-the-close-out-s4-and-the-run-log)),
    and the files of the landing's document checks under `run/gate/`.

  Everything in both folders holds ids, paths or names and is never committed, printed or quoted.
- **The TrumpBot clone** and every other checkout were untouched; this working tree changes only by the landing.
- **The request service's local state** was unchanged: the unit sent no request, needed no grant and asked the owner for
  nothing.

### 2.3 Documents and generated boards

The landing carries what [plan, "Documentation impact"](plan.md#documentation-impact) lists: the plan, this document and
the as-built record; the one link line for this unit in
[the parent consequences, §4](../consequences.md#4-units-and-neighbouring-issues); and the regenerated boards. It also
carries a note in [the parent research's verification results](../research/README.md#in-the-build), where the push
findings' expectation of the events did not hold ([as built, deviation 2](final-implementation.md#4-deviations-from-the-plan)).
The parent design takes no dated note: the measurement ran as its §9 describes.

---

## 3. Adoption

- **The events gate.** A repository's feeds are read only once its events list the rewrite's push of every branch it
  pushed, or once 6 hours, the events' documented lag, have passed since its push
  ([plan, "The events gate"](plan.md#the-events-gate)). Here every gate opened on the 6 hours: the events did not list the
  pushes within them ([as built, §3.2](final-implementation.md#32-the-events-gate)), so a later measurement of these feeds
  cannot count on the events listing a push within the documented lag.
- **The residual set on private repositories.** TrumpBot and Support were measured with the authenticated probes and feed
  reads alone, and every control and every probe answered as on the public repository.
- Nothing in KotlinBottools' code, build or published surface adopts anything from this unit.

---

## 4. Sibling units and neighbouring issues

**What the later units and issues take from this unit.** The contract is
[plan, "Interfaces with sibling units"](plan.md#interfaces-with-sibling-units); this is its summary.

| Unit or issue | Takes |
|---|---|
| [#42](https://github.com/SpartanLaboratories/KotlinBottools/issues/42), the clone replacement | nothing: the two units are independent. No step of it ran through the runner while this unit waited |
| [#28](https://github.com/SpartanLaboratories/KotlinBottools/issues/28), the residual report and cleanup | the three report rows, `report-row.txt` in each `DATA\rewrite\<repo>\` (31, 16 and 16 lines), BotTools' carrying the pull-request residual of the rewrites' `residual.txt` and the webhook delivery count; the probe tallies and the feed reads with each read's validity; the id sets; and the records with their checksum lists, `g41.SHA256SUMS` in each repository's folder and `SHA256SUMS` in `DATA\run\g41\` |

**What this unit took:**

- from [the tools unit](../39-workspace-tools/consequences.md) (#39): the residual set at its pins, the format of the
  unit's data file, the quick gate, the readiness checks of the folder and the landing's document checks;
- from [the rewrites](../40-rewrites/consequences.md) (#40), as built, through its records: each repository's stage-8
  marker, its records with their checksum list, the time of each push (the time it was classed), BotTools' webhook
  delivery counts and pull-request residual, the checksums of the preparation unit's records as the rewrites read them,
  and every branch of the three at its rewritten tip.

**The tools unit's assumptions this run exercised** ([its plan, Assumptions](../39-workspace-tools/plan.md#assumptions)): A2,
the stand-ins' shapes, held for the residual set: every step behaved on the real repositories as on its stand-ins, with no
`STOP`; A9 and A10, the shell, the sign-in and the tool versions, held at `S0.pins` and `S0.reads`. Its known gap on the
residual close-out's literal strip of the record folder's path ([its consequences, §5](../39-workspace-tools/consequences.md#5-known-gaps))
was reached by the three records, and each checksum list names its 11 files and verifies. The tools unit's consequences, a
landed document, stay as they are.

**Neighbouring issues:**

- **#27** stays open until its last unit has landed; its consequences gain this unit's link line.
- **#28** stays blocked by #27.
- **#2** and **#1** are not closed by this unit.
- **#16, Phase 17,** archives the three repositories once every purge of the phase is done.

---

## 5. Known gaps

What the build leaves open:

- **The events' membership is measured for BotTools in part, and not for TrumpBot and Support.** After their 6 hours the
  events listed the push of 1 of BotTools' 2 branches and of none of TrumpBot's 2 or Support's 1. BotTools' events reads
  count 1 old id, its activity reads 2; TrumpBot's and Support's events reads are recorded "not valid" and say nothing of
  the events' membership ([as built, §3.3 to §3.5](final-implementation.md#33-bottools-s1)). Whether GitHub lists those
  pushes later or not at all is not established ([the research README, "In the build"](../research/README.md#in-the-build)).
- **What the probes cannot prove:** that GitHub has dropped the old objects, that cached views are gone, that no
  third-party copy exists, or that secret scanning examined the old objects (the parent design's §12.4). Each report row
  says so in its last line.
- **The blob probes of TrumpBot and Support are a sample:** 50 of 199 and 60 of 7,259 purged blobs were probed, evenly
  spaced; the others were not. BotTools' 39 were probed whole.
- **A feed shows only what it lists.** The activity feeds and the events list each force push's old tip, not the old
  history behind it.
- **Some evidence lies under no checksum list.** The gate's readings and the printed words of the typed blocks (`S0.unit`,
  `S0.records`, the events gate, `S4.records`, `S4.g26` and `S4.outputs`) leave no line in the run log and no copy in a
  record; the as-built record ([§3](final-implementation.md#3-measurements)) is their only committed home. The time of each
  first and second feed read is in `times.txt`, under the run folder's checksum list.
- **The pace between probes is not recorded by the tools.** That it was 0.4 seconds rests on the library's pinned default
  and the absence of an override, not on a reading
  ([as built, §3.6](final-implementation.md#36-the-close-out-s4-and-the-run-log)).
- **The anonymous budget's readings do not follow the calls one for one.** The count fell by 10 across a span in which
  BotTools' step 9 makes about 23 anonymous REST calls, and the count after step 9's own last call is not kept; the tools
  record a disagreement only when the fall exceeds the calls the step can make
  ([as built, §3.3](final-implementation.md#33-bottools-s1)). The budget was never short, so no step waited.

**Outcome of the plan's assumptions** ([plan, Assumptions](plan.md#assumptions); the readings are in
[the as-built record, §3](final-implementation.md#3-measurements)). One failed: A2, for all three repositories.

- **A1 held:** nothing pushed to or changed the three repositories. `S0.reads` and each `Sn.reads` found every branch at its
  rewritten tip and the pull-request refs as recorded.
- **A2 failed for all three repositories.** No repository's events listed the rewrite's push of every branch it pushed
  within its 6 hours: at every check that read them, 1 of BotTools' 2, 0 of TrumpBot's 2 and 0 of Support's 1. Each gate
  opened on the 6 hours, and each events read that listed no current id was recorded "not valid", never "absent", as the
  assumption's last column says. BotTools' events reads list the one push they hold. The gap this leaves is the first above.
- **A3 held:** every old object probed in TrumpBot and Support was served to the authenticated reader, and no id answered
  absent.
- **A4 held:** no step printed a `WAIT` and no `RECORD` that the budget's reading disagreed with the calls; the readings'
  smaller fall is a known gap above.
- **A5 held:** BotTools' web activity page listed the activity's ids, 2 old and 2 current, on both reads.
- **A6 held:** every step behaved on the real repositories as on its stand-ins, with no `STOP`.
- **A7 held:** the tool folder was at its pins at `S4.tools`, the rewrites' records equalled their lists at `S4.records`,
  and no other unit's steps ran through the runner while this unit waited.
- **A8 held:** the push payload kept `before` and `head`: BotTools' events reads listed the old tip and the current tip of
  the push they hold.
- **A9 held:** every step ran within a day of the pushes; each events window line read 0 days.

---

## 6. Follow-ups

- **None of this unit's own.** No tool defect was met: the tool folder stays at its pins, and the tools unit's
  consequences take no dated note.
- **BotTools' pull-request residual, the credentials and BotTools' webhook** stay the parent consequences' follow-ups
  ([§6](../consequences.md#6-follow-ups)).
- **A tool defect** a later run meets is corrected under the tools unit's rule
  ([its consequences, §4](../39-workspace-tools/consequences.md#4-sibling-units-and-neighbouring-issues)), with a dated note
  there.
