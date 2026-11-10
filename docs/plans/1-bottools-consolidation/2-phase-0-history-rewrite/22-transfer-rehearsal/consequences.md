# Phase 0 · 2 — Transfer rehearsal: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#22](https://github.com/SpartanLaboratories/KotlinBottools/issues/22),
  *"Phase 0 · 2 — Transfer rehearsal on two throwaway repositories"*, a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit does to its surroundings and leaves behind: the blast
  radius on GitHub and on this machine, what the later units of the phase take from it, the known gaps
  and the follow-ups, as the unit ran. What it built and measured is in
  [`final-implementation.md`](final-implementation.md).
- **Related:**
  - [`plan.md`](plan.md): the procedure, its stages, checks and interfaces;
  - [`research/README.md`](research/README.md): the evidence;
  - the parent design [`../architecture.md`](../architecture.md) §7.2 and §15 unit 2, and the parent
    [`../consequences.md`](../consequences.md).

---

## 1. Published artifacts

None. No module is published and no version moves. The landing changes documents and generated boards
only; §2.4 gives the account.

---

## 2. Blast radius

### 2.1 GitHub

Two throwaway repositories of the `SpartanLaboratories` organisation, and nothing else:

- **`phase0-rehearsal-a`,** the source, created public with an initial commit. It holds made-up text
  only: the fixture's nine issues and one merged pull request, with their comments and links.
- **`phase0-rehearsal-b`,** the target, created private and empty. It receives the transferred issues
  and a closed placeholder at the pull request's number.
- **After the swap** the source is `phase0-rehearsal-a-legacy` and the target is `phase0-rehearsal-a`,
  and both are private and archived. Neither is deleted. They stay as a follow-up (§6), since deleting
  them needs a scope the phase does not have.

No issue, number, label, milestone, setting or ref of KotlinBottools or of any other repository
changes. The only read of KotlinBottools beyond the landing is `smoke`, which prints counts.

### 2.2 This machine

