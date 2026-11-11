# gitleaks 8.30.1: a scoped allowlist table that suppresses exactly one known match

Researched 2026-11-11 for [KotlinBottools#24](https://github.com/SpartanLaboratories/KotlinBottools/issues/24).
Source of truth for tool behaviour: gitleaks at tag `v8.30.1` (commit `83d9cd684c87d95d656c1458ef04895a7f1cbd8e`), read through
a shallow clone in a scratch directory (`config/`, `detect/`, `sources/`, `cmd/`, `regexp/`, the shipped
`config/gitleaks.toml`, the README, `.goreleaser.yml`). Runs used the 8.30.1 Windows binary (sha256
`17157e2ee8b76fc8b1d8bee607a250e34b8a8023c8bc81822d4b5ee4d78fcb7c`) and the earlier findings' scan wrapper, on a
`--no-local` clone of this repository, on a canary built by the wrapper, and on throwaway fixtures whose credential is
generated at run time. Every output below is a count, a rule id or a fixed marker.

## 1. Question

How does gitleaks 8.30.1 apply an allowlist table that names one rule, one path and one captured text, and which table
suppresses exactly the one known match of the default rule `curl-auth-user` in one kept research document? The table must
leave the configuration of the earlier findings otherwise unchanged, must not be a global allowlist, must apply in
`gitleaks git` (both ref sets) and `gitleaks dir .` on Windows and Linux, must stay inert in the five legacy
repositories that are scanned with the same bytes, and must not hide a literal credential in the same document or the same
text in another file.

## 2. Bottom line

- **The table is attached to the rule, not global.** With `targetRules`, 8.30.1 files the table under each named rule id
  after `[extend]` has merged the default rules, and fails the load if an id does not exist. Evaluation is "any table
  of the rule or of the global list allows" (OR between tables); `condition` only governs the criteria inside one
  table. `condition = "AND"` with `paths` and `regexes` requires both to hold for the same finding.
- **Path:** an unanchored regular expression search (`MatchString`) on the file path with `/` separators in `git`
  mode, and on the `/`-normalised walk path in `dir` mode (plus the native `\` form on Windows, which the table need not
  use). `dir .` from the root gives `docs/...` with no prefix. Write the path as `^...\.md$` in slash form.
- **Regex:** the target defaults to the finding's secret. For `curl-auth-user` the secret is capture group 1, the whole
  credential argument with its quotes: `"x-access-token:$(gh auth token)"`, 33 characters (the 461-character match that
  spans the document's lines 804 to 807 is not the secret). Pin it with `^"x-access-token:\$\(gh auth token\)"$` in a
  TOML literal string; no escaping beyond the regex's own.
- **Proven by runs** with the proposed file (3360 bytes, sha256
  `9d0149e389991db6e893b4d198fe71bab6206b8e295517bca454877063a6f0b7`): both history variants and `dir .` print
  `RESULT: CLEAN`; the canary still prints `CANARY OK` with the findings' counts; a random literal credential at the same path,
  the same text at another path, the same text with one character changed, and the same text at a path with one more character
  before `.md` or one more leading directory are all still reported.
- **Misspelled keys are not errors.** Unknown keys are ignored, so a misspelled `targetRules`, `paths` or `regexes` silently
  widens the table (a global table that skips the whole document in `dir` mode; the same text in any file; the whole
  document for the rule). Only a wrong rule id, `condition`, `regexTarget`, an empty table, and `[allowlist]` beside
  `[[allowlists]]` in the same file fail loudly. The negative controls are the check that catches the silent cases.
- **Linux is not run.** What carries over is argued from source: the release binaries of both platforms are built from the
  same `.goreleaser.yml` with the same regular-expression engine, `git`-mode paths come from git and are slash-separated
  everywhere, and `dir`-mode paths on Linux are the slash form that Windows normalises to. The first run on the hosted
  runner is the proof.

## 3. Findings

Evidence tiers: **primary source** (gitleaks, its dependencies or the language's own code at a pinned tag), **observed**
(run with the 8.30.1 Windows binary, 2026-11-11), **practice** (what mature tools visibly do), **opinion** (one
maintainer's or one project's statement). Claim numbers refer to section 7.

### 3.1 How a `[[allowlists]]` table with `targetRules` attaches (primary source, v8.30.1; claims 1, 2)

- The user's configuration is read into a struct whose global list `Allowlists` holds every `[[allowlists]]` table.
  `Translate` parses each table (`parseAllowlist`), and a table with `targetRules` is put into a map keyed by rule id
  instead of the global list: "Allowlists with |targetRules| aren't added to the global list."
- The ids cannot be checked before the default rules are merged in, so the check is after `extend`, at extension depth 0:
  "It's not possible to validate |ruleID| until after extend." Then each table is appended to the named rule's own
  `Allowlists`, after the allowlists the rule already has. An id that is not in the merged rule set is a fatal load error:
  observed with an id one letter short, `Failed to load config error="[[allowlists]] target rule ID 'curl-auth-usr' does not
  exist"` (exit 1, no scan).
- Consequence: a **renamed or removed default rule is loud** (load error), because the id is validated at load. Nothing is
  validated about what the table's `paths` or `regexes` would match.

### 3.2 How `condition` combines `paths`, `regexes`, `commits` and `stopwords` (primary source and observed; claims 3, 7, 11, 14)

- `condition` accepts `AND` or `&&`, and `""`, `OR` or `||` (case-insensitive); anything else is a load error (observed:
  `unknown allowlist |condition| 'AN' (expected 'and', 'or')`). The default is `OR`.
- Evaluation has **two stages**:
  1. **File stage**, before the rule's regular expression runs (`checkCommitOrPathAllowed`, over the rule's tables, and
     over the global list before that): a table in `OR` mode allows the whole file for the rule if `commits` or `paths`
     match. A table in `AND` mode with `regexes` or `stopwords` defers ("These will be checked later"); an `AND` table
     with only `commits` and `paths` allows when every one of the criteria it defines holds.
  2. **Finding stage**, after a match is found, its secret group chosen and the entropy check passed
     (`checkFindingAllowed`): an `OR` table allows if `regexes` or `stopwords` match; an `AND` table allows only if every
     criterion it defines (`commits`, `paths`, `regexes`, `stopwords`, each only if non-empty) is true for this finding.
- Within one criterion, entries are joined by OR (`joinRegexOr`): one `paths` entry or one `regexes` entry matching is
  enough. A criterion that is left out is simply not checked.
- Observed with the table `condition = "AND"` removed (default `OR`): a literal credential at the same path was no longer
  reported, and neither was the same text in another file (the regex alone then allows it anywhere, and the path alone
  allows the whole file for the rule). `AND` is what makes the table "this rule, this path, this text".
- The shipped rule has an `[[rules.allowlists]]` of six placeholder regexes; ours is appended to them. A finding is
  allowed if any one of the rule's tables allows it, and the global list is asked first.

### 3.3 The path string, the separator and the anchoring (primary source and observed; claims 8, 9, 10, 11, 21)

- A path pattern is compiled from the TOML string as a Go regular expression and applied with `MatchString`: **unanchored**,
  a substring search. Anchor it with `^` and `$`. Observed: without `^`, a copy of the document at `x/<path>` was also
  suppressed; with the anchors it was reported.
- **`git` mode.** The fragment's `FilePath` is the new file name taken from git's diff, which is slash-separated on every
  platform; `WindowsFilePath` is empty. A pattern written with backslashes does not match here (observed: a
  backslash-form pattern left the history finding in place).
- **`dir` mode.** The walker passes OS-separated paths (Go's `filepath.WalkDir`, with `Join` cleaning each one). `Fragment.FilePath` is documented "The
  path separator MUST be normalized to `/`", and on Windows the file source sets `FilePath` to `filepath.ToSlash(...)` and
  keeps the native form in `WindowsFilePath`; the checks accept either. So the slash form matches on both platforms, and
  a pattern in backslash form matches only on Windows `dir` scans (observed: it suppressed in `dir`, not in `git`).
  `WindowsFilePath` carries a "remove this in v9" note, so only the slash form is durable.
- **Root of the walk.** `gitleaks dir .` from the repository root reports `docs/plans/...` with no `./` and, on Windows,
  no backslash (observed: the report's `File` equalled the slash path exactly). `gitleaks dir <absolute path>` yields
  absolute paths, the `^`-anchored pattern no longer matches, and the finding returns (observed; fail-closed).
- In `dir` mode there is one more path check, before any content is read: `shouldSkipPath` asks every **global** table
  whether `PathAllowed(path)` alone is true, ignoring `condition`. A table with `targetRules` is not in that list, which is
  why the proposed table does not drop the document from `dir` scans (observed: `bytes_scanned` is unchanged by the table).

### 3.4 The regex target and this rule's secret (primary source and observed; claims 4, 5, 6)

- `regexTarget` accepts `secret` (the default, the empty string), `match` and `line`; anything else is a load error
  (observed with `path`). `match` is the whole regular-expression match, `line` the text of the line(s) of the match.
- The secret is chosen in `detectRule`: the full match is first the secret, then "if `secretGroup` is not set, we will use
  the first suitable capture group", the first non-empty one of `groups[1:]`.
- `curl-auth-user` sets no `secretGroup`. Its credential part is one outer group that wraps three alternatives:
  `("(:[^"]{3,}|[^:"]{3,}:|[^:"]{3,}:[^"]{3,})"|'([^:']{3,}:[^']{3,})'|((?:"[^"]{3,}"|'[^']{3,}'|[\w$@.-]+):(?:"[^"]{3,}"|'[^']{3,}'|[\w${}@.-]+)))`.
  Group 1 is the whole credential argument **including its quotes**. Observed by running the binary without redaction on a scratch
  tree and comparing, by equality only: the report held one finding of the rule, `Secret` equal to the quoted
  command-substitution text and 33 characters long, `Match` 461 characters (not equal to the secret), `StartLine` 804 and
  `EndLine` 807. The same text is therefore the secret in every scan; the pinned regex must contain the quotes.
- The shipped rule's own placeholder allowlist does not cover this text (its patterns need `$VAR`, `$(...):$(...)`, a
  placeholder word after the colon, and so on), which is why the match is reported.
- Observed with the pinned regex under `regexTarget = "match"` or `"line"`: the finding was **not** suppressed (the
  anchored regex does not match the longer text), and with an unanchored regex under `"match"` it was. An explicit
  `regexTarget = "secret"` behaves as the default.

### 3.5 Recognised keys and unknown keys (primary source and observed; claims 12, 13)

- A table's recognised keys are `description`, `condition`, `commits`, `paths`, `regexTarget`, `regexes`, `stopwords`
  and, for `[[allowlists]]`, `targetRules`. `description` is a real field and is carried into the table; it is never
  printed in a scan report and has no effect on matching. The README's own example of a `targetRules` table carries a
  `description`.
- Unknown keys are **ignored**: gitleaks calls viper's `Unmarshal`, whose decoder does not set `ErrorUnused` (only
  `UnmarshalExact` does). Observed: an added `foo = "bar"` loaded and scanned as before.
- A table with none of `commits`, `paths`, `regexes`, `stopwords` is a load error (observed: `must contain at least one
  check for: commits, paths, regexes, or stopwords`).
- The silent failure modes are the ones that matter (all observed, fixtures below; "A" is a literal credential at the
  path, "B" the pinned text at another path, "D" the document as it is):

  | Change to the proposed table | git, all refs | `dir .` |
  |---|---|---|
  | none | A reported, B reported, D clean | the same |
  | `condition` removed (default OR) | A, B, D all clean | the same |
  | `targetRules` misspelled (table becomes global) | A reported, B reported, D clean | A and D: the whole file skipped for every rule (`no bytes scanned` in a one-file fixture); B reported |
  | `paths` misspelled (criterion dropped) | A reported, B clean, D clean | the same |
  | `regexes` misspelled (criterion dropped) | A clean, B reported, D clean | the same |
  | `regexTarget = "match"` or `"line"` with the anchored regex | D reported | D reported |
  | path pattern without `^` | A, B reported; a copy at `x/<path>` clean | the same |
  | path pattern in backslash form | D reported | D clean (Windows only) |
  | `dir` scan of an absolute path | | D reported |

### 3.6 Combination with the rule's allowlist, the default global allowlist, and the `[allowlist]` check (primary source and observed; claims 2, 14)

- Order for a finding: global allowlists first (the default `[allowlist]`: paths such as images, `go.sum`, `gradlew`,
  `gitleaks\.toml`; placeholder regexes; two stop words, all in `OR` mode), then the rule's allowlists (the shipped six
  placeholder regexes, then ours). The README: "Global allowlists have a higher order of precedence than rule-specific
  allowlists." One allowing table anywhere is enough; `AND` is evaluated only inside a table. None of the default
  global entries matches this secret or this path.
