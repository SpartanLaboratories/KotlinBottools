# Bot repositories: what the history rewrite removes, and how it is done on GitHub

For: SpartanLaboratories/KotlinBottools#1
Date read: 2026-10-20
Applies to: KotlinBottools `main` b2f2078 (planning branch `ccr-2c690a64-fz5whf` at f0f480d), GKB2 `master` 9422f85, GKB `master` b6ad0f7, BotTools `main` 9e74d1c, TrumpBot `main` a66dd38, Support `main` c6b8fe5; git-filter-repo documentation at `main` (newest release listed: v2.47.0); GitHub's documentation repository at `main`; git 2.43.0 locally.

Commit hashes in this file are the hashes **before** the rewrite. Every one of them changes (see Findings 6).
No secret value, cookie value, guild name, member name or member id appears in this file. Secrets are named by path, blob and size only.

## 1. Question

Which tracked paths in the history of KotlinBottools, GKB2, GKB, BotTools, TrumpBot (and Support, if it is bot-related) are secrets, data, runtime state, binaries, IDE files or build output, and how are they removed from every ref of each repository on GitHub so that:

- no secret or data file remains anywhere in any history;
- each default branch is force-pushed once;
- GKB2, GKB, BotTools and TrumpBot can then be archived (read-only), and KotlinBottools can then be made public;
- the rewrite works although none of the leaked tokens is current?

## 2. Bottom line

- **Scope: five repositories, plus Support as a light pass.** Support is bot-related: it is TrumpBot's Eclipse companion project (TrumpBot's `.classpath` lists `/Support`, TrumpBot's `TimeCommand` imports `com.spartanlaboratories.util.Date`, which only Support defines) and it vendors the lavaplayer natives and ForecastIO client that TrumpBot's `PlayCommand` and `FIOWeatherCommand` use. It holds **no** secret and **no** data (verified by exact-string and pattern scans), so its purge is binary and IDE hygiene only. Its future (archive or keep) is not set by this work.
- **Secrets are confined to whole-file paths; a path rewrite is sufficient.** Across all six histories, every leaked token and cookie string occurs only in `key.txt` / `keys.txt` / `key.pem` / `BotData.xml` (34 candidate strings searched in every blob of every repository, plus commit messages, author fields and ref names). No credential is hard-coded in source or in committed build output. Do the rewrite with `git filter-repo --sensitive-data-removal --invert-paths --paths-from-file <list>`, one list per repository (section 6.2). `--replace-text` is not needed. BFG is rejected: it matches by name anywhere in the tree (it would delete the source packages named `services` in KotlinBottools, GKB2 and BotTools) and protects the current commit by default (every secret path in KotlinBottools, GKB, TrumpBot and GKB2 is still in the current tree).
- **Use root-anchored literal paths only.** `services/`, `res/` and `bin/` also occur as source package or build directories (`src/main/kotlin/bottools/services/`, `lib/src/main/java/BotTools/services/`). Nested data copies exist too (`src/test/guildData/` in KotlinBottools, `lib/bin/` and `lib/.settings/` in BotTools), so a "top-level only" list is incomplete. Per-repository lists are in section 6.2.
- **GitHub will keep the old history in places a force-push cannot reach.** On 2026-10-20 the remote shows `refs/pull/6/head` on GKB2 and `refs/pull/2/head`, `refs/pull/3/head` on BotTools; KotlinBottools, GKB, TrumpBot and Support have none. These read-only refs, plus cached commit views and any fork, keep the pre-rewrite objects until GitHub Support dereferences the PRs and runs garbage collection. GitHub states that Support helps only where the risk "can't be mitigated by rotating affected credentials". Because every token here is already dead, the credible grounds for a ticket are the personal data (Discord member and guild identifiers) in `guildData/` and `logs/` of the public repositories GKB2 and GKB, and in KotlinBottools before it goes public.
- **Merging the planning branch through a pull request before the rewrite creates `refs/pull/N/*` in KotlinBottools that pin the old history.** KotlinBottools has no PR refs today. Each PR merged before the rewrite is one more ref Support must clear before the repository is made public. The exit test is a fresh `git clone --mirror` that also fetches `refs/pull/*` and finds no purged path and no listed blob id (section 6.5).
- **Archive and publish only after exit tests pass.** Archiving makes branches, tags, PRs and commits read-only, so the rewrite, the Support ticket and the README pointer commit all come first. Two branches exist on the remote that are not on disk (BotTools `Working-Branch`, TrumpBot `feature/pokercommand`); they must be covered by a mirror clone or deleted.
- **Secret scanning after the purge: GitHub secret scanning plus gitleaks run as a binary.** The gitleaks default rules would probably miss a bare `key.txt` (the Discord rule requires the word "discord" near a 64-hex value), so the repository needs a small custom rule set. `gitleaks/gitleaks-action` needs a licence key for organisation accounts; the MIT-licensed binary does not.

## 3. Findings

Evidence tiers: **consensus** (standard or multiple independent sources), **practice** (what mature tools visibly do), **opinion** (one source), **observed** (read directly from the repositories or GitHub on the date given).

### 3.1 What the histories contain (observed, 2026-10-20)

Method: `git rev-list --all` over every ref on disk; presence of a path per commit through `ls-tree` against each commit's parents (so merge commits do not hide additions); unique blobs counted through `rev-list --objects --all`. Paths are classified as purge candidates when they sit in a data, state, IDE or build directory at any depth, or when the file is a known credential, state or binary file. No tags exist in any of the six repositories (`git tag` empty on disk; `git ls-remote` shows no `refs/tags/*`).

#### KotlinBottools (private; remote refs: `main`, `ccr-2c690a64-fz5whf`; 33 commits)

