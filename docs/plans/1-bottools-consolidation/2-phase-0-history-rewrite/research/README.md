# Research — Phase 0, history rewrite

## Header / Association

- **For:** [SpartanLaboratories/KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2),
  *"Phase 0 — History rewrite: purge secrets and data from the six bot repositories"*, a
  sub-issue of [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **Design inputs:** [`../../architecture.md`](../../architecture.md) §1.3, §11 and §14 unit 0;
  [`../../roadmap.md`](../../roadmap.md) § "Phase 0 — History rewrite";
  [`../../research/bot-repository-history-purge.md`](../../research/bot-repository-history-purge.md).
- **Files:** this README holds the questions, the verification results and the summary. Each
  `<question-slug>.md` file beside it holds the findings for one question and is not edited here.
- **Date:** 2026-10-20.
- **Citations:** documents by section, code by symbol, commits by subject. Revisions are named
  by rule (for example "the parent of the commit that deletes `guildData/`"), not by a
  pre-rewrite hash.
- **Public material.** This folder becomes public with KotlinBottools at the end of the phase.
  No secret value, cookie value, member name, guild name or Discord id appears in it. Data files
  are named by top-level path, count and size only. Neither pre-rewrite commit hashes nor the
  ids of purged blobs are listed here, because either one can be used to look up the old
  objects.

This file holds three things:

1. the research questions;
2. the verification results for the outside-world claims their answers rest on;
3. the summary that the phase's architecture is designed from.

---

## Part 1 — Research plan

### 1.1 The work these questions serve

Phase 0 removes secrets, data, IDE files and build output from the histories of six
repositories: KotlinBottools, GKB2, GKB, BotTools, TrumpBot and Support. KotlinBottools then
becomes public.

- **The rewrite.** Each repository is rewritten with `git filter-repo` from a mirror clone, using
  a root-anchored literal path list, and then force-pushed. The order is:
  1. KotlinBottools;
  2. GKB2 and GKB;
  3. BotTools, TrumpBot and Support.
- **Execution.** Each unit of the phase is a sub-issue of #2, carried out from one Windows 11
  machine by its own run, which follows a written plan literally.
  - Every step has a check and a stop condition.
  - A failing verification stops the run before anything irreversible.
  - The run does its local work itself. Every write to GitHub, or to a repository's checkout on
    this machine, is sent as a request that carries the plan's procedure and expected results,
    and the run verifies it afterwards. Those writes include the pushes, a repository's creation,
    renames, archiving, visibility and security settings, issue transfers and relationships,
    labels and comments.
  - The force-pushes and the visibility change need no separate approval step.
- **No GitHub Support ticket is filed** for any repository. After the rewrite, these stay on
  GitHub and keep the old objects reachable:
  - GKB2's `refs/pull/6/head`;
  - BotTools' `refs/pull/2/head` and `refs/pull/3/head`;
  - every repository's cached commit views.

  The phase states what its exit tests can prove under those conditions and reports the
  remaining exposure.
- **The legacy data copy.** Before anything is rewritten, `BotData.xml` and `guildData/` are
  copied to an ordinary local folder on this machine that outlives the run. They come from three
  places:
  - KotlinBottools `main`;
  - GKB2 at its last state before its data was deleted;
  - TrumpBot `main`.

  A manifest of the blob ids to purge is recorded beside the copy, outside every repository.
- **The main working copy.** KotlinBottools' main working copy on this machine is the working
  directory of the sessions that work on the repository. It cannot be deleted or renamed, so it is
  brought onto the rewritten history in place. The local TrumpBot clone is deleted and cloned
  again.
- **The mirror clones** live in a dedicated workspace outside every project folder. They are
  deleted once the exit tests pass, so only the data copy remains.
- **No pushes in between.** Nothing is pushed to a repository between its mirror clone and its
  mirror push. A commit that must survive is pushed before that repository's mirror clone is
  taken.
- **KotlinBottools afterwards:**
  - a root-anchored `.gitignore`;
  - a gitleaks configuration and CI job;
  - public visibility, with GitHub secret scanning and push protection.
- **The planning documents** reach `main` before the rewrite, through a pull request on the
  pre-rewrite repository. That repository is kept private once the rewrite is done (§3.9), so the
  `refs/pull/*` of that pull request, which pin the pre-rewrite history, never become public.
- **Nothing sensitive in the output.** No secret, member name, guild name or Discord id appears
  in any command output, document, commit message, pull-request text or issue comment.

**Starting point (2026-10-20).**

| Item | State |
|---|---|
| Machine | Windows 11, Git Bash and Windows PowerShell 5.1; git 2.55.0.windows.5 with `core.autocrlf=true` in the system configuration; Python 3.14.7 with pip 26.2.1; GNU tar 1.35 in Git Bash; no `jq` binary; HTTPS remotes through Git Credential Manager |
| Tools to install | `git filter-repo` (PyPI lists 2.47.0, the newest release); gitleaks (newest release v8.30.1, with a Windows x64 zip and a checksums file) |
| GitHub | `gh` 2.100.0, signed in as an administrator of the organisation; no forks, tags, branch protection or rulesets on any of the six repositories |
| KotlinBottools | private; `main` and `docs/issue-1-bottools-consolidation`; no `refs/pull/*`; no `.github/`; `main` has no `docs/` directory |
| GKB2 | public; `master`; `refs/pull/6/head` |
| GKB | public; `master` |
| BotTools | public; `main`, `Working-Branch`; `refs/pull/2/head`, `refs/pull/3/head` |
| TrumpBot | private; `main`, `feature/pokercommand` |
| Support | private; `main` |
| Secret scanning | off on GKB2, GKB and BotTools; on, with push protection, on MagicBot, whose `.gitleaks.toml` already guards the predecessor bots' token and data file names |

### 1.2 Reuse first

[`../../research/bot-repository-history-purge.md`](../../research/bot-repository-history-purge.md)
is current: it was read on 2026-10-20, and every one of its 24 load-bearing claims held at
source ([`../../research/README.md`](../../research/README.md) Part 2). It answers these questions,
which are not researched again:

- what each history contains, and the path list per repository (its §3.1 and §6.2);
- why `git filter-repo` by path is used rather than BFG or `--replace-text` (its §2, §4 and
  §6.8);
- the push command, and what GitHub keeps after a force-push according to its documentation
  (its §3.4);
- archiving and visibility semantics (its §3.6);
- the exit criterion's checks (its §6.5);
- the `.gitignore` patterns (its §6.6);
- the CI job's shape, and why the gitleaks GitHub Action is not used (its §6.7).

The two branches that research could not inspect have since been read through the GitHub API:

- **BotTools `Working-Branch`** is one commit beyond its merge base with `main`. That commit:
  - removes a file under `lib/bin/`, a path the list already purges;
  - adds a publishing block, which holds no credential, to `lib/build.gradle`.
- **TrumpBot `feature/pokercommand`** is two commits ahead of `main`. Both touch `src/commands/`
  only. A pattern scan of their patches found no token shape, no id-sized number, no credential
  assignment and no private-key header.

Neither branch adds a purge path.

The questions below cover only what the phase's design newly depends on: running these tools on
this machine, what remains reachable without GitHub Support, bringing the existing clones onto
the new histories, and what the rewrite leaves and touches.

### 1.3 Questions

#### 1. How should `git filter-repo` be installed, run and checked on this machine so that each mirror is rewritten completely and its outputs are kept?

**Options to compare:**

- **Installation:**
  - from PyPI with pip, at version 2.47.0, in the user scheme or the interpreter's scheme;
  - a winget package, if one exists;
  - the single-file script from the v2.47.0 release, placed on `PATH`.
- **Writing the path list:**
  - Git Bash `printf`;
  - a file kept in the workspace;
  - filter-repo's `--path` arguments on the command line.

**Requirements:**

- The tool supports `--sensitive-data-removal`, which needs version 2.47 or newer.
- It runs on Python 3.14.7 and git 2.55.0.windows.5, invoked as `git filter-repo` from Git Bash.
- The installation is verified, by version and by integrity, before any rewrite.
- The path lists are read exactly as written on Windows, whatever produced the file. That
  includes:
  - line endings and any byte-order mark;
  - entries containing spaces, such as `framed photo.png`.
- The outputs of each run are kept outside every repository:
  - `commit-map`, `ref-map`, `changed-refs` and `first-changed-commits`;
  - the printed cleanup instructions.
- A failed or partial run is detected by exit status and by checks that never read purged
  content.
- No step prints a path under `guildData/` or `logs/`. Those paths carry guild and member names,
  and filter-repo's analysis reports list paths.

**Evidence that settles it:**

- **The tool itself, at v2.47.0:** filter-repo's manual and source, covering:
  - how `--paths-from-file` is parsed;
  - what `--sensitive-data-removal` fetches and what it does with the `origin` remote;
  - the files it writes;
  - its exit codes;
  - the reports `--analyze` produces.
- **Known problems:** its release notes and issue tracker, for reports from Windows and from
  Python 3.13 and 3.14.
- **Packaging:** PyPI's metadata (files, hashes, `Requires-Python`) and winget-pkgs' manifests.
- **This machine:** a read-only check of where pip would place the `git-filter-repo` launcher,
  compared with the `PATH` that Git Bash sees.

**Findings:** [`git-filter-repo-on-windows.md`](git-filter-repo-on-windows.md)

#### 2. How should gitleaks check the rewritten histories on this machine and guard KotlinBottools in CI?

**Options to compare:**

- **Installation:**
  - the release zip, verified against the release's checksums file;
  - a winget package.
- **Configuration:**
  - MagicBot's `.gitleaks.toml`, extended for the file names that only the older repositories
    held;
  - a configuration written for KotlinBottools alone.
- **CI:**
  - a workflow file of its own;
  - a job inside a shared `ci.yml`.

**Requirements:**

- gitleaks is at v8.30.1, the newest release.
- It scans every ref of a bare mirror, `refs/pull/*` included.
- It reports findings without printing secret values or data paths.
- A positive control comes first. Run on the history from before the rewrite, the configuration
  must flag the purged token and data files. Only after that does a clean result on the
  rewritten history count.
- **The CI job:**
  - runs on `ubuntu-latest` with `contents: read` and a full-history checkout;
  - uses the binary pinned to a release and verified by checksum;
  - redacts findings;
  - leaves public logs that name no secret and no data path.
- The configuration agrees with MagicBot's, which guards the same file names.
- The workflow does not collide with the `ci.yml` that the build-skeleton phase adds later.

**Evidence that settles it:**

- **gitleaks at v8.30.1:** the README, the configuration documentation and the source, covering:
  - the configuration schema, including path-only rules and allowlists;
  - how path rules behave when scanning git history;
  - the default `git log` options;
  - the report and redaction flags;
  - exit codes;
  - how binary and large files are handled.
- **The v8.30.1 release:** its releases page and checksums file.
- **winget-pkgs:** the manifests.
- **The CI building blocks:** the current major release of `actions/checkout`, and the
  organisation's existing workflows (MyGameTools' `ci.yml`).
