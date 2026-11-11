/* board.js: board.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit board.json and re-embed. */
window.dashboardLive&&window.dashboardLive("board",
{
  "schema": "work-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "generated": "2026-11-11T15:03:59Z",
  "asOf": "2026-11-11",
  "tree": {
    "ref": "chore/issue-23-history-rewrite",
    "sha": "5c1bfd3"
  },
  "links": {
    "repoBoard": "../dashboards/index.html"
  },
  "systems": [
    {
      "slug": "kotlinbottools",
      "name": "KotlinBottools",
      "slot": 0,
      "top": "KotlinBottools",
      "status": "built",
      "board": "docs/dashboards/index.html"
    },
    {
      "slug": "repository-swap",
      "name": "Repository swap",
      "slot": 0,
      "top": "Internal Tooling",
      "status": "planned",
      "board": null,
      "plain": true
    }
  ],
  "groups": [
    {
      "key": "1",
      "issue": 1,
      "title": "BotTools consolidation & MagicBot (tracking)",
      "board": null
    },
    {
      "key": "2",
      "issue": 2,
      "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/dashboard.html"
    }
  ],
  "rows": [
    {
      "issue": 2,
      "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
      "state": "OPEN",
      "created": "2026-10-20",
      "parent": 1,
      "waitsOn": [],
      "blocks": [
        {
          "issue": 2,
          "repo": "SpartanLaboratories/MagicBot",
          "state": "OPEN",
          "hold": "blocks"
        },
        {
          "issue": 16,
          "state": "OPEN",
          "hold": "blocks"
        },
        {
          "issue": 3,
          "state": "OPEN",
          "hold": "blocks"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/",
      "branch": null,
      "system": null,
      "step": "implementation",
      "detail": "2 of 8 units landed; #23 in progress; #24 up next.",
      "since": "2026-11-08T21:15:43Z",
      "updated": "2026-11-10T01:12:41Z",
      "qa": [],
      "qaMax": 3,
      "status": "building",
      "fixOf": null,
      "landed": null,
      "reconciliation": {
        "state": "partial",
        "landed": 2,
        "total": 8
      },
      "active": false,
      "chain": {
        "total": 8,
        "landed": 2,
        "dropped": 0,
        "deferred": 0,
        "left": 0,
        "planned": false,
        "done": false,
        "current": [
          {
            "issue": 23,
            "slug": "kotlinbottools-rewrite-and-swap",
            "step": "document"
          }
        ],
        "next": {
          "issue": 24,
          "slug": "repository-hygiene",
          "blockedBy": [
            {
              "issue": 23
            }
          ]
        },
        "units": [
          {
            "n": 1,
            "issue": 21,
            "name": "Preparation",
            "state": "done"
          },
          {
            "n": 2,
            "issue": 22,
            "name": "Transfer rehearsal",
            "state": "done"
          },
          {
            "n": 3,
            "issue": 23,
            "name": "KotlinBottools rewrite and swap",
            "state": "current"
          },
          {
            "n": 4,
            "issue": 24,
            "name": "Repository hygiene",
            "state": "todo"
          },
          {
            "n": 5,
            "issue": 25,
            "name": "Make KotlinBottools public",
            "state": "todo"
          },
          {
            "n": 6,
            "issue": 26,
            "name": "Rewrite GKB2 and GKB",
            "state": "todo"
          },
          {
            "n": 7,
            "issue": 27,
            "name": "Rewrite BotTools, TrumpBot and Support",
            "state": "todo"
          },
          {
            "n": 8,
            "issue": 28,
            "name": "Residual report and cleanup",
            "state": "todo"
          }
        ]
      },
      "systemName": "",
      "group": "1",
      "order": 1
    },
    {
      "issue": 21,
      "title": "Phase 0 · 1 — Preparation: pinned tools, workspace, backup mirrors, legacy data copy and manifests",
      "state": "CLOSED",
      "stateReason": "COMPLETED",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [],
      "blocks": [
        {
          "issue": 22,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-10T00:15:13Z",
          "hold": "enables"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/21-preparation/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/21-preparation/",
      "branch": null,
      "system": "kotlinbottools",
      "step": "landed",
      "detail": "Landed in PR #30.",
      "since": "2026-11-08T23:23:04Z",
      "updated": "2026-11-08T23:23:04Z",
      "qa": [
        {
          "pass": 1,
          "verdict": "changes-requested",
          "date": "2026-11-08",
          "at": "2026-11-08T22:40:00Z",
          "findings": {
            "test": 6,
            "code": 5
          },
          "severity": {
            "minor": 9,
            "other": 2
          },
          "route": "re-plan-then-remediation"
        },
        {
          "pass": 2,
          "verdict": "running",
          "date": "2026-11-08",
          "at": "2026-11-08T22:40:31Z",
          "findings": {}
        },
        {
          "pass": 3,
          "verdict": "changes-requested",
          "date": "2026-11-08",
          "at": "2026-11-08T22:57:17Z",
          "findings": {
            "test": 0,
            "code": 3
          },
          "severity": {
            "minor": 3,
            "other": 0
          },
          "route": "on-the-spot"
        }
      ],
      "qaMax": 3,
      "status": "landed",
      "fixOf": null,
      "landed": {
        "pr": 30,
        "merge": "3b62b678be429c4a59ac0d08c5449a0bd6c50ea8",
        "version": null,
        "date": "2026-11-08"
      },
      "reconciliation": {
        "state": "as-built",
        "landed": null,
        "total": null
      },
      "active": false,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 1
    },
    {
      "issue": 22,
      "title": "Phase 0 · 2 — Transfer rehearsal on two throwaway repositories",
      "state": "CLOSED",
      "stateReason": "COMPLETED",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 21,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-08T23:23:05Z",
          "build": "clear",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 23,
          "state": "OPEN",
          "hold": "enables"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/22-transfer-rehearsal/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/22-transfer-rehearsal/",
      "branch": null,
      "system": "repository-swap",
      "step": "landed",
      "detail": "Landed in PR #31.",
      "since": "2026-11-10T00:15:12Z",
      "updated": "2026-11-10T00:15:12Z",
      "qa": [
        {
          "pass": 1,
          "verdict": "changes-requested",
          "date": "2026-11-09",
          "at": "2026-11-09T07:17:29Z",
          "findings": {},
          "severity": {
            "minor": 13,
            "other": 3
          },
          "note": "Every acceptance criterion is met and no recorded result is untrue; the self-test leaves the result gate and the failure paths of the post checks unchecked. Test check: 14 findings, 3 of them not minor; code check: 2 minor; the 87 self-test checks passed."
        },
        {
          "pass": 2,
          "verdict": "changes-requested",
          "date": "2026-11-09",
          "at": "2026-11-09T07:47:51Z",
          "findings": {},
          "severity": {
            "minor": 6,
            "other": 0
          },
          "route": "on-the-spot",
          "note": "The tool is unchanged and its 87 self-test checks pass; the known-gaps record for the next unit needed six small wording additions, made in place. Test check: no findings; code check: 6 minor, all wording.",
          "inPlace": "fixed"
        }
      ],
      "qaMax": 3,
      "status": "landed",
      "fixOf": null,
      "landed": {
        "pr": 31,
        "merge": "9af27b286ede1c153ff4e0d6f034fbc872996c15",
        "version": null,
        "date": "2026-11-10"
      },
      "reconciliation": {
        "state": "as-built",
        "landed": null,
        "total": null
      },
      "active": false,
      "systemName": "Repository swap",
      "group": "2",
      "order": 2
    },
    {
      "issue": 23,
      "title": "Phase 0 · 3 — KotlinBottools: rewrite with path scrub, fresh repository, number-preserving swap and clone realignment",
      "state": "OPEN",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 22,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-10T00:15:13Z",
          "build": "clear",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 26,
          "state": "OPEN",
          "hold": "blocks"
        },
        {
          "issue": 24,
          "state": "OPEN",
          "hold": "blocks"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/23-kotlinbottools-rewrite-and-swap/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/23-kotlinbottools-rewrite-and-swap/",
      "branch": "chore/issue-23-history-rewrite",
      "system": "kotlinbottools",
      "step": "document",
      "detail": "Document: 4 of 6 tasks done; State boards current.",
      "since": "2026-11-11T14:25:49Z",
      "updated": "2026-11-11T14:56:52Z",
      "qa": [
        {
          "pass": 1,
          "verdict": "changes-requested",
          "date": "2026-11-11",
          "at": "2026-11-11T14:08:08Z",
          "findings": {
            "test": 2,
            "code": 3
          },
          "severity": {
            "minor": 5,
            "other": 0
          },
          "route": "on-the-spot",
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/23-kotlinbottools-rewrite-and-swap/ca070e8d/tests/index.html",
          "inPlace": "fixed"
        }
      ],
      "qaMax": 3,
      "status": "building",
      "fixOf": null,
      "landed": null,
      "reconciliation": {
        "state": "partial",
        "landed": null,
        "total": null
      },
      "active": true,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 3
    },
    {
      "issue": 24,
      "title": "Phase 0 · 4 — KotlinBottools repository hygiene: .gitignore, gitleaks configuration and CI, README and CHANGELOG",
      "state": "OPEN",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 23,
          "state": "OPEN",
          "build": "blocking",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 25,
          "state": "OPEN",
          "hold": "blocks"
        }
      ],
      "board": null,
      "folder": null,
      "branch": null,
      "system": "kotlinbottools",
      "step": null,
      "detail": "To be filed as a sub-issue of #2 once this plan lands; starts after unit 3.",
      "qa": [],
      "qaMax": null,
      "status": "next",
      "landed": null,
      "reconciliation": null,
      "active": false,
      "next": true,
      "blockedBy": [
        {
          "issue": 23
        }
      ],
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 4
    },
    {
      "issue": 25,
      "title": "Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection",
      "state": "OPEN",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 24,
          "state": "OPEN",
          "build": "blocking",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 28,
          "state": "OPEN",
          "hold": "blocks"
        }
      ],
      "board": null,
      "folder": null,
      "branch": null,
      "system": "kotlinbottools",
      "step": null,
      "detail": "To be filed as a sub-issue of #2 once this plan lands; starts after unit 4, and MagicBot's Phase 13 may start once it has landed.",
      "qa": [],
      "qaMax": null,
      "status": "not-started",
      "landed": null,
      "reconciliation": null,
      "active": false,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 5
    },
    {
      "issue": 26,
      "title": "Phase 0 · 6 — Rewrite GKB2 and GKB",
      "state": "OPEN",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 23,
          "state": "OPEN",
          "build": "blocking",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 27,
          "state": "OPEN",
          "hold": "blocks"
        }
      ],
      "board": null,
      "folder": null,
      "branch": null,
      "system": "kotlinbottools",
      "step": null,
      "detail": "To be filed as a sub-issue of #2 once this plan lands; starts after unit 3.",
      "qa": [],
      "qaMax": null,
      "status": "not-started",
      "landed": null,
      "reconciliation": null,
      "active": false,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 6
    },
    {
      "issue": 27,
      "title": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
      "state": "OPEN",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 26,
          "state": "OPEN",
          "build": "blocking",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 28,
          "state": "OPEN",
          "hold": "blocks"
        }
      ],
      "board": null,
      "folder": null,
      "branch": null,
      "system": "kotlinbottools",
      "step": null,
      "detail": "To be filed as a sub-issue of #2 once this plan lands; starts after unit 6.",
      "qa": [],
      "qaMax": null,
      "status": "not-started",
      "landed": null,
      "reconciliation": null,
      "active": false,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 7
    },
    {
      "issue": 28,
      "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
      "state": "OPEN",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 27,
          "state": "OPEN",
          "build": "blocking",
          "locality": "local-repository"
        },
        {
          "issue": 25,
          "state": "OPEN",
          "build": "blocking",
          "locality": "local-repository"
        }
      ],
      "blocks": [],
      "board": null,
      "folder": null,
      "branch": null,
      "system": "kotlinbottools",
      "step": null,
      "detail": "To be filed as a sub-issue of #2 once this plan lands; starts after units 5 and 7, and its landing closes #2.",
      "qa": [],
      "qaMax": null,
      "status": "not-started",
      "landed": null,
      "reconciliation": null,
      "active": false,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 8
    }
  ],
  "roadmap": [
    {
      "issue": 1,
      "title": "BotTools consolidation & MagicBot (tracking)",
      "state": "OPEN",
      "board": null,
      "items": [
        {
          "issue": 2,
          "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
          "state": "OPEN"
        },
        {
          "issue": 3,
          "title": "Phase 1 — Build skeleton: multi-module build, conventions, CI and repository scaffolding",
          "state": "OPEN"
        },
        {
          "issue": 4,
          "title": "Phase 2 — Core foundation: ids, failures, settings, storage ports and configuration",
          "state": "OPEN"
        },
        {
          "issue": 5,
          "title": "Phase 3 — Command model: definitions, validation, typed invocation, dispatch and help",
          "state": "OPEN"
        },
        {
          "issue": 6,
          "title": "Phase 4 — SQLite storage: migrations, erasure and backups",
          "state": "OPEN"
        },
        {
          "issue": 7,
          "title": "Phase 5 — Bot runtime: plugins, events, gateway, jobs, registration and built-in commands",
          "state": "OPEN"
        },
        {
          "issue": 8,
          "title": "Phase 6a — HTTP call surface: the bottools-http API, endpoint vocabulary, failures and test fake",
          "state": "OPEN"
        },
        {
          "issue": 9,
          "title": "Phase 6b — WebTools adapter: the internal adapter, composite build, strict pin, alignment checks and CI lanes",
          "state": "OPEN"
        },
        {
          "issue": 10,
          "title": "Phase 7 — Stats provider framework: provider SPI, account links, match tracker and game news",
          "state": "OPEN"
        },
        {
          "issue": 11,
          "title": "Phase 8 — Reaction-roles plugin, with the default role and welcome message on join",
          "state": "OPEN"
        },
        {
          "issue": 12,
          "title": "Phase 9 — Math plugin",
          "state": "OPEN"
        },
        {
          "issue": 13,
          "title": "Phase 10 — Admin plugin: typed get and set over guild settings",
          "state": "OPEN"
        },
        {
          "issue": 14,
          "title": "Phase 11 — Weather plugin: conditions and forecast from Open-Meteo",
          "state": "OPEN"
        },
        {
          "issue": 15,
          "title": "Phase 12 — Feeds plugin: RSS and Atom subscriptions with content safeguards",
          "state": "OPEN"
        },
        {
          "issue": 16,
          "title": "Phase 17 — Release 1.0.0 to Maven Central and archive the predecessor repositories",
          "state": "OPEN"
        },
        {
          "issue": 17,
          "title": "Phase 18 — Published test fixtures for plugin and provider authors (Experimental)",
          "state": "OPEN"
        },
        {
          "issue": 18,
          "title": "Phase 19 — Poker plugin: playable Texas hold 'em (Experimental)",
          "state": "OPEN"
        },
        {
          "issue": 19,
          "title": "Phase 23 — Desktop manager on SpartanUI and SpartanGraphics (unscheduled)",
          "state": "OPEN"
        }
      ]
    },
    {
      "issue": 2,
      "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
      "state": "OPEN",
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/dashboard.html",
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
          "state": "OPEN"
        },
        {
          "issue": 24,
          "title": "Phase 0 · 4 — KotlinBottools repository hygiene: .gitignore, gitleaks configuration and CI, README and CHANGELOG",
          "state": "OPEN"
        },
        {
          "issue": 25,
          "title": "Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection",
          "state": "OPEN"
        },
        {
          "issue": 26,
          "title": "Phase 0 · 6 — Rewrite GKB2 and GKB",
          "state": "OPEN"
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
    }
  ],
  "unscheduled": [
    {
      "issue": 29,
      "title": "Adopt the organization's Dokka and project site standard",
      "labels": [
        "type: feature"
      ],
      "created": "2026-11-08",
      "system": "kotlinbottools"
    }
  ]
}
);
