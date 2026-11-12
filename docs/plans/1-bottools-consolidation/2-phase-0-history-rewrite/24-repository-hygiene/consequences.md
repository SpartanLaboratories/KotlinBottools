# Phase 0 · 4 — KotlinBottools repository hygiene: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#24](https://github.com/SpartanLaboratories/KotlinBottools/issues/24),
  *"Phase 0 · 4 — KotlinBottools repository hygiene: .gitignore, gitleaks configuration and CI, README and CHANGELOG"*, a
  sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit does to its surroundings and what it leaves behind:
  - the blast radius on GitHub, in this repository and on this machine;
  - what the later units of the phase take from it;
  - the known gaps the build leaves open, with the outcome of the plan's assumptions;
  - the follow-ups.

  It was written with the plan and brought up to date with the build, before the landing that carries it. What is read
  after the merge (the plan's LR and P1 to P3) is reported in the issue's resolution comment, not here.
- **Related:**
  - [`plan.md`](plan.md): the files, their exact bytes, the checks and the landing;
  - [`final-implementation.md`](final-implementation.md): what was built and measured;
  - [`research/README.md`](research/README.md): the evidence;
  - the parent design: [`../architecture.md`](../architecture.md) §5.2 and §10, with their dated notes of 2026-11-12, and
    §15 and §16, with theirs of 2026-11-11;
  - the parent [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The change lands seven files
([as built, §1](final-implementation.md#1-what-was-built)):

- repository infrastructure: the secret-scan workflow, its wrapper, its configuration, the allowlist controls that the
  workflow runs, and the ignore list;
- two documents: the README correction and the repository's first changelog.

---

## 2. Blast radius

### 2.1 GitHub

- **The repository's first workflow.** `Secret scan` runs on every push and every pull request to `main`, and on demand
  once the file is on `main`.
  - Its first run is on this unit's pull request, and the merge waits for it to pass. A pull request with a merge conflict
    starts no run, and a missing run is not a pass.
  - Each run also runs the allowlist controls, 22 scans of one-commit fixtures. A widened allowlist entry, or one that no
    longer matches its text, turns the check red.
  - While the repository is private, each run draws on the organisation's included Actions compute on GitHub Free, about
    2,000 standard Linux minutes a month. The job's 15-minute timeout bounds a run. Runs of a public repository are free.
- **The check `Secret scan (gitleaks)`** appears on every pull request to `main`. It is not a required check: branch
  protection and rulesets are unavailable while the repository is private on GitHub Free (§6).
- **What the runs touch.** The log shows counts, rule ids and the controls' lines only, and no report or artifact is
  uploaded. The logs of this unit's two runs are checked line by line against those shapes while the repository is still
  private ([plan, LR](plan.md#lr--the-landing-read)). The job holds a read-only token, keeps no credential in its checkout,
  and writes nothing to the repository. The controls' fixtures and their generated credentials stay in the runner's
  temporary folder.
- **Nothing else changes on GitHub.** No issue, label, milestone or repository setting changes. The pull request takes the
  next free number.

### 2.2 This repository

- **`.gitignore`** is rewritten.
  - It anchors the bot's local files and runtime folders at the root (`key.txt`, `keys.txt`, `BotData.xml`,
    `WebParseKeys.xml`, `guildData/`, `services/`, `res/`, `logs/`), so the source package `bottools/services` stays
    tracked.
  - It adds credential, database, log and binary patterns, and keeps the existing IDE and build patterns.
  - No tracked file becomes ignored. The set of ignored paths in this checkout stays the same, with `.git/info/exclude`
    still holding the boards' live folder and the graph tool's output.
- **Four new CI files:** `.gitleaks.toml`, `.github/scripts/secret_scan.py`, `.github/scripts/allowlist_controls.py` and
  `.github/workflows/secret-scan.yml`. What each holds against its research text is in
  [the as-built record, §1](final-implementation.md#1-what-was-built).
- **The README** loses the statements the rewrite made false. It gains a list of the files a clone must supply and one
  sentence naming the workflow. Its build instructions are untouched ([plan, Non-goals](plan.md#non-goals)).
- **`CHANGELOG.md`** is new, with this change's entry under `[Unreleased]`.
- **Every later commit is scanned.** The history scan reads every commit on every branch, so a commit that trips a rule
  keeps the check red until history is rewritten again. Every document written for this repository from now on has to
  scan clean before it is committed.
- **The scoped table names one exact text in one research document.**
  - [`../research/github-residual-exposure-and-visibility.md`](../research/github-residual-exposure-and-visibility.md) keeps
    its command example unchanged.
  - A different credential text there, or the same text anywhere else, is a new finding the table does not cover.
  - The allowlist controls name the same document and text. A change to the table or the document without the controls
    turns the check red, so the three change together.

### 2.3 This machine

- **The workspace copy of the configuration** (`%USERPROFILE%\BotWS\tools\gitleaks.toml`) takes the committed bytes once
  the change has merged ([as built, §1](final-implementation.md#1-what-was-built)). They replace 2373 bytes, sha256
  `4e68f75c709bd2937253ee9efee3f8fd28f891aa3eb7b00de7b830a28f5396eb`.
  - From then on, the configuration text in the earlier findings
    ([§6.3](../research/gitleaks-local-and-ci.md#63-the-configuration-gitleakstoml)) no longer equals the workspace
    copy, and neither does the allowlist findings' complete file
    ([§6.1](research/scoped-allowlist-semantics.md#61-the-complete-file)), which the committed file extends by its two
    header sentences.
  - The value the preparation unit recorded for its saved copy is no longer current; a dated note in its consequences
    says so.
  - The workspace's `secret_scan.py` is unchanged.
- **Two workspace scripts still pin the old value,** and this unit changes neither:
  - the rewrite and swap unit's readiness check, `k0-ready.sh`, would stop on the new bytes;
  - the preparation unit's `save-tools.sh` would write the old bytes back, because it re-saves the configuration from the
    earlier findings' text.
- **The checks before the landing** read scratch copies only, and the privacy gate's corpus file in the data folder names
  one of them ([plan](plan.md)). Nothing else on the machine changes.

### 2.4 Documents and generated boards

This change carries what [plan, Documentation impact](plan.md#documentation-impact) lists. Every one of these documents is
written before the landing and lands with it:

- this unit's research; its plan, with the three earlier versions under `superseded/`; its as-built record; and this
  document;
- the dated notes of 2026-11-12 on the parent design's §5.2 and §10, and of 2026-11-11 on its §15 and §16;
- a dated note in [the preparation unit's consequences, §4](../21-preparation/consequences.md#4-sibling-units-and-neighbouring-issues),
  saying that its saved configuration's recorded value is no longer current once this change has merged;
- dated notes in [the rewrite and swap unit's consequences](../23-kotlinbottools-rewrite-and-swap/consequences.md), marking
  its §5 known gap and its §6 follow-up on the default-rule finding closed by this change;
- in [the parent's consequences](../consequences.md), the link line for this unit in §4, and a dated note under the first
  bullet of §3, which says the configuration has no allowlist;
- the issue's boards, regenerated from these documents. The state board of the system `repository-hygiene` moves from
  planned to built.

---

## 3. Adoption

- **MagicBot (Phase 13).** Its configuration comes into line with this repository's rules, as
  [the parent consequences §3](../consequences.md#3-adoption) state: no global allowlist, and the two path rules added.
  The scoped table belongs to a KotlinBottools document and is not part of that alignment. The workflow's pattern is the one
  MagicBot's CI can adopt: a pinned and checksum-verified binary, a wrapper that proves the scan ran, a canary, and
  counts-only logs.
- **Phase 1 (#3)** finds a `CHANGELOG.md` to extend, with the versioning statement still to add. Its `ci.yml` sits beside
  the secret-scan workflow and shares none of its names.
- **Any later suppression** takes the same shape as the one table, as the configuration's header now says:
  - one rule, one anchored path and one exact text, with `condition = "AND"` and a `description`;
  - the allowlist controls gain its fixtures, among them a literal credential at its path, the same text elsewhere and text
    joined outside its quotes ([research summary §2](research/README.md#2-the-scoped-allowlist-table));
  - the procedure's mutations gain its widenings and the removal of each of its anchors
    ([plan, The allowlist controls](plan.md#the-allowlist-controls)).
- **The allowlist controls** are a pattern MagicBot's CI can take up if its configuration ever scopes a false positive the
  same way.

---

## 4. Sibling units and neighbouring issues

**What the later units take from this unit.** The contract is
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units); this is its summary.

- **`kotlinbottools-publish` (#25)** takes:
  - the secret-scan workflow on `main`, with its allowlist controls step; its first two runs, on the pull request and on
    `main` at the merge, are read after the merge and reported in this issue's resolution comment, and the unit confirms
    the run on `main` again before the visibility change;
  - the default-rule finding of the rewrite and swap unit, settled by the scoped table, so the visibility change no longer
    waits on it;
  - the workspace configuration equal to `main`'s `.gitleaks.toml` (§2.3), which its scan of KotlinBottools before the
    visibility change uses;
  - the shape check of a run's log, which its confirmation of the run on `main` can apply before the logs become public.
- **`gkb2-gkb-rewrite` (#26)** and **`bottools-trumpbot-support-rewrite` (#27)** take:
  - the new workspace configuration. Its one table is inert in their repositories, which hold no such path, so their
    scans report as before;
  - the two stale pins: their readiness checks take the new value, and nothing re-saves the configuration from the
    earlier findings' text.
- **`residual-report-and-cleanup` (#28):** its copy of the workspace tools carries the new configuration.

**Neighbouring issues:**

- **#23, the rewrite and swap unit,** landed. Its open default-rule finding
  ([consequences §5 and §6](../23-kotlinbottools-rewrite-and-swap/consequences.md#5-known-gaps)) is settled by this
  change, and dated notes there mark both closed.
- **#2** and **#1** are not closed by this unit.
- **#3, Phase 1,** extends the changelog and adds its own workflow.
- **MagicBot#2, Phase 13,** waits on the publication unit and aligns MagicBot's configuration.

---

## 5. Known gaps

**What only the hosted runs show.** The merge waits for the workflow's first run, on the pull request, to pass; the reads
after the merge take that run's log and the push run on `main` ([plan, LR and P](plan.md#lr--the-landing-read)). Their
outcome is not known when this document is written, and the issue's resolution comment reports it:

- whether the install step passes on the image the run gets, Ubuntu 24.04 or 26.04
  ([assumption A6](plan.md#assumptions));
- whether the Linux binary applies the scoped table as the Windows binary does, which the controls step and the two scans
  show ([A7](plan.md#assumptions));
- whether GitHub parses the workflow file, which no parser here could check ([A11](plan.md#assumptions));
- whether the controls step runs on the hosted runner as it runs here ([A13](plan.md#assumptions));
- whether the landing waited for the run before the merge ([A9](plan.md#assumptions));
- whether the log has the form the shape check reads, and its scan steps print only the fixed shapes
  ([A14](plan.md#assumptions)).

A red run, or a missing one, stops the landing before the merge, with the pull request left open; a shape check that
stops after the merge goes to the owner before the visibility change of #25.

**Accepted unexercised.** The `workflow_dispatch` trigger and the `cancel-in-progress` setting run in none of this unit's
runs; their text is checked ([plan, P](plan.md#p--after-the-merge)).

**The limits of the checks stand as built** ([plan, Test plan](plan.md#test-plan)): the wrapper's and the controls' failure
paths are reached on Windows only, and the workflow's install step past its checksum runs only on the hosted runner. One
widening is outside the controls' reach: a configuration whose path lost the escape on the dot before `md` would still pass
them, because no fixture names the document with another character in that place. That widening reaches only such names
and is immaterial; a fixture for it would be a change to the controls.

**Outcome of the plan's assumptions.** None failed in the build. A1 to A5, A8, A10 and A12 held: the ignore list and the
changelog as planned, the byte checks on blobs, the scans of a clean clone, every document scanned before its commit, `main`
unmoved until the files were committed, no undecided key at the privacy gate, and the controls' fixtures faithful. The
others are listed above.

---

## 6. Follow-ups

**Left by this unit:**

- **The checks to run again on a later change.** The procedure's checks that do not run in the workflow are run again by the
  change that touches what they test ([plan, Sequencing and follow-ups](plan.md#sequencing-and-follow-ups)):
  - the allowlist controls' failure paths and the table's mutations, when the table, the controls or the gitleaks pin
    changes;
  - the wrapper's failure paths, when the wrapper or the pin changes;
  - the workflow's blocks run on both sides, and the log filter, when the workflow changes.
- **The workspace pins** of `k0-ready.sh` and `save-tools.sh`, for #26 and #27 (§2.3, §4).
- **Comments, docstrings and message text of the committed files.** Each change below edits comments, docstrings or message
  text (the options' help text, the workflow's two error annotations) and changes nothing a scan does:
  - `.github/scripts/secret_scan.py`:
    - its module docstring gives status 1 as "findings present", but an uncaught exception also exits 1, with no `RESULT`
      line; and the statuses of `canary-check` (0 or 2) and of `control` (0) are not described;
    - the reasons behind its options, patterns and numbers are not written down: the two ref selections in `REFS`; why the
      log options handed to gitleaks use `-m`, `--no-renames` and `--diff-filter=tuxdb`, that `git_numstat` must select the
      same changes, and why `--full-history` is in one and not the other; the `%x01` sentinel and `core.quotepath=false`;
      `--exit-code 2` and `--redact=100`; the four regular expressions that read gitleaks 8.30.1's log wording; what each
      canary commit proves, and how `CANARY_EXPECTED` follows from the planted files;
    - its command-line contract is unstated: no option has help text, the docstring has no usage, the four `cmd_*`
      functions have no docstring, and the need for Python 3.11 or newer is not said.

    These wait until the phase's later units have run, because the phase keeps the wrapper byte-identical to the workspace
    copy and the research text while they run ([architecture §5.2](../architecture.md#52-userprofilebotws--the-workspace-ws-deleted-by-the-last-unit)).
  - `.github/scripts/allowlist_controls.py`: its output rule leaves out the exception class name that `CONTROLS FAILED` can
    carry; `--repo`, `--config` and `--wrapper` default to paths relative to the working directory, so it must run from the
    repository root, and its need for git and Python is not stated; `core.autocrlf=false` in the fixtures' git calls,
    running the wrapper from each fixture's root with `--repo .`, and making the paths absolute have no comment; and the
    order of the checks made before the work directory is created, which is deliberate, is not explained.
  - `.github/workflows/secret-scan.yml`: the header names neither the canary nor the controls step, nor why the controls run
    after the canary and before the history scan; the comment above the constants leaves out the rest of the upgrade rule
    (the canary re-run, the hash confirmed on a second channel) and the version named in the first line of
    `.gitleaks.toml`; the `GITLEAKS_CONFIG` check and the canary's `--mirror --no-local` clone have no stated reason; and its
    two error annotations say "1 = findings", though an uncaught exception of the wrapper also exits 1.
  - `.gitignore`: no comment says that the leading `/` on the root-only names is deliberate, so that source packages of the
    same name stay tracked.
  - `CHANGELOG.md` and the workflow's header: "the log shows counts by rule id only" is loose. The log also shows commit and
    byte counts, exit statuses, fixed markers and the controls' fixture names and modes; it never shows a path, a match or
    a secret.
- **Python bytecode in the ignore list.** `.gitignore` has no pattern for `__pycache__/`, so importing the scripts without
  `-B` leaves an untracked folder under `.github/scripts/` that git does not ignore. A pattern for it suits whichever change
  next touches the ignore list.

**Possible, not planned:**

- **A required check.** Once the repository is public, `Secret scan (gitleaks)` can become a required status check on
  `main`. That is not possible while it is private on GitHub Free.
- **The runner image.** A first run that fails at the install step on an Ubuntu 26.04 image, naming the checksum tool, calls
  for one of two changes: the label `ubuntu-24.04`, or a check written without `--strict -`. No evidence today says it
  will happen ([research summary §1](research/README.md#1-the-workflow-on-the-hosted-runner)).
- **Updates of the checkout action.** No automated update is configured. The pin moves only by hand, together with the
  canary and a second channel for the hash, as the earlier findings' upgrade rule states.
- **A fixture for the path's escaped dot** (§5).