- **The precedent:** MagicBot's `.gitleaks.toml`.

**Findings:** [`gitleaks-local-and-ci.md`](gitleaks-local-and-ci.md)

#### 3. After a force-push without GitHub Support, what of the old history stays reachable on GitHub, by which routes and to whom, and what does that mean for making KotlinBottools public?

**Options to compare:**

- **Measuring what remains:**
  - per repository after the push: status-only probes of old commit and blob ids through the
    REST API and the web pages, signed in and anonymous, and fetches of the pull-request refs;
  - GitHub's documentation alone.
- **The push:**
  - `git push --force --mirror`, with the rejected `refs/pull/*` updates expected and each ref's
    status checked;
  - a push that leaves `refs/pull/*` out.
- **KotlinBottools' settings:**
  - `gh repo edit --visibility public --accept-visibility-change-consequences`, then the REST
    `security_and_analysis` update;
  - the web settings page.

**Requirements:**

- No GitHub Support ticket is filed for any repository.
- GKB2's and BotTools' pull-request refs, and every repository's cached commit views, remain on
  GitHub.
- Measuring what remains never reads or prints content.
- KotlinBottools changes from private to public after its rewrite, with secret scanning and push
  protection on, under the organisation's GitHub Free plan.
- The push is proved successful ref by ref. The expected rejection of read-only refs does not
  hide any other failure.

**Evidence that settles it:**

