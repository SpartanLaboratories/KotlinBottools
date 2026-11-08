# Phase 0 · 1 — Preparation: as built

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#21](https://github.com/SpartanLaboratories/KotlinBottools/issues/21),
  *"Phase 0 · 1 — Preparation: pinned tools, workspace, backup mirrors, legacy data copy and
  manifests"*, a sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **Plan:** [`plan.md`](plan.md). **Parent design:** unit `preparation` of
  [`../architecture.md`](../architecture.md), §5, §6.1, §6.2, §6.3 and §15.
- **Consequences:** [`consequences.md`](consequences.md) holds the known gaps and follow-ups.
- **What this document is:** the state this unit built on this machine, in results and counts.
  Everything is local to this machine; no repository, ref, issue or setting on GitHub changed.

Paths below are written as `%USERPROFILE%` forms; `WS` is `%USERPROFILE%\BotWS` and `DATA` is
`%USERPROFILE%\BotLegacyData`.

---

## 1. What was built

- **The two folders.** `WS` and `DATA` exist under the user profile, outside OneDrive, outside the
  project-checkouts folder and inside no repository, each with no `Everyone`, `Users` or
  `Authenticated Users` access entry.
- **The toolchain at its pins** (recorded in `DATA/run/tool-versions.txt`):
  - git 2.55.0.windows.5, Python 3.14.7, pip 26.2.1, gh 2.100.0, GNU tar 1.35;
  - git-filter-repo 2.47.0 in the Python 3.14 user scheme, verified by its two independent values
    (the version prefix and the installed module's sha256, both equal to the upstream tag's
    script);
  - gitleaks 8.30.1 from the release zip, verified by the four equal sha256 values. The release
    has no signature or attestation.
