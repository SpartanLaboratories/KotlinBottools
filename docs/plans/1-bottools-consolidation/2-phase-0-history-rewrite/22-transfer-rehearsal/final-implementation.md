# Phase 0 · 2 — Transfer rehearsal: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#22](https://github.com/SpartanLaboratories/KotlinBottools/issues/22),
  *"Phase 0 · 2 — Transfer rehearsal on two throwaway repositories"*, a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **Plan:** [`plan.md`](plan.md). **Parent design:** unit `transfer-rehearsal` of
  [`../architecture.md`](../architecture.md), §7.2, §7.4, §7.5 and §15.
- **Consequences:** [`consequences.md`](consequences.md) holds the known gaps, the tool's among them, and the
  follow-ups.
- **What this document is:** what the unit built and what it measured, in results, ids and counts. The
  procedure's writes on GitHub were confined to the two throwaway repositories; it changed nothing of
  KotlinBottools or of any other repository.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every time below is UTC, on
2026-11-09.

---

## 1. What was built

- **The tool and its runner,** the text of the plan's
  [Appendix A](plan.md#appendix-a--the-tool-and-its-runner), each equal to the size and sha256 the plan's
  bootstrap checks:

  | File | Size | sha256 |
  |---|---|---|
  | `WS/tools/rehearsal/rehearsal.py` | 870 lines, 76,564 bytes | `9bc7fd63c773c19b5f149f332eb382c9b6e985a10a9a01929b6f22d6e73596a6` |
  | `WS/tools/rehearsal-step.sh` | 5 lines, 318 bytes | `4428bc8bfadbb59b18b6b33d0b2bde300b02a9378b52d9a084b74a9aa7ca61f8` |

  Its self-test passes its 87 checks.
- **Two repositories** of the `SpartanLaboratories` organisation, each given the labels `type: tracking` and
  `type: feature` and the milestone `1.0.0`:

  | Role | Id | Created as | Left as |
  |---|---|---|---|
  | Source | 1450917603 | `phase0-rehearsal-a`, public, with an initial commit | `phase0-rehearsal-a-legacy`, private, archived |
  | Target | 1450918337 | `phase0-rehearsal-b`, private, empty | `phase0-rehearsal-a`, private, archived |

- **The fixture** of the plan's Requirement 3, in the source: nine issues and the merged pull request #4, four
  comments, seven sub-issue links and four "blocked by" links, all of it made-up text.
- **The walk** moved #1 to #3 and #5 to #9 into the target and created the placeholder at #4; #10 and the
  pull request stay in the source.
- **The evidence** is in `DATA/run/rehearsal/`: `fixture.json`, `baseline.json`, `state.json`, the 30 requests
  and their 30 replies, 14 snapshots, `steps.jsonl` (143 records), `result.json` and `result.txt`; the stage
  lines are in `DATA/run/as-run.log`. It holds fixture text and ids only. For steps 1 and 3, `steps.jsonl`
  also keeps an item check with `ok: false` and the stop it made: that check compared the moved text byte for
  byte, which a transfer's rewriting of references rules out
  ([research, Did not hold in the build](research/README.md#did-not-hold-in-the-build)). Each of those
  transfers ran once, and the step's later `ok: true` record, from the check that maps references back, is
  its result.

---

## 2. Acceptance

| Criterion | Result |
|---|---|
| Every item of the source is on its own number in the target, the placeholder included | Met: the target holds #1 to #9, the eight issues on their source numbers and the placeholder at #4 (§3.2) |
| Every fixture link is present at the end, kept or re-created | Met: the last read, at the final names, holds the 11 fixture links and no other, consistent and settled; all 11 were kept, and none needed re-creating (§3.4) |
| The renames resolve by id | Met: at every step each repository read by id carried its expected name, and each name it held answered its id (§3.6) |
| Both repositories are private and archived | Met: both read private and archived by id, and unauthenticated requests to each by name, by id and on the web answer 404 (§3.6) |
| The per-step results are recorded in `DATA/run/rehearsal/` | Met (§1) |

`result.txt` passes all eight shapes (numbers, placeholder, closed issues, links, cross-repository links,
rename, private and archived, old URLs) with no refusal recorded, and the procedure ends with `UNIT OK`. The
results above are read from the records the shapes rest on as well, since that gate has known gaps of its own
([consequences §5](consequences.md#5-known-gaps)).

---

## 3. Measurements

### 3.1 The procedure's record

| Stage | `STAGE … OK` at |
|---|---|
| S0 Local readiness | 03:43:09 |
| S1 Repositories, labels and milestone | 04:11:02 |
| S2 The fixture | 04:31:50 |
| S3 The walk | 05:29:43 |
| S4 Link reconciliation | 05:30:40 |
| S5 The rename swap | 06:57:28 |
| S6 Close-out | 07:00:14 |

Each of the 30 requests was answered `done` at its first attempt. The close-out's `private-src` and
`archive-src` were already done and were skipped. No refusal, throttle or fallback route occurred.

### 3.2 Numbers and the placeholder

- **#1, #2, #3, #5, #6, #7, #8 and #9** each landed on its source number in one transfer, the target's highest
  number being one below it beforehand.
- **The placeholder** was created at #4 once #3 had landed: *"Placeholder for pull request 4"*, with the body
  "This number belonged to a pull request. It is at
  https://github.com/SpartanLaboratories/phase0-rehearsal-a-legacy/pull/4", closed with reason
  `not_planned`. The next transfer, #5, landed on 5.
- **#10 and the merged pull request #4** stay in the source.

### 3.3 Closed issues

#5 and #7 were transferred closed and arrived closed with reason `COMPLETED`, as in the source, with their
`createdAt` and `closedAt` unchanged. Neither route for a closed issue ran: no reopen before a transfer and no
close on the target. The `closed-issues` row of `result.json` reads: first arrival `closed/COMPLETED` for #5
and for #7, and no route for either.

### 3.4 Links

- **At each transfer.** After each of the eight transfers all 11 fixture links read `kept`: the seven sub-issue
  links 56 times in all and the four "blocked by" links 32 times. None read dropped, repointed, stale or
  unsettled. The first read after each transfer already held every link, and a second equal read followed
  (15 to 17 seconds per settle); each of the 14 snapshots settled after two reads, with no inconsistent edge.
- **Across a public and a private repository.** 35 of those statuses were of a link with one end in each
  repository, while the source was public and the target private, and all were kept: sub-issue links with
  the parent in the target and the child in the source, and "blocked by" links both ways (the blocked issue
  in the target for 3⟵6 and 3⟵10, in the source for 8⟵5 and 10⟵6).
- **Reconciliation** ran one round with nothing to add and nothing to remove; no link was re-created.
- **At the end,** the read at the final names holds the 11 links, with the two that touch #10 across the two
  repositories: #10 in the legacy repository blocked by #6, and #3 blocked by #10.

### 3.5 References in the moved text

A transfer rewrote each reference to the full name of the repository holding the cited item at that moment:
the target for a number that had moved, the source for one still there, the pull request's included. No
reference was left bare and none named another repository. With these references mapped back to bare `#N`,
every moved text equals the source text read before the first transfer. The full rule, with what happens to
text already in the target, is in the
[research README, Did not hold in the build](research/README.md#did-not-hold-in-the-build).

Per step, as references naming the target / naming the source:

| Step | The moved issue's text | The issues still in the source whose text differs from before the walk |
|---|---|---|
| 1 | 0 / 5 | #6: 13 / 100; #10: 1 / 1 |
| 2 | 0 / 3 | #3: 1 / 2; #6: 26 / 87; #7: 1 / 2; #10: 1 / 1 |
| 3 | 1 / 2 | #6: 40 / 73; #7: 1 / 2; #8: 1 / 2; #10: 1 / 1 |
| 5 | 0 / 2 | #6: 52 / 61; #7: 1 / 2; #8: 2 / 1; #10: 2 / 0 |
| 6 | 52 / 61 | #7: 1 / 2; #8: 2 / 1; #10: 2 / 0 |
| 7 | 1 / 2 | #8: 3 / 0; #10: 2 / 0 |
| 8 | 3 / 0 | #9: 1 / 1; #10: 2 / 0 |
| 9 | 1 / 1 | #10: 2 / 0 |

### 3.6 The rename swap

| Write, in order | Checked at |
|---|---|
| Rename the source to `phase0-rehearsal-a-legacy` | 06:50:42 |
| Make the source private | 06:52:44 |
| Archive the source | 06:54:35 |
| Rename the target to `phase0-rehearsal-a` | 06:56:28 |
| Archive the target | 06:59:01 |

- **The rename onto the freed name was accepted,** about six minutes after the source released it (the reads
  after the two renames were taken at 06:50:45 and 06:56:32).
- **Identity.** Each read-back by id matched at its first read: at each step each repository read by id
  carried its expected name and flags, and each name it held answered its id. From the source's privacy step on,
  unauthenticated requests to it by name, by id and on the web answered 404; the target answered 404
  throughout.
- **The released names.** Before the swap `phase0-rehearsal-a-legacy` did not exist. After the source's
  rename, `phase0-rehearsal-a` answered the source's id through the rename's redirect, until the target took
  the name and answered it directly. After the target's rename, `phase0-rehearsal-b` answered the target's id
  through the redirect.

### 3.7 Old URLs

A transferred issue's old REST URL, followed for the open #1 and the closed #5 alike. Every answer's number
and repository were the issue's new home:

| Read | By the original name, `phase0-rehearsal-a` | By `phase0-rehearsal-a-legacy` |
|---|---|---|
| Before the renames | `301` to the issue in `phase0-rehearsal-b`, then `200` | not read |
| After the source's rename, privacy step and archive | `301` to `repositories/1450917603/issues/N`, `301` to the issue in `phase0-rehearsal-b`, then `200` | `301` to the issue in `phase0-rehearsal-b`, then `200` |
| After the target's rename, and at the end | `200`: the name is now the target's, and the issue is on its number there | `301` to the issue in `phase0-rehearsal-a`, then `200` |

The source's privacy step and archive left these answers unchanged for an authenticated reader.

### 3.8 What references reach after the renames

**The judged read:** each distinct `owner/name#N` in the fixture's texts, resolved by the API and compared by
issue id with the item its number names.

| Read | Naming the target, `phase0-rehearsal-b` | Naming the source, `phase0-rehearsal-a` |
|---|---|---|
| Before the renames | 8 of 8 reach their item | 2 of 2 |
| After the source's rename | 8 of 8 | 2 of 2, through the rename's redirect |
| After the target's rename, and at the end | 8 of 8, through the redirect the rename left on the name | 1 of 2: #4 reaches the placeholder at #4 in the renamed target, which the read accepts for the pull request's number; #10, which stays in the source, is not found |

**The rendered read:** all 136 references in the texts render as links whose item id is the item they name,
at every read. A link's URL keeps the name it was rendered with: the 105 references naming the target link to
`phase0-rehearsal-b` at every read; of the 31 naming the source, 24 link to `phase0-rehearsal-a-legacy` from
the source's rename on, and 7 still link to `phase0-rehearsal-a`, the target's name after the swap.

### 3.9 Anonymous reads of the public source

Before the swap, the source's unauthenticated web page answered `504` at the four recorded reads between
05:31 and 05:42, while its REST answers by name and by id were `200`. At 06:49:12 all three answered `200`, and the swap began. The reads
taken in that window are the deviation in §4.

---

## 4. Deviations from the plan

- **The `urls pre` and `refs pre` reads were taken although `ids pre` had stopped**
  ([plan §7.3](plan.md#73-conventions-for-every-stage), "On a stop";
  [plan §7.4, S5](plan.md#s5--the-rename-swap), the reads before any rename). `ids pre` stopped four times
  between 05:30 and 05:42 UTC on 2026-11-09 (stop records logged at 05:31:24, 05:33:37, 05:37:23 and
  05:42:08), each on a 504 from GitHub's web page for the source repository, and its read was clean at
  06:49 UTC. The three reads had been issued together, before the first stop was known. Both reads
  query GitHub and record their results only, and neither changes anything on GitHub. Their recorded results
  are valid as of their time: every followed URL resolved to its new home, and every reference's name resolved
  to the same item. They were not taken again once `ids pre` read clean, and nothing was written in between.
  The reads rest on
  [research, rename sequence §3.4 and §3.5](research/rename-visibility-archive-sequence.md#34-reading-identity-by-name-and-by-id)
  and, for `refs`, on [architecture §7.4](../architecture.md#74-the-number-walk-and-the-links).
