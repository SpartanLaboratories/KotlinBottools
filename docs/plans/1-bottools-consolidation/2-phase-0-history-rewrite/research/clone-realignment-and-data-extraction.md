# Realigning existing clones, copying the legacy data, and building the blob manifests

Researched 2026-10-21 for [KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
Versions: git 2.55.0 (documentation and source read at tag `v2.55.0`), Git for Windows `v2.55.0.windows.5`
(the installed build), git-filter-repo `v2.47.0`, JetBrains IntelliJ IDEA 2026.2 documentation. Behaviour was
observed in throwaway repositories in a scratch directory outside every project folder (git 2.55.0.windows.5,
Python 3.14.7, GNU tar 1.35, Windows 11). The real clones were only inspected with read-only commands. The
conventions `WS` (workspace) and `OUT` (outputs directory) are those of
[`git-filter-repo-on-windows.md`](git-filter-repo-on-windows.md); the push and its per-ref proof are those of
[`github-residual-exposure-and-visibility.md`](github-residual-exposure-and-visibility.md) and are not repeated.

## 1. Question

With git 2.55 on Windows, how are `%PROJECTS%\KotlinBottools` (the session's working directory,
which is never deleted or renamed) and `%PROJECTS%\TrumpBot` brought onto the rewritten histories
so that no pre-rewrite object remains in either; how are `BotData.xml` and `guildData/` copied byte-exactly
from three untouched pre-rewrite mirrors despite `core.autocrlf=true`; and how is the per-repository manifest of
blob ids built so that it lists exactly the blobs the rewrite makes unreachable? The answer is four runbook
procedures with commands, expected output and stop conditions, and has to hold for both ways the rewritten
KotlinBottools reaches GitHub (force-push, or delete-and-recreate under the same URL).

## 2. Bottom line

- **This clone: git-filter-repo's documented procedure, run in place and hardened** (the other option, swapping
  in a fresh clone's `.git`, is the fallback and is not scripted). In git 2.55 what keeps old objects alive
  through `git gc --prune=now` is: every ref under `refs/` (branches, remote-tracking, tags, `refs/stash`,
  notes, replace refs), `HEAD`, the index, all reflogs, rebase `orig-head`/`autostash` files, `.keep` packs and,
  until pruned, cruft packs. `ORIG_HEAD`, `FETCH_HEAD`, `MERGE_HEAD` are not roots (source and observed), but
  they hold old ids as text and are deleted anyway. The sequence is: check preconditions, `fetch --prune`, move
  every local branch by a `commit-map` rule, `reset --hard` the checked-out one, delete `ORIG_HEAD`, `reflog
  expire --expire=now --all`, `gc --prune=now`, then prove with `git cat-file --batch-check` (all missing) plus
  the same check against the untouched backup (none missing, the control) plus `git count-objects -v`
  (`packs: 1`, `garbage: 0`). **Exit status is not proof on Windows:** with a locked file, `git reset --hard`
  exits 0 and leaves the file, and `git gc` exits 0 silently and leaves the old `.pack`.
- **TrumpBot: replace the clone, with the old one moved aside and deleted last.** Keep the untracked and
  ignored files in a tar with a checksum list, `mv` the clone into `WS` (a same-volume rename, which fails
  cleanly while any process holds a handle inside), `git clone` the rewritten repository at the same path,
  restore the files with `tar --keep-old-files`, prove, then `rm -rf` the old clone. In-place cleaning is
  rejected: same lock hazards, more steps, nothing gained.
- **Data copy: `git cat-file blob <id>` per record of `git ls-tree -r -z`, verified with `git hash-object
  --no-filters`.** `git archive` runs `convert_to_working_tree` on every regular file, so under
  `core.autocrlf=true` it writes CRLF (observed: 1 of 6 test files differs; with `-c core.autocrlf=false -c
  core.eol=lf` the result still depends on `.gitattributes`: an `eol=crlf` attribute breaks it). The raw blob is
  byte-exact by construction. Destination `%USERPROFILE%/BotLegacyData` (user-only ACL, outside OneDrive and
  outside `%PROJECTS%\`), one subfolder per source, records, checksums and manifests beside them.
- **Manifest: a Python classifier over `git ls-tree -r -z` of every distinct commit tree of the backup mirror.**
  `git rev-list --objects --all` prints one name per object (git's documentation says so), so it cannot decide
  "only under purge paths" (observed: of the 6 ids a path filter over it listed, 1 also lives under a kept path).
  `blob-shas-and-paths.txt` lists every path but joins them as `[p1, p2]` with `", "` and prints a single path
  bare, so a path with a comma or bracket is ambiguous (observed). The classifier applies filter-repo's own
  root-anchored matching rule, prints counts only, and gives the expected surviving-blob count directly
  (`blobs_kept`; equivalently `blobs_total - manifest`).
- **Windows:** set `GIT_ASK_YESNO=false` (Git for Windows runs the named program with the question; exit status
  0 means "retry", so a program that always succeeds retries forever); without a terminal Git answers "no" on
  its own after five quick retries. Pass native programs `C:/...`-style paths (an MSYS path containing `[` or
  `;` is not converted: observed), and pass `--force-local` to `tar`. The owner closes the project in IntelliJ
  IDEA before the clone procedures run. IntelliJ keeps its own Local History copies of files outside git (5
  working days by default); no git operation reaches them.
- **Variant (delete-and-recreate):** the procedure is the same. The only addition is a guard that the server's
  heads equal the rewrite's `ref-map` *before* `git fetch --prune`, because pruning against an empty or
  half-populated repository deletes every remote-tracking ref and exits 0 (observed).

## 3. Findings

Evidence tiers: **documented** (git or Git for Windows documentation), **source** (the project's code at the
pinned tag), **observed** (run in a throwaway repository on this machine), **practice** (what the maintainers'
procedure or mature tools visibly do). Where a finding rests on more than one tier, each is named.

### 3.1 What keeps objects reachable for `git gc --prune=now` in git 2.55

Tiers: documented (`git-gc`, `git-prune`, `git-repack`), source (`reachable.c`, `builtin/gc.c`,
`builtin/prune.c`, `revision.c`, `worktree.c`, `refs.c` at `v2.55.0`), observed.

| Holder | Keeps objects through `git gc --prune=now`? | Basis |
|---|---|---|
| Any ref under `refs/`: branches, remote-tracking refs, tags, `refs/stash`, `refs/notes/*`, `refs/replace/*`, `refs/bisect/*`, `refs/pull/*` | Yes | gc documentation ("anything else in the refs/* namespace"); `mark_reachable_objects` calls `refs_for_each_ref`; observed: a commit held only by `refs/stash`, `refs/notes/x`, `refs/replace/<id>` or `refs/bisect/bad` survived |
| `HEAD` (and every other worktree's `HEAD`) | Yes | `refs_head_ref`, `other_head_refs` in `mark_reachable_objects`; observed: a second worktree with a detached `HEAD` kept a commit until the worktree was removed |
| The index (and every other worktree's index), its cache tree and resolve-undo data | Yes | `add_index_objects_to_pending` runs first in `mark_reachable_objects`; observed: a staged blob survived and vanished once unstaged |
| Reflogs of every ref, `HEAD`'s included, of every worktree | Yes, unless expired | `add_reflogs_to_pending`; `git gc` itself expires only entries older than 90 days (reachable) or 30 days (unreachable); observed: with reflogs intact `gc --prune=now` kept every commit of a deleted branch; after `reflog expire --expire=now --all` none |
| Rebase files `rebase-apply/` and `rebase-merge/` `orig-head`, `autostash` | Yes | `add_rebase_files` |
| `ORIG_HEAD`, `FETCH_HEAD`, `MERGE_HEAD`, `CHERRY_PICK_HEAD`, `REVERT_HEAD` | **No** | `mark_reachable_objects` has no case for them (`other_head_refs` visits only the *other* worktrees' `HEAD`; `is_pseudo_ref` lists only `FETCH_HEAD` and `MERGE_HEAD`); observed: commits named only by these files, loose or packed, were removed. The files still contain the ids as text |
| A pack with a `.keep` file | Yes | `git repack` never deletes or repacks `.keep` packs; observed: objects in a `.keep` pack survived `gc --prune=now` until the `.keep` was removed |
| A cruft pack (`gc.cruftPacks`, default true) | Yes until its expiry | a plain `git gc` keeps unreachable objects in a `.mtimes` cruft pack for `gc.pruneExpire` (default 2 weeks); `gc --prune=now` takes the `-a` branch of `add_repack_all_option`, which writes no cruft pack, and runs `git prune --expire now`; observed: the object was present after a plain `gc`, gone after `gc --prune=now` |
| `gc.recentObjectsHook` | Yes | `load_gc_recent_objects` runs the hook even when the expiry is "now" |
| `--keep-largest-pack`, `gc.bigPackThreshold` | Yes (those packs are not repacked) | `cmd_gc` passes `--keep-pack` only for these |
| `objects/info/alternates` | The lender's objects stay readable | `git prune` works on the local object store; observed: an object that only the lender referenced was still readable in the borrower after `gc --prune=now` |
| A pack that cannot be deleted because another process holds it open | Yes, physically | observed (3.6): `git gc` exited 0 and left the old `.pack` (`garbage: 1`) |

A note attached to an object does not keep that object alive (gc documentation); only the `refs/notes/*` ref keeps
the notes commit and tree.

### 3.2 Expiry arguments mean what the filter-repo manual needs them to mean

Tiers: source (`date.c`, `reflog.c`), documented (`git-reflog`, `config/gc`).

- `parse_expiry_date` maps `now` and `all` to `TIME_MAX`; `should_expire_reflog_ent` prunes an entry when
  `timestamp < expire_total`. So `git reflog expire --expire=now --all` removes every entry, including one
  written in the current second, for every ref's reflog (branches, remote-tracking refs, `HEAD`, `refs/stash`)
  in every worktree. `git prune --expire` and `git gc --prune=now` use the same parser, so `st.st_mtime > expire`
  is never true and no grace period applies.
- `git gc` always runs `reflog expire --all` and `pack-refs --all --prune` first
  (`gc_foreground_tasks`), but with the configured defaults (90 and 30 days). Only the explicit command empties
  the reflogs.
- `git gc` needs the repack: `git prune` removes unreachable *loose* objects and "unreachable, packed objects
  will remain", so `gc` runs `repack -a -d` (here with `-a`: "pack everything referenced into a single pack")
  before `prune --expire now`.

### 3.3 `git reset --hard <commit>`

Tiers: documented (`git-reset`), observed.

- Tracked files that are absent from `<commit>` are removed. Documentation: "Tracked files not in <commit> are
  removed so that the working tree matches <commit>." Observed: directories that become empty disappear;
  a directory that still holds an untracked file stays.
- Untracked files stay, ignored files stay. Observed (the documentation is silent on ignored files): an
  untracked `loose.txt`, an ignored `build/o.bin` and an ignored `.idea/w.xml` were untouched.
- **An untracked file that sits where the target tree has a tracked file is overwritten without a message**
  (documentation: "and may overwrite untracked files"; observed: `untr.txt` containing local text now held the
  tracked content). `untracked_collisions.py` (6.3) counts such files before the reset.
- `git reset` first records the old tip in `ORIG_HEAD` ("Before the operation, `ORIG_HEAD` is set to the tip of
  the current branch"), and writes a `HEAD` reflog entry. Both name old objects afterwards.
- Windows: a tracked file that is deleted by the reset but held open elsewhere gives `warning: unable to unlink
  '<path>': Invalid argument`, **exit status 0**, and the file remains as an untracked file (observed). The
  warning contains the path, so the stderr of the reset is counted and never printed.

### 3.4 `git fetch --prune` after a force-push

Tiers: documented (`git-fetch`, `pull-fetch-param`), observed.

- The default refspec of a clone, `+refs/heads/*:refs/remotes/origin/*`, forces non-fast-forward updates; the
  status flag for them is "`+` for a successful forced update". `--prune` removes, before fetching,
  "any remote-tracking references that no longer exist on the remote". Observed: a rewritten history pushed with
  `--mirror` updated every `refs/remotes/origin/<branch>` to the new tip with exit status 0. These repositories
  have no tags; the filter-repo manual's advice to delete tags first is replaced by a precondition: no ref
  outside `refs/heads` and `refs/remotes`.
- `fetch` writes `FETCH_HEAD` on every run ("The names of refs that are fetched, together with the object names
  they point at, are written to `.git/FETCH_HEAD`") and so overwrites the old content with new ids.
- **Pruning against a repository that has no refs deletes every remote-tracking ref and exits 0** (observed:
  4 refs before, 0 after, rc=0; the reflogs keep the old ids). Relevant to delete-and-recreate (6.4) and to a
  half-finished push.

### 3.5 `git archive` applies working-tree conversion; per-blob extraction does not

Tiers: source (`archive.c`), documented (`core.autocrlf`, `core.eol`, `git-hash-object`, `git-cat-file`), observed.

- `object_file_to_archive` calls `convert_to_working_tree(...)` for every regular file (except blobs above
  `core.bigFileThreshold` that are streamed unconverted). `core.autocrlf=true` "is the same as setting the
  `text` attribute to `auto` on all files and `core.eol` to `crlf`", and `core.eol` "is ignored if
  `core.autocrlf` is set to `true` or `input`".
- Observed on a repository with `* text=auto` and system-level `core.autocrlf=true`:

  | Method | Files differing from their blob id (6 files: LF, CRLF, mixed, lone CR, binary, empty) |
  |---|---|
  | `git archive HEAD -- guildData \| tar -x` | 1 (the LF file came out as CRLF) |
  | same with `-c core.autocrlf=false -c core.eol=lf` | 0 |
  | same, after a commit changed `.gitattributes` to `* text=auto eol=crlf` | 1 |
  | `git ls-tree -r -z` + `git cat-file blob <id> > file` | 0 in all three situations |

  `git cat-file <type> <object>` returns "the raw (though uncompressed) contents of the <object>"; `--filters`
  is a separate, opt-in option. `git hash-object --no-filters` hashes "the contents as is, ignoring any input
  filter ... including the end-of-line conversion", so it recomputes the blob id of a file on disk exactly.
- A `filter=`, `ident` or `working-tree-encoding` attribute would also alter archive output; the per-blob method
  is independent of all of them.

### 3.6 Windows: locks, silent partial failure, the prompt, read-only packs, path forms

Tiers: source (`compat/mingw.c` at `v2.55.0.windows.5`), observed.

- **Locks.** Observed with a file opened by another process without share-delete:
  - `git reset --hard` (above): warning, exit 0, file left behind.
  - `git gc` where the *only* pack was locked: `fatal: renaming pack to ... failed: Permission denied`,
    `fatal: failed to run repack`, exit 128 (a failed repack leaves the old packs intact; a rerun is safe).
  - `git gc` where an *old* pack that the repack replaces was locked: **exit 0, no output**; the new pack
    exists, the old `.idx` is gone, the old `.pack` remains and `git count-objects -v` reports `packs: 1` plus
    `garbage: 1`. Its bytes still hold the old objects. `cat-file -e` already says "missing" for them (a pack
    without an index is invisible), so only the file count and `garbage` expose it.
  - The baseline on this machine, with IntelliJ IDEA running but idle: no file under either clone's `.git`,
    and no file of TrumpBot's tree, was held open (the probe in 6.3 returned 0).
- **The prompt.** `mingw_unlink` retries a failed delete five times (sleeps of 0, 1, 10, 20, 40 ms) and then
  calls `ask_yes_no_if_possible`, which (1) runs the program named by `GIT_ASK_YESNO` with the question as its
  only argument and returns "yes" (retry) exactly when that program exits 0, else (2) if stdin or stderr is not a
  terminal returns "no", else (3) prints "`Unlink of file '<path>' failed. Should I try again? (y/n)`" and
  waits for an answer. `mingw_rename` uses the same function ("Rename from ... to ... failed"). Observed with a
  hook script that logs its argument and exits 1: the hook ran for a locked old pack inside `git gc`, `gc`
  returned 0. Without a terminal the default is therefore "no" and nothing hangs (observed); with stdin and stderr on a
  terminal, including a pseudo-terminal, the code prints the question and waits (source). The runbook sets `GIT_ASK_YESNO=false`: the program `false` exits 1 ("no") whether
  or not a terminal exists, and whether or not it can be started. A hook that exits 0 would retry without
  limit. The variable is documented nowhere but the source.
- **Renames.** `mv <dir> <elsewhere>` of a directory that contains an open file fails with `Permission denied`
  and moves nothing, also when the opener allowed delete sharing (observed). TrumpBot's clone is therefore moved
  first: success proves that nobody holds a handle inside it.
- **Read-only packs.** Git writes `.pack`, `.idx` and `.rev` files read-only (attribute R, observed). Both Git
  Bash `rm -rf <clone>` and PowerShell `Remove-Item -LiteralPath <clone> -Recurse -Force` removed a clone with
  such files (observed, rc 0). A held-open file makes either stop part-way: the deletion of a clone is the
  *last* step of a procedure, never the first.
- **Path forms.** Native programs (`git.exe`, `python.exe`) receive MSYS arguments unchanged when the argument
  contains characters such as `[` or `;`: `git hash-object --no-filters -- /c/.../br[1].txt` failed with "could
  not open" while the same file passed as `C:/.../br[1].txt` hashed (observed; `,` and spaces were fine). Paths
  under `guildData/` can contain such characters, so every path variable in the runbook is in mixed form
  (`cygpath -m`: drive letter, forward slashes). GNU tar treats `C:` in `-f C:/...` as a remote host
  (`tar: Cannot connect to C: resolve failed`); `--force-local` prevents it.
- `tasklist | grep -c -i '^git.exe'` is an unreliable precondition by nature: IntelliJ starts `git.exe`
  periodically (it returned 2 once during testing). The block simply stops and is repeated.

### 3.7 IntelliJ IDEA keeps copies outside git

Tier: documented (JetBrains documentation for IntelliJ IDEA 2026.2, read 2026-10-21), plus observed paths.

- "Local History helps you constantly track all changes made to a project independently of version control"
  and "maintains revisions for all meaningful changes made both from the IDE and externally"; by default it
  stores "revisions for the last 5 working days", in binary files "under the LocalHistory subdirectory in the
  IntelliJ IDEA system directory" (`%LOCALAPPDATA%\JetBrains\<product><version>`). It "has a retention period
  and maximum size, so revisions are not guaranteed to persist."
- On this machine `%USERPROFILE%\AppData\Local\JetBrains\IdeaIC2024.3\LocalHistory` and
  `...\IntelliJIdea2026.2\LocalHistory` exist (the latter about 1.9 MB). Their contents were not inspected. The
  files that `git reset --hard` deletes are external changes from the IDE's point of view, so their earlier
  content may remain there for the retention period. No git operation reaches it, and closing the project does
  not delete it.

### 3.8 The manifest tools

Tiers: documented (`git-rev-list`), source (git-filter-repo `v2.47.0`), observed.

- `git rev-list --objects` prints one name per object. Documentation: "the 'name' of each object is ambiguous,
  and mostly intended as a hint for packing objects. In particular: ... if an object would appear multiple
  times with different names, only one name is shown." In the fixture (an empty blob and a content-identical
  file under both a purged and a kept path) a path-prefix filter over `rev-list --objects --all` listed 6 ids,
  one of which survives the rewrite; whether such a blob is named by the kept or the purged path depends on
  traversal order.
- `blob-shas-and-paths.txt` (`RepoAnalyze.write_report`) takes its paths from `git diff-tree --stdin --always
  --root ... -M -t -c --raw --combined-all-paths`, so every (path, blob) pair that any commit introduced is
  covered, including deleted paths. The format is `  <sha> <unpacked> <packed> <names>`; several names are
  written `[` + `", ".join(sorted(names))` + `]`, one name is written bare. Observed: `[[x].txt, a, b.txt,
  plain.txt]` for three files named `[x].txt`, `a, b.txt`, `plain.txt`; the single path `solo [y], z.txt` is
  indistinguishable from a list. `--analyze` can also loop forever on Windows for paths starting with a drive
  prefix (issue #707, from the sibling findings). It is not used for classification.
- `git ls-tree -r -z <tree>` lists `<mode> <type> <id>\t<path>` records, NUL-terminated and unquoted, for
  every blob of a tree; the distinct trees of `git rev-list --all` cover every ref (a mirror holds
  `refs/pull/*`), and classification by the same rule as filter-repo (`filename_matches`) is exact. A kept blob
  is one that sits under a kept path in at least one tree: pruned commits have the tree of a surviving ancestor
  (or an empty tree) after filtering, so they add no kept blob. The empty tree `4b825dc...` is reported present
  by `git cat-file -e` in every repository (observed), so tree ids must not be part of an "all missing" check;
  the empty *blob* is a normal object.
- Observed on the fixture (13 blobs, 4 purge entries): `blobs_kept=8`, `blobs_under_purged_paths=7`,
  `blobs_shared=2`, `manifest=5`; after the rewrite the mirror held exactly 8 blobs (`rev-list --objects --all`)
  and the same builder reported `blobs_under_purged_paths=0`.

### 3.9 git-filter-repo 2.47.0 runs here

Tier: observed. `python -I git-filter-repo --sensitive-data-removal --invert-paths --paths-from-file ...` (the
v2.47.0 script, sha256 equal to the value recorded in the sibling findings) ran on a bare `--mirror` fixture
clone with git 2.55.0.windows.5 and Python 3.14.7: exit 0, "You rewrote 5 (of 5) commits.", `commit-map` of 6
lines, one pruned commit, `origin` retained; `--analyze --report-dir` also ran and wrote its reports. This is the first
execution reported on this stack.

### 3.10 Comparison of the options

| Item | Option | Verdict |
|---|---|---|
| This clone | (a) documented procedure, hardened | **Chosen.** Every step is checkable with git's own output; nothing but refs, the index, reflogs and objects is touched; `.git` is never moved while IntelliJ and the session hold it |
| This clone | (b) replace `.git` with a fresh clone's | Not scripted; fallback if block 4 fails twice. Clean by construction, but it renames `.git` (Windows refuses while any handle is open inside), drops the two branches' upstream settings and the index (`git reset` and `git branch --set-upstream-to` to repair), and leaves the old `.git` to delete |
| TrumpBot | (a) clone again, old one aside | **Chosen**, with the order: aside, clone, restore, prove, delete |
| TrumpBot | (b) clean in place | Rejected: the same procedure as this clone with the same lock risks; the fresh clone is cleaner and cheaper (the remote history is small) |
| Data copy | (a) `git archive \| tar -x` | Rejected: converts (3.5) |
| Data copy | (b) archive with `-c core.autocrlf=false -c core.eol=lf` | Rejected: correct only while no attribute converts |
| Data copy | (c) `git cat-file blob` per `ls-tree -r -z` record | **Chosen** |
| Manifest | (a) `rev-list --objects --all` by path | Rejected: one name per object |
| Manifest | (b) `blob-shas-and-paths.txt` | Rejected: ambiguous separators |
| Manifest | (c) `ls-tree -r -z` of every distinct tree, classified by the filter-repo rule | **Chosen** |

## 4. How comparable practice does it

- **git-filter-repo's manual, "Make sure other copies are cleaned up: clones of colleagues"** (v2.47.0). The
  easiest way is "to make everyone delete their existing clones and reclone". For a clone that is kept: "delete
  all tags and run `git fetch --prune --tags`", rebase local work onto the new history, then "git reflog expire
  --expire=now --all" and "git gc --prune=now" (the first "drops all reflogs including all stash entries.
  That's a high cost, but needed"), and finally `git cat-file -t ${HASH_OF_FIRST_CHANGED_COMMIT}` must fail. It
  warns against re-running the same filter-repo commands in another clone ("you'll end up with a mess involving
  two or more copies of every commit"). This is the procedure of 6.3; it adds what the manual leaves implicit
  (preconditions, the `commit-map` rule for local branches, collision and lock checks, evidence from
  `count-objects`, a control).
- **GitHub's "Removing sensitive data from a repository"** (docs `main`) says the same: "High risk of
  recontamination ... They need to either discard their clone and re-clone, or carefully walk through multiple
  steps to clean up their clone first", and refers to the filter-repo manual for the steps. Re-clone is the
  recommended path for every copy that can be re-cloned (TrumpBot).
- **filter-repo itself** ends a run in the mirror with `git reflog expire --expire=now --all` and `git gc
  --prune=now`; the sibling findings keep the backup mirror untouched so that a control can still read the old
  objects. 6.3 reuses that control.
- Neither the manual nor GitHub's page mention `ORIG_HEAD` or `FETCH_HEAD`; git's own reachability code ignores
  them (3.1), so the manual's steps do clean them; the runbook deletes them only so that no file in `.git` names
  an old id.

## 5. Pitfalls and regrets

1. **Believing exit status 0.** Locked files turn `git reset --hard` and `git gc` into silent partial successes
   (3.3, 3.6). Every block therefore checks state (`count-objects`, files on disk, `cmp` of file lists), not only
   `$?`.
2. **Printing warnings.** `git reset` and `tar` messages carry paths under `guildData/`. Their stderr goes to a
   file that is counted (`wc -l`) and never shown.
3. **`git fetch --prune` before the server is right.** A half-pushed or recreated-but-empty remote makes `--prune`
   delete the remote-tracking refs and report success (3.4). The server's heads are compared with `ref-map`
   first.
4. **Rerunning a block that already moved the branches.** After block 3 the local tips are new ids, so the
   `commit-map` rule says `NOTINMAP`. Block 1 is not rerun after block 3 has started; blocks 3, 3b and 4 are
   idempotent.
5. **An untracked file in the way** is overwritten by `reset --hard` (3.3). Checked by count.
6. **A leftover `.keep`, `gc.*`/`pack.*` configuration, alternates, extra worktree or stash** each keep old objects
   (3.1). Block 1 refuses to start with any of them.
7. **`gc.auto` and `maintenance.auto`** can start a detached background `gc` after `fetch`/`reset`, racing the
   explicit one. They are switched off per command (`-c gc.auto=0 -c maintenance.auto=false`).
8. **Tree ids in an "all missing" check.** The empty tree is always present (3.8). Only commits and blobs are
   checked.
9. **A fresh GitHub mirror of GKB2 or BotTools still serves `refs/pull/*` unrewritten**, so "every manifest id
   missing" cannot hold there for blobs those PR heads reach (the residual exposure described in the GitHub findings). The builder's
   optional pinned-prefix argument computes the manifest and survivor count for that case (6.6).
10. **`core.autocrlf=true` on a data copy** (3.5), **MSYS path conversion** and **`tar` host syntax** (3.6).
11. **IDE-side copies** (3.7) survive everything done here.
12. **Deleting before the replacement is proven.** Both clone procedures keep the old state until the new one has
    passed its checks; the single irreversible `rm -rf` comes last.

## 6. Recommendation for this repo

### 6.0 Conventions

Shell: Git Bash. Every path variable is in mixed form. `WS`, `OUT` are the sibling findings' workspace and
outputs directory (both outside every project folder, on `D:`); `BKROOT` is the directory holding the sibling
findings' untouched pre-rewrite mirrors, one `<repo>.git` each. A block's **STOP** means: do not continue, do not
push, report the label of the line and the numbers it shows, never any other output. Scripts are saved once
under `$TOOLS` (6.8) and run with `bash "$TOOLS/<name>"`; each check prints `ok    <label>` or prints `STOP
<label>: expected '<want>', got '<got>'` and ends the block with status 1. Environment (`$TOOLS/env.sh`, sourced
in the shell that runs the blocks; the first three values are the sibling findings' conventions):

```bash
export WS=...  OUT=...  BKROOT=...                  # mixed form, for example D:/BotWS
export TOOLS="$WS/tools"  DATA=%USERPROFILE%/BotLegacyData
export GIT_ASK_YESNO=false                           # Git for Windows: never retry or ask on a locked file
export REPO=KotlinBottools  CLONE=%PROJECTS%/KotlinBottools
export URL=https://github.com/SpartanLaboratories/KotlinBottools.git
export BK="$BKROOT/$REPO.git"  RM="$OUT/$REPO"  LIST="$WS/lists/$REPO-purge.txt"  MANIFEST="$DATA/manifests/$REPO.blobs"
```

For TrumpBot the same file is sourced with `REPO=TrumpBot`, `CLONE=%PROJECTS%/TrumpBot` and the
TrumpBot URL. Run order for the phase: **6.1 first, before any rewrite; 6.2 for each repository right after its
backup mirror exists; 6.3 after KotlinBottools' rewritten mirror has been pushed and proven; 6.5 after
TrumpBot's.** The first network command per repository may open a Git Credential Manager sign-in (both
repositories are private); complete it, it is not a STOP.

### 6.1 Procedure 3: the legacy data copy (before any rewrite)

Sources, read from the untouched mirrors: KotlinBottools `refs/heads/main`; GKB2 at the parent of the commit
that deleted `guildData/` from `master` (subject "No DB updates", 2023-10-29; found by the rule below, whose
result is checked: one parent, no `guildData` blob in the deleting commit, 29 in its parent, and
`BotData.xml` present); TrumpBot `refs/heads/main`. Files: `BotData.xml` and everything under `guildData/`.
Read-only checks on 2026-10-21 give the expected counts: KotlinBottools `main` 29 + 1, GKB2 29 + 1 (GitHub API
trees; the parent of the deleting commit), TrumpBot `main` 30 + 1; the KotlinBottools and TrumpBot entries are
all mode 100644 blobs (the copy stops on any other mode).

Layout (`DATA`, an ordinary folder under the user profile; `icacls` shows only `SYSTEM`, `Administrators` and the
user; `D:\` roots grant `Authenticated Users` modify and `Users` read, so a folder at the root of `D:` is not
used; the profile folder is neither under OneDrive nor under `%PROJECTS%\`):

```
%USERPROFILE%/BotLegacyData/
  KotlinBottools-main/        BotData.xml, guildData/...        the copied files, same relative paths
  GKB2-last-with-data/        BotData.xml, guildData/...
  TrumpBot-main/              BotData.xml, guildData/...
  records/<label>.ls-tree.z   the git ls-tree -r -z record the copy is verified against (mode, blob id, path)
  records/<label>.sha256      sha256sum of every copied file (relative paths)
  manifests/<repo>.blobs      6.2: blob ids to purge, one per line
  manifests/<repo>.counts     6.2: the builder's counts
  manifests/<repo>.kept       6.2: the expected surviving-blob count
  COPY-VERIFIED               empty marker, written only after all three copies verified
```

`copy-data.sh` (functions in `datacopy.sh`, 6.8). Expected output: three `ok` lines for the destination, then per
source a "`<label>: guildData=29 (want 29) BotData.xml=1 (want 1) unexpected_entries=0 write_failures=0`" line
and a "`records=30 files_on_disk=30 hash_mismatches=0`" line (TrumpBot 30 + 1), and `copy complete`. STOP on
any `STOP`, on `hash_mismatches` above 0, on `unexpected_entries` above 0. The copy is re-verified without
network or mirrors at any later time with `recheck_data <label>` (prints `rc=0`), and once more immediately before
the workspace is deleted.

Never committed and never quoted anywhere (documents, commit messages, pull-request or issue text, logs shown
to anyone): everything under `DATA` (member and guild names are in the paths and contents; `BotData.xml` holds
cookie sections); every file under `OUT` and `DATA/manifests` (they hold blob ids and pre-rewrite commit ids,
which are lookup keys for the old objects on GitHub); `commit-map`, `ref-map`, `changed-refs`,
`first-changed-commits`, `filter-repo.log`; the `WS/tmp` plan and list files and `WS/tb-untracked.*`. A path
under `guildData/` or `logs/` is not printed by any block.

**`datacopy.sh`**

```bash
# datacopy.sh -- sourced.  Needs DATA (mixed-form path, for example %USERPROFILE%/BotLegacyData).
# Prints counts only; never a path from the history.

copy_data() {   # $1 git dir of the untouched mirror  $2 revision  $3 label  $4 expected guildData files  $5 expected BotData.xml files
  local gd="$1" rev="$2" label="$3" eg="$4" eb="$5" dest="$DATA/$3" rec meta path oid mode typ g=0 b=0 odd=0 bad=0
  [ ! -e "$dest" ] || { echo "STOP  $label exists"; return 1; }
  mkdir -p "$dest" "$DATA/records" || return 1
  git --git-dir "$gd" ls-tree -r -z "$rev" -- guildData BotData.xml > "$DATA/records/$label.ls-tree.z" || { echo "STOP  ls-tree"; return 1; }
  while IFS= read -r -d '' rec; do                       # record: <mode> SP <type> SP <blob id> TAB <path>, NUL-terminated
    meta=${rec%%$'\t'*}; path=${rec#*$'\t'}; mode=${meta%% *}; oid=${meta##* }; typ=${meta#* }; typ=${typ%% *}
    case "$mode $typ" in "100644 blob"|"100755 blob") ;; *) odd=$((odd+1)); continue ;; esac
    case "$path" in guildData/*) g=$((g+1)) ;; BotData.xml) b=$((b+1)) ;; *) odd=$((odd+1)); continue ;; esac
    case "$path" in */*) mkdir -p -- "$dest/${path%/*}" ;; esac
    git --git-dir "$gd" cat-file blob "$oid" > "$dest/$path" || bad=$((bad+1))       # raw blob bytes: no attribute, no autocrlf, no filter
  done < "$DATA/records/$label.ls-tree.z"
  echo "$label: guildData=$g (want $eg) BotData.xml=$b (want $eb) unexpected_entries=$odd write_failures=$bad"
  [ "$g $b $odd $bad" = "$eg $eb 0 0" ] || { echo "STOP  $label: counts differ"; return 1; }
}

verify_data() {   # $1 git dir (any repository; used for hash-object only)  $2 label -- re-reads every file from disk
  local gd="$1" label="$2" dest="$DATA/$2" rec meta path oid n=0 bad=0 files
  while IFS= read -r -d '' rec; do
    meta=${rec%%$'\t'*}; path=${rec#*$'\t'}; oid=${meta##* }
    [ "$(git --git-dir "$gd" hash-object --no-filters -- "$dest/$path" 2>/dev/null)" = "$oid" ] || bad=$((bad+1))
    n=$((n+1))
  done < "$DATA/records/$label.ls-tree.z"
  files=$(find "$dest" -type f | wc -l | tr -d ' ')
  echo "$label: records=$n files_on_disk=$files hash_mismatches=$bad"
  [ "$bad" = 0 ] && [ "$n" = "$files" ] || { echo "STOP  $label: verification failed"; return 1; }
  ( cd "$dest" && find . -type f -print0 | sort -z | xargs -0 sha256sum ) > "$DATA/records/$label.sha256"
}

recheck_data() {  # $1 label -- later integrity check against the checksum list written by verify_data
  ( cd "$DATA/$1" && sha256sum -c --quiet "$DATA/records/$1.sha256" >/dev/null 2>&1 ); echo "$1: sha256 -c rc=$?"
}
```

**`copy-data.sh`**

```bash
. "$TOOLS/lib.sh"; . "$TOOLS/datacopy.sh"       # needs DATA, TOOLS and BKROOT (the directory holding the untouched pre-rewrite mirrors, <repo>.git)
mkdir -p "$DATA" "$DATA/records" "$DATA/manifests"
expect "destination is outside OneDrive" 0 "$(case "$(cd "$DATA" && pwd -W | tr 'A-Z\\' 'a-z/')/" in %USERPROFILE%/onedrive/*) echo 1 ;; *) echo 0 ;; esac)"
expect "destination is outside %PROJECTS%" 0 "$(case "$(cd "$DATA" && pwd -W | tr 'A-Z\\' 'a-z/')/" in %PROJECTS%/*) echo 1 ;; *) echo 0 ;; esac)"
expect "destination is private to this user" 0 "$(icacls "$(cygpath -w "$DATA")" | grep -c -i -E 'Everyone|BUILTIN\\Users|Authenticated Users')"

# 1. KotlinBottools main
KB="$BKROOT/KotlinBottools.git"
copy_data "$KB" refs/heads/main KotlinBottools-main 29 1 || exit 1
verify_data "$KB" KotlinBottools-main                    || exit 1

# 2. GKB2: the parent of the commit that deleted guildData/ from master
G2="$BKROOT/GKB2.git"
D=$(git --git-dir "$G2" rev-list -1 master -- guildData)
expect "deleting commit has exactly one parent"   2  "$(git --git-dir "$G2" rev-list --parents -1 "$D" | wc -w | tr -d ' ')"
expect "no guildData file at the deleting commit" 0  "$(git --git-dir "$G2" ls-tree -r -z "$D" -- guildData | tr -cd '\0' | wc -c | tr -d ' ')"
P=$(git --git-dir "$G2" rev-parse "$D^1")
expect "guildData files at its parent"            29 "$(git --git-dir "$G2" ls-tree -r -z "$P" -- guildData | tr -cd '\0' | wc -c | tr -d ' ')"
copy_data "$G2" "$P" GKB2-last-with-data 29 1            || exit 1
verify_data "$G2" GKB2-last-with-data                    || exit 1

# 3. TrumpBot main
TB="$BKROOT/TrumpBot.git"
copy_data "$TB" refs/heads/main TrumpBot-main 30 1       || exit 1
verify_data "$TB" TrumpBot-main                          || exit 1

: > "$DATA/COPY-VERIFIED"; echo "copy complete"
```

### 6.2 Procedure 4: the blob manifests (per repository, from its untouched mirror)

`manifests.sh` (`REPOS` selects repositories; default all six) runs `blob_manifest.py` on `$BKROOT/<repo>.git`
with the repository's purge list and writes `manifests/<repo>.blobs`, `.counts` and `.kept`. Expected output per
repository: `ok` lines, the two count lines (for example `refs=... commits=... distinct_trees=...` and
`blobs_total=... blobs_kept=... blobs_under_purged_paths=... blobs_shared=... manifest=...`) and "`<repo>:
entries that match no blob: N`", where N equals the number of entries the plan declares absent from this
repository's history (the builder also prints `entry_blobs=<n> entry=<entry>` lines; entries are plan constants,
never history paths). STOP on any `STOP`; STOP if N differs from the plan; STOP if `blobs_total` differs from the
independent `rev-list` count (the block compares them).

The rule is exactly filter-repo's: an entry matches a path if the path equals it or lies under it as a
directory, root-anchored and case-sensitive (`filename_matches`, see the sibling findings). `blobs_shared` counts
the blobs that sit under a purged and a kept path; they are not in the manifest (the empty blob is the usual
case; so is a file copied to a kept path).

**`blob_manifest.py`**

```python
"""blob_manifest.py -- exact manifest of blobs that a path-list rewrite makes unreachable.

usage: python -I blob_manifest.py GIT_DIR PURGE_LIST OUT_MANIFEST [PINNED_REF_PREFIX]

GIT_DIR      a bare mirror (every ref present, refs/pull/* included)
PURGE_LIST   the literal, root-anchored list given to `git filter-repo --paths-from-file`
OUT_MANIFEST receives one 40-hex blob id per line: blobs that occur under a purged path in
             some commit tree and under no kept path in any commit tree

PINNED_REF_PREFIX (optional, for example refs/pull/): the trees reachable from refs under this prefix
are counted as kept in full.  Use it to predict a fresh clone of a server that still serves those refs
unrewritten.  Omit it for the rewritten mirror itself, where every ref is rewritten.

Prints counts only.  Never prints a path from the history.
"""
import subprocess, sys

def git(gd, *args):
    r = subprocess.run(["git", "--git-dir", gd, *args], capture_output=True)
    if r.returncode != 0:
        sys.exit("STOP: git %s failed (status %d)" % (args[0], r.returncode))
    return r.stdout

def matches(path, entry):            # filter-repo's filename_matches (v2.47.0), on bytes
    n = len(entry)
    return path.startswith(entry) and (entry[n-1:n] == b"/" or len(path) == n or path[n:n+1] == b"/")

def main():
    gd, lst, out = sys.argv[1:4]
    pin = sys.argv[4].encode() if len(sys.argv) > 4 else None
    entries = []
    for line in open(lst, "rb").read().split(b"\n"):
        line = line.rstrip(b"\r")
        if not line or line.startswith(b"#"):
            continue
        if line.startswith((b"literal:", b"glob:", b"regex:")) or b"==>" in line:
            sys.exit("STOP: only plain literal entries are supported")
        entries.append(line)
    if not entries:
        sys.exit("STOP: empty purge list")
    types = set(git(gd, "for-each-ref", "--format=%(objecttype)").split())
    if types != {b"commit"}:
        sys.exit("STOP: a ref points at a non-commit object")
    nrefs = len(git(gd, "for-each-ref", "--format=%(refname)").splitlines())
    ncommits = len(git(gd, "rev-list", "--all").split())
    trees = sorted(set(git(gd, "rev-list", "--all", "--no-commit-header", "--format=%T").split()))
    pinned = set()
    if pin:
        pinned_refs = [r for r in git(gd, "for-each-ref", "--format=%(refname)").split() if r.startswith(pin)]
        if pinned_refs:
            pinned = set(git(gd, "rev-list", "--no-commit-header", "--format=%T",
                             *[r.decode() for r in pinned_refs]).split())
    kept, purged = set(), set()
    per_entry = [set() for _ in entries]
    gitlinks = 0
    for t in trees:
        data = git(gd, "ls-tree", "-r", "-z", t.decode())
        for rec in data.split(b"\0"):
            if not rec:
                continue
            meta, path = rec.split(b"\t", 1)
            mode, typ, oid = meta.split(b" ")
            if typ == b"commit":
                gitlinks += 1
                continue
            if typ != b"blob":
                sys.exit("STOP: unexpected tree entry type")
            hit = False
            if t in pinned:
                kept.add(oid)
                continue
            for i, e in enumerate(entries):
                if matches(path, e):
                    per_entry[i].add(oid)
                    hit = True
            (purged if hit else kept).add(oid)
    if gitlinks:
        sys.exit("STOP: %d gitlink (submodule) entries; the rule does not cover them" % gitlinks)
    only = sorted(purged - kept)
    with open(out, "wb", buffering=0) as f:
        f.write(b"".join(o + b"\n" for o in only))
    print("refs=%d commits=%d distinct_trees=%d pinned_trees=%d" % (nrefs, ncommits, len(trees), len(pinned)))
    print("blobs_total=%d blobs_kept=%d blobs_under_purged_paths=%d blobs_shared=%d manifest=%d"
          % (len(kept | purged), len(kept), len(purged), len(kept & purged), len(only)))
    for i, e in enumerate(entries):
        print("entry_blobs=%d entry=%s" % (len(per_entry[i]), e.decode("ascii", "replace")))

main()
```

**`manifests.sh`**

```bash
. "$TOOLS/lib.sh"          # needs WS (lists/<repo>-purge.txt), TOOLS, DATA, BKROOT; REPOS defaults to the six bot repositories
mkdir -p "$DATA/manifests"
for REPO in ${REPOS:-KotlinBottools GKB2 GKB BotTools TrumpBot Support}; do
  G="$BKROOT/$REPO.git"; LIST="$WS/lists/$REPO-purge.txt"; M="$DATA/manifests/$REPO.blobs"; C="$DATA/manifests/$REPO.counts"
  expect "$REPO: backup is a bare mirror" true "$(git --git-dir "$G" rev-parse --is-bare-repository)"
  python -I "$TOOLS/blob_manifest.py" "$G" "$LIST" "$M" > "$C"; expect "$REPO: builder status" 0 "$?"
  sed -n '1,2p' "$C"
  n() { sed -n "s/.*$1=\([0-9][0-9]*\).*/\1/p" "$C" | head -n 1; }
  # independent count of the blobs reachable from every ref
  ALL=$(git --git-dir "$G" rev-list --objects --all --no-object-names | git --git-dir "$G" cat-file --batch-check='%(objecttype)' | grep -c '^blob$')
  expect "$REPO: blobs_total == blobs reachable by rev-list" "$ALL" "$(n blobs_total)"
  expect "$REPO: manifest lines == manifest count"          "$(n manifest)" "$(wc -l < "$M" | tr -d ' ')"
  expect "$REPO: every line is a 40-digit id"               0 "$(grep -c -v -E '^[0-9a-f]{40}$' "$M")"
  expect "$REPO: every manifest blob exists in the backup"  0 "$(git --git-dir "$G" cat-file --batch-check < "$M" | awk '$2=="missing"{m++} END{print m+0}')"
  echo "$REPO: entries that match no blob: $(grep -c '^entry_blobs=0 ' "$C")"        # must equal the number of entries the plan declares absent
  echo "$(n blobs_kept)" > "$DATA/manifests/$REPO.kept"
done
```

### 6.3 Procedure 1: this clone

Preconditions: the data copy is verified (`COPY-VERIFIED`); the repository's rewritten mirror has been pushed
and proven; `RM` holds `commit-map`, `ref-map` and `first-changed-commits`; the owner has closed the project in
IntelliJ IDEA (a window that has the project open runs `git.exe` in the background and may hold files; the
session itself keeps working). Nothing here uses `--force`, nothing is pushed.

**Block 1: `realign-1-preflight.sh`.** Expected: about twenty `ok` lines; `local branches: 2` (`main`,
`docs/issue-1-bottools-consolidation`); `files the rewrite will remove from the working tree: <n>` (41 on
2026-10-21 for the planning branch with the parent research's list: `key.txt`, `BotData.xml`,
`WebParseKeys.xml`, 29 under `guildData/`, 2 under `services/`, 7 under `res/`). STOP lines mean the clone is not
in the state the procedure was written for; nothing has changed yet. In particular a local branch whose tip is
not in `commit-map` (it has commits of its own) stops the run: such a branch needs a rebase by a person.
The rule it applies to every local branch: take the tip's new id from `commit-map`; if the rewrite pruned the
tip (all zeros), walk first parents to the nearest commit that survived; if there is none, or the tip is not in
`commit-map`, STOP.

**Block 2: `realign-2-fetch.sh`.** Expected: `ok` for "server heads == ref-map (before fetching)", fetch, set-head,
"remote-tracking == ref-map", "no tags", "every local branch has a target", then `branches to move: 2`. Each
local branch gets one target: with a same-name counterpart on the server, the counterpart (provided the branch's
rewritten tip is at or behind it); without one (a branch that was never pushed), the rewritten tip itself, which
must lie on rewritten history. STOP before the fetch leaves everything unchanged; a STOP after it leaves only
refs under `refs/remotes/origin` updated and the block may be rerun.

**Block 3: `realign-3-move.sh`, then `realign-3b-verify.sh`.** Expected from block 3: `others=<n> collisions=0` (n
was 418 on 2026-10-21: the files of `.gradle/`, `.idea/`, `build/`), then `ok` lines for the reset and each
branch. Expected from 3b: `tracked files removed from the working tree: 41`, `removed == predicted`, "removed
files still on disk" 0, "untracked and ignored files unchanged", and every branch "at its target". A STOP at
the reset means a file could not be deleted; find the holder, close it, rerun block 3 and then 3b. If 3b alone
reports leftover files (and only that), delete exactly those after the holder is gone, then rerun 3b:

```bash
while IFS= read -r -d '' p; do [ -e "$p" ] && rm -f -- "$p"; done < "$WS/tmp/removed.z"
```

**Block 4: `realign-4-purge.sh`.** Expected: `ok` lines, then

```
count: 0
packs: 1
prune-packable: 0
garbage: 0
size-garbage: 0
```

and `ok` for "files in objects/pack" (3: `.idx`, `.pack`, `.rev`), "loose object directories", `fsck`, then for each of
`old-first.txt`, `old-changed.txt` and the manifest: "every id missing" and "control, untouched backup: none
missing", "unchanged commits present", "old ids left in .git outside objects/" 0. Any `STOP`: rerun the block
once after the cause (a lock, an antivirus scan) is gone; a second STOP is reported, not worked around. The
fallback (b) of 3.10 is then a person's decision.

**`lib.sh`**

```bash
# lib.sh -- sourced by every block.  expect LABEL WANT GOT: print ok, or print STOP and end the block.
expect() { if [ "$2" = "$3" ]; then echo "ok    $1"; else echo "STOP  $1: expected '$2', got '$3'"; exit 1; fi; }
yn()     { [ -e "$1" ] && echo 1 || echo 0; }
ZERO=0000000000000000000000000000000000000000

# plan_from_commit_map: for every local branch, the rewritten id of its old tip.  Run inside the old clone,
# before anything is fetched.  A tip that the rewrite pruned maps to its nearest surviving first-parent ancestor.
# Writes $WS/tmp/plan1.txt lines "<ref> <old tip> <new id | NOTINMAP | NOSURVIVOR>".
plan_from_commit_map() {
  git for-each-ref --format='%(objectname) %(refname)' refs/heads > "$WS/tmp/heads-before.txt"
  awk 'NR>1{print $1" "$2}' "$RM/commit-map" | sort > "$WS/tmp/map.txt"
  : > "$WS/tmp/plan1.txt"
  while read -r tip ref; do
    c=$tip; new=""
    while [ -n "$c" ]; do
      new=$(awk -v t="$c" '$1==t{print $2}' "$WS/tmp/map.txt")
      [ -z "$new" ] && { new=NOTINMAP; break; }
      [ "$new" = "$ZERO" ] || break
      c=$(git rev-parse -q --verify "$c^1^{commit}" 2>/dev/null)
      [ -z "$c" ] && new=NOSURVIVOR
    done
    echo "$ref $tip $new" >> "$WS/tmp/plan1.txt"
  done < "$WS/tmp/heads-before.txt"
  echo "local branches: $(wc -l < "$WS/tmp/plan1.txt" | tr -d ' ')"
  expect "every local branch is in commit-map" 0 "$(grep -c -E ' (NOTINMAP|NOSURVIVOR)$' "$WS/tmp/plan1.txt")"
}

# tally FILE-OF-IDS GITDIR: "<missing> <total>" for the ids in FILE as seen by GITDIR
tally() { git --git-dir "$2" cat-file --batch-check < "$1" | awk '$2=="missing"{m++} END{print m+0, NR}'; }

# prove_removed: every first-changed commit, every changed or pruned commit and every manifest blob is missing in
# the repository at $1 (a git dir), and present in the untouched backup $BK (the control).
prove_removed() {
  awk 'NR>1 && $1!=$2 {print $1}' "$RM/commit-map" | sort -u > "$WS/tmp/old-changed.txt"
  awk '{print $1}' "$RM/first-changed-commits" | sort -u > "$WS/tmp/old-first.txt"
  local f R P
  for f in "$WS/tmp/old-first.txt" "$WS/tmp/old-changed.txt" "$MANIFEST"; do
    R=$(tally "$f" "$1"); expect "$(basename "$f"): every id missing" "${R#* }" "${R% *}"
    P=$(tally "$f" "$BK"); expect "control, untouched backup: none missing" 0 "${P% *}"
  done
  expect "unchanged commits present" 0 "$(awk 'NR>1 && $1==$2 {print $1}' "$RM/commit-map" | git --git-dir "$1" cat-file --batch-check | awk '$2=="missing"{m++} END{print m+0}')"
}
```

**`realign-1-preflight.sh`**

```bash
. "$TOOLS/lib.sh"; mkdir -p "$WS/tmp"; cd "$CLONE" || { echo "STOP  cd"; exit 1; }
expect "inside a work tree"        true   "$(git rev-parse --is-inside-work-tree)"
expect "not bare"                  false  "$(git rev-parse --is-bare-repository)"
expect "tracked files unchanged"   0      "$(git status --porcelain --untracked-files=no | wc -l | tr -d ' ')"
expect "HEAD is on a branch"       0      "$(git symbolic-ref -q HEAD >/dev/null; echo $?)"
expect "one worktree"              1      "$(git worktree list | wc -l | tr -d ' ')"
expect "only heads and remotes"    0      "$(git for-each-ref --format='%(refname)' | grep -c -v -E '^refs/(heads|remotes)/')"
expect "one remote, origin"        origin "$(git remote)"
expect "origin URL"                "$URL" "$(git remote get-url origin)"
expect "fsmonitor unset"           1      "$(git config --get core.fsmonitor >/dev/null; echo $?)"
expect "no alternates"             0      "$(yn .git/objects/info/alternates)"
expect "no .keep pack"             0      "$(find .git/objects/pack -name '*.keep' | wc -l | tr -d ' ')"
expect "no gc/pack/prune config"   0      "$(git config --get-regexp '^(gc|maintenance|repack|pack|fetch\.prune|core\.(bigfilethreshold|worktree))' | wc -l | tr -d ' ')"
expect "no submodules"             0      "$(( $(git submodule status | wc -l) + $(yn .gitmodules) ))"
expect "no operation in progress"  0      "$(n=0; for f in MERGE_HEAD CHERRY_PICK_HEAD REVERT_HEAD BISECT_LOG rebase-merge rebase-apply sequencer index.lock; do n=$((n+$(yn .git/$f))); done; echo $n)"
expect "no other git.exe running"  0      "$(tasklist | grep -c -i '^git.exe')"
expect "no open handle in .git"    0      "$(python -I "$TOOLS/lockprobe.py" "$CLONE/.git")"
expect "data copy verified"        1      "$(yn "$DATA/COPY-VERIFIED")"
expect "rewrite outputs present"   4      "$(ls "$RM/commit-map" "$RM/ref-map" "$RM/first-changed-commits" "$MANIFEST" 2>/dev/null | wc -l | tr -d ' ')"
plan_from_commit_map
expect "purge list present"        1      "$(yn "$LIST")"
python -I "$TOOLS/predict_removed.py" "$LIST" > "$WS/tmp/predicted-removed.txt"; echo "files the rewrite will remove from the working tree: $(cat "$WS/tmp/predicted-removed.txt")"
rm -f "$WS/tmp/others-before.z" "$WS/tmp/index-before.z"      # block 3 takes its "before" sets fresh, once
```

**`realign-2-fetch.sh`**

```bash
. "$TOOLS/lib.sh"; cd "$CLONE" || { echo "STOP  cd"; exit 1; }
awk 'NR>1 && $3 ~ /^refs\/heads\// && $2 !~ /^0+$/ {print $2" "$3}' "$RM/ref-map" | sort > "$WS/tmp/expected-heads.txt"
git ls-remote --heads origin | tr '\t' ' ' | sort > "$WS/tmp/ls-remote.txt"
expect "server heads == ref-map (before fetching)" 0 "$(cmp -s "$WS/tmp/ls-remote.txt" "$WS/tmp/expected-heads.txt"; echo $?)"
git -c gc.auto=0 -c maintenance.auto=false fetch --quiet --prune --no-tags origin; expect "fetch exit status" 0 "$?"
git remote set-head origin --auto >/dev/null;                                     expect "set-head exit status" 0 "$?"
git for-each-ref --format='%(objectname) %(refname)' refs/remotes/origin | grep -v ' refs/remotes/origin/HEAD$' \
  | sed 's# refs/remotes/origin/# refs/heads/#' | sort > "$WS/tmp/remote-tracking.txt"
expect "remote-tracking == ref-map" 0 "$(cmp -s "$WS/tmp/remote-tracking.txt" "$WS/tmp/expected-heads.txt"; echo $?)"
expect "no tags"                    0 "$(git for-each-ref refs/tags | wc -l | tr -d ' ')"
: > "$WS/tmp/plan2.txt"
while read -r ref tip new; do
  b=${ref#refs/heads/}; rt=$(git rev-parse -q --verify "refs/remotes/origin/$b^{commit}")
  if [ -n "$rt" ]; then                                                   # same-name counterpart: the local branch must be at or behind it
    if git merge-base --is-ancestor "$new" "$rt"; then target=$rt; else target=STOP; fi
  else                                                                    # no counterpart: the commit-map result, which must lie on rewritten history
    n=$(git for-each-ref --contains "$new" --format='%(refname)' refs/remotes/origin | grep -c -v '/HEAD$')
    if [ "$n" -ge 1 ]; then target=$new; else target=STOP; fi
  fi
  echo "$ref $tip $target" >> "$WS/tmp/plan2.txt"
done < "$WS/tmp/plan1.txt"
expect "every local branch has a target" 0 "$(grep -c ' STOP$' "$WS/tmp/plan2.txt")"
echo "branches to move: $(wc -l < "$WS/tmp/plan2.txt" | tr -d ' ')"
```

**`realign-3-move.sh`**

```bash
. "$TOOLS/lib.sh"; cd "$CLONE" || { echo "STOP  cd"; exit 1; }
CUR=$(git symbolic-ref --short HEAD); CURT=$(awk -v r="refs/heads/$CUR" '$1==r{print $3}' "$WS/tmp/plan2.txt")
COL=$(python -I "$TOOLS/untracked_collisions.py" "$CURT"); echo "$COL"
expect "no untracked file in the way" 0 "${COL##*collisions=}"
# the "before" sets are written once, so that a re-run still compares against the original state
[ -e "$WS/tmp/others-before.z" ] || git ls-files -o -z | sort -z > "$WS/tmp/others-before.z"
[ -e "$WS/tmp/index-before.z"  ] || git ls-files -z    | sort -z > "$WS/tmp/index-before.z"
while read -r ref tip target; do
  b=${ref#refs/heads/}
  if [ "$b" = "$CUR" ]; then
    git reset --hard --quiet "$target" 2> "$WS/tmp/reset.err"; RC=$?          # the log can name paths: it is counted, never printed
    expect "reset exit status" 0 "$RC"; expect "reset warnings and errors" 0 "$(wc -l < "$WS/tmp/reset.err" | tr -d ' ')"
  elif [ "$(git rev-parse "$ref")" = "$target" ]; then
    echo "ok    $b already at its target"
  else
    git update-ref -m "realign to rewritten history" "$ref" "$target" "$tip"; expect "update-ref $b" 0 "$?"
  fi
done < "$WS/tmp/plan2.txt"
```

**`realign-3b-verify.sh`**

```bash
. "$TOOLS/lib.sh"; cd "$CLONE" || { echo "STOP  cd"; exit 1; }
git ls-files -o -z | sort -z > "$WS/tmp/others-after.z"; git ls-files -z | sort -z > "$WS/tmp/index-after.z"
comm -z -23 "$WS/tmp/index-before.z" "$WS/tmp/index-after.z" > "$WS/tmp/removed.z"
REMOVED=$(tr -cd '\0' < "$WS/tmp/removed.z" | wc -c | tr -d ' '); echo "tracked files removed from the working tree: $REMOVED"
expect "removed == predicted"        "$(cat "$WS/tmp/predicted-removed.txt")" "$REMOVED"
expect "removed files still on disk" 0 "$(n=0; while IFS= read -r -d '' p; do [ -e "$p" ] && n=$((n+1)); done < "$WS/tmp/removed.z"; echo $n)"
expect "untracked and ignored files unchanged" 0 "$(cmp -s "$WS/tmp/others-before.z" "$WS/tmp/others-after.z"; echo $?)"
expect "tracked files unchanged"     0 "$(git status --porcelain --untracked-files=no | wc -l | tr -d ' ')"
while read -r ref tip target; do expect "${ref#refs/heads/} at its target" "$target" "$(git rev-parse "$ref")"; done < "$WS/tmp/plan2.txt"
```

**`realign-4-purge.sh`**

```bash
. "$TOOLS/lib.sh"; cd "$CLONE" || { echo "STOP  cd"; exit 1; }
git update-ref -d ORIG_HEAD; rm -f .git/FETCH_HEAD
git reflog expire --expire=now --all;                                                  expect "reflog expire status" 0 "$?"
git -c gc.auto=0 -c maintenance.auto=false gc --prune=now --quiet;                     expect "gc status"            0 "$?"
CO=$(git count-objects -v | tr -d '\r')
for k in count packs prune-packable garbage size-garbage; do echo "$k: $(echo "$CO" | sed -n "s/^$k: //p")"; done
expect "loose objects"             0 "$(echo "$CO" | sed -n 's/^count: //p')"
expect "packs"                     1 "$(echo "$CO" | sed -n 's/^packs: //p')"
expect "loose leftovers"           0 "$(echo "$CO" | sed -n 's/^prune-packable: //p')"
expect "garbage files"             0 "$(echo "$CO" | sed -n 's/^garbage: //p')"
expect "files in objects/pack"     3 "$(ls .git/objects/pack | wc -l | tr -d ' ')"
expect "loose object directories"  0 "$(ls .git/objects | grep -c -E '^[0-9a-f]{2}$')"
git fsck --full --no-dangling >/dev/null 2>&1;                                         expect "fsck status" 0 "$?"
prove_removed "$CLONE/.git"
expect "old ids left in .git outside objects/" 0 "$(grep -r -l -F -f "$WS/tmp/old-changed.txt" .git --exclude-dir=objects | wc -l | tr -d ' ')"
```

**`predict_removed.py`**

```python
"""predict_removed.py -- how many files of the current index does the purge list remove?

usage (inside the work tree):  python -I predict_removed.py PURGE_LIST

The same root-anchored literal rule as git filter-repo's --paths-from-file.  Prints one number.
"""
import subprocess, sys

entries = [l.rstrip(b"\r") for l in open(sys.argv[1], "rb").read().split(b"\n") if l.rstrip(b"\r") and not l.startswith(b"#")]
r = subprocess.run(["git", "ls-files", "-z"], capture_output=True)
if r.returncode:
    sys.exit("STOP: git ls-files failed")

def hit(p):
    return any(p.startswith(e) and (e[-1:] == b"/" or len(p) == len(e) or p[len(e):len(e) + 1] == b"/") for e in entries)

print(sum(1 for p in r.stdout.split(b"\0") if p and hit(p)))
```

**`untracked_collisions.py`**

```python
"""untracked_collisions.py -- would `git reset --hard TARGET` overwrite or delete an untracked file?

usage (inside the work tree):  python -I untracked_collisions.py TARGET_COMMIT

Counts untracked files (ignored ones included) that sit where the target tree has a file, where it
has a directory, or below a path where it has a file.  Prints two numbers:  others=N collisions=M.
Names are never printed.
"""
import subprocess, sys

def run(*a):
    r = subprocess.run(["git", *a], capture_output=True)
    if r.returncode:
        sys.exit("STOP: git %s failed" % a[0])
    return r.stdout

target = sys.argv[1]
files = set(p for p in run("ls-tree", "-r", "-z", "--name-only", target).split(b"\0") if p)
dirs = set()
for f in files:
    parts = f.split(b"/")
    for i in range(1, len(parts)):
        dirs.add(b"/".join(parts[:i]))
others = [p for p in run("ls-files", "-o", "-z").split(b"\0") if p]   # no --exclude-standard: ignored files too
bad = 0
for u in others:
    parts = u.split(b"/")
    if u in files or u in dirs or any(b"/".join(parts[:i]) in files for i in range(1, len(parts))):
        bad += 1
print("others=%d collisions=%d" % (len(others), bad))
```

**`lockprobe.py`**

```python
"""lockprobe.py -- count files under the given directories that another process holds open.

usage: python -I lockprobe.py DIR_OR_FILE [...]

Tries to open every file with share mode 0 (no sharing).  The open fails exactly when some
other process has the file open.  Prints one number: the files that could not be opened.
Windows only.  Names are never printed.
"""
import ctypes, os, sys
from ctypes import wintypes

k = ctypes.WinDLL("kernel32", use_last_error=True)
k.CreateFileW.argtypes = [wintypes.LPCWSTR, wintypes.DWORD, wintypes.DWORD, wintypes.LPVOID,
                          wintypes.DWORD, wintypes.DWORD, wintypes.HANDLE]
k.CreateFileW.restype = wintypes.HANDLE
k.CloseHandle.argtypes = [wintypes.HANDLE]
INVALID = wintypes.HANDLE(-1).value

def openable(path):
    h = k.CreateFileW(path, 0x80000000, 0, None, 3, 0x80, None)   # GENERIC_READ, no sharing, OPEN_EXISTING
    if h == INVALID or h is None:
        return False
    k.CloseHandle(h)
    return True

busy = 0
for top in sys.argv[1:]:
    if os.path.isfile(top):
        files = [top]
    else:
        files = [os.path.join(d, f) for d, _, fs in os.walk(top) for f in fs]
    for p in files:
        if not openable(p):
            busy += 1
print(busy)
```

### 6.4 The delete-and-recreate variant

`origin` keeps its URL but points at a repository whose object store started empty and was then filled by the
mirror push. The procedure does not change; the block outputs are the same, because every comparison is against
the rewrite's `ref-map`, not against anything the server remembers. The differences:

- Block 2's first check, "server heads == ref-map (before fetching)", is mandatory: until the push finished the
  server has no refs, and `git fetch --prune` would delete every remote-tracking ref (3.4). The check also fails
  if the new repository holds a different set of heads than the rewrite produced.
- The fetch transfers the whole rewritten history: no pre-rewrite commit exists on the server, and every commit
  of these repositories changed (the root commit contained purge paths), so there is nothing to negotiate. It is
  small for KotlinBottools.
- `git remote set-head origin --auto` (block 2) repairs `origin/HEAD` if the new repository's default branch is
  not the one the clone remembered; the same block runs in the force-push case, where it is a no-op.
- A local branch that the new repository lacks takes the no-counterpart rule of block 2; nothing else depends on
  the server.
- No GitHub-side object of the old repository is reachable from the clone either way: the clone's own `.git` is
  all that block 4 cleans, and the controls come from the backup mirror, not from GitHub.

Tested against a local bare repository that was re-created empty and then filled by `git push --mirror` from
the rewritten mirror: while it was empty, block 2 stopped at its first check with all four remote-tracking refs
intact (a bare `git fetch --prune` against it deleted all four and exited 0); after the push, blocks 2 to 4
passed with the same outputs as in the force-push case.

### 6.5 Procedure 2: replacing the TrumpBot clone

Preconditions as in 6.3, with the TrumpBot rewrite pushed and proven and the project closed in the IDE. The
clone has no hooks, no local excludes, no stash, a single local branch `main` and the local keys `core`,
`remote`, `branch`, `submodule`, `lfs` only (read 2026-10-21; block `trumpbot-1` checks it), and four
untracked or ignored files, all in `.idea/`.

**`trumpbot-1-prepare.sh`** (touches nothing in the clone): the checks, `local branches: 1`, `untracked and
ignored files: 4`, and `tar status`, `tar entries`, `sha256 list lines` `ok`. It writes
`WS/tb-untracked.tar` and `WS/tb-untracked.sha256`. STOP changes nothing.

**`trumpbot-2-replace.sh`**: server heads equal `ref-map`; `mv` of the clone to `WS/TrumpBot-old` (a rename on one
volume: it fails without effect when any process holds a handle inside); `git clone` of the rewritten repository
to the same path; `tar --keep-old-files` restores the files (it refuses to overwrite, so a collision is a STOP);
checksums verify; the untracked and ignored set equals the saved list; remote-tracking refs equal `ref-map`;
`main` equals `origin/main`; one pack, no loose objects, `fsck`; then the same proofs as block 4 (every first
changed commit, every changed or pruned commit and every manifest blob missing, the control present). If a STOP
occurs *after* the `mv`, the old clone is intact in `WS/TrumpBot-old`: move it back (`mv "$WS/TrumpBot-old"
"$CLONE"` after removing a partial new clone) and report.

Last, only after every check passed:

```bash
rm -rf "$WS/TrumpBot-old"; echo "rm rc=$?"; [ -e "$WS/TrumpBot-old" ] && echo "STOP  old clone still exists" || echo "ok    old clone removed"
```

`rm: cannot remove ... Device or resource busy` or a remaining directory means a process holds a file: find it,
close it, run
`powershell.exe -NoProfile -Command "Remove-Item -LiteralPath '$(cygpath -w "$WS/TrumpBot-old")' -Recurse -Force"`
and check again. The new clone is not affected by a partial deletion. `feature/pokercommand` exists only as
`origin/feature/pokercommand`, as before. The tracked files the rewrite removed (`res/`, `list.dat`,
`ffmpeg.exe`, `key.pem`, ...) are not in the new clone and survive only in the backup mirror until the phase
deletes it; only `BotData.xml` and `guildData/` are in `DATA`.

**`trumpbot-1-prepare.sh`**

```bash
. "$TOOLS/lib.sh"; mkdir -p "$WS/tmp"; cd "$CLONE" || { echo "STOP  cd"; exit 1; }
expect "tracked files unchanged"   0      "$(git status --porcelain --untracked-files=no | wc -l | tr -d ' ')"
expect "local branches"            refs/heads/main "$(git for-each-ref --format='%(refname)' refs/heads)"
expect "only heads and remotes"    0      "$(git for-each-ref --format='%(refname)' | grep -c -v -E '^refs/(heads|remotes)/')"
expect "one worktree"              1      "$(git worktree list | wc -l | tr -d ' ')"
expect "one remote, origin"        origin "$(git remote)"
expect "origin URL"                "$URL" "$(git remote get-url origin)"
expect "local config keys"         0      "$(git config --local --list | grep -c -v -E '^(core|remote|branch|submodule|lfs)\.')"
expect "no hooks"                  0      "$(ls .git/hooks | grep -c -v '\.sample$')"
expect "no repository-local excludes" 0   "$(grep -v '^#' .git/info/exclude | grep -c .)"
expect "no stash"                  0      "$(git stash list | wc -l | tr -d ' ')"
expect "no other git.exe running"  0      "$(tasklist | grep -c -i '^git.exe')"
expect "no open handle in the clone" 0    "$(python -I "$TOOLS/lockprobe.py" "$CLONE")"
expect "data copy verified"        1      "$(yn "$DATA/COPY-VERIFIED")"
expect "rewrite outputs present"   4      "$(ls "$RM/commit-map" "$RM/ref-map" "$RM/first-changed-commits" "$MANIFEST" 2>/dev/null | wc -l | tr -d ' ')"
plan_from_commit_map
# keep the untracked and ignored files aside, with a checksum list
git ls-files -o -z | sort -z > "$WS/tmp/tb-others.z"
N=$(tr -cd '\0' < "$WS/tmp/tb-others.z" | wc -c | tr -d ' '); echo "untracked and ignored files: $N"
tar --force-local --null -T "$WS/tmp/tb-others.z" -cf "$WS/tb-untracked.tar";                    expect "tar status" 0 "$?"
expect "tar entries" "$N" "$(tar --force-local -tf "$WS/tb-untracked.tar" | wc -l | tr -d ' ')"
xargs -0 sha256sum < "$WS/tmp/tb-others.z" > "$WS/tb-untracked.sha256";            expect "sha256 list lines" "$N" "$(wc -l < "$WS/tb-untracked.sha256" | tr -d ' ')"
```

**`trumpbot-2-replace.sh`**

```bash
. "$TOOLS/lib.sh"; cd "$WS" || { echo "STOP  cd"; exit 1; }
awk 'NR>1 && $3 ~ /^refs\/heads\// && $2 !~ /^0+$/ {print $2" "$3}' "$RM/ref-map" | sort > "$WS/tmp/expected-heads.txt"
git ls-remote --heads "$URL" | tr '\t' ' ' | sort > "$WS/tmp/ls-remote.txt"
expect "server heads == ref-map"   0 "$(cmp -s "$WS/tmp/ls-remote.txt" "$WS/tmp/expected-heads.txt"; echo $?)"
expect "old clone location free"   0 "$(yn "$WS/TrumpBot-old")"
mv "$CLONE" "$WS/TrumpBot-old";                                                     expect "move of the old clone" 0 "$?"
expect "old path is gone"          0 "$(yn "$CLONE")"
git clone --quiet "$URL" "$CLONE";                                                  expect "clone status" 0 "$?"
cd "$CLONE" || { echo "STOP  cd"; exit 1; }
tar --force-local -x --keep-old-files -C "$CLONE" -f "$WS/tb-untracked.tar" 2> "$WS/tmp/untar.err"; expect "untar status" 0 "$?"
expect "untar messages"            0 "$(wc -l < "$WS/tmp/untar.err" | tr -d ' ')"
( cd "$CLONE" && sha256sum -c --quiet "$WS/tb-untracked.sha256" >/dev/null 2>&1 );  expect "restored files match their checksums" 0 "$?"
git ls-files -o -z | sort -z | cmp -s - "$WS/tmp/tb-others.z";                     expect "untracked and ignored set identical" 0 "$?"
expect "tracked files unchanged"   0 "$(git status --porcelain --untracked-files=no | wc -l | tr -d ' ')"
git for-each-ref --format='%(objectname) %(refname)' refs/remotes/origin | grep -v ' refs/remotes/origin/HEAD$' \
  | sed 's# refs/remotes/origin/# refs/heads/#' | sort > "$WS/tmp/remote-tracking.txt"
expect "remote-tracking == ref-map" 0 "$(cmp -s "$WS/tmp/remote-tracking.txt" "$WS/tmp/expected-heads.txt"; echo $?)"
expect "local branch is main at origin/main" "$(git rev-parse origin/main)" "$(git rev-parse main)"
CO=$(git count-objects -v | tr -d '\r')
expect "packs"                     1 "$(echo "$CO" | sed -n 's/^packs: //p')"
expect "loose objects"             0 "$(echo "$CO" | sed -n 's/^count: //p')"
git fsck --full --no-dangling >/dev/null 2>&1;                                      expect "fsck status" 0 "$?"
prove_removed "$CLONE/.git"
```

### 6.6 Expected surviving blobs, and the exit tests that use the manifest

For a repository whose every ref is rewritten (the local rewritten mirror; KotlinBottools and TrumpBot, which
have no `refs/pull/*`, also in a fresh clone from GitHub):

```bash
KEPT=$(cat "$DATA/manifests/$REPO.kept"); MIRROR="$WS/$REPO.git"          # the rewritten mirror
SURV=$(git --git-dir "$MIRROR" rev-list --objects --all --no-object-names | git --git-dir "$MIRROR" cat-file --batch-check='%(objecttype)' | grep -c '^blob$')
expect "surviving blobs == blobs_kept" "$KEPT" "$SURV"
python -I "$TOOLS/blob_manifest.py" "$MIRROR" "$LIST" "$WS/tmp/after.blobs" | sed -n 2p      # blobs_under_purged_paths=0 ... manifest=0
git --git-dir "$MIRROR" cat-file --batch-check < "$MANIFEST" | awk '$2=="missing"{m++} END{print m+0, NR}'   # N N : every id missing
```

`blobs_kept` equals `blobs_total - manifest`, and the number of surviving commits is the sibling findings'
`T - P`. For a fresh GitHub mirror of a repository that still serves unrewritten `refs/pull/*` (GKB2, BotTools)
the old blobs those refs reach stay by design; the expectation for that mirror is obtained by running the builder
on the *backup* with the pinned prefix as a fourth argument:

```bash
python -I "$TOOLS/blob_manifest.py" "$BK" "$LIST" "$WS/tmp/$REPO-pinned.blobs" refs/pull/ | sed -n 1,2p   # blobs_kept = survivors in that fresh mirror; manifest = ids that must be missing
```

The empty tree is excluded from every check; trees are not part of the manifest.

### 6.7 Why this shape

The hardening exists because git's own exit status and `cat-file -e` can each be satisfied while old bytes remain
(3.6): the proof is therefore a conjunction of what git reports about reachability (`cat-file --batch-check`,
`fsck`), about files (`count-objects`, the pack directory), about refs (`for-each-ref`, `cmp` against `ref-map`)
and about text (`grep` of `.git` outside `objects/`), plus a positive control that shows the check is not blind.
The rule for branches uses `commit-map` because it is the only record of old to new that the rewrite emits, and it
turns "judgement" into a lookup with exactly two outcomes, a target or a STOP.

### 6.8 Files under `$TOOLS`

Saved once from this document (listings above): `lib.sh`, `datacopy.sh`, `copy-data.sh`, `blob_manifest.py`,
`manifests.sh`, `realign-1-preflight.sh`, `realign-2-fetch.sh`, `realign-3-move.sh`, `realign-3b-verify.sh`,
`realign-4-purge.sh`, `predict_removed.py`, `untracked_collisions.py`, `lockprobe.py`, `trumpbot-1-prepare.sh`,
`trumpbot-2-replace.sh`. They were exercised end to end on throwaway fixtures (a six-commit history with a pruned
commit, content-identical files under purged and kept paths, an empty blob, a pull ref, an untracked and an
ignored file, a branch that was never pushed; a locked file; a locked pack; a path with a bracket, comma and
space; CRLF, LF, mixed and binary blobs): all `ok`, and the intended STOPs (a branch with its own commit, an
untracked file in the way, a locked tracked file) fired.

## 7. Load-bearing claims

1. `git gc` keeps everything the index, reflogs and any ref under `refs/` reach; remote-tracking branches included.
   Quote:
   > it will keep not only objects referenced by your current set of branches and tags, but also objects referenced by the index, remote-tracking branches, reflogs (which may reference commits in branches that were later amended or rewound), and anything else in the refs/* namespace.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-gc.adoc ; git v2.55.0, section NOTES.

2. Notes content does not keep an object alive.
   Quote:
   > Note that a note (of the kind created by 'git notes') attached to an object does not contribute in keeping the object alive.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-gc.adoc ; git v2.55.0, section NOTES.

3. The reachability walk used by `git prune` (and so by `git gc`) starts from these roots: the index, all refs, `HEAD`, other worktrees' `HEAD`, rebase files and (for prune and gc) reflogs.
   Quote:
   > /* Add all refs from the index file */
   > add_index_objects_to_pending(revs, 0);
   > /* Add all external refs */
   > refs_for_each_ref(get_main_ref_store(the_repository), add_one_ref,
   > refs_head_ref(get_main_ref_store(the_repository), add_one_ref, revs);
   > /* detached HEAD is not included in the list above */
   > other_head_refs(add_one_ref, revs);
   > /* rebase autostash and orig-head */
   > add_rebase_files(revs);
   > /* Add all reflog info */
   > if (mark_reflog)
   > add_reflogs_to_pending(revs, 0);
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/reachable.c ; git v2.55.0, `mark_reachable_objects`.

4. The rebase state files that are roots are exactly these four.
   Quote:
   > "rebase-apply/autostash",
   > "rebase-apply/orig-head",
   > "rebase-merge/autostash",
   > "rebase-merge/orig-head",
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/reachable.c ; git v2.55.0, `add_rebase_files`.

5. `other_head_refs` visits only the `HEAD` of the other worktrees, so `ORIG_HEAD`, `FETCH_HEAD`, `MERGE_HEAD` are not roots.
   Quote:
   > if (wt->is_current)
   > continue;
   > strbuf_worktree_ref(wt, &refname, "HEAD");
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/worktree.c ; git v2.55.0, `other_head_refs`.

6. The pseudo-ref list of git 2.55 has two names.
   Quote:
   > static const char * const pseudo_refs[] = {
   > "FETCH_HEAD",
   > "MERGE_HEAD",
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/refs.c ; git v2.55.0, `is_pseudo_ref`.

7. The index and the reflogs of the other worktrees are walked unless the walk is limited to one worktree.
   Quote:
   > if (revs->single_worktree)
   > if (!revs->single_worktree)
   > add_other_reflogs_to_pending(&cb);
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/revision.c ; git v2.55.0, `add_index_objects_to_pending`, `add_reflogs_to_pending`.

8. `git gc --prune=now` uses `repack -a` (no cruft pack) and then `git prune --expire now`; `gc` first packs refs and expires reflogs with the configured defaults.
   Quote:
   > if (cfg->prune_expire && !strcmp(cfg->prune_expire, "now")
   > strvec_push(args, "-a");
   > /* run `git prune` even if using cruft packs */
   > strvec_pushl(&prune_cmd.args, "prune", "--expire", NULL);
   > if (cfg->pack_refs && maintenance_task_pack_refs(opts, cfg))
   > if (cfg->prune_reflogs && maintenance_task_reflog_expire(opts, cfg))
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/builtin/gc.c ; git v2.55.0, `add_repack_all_option`, `cmd_gc`, `gc_foreground_tasks`.

9. A manual `git gc` keeps whole packs only with `--keep-largest-pack` or `gc.bigPackThreshold`.
   Quote:
   > if (keep_largest_pack != -1) {
   > } else if (cfg.big_pack_threshold) {
   > find_base_packs(&keep_pack, cfg.big_pack_threshold);
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/builtin/gc.c ; git v2.55.0, `cmd_gc`.

10. Defaults of the reflog expiry, the cruft packs and the prune grace period.
   Quote:
   > defaults to 90 days. The value "now" expires all entries immediately
   > defaults to 30 days. The value "now" expires all entries immediately
   > Store unreachable objects in a cruft pack (see linkgit:git-repack[1]) instead of as loose objects. The default is `true`.
   > The value "now" may be used to disable this grace period and always prune unreachable objects immediately
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/config/gc.adoc ; git v2.55.0, `gc.reflogExpire`, `gc.reflogExpireUnreachable`, `gc.cruftPacks`, `gc.pruneExpire`.

11. `gc.recentObjectsHook` keeps objects regardless of age.
   Quote:
   > Interpret their output as object IDs which Git will consider as "recent", regardless of their age.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/config/gc.adoc ; git v2.55.0, `gc.recentObjectsHook`.

12. `now` and `all` mean "everything" for every expiry argument (`reflog expire`, `prune --expire`, `gc --prune`).
   Quote:
   > else if (!strcmp(date, "all") || !strcmp(date, "now"))
   > *timestamp = TIME_MAX;
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/date.c ; git v2.55.0, `parse_expiry_date`.

13. A reflog entry is expired when it is older than the limit.
   Quote:
   > if (timestamp < cb->opts.expire_total)
   > return 1;
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/reflog.c ; git v2.55.0, `should_expire_reflog_ent`.

14. `git reflog expire --all` processes every reference's reflog; `--expire=<time>` prunes older entries.
   Quote:
   > Process the reflogs of all references.
   > Prune entries older than the specified time.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-reflog.adoc ; git v2.55.0, options for `expire`.

15. `git prune` leaves packed unreachable objects; `repack -a` packs everything referenced into one pack.
   Quote:
   > Note that unreachable, packed objects will remain.
   > pack everything referenced into a single pack.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-prune.adoc and Documentation/git-repack.adoc ; git v2.55.0.

16. Repack never deletes `.keep` packs.
   Quote:
   > Note that we still do not delete `.keep` packs after `pack-objects` finishes.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-repack.adoc ; git v2.55.0, `--pack-kept-objects`.

17. `git reset --hard` removes tracked files absent from the target, may overwrite untracked files, and records `ORIG_HEAD`.
   Quote:
   > Overwrite all files and directories with the version from _<commit>_, and may overwrite untracked files. Tracked files not in _<commit>_ are removed so that the working tree matches _<commit>_.
   > Before the operation, `ORIG_HEAD` is set to the tip of the current branch.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-reset.adoc ; git v2.55.0.

18. `git fetch --prune` removes remote-tracking refs that the remote lacks; a forced update is flagged `+`; every fetch writes `FETCH_HEAD`.
   Quote:
   > Before fetching, remove any remote-tracking references that no longer exist on the remote.
   > `+`;; for a successful forced update;
   > The names of refs that are fetched, together with the object names they point at, are written to `.git/FETCH_HEAD`.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/fetch-options.adoc and Documentation/git-fetch.adoc ; git v2.55.0.

19. `git archive` converts every regular file to its working-tree form.
   Quote:
   > if (buffer && S_ISREG(mode)) {
   > convert_to_working_tree(args->repo->index, path, buf.buf, buf.len, &buf, &meta);
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/archive.c ; git v2.55.0, `object_file_to_archive`.

20. `core.autocrlf=true` implies `text=auto` and `core.eol=crlf`, and overrides `core.eol`.
   Quote:
   > Setting this variable to "true" is the same as setting the `text` attribute to "auto" on all files and core.eol to "crlf".
   > Note that this value is ignored if `core.autocrlf` is set to `true` or `input`.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/config/core.adoc ; git v2.55.0, `core.autocrlf`, `core.eol`.

21. `git hash-object --no-filters` hashes a file as is; `git cat-file <type>` returns the raw blob bytes.
   Quote:
   > Hash the contents as is, ignoring any input filter that would have been chosen by the attributes mechanism, including the end-of-line conversion.
   > If `<type>` is specified, the raw (though uncompressed) contents of the `<object>` will be returned.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/git-hash-object.adoc and Documentation/git-cat-file.adoc ; git v2.55.0.

22. `git rev-list --objects` names an object once, whichever name it meets first.
   Quote:
   > Note that the "name" of each object is ambiguous, and mostly intended as a hint for packing objects.
   > and if an object would appear multiple times with different names, only one name is shown.
   Source: https://raw.githubusercontent.com/git/git/v2.55.0/Documentation/rev-list-options.adoc ; git v2.55.0, `--object-names`.

23. filter-repo's `blob-shas-and-paths.txt` joins several names with a comma and a space inside brackets, and prints one name bare; its data comes from `diff-tree` over all revisions.
   Quote:
   > names_with_sha = b'[' + b', '.join(sorted(names_with_sha)) + b']'
   > ' | git diff-tree --stdin --always --root --format=%H%n%P%n%cd'
   > ' --date=short -M -t -c --raw --combined-all-paths')
   Source: https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/git-filter-repo ; git-filter-repo v2.47.0, `RepoAnalyze.write_report`, `RepoAnalyze.gather_data`.

24. filter-repo's path matching rule (the manifest classifier reproduces it).
   Quote:
   > Returns whether path_expression matches pathname or a leading directory thereof, allowing path_expression to not have a trailing slash even if it is meant to match a leading directory.
   Source: https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/git-filter-repo ; git-filter-repo v2.47.0, `filename_matches` (also quoted in the sibling findings).

25. The filter-repo manual's procedure for other clones.
   Quote:
   > After you have cleaned up the server, the easiest way to clean up other clones is to make everyone delete their existing clones and reclone.
   > delete all tags and run `git fetch --prune --tags`.
   > * git reflog expire --expire=now --all
   > * git gc --prune=now
   > (note that the first step drops all reflogs including all stash entries. That's a high cost, but needed to clean up the sensitive data)
   > git cat-file -t ${HASH_OF_FIRST_CHANGED_COMMIT}
   > you'll end up with a mess involving two or more copies of every commit.
   Source: https://raw.githubusercontent.com/newren/git-filter-repo/v2.47.0/Documentation/git-filter-repo.txt ; git-filter-repo v2.47.0, section "Make sure other copies are cleaned up: clones of colleagues".

26. GitHub's documentation on re-cloning.
   Quote:
   > They need to either discard their clone and re-clone, or carefully walk through multiple steps to clean up their clone first.
   Source: https://raw.githubusercontent.com/github/docs/main/content/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository.md ; docs repository `main`, read 2026-10-21, "High risk of recontamination".

27. Git for Windows asks (or consults `GIT_ASK_YESNO`) after five quick retries of a failed delete; without a terminal the answer is no; the hook's exit status 0 means retry.
   Quote:
   > retry_hook = mingw_getenv("GIT_ASK_YESNO");
   > return !run_command(&cmd);
   > if (!isatty(_fileno(stdin)) || !isatty(_fileno(stderr)))
   > return 0;
   > fprintf(stderr, "%s (y/n) ", question);
   > static const int delay[] = { 0, 1, 10, 20, 40 };
   > } while (retry_ask_yes_no(&tries, "Unlink of file '%s' failed. "
   > "Should I try again?", pathname));
   Source: https://raw.githubusercontent.com/git-for-windows/git/v2.55.0.windows.5/compat/mingw.c ; git-for-windows/git v2.55.0.windows.5, `ask_yes_no_if_possible`, `retry_ask_yes_no`, `mingw_unlink`.

28. Git for Windows clears the read-only attribute before deleting a file.
   Quote:
   > /* read-only files cannot be removed */
   > _wchmod(wpathname, 0666);
   Source: https://raw.githubusercontent.com/git-for-windows/git/v2.55.0.windows.5/compat/mingw.c ; git-for-windows/git v2.55.0.windows.5, `mingw_unlink`.

29. IntelliJ IDEA's Local History is independent of version control, records external changes, keeps 5 working days by default, and lives in the IDE system directory.
   Quote:
   > Local History helps you constantly track all changes made to a project independently of version control.
   > maintains revisions for all meaningful changes made both from the IDE and externally.
   > By default, Local History is configured to store revisions for the last 5 working days
   > Local History is stored as binary files under the LocalHistory subdirectory in the IntelliJ IDEA system directory
   > It also has a retention period and maximum size, so revisions are not guaranteed to persist.
   Source: https://www.jetbrains.com/help/idea/local-history.html ; IntelliJ IDEA 2026.2 documentation, read 2026-10-21.


## 8. Known gaps

- **The real clones were not modified**, so no number in 6.3 and 6.5 comes from a run on them: `41`, `418`, `4`,
  `29 + 1`, `30 + 1` are read-only measurements of 2026-10-21 and the blocks recompute them.
- **IntelliJ's behaviour during the procedure** (indexing, background fetch, file watchers) was not observed. The
  baseline probe found no open handle with the IDE idle; a project window left open is a precondition the owner
  must satisfy, and the blocks detect (but cannot prevent) a lock.
- **The interactive "Should I try again? (y/n)" prompt was not exercised** (no terminal in the test shell); its
  behaviour is read from `compat/mingw.c`. Behaviour of `GIT_ASK_YESNO=false` when `false` cannot be started is
  inferred from the code (`run_command` fails, so the answer is "no"), not observed.
- **Antivirus interaction** (a scanner holding a freshly written pack) cannot be reproduced; it would appear as
  the same lock cases and is covered by "rerun once".
- **IntelliJ Local History content was not inspected**, so it is not known whether it holds copies of the purged
  or the data files. Clearing it is outside git and outside this runbook.
- **Delete-and-recreate was simulated with local bare repositories**; GitHub-specific effects (repository id,
  default-branch selection, credential prompts, `refs/pull/*`) were not tested.
- **Files the rewrite removes other than `BotData.xml` and `guildData/`** (`key.txt`, `WebParseKeys.xml`,
  `services/`, `res/`, TrumpBot's `list.dat`, binaries and `key.pem`) are not preserved anywhere by these
  procedures; they remain only in the backup mirrors until the phase deletes them.
- **`tasklist` as a precondition is flaky** by design (3.6); the blocks are repeated, not worked around.
- **Everything the sibling findings leave open** (for example filter-repo on a kept path that `fast-import`
  rejects) is unchanged.

**Considerations:** none open.
