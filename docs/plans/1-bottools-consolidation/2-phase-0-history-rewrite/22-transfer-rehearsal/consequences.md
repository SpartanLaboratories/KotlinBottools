# Phase 0 · 2 — Transfer rehearsal: consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#22](https://github.com/SpartanLaboratories/KotlinBottools/issues/22),
  *"Phase 0 · 2 — Transfer rehearsal on two throwaway repositories"*, a sub-issue of
  [#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
- **What this document is:** what this unit does to its surroundings and leaves behind: the blast
  radius on GitHub and on this machine, what the later units of the phase take from it, the follow-ups
  and the known gaps. It is written with the plan and brought up to date once the unit has run.
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
research, the dated notes on the parent's `architecture.md` and `consequences.md` that record that
KotlinBottools has been public since 2026-11-08 and what follows for the swap, one line in the
parent's `consequences.md`, and the regenerated boards.

---

## 3. Adoption

No existing code adopts anything from this unit. The tool's flat read, its edge-set comparison, its
settle rule and its pacing are built to be reused by `kotlinbottools-rewrite-and-swap` (§4).

---

## 4. Sibling units and neighbouring issues

**What the later units take from this unit** (the contract is
[plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units); this is its summary):

- **`kotlinbottools-rewrite-and-swap`** (#23) starts only when this unit's result passes. It takes:
  - the measured behaviour of a public-to-private issue transfer: the numbers each transfer landed
    on, the closed-issue route, what each link kind did at each step, whether a link may span a public
    and a private repository, the redirect of a transferred issue's old URL, and what a transfer does
    to the references in the moved text and in the source (architecture §7.4);
  - the rename order, with the privacy step (rename, private, archive, then the target's rename), and
    whether a rename onto a name freed moments earlier succeeds;
  - the reusable tool and the pattern of the requests;
  - the list of request actions it also needs ([plan, Interfaces with sibling units](plan.md#interfaces-with-sibling-units)).
- **`residual-report-and-cleanup`** (#28) takes the two rehearsal repositories as a follow-up and
  carries KotlinBottools' public window in its report (architecture §12.4).
- **`repository-hygiene`, `kotlinbottools-publish`, `gkb2-gkb-rewrite` and
  `bottools-trumpbot-support-rewrite`** take nothing beyond what the units before them hand on.

**Neighbouring issues:** #2, the tracking issue of the phase, and #1, its parent, are not closed by
this unit. Nothing here changes MagicBot or WebTools.

---

## 5. Known gaps

- **Six of the request actions this unit needs are not defined yet:** `create-issue`, `create-label`,
  `create-milestone`, `close-issue`, `reopen-issue` and `fixture-pull-request`
  ([plan, Assumptions](plan.md#assumptions)). The unit also needs the job it runs under to be open. It
  stops before its first write until they exist.
- **What only the run can show.** The behaviour of a transfer with these links, of a transfer out of a
  public repository, of links across a public and a private repository, and of a rename onto a name
  just freed is not documented. The unit measures each and hands back its result
  ([research README](research/README.md#summary)).
- **Whether references naming the target's temporary name resolve after the rename.** A transfer
  leaves them in the moved text for good; the swap's reads measure it (plan, Design, "The rename
  swap"). The result goes to the rewrite-and-swap unit.
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
  and plan.md:1082–1085 hands `settle` on as reusable. This run was not affected: all 14 snapshots
  settled after 2 equal reads, against a bound of 8.
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
  the four `ids pre` stops, and a timeout or `URLError` is not caught (line 598 catches only
  `HTTPError`), so it would end in a traceback with no stop record.

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

**Not exercised by the live run,** so the rehearsal is no evidence for them:

- link re-creation (0 adds, 0 removes, no `links-r*` request);
- the fallback routes;
- the full-body retention of a refusal (every reply was `done`);
- the closed-issue reopen route (both closed issues arrived closed, with their reason).

---

## 6. Follow-ups

- **The two rehearsal repositories.** Deleting them, if they are not wanted, needs the `delete_repo`
  scope ([parent consequences §6](../consequences.md#6-follow-ups)).
- **The text of #22.** Its body says both repositories are private; the design makes the source public
  until the swap, so the body wants correcting by an issue edit.
- **The six actions,** if the run finds any of them still undefined.