- **GitHub's documentation:**
  - removing sensitive data;
  - setting repository visibility;
  - enabling secret scanning and push protection;
  - the REST "update a repository" endpoint's `security_and_analysis` fields;
  - the repository activity view and who can see it;
  - which events are visible;
  - what secret scanning scans.
- **GitHub's changelog.**
- **git's push documentation:** `--mirror`, `--porcelain` and the exit status.
- **Published research** on how GitHub serves objects that no ref reaches.
- **Read-only probes:** for example, MagicBot's settings as the shape of an enabled
  configuration.

**Findings:** [`github-residual-exposure-and-visibility.md`](github-residual-exposure-and-visibility.md)

#### 4. How are this clone and the TrumpBot clone brought onto the rewritten histories, and how are the legacy data and the blob manifests captured exactly, with git 2.55 on Windows?

**Options to compare:**

- **This clone:**
  - git-filter-repo's documented procedure for other copies of a rewritten repository;
  - replacing this clone's `.git` with a fresh clone's.
- **TrumpBot:**
  - delete and clone again, keeping its untracked files;
  - clean it in place.
- **The data copy:**
  - `git archive` piped to `tar`;
  - `git archive` with line-ending conversion switched off;
  - `git cat-file` for each blob.
- **The manifests:**
  - `git rev-list --objects --all`, filtered by path;
  - filter-repo's analysis of blobs and paths.

**Requirements:**

- **This clone:**
  - its directory is never deleted or renamed;
  - no data is lost before the copy exists;
  - afterwards no old object remains in it, as `git cat-file` proves for the first changed
    commits and for every manifest blob id.
- **Branches and files:**
  - local branches end on their rewritten counterparts;
  - a local branch with no counterpart is handled by a stated rule, not by judgement;
  - untracked files are kept.
- **The data copy:**
  - it is byte-identical to the blobs, although `core.autocrlf=true` is set system-wide here;
  - this is verified by blob id.
- **The manifest** lists only blobs that become unreachable. A blob that is also reachable under
  a kept path, the empty blob for instance, is not a purged blob.
- **Output:** commands print ids, counts and sizes, never data paths.

**Evidence that settles it:**

- **git's documentation for 2.55:** `git-reset`, `git-reflog`, `git-gc`, `git-prune`,
  `git-archive`, line-ending conversion in `gitattributes`, `git-hash-object --no-filters`,
  `git-cat-file` and `git-rev-list --objects`.
- **filter-repo's manual:** cleaning up other clones, and the `--analyze` outputs.
- **Git for Windows:** notes on file locking.
- **This clone:** read-only checks.

**Findings:** [`clone-realignment-and-data-extraction.md`](clone-realignment-and-data-extraction.md)

#### 5. What does the rewrite leave in each repository, and what else does it touch: this repository's documents, issue and pull-request texts, and the organisation's other repositories?

**Options to compare:**

- **Expectations for the exit tests:**
  - computed from the GitHub API before the rewrite, from each commit's tree;
  - taken only from the mirrors during the run.
- **Pre-rewrite hashes in documents:**
  - left as dated citations;
  - rewritten from `commit-map`;
  - removed from documents that become public.

**Requirements:**

- Each rewritten history is compared with a stated expectation:
  - the paths that survive;
  - the only binary allowed;
  - the largest surviving blob;
  - the commits that disappear.
- The parent research's purge lists stay root-anchored and complete for every ref, including
  BotTools `Working-Branch` and TrumpBot `feature/pokercommand`.
- Nothing that becomes public with KotlinBottools names a guild, a member or a Discord id. That
  covers:
  - the documents on both branches;
  - commit messages;
  - issue bodies and comments.

  This is checked by count, never by printing.
- KotlinBottools' `.gitignore` change reaches `main` without putting the planning branch's pull
  request into conflict.
- During this research the legacy repositories are read through the GitHub API, not cloned.

**Evidence that settles it:**

- **The GitHub API:** trees and commits for each repository.
- **This repository's two branches.**
- **Issue texts:** KotlinBottools' issues #1 to #19, and MagicBot's and WebTools' issues.
- **`SpartanLaboratories/.github`.**

**Findings:** [`purge-blast-radius.md`](purge-blast-radius.md)

### 1.4 Lenses

Each findings file works through these, wherever they bear on its question.

1. **Best systems for the purpose:** how organisations that do history purges and secret-scanning
   set-ups well actually run them, and which approaches fail in practice.
2. **Common practice and convention:** GitHub's and git's documented procedures, and the
   organisation's own conventions (MyGameTools' workflows, MagicBot's gitleaks configuration).
3. **Idiomatic Kotlin:** does not apply. This phase writes no Kotlin.

---

## Part 2 — Verification results

All 122 load-bearing claims in the five findings files were re-opened at their sources on 2026-10-21,
at the versions the claims name. Those versions are:

- git v2.55.0 and Git for Windows v2.55.0.windows.5;
- git-filter-repo v2.47.0;
- gitleaks v8.30.1;
- actions/checkout v7.0.1;
- GitHub's documentation and REST description at `main`;
- gh 2.100.0.

All 122 hold. None fails, and none is unclear.

| Findings file | Claims | Hold | Fail | Unclear |
|---|---|---|---|---|
| [`git-filter-repo-on-windows.md`](git-filter-repo-on-windows.md) | 29 | 29 | 0 | 0 |
| [`gitleaks-local-and-ci.md`](gitleaks-local-and-ci.md) | 26 | 26 | 0 | 0 |
| [`github-residual-exposure-and-visibility.md`](github-residual-exposure-and-visibility.md) | 29 | 29 | 0 | 0 |
| [`clone-realignment-and-data-extraction.md`](clone-realignment-and-data-extraction.md) | 29 | 29 | 0 | 0 |
| [`purge-blast-radius.md`](purge-blast-radius.md) | 9 | 9 | 0 | 0 |

Some values were recomputed rather than read:

- **git-filter-repo v2.47.0 script.** Its sha256 was recomputed from the tag's raw file and from the
  PyPI wheel, and the two are identical. Its git blob id was recomputed too.
- **The PyPI wheel.** Its sha256 was recomputed.
- **gitleaks v8.30.1.** The sha256 of the Windows x64 zip and of the Linux x64 tarball were recomputed.
  Both match the checksums file and the release's asset digests. The release still has no signature
  and no attestation.

### 2.1 Notes that qualify the claims

