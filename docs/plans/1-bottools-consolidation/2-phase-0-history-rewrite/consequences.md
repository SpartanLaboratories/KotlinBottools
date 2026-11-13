# Phase 0 — History rewrite: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2),
  *"Phase 0 — History rewrite: purge secrets and data from the six bot repositories"*, a
  sub-issue of [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1).
- **What this document is:** what the phase does to its surroundings and leaves behind: the
  blast radius, adoption, the sibling units, the neighbouring issues, the follow-ups and the
  known gaps. It is written with the design and brought up to date once the units have landed.
- **Related:**
  - [`architecture.md`](architecture.md): the systems design and its units (§15);
  - [`research/README.md`](research/README.md): the evidence;
  - the parent [`../consequences.md`](../consequences.md): the initiative's own consequences.

---

## 1. Published artifacts

None. No module is published, and no version moves. The only change that lands on
KotlinBottools' `main` is repository infrastructure: the `.gitignore`, the secret-scan workflow
and its configuration, a README correction and a new `CHANGELOG.md` (architecture §10).

The rewrite itself changes two source files on `main` through the path scrub
(architecture §1.1 item 3):

- `build.gradle.kts`: its local Maven repository line names `%PROJECTS%` instead of a folder on
  this machine. The old build can no longer resolve anything from that folder; it could do so only
  on this machine anyway, and Phase 1 replaces the build.
- `GuildDataParser.kt`: a commented-out line names `%USERPROFILE%`. Nothing that runs changes.

---

## 2. Blast radius

### 2.1 The six repositories

- **Every commit id changes**, in all six repositories, because each root commit holds a purged
  path.
  - The rewrite prunes ten commits, three of them merges (findings 5 §3.A).
  - Every branch survives.
  - Documents cite commits by subject, and the pre-rewrite ids they already cite stay as dated
    citations.
- **GKB2, GKB, BotTools, TrumpBot and Support are force-pushed in place.**
  - Their default branches and their other branches (BotTools `Working-Branch`, TrumpBot
    `feature/pokercommand`) carry the rewritten history.
  - Their visibility does not change: GKB2, GKB and BotTools stay public, and TrumpBot and
    Support stay private.
  - Their archiving with README pointers is Phase 17's.
- **KotlinBottools is not force-pushed.** Its rewritten history goes to a fresh repository that
  takes the name and becomes public (§2.2).
- **The content of KotlinBottools' commits changes too.** Every file and commit message that names
  a machine-local path is rewritten: the project-checkouts folder becomes `%PROJECTS%`, and a
  user-profile folder becomes `%USERPROFILE%`. At 2026-11-07 that is hundreds of (commit, file)
  pairs, almost all in the planning documents, plus the two source files of §1. The legacy
  repository keeps the original text, private. The other five repositories are not scrubbed.
- **What stays reachable on GitHub without a Support ticket** (findings 3 §6.4, §6.6):
  - every pre-rewrite object of the five force-pushed repositories, served by id on every route,
    with no documented expiry;
  - for GKB2 and BotTools, their pull-request refs also keep the old history fetchable. At the
    research baseline that is 70 of GKB2's 81 purged blobs, and all 39 of BotTools'. For the
    three public repositories this exposure is not new;
  - for KotlinBottools, the pre-rewrite objects are public until the swap (§2.2), then only in the
    private legacy repository.

  > **Dated note, 2026-11-09.** KotlinBottools has been public since 2026-11-08 and stays so until the swap (architecture §2.1), so its purge-listed files and old objects are anonymously readable until then. The window cannot be undone: the residual report states it and that no measurement can exclude a copy taken during it (architecture §12.4).
- **Secret scanning and push protection** are turned on for the public KotlinBottools only.

### 2.2 KotlinBottools: the public repository and the legacy repository

- **The public `KotlinBottools`** is a new repository, with a new repository id. Its settings
  and access are copied from the old one (architecture §7.3).
  - Stars and watchers start empty.
  - No webhook, deploy key, secret, project item or Actions history exists to carry over.
  - Its activity feed starts with the rewritten history's push.
