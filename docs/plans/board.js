/* board.js: board.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit board.json and re-embed. */
window.dashboardLive&&window.dashboardLive("board",
{
  "schema": "work-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "generated": "2026-11-08T01:37:51Z",
  "asOf": "2026-11-08",
  "tree": {
    "ref": "docs/issue-1-bottools-consolidation",
    "sha": "996fe5c"
  },
  "links": {
    "repoBoard": "../dashboards/index.html"
  },
  "systems": [],
  "groups": [
    {
      "key": "1",
      "issue": 1,
      "title": "BotTools consolidation & MagicBot (tracking)",
      "board": null
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
      "branch": "docs/issue-1-bottools-consolidation",
      "system": null,
      "step": "document",
      "detail": "Document: 1 of 3 tasks done; State boards with the planned units drawn dashed current.",
      "since": "2026-11-08T01:12:00Z",
      "updated": "2026-11-08T01:15:00Z",
      "qa": [],
      "qaMax": 3,
      "status": "planning",
      "fixOf": null,
      "landed": null,
      "reconciliation": {
        "state": "planned",
        "landed": 0,
        "total": 8
      },
      "active": false,
      "chain": {
        "total": 8,
        "landed": 0,
        "dropped": 0,
        "deferred": 0,
        "left": 0,
        "planned": true,
        "done": false,
        "current": [],
        "next": {
          "issue": null,
          "slug": "preparation",
          "blockedBy": []
        }
      },
      "systemName": "",
      "group": "1",
      "order": 1
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
      "items": []
    }
  ],
  "unscheduled": []
}
);
