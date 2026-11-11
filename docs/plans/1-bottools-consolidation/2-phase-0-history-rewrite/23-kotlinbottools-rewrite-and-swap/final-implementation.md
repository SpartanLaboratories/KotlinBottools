# Phase 0 · 3 — KotlinBottools rewrite and swap: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#23](https://github.com/SpartanLaboratories/KotlinBottools/issues/23),
  *"Phase 0 · 3 — KotlinBottools: rewrite with path scrub, fresh repository, number-preserving swap and clone
  realignment"*, a sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **Plan:** [`plan.md`](plan.md). The version the run started from is
  [`superseded/plan-3-2026-11-11.md`](superseded/plan-3-2026-11-11.md); every departure from it is in §4.
  **Parent design:** unit `kotlinbottools-rewrite-and-swap` of [`../architecture.md`](../architecture.md), §6.4, §6.5,
  §7, §9 and §15.
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the known gaps, the
  outcome of each assumption, and the follow-ups.
- **What this document is:** what the unit built and what it measured, in results, counts and the ids of repositories.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`. Every time below is UTC. The frozen window
opened at 2026-11-10T22:58:05Z and closed when this checkout's push-safety proof passed, at 2026-11-11T06:45:47Z.

---

## 1. What was built

- **The tools,** the 27 files of the plan's [Appendix A](plan.md#appendix-a--the-tools-and-their-runner), each equal to
  the size and sha256 recorded there. Thirteen of them were corrected during the run (§4); the versions in Appendix A
  are the corrected ones:

  | File | Bytes | sha256 |
  |---|---|---|
  | `swap/swap.py` | 177,954 | `05698846872cfa30613a68c184aafbbdb71a147630d8a13ed2634b931cee6c65` |
  | `kselftest.sh` | 41,892 | `a98dc7214725d8c586a7184d92a9214842b624306245f7ef59a89507b24973b0` |
  | `klib.sh` | 3,651 | `445011f5207ae1e6adaa81cb7e53c2ca718545f75d6d14131cc3df2472760617` |
  | `k6-fresh.sh` | 7,060 | `2f587bc891a2cdd7acb817b6b5a87c1a460ddb96d1597f8eb7061b05d5dc7674` |
  | `k7-exit.sh` | 6,679 | `91001e071acb83ff8fc23fdae19f86f1bf82c9df4b1632586c5809ac1997ca22` |
  | `k12-gate2.sh` | 2,310 | `305d3457b312015a9e063ddae9ac46dd34ce96c68190a6e934980098f7806c70` |
  | `k14-residual.sh` | 5,634 | `038144443bb2c3902f6817c824e8374d99802c54a5452dc73e1224a19a216ea7` |
  | `k16-close.sh` | 2,382 | `f5f190d674892b911f61946cf5ac05378e53eb1428a188b8f8afc9ec793d294c` |
  | `kr1-preflight.sh` | 4,114 | `ea23f4e5729c82fa62a74cf16daad51a5205a42c946a50fdd767eb5341421d09` |
  | `kr3-premove.sh` | 2,019 | `2e3eb41063d47b80a6bc0fa3c6796aa669ee0ac100bfbdd659300c32dc7b5e2f` |
  | `kr3-postmove.sh` | 1,387 | `9a8189e79913c0e590f8c842aa83ef60f45f5edd43b0e197079adb0aff9aaa4d` |
  | `kr3b-verify.sh` | 2,718 | `598daef04ed30a904b3543e01abde35047f54dfbb0e2f7fe0f1edbccf5338856` |
  | `kr5-proof.sh` | 3,068 | `e9adfab183816c7d209f847bb6839f75fd42cf6fedac68a08bbac468e9689749` |

  The walk tool that ran at S16 is 177,855 bytes (sha256 `5639d4a313002e060fa35838ac848608872ad8cf98fc9add23a93764ff3554d7`).
  The Appendix A copy differs from it only in its usage text, which now lists every subcommand the tool accepts; its code
  and its 564 self-test checks are those that ran, and it replaced the workspace copy after the run. Each correction to a tool is recorded, with the size and sha256 it
  replaced, in `DATA/run/swap/tool-corrections.txt`.
- **The plan was amended twice before the window opened.** The replaced versions are
  [`superseded/plan-1-2026-11-10.md`](superseded/plan-1-2026-11-10.md) and
  [`superseded/plan-2-2026-11-10.md`](superseded/plan-2-2026-11-10.md). The second amendment made the order of names
  that differ only in case total in the privacy gate and the allow-list tool, so that the allow-list's record repeats
  in every process, and made the allow-list's verification tell a gate run that did not complete from one that found
  blocking hits; the gate's copy became an Appendix A file of this unit.
- **On GitHub:**
  - the fresh repository, id 1453296798, now `SpartanLaboratories/KotlinBottools`: private, default branch `main`, wiki
    off, the rewritten history's two heads and nothing else, the three custom labels and GitHub's nine defaults, the
    `1.0.0` milestone, and the numbers 1 to 31: 28 transferred issues and the closed placeholders at 20, 30 and 31;
  - the pre-rewrite repository, id 562658298, now `SpartanLaboratories/KotlinBottools-legacy`: private and archived,
    with its refs as listed at the mirror clone, its three merged pull requests, and no issue.
- **This checkout,** realigned in place onto the rewritten history, its push-safety proof passed and its old objects
  deleted, with nothing deferred (§3.4).
- **The records** in `DATA/run/swap/` and `DATA/rewrite/KotlinBottools/`, each folder with its checksum list; the walk's
  145 records are checksummed.

---

## 2. Acceptance

| Goal | Result |
|---|---|
| The history is purged and scrubbed | Met: one filter-repo run; the fidelity check passed on all 85 surviving commits; all 346 manifest blobs are missing; the scrub's count is zero over every file and commit message of every ref, in the mirror and in a fresh mirror of the fresh repository (§3.1, §3.3) |
| The fresh repository, created private with the old settings less the wiki and the Actions write permission, reached by one mirror push without `--force`; no pre-rewrite id resolves in it | Met (§3.2, §3.3, §3.10) |
| Every number is reproduced | Met: 1 to 31 in the fresh repository, each issue equal to its text before the walk, the placeholders at 20, 30 and 31 (§3.6) |
| Every relationship is present at the end | Met: all 91, kept by the transfers, consistent on both sides and settled (§3.6) |
| The swap | Met: by id, the legacy repository is renamed, private and archived with its refs unchanged and no issue; the fresh repository holds the name `KotlinBottools` (§3.9, §3.11) |
| This checkout is realigned, with the push-safety proof passed | Met, and the object deletion proven, nothing deferred (§3.4) |
| Nothing public is exposed further; the public window is recorded | Met: no landing, issue or pull request appeared during the walk; the window ended at 2026-11-11T06:11:18Z (§3.9) |

`result` recomputed every shape from final reads and printed `RESULT OK` at 2026-11-11T06:47:21Z, with no refusal
recorded; the close-out's local half printed `STAGE S16-local OK` at 06:47:56Z.

---

## 3. Measurements

### 3.1 The rewrite

| Measure | Value |
|---|---|
| Commits before (T), pruned (P), emptied by the scrub (E), after | 87, 2, 0, 85 |
| Paths kept | 158 |
| Kept blobs before and after the scrub | 436 and 433; 31 changed by the scrub, 404 unchanged, 1 binary |
| Manifest (blobs under the purged paths) | 346, every one missing from the rewritten mirror |
| Fidelity | `PASS`: 85 commits checked, trees, identities and messages equal to the prediction, 69 binary entries unchanged |

### 3.2 The fresh repository and the push

- `fresh-create` made the repository private and empty; `fresh-settings` read the settings table back by id, REST and
  GraphQL (snapshot B1), with the wiki off and the default workflow permissions `read`.
- The push preparation found the mirror's heads equal to `ref-map`'s old column and recorded the pre-rewrite repository's
  3 pull-request refs. The push's expected tally was `new=2 forced=0 deleted=0 rejected=0`, and the fresh repository held
  the 2 rewritten heads and nothing else, on both channels.
- `fresh-default` set `main`; snapshot B2 differs from B1 only in the emptiness and default-branch fields
  (`graphql.isEmpty`, `graphql.defaultBranchRef`), once the fields that are not settings are left out (§4).

### 3.3 The exit tests

- A fresh mirror of the fresh repository: its refs are `ref-map`'s new column, heads only; the manifest blobs are
  reachable from no ref; the scrub's count is zero.
- gitleaks over branches and tags and over every ref: `RESULT: FINDINGS` on both, identically. The findings are of one
  default rule, `curl-auth-user`: 2 findings in 1 kept file. No custom rule found anything, and no `private-key` finding was among them (§4,
  [consequences §5](consequences.md#5-known-gaps)).
- The F0 probe: no pre-rewrite tip (2), first-changed commit (1) or sampled manifest blob (58) is served by the fresh
  repository; the positive control served every id and the negative control none.

### 3.4 The realignment

| | Scratch clone (S8) | This checkout (S15) |
|---|---|---|
| Tracked files before the move | | 162 |
| Tracked files removed, as predicted | | 41 |
| Files whose content the scrub changed, as predicted | | 2 |
| Files in the IDE and build folders, before and after the move | 3 and 3 | 419 and 419 |
| IntelliJ IDEA running; `git.exe` processes | 0; 0 | 0; 0 |

Both moves ended with `STAGE KR3B OK`: exactly the predicted tracked files left and changed, the tracked files equal to
`HEAD`, the untracked and ignored files kept, every branch at its target. The object deletion ended `STAGE KR4 OK`, with no
step deferred, and the push-safety proof ended `STAGE KR5 OK` on both, at 2026-11-11T06:45:47Z for this checkout.

### 3.5 Census and baseline

- `census`: N = 31, 28 issues (26 open) and 3 merged pull requests (#20, #30, #31), the numbers 1 to 31 without a gap.
- `baseline`: 28 issues, 8 comments, 91 edges (26 sub-issue, 65 blocked-by, 21 of them with MagicBot or WebTools issues),
  3 labels, the milestone with 14 open and 0 closed issues.
- The accepted ids: 26 occurrences of 3 distinct pre-rewrite ids, in 3 comments of #2, #21 and #22, and none in an issue
  body or title; the list equals the one taken at S5.

### 3.6 The walk and the links

- **Transfers:** 28, each landing on its own number and each equal to its text before the walk (title, body, state,
  labels, milestone and every comment, references mapped back), each at its first request. #21 and #22, closed in the
  source, arrived closed with reason `COMPLETED`; neither route for a closed issue ran.
- **Placeholders:** at 20, 30 and 31, each closed with reason `not_planned`, its title naming the pull request's title and
  its body the title, the merge date and the pull request's place in the legacy repository.
- **Links:** after each transfer, the links settled and were classified; none was dropped. The link round found the 91
  expected edges, consistent on both sides, and wrote nothing.
- No refusal, retry or route was recorded.

### 3.7 The privacy gate

- **The allow-list** holds four confirmed keys: a repository name, two ordinary words and the Steam64 base. Its
  verification over S0's corpus counted 1,960 allowed name hits and 38 allowed standalone id hits, and the gate answered
  `GATE: 0 blocking hit(s)`.
- **Gate 1** (S5), over the rewritten mirror, the five static backups' messages and identities and the old repository's
  texts: `GATE: 0 blocking hit(s)`.
- **Gate 2** (S12), over the fresh repository's texts: `GATE: 0 blocking hit(s)`; the scrub's expressions matched nothing
  in its 70 issue, placeholder, pull-request and comment texts.

### 3.8 References

- **The moved texts:** after the walk, every name in them resolves to the item on the same number: 28 of 28, through
  `KotlinBottools-next`.
- **Texts in the other repositories,** read before and after the walk (counts by the form used):

  | Repository | Texts | Before the walk | After the walk |
  |---|---|---|---|
  | MagicBot | 11 | 48 by name and 2 by URL, naming `KotlinBottools` | 74 by name and 2 by URL, naming `KotlinBottools-next` |
  | WebTools | 137 | 4 by name and 2 by URL, naming `KotlinBottools` | 2 by name naming `KotlinBottools`; 2 by name and 2 by URL naming `KotlinBottools-next` |
  | `SpartanLaboratories/.github` | 12 | none | none |

  The transfers rewrote MagicBot's and WebTools' issue texts: their hashes changed, every reference in MagicBot's now
  names `KotlinBottools-next`, and 4 of WebTools' 6 do. MagicBot's 74 references by name are all qualified with the owner. The rewrite left no edit history, so
  why its count of references by name rose from 48 to 74 is not established; nor is where the plan's estimate of 5
  citations in `SpartanLaboratories/.github` came from, whose issue texts hold none
  ([consequences §5](consequences.md#5-known-gaps)).

### 3.9 The swap

By id at every step, with unauthenticated reads by name, by id and on the web:

| After | Pre-rewrite repository (562658298) | Fresh repository (1453296798) |
|---|---|---|
| `rename-old` | `KotlinBottools-legacy`, public, not archived; all 200 | `KotlinBottools-next`, private; all 404 |
| `private-old` | `KotlinBottools-legacy`, private; all 404 | unchanged |
| `archive-old` | `KotlinBottools-legacy`, private, archived; all 404 | unchanged |
| `rename-fresh` | unchanged | `KotlinBottools`, private; all 404 |

The public window of the pre-rewrite repository ran from 2026-11-08 to 2026-11-11T06:11:18Z, the time written at
`private-old`. The settings snapshot after the renames equals B2 apart from the name and URL fields (§4).

### 3.10 Residual exposure

- **The fresh repository, authenticated:** no old tip, first-changed commit or sampled manifest blob is served, and no
  protocol-v2 `want` of an old tip is answered.
- **The legacy repository:** authenticated, every one is served; anonymously, none.
- **The fresh repository's activity feed:** no `before` or `after` id is a pre-rewrite id.
- The row for the residual report is `report-row.txt`, with the public window. The probes show that the old ids are not
  served by the fresh repository; they cannot show that GitHub has dropped the objects, that cached views are gone, or that
  nobody copied the repository while it was public.

### 3.11 The result and the close-out

`result`: every shape passed (numbers, placeholders, issues, closed issues, labels and milestone, links,
cross-repository links, identity, old URLs), with 0 refusals recorded. The close-out found the legacy repository's refs
equal to the listing taken at the mirror clone, no issue left in it, private and archived; `KotlinBottools` resolving to
1453296798; and the records' checksum lists written.

### 3.12 Tests

| Self-test | Checks |
|---|---|
| `swap.py selftest` | 564 passed |
| `scrub_check.py selftest` | 17 passed |
| `allow_tool.py selftest` | 50 passed |
| `kselftest.sh` (about four minutes) | 131 passed |

Each correction of §4 came with checks that fail on the code it replaced; runs of the new checks against the replaced
code showed every one of them failing.

---

## 4. Deviations from the plan

Section references are to the plan as the run started
([`superseded/plan-3-2026-11-11.md`](superseded/plan-3-2026-11-11.md)); [`plan.md`](plan.md) now carries each
correction.

- **The accepted ids are 26 occurrences of 3 distinct ids,** not 26 distinct ids
  ([plan, Current state](plan.md#current-state), "The 26 accepted ids"; [§7.4, S5](plan.md#s5--gate-1) and
  [S9](plan.md#s9--before-the-walk), the expected lines). The count the plan carried was of the occurrences. S5 and S9
  read the same 26 occurrences of 3 ids in the same 3 comments, and their acceptance is unchanged. The plan rests on
  [architecture §1.1](../architecture.md#11-what-the-phase-must-achieve), item 9, and its "Public material" line.
- **The push preparation reads its pull-request lists whatever separates their columns**
  ([plan §7.4, S6](plan.md#s6--the-fresh-repository), step 3; [Appendix A](plan.md#appendix-a--the-tools-and-their-runner),
  `k6-fresh.sh`). The first preparation searched the clone's ref listing for a space before `refs/pull/`, but git writes
  a tab there, so the clone's list came out empty and the comparison with the server's 3 pull-request refs stopped. Every
  pull-request list (the server's at the preparation, the clone's listing, the server's after the push) is now read by one
  function that turns the tab into a space first and leaves the merge refs out on every side, since GitHub recomputes
  those. The shell self-test's fixture gained pull-request refs, so a list that comes out empty fails it. The step rests
  on [architecture §6.4](../architecture.md#64-the-rewrite-pipeline-per-repository), stage 5.
- **Thirteen tools were corrected at S6, before anything after it ran**
  ([plan §7.4, S6](plan.md#s6--the-fresh-repository), step 7, and the stages after it; [Appendix A](plan.md#appendix-a--the-tools-and-their-runner)).
  `fresh-default`'s post check stopped because the comparison of snapshots B1 and B2 counted two fields of GitHub's
  repository representation that are not settings: the language GitHub detects, which became `Kotlin` with the push, and
  a clone token GitHub hands out on every read. The tools the later stages ran had faults of the same kinds, and were
  corrected with it:
  - `swap.py`: the snapshot comparison leaves out the fields that are not settings, and no snapshot stores the token; a
    placeholder's guard reads the highest number as the largest of all numbers, not as the newest issue (a transferred
    issue keeps its creation time, so after the placeholder at 20 the guard of 30 would have read 20), and a placeholder
    created but still open is resumed by its guarded close alone; `ms-fresh` waits for `baseline`, which records the
    milestone's description; its files are written with LF, so S9's comparison of the accepted ids with S5's holds; texts
    are compared with CRLF and trailing blanks left out on both sides, and references in any letter case; an issue's
    `stateReason` counts only when it is closed on either side; a stop names the title, labels and milestone fields
    without their values; its records are split on LF only; `result` keeps how a closed issue first arrived; the
    accepted-ids line takes 26 occurrences of 3 ids in 3 comments as the design's numbers;
  - `klib.sh`, `kr1-preflight.sh`, `kr3-premove.sh` and `kr3b-verify.sh`: across the move, the untracked and ignored
    files are compared by name outside the folders an open IDE, the Kotlin daemon and Gradle write to (`.idea`,
    `.gradle`, `.kotlin`, `build`, `out`) and counted inside them; `kr3-postmove.sh` and `kr3b-verify.sh` compare a
    branch with its target yes or no, so a stop names no commit;
  - `kr5-proof.sh` fails when the history walk does not complete or an id file is empty;
  - `k7-exit.sh` compares the manifest without CR; `k12-gate2.sh` checks the scrub count's exit status; `k14-residual.sh`
    records a `want` answer it cannot read as unreadable, not as "not served", and ends the public window at the time
    `private-old` wrote; `k16-close.sh` stops on a failed read of the legacy repository's issue listing instead of
    counting it as none, and leaves the pull-request merge refs out of its listing comparison;
  - `kselftest.sh` gained the checks for each, and its check that the fetch fetched nothing now compares the
    remote-tracking refs before and after.

  Three of these make a check a little more lenient, each for a stated reason: the item comparison no longer sees a
  change of line endings or trailing blanks alone, which a transfer is not shown to preserve and which is not a change of
  content; the IDE and build folders are counted rather than compared by name, because an open IDE writes there at any
  moment and `reset --hard` never touches an untracked file; and the merge refs are left out, because GitHub recomputes
  them. The snapshot comparison rests on the research's read-back after the push
  ([Request B2](research/fresh-repository-settings.md#request-b2-after-the-push-set-the-default-branch-and-read-back)), whose expected differences did not hold alone;
  the walk's checks on [architecture §7.4](../architecture.md#74-the-number-walk-and-the-links); the realignment's on
  [§9.2](../architecture.md#92-procedure-and-the-push-safety-proof).
- **S9 creates the milestone after `baseline`** ([plan §7.4, S9](plan.md#s9--before-the-walk)). The plan created
  `labels-fresh` and `ms-fresh` before the census and the baseline, but the milestone's description is the source's,
  which only `baseline` records; created first, it would have had an empty description. S9 ran `labels-fresh`, the
  census and the baseline, then `ms-fresh`, and the milestone carries the source's description. The step rests on
  [architecture §7.4](../architecture.md#74-the-number-walk-and-the-links).
- **The exit tests' scans read `RESULT: FINDINGS`** ([plan §7.4, S7](plan.md#s7--fresh-mirror-and-exit-tests), the
  expected output, which named `RESULT: CLEAN`). One default rule found 2 findings in 1 kept file (§3.3). The plan's rule
  for that case held: recorded by rule id and count, a hold on the publication unit's visibility change, not a stop of
  this unit; no custom rule found anything, and there was no `private-key` finding, which would have stopped S7. This is the outcome of [assumption A13](plan.md#assumptions), in
  [consequences §5](consequences.md#5-known-gaps). The exit tests rest on
  [architecture §6.4](../architecture.md#64-the-rewrite-pipeline-per-repository), stage 8.
- **S8 has no stage check of its own** ([plan, Shape of the procedure](plan.md#shape-of-the-procedure), whose table marks
  S8 as a checked stage). The walk tool's stage checks cover S1, S6 and S9 to S13; S8's verdict is the scripts' `STAGE`
  lines on both scratch clones and `check post realign-scratch`, which runs the push-safety proof on the clone. The stage
  rests on [architecture §9.2](../architecture.md#92-procedure-and-the-push-safety-proof).
- **The references in the other repositories** ([plan, Risks and edge cases](plan.md#risks-and-edge-cases), "Wire and
  compatibility", which counted 49 citations in MagicBot, 6 in WebTools and 5 in `SpartanLaboratories/.github`;
  [assumption A7](plan.md#assumptions)). The counts read before the walk were 50, 6 and none, and the transfers rewrote
  MagicBot's and WebTools' issue texts to name `KotlinBottools-next` (§3.8). The estimate rests on
  [architecture §12.2](../architecture.md#122-other-repositories).
- **S15's archive of the untracked and ignored files uses `tar --force-local`** ([plan §7.4, S15](plan.md#s15--this-checkouts-realignment),
  the first block, both `tar` lines). GNU tar reads an archive name with a colon as a remote archive, and the archive's
  path under `%USERPROFILE%` starts with a drive letter; `--force-local` keeps it a local file. The step rests on
  [architecture §9.2](../architecture.md#92-procedure-and-the-push-safety-proof).
- **Last corrections before the close-out** ([plan, The output rule](plan.md#the-output-rule);
  [Appendix A](plan.md#appendix-a--the-tools-and-their-runner)). `swap.py`'s post checks of `realign-scratch` and
  `realign-main` name the clone by its tag (`scratch`, `main`), never by its path; `kselftest.sh` gained two checks (a
  preflight run again clears the "before" sets a move without its reset left behind; the push-safety proof answers 1 when
  the changed-commit id file is empty). The settings snapshots B1 and `after-push` no longer hold the clone token, which
  is not a setting the tool compares, and the run's checksum list was refreshed for them. A script of the replaced plan
  that no tool references was removed from the workspace. The output rule rests on
  [architecture §1.1](../architecture.md#11-what-the-phase-must-achieve), item 9.
