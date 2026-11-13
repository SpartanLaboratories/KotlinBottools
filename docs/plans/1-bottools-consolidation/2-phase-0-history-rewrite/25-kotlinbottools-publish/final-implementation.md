# Phase 0 · 5 — Making KotlinBottools public: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#25](https://github.com/SpartanLaboratories/KotlinBottools/issues/25),
  *"Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection"*, a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **Plan:** [`plan.md`](plan.md). The build worked first to two earlier versions of it:
  [`superseded/plan-1-2026-11-12.md`](superseded/plan-1-2026-11-12.md), from readiness to the id check and the runs (S1 to S6), and
  [`superseded/plan-2-2026-11-12.md`](superseded/plan-2-2026-11-12.md), from the pre-flip gate to the close (S7 to S11). The current
  plan holds the landing's reads (S12). **Parent design:** unit `kotlinbottools-publish` of
  [`../architecture.md`](../architecture.md), §6.5, §6.6, §7.5, §7.6 and §15.
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the known gaps, the outcome of each of
  the plan's assumptions, and the follow-ups.
- **What this document is:** what the unit built and what it measured, in results and counts. Times are UTC, on 2026-11-12 unless a
  date is given; a time marked "stamp" is from the run's record of times, the others were read from the clock when the step ended.

---

## 1. What was built

- **The bodies of issues #1 to #19,** edited by nineteen requests, each sent once:
  - the 39 links to the deleted planning branch point at `main`, #1's link to the initiative's former impact document pointing at
    its consequences document;
  - #1's clause about the planning branch and #2's plan-folder line are corrected;
  - each body equals its intended text byte for byte, with its parent, sub-issue, "blocked by" and "blocking" edges unchanged;
  - no occurrence of the planning branch's name is left in the bodies.
- **KotlinBottools is public,** read back at 23:17:54Z (stamp).
- **Secret scanning and push protection are enabled,** by one request, read back at 23:19:08Z (stamp). Generic patterns and
  validity checks read `disabled`, and AI detection and advanced security are absent. The two ordered scanning requests and the
  request that would make the repository private again were not sent.
- **No file of the repository's source, tests, build or configuration changed.** There is no README change, no CHANGELOG entry and
  no version.
- **The unit's tools and records stay on this machine.** The seven tools and three data files are saved in the workspace's
  `tools/p25/` at their pinned bytes, and the procedure's blocks in the workspace's scratch folder. The run's records are in the
  data folder's `run/publish/`, with a checksum list over its `record/` folder, and S12's reads are kept in `run/publish/landing/`.
  Nothing of them is committed.

---

## 2. Acceptance

**The issue's criteria.**

| Criterion | Result |
|---|---|
| KotlinBottools is public with secret scanning and push protection enabled, verified | Met: the visibility read-back is `public false`, the scanning read-back is `enabled enabled disabled disabled absent absent` (§3.4), and the access check has 0 deviations in each half (§3.6) |
| Every pre-rewrite id answers "not found" against it, anonymously | Met for what was probed: all 87 pre-rewrite commits are absent on the web route and on the protocol-v2 `want` route, and the old trees, the purged-blob sample and the REST sample are absent, every batch between controls that answered (§3.5) |
| Its activity feed holds no pre-rewrite id | Met: nine feed reads (three feeds, read three times) list 0 old ids and a current id each; the read past the feeds' caches is the third (§3.7, §4.4) |

**The plan's requirements.**

