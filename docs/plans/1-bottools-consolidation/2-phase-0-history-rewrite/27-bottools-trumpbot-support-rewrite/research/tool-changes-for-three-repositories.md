# What the workspace tools must change for BotTools, TrumpBot and Support: findings

**Question.** What must change in the workspace tools for BotTools, TrumpBot and Support, and which recorded gap does each
change close? Tools means the GKB2 and GKB unit's 22 files in `$WS/tools/g26/`, the corrected runner, and the earlier
tools they call or that the clone replacement reuses.

**Decision it informs.** The scope of the tools part and its seams with the rewrites, the residual measurement and the clone
replacement; whether the rewrite steps and the residual steps are separate tool sets; the parameter rows; which gaps are
closed where and which guard an irreversible write.

**Requirements the answer meets.** Nothing is run and nothing in the workspace, the data folder or the TrumpBot clone is
changed. Counts and file names only: no pre-rewrite id, purged blob id, name, secret or machine-local path. `$WS` is
`%USERPROFILE%\BotWS`, `$DATA` is `%USERPROFILE%\BotLegacyData`, `$TOOLS` is `$WS/tools`.

---

## 1. Bottom line

- **Derive a new self-contained tool folder, `$WS/tools/g27/`, from `g26/`; leave `g26/` as it ran.** Nearly every file
  changes (a parameter row has columns the tools read by position, the push is one ref in a dozen places, the three
  repositories differ in visibility, probes and hooks, and the 13 documentation points touch almost every file), so a folder
  of changed files is the whole folder. In-place edits would break the earlier unit's pins (`g26tools.sums`, its Appendix B),
  and the earlier save step (`S0.save`) begins with `rm -rf "$T/g26"`, so a second save into the same folder would erase the
  files that ran.
- **The tools part delivers four tool sets from one folder:** the rewrite set (`S0`, `p1` to `p8`, `preset`), the residual
  set (a readiness check, `p9`, `s3-close`), the clone set (the preparation unit's two clone blocks, rebuilt as a request
  procedure and a builder), and the self-test split by test kind. Stage 9 and the feed reads become their own set by moving
  the repository-order gate from `p9` to `p8` and adding one start condition: all three repositories have passed `p8`.
- **Four changes are new to the recorded gaps and block a run if missed.** (1) `p2-control.sh`, `s0-ready.sh inputs` and
  `s3-close.sh reads` assume a positive control with probe arguments and a `gitleaks-control.txt` record; BotTools and
  Support have neither (their control is "the six owned rule ids are absent", and they have 5 earlier records, not 6).
  (2) `s0-ready.sh repos`, `p7-verify.sh` and `s3-close.sh reads` hard-code "public, no hooks"; BotTools has one webhook and
  TrumpBot and Support are private. (3) `p9-residual.sh` runs anonymous probes unconditionally. (4) The clone blocks use plain
  `git` against a private repository (the system configuration's helper is the credential manager, not `gh`), stop on
  the clone's two hooks and exclude entry, and archive all 59 untracked or ignored files, 55 of which are the graph the fresh
  clone must not carry.
- **The two-branch push touches `g26_req.py`, `p6-push.sh`, `g26lib.sh` and `preset.sh` under both forms, and `p5`/`p7` only
  lightly.** One push of both refs (form i) changes the request's argument assembly, the tally, the classes (a partial
  state needs its own class) and the read-back; one push per branch (form ii) keeps the one-ref request and classifier and
  adds a branch ordinal to every record name, key, counter and marker. Both are described in §5 without choosing.
- **The parameter rows** (§6): BotTools 9 list lines, 2 heads, 2 pull refs, 28 commits on every ref, residual 39, probes
  none; TrumpBot 23 list lines, 2 heads, 0 pull refs, 9, 0, the nine probe arguments of `s8-row.sh`; Support 6 list lines,
  1 head, 0, 1, 0, none. Three columns are added: visibility, default branch, hooks. The repository ids are the one value
  not obtainable offline.
- **Every recorded gap and follow-up is closed before the first push, in the tools part** (§7). The ones that guard an
  irreversible write are the reply classifier and the stored reply's form, the class table against the classifier, the
  untested stops of `p5`, `p6` and `preset`, the grant check, and the self-test's one-shell stand-in.

---

## 2. Current state the changes start from

- **`g26/` holds 22 files,** 18 scripts (17 shell, 1 Python) and 4 data files, each equal to its pin
  (`g26tools.sums`, 21 rows, and `tools.sums`, 21 rows for the reused tools; both tables are in the earlier plan's
  Appendix B). The corrected runner `tools/run-stage.sh` (1,428 bytes) is in place. The earlier tools the unit calls are at
  their pins.
- **The unit ran once, GKB2 then GKB,** each repository through `p1` to `p9` with `p9` and the close-out run right after the
  push. The chain between repositories is the `needs` column read by `prev_ok`, which tests for the other repository's
  **`p9`** marker.
