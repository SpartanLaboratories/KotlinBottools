# Phase 0 · 6 — Rewriting GKB2 and GKB: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#26](https://github.com/SpartanLaboratories/KotlinBottools/issues/26),
  *"Phase 0 · 6 — Rewrite GKB2 and GKB"*, a sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **Plan:** [`plan.md`](plan.md), the procedure this record is measured against. **Parent design:** unit `gkb2-gkb-rewrite` of
  [`../architecture.md`](../architecture.md), §6.4, §6.6, §8, §11, §12.4 and §15.
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the known gaps, the outcome of each of
  the plan's assumptions, and the follow-ups.
- **What this document is:** what the unit built and what it measured, in results, counts, statuses and fixed markers, and every
  departure from the plan.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every time below is UTC. The run went once from `S0` to
`S3`: from the runner's replacement at 2026-11-13T05:44:39Z to the close-out's records, begun at 06:35:38Z. It met no `STOP`, no
`WAIT` and no `NEXT`.

---

## 1. What was built

- **On GitHub,** the unit's two writes: `master` of `SpartanLaboratories/GKB2` (id 677585353) and `master` of
  `SpartanLaboratories/GKB` (id 618954937) each hold their rewritten history, each placed by one forced update made only while the
  branch was at the tip the clone recorded. Nothing else changed: each repository holds its one branch and no tag, GKB2's
  `refs/pull/6/head` is as recorded, both are public and not archived with `master` as their default branch, and no issue, comment,
  label or setting was written.