| Path | Kind | Added | Removed | In current tree |
|---|---|---|---|---|
| `key.txt` | bot token, 72 B, one version | 239210e 2025-09-24 "Functioning" | never | yes (`main` and planning branch) |
| `BotData.xml` | runtime state with a `Cookies` section; non-empty cookie value in 3 of 6 versions | d57ced3 2023-01-01 "Converting to new Kotlin based Guild Data Parser" | never | yes |
| `WebParseKeys.xml` | scraping markers, 4 versions, about 29 KB | 38c98a6 2022-12-08 "changes" | never | yes |
| `guildData/` | per-guild XML (members, settings, playlists), 30 paths, 50 blobs, about 3.5 MB | d57ced3 2023-01-01 | one file removed in 4134e66 2023-02-13 "Games Service complete" | yes (29 files) |
| `src/test/guildData/` | second copy of the same data under the test tree, 30 paths | ca34c1c 2022-12-05 "minor adjustments" | d57ced3 2023-01-01 | no |
| `services/` | polling-state XML, 5 paths | 38c98a6 2022-12-08; re-created in d57ced3, b325c2b, aa7ebd8 | three of five paths deleted along the way | yes (2 files) |
| `res/` | generated images, 7 files | b325c2b 2023-02-06 "Removed binaries" | never | yes |
| `.gradle/` | Gradle cache, 21 paths, 60 blobs, about 2.9 MB | 59020d3 2022-11-06 "Initial commit" | bulk b325c2b 2023-02-06; 5 files re-added by 72fe41a 2023-02-07 "Working on UserBasedService/UserGameService"; untracked on the planning branch only (29242b5 2026-10-20 "chore: stop tracking IDE and Gradle cache files") | **yes in `main`** (5 files), no on planning branch |
| `.idea/` | IDE, 12 paths | 59020d3 2022-11-06 | only on the planning branch (29242b5) | **yes in `main`** (12 files), no on planning branch |
| `.project` | Eclipse | ab454ce 2022-11-28 "More file conversions" | 239210e 2025-09-24 | no |
| `build/` | build output, 58 paths, 180 blobs, about 2.0 MB | 59020d3 2022-11-06 | 0e88310 2023-01-02 "Removed build folder" and b325c2b 2023-02-06 (two sides of merge 23fb11c) | no |

Kept on purpose: `gradle/wrapper/gradle-wrapper.jar` (standard Gradle wrapper). `src/main/resources/ReactionRoles.xml` is an empty template (no text content in any version) and stays.

#### GKB2 (public; remote refs: `master`, PR head `refs/pull/6/head`; 32 commits)

| Path | Kind | Added | Removed | In current tree |
|---|---|---|---|---|
| `key.txt` | bot token, 70 B | b426c15 2023-08-05 "InitialCommit" | ce25be2 2023-09-01 "Moving towards stable" (same blob continues as `keys.txt`) | no |
| `keys.txt` | same blob as `key.txt` | ce25be2 2023-09-01 | e60f530 2023-09-04 "Last of the changes related to Data Commands" | no |
| `BotData.xml` | runtime state; non-empty cookie value in 6 of 7 versions | b426c15 2023-08-05 (empty then) | never | **yes** |
| `WebParseKeys.xml` | scraping markers | b426c15 | never | **yes** |
| `guildData/` | per-guild XML, 29 paths, 34 blobs, about 0.45 MB | c6b243e 2023-08-11 "Restructure" | af44c24 2023-10-29 "No DB updates" | no (history only) |
| `logs/` | application logs, 5 files, 7 blobs, about 0.55 MB, hundreds of Discord id literals | b426c15 (4), c6b243e (1) | b973dae 2023-10-29 "No log updates" | no (history only) |
| `res/` | 14 paths | c6b243e 2023-08-11 (13), 3fe1524 2023-09-17 "Gui and Poker" (1) | 13 by 009ffc0 2023-10-29 "No Image updates" | yes: `res/zip codes.txt`, 4.3 MB |
| `services/` | polling-state XML, 2 files | b426c15 | never | **yes** |
| `.idea/` | IDE, 8 paths | b426c15 (5), c6b243e (2), 298cbd0 2023-08-17 (1) | never | **yes** |
| `src/jvmTest/resources/screenshot.png` | 107 KB image, listed in `.gitignore` but tracked | b426c15 | never | yes |

#### GKB (public; remote ref: `master`; 11 commits)

| Path | Kind | Added | Removed | In current tree |
|---|---|---|---|---|
| `key.txt` | bot token, 70 B, 2 versions | 91aff75 2023-03-25 "Initial Commit"; second version from a558653 2023-04-04 "Help Message changes and Math Command" | 4a88004 2023-03-25 "Delete key.txt" and merge 7e2b439 2023-04-04 | no (history only) |
| `BotData.xml` | cookie value non-empty in 5 of 5 versions | 91aff75 | never | **yes** |
| `WebParseKeys.xml` | scraping markers | 91aff75 | never | **yes** |
| `guildData/` | per-guild XML, 29 paths | 91aff75 | never | **yes** |
| `logs/` | 5 files | 91aff75, a558653, 1c1a0a6, 25124fc | never | **yes** |
| `res/` | 7 files | 91aff75 | never | **yes** |
| `services/` | 2 files | 91aff75 | never | **yes** |
| `.idea/` | IDE, 6 paths | 91aff75 (5), 25124fc 2023-05-05 (1) | never | **yes** |
| `screenshot.png` | 1.6 MB image | 25124fc 2023-05-05 "UI and Tool improvements" | never | yes |
| `cutout.png` | 88 KB image | 25124fc | never | yes |
| `src/jvmTest/resources/screenshot.png` | 107 KB image | b6ad0f7 2023-05-09 "More work on poe" | never | yes |

#### BotTools (public; remote refs: `main`, `Working-Branch`, PR heads `refs/pull/2/head`, `refs/pull/3/head`; 15 commits on disk)

No credential and no data path. Binary and IDE material only:

| Path | Kind | Added | Removed | In current tree |
|---|---|---|---|---|
| `youtube-dl.exe` | 8.2 MB binary | 86dc6db 2022-10-15 "Moved Files" | never | yes |
| `.gradle/` | Gradle 7.4.2 cache, 17 paths | 86dc6db 2022-10-15 | never | yes (also listed in `.gitignore`) |
| `.classpath`, `.project`, `.settings/` (2 files) | Eclipse | 037070e 2022-09-22 "Initial commit" | never | yes |
| `lib/.classpath` | Eclipse | 86dc6db | never | yes |
| `lib/.project`, `lib/.settings/` | Eclipse | c7ecd43 2022-10-14 "Converted to Gradle Project" | never | yes |
| `lib/bin/` | build output copy, 3 paths | 86dc6db | never | yes |

