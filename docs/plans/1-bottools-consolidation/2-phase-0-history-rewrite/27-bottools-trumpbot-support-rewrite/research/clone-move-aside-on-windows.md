# Moving the old TrumpBot clone aside as the lock probe, when the workspace sits on another volume

**Question.** The TrumpBot clone is replaced by a fresh clone at the same path. The old clone is moved aside first, as
the lock probe, and deleted last. The clone sits on a volume other than the one that holds the workspace. Where does the
old clone go, and what does the fresh clone hold?

**Decision it informs.** The clone replacement's procedure: where the old clone goes, what the archive carries and how the
check of the restored set reads, and what the fresh clone's proofs name. It also informs the dated note on the parent
design ([`../../architecture.md`](../../architecture.md)): its §5.2 lists `TrumpBot-old/` inside the workspace, its §6.7
deletes it with the workspace, and its §9.5 step 3 moves the clone there.

**Requirements an answer meets.**

- The move fails with no effect while any process holds something inside the clone, and leaves the old clone whole, so a
  stop after it can move the clone back.
- The old clone becomes readable or modifiable by no more accounts than today, and is deleted last.
- The fresh clone's proofs name exactly what a plain clone holds, and the restored-set check reads correctly when four of
  the old clone's 59 untracked or ignored files are carried.
- Git Bash on Windows 11, NTFS on both volumes, git 2.55.0.windows.5, Git LFS 3.7.1. Nothing of the old clone's content
  and no pre-rewrite id is printed; every number below is a count.

## 1. Bottom line

- **Move the old clone by a same-volume rename to a sibling folder in the project-checkouts folder (option a), never by
  a cross-volume move.** A rename refuses with no effect while anything is open inside the tree; a cross-volume `mv` is a
  copy followed by a deletion, and with one file held it left 130 of 135 entries deleted from the source and a full copy
  at the target (observed), so it does not keep the lock probe's property and does not leave the old clone whole.
  Option (c) is the cross-volume case and is rejected on that ground.
- **The rename keeps the old clone's security descriptor** (observed: 8 entries on the folder, 4 on a file, all marked
  inherited, unchanged after the rename, also into a folder restricted to one account). So (a) widens access by nobody.
  Option (b)'s restricted parent adds nothing to the contents, because a renamed tree keeps its own entries and every
  account has the right to traverse folders it cannot list (documented). Narrowing the old clone itself would need a
  recursive rewrite of its entries; the one attempt here left empty access lists and had to be reset, so it is not part of
  the procedure.
- **Read the move's result from the two paths, never from `mv`'s status**, with a bounded retry of a refused rename. A
  refusal changes nothing (observed for nine holder shapes); a brief holder is outlasted by a retry (observed: refused,
  then moved on the second try). Add a same-volume guard (`stat -c %d` of the clone and of the target's parent, observed
  to differ across the two volumes) and an absent-target guard, so a cross-volume `mv` cannot run by accident.
- **`lockprobe.py` sees files only.** A process whose working directory is inside the clone, or a directory handle,
  scored 0 on it and still made the rename refuse (observed). The rename is the stronger probe; `lockprobe.py` stays as a
  pre-check, not as the proof.
- **The fresh clone holds exactly the ten plain-clone local keys, no hook but the 14 samples, an `info/exclude` of 6
  comment lines, one pack, no loose object, a one-entry reflog and no `FETCH_HEAD`** (observed on a clone of a throwaway
  repository over a `file://` URL). `submodule.active` comes only from a recursive clone and `lfs.repositoryformatversion`
  only from a later Git LFS command, so neither is a plain-clone key.
- **With four files carried, the archive's list is the `.idea/` records of `git ls-files -o -z`, behind a closed-set
  guard (59 = 4 + 55 + 0), and the restored-set check compares the fresh clone's list to the four-record list.** The
  unchanged check against the 59-file list stops (observed), and so do the preparation script's `no hooks` and
  `no repository-local excludes` checks on this clone.

## 2. Current state the answer starts from

Read on 2026-11-13, read only.