- **Newer git releases.** git 2.56.0 (2026-09-28) and Git for Windows 2.56.0.windows.1 and .windows.2
  were released after the procedures were written.
  - In 2.56 the repack-and-prune logic of `git gc` moved from `builtin/gc.c` to `odb/source-files.c`.
    Its behaviour is unchanged: `--prune=now` still repacks with `-a` and prunes.
  - `other_head_refs` gained a repository argument.
  - The quoted documentation is unchanged.
  - Git for Windows' `compat/mingw.c` was not re-checked at 2.56.

  The procedures are written for the git installed here, 2.55.0.windows.5, and the run uses that
  version.
- **A probe prefix.** The residual-exposure findings (§3.1 and their re-runnable observations) give the
  demonstration repository's commit as a 12-digit prefix with one wrong digit.
  - The correct prefix answers 200 on the web, `.patch` and REST routes, and so do its 7- and 4-digit
    forms.
  - A 3-digit prefix answers 404 on the web and 422 on REST.

  No recommendation depends on the prefix.
- **Dates.** In claim 27 of the git-filter-repo findings:
  - 2024-12-14 is the author date of the multi-line-configuration fix; it was committed on
    2025-01-28;
  - the Python 3.14 fix is dated 2025-07-26 UTC.
- **Wording.** A few quotes join adjacent source lines or skip a blank line. The substance is
  unaffected.

### 2.2 Claims about these repositories

These were spot-checked against this clone and the GitHub API.

- **Commit counts.** The two branches hold 61 commits between them, one of which is a merge.
  - One non-merge commit lies wholly inside KotlinBottools' purge list: "Removed build folder",
    2023-01-02.
  - With the merge that sits above it, that makes two pruned commits.
- **The README.**
  - Lines 233 to 235 and 261 to 265 name files that leave the repository.
  - Line 257 is the `services` source package, which is kept.
  - `Bot.initializeBotExistence` reads `key.txt`.
- **`src/jvmTest/resources/PoECurrencyKeys.xml`.** This file in GKB2 and GKB is 293 bytes and on a
  kept path. It is a table of `initial`/`terminal` scraping markers. A pattern scan found:
  - no token shape;
  - no long hexadecimal string;
  - no key assignment;
  - no key parameter in a URL.
- **This folder's documents** contain no guild folder name from the three data sets. The check matched
  whole words and printed counts only. Every match was an ordinary English word, used in its ordinary
  sense.

---

## Part 3 — Summary

### 3.1 Findings files

| # | File | What it settles |
|---|---|---|
| 1 | [`git-filter-repo-on-windows.md`](git-filter-repo-on-windows.md) | Installing, running and checking the rewrite tool on this machine |
| 2 | [`gitleaks-local-and-ci.md`](gitleaks-local-and-ci.md) | The scanner: local exit tests, the configuration, the positive control, the CI job |
| 3 | [`github-residual-exposure-and-visibility.md`](github-residual-exposure-and-visibility.md) | What GitHub keeps after the push, the push itself, the visibility change and the scanning settings |
| 4 | [`clone-realignment-and-data-extraction.md`](clone-realignment-and-data-extraction.md) | The two existing clones, the data copy, the blob manifests |
| 5 | [`purge-blast-radius.md`](purge-blast-radius.md) | Post-rewrite expectations, the privacy gate, references, `.gitignore`, the README, the parent statements that change |

### 3.2 The rewrite tool

Source: findings 1, §3 and §6; findings 4, §3.9.

- **Installation.** git-filter-repo 2.47.0 is installed from PyPI into the user scheme, with hash
  checking: `python -m pip install --user --require-hashes --only-binary=:all: --no-deps` with a
  requirements file that pins the wheel's sha256. The launcher lands in
  `%APPDATA%\Python\Python314\Scripts`, which is already on Git Bash's `PATH`.
  - No winget package exists.
  - The single-file script has no integrity mechanism.
  - A plain install into the interpreter's scheme would leave `git filter-repo` unfound.
- **Verification.** Before any rewrite, two independent values must match:
  - `git filter-repo --version`, which prints the script's 12-character blob id, `a40bce548d2c`;
  - the installed module's sha256, which equals the upstream tag's script.

  Both values were recomputed in verification.
- **Path lists.** filter-repo reads a list file as raw bytes and strips only the line ending. A
  byte-order mark or a trailing space becomes part of the entry. It validates nothing, and when an
  entry matches nothing it exits 0 without a warning. A list saved by Windows PowerShell (UTF-16) or
  with a typo is therefore a silent no-op. So:
  - each list is written with Git Bash `printf '%s\n'`;
  - it is proved against the byte count and sha256 recorded in the runbook;
  - character checks prove the rest: no carriage return, no non-ASCII byte, no blank line, only the
    allowed characters.
- **The run in a mirror.** In a `git clone --mirror`, `--sensitive-data-removal` behaves as follows:
  - it fetches nothing, because the clone sets `remote.origin.mirror`;
  - it keeps the `origin` remote;
  - it writes `commit-map`, `ref-map`, `changed-refs`, `first-changed-commits` and
    `suboptimal-issues` under `<mirror>/filter-repo/`;
  - it prints a NEXT STEPS block whose push line is `git push --force --mirror origin`.

  A mirror is used for one run only. A second run becomes a continuation and can reach an interactive
  prompt.
- **Success is defined by counts from git.** A run succeeds only when every one of these holds:
  - exit status 0;
  - no `fatal`, `error` or `Traceback` line in the log;
  - `You rewrote C (of T)` agrees with `commit-map`;
  - every list entry matches at least once before the rewrite and zero times after, by
    `git rev-list --all --full-history --count -- ':(top,literal)<entry>'`;
  - the commit count after equals T minus the pruned commits;
  - `origin` is still present.

  Any failure discards the mirror before anything is pushed.
- **Windows hazards.**
  - `fast-import` rejects kept paths with characters NTFS forbids. No kept path in the six histories
    has one (findings 5, §3.A).
  - `--analyze` can loop on paths that look like drive letters, so it runs under `timeout`.
  - Case-colliding refs abort a mirror run. There are none.
  - filter-repo 2.47.0 ran cleanly on a throwaway fixture with git 2.55.0.windows.5 and Python 3.14.7.