Under the user profile, outside every repository: the tool `%USERPROFILE%\BotWS\tools\rehearsal\rehearsal.py`
and its runner `%USERPROFILE%\BotWS\tools\rehearsal-step.sh`, and the results in
`%USERPROFILE%\BotLegacyData\run\rehearsal\` (made-up fixture text and the ids of the two throwaway
repositories, nothing from a real repository). The tool and the results outlive this unit: the next
unit reads them.

### 2.3 The two clones on this machine

Neither changes. The procedure reads this checkout only to save its tool from [`plan.md`](plan.md).

### 2.4 Documents and generated boards

The landing changes what [plan §7.1](plan.md#71-repository-changes) lists: this unit's documents and
research; the dated notes of 2026-11-09 on the parent's `architecture.md` and `consequences.md`, which
record that KotlinBottools has been public since 2026-11-08 and what follows for the swap, what a
transfer does to issue references, and what those references reach after the swap; one line in the
parent's `consequences.md`; and the regenerated boards.

---

## 3. Adoption

No existing code adopts anything from this unit. The tool's flat read, its edge-set comparison, its
settle rule and its pacing are built to be reused by `kotlinbottools-rewrite-and-swap` (§4), once the
tool's known gaps (§5) are closed.

---

## 4. Sibling units and neighbouring issues

**What the later units take from this unit** (the contract is
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units); this is its summary):

- **`kotlinbottools-rewrite-and-swap`** (#23) starts only when this unit's result passes, and it
  passes ([as-built record, §2](final-implementation.md#2-acceptance)). It takes:
  - the measured behaviour of a public-to-private issue transfer: the numbers each transfer landed
    on, the closed-issue route, what each link kind did at each step, the links that spanned a public
    and a private repository, the redirect of a transferred issue's old URL, and what a transfer does
    to the references in the moved text and in the source
    ([as-built record, §3](final-implementation.md#3-measurements); architecture §7.4);
  - the rename order, with the privacy step (rename, private, archive, then the target's rename), and
    the outcome of the rename onto a name freed minutes earlier
    ([as-built record, §3.6](final-implementation.md#36-the-rename-swap));
  - the tool, for reuse once its known gaps (§5) are closed, and the pattern of the requests;
  - the list of request actions it also needs ([plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units));
  - the follow-ups of §6 that name it.
- **`residual-report-and-cleanup`** (#28) takes the two rehearsal repositories as a follow-up and
  carries KotlinBottools' public window in its report (architecture §12.4).
- **`repository-hygiene`, `kotlinbottools-publish`, `gkb2-gkb-rewrite` and
  `bottools-trumpbot-support-rewrite`** take nothing beyond what the units before them hand on.

**Neighbouring issues:** #2, the tracking issue of the phase, and #1, its parent, are not closed by
this unit. Nothing here changes MagicBot or WebTools.

---

## 5. Known gaps

**Settled by the run:** what a transfer did to numbers, closed issues, links and references, and what the
swap did to names, old URLs and references, none of which the documentation settles
([as-built record, §3](final-implementation.md#3-measurements)). The research reports the build
contradicted are in [the research README](research/README.md#did-not-hold-in-the-build).

**The plan's assumptions** ([plan, Assumptions](plan.md#assumptions)): none failed. The job was open with
its actions, the six actions the plan proposed among them, and every request's procedure ran as received;
the public issues landed on the target's next numbers; every reference in the moved text named one of the
two fixture repositories; every settle ended within two reads and every read-back by id within one; nothing
else touched the rehearsal repositories or their names; no rate limit was met; and the pull request became
mergeable within its request's poll. `reopen-issue` was never sent. The four `ids pre` stops came from
GitHub's web page answering 504, not from a read-back
([as-built record, §4](final-implementation.md#4-deviations-from-the-plan)).

**Still open:**

- **What the fixture does not cover.** The target is commit-less, unlike the real target; there is
  one merged pull request, while the real walk has placeholders next to each other and at the top
  number; the fixture is ten numbers, while the real walk has thirty and more, so the walk's pacing is
  rehearsed only at this scale ([plan, Test plan](plan.md#test-plan)).

### The tool's known gaps, for `kotlinbottools-rewrite-and-swap` (#23)

The rehearsal's tool is left exactly as it ran (sha256
`9bc7fd63c773c19b5f149f332eb382c9b6e985a10a9a01929b6f22d6e73596a6`, the bootstrap of S0 in
[`plan.md`](plan.md)). The gaps below do not change this unit's results, but
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units) hands the tool on as
reusable: #23 closes every one of them before it reuses the tool. Line numbers are those of the saved
tool, `%USERPROFILE%\BotWS\tools\rehearsal\rehearsal.py`, whose text is the `rehearsal.py` block of the
plan's Appendix A; `plan.md:N` is a line of [`plan.md`](plan.md).

**In the tool**

- **`settle()` always reports settled at its read bound (line 195).** `prev` is set on every pass, so at
  the bound `prev[0] == key` holds, `settled` is `True` and `unsettled` is empty; a stand-in whose edges
  change on every read shows it. The promise of plan.md:221, 406 and 995–997 does not hold at the bound,
  and plan.md:1082–1085 hands `settle` on as reusable. This run was not affected: every settle ended
  well inside the bound of 8 ([as-built record, §3.4](final-implementation.md#34-links)).
- **The `result` gate (`cmd_result`, lines 666–696) can report PASS without establishing a criterion.**
  It needs to recompute each shape from the final read.
  - "private and archived" (line 685) reads constants from the `IDS` table (line 614), reached only after
    a by-id read matched them; the measured flags are in the S6 `final-edges` record, which the gate
    ignores.
  - `ids` records are written on success only (line 619) and `stop` records are never read, so an older
    success survives a later failing re-run; the same holds for `transfer` (line 668). plan.md:917 ("the
    last record") contradicts plan.md:933 (records filtered on `ok`).
  - "placeholder" (line 679) is an `any()` over the post records, and that post record establishes only
    the title and the closed state of the issue at number 4 (`h_placeholder`, line 327).
  - "numbers" and "closed-issues" (lines 678 and 680) use records taken at the step, not a final read.
  - "cross-repository links" (line 682) duplicates `links_ok` and can pass vacuously.
  - "old URLs" (line 686) passes on an empty `follows`.
- **A resumed `request placeholder-4` stops where the plan promises a skip.** `h_placeholder` (lines
  325–328) returns `conflict` once the target's highest number is above 4; plan.md:912 promises `SKIP`.
- **`unauth` (lines 596–598, 612–613)** treats a 5xx as a wrong answer, which fails closed and caused
  the four `ids pre` stops ([as-built record, §4](final-implementation.md#4-deviations-from-the-plan)),
  and a timeout or `URLError` is not caught (line 598 catches only `HTTPError`), so it would end in a
  traceback with no stop record.

**In the self-test**

- **No check of:**
  - `cmd_result`;
  - the post-check failure paths (`check_step`, lines 504–519; `after_transfer`, lines 484–491): an item
    difference, the closed-issue branch, a wrong number, the three tries;
  - `judge` and ten of the twelve `h_*` handlers (lines 267–339, 445–454);
  - command-level STOP handling (`cmd_reply`, lines 471–483; `main`, lines 858–866);
  - `cmd_links` and `links_post` (lines 520–539);
  - inconsistent edges (line 183) and the exhaustion of `settle` (lines 186–200);
  - `diff_item` negatives other than the body (lines 227–232);
  - the nested-connection stop (lines 146–147).
- **The stand-in is not wholly in memory:** `RD` is a real temporary folder (lines 766–767).
- **Six check labels state no behaviour:** lines 772, 779, 781, 782, 796 and 836.
- **Checks that would still pass with the logic broken:** lines 772, 787, 793, 794, 806, 808, 810,
  818–820, 828 and 852 (852 is a tautology).
- **The plan overstates the self-test's coverage:**
  - plan.md:967: the in-memory stand-in and the settle; the reconciliation arithmetic, which is written
    inside the test (line 806); "every key family", which misses `reopen-(\d+)` (`KEYS`, line 439; `fixed`,
    lines 837–841, has only `reopen-b-5`); and "whichever fixture repository", which never exercises the
    legacy name (lines 810–811);
  - plan.md:969: the diff of the link lists; the nine fixture sizes, which no check asserts (line 769 only
    bounds the one big body); and "any set of moved issues", which is checked for `{}` and `{1: 1}` only
    (lines 773–774);
  - plan.md:971: the bounded settle; and "every procedure pauses", which is checked for two forms only
    (lines 848–850).

**Not exercised by the live run,** so the rehearsal is no evidence for them
([as-built record, §3.1, §3.3 and §3.4](final-implementation.md#3-measurements)):

- link re-creation, with its `links-r*` requests;
- the fallback routes;
- the full-body retention of a refusal;
- the closed-issue reopen route, with its `reopen-issue` request.

---

## 6. Follow-ups

**Closed:**

- **A request to GitHub Support,** for a refused rename onto the freed name
  ([plan, Sequencing and follow-ups](plan.md#sequencing-and-follow-ups)): not needed, since the rename was
  accepted ([as-built record, §3.6](final-implementation.md#36-the-rename-swap)).
- **The six actions the plan proposed** were defined before the run, so the follow-up for undefined
  ones is void.
- **The text of #22** now describes the source as created public and made private in the swap.

**Open, for `kotlinbottools-rewrite-and-swap` (#23):**

- **A job of its own.** This unit's job names only the three rehearsal repositories. The real walk's
  requests need a job whose scope names KotlinBottools and the fresh repository and whose actions are the
  ones [plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units) lists for that unit.
- **The tool's known gaps** (§5), closed before the tool is reused.
- **The inherited results** ([as-built record, §3](final-implementation.md#3-measurements)), read before
  that unit's plan is written.
- **The moved text that names `KotlinBottools-next`.** After the real walk the moved issues' texts name
  the target's temporary name for every moved issue they cite. The rehearsal shows such references still
  reaching their item after the rename, through the redirect the rename leaves on the temporary name
  ([as-built record, §3.8](final-implementation.md#38-what-references-reach-after-the-renames)), and that
  redirect lasts only while no repository takes the name
  ([research, rename sequence, claims 1 and 3](research/rename-visibility-archive-sequence.md#7-load-bearing-claims)).
  That unit's plan decides between leaving them on the redirect and keeping the name free, rewriting them
  after the walk, and renaming before the walk so that the transfers write the final name
  ([architecture §7.4](../architecture.md#74-the-number-walk-and-the-links)).

**Open, for `residual-report-and-cleanup` (#28):**

- **The two rehearsal repositories,** `phase0-rehearsal-a-legacy` and `phase0-rehearsal-a`, private and
  archived. Deleting them, if they are not wanted, needs the `delete_repo` scope
  ([parent consequences §6](../consequences.md#6-follow-ups)).
