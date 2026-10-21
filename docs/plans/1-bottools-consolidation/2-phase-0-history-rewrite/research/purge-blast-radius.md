# What the rewrite leaves in each repository, and what else it touches

Researched 2026-10-21 for [KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).

Method in one paragraph. KotlinBottools was read from this clone with `git` (both branches, 61 commits). GKB2, GKB,
BotTools, TrumpBot and Support were read only through the GitHub API: every ref that `git ls-remote` shows, every
commit reachable from each ref tip (`gh api "repos/SpartanLaboratories/<repo>/commits?sha=<tip>&per_page=100"
--paginate --slurp`), and one `git/trees/<tree>?recursive=1` call per distinct commit tree (`truncated` was false for
every tree). From those commit graphs and trees a content-free stand-in repository was built per repository in a
scratch directory (`git fast-import`; each blob's content is a stand-in string, so equal blobs stay equal and nothing
of the real content exists). `git filter-repo` v2.47.0 (`--sensitive-data-removal --invert-paths --paths-from-file`,
on a copy whose `origin` is a mirror, as in a `git clone --mirror`) was run on each stand-in with the parent
research's lists, and the sibling findings' `blob_manifest.py` was run on it unmodified. Every number in A that is
labelled *observed* was produced that way and agrees across three independent derivations (a graph simulation written
for this question, the classifier, and the filter-repo run). No pre-rewrite commit id, blob id, guild name, member
name or Discord id appears below; the scratch directory was deleted afterwards.

## 1. Question

For the six bot repositories, which commits, paths and blobs does the path-list rewrite leave, and what does it touch
beyond the histories: this repository's documents and issue texts, the organisation's other repositories, the text
that becomes public with KotlinBottools, the merge of the planning branch, and the references that depend on
KotlinBottools' issue numbers. An answer must give the expectations the exit tests compare against, a count of personal
data in everything public-bound, a count of references to pre-rewrite commit ids, the cost of a fresh repository under
the same name, and the parent statements that stop being true when no GitHub Support ticket is filed and the legacy
data sits in an ordinary local folder.

## 2. Bottom line

- **The rewrite removes 10 commits across the six repositories, not 6: three of them (one each in KotlinBottools, GKB
  and TrumpBot) are merge commits that become empty.** A merge whose side branch held only commits inside the purge
  list is flattened and then pruned (filter-repo manual, `--prune-degenerate`). Commit counts (rewritten mirror, branches and
  tags, equal to every ref): KotlinBottools 61 to 59, GKB2 32 to 30, GKB 11 to 9, BotTools 16 to 15, TrumpBot 11 to 9,
  Support 2 to 1. A fresh mirror of the server after the push also holds the old commits behind the pull-request refs:
  GKB2 30 + 15 = 45, BotTools 15 + 13 = 28. `You rewrote C (of T)` has C = T everywhere; `first-changed-commits` has
  one line per repository.
- **Survivors are clean.** After the rewrite 115 / 82 / 60 / 82 / 56 / 29 distinct paths remain (same order), all of
  them source, build scripts, the Gradle wrapper and (KotlinBottools only) documents. No binary other than
  `gradle/wrapper/gradle-wrapper.jar` (present in KotlinBottools, GKB2 and GKB only), no credential-like name, no name
  `git fast-import` rejects on Windows, no `guildData`, `logs` or root `services` path. The largest surviving blob is
  14 to 60 KB per repository (KotlinBottools' planning documents reach 159 KB and grow). Every purge-list entry
  matches at least one path. The only blobs shared between a purged and a kept path are the empty blob
  (KotlinBottools, 1) and two build-output copies of `logback.xml` (BotTools, 2); the manifests are 346, 81, 58, 39,
  199 and 7,259 blobs.
- **The public-bound text carries no member name, guild name or legacy Discord id.** The privacy gate (section 6.3)
  over KotlinBottools' 316 text blobs on both branches, its 61 commit messages and identities, its 19 issues and 2
  comments, and the commit messages of the five other repositories found 0 blocking hits. Its raw hits (277 member,
  138 guild, 34 id-shaped) are two ordinary words, the name of one of the six repositories, a public numeric constant
  and three digit runs inside a hash. Pull-request text does not exist. The same gate over the unpurged repository flags 1,305 member hits, so it
  would catch a failed purge.
- **154 references to pre-rewrite commits sit in 16 files on the planning branch** (55 distinct commits: 17 of
  KotlinBottools, 38 of the other five), 121 of them in the parent purge research; the file set on `main` holds none,
  and neither do KotlinBottools' issues, MagicBot's files and issues, WebTools #55 and #58, or `SpartanLaboratories/.github`.
  Every one goes stale at the rewrite. Replace them by subject and date before the visibility change; 39 more
  occurrences (one more KotlinBottools commit) remain in older document versions that history keeps.
- **A fresh repository under the same name costs up to 75 re-created links and keeps about 180 text citations alive
  only if the numbers survive:** 18 sub-issue links, 36 in-repository blocked-by links, 21 cross-repository links (19
  with MagicBot, 2 with WebTools #55), a milestone and 3 labels; 49 citations in MagicBot, 6 in WebTools, 5 in the
  `.github` mirror, about 56 in KotlinBottools' documents, 67 bare references in its issues. GitHub documents that
  a transfer keeps comments, assignees and (if present in the target) labels and milestones and redirects the old URL;
  it documents nothing about issue numbers or sub-issue and blocked-by links. Projects, webhooks, deploy keys, secrets
  and forks: none to rebuild.
- **The planning branch merges into `main` without conflict only if both sides hold the same `.gitignore`.** Observed
  with `git merge` on a stand-in: different content on both sides conflicts; the identical file on both, or a planning
  branch whose net `.gitignore` change is zero, merges cleanly. Copy the file with `git checkout <ref> -- .gitignore`,
  never with `cherry-pick`. In the README only lines 233 to 235 and 261 to 265 (files that leave the clone) become
  wrong; line 257 is the kept `services` source package.

## 3. Findings

Evidence tiers: **observed** (a command run on 2026-10-21, given with the finding), **documented** (a source quoted in
section 7), **inference** (derived; labelled).

### 3.A Post-rewrite expectations, per repository

#### A.1 Table (observed)

`T` = commits before; `P` = commits pruned; "mirror" = the rewritten bare mirror; "fresh" = a `git clone --mirror`
of the server after the push (it also downloads `refs/pull/*`, which the server keeps unrewritten). Blobs are over every
commit tree of every ref.

| | KotlinBottools | GKB2 | GKB | BotTools | TrumpBot | Support |
|---|---|---|---|---|---|---|
| Refs in the mirror (branches; pull) | 2; 0 | 1; 1 | 1; 0 | 2; 2 | 2; 0 | 1; 0 |
| `T`, all refs | 61 (`main` 20, planning-only 41) | 32 | 11 | 16 | 11 | 2 |
| `T`, branches only | 61 | 32 | 11 | 16 | 11 | 2 |
| `P` (pruned) | 2 | 2 | 2 | 1 | 2 | 1 |
| Commits after, mirror and branches | 59 | 30 | 9 | 15 | 9 | 1 |
| Commits after, fresh (pull refs fetched) | 59 | 45 | 9 | 28 | 9 | 1 |
| `You rewrote C (of T)` | 61 of 61 | 32 of 32 | 11 of 11 | 16 of 16 | 11 of 11 | 2 of 2 |
| `changed-refs` lines (of them `refs/pull/*/head`) | 2 (0) | 2 (1) | 1 (0) | 4 (2) | 2 (0) | 1 (0) |
| `first-changed-commits` lines | 1 | 1 | 1 | 1 | 1 | 1 |
| Distinct paths ever, then surviving | 282 to 115 | 145 to 82 | 115 to 60 | 110 to 82 | 234 to 56 | 7,493 to 29 |
| Blobs total, kept, purged-only (manifest) | 663, 317, 346 | 292, 211, 81 | 171, 113, 58 | 184, 145, 39 | 305, 106, 199 | 7,288, 29, 7,259 |
| Blobs under both a purged and a kept path | 1 | 0 | 0 | 2 | 0 | 0 |
| Purged-only bytes (MiB); largest purged blob (MiB) | 8.3; 1.1 | 5.3; 4.1 | 2.1; 1.5 | 8.1; 7.8 | 118.8; 41.1 | 161.7; 12.3 |
| Largest surviving blob (bytes) | 159,282 (a document) | 60,756 (wrapper jar) | 60,756 (wrapper jar) | 27,168 | 25,952 | 14,302 |
| Largest surviving non-jar blob (bytes) | 159,282; `main` alone 30,229 | 27,602 | 27,586 | 27,168 | 25,952 | 14,302 |
| Binary survivors besides the wrapper jar | 0 | 0 | 0 | 0 | 0 | 0 |
| Wrapper jar present | yes | yes | yes | no | no | no |
| Kept paths `fast-import` would reject | 0 | 0 | 0 | 0 | 0 | 0 |
| Credential-like surviving names | 0 | 0 | 0 | 0 | 0 | 0 |
| Nested `services` source-package files kept | 11 | 6 | 6 | 8 | 0 | 0 |

Commands: counts from the stand-in mirror before (`git rev-list --all --count`, `git rev-list --branches --count`) and
after (`git filter-repo ...`, then the same two commands, `git rev-list --all --no-commit-header --format=%T` plus
`git ls-tree -r -z` over every distinct tree for paths and blobs); `commit-map`, `ref-map`, `changed-refs` and
`first-changed-commits` from the run's `filter-repo/` directory; the manifest triple (`blobs_total`, `blobs_kept`,
`blobs_under_purged_paths`, `blobs_shared`) is the sibling classifier's output. Sizes come from `git/trees` (`size`).
Surviving non-jar sizes: the stand-in cannot hold real sizes, so they come from the API tree entries of the surviving
paths. Every `PASS` of `expect_check.py` (section 6.1) was run against the rewritten stand-ins.

KotlinBottools' numbers move with every planning commit. The stable rules are `after = T - 2`, `C = T`, and "paths and
blobs are those of the surviving paths in every commit tree"; the planning documents (39 files at the tip, 41 paths
over history) are the only part that grows. The other five histories are static while nothing is pushed to them.