- **Outputs.** These are kept outside every repository:
  - the rewrite's metadata files and its log;
  - the NEXT STEPS block;
  - the list and a `SHA256SUMS` file.

  They hold pre-rewrite ids, which are lookup keys for the old objects on GitHub. They are never
  committed and never quoted in a document.

### 3.3 The scanner

Source: findings 2, §3 and §6.

- **Installation.** gitleaks v8.30.1 comes from the release zip, checked by four equal sha256 values:
  - the checksums file;
  - a pinned constant;
  - the release API's asset digest;
  - the winget-pkgs manifest.

  The release has no signature and no attestation, and `gitleaks.exe` is not Authenticode-signed.
- **The exit status is not proof.** At v8.30.1, `gitleaks git` exits 0 and prints "no leaks found"
  when its internal `git log` fails. Every scan therefore runs through a wrapper, `secret_scan.py`,
  which:
  - requires the scanned-commit count to equal an independent count from `git log`;
  - requires zero error lines in the log and a parseable JSON report;
  - prints only counts, rule ids and fixed markers.
- **Scan options.** gitleaks' default log options skip content that only a merge commit carries, and
  pure renames. The move of GKB2's token file from `key.txt` to `keys.txt` is such a rename.
  - `--log-opts` therefore carries `--full-history --no-renames -m`, plus either `--all` or
    `--branches --tags`.
  - Other flags: `--redact=100`, `--no-banner`, and a JSON report kept in the workspace.
  - `-v` is never used, because it prints paths, commit ids and author identities.
- **The configuration** keeps MagicBot's three rules unchanged and adds two:
  - unchanged: `discord-bot-token`, `bare-token-file` and `legacy-bot-data-file`;
  - added: `legacy-key-file`, for `keys.txt` and `key.pem`;
  - added: the root-anchored `legacy-state-directory`, for `logs/`, `services/` and `log.txt`.

  There is no allowlist. The planning documents scan clean without one, and a path allowlist would
  switch off every rule, the token and private-key rules included, for the paths it names.
- **The positive control.** Path-only rules fire once per text hunk, and never for a deletion, an empty
  file or a binary. The control therefore compares the distinct files reported per rule with git's
  own count of those files. It has two layers:
  - a synthetic canary mirror, holding fake secrets, a pull-request ref, a merge-only secret and a
    pure rename;
  - each untouched pre-rewrite mirror.

  BotTools and Support hold none of the guarded files, so for them the control is a negative baseline
  only.
- **The exit tests.**
  - The branches-and-tags scan of each rewritten mirror must be clean.
  - For the four repositories without pull-request refs, the all-refs scan must equal it.
  - For GKB2 and BotTools, the all-refs result is measured and reported.
- **CI.** The job lives in `.github/workflows/secret-scan.yml`, separate from the `ci.yml` the
  build-skeleton phase adds. It:
  - runs on `ubuntu-latest` with `contents: read`;
  - checks out with `actions/checkout` v7.0.1, pinned to its commit, with `fetch-depth: 0` and
    `persist-credentials: false`;
  - uses the Linux x64 tarball, pinned by sha256;
  - runs the canary first, then the history scan, then the tree scan;
  - is triggered by pushes to `main`, pull requests to `main` and manual dispatch;
  - shows only counts by rule id in its log.

### 3.4 GitHub after the push, and the visibility change

Source: findings 3, §3 and §6; findings 5, §3.A and §3.D.

- **What GitHub keeps.** After a force-push, GitHub keeps serving every pre-rewrite commit, tree and
  blob by id, on every route:
  - the web commit, tree, blob, raw, compare and archive views;
  - the REST commit, git-object, contents and zipball endpoints;
  - a fetch by id over the git protocol, which sends all of the commit's ancestors.

  GitHub documents no expiry. A 4-digit hexadecimal prefix resolves wherever it is unambiguous.
- **The push.** `refs/pull/*` is advertised to fetch, not to push. So:
  - the rewritten mirror's local `refs/pull/*` are deleted before the push;
  - the push runs as `git push --porcelain --force --mirror origin`, and must exit 0 with no rejected
    line;
  - each ref is then checked against `ref-map`, through `git ls-remote --refs` and through the REST
    `/branches` listing.
- **What the pull-request refs keep reachable.** After the push, a fresh mirror of GKB2 still reaches
  70 of its 81 purged blobs through `refs/pull/6/head`. A fresh mirror of BotTools reaches all 39 of
  its purged blobs through its two pull-request refs.
- **What the exit tests prove without GitHub Support:**
  - every branch and tag on GitHub equals its rewritten tip;
  - a fresh mirror holds no purged path, and no purged blob reachable from a branch or tag. For the
    four repositories without pull-request refs, the same holds for every ref GitHub advertises;
  - the residual behind GKB2's and BotTools' pull-request refs is counted;
  - status-only probes count which old ids GitHub still serves.
- **What they cannot prove:** that GitHub has dropped the old objects, that its cached views are gone,
  or that no third-party copy exists.
- **The visibility change.** First,
  `gh repo edit SpartanLaboratories/KotlinBottools --visibility public --accept-visibility-change-consequences`.
  Then a separate `PATCH` of `security_and_analysis`, enabling `secret_scanning` and
  `secret_scanning_push_protection`.
  - The two cannot be combined, because those settings do not exist while the repository is private.
  - Nothing is enabled automatically for an organisation-owned repository.
  - Generic patterns and validity checks need a paid plan, so they stay off, as they are on MagicBot.
  - The token's `repo` scope is enough.
  - Secret scanning covers the history of all branches, plus issue, pull-request and discussion text.
    It does not report on objects that no ref reaches.
- **What becomes reachable when KotlinBottools is made public in place.** Its old objects have never
  been public. Once the repository is public, anyone who obtains one pre-rewrite commit id can reach
  all of its old history. That history holds:
  - the bot-token file, whose token is dead;
  - the data file holding a session cookie;
  - the per-guild data files, with Discord member and guild names. The tree listings alone carry the
    guild names.

  The ids are easy to obtain:
  - the repository's activity feed carries the before and after ids of every push, and of the
    rewrite's force-push. It holds 42 entries today, and GitHub documents that a change from private
    to public publishes the repository's activity;
  - a random 4-digit prefix hits one of the old commits in about 2,000 requests;
  - every pre-rewrite id printed in a published document is a key.

  Nothing can be recalled once anyone has forked or fetched. GKB2, GKB and BotTools were public before
  the rewrite, so their exposure is not new. TrumpBot and Support stay private.
