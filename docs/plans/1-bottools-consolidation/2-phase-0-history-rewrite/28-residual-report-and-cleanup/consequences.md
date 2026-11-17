# Phase 0 · 8 — Residual-exposure report and workspace cleanup: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#28](https://github.com/SpartanLaboratories/KotlinBottools/issues/28),
  *"Phase 0 · 8 — Residual-exposure report and workspace cleanup"*, unit 8, the last, of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), the history rewrite, which is a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **What this document is:** what this unit does to its surroundings and what it leaves behind:
  - the published artifacts;
  - the blast radius on GitHub, on this machine and in the documents;
  - adoption;
  - the sibling units and the neighbouring issues;
  - the known gaps, with the outcome of the plan's assumptions;
  - the follow-ups. As the phase's last unit, this document is where every follow-up of the phase is confirmed, each with
    who carries it out.

  It is written with the plan and brought up to date with the build, with the outcome of the plan's assumptions, before the
  landing that carries it.
- **Related:**
  - [`plan.md`](plan.md): the procedure, the report's text, the grant, the deletion's guards and the stop table;
  - [`final-implementation.md`](final-implementation.md): what was built and measured, and every departure from the plan;
  - the phase design: [`../architecture.md`](../architecture.md) §6.6 and §6.7 (the residual measurement and the cleanup), §12.4 (the
    report) and §15, unit 8;
  - the phase consequences: [`../consequences.md`](../consequences.md), whose §4 holds this unit's line and whose §5 and §6 take
    dated notes giving each known gap's and follow-up's final state, linking here.

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`.

---

## 1. Published artifacts

None. No module is published and no version moves. The landing carries documents and generated boards only, and no README or
changelog of KotlinBottools changes.

Two things become public on GitHub: the residual-exposure report, posted as
[one comment on #2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2#issuecomment-6932942675), and, after this unit's
landing, #2's closing as completed (§2.1).

---

## 2. Blast radius

### 2.1 GitHub

- **The report on #2.** One comment, public with the repository, in counts, statuses and times only, with links to the units'
  as-built records ([plan, The report](plan.md#the-report)); what was posted, and its read-back, are in
  [the as-built record, §1 and §4](final-implementation.md#1-what-was-built). It states, per repository, what the rewrite left, the
  secret scans, what GitHub still serves of the old histories, the activity feeds and events with each read's validity, the
  pull-request residual of GKB2 and BotTools, KotlinBottools' public window, what the exit tests proved and the four things they
  cannot prove, the cleanup of this machine, each acceptance criterion of the phase with its outcome, and where the phase departed
  from #2's body. It holds no pre-rewrite commit id, purged blob id, path, member or guild name.
- **#2's body stays as it is.** It still names a GitHub Support ticket, a planning pull request opened after the rewrite, an exit
  criterion with no pull-request residual and every clone deleted and cloned again. The report's last section states each of these
  departures; the parent documents carry their dated callouts.
- **#2 closed as completed** after this unit's landing ([plan, After the landing: the closing of #2](plan.md#after-the-landing-the-closing-of-2)).
  `S0.grant` recorded the section `phase-0-tracking-2-close` as not given in the request service's permissions file, and the
  closing's allow line, which the unit cannot read, is not known to be placed. So the owner closes #2 by hand, unless the owner
  gives the section and places the line before the closing, in which case one guarded request closes it (§6). With it:
  - #3 (Phase 1), #16 (Phase 17) and MagicBot#2 (Phase 13) no longer wait on an open #2; their other "blocked by" links stand;
  - #1 shows its sub-issue closed. Its text tracks no per-phase state and is not edited.
- **Nothing else is written.** No repository, ref, setting, label, other issue or comment changes. Nothing GitHub serves of the old
  histories is removed ([plan, Non-goals](plan.md#non-goals)): every old object of the five force-pushed repositories stays served by
  id, and GKB2's and BotTools' pull-request refs keep their old history fetchable. No GitHub Support ticket is filed and no repository
  is deleted.
- **What the unit reads,** authenticated, spending calls of the core rate limit only: #2 and #28; the two rehearsal repositories and
  `KotlinBottools-legacy`; the reserved name `KotlinBottools-next`; MagicBot #1 to #8 and MagicBot#2's comments; WebTools #55; the
  comments on #1; #47; the pull-request refs of the five legacy repositories.

### 2.2 This machine

- **`WS` is deleted, entirely,** after a rename beside itself on its own volume, which doubles as the lock probe
  ([plan, The workspace's deletion](plan.md#the-workspaces-deletion)); its census just before the deletion is in
  [the as-built record, §3.5](final-implementation.md#35-the-workspaces-deletion-s5). It held:
  - the untouched backup mirrors of the six repositories, the only readable copy of the old histories on this machine;
  - the rewrite mirrors, the fresh mirrors, the scan reports, the canary and the fixtures;
  - the preparation unit's earlier KotlinBottools mirror and backup, and the realignment's proof clones;
  - every unit's scratch, with the saved replies of the request service that the rewrites and the clone replacement record as
    removed with the workspace ([their consequences](../27-rewrite-bottools-and-the-private-repositories/42-clone-replacement/consequences.md#5-known-gaps),
    §5 there and in [the rewrites'](../27-rewrite-bottools-and-the-private-repositories/40-rewrites/consequences.md#5-known-gaps));
  - the units' data files for the tools;
  - the pinned tool folders, whose copy now stands in the data folder.

  Afterwards no copy of the old objects remains on this machine. GitHub still serves those of GKB2, GKB, BotTools and the private repositories
  by id, and `KotlinBottools-legacy` holds KotlinBottools' privately. The ids that address them stay in `DATA`, in the commit maps and
  the manifests.
- **`DATA` gains:**
  - `run/tools/`: the workspace tools, 139 files, byte for byte: both pinned tool folders, the stage runner, the earlier units'
    tools and gitleaks 8.30.1 ([plan, The tools copy](plan.md#the-tools-copy));
  - `run/g28/`: the unit's scripts, its records, the list over the 344 files that were under no list, and its own `SHA256SUMS`
    ([the as-built record, §3.7](final-implementation.md#37-the-close-out-s7-and-the-records));
  - `run/g28-after/`: the landing's check outputs, the closing's read-back (with the closing's request and reply when it is sent as a
    request), and last, `final.sha256`, the list over every file of the data folder;
  - `run/gate/corpus-g28docs.args` and `corpus-g28body.args`, the gate's corpus argument files; the gate's last-run files are
    rewritten by its runs, with the same bytes after each passing run.

  The earlier records are read and never written. The swap list stays as written: its log verifies by its rule, one record having
  been appended after it ([plan, The data folder's re-verification](plan.md#the-data-folders-re-verification)). Everything in `DATA`
  holds ids, paths or names and is never committed, printed or quoted.
- **Unchanged:**
  - the three data copies, the manifests and every earlier record;
  - the private repository clone, whose four carried files are read against their list;
  - this working tree, but for the landing;
  - git-filter-repo 2.47.0, which stays installed in the user scheme. gitleaks now lives only in the tools copy.
- **The project's planning-state note** on this machine is updated after the landing, at the plan's `A.note`, with the four facts
  the phase consequences name: the public repository is a fresh one; the pre-rewrite repository is `KotlinBottools-legacy`, private
  and archived; the legacy data is in `%USERPROFILE%\BotLegacyData`; and the deferred step is not due. The note is local and never
  committed.
- **The request service's local state:** no allow line was placed for the deletion; the owner permitted each of its commands as it
  ran ([the as-built record, deviation 4](final-implementation.md#5-deviations-from-the-plan)), so none is left to remove. The
  section `phase-0-tracking-2-close` ([plan, The grant](plan.md#the-grant), item 1) was recorded as not given by `S0.grant`, and
  the closing's allow line (item 2), which the unit cannot read, is not known to be placed; both stay the owner's to give before
  the closing, if #2 is to be closed by request (§6).

### 2.3 Documents and generated boards

The landing carries what [plan, File-by-file changes](plan.md#file-by-file-changes) lists:

- this folder's plan with its two superseded versions, this document and the as-built record, which is the committed home of the
  posted report's table;
- the phase consequences:
  - §4 gains the line recording that `bottools-…-rewrite` (#27) has landed as its four units, and this unit's line;
  - §5 and §6 take dated notes giving each known gap's and follow-up's final state, linking to this document;
- dated callouts on the phase design where the build changes what it describes: §6.7, the cleanup, and §11, the closing of #2;
- the regenerated boards.

---

## 3. Adoption

- **The document checks without the workspace.** The landing's checks run from the tools copy in `DATA`. The commit maps and the
  manifests serve as the id sources, proved equal to the backups' commit sets before the deletion. The id check names the five
  legacy repositories, and KotlinBottools' ids are checked over the hand-written documents
  ([plan, The checks moved off the workspace](plan.md#the-checks-moved-off-the-workspace)). A later document that must be checked
  against the phase's old ids takes this route.
- **A list over every file of the data folder.** This covers the files that were under no list, the manifests among them, and the
  final list over the whole folder. It is the starting point for any later check of `DATA`, for example before the older data
  copies are deleted.
- **A local deletion behind guards.** A rename beside itself on one volume serves as the lock probe, its outcome is read from the
  two paths, and then the removal follows. This is the clone replacement's form, applied to a folder that is not a checkout.
- Nothing in KotlinBottools' code, build or published surface adopts anything from this unit.

---

## 4. Sibling units and neighbouring issues

**What this unit took from the units of the phase.** The contract is
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units); this is its summary.

| Unit | Takes |
|---|---|
| [#21](https://github.com/SpartanLaboratories/KotlinBottools/issues/21), the preparation | the three data copies with their lists and blob-id records, `COPY-VERIFIED`, the untouched backups with their lists, the manifests, the positive-control records, the recorded tool versions |
| [#22](https://github.com/SpartanLaboratories/KotlinBottools/issues/22), the transfer rehearsal | the two rehearsal repositories, as a follow-up |
| [#23](https://github.com/SpartanLaboratories/KotlinBottools/issues/23), the rewrite and swap | KotlinBottools' report row with the public window, its history and scan records, the scrub's counts, the swap log and its list, the reserved name, the realignment's proof (nothing deferred) |
| [#24](https://github.com/SpartanLaboratories/KotlinBottools/issues/24), the repository hygiene | the committed scan configuration with its one scoped table, and the CI files' text follow-ups, now unblocked |
| [#25](https://github.com/SpartanLaboratories/KotlinBottools/issues/25), the publication | KotlinBottools' publication row (the anonymous tallies, the feeds, the alert reads, the path count over 3,019 texts) and its tools |
| [#26](https://github.com/SpartanLaboratories/KotlinBottools/issues/26), GKB2 and GKB | their two report rows with GKB2's pull-request residual, their records and the first tool folder |
| [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), through its units [#39](https://github.com/SpartanLaboratories/KotlinBottools/issues/39) to [#42](https://github.com/SpartanLaboratories/KotlinBottools/issues/42) | the second tool folder at its pins with its readiness steps, quick gate and document checks; the three rows and records of BotTools and the private repositories with BotTools' pull-request residual and webhook deliveries; the old clone's recorded path; #47 |

**What this unit leaves.** No unit of the phase follows it. It leaves:

- the report on #2;
- #2 closed, after the landing (§2.1);
- `DATA` verified and listed in full, with the tools copy;
- no workspace;
- the follow-ups of §6, each with who carries it out.

**Neighbouring issues:**

- **#2** closes with this unit, after its landing.
- **#1** stays open with its other phases. Its "Done when" asks that no secret file remain anywhere in the history of any
  bot-related repository. That holds for every branch and tag of the six repositories. GKB2's and BotTools' pull-request refs, and
  the old objects GitHub serves by id, keep the old history reachable, as the report states. Only a GitHub Support request or the
  repositories' removal would end that, and the phase files neither.
- **#3 (Phase 1), #16 (Phase 17) and MagicBot#2 (Phase 13)** no longer wait on an open #2.
- **#47** stays open. After the cleanup the clone tools it concerns exist only in the copy, and no later run of the phase uses them.

---

## 5. Known gaps

What the build leaves open, then the outcome of each of the plan's assumptions.

- **The report states the measurements as the units recorded them,** made between 2026-11-11 and 2026-11-16. Whether GitHub later
  drops the old objects, or later lists the pushes in the events, is not measured.
- **The events' membership is not measured for GKB2, GKB and the private repositories,** whose every events read was not valid, and only in
  part for BotTools, whose events list the push of 1 of its 2 branches
  ([the residual measurement's consequences, §5](../27-rewrite-bottools-and-the-private-repositories/41-residual-measurement/consequences.md#5-known-gaps)).
- **The blob probes are a sample:** 41 of GKB2's 81 purged blobs, 50 of the first private repository's 199 and 60 of the second's 7,259. GKB's 58 and BotTools'
  39 were probed whole.
- **What the probes cannot prove:** that GitHub has dropped the old objects, that cached views are gone, that no third-party copy
  exists, or that secret scanning examined the old objects. The report says so.
- **The data folder's final list follows the landing,** so no committed document records its count and digest; the run's own
  report gives them.
- **What the sandbox cases leave untested.** The stops that no case makes fail, which
  [plan, Test plan, "What the sandbox cases leave out"](plan.md#test-plan) lists script by script: a fault in any of them would show
  only in the real run, and none stopped it. Among them are `delete-ws.sh`'s guards on a workspace that is a link, lies on another
  volume or holds the shell, on links and reparse points inside it, on both paths absent, on the copy's further files and its list,
  and on unexpected pairs of the two paths, with `remove`'s and `leftover`'s own preconditions, the stop on a second leftover and
  `gone`'s checks; the report's checks other than the carriage-return check; `close.sh`'s output rule over the body, the replies, the
  request file and the records, and its `sums` and `final` verifications; `tools-copy.sh`'s count, name and pin checks; and
  `g28lib.sh`'s two guards on the self-test's overrides.
- **Three scripts have no sandbox case:** `ready.sh`, `follow-ups.sh` and `routes.sh`, tested by their real runs only. `S0.grant`'s
  branch for a given section never ran, since the section was not given.
- **The unit's own pure parts** (`census.py`'s folder grouping, `report-fill.py`'s whitespace collapse and comment-body
  normalisation) have no deterministic case and run only inside the component cases.
- **Four pinned scripts can read a failed read as a pass.** None of these cases arose in this run. The scripts are not changed: their
  steps have run, and the defects matter only to a later reuse of them.
  - `follow-ups.sh` counts the lines of a failed `gh auth status`, and of a failed pull-request listing, as 0, which is the value
    expected for the token's scopes (no `delete_repo`) and for GKB's and the private repositories' pull-request refs; a missing
    `rewrite` folder likewise reads as no token-rule gap. That breaks the plan's rule that a failed read is never a zero
    ([plan, Error handling and logging](plan.md#error-handling-and-logging)). In this run the step's other GitHub reads answered, and
    the same listing returned GKB2's 1 and BotTools' 2 refs ([the as-built record, §3.2](final-implementation.md#32-the-data-folder-s1-and-the-follow-ups-s2)).
  - `ready.sh package` passes when the recorded value and the value read are both empty, so a missing git-filter-repo with a
    missing record line would read as equal. In this run both record lines are present and the installed package matched them
    ([the as-built record, §3.7](final-implementation.md#37-the-close-out-s7-and-the-records)).
  - `close.sh outputs` skips a missing file before it counts the hits, so a missing body, stored reply, request file, record or run
    log passes the output rule. In this run the step read the 37 step outputs, the body with 1 stored reply, the request file and
    the records, all present ([the as-built record, §3.7](final-implementation.md#37-the-close-out-s7-and-the-records)).
  - `verify-data.sh copy` reads a data copy whose blob-id record and folder are both missing as 0 records, 0 mismatches and 0 files,
    which is what its check expects of such a pair, and it prints the three copies' total without asserting it. In this run it
    counted 91 files ([the as-built record, §3.2](final-implementation.md#32-the-data-folder-s1-and-the-follow-ups-s2)).

**The phase's own known gaps, at its close** ([the phase consequences, §5](../consequences.md#5-known-gaps)):

- the requests units 2 to 8 needed: closed; every unit ran on them, this one through an ordinary `comment` request;
- the path scrub proved only on a fixture: closed; it ran on the real history, and the report's section 6 gives its counts;
- the real histories not yet rewritten or scanned: closed; all six are rewritten, pushed and scanned (the report's sections 1 and 2);
- the secret-scan workflow not yet run on GitHub: closed; it has run green on `main` (the report's acceptance, criterion 5);
- issue transfers undocumented: closed; the rehearsal settled them and every number was reproduced (criterion 3);
- gitleaks' default rules not yet run on the legacy repositories' kept sources: closed (§6, "Default-rule findings");
- the privacy gate's name lists: stand, as a limit of the gate's method;
- the two credentials' liveness: open, the owner's (§6, "The credentials");
- the object deletion's deferral: closed; none was deferred (§6);
- IntelliJ IDEA's Local History: stands; it lies outside git and is not measured;
- Git 2.56: stands; this unit's readiness read the pinned 2.55.0.windows.5.

**The plan's assumptions** ([plan, Assumptions](plan.md#assumptions)):

| # | Outcome |
|---|---|
| A1 | Held: nothing held the workspace; the rename went through on its first try |
| A2 | Held: the 12 recorded top-level folders, and no link, hard link or reparse point |
| A3 | Held: the first removal that ran left no entry |
| A4 | Held: every file of the source but its compiled caches equalled the copy's at the guards, and the caches were the same files |
| A5 | Held: the copy verified against the list, the four pin lists and the runner's pin |
| A6 | Held: the comment request was carried out on its first attempt and posted the body once |
| A7 | Held: the read-back equals the body by sha256, carriage returns stripped and trailing newlines trimmed |
| A8 | Held: the report's comment is the one comment with the title line and the newest on #2 |
| A9 | Did not hold. No allow line was placed for the deletion: the owner permitted each of its commands as it ran, and the first `remove` was refused before it ran and ran once permitted ([the as-built record, deviation 4](final-implementation.md#5-deviations-from-the-plan)). `S0.grant` recorded the section for the closing as not given, and the closing's allow line, which the unit cannot read, is not known to be placed, so the owner closes #2 by hand unless both are given first (§6) |
| A10 | Held: the finding tool was present and read the body as a document, at the sandbox tries and at `S6.checks` |
| A11 | Held: the census equalled the table after the readiness steps had run |
| A12 | Held: the body is far below the limit and was posted ([the as-built record, §3.6](final-implementation.md#36-the-report-s6)) |
| A13 | Held: git-filter-repo printed the recorded version prefix at the close-out |
| A14 | Held: every follow-up read as on 2026-11-16, with no `RECORD` line |
| A15 | Held: the hard-link case passed in the sandbox, and the guards counted 0 reparse points through PowerShell |
| A16 | Held: the census equalled the table ([the as-built record, §3.2](final-implementation.md#32-the-data-folder-s1-and-the-follow-ups-s2)) |

---

## 6. Follow-ups

Each follow-up of the phase, as this unit confirms it ([plan, The follow-ups](plan.md#the-follow-ups)), read at `S2.read`
([the as-built record, §3.2](final-implementation.md#32-the-data-folder-s1-and-the-follow-ups-s2)).

**Confirmed closed:**

- **The deferred object deletion:** none. The rewrite and swap unit proved the deletion of this clone's old objects at its run
  ([its consequences, §6](../23-kotlinbottools-rewrite-and-swap/consequences.md#6-follow-ups)).
- **The token rule:** no gap. No positive control showed the token rule missing a real token.
- **Default-rule findings:** one, in a kept KotlinBottools document (rule `curl-auth-user`, 2 findings in 1 file). The repository
  hygiene unit settled it with one scoped allowlist table. There are none in GKB2, GKB, BotTools or the private repositories.
- **Machine-local paths in issue texts:** none to edit. The scrub's expressions matched 0 of the 3,019 public texts.
- **The comment on MagicBot#2** on its scan configuration: on it since 2026-11-08.
- **The issue edits of [the phase consequences, §2.6](../consequences.md#26-documents):** #2's plan-folder line reads
  `2-phase-0-history-rewrite`; the plan-folder lines of #3 to #19 are corrected as each phase lands.
- **The workspace and the old clone's path:** both of the workspace's paths are absent, with no entry left over, and the old
  clone's recorded path is absent; nothing is left to delete at either.
- **The deletion's allow line:** none was placed (§2.2), so none is removed.

**After the landing** ([plan, After the landing: the closing of #2](plan.md#after-the-landing-the-closing-of-2)):

- **#2's closing.** `S0.grant` recorded the section `phase-0-tracking-2-close` as not given, and the closing's allow line is not known
  to be placed, so the owner closes #2 as completed by hand after the landing. If the owner gives the section and places the line
  first ([plan, The grant](plan.md#the-grant), items 1 and 2), this run sends the one guarded `close-issue` request instead, and the
  owner then removes the line and moves the section to history.
- **The project's planning-state note:** updated by this run with the four facts of §2.2 (`A.note`), a local note, never committed.
- **The data folder's final list:** written by this run last (`A.final`); its own report gives the list's count and digest (§5).

**Open, with who carries each out:**

- **The rehearsal repositories,** `phase0-rehearsal-a-legacy` and `phase0-rehearsal-a`, are private and archived. The owner deletes
  them if they are unwanted; that needs the `delete_repo` scope, which the signed-in token lacks.
- **The credentials:** the owner rotates the 2023 session cookie and the first private repository's private key if either could still be live.
- **The deleted planning branch's traces outside KotlinBottools' bodies:** 16 links in MagicBot #1 to #8, 1 link in WebTools #55, and a
  plain mention in a comment on #1. These are the owner's to fix:
  - the links need body edits in those repositories, under grants this unit does not hold;
  - no request edits a comment.
- **#47** is the owner's: it can be closed or kept for a later reuse of the tools copy, since the phase no longer runs the clone tools.
- **The committed CI files' comment and message-text follow-ups** (`.github/scripts/secret_scan.py`,
  `.github/scripts/allowlist_controls.py`, `.github/workflows/secret-scan.yml`), with the missing `__pycache__/` pattern in `.gitignore`
  ([the repository hygiene unit's consequences, §6](../24-repository-hygiene/consequences.md#6-follow-ups)). They waited while the
  workspace copy of the wrapper had to stay byte-identical. They are now unblocked, for a later change to those files.
- **The retired tools' own documentation follow-ups** recorded by the earlier units apply only to a later reuse of the tools copy, and
  are taken up by whoever reuses it. The same holds for the failed-read defects of this unit's four scripts (§5), should anyone
  reuse them.

**Standing:**

- **`KotlinBottools-legacy` stays private and archived.** It is the only private copy of KotlinBottools' old objects and the resolver
  of the dated citations; deleting it would remove both.
- **The name `KotlinBottools-next` stays reserved.** The references the transfers wrote resolve through it
  ([the rewrite and swap unit's consequences, §6](../23-kotlinbottools-rewrite-and-swap/consequences.md#6-follow-ups)).
- **GKB2's and BotTools' pull-request residual stays.** BotTools' webhook is Phase 17's to decide (#16).
- **The older data copies in `DATA`** are deleted by the owner once MagicBot's legacy import report has been checked
  ([the phase consequences, §2.5](../consequences.md#25-this-machine)).