| Fact | Reading |
|---|---|
| The clone's folder and its parents up to the volume root | A plain folder (no reparse point). Entries: Administrators and SYSTEM full control, Authenticated Users Modify, Users read and execute, all marked inherited from the volume root. The scratch folder in the project-checkouts folder has the same entries. |
| The workspace `%USERPROFILE%\BotWS` | Entries: SYSTEM, Administrators and the account, full control, inherited from the profile. |
| Volumes | The clone's folder and the workspace report different `st_dev` values under Git Bash (`stat -c %d`). |
| The clone's size | 311 files (31 under `.git`), 153 MiB; one pack of 394 objects, no loose object, no stash; 221 tracked files. |
| Untracked or ignored (`git ls-files -o`) | 59: 4 under `.idea/`, 55 under `graphify-out/`, 0 elsewhere. |
| `.git/hooks` | The 14 samples plus `post-checkout` and `post-commit`; the file headers say they were installed by a graph tool's hook installer. |
| `.git/info/exclude` | One non-comment line. |
| Local configuration | 12 keys: the ten a plain clone writes, plus `submodule.active` (value `.`) and `lfs.repositoryformatversion` (value `0`). No `.git/lfs` folder; the tracked `.gitattributes` has no LFS rule. |
| System and user configuration | `core.autocrlf=true`, `core.symlinks=false`, `core.longpaths=true`, the LFS filter entries (in both files), `init.defaultbranch=master`; no template directory, no `core.hooksPath`. |
| Processes | No `python`, `graphify` or `git` process has the clone in its command line. |

## 3. Findings

### 3.1 What a move is, on Windows and in Git Bash

**Documented.** [`MoveFileExW`](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-movefileexw)
(page dated 2025-07-01): "When moving a directory, the destination must be on the same drive." The copy fallback
(`MOVEFILE_COPY_ALLOWED`) is described for files, "the function simulates the move by using the CopyFile and DeleteFile
functions", and "If a file is moved across volumes, MoveFileEx does not move the security descriptor with the file. The
file is assigned the default security descriptor in the destination directory."

**Documented, at the file-system level.** [MS-FSA, FileRenameInformation](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fsa/87f86c9b-6c2a-4803-84b7-131a74a434fa)
(2025-09-09) fails a rename to another volume with `STATUS_NOT_SAME_DEVICE`, and, for a directory, fails it with
`STATUS_ACCESS_DENIED` if the directory "contains open files". [The algorithm that decides it](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fsa/133840e4-778e-44ca-9b41-da2323615075)
(2025-08-11) walks every link under the directory, asks holders of batch or handle-caching oplocks to break, and "Return
FALSE // An open still exists; deny the operation." for any remaining open of any descendant. It names no sharing mode, so
a descendant's `FILE_SHARE_DELETE` does not help. The directory's own opens are not in that walk.

**Observed** (the tree of the experiments is 135 entries, 125 files, with read-only `.pack` files; versions at the end).
Same volume, `mv tree old`:

| Holder | `lockprobe.py` | `mv` status | Source entries after | Target entries after |
|---|---|---|---|---|
| none | – | 0 | 0 | 135 |
| a file, opened by Python's `open` (no delete sharing) | 1 | 1 | 135 | 0 |
| a file, opened with read, write and delete sharing | 1 | 1 | 135 | 0 |
| a file, opened with read sharing only | 1 | 1 | 135 | 0 |
| a file deep in the tree, a read-only pack file, a graph file | 1 | 1 | 135 | 0 |
| a process whose working directory is a subfolder | 0 | 1 | 135 | 0 |
| a process whose working directory is the clone's root | 0 | 1 | 135 | 0 |
| a Git Bash shell whose working directory is a subfolder | – | 1 ("Device or resource busy") | 135 | 0 |
| a directory handle on a subfolder, with delete sharing | 0 | 1 | 135 | 0 |
| a directory handle on the clone's root, with delete sharing | 0 | 0 | 0 | 135 |

A refusal is atomic in every row; the last row is the one exception to "any open", and matches the rule that the
renamed directory's own opens are not counted. Cross volume, `mv tree old`:

| Holder | `mv` status | Source entries after | Target entries after |
|---|---|---|---|
| none | 0 | 0 | 135 |
| a file, three sharing modes | 1 | 5 | 135 |
| a process whose working directory is a subfolder | 1 | 4 | 135 |
| a directory handle on a subfolder, with delete sharing | 0 | 0 | 135 |

