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
boards only; §2.4 points to the full account.

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
  the phase ([architecture §6.7](../architecture.md#67-cleanup)). CPython 3.13 is not installed (§5).
- **`%USERPROFILE%\BotWS`**, the workspace ([architecture §5.2](../architecture.md#52-userprofilebotws--the-workspace-ws-deleted-by-the-last-unit)): the gitleaks install and the saved
  tools, the six backup mirrors and the mirrors, the canary and fixture, the path lists and the
  gitleaks reports. The backup mirrors hold everything the phase's rewrites later remove, so the
  folder keeps the data folder's protection for as long as it exists. The last unit of the phase
  deletes it.
- **`%USERPROFILE%\BotLegacyData`**, the data folder ([architecture §5.1](../architecture.md#51-userprofilebotlegacydata--the-data-folder-data-outlives-the-phase)): the three legacy data
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

The landing changes what [plan §7.1](plan.md#71-repository-changes) lists, through the repository's
normal landing. Beyond that list: the one line in the parent's `consequences.md` is the link to §4
below, and no README or CHANGELOG entry applies
([plan, Documentation impact](plan.md#documentation-impact)).


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

  > **Dated note, 2026-11-11.** The privacy gate this unit saved, `privacy_gate.py`, is no longer the copy in the workspace:
  > the [rewrite and swap unit](../23-kotlinbottools-rewrite-and-swap/plan.md) (#23) saved its own copy over it, with the order
  > of names that differ only in case made total. In this unit's copy the order inside such a group followed the process's
  > hash seed, so a hash over the sorted lists did not repeat from one run to the next; the gate's labels and output were the
  > same in every run. This unit's recorded size and sha256 of the gate (10,850 bytes, `8cf81c9f…`) are no longer current: the
  > copy in use is 11,615 bytes, sha256 `0caea1411a4f3db7a32a0ac54e41d65b6df427545df16c7233d539a860747760`, recorded in
  > [that unit's plan, Appendix A](../23-kotlinbottools-rewrite-and-swap/plan.md#appendix-a--the-tools-and-their-runner).
- **`transfer-rehearsal`** (#22, blocked by this unit), **`repository-hygiene`**,
  **`kotlinbottools-publish`** and **`residual-report-and-cleanup`** also consume the proven
  non-interactive authentication, and `secret_scan.py` and `gitleaks.toml` at their fixed names;
  `residual-report-and-cleanup` confirms that neither follow-up record of §6 came to exist: no
  token-rule gap and no default-rule finding, the second within the limit of
  [the open `kept_findings.py` follow-up](#6-follow-ups).
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

**Settled by the run:** the results and counts are in
[`final-implementation.md`](final-implementation.md#3-measurements) §3. One limit applies to them: its
`total_kept=0` holds only as far as `kept_findings.py` does (still open, below).

**The plan's assumptions:** none failed ([plan, Assumptions](plan.md#assumptions)). Nothing else changed
the repositories' refs, the real data and histories match the research, the installed launcher behaved
as the fixture's script run did, and each clone, copy and scan fit its stage. The one assumption about
the install manager and CPython 3.13 was not exercised (the fallback, below).

**Still open:**

- **The Python 3.13 fallback** of the rewrite tool did not run. It runs only if the rehearsal fails on
  Python 3.14, and it did not fail, so the route stays unexecuted; its first command is the
  interpreter's own install, where a failure stops the unit that needs it.
- **`kept_findings.py`** has not been exercised by a fixture with a finding in a kept file, so
  `total_kept=0` is its own answer on the real reports. It is a recorded limit
  ([plan, Test plan](plan.md#test-plan)).
- **The architecture's statement** that the research documents record the size and sha256 of every
  tool holds only for `gitleaks.toml`, `secret_scan.py` and the workflow file. The plan records
  the size and sha256 of every tool it saves, so the check it describes does happen; the statement
  in the architecture is otherwise left as it is.

---

## 6. Follow-ups

**Closed, not triggered** (the outcomes are in
[`final-implementation.md`](final-implementation.md#36-positive-controls-on-the-untouched-backups) §3.6):

- **The token rule.** The parent's consequences §6 needs no regex change on this evidence.
- **Default-rule findings in kept files.** The decision the parent's consequences §6 names is not
  needed for the five static repositories. This closure reaches only as far as `kept_findings.py`,
  which has never been exercised on a finding ([the open follow-up](#6-follow-ups)).

Neither record of these two exists, so `residual-report-and-cleanup` has nothing to act on: it confirms
that no `DATA/rewrite/<repo>/token-rule-gap.txt` appeared and that each `gitleaks-kept.txt` still reads
`total_kept=0`, with no rule line.

**Open:**

- **`kept_findings.py`.** If a later unit relies on it, give it a fixture with a finding in a kept
  file first ([plan §7.4 S8](plan.md#s8--manifests-expectation-rows-and-positive-controls)).
- **The generated boards' commit ids.** The generated boards carry pre-rewrite commit ids in the
  generated fields that [plan Requirement 11](plan.md#requirements) lists and leaves outside this unit's
  output rule. `kotlinbottools-publish` must account for every such field in its id-reference check
  ([architecture §6.5](../architecture.md#65-privacy-gate-and-id-reference-check)), whose corpus is what the phase adds, or its count will not reach 0.