- **The tools,** the 22 files of [the plan's Appendix A](plan.md#appendix-a--the-tools), saved to `WS/tools/g26/` and each equal to
  its pin in [Appendix B](plan.md#appendix-b--the-pins): 18 scripts (17 shell, 1 Python) and 4 data files. The phase's stage runner,
  `WS/tools/run-stage.sh`, is the corrected one, 1,428 bytes, sha256 `9cdb381040caf266bb61576536a9cc45436f031fa797fd9358a041249909c428`,
  in place of the preparation unit's 470-byte original; its start lines show plain-word arguments only.
- **The records** in `DATA/rewrite/GKB2/`, `DATA/rewrite/GKB/` and `DATA/run/g26/`, with their checksum lists (`g26.SHA256SUMS` in
  each repository's folder, `SHA256SUMS` over the 33 run records), beside the preparation unit's six records of each repository,
  which are unchanged. Each repository's report row is its `report-row.txt`.
- **This checkout** changes only by the landing.

---

## 2. Acceptance

| Criterion ([plan, Requirements](plan.md#requirements)) | Result |
|---|---|
| GKB2 and GKB each have every branch and tag clean on a fresh mirror | Met: `STAGE GKB2.p8 OK` and `STAGE GKB.p8 OK`. On each fresh mirror the heads are the rewritten tips, there is no tag, the expectation check passes on branches and tags, no manifest blob is reachable from a branch or tag, and the gitleaks scan of branches and tags reads `RESULT: CLEAN` (§3.4) |
| Every count equals its expectation | Met: every row of [the plan's Expected values](plan.md#expected-values), for both repositories, on the rewritten mirror and on the fresh mirror, the bound on the largest blob included (§3.2 to §3.5) |
| GKB2's pull-request residual is counted and recorded | Met: 70 of the 81 manifest blobs stay reachable through `refs/pull/6/head`, 11 are missing, 281 distinct blobs are reachable from every ref (§3.4), in `residual.txt` and the report row |
| Any default-rule finding is recorded as a follow-up | Met: there was none, in the scan before either push or on either fresh mirror (§3.2, §3.4) |
| Each push was verified by reading it back | Met: `CLASS pushed` with the read-back "new tip, pull-request refs unchanged", then the two channels of the per-ref verification (§3.3) |

The plan's other goals: the push was conditional and singular (§3.3); what GitHub still serves is measured in counts (§3.5); the
start lines of this unit's runs in the run's log show no argument that can be a path, being the corrected runner's (§1), and what
the log keeps from the earlier units' runs is a known gap ([consequences §5](consequences.md#5-known-gaps)); the tools take a
repository's name and read the parameter table, with two exceptions (deviation 7). Nothing sensitive is kept outside the data folder
and the workspace, neither of which is committed; the run's log in the data folder holds 7 lines that name a machine-local path
(deviations 3 and 6).

The landing's four document checks, `D.ids`, `D.paths`, `D.gate` and `D.scan`, run over the pending set, every file under `docs/` that
`git status` lists as modified or untracked ([plan, The landing's document checks](plan.md#the-landings-document-checks)). Each run
covered the pending set as it then stood, and both passed: at 07:37Z, 15 files, the plan, the consequences and this record as they then
stood, and the boards as then generated; at 08:20Z, 15 files, the three documents as the commit "docs(plans): GKB2 and GKB rewrite
unit plan, consequences and as-built record (#26)" holds them, and the boards as then generated. By the plan the checks run over the
pending set before the documents are committed, so the documents as committed are the ones last checked.

---

## 3. Measurements

### 3.1 Readiness

- `S0.save` saved the 22 files. `S0.runner` found the runner in place to be the recorded original, replaced it and found the new pin.
- `S0.tools`: 46 `ok` lines, for the 21 reused files, the 21 saved files, the configuration's size and sha256, the binary's version and
  the two parse checks.
- `S0.pins`: 7 `ok` lines: git 2.55.0.windows.5, Python 3.14.7, gh 2.100.0, git-filter-repo `a40bce548d2c` with its module's sha256,
  gitleaks 8.30.1, and no gitleaks configuration in the environment.
- `S0.inputs`: 40 `ok` lines: both lists, mirrors and backups as recorded; the checksums of the six earlier records recorded; the
  manifests of 81 and 58 blobs, GKB2's pinned manifest of 11; the clone listings of 1 head and 1 pull-request ref (GKB2) and of 1
  head (GKB); the control probes equal the preparation unit's; every-ref commits 45 and 9, as derived from the backups.
- `S0.repos`: 22 `ok` lines and 2 `RECORD` lines: activity feeds of 19 and 9 entries, no events, 4,981 and 4,971 calls left of the
  authenticated core limit.
- `S0.grant`: 8 `ok` lines and the `RECORD` line of a differing wording (deviation 1).
- `S0.selftest`: `g26_req.py`'s own self-test, 59 checks, and `ok    gselftest: 132 checks passed`. The self-test ran from 05:46:22Z;
  the next step started at 05:53:58Z.

### 3.2 The rewrites

| | GKB2 | GKB |
|---|---:|---:|
| Commits before (T), pruned (P), after | 32, 2, 30 | 11, 2, 9 |
| Refs in the mirror | 2 | 1 |
| Paths kept, blobs kept | 82, 211 | 60, 113 |
| Largest blob in bytes, against its bound of 60,756; binary files other than the Gradle wrapper jar; the wrapper jar, as `expect_check.py` reads them on the rewritten mirror and again on the fresh mirror | 60,756; 0; 1 | 60,756; 0; 1 |
| Manifest blobs, every one missing from the rewritten mirror | 81 | 58 |
| Positive control on the untouched backup: commits scanned, findings | 31, 79 | 10, 59 |
| Scan before the push, branches and tags: commits scanned, findings | 30, 0 | 9, 0 |

- The positive control's scan, control file and kept-findings file equal the preparation unit's records line for line, with
  `CONTROL OK` and `total_kept=0`, for both repositories.
- Each invocation reported `You rewrote 32 (of 32)` and `You rewrote 11 (of 11)`; `expect_check.py` reads `RESULT: PASS` on each
  rewritten mirror; each repository's outputs carry a 13-file checksum list.
- The scan before each push reads `RESULT: CLEAN`.

### 3.3 The pushes

| | GKB2 | GKB |
|---|---|---|
| Local pull-request refs deleted; pull-request refs on the server, recorded | 1; 1 | 0; 0 |
| The request built (`PROCEED`) | 05:55:14Z, attempt 1 | 06:22:42Z, attempt 1 |
| Carried out | as attempt 2 (deviation 4); its reply stored at 06:17:12Z | on its first attempt; its reply stored at 06:25:32Z |
| The stored reply | 11 lines after its status header (deviation 5) | 11 lines after its status header |
| The class | `CLASS pushed stage=push push_rc=0 dry_rc=0 tally_ok=1 same_flags=1 porcelain_lines=1`, every marker count 0 | the same |
| The read-back | the branch at its new tip, the pull-request refs unchanged | the same |
| Per-ref verification | 1 head, rewritten, on both channels; 1 pull-request ref, as recorded; `master`, public, not archived | 1 head, rewritten; no pull-request ref; `master`, public, not archived |

- The expected tally of each dry run and each push: `forced=1 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0 done=1
  pull_lines=0 other_refs=0 bad=0`; each request carried its six entries out once, as one shell, with status 0 (deviation 9).
- The activity feed after the run: GKB2's holds 20 entries with exactly 1 forced update, GKB's 10 with exactly 1.

### 3.4 The exit tests

| | GKB2 | GKB |
|---|---|---|
| Commits on every ref of the fresh mirror | 45 (the 30 rewritten and the 15 that only the pull-request ref reaches) | 9 |
| `expect_check.py --scope heads` | `RESULT: PASS` | `RESULT: PASS` |
| Manifest blobs reachable from branches and tags | 0 | 0 |
| Manifest blobs reachable from every ref; missing; distinct blobs on every ref | 70; 11; 281 | 0; 58; 113 |
| gitleaks, branches and tags: commits scanned, findings | 30, 0, `RESULT: CLEAN` | 9, 0, `RESULT: CLEAN` |
| gitleaks, every ref: commits scanned, findings | 45, 66, `RESULT: FINDINGS` | 9, 0, `RESULT: CLEAN` |
| Default-rule findings in kept files | none | none |

GKB2's every-ref findings lie in the old history that only its pull-request ref reaches, the branches being clean: by rule
`bare-token-file` 1 in 1 file, `discord-bot-token` 2 in 2, `legacy-bot-data-file` 47 in 31, `legacy-key-file` 1 in 1 and
`legacy-state-directory` 15 in 7.

### 3.5 What GitHub still serves

The sets, per repository: 1 old tip, 1 first-changed commit, 2 old trees, and a sample of 41 of GKB2's 81 manifest blobs and all
58 of GKB's; the anonymous REST samples, 7 ids.

| Route | GKB2: served | GKB: served |
|---|---|---|
| Authenticated REST: commits, trees, blobs | 2, 2, 41 | 2, 2, 58 |
| Authenticated protocol-v2 `want` of the old tip | 1 | 1 |
| Anonymous web commit route | 2 | 2 |
| Anonymous `want`: commits, trees, blobs | 2, 2, 41 | 2, 2, 58 |
| Anonymous REST: commits, trees, blobs | 2, 2, 3 | 2, 2, 3 |

- Every old id probed is served, on every route; every batch's controls answered as expected; the answers other than the expected ones
  are 0 for each repository.
- **The feeds,** on the first and the second read: the activity feed lists 18 pre-rewrite ids and 1 current id for GKB2, and 9 and 1
  for GKB, on each of its three reads (authenticated, anonymous, the web page); the events list nothing on either read, authenticated
  or anonymous, so those reads count as not valid. Anonymous reads valid: 2 of 3, on every read.
- **The anonymous REST budget** read 60 before each repository's step 9, the second reading eight minutes after the first, and 18 and
  16 before the two second feed reads. Each step 9 made 21 anonymous REST calls and each second feed read 2; the last call left 14.
  Where the readings and the calls disagree is a known gap ([consequences §5](consequences.md#5-known-gaps)).

### 3.6 The close-out and the run's log

- `S3.feeds` made the second reads from 06:29:53Z. `S3.reads`: each branch at its rewritten tip, no tag, the pull-request refs as
  recorded, public, not archived, default branch `master`; the preparation unit's six records of each repository as at `S0`.
  `S3.record` appended the 5 lines of second reads to each report row and wrote the checksum lists.
- The unit's part of the run log holds no `STOP`, `WAIT` or `NEXT` line, and 12 `RECORD` lines, each one the plan expects: the
  repositories' state at `S0.repos` (2), the grant's wording (1), the kept findings as recorded (2), GKB2's every-ref scan (1), the
  probe sets (2), the valid feed reads (2) and the second feed reads (2). It holds no 40-digit id and 7 lines that name a machine-local
  path (deviations 3 and 6).

---

## 4. Deviations from the plan

Each deviation names the section of [`plan.md`](plan.md) it departs from, why, and what that part of the plan rested on.

1. **`S0.grant` prints eight `ok` lines and one `RECORD` line.** [Plan, Procedure, "S0 — Readiness", `S0.grant`](plan.md#s0--readiness)
   expects eight `ok` lines, or seven and a `RECORD` line. The tool (`s0-ready.sh`, step `grant`, Appendix A) makes eight checks
   before it compares the wording, so its output is nine `ok` lines, or eight and a `RECORD` line. The step ended with status 0 and
   `STAGE S0.grant OK`. The `RECORD` line is the plan's own case of a wording that differs: the section in place holds the plan's
   five lines and one further line, and its actions, issue, branch, targets and end are as the plan needs. The step rests on
   [architecture §11](../architecture.md#11-version-control): a write is a request, made under the grant for its job.
2. **The request-written line carries the request's key.** [Plan, Procedure, "Steps 1 to 9 of a repository", `S?.5`](plan.md#steps-1-to-9-of-a-repository)
   expects `ok    request written: requests/push-<repo>.json (6 commands, …)`. The tool (`g26_req.py`, `cmd_build`, Appendix A) prints
   `(key push-<repo>, 6 commands, expected tally …)`. Seen at `S1.5` and at `S2.5`, and again where each request step rebuilds the
   file, at `S1.6.request` and `S2.6.request` (4 lines in all). Each step ended with status 0 and its closing line. The step rests on
   [architecture §6.4, stage 6](../architecture.md#64-the-rewrite-pipeline-per-repository).
3. **The first `request` of a repository prints two shell error lines that name files of the data folder.**
   [Plan, Design, "The output rule"](plan.md#the-output-rule) and Requirements, goal 7, say no machine-local path is printed. In
   `p6-push.sh`, step `request` (Appendix A), the two reads of the class file and the key file of the last attempt redirect standard
   input from a file that does not exist before the first attempt; the shell reports each failed redirection itself, with the file's
   path, before the command's own `2> /dev/null` applies. The two lines reach the console and the run log in the data folder, which is
   never committed. The step's result is unaffected: both values are empty, as a first send needs, and the step printed its `PROCEED`
   line with status 0. Seen at `S1.6.request` and at `S2.6.request` (2 lines each). The rule rests on
   [architecture §1.1, item 9](../architecture.md#11-what-the-phase-must-achieve).
4. **GKB2's push request was run under one id as two attempts, and its one reply reports attempt 2.**
   [Plan, Design, "The requests"](plan.md#the-requests) has `attempt` as the number of stored replies plus one, and names no rerun by
   the request service of a request it had not carried out. The request was sent once, as attempt 1, the `PROCEED` line's number. That
   attempt was not carried out: the request service's one shell call was refused before any entry of the procedure started, by one of
   the request service's own checks, not by the deny rule the grant decides, so no guard, dry run or push ran, nothing was printed and
   none of the four stream files was created; a read-back showed `master` still at its old tip. Its answer was of the kind the plan
   does not store. Once the cause was removed, which took a restart of the request service, the service ran the same request again
   itself, under the same id, as attempt 2; nothing was sent a second time. That run carried out the six entries once, with status 0.
   The key therefore has one reply, which reports attempt 2 where the `PROCEED` line said attempt 1. GKB's request was carried out on
   its first attempt.

   Where the evidence is: the read-back after the first attempt (`master` at its old tip, none of the four stream files present) was
   made directly against the remote and the record folder at 2026-11-13T06:01:41Z, outside the runner, so the run log does not hold
   it. The run holds the equivalent evidence. The stored reply of attempt 2 carries the third guard's marker,
   `SERVER-HEADS-AND-TAGS-ARE-THE-OLD-COLUMN`, printed before its push: the server's heads and tags still equalled the old column
   when attempt 2 started. And the repository's activity feed, 19 entries at `S0.repos`, holds 20 entries with exactly 1 forced
   update, as read after the close-out (GKB: 9 entries, then 10 with exactly 1). The request rests on
   [architecture §11](../architecture.md#11-version-control) and the rule of [§8](../architecture.md#8-end-to-end-order-gates-and-failure-behaviour)
   that a push is never repeated blindly.
5. **What is stored as a reply is the reply's printed lines, one per line.**
   [Plan, Procedure, Conventions, "A request STEP", item 3](plan.md#conventions) has the reply text pasted into the heredoc. The reply
   arrives as one document that holds the procedure's printed lines as list entries on a single line, and the classifier
   (`g26_req.py`, `parse_rc`, Appendix A) reads a status line (`dry rc=<n>`, `push rc=<n>`) only where it starts a line: on the
   document as received it finds neither status, which it classes as `stopped-by-guard`. By the owner's decision, made on
   2026-11-13, the stored text is the reply's printed lines alone, in order, one per line, nothing added or dropped, for both
   repositories. Each stored reply holds 11 lines after its status header, GKB2's and GKB's alike, with no id of a history and no
   path. The reply's envelope, its id and attempt, is in deviation 4. With that text `S1.6.check` and `S2.6.check` each printed the
   plan's expected `CLASS pushed` line and their `STAGE` line. What the delivered form would do to the classifier is a known gap
   ([consequences §5](consequences.md#5-known-gaps)). The classifier rests on
   [the research's recommendation](research/force-push-and-push-protection.md#6-recommendation-for-this-repository): an outcome read
   from statuses and counted markers, never from the text of a stream.
6. **A passing self-test prints an eight-line traceback, three lines of which carry a machine-local path.**
   [Plan, Design, "The output rule"](plan.md#the-output-rule) and Requirements, goal 7, say no machine-local path is printed. In
   `gselftest.sh` (Appendix A), where it prepares the made-up checkout for the landing's document checks, the first call of
   `scrub_expressions.py` runs before the folder of its output file exists, and only its standard output is discarded: the tool ends
   with a traceback on standard error, and the alternative branch then makes the folder and runs the tool again, which succeeds. It
   happens by construction, on every run. The eight lines reach the console and the run log in the data folder, which is never
   committed; three of them carry a path of the self-test's sandbox under the workspace. The self-test's result is unaffected: it
   ended with `ok    gselftest: 132 checks passed` and status 0. This unit's part of the run log holds 7 path-carrying lines in all,
   the 4 of deviation 3 and these 3, and no forty-digit id. The rule rests on
   [architecture §1.1, item 9](../architecture.md#11-what-the-phase-must-achieve).
7. **Two scripts besides the parameter table name the repositories.** [Plan, Design, "The tools"](plan.md#the-tools) says no script
   but the parameter table names GKB2 or GKB. `s0-ready.sh`, step `grant` (Appendix A), holds both target names in its check that the
   grant's scope names both targets. `gselftest.sh` (Appendix A) selects the parameter table's two rows by those names to take the
   probe arguments of its fixtures, and names one target where it makes the grant's text lack it. Two header comments name them as
   well (`p7-verify.sh`, `g26_req.py`). Every step script takes the repository as its argument, as the plan says. The table rests on
   [architecture §13](../architecture.md#13-extension-and-stability): policy is a file or a constant, never inline in a command.
8. **The run records hold each request's key file.** [Plan, Design, "Records and where they live"](plan.md#records-and-where-they-live)
   lists the contents of the run-record folder without `push-<repo>.key`. `p6-push.sh`, step `request` (Appendix A), writes that file,
   the key of the last request, and `S3.record` checksums it: 2 of the 33 run records. The list rests on
   [architecture §5.1](../architecture.md#51-userprofilebotlegacydata--the-data-folder-data-outlives-the-phase).
9. **Each request's procedure ran as one shell.** The self-test's stand-in for the request service (`gselftest.sh`, `run_proc`,
   Appendix A), on which the component self-test of [the Test plan](plan.md#test-plan) rests, carries each of the six entries out in
   a shell of its own. Each of the two requests was carried out as six entries in one shell, once, with status 0, as its reply
   reported. That is what each request asked for: its note named the one shell (deviation 10). The result is the same: every entry
   sets what it uses, as [Design, "The requests"](plan.md#the-requests) requires of the procedure, and every guard ends the shell,
   so no later entry runs after a guard's stop either way. The procedure rests on
   [architecture §11](../architecture.md#11-version-control).
10. **Each push request was sent as a reference to its request file, not as the file's contents.**
    [Plan, Design, "The requests"](plan.md#the-requests) has the file's contents sent as one request, and its field table holds no
    file, hash or note field; [Procedure, Conventions, "A request STEP", item 2](plan.md#conventions) says the same of the send. After
    each `PROCEED` line, the request file's path, size and sha256 were handed to the run, which compared the sha256 with the file
    before it sent the request. Each of the two requests carried `action`, `github`, `issue`, `mirror`, `permissionReason` and
    `target`, the request file's absolute path, the file's sha256 and a note, and no `procedure`, `inputs` or `checks` of its own. The
    request service compared the hash with the file and ran the file's procedure. The note asked that the six entries be run as one
    shell, unchanged and in order, in a single call, and that every printed line be given in the reply. The hash sent equals the
    request file as it stands for both repositories: GKB2's file holds 9,199 bytes and GKB's 9,154, and each file's sha256 is also the
    one the run records' checksum list holds for it. The reason: the file reaches the request service byte for byte, with nothing
    transcribed. The send rests on [architecture §11](../architecture.md#11-version-control), which carries a dated note on it.

    The request flow as built, with what deviations 4, 5 and 9 record. It stands beside the sequence diagram of
    [Design, "The push"](plan.md#the-push), which shows the file's contents being sent and draws the run and the request service as
    one lifeline:

    ```mermaid
    sequenceDiagram
        participant I as Implementer
        participant T as p6-push.sh and g26_req.py
        participant R as The run
        participant S as The request service
        participant G as GitHub
        I->>T: request
        T->>G: reads: the branch, the pull-request refs
        T-->>I: PROCEED, the request file rebuilt
        I-->>R: the PROCEED line, the request file's path, size and sha256
        R->>R: compares the sha256 with the file
        R->>S: the request: a reference to the file, the file's sha256, a note (one shell, every printed line in the reply)
        opt GKB2 only: attempt 1
            Note over S: not carried out: nothing run, nothing printed, no stream file
            S-->>R: an answer of the kind that is not stored
            R->>G: read-back: master at its old tip
            Note over S: the cause removed: the same request again, same id, attempt 2
        end
        S->>S: compares the hash with the file
        S->>G: the file's six entries as one shell: four guards, the dry run, the push under the lease
        G-->>S: one forced update of master
        S-->>R: reply done, with the printed lines
        R-->>I: the reply
        I->>T: reply done: the printed lines, one per line
        I->>T: check
        T->>G: reads: the branch, the pull-request refs
        T-->>I: CLASS pushed, read-back, STAGE OK
    ```
11. **The request file carries a top-level `expectedTally` field.** The field table of
    [Plan, Design, "The requests"](plan.md#the-requests) lists `expectedTally` only inside `inputs`. The tool (`g26_req.py`,
    `build_request`, Appendix A) writes it at the top level as well, and its own self-test asserts the ten fields in their order.
    Both request files hold ten fields, the two copies of the tally equal in each. The file is the tool's as saved; the table is
    one field short of it. The field rests on [architecture §6.4, stage 6](../architecture.md#64-the-rewrite-pipeline-per-repository):
    the push is requested with its expected tally.
12. **A request carries machine-local paths.** [Plan, Design, "The output rule"](plan.md#the-output-rule) names a machine-local
    path among what is never printed or quoted in a console line, a document or a request. By the plan's own design a request holds
    them: the field table's `mirror` is the mirror's path, and the procedure (`g26_req.py`, `build_procedure`, Appendix A) names
    paths under the mirror, the record folder and the tools folder, because each entry must say where it runs and what it reads. As
    sent, each request also carried its request file's path (deviation 10). What holds for a request: it carries no id of a history
    (no forty-digit id in either request file), no line of a push's or a scan's streams and no secret; the request file stays in the
    data folder, the request goes to the request service alone, and neither is in a committed file, as
    [Design, "Records and where they live"](plan.md#records-and-where-they-live) says of the run records. The rule rests on
    [architecture §1.1, item 9](../architecture.md#11-what-the-phase-must-achieve) and on
    [§5.1](../architecture.md#51-userprofilebotlegacydata--the-data-folder-data-outlives-the-phase), whose folder is never committed.
13. **The class `stopped-by-guard` is given only to a reply that holds neither status.** The class table of
    [Plan, Design, "The push"](plan.md#the-push) gives it to a procedure that stopped on a guard, with no push status, and allows a
    resend from it. The tool as saved (`g26_req.py`, `cmd_classify` and `classify`, Appendix A) reads statuses by stage:
    - a reply stored as `refused` is `refused-by-service`, whatever statuses it holds;
    - any other reply with neither a dry-run status nor a push status is `stopped-by-guard`: the guards of the first four entries,
      and the fifth entry's guard before its dry run;
    - any other reply with a push status is classed from the push's status and streams;
    - any other reply with a dry-run status and no push status is classed from the dry run's status and streams. A lost connection
      at the dry run (status 128, no porcelain line) is `transport`, a status 1 takes the marker rules on the dry run's streams, and
      a guard's stop in the sixth entry after a passing dry run (status 0) is `unclassified`, which hands back where the table's row
      allows a resend.

    This is read from the tool's text, not from a run: neither request of this unit stopped on a guard. The difference errs toward
    a stop, never toward a push repeated. The class table rests on
    [the research's recommendation](research/force-push-and-push-protection.md#6-recommendation-for-this-repository).
14. **The flowchart's step-6 edges show fewer resends than the class table and the tool allow.** The flowchart of
    [Plan, Design, "Shape of the procedure"](plan.md#shape-of-the-procedure) draws a resend only for `transport` with the branch at
    its old tip, and a failed guard only as a hand-back. The class table of [Design, "The push"](plan.md#the-push), the text
    beneath it and the tool (`p6-push.sh`, step `request`, Appendix A) also allow a resend after `stopped-by-guard` and after
    `refused-by-service`, each with the branch at its old tip and the pull-request refs unchanged. The tool follows the class
    table. No resend was needed in this unit: each push was classed `pushed` from its one stored reply. The resend rules rest on
    [the research's recommendation](research/force-push-and-push-protection.md#6-recommendation-for-this-repository) and on
    [architecture §8](../architecture.md#8-end-to-end-order-gates-and-failure-behaviour).
15. **The ring map places the probe route rules in the wrong file and leaves the tools' own in-editor ring out.**
    [Plan, Documentation impact](plan.md#documentation-impact) puts the anonymous probe rules in `ganon.sh` on its boundary row, and
    says the in-editor ring does not move because no Kotlin code changes, without a word on line comments. As built:
    - the route rules, shared by the authenticated and the anonymous probes, are in `g26lib.sh` (`classify`, `want_probe`), as
      `ganon.sh`'s own header says; `ganon.sh` holds the anonymous calls, the budget read and the feed reads;
    - the unit adds the tool files of §1, and the in-editor ring and line comments apply to their scripts: each carries a header
      comment and line comments on some of its steps; `g26_req.py` holds 1 region (its self-test), and the shell scripts hold none,
      five of them carrying `# ---` section comments, which do not fold (`gselftest.sh` 13, `p9-residual.sh` 4, `g26lib.sh` 2,
      `p8-exit.sh` 2, `p4-postrun.sh` 1). None of the tool files is in a repository; they are saved to the workspace from Appendix A.

    No research finding or section of the parent design bears on the ring map; the route rules it places come from
    [the publication unit's research summary, §2](../25-kotlinbottools-publish/research/README.md#2-the-anonymous-measurements-and-the-access-check).
16. **The documents are committed in more steps than the plan names.** [Plan, Version control](plan.md#version-control) names three
    commits in the one landing: the unit's plan, consequences and as-built record; the dated notes on the parent design and on the
    earlier units' consequences; the regenerated boards. As built, the three documents were committed first, as they stood after the
    run, in the commit "docs(plans): GKB2 and GKB rewrite unit plan, consequences and as-built record (#26)"; their final form,
    the dated notes and the regenerated boards follow it. The landing is still the one pull request, closing #26 only. The landing
    rests on [architecture §11](../architecture.md#11-version-control).