#### A.2 The commits that disappear (observed)

| Repository | Pruned commit (subject, date) | Kind |
|---|---|---|
| KotlinBottools | "Removed build folder", 2023-01-02 | non-merge, deletes the 58 files of `build/` |
| KotlinBottools | "Merge branch 'main' of ..." , 2023-02-06 | merge that becomes degenerate: its second-parent side held only the commit above |
| GKB2 | "bot data changes", 2023-09-03 | non-merge, 3 changed paths: `BotData.xml`, one under `services/`, one under `guildData/` |
| GKB2 | "No DB updates", 2023-10-29 | non-merge, deletes the 29 files of `guildData/` |
| GKB | "Delete key.txt", 2023-03-25 | non-merge |
| GKB | "Merge branch 'master' of ...", 2023-04-04 | degenerate merge: its second-parent side held only the commit above |
| BotTools | "Converted to Gradle Project", 2022-10-14 | non-merge, 2 changed paths: `lib/.project` and a file under `lib/.settings/` |
| TrumpBot | "Delete key.txt", 2022-10-09 | non-merge |
| TrumpBot | "Merge branch 'main' of ...", 2022-10-11 | degenerate merge: its second-parent side held only the commit above |
| Support | "Native Libraries", 2022-10-01 | non-merge, adds the 32 files of `natives/` |

The parent research (section 3.3) counted only the non-merge commits and so predicted 1, 2, 1, 1, 1 for KotlinBottools,
GKB2, GKB, BotTools and TrumpBot (and no Support entry). The filter-repo manual states the rule it missed: "merge
commits ... can become degenerate with the pruning of other commits ... If such merge commits have no file changes,
they can be pruned." An exit test that expected the parent's counts would fail on four repositories (KotlinBottools, GKB, TrumpBot and
Support). No branch is
deleted: every ref survives (`ref-map` has no all-zero `new` value). The planning branch's commit "chore: stop tracking
IDE and Gradle cache files" survives with only its `.gitignore` change.

#### A.3 Purge-list entry hits (observed)

Distinct paths matched / commits whose tree holds one (filter-repo's root-anchored matching rule). Every entry is at
least 1/1, so none is a typo or a rename.

- **KotlinBottools:** `key.txt` 1/43, `BotData.xml` 1/56, `WebParseKeys.xml` 1/58, `guildData/` 30/56,
  `src/test/guildData/` 30/3, `services/` 5/58, `res/` 7/54, `.gradle/` 21/19, `.idea/` 12/22, `build/` 58/6,
  `.project` 1/17.
- **GKB2:** `key.txt` 1/3, `keys.txt` 1/10, `BotData.xml` 1/32, `WebParseKeys.xml` 1/32, `guildData/` 29/20, `logs/`
  5/22, `res/` 14/31, `services/` 2/32, `.idea/` 8/32, `src/jvmTest/resources/screenshot.png` 1/32.
- **GKB:** `key.txt` 1/2, `BotData.xml` 1/11, `WebParseKeys.xml` 1/11, `guildData/` 29/11, `logs/` 5/11, `res/` 7/11,
  `services/` 2/11, `.idea/` 6/11, `screenshot.png` 1/5, `cutout.png` 1/5, `src/jvmTest/resources/screenshot.png` 1/1.
- **BotTools:** `.gradle/` 17/11, `.classpath` 1/16, `.project` 1/16, `.settings/` 2/16, `lib/.classpath` 1/11,
  `lib/.project` 1/12, `lib/.settings/` 1/12, `lib/bin/` 3/11, `youtube-dl.exe` 1/11. These include the
  `Working-Branch` commit.
- **TrumpBot:** `key.txt` 1/4, `key.pem` 1/11, `BotData.xml` 1/11, `WebParseKeys.xml` 1/11, `botdata.css` 1/4,
  `guildData/` 30/11, `services/` 1/9, `res/` 126/11, `log.txt` 1/11, `list.dat` 1/11, `list.idx` 1/11, `dl.bat` 1/11,
  `javadoc.xml` 1/11, `youtube-dl` 1/4, `youtube-dl.exe` 1/7, `ffmpeg.exe` 1/11, `ffprobe.exe` 1/11, `framed.png`
  1/11, `framed photo.png` 1/11, `bin/` 1/5, `.classpath` 1/11, `.project` 1/11, `.settings/` 2/11. These include the
  `feature/pokercommand` commits.
- **Support:** `.classpath` 1/2, `.project` 1/2, `.settings/` 1/2, `doc/` 23/2, `natives/` 32/1, `lib/` 7,406/2.

#### A.4 What survives (observed)

- **Completeness of the lists.** No surviving path has a component in `bin`, `build`, `out`, `.gradle`, `.idea`,
  `.settings`, `res`, `target`, `logs`, `tmp`, `cache`, `dist`, `data`, `db`, `save` or `backup`. Surviving files other
  than source, scripts and documents are only build configuration (`gradle.properties`, wrapper properties, `gradlew`,
  `gradlew.bat`, `.gitattributes`, `.gitignore`, `pom.xml`), `logback.xml`, `ReactionRoles.xml` (an empty template),
  GKB2's three Spring wiring files and `MANIFEST.MF`, and two test resources named `PoECurrencyGroups.xml` and
  `PoECurrencyKeys.xml` in GKB2 and GKB. The credential regex `(token|secret|passw|credential|cookie|apikey|api_key|
  \.env$|\.pem$|\.key$|\.p12$|\.pfx$|\.jks$|id_rsa|\.keystore$)` matches no surviving path of any repository, so there
  is no list to confirm. `PoECurrencyKeys.xml` is the one name that reads like a key list; it is a test resource next
  to a currency-group file and the parent research's content scans found nothing in it, but its content was not opened
  for this question (Known gaps).
- **Nested `services` packages are kept** because the list is root-anchored: `src/main/kotlin/bottools/services/`
  (KotlinBottools, 7 Kotlin and 4 Java files), the same package in GKB2 and GKB (6 files each), and in BotTools 6 files
  under `lib/src/main/java/BotTools/services/` and 2 in the older `src/` layout. These are the only surviving paths with a
  `guildData`, `logs` or `services` component.
- **Shared blobs.** KotlinBottools' one shared blob is the empty blob (also stored under `.gradle/` and `guildData/`;
  kept as `src/main/kotlin/Main.kt`). BotTools' two are the 624- and 625-byte `logback.xml` variants, copied under
  `lib/bin/`. They are not in the manifests (346 and 39 are `blobs_under_purged_paths - blobs_shared`).
