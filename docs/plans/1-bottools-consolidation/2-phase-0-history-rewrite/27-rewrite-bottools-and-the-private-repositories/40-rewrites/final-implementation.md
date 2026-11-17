# Phase 0 · 7.2 — Rewriting BotTools and the private repositories: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#40](https://github.com/SpartanLaboratories/KotlinBottools/issues/40),
  *"Phase 0 · 7.2 — Rewrite BotTools and the private repositories"*, unit 2 of
  [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), which is a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **Plan:** [`plan.md`](plan.md), the procedure this record is measured against. **Parent design:** unit `rewrites` of
  [`../architecture.md`](../architecture.md), §8 (the rewrites).
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the blast radius, the outcome of each
  of the plan's assumptions, the known gaps and the follow-ups.
- **What this document is:** what the unit did to BotTools and the private repositories and what it measured, in results, counts,
  statuses and fixed markers, and every departure from the plan.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every time below is UTC, on 2026-11-15. The unit's
first step through the runner began at 18:58:55Z and its last at 19:53:20Z. It met no `STOP`, `WAIT`, `NEXT` or `SKIP` line, and
no repository was reset.

---

## 1. What was built

- **On GitHub,** the three pushes, and nothing else, that [consequences, §2.1](consequences.md#21-github) describes, in the order
  BotTools, the first private repository, the second. BotTools' was carried out on its second attempt (§3.3), the private repositories' on their first.
  Every branch tip on GitHub is `ref-map`'s new column, and each activity feed gained exactly one force-push entry per pushed
  branch, 2, 2 and 1.
- **In the workspace and the data folder,** what [consequences, §2.2](consequences.md#22-this-machine) lists, with the counts of
  §3.5.
- **The request service's settings for the job:** the grant section `phase-0-bottools-…-rewrite`, granted
  2026-11-15 and equal to the plan's wording apart from its date; the lift of the deny rule on `git push --force-with-lease`, which
  held in one of the two settings files the service loads when the unit started and in both from 19:09Z; and three allow lines,
  one per push, in the global settings file the service reads (deviations 1 and 2). All three stay until the section moves to
  history.
- **Unchanged:** the tool folder `WS\tools\g27\`, every file at its pin, its pin list's sha256
  `60f5760b246ce9b5f1c692e63d72895774fdc86d32db2fad11ccb581877631bf` before `S0` and after `S4`; the earlier tool folder, the
  reused tools and the runner; the preparation unit's records of the three repositories, as at the first `S0.inputs`; the
  manifests; the tools unit's records in `DATA\run\g27\` (its three checksum lists and three empty folders); the first private repository's local
  clone, whose last reflog entry dates from 2022; and every checkout, this one apart from the landing.

---

## 2. Acceptance

| Criterion (the issue's "Done when"; [plan, Requirements](plan.md#requirements)) | Result |
|---|---|
| BotTools and the private repositories each have every branch and tag clean on a fresh mirror, and every count equal to its expectation | Met: `STAGE <repo>.p8 OK` for each. On each fresh mirror the expectation check with `--scope heads` reads `RESULT: PASS`, no manifest blob is reachable from a branch or tag, and the scan of branches and tags reads `RESULT: CLEAN` with 0 findings (§3.4) |
| Each push is classed as pushed and read back at every branch, with the pull-request refs, the default branch and the visibility as recorded | Met: three `CLASS pushed` lines, each read back as `both` with the pull-request refs unchanged and every branch at its new tip (§3.3); `STAGE <repo>.p7 OK` on both channels, and `STAGE C1.reads OK` (§3.4, §3.5) |
| BotTools' pull-request residual and its webhook deliveries are counted and recorded | Met: at `S1.7`, `RECORD webhook deliveries: listed now 2 (event push: 2); listed before the push 0 (event push: 0); push deliveries since the push: 2`; at `S1.8`, `residual_blobs=39 manifest=39 missing=0 distinct_all=184 every_ref_commits=28` (§3.4) |
| Any default-rule finding is recorded as a follow-up | Met: none arose, before any push or on any fresh mirror, and no `default-rule-findings` file exists |
| The unit's records carry their checksum lists | Met: `g40.SHA256SUMS` in each `DATA\rewrite\<repo>\` and `SHA256SUMS` in `DATA\run\g40\`, each verified whole by `sha256sum -c` (§3.5) |

The plan's sixth criterion is met as well: no step output or stored reply holds a pre-rewrite commit id, a purged blob id, a path, a
name or a secret, no request file holds an id of a history, and every earlier record equals its recorded checksum (`S4.outputs` and
`S4.reads`, §3.5; `S0.inputs` and `S0.records`, §3.1). The landing's four document checks run over every pending document before it
is committed ([plan, The landing's document checks](plan.md#the-landings-document-checks)).

---

## 3. Measurements

The results of the typed blocks, which run outside the runner, are given here as counts and words: `S0.unit` and `S0.records`
(§3.1), the state read (§3.3), and `S4.g26` and `S4.outputs` (§3.5).

### 3.1 Readiness (`S0`)

- `S0.unit` (typed): one `ok` line; the run log held 14,447 lines before the unit's steps.
- `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`. The step compares each file with the pin list; the list's own sha256, which
  the step does not assert, was the one above before `S0` and after `S4` (deviation 4).
- `S0.gate`, the quick gate (the deterministic tests of the self-test): 63 case lines and
  `ok    gselftest deterministic: 63 checks passed`, in about 7 seconds.
- `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`.
- `S0.inputs`: 62 `ok` lines and `STAGE S0.inputs OK`, among them the checksums of the 5, 6 and 5 earlier records recorded for this
  unit.
- `S0.records` (typed): 3 `ok` lines and `STAGE S0.records OK`: the earlier records as this unit recorded them equal the tools
  unit's recording.
- `S0.repos`: 39 `ok` lines (14, 13 and 12), 5 `RECORD` lines and `STAGE S0.repos OK`. The readings, never compared: activity feed
  entries 0, 0 and 0, events 0, 3 and 0, and the rate limit's remaining core calls 4,921, 4,909 and 4,898; the rulesets reads of
  the private repositories refused with HTTP 403 and the upgrade wording.
- `S0.grant`: 12 `ok` lines, the last `ok    the section equals the unit's wording apart from the date`, no wording `RECORD`, and
  `STAGE S0.grant OK`.

### 3.2 The rewrites (steps 1 to 5)

| | BotTools | The first private repository | The second private repository |
|---|---|---|---|
| `p1`: `ok` lines; `N_BEFORE`, `R_BEFORE` | 27; 16, 4 | 27; 11, 2 | 27; 2, 1 |
| `p2`: `ok` lines; the positive control on the untouched backup | 8; `RESULT: CLEAN`, 0 findings | 10; scan status 1, 3,518 findings, `CONTROL OK`; among the summary's lines, the scan wrapper's own count `commits_scanned=10 expected_commits=10` and `bare-token-file findings=1 files=1` | 8; `RESULT: CLEAN`, 0 findings |
| `p2`: against the preparation unit's records | equal line for line; `RECORD kept findings as recorded: … total_kept=0` | the same | the same |
| `p3`: `ok` lines | 6 | 6 | 6 |
| `p4`: `ok` lines; the expectation check (commits after, paths, blobs, largest blob in bytes) | 30; `RESULT: PASS` (15, 82, 145, 27,168) | 30; `RESULT: PASS` (9, 56, 106, 25,952) | 30; `RESULT: PASS` (1, 29, 29, 14,302) |
| `p4`: the scan before the push; files in `SHA256SUMS` | `RESULT: CLEAN`; 13 | `RESULT: CLEAN`; 13 | `RESULT: CLEAN`; 13 |
| `p5`: `ok` lines; pull-request refs on the server | 22; 2 | 17; 0 | 17; 0 |
| `p5`: BotTools' webhook | snapshot recorded; deliveries listed before the push 0, of event push 0 | — | — |

### 3.3 The pushes (step 6)

| | BotTools | The first private repository | The second private repository |
|---|---|---|---|
| `request`: `ok` lines; the `PROCEED` line | 4; attempt 1 | 4; attempt 1 | 4; attempt 1 |
| Carried out by the request service | attempt 2, from 19:38:21Z to 19:39:29Z | attempt 1 | attempt 1 |
| GitHub's `pushed_at` | 19:38:58Z | 19:45:21Z | 19:50:39Z |
| The reply stored | 19:40:37Z, `ok    stored reply 1 for push-BotTools as done (11 printed lines)` | 19:46:16Z, 11 printed lines | 19:51:44Z, 11 printed lines |
| `check` | `CLASS pushed status=done push_rc=0 dry_rc=0 tally_ok=1 same_flags=1 porcelain_lines=2 rr=0 cr=0 st=0 at=0 to=1 gh=0 pp=0 loc=0 inc=0 fa=0` | the same, `porcelain_lines=2` | the same, `porcelain_lines=1` |
| The read-back | `both`, the pull-request refs unchanged; 2 branches at the new tip | the same; 2 | the same; 1 |

Each procedure's six entries ran once, as one shell, and each reply held its 11 printed lines. The dry run's tally and the push's
were the expected one, `forced=2 …`, `forced=2 …` and `forced=1 …`, with the same refs and flags in both runs.

**BotTools' first call.** The request was sent at 19:03Z as attempt 1. At 19:07Z the request service answered that its own check
had refused the call before any entry ran: the procedure ran 0 times and no ref changed. The typed state read printed
`state: neither`, `branch 1: old`, `branch 2: old` and `pull-request refs: unchanged`, and none of the four stream files existed
(0 of 4). No reply was stored, `request` was not run again, and nothing was sent a second time: the request service ran the same
request again itself, as attempt 2 (deviation 1), and its delivered reply reports attempt 2 where the `PROCEED` line said 1, as
[the plan's Risks and edge cases](plan.md#risks-and-edge-cases) expect. Where the evidence of this call lies is a known gap
([consequences, §5](consequences.md#5-known-gaps)).

### 3.4 Per-ref verification and the exit tests (steps 7 and 8)

| | BotTools | The first private repository | The second private repository |
|---|---|---|---|
| `p7`: `ok` lines | 14 | 10 | 10 |
| `p7`: the closing line | `ok    the repository holds 2 head(s), all rewritten, and 2 pull-request ref(s), as recorded` | `… 2 head(s), all rewritten, and 0 pull-request ref(s) …` | `… 1 head(s), all rewritten, and 0 pull-request ref(s) …` |
| `p7`: BotTools' webhook | `RECORD webhook deliveries: listed now 2 (event push: 2); listed before the push 0 (event push: 0); push deliveries since the push: 2`; the webhook equal to its snapshot | — | — |
| `p8`: `ok` lines | 17 | 17 | 17 |
| `p8`: the residual line | `residual_blobs=39 manifest=39 missing=0 distinct_all=184 every_ref_commits=28` | `residual_blobs=0 manifest=199 missing=199 distinct_all=106 every_ref_commits=9` | `residual_blobs=0 manifest=7259 missing=7259 distinct_all=29 every_ref_commits=1` |
| `p8`: the expectation check with `--scope heads` | `RESULT: PASS` | `RESULT: PASS` | `RESULT: PASS` |
| `p8`: the scans of branches and tags, and of every ref | both `RESULT: CLEAN`, 0 findings; the every-ref scan recorded as clean, with no rule listed | both `RESULT: CLEAN`, 0 findings, equal | both `RESULT: CLEAN`, 0 findings, equal |

No default-rule finding arose in any repository, before its push or on its fresh mirror. BotTools' webhook equalled its snapshot
after its two push deliveries, so the typed block that names the fields that differ was not run.

### 3.5 The close-out (`S4`) and the run log

- `S4.reads`: 20 `ok` lines (8, 6 and 6) and `STAGE C1.reads OK`.
- `S4.record`: 7 `ok` lines and `STAGE C1.record OK`: 28, 29 and 28 record files checksummed under the rewrite folders, and 49 run
  records: the three `records-at-s0.<repo>.sums`, the three request files, the three stored replies, 30 step markers (`p1` to `p8`,
  `c1reads` and `c1record` of each repository), the three class and three key files, `times.txt`, and BotTools' webhook snapshot
  and its two delivery counts. `sha256sum -c` over each list: 28 of 28, 29 of 29, 28 of 28 and 49 of 49.
- `S4.tools`: 96 `ok` lines and `STAGE S0.tools OK`.
- `S4.g26` (typed): 3 `ok` lines: 21 of 21 pinned files equal their pins, 22 files in the folder; the 21 reused tools and the runner
  equal their list; the runner `1428 9cdb381040caf266bb61576536a9cc45436f031fa797fd9358a041249909c428`.
- `S4.outputs` (typed): 4 `ok` lines and `STAGE S4.outputs OK`: the unit's part of the run log holds 1,025 lines, with `STOP` 0,
  `WAIT` 0, `NEXT` 0 and `RECORD` 10, and no drive-letter path and no 40-digit id; the 3 stored replies hold neither; the 3 request
  files hold no 40-digit id.
- **The run log** after its line 14,447: 1,025 lines; 39 runner calls, each ending `exit=0`; 32 `STAGE … OK` lines; 10 `RECORD`
  lines (5 of `S0.repos`, 3 of the positive controls' kept findings, each `total_kept=0`, BotTools' webhook deliveries and BotTools'
  every-ref scan); 3 `CLASS` lines; 3 `PROCEED` lines, each attempt 1; no `STOP`, `WAIT`, `NEXT` or `SKIP` line.

### 3.6 Timings

- Each scan, and each step run in the background, took 1 to 7 seconds: `p2` about 1, 5 and 7 seconds, `p4` about 3, 4 and 4, and
  `p8` about 3, 4 and 3, for BotTools and the private repositories.
- `times.txt` records, as each repository's `<repo>.pushed`, the time `check` classed its push: 111, 68 and 77 seconds after
  GitHub's `pushed_at` (deviation 3).

---

## 4. Deviations from the plan

Each deviation names the section of [`plan.md`](plan.md) it departs from, why, and what that part of the plan rested on.

1. **The request service ran BotTools' refused request again without a restart.** [Plan, Design, "The grant", item 3](plan.md#the-grant),
   [Design, "The push"](plan.md#the-push) (the paragraph on a call the service's own check refuses, and the note in its sequence
   diagram), [Current state, "The request service"](plan.md#current-state), A4 of [Assumptions](plan.md#assumptions) and
   [Risks and edge cases](plan.md#risks-and-edge-cases) have the allow line placed after the refusal and the request service
   restarted before it runs the request again. The allow line was placed in the global settings file the running service reads,
   and at 19:38:21Z the service ran the same request again itself, under the same id with the next attempt number, with no
   restart: the six entries ran once as one shell, and the reply held its 11 lines. Once the line was in that file the running
   service applied it, so a restart had nothing left to do; it stayed the step for a second refusal with the line in place, which
   did not come. Nothing was sent twice, and every other step for this case was the plan's (§3.3). The plan's statement rested on
   [architecture §2.4](../architecture.md#24-the-request-service), drawn from
   [the GKB2 and GKB unit's as-built record, deviation 4](../../26-gkb2-gkb-rewrite/final-implementation.md#4-deviations-from-the-plan),
   and on [§8.3](../architecture.md#83-outcome-read-back-and-resend) and [§12](../architecture.md#12-version-control-and-requests);
   §2.4 and §12 carry dated notes on it.
2. **Three allow lines, one per push, were placed at once, two of them before any refusal.** [Plan, Design, "The grant", item 3](plan.md#the-grant)
   has the allow line for that exact command placed after the refusal. The lines for all three pushes went into the global
   settings file together, after BotTools' refusal, so the private repositories' calls met their lines already in place, and neither
   was refused. Each push's procedure is a command of its own and would have met the same check; with its line in place before its
   call, no later push needed a refused first attempt. The lines stay until the grant section moves to history
   ([consequences, §6](consequences.md#6-follow-ups)). The item rested on [architecture §2.4](../architecture.md#24-the-request-service)
   and [§12](../architecture.md#12-version-control-and-requests).
3. **The time recorded for each push is the time the push was classed.** [Plan, Design, "Records and where they live"](plan.md#records-and-where-they-live),
   [Risks and edge cases](plan.md#risks-and-edge-cases) and [Interfaces with sibling units](plan.md#interfaces-with-sibling-units)
   call `times.txt`'s `<repo>.pushed` the time of the push. The tool writes it when `check` classes the push as pushed
   ([the tools plan, `p6-push.sh`](../39-workspace-tools/plan.md#p6-pushsh)), the first moment the unit knows the push landed:
   111, 68 and 77 seconds after GitHub's `pushed_at` (§3.6). The residual measurement compares it with the events' 30-day window
   in whole days, so the difference changes nothing there. The record rests on [architecture §8.4](../architecture.md#84-records)
   and the seam "the time of the push" of [§5.1](../architecture.md#51-seams).
4. **Two reads beside the procedure.** [Plan, Procedure](plan.md#procedure) gives every step's commands; two read-only reads were
   made beside them. The pin list's own sha256 was read before `S0` and after `S4`, because `s0-ready.sh tools` compares each file
   with the pin list but not the list with the sha256 that [the tools plan's Appendix B](../39-workspace-tools/plan.md#appendix-b--the-pins)
   records: both readings gave that sha256. After BotTools' refused call, the four stream files were counted: none existed, as
   [Design, "The push"](plan.md#the-push) says of such a call. Neither read writes anything or changes a step's outcome. The pins
   rest on [architecture §7.5](../architecture.md#75-what-the-unit-proves-and-what-follows-its-landing): each later unit proves the
   folder equal to its pins.