- **Self-service alternatives to a Support ticket.** Two exist:
  - a fresh repository under the same name, made public instead of the old one, which starts with an
    empty object store;
  - a new public repository under another name, with KotlinBottools kept private.

  Two facts bear on both:
  - An issue transfer keeps comments, assignees, matching labels and milestones, and redirects the old
    URL. GitHub documents nothing about issue numbers or about sub-issue and "blocked by" links.
  - Deleting a repository needs the `delete_repo` token scope. The signed-in token does not have it;
    `gh auth refresh -s delete_repo` grants it interactively.

### 3.5 The clones, the data copy and the manifests

Source: findings 4, §3 and §6.

- **This clone** is realigned in place, by git-filter-repo's procedure for other copies, hardened.
  1. A preflight checks refs, configuration and locks, and maps every local branch through
     `commit-map`. A tip that `commit-map` does not hold stops the run; a pruned tip walks first
     parents.
  2. A check that the server's heads equal `ref-map` runs before any fetch. A `git fetch --prune`
     against an empty or half-filled remote deletes every remote-tracking ref and still exits 0.
  3. `git fetch --prune`.
  4. `git reset --hard`, after a collision check.
  5. `git update-ref` for the other branches.
  6. `ORIG_HEAD` and `FETCH_HEAD` are deleted. They are not reachability roots, but they hold old ids
     as text.
  7. `git reflog expire --expire=now --all`, then `git gc --prune=now`.
  8. The proofs. `count-objects` must show one pack and no garbage. `cat-file --batch-check` must
     report every first-changed commit, every changed commit and every manifest blob missing, and the
     same check on the untouched backup must report none missing.

  On Windows, a locked file makes `git reset --hard` warn and exit 0, and makes `git gc` exit 0 while
  leaving the old pack behind. So the proofs decide, not the exit statuses. Expected on this clone
  today:
  - two local branches;
  - 41 tracked files leave the working tree: the data and runtime-state files, once the copy exists;
  - 418 untracked or ignored files stay untouched.

  The variant in which the rewritten history goes to a fresh repository under the same name uses the
  same procedure. In that variant the check of the server's heads is essential.
- **TrumpBot.**
  1. Its untracked files (4, all under `.idea/`) are archived with a checksum list.
  2. The clone is moved into the workspace. A directory rename fails while any file inside it is open,
     which makes the move the lock probe.
  3. A fresh clone is made at the same path.
  4. The untracked files are restored without overwriting anything.
  5. The same proofs run.
  6. The old clone is deleted last.

  Cleaning it in place is rejected: it takes more steps and reaches the same result.
- **The data copy.** Each file is copied with `git cat-file blob <id>`, record by record from
  `git ls-tree -r -z`, and verified with `git hash-object --no-filters`.
  - `git archive` is not used. It converts line endings under `core.autocrlf=true`: an LF file came
    out as CRLF. Switching the conversion off in configuration still yields CRLF wherever
    `.gitattributes` asks for it.
  - The sources are read from the untouched backup mirrors:
    - KotlinBottools `main`: 29 files under `guildData/` plus `BotData.xml`;
    - GKB2 at the parent of the commit that deletes `guildData/` ("No DB updates", 2023-10-29): 29
      plus 1;
    - TrumpBot `main`: 30 plus 1.
  - The destination is `%USERPROFILE%\BotLegacyData`, an ordinary folder under the user profile. By
    default only the user, SYSTEM and Administrators may open it. Folders at a drive's root are not
    used, because they grant `Authenticated Users` the right to modify.
  - The layout has one subfolder per source, plus `records/`, `manifests/` and a `COPY-VERIFIED`
    marker.
- **The manifests.** A Python classifier runs over `git ls-tree -r -z` of every distinct tree in the
  backup mirror, every ref included. Using filter-repo's own matching rule, it lists the blobs that
  occur only under purged paths. The alternatives are inexact:
  - `git rev-list --objects` names one path per object;
  - filter-repo's `blob-shas-and-paths.txt` joins several paths with `", "`, which a path can itself
    contain.

  Some blobs occur under both purged and kept paths, and the classifier leaves them out: KotlinBottools
  has one (the empty blob) and BotTools two. The classifier's kept-blob count is the exit test's
  expected number of surviving blobs. An optional `refs/pull/` argument gives the expectation for a
  fresh GitHub mirror of GKB2 or BotTools.
- **Windows settings for the procedures.**
  - `GIT_ASK_YESNO=false` makes Git for Windows' unlink-retry prompt answer "no".
  - Native programs get mixed-form paths: a drive letter followed by forward slashes.
  - `tar` runs with `--force-local`.
  - **The KotlinBottools project stays open in IntelliJ IDEA for the whole run**, because the session
    that runs Phase 0 works inside that IDE. TrumpBot is not open in it.
  - **Background git activity.** While the project is open, the IDE's git integration runs short git
    commands in the background and reads files under `.git` directly. Either can hold the index lock
    or a pack file for a moment. A reset or ref update that meets a transient lock error is therefore
    run again, and `git gc --prune=now` can leave an old pack behind.
  - **Push safety does not need the object deletion.** A push sends only objects reachable from the
    refs it updates, minus those the remote already has. Once these hold:
    - no ref, reflog entry or stash in this clone reaches a pre-rewrite commit;
    - `origin` is verified to be the fresh repository;

    no push can carry old history, whether or not the old objects have yet been deleted.
  - IntelliJ's Local History keeps copies of edited files outside git, for five working days by
    default. No git operation reaches them.

### 3.6 Expectations, privacy and references

Source: findings 5, §3 and §6.

- **Pruned commits.** The rewrite prunes 10 commits. Three of them are merges — one each in
  KotlinBottools, GKB and TrumpBot — whose second-parent side held only a pruned commit.
  - Commits before and after, counting branches and tags:

    | KotlinBottools | GKB2 | GKB | BotTools | TrumpBot | Support |
    |---|---|---|---|---|---|
    | 61 → 59 | 32 → 30 | 11 → 9 | 16 → 15 | 11 → 9 | 2 → 1 |

    KotlinBottools' numbers move with every commit to the planning branch: after = T − 2.
  - `You rewrote C (of T)` reports C = T in every repository.
  - `first-changed-commits` holds one line per repository.
