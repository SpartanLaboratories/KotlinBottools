/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 27,
  "slug": "27-rewrite-bottools-and-the-private-repositories",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/27-rewrite-bottools-and-the-private-repositories",
  "kind": "tracking",
  "title": "Rewrite BotTools and the private repositories",
  "issueTitle": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
  "function": "BotTools, which is public, and the private repositories still hold in their histories the files the phase purges: 39 purged blobs in BotTools, all of them also reachable through its pull-request refs, 199 in the first private repository and 7,259 in the second. The local private repository clone still holds the first private repository's old history. The unit takes each repository through the rewrite pipeline as GKB2 and GKB were taken, BotTools first, then the first private repository, then the second: the purge with its checks before and after, the force-push with its per-ref verification, the exit tests on a fresh mirror and the residual probes, with BotTools' pull-request residual counted. Once the first private repository's push is proven, the clone is replaced by a fresh one at the same path, its four untracked files kept. The unit spans four systems, the toolchain, the rewrite pipeline, the residual-exposure measurement and the clone realignment, so this run designs it and splits it into units; nothing is rewritten, pushed or replaced in this run. Unit 7 of #2, with no version moved; the three repositories keep their visibility.",
  "status": "built",
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
  "asBuilt": {
    "sha": "053288047b6410bf22fca990cafc17d55051bf6d",
    "merge": "053288047b6410bf22fca990cafc17d55051bf6d",
    "pr": 48,
    "date": "2026-11-16",
    "at": "2026-11-16T20:36:53Z"
  },
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
    "step": "landed",
    "since": "2026-11-16T20:36:53Z",
    "updated": "2026-11-16T20:36:53Z",
    "detail": "Landed: 4 of 4 units, the last #42 in PR #48.",
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
    "current": [],
    "questions": [],
    "research": null,
    "interview": [
      {
        "text": "Should each part of the unit stay inside one of the registry's systems, or may a rewrite part also extend the tools it runs and measure its own repository's residual, as the GKB2 and GKB unit did?",
        "options": [
          "Size them as the GKB2 and GKB unit was sized: each rewrite runs stages 1 to 9 for its repository and extends the tools it needs; only the clone replacement stands apart",
          "One registry system each: the tool work is its own part with no GitHub write, the rewrites stop at stage 8, one residual part probes all three repositories after the last push, and the clone replacement is its own part"
        ],
        "answer": "Each part stays inside one system: the tools part extends the workspace tools before any push, with no write to GitHub; the rewrites run stages 1 to 8 for each repository, with BotTools' pull-request residual counted on its fresh mirror; one residual measurement runs stage 9 over all three repositories once the last push is verified; and the clone replacement is its own part, once the first private repository's push is proven.",
        "asked": "2026-11-13T18:24:56Z",
        "answered": "2026-11-13T18:25:46Z"
      },
      {
        "text": "What of the old private repository clone's local state should the fresh clone keep? Besides the four files under .idea/ the clone now holds a knowledge graph built from the pre-rewrite tree, its exclude entry, two graph hooks and two local config keys.",
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
      "name": "landed",
      "at": "2026-11-16T20:36:53Z",
      "note": "#42, its last unit, landed in PR #48"
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
          "detail": "Unit 7 of the history rewrite: BotTools and the private repositories are rewritten and force-pushed as GKB2 and GKB were, BotTools' pull-request residual is measured, and the local private repository clone is replaced. The unit touches three systems, so this run designs it and splits it into units; nothing is built or pushed in this run. Next: the design, starting with the questions on intent.",
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
          "detail": "Research complete: 31 of the 32 claims hold at source and the one that fails was a wrong file citation for behaviour that holds. Each repository is pushed in one request as one atomic push with an explicit lease on every branch, after a dry run. The old private repository clone is moved aside by a rename on its own volume and deleted last. The tools are rebuilt in a new folder, and the earlier folder stays as it ran. Next: the grand design and its units."
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
      ],
      "implementation": [
        {
          "since": "2026-11-13T21:05:13Z",
          "ended": "2026-11-16T20:36:53Z",
          "endedBy": "landed",
          "to": "landed",
          "event": {
            "name": "sub-issues-filed",
            "at": "2026-11-13T20:42:32Z",
            "note": "final: filing done"
          },
          "detail": "4 of 4 units landed."
        }
      ]
    },
    "next": null,
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
      "note": "three questions, each with its findings file; 31 of the 32 load-bearing claims hold at their sources, and the one that fails is a wrong file citation for behaviour that holds, so no recommendation changes. Each repository's branches go in one atomic push with an explicit lease on every branch, after a dry run of the same line, and a read-back of every branch names the server's state after any failure; the old private repository clone is moved aside by one rename on its own volume, the fresh clone keeps the four `.idea/` files and the old clone is deleted last; the tools are rebuilt in a new folder, the earlier folder kept as it ran, with every recorded gap closed before the first push and four further gaps found that would stop a run. Where the sources disagreed, BotTools' webhook deliveries are counted once, right after its push, and the residual measurement follows the last push promptly"
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
    },
    {
      "column": "built",
      "label": "Merged",
      "date": "2026-11-16",
      "ref": "PR #48",
      "note": "merged as 0532880"
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
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "#41 landed"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "#42 started"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "#42 landed"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Landed: every unit, the last #42 in PR #48, merge 0532880",
      "ref": "PR #48"
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
        "title": "Phase 0 · 7.1 — Extend the workspace tools for BotTools and the private repositories",
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
      "name": "Rewrite BotTools and the private repositories",
      "system": "rewrite-pipeline",
      "where": "BotTools, public · the private repositories",
      "unit": {
        "n": 2,
        "slug": "rewrites",
        "title": "Phase 0 · 7.2 — Rewrite BotTools and the private repositories",
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
        "summary": "BotTools and the private repositories still carry purged paths in their histories. They hold 39, 199 and 7,259 purged blobs; BotTools is public and has two branches, the first private repository two and the second one, and every branch changes in the rewrite.",
        "evidence": [
          "`architecture.md:101` — BotTools public, and the private repositories",
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
          "name": "Stages 1 to 8 for BotTools, then the first private repository, then the second in one unit, each repository pushed in one atomic push with an explicit lease on every branch, after a dry run",
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
        "summary": "#40 landed through PR #45 as 9170254. It rewrote BotTools, then the private repositories, each by one atomic push under a lease on every branch's recorded tip, five branches in all, 16 commits to 15, 11 to 9 and 2 to 1; BotTools' push ran on its second attempt, after the request service's own check refused the first before anything ran. Each push was classed as pushed and read back at every branch, and each fresh mirror is clean with every count equal to its expectation; BotTools' pull-request residual (39 purged blobs) and its two webhook deliveries are counted, no default-rule finding arose, and the unit's records carry their checksum lists. #41 and #42 start from its records and stage-8 markers."
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Run stages 1 to 8 for BotTools, then the first private repository, then the second, each repository starting only when the one before it holds its stage-8 marker; BotTools goes first, with the only push that push protection for users applies to.",
            "ref": "architecture.md#81-shape",
            "excerpt": {
              "ref": "architecture.md#81-shape",
              "heading": "8.1 Shape",
              "paragraph": "Order. BotTools, the first private repository, the second, as the parent design orders them. A repository's stage 1 starts only when the previous repository holds its stage-8 marker. BotTools goes first with the only push that GitHub's push protection for users applies to and the first atomic push of two leases, so what GitHub's receive path does with either is known before a private repository is pushed. · Stages 1 to 5 are the parent's: the list proof and the pre-run checks, the positive control on the untouched backup, the one invocation, the post-run checks with the scan before the push, …",
              "hash": "84a64f808528"
            }
          },
          {
            "text": "Push each repository once: every branch in one atomic push, each under an explicit lease on the tip the mirror clone recorded, after a dry run of the same line; two branches for BotTools, two for the first private repository and one for the second.",
            "ref": "architecture.md#81-shape",
            "excerpt": {
              "ref": "architecture.md#81-shape",
              "heading": "8.1 Shape",
              "paragraph": "Order. BotTools, the first private repository, the second, as the parent design orders them. A repository's stage 1 starts only when the previous repository holds its stage-8 marker. BotTools goes first with the only push that GitHub's push protection for users applies to and the first atomic push of two leases, so what GitHub's receive path does with either is known before a private repository is pushed. · Stages 1 to 5 are the parent's: the list proof and the pre-run checks, the positive control on the untouched backup, the one invocation, the post-run checks with the scan before the push, …",
              "hash": "84a64f808528"
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
              "paragraph": "Order. BotTools, the first private repository, the second, as the parent design orders them. A repository's stage 1 starts only when the previous repository holds its stage-8 marker. BotTools goes first with the only push that GitHub's push protection for users applies to and the first atomic push of two leases, so what GitHub's receive path does with either is known before a private repository is pushed. · Stages 1 to 5 are the parent's: the list proof and the pre-run checks, the positive control on the untouched backup, the one invocation, the post-run checks with the scan before the push, …",
              "hash": "84a64f808528"
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
              "hash": "639122db0eba"
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
          "A long scan or rewrite on the second private repository is interrupted: every step has its own marker, and a repository restarts from a reset mirror before its push"
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
        "title": "Phase 0 · 7.3 — Measure what GitHub still serves of BotTools and the private repositories",
        "blockedBy": [
          40
        ],
        "issue": 41,
        "board": "41-residual-measurement/dashboard.html",
        "folder": "41-residual-measurement/",
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
        },
        "landing": {
          "pr": 46,
          "merge": "f11f7abecdc68f1153e5904c325ff6bfb0709ea0"
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
        "state": "landed",
        "summary": "#41 landed through PR #46 as f11f7ab. It read what GitHub still serves of the three old histories, authenticated for all three and anonymously for BotTools alone, each repository once 6 hours had passed since its push, as no repository's events listed every push it made within them. Every old object probed is still served, no answer differed from the expectation, and nothing was written to GitHub. Each repository's report row, of 31, 16 and 16 lines, and the unit's records carry their checksum lists; #28 takes them."
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
              "hash": "ffeb6b83b7fc"
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
              "hash": "639122db0eba"
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
      "name": "Replace the private repository clone",
      "system": "clone-realignment",
      "where": "the local private repository clone and its graph",
      "unit": {
        "n": 4,
        "slug": "clone-replacement",
        "title": "Phase 0 · 7.4 — Replace the private repository clone",
        "blockedBy": [
          40
        ],
        "issue": 42,
        "board": "42-clone-replacement/dashboard.html",
        "folder": "42-clone-replacement/",
        "tests": {
          "updated": "2026-11-16T20:03:47Z",
          "added": [],
          "amended": [],
          "relevant": [
            {
              "class": "s0-ready tools",
              "module": "workspace tools",
              "testSet": "gating",
              "tests": 96,
              "result": {
                "state": "passed",
                "passed": 96,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:50:17Z"
              }
            },
            {
              "class": "s0-ready pins",
              "module": "workspace tools",
              "testSet": "gating",
              "tests": 7,
              "result": {
                "state": "passed",
                "passed": 7,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T06:05:39Z"
              }
            },
            {
              "class": "S0.records",
              "module": "workspace tools",
              "testSet": "gating",
              "tests": 7,
              "result": {
                "state": "passed",
                "passed": 7,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T06:05:39Z"
              }
            },
            {
              "class": "s0-ready grant",
              "module": "workspace tools",
              "testSet": "gating",
              "tests": 11,
              "result": {
                "state": "passed",
                "passed": 11,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T06:05:39Z"
              }
            },
            {
              "class": "gselftest deterministic",
              "module": "workspace tools",
              "testSet": "deterministic",
              "tests": 63,
              "result": {
                "state": "passed",
                "passed": 63,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T06:05:39Z"
              }
            },
            {
              "class": "k1-clone checks",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 17,
              "result": {
                "state": "passed",
                "passed": 17,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T06:05:39Z"
              }
            },
            {
              "class": "k1-clone census",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 7,
              "result": {
                "state": "passed",
                "passed": 7,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T06:05:39Z"
              }
            },
            {
              "class": "replace-clone procedure (8 entries)",
              "module": "workspace tools",
              "testSet": "e2e",
              "tests": 8,
              "result": {
                "state": "passed",
                "passed": 8,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:30:35Z"
              }
            },
            {
              "class": "k1-clone proofs",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 18,
              "result": {
                "state": "passed",
                "passed": 18,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:30:35Z"
              }
            },
            {
              "class": "S1.carried",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 4,
              "result": {
                "state": "passed",
                "passed": 4,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:30:35Z"
              }
            },
            {
              "class": "k1-clone census aside",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 6,
              "result": {
                "state": "passed",
                "passed": 6,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:30:35Z"
              }
            },
            {
              "class": "replace-clone deletion procedure (3 entries)",
              "module": "workspace tools",
              "testSet": "e2e",
              "tests": 3,
              "result": {
                "state": "passed",
                "passed": 3,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:36:57Z"
              }
            },
            {
              "class": "k1-clone gone",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 2,
              "result": {
                "state": "passed",
                "passed": 2,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:36:57Z"
              }
            },
            {
              "class": "S3.wait",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 1,
              "result": {
                "state": "passed",
                "passed": 1,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:47:54Z"
              }
            },
            {
              "class": "k1-clone graph",
              "module": "workspace tools",
              "testSet": "integration",
              "tests": 9,
              "result": {
                "state": "passed",
                "passed": 9,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:47:54Z"
              }
            },
            {
              "class": "S4.records",
              "module": "workspace tools",
              "testSet": "gating",
              "tests": 5,
              "result": {
                "state": "passed",
                "passed": 5,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:50:17Z"
              }
            },
            {
              "class": "S4.g26",
              "module": "workspace tools",
              "testSet": "gating",
              "tests": 3,
              "result": {
                "state": "passed",
                "passed": 3,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:50:17Z"
              }
            },
            {
              "class": "S4.outputs",
              "module": "workspace tools",
              "testSet": "nonfunctional",
              "tests": 4,
              "result": {
                "state": "passed",
                "passed": 4,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T19:50:17Z"
              }
            },
            {
              "class": "gselftest.sh deterministic",
              "module": "tools/g27",
              "tests": 63,
              "result": {
                "state": "passed",
                "passed": 63,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-16T20:03:47Z"
              }
            }
          ]
        },
        "landing": {
          "pr": 48,
          "merge": "053288047b6410bf22fca990cafc17d55051bf6d"
        }
      },
      "gap": {
        "kind": "risk",
        "summary": "The local private repository clone holds the first private repository's old history. Of the 59 files git does not track in it, 55 are a graph built from the pre-rewrite tree; it sits on another volume than the workspace, so the earlier procedure's move is no rename, and the earlier clone scripts stop on its hooks and exclude entry and archive all 59 files.",
        "evidence": [
          "`architecture.md:128` — 59 untracked or ignored files: 4 under `.idea/`, 55 under the graph's folder",
          "`architecture.md:135` — the clone and the workspace on different volumes",
          "`architecture.md:156` — the earlier clone scripts against the clone as it is today"
        ],
        "source": "architecture.md §2.2, §2.3",
        "link": "architecture.md#22-the-private-repository-clone-and-the-two-volumes"
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
        "state": "landed",
        "summary": "#42 landed through PR #48 as 0532880. It replaced the private repository clone with a fresh clone of the rewritten repository at the same path, by two requests under the unit's own grant, its four `.idea/` files restored and equal to their checksums; the old clone stood aside on its own volume for about ten minutes and was deleted at its recorded path, so no old-clone path remains and no pre-rewrite commit or purged blob is reachable from the fresh clone. The graph was rebuilt from the rewritten tree, code-only, and read back with its two hooks. One issue, #47, was filed against the tools' request builder and changed no outcome; #28 takes the record that no old-clone path remains."
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
              "paragraph": "Where. The old clone is moved aside by one rename on its own volume: `%PROJECTS%\\…` becomes `%PROJECTS%\\…-old`. A rename refuses with no effect while anything inside is open, which makes it the lock probe, and it keeps the tree's access entries as they are. A move into the workspace would cross volumes, and that is a copy followed by a deletion: no lock probe, and the irreversible step first. · Guards before it: the target is absent; the clone and the target's parent are on the same volume, compared by `stat -c %d`, so that `mv` can never copy; the count of open files is 0; no git process …",
              "hash": "9f7e00fc082c"
            }
          },
          {
            "text": "Carry only the four `.idea/` files, behind a closed-set guard over the 59 files git does not track; the graph built from the pre-rewrite tree, its exclude entry, its two hooks and the two extra configuration keys are not carried.",
            "ref": "architecture.md#103-what-is-carried-and-what-is-not",
            "excerpt": {
              "ref": "architecture.md#103-what-is-carried-and-what-is-not",
              "heading": "10.3 What is carried, and what is not",
              "paragraph": "Carried: the four `.idea/` files, archived with a checksum list behind a closed-set guard over the 59 files git does not track: 4 under `.idea/`, 55 under `graphify-out/`, 0 anywhere else. A file outside the two folders is a stop, because it would be dropped silently. The carried folder and the not-carried folder are policy values. · Not carried: the 55 graph files, the exclude entry, the two hooks and the two extra configuration keys. The graph was built from the pre-rewrite tree, so it describes files the rewrite removes. The hooks and the exclude entry are recorded by name, size and …",
              "hash": "ec1624f7e0db"
            }
          },
          {
            "text": "Make a fresh clone at the same path, restore the four files without overwriting, and prove it: its refs equal to the rewritten heads, one pack and a clean `fsck`, every pre-rewrite commit and purged blob missing, and a plain clone's configuration.",
            "ref": "architecture.md#104-the-fresh-clone-its-proofs-and-the-deletion",
            "excerpt": {
              "ref": "architecture.md#104-the-fresh-clone-its-proofs-and-the-deletion",
              "heading": "10.4 The fresh clone, its proofs and the deletion",
              "paragraph": "The fresh clone is made at the same path from the first private repository's URL, with `gh` as the only credential helper, since the repository is private. · The restore refuses to overwrite. The restored set must equal the four-file list byte for byte, with every checksum matching. · The proofs, made by the procedure and again by the unit before it requests the deletion: · the remote-tracking refs equal `ref-map`'s new column, and `main` equals its remote-tracking branch; · one pack, no loose object, a clean `fsck`; · every pre-rewrite commit of the first private repository and every …",
              "hash": "c5fa21446f76"
            }
          },
          {
            "text": "Delete the old clone at its recorded path as the replacement's last step, only after the unit's own read of the fresh clone; a stop after the rename moves the clone back by the same rename.",
            "ref": "architecture.md#101-shape",
            "excerpt": {
              "ref": "architecture.md#101-shape",
              "heading": "10.1 Shape",
              "paragraph": "The replacement and the deletion are two requests, so that the unit's own read of the fresh clone stands between the last reversible step and the irreversible one. The move back is a third procedure of the same builder, requested only after a stop that follows the rename.",
              "hash": "c5a88d1e66d7"
            }
          },
          {
            "text": "Once the old clone is deleted, rebuild a code-only graph from the rewritten tree, and read the graph and its two hooks back.",
            "ref": "architecture.md#101-shape",
            "excerpt": {
              "ref": "architecture.md#101-shape",
              "heading": "10.1 Shape",
              "paragraph": "The replacement and the deletion are two requests, so that the unit's own read of the fresh clone stands between the last reversible step and the irreversible one. The move back is a third procedure of the same builder, requested only after a stop that follows the rename.",
              "hash": "c5a88d1e66d7"
            }
          },
          {
            "text": "Start once the rewrites have landed and the first private repository's push is proven; the private repository clone is the one checkout it changes, and this working tree is not touched.",
            "ref": "architecture.md#10-the-clone-replacement",
            "excerpt": {
              "ref": "architecture.md#10-the-clone-replacement",
              "heading": "10. The clone replacement",
              "paragraph": "Unit 4, `clone-replacement`. It runs once the first private repository's push is proven: the first private repository holds its stage-8 marker, and the server's heads equal `ref-map`'s new column.",
              "hash": "f3690d164512"
            }
          }
        ],
        "defense": "A rename on the clone's own volume refuses with no effect while anything inside is open and keeps the tree's access entries, while a move into the workspace would cross volumes: a copy, then a deletion, with the irreversible step first. The graph describes files the rewrite removes, so it is rebuilt rather than carried. The deletion waits for the unit's read of the fresh clone and not for the graph build, so the pre-rewrite objects stay outside the workspace no longer than the replacement needs.",
        "tests": [
          "The self-test's quick gate, run again by the unit"
        ],
        "risks": [
          "Between the move and the deletion the old clone holds every pre-rewrite object of the first private repository beside the clone, no wider than today's clone; the deletion follows the read-back and does not wait for the graph",
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
    "basis": "as-built",
    "summary": "As built, no module is published and no version moves: every landing of #27 and its units carried documents and generated boards only. BotTools, which is public, and the private repositories were force-pushed in place, one atomic push each: every commit id changed, the purged files left every commit, and each kept its visibility and default branch. BotTools' pull-request refs keep its 39 purged blobs fetchable, the events listed 1 of the 5 branch pushes, and the private repository clone on this machine was replaced by a fresh clone, the old one deleted; #47 stays open against the tools.",
    "none": null,
    "release": {
      "bump": "none",
      "version": null,
      "note": "a tracking plan moves no version, and no unit publishes a module",
      "nothingPublished": true
    },
    "downstream": [
      {
        "who": "BotTools' and the private repositories' histories",
        "kind": "repository",
        "system": null,
        "effect": "breaking",
        "summary": "Every commit id changes, as every root commit holds a purged path: BotTools' 16 commits become 15, the first private repository's 11 become 9 and the second's 2 become 1. The files under the purged paths leave every commit, the tips' trees included, and every branch changes: BotTools' and the first private repository's two and the second's one. No issue, pull request, comment, label, setting or webhook is changed, and nothing is deleted.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "What GitHub still serves",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "GitHub keeps serving every pre-rewrite object by id. BotTools' pull-request refs keep 13 old commits and all 39 purged blobs fetchable, and its two pull requests keep showing their pre-rewrite commits; BotTools was public before, so this exposure is not new. The private repositories' old objects stay readable to signed-in readers with access, and to nobody anonymously.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Activity, events and BotTools' webhook",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "Each rewritten branch added one force-push entry to its repository's activity feed, whose `before` is a pre-rewrite tip, and every activity feed lists them. The events, after 6 hours, listed the push of 1 of BotTools' 2 branches and none of the first private repository's 2 or the second's 1; whether GitHub lists the others later is not established. BotTools' webhook, to a CircleCI host, received one push delivery per branch, 2 in all, recorded by count; it stays as it is.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Clones taken before the pushes",
        "kind": "consumer",
        "system": null,
        "effect": "breaking",
        "summary": "They keep the old histories, and their branches share no commit with the server's afterwards. None of the three repositories has a fork, and the one known clone on this machine, the first private repository's, was replaced.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "The private repository clone",
        "kind": "operator",
        "system": "clone-realignment",
        "effect": "behaviour",
        "summary": "Replaced by a fresh clone of the rewritten repository at the same path, its four `.idea/` files restored and equal to their checksums. The old code knowledge graph, built from the pre-rewrite tree, went with the old clone, with its two exclude entries, its two hooks and two extra configuration keys; the graph service's board files' ignore, part of a graph's footprint, was taken out before the census and not carried. A code-only graph of the rewritten tree was built afterwards, with its two hooks, its exclude entry and the ignore with its own entry. The old clone stood aside on the same volume, outside the workspace, for about ten minutes, and was deleted at its recorded path; no old-clone path remains.",
        "link": "42-clone-replacement/consequences.md#22-this-machine"
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
      },
      {
        "who": "#47 on KotlinBottools' tracker",
        "kind": "repository",
        "system": "clone-realignment",
        "effect": "additive",
        "summary": "One issue filed against the workspace tools: the clone set's request builder writes the replacement's check sentences into every kind of request. It changed no outcome, the tool folder stays at its pins, and it stays open outside #27's units; #27's closing does not wait on it.",
        "link": "42-clone-replacement/consequences.md#21-github"
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
    "source": "consequences.md §1 to §6, reconciled with the four units' as-built records",
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
        "summary": "As built, no module is published and no version moves; the landing carries documents and generated boards only. Three force-pushes, each one atomic push under a lease on every branch's recorded tip, rewrote BotTools (public), then the private repositories, five branches in all, 16 commits to 15, 11 to 9 and 2 to 1, each landing whole; nothing else on GitHub was written. BotTools' two pull-request refs keep its old history fetchable, counted and not removed, and its webhook took one push delivery per branch, counted once. The request service ran BotTools' refused first call again with no restart once its allow line was in place. #41 and #42 start from this unit's records and stage-8 markers, and #28 takes its records with their checksum lists.",
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
            "why": "None arose in BotTools or either private repository, before a push or on a fresh mirror.",
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
        "basis": "as-built",
        "summary": "As built, no module is published and no version moves; the landing carries documents and generated boards only. The unit read what GitHub still serves of the three old histories, authenticated for all three and anonymously for BotTools alone, each repository once 6 hours had passed since its push, and wrote nothing to GitHub and removed nothing: every old object probed is still served. On this machine it added new records beside the earlier ones in the workspace and the data folder; #28 takes the three report rows, of 31, 16 and 16 lines, with their checksum lists.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "41-residual-measurement/consequences.md §1 to §6, reconciled with the build; 41-residual-measurement/final-implementation.md",
        "link": "41-residual-measurement/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "The landing also carries a note in the verification results of this design's research, and this design takes no dated note.",
            "why": "The push findings expected one push event per rewritten branch within the events' documented lag of up to 6 hours, and after the 6 hours the events listed 1 of BotTools' 2 pushes and none of the first private repository's 2 or the second's 1; the measurement ran as this design's §9 describes.",
            "when": "#41 landing",
            "ref": "41-residual-measurement/final-implementation.md#4-deviations-from-the-plan"
          }
        ]
      },
      {
        "unit": "clone-replacement",
        "basis": "as-built",
        "summary": "As built, no module is published and no version moves; the landing carries documents and generated boards only. On GitHub one issue, #47, was filed during the run against the tools' request builder, and #27 is closed after the landing. On this machine the private repository clone was replaced by a fresh clone with its four `.idea/` files, by two requests under the unit's own grant, the old clone deleted at its recorded path after the unit's read of the fresh clone, and the graph rebuilt by the graph service, with the board files' ignore it places. #28 takes the record that no old-clone path remains.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "42-clone-replacement/consequences.md §1 to §6, reconciled with the build; 42-clone-replacement/final-implementation.md",
        "link": "42-clone-replacement/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "One issue, #47, was filed in KotlinBottools during the run, for the clone set's request builder; the plan wrote nothing to GitHub before the landing.",
            "why": "The deletion request carried the replacement's four check sentences; the defect was filed for the tools once the deletion's own markers had printed and no old-clone path remained, and it changed no outcome.",
            "when": "#42 landing",
            "ref": "42-clone-replacement/final-implementation.md#4-deviations-from-the-plan"
          },
          {
            "what": "The grant section was given without its `Settings:` line, so it does not itself name the allow lines to remove when it moves to history; the follow-up names them.",
            "why": "The plan makes a differing wording a record, never a stop, and every part the readiness check reads was present.",
            "when": "#42 landing",
            "ref": "42-clone-replacement/final-implementation.md#4-deviations-from-the-plan"
          },
          {
            "what": "The landing also carries a note in the verification results of this design's research, which the plan's documentation impact did not list.",
            "why": "The research's summary has the clone hold the two hooks and the one exclude entry again after the graph's build; the build also left the board files' ignore with a second exclude entry, which the read-back recorded as its one difference.",
            "when": "#42 landing",
            "ref": "42-clone-replacement/consequences.md#23-documents-and-generated-boards"
          }
        ]
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
      },
      {
        "unit": "residual-measurement",
        "when": "#41 landing",
        "entry": "downstream.2",
        "what": "The events did not list every rewritten branch's push: after each push's 6 hours they listed the push of 1 of BotTools' 2 branches and none of the first private repository's 2 or the second's 1, while every activity feed lists each force push.",
        "why": "The initiative's impact took one event per rewritten branch; the residual measurement read the events until 6 hours had passed since each push and recorded what they listed. Whether GitHub lists the other pushes later is not established, a known gap of the unit.",
        "ref": "41-residual-measurement/consequences.md#5-known-gaps"
      },
      {
        "unit": "clone-replacement",
        "when": "#42 landing",
        "entry": "downstream.4",
        "what": "The old clone held two exclude entries, the second the board files' ignore's: that ignore is part of a graph's footprint, was taken out before the census and not carried, and the rebuilt graph placed it again with its own entry.",
        "why": "The initiative's impact took the old graph's footprint as one exclude entry, two hooks and two keys; the replacement's census recorded the ignore, and this design took a dated note under §10.3 stating it as part of a graph's footprint.",
        "ref": "42-clone-replacement/consequences.md#22-this-machine"
      },
      {
        "unit": "clone-replacement",
        "when": "#42 landing",
        "entry": "downstream.7",
        "what": "One issue, #47, was filed in KotlinBottools against the workspace tools, for the clone set's request builder; it stays open outside #27's units.",
        "why": "The deletion request carried the replacement's check sentences. The defect changed no outcome, and the tool folder stays at its pins, so its fix is a new version of the pinned file under the tools' defect rule.",
        "ref": "42-clone-replacement/final-implementation.md#4-deviations-from-the-plan"
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
  },
  "issueBoards": {
    "28": "../28-residual-report-and-cleanup/dashboard.html"
  }
}
);