So with a holder the cross-volume `mv` ends with a complete copy at the target and a source reduced to the holder's path
(130 of 135 entries gone). That is the opposite of a probe.

**Source for why.** GNU coreutils 8.32 `mv` (the build in this Git Bash), at tag
[`v8.32`](https://github.com/coreutils/coreutils/blob/v8.32/src/copy.c): `copy_internal` tries `rename`; "if
(rename_errno != EXDEV)" it reports "cannot move %s to %s" and stops with nothing copied, which is the same-volume
refusal; on `EXDEV` it copies, and [`do_move` in `mv.c`](https://github.com/coreutils/coreutils/blob/v8.32/src/mv.c)
then removes the source: "We reach this point if SOURCE has been successfully copied to DEST.  Now we have to remove
SOURCE." with `rm`, whose own failure only sets the exit status. The MSYS2 runtime (Cygwin 3.6.10, build id in
`uname`), [`rename2` in `winsup/cygwin/syscalls.cc`](https://github.com/msys2/msys2-runtime/blob/710e5275/winsup/cygwin/syscalls.cc),
opens the source with `DELETE` and calls `NtSetInformationFile(FileRenameInformation)`; its comment states the mapping `STATUS_NOT_SAME_DEVICE` to `EXDEV` ("That's bad since mv(1) will now perform a cross-device move"), which the runtime
avoids only for a volume mount point (it returns `EBUSY`), so a plain cross-volume rename reaches `mv` as `EXDEV` (the
copy fallback was observed); a held child is `STATUS_ACCESS_DENIED`, which `mv` reports as
"Permission denied" or "Device or resource busy" and never copies on.

*Tier: documented plus source plus observed.*

### 3.2 Who may read the old clone afterwards

**Observed.** A same-volume rename leaves the security descriptors as they were: 8 entries on the folder, 4 on a file, 4
of 4 marked inherited, also after the rename into a folder whose own list was only the account. A cross-volume move
into the workspace gave the copy the workspace's three entries (SYSTEM, Administrators, the account), no Users and no
Authenticated Users, and kept the read-only attribute on 3 of 3 pack files. **Documented:** the second is the
"default security descriptor in the destination directory" quoted above.

**Documented.** [Bypass traverse checking](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/bypass-traverse-checking)
(page updated 2026-04-27): "The default configuration for the Bypass traverse checking setting is to allow all users to
bypass traverse checking", and "This user right doesn't allow the user to list the contents of a folder. It only allows
the user to traverse folders to access permitted files or subfolders." On this machine the account holds
`SeChangeNotifyPrivilege` (enabled). So a restricted parent folder keeps others from listing it, not from opening a
file whose own entries allow it, and the renamed tree keeps its own entries.

**Observed, a negative result.** One recursive narrowing of the renamed tree (`icacls <tree> /inheritance:r /grant:r
<account>:(OI)(CI)F /T /C /Q`) left 0 entries on the files, so the account could not delete them; `icacls /reset /T`
repaired it. The cause was not established. Reading: narrowing the old clone is neither needed (the rename widens
nothing) nor safe to script without its own proof.

*Tier: observed plus documented.* Today's exposure is therefore unchanged by (a): the old clone stays readable by Users
and modifiable by Authenticated Users, exactly as the clone is now.

### 3.3 What a plain `git clone` writes here

**Observed** (throwaway repository cloned over a `file://` URL so that the transfer produces a pack as GitHub's does;
git 2.55.0.windows.5, Git LFS 3.7.1, the system and user configuration above):

- Local keys, 10: `core.repositoryformatversion`, `core.filemode`, `core.bare`, `core.logallrefupdates`, `core.symlinks`,
  `core.ignorecase`, `remote.origin.url`, `remote.origin.fetch`, `branch.main.remote`, `branch.main.merge`.
- `.git` top level, 10 entries: `HEAD`, `config`, `description`, `hooks`, `index`, `info`, `logs`, `objects`,
  `packed-refs`, `refs`. No `FETCH_HEAD`, no `lfs`. `hooks/` holds the 14 `.sample` files copied from the Git for
  Windows template folder and no other file. `info/exclude` has 6 lines, all comments. One pack, 0 loose objects. The
  reflog has 1 entry.
- A clone over a local path (no `file://`) hard-links loose objects instead (5 loose, no pack), so the one-pack proof
  is only meaningful for a transfer.
- Neither the installed LFS filter nor the clone's checkout adds a key or a hook when the tree holds no LFS object (a tree with an LFS rule in `.gitattributes` and no pointer file also added none).

**Where the old clone's extras come from** (observed unless marked):

| Extra | Cause |
|---|---|
| `submodule.active=.` | `git clone --recurse-submodules` without a pathspec. Documented in [`git-clone.adoc` at v2.55.0](https://github.com/git/git/blob/v2.55.0/Documentation/git-clone.adoc): "The resulting clone has `submodule.active` set to the provided pathspec, or "`.`" (meaning all submodules) if no pathspec is provided." Observed: the key appears with the flag and not without. |
| `lfs.repositoryformatversion=0` | A Git LFS command run in the clone after cloning: `git lfs ls-files`, `status`, `fetch`, `pull`, `track` and `install --local` each wrote it; `git lfs env` and `git lfs prune`, and git's own `fetch`, `pull`, `checkout` and `commit`, did not. Git LFS's own test [`t/t-repo-format.sh` at v3.7.1](https://github.com/git-lfs/git-lfs/blob/v3.7.1/t/t-repo-format.sh) asserts it after `git lfs track`. |
| `post-checkout`, `post-commit` | The graph tool's hook installer (the files' own header). Git LFS's own hook installation writes four hooks (`post-checkout`, `post-commit`, `post-merge`, `pre-push`), a key and a `.git/lfs` folder, and only for a repository whose tree holds LFS pointers (observed on a throwaway repository with one); this tree holds none. |
| the `info/exclude` line | The graph tool (the entry names its output folder). |

A fresh clone therefore holds none of the five extras, and one of them (the LFS key) can reappear later without any
clone-time cause. The proofs name the ten keys as an exact set at the moment right after the clone and the restore, and
read the LFS key afterwards as "absent, or `0` and nothing else".

*Tier: observed, with one documented line. Not observed: a clone from GitHub itself (the legacy repository is not
cloned for this research), so the equality of its `.git` with the `file://` clone's rests on the transport changing
nothing local, which is inferred.*

### 3.4 The archive and the restored-set check with four files carried

**Observed**, on a fixture shaped like the clone (a recursive clone of a throwaway repository, 3 untracked and 1 ignored
file under `.idea/`, 55 files under `graphify-out/`, one exclude entry, two hooks, the LFS key):

- `git ls-files -o` lists 59 records: untracked and ignored alike, without `--exclude-standard`. 4 under `.idea/`, 55
  under `graphify-out/`, 0 elsewhere.
- The preparation and replacement scripts' archive, restore and check steps on the fixture, with the list cut to the 4 `.idea/` records: tar status 0, 4 tar
  entries, 4 checksum lines; the fresh clone then holds 0 untracked files, restores with 0 messages and status 0,
  `sha256sum -c` status 0, and `git ls-files -o -z | sort -z | cmp - <four records>` status 0; `graphify-out/` files in
  the fresh clone: 0.
- The unchanged comparison against the 59-record list returns 1 (a STOP), as it should once the graph is not carried.
- A collision stops the restore: when the fresh tree already tracked `.idea/.gitignore`, `tar --keep-old-files` returned
  2 with 2 messages and the checksum and set checks followed with 1.

**Read-only on the real clone:** the preparation script's `no hooks` check (2 files beyond the samples), its `no
repository-local excludes` check (1 line) and its untracked-and-ignored count (59 against 4) stop on this clone; its
`local config keys` check passes (the pattern allows `submodule` and `lfs`) and says nothing of the two keys.

*Tier: observed on a fixture; the real clone's counts are read-only counts.*

### 3.5 Transient holders and a refused rename

**Source.** The runtime's own retry covers one case: a sharing violation when it opens the directory itself for
`DELETE`. [`rename2`](https://github.com/msys2/msys2-runtime/blob/710e5275/winsup/cygwin/syscalls.cc): "Typical BLODA
problem. Some virus scanners check newly generated files and while doing that disallow DELETE access ... This kludge
tries to work around that by yielding until the sharing violation goes away, or a signal arrived, or after about a
second, give or take." (40 tries of 10 ms). A holder inside the tree fails later, at the rename call, and is not retried
by it (observed: the refusals above are immediate).

**Documented.** The file-system algorithm gives oplock holders (the mechanism scanners and indexers use) a chance to
break before the rename is denied (2.1.4.2, quoted in 3.1), so a transient holder that cooperates is expected to
release within the rename call or soon after. **Inferred:** a brief refusal from a scanner is therefore worth a few
retries, and a refusal that lasts is a real holder.

**Observed.** A holder that released after 3.5 s, a retry loop one second apart that reads the state from the two paths:
try 1 refused (source present, target absent), try 2 moved (source absent, target present), `attempts=2 result=moved`. A
holder that outlived the loop: 2 tries, both refused, source present, target absent, `result=refused`, nothing changed.
Antivirus and indexer holders themselves were not reproduced on this machine.

*Tier: source and documented for the mechanism; observed for the loop; the number of tries is a judgement.*

## 4. How comparable tools do it

- **GNU `mv` and the MSYS2 runtime** (3.1) are the comparison that matters: same-volume is a rename that refuses
  atomically, cross-volume is copy-then-delete that does not. A procedure that wants the first behaviour has to make the
  second impossible, not hope for it.
- **The earlier unit's procedure** (`../../research/clone-realignment-and-data-extraction.md` §3.6 "Renames" and §6.5;
  the saved `trumpbot-1-prepare.sh` and `trumpbot-2-replace.sh`, read only) already relies on the rename refusing
  cleanly and on `lockprobe.py` as a pre-check, and states the property for one volume. It does not guard that the
  target is on the same volume, which is what this question adds.
- **Racket's installer** treats a refused directory rename as "a file in the directory is open" and falls back to copy
  and delete (reported in a search summary, not read at source); that fallback is the behaviour rejected here, because
  it is only acceptable where a partial result can be discarded.

## 5. The options against the requirements

| Requirement | (a) sibling folder, rename | (b) new folder on the clone's volume, rename | (c) workspace target, scan then copy then delete |
|---|---|---|---|
| Refuses with no effect while anything is open inside | Yes (observed, nine holder shapes; directory handles included) | Yes, same mechanism | No. The scan sees files only (cwd and directory handles scored 0), is a point-in-time check, and the copy-then-delete leaves the source mostly deleted when a holder appears (observed: 130 of 135 entries gone) |
| Old clone whole after a refusal, so a stop can move it back | Yes (135 of 135) | Yes | No after a partial deletion; the pre-rewrite objects exist twice until the deletion finishes |
| Readable or modifiable by no more accounts than today | Yes: descriptors unchanged (observed) | Yes, unchanged; the folder's restriction does not reach the renamed contents (observed, documented) | Yes, and narrower: the copy takes the workspace's three entries (observed). The only point in its favour |
| Deleted last | Yes: the procedure deletes it, same volume, as in the earlier procedure | Yes, plus a folder to delete | Original deleted first, copy last: the irreversible step moves to the front |
| Steps and leftovers | One rename; the move back is one rename | An extra folder to create, restrict and remove | Copy of 153 MiB, a scan, a deletion |
| Matches the parent design's workspace home | No: the old clone is outside the workspace | No | Yes |

(a) satisfies every requirement and is the smallest procedure. (b) adds a folder and an access list that restrict
nothing the rename leaves open. (c) fails the first two requirements outright.

## 6. Recommendation for this repository

**Where the old clone goes.** A sibling of the clone in the project-checkouts folder, by a single same-volume rename:
`%PROJECTS%\TrumpBot` becomes `%PROJECTS%\TrumpBot-old`. The parent design's note changes three statements:
`TrumpBot-old/` is not inside the workspace (§5.2); the workspace's deletion does not remove it, so the procedure
deletes it as its last step and the acceptance reads "old-clone paths remaining: 0" (§6.7); and the move of §9.5 step 3
is this rename, with a same-volume guard in front of it.

**The move, read from state.**

1. Guards, as counts and fixed markers: the target is absent; `stat -c %d` of the clone equals `stat -c %d` of the
   target's parent (STOP otherwise: this is what keeps `mv` from ever copying); `lockprobe.py` over the clone prints 0;
   no `git.exe` runs; the procedure's shell has its working directory outside the clone (the workspace). Record the
   census of the old clone (files and folders by `find`, expected 311 files) and its 59 untracked-or-ignored files.
2. Rename in a bounded loop, for example 5 tries one to two seconds apart, with the shell's `case` on two
   existence flags (source present, target present): `10` is refused (retry), `01` is moved, anything else (`11`, `00`)
   is a STOP naming the pair. `mv`'s status is never the outcome. A loop that ends refused is a STOP that changed
   nothing: report `lockprobe.py`'s count (0 means a directory handle or a working directory, not a file), end the
   holder's work out of band, and run the request again.
3. After a `moved`: the old clone's census equals the recorded one, so "whole" is a count, not a belief.

**The move back.** If anything stops after the rename: remove the partial fresh clone (guard first: its `origin` URL is
the repository's and it holds no object of the old clone's), then rename `TrumpBot-old` back to `TrumpBot`, and read the
census, the 59 files, the two hooks and the 12 keys again. A same-volume rename back has the same atomic refusal.

**What the archive carries.** The `.idea/` records of `git ls-files -o -z | sort -z`, four, behind a closed-set guard:
total 59, under `.idea/` 4, under `graphify-out/` 55, anywhere else 0 (a non-zero count outside the two folders is a
STOP, because it would be a file silently dropped). Tar status 0, 4 entries, 4 checksum lines.

**How the restored set is checked.** Untar with `--keep-old-files` (0 messages, status 0); `sha256sum -c` status 0 over
4 lines; `git ls-files -o -z | sort -z` equals the four-record list byte for byte (`cmp`); files under `graphify-out/` in
the fresh clone: 0. The comparison against the 59-record list is not used.

**What the fresh clone's proofs name**, in addition to the earlier procedure's proofs (remote-tracking refs equal
`ref-map`, `main` equals `origin/main`, one pack, 0 loose, `fsck`, the removed-commit and blob proofs):

- local keys: exactly the ten of 3.3, as a set, at the moment after the clone and the restore; `submodule.*` keys: 0;
  `lfs.*` keys: 0 at that moment;
- `.git/hooks`: 0 files beyond the 14 samples; `info/exclude`: 0 non-comment lines;
- `.git` top level: no `FETCH_HEAD`, no `lfs` folder; reflog: 1 entry per ref the clone made;
- untracked and ignored: 4, equal to the carried list.

After the code-only graph build, the proofs change to the build's own footprint: `.git/hooks` holds exactly the two
hooks named `post-checkout` and `post-commit`, `info/exclude` holds the one entry for the graph's folder, the local keys
still equal the ten (plus at most `lfs.repositoryformatversion` set to `0`, never `submodule.active`), and untracked and
ignored equals the four carried plus the graph's files. These expected values for the build are inferred from the old
clone's state, since the build is not run here.

**Deletion last.** `rm -rf "$PROJECTS/TrumpBot-old"` on the same volume, then the existence test as the outcome;
`Remove-Item -Recurse -Force` as the fallback, as before. A run that stops after the move and is not resumed leaves the
old clone, with every pre-rewrite object, outside the workspace: the handoff names its path.

**Idiom.** The shell and Python the tools follow already read outcomes from counts; the new parts are two flags and a
`case`, a `stat -c %d` comparison and four counts, no new tool.

## 7. Assumptions

- The clone's volume and the workspace's volume stay different, and the project-checkouts folder stays a plain folder
  (no junction, no mount point); the guard turns a change into a STOP. If false, the rename may cross a volume and the
  guard fires.
- Nothing holds a descendant open while the rename runs except, at most, a scanner or indexer that releases within
  seconds. If false, the rename refuses and the run stops with nothing changed.
- The graph tool's hooks do not leave a background process after a commit or a checkout; a process of that kind would
  show as a refusal, not as damage.
- The fresh clone's `.git` equals the `file://` clone's in the proofs' dimensions (3.3). If false, a proof reads a
  different key or file and stops before anything is deleted.
- The account that runs the procedure owns the old clone's files, so the final deletion needs no change of rights
  (not checked here).

## 8. Gaps

- **No clone from GitHub was made** (the legacy repository is not cloned); 3.3 rests on a `file://` clone of a throwaway
  repository.
- **Antivirus and indexer holders were not reproduced**, so the retry's count and spacing are a judgement. The runtime's
  own roughly one second of retry covers only the directory's own open.
- **Whether the graph hooks leave a background process** after a commit or a checkout is not established. A count of
  lines ending in `&` in the two hooks was 0; that is not a reading of their behaviour.
- **What the graph build writes into `.git/config`, `info/exclude` and `hooks/`** is read only from the old clone's end
  state; the build was not run.
- **The recursive narrowing of the old clone's access lists failed** and its cause is not established; the procedure
  does not narrow, and the claim that (a) widens nobody rests on the unchanged descriptors, not on a second account's
  access test.
- **A real move of the clone was not tried** (the clone is read only to this research); the rename's result on the real
  tree, 311 files with 3 read-only packs of the real size, is inferred from the 135-entry fixture.
- **How to find the holder of a refused rename** (a tool that lists open handles) is not sourced here; the procedure
  reports counts and stops.
- The Racket installer's fallback in section 4 came from a search summary and was not read at source.

## 9. Load-bearing claims

Outside-world claims, each with the sentence relied on.

1. **A directory cannot be moved to another drive by `MoveFileEx`.** "When moving a directory, the destination must be on
   the same drive." [MoveFileExW](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-movefileexw),
   page dated 2025-07-01.
2. **A cross-volume move takes the destination's default security descriptor.** "If a file is moved across volumes,
   MoveFileEx does not move the security descriptor with the file. The file is assigned the default security descriptor
   in the destination directory." Same page.
3. **A rename of a directory fails while anything inside is open, and fails across volumes.** "If **Open.File** contains
   open files as specified in section 2.1.4.2, the operation MUST be failed with STATUS_ACCESS_DENIED." and "Else if
   **DestinationDirectory.Volume** is not equal to **Open.File.Volume**: The operation MUST be failed with
   STATUS_NOT_SAME_DEVICE." [MS-FSA, FileRenameInformation](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fsa/87f86c9b-6c2a-4803-84b7-131a74a434fa),
   2025-09-09.
4. **Any open of any descendant denies it, after oplock holders have had a chance to break.** "The output is a Boolean. If
   the return value is TRUE, then no open files exist under the directory; if FALSE, then at least one open exists even
   after attempting to break oplocks." and "Return FALSE // An open still exists; deny the operation."
   [MS-FSA, Algorithm for Detecting If Open Files Exist Under a Directory](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fsa/133840e4-778e-44ca-9b41-da2323615075),
   2025-08-11.
5. **GNU `mv` copies, then removes, on `EXDEV`, and stops without copying on any other rename failure.** `mv.c`: "We reach
   this point if SOURCE has been successfully copied to DEST.  Now we have to remove SOURCE." `copy.c`: "if (rename_errno != EXDEV)", whose body reports "cannot move %s to %s" and returns false before any copy.
   [`mv.c`](https://github.com/coreutils/coreutils/blob/v8.32/src/mv.c) and [`copy.c`](https://github.com/coreutils/coreutils/blob/v8.32/src/copy.c)
   at tag `v8.32` (`mv --version` here: GNU coreutils 8.32).
6. **The MSYS2 runtime's rename maps `STATUS_NOT_SAME_DEVICE` to `EXDEV` and retries only the open of the source.** "NT returns
   STATUS_NOT_SAME_DEVICE ==> Win32 ERROR_NOT_SAME_DEVICE ==> errno EXDEV. That's bad since mv(1) will now perform a
   cross-device move." and "This kludge tries to work around that by yielding until the sharing violation goes away, or a
   signal arrived, or after about a second, give or take."
   [`winsup/cygwin/syscalls.cc`](https://github.com/msys2/msys2-runtime/blob/710e5275/winsup/cygwin/syscalls.cc) at
   commit `710e5275` (the build id in `uname -r`, 3.6.10).
7. **`--recurse-submodules` is what sets `submodule.active` on a clone.** "The resulting clone has `submodule.active` set
   to the provided pathspec, or "`.`" (meaning all submodules) if no pathspec is provided."
   [`Documentation/git-clone.adoc`](https://github.com/git/git/blob/v2.55.0/Documentation/git-clone.adoc) at `v2.55.0`.
8. **Git LFS writes `lfs.repositoryformatversion` when its commands run in a repository, not at clone time.** The test
   asserts `[ -z "$(git config --local lfs.repositoryFormatVersion)" ]` after `git init`, then
   `[ "$(git config --local lfs.repositoryFormatVersion)" = "0" ]` after `git lfs track '*.dat'`.
   [`t/t-repo-format.sh`](https://github.com/git-lfs/git-lfs/blob/v3.7.1/t/t-repo-format.sh) at `v3.7.1`.
9. **Every account may traverse folders it cannot list, so a parent folder's restriction does not protect a file whose
   own entries allow access.** "The default configuration for the Bypass traverse checking setting is to allow all users
   to bypass traverse checking." and "This user right doesn't allow the user to list the contents of a folder. It only
   allows the user to traverse folders to access permitted files or subfolders."
   [Bypass traverse checking](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/bypass-traverse-checking),
   updated 2026-04-27 (applies to Windows 10 and 11).

### Observed on this machine

Read and run on 2026-11-13: Windows 11 10.0.26200, git 2.55.0.windows.5, Git LFS 3.7.1 (go 1.25.1), GNU coreutils 8.32
`mv` under the MSYS runtime 3.6.10, Python 3.14.7. Experiments used throwaway trees and repositories in a scratch folder
on each volume; both were deleted.

- **O1.** The clone's folder and the scratch folder on its volume, and the volume root, carry Administrators and SYSTEM
  full control, Authenticated Users Modify and Users read and execute, inherited; the workspace carries SYSTEM,
  Administrators and the account (`icacls`, read only).
- **O2.** `stat -c %d` prints one value for the clone's folder, the scratch folder and the volume root, and another for
  the workspace and the profile.
- **O3.** The clone: 311 files, 31 under `.git`, 153 MiB, one pack of 394 objects, 0 loose, 221 tracked files, 59
  untracked or ignored (4 `.idea/`, 55 `graphify-out/`, 0 elsewhere), 2 non-sample hooks, 14 samples, 1 non-comment
  exclude line, 12 local keys including `submodule.active` and `lfs.repositoryformatversion`, 0 stashes (`git
  --no-optional-locks`, `ls`, `find`, counts only).
- **O4.** Same-volume rename: the ten-row table of 3.1 (135-entry tree).
- **O5.** Cross-volume `mv`: the four-row table of 3.1.
- **O6.** Descriptors after a same-volume rename into a one-account folder: 8 and 4 entries, unchanged; after a
  cross-volume move: 3 entries, no Users entries, 3 of 3 packs still read-only.
- **O7.** Retry loop: holder released after 3.5 s, `attempts=2 result=moved`; holder outliving 2 tries, `attempts=2
  result=refused`, source 1, target 0.
- **O8.** Plain clone over `file://`: 10 keys, 10 top-level `.git` entries, 14 samples only, 6 comment lines in
  `info/exclude`, 1 pack, 0 loose, 1 reflog entry; over a local path: 5 loose objects, 0 packs; `--recurse-submodules`:
  11 keys with `submodule.active` equal to `.`.
- **O9.** `git lfs` commands: `ls-files`, `status`, `fetch`, `pull`, `install --local --skip-repo` and `install --local`
  wrote `lfs.repositoryformatversion`; `env` and `prune` did not; `install --local` also wrote 4 hooks; a clone of a
  repository with one LFS file wrote the key, 4 hooks and a `.git/lfs` folder; `git fetch`, `pull`, `checkout` and
  `commit` in a plain clone wrote no LFS key.
- **O10.** Fixture of the archive: 59 records (4, 55, 0); carried list 4; tar 0 / 4 entries; 4 checksum lines; restore 0
  messages; `sha256sum -c` 0; set equal to the carried list 0; graph files in the fresh clone 0; comparison with the
  59-record list 1; collision case: untar 2, 2 messages.
- **O11.** One recursive `icacls /inheritance:r /grant:r ... /T` left 0 entries on files; `/reset /T` processed 7 files
  and restored 4 entries.