- **`KotlinBottools-legacy`** is the pre-rewrite repository, renamed, private and archived. It
  holds:
  - the pre-rewrite history and its activity feed;
  - the pull requests merged before the swap, with their `refs/pull/*`: #2's own landing and the
    landings of the units that run before the swap;
  - the milestone and labels;
  - no issue.

  It is the only place where the dated pre-rewrite citations resolve. Being archived, it accepts
  no push; deleting it is not planned (§6).

  > **Dated note, 2026-11-09.** Until the swap the repository is public under its current name, so the pre-rewrite history and the pull-request refs listed above are readable by anyone until then. The swap makes it private as it is renamed and archived (architecture §7.5).
- **The planning documents** reach `main` before the rewrite, through #2's own landing on the
  pre-rewrite repository. The rewritten `main` carries them to the public repository, so the
  parent roadmap's planning pull request is that landing, not a later one.

### 2.3 Issue numbers and links

- **Every number of the pre-rewrite repository is reproduced** in the public repository
  (architecture §7.4):
  - issues are transferred;
  - pull requests are reproduced by closed placeholder issues that point to the legacy
    repository.

  So `KotlinBottools#n` keeps naming the same item, or its placeholder, and the sub-issues' plan
  folders, named by number, stay right.
- **Relationships** that a transfer drops are re-created. That covers the 18 sub-issue links under
  #1, the 36 "blocked by" links inside the repository, the 19 with MagicBot and the 2 with WebTools
  #55, plus #2's sub-issue links and the units' own relationships.