- **What survives:**

  | | KotlinBottools | GKB2 | GKB | BotTools | TrumpBot | Support |
  |---|---|---|---|---|---|---|
  | Distinct paths | 115 | 82 | 60 | 82 | 56 | 29 |
  | Blobs kept | 317 | 211 | 113 | 145 | 106 | 29 |
  | Purged blobs | 346 | 81 | 58 | 39 | 199 | 7,259 |
  | Blobs under both purged and kept paths | 1 | 0 | 0 | 2 | 0 | 0 |
  | Largest surviving blob other than the wrapper jar (bytes) | 159,282 | 27,602 | 27,586 | 27,168 | 25,952 | 14,302 |

  - The Gradle wrapper jar survives in KotlinBottools, GKB2 and GKB.
  - No other binary survives, nor any credential-like name, nor any name that Windows `fast-import`
    rejects.
  - Every list entry matches at least one path.
  - The nested `services` source packages survive.
  - The run derives the expectations from the backup mirrors, with the classifier and the expectation
    script.
- **Privacy gate.** The gate first builds name lists from the three data sets:
  - 6 guild folders;
  - 240 distinct member names across all versions;
  - 25 id-shaped numbers.

  It checks them against everything that becomes public with KotlinBottools:
  - 316 text blobs on the two branches;
  - 61 commit messages, with their author and committer identities;
  - issues #1 to #19, with their comments.

  It also checks the old commit messages of the other five repositories. It finds no blocking hit. The
  raw hits are:
  - ordinary words;
  - a template folder named with an ordinary word;
  - one repository's name;
  - a public constant, the Steam64 offset.

  The same gate run over the unpurged repository flags more than a thousand hits, so it does detect a
  failed purge. It runs again before the visibility change.

  Two personal details are in the material that becomes public:
  - the commit identities carry the maintainer's own e-mail address, already public in three
    repositories' commits;
  - the local Windows account name appears in paths, in 17 lines of 6 documents.
- **Pre-rewrite ids.**
  - The planning branch's tip cites them 154 times in 16 documents, covering 55 commits. 121 of those
    citations are in the parent purge research.
  - Older versions of the documents in history hold 39 more.
  - None appears on `main`, in commit messages or issues, in MagicBot, in WebTools #55 or #58, or in
    `SpartanLaboratories/.github`.

  Every one goes stale at the rewrite. Once KotlinBottools is public, its own are lookup keys for the
  old objects.
- **What a fresh repository under the same name would cost.**
  - Up to 75 links to re-create:
    - 18 sub-issue links;
    - 36 "blocked by" links inside the repository;
    - 21 across repositories, 19 with MagicBot and 2 with WebTools #55.
  - The `1.0.0` milestone and three custom labels.
  - About 180 text citations that stay correct only if issue numbers 1 to 19 survive.

  The GraphQL API has `transferIssue` (with `createLabelsIfMissing`), `addSubIssue` and
  `addBlockedBy`. There are no Projects items, webhooks, deploy keys, secrets or forks to rebuild.
- **`.gitignore`.** Replacing the file on `main` conflicts with the planning branch's own change to it
  when the planning branch is merged later. Committing the identical file on the planning branch too
  makes that merge clean. It is copied with `git checkout <ref> -- .gitignore`, because a cherry-pick
  of the commit also conflicts.
- **README.**
  - Lines 233 to 235 and 261 to 265, the project-structure entries for `key.txt`, `BotData.xml`,
    `WebParseKeys.xml` and `guildData/`, stop describing the repository.
  - The `key.txt` instructions stay accurate, because `Bot.initializeBotExistence` reads that file.
  - To run the old code from a clone of the rewritten repository, a user must supply `key.txt`,
    `BotData.xml`, `WebParseKeys.xml`, the `services/*.xml` polling-state files and a `res/`
    directory.
- **Parent statements that no longer hold.** These rest on a GitHub Support ticket or an
  access-restricted location:
  - architecture.md: §1.3; §1.4, criterion 6; §11 (steps 1, 2 and 4, and the exit criterion); §14,
    unit 0; §15 (two rows); §16;
  - roadmap.md: the header and § "Phase 0 — History rewrite";
  - impact.md: §2.1, §2.4 and §3.1 item 4;
  - issue #1's Phase 0 line;
  - issue #2's body.

  Separately, the plan-folder line of issues #2 to #19 names the phase number where the folder name
  uses the issue number.
- **Across the organisation.** No other repository's default branch tracks a purged file name.
  MagicBot's `.gitleaks.toml` has two gaps:
  - a global allowlist exempts `README.md`, `.gitleaks.toml` and `docs/*.md` from every rule, so a
    bot token pasted into its documents would pass;
  - it lacks the `keys.txt`, `key.pem`, `logs/` and `services/` rules.

### 3.7 Where sources disagreed

- **Whether filter-repo removes `origin`.** The parent purge research (§6.3 step 7) says it does, and
  has the runbook add `origin` back. filter-repo's v2.47.0 source returns before that code when
  `--sensitive-data-removal` is set, so `origin` stays, and `git remote add` would fail. The source
  holds (findings 1, §3.6).
- **The pruned-commit count.** The parent research (§3.3) counts six pruned commits. filter-repo also
  prunes merges that become degenerate, which makes ten. That count came from filter-repo itself run
  on content-free stand-ins of each history, and two independent derivations agree with it. Ten holds
  (findings 5, §3.A).
- **The exit criterion for pull-request refs.** The parent criterion (§6.5) requires that no
  pull-request ref reach a purged blob. Without GitHub Support that cannot hold for GKB2 or BotTools.
  The criterion that holds is the branches-and-tags one, with the residual behind the pull-request
  refs counted and reported (findings 3, §6.4).
- **Pre-rewrite ids in documents.** The blast-radius findings recommend replacing them before the
  rewrite. The residual-exposure findings show that the activity feed and prefix guessing yield old
  ids anyway. Both are right about different things. Replacing the ids would remove the documents as
  a source of keys, but that matters only for a public repository holding the old objects. The public
  KotlinBottools is a fresh repository (§3.9), so the ids stay as dated citations that resolve only in
  the private legacy repository.
- **What a visibility change does to unreferenced objects.** GitHub's documentation says nothing on
  this. Two things support the inference that they become public:
  - the observed access gate, where the only question is whether the caller may read the repository;
  - published research (Truffle Security, Neodyme).

  It is stated as an inference.