- **Windows.** No kept path contains `: * ? " < > | \`, ends in a dot or a space, or is a reserved device name; no purged
  path does either. The filter-repo runs on Windows git 2.55.0.windows.5 and Python 3.14.7 exited 0 on all six
  stand-ins with `core.protectNTFS` at its default.
- **Pull-request refs (what a fresh mirror still holds).** GKB2 `refs/pull/6/head` and BotTools `refs/pull/2/head`,
  `refs/pull/3/head` all point at commits already on the default branches, so the local rewrite leaves no commit
  reachable only from them, and the server keeps the unrewritten versions: 15 old commits behind GKB2's ref (reaching 70
  of its 81 manifest blobs: the key-file blobs, data and logs of that period) and 13 behind BotTools' two (reaching all
  39: binaries and IDE files). A fresh GKB2 mirror therefore holds 281 blobs (211 kept + 70) and 45 commits, a BotTools mirror 184 blobs and 28
  commits (both confirmed on a simulated fresh mirror: the rewritten branches fetched beside the unrewritten pull refs).
  The parent exit criterion "no pull-request ref reaches a purged blob" cannot hold for these two without a Support
  ticket; the measurable statement is the residual above (section 3.F).

### 3.B Privacy gate baseline for what becomes public with KotlinBottools

Observed with the gate in section 6.3 (`privacy_gate.py`, Python 3.14.7, run from a scratch directory), on 2026-10-21,
planning branch at 61 commits. The unpurged repository was scanned with the purge list as `::PURGE_LIST`, which drops
exactly the paths the rewrite removes; that is the content a public KotlinBottools would show.

**Lists, rebuilt in memory from the legacy data (observed).** Layout of every source: `guildData/<guild folder>/` holding
`GuildData.xml`, `MemberData.xml`, `AutoPromotionRanks.xml`, `DuplicatedChannels.xml`, `Playlists.xml` and, in one or two
folders, further files; member names are the text of the `tName` elements.

| Source | Guild folders (of them under 5 characters) | Distinct member names (under 5) | Distinct id-shaped numbers (occurrences) |
|---|---|---|---|
| KotlinBottools `main` | 6 (2) | 159 (12) | 20 (30) |
| TrumpBot `main` | 6 (2) | 159 (11) | 11 (17) |
| GKB2 at the parent of the commit that deletes `guildData/` | 6 (2) | 207 (14) | 15 (21) |
| GKB `master` (added as a fourth source) | 6 (2) | 158 (12) | 14 (20) |
| Union over every version in the four histories | 6 (2) | 240 (14) | 25 |

One guild folder is a seeded template named with an ordinary English word. No guild folder name is also a member name.

**Hits (observed).** "Gross" is before the reviewer's allow-list; counts are over the union list unless stated.

| Corpus | Size | Member, 5+ chars | Guild, 5+ chars | Member, under 5 | Guild, under 5 | Id-shaped (of them found in the legacy data) |
|---|---|---|---|---|---|---|
| KotlinBottools files, both branches, purged paths dropped | 316 text blobs (1 binary skipped), 61 commits | 277 (2 words) | 138 (1 word, 23 files) | 43 | 11 | 34 (0) |
| KotlinBottools commit messages | 61 | 0 | 0 | 0 | 0 | 0 |
| KotlinBottools commit identities (author and committer names and e-mails) | 61 commits | 0 | 0 | 0 | 0 | 0 |
| KotlinBottools issue titles and bodies, #1 to #19 | 19 | 7 (1 word) | 0 | 0 | 0 | 0 |
| KotlinBottools issue comments | 2, both on #1 | 2 (same word) | 0 | 0 | 0 | 0 |
| Pull-request text | none exist (`gh pr list --state all` is empty; REST `pulls` is empty) | | | | | |
| GKB2 commit messages and identities (public) | 32 | 0 | 0 | 0 | 0 | 0 |
| GKB (public) | 11 | 0 | 0 | 0 | 0 | 0 |
| BotTools (public) | 16 | 0 | 0 | 0 | 0 | 0 |
| TrumpBot (private) | 11 | 2 (1 word) | 0 | 0 | 0 | 0 |
| Support (private) | 2 | 0 | 0 | 0 | 0 | 0 |

- **By list source.** The KotlinBottools, GKB2, GKB and union lists give identical counts. The TrumpBot list gives 34 /
  138 / 36 / 11 (it lacks the 8-character word below), so the extra 243 hits belong to that one word.
- **Where the 5+ character hits are (masked locations, observed).** Three words account for all 415 hits in the files.
  (1) An 8-character word that is the name of one of the six repositories: 243 hits in 19 files (research documents
  that name that repository, e.g. "BotTools, `<NAME>` and Support"), 7 in the bodies of issues #1, #2 and #16, 2 in the
  comments of #1, 2 in TrumpBot's commit messages ("`<NAME>` 1.2.2.1" and a merge message). (2) A 7-character ordinary
  word, 34 hits in 8 files ("retention period and `<NAME>` size"). (3) The 8-character template guild folder, an
  ordinary word: 138 hits in 23 files ("the configured `<GUILD>`"). None is a person or a server. With these three words on the
  allow-list the gate reports 0 blocking hits; the under-5-character counts (43 and 11) are single letters and common
  short words (for example `<name`, `id`), counts only.
- **Id-shaped numbers.** 34 occurrences in the files: 31 are the Steam64 base offset in the account-conversion notes
  of two research documents (a public constant, not in the legacy data) and 3 are digit runs inside a SHA-256 value; 0
  occur in the legacy data. No 17- to 20-digit literal sits in any surviving source file.
- **Positive control.** The same gate over this repository without the purge list reports 1,305 member hits, 85
  id-shaped numbers and paths printed as `guildData/<GUILD#n>/...`; a scratch file with one planted name, one planted
  guild name and one planted id is reported as 3 blocking hits with all three masked.
- **Newly public personal data that is not in the lists.**
  - Commit headers: a single personal Gmail address of the maintainer is the author or committer e-mail of 81 of
    KotlinBottools' 122 identity fields (the rest are `anthropic.com`, 40, and `github.com`, 1). The same address
    appears in the commits of GKB2, GKB and BotTools, which are already public.
  - The maintainer's local Windows user name appears in 6 files of the planning branch (5 planning documents, 1 source
    comment), 17 lines; `AppData` and `OneDrive` appear in 2 files each.
- **No other public-bound surface.** Releases 0, tags 0, Actions runs 0, Pages off, wiki repository not found,
  Discussions off, description and topics empty, 0 Projects v2 items from this repository.

### 3.C References to pre-rewrite commit ids

