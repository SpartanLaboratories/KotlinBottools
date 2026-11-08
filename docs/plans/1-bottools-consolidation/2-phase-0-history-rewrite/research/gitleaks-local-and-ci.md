# gitleaks 8.30.1: checking the rewritten histories on Windows and guarding KotlinBottools in CI

Researched 2026-10-20 for [KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
Source of truth for tool behaviour: gitleaks at tag `v8.30.1` (`cmd/`, `detect/`, `sources/`, `config/`,
`report/`, the default `config/gitleaks.toml` and the README), read through a shallow clone in a scratch
directory. The release's Windows and Linux binaries were downloaded, checked against the checksums file, and the
Windows binary was run against throwaway repositories created for the purpose (planted fake secrets, generated
at run time). No real repository of the organisation was scanned; no tool was installed.

## 1. Question

How should gitleaks 8.30.1 check the six rewritten histories on this Windows machine (every ref of a bare
mirror, no secret value and no data path in any output, a positive control that proves the configuration would
have flagged the purged files), which configuration is used for those exit tests and committed to KotlinBottools
as `.gitleaks.toml`, and what does KotlinBottools' CI job look like (Linux runner, `contents: read`, pinned and
checksum-verified binary, full history plus working tree, public logs that name no secret and no data path)?
The answer must give concrete commands with expected output and stop conditions, a full configuration file, and
a full workflow file.

## 2. Bottom line

- **Install the release zip, not winget.** Download `gitleaks_8.30.1_windows_x64.zip` and the checksums file with
  `gh release download`, unpack into the workspace, and verify the zip by four equal values: the line in
  `gitleaks_8.30.1_checksums.txt`, the pinned constant in the runbook, the asset `digest` in the GitHub API, and
  `InstallerSha256` in the winget-pkgs manifest (an independent, reviewed channel). The release carries **no
  signature and no attestation** (`gh attestation verify` and `gh release verify` both report none), so integrity
  rests on those equal hashes; the winget package installs the same zip and changes machine state for no extra
  assurance.
- **Do not trust gitleaks' exit status or its "no leaks found" line.** At v8.30.1 `gitleaks git` exits 0 and
  prints `no leaks found` when the `git log` it runs fails or writes anything to stderr (a wrong path, a bad
  `--log-opts`, git-crypt warnings; upstream issues #1981 and #2129 are open). Every scan therefore runs through
  one wrapper (`secret_scan.py`, below) that computes the number of scannable commits from git itself and fails
  unless gitleaks scanned exactly that many, with zero `ERR`/`FTL` log lines, a parseable report and a consistent
  exit status. The wrapper prints only counts, rule ids and fixed markers.
- **Scan with explicit options, not the defaults.** Defaults (`git log -p -U0 --full-history --all
  --diff-filter=tuxdb`) already cover every ref including `refs/pull/*`, but they skip the content of merge
  commits and of pure renames. The recommended `--log-opts` add `--no-renames -m`; "branches" scans use
  `--branches --tags`, "all refs" scans use `--all`. Never use `-v`, `--log-level debug|trace` or print a report:
  `-v` prints `File:`, commit, author and e-mail, and `--redact` does **not** hide a path (it stays in `File`,
  and, for path-only findings, in `Match`).
- **Configuration: MagicBot's three rules unchanged, plus two path rules, and no allowlist.** The three rules
  (`discord-bot-token`, `bare-token-file`, `legacy-bot-data-file`) are definition-for-definition identical to
  MagicBot's; `legacy-key-file` (`keys.txt`, `key.pem`) and `legacy-state-directory` (root `logs/`, `services/`,
  `log.txt`) cover what only the older repositories held. MagicBot's global `[allowlist]` for `README.md` and
  `docs/**/*.md` is not copied: measured at 8.30.1 it hides a pasted bot token in `docs/`, and the 36 planning
  documents (1.45 MB) produce zero findings under the default rules plus these five without it.
- **A positive control comes first, in two layers.** A synthetic canary mirror (fake secrets generated at run
  time, a `refs/pull/1/head`, a merge-only secret, a pure rename) must produce exact per-rule file counts for
  both scan variants; then, per repository, the same options on the untouched pre-rewrite mirror must report the
  purged files, checked mechanically: every path rule's file count equals the independent count from
  `git log --numstat`, and each named probe (`key.txt`, `key.pem`, `BotData.xml`, `guildData/` ...) is non-zero.
  BotTools and Support hold no token or data, so for them the control can only show that the rules do not fire
  on ordinary source; their sensitivity rests on the canary.
- **CI: a separate `secret-scan.yml`** (`ubuntu-latest`, `contents: read`, `actions/checkout` v7.0.1 pinned to its
  commit with `fetch-depth: 0` and `persist-credentials: false`, the Linux x64 tarball pinned by sha256, a
  canary step, then the same wrapper over full history and over the tree). Triggers: push to `main`, pull
  requests to `main`, manual dispatch; no schedule. The log contains counts by rule id only.

## 3. Findings

Evidence tiers: **primary source** (the tool's own code or docs at the pinned tag), **observed** (run on this
machine with the Windows binary on throwaway fixtures, or a `gh`/`curl` read, 2026-10-20), **practice** (what
mature projects visibly do), **report** (one upstream issue). Claim numbers refer to section 7.

### 3.1 Release and integrity (v8.30.1, published 2026-03-21)

- **v8.30.1 is the newest release** (primary source, `gh release list`; claim 1). Assets: `checksums.txt`, and
  archives for darwin (arm64, x64), linux (arm64, armv6, armv7, x32, x64) and windows (arm64, x32, x64). Sizes:
  Windows x64 zip 8 438 883 bytes, checksums file 999 bytes.
- **Hashes (claim 2).** `d29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e` for
  `gitleaks_8.30.1_windows_x64.zip` and `551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb` for
  `gitleaks_8.30.1_linux_x64.tar.gz`, identical in the checksums file, in the asset `digest` fields of the
  releases API, and (Windows zip) in the winget-pkgs manifest. `gitleaks.exe` inside the zip has sha256
  `17157e2ee8b76fc8b1d8bee607a250e34b8a8023c8bc81822d4b5ee4d78fcb7c` and is not Authenticode-signed
  (`Get-AuthenticodeSignature` status `NotSigned`) (observed). The Linux archive holds `LICENSE`, `README.md` and
  an executable `gitleaks` (observed).
- **No signature, no attestation (claim 3, observed).** The asset list has no `.sig`, `.pem` or `.sigstore` file;
  `.goreleaser.yml` at the tag has no signing section; `gh attestation verify <zip> --repo gitleaks/gitleaks`
  fails with `HTTP 404` from the attestations endpoint; `gh release verify v8.30.1 --repo gitleaks/gitleaks`
  prints `no attestations for tag v8.30.1`; the release is not marked immutable (`"immutable": false`). The
  strongest available integrity is therefore equality of hashes obtained over separate channels, plus pinning.
- **winget has the package (claim 4, observed).** `Gitleaks.Gitleaks` 8.30.1, `InstallerType: zip`,
  `NestedInstallerType: portable`, installer URLs pointing at the same three Windows zips with
  `InstallerSha256` equal to the checksums file (upper-case hex). winget checks that hash on install and has an
  opt-out, `--ignore-security-hash`, documented as "Not recommended." The install writes outside the workspace
  (package store, command alias) and cannot be undone by deleting a folder; the zip route leaves one folder.

### 3.2 What `gitleaks git` scans (primary source, v8.30.1)

- **A bare repository works** (observed on a `git clone --mirror`): gitleaks runs `git -C <path> log ...`
  (`NewGitLogCmdContext`), which needs no work tree.
- **Default options (claim 5):** `git log -p -U0 --full-history --all --diff-filter=tuxdb`. `--all` is every ref
  under `refs/` plus `HEAD`, so `refs/pull/*` is scanned by default (observed: a commit reachable only from
  `refs/pull/1/head` produced findings). `--diff-filter=tuxdb` excludes type changes, unmerged, unknown, deleted
  and broken entries; added, copied, modified and renamed entries remain.
- **`--log-opts` replaces everything after `log -p -U0` (claim 5)**: the value is split on spaces and appended.
  A value without `--all` scans only what the stated revisions reach. Values are not shell-quoted: spaces inside
  an option are not supported.
- **Merge commits show no patch by default.** git: "unless one of `--diff-merges` variants (including short `-m`,
  `-c`, `--cc`, and `--dd` options) is explicitly given, merge commits will not show a diff" (claim 17).
  Observed: a token that exists only in a merge commit is not found by the defaults and is found with `-m`;
  `-m` produces one diff per parent, so a merged-in file is reported once per parent (findings double, distinct
  files do not), and gitleaks parses the `commit <id> (from <id>)` headers correctly.
