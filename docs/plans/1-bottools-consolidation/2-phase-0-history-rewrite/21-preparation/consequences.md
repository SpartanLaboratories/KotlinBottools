# Phase 0 · 1 — Preparation: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#21](https://github.com/SpartanLaboratories/KotlinBottools/issues/21),
  *"Phase 0 · 1 — Preparation: pinned tools, workspace, backup mirrors, legacy data copy and
  manifests"*, a sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit does to its surroundings and leaves behind: the
  blast radius on this machine and in the repositories, what the later units of the phase
  consume, the follow-ups and the known gaps. It is written with the plan and brought up to date
  once the unit has run; this is the state after it has run.
- **Related:**
  - [`plan.md`](plan.md): the procedure, with its stages, checks and interfaces;
  - [`final-implementation.md`](final-implementation.md): the as-built record and its counts;
  - the parent design [`../architecture.md`](../architecture.md) §5, §6.1, §6.2, §6.3 and §15 unit 1;
  - the parent [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing changes documents and generated
boards only; §2.4 gives the full account.

---

## 2. Blast radius

### 2.1 GitHub

None beyond the landing itself (§2.4). The unit wrote nothing else to GitHub: no repository, ref,
issue or setting changed. It read all six repositories with `git ls-remote`, cloned each one once
with `git clone --mirror`, and read upstream release data. KotlinBottools, GKB2, GKB, BotTools,
TrumpBot and Support are as they were.

### 2.2 This machine

Local, and deliberate:

- **git-filter-repo 2.47.0** is installed in the Python 3.14 user scheme, hash-verified. It stays after
  the phase (architecture §6.7). CPython 3.13 is not installed: the fallback did not run (§5).
- **`%USERPROFILE%\BotWS`**, the workspace (architecture §5.2): the gitleaks install and the saved
  tools, the six backup mirrors and the mirrors, the canary and fixture, the path lists and the
  gitleaks reports. The backup mirrors hold everything the phase's rewrites later remove, so the
  folder keeps the data folder's protection for as long as it exists. The last unit of the phase
  deletes it.
- **`%USERPROFILE%\BotLegacyData`**, the data folder (architecture §5.1): the three legacy data
  copies, their verification records, the manifests of purged blob ids, the ref listings taken at
  clone time, the count files of each stage, the path lists and the path-scrub expression file. It
  outlives the phase. Nothing in it is committed, printed or quoted: it holds personal data, lookup
  keys of old objects and, in the expression file, the name of the project-checkouts folder.

### 2.3 The two clones on this machine

Neither changed. The unit only read KotlinBottools' checkout (`git show main:...` of the
research documents, and the checkout's worktree listing), so an open IDE had nothing to contend
with, and it looked at the TrumpBot clone only to confirm that it sits beside the KotlinBottools
checkout.

### 2.4 Documents and generated boards

The landing changes documents and generated boards only, through the repository's normal landing.
No source, test or build file changes, and no README or CHANGELOG entry applies.

- **In this folder:** `plan.md`, this file, `final-implementation.md`, the replaced plan text under
  `superseded/`, and the issue board files (`plan.json`, `plan.js`, `dashboard.html`).
- **Outside this folder:** one line in the parent's `consequences.md` (the link to §4 below), the dated
  note on the generated boards' commit ids in the parent's `architecture.md` (§1.1 item 9 and the
  "Public material" line), and ten generated board files whose regeneration records this unit's
  state: `docs/dashboards/index.html`,
  `state.json`, `systems.json` and `workspace.dsl`; `docs/plans/board.js`, `board.json` and
  `index.html`; and the parent folder's `plan.js`, `plan.json` and `dashboard.html`.


---

## 3. Adoption

No existing code or mechanism adopts anything from this unit. The saved tools, the path lists and
the expression file are consumed by the phase's later units (§4).

---

## 4. Sibling units and neighbouring issues

**What the later units consume** (the contract is the "Interfaces with sibling units" section of
[`plan.md`](plan.md); this is its summary):

- **Every later unit** (`transfer-rehearsal`, `kotlinbottools-rewrite-and-swap`, `repository-hygiene`,
  `kotlinbottools-publish`, `gkb2-gkb-rewrite`, `bottools-trumpbot-support-rewrite`,
  `residual-report-and-cleanup`) consumes the installed filter-repo and gitleaks, the saved tools,
  the `env.sh` contract, the six lists, `COPY-VERIFIED`, and the runner and as-run log.
- **`transfer-rehearsal`** (#22, blocked by this unit), **`repository-hygiene`**,
  **`kotlinbottools-publish`** and **`residual-report-and-cleanup`** also consume the proven
  non-interactive authentication, and `secret_scan.py` and `gitleaks.toml` at their fixed names;
  `residual-report-and-cleanup` confirms the follow-up records of §6.
- **`kotlinbottools-rewrite-and-swap`** also consumes the expression file with its pinned size and
  hash and the fixture's expected scrub counts. It takes its own fresh KotlinBottools mirror and
  backup at its start, replacing this unit's copies of those two, which serve the data copy only.
- **`gkb2-gkb-rewrite`** and **`bottools-trumpbot-support-rewrite`** also consume the five static
  repositories' backups, manifests and expectation rows.
- **`kotlinbottools-publish`** also accounts for every commit id in the generated boards' generated
  fields in its id-reference check (§6).

**Neighbouring issues:** #2, the tracking issue of the phase, and #1, its parent, are not closed
by this unit. Nothing here changes MagicBot or WebTools.

---

## 5. Known gaps

**Settled by the run** (the counts are in [`final-implementation.md`](final-implementation.md) §3):

- The real repositories match the research table. The five static repositories' refs, manifests,
  expectation rows and positive controls come out as the table and design state, and the three data
  copies verify by blob id.
- The token rule matches every real token file probed. No coverage gap was recorded.
- No rule reports anything in a file the purge lists keep, in the five static repositories
  (`total_kept=0`), within the limit below.

**The plan's assumptions:** none failed (plan, Assumptions). Nothing else changed the repositories' refs,
the real data and histories match the research, the installed launcher behaved as the fixture's script
run did, and each clone, copy and scan fit its stage. The one assumption about the install manager and
CPython 3.13 was not exercised, because the fallback did not run.

**Still open:**

- **The Python 3.13 fallback** of the rewrite tool has not been exercised. It only runs if the
  rehearsal fails on Python 3.14; it did not fail, so the route stays unexecuted, and its first
  command is the interpreter's own install, where a failure stops the unit that needs it.
- **`kept_findings.py`** has not been exercised by a fixture with a finding in a kept file, so the
  zeros above are its own answer on the real reports. It is a recorded limit (plan, Test plan).
- **The architecture's statement** that the research documents record the size and sha256 of every
  tool holds only for `gitleaks.toml`, `secret_scan.py` and the workflow file. The plan records
  the size and sha256 of every tool it saves, so the check it describes does happen; the statement
  in the architecture is otherwise left as it is.

---

## 6. Follow-ups

**Closed, not triggered:**

- **The token rule.** No positive control showed the token rule missing a real token while its path
  rule fired, so `DATA/rewrite/<repo>/token-rule-gap.txt` does not exist and the parent's
  consequences §6 needs no regex change on this evidence.
- **Default-rule findings in kept files.** None was recorded in any of the five static repositories
  (`gitleaks-kept.txt`), so the decision the parent's consequences §6 names is not needed for them.

**Open:**

- **`kept_findings.py`.** If a later unit relies on it, give it a fixture with a finding in a kept
  file first (plan §7.4 S8).
- **The generated boards' commit ids.** The generated boards carry pre-rewrite commit ids in their
  generated fields: `baseline.sha` and `wip.landing.merge` (with the merge id also in a generated timeline label) of an issue or tracking board's `plan.json`, `plan.js` and `dashboard.html`, and the `asIs`, `lastAmended`, `written` and `tree` shas of the state boards and the repository work board. They are outside this unit's output
  rule (plan, Requirement 11). `kotlinbottools-publish` must account for every such field in its
  id-reference check (architecture §6.5), whose corpus is what the phase adds, or its count will not
  reach 0.
