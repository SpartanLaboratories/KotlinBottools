# Phase 0 · 6 — Rewriting GKB2 and GKB: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#26](https://github.com/SpartanLaboratories/KotlinBottools/issues/26),
  *"Phase 0 · 6 — Rewrite GKB2 and GKB"*, a sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit does to its surroundings and what it leaves behind:
  - the blast radius on GitHub, on this machine and in the documents;
  - what the later units of the phase take from it;
  - the known gaps the change leaves open;
  - the follow-ups.

  It is written with the plan and brought up to date with the build, with the outcome of the plan's assumptions, before the
  landing that carries it.
- **Related:**
  - [`plan.md`](plan.md): the procedure, its stages, its requests and its checks;
  - [`research/README.md`](research/README.md): the evidence;
  - the parent design: [`../architecture.md`](../architecture.md) §6.4, §6.6, §8, §11, §12.4 and §15 unit 6;
  - the parent [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing carries documents and generated boards only.

What changes in public is the history of two repositories: `master` of GKB2 and `master` of GKB are replaced by their rewritten
histories (§2.1).

---

## 2. Blast radius

### 2.1 GitHub

- **GKB2 and GKB are force-pushed in place.** Each repository's one branch, `master`, is replaced by its rewritten history through
  one push of that ref, made only while the branch is still at the tip the clone recorded
  ([plan, The push](plan.md#the-push)):
  - every commit id changes, because each root commit held a purged path; GKB2's 32 commits become 30, and GKB's 11 become 9;
  - the files under the purged paths leave every commit, the tip's tree included: 14 of the 86 files at GKB2's tip, and 54 of the
    114 at GKB's;
  - both repositories stay public and unarchived, with every setting as it was. Nothing else is written: no other ref, no issue,
    comment, label or setting, and nothing is deleted.
- **What stays reachable** ([the parent consequences, §2.1](../consequences.md#21-the-six-repositories); architecture §6.6). GitHub
  keeps serving every pre-rewrite object by id, on every route, with no documented expiry. GKB2's `refs/pull/6/head`, which GitHub
  hides from a push, keeps its pre-rewrite history fetchable: 15 old commits and, by the prediction, 70 of the 81 purged blobs, all of
  which a fresh clone of GKB2 downloads. Both repositories were public before, so this exposure is not new; the unit measures it and
  claims no removal.
- **The activity feed and the events** each record the push, with the old tip as its `before`: one more published pre-rewrite id, as
  every earlier entry of the feed already holds.
- **GKB2's pull request #6** keeps showing its pre-rewrite commits, served through its ref, and its merge commit is no longer on
  `master`.
- **References into the two histories.** A link to a pre-rewrite commit keeps resolving, since GitHub keeps serving the old objects;
  a link to a purged file on `master` no longer finds it. KotlinBottools' documents link GKB2's issues only, which the rewrite does
  not touch.
- **Clones taken before the push** keep the old history, and their `master` shares no commit with the server's afterwards. Neither
  repository has a fork.
- **A refusal leaves both repositories as they are.** If GitHub's push protection for users finds a supported secret in a rewritten
  history, or any other refusal occurs, that push changes nothing on the server (§5, §6).

### 2.2 This machine

- **`%USERPROFILE%\BotWS`:**
  - GKB2's and GKB's mirrors are rewritten; their pre-rewrite state stays in the untouched backups beside them;
  - a fresh mirror of each repository is taken in `fresh/`;
  - this unit's tools are saved in `tools/g26/`, and the phase's stage runner is replaced by its corrected version (§3);
  - the scan reports and the scratch files are kept there.

  The last unit of the phase deletes the workspace.
- **`%USERPROFILE%\BotLegacyData`:** the records of each repository in `rewrite/GKB2/` and `rewrite/GKB/`, beside the preparation
  unit's records, which are never written: the rewrite's logs and maps, the push's streams and tallies, the exit tests' outputs, the
  probe tallies, the feeds' counts and the report rows, each folder with its checksum list; the requests and replies in `run/g26/`.
  They hold pre-rewrite ids and paths, and are never committed, printed or quoted. The run log, `run/as-run.log`, gains this unit's
  lines: their start lines show plain-word arguments only, and the lines that name a file of the data folder or of the self-test's
  sandbox, printed by the push step and by the self-test, reach it as well (§5).
- **Two scratch files of the preparation unit's `prove_removed`** sit directly in the workspace's `tmp/` folder rather than in this
  unit's scratch folder: every use of that function writes them there, over the previous use's, and the workspace's deletion removes
  them.
- **The two clones on this machine** are unchanged: this checkout changes only by the landing, and the TrumpBot clone belongs to the
  next rewrite unit.

### 2.3 Documents and generated boards

The landing carries what [plan, Documentation impact](plan.md#documentation-impact) lists:

- this unit's research, plan, as-built record and this document;
- the dated notes on the parent design and on the parent's and the earlier units' consequences, and the link line for this unit in
  the parent's consequences;
- the regenerated boards.

No README change and no CHANGELOG entry: the landing carries documents only. The legacy repositories receive no README,
`.gitignore` or CHANGELOG commit; Phase 17 archives them with README pointers (architecture §4).

---

## 3. Adoption

- **A rewritten history is pushed by a refspec push with an explicit lease** on each branch's recorded old tip, to the repository's
  URL, after the guard and a dry run, never by a mirror push: under `--mirror`, `--force` or a refspec with a leading `+`, git ignores
  a lease ([research summary, §1](research/README.md#1-the-force-push)). The phase's remaining force-pushes take this form, with the
  table of classes that reads a refusal by counting fixed markers.
- **The corrected stage runner** shows a run's arguments in the run log only when they are plain words. Every later stage run of the
  phase uses it.
- **The per-repository tools** take a repository's name and read its policy from a parameter table and from the preparation unit's
  expectation rows, so a later unit adds rows, and edits the two tools §4 names, rather than copying scripts.
- **The readiness check pins the current scan configuration,** `main`'s `.gitleaks.toml`, where `k0-ready.sh` pins the earlier one.
  `save-tools.sh`, which would write the earlier configuration back, is not run again.
- **The anonymous probe helper,** `ganon.sh`, takes the publication unit's corrected route rules with "served" as the expected
  answer: the case of a public repository whose old objects GitHub keeps serving.

---

## 4. Sibling units and neighbouring issues

**What the later units take from this unit.** The contract is
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units); this is its summary.

- **`bottools-trumpbot-support-rewrite` (#27)** takes:
  - the corrected runner and its pin;
  - the tools in `$WS/tools/g26/` with the parameter table, to which it adds its rows, extending the tools where its repositories
    differ: BotTools has two branches and two pull-request refs, so its push needs one request per branch or `--atomic`; TrumpBot
    and Support are private, so they have no anonymous probes;
  - the lease push with its guards, its expected tally and its table of classes, and the grant's shape with the decision on the
    request service's deny rule;
  - the readiness pattern and `ganon.sh`;
  - the tools as they ran, with the gaps of §5 and the follow-ups of §6 that name it. Two of the tools name the repositories outside
    the parameter table (deviation 7 of [the as-built record](final-implementation.md#deviations)), so a new repository needs edits
    there as well as rows. Each push request ran its procedure as one shell because the request asked for it (deviations 9 and 10
    there), so for #27 that form is the request's to ask for, while the self-test's stand-in models the other form, one entry to a
    shell. The two agree only for a procedure whose every entry sets the values it uses and whose every guard ends the shell.
- **`residual-report-and-cleanup` (#28)** takes:
  - GKB2's and GKB's report rows (`DATA/rewrite/<repo>/report-row.txt`), with GKB2's pull-request residual;
  - any default-rule finding, by rule id and count;
  - the tools to copy at cleanup, and the records with their checksum lists.

**What this unit takes:** from the preparation unit (#21), the mirrors, backups, manifests, expectation rows, positive-control
records, lists and tools; from the rewrite and swap unit (#23), the pipeline as it ran, and its recorded gap on the runner, which
this unit closes; from the repository hygiene unit (#24), the workspace configuration equal to `main`'s and the follow-up on the two
stale pins, which this unit's readiness check settles; from the publication unit (#25), the corrected anonymous route rules.

**Neighbouring issues:**

- **#2** and **#1** are not closed by this unit.
- **#16, Phase 17,** archives GKB2 and GKB with README pointers once every purge of the phase is done.
- **#3, Phase 1,** is unaffected.

---

## 5. Known gaps

- **What the probes cannot prove:** that GitHub has dropped the old objects, that cached views are gone, that no third-party copy
  exists, or that secret scanning examined the old objects (architecture §12.4).
- **GKB2's pull-request residual stays.** Only a request to GitHub Support, which the phase does not make, or the repository's
  removal would end it.
- **GitHub's push protection for users can be neither read nor tried beforehand.** The account's setting has no read, a dry run never
  shows a block, what a push scan examines is undocumented, and a scan that times out lets the push through and scans afterwards, so a
  clean push does not prove that nothing matched. The markers that attribute a refusal rest on published logs; the first real refusal,
  if one comes, is their check.
- **Whether GitHub's receive path checks the update's old value** is not observable. The guard before the push and the reads after it
  stand either way.
- **The feeds lag.** The events can lag by up to 6 hours and the activity feed's answers are cached for minutes, so a later read may
  list an event the run's reads did not.
- **The run log** keeps the arguments the earlier units' runs wrote and, from this unit's run, the lines that name a file of the data
  folder or of the self-test's sandbox ([the as-built record, Deviations](final-implementation.md#deviations)). It stays in the data
  folder; this unit's lines in it hold no 40-digit id.

**The tools, as they ran.** The tools in `$WS/tools/g26/`, which the next rewrite unit (#27) reuses, keep these gaps; §6 says what #27
does about each before its run.

- **The push step's classifier depends on the form of a stored reply.** In `g26_req.py`, `parse_rc` reads the dry run's and the push's
  exit statuses only where `dry rc=<n>` and `push rc=<n>` start a line, and `cmd_classify` classes a reply that holds neither as
  `stopped-by-guard` under any status but `refused`, under which it is `refused-by-service`. A reply stored as the request service
  delivers it, one document holding the printed lines as list entries on a single line, holds neither, so:
  - after a push that landed, `p6-push.sh check` stops, the branch reading at its new tip, and `request` then answers `SKIP`: a false
    stop;
  - after a push that ran and was refused with the branch still at its old tip, `check` prints the `NEXT` of a guard's stop, a resend
    under the same id, and `request` answers `PROCEED`, where the plan's table of classes hands a real refusal back.

  It never yields a false `pushed`, and the remote stays safe either way: a resend runs the procedure's guards again and pushes only
  under the lease on the recorded old tip, so it can repeat a refusal but cannot overwrite a branch that moved. The form the run stored
  is deviation 5 of [the as-built record](final-implementation.md#deviations). No self-test case feeds a reply in the delivered form: the
  stand-in stores the printed lines themselves.
- **Stops and branches that no test case reaches.** The real run proved the passing behaviour; these paths were exercised by no case.
  Two of them guard the one irreversible write or carry a correction made for the phase:
  - **`p6-push.sh request`'s stop for a branch still at its old tip whose last attempt's class allows no resend** ("a push is never
    repeated blindly"). The case that exists reaches the stop for a branch that has moved;
  - **the void tally when a probe batch's closing controls fail** (`batch` in `g26lib.sh`), the correction carried from the publication
    unit. The two cases that exist reach the void on the opening controls.

  The others, by tool. The list is not exhaustive: the rule for #27 is a case for every `expect` and every `STOP` of a step script.
  - **the push step:** `p6-push.sh check`'s branches for `refused-rule`, `refused-unattributed` and `unclassified` (the classification
    itself has cases, the shell's branches none); its stop for a `stopped-by-guard` or `refused-by-service` class whose read-back is not
    "old tip, pull-request refs unchanged", apart from a guard's stop on a branch that moved, which has a case: this is the stop the
    classifier's gap above takes after a push that landed; `transport` with
    a read-back at neither the old nor the new tip; a `pushed` class whose read-back is not the new tip with the pull-request refs
    unchanged; the record of an incomplete scan after a push. `request`'s stops when the server's branch cannot be read and when the
    server's pull-request refs differ from their record. `cmd_classify`'s stops for no stored reply and for streams it cannot read;
  - **the probes and the feeds:**
    - a status outside a route's answers, on any route. The one case meant for it answers every `want` with another status, the opening
      controls' included, so it ends as a second void on the opening controls, and `probe_ids`' own stop is never reached;
    - a budget stop in the middle of a set, and an empty set of ids;
    - a probed id that answers "absent" while the controls pass, so no tally with an absent count and no record of an unexpected
      answer has run (the passing case asserts there is none);
    - a feed read that lists no current id, which is what every events read of the run returned; a feed status other than 200, a
      budget stop inside a feed read, a second page and a failed read;
    - a disagreement of `p7`'s second channel;
  - **the readiness checks:** `S0.tools` and `S0.pins` have no case, and `S0.repos` the passing case only. `S0.grant` has the passing
    case and five stops (an action missing, an ended grant, another issue in the scope, one target missing, no file), and none for a
    missing or repeated section, a missing date or end line, the branch missing from the scope, a revoked grant, the other target
    missing, or the record of a differing wording, which is the line the run printed. `S0.inputs` stops on a changed backup, a changed
    list and a changed earlier record, and has no case for a changed mirror, the list's checksum in the data folder, the earlier
    records' presence, the manifests' sizes, the clone's listing against the table, the control probes against the preparation unit's
    script, the every-ref commit count or the data copy's marker;
  - **the runner:** the boundaries of a plain word, 40 against 41 characters (the case uses a 44-character word) and 6 against 7
    hexadecimal digits; an empty argument; the masking of a stage name; a non-zero status passed through the runner;
  - **the document checks:** `D.gate` has no case, `D.scan` the clean case only, and the two stops on the set of pending files none;
  - **the steps of the pipeline:**
    - `p1`: every check but the list and the wait for the other repository, namely a push already requested, a mirror or backup that
      differs from its checksum list, the pre-run checks of the mirror, and a list entry that counts no commit;
    - `p2` and `p5`: every stop but the three with a case (a control file that differs; a pull-request ref the table does not list; a
      server branch that moved);
    - `p3` and `p4`: a count that differs, or a manifest blob that survives the rewrite;
    - `p7`: a head of the remote at a pre-rewrite commit; pull-request refs that differ from their record; a default branch,
      visibility or archive state that changed;
    - `p8`: a manifest blob reachable from a branch; a residual where there is no pull-request ref; a custom-rule finding on the fresh
      mirror; the record of a residual that differs from its expectation;
    - `s3-close.sh`: every stop of `reads`, and a `WAIT` in `feeds`;
    - `preset.sh`: the refusal when the server's branch has left its old tip; `need`: a step run out of order; `row`: a repository
      the table does not hold;
  - **pure transforms with no input-to-output case:** `pull_list` leaving merge refs out, `heads_new` leaving a pruned head out,
    `member_counts` matching by a 7-digit prefix, the manifest sample for a step above 1, and the REST blob sample for one or two blobs;
  - **non-functional claims with no check:** the 0.4-second pace and the 6-minute spacing of the feed reads, both of which the
    self-test sets to 0, so the wait loop of `s3-close.sh feeds` runs in no case; and the token never being printed, for which no case
    looks for the stand-in's token in any output.
- **The self-test runs as one script.** `gselftest.sh` is one sequential script of 317 lines that holds the cases of every test level,
  takes no selector, ends at its first failure, and ran for about seven and a half minutes in the recorded run. Its cases that run the
  tools against the stand-ins for GitHub exchange data with a simulated external interface, which the testing hierarchy files as
  the Level 3 integration tests; the plan files them as component tests.
- **The output rule is asserted for step 9's output and the runner's start line only.** The self-test asserts that step 9's whole
  output holds no 40-digit id and no path, and that the runner's start line shows no path and no id; no case asserts it for the other
  steps' output or for the self-test's own output. The run broke the rule twice, in the push step's first
  `request` and in the self-test's own run ([the as-built record, Deviations](final-implementation.md#deviations)); the self-test's case
  for `request` looks for its `PROCEED` line only, so it passed with the same two lines in its output.
- **The anonymous budget read before a step 9 disagreed with the calls it counts** ([plan, Assumptions, A8](plan.md#assumptions)).
  The readings were 60 before GKB2's step 9, 60 again before GKB's eight minutes later, then 18 and 16 before the two second feed
  reads. Each step 9 made 21 anonymous REST calls and each second feed read 2, and the last call left 14: 60 − 21 − 21 − 2 − 2 = 14, so
  39 remained before GKB's step 9, not the 60 read. Why the reading was high is not established: a reading of `/rate_limit` that lags,
  or a window that does not run an hour from the first call. Every gate held on the true values as well (60 and 39 against the 36 a step
  9 needs, 18 and 16 against the 14 a second feed read needs), and no set met a budget stop. A step 9 makes 19 anonymous REST probe
  calls and then 2 feed calls, and each call after the first goes ahead only when the one before it left at least 8. Under a reading
  that passes the gate, a true value of 28 to 35 completes the step with no stop; 26 or 27 completes the probes and the budget cuts one
  or both anonymous REST feed reads, which count as not valid rather than as a stop; 25 or less stops a set. No stand-in case has a
  reading that lags: the stand-in answers `/rate_limit` from the same counter that the calls spend.
- **The close-out's steps are not safe to run twice.** `s3-close.sh feeds` reads each named repository again in turn: run again after a
  `WAIT` at the second repository, it appends the first repository's second read a second time (10 lines where 5 belong).
  `s3-close.sh record`, run twice, appends its block of second feed reads to `report-row.txt` twice, and `g26.SHA256SUMS` then pins the
  doubled row. The stop table's answer for `S3` is to run the step again. The run met neither case: each step ran once, appending 5
  lines for each repository, with no `WAIT`.

---

## 6. Follow-ups

**Left by this unit, if the run meets them:**

- **A default-rule finding in a kept file:** the owner's decision, a `targetRules` allowlist for that one rule and path or acceptance as
  recorded, with the credential rotated if it could still be live
  ([the parent consequences, §6](../consequences.md#6-follow-ups)).
- **A refusal by push protection:** the owner's decision, made from the kept error file, to extend the purge list and redo the rewrite
  from the backup, or to allow the secret through the block's URL as the pushing account and have the push requested again within
  three hours.

**For the next rewrite unit (#27), which reuses the tools, before its run** (the gaps are in §5, "The tools, as they ran"):

- **The stored reply.** `p6-push.sh reply` takes the reply in the form the request service delivers and keeps its printed lines one to
  a line, or `classify` stops plainly on a reply it cannot read; a self-test case feeds a reply in the delivered form.
- **The untested stops and branches.** A case for each, beginning with the push step's stop for a branch at its old tip and the void
  tally on failed closing controls.
- **The self-test by test level.** Sub-commands, or one script for each test level, each with its own total, the group of pure
  functions as the quick gate.
- **The output rule everywhere.** Both causes of the lines that broke it are removed: the push step's two redirections from a file
  that does not exist yet, and the self-test's first call of `scrub_expressions.py` before its output folder exists. One assertion
  covers the output of every step run in the sandbox and the self-test's own output: no drive-letter path, no 40-digit id, no
  `Traceback`, no `No such file`.
- **The budget's reading.** At the end of step 9, a `RECORD` line when the budget read at the step's start, less the last remaining
  count, exceeds the reserve, so that a reading which disagrees with the calls made is seen (assumption A8); and a stand-in case whose
  `/rate_limit` reading lags behind the calls.
- **The close-out run twice.** `s3-close.sh feeds` passes over a repository whose second read is recorded, and `record` writes its
  block once; a case runs each step twice.
- **The test plan and the case labels.** #27's test plan files each check at the level the testing hierarchy gives it, and its case
  labels name a behaviour. In this unit's plan the gating row names `S0.repos` and the reads of `p2` and `p5`, which reach GitHub or
  run long, and leaves out the landing's document checks; the deterministic row names equalities that are checked while the real run
  runs; the component row says every step of `S0` runs on fixtures with its stops, which `S0.tools` and `S0.pins` do not; and some
  case labels name a function or a step rather than a behaviour (`count_markers`, `fields`, `parse_rc: dry`, `B: step 7`, `S3.reads`,
  `S3.record`, `request E`).

**Standing:**

- **The two workspace scripts that pin the earlier configuration,** `k0-ready.sh` and `save-tools.sh`, stay as recorded and are not
  run again; the workspace's deletion removes them.

**Closed by this unit,** each marked by a dated note at the landing:

- the rewrite and swap unit's known gap on the runner writing a run's arguments into the run log
  ([its consequences, §5](../23-kotlinbottools-rewrite-and-swap/consequences.md#5-known-gaps));
- the repository hygiene unit's follow-up on the workspace pins, for this unit
  ([its consequences, §6](../24-repository-hygiene/consequences.md#6-follow-ups)).

**Not triggered:** the publication unit's follow-ups on `anon.sh`'s stand-in cases and comments
([its consequences, §6](../25-kotlinbottools-publish/consequences.md#6-follow-ups)). This unit derives its own helper and does not
save `anon.sh` again.
