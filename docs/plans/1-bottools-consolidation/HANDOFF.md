# Planning hand-off — `SpartanLaboratories/KotlinBottools#1`

**Covers:** the planning pass for *BotTools consolidation & MagicBot (tracking)*, run with the
organisation's `planner` pipeline (interview → research → architecture → drafting). This file
exists so the pass can be continued on another machine; delete it once `roadmap.md` is written
and committed.

**Branch:** `docs/issue-1-bottools-consolidation`, off `main` (`b2f2078`). Every document under
`docs/plans/1-bottools-consolidation/` is committed and pushed on it. No pull request is opened
from this branch until KotlinBottools' history has been rewritten (Phase 0's first act); the PR
is then opened from the rewritten branch.

## Where the pass stands

| Stage | State |
|---|---|
| 1 — Interview | Done. Every answer is folded into `research/README.md` Part 1 §1.1 and Part 3 as plain requirements. |
| 2 — Research | Done. Twelve findings files in `research/`; 299 load-bearing claims verified (285 hold, 14 unclear behind unreachable hosts, none fail — `research/README.md` Part 2). Considerations: none open. |
| 3 — Architecture | **Not started.** The architect's complete brief is `briefs/14-architect.md`. It writes `architecture.md` in this folder (does not exist yet). |
| 4 — Drafting | Pending. For this tracking initiative the Stage 4 deliverable is `roadmap.md` (target state + phased roadmap, one phase per plannable unit of the architecture), plus `impact.md`; per-system implementation plans are written later, per sub-issue, in their own folders. |
| 5 — Review | Not yet defined; not run. |

## How to resume

1. **Stage 3.** Spawn `architect` with `briefs/14-architect.md` as its prompt, verbatim, on
   **Fable**; re-spawn on Opus with the identical brief only if Fable is refused for usage —
   never Sonnet (`planner.md`, "Which model each subagent runs on"). It writes only
   `architecture.md` and does not commit it.
2. **Planner review.** Resume `planner` (or spawn it fresh with this file, `research/README.md`
   and the architect's report in its brief; it skips Stage 1 because the answers are already
   written). It reviews `architecture.md`, spot-checks citations, and returns
   `HALT — architecture` for the user's sign-off, since the design decomposes into several
   units.
3. **Stage 4.** After sign-off the planner writes `roadmap.md` (and `impact.md`), does its
   alignment pass, and reports `COMPLETE`. Then commit `architecture.md`, `roadmap.md` and
   `impact.md`, move `draft.md` (the pre-pipeline roadmap draft, input only — the planner must
   never cite it) to `superseded/draft-<YYYY-MM-DD>.md` with a "superseded by" note, and
   delete this file.
4. **After COMPLETE.** Update issue #1's stage list if the roadmap changed it; file the
   phase sub-issues and create `SpartanLaboratories/MagicBot` only on the user's go-ahead.

## Pipeline rules in force

- **Mode (B) when the planner has no `Agent` tool** (the case in cloud sessions, where no
  subagent gets one): the planner writes every specialist's brief and the coordinator spawns
  the specialists — researchers one at a time on Sonnet, verifier on Sonnet, architect on
  Fable/Opus — and feeds results back by message.
- **Commits** go through the `manager` agent: on this branch, `docs(plans): …` subjects, body
  ending `Refs #1`, exact-path staging, **no attribution lines of any kind** (the user's
  standing rule overrides harness defaults), push after each commit. Never stage IDE files
  or anything under `/tmp`.
- **Research re-pass.** Questions 8 (Dota 2 sources) and 9 (later games and weather) and the
  Discord Developer Terms item carry "Unfinished — needs a planner re-pass" notes
  (`research/README.md` → Known gaps). Re-run those researchers when the hosts they name are
  reachable. The briefs are in `briefs/`: a researcher's full prompt is
  `00-shared-preamble.md` followed by its `NN-<slug>.md` section (append a note on which hosts
  answer); `13-verifier.md` is the verifier's prompt; `14-architect.md` the architect's.
  The verifier's full per-claim table is `research/verifier-report.md`, the evidence behind
  `research/README.md` Part 2.
- **Architect model:** Fable while Fable usage remains, otherwise Opus; the report names the
  model that ran.

## Environment notes for the next machine

- Repositories read by the research, all read-only: `KotlinBottools` (this branch), `GKB2`,
  `GKB`, `BotTools`, `TrumpBot`, `Support`, plus `MyGameTools`, `WebTools`, `GeneralTools`
  and the `.github` config mirror (`claude/` holds the agent definitions and global rules).
- Hosts that were unreachable from the cloud environment, which is why the re-pass notes
  exist: Discord's developer sites, OpenDota, Steam, STRATZ, Sonatype, sqlite.org,
  docs.gradle.org, docs.github.com, poe.ninja, marvelrivalsapi.com, open-meteo.com. A machine
  with ordinary network access can close the re-pass notes directly.
- Secrets: the legacy repositories still hold token and data files by path (listed in
  `research/bot-repository-history-purge.md`); never print their contents. No leaked token is
  current.