- **The `[allowlist]` / `[[allowlists]]` check does not cross `[extend]`.** The check is in `Translate`, comparing the
  fields of one parsed configuration. `extendDefault` parses the embedded default configuration into its own
  `ViperConfig` and translates it separately, so the default's `[allowlist]` table is never compared with the user's
  `[[allowlists]]`. Observed: the proposed file (`useDefault = true` plus `[[allowlists]]`) loads and scans; adding an
  `[allowlist]` table to the **same** file gives `[allowlist] is deprecated, it cannot be used alongside [[allowlists]]`.
  The default's `[allowlist]` is appended to the merged global list, and the user's tables are added to rules.
- The wrapper's `control` subcommand reads only `rules` from the configuration (`cfg.get("rules", [])`); its output on the
  canary's report is byte-identical under the §6.3 file and the proposed file (same sha256 of the output).

### 3.7 Is a `targetRules` id validated at load? (primary source and observed; claim 1)

Yes, at the top level after the extension is merged (3.1). A misspelled id, or one a later gitleaks version renames or
removes, stops the scan with exit status 1; the wrapper reports it as `GATE FAILED` (log has an `ERR`/`FTL` line, exit
status 1, scanned commits differ), so it cannot be mistaken for a pass.

### 3.8 TOML escaping of the regex (primary source, TOML 1.0; claim 20; observed)

