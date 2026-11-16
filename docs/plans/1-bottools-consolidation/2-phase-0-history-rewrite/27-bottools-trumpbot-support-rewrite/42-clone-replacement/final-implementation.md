# Phase 0 · 7.4 — Replacing the TrumpBot clone: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#42](https://github.com/SpartanLaboratories/KotlinBottools/issues/42),
  *"Phase 0 · 7.4 — Replace the TrumpBot clone"*, unit 4 of
  [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), which is a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **Plan:** [`plan.md`](plan.md), the procedure this record is measured against. **Parent design:** unit `clone-replacement` of
  [`../architecture.md`](../architecture.md), §10 (the clone replacement), with its dated note of 2026-11-16 under §10.3.
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the blast radius, the outcome of each
  of the plan's assumptions, the known gaps and the follow-ups.
- **What this document is:** what the unit did to the TrumpBot clone and what it measured, in results, counts, statuses and fixed
  markers, and every departure from the plan.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every time below is UTC, on 2026-11-16. The unit's
first step through the runner began at 06:04:15Z and its last at 19:48:33Z. It met no `STOP` or `NEXT` line, needed no resend
and no move back, and its one `WAIT` was the graph's, at `S3.wait`.

---

## 1. What was built

- **The TrumpBot clone.** `%PROJECTS%\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the
  replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to
  `%PROJECTS%\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second
  request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's
  access entries were left as they were: the rename on its own volume kept them, and nothing changed them before the deletion.
- **The graph.** The graph service built the fresh clone's graph after `S2.gone`, from 19:41Z to 19:42Z: a code-only build, no
  model spent, with its two hooks, `post-checkout` and `post-commit`; 725 nodes, 1,431 edges and 42 communities. With it the build
  placed the board files' ignore at the clone's root and its exclude entry, which the read-back recorded as its one difference
  (§3.4).
- **Before the readiness,** the owner deleted the graph service's board files' ignore from the old clone's root and left its
  exclude entry, and the graph service ran no job on the checkout until the run's notice. The census at `S0.census` proved the
  removal: 59 files git does not track, none outside `.idea/` and `graphify-out/`.
