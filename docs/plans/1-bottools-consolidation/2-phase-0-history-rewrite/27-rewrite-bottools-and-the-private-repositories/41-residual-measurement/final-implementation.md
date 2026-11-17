# Phase 0 · 7.3 — Measuring what GitHub still serves of BotTools and the private repositories: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#41](https://github.com/SpartanLaboratories/KotlinBottools/issues/41),
  *"Phase 0 · 7.3 — Measure what GitHub still serves of BotTools and the private repositories"*, unit 3 of
  [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), which is a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **Plan:** [`plan.md`](plan.md), the procedure this record is measured against. **Parent design:** unit `residual-measurement` of
  [`../architecture.md`](../architecture.md), §9 (the residual measurement).
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the blast radius, the outcome of each of
  the plan's assumptions, the known gaps and the follow-ups.
- **What this document is:** what the unit measured of what GitHub still serves of BotTools and the private repositories, in results,
  counts, statuses and fixed markers, and every departure from the plan.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every reading below is a count, a status, a time or a
fixed word; every time is UTC. The unit's first step through the runner began at 2026-11-15T21:44:09Z and its last at
2026-11-16T02:18:22Z. Each step of the plan's stage table ran once but the events gate, which ran at each of its 29 checks (§3.2).
No step printed a `STOP` or a `NEXT` line, and the only `WAIT` lines are the gate's, at its 26 waiting checks.

---

## 1. What was built

- **On GitHub,** nothing: the unit's contact with GitHub was reads, as [consequences, §2.1](consequences.md#21-github) describes.
  Every branch of the three repositories was at its rewritten tip and their pull-request refs as recorded, at `S0.reads` and again at
  each repository's `Sn.reads` (§3.1, §3.3 to §3.5).