### 3.8 What does not fit

- **For the rewrite tool:**
  - a winget install, because no package exists;
  - the single-file script, because it has no integrity check;
  - `--path` arguments, because a command line cannot be hash-pinned or archived;
  - `--force`, `--partial`, `--refs` and `--no-fetch`, because each bypasses a safety check.
- **For the scanner:**
  - a winget install, because it fetches the same zip and changes machine state for no extra
    assurance;
  - the gitleaks GitHub Action, because it needs a licence for organisation accounts;
  - a global allowlist, because it switches off every rule for the paths it names;
  - `-v`, because it prints paths and identities into public logs.
- **For the push:** pushing with the rewritten `refs/pull/*` still in the mirror, because the expected
  rejections would hide any other failure.
- **For the copy and the manifest:**
  - `git archive`, because it converts line endings;
  - `git rev-list --objects` and `blob-shas-and-paths.txt`, because each is inexact for the manifest.
- **For the clones:**
  - replacing this clone's `.git` with a fresh clone's, because the tracked files the rewrite removes
    would stay behind as untracked files;
  - cleaning TrumpBot's clone in place.
- **For the data folder:** a folder at a drive's root, because it grants `Authenticated Users` the
  right to modify.
- **For citations:** rewriting pre-rewrite ids from `commit-map`. Ten commits have no new id, and a
  new id would again cite a state that GitHub keeps beside the old one.

### 3.9 How KotlinBottools becomes public

No GitHub Support ticket is filed, so the pre-rewrite KotlinBottools history stays stored on GitHub
(§3.4). For that reason the rewritten history is made public through a fresh repository, and the
pre-rewrite repository stays private.

- **The fresh repository.**
  1. The rewritten mirror is pushed to a new private repository under a temporary name.
  2. The `1.0.0` milestone and the three custom labels (`type: bug`, `type: feature`,
     `type: tracking`) are created in it.
  3. Every number the pre-rewrite repository has used is reproduced in it, in numeric order:
     - an issue, open or closed, is transferred;
     - a pull request, which cannot be transferred, is reproduced by a closed placeholder issue at
       the same number, which points to the pull request in the legacy repository.

     Each step is checked to have landed on its own number. Today issues #1 to #19 are all open
     and no pull request exists. By the time of the swap, more numbers are in use: the planning
     documents' pull request, #2's sub-issues, and the landings of the units that run before the
     swap.
  4. Any sub-issue or "blocked by" link that a transfer drops is re-created; §3.6 lists the links
     that exist today.

  Nothing else is created in the new repository before the last number is reproduced, because
  issues and pull requests share one number sequence.
- **The swap.**
  - The pre-rewrite repository is renamed `KotlinBottools-legacy`. It stays private and is archived,
    which makes it read-only.
  - The new repository takes the name `KotlinBottools`.
  - It is made public, with secret scanning and push protection.

  No repository is deleted.
- **What the legacy repository keeps.** Its refs stay exactly as they are at the mirror clone,
  including the `refs/pull/*` of the pull requests merged before the swap. It keeps its pull
  requests, milestone and labels, and no issue is left in it. Its objects, activity feed and events
  stay private, and the pre-rewrite ids cited in documents resolve only there.
- **What the public repository holds.** Its object store starts empty and holds only the rewritten
  history.
  - No route in §3.4 reaches an old object from it.
  - Its activity feed holds only post-rewrite ids.
  - The pre-rewrite ids in documents resolve to nothing in it, so the documents keep them as dated
    citations.
- **Links.** The name and every number stay the same, so `KotlinBottools#N` references and issue
  URLs keep resolving in MagicBot, WebTools, `SpartanLaboratories/.github` and the documents. A
  pull request's number leads to its placeholder.

  Links that name the planning branch, `blob/docs/issue-1-bottools-consolidation/...`, stop
  resolving once that branch is merged and deleted. There are 56 of them: 40 in KotlinBottools'
  issues, 15 in MagicBot's and 1 in WebTools #55. They are pointed at `main`, where the same
  documents live before and after the swap.
- **Settings and access.** The new repository gets the settings the old one has:
  - default branch `main`;
  - issues and projects on, wiki and discussions off;
  - merge commits, squash merges and rebase merges allowed;
  - Actions enabled for all actions;
  - no description, homepage or topics.

  The only direct collaborator is the organisation's administrator, and no team has access.
- **The rehearsal.** Two throwaway private repositories come first. They prove the transfer
  behaviour:
  - numbers, including a placeholder at a pull request's number and a closed issue;
  - comments, labels and milestone;
  - sub-issue and "blocked by" links.

  If a transfer loses a number or a link, the run stops before KotlinBottools is touched. Because
  nothing is deleted, the two rehearsal repositories remain afterwards, private and archived.
- **This clone.** Its `origin` URL does not change; after the renames it points at the new
  repository. It is realigned by §3.5's procedure. The check of the server's heads before any fetch
  matters here, because while the renames are in progress the name can resolve to the legacy
  repository.
- **MagicBot.** The gap in MagicBot's `.gitleaks.toml` (§3.6) is recorded as a comment on MagicBot#2,
  its Phase 13 issue, which owns that file.

### 3.10 The parent documents and issues

The parent documents carry dated callouts recording Phase 0's conditions:

- `architecture.md`: §1.3, §1.4 criterion 6, §11, §14 unit 0, §15 and §16;
- `roadmap.md`: the header and § "Phase 0 — History rewrite";
- `consequences.md`: §2.1, §2.4 and §3.1 item 4.

Matching edits are made to issues #1 and #2. The conditions recorded are:

- no GitHub Support ticket is filed;
- the legacy data copy sits in an ordinary local folder;
- the exit criterion is that branches and tags are clean, with the pull-request residual of GKB2 and
  BotTools counted and reported;
- KotlinBottools is made public as a fresh repository, and the pre-rewrite repository is kept private
  and archived as `KotlinBottools-legacy`;
- the planning documents reach `main` before the rewrite, through a pull request on the pre-rewrite
  repository, so there is no planning pull request after it.

---

## Considerations

None open.

---

## Known gaps

The phase's known gaps, including what this research could not establish, are kept in
[`../consequences.md`](../consequences.md) §5.