Observed with `oldid_refs.py` (section 6.4), 7- to 40-digit hexadecimal tokens resolved by prefix against all 133 commit
ids of the six repositories (KotlinBottools' ids were also checked against `git rev-list --all`).

| Location | Tokens | Files or issues | Distinct commits |
|---|---|---|---|
| Files on KotlinBottools `main` | 0 | 0 | 0 |
| Files on the planning branch | 154 (all 7 characters) | 16 | 55 (KotlinBottools 17, GKB2 13, GKB 7, BotTools 7, TrumpBot 10, Support 1) |
| All surviving versions of all files in history | 193 | 18 | 56 (KotlinBottools 18) |
| KotlinBottools commit messages | 0 | | |
| KotlinBottools issues and comments (#1 to #19) | 0 | | |
| MagicBot files (3) and issues (8, no comments) | 0 | | |
| WebTools #55 and #58 and their comments | 0 | | |
| `SpartanLaboratories/.github` (133 files) | 0 | | |

By file on the planning branch: `research/bot-repository-history-purge.md` 121 (sections 3.1 to 3.5, 5, 6.3, 6.4, 8: the
per-repository tables, the remote-state table and the baseline line), `architecture.md` 5 (header and section 11),
`briefs/00-shared-preamble.md` 3, `research/README.md` 3 (header), `research/codebase-inventory-and-fate.md` 3,
`superseded/draft-2026-10-20.md` 3, six other research files 2 each (their `Applies to` baselines), `roadmap.md` 1 (the
branch-baseline line), three briefs 1 each.

- **What the rewrite does to them (inference from filter-repo's behaviour and the sibling findings).** Every id in the
  table is a pre-rewrite id and every one changes: all 61 KotlinBottools commits (the planning branch is rewritten with
  `main`), and every commit of the five others (each root holds a purged path). A citation therefore becomes stale; the
  new id is in `commit-map`, except for the 10 pruned commits, which have none. filter-repo does not rewrite ids in
  the text of the documents' blobs because the documents are not commit messages (it rewrites only commit-message
  hashes).
- **Once KotlinBottools is public the 17 to 18 KotlinBottools ids are lookup keys** for the old objects (sibling
  findings section 3.1: every web and REST route serves an unreferenced commit by 4 or more hex digits; one old tip
  yields the whole old history). The ids of GKB2, GKB and BotTools are in repositories that were already public. The
  TrumpBot and Support ids resolve only for readers of those private repositories.

### 3.D References that a fresh repository under the same name would affect

All observed on 2026-10-21 (`gh api graphql` on `Issue.subIssues`, `blockedBy`, `blocking`, `parent`, `projectItems`).

| Dependent | Count |
|---|---|
| Sub-issue links (parent #1 to #2 through #19) | 18 |
| "Blocked by" links inside KotlinBottools | 36 |
| "Blocked by" links between KotlinBottools and MagicBot | 19 (15 where a MagicBot issue is blocked by KotlinBottools #2, #6 to #11 or #16; 4 the other way, MagicBot #2 to #5 blocking #16) |
| "Blocked by" links with WebTools #55 | 2 (blocking #9 and #16) |
| Tracked-issue (task-list) links | 0 |
| Milestone `1.0.0` | 1, on #3 to #16 (14 open issues, no due date) |
| Labels in use | `type: feature` on 16 issues, `type: tracking` on #1; 12 labels exist (9 defaults, 3 custom; `type: bug` is unused) |
| Projects v2 linked, items from this repository | 0 (the organisation's 5 projects hold items of GKB2, TrumpBot, BotTools and drafts only) |
| Webhooks, deploy keys, Actions secrets, variables, environments | 0, 0, 0, 0, 0 |
| Forks, stars, watchers, collaborators, teams | 0, 0, 1, 1, 0 |
| Branch protection | none; rulesets could not be read on a private Free repository (HTTP 403) |

Text citations of KotlinBottools issue numbers (observed by regular-expression counts over the fetched texts; "bare" is
`#N` with no repository name):

| Corpus | `KotlinBottools#N` | `/KotlinBottools/issues/N` | Bare `#N` that points at KotlinBottools | Numbers cited |
|---|---|---|---|---|
| KotlinBottools documents on the planning branch | 32 | 10 | about 14 (of 200 bare tokens; the rest name GKB2, BotTools, TrumpBot, WebTools or filter-repo issues) | #1, #2, and the range #1 to #19 |
| KotlinBottools issue bodies | 0 | 0 | 63 in all 19 issues | #1 to #19 |
| KotlinBottools issue comments | 0 | 0 | 4 | #2, #9, #16, #19 |
| MagicBot issues (7 of 8 cite) | 47 | 2 (in its tracking issue) | 0 (its 26 bare tokens are its own numbers) | #1, #2, #6 to #11, #15, #16 |
| MagicBot files | 0 | 0 | 0 | |
| WebTools #55 and #58 | 4 | 2 | 0 | #1 |
| `SpartanLaboratories/.github` | 5 (3 memory notes in the `claude/` mirror) | 0 | 0 | #1 |

- **What `gh issue transfer` keeps (documented).** "When you transfer an issue, comments and assignees are retained.
  Labels and milestones are also retained if they're present in the target repository, with labels matching by name and
  milestones matching by both name and due date." "The original URL redirects to the new issue's URL." "A private
  repository issue cannot be transferred to a public repository." The page does not mention issue numbers, sub-issues,
  blocked-by links, projects or reactions. The GraphQL `transferIssue` input has `createLabelsIfMissing` ("Whether to
  create labels if they don't exist in the target repository (matched by name)"), and `addSubIssue`, `addBlockedBy`
  exist as mutations (schema introspection, 2026-10-21), so every link can be re-created if the transfer drops it.
- **Reading (inference).** Text citations such as `KotlinBottools#16` resolve by number at display time, so the 60
  citations in MagicBot, WebTools and the `.github` mirror (and the 123 inside KotlinBottools' own documents and issues)
  survive exactly when the 19 issues arrive with the numbers 1 to 19
  (transfer them in order, one at a time, into an empty repository of the same organisation; every issue is open, so
  all are transferable into a private repository, not into a public one). Relationship links belong to the old
  issues; if a transfer drops them, 75 links (18 + 36 + 21) are re-created through the two mutations. The old repository
  has to be renamed or deleted before the new one takes its name, and the deletion removes the 21 cross-repository links
  from MagicBot's and WebTools' side as well.

### 3.E `.gitignore` merge interplay and the README

**Merge (observed in a scratch repository; the rule is documented).** A stand-in repository was given the base
`.gitignore` of `main`, a planning branch holding the planning branch's current `.gitignore` and a text file, and a
`main` commit that replaces the file with the root-anchored list of the parent research section 6.6 plus the `bin/`
exceptions. Results of `git merge --no-commit --no-ff`:

| Planning branch's `.gitignore` | Merge into the new `main` |
|---|---|
| its own 11-line edit (the template plus IDE and swap-file blocks) | **conflict** in `.gitignore` (both sides changed the tail of the file) |
| the identical bytes of the new `main` file, committed on the planning branch | clean |
| restored to the base content (net change zero) | clean |
| (the reverse direction: the planning branch merging `main`) | **conflict** |
| (`git cherry-pick` of the `main` commit onto the planning branch, to make them equal) | **conflict**; `git checkout <main commit> -- .gitignore` plus a commit makes the merge clean |

`git merge-tree <base> <main> <planning>` (the deprecated trivial mode, which writes nothing) prints the same "changed
in both" conflict. The documented rule: "A conflict occurs if both `<current>` and `<other>` have changes in a common
segment of lines." The planning branch changes the last line (`.DS_Store`, which gains a newline) and appends 11
lines; the anchored file changes those lines too. After the rewrite that commit keeps only its `.gitignore` edit, so the
conflict survives the purge.

README: the planning branch's `README.md` equals `main`'s, so the planning merge never conflicts on it.

**README statements (observed on `main`, lines of the 369-line file).**

| Lines | Statement | Describes files the rewrite removes? | Run-time reader | Change |
|---|---|---|---|---|
| 37 | "Per-guild data isolation in `/guildData/[GuildName]/`" | runtime layout, no tracked files | `KotGDP.createGuildDatabase` (`File(...).mkdirs()`), `updateServerDatabase` | accurate; optionally add "created at run time, not in the repository" |
| 69 to 75 | "Create `key.txt` with your Discord bot token" and "Never commit `key.txt`!" | the file leaves; the instruction still holds | `Bot.initializeBotExistence` (reads `key.txt` with `FileReader` into `keys`, then `JDABuilder.createDefault(keys[0], ...)`) | accurate; add that the file is untracked and ignored |
| 164 | `<!-- guildData/[GuildName]/MemberData.xml -->` example | no | `KotGDP.filedMembers`, `getNodeOf` | accurate |
| 189 | `KotGDP().openFile("BotData.xml")` | file leaves | top-level `val B` in `KotGDP.kt`; `GuildDataParser` (legacy) | accurate as code; the file is not in a clone |
| **233 to 235** | tree lists `key.txt`, `BotData.xml`, `WebParseKeys.xml` as repository files | **yes** | `Bot`, `KotGDP`, `SourceKeyParser` (`reader.setDocument("WebParseKeys.xml")`) | **wrong after the rewrite**: mark as local, untracked |
| 257 | `services/` under `src/main/kotlin/bottools/` | no: this is the kept source package | | none |
| **261 to 265** | tree lists the root `guildData/` with three files | **yes** | `KotGDP` | **wrong**: mark as created at run time |
| 278, 279 | `File("guildData/${event.oldName}").renameTo(...)` | no | `BotListener.defaultOnGuildUpdateNameAction` | accurate |
| 288 | `"game services/dota2/patch notes"` service name | no | `GameStatsCommand.createPatchNotesService`, `ServicePacketReader.setDocument` (`services/$pathName.xml`) | accurate |
| 308 | "`key.txt` should never be committed" | no | | accurate |

The README never mentions `res/` or `logs/`. A person cloning the rewritten repository must supply locally: `key.txt`
(the token; without it `Bot.initializeBotExistence` prints a stack trace and `keys[0]` stays null), `BotData.xml` (state;
`BaseXMLReader.setDocument` logs "Could not find file" and creates nothing), `WebParseKeys.xml` (scraping markers for the
online commands, read by `SourceKeyParser`), the `services/game services/*.xml` polling-state files (read through
`ServicePacketReader`), and a `res/` directory (`OnlineAction.sendImageInChannel` saves `res/temp.png`). `guildData/`
and `logs/` are created at run time (`KotGDP.createGuildDatabase`, logback's `./logs`). The parent research asked for
"the removal of `key.txt` loading from the README"; the code still loads the file, so the accurate change is the
smaller one in the table.

### 3.F Parent statements that change when no Support ticket is filed and the data sits in an ordinary local folder

Line numbers are those of the planning branch at the time of reading.

| Where | Statement (quoted briefly) | Replace with |
|---|---|---|
| `architecture.md` section 1.3, bullet 1 (line 174) | "once its exit tests pass again following any GitHub Support ticket" | "once its exit tests pass" |
| `architecture.md` section 1.4, criterion 6 (line 200) | "passes the rewrite's exit criterion (§11)" | the criterion of section 11 as revised below, with the pull-request residual reported |
| `architecture.md` section 11, step 1 (lines 1494, 1495) | "to an access-restricted location" | "to an ordinary local folder outside every repository" |
| section 11, steps 2 and 4 (lines 1496 to 1507) | "following any Support ticket"; "a GitHub Support ticket where the exposure argument applies (GKB2, GKB, KotlinBottools)" | delete the ticket clauses |
| section 11, exit criterion (lines 1512 to 1515) | "no pull-request ref reaches a purged blob" | "no branch or tag reaches a purged blob; the blobs still reachable through GKB2's and BotTools' pull-request refs are counted and reported" |
| section 14, unit 0 (line 1602) | "made public once its exit tests pass again after any Support ticket" | "after its exit tests pass" |
| section 15, row "GitHub Support's handling of pull-request refs and cached views" (line 1661) | "the ticket is argued on personal data, not dead tokens" | the pull-request refs and cached views remain; the residual is measured and stated; delete-and-recreate stays an option only for KotlinBottools |
| section 15, row "The old data copies hold personal data" (line 1669) | "copies are access-restricted, read once, and deleted after the report is checked" | "copies sit in a local folder outside every repository, are read once, and are deleted after the report is checked" |
| section 16, "GitHub Support" (lines 1759, 1760) | the outcome of a request "cannot be known in advance" | no request is made; the stated residual replaces the gap |
| `roadmap.md` Phase 0 scope (lines 271, 272) | "goes to an access-restricted location" | "ordinary local folder outside every repository" |
| roadmap Phase 0 (lines 280 to 283) | "Ask GitHub Support" | delete the bullet; add "measure and report what the pull-request refs and cached views keep" |
| roadmap Phase 0 (line 288) and "Done when" (lines 300, 301) | "after any Support ticket"; "on a fresh mirror with pull-request refs fetched" | no ticket clause; the exit criterion for branches and tags, plus the reported residual |
| `roadmap.md` line 16 | "off `main` @ <a pre-rewrite id>" | "off `main` before Phase 0 (2026-10-20)" |
| `impact.md` section 2.1 (lines 84 to 87) | "both left to GitHub Support" | "both remain on GitHub" |
| `impact.md` section 2.4 (line 175) | "The copies are kept access-restricted" | "kept in a local folder outside every repository" |
| `impact.md` section 3.1, item 4 (lines 227 to 231) | "the access-restricted location ...; the GitHub Support tickets" | "the local folder for the legacy data copies"; delete the tickets |
| parent `research/README.md` (lines 1608 to 1610, 1648 to 1661, 1680 to 1684, 1939, 1940) | "kept access-restricted"; "a Support ticket where one applies"; "no pull-request ref reaches a purged blob"; the Support gap | the same replacements |
| parent `research/bot-repository-history-purge.md`, bottom line and sections 3.3, 6.1, 6.3 steps 2 and 8, 6.5 | the Support ticket, "encrypted or access-restricted", the pruned counts (1, 2, 1, 1, 1) | rewrite in place: ticket removed, counts 2, 2, 2, 1, 2 and 1 for Support |
| issue #1 body (line 58) | "no secret file remains anywhere in the history of any bot-related repository" | "...in any branch or tag"; old objects stay retrievable by id and through three pull-request refs |
| issue #2 body (lines 14, 15, 23 to 26, 31, 42 to 44) | "access-restricted location"; "Ask GitHub Support"; "after any Support ticket"; "fresh mirror with pull-request refs fetched" | as in the roadmap rows above |
| issue #2 body (line 5) | "written in `docs/plans/1-bottools-consolidation/0-<slug>/`" | "`2-<slug>/`" (the folder is `2-phase-0-history-rewrite`) |
| issues #3 to #19 bodies (line 5 each) | the plan folder named by the phase number (`1-<slug>` for #3, `2-` for #4, `3-` for #5, `4-` for #6, `5-` for #7, `6a-` for #8, `6b-` for #9, `7-` through `12-` for #10 to #15, `17-` for #16, `18-` for #17, `19-` for #18, `23-` for #19) | the issue number: `3-<slug>/` through `19-<slug>/` |

The first column's file names are paths below `docs/plans/1-bottools-consolidation/`.

### 3.G Adoption sweep across the organisation

- **Default-branch trees (observed).** `gh api repos/<org>/<repo>/git/trees/HEAD?recursive=1` over the other 12
  repositories (`SpartanLaboratories`: WebTools, `.github`, GeneralTools, MagicBot, SpartanGraphics, SpartanUI,
  OrganizationPage; `SpartanLabsGaming`: MyGameTools, MyGameServer, MyGameClient, `.github`, RivenFell) found no file
  named `key.txt`, `keys.txt`, `key.pem`, `BotData.xml` or `WebParseKeys.xml`, and no `guildData` directory (no tree was
  truncated). Code search (`gh api "search/code?q=filename:<name>+org:<org>"`) lists only KotlinBottools for `key.txt`,
  KotlinBottools and GKB2 for `BotData.xml` and `WebParseKeys.xml`, KotlinBottools alone for `path:guildData` (29 hits)
  and nothing in `SpartanLabsGaming`. It misses GKB and TrumpBot, which hold those files, because GitHub's code search
  covers only the default branch of repositories it has indexed ("We currently only support searching for code on the
  default branch of a repository") and returned HTTP 403 rate-limit errors during the sweep, so the tree scan is the
  authoritative result. Nothing outside the six repositories
  tracks a purged name; there are no follow-ups to file. Non-default branches of the other repositories were not scanned.
- **MagicBot's `.gitleaks.toml` (observed, read at `main`).** Three rules: `discord-bot-token`, `bare-token-file`
  (`(key|token|bot[-_]?token|discord[-_]?token)\.txt`, which does not cover `keys.txt`) and `legacy-bot-data-file`
  (`BotData.xml`, `guildData/*.xml`, `WebParseKeys.xml`). One global `[allowlist]` with `paths = ['^README\.md$',
  '^\.gitleaks\.toml$', '^docs/.*\.md$']`. The gap the sibling findings report is confirmed: the global allowlist
  switches off every rule, the default ones included, for those paths; and there is no rule for `keys.txt`, `key.pem`,
  `logs/` or `services/`. MagicBot has three files today (`.gitleaks.toml`, `LICENSE`, `README.md`), secret scanning
  and push protection on, so nothing is exposed yet; the fix belongs to MagicBot's first commit of documents.

## 4. How comparable practice does it

- **Verify against an expected post-state, not against "no error".** filter-repo's own manual recommends re-running
  `--analyze` after filtering "to verify the changes look correct", and exits 0 when nothing matched (sibling findings,
  `git-filter-repo-on-windows.md` section 3.4), so a purge is checked by counts the tool does not produce: commits,
  distinct surviving paths, blobs, largest blob. Here three derivations agree before the run, which makes the table a
  real oracle rather than a copy of the tool's output.
- **Scan history and issue text, not the tip.** Open-sourcing checklists consistently ask for the history to be searched,
  not just the working tree ("It is important to go through commit history and the code to make sure there are no
  'secrets'") and advise that fully removing a history that carried sensitive content means a fresh repository ("To
  completely delete the history including Pull Requests it is necessary to create a fresh repository"); that is one
  practitioner's blog, consistent with GitHub's documentation and the BFG author's 2014 reply cited in the sibling
  findings.
- **Name masking in the report.** gitleaks' `--redact` is the same idea for secrets (sibling findings); the gate here
  applies it to personal names, with a stable index so a reviewer can tell one word from another.

## 5. Pitfalls and regrets

1. **Counting pruned commits by the non-merge rule.** It undercounts by three merges across the six repositories (A.2).
2. **Typing KotlinBottools' expectations once.** Its commit, path and blob counts change with every planning commit;
   derive them at rewrite time from the backup mirror (6.1).
3. **Reading the gate's raw hit count as failure or as success.** 415 of 415 raw name hits are three ordinary words; a
   gate with no allow-list never passes, and an allow-list entry that is a real name hides a leak. The allow-list is a
   reviewed, written file (6.3).
4. **Name lists built from `tName` only.** Member entries also carry game ids and other text (the member files hold about
   1,100 further text values and the other XML kinds carry channel and role strings); those are not in the lists
   (Known gaps).
5. **Exact-case, whole-word matching misses display names that the bot stored stripped of punctuation** (the bot stored
   `tName` as letters and digits only), and matches ordinary words that happen to be names.
6. **Fixing the ids in the tips and forgetting history.** 193 occurrences exist across versions against 154 at the tips.
7. **`cherry-pick` of the `.gitignore` commit onto the planning branch conflicts** for the same reason the merge does;
   copy the file instead.
8. **Deleting the old repository before the cross-repository links are recorded.** The 21 links with MagicBot and
   WebTools are only listed on the issues themselves; record them (6.5) before any deletion.
9. **Believing code search covers the organisation.** It missed two repositories that hold the purged names (3.G).
10. **A path printed by a tool can carry a name.** Guild names are folder names under `guildData/`, so a listing, a grep
    or a failed purge that prints a history path prints a guild name. The gate masks the paths it prints, and no tool in
    section 6 prints a history path of a data directory.

## 6. Recommendation for this repo

### 6.1 The expectation table and the exit-test script

- Use the table in 3.A.1 as the oracle for GKB2, GKB, BotTools, TrumpBot and Support, provided nothing was pushed to them
  since 2026-10-21. For KotlinBottools use the rules `after = T - 2`, `C = T`, and derive paths, blobs and the largest
  blob at rewrite time from the untouched backup mirror with the sibling classifier (`blobs_kept`) and a small count of
  distinct kept paths.
- Confirm each row three ways before the push: (1) the classifier on the backup mirror (`blobs_total`, `blobs_kept`,
  `blobs_shared`, `manifest`); (2) the filter-repo log (`You rewrote C (of T)`, `commit-map` zero rows `= P`,
  `first-changed-commits`, `changed-refs`); (3) `expect_check.py` on the rewritten mirror. Rehearse the whole run on
  `cp -a` of the backup mirror first: its counts must equal the table.
- Thresholds: `--max-blob 1048576` for KotlinBottools (documents grow), `--max-blob 100000` for the others (the
  largest purged blob is 1.1 to 41 MiB, the largest survivor 60,756 bytes).

```python
"""expect_check.py -- compare a rewritten mirror with its expectation row. Prints counts and PASS/FAIL only.

usage: python -I expect_check.py GIT_DIR --branch-commits N [--all-commits N] --paths N --blobs N --max-blob BYTES
                                 [--wrapper-jar yes|no] [--scope all|heads]

--branch-commits  commits reachable from refs/heads/* and refs/tags/*   (git rev-list --branches --tags --count)
--all-commits     commits reachable from every ref, refs/pull/* included (fresh clone of the server after the push)
--paths / --blobs distinct paths / distinct blob ids over every commit tree of the scope
--scope           all (default): every ref; heads: refs/heads/* and refs/tags/* only (use it on a fresh clone of a
                  server that still serves unrewritten refs/pull/*)
--max-blob        the largest blob over every commit tree must not exceed this many bytes
Also checks: no surviving binary extension except gradle/wrapper/gradle-wrapper.jar, no credential-like name,
no name `git fast-import` would reject on Windows. Paths are never printed.
"""
import argparse, re, subprocess, sys

def git(gd, *a):
    r = subprocess.run(["git", "--git-dir", gd, *a], capture_output=True)
    if r.returncode: sys.exit("STOP: git %s failed (status %d)" % (a[0], r.returncode))
    return r.stdout

ap = argparse.ArgumentParser()
ap.add_argument("gd"); ap.add_argument("--branch-commits", type=int, required=True); ap.add_argument("--all-commits", type=int)
ap.add_argument("--paths", type=int, required=True); ap.add_argument("--blobs", type=int, required=True)
ap.add_argument("--max-blob", type=int, required=True); ap.add_argument("--wrapper-jar", choices=("yes", "no"))
ap.add_argument("--scope", choices=("all", "heads"), default="all")
a = ap.parse_args()
fails = 0
def check(name, got, want, op="=="):
    global fails
    ok = {"==": got == want, "<=": got <= want}[op]
    print("%-44s got=%-8s want %s %-8s %s" % (name, got, op, want, "PASS" if ok else "FAIL")); fails += 0 if ok else 1
check("commits on branches and tags", int(git(a.gd, "rev-list", "--branches", "--tags", "--count")), a.branch_commits)
if a.all_commits is not None:
    check("commits on every ref (pull refs included)", int(git(a.gd, "rev-list", "--all", "--count")), a.all_commits)
sel = ["--all"] if a.scope == "all" else ["--branches", "--tags"]
trees = sorted(set(git(a.gd, "rev-list", *sel, "--no-commit-header", "--format=%T").split()))
paths, blobs, biggest = set(), set(), 0
for t in trees:
    for rec in git(a.gd, "ls-tree", "-r", "-z", "-l", t.decode()).split(bytes([0])):
        if not rec: continue
        meta, p = rec.split(b"\t", 1); mode, typ, oid, size = meta.split()
        if typ != b"blob": check("only blobs in trees", 0, 1); continue
        paths.add(p); blobs.add(oid); biggest = max(biggest, int(size))
check("distinct paths over the scope's trees", len(paths), a.paths)
check("distinct blobs over the scope's trees", len(blobs), a.blobs)
check("largest blob (bytes)", biggest, a.max_blob, "<=")
BIN = set(".jar .exe .dll .so .dylib .class .png .jpg .jpeg .gif .ico .bmp .zip .7z .gz .tar .dat .idx .db .sqlite .bin .pdf .mp3 .wav .ogg .mp4".split())
names = [p.decode("utf-8", "replace") for p in paths]
bins = [p for p in names if "." in p.rsplit("/", 1)[-1] and "." + p.rsplit(".", 1)[-1].lower() in BIN and p != "gradle/wrapper/gradle-wrapper.jar"]
check("binary files other than the wrapper jar", len(bins), 0)
if a.wrapper_jar:
    check("gradle wrapper jar present", int("gradle/wrapper/gradle-wrapper.jar" in names), int(a.wrapper_jar == "yes"))
cred = re.compile(r"(?i)(token|secret|passw|credential|cookie|apikey|api_key|\.env$|\.pem$|\.key$|\.p12$|\.pfx$|\.jks$|id_rsa|\.keystore$)")
check("credential-like names", sum(1 for p in names if cred.search(p)), 0)
dev = re.compile(r"^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$", re.I)
bad = [p for p in names if re.search(r'[:*?"<>|\\]', p) or any(c.endswith((".", " ")) or dev.match(c) for c in p.split("/"))]
check("names Windows git would reject", len(bad), 0)
print("RESULT:", "FAIL (%d)" % fails if fails else "PASS")
sys.exit(1 if fails else 0)
```

Invocations (the numbers are the table's). On the rewritten mirror before the push use the first form; on a fresh mirror
taken after the push add `--scope heads` (so the unrewritten `refs/pull/*` trees are not counted as survivors) and
`--all-commits`:

```bash
python -I expect_check.py GKB2.git      --branch-commits 30 --paths 82 --blobs 211 --max-blob 100000 --wrapper-jar yes
python -I expect_check.py GKB2.git      --scope heads --branch-commits 30 --all-commits 45 --paths 82 --blobs 211 --max-blob 100000 --wrapper-jar yes   # fresh
python -I expect_check.py GKB.git       --branch-commits 9  --paths 60 --blobs 113 --max-blob 100000 --wrapper-jar yes
python -I expect_check.py BotTools.git  --scope heads --branch-commits 15 --all-commits 28 --paths 82 --blobs 145 --max-blob 100000 --wrapper-jar no   # fresh
python -I expect_check.py TrumpBot.git  --branch-commits 9  --paths 56 --blobs 106 --max-blob 100000 --wrapper-jar no
python -I expect_check.py Support.git   --branch-commits 1  --paths 29 --blobs 29  --max-blob 100000 --wrapper-jar no
python -I expect_check.py KotlinBottools.git --branch-commits $((T-2)) --paths <kept paths> --blobs <blobs_kept> --max-blob 1048576 --wrapper-jar yes
```

The script passed on all six rewritten stand-ins and on simulated fresh mirrors of GKB2 and BotTools (rewritten branches
beside the unrewritten pull refs), and failed with the right counts on an unrewritten Support stand-in (5 failed checks)
and on a deliberately wrong expectation. Over every ref of those fresh mirrors the blob counts are 281 and 184
(`git rev-list --objects --all`), which is the residual the report states.

### 6.2 Pre-rewrite ids in documents

Replace every one of the 154 tokens (16 files, 55 commits) by the commit's subject and date (the form the planning
README already uses), or by the rule that defines a baseline ("`main` before Phase 0, 2026-10-20", "the parent of the
commit that deletes `guildData/`"). Rewriting from `commit-map` is rejected: ten commits have no new id, the new ids
would again be citations to a state that GitHub keeps beside the old one, and a document would depend on the order in
which the repositories were pushed. Leaving them is rejected: for KotlinBottools they are lookup keys to objects that hold
the purged data. Do it in one `docs(plans):` commit on the planning branch before the rewrite, then check with
`oldid_refs.py` (6.4): the tips must report 0. The older document versions that history keeps still hold the ids
(Considerations, C1).

### 6.3 The privacy gate

Run it after the final document edits, on the rewritten mirror, and again immediately before the visibility change with
freshly downloaded issue texts; it exits 1 on any blocking hit. Inputs: the legacy data copy (`--legacy`), the rewritten
mirrors (`--repo`, one per repository; the five others' commit messages are read from their mirrors), the issue and
comment dumps, and the new documents. Build the allow-list file after a first run by reading the masked lines: one lower-case
word per line for each ordinary word or repository name, and public constants (the Steam64 offset). A hit on anything
else is a stop.

```bash
gh issue list -R SpartanLaboratories/KotlinBottools --state all --limit 500 --json number,title,body,state,labels,milestone,author > "$GATE/issues.json"
gh api "repos/SpartanLaboratories/KotlinBottools/issues/comments?per_page=100" --paginate --slurp > "$GATE/comments.json"
gh api "repos/SpartanLaboratories/KotlinBottools/pulls?state=all" --jq length        # 0 (a non-zero count: dump their bodies and comments too)
python -I privacy_gate.py --legacy "%USERPROFILE%/BotLegacyData" --allow "$GATE/allow.txt" \
    --repo "$WS/KotlinBottools.git" --repo "$WS/GKB2.git" --repo "$WS/GKB.git" --repo "$WS/BotTools.git" \
    --repo "$WS/TrumpBot.git" --repo "$WS/Support.git" --json "$GATE/issues.json" --json "$GATE/comments.json"
# expect: "GATE: 0 blocking hit(s)", exit status 0
```

(Scanning the other five mirrors also covers their file contents; the three that are public were public before, and
their kept files are source.) For the planning-branch documents of the day add `--file` on the working tree, and run the
gate once on this very findings file.

```python
"""privacy_gate.py -- pre-publication check for personal data in everything that becomes public.

usage: python -I privacy_gate.py --legacy LEGACY_DIR [--allow FILE] [--repo GIT_DIR[::PURGE_LIST]]...
                                 [--json FILE]... [--file PATH]...

--legacy  the local copy of the legacy data. Every directory named guildData anywhere below it is read:
          its sub-folder names are the guild names; the text of every <tName> element in a MemberData*.xml
          file is a member name; every 17- to 20-digit number in any of its files is a known id.
          The lists live in memory only. Nothing is written.
--repo    a git directory whose history becomes public: every distinct text blob under every commit tree
          (all refs, refs/pull/* included) plus every commit message, author and committer name and e-mail.
          The optional "::PURGE_LIST" drops root-anchored literal paths first; use it only before the
          rewrite, to scan what the rewrite leaves.
--json    a JSON dump (gh issue list --json ..., the REST comments list): every string value is scanned.
--file    a file or directory tree scanned line by line (documents).
--allow   optional file, one lower-case word or number per line: ordinary words, product names and public
          constants that the reviewer has judged not to be personal data. Hits on them are counted as
          "allowed" and do not fail the gate.
--min-len names shorter than this (default 5) are counted but never listed.

Prints counts, and for names of --min-len or more characters one summary line per name (an index, the
length, the hit count) and the first masked locations. Every match is replaced by <NAME#n>, <GUILD#n> or
<ID>. Never prints a name, a guild name or an id. Exit status 1 when a hit that is not allowed exists.
"""
import argparse, collections, json, os, re, subprocess, sys
import xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

MINLEN = 5
ID = re.compile(r"(?<!\d)\d{17,20}(?!\d)")
NUL = bytes([0])

def git(gd, *args, inp=None):
    r = subprocess.run(["git", "-C", gd, *args], capture_output=True, input=inp)
    if r.returncode:
        sys.exit("STOP: git %s failed (status %d)" % (args[0], r.returncode))
    return r.stdout

def load_legacy(root):
    guilds, members, ids = set(), set(), set()
    for dp, dn, fn in os.walk(root):
        parts = dp.replace("\\", "/").split("/")
        if parts[-1] == "guildData":
            guilds.update(dn)
        if "guildData" not in parts:
            continue
        for f in fn:
            data = open(os.path.join(dp, f), "rb").read()
            ids.update(ID.findall(data.decode("utf-8", "replace")))
            if f.lower().startswith("memberdata"):
                try:
                    for el in ET.fromstring(data).iter("tName"):
                        if el.text and el.text.strip():
                            members.add(el.text.strip())
                except ET.ParseError:
                    sys.exit("STOP: one member file does not parse")
    return guilds, members, ids

def alt(names):
    if not names:
        return None
    ordered = sorted(names, key=len, reverse=True)
    return re.compile(r"(?<!\w)(?:%s)(?!\w)" % "|".join(re.escape(n) for n in ordered), re.I)

class Gate:
    def __init__(self, guilds, members, ids, allow=()):
        self.allow, self.known = set(allow), ids
        self.members, self.guilds = sorted(members, key=str.lower), sorted(guilds, key=str.lower)
        self.idx = {("m", n.lower()): i for i, n in enumerate(self.members)}
        self.idx.update({("g", n.lower()): i for i, n in enumerate(self.guilds)})
        self.rx = [(alt({m for m in members if len(m) >= MINLEN}), "m", "member>=min"), (alt({m for m in members if len(m) < MINLEN}), "m", "member<min"),
                   (alt({g for g in guilds if len(g) >= MINLEN}), "g", "guild>=min"), (alt({g for g in guilds if len(g) < MINLEN}), "g", "guild<min")]
        self.counts = collections.defaultdict(collections.Counter)             # corpus -> category -> n
        self.per_name = collections.defaultdict(lambda: [0, set(), {}])        # (kind, idx) -> hits, files, {corpus: first masked lines}
        self.id_lines = []
    def mask(self, s):
        for rx, kind, _ in self.rx:
            if rx:
                s = rx.sub(lambda m, k=kind: "<%s#%d>" % ("NAME" if k == "m" else "GUILD", self.idx[(k, m.group(0).lower())]), s)
        return ID.sub("<ID>", s)
    def scan_line(self, corpus, where, line):
        masked = None; shown = self.mask(where)      # a path can carry a name too
        for rx, kind, cat in self.rx:
            if not rx: continue
            for m in rx.finditer(line):
                if m.group(0).lower() in self.allow:
                    self.counts[corpus]["allowed-name-hits"] += 1; continue
                self.counts[corpus][cat] += 1
                if cat.endswith(">=min"):
                    masked = masked or self.mask(line.strip())[:110]
                    rec = self.per_name[(kind, self.idx[(kind, m.group(0).lower())])]
                    rec[0] += 1; rec[1].add(corpus + " " + where.rsplit(":", 1)[0])
                    lines = rec[2].setdefault(corpus, [])
                    if len(lines) < 2 and shown not in [w for w, _ in lines]: lines.append((shown, masked))
        for m in ID.finditer(line):
            if m.group(0) in self.allow:
                self.counts[corpus]["allowed-id-hits"] += 1; continue
            near_hex = bool(re.match(r"[A-Fa-f]", line[m.end():m.end() + 1])) or bool(re.match(r"[A-Fa-f]", line[max(0, m.start() - 1):m.start()]))
            self.counts[corpus]["id17-20"] += 1
            self.counts[corpus]["id-next-to-hex-letter" if near_hex else "id-standalone"] += 1
            self.counts[corpus]["id-found-in-legacy-data"] += m.group(0) in self.known
            self.id_lines.append("%s | %s | %s" % (corpus, shown, (masked or self.mask(line.strip()))[:110]))
    def scan_text(self, corpus, where, text):
        for n, line in enumerate(text.splitlines(), 1):
            self.scan_line(corpus, "%s:%d" % (where, n), line)

def matches(path, entry):
    n = len(entry)
    return path.startswith(entry) and (entry[n-1:n] == "/" or len(path) == n or path[n:n+1] == "/")

def scan_repo(g, spec):
    gd, _, ex = spec.partition("::")
    excl = [l.strip() for l in open(ex).read().splitlines() if l.strip() and not l.startswith("#")] if ex else []
    name = os.path.basename(os.path.normpath(gd))
    fmt = "%H%x00%an%x00%ae%x00%cn%x00%ce%x00%B%x01"
    nc = 0
    for rec in git(gd, "log", "--all", "--format=" + fmt).decode("utf-8", "replace").split("\x01"):
        rec = rec.strip("\n")
        if not rec: continue
        h, an, ae, cn, ce, msg = rec.split("\x00", 5); nc += 1
        g.scan_text(name + " commit-messages", "commit#%d" % nc, msg)
        g.scan_text(name + " commit-identities", "commit#%d" % nc, "\n".join((an, ae, cn, ce)))
    trees = sorted(set(git(gd, "rev-list", "--all", "--no-commit-header", "--format=%T").split()))
    blobs = {}
    for t in trees:
        for rec in git(gd, "ls-tree", "-r", "-z", t.decode()).split(NUL):
            if not rec: continue
            meta, path = rec.split(b"\t", 1); p = path.decode("utf-8", "replace")
            mode, typ, oid = meta.split(b" ")
            if typ == b"blob" and not any(matches(p, e) for e in excl):
                blobs.setdefault(oid, p)
    order = sorted(blobs.items(), key=lambda kv: kv[1])
    raw = git(gd, "cat-file", "--batch", inp=b"".join(o + b"\n" for o, _ in order))
    pos = 0
    for oid, p in order:
        eol = raw.index(b"\n", pos); size = int(raw[pos:eol].split()[2])
        data = raw[eol + 1:eol + 1 + size]; pos = eol + 1 + size + 1
        if NUL in data[:8000]:
            g.counts[name + " files"]["binary-skipped"] += 1; continue
        g.counts[name + " files"]["text-blobs"] += 1
        g.scan_text(name + " files", p, data.decode("utf-8", "replace"))
    g.counts[name + " files"]["commits"] = nc

def walk_json(g, corpus, node, where, num=None):
    if isinstance(node, dict):
        n = node.get("number", num)
        if "issue_url" in node: n = node["issue_url"].rsplit("/", 1)[-1]
        for k, v in node.items(): walk_json(g, corpus, v, "%s.%s" % (where, k) if where else k, n)
    elif isinstance(node, list):
        for v in node: walk_json(g, corpus, v, where, num)
    elif isinstance(node, str):
        g.scan_text(corpus, "item#%s %s" % (num, where), node)

def main():
    global MINLEN
    ap = argparse.ArgumentParser()
    ap.add_argument("--legacy", required=True); ap.add_argument("--allow"); ap.add_argument("--min-len", type=int, default=5)
    ap.add_argument("--repo", action="append", default=[]); ap.add_argument("--json", action="append", default=[]); ap.add_argument("--file", action="append", default=[])
    a = ap.parse_args(); MINLEN = a.min_len
    guilds, members, ids = load_legacy(a.legacy)
    print("lists: guild folders=%d (shorter than %d: %d), member names=%d (shorter: %d), known ids=%d" % (
        len(guilds), MINLEN, sum(len(x) < MINLEN for x in guilds), len(members), sum(len(x) < MINLEN for x in members), len(ids)))
    allow = {l.strip().lower() for l in open(a.allow, encoding="utf-8")} - {""} if a.allow else set()
    g = Gate(guilds, members, ids, allow)
    for r in a.repo: scan_repo(g, r)
    for j in a.json: walk_json(g, os.path.basename(j), json.load(open(j, encoding="utf-8")), "")
    for f in a.file:
        paths = [f] if os.path.isfile(f) else [os.path.join(dp, x) for dp, dn, fn in os.walk(f) for x in fn]
        for p in paths:
            data = open(p, "rb").read()
            if NUL not in data[:8000]:
                g.scan_text("files:" + os.path.basename(os.path.normpath(f)), os.path.relpath(p, os.path.dirname(os.path.abspath(f))).replace("\\", "/"), data.decode("utf-8", "replace"))
    total = 0
    for c in sorted(g.counts):
        print("%-34s %s" % (c, dict(g.counts[c])))
        total += sum(v for k, v in g.counts[c].items() if k in ("member>=min", "guild>=min", "id-standalone"))
    print("names of %d or more characters with hits that are not allowed (index, length, hits, distinct files):" % MINLEN)
    for (kind, i), (n, files, first) in sorted(g.per_name.items(), key=lambda kv: -kv[1][0]):
        nm = (g.members if kind == "m" else g.guilds)[i]
        print("  %s#%d len=%d hits=%d files=%d" % ("NAME" if kind == "m" else "GUILD", i, len(nm), n, len(files)))
        for corpus, lines in first.items():
            for where, line in lines: print("      %s | %s | %s" % (corpus, where, line))
    print("id-shaped numbers that are not allowed (masked):")
    for l in dict.fromkeys(g.id_lines): print("  ", l)
    print("GATE: %d blocking hit(s)" % total)
    sys.exit(1 if total else 0)
main()
```

### 6.4 The id-reference check

```python
"""oldid_refs.py -- count 7..40-digit hexadecimal tokens that resolve to a pre-rewrite commit. Never prints an id.

usage: python -I oldid_refs.py --ids FILE... [--file PATH]... [--json FILE]...

--ids   a commit-map (first column) or any file of commit ids, one per line; all six repositories' files may be given.
--file  a file or directory tree (documents). --json a JSON dump of issues or comments (every string value).
Prints, per file or per issue, the number of resolving tokens and the nearest preceding Markdown heading.
Exit status 1 when any token resolves.
"""
import argparse, collections, json, os, re, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
TOK = re.compile(r"(?<![0-9A-Za-z])[0-9a-f]{7,40}(?![0-9A-Za-z])")
HEAD = re.compile(r"^\s{0,3}#{1,6}\s+(.*)$")
ap = argparse.ArgumentParser()
ap.add_argument("--ids", nargs="+", required=True); ap.add_argument("--file", action="append", default=[]); ap.add_argument("--json", action="append", default=[])
a = ap.parse_args()
ids = set()
for f in a.ids:
    for line in open(f, encoding="utf-8", errors="replace"):
        w = line.split()
        if w and re.fullmatch(r"[0-9a-f]{40}", w[0]) and not re.fullmatch(r"0{40}", w[0]): ids.add(w[0])
if not ids: sys.exit("STOP: no commit ids loaded")
ordered = sorted(ids)
import bisect
def resolves(t):
    i = bisect.bisect_left(ordered, t)
    return i < len(ordered) and ordered[i].startswith(t)
locs = collections.Counter()
def scan(label, text):
    section = ""
    for line in text.splitlines():
        h = HEAD.match(line)
        if h: section = h.group(1).strip()[:50]
        for m in TOK.finditer(line):
            if resolves(m.group(0)): locs[(label, section)] += 1
for f in a.file:
    paths = [f] if os.path.isfile(f) else [os.path.join(dp, x) for dp, dn, fn in os.walk(f) for x in fn]
    for p in paths:
        data = open(p, "rb").read()
        if bytes([0]) not in data[:8000]: scan(os.path.relpath(p, os.path.dirname(os.path.abspath(f))).replace("\\", "/"), data.decode("utf-8", "replace"))
def walk(node, label):
    if isinstance(node, dict):
        lab = "issue #%s" % node["number"] if "number" in node else label
        for v in node.values(): walk(v, lab)
    elif isinstance(node, list):
        for v in node: walk(v, label)
    elif isinstance(node, str): scan(label, node)
for j in a.json: walk(json.load(open(j, encoding="utf-8")), os.path.basename(j))
for (label, section), n in sorted(locs.items(), key=lambda kv: (-kv[1], kv[0])): print("%4d  %s | %s" % (n, label, section))
print("TOTAL: %d resolving token(s) in %d file/issue location(s); %d commit ids loaded" % (sum(locs.values()), len({l for l, _ in locs}), len(ids)))
sys.exit(1 if locs else 0)
```

Invocation: `python -I oldid_refs.py --ids "$OUT"/*/commit-map --file docs --json issues.json --json comments.json` with `docs` the
working tree of the rewritten planning branch; before the rewrite, give it the ids of the backup mirrors. It reported
154 tokens in 16 files on the planning branch today and 0 in the issues.

### 6.5 If KotlinBottools gets a fresh repository under the same name

Not decided here (sibling findings, C1). The cost in references is section 3.D. Before any deletion, dump to the local
outputs folder: the 36 + 18 in-repository links and the 21 cross-repository links as `(issue, relation, other issue)`
rows from the GraphQL query used in 3.D; the milestone and the three custom labels. In the new repository create the
milestone `1.0.0` (no due date) and the labels first, transfer #1 to #19 in numeric order one at a time, check each
returned number equals its source number, then re-create dropped links with `addSubIssue` and `addBlockedBy`. Rehearse
on two throwaway private repositories first (Known gaps).

### 6.6 `.gitignore` and README

- **`.gitignore`.** Land the root-anchored file on `main` through its own pull request. On the rewritten planning branch
  run `git checkout origin/main -- .gitignore`, commit "chore: align .gitignore with main", and check
  `git rev-parse origin/main:.gitignore` equals `git rev-parse HEAD:.gitignore` before opening the planning pull
  request. The merge is then clean in either order. The alternative with no extra commit is to let the planning pull
  request carry the file and not to change `main` separately; the roadmap lists the file as its own step, so the first is
  recommended. `.gitattributes` (`* text=auto`) and `core.autocrlf=true` do not change blob bytes if the file is
  written with LF; the blob-id check proves it.
- **README (proportional).** Edit only what is false: lines 233 to 235 and 261 to 265 (mark `key.txt`, `BotData.xml`,
  `WebParseKeys.xml` as local and untracked, and `guildData/` as created at run time), and add one short list of the
  files a clone must supply (the five in 3.E) next to the `key.txt` instruction at lines 69 to 75, which stays. Leave line
  257, 37, 164, 189, 278 to 279, 288 and 308 as they are. Phase 1 replaces the README with a stub, so no further edit is
  proportional.

### 6.7 Documents and texts this phase adjusts

The rows of 3.F, in one `docs(plans):` commit on the planning branch together with the id replacements (6.2), plus
three issue-text edits (#1 line 58, #2 body, and line 5 of #3 to #19). Documents of this folder state the settled
conditions as design, not as a change.

## 7. Load-bearing claims

1. **Merge commits can be pruned when they become degenerate.** "Since merge commits are needed for history topology,
   they are typically exempt from pruning. However, they can become degenerate with the pruning of other commits (having
   fewer than two parents, having one commit serve as both parents, or having one parent as the ancestor of the other.)
   If such merge commits have no file changes, they can be pruned. The default ('auto') is to only prune empty merge
   commits which become degenerate (not which started as such)." Source: git-filter-repo manual, `--prune-degenerate`,
   https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/Documentation/git-filter-repo.txt (tag v2.47.0; read
   2026-10-21).
2. **Non-merge commits that become empty are pruned.** "'auto' (the default) means only prune commits which become
   empty (not commits which were empty in the original repo, unless their parent was pruned)." Same source, `--prune-empty`.
3. **Re-running `--analyze` to verify.** "It can also be useful to re-run --analyze after filtering to verify the changes
   look correct." Same source, DISCUSSION.
4. **A merge conflicts when both sides change a common segment.** "A conflict occurs if both `<current>` and `<other>`
   have changes in a common segment of lines." Source: `Documentation/git-merge-file.adoc` at tag v2.55.0,
   https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-merge-file.adoc (read 2026-10-21). The identical-change
   and net-zero cases are observed (3.E), not quoted.
5. **`git merge-tree` has a non-writing trivial mode.** "'git merge-tree' [--trivial-merge] <base-tree> <branch1> <branch2>
   (deprecated)". Source: `Documentation/git-merge-tree.adoc` at v2.55.0, SYNOPSIS (read 2026-10-21); git 2.55.0.windows.5
   ran it here.
6. **What an issue transfer keeps.** "When you transfer an issue, comments and assignees are retained. Labels and milestones
   are also retained if they're present in the target repository, with labels matching by name and milestones matching by both
   name and due date." and "The original URL redirects to the new issue's URL." and "A private repository issue cannot be
   transferred to a public repository." Source: GitHub Docs, "Transferring an issue to another repository",
   https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository
   (source file in `github/docs` at `main`, read 2026-10-21). The page does not mention issue numbers, sub-issues or
   blocked-by links.
7. **GraphQL can create labels on transfer and re-create links.** `TransferIssueInput.createLabelsIfMissing`: "Whether to
   create labels if they don't exist in the target repository (matched by name)"; mutations `addSubIssue`, `addBlockedBy`
   and `transferIssue` listed. Source: `gh api graphql` introspection of `TransferIssueInput` and `Mutation`, GitHub
   GraphQL API, 2026-10-21 (gh 2.100.0).
8. **Code search covers only default branches.** "We currently only support searching for code on the default branch of a
   repository." Source: GitHub Docs, "About GitHub Code Search", https://docs.github.com/en/search-github/github-code-search/about-github-code-search
   (`github/docs` at `main`, read 2026-10-21). The code-search REST endpoint "requires you to authenticate and limits
   you to 10 requests per minute" (GitHub Docs, REST "Search", same date; observed: HTTP 403 rate-limit responses during
   the sweep).
9. **A history cannot be made to forget pull requests without a fresh repository (one practitioner).** "To completely
   delete the history including Pull Requests it is necessary to create a fresh repository." Source: OmbuLabs, "How to
   Open Source a Private Project", https://ombulabs.ai/blog/open-source/open-sourcing-a-private-project.html (read
   2026-10-21). One source's opinion; consistent with the sibling findings' GitHub documentation and the BFG author's
   2014 reply.

Facts about these repositories (counts, tables, quoted lines of their files) are observations with the commands given in
the findings; they are not listed here.

## 8. Known gaps

- **The stand-in repositories reproduce commit graphs, trees, modes and blob identity, not commit metadata, encodings,
  signatures, notes or object formats.** The pruned-commit and survivor numbers depend only on the graph and the trees, and
  three derivations agree, but the exit test on the real mirror is the final check; rehearse on a copy of the backup mirror
  first.
- **Expectations assume nothing is pushed to the five static repositories before their rewrite** and that the API's view
  (read 2026-10-21) equals the mirror's. Re-derive with the classifier from the backup mirror.
- **Sizes of surviving blobs come from the API tree entries,** not from the stand-ins.
- **The baseline name lists were built straight from the repositories** (local git for KotlinBottools and TrumpBot, API
  blobs for GKB2 and GKB); the procedure reads the local data copy instead. The sibling findings make that copy
  byte-identical to the blobs, so the lists should be equal; the first real run prints the list sizes (`lists:` line) to
  compare with the table in 3.B.
- **The name lists use only `tName`.** Other text in the member files (about 1,100 values), channel and role strings in the
  other XML kinds, playlist entries and the one extra file in each source are not lists; the gate would not catch them.
  Display names stored stripped of punctuation are matched only in their stripped form.
- **Under-5-character names are counts only (43 member and 11 guild hits).** A real short name could hide among ordinary
  tokens.
- **`PoECurrencyKeys.xml`** (GKB2 and GKB test resource) was not opened for this question; the parent research's content
  scan covers it. Confirm it is a currency table before the visibility change.
- **The `.github` repository's memory notes** (3 files citing `KotlinBottools#1`) were counted, not read for personal data.
- **Whether a transfer keeps issue numbers, comments' timestamps, sub-issue links, blocked-by links or reactions** is not
  documented and was not exercised (no mutation allowed). The transfer-in-order reading is an inference.
- **Rulesets of KotlinBottools** could not be read (HTTP 403 on a private Free repository); branch protection is off.
- **Non-default branches of the other twelve repositories** were not scanned for the purged file names; code search is
  incomplete, as the sweep shows.
- **Commit-comment and review-comment text** of KotlinBottools (none expected: 0 pull requests) was not fetched.
- **The sibling findings' open points** (what GitHub publishes at the visibility change, abbreviation behaviour in this
  repository) are not repeated.

## 9. Considerations

**C1. Old commit ids that older document versions keep.** After the 154 tokens are replaced at the tips, history still holds
39 occurrences (one more KotlinBottools commit) in the older versions of two files, and every rewritten commit of those
documents keeps its predecessors. Options: (a) accept: the activity feed already lists the old tips by id, and one old tip
yields the whole old history, so 18 ids add little; (b) rewrite those documents' history in the same filter-repo run with
`--replace-text` built from the `commit-map` ids of the previous rewrite, which changes the invocation the sibling
findings verified; (c) take the fresh-repository option of the sibling findings' C1, which makes the ids meaningless.
Recommendation: (a) now, (c) if the maintainer chooses it for the other reason.

**C2. Personal details in commit headers and documents that were never in the legacy data.** The maintainer's personal
Gmail address is in 81 header fields of KotlinBottools' commits (already public in the commits of three other
repositories) and the local Windows user name is in 17 lines of 6 files. Options: (a) leave both; (b) replace the user
name in the documents with a placeholder in the same commit as 6.2, and leave the address; (c) also map the address to the
GitHub no-reply form with `--mailmap` in the KotlinBottools run, which changes the invocation and does not touch the
three public repositories. Recommendation: (b).
