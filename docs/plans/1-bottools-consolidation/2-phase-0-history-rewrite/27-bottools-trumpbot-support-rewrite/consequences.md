# Phase 0 · 7 — Rewriting BotTools, TrumpBot and Support, and replacing the TrumpBot clone: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#27](https://github.com/SpartanLaboratories/KotlinBottools/issues/27),
  *"Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone"*, a
  sub-issue of [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2), which is a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **What this document is:** what the work of #27 does to its surroundings and what it leaves behind, for the whole of
  #27 and its four units:
  - the published artifacts;
  - the blast radius on GitHub, on this machine and in the documents;
  - adoption;
  - the units, what each takes and hands on, and the neighbouring issues;
  - the known gaps the design cannot close before the units run;
  - the follow-ups.

  Each unit writes its own consequences in its own folder, with its own known gaps and follow-ups. This document
  links to them as each unit lands and does not restate them.
- **Related:**
  - [`architecture.md`](architecture.md): the systems design and the decomposition into four units;
  - [`research/README.md`](research/README.md): the evidence, its verification and its summary;
  - the parent design, [`../architecture.md`](../architecture.md) §6.4, §6.6, §9.5 and §15 unit 7, with the dated notes
    this design adds there;
  - the parent consequences, [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. Every landing of #27 and of its units carries documents and
generated boards only. No README or changelog of KotlinBottools changes.

What changes in public is the history of BotTools, which is public. The histories of TrumpBot and Support change as
well, and stay private (§2.1).

---

## 2. Blast radius

### 2.1 GitHub

**BotTools, TrumpBot and Support are force-pushed in place,** one push per repository, by the rewrites unit
([architecture §8](architecture.md#8-the-rewrites)).

- **The push.** Every branch of a repository goes in one atomic push, each branch under an explicit lease on the tip
  the mirror clone recorded. So each repository ends either wholly rewritten or unchanged, unless GitHub's side behaves
  otherwise, which the read-back after the push would show (§5).
- **Every commit id changes,** because every root commit of the three histories holds a purged path: BotTools' 16
  commits become 15, TrumpBot's 11 become 9, and Support's 2 become 1.
- **The files under the purged paths leave every commit,** the tips' trees included. In TrumpBot that is its data files,
  binaries and private key; in Support it is the vendored libraries and natives, 7,259 purged blobs.
- **Branches:** BotTools' `main` and `Working-Branch`, TrumpBot's `main` and `feature/pokercommand`, and Support's `main`.
- **Nothing else is written.** No issue, pull request, comment, label, setting or webhook is changed, and nothing is
  deleted. Each repository keeps its visibility and its default branch.

**What stays reachable on GitHub.** GitHub keeps serving every pre-rewrite object by id, with no documented expiry
([the parent consequences, §2.1](../consequences.md#21-the-six-repositories)).

- **BotTools.** Its pull-request refs, `refs/pull/2/head` and `refs/pull/3/head`, which GitHub hides from a push, keep 13
  old commits and all 39 purged blobs fetchable. A mirror clone of BotTools downloads them. Pull requests #2 and #3 keep
  showing their pre-rewrite commits. BotTools was public before, so this exposure is not new. The residual measurement
  counts it and claims no removal ([architecture §9](architecture.md#9-the-residual-measurement)).
- **TrumpBot and Support.** Their old objects stay readable by anyone with read access who is signed in, and by nobody
  anonymously.

**What each push publishes,** per rewritten branch:

- **An activity entry.** The activity feed gains one force-push entry, whose `before` is a pre-rewrite tip: one more
  published pre-rewrite id for BotTools, beside the objects GitHub already serves, and one readable only by those with
  access for the private repositories.
- **An event** in the repository's events.
- **For BotTools, a delivery.** One push delivery goes to its webhook, to a CircleCI host: 2 deliveries in all. No commit
  of BotTools' history holds a CI configuration. The webhook stays as it is, and the deliveries are recorded by count.

**Push protection** for users applies to BotTools' push only, the other two repositories being private. A refusal
leaves the remote unchanged, and the owner decides from the kept error file.

**Other clones.** Clones taken before the pushes keep the old histories, and their branches share no commit with the
server's afterwards. None of the three repositories has a fork. The one known clone on this machine, TrumpBot's, is
replaced (§2.2).

### 2.2 This machine

- **`%USERPROFILE%\BotWS`** (`WS`), deleted by #28:
  - a second tool folder, `tools/g27/`, beside the GKB2 and GKB unit's `tools/g26/`, which stays as it ran;
  - the three mirrors rewritten, with their untouched backups beside them;
  - a fresh mirror of each repository in `fresh/`;
  - the scan reports and the scratch files.
- **`%USERPROFILE%\BotLegacyData`** (`DATA`):
  - each repository's records in `rewrite/<repo>/`, beside the preparation unit's, which are never written;
  - each unit's run records under `run/`;
  - each repository's report row.

  They hold pre-rewrite ids and paths, and are never committed, printed or quoted.
- **The TrumpBot clone,** `%PROJECTS%\TrumpBot`, is replaced by a fresh clone at the same path by the clone replacement
  ([architecture §10](architecture.md#10-the-clone-replacement)):
  - **Carried:** its four `.idea/` files are restored.
  - **Gone with the old clone:** the old code knowledge graph, built from the pre-rewrite tree, with 6 of its nodes drawn
    from two purged files; its `.git/info/exclude` entry; its two graph hooks; and its two extra configuration keys.
  - **Rebuilt:** a code-only graph of the rewritten tree, built afterwards by the graph service at the owner's word,
    with its two hooks.
  - **The old clone in between:** it sits beside the clone, at `%PROJECTS%\TrumpBot-old`, on the clone's volume, outside
    the workspace. It keeps the clone's own access entries and holds every pre-rewrite object of TrumpBot until it is
    deleted. The clone replacement deletes it as its last step; the workspace's deletion does not reach it.
- **This working tree** changes only by the landings.
- **The request service's local state** changes at the owner's console only:
  - a grant section for the rewrites unit's job, with the `git push --force-with-lease` deny rule lifted for that job
    and restored when its section ends;
  - a grant section for the clone replacement's job;
  - any allow line, with its restart, that a refused call needs.

### 2.3 Documents and generated boards

- **This folder:** the research, the systems design and this document. The units' plan folders, `<number>-<slug>/`,
  are added inside it as each unit is planned.
- **The parent design and the parent consequences** take the dated notes that
  [architecture §13.1](architecture.md#131-dated-notes-on-the-parent-documents) lists, with this design's landing.
- **The GKB2 and GKB unit's consequences** take one dated note for each gap and follow-up the tools unit closes, at that
  unit's landing.
- **The registry of systems** gains the four units in place of unit 7. The board service makes the change
  ([architecture §13.2](architecture.md#132-the-registry)).
- **No legacy repository** receives a commit. The README pointers and the archives belong to Phase 17.

---

## 3. Adoption

- **The atomic lease push.** A repository whose branches are all rewritten is pushed in one atomic push, with an
  explicit lease on every branch's recorded tip, after a dry run. The one-branch push of the GKB2 and GKB unit is its
  case of one branch. After every non-zero status, a read-back of every branch names the server's state: neither,
  both or partial.
- **The tool folder.** The new tool folder serves these three repositories:
  - the GKB2 and GKB unit's folder is kept as it ran and never saved again;
  - the preparation unit's clone scripts are replaced by the clone set and never run;
  - the two workspace scripts that pin the earlier scan configuration stay unrun.
- **The parameter table carries a repository's policy:** its branches, its visibility, its default branch, its webhook
  count and the marker its first stage waits for. A further repository is a row.
- **A clone is moved aside by a rename on its own volume,** guarded to stay on that volume, with the outcome read from
  the existence of the two paths. This replaces a move into the workspace, which on this machine crosses volumes.
- **The residual measurement runs as its own unit** after the last push, within the events' window. For these three
  repositories it does not run right after each push.

---

## 4. Units and neighbouring issues

**The units of #27,** sub-issues of #27 in landing order ([architecture §16](architecture.md#16-decomposition)):

| Order | Unit | Blocked by | Takes | Hands on |
|---|---|---|---|---|
| 1 | `workspace-tools` | — | the GKB2 and GKB unit's tools, as the source; the preparation unit's records, read only | the tool folder at its pins, with its four sets; the parameter rows; the grant check |
| 2 | `rewrites` | 1 | the rewrite set; the mirrors and backups, checked unchanged | per repository: the stage-8 marker, the rewrite's maps, the fresh mirror, the exit-test counts and the time of the push; for BotTools, the residual count and the webhook delivery count |
| 3 | `residual-measurement` | 2 | the residual set; the rewrites' records | the three report rows, the probe tallies and the feed records |
| 4 | `clone-replacement` | 2 | the clone set; TrumpBot's records | the fresh clone with its graph; the record that no old-clone path remains |

Each unit's own consequences hold what it leaves behind. This section gains one line per unit, linking to them, as
the unit lands. #27 is closed when its last unit has landed.

**What the units take from the earlier units of the phase:**

- from [the preparation unit](../21-preparation/consequences.md) (#21): the mirrors, the untouched backups, the
  manifests, the expectation rows, the positive-control records and the lists;
- from [the rewrite and swap unit](../23-kotlinbottools-rewrite-and-swap/consequences.md) (#23): the pipeline as it
  ran, and the privacy gate for the landings' document checks;
- from [the repository hygiene unit](../24-repository-hygiene/consequences.md) (#24): the workspace scan configuration,
  equal to `main`'s;
- from [the publication unit](../25-kotlinbottools-publish/consequences.md) (#25): the corrected anonymous route rules;
- from [the GKB2 and GKB unit](../26-gkb2-gkb-rewrite/consequences.md) (#26): its tools, as the source of the new folder;
  the corrected stage runner; the push pattern, the class table and the readiness pattern; and the gaps and follow-ups
  it recorded for this work, which the tools unit closes.

**Neighbouring issues:**

- **#28, the residual report and cleanup,** stays blocked by #27. It takes:
  - the three report rows, with BotTools' pull-request residual and webhook delivery count;
  - the residual records;
  - every unit's records with their checksum lists;
  - any default-rule finding, by rule id and count;
  - both tool folders and the stage runner, to copy at cleanup;
  - the record that no old-clone path remains, whose recorded path its cleanup confirms
    ([architecture §13.4](architecture.md#134-28s-inputs)).
- **#2 and #1** are not closed by #27 or its units. #2 closes with #28.
- **#16, Phase 17,** archives BotTools, TrumpBot and Support with README pointers once every purge of the phase is done.
- **#3, Phase 1,** is unaffected.

---

## 5. Known gaps

What the design cannot establish before the units run. Each unit's checks are written so that a surprise stops the
unit rather than being misread.

- **GitHub's side of an atomic push is not documented.**
  - GitHub advertises the capability, and git documents it as one transaction. One public log of a refused branch
    whose sibling was refused as `(atomic transaction failed)` is consistent with that.
  - BotTools' push is the first atomic push of two branches this phase makes against GitHub. If one branch of two is
    updated, the read-back names the state partial and hands back
    ([the research summary, §1](research/README.md#1-the-push-of-a-repositorys-branches)).
- **Whether push protection refuses a whole push or one ref** of a push of several refs is not documented. Under an
  atomic push the difference does not arise.
- **The field of a delivered reply that holds a procedure's printed lines** is not named by the request protocol. The
  GKB2 and GKB run met them as list entries on one line inside the reply's result. The rewrites' first push request is
  the check; the classifier stops plainly on a reply it cannot read.
- **The deliveries endpoint is untried.** Whether the pushing token can read the list of BotTools' webhook deliveries
  is shown by the tools unit's read of the repositories, before any push.
- **What a fresh clone from GitHub writes into `.git`** is taken from a clone of a stand-in repository on this machine.
  A difference stops the clone replacement's proofs before the old clone is deleted.
- **What the code-only graph build leaves** is inferred from the old clone's state. The read-back records what it left.
- **The events of a push cover 30 days.** A residual measurement that starts later than that reads no event of
  BotTools' push and records the reads as not valid.
- **What the probes cannot prove:** that GitHub has dropped the old objects, that cached views are gone, that no
  third-party copy exists, or that secret scanning examined the old objects (parent design §12.4).

---

## 6. Follow-ups

- **The credentials.** Rotate the 2023 session cookie and TrumpBot's private key if either could still be live; this
  stays the parent consequences' follow-up ([§6](../consequences.md#6-follow-ups)).
- **BotTools' webhook.** It stays as it is through this work. Whether to remove it when the repository is archived
  belongs with the archive, Phase 17 (#16).
- **Default-rule findings.** Any gitleaks default-rule finding recorded in a kept file of BotTools, TrumpBot or Support
  needs the owner's decision: a `targetRules` allowlist for that one rule and path, or acceptance as recorded.
- **BotTools' pull-request residual stays.** Only a request to GitHub Support, which the phase does not make, or the
  repository's removal would end it.
- **A leftover of the old TrumpBot clone,** should the clone replacement's deletion leave one, is deleted at its
  recorded path; #28's cleanup confirms the path absent.
- **The GKB2 and GKB unit's follow-ups for this work** are closed by the tools unit, each with a dated note in that
  unit's consequences at its landing.
- **The sub-issues** of #27 are filed after this design's landing, in the order of
  [architecture §16](architecture.md#16-decomposition), with their "blocked by" relationships.
