/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 27,
  "slug": "27-bottools-trumpbot-support-rewrite",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite",
  "kind": "tracking",
  "title": "Rewrite BotTools, TrumpBot and Support",
  "issueTitle": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
  "function": "BotTools, which is public, and TrumpBot and Support, which are private, still hold in their histories the files the phase purges: 39 purged blobs in BotTools, all of them also reachable through its pull-request refs, 199 in TrumpBot and 7,259 in Support. The local TrumpBot clone still holds TrumpBot's old history. The unit takes each repository through the rewrite pipeline as GKB2 and GKB were taken, BotTools first, then TrumpBot, then Support: the purge with its checks before and after, the force-push with its per-ref verification, the exit tests on a fresh mirror and the residual probes, with BotTools' pull-request residual counted. Once TrumpBot's push is proven, the clone is replaced by a fresh one at the same path, its four untracked files kept. The unit spans four systems, the toolchain, the rewrite pipeline, the residual-exposure measurement and the clone realignment, so this run designs it and splits it into units; nothing is rewritten, pushed or replaced in this run. Unit 7 of #2, with no version moved; the three repositories keep their visibility.",
  "status": "building",
  "sized": "2026-11-13T18:00:43Z",
  "parent": {
    "issue": 2,
    "board": "../dashboard.html"
  },
  "fixOf": null,
  "branch": "chore/issue-27-rewrite-bottools-and-private-repos",
  "baseline": {
    "ref": "main",
    "sha": "416f36bda66c2050e320504d999a46e71ea18557",
    "date": "2026-11-13"
  },
  "asBuilt": null,
  "systems": [
    {
      "slug": "toolchain",
      "name": "Toolchain",
      "slot": 0,
      "top": "Internal Tooling",
      "status": "planned",
      "board": null,
      "plain": true
    },
    {
      "slug": "rewrite-pipeline",
      "name": "Rewrite pipeline",
      "slot": 0,
      "top": "Internal Tooling",
      "status": "planned",
      "board": null,
      "plain": true
    },
    {
      "slug": "residual-exposure",
      "name": "Residual-exposure measurement",
      "slot": 0,
      "top": "Internal Tooling",
      "status": "planned",
      "board": null,
      "plain": true
    },
    {
      "slug": "clone-realignment",
      "name": "Clone realignment",
      "slot": 0,
      "top": "Internal Tooling",
      "status": "planned",
      "board": null,
      "plain": true
    }
  ],
  "wip": {
    "step": "implementation",
    "since": "2026-11-13T21:05:13Z",
    "updated": "2026-11-15T20:55:34Z",
    "detail": "2 of 4 units landed; #41 in progress; #42 up next.",
    "steps": [
      "sizing",
      "interview",
      "research",
      "architecture",
      "document",
      "landing",
      "merge",
      "sub-issues",
      "implementation",
      "landed"
    ],
    "current": [
      "residual-measurement.built"
    ],
    "questions": [],
    "research": null,
    "interview": [
      {
        "text": "Should each part of the unit stay inside one of the registry's systems, or may a rewrite part also extend the tools it runs and measure its own repository's residual, as the GKB2 and GKB unit did?",
        "options": [
          "Size them as the GKB2 and GKB unit was sized: each rewrite runs stages 1 to 9 for its repository and extends the tools it needs; only the clone replacement stands apart",
          "One registry system each: the tool work is its own part with no GitHub write, the rewrites stop at stage 8, one residual part probes all three repositories after the last push, and the clone replacement is its own part"
        ],
        "answer": "Each part stays inside one system: the tools part extends the workspace tools before any push, with no write to GitHub; the rewrites run stages 1 to 8 for each repository, with BotTools' pull-request residual counted on its fresh mirror; one residual measurement runs stage 9 over all three repositories once the last push is verified; and the clone replacement is its own part, once TrumpBot's push is proven.",
        "asked": "2026-11-13T18:24:56Z",
        "answered": "2026-11-13T18:25:46Z"
      },
      {
        "text": "What of the old TrumpBot clone's local state should the fresh clone keep? Besides the four files under .idea/ the clone now holds a knowledge graph built from the pre-rewrite tree, its exclude entry, two graph hooks and two local config keys.",
        "options": [
          "Keep everything: archive and restore the graph files, the exclude entry, the hooks and the two config keys",
          "Keep the four .idea/ files only; the clone ends with no graph and no graph hooks",
          "Keep the four .idea/ files only, and rebuild the graph from the rewritten tree once the fresh clone is proven"
        ],
        "answer": "The fresh clone keeps the four `.idea/` files only; once it is proven, the graph is rebuilt from the rewritten tree by a code-only build, which installs the two hooks again.",
        "asked": "2026-11-13T18:24:56Z",
        "answered": "2026-11-13T18:25:46Z"
      },
      {
        "text": "Should BotTools' dormant CircleCI webhook stay as it is while its two branches are force-pushed?",
        "options": [
          "Leave it; the deliveries are recorded by count with the push",
          "Deactivate it before the push and reactivate it after",
          "Delete it"
        ],
        "answer": "The webhook stays as it is, and the deliveries the push makes are recorded by count.",
        "asked": "2026-11-13T18:24:56Z",
        "answered": "2026-11-13T18:25:46Z"
      }
    ],
    "plan": null,
    "stages": [],
    "remediation": null,
    "open": [],
    "event": {
      "name": "sub-issues-filed",
      "at": "2026-11-13T20:42:32Z",
      "note": "final: filing done"
    },
    "history": {
      "sizing": [
        {
          "since": null,
          "ended": "2026-11-13T18:00:43Z",
          "endedBy": "sized",
          "to": "architecture"
        }
      ],
      "architecture": [
        {
          "since": "2026-11-13T18:00:43Z",
          "ended": "2026-11-13T18:24:56Z",
          "endedBy": "halted",
          "to": "architecture",
          "event": {
            "name": "sized",
            "at": "2026-11-13T18:00:43Z"
          },
          "detail": "Unit 7 of the history rewrite: BotTools, TrumpBot and Support are rewritten and force-pushed as GKB2 and GKB were, BotTools' pull-request residual is measured, and the local TrumpBot clone is replaced. The unit touches three systems, so this run designs it and splits it into units; nothing is built or pushed in this run. Next: the design, starting with the questions on intent.",
          "held": true
        },
        {
          "since": "2026-11-13T19:20:34Z",
          "ended": "2026-11-13T19:43:46Z",
          "endedBy": "architecture-signed-off",
          "to": "document",
          "event": {
            "name": "researched",
            "at": "2026-11-13T19:20:34Z"
          },
          "detail": "Research complete: 31 of the 32 claims hold at source and the one that fails was a wrong file citation for behaviour that holds. Each repository is pushed in one request as one atomic push with an explicit lease on every branch, after a dry run. The old TrumpBot clone is moved aside by a rename on its own volume and deleted last. The tools are rebuilt in a new folder, and the earlier folder stays as it ran. Next: the grand design and its units."
        }
      ],
      "research": [
        {
          "since": "2026-11-13T18:25:46Z",
          "ended": "2026-11-13T19:20:34Z",
          "endedBy": "researched",
          "to": "architecture",
          "event": {
            "name": "verification-started",
            "at": "2026-11-13T19:08:33Z"
          },
          "detail": "The 32 outside-world claims the three findings rest on are being checked at their sources.",
          "research": {
            "phase": "complete",
            "drafted": 0,
            "since": {
              "planning": "2026-11-13T18:28:47Z",
              "research": "2026-11-13T18:31:11Z",
              "verification": "2026-11-13T19:08:33Z",
              "complete": "2026-11-13T19:20:34Z"
            }
          },
          "questions": [
            {
              "question": "two-branch-lease-push",
              "rows": [],
              "findings": "research/two-branch-lease-push.md",
              "state": "complete",
              "started": "2026-11-13T18:31:11Z",
              "returned": "2026-11-13T19:07:20Z"
            },
            {
              "question": "clone-move-aside-on-windows",
              "rows": [],
              "findings": "research/clone-move-aside-on-windows.md",
              "state": "complete",
              "started": "2026-11-13T18:31:11Z",
              "returned": "2026-11-13T19:06:23Z"
            },
            {
              "question": "tool-changes-for-three-repositories",
              "rows": [],
              "findings": "research/tool-changes-for-three-repositories.md",
              "state": "complete",
              "started": "2026-11-13T18:31:11Z",
              "returned": "2026-11-13T18:56:23Z"
            }
          ]
        }
      ],
      "document": [
        {
          "since": "2026-11-13T19:43:46Z",
          "ended": "2026-11-13T20:31:31Z",
          "endedBy": "landing",
          "to": "landing",
          "event": {
            "name": "document",
            "at": "2026-11-13T20:26:39Z",
            "note": "3 of 3 tasks done"
          },
          "detail": "Document: 3 of 3 tasks done; every task done.",
          "document": {
            "tasks": [
              {
                "id": "reconcile-plan",
                "name": "Design and consequences confirmed final",
                "state": "done",
                "started": "2026-11-13T19:54:43Z",
                "finished": "2026-11-13T19:58:42Z",
                "report": "The four planning documents are committed at d5192fc; main had not moved, so there was nothing to merge, and no version moved. The design and its consequences are final: the design leaves no consideration open, and what the units leave behind is recorded as known gaps and follow-ups in the consequences. Next: the state boards, with the four planned units drawn dashed."
              },
              {
                "id": "state-boards",
                "name": "State boards",
                "state": "done",
                "started": "2026-11-13T19:58:42Z",
                "finished": "2026-11-13T20:23:36Z"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "done",
                "started": "2026-11-13T20:23:36Z",
                "finished": "2026-11-13T20:26:39Z"
              }
            ]
          }
        }
      ],
      "landing": [
        {
          "since": "2026-11-13T20:31:31Z",
          "ended": "2026-11-13T20:32:37Z",
          "endedBy": "merge",
          "to": "merge",
          "event": {
            "name": "landing",
            "at": "2026-11-13T20:31:31Z",
            "note": "land accepted"
          },
          "detail": "Landing: the land accepted; the branch carries the code, the version bump, the reconciled documents and the state boards."
        }
      ],
      "merge": [
        {
          "since": "2026-11-13T20:32:37Z",
          "ended": "2026-11-13T20:40:13Z",
          "endedBy": "sub-issues-filed",
          "to": "sub-issues",
          "event": {
            "name": "landed",
            "at": "2026-11-13T20:33:14Z"
          },
          "detail": "The plan landed in PR #38; its units are filed next."
        }
      ],
      "sub-issues": [
        {
          "since": "2026-11-13T20:40:13Z",
          "ended": "2026-11-13T21:05:13Z",
          "endedBy": "sized",
          "to": "implementation",
          "event": {
            "name": "sub-issues-filed",
            "at": "2026-11-13T20:42:32Z",
            "note": "final: filing done"
          },
          "detail": "4 of 4 units filed as sub-issues; each unit's board appears when its run starts.",
          "units": {
            "done": 4,
            "total": 4
          }
        }
      ]
    },
    "next": "clone-replacement",
    "qa": [],
    "qaMax": 3,
    "waitingOn": null,
    "resume": null,
    "blockers": {
      "waitsOn": [],
      "blocks": []
    },
    "landing": {
      "pr": 38,
      "merge": "9f226462bbed2750d8cba4b4545d675135a54491"
    },
    "waits": [
      {
        "step": "architecture",
        "since": "2026-11-13T18:24:56Z",
        "ended": "2026-11-13T18:25:46Z",
        "by": "halted"
      }
    ],
    "document": {
      "tasks": [
        {
          "id": "reconcile-plan",
          "name": "Design and consequences confirmed final",
          "state": "done",
          "started": "2026-11-13T19:54:43Z",
          "finished": "2026-11-13T19:58:42Z",
          "report": "The four planning documents are committed at d5192fc; main had not moved, so there was nothing to merge, and no version moved. The design and its consequences are final: the design leaves no consideration open, and what the units leave behind is recorded as known gaps and follow-ups in the consequences. Next: the state boards, with the four planned units drawn dashed."
        },
        {
          "id": "state-boards",
          "name": "State boards",
          "state": "done",
          "started": "2026-11-13T19:58:42Z",
          "finished": "2026-11-13T20:23:36Z"
        },
        {
          "id": "document-landing",
          "name": "Document commit",
          "state": "done",
          "started": "2026-11-13T20:23:36Z",
          "finished": "2026-11-13T20:26:39Z"
        }
      ]
    }
  },
  "milestones": [
    {
      "column": "gap",
      "label": "Research verified",
      "date": "2026-11-13",
      "ref": "research/README.md",
      "note": "three questions, each with its findings file; 31 of the 32 load-bearing claims hold at their sources, and the one that fails is a wrong file citation for behaviour that holds, so no recommendation changes. Each repository's branches go in one atomic push with an explicit lease on every branch, after a dry run of the same line, and a read-back of every branch names the server's state after any failure; the old TrumpBot clone is moved aside by one rename on its own volume, the fresh clone keeps the four `.idea/` files and the old clone is deleted last; the tools are rebuilt in a new folder, the earlier folder kept as it ran, with every recorded gap closed before the first push and four further gaps found that would stop a run. Where the sources disagreed, BotTools' webhook deliveries are counted once, right after its push, and the residual measurement follows the last push promptly"
    },
    {
      "column": "considered",
      "label": "Architecture signed off",
      "date": "2026-11-13",
      "ref": "architecture.md",
      "note": "§15 alternatives and §16 decomposition into four units in landing order, one per system: the workspace tools, the rewrites, the residual measurement and the clone replacement; the residual measurement and the clone replacement each depend only on the rewrites"
    },
    {
      "column": "verdict",
      "label": "Architecture final",
      "date": "2026-11-13",
      "ref": "d5192fc",
      "note": "the design final with its four units (§7 to §10, §16) and the consequences of the whole work, with no open point, in one commit with the phase design's 20 dated notes and the phase consequences' 5"
    }
  ],
  "trail": [
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Sized; the architecture starts"
    },
    {
      "date": "2026-11-13",
      "column": "considered",
      "label": "Halted at the architecture: waiting on you (three questions on intent, before any design)"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Resumed at research"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research planning: 0 questions drafted"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research started: `two-branch-lease-push`, `clone-move-aside-on-windows`, `tool-changes-for-three-repositories`"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research returned: `tool-changes-for-three-repositories`",
      "ref": "research/tool-changes-for-three-repositories.md"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research returned: `clone-move-aside-on-windows`",
      "ref": "research/clone-move-aside-on-windows.md"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research returned: `two-branch-lease-push`",
      "ref": "research/two-branch-lease-push.md"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Verification started: 3 findings"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research verified; the architecture next",
      "ref": "research/README.md"
    },
    {
      "date": "2026-11-13",
      "column": "considered",
      "label": "Architecture signed off",
      "ref": "architecture.md"
    },
    {
      "date": "2026-11-13",
      "column": "verdict",
      "label": "Architecture final, with its units",
      "ref": "architecture.md"
    },
    {
      "date": "2026-11-13",
      "column": "verdict",
      "label": "Planning branch `chore/issue-27-rewrite-bottools-and-private-repos` confirmed"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: Design and consequences confirmed final current"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: State boards current"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: Document commit current"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: every task done"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Landing: the land accepted"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Merge: merging it in PR #38",
      "ref": "PR #38"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "The plan landed in PR #38, merge 9f22646",
      "ref": "PR #38"
    },
    {
      "date": "2026-11-13",
      "column": "considered",
      "label": "1 of 4 units filed as sub-issues"
    },
    {
      "date": "2026-11-13",
      "column": "considered",
      "label": "2 of 4 units filed as sub-issues"
    },
    {
      "date": "2026-11-13",
      "column": "considered",
      "label": "3 of 4 units filed as sub-issues"
    },
    {
      "date": "2026-11-13",
      "column": "considered",
      "label": "4 of 4 units filed as sub-issues"
    },
    {
      "date": "2026-11-13",
      "column": "considered",
      "label": "4 of 4 units filed as sub-issues; filing done"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "#39 started"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "#39 landed"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "#40 started"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "#40 landed"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "#41 started"
    }
  ],
  "rows": [
    {
      "id": "workspace-tools",
      "group": "Tools",
      "name": "Extend the workspace tools",
      "system": "toolchain",
      "where": "a new tool folder, `WS/tools/g27/` · the earlier `g26/` read only",
      "unit": {
        "n": 1,
        "slug": "workspace-tools",
        "title": "Phase 0 · 7.1 — Extend the workspace tools for BotTools, TrumpBot and Support",
        "blockedBy": [],
        "issue": 39,
        "board": "39-workspace-tools/dashboard.html",
        "folder": "39-workspace-tools/",
        "tests": {
          "base": "main",
          "updated": "2026-11-15T11:37:22Z",
          "added": [],
          "amended": [],
          "relevant": [
            {
              "class": "gselftest.sh gating",
              "module": "tools/g27",
              "testSet": "gating",
              "tests": 84,
              "result": {
                "state": "passed",
                "passed": 84,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-15T11:37:22Z"
              },
              "stage": "S2",
              "rows": [
                "tool-folder",
                "parameter-table",
                "self-test",
                "recorded-gaps",
                "documentation-points"
              ]
            },
            {
              "class": "gselftest.sh deterministic",
              "module": "tools/g27",
              "testSet": "deterministic",
              "tests": 63,
              "result": {
                "state": "passed",
                "passed": 63,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-15T11:37:22Z"
              },
              "stage": "S2",
              "rows": [
                "parameter-table",
                "rewrite-set",
                "clone-set",
                "self-test",
                "recorded-gaps"
              ]
            },
            {
              "class": "gselftest.sh component",
              "module": "tools/g27",
              "testSet": "component",
              "tests": 92,
              "result": {
                "state": "passed",
                "passed": 92,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-15T11:37:22Z"
              },
              "stage": "S2",
              "rows": [
                "parameter-table",
                "rewrite-set",
                "residual-set",
                "clone-set",
                "self-test",
                "recorded-gaps",
                "documentation-points"
              ]
            },
            {
              "class": "gselftest.sh integration",
              "module": "tools/g27",
              "testSet": "integration",
              "tests": 579,
              "result": {
                "state": "passed",
                "passed": 579,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-15T11:37:22Z"
              },
              "stage": "S2",
              "rows": [
                "rewrite-set",
                "residual-set",
                "clone-set",
                "self-test",
                "recorded-gaps",
                "readiness-reads"
              ]
            },
            {
              "class": "gselftest.sh nonfunctional",
              "module": "tools/g27",
              "testSet": "nonfunctional",
              "tests": 28,
              "result": {
                "state": "passed",
                "passed": 28,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-15T11:37:22Z"
              },
              "stage": "S2",
              "rows": [
                "residual-set",
                "self-test",
                "recorded-gaps"
              ]
            },
            {
              "class": "gselftest.sh coverage",
              "module": "tools/g27",
              "tests": 7,
              "result": {
                "state": "passed",
                "passed": 7,
                "failed": 0,
                "skipped": 0,
                "pass": 4,
                "at": "2026-11-15T06:52:02Z"
              }
            }
          ],
          "rowNames": {
            "tool-folder": "A new, self-contained tool folder, saved from the plan and pinned",
            "parameter-table": "A repository's policy in data: the parameter rows and the grant's data",
            "rewrite-set": "The rewrite set: readiness, stages 1 to 8, the reset, and the push with its reply and classes",
            "residual-set": "The residual set: stage 9 and the feed reads after the last push",
            "clone-set": "The clone set: the clone checks, the request builder and the fresh clone's proofs",
            "self-test": "The self-test, run by test kind",
            "recorded-gaps": "The gaps and follow-ups the GKB2 and GKB unit recorded for this work",
            "documentation-points": "The thirteen documentation points",
            "readiness-reads": "The three repositories read once, the parameter rows proven against the data"
          }
        },
        "landing": {
          "pr": 44,
          "merge": "ffb272c37c6c0dc50f58f0fd295142d15473a643"
        }
      },
      "gap": {
        "kind": "missing",
        "summary": "The workspace tools cannot run these three repositories yet. They were written for GKB2 and GKB and assume one branch per repository, a public repository with no webhook, a positive control with probe arguments and stage 9 right after each push; two of them name GKB2 and GKB outside the parameter table, and the gaps and follow-ups that unit recorded for this work are still open.",
        "evidence": [
          "`architecture.md:147` — the tools' assumptions: one branch, a public repository with no webhook, a positive control with probe arguments, stage 9 after each push",
          "`architecture.md:151` — the recorded gaps and follow-ups of the GKB2 and GKB unit"
        ],
        "source": "architecture.md §2.3",
        "link": "architecture.md#23-the-workspace-tools-and-records"
      },
      "options": [
        {
          "id": "new-folder",
          "name": "A new, self-contained tool folder derived from the earlier one, with four tool sets and a self-test by test kind, saved and pinned by this one unit",
          "verdict": "accepted",
          "why": "Nearly every file changes for these repositories, the earlier folder's pins stay true, and one pin table vouches for the whole folder before the first push.",
          "source": "architecture.md §7.1, §7.2",
          "link": "architecture.md#71-the-folder"
        },
        {
          "id": "in-place-or-thin",
          "name": "Extending the earlier tool folder in place, or a thin folder that sources the unchanged files from it",
          "verdict": "declined",
          "why": "In place, the earlier unit's pins and as-built record stop being true, and its save step removes the folder it writes into; a thin folder saves a few files of 22 and ties the new tools to a folder that must not change.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "tools-per-unit",
          "name": "Each part's tools written by its own unit",
          "verdict": "declined",
          "why": "The gaps that guard a push must be closed before the first push, the four sets share one library and one self-test, and one pin table can vouch for the folder only if one unit saves it.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "landed",
        "summary": "#39 landed through PR #44 as ffb272c. It saved the second tool folder, `tools/g27/`, its 25 files at their pins, beside the earlier folder, which equals its own pins before and after; the self-test passed every kind (84, 63, 92, 579 and 28 checks, and the coverage check over 393 expectations and stops); the three repositories were read, read only, and their parameter rows equal the data; and each of the 31 rows of the closure table closes a gap or follow-up of the GKB2 and GKB unit, with a dated note there. #40, #41 and #42 run its sets."
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Derive a new, self-contained tool folder from the GKB2 and GKB unit's, saved from this unit's plan and pinned; the earlier folder is not edited, saved again or run, and equals its own pins before and after the save.",
            "ref": "architecture.md#71-the-folder",
            "excerpt": {
              "ref": "architecture.md#71-the-folder",
              "heading": "7.1 The folder",
              "paragraph": "A new, self-contained folder, `WS/tools/g27/`, derived from `WS/tools/g26/`. Nearly every file changes for these repositories: a parameter row has columns the tools read by position, the push holds one branch in a dozen places, the repositories differ in visibility, webhooks and probes, and the documentation points touch almost every file. · The earlier folder stays as it ran. Its pins are the GKB2 and GKB unit's record, and an edit in place would make that record false. The new folder is saved by a step that writes only its own folder, from the unit's plan, which holds every file's source …",
              "hash": "f7f52a218308"
            }
          },
          {
            "text": "Hold four tool sets on one library: the rewrite set, the residual set, the clone set and a self-test run by test kind, the group of pure functions its quick gate.",
            "ref": "architecture.md#72-the-four-tool-sets",
            "excerpt": {
              "ref": "architecture.md#72-the-four-tool-sets",
              "heading": "7.2 The four tool sets",
              "paragraph": "All four share one library: the parameter row, the step markers, the ref listings, the route classification, the probes and the feed counts.",
              "hash": "26602db39ca7"
            }
          },
          {
            "text": "Keep every repository's policy in data: its branches in push order, its visibility, default branch and webhook count and the marker its first stage waits for are a row of the parameter table, so no script names a repository, an issue or a branch.",
            "ref": "architecture.md#14-extension-and-stability",
            "excerpt": {
              "ref": "architecture.md#14-extension-and-stability",
              "heading": "14. Extension and stability",
              "paragraph": "This work ships no library surface, so the stability tiers do not apply. The tools are operational scripts with a command-line contract, saved to the workspace and copied to the data folder at cleanup; none is an API.",
              "hash": "3f08e054d077"
            }
          },
          {
            "text": "Close every gap and follow-up the GKB2 and GKB unit recorded for this work before the first push, in the order of what guards a write, beginning with the reply's form and the classifier.",
            "ref": "architecture.md#74-the-recorded-gaps",
            "excerpt": {
              "ref": "architecture.md#74-the-recorded-gaps",
              "heading": "7.4 The recorded gaps",
              "paragraph": "Every gap and follow-up of the GKB2 and GKB unit's consequences, §5 and §6 that names this work is closed in this unit, before the first push. The tools findings map each to its files (§7). The order is by what guards a write:",
              "hash": "b7864830f017"
            }
          },
          {
            "text": "Read the three repositories once and prove the parameter rows against the data; after the landing the folder is fixed, and a defect found later is corrected by a new version of that file with its new pin.",
            "ref": "architecture.md#75-what-the-unit-proves-and-what-follows-its-landing",
            "excerpt": {
              "ref": "architecture.md#75-what-the-unit-proves-and-what-follows-its-landing",
              "heading": "7.5 What the unit proves, and what follows its landing",
              "paragraph": "Readiness reads. The unit reads the three repositories once (visibility, default branch, branches, webhook count, the scanning settings where a repository reports them) and proves the parameter rows against the data: each purge list against its recorded checksum, the probe arguments against the preparation unit's script, the every-ref commit count against a derivation from the untouched backup. · The earlier folder equals its own pins before the save and after it. · After the landing the folder is fixed. A later unit that meets a defect in a tool stops. The correction is a new version of that …",
              "hash": "d5b0d0c5df43"
            }
          },
          {
            "text": "Write nothing to GitHub and change no repository and no checkout; the unit starts first, blocked by no other.",
            "ref": "architecture.md#7-the-tools",
            "excerpt": {
              "ref": "architecture.md#7-the-tools",
              "heading": "7. The tools",
              "paragraph": "Unit 1, `workspace-tools`. It writes nothing to GitHub and changes no repository and no checkout.",
              "hash": "cdbc9a6c3f7a"
            }
          }
        ],
        "defense": "Nearly every file changes for these three repositories, and the gaps that guard a push must be closed before the first one. The four sets share one library and one self-test, and one pin table vouches for the whole folder only when one unit saves it. A new folder keeps the earlier unit's pins and as-built record true, and since the unit writes nothing outside its own folder, a stop leaves nothing to undo.",
        "tests": [
          "The self-test by test kind, each kind with its own total: the gating checks, the component tests, the integration tests, the deterministic cases and the non-functional cases"
        ],
        "risks": [
          "A tool defect found after the landing stops the later units before their write; the corrected file is carried whole with a new pin by the plan of the unit that makes the correction"
        ],
        "source": "architecture.md §7, §14, §16",
        "link": "architecture.md#7-the-tools"
      }
    },
    {
      "id": "rewrites",
      "group": "Repositories",
      "name": "Rewrite BotTools, TrumpBot and Support",
      "system": "rewrite-pipeline",
      "where": "BotTools, public · TrumpBot and Support, private",
      "unit": {
        "n": 2,
        "slug": "rewrites",
        "title": "Phase 0 · 7.2 — Rewrite BotTools, TrumpBot and Support",
        "blockedBy": [
          39
        ],
        "issue": 40,
        "board": "40-rewrites/dashboard.html",
        "folder": "40-rewrites/",
        "tests": {
          "base": "main",
          "updated": "2026-11-15T20:13:40Z",
          "added": [],
          "amended": [],
          "relevant": [
            {
              "class": "s0-ready.sh tools",
              "module": "tools/g27",
              "testSet": "gating",
              "tests": 192,
              "result": {
                "state": "passed",
                "passed": 192,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "gselftest.sh deterministic",
              "module": "tools/g27",
              "testSet": "deterministic",
              "tests": 63,
              "result": {
                "state": "passed",
                "passed": 63,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "s0-ready.sh pins",
              "module": "tools/g27",
              "testSet": "gating",
              "tests": 7,
              "result": {
                "state": "passed",
                "passed": 7,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "s0-ready.sh inputs",
              "module": "tools/g27",
              "testSet": "integration",
              "tests": 62,
              "result": {
                "state": "passed",
                "passed": 62,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "s0-ready.sh repos",
              "module": "tools/g27",
              "testSet": "integration",
              "tests": 39,
              "result": {
                "state": "passed",
                "passed": 39,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "s0-ready.sh grant",
              "module": "tools/g27",
              "testSet": "integration",
              "tests": 12,
              "result": {
                "state": "passed",
                "passed": 12,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "c1-close.sh reads",
              "module": "tools/g27",
              "testSet": "integration",
              "tests": 20,
              "result": {
                "state": "passed",
                "passed": 20,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "c1-close.sh record",
              "module": "tools/g27",
              "testSet": "integration",
              "tests": 7,
              "result": {
                "state": "passed",
                "passed": 7,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            },
            {
              "class": "the output rule over the unit's outputs",
              "module": "tools/g27",
              "testSet": "nonfunctional",
              "tests": 4,
              "result": {
                "state": "passed",
                "passed": 4,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-15T20:13:40Z"
              }
            }
          ]
        },
        "landing": {
          "pr": 45,
          "merge": "9170254e888696dc0683701383c02bd455ecfdc2"
        }
      },
      "gap": {
        "kind": "risk",
        "summary": "BotTools, TrumpBot and Support still carry purged paths in their histories. They hold 39, 199 and 7,259 purged blobs; BotTools is public and has two branches, TrumpBot two and Support one, and every branch changes in the rewrite.",
        "evidence": [
          "`architecture.md:101` — BotTools public, TrumpBot and Support private",
          "`architecture.md:102` — the branches: two, two and one",
          "`architecture.md:106` — 39, 199 and 7,259 purged blobs",
          "`architecture.md:119` — every root commit changes, so every branch of every repository changes"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-the-three-repositories"
      },
      "options": [
        {
          "id": "one-unit-atomic-push",
          "name": "Stages 1 to 8 for BotTools, then TrumpBot, then Support in one unit, each repository pushed in one atomic push with an explicit lease on every branch, after a dry run",
          "verdict": "accepted",
          "why": "Each repository stops on its own gates, the server is left with neither branch updated or both, and BotTools goes first with the only push that push protection applies to.",
          "source": "architecture.md §8.1, §8.2",
          "link": "architecture.md#82-the-push"
        },
        {
          "id": "one-unit-for-all",
          "name": "One unit for all of #27, as the parent design's unit 7",
          "verdict": "declined",
          "why": "The work spans four systems with different gates and different writes; one unit would hold one landing hostage to four kinds of stop.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "one-unit-per-repository",
          "name": "One rewrite unit per repository",
          "verdict": "declined",
          "why": "The same procedure three times, with three readiness runs and three landings between the pushes, which moves the residual measurement further from BotTools' push.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "push-without-atomic",
          "name": "One push of both branches without `--atomic`",
          "verdict": "declined",
          "why": "Every failure that concerns one branch leaves a half-rewritten repository, whose only repair is a second force-push.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "push-per-branch",
          "name": "One push per branch",
          "verdict": "declined",
          "why": "It makes the half-rewritten repository an ordinary state between the two pushes, doubles the pushes and keeps the same race window in each.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "mirror-or-force",
          "name": "`--mirror`, `--force` or a `+` refspec",
          "verdict": "declined",
          "why": "git ignores a lease under each, and `--mirror` would delete a server branch created after the clone.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "landed",
        "summary": "#40 landed through PR #45 as 9170254. It rewrote BotTools, then TrumpBot and Support, each by one atomic push under a lease on every branch's recorded tip, five branches in all, 16 commits to 15, 11 to 9 and 2 to 1; BotTools' push ran on its second attempt, after the request service's own check refused the first before anything ran. Each push was classed as pushed and read back at every branch, and each fresh mirror is clean with every count equal to its expectation; BotTools' pull-request residual (39 purged blobs) and its two webhook deliveries are counted, no default-rule finding arose, and the unit's records carry their checksum lists. #41 and #42 start from its records and stage-8 markers."
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Run stages 1 to 8 for BotTools, then TrumpBot, then Support, each repository starting only when the one before it holds its stage-8 marker; BotTools goes first, with the only push that push protection for users applies to.",
            "ref": "architecture.md#81-shape",
            "excerpt": {
              "ref": "architecture.md#81-shape",
              "heading": "8.1 Shape",
              "paragraph": "Order. BotTools, TrumpBot, Support, as the parent design orders them. A repository's stage 1 starts only when the previous repository holds its stage-8 marker. BotTools goes first with the only push that GitHub's push protection for users applies to and the first atomic push of two leases, so what GitHub's receive path does with either is known before a private repository is pushed. · Stages 1 to 5 are the parent's: the list proof and the pre-run checks, the positive control on the untouched backup, the one invocation, the post-run checks with the scan before the push, and the push …",
              "hash": "069dc87d2d5c"
            }
          },
          {
            "text": "Push each repository once: every branch in one atomic push, each under an explicit lease on the tip the mirror clone recorded, after a dry run of the same line; two branches for BotTools, two for TrumpBot and one for Support.",
            "ref": "architecture.md#81-shape",
            "excerpt": {
              "ref": "architecture.md#81-shape",
              "heading": "8.1 Shape",
              "paragraph": "Order. BotTools, TrumpBot, Support, as the parent design orders them. A repository's stage 1 starts only when the previous repository holds its stage-8 marker. BotTools goes first with the only push that GitHub's push protection for users applies to and the first atomic push of two leases, so what GitHub's receive path does with either is known before a private repository is pushed. · Stages 1 to 5 are the parent's: the list proof and the pre-run checks, the positive control on the untouched backup, the one invocation, the post-run checks with the scan before the push, and the push …",
              "hash": "069dc87d2d5c"
            }
          },
          {
            "text": "Class each push's outcome from the exit statuses, the tally and the counted markers, and after any non-zero status read every branch back to name the state, neither, both or partial; partial stops the unit, and a push is sent again only after a transport failure or a stop before it, with every branch still at its old tip and the pull-request refs unchanged.",
            "ref": "architecture.md#83-outcome-read-back-and-resend",
            "excerpt": {
              "ref": "architecture.md#83-outcome-read-back-and-resend",
              "heading": "8.3 Outcome, read-back and resend",
              "paragraph": "The outcome is a class, read from the exit statuses, the tally and the counted markers, and a state, read from GitHub.",
              "hash": "74ce82afed6c"
            }
          },
          {
            "text": "For BotTools, count the webhook's push deliveries once, right after its push, and count its pull-request residual on the fresh mirror at stage 8, recorded without stopping: 39 of 39 purged blobs and 28 commits expected.",
            "ref": "architecture.md#81-shape",
            "excerpt": {
              "ref": "architecture.md#81-shape",
              "heading": "8.1 Shape",
              "paragraph": "Order. BotTools, TrumpBot, Support, as the parent design orders them. A repository's stage 1 starts only when the previous repository holds its stage-8 marker. BotTools goes first with the only push that GitHub's push protection for users applies to and the first atomic push of two leases, so what GitHub's receive path does with either is known before a private repository is pushed. · Stages 1 to 5 are the parent's: the list proof and the pre-run checks, the positive control on the untouched backup, the one invocation, the post-run checks with the scan before the push, and the push …",
              "hash": "069dc87d2d5c"
            }
          },
          {
            "text": "Write new files only, beside the preparation unit's records, a default-rule finding recorded by rule id and file count, and close out with the unit's checksum lists; the unit writes no report row.",
            "ref": "architecture.md#84-records",
            "excerpt": {
              "ref": "architecture.md#84-records",
              "heading": "8.4 Records",
              "paragraph": "The unit writes new files only, beside the preparation unit's five or six records of each repository: the rewrite's outputs, the pre-push scan, the push preparation's records, the kept streams, the listings after the push, the exit tests' outputs, for BotTools the residual record and the two delivery counts, and the time of each push. Its run records hold the request files, the stored replies, the classes and the step markers. Each folder gets the unit's own checksum list at the close-out. A default-rule finding in a kept file is recorded by rule id and file count, with no path and no value, …",
              "hash": "4b2a47525ce6"
            }
          },
          {
            "text": "Start once the workspace tools have landed.",
            "ref": "architecture.md#11-order-gates-and-failure-behaviour",
            "excerpt": {
              "ref": "architecture.md#11-order-gates-and-failure-behaviour",
              "heading": "11. Order, gates and failure behaviour",
              "paragraph": "Units 3 and 4 both wait for unit 2 and for nothing of each other. Unit 3 is ordered first because its reads have a window. · #27 closes when its last unit has landed. #28 stays blocked by #27.",
              "hash": "8d32942b796e"
            }
          }
        ],
        "defense": "One procedure serves the three repositories, each stopping on its own gates with its own state, so three units would repeat it and move the residual measurement further from BotTools' push. BotTools goes first, so what GitHub does with push protection and with an atomic push of two leases is known before a private repository is pushed. The atomic push leaves a repository wholly rewritten or unchanged, and the lease keeps a branch moved since the clone from being overwritten.",
        "tests": [
          "The self-test's quick gate, run again by the unit"
        ],
        "risks": [
          "GitHub applies an atomic push in part: the read-back names the state, partial stops the unit, and BotTools goes first",
          "A branch moves between the clone and the push: the comparison at the push preparation, the guards, the dry run and the lease each refuse, and nothing is sent",
          "Push protection refuses BotTools' push: the remote is unchanged, the two private repositories wait, and the unit never bypasses it",
          "A reply is misread: it is stored as delivered, the classifier stops on what it cannot read, and the server's state is read from GitHub whatever the reply says",
          "BotTools' deliveries leave GitHub's three-day list: they are counted at stage 7, right after the push",
          "A long scan or rewrite on Support is interrupted: every step has its own marker, and a repository restarts from a reset mirror before its push"
        ],
        "source": "architecture.md §8, §16",
        "link": "architecture.md#8-the-rewrites"
      }
    },
    {
      "id": "residual-measurement",
      "group": "After the pushes",
      "name": "Measure what GitHub still serves",
      "system": "residual-exposure",
      "where": "what GitHub serves of the three old histories · the three report rows",
      "unit": {
        "n": 3,
        "slug": "residual-measurement",
        "title": "Phase 0 · 7.3 — Measure what GitHub still serves of BotTools, TrumpBot and Support",
        "blockedBy": [
          40
        ],
        "issue": 41,
        "board": "41-residual-measurement/dashboard.html",
        "folder": "41-residual-measurement/",
        "live": {
          "step": "document",
          "since": "2026-11-16T02:50:34Z",
          "updated": "2026-11-16T03:20:43Z",
          "detail": "Document: 4 of 4 tasks done; every task done.",
          "steps": [
            "sizing",
            "interview",
            "research",
            "plan",
            "branch",
            "implementation",
            "qa",
            "remediation",
            "document",
            "landing",
            "merge",
            "landed"
          ],
          "waitingOn": null,
          "resume": null,
          "qa": [
            {
              "pass": 1,
              "verdict": "changes-requested",
              "date": "2026-11-16",
              "at": "2026-11-16T02:44:24Z",
              "findings": {
                "test": 4,
                "code": 4
              },
              "severity": {
                "minor": 8,
                "other": 0
              },
              "route": "on-the-spot",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/41-residual-measurement/ca070e8d/tests/index.html",
              "note": "The run was found correct and complete: every stage and step ran once with the planned lines and counts, the issue's four conditions are met, and nothing was written to GitHub. The eight findings are five wording points in the as-built record and the consequences: the count of runner steps (19, not 18), the anonymous budget's readings stated beside the calls made, the pace between probes, an acceptance section, and the outcome of the plan's assumptions. They touch the anonymous probes and the report rows."
            }
          ],
          "qaMax": 3,
          "status": "building",
          "branch": "docs/issue-41-measure-bottools-trumpbot-support-residue",
          "event": {
            "name": "document",
            "at": "2026-11-16T03:20:43Z",
            "note": "4 of 4 tasks done"
          },
          "asked": [
            {
              "step": "plan",
              "text": "When should the measurement make its feed reads, given that the events can lag by up to 6 hours and a recorded read is never made again?",
              "options": [
                "Now: the run starts once the plan is written; the events reads of TrumpBot and Support will most likely be recorded as not valid",
                "Per repository, once its events list a push event for every branch it pushed, or once 6 hours have passed since its push, whichever comes first",
                "After the lag for all three: every repository's stage 9 starts from 01:51Z on 2026-11-16"
              ],
              "answer": "Per repository: its first feed reads wait until its events list the push of every branch it pushed, or until 6 hours have passed since its push.",
              "asked": "2026-11-15T21:09:24Z",
              "answered": "2026-11-15T21:11:19Z"
            }
          ],
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "done",
              "rows": [
                "readiness"
              ],
              "brief": "The unit's data file is written, the tools are at their pins, the quick gate passes, the rewrites' records equal their checksum lists, and the three repositories hold their stage-8 markers and their rewritten tips.",
              "kind": "check",
              "steps": [
                {
                  "id": "S0.unit",
                  "name": "The unit's data file",
                  "state": "done",
                  "finished": "2026-11-15T21:43:59Z"
                },
                {
                  "id": "S0.tools",
                  "name": "The tools at their pins",
                  "state": "done",
                  "finished": "2026-11-15T21:44:14Z"
                },
                {
                  "id": "S0.quick",
                  "name": "The quick gate",
                  "state": "done",
                  "finished": "2026-11-15T21:44:46Z"
                },
                {
                  "id": "S0.pins",
                  "name": "The tool versions",
                  "state": "done",
                  "finished": "2026-11-15T21:44:56Z"
                },
                {
                  "id": "S0.records",
                  "name": "The rewrites' records against their checksum lists",
                  "state": "done",
                  "finished": "2026-11-15T21:45:06Z"
                },
                {
                  "id": "S0.markers",
                  "name": "The stage-8 markers",
                  "state": "done",
                  "finished": "2026-11-15T21:45:14Z"
                },
                {
                  "id": "S0.reads",
                  "name": "The three repositories read",
                  "state": "done",
                  "finished": "2026-11-15T21:45:27Z"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "started": "2026-11-15T21:42:41Z",
              "finished": "2026-11-15T21:45:37Z",
              "report": "Readiness passed, every step as the plan expects. The unit's data file is written and the run log held 15504 lines before the unit's steps. The tools are at their pins (96 ok lines). The quick gate passed 63 deterministic checks. The tool versions are as recorded (7 ok lines). The rewrites' records equal their checksum lists (49, 28, 29 and 28 files). The three repositories hold their stage-8 markers, every branch is at its rewritten tip and the pull-request refs are as recorded (12 ok lines). No stop, no wait, no deviation. Next: the events gate over the three repositories; a repository's stage starts when its gate opens.",
              "result": "passed"
            },
            {
              "id": "S1",
              "name": "BotTools",
              "state": "done",
              "rows": [
                "readiness",
                "authenticated-probes",
                "anonymous-probes",
                "feed-reads",
                "report-rows",
                "residual-stays",
                "unprovable"
              ],
              "brief": "Once BotTools' events list its push or 6 hours have passed, what GitHub still serves of its old history is probed and tallied, authenticated and anonymously, its feeds are read twice, and its report row is completed and checksummed.",
              "kind": "work",
              "steps": [
                {
                  "id": "S1.gate",
                  "name": "The events gate",
                  "state": "done",
                  "finished": "2026-11-16T01:47:00Z"
                },
                {
                  "id": "S1.budget",
                  "name": "The anonymous budget",
                  "state": "done",
                  "finished": "2026-11-16T01:47:20Z"
                },
                {
                  "id": "S1.9",
                  "name": "Step 9: the probes, the first feed reads and the report row",
                  "state": "done",
                  "finished": "2026-11-16T01:51:42Z"
                },
                {
                  "id": "S1.feeds",
                  "name": "The second feed reads",
                  "state": "done",
                  "finished": "2026-11-16T01:58:02Z"
                },
                {
                  "id": "S1.reads",
                  "name": "The repository read again",
                  "state": "done",
                  "finished": "2026-11-16T01:58:33Z"
                },
                {
                  "id": "S1.record",
                  "name": "The report row completed and checksummed",
                  "state": "done",
                  "finished": "2026-11-16T01:58:53Z"
                }
              ],
              "ref": "plan.md#s1--bottools",
              "started": "2026-11-15T21:45:37Z",
              "finished": "2026-11-16T01:59:01Z",
              "report": "BotTools is measured and recorded. Its gate opened on the 6 hours at the 27th check (01:47:00Z on 2026-11-16), after 26 checks that printed a wait; the events then listed the push of 1 of its 2 pushed branches. The anonymous budget read 60 calls left. Step 9 passed with 15 ok lines and 2 RECORD lines, no void batch, no stop and no wait: every probe answered served (authenticated: commits 3, trees 3, blobs 39, want 2; anonymous: web 3, want commits 3, trees 3, blobs 39, REST commits 3, trees 3, blobs 3), and answers other than the expected ones are 0. The first feed reads are all valid, anonymous 3 of 3: the activity feed and the web page list 2 old ids and 2 current ids, the events 1 and 1 where the plan's expected value is 2 and 2, because the events list one of the two pushes; the plan records the memberships as measured. The second reads, made 360 seconds or more after the first, read the same counts, anonymous 3 of 3 valid. The repository read again as recorded (6 ok lines). The report row is complete at 31 lines, with the pull-request residual line and the webhook deliveries; 11 record files and 5 run records are checksummed. No deviation. Next: TrumpBot, whose gate opened at the same check."
            },
            {
              "id": "S2",
              "name": "TrumpBot",
              "state": "done",
              "rows": [
                "authenticated-probes",
                "feed-reads",
                "report-rows",
                "unprovable"
              ],
              "brief": "The same for TrumpBot once its gate opens, authenticated only.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.gate",
                  "name": "The events gate",
                  "state": "done",
                  "finished": "2026-11-16T01:59:29Z"
                },
                {
                  "id": "S2.9",
                  "name": "Step 9: the probes, the first feed reads and the report row",
                  "state": "done",
                  "finished": "2026-11-16T02:01:27Z"
                },
                {
                  "id": "S2.feeds",
                  "name": "The second feed reads",
                  "state": "done",
                  "finished": "2026-11-16T02:07:33Z"
                },
                {
                  "id": "S2.reads",
                  "name": "The repository read again",
                  "state": "done",
                  "finished": "2026-11-16T02:07:59Z"
                },
                {
                  "id": "S2.record",
                  "name": "The report row completed and checksummed",
                  "state": "done",
                  "finished": "2026-11-16T02:08:16Z"
                }
              ],
              "ref": "plan.md#s2--trumpbot",
              "started": "2026-11-16T01:59:01Z",
              "finished": "2026-11-16T02:08:17Z",
              "report": "TrumpBot is measured and recorded, authenticated only. Its gate opened on the 6 hours (01:46:29Z on 2026-11-16); at the last check that read its events they listed the push of 0 of its 2 pushed branches. Step 9 passed with 7 ok lines and 1 RECORD line, no void batch, no stop and no wait: every authenticated probe answered served (commits 3, trees 3, blobs 50 of the 199 in the manifest, want 2), and answers other than the expected ones are 0. The activity feed read is valid on both reads, 2 old ids and 2 current ids. The events read lists no current id on both reads and is recorded not valid, where the plan's expected value is 2 and 2: the events listed no push of the rewrite once the 6 hours had passed, the case the plan's assumption on the events' lag provides for. The repository read again as recorded (6 ok lines). The report row is complete at 16 lines; 11 record files and 9 run records are checksummed. No deviation. Next: Support, whose gate is open on the 6 hours."
            },
            {
              "id": "S3",
              "name": "Support",
              "state": "done",
              "rows": [
                "authenticated-probes",
                "feed-reads",
                "report-rows",
                "unprovable"
              ],
              "brief": "The same for Support once its gate opens, authenticated only.",
              "kind": "work",
              "steps": [
                {
                  "id": "S3.gate",
                  "name": "The events gate",
                  "state": "done",
                  "finished": "2026-11-16T02:08:36Z"
                },
                {
                  "id": "S3.9",
                  "name": "Step 9: the probes, the first feed reads and the report row",
                  "state": "done",
                  "finished": "2026-11-16T02:10:38Z"
                },
                {
                  "id": "S3.feeds",
                  "name": "The second feed reads",
                  "state": "done",
                  "finished": "2026-11-16T02:16:42Z"
                },
                {
                  "id": "S3.reads",
                  "name": "The repository read again",
                  "state": "done",
                  "finished": "2026-11-16T02:17:09Z"
                },
                {
                  "id": "S3.record",
                  "name": "The report row completed and checksummed",
                  "state": "done",
                  "finished": "2026-11-16T02:17:27Z"
                }
              ],
              "ref": "plan.md#s3--support",
              "started": "2026-11-16T02:08:17Z",
              "finished": "2026-11-16T02:17:46Z",
              "report": "Support is measured and recorded, authenticated only. Its gate opened on the 6 hours (01:51:56Z on 2026-11-16); at the last check that read its events they listed the push of 0 of its 1 pushed branch. Step 9 passed with 7 ok lines and 1 RECORD line, no void batch, no stop and no wait: every authenticated probe answered served (commits 2, trees 2, blobs 60 of the 7259 in the manifest, want 1), and answers other than the expected ones are 0. The activity feed read is valid on both reads, 1 old id and 1 current id. The events read lists no current id on both reads and is recorded not valid, where the plan's expected value is 1 and 1: the events listed no push of the rewrite once the 6 hours had passed. The repository read again as recorded (6 ok lines). The report row is complete at 16 lines and carries its line on what the probes cannot prove; 11 record files and 13 run records are checksummed. No deviation. All three repositories are recorded. Next: the close-out."
            },
            {
              "id": "S4",
              "name": "Close-out",
              "state": "done",
              "rows": [
                "report-rows"
              ],
              "brief": "The rewrites' records and this unit's equal their checksum lists, the tools and the earlier tool folder are at their pins, and the unit's outputs and records hold nothing sensitive.",
              "kind": "check",
              "steps": [
                {
                  "id": "S4.records",
                  "name": "The checksum lists",
                  "state": "done",
                  "finished": "2026-11-16T02:18:11Z"
                },
                {
                  "id": "S4.tools",
                  "name": "The tools at their pins",
                  "state": "done",
                  "finished": "2026-11-16T02:18:51Z"
                },
                {
                  "id": "S4.g26",
                  "name": "The earlier tool folder at its pins",
                  "state": "done",
                  "finished": "2026-11-16T02:19:30Z"
                },
                {
                  "id": "S4.outputs",
                  "name": "The output rule over the unit's outputs",
                  "state": "done",
                  "finished": "2026-11-16T02:19:58Z"
                }
              ],
              "ref": "plan.md#s4--close-out",
              "started": "2026-11-16T02:17:46Z",
              "finished": "2026-11-16T02:20:14Z",
              "report": "The close-out passed, every step as the plan expects. All eight checksum lists verify: the rewrites' four (49, 28, 29 and 28 files) and this unit's four (13, 11, 11 and 11 files). The tools are at their pins (96 ok lines). The earlier tool folder equals its pins (21 of 21 pinned files, 22 files in the folder), the 21 reused tools and the runner equal their list, and the runner is unchanged. The output rule holds: the unit's part of the run log is 555 lines with STOP 0, WAIT 0, NEXT 0 and RECORD 7, and neither it nor the 9 records checked hold a drive-letter path or a 40-digit id. The log part holds the lines of this unit's 19 runner steps, 18 of which print a stage line, and of no other unit. The second feed reads followed the first by 383, 368 and 366 seconds (BotTools, TrumpBot, Support), each at least 360. No deviation from the plan in the whole run. The landing's document checks are not part of these stages and are still to run.",
              "result": "passed"
            }
          ],
          "remediation": {
            "pass": 1,
            "route": "on-the-spot",
            "steps": [
              {
                "name": "The count of runner steps corrected to 19",
                "state": "done",
                "finished": "2026-11-16T02:47:09Z",
                "report": "Three statements of the as-built record were corrected from the run log and the kept counts, with no step run again: the unit's part of the log holds 19 runner steps, 18 of which print a stage line; the anonymous budget read 60 before step 9, 50 before the second feed reads and 48 after them, with no shortage and no disagreement above the tool's limit; and the pace between probes was the tools' pinned 0.4 seconds with no override. The acceptance section and the outcome of the plan's assumptions are written when the plan is reconciled with the run."
              },
              {
                "name": "The anonymous budget's readings stated beside the calls made",
                "state": "done",
                "finished": "2026-11-16T02:47:09Z",
                "report": "Three statements of the as-built record were corrected from the run log and the kept counts, with no step run again: the unit's part of the log holds 19 runner steps, 18 of which print a stage line; the anonymous budget read 60 before step 9, 50 before the second feed reads and 48 after them, with no shortage and no disagreement above the tool's limit; and the pace between probes was the tools' pinned 0.4 seconds with no override. The acceptance section and the outcome of the plan's assumptions are written when the plan is reconciled with the run."
              },
              {
                "name": "The pace between probes stated",
                "state": "done",
                "finished": "2026-11-16T02:47:09Z",
                "report": "Three statements of the as-built record were corrected from the run log and the kept counts, with no step run again: the unit's part of the log holds 19 runner steps, 18 of which print a stage line; the anonymous budget read 60 before step 9, 50 before the second feed reads and 48 after them, with no shortage and no disagreement above the tool's limit; and the pace between probes was the tools' pinned 0.4 seconds with no override. The acceptance section and the outcome of the plan's assumptions are written when the plan is reconciled with the run."
              }
            ]
          },
          "document": {
            "tasks": [
              {
                "id": "reconcile-plan",
                "name": "Reconcile the plan with the run",
                "state": "done",
                "started": "2026-11-16T02:50:34Z",
                "finished": "2026-11-16T03:04:06Z",
                "report": "The as-built record now holds its acceptance section, the six criteria each against its reading, and two deviations: two readings made beside the procedure, and a note added to the parent research. The consequences record the outcome of each assumption: eight held, and the one on the events did not hold for any repository, since after 6 hours they listed 1 of 2, 0 of 2 and 0 of 1 pushed branches. The plan's status reads built and the parent consequences carry the unit's link line. The README and the CHANGELOG take no change: the landing carries documents and boards only and no version moves."
              },
              {
                "id": "readme-changelog",
                "name": "README and CHANGELOG",
                "state": "done",
                "finished": "2026-11-16T03:04:06Z",
                "report": "The as-built record now holds its acceptance section, the six criteria each against its reading, and two deviations: two readings made beside the procedure, and a note added to the parent research. The consequences record the outcome of each assumption: eight held, and the one on the events did not hold for any repository, since after 6 hours they listed 1 of 2, 0 of 2 and 0 of 1 pushed branches. The plan's status reads built and the parent consequences carry the unit's link line. The README and the CHANGELOG take no change: the landing carries documents and boards only and no version moves."
              },
              {
                "id": "state-boards",
                "name": "State boards",
                "state": "done",
                "started": "2026-11-16T03:04:06Z",
                "finished": "2026-11-16T03:17:23Z"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "done",
                "started": "2026-11-16T03:17:23Z",
                "finished": "2026-11-16T03:20:43Z"
              }
            ]
          },
          "history": {
            "sizing": [
              {
                "since": null,
                "ended": "2026-11-15T20:55:34Z",
                "endedBy": "sized",
                "to": "plan"
              }
            ],
            "plan": [
              {
                "since": "2026-11-15T20:55:34Z",
                "ended": "2026-11-15T21:09:24Z",
                "endedBy": "halted",
                "to": "plan",
                "event": {
                  "name": "sized",
                  "at": "2026-11-15T20:55:34Z"
                },
                "detail": "Unit 3 of the three-repository work: the residual measurement over BotTools, TrumpBot and Support. The unit's slice of the parent design (section 9) is validated against the workspace as the rewrites left it, then planned in detail.",
                "plan": {
                  "state": "re-pass",
                  "from": "parent",
                  "since": "2026-11-15T20:55:34Z",
                  "stages": [
                    {
                      "id": "re-pass",
                      "state": "current",
                      "started": "2026-11-15T20:55:34Z"
                    },
                    {
                      "id": "write",
                      "state": "todo"
                    },
                    {
                      "id": "check",
                      "state": "todo"
                    },
                    {
                      "id": "consequences",
                      "state": "todo"
                    },
                    {
                      "id": "report",
                      "state": "todo"
                    }
                  ]
                },
                "held": true,
                "asked": [
                  {
                    "text": "When should the measurement make its feed reads, given that the events can lag by up to 6 hours and a recorded read is never made again?",
                    "options": [
                      "Now: the run starts once the plan is written; the events reads of TrumpBot and Support will most likely be recorded as not valid",
                      "Per repository, once its events list a push event for every branch it pushed, or once 6 hours have passed since its push, whichever comes first",
                      "After the lag for all three: every repository's stage 9 starts from 01:51Z on 2026-11-16"
                    ],
                    "answer": "Per repository: its first feed reads wait until its events list the push of every branch it pushed, or until 6 hours have passed since its push.",
                    "asked": "2026-11-15T21:09:24Z",
                    "answered": "2026-11-15T21:11:19Z"
                  }
                ]
              },
              {
                "since": "2026-11-15T21:11:19Z",
                "ended": "2026-11-15T21:39:48Z",
                "endedBy": "plan-accepted",
                "to": "branch",
                "event": {
                  "name": "plan-stage",
                  "at": "2026-11-15T21:39:18Z"
                },
                "detail": "The consequences record that the measurement only reads GitHub and writes new records in the data folder and the workspace, that the events gate is what the phase takes up, what the residual report takes, and the known gaps of a measurement made by sample and by feed.",
                "plan": {
                  "state": "re-pass",
                  "from": "parent",
                  "since": "2026-11-15T20:55:34Z",
                  "stages": [
                    {
                      "id": "re-pass",
                      "state": "done",
                      "started": "2026-11-15T20:55:34Z",
                      "finished": "2026-11-15T21:24:16Z",
                      "report": "The slice holds against the workspace and GitHub as the rewrites left them: every record the measurement reads is in place and equals its checksum list, every branch is at its rewritten tip, the authenticated routes answer on both private repositories, and each repository's measurement waits until its events list its push or 6 hours have passed."
                    },
                    {
                      "id": "write",
                      "state": "done",
                      "started": "2026-11-15T21:24:16Z",
                      "finished": "2026-11-15T21:34:50Z",
                      "report": "The draft holds five stages: readiness, one stage per repository that starts when its events gate opens, and a close-out, with the gate and the checksum and output checks as typed read-only blocks and every step's expected lines taken from the tools."
                    },
                    {
                      "id": "check",
                      "state": "done",
                      "started": "2026-11-15T21:34:50Z",
                      "finished": "2026-11-15T21:37:54Z",
                      "report": "The check found the plan in line with the tools' source, the rewrites' records as built and the parent design's section 9, and fixed small points in place: the wording of the protocol-v2 probe, the stop row of the anonymous budget, the records step 9 needs, the flowchart's edges and a source link.",
                      "result": "accepted"
                    },
                    {
                      "id": "consequences",
                      "state": "done",
                      "started": "2026-11-15T21:37:54Z",
                      "finished": "2026-11-15T21:39:18Z",
                      "report": "The consequences record that the measurement only reads GitHub and writes new records in the data folder and the workspace, that the events gate is what the phase takes up, what the residual report takes, and the known gaps of a measurement made by sample and by feed."
                    },
                    {
                      "id": "report",
                      "state": "done",
                      "started": "2026-11-15T21:39:18Z",
                      "finished": "2026-11-15T21:39:48Z",
                      "report": "The plan is accepted as written: five stages (readiness, one stage per repository behind its events gate, the close-out), with the consequences recorded and no consideration left open."
                    }
                  ]
                }
              }
            ],
            "branch": [
              {
                "since": "2026-11-15T21:39:48Z",
                "ended": "2026-11-15T21:42:41Z",
                "endedBy": "branch-cut",
                "to": "implementation",
                "event": {
                  "name": "plan-accepted",
                  "at": "2026-11-15T21:39:48Z"
                },
                "detail": "The plan is accepted as written: five stages (readiness, one stage per repository behind its events gate, the close-out), with the consequences recorded and no consideration left open.",
                "branch": "docs/issue-41-measure-bottools-trumpbot-support-residue"
              }
            ],
            "implementation": [
              {
                "since": "2026-11-15T21:42:41Z",
                "ended": "2026-11-16T02:21:47Z",
                "endedBy": "qa-pass",
                "to": "qa",
                "event": {
                  "name": "implementation-stage",
                  "at": "2026-11-16T02:20:14Z",
                  "note": "S4 reported done; Quality Review next"
                },
                "detail": "The close-out passed, every step as the plan expects. All eight checksum lists verify: the rewrites' four (49, 28, 29 and 28 files) and this unit's four (13, 11, 11 and 11 files). The tools are at their pins (96 ok lines). The earlier tool folder equals its pins (21 of 21 pinned files, 22 files in the folder), the 21 reused tools and the runner equal their list, and the runner is unchanged. The output rule holds: the unit's part of the run log is 555 lines with STOP 0, WAIT 0, NEXT 0 and RECORD 7, and neither it nor the 9 records checked hold a drive-letter path or a 40-digit id. The log part holds the lines of this unit's 19 runner steps, 18 of which print a stage line, and of no other unit. The second feed reads followed the first by 383, 368 and 366 seconds (BotTools, TrumpBot, Support), each at least 360. No deviation from the plan in the whole run. The landing's document checks are not part of these stages and are still to run.",
                "stages": [
                  {
                    "id": "S0",
                    "name": "Readiness",
                    "state": "done",
                    "rows": [
                      "readiness"
                    ],
                    "brief": "The unit's data file is written, the tools are at their pins, the quick gate passes, the rewrites' records equal their checksum lists, and the three repositories hold their stage-8 markers and their rewritten tips.",
                    "kind": "check",
                    "steps": [
                      {
                        "id": "S0.unit",
                        "name": "The unit's data file",
                        "state": "done",
                        "finished": "2026-11-15T21:43:59Z"
                      },
                      {
                        "id": "S0.tools",
                        "name": "The tools at their pins",
                        "state": "done",
                        "finished": "2026-11-15T21:44:14Z"
                      },
                      {
                        "id": "S0.quick",
                        "name": "The quick gate",
                        "state": "done",
                        "finished": "2026-11-15T21:44:46Z"
                      },
                      {
                        "id": "S0.pins",
                        "name": "The tool versions",
                        "state": "done",
                        "finished": "2026-11-15T21:44:56Z"
                      },
                      {
                        "id": "S0.records",
                        "name": "The rewrites' records against their checksum lists",
                        "state": "done",
                        "finished": "2026-11-15T21:45:06Z"
                      },
                      {
                        "id": "S0.markers",
                        "name": "The stage-8 markers",
                        "state": "done",
                        "finished": "2026-11-15T21:45:14Z"
                      },
                      {
                        "id": "S0.reads",
                        "name": "The three repositories read",
                        "state": "done",
                        "finished": "2026-11-15T21:45:27Z"
                      }
                    ],
                    "ref": "plan.md#s0--readiness",
                    "started": "2026-11-15T21:42:41Z",
                    "finished": "2026-11-15T21:45:37Z",
                    "report": "Readiness passed, every step as the plan expects. The unit's data file is written and the run log held 15504 lines before the unit's steps. The tools are at their pins (96 ok lines). The quick gate passed 63 deterministic checks. The tool versions are as recorded (7 ok lines). The rewrites' records equal their checksum lists (49, 28, 29 and 28 files). The three repositories hold their stage-8 markers, every branch is at its rewritten tip and the pull-request refs are as recorded (12 ok lines). No stop, no wait, no deviation. Next: the events gate over the three repositories; a repository's stage starts when its gate opens.",
                    "result": "passed"
                  },
                  {
                    "id": "S1",
                    "name": "BotTools",
                    "state": "done",
                    "rows": [
                      "readiness",
                      "authenticated-probes",
                      "anonymous-probes",
                      "feed-reads",
                      "report-rows",
                      "residual-stays",
                      "unprovable"
                    ],
                    "brief": "Once BotTools' events list its push or 6 hours have passed, what GitHub still serves of its old history is probed and tallied, authenticated and anonymously, its feeds are read twice, and its report row is completed and checksummed.",
                    "kind": "work",
                    "steps": [
                      {
                        "id": "S1.gate",
                        "name": "The events gate",
                        "state": "done",
                        "finished": "2026-11-16T01:47:00Z"
                      },
                      {
                        "id": "S1.budget",
                        "name": "The anonymous budget",
                        "state": "done",
                        "finished": "2026-11-16T01:47:20Z"
                      },
                      {
                        "id": "S1.9",
                        "name": "Step 9: the probes, the first feed reads and the report row",
                        "state": "done",
                        "finished": "2026-11-16T01:51:42Z"
                      },
                      {
                        "id": "S1.feeds",
                        "name": "The second feed reads",
                        "state": "done",
                        "finished": "2026-11-16T01:58:02Z"
                      },
                      {
                        "id": "S1.reads",
                        "name": "The repository read again",
                        "state": "done",
                        "finished": "2026-11-16T01:58:33Z"
                      },
                      {
                        "id": "S1.record",
                        "name": "The report row completed and checksummed",
                        "state": "done",
                        "finished": "2026-11-16T01:58:53Z"
                      }
                    ],
                    "ref": "plan.md#s1--bottools",
                    "started": "2026-11-15T21:45:37Z",
                    "finished": "2026-11-16T01:59:01Z",
                    "report": "BotTools is measured and recorded. Its gate opened on the 6 hours at the 27th check (01:47:00Z on 2026-11-16), after 26 checks that printed a wait; the events then listed the push of 1 of its 2 pushed branches. The anonymous budget read 60 calls left. Step 9 passed with 15 ok lines and 2 RECORD lines, no void batch, no stop and no wait: every probe answered served (authenticated: commits 3, trees 3, blobs 39, want 2; anonymous: web 3, want commits 3, trees 3, blobs 39, REST commits 3, trees 3, blobs 3), and answers other than the expected ones are 0. The first feed reads are all valid, anonymous 3 of 3: the activity feed and the web page list 2 old ids and 2 current ids, the events 1 and 1 where the plan's expected value is 2 and 2, because the events list one of the two pushes; the plan records the memberships as measured. The second reads, made 360 seconds or more after the first, read the same counts, anonymous 3 of 3 valid. The repository read again as recorded (6 ok lines). The report row is complete at 31 lines, with the pull-request residual line and the webhook deliveries; 11 record files and 5 run records are checksummed. No deviation. Next: TrumpBot, whose gate opened at the same check."
                  },
                  {
                    "id": "S2",
                    "name": "TrumpBot",
                    "state": "done",
                    "rows": [
                      "authenticated-probes",
                      "feed-reads",
                      "report-rows",
                      "unprovable"
                    ],
                    "brief": "The same for TrumpBot once its gate opens, authenticated only.",
                    "kind": "work",
                    "steps": [
                      {
                        "id": "S2.gate",
                        "name": "The events gate",
                        "state": "done",
                        "finished": "2026-11-16T01:59:29Z"
                      },
                      {
                        "id": "S2.9",
                        "name": "Step 9: the probes, the first feed reads and the report row",
                        "state": "done",
                        "finished": "2026-11-16T02:01:27Z"
                      },
                      {
                        "id": "S2.feeds",
                        "name": "The second feed reads",
                        "state": "done",
                        "finished": "2026-11-16T02:07:33Z"
                      },
                      {
                        "id": "S2.reads",
                        "name": "The repository read again",
                        "state": "done",
                        "finished": "2026-11-16T02:07:59Z"
                      },
                      {
                        "id": "S2.record",
                        "name": "The report row completed and checksummed",
                        "state": "done",
                        "finished": "2026-11-16T02:08:16Z"
                      }
                    ],
                    "ref": "plan.md#s2--trumpbot",
                    "started": "2026-11-16T01:59:01Z",
                    "finished": "2026-11-16T02:08:17Z",
                    "report": "TrumpBot is measured and recorded, authenticated only. Its gate opened on the 6 hours (01:46:29Z on 2026-11-16); at the last check that read its events they listed the push of 0 of its 2 pushed branches. Step 9 passed with 7 ok lines and 1 RECORD line, no void batch, no stop and no wait: every authenticated probe answered served (commits 3, trees 3, blobs 50 of the 199 in the manifest, want 2), and answers other than the expected ones are 0. The activity feed read is valid on both reads, 2 old ids and 2 current ids. The events read lists no current id on both reads and is recorded not valid, where the plan's expected value is 2 and 2: the events listed no push of the rewrite once the 6 hours had passed, the case the plan's assumption on the events' lag provides for. The repository read again as recorded (6 ok lines). The report row is complete at 16 lines; 11 record files and 9 run records are checksummed. No deviation. Next: Support, whose gate is open on the 6 hours."
                  },
                  {
                    "id": "S3",
                    "name": "Support",
                    "state": "done",
                    "rows": [
                      "authenticated-probes",
                      "feed-reads",
                      "report-rows",
                      "unprovable"
                    ],
                    "brief": "The same for Support once its gate opens, authenticated only.",
                    "kind": "work",
                    "steps": [
                      {
                        "id": "S3.gate",
                        "name": "The events gate",
                        "state": "done",
                        "finished": "2026-11-16T02:08:36Z"
                      },
                      {
                        "id": "S3.9",
                        "name": "Step 9: the probes, the first feed reads and the report row",
                        "state": "done",
                        "finished": "2026-11-16T02:10:38Z"
                      },
                      {
                        "id": "S3.feeds",
                        "name": "The second feed reads",
                        "state": "done",
                        "finished": "2026-11-16T02:16:42Z"
                      },
                      {
                        "id": "S3.reads",
                        "name": "The repository read again",
                        "state": "done",
                        "finished": "2026-11-16T02:17:09Z"
                      },
                      {
                        "id": "S3.record",
                        "name": "The report row completed and checksummed",
                        "state": "done",
                        "finished": "2026-11-16T02:17:27Z"
                      }
                    ],
                    "ref": "plan.md#s3--support",
                    "started": "2026-11-16T02:08:17Z",
                    "finished": "2026-11-16T02:17:46Z",
                    "report": "Support is measured and recorded, authenticated only. Its gate opened on the 6 hours (01:51:56Z on 2026-11-16); at the last check that read its events they listed the push of 0 of its 1 pushed branch. Step 9 passed with 7 ok lines and 1 RECORD line, no void batch, no stop and no wait: every authenticated probe answered served (commits 2, trees 2, blobs 60 of the 7259 in the manifest, want 1), and answers other than the expected ones are 0. The activity feed read is valid on both reads, 1 old id and 1 current id. The events read lists no current id on both reads and is recorded not valid, where the plan's expected value is 1 and 1: the events listed no push of the rewrite once the 6 hours had passed. The repository read again as recorded (6 ok lines). The report row is complete at 16 lines and carries its line on what the probes cannot prove; 11 record files and 13 run records are checksummed. No deviation. All three repositories are recorded. Next: the close-out."
                  },
                  {
                    "id": "S4",
                    "name": "Close-out",
                    "state": "done",
                    "rows": [
                      "report-rows"
                    ],
                    "brief": "The rewrites' records and this unit's equal their checksum lists, the tools and the earlier tool folder are at their pins, and the unit's outputs and records hold nothing sensitive.",
                    "kind": "check",
                    "steps": [
                      {
                        "id": "S4.records",
                        "name": "The checksum lists",
                        "state": "done",
                        "finished": "2026-11-16T02:18:11Z"
                      },
                      {
                        "id": "S4.tools",
                        "name": "The tools at their pins",
                        "state": "done",
                        "finished": "2026-11-16T02:18:51Z"
                      },
                      {
                        "id": "S4.g26",
                        "name": "The earlier tool folder at its pins",
                        "state": "done",
                        "finished": "2026-11-16T02:19:30Z"
                      },
                      {
                        "id": "S4.outputs",
                        "name": "The output rule over the unit's outputs",
                        "state": "done",
                        "finished": "2026-11-16T02:19:58Z"
                      }
                    ],
                    "ref": "plan.md#s4--close-out",
                    "started": "2026-11-16T02:17:46Z",
                    "finished": "2026-11-16T02:20:14Z",
                    "report": "The close-out passed, every step as the plan expects. All eight checksum lists verify: the rewrites' four (49, 28, 29 and 28 files) and this unit's four (13, 11, 11 and 11 files). The tools are at their pins (96 ok lines). The earlier tool folder equals its pins (21 of 21 pinned files, 22 files in the folder), the 21 reused tools and the runner equal their list, and the runner is unchanged. The output rule holds: the unit's part of the run log is 555 lines with STOP 0, WAIT 0, NEXT 0 and RECORD 7, and neither it nor the 9 records checked hold a drive-letter path or a 40-digit id. The log part holds the lines of this unit's 19 runner steps, 18 of which print a stage line, and of no other unit. The second feed reads followed the first by 383, 368 and 366 seconds (BotTools, TrumpBot, Support), each at least 360. No deviation from the plan in the whole run. The landing's document checks are not part of these stages and are still to run.",
                    "result": "passed"
                  }
                ]
              }
            ],
            "qa": [
              {
                "since": "2026-11-16T02:21:47Z",
                "ended": "2026-11-16T02:44:24Z",
                "endedBy": "qa-pass",
                "to": "remediation",
                "event": {
                  "name": "qa-pass",
                  "at": "2026-11-16T02:21:47Z",
                  "note": "Quality Review 1: running"
                },
                "detail": "All five stages passed with no stop. The change set against the base holds documents and boards only; the run is checked against its plan from the markers, the run log, the checksum lists and GitHub.",
                "qa": [
                  {
                    "pass": 1,
                    "verdict": "changes-requested",
                    "date": "2026-11-16",
                    "at": "2026-11-16T02:44:24Z",
                    "findings": {
                      "test": 4,
                      "code": 4
                    },
                    "severity": {
                      "minor": 8,
                      "other": 0
                    },
                    "route": "on-the-spot",
                    "report": "build/reports/tests/index.html",
                    "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/41-residual-measurement/ca070e8d/tests/index.html",
                    "note": "The run was found correct and complete: every stage and step ran once with the planned lines and counts, the issue's four conditions are met, and nothing was written to GitHub. The eight findings are five wording points in the as-built record and the consequences: the count of runner steps (19, not 18), the anonymous budget's readings stated beside the calls made, the pace between probes, an acceptance section, and the outcome of the plan's assumptions. They touch the anonymous probes and the report rows."
                  }
                ]
              }
            ],
            "remediation": [
              {
                "since": "2026-11-16T02:44:24Z",
                "ended": "2026-11-16T02:50:34Z",
                "endedBy": "document",
                "to": "document",
                "event": {
                  "name": "implementation-stage",
                  "at": "2026-11-16T02:47:09Z",
                  "note": "3 of 3 sub-steps done"
                },
                "detail": "Three statements of the as-built record were corrected from the run log and the kept counts, with no step run again: the unit's part of the log holds 19 runner steps, 18 of which print a stage line; the anonymous budget read 60 before step 9, 50 before the second feed reads and 48 after them, with no shortage and no disagreement above the tool's limit; and the pace between probes was the tools' pinned 0.4 seconds with no override. The acceptance section and the outcome of the plan's assumptions are written when the plan is reconciled with the run.",
                "remediation": {
                  "pass": 1,
                  "route": "on-the-spot",
                  "steps": [
                    {
                      "name": "The count of runner steps corrected to 19",
                      "state": "done",
                      "finished": "2026-11-16T02:47:09Z",
                      "report": "Three statements of the as-built record were corrected from the run log and the kept counts, with no step run again: the unit's part of the log holds 19 runner steps, 18 of which print a stage line; the anonymous budget read 60 before step 9, 50 before the second feed reads and 48 after them, with no shortage and no disagreement above the tool's limit; and the pace between probes was the tools' pinned 0.4 seconds with no override. The acceptance section and the outcome of the plan's assumptions are written when the plan is reconciled with the run."
                    },
                    {
                      "name": "The anonymous budget's readings stated beside the calls made",
                      "state": "done",
                      "finished": "2026-11-16T02:47:09Z",
                      "report": "Three statements of the as-built record were corrected from the run log and the kept counts, with no step run again: the unit's part of the log holds 19 runner steps, 18 of which print a stage line; the anonymous budget read 60 before step 9, 50 before the second feed reads and 48 after them, with no shortage and no disagreement above the tool's limit; and the pace between probes was the tools' pinned 0.4 seconds with no override. The acceptance section and the outcome of the plan's assumptions are written when the plan is reconciled with the run."
                    },
                    {
                      "name": "The pace between probes stated",
                      "state": "done",
                      "finished": "2026-11-16T02:47:09Z",
                      "report": "Three statements of the as-built record were corrected from the run log and the kept counts, with no step run again: the unit's part of the log holds 19 runner steps, 18 of which print a stage line; the anonymous budget read 60 before step 9, 50 before the second feed reads and 48 after them, with no shortage and no disagreement above the tool's limit; and the pace between probes was the tools' pinned 0.4 seconds with no override. The acceptance section and the outcome of the plan's assumptions are written when the plan is reconciled with the run."
                    }
                  ]
                },
                "qa": [
                  {
                    "pass": 1,
                    "verdict": "changes-requested",
                    "date": "2026-11-16",
                    "at": "2026-11-16T02:44:24Z",
                    "findings": {
                      "test": 4,
                      "code": 4
                    },
                    "severity": {
                      "minor": 8,
                      "other": 0
                    },
                    "route": "on-the-spot",
                    "report": "build/reports/tests/index.html",
                    "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/41-residual-measurement/ca070e8d/tests/index.html",
                    "note": "The run was found correct and complete: every stage and step ran once with the planned lines and counts, the issue's four conditions are met, and nothing was written to GitHub. The eight findings are five wording points in the as-built record and the consequences: the count of runner steps (19, not 18), the anonymous budget's readings stated beside the calls made, the pace between probes, an acceptance section, and the outcome of the plan's assumptions. They touch the anonymous probes and the report rows."
                  }
                ]
              }
            ]
          },
          "rowNames": {
            "readiness": "Readiness: the rewrites' records, every branch at its rewritten tip, the token and the anonymous budget",
            "authenticated-probes": "Authenticated probes of all three repositories",
            "anonymous-probes": "Anonymous probes and anonymous feed reads, BotTools only",
            "feed-reads": "The feed reads, each made twice, inside the events' window",
            "report-rows": "The report rows, in counts only, and the unit's checksum lists",
            "residual-stays": "BotTools' pull-request residual, measured and left in place",
            "unprovable": "What the probes cannot prove"
          },
          "recon": {
            "interview": {
              "reconstructed": true,
              "ended": null,
              "trail": [],
              "milestones": []
            },
            "research": {
              "reconstructed": true,
              "ended": "2026-11-15",
              "trail": [
                {
                  "date": "2026-11-15",
                  "label": "Nothing to research; the plan next"
                }
              ],
              "milestones": [
                {
                  "date": "2026-11-13",
                  "label": "Research verified, in #27's run",
                  "ref": "../research/README.md",
                  "note": "written on this board when the run started, from #27's architecture: the current state of the three repositories and the verified outside-world facts (§2.1, §2.5), this unit's design in §9, its non-goals in §4, #28's inputs in §13.4 and its row in §16, with #27's consequences (§2.1, §5, §6); and from the state the earlier units left: the rewrites' consequences (§2.1, §4, §5) and as-built record (§3.3, §3.4), and the residual set and its known gap in the tools unit's plan and consequences"
                }
              ]
            }
          }
        },
        "tests": {
          "base": "main",
          "updated": "2026-11-16T02:44:24Z",
          "added": [],
          "amended": [],
          "relevant": [
            {
              "class": "gselftest.sh deterministic",
              "module": "tools/g27",
              "testSet": "deterministic",
              "tests": 63,
              "result": {
                "state": "passed",
                "passed": 63,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-16T02:44:24Z"
              }
            }
          ]
        }
      },
      "gap": {
        "kind": "missing",
        "summary": "Nothing measures yet what GitHub will still serve of the three old histories after their pushes. BotTools' 39 purged blobs all stay reachable through its two pull-request refs, and the earlier stage 9 runs right after each push and probes anonymously whatever a repository's visibility.",
        "evidence": [
          "`architecture.md:113` — all 39 of BotTools' purged blobs stay reachable through its two pull-request refs",
          "`architecture.md:147` — the earlier tools run stage 9 right after each push",
          "`research/README.md:326` — stage 9 runs anonymous probes whatever the repository's visibility"
        ],
        "source": "architecture.md §2.1, §2.3",
        "link": "architecture.md#21-the-three-repositories"
      },
      "options": [
        {
          "id": "after-last-push",
          "name": "Stage 9 over all three repositories once the last push is verified: authenticated probes for all three, anonymous ones for BotTools only, the feeds read twice",
          "verdict": "accepted",
          "why": "The measurement belongs to its own system, holds no push back, and follows the last push promptly, with a read outside the feeds' window recorded as not valid.",
          "source": "architecture.md §9.1, §9.2",
          "link": "architecture.md#91-when-it-runs"
        },
        {
          "id": "after-each-push",
          "name": "Stage 9 right after each push, inside the rewrites, as for GKB2 and GKB",
          "verdict": "declined",
          "why": "It belongs to another system, it holds the next repository's push for probes and feed reads, and the events lag by up to 6 hours, so reads made minutes after a push are mostly not valid.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "anonymous-private",
          "name": "Anonymous probes of the private repositories",
          "verdict": "declined",
          "why": "Every anonymous answer is \"not found\", whatever the repository holds.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #41; its run has not started. It starts once #40, the rewrites, has landed."
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Start once all three repositories hold their stage-8 marker and every branch reads at its rewritten tip, promptly after the last push; the three are measured independently, in any order.",
            "ref": "architecture.md#91-when-it-runs",
            "excerpt": {
              "ref": "architecture.md#91-when-it-runs",
              "heading": "9.1 When it runs",
              "paragraph": "Start condition: all three repositories hold their stage-8 marker, and a read of each shows every branch at its rewritten tip. · Promptly after the last push. The events cover 30 days from each push and can lag by up to 6 hours. A feed read counts only when it lists a current id of the repository. A read that falls before the lag has passed or outside the 30 days is recorded as not valid, never as \"absent\". · The three repositories are independent here: stage 9 runs for each in any order.",
              "hash": "78ee65ce77b3"
            }
          },
          {
            "text": "Probe what GitHub still serves of each old history: authenticated probes for all three repositories and anonymous ones for BotTools only, every batch bracketed by controls and the blob sample bounded at 60.",
            "ref": "architecture.md#92-what-is-measured",
            "excerpt": {
              "ref": "architecture.md#92-what-is-measured",
              "heading": "9.2 What is measured",
              "paragraph": "Sets and controls are the parent's and the GKB2 and GKB unit's: the blob sample is evenly spaced and bounded at 60; a rewritten commit, its tree and one of its blobs, expected served, and an id that exists nowhere, expected absent, bracket every batch; a batch whose opening or closing controls fail is void. · Expected answers. Every old object of the three repositories is still served to an authenticated reader with access, and BotTools' to anyone. An answer that differs from the expectation is a result and is recorded; a status outside a route's answers, a failed control or a void batch …",
              "hash": "7eda70374f74"
            }
          },
          {
            "text": "Read the activity feed and the events twice, at least 6 minutes apart, and record a read made before the events' lag has passed or outside their 30 days as not valid, never as absent.",
            "ref": "architecture.md#91-when-it-runs",
            "excerpt": {
              "ref": "architecture.md#91-when-it-runs",
              "heading": "9.1 When it runs",
              "paragraph": "Start condition: all three repositories hold their stage-8 marker, and a read of each shows every branch at its rewritten tip. · Promptly after the last push. The events cover 30 days from each push and can lag by up to 6 hours. A feed read counts only when it lists a current id of the repository. A read that falls before the lag has passed or outside the 30 days is recorded as not valid, never as \"absent\". · The three repositories are independent here: stage 9 runs for each in any order.",
              "hash": "78ee65ce77b3"
            }
          },
          {
            "text": "Write each repository's report row once, in counts only, BotTools' with its pull-request residual and its webhook delivery count, then the unit's checksum lists; the rewrites' records are checked against theirs and never written.",
            "ref": "architecture.md#93-the-report-rows",
            "excerpt": {
              "ref": "architecture.md#93-the-report-rows",
              "heading": "9.3 The report rows",
              "paragraph": "The record step writes each repository's report row, in counts only, from unit 2's recorded counts and this unit's tallies: the commits before and after; the paths and blobs kept; the manifest's size; the gitleaks results for branches and for every ref, with any default-rule finding by rule id and count; the probe tallies, authenticated and, for BotTools, anonymous; the feed and events membership with each read's validity; for BotTools the pull-request residual and the count of webhook deliveries; and what the probes cannot prove (parent §12.4). The step writes each row once, however often it …",
              "hash": "64414beba025"
            }
          },
          {
            "text": "Write nothing to GitHub; start once the rewrites have landed, ordered before the clone replacement because its reads have a window.",
            "ref": "architecture.md#11-order-gates-and-failure-behaviour",
            "excerpt": {
              "ref": "architecture.md#11-order-gates-and-failure-behaviour",
              "heading": "11. Order, gates and failure behaviour",
              "paragraph": "Units 3 and 4 both wait for unit 2 and for nothing of each other. Unit 3 is ordered first because its reads have a window. · #27 closes when its last unit has landed. #28 stays blocked by #27.",
              "hash": "8d32942b796e"
            }
          }
        ],
        "defense": "The measurement is a system of its own and holds no push back. Run once after the last push, its reads fall inside the events' window, where reads made minutes after each push were mostly not valid. An anonymous probe of a private repository answers \"not found\" whatever it holds, so the private two get authenticated probes only.",
        "tests": [
          "The self-test's quick gate, run again by the unit"
        ],
        "risks": [
          "The measurement runs too early or too late: a read counts only when it lists a current id, anything else is not valid, and the second reads come at least 6 minutes later",
          "The anonymous REST budget runs short: it is read first, a short budget is a wait rather than a stop, and only BotTools spends it",
          "The probes cannot prove that GitHub has dropped the old objects, that cached views are gone or that no third-party copy exists"
        ],
        "source": "architecture.md §9, §11",
        "link": "architecture.md#9-the-residual-measurement"
      }
    },
    {
      "id": "clone-replacement",
      "group": "After the pushes",
      "name": "Replace the TrumpBot clone",
      "system": "clone-realignment",
      "where": "the local TrumpBot clone and its graph",
      "unit": {
        "n": 4,
        "slug": "clone-replacement",
        "title": "Phase 0 · 7.4 — Replace the TrumpBot clone",
        "blockedBy": [
          40
        ],
        "issue": 42
      },
      "gap": {
        "kind": "risk",
        "summary": "The local TrumpBot clone holds TrumpBot's old history. Of the 59 files git does not track in it, 55 are a graph built from the pre-rewrite tree; it sits on another volume than the workspace, so the earlier procedure's move is no rename, and the earlier clone scripts stop on its hooks and exclude entry and archive all 59 files.",
        "evidence": [
          "`architecture.md:128` — 59 untracked or ignored files: 4 under `.idea/`, 55 under the graph's folder",
          "`architecture.md:135` — the clone and the workspace on different volumes",
          "`architecture.md:156` — the earlier clone scripts against the clone as it is today"
        ],
        "source": "architecture.md §2.2, §2.3",
        "link": "architecture.md#22-the-trumpbot-clone-and-the-two-volumes"
      },
      "options": [
        {
          "id": "rename-aside",
          "name": "The old clone renamed aside on its own volume, a fresh clone at the same path with the four `.idea/` files restored, the old clone deleted after the fresh one is read back, then the graph rebuilt from the rewritten tree",
          "verdict": "accepted",
          "why": "The rename is the lock probe and widens access by nobody, the replacement and the deletion are two procedures with the read-back between them, and the graph describes the rewritten tree.",
          "source": "architecture.md §10.1, §10.2, §10.5",
          "link": "architecture.md#10-the-clone-replacement"
        },
        {
          "id": "last-step-of-rewrites",
          "name": "The clone replacement as the last step of the rewrites",
          "verdict": "declined",
          "why": "A stop in the replacement would hold the rewrites' landing and the residual measurement, although neither depends on the clone, and its write is to a checkout, not to GitHub.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "move-into-workspace",
          "name": "Moving the old clone into the workspace",
          "verdict": "declined",
          "why": "The workspace is on another volume, so the move is a copy followed by a deletion: no lock probe, a mostly deleted source when a file is held, and the irreversible step first.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "restricted-folder",
          "name": "A restricted folder on the clone's volume for the old clone",
          "verdict": "declined",
          "why": "A renamed tree keeps its own access entries, and every account may traverse a folder it cannot list, so the folder narrows nothing and adds a folder to remove.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "workspace-deletion",
          "name": "Leaving the old clone's deletion to the workspace's deletion",
          "verdict": "declined",
          "why": "The old clone is outside the workspace, so that deletion never reaches it, and the pre-rewrite objects would outlive this work on the clone's volume.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "carry-graph",
          "name": "Carrying the old clone's graph into the fresh clone",
          "verdict": "declined",
          "why": "The graph was built from the pre-rewrite tree and names files the rewrite removes; a code-only build from the rewritten tree installs the hooks again.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "graph-before-deletion",
          "name": "The graph build before the old clone's deletion",
          "verdict": "declined",
          "why": "The old clone is no fallback for the build, so waiting for it would only keep the pre-rewrite objects outside the workspace for longer.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        },
        {
          "id": "one-step",
          "name": "The replacement and the deletion as one procedure",
          "verdict": "declined",
          "why": "The unit's own read of the fresh clone would come after the irreversible step; two procedures put that read between them.",
          "source": "architecture.md §15",
          "link": "architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #42; its run has not started. It starts once #40, the rewrites, has landed."
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Move the old clone aside by one rename on its own volume, guarded to stay on that volume, the rename doubling as the lock probe and its outcome read from whether each of the two paths exists.",
            "ref": "architecture.md#102-the-move",
            "excerpt": {
              "ref": "architecture.md#102-the-move",
              "heading": "10.2 The move",
              "paragraph": "Where. The old clone is moved aside by one rename on its own volume: `%PROJECTS%\\TrumpBot` becomes `%PROJECTS%\\TrumpBot-old`. A rename refuses with no effect while anything inside is open, which makes it the lock probe, and it keeps the tree's access entries as they are. A move into the workspace would cross volumes, and that is a copy followed by a deletion: no lock probe, and the irreversible step first. · Guards before it: the target is absent; the clone and the target's parent are on the same volume, compared by `stat -c %d`, so that `mv` can never copy; the count of open files is 0; no …",
              "hash": "c47d0978c63d"
            }
          },
          {
            "text": "Carry only the four `.idea/` files, behind a closed-set guard over the 59 files git does not track; the graph built from the pre-rewrite tree, its exclude entry, its two hooks and the two extra configuration keys are not carried.",
            "ref": "architecture.md#103-what-is-carried-and-what-is-not",
            "excerpt": {
              "ref": "architecture.md#103-what-is-carried-and-what-is-not",
              "heading": "10.3 What is carried, and what is not",
              "paragraph": "Carried: the four `.idea/` files, archived with a checksum list behind a closed-set guard over the 59 files git does not track: 4 under `.idea/`, 55 under `graphify-out/`, 0 anywhere else. A file outside the two folders is a stop, because it would be dropped silently. The carried folder and the not-carried folder are policy values. · Not carried: the 55 graph files, the exclude entry, the two hooks and the two extra configuration keys. The graph was built from the pre-rewrite tree, so it describes files the rewrite removes. The hooks and the exclude entry are recorded by name, size and …",
              "hash": "f1073d641e7e"
            }
          },
          {
            "text": "Make a fresh clone at the same path, restore the four files without overwriting, and prove it: its refs equal to the rewritten heads, one pack and a clean `fsck`, every pre-rewrite commit and purged blob missing, and a plain clone's configuration.",
            "ref": "architecture.md#104-the-fresh-clone-its-proofs-and-the-deletion",
            "excerpt": {
              "ref": "architecture.md#104-the-fresh-clone-its-proofs-and-the-deletion",
              "heading": "10.4 The fresh clone, its proofs and the deletion",
              "paragraph": "The fresh clone is made at the same path from TrumpBot's URL, with `gh` as the only credential helper, since the repository is private. · The restore refuses to overwrite. The restored set must equal the four-file list byte for byte, with every checksum matching. · The proofs, made by the procedure and again by the unit before it requests the deletion: · the remote-tracking refs equal `ref-map`'s new column, and `main` equals its remote-tracking branch; · one pack, no loose object, a clean `fsck`; · every pre-rewrite commit of TrumpBot and every manifest blob is missing from the clone; · …",
              "hash": "a381c5062c8a"
            }
          },
          {
            "text": "Delete the old clone at its recorded path as the replacement's last step, only after the unit's own read of the fresh clone; a stop after the rename moves the clone back by the same rename.",
            "ref": "architecture.md#101-shape",
            "excerpt": {
              "ref": "architecture.md#101-shape",
              "heading": "10.1 Shape",
              "paragraph": "The replacement and the deletion are two requests, so that the unit's own read of the fresh clone stands between the last reversible step and the irreversible one. The move back is a third procedure of the same builder, requested only after a stop that follows the rename.",
              "hash": "08fe64fc1ff7"
            }
          },
          {
            "text": "Once the old clone is deleted, rebuild a code-only graph from the rewritten tree, and read the graph and its two hooks back.",
            "ref": "architecture.md#101-shape",
            "excerpt": {
              "ref": "architecture.md#101-shape",
              "heading": "10.1 Shape",
              "paragraph": "The replacement and the deletion are two requests, so that the unit's own read of the fresh clone stands between the last reversible step and the irreversible one. The move back is a third procedure of the same builder, requested only after a stop that follows the rename.",
              "hash": "08fe64fc1ff7"
            }
          },
          {
            "text": "Start once the rewrites have landed and TrumpBot's push is proven; the TrumpBot clone is the one checkout it changes, and this working tree is not touched.",
            "ref": "architecture.md#10-the-clone-replacement",
            "excerpt": {
              "ref": "architecture.md#10-the-clone-replacement",
              "heading": "10. The clone replacement",
              "paragraph": "Unit 4, `clone-replacement`. It runs once TrumpBot's push is proven: TrumpBot holds its stage-8 marker, and the server's heads equal `ref-map`'s new column.",
              "hash": "73e836bdea23"
            }
          }
        ],
        "defense": "A rename on the clone's own volume refuses with no effect while anything inside is open and keeps the tree's access entries, while a move into the workspace would cross volumes: a copy, then a deletion, with the irreversible step first. The graph describes files the rewrite removes, so it is rebuilt rather than carried. The deletion waits for the unit's read of the fresh clone and not for the graph build, so the pre-rewrite objects stay outside the workspace no longer than the replacement needs.",
        "tests": [
          "The self-test's quick gate, run again by the unit"
        ],
        "risks": [
          "Between the move and the deletion the old clone holds every pre-rewrite object of TrumpBot beside the clone, no wider than today's clone; the deletion follows the read-back and does not wait for the graph",
          "A process holds a file inside the clone: the rename refuses and changes nothing, and a bounded retry outlasts a scanner",
          "A cross-volume move by accident: the same-volume and absent-target guards come before the rename, and the outcome is read from the two paths",
          "The fresh clone carries more or less than intended: the closed-set guard over the 59 files, the restored set compared with the four-file list, and the exact-set proofs of keys, hooks and excludes",
          "The graph build does not run, or leaves another footprint: the replacement stands without it, and the read-back records what it left"
        ],
        "source": "architecture.md §10, §16",
        "link": "architecture.md#10-the-clone-replacement"
      }
    }
  ],
  "impact": {
    "basis": "plan",
    "summary": "No module is published and no version moves: every landing of #27 and its units carries documents and generated boards only. BotTools, which is public, and TrumpBot and Support, which are private, are force-pushed in place, one atomic push each: every commit id changes, the purged files leave every commit, and each keeps its visibility and default branch. BotTools' pull-request refs keep its 39 purged blobs fetchable, and the TrumpBot clone on this machine is replaced by a fresh one.",
    "none": null,
    "release": {
      "bump": "none",
      "version": null,
      "note": "a tracking plan moves no version, and no unit publishes a module",
      "nothingPublished": true
    },
    "downstream": [
      {
        "who": "BotTools', TrumpBot's and Support's histories",
        "kind": "repository",
        "system": null,
        "effect": "breaking",
        "summary": "Every commit id changes, as every root commit holds a purged path: BotTools' 16 commits become 15, TrumpBot's 11 become 9 and Support's 2 become 1. The files under the purged paths leave every commit, the tips' trees included, and every branch changes: BotTools' and TrumpBot's two and Support's one. No issue, pull request, comment, label, setting or webhook is changed, and nothing is deleted.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "What GitHub still serves",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "GitHub keeps serving every pre-rewrite object by id. BotTools' pull-request refs keep 13 old commits and all 39 purged blobs fetchable, and its two pull requests keep showing their pre-rewrite commits; BotTools was public before, so this exposure is not new. TrumpBot's and Support's old objects stay readable to signed-in readers with access, and to nobody anonymously.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Activity, events and BotTools' webhook",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "Each rewritten branch adds one force-push entry to its repository's activity feed, whose `before` is a pre-rewrite tip, and one event. BotTools' webhook, to a CircleCI host, receives one push delivery per branch, 2 in all, recorded by count; it stays as it is.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Clones taken before the pushes",
        "kind": "consumer",
        "system": null,
        "effect": "breaking",
        "summary": "They keep the old histories, and their branches share no commit with the server's afterwards. None of the three repositories has a fork, and the one known clone on this machine, TrumpBot's, is replaced.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "The TrumpBot clone",
        "kind": "operator",
        "system": "clone-realignment",
        "effect": "behaviour",
        "summary": "Replaced by a fresh clone at the same path that keeps its four `.idea/` files. The old code knowledge graph, built from the pre-rewrite tree, goes with the old clone, with its exclude entry, its two hooks and two extra configuration keys; a code-only graph of the rewritten tree is built afterwards. Until its deletion the old clone sits beside it on the same volume, outside the workspace, holding TrumpBot's pre-rewrite objects.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The workspace and the data folder",
        "kind": "operator",
        "system": "toolchain",
        "effect": "additive",
        "summary": "A second tool folder beside the GKB2 and GKB unit's, which stays as it ran; the three mirrors rewritten beside their untouched backups, a fresh mirror of each, and each repository's records and report row in the data folder. They hold pre-rewrite ids and paths and are never committed.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "This repository's documents",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "The phase design and the phase consequences take 20 and 5 dated notes with this design's landing, the GKB2 and GKB unit's consequences one per gap and follow-up the tools unit closes, and the registry of systems the four units in place of unit 7. No legacy repository receives a commit.",
        "link": "consequences.md#23-documents-and-generated-boards"
      }
    ],
    "adaptation": [
      {
        "who": "The rewrite pipeline's push",
        "system": "rewrite-pipeline",
        "need": "required",
        "summary": "For these three repositories, every branch goes in one atomic push with an explicit lease on its recorded tip, after a dry run, and after every non-zero status a read-back of every branch names the state: neither, both or partial. The GKB2 and GKB unit's one-branch push is its case of one branch.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "The residual measurement",
        "system": "residual-exposure",
        "need": "required",
        "summary": "For these three repositories it runs as its own unit after the last push, within the events' window, not right after each push.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "Moving a clone aside",
        "system": "clone-realignment",
        "need": "required",
        "summary": "A clone is moved aside by a rename on its own volume, guarded to stay on that volume, its outcome read from whether each of the two paths exists. This replaces a move into the workspace, which on this machine crosses volumes.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "The earlier tools",
        "system": "toolchain",
        "need": "none",
        "summary": "The GKB2 and GKB unit's folder is kept as it ran and never saved again, the preparation unit's clone scripts are replaced by the clone set and never run, and the two workspace scripts that pin the earlier scan configuration stay unrun. A further repository is a row of the parameter table.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "#28, the residual report and cleanup",
        "system": null,
        "need": "required",
        "summary": "Stays blocked by #27, and takes the three report rows with BotTools' pull-request residual and webhook delivery count, the residual records, every unit's records with their checksum lists, any default-rule finding by rule id and count, both tool folders and the stage runner to copy, and the record that no old-clone path remains, whose path its cleanup confirms absent.",
        "link": "consequences.md#4-units-and-neighbouring-issues"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md",
    "link": "consequences.md#2-blast-radius",
    "units": [
      {
        "unit": "workspace-tools",
        "basis": "as-built",
        "summary": "As built, no module is published and no version moves; the landing carries documents and generated boards only. Nothing was written to GitHub, where the three repositories were only read, and no repository or checkout changed: the unit saved a second tool folder, `tools/g27/`, beside the GKB2 and GKB unit's, which equals its pins before and after, proved it by its self-test and one read of the three repositories, and closed every gap and follow-up that unit recorded for this work, each with a dated note there. #40, #41 and #42 run its rewrite, residual and clone sets; #28 copies both folders and the stage runner at cleanup.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "39-workspace-tools/consequences.md §1 to §6, reconciled with the build; 39-workspace-tools/final-implementation.md",
        "link": "39-workspace-tools/consequences.md#3-adoption"
      },
      {
        "unit": "rewrites",
        "basis": "as-built",
        "summary": "As built, no module is published and no version moves; the landing carries documents and generated boards only. Three force-pushes, each one atomic push under a lease on every branch's recorded tip, rewrote BotTools (public), then TrumpBot and Support (private), five branches in all, 16 commits to 15, 11 to 9 and 2 to 1, each landing whole; nothing else on GitHub was written. BotTools' two pull-request refs keep its old history fetchable, counted and not removed, and its webhook took one push delivery per branch, counted once. The request service ran BotTools' refused first call again with no restart once its allow line was in place. #41 and #42 start from this unit's records and stage-8 markers, and #28 takes its records with their checksum lists.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "40-rewrites/consequences.md §1 to §6, reconciled with the build; 40-rewrites/final-implementation.md",
        "link": "40-rewrites/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "Three allow lines, one per push, went into the request service's global settings file at once, and the service ran BotTools' refused request again with no restart.",
            "why": "Once the line was in the file the running service reads, it applied it; the later pushes met their lines already in place and neither was refused.",
            "when": "#40 landing",
            "ref": "40-rewrites/final-implementation.md#4-deviations-from-the-plan"
          },
          {
            "what": "The time recorded for each push, which the residual measurement takes, is the time the push was classed.",
            "why": "The tool writes it when it classes the push as pushed, the first moment the unit knows the push landed; the residual measurement compares it with the events' window in whole days, so the difference changes nothing there.",
            "when": "#40 landing",
            "ref": "40-rewrites/final-implementation.md#4-deviations-from-the-plan"
          },
          {
            "what": "No default-rule finding is handed on to the residual report and cleanup.",
            "why": "None arose in BotTools, TrumpBot or Support, before a push or on a fresh mirror.",
            "when": "#40 landing",
            "ref": "40-rewrites/consequences.md#6-follow-ups"
          },
          {
            "what": "This design took dated notes on its §2.4 and §12, which the clone replacement takes for its own requests.",
            "why": "The build showed an allow line takes effect without a restart.",
            "when": "#40 landing",
            "ref": "40-rewrites/consequences.md#4-sibling-units-and-neighbouring-issues"
          }
        ]
      },
      {
        "unit": "residual-measurement",
        "basis": "plan",
        "summary": "As planned, no module is published and no version moves; the landing carries documents and generated boards only. The unit reads what GitHub still serves of the three old histories, authenticated for all three and anonymously for BotTools alone, each repository once its events list its push or 6 hours have passed, and writes nothing to GitHub and removes nothing. On this machine it adds new records beside the earlier ones in the workspace and the data folder; #28 takes the three report rows with their checksum lists.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "41-residual-measurement/consequences.md §1 to §6; 41-residual-measurement/plan.md",
        "link": "41-residual-measurement/consequences.md#2-blast-radius"
      }
    ],
    "changes": [
      {
        "unit": "workspace-tools",
        "when": "#39 landing",
        "none": true,
        "why": "The second tool folder, the earlier folder left at its pins and the dated notes on the GKB2 and GKB unit's consequences landed as the initiative's impact records them; its read of BotTools also showed the webhook deliveries list readable, which answers a known gap of the design.",
        "ref": "39-workspace-tools/consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "unit": "rewrites",
        "when": "#40 landing",
        "none": true,
        "why": "The three force-pushes landed as the initiative's impact records them: 16 commits to 15, 11 to 9 and 2 to 1, BotTools' pull-request refs keeping 13 old commits and its 39 purged blobs fetchable, and two push deliveries to its webhook. That an allow line takes effect without a restart changes this design's procedure for the clone replacement, in dated notes on §2.4 and §12, not the initiative's impact.",
        "ref": "40-rewrites/consequences.md#4-sibling-units-and-neighbouring-issues"
      }
    ]
  },
  "tests": null,
  "roadmap": {
    "issue": 2,
    "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
    "asOf": "2026-11-13",
    "items": [
      {
        "issue": 21,
        "title": "Phase 0 · 1 — Preparation: pinned tools, workspace, backup mirrors, legacy data copy and manifests",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 22,
        "title": "Phase 0 · 2 — Transfer rehearsal on two throwaway repositories",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 23,
        "title": "Phase 0 · 3 — KotlinBottools: rewrite with path scrub, fresh repository, number-preserving swap and clone realignment",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 24,
        "title": "Phase 0 · 4 — KotlinBottools repository hygiene: .gitignore, gitleaks configuration and CI, README and CHANGELOG",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 25,
        "title": "Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 26,
        "title": "Phase 0 · 6 — Rewrite GKB2 and GKB",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 27,
        "title": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
        "state": "OPEN"
      },
      {
        "issue": 28,
        "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
        "state": "OPEN"
      }
    ]
  },
  "followUps": [],
  "documents": [
    {
      "label": "Research",
      "path": "research/README.md",
      "note": "three questions, the verification of their 32 load-bearing claims at source, the summary and where the sources disagreed; findings in `two-branch-lease-push.md`, `clone-move-aside-on-windows.md`, `tool-changes-for-three-repositories.md`"
    },
    {
      "label": "Architecture",
      "path": "architecture.md",
      "note": "the systems design, final: the four parts and their systems, the seams between them, the order and gates, the alternatives weighed (§15), the four units (§16) and the dated notes on the phase documents (§13.1)"
    },
    {
      "label": "Consequences",
      "path": "consequences.md",
      "note": "what the whole work does to its surroundings and leaves behind: the blast radius, adoption, the units and neighbouring issues, the known gaps and the follow-ups"
    }
  ],
  "notes": {
    "corrections": [
      {
        "what": "The function said the unit spans three systems; the signed-off design has four parts, each inside one system, the toolchain included (architecture.md §5), so it now names four.",
        "when": "2026-11-13, after the architecture's sign-off"
      }
    ]
  },
  "links": {
    "workBoard": "../../../index.html",
    "repoBoard": "../../../../dashboards/index.html"
  }
}
);