- **The request service's settings for the job:**
  - the grant section `phase-0-trumpbot-clone-replacement`, holding the plan's wording apart from its date and its `Settings:`
    line (deviation 1);
  - the three allow lines of [the plan's "The grant", item 2](plan.md#the-grant), and the fourth, of item 5, placed by the owner
    in the global settings file before the replacement request was sent, so that each stood before its first call: no call was
    refused, and the request service did not restart;
  - the section `phase-0-tracking-27-close`, given on 2026-11-16, for the closing of #27 once this unit has landed.
- **On GitHub:** one issue filed during the run,
  [SpartanLaboratories/KotlinBottools#47](https://github.com/SpartanLaboratories/KotlinBottools/issues/47), at 19:40:30Z, for the
  clone set's request builder (deviation 3). No repository content, branch, ref or setting changed, and TrumpBot is as the
  rewrites pushed it.
- **In the workspace and the data folder,** what [consequences, §2.2](consequences.md#22-this-machine) lists, with the counts of
  §3.
- **Unchanged:** the tool folder `WS\tools\g27\`, every file at its pin at `S0.tools` and again at `S4.tools`; the earlier tool
  folder, the reused tools and the runner (`S4.g26`); the rewrites' records, the preparation unit's TrumpBot records, the
  untouched backup and the manifest (`S0.records`, `S4.records`); every other checkout, this one apart from the landing.

---

## 2. Acceptance

| Criterion (the issue's "Done when"; [plan, Requirements](plan.md#requirements)) | Result |
|---|---|
| The local TrumpBot clone reaches no pre-rewrite commit from any ref, reflog, stash or pseudo-ref | Met: the replacement's own proofs (`OUTCOME complete entries=8 of 8 stops=0 status=done`) and the unit's `S1.proofs`, 18 `ok` lines and `STAGE K1.proofs OK`: the remote-tracking refs equal to `ref-map`'s new column, one pack, no loose object, a clean `fsck`, and the seven lines of `prove_removed`, by which the first-changed commit, every changed commit and the 199 manifest blobs are missing from the fresh clone and none is missing from the untouched backup. The same proof held after the graph's build (§3.2, §3.4) |
| Its four `.idea/` files are restored and equal their checksums | Met: `CARRIED-RESTORED 4` in the replacement, and the unit's `S1.carried`: the 4 restored files equal `carried.sha256`, the files the fresh clone does not track are exactly the carried list, and the 4 files of the old clone aside equal the same checksums (§3.2) |
| No old-clone path remains | Met: `OUTCOME complete entries=3 of 3 stops=0 status=done`, and `S2.gone`: `ok    no old-clone path remains`, `ok    the fresh clone is in place` and `STAGE K1.gone OK`; `clone-moved.txt` holds the recorded path (§3.3) |
| The graph is rebuilt from the rewritten tree, and the graph and its two hooks are read back | Met: `S3.wait` found the build finished after one 9-minute wait, and `S3.graph` printed 9 `ok` lines, among them that the graph's folder exists and holds files and that the hooks beyond the samples are exactly the graph's two, the one `RECORD` the plan expects, and `STAGE K1.graph OK` (§3.4) |

The plan's further criteria are met as well: the earlier records equal their checksum lists and this unit's records carry
theirs (`S0.records` and `S4.records`, §3.1 and §3.5), and no output or record holds a pre-rewrite commit id, a purged blob id or
a secret (`S4.outputs`, §3.5). The landing's four document checks run over every pending document before it is committed
([plan, The landing's document checks](plan.md#the-landings-document-checks)).

---

## 3. Measurements

The results of the typed blocks, which run outside the runner, are given here as counts and words: `S0.unit` and `S0.records`
(§3.1); the request, reply and outcome blocks and `S1.carried` (§3.2, §3.3); `S3.wait` (§3.4); and `S4.records`, `S4.g26` and
`S4.outputs` (§3.5). The state read was not needed: no outcome but complete arose.

### 3.1 Readiness (`S0`)

- `S0.unit` (typed): one `ok` line; the run log held 16,157 lines before the unit's steps.
- `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`.
- `S0.quick`, the quick gate (the deterministic tests of the self-test): 63 case lines and
  `ok    gselftest deterministic: 63 checks passed`, status 0, in about 15 seconds.
- `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`.
- `S0.records` (typed): 7 `ok` lines and `STAGE S0.records OK`: the rewrites' run records (49 files) and TrumpBot's rewrites'
  records (29 files) equal their lists, the preparation unit's 6 earlier TrumpBot records equal those recorded at the rewrites'
  first readiness, the untouched backup's 22 files equal their list, the manifest holds 199 blobs, `commit-map` 11 rows and
  `first-changed-commits` 1 line, and TrumpBot's stage-8 marker is present.
- `S0.grant`: 11 `ok` lines, the `RECORD` of a differing wording in place of the twelfth, and `STAGE S0.grant OK` (deviation 1).
- `S0.checks`: 17 `ok` lines, the two `RECORD` lines the plan names (2 local configuration keys beyond a plain clone's ten; 2
  hooks beyond the samples and 2 exclude entries), `CLONE-GUARDS-OK` and `STAGE K1.checks OK`.
- `S0.census`: 7 `ok` lines and `STAGE K1.census OK`; the census, recorded at 06:05:39Z: untracked 59 (carried 4, not carried
  55, elsewhere 0), hooks 2, exclude lines 2, config keys 12.

### 3.2 The replacement (`S1`)

- `S1.request` (typed), at 06:06:41Z: `ok    request written: requests/replace-TrumpBot.json (key clone-replace-TrumpBot, 8
  commands)`, no reply stored before, 8 entries.
- `S1.send`: one `replace-clone` request by file, id `SpartanLaboratories-KotlinBottools-42/42/clone-replace-TrumpBot`, attempt
  1. The request service carried it out on that attempt, at about 19:26Z; its own check refused no call.
- `S1.reply`: delivered as a file of 4,835 bytes and stored at 19:29:17Z as
  `ok    stored reply 1 for clone-replace-TrumpBot as done (88 printed lines)`: the 84 lines the procedure printed and the 4
  check strings the request service returned with them (deviation 2). Among the procedure's lines: the two `RECORD` lines of its
  `checks`, `CARRIED-ARCHIVED 4`, the rename made on its first try with 0 error lines and `MOVED-ASIDE`, `FRESH-CLONE-MADE`,
  `CARRIED-RESTORED 4` and `STAGE K1.proofs OK`; no `STOP`.
- `S1.outcome` (typed): `OUTCOME complete entries=8 of 8 stops=0 status=done`.
- `S1.proofs`, at 19:29:50Z: 18 `ok` lines and `STAGE K1.proofs OK`.
- `S1.carried` (typed): 4 `ok` lines and `STAGE S1.carried OK`.
- `S1.aside`, at 19:30:27Z: 6 `ok` lines, among them `ok    the census equals the recorded census (differing lines: 0)`, and
  `STAGE K1.census OK`.

### 3.3 The deletion (`S2`)

- `S2.request` (typed), at 19:31:12Z: `ok    request written: requests/delete-TrumpBot.json (key clone-delete-TrumpBot, 3
  commands)`.
- `S2.send`: id `SpartanLaboratories-KotlinBottools-42/42/clone-delete-TrumpBot`, attempt 1, carried out on that attempt; its own
  check refused no call.
- `S2.reply`: delivered as a file of 2,832 bytes and stored at 19:36:30Z as 16 printed lines: `DELETE-GUARDS-OK`, `rm` with 0
  error lines, `OLD-CLONE-REMOVED` and `STAGE K1.gone OK`; no `STOP`.
- `S2.outcome` (typed): `OUTCOME complete entries=3 of 3 stops=0 status=done`.
- `S2.gone`, at 19:36:54Z: 2 `ok` lines and `STAGE K1.gone OK`.

### 3.4 The graph (`S3`)

- `S3.notice`: one `status` request to the request service, id `SpartanLaboratories-KotlinBottools-42/42/graph-notice`, after
  `S2.gone`, carrying the plan's notice.
- The build: the graph service's code-only build, no model spent, with its two hooks, from 19:41Z to 19:42Z; 725 nodes, 1,431
  edges and 42 communities.
- `S3.wait` (typed): one `WAIT` line, one wait of 9 minutes, then
  `ok    the graph's build has finished: graph.json present, both hooks present`.
- `S3.graph`, at 19:47:42Z: 9 `ok` lines, the one `RECORD` the plan expects,
  `RECORD no untracked file lies outside the carried folder and the graph's folder: expected '0', got '1'` (the board files'
  ignore, which the build placed at the clone's root), and `STAGE K1.graph OK`.

### 3.5 The close-out (`S4`) and the run log

- `S4.records` (typed): 5 `ok` lines and `STAGE S4.records OK`: the rewrites' run records (49 files), TrumpBot's rewrites'
  records (29), the preparation unit's 6 earlier records and the untouched backup's 22 files still equal their lists, and
  `SHA256SUMS`, written at 19:48:21Z, verifies over this unit's 9 records: the 2 request files, the 2 stored replies, the census,
  the archive with its two lists, and the recorded path.
- `S4.tools`, at 19:48:33Z: 96 `ok` lines and `STAGE S0.tools OK`.
- `S4.g26` (typed): 3 `ok` lines: 21 of 21 pinned files equal their pins, 22 files in the folder; the 21 reused tools and the
  runner equal their list; the runner at its recorded size and sha256.
- `S4.outputs` (typed): 4 `ok` lines and `STAGE S4.outputs OK`: the unit's part of the run log holds 370 lines, with `STOP` 0,
  `WAIT` 0, `NEXT` 0 and `RECORD` 4, and no drive-letter path and no 40-digit id; the 2 stored replies hold neither; the 2
  request files hold no 40-digit id.
- **The run log** after its line 16,157: 370 lines; 11 runner calls, each ending `exit=0`; 10 `STAGE … OK` lines; 4 `RECORD`
  lines, those of `S0.grant` (1), `S0.checks` (2) and `S3.graph` (1); no `STOP`, `WAIT` or `NEXT` line.

### 3.6 Timings

- `S0` ran from 06:04:15Z to 06:05:39Z, the quick gate in about 15 seconds.
- The replacement request was built at 06:06:41Z and carried out at about 19:26Z; its census comparison found the clone as the
  census had recorded it at 06:05:39Z.
- The old clone stood aside from 19:26:32Z until its deletion, whose reply was stored at 19:36:30Z: about ten minutes.
- The graph's build ran from 19:41Z to 19:42Z, after the notice that followed `S2.gone` (19:36:54Z); `S3.graph` read it back at
  19:47:42Z, and the close-out's last runner step began at 19:48:33Z.

---

## 4. Deviations from the plan

Each deviation names the section of [`plan.md`](plan.md) it departs from, why, and what that part of the plan rested on.

1. **The grant's section holds no `Settings:` line.** [Plan, Design, "The grant", item 1](plan.md#the-grant) gives the section's text
   with a `Settings:` line naming the three allow lines; the section in the request service's permissions file for KotlinBottools holds
   every other line of that text and no `Settings:` line. `S0.grant` printed 11 `ok` lines, then, in place of the twelfth,
   `RECORD the section's wording differs from the unit's wording; its actions, issue, branch, targets and end are as the unit needs`, and
   `STAGE S0.grant OK`. A read-only comparison of the section with the wording file, beside the step, names the `Settings:` line as the
   one line that differs. The plan makes a differing wording a `RECORD`, never a stop ([plan, `S0.grant`](plan.md#s0--readiness)), and
   every part the check reads (the actions, the issue, the branch, the targets, the end) is present. The unit's part of the run log
   holds this `RECORD` line beside the three [plan, `S4.outputs`](plan.md#s4--close-out) expects, so the first line of `S4.outputs`
   reads `RECORD 4` where the plan's expected lines read `RECORD 3`; a further difference of the graph read-back adds to that count
   as the plan describes. That part of the plan rested on
   [architecture §12](../architecture.md#12-version-control-and-requests) and its dated note on allow lines.
2. **Each reply was saved by a byte-for-byte copy of the delivered file.** [Plan, Procedure, Conventions, "Storing a
   reply"](plan.md#conventions) writes the reply text into the scratch file `reply-<kind>-1.txt` through a quoted heredoc. The
   replacement's and the deletion's replies were each delivered as a file, so each scratch file was written as a copy of it, compared
   equal with it (4,835 and 2,832 bytes), and then passed to `g27_clone.py reply` exactly as the block passes it. The heredoc's
   purpose, that nothing in the reply is expanded or altered, holds for a copy, and no reply's text was opened or quoted. The
   replacement's reply is stored as 88 lines: the lines its procedure printed and the 4 check strings the service returned under
   `result.checks`, which the plan stores too ("a delivered reply that carries a further list of strings under `result` stores those
   lines too, and only `outcome` decides"). The deletion's reply is stored as 16 lines. That part of the plan rested on the rewrites' stored
   replies ([the rewrites' plan, "The push"](../40-rewrites/plan.md#the-push)) and on A8 of [Assumptions](plan.md#assumptions).
3. **The deletion request carries the replacement's four check sentences.** [Plan, Design, "The requests"](plan.md#the-requests) gives
   each request a `checks` field of "four fixed sentences of what the procedure guarantees". The clone set's builder at its pin writes
   one list of four sentences into every kind of request ([the tools plan, Appendix A](../39-workspace-tools/plan.md#appendix-a--the-tools),
   `g27_clone.py`, `CHECKS`), and that list describes the replacement: its first sentence names the eight markers of the replacement's
   entries, which the deletion's entries do not print. The deletion request `delete-TrumpBot.json` therefore holds the replacement's
   four sentences word for word; the request service reported its first check not applicable as written, and every marker of the
   deletion's own three entries printed (`OUTCOME complete entries=3 of 3 stops=0 status=done`). A move-back request, had one been built,
   would hold the same four sentences. The builder is not changed: the tool folder stays at its pins, and a correction is a new version
   of that file under the tools' defect rule ([plan, Requirements, "The tools are fixed"](plan.md#requirements)). The procedure, its
   markers and the outcome, which decide the deletion, are as the plan specifies. The defect showed only in the deletion's reply, after
   its write; the deletion's own markers all printed and `S2.gone` passed (19:36:54Z) before the defect was filed for the tools as
   [SpartanLaboratories/KotlinBottools#47](https://github.com/SpartanLaboratories/KotlinBottools/issues/47) (19:40:30Z); no later
   step uses the request builder; and the markers and `outcome` decided the result, which is as planned. So the unit went on. Filing
   it was the one write to GitHub before the landing, which [plan, Design, "What the unit writes"](plan.md#what-the-unit-writes) does
   not list; it changed no repository content. That part of the plan rested on the tools plan's request builder and on
   [architecture §12](../architecture.md#12-version-control-and-requests).
