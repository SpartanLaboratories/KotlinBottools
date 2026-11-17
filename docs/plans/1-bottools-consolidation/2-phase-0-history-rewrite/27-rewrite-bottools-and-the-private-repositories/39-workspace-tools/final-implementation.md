# Phase 0 · 7.1 — Extending the workspace tools for BotTools and the private repositories: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#39](https://github.com/SpartanLaboratories/KotlinBottools/issues/39),
  *"Phase 0 · 7.1 — Extend the workspace tools for BotTools and the private repositories"*, unit 1 of
  [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), which is a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **Plan:** [`plan.md`](plan.md), the procedure this record is measured against. **Parent design:** unit `workspace-tools` of
  [`../architecture.md`](../architecture.md), §7 (the tools).
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the known gaps, the outcome of each of
  the plan's assumptions, and the follow-ups.
- **What this document is:** what the unit built and what it measured, in results, counts, statuses and fixed markers, and every
  departure from the plan.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every time below is UTC. The measured run went from
`S1.save` to the close-out: its first logged step, `S1.tools`, began at 2026-11-15T11:09:28Z, and its last, the repositories read
again for `S4.records`, at 11:35:40Z. It ran over the state an earlier run of the same steps had left, as
[Procedure, "When the steps run again over an earlier run's state"](plan.md#when-the-steps-run-again-over-an-earlier-runs-state)
provides for. It met no `STOP`, no `WAIT` and no `NEXT`.

---

## 1. What was built

- **On GitHub,** nothing. The unit's contact with GitHub was reads, at `S3.repos` and again at `S4.records`: each repository's
  settings, branches, tags, releases, keys, workflows, rulesets and webhooks, BotTools' list of webhook deliveries, the activity feed
  and the events, and each server's refs by `git ls-remote`.
- **The tools,** the 25 files of [the plan's Appendix A](plan.md#appendix-a--the-tools) and
  [Appendix B](plan.md#appendix-b--the-pins), saved to `WS/tools/g27/`, each at its pin: 19 shell scripts, 3 Python tools, the
  parameter table `params.txt` and the two pin lists, `tools.sums` (its 22 rows: the reused tools, the stage runner and the gitleaks
  binary) and `g27tools.sums` (the folder's other 24 files), whose sha256 is
  `60f5760b246ce9b5f1c692e63d72895774fdc86d32db2fad11ccb581877631bf`. The folder's first save had other comments in five of its
  files and the pin list `5423a7048624350e599cbfa66b8ad5e25e291fabfa037e7f92c7687844aeb855` (deviation 1).
- **The unit's data file and scratch folder,** in `WS/tmp/g27/`: the data file `units/g27.txt`, as `S0.unit` writes it (`runs=g27`,
  `from=-`, and placeholders for the grant's keys, which no step of the unit reads), and the scratch folder `g27/`. That folder holds
  the self-test's run id; for each kind, its console and its own case lines; for the five kinds before `coverage`, their collections
  of stop lines and of printed outputs and their stamps; and the readiness reads' scratch files. Every sandbox is removed, and the
  folder `selftest/` in which the kinds make them stays, empty.
- **The records,** in `DATA/run/g27/`: the three `records-at-s0.<repo>.sums`, the checksums of the preparation unit's earlier
  records (5 for BotTools, 6 for the first private repository, 5 for the second), written when `S3.inputs` first ran, on 2026-11-14, and only compared
  since; beside them the three empty folders `requests/`, `replies/` and `status/`. The unit's lines are in the run log,
  `DATA/run/as-run.log`. Nothing under `DATA/rewrite/` was written, and no earlier record changed.
- **Unchanged:** `WS/tools/g26/` (21 of 21 pinned files equal their pins, 22 files in the folder), the reused tools and the runner at
  their rows of `tools.sums`, every repository and every checkout. This checkout changes only by the landing.

---

## 2. Acceptance

| Criterion ([plan, Requirements](plan.md#requirements)) | Result |
|---|---|
| The new tool folder is saved and every file equals its pin | Met: `S1.save` saved 25 files and found the pin list's sha256, `60f5760b246ce9b5f1c692e63d72895774fdc86d32db2fad11ccb581877631bf`, to be the one it types; `STAGE S0.tools OK` followed at `S1.tools` (11:09:28Z) and again at `S4.tools` (11:35:31Z), each with every row of `tools.sums` and of `g27tools.sums` at its size and sha256. The folder's first save had five other pins and another pin list (deviation 1) |
| The self-test passes by test kind, with a total per kind | Met: each kind ended with its line of Appendix B: `gating` 84, `deterministic` 63, `component` 92, `integration` 579 and `nonfunctional` 28 checks, and `coverage` 7 checks after its note of 393 expectations and stops, each reached as a stop by a case of its own script and arm (479 distinct stop lines) (§3.2) |
| Every recorded gap and follow-up has its change and its case, and the earlier unit's consequences carry a dated note for each | Met: each of the 31 rows of [the closure table](plan.md#the-closure-table) names its file, its functions and its case labels, the cases are among those the kinds passed, and the coverage check found every expectation and stop reached. [The earlier unit's consequences](../../26-gkb2-gkb-rewrite/consequences.md) carry 31 dated notes, one per row, each worded from the row's note column |
| The three repositories are read and the parameter rows equal the data | Met: `STAGE S0.inputs OK` and `STAGE S0.repos OK` for BotTools and the private repositories at `S3` (11:34:39Z and 11:34:54Z) and again at `S4.records` (11:35:36Z and 11:35:40Z); the readings are in §3.3 |
| The earlier unit's tool folder equals its own pins before and after | Met: the typed check of `S0.g26` before the save and of `S4.g26` in the close-out found 21 of 21 pinned files equal to their pins and 22 files in the folder, and the reused tools and the runner equal to `g26/tools.sums` |

The plan's other goals: the four sets share one library, `g27lib.sh`; no script of the folder names a repository, an issue or a
branch, which a case of `gating` checks over every script and Python tool; the earlier unit's gaps are closed before the first push,
which no unit has yet made; after the landing the folder is fixed, under the rule of
[consequences §4](consequences.md#4-sibling-units-and-neighbouring-issues). Nothing sensitive is printed: the measured run's part of
the run log holds no drive-letter path, no 40-digit id and no `STOP` line (§3.4).

The landing's four document checks, `D.ids`, `D.paths`, `D.gate` and `D.scan`, run over the pending set, every file under `docs/`
that `git status` lists as modified or untracked, before the documents are committed; a hit is reworded and the check run again, so
the documents as committed are the ones last checked ([plan, The landing's document checks](plan.md#the-landings-document-checks)).

---

## 3. Measurements

### 3.1 The folder and the versions

- `S1.save`: 25 files saved under the workspace tools, and the pin list's sha256 the one the step types.
- `S1.tools`: 96 `ok` lines and `STAGE S0.tools OK`: the gitleaks binary reports its version; each of the 22 rows of `tools.sums`
  and of the 24 rows of `g27tools.sums` is in place at its recorded size and sha256; the folder holds exactly the files its pin list
  names, and the pin list; every saved shell script parses; every Python tool compiles.
- `S1.pins`: 7 `ok` lines and `STAGE S0.pins OK`: git, Python, gh, git-filter-repo with its module's sha256 and gitleaks at the
  versions the preparation unit recorded, and no gitleaks configuration in the environment.

### 3.2 The self-test

The kinds ran one after another, in the order of `S2`, each as a step of its own through the runner; `gating`, `integration` and
`nonfunctional` ran in the background (deviation 2). The runner's end lines carry no time, so each span below, from a kind's start
to the next step's start, is an upper bound of the kind's own run.

| Kind | Last line | Started | Span to the next step | Appendix B's recorded run |
|---|---|---|---|---|
| `gating` | `ok    gselftest gating: 84 checks passed` | 11:10:00Z | 1 min 35 s | 2 min 42 s |
| `deterministic` | `ok    gselftest deterministic: 63 checks passed` | 11:11:35Z | 14 s | 15 s |
| `component` | `ok    gselftest component: 92 checks passed` | 11:11:49Z | 33 s | 47 s |
| `integration` | `ok    gselftest integration: 579 checks passed` | 11:12:22Z | 19 min 17 s | 40 min 46 s |
| `nonfunctional` | `ok    gselftest nonfunctional: 28 checks passed` | 11:31:39Z | 2 min 48 s | 4 min 59 s |
| `coverage` | `ok    gselftest coverage: 7 checks passed`, after `note  coverage: 393 expectations and stops, each reached as a stop by a case of its own script and arm (479 distinct stop lines)` | 11:34:27Z | 12 s | 2 s |

- Every total is Appendix B's. Each kind's console holds its case lines (and `coverage`'s its note line) and nothing else, which the
  kind's last case asserts, and no case line appears twice in a kind.
- The five stamps hold one run id, the one `run-id.txt` holds, and the pin list's sha256 above.
- Each kind but `coverage` took less than its recorded time, and `coverage` took seconds: Appendix B's times are high figures, not
  bounds.

### 3.3 The three repositories read

**`S3.inputs`** (11:34:39Z): 62 `ok` lines and `STAGE S0.inputs OK`. For BotTools and the private repositories, in that order:

- the purge list's proofs against its row (9, 23 and 6 lines; 107, 241 and 50 bytes; its sha256) and its checksum as the data
  folder records it, after the data copy's own check;
- the mirror's and the backup's files equal to `backup.SHA256SUMS`;
- the earlier records in place, 5, 6 and 5, and equal to the checksums `records-at-s0.<repo>.sums` holds from the step's first run;
- the manifest holding the row's purged blobs, 39, 199 and 7,259, and BotTools' pinned manifest its 0;
- the listing taken at the clone holding the row's branches by name (2, 2 and 1) and pull-request refs (2, 0 and 0), with `HEAD` at
  the row's default branch, `main`;
- the preparation unit's script assigning no probes to BotTools or the second private repository, and the first private repository's nine control probes equal to the table's;
- the commits a fresh mirror will hold on every ref, derived from the untouched backup, equal to the table's: 28, 9 and 1.

**`S3.repos`** (11:34:54Z): 39 `ok` lines, 5 `RECORD` lines and `STAGE S0.repos OK`. For each repository:

- its id, its visibility (public, private and private), not archived, not a fork, default branch `main`, no Pages site, no forks,
  and secret scanning and push protection as the row's `scanning` says (`disabled` for BotTools, `absent` for the other two);
- its branches, by id and by name, the row's, none protected; no tag, release, key or workflow;
- no ruleset for BotTools; for the private repositories the rulesets read refused with HTTP 403 and GitHub's wording for a private
  repository on the free plan, recorded as a repository no ruleset can apply to (one `RECORD` line each);
- its webhooks the row's, 1, 0 and 0, and BotTools' deliveries listed, as a count and never a payload: the list is readable with the
  credential the run's `gh` uses, which is the read the parent design's
  [known gap on the deliveries endpoint](../consequences.md#5-known-gaps) waits on;
- the server's refs equal to the listing taken at the clone, merge refs left out;
- one `RECORD` line of its activity feed and events: entries 0, 0 and 0, events 0, 3 and 0. The rate limit is recorded beside them
  and never compared.

### 3.4 The close-out and the run's log

- `S4.g26`: the typed check of `S0.g26` again: 21 of 21 pinned files equal their pins, 22 files in the folder; the reused tools and
  the runner equal `g26/tools.sums`.
- `S4.tools` (11:35:31Z): the 96 `ok` lines of `S1.tools` and `STAGE S0.tools OK`.
- `S4.records`: `S3.inputs` again (11:35:36Z), each repository's earlier records equal to their first recording; `S3.repos` again
  (11:35:40Z), the same lines, with the same activity and event counts. The three `records-at-s0.<repo>.sums` keep their bytes and
  their times, and the three record folders stay empty.
- The measured run's part of the run log holds 1,304 lines: 13 runner start lines, each with plain-word arguments only, and 13 end
  lines, each `exit=0`; 1,260 `ok` lines; 7 `STAGE` lines; the one `note` line of `coverage`; and 10 `RECORD` lines, each one the
  plan expects: at each of the two reads of the repositories, the two refused rulesets reads and the three activity readings. It
  holds no `STOP`, `WAIT` or `NEXT` line, no drive-letter path and no 40-digit id.

---

## 4. Deviations from the plan

Each deviation names the section of [`plan.md`](plan.md) it departs from, why, and what that part of the plan rested on.

1. **The folder was first saved with comments in five files that did not describe their code, and was saved again at a new pin
   list.** [Plan, Appendix A](plan.md#appendix-a--the-tools) holds the header comments of [`p7-verify.sh`](plan.md#p7-verifysh),
   [`s0-ready.sh`](plan.md#s0-readysh), [`c1-close.sh`](plan.md#c1-closesh) and [`r1-close.sh`](plan.md#r1-closesh) and the comment on
   `pending` in [`gdocs.sh`](plan.md#gdocssh) as they now stand, and [Appendix B](plan.md#appendix-b--the-pins) and
   [`S1.save`](plan.md#s1--the-folder-saved) hold their pins. The folder's first save came from
   [the plan as it then stood](superseded/plan-2026-11-15.md), at pin list
   `5423a7048624350e599cbfa66b8ad5e25e291fabfa037e7f92c7687844aeb855`, and passed the same steps with the same totals and readings;
   its comments in those five places did not describe their code:
   - `p7-verify.sh`'s header said three things its code does not do:
     - that the push deliveries are counted "before any check that could stop". The step checks that step 6 passed and that its
       records are in place, the deliveries baseline among them, before it counts (the baseline's check runs on every run of the
       step, a kept count or not), and it counts before any check of what the push did;
     - that the archive state is as the row records. The row holds no archive state; the step checks that the repository is not
       archived;
     - in its "Writes:" clause, that the scratch files are written for a row with a webhook. They are written for every row.

     The header now says each as the code does it.
   - The comment on `gdocs.sh`'s `pending` said that the source a rename or a copy names is left out of the list of the documents
     because "it is no longer a file". That holds for a rename's source, and for a copy's when the same change also renames it. Any
     other copy's source is a file the change alters, which has an entry of its own, since git takes a copy's source only from the
     files the change alters. The comment now says so, and its synopsis names the function's `--sources` option.
   - The headers of `c1-close.sh` and `r1-close.sh` said that their reads find the archive state as the row says. Each checks that
     the repository is not archived; the row holds no archive state. `c1-close.sh`'s also said that the record folder's checksum list
     covers every file in the folder; it covers every other file under it. Both headers now say so.
   - `s0-ready.sh`'s header said four things its code does not do:
     - that every step only reads. `inputs` makes the unit's record folder, with its requests, replies and status folders, and writes
       the checksums of the earlier records there the first time it runs; every step writes scratch files. No step changes what it
       reads;
     - in `repos`, a list of fields that ended "as the row says". The id, the visibility, the default branch and the scanning
       settings are the row's; the archive state, the fork, the Pages site and the forks are checked against fixed answers: not
       archived, not a fork, no Pages site, no forks;
     - in `repos`, that the rulesets are read as none and the deliveries listed "for one". A private repository on the free plan
       refuses the rulesets read, which is recorded as no ruleset applying to it; the first webhook's deliveries are listed where the
       row has webhooks; and the server's refs are compared with merge refs left out;
     - in its "Writes:" clause, that `inputs` writes nothing outside the scratch folder but the checksums. It also makes the record
       folder with its three folders.

     The header now says each as the code does it.

   Only comment lines changed: no code line, no case of the self-test, and none of the 393 expectations and stops the coverage check
   reads, which are the same from both saves. The pins of the five files:

   | File | Bytes | sha256 |
   |---|---|---|
   | `p7-verify.sh` | 4,808 | `98fd47c31d619e2f76f9b530e39f551fa94a11de1122e54fe807e7123f7dca11` |
   | `gdocs.sh` | 5,865 | `d520528daf8894e5feb94d235ef8e59de8183e9b1ebaf4d58e70bc974589556a` |
   | `s0-ready.sh` | 14,798 | `b195ad5aafb6e260afee138b12138e1fdb0b48fe63722578db99e647185773a4` |
   | `c1-close.sh` | 4,802 | `b6a197c2387ead0fab50185357a5bdf6014b7838a7e6244df1cef4008025c2cf` |
   | `r1-close.sh` | 5,828 | `50af940dcecd56eb1d8cb5362ddb899eeca36a90b1c036340e9b51b2edb3d0ee` |

   The pin list's sha256 is `60f5760b246ce9b5f1c692e63d72895774fdc86d32db2fad11ccb581877631bf`, and the other 19 files kept their
   pins. `S1.save` saved the folder again from the revised Appendix A, and the steps that follow the save ran again, as
   [Procedure, "When the steps run again over an earlier run's state"](plan.md#when-the-steps-run-again-over-an-earlier-runs-state)
   lists them, every kind of the self-test among them, since each kind stamps its collections with the pin list's sha256 and
   `nonfunctional` and `coverage` refuse a stamp over other tool bytes. That run is the one §3 measures: no `STOP`, `WAIT` or `NEXT`,
   every total Appendix B's, and the earlier records equal to their first recording.

   The comments rest on [architecture §7.1](../architecture.md#71-the-folder), the folder saved from the plan, which holds every
   file's source and pin, and on [§7.4](../architecture.md#74-the-recorded-gaps), the documentation points written into each file
   with its header and its line comments.
2. **`gating` ran in the background.** [Plan, Procedure, Conventions, "Timeouts"](plan.md#conventions) runs a call in the foreground
   with a 10-minute timeout, except the `integration` and `nonfunctional` kinds, which run in the background and are read from
   `as-run.log` when they end, and says that a busy machine may need `gating` in the background too. `gating` ran in the background,
   with those two kinds, and the three were read from the runner's captured output, which holds the lines the run log holds. Running
   a kind in the background lifts only the call's timeout: the kind's lines, its total and its stamp are the same either way (§3.2).
   No research finding or section of the parent design bears on how a call is run.
