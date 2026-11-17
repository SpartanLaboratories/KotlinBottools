# Phase 0 · 7.4 — Replacing the private repository clone: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#42](https://github.com/SpartanLaboratories/KotlinBottools/issues/42),
  *"Phase 0 · 7.4 — Replace the private repository clone"*, unit 4 of
  [#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27), which is a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1). It is the last of #27's four units.
- **What this document is:** what this unit does to its surroundings and what it leaves behind:
  - the published artifacts;
  - the blast radius on GitHub, on this machine and in the documents;
  - adoption;
  - the sibling units and the neighbouring issues;
  - the known gaps, with the outcome of the plan's assumptions;
  - the follow-ups.

  It is written with the plan and brought up to date with the build, with the outcome of the plan's assumptions,
  before the landing that carries it.
- **Related:**
  - [`plan.md`](plan.md): the procedure, the grant, the requests, the expected lines and the stop table;
  - [`final-implementation.md`](final-implementation.md): what was built and read back, and every departure from the plan;
  - the parent design: [`../architecture.md`](../architecture.md) §10 (the clone replacement), with its dated note of
    2026-11-16 under §10.3, and §2.2, §5.1, §11, §12, §13.4, §16 and §17;
  - the parent consequences: [`../consequences.md`](../consequences.md), whose blast radius, known gaps and follow-ups for
    the whole of #27 this document does not restate;
  - the tools unit's consequences, [`../39-workspace-tools/consequences.md`](../39-workspace-tools/consequences.md), and the
    rewrites', [`../40-rewrites/consequences.md`](../40-rewrites/consequences.md).

`WS` is `%USERPROFILE%\BotWS` and `DATA` is `%USERPROFILE%\BotLegacyData`.

---

## 1. Published artifacts

None. No module is published and no version moves. The landing carries documents and generated boards only, and no
README or changelog of KotlinBottools changes. No repository's content changes in public; the one public addition is an
issue filed in KotlinBottools during the run, [#47](https://github.com/SpartanLaboratories/KotlinBottools/issues/47)
(§2.1).

---

## 2. Blast radius

### 2.1 GitHub

**One issue was filed during the unit, and nothing else was written.**
[SpartanLaboratories/KotlinBottools#47](https://github.com/SpartanLaboratories/KotlinBottools/issues/47) reports that the
clone set's request builder writes the replacement's check sentences into every kind of request; it changed no outcome of
this unit ([as built, deviation 3](final-implementation.md#4-deviations-from-the-plan)). No repository content, branch,
ref, setting, pull request, comment or label changed. The fresh clone read the first private repository through `gh` with the
read access of the account the request service runs as, and the unit's guards read the first private repository's two heads; the first private repository's history
is the one the rewrites pushed.

#47 is filed for the tools and is not a sub-issue of #27, so the closing of #27, whose guard requires every unit of #27
closed, does not wait on it.

**After the landing, #27 is closed as completed:** one `close-issue` request under the section `phase-0-tracking-27-close`,
which the owner gave on 2026-11-16, behind guards that every unit of #27 is closed and #27 is open
([plan, "After the landing: the closing of #27"](plan.md#after-the-landing-the-closing-of-27)). #28, blocked by #27, is
then unblocked.

### 2.2 This machine

- **The private repository clone, `%PROJECTS%\…`,** was replaced by a fresh clone of the rewritten repository at the same path
  ([as built, §1](final-implementation.md#1-what-was-built)):
  - **Carried:** its four `.idea/` files, restored without overwriting anything and equal to their checksums.
  - **Gone with the old clone:** the code knowledge graph built from the pre-rewrite tree (55 files), its two exclude entries,
    its two graph hooks and its two local configuration keys a plain clone does not write; and the graph service's board
    files' ignore at the clone's root, which the owner deleted before the unit's readiness.
  - **Rebuilt:** a code-only graph of the rewritten tree, no model spent, with its two hooks, its exclude entry and the board
    files' ignore with its own entry, made by the graph service at the owner's word once the old clone was deleted.
  - **The old clone in between:** renamed to `%PROJECTS%\…-old`, on the clone's volume and outside the workspace, for
    about ten minutes, with every pre-rewrite object of the first private repository and the clone's own access entries, which nothing changed
    before its deletion; the deletion followed the unit's own read of the fresh clone and did not wait for the graph.
  - **Afterwards:** every pre-rewrite commit of the first private repository and every purged blob is missing from the clone's object store, so
    no ref, reflog, stash or pseudo-ref of it reaches one, and no old-clone path remains.
- **`DATA`:**
  - the unit's record folder `run/g42/`: the two request files, the two stored replies, the census of the old clone, the
    archive of the four carried files with its checksum list and its list of names, the recorded path of the old clone, and
    the checksum list over the folder, `SHA256SUMS`;
  - the run log's lines for the unit's steps, and the document checks' files under `run/gate/`.

  The preparation unit's records, the rewrites' records, the manifest and the untouched backup were read only and still
  equal their lists.
- **`WS`:** the unit's data file and the grant's wording in `tmp/g27/units/`, its scratch folder `tmp/g27/g42/` (the saved
  replies among its files), and the two id files `prove_removed` writes in `tmp/`. The tool folders were read at their pins
  and were not changed.

  Everything in both folders holds ids, paths or names and is never committed, printed or quoted.
- **The request service's local state** changed at the owner's console only:
  - the grant section `phase-0-…-clone-replacement`, which holds no `Settings:` line
    ([as built, deviation 1](final-implementation.md#4-deviations-from-the-plan));
  - four allow lines, one per procedure of the replacement and one for the closing of #27, placed by the owner in the global
    settings file before the first call; no call was refused, and the request service did not restart;
  - the section `phase-0-tracking-27-close`.

  No deny rule was lifted. What is undone, and when, is §6.
- **The graph service** ran no graph job on the private repository checkout from the owner's word until the run's notice, then built
  the new graph; the checkout stays one of its checkouts with a graph.
- **This working tree** changes only by the landing.

### 2.3 Documents and generated boards

The landing carries what [plan, "Documentation impact"](plan.md#documentation-impact) lists: the plan, this document and the
as-built record; the dated note of 2026-11-16 on the parent design under
[§10.3](../architecture.md#103-what-is-carried-and-what-is-not), which states the board files' ignore as part of a graph's
footprint (the build changed nothing else the design describes, so no further callout is made); a "did not hold in the
build" note in [the parent research's verification results](../research/README.md#in-the-build); the one link line for this
unit in [the parent consequences, §4](../consequences.md#4-units-and-neighbouring-issues); and the regenerated boards.

---

## 3. Adoption

- **The clone set ran on a real clone for the first time:** the census and its closed-set guard, the rename as the lock
  probe, the archive and the restore, the proofs, the deletion at the recorded path and the graph's read-back, each on the
  private repository clone rather than on the self-test's made-up clones. Every step behaved as on the made-up clones.
- **A graph's footprint now includes the graph service's board files' ignore.** A clone replacement does not carry it: it
  was taken out of the old clone before the census, and the new graph's build placed it again.
- **The deletion of the old clone is the replacement's own last step,** at the recorded path; the workspace's deletion
  never reaches that path.
- **The allow lines stood before each first call,** one per procedure, as the parent design's dated note on §12 allows; no
  restart of the request service was needed.
- Nothing in KotlinBottools' code, build or published surface adopts anything from this unit.

---

## 4. Sibling units and neighbouring issues

**What this unit took from the earlier units of #27.** The contract is
[plan, "Interfaces with sibling units"](plan.md#interfaces-with-sibling-units); this is its summary.

| Unit | Takes |
|---|---|
| [#39](https://github.com/SpartanLaboratories/KotlinBottools/issues/39), the workspace tools | the tool folder at its pins; the format of the unit's data file with the clone set's policy values; the clone set (`k1-clone.sh`, `g27_clone.py`) and the grant check |
| [#40](https://github.com/SpartanLaboratories/KotlinBottools/issues/40), the rewrites | through `from=g40`: the first private repository's stage-8 marker, its `ref-map`, `commit-map` and `first-changed-commits` under their checksum list, the manifest and the untouched backup, read only; the first private repository's heads at `ref-map`'s new column; and, for the requests, the allow lines placed before the first call ([its as-built record, deviations 1 and 2](../40-rewrites/final-implementation.md#4-deviations-from-the-plan)) |
| [#41](https://github.com/SpartanLaboratories/KotlinBottools/issues/41), the residual measurement | nothing either way; both units' runner lines share the run log |

**The tools unit's assumptions this run exercised** ([its plan, Assumptions](../39-workspace-tools/plan.md#assumptions)): A13,
the real clone's shape, held but for the board files' ignore and its exclude entry, which the census recorded and the owner's
removal took out of the closed set; A5 and A6, the census's listing and the volume, process and open-file reads, held. The
tools unit's own consequences, a landed document, stay as they are; the request builder's defect is #47 (§5).

**What this unit leaves for #28.** [#28](https://github.com/SpartanLaboratories/KotlinBottools/issues/28), the residual
report and cleanup, takes the record that no old-clone path remains with its recorded path (`clone-moved.txt` in the unit's
record folder, `moved_to=…-old`), whose absence its cleanup confirms; the stored reply of the deletion; and the
unit's records under their checksum list `run/g42/SHA256SUMS`
([the parent design, §13.4](../architecture.md#134-28s-inputs)).

**Neighbouring issues:**

- **#27** is closed once this unit, its last, has landed, by the `close-issue` request under its own section (§2.1); this
  unit's pull request carries no closing keyword for it. Its consequences gain this unit's link line.
- **#28** stays blocked by #27 until then.
- **#47**, the request builder's check sentences, is open against the tools, outside #27's units (§5, §6).
- **#16, Phase 17,** archives the first private repository with BotTools and the second private repository once every purge of the phase is done.
- **#2** and **#1** are not closed by this unit.

---

## 5. Known gaps

What the build leaves open:

- **The clone set's request builder writes the replacement's check sentences into every kind of request**
  ([#47](https://github.com/SpartanLaboratories/KotlinBottools/issues/47)). The deletion request carried them, and a move-back
  request would. It changed no outcome: the procedures' markers and `outcome` decide, and the deletion's markers all printed
  ([as built, deviation 3](final-implementation.md#4-deviations-from-the-plan)). The tool folder stays at its pins; the fix is
  §6's follow-up.
- **The grant section of this unit's job holds no `Settings:` line**, which the plan's wording gives for the three allow lines
  ([as built, deviation 1](final-implementation.md#4-deviations-from-the-plan)), so the section does not itself name the allow
  lines to remove when it moves to history; §6 names them.
- **Some evidence lies under no checksum list.** The typed blocks' results (the requests built, the replies stored, the
  outcomes, the carried files' check, the graph's wait, the close-out's checks) leave no line in the run log, and the saved
  copies of the delivered replies are in the unit's scratch folder, which #28 removes with the workspace. The as-built record
  ([§3](final-implementation.md#3-measurements)) is their only committed home.
- **What no record proves.** No step read the old clone's access entries while it stood aside; that nothing changed them
  rests on the unit's own steps, which wrote none, and on the rename on one volume, which keeps them
  ([the clone findings, §3.2](../research/clone-move-aside-on-windows.md#32-who-may-read-the-old-clone-afterwards)).

**Outcome of the plan's assumptions** ([plan, Assumptions](plan.md#assumptions); the readings are in
[the as-built record, §3](final-implementation.md#3-measurements)). All held but A11, which held in part.

- **A1 held:** the board files' ignore was absent at `S0.census` (59 files, none elsewhere), the replacement's own census
  found the clone as recorded, and the graph service ran no job on the checkout before the run's notice.
- **A2 held:** the rename succeeded on its first try, with no error line.
- **A3 held:** no other `git.exe` ran at `S0.checks` or at the procedure's first entry.
- **A4 held:** the fresh clone holds exactly the ten local keys of a plain clone, one pack, no loose object, no hook beyond
  the samples, an exclude file of comment lines only and no `FETCH_HEAD`, at the procedure's proofs and at `S1.proofs`.
- **A5 held:** no git-lfs key appeared.
- **A6 held:** the deletion's `rm` wrote no error line, and nothing was left at the recorded path.
- **A7 held:** the fresh clone was made through `gh` with no error line.
- **A8 held:** each delivered reply held the procedure's printed lines as string entries of its `result`; the replacement's
  also held the 4 check strings under `result.checks`, which the store keeps too
  ([as built, deviation 2](final-implementation.md#4-deviations-from-the-plan)).
- **A9 held:** the clone and its parent folder stayed on one volume.
- **A10 held:** the first private repository's heads stayed at `ref-map`'s new column through the replacement.
- **A11 held in part:** the allow lines were enough, and no call was refused; the section was given without its `Settings:`
  line, which `S0.grant` recorded and which stopped nothing (deviation 1).
- **A12 held:** the build left the graph's folder with files, the two hooks, the graph's exclude entry and the board files'
  ignore with its entry, and no extra local key; the read-back recorded the ignore as its one difference.
- **A13 held:** the build started after the notice and was read finished after one wait of 9 minutes.
- **A14 held:** the census read 4, 55 and 0 files, 2 hooks, 2 exclude entries and 12 local keys, the second exclude entry being
  the board files' ignore's.

---

## 6. Follow-ups

- **The request service's settings for this job.** When the section `phase-0-…-clone-replacement` moves to history,
  as #42 lands, the three allow lines of the replacement, the deletion and the move back are removed from the global settings
  file, each read back once; the section names none of them (§5). The section `phase-0-tracking-27-close` moves to history
  once #27 is closed, and its allow line is removed with it.
- **The closing of #27,** once this unit has landed: the run's `close-issue` request under its section (§2.1).
- **A per-kind check list for the clone set's request builder**
  ([#47](https://github.com/SpartanLaboratories/KotlinBottools/issues/47)): the replacement, the deletion and the move back each
  with the check sentences of its own markers, in a new version of the pinned `g27_clone.py` made under the tools' defect
  rule: the new file carried whole with its new pin by the plan of the unit that makes it, the covering self-test kind run
  again, and a dated note in [the tools unit's consequences](../39-workspace-tools/consequences.md).
- **The credentials** stay the parent consequences' follow-up.

Of the plan's follow-ups ([plan, Sequencing and follow-ups](plan.md#sequencing-and-follow-ups)), two closed with the build:

- **A leftover of the old clone:** none; the deletion left nothing at the recorded path, which #28's cleanup confirms absent.
- **A graph build asked for again:** not needed; the first build was read back with its graph and its two hooks.

The graph service's upkeep of the private repository checkout resumed with the new graph once the run's notice had gone.