`lib/` is the Gradle subproject that holds the source; it is **not** a purge path. `lib/src/main/java/BotTools/services/` is a Java package and must survive.

#### TrumpBot (private; remote refs: `main`, `feature/pokercommand`; 9 commits on disk)

| Path | Kind | Added | Removed | In current tree |
|---|---|---|---|---|
| `key.txt` | bot token, 70 B | 41efd16 2022-09-22 "Initial commit" | 23575a6 2022-10-09 "Delete key.txt" (and merge 7be37b4) | no (history only) |
| `key.pem` | PEM private-key block, 1.7 KB | 41efd16 | never | **yes** |
| `BotData.xml` | runtime state, 3 versions, no cookie values | 41efd16 | never | yes |
| `WebParseKeys.xml` | scraping markers | 41efd16 | never | yes |
| `guildData/` | per-guild XML, 30 paths, about 1.3 MB | 41efd16 | never | yes |
| `services/` | `services/game services/DOTA 2.xml` | 49d4389 2022-10-03 "TrumpBot 1.2.2.1" | never | yes |
| `res/` | 126 paths: icons, piece images, trivia and zip-code text | 41efd16 | never | yes |
| `log.txt` | log | 41efd16 | never | yes |
| `list.dat`, `list.idx` | 11.9 MB and 5.9 MB (two versions) data files | 41efd16 | never | yes |
| `botdata.css` | generated file, 56 B | 7869c39 2022-10-31 | never | yes |
| `ffmpeg.exe`, `ffprobe.exe` | 43 MB binaries each | 41efd16 | never | yes |
| `youtube-dl.exe` | 8.2 MB binary | 0a8ecab 2022-10-11 "Services Introduction" | never | yes |
| `youtube-dl` | 1.3 MB binary | 41efd16 | 0a8ecab 2022-10-11 | no |
| `dl.bat`, `javadoc.xml` | helper script, Eclipse Javadoc config | 41efd16 | never | yes |
| `framed.png`, `framed photo.png` | images | 41efd16 | never | yes |
| `bin/` | Eclipse output | 3f6ae31 2022-10-01 "Slash command integration" | 99a700f 2022-10-29 | no |
| `.classpath`, `.project`, `.settings/` | Eclipse (the `.classpath` embeds a Windows user-profile path) | 41efd16 | never | yes |

Size: unique blobs total about 125 MB, of which about 124.6 MB are purge paths.

#### Support (private; remote ref: `main`; 2 commits)

About 7,400 tracked files: Java sources (`src/com/spartanlaboratories/{chess,measurements,util}`), generated Javadoc (`doc/`), vendored third-party libraries (`lib/poi-5.0.0`, `lib/commons-io-2.11.0`, `lib/commons-fileupload-1.4-bin`, `lib/ForecastIO`), lavaplayer native sources and 24 compiled native or jar binaries (`natives/`, `lib/natives/`, `lib/lavaplayer dependencies/`), and Eclipse metadata (`.classpath`, `.project`, `.settings/`). Pack size 21.8 MiB. No credential, data or state path; no exact-string or pattern hit.

### 3.2 Secrets outside the secret paths (observed, 2026-10-20)

- **Exact-string search.** 34 candidate strings were built in memory from every version of every `key.txt`, `keys.txt` and `key.pem` (each line) and every cookie `value` in every `BotData.xml` of the five bot repositories. Each was searched, byte for byte, in every blob reachable from any ref in all six repositories, and in commit messages, author and committer fields, and ref names. Output was limited to paths and counts.
  - Each token string occurs only in its own key file (KotlinBottools `key.txt`: 1 blob; GKB2 `key.txt`/`keys.txt`: the same blob; GKB `key.txt`: 2 blobs; TrumpBot `key.txt` and `key.pem`).
  - Each cookie value occurs only in `BotData.xml`. One 145-character session cookie is shared by three repositories (KotlinBottools: 2 blobs, GKB2: 2 blobs, GKB: 5 blobs), which is why the cookie section must be removed from all three.
  - Zero hits in commit metadata, ref names or Support.
- **Pattern scan.** All text blobs under 3 MB were scanned for: Discord-bot-token shape, PEM private-key headers, GitHub tokens, AWS key ids, Discord webhook URLs, `key|secret|token|password|cookie` assignments with a 16+ character value, URL key parameters, and Dark-Sky-style forecast URLs. The only hits were the key files themselves. The assignment and URL-parameter patterns matched nothing in any repository, so no API key is hard-coded in source.
- **Hits that are not secrets.** 32+ character hex strings occur in the research documents of this repository (commit hashes), a vendored-documentation page in Support, a jar-hash path in TrumpBot's `.classpath`, and a favicon asset name inside a URL in an early version of TrumpBot's `DotaCommand.java`.
- **Personal identifiers outside `guildData/`.** Discord-id-sized integer literals occur in `logs/` of GKB2 and GKB and once in TrumpBot's `src/commands/InviteCommand.java`. The logs go with the purge; the single literal in source is left in place.
- **Limits.** The pattern scan is heuristic and did not cover blobs over 3 MB or binary files; the exact-string search covered every blob of any size but only for the 34 known strings.

### 3.3 How `git filter-repo` removes paths (consensus: git-filter-repo manual and GitHub's documentation agree; version: manual at `main`, GitHub documentation at `main`; flag needs v2.47 or newer)

