# Phase 0 · 4 — KotlinBottools repository hygiene: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#24](https://github.com/SpartanLaboratories/KotlinBottools/issues/24),
  *"Phase 0 · 4 — KotlinBottools repository hygiene: .gitignore, gitleaks configuration and CI, README and CHANGELOG"*, a
  sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **Plan:** [`plan.md`](plan.md). The seven files were first committed to the version kept as
  [`superseded/plan-3-2026-11-12.md`](superseded/plan-3-2026-11-12.md); the current plan adds the configuration's two
  header sentences, which the build carries (§1). **Parent design:** unit `repository-hygiene` of
  [`../architecture.md`](../architecture.md), §10 and §15, with §5.2.
- **Consequences:** [`consequences.md`](consequences.md) holds what the unit leaves behind: the known gaps, the outcome of
  each assumption, and the follow-ups.
- **What this document is:** what the unit built and what it measured on its branch, before the landing. The landing and
  the reads after the merge (the plan's [LR](plan.md#lr--the-landing-read) and [P1 to P3](plan.md#p--after-the-merge))
  come after this record is committed; the issue's resolution comment reports their values.

---

## 1. What was built

- **The seven files,** on the unit's branch, each equal to the size, sha256 and blob id the plan records
  ([The change set](plan.md#the-change-set)):

  | File | Bytes | sha256 | Blob |
  |---|---|---|---|
  | `.gitignore` | 743 | `595973a6f08808688af99a69c168d96be4ce84c868e8f38630a226dcde43c33a` | `6c0d866ecd8ae25af0864ea808e960cfe40c4f16` |
  | `.gitleaks.toml` | 3824 | `c046de1754bd4bb3d92a62cd1651f3ea8bb2383ace96472595ee3ea49887568f` | `457a49a781e7e77e4e9b80a250690ddd8b2bc547` |
  | `.github/scripts/secret_scan.py` | 12073 | `b661e2dc1b0a3ca1893109bca0bd975efb761c4a2f2e3c7059af292eb8dcdd98` | `a3727a723dd793e7cf6b980c52adcb84a39ce601` |
  | `.github/scripts/allowlist_controls.py` | 8482 | `170fc4c359ba03e6f0b0adb7eb8ee2c393a5da09fe8868d88b24f76e86d3eac8` | `6c7ab689043428558e0bde471eb70b8deb47ec9a` |
  | `.github/workflows/secret-scan.yml` | 4820 | `6ec9118b78c04f33f7ef4515a80a831fab0ca9d3dbcc7549340c298dc397db94` | `70519c2c9e3c0b912db237ee5f9e9acc2dbf4d39` |
  | `README.md` | 9646 | `c0f1e85e5ead860570e1050182c7fb0607641bedce40f4f8eb6b2ba0afaae6a6` | `78246ea8ab99d8bdb98442d4ff06acce9bcf6eed` |
  | `CHANGELOG.md` | 1465 | `8f84f556e345a553eeaaf5410a0f7d3f2ee106c69ae2642e0939d119f479d364` | `c2dfbd13c345a2f3b27a47f2a1a1871aa535c28c` |

  The issue's scope names six files. The seventh, the allowlist controls, is the plan's
  [Requirements, item 7](plan.md#requirements): the table's own test, which the workflow runs.
- **The configuration** is the allowlist findings' complete file
  ([§6.1](research/scoped-allowlist-semantics.md#61-the-complete-file)) with two sentences inserted in its header comment.
  The first names the allowlist controls and says that a further table gets its own fixtures there; the second says that a
  `dir` scan applies the table only when run from the repository root. Its rules and its table are the findings' text: it
  differs from that block in those two comments only ([plan, `.gitleaks.toml`](plan.md#gitleakstoml)).
- **The wrapper** equals its research text and the workspace copy. **The workflow** equals its research text with the
  controls step inserted after the canary. **The controls**, **the README** and **the changelog** equal the plan's texts.
- **No version moves,** and nothing is published.
- **The plan was revised three times** before the build reached this form; the replaced versions are
  [`superseded/plan-1-2026-11-11.md`](superseded/plan-1-2026-11-11.md),
  [`superseded/plan-2-2026-11-11.md`](superseded/plan-2-2026-11-11.md) and
  [`superseded/plan-3-2026-11-12.md`](superseded/plan-3-2026-11-12.md):
  - the first revision added the allowlist controls, as a seventh file and a step of the workflow, with checks of the scan
    wrapper's failure paths, of the workflow's shell blocks and pins, further ignore-list tests and the expected results of
    the reads after the landing;
  - the second gave the controls the two fixtures that join text outside the exempted text's quotes, and held as steps the
    table's mutations, the remaining failure paths, the workflow's blocks run on both sides, an empty standard error and a
    shape check of the hosted runs' logs;
  - the third added the configuration's two header sentences.

  The files were built to each version in turn, and they are the current plan's.

---

## 2. Acceptance

| Criterion ([plan, Requirements](plan.md#requirements)) | Result |
|---|---|
| The seven files hold their recorded bytes, and the README's list of local files matches the code | Met (S3 `bytes`, `sources`, `toml`) |
| The two Python files parse, and their pure parts give their recorded results | Met (S3 `python`) |
| The workflow's shell blocks parse, and its names, runner, timeout, concurrency, triggers, permissions and pins are as recorded | Met (S3 `workflow`) |
| The ignore list ignores what each pattern names and nothing that is tracked, a source package or below the root of an anchored pattern | Met: 48 paths ignored and 32 not; the ignored set of this checkout is the same under the old file and the new (S3 `ignore-list`) |
| No file holds both PEM markers | Met (S3 `pem`) |
| The change set scans clean, in history (both ref sets) and in the tree, and the canary fires | Met (S4 `scans`, `canary`; §3.2) |
| The allowlist controls print `CONTROLS OK`, and fail on each of ten mutations of the table | Met (S4 `controls`, `mutations`; §3.3) |
| The controls' and the wrapper's failure paths answer status 2 with a fixed marker, or fail closed | Met (S4 `controls`, `negatives`) |
| Each of the workflow's shell blocks passes on the change set and stops on each failure it guards against | Met (S4 `workflow-run`; §3.4) |
| Every scan prints only counts, rule ids and fixed markers, and nothing on standard error; the filter for the hosted logs finds a line of another shape | Met (S1 and S4; S4 `log-filter`) |
| The privacy gate, its selftest passed, reports no blocking hit over the change set | Met: `GATE: 0 blocking hit(s)`, after `allow_tool selftest: 50 checks passed` (S5) |
| The `Secret scan` check passed on the pull request before the merge, its controls included, and its scan steps printed only fixed shapes | Read after the merge ([LR](plan.md#lr--the-landing-read)); the issue's resolution comment reports it |
| The workflow passed on `main` at the merge commit, its controls included, and its scan steps printed only fixed shapes | Read after the merge (P1); reported there |
| The workspace configuration equals the committed one | Done after the merge (P2); reported there |

The criteria marked met hold for the files as committed: after the configuration's header change, S2 `config`, S3, S4 and
S5 ran again over the final document set, before that set was committed.

---

## 3. Measurements

### 3.1 The procedure

Every step gave its expected number of `ok` lines, with no stop, in each run that ran it:

| Stage | Steps (`ok` lines) | Total |
|---|---|---|
| S1 | `branch` 7, `helpers` 8, `tools` 4, `github` 6, `before` 13 | 38 |
| S2 | `ignore` 1, `config` 3, `wrapper` 1, `controls` 1, `workflow` 3, `readme` 3, `changelog` 1 | 13 |
| S3 | `bytes` 7, `sources` 12, `toml` 2, `python` 4, `workflow` 23, `ignore-list` 83, `pem` 2 | 133 |
| S4 | `clone` 13, `scans` 14, `canary` 21, `controls` 42, `mutations` 42, `negatives` 64, `workflow-run` 22, `log-filter` 4 | 222 |
| S5 | `gate` 5 | 5 |

Every block runs from a file ([plan, Conventions](plan.md#conventions)). On this machine a command of about 7.6 KB was cut
on its way to Git Bash while one of 6.8 KB passed whole, and with its prelude S4 `negatives` is 8.2 KB.

### 3.2 Scans and the canary

- **Before the change,** the workspace configuration reports only the known finding on a clone of the branch:
  `curl-auth-user`, 2 findings in 1 file in history (both ref sets) and 1 in 1 in the tree.
- **With the committed configuration,** the history (both ref sets) and the tree of the change set print `RESULT: CLEAN`,
  with `gitleaks_exit=0 error_lines=0 findings=0` and the wrapper's commit counts equal to git's.
- **The canary** finds its planted secrets with the expected counts over 6 commits (`--refs all`) and 5 (`--refs
  branches`), and prints `CANARY OK` for both; the wrapper's `control` agrees with git for the four path rules.

### 3.3 The allowlist controls

- **The committed table:** all 22 controls as expected (eleven fixtures, each in git and dir mode), `CONTROLS OK`, in about
  half a minute; the same with the binary named on `PATH`, and with the document read from a bare clone.
- **The ten mutations,** each status 2 and `CONTROLS FAILED` with this many controls not as expected:

  | Mutation | Not as expected |
  |---|---|
  | `condition` line removed | 18 |
  | `targetRules` misspelled | 7, each dir fixture at the document's path |
  | `targetRules` naming an unknown rule | 22: the configuration does not load |
  | `paths` misspelled | 8 |
  | `regexes` misspelled | 10 |
  | the pinned text's start anchor removed | 2: `before-quotes` |
  | the pinned text's end anchor removed | 2: `after-quotes` |
  | the path's start anchor removed | 2: `prefixed-path` |
  | the path's end anchor removed | 2: `suffixed-path` |
  | the table removed | 6 |

  The full set for each is in the plan's [mutations step](plan.md#s4--scans).
- **Each failure path** of the controls exits with status 2 and its fixed reason, and a check that fails before any
  fixture is built leaves no work directory behind.

### 3.4 The workflow's blocks, run here

- Each of the six `run:` blocks passes on the change set: the canary's 33 lines, the controls' 23 and three for each scan,
  all of the fixed shapes, with nothing on standard error.
- Each stops on the failures it guards against, 20 cases in all, among them: the install step on a wrong checksum
  (status 1, nothing extracted) and on a version with no release (status 22); the input check at each of its five lines;
  the canary when the rules find nothing (1) and when a count differs (2); the controls on a widened table (2); and each
  scan on a finding (1) and on a scan it cannot verify (2), with its annotation.
- With the workflow's own values, the downloaded release archive passes its checksum and holds a Linux binary, whose
  version check cannot run on this machine.
- The log filter reads a passed run's log as 6 step headers and 62 lines, none of another shape.

### 3.5 Durations on this machine

S4 `controls` takes about two and a half minutes, `mutations` about five and a half, `workflow-run` about three and a half
(it downloads the release archive twice), and `negatives` about a minute; every other step takes seconds.

---

## 4. Deviations from the plan

None. The build follows the current plan:

- the plan's earlier versions are kept under `superseded/` (§1); building to the plan that replaced them is no deviation;
- the issue's scope names six files and the plan seven; the plan's Requirements give the seventh (§1);
- the configuration differs from its research block by the two header sentences the current plan specifies (§1).
