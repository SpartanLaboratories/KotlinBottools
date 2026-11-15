# Phase 0 · 7.1 — Extending the workspace tools for BotTools, TrumpBot and Support: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#39](https://github.com/SpartanLaboratories/KotlinBottools/issues/39),
  *"Phase 0 · 7.1 — Extend the workspace tools for BotTools, TrumpBot and Support"*, unit 1 of
  [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), which is a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **What this document is:** what this unit does to its surroundings and what it leaves behind:
  - the blast radius on GitHub, on this machine and in the documents;
  - adoption: what the rest of #27 and the phase take up;
  - the sibling units and the neighbouring issues;
  - the known gaps, with the outcome of the plan's assumptions;
  - the follow-ups.

  It is written with the plan and brought up to date with the build, with the outcome of the plan's assumptions,
  before the landing that carries it.
- **Related:**
  - [`plan.md`](plan.md): the tool folder, every file's source and pin, and the run that saves and proves it;
  - the parent design: [`../architecture.md`](../architecture.md) §7 (the tools), with §5.1, §11, §12, §13.3, §14 and
    §16;
  - the parent consequences: [`../consequences.md`](../consequences.md);
  - the GKB2 and GKB unit's consequences, whose §5 and §6 this unit closes:
    [`../../26-gkb2-gkb-rewrite/consequences.md`](../../26-gkb2-gkb-rewrite/consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing carries documents and generated boards only, and no
README or changelog of KotlinBottools changes.

---

## 2. Blast radius

### 2.1 GitHub

Nothing is written. The unit reads BotTools, TrumpBot and Support once, read only, and reads them again at its
close-out to show that their refs and settings are as they were
([plan, "Shape of the unit's run"](plan.md#shape-of-the-units-run)). The reads spend calls of the authenticated rate
limit only.

### 2.2 This machine

- **`%USERPROFILE%\BotWS`** (`WS`):
  - a second tool folder, `tools/g27/`, beside the GKB2 and GKB unit's `tools/g26/`. The earlier folder is not edited,
    saved again or run, and equals its own pins before the save and after the close-out;
  - the reused earlier tools and the stage runner, read at their pins and unchanged;
  - the unit's data file and its scratch folder under `tmp/g27/`. Each kind of the self-test builds its sandbox there,
    in the folder `selftest/`, and removes it at its end. The scratch folder keeps, between runs, each kind's
    collections of outputs and stop lines, its console file and its stamp, the run id that the gating kind writes, and
    the empty `selftest/` folder.

  The last unit of the phase deletes the workspace; its cleanup copies both tool folders and the stage runner first.
- **`%USERPROFILE%\BotLegacyData`** (`DATA`):
  - the run log gains the unit's lines, whose start lines show plain-word arguments only;
  - the unit's one record folder, `run/g27/`, holds the checksums of the preparation unit's earlier records as the
    readiness reads first found them, one file per repository, and the three empty folders the library makes for a
    unit's requests, replies and step markers. A later run of the unit's steps compares the checksums and rewrites
    none of them;
  - the landing's privacy-gate run writes its argument file, `run/gate/corpus-g27docs.args`, beside the earlier
    units' files there, and overwrites the gate's last-run files, `gate-last.err` and `gate-last.status`, as every run
    of the gate does.

  No earlier record is written.
- **The TrumpBot clone** and every other checkout are untouched; this working tree changes only by the landing.
- **The request service's local state** is unchanged: the unit sends no request and asks the owner for nothing.

### 2.3 Documents and generated boards

The landing carries what [plan, "Documentation impact"](plan.md#documentation-impact) lists:

- this unit's plan, with the versions it replaced under `superseded/`
  ([`plan-2026-11-14.md`](superseded/plan-2026-11-14.md), [`plan-2026-11-14-2.md`](superseded/plan-2026-11-14-2.md),
  [`plan-2026-11-14-3.md`](superseded/plan-2026-11-14-3.md), [`plan-2026-11-14-4.md`](superseded/plan-2026-11-14-4.md) and
  [`plan-2026-11-15.md`](superseded/plan-2026-11-15.md)), this document and
  [its as-built record](final-implementation.md);
- the dated notes on the GKB2 and GKB unit's consequences, one for each row of the plan's
  [closure table](plan.md#the-closure-table);
- one link line for this unit in [the parent consequences, §4](../consequences.md#4-units-and-neighbouring-issues);
- the regenerated boards.

---

## 3. Adoption

- **The tool folder is what the rest of #27 runs.** The rewrites run the rewrite set, the residual measurement the
  residual set and the clone replacement the clone set. Each unit first proves the folder equal to its pins and runs
  the quick gate, the self-test's deterministic kind
  ([plan, "Interfaces with sibling units"](plan.md#interfaces-with-sibling-units)).
- **A repository's policy is a row** of the parameter table, and a running unit's job, issue, branch, actions, targets
  and record folder are its own data file, named by `G27_UNIT`, with no default. The folder names no repository, issue
  or branch, so a further repository is a row and a further clone a set of policy values.
- **Each unit that runs a set writes its records in a folder of its own** under `DATA/run`, and reads another unit's
  records only through its data file's `from`, read only.
- **The atomic lease push of N branches** replaces the GKB2 and GKB unit's push of one branch, which is its case of
  N = 1, and the class table and the classifier state one rule.
- **The preparation unit's clone scripts** are superseded by the clone set and are never run. The two workspace
  scripts that pin the earlier scan configuration stay unrun.

---

## 4. Sibling units and neighbouring issues

**What the later units of #27 take from this unit.** The contract is
[plan, "Interfaces with sibling units"](plan.md#interfaces-with-sibling-units); this is its summary.

| Unit | Takes |
|---|---|
| [#40](https://github.com/SpartanLaboratories/KotlinBottools/issues/40), the rewrites | the rewrite set, the parameter rows, the grant check, the push request builder with its reply store and classifier |
| [#41](https://github.com/SpartanLaboratories/KotlinBottools/issues/41), the residual measurement | the residual set |
| [#42](https://github.com/SpartanLaboratories/KotlinBottools/issues/42), the clone replacement | the clone set, the grant check |

- **A defect a later unit meets in a tool** stops that unit before its write. The correction is a new version of that
  file, carried whole with its new pin by the plan of the unit that makes it, with the test kind that covers it run
  again, and a dated note in this document.

**What this unit took:**

- from [the GKB2 and GKB unit](../../26-gkb2-gkb-rewrite/consequences.md) (#26): its tools as the source of the new
  folder, its corrected stage runner at its pin, and the gaps and follow-ups it recorded for this work, each of which
  carries a dated note there from this unit's landing;
- from [the preparation unit](../../21-preparation/consequences.md) (#21): the lists, the expectation rows, the
  manifests, the mirrors and backups, the clone listings and the positive control's probe arguments, read only, against
  which the readiness reads prove the parameter rows.

**Neighbouring issues:**

- **#27** stays open until its last unit has landed; its consequences gain this unit's link line. Its known gap on the
  webhook deliveries endpoint is answered by this unit's read of BotTools: the list is readable with the credential the run's
  `gh` uses ([the as-built record, §3.3](final-implementation.md#33-the-three-repositories-read)).
- **#28, the residual report and cleanup,** stays blocked by #27. It copies both tool folders and the stage runner at
  cleanup.
- **#2** and **#1** are not closed by this unit.
- **#16, Phase 17,** archives the three repositories once every purge of the phase is done.

---

## 5. Known gaps

- **The stage runner's header** does not say that a stage name with other characters is shown as `<name>`, the last
  item of the GKB2 and GKB unit's fifth documentation point. The runner is reused at its pin and not saved again, so its
  header stays as recorded. The new folder states the behaviour where its tools say how a step is run, and a case of the
  self-test covers the masking ([plan, the closure table, its last row](plan.md#the-closure-table)).
- **Two behaviours that no case of the self-test shows** ([plan, Test plan, the limits of the integration
  tests](plan.md#test-plan)):
  - step 4 discards the error streams of its two copies and of its read of the rewrite's log, and each of the three stands behind a
    check that stops first (`have`, and the expectation over filter-repo's files), so no case provokes their messages: that the
    discard keeps a shell message off the console is read from the code, not shown by a case;
  - the residual close-out strips the record folder's path from the names of the probes' id sets as literal text, and no fixture's
    path holds a pattern character, so no case tells the literal strip from a pattern match.

  Neither is reached by this unit's run: step 4 is run by the rewrites (#40) and the residual close-out by the residual measurement
  (#41).
- **Three labels word the archive check as the row's.** The `expect` labels of the per-ref verification after the push
  (`p7-verify.sh`) and of the two close-outs' reads (`c1-close.sh reads`, `r1-close.sh reads`) say that the default branch,
  visibility and archive state are as the row records, or says. The row holds no archive state. The checks are right: each compares
  the default branch and the visibility with the row and requires that the repository is not archived. Only the labels' wording is
  off, and they stay as they are: they are printed text, which the self-test's stop cases match.

**Outcome of the plan's assumptions** ([plan, Assumptions](plan.md#assumptions); the readings are in
[the as-built record, §3](final-implementation.md#3-measurements)). None failed.

- **A1 was not exercised.** The unit sent no request and stored no reply. The rewrites' first push request is the check, and the
  classifier stops plainly on a reply it cannot read.
- **A2 held for the readiness reads** (A11) and is otherwise not exercised: each later unit's real run is the check, and a step that
  meets another answer stops at its own check before its write.
- **A3 was not exercised.** No push was made and no delivery reached the webhook. The rewrites' step 7 is the check.
- **A4 held.** Every read of `S3.repos` answered, at `S3` and again at the close-out: BotTools' rulesets read listed none, the two
  private repositories' rulesets reads were refused with HTTP 403 and the upgrade wording and recorded, the two private repositories
  report no `security_and_analysis` object, and BotTools' webhooks and their deliveries are readable.
- **A5 was not exercised.** The census ran on made-up clones only; the clone replacement's census of the real clone is the check.
- **A6 was not exercised on the machine's own tools.** The clone checks ran against the self-test's stand-ins for `stat` and
  `tasklist`; the clone replacement's checks are the check.
- **A7 held as far as this unit reads it.** The gitleaks binary reports 8.30.1 and its configuration is at its pin (`S1.tools`,
  `S1.pins`). The positive control on an untouched backup, equal to its record line for line, is the rewrites' step 2.
- **A8 held.** The plan was not edited while the steps ran: `S1.save` found the pin list's sha256 it types, and `S1.tools` every pin.
  The comments of five files, reworded after the folder's first save, gave the plan a new pin list, from which the folder was saved
  again before the run the as-built record measures
  ([the as-built record, deviation 1](final-implementation.md#4-deviations-from-the-plan)).
- **A9 held.** `S1.pins` and `S3.repos` passed.
- **A10 held.** `S1.pins` found git, Python, gh, git-filter-repo with its module, and gitleaks at the recorded versions.
- **A11 held.** The three repositories answered `S3.repos` in the shapes the stand-ins model, with the private repositories'
  rulesets read refused as A4 says.
- **A12 was not exercised.** No push was made. The rewrites' first real push, refusal or lost connection is the check.
- **A13 was not exercised.** The clone was neither read nor touched. The clone replacement's census is the check.

---

## 6. Follow-ups

- **A tool defect a later unit meets** is corrected under the rule of §4, with a dated note in this document.
- **The two workspace scripts that pin the earlier scan configuration,** `k0-ready.sh` and `save-tools.sh`, stay unrun,
  as the GKB2 and GKB unit left them; the workspace's deletion removes them.