- **The three repositories as the clone listings and the backups record them** (counts read from
  `DATA/rewrite/<repo>/ls-remote-at-clone.txt` and the backup mirrors, read only):

  | | BotTools | TrumpBot | Support |
  |---|---|---|---|
  | Visibility | public | private | private |
  | Heads; pull-request refs (non-merge); tags | 2; 2; 0 | 2; 0; 0 | 1; 0; 0 |
  | Default branch (the listing's `HEAD` equals) | `main` | `main` | `main` |
  | Commits on every ref in the backup; roots; merges | 16; 1; 2 | 11; 1; 1 | 2; 1; 0 |
  | Commits reachable from the pull-request heads, and only from them | 13; 0 | none | none |
  | Does the root commit's tree hold a purged path | yes (3 of 27 files) | yes (174 of 228) | yes (7,432 of 7,461) |
  | Kept paths; of them: binary files, credential-like names, names Windows git rejects (`expect_check.py`'s own tests) | 82; 0, 0, 0 | 56; 0, 0, 0 | 29; 0, 0, 0 |
  | Purge list: lines, bytes | 9, 107 | 23, 241 | 6, 50 |
  | Expectation row (`expected_rows.txt`) | present | present | present |

- **The clone** (`%PROJECTS%\TrumpBot`, read with `git --no-optional-locks`): local branch `main` only plus remote-tracking
  `main` and `feature/pokercommand`; `git ls-files -o` lists 59 files (4 under `.idea/`, 55 under `graphify-out/`; three of
  the four are untracked, one is ignored, and all 55 are ignored); two non-sample hooks, `post-checkout` and `post-commit`;
  one non-comment line in `.git/info/exclude`; local configuration keys `core.*`, `remote.origin.fetch|url`,
  `branch.main.merge|remote`, `submodule.active`, `lfs.repositoryformatversion`; one pack, no loose objects, 394 objects;
  the system configuration's credential helper is `manager`.

---

## 3. Inventory: what each tool does, what it assumes, what changes

Parts: **T** the tools part (builds and saves), **R** the rewrites (stages 1 to 8), **M** the residual measurement (stage 9
and the feed reads), **C** the clone replacement. "One branch" means a column or variable that holds a single branch;
"public" means a check or probe that is only right for a public repository; "named" means the text names GKB2, GKB, issue 26
or its branch.

### 3.1 The 22 files of `g26/`

| File (bytes) | What it does | Assumes about a repository | Change | Parts |
|---|---|---|---|---|
| `run-stage.sh` (1,428) | The runner: stage name and plain-word arguments in the run log, status passed through | Nothing; a name may carry a folder (`g26/p1-prerun`) | None in code (a folder `g27/...` passes its name test). Not saved again: the file in `tools/` is the pinned one. Header: the `<name>` case (point 5 of §7.3) | R, M, C |
| `g26lib.sh` (14,270) | Constants, `row`, step markers, ref listings, `server_state`, `every_ref_commits`, route classification, probes, `batch`, feed counts | One branch (`P_BRANCH`, `server_state`, `EXPECT_TALLY` `forced=1`); the order gate is `.p9`; `JOB`, `ISSUE=26`, folders `g26`; `row` reads 13 positional columns | Rename (`g27lib.sh`, folder, `JOB`, `ISSUE`); `row` reads the added columns; `P_BRANCH` becomes a list with a default; `server_state` per branch; `prev_ok` takes a marker name; `EXPECT_TALLY` from the branch count (form i) or kept (form ii); a private-aware probe selection; a void check on failed closing controls gets its case (§7.2); contract comments on `refs_listing`, `server_heads_tags`, `server_pulls`, `run_batch` | T, R, M |
| `ganon.sh` (5,264) | Anonymous probes: `anon_web`, `anon_api`, `api_budget_ok`, `anon_need`, `feed_read` | Public repository; one REST budget for the whole run | Used for BotTools only. Budget reading gets a `RECORD` at the end of a set (§7.2). The `feed_read` comment is corrected (point 6) | M |
| `g26_req.py` (25,213) | Builds the push request, stores replies, classifies the outcome; own self-test (59 checks) | One ref; key `push-<repo>[-r<n>]`; fixed stream names `push.txt` and `push.err`; `--atomic` forbidden; `len(flags)==1`; parse of `dry rc=` and `push rc=` only at the start of a line | §5; §7.1 (reply form, classes); points 1 and 2 of §7.3 | T, R, C (pattern) |
| `params.txt` (2,213) | The parameter table, GKB2 and GKB rows | One branch per row; public; every row has a probe list | New table with three rows and added columns (§6) | T, R, M |
| `grant.txt` (714) | The grant text the readiness step compares with | Issue 26, its branch, two targets, two actions | New text: this issue, its branch, three targets, the push actions and the clone replacement action | T |
| `g26tools.sums`, `tools.sums` (1,720; 1,908) | Pins of the 21 saved files and of the reused tools | The earlier files | New `g27tools.sums`; `tools.sums` is read as it is (the reused tools and the runner are unchanged) | T |
| `s0-ready.sh` (10,145) | `runner`, `tools`, `pins`, `inputs`, `repos`, `grant` | `inputs`: six earlier records, probe text found once in `s8-row.sh`; `repos`: public, no hooks, secret scanning and push protection disabled, one branch protected-check; `grant`: both target names written in the step, issue 26 and its branch | §4 | T, R |
| `p1-prerun.sh` (2,670) | List proof, pre-run checks, `N_BEFORE`/`R_BEFORE`, entry counts | The `needs` repository's `.p9`; a push not yet requested | Gate marker from the table; per-branch push marker for form ii; `R_BEFORE = P_HEADS + P_PULL` already generic | R |
| `p2-control.sh` (2,835) | Positive control on the untouched backup, compared line for line with the earlier records | A probe list that is non-empty, a status 1 (findings), a `gitleaks-control.txt` | BotTools and Support: no probes, status 0 with `RESULT: CLEAN`, six owned rule ids absent, no control file to compare | R |
| `p3-rewrite.sh` (1,741) | The one `filter-repo` call | None | None in code | R |
| `p4-postrun.sh` (5,265) | Post-run checks, outputs copied, the scan before the push | Nothing repository-specific (`P_HEADS`, `R_*`) | None in code. Checked offline: every root changes in all three (§2), so `commit-map changed rows = T` holds; kept paths pass `expect_check.py`'s tests | R |
| `p5-prep.sh` (3,017) | Push preparation: local pull refs deleted, tally written, server heads and tags equal the old column, pull refs recorded, request built | Generic over heads; the request builder takes one branch; baseline of webhook deliveries is absent | §5; webhook baseline for BotTools (§8) | R |
| `p6-push.sh` (6,451) | `request`, `reply`, `check` of the one write | One branch, one stream set, one key, one class file | §5 | R |
| `p7-verify.sh` (2,470) | Per-ref verification on two channels | Generic over heads; the default branch is `P_BRANCH` and `private` must be `false` | Default branch and visibility from the row; webhook count read | R |
| `p8-exit.sh` (5,874) | Fresh mirror and exit tests, residual counted where pull refs exist | Generic over heads; counts from the row | None in code. BotTools takes the `else` arm (residual 39 recorded by `note`) | R |
| `p9-residual.sh` (7,347) | Probes and feeds, report row | Public: `anon_need 28`, anonymous batches, anonymous feeds; `need p8` | Visibility switch (§8); budget `RECORD` | M |
| `s3-close.sh` (3,904) | `feeds`, `reads`, `record` | Public, `needs` per repository, six earlier records, `feeds` and `record` not safe to repeat | Visibility switch; five or six records; each step safe to repeat (§7.2) | M |
| `preset.sh` (2,005) | Reset after a stop before the push | One branch at its old tip; a fixed list of files to remove | Every branch at its old tip; the file list gains the per-branch records | R |
| `gdocs.sh` (3,718) | The landing's document checks `ids`, `paths`, `gate`, `scan` | `ids` takes the repositories named; the gate's corpus name `g26docs` | Corpus name; no other change. (`allow_tool.py`, `privacy_gate.py`, `scrub_check.py`, `oldid_refs.py`, `scrub_expressions.py` were not read: Gaps) | T |
| `gselftest.sh` (39,673) | The self-test: stand-ins for `git`'s network, `gh`, `curl`; fixtures made from the scanner's canary; ten fixture repositories | Reads the GKB2 and GKB rows by name for probe arguments; `master`; one ref; public; the request service's stand-in runs each entry in its own shell; one script, no selector, 7.5 minutes | §7.2 and §7.3 | T |

### 3.2 The earlier tools the three parts call

| File | What it does | Assumes | Change | Parts |
|---|---|---|---|---|
| `env.sh` | Paths, `gitnet` (git with `gh auth git-credential` as the only helper), `repo_env` | `REPOS_STATIC` already holds BotTools, TrumpBot, Support; `CLONE=$PROJECTS/$1` | None | all |
| `lib.sh` | `expect`, `prove_removed` (writes two scratch files in `$WS/tmp/`), `plan_from_commit_map` | The untouched backup `$BK` as control | None; the shared `tmp/` use is recorded, not changed | R, C |
| `plib.sh` | `field`, `list_full` | None | None | R |
| `klib.sh` | `note`, `klisting`, `KVOLATILE`, `kfresh_identity` | Public repository (`kfresh_identity` is for the swap unit, not called here) | None | R, M |
| `expect_check.py` | Compares a mirror with its expectation row; tests binaries, credential-like and Windows-unsafe names | Heads, tags, pull refs generic | None. The three repositories' kept paths give 0, 0, 0 on its tests (§2) | R |
| `kept_findings.py`, `secret_scan.py`, `gitleaks.toml`, `gitleaks.exe` | Kept-file findings by rule; scan and control; the pinned configuration and binary | `control` takes probe arguments | None | R |
| `porcelain_tally.awk` | Counts porcelain status lines into one tally | Generic per status (`forced=2` for two forced refs) | None | R |
| `s8-row.sh` | Never run again; its `case` holds the three repositories' probe arguments, which `s0-ready inputs` proves the table equal to | TrumpBot has nine probe arguments; BotTools and Support have `PROBES=""` | None; read as data | T |
| `expected_rows.txt` | Expectation rows for the five static repositories | Rows exist for all three | None (256 bytes, pinned) | R, M |
| `trumpbot-1-prepare.sh`, `trumpbot-2-replace.sh` | The clone's checks, archive, move, fresh clone, restore, proofs. Two blocks without a header; they rely on `repo_env TrumpBot` and `lib.sh` being loaded | One branch locally; no hooks, no exclude; plain `git`; the move is a same-volume `mv` into `$WS/TrumpBot-old`; archive of every untracked or ignored file | §9 | C |
| `lockprobe.py` | Counts files that cannot be opened with no sharing | Windows | None; used by the clone checks (the volume question is separate) | C |
| `untracked_collisions.py`, `realign-*.sh`, `kr*.sh`, `k*.sh` | The in-place realignment of the swap unit's clone and the swap's own stages | Not called by this work | None; not reused | |
| `k0-ready.sh`, `save-tools.sh` | Pin the earlier scan configuration; would write earlier tool versions back | | Never run | |

---

## 4. `s0-ready.sh`, `grant.txt` and the readiness for three repositories

What each step needs to differ by repository, read from `s0-ready.sh`:

- **`save`** (not in the file; the plan's typed call): extract the new plan's Appendix A into `$T/g27` and count the files. It
  must not `rm -rf` anything but `g27`.
- **`runner`**: not needed; the corrected runner is already in place. The step reduces to checking its size and sha256.
- **`tools`**: the same loops over `tools.sums` and `g27tools.sums`, `bash -n` over `g27/*.sh`, `ast.parse` over `g27/*.py`.
- **`inputs`**: `expect "the six earlier records exist" 6` fails for BotTools and Support (5; no `gitleaks-control.txt`).
  The probe-text check (`grep -c -F -e "$P_PROBES" s8-row.sh` equal to 1) matches every line of the script when the
  probes are empty, so an empty column must be a sentinel with its own check ("`s8-row.sh` assigns `PROBES=""` for this
  repository"). The record list that `records-at-s0.<repo>.sums` pins takes the five or six files.
- **`repos`**: its first `expect` hard-codes `private false`, `has_pages false`, `forks 0`, secret scanning and push
  protection `disabled`, and `P_BRANCH` as the default branch. It also expects zero hooks (BotTools has one active webhook)
  and checks one branch's `protected` flag. Needed: visibility, default branch, hook count (1 for BotTools, 0 for the other
  two) and the scanning pair from the row; the protected flag over every branch; for the two private repositories the
  scanning values are not in any record read here (Gaps) and are read once and then written into the row.
- **`grant`**: names `JOB`, issue 26, the earlier branch and the two targets inside the step, and requires the actions
  `push-mirror` and `force-pushing`. It must read the issue, branch, targets (three) and actions from `grant.txt` or the row
  instead, and add the clone replacement's action. The earlier unit's case list had no case for a missing or repeated
  section, a missing date or end line, the branch missing, a revoked grant or the other target missing (§7.2).
- **`pins`**: unchanged.

---

## 5. The two-branch push under each form

No choice is made here. Both forms assume the request keeps the earlier shape: a procedure of standalone entries that run as
one shell, guards that end the shell, counts and fixed markers only, the stored reply classified from statuses and counted
markers. The literal output of each failure (what the porcelain prints for a stale lease, a refusal, a lost connection) is
the separate two-branch push research's; the places in the tools that read it are named here.

### 5.1 What is the same under both forms

- The row's `branch` column holds a comma-separated list (the first element is the default branch unless a `default` column
  is added); `row` exports `P_BRANCHES` and `P_DEFAULT` in place of `P_BRANCH`.
- Guards 1 to 4 of the procedure (mirror and origin, local refs equal the new column, server heads and tags equal the old
  column, server pull refs equal the record) are already written over all heads and need no change.
- `p5-prep.sh` already checks every head against `ref-map` and records the server's pull refs; only its `build` call and the
  webhook baseline change.
- `p7-verify.sh` already compares the whole listing of heads on two channels, so it is already per-ref; it changes only for
  the default branch and visibility.
- `porcelain_tally.awk` needs no change.
- The argument assertions of `argv_offenders` and `cmd_build` (no `--force`, `-f`, `--mirror`, `--all`, `--delete`,
  `--prune`, no leading `+`) stay; they are derived from the words of each entry's `ARGS` array.
- The per-branch state `old`, `new` or `other` (from `server_state`) becomes a vector, one value per branch.

### 5.2 Form (i): one push, both refspecs, one explicit lease each (with or without `--atomic`)

| File | Change |
|---|---|
| `g26_req.py` request build | `PREP` assembles `ARGS` with one `--force-with-lease=refs/heads/<b>:$OLD_<k>` and one `refs/heads/<b>:refs/heads/<b>` per branch; each `OLD_<k>` is read from `ref-map` and tested for the 40-hex shape; `READBACK` loops over the branches and prints one `branch <name> read back: at the old tip|at the new tip|at another commit` per branch |
| `g26_req.py` argument assertions | `FORBIDDEN` loses `--atomic` only when the row says atomic; new assertions: exactly N leases and N refspecs, each lease names its own refspec's ref, `--atomic` present if and only if the row says so; `args_of` and `argv_offenders` stay pure; the self-test's "the push is one refspec" and "the lease names the branch" become N-ref cases |
| tally | `EXPECT_TALLY` for a clean push of two forced refs is `forced=2 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0 done=1 pull_lines=0 other_refs=0 bad=0`: derived from `P_HEADS` in `row` instead of the constant; `same` compares the flag set of the dry run and the push (`len(flags(out)) == 1` becomes `== N`) |
| classifier | `classify` gains the forced count: a push that exits non-zero with some refs updated (`forced` between 1 and N-1) is a new class, `partial`, which is never resent; the marker set gains one entry if the atomic-failure wording is a fixed text (from the push research); the `branch-moved` rule (`cr >= 1 and st >= 1 and gh == 0`) counts two `[rejected]` lines under `--atomic` and still holds |
| `p6-push.sh` `request` | The state is a vector: all `old` sends or resends (by class, as today); all `new` is `SKIP`; any `new` with any `old` is a stop that is never resent (hand back; recovery is a new request by hand for the stale branch under its own lease); any `other` is a stop |
| `p6-push.sh` `check` | `pushed` requires every branch at its new tip with the pull refs unchanged; `transport` with a mixed or foreign read-back stops (as today for the one ref); `partial` stops with the vector in the line |
| `g26lib.sh` | `server_state` returns the vector; `row` derives the tally; `pushed_before` and `mark` unchanged (one request) |
| `preset.sh` | The refusal tests every branch at its old tip |
| `gselftest.sh` | A fixture of two branches (and, for BotTools' shape, two hidden pull refs); cases for: both leases hold; one lease stale before the push (guard 3) and between the guards and the push (the lease refuses, nothing sent, with and without `--atomic`); one ref refused by a hook; a lost connection at the dry run; a push that landed and whose answer was lost; each of the vector states in `request` and `check` |

### 5.3 Form (ii): one push per branch, the existing one-ref form

Two sub-forms: two requests, or two pushes inside one request (12 entries: the four guards once, then dry run and push for
branch 1, then the one-ref guard, dry run and push for branch 2).

| File | Change |
|---|---|
| `g26_req.py` | `build REPO BRANCH [KEY]`; the key and file names gain a branch ordinal (`push-<repo>-b<k>[-r<n>]`) because the key regular expression, the reply files `push-<repo>-<n>.txt`, `reply_files` and `pushed_before` (`^push-$REPO-`) would otherwise count the other branch's replies; stream files, `.key`, `.class` and `requests/push-<repo>.json` become per branch (entry 5 deletes `push.txt` and `push.err` before its dry run, which would delete the first branch's streams). One entry set, `EXPECT_TALLY` and `len(flags) == 1` unchanged; `FORBIDDEN` unchanged |
| two pushes in one request | The status lines carry the ordinal (`push[1] rc=`, `dry[2] rc=`); `parse_rc` and `cmd_classify` classify each push from its own lines and streams; a stop after push 1 landed and before push 2 leaves the state `1 new, 1 old`, which the reply makes visible |
| `p6-push.sh` | `REPO BRANCH request|reply|check`; per-branch `n`, `last`, `KEY`; marker `p6.<branch>`; push 2's `request` requires push 1's marker; a branch at its old tip with its own last class decides sends, as today |
| `g26lib.sh` | `server_state BRANCH`; `pushed_before BRANCH`; `p7` needs every `p6.<branch>` marker |
| `p5-prep.sh`, `p7-verify.sh` | `p5` builds one request per branch (or one with 12 entries); `p7` runs once, after both pushes, and the mid-state between them is never verified by it |
| `preset.sh` | Refuses once any branch's push was requested |
| `gselftest.sh` | The branch ordinal in the existing push cases; a case where push 2 is refused after push 1 landed; the same one-shell stand-in as form (i) (§7.2, item 8) |

### 5.4 What the two forms cost the tools, side by side

| | Form (i) | Form (ii) |
|---|---|---|
| Request builder | argument assembly, assertions, tally and read-back change | branch parameter threaded through |
| Records | one set of names | every record, key, counter and marker gains a branch ordinal (the key, the reply files, the four stream files, the class and key files, the request file, the step marker) |
| Classifier | one new class (`partial`), possibly one new marker | the existing classes per branch; `partial` becomes a state between two requests |
| Resend rule | vector states | per branch, as today |
| Cases to add | the vector states and the atomic and non-atomic stale-lease and refusal cases | the ordinal in every existing case and the 2-after-1 cases |
| Support | the one-ref case is N = 1 of the same code | unchanged |

---

## 6. The parameter rows

Columns today: `repo id branch needs list_lines list_size list_sha heads pull_refs every_ref_commits residual sample_max
probes`. The `branch` column holds a comma-separated list (push order); `needs` holds the full marker name instead of a
repository name (`BotTools.p8`), so the gate is the table's. Added columns, all policy that the tools otherwise hard-code:
`visibility` (`public`|`private`), `default` (the default branch), `hooks` (the hook count `S0.repos` expects). A fourth,
the scanning pair, is added once the private repositories' values are read (Gaps).

| Column | BotTools | TrumpBot | Support | Where the value comes from |
|---|---|---|---|---|
| `id` | read at the tools part | read at the tools part | read at the tools part | `gh api repos/<owner>/<repo> --jq .id`, as for GKB2 and GKB; not in any document or record read here |
| `branch` | `main,Working-Branch` | `main,feature/pokercommand` | `main` | `ls-remote-at-clone.txt` (heads), and the order the push request fixes |
| `visibility`, `default`, `hooks` | public, `main`, 1 | private, `main`, 0 | private, `main`, 0 | the parent design's inventory; the clone listings' `HEAD` line; the README's current state |
| `needs` | `-` | `BotTools.p8` | `TrumpBot.p8` | the order BotTools, TrumpBot, Support; each push after the previous repository is verified |
| `list_lines list_size list_sha` | 9, 107, `f2d66a9b...ea7e` | 23, 241, `1af096ca...4ff6` | 6, 50, `37a8f46e...ca13` | `$WS/lists/<repo>-purge.txt`; the line matches the list's row in `DATA/run/lists/SHA256SUMS` (read: 1 row each) |
| `heads` | 2 | 2 | 1 | count of `refs/heads/` rows in `ls-remote-at-clone.txt` |
| `pull_refs` | 2 | 0 | 0 | count of non-merge `refs/pull/` rows in the same file |
| `every_ref_commits` | 28 (15 rewritten plus 13 reachable only through the pull-request refs) | 9 | 1 | derived by `every_ref_commits` from the untouched backup: the expectation row's commits after, plus `git rev-list --count --glob='refs/pull/*/head'` on the backup. The derivation is valid because every commit changes (all three roots hold a purged path), so none of the 13 old commits is shared with the new history |
| `residual` | 39 | 0 | 0 | expectation row: manifest minus the pinned variant's manifest (39 - 0); the pinned variant exists for BotTools only |
| `sample_max` | 60 (the manifest holds 39, so all 39 are sampled) | 60 (199 blobs, step 4, 50 sampled) | 60 (7,259 blobs, step 121, 60 sampled) | the parent design's bound of at most 60; sampled by `p9`'s ceiling division |
| `probes` | none (a sentinel) | the nine probe arguments of the TrumpBot arm of `s8-row.sh` | none (a sentinel) | `s8-row.sh`; `S0.inputs` proves equality (BotTools and Support: the arm `PROBES=""`) |

The three rows' expectation rows (commits, pruned, after, paths, blobs kept and total, manifest, shared, largest blob,
wrapper jar, pinned variant) stay in `expected_rows.txt` as they are, so a value has one source.

---

## 7. Gaps and follow-ups mapped to files and parts

All are closed in the tools part, before the first push. **W** marks an item that guards an irreversible write (a force-push,
or the clone replacement's move and deletion), directly or by gating the mirror that is pushed. **P** marks the part that
needs the change at run time. An item with neither mark protects measurement, records or documents.

### 7.1 The reply classifier and the shape of the delivered reply (W)

- **Files:** `g26_req.py` (`parse_rc`, `cmd_classify`, `cmd_reply`, `classify`), `p6-push.sh` (`reply`, `check`), the self-test.
  **P:** R (three pushes), C (the clone request's reply, classified the same way).
- **What the protocol states.** The reply is one line and a JSON block `{v, id, attempt, reply, lane, position, result,
  reason, waitingOn}`; `reply` is `ack`, `progress`, `done`, `rejected`, `needs-user`, `needs-rework`, `stopped` or
  `warning`; for a procedure that stopped on a check, `stopped` carries `result.step` and `result.state`. The protocol
  names no field that holds a procedure's printed lines, so the shape the earlier run met (one document holding the lines as
  list entries on one line) is not specified there.
- **Change.** `cmd_reply` takes the reply as delivered, extracts the printed lines from every string entry of the JSON
  `result`, splits each on newlines, and stores them one per line behind the `status=` header; if the text is not JSON it
  is stored as it is. `cmd_classify` stops plainly (`STOP  the reply holds neither a status nor a printed line it can
  read`) instead of classing an unreadable reply `stopped-by-guard`. `parse_rc` reads `dry rc=` and `push rc=` at the start
  of a line only after that normalisation. A case feeds a reply in the delivered form for each of: pushed, refused with the
  branch at its old tip, guard stop, transport, and a stored reply from a `stopped` envelope.
- **Why it guards a write.** A false stop after a push that landed makes `request` answer `SKIP` wrongly; a refusal read as a
  guard's stop makes `request` answer `PROCEED` for a resend. Neither can overwrite a moved branch (each resend runs the
  guards and pushes under the lease), but the class table is the rule for repeating a push.

### 7.2 The other recorded gaps and follow-ups, by file

| Item | Files | Change | Guards a write | Part |
|---|---|---|---|---|
| The table of classes and the classifier differ for a reply with a dry-run status and no push status (deviation 13) | `g26_req.py` `classify`, `cmd_classify`; the plan's class table | One rule in both, with the reply's stage stated in the docstring; a case for a dry-run stop with status 0 (a guard of entry 6) and for status 1 and 128 | W | R, C |
| Untested stops: `p6 request` for a branch at its old tip whose last class allows no resend | `p6-push.sh` | A case: last class `refused-push-protection`, branch old: `STOP ... never repeated blindly` | W | R |
| `p6 check`: `refused-rule`, `refused-unattributed`, `unclassified`; a `stopped-by-guard` or `refused-by-service` class with a read-back other than "old tip, pull refs unchanged"; `transport` with a read-back at neither tip; a `pushed` class whose read-back is not the new tip; the incomplete-scan record | `p6-push.sh`, `g26_req.py` | A case for each arm; the incomplete-scan `RECORD` | W | R |
| `request`'s stops for an unreadable server branch and for pull refs that differ from the record; `cmd_classify`'s stops for no stored reply and for unreadable streams | `p6-push.sh`, `g26_req.py` | A case for each | W | R |
| `p5`: every stop but three; `p2`: every stop but one | `p5-prep.sh`, `p2-control.sh`, self-test | A case per `expect` and per `STOP` (the rule: one case for every `expect` and every `STOP` of a step script) | W (`p5` guards the request; `p2` gates the mirror) | R |
| `p1`: a push already requested, mirror or backup that differs, the pre-run checks, a list entry that counts no commit | `p1-prerun.sh` | A case each | W (the repetition guard) | R |
| `p3`, `p4`: a count that differs; a manifest blob that survives | `p3-rewrite.sh`, `p4-postrun.sh` | A case each | W (they stop a wrong history before the push) | R |
| `preset.sh`: the refusal when the server's branch left its old tip; `need` out of order; `row` for a repository the table lacks | `preset.sh`, `g26lib.sh` | A case each | W (the refusal) | R |
| `p7`: a head at a pre-rewrite commit, differing pull refs, a changed default branch, visibility or archive state; a disagreement of the second channel | `p7-verify.sh` | A case each | no (verification after the write; a stop hands back) | R |
| `p8`: a manifest blob reachable from a branch; a residual where there is no pull ref; a custom-rule finding; a differing residual record | `p8-exit.sh` | A case each | no | R |
| `S0.tools`, `S0.pins`, `S0.repos` (more than the passing case), `S0.grant` (missing or repeated section, missing date or end line, branch missing, revoked grant, other target missing, a differing wording), `S0.inputs` (changed mirror, the list's checksum in the data folder, records' presence, manifests' sizes, the clone listing against the table, the control probes, the every-ref count, the copy marker) | `s0-ready.sh` | A case per `expect` | W (`S0.grant` gates the request; `S0.inputs` gates the history that is pushed) | T, R |
| The void tally when a batch's closing controls fail; a status outside a route's answers (reaching `probe_ids`' own stop); a budget stop in the middle of a set; an empty set; a probed id answering "absent" with the controls passing; a feed read listing no current id; a feed status other than 200; a budget stop in a feed read; a second page; a failed read; a disagreement of `p7`'s second channel | `g26lib.sh` `batch`, `probe_ids`; `ganon.sh` `feed_read`; self-test stand-ins | A case each; the stand-in `curl` gains a closing-control switch and a status-outside-the-answers switch distinct from the opening one | no | M |
| The runner: the boundaries of a plain word (40 against 41 characters, 6 against 7 hexadecimal digits), an empty argument, the masking of a stage name, a non-zero status passed through | `run-stage.sh`, self-test | A case each (no change to the runner) | no | T |
| The document checks: `D.gate`, `D.scan` beyond the clean case, the two stops on the pending set | `gdocs.sh` | A case each | no (they guard committed public documents) | T |
| `s3-close.sh`: every stop of `reads`; a `WAIT` in `feeds` | `s3-close.sh` | A case each | no | M |
| Pure transforms with no input-to-output case: `pull_list` leaving merge refs out; `heads_new` leaving a pruned head out; `member_counts` by a 7-digit prefix; the manifest sample for a step above 1; the REST blob sample for one or two blobs | `g26lib.sh`, `p9-residual.sh` | A deterministic case each (`pull_list` and `heads_new` feed `p5` and `p7`) | `pull_list`, `heads_new`: W (inputs of the equalities that guard the push); the others no | T |
| Non-functional claims with no check: the 0.4-second pace and the 6-minute spacing (the self-test sets both to 0); the token never printed | self-test | A case that runs the wait loop once with a short gap; a case that searches every output for the stand-in's token | the token: yes in the sense that a printed credential cannot be recalled; no GitHub write | T |
| The self-test runs as one script, no selector, ends at its first failure, 7.5 minutes | `gselftest.sh` | Sub-commands by test kind (gating checks, component tests, integration tests, deterministic cases, non-functional cases), each with its own total; the group of pure functions is the quick gate run first and on every edit. The cases that run the tools against the stand-ins for GitHub are integration tests, not component tests | no | T |
| The output rule is asserted for step 9 and the runner's start line only | self-test, `p6-push.sh`, `gselftest.sh` | One assertion over every step run in the sandbox and the self-test's own output: no drive-letter path, no 40-digit id, no `Traceback`, no `No such file`. The two causes are removed: in `p6 request` the reads of `push-<repo>.class` and `.key` redirect from a file that may not exist (bash processes redirections left to right, so the `2> /dev/null` that follows never applies to the failed `<`: wrap the read in a brace group whose error stream is discarded, or test for the file); in the self-test the first call of `scrub_expressions.py` runs before its output folder exists (make the folder first). The clone blocks' `mv`, `rm` and `tar` errors name paths and are redirected to a file and counted | no | R, M, C |
| The budget's reading disagreed with the calls it counts | `p9-residual.sh`, `ganon.sh`, self-test | A `RECORD` when the reading at the step's start, less the last remaining count, exceeds the reserve; a stand-in whose `/rate_limit` reading lags | no | M (BotTools' step only: it is the only anonymous one) |
| The close-out's steps are not safe to run twice | `s3-close.sh` | `feeds` skips a repository whose `feeds2` marker and second read lines exist; `record` replaces its block (or tests for it) so the row is written once and the checksum list is of one row; a case runs each step twice | no (records) | M |
| The self-test's stand-in runs each entry in its own shell, the request service runs one (deviation 9) | `gselftest.sh` `run_proc` | Run the procedure as one shell; this matters most for form (ii) with two pushes in one request, where state crosses entries | W | T, R |
| Two scripts besides the table name repositories (deviation 7) | `s0-ready.sh` `grant`, `gselftest.sh`, headers of `p7`, `g26_req.py` | The grant's issue, branch, targets and actions come from `grant.txt` or the row; the self-test takes its probe arguments from its own fixture text, not from the real table | W (the grant) | T |
| The plan's test plan and case labels | the plan; `gselftest.sh` labels | Each check filed at its test kind; labels name a behaviour, not a function or a step (`count_markers`, `fields`, `parse_rc: dry`, `B: step 7`, `S3.reads`, `S3.record`, `request E` are renamed) | no | T |
| The plan's flowchart and ring map | the plan | Flowchart edges from the table of classes and the tools' own resends and hand-backs; the ring map from where the tools put each rule and what they comment (deviations 14 and 15) | no | T |

### 7.3 The thirteen documentation points, by file (none guards a write)

1. `g26_req.py`: `classify`'s docstring gains the `stage` parameter; one contract lists the nine classes `p6 check` switches
   on, including `refused-by-service` and `stopped-by-guard`, and `partial` or the per-branch states of §5.
2. `g26_req.py` docstrings: the module's environment line names only what the tool reads; `cmd_build` states its stop on a
   forbidden argument; `porcelain_tally` returns the stream's own tally and states its stop when `awk` fails.
3. `g26lib.sh`: contract comments on `refs_listing`, `server_heads_tags`, `server_pulls` (credentialed network reads that
   print a normalised listing and return git's status) and `run_batch` (ends the calling script on a batch that does not
   pass).
4. The environment overrides (`G26_SCRATCH`, `G26_PARAMS`, `G26_ROWS`, `G26_PACE`, `G26_FEED_GAP`, renamed for the folder) in
   every header that reads them.
5. Usage and exit statuses: `s3-close.sh`'s fallback usage and `gdocs.sh`'s `ids` usage name the repositories; `p6-push.sh`'s
   header says a `NEXT` ends with status 1 and `SKIP` with 0 and no stage line; `run-stage.sh`'s header says a stage name with
   other characters is shown as `<name>`.
6. `ganon.sh` `feed_read`: its comment matches the code (a stop on a second or third page leaves the read valid when an
   earlier page listed a current id, and each stop adds a line beyond the three).
7. A "Writes:" clause in `p1`, `p6`, `p7`, `p8`, `s0-ready.sh runner`, `gdocs.sh gate` and `s3-close.sh record`, as `p9`'s has.
8. `g26lib.sh` `want_probe`: the framing of the protocol-v2 fetch request (each packet's length in four hexadecimal digits
   that count themselves, `0001` the delimiter, `0000` the flush) and the reading of the answer by two substrings.
9. `g26_req.py` `PREP`, `MARKS`, `READBACK`: the forty-digit test on the old tip, `|| true` after `grep -c`, the `--` before
   the `- commit:` marker, the `@S@` placeholder, the leading empty `credential.helper=` that clears inherited helpers, and
   the one-line parse of a stored reply's status header.
10. `p9-residual.sh`: the ceiling division that sets the sample's step and its selection, the bounds of the REST sample, the
    all-`f` negative control, and the anonymous call counts stated as maxima (22 and 6; the run made 19 and 2).
11. The smaller items: the `awk` extraction of the grant's section, the expression that keeps one target's name from matching
    inside the other's and `sum()`, the list that purges nothing handed to `kept_findings.py`, the `:(top,literal)` pathspec
    with `--full-history`, the unexplained numbers (anonymous margin, pace, user agent, the 20- and 30-second `curl` timeouts,
    `timeout 1800`, the 360-second gap and 10-second poll), `local LC_ALL=C` in the runner, the unquoted probes variable in
    `p2`, `gdocs.sh`'s three-character strip of a porcelain status line, line breaks inside quoted arguments, and
    `gselftest.sh`'s literals split into fragments (the reason is in the plan, not the tool).
12. Regions: `g26_req.py` has one (its self-test); `g26lib.sh` has two `# ---` comments, which do not fold; `s0-ready.sh`'s six
    `case` arms have none: `# region`/`# endregion` blocks around constants, helpers, `row`, markers, listings and each arm.
13. Language-injection hints on embedded strings: the shell fragments and regular expressions in `g26_req.py`, the `awk`
    programs and the `jq` filters.

The tools do not live in a repository: the documentation is in the tool text and in the new plan's Appendix A, which holds
each file's source.

---

## 8. The split into parts, and the residual set as its own set

### 8.1 Which tool belongs to which part

| Part | Tools it runs | Gate to start |
|---|---|---|
| **T** tools | `save` (typed from the plan), `s0-ready` `tools` `pins` `inputs` `repos` `grant`, the self-test by kind, `gdocs.sh` for the landing | none; it writes nothing to GitHub |
| **R** rewrites (per repository, in the order BotTools, TrumpBot, Support) | `p1` to `p8`, `preset`, `run-stage`; earlier: `lib.sh`, `plib.sh`, `klib.sh`, `expect_check.py`, `kept_findings.py`, `secret_scan.py`, `porcelain_tally.awk` | the T part's checks pass; the previous repository's `p8` marker |
| **M** residual measurement | readiness `r0`, `p9-residual.sh`, `ganon.sh` (BotTools only), `s3-close.sh` `feeds` `reads` `record`; `g27lib.sh` probe and feed functions | all three repositories' `p8` markers exist |
| **C** clone replacement | the clone checks and builder (§9), `lockprobe.py`, `lib.sh` (`prove_removed`, `plan_from_commit_map`), `gitnet` | `TrumpBot.p8`; the push proven |

### 8.2 What changes so stage 9 and the feed reads run after the last push

- **The order gate moves from `.p9` to `.p8`.** `prev_ok` reads the marker name from the row (`BotTools.p8`, `TrumpBot.p8`).
  Today it requires the other repository's `p9`, which would hold TrumpBot's push until BotTools' probes and feeds have run.
- **`p9` keeps its own `need p8`** and gains no dependency on any other repository, so it can run for each repository in
  any order after the last push. A new `r0` step checks that all three repositories hold `p8`, the token is available and
  the anonymous REST budget covers BotTools' step plus its second feed read (28 + 8 for the step; the bound of 22 is a
  maximum and BotTools' sets of 3 commits, 3 trees and at most 3 REST blobs stay under it).
- **A visibility switch in `p9-residual.sh`:** private repositories run the four authenticated batches (commits, trees, blobs,
  the protocol-v2 `want` of each old tip) and the authenticated feed reads; they skip `anon_need`, the anonymous batches and
  `feed_read`. The report row prints the anonymous lines only for a public repository. The "feeds list at least one
  pre-rewrite id" note is counted over the reads that were made.
- **`s3-close.sh`:** `feeds` takes all three repositories and waits per repository from its own first read (`feeds1`); `reads`
  tests visibility from the row and the five or six records from the row; `record` writes the final checksum lists once, at
  the end of the whole run, because the rewrites' per-step lists (`SHA256SUMS` from `p4`, `SHA256SUMS-fresh` from `p8`) are
  written before the residual records exist.
- **Webhook deliveries (BotTools only).** The hooks list is read at `S0.repos` (1 expected). A baseline count of deliveries is
  taken in `p5` before the push; the count since the push is taken in `p7` and again in `r0`. The read is the list
  endpoint for a repository webhook, `GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries`, which returns a delivery
  summary (`id`, `guid`, `delivered_at`, `event`, `status`, `status_code`) and never the payload; the tool counts with
  `jq length` and a filter on `event`. How many deliveries a force-push of two refs makes is the separate push research's.
- **What stays in the rewrite set:** the pull-request residual for BotTools, counted by `p8` on the fresh mirror (the `else`
  arm of `p8`'s `P_RESIDUAL` test, a `note`, never a stop).

---

## 9. The clone scripts against the clone as it is today

The two preparation blocks, read against the clone (counts only):

| Check in the blocks | Result on today's clone | Why |
|---|---|---|
| "tracked files unchanged", "local branches" (`main` only), "only heads and remotes", "one worktree", "one remote, origin", "origin URL", "no stash", "no other git.exe", "no open handle", "data copy verified", "rewrite outputs present" | not affected by the hooks or the exclude entry | |
| "local config keys 0" (outside `core remote branch submodule lfs`) | passes: the keys present are `core.*`, `remote.origin.*`, `branch.main.*`, `submodule.active`, `lfs.repositoryformatversion`; the check's pattern already names `submodule` and `lfs` | |
| **"no hooks 0"** (`ls .git/hooks` minus `*.sample`) | **stops**: two non-sample hooks (`post-checkout`, `post-commit`) | the graph's rebuild hooks |
| **"no repository-local excludes 0"** | **stops**: one non-comment line | the graph folder's ignore entry |
| `git ls-files -o` count `N` | 59 | 4 `.idea/` files plus 55 `graphify-out/` files |

- **The archive and the check of the restored set take in 59 files today,** and `tar` would restore the 55 graph files into
  the fresh clone, which must keep the four `.idea/` files only. `git ls-files -o` is not narrowed by the exclude entry (it
  lists ignored files too: with no `--exclude-standard` the `-o` listing is every file not in the index), so the exclude
  entry changes nothing in the archive and the 55 files are there because they are ignored, not hidden.
  - **Change:** the archive list is `git ls-files -o` filtered by a policy value, the folders to carry (`.idea/`); the
    block asserts a partition: carried 4, not carried 55, and every not-carried path lies under `graphify-out/` (so nothing
    else is dropped silently); `tar entries`, `sha256 list lines` and the set comparison after the restore use the carried
    list. After the clone and the restore `git ls-files -o` equals exactly the carried list, because the fresh clone has no
    exclude entry and `-o` ignores excludes anyway.
  - The restore is `tar --keep-old-files` (refuses to overwrite) and `sha256sum -c`: both pass for the four files if none
    of them is tracked in the rewritten tree.
- **The hooks and the exclude entry** are recorded, not carried: names, sizes and sha256 of the two hooks, and the entry's line
  count, so the "no hooks" and "no excludes" checks become "the non-sample hooks are exactly these two, the exclude holds
  exactly one entry, and the not-carried files are exactly the 55 under the graph folder". A hook's text is never printed. Nothing runs
  the hooks during the replacement: the move, the clone and the restore make no commit or checkout in the old clone.
- **The two local keys** are not carried; the fresh clone's configuration is checked for the keys a plain clone writes
  (the second research question names exactly which).
- **Plain `git` against a private repository.** `git ls-remote --heads "$URL"` (the "server heads equal ref-map" check) and
  `git clone` use the system configuration's helper, `manager`. TrumpBot is private, so both become `gitnet` (the `gh` helper
  only), as every other network read of the phase is.
- **Where the old clone's move target appears:** the check "old clone location free" (`$WS/TrumpBot-old` does not exist),
  the `mv`, the roll-back instruction (remove a partial new clone, move the old one back) and the last step, `rm -rf` of the
  move target. Also `$WS/tb-untracked.tar` and `$WS/tb-untracked.sha256`, which hold the carried files. The move target is a
  parameter in the new blocks (a variable set once from the second research question's answer), not a literal. The parent
  design's cleanup lists `TrumpBot-old` among what the workspace's deletion removes; if the target leaves `$WS`, that list is
  the cleanup unit's to adjust.
- **Form of the replacement.** The blocks are plain scripts relying on `repo_env TrumpBot`; the replacement is a request
  whose procedure runs as one shell, so each entry must set what it uses (source `env.sh`, `repo_env`, `lib.sh`), each
  guard must end the shell, and `mv`, `rm`, `tar` and `git` errors go to a file and are counted. A builder in the clone set
  (the counterpart of `g26_req.py build`) writes the request file with its checks and a self-test covers it.

---

## 10. Options for where the changed tools live

| | A. Extend `g26/` in place | B. Derive a self-contained `g27/` (recommended) | C. A thin `g27/` holding only changed files, sourcing the rest from `g26/` |
|---|---|---|---|
| The earlier unit's records pin the earlier files | broken: `g26tools.sums` and Appendix B no longer match, so the earlier unit's own `S0.tools` would stop; the as-built record's "each equal to its pin" stops being true | kept as it ran | kept |
| `S0.save` | its first action is `rm -rf "$T/g26"`: a save for this work would delete the earlier folder first | writes `g27`, touches nothing else | same as B |
| The plan's appendix is each tool's source | the earlier appendix would no longer be the source of the files in the folder | the new appendix holds all files | the new appendix holds changed files; the unchanged ones are sourced by pin from the earlier appendix |
| What changes | rows added, edits in place | a rename of folder and two file names, and the edits of §4 to §9 | the same edits, fewer files copied |
| How many files change anyway | nearly all (documentation points, columns, per-branch records) | all | at least 20 of 22, so the saving is small |
| The phase copies `$WS/tools` at cleanup | one folder | two folders, no name clash, both copied | the same, with a hidden dependency between them |
| `k0-ready.sh`, `save-tools.sh` | never run; an in-place re-save of the tools could be mistaken for a run of `save-tools.sh` | never run | never run |
| Risk | an edit to a file the earlier run's records vouch for | a copy that drifts from the earlier file where it should not: mitigated by pinning the unchanged reused tools in `tools.sums` as before | a `g27` script that sources a `g26` function that was edited later |

Recommendation: **B.** The deciding facts are the first two rows. The cost of B is a larger appendix in the new plan (about
the size of the earlier one) and a mechanical rename; C saves a few files and adds a coupling.

---

## 11. Recommendation for this repo

1. Build `$WS/tools/g27/` as a derived, self-contained folder, saved from the new plan's Appendix A by a save step that
   writes only `g27`, checked by `g27tools.sums`; read the unchanged reused tools and the runner by `tools.sums` as before.
   Keep `g26/` untouched and unrun.
2. Give the folder four entry groups: rewrite (`S0`, `p1` to `p8`, `preset`), residual (`r0`, `p9`, `s3-close`), clone
   (checks, builder), and a self-test with sub-commands by test kind. The residual group starts only when all three `p8`
   markers exist.
3. Move the order gate from `p9` to `p8`; carry the repository policy in the table (branches, visibility, default branch,
   hooks, probes, gate marker), so no step names a repository.
4. Make the changes that stop a run first, before the recorded gaps: the no-probe control (`p2`, `s0 inputs`,
   `s3 reads`), the visibility and hooks switches (`s0 repos`, `p7`, `s3 reads`, `p9`), `gitnet` and the carried folders in
   the clone blocks, and the grant read from data.
5. Close the recorded gaps in the order they guard a write: the reply form and classifier, the class table, the untested
   stops of `p5`, `p6`, `preset`, `S0.grant` and `S0.inputs`, the one-shell stand-in, then the rest.
6. Hold the two-branch push to the tools' present paradigm under whichever form is chosen: a pure `build` and `classify`,
   one expected-failure type, counts and fixed markers only, the policy in the row.

The obvious alternative, extending `g26/` in place, is rejected because it breaks the earlier unit's pins and because the
save step deletes the folder it writes into.

---

## 12. Assumptions

- **Every root changes in all three repositories.** Read: each root commit's tree holds a purged path (§2). If not, `p4`'s
  `commit-map changed rows = T` would stop the rewrite, and the every-ref count would no longer be R_AFTER plus the
  pull-reachable count.
- **BotTools' every-ref count is 28.** It follows from the first assumption. If a pull-request head's commit survived
  unchanged, the count would be lower; `S0.inputs` derives it from the backup before any rewrite and would show it.
- **The default branch is `main` for all three.** Read from the clone listings' `HEAD` line; if GitHub's default differs
  from that listing, `p7` and `S0.repos` stop.
- **The request service's delivered reply holds each printed line as a string entry under its `result`.** Not established
  (the protocol names no field). If the lines sit elsewhere, the extraction in §7.1 reads the wrong place and `classify` stops
  plainly rather than classing; nothing is pushed on that stop.
- **The two private repositories answer the authenticated routes as a public repository does** (REST git data API by
  bearer token, the protocol-v2 `want` by basic credentials, the activity and events feeds). Every batch is bracketed by
  controls and voided when they fail, so a different answer is seen, not read as a result.
- **The token that pushes can read BotTools' hooks and their deliveries.** `S0.repos` read each repository's hooks for GKB2
  and GKB with `repo` scope (0 hooks); the deliveries endpoint's own note was fetched on 2026-11-13.

## 13. Gaps

- **Repository ids** for BotTools, TrumpBot and Support: not in any document or record read, and reading them needs a
  network call this survey did not make.
- **The private repositories' settings** (`security_and_analysis` values, forks, pages): not read; the row's scanning columns
  are filled by the tools part's first `S0.repos` read.
- **The delivered reply's field names:** unestablished (see Assumptions). The earlier run stored the printed lines, not the
  delivered document, so no stored example exists on disk to read.
- **How a two-ref push prints each failure, and how many webhook deliveries it makes:** the separate research's.
- **The document-check tools** (`allow_tool.py`, `privacy_gate.py`, `scrub_check.py`, `oldid_refs.py`,
  `scrub_expressions.py`) were not read; `gdocs.sh` calls them with a corpus name `g26docs` and the three-expression file
  from the data folder. Whether the corpus name is free to change is not established.
- **Outside sources:** none beyond the three in the load-bearing list below. The conventions the tools already follow were
  taken as the standard for this folder; no comparison with other operational tool suites was made.
- **Whether the five records of BotTools and Support must be extended** with a control record of the same shape (so that
  `s3 reads` could keep a 6-line list) was not decided; §4 and §8 assume the list takes the five.

---

## Load-bearing claims

1. **The deliveries list for a repository webhook exists and returns summaries.**
   > "Returns a list of webhook deliveries for a webhook configured in a repository."
   (parameters `per_page` "(max 100)" and `cursor`; response fields include `delivered_at`, `event`, `status`,
   `status_code`.) Link:
   [REST API endpoints for repository webhooks](https://docs.github.com/en/rest/repos/webhooks?apiVersion=2022-11-28#list-deliveries-for-a-repository-webhook),
   read 2026-11-13. Rests: the BotTools webhook count in §8.2.
2. **Redirections are processed left to right, and a failed open fails the redirection.**
   > "Redirections are processed in the order they appear, from left to right."
   > "A failure to open or create a file causes the redirection to fail."
   Link: [Bash reference manual, Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html), read
   2026-11-13. Rests: the fix for the two lines that broke the output rule (§7.2); the earlier run's own observation is its
   deviation 3.
3. **`git ls-files -o` lists untracked files and standard exclusions are opt-in.**
   > "Show other (i.e. untracked) files in the output"
   > "Add the standard Git exclusions: .git/info/exclude, .gitignore in each directory, and the user's global exclusion file."
   Link: [git-ls-files](https://git-scm.com/docs/git-ls-files), page shows "last updated in 2.55.0", read 2026-11-13.
   Rests: that the archive's `-o` listing is not narrowed by the clone's exclude entry (§9).

### Observed on this machine

Files read, with size where useful (all read only; nothing was run):

- `$WS/tools/g26/`: `g26lib.sh` (14,270), `g26_req.py` (25,213), `ganon.sh` (5,264), `s0-ready.sh` (10,145), `p1-prerun.sh`
  to `p9-residual.sh`, `s3-close.sh` (3,904), `preset.sh` (2,005), `gdocs.sh` (3,718), `gselftest.sh` (39,673: its sandbox
  sets a stand-in profile and re-sources `env.sh`, and its `mkfix` fixtures are one `master` branch each), `params.txt`
  (2,213: two rows), `grant.txt` (714), `g26tools.sums`, `tools.sums`, `run-stage.sh` (1,428).
- `$WS/tools/`: `env.sh`, `lib.sh`, `plib.sh`, `klib.sh`, `expect_check.py`, `kept_findings.py`, `porcelain_tally.awk`,
  `s8-row.sh` (6,532; the TrumpBot arm has nine probe arguments, BotTools and Support `PROBES=""`), `expected_rows.txt`
  (256; five rows), `trumpbot-1-prepare.sh` (2,051), `trumpbot-2-replace.sh` (2,108), `lockprobe.py`,
  `untracked_collisions.py`, `realign-1` to `realign-4`.
- `$DATA/rewrite/<repo>/` file names: BotTools and Support hold 5 earlier records (no `gitleaks-control.txt`), TrumpBot
  holds 6; their `ls-remote-at-clone.txt` have 5, 3 and 2 lines. `$DATA/run/lists/SHA256SUMS` holds one row per list.
- The three backups (`$WS/backup/<repo>.git`) by counts: refs, commits, roots, merges, pull-reachable commits (§2); the
  kept-path tests and the root-commit purged-path counts, run by a read-only script in the session's scratch folder, with
  counts only.
- The TrumpBot clone by `git --no-optional-locks`: `ls-files -o` 59 (4 + 55); two hooks; one exclude line; config key
  names; 394 objects in one pack; `credential.helper manager` in the system configuration, Git LFS 3.7.1 installed.
- Plan, as-built record and consequences of the GKB2 and GKB unit: `plan.md` ("The tools", "Parameters", S0 `S0.save`,
  Interfaces with sibling units, Appendix B); `final-implementation.md` §1 and §4 (deviations 1 to 16);
  `consequences.md` §3 to §6. The preparation unit's `final-implementation.md` §3.5 and §3.6. The parent design §5, §6.4,
  §6.6, §9.5, §13.
- The request protocol (`PROTOCOL.md`): the request fields `procedure`, `inputs`, `checks`, `mirror`, `target` and the
  actions `push-mirror` and `replace-clone` (the one-shell rule); "A reply" (the JSON shape and the reply kinds, including
  `stopped` with `result.step` and `result.state`).