- A TOML **literal string** has no escape processing: `'...'`, or `'''...'''` for the multi-line form the file already
  uses for every regex. So `\.`, `\$`, `\(` go to the regular-expression engine as written, and `"` needs no escape.
  A literal string cannot contain a single quote (here none is needed).
- In a **basic string** (`"..."`) the same pattern would need every backslash doubled; `"\."` is a TOML error
  (observed with `tomllib`: `TOMLDecodeError`).
- The regex is a Go/RE2 expression. `$` before the closing `'''` is the end anchor; `\$` is a literal dollar sign.
  The spaces in `gh auth token` are literal.

### 3.9 What could change in a later gitleaks version, and which check shows it (primary source, observed; claims 15, 16, 22)

State at 2026-11-11: `v8.30.1` (published 2026-03-21) is the newest release, and `master` is 26 commits ahead of it, none of
which changes a file under `config/`, `detect/`, `sources/` or `cmd/` (only CI, `README.md`, `SECURITY.md`, `go.mod`,
`go.sum`). The allowlist model dates from v8.25.0 (`[[allowlists]]`, `targetRules`) with v8.25.1 "test all allowlists"
and v8.28.0 promoting the allowlist optimizations.

| What a later version could change | Effect on the table | Visible as |
|---|---|---|
| The rule is renamed or removed from the default set | load error | `target rule ID ... does not exist`, `GATE FAILED` |
| The rule's capture structure changes (group 1 no longer the quoted credential, or a `secretGroup` is set) | the pinned regex stops matching; **fail-closed** | the one finding returns: `RESULT: FINDINGS` from the first scan |
| The rule changes so that the text is no longer matched, or its own allowlist covers it | table redundant | scans stay clean; the table is dead text (the negative controls still pass) |
| The default of `regexTarget` or of `condition` changes | `AND` unaffected; a changed regex target makes the anchored regex stop matching | finding returns |
| `targetRules` stops being honoured, or the key is renamed (also what a typo does today) | table becomes global: the document is skipped for all rules in `dir` mode | only the literal-credential control at the path (A) shows it, in `dir` mode |
| `WindowsFilePath` is removed (marked for v9) | none: the pattern uses the slash form | - |
| Unknown keys start to be rejected | load error | `GATE FAILED` |

