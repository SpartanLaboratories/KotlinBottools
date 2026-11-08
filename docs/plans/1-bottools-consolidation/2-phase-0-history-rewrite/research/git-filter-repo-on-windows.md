# git-filter-repo 2.47.0 on Windows: install, run, check

Researched 2026-10-20 for [KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
Source of truth for tool behaviour: `git-filter-repo` at tag `v2.47.0` (the script, its manual and its
tests), read through a shallow clone in a scratch directory and through `raw.githubusercontent.com`.
Nothing was installed and the tool was not executed.

## 1. Question

How should `git filter-repo` 2.47.0 be installed, run and checked on this machine (Windows 11, Git Bash,
Python 3.14.7 from the python.org install manager, pip 26.2.1, git 2.55.0.windows.5) so that each mirror
clone is rewritten completely with `--sensitive-data-removal --invert-paths --paths-from-file`, the run's
outputs are kept outside every repository, and a failed, partial or silently ineffective run is detected
by an implementer who follows commands literally and never prints a path under `guildData/` or `logs/`?

## 2. Bottom line

- **Install with pip, user scheme, hash-pinned:** `python -m pip install --user --require-hashes
  --only-binary=:all: --no-deps -r <file containing git-filter-repo==2.47.0 --hash=sha256:2cd04929...5ad83>`.
  The user scheme puts `git-filter-repo.exe` in `%USERPROFILE%\AppData\Roaming\Python\Python314\Scripts`,
  which is already on the PATH that Git Bash sees. A plain (interpreter-scheme) install would put it in
  `...\pythoncore-3.14-64\Scripts`, which does not exist yet and is not on PATH. There is no winget
  package. The single-file route works but needs a PATH directory the user owns and gains no integrity.
- **Verify before any rewrite with two independent values:** `git filter-repo --version` prints a
  12-character git blob id, not "2.47.0"; it must be `a40bce548d2c`. The installed
  `git_filter_repo.py` must hash to sha256 `67447413...7d94`. Both values equal the upstream tag's script
  (GitHub API blob id; raw download), and the PyPI wheel's module is byte-identical to that script. The
  tag is unsigned and PyPI carries no attestation, so this cross-channel equality is the strongest
  integrity available.
- **Write path lists with Git Bash `printf '%s\n'`, then prove them byte-wise.** filter-repo reads the
  file as raw bytes, strips only `\r\n` per line, keeps a UTF-8 BOM and trailing spaces as part of the
  entry, and never warns when an entry matches nothing. A list that is empty, UTF-16 (PowerShell `>`), or
  has a stray character makes the run a silent no-op with exit status 0. Entries with spaces
  (`framed photo.png`) are read exactly. A bare name (`.project`) matches that file and a directory of
  that name, only at the repository root; a trailing slash (`res/`) matches only a directory.
- **Run in the fresh bare mirror with no `--force`, no `--partial`/`--refs`, stdin from `/dev/null`,
  output to a file.** In a `git clone --mirror` the flag's own "fetch all refs" step is skipped
  (`remote.origin.mirror=true`), `origin` is **kept** (the flag returns before the removal that other
  runs perform), and the printed push command is `git push --force --mirror origin`. Outputs are in
  `<mirror>/filter-repo/`.
- **Success is five conditions together, none of which reads purged content:** exit status 0; no
  `fatal:`/`error:`/`Traceback` line in the log; `commit-map` totals and the log's `You rewrote C (of T)`
  agree with `git rev-list --all --count` before and after; every purge entry counts 0 by `git rev-list
  --all --full-history --count -- ':(top,literal)<entry>'` after, and at least 1 before (except entries
  the plan declares absent); `origin` still present. Any failure means: delete the mirror, re-clone,
  never push.

## 3. Findings

Evidence tiers: **consensus** (several independent sources or a standard), **practice** (what mature
tools visibly do), **primary source** (the tool's own code at a pinned tag, which defines its behaviour),
**opinion/report** (one issue or post), **observed** (run on this machine today).

### 3.1 Version and packaging

- **Newest release is v2.47.0, published 2024-12-04; PyPI lists the same.** (primary source) The GitHub
  release API gives `"published_at":"2024-12-04T02:57:48Z"`, tag `v2.47.0`, one asset
  (`git-filter-repo-2.47.0.tar.xz`, no digest). PyPI JSON for 2.47.0: `requires_python` `>=3.6`, not
  yanked, files `git_filter_repo-2.47.0-py3-none-any.whl` (sha256
  `2cd04929b9024e83e65db571cbe36aec65ead0cb5f9ec5abe42158654af5ad83`) and
  `git_filter_repo-2.47.0.tar.gz` (sha256 `411b27e68a080c07a69c233cb526dbc2d848b09a72f10477f4444dd0822cf290`).
  The package has no dependencies (`requires_dist` is null). No signature, no provenance attestation
  (the integrity endpoint returns 404). The v2.47.0 tag is an unsigned annotated tag.
- **`main` is 27 commits past v2.47.0 (head 2026-07-09); no release since.** (primary source, compare API)
  Issue #638 ("Make a minor release?") has several requests for a release. None of the post-2.47.0 fixes
  applies to this run (3.5 lists each), so the release is used, not `main`.
- **The wheel's module equals the tag's script.** (observed) `git_filter_repo.py` extracted from the
  wheel is byte-identical (`cmp`) to `git-filter-repo` at the tag: 210 911 bytes, sha256
  `67447413e273fc76809289111748870b6f6072f08b17efe94863a92d810b7d94`, git blob id
  `a40bce548d2c0bd0b8d5e233e8930d462e35e495` (matches the GitHub contents API for the tag).
- **`--version` prints a blob-id prefix.** (primary source) `GitUtils.print_my_version` hashes the script
  (shebang normalised) with `git hash-object --stdin` and prints `version[0:12]`. For the unmodified
  2.47.0 script that is `a40bce548d2c` (derived; not executed).
- **hash-checking mode works on this pip.** (observed) With a requirements line
  `git-filter-repo==2.47.0 --hash=sha256:2cd0...5ad83`, `pip download --require-hashes --only-binary=:all:
  --no-deps` succeeds; with an all-zero hash it prints `ERROR: THESE PACKAGES DO NOT MATCH THE HASHES
  FROM THE REQUIREMENTS FILE` and exits 1. `pip install --dry-run --user ...` reports `Would install
  git-filter-repo-2.47.0` and writes nothing. pip's docs: hash-checking requires `==` pins and fails on
  any unhashed dependency, hence `--no-deps`.

### 3.2 Where things land on this machine (observed, read-only)

| Fact | Value |
|---|---|
| Interpreter | `%USERPROFILE%\AppData\Local\Python\pythoncore-3.14-64\python.exe`, Python 3.14.7, not a venv |
| Interpreter scheme `scripts` | `...\pythoncore-3.14-64\Scripts`; the directory does not exist; not on PATH |
| `nt_user` scheme `scripts` | `%USERPROFILE%\AppData\Roaming\Python\Python314\Scripts`; exists (holds `pipx.exe`, `userpath.exe`, ...) |
| User site | enabled (`python -m site`: `ENABLE_USER_SITE: True`); `pip list --user` already shows packages |
| Registry user PATH | contains `%USERPROFILE%\appdata\roaming\python\python314\scripts` and `%USERPROFILE%\AppData\Local\Python\bin` |
| PATH seen by this Git Bash | contains `%USERPROFILE%/appdata/roaming/python/python314/scripts` (so `command -v pipx` resolves there) |
| `python` in Git Bash | resolves first to the install manager's alias in `...\Microsoft\WindowsApps`, then `...\Local\Python\bin`; both run the same 3.14.7 interpreter; no non-functional store stub is hit |
| Now | `git filter-repo` → `git: 'filter-repo' is not a git command`; no `git-filter-repo` in `git --exec-path` (`C:/Program Files/Git/mingw64/libexec/git-core`, which is not user-writable) |
| `git config --list` | 21 entries (system + global), every line contains `=`, no multi-line values; parses under the 2.47.0 parser |
| Other tools present | pipx 1.17.12 (installed), no scoop, no uv; `winget` 1.29.380 |

### 3.3 Installation routes compared

- **pip, user scheme (chosen).** (practice: INSTALL.md lists PyPI; observed on this machine) Creates
  `git-filter-repo.exe` (distlib launcher bound to the 3.14 interpreter) in a directory already on PATH;
  `git` finds `git-<name>` executables on PATH, so `git filter-repo` works. Hash pinning is available.
- **pip, interpreter scheme.** (observed paths) Launcher lands in `...\pythoncore-3.14-64\Scripts`, off
  PATH; `git filter-repo` would fail until PATH is edited. Rejected.
- **pipx / uv tool.** (practice: INSTALL.md) Isolated venv plus a shim. pipx 1.17.12 is present. Hash
  pinning needs `--pip-args` and a requirements file; no benefit over `--user` here. Not chosen.
- **winget.** (observed) `winget search "filter-repo" --source winget` and `... "newren"` both print `No
  package found matching input criteria.`; a code search of microsoft/winget-pkgs for "filter-repo"
  returns nothing. No winget package exists. INSTALL.md names Scoop as the Windows package manager; Scoop
  is not installed.
- **Single file from the release/tag.** (practice: INSTALL.md "Simple Installation") Download one file,
  keep the name `git-filter-repo` (no extension), put it on PATH. On Windows it relies on the shebang
  `#!/usr/bin/env python3`, which resolves `python3` through PATH; INSTALL.md's Windows notes list a
  non-functional store stub, a missing `python3` name and an old shebang-length limit as failure causes.
  Exec-path (`C:/Program Files/Git/...`) needs elevation. It must be fetched with `curl`, not through a
  `git clone` here: `core.autocrlf=true` is set system-wide, and a CRLF shebang line breaks the script.
  It works, but offers no hash-checking mechanism beyond a manual `sha256sum`. Kept as the fallback if
  pip cannot be used.

### 3.4 How `--paths-from-file` is parsed at v2.47.0 (primary source)

`FilteringOptions.get_paths_from_file` opens the file `'br'` and, for each line:

| Input | Effect |
|---|---|
| line ending `\n` or `\r\n` | `line.rstrip(b'\r\n')`: both are removed, so CRLF is harmless |
| trailing space or tab | **kept** as part of the entry; the entry then matches nothing |
| leading space | kept; matches nothing |
| UTF-8 BOM | **not** stripped: the first three bytes join the first line; a first-line path no longer matches (a first-line comment becomes a literal entry) |
| UTF-16 file | every character is followed by NUL; no entry matches; no error |
| blank line | skipped |
| line starting `#` | skipped (to filter on a name that starts `#`, `literal:`, `glob:` or `regex:`, prefix `literal:`) |
| `==>` anywhere in the line | the line is a rename directive |
| prefix `regex:` / `glob:` | regex or glob match; `glob:` appends a second `dir/*` entry |
| `literal:` prefix or none | literal match (`literal:` is removed) |
| spaces inside a name | kept; the path in fast-export's stream is the whole rest of the line, so `framed photo.png` matches (quoting is only for `"`, `\`, control and high bytes, and `PathQuoting.dequote` handles both quoted and raw forms, so `core.quotepath` does not change matching) |
| leading `/`, `./`, `..`, backslash | **not validated** for list files; they match nothing, silently. Only the `--path` option validates (`Error: Pathnames cannot begin with a '/'`, rejects `.`/`..` components) |

Matching (`RepoFilter._filter_files` → `filename_matches`): an entry matches a path if the path starts
with the entry and either the entry ends in `/`, or the path equals the entry, or the next path
character is `/`. Case-sensitive, byte-wise, relative to the repository root.

- `.project` matches the file `.project` and anything under a directory `.project/` at the root, not
  `lib/.project` (that needs its own entry).
- `res/` matches only paths under the root directory `res/`; not `resources/...`, not
  `src/.../res/...`.
- `res` (no slash) matches `res`, and `res/...`; not `resources/...`.
- `bin/` does not match `lib/bin/...`; `lib/bin/` does.

With `--invert-paths`, a list with no `filter` entries (empty file, comments only, or all entries lost to
encoding) sets `args.inclusive = False`: "if we have no filtering paths, then no path should be filtered
out". Nothing is removed and the exit status is 0. A search of the script for a "matched nothing"
diagnostic finds none (`grep` for `no match`, `matched nothing`, `did not match`).

Windows editors: Windows PowerShell 5.1 `Out-File` (and therefore `>`) defaults to `unicode` = UTF-16
little-endian; `Set-Content` defaults to the ANSI code page. `FAQ.md` (on `main`, added after v2.47.0)
adds: use `/` never `\`, no absolute or `.`/`..` paths.

### 3.5 Windows and Python 3.13/3.14 problems (checked)

- **No removed stdlib module, no invalid-escape warning.** (observed) `python -I -W error` compiles the
  2.47.0 script on 3.14.7 without a `SyntaxWarning`; all modules it imports (`argparse, collections,
  fnmatch, gettext, io, os, platform, re, shutil, subprocess, sys, time, textwrap, unicodedata, datetime`)
  import cleanly. The one Python 3.14 defect (`\z` replacing `\Z` in `fnmatch.translate`) breaks
  `--replace-text` globs only (fixed on `main`, commit "fix --replace-text for python3.14", 2025-07-25;
  issue #673); this run does not use `--replace-text`.
- **Windows adds a subprocess wrapper.** (primary source) `if platform.system() == 'Windows': subproc =
  SubprocessWrapper` decodes bytes arguments; no behaviour is lost for ASCII path lists.
- **`fast-import` rejects NTFS-invalid names in kept history.** (report: issues #675 and #703, both on
  Windows) `fatal: invalid path 'frontend/assets/icons/sm:nose-glass.svg'` /
  `...features.csv:Zone.Identifier'`, then a Python traceback; the maintainer says the message "didn't
  come from filter-repo, but from the `git fast-import` subprocess". Paths that the list removes never
  reach fast-import. A kept path with `:`, a trailing dot or space, or similar would stop the run with a
  non-zero status.
- **`--analyze` can loop forever on Windows.** (report: issue #707, open) `write_report.dirnames()` ends
  when `os.path.dirname` returns `b''`; for a history path that begins with a drive-like prefix
  (`X:`...), `ntpath.dirname` never returns empty. The reporter's note: "For D:\\ it goes on infinite
  loop as os.path.dirname gives same result for drive letters in windows." Guard with `timeout`.
- **"Completely finished" does not prove a clean gc.** (report: issue #590) A run printed `fatal: failed
  to run pack-refs` and then `Completely finished after 13153.73 seconds.` Treat any `fatal:`/`error:`
  line as failure regardless of the final line.
- **Fixed after v2.47.0, none relevant here:** newline or valueless lines in `git config --list` crash
  `get_config_settings` (issues #684, #638; checked: this machine's config parses, and a one-line
  pre-check is in 6.4); LFS plus submodule crash under `--sensitive-data-removal` (applies only if
  `HEAD:.gitattributes` has `filter=lfs`; on the default branches, which are the mirrors' HEAD, the
  `.gitattributes` of KotlinBottools, BotTools, TrumpBot and Support contain no `filter=lfs`, and GKB2 and
  GKB have no `.gitattributes`; read through the GitHub contents API); `--sensitive-data-removal requires git >= 2.36.0`
  check; many-refs performance (reported in issue #638: about 3 900 tags and five hours; these repositories
  have a handful of refs); gpgsig parsing (git's `fast-export --signed-commits` defaults to `strip`, and 2.47.0 does not
  pass the flag, so signed commits are stripped silently and the stream carries no `gpgsig`).
- **Case-colliding refs abort the run.** (primary source `sanity_check`) On this machine
  `core.ignorecase` is `true` even in a bare mirror (observed in a scratch clone), so two refs that
  differ only in case abort with `Aborting: Cannot rewrite history on a case insensitive filesystem`.
  Issue #762 reports silent misbehaviour of case-only-different branch names; the abort is the
  defence. A stash ref also aborts (`has stashed changes`; issue #652).

### 3.6 What `--sensitive-data-removal` does at v2.47.0 (primary source)

- **Preconditions it enforces** (`RepoFilter.sanity_check`, skipped by `--force` and on a follow-up
  run): `GIT_DIR` must be `.` for a bare repository; refs must not collide in case; the repository must
  be freshly packed (`git count-objects -v`: at most one pack and fewer than 100 loose objects); exactly
  one remote, named `origin`; every reflog has at most one entry; no `refs/stash`. A `git clone --mirror`
  taken moments before satisfies all of them; any `git fetch`, `git gc`, extra remote or earlier filter
  run in the same mirror may not.
- **Fetch.** The all-refs fetch (`git fetch -q --prune --update-head-ok --refmap "" origin
  +refs/*:refs/*`) runs only when the flag is set, `--no-fetch` is absent, it is not a follow-up run, and
  `remote.origin.mirror` is not `true`. `git clone --mirror` sets `remote.origin.mirror=true`
  (`builtin/clone.c`, git 2.55.0), so **no fetch happens in a mirror clone**; the clone itself fetched
  `refs/*`. (If the fetch were to run and fail it would only print `WARNING: Fetching all refs from
  origin failed` and continue.)
- **`origin` is kept.** `_migrate_origin_to_heads` contains `if self._args.sensitive_data_removal:
  return` immediately before the code that removes the `origin` remote. The manual's "Why is my origin
  removed?" describes the non-flag path; GitHub's procedure goes straight from filter-repo to `git push
  --force --mirror origin` with no `git remote add`. A `git remote add origin ...` after a flagged run
  would fail with `remote origin already exists`.
- **Files written** into `<git-dir>/filter-repo/`, which is `<mirror>/filter-repo/` in a bare mirror
  (`results_tmp_dir`): `commit-map`, `ref-map`, `changed-refs`, `first-changed-commits`,
  `suboptimal-issues`, `already_ran`, and an empty `sensitive_data_removal`; plus `original_lfs_objects`
  and `orphaned_lfs_objects` only when LFS is in use. Formats:
  - `commit-map`: header `old` padded to 40 characters + space + `new`; then `<old> <new>` for **every**
    commit in range, unchanged ones included; the all-zero hash in `new` means the commit was pruned.
  - `ref-map`: header `old`/`new`/`ref`; then `<old> <new> <refname>` sorted by ref; all-zero `new` means
    the ref was deleted.
  - `changed-refs`: refnames whose hash changed, one per line, no header.
  - `first-changed-commits`: `<old commit> <new commit or zeros>` per line (the manual describes only
    the commit, the code writes two columns); the printed note lists the old commits.
  - `suboptimal-issues`: `No filtering problems encountered.` or the commits that stopped being merges or
    are referenced in messages after removal.
- **Printed (stdout), in order:** progress `Parsed N commits` (carriage-return updates);
  `New history written in S seconds; now repacking/cleaning...`; `You rewrote C (of T) commits.`; a
  blank line; `NOTE: First Changed Commit(s) is/are:` and the old hashes; `NOTE: LFS object orphaning
  not checked (LFS not in use)`; a blank line; `Repacking your repo and cleaning out old unneeded
  objects`; git's reflog/gc output; `Completely finished after S seconds.`; then the block starting
  `NEXT STEPS FOR YOUR SENSITIVE DATA REMOVAL:` whose push line is `git push --force --mirror origin`. C
  counts commits whose id changed **including pruned ones**; T is the number of commits processed.
- **Cleanup it performs** (bare mirror, so no `reset --hard`): `git reflog expire --expire=now --all`,
  `git gc --prune=now`. The mirror therefore no longer holds the old objects; a separate untouched copy
  is the only place a positive control can read them.
- **Exit status.** Success: falls off `main()`, status 0. Every `SystemExit("message")` (fresh-clone
  abort, `Error: fast-export failed`, `Error: fast-import failed`, `fatal: running 'git gc' failed!`) and
  every uncaught exception exits 1 (Python: "any other object is printed to stderr and results in an
  exit code of 1"); argparse usage errors exit 2; `--version`, `-h` exit 0. A failure after the ref
  update (the gc step) leaves a rewritten mirror with metadata written.
- **Re-runs.** `already_ran` makes a second invocation a continuation that skips the fresh-clone check; if
  the file is older than a day filter-repo calls `input()` with `(Y/N)?`. `--sensitive-data-removal` on a
  follow-up of a run that did not use it is refused. A mirror is therefore used for one invocation only.

### 3.7 `--analyze` (primary source)

- Writes, to `<git-dir>/filter-repo/analysis/` (bare mirror: `<mirror>/filter-repo/analysis/`) or to
  `--report-dir <dir>` (created with a single `mkdir`, so the parent must exist; an existing directory is
  an error unless `--force`, which deletes it recursively): `README`, `renames.txt`,
  `directories-all-sizes.txt`, `directories-deleted-sizes.txt`, `extensions-all-sizes.txt`,
  `extensions-deleted-sizes.txt`, `path-all-sizes.txt`, `path-deleted-sizes.txt`,
  `blob-shas-and-paths.txt`.
- Formats (sizes are right-aligned in a 10-character field; the date field is 10 characters wide and is
  `<present>` when the path still exists at the tip, else a `YYYY-MM-DD`):
  - `path-all-sizes.txt`: two header lines, then `"  %10d %10d %-10s %s"` = unpacked bytes, packed
    bytes, date deleted, path. The path starts at **column 36**, so `tail -n +3 | cut -c36-` yields paths.
  - `path-deleted-sizes.txt`: same layout, only deleted paths.
  - `blob-shas-and-paths.txt`: header `=== Files by sha and associated pathnames in reverse size ===` and
    `Format: sha, unpacked size, packed size, filename(s) object stored as`; then `  <sha> %10d %10d
    <path>` (several paths as `[p1, p2]`), sorted by packed size, largest first.
  - `directories-*`, `extensions-*`: `unpacked, packed, date, name`.
- It only reads. It does not run the fresh-clone check, does not create `already_ran`, and prints only
  `Processed N blob sizes`, `Processed N commits` and `Writing reports to <dir>...done.` — a directory
  name, no history path. The reports themselves contain every path that ever existed.
- The rename-detection pipeline is `git rev-list --topo-order --reverse --all | git diff-tree --stdin ...`
  run through the shell; on Windows that is `cmd.exe`.

### 3.8 Pruning (primary source: manual and `RepoFilter._prunable`)

- `--prune-empty auto` (default): a commit that **had** file changes and has none after filtering is
  pruned; a commit that was empty originally is kept unless its parent was pruned; its children are
  re-parented to the nearest surviving ancestor. A root commit that becomes empty is pruned and its child
  becomes a root.
- A merge commit with at least two surviving distinct parents is **never** pruned, even if it becomes
  empty. `--prune-degenerate auto` (default) only removes parents that became redundant (duplicate,
  or an ancestor of another parent) from merges that were not degenerate to start with; a merge that
  loses a parent and is then empty is pruned, one that keeps two parents stays.
- Branches whose commits are all pruned are deleted (new hash all zeros in `ref-map`).
- Prediction rule for the runbook: pruned count P = commits whose entire change set lies inside the purge
  list (non-merge); N_after = T − P; every commit after the first rewritten one gets a new id.

## 4. How comparable practice does it

- **filter-repo's own procedure** (manual, "Sensitive Data Removals" and DISCUSSION steps): fresh clone
  (`--bare` or `--mirror` allowed, "avoid other flags"), optional `--analyze` before and after, run with
  `--sensitive-data-removal`, inspect with `git log --all --name-status -- <paths>`, then `git push
  --force --mirror origin`. Its fresh-clone check is "the primary defense"; `--force` is described as a
  habit to avoid.
- **GitHub's documented procedure** (`removing-sensitive-data-from-a-repository`, on `main`): install
  "at least version 2.47", plain `git clone`, `git-filter-repo --sensitive-data-removal --invert-paths
  --path PATH`, count PR refs with `grep -c '^refs/pull/.*/head$' .git/filter-repo/changed-refs`, then
  `git push --force --mirror origin`, then the Support steps (not used here). It installs with Homebrew
  and points to INSTALL.md for other platforms. A plain clone relies on the flag's all-refs fetch; a
  mirror clone has already fetched `refs/*`, so the two are equivalent in what gets rewritten.
- **Windows users** are told (INSTALL.md): use pipx or Scoop, or put the single file on PATH, and
  otherwise run `python3 git-filter-repo ...` directly. The tracker shows Windows users hitting the cases
  in 3.5.
- **Approaches that fail in practice:** BFG (matches base names, spares HEAD; parent research), `git
  filter-branch`, `--path` with `./` or absolute names, lists saved by Windows tools, `--force` on a
  non-fresh clone, re-running in a used clone, and taking "Completely finished" as success.

## 5. Pitfalls and regrets

1. **Exit status 0 with nothing removed.** Empty, UTF-16, BOM-prefixed or misspelled lists do exactly
   this. Only a before/after count per entry and `C >= 1` expose it.
2. **Pipelines hide the exit status.** `git filter-repo ... | tee log` reports `tee`'s status. Redirect
   to a file and read `$?` on the next line.
3. **`origin` assumption.** Runbook text that says "filter-repo removed `origin`, add it back" is wrong
   for `--sensitive-data-removal`; the add fails and a literal implementer stops needlessly.
4. **The log and the analysis reports are not safe to print.** Tracebacks and `fast-import` errors can
   carry a path; analysis files carry every path. Print only counts and fixed marker lines.
5. **`commit-map`, `first-changed-commits`, `ref-map` and the log hold pre-rewrite commit ids.** They
   stay in the local outputs directory; none is committed or quoted in a document that becomes public.
6. **Prompts.** `input()` is reached on a stale `already_ran`. `</dev/null` turns a hang into an
   `EOFError` traceback with status 1.
7. **Windows path separators and drive letters.** `\` or `D:` in a list entry matches nothing; pass
   files to native programs as `D:/...` (via `cygpath -m`), not as `/d/...` inside quoted strings.
8. **Git Bash `$'\r'` is unreliable through some tool wrappers** (a `grep -c $'\r'` counted every line).
   Count carriage returns with `tr -cd '\r' < file | wc -c`.
9. **pip output uses CRLF** when piped (`pip show` → `Location: ...\r`); strip with `tr -d '\r'`.
10. **A shell session started before the install may not see the new launcher** (`hash -r`, or a new
    shell). The user PATH entry already exists, so a restart is not needed on this machine.

## 6. Recommendation for this repo

Shell: Git Bash. `WS` = the dedicated workspace (mirrors, lists, rehearsal; deleted at the end), `OUT` =
the outputs directory, a sibling of `WS` that outlives it, both outside every project folder and both
short paths on `D:`. `REPO` = the repository name. Neither contains a repository working tree. A step's
**STOP** means: do not continue, do not push, report the step and the command's exit status (not the
content), and for a rewrite step discard the mirror.

### 6.1 Install (once)

```bash
python --version                          # Python 3.14.7
python -m pip --version                   # pip 26.2.1 from %USERPROFILE%\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages\pip (python 3.14)
git --version                             # git version 2.55.0.windows.5
command -v git-filter-repo; echo "rc=$?"  # prints only: rc=1      (anything else before the install: STOP)
mkdir -p "$WS/tools" && cd "$WS/tools"    # a directory that is not inside a repository
printf '%s\n' 'git-filter-repo==2.47.0 --hash=sha256:2cd04929b9024e83e65db571cbe36aec65ead0cb5f9ec5abe42158654af5ad83' > filter-repo-requirements.txt
python -m pip install --user --require-hashes --only-binary=:all: --no-deps --no-cache-dir --disable-pip-version-check -r filter-repo-requirements.txt
```

Expected: `Collecting git-filter-repo==2.47.0 ...`, `Downloading git_filter_repo-2.47.0-py3-none-any.whl (76 kB)`,
then `Successfully installed git-filter-repo-2.47.0` (the last line is pip's standard text; the first
two were observed in a download run). Exit status 0. STOP on `THESE PACKAGES DO NOT MATCH THE HASHES`,
on any other `ERROR:`, or on a non-zero status.

### 6.2 Verify the installation (before any rewrite)

```bash
hash -r
command -v git-filter-repo                # a path ending .../python314/scripts/git-filter-repo (case-insensitive); else STOP
git filter-repo --version; echo "rc=$?"   # exactly two lines:  a40bce548d2c   then   rc=0
python -m pip show git-filter-repo | tr -d '\r' | grep -E '^(Name|Version):'   # Name: git-filter-repo / Version: 2.47.0
FR_LOC="$(python -m pip show git-filter-repo | sed -n 's/^Location: //p' | tr -d '\r')"
sha256sum "$(cygpath -u "$FR_LOC")/git_filter_repo.py"
# 67447413e273fc76809289111748870b6f6072f08b17efe94863a92d810b7d94 *.../git_filter_repo.py
```

Independent cross-checks of the two constants (run once, from a directory outside every repository):

```bash
gh api "repos/newren/git-filter-repo/contents/git-filter-repo?ref=v2.47.0" --jq .sha   # a40bce548d2c0bd0b8d5e233e8930d462e35e495
curl -sSL https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/git-filter-repo | sha256sum   # 67447413...7d94
```

STOP if any value differs. Record `python --version`, `git --version`, the `--version` line and the
sha256 in `$OUT/tool-versions.txt`.

Rehearsal on a throwaway fixture (confirms the tool, the list parsing and the checks on this machine
before real data; the numbers are derived from the source, and the rehearsal's first execution is what
confirms them):

```bash
cd "$WS" && mkdir rehearsal && cd rehearsal && git init -q -b main fixture && cd fixture
git config user.name rehearsal && git config user.email rehearsal@example.invalid && git config core.autocrlf false
mkdir -p res lib/bin src/main/kotlin/bottools/services
for f in key.txt "framed photo.png" "res/a b.png" .project lib/.project lib/bin/x.class keep.txt src/main/kotlin/bottools/services/S.kt; do echo 1 > "$f"; done
git add -A && git commit -qm "fixture 1" && echo 2 >> keep.txt && git commit -qam "fixture 2" && echo 2 >> key.txt && git commit -qam "fixture 3"
cd .. && git init -q --bare origin.git && git -C fixture push -q ../origin.git main && git clone -q --mirror --no-local origin.git work.git
printf '%s\n' 'key.txt' 'framed photo.png' 'res/' '.project' 'lib/bin/' > purge.txt
```

Then run 6.4–6.6 on `work.git` with `REPO=rehearsal`. Expected: `T=3`, per-entry before counts `2 1 1 1 1`
(`key.txt`, `framed photo.png`, `res/`, `.project`, `lib/bin/`), `lib/.project` before and after `1` (a
bare `.project` is root-anchored), log `You rewrote 3 (of 3) commits.`, `commit-map` 3 data lines of
which 1 ends in 40 zeros, `N_after=2`, all entry counts 0 after, `changed-refs` = `refs/heads/main`,
`origin` retained. A negative control: write the same entries as UTF-16 with Windows PowerShell
(`powershell.exe -NoProfile -Command "Get-Content purge.txt | Out-File purge-utf16.txt"`), confirm the
6.3 proofs reject that file (non-ASCII byte count above 0), then run the 6.5 command with it in a
fresh clone anyway; expected `You rewrote 0 (of 3) commits.` and status 0, which the 6.6 checks reject. Delete `$WS/rehearsal` afterwards.

### 6.3 Write and prove each path list

```bash
mkdir -p "$WS/lists" && LIST="$WS/lists/$REPO-purge.txt"
printf '%s\n' 'key.txt' 'framed photo.png' 'res/' ... > "$LIST"     # one quoted argument per entry, from the plan's list for $REPO
```

Proofs (all counts; the entries are fixed names from the plan, never history paths):

```bash
wc -c < "$LIST"                                          # must equal the byte count recorded in the runbook for this list
sha256sum "$LIST"                                        # must equal the sha256 recorded in the runbook for this list
od -c "$LIST" | head -n 5                                # visual: entries separated by \n only, no \r, no leading bytes before the first name
tr -cd '\r'  < "$LIST" | wc -c                           # 0   (no carriage return)
LC_ALL=C tr -d '\000-\177' < "$LIST" | wc -c             # 0   (pure ASCII: no BOM, no UTF-16, no non-ASCII)
tr -cd '\0' < "$LIST" | wc -c                            # 0   (no NUL)
tail -c 1 "$LIST" | od -An -c                            # \n  (ends with a newline)
LC_ALL=C grep -c -v -E '^[A-Za-z0-9._ /-]+$' "$LIST"     # 0   (only the allowed characters; no ':' '\' '=' '>' '*' etc.)
LC_ALL=C grep -c -E '(^ | $|^/|//|(^|/)\.\.?(/|$)|(^| )(literal|glob|regex):|^#| /|/ )' "$LIST"   # 0
LC_ALL=C grep -c -E '^$' "$LIST"                         # 0   (no blank lines)
wc -l < "$LIST"                                          # equals the number of entries in the plan
```

(`grep -c` exits 1 when it counts 0; read the printed number, not the status.) STOP on any mismatch.
The sha256 and byte count of each list are computed once when the plan fixes the list and are written
into the runbook beside it. If the list must be authored elsewhere, any tool is acceptable as long as
every line above passes; a PowerShell-written file passes only if saved as single-byte text with LF or
CRLF line endings and no BOM, which the proofs detect.

`--path` arguments are not used: they validate a leading `/` and `.`/`..`, but a command line cannot be
hash-pinned or archived, and the character-set proof above gives the same protection for a file.

### 6.4 Pre-run checks in the mirror

`git clone --mirror <url> "$WS/$REPO.git"` (add `--no-local` only for a local source); then immediately,
before any other git command that could change the repository, copy it for the untouched backup the plan
needs (`cp -a`) and run:

```bash
cd "$WS/$REPO.git"
test "$(git rev-parse --is-bare-repository)" = true          || echo STOP
test "$(git remote)" = origin                                 || echo STOP
test "$(git config --get remote.origin.mirror)" = true        || echo STOP     # set by git clone --mirror
test ! -e filter-repo                                         || echo STOP     # a fresh mirror has no filter-repo directory
test -z "$(git for-each-ref refs/stash)"                      || echo STOP
git count-objects -v | grep -E '^(count|packs):'              # count: < 100   and   packs: <= 1
git for-each-ref --format='%(refname)' | tr 'A-Z' 'a-z' | sort | uniq -d | wc -l       # 0   (no case-colliding refs)
git config --list | grep -c -v '='                            # 0   (a valueless or continuation line crashes 2.47.0)
R_BEFORE=$(git for-each-ref | wc -l)                          # record
N_BEFORE=$(git rev-list --all --count)                        # record
while IFS= read -r e; do printf '%s %s\n' "$(git rev-list --all --full-history --count -- ":(top,literal)$e")" "$e"; done < "$LIST"
```

Every printed `STOP` means stop. Each per-entry count must be at least 1, except entries the plan
declares absent in this repository (an entry that was expected to exist and counts 0 is a typo or a
case/rename mismatch). The count uses git's own pathspec matcher (root-anchored, `literal` magic), not a
re-implementation, and prints no history path. `--full-history` is required: without it a branch merged
with no net change can hide the commits that added and removed a file.

Optional discovery of history-only paths (a pitfall recorded in `bot-repository-history-purge.md` section 5), with the report outside the
mirror and a time limit:

```bash
mkdir -p "$WS/analysis" && timeout 900 git filter-repo --analyze --report-dir "$(cygpath -m "$WS/analysis/$REPO-before")" </dev/null >"$WS/analysis/$REPO-before.log" 2>&1; echo "rc=$?"   # rc=0; 124 = STOP
ls "$WS/analysis/$REPO-before" | wc -l                        # 9
tail -n +3 "$WS/analysis/$REPO-before/path-all-sizes.txt" | cut -c36- > "$WS/analysis/$REPO-before.paths"
wc -l < "$WS/analysis/$REPO-before.paths"                     # number of distinct paths ever present
awk -f "$WS/tools/count-entries.awk" "$LIST" "$WS/analysis/$REPO-before.paths"   # "<hits> <entry>" per entry, then "uncovered <n>"
```

`$WS/tools/count-entries.awk` (saved once from the block below) mirrors `filename_matches` (prefix, then end/`/` boundary, or entry ends in `/`):

```awk
FNR==NR { e[++n]=$0; next }
{ covered=0
  for (i=1;i<=n;i++) { le=length(e[i])
    if (substr($0,1,le)==e[i] && (substr(e[i],le,1)=="/" || length($0)==le || substr($0,le+1,1)=="/")) { hit[i]++; covered=1 } }
  if (!covered) unc++ }
END { for (i=1;i<=n;i++) printf "%d %s\n", hit[i]+0, e[i]; printf "uncovered %d\n", unc+0 }
```

Never `cat`, `head`, `less` or `sed -n p` anything under `$WS/analysis/`; only the counting pipelines
above (final stage `wc -l`, `grep -c`, `awk` printing numbers) are allowed. Delete `$WS/analysis` at the
end. Windows hazard counts, for kept paths that would stop `fast-import`: `awk` over `*.paths` printing the
count of lines matching `[:*?"<>|\\]` that no entry covers must be 0.

### 6.5 The invocation

```bash
cd "$WS/$REPO.git" && mkdir -p "$OUT/$REPO"
git filter-repo --sensitive-data-removal --invert-paths --paths-from-file "$(cygpath -m "$LIST")" \
    </dev/null >"$OUT/$REPO/filter-repo.log" 2>&1
RC=$?; echo "rc=$RC"
```

Exactly these options. Not used, on purpose: `--force`, `--partial`, `--refs`, `--no-fetch`,
`--replace-refs`, `--prune-empty`/`--prune-degenerate` (defaults wanted), `--path-*`, `--debug`. Do not
`git fetch`, `git gc` or run filter-repo a second time in this mirror.

### 6.6 Post-run checks (in order; each STOP discards the mirror)

```bash
test "$RC" -eq 0 || echo STOP                                                    # exit status
LOG="$OUT/$REPO/filter-repo.log"
LC_ALL=C grep -c -E '^(fatal|error|Error|ERROR|Traceback|Aborting|warning|WARNING|Warning)' "$LOG"   # 0 (do not print the log)
grep -c 'Completely finished after' "$LOG"                                       # 1
grep -c 'NEXT STEPS FOR YOUR SENSITIVE DATA REMOVAL:' "$LOG"                     # 1
grep -c 'git push --force --mirror origin' "$LOG"                                # 1
grep -c 'NOTE: LFS object orphaning not checked (LFS not in use)' "$LOG"         # 1   (any LFS note: STOP)
sed -n 's/.*You rewrote \([0-9][0-9]*\) (of \([0-9][0-9]*\)) commits.*/\1 \2/p' "$LOG"   # one line "C T"; C >= 1; T == N_BEFORE
cd filter-repo && ls | tr '\n' ' '                                               # already_ran changed-refs commit-map first-changed-commits ref-map sensitive_data_removal suboptimal-issues
echo $(( $(wc -l < commit-map) - 1 ))                                            # T
awk 'NR>1 && $1!=$2' commit-map | wc -l                                          # C   (must equal the log's C)
P=$(grep -c ' 0\{40\}$' commit-map); echo "P=$P"                                   # pruned commits; compare with the plan's expected count
grep -c . first-changed-commits                                                  # >= 1
cd ..
git remote get-url origin                                                        # the repository URL recorded before the clone; else STOP
test "$(git rev-list --all --count)" -eq $(( N_BEFORE - P )) || echo STOP        # P from above
while IFS= read -r e; do printf '%s %s\n' "$(git rev-list --all --full-history --count -- ":(top,literal)$e")" "$e"; done < "$LIST"   # every count 0
git for-each-ref | wc -l                                                         # R_BEFORE minus the ref-map rows whose new hash is zeros
git fsck --full >/dev/null 2>&1; echo "fsck rc=$?"                               # 0
git cat-file --batch-all-objects --batch-check='%(objecttype) %(objectsize)' | awk '$1=="blob"{print $2}' | sort -n | tail -n 1   # largest blob, bytes only
```

`suboptimal-issues` is read only for its first line (`head -n 1` is acceptable: it is `No filtering
problems encountered.` or a sentence about merge commits; it contains hashes, no paths). The blob and
manifest checks (every purged blob id missing) and the exit-test list belong to the plan.

### 6.7 Keep the outputs

```bash
for f in commit-map ref-map changed-refs first-changed-commits suboptimal-issues; do cp "$WS/$REPO.git/filter-repo/$f" "$OUT/$REPO/$f" && cmp -s "$WS/$REPO.git/filter-repo/$f" "$OUT/$REPO/$f" || echo STOP; done
sed -n '/NEXT STEPS FOR YOUR SENSITIVE DATA REMOVAL:/,$p' "$OUT/$REPO/filter-repo.log" > "$OUT/$REPO/next-steps.txt"
cp "$LIST" "$OUT/$REPO/purge-list.txt"
grep -c '^refs/pull/.*/head$' "$OUT/$REPO/changed-refs"        # number of affected pull-request refs (0 is a valid answer; grep exits 1)
( cd "$OUT/$REPO" && sha256sum filter-repo.log commit-map ref-map changed-refs first-changed-commits suboptimal-issues next-steps.txt purge-list.txt > SHA256SUMS )
```

Kept per repository, in `$OUT/$REPO/`: the log (holds the printed `First Changed Commit(s)` and the
cleanup instructions), `commit-map`, `ref-map`, `changed-refs`, `first-changed-commits`,
`suboptimal-issues`, `next-steps.txt`, the list, and `SHA256SUMS`. They hold pre-rewrite commit ids and
ref names, no paths and no content, and stay on this machine. The mirror's `already_ran` and
`sensitive_data_removal` files are not kept.

### 6.8 Why this shape

`--sensitive-data-removal` is the flag GitHub's procedure names and is what produces
`first-changed-commits`, `changed-refs` and the printed instructions; the mirror clone makes its fetch
unnecessary and satisfies the fresh-clone check. The list file is the only way to archive and hash
exactly what was asked, and the parse rules above make the byte checks sufficient to guarantee it is read
as written. Because filter-repo cannot tell "nothing matched" from success, success is defined by
counts that come from git itself (pathspec counts, `rev-list` counts) and from filter-repo's own
accounting, which must agree.

## 7. Load-bearing claims

1. **Release and version.** "v2.47.0" is the newest release, published 2024-12-04.
   Quote: `"tag_name":"v2.47.0"` and `"published_at":"2024-12-04T02:57:48Z"` (the first entry of the
   releases list; the second entry is 2.45.0, published 2024-07-18).
   Source: https://api.github.com/repos/newren/git-filter-repo/releases ; read 2026-10-20.
2. **PyPI file, hash, Python requirement.**
   Quote: `"sha256": "2cd04929b9024e83e65db571cbe36aec65ead0cb5f9ec5abe42158654af5ad83"` for
   `git_filter_repo-2.47.0-py3-none-any.whl`; `"requires_python": ">=3.6"`; `"yanked": false`.
   Source: https://pypi.org/pypi/git-filter-repo/2.47.0/json ; read 2026-10-20. `releases` of
   https://pypi.org/pypi/git-filter-repo/json ends at `2.47.0`.
3. **Script identity.** The tag's script has git blob id `a40bce548d2c0bd0b8d5e233e8930d462e35e495`, size
   210911; its sha256 is `67447413e273fc76809289111748870b6f6072f08b17efe94863a92d810b7d94` (computed
   from the raw URL and from the wheel's `git_filter_repo.py`, both identical).
   Quote: `{"sha":"a40bce548d2c0bd0b8d5e233e8930d462e35e495","size":210911}`.
   Source: `gh api "repos/newren/git-filter-repo/contents/git-filter-repo?ref=v2.47.0"`; raw script at
   https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/git-filter-repo ; 2026-10-20.
4. **`--version` output.**
   Quote: `version = subproc.check_output(cmd, input=contents).strip()` / `print(decode(version[0:12]))`
   with `cmd = 'git hash-object --stdin'.split()`.
   Source: `GitUtils.print_my_version`, v2.47.0 script.
5. **Path-list parsing.**
   Quote: `with open(filename, 'br') as f:` / `line = line.rstrip(b'\r\n')` / `# Skip blank lines` /
   `if line.startswith(b'#'):` / `if line.startswith(b'literal:'): match = line[8:]`.
   Source: `FilteringOptions.get_paths_from_file`, v2.47.0 script.
6. **Manual wording for `--paths-from-file`.**
   Quote: "Blank lines and lines starting with a `#` are ignored (if you have a filename that you want to
   filter on that starts with `literal:`, `#`, `glob:`, or `regex:`, then prefix the line with
   'literal:')."
   Source: https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/Documentation/git-filter-repo.txt
   (`--paths-from-file`).
7. **Match semantics.**
   Quote: "Returns whether path_expression matches pathname or a leading directory thereof, allowing
   path_expression to not have a trailing slash even if it is meant to match a leading directory." and
   `if (pathname.startswith(path_expression) and (path_expression[n-1:n] == b'/' or len(pathname) == n or
   pathname[n:n+1] == b'/')):`; manual: "Directory names can be given with or without a trailing slash,
   and all filenames are relative to the toplevel of the repo."
   Source: `RepoFilter._filter_files.filename_matches`, v2.47.0 script; manual as above.
8. **No validation for list entries; empty filter list keeps everything.**
   Quote: `raise SystemExit(_("Error: Pathnames cannot begin with a '/'"))` appears in
   `FilteringOptions.AppendFilter` (the `--path` action), not in `get_paths_from_file`; and in
   `sanity_check_args`: "# Similarly, if we have no filtering paths, then no path should be filtered out."
   / `if not any(x[0] == 'filter' for x in args.path_changes): args.inclusive = False`.
   Source: v2.47.0 script.
9. **Origin kept under the flag.**
   Quote: `if self._args.sensitive_data_removal:` / `return` / `# Now remove the origin remote`
   (consecutive lines).
   Source: `RepoFilter._migrate_origin_to_heads`, v2.47.0 script.
10. **Fetch conditions.**
    Quote: `if self._args.sensitive_data_removal and \ not self._args.no_fetch and \ not self._already_ran
    and \ self._config_settings.get(b'remote.origin.mirror', b'false') != b'true':` and
    `cmd = 'git fetch -q --prune --update-head-ok --refmap "" origin +refs/*:refs/*'`.
    Source: same function, v2.47.0 script.
11. **`git clone --mirror` sets the mirror flag.**
    Quote: `if (option_mirror) {` / `strbuf_addf(&key, "remote.%s.mirror", remote_name);` /
    `repo_config_set(the_repository, key.buf, "true");`
    Source: https://raw.githubusercontent.com/git/git/v2.55.0/builtin/clone.c ; tag v2.55.0.
12. **Fresh-clone conditions.**
    Quote: `# Make sure there is precisely one remote, named "origin"...or that this`;
    `# Make sure that all reflogs have precisely one entry`; `abort(_("has stashed changes"))`;
    `abort(_("GIT_DIR must be ."))`; `if num_packs > 1 or \ num_loose_objects >= 100 or \`; and
    "Aborting: Cannot rewrite history on a case insensitive".
    Source: `RepoFilter.sanity_check`, v2.47.0 script. Manual: "You may pass `--bare` or `--mirror` to
    `git clone`, if you prefer. ... Avoid other flags; some might confuse the fresh clone check".
13. **Output files and location.**
    Quote: `d = os.path.join(git_dir, b'filter-repo')`; `os.path.join(metadata_dir, b'commit-map')`,
    `b'ref-map'`, `b'changed-refs'`, `b'first-changed-commits'`, `b'suboptimal-issues'`,
    `b'already_ran'`, `b'sensitive_data_removal'`; commit-map doc: "All commits in range of the rewrite
    will be listed, even commits that are unchanged".
    Source: `RepoFilter.results_tmp_dir` and `RepoFilter._record_metadata`, v2.47.0 script; manual
    section OUTPUT.
14. **Printed text.**
    Quote: `print(f"You rewrote {changed_commits} (of {len(commit_renames)}) commits.")`;
    `print(f"NOTE: First Changed Commit(s) is/are:\n  "`;
    `print("NOTE: LFS object orphaning not checked (LFS not in use)")`;
    `NEXT STEPS FOR YOUR SENSITIVE DATA REMOVAL:`; `push_command = "git push --force --mirror origin"`;
    `print(_("Completely finished after {:.2f} seconds.")`.
    Source: `RepoFilter._record_metadata`, `_handle_lfs_metadata`, `run`, and `sdr_next_steps`, v2.47.0.
15. **Cleanup and exit paths.**
    Quote: `cleanup_cmds = ['git reflog expire --expire=now --all'.split(), 'git gc {} --prune=now'.format(quiet_flags).split()]`;
    `raise SystemExit(_("Error: fast-import failed; see above."))`;
    `raise SystemExit("fatal: running '%s' failed!" % ' '.join(cmd))`. Python: "any other object is
    printed to stderr and results in an exit code of 1."
    Source: v2.47.0 script (`cleanup`, `run`); https://docs.python.org/3/library/sys.html#sys.exit ;
    read 2026-10-20.
16. **Re-run behaviour.**
    Quote: "Treat this run as a continuation of filtering in the previous run (Y/N)? " and
    "Error: Cannot specify --sensitive-data-removal on a follow-up invocation".
    Source: `RepoFilter._run_sanity_checks`, v2.47.0 script.
17. **`--analyze` outputs.**
    Quote: `reportdir = os.path.join(results_tmp_dir, b"analysis")`; file names `README`, `renames.txt`,
    `directories-deleted-sizes.txt`, `directories-all-sizes.txt`, `extensions-deleted-sizes.txt`,
    `extensions-all-sizes.txt`, `path-deleted-sizes.txt`, `path-all-sizes.txt`,
    `blob-shas-and-paths.txt`; `"  %10d %10d %-10s %s"`; `Format: sha, unpacked size, packed size,
    filename(s) object stored as`; "Error: dir already exists (use --force to delete)".
    Source: `RepoAnalyze.write_report` and `RepoAnalyze.run`, v2.47.0 script. Manual (DISCUSSION): "It
    can also be useful to re-run --analyze after filtering to verify the changes look correct."
18. **Pruning defaults.**
    Quote: "'auto' (the default) means only prune commits which become empty (not commits which were
    empty in the original repo, unless their parent was pruned)." and "The default ('auto') is to only
    prune empty merge commits which become degenerate (not which started as such)."
    Source: manual `--prune-empty`, `--prune-degenerate`, v2.47.0; `RepoFilter._prunable`:
    `if len(parents) >= 2 and not new_1st_parent: return False`.
19. **Signed commits are stripped by default in git.**
    Quote: "Default is 'strip', which is the same as how earlier versions of this command without this
    option behaved." (`--signed-commits`); 2.47.0 passes `'--signed-tags=strip'` and no
    `--signed-commits`.
    Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-fast-export.adoc ;
    `RepoFilter._setup_input`, v2.47.0.
20. **Installation guidance.**
    Quote: "If you place the git-filter-repo script in your $PATH, then you can shorten commands by
    replacing `python3 git-filter-repo` with `git filter-repo`"; "Windows apparently ships with a
    [non-functional python]"; "`git-filter-repo` is also available as PyPI-package."
    Source: https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/INSTALL.md (sections
    "Simple Installation", "Notes for Windows Users", "Installation as Python Package from PyPI").
21. **No winget package.**
    Quote (command output): `No package found matching input criteria.` for `winget search
    "filter-repo" --source winget --accept-source-agreements --disable-interactivity`.
    Source: winget 1.29.380 on this machine, 2026-10-20 (re-run to verify); a code search of
    microsoft/winget-pkgs for "filter-repo" returned `[]`.
22. **pip hash-checking.**
    Quote: "It is possible to force the hash checking mode to be enabled, by passing --require-hashes
    command-line option." and "Requirements must be pinned (either to a URL, filesystem path or using
    ==)." and "If there is a dependency that is not spelled out and hashed in the requirements file, it
    will result in an error."
    Source: https://pip.pypa.io/en/stable/topics/secure-installs/ ; read 2026-10-20 (pip 26.2.1 behaviour
    additionally observed, see 3.1).
23. **PowerShell default encodings.**
    Quote: "Specifies the type of encoding for the target file. The default value is `unicode`." and
    "`unicode` Uses UTF-16 with the little-endian byte order." (Out-File); "The default value is
    `Default`." and "`Default` Uses the encoding that corresponds to the system's active code page
    (usually ANSI)." (Set-Content); "-Append ... This is the same behavior as the redirection operator
    (`>>`)."
    Source: https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-file?view=powershell-5.1
    and https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-content?view=powershell-5.1 ;
    read 2026-10-20.
24. **Windows `fast-import` failure on kept NTFS-invalid names.**
    Quote: "fatal: invalid path 'frontend/assets/icons/sm:nose-glass.svg'" and (maintainer) "didn't come
    from filter-repo, but from the `git fast-import` subprocess that filter-repo ran."
    Source: https://github.com/newren/git-filter-repo/issues/675 (2025-06-27); also issue #703
    (2025-09-19, `...features.csv:Zone.Identifier`).
25. **`--analyze` hang on Windows.**
    Quote: "For D:\\ it goes on infinite loop as os.path.dirname gives same result for drive letters in
    windows."
    Source: https://github.com/newren/git-filter-repo/issues/707 (2025-09-29, open).
26. **"Completely finished" after a fatal.**
    Quote: "fatal: failed to run pack-refs" followed by "Completely finished after 13153.73 seconds."
    Source: https://github.com/newren/git-filter-repo/issues/590 (2024-08-02, open).
27. **Post-2.47.0 fixes and the lack of a release.**
    Quote: "The parsing of the output of `git config --list` fails if any of the config values contain
    newlines. Fix this by using the --null parameter to `git config`" (commit message "Don't crash on
    multi-line config values", 2024-12-14); "we really need a release with this fix in it." (issue #684);
    "python3.14 added '\z' as a synonym for '\Z' in regexes." (commit "fix --replace-text for
    python3.14", 2025-07-25).
    Source: commits on https://github.com/newren/git-filter-repo/commits/main ; issue
    https://github.com/newren/git-filter-repo/issues/684 ; compare `v2.47.0...main` shows 27 commits,
    last 2026-07-09.
28. **GitHub's procedure.**
    Quote: "You need a version with the `--sensitive-data-removal` flag, meaning at least version 2.47."
    and "git-filter-repo --sensitive-data-removal --invert-paths --path PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA"
    and "git push --force --mirror origin".
    Source: https://raw.githubusercontent.com/github/docs/main/content/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository.md ;
    read 2026-10-20, `main`.
29. **A stash ref aborts a mirror run.**
    Quote: "Aborting: Refusing to destructively overwrite repo history since this does not look like a
    fresh clone. (has stashed changes)" (issue #652, a `git clone --mirror --no-local` clone).
    Source: https://github.com/newren/git-filter-repo/issues/652 (2025-03-25, open).

## 8. Known gaps

- **The tool was not executed.** Expected outputs in 6.1, 6.2 and 6.6 that depend on running code
  (`--version` printing `a40bce548d2c`, `Successfully installed ...`, the log lines, the rehearsal's
  numbers) are derived from the source and from observed pip dry-run and download runs. The rehearsal in
  6.2 is the first execution and is the confirmation; its numbers should be checked line by line.
- **git 2.55 with filter-repo 2.47.0 is untested by upstream.** The README's list of supporting git
  commits ends at 2.48. No open issue reports a break with git 2.50 to 2.55 that applies here, and the
  one interface that changed (`fast-export --signed-commits`) defaults to the old behaviour; this is
  absence of evidence. The rehearsal covers it.
- **Whether the six real histories contain a kept path that `fast-import` rejects on Windows** (`:`,
  trailing dot, reserved names) is unknown until the pre-run analysis is counted; the failure would be
  loud (status 1), not silent. If it happens, the options (set `core.protectNTFS=false` in the mirror,
  or add the path to the list) change the rewrite and need a decision from the owner; this document
  does not make it.
- **Matching of `commit-map` size to `git rev-list --all --count`** (T equals N_BEFORE) follows from the
  manual ("All commits in range of the rewrite will be listed") and `fast-export --all`; it was not
  observed. A mismatch stops the run, which is the safe direction.
- **Environment assumptions.** The PATH seen by the implementer's Git Bash may differ from the one
  observed here (`command -v` in 6.2 detects it). `PYTHONUTF8` was not set; every line the tool prints
  to the log in this mode is ASCII per the source, but a non-ASCII branch name in a warning could in
  principle raise on a code-page console.
- **UTF-8 BOM behaviour** is established from the source (no stripping), not from a run; Windows
  PowerShell 5.1's `-Encoding UTF8` BOM behaviour was not looked up because the list is not written
  with it.
- **Considerations:** none open. The recommended choices (pip user scheme, list file with byte proofs,
  mirror clone) need no owner decision.
