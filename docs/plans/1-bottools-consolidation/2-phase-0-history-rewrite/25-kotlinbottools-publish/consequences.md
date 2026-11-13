# Phase 0 · 5 — Making KotlinBottools public: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#25](https://github.com/SpartanLaboratories/KotlinBottools/issues/25),
  *"Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection"*, a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit does to its surroundings and what it leaves behind:
  - the blast radius on GitHub, on this machine and in the documents;
  - what the later units of the phase take from it;
  - the known gaps the change leaves open, with the outcome of the plan's assumptions;
  - the follow-ups.

  It was written with the plan and brought up to date with the build, before the landing that carries it.
- **Related:**
  - [`plan.md`](plan.md): the procedure, its stages, its requests and its checks;
  - [`final-implementation.md`](final-implementation.md): what was built and measured, and every departure from the plan;
  - [`research/README.md`](research/README.md): the evidence;
  - the parent design: [`../architecture.md`](../architecture.md) §1.1 items 9 and 10, §6.5, §6.6, §7.5, §7.6, §8 and
    §15 unit 5;
  - the parent [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing carries documents and generated boards only.

What became public is the repository itself: its rewritten history on every ref, its issues and pull requests with their
comments and the earlier revisions of edited texts, and the list of its Actions runs.

---

## 2. Blast radius

### 2.1 GitHub

- **KotlinBottools is public.** Anyone can read and clone its code and history, and read its issues, pull requests and their
  texts. Anyone signed in to GitHub can read the logs of its Actions runs. Anyone can fork it
  ([as built §3.6](final-implementation.md#36-the-access-check-and-the-close)). Its activity is published.

  The legacy repository stays private and archived, and holds the only copy on GitHub of the objects of the history before the
  rewrite. The public window of the pre-rewrite repository (from 2026-11-08 to 2026-11-11T06:11:18Z,
  [the rewrite and swap unit's record](../23-kotlinbottools-rewrite-and-swap/final-implementation.md#39-the-swap)) is unchanged by
  this unit.
- **Secret scanning and push protection are on.** They were read back after the change to public
  ([as built §3.4](final-implementation.md#34-the-change-and-the-scanning-settings)). GitHub's scan of the existing history and of
  the issue and pull-request texts started when the setting was enabled and runs for an undocumented time. An alert it raises later
  reaches the owner through GitHub's own notification. Push protection checks every later push to the repository for the secret
  types GitHub detects. Generic patterns, validity checks and AI detection stay off.
- **The repository's Actions runs are free from now on.** Pull requests from forks run the `Secret scan` workflow with its
  read-only token, under the approval policy for first-time contributors.
- **Branch protection and rulesets are available.** None is set: the required status check is [Phase 1's](#6-follow-ups).
- **The bodies of #1 to #19 changed.** Their links to the deleted planning branch point at `main`, #1's link to the initiative's
  former impact document points at its consequences document, and #1's branch clause and #2's plan-folder line are corrected
  ([as built §1](final-implementation.md#1-what-was-built)). Each edit added revisions to the issue's edit history, which is public
  with the issue: a body edited for the first time lists its original text as a revision too.
- **References to KotlinBottools issues resolve for everyone.** MagicBot's and WebTools' issue texts cite KotlinBottools issues by
  `KotlinBottools#N` or through the reserved name `KotlinBottools-next`
  ([the rewrite and swap unit's consequences, §2.1](../23-kotlinbottools-rewrite-and-swap/consequences.md#21-github)). Until the
  change they answered "not found" to anyone without access.
- **Pre-rewrite commit ids in public text resolve to nothing in this repository.** They sit in three resolution comments (3 ids), in
  the boards' generated fields and texts (10 ids in the current files, 13 over their history), and in the older documents' dated
  citations. Every one of the 87 pre-rewrite commits answers "not found" here, anonymously
  ([as built §3.5](final-implementation.md#35-the-anonymous-measurements)).
- **The anonymous measurements spent a share of this machine's anonymous budget:** at most 48 of the 60 anonymous REST calls in the
  hour of the measurements, and at most 6 for the further feed read, with the web and git-protocol probes outside it.

### 2.2 This machine

- **The unit's tools** are saved in `%USERPROFILE%\BotWS\tools\p25\`, beside the phase's other tools, and are copied with them when
  the workspace is cleaned up.
- **Its records** are in `%USERPROFILE%\BotLegacyData\run\publish\`: the run's record with its checksum list in `record\`, and the
  landing's reads in `landing\`; Gate 3's corpus file and text dumps are in `run\gate\` beside Gate 2's. They hold ids and texts
  and are never committed, printed or quoted.
- **Nothing else changed:** the workspace configuration and wrapper stay equal to `main`'s, the two stale pins of the workspace
  scripts are left for #26 and #27, and this checkout changes only by the unit's landing.

### 2.3 Documents and generated boards

The landing carries what [plan, Documentation impact](plan.md#documentation-impact) lists:

- this unit's research, plan with its two earlier versions under `superseded/`, as-built record and this document;
- the dated notes on the parent design, and on the parent's and the earlier units' consequences;
- the regenerated boards.

No README change and no CHANGELOG entry: the landing carries documents only, and nothing the README says became false.

---

## 3. Adoption

- **The anonymous probes of the phase's other public repositories** take this unit's route rules. A 422 from `git/trees` means
  that the id exists as a blob, and a protocol-v2 `want` needs HTTP 200 and its body read. The earlier helpers read every 422 as
  "absent" and ignored the status of a `want`
  ([research summary §2](research/README.md#2-the-anonymous-measurements-and-the-access-check)).
- **Gate 3's corpus** includes the earlier revisions of edited issue and comment texts and the logs of the Actions runs. Any later
  publication of a repository of the phase can take the same corpus.
- **MagicBot** already has secret scanning and push protection on. This repository's settings now match it.

---

## 4. Sibling units and neighbouring issues

**What the later units take from this unit.** The contract is
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units); this is its summary.

- **`gkb2-gkb-rewrite` (#26)** and **`bottools-trumpbot-support-rewrite` (#27)** take the corrected anonymous probe rules for the
  anonymous measurements of their public repositories, and keep the two stale pins of the workspace scripts. They also take the
  follow-ups on the tools' self-tests and texts (§6).
- **`residual-report-and-cleanup` (#28)** takes:
  - KotlinBottools' row of the residual report: the anonymous tallies, the activity-feed membership, the public window of the
    pre-rewrite repository and the time of the change to public;
  - the alert reads, the third of them among the landing's reads;
  - the follow-ups below;
  - this unit's tools, copied with the workspace tools.

**What this unit took:** from the rewrite and swap unit (#23), the privacy gate, the allow-list with its record, the walk tool's
text dumps, the census, the accepted ids, the fresh repository's id, the commit map, the manifest and the probe helpers; from the
repository hygiene unit (#24), the workflow on `main` with its controls step, its runs, the workspace configuration equal to
`main`'s, and the shape check of a run's log.

**Neighbouring issues:**

- **#3, Phase 1,** sets the required status check on `main` together with its own workflow's checks.
- **MagicBot#2, Phase 13,** may start once this unit has landed; it also aligns MagicBot's `.gitleaks.toml`.
- **#29,** the organisation's documentation standard: a public repository of the free plan can publish a GitHub Pages site.
- **#2** and **#1** are not closed by this unit.

---

## 5. Known gaps

- **How soon each route answers anonymously after the change** is undocumented. The run's one reading of it
  ([as built §3.5](final-implementation.md#35-the-anonymous-measurements)) does not bound it
  ([research summary §2](research/README.md#2-the-anonymous-measurements-and-the-access-check)).
- **When GitHub's scan of the history ends** cannot be read on this plan. The three alert reads found none
  ([as built §3.7](final-implementation.md#37-the-landings-reads)); an empty list means "no alert yet", and a later alert reaches
  the owner from GitHub.
- **Throttle thresholds** of anonymous web and git-protocol requests are undocumented. No probe set met one.
- **No measurement can exclude a copy.** It cannot exclude a copy taken while the pre-rewrite repository was public, nor a fork,
  clone or archive of the public repository from the change on.
- **The events feed can lag by up to 6 hours,** so a later read may list an event the run's reads did not.
- **The result lines of several steps were shown and not kept.** The lines of S1 (and of `S1.save` and `S1.tools` when the blocks
  were saved again), of the pre-flip gate's four steps and of the other steps that keep no file went to the console only; the
  as-built record states their counts as they were read at the time. The kept results are the run's record, the self-tests run
  again before the landing, and the files the other steps write.
- **The stand-in cases of the anonymous helpers reach 6 of `classify`'s 11 answers;** the answer parser of `anon_want`, the budget
  guard, `feed_read` and `ctl_ok` on the REST and `want` routes have no stand-in case. The measurements exercised each of them once,
  against GitHub. In the self-test of `p25_writes.py`, of the verifying reads only the one of the scanning settings has a case; the
  verifying reads of an edit and of the change to public were exercised by the run, and the check of the change to private ran
  nowhere, the revert not being triggered.
- **`shapes`, the filter that checks each scan's output lines,** has no negative control in this unit.

**Outcome of the plan's assumptions** ([plan, Assumptions](plan.md#assumptions)):

- **A2 failed for one request.** The nineteen edits and the scanning request ran within the request service's usual turnaround,
  but the visibility request ran long after it was sent, so the change did not follow the pre-flip gate immediately
  ([as built §4.3](final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes)).
- **A1 held** without a read at the moment of the change: the authenticated reads made afterwards show no drift between Gate 3's
  dump and the change (the same section of the as-built record).
- **A3 to A11 held** ([as built §3](final-implementation.md#3-measurements)). What that record does not state:
  - A5: no probe set met a throttle;
  - A7: Gate 3 met no new allow-list key.

---

## 6. Follow-ups

**Left by this unit** ([plan, Sequencing and follow-ups](plan.md#sequencing-and-follow-ups)):

- **The remaining traces of the deleted planning branch outside the bodies.**
  - A plain mention of the branch's name, not a link, sits in a comment on #1. No request edits an existing comment.
  - Sixteen links sit in MagicBot #1 to #8 and one in WebTools #55, and those repositories were outside this unit's writes.
- **The required status check.** Phase 1 (#3) makes `Secret scan (gitleaks)` a required check on `main`, together with its own
  workflow's checks.
- **An alert from GitHub's scan,** if one appears, needs the owner's decision: rotate the secret, or dismiss the alert.
- **The stand-in cases of the anonymous helpers** (`S1.selftests`) write and delete `old-ids.txt`, `current-ids.txt` and `.lim` in
  the live scratch folder, so they cannot run again once the probe sets exist. A unit that reuses `anon.sh` (#26, #27) runs those
  cases in a scratch folder of their own.

  > **Dated note, 2026-11-13.** Not triggered by the [GKB2 and GKB rewrite unit](../26-gkb2-gkb-rewrite/plan.md) (#26): it does
  > not reuse `anon.sh` but derives its own helper, `ganon.sh`, whose stand-in cases run in its self-test's sandbox, which stands
  > in for the user profile. The follow-up stays open for a unit that reuses `anon.sh`.
- **The comments and docstrings of the unit's tools** state less than the tools do. They change when a later unit (#26, #27) saves
  a tool it reuses again and records its new pins; this unit's pins stay as recorded:
  - `p25_writes.py`: the docstring of `edges(n)` names two kinds of edge, and the function returns four (parent, sub-issue,
    "blocked by" and "blocking");
  - `p25lib.sh`: the header does not say that sourcing it creates the record and scratch folders and runs `repo_env`;
  - `p25_reads.py`: `alerts` does not say that it appends to the record's alerts file, or that it recognises a 404 by `gh`'s message;
  - `anon.sh`: `batch` does not say that it appends the tally to the record; `feed_read` says only that it returns 9 on an old id:
    not that every other outcome returns 0, a page other than 200 and a budget stop included, each a printed line; the 20 s and 30 s timeouts, and a call with
    no HTTP answer being a stop, are not stated;
  - `p25_idcheck.py`: `paths` does not say that it imports and runs the file given as `--scrub-check`;
  - idioms without a comment: the `pkt` framing, the reset of the remembered rate-limit reading, `PUB` scoped to a subshell, the
    `LINK` and token expressions, prefix resolution by `bisect`, the sampled sets, the page sizes, the pace and the guard's
    threshold, the filter on `refs/pull/N/merge`, the self-tests' stand-ins, the printed-form hash, the all-zero id that
    `load_ids` drops, the board file read from its first brace, the census constants, and the literals of the self-tests;
  - no language-injection hint; region markers only in `p25_writes.py`; two accessors lack the note that the token is never read
    there;
  - the `S1.grant` block spells out where the temporary-permissions file is kept, which the plan's own prose states in general terms.

  > **Dated note, 2026-11-13.** Not triggered by the [GKB2 and GKB rewrite unit](../26-gkb2-gkb-rewrite/plan.md) (#26), which
  > saves none of this unit's tools again: this unit's pins stay as recorded, and the follow-up stays open for a unit that does.
  > The documentation follow-ups of that unit's own helper, `ganon.sh`, are in
  > [its consequences, §6](../26-gkb2-gkb-rewrite/consequences.md#6-follow-ups).
- **Machine-local paths in issue texts:** none to edit
  ([as built §3.3](final-implementation.md#33-the-corpus-gate-3-the-id-check-and-the-runs)).

**Standing:**

- **`KotlinBottools-next` stays reserved**
  ([the rewrite and swap unit's consequences, §6](../23-kotlinbottools-rewrite-and-swap/consequences.md#6-follow-ups)): the
  references the transfers wrote keep resolving through it.

**Possible, not planned:**

- A description and topics for the repository, Dependabot alerts, and private vulnerability reporting.
- Requiring approval for workflow runs from every outside contributor, rather than first-time contributors only.