The check that shows both a stopped and a widened table is the same run that proves the table: the suppression scans
(three `RESULT: CLEAN`) **and** the negative controls A, B, C, E, F (each still reported, A in `dir` mode as well as `git`
mode). It is run at any change of the gitleaks pin, of the rule set, or of the table.

### 3.10 How mature projects scope a false positive (primary source, practice, opinion; claims 17, 18, 19)

- gitleaks' own mechanisms for one known match: (a) `[[allowlists]]` with `targetRules` (the README's example),
  rule-level `[[rules.allowlists]]`, (b) a `.gitleaksignore` fingerprint, (c) an inline `gitleaks:allow` marker.
  (b) The fingerprint is `file:rule:line` in `dir` mode and for any commit, and `commit:file:rule:line` for one commit;
  the README calls the feature "experimental and is subject to change". It is bound to a line number and, for the
  commit form, to a commit id (the history here holds two commits, so two entries plus a `dir` entry), it has no place for a
  reason, and the file is looked up in the current directory or the scan source, so a bare-mirror scan from the
  workspace does not see it. A `file:rule:line` entry also hides any other match of that rule at that line. (c) The marker
  must be on a line of the match, which means editing the kept document, and does not reach the two historic commits.
- gitleaks' own repository uses a **global** `[allowlist]` of path regexes (`cmd/generate/config/rules`, `testdata`) for
  its rule-test fixtures, plus a long `.gitleaksignore` (claim 23): the broad form, which the scoped table avoids here.
