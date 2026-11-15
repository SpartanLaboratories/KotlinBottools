/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 39,
  "slug": "39-workspace-tools",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools",
  "kind": "issue",
  "title": "Extend the workspace tools",
  "issueTitle": "Phase 0 · 7.1 — Extend the workspace tools for BotTools, TrumpBot and Support",
  "function": "The workspace tools were written for GKB2 and GKB, two public repositories with one branch each, and cannot yet run BotTools, which is public with two branches and a webhook, or TrumpBot and Support, which are private: they push one branch, assume a public repository with no webhook and a positive control with probe arguments, run stage 9 right after each push, and two of them name GKB2 and GKB outside the parameter table. This unit builds a new, self-contained tool folder from the earlier one, which stays as it ran: four tool sets on one library, for the rewrites, the residual measurement and the clone replacement, and a self-test run by test kind; the three repositories' parameter rows, proven against what the repositories report; and every gap and follow-up the GKB2 and GKB unit recorded for this work, closed before the first push. Unit 1 of #27, with no version moved; it writes nothing to GitHub and changes no repository and no checkout.",
  "status": "built",
  "sized": "2026-11-13T21:05:13Z",
  "parent": {
    "issue": 27,
    "board": "../dashboard.html"
  },
  "fixOf": null,
  "branch": "docs/issue-39-extend-workspace-tools",
  "baseline": {
    "ref": "main",
    "sha": "9f22646",
    "date": "2026-11-13"
  },
  "asBuilt": {
    "sha": "ffb272c37c6c0dc50f58f0fd295142d15473a643",
    "merge": "ffb272c37c6c0dc50f58f0fd295142d15473a643",
    "pr": 44,
    "date": "2026-11-15",
    "at": "2026-11-15T12:03:34Z"
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
    }
  ],
  "wip": {
    "step": "landed",
    "since": "2026-11-15T12:03:34Z",
    "updated": "2026-11-15T12:03:34Z",
    "detail": "Landed in PR #44.",
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
    "current": [],
    "questions": [],
    "research": null,
    "interview": [],
    "plan": {
      "state": "re-pass",
      "from": "qa",
      "pass": 3,
      "since": "2026-11-14T21:18:51Z"
    },
    "stages": [
      {
        "id": "S0",
        "name": "Readiness",
        "state": "done",
        "rows": [
          "tool-folder",
          "parameter-table"
        ],
        "brief": "The earlier tool folder and the reused tools are at their recorded pins and the unit's data file is written.",
        "kind": "check",
        "steps": [
          {
            "id": "S0.g26",
            "name": "The earlier folder and the reused tools at their pins",
            "state": "done",
            "finished": "2026-11-14T07:12:32Z"
          },
          {
            "id": "S0.unit",
            "name": "The unit's data file",
            "state": "done",
            "finished": "2026-11-14T07:12:51Z"
          }
        ],
        "ref": "plan.md#s0--readiness",
        "started": "2026-11-14T07:10:33Z",
        "finished": "2026-11-14T07:13:03Z",
        "report": "Readiness passed. The earlier tool folder holds 22 files and 21 of its 21 pinned files equal their pins; the 21 reused tools and the stage runner equal the earlier pin list; the runner is 1428 bytes at its recorded sha256. The unit's data file is written (10 lines). Nothing else was written. No deviation from the plan.",
        "result": "passed"
      },
      {
        "id": "S1",
        "name": "The folder saved",
        "state": "done",
        "rows": [
          "tool-folder",
          "parameter-table",
          "rewrite-set",
          "residual-set",
          "clone-set",
          "self-test",
          "recorded-gaps",
          "documentation-points"
        ],
        "brief": "The new tool folder is saved from this plan, every file equals its pin and every script parses.",
        "kind": "work",
        "steps": [
          {
            "id": "S1.save",
            "name": "Save the folder from this plan",
            "state": "done",
            "finished": "2026-11-14T07:13:15Z"
          },
          {
            "id": "S1.tools",
            "name": "Every file at its pin and the parse checks",
            "state": "done",
            "finished": "2026-11-14T07:13:35Z"
          },
          {
            "id": "S1.pins",
            "name": "The tool versions",
            "state": "done",
            "finished": "2026-11-14T07:13:52Z"
          }
        ],
        "ref": "plan.md#s1--the-folder-saved",
        "started": "2026-11-14T07:13:03Z",
        "finished": "2026-11-14T07:14:00Z",
        "report": "The new tool folder is saved from the plan: 25 files, and the pin list holds its recorded sha256. Every reused tool and every saved file holds its recorded size and sha256, the folder holds exactly the files its pin list names, every shell script parses and every Python tool compiles (96 checks passed, 0 failed; the output equals the plan's expected output line for line). The tool versions equal the recorded ones (7 checks passed, 0 failed). No deviation from the plan."
      },
      {
        "id": "S2",
        "name": "The self-test",
        "state": "done",
        "rows": [
          "rewrite-set",
          "residual-set",
          "clone-set",
          "self-test",
          "recorded-gaps",
          "documentation-points"
        ],
        "brief": "The tools pass their self-test by test kind, each kind with its total, and every expectation and stop of every step script was reached.",
        "kind": "check",
        "steps": [
          {
            "id": "S2.gating",
            "name": "The gating checks",
            "state": "done",
            "finished": "2026-11-14T07:15:13Z"
          },
          {
            "id": "S2.deterministic",
            "name": "The deterministic cases",
            "state": "done",
            "finished": "2026-11-14T07:15:32Z"
          },
          {
            "id": "S2.component",
            "name": "The component tests",
            "state": "done",
            "finished": "2026-11-14T07:16:12Z"
          },
          {
            "id": "S2.integration",
            "name": "The integration tests",
            "state": "done",
            "finished": "2026-11-14T07:30:13Z"
          },
          {
            "id": "S2.nonfunctional",
            "name": "The non-functional cases",
            "state": "done",
            "finished": "2026-11-14T07:33:09Z"
          },
          {
            "id": "S2.coverage",
            "name": "The coverage check",
            "state": "done",
            "finished": "2026-11-14T07:33:28Z"
          }
        ],
        "ref": "plan.md#s2--the-self-test",
        "started": "2026-11-14T07:14:00Z",
        "finished": "2026-11-14T07:33:37Z",
        "report": "The self-test passed by test set, each with the total the plan records and no stop: the gating tests 49 checks passed, the deterministic tests 63, the component tests 80, the integration tests 420, the nonfunctional tests 23; 0 failed in each. The coverage check passed (2 checks): 308 expectations and stops, each reached as a stop by at least one case (312 distinct stop lines). Each test set ran once. No deviation from the plan.",
        "result": "passed"
      },
      {
        "id": "S3",
        "name": "The three repositories read",
        "state": "done",
        "rows": [
          "parameter-table",
          "readiness-reads"
        ],
        "brief": "The three repositories are read once and each parameter row equals the data.",
        "kind": "check",
        "steps": [
          {
            "id": "S3.inputs",
            "name": "The rows against the data",
            "state": "done",
            "finished": "2026-11-14T07:34:04Z"
          },
          {
            "id": "S3.repos",
            "name": "The repositories read",
            "state": "done",
            "finished": "2026-11-14T07:34:39Z"
          }
        ],
        "ref": "plan.md#s3--the-three-repositories-read",
        "started": "2026-11-14T07:33:37Z",
        "finished": "2026-11-14T07:34:50Z",
        "report": "The three repositories were read once and each parameter row equals the data; both steps' output equals the plan's expected output line for line (the rate-limit reading aside, which is never compared). The rows against the data: 62 checks passed, 0 failed (BotTools 11 row checks, TrumpBot 10, Support 10, each after its list's proofs); the checksums of the earlier records were recorded at this first run (5, 6 and 5 records). The repositories read from GitHub: 39 checks passed, 0 failed (BotTools 14, TrumpBot 13, Support 12) and 5 recorded readings: activity feed entries 0, 0 and 0 and events 0, 3 and 0 in the order BotTools, TrumpBot, Support, and for each of the two private repositories the rulesets read refused with HTTP 403, recorded as a repository no ruleset can apply to. Nothing was written to GitHub. No deviation from the plan.",
        "result": "passed"
      },
      {
        "id": "S4",
        "name": "Close-out",
        "state": "done",
        "rows": [
          "tool-folder",
          "readiness-reads"
        ],
        "brief": "The earlier folder and the new one equal their pins, the preparation unit's records and the three repositories' refs are as before.",
        "kind": "check",
        "steps": [
          {
            "id": "S4.g26",
            "name": "The earlier folder at its pins",
            "state": "done",
            "finished": "2026-11-14T07:35:11Z"
          },
          {
            "id": "S4.tools",
            "name": "The new folder at its pins",
            "state": "done",
            "finished": "2026-11-14T07:35:28Z"
          },
          {
            "id": "S4.records",
            "name": "The earlier records and the refs unchanged",
            "state": "done",
            "finished": "2026-11-14T07:36:12Z"
          }
        ],
        "ref": "plan.md#s4--close-out",
        "started": "2026-11-14T07:34:50Z",
        "finished": "2026-11-14T07:36:33Z",
        "report": "The close-out passed. The earlier tool folder still holds 22 files, 21 of 21 pinned files equal their pins, and the 21 reused tools and the stage runner equal the earlier pin list. The new folder holds 25 files and equals its pins (96 checks passed, 0 failed). The earlier records equal those recorded at the first run for each of the three repositories (62 checks passed, 0 failed), and the three repositories read from GitHub as before (39 checks passed, 0 failed, 5 recorded readings: activity feed entries 0, 0 and 0, events 0, 3 and 0, and the rulesets read of each private repository refused with HTTP 403). Every step's output equals the plan's expected output; no stop in any stage. The unit's records are 3 files, one per repository. Nothing was written to GitHub and no repository changed. No deviation from the plan.",
        "result": "passed"
      }
    ],
    "remediation": {
      "pass": 4,
      "route": "on-the-spot",
      "steps": [
        {
          "name": "Reword four statements of the plan",
          "state": "done",
          "finished": "2026-11-15T06:52:02Z"
        }
      ]
    },
    "open": [],
    "event": {
      "name": "landed",
      "at": "2026-11-15T12:03:34Z"
    },
    "history": {
      "sizing": [
        {
          "since": null,
          "ended": "2026-11-13T21:05:13Z",
          "endedBy": "sized",
          "to": "plan"
        }
      ],
      "plan": [
        {
          "since": "2026-11-13T21:05:13Z",
          "ended": "2026-11-14T05:20:13Z",
          "endedBy": "run-restarted",
          "to": "plan",
          "event": {
            "name": "researched",
            "at": "2026-11-13T21:29:09Z"
          },
          "detail": "No question needs new evidence: the outside-world claims the tools rest on were verified for the parent design, and the earlier tool folder, the three repositories and the data were read again today and match it.",
          "plan": {
            "state": "re-pass",
            "from": "parent",
            "since": "2026-11-13T21:05:13Z"
          },
          "outage": "the process ended and the run was taken up again; it had ended three times earlier in the planning, at 01:19 to 01:45, 01:47 to 02:03 and about 04:10 to 04:12 (UTC)"
        },
        {
          "since": "2026-11-14T05:28:10Z",
          "ended": "2026-11-14T07:07:04Z",
          "endedBy": "plan-accepted",
          "to": "branch",
          "event": {
            "name": "researched",
            "at": "2026-11-13T21:29:09Z"
          },
          "detail": "No question needs new evidence: the outside-world claims the tools rest on were verified for the parent design, and the earlier tool folder, the three repositories and the data were read again today and match it.",
          "plan": {
            "state": "re-pass",
            "from": "parent",
            "since": "2026-11-13T21:05:13Z"
          }
        }
      ],
      "branch": [
        {
          "since": "2026-11-14T07:07:04Z",
          "ended": "2026-11-14T07:10:33Z",
          "endedBy": "branch-cut",
          "to": "implementation",
          "event": {
            "name": "plan-accepted",
            "at": "2026-11-14T07:07:04Z"
          },
          "detail": "The plan carries the source and pin of every file of the new tool folder (25 files), with a five-stage table: readiness, the folder saved, the self-test, the three repositories read, close-out. No research was needed and no question is open.",
          "branch": "docs/issue-39-extend-workspace-tools"
        }
      ],
      "implementation": [
        {
          "since": "2026-11-14T07:10:33Z",
          "ended": "2026-11-14T07:37:23Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-14T07:36:33Z",
            "note": "S4 reported done; Quality Review next"
          },
          "detail": "The close-out passed. The earlier tool folder still holds 22 files, 21 of 21 pinned files equal their pins, and the 21 reused tools and the stage runner equal the earlier pin list. The new folder holds 25 files and equals its pins (96 checks passed, 0 failed). The earlier records equal those recorded at the first run for each of the three repositories (62 checks passed, 0 failed), and the three repositories read from GitHub as before (39 checks passed, 0 failed, 5 recorded readings: activity feed entries 0, 0 and 0, events 0, 3 and 0, and the rulesets read of each private repository refused with HTTP 403). Every step's output equals the plan's expected output; no stop in any stage. The unit's records are 3 files, one per repository. Nothing was written to GitHub and no repository changed. No deviation from the plan.",
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "done",
              "rows": [
                "tool-folder",
                "parameter-table"
              ],
              "brief": "The earlier tool folder and the reused tools are at their recorded pins and the unit's data file is written.",
              "kind": "check",
              "steps": [
                {
                  "id": "S0.g26",
                  "name": "The earlier folder and the reused tools at their pins",
                  "state": "done",
                  "finished": "2026-11-14T07:12:32Z"
                },
                {
                  "id": "S0.unit",
                  "name": "The unit's data file",
                  "state": "done",
                  "finished": "2026-11-14T07:12:51Z"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "started": "2026-11-14T07:10:33Z",
              "finished": "2026-11-14T07:13:03Z",
              "report": "Readiness passed. The earlier tool folder holds 22 files and 21 of its 21 pinned files equal their pins; the 21 reused tools and the stage runner equal the earlier pin list; the runner is 1428 bytes at its recorded sha256. The unit's data file is written (10 lines). Nothing else was written. No deviation from the plan.",
              "result": "passed"
            },
            {
              "id": "S1",
              "name": "The folder saved",
              "state": "done",
              "rows": [
                "tool-folder",
                "parameter-table",
                "rewrite-set",
                "residual-set",
                "clone-set",
                "self-test",
                "recorded-gaps",
                "documentation-points"
              ],
              "brief": "The new tool folder is saved from this plan, every file equals its pin and every script parses.",
              "kind": "work",
              "steps": [
                {
                  "id": "S1.save",
                  "name": "Save the folder from this plan",
                  "state": "done",
                  "finished": "2026-11-14T07:13:15Z"
                },
                {
                  "id": "S1.tools",
                  "name": "Every file at its pin and the parse checks",
                  "state": "done",
                  "finished": "2026-11-14T07:13:35Z"
                },
                {
                  "id": "S1.pins",
                  "name": "The tool versions",
                  "state": "done",
                  "finished": "2026-11-14T07:13:52Z"
                }
              ],
              "ref": "plan.md#s1--the-folder-saved",
              "started": "2026-11-14T07:13:03Z",
              "finished": "2026-11-14T07:14:00Z",
              "report": "The new tool folder is saved from the plan: 25 files, and the pin list holds its recorded sha256. Every reused tool and every saved file holds its recorded size and sha256, the folder holds exactly the files its pin list names, every shell script parses and every Python tool compiles (96 checks passed, 0 failed; the output equals the plan's expected output line for line). The tool versions equal the recorded ones (7 checks passed, 0 failed). No deviation from the plan."
            },
            {
              "id": "S2",
              "name": "The self-test",
              "state": "done",
              "rows": [
                "rewrite-set",
                "residual-set",
                "clone-set",
                "self-test",
                "recorded-gaps",
                "documentation-points"
              ],
              "brief": "The tools pass their self-test by test kind, each kind with its total, and every expectation and stop of every step script was reached.",
              "kind": "check",
              "steps": [
                {
                  "id": "S2.gating",
                  "name": "The gating checks",
                  "state": "done",
                  "finished": "2026-11-14T07:15:13Z"
                },
                {
                  "id": "S2.deterministic",
                  "name": "The deterministic cases",
                  "state": "done",
                  "finished": "2026-11-14T07:15:32Z"
                },
                {
                  "id": "S2.component",
                  "name": "The component tests",
                  "state": "done",
                  "finished": "2026-11-14T07:16:12Z"
                },
                {
                  "id": "S2.integration",
                  "name": "The integration tests",
                  "state": "done",
                  "finished": "2026-11-14T07:30:13Z"
                },
                {
                  "id": "S2.nonfunctional",
                  "name": "The non-functional cases",
                  "state": "done",
                  "finished": "2026-11-14T07:33:09Z"
                },
                {
                  "id": "S2.coverage",
                  "name": "The coverage check",
                  "state": "done",
                  "finished": "2026-11-14T07:33:28Z"
                }
              ],
              "ref": "plan.md#s2--the-self-test",
              "started": "2026-11-14T07:14:00Z",
              "finished": "2026-11-14T07:33:37Z",
              "report": "The self-test passed by test set, each with the total the plan records and no stop: the gating tests 49 checks passed, the deterministic tests 63, the component tests 80, the integration tests 420, the nonfunctional tests 23; 0 failed in each. The coverage check passed (2 checks): 308 expectations and stops, each reached as a stop by at least one case (312 distinct stop lines). Each test set ran once. No deviation from the plan.",
              "result": "passed"
            },
            {
              "id": "S3",
              "name": "The three repositories read",
              "state": "done",
              "rows": [
                "parameter-table",
                "readiness-reads"
              ],
              "brief": "The three repositories are read once and each parameter row equals the data.",
              "kind": "check",
              "steps": [
                {
                  "id": "S3.inputs",
                  "name": "The rows against the data",
                  "state": "done",
                  "finished": "2026-11-14T07:34:04Z"
                },
                {
                  "id": "S3.repos",
                  "name": "The repositories read",
                  "state": "done",
                  "finished": "2026-11-14T07:34:39Z"
                }
              ],
              "ref": "plan.md#s3--the-three-repositories-read",
              "started": "2026-11-14T07:33:37Z",
              "finished": "2026-11-14T07:34:50Z",
              "report": "The three repositories were read once and each parameter row equals the data; both steps' output equals the plan's expected output line for line (the rate-limit reading aside, which is never compared). The rows against the data: 62 checks passed, 0 failed (BotTools 11 row checks, TrumpBot 10, Support 10, each after its list's proofs); the checksums of the earlier records were recorded at this first run (5, 6 and 5 records). The repositories read from GitHub: 39 checks passed, 0 failed (BotTools 14, TrumpBot 13, Support 12) and 5 recorded readings: activity feed entries 0, 0 and 0 and events 0, 3 and 0 in the order BotTools, TrumpBot, Support, and for each of the two private repositories the rulesets read refused with HTTP 403, recorded as a repository no ruleset can apply to. Nothing was written to GitHub. No deviation from the plan.",
              "result": "passed"
            },
            {
              "id": "S4",
              "name": "Close-out",
              "state": "done",
              "rows": [
                "tool-folder",
                "readiness-reads"
              ],
              "brief": "The earlier folder and the new one equal their pins, the preparation unit's records and the three repositories' refs are as before.",
              "kind": "check",
              "steps": [
                {
                  "id": "S4.g26",
                  "name": "The earlier folder at its pins",
                  "state": "done",
                  "finished": "2026-11-14T07:35:11Z"
                },
                {
                  "id": "S4.tools",
                  "name": "The new folder at its pins",
                  "state": "done",
                  "finished": "2026-11-14T07:35:28Z"
                },
                {
                  "id": "S4.records",
                  "name": "The earlier records and the refs unchanged",
                  "state": "done",
                  "finished": "2026-11-14T07:36:12Z"
                }
              ],
              "ref": "plan.md#s4--close-out",
              "started": "2026-11-14T07:34:50Z",
              "finished": "2026-11-14T07:36:33Z",
              "report": "The close-out passed. The earlier tool folder still holds 22 files, 21 of 21 pinned files equal their pins, and the 21 reused tools and the stage runner equal the earlier pin list. The new folder holds 25 files and equals its pins (96 checks passed, 0 failed). The earlier records equal those recorded at the first run for each of the three repositories (62 checks passed, 0 failed), and the three repositories read from GitHub as before (39 checks passed, 0 failed, 5 recorded readings: activity feed entries 0, 0 and 0, events 0, 3 and 0, and the rulesets read of each private repository refused with HTTP 403). Every step's output equals the plan's expected output; no stop in any stage. The unit's records are 3 files, one per repository. Nothing was written to GitHub and no repository changed. No deviation from the plan.",
              "result": "passed"
            }
          ]
        }
      ],
      "qa": [
        {
          "since": "2026-11-14T07:37:23Z",
          "ended": "2026-11-14T08:21:15Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-14T07:37:23Z",
            "note": "Quality Review 1: running"
          },
          "detail": "Quality Review 1 running.",
          "qa": [
            {
              "pass": 1,
              "verdict": "changes-requested",
              "date": "2026-11-14",
              "at": "2026-11-14T08:21:15Z",
              "findings": {
                "test": 22,
                "code": 10
              },
              "severity": {
                "minor": 18,
                "other": 14
              },
              "route": "re-plan-then-remediation",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/ca070e8d/tests/index.html"
            }
          ]
        },
        {
          "since": "2026-11-14T12:22:58Z",
          "ended": "2026-11-14T13:18:48Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-14T12:22:58Z",
            "note": "Quality Review 2: running"
          },
          "detail": "Quality Review 2 running.",
          "qa": [
            {
              "pass": 2,
              "verdict": "changes-requested",
              "date": "2026-11-14",
              "at": "2026-11-14T13:18:48Z",
              "findings": {
                "test": 15,
                "code": 3
              },
              "severity": {
                "minor": 16,
                "other": 2
              },
              "route": "re-plan-then-remediation",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/949b5d33/tests/index.html"
            }
          ]
        },
        {
          "since": "2026-11-14T20:00:30Z",
          "ended": "2026-11-14T21:18:51Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-14T20:00:30Z",
            "note": "Quality Review 3: running"
          },
          "detail": "Quality Review 3 running.",
          "qa": [
            {
              "pass": 3,
              "verdict": "changes-requested",
              "date": "2026-11-14",
              "at": "2026-11-14T21:18:51Z",
              "findings": {
                "test": 14,
                "code": 8
              },
              "severity": {
                "minor": 20,
                "other": 2
              },
              "route": "re-plan-then-remediation",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/dda89436/tests/index.html"
            }
          ]
        },
        {
          "since": "2026-11-15T05:43:30Z",
          "ended": "2026-11-15T06:52:02Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-15T05:43:30Z",
            "note": "Quality Review 4: running"
          },
          "detail": "Quality Review 4 running.",
          "qa": [
            {
              "pass": 4,
              "verdict": "changes-requested",
              "date": "2026-11-15",
              "at": "2026-11-15T06:52:02Z",
              "findings": {
                "test": 3,
                "code": 1
              },
              "severity": {
                "minor": 4,
                "other": 0
              },
              "route": "on-the-spot",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/f2745465/tests/index.html"
            }
          ]
        }
      ],
      "remediation": [
        {
          "since": "2026-11-14T08:21:15Z",
          "ended": "2026-11-14T12:22:58Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-14T12:22:11Z",
            "note": "4 of 4 sub-steps done"
          },
          "detail": "The folder was saved from the plan as it now stands and every stage ran again on the workspace with no stop and no departure from the plan: 25 files at their pins; the gating checks 68, the deterministic cases 63, the component tests 80, the integration tests 504, the non-functional cases 22, the coverage check 7 (323 of 323 expectations and stops, each reached by a case of its own script and arm), no failure. No kind printed a console line that is not a case, note or runner line, and the earlier tools' three collection files are gone from the unit's scratch folder. The earlier folder equals its pins before and after; the three repositories were read and each row equals the data; the earlier records equal their first recording. The rulesets read of the two private repositories is refused by the server and recorded, as the plan expects.",
          "remediation": {
            "pass": 1,
            "route": "re-plan-then-remediation",
            "steps": [
              {
                "name": "Revise the plan's tools and tests",
                "state": "done",
                "started": "2026-11-14T08:21:15Z",
                "finished": "2026-11-14T10:38:02Z",
                "report": "The plan is revised and the replaced version kept beside it. Every finding of the review is fixed in the tools with a case of its own, three partly or wholly in the plan's wording. A failed read of the webhook count or of the pull-request refs is now a stop; only a clean refusal of the rename is retried; a failed web fetch prints no path; the resend decision stops on a reply not yet classed; a missing record never compares equal; folder names are matched literally. The four clone-set cases are counted, the push procedure's stops and the private-repository probe selection have cases, and the coverage check matches each stop per script and arm (323 of 323). On the stand-ins: the gating checks 66, the deterministic cases 62, the component tests 79, the integration tests 503, the non-functional cases 21, the coverage check 6, no failure. The folder is saved again from the revised plan and every stage is run again on the workspace next."
              },
              {
                "name": "Save the folder again and run the steps",
                "state": "done",
                "started": "2026-11-14T10:38:02Z",
                "finished": "2026-11-14T11:10:52Z",
                "report": "The folder was saved again from the revised plan and every stage ran again on the workspace with no stop: 25 files at their pins; the gating checks 66, the deterministic cases 62, the component tests 79, the integration tests 503, the non-functional cases 21, the coverage check 6 (323 of 323 expectations and stops reached), no failure; the earlier folder at its pins before and after; the three repositories read, each row equal to the data and the earlier records equal to their first recording. One line of the gating checks' console output is not a status line: a line-ending note from git about a made-up fixture file, which the plan's output rule says the fixtures discard. It goes back to the plan before the next review, with two wording points."
              },
              {
                "name": "Settle the one console line the gating checks printed",
                "state": "done",
                "started": "2026-11-14T11:10:52Z",
                "finished": "2026-11-14T11:49:18Z",
                "report": "The console line is settled in the self-test, and the tools the later units run are unchanged. Its cause was git's default line-ending conversion on the machine: one fixture checkout committed a file without turning it off. Every working-copy fixture now turns it off, and each kind keeps its whole console and asserts that no line is anything but a case, note or stop line. The two wording points: two assumption rows named steps by the readiness tool's own stage names where this unit's step ids were meant, now corrected; and the earlier tools' collection files left in the unit's scratch folder, which one kind read by a wildcard, are now removed by the self-test and each kind's file is read by name. On the stand-ins: the gating checks 68, the deterministic cases 63, the component tests 80, the integration tests 504, the non-functional cases 22, the coverage check 7 (323 of 323), no failure. The last save and run covers every step again: the earlier folder at its pins, the unit's data file, the folder saved with its pins and versions, all six steps of the self-test, the three repositories read, and the close-out."
              },
              {
                "name": "Save the folder and run the affected steps once more",
                "state": "done",
                "started": "2026-11-14T11:49:18Z",
                "finished": "2026-11-14T12:22:11Z",
                "report": "The folder was saved from the plan as it now stands and every stage ran again on the workspace with no stop and no departure from the plan: 25 files at their pins; the gating checks 68, the deterministic cases 63, the component tests 80, the integration tests 504, the non-functional cases 22, the coverage check 7 (323 of 323 expectations and stops, each reached by a case of its own script and arm), no failure. No kind printed a console line that is not a case, note or runner line, and the earlier tools' three collection files are gone from the unit's scratch folder. The earlier folder equals its pins before and after; the three repositories were read and each row equals the data; the earlier records equal their first recording. The rulesets read of the two private repositories is refused by the server and recorded, as the plan expects."
              }
            ]
          },
          "qa": [
            {
              "pass": 1,
              "verdict": "changes-requested",
              "date": "2026-11-14",
              "at": "2026-11-14T08:21:15Z",
              "findings": {
                "test": 22,
                "code": 10
              },
              "severity": {
                "minor": 18,
                "other": 14
              },
              "route": "re-plan-then-remediation",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/ca070e8d/tests/index.html",
              "note": "The run was green: all 637 checks passed (gating 49, deterministic 63, component 80, integration 420, nonfunctional 23, and 2 of the coverage check), with the tool folder proved equal to its pins first; a green run does not clear what the review found. 32 findings (18 minor, 14 other; 22 test, 10 code). Tests: four cases of the clone set run uncounted in a subshell (424 case lines against a total of 420); six stops of the push procedure, the private-repository probe selection and two arms of the push check have no case; the output-rule cases and the coverage figure prove less than the test plan says (278 distinct texts for 308 sites; 8 stop sites of the Python tools outside it). Tools: a failed read of the webhook count and a failed read of the pull-request refs pass as zero or empty; the rename retry can move the old clone inside the target; a failed web fetch prints a local path; the resend decision reads a stale class; a missing record compares equal; the carried folder’s name is matched as a pattern. Plan text: the class table against the flowchart, and a stop the documents tool does not hold. They touch the self-test, the clone set, the rewrite set, the residual set, the parameter table, the tool folder, the recorded gaps and the readiness reads. The fixes change the tools’ source held in the plan, so the plan is revised first, then the folder is saved again and the steps run again."
            }
          ]
        },
        {
          "since": "2026-11-14T13:18:48Z",
          "ended": "2026-11-14T20:00:30Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-14T20:00:15Z",
            "note": "2 of 2 sub-steps done"
          },
          "detail": "The folder was saved from the plan as it now stands and every stage ran again on the workspace with no stop and no departure from the plan. The tool folder: 25 files at their pins, checked after the save and again at the close-out (96 checks each time). The self-test: the gating checks 79, the deterministic cases 63, the component tests 91, the integration tests 565, the non-functional cases 28, the coverage check 7, no failure; 390 of 390 expectations and stops reached, each by a case of its own script and arm; no console line that is not a case, note or runner line, and no label printed twice. The rewrite, residual and clone sets: their cases are among those totals and all passed. The earlier folder equals its pins before and after. The three repositories were read at the readiness reads and again at the close-out: 62 input checks and 39 repository checks each time, each row equal to the data, the earlier records equal to their first recording, and five recorded readings, among them the rulesets read of the two private repositories refused by the server.",
          "remediation": {
            "pass": 2,
            "route": "re-plan-then-remediation",
            "steps": [
              {
                "name": "Revise the plan's tools, tests and statements",
                "state": "done",
                "started": "2026-11-14T13:18:48Z",
                "finished": "2026-11-14T19:05:06Z",
                "report": "The plan is revised a third time and the replaced version kept beside it. By row. The self-test: the coverage check now reports a stop text shared by a helper and an arm, and refuses a collection not stamped with this run and these tools; the Python tools' own tests write under the unit's scratch folder; the console is captured from the first command and judged after the sandbox is removed; every result line and note has an asserting case; every label states a behaviour and none is printed twice; the two fault fixtures of the push procedure (the rewrite set's cases) use an address that cannot resolve. The clone set: the shared stop text is made distinct, the archive step stops when there is no census, and the graph note matches its entry literally. The rewrite set: the heads read-back says unreadable on a failed read, and the checksum lists of the post-run, exit and close-out steps check each listed file and the write's status. The residual set: a missing rate-limit header gives a wait line that names what could not be read and no date; its close-out checks its lists the same way. The tool folder: every load of the environment and of a library in each step script ends in a stop line, and the documents tool reads pending paths exactly. The recorded gaps: the closure table's rows name the right kind for each case. On the stand-ins: the gating checks 79, the deterministic cases 63, the component tests 91, the integration tests 565, the non-functional cases 28, the coverage check 7 (390 of 390 sites), no failure."
              },
              {
                "name": "Save the folder again and run every step",
                "state": "done",
                "started": "2026-11-14T19:05:06Z",
                "finished": "2026-11-14T20:00:15Z",
                "report": "The folder was saved from the plan as it now stands and every stage ran again on the workspace with no stop and no departure from the plan. The tool folder: 25 files at their pins, checked after the save and again at the close-out (96 checks each time). The self-test: the gating checks 79, the deterministic cases 63, the component tests 91, the integration tests 565, the non-functional cases 28, the coverage check 7, no failure; 390 of 390 expectations and stops reached, each by a case of its own script and arm; no console line that is not a case, note or runner line, and no label printed twice. The rewrite, residual and clone sets: their cases are among those totals and all passed. The earlier folder equals its pins before and after. The three repositories were read at the readiness reads and again at the close-out: 62 input checks and 39 repository checks each time, each row equal to the data, the earlier records equal to their first recording, and five recorded readings, among them the rulesets read of the two private repositories refused by the server."
              }
            ]
          },
          "qa": [
            {
              "pass": 2,
              "verdict": "changes-requested",
              "date": "2026-11-14",
              "at": "2026-11-14T13:18:48Z",
              "findings": {
                "test": 15,
                "code": 3
              },
              "severity": {
                "minor": 16,
                "other": 2
              },
              "route": "re-plan-then-remediation",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/949b5d33/tests/index.html",
              "note": "The run was green: all 744 checks passed (gating 68, deterministic 63, component 80, integration 504, nonfunctional 22, and 7 of the coverage check), every total as the plan records and no console line that is not a case, note or runner line; a green run does not clear what the review found. 18 findings (16 minor, 2 other; 15 test, 3 code). Of Quality Review 1's 32 findings, 28 are closed in the tools with their cases, and the landing's documents are left to the landing; three test findings stay open in one part each, all minor now. What stands: one site where the coverage check proves less than it says (a stop text shared by a helper and one arm of the clone tool is reached by one line); a wait line that prints the year 1970 as the reset time when the server sends no reset header; the Python tools' own tests writing to the system's temporary folder; two fault fixtures whose address the stand-in does not redirect; the console case missing output at its start and end; result lines and plain exits with no asserting case; labels that name a step and not a behaviour; and statements of the plan not carried through the moves of cases between test sets. They touch the self-test, the clone set, the rewrite set, the residual set, the tool folder and the recorded gaps. The tools change again, so the plan is revised first, then the folder is saved and every step run once more."
            }
          ]
        },
        {
          "since": "2026-11-14T21:18:51Z",
          "ended": "2026-11-14T21:19:36Z",
          "endedBy": "halted",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-14T21:18:51Z",
            "note": "Quality Review 3: changes-requested"
          },
          "detail": "The run was green (833 checks, no failure, every total as recorded, no stray console line, no label printed twice). Of the second review's 18 findings, 16 are closed. One defect of substance stands, found twice (the self-test): the stamp a kind writes reads the run's id in a way that prints the shell's own missing-file line, with a local path, when the gating checks never ran in that scratch folder, and the kind still ends with status 0; the later units run their quick check that way. The rest are small. The self-test: a region comment still files two groups of cases under the wrong kind; the run-id write, the error half of the checksum helpers' stop, one recorded line of the feeds step and a new stop of the Python tools have no asserting case; five labels name a step or state the opposite of their rule. The tool folder: the documents tool does not count a file a staged rename moves into the documents folder as outside it. The rewrite set: the per-ref verification runs its baseline check after the deliveries are written, so a second run passes without it; two error streams are still open. The clone set: one error stream still open, and two statements of the plan about its checksum list and a stop text. The residual set: the conventions still say to wait for a printed time that a wait line may now not print. The readiness reads: three changed reads and one checksum write have no case. Every finding is fixed next, the folder saved and run again, and one more review limited to what changed follows.",
          "remediation": {
            "pass": 3,
            "route": "re-plan-then-remediation",
            "steps": [
              {
                "name": "Revise the plan's tools, tests and statements",
                "state": "current",
                "started": "2026-11-14T21:18:51Z"
              },
              {
                "name": "Save the folder again and run every step",
                "state": "todo"
              }
            ]
          },
          "qa": [
            {
              "pass": 3,
              "verdict": "changes-requested",
              "date": "2026-11-14",
              "at": "2026-11-14T21:18:51Z",
              "findings": {
                "test": 14,
                "code": 8
              },
              "severity": {
                "minor": 20,
                "other": 2
              },
              "route": "re-plan-then-remediation",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/dda89436/tests/index.html"
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "The third review came back with changes requested: the test run was green (833 checks), with one real defect and about twenty small points. How should the work go on?",
              "options": [
                "Fix all, then one more review limited to what changed",
                "Fix all, with no further review",
                "Wording fixes only, and record the rest as follow-ups",
                "Stop here"
              ],
              "answer": null,
              "asked": "2026-11-14T21:19:36Z",
              "answered": "2026-11-14T21:23:04Z"
            }
          ]
        },
        {
          "since": "2026-11-14T21:23:04Z",
          "ended": "2026-11-15T05:43:30Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-15T05:43:12Z",
            "note": "2 of 2 sub-steps done"
          },
          "detail": "The folder was saved from the plan as it now stands and every stage ran again on the workspace with no stop and no departure from the plan. The tool folder: 25 files at their pins, checked after the save and again at the close-out (96 checks each time). The self-test: the gating checks 84, the deterministic cases 63, the component tests 92, the integration tests 579, the non-functional cases 28, the coverage check 7, no failure; 393 of 393 expectations and stops reached, each by a case of its own script and arm; no console line that is not a case, note or runner line, and no label printed twice. The rewrite, residual and clone sets: their cases are among those totals and all passed. The readiness reads: the three repositories were read at the readiness reads and again at the close-out, 62 input checks and 39 repository checks each time, each row equal to the data and the earlier records equal to their first recording; the earlier folder equals its pins before and after. The machine was busy during the run, so the kinds took several times their recorded times (the integration tests close to four hours against about forty minutes); the cases that measure time passed all the same.",
          "remediation": {
            "pass": 3,
            "route": "re-plan-then-remediation",
            "steps": [
              {
                "name": "Revise the plan's tools, tests and statements",
                "state": "done",
                "started": "2026-11-14T21:18:51Z",
                "finished": "2026-11-15T00:52:05Z",
                "report": "The plan is revised a fourth time and the replaced version kept beside it. By row. The self-test: the stamp reads the run's id safely, and a kind run where no run was started prints case and note lines only, ends with status 0 and stamps an empty run, which the coverage check refuses; the run-id write, the emptying of a kind's files, the error half of the checksum helpers' stop, the feeds step's recorded line and the Python tools' new stop each have an asserting case; the labels state behaviours; the region comment files its cases under the right kind. The tool folder: the documents tool reads a rename's source, so a file moved into the documents folder from outside it is a stop. The rewrite set: the per-ref verification checks its deliveries baseline before it writes the count; the post-run step checks its log and purge list first; the open error streams are closed. The residual set: the conventions and the flowchart say what a wait line that prints no time means; the record step strips a folder prefix literally. The clone set: the carried-file checksum loop prints no path, and the plan's two statements about its list and its stop texts are corrected. The readiness reads: the inputs step's changed reads and its checksum write each have a case, and the repositories step checks the clone listing first. On the stand-ins: the gating checks 84, the deterministic cases 63, the component tests 92, the integration tests 579, the non-functional cases 28, the coverage check 7 (393 of 393 sites), no failure."
              },
              {
                "name": "Save the folder again and run every step",
                "state": "done",
                "started": "2026-11-15T00:52:05Z",
                "finished": "2026-11-15T05:43:12Z",
                "report": "The folder was saved from the plan as it now stands and every stage ran again on the workspace with no stop and no departure from the plan. The tool folder: 25 files at their pins, checked after the save and again at the close-out (96 checks each time). The self-test: the gating checks 84, the deterministic cases 63, the component tests 92, the integration tests 579, the non-functional cases 28, the coverage check 7, no failure; 393 of 393 expectations and stops reached, each by a case of its own script and arm; no console line that is not a case, note or runner line, and no label printed twice. The rewrite, residual and clone sets: their cases are among those totals and all passed. The readiness reads: the three repositories were read at the readiness reads and again at the close-out, 62 input checks and 39 repository checks each time, each row equal to the data and the earlier records equal to their first recording; the earlier folder equals its pins before and after. The machine was busy during the run, so the kinds took several times their recorded times (the integration tests close to four hours against about forty minutes); the cases that measure time passed all the same."
              }
            ]
          },
          "qa": [
            {
              "pass": 3,
              "verdict": "changes-requested",
              "date": "2026-11-14",
              "at": "2026-11-14T21:18:51Z",
              "findings": {
                "test": 14,
                "code": 8
              },
              "severity": {
                "minor": 20,
                "other": 2
              },
              "route": "re-plan-then-remediation",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/dda89436/tests/index.html",
              "note": "The run was green: all 833 checks passed (gating 79, deterministic 63, component 91, integration 565, nonfunctional 28, and 7 of the coverage check), every total as the plan records, no stray console line and no label printed twice; a green run does not clear what the review found. 22 findings (20 minor, 2 other; 14 test, 8 code). Of Quality Review 2's 18 findings, 16 are closed. One defect of substance stands, found twice, in the self-test: the stamp a test set writes reads the run's id in a way that prints the shell's own missing-file line, with a local path, when the gating checks never ran in that scratch folder, and the set still ends with status 0; the later units run their quick check that way. The rest are small: in the self-test, a region comment that files two groups of cases under the wrong set, four lines and stops with no asserting case and five labels that name a step or state the opposite of their rule; in the tool folder, a file a staged rename moves into the documents folder not counted as outside it; in the rewrite set, the per-ref verification's baseline check run after the deliveries are written, and two error streams still open; in the clone set, one error stream and two statements of the plan; in the residual set, a convention that waits for a time a wait line may not print; in the readiness reads, three changed reads and one checksum write with no case. They touch the self-test, the tool folder, the rewrite set, the residual set, the clone set and the readiness reads. Next: every finding fixed, the folder saved and every step run again, then one more review limited to what changed."
            }
          ]
        },
        {
          "since": "2026-11-15T06:52:02Z",
          "ended": "2026-11-15T06:54:35Z",
          "endedBy": "document",
          "to": "document",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-15T06:52:02Z",
            "note": "Quality Review 4: changes-requested"
          },
          "detail": "This review was limited to the 15 tool files changed since the third one and did not run the five kinds again: their totals (853 checks, no failure, every last line as recorded, no stray console line, no label printed twice) were verified from the records the last run left, and only the coverage check was run, once (7 checks, 393 of 393 sites reached). Every finding of the third review is closed, the quick-check defect included: a kind run where no run was started now prints case lines only, and a case asserts it. Four small points were left, all in the plan's wording, none in a tool, so no pin moved and nothing was run again. The rewrite set: one sentence said the post-run step discards a message it does not; it now says the step checks its two records first. The self-test: two limits were not stated (no case provokes the messages the post-run step discards behind checks that stop first; no fixture path holds a pattern character, so no case tells the residual close-out's literal strip from a pattern match), and two rounded run times were behind the recorded ones. All four are reworded in the plan.",
          "remediation": {
            "pass": 4,
            "route": "on-the-spot",
            "steps": [
              {
                "name": "Reword four statements of the plan",
                "state": "done",
                "finished": "2026-11-15T06:52:02Z"
              }
            ]
          },
          "qa": [
            {
              "pass": 4,
              "verdict": "changes-requested",
              "date": "2026-11-15",
              "at": "2026-11-15T06:52:02Z",
              "findings": {
                "test": 3,
                "code": 1
              },
              "severity": {
                "minor": 4,
                "other": 0
              },
              "route": "on-the-spot",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/f2745465/tests/index.html"
            }
          ]
        }
      ],
      "document": [
        {
          "since": "2026-11-15T06:54:35Z",
          "ended": "2026-11-15T07:00:28Z",
          "endedBy": "run-restarted",
          "to": "document",
          "event": {
            "name": "document",
            "at": "2026-11-15T06:54:35Z",
            "note": "0 of 6 tasks done"
          },
          "detail": "The 25 tool files are read against the documentation standard: each tool's header, the contract comments on the library's functions, the Python docstrings and the line comments. No build file applies Dokka, so there is no generated reference to check.",
          "document": {
            "tasks": [
              {
                "id": "documentation-review",
                "name": "Review the tools' inline documentation",
                "state": "current",
                "started": "2026-11-15T06:54:35Z"
              },
              {
                "id": "reconcile-documentation",
                "name": "Apply the review's findings",
                "state": "todo"
              },
              {
                "id": "reconcile-plan",
                "name": "Reconcile the plan with the build: the as-built record, the consequences and the dated notes",
                "state": "todo"
              },
              {
                "id": "readme-changelog",
                "name": "README and CHANGELOG",
                "state": "todo"
              },
              {
                "id": "state-boards",
                "name": "State boards",
                "state": "todo"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "todo"
              }
            ]
          },
          "outage": "the session ended and a new session took the run up"
        },
        {
          "since": "2026-11-15T10:12:32Z",
          "ended": "2026-11-15T12:02:27Z",
          "endedBy": "landing",
          "to": "landing",
          "event": {
            "name": "document",
            "at": "2026-11-15T12:00:11Z",
            "note": "6 of 6 tasks done"
          },
          "detail": "Document: 6 of 6 tasks done; every task done.",
          "document": {
            "tasks": [
              {
                "id": "documentation-review",
                "name": "Review the tools' inline documentation",
                "state": "done",
                "started": "2026-11-15T06:54:35Z",
                "finished": "2026-11-15T10:17:44Z",
                "report": "A fresh documentation check ran over all 25 Appendix A tool files. Two findings, both already known from an earlier review pass: a stale header-comment claim in one script about check ordering, and a stale parenthetical in another script's function comment about a copy's source file. No other findings. Whether to fix these on the spot (which moves a pin and needs a rebuild and re-run) or record them as known gaps is being put to the user before the reconcile-documentation task closes."
              },
              {
                "id": "reconcile-documentation",
                "name": "Reconcile documentation",
                "state": "done",
                "started": "2026-11-15T10:17:44Z",
                "finished": "2026-11-15T11:37:22Z",
                "report": "The tools folder is saved again from the plan at pin list 60f5760b…31bf and every step run again on the real workspace, with no stop and nothing differing from the plan's expected lines. All 24 pinned files are at their pins. The gating tests 84, the deterministic tests 63, the component tests 92, the integration tests 579, the nonfunctional tests 28 and the coverage check 7 (393 expectations and stops reached), no failure, between 11:09Z and 11:35Z. The earlier tools folder is at its pins before and after, and the three earlier record files are unchanged. The as-built record's statements that waited on this run are being filled in."
              },
              {
                "id": "reconcile-plan",
                "name": "Reconcile plan",
                "state": "done",
                "started": "2026-11-15T10:44:59Z",
                "finished": "2026-11-15T11:44:39Z",
                "report": "The as-built record describes the build on the final pins (pin list 60f5760b…31bf) with two deviations: the five reworded header comments with the folder saved and run again, and the gating tests run in the background. The consequences are reconciled: the outcome of each assumption, the known gaps (three printed labels' wording, the two self-test limits), and the earlier unit's consequences carry 31 dated notes, the tracking unit's its link line. The plan's text now names the runner's end line after a step's STAGE line and the empty self-test folder a run leaves. The README does not change and the CHANGELOG takes no entry: the landing carries documents and boards only and no version moves."
              },
              {
                "id": "readme-changelog",
                "name": "README and CHANGELOG",
                "state": "done",
                "finished": "2026-11-15T11:44:39Z",
                "report": "The as-built record describes the build on the final pins (pin list 60f5760b…31bf) with two deviations: the five reworded header comments with the folder saved and run again, and the gating tests run in the background. The consequences are reconciled: the outcome of each assumption, the known gaps (three printed labels' wording, the two self-test limits), and the earlier unit's consequences carry 31 dated notes, the tracking unit's its link line. The plan's text now names the runner's end line after a step's STAGE line and the empty self-test folder a run leaves. The README does not change and the CHANGELOG takes no entry: the landing carries documents and boards only and no version moves."
              },
              {
                "id": "state-boards",
                "name": "State boards",
                "state": "done",
                "started": "2026-11-15T11:44:39Z",
                "finished": "2026-11-15T11:55:55Z"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "done",
                "started": "2026-11-15T11:55:55Z",
                "finished": "2026-11-15T12:00:11Z"
              }
            ]
          }
        }
      ],
      "landing": [
        {
          "since": "2026-11-15T12:02:27Z",
          "ended": "2026-11-15T12:03:29Z",
          "endedBy": "merge",
          "to": "merge",
          "event": {
            "name": "landing",
            "at": "2026-11-15T12:02:27Z",
            "note": "land accepted"
          },
          "detail": "Landing: the land accepted; the branch carries the code, the version bump, the reconciled documents and the state boards."
        }
      ],
      "merge": [
        {
          "since": "2026-11-15T12:03:29Z",
          "ended": "2026-11-15T12:03:34Z",
          "endedBy": "landed",
          "to": "landed",
          "event": {
            "name": "merge",
            "at": "2026-11-15T12:03:29Z",
            "note": "merging PR #44"
          },
          "detail": "Merge: merging it in PR #44."
        }
      ]
    },
    "next": null,
    "qa": [
      {
        "pass": 1,
        "verdict": "changes-requested",
        "date": "2026-11-14",
        "at": "2026-11-14T08:21:15Z",
        "findings": {
          "test": 22,
          "code": 10
        },
        "severity": {
          "minor": 18,
          "other": 14
        },
        "route": "re-plan-then-remediation",
        "report": "build/reports/tests/index.html",
        "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/ca070e8d/tests/index.html",
        "note": "The run was green: all 637 checks passed (gating 49, deterministic 63, component 80, integration 420, nonfunctional 23, and 2 of the coverage check), with the tool folder proved equal to its pins first; a green run does not clear what the review found. 32 findings (18 minor, 14 other; 22 test, 10 code). Tests: four cases of the clone set run uncounted in a subshell (424 case lines against a total of 420); six stops of the push procedure, the private-repository probe selection and two arms of the push check have no case; the output-rule cases and the coverage figure prove less than the test plan says (278 distinct texts for 308 sites; 8 stop sites of the Python tools outside it). Tools: a failed read of the webhook count and a failed read of the pull-request refs pass as zero or empty; the rename retry can move the old clone inside the target; a failed web fetch prints a local path; the resend decision reads a stale class; a missing record compares equal; the carried folder’s name is matched as a pattern. Plan text: the class table against the flowchart, and a stop the documents tool does not hold. They touch the self-test, the clone set, the rewrite set, the residual set, the parameter table, the tool folder, the recorded gaps and the readiness reads. The fixes change the tools’ source held in the plan, so the plan is revised first, then the folder is saved again and the steps run again."
      },
      {
        "pass": 2,
        "verdict": "changes-requested",
        "date": "2026-11-14",
        "at": "2026-11-14T13:18:48Z",
        "findings": {
          "test": 15,
          "code": 3
        },
        "severity": {
          "minor": 16,
          "other": 2
        },
        "route": "re-plan-then-remediation",
        "report": "build/reports/tests/index.html",
        "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/949b5d33/tests/index.html",
        "note": "The run was green: all 744 checks passed (gating 68, deterministic 63, component 80, integration 504, nonfunctional 22, and 7 of the coverage check), every total as the plan records and no console line that is not a case, note or runner line; a green run does not clear what the review found. 18 findings (16 minor, 2 other; 15 test, 3 code). Of Quality Review 1's 32 findings, 28 are closed in the tools with their cases, and the landing's documents are left to the landing; three test findings stay open in one part each, all minor now. What stands: one site where the coverage check proves less than it says (a stop text shared by a helper and one arm of the clone tool is reached by one line); a wait line that prints the year 1970 as the reset time when the server sends no reset header; the Python tools' own tests writing to the system's temporary folder; two fault fixtures whose address the stand-in does not redirect; the console case missing output at its start and end; result lines and plain exits with no asserting case; labels that name a step and not a behaviour; and statements of the plan not carried through the moves of cases between test sets. They touch the self-test, the clone set, the rewrite set, the residual set, the tool folder and the recorded gaps. The tools change again, so the plan is revised first, then the folder is saved and every step run once more."
      },
      {
        "pass": 3,
        "verdict": "changes-requested",
        "date": "2026-11-14",
        "at": "2026-11-14T21:18:51Z",
        "findings": {
          "test": 14,
          "code": 8
        },
        "severity": {
          "minor": 20,
          "other": 2
        },
        "route": "re-plan-then-remediation",
        "report": "build/reports/tests/index.html",
        "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/dda89436/tests/index.html",
        "note": "The run was green: all 833 checks passed (gating 79, deterministic 63, component 91, integration 565, nonfunctional 28, and 7 of the coverage check), every total as the plan records, no stray console line and no label printed twice; a green run does not clear what the review found. 22 findings (20 minor, 2 other; 14 test, 8 code). Of Quality Review 2's 18 findings, 16 are closed. One defect of substance stands, found twice, in the self-test: the stamp a test set writes reads the run's id in a way that prints the shell's own missing-file line, with a local path, when the gating checks never ran in that scratch folder, and the set still ends with status 0; the later units run their quick check that way. The rest are small: in the self-test, a region comment that files two groups of cases under the wrong set, four lines and stops with no asserting case and five labels that name a step or state the opposite of their rule; in the tool folder, a file a staged rename moves into the documents folder not counted as outside it; in the rewrite set, the per-ref verification's baseline check run after the deliveries are written, and two error streams still open; in the clone set, one error stream and two statements of the plan; in the residual set, a convention that waits for a time a wait line may not print; in the readiness reads, three changed reads and one checksum write with no case. They touch the self-test, the tool folder, the rewrite set, the residual set, the clone set and the readiness reads. Next: every finding fixed, the folder saved and every step run again, then one more review limited to what changed."
      },
      {
        "pass": 4,
        "verdict": "changes-requested",
        "date": "2026-11-15",
        "at": "2026-11-15T06:52:02Z",
        "findings": {
          "test": 3,
          "code": 1
        },
        "severity": {
          "minor": 4,
          "other": 0
        },
        "route": "on-the-spot",
        "report": "build/reports/tests/index.html",
        "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/39-workspace-tools/f2745465/tests/index.html",
        "note": "This review was limited to the 15 tool files changed since Quality Review 3, and the five kinds were not run again: their totals (853 checks, none failed: gating 84, deterministic 63, component 92, integration 579, nonfunctional 28, and 7 of the coverage check), every last line as recorded, no stray console line and no label printed twice, were verified from the records the last run left, and only the coverage check was run, once (7 checks, 393 of 393 sites reached). 4 findings (4 minor; 3 test, 1 code). Every finding of Quality Review 3 is closed, the quick-check defect included: a kind run where no run was started now prints case lines only, and a case asserts it. The four left are all in the plan's wording, none in a tool: in the rewrite set, a sentence said the post-run step discards a message it does not, and now says the step checks its two records first; in the self-test, two limits were not stated (no case provokes the messages the post-run step discards behind checks that stop first; no fixture path holds a pattern character, so no case tells the residual close-out's literal strip from a pattern match), and two rounded run times were behind the recorded ones. They touch the self-test, the rewrite set and the residual set. All four were reworded in the plan, fixed in place with no additional review: no pin moved and nothing was run again."
      }
    ],
    "qaMax": 3,
    "waitingOn": null,
    "resume": null,
    "blockers": {
      "waitsOn": [],
      "blocks": []
    },
    "landing": null,
    "outages": [
      {
        "step": "plan",
        "since": "2026-11-14T05:20:13Z",
        "ended": "2026-11-14T05:28:10Z",
        "reason": "the process ended and the run was taken up again; it had ended three times earlier in the planning, at 01:19 to 01:45, 01:47 to 02:03 and about 04:10 to 04:12 (UTC)"
      },
      {
        "step": "document",
        "since": "2026-11-15T07:00:28Z",
        "ended": "2026-11-15T10:12:32Z",
        "reason": "the session ended and a new session took the run up"
      }
    ],
    "asked": [
      {
        "step": "remediation",
        "text": "The third review came back with changes requested: the test run was green (833 checks), with one real defect and about twenty small points. How should the work go on?",
        "options": [
          "Fix all, then one more review limited to what changed",
          "Fix all, with no further review",
          "Wording fixes only, and record the rest as follow-ups",
          "Stop here"
        ],
        "answer": null,
        "asked": "2026-11-14T21:19:36Z",
        "answered": "2026-11-14T21:23:04Z"
      }
    ],
    "waits": [
      {
        "step": "remediation",
        "since": "2026-11-14T21:19:36Z",
        "ended": "2026-11-14T21:23:04Z",
        "by": "halted"
      }
    ],
    "document": {
      "tasks": [
        {
          "id": "documentation-review",
          "name": "Review the tools' inline documentation",
          "state": "done",
          "started": "2026-11-15T06:54:35Z",
          "finished": "2026-11-15T10:17:44Z",
          "report": "A fresh documentation check ran over all 25 Appendix A tool files. Two findings, both already known from an earlier review pass: a stale header-comment claim in one script about check ordering, and a stale parenthetical in another script's function comment about a copy's source file. No other findings. Whether to fix these on the spot (which moves a pin and needs a rebuild and re-run) or record them as known gaps is being put to the user before the reconcile-documentation task closes."
        },
        {
          "id": "reconcile-documentation",
          "name": "Reconcile documentation",
          "state": "done",
          "started": "2026-11-15T10:17:44Z",
          "finished": "2026-11-15T11:37:22Z",
          "report": "The tools folder is saved again from the plan at pin list 60f5760b…31bf and every step run again on the real workspace, with no stop and nothing differing from the plan's expected lines. All 24 pinned files are at their pins. The gating tests 84, the deterministic tests 63, the component tests 92, the integration tests 579, the nonfunctional tests 28 and the coverage check 7 (393 expectations and stops reached), no failure, between 11:09Z and 11:35Z. The earlier tools folder is at its pins before and after, and the three earlier record files are unchanged. The as-built record's statements that waited on this run are being filled in."
        },
        {
          "id": "reconcile-plan",
          "name": "Reconcile plan",
          "state": "done",
          "started": "2026-11-15T10:44:59Z",
          "finished": "2026-11-15T11:44:39Z",
          "report": "The as-built record describes the build on the final pins (pin list 60f5760b…31bf) with two deviations: the five reworded header comments with the folder saved and run again, and the gating tests run in the background. The consequences are reconciled: the outcome of each assumption, the known gaps (three printed labels' wording, the two self-test limits), and the earlier unit's consequences carry 31 dated notes, the tracking unit's its link line. The plan's text now names the runner's end line after a step's STAGE line and the empty self-test folder a run leaves. The README does not change and the CHANGELOG takes no entry: the landing carries documents and boards only and no version moves."
        },
        {
          "id": "readme-changelog",
          "name": "README and CHANGELOG",
          "state": "done",
          "finished": "2026-11-15T11:44:39Z",
          "report": "The as-built record describes the build on the final pins (pin list 60f5760b…31bf) with two deviations: the five reworded header comments with the folder saved and run again, and the gating tests run in the background. The consequences are reconciled: the outcome of each assumption, the known gaps (three printed labels' wording, the two self-test limits), and the earlier unit's consequences carry 31 dated notes, the tracking unit's its link line. The plan's text now names the runner's end line after a step's STAGE line and the empty self-test folder a run leaves. The README does not change and the CHANGELOG takes no entry: the landing carries documents and boards only and no version moves."
        },
        {
          "id": "state-boards",
          "name": "State boards",
          "state": "done",
          "started": "2026-11-15T11:44:39Z",
          "finished": "2026-11-15T11:55:55Z"
        },
        {
          "id": "document-landing",
          "name": "Document commit",
          "state": "done",
          "started": "2026-11-15T11:55:55Z",
          "finished": "2026-11-15T12:00:11Z"
        }
      ]
    }
  },
  "milestones": [
    {
      "column": "gap",
      "label": "Research verified, in #27's run",
      "date": "2026-11-13",
      "ref": "../research/README.md",
      "note": "written on this board when the run started, from #27's research question on the tools and its findings, and its architecture's current state of the workspace tools and records (§2.3), with this unit's design in §7 and its row in §16"
    },
    {
      "column": "considered",
      "label": "Architecture signed off, in #27's run",
      "date": "2026-11-13",
      "ref": "../architecture.md",
      "note": "the options #27's architecture weighed for this unit: §7, §14, §15 and §16, with the tools findings' options for where the changed tools live; the unit's own plan adds to them at plan acceptance"
    },
    {
      "column": "verdict",
      "label": "Plan accepted",
      "date": "2026-11-14",
      "ref": "plan.md",
      "note": "five stages: a readiness stage that writes nothing but the unit's data file, the folder saved from the plan's 25 files and their pins, the self-test by test kind with its coverage check, the three repositories read once, and a close-out that shows both folders at their pins and the earlier records and the refs unchanged; nothing written to GitHub, to any repository or to any checkout; nothing needed research"
    },
    {
      "column": "built",
      "label": "Merged",
      "date": "2026-11-15",
      "ref": "PR #44",
      "note": "merged as ffb272c"
    }
  ],
  "trail": [
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Sized; the plan starts"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Nothing to research; the plan next"
    },
    {
      "date": "2026-11-14",
      "column": "verdict",
      "label": "Plan accepted",
      "ref": "plan.md"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Branch `docs/issue-39-extend-workspace-tools` cut; implementation starts at S0"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "S0 done; S1 current: The folder saved"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "S1 done; S2 current: The self-test"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "S2 done; S3 current: The three repositories read"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "S3 done; S4 current: Close-out"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Implementation done (5 stages); Quality Review next"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Quality Review 1: running"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Quality Review 1: changes requested, 32 findings (18 minor, 14 other; 22 test, 10 code)"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Resolution: 1 sub-step done; Save the folder again and run the steps current"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Resolution: 2 sub-steps done; Settle the one console line the gating checks printed current"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Resolution: 3 sub-steps done; Save the folder and run the affected steps once more current"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Resolution: 4 sub-steps done; every sub-step done"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Quality Review 2: running"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Quality Review 2: changes requested, 18 findings (16 minor, 2 other; 15 test, 3 code)"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Resolution of Quality Review 2: 1 sub-step done; Save the folder again and run every step current"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Resolution of Quality Review 2: 2 sub-steps done; every sub-step done"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Quality Review 3: running"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Quality Review 3: changes requested, 22 findings (20 minor, 2 other; 14 test, 8 code)"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Halted at Resolution: waiting on you (The way forward after the third review asked for changes.)"
    },
    {
      "date": "2026-11-14",
      "column": "built",
      "label": "Resumed at the Resolution of Quality Review 3"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Resolution of Quality Review 3: 1 sub-step done; Save the folder again and run every step current"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Resolution of Quality Review 3: 2 sub-steps done; every sub-step done"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Quality Review 4: running"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Quality Review 4: changes requested, 4 findings (4 minor; 3 test, 1 code)"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Document: Review the tools' inline documentation current"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Document: Reconcile documentation current"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Document: Reconcile documentation, Reconcile plan in parallel"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Document: Reconcile plan current"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Document: State boards current"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Document: Document commit current"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Document: every task done"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Landing: the land accepted"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Merge: merging it in PR #44",
      "ref": "PR #44"
    },
    {
      "date": "2026-11-15",
      "column": "built",
      "label": "Landed in PR #44, merge ffb272c",
      "ref": "PR #44"
    }
  ],
  "rows": [
    {
      "id": "tool-folder",
      "group": "The folder",
      "name": "A new, self-contained tool folder, saved from the plan and pinned",
      "system": "toolchain",
      "where": "`WS/tools/g27/`, new · `WS/tools/g26/`, read only",
      "gap": {
        "kind": "missing",
        "summary": "No tool folder serves BotTools, TrumpBot and Support. The earlier folder holds the GKB2 and GKB unit's 22 tools, each equal to its pin, and nearly every one of them changes for these repositories; an edit in place would make that unit's pins false, and its save step begins by removing the folder it saves into.",
        "evidence": [
          "`../architecture.md:144` — the earlier folder: the GKB2 and GKB unit's 22 tools, each equal to its pin, its parameter table with rows for GKB2 and GKB only",
          "`../research/tool-changes-for-three-repositories.md:19` — nearly every file changes, so a folder of changed files is the whole folder; an edit in place breaks the earlier pins, and the earlier save step removes its folder first",
          "`../research/tool-changes-for-three-repositories.md:434` — in place, the earlier unit's own pin check would stop and its as-built record would no longer hold"
        ],
        "source": "../architecture.md §2.3; ../research/tool-changes-for-three-repositories.md §1, §10",
        "link": "../architecture.md#23-the-workspace-tools-and-records"
      },
      "options": [
        {
          "id": "new-folder",
          "name": "A new, self-contained folder derived from the earlier one, saved by a step that writes only its own folder, from the unit's plan, which holds every file's source and pin",
          "verdict": "accepted",
          "why": "The earlier folder's pins stay the GKB2 and GKB unit's true record, and one pin table vouches for the whole new folder; the reused earlier tools and the stage runner are read at their existing pins and not saved again.",
          "source": "../architecture.md §7.1",
          "link": "../architecture.md#71-the-folder"
        },
        {
          "id": "in-place",
          "name": "Extending the earlier folder in place, with rows added and edits where these repositories differ",
          "verdict": "declined",
          "why": "The earlier unit's pins and as-built record stop being true, and its save step removes the folder it writes into before saving.",
          "source": "../architecture.md §15; ../research/tool-changes-for-three-repositories.md §10",
          "link": "../architecture.md#15-alternatives-considered"
        },
        {
          "id": "thin-folder",
          "name": "A thin folder holding only the changed files, sourcing the unchanged ones from the earlier folder",
          "verdict": "declined",
          "why": "At least 20 of the 22 files change anyway, so it saves a few files and ties the new tools to a folder that must not change.",
          "source": "../research/tool-changes-for-three-repositories.md §10",
          "link": "../research/tool-changes-for-three-repositories.md#10-options-for-where-the-changed-tools-live"
        },
        {
          "id": "tools-per-unit",
          "name": "Each part's tools written by the unit that runs them",
          "verdict": "declined",
          "why": "The gaps that guard a push must be closed before the first push, the four sets share one library and one self-test, and one pin table vouches for the folder only if one unit saves it.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "A new, self-contained folder, `tools/g27/`, was derived from the earlier one, which was left as it ran."
          },
          {
            "state": "amended",
            "text": "The folder's 25 files were saved by the one typed step twice: first from the plan as it then stood, at an earlier pin list, then from the revised appendix, once the comments of five files said what their code does, at the pin list the plan now records; the run measured is the second save's.",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "900fafee72a9"
            }
          },
          {
            "state": "as-planned",
            "text": "Every saved file and every reused tool held its recorded size and sha256, the folder held exactly the files its pin list names, every script parsed and every Python tool compiled, and the tool versions were as recorded; the documents tool reads a rename's source, so a file moved into the documents folder from outside it is a stop (96 checks after the save and again at the close-out, none failed)."
          },
          {
            "state": "as-planned",
            "text": "The earlier folder, the reused tools and the stage runner equalled their pins before the save and again at the close-out; the earlier folder was not edited, saved again or run."
          },
          {
            "state": "as-planned",
            "text": "The stage runner was read at its pin and not saved again."
          }
        ],
        "changes": [
          {
            "what": "The folder was saved twice. Its first save, from the plan as it then stood, carried an earlier pin list and comments in five files that did not describe their code; those comments were reworded in the plan's appendix, the folder was saved again at the pin list `60f5760b…31bf`, and every step after the save ran again over it, with the same totals and readings.",
            "why": "Each kind of the self-test stamps its collections with the pin list's sha256, and two of them refuse a stamp over other tool bytes, so the steps after the save run again on the new pins. Only comment lines changed: no code line, no case and none of the 393 expectations and stops.",
            "when": "Before the landing · the folder saved again and the steps after the save run again",
            "link": "../architecture.md#71-the-folder"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Derive a new, self-contained folder, `tools/g27/`, from the earlier one, and leave the earlier folder as it ran: its pins stay the GKB2 and GKB unit's record.",
            "ref": "plan.md#the-folder",
            "excerpt": {
              "ref": "plan.md#the-folder",
              "heading": "The folder",
              "paragraph": "`%USERPROFILE%\\BotWS\\tools\\g27\\` is a new, self-contained folder derived from `g26\\`. Nearly every file changes for these repositories (a parameter row has columns the tools read by position, the push held one branch in a dozen places, the repositories differ in visibility, webhooks and probes, and the documentation points touch almost every file), so the folder is the whole set of changed files. `g26\\` stays as it ran: its pins are the earlier unit's record, and an edit in place would make that record false. The folder is saved from Appendix A by a typed step that writes only `tools\\g27`, …",
              "hash": "d9a5fc2c4e82"
            }
          },
          {
            "text": "Save the folder's 25 files from the plan's appendix by one typed step that writes only that folder, byte for byte with carriage returns stripped, and prove the pin list's own sha256.",
            "ref": "plan.md#s1--the-folder-saved",
            "excerpt": {
              "ref": "plan.md#s1--the-folder-saved",
              "heading": "S1 — The folder saved",
              "paragraph": "`S1.save`: the unit's files are saved from this plan. This is the one call typed whole; it must run from the checkout that holds this plan. Every fenced block of Appendix A whose info string carries `file=<name>` becomes `$WS/tools/g27/<name>`, byte for byte, with carriage returns stripped. It removes nothing but `tools\\g27`, and then proves the pin list's own sha256 (the one Appendix B states).",
              "hash": "4425b25125d8"
            }
          },
          {
            "text": "Check every saved file and every reused tool against its size and sha256, require the folder to hold exactly the files its pin list names, and parse every script and compile every Python tool.",
            "ref": "plan.md#s1--the-folder-saved",
            "excerpt": {
              "ref": "plan.md#s1--the-folder-saved",
              "heading": "S1 — The folder saved",
              "paragraph": "`S1.save`: the unit's files are saved from this plan. This is the one call typed whole; it must run from the checkout that holds this plan. Every fenced block of Appendix A whose info string carries `file=<name>` becomes `$WS/tools/g27/<name>`, byte for byte, with carriage returns stripped. It removes nothing but `tools\\g27`, and then proves the pin list's own sha256 (the one Appendix B states).",
              "hash": "4425b25125d8"
            }
          },
          {
            "text": "Prove the earlier folder, the reused tools and the stage runner equal to their pins before the save and again at the close-out, and never edit, save again or run the earlier folder or its self-test.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written but the unit's data file.",
              "hash": "81cd5b304578"
            }
          },
          {
            "text": "Read the stage runner at its existing pin and never save it again.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No run of any rewrite, push, probe or replacement. Units 2, 3 and 4 run the sets this unit delivers; unit 1 proves them on made-up repositories and reads the three real ones. · No write to GitHub, no change to any repository, no read or touch of the TrumpBot clone, and no grant, allow line or request. · No change to `tools\\g26\\` or to the earlier units' records, no run of its tools or of its self-test, and no run of `k0-ready.sh` or `save-tools.sh` (the two workspace scripts that pin the earlier scan configuration). · No save of the stage runner. `tools\\run-stage.sh` is read at its existing …",
              "hash": "9bd82f2b98b4"
            }
          }
        ],
        "defense": "Nearly every file changes for these repositories and the earlier folder's pins are the earlier unit's as-built record, so one new folder under one pin table vouches for the whole set while that record stays true.",
        "steps": [
          {
            "id": "S0.g26",
            "what": "Check the earlier folder, the reused tools and the runner against their pins before anything is saved.",
            "check": "three `ok` lines",
            "link": "plan.md#s0--readiness"
          },
          {
            "id": "S1.save, S1.tools",
            "what": "Save the folder from the appendix, then check every file at its pin, the folder's file set and the parse and compile checks.",
            "check": "`STAGE S0.tools OK`",
            "link": "plan.md#s1--the-folder-saved"
          },
          {
            "id": "S4.g26, S4.tools",
            "what": "Check both folders at their pins again at the close-out.",
            "check": "the same lines as at readiness",
            "link": "plan.md#s4--close-out"
          }
        ],
        "tests": [
          "gating — every script parses, every Python tool compiles, the folder equals its pin list, and the pin checks stop on each fault"
        ],
        "risks": [
          "A plan edited while the steps run saves different files: the save stops on the pin list's sha256, or the pin check on the file that differs (assumption A8)"
        ],
        "source": "plan.md The folder; S0 — Readiness; S1 — The folder saved; S4 — Close-out; Appendix B",
        "link": "plan.md#the-folder"
      }
    },
    {
      "id": "parameter-table",
      "group": "The folder",
      "name": "A repository's policy in data: the parameter rows and the grant's data",
      "system": "toolchain",
      "where": "the folder's parameter table and grant data · BotTools, TrumpBot, Support",
      "gap": {
        "kind": "debt",
        "summary": "The tools hold part of a repository's policy in their text. The parameter table has rows for GKB2 and GKB only, one branch each, read by position; the readiness, verification and close-out steps assume a public repository with no webhook; and the grant check and the self-test name GKB2, GKB, their issue or its branch outside the table.",
        "evidence": [
          "`../research/tool-changes-for-three-repositories.md:96` — the library reads 13 positional columns, holds one branch and names the earlier job and issue",
          "`../research/tool-changes-for-three-repositories.md:102` — the readiness step expects six earlier records and a public repository with no hooks, and names the issue, its branch and both targets in its grant check",
          "`../research/tool-changes-for-three-repositories.md:304` — two scripts besides the table name repositories",
          "`../architecture.md:147` — the tools assume one branch per repository, a public repository with no webhook and a positive control with probe arguments"
        ],
        "source": "../architecture.md §2.3, §14; ../research/tool-changes-for-three-repositories.md §6",
        "link": "../research/tool-changes-for-three-repositories.md#6-the-parameter-rows"
      },
      "options": [
        {
          "id": "policy-as-data",
          "name": "Per repository a row of the parameter table — its id, its branches in push order, its visibility, default branch and webhook count, the marker its first stage waits for, its purge list's pin, its refs and counts, its positive control's probe arguments — and the grant's job, issue, branch, actions and targets in a data file the running unit supplies",
          "verdict": "accepted",
          "why": "No script names a repository, an issue or a branch; a value the expectation rows hold is read from them, so it has one source; and a fourth repository is a row.",
          "source": "../architecture.md §7.1, §7.3, §14",
          "link": "../architecture.md#14-extension-and-stability"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "The parameter table holds the three rows, saved at its pin, and each row equalled its repository's data and what GitHub reports when the three repositories were read."
          },
          {
            "state": "as-planned",
            "text": "The heads, the residual, the private flag and the expected tally are derived from the row, and their deterministic cases passed."
          },
          {
            "state": "as-planned",
            "text": "Every step takes the unit's own values from the data file `G27_UNIT` names, with no default, and stops on every missing key and every value of the wrong form, each with a case that passed."
          },
          {
            "state": "as-planned",
            "text": "The grant check reads its job, issue, branch, actions and targets from that data file, matches each target as a whole word and names none of them; its cases on made-up permissions files passed."
          },
          {
            "state": "as-planned",
            "text": "This unit's data file was written at readiness, with no grant."
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Hold one row per repository in the parameter table — its id, visibility, default branch, branches in push order, the stage-8 marker it waits for, its purge list's pin, pull-request refs, every-ref commits, sample bound, webhook count, scanning status and probe arguments — and read every value the expectation rows hold from them.",
            "ref": "plan.md#the-parameter-table",
            "excerpt": {
              "ref": "plan.md#the-parameter-table",
              "heading": "The parameter table",
              "paragraph": "`params.txt` holds one row per repository, space separated; policy is data, never inline in a command. A value that exists in the expectation rows is read from them, so each value has one source; a count another column fixes is derived or proven equal.",
              "hash": "b4f6ffb85e87"
            }
          },
          {
            "text": "Derive the heads, the residual, the private flag and the expected tally of N forced refs from the row, never type them.",
            "ref": "plan.md#the-parameter-table",
            "excerpt": {
              "ref": "plan.md#the-parameter-table",
              "heading": "The parameter table",
              "paragraph": "`params.txt` holds one row per repository, space separated; policy is data, never inline in a command. A value that exists in the expectation rows is read from them, so each value has one source; a count another column fixes is derived or proven equal.",
              "hash": "b4f6ffb85e87"
            }
          },
          {
            "text": "Give every step its job, issue, home repository, branch, actions, targets and record folders from the running unit's data file, named by `G27_UNIT` with no default, and stop on a file that lacks a key or holds a value of the wrong form.",
            "ref": "plan.md#the-running-units-data-file",
            "excerpt": {
              "ref": "plan.md#the-running-units-data-file",
              "heading": "The running unit's data file",
              "paragraph": "Every step reads one data file, named by the environment value `G27_UNIT` (a path in mixed form, with no default, so that no two units share one). Key=value lines; a line that starts with `#` is a comment:",
              "hash": "a4519c548ff3"
            }
          },
          {
            "text": "Have the grant check read its job, issue, branch, actions and targets from that data file, match each target as a whole word, and name none of them itself.",
            "ref": "plan.md#the-grant-check",
            "excerpt": {
              "ref": "plan.md#the-grant-check",
              "heading": "The grant check",
              "paragraph": "`s0-ready.sh grant` reads the request service's permissions file for the home repository (found by the glob `\"$P_HOME\"/.claude/*/temp-permissions/<owner>-<name>.md`, which names no service, the file name taken from `home`). It extracts the section of the unit's job (from its `## <job>` line to the next `## ` line, blank lines dropped) and stops, with nothing written, unless: the file exists; the section exists once (a missing section and a repeated one both fail); its `Granted:` line is a date (`YYYY-MM-DD`); its `Permissions:` line names every action of the data file (whole words); its …",
              "hash": "26bf89a3335d"
            }
          },
          {
            "text": "Write this unit's own data file at readiness, with no grant.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written but the unit's data file.",
              "hash": "81cd5b304578"
            }
          }
        ],
        "defense": "No script names a repository, an issue or a branch, each value has one source, and a fourth repository is a row; each later unit brings its own data file and record folder.",
        "steps": [
          {
            "id": "S0.unit",
            "what": "Write the unit's data file.",
            "check": "`ok    the unit's data file is written`",
            "link": "plan.md#s0--readiness"
          },
          {
            "id": "S1.save",
            "what": "Save the parameter table with the three rows, with the rest of the folder.",
            "check": "its pin",
            "link": "plan.md#s1--the-folder-saved"
          },
          {
            "id": "S3.inputs",
            "what": "Prove each row against the data.",
            "check": "`STAGE S0.inputs OK`",
            "link": "plan.md#s3--the-three-repositories-read"
          }
        ],
        "tests": [
          "deterministic — the real table's three rows and everything derived from them, the unit file's reading and the grant's target match",
          "component — the grant check on made-up permissions files, and the row's own stops",
          "gating — the unit's data file and its stops; no script of the folder names a repository, a branch or an issue"
        ],
        "risks": [
          "A row that differs from what its repository reports stops the readiness reads before anything depends on it, and is corrected by a new version of the table"
        ],
        "source": "plan.md The parameter table; The running unit's data file; The grant check",
        "link": "plan.md#the-parameter-table"
      }
    },
    {
      "id": "rewrite-set",
      "group": "The tool sets",
      "name": "The rewrite set: readiness, stages 1 to 8, the reset, and the push with its reply and classes",
      "system": "toolchain",
      "where": "the rewrite set · run by #40",
      "gap": {
        "kind": "missing",
        "summary": "The rewrite steps push one branch and assume a repository like GKB2. BotTools and TrumpBot each have two branches, and the push holds one branch in a dozen places across the request builder, the push step, the library and the reset; the positive control expects probe arguments and a control record that BotTools and Support do not have; the verification expects a public repository; and nothing counts BotTools' webhook deliveries.",
        "evidence": [
          "`../research/tool-changes-for-three-repositories.md:66` — heads per repository: 2 for BotTools, 2 for TrumpBot, 1 for Support",
          "`../research/tool-changes-for-three-repositories.md:37` — the two-branch push touches the request builder, the push step, the library and the reset",
          "`../research/tool-changes-for-three-repositories.md:104` — the positive control expects a non-empty probe list and a control record; BotTools and Support have neither",
          "`../research/tool-changes-for-three-repositories.md:109` — the per-ref verification requires a public repository",
          "`../research/tool-changes-for-three-repositories.md:107` — no baseline of webhook deliveries at the push preparation"
        ],
        "source": "../architecture.md §7.2, §7.3; ../research/tool-changes-for-three-repositories.md §3, §5",
        "link": "../research/tool-changes-for-three-repositories.md#3-inventory-what-each-tool-does-what-it-assumes-what-changes"
      },
      "options": [
        {
          "id": "atomic-lease-push",
          "name": "One request per repository carrying one atomic lease push of every changed branch: one lease and one refspec per branch, exactly one `--atomic`, the tally derived from the branch count, and a read-back after any non-zero status that names neither, both or partial",
          "verdict": "accepted",
          "why": "A stale lease or a refusal on one branch sends nothing, Support takes the same path with one lease, and a partial state hands back rather than being repaired by another push.",
          "source": "../architecture.md §7.3, §8.2, §8.3",
          "link": "../architecture.md#73-what-changes-against-the-earlier-tools"
        },
        {
          "id": "push-without-atomic",
          "name": "One push of both branches without `--atomic`",
          "verdict": "declined",
          "why": "Every failure that concerns one branch leaves a half-rewritten repository, whose only repair is a second force-push.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        },
        {
          "id": "push-per-branch",
          "name": "One push per branch, as two requests or two pushes in one request",
          "verdict": "declined",
          "why": "It makes the half-rewritten repository an ordinary state between the two pushes, doubles the requests, and keeps the same race window in each push.",
          "source": "../architecture.md §15; ../research/tool-changes-for-three-repositories.md §5.4",
          "link": "../architecture.md#15-alternatives-considered"
        },
        {
          "id": "mirror-or-force",
          "name": "`--mirror`, `--force` or a `+` refspec",
          "verdict": "declined",
          "why": "git ignores a lease under each, and `--mirror` would delete a server branch created after the clone.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "The push request builder was saved at its pin with the atomic lease push of N branches and its argument assertions, and its deterministic and component cases passed."
          },
          {
            "state": "as-planned",
            "text": "The request's six entries are run as one shell by the request service's stand-in, and every stop of the push procedure has a case that carries its fault out through the stand-in, its fault fixtures on an address that cannot resolve (integration 579 checks, 0 failed)."
          },
          {
            "state": "as-planned",
            "text": "The classifier and the plan's class table state one rule; every class and every read-back state, an unreadable listing of the pull-request refs or of the heads included, has its cases, all passing."
          },
          {
            "state": "as-planned",
            "text": "The resend rule was built as the table states it: a refusal by the request service with every branch at its new tip is recorded as a landed push, and a request made after a reply not yet classed stops, each with its case."
          },
          {
            "state": "as-planned",
            "text": "The reply store takes the delivered form and numbers a reply after the highest one stored; an unreadable reply stops plainly with no class kept, as its cases show."
          },
          {
            "state": "as-planned",
            "text": "Each repository's first stage waits on the previous repository's stage-8 marker named in its row."
          },
          {
            "state": "as-planned",
            "text": "The webhook count, snapshot and delivery counts are checked after BotTools' push, a failed read of the count being a stop, with cases for every stop of stage 7; the per-ref verification checks its deliveries baseline before it writes the count; the post-run step checks its log and purge list first; the checksum lists of the post-run, exit and close-out steps check each listed file and the write's status, and no error stream is left open."
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Build one push request per repository carrying one atomic lease push of every changed branch: exactly one `--atomic`, one lease and one refspec per branch, the expected tally of N forced refs, no forbidden argument and no commit id in the request.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The rewrites unit sends one request per repository carrying one atomic lease push of N branches, N taken from `ref-map`'s changed heads (2, 2 and 1). The tools build it, class its outcome and read the server back; the plan states the contract.",
              "hash": "09095e2321ee"
            }
          },
          {
            "text": "Run the request's six entries as one shell, each guard ending it, with `gh` the only credential helper, and keep both streams of each run in the data folder, never printed.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The rewrites unit sends one request per repository carrying one atomic lease push of N branches, N taken from `ref-map`'s changed heads (2, 2 and 1). The tools build it, class its outcome and read the server back; the plan states the contract.",
              "hash": "09095e2321ee"
            }
          },
          {
            "text": "Class the outcome by one rule, in the plan's table and the classifier alike: markers first, a reply that ran no stage from its status alone, then every branch read back and the state named neither, both or partial.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The rewrites unit sends one request per repository carrying one atomic lease push of N branches, N taken from `ref-map`'s changed heads (2, 2 and 1). The tools build it, class its outcome and read the server back; the plan states the contract.",
              "hash": "09095e2321ee"
            }
          },
          {
            "text": "Send a request again only after a transport failure, a guard's stop or a refusal by the request service, with the state neither and the pull-request refs unchanged; hand back on every other class.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The rewrites unit sends one request per repository carrying one atomic lease push of N branches, N taken from `ref-map`'s changed heads (2, 2 and 1). The tools build it, class its outcome and read the server back; the plan states the contract.",
              "hash": "09095e2321ee"
            }
          },
          {
            "text": "Store a reply in the form the request service delivers, its printed lines one to a line, and stop plainly, keeping no class, on a reply with no printed line or none of the procedure's own markers.",
            "ref": "plan.md#the-stored-reply",
            "excerpt": {
              "ref": "plan.md#the-stored-reply",
              "heading": "The stored reply",
              "paragraph": "`p6-push.sh reply STATUS` (STATUS: `done`, `failed`, `refused` or `stopped`) takes the reply in the form the service delivers, on standard input: a line of text and one JSON document `{v, id, attempt, reply, lane, position, result, reason, waitingOn}`. The printed lines are read from `result.printed` and from any other list of strings under `result`, each string split on its newlines, and stored one to a line behind a `status=` header; text with no JSON document is taken as the printed lines themselves, one to a line, but text that holds a `{` and no document that parses as a JSON object (a …",
              "hash": "0f06af485004"
            }
          },
          {
            "text": "Gate each repository's first stage on the previous repository's stage-8 marker, named in its row.",
            "ref": "plan.md#the-parameter-table",
            "excerpt": {
              "ref": "plan.md#the-parameter-table",
              "heading": "The parameter table",
              "paragraph": "`params.txt` holds one row per repository, space separated; policy is data, never inline in a command. A value that exists in the expectation rows is read from them, so each value has one source; a count another column fixes is derived or proven equal.",
              "hash": "b4f6ffb85e87"
            }
          },
          {
            "text": "Check BotTools' webhook count, its snapshot and its delivery counts after its push.",
            "ref": "plan.md#the-closure-table",
            "excerpt": {
              "ref": "plan.md#the-closure-table",
              "heading": "The closure table",
              "paragraph": "One row per gap, follow-up and documentation point of the earlier unit's consequences, §5 and §6, and per related deviation of its as-built record, in the order of what guards a write. The case labels are the `ok` lines of the self-test (abbreviated to the behaviour); the note column is what the dated note on the earlier unit's consequences says at the landing.",
              "hash": "31142bcc3f49"
            }
          }
        ],
        "defense": "A stale lease or a refusal on one branch then sends nothing, Support takes the same path with one lease, a lost answer is settled by reading the server, and a push is never repeated blindly.",
        "steps": [
          {
            "id": "S1.save",
            "what": "Save the readiness tool, steps 1 to 8, the reset, the push request builder with its reply store and classifier, and the close-out.",
            "check": "their pins",
            "link": "plan.md#s1--the-folder-saved"
          },
          {
            "id": "S2.integration",
            "what": "Run three made-up repositories through steps 1 to 8 against stand-ins for GitHub and the request service, every class of the push included.",
            "check": "`ok    gselftest integration: 420 checks passed`",
            "link": "plan.md#s2--the-self-test"
          }
        ],
        "tests": [
          "deterministic — the classifier's rule over every class, the request's fields and argument assertions, the reply's extraction",
          "component — the classifier over made-up streams of every class, the reply store, the server's state read as neither, both, partial and unreadable",
          "integration — steps 1 to 8 on made-up repositories, every class of the push and every stop of every step"
        ],
        "risks": [
          "The stand-ins model GitHub, not GitHub: the first real refusal or lost connection checks the markers' live wording, and a reply they do not explain is unclassified and stops (assumption A12)",
          "A partial state is not expected under `--atomic`; if it comes, the repository is handed back with a reading per branch and nothing is pushed without a person's decision"
        ],
        "source": "plan.md The push; The stored reply; The parameter table; The closure table, rows 1 to 12",
        "link": "plan.md#the-push"
      }
    },
    {
      "id": "residual-set",
      "group": "The tool sets",
      "name": "The residual set: stage 9 and the feed reads after the last push",
      "system": "toolchain",
      "where": "the residual set · run by #41",
      "gap": {
        "kind": "missing",
        "summary": "Stage 9 runs right after each push, and the order gate waits for it. The gate between repositories tests the previous repository's stage 9, which would hold TrumpBot's push until BotTools' probes and feed reads have run; and stage 9 runs its anonymous probes whatever the repository's visibility.",
        "evidence": [
          "`../architecture.md:148` — the order gate between repositories tests the other repository's stage 9",
          "`../research/tool-changes-for-three-repositories.md:361` — the gate requires the other repository's stage 9, which would hold TrumpBot's push until BotTools' probes and feeds have run",
          "`../research/tool-changes-for-three-repositories.md:111` — stage 9 runs the anonymous budget, batches and feeds whatever the visibility"
        ],
        "source": "../architecture.md §2.3, §7.3; ../research/tool-changes-for-three-repositories.md §8",
        "link": "../research/tool-changes-for-three-repositories.md#8-the-split-into-parts-and-the-residual-set-as-its-own-set"
      },
      "options": [
        {
          "id": "own-set-gate-at-stage-8",
          "name": "A set of its own that starts once all three repositories have passed stage 8, the order gate between repositories moved to stage 8 with its marker's name a column of the table, and the probes selected by visibility: the authenticated batches and feed reads only for a private repository",
          "verdict": "accepted",
          "why": "Each push waits only for the previous repository's verification, and the measurement runs over all three repositories after the last push.",
          "source": "../architecture.md §7.2, §7.3",
          "link": "../architecture.md#72-the-four-tool-sets"
        },
        {
          "id": "stage-9-after-each-push",
          "name": "Stage 9 right after each push, inside the rewrites, as for GKB2 and GKB",
          "verdict": "declined",
          "why": "It belongs to another system, it holds the next repository's push for probes and feed reads, and the events lag by up to 6 hours, so reads made minutes after a push are mostly not valid.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        },
        {
          "id": "anonymous-probes-private",
          "name": "Anonymous probes of the private repositories",
          "verdict": "declined",
          "why": "Every anonymous answer is \"not found\" whatever the repository holds.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "The residual set's readiness was saved at its pin, checking the followed unit's stage-8 markers, records and rewritten tips, with a case for each stop."
          },
          {
            "state": "as-planned",
            "text": "Step 9 selects its probes by the row's visibility, the anonymous ones for a public repository only, with cases for a private repository."
          },
          {
            "state": "as-planned",
            "text": "Every batch is bracketed by controls and void when its closing controls fail, a budget reading that disagrees with the calls is recorded, and a missing rate-limit header gives a wait line that names what could not be read and no date, which the plan's conventions explain; their cases passed."
          },
          {
            "state": "as-planned",
            "text": "The second feed reads wait at least the gap after the first, timed against the same step with none; a failed web read is recorded as not read and prints no path; every close-out step is safe to run twice and checks its checksum lists file by file, and the record step strips a folder prefix literally, with cases that run each twice."
          },
          {
            "state": "as-planned",
            "text": "The pace, the feed gap, the poll, the margin, the call maxima and the events' window are constants of the library; the nonfunctional tests passed (28 checks, 0 failed)."
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Start the set only once every repository named holds its stage-8 marker in the followed unit's records, those records equal their checksum list and every branch is at its rewritten tip.",
            "ref": "plan.md#the-residual-set",
            "excerpt": {
              "ref": "plan.md#the-residual-set",
              "heading": "The residual set",
              "paragraph": "Readiness (`r0-ready.sh`). `markers`: the unit follows another unit's records and every repository named holds its stage-8 marker there. `reads`: the followed unit's records equal their checksum list, every branch of each repository is at its rewritten tip and its pull-request refs are as recorded. `budget`: a token is available from `gh`, and the anonymous REST budget covers the public repositories among those named (each one's step 9 and its second feed read plus the margin; a short budget is one `WAIT` line and status 4). · Step 9 (`p9-residual.sh`). Needs the repository's stage-8 marker …",
              "hash": "1320796474dc"
            }
          },
          {
            "text": "Select the probes by the row's visibility: the authenticated batches and feed reads for every repository, the anonymous budget check, batches and feed reads for a public one only.",
            "ref": "plan.md#the-residual-set",
            "excerpt": {
              "ref": "plan.md#the-residual-set",
              "heading": "The residual set",
              "paragraph": "Readiness (`r0-ready.sh`). `markers`: the unit follows another unit's records and every repository named holds its stage-8 marker there. `reads`: the followed unit's records equal their checksum list, every branch of each repository is at its rewritten tip and its pull-request refs are as recorded. `budget`: a token is available from `gh`, and the anonymous REST budget covers the public repositories among those named (each one's step 9 and its second feed read plus the margin; a short budget is one `WAIT` line and status 4). · Step 9 (`p9-residual.sh`). Needs the repository's stage-8 marker …",
              "hash": "1320796474dc"
            }
          },
          {
            "text": "Bracket every batch with controls and void it when its closing controls fail, and record a budget reading that disagrees with the calls the step can make.",
            "ref": "plan.md#the-residual-set",
            "excerpt": {
              "ref": "plan.md#the-residual-set",
              "heading": "The residual set",
              "paragraph": "Readiness (`r0-ready.sh`). `markers`: the unit follows another unit's records and every repository named holds its stage-8 marker there. `reads`: the followed unit's records equal their checksum list, every branch of each repository is at its rewritten tip and its pull-request refs are as recorded. `budget`: a token is available from `gh`, and the anonymous REST budget covers the public repositories among those named (each one's step 9 and its second feed read plus the margin; a short budget is one `WAIT` line and status 4). · Step 9 (`p9-residual.sh`). Needs the repository's stage-8 marker …",
              "hash": "1320796474dc"
            }
          },
          {
            "text": "Read each repository's feeds a second time at least six minutes after the first, and make every close-out step safe to run twice, writing the second reads once.",
            "ref": "plan.md#the-residual-set",
            "excerpt": {
              "ref": "plan.md#the-residual-set",
              "heading": "The residual set",
              "paragraph": "Readiness (`r0-ready.sh`). `markers`: the unit follows another unit's records and every repository named holds its stage-8 marker there. `reads`: the followed unit's records equal their checksum list, every branch of each repository is at its rewritten tip and its pull-request refs are as recorded. `budget`: a token is available from `gh`, and the anonymous REST budget covers the public repositories among those named (each one's step 9 and its second feed read plus the margin; a short budget is one `WAIT` line and status 4). · Step 9 (`p9-residual.sh`). Needs the repository's stage-8 marker …",
              "hash": "1320796474dc"
            }
          },
          {
            "text": "Keep the pace, the feed gap, the poll, the anonymous margin, the call maxima and the events' window as constants of the library.",
            "ref": "plan.md#the-residual-set",
            "excerpt": {
              "ref": "plan.md#the-residual-set",
              "heading": "The residual set",
              "paragraph": "Readiness (`r0-ready.sh`). `markers`: the unit follows another unit's records and every repository named holds its stage-8 marker there. `reads`: the followed unit's records equal their checksum list, every branch of each repository is at its rewritten tip and its pull-request refs are as recorded. `budget`: a token is available from `gh`, and the anonymous REST budget covers the public repositories among those named (each one's step 9 and its second feed read plus the margin; a short budget is one `WAIT` line and status 4). · Step 9 (`p9-residual.sh`). Needs the repository's stage-8 marker …",
              "hash": "1320796474dc"
            }
          }
        ],
        "defense": "The measurement runs over all three repositories after the last push, each push waits only for the previous repository's verification, and a private repository is never probed anonymously.",
        "steps": [
          {
            "id": "S1.save",
            "what": "Save the residual set's readiness, step 9, the second feed reads and the record step.",
            "check": "their pins",
            "link": "plan.md#s1--the-folder-saved"
          },
          {
            "id": "S2.integration, S2.nonfunctional",
            "what": "Run the residual measurement and its close-out on the made-up repositories, then the pace, the spacing and the budget's wait.",
            "check": "each kind's total line",
            "link": "plan.md#s2--the-self-test"
          }
        ],
        "tests": [
          "component — every outcome of a probe batch, the feed reads and the webhook reads, every external call replaced",
          "integration — the residual measurement and its close-out, each close-out step run twice",
          "nonfunctional — the pace between probes, the spacing of the second feed read, the anonymous budget's wait and its reading against the calls"
        ],
        "risks": [
          "The events lag by up to 6 hours and cover 30 days: a read outside the window is recorded as not valid, never as absent"
        ],
        "source": "plan.md The residual set; The closure table, rows 13, 16, 18, 21 and 22",
        "link": "plan.md#the-residual-set"
      }
    },
    {
      "id": "clone-set",
      "group": "The tool sets",
      "name": "The clone set: the clone checks, the request builder and the fresh clone's proofs",
      "system": "toolchain",
      "where": "the clone set · run by #42 · the preparation unit's clone scripts, replaced",
      "gap": {
        "kind": "missing",
        "summary": "The preparation unit's clone scripts would stop on the TrumpBot clone as it is today. They reach the private repository through the system's credential helper rather than `gh`, stop on the clone's two hooks and its exclude entry, archive all 59 untracked or ignored files where only the four `.idea/` files are to be carried, and are plain scripts where the replacement runs as a request procedure in one shell.",
        "evidence": [
          "`../architecture.md:156` — the clone scripts move the clone, archive every file git does not track, stop on the two hooks and the exclude entry, and use the system's credential helper",
          "`../research/tool-changes-for-three-repositories.md:393` — the no-hooks and no-excludes checks stop on today's clone",
          "`../research/tool-changes-for-three-repositories.md:397` — the archive takes in 59 files, 55 of them the graph the fresh clone must not carry",
          "`../research/tool-changes-for-three-repositories.md:423` — the blocks rely on an environment loaded beforehand, where a request runs its procedure as one shell"
        ],
        "source": "../architecture.md §2.3, §7.3; ../research/tool-changes-for-three-repositories.md §9",
        "link": "../research/tool-changes-for-three-repositories.md#9-the-clone-scripts-against-the-clone-as-it-is-today"
      },
      "options": [
        {
          "id": "request-procedures",
          "name": "The clone scripts rebuilt as request procedures written by a builder: each entry setting what it uses and each guard ending the shell, `gh` the only credential helper, the carried and the not-carried folder policy values, the move target a parameter, the hooks and the exclude entry recorded rather than stops, and every error of `mv`, `rm`, `tar` and `git` written to a file and counted",
          "verdict": "accepted",
          "why": "The replacement then runs as the request service runs it, carries only the four `.idea/` files, and keeps the paths its errors name out of its output.",
          "source": "../architecture.md §7.2, §7.3",
          "link": "../architecture.md#73-what-changes-against-the-earlier-tools"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "The clone set takes its policy values from the unit's data file, the carried and the other folder as plain names matched literally."
          },
          {
            "state": "as-planned",
            "text": "The census and its closed-set guard were built: a file outside the two folders stops, a count that differs inside them is recorded, a missing census record never compares equal, the archive step stops when there is no census, and the carried-file checksum loop prints no path."
          },
          {
            "state": "as-planned",
            "text": "The replacement, the way back and the deletion are built as request procedures by a builder that asserts no entry pushes, resets, forces or sets a credential, and the replacement's eight entries ran as one shell in its case."
          },
          {
            "state": "as-planned",
            "text": "The rename reads its outcome from the two paths in a bounded retry that follows only a clean refusal, and refuses across volumes or onto a present target, with cases for each."
          },
          {
            "state": "as-planned",
            "text": "The proofs before the deletion and the read-back after the graph build passed their cases on made-up clones, the graph note matched to its entry literally and the set's four cases that run in a subshell counted in the total."
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Take the clone's policy values — the carried and the other folder, their expected counts, the move target, the rename's tries and spacing, the graph's hooks — from the unit's data file.",
            "ref": "plan.md#the-clone-set",
            "excerpt": {
              "ref": "plan.md#the-clone-set",
              "heading": "The clone set",
              "paragraph": "Policy values come from the unit's data file: `carried_dir` (`.idea`), `other_dir` (`graphify-out`), `expect_carried` (4), `expect_other` (55), `move_to` (`TrumpBot-old`, a folder beside the clone), `rename_tries` (5) and `rename_gap` (2 s: the retry's bound and spacing), `graph_hooks` (`post-checkout,post-commit`). · The census (`k1-clone.sh census`). It records every file git does not track, by folder (counted with no `--exclude-standard`, so the graph's ignored files count), the hooks beyond the samples (name, size, sha256), the exclude file's non-comment lines (count and sha256) and the …",
              "hash": "9d37d4073db8"
            }
          },
          {
            "text": "Record a census of every file git does not track, the hooks, the exclude lines and the local keys; stop on any file outside the two folders, and record a count that differs inside them.",
            "ref": "plan.md#the-clone-set",
            "excerpt": {
              "ref": "plan.md#the-clone-set",
              "heading": "The clone set",
              "paragraph": "Policy values come from the unit's data file: `carried_dir` (`.idea`), `other_dir` (`graphify-out`), `expect_carried` (4), `expect_other` (55), `move_to` (`TrumpBot-old`, a folder beside the clone), `rename_tries` (5) and `rename_gap` (2 s: the retry's bound and spacing), `graph_hooks` (`post-checkout,post-commit`). · The census (`k1-clone.sh census`). It records every file git does not track, by folder (counted with no `--exclude-standard`, so the graph's ignored files count), the hooks beyond the samples (name, size, sha256), the exclude file's non-comment lines (count and sha256) and the …",
              "hash": "9d37d4073db8"
            }
          },
          {
            "text": "Build the replacement, the way back and the deletion as request procedures, each entry ending the shell on a failure and the destructive commands in the script, every error written to a file and counted, and assert that no entry holds a push, a reset, a force or a credential setting.",
            "ref": "plan.md#the-clone-set",
            "excerpt": {
              "ref": "plan.md#the-clone-set",
              "heading": "The clone set",
              "paragraph": "Policy values come from the unit's data file: `carried_dir` (`.idea`), `other_dir` (`graphify-out`), `expect_carried` (4), `expect_other` (55), `move_to` (`TrumpBot-old`, a folder beside the clone), `rename_tries` (5) and `rename_gap` (2 s: the retry's bound and spacing), `graph_hooks` (`post-checkout,post-commit`). · The census (`k1-clone.sh census`). It records every file git does not track, by folder (counted with no `--exclude-standard`, so the graph's ignored files count), the hooks beyond the samples (name, size, sha256), the exclude file's non-comment lines (count and sha256) and the …",
              "hash": "9d37d4073db8"
            }
          },
          {
            "text": "Read a rename's outcome from which of the two paths exists, in a bounded retry, never from the move's status, and refuse it unless the target is absent and both paths are on one volume.",
            "ref": "plan.md#the-clone-set",
            "excerpt": {
              "ref": "plan.md#the-clone-set",
              "heading": "The clone set",
              "paragraph": "Policy values come from the unit's data file: `carried_dir` (`.idea`), `other_dir` (`graphify-out`), `expect_carried` (4), `expect_other` (55), `move_to` (`TrumpBot-old`, a folder beside the clone), `rename_tries` (5) and `rename_gap` (2 s: the retry's bound and spacing), `graph_hooks` (`post-checkout,post-commit`). · The census (`k1-clone.sh census`). It records every file git does not track, by folder (counted with no `--exclude-standard`, so the graph's ignored files count), the hooks beyond the samples (name, size, sha256), the exclude file's non-comment lines (count and sha256) and the …",
              "hash": "9d37d4073db8"
            }
          },
          {
            "text": "Prove the fresh clone before the deletion is requested, and read it back after the graph build, recording every difference.",
            "ref": "plan.md#the-clone-set",
            "excerpt": {
              "ref": "plan.md#the-clone-set",
              "heading": "The clone set",
              "paragraph": "Policy values come from the unit's data file: `carried_dir` (`.idea`), `other_dir` (`graphify-out`), `expect_carried` (4), `expect_other` (55), `move_to` (`TrumpBot-old`, a folder beside the clone), `rename_tries` (5) and `rename_gap` (2 s: the retry's bound and spacing), `graph_hooks` (`post-checkout,post-commit`). · The census (`k1-clone.sh census`). It records every file git does not track, by folder (counted with no `--exclude-standard`, so the graph's ignored files count), the hooks beyond the samples (name, size, sha256), the exclude file's non-comment lines (count and sha256) and the …",
              "hash": "9d37d4073db8"
            }
          }
        ],
        "defense": "The replacement then runs as the request service runs it, carries only the four `.idea/` files, never drops a file silently and keeps the paths its errors name out of its output; the preparation unit's clone scripts are superseded.",
        "steps": [
          {
            "id": "S1.save",
            "what": "Save the clone script and the builder of the three procedures.",
            "check": "their pins",
            "link": "plan.md#s1--the-folder-saved"
          },
          {
            "id": "S2.integration",
            "what": "Run the clone set on made-up clones, each procedure carried out as one shell.",
            "check": "`ok    gselftest integration: 420 checks passed`",
            "link": "plan.md#s2--the-self-test"
          }
        ],
        "tests": [
          "deterministic — the clone procedures' entries and assertions",
          "component — the clone builder's request, reply and outcome",
          "integration — the clone set on made-up clones, the replacement's eight entries carried out as one shell"
        ],
        "risks": [
          "The made-up clones are not the real clone: the clone replacement's census reads it first, a count that differs is recorded and a file outside the two folders stops (assumption A13)"
        ],
        "source": "plan.md The clone set",
        "link": "plan.md#the-clone-set"
      }
    },
    {
      "id": "self-test",
      "group": "The tool sets",
      "name": "The self-test, run by test kind",
      "system": "toolchain",
      "where": "the self-test · its quick gate run again by each later unit",
      "gap": {
        "kind": "debt",
        "summary": "The self-test runs as one script, with no selector, and stops at its first failure. A run takes 7.5 minutes; it reads the GKB2 and GKB rows by name for its probe arguments, assumes one branch and a public repository, and its stand-in for the request service runs each entry in its own shell, where the service runs the whole procedure in one.",
        "evidence": [
          "`../research/tool-changes-for-three-repositories.md:115` — the self-test reads the GKB2 and GKB rows by name, assumes one ref and a public repository, runs each entry in its own shell, as one script of 7.5 minutes",
          "`../research/tool-changes-for-three-repositories.md:299` — no selector, and it ends at its first failure",
          "`../research/tool-changes-for-three-repositories.md:303` — the stand-in runs each entry in its own shell; the request service runs one"
        ],
        "source": "../architecture.md §7.2; ../research/tool-changes-for-three-repositories.md §7.2",
        "link": "../research/tool-changes-for-three-repositories.md#72-the-other-recorded-gaps-and-follow-ups-by-file"
      },
      "options": [
        {
          "id": "by-test-kind",
          "name": "Every case run by test kind, each kind with its own total — the gating checks, the component tests, the integration tests, the deterministic cases and the non-functional cases — the group of pure functions the quick gate, and a stand-in that runs a procedure as one shell",
          "verdict": "accepted",
          "why": "Each later unit runs the quick gate again before its own work, and a case meets a procedure as the request service runs it.",
          "source": "../architecture.md §7.2, §7.3",
          "link": "../architecture.md#72-the-four-tool-sets"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "state": "amended",
            "text": "The self-test ran one test set at a time, each once with the total the plan records and none failed: gating 84, deterministic 63, component 92, integration 579, nonfunctional 28; then the coverage check passed (7 checks). Gating ran in the background, as integration and nonfunctional do, which lifts only the call's timeout.",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "900fafee72a9"
            }
          },
          {
            "state": "as-planned",
            "text": "The deterministic set is the quick gate each later unit runs again before it starts."
          },
          {
            "state": "as-planned",
            "text": "The request service's stand-in carries a procedure out as one shell after comparing the file's sha256 with the envelope's."
          },
          {
            "state": "as-planned",
            "text": "Every one of the 393 expectations and stops of the step scripts, of their `have` and `must` calls, of the library and of the procedures' shell text was reached as a stop by a case of its own script and arm, from collections stamped with this run and these tools; the stamp reads the run's id safely, and a set run where no run was started stamps an empty run, which the coverage check refuses. Two limits are stated in the plan: the messages the post-run step discards stand behind checks that stop first, so no case provokes them; and no fixture path holds a pattern character, so no case tells the residual close-out's literal strip from a pattern match."
          },
          {
            "state": "as-planned",
            "text": "The output rule is asserted over the collected output and over each set's own case lines; the console is captured from the first command and judged after the sandbox is removed, and no set printed a console line that is not a case, note or runner line, nor a label twice."
          }
        ],
        "changes": [
          {
            "what": "The gating set ran in the background, as the integration and nonfunctional sets do, and the three were read from the runner's captured output, which holds the lines the run log holds.",
            "why": "The plan's conventions run a call in the foreground with a 10-minute timeout and say that a busy machine may need gating in the background too. Running a set in the background lifts only the call's timeout: its lines, its total and its stamp are the same either way.",
            "when": "The measured run · S2, the self-test"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Run the self-test one test kind at a time — gating, deterministic, component, integration, nonfunctional — each ending with its total, then a coverage check.",
            "ref": "plan.md#the-self-test",
            "excerpt": {
              "ref": "plan.md#the-self-test",
              "heading": "The self-test",
              "paragraph": "`gselftest.sh KIND` runs one kind; each builds a sandbox (a user profile in miniature under the unit's scratch folder, with copies of the tools), runs its cases and removes the sandbox. Every case prints one `ok` line, the kind's last two cases check its own case lines and its console (the sandbox is removed before the console is judged, so that a removal error is judged with it), and the kind ends `ok gselftest <kind>: <n> checks passed`, the total of Appendix B, which counts every case the kind's `ok` lines show; the first failing case prints a `STOP` line and ends the run with status 1. …",
              "hash": "141e2b580ad0"
            }
          },
          {
            "text": "Make the deterministic kind the quick gate each later unit runs again before it starts.",
            "ref": "plan.md#the-self-test",
            "excerpt": {
              "ref": "plan.md#the-self-test",
              "heading": "The self-test",
              "paragraph": "`gselftest.sh KIND` runs one kind; each builds a sandbox (a user profile in miniature under the unit's scratch folder, with copies of the tools), runs its cases and removes the sandbox. Every case prints one `ok` line, the kind's last two cases check its own case lines and its console (the sandbox is removed before the console is judged, so that a removal error is judged with it), and the kind ends `ok gselftest <kind>: <n> checks passed`, the total of Appendix B, which counts every case the kind's `ok` lines show; the first failing case prints a `STOP` line and ends the run with status 1. …",
              "hash": "141e2b580ad0"
            }
          },
          {
            "text": "Have the request service's stand-in carry a procedure out as one shell, its entries joined in order, after comparing the file's sha256 with the envelope's.",
            "ref": "plan.md#the-self-test",
            "excerpt": {
              "ref": "plan.md#the-self-test",
              "heading": "The self-test",
              "paragraph": "`gselftest.sh KIND` runs one kind; each builds a sandbox (a user profile in miniature under the unit's scratch folder, with copies of the tools), runs its cases and removes the sandbox. Every case prints one `ok` line, the kind's last two cases check its own case lines and its console (the sandbox is removed before the console is judged, so that a removal error is judged with it), and the kind ends `ok gselftest <kind>: <n> checks passed`, the total of Appendix B, which counts every case the kind's `ok` lines show; the first failing case prints a `STOP` line and ends the run with status 1. …",
              "hash": "141e2b580ad0"
            }
          },
          {
            "text": "Require every expectation and every stop text of every step script to be reached as a stop by at least one case.",
            "ref": "plan.md#the-self-test",
            "excerpt": {
              "ref": "plan.md#the-self-test",
              "heading": "The self-test",
              "paragraph": "`gselftest.sh KIND` runs one kind; each builds a sandbox (a user profile in miniature under the unit's scratch folder, with copies of the tools), runs its cases and removes the sandbox. Every case prints one `ok` line, the kind's last two cases check its own case lines and its console (the sandbox is removed before the console is judged, so that a removal error is judged with it), and the kind ends `ok gselftest <kind>: <n> checks passed`, the total of Appendix B, which counts every case the kind's `ok` lines show; the first failing case prints a `STOP` line and ends the run with status 1. …",
              "hash": "141e2b580ad0"
            }
          },
          {
            "text": "Assert the output rule over every step's output and the self-test's own: no drive-letter path, no 40-digit id but the control, no token, no traceback.",
            "ref": "plan.md#the-output-rule",
            "excerpt": {
              "ref": "plan.md#the-output-rule",
              "heading": "The output rule",
              "paragraph": "The tools print counts, numbers, repository ids, statuses, rule ids, branch ordinals and fixed markers. Never printed or quoted, in a console line, a document, a request or a stored reply: a pre-rewrite commit id, a blob id, a path of the legacy guild data or of its logs, a member or guild name, a rule's match, a secret, a token, a machine-local path, or any line of a push's or a scan's streams. A request file may hold the paths a procedure must name (the mirror, the records folder, the tools folder, the workspace, the unit's data file, the clone's folder and its move target), because each …",
              "hash": "87dfdd81f94a"
            }
          }
        ],
        "defense": "Each kind can run on its own, a later unit re-runs the quick gate in seconds, a guard that ends the shell ends the procedure as it will on the day, and no expectation or stop goes untested.",
        "steps": [
          {
            "id": "S2.gating to S2.nonfunctional",
            "what": "Run the five kinds in order, the long ones in the background.",
            "check": "totals 49, 63, 80, 420 and 23",
            "link": "plan.md#s2--the-self-test"
          },
          {
            "id": "S2.coverage",
            "what": "Check every expectation and stop of the step scripts against the stops the cases provoked.",
            "check": "308 expectations and stops reached",
            "link": "plan.md#s2--the-self-test"
          }
        ],
        "tests": [
          "gating — 49 checks",
          "deterministic — 63 checks, the quick gate",
          "component — 80 checks",
          "integration — 420 checks",
          "nonfunctional — 23 checks"
        ],
        "risks": [
          "The stand-ins answer in the shapes GitHub and Windows answer in; a step that meets another answer in a later unit's real run stops at its own check before its write (assumption A2)"
        ],
        "source": "plan.md The self-test; The output rule; Test plan; Appendix B",
        "link": "plan.md#the-self-test"
      }
    },
    {
      "id": "recorded-gaps",
      "group": "The recorded gaps",
      "name": "The gaps and follow-ups the GKB2 and GKB unit recorded for this work",
      "system": "toolchain",
      "where": "the new folder's tools and cases · #26's consequences, §5 and §6",
      "gap": {
        "kind": "debt",
        "summary": "The gaps and follow-ups the GKB2 and GKB unit recorded for this work are still open. Among them are the reply classifier and the form of a stored reply, the class table against the classifier, stops and branches no case reaches, the output rule asserted for two outputs only, the budget's reading, close-out steps not safe to run twice and case labels that name no behaviour; several of them guard a push.",
        "evidence": [
          "`../architecture.md:151` — the gaps and follow-ups that unit recorded for this work",
          "`../research/tool-changes-for-three-repositories.md:255` — every item mapped to its files, the ones that guard an irreversible write marked",
          "`../research/tool-changes-for-three-repositories.md:274` — why the classifier guards a write: a misread reply makes a push skipped or resent wrongly"
        ],
        "source": "../architecture.md §2.3, §7.4; ../research/tool-changes-for-three-repositories.md §7",
        "link": "../architecture.md#74-the-recorded-gaps"
      },
      "options": [
        {
          "id": "closed-before-first-push",
          "name": "Every one closed in this unit, before the first push, in the order of what guards a write: the reply's form and the classifier with the class table; the untested stops of the push preparation, the push step and the reset; the grant check and the readiness checks of the inputs; the one-shell stand-in; then the rest, with one case for every expectation and every stop of a step script",
          "verdict": "accepted",
          "why": "The next unit's pushes then rest on tools whose every stop has a case, and the GKB2 and GKB unit's consequences take a dated note for each item closed.",
          "source": "../architecture.md §7.4; ../consequences.md §2.3",
          "link": "../architecture.md#74-the-recorded-gaps"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "Every change of the closure table's rows 1 to 26 is in the saved folder, and the cases the table names passed in the test sets the table now gives them."
          },
          {
            "state": "as-planned",
            "text": "Every expectation and every stop of every step script and procedure has a case of its own script and arm, as the coverage check shows (393 of 393)."
          },
          {
            "state": "as-planned",
            "text": "Both causes of the output rule's earlier breaks are removed, the fixtures' working copies turn git's line-ending conversion off, and the output rule held over every set's output."
          },
          {
            "state": "as-planned",
            "text": "Every check is filed at its test set and states a behaviour, and no label is printed twice."
          },
          {
            "state": "as-planned",
            "text": "The earlier unit's consequences carry 31 dated notes, one for each row of the closure table, each worded from the row's note column.",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "The plan's other goals: the four sets share one library, `g27lib.sh`; no script of the folder names a repository, an issue or a branch, which a case of `gating` checks over every script and Python tool; the earlier unit's gaps are closed before the first push, which no unit has yet made; after the landing the folder is fixed, under the rule of consequences §4. Nothing sensitive is printed: the measured run's part of the run log holds no drive-letter path, no 40-digit id and no `STOP` line (§3.4).",
              "hash": "22ec5b585054"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Close every gap, follow-up and related deviation the GKB2 and GKB unit recorded for this work, rows 1 to 26 of the closure table, each with its change and its cases, in the order of what guards a write: the reply and the classifier first, then the push's untested stops, the grant and readiness checks, and the one-shell stand-in.",
            "ref": "plan.md#the-closure-table",
            "excerpt": {
              "ref": "plan.md#the-closure-table",
              "heading": "The closure table",
              "paragraph": "One row per gap, follow-up and documentation point of the earlier unit's consequences, §5 and §6, and per related deviation of its as-built record, in the order of what guards a write. The case labels are the `ok` lines of the self-test (abbreviated to the behaviour); the note column is what the dated note on the earlier unit's consequences says at the landing.",
              "hash": "31142bcc3f49"
            }
          },
          {
            "text": "Give every expectation and every stop of every step script a case.",
            "ref": "plan.md#the-closure-table",
            "excerpt": {
              "ref": "plan.md#the-closure-table",
              "heading": "The closure table",
              "paragraph": "One row per gap, follow-up and documentation point of the earlier unit's consequences, §5 and §6, and per related deviation of its as-built record, in the order of what guards a write. The case labels are the `ok` lines of the self-test (abbreviated to the behaviour); the note column is what the dated note on the earlier unit's consequences says at the landing.",
              "hash": "31142bcc3f49"
            }
          },
          {
            "text": "Remove both causes of the output rule's earlier breaks: a read of a file that may not exist discards its error stream, and the expression tool's output folder is made before its first call.",
            "ref": "plan.md#the-output-rule",
            "excerpt": {
              "ref": "plan.md#the-output-rule",
              "heading": "The output rule",
              "paragraph": "The tools print counts, numbers, repository ids, statuses, rule ids, branch ordinals and fixed markers. Never printed or quoted, in a console line, a document, a request or a stored reply: a pre-rewrite commit id, a blob id, a path of the legacy guild data or of its logs, a member or guild name, a rule's match, a secret, a token, a machine-local path, or any line of a push's or a scan's streams. A request file may hold the paths a procedure must name (the mirror, the records folder, the tools folder, the workspace, the unit's data file, the clone's folder and its move target), because each …",
              "hash": "87dfdd81f94a"
            }
          },
          {
            "text": "File every check at the test kind the testing hierarchy gives it, and name every case by a behaviour.",
            "ref": "plan.md#test-plan",
            "excerpt": {
              "ref": "plan.md#test-plan",
              "heading": "Test plan",
              "paragraph": "No product code changes; the self-test and the steps' own checks are the tests. The tools have no packages; the \"package segment\" names the folder a test kind would have. Every check is filed at the kind the testing hierarchy gives it, and every case label names a behaviour. The kinds run in the order below; totals are in Appendix B. The cases are listed by behaviour, not by number; the label of each is the `ok` line it prints.",
              "hash": "ccbce66badef"
            }
          },
          {
            "text": "Write a dated note on the earlier unit's consequences for each row of the closure table at the landing.",
            "ref": "plan.md#documentation-impact",
            "excerpt": {
              "ref": "plan.md#documentation-impact",
              "heading": "Documentation impact",
              "paragraph": "Documentation levels. No Kotlin code changes and no library API moves, so there is no KDoc to write for a library and no Dokka reference to regenerate. The tools are workspace files saved from Appendix A; the documentation of this change sits at these levels, and the table follows where each rule lives and what is commented there:",
              "hash": "62cb82a35fe0"
            }
          }
        ],
        "defense": "The next unit's pushes then rest on tools whose every stop has a case, and the earlier unit's record shows where each item it left was closed.",
        "steps": [
          {
            "id": "S1.save",
            "what": "Save the folder with every row's change in place.",
            "check": "the pins",
            "link": "plan.md#s1--the-folder-saved"
          },
          {
            "id": "S2.coverage",
            "what": "Check that every expectation and stop was reached by a case.",
            "check": "`ok    gselftest coverage: 2 checks passed`",
            "link": "plan.md#s2--the-self-test"
          }
        ],
        "tests": [
          "integration — a case for every expectation and every stop of every step script",
          "deterministic — an input-to-output case for each pure transform the earlier unit left without one",
          "nonfunctional — the pace, the spacing and the token, each with a check"
        ],
        "risks": [
          "A recorded item whose change has no case is found by the coverage check, which fails the self-test"
        ],
        "source": "plan.md The closure table, rows 1 to 26; Documentation impact",
        "link": "plan.md#the-closure-table"
      }
    },
    {
      "id": "documentation-points",
      "group": "The recorded gaps",
      "name": "The thirteen documentation points",
      "system": "toolchain",
      "where": "every file's header, contracts and comments · the plan's appendix of sources",
      "gap": {
        "kind": "debt",
        "summary": "The tools' own documentation falls short at thirteen recorded points. Contracts miss a parameter or a class, headers leave out environment overrides and exit statuses, comments disagree with the code, and \"Writes:\" clauses, regions, language hints and the reasons for some numbers are missing; the tools live in no repository, so their text and the plan's appendix are their only documentation.",
        "evidence": [
          "`../research/tool-changes-for-three-repositories.md:308` — the thirteen documentation points, by file",
          "`../research/tool-changes-for-three-repositories.md:343` — the documentation is in the tool text and the plan's appendix of sources",
          "`../architecture.md:155` — the thirteen documentation points among the recorded gaps"
        ],
        "source": "../architecture.md §7.4; ../research/tool-changes-for-three-repositories.md §7.3",
        "link": "../research/tool-changes-for-three-repositories.md#73-the-thirteen-documentation-points-by-file-none-guards-a-write"
      },
      "options": [
        {
          "id": "written-once",
          "name": "Each file written once, with the change that saves the tools again, its header, contracts, \"Writes:\" clause, line comments, regions and language hints in place",
          "verdict": "accepted",
          "why": "None of the points guards a write, and the folder is saved once, so each file's documentation goes in with that save.",
          "source": "../architecture.md §7.4",
          "link": "../architecture.md#74-the-recorded-gaps"
        },
        {
          "id": "runner-header-resaved",
          "name": "Saving the stage runner again with its header corrected",
          "verdict": "declined",
          "why": "The runner is read at its existing pin and never saved again, so its header stays as pinned; the reader-facing part is closed in the new folder's own text and by a self-test case, and the header is recorded as the one sub-item left open.",
          "source": "plan.md Non-goals; The closure table, row 31",
          "link": "plan.md#the-closure-table"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "state": "amended",
            "text": "Every file was saved with its header, contracts, comments, regions and language hints, and the gating checks on headers and regions passed; four scripts' headers and one function's comment did not describe their code at the first save, and the folder was saved again once each said what its code does.",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "900fafee72a9"
            }
          },
          {
            "state": "as-planned",
            "text": "The request tool lists the push classes in one contract and documents the classifier's signature."
          },
          {
            "state": "as-planned",
            "text": "The runner's masking of a stage name is stated in the folder's own text and covered by a passing case; the runner's own header stays as pinned."
          },
          {
            "state": "as-planned",
            "text": "No README, CHANGELOG or API reference changed."
          }
        ],
        "changes": [
          {
            "what": "At the folder's first save the headers of `p7-verify.sh`, `s0-ready.sh`, `c1-close.sh` and `r1-close.sh`, and the comment on `pending` in `gdocs.sh`, said things their code does not do: an order of checks, an archive state the row does not hold, what a step writes. Each now says what the code does, and the five files hold new pins.",
            "why": "The comments rest on the folder saved from the plan, which holds every file's source and pin, and on the documentation points written into each file with its header and its line comments; only comment lines changed.",
            "when": "Before the landing · the five files' comments reworded",
            "link": "../architecture.md#74-the-recorded-gaps"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Write each file once, with the save, with its header (usage, exit statuses, environment, what it writes), its contracts, line comments, regions and language hints.",
            "ref": "plan.md#documentation-impact",
            "excerpt": {
              "ref": "plan.md#documentation-impact",
              "heading": "Documentation impact",
              "paragraph": "Documentation levels. No Kotlin code changes and no library API moves, so there is no KDoc to write for a library and no Dokka reference to regenerate. The tools are workspace files saved from Appendix A; the documentation of this change sits at these levels, and the table follows where each rule lives and what is commented there:",
              "hash": "62cb82a35fe0"
            }
          },
          {
            "text": "List the push classes in one contract in the request tool, and document the classifier's new signature.",
            "ref": "plan.md#the-closure-table",
            "excerpt": {
              "ref": "plan.md#the-closure-table",
              "heading": "The closure table",
              "paragraph": "One row per gap, follow-up and documentation point of the earlier unit's consequences, §5 and §6, and per related deviation of its as-built record, in the order of what guards a write. The case labels are the `ok` lines of the self-test (abbreviated to the behaviour); the note column is what the dated note on the earlier unit's consequences says at the landing.",
              "hash": "31142bcc3f49"
            }
          },
          {
            "text": "State in the new folder's own text and in a self-test case that the runner shows a stage name with other characters as `<name>`, and leave the runner's own header as pinned.",
            "ref": "plan.md#the-closure-table",
            "excerpt": {
              "ref": "plan.md#the-closure-table",
              "heading": "The closure table",
              "paragraph": "One row per gap, follow-up and documentation point of the earlier unit's consequences, §5 and §6, and per related deviation of its as-built record, in the order of what guards a write. The case labels are the `ok` lines of the self-test (abbreviated to the behaviour); the note column is what the dated note on the earlier unit's consequences says at the landing.",
              "hash": "31142bcc3f49"
            }
          },
          {
            "text": "Change no README, no CHANGELOG and no API reference: the tools are workspace files.",
            "ref": "plan.md#documentation-impact",
            "excerpt": {
              "ref": "plan.md#documentation-impact",
              "heading": "Documentation impact",
              "paragraph": "Documentation levels. No Kotlin code changes and no library API moves, so there is no KDoc to write for a library and no Dokka reference to regenerate. The tools are workspace files saved from Appendix A; the documentation of this change sits at these levels, and the table follows where each rule lives and what is commented there:",
              "hash": "62cb82a35fe0"
            }
          }
        ],
        "defense": "None of the points guards a write and the folder is saved once, so each file's documentation goes in with that save; the runner is reused at its pin, so its header is the one sub-item left open, recorded as a known gap.",
        "steps": [
          {
            "id": "S1.save",
            "what": "Save every file with its documentation in place.",
            "check": "the pins",
            "link": "plan.md#s1--the-folder-saved"
          },
          {
            "id": "S2.gating",
            "what": "Check that every step script's header names what it writes and that the library and the Python tools have regions.",
            "check": "`ok    gselftest gating: 49 checks passed`",
            "link": "plan.md#s2--the-self-test"
          }
        ],
        "tests": [
          "gating — the header presence checks, the regions, every Python tool compiles",
          "component — the want-probe framing checked byte for byte"
        ],
        "risks": [],
        "source": "plan.md The closure table, rows 27 to 31; Documentation impact",
        "link": "plan.md#the-closure-table"
      }
    },
    {
      "id": "readiness-reads",
      "group": "Proofs",
      "name": "The three repositories read once, the parameter rows proven against the data",
      "system": "toolchain",
      "where": "BotTools, TrumpBot and Support on GitHub, read only · the preparation unit's records",
      "gap": {
        "kind": "risk",
        "summary": "The three parameter rows are derived from records, not yet proven against the repositories. Their values come from the clone listings, the purge lists' checksums, the preparation unit's probe script and a derivation from the untouched backup; the repository ids and settings were read once during the design, and whether the pushing token can read BotTools' webhook deliveries is untried.",
        "evidence": [
          "`../research/tool-changes-for-three-repositories.md:234` — each column's value per repository and where it comes from",
          "`../research/README.md:319` — the repository ids and settings, read on 2026-11-13",
          "`../consequences.md:205` — the deliveries endpoint is untried, shown by this unit's read of the repositories before any push"
        ],
        "source": "../architecture.md §7.5; ../research/tool-changes-for-three-repositories.md §6, §13",
        "link": "../architecture.md#75-what-the-unit-proves-and-what-follows-its-landing"
      },
      "options": [
        {
          "id": "read-once-and-prove",
          "name": "One read of each repository — its visibility, default branch, branches, webhook count and the scanning settings where it reports them — and each row proven against the data: the purge list against its recorded checksum, the probe arguments against the preparation unit's script, the every-ref commit count against a derivation from the untouched backup; the earlier folder equal to its own pins before the save and after it",
          "verdict": "accepted",
          "why": "A row that differs from what its repository reports is found in this unit, before any push, and the earlier unit's record is shown untouched.",
          "source": "../architecture.md §7.5",
          "link": "../architecture.md#75-what-the-unit-proves-and-what-follows-its-landing"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "Each repository's row equalled its data: the purge list, the mirror and backup, the clone listing, the probe arguments and the every-ref commit count (62 input checks, none failed)."
          },
          {
            "state": "as-planned",
            "text": "The checksums of the preparation unit's earlier records, recorded at the first run (5, 6 and 5 records) in the unit's only record folder, were kept, and the earlier records equalled that first recording; the inputs step's changed reads and its checksum write each have a case."
          },
          {
            "state": "as-planned",
            "text": "The three repositories were read from GitHub, read only, against their rows, the clone listing checked first (39 repository checks, none failed), each row equal to the data, and each private repository's refused rulesets read was recorded, as the plan expects."
          },
          {
            "state": "as-planned",
            "text": "At the close-out both reads passed again, with 62 and 39 checks: the earlier records equalled their first recording and the three repositories read as before."
          },
          {
            "state": "as-planned",
            "text": "The close-out showed the earlier records and the three repositories' refs unchanged, and nothing was written to GitHub."
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Prove each repository's purge list against its row and recorded checksum, the mirror and the backup against their checksum list, the clone listing against the row, the probe arguments against the preparation unit's script, and the every-ref commit count derived from the untouched backup against the row.",
            "ref": "plan.md#s3--the-three-repositories-read",
            "excerpt": {
              "ref": "plan.md#s3--the-three-repositories-read",
              "heading": "S3 — The three repositories read",
              "paragraph": "`S3.inputs`: for each repository: the list against its row and its recorded checksum; the mirror's and the backup's files against `backup.SHA256SUMS`; the earlier records exist (five, six for the row with probe arguments) and their checksums are recorded at this first run (a later run compares them); the manifest's and the pinned manifest's sizes; the clone's listing against the row (branches by name, pull-request refs, `HEAD`); the control probes against the preparation unit's `s8-row.sh` (the arm that assigns none for the two rows without); the every-ref commit count derived from the backup …",
              "hash": "4098ed31d3b8"
            }
          },
          {
            "text": "Record the checksums of the preparation unit's earlier records at the first run and compare them at every later run, in the unit's only record folder.",
            "ref": "plan.md#the-running-units-data-file",
            "excerpt": {
              "ref": "plan.md#the-running-units-data-file",
              "heading": "The running unit's data file",
              "paragraph": "Every step reads one data file, named by the environment value `G27_UNIT` (a path in mixed form, with no default, so that no two units share one). Key=value lines; a line that starts with `#` is a comment:",
              "hash": "a4519c548ff3"
            }
          },
          {
            "text": "Read each repository from GitHub once, read only, against the values its row records — id, visibility, default branch, branches, webhooks, scanning, no ruleset — recording a private repository's refused rulesets read and the activity and event counts.",
            "ref": "plan.md#s3--the-three-repositories-read",
            "excerpt": {
              "ref": "plan.md#s3--the-three-repositories-read",
              "heading": "S3 — The three repositories read",
              "paragraph": "`S3.inputs`: for each repository: the list against its row and its recorded checksum; the mirror's and the backup's files against `backup.SHA256SUMS`; the earlier records exist (five, six for the row with probe arguments) and their checksums are recorded at this first run (a later run compares them); the manifest's and the pinned manifest's sizes; the clone's listing against the row (branches by name, pull-request refs, `HEAD`); the control probes against the preparation unit's `s8-row.sh` (the arm that assigns none for the two rows without); the every-ref commit count derived from the backup …",
              "hash": "4098ed31d3b8"
            }
          },
          {
            "text": "Run both reads again at the close-out to show the earlier records and the three repositories' refs unchanged.",
            "ref": "plan.md#s4--close-out",
            "excerpt": {
              "ref": "plan.md#s4--close-out",
              "heading": "S4 — Close-out",
              "paragraph": "`S4.g26`: the `S0.g26` command again (the earlier folder and the reused tools at their pins, after the save). `S4.tools`: `g s0-ready tools` again. `S4.records`: the earlier records and the refs unchanged, by running `S3.inputs` and `S3.repos` again:",
              "hash": "b4a2586fadd2"
            }
          },
          {
            "text": "Write nothing to GitHub, to any repository or to any checkout.",
            "ref": "plan.md#shape-of-the-units-run",
            "excerpt": {
              "ref": "plan.md#shape-of-the-units-run",
              "heading": "Shape of the unit's run",
              "paragraph": "Five stages. `S0` reads and checks and writes nothing. `S1` saves the folder from this plan and checks it. `S2` runs the self-test, one step per test kind and a last step for its coverage. `S3` reads the three real repositories and proves the parameter rows against the data. `S4` is the close-out: the earlier folder and the new one at their pins, the preparation unit's records unchanged, the three repositories' refs unchanged. The landing's document checks follow, outside the table, as in the earlier unit. Nothing is written to GitHub, to any repository or to the clone at any stage; every …",
              "hash": "0c5700a5b84a"
            }
          }
        ],
        "defense": "A row that differs from what its repository reports is found before any push, and the close-out shows that the unit's own run changed nothing it read.",
        "steps": [
          {
            "id": "S3.inputs",
            "what": "Prove each row against the data of its repository.",
            "check": "`STAGE S0.inputs OK`",
            "link": "plan.md#s3--the-three-repositories-read"
          },
          {
            "id": "S3.repos",
            "what": "Read the three repositories from GitHub against their rows.",
            "check": "`STAGE S0.repos OK`",
            "link": "plan.md#s3--the-three-repositories-read"
          },
          {
            "id": "S4.records",
            "what": "Run both reads again at the close-out.",
            "check": "the same stage lines, the earlier records equal those recorded",
            "link": "plan.md#s4--close-out"
          }
        ],
        "tests": [
          "integration — the readiness steps on made-up repositories of the three shapes, every stop of the inputs and of the repositories read"
        ],
        "risks": [
          "A real repository that answers in another shape than the stand-ins stops the read with nothing written; the row or the step is corrected before anything depends on it (assumptions A4, A11)"
        ],
        "source": "plan.md Current state; S3 — The three repositories read; S4 — Close-out",
        "link": "plan.md#s3--the-three-repositories-read"
      }
    },
    {
      "id": "running-the-sets",
      "group": "Left for later",
      "name": "Running the sets: the pushes, the residual measurement and the clone replacement",
      "system": "toolchain",
      "where": "units 2 to 4 of #27 · #40, #41, #42",
      "gap": {
        "kind": "missing",
        "summary": "This unit runs none of the sets it builds. It writes nothing to GitHub and changes no repository and no checkout; the rewrite set, the residual set and the clone set are each run by a later unit of #27.",
        "evidence": [
          "`../architecture.md:343` — the unit writes nothing to GitHub and changes no repository and no checkout",
          "`../architecture.md:865` — units 2, 3 and 4 each run a set of its folder"
        ],
        "source": "../architecture.md §7, §16",
        "link": "../architecture.md#16-decomposition"
      },
      "options": [
        {
          "id": "left-to-later-units",
          "name": "Left to the rewrites (#40), the residual measurement (#41) and the clone replacement (#42), each running its set",
          "verdict": "accepted",
          "why": "The parts have different gates and different writes: the tools are proven with no write at all, the measurement waits for the last push, and the clone replacement writes to a checkout under another grant.",
          "source": "../architecture.md §15, §16",
          "link": "../architecture.md#16-decomposition"
        },
        {
          "id": "one-unit",
          "name": "One unit for all of #27",
          "verdict": "declined",
          "why": "One unit would hold one landing hostage to four kinds of stop; it would win only if the tools needed no change.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "No rewrite, push, probe or replacement ran in this unit: its contact with GitHub was reads, and nothing under the data folder's rewrite records was written.",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "On GitHub, nothing. The unit's contact with GitHub was reads, at `S3.repos` and again at `S4.records`: each repository's settings, branches, tags, releases, keys, workflows, rulesets and webhooks, BotTools' list of webhook deliveries, the activity feed and the events, and each server's refs by `git ls-remote`. · The tools, the 25 files of the plan's Appendix A and Appendix B, saved to `WS/tools/g27/`, each at its pin: 19 shell scripts, 3 Python tools, the parameter table `params.txt` and the two pin lists, `tools.sums` (its 22 rows: the reused tools, the stage runner and the gitleaks binary) …",
              "hash": "c1835387a961"
            }
          },
          {
            "state": "as-planned",
            "text": "Each later unit was handed its set, its records' layout and the quick gate: the rewrites the rewrite set, the residual measurement the residual set and the clone replacement the clone set, each first proving the folder at its pins and running the deterministic set.",
            "ref": "consequences.md#3-adoption",
            "excerpt": {
              "ref": "consequences.md#3-adoption",
              "heading": "3. Adoption",
              "paragraph": "The tool folder is what the rest of #27 runs. The rewrites run the rewrite set, the residual measurement the residual set and the clone replacement the clone set. Each unit first proves the folder equal to its pins and runs the quick gate, the self-test's deterministic kind (plan, \"Interfaces with sibling units\"). · A repository's policy is a row of the parameter table, and a running unit's job, issue, branch, actions, targets and record folder are its own data file, named by `G27_UNIT`, with no default. The folder names no repository, issue or branch, so a further repository is a row and a …",
              "hash": "85709eaa5bb8"
            }
          }
        ]
      },
      "verdict": {
        "kind": "leave",
        "list": "bullets",
        "statements": [
          {
            "text": "Run no rewrite, push, probe or replacement in this unit: the rewrites, the residual measurement and the clone replacement each run their set.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No run of any rewrite, push, probe or replacement. Units 2, 3 and 4 run the sets this unit delivers; unit 1 proves them on made-up repositories and reads the three real ones. · No write to GitHub, no change to any repository, no read or touch of the TrumpBot clone, and no grant, allow line or request. · No change to `tools\\g26\\` or to the earlier units' records, no run of its tools or of its self-test, and no run of `k0-ready.sh` or `save-tools.sh` (the two workspace scripts that pin the earlier scan configuration). · No save of the stage runner. `tools\\run-stage.sh` is read at its existing …",
              "hash": "9bd82f2b98b4"
            }
          },
          {
            "text": "Hand each later unit its set, its records' layout and the quick gate as the interfaces with the sibling units state them.",
            "ref": "plan.md#interfaces-with-sibling-units",
            "excerpt": {
              "ref": "plan.md#interfaces-with-sibling-units",
              "heading": "Interfaces with sibling units",
              "paragraph": "What this unit takes from earlier units. From the preparation unit: the workspace and data folders; each repository's mirror and untouched backup with `ls-remote-at-clone.txt` and `backup.SHA256SUMS`; the manifests, the expectation rows, the positive-control records, the purge lists with `DATA/run/lists/SHA256SUMS`, `COPY-VERIFIED`, `DATA/run/tool-versions.txt`; `env.sh`, `lib.sh`, `plib.sh`, `klib.sh`, `s8-row.sh` (read as data), `expect_check.py`, `expect_row.py`, `kept_findings.py`, `secret_scan.py` with `gitleaks.exe` and `gitleaks.toml`, `porcelain_tally.awk`, `oldid_refs.py`, …",
              "hash": "0be5cc23ad1b"
            }
          }
        ],
        "defense": "The parts have different gates and writes: the tools are proven with no write at all, while the measurement and the clone replacement wait for the pushes.",
        "source": "plan.md Non-goals; Interfaces with sibling units",
        "link": "plan.md#non-goals"
      }
    },
    {
      "id": "defects-after-landing",
      "group": "Left for later",
      "name": "A tool defect found after the landing",
      "system": "toolchain",
      "where": "the plan of the unit that meets it · this unit's consequences, a dated note",
      "gap": {
        "kind": "risk",
        "summary": "Once the unit lands, its folder is fixed, so a defect found later cannot be mended in place. A later unit that meets one stops before its write.",
        "evidence": [
          "`../architecture.md:427` — after the landing the folder is fixed; a later unit that meets a defect in a tool stops",
          "`../architecture.md:894` — the risk: units 2 to 4 stop on a tool defect found after unit 1 has landed"
        ],
        "source": "../architecture.md §7.5, §17",
        "link": "../architecture.md#75-what-the-unit-proves-and-what-follows-its-landing"
      },
      "options": [
        {
          "id": "new-version-by-later-unit",
          "name": "The correction a new version of that file, carried whole with its new pin by the plan of the unit that makes it, the test kind that covers it run again, with a dated note in this unit's consequences",
          "verdict": "accepted",
          "why": "The folder's pins stay a true record, as when the GKB2 and GKB unit replaced the stage runner, and the later unit stops before its write rather than running a tool not proven.",
          "source": "../architecture.md §7.5, §17",
          "link": "../architecture.md#75-what-the-unit-proves-and-what-follows-its-landing"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "state": "as-planned",
            "text": "The rule that fixes the folder from the landing on was recorded: a later unit that meets a defect in a tool stops before its write, and the correction is a new version of that file, carried whole with its new pin by that unit's plan, with the covering test set run again.",
            "ref": "consequences.md#4-sibling-units-and-neighbouring-issues",
            "excerpt": {
              "ref": "consequences.md#4-sibling-units-and-neighbouring-issues",
              "heading": "4. Sibling units and neighbouring issues",
              "paragraph": "What the later units of #27 take from this unit. The contract is plan, \"Interfaces with sibling units\"; this is its summary.",
              "hash": "98f15059b6e1"
            }
          },
          {
            "state": "as-planned",
            "text": "Each such correction takes a dated note in this unit's consequences, which name it among their follow-ups.",
            "ref": "consequences.md#6-follow-ups",
            "excerpt": {
              "ref": "consequences.md#6-follow-ups",
              "heading": "6. Follow-ups",
              "paragraph": "A tool defect a later unit meets is corrected under the rule of §4, with a dated note in this document. · The two workspace scripts that pin the earlier scan configuration, `k0-ready.sh` and `save-tools.sh`, stay unrun, as the GKB2 and GKB unit left them; the workspace's deletion removes them.",
              "hash": "18c183da8e60"
            }
          }
        ]
      },
      "verdict": {
        "kind": "leave",
        "list": "bullets",
        "statements": [
          {
            "text": "Freeze the folder at the landing: a later unit that meets a defect stops before its write, and the correction is a new version of that file, carried whole with its new pin by that unit's plan, the covering test kind run again.",
            "ref": "plan.md#risks-and-edge-cases",
            "excerpt": {
              "ref": "plan.md#risks-and-edge-cases",
              "heading": "Risks and edge cases",
              "paragraph": "A tool defect found after this unit lands stops the unit that meets it before its write. The correction is a new version of that file carried whole with its new pin by the plan of the unit that makes it, with the covering test kind run again and a dated note in this unit's consequences. The earlier tools are not a fallback: `g26` writes a different push and reads one branch. · The stand-ins model GitHub, not GitHub. The class table rests on published logs and on a local experiment (the push findings, §4); the first real refusal or the first lost connection is the check of the markers' live …",
              "hash": "cafd685cde48"
            }
          },
          {
            "text": "Record each such correction in a dated note in this unit's consequences.",
            "ref": "plan.md#sequencing-and-follow-ups",
            "excerpt": {
              "ref": "plan.md#sequencing-and-follow-ups",
              "heading": "Sequencing and follow-ups",
              "paragraph": "Order. `S0` (the earlier folder at its pins, the unit's data file), `S1` (the save, the pins, the versions), `S2` (the kinds in order, then coverage), `S3` (the three repositories read), `S4` (the close-out), then the landing's document checks and the documents. The unit starts after #38 has landed (it has) and blocks #40; #41 and #42 wait for #40.",
              "hash": "a48690cc9b4b"
            }
          }
        ],
        "defense": "The folder's pins stay a true record, and the earlier tools are no fallback: they write a different push and read one branch.",
        "source": "plan.md Requirements, goal 9; Risks and edge cases; Sequencing and follow-ups",
        "link": "plan.md#risks-and-edge-cases"
      }
    }
  ],
  "impact": {
    "basis": "as-built",
    "summary": "As built, no module is published and no version moves: the landing carries documents and generated boards only. Nothing was written to GitHub, where the three repositories were only read; on this machine a second tool folder, `tools/g27/`, stands beside the earlier one, which equals its pins before and after, and the rest of #27 runs its sets from it. The read of BotTools answers the parent design’s gap on the webhook deliveries list (`consequences.md` §1 to §4; the known gaps in §5, the follow-ups in §6).",
    "none": null,
    "release": {
      "bump": "none",
      "version": null,
      "note": "no module is published and no version moves",
      "nothingPublished": true
    },
    "downstream": [
      {
        "who": "BotTools, TrumpBot and Support on GitHub",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "Nothing is written. Each is read, read only, and read again at the close-out, which found its refs and settings as they were; the reads spend calls of the authenticated rate limit only.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "The workspace",
        "kind": "operator",
        "system": "toolchain",
        "effect": "additive",
        "summary": "A second tool folder, `tools/g27/`, beside the GKB2 and GKB unit's `tools/g26/`, which is not edited, saved again or run and equals its own pins before the save and after the close-out; the reused tools and the stage runner are read at their pins; the unit's data file and scratch folder sit under `tmp/g27/`. The phase's last unit copies both tool folders and the runner before it deletes the workspace.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The data folder",
        "kind": "operator",
        "system": "toolchain",
        "effect": "additive",
        "summary": "The run log gains the unit’s lines, whose start lines show plain-word arguments only. The unit’s one record folder, `run/g27/`, holds the checksums of the preparation unit’s earlier records as the readiness reads first found them, one file per repository, and the three empty folders for a unit’s requests, replies and step markers; the landing’s privacy-gate run writes its argument file and overwrites the gate’s last-run files. No earlier record is written.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The TrumpBot clone, the other checkouts and the request service",
        "kind": "operator",
        "system": null,
        "effect": "none",
        "summary": "Untouched: the unit sends no request and asks the owner for nothing, and this working tree changes only by the landing.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "KotlinBottools' documents and boards",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "The unit's plan, with the versions it replaced kept under `superseded/`, its consequences and as-built record, a dated note on the GKB2 and GKB unit's consequences for each row of the closure table, one link line in the parent consequences, and the regenerated boards; no README change and no CHANGELOG entry.",
        "link": "consequences.md#23-documents-and-generated-boards"
      }
    ],
    "adaptation": [
      {
        "who": "The rewrites, #40",
        "system": null,
        "need": "required",
        "summary": "It runs the rewrite set, the parameter rows, the grant check and the push request builder with its reply store and classifier: it first proves the folder at its pins and runs the quick gate, writes its own data file, named by `G27_UNIT`, with its records in a folder of its own, and pushes each repository by one atomic lease push of N branches, of which the earlier one-branch push is the case N = 1.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "The residual measurement, #41",
        "system": null,
        "need": "required",
        "summary": "It runs the residual set after the same two checks, and reads the rewrites' records only through its data file's `from`, read only.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "The clone replacement, #42",
        "system": null,
        "need": "required",
        "summary": "It runs the clone set and the grant check; the preparation unit's clone scripts are superseded and never run.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "The residual report and cleanup, #28",
        "system": null,
        "need": "required",
        "summary": "It copies both tool folders and the stage runner at cleanup.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md §1 to §6, reconciled with the build; final-implementation.md §1 and §4",
    "link": "consequences.md#2-blast-radius"
  },
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
    ]
  },
  "roadmap": {
    "issue": 27,
    "title": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
    "asOf": "2026-11-13",
    "items": [
      {
        "issue": 39,
        "title": "Phase 0 · 7.1 — Extend the workspace tools for BotTools, TrumpBot and Support",
        "state": "OPEN"
      },
      {
        "issue": 40,
        "title": "Phase 0 · 7.2 — Rewrite BotTools, TrumpBot and Support",
        "state": "OPEN"
      },
      {
        "issue": 41,
        "title": "Phase 0 · 7.3 — Measure what GitHub still serves of BotTools, TrumpBot and Support",
        "state": "OPEN"
      },
      {
        "issue": 42,
        "title": "Phase 0 · 7.4 — Replace the TrumpBot clone",
        "state": "OPEN"
      }
    ]
  },
  "followUps": [
    {
      "issue": 40,
      "title": "Phase 0 · 7.2 — Rewrite BotTools, TrumpBot and Support",
      "note": "runs the rewrite set, the parameter rows, the grant check and the push request builder with its reply store and classifier, after proving the folder at its pins and the quick gate; step 4's discarded error streams, which no case provokes, are first reached there"
    },
    {
      "issue": 41,
      "title": "Phase 0 · 7.3 — Measure what GitHub still serves of BotTools, TrumpBot and Support",
      "note": "runs the residual set; the residual close-out's literal strip of the record folder's path, which no case tells from a pattern match, is first reached there"
    },
    {
      "issue": 42,
      "title": "Phase 0 · 7.4 — Replace the TrumpBot clone",
      "note": "runs the clone set and the grant check; the preparation unit's clone scripts are superseded and never run"
    },
    {
      "issue": 28,
      "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
      "note": "copies both tool folders and the stage runner at cleanup, before the workspace is deleted"
    },
    {
      "name": "A tool defect a later unit meets",
      "note": "corrected by a new version of that file, carried whole with its new pin by the plan of the unit that meets it, the covering test set run again, with a dated note in this unit's consequences (§4, §6)"
    },
    {
      "name": "The two workspace scripts that pin the earlier scan configuration",
      "note": "`k0-ready.sh` and `save-tools.sh` stay unrun, as the GKB2 and GKB unit left them; the workspace's deletion removes them"
    }
  ],
  "documents": [
    {
      "label": "plan.md",
      "path": "plan.md",
      "note": "the requirements, the folder, the parameter table, the four sets and the self-test, the closure table, the steps S0 to S4 with every block, the test plan, and the 25 tools with their pins in Appendices A and B; five earlier versions under `superseded/`"
    },
    {
      "label": "final-implementation.md",
      "path": "final-implementation.md",
      "note": "the as-built record: what was built, the acceptance, the folder, the self-test and the readiness reads measured, and the two deviations from the plan"
    },
    {
      "label": "consequences.md",
      "path": "consequences.md",
      "note": "the blast radius on GitHub, this machine and the documents, the adoption, the later units, the known gaps with the outcome of the assumptions, and the follow-ups"
    },
    {
      "label": "Architecture",
      "path": "../architecture.md",
      "note": "the parent design: unit `workspace-tools`, §7 the tools, with §5.1, §11, §12, §13.3, §14 and §16"
    },
    {
      "label": "#27's research",
      "path": "../research/README.md",
      "note": "the research questions of the parent design, the tools among them, with the verification and the summary"
    },
    {
      "label": "#27's consequences",
      "path": "../consequences.md",
      "note": "this unit's link line (§4), and the known gap on the webhook deliveries endpoint that this unit's read answers (§5)"
    },
    {
      "label": "Unit 6's consequences",
      "path": "../../26-gkb2-gkb-rewrite/consequences.md",
      "note": "the gaps and follow-ups this unit closes (§5, §6), each with a dated note from this unit"
    }
  ],
  "notes": {
    "corrections": [
      {
        "what": "A Quality Review was recorded at 2026-11-14 12:22:40 UTC: The time sent with the event was written by hand and was not a clock reading. This is the reading taken from the clock right after the event was sent. It is recorded at 12:22:58 UTC; the visits it bounds (qa, remediation) and the review's time move with it.",
        "when": "2026-11-14",
        "retime": {
          "event": "qa-pass",
          "from": "2026-11-14T12:22:40Z",
          "to": "2026-11-14T12:22:58Z"
        }
      },
      {
        "what": "A Quality Review was recorded at 2026-11-14 21:37:42 UTC: The verdict arrived at 21:18:51Z by this run's clock; the event was held until the board's service could be reached again, so its arrival time was recorded in its place. It is recorded at 21:18:51 UTC; the visits it bounds (qa, remediation), the review's time and the tests' results move with it.",
        "when": "2026-11-14",
        "retime": {
          "event": "qa-pass",
          "from": "2026-11-14T21:37:42Z",
          "to": "2026-11-14T21:18:51Z"
        }
      },
      {
        "what": "The halt was recorded at 2026-11-14 21:37:48 UTC: The wait began at 21:19:36Z by this run's clock; the event was held until the board's service could be reached again, so its arrival time was recorded in its place. It is recorded at 21:19:36 UTC; the visit it bounds (remediation), a wait on you and the questions' times move with it.",
        "when": "2026-11-14",
        "retime": {
          "event": "halted",
          "from": "2026-11-14T21:37:48Z",
          "to": "2026-11-14T21:19:36Z"
        }
      },
      {
        "what": "The return from the halt was recorded at 2026-11-14 21:38:05 UTC: The wait ended at 21:23:04Z by this run's clock, read just after the answer; the event was held until the board's service could be reached again, so its arrival time was recorded in its place. It is recorded at 21:23:04 UTC; the visit it bounds (remediation), a wait on you and the questions' times move with it.",
        "when": "2026-11-14",
        "retime": {
          "event": "resumed",
          "from": "2026-11-14T21:38:05Z",
          "to": "2026-11-14T21:23:04Z"
        }
      },
      {
        "what": "A Quality Review of 2026-11-14 21:18:51 UTC is reworded in the detail it wrote and #27's mirror of it: The sentence spoke of who decided the way forward, which a board does not record; it now says only what follows. The passage now reads \"Every finding is fixed next, the folder saved and run again, and one more review limited to what changed follows.\"",
        "when": "2026-11-14",
        "reword": {
          "event": "qa-pass",
          "at": "2026-11-14T21:18:51Z",
          "from": "sha256:ad071b54e6f0",
          "to": "sha256:909e75053eb9"
        }
      },
      {
        "what": "The tests sent with the Document step's update of 2026-11-15 11:37:22 UTC were recorded under the module toolchain, the system's name, by mistake: they are the runs of tools/g27 the board already listed, which had made each of the five sets appear twice. They are now that module's latest results, each set listed once: gating 84, deterministic 63, component 92, integration 579 and nonfunctional 28 tests passed, none failed.",
        "when": "2026-11-15",
        "tests": {
          "event": "document",
          "at": "2026-11-15T11:37:22Z",
          "module": {
            "from": "toolchain",
            "to": "tools/g27"
          },
          "classes": [
            "gselftest.sh gating",
            "gselftest.sh deterministic",
            "gselftest.sh component",
            "gselftest.sh integration",
            "gselftest.sh nonfunctional"
          ]
        }
      }
    ]
  },
  "issueBoards": {
    "2": "../../dashboard.html"
  },
  "links": {
    "workBoard": "../../../../index.html",
    "repoBoard": "../../../../../dashboards/index.html"
  }
}
);
