/* board.js: board.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit board.json and re-embed. */
window.dashboardLive&&window.dashboardLive("board",
{
  "schema": "work-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "generated": "2026-11-13T20:21:07Z",
  "asOf": "2026-11-13",
  "tree": {
    "ref": "main",
    "sha": "d5192fc"
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
    },
    {
      "slug": "repository-hygiene",
      "name": "Repository hygiene",
      "slot": 0,
      "top": "Internal Tooling",
      "status": "built",
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
      "detail": "6 of 8 units landed; #27 in progress; #28 up next.",
      "since": "2026-11-08T21:15:43Z",
      "updated": "2026-11-13T18:00:43Z",
      "qa": [],
      "qaMax": 3,
      "status": "building",
      "fixOf": null,
      "landed": null,
      "reconciliation": {
        "state": "partial",
        "landed": 6,
        "total": 8
      },
      "active": false,
      "chain": {
        "total": 8,
        "landed": 6,
        "dropped": 0,
        "deferred": 0,
        "left": 0,
        "planned": false,
        "done": false,
        "current": [
          {
            "issue": 27,
            "slug": "bottools-trumpbot-support-rewrite",
            "step": "document"
          }
        ],
        "next": {
          "issue": 28,
          "slug": "residual-report-and-cleanup",
          "blockedBy": [
            {
              "issue": 27
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
            "state": "done"
          },
          {
            "n": 4,
            "issue": 24,
            "name": "Repository hygiene",
            "state": "done"
          },
          {
            "n": 5,
            "issue": 25,
            "name": "Make KotlinBottools public",
            "state": "done"
          },
          {
            "n": 6,
            "issue": 26,
            "name": "Rewrite GKB2 and GKB",
            "state": "done"
          },
          {
            "n": 7,
            "issue": 27,
            "name": "Rewrite BotTools, TrumpBot and Support",
            "state": "current"
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
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-11T16:05:45Z",
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
      "state": "CLOSED",
      "stateReason": "COMPLETED",
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
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-13T09:38:30Z",
          "hold": "enables"
        },
        {
          "issue": 24,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-12T04:10:04Z",
          "hold": "enables"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/23-kotlinbottools-rewrite-and-swap/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/23-kotlinbottools-rewrite-and-swap/",
      "branch": null,
      "system": "kotlinbottools",
      "step": "landed",
      "detail": "Landed in PR #32.",
      "since": "2026-11-11T16:05:44Z",
      "updated": "2026-11-11T16:05:44Z",
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
      "status": "landed",
      "fixOf": null,
      "landed": {
        "pr": 32,
        "merge": "9e61aa5",
        "version": null,
        "date": "2026-11-11"
      },
      "reconciliation": {
        "state": "as-built",
        "landed": null,
        "total": null
      },
      "active": false,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 3
    },
    {
      "issue": 24,
      "title": "Phase 0 · 4 — KotlinBottools repository hygiene: .gitignore, gitleaks configuration and CI, README and CHANGELOG",
      "state": "CLOSED",
      "stateReason": "COMPLETED",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 23,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-11T16:05:45Z",
          "build": "clear",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 25,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-13T02:36:15Z",
          "hold": "enables"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/",
      "branch": null,
      "system": "repository-hygiene",
      "step": "landed",
      "detail": "Landed in PR #34.",
      "since": "2026-11-12T04:10:02Z",
      "updated": "2026-11-12T04:10:02Z",
      "qa": [
        {
          "pass": 1,
          "verdict": "changes-requested",
          "date": "2026-11-11",
          "at": "2026-11-11T20:46:16Z",
          "findings": {
            "test": 11,
            "code": 0
          },
          "severity": {
            "minor": 8,
            "other": 3
          },
          "route": "re-plan-then-remediation",
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/ca070e8d/tests/index.html",
          "note": "The code check found nothing: the six files hold their recorded bytes and nothing else changed. The 74 checks of the local checks, the scans and the privacy gate passed. The test check found 11 gaps in coverage, 3 not minor: no check reaches the scan wrapper's fail-closed branches (status 2); the allowlist table's negative controls exist only in the plan and scratch fixtures, with no committed repeatable check; and the two controls that must still be reported are never observed on the hosted Linux runner. The 8 minor ones: more ignore-list membership tests with an isolated user-level ignore file, an assertion that the clone holds no ignore file for findings, anchor fixtures for the table, a counts-only assertion over the scan output, assertions around the two reads of the hosted runs, optional shell-syntax checks of the workflow's run blocks, and one row of the test plan re-attributed. Every fix is in the plan's own procedure, so the plan is revised first and the revised checks then run."
        },
        {
          "pass": 2,
          "verdict": "changes-requested",
          "date": "2026-11-11",
          "at": "2026-11-11T22:22:42Z",
          "findings": {
            "test": 14,
            "code": 1
          },
          "severity": {
            "minor": 13,
            "other": 2
          },
          "route": "re-plan-then-remediation",
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/949b5d33/tests/index.html",
          "note": "All 202 checks passed, as in the build's own run, and the seven files hold the revised plan's recorded bytes; every finding of Quality Review 1 is answered. 15 findings (14 test, 1 code), 2 not minor. First, the code finding, in the controls script `.github/scripts/allowlist_controls.py`: its two fixtures meant to test the anchors of the table's pinned text put the extra character inside the quotes, which the pinned pattern includes, so both stay reported even if an anchor is dropped: a later edit removing an anchor would leave the controls green (found by evaluating the patterns, not by a run with the binary). Second, on the hosted runs the log's counts-only property is read through four marker counts only, so a line of another shape in a scan step would go unnoticed in a log that becomes public with the repository. The 13 minor ones: the controls script's own failure paths and three more table mutations as repeatable steps; three sub-cases of the scan wrapper; assertions on the workflow's timeout, names and concurrency group; a parse check of the two scripts; standard error asserted empty; the workflow's failing shell branches run locally; more not-ignored paths for five root-anchored patterns; a direct check of the pure functions; and wording in the plan (a count of 95 commits that should read 94, seven lines that should read six, two rows of the test plan table, some check labels). The plan is revised first, then the revised checks run."
        },
        {
          "pass": 3,
          "verdict": "changes-requested",
          "date": "2026-11-12",
          "at": "2026-11-12T00:38:33Z",
          "findings": {
            "test": 7,
            "code": 0
          },
          "severity": {
            "minor": 7,
            "other": 0
          },
          "route": "on-the-spot",
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/dda89436/tests/index.html",
          "note": "The code check found nothing: the seven files hold the plan's recorded bytes, and the code finding of Quality Review 2 is answered: evaluated against the rule and the table themselves, the committed table fails none of the controls' eleven expectations, and each of the four de-anchorings of the pinned text fails exactly its own fixture in both modes. All 334 checks passed (local checks 130, scans 199, privacy gate 5), and 13 of Quality Review 2's 15 findings are answered in full. 7 findings remain, all minor test findings, each an edit to the plan's procedure or its wording and none to the seven files: one call at the end of the canary step leaves its standard error unasserted; in two places the verdict is asserted before the shape check; one case is filed under the component row of the test levels though it runs git; three failing-side cases lack a shape and standard-error value; the 22 control lines and the controls each mutation turns are asserted as counts only, and reading the document from the last commit has no case; three more uncaught exits of the scan wrapper have no case; and the generated word's form and two helpers have no check of their own. They touch the checks before the landing, the allowlist controls, and the scan wrapper with its workflow. They are fixed on the spot and the steps they touch run again; no further review follows.",
          "inPlace": "fixed"
        }
      ],
      "qaMax": 3,
      "status": "landed",
      "fixOf": null,
      "landed": {
        "pr": 34,
        "merge": "3d1b89007f253d11bdee08174c1d7f21621cc386",
        "version": null,
        "date": "2026-11-12"
      },
      "reconciliation": {
        "state": "as-built",
        "landed": null,
        "total": null
      },
      "active": false,
      "systemName": "Repository hygiene",
      "group": "2",
      "order": 4
    },
    {
      "issue": 25,
      "title": "Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection",
      "state": "CLOSED",
      "stateReason": "COMPLETED",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 24,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-12T04:10:04Z",
          "build": "clear",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 28,
          "state": "OPEN",
          "hold": "enables"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/25-kotlinbottools-publish/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/25-kotlinbottools-publish/",
      "branch": null,
      "system": "kotlinbottools",
      "step": "landed",
      "detail": "Landed in PR #36.",
      "since": "2026-11-13T02:36:14Z",
      "updated": "2026-11-13T02:36:14Z",
      "qa": [
        {
          "pass": 1,
          "verdict": "changes-requested",
          "date": "2026-11-12",
          "at": "2026-11-12T23:59:25Z",
          "findings": {
            "test": 12,
            "code": 5
          },
          "severity": {
            "minor": 15,
            "other": 2
          },
          "route": "re-plan-then-remediation",
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/25-kotlinbottools-publish/ca070e8d/tests/index.html",
          "note": "The repository is in the intended state and the issue's three criteria are met: it reads public with secret scanning and push protection enabled, every pre-rewrite id probed answers as absent, the feeds list none, and all nineteen issue bodies equal the intended text. Nothing was run again: the recorded results read 171 passed, 0 failed and 224 without a stored result (155 self-test checks, 50 stage lines printed and not kept, 19 checks of the landing not yet due), as re-running the self-tests would remove the run's working sets. 17 findings (15 minor, 2 other; 12 test, 5 code). The 2 not minor: the totals of the six self-tests were never stored, and the second feed read came about three and a half minutes after the first where at least six were required, which the as-built record does not yet state. The 15 minor ones: the stale entry on the revisions count, a one-second error in the pre-flip gate's time and gap, no stored trace that the tools were checked after they were saved a second time (they equal their pins now), the wording on stage markers, and how the test plan files and records its checks. They touch the anonymous measurements, the third privacy gate and the pre-flip gate. The plan's wording is corrected first, then the as-built record."
        },
        {
          "pass": 2,
          "verdict": "changes-requested",
          "date": "2026-11-13",
          "at": "2026-11-13T00:43:53Z",
          "findings": {
            "test": 9,
            "code": 3
          },
          "severity": {
            "minor": 12,
            "other": 0
          },
          "route": "on-the-spot",
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/25-kotlinbottools-publish/949b5d33/tests/index.html",
          "note": "Fifteen of Quality Review 1's seventeen findings are closed, the two that were not minor among them: the totals of five self-tests are kept (137 checks passed, 0 failed; the 18 stand-in cases of the anonymous helpers were not run again, a known gap), and the spacing of the feed reads is corrected in the plan, stated in the as-built record and answered by the third feed read. The issue's three criteria are met on fresh reads: the repository reads public with secret scanning and push protection enabled, all 87 pre-rewrite commits answer as absent, and nine feed reads list no pre-rewrite id. The closed record is untouched and the saved tools equal their pins. Nothing was run again in this pass: its test results are read from the run's kept results. 12 findings (12 minor; 9 test, 3 code), all wording: the anonymous REST budget still stated as about 45 calls in the consequences, the plan's summaries of the landing's reads naming three of its five steps, one requirement number cited for the revert trigger, test plan rows that claim slightly more than their checks reach, and three statements of the as-built record (the measurements of the issue-text stage, the refusals that left no stored reply, one time stamp that straddles a second). They touch the anonymous measurements and are fixed on the spot, with no further review.",
          "inPlace": "fixed"
        }
      ],
      "qaMax": 3,
      "status": "landed",
      "fixOf": null,
      "landed": {
        "pr": 36,
        "merge": "96eba228ddd753f3b176f965c4ffa332f2187369",
        "version": null,
        "date": "2026-11-13"
      },
      "reconciliation": {
        "state": "as-built",
        "landed": null,
        "total": null
      },
      "active": false,
      "systemName": "KotlinBottools",
      "group": "2",
      "order": 5
    },
    {
      "issue": 26,
      "title": "Phase 0 · 6 — Rewrite GKB2 and GKB",
      "state": "CLOSED",
      "stateReason": "COMPLETED",
      "created": "2026-11-08",
      "parent": 2,
      "waitsOn": [
        {
          "issue": 23,
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-11T16:05:45Z",
          "build": "clear",
          "locality": "local-repository"
        }
      ],
      "blocks": [
        {
          "issue": 27,
          "state": "OPEN",
          "hold": "enables"
        }
      ],
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/",
      "branch": null,
      "system": "rewrite-pipeline",
      "step": "landed",
      "detail": "Landed in PR #37.",
      "since": "2026-11-13T09:38:29Z",
      "updated": "2026-11-13T09:38:29Z",
      "qa": [
        {
          "pass": 1,
          "verdict": "changes-requested",
          "date": "2026-11-13",
          "at": "2026-11-13T07:10:24Z",
          "findings": {
            "test": 19,
            "code": 4
          },
          "severity": {
            "minor": 17,
            "other": 6
          },
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/ca070e8d/tests/index.html",
          "note": "Both rewrites are confirmed by an independent recount: every expected value holds on both fresh mirrors, both remotes show only the one branch moved, and each acceptance criterion is met by evidence read from the log, the records and the remotes. The tools' two self-tests passed again in isolation (191 checks: 59 and 132). 23 findings (17 minor, 6 other; 19 test, 4 code). For the as-built record: one departure from the output rule not yet listed (a passing self-test prints a traceback with a sandbox path) and three small differences between the plan's wording and the tools. Follow-ups for the next rewrite unit: the classifier's reading of a reply's form, a close-out step that is not safe to run twice, and an anonymous budget reading that is not explained. Test gaps in the tools, the main ones: no case with a reply in its real shape, none for the stop that keeps a push from being sent twice, none for the closing controls of a probe set, the output rule asserted for one step only, and one self-test script that cannot be run by test level. They touch the push, the residual probes, the tools handed on and the check of the inputs. The landing's four document checks are still to run. How the findings on the tools are handled is not settled yet.",
          "route": "remediation"
        },
        {
          "pass": 2,
          "verdict": "changes-requested",
          "date": "2026-11-13",
          "at": "2026-11-13T08:10:40Z",
          "findings": {
            "test": 8,
            "code": 4
          },
          "severity": {
            "minor": 12,
            "other": 0
          },
          "route": "on-the-spot",
          "report": "build/reports/tests/index.html",
          "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/949b5d33/tests/index.html",
          "note": "The rewrite, both pushes and every acceptance criterion stand, all nine recorded departures hold, and nothing outside the stated writes changed; `gdocs.sh` ran again with 22 passed. 12 findings (12 minor; 8 test, 4 code), every one small and on the records: three statements in the consequences that do not hold against the tools (when the classifier's gap lets a request be sent again, which probe stop a self-test case reaches, and the budget thresholds), a list of untested paths that is not complete, one departure not yet listed in the as-built record (each push request sent as a reference to its file with a checksum, asking for the one-shell run), and the document checks, which ran before the boards were last regenerated and run again before the documents are committed. They touch the push, the residual probes and the tools handed on. This review counts 20 test findings in Quality Review 1, where that pass's record holds 19.",
          "inPlace": "fixed"
        }
      ],
      "qaMax": 3,
      "status": "landed",
      "fixOf": null,
      "landed": {
        "pr": 37,
        "merge": "416f36bda66c2050e320504d999a46e71ea18557",
        "version": null,
        "date": "2026-11-13"
      },
      "reconciliation": {
        "state": "as-built",
        "landed": null,
        "total": null
      },
      "active": false,
      "systemName": "Rewrite pipeline",
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
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-13T09:38:30Z",
          "build": "pre-built",
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
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/dashboard.html",
      "folder": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/",
      "branch": "chore/issue-27-rewrite-bottools-and-private-repos",
      "system": null,
      "step": "document",
      "detail": "Document: 1 of 3 tasks done; State boards current.",
      "since": "2026-11-13T19:43:46Z",
      "updated": "2026-11-13T20:00:32Z",
      "qa": [],
      "qaMax": 3,
      "status": "planning",
      "fixOf": null,
      "landed": null,
      "reconciliation": {
        "state": "planned",
        "landed": 0,
        "total": 4
      },
      "active": false,
      "chain": {
        "total": 4,
        "landed": 0,
        "dropped": 0,
        "deferred": 0,
        "left": 0,
        "planned": true,
        "done": false,
        "current": [],
        "next": {
          "issue": null,
          "slug": "workspace-tools",
          "blockedBy": []
        },
        "units": [
          {
            "n": 1,
            "issue": null,
            "name": "Extend the workspace tools",
            "state": "todo"
          },
          {
            "n": 2,
            "issue": null,
            "name": "Rewrite BotTools, TrumpBot and Support",
            "state": "todo"
          },
          {
            "n": 3,
            "issue": null,
            "name": "Measure what GitHub still serves",
            "state": "todo"
          },
          {
            "n": 4,
            "issue": null,
            "name": "Replace the TrumpBot clone",
            "state": "todo"
          }
        ]
      },
      "systemName": "Internal Tooling",
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
          "state": "CLOSED",
          "stateReason": "COMPLETED",
          "closedAt": "2026-11-13T02:36:15Z",
          "build": "clear",
          "locality": "local-repository"
        }
      ],
      "blocks": [],
      "board": null,
      "folder": null,
      "branch": null,
      "system": "kotlinbottools",
      "step": null,
      "detail": "Filed as #28; its run has not started. It starts after units 5 and 7, and its landing closes #2.",
      "qa": [],
      "qaMax": null,
      "status": "next",
      "landed": null,
      "reconciliation": null,
      "active": false,
      "next": true,
      "blockedBy": [
        {
          "issue": 27
        }
      ],
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
    {
      "issue": 27,
      "title": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
      "state": "OPEN",
      "board": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/dashboard.html",
      "items": []
    }
  ],
  "unscheduled": [
    {
      "issue": 33,
      "title": "Library ships a logging backend: logback-classic is an implementation dependency",
      "labels": [],
      "created": "2026-11-11",
      "system": "kotlinbottools"
    },
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