- Other scanners offer a baseline file (detect-secrets `.secrets.baseline`) or an inline comment on the line
  (`# pragma: allowlist secret`; trufflehog's `trufflehog:ignore`): both are per-occurrence marks, none scoped by rule and
  path in a reviewed configuration file.
- **Justifying a suppression (practice):** the narrow form is one rule, one path, one captured text, with a stated
  reason in the file itself; the broad forms (a global path, a whole rule disabled) are what review should refuse. The
  proposed table follows that and states its reason in `description` and in the header.

### 3.11 Idiomatic Kotlin

Does not bear on this question.

## 4. How comparable projects do it

- **gitleaks README, `[[allowlists]]` with `targetRules`** (v8.30.1, `README.md` configuration section): "Our test assets trigger
  false-positives in a couple rules." with `targetRules = ["awesome-rule-1", "awesome-rule-2"]` and a `paths` entry: the
  documented form of a scoped table. The documented `AND` example pairs `regexes` with `paths` in a rule-level table.
- **gitleaks' own `.gitleaks.toml`**: `extend useDefault = true` and a global `[allowlist]` with three path regexes;
  an example of the broad form, correct for its test fixtures, wrong for a repository whose documents may one day hold a
  real credential.
- **MagicBot's configuration** (earlier findings, 3.8): a global `[allowlist]` on `README.md` and `docs/**/*.md`; measured to hide a
  pasted bot token in `docs/`. The scoped alternative in those findings (`targetRules`, one rule, one path) is the shape used here.
- **detect-secrets** (`Yelp/detect-secrets`, README): `secret = "hunter2"      # pragma: allowlist secret` and `.secrets.baseline`.
- **trufflehog** (`trufflesecurity/trufflehog`, README): a `trufflehog:ignore` comment on the line containing the secret.

## 5. Pitfalls and regrets

1. **A typo widens the table without an error** (3.5). `targetRules` misspelled turns it global (in `dir` mode the document is
   skipped for every rule, and a one-file scan then reports `no bytes scanned`, but a full-repository scan does not,
   because other files are scanned); `paths` misspelled lets the text through in any file; `regexes` misspelled hides
   the whole document from the rule. Only the negative controls show these.
2. **`condition` left at the default `OR`** hides the document for the rule and the text everywhere (3.2). `AND` is
   not optional.
3. **An unanchored path or regex is a substring search** (3.3, 3.4): `docs/...\.md` also matches `x/docs/...\.md`; an
   unanchored regex also matches a longer secret that contains the text.
4. **`regexTarget = "match"`/`"line"` change what the regex is compared with**: the anchored pin then never matches (3.4).
5. **`dir` scans of an absolute path** do not see the table apply (the finding returns). CI and the wrapper scan `dir .` from the
   root, so this only bites an ad hoc run; it fails closed.
6. **The pin is exact:** editing the command example in the document (a different variable name, one character) is a new match
   and the table does not apply. That is intended; the table's dead text should then be removed or re-pinned.
7. **The suppression is for this document at this text in every commit**, including any later commit that re-adds the same line;
   a literal credential added beside it is reported (control A).
8. **Line endings:** the Windows clone's document is CRLF on disk and the match still applies (the secret holds no line break); the
   configuration file itself is committed with LF and one trailing newline, and its regex lines sit inside one-line literal strings.
9. **The table is dead text if the rule stops matching**, and nothing reports that. The negative controls cannot show it either;
   the unused-allowlist question needs a periodic read of the configuration, not a scan.

## 6. Recommendation for this repository

Commit the file below as `.gitleaks.toml`: the earlier findings' §6.3 configuration with its header paragraph on allowlists
rewritten (the two sentences "There is no allowlist" and "the planning documents scan clean without one" are false once the
table exists) and one `[[allowlists]]` table appended at the end. The table is `AND` of one anchored slash-form path and one
anchored regex against the default target, the secret, which is the quoted credential. It is not a global allowlist, and
it is inert wherever the path or the text is absent, which includes every legacy repository. Rejected: a `.gitleaksignore`
fingerprint (line- and commit-bound, no reason, looked up by directory, line-number collision), an inline marker (edits the kept
document, misses history), a global path allowlist (hides every rule for the document), `OR` (hides the whole document), and
`regexTarget = "match"` (pins a 461-character text that includes the surrounding prose).

### 6.1 The complete file

LF line endings, one trailing newline, 3360 bytes, sha256 `9d0149e389991db6e893b4d198fe71bab6206b8e295517bca454877063a6f0b7`;
`tomllib` parses it (5 rules, one `[[allowlists]]` table with the keys `description`, `targetRules`, `condition`, `paths`,
`regexes`). Against the earlier findings' file only the header's allowlist paragraph (lines 9 to 16 now) and the appended table
differ.

```toml
# gitleaks configuration for KotlinBottools (gitleaks 8.30.1).
#
# Extends the default rule set with the rules MagicBot already uses for Discord bot tokens and for the
# bare token and data files the predecessor bots kept in their repositories, plus two path rules for
# file names and directories only the older repositories held (keys.txt, key.pem, logs/, services/,
# log.txt). Path-only rules match the file's path, never its content; they fire once per
# changed hunk of a file in `gitleaks git` and once per 100 kB chunk of a file in `gitleaks dir`.
#
# There is no global allowlist: a path allowlist would switch off every rule, the token and private-key
# rules included, for the paths it names. The one [[allowlists]] table at the end suppresses a single
# known false positive, the default rule curl-auth-user on one research document, where a command example
# reads the GitHub CLI's token at run time through a shell command substitution and so holds no
# credential. It names that rule, that path and the exact text the rule captures (condition = "AND"), so a
# literal credential in the same document, or the same text in another file, is still reported. Any further
# suppression is scoped the same way, to one rule and one path with `targetRules`, in its own
# [[allowlists]] table, and says why in `description`.
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

# --- The one scoped allowlist ------------------------------------------------------------------

[[allowlists]]
description = "One command example in a research document reads the GitHub CLI's token at run time through a shell command substitution, so it holds no credential; the rule's own match on it is not a secret"
targetRules = ["curl-auth-user"]
condition = "AND"
paths = ['''^docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/research/github-residual-exposure-and-visibility\.md$''']
regexes = ['''^"x-access-token:\$\(gh auth token\)"$''']
```

Check on any copy: `python -I -c "import hashlib,sys,tomllib;b=open(sys.argv[1],'rb').read();tomllib.loads(b.decode());print(len(b),hashlib.sha256(b).hexdigest(),b.count(b'\r'),b.endswith(b'\n') and not b.endswith(b'\n\n'))" .gitleaks.toml`
prints `3360 9d0149e3... 0 True`.

### 6.2 Commands and counts (Windows, 8.30.1, 2026-11-11)

Variables: `SS` is the wrapper, `GL` the binary, `CFG` the proposed file in a scratch directory, `W` a scratch directory. The
mirror `m.git` is `git clone --mirror --no-local` of this repository (91 commits, which include the branch's own).

```
# baseline, workspace configuration (no table)
python -I "$SS" scan --gitleaks "$GL" --repo m.git --config "$WS_CFG" --refs all      ...  commits_scanned=91 expected_commits=91 / findings=2 / rule curl-auth-user findings=2 files=1 / RESULT: FINDINGS
python -I "$SS" scan --gitleaks "$GL" --repo m.git --config "$WS_CFG" --refs branches ...  the same
python -I "$SS" scan --gitleaks "$GL" --mode dir --repo . --config "$WS_CFG"          ...  bytes_scanned=9514225 / findings=1 / rule curl-auth-user findings=1 files=1 / RESULT: FINDINGS
# proposed file
python -I "$SS" scan ... --repo m.git --config "$CFG" --refs all      ->  commits_scanned=91 expected_commits=91 / gitleaks_exit=0 error_lines=0 findings=0 / RESULT: CLEAN  (status 0)
python -I "$SS" scan ... --repo m.git --config "$CFG" --refs branches ->  the same
python -I "$SS" scan ... --mode dir --repo . --config "$CFG"          ->  bytes_scanned=9514225 / gitleaks_exit=0 error_lines=0 findings=0 / RESULT: CLEAN  (status 0)
```

In the baseline the two history findings are the commit that added the document (one parent) and the merge that carried it (two parents), and the
`dir` finding is in the same file. `bytes_scanned` equals the baseline: the document is still read, only the findings are dropped.

**Landed shape.** A second clone of `main` with the proposed bytes committed as `.gitleaks.toml` (92 commits) scanned from
its root with `--config .gitleaks.toml`: `--refs all`, `--refs branches` and `dir .` each print `RESULT: CLEAN` with status 0
(`commits_scanned=92 expected_commits=92`). With the workspace configuration the same tree still prints the one
`curl-auth-user` finding in `dir` mode (the committed file is skipped as the config and by the default `gitleaks\.toml`
path allowlist; a copy of it renamed to a `.txt` file also scans clean under a configuration that does not skip it).

**Canary.**

```
python -I "$SS" canary-make "$W/canary/src"                       # canary repository created, rc=0
git clone --quiet --mirror --no-local src canary.git              # rc=0
for refs in all branches: scan --config "$CFG" --refs $refs ...; canary-check --report ... --refs $refs
scan[all]      commits_scanned=6 expected_commits=6, findings=14; bare-token-file 1/1, discord-bot-token 5/4, legacy-bot-data-file 3/3,
               legacy-key-file 2/2, legacy-state-directory 2/2, private-key 1/1 (findings/files); canary-check: CANARY OK, status 0
scan[branches] commits_scanned=5 expected_commits=5, findings=13; discord-bot-token 4/3, the rest as above;                   CANARY OK, status 0
```

These are the findings' expected counts. The canary has no `curl-auth-user` finding and no document at the path: the table is
inert on it, as on a legacy repository. The wrapper's `control` subcommand prints identical output (same sha256) under the earlier file
and the proposed one.

**Negative controls** (throwaway repositories, one commit each; fixture A appends a fenced block to a copy of the document
that calls the HTTP tool with its user option and a name and a 16-character random password drawn at run time with
`secrets`; B is the document copied to `docs/other/copy.md`; C changes the last letter of `access` in the pinned text; C2 changes
the last letter of `token` inside the command substitution; D is the document unchanged; E is D at the path with `X` before `.md`; F is
D at `x/<path>`):

```
fixture                                   workspace config (git all / dir)        proposed config (git all / dir)
A  literal credential, same path          curl-auth-user 2 / 2  (original + literal)   curl-auth-user 1 / 1   (the literal)
B  same text, other path                  1 / 1                                          1 / 1
C  one character changed, same path       1 / 1                                          1 / 1
C2 one character changed, same path       1 / 1                                          1 / 1
D  the document unchanged                 1 / 1                                          RESULT: CLEAN / RESULT: CLEAN
E  path one character longer              1 / 1                                          1 / 1
F  path with a leading directory          1 / 1                                          1 / 1
```

Variant tables from 3.5 were run on the same fixtures with the rows listed there.

### 6.3 What the Windows runs leave unproven on Linux, argued from source

Not run: the 8.30.1 Linux binary. What is left unproven is only that platform-specific behaviour I read in source behaves
as read.

- **Same regular-expression engine.** `.goreleaser.yml` builds every release binary with the build tag `gore2regex`, which
  selects `github.com/wasilibs/go-re2` in `regexp/wasilibs_regex.go`; the Windows binary reports "using
  github.com/wasilibs/go-re2 regex engine" at debug level. The anchors, `\$`, `\(`, `\.` and the literal spaces are plain RE2.
- **`git` mode** takes `FilePath` from git's diff (`gitdiffFile.NewName`), slash-separated and without `WindowsFilePath` on any
  platform; the history scans therefore see the same path string on Linux as measured.
- **`dir` mode:** `isWindows` is false on Linux, so `FilePath` is the walk path as produced (`filepath.Join` cleans it, so `dir .`
  yields `docs/...`), which is already the slash form the Windows run normalises to; the pattern needs no change.
- **Line endings:** a Linux checkout is LF; the Windows run read CRLF and matched, and the secret has no line break, so LF is the
  simpler case.
- **Case:** the pattern is case-sensitive and the path in the repository is lower case throughout; Linux file names equal the tracked names.
- **Remaining risk:** only an implementation difference between the platforms' binaries that the source does not show, which the first run
  of the secret-scan workflow on the hosted runner closes (a `RESULT: CLEAN` there, and the negative controls run once against the
  Linux binary if they are to be repeated on that platform).

### 6.4 Rules for later suppressions

A further suppression is a second `[[allowlists]]` table in the same shape: one rule id in `targetRules`, `condition = "AND"`, an
anchored slash-form path, a pinned anchored regex against the secret, and a `description`; its negative controls (a literal credential
at the path, the same text elsewhere) are run before it lands.

## 7. Load-bearing claims

Pinned: gitleaks `v8.30.1` (`https://github.com/gitleaks/gitleaks/blob/v8.30.1/<path>`), viper `v1.19.0` (the version in gitleaks'
`go.mod`), TOML 1.0.0, Go 1.25.0 (standard library), read 2026-11-11.

1. **A `targetRules` table is not global and its ids are validated after `extend`.** `config/config.go`, `Translate`:
   "// Allowlists with |targetRules| aren't added to the global list." and "// It's not possible to validate |ruleID| until after extend." and
   `return Config{}, fmt.Errorf("[[allowlists]] target rule ID '%s' does not exist", ruleID)`.
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/config.go (v8.30.1)
2. **The `[allowlist]` / `[[allowlists]]` check is within one parsed configuration; the default configuration is translated separately.**
   `config/config.go`: `return Config{}, errors.New("[allowlist] is deprecated, it cannot be used alongside [[allowlists]]")`; and in
   `extendDefault`: `defaultViperConfig := ViperConfig{}` and `cfg, err := defaultViperConfig.Translate()`. The default
   configuration declares `[allowlist]` (`config/gitleaks.toml`: line `[allowlist]` followed by `description = "global allow lists"`).
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/config.go and https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/gitleaks.toml (v8.30.1)
3. **`condition` values.** `config/config.go`, `parseAllowlist`: `case "AND", "&&":` and `case "", "OR", "||":`, and
   `unknown allowlist |condition| '%s' (expected 'and', 'or')`.
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/config.go (v8.30.1)
4. **The regex target defaults to the secret.** `config/allowlist.go`: "// If RegexTarget is empty, it will be tested against the found secret."
   README: "# note: |regexes| defaults to check the _Secret_ in the finding."
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/allowlist.go and https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md (v8.30.1)
5. **Secret-group selection.** `detect/detect.go`, `detectRule`: `groups := r.Regex.FindStringSubmatch(finding.Secret)` and
   "// If |secretGroup| is not set, we will use the first suitable capture group."
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/detect/detect.go (v8.30.1)
6. **`curl-auth-user` has one outer credential group and no `secretGroup`.** `config/gitleaks.toml`, rule `curl-auth-user`:
   `(?:-u|--user)(?:=|[ \t]{0,5})("(:[^"]{3,}|[^:"]{3,}:|[^:"]{3,}:[^"]{3,})"|'([^:']{3,}:[^']{3,})'|((?:"[^"]{3,}"|'[^']{3,}'|[\w$@.-]+):(?:"[^"]{3,}"|'[^']{3,}'|[\w${}@.-]+)))(?:\s|\z)`
   (the rule's `entropy = 2` and `keywords = ["curl"]`; no `secretGroup` line).
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/gitleaks.toml (v8.30.1)
7. **Two-stage evaluation; `AND` with regexes defers.** `detect/detect.go`, `checkCommitOrPathAllowed`: "// These will be checked later." (before
   `if len(a.Regexes) > 0 {  continue }`) and `checkFindingAllowed`: "// If the condition is "AND" we need to check all conditions."
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/detect/detect.go (v8.30.1)
8. **Path checks use either path form.** `detect/detect.go`: `pathAllowed = a.PathAllowed(fragment.FilePath) || (fragment.WindowsFilePath != "" && a.PathAllowed(fragment.WindowsFilePath))`.
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/detect/detect.go (v8.30.1)
9. **Slash normalisation and the native form.** `sources/fragment.go`: "// The path separator MUST be normalized to `/`." and
   "// WindowsFilePath is the path with the original separator." and "// TODO: remove this in v9."; `sources/file.go`:
   `fragment.FilePath = filepath.ToSlash(fragment.FilePath)` and `fragment.WindowsFilePath = s.FullPath()`.
   https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/fragment.go and https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/file.go (v8.30.1)
10. **`git`-mode path source.** `sources/git.go`: `FilePath:   gitdiffFile.NewName,`.
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/git.go (v8.30.1)
11. **Path matching is an unanchored search; `dir` mode skips a file on a global table's path alone.** `config/allowlist.go`, `PathAllowed`:
    `return a.pathPat.MatchString(path)`; `sources/common.go`, `shouldSkipPath`: "// shouldSkipPath checks a path against all the allowlists to see if it can" and
    `for _, a := range cfg.Allowlists {` followed by `if a.PathAllowed(path) ||`.
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/allowlist.go and https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/common.go (v8.30.1)
12. **Unknown keys are not rejected: gitleaks uses `Unmarshal`, and only `UnmarshalExact` sets `ErrorUnused`.** `cmd/root.go`: `if err := viper.Unmarshal(&vc); err != nil {`;
    viper `viper.go`, `UnmarshalExact`: `config.ErrorUnused = true`; `defaultDecoderConfig` sets no `ErrorUnused`.
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/cmd/root.go and https://github.com/spf13/viper/blob/v1.19.0/viper.go (v8.30.1; viper v1.19.0)
13. **`description` is a recognised key.** `config/config.go`: `type viperRuleAllowlist struct {` with a `Description string` field, copied into `Allowlist.Description`; README:
    `description = "Our test assets trigger false-positives in a couple rules."` beside `targetRules = ["awesome-rule-1", "awesome-rule-2"]`.
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/config/config.go and https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md (v8.30.1)
14. **Precedence and OR across tables.** README: "# Global allowlists have a higher order of precedence than rule-specific allowlists." and
    "# A finding will be ignored if _ANY_ `[[rules.allowlists]]` matches." and "# When multiple criteria are defined the default condition is "OR"."
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md (v8.30.1)
15. **Release binaries use one regex engine, selected by a build tag.** `.goreleaser.yml`: "tags:" followed by "- gore2regex"; `regexp/wasilibs_regex.go`:
    "//go:build gore2regex" and `const Version = "github.com/wasilibs/go-re2"`; `regexp/stdlib_regex.go`: "//go:build !gore2regex".
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/.goreleaser.yml (v8.30.1)
16. **v8.30.1 is the newest release and the allowlist history.** `gh api repos/gitleaks/gitleaks/releases/latest --jq '.tag_name+" "+.published_at'` printed
    `v8.30.1 2026-03-21T02:17:58Z`; release notes v8.25.0: "feat(config): define multiple global allowlists (#1777)"; v8.25.1: "fix(detect): test all allowlists (#1845)";
    `gh api repos/gitleaks/gitleaks/compare/v8.30.1...master --jq '.files|map(.filename)'` listed only `.github/CODEOWNERS`, `.github/dependabot.yml`,
    `.github/workflows/gitleaks.yml`, `.github/workflows/release.yml`, `.github/workflows/test.yml`, `README.md`, `SECURITY.md`, `go.mod`, `go.sum` (26 commits ahead).
    https://github.com/gitleaks/gitleaks/releases (read 2026-11-11)
17. **Fingerprints and their lookup.** `detect/detect.go`, `AddFinding`: `globalFingerprint := fmt.Sprintf("%s:%s:%d", finding.File, finding.RuleID, finding.StartLine)` and
    `finding.Fingerprint = fmt.Sprintf("%s:%s:%s:%d", finding.Commit, finding.File, finding.RuleID, finding.StartLine)`; `cmd/root.go`:
    `"gitleaks-ignore-path", "i", ".", "path to .gitleaksignore file or folder containing one"`; README: "Note: this feature is experimental and is subject to change in the future."
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/detect/detect.go and https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md (v8.30.1)
18. **Inline marker is tested against the match's lines.** `detect/detect.go`: `if !d.IgnoreGitleaksAllow && strings.Contains(finding.Line, gitleaksAllowSignature) {` with
    `gitleaksAllowSignature = "gitleaks:allow"`.
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/detect/detect.go (v8.30.1)
19. **Other scanners' per-occurrence marks.** detect-secrets README: `secret = "hunter2"      # pragma: allowlist secret`; trufflehog README: "you can add a `trufflehog:ignore` comment on the line containing the secret to ignore that secrets."
    https://github.com/Yelp/detect-secrets/blob/master/README.md and https://github.com/trufflesecurity/trufflehog/blob/main/README.md (read 2026-11-11)
20. **TOML literal strings are unescaped; unknown escapes in basic strings are errors.** TOML 1.0.0: "Literal strings are surrounded by single quotes." and
    "Since there is no escaping, there is no way to write a single quote inside a literal string enclosed by single quotes." and
    "All other escape sequences not listed above are reserved; if they are used, TOML should produce an error."
    https://toml.io/en/v1.0.0 (TOML 1.0.0)
21. **Go walks with OS separators and cleans joined paths.** `path/filepath` `WalkDir`: "WalkDir calls fn with paths that use the separator character appropriate
    for the operating system."; `Join`: "Empty elements are ignored. The result is Cleaned."
    https://github.com/golang/go/blob/go1.25.0/src/path/filepath/path.go (Go 1.25.0; gitleaks `go.mod` says `go 1.24.11`)
22. **The configuration file named by `--config` is skipped, and the default allowlist skips `gitleaks.toml` paths.** `detect/detect.go`:
    `logging.Trace().Msg("skipping file: matches config or baseline path")`; `config/gitleaks.toml`: `'''gitleaks\.toml''',` in the default `[allowlist]` paths.
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/detect/detect.go (v8.30.1)

23. **gitleaks' own configuration scopes its test fixtures with a global path allowlist.** `.gitleaks.toml` at the tag: `[allowlist]` with `paths = [` and
    `'''(^|/)cmd/generate/config/rules''',` and `'''testdata'''`; its header: "This gitleaks config extends the default config and ignores secrets located in the `cmd/generate/config/rules`".
    https://github.com/gitleaks/gitleaks/blob/v8.30.1/.gitleaks.toml (v8.30.1)

## 8. Gaps

- **The Linux 8.30.1 binary was not run.** The Linux argument (6.3) is from source and from the shared build configuration; the first run on the
  hosted runner is the proof. The release's Linux tarball and its engine were not inspected.
- **The negative controls and the variant table were run through the `git` and `dir` modes on Windows only**, on one-commit throwaway repositories and
  on the clone of this repository; the merge-commit case of the real history is covered by the `-m` history scans, not by a separate fixture.
- **The legacy repositories were not scanned** (only scratch material was in scope). That the table is inert there rests on the canary, fixture B,
  and the source: the path pattern is anchored at a path those repositories do not have, and the text must also match.
- **Dead-table detection is not automated.** If the default rule later stops matching the text, the table stays as unused text and no scan reports it (3.9, pitfall 9).
- **`regexTarget` has no effect on a table without `regexes`**, and `stopwords` and `commits` were not exercised in runs; their behaviour here is from source only
  and the proposed table uses neither.
- The line numbers 804 to 807 are those of the measured tree; a later edit of the document above them moves the lines but not the secret, so the pin does not
  depend on them.