| Requirement ([plan](plan.md#requirements)) | Result |
|---|---|
| R1, one continuous procedure | Met, with the change 58 minutes after the pre-flip gate (§4.3) |
| R2, every write a request | Met: 19 body edits, the change to public and one scanning request; no other write |
| R3, the issue-body edits before Gate 3 | Met (§3.2); the comment on #1 holds a mention of the branch's name, not a link (§4.2) |
| R4, Gate 3 | Met (§3.3) |
| R5, the id-reference check | Met: every result the expected one (§3.3) |
| R6, the secret-scan run on `main` | Met: the latest push run on `main` passed at its head, and every run's log reads the fixed shapes (§3.3) |
| R7, the pre-flip gate | Met at 22:19:34Z; the change came 58 minutes later (§4.3) |
| R8, the change and the scanning settings | Met: 74 s between the two read-backs (§3.4) |
| R9, the alert reads | Met: three reads, 0 alerts in each (§3.4, §3.6, §3.7) |
| R10, the anonymous measurements | Met: every probe absent, every feed read without an old id; the second feed read fell inside the events feed's cache, and the third is the read past it (§3.5, §3.7, §4.4) |
| R11, the access check | Met: 0 deviations in each half (§3.6) |
| R12, the record | Met: the row for the residual report and the counts, with a checksum list over the record's 11 files, which still verifies after the landing's reads |
| R13, the unit's documents gated before their commit | Met: the documents' gate before the document commit (§3.7) |
| R14, the output rule | Met by the records, which hold counts, statuses, setting values and fixed markers only |

---

## 3. Measurements

### 3.1 Readiness and the saved tools

- **Under the plan's first version** ([`superseded/plan-1-2026-11-12.md`](superseded/plan-1-2026-11-12.md)): S1 printed 84 `ok`
  lines, `S1.save` 2, `S1.tools` 25, `S1.selftests` 22, `S1.grant` 8, `S1.state` 19 and `S1.ids` 8.
- **Under its second version, from the pre-flip gate to the close**
  ([`superseded/plan-2-2026-11-12.md`](superseded/plan-2-2026-11-12.md)): `S1.save` 2, `S1.tools` 25, then `S7.reads` 11, `S7.sets`
  6, `S7.anon` 4 and `S7.drift` 8.
- **Under the current plan, for the landing's reads:** `S1.save` 2 (10 files and 43 blocks) and `S1.tools` 25.
- From S7 on, the tools in use were the ones saved again, equal to their pins. These result lines went to the console and are not
  kept ([consequences, §5](consequences.md#5-known-gaps)).

### 3.2 The issue texts

- **`S2.texts`:** 19 bodies read with their edges, and 179 entries on `main`; 19 new bodies built with 39 branch links (1 of them the
  impact link), 1 clause and 1 plan line, 0 anchors not found; the audit: 19 new bodies equal the manifest, LF-only, a final
  newline, 0 occurrences of the planning branch's name.
- **`S2.gate`:** the privacy gate over the new bodies, 0 blocking hits; 0 resolving tokens; 0 matches of the scrub's expressions.
- **`S2.edits`:** 19 edits, each sent once; each stored reply is `done`, and each edit's check held: the body byte for byte, and
  its parent, sub-issue, "blocked by" and "blocking" edges unchanged.
- **`S2.after`:** 0 occurrences of the branch's name in the bodies of #1 to #19; in the comments on #1, 0 blob links and one plain
  mention; 16 links in MagicBot #1 to #8 and 1 in WebTools #55; 0 edits not landed. The stage ended at 21:44:16Z.

### 3.3 The corpus, Gate 3, the id check and the runs

- **S3, the corpus.** The mirror was taken at 21:45:29Z and the dumps at 21:45:41Z (stamps).
  - Dumps: 35 numbers, 11 comments, 3 pull requests, no review comment and no review.
  - Revisions: 43 issue-side objects, 20 with earlier revisions, 44 revisions, 1 earlier title; pull requests: 3 objects, 0
    revisions.
  - Runs: 4, all completed, each log read; no artifact, 0 caches.
- **S4, Gate 3** (ended 21:48:23Z).
  - The privacy gate: 0 blocking hits.
  - The machine-local path count: 3019 texts, 0 for each of the three expressions.
  - The secret scans: both history scans 107 commits of 107 with 0 findings; the tree scan 0 findings.
  - The purged-blob manifest: every blob missing from the mirror. The scrub's count: 0 for each expression.
- **S5, the id check** (ended 21:48:37Z).
  - Phase documents: 41 files, 91 versions, 0 resolving tokens.
  - Boards: 10 distinct ids at the tips and 13 over every version, 0 outside the expected fields.
  - Commit messages: 108 commits, 0 tokens. The history scans count 107: one commit changes nothing but deletions, which the scans
    leave out.
  - Comments: 35 tokens of the 3 accepted ids, in 3 issues.
  - Revisions: 45 items, 0 tokens. Run logs: 4, 0 tokens.
- **S6, the runs** (ended 21:48:47Z): 13 of 13 checks; the latest push run on `main` passed at `main`'s head, and each of the 4 runs
  reads markers `2 1 2 2` and shapes `6 62 0`.

### 3.4 The change and the scanning settings

| What | Value |
|---|---|
| Pre-flip gate passed (stamp) | 22:19:34Z |
| Visibility request first sent (stamp) | 22:20:15Z |
| Visibility request carried out | 23:17:14Z to 23:17:24Z (§4.3) |
| Visibility read-back (`public false`, stamp) | 23:17:54Z |
| Scanning request sent (stamp) | 23:17:56Z, 2 s after the visibility read-back |
| Scanning request carried out | 23:18:36Z to 23:18:46Z |
| Scanning read-back (`enabled enabled disabled disabled absent absent`, stamp) | 23:19:08Z |
| Gap between the two read-backs | 74 s |
| First alert read (stamp) | 23:19:09Z, 0 alerts (an empty list is not a finished scan) |

The first alert read answered with the list, and the scanning settings needed no second request. In S8 the replies were stored and
checked as each arrived, by the sender of the requests, with the plan's commands in the plan's order.

### 3.5 The anonymous measurements

- **The readiness gate** was open on the first poll, at 23:20:01Z (stamp), 127 s after the visibility read-back.
- **The route batches,** every probe absent, each between controls that answered as expected:

  | Batch | Absent |
  |---|---|
  | web, the 87 commits | 87 |
  | `want`, the 87 commits | 87 |
  | `want`, the old trees | 3 |
  | `want`, the purged-blob sample | 58 |
  | REST commits | 3 |
  | REST trees | 3 |
  | REST blobs | 6 |
  | web, second read of the board ids, tips and first-changed commits | 14 |

- **The feeds,** first and second read: web 0 old ids and 2 current ids, `activity` 0 and 2, `events` 0 and 1, both times. All six
  reads are valid.
- **Times** (stamps): the first web batch ended 23:21:19Z, the batches 23:23:48Z, the first feed read 23:24:02Z, the measurements
  23:27:36Z. The first of these stamps straddles a second: its epoch reads 23:21:19Z and its text field 23:21:20Z; the intervals in
  this record are by the epochs.

### 3.6 The access check and the close

- **S10:** 0 deviations in the anonymous half (ended 23:27:54Z) and 0 in the authenticated half (ended 23:28:05Z). The fork
  pull-request approval policy reads `first_time_contributors`. Recorded without a verdict: 0 collaborators of direct affiliation,
  and `allow_forking` true (it read false while the repository was private).
- **S11:** the second alert read at 23:28:12Z (stamp), 0 alerts. The record's counts: 4 runs read; 8 batches, 0 with an id served;
  6 feed reads, 6 valid, 0 old ids listed; 2 alert reads, 0 alert lines; 0 deviations in each half of the access check.

### 3.7 The landing's reads

- **The self-tests, run again and kept** (2026-11-13, ended 00:10:06Z): `p25_writes` 42 checks passed, `p25_revisions` 10,
  `p25_idcheck` 20, `p25_reads` 15, `allow_tool` 50.
- **The third feed read** (2026-11-13T00:10:19Z, stamp), 2777 s after the first feed read ended: web 0 old ids and 2 current ids,
  `activity` 0 and 2, `events` 0 and 1; all three reads valid.
- **The third alert read** (2026-11-13T01:05:33Z, stamp): 0 alerts, no alert yet. The run's record, whose checksum list S11 wrote,
  still verifies: 11 of 11 files.
- **The documents gated before their commit** (2026-11-13, run at 02:22:04Z over the full pending set, state boards included, and
  again after this entry was corrected, with the same counts): 26 pending files; the privacy gate, 0 blocking hits; 0 resolving
  tokens in the documents and 21 in other files, all among the allowed ids; 0 matches of the scrub's expressions; the dir scan with
  the committed configuration, `RESULT: CLEAN`; no CHANGELOG change, and the README unchanged.
- **The push run on `main` at the merge commit** is read after the merge, and the issue's resolution comment reports it.

---

## 4. Deviations from the plan

### 4.1 The procedures of edits 1 to 18 were not demonstrably run as one shell

- **Departs from:** the plan's Design, ["The requests"](plan.md#the-requests) (the `procedure` field: "the literal commands, in
  order, run in one shell"), and its Procedure, ["Conventions"](plan.md#conventions) (a STEP).
- **As built,** from the request service's replies:
  - for edits 1 to 18 the request service ran each procedure's commands in order, but not demonstrably as one shell;
  - edit 18's repository-id check ran in one call and the remaining commands in a second;
  - in edits 8, 10 and 16, lines outside the procedure were added around its entries to print the old body's hash (in edit 8, an
    echo of the current body's hash added to the guard entry);
  - the replies of edits 5 and 11 indicate that their entries were run one at a time;
  - for edits 1, 2, 3, 4, 6, 7, 9, 12, 13, 14, 15 and 17 the replies give the printed lines in order and do not say whether one
    shell ran them;
  - edit 19 ran as one shell: the seven entries written unchanged to one script and run with a single call, exit code 0.
- **Effect.** In all nineteen edits the guard printed `guard ok` before the `PATCH`, the `PATCH` reply showed the right issue
  number, the final hash matched the intended body's, and the edit's own check held (the body byte for byte, and its parent,
  sub-issue, "blocked by" and "blocking" edges). What is not established for edits 1 to 18 is that a stopping guard would have
  ended the run before the write by the shell's own exit status; no guard stopped, so no write depended on it.
- **Reasoning.** The request service carried out the procedures' commands in order without, at first, keeping them in one shell.
  From edit 19 on, and for the visibility and scanning requests, each procedure ran as one shell with its entries unchanged.
- **Based on:** the plan's design of the requests rests on the parent architecture's
  [§11](../architecture.md#11-version-control): every write carries the unit plan's procedure, inputs and checks.

### 4.2 The comments on #1 hold no blob link to the planning branch

- **Departs from:** the plan's Procedure, [S2](plan.md#s2--the-issue-texts), step `S2.after`, whose block names 1 remaining link
  in the comments on #1.
- **As built:**
  - the block's pattern, a blob link to the planning branch, finds 0 in the comments on #1, so the step printed two `ok` lines and
    one `RECORD` line for that count;
  - the comments on #1 hold one mention of the planning branch's name that is not a blob link, in a comment unchanged since
    2026-10-20;
  - MagicBot #1 to #8 hold 16 such links and WebTools #55 holds 1, as expected;
  - 0 occurrences of the branch's name remain in the bodies of #1 to #19, and 0 edits failed to land.
- **Effect.** None on the change. The mention stays the follow-up that
  [`consequences.md` §6](consequences.md#6-follow-ups) lists for the comment on #1.
- **Reasoning.** The block's expected 1 counted the mention of the branch's name; its pattern counts only blob links.
- **Based on:** the count of the planning branch's occurrences in the parent's
  [consequences §2.3](../consequences.md#23-issue-numbers-and-links).

### 4.3 The change to public followed the pre-flip gate by 58 minutes

- **Departs from:** the plan's [Requirements](plan.md#requirements), R1 ("One continuous procedure, with no stop for a person
  before the change of visibility") and R7 ("immediately before the change"); its Design,
  ["Shape of the procedure"](plan.md#shape-of-the-procedure); and its Procedure, [S7](plan.md#s7--the-pre-flip-gate) and
  [S8](plan.md#s8--the-change-and-the-scanning-settings) ("The two requests follow each other with nothing between them but their
  checks").
- **As built:**
  - the pre-flip gate passed at 22:19:34Z and the visibility request was sent 41 s later, at 22:20:15Z;
  - the request service declined to run the request three times between 22:21Z and 23:05Z, before anything reached GitHub: no
    `PATCH` was sent;
  - the request was sent once, and one reply, `done`, is stored; the three times it was declined left no stored reply;
  - once the request service was available again, the request ran once, between 23:17:14Z and 23:17:24Z, as one shell that sent
    `visibility` only;
  - the change therefore followed the pre-flip gate by 58 minutes, and the gate was not run again in between; the `public-sent`
    stamp holds the time the request was sent.
- **Effect.** The repository read `private true` with its id before the `PATCH`, and no other write to the repository happened in
  that time. An authenticated read at 23:50Z, made again at 00:33Z on 2026-11-13, shows no drift between Gate 3's dump and the
  change: refs equal to the recorded ones, 35 numbers, the newest `updated_at` 21:42:23Z (edit 19) before the 21:45:41Z dump, no
  comment since, 4 runs and none new, 0 forks.
- **Reasoning.** The visibility request was sent once and stayed with the request service under that one request the whole time. Its
  own guards, the repository id at the name and the state `private true`, ran in the same shell immediately before the `PATCH`, and
  nothing else writes to the repository. The gate's other reads were not repeated, because the request was not sent again.
- **Based on:** the pre-flip gate immediately before the change, in the parent architecture's
  [§7.5](../architecture.md#75-renames-archive-visibility-scanning), and the turnaround of a request the plan expected from the
  earlier units, about 2 to 3 minutes from request to reply
  ([research summary §1](research/README.md#1-the-change-to-public-the-scanning-settings-and-the-way-back)), which did not hold for
  this request.

### 4.4 The second feed read fell inside the events feed's cache

- **Departs from:** the plan's [Requirements](plan.md#requirements), R10 (the feeds are "read again at least 6 minutes after the
  first read ended"), and its Procedure, [S9](plan.md#s9--the-anonymous-measurements), step `S9.second`.
- **As built** (stamps):
  - the block that ran waited 360 s from the end of the first web batch (23:21:19Z) and from nothing else, then ran the second web
    batch and the second feed read; it ended at 23:27:36Z, 377 s after that end, so the second web batch met its six minutes;
  - the first feed read began after 23:23:48Z and ended at 23:24:02Z, so the second feed read ended 214 s after the first one's end
    and at most 228 s after its start;
  - the second feed read therefore fell inside the 300 s cache of the events feed and was not an independent read.
- **Effect.** The third feed read, at the landing, is the read past the caches: 2026-11-13T00:10:19Z, 2777 s after the first read's
  end, with 0 old ids in each of the three feeds and a current id in each (§3.7).
- **Reasoning.** The block as run took its six minutes from the end of the first web batch only. The first feed read ended 163 s
  after that end, so the one wait did not cover it. The plan's block now waits from the first feed read too.
- **Based on:** the feeds' caches and the spacing of the reads,
  [findings §6.4](research/anonymous-reads-after-publication.md#64-the-feeds).