- **Citations that keep resolving:**
  - 49 citations of KotlinBottools issues in MagicBot: 47 as `KotlinBottools#N` and 2 as issue
    URLs;
  - 6 in WebTools #55 and #58;
  - 5 in `SpartanLaboratories/.github`;
  - those in this repository's documents and issues (findings 5 §3.D).

  > **Dated note, 2026-11-09.** The moved issues' bodies and comments do change: a transfer rewrites their references to full names, and after the walk they name the target repository's temporary name, `SpartanLaboratories/KotlinBottools-next#N`, for the cited issues that moved, and `SpartanLaboratories/KotlinBottools#N` for the pull-request numbers that stay behind as placeholders (architecture §7.4). The latter resolve to the fresh repository after the swap, since every number is reproduced and the name is taken over. The former resolve too, through the redirect the rename leaves on the temporary name, as the rehearsal measured ([its as-built record](22-transfer-rehearsal/final-implementation.md#38-what-references-reach-after-the-renames)); the redirect lasts while no repository takes that name, and whether to leave them on it is the rewrite-and-swap unit's to decide, among the options architecture §7.4 names. Whether text in other repositories citing a moved issue is rewritten is unmeasured.
- **Links that name the planning branch** (`blob/docs/issue-1-bottools-consolidation/...`) stop
  resolving when #2's landing merges and deletes that branch. There are 56 of them:
  - 3 in #1's body and 1 in its comments;
  - 2 in each of #2 to #19;
  - 1 in MagicBot #1 and 2 in each of MagicBot #2 to #8;
  - 1 in WebTools #55.

  They are pointed at `main` (§6).

  > **Dated note, 2026-11-13.** Of the 56, 39 were in the bodies of #1 to #19, 16 are in MagicBot #1 to #8 and 1 is in WebTools #55. The comment on #1 holds a plain mention of the branch's name, not a link ([the publication unit's as-built record, §4.2](25-kotlinbottools-publish/final-implementation.md#42-the-comments-on-1-hold-no-blob-link-to-the-planning-branch)).

### 2.4 Other repositories in the organisation

- **MagicBot.**
  - Issue relationships to KotlinBottools issues are re-created where the walk drops them.
  - Its planning-branch links are repointed.
  - MagicBot#2 gets a comment on its `.gitleaks.toml` gaps (§6).
  - No code or document in MagicBot changes, and Phase 13 starts once KotlinBottools is public.
- **WebTools.** #55's two relationships and its one planning-branch link, as above. No code or
  document changes.
- **No other repository** in either organisation tracks a purged file name on its default branch
  (findings 5 §3.G).
- **Two new repositories,** `phase0-rehearsal-a-legacy` and `phase0-rehearsal-a`, both private
  and archived, remain from the rehearsal (§6).

### 2.5 This machine

- **`%USERPROFILE%\BotLegacyData`** remains after the phase. It holds:
  - the legacy data copies, which are personal data;
  - the manifests and rewrite records, which hold the lookup keys of the old objects;
  - the run logs and a copy of the tools.

  Nothing in it is committed, printed or quoted. The older copies are deleted once MagicBot's
  legacy import report has been checked (parent design §11).

  Its `run/scrub/` folder holds the path-scrub expression file, which names the project-checkouts
  folder and so is never committed or shared. It names no account.
- **`%USERPROFILE%\BotWS`** holds the backup mirrors, which contain everything the rewrite
  removes, for as long as the units take. The last unit deletes it.
- **What exists nowhere afterwards** is everything the rewrite removes other than the copied
  data:
  - `key.txt` and `WebParseKeys.xml`;
  - the `services/` polling state and `res/`;
  - TrumpBot's data files, binaries and `key.pem`;
  - Support's vendored libraries and natives.
- **git-filter-repo 2.47.0 stays installed** in the user scheme. gitleaks lives only in the
  workspace and in the tools copy.
- **This working directory** is realigned in place.
  - 41 tracked files leave its working tree.
  - Its refs and reflogs are reset to the rewritten history.
  - Its old objects are deleted, or remain unreachable until the deferred step (§6).
  - IntelliJ IDEA's Local History may keep copies of the removed files, outside git.
- **The TrumpBot clone** is replaced by a fresh clone at the same path, with its four untracked
  `.idea/` files restored.

### 2.6 Documents

- **The parent documents** carry dated callouts recording this phase's conditions (architecture
  §12.1): `architecture.md`, `roadmap.md` and `consequences.md`.
- **Issue edits:** #1's Phase 0 line, and #2's body, including the plan-folder line, which must
  read `2-phase-0-history-rewrite`. The plan-folder lines of #3 to #19 are corrected as each phase
  lands.
- **KotlinBottools' `README.md`** loses the project-structure entries that described files no
  longer in the repository, and names the secret-scan workflow.
- **`CHANGELOG.md`** is created, in the Keep a Changelog layout (architecture §10).
- **This folder and every planning document** become public with KotlinBottools. None of them
  holds a secret, a name, a Discord id, or a pre-rewrite commit id or purged blob id that this
  phase added.

---

## 3. Adoption

- **The secret-scan set-up.** KotlinBottools' `.gitleaks.toml` keeps MagicBot's three rules
  unchanged and adds `legacy-key-file` and `legacy-state-directory`, with no allowlist. MagicBot's
  configuration should come into line: drop its global allowlist and add the two rules (§6).

  > **Dated note, 2026-11-12.** The committed `.gitleaks.toml` also holds one allowlist table, scoped to one default
  > rule, one research document of KotlinBottools and one exact text, with the allowlist controls that test it
  > ([unit 4's plan, The scoped allowlist table](24-repository-hygiene/plan.md#the-scoped-allowlist-table)). There is
  > still no global allowlist, and the table is not part of MagicBot's alignment.
- **MagicBot's own CI is Phase 13's.** The workflow pattern of architecture §10 is the one it can
  adopt: a pinned and checksum-verified binary, a wrapper that proves the scan ran, and counts-only
  logs.
- **Phase 1** finds a `CHANGELOG.md` to extend, and adds its `ci.yml` beside the secret-scan
  workflow.
- **Phase 17** archives the five predecessor repositories on top of their purged histories.

---

## 4. Sibling units and neighbouring issues

**The units of this phase**, sub-issues of #2 in landing order (architecture §15):

1. `preparation`
2. `transfer-rehearsal`
3. `kotlinbottools-rewrite-and-swap`
4. `repository-hygiene`
5. `kotlinbottools-publish`
6. `gkb2-gkb-rewrite`
7. `bottools-trumpbot-support-rewrite`
8. `residual-report-and-cleanup`

`preparation` has landed; what it leaves for the units after it is in [its consequences, §4](21-preparation/consequences.md#4-sibling-units-and-neighbouring-issues).

`transfer-rehearsal` has run; what it leaves for the units after it is in [its consequences, §4](22-transfer-rehearsal/consequences.md#4-sibling-units-and-neighbouring-issues), and the known gaps of its tool, which `kotlinbottools-rewrite-and-swap` closes before reusing it, are in [§5](22-transfer-rehearsal/consequences.md#5-known-gaps).

`kotlinbottools-rewrite-and-swap` has run; what it leaves for the units after it is in [its consequences, §4](23-kotlinbottools-rewrite-and-swap/consequences.md#4-sibling-units-and-neighbouring-issues), with its known gaps and follow-ups in §5 and §6 there.

`repository-hygiene` has landed; what it leaves for the units after it is in [its consequences, §4](24-repository-hygiene/consequences.md#4-sibling-units-and-neighbouring-issues), with its known gaps and follow-ups in §5 and §6 there.

`kotlinbottools-publish` has landed; what it leaves for the units after it is in [its consequences, §4](25-kotlinbottools-publish/consequences.md#4-sibling-units-and-neighbouring-issues), with its known gaps and follow-ups in §5 and §6 there.

**Neighbouring issues:**

- **#1,** the tracking issue. Its planning documents land with #2's own landing.
- **#3, Phase 1.** It starts once unit 3 has landed, from the rewritten `main` of the public
  repository.
- **#16, Phase 17.** It archives GKB2, GKB, BotTools, TrumpBot and Support once all six purges are
  done.
- **MagicBot#2, Phase 13.** It waits on unit 5, and receives the `.gitleaks.toml` comment.
- **WebTools #55.** Its relationships to #9 and #16 are kept.

---

## 5. Known gaps

- **The requests that units 2 to 8 need do not exist yet.** They cover:
  - mirror pushes and force-pushes from a workspace mirror;
  - a repository's creation, settings, rename and archiving, and its visibility and security
    settings;
  - issue transfers and placeholder issues;
  - sub-issue and "blocked by" relationships, and issue-body edits;
  - the realignment of a checkout, and its replacement by a fresh clone.

  Until they exist, unit 2 and every later unit wait. Unit 1 needs none of them.

  > **Dated note, 2026-11-11.** The requests exist, and units 2 and 3 have used them. Unit 3 used `push-mirror`,
  > `repo-settings` and `realign-checkout`, none of which had been used before it, with `create-repo`, `create-label`,
  > `create-milestone`, `transfer-issue`, `placeholder-issue`, `rename-repo`, `repo-visibility` and `archive-repo`. No unit has
  > used `relationships` yet (no transfer has dropped a link), nor `edit-issue-body`, `repo-security` or `replace-clone`
  > ([unit 3's as-built record](23-kotlinbottools-rewrite-and-swap/final-implementation.md)).
- **The path scrub has been proved only on a fixture,** until unit 3 runs it on the real history.
  Its fidelity check and its zero-match count stop the unit before the push if it misbehaves.
- **The real histories have not yet been rewritten or scanned.** The derived counts, filter-repo's
  log lines, the scan times on TrumpBot and Support, and whether each real token file matches the
  token rule are confirmed by the units' first runs, each behind its own stop.
- **The secret-scan workflow and the Linux gitleaks binary have not run on GitHub.** The
  repository-hygiene pull request is their first run.
- **Issue transfers.** How a transfer treats numbers, closed issues, and sub-issue and "blocked by"
  links is undocumented. The rehearsal settles it before KotlinBottools is touched.
- **gitleaks' default rules have not been run on the legacy repositories' kept sources.** Any
  finding is recorded by rule id and count, and becomes a follow-up.
- **The privacy gate's name lists** come from the member files' name elements and the folder
  names. A display name stored in another form can be missed, and names shorter than five
  characters are counted, not reviewed.
- **The liveness of two credentials is not established:** the 2023 session cookie and TrumpBot's
  private key. The bot tokens are dead.
- **The object deletion in this working directory** may be deferred, because IntelliJ IDEA keeps
  the project open during the run. Until the deferred step runs, the clone holds unreachable old
  objects that no push can carry.
- **IntelliJ IDEA's Local History** may hold copies of the files the realignment removes. No git
  operation reaches them.
- **Git 2.56 exists.** The procedures were verified against 2.55.0.windows.5, which the units pin.

---

## 6. Follow-ups

**With #2's landing:**

- **Comment on MagicBot#2.** Its `.gitleaks.toml` exempts `README.md`, `.gitleaks.toml` and
  `docs/*.md` from every rule through a global allowlist, so a bot token pasted into its documents
  would pass. It also has no rule for `keys.txt`, `key.pem`, `logs/` or `services/`. The fix is to
  drop the global allowlist, or scope an `[[allowlists]]` entry to one rule with `targetRules`, and
  to add the two path rules that KotlinBottools' configuration carries.
- **Point the 56 planning-branch links at `main`** (§2.3).

  > **Dated note, 2026-11-13.** The publication unit (#25) pointed the links in the bodies of #1 to #19 at `main`. A plain mention of the branch's name in a comment on #1, 16 links in MagicBot #1 to #8 and 1 in WebTools #55 remain ([its consequences, §6](25-kotlinbottools-publish/consequences.md#6-follow-ups)).
- **Make the issue edits of §2.6.**

  > **Dated note, 2026-11-13.** #2's plan-folder line reads `2-phase-0-history-rewrite`, and #1's clause that placed the documents on the planning branch now places them on `main`, both edited by the publication unit (#25).

**When the units have landed:**

- **The rehearsal repositories.** Delete `phase0-rehearsal-a-legacy` and `phase0-rehearsal-a` if
  they are not wanted. That needs the `delete_repo` scope, which the phase neither has nor uses.
- **The deferred step.** If unit 3 recorded the object deletion as deferred, run it in this
  working directory with IntelliJ IDEA closed. The commands are in architecture §9.4 and in unit
  3's as-built record.
- **The credentials.** Rotate the 2023 session cookie and TrumpBot's private key if either could
  still be live.
- **The project's working notes on this machine.** Update the planning-state note with four facts:
  the public repository is a fresh one; the pre-rewrite repository is `KotlinBottools-legacy`,
  private and archived; the legacy data is in `%USERPROFILE%\BotLegacyData`; and whether the
  deferred step is still due.
- **The token rule.** If a positive control showed it missing a real token, change the
  `discord-bot-token` regex in both KotlinBottools' and MagicBot's configurations.
- **Default-rule findings.** Any finding recorded in a kept file of a legacy repository needs a
  decision: a `targetRules` allowlist for that one rule and path, or acceptance as recorded.
- **Machine-local paths in issue texts.** If unit 5's gate counts any in the public repository's
  issues, pull-request texts or comments, edit those texts. The scrub covers files and commits
  only.

  > **Dated note, 2026-11-13.** Gate 3 counted 0 matches over the 3019 issue, pull-request, comment and revision texts and run logs of the public repository ([the publication unit's as-built record, §3.3](25-kotlinbottools-publish/final-implementation.md#33-the-corpus-gate-3-the-id-check-and-the-runs)); there is nothing to edit.
- **`KotlinBottools-legacy`** stays private and archived. Deleting it later would also remove the
  only private copy of the old objects and the resolver of the dated citations.