- **Pure renames carry no hunk.** With rename detection on (git's default) a 100 %-similar rename yields a diff
  with no text fragment, so neither content rules nor path rules see the new name. Observed: `key.txt` renamed to
  `keys.txt` produced no finding for `keys.txt` by default and two findings with `--no-renames`. This is the
  GKB2 case (`key.txt` continues as `keys.txt`).
- **Deleted files and binaries are skipped (claim 7).** `IsDelete` entries `continue`; binary entries are skipped
  unless their name is an archive, and archives are opened only when `--max-archive-depth` is above its default
  of 0. So deletions never fire a path rule, and neither do empty files, mode changes or binary files such as
  `*.exe` (observed: empty file and a NUL-containing file produced nothing).
- **Fragments are hunks.** One fragment per text hunk of a file (`for _, textFragment := range
  gitdiffFile.TextFragments`), `-U0`, so only added lines are scanned. A commit is counted in the log line
  `N commits scanned.` only when it yielded a fragment ("this number might be smaller than expected due to
  commits with no additions").
- **Size limits (claim 23).** `--max-target-megabytes` defaults to 0 (no limit). In `git` mode it only skips the
  **regex** check of a fragment whose text exceeds the limit (debug log `skipping fragment: size`); path rules are
  unaffected; in `dir` mode it skips whole files. It should stay at 0 for exit tests: a limit would silently
  shrink coverage. Large binaries cost nothing (skipped as binary); TrumpBot's 125 MB of blobs, mostly binaries,
  are not a scanning concern.
- **Names with spaces and non-ASCII characters** are handled (observed: `guildData/<name with spaces>/...`,
  accented names that git prints C-quoted, `services/game services/<name with spaces>.xml`); the report's `File`
  holds the unquoted name.

### 3.3 Output, exit statuses and the silent pass (primary source and observed)

- **Without `-v`, per-finding output is not printed.** Only log lines on stderr: `N commits scanned.`,
  `scanned ~B bytes (...) in T`, and either `leaks found: F` (warn level) or `no leaks found` (claim 11). `-v`
  adds a block per finding with `Finding:`, `Secret:`, `RuleID:`, `File:`, `Line:`, `Commit:`, `Author:`,
  `Email:`, `Date:`, `Fingerprint:` (observed); the `File:` line and the fingerprint carry the path.
  `--log-level debug|trace` additionally logs the secret and path of skipped findings (`Str("finding",
  finding.Secret)`). None of them is allowed where a data path must not appear.
- **Statuses.** `--exit-code` (default 1) is the status when findings exist; a scan error exits 1; an unknown
  flag exits 126; a config that fails to load logs `FTL` and exits 1 (claim 10; README: "1 - leaks or error
  encountered"). Using `--exit-code 2` separates "findings" (2) from "error" (1). Observed: nonexistent
  repository path, a directory that is not a repository, and an unrecognised `--log-opts` option all exit **0**
  with `ERR [git] fatal: ...`, `0 commits scanned.` and (for the non-repository case) `no leaks found`; an empty
  repository exits 0 as well. Cause: the stderr watcher sends an error, and `DetectSource`' callback logs it and
  returns `nil` ("Log the error and move on to the next fragment"). Upstream: #1981 "git errors are being
  incorrectly ignored" and #2129 "`gitleaks git` silently reports "no leaks found" with exit 0 when `git log`
  writes anything to stderr" (v8.30.1, open); #1450 is the same class for invalid `--log-opts` (claim 24).
  The only reliable signals are the `ERR`/`FTL` lines and the commit count.
- **Flags that matter.** `--no-banner` (banner goes to stderr), `--no-color` (a few early messages such as `FTL`
  stay coloured, so a parser strips ANSI), `--report-format json --report-path <file>` (a `[]` is written when
  there are no findings; the format is otherwise inferred from the extension), `--redact` takes an optional
  value: `rootCmd.Flag("redact").NoOptDefVal = "100"`, so `--redact 100` (space) makes `100` a second positional
  argument and fails with `accepts at most 1 arg(s), received 2`; write `--redact=100` (observed).
- **Config discovery.** `--config` > `GITLEAKS_CONFIG` > `GITLEAKS_CONFIG_TOML` > `<scanned path>/.gitleaks.toml`
  > built-in default. A bare mirror has no `.gitleaks.toml`, so omitting `--config` silently scans with the
  default rules only (observed in source: "no gitleaks config found in path ..., using default gitleaks
  config"). A `.gitleaksignore` found in the current directory, the scanned path or `--gitleaks-ignore-path`
  silently suppresses findings by fingerprint.

### 3.4 Reports and redaction (primary source and observed)

- JSON report fields: `RuleID, Description, StartLine, EndLine, StartColumn, EndColumn, Match, Secret, File,
  SymlinkFile, Commit, Entropy, Author, Email, Date, Message, Tags, Fingerprint` (and `Link` when the remote's
  platform is known); `Line` is omitted (`json:"-"`) (claim 13).
- `--redact` replaces the captured secret by `REDACTED` in `Secret`, `Match` and `Line`. For a **path-only** rule
  the secret is empty, so `strings.ReplaceAll(f.Match, "", "REDACTED")` inserts the marker between every
  character and the path stays recoverable in `Match`; `File` always holds the plain path (claim 12, observed).
  A report is therefore a file with paths, commit ids, author names and e-mail addresses in it: it stays in the
  workspace, is never printed, never uploaded as a CI artifact and never copied to the outputs directory.
- Counting by rule id needs only `RuleID`: `python -I -c "import json,sys,collections; d=json.load(open(sys.argv[1],
  encoding='utf-8')); c=collections.Counter(x['RuleID'] for x in d); print(*sorted('%d %s'%(n,r) for r,n in
  c.items()), sep='\n'); print('total',len(d))" REPORT.json` prints counts and rule ids only.

### 3.5 Path-only rules (primary source and observed)

- A rule with `path` and no `regex` takes the `// Path _only_ rule` branch of `detectRule`: if the pattern matches
  `fragment.FilePath` it emits a finding with `Match: "file detected: " + path` and no secret (claim 8).
- **`git` mode:** once per **hunk** per file per commit, for added and modified files with at least one text
  hunk. Observed: a file modified in two separate hunks gave two findings in one commit; deletions, empty files,
  binaries and (by default) pure renames gave none. Counts of findings are therefore not counts of files: the
  positive control compares distinct files.
- **`dir` mode (claim 9):** once per chunk read (`defaultBufferSize = 100 * 1_000`, extended to a blank-line
  boundary) of every non-empty file whose first bytes are not an `application/*` type (observed: a text file whose first
  two bytes are `MZ` is skipped as a Windows executable before any rule runs; `git` mode does no such sniffing);
  `.git` is skipped via the default allowlist. The `File` is the walk path: `gitleaks dir .` from the repository root gives `docs/x.md`,
  `gitleaks dir /abs/root` gives `/abs/root/docs/x.md`, and a `^`-anchored path rule then misses it (observed:
  the `^(logs|services)/` rule silently stopped firing). `dir` scans are run as `dir .` from the root.
- A rule-level or global **path allowlist is evaluated before the rules** and skips every rule it covers; the
  default global allowlist skips by path alone, for example images, `.exe`, `.dll`, `.pdf`, `.docx`, `go.sum`,
  `gradlew`, `gitleaks\.toml` (unanchored substring) and `(?:^|/)\.git$` (claim 15). A path rule can never fire
  on those names.

### 3.6 Configuration schema at v8.30.1 (primary source)

- `[extend] useDefault = true` merges the 222 default rules and appends the default global allowlist (claim 14);
  a rule with the same `id` as a default rule overrides its attributes. `useDefault` and `path` cannot both be
  set; extension depth is 2.
- **Global allowlists:** `[allowlist]` (single table, the shim kept for compatibility) and `[[allowlists]]`
  (array of tables, introduced in v8.25.0 and carrying `targetRules`, `condition`, `commits`, `paths`,
  `regexTarget`, `regexes`, `stopwords`). Both forms in one file are an error: "[allowlist] is deprecated, it
  cannot be used alongside [[allowlists]]". An allowlist table with none of commits, paths, regexes, stopwords is
  an error. `[[allowlists]]` with `targetRules` is attached to those rules only and is not global.
- **Rule-level allowlists:** `[[rules.allowlists]]` (the older `[rules.allowlist]` shim is rejected alongside
  it). Rule-level and `targetRules` forms apply to one rule; a global `[allowlist]` or `[[allowlists]]` without
  `targetRules` applies to every rule, with the path and commit checks first.
- A config with zero rules loads without a warning and scans "clean" (observed): only a canary detects an inert
  configuration.

### 3.7 Default rules relevant here (primary source)

- **Discord:** `discord-api-token` needs the word `discord` near an `=`/`:` assignment and a 64-hex value
  (`keywords = ["discord"]`), `discord-client-id` an 18-digit id, `discord-client-secret` a 32-character value.
  A bare bot token in a file named `key.txt` matches none of them (observed: the default configuration reports
  nothing on a bare token-shaped file), which is why a token-shape rule is needed.
- **Private keys:** `private-key` matches `-----BEGIN ... PRIVATE KEY-----` followed by at least 64 characters and a
  `KEY-----` footer (claim 15). It flags the PEM in TrumpBot's `key.pem`, and it flags **any file that spells out
  both markers**, including a script or document that quotes them (observed: a helper script that contained a
  complete example block tripped it, and a history that once contained such a file stays red forever).
- **`generic-api-key`:** keyword-gated (`access|auth|api|credential|creds|key|passw(or)d|secret|token`) assignment
  followed by a 10-150 character value with entropy above 3.5 and a long allowlist; a more specific rule on the
  same line suppresses it. Prose such as "`key.txt`: bot token, 72 B", tables of hashes, checksum lists, `sha256`
  values in backticks and `--hash=sha256:...` lines do not trip it (observed on a 10-line fixture of those
  shapes); `api key is: <40 hex>` and `secret_key = "<64 hex>"` do, as intended.

### 3.8 MagicBot's configuration compared (primary source, MagicBot created 2026-10-20)

- Three rules (`discord-bot-token`, `bare-token-file`, `legacy-bot-data-file`) and one global `[allowlist]` with
  `paths = [ '''^README\.md$''', '''^\.gitleaks\.toml$''', '''^docs/.*\.md$''' ]` (claim 16).
- **KotlinBottools' rule definitions for those three are identical** (compared as parsed TOML). It adds
  `legacy-key-file` and `legacy-state-directory` (`keys.txt` and `key.pem` are not covered by MagicBot's
  `(key|token|...)\.txt`; the root `logs/`, `services/`, `log.txt` are not covered at all) and omits the
  allowlist.
- **The allowlist is the one difference of substance.** It is global, so it switches off all 222+ rules, the
  token rule and `private-key` included, for every Markdown file under `docs/` and for `README.md`. Measured at
  8.30.1 on a fixture: a token-shaped string pasted into `docs/leak.md` produced no finding with MagicBot's
  allowlist and one `discord-bot-token` finding without it. A scoped alternative, `[[allowlists]]` with
  `targetRules = ["generic-api-key"]` and `paths = ['''^docs/keyline\.md$''']`, suppressed only the generic finding
  on that file and left the token rule active. `.gitleaks.toml` itself needs no allowlist: gitleaks skips the
  file named by `--config`, and the default allowlist skips any path containing `gitleaks.toml`.
- Path rules do not look at file content, so documents that **name** `key.txt`, `BotData.xml` or `guildData/`
  cannot trigger them; the allowlist is not needed for that.

### 3.9 Discord bot-token shape (opinion/report, derived arithmetic)

- A token has three dot-separated parts: the first is the base64 of the bot's user id, the second an encoded
  timestamp, the third a signature (claim 22, one community library's documentation). TruffleHog v3.99.3's
  detector uses `[A-Za-z0-9_-]{24}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{27}` and, like gitleaks' default rules,
  requires the word `discord` before it (so it too would miss a bare token file).
- MagicBot's `(?i)(?:[MN][A-Za-z\d_-]{23,25}\.[A-Za-z\d_-]{6}\.[A-Za-z\d_-]{27,38}|mfa\.[A-Za-z\d_-]{84})`
  (entropy above 3.5 on the whole match). Derived: ids of 18 and 19 digits encode to 24 and 26 base64 characters,
  17-digit ids to 23; decimal ids starting 1-3 encode to a leading `M`, 4-7 to `N`, 8-9 to `O`. The rule therefore
  matches tokens of bots with 18- or 19-digit ids starting 1-7, i.e. every bot created after early 2015, and
  misses 17-digit ids and `O`-prefixed ids (2015 bots). Checked with generated tokens: 24/6/38 `M`, 26/6/38 `M`
  and 24/6/27 `N` match; 23/6/38, `O`-prefixed and 7-character middle parts do not. The repositories' key files
  are 70-72 bytes, consistent with a 24-character first part, a 6-character middle and a 38-character
  signature plus line ending; whether each real token matches is confirmed by the first real run (section 6.7),
  never by reading the files.
- `(?i)` also lets `m`, `n` and `MFA.` match; the false-positive risk is negligible (a 24-26 character dot-free
  identifier, a 6-character segment and a 27-38 character segment, all in the base64url alphabet, with entropy
  above 3.5). The rule stays as MagicBot has it.

### 3.10 False positives on this repository's documents (observed)

- The 36 Markdown files under `docs/plans/` on the planning branch (1.45 MB) scanned with `gitleaks dir .` and with
  `gitleaks git` (one commit): **0 findings** with the default configuration alone and with the proposed
  configuration, without any allowlist. The documents contain commit hashes, sha256 lists, `key.txt`,
  `BotData.xml`, `guildData/` and `services/` names and long tables. This document, with the three files embedded in
  it, also scans clean in both modes (`dir .` and `git`, one commit).
- What would trip a default rule in a document: a keyword and an assignment followed by a high-entropy value
  (`api key is: <hex>`), `discord ...: <18 digits>` (`discord-client-id`), and a complete pair of PEM markers.
  Documents state such things in prose without the value.

### 3.11 CI building blocks (primary source and observed)

- **`actions/checkout`: the newest major is v7** (v7.0.1, published 2026-07-20, commit
  `3d3c42e5aac5ba805825da76410c181273ba90b1`; v6.1.0, v5.1.0 and v4.4.0 were released the same day). v7 refuses
  fork pull-request checkouts under `pull_request_target`/`workflow_run` and moves to ESM; `fetch-depth` and
  `persist-credentials` are unchanged (claim 18).
- **Organisation convention (claim 21):** MyGameTools' `ci.yml` is `name: CI`, triggers `push`/`pull_request` on
  the default branch plus `workflow_dispatch`, a `concurrency` group, top-level `permissions: contents: read`,
  `runs-on: ubuntu-latest`, and actions pinned by major tag (`actions/checkout@v4`). GeneralTools'
  `Build.yml` is `on: [push]` with `actions/checkout@v2` and no `permissions`; MyGameServer's `deploy.yml` uses
  `actions/checkout@v4`. WebTools, MagicBot and KotlinBottools have no workflows.
- **GitHub's hardening guidance (claim 19):** "Pin actions to a full-length commit SHA" and "set the default
  permission for the `GITHUB_TOKEN` to read access only for repository contents". The secret scan is the one
  workflow whose purpose is security, needs one first-party action, and gains nothing from a moving tag, so it
  pins the commit and keeps the major in a comment.
- **Runner (claim 20):** `ubuntu-latest` is Ubuntu 24.04; its image has Python 3.12.3 (`tomllib` needs 3.11, claim
  25) and Git 2.55.0, `curl`, `tar` and GNU coreutils.
- **Triggers.** With a pinned binary and a fixed configuration the scan is a function of the repository's
  history; only a push or a pull request changes its input, and both trigger it. A schedule would re-run an
  identical computation, so none is configured; `workflow_dispatch` covers an on-demand run. Pushes to branches
  without a pull request are covered by GitHub's own push protection and by the pull-request run.

## 4. How comparable projects do it

- **gitleaks' own repository** (`.github/workflows/gitleaks.yml` at v8.30.1): `actions/checkout@v3` with
  `fetch-depth: 0`, then `gitleaks/gitleaks-action@v2` with `GITLEAKS_LICENSE`. That action is not used here
  (organisation licence needed, no longer MIT); everything it does is a `gitleaks git` run, which the workflow
  below performs with a verified binary.
- **TruffleHog v3.99.3** documents CI use as `--since-commit <default branch> --branch <PR branch>` and
  `--results=verified` filters; it scans history by default but only reports detectors whose keywords occur.
  Its Discord bot-token detector (`pkg/detectors/discordbottoken`) requires the word `discord` in front of the
  token and an id, so a bare `key.txt` is a gap for it as for gitleaks' defaults.
- **GitHub secret scanning** lists "Discord Bot Token" with push protection (parent research); KotlinBottools
  enables it on publication. gitleaks in CI is the second, offline layer that also sees data paths.
- **Organisation CI:** separate `ci.yml` per repository with `permissions: contents: read`, `ubuntu-latest`,
  tag-pinned first-party actions. The secret scan keeps those and differs in one deliberate way: commit pinning.

## 5. Pitfalls and regrets

1. **Exit status 0 and `no leaks found` after a failed `git log`** (section 3.3). A literal runbook that reads
   only the exit status or the last line records a clean result for a scan that did not happen.
2. **`-v`, `--log-level debug|trace`, printing the JSON report, or uploading it as an artifact** publish paths
   and commit ids. `--redact` is not enough: it leaves `File` and, for path rules, the characters of `Match`.
3. **Defaults skip merge-only content and pure renames.** `--no-renames -m` closes both at the cost of
   duplicate findings per merge parent; the positive control counts distinct files, not findings.
4. **Path rules fire per hunk, not per file, and never for deletions, empty files or binaries.** A control that
   expects "one finding per purged file" is wrong; one that expects every purged *text* file to be a distinct
   file in the report is right.
5. **A file once committed stays in history.** The first commit that adds the configuration, the helper script
   and the workflow must already be clean; otherwise every later history scan fails until history is rewritten
   again (observed: a helper script that spelled out a complete PEM example block tripped `private-key`). Scan the working tree with
   `dir .` before committing, and never write both PEM markers in one file.
6. **`^`-anchored path rules depend on relative paths.** `dir` scans run as `dir .` from the root; `git` scans
   report repository-relative paths regardless.
7. **`--redact 100`** (space) fails; **`.gitleaksignore`** and **`GITLEAKS_CONFIG*`** silently change what is
   scanned; **omitting `--config`** on a bare mirror silently drops the custom rules; **a config with no rules**
   is accepted. Hence the input check and the canary in every run.
8. **Low-entropy fake tokens are ignored** (entropy must exceed 3.5): test tokens are generated at run time, never
   typed, and never written into the repository. In `dir` mode a file is also skipped when its first bytes match an `application/*` magic number, so
   a generated fake token must not begin `MZ` (real tokens cannot: the second character of the base64 of a decimal id
   is one of D, T, j, z).
9. **Global path allowlists are a blanket exemption** (MagicBot's `^docs/.*\.md$`). Scope any suppression to one
   rule and one path with `targetRules`, and justify it in `description`.
10. **A pull-request run uses the pull request's own copy of the configuration, script and workflow.** The job
    guards against accidents, not against a contributor who edits the guard; branch protection with review, and
    GitHub's own scanning, are the independent controls.
11. **Pin both the version and the hash, together.** A moving `latest` download, or a hash fetched from the same
    URL at run time, adds nothing; the constant in the reviewed file is the control.
12. **`gitleaks.exe` is unsigned** and no attestation exists: do not describe the install as "verified by
    signature"; it is verified by equal hashes over several channels.

## 6. Recommendation for this repo

Shell: Git Bash. `WS` and `OUT` are the workspace and the outputs directory of the history-rewrite runbook (both
outside every project folder; `WS` is deleted at the end, `OUT` outlives it). Native programs (python,
gitleaks.exe, git) receive mixed-form paths (`D:/...`). A step's **STOP** means: do not continue, do not push,
report the step and the status or marker (never content).

Two options were rejected: the winget package (3.1: same zip, machine-wide state, no stronger assurance) and a
job inside a shared `ci.yml` (a separate file has its own triggers and permissions, cannot be broken by build
changes, and cannot collide with the later `ci.yml`: distinct file, workflow name, job id and concurrency group).
MagicBot's configuration is extended, not copied (3.8).

### 6.1 Files

| File | Where it lives | Content |
|---|---|---|
| `.gitleaks.toml` | KotlinBottools root; local copy `$WS/tools/gitleaks.toml`, byte-identical | 6.3 |
| `secret_scan.py` | `.github/scripts/secret_scan.py`; local copy `$WS/tools/secret_scan.py`, byte-identical | 6.4 |
| `secret-scan.yml` | `.github/workflows/secret-scan.yml` | 6.9 |

For the files exactly as given here (LF line endings, one trailing newline): `.gitleaks.toml` is 2373 bytes,
sha256 `4e68f75c709bd2937253ee9efee3f8fd28f891aa3eb7b00de7b830a28f5396eb`; `secret_scan.py` is 12073 bytes, sha256
`b661e2dc1b0a3ca1893109bca0bd975efb761c4a2f2e3c7059af292eb8dcdd98`; `secret-scan.yml` is 4532 bytes, sha256
`b518b52717073c5667302a113814cb1a76f5aa8c9188a7d7e41346278d772c2e`. The runbook records the values of the copies
it ships; the checks below compare against them.

### 6.2 Install and verify gitleaks (once, before any scan)

```bash
# G0  variables
GLV=8.30.1
ZIP_SHA=d29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e   # gitleaks_8.30.1_windows_x64.zip
EXE_SHA=17157e2ee8b76fc8b1d8bee607a250e34b8a8023c8bc81822d4b5ee4d78fcb7c   # gitleaks.exe inside the zip
WSM="$(cygpath -m "$WS")"
GL="$WSM/tools/gitleaks-$GLV/gitleaks.exe"; CFG="$WSM/tools/gitleaks.toml"; SS="$WSM/tools/secret_scan.py"
GR="$WSM/gitleaks"        # JSON reports and logs: they hold data paths and pre-rewrite commit ids; never printed, never copied to $OUT
mkdir -p "$WS/tools" "$GR" "$OUT/gitleaks"

# G1  download into an empty directory
mkdir -p "$WS/tools/gitleaks-dl" && cd "$WS/tools/gitleaks-dl" && test -z "$(ls -A)" || echo STOP
gh release download "v$GLV" --repo gitleaks/gitleaks --pattern "gitleaks_${GLV}_windows_x64.zip" --pattern "gitleaks_${GLV}_checksums.txt"; echo "rc=$?"
#   expected: exactly  rc=0
wc -c < "gitleaks_${GLV}_checksums.txt"; wc -c < "gitleaks_${GLV}_windows_x64.zip"
#   expected: 999  then  8438883

# G2  hash equality over four channels
sha256sum --ignore-missing -c "gitleaks_${GLV}_checksums.txt"; echo "rc=$?"
#   expected: gitleaks_8.30.1_windows_x64.zip: OK   then   rc=0
echo "$ZIP_SHA  gitleaks_${GLV}_windows_x64.zip" | sha256sum -c -; echo "rc=$?"
#   expected: gitleaks_8.30.1_windows_x64.zip: OK   then   rc=0
test "$(gh release view "v$GLV" --repo gitleaks/gitleaks --json assets --jq ".assets[]|select(.name==\"gitleaks_${GLV}_windows_x64.zip\")|.digest")" = "sha256:$ZIP_SHA" && echo digest-ok
test "$(gh api "repos/microsoft/winget-pkgs/contents/manifests/g/Gitleaks/Gitleaks/$GLV/Gitleaks.Gitleaks.installer.yaml" --jq .content | base64 -d | awk '/windows_x64\.zip/{getline; print tolower($2)}' | tr -d '\r')" = "$ZIP_SHA" && echo winget-ok
#   expected: digest-ok   and   winget-ok      (a missing line = STOP)

# G3  signature / attestation (none exists; record that)
gh attestation verify "gitleaks_${GLV}_windows_x64.zip" --repo gitleaks/gitleaks > "$GR/attest-zip.txt" 2>&1; rc=$?
if [ $rc -eq 0 ]; then echo attested; elif grep -q 'HTTP 404' "$GR/attest-zip.txt"; then echo no-attestation; else echo STOP; fi
gh release verify "v$GLV" --repo gitleaks/gitleaks > "$GR/attest-release.txt" 2>&1; rc=$?
if [ $rc -eq 0 ]; then echo attested; elif grep -q 'no attestations for tag' "$GR/attest-release.txt"; then echo no-attestation; else echo STOP; fi
#   expected: no-attestation  twice.  `attested` is also acceptable (record it). `STOP` = stop.

# G4  unpack into a new directory, check the executable
cd "$WS/tools" && mkdir "gitleaks-$GLV" && unzip -q "gitleaks-dl/gitleaks_${GLV}_windows_x64.zip" -d "gitleaks-$GLV"; echo "rc=$?"
ls "gitleaks-$GLV" | tr '\n' ' '; echo
#   expected: rc=0   then   LICENSE README.md gitleaks.exe
test "$(sha256sum "gitleaks-$GLV/gitleaks.exe" | cut -d' ' -f1)" = "$EXE_SHA" && echo exe-ok
"$GL" version; echo "rc=$?"
#   expected: exe-ok   then   8.30.1   then   rc=0

# G5  the two helper files (save 6.3 and 6.4 byte-exactly with a quoted heredoc or from the runbook folder)
sha256sum "$WS/tools/gitleaks.toml" "$WS/tools/secret_scan.py"      # must equal the values recorded in the runbook
tr -cd '\r' < "$WS/tools/gitleaks.toml" | wc -c; tr -cd '\r' < "$WS/tools/secret_scan.py" | wc -c      # 0 and 0
python -I "$SS" --help > /dev/null; echo "rc=$?"                       # rc=0
cd "$WS"
test ! -e .gitleaksignore && test -z "${GITLEAKS_CONFIG:-}${GITLEAKS_CONFIG_TOML:-}" || echo STOP      # prints nothing
```

STOP on any deviation, including a size or hash that differs from the stated value (a changed asset must be
investigated, not accepted). All later commands run with `cd "$WS"` (no `.gitleaksignore` there).

### 6.3 The configuration (`.gitleaks.toml`)

```toml
# gitleaks configuration for KotlinBottools (gitleaks 8.30.1).
#
# Extends the default rule set with the rules MagicBot already uses for Discord bot tokens and for the
# bare token and data files the predecessor bots kept in their repositories, plus two path rules for
# file names and directories only the older repositories held (keys.txt, key.pem, logs/, services/,
# log.txt). Path-only rules match the file's path, never its content; they fire once per
# changed hunk of a file in `gitleaks git` and once per 100 kB chunk of a file in `gitleaks dir`.
#
# There is no allowlist: the planning documents scan clean without one, and a path allowlist would
# switch off every rule, the token and private-key rules included, for the paths it names. If a false
# positive ever needs suppressing, scope it to one rule and one path with `targetRules`, in a
# [[allowlists]] table, and say why in `description`.
#
# Run it as: gitleaks git --config .gitleaks.toml ...   (always pass --config; without it gitleaks looks
# for .gitleaks.toml in the scanned path, which a bare mirror does not have).

title = "KotlinBottools"

[extend]
useDefault = true

# --- Rules shared with MagicBot, byte for byte -------------------------------------------------

[[rules]]
id = "discord-bot-token"
description = "Discord bot token"
regex = '''(?i)(?:[MN][A-Za-z\d_-]{23,25}\.[A-Za-z\d_-]{6}\.[A-Za-z\d_-]{27,38}|mfa\.[A-Za-z\d_-]{84})'''
keywords = ["mfa.", "."]
entropy = 3.5

[[rules]]
id = "bare-token-file"
description = "A bare token file from the predecessor bots (key.txt and relatives); never committed"
path = '''(?i)(^|/)(key|token|bot[-_]?token|discord[-_]?token)\.txt$'''

[[rules]]
id = "legacy-bot-data-file"
description = "A predecessor bot's data file (BotData.xml, guildData/*.xml); legacy data never enters this repository"
path = '''(?i)(^|/)(BotData\.xml|guildData/.*\.xml|WebParseKeys\.xml)$'''

# --- Rules only KotlinBottools adds -----------------------------------------------------------

[[rules]]
id = "legacy-key-file"
description = "A credential file name only the older bots used (keys.txt, key.pem)"
path = '''(?i)(^|/)(keys\.txt|key\.pem)$'''

[[rules]]
id = "legacy-state-directory"
description = "A predecessor bot's runtime-state directory (logs/ or services/ at the repository root) or its root log file"
path = '''(?i)(^(logs|services)/|^log\.txt$)'''
```

Why each choice: `useDefault` keeps the 222 default rules (API keys, `private-key`, `generic-api-key`). The first
three rules are MagicBot's, definition for definition, so the two repositories agree. `legacy-key-file` adds
`keys.txt` and `key.pem`; the root-anchored `legacy-state-directory` adds `logs/`, `services/` and `log.txt`
(root-anchored because `.../services/` is a legitimate source package elsewhere). `guildData/` at any depth is
already covered by `legacy-bot-data-file`; its `(^|/)` form also matches `src/test/guildData/`. There is deliberately no allowlist (3.8, 3.10).

### 6.4 The wrapper (`secret_scan.py`)

Every line it prints is a count, a rule id, a fixed marker or an exit status. `scan` exits 0 clean, 1 findings
present with every consistency check passed, 2 a consistency check failed. Requires Python 3.11 or newer.

```python
#!/usr/bin/env python3
"""Safe wrapper around "gitleaks git" / "gitleaks dir" for history purges and CI.

Every line this script prints is a count, a rule id, a fixed marker, or a command exit status. It never prints
a file path, a secret, a match, a commit id, an author or a commit message, whatever the report contains.

Subcommands
  scan           run gitleaks, check that the scan really happened, print counts by rule id
  control        compare a report with an independent count taken from "git log --numstat"
  canary-make    create a throwaway repository with planted fake secrets (random, generated at run time)
  canary-check   check a canary scan report against the exact expected counts

Exit statuses of "scan": 0 clean, 1 findings present (all consistency checks passed), 2 consistency check failed.
Run with "python -I" (isolated mode).
"""
import argparse
import base64
import collections
import json
import os
import re
import secrets
import string
import subprocess
import sys
import tomllib

REFS = {
    "all": "--all",
    "branches": "--branches --tags",
}
ANSI = re.compile(r"\x1b\[[0-9;]*m")


class GitFailed(Exception):
    pass


def log_opts(refs):
    """The git log options handed to gitleaks (--log-opts); they replace gitleaks' own defaults."""
    return "--full-history " + REFS[refs] + " --no-renames -m --diff-filter=tuxdb"


def git_numstat(repo, refs):
    """Yield (commit, added, deleted, path) for every file change that git log reports for these options."""
    cmd = ["git", "-c", "core.quotepath=false", "-C", repo, "log"] + REFS[refs].split() + [
        "-m", "--no-renames", "--diff-filter=tuxdb", "--numstat", "--format=%x01%H"]
    proc = subprocess.run(cmd, capture_output=True)
    if proc.returncode != 0:
        raise GitFailed("git log failed with status %d" % proc.returncode)
    commit = None
    for raw in proc.stdout.split(b"\n"):
        raw = raw.rstrip(b"\r")
        if raw.startswith(b"\x01"):
            commit = raw[1:]
            continue
        parts = raw.split(b"\t", 2)
        if commit is not None and len(parts) == 3:
            yield commit, parts[0], parts[1], parts[2].decode("utf-8", "replace")


def scannable(added, deleted):
    """A change gitleaks yields a fragment for: a text file (numstat is not "-") with at least one changed line."""
    return added != b"-" and (added != b"0" or deleted != b"0")


def expected_commits(repo, refs):
    return len({c for c, a, d, _ in git_numstat(repo, refs) if scannable(a, d)})


def load_report(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    if not isinstance(data, list):
        raise ValueError("report is not a JSON array")
    return data


def print_rule_counts(findings):
    counts = collections.Counter(x["RuleID"] for x in findings)
    for rule in sorted(counts):
        files = len({x["File"] for x in findings if x["RuleID"] == rule})
        print("rule %s findings=%d files=%d" % (rule, counts[rule], files))


def cmd_scan(a):
    mode = a.mode
    expected = expected_commits(a.repo, a.refs) if mode == "git" else 0
    cmd = [a.gitleaks, mode, a.repo, "--config", a.config, "--redact=100", "--no-banner", "--no-color",
           "--exit-code", "2", "--report-format", "json", "--report-path", a.report]
    if mode == "git":
        cmd += ["--log-opts", log_opts(a.refs)]
    with open(a.log, "wb") as logf:
        rc = subprocess.run(cmd, stdout=logf, stderr=subprocess.STDOUT).returncode
    with open(a.log, encoding="utf-8", errors="replace") as f:
        log = ANSI.sub("", f.read())  # a few early messages are coloured even with --no-color
    problems = []
    err_lines = len(re.findall(r"\s(?:ERR|FTL)\s", log))
    if err_lines:
        problems.append("log has %d ERR/FTL lines" % err_lines)
    if rc not in (0, 2):
        problems.append("gitleaks exit status %d" % rc)
    try:
        findings = load_report(a.report)
    except (OSError, ValueError) as e:
        findings = []
        problems.append("report unreadable (%s)" % type(e).__name__)
    m = re.search(r"leaks found: (\d+)", log)
    logged = int(m.group(1)) if m else 0
    if logged != len(findings):
        problems.append("log says %d findings, report holds %d" % (logged, len(findings)))
    if (rc == 2) != (len(findings) > 0):
        problems.append("exit status and report disagree")
    if mode == "git":
        m = re.search(r"(\d+) commits scanned\.", log)
        scanned = int(m.group(1)) if m else -1
        print("commits_scanned=%d expected_commits=%d" % (scanned, expected))
        if expected < 1:
            problems.append("fewer than one scannable commit")
        if scanned != expected:
            problems.append("scanned commits differ from the independent count")
    else:
        m = re.search(r"scanned ~(\d+) bytes", log)
        scanned = int(m.group(1)) if m else 0
        print("bytes_scanned=%d" % scanned)
        if scanned < 1:
            problems.append("no bytes scanned")
    print("gitleaks_exit=%d error_lines=%d findings=%d" % (rc, err_lines, len(findings)))
    print_rule_counts(findings)
    if problems:
        for p in problems:
            print("GATE FAILED: " + p)
        return 2
    print("RESULT: " + ("FINDINGS" if findings else "CLEAN"))
    return 1 if findings else 0


def cmd_control(a):
    findings = load_report(a.report)
    with open(a.config, "rb") as f:
        cfg = tomllib.load(f)
    git_paths = {p for _, ad, de, p in git_numstat(a.repo, a.refs) if scannable(ad, de)}
    rule_paths = {}
    for rule in cfg.get("rules", []):
        if "path" in rule and "regex" not in rule:
            rule_paths[rule["id"]] = re.compile(rule["path"])
    for rule_id, pat in rule_paths.items():
        x = len({f["File"] for f in findings if f["RuleID"] == rule_id})
        y = sum(1 for p in git_paths if pat.search(p))
        print("rule %s report_files=%d git_files=%d%s" % (rule_id, x, y, "" if x <= y else " IMPOSSIBLE"))
    for spec in a.probe_name:  # RULE:FILENAME, a fixed name taken from the plan
        rule_id, name = spec.split(":", 1)
        n = sum(1 for f in findings if f["RuleID"] == rule_id and f["File"] == name)
        print("probe %s file=%s findings=%d" % (rule_id, name, n))
    for spec in a.probe_prefix:  # RULE:PREFIX, a fixed directory prefix taken from the plan
        rule_id, prefix = spec.split(":", 1)
        x = len({f["File"] for f in findings if f["RuleID"] == rule_id and f["File"].startswith(prefix)})
        pat = rule_paths.get(rule_id)
        y = sum(1 for p in git_paths if p.startswith(prefix) and pat is not None and pat.search(p))
        print("probe %s prefix=%s report_files=%d git_files=%d" % (rule_id, prefix, x, y))
    return 0


ALPHABET = string.ascii_letters + string.digits + "_-"


def rnd(n):
    return "".join(secrets.choice(ALPHABET) for _ in range(n))


def fake_token():
    # The shape of a Discord bot token; random, generated at run time, never written into this repository.
    # The first part is the base64 of a decimal id, so its second character is one of D, T, j, z (a random
    # second character such as "Z" would give the file an "MZ" executable header, which "gitleaks dir" skips).
    return "M" + secrets.choice("DTjz") + rnd(22) + "." + rnd(6) + "." + rnd(38)


def cmd_canary_make(a):
    root = a.dir
    os.makedirs(root)
    env = dict(os.environ, GIT_AUTHOR_NAME="canary", GIT_AUTHOR_EMAIL="canary@example.invalid",
               GIT_COMMITTER_NAME="canary", GIT_COMMITTER_EMAIL="canary@example.invalid")

    def git(*args):
        subprocess.run(["git", "-C", root, "-c", "core.autocrlf=false", "-c", "commit.gpgsign=false"] + list(args),
                       check=True, capture_output=True, env=env)

    def write(rel, text):
        p = os.path.join(root, rel)
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", newline="") as f:
            f.write(text)

    # The marker text is split so that this file does not itself match the private-key rule.
    pem = ("-----BEGIN RSA PRIV" "ATE KEY-----\n"
           + "\n".join(base64.b64encode(secrets.token_bytes(48)).decode() for _ in range(20))
           + "\n-----END RSA PRIV" "ATE KEY-----\n")
    git("init", "-q", "-b", "main")
    write("key.txt", fake_token() + "\n")
    write("key.pem", pem)
    write("BotData.xml", "<d>%s</d>\n" % rnd(40))
    write("WebParseKeys.xml", "<k>%s</k>\n" % rnd(10))
    write("guildData/g.xml", "<g>%s</g>\n" % rnd(10))
    write("logs/a.log", "line %s\n" % rnd(10))
    write("services/s.xml", "<s>%s</s>\n" % rnd(10))
    write("src/Main.kt", "fun main() {}\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 1")
    git("mv", "key.txt", "keys.txt")
    git("commit", "-q", "-m", "canary 2 rename")
    git("checkout", "-q", "-b", "side")
    write("side.txt", "side\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 3 side")
    git("checkout", "-q", "main")
    write("main2.txt", "main\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 4 main")
    git("merge", "-q", "--no-ff", "--no-commit", "side")
    write("merge-only.txt", fake_token() + "\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 5 merge")
    git("checkout", "-q", "-b", "pr-tmp")
    write("pr-only.txt", fake_token() + "\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 6 pull ref")
    sha = subprocess.run(["git", "-C", root, "rev-parse", "HEAD"], check=True, capture_output=True,
                         text=True).stdout.strip()
    git("checkout", "-q", "main")
    git("branch", "-q", "-D", "pr-tmp")
    git("update-ref", "refs/pull/1/head", sha)
    print("canary repository created")
    return 0


# Distinct files per rule that a correct configuration reports on the canary mirror.
CANARY_EXPECTED = {
    "all": {"bare-token-file": 1, "discord-bot-token": 4, "legacy-bot-data-file": 3, "legacy-key-file": 2,
            "legacy-state-directory": 2, "private-key": 1},
    "branches": {"bare-token-file": 1, "discord-bot-token": 3, "legacy-bot-data-file": 3, "legacy-key-file": 2,
                 "legacy-state-directory": 2, "private-key": 1},
}


def cmd_canary_check(a):
    findings = load_report(a.report)
    got = {r: len({x["File"] for x in findings if x["RuleID"] == r}) for r in {x["RuleID"] for x in findings}}
    want = CANARY_EXPECTED[a.refs]
    for rule in sorted(set(got) | set(want)):
        print("canary rule %s files=%d expected=%d" % (rule, got.get(rule, 0), want.get(rule, 0)))
    ok = got == want
    print("CANARY " + ("OK" if ok else "FAILED"))
    return 0 if ok else 2


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("scan")
    s.add_argument("--gitleaks", required=True)
    s.add_argument("--mode", choices=["git", "dir"], default="git")
    s.add_argument("--repo", required=True)
    s.add_argument("--config", required=True)
    s.add_argument("--refs", choices=list(REFS), default="all")
    s.add_argument("--report", required=True)
    s.add_argument("--log", required=True)
    s.set_defaults(fn=cmd_scan)
    c = sub.add_parser("control")
    c.add_argument("--repo", required=True)
    c.add_argument("--config", required=True)
    c.add_argument("--refs", choices=list(REFS), default="all")
    c.add_argument("--report", required=True)
    c.add_argument("--probe-name", action="append", default=[], metavar="RULE:FILENAME")
    c.add_argument("--probe-prefix", action="append", default=[], metavar="RULE:PREFIX")
    c.set_defaults(fn=cmd_control)
    m = sub.add_parser("canary-make")
    m.add_argument("dir")
    m.set_defaults(fn=cmd_canary_make)
    k = sub.add_parser("canary-check")
    k.add_argument("--report", required=True)
    k.add_argument("--refs", choices=list(REFS), required=True)
    k.set_defaults(fn=cmd_canary_check)
    a = p.parse_args()
    try:
        sys.exit(a.fn(a))
    except GitFailed as e:
        print("GATE FAILED: " + str(e))
        sys.exit(2)


if __name__ == "__main__":
    main()
```

What the gate catches (each exercised on fixtures): a nonexistent or non-repository path and an unrecognised
`--log-opts` option (`GATE FAILED`, status 2); a configuration file that does not exist (`FTL`, status 2); a
scan that stopped early (commit count below the independent count); a configuration with no rules (not by `scan`,
by `canary-check`). The independent count is "distinct commits that have at least one text file with a changed
line under the same `git log` options".

### 6.5 Canary (once, then before every run in CI)

```bash
cd "$WS" && rm -rf canary && mkdir canary && cd canary
python -I "$SS" canary-make "$WSM/canary/src"; echo "rc=$?"          # canary repository created / rc=0
git clone --quiet --mirror --no-local src canary.git; echo "rc=$?"    # rc=0
git -C canary.git for-each-ref --format='%(refname)'                 # refs/heads/main  refs/heads/side  refs/pull/1/head
for refs in all branches; do
  python -I "$SS" scan --gitleaks "$GL" --repo "$WSM/canary/canary.git" --config "$CFG" --refs $refs \
      --report "$GR/canary-$refs.json" --log "$GR/canary-$refs.log" > "$OUT/gitleaks/canary-$refs.txt"; echo "scan[$refs] status=$?"
  cat "$OUT/gitleaks/canary-$refs.txt"
  python -I "$SS" canary-check --report "$GR/canary-$refs.json" --refs $refs; echo "check[$refs] status=$?"
done
```

Expected (measured with the files above; the counts depend only on the canary's structure):

```
scan[all] status=1
commits_scanned=6 expected_commits=6
gitleaks_exit=2 error_lines=0 findings=14
rule bare-token-file findings=1 files=1
rule discord-bot-token findings=5 files=4
rule legacy-bot-data-file findings=3 files=3
rule legacy-key-file findings=2 files=2
rule legacy-state-directory findings=2 files=2
rule private-key findings=1 files=1
RESULT: FINDINGS
canary rule bare-token-file files=1 expected=1
canary rule discord-bot-token files=4 expected=4
canary rule legacy-bot-data-file files=3 expected=3
canary rule legacy-key-file files=2 expected=2
canary rule legacy-state-directory files=2 expected=2
canary rule private-key files=1 expected=1
CANARY OK
check[all] status=0
scan[branches] status=1
commits_scanned=5 expected_commits=5
gitleaks_exit=2 error_lines=0 findings=13
rule bare-token-file findings=1 files=1
rule discord-bot-token findings=4 files=3
rule legacy-bot-data-file findings=3 files=3
rule legacy-key-file findings=2 files=2
rule legacy-state-directory findings=2 files=2
rule private-key findings=1 files=1
RESULT: FINDINGS
canary rule bare-token-file files=1 expected=1
canary rule discord-bot-token files=3 expected=3
canary rule legacy-bot-data-file files=3 expected=3
canary rule legacy-key-file files=2 expected=2
canary rule legacy-state-directory files=2 expected=2
canary rule private-key files=1 expected=1
CANARY OK
check[branches] status=0
```

`discord-bot-token` shows 4 distinct files for `all` (the token file, its renamed copy, the merge-only file, the
file reachable only from `refs/pull/1/head`) and 3 for `branches` (no pull-ref file): this proves in one run that
`--all` reaches `refs/pull/*`, `--branches --tags` does not, `-m` reaches merge-only content and `--no-renames`
reaches renamed content. STOP unless both scans have status 1 and both checks print `CANARY OK` with status 0.
`rm -rf "$WS/canary"` afterwards is optional (it holds only fake data).

### 6.6 Scan commands for a bare mirror

Two variants, same options (`-m --no-renames --diff-filter=tuxdb`, redaction, no verbose output, `--max-target-megabytes`
unset), differing only in the refs:

```bash
# $MIRROR = bare mirror (mixed-form path), $REPO = name.   Report/log names are per variant.
timeout 1800 python -I "$SS" scan --gitleaks "$GL" --repo "$MIRROR" --config "$CFG" --refs branches \
    --report "$GR/$REPO-branches.json" --log "$GR/$REPO-branches.log" > "$OUT/$REPO/gitleaks-branches.txt"; echo "status=$?"
timeout 1800 python -I "$SS" scan --gitleaks "$GL" --repo "$MIRROR" --config "$CFG" --refs all \
    --report "$GR/$REPO-all.json" --log "$GR/$REPO-all.log" > "$OUT/$REPO/gitleaks-all.txt"; echo "status=$?"
```

- `branches` = `refs/heads/*` and `refs/tags/*`. `all` = every ref including `HEAD` and `refs/pull/*`.
- Status 0: clean and consistent. 1: findings. 2: the gate failed. 124 (`timeout`): STOP.
- The text files in `$OUT/$REPO/` hold counts only and may be kept and quoted. The JSON reports in `$GR` hold paths
  and commit ids and are deleted with `$WS`.
- Counting findings by rule id from a report without the wrapper: the Python one-liner in 3.4.
- Never run with `-v`, `--log-level debug|trace`, `--report-path -`, or `cat` a report or log.

### 6.7 Positive control (per repository, on the untouched pre-rewrite mirror)

`BK` is the untouched backup mirror taken before the rewrite. The control runs before the repository's exit test is
evaluated, and a repository whose control fails is not declared clean.

```bash
mkdir -p "$OUT/$REPO"
timeout 1800 python -I "$SS" scan --gitleaks "$GL" --repo "$BK" --config "$CFG" --refs all \
    --report "$GR/$REPO-before.json" --log "$GR/$REPO-before.log" > "$OUT/$REPO/gitleaks-before.txt"; echo "status=$?"
python -I "$SS" control --repo "$BK" --config "$CFG" --refs all --report "$GR/$REPO-before.json" \
    <probe flags for $REPO from the table> > "$OUT/$REPO/gitleaks-control.txt"
awk '
/^rule /      { split($3,a,"="); split($4,b,"="); if (a[2]!=b[2] || $0 ~ /IMPOSSIBLE/) bad++ }
/^probe .* findings=/ { split($NF,a,"="); if (a[2]<1) bad++ }
/^probe .* prefix=/   { split($(NF-1),a,"="); split($NF,b,"="); if (a[2]!=b[2] || b[2]<1) bad++ }
END { print (bad ? "CONTROL FAILED (" bad ")" : "CONTROL OK") }' "$OUT/$REPO/gitleaks-control.txt" | tee -a "$OUT/$REPO/gitleaks-control.txt"
```

Pass condition for KotlinBottools, GKB2, GKB and TrumpBot: scan `status=1` with `RESULT: FINDINGS`, and the last
line `CONTROL OK`. Anything else is STOP (status 0 means the configuration is blind to a history that holds
secrets; 2 is a gate failure; `CONTROL FAILED` names the number of failing lines in the control file, which holds
counts only). The awk applies three tests: for every path-only rule, files in the report equal files that git
itself says changed and match the rule (`report_files == git_files`); every named probe is above zero; for every
directory probe the two file counts are equal and above zero.

Probe flags (`R:` rule id, then the fixed name or prefix; the parent research's inventory is the source of the
expectations, and the "files" column is the inventory's path count for orientation, not a test: the test is the
equality with git's own count):

| Repository | `--probe-name` (each findings >= 1) | `--probe-prefix` (report = git, >= 1) | Inventory orientation |
|---|---|---|---|
| KotlinBottools | `bare-token-file:key.txt` `discord-bot-token:key.txt` `legacy-bot-data-file:BotData.xml` `legacy-bot-data-file:WebParseKeys.xml` | `legacy-bot-data-file:guildData/` `legacy-bot-data-file:src/test/guildData/` `legacy-state-directory:services/` | `guildData/` 30 paths, `src/test/guildData/` 30, `services/` 5 |
| GKB2 | `bare-token-file:key.txt` `legacy-key-file:keys.txt` `discord-bot-token:key.txt` `discord-bot-token:keys.txt` `legacy-bot-data-file:BotData.xml` `legacy-bot-data-file:WebParseKeys.xml` | `legacy-bot-data-file:guildData/` `legacy-state-directory:logs/` `legacy-state-directory:services/` | `guildData/` 29, `logs/` 5, `services/` 2 |
| GKB | `bare-token-file:key.txt` `discord-bot-token:key.txt` `legacy-bot-data-file:BotData.xml` `legacy-bot-data-file:WebParseKeys.xml` | `legacy-bot-data-file:guildData/` `legacy-state-directory:logs/` `legacy-state-directory:services/` | `guildData/` 29, `logs/` 5, `services/` 2 |
| TrumpBot | `bare-token-file:key.txt` `discord-bot-token:key.txt` `legacy-key-file:key.pem` `private-key:key.pem` `legacy-bot-data-file:BotData.xml` `legacy-bot-data-file:WebParseKeys.xml` `legacy-state-directory:log.txt` | `legacy-bot-data-file:guildData/` `legacy-state-directory:services/` | `guildData/` 30, `services/` 1 |

Notes on the expectations:

- `keys.txt` in GKB2 is the same blob as `key.txt` after a pure rename; it is flagged only because the scan uses
  `--no-renames` (3.2). Without that option the `legacy-key-file:keys.txt` probe would be 0.
- `discord-bot-token:<file>` > 0 is the first real test of MagicBot's token regex against the real tokens. If the
  path rule fires on a token file and the token rule does not, the token's shape is outside the regex (3.9): STOP
  and report which repository and which of the two probes; do not edit the rule during the run.
- `private-key:key.pem` (TrumpBot) is the default rule, not a custom one; `legacy-key-file:key.pem` is the path rule.
- Where a rule has no expected file (for example `legacy-key-file` in KotlinBottools) the awk still requires
  `report_files == git_files` (both 0 or equal).
- Findings from default rules other than the ones above (for example `generic-api-key` in `BotData.xml`'s cookie
  section) are expected and appear as additional `rule` lines in `gitleaks-before.txt`; they are recorded, not
  tested.

**BotTools and Support** hold no token and no data path (parent inventory). Their scan runs identically; the
pass condition is the absence of the six ids this configuration owns:

```bash
grep -c -E '^rule (bare-token-file|discord-bot-token|legacy-bot-data-file|legacy-key-file|legacy-state-directory|private-key) ' "$OUT/$REPO/gitleaks-before.txt"      # 0   (grep exits 1 on 0; read the number)
```

The control can show only that the rules do not fire on ordinary Java source and on vendored libraries; it cannot
show that the configuration would have flagged a secret in those two repositories, because none exists. That
sensitivity is the canary's (6.5). If the pre-rewrite scan reports **default-rule** findings in either repository,
the counts per rule id go into the record, and the exit criterion "zero findings" for that repository needs a
decision by the owner whenever the same findings lie in paths that are kept (Known gaps).

### 6.8 Exit tests on the rewritten mirrors

On the fresh mirror of each pushed repository (`EX`), after the canary and the repository's control passed:

```bash
test "$(git -C "$EX" rev-parse --is-bare-repository)" = true || echo STOP
PULL=$(git -C "$EX" for-each-ref refs/pull | wc -l); echo "pull_refs=$PULL"
for v in branches all; do
  timeout 1800 python -I "$SS" scan --gitleaks "$GL" --repo "$EX" --config "$CFG" --refs $v \
      --report "$GR/$REPO-after-$v.json" --log "$GR/$REPO-after-$v.log" > "$OUT/$REPO/gitleaks-after-$v.txt"; echo "after[$v] status=$?"
done
BR="$OUT/$REPO/gitleaks-after-branches.txt"; AL="$OUT/$REPO/gitleaks-after-all.txt"
test "$(tail -n 1 "$BR")" = "RESULT: CLEAN" || echo STOP
if [ -f "$OUT/$REPO/gitleaks-control.txt" ]; then      # KotlinBottools, GKB2, GKB, TrumpBot
  grep -q 'CONTROL OK' "$OUT/$REPO/gitleaks-control.txt" || echo STOP
else                                                   # BotTools, Support: the six ids must be absent before the rewrite
  test "$(grep -c -E '^rule (bare-token-file|discord-bot-token|legacy-bot-data-file|legacy-key-file|legacy-state-directory|private-key) ' "$OUT/$REPO/gitleaks-before.txt")" = 0 || echo STOP
fi
if [ "$PULL" -eq 0 ]; then
  test "$(tail -n 1 "$AL")" = "RESULT: CLEAN" || echo STOP
  test "$(head -n 1 "$AL")" = "$(head -n 1 "$BR")" || echo STOP              # same commit count: no ref beyond branches and tags
else
  grep -q '^GATE FAILED' "$AL" && echo STOP                                  # findings are allowed here, a failed gate is not
fi
```

- **`branches` must be clean.** `RESULT: CLEAN` means: for every commit reachable from a branch or tag of the
  pushed repository, `git log -p -m --no-renames` shows no added line that a default rule or one of the five rules
  matches and no changed text file whose path matches a path rule, and gitleaks scanned exactly as many commits as
  git reports as scannable. It does not mean: no secret of a shape the rules do not know, nothing in binary
  files or inside archives, nothing in objects no ref reaches, nothing that GitHub still serves from the old
  history (`refs/pull/*`, cached views).
- **`all` is evidence about `refs/pull/*`.** For KotlinBottools, GKB, TrumpBot and Support there is no such ref and
  the `all` run must equal the `branches` run. For GKB2 (`refs/pull/6/head`) and BotTools (`refs/pull/2/head`,
  `refs/pull/3/head`), which keep pre-rewrite objects reachable, the `all` result is measured and recorded
  (`pull_refs`, `commits_scanned`, counts by rule id); status 0 or 1 are both reportable outcomes and are not
  required to be clean; a gate failure (status 2) is STOP.
- For KotlinBottools a second `branches` run repeats after any later step that changes the refs (the plan's
  re-check before the visibility change).

### 6.9 The workflow (`.github/workflows/secret-scan.yml`)

```yaml
name: Secret scan

# Scans the full history of every ref the checkout holds, and the working tree, with a pinned and
# checksum-verified gitleaks binary. Findings are redacted and never printed: the log shows counts by
# rule id only, because a public log must not name a secret or a data path. To see which file and
# commit a finding belongs to, run the same secret_scan.py scan command locally and read the JSON report.
#
# The job needs no secret and no write access. It is separate from ci.yml so the build workflow can
# change without touching the secret scan.

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: secret-scan-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}

permissions:
  contents: read

env:
  # To upgrade gitleaks: change both values together. The checksum is the line for
  # gitleaks_<version>_linux_x64.tar.gz in the release's gitleaks_<version>_checksums.txt.
  GITLEAKS_VERSION: "8.30.1"
  GITLEAKS_LINUX_X64_SHA256: "551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb"

jobs:
  secret-scan:
    name: Secret scan (gitleaks)
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      # v7.0.1. Pinned to the commit; the tag can move, the commit cannot.
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Install gitleaks (pinned, checksum-verified)
        run: |
          set -euo pipefail
          dir="$RUNNER_TEMP/gitleaks"
          archive="gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz"
          mkdir -p "$dir"
          curl --fail --silent --show-error --location --proto '=https' --tlsv1.2 \
            --output "$dir/$archive" \
            "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/${archive}"
          echo "${GITLEAKS_LINUX_X64_SHA256}  ${dir}/${archive}" | sha256sum --check --strict -
          tar -xzf "$dir/$archive" -C "$dir" gitleaks
          test "$("$dir/gitleaks" version)" = "$GITLEAKS_VERSION"
          echo "gitleaks $GITLEAKS_VERSION installed"

      - name: Check the scan inputs
        run: |
          set -euo pipefail
          # A .gitleaksignore silently suppresses findings; this repository does not use one.
          test -f .gitleaks.toml
          test -f .github/scripts/secret_scan.py
          test ! -e .gitleaksignore
          test -z "${GITLEAKS_CONFIG:-}${GITLEAKS_CONFIG_TOML:-}"

      - name: Canary (the configuration must flag planted fake secrets)
        run: |
          set -euo pipefail
          scan=.github/scripts/secret_scan.py
          bin="$RUNNER_TEMP/gitleaks/gitleaks"
          python3 -I "$scan" canary-make "$RUNNER_TEMP/canary-src"
          git clone --quiet --mirror --no-local "$RUNNER_TEMP/canary-src" "$RUNNER_TEMP/canary.git"
          for refs in all branches; do
            rc=0
            python3 -I "$scan" scan --gitleaks "$bin" --repo "$RUNNER_TEMP/canary.git" --config .gitleaks.toml \
              --refs "$refs" --report "$RUNNER_TEMP/canary-$refs.json" --log "$RUNNER_TEMP/canary-$refs.log" || rc=$?
            test "$rc" -eq 1   # 1 = findings present and every consistency check passed
            python3 -I "$scan" canary-check --report "$RUNNER_TEMP/canary-$refs.json" --refs "$refs"
          done

      - name: Scan the full history
        run: |
          set -euo pipefail
          rc=0
          python3 -I .github/scripts/secret_scan.py scan --gitleaks "$RUNNER_TEMP/gitleaks/gitleaks" --repo . \
            --config .gitleaks.toml --refs all --report "$RUNNER_TEMP/history.json" --log "$RUNNER_TEMP/history.log" || rc=$?
          if [ "$rc" -ne 0 ]; then
            echo "::error title=Secret scan::history scan status $rc (1 = findings, 2 = the scan could not be verified). Reproduce locally with the same options."
            exit "$rc"
          fi

      - name: Scan the working tree
        run: |
          set -euo pipefail
          rc=0
          python3 -I .github/scripts/secret_scan.py scan --gitleaks "$RUNNER_TEMP/gitleaks/gitleaks" --mode dir --repo . \
            --config .gitleaks.toml --report "$RUNNER_TEMP/tree.json" --log "$RUNNER_TEMP/tree.log" || rc=$?
          if [ "$rc" -ne 0 ]; then
            echo "::error title=Secret scan::tree scan status $rc (1 = findings, 2 = the scan could not be verified). Reproduce locally with the same options."
            exit "$rc"
          fi
```

Design notes:

- **Logs.** The wrapper prints counts, rule ids and fixed markers; the reports and logs stay in `$RUNNER_TEMP` and are
  never uploaded. `-v` is not allowed (3.3). The canary step's output contains no path.
- **Permissions and credentials.** `contents: read` at workflow level; `persist-credentials: false` so no token
  remains in the checkout's git configuration; no secret is referenced.
- **History reach.** `fetch-depth: 0` plus `--refs all`: on a push event the clone holds every remote branch and
  tag as `refs/remotes/origin/*` and `refs/tags/*`; on a pull-request event it also holds the merge ref.
- **Names.** File `secret-scan.yml`, workflow `Secret scan`, job id `secret-scan`, job name `Secret scan (gitleaks)`
  (the status-check context), concurrency group `secret-scan-<ref>`. The later `ci.yml` (`name: CI`, group
  `ci-<ref>`) shares none of them.
- **Upgrades.** Change `GITLEAKS_VERSION` and `GITLEAKS_LINUX_X64_SHA256` together from the new release's
  checksums file, re-run the canary locally, and confirm the hash in a second channel (the asset `digest` in the
  releases API) before committing. `actions/checkout` is updated by replacing the commit with the new tag's
  commit (a Dependabot `github-actions` entry can do it; not required).
- **Status check.** Making `Secret scan (gitleaks)` a required check on `main` is a repository setting, not part
  of this file.
- **Before the first commit** of the three files: from the repository root run the wrapper in `dir` mode with the
  Windows binary (`--mode dir --repo .`, expected `RESULT: CLEAN`, status 0). The history scan sees every commit,
  so a first commit that trips a rule keeps the job red until history is rewritten again.

## 7. Load-bearing claims

Outside-world claims the recommendation rests on. Versions: gitleaks v8.30.1; read 2026-10-20 unless stated.

1. **v8.30.1 is the newest release, published 2026-03-21, with a Windows x64 zip and a checksums file.**
   Quote (`gh release list --repo gitleaks/gitleaks --limit 4`): `v8.30.1	Latest	v8.30.1	2026-03-21T02:17:58Z`;
   asset names include `gitleaks_8.30.1_checksums.txt`, `gitleaks_8.30.1_linux_x64.tar.gz`,
   `gitleaks_8.30.1_windows_x64.zip`.
   Source: https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1 (API: `gh release view v8.30.1 --repo gitleaks/gitleaks --json assets,publishedAt,tagName`).
2. **Hashes of the two archives.**
   Quote (checksums file): `d29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e  gitleaks_8.30.1_windows_x64.zip`
   and `551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb  gitleaks_8.30.1_linux_x64.tar.gz`; asset
   digests `sha256:d29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e` and
   `sha256:551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb`.
   Source: https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_checksums.txt ; releases API.
3. **No signature or attestation exists for the release.**
   Quote (`gh release verify v8.30.1 --repo gitleaks/gitleaks`, gh 2.100.0): `no attestations for tag v8.30.1
   (sha1:83d9cd684c87d95d656c1458ef04895a7f1cbd8e)`; (`gh attestation verify gitleaks_8.30.1_windows_x64.zip
   --repo gitleaks/gitleaks`): `Error: HTTP 404: Not Found (https://api.github.com/repos/gitleaks/gitleaks/attestations/sha256:d29144deff3a68aa93ced33dddf84b7fdc26070add4aa0f4513094c8332afc4e?per_page=30&predicate_type=https%3A%2F%2Fslsa.dev%2Fprovenance%2Fv1)`;
   release API: `"immutable":false`; the asset list of claim 1 has no signature file.
   Source: GitHub CLI against https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1 ; `.goreleaser.yml` at v8.30.1
   (https://github.com/gitleaks/gitleaks/blob/v8.30.1/.goreleaser.yml).
4. **winget publishes the same zip with the same hash, and verifies it.**
   Quote (manifest): `InstallerUrl: https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_windows_x64.zip`
   / `InstallerSha256: D29144DEFF3A68AA93CED33DDDF84B7FDC26070ADD4AA0F4513094C8332AFC4E`; `InstallerType: zip` /
   `NestedInstallerType: portable`; docs (`--ignore-security-hash`): "Ignore the installer hash check failure. Not recommended."
   Source: https://github.com/microsoft/winget-pkgs/blob/master/manifests/g/Gitleaks/Gitleaks/8.30.1/Gitleaks.Gitleaks.installer.yaml ;
   https://learn.microsoft.com/en-us/windows/package-manager/winget/install (page dated 2026-07-19).
5. **Default git invocation and `--log-opts`.**
   Quote: `cmd = exec.CommandContext(ctx, "git", "-C", sourceClean, "log", "-p", "-U0",` /
   `"--full-history", "--all", "--diff-filter=tuxdb")`; and `args := []string{"-C", sourceClean, "log", "-p", "-U0"}` /
   `args = append(args, userArgs...)`.
   Source: `NewGitLogCmdContext`, https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/git.go
6. **README on `--log-opts`.**
   Quote: "Under the hood, gitleaks uses the `git log -p` command to scan patches. You can configure the behavior of
   `git log -p` with the `log-opts` option."
   Source: https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md ("Git" section).
7. **Deleted and binary files are skipped; one fragment per hunk.**
   Quote: `if gitdiffFile.IsDelete {` / `continue`; `// skip non-archive binary files`;
   `for _, textFragment := range gitdiffFile.TextFragments {`; and "Note: this number might be smaller than expected due to
   commits with no additions" (`logging.Debug().Msg("Note: this number might be smaller than expected due to commits with no additions")`).
   Source: `Git.Fragments` in `sources/git.go`; `Detector.DetectSource` in `detect/detect.go`, v8.30.1.
8. **Path-only rules.**
   Quote: `// Path _only_ rule` / `if r.Regex == nil && len(encodedSegments) == 0 {` ... `Match:       "file detected: " + fragment.FilePath,`
   Source: `Detector.detectRule`, https://github.com/gitleaks/gitleaks/blob/v8.30.1/detect/detect.go
9. **`dir` mode behaviour.**
   Quote: `// Empty; nothing to do here.` / `if info.Size() == 0 {` (`Files.scanTargets`); `} else if mimetype.MIME.Type == "application" {`
   and `const defaultBufferSize = 100 * 1_000 // 100kb` (`sources/file.go`); `Dir` README: "The `dir` (aliases include `files`,
   `directory`) command lets you scan directories and files."
   Source: https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/files.go and `sources/file.go`.
10. **Exit statuses.**
    Quote: `if err != nil {` / `os.Exit(1)` / `}` / `if len(findings) != 0 {` / `os.Exit(exitCode)`; README: "0 - no leaks present
    1 - leaks or error encountered 126 - unknown flag"; flag: `--exit-code int  exit code when leaks have been encountered (default 1)`.
    Source: `findingSummaryAndExit` in https://github.com/gitleaks/gitleaks/blob/v8.30.1/cmd/root.go ; README "Exit Codes".
11. **Output without `-v`.**
    Quote: `logging.Info().Msgf("%d commits scanned.", len(d.commitMap))`; `logging.Warn().Msgf("leaks found: %d", len(findings))`;
    `logging.Info().Msg("no leaks found")`; and `if d.Verbose {` / `printFinding(finding, d.NoColor)`.
    Source: `DetectSource` and `AddFinding` in `detect/detect.go`; `findingSummaryAndExit` in `cmd/root.go`, v8.30.1.
12. **Redaction.**
    Quote: `f.Line = strings.ReplaceAll(f.Line, f.Secret, secret)` / `f.Match = strings.ReplaceAll(f.Match, f.Secret, secret)`;
    `rootCmd.Flag("redact").NoOptDefVal = "100"`.
    Source: `Finding.Redact` in https://github.com/gitleaks/gitleaks/blob/v8.30.1/report/finding.go ; `cmd/root.go`.
13. **Report fields.**
    Quote: ``Line string `json:"-"` ``, `Match string`, `Secret string`, `File string`, `RuleID      string`, `Commit      string`.
    Source: `type Finding struct` in https://github.com/gitleaks/gitleaks/blob/v8.30.1/report/finding.go
14. **Configuration extension and allowlists.**
    Quote: `// append allowlists, not attempting to merge`; `errors.New("[allowlist] is deprecated, it cannot be used alongside [[allowlists]]")`;
    README: "In v8.25.0 `[allowlist]` was replaced with `[[allowlists]]`." and "Common allowlists can be defined once and assigned
    to multiple rules using |targetRules|." and "useDefault and path can NOT be used at the same time."
    Source: `Config.extend` and `ViperConfig.Translate` in https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/config.go ; README "Configuration".
15. **Default rules and default global allowlist.**
    Quote: `keywords = ["discord"]` with `([a-f0-9]{64})` (`discord-api-token`); `regex = '''(?i)-----BEGIN[ A-Z0-9_-]{0,100}PRIVATE KEY(?: BLOCK)?-----[\s\S-]{64,}?KEY(?: BLOCK)?-----'''`
    (`private-key`); `'''gitleaks\.toml''',` and `'''(?:^|/)\.git$''',` in `[allowlist]` `description = "global allow lists"`.
    Source: https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/gitleaks.toml
16. **MagicBot's configuration.**
    Quote: `[allowlist]` / `description = "Documentation may name the files these rules guard against"` / `paths = [` /
    `'''^README\.md$''',` / `'''^\.gitleaks\.toml$''',` / `'''^docs/.*\.md$''',`
    Source: `gh api repos/SpartanLaboratories/MagicBot/contents/.gitleaks.toml` (repository created 2026-10-20; public).
17. **git on merge commits and renames.**
    Quote: "unless one of `--diff-merges` variants (including short `-m`, `-c`, `--cc`, and `--dd` options) is explicitly given, merge
    commits will not show a diff, even if a diff format like `--patch` is selected"; `-m`: "Show diffs for merge commits in the
    default format."; `--no-renames`: "Turn off rename detection, even when the configuration file gives the default to do so."
    Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-log.adoc and `.../diff-options.adoc` (tag v2.55.0).
18. **`actions/checkout` v7.0.1 and its inputs.**
    Quote: "# Checkout v7" / "Safer fork pull request handling: checkout now refuses to check out fork pull request code by
    default when the workflow is triggered by `pull_request_target` or `workflow_run`."; "Set `fetch-depth: 0` to fetch all history for
    all branches and tags."; "Set `persist-credentials: false` to opt-out."; tag `v7.0.1` resolves to commit
    `3d3c42e5aac5ba805825da76410c181273ba90b1`, published 2026-07-20.
    Source: https://github.com/actions/checkout/blob/v7.0.1/README.md ; https://github.com/actions/checkout/releases/tag/v7.0.1
19. **GitHub's hardening guidance.**
    Quote: "**Pin actions to a full-length commit SHA**" / "This helps mitigate the risk of a bad actor adding a backdoor to the action's
    repository"; "It's good security practice to set the default permission for the `GITHUB_TOKEN` to read access only for repository contents."
    Source: https://docs.github.com/en/actions/reference/security/secure-use (source file
    https://raw.githubusercontent.com/github/docs/main/content/actions/reference/security/secure-use.md, `main`, 2026-10-20).
20. **Runner image.**
    Quote: "x64 | `ubuntu-latest` or `ubuntu-24.04`" (runner-images README table row for Ubuntu 24.04); "- Python 3.12.3"; "- Git 2.55.0".
    Source: https://raw.githubusercontent.com/actions/runner-images/main/README.md and
    https://raw.githubusercontent.com/actions/runner-images/main/images/ubuntu/Ubuntu2404-Readme.md (`main`, 2026-10-20).
21. **Organisation workflow conventions.**
    Quote (MyGameTools `ci.yml`): `permissions:` / `  contents: read`; `runs-on: ubuntu-latest`; `- uses: actions/checkout@v4`;
    triggers `push: branches: [master]`, `pull_request: branches: [master]`, `workflow_dispatch:`.
    Source: `gh api repos/SpartanLabsGaming/MyGameTools/contents/.github/workflows/ci.yml` (default branch `master`, 2026-10-20);
    GeneralTools `Build.yml`: `uses: actions/checkout@v2`.
22. **Discord bot-token structure.**
    Quote (Nostrum): "The first part is the Base64 encoded user_id which we decode and parse into as integer." and "The second part is
    an encoded timestamp, and the last part an arbitrary cryptographic signature."; (TruffleHog v3.99.3)
    ``keyPat = regexp.MustCompile(detectors.PrefixRegex([]string{"discord"}) + `\b([A-Za-z0-9_-]{24}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{27})\b`)``.
    Source: https://nostrum.hexdocs.pm/Nostrum.Token.html ;
    https://github.com/trufflesecurity/trufflehog/blob/v3.99.3/pkg/detectors/discordbottoken/discordbottoken.go
23. **`--max-target-megabytes` semantics.**
    Quote: `if d.MaxTargetMegaBytes > 0 {` / `rawLength := len(currentRaw) / 1_000_000` / `if rawLength > d.MaxTargetMegaBytes {` ...
    `Msg("skipping fragment: size")`; flag text `--max-target-megabytes int      files larger than this will be skipped`.
    Source: `Detector.detectRule`, v8.30.1 `detect/detect.go`; README flag list.
24. **`gitleaks git` exits 0 when `git log` fails (upstream reports).**
    Quote (issue 2129, v8.30.1): "`gitleaks git` treats **any** output on `git log`'s stderr as a fatal abort, then prints `0 commits scanned`,
    `no leaks found`, and **exits 0**."; (issue 1981): "When the `git` command called indirectly by `gitleaks git` or `gitleaks detect`
    fails, its exit code is ignored and `gitleaks` exists with `0` as if no issues happened."; source comment: `// Log the error and move on to the next fragment`.
    Source: https://github.com/gitleaks/gitleaks/issues/2129 ; https://github.com/gitleaks/gitleaks/issues/1981 (both open, 2026-10-20);
    `Detector.DetectSource`, v8.30.1.
25. **`tomllib` needs Python 3.11.**
    Quote: "Added in version 3.11: The module was added with support for TOML 1.0.0."
    Source: https://docs.python.org/3/library/tomllib.html (2026-10-20).
26. **Config discovery and `.gitleaksignore`.**
    Quote: "If none of the four options are used, then gitleaks will use the default config" (flag text of `--config`);
    `--gitleaks-ignore-path string   path to .gitleaksignore file or folder containing one (default ".")`;
    `logging.Debug().Msgf("no gitleaks config found in path %s, using default gitleaks config", ...)`.
    Source: `cmd/root.go` (`initConfig`, `Detector`), https://github.com/gitleaks/gitleaks/blob/v8.30.1/cmd/root.go

## 8. Known gaps and Considerations

**Known gaps**

- **The workflow has not run on GitHub.** Its commands were exercised with the Windows binary on throwaway
  repositories (checksum verification, tar member name and `sha256sum --check` were checked on the downloaded Linux
  archive; the Linux binary itself was not executed). No YAML linter was available; GitHub's parser is the
  confirmation. The first run is the confirmation of the canary and scan steps on Python 3.12.3 and Git 2.55.0.
- **The real histories were not scanned**, by design. The following are confirmed only by the first real run, each
  with its own STOP: that MagicBot's token regex matches each real token (6.7 probes); that `report_files ==
  git_files` holds on real data (default-allowlisted file extensions under a data directory, or an exotic file name,
  would break the equality and stop the run for a decision); that `commits_scanned == expected_commits` holds
  on 33-commit, 11-commit and 7 400-file histories; scan time and memory on TrumpBot (125 MB of blobs) and Support.
- **Default-rule findings in the kept source of the old repositories are unknown.** The documents were measured;
  the Kotlin and Java sources were not. A `generic-api-key` or similar hit in a kept path would make the
  "zero findings" exit criterion fail for a reason unrelated to the purge; the options at that point are a
  `targetRules` allowlist for the one rule and path (6.3) or a decision to accept and record it. This needs the
  owner's call if it occurs; nothing is pre-allowed.
- **BotTools and Support** have no expected finding, so their control is a negative baseline only (6.7).
- **Token shapes outside MagicBot's regex** (17-digit ids, `O`-prefixed ids, a 7-character middle part) are not
  matched; the path rules still flag the files, and the bots in these repositories date from 2022 onwards.
- **MagicBot's `.gitleaks.toml` differs** from this configuration by two missing path rules and one global
  allowlist that exempts `README.md` and `docs/**/*.md` from every rule (3.8). Aligning MagicBot is a change in
  another repository and is not part of this phase.
- **Attestation and signature are absent** for the release; if gitleaks later publishes attestations, `gh
  attestation verify` in G3 starts succeeding and can become a required step.
- **`-m` and `--no-renames`** are deviations from gitleaks' defaults chosen for coverage; if a future release
  changes how `commit <id> (from <id>)` headers or renames are parsed, the canary fails first.
- **Pull-request runs use the pull request's own guard files** (5.10); a required review is the control.

**Considerations**

None that blocks execution. The calls made in this document (separate workflow file, commit-pinned
`actions/checkout`, no schedule, no allowlist, `--no-renames -m`) are stated with their reasons in 3.11, 3.8, 3.2
and 6 and can be reversed one at a time without affecting the others.