- **The tool folder.** 44 files saved under `WS/tools`, each with its recorded size and sha256 (the
  plan's Appendix A and the research listings), and the patched `copy-data.sh`.
- **The path-scrub expression file,** `DATA/run/scrub/replace-text.txt`: three `regex:` lines, 291
  bytes, written from the checkout's parent folder. It names no account and stays out of every
  repository.
- **The fixture rehearsal** of filter-repo passed on Python 3.14.7, with the purge list and the scrub
  in one run. CPython 3.13 is not installed; the fallback did not run.
- **The six path lists** are written and proved byte-wise, with their copies and `SHA256SUMS` in
  `DATA/run/lists/`.
- **Non-interactive authentication** holds against all six repositories, with `gh auth
  git-credential` as the only credential helper.
- **Six mirrors and six untouched backups** exist in `WS/mirror` and `WS/backup`, each with its
  `ls-remote` listing at clone time and a checksum list of every backup file under
  `DATA/rewrite/<repo>/`.
- **The legacy data copy** of `BotData.xml` and `guildData/`, blob by blob from the three backup
  mirrors into `DATA`, verified by blob id. `DATA/COPY-VERIFIED` exists and is empty.
- **The manifests of purged blob ids, the expectation rows and the positive-control scans** of the five
  static repositories, in `DATA/manifests/` and `DATA/rewrite/<repo>/`.

---

## 2. Acceptance

| Criterion | Result |
|---|---|
| The tool versions are recorded and verified | Met |
| The canary and the fixture rehearsal, including the scrub's cases, give their expected counts | Met |
| The six lists are proved | Met: 11, 10, 11, 9, 23 and 6 entries, each byte count and sha256 equal to its recorded value |
| The six backups exist and are untouched | Met: each backup's checksum list verified after the last stage |
| `COPY-VERIFIED` is written after the three data copies verify by blob id | Met |
| The five static repositories' expectation rows equal the research table, and their positive controls come out as expected | Met |
| The output named nothing sensitive | Met for what the unit prints and writes (the plan's Requirement 11, which leaves the generated boards' commit-id fields outside it). For the output: every script prints counts, rule ids and markers only, and the five-pattern scan of the as-run log found nothing. For the documents: the plan, its replaced copy, the consequences and this record were scanned for the barred forms (40-digit hexadecimal ids, 17-to-20-digit numbers, `guildData/<x>` paths, the account name, user-profile paths) and hold none; the one 40-digit id they carry is the blob id of the upstream git-filter-repo script, not an id of these repositories. S9's scan cannot itself prove that nothing sensitive was named: it reads the as-run log alone, and neither scan can recognise a guild or member name in free text, so the guarantee rests on no script printing those values and on the documents carrying no value read from `guildData/`, `logs/` or the data files |

---

## 3. Measurements

### 3.1 The procedure's own record

`DATA/run/as-run.log` holds 19 of 19 `STAGE ... OK` results, 19 `exit=0` lines, no `STOP`, no `RECORD`
line, and `UNIT OK`.

### 3.2 The canary and the fixture

- **Canary (gitleaks through its wrapper):** both scans gave their first line and every rule's
  distinct-file count: `commits_scanned=6 expected_commits=6` over every ref and
  `commits_scanned=5 expected_commits=5` over branches and tags, each verified `CANARY OK`.
- **Fixture rehearsal of filter-repo:**
  - `You rewrote 5 (of 5) commits`, with 2 commits pruned and 3 commits left, the commit-map rows and
    `first-changed-commits` as expected, every purge entry at 0 afterwards.
  - The three scrub expressions matched these (commit, file) pairs, matches and commit-message lines
    before the run, and nothing after it:

    | Expression | Pairs | Matches | Message lines | After the run |
    |---|---:|---:|---:|---|
    | Project-checkouts folder | 4 | 16 | 7 | 0 |
    | Its dash-mangled form | 2 | 4 | 2 | 0 |
    | User-profile folder | 2 | 16 | 8 | 0 |

  - The binary fixture file's blob id is unchanged, and every kept text file and the fixture message
    equal their expected text byte for byte (`verify: failures=0`).
  - The UTF-16 list is rejected by the byte proofs; run through filter-repo in a fresh fixture mirror it
    exits 0 having rewritten nothing, which the entry check then rejects.

### 3.3 Mirrors and backups

| Repository | Refs | Backup files |
|---|---:|---:|
| KotlinBottools | 2 | 22 |
| GKB2 | 2 | 22 |
| GKB | 1 | 22 |
| BotTools | 4 | 22 |
| TrumpBot | 2 | 22 |
| Support | 1 | 22 |

### 3.4 The legacy data copy

| Source | Records | Hash mismatches |
|---|---:|---:|
| KotlinBottools `main` | 30 | 0 |
| GKB2 at the parent of the commit that deletes `guildData/` | 30 | 0 |
| TrumpBot `main` | 31 | 0 |

### 3.5 Manifests and expectation rows

All values equal the research table. `P` and the commits after are the table's own (`T − P`); each later
rewrite proves `P`.

| Repository | T | P | Commits after | Paths kept | Blobs kept | Blobs total | Manifest | Shared | Largest kept (bytes) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| GKB2 | 32 | 2 | 30 | 82 | 211 | 292 | 81 | 0 | 60,756 |
| GKB | 11 | 2 | 9 | 60 | 113 | 171 | 58 | 0 | 60,756 |
| BotTools | 16 | 1 | 15 | 82 | 145 | 184 | 39 | 2 | 27,168 |
| TrumpBot | 11 | 2 | 9 | 56 | 106 | 305 | 199 | 0 | 25,952 |
| Support | 2 | 1 | 1 | 29 | 29 | 7,288 | 7,259 | 0 | 14,302 |

The variants pinned to the pull-request refs equal their predictions: GKB2 `blobs_kept=281`,
`manifest=11`; BotTools `blobs_kept=184`, `manifest=0`.

### 3.6 Positive controls on the untouched backups

| Repository | Findings (all rules) | Result | Control |
|---|---:|---|---|
| GKB2 | 79 | `RESULT: FINDINGS` | `CONTROL OK`; every named token and data-file probe above zero |
| GKB | 59 | `RESULT: FINDINGS` | `CONTROL OK`; every named token and data-file probe above zero |
| TrumpBot | 3,518 | `RESULT: FINDINGS` | `CONTROL OK`; every named token, key and data-file probe above zero |
| BotTools | 0 | `RESULT: CLEAN` | the six owned rule ids absent |
| Support | 0 | `RESULT: CLEAN` | the six owned rule ids absent |

- **Token rule:** its probes fired on every real token file of GKB2, GKB and TrumpBot. No
  coverage gap was recorded.
- **Findings in kept files:** 0 in all five repositories (`total_kept=0`; the limit of that count is
  in the consequences).

---

## 4. Deviations from the plan

None. The procedure of [`plan.md`](plan.md) ran as written, on Python 3.14.7, without its Python 3.13
fallback.