- **In the workspace and the data folder,** what [consequences, §2.2](consequences.md#22-this-machine) lists, with the counts of §3:
  in each `DATA\rewrite\<repo>\` the report row, the probe tallies, the feed reads and the id sets under `g41.SHA256SUMS`, and in
  `DATA\run\g41\` the unit's run records under `SHA256SUMS`.
- **Unchanged:** the tool folder `WS\tools\g27\`, every file at its pin at `S0.tools` and `S4.tools`; the earlier tool folder, the
  reused tools and the runner (`S4.g26`); the rewrites' records, equal to their four checksum lists at `S0.records` and `S4.records`;
  the preparation unit's records, as at the rewrites' first `S0.inputs` (each `Sn.reads`); and every checkout, this one apart from
  the landing.

---

## 2. Acceptance

| Criterion ([plan, Requirements](plan.md#requirements)) | Result |
|---|---|
| The probes of the three repositories are made and tallied, every batch's controls answering as expected | Met: 11, 4 and 4 tally lines, every id probed answering served, no `VOID` or `STOP` line, `STAGE <repo>.p9 OK` for each, and `answers other than the expected ones: 0` in each row (§3.3, §3.4, §3.5) |
| Every feed read is made twice, and each read's validity is recorded | Met: each repository's feeds were read twice, the second read 383, 368 and 366 seconds after the first, and each line records its validity: BotTools' ten reads are valid; the activity reads of the private repositories are valid and their events reads `(not valid: no current id listed)` (§3.3 to §3.6) |
| Each repository's report row is complete and under a checksum list | Met: rows of 31, 16 and 16 lines, each with its second-read block; `g41.SHA256SUMS` over 11 record files in each repository's folder and `SHA256SUMS` over the 13 run records, each equal to its files at `S4.records` (§3.3 to §3.6) |
| BotTools' row states what `refs/pull/2/head` and `refs/pull/3/head` still reach | Met: `pull-request residual (of 39 manifest blobs): residual_blobs=39 manifest=39 missing=0 distinct_all=184 every_ref_commits=28`, with the pull-request refs as recorded at `S0.reads` and `S1.reads` (§3.1, §3.3) |
| The rewrites' records equal their checksum lists | Met: 49, 28, 29 and 28 files equal their lists at `S0.records` and again at `S4.records`, and each `g40.SHA256SUMS` at `S0.reads` (§3.1, §3.6) |
| No output or record holds a pre-rewrite commit id, a purged blob id, a path, a name or a secret, and every earlier record equals its recorded checksum | Met for the unit's outputs and records: the unit's 555 lines of the run log and its 9 records hold no drive-letter path and no 40-digit id (`S4.outputs`), and the rows, the feed reads and the tallies are counts and fixed words only; every earlier record equals its checksum (`S4.records`, each `Sn.reads`, `S4.g26`, `S4.tools`) (§3.6). The landing's four document checks, `D.ids`, `D.paths`, `D.gate` and `D.scan`, run over every pending document before it is committed; a hit is reworded and the check run again, so the documents as committed are the ones last checked ([plan, The landing's document checks](plan.md#the-landings-document-checks)) |

The plan's other goals: nothing was written to GitHub and nothing it serves was removed (§1); no version moves, and the landing
carries documents and generated boards only.

---

## 3. Measurements

The words of the typed blocks (`S0.unit`, `S0.records`, the events gate, `S4.records`, `S4.g26` and `S4.outputs`), which run outside
the runner, are given here as the blocks printed them.

### 3.1 Readiness (`S0`)

Run on 2026-11-15 between 21:43Z and 21:46Z. Every step printed what [the plan](plan.md#s0--readiness) expects; no step stopped or
waited.

| Step | Printed | Status |
|---|---|---|
| `S0.unit` (typed block) | `ok    the unit's data file is written; the run log held 15504 lines before the unit's steps` | 0 |
| `S0.tools` | 96 `ok` lines, `STAGE S0.tools OK` | 0 |
| `S0.quick` | 63 `ok` case lines, `ok    gselftest deterministic: 63 checks passed` | 0 |
| `S0.pins` | 7 `ok` lines, `STAGE S0.pins OK` | 0 |
| `S0.records` (typed block) | the four `ok` lines below, `STAGE S0.records OK` | 0 |
| `S0.markers` | 4 `ok` lines, `STAGE R0.markers OK` | 0 |
| `S0.reads` | 12 `ok` lines, `STAGE R0.reads OK` | 0 |

The words of `S0.records`:

```text
ok    the rewrites' run records equal their checksum list (49 files)
ok    BotTools: the rewrites' records equal their checksum list (28 files)
ok    …: the rewrites' records equal their checksum list (29 files)
ok    …: the rewrites' records equal their checksum list (28 files)
STAGE S0.records OK
```

### 3.2 The events gate

No gate opened on the events: each repository's gate opened on its 6 hours. The gate writes no record of its own; each of its checks
is a row here. A cell holds the first word of the repository's line and its count: `k of n` is the number of the repository's pushed
branches whose push the events list. `WAIT` is a repository waiting while no gate is open, `note` one waiting while another is open,
`ok` an open gate. A repository whose stage has started is not checked again. The 6 hours since each push end on 2026-11-16 at
01:40:49Z (BotTools), 01:46:29Z (the first private repository) and 01:51:56Z (the second).

| Check (UTC) | BotTools | The first private repository | The second private repository | Status |
|---|---|---|---|---|
| 2026-11-15T21:46:10Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T21:56:23Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T22:05:34Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T22:14:45Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T22:23:57Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T22:33:07Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T22:42:18Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T22:51:29Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T23:00:40Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T23:09:51Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T23:19:02Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T23:28:12Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T23:37:26Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T23:46:37Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-15T23:55:49Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T00:05:02Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T00:14:13Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T00:23:25Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T00:32:37Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T00:41:47Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T00:51:02Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T01:00:19Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T01:09:38Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T01:18:59Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T01:28:20Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T01:37:40Z | WAIT: 1 of 2 | WAIT: 0 of 2 | WAIT: 0 of 1 | 4 |
| 2026-11-16T01:47:00Z | ok: the 6 hours ended | ok: the 6 hours ended | note: 0 of 1 | 0 |
| 2026-11-16T01:59:29Z | not checked | ok: the 6 hours ended | ok: the 6 hours ended | 0 |
| 2026-11-16T02:08:36Z | not checked | not checked | ok: the 6 hours ended | 0 |

### 3.3 BotTools (`S1`)

The gate opened on the 6 hours at the check of 2026-11-16T01:47:00Z; at the last check that read its events (01:37:40Z) they listed
the push of 1 of its 2 pushed branches.

| Step | Printed | Status |
|---|---|---|
| `S1.budget` (01:47Z) | `ok    a token is available from gh`, `ok    anonymous REST budget: 60 calls left, 34 needed`, `STAGE R0.budget OK` | 0 |
| `S1.9` (01:47:33Z to 01:51:42Z) | 15 `ok` lines, 2 `RECORD` lines, the 11 tally lines, the 5 first feed lines, the 25-line row, `STAGE BotTools.p9 OK`; no `VOID`, `STOP` or `WAIT` | 0 |
| `S1.feeds` (01:52:01Z to 01:58:02Z) | `ok    the first feed read's time was recorded`, `ok    anonymous REST budget: 50 calls left, 6 needed`, the 5 second-read lines, `RECORD BotTools: second feed read, anonymous reads valid: 3 of 3`, `STAGE R1.feeds OK` | 0 |
| `S1.reads` (01:58Z) | 6 `ok` lines, `STAGE R1.reads OK` | 0 |
| `S1.record` (01:58Z) | `ok    BotTools: the id sets of the probes exist`, `ok    BotTools: 11 record files checksummed under the rewrite folder`, the row printed whole (31 lines), `ok    5 run records checksummed`, `STAGE R1.record OK` | 0 |

The second feed reads:

```text
feed activity auth second: old ids 2, current ids 2
feed events auth second: old ids 1, current ids 1
feed web second: old ids 2, current ids 2
feed activity second: old ids 2, current ids 2
feed events second: old ids 1, current ids 1
```

`S1.9` in counts:

- `ok    anonymous REST budget: 60 calls left, 28 needed`; no `RECORD` that the budget's reading disagreed with the calls.
- **The anonymous budget's readings beside the calls.** Three readings of the calls left, of the hour's 60:

  | Reading | Calls left |
  |---|---|
  | before step 9 (`S1.budget` at 01:47:15Z and step 9's own first line) | 60 |
  | at the start of the second feed reads (`S1.feeds`, read at 01:57:49Z, once its 360 seconds had passed) | 50 |
  | after the last anonymous REST call of the second feed reads (01:57:59Z) | 48 |

  The count fell by 10 between the reading before step 9 and the reading at the start of the second feed reads, a span in which
  step 9's sets make 21 anonymous REST calls and its first feed read the pages of the two anonymous feeds (about 2 calls, at most 6).
  It fell by 2 across the second feed reads, which read the same two feeds. The count left after step 9's own last call is not kept:
  the second feed reads replaced it. Step 9 records a disagreement only when the reading at the start, less the last remaining
  count, exceeds the 28 calls the step can make ([the plan, "Step 9 and its close-out"](plan.md#step-9-and-its-close-out)), so no
  `RECORD` was printed. The budget was never short: each of the three checks passed (60 left with 34 needed, 60 with 28, 50 with 6,
  each beyond the margin of 8) and the unit's part of the run log holds no `WAIT` line.
- `RECORD the sets: old tips 2, first-changed 1, old trees 3, manifest sample 39 of 39; REST samples 9`.
- `ok    events window: the push is 0 days old, inside the 30 days the events cover`.
- The authenticated tallies: `auth-commits: served x3`, `auth-trees: served x3`, `auth-blobs: served x39`, `auth-want: served x2`.
- The anonymous tallies: `anon-web: served x3`, `anon-want-commits: served x3`, `anon-want-trees: served x3`,
  `anon-want-blobs: served x39`, `anon-rest-commits: served x3`, `anon-rest-trees: served x3`, `anon-rest-blobs: served x3`.
- The first feed reads, each valid (a current id listed):

  ```text
  feed activity auth first: old ids 2, current ids 2
  feed events auth first: old ids 1, current ids 1
  feed web first: old ids 2, current ids 2
  feed activity first: old ids 2, current ids 2
  feed events first: old ids 1, current ids 1
  RECORD feed reads that are valid (a current id listed): anonymous 3 of 3
  ```

  The two events reads list 1 old id and 1 current id where the plan's expected value is 2 and 2: the events listed the push of 1 of
  the 2 pushed branches when the gate opened on the 6 hours. The plan records the memberships as measured.
- The row's fixed lines: `commits before 16, after 15; paths kept 82; blobs kept 145; manifest 39`; both gitleaks lines
  `RESULT: CLEAN`;
  `pull-request residual (of 39 manifest blobs): residual_blobs=39 manifest=39 missing=0 distinct_all=184 every_ref_commits=28`;
  `webhook deliveries (all, event push): before the push 0 0, after 2 2`;
  `visibility public: anonymous probes and feed reads made`; `answers other than the expected ones: 0`.
- **What the probes cannot prove.** The completed row carries one line of that name, the last of the 25 lines step 9 wrote and the
  25th of the row's 31, in [the plan's words](plan.md#records-and-where-they-live):
  `what the probes cannot prove: that GitHub has dropped the old objects; that cached views are gone; that no third-party copy exists; that secret scanning examined the old objects`.

### 3.4 The first private repository (`S2`)

The gate opened on the 6 hours at the check of 2026-11-16T01:47:00Z, the same check as BotTools'; its stage started once BotTools was
recorded, after the check of 01:59:29Z. At the last check that read its events (01:37:40Z) they listed the push of 0 of its 2 pushed
branches.

| Step | Printed | Status |
|---|---|---|
| `S2.9` (01:59:42Z to 02:01:27Z) | 7 `ok` lines, 1 `RECORD` line, the 4 tally lines, the 2 first feed lines, the 13-line row, `STAGE ….p9 OK`; no `VOID`, `STOP` or `WAIT` | 0 |
| `S2.feeds` (02:01:44Z to 02:07:33Z) | `ok    the first feed read's time was recorded`, the 2 second-read lines, `RECORD …: second feed read`, `STAGE R1.feeds OK` | 0 |
| `S2.reads` (02:07Z) | 6 `ok` lines, `STAGE R1.reads OK` | 0 |
| `S2.record` (02:08Z) | `ok    …: the id sets of the probes exist`, `ok    …: 11 record files checksummed under the rewrite folder`, the row printed whole (16 lines), `ok    9 run records checksummed`, `STAGE R1.record OK` | 0 |

The second feed reads:

```text
feed activity auth second: old ids 2, current ids 2
feed events auth second: old ids 0, current ids 0 (not valid: no current id listed)
```

`S2.9` in counts:

- `RECORD the sets: old tips 2, first-changed 1, old trees 3, manifest sample 50 of 199; REST samples 9`.
- `ok    events window: the push is 0 days old, inside the 30 days the events cover`.
- The authenticated tallies: `auth-commits: served x3`, `auth-trees: served x3`, `auth-blobs: served x50`, `auth-want: served x2`.
- The first feed reads:

  ```text
  feed activity auth first: old ids 2, current ids 2
  feed events auth first: old ids 0, current ids 0 (not valid: no current id listed)
  ```

  The activity feed read is valid. The events read is not valid, where the plan's expected value is 2 and 2: the events listed no
  push of the rewrite once the 6 hours had passed. It is recorded "not valid", never "absent".
- The row's fixed lines: `commits before 11, after 9; paths kept 56; blobs kept 106; manifest 199`; both gitleaks lines
  `RESULT: CLEAN`;
  `visibility private: no anonymous probe or feed read: every anonymous request to a private repository answers not found`;
  `answers other than the expected ones: 0`.
- **What the probes cannot prove.** The completed row carries one line of that name, the last of the 13 lines step 9 wrote and the
  13th of the row's 16, in [the plan's words](plan.md#records-and-where-they-live):
  `what the probes cannot prove: that GitHub has dropped the old objects; that cached views are gone; that no third-party copy exists; that secret scanning examined the old objects`.

### 3.5 The second private repository (`S3`)

The gate opened on the 6 hours (they ended at 01:51:56Z) and was read open at the check of 2026-11-16T01:59:29Z; its stage started
once the first private repository was recorded, after the check of 02:08:36Z. At the last check that read its events (01:47:00Z) they listed the push of
0 of its 1 pushed branch.

| Step | Printed | Status |
|---|---|---|
| `S3.9` (02:08:48Z to 02:10:38Z) | 7 `ok` lines, 1 `RECORD` line, the 4 tally lines, the 2 first feed lines, the 13-line row, `STAGE ….p9 OK`; no `VOID`, `STOP` or `WAIT` | 0 |
| `S3.feeds` (02:10:55Z to 02:16:42Z) | `ok    the first feed read's time was recorded`, the 2 second-read lines, `RECORD …: second feed read`, `STAGE R1.feeds OK` | 0 |
| `S3.reads` (02:17Z) | 6 `ok` lines, `STAGE R1.reads OK` | 0 |
| `S3.record` (02:17Z) | `ok    …: the id sets of the probes exist`, `ok    …: 11 record files checksummed under the rewrite folder`, the row printed whole (16 lines), `ok    13 run records checksummed`, `STAGE R1.record OK` | 0 |

The second feed reads:

```text
feed activity auth second: old ids 1, current ids 1
feed events auth second: old ids 0, current ids 0 (not valid: no current id listed)
```

`S3.9` in counts:

- `RECORD the sets: old tips 1, first-changed 1, old trees 2, manifest sample 60 of 7259; REST samples 7`.
- `ok    events window: the push is 0 days old, inside the 30 days the events cover`.
- The authenticated tallies: `auth-commits: served x2`, `auth-trees: served x2`, `auth-blobs: served x60`, `auth-want: served x1`.
- The first feed reads:

  ```text
  feed activity auth first: old ids 1, current ids 1
  feed events auth first: old ids 0, current ids 0 (not valid: no current id listed)
  ```

  The activity feed read is valid. The events read is not valid, where the plan's expected value is 1 and 1: the events listed no
  push of the rewrite once the 6 hours had passed. It is recorded "not valid", never "absent".
- The row's fixed lines: `commits before 2, after 1; paths kept 29; blobs kept 29; manifest 7259`; both gitleaks lines
  `RESULT: CLEAN`;
  `visibility private: no anonymous probe or feed read: every anonymous request to a private repository answers not found`;
  `answers other than the expected ones: 0`.
- **What the probes cannot prove.** The completed row carries one line of that name, the last of the 13 lines step 9 wrote and the
  13th of the row's 16, in [the plan's words](plan.md#records-and-where-they-live):
  `what the probes cannot prove: that GitHub has dropped the old objects; that cached views are gone; that no third-party copy exists; that secret scanning examined the old objects`.

### 3.6 The close-out (`S4`) and the run log

Run on 2026-11-16 between 02:18Z and 02:20Z, after the third repository's record. Every step printed what
[the plan](plan.md#s4--close-out) expects.

| Step | Printed | Status |
|---|---|---|
| `S4.records` (typed block) | the eight `ok` lines below, `STAGE S4.records OK` | 0 |
| `S4.tools` | 96 `ok` lines, `STAGE S0.tools OK` | 0 |
| `S4.g26` (typed block) | the three `ok` lines below | 0 |
| `S4.outputs` (typed block) | the three `ok` lines below, `STAGE S4.outputs OK` | 0 |

The words of `S4.records`:

```text
ok    the rewrites' run records equal their checksum list (49 files)
ok    BotTools: the rewrites' records equal their checksum list (28 files)
ok    …: the rewrites' records equal their checksum list (29 files)
ok    …: the rewrites' records equal their checksum list (28 files)
ok    this unit's run records equal their checksum list (13 files)
ok    BotTools: this unit's records equal their checksum list (11 files)
ok    …: this unit's records equal their checksum list (11 files)
ok    …: this unit's records equal their checksum list (11 files)
STAGE S4.records OK
```

The words of `S4.g26`:

```text
ok    g26: 21 of 21 pinned files equal their pins, 22 files in the folder
ok    the 21 reused tools and the runner equal g26/tools.sums
ok    the runner: 1428 9cdb381040caf266bb61576536a9cc45436f031fa797fd9358a041249909c428
```

The words of `S4.outputs`:

```text
ok    the unit's part of the run log: 555 lines; STOP 0, WAIT 0, NEXT 0, RECORD 7
ok    the unit's part of the run log holds no drive-letter path and no 40-digit id
ok    9 records of the unit (each repository's report row, feed reads and probe tallies) hold no drive-letter path and no 40-digit id
STAGE S4.outputs OK
```

The seven `RECORD` lines are the three `RECORD the sets`, BotTools' valid anonymous reads and the three second reads. The unit's part
of the run log holds the lines of this unit's 19 runner steps and of no other unit: 19 start lines and 19 end lines, each end line
with status 0 (five steps of `S0`: `S0.tools`, `S0.quick`, `S0.pins`, `S0.markers` and `S0.reads`; five of `S1`; four of `S2`; four
of `S3`; and `S4.tools`). It holds 18 `STAGE … OK` lines, one for each step but the quick gate, which prints its total line and no
`STAGE` line. No other unit's steps ran through the runner while this unit waited.

After the unit's 555 lines, the run log holds 66 more, from 02:23:47Z: one run of the quick gate through the runner, 63 of 63 cases
and status 0, which [the plan](plan.md#when-the-steps-run-again) allows at any time. They hold no drive-letter path and no 40-digit
id. The 555 are the unit's part as `S4.outputs` read it.

**The spacing of the feed reads,** read from `times.txt` as [the plan's test plan](plan.md#test-plan) gives it, each at least 360
seconds:

```text
BotTools: the second read was made 383 seconds after the first
…: the second read was made 368 seconds after the first
…: the second read was made 366 seconds after the first
```

**The pace between probes** was the tools' pinned 0.4 seconds, with no override. The library of the tool folder, at its pins at
`S0.tools` and `S4.tools`, sets the pace to 0.4 seconds unless `G27_PACE` is set; `env.sh`, the stage runner, the unit's data file and
the calls of the steps set no `G27_PACE`, and a fresh shell of the kind the steps start from holds none. The tools print no line for
the pace and keep no record of it, so this rests on the pinned default and the absence of an override, not on a reading of the run.

---

## 4. Deviations from the plan

Each deviation names the section of [`plan.md`](plan.md) it departs from, why, and what that part of the plan rested on.

The events reads that list fewer pushes than the plan's expected values, and the gates that opened on the 6 hours, are no departure:
the plan records the feed memberships as measured and opens a gate on the 6 hours when the events do not list the push in time
([plan, "The events gate"](plan.md#the-events-gate)). The outcome of its assumption A2 is in
[consequences, §5](consequences.md#5-known-gaps), and the push findings' expectation that did not hold is in
[the research README, "In the build"](../research/README.md#in-the-build).

1. **Two readings beside the procedure.** [Plan, Procedure](plan.md#procedure) gives every step's commands, and
   [its Test plan](plan.md#test-plan) names the pace between probes and the anonymous budget's reading against the calls among what
   the nonfunctional tests show, with a command for the spacing of the feed reads alone. Two read-only readings were made beside the
   steps for the other two: the anonymous budget's last remaining count, 48, from the count the tools keep in the unit's scratch
   folder after the second feed reads (§3.3); and the pace, from the library's pinned default and the absence of a `G27_PACE`
   setting in `env.sh`, the stage runner, the unit's data file and a fresh shell (§3.6). Neither writes anything or changes a step's
   outcome. The test plan's row rests on [architecture §9.2](../architecture.md#92-what-is-measured), which compares the anonymous
   budget read before BotTools' set with the calls made, and on [§14](../architecture.md#14-extension-and-stability), which keeps the
   pace among the measurement's constants.
2. **A note in the parent research.** [Plan, File-by-file changes](plan.md#file-by-file-changes) lists the documents the landing
   carries. The landing also carries a note in the verification results of [the parent research](../research/README.md#in-the-build),
   which that list does not name: the push findings expected one push event per rewritten branch, listed within the events'
   documented lag of up to 6 hours, and after the 6 hours the events listed 1 of BotTools' 2, none of the first private repository's 2 and none of
   the second's 1 (§3.2 to §3.5). The verification results are where the research keeps what a build found against its claims. The list
   rested on [architecture §12](../architecture.md#12-version-control-and-requests): a landing of documents only, which this one
   stays.