- `--invert-paths` with `--path <file-or-dir>` removes exactly those paths from every commit on every ref; all names are relative to the repository root and renames are not followed, so a file that moved needs both names (`key.txt` and `keys.txt` in GKB2). Source: [git-filter-repo manual, "Path based filtering" and "Filtering based on many paths"](https://raw.githubusercontent.com/newren/git-filter-repo/main/Documentation/git-filter-repo.txt).
- `--paths-from-file` takes one directive per line (`literal:` default, `glob:`, `regex:`), ignores blank and `#` lines, and combines with `--invert-paths`.
- `--path-glob` uses Python `fnmatch`, in which `*` crosses `/`. A glob such as `*/services/*` would therefore delete source packages. Literal root-relative paths do not have that failure.
- Commits that touch only removed paths become empty and are pruned (`--prune-empty auto`, the default). By the rule applied to the on-disk histories, one commit is pruned in KotlinBottools (0e88310), two in GKB2 (af44c24, e3a6fea), and one each in GKB (4a88004), BotTools (c7ecd43) and TrumpBot (23575a6).
- `--sensitive-data-removal` (alias `--sdr`) fetches all refs first, records the first changed commits and the refs that changed, reports orphaned LFS objects, and prints cleanup instructions. GitHub requires "at least version 2.47". Files under `.git/filter-repo/` after a run: `commit-map` (old to new hash), `ref-map`, `changed-refs`, `first-changed-commits`.
- The default for `--replace-refs` is `update-no-add`, so no `refs/replace/*` are created and none are pushed by `--mirror`.
- The clone should be fresh: `git clone --mirror` (with `--no-local` for a local source). Without it, filter-repo aborts through its fresh-clone check. `--force` bypasses the check and is discouraged by the author.
- Signatures on rewritten commits and tags are dropped (GitHub documentation, "Side effects of rewriting history").
- `--replace-text` works on non-binary files only and, for whole-file secrets, adds nothing to a path removal; it needs a file that contains the secrets themselves.

### 3.4 What GitHub keeps after a force-push (consensus: GitHub documentation and the filter-repo manual agree)

- Push command: `git push --force --mirror origin`. It fails for every `refs/pull/*` ref because GitHub marks them read-only; branch protection or rulesets that block force-pushes must be lifted temporarily, and the push discards any commits others pushed in the meantime.
- Still reachable afterwards: clones and forks, commits viewed by SHA through cached views, and pull requests that reference them. Cached views and PR references can be removed only by GitHub Support, which will dereference or delete the affected PRs, run garbage collection and remove cached views. The ticket carries the owner and repository name, the number of affected PRs (`grep -c '^refs/pull/.*/head$' .git/filter-repo/changed-refs`) and the "First Changed Commit(s)" that filter-repo prints.
- GitHub says Support "won't remove non-sensitive data" and will assist "in cases where we determine that the risk can't be mitigated by rotating affected credentials". The documentation opens by advising that a leaked secret should first be revoked, and that after revocation "the extra steps to rewrite the history ... may not be warranted". Forks keep the old objects and must be handled by their owners; GitHub cannot give out owner contact details.
- Closed PRs lose their diff view for every PR built on a rewritten history; open PRs get different diffs and may lose comments. Source: [GitHub documentation, "Removing sensitive data from a repository"](https://raw.githubusercontent.com/github/docs/main/content/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository.md).

### 3.5 Remote state of the repositories (observed, 2026-10-20)

| Repository | Visibility | Remote refs | PRs | Forks |
|---|---|---|---|---|
| KotlinBottools | private (unauthenticated branch page returned 404) | `main`, `ccr-2c690a64-fz5whf` | none (no `refs/pull/*`) | not checkable |
| GKB2 | public | `master` | #6 "Data commands" (merged 2023-09-04), head dd0a8de, a commit on `master` | 0 |
| GKB | public | `master` | none | 0 |
| BotTools | public | `main`, `Working-Branch` (tip 8f0dddb, **not on disk**) | #2, #3 (both merged, heads 2fb52da and d5a6215 are on `main`) | 0 |
| TrumpBot | private | `main`, `feature/pokercommand` (tip 5913379, **not on disk**) | none | not checkable |
| Support | private | `main` | none | not checkable |

The three public repositories have no releases or tags. Sources: `git ls-remote origin` run read-only from the on-disk clones; GitHub pages fetched with WebFetch (forks, pull requests, branches, tags) — a model-summarised read of the page, not a raw API response.

### 3.6 Archiving and publishing (consensus: GitHub documentation)

- Archiving makes "issues, pull requests, code, labels, milestones, projects, wiki, releases, commits, tags, branches, reactions, code scanning alerts, comments and permissions" read-only. Unarchiving is possible. GitHub recommends closing issues and PRs and updating the README before archiving. Source: [Archiving repositories](https://raw.githubusercontent.com/github/docs/main/content/repositories/archiving-a-github-repository/archiving-repositories.md).
- Making a private repository public: forks that were private are detached; Actions history and logs become visible to everyone; stars and watchers reset; the repository gains the GitHub Advanced Security features automatically. Source: [Setting repository visibility](https://raw.githubusercontent.com/github/docs/main/content/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility.md).

### 3.7 Secret scanning in CI (practice, with one inference)

- GitHub's own secret scanning lists "Discord Bot Token" (`discord_bot_token`) as a supported secret with push protection and validity check. Source: [`public-docs.yml`, pattern list](https://raw.githubusercontent.com/github/docs/main/src/secret-scanning/data/pattern-docs/fpt/public-docs.yml).
- gitleaks (MIT licence) scans history with `gitleaks git` and a working tree with `gitleaks dir`; `--redact` hides values in output; configuration extends the default rules with `[extend] useDefault = true` and accepts rules defined by `path` alone. Source: [gitleaks README](https://raw.githubusercontent.com/gitleaks/gitleaks/master/README.md).
- gitleaks-action: "`GITLEAKS_LICENSE` (required for organizations, not required for user accounts)"; since v2.0.0 its licence is no longer MIT. Source: [gitleaks-action README](https://raw.githubusercontent.com/gitleaks/gitleaks-action/master/README.md).
- **Inference (not run, gitleaks is not installed here):** the default `discord-api-token` rule requires the word "discord" near a 64-hex value (`keywords = ["discord"]`), so a bare token file without that context is probably not detected by the default `generic-api-key` rule either. A repository-local config with a Discord bot token shape rule and a path rule for credential files is therefore needed. The token-shape regex used in the scan above found all five key-file blobs.
- The organisation's existing CI (MyGameTools `ci.yml`) is GitHub Actions on `ubuntu-latest` with `permissions: contents: read` and `actions/checkout@v4` at default depth. A scan job fits that shape; it needs no secret and must check out with `fetch-depth: 0` to see history.

## 4. How comparable tools do it

- **git-filter-repo** (Elijah Newren, the tool GitHub's documentation names): path-based and content-based filters on a fast-export stream, root-relative paths, refuses non-fresh clones, applies filters to the current commit as well, removes `origin` so the rewritten repository is not pushed back by accident. Its manual has a dedicated "Sensitive Data Removals" section and the `--sensitive-data-removal` mode. Source: [manual](https://raw.githubusercontent.com/newren/git-filter-repo/main/Documentation/git-filter-repo.txt), [README](https://raw.githubusercontent.com/newren/git-filter-repo/main/README.md).
- **BFG Repo-Cleaner** (rtyley): `bfg --delete-files <name>`, `--delete-folders <name>`, `--replace-text <file>`, `--strip-blobs-bigger-than <size>`, run against a `--mirror` clone, followed by `git reflog expire --expire=now --all && git gc --prune=now --aggressive` and `git push`. Differences that matter here, taken from BFG's own page and filter-repo's conversion guide:
  - It matches basenames; it "has no way of differentiating between 'README.md' at the toplevel versus in some subdirectory", so `--delete-folders services` would also remove source packages.
  - It does not modify the contents of the latest commit on `HEAD` unless `--no-blob-protection` is given, so every secret file still in the current tree survives a default run.
  - No GitHub-specific output: no changed-refs list, no first-changed-commit report, no per-clone cleanup instructions.
  - filter-repo's author calls BFG "great tool for its time" with architectural limits. Source: [BFG page](https://rtyley.github.io/bfg-repo-cleaner/) (its content was read from the `gh-pages` HTML in the BFG repository, because the site host was unreachable), [conversion guide](https://raw.githubusercontent.com/newren/git-filter-repo/main/Documentation/converting-from-bfg-repo-cleaner.md).
- **git filter-branch**: the Git project recommends against it; slow and easy to corrupt (cited from filter-repo's README; its own page could not be opened).
- **GitHub**: documents `git-filter-repo --sensitive-data-removal --invert-paths --path ...` as the supported procedure and the Support ticket for PR refs and cached views.

## 5. Pitfalls and regrets

1. **Unanchored name rules delete source.** `services/` is a source package in KotlinBottools (`src/main/kotlin/bottools/services/`), GKB2 and BotTools (`lib/src/main/java/BotTools/services/`). The same applies to `.gitignore`: an unanchored `services/` or `res/` would hide those packages.
2. **Current-tree-only lists miss history-only files.** GKB2's `guildData/`, `logs/`, `key.txt` and `keys.txt`, GKB's `key.txt` and TrumpBot's `key.txt` are no longer in a current tree and would not be found by `git ls-files`. KotlinBottools' second data copy `src/test/guildData/` is not at the root. Run `git filter-repo --analyze` (path report) on each mirror clone before finalising a list.
3. **Branches that are not on disk.** BotTools `Working-Branch` and TrumpBot `feature/pokercommand` contain commits that are absent from the on-disk clones, so their content is unknown. `git push --mirror` from a mirror clone rewrites them; a clone made from only the default branch would leave them untouched on the server, still carrying the old history.
4. **Recontamination.** A clone made before the rewrite, followed by `git pull` and `git push`, brings the old history back. Old tags are not replaced by `git fetch --tags`. The clones in this working environment (`/home/user/KotlinBottools`, `/home/user/GKB2`, `/home/user/spartanlaboratories/{gkb,bottools}`, `/home/user/trumpbot`, `/home/user/support`) are such clones and should be deleted and re-cloned, not pulled.
5. **PR refs created before the rewrite pin the old history.** Merging the planning branch through a PR before the rewrite adds `refs/pull/N/head` (and a merge ref) to KotlinBottools. They are read-only, survive the force-push, and become fetchable by anyone when the repository is made public, unless Support has cleared them.
6. **Support may decline.** Support will not remove "non-sensitive data" and considers whether rotation mitigates the risk. Tokens are dead, so a ticket argued on tokens will probably be declined; one argued on personal data in public repositories is stronger. This is a judgement, not a documented rule.
7. **Every commit hash changes.** The root commit of every repository contains purge paths (KotlinBottools 59020d3, GKB2 b426c15, GKB 91aff75, BotTools 037070e, TrumpBot 41efd16), so all descendants change. Documents citing baselines (`b2f2078`, `9422f85`) go stale; `.git/filter-repo/commit-map` provides old to new. Five commits disappear entirely (section 3.3), and signatures are dropped.
8. **Public exposure already happened.** GKB2 and GKB are public and carry session cookies, member data and logs in their current trees or history; whoever cloned them earlier keeps them. The rewrite shrinks future exposure; it does not recall copies.
9. **Gitleaks defaults and public logs.** Once KotlinBottools is public, Actions logs are public; a scan job without `--redact` would print any finding into them.
10. **A protection rule or ruleset can block the force-push** and must be lifted temporarily (GitHub documentation, "Side effects of rewriting history").

## 6. Recommendation for this repo

### 6.1 Scope and order

- Include all five bot repositories and Support (light pass).
- Order: capture and copy first (6.3), then KotlinBottools (it blocks all later work and must be clean before it goes public), then GKB2 and GKB (public, personal data), then BotTools, TrumpBot and Support.
- Per repository: rewrite, push, Support ticket (only where the exposure argument applies: GKB2, GKB, KotlinBottools; BotTools holds no secret or data, so a ticket for its two PR refs is unlikely to be honoured and not needed for the exit criterion unless it is stated to include PR refs), exit tests, README pointer commit (the four archived repositories), then archive or publish.

### 6.2 Path lists (literal, root-anchored; used with `--invert-paths --paths-from-file`)

- **KotlinBottools:** `key.txt`, `BotData.xml`, `WebParseKeys.xml`, `guildData/`, `src/test/guildData/`, `services/`, `res/`, `.gradle/`, `.idea/`, `build/`, `.project`.
- **GKB2:** `key.txt`, `keys.txt`, `BotData.xml`, `WebParseKeys.xml`, `guildData/`, `logs/`, `res/`, `services/`, `.idea/`, `src/jvmTest/resources/screenshot.png`.
- **GKB:** `key.txt`, `BotData.xml`, `WebParseKeys.xml`, `guildData/`, `logs/`, `res/`, `services/`, `.idea/`, `screenshot.png`, `cutout.png`, `src/jvmTest/resources/screenshot.png`.
- **BotTools:** `.gradle/`, `.classpath`, `.project`, `.settings/`, `lib/.classpath`, `lib/.project`, `lib/.settings/`, `lib/bin/`, `youtube-dl.exe`.
- **TrumpBot:** `key.txt`, `key.pem`, `BotData.xml`, `WebParseKeys.xml`, `botdata.css`, `guildData/`, `services/`, `res/`, `log.txt`, `list.dat`, `list.idx`, `dl.bat`, `javadoc.xml`, `youtube-dl`, `youtube-dl.exe`, `ffmpeg.exe`, `ffprobe.exe`, `framed.png`, `framed photo.png`, `bin/`, `.classpath`, `.project`, `.settings/`.
- **Support:** `.classpath`, `.project`, `.settings/`, `doc/`, `natives/`, `lib/` (vendored libraries and natives; the Java sources under `src/` stay). If Support is kept, the vendored libraries belong in a dependency manager, not in history; that choice is open (Gaps).
- Kept: `gradle/wrapper/gradle-wrapper.jar`, `src/main/resources/ReactionRoles.xml` (empty template).
- The `res/zip codes.txt` file (GKB2, 4.3 MB) goes with `res/`; the weather plugin replaces it with a geocoder.

### 6.3 Runbook facts (per repository, in this order)

1. Stop pushes; close or merge open PRs; note every branch on the remote (`git ls-remote origin`); lift force-push blocks.
2. Copy the legacy data outside every repository, before anything is rewritten: `git archive <rev> guildData | tar -x -C <outside-dir>` for KotlinBottools `main` (last touched by 239210e 2025-09-24, 29 files), GKB2 at `af44c24^` (the last version before deletion, 29 files, 2023-10), and, if its older data is wanted, TrumpBot `main` (30 files). Which copy the importer reads is a data-ownership call, not made here. Store the copy encrypted or access-restricted: it holds Discord member data.
3. Record a manifest of the blob ids and paths to be purged (`git rev-list --objects --all`, filtered by the path list). Blob ids are not secrets and let the exit test run without reading any secret.
4. `git clone --mirror <url> <repo>.git` into a clean directory outside the working trees; keep one untouched backup copy until the exit tests pass, then delete it (it contains the secrets).
5. `git filter-repo --sensitive-data-removal --invert-paths --paths-from-file ../<repo>-purge.txt` inside the mirror (git-filter-repo v2.47 or newer). Keep `commit-map`, `changed-refs` and the printed "First Changed Commit(s)".
6. Inspect: `git log --all --name-status -- <paths>` empty; `git filter-repo --analyze` shows none of the listed paths and no blob over the agreed size.
7. Count affected PR refs from `changed-refs`; `git remote add origin <url>` (filter-repo removed it); `git push --force --mirror origin`. Expect failures only for `refs/pull/*`.
8. Where applicable, open the Support ticket (owner and repository, affected PR count, First Changed Commits). Do not archive or publish until it is resolved.
9. Everybody discards old clones and re-clones; anyone who keeps a clone follows the filter-repo manual (delete tags, fetch `--prune --tags`, rebase, `git reflog expire --expire=now --all`, `git gc --prune=now`, then `git cat-file -t <first-changed-commit>` must fail).
10. KotlinBottools only: a normal PR with the new `.gitignore`, the gitleaks job and the removal of `key.txt` loading from the README. The four archived repositories get only the README pointer commit.

### 6.4 Interaction with the planning branch and open branches

- The planning branch is in the same mirror clone and is rewritten with `main` (it gains new hashes; its content is unchanged except that `.gitignore` is the only change left of 29242b5 after the purge).
- If the planning PR is merged before the rewrite, KotlinBottools will have one affected PR for the Support ticket. If the planning branch were instead rewritten first and its PR opened afterwards from the rewritten branch, no PR ref would point at old history. Either is workable; only the first creates a dependency on Support before the repository goes public.
- Documents that cite pre-rewrite hashes (`b2f2078`, `9422f85`) are updated from `commit-map`, or cite the symbol and the rewritten hash.

### 6.5 Exit criterion

Per repository, all of the following on a **fresh** `git clone --mirror`, plus `git fetch origin '+refs/pull/*:refs/pull/*'` where a PR ref exists:

- `git log --all --name-only --format= | sort -u` contains none of the purge paths (including nested ones such as `src/test/guildData/`, `lib/bin/`).
- `git cat-file --batch-check` over the manifest of purged blob ids reports every id as missing.
- The largest blob is below the agreed threshold; no `.exe`, `.dll`, `.so`, `.dylib` except the Gradle wrapper jar.
- `gitleaks git` with the repository's config returns zero findings.
- `git ls-remote origin` shows no `refs/pull/*` that reaches a purged blob (for GKB2 #6; BotTools #2 and #3 hold only binaries and IDE files, so they are outside the secret/data criterion but inside "no binary blob" unless Support clears them).
- For KotlinBottools: the same checks, repeated after the Support ticket is closed and before the visibility change.

### 6.6 `.gitignore` after the rewrite

Anchor directory names that collide with source packages. Keep the existing IDE and build patterns.

```
# credentials and local configuration
/key.txt
/keys.txt
*.pem
*.key
.env
.env.*
!.env.example

# runtime state and bot data
/BotData.xml
/WebParseKeys.xml
/guildData/
/services/
/res/
/logs/
*.log
*.db
*.db-wal
*.db-shm
*.sqlite
*.sqlite3

# build output
build/
out/
.gradle/
.kotlin/

# IDE and editor files
.idea/
*.iml
*.ipr
*.iws
.project
.classpath
.settings/
.factorypath
.apt_generated
.vscode/
.fleet/
.DS_Store

# downloaded or compiled binaries
*.exe
```

`bin/` stays in KotlinBottools' existing form with its `!**/src/main/**/bin/` exceptions. A `.gitignore` entry does not untrack a file already in the index (`git rm --cached` is needed), which is why the purge precedes it. The four archived repositories do not need a new `.gitignore`.

### 6.7 Secret scanning in CI

- Add a `secret-scan` job to KotlinBottools' CI (same `ubuntu-latest`, `contents: read`), checkout with `fetch-depth: 0`, run the gitleaks binary pinned to a release and verified by checksum, with `gitleaks git --redact -v --config .gitleaks.toml` (history) and `gitleaks dir` (tree).
- `.gitleaks.toml`: `[extend] useDefault = true`, plus (a) a path-only rule for `(^|/)(key\.txt|keys\.txt|key\.pem|BotData\.xml)$` and the data directories, and (b) a rule for the Discord bot token shape.
- Do not use `gitleaks-action`: the organisation is an organisation account, so it needs a licence key, and its licence changed from MIT at v2.0.0.
- Turn on GitHub secret scanning and push protection when KotlinBottools becomes public (the visibility change gives access to the features; "Discord Bot Token" has push protection). MagicBot gets the same config when the repository is created.
- No bot token is needed in CI by this job.

### 6.8 What was rejected

- **BFG** (reasons in Bottom line).
- **A path-and-content double pass.** `--replace-text` would need a file listing the secrets and adds nothing: the secrets occur only in whole-file paths.
- **Deleting and recreating the repositories** instead of force-pushing: it clears PR refs and cached views without Support, but loses the issues (the tracking issue and GKB2 issues) and the repository URLs; it remains the fallback if Support declines for a public repository.
- **Relying on revocation alone** (GitHub's first suggestion): it addresses the credentials but not the personal data, and it does not meet the requirement that no secret or data file remains in any history.

## 7. Load-bearing claims

1. GitHub tells owners to revoke a leaked secret first and notes the rewrite may be unnecessary afterwards.
   Quote: "if the sensitive data you need to remove is a secret (e.g. password/token/credential), as is often the case, then as a first step you need to revoke and/or rotate that secret. ... Going through the extra steps to rewrite the history and remove the secret may not be warranted."
   Source: https://raw.githubusercontent.com/github/docs/main/content/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository.md (section "About removing sensitive data from a repository"); read 2026-10-20, `main`.
2. GitHub Support limits its help to cases where rotation cannot mitigate the risk.
   Quote: "won't remove non-sensitive data, and will only assist in the removal of sensitive data in cases where we determine that the risk can't be mitigated by rotating affected credentials."
   Same source, section "About sensitive data exposure" and "Fully removing the data from GitHub".
3. A force-push leaves clones, forks, cached views and PRs.
   Quote: "If you only rewrite your history and force push it, the commits with sensitive data may still be accessible elsewhere: In any clones or forks of your repository; Directly via their SHA-1 hashes in cached views on GitHub; Through any pull requests that reference them." (the source lists these as three bullets).
   Same source, section "About sensitive data exposure".
4. `--sensitive-data-removal` needs filter-repo 2.47 or newer, and the supported command shape.
   Quote: "You need a version with the `--sensitive-data-removal` flag, meaning at least version 2.47." and "git-filter-repo --sensitive-data-removal --invert-paths --path PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA".
   Same source, section "Purging a file from your local repository's history using git-filter-repo".
5. The push is `git push --force --mirror origin` and `refs/pull/*` cannot be pushed.
   Quote: "git push --force --mirror origin" and "This command will fail to push any refs starting with `refs/pull/`".
   Same source.
6. What Support does and what the ticket must contain.
   Quote: "Dereference or delete any affected PRs on GitHub. Run a garbage collection on the server to expunge the sensitive data from storage. Remove cached views." and "The number of affected pull requests, found in the previous step." and "The First Changed Commit(s) reported by `git-filter-repo`".
   Same source, section "Fully removing the data from GitHub" (the first three items are separate bullets in the source).
7. The PR count comes from `changed-refs`.
   Quote: "grep -c '^refs/pull/.*/head$' .git/filter-repo/changed-refs".
   Same source.
8. Branch protection must be lifted and old clones recontaminate.
   Quote: "If you have any branch protections that prevent force pushes, those protections will have to be turned off (at least temporarily) for the sensitive data to be removed." and "If a fellow developer has a clone from before your rewrite, and after your rewrite simply runs `git pull` followed by `git push`, the sensitive data will return."
   Same source, section "Side effects of rewriting history".
9. Path semantics: root-relative, renames not followed.
   Quote: "Directory names can be given with or without a trailing slash, and all filenames are relative to the toplevel of the repo." and "much like git itself, renames are NOT followed so you may need to specify multiple paths".
   Source: https://raw.githubusercontent.com/newren/git-filter-repo/main/Documentation/git-filter-repo.txt (sections "Path based filtering" and the `--path` options); read 2026-10-20, `main`.
10. Empty commits are pruned by default.
    Quote: "'auto' (the default) means only prune commits which become empty".
    Same source, `--prune-empty`.
11. Clone preparation.
    Quote: "You may pass `--bare` or `--mirror` to `git clone`, if you prefer. You should pass `--no-local` if the repository you are cloning from is on the local filesystem."
    Same source, section DISCUSSION.
12. Cleaning other clones, and the verification step.
    Quote: "delete all tags and run `git fetch --prune --tags`. Running the fetch command without deleting tags first will result in the old tags being kept, which will keep the sensitive data." and "`git cat-file -t ${HASH_OF_FIRST_CHANGED_COMMIT}`".
    Same source, section "Make sure other copies are cleaned up: clones of colleagues".
13. The default for replace refs creates none.
    Quote: "The default is update-no-add, meaning update existing replace refs but do not add any new ones."
    Same source, `--replace-refs`.
14. `--replace-text` is not applied to binary files in GitHub's description.
    Quote: "replace all text listed in `../passwords.txt` from any non-binary files found anywhere in your repository's history".
    GitHub removal page, section "Purging a file from your local repository's history".
15. BFG matches by basename; filter-repo applies filters to `HEAD`.
    Quote: "Thus, it has no way of differentiating between 'README.md' at the toplevel versus in some subdirectory. You simply operate on the basename of files and directories." and "any filters you specify will also be applied to HEAD".
    Source: https://raw.githubusercontent.com/newren/git-filter-repo/main/Documentation/converting-from-bfg-repo-cleaner.md, section "Basic Differences".
16. BFG protects the latest commit by default.
    Quote: "By default the BFG doesn't modify the contents of your latest commit on your master (or 'HEAD') branch, even though it will clean all the commits before it."
    Source: https://rtyley.github.io/bfg-repo-cleaner/ (host unreachable from this environment; text read from the page source in https://raw.githubusercontent.com/rtyley/bfg-repo-cleaner/gh-pages/index.html); read 2026-10-20.
17. Archiving makes everything read-only.
    Quote: "When a repository is archived, its issues, pull requests, code, labels, milestones, projects, wiki, releases, commits, tags, branches, reactions, code scanning alerts, comments and permissions become read-only."
    Source: https://raw.githubusercontent.com/github/docs/main/content/repositories/archiving-a-github-repository/archiving-repositories.md; read 2026-10-20, `main`.
18. Going public exposes Actions logs and gains security features.
    Quote: "Actions history and logs will be visible to everyone." and "The repository will automatically gain access to {% data variables.product.prodname_GHAS %} features."
    Source: https://raw.githubusercontent.com/github/docs/main/content/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility.md, section "Making a repository public"; read 2026-10-20, `main`.
19. GitHub secret scanning supports Discord bot tokens with push protection.
    Quote: "supportedSecret: Discord Bot Token / secretType: discord_bot_token / isPublic: true / isPrivateWithGhas: true / hasPushProtection: true".
    Source: https://raw.githubusercontent.com/github/docs/main/src/secret-scanning/data/pattern-docs/fpt/public-docs.yml, entry "provider: Discord"; read 2026-10-20, `main`.
20. gitleaks-action needs a licence for organisations.
    Quote: "`GITLEAKS_LICENSE` (required for organizations, not required for user accounts)" and "Since v2.0.0 of Gitleaks-Action, the license has changed from MIT".
    Source: https://raw.githubusercontent.com/gitleaks/gitleaks-action/master/README.md; read 2026-10-20, `master`.
21. gitleaks default Discord rule needs a "discord" keyword and 64 hex digits.
    Quote: `id = "discord-api-token"` ... `regex = '''(?i)[\w.-]{0,50}?(?:discord)(?:[ \t\w.-]{0,20})[\s'"]{0,3}(?:=|>|:{1,3}=|\|\||:|=>|\?=|,)[\x60'"\s=]{0,5}([a-f0-9]{64})(?:[\x60'"\s;]|\\[nr]|$)'''` ... `keywords = ["discord"]`.
    Source: https://raw.githubusercontent.com/gitleaks/gitleaks/master/config/gitleaks.toml; read 2026-10-20, `master`.
22. gitleaks supports path-only rules, extending the default, and the `git` command.
    Quote: "Golang regular expression used to match paths. This can be used as a standalone rule or it can be used in conjunction with a valid `regex` entry." and "`git` scan git repositories for secrets" and "--redact uint[=100] redact secrets from logs and stdout."
    Source: https://raw.githubusercontent.com/gitleaks/gitleaks/master/README.md, sections "Usage" and "Configuration"; read 2026-10-20, `master`. Licence: https://raw.githubusercontent.com/gitleaks/gitleaks/master/LICENSE ("MIT License").
23. `.gitignore` anchoring and tracked files.
    Quote: "If there is a separator at the beginning or middle (or both) of the pattern, then the pattern is relative to the directory level of the particular `.gitignore` file itself. Otherwise the pattern may also match at any level below the `.gitignore` level." and "Files already tracked by Git are not affected".
    Source: https://raw.githubusercontent.com/git/git/master/Documentation/gitignore.adoc; read 2026-10-20, `master`.
24. Newest filter-repo release listed is v2.47.0.
    Quote: "v2.47.0: 04 Dec" (the page omits the year; summarised by WebFetch).
    Source: https://github.com/newren/git-filter-repo/releases; read 2026-10-20.

## 8. Gaps

- **Unreachable sources.**
  - `docs.github.com` (probe: 000): GitHub's documentation was read from its source repository `github/docs` on `raw.githubusercontent.com`, so the text carries unrendered template variables (`{% data variables.… %}`); rendered wording on the live site was not compared.
  - `git-scm.com` (probe: 000): the `git filter-branch` warning is cited only through filter-repo's README.
  - `rtyley.github.io` (DNS failure): BFG's documentation was read from the HTML in the BFG repository's `gh-pages` branch.
  - `github.com/newren/git-filter-repo` (curl 403): used WebFetch for the releases page only; the release year is not shown there.
- **Support's policy on this case is not established.** Whether GitHub Support will clear PR refs and cached views for repositories whose leaked tokens are already dead, but which hold personal data, is a judgement from the documentation wording, not a documented rule. The outcome is known only after a ticket. Not established: whether Support can act on an already archived repository (this report sequences the ticket before archiving so the question does not arise).
- **Not inspected, content unknown.** BotTools `Working-Branch` (tip 8f0dddb) and TrumpBot `feature/pokercommand` (tip 5913379) are on the remote but not on disk; fetching them was outside the read-only boundary. Their history, and any additional purge paths in it, are unknown. TrumpBot and Support were inspected only through the coordinator's checkouts (9 and 2 commits); other remote refs on them, if any, appear only as listed in section 3.5.
- **Forks and PR counts of the private repositories** (KotlinBottools, TrumpBot, Support) could not be read; only `git ls-remote` was available (no `refs/pull/*`, which means no PRs have ever been opened, but forks are invisible to it). An organisation owner must check "Insights, Forks" before each rewrite. Forks and PR counts of the public repositories come from WebFetch summaries of GitHub pages, not from the API.
- **Branch protection, rulesets, signed commits.** Whether any repository has a rule that blocks force-pushes, and whether any commit is signed, was not checked (no API access).
- **Copies outside GitHub.** Whether GKB2 and GKB (public since at least their last commits) were mirrored or archived elsewhere cannot be established from here and cannot be undone by the rewrite.
- **gitleaks behaviour is inferred, not run.** The claim that the default rules would miss a bare token file comes from reading the default configuration; gitleaks is not installed here. The custom rules in 6.7 are untested; a dry run against a copy of the pre-rewrite mirror (with `--redact`) should confirm that they flag every blob in the manifest.
- **Which `guildData/` copy the legacy importer reads** (KotlinBottools `main`, GKB2 at `af44c24^`, TrumpBot `main`) is not decided here; section 6.3 only requires that every candidate copy is saved outside the repositories before the rewrite.
- **Support's future** (archive, keep private, replace the vendored libraries by dependencies) is not set by the work; the light pass in 6.2 assumes it stays as a private reference repository.
- **Whether `res/` assets in TrumpBot are redistributable** (icons, trivia, piece images) is not assessed; they are removed as bulk assets under the stated rule.
