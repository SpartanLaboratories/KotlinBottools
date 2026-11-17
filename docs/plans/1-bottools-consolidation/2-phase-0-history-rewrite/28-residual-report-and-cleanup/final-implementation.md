# Phase 0 · 8 — Residual-exposure report and workspace cleanup: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#28](https://github.com/SpartanLaboratories/KotlinBottools/issues/28),
  *"Phase 0 · 8 — Residual-exposure report and workspace cleanup"*, unit 8, the last, of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), the history rewrite, which is a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **Plan:** [`plan.md`](plan.md), the procedure this record is measured against; its earlier versions are under
  [`superseded/`](superseded/). **Parent design:** unit `residual-report-and-cleanup` of [`../architecture.md`](../architecture.md),
  [§6.6](../architecture.md#66-residual-exposure-measurement) and [§6.7](../architecture.md#67-cleanup), with the dated note of
  2026-11-17 under §6.7 and under [§11](../architecture.md#11-version-control), and [§12.4](../architecture.md#124-the-report) (the report).
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the blast radius, the outcome of each of
  the plan's assumptions, the known gaps and the follow-ups.
- **What this document is:** what the unit did and measured, in results, counts, statuses and fixed markers; the committed home of
  the posted report's table (§4); and every departure from the plan (§5).

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every time below is UTC, on 2026-11-16. The run's id
is `2026-11-16T22:39:07Z`, written by `S0.unit`. The steps measured here ran from 23:22:24Z, the first sandbox try of the scripts
at their current pins, to 23:50:50Z, when `S7.sums` wrote the unit's checksum list. They met no `STOP` and no `LEFTOVER`, and
one `RECORD` line, `S0.grant`'s.

---

## 1. What was built

- **The report on #2.** One comment, [#issuecomment-6932942675](https://github.com/SpartanLaboratories/KotlinBottools/issues/2#issuecomment-6932942675),
  created at 23:49:00Z by the comment request's first attempt. Its text is the body `S6.fill` built: the five parts of
  [plan, Appendix A](plan.md#appendix-a--the-report) joined, 17,602 bytes in 148 lines, with its 12 placeholders filled from the
  unit's own records. `S6.readback` found it the one comment on #2 that begins with the title line, the newest, and equal to the
  body (§3.6). Its first table and its filled section are in §4.
- **The data folder, verified and listed in full.** Its 47 checksum lists verified from their bases, the 91 files of the three data
  copies equal the blob ids their records name, and the 344 files that were under no list are listed in `run\g28\uncovered.sha256`
  (§3.2). After the deletion the 40 lists whose subject still exists verified again, and so did the new list (§3.7).
- **The tools copy,** `DATA\run\tools`: the 139 files of `WS\tools` in 11 folders, the root counted, byte for byte, proved against
  a list taken before the copy, the four pin lists' 88 rows and the stage runner's pin (§3.3).
- **The checks moved off the workspace.** Each repository's commit-map old column equals its untouched backup's commit set, and
  the original and the moved document checks read the same 19 pending documents with byte-equal outputs (§3.4). The landing's
  document checks run from the tools copy.
- **No workspace.** `WS` was renamed beside itself on its first try and removed; both it and its rename target are confirmed
  absent, with no entry left over (§3.5).
- **The old private repository clone's recorded path** is absent, read at readiness and again at the close-out, and git-filter-repo is
  installed at its recorded version (§3.1, §3.7).
- **The follow-ups,** each read at `S2.read` as the plan's table expects (§3.2) and recorded in
  [consequences, §6](consequences.md#6-follow-ups).
- **The unit's record folder,** `DATA\run\g28\`: 142 files, the scripts among them, and `SHA256SUMS`, which lists the other 141
  (§3.7).
- **The scripts:** the 26 files of [Appendix A and B](plan.md#appendix-b--the-scripts-and-their-pins) with `pins.txt`, 2,160
  bytes, sha256 `e77fb4ad18395696a2b5cb05c58b20c8920ed8b8c6a6207e2ba66f88d4b43e76`, saved at 23:22:17Z (§3.1).
- **The request service's settings:** the section `phase-0-tracking-2-close` was not given when `S0.grant` read the permissions
  file, and the closing's allow line, which the unit cannot read, is not known to be placed. No allow line was placed for the
  deletion: the owner permitted each of its commands as it ran (deviation 4).
- **After the landing,** as [plan, After the landing: the closing of #2](plan.md#after-the-landing-the-closing-of-2) orders:
  #2's closing, the planning-state note and the data folder's final list. What each needs is in
  [consequences, §6](consequences.md#6-follow-ups).
- **Unchanged:** the three data copies, the manifests and every earlier record (§3.2, §3.7); the private repository clone, whose four carried
  files verify against their list; this checkout, apart from the landing. Nothing was written to GitHub but the comment.

---

## 2. Acceptance

| Criterion (the issue's "Done when"; [plan, Requirements](plan.md#requirements)) | Result |
|---|---|
| The report is posted on #2 | Met: `S6.readback`: exactly one comment on #2 begins with the title line, it is the newest, and its text equals the body by sha256 (carriage returns stripped, trailing newlines trimmed); its address is in `report\comment-url.txt` (§3.6) |
| The data folder is verified | Met: `S1.lists`, 47 of 47 lists verify with 0 differences; `S1.copy`, 91 of 91 files equal their blob ids; `S1.census`, 964 files, 620 under a list and 344 under none, and the new list over the 344 verifies; `S7.lists` after the deletion, 40 of 47 with the 7 backup lists skipped, and the new list again (§3.2, §3.7) |
| The workspace is deleted | Met: `S5.gone`, both paths absent, the data folder and the checkout as before; `S7.clone` reads the old clone's recorded path absent again (§3.5, §3.7) |
| Every follow-up is recorded in the consequences | Met: `S2.read`, 34 `ok` lines and no `RECORD` line (§3.2); [consequences, §6](consequences.md#6-follow-ups) |
| #2 closes with this unit | Follows the landing. `S0.grant` recorded the section for the closing as not given, and its allow line is not known to be placed, so #2 is closed by the owner by hand unless the owner gives the section and places the line first ([consequences, §6](consequences.md#6-follow-ups)) |
| No output or record holds a machine path, a pre-rewrite id or a secret | Met for the run: `S7.outputs` over the 37 step outputs, the body, the stored reply, the request file, the records and the run log: no drive-letter path and no 40-digit id; `S6.checks` over the body: the four document checks, the finding tool and the regex checks (§3.6, §3.7). The landing's five document checks run over every pending document before it is committed ([plan, The landing's document checks](plan.md#the-landings-document-checks)) |

The plan's goals are met as §1 shows, with two that follow the landing: #2's closing (goal 8) and, of goal 9, the data folder's
final list. Goal 11 holds: no version moves and the landing carries documents and generated boards only.

---

## 3. Measurements

Some steps are typed without the run's helper: `S0.unit`, `S0.save` and `S7.sums` keep no output file (§3.1, §3.7), and the
deletion's commands keep their own outputs in `out\S5.<command>.txt` (§3.5). The run's own steps, `S6.send` and `S6.reply`, are
given with their results (§3.6).

### 3.1 Readiness (`S0`)

- `S0.unit` (typed): the record folder with its sub-folders, the run id, the workspace's recorded path and its 12 recorded top-level
  folders, written at 22:39Z, and the unit's data file for the tools in the workspace's scratch folder, deleted with the workspace.
- `S0.save` (typed): 26 scripts and data files equal their pins and the folder holds no other file; `pins.txt` 2,160 bytes, sha256
  `e77fb4ad18395696a2b5cb05c58b20c8920ed8b8c6a6207e2ba66f88d4b43e76`; saved at 23:22:17Z. The folder's first save, at 22:39Z, came
  from [the plan's earlier version](superseded/plan-2026-11-16.md), whose pin list has the sha256
  `808c7168c285f4ed88df5434fe4470e67592dc147a38cb5d7c4371ef575f8895`. Its sandbox tries stopped on three faults in the scripts'
  text: the census compared the census tool's console lines, which end with carriage returns, with the table's; the sandbox
  harness lacked two helpers and the after-landing folder's name; and a carriage-return count used a construct Git Bash's `bash`
  cannot expand inside a command substitution. [The current Appendix B](plan.md#appendix-b--the-scripts-and-their-pins) corrects
  all three ([plan, Risks and edge cases](plan.md#risks-and-edge-cases), "Line ends and carriage returns under Git Bash"); it
  also makes each sandbox script stop when it ran fewer cases than it holds, and adds two cases for the report's checks. Those
  four tries are the first four lines of the run log; no later step ran on the first save's scripts.
- `S0.selftest`, from 23:22:24Z: `selftest-1.sh` 17 cases, `selftest-2.sh` 24, `selftest-3.sh` 22 and `selftest-4.sh` 16, each
  ending `ok    selftest: <n> cases passed` and `STAGE SELFTEST OK`, with every case line `ok`.
- `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`.
- `S0.quick`: 63 case lines and `ok    gselftest deterministic: 63 checks passed`, status 0.
- `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`.
- `S0.inputs`: 8 `ok` lines and `STAGE S0.inputs OK`: the unit's branch; every pending path under `docs/`; 139 tool files and the
  copy's place free; the 12 top-level folders; the seven report rows' line counts 24, 24, 34, 28, 31, 16 and 16; the six commit
  maps and manifests; `COPY-VERIFIED`, the scrub expressions and the confirmed allow-list; Node and the finding tool.
- `S0.github`: 5 `ok` lines and `STAGE S0.github OK`: #28 open; #2 open with 8 sub-issues, 1 open; no comment on #2 with the
  title line; the fresh repository public under its id; 500 calls or more left.
- `S0.clone`: 3 `ok` lines and `STAGE S0.clone OK`.
- `S0.grant`: `RECORD the section phase-0-tracking-2-close is not given: the owner closes #2 by hand` and `STAGE S0.grant OK`.

### 3.2 The data folder (`S1`) and the follow-ups (`S2`)

- `S1.lists`: 3 `ok` lines, `ok    47 of 47 lists equal their line counts and verify from their bases (0 backup lists skipped:
  their subject is deleted)` among them, and `STAGE S1.lists OK`.
- `S1.copy`: 5 `ok` lines and `STAGE S1.copy OK`: `COPY-VERIFIED` present and empty; each of the three copies equal to its recorded
  blob ids with no other file; 91 files.
- `S1.census`: 2 `ok` lines, `ok    the census equals the table: 964 files, 620 under a list, 344 under none` and the list over
  the 344 files (deviation 5), and `STAGE S1.census OK`. `uncovered.sha256` holds 344 lines.
- `S1.mark`: `ok    marker S1 written (3 steps)`.
- `S2.read`: 34 `ok` lines, each the value the plan's table of follow-ups expects ([plan, The follow-ups](plan.md#the-follow-ups)),
  no `RECORD` line, and `STAGE S2.read OK` (deviations 2 and 9).

### 3.3 The tools copy (`S3`)

- `S3.list`: `ok    the source holds 139 files and 11 folders (the root counted)`; the list `tools-before.sha256` holds 139 lines
  and `tools-before.dirs` 11.
- `S3.copy`: the copy's place free, the folder copied, `STAGE S3.copy OK`.
- `S3.verify`: 9 `ok` lines and `STAGE S3.verify OK`: the list taken before the copy verifies over the copy; the same files and
  folders; the four pin lists' 24, 22, 21 and 21 rows equal the copied files' sizes and sha256s; `g27tools.sums` at its pinned
  sha256; the stage runner at its pin in the copy's root and in `g26`.
- `S3.census`: 10 `ok` lines and `STAGE S3.census OK`: 139 files in 10 folders below the root; `g26` 22 files, `g27` 25, `p25` 10,
  `rehearsal` 2, `swap` 2, `gitleaks-8.30.1` 3, `gitleaks-dl` 2, `__pycache__` 2, the root 71. `tools-copy-census.txt` holds 149
  lines.
- `S3.mark`: `ok    marker S3 written (4 steps)`.

### 3.4 The checks moved (`S4`)

- `S4.sources`: 12 `ok` lines and `STAGE D.sources OK`: the commit maps' old columns hold 87, 32, 11, 16, 11 and 2 ids and the
  manifests 346, 81, 58, 39, 199 and 7,259 blobs (KotlinBottools, GKB2, GKB, BotTools, the first private repository, the second); each old column equals
  its backup's commit set, with 0 differing lines (deviation 8).
- `S4.routes`: 13 `ok` lines and `STAGE S4.routes OK`: the original route's four arms pass, the moved route's four arms pass, the
  two routes read the same 19 pending documents, and their two id outputs, their paths output and their gate output are equal
  byte for byte.
- `S4.mark`: `ok    marker S4 written (2 steps)`.

### 3.5 The workspace's deletion (`S5`)

- `guards` (typed, its output kept at 23:37:37Z): 12 `ok` lines and `STAGE S5.guards OK`: the three markers this run's; the
  recorded path; a folder and not a link; one volume with the data folder and the profile folder; 0 links, hard links and reparse
  points; the 12 recorded top-level folders; the census, 10,234 files and 5,966 folders, the root counted, 791 MB; every file of
  the source but its compiled caches equal to the copy's, and no other file in the copy; the compiled caches the same files, with
  no `RECORD`; the copy verifies against its list; the workspace standing and its rename target absent.
- `rename` (typed, 23:37:51Z): the guards again (deviation 6), `ok    renamed on the volume after 1 of 5 tries`, `MOVED-ASIDE` and
  `STAGE S5.rename OK`.
- `remove` (typed): its first call was refused by the local permission check before it ran, with the renamed folder whole
  (deviation 4); the second, at 23:46:42Z, printed `ok    the rename target is a folder and the workspace is absent`,
  `WS-DELETED` and `STAGE S5.remove OK`. The removal wrote no error line (deviation 7). `leftover` was not needed.
- `gone` (typed, 23:46:44Z): `ok    both paths are absent: the workspace and its rename target`,
  `ok    the data folder and the checkout are as before` and `STAGE S5.gone OK`.
- The records: `WS_FILES=10234`, `WS_DIRS=5966`, `WS_MB=791`, `WS_TRIES=1`, `WS_LEFTOVER=0`.

### 3.6 The report (`S6`)

- `S6.sources`: 14 `ok` lines and `STAGE S6.sources OK`: per source file, the row lines present and the file's line count as
  recorded: 13 of 24, 18 of 24, 1 of 1, 5 of 9, 3 of 4, 3 of 4, 4 of 4, 4 of 4, 4 of 4, 26 of 34, 19 of 28, 24 of 31, 11 of 16 and
  11 of 16.
- `S6.fill`: `ok    body built: 17602 bytes, 148 lines, sha256 7fa2b9478e3e4e04acda44e99d799976242fd5ac849d67d1653bb3a17c4217f5`,
  `ok    12 placeholders filled, none left, no value unused` and `STAGE S6.fill OK`. The values filled:

  | Placeholder | Value |
  |---|---|
  | `LISTS_TOTAL`, `LISTS_VERIFIED` | 47, 47 |
  | `BLOB_FILES`, `BLOB_MISMATCH` | 91, 0 |
  | `UNLISTED_FILES` | 344 |
  | `TOOLS_FILES`, `TOOLS_PIN_ROWS` | 139, 88 |
  | `WS_FILES`, `WS_DIRS`, `WS_MB` | 10234, 5966, 791 |
  | `WS_TRIES`, `WS_LEFTOVER` | 1, 0 |

- `S6.checks`: the four arms of the document checks over the body, `STAGE D.ids OK`, `STAGE D.paths OK`, `STAGE D.gate OK` (the
  allow-list the confirmed one: 4 confirmed keys, 4 entries) and `STAGE D.scan OK`; `ok    the finding tool finds nothing in the
  body (exit status; find lines 0)` (deviation 5); no run of 7 or more hexadecimal digits with a letter and no drive-letter path; the title line
  first, no carriage return, under 20,000 characters; the six repositories in the first table and the four statements; and
  `STAGE S6.checks OK`.
- `S6.request`: the request file of 18,094 bytes, sha256 `f69633267636db69850393472caeddd4bcab681f751d29400995e990835809ce`, and
  the body's 17,602 bytes with its sha256 as above.
- `S6.send`: one `comment` request by file, id `SpartanLaboratories-KotlinBottools-28/28/report-comment`, attempt 1, with the
  file's sha256; the request service posted the body once.
- `S6.reply`: the reply, `done`, stored at 23:49:53Z as `replies\comment-report-1.txt`.
- `S6.readback`, at 23:50:00Z: `ok    exactly one comment on #2 begins with the title line, and it is the newest`, its text equal
  to the body by sha256 `9a9a30672ee72b6d2efbd1dc3c8ed019d10dcefc8f83a431fb3a08d0c712492a` (the normalised text), its address
  recorded, and `STAGE S6.readback OK`.

### 3.7 The close-out (`S7`) and the records

- `S7.clone`: 3 `ok` lines and `STAGE S7.clone OK`.
- `S7.package`: 2 `ok` lines, git-filter-repo's version prefix and its module's sha256 as recorded, and `STAGE S7.package OK`.
- `S7.lists`: 4 `ok` lines, `ok    40 of 47 lists equal their line counts and verify from their bases (7 backup lists skipped:
  their subject is deleted)` and `ok    the list over the files under no list (344) verifies` among them, and `STAGE S1.lists OK`.
- `S7.outputs`: 5 `ok` lines and `STAGE S7.outputs OK`: the 37 step outputs, the body, the 1 stored reply, the request file, the
  records and the run log hold no drive-letter path and no 40-digit id; the step outputs hold 0 `STOP` lines and 1 `RECORD` line.
- `S7.sums` (typed, 23:50:50Z): the unit's records equal their list, 141 files, and `STAGE S7.sums OK` (deviation 3).
- **The record folder** holds 142 files: the 27 of `bin\`, the 37 step outputs, 13 under `report\` (the body, the four checks'
  outputs with the scanned copy, `finding.out`, `finding.err`, the address and the read-back), the request file, the stored reply,
  12 under `docs\` (deviation 8), 36 under `docs-s4\`, the three markers, the lists and records the plan names, and
  `SHA256SUMS`.
- **The run log** holds 37 lines: the four sandbox tries of the first save, from 22:39:55Z to 22:43:17Z (§3.1), and the 33 steps of
  this record, from 23:22:24Z to 23:50:41Z. The typed steps and the run's own steps have no line in it.

### 3.8 Readings

- **Times** (the run log's start times, so each span includes the wait before the next call): `S0` from 23:22:24Z to 23:24:58Z, the
  four sandbox scripts within 1 minute 33 seconds and the quick gate within 14 seconds; `S1` from 23:25:33Z to 23:26:02Z; `S2.read`
  at 23:26:12Z, within 40 seconds; `S3` from 23:26:52Z to 23:27:33Z; `S4` from 23:27:45Z to 23:28:19Z, `S4.routes` within 26
  seconds. The deletion's commands are typed and have no line in the run log; their outputs' file times stand for them: `guards`
  23:37:37Z, `rename` 23:37:51Z, `remove` 23:46:42Z and `gone` 23:46:44Z, so the renamed folder stood for about nine minutes, until
  the `remove` the owner permitted (deviation 4). `S6` ran from 23:47:22Z to 23:50:00Z, the comment created at 23:49:00Z; `S7`
  from 23:50:17Z to 23:50:41Z, and `S7.sums` at 23:50:50Z. `S0.unit` and `S0.save` are typed too: the record folder's files and the
  scripts carry their times (§3.1).
- **The rename's tries:** 1 of 5 (`WS_TRIES`).
- **The output rule** (`S7.outputs`) and the body's checks (`S6.checks`): no find, no hexadecimal run with a letter, no
  drive-letter path, no 40-digit id.

---

## 4. The report as posted

Every section of the comment is the text of [plan, Appendix A](plan.md#appendix-a--the-report), its 12 placeholders filled as §3.6
gives them, and `S6.readback` found the comment equal to that body. Its first table, as posted:

| Repository | Commits before | Commits after | Paths kept | Blobs kept | Manifest (purged blobs) |
|---|---:|---:|---:|---:|---:|
| KotlinBottools | 87 | 85 | 158 | 433 (436 before the path scrub) | 346 |
| GKB2 | 32 | 30 | 82 | 211 | 81 |
| GKB | 11 | 9 | 60 | 113 | 58 |
| BotTools | 16 | 15 | 82 | 145 | 39 |
| The first private repository | 11 | 9 | 56 | 106 | 199 |
| The second private repository | 2 | 1 | 29 | 29 | 7,259 |

Section 8, the one section with filled values, as posted:

- **The data folder.** 47 of 47 checksum lists verified from their bases before anything was deleted (the list of the swap log by
  its rule: one record was appended after it was written, and the log's first 209 of 210 lines hash to the recorded value); the 91
  files of the three data copies equal the blob ids their records name (0 mismatches); the 344 files that were under no list now
  are.
- **The tools.** The 139 files of the workspace tools were copied byte for byte into the data folder and verified against a list
  taken before the copy and 88 rows of the pin lists; the document checks run from the copy.
- **The workspace.** 10234 files in 5966 folders (791 MB, no link of any kind) were renamed beside themselves, after 1 of 5 tries,
  and removed; both paths are confirmed absent, with 0 entries left over. The old private repository clone's recorded path is confirmed
  absent, and git-filter-repo stays installed.

---

## 5. Deviations from the plan

Each deviation names the section of [`plan.md`](plan.md) it departs from, why, and what that part of the plan rested on.

1. **How the scripts and data files were written** ([plan, Procedure, Conventions, "Saved scripts"](plan.md#conventions), and
   [`S0.save`](plan.md#s0--readiness)). The 26 files of Appendix A and B and `pins.txt` were written from the plan's own text by a
   short reader that copies each fenced block under its `#### <name>` heading as written (LF line endings, the last line's newline
   kept), instead of one typed quoted heredoc per file. Why: the blocks are long, and copying them from the plan's text removes the
   risk of a transcription slip; the result is the same bytes, which is what the plan pins: `pins.txt` is 2,160 bytes with the
   sha256 the plan gives, and `S0.save`'s check passed with all 26 files equal to their pins and no other file in the folder. That
   part of the plan rested on its own rule that a shell block over about 7.6 KB is cut by Git Bash
   ([plan, Requirements, "Rules this unit keeps"](plan.md#requirements)), which the reader does not meet.
2. **The follow-ups read prints 34 `ok` lines, not 35** ([plan, S2 — The follow-ups read](plan.md#s2--the-follow-ups-read),
   Expected). The pinned `follow-ups.sh` prints one line per follow-up it reads, 34 in all, and the plan's own list of what those
   lines are (three repositories, the scopes, the redirect, the deferred step, the token rule, five control files, five findings
   files, the settled finding, the path count, three planning-branch traces, the scan-configuration comment, #47, #2's sub-issues,
   three CI files, the ignore pattern and five pull-request-ref counts) also comes to 34. Every line read as expected, with no
   `RECORD` line, and the step ended `STAGE S2.read OK` with status 0, which is the step's pass by
   [Conventions](plan.md#conventions); the 35 of the Expected text is a miscount. That part of the plan rested on the follow-ups of
   [the phase consequences, §6](../consequences.md#6-follow-ups).
3. **The unit's checksum list prints one `ok` line, not two** ([plan, S7 — Close-out](plan.md#s7--close-out), Expected for
   `S7.sums`). The pinned `close.sh sums` writes the list without a line of its own and prints one `ok` line, that the unit's
   records equal their list (141 files), then `STAGE S7.sums OK` with status 0, which is the step's pass by
   [Conventions](plan.md#conventions). The list is written and verifies, so both things the Expected text names hold; only its
   count of lines differs from the script's. That part of the plan rested on its own reading of `close.sh`.
4. **The workspace's deletion ran without the standing allow line** ([plan, The grant](plan.md#the-grant), item 3, and
   [S5 — The workspace deleted](plan.md#s5--the-workspace-deleted), which starts once the owner has placed allow line 2). The owner
   chose to permit each of the deletion's commands at the moment it ran instead of placing the line ahead of the stage. The
   commands, the pinned script (`delete-ws.sh`, sha256 `da9b163e999bc9919e42f8d4c4d7d277f60c7923068b129ce86041b8fac73ce1`), their
   order and their outputs are as the plan gives them: `guards` and `rename` passed, the first `remove` was refused by the local
   permission check before it ran and left the moved-aside folder whole, the second ran once the owner permitted it, and `gone`
   read both paths absent with the data folder and the checkout as before. With no line placed, no line is left to remove when the
   unit lands ([plan, The follow-ups](plan.md#the-follow-ups), the table's row for the two allow lines and the section). That part
   of the plan rested on [the phase design, §11](../architecture.md#11-version-control) (a unit's local work is its own, with no
   request) and on the allow lines of [unit 7's design, §12](../27-rewrite-bottools-and-the-private-repositories/architecture.md#12-version-control-and-requests).
5. **Two `ok` lines are worded otherwise than the Expected text** ([plan, S1 — The data folder re-verified](plan.md#s1--the-data-folder-re-verified)
   and [S6 — The report posted](plan.md#s6--the-report-posted), Expected):
   - the census's second line: the Expected text reads `ok    the list over the 344 files under no list holds 344 lines and
     verifies`; the pinned `verify-data.sh` labels the same check `… holds that many lines and verifies`. The check compared the
     list's 344 lines and its verification status with the expected 344 and 0, and passed;
   - the finding tool's line of `S6.checks`: the Expected text reads `ok    the finding tool finds nothing in the body`; the
     pinned `report.sh` adds what it read, `ok    the finding tool finds nothing in the body (exit status; find lines 0)`. The check
     compared the tool's exit status with 0, and passed.

   Only the labels' wording differs. That part of the plan rested on its own reading of the scripts.
6. **The rename's output carries the guards' stage line** ([plan, S5 — The workspace deleted](plan.md#s5--the-workspace-deleted),
   Expected for `rename`). The Expected text lists the guards' 12 lines, then the rename's three; the output holds
   `STAGE S5.guards OK` between them, because `rename` runs the guards first and the guards end with their own stage line
   ([plan, The workspace's deletion](plan.md#the-workspaces-deletion): the guards are "also the first act of `rename`"). The step's
   last line is `STAGE S5.rename OK` with status 0, its pass by [Conventions](plan.md#conventions). That part of the plan rested on
   its own design of `delete-ws.sh`.
7. **The removal's error file exists, empty** ([plan, Records and where they live](plan.md#records-and-where-they-live), which
   names `ws-rm-errors.txt` among the files written "only when a removal met something"). The pinned `delete-ws.sh` sends the
   removal's error stream to that file on every `remove`, so it exists after a removal that met nothing, 0 bytes long;
   `ws-leftover.txt` was not written. That part of the plan rested on its own reading of the script.
8. **The id-source proof keeps its outputs in `run\g28\docs\`** ([plan, Records and where they live](plan.md#records-and-where-they-live),
   which names no such folder). `S4.sources` runs `docs-check.sh sources` without an output folder of its own, so the script wrote to
   its default, `run\g28\docs\`: 12 files, each repository's commit-map old column and its backup's commit set. They hold
   pre-rewrite ids, so like every record of the folder they are never committed, printed or quoted, and `SHA256SUMS` lists them.
   That part of the plan rested on [the phase design, §5.1](../architecture.md#51-userprofilebotlegacydata--the-data-folder-data-outlives-the-phase),
   the data folder's layout.
9. **The follow-ups' output is `out\S2.read.txt`** ([plan, The follow-ups](plan.md#the-follow-ups) and
   [S2 — The follow-ups read](plan.md#s2--the-follow-ups-read), which name it `out\S2.txt`). The run's helper keeps each step's
   output under the step's id ([Conventions](plan.md#conventions)), and the step's id is `S2.read`. The consequences are written
   from that file. That part of the plan rested on its own conventions.
