# Research — Phase 0, history rewrite

## Header / Association

- **For:** [SpartanLaboratories/KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2),
  *"Phase 0 — History rewrite: purge secrets and data from the six bot repositories"*, a
  sub-issue of [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **Design inputs:** [`../../architecture.md`](../../architecture.md) §1.3, §11 and §14 unit 0;
  [`../../roadmap.md`](../../roadmap.md) § "Phase 0 — History rewrite";
  [`../../research/bot-repository-history-purge.md`](../../research/bot-repository-history-purge.md).
- **Maintained by:** the planner. Each `<question-slug>.md` file beside this one belongs to the
  researcher who wrote it and is not edited here.
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
- **Execution.** The whole phase runs from one Windows 11 machine, through an implementer that
  follows a written runbook literally.
  - Every step has a check and a stop condition.
  - A failing verification stops the run before anything is pushed.
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
- **This working directory.** `%PROJECTS%\KotlinBottools` is the working directory
  of the running session. It cannot be deleted or renamed, so it is brought onto the rewritten
  history in place. The TrumpBot clone at `%PROJECTS%\TrumpBot` is deleted and
  cloned again.
- **The mirror clones** live in a dedicated workspace outside every project folder. They are
  deleted once the exit tests pass, so only the data copy remains.
- **No pushes in between.** Nothing is pushed to a repository between its mirror clone and its
  mirror push. A commit that must survive is pushed before that repository's mirror clone is
  taken.
- **KotlinBottools afterwards:**
  - a root-anchored `.gitignore`;
  - a gitleaks configuration and CI job;
  - public visibility, with GitHub secret scanning and push protection;
  - the planning pull request, opened from the rewritten planning branch. No pull request of any
    kind is opened on KotlinBottools before its rewrite.
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

Each researcher works through these, wherever they bear on its question.

1. **Best systems for the purpose:** how organisations that do history purges and secret-scanning
   set-ups well actually run them, and which approaches fail in practice.
2. **Common practice and convention:** GitHub's and git's documented procedures, and the
   organisation's own conventions (MyGameTools' workflows, MagicBot's gitleaks configuration).
3. **Idiomatic Kotlin:** does not apply. This phase writes no Kotlin.
