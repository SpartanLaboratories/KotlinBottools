/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 22,
  "slug": "22-transfer-rehearsal",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/22-transfer-rehearsal",
  "kind": "issue",
  "title": "Transfer rehearsal",
  "issueTitle": "Phase 0 · 2 — Transfer rehearsal on two throwaway repositories",
  "function": "Nobody knows how an issue transfer treats numbers, closed issues and links, and the number-preserving swap of KotlinBottools rests on them. This run proves those mechanics first, on two throwaway repositories of the organisation, a public source and a private, empty target: a fixture with the shapes the real walk meets, the numbers walked in order, a pull request's number reproduced by a closed placeholder, every dropped link re-created, and the rename swap rehearsed, both repositories left private and archived. Unit 2 of #2, with no version moved; unit 3 starts only if it passes.",
  "status": "built",
  "sized": "2026-11-08T23:59:00Z",
  "parent": {
    "issue": 2,
    "board": "../dashboard.html"
  },
  "fixOf": null,
  "branch": "chore/issue-22-transfer-rehearsal",
  "baseline": {
    "ref": "main",
    "sha": "3b62b67",
    "date": "2026-11-08"
  },
  "asBuilt": {
    "sha": "9af27b286ede1c153ff4e0d6f034fbc872996c15",
    "merge": "9af27b286ede1c153ff4e0d6f034fbc872996c15",
    "pr": 31,
    "date": "2026-11-10",
    "at": "2026-11-10T00:15:12Z",
    "commits": [
      {
        "sha": "83761f7",
        "at": "2026-11-09T01:15:20Z",
        "step": "research"
      },
      {
        "sha": "81c43b9",
        "at": "2026-11-09T01:31:53Z",
        "step": "research"
      },
      {
        "sha": "3d4a2da",
        "at": "2026-11-09T01:42:25Z",
        "step": "research"
      },
      {
        "sha": "44321c1",
        "at": "2026-11-09T04:56:34Z",
        "step": "research"
      },
      {
        "sha": "de8d6f0",
        "at": "2026-11-09T05:19:18Z",
        "step": "research"
      }
    ]
  },
  "systems": [
    {
      "slug": "repository-swap",
      "name": "Repository swap",
      "slot": 0,
      "top": "Internal Tooling",
      "status": "planned",
      "board": null
    }
  ],
  "wip": {
    "step": "landed",
    "since": "2026-11-10T00:15:12Z",
    "updated": "2026-11-10T00:15:12Z",
    "detail": "Landed in PR #31.",
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
    "interview": [
      {
        "text": "Does KotlinBottools stay public until the swap?",
        "options": [
          "Private again now, before the first write; the rehearsal stays as designed",
          "Public until the swap; a public source and private target are rehearsed, and the source goes private before archiving",
          "Drop the swap and rewrite in place; the parent design is re-planned"
        ],
        "answer": "The repository stays public until the swap, and the rehearsal proves a public source moving to a private target",
        "asked": "2026-11-09T00:15:00Z",
        "answered": "2026-11-09T01:08:58Z"
      },
      {
        "text": "Does the fixture carry a second level of sub-issues?",
        "options": [
          "One level, as specified",
          "Add a middle node"
        ],
        "answer": "The fixture nests sub-issues to mixed depth and the walk handles any depth",
        "asked": "2026-11-09T00:15:00Z",
        "answered": "2026-11-09T01:08:58Z"
      },
      {
        "text": "After a failed step, does everything stop?",
        "options": [
          "Stop at the first failed step, archive both, hand back",
          "Stop the walk at the failure, still run link re-creation and the rename swap, archive both, hand back every result"
        ],
        "answer": "After a failed step the walk stops but link re-creation and the rename swap still run",
        "asked": "2026-11-09T00:15:00Z",
        "answered": "2026-11-09T01:08:58Z"
      }
    ],
    "plan": null,
    "stages": [
      {
        "id": "S0",
        "name": "Local readiness",
        "state": "done",
        "rows": [
          "rehearsal-tool",
          "requested-writes"
        ]
      },
      {
        "id": "S1",
        "name": "Repositories, labels and milestone",
        "state": "done",
        "rows": [
          "rehearsal-repositories",
          "item-content",
          "requested-writes"
        ]
      },
      {
        "id": "S2",
        "name": "The fixture",
        "state": "done",
        "rows": [
          "fixture",
          "requested-writes"
        ],
        "finished": "2026-11-09T04:32:16Z",
        "report": "The fixture equals its specification: numbers 1 to 10 (nine issues and one merged pull request), four comments, seven sub-issue and four blocked-by links, two closed issues."
      },
      {
        "id": "S3",
        "name": "The walk",
        "state": "done",
        "rows": [
          "number-walk",
          "pull-request-placeholder",
          "closed-issue",
          "item-content",
          "links",
          "failure-behaviour",
          "requested-writes"
        ],
        "started": "2026-11-09T04:32:16Z"
      },
      {
        "id": "S4",
        "name": "Link reconciliation",
        "state": "done",
        "rows": [
          "links",
          "requested-writes"
        ],
        "finished": "2026-11-09T05:33:06Z",
        "report": "All nine numbers are in the target on their own numbers, the placeholder and both closed issues included, and every one of the eleven links was kept across the walk with none to re-create."
      },
      {
        "id": "S5",
        "name": "The rename swap",
        "state": "done",
        "rows": [
          "rename-swap",
          "requested-writes"
        ],
        "started": "2026-11-09T05:33:06Z",
        "finished": "2026-11-09T07:01:03Z",
        "report": "All seven stages passed. The rename onto the freed name was accepted, old issue URLs reach the new home, and both rehearsal repositories are private and archived."
      },
      {
        "id": "S6",
        "name": "Close-out",
        "state": "done",
        "rows": [
          "rehearsal-repositories",
          "pass-condition",
          "failure-behaviour",
          "requested-writes"
        ],
        "finished": "2026-11-09T07:01:03Z",
        "report": "All seven stages passed. The rename onto the freed name was accepted, old issue URLs reach the new home, and both rehearsal repositories are private and archived."
      }
    ],
    "remediation": {
      "pass": 2,
      "route": "on-the-spot"
    },
    "open": [],
    "event": {
      "name": "landed",
      "at": "2026-11-10T00:15:12Z"
    },
    "history": {
      "sizing": [
        {
          "since": null,
          "ended": "2026-11-08T23:59:00Z",
          "endedBy": "sized",
          "to": "interview"
        }
      ],
      "interview": [
        {
          "since": "2026-11-08T23:59:00Z",
          "ended": "2026-11-09T00:15:00Z",
          "endedBy": "halted",
          "to": "interview",
          "event": {
            "name": "sized",
            "at": "2026-11-08T23:59:00Z"
          },
          "detail": "Sized; the interview starts.",
          "interview": [
            {
              "text": "Does KotlinBottools stay public until the swap?",
              "options": [
                "Private again now, before the first write; the rehearsal stays as designed",
                "Public until the swap; a public source and private target are rehearsed, and the source goes private before archiving",
                "Drop the swap and rewrite in place; the parent design is re-planned"
              ],
              "answer": "The repository stays public until the swap, and the rehearsal proves a public source moving to a private target",
              "asked": "2026-11-09T00:15:00Z",
              "answered": "2026-11-09T01:08:58Z"
            },
            {
              "text": "Does the fixture carry a second level of sub-issues?",
              "options": [
                "One level, as specified",
                "Add a middle node"
              ],
              "answer": "The fixture nests sub-issues to mixed depth and the walk handles any depth",
              "asked": "2026-11-09T00:15:00Z",
              "answered": "2026-11-09T01:08:58Z"
            },
            {
              "text": "After a failed step, does everything stop?",
              "options": [
                "Stop at the first failed step, archive both, hand back",
                "Stop the walk at the failure, still run link re-creation and the rename swap, archive both, hand back every result"
              ],
              "answer": "After a failed step the walk stops but link re-creation and the rename swap still run",
              "asked": "2026-11-09T00:15:00Z",
              "answered": "2026-11-09T01:08:58Z"
            }
          ],
          "held": true
        },
        {
          "since": "2026-11-09T01:08:58Z",
          "ended": "2026-11-09T01:12:00Z",
          "endedBy": "research-planning",
          "to": "research",
          "event": {
            "name": "resumed",
            "at": "2026-11-09T01:08:58Z"
          },
          "detail": "The repository stays public until the swap, and the rehearsal proves a public source moving to a private target; the fixture nests sub-issues to mixed depth and the walk handles any depth; after a failed step the walk stops but link re-creation and the rename swap still run.",
          "interview": [
            {
              "text": "Does KotlinBottools stay public until the swap?",
              "options": [
                "Private again now, before the first write; the rehearsal stays as designed",
                "Public until the swap; a public source and private target are rehearsed, and the source goes private before archiving",
                "Drop the swap and rewrite in place; the parent design is re-planned"
              ],
              "answer": "The repository stays public until the swap, and the rehearsal proves a public source moving to a private target",
              "asked": "2026-11-09T00:15:00Z",
              "answered": "2026-11-09T01:08:58Z"
            },
            {
              "text": "Does the fixture carry a second level of sub-issues?",
              "options": [
                "One level, as specified",
                "Add a middle node"
              ],
              "answer": "The fixture nests sub-issues to mixed depth and the walk handles any depth",
              "asked": "2026-11-09T00:15:00Z",
              "answered": "2026-11-09T01:08:58Z"
            },
            {
              "text": "After a failed step, does everything stop?",
              "options": [
                "Stop at the first failed step, archive both, hand back",
                "Stop the walk at the failure, still run link re-creation and the rename swap, archive both, hand back every result"
              ],
              "answer": "After a failed step the walk stops but link re-creation and the rename swap still run",
              "asked": "2026-11-09T00:15:00Z",
              "answered": "2026-11-09T01:08:58Z"
            }
          ]
        }
      ],
      "research": [
        {
          "since": "2026-11-09T01:12:00Z",
          "ended": "2026-11-09T02:29:56Z",
          "endedBy": "researched",
          "to": "plan",
          "event": {
            "name": "verification-started",
            "at": "2026-11-09T01:36:00Z"
          },
          "detail": "Research: verifying 3 findings.",
          "research": {
            "phase": "complete",
            "drafted": 0,
            "since": {
              "planning": "2026-11-09T01:12:00Z",
              "research": "2026-11-09T01:14:00Z",
              "verification": "2026-11-09T01:36:00Z",
              "complete": "2026-11-09T02:29:56Z"
            }
          },
          "questions": [
            {
              "question": "issue-transfer-behaviour",
              "rows": [],
              "findings": "research/issue-transfer-behaviour.md",
              "state": "complete",
              "started": "2026-11-09T01:14:00Z",
              "returned": "2026-11-09T01:32:00Z"
            },
            {
              "question": "rename-visibility-archive-sequence",
              "rows": [],
              "findings": "research/rename-visibility-archive-sequence.md",
              "state": "complete",
              "started": "2026-11-09T01:14:00Z",
              "returned": "2026-11-09T01:32:00Z"
            },
            {
              "question": "fixture-and-read-api-forms",
              "rows": [],
              "findings": "research/fixture-and-read-api-forms.md",
              "state": "complete",
              "started": "2026-11-09T01:14:00Z",
              "returned": "2026-11-09T01:40:00Z"
            }
          ]
        }
      ],
      "plan": [
        {
          "since": "2026-11-09T02:29:56Z",
          "ended": "2026-11-09T02:29:56Z",
          "endedBy": "plan-accepted",
          "to": "branch",
          "event": {
            "name": "researched",
            "at": "2026-11-09T02:29:56Z"
          },
          "detail": "Research verified; the plan next.",
          "plan": {
            "state": "writing",
            "since": "2026-11-09T02:29:56Z"
          }
        }
      ],
      "branch": [
        {
          "since": "2026-11-09T02:29:56Z",
          "ended": "2026-11-09T02:29:56Z",
          "endedBy": "branch-cut",
          "to": "implementation",
          "event": {
            "name": "plan-accepted",
            "at": "2026-11-09T02:29:56Z"
          },
          "detail": "Plan accepted; the branch is cut next.",
          "branch": "chore/issue-22-transfer-rehearsal"
        }
      ],
      "implementation": [
        {
          "since": "2026-11-09T02:29:56Z",
          "ended": "2026-11-09T04:35:07Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-09T04:32:16Z",
            "note": "S2 reported done; S3 current"
          },
          "detail": "The fixture equals its specification: numbers 1 to 10 (nine issues and one merged pull request), four comments, seven sub-issue and four blocked-by links, two closed issues.",
          "stages": [
            {
              "id": "S0",
              "name": "Local readiness",
              "state": "done",
              "rows": [
                "rehearsal-tool",
                "requested-writes"
              ]
            },
            {
              "id": "S1",
              "name": "Repositories, labels and milestone",
              "state": "done",
              "rows": [
                "rehearsal-repositories",
                "item-content",
                "requested-writes"
              ]
            },
            {
              "id": "S2",
              "name": "The fixture",
              "state": "done",
              "rows": [
                "fixture",
                "requested-writes"
              ]
            },
            {
              "id": "S3",
              "name": "The walk",
              "state": "current",
              "rows": [
                "number-walk",
                "pull-request-placeholder",
                "closed-issue",
                "item-content",
                "links",
                "failure-behaviour",
                "requested-writes"
              ]
            },
            {
              "id": "S4",
              "name": "Link reconciliation",
              "state": "todo",
              "rows": [
                "links",
                "requested-writes"
              ]
            },
            {
              "id": "S5",
              "name": "The rename swap",
              "state": "todo",
              "rows": [
                "rename-swap",
                "requested-writes"
              ]
            },
            {
              "id": "S6",
              "name": "Close-out",
              "state": "todo",
              "rows": [
                "rehearsal-repositories",
                "pass-condition",
                "failure-behaviour",
                "requested-writes"
              ]
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "How should the rehearsal proceed after the transfer rewrote bare issue references?",
              "options": [
                "Revise the plan: compare after mapping the rewritten references back, then resume the walk",
                "Take the stopped-walk path as written and hand back"
              ],
              "answer": "Revise the plan: the item check compares the text after mapping the rewritten references back, and the walk resumes at the second transfer on the same repositories",
              "asked": "2026-11-09T04:35:07Z",
              "answered": "2026-11-09T04:40:00Z"
            }
          ]
        },
        {
          "since": "2026-11-09T04:40:00Z",
          "ended": "2026-11-09T05:00:57Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "resumed",
            "at": "2026-11-09T04:40:00Z"
          },
          "detail": "The maintainer chose to revise the plan: the item check compares text after mapping the rewritten references back, then the walk resumes at the second transfer on the same repositories.",
          "stages": [
            {
              "id": "S0",
              "name": "Local readiness",
              "state": "done",
              "rows": [
                "rehearsal-tool",
                "requested-writes"
              ]
            },
            {
              "id": "S1",
              "name": "Repositories, labels and milestone",
              "state": "done",
              "rows": [
                "rehearsal-repositories",
                "item-content",
                "requested-writes"
              ]
            },
            {
              "id": "S2",
              "name": "The fixture",
              "state": "done",
              "rows": [
                "fixture",
                "requested-writes"
              ]
            },
            {
              "id": "S3",
              "name": "The walk",
              "state": "current",
              "rows": [
                "number-walk",
                "pull-request-placeholder",
                "closed-issue",
                "item-content",
                "links",
                "failure-behaviour",
                "requested-writes"
              ]
            },
            {
              "id": "S4",
              "name": "Link reconciliation",
              "state": "todo",
              "rows": [
                "links",
                "requested-writes"
              ]
            },
            {
              "id": "S5",
              "name": "The rename swap",
              "state": "todo",
              "rows": [
                "rename-swap",
                "requested-writes"
              ]
            },
            {
              "id": "S6",
              "name": "Close-out",
              "state": "todo",
              "rows": [
                "rehearsal-repositories",
                "pass-condition",
                "failure-behaviour",
                "requested-writes"
              ]
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "How should the rehearsal proceed now that references to already-moved issues keep the target's full name?",
              "options": [
                "Revise the plan again: accept any form naming either fixture repository, and measure after the swap whether the target-named references still resolve",
                "Take the stopped-walk path as written and hand back"
              ],
              "answer": "Revise the plan again: the item check accepts references naming either fixture repository, and the rename swap measures whether the target-named references still resolve",
              "asked": "2026-11-09T05:00:57Z",
              "answered": "2026-11-09T05:05:00Z"
            }
          ]
        },
        {
          "since": "2026-11-09T05:05:00Z",
          "ended": "2026-11-09T05:43:56Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-09T05:33:06Z",
            "note": "S4 reported done; S5 current"
          },
          "detail": "All nine numbers are in the target on their own numbers, the placeholder and both closed issues included, and every one of the eleven links was kept across the walk with none to re-create.",
          "stages": [
            {
              "id": "S0",
              "name": "Local readiness",
              "state": "done",
              "rows": [
                "rehearsal-tool",
                "requested-writes"
              ]
            },
            {
              "id": "S1",
              "name": "Repositories, labels and milestone",
              "state": "done",
              "rows": [
                "rehearsal-repositories",
                "item-content",
                "requested-writes"
              ]
            },
            {
              "id": "S2",
              "name": "The fixture",
              "state": "done",
              "rows": [
                "fixture",
                "requested-writes"
              ]
            },
            {
              "id": "S3",
              "name": "The walk",
              "state": "done",
              "rows": [
                "number-walk",
                "pull-request-placeholder",
                "closed-issue",
                "item-content",
                "links",
                "failure-behaviour",
                "requested-writes"
              ]
            },
            {
              "id": "S4",
              "name": "Link reconciliation",
              "state": "done",
              "rows": [
                "links",
                "requested-writes"
              ]
            },
            {
              "id": "S5",
              "name": "The rename swap",
              "state": "current",
              "rows": [
                "rename-swap",
                "requested-writes"
              ]
            },
            {
              "id": "S6",
              "name": "Close-out",
              "state": "todo",
              "rows": [
                "rehearsal-repositories",
                "pass-condition",
                "failure-behaviour",
                "requested-writes"
              ]
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "How should the rename swap proceed while anonymous repository web pages answer 504?",
              "options": [
                "Wait and retry the unchanged check",
                "Revise the plan: judge privacy on the API reads and record the web read without judging it",
                "Hand back here"
              ],
              "answer": "Wait and retry the unchanged check, about every 30 minutes for up to two hours",
              "asked": "2026-11-09T05:43:56Z",
              "answered": "2026-11-09T05:46:00Z"
            }
          ]
        },
        {
          "since": "2026-11-09T05:46:00Z",
          "ended": "2026-11-09T07:01:18Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-09T07:01:03Z",
            "note": "S6 reported done; Quality Review next"
          },
          "detail": "All seven stages passed. The rename onto the freed name was accepted, old issue URLs reach the new home, and both rehearsal repositories are private and archived.",
          "stages": [
            {
              "id": "S0",
              "name": "Local readiness",
              "state": "done",
              "rows": [
                "rehearsal-tool",
                "requested-writes"
              ]
            },
            {
              "id": "S1",
              "name": "Repositories, labels and milestone",
              "state": "done",
              "rows": [
                "rehearsal-repositories",
                "item-content",
                "requested-writes"
              ]
            },
            {
              "id": "S2",
              "name": "The fixture",
              "state": "done",
              "rows": [
                "fixture",
                "requested-writes"
              ],
              "finished": "2026-11-09T04:32:16Z",
              "report": "The fixture equals its specification: numbers 1 to 10 (nine issues and one merged pull request), four comments, seven sub-issue and four blocked-by links, two closed issues."
            },
            {
              "id": "S3",
              "name": "The walk",
              "state": "done",
              "rows": [
                "number-walk",
                "pull-request-placeholder",
                "closed-issue",
                "item-content",
                "links",
                "failure-behaviour",
                "requested-writes"
              ],
              "started": "2026-11-09T04:32:16Z"
            },
            {
              "id": "S4",
              "name": "Link reconciliation",
              "state": "done",
              "rows": [
                "links",
                "requested-writes"
              ],
              "finished": "2026-11-09T05:33:06Z",
              "report": "All nine numbers are in the target on their own numbers, the placeholder and both closed issues included, and every one of the eleven links was kept across the walk with none to re-create."
            },
            {
              "id": "S5",
              "name": "The rename swap",
              "state": "done",
              "rows": [
                "rename-swap",
                "requested-writes"
              ],
              "started": "2026-11-09T05:33:06Z",
              "finished": "2026-11-09T07:01:03Z",
              "report": "All seven stages passed. The rename onto the freed name was accepted, old issue URLs reach the new home, and both rehearsal repositories are private and archived."
            },
            {
              "id": "S6",
              "name": "Close-out",
              "state": "done",
              "rows": [
                "rehearsal-repositories",
                "pass-condition",
                "failure-behaviour",
                "requested-writes"
              ],
              "finished": "2026-11-09T07:01:03Z",
              "report": "All seven stages passed. The rename onto the freed name was accepted, old issue URLs reach the new home, and both rehearsal repositories are private and archived."
            }
          ]
        }
      ],
      "qa": [
        {
          "since": "2026-11-09T07:01:18Z",
          "ended": "2026-11-09T07:17:29Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-09T07:01:18Z",
            "note": "Quality Review 1: running"
          },
          "detail": "Quality Review 1 running.",
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
              }
            }
          ]
        },
        {
          "since": "2026-11-09T07:41:39Z",
          "ended": "2026-11-09T07:47:51Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-09T07:41:39Z",
            "note": "Quality Review 2: running"
          },
          "detail": "Quality Review 2 running.",
          "qa": [
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
              "route": "on-the-spot"
            }
          ]
        }
      ],
      "remediation": [
        {
          "since": "2026-11-09T07:17:29Z",
          "ended": "2026-11-09T07:41:39Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-09T07:17:29Z",
            "note": "Quality Review 1: changes-requested"
          },
          "detail": "Every acceptance criterion is met and no recorded result is untrue; the self-test leaves the result gate and the failure paths of the post checks unchecked.",
          "remediation": {
            "pass": 1
          },
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
              }
            }
          ]
        },
        {
          "since": "2026-11-09T07:47:51Z",
          "ended": "2026-11-09T07:48:46Z",
          "endedBy": "document",
          "to": "document",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-09T07:47:51Z",
            "note": "Quality Review 2: changes-requested"
          },
          "detail": "The tool is unchanged and its 87 self-test checks pass; the known-gaps record for the next unit needs six small wording additions.",
          "remediation": {
            "pass": 2,
            "route": "on-the-spot"
          },
          "qa": [
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
              "route": "on-the-spot"
            }
          ]
        }
      ],
      "document": [
        {
          "since": "2026-11-09T07:48:46Z",
          "ended": "2026-11-09T07:49:14Z",
          "endedBy": "run-restarted",
          "to": "document",
          "event": {
            "name": "document",
            "at": "2026-11-09T07:48:46Z",
            "note": "0 of 6 tasks done"
          },
          "detail": "Document: 0 of 6 tasks done.",
          "document": {
            "tasks": [
              {
                "id": "documentation-review",
                "name": "Documentation review",
                "state": "todo"
              },
              {
                "id": "reconcile-documentation",
                "name": "Reconcile documentation",
                "state": "todo"
              },
              {
                "id": "reconcile-plan",
                "name": "Reconcile plan",
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
          "outage": "the session stopped; a new session took the run up from its handoff"
        },
        {
          "since": "2026-11-09T23:16:07Z",
          "ended": "2026-11-10T00:14:07Z",
          "endedBy": "landing",
          "to": "landing",
          "event": {
            "name": "document",
            "at": "2026-11-10T00:11:35Z",
            "note": "6 of 6 tasks done"
          },
          "detail": "Document: 6 of 6 tasks done; every task done.",
          "document": {
            "tasks": [
              {
                "id": "documentation-review",
                "name": "Documentation review",
                "state": "done",
                "started": "2026-11-09T23:16:07Z",
                "finished": "2026-11-09T23:19:41Z"
              },
              {
                "id": "reconcile-documentation",
                "name": "Reconcile documentation",
                "state": "done",
                "started": "2026-11-09T23:19:41Z",
                "finished": "2026-11-09T23:26:48Z"
              },
              {
                "id": "reconcile-plan",
                "name": "Reconcile plan",
                "state": "done",
                "started": "2026-11-09T23:26:48Z",
                "finished": "2026-11-09T23:51:21Z",
                "report": "The as-built record, consequences and research notes now carry the rehearsal's measurements; the README and the changelog need no change for a documents-only landing."
              },
              {
                "id": "readme-changelog",
                "name": "README and CHANGELOG",
                "state": "done",
                "finished": "2026-11-09T23:51:21Z",
                "report": "The as-built record, consequences and research notes now carry the rehearsal's measurements; the README and the changelog need no change for a documents-only landing."
              },
              {
                "id": "state-boards",
                "name": "State boards",
                "state": "done",
                "started": "2026-11-09T23:51:21Z",
                "finished": "2026-11-10T00:10:35Z"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "done",
                "started": "2026-11-10T00:10:35Z",
                "finished": "2026-11-10T00:11:35Z"
              }
            ]
          }
        }
      ],
      "landing": [
        {
          "since": "2026-11-10T00:14:07Z",
          "ended": "2026-11-10T00:15:00Z",
          "endedBy": "merge",
          "to": "merge",
          "event": {
            "name": "landing",
            "at": "2026-11-10T00:14:07Z",
            "note": "land accepted"
          },
          "detail": "Landing: the land accepted; the branch carries the code, the version bump, the reconciled documents and the state boards."
        }
      ],
      "merge": [
        {
          "since": "2026-11-10T00:15:00Z",
          "ended": "2026-11-10T00:15:12Z",
          "endedBy": "landed",
          "to": "landed",
          "event": {
            "name": "merge",
            "at": "2026-11-10T00:15:00Z",
            "note": "merging PR #31"
          },
          "detail": "Merge: merging it in PR #31."
        }
      ]
    },
    "next": null,
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
        "note": "The tool is unchanged and its 87 self-test checks pass; the known-gaps record for the next unit needed six small wording additions, made in place. Test check: no findings; code check: 6 minor, all wording."
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
    "waits": [
      {
        "step": "interview",
        "since": "2026-11-09T00:15:00Z",
        "ended": "2026-11-09T01:08:58Z",
        "by": "halted"
      },
      {
        "step": "implementation",
        "since": "2026-11-09T04:35:07Z",
        "ended": "2026-11-09T04:40:00Z",
        "by": "halted"
      },
      {
        "step": "implementation",
        "since": "2026-11-09T05:00:57Z",
        "ended": "2026-11-09T05:05:00Z",
        "by": "halted"
      },
      {
        "step": "implementation",
        "since": "2026-11-09T05:43:56Z",
        "ended": "2026-11-09T05:46:00Z",
        "by": "halted"
      }
    ],
    "asked": [
      {
        "step": "implementation",
        "text": "How should the rehearsal proceed after the transfer rewrote bare issue references?",
        "options": [
          "Revise the plan: compare after mapping the rewritten references back, then resume the walk",
          "Take the stopped-walk path as written and hand back"
        ],
        "answer": "Revise the plan: the item check compares the text after mapping the rewritten references back, and the walk resumes at the second transfer on the same repositories",
        "asked": "2026-11-09T04:35:07Z",
        "answered": "2026-11-09T04:40:00Z"
      },
      {
        "step": "implementation",
        "text": "How should the rehearsal proceed now that references to already-moved issues keep the target's full name?",
        "options": [
          "Revise the plan again: accept any form naming either fixture repository, and measure after the swap whether the target-named references still resolve",
          "Take the stopped-walk path as written and hand back"
        ],
        "answer": "Revise the plan again: the item check accepts references naming either fixture repository, and the rename swap measures whether the target-named references still resolve",
        "asked": "2026-11-09T05:00:57Z",
        "answered": "2026-11-09T05:05:00Z"
      },
      {
        "step": "implementation",
        "text": "How should the rename swap proceed while anonymous repository web pages answer 504?",
        "options": [
          "Wait and retry the unchanged check",
          "Revise the plan: judge privacy on the API reads and record the web read without judging it",
          "Hand back here"
        ],
        "answer": "Wait and retry the unchanged check, about every 30 minutes for up to two hours",
        "asked": "2026-11-09T05:43:56Z",
        "answered": "2026-11-09T05:46:00Z"
      }
    ],
    "document": {
      "tasks": [
        {
          "id": "documentation-review",
          "name": "Documentation review",
          "state": "done",
          "started": "2026-11-09T23:16:07Z",
          "finished": "2026-11-09T23:19:41Z"
        },
        {
          "id": "reconcile-documentation",
          "name": "Reconcile documentation",
          "state": "done",
          "started": "2026-11-09T23:19:41Z",
          "finished": "2026-11-09T23:26:48Z"
        },
        {
          "id": "reconcile-plan",
          "name": "Reconcile plan",
          "state": "done",
          "started": "2026-11-09T23:26:48Z",
          "finished": "2026-11-09T23:51:21Z",
          "report": "The as-built record, consequences and research notes now carry the rehearsal's measurements; the README and the changelog need no change for a documents-only landing."
        },
        {
          "id": "readme-changelog",
          "name": "README and CHANGELOG",
          "state": "done",
          "finished": "2026-11-09T23:51:21Z",
          "report": "The as-built record, consequences and research notes now carry the rehearsal's measurements; the README and the changelog need no change for a documents-only landing."
        },
        {
          "id": "state-boards",
          "name": "State boards",
          "state": "done",
          "started": "2026-11-09T23:51:21Z",
          "finished": "2026-11-10T00:10:35Z"
        },
        {
          "id": "document-landing",
          "name": "Document commit",
          "state": "done",
          "started": "2026-11-10T00:10:35Z",
          "finished": "2026-11-10T00:11:35Z"
        }
      ]
    },
    "outages": [
      {
        "step": "document",
        "since": "2026-11-09T07:49:14Z",
        "ended": "2026-11-09T07:50:38Z",
        "reason": "the session stopped; a new session took the run up from its handoff"
      },
      {
        "step": "document",
        "since": "2026-11-09T07:50:38Z",
        "ended": "2026-11-09T23:16:07Z",
        "reason": "the session stopped; a new session took the run up from its handoff"
      }
    ]
  },
  "milestones": [
    {
      "column": "gap",
      "label": "Research verified",
      "date": "2026-11-09",
      "ref": "research/README.md",
      "note": "three questions, three findings files, 55 load-bearing claims re-opened at their sources and holding"
    },
    {
      "column": "gap",
      "label": "Research verified, in #2's run",
      "date": "2026-10-21",
      "ref": "../research/README.md",
      "note": "written on this board at sized from #2's research summary (§3.4, §3.6, §3.9) and findings, and architecture §2.4, §3 and §7, with this unit's row in §15"
    },
    {
      "column": "considered",
      "label": "Architecture signed off, in #2's run",
      "date": "2026-11-07",
      "ref": "../architecture.md",
      "note": "the options #2's architecture weighed for this unit: §7.2 and §14, with its fallbacks for a closed issue and a linked parent left open until the rehearsal; this unit's own plan adds to them at plan acceptance"
    },
    {
      "column": "verdict",
      "label": "Plan accepted",
      "date": "2026-11-09",
      "ref": "plan.md",
      "note": "seven stages, S0 to S6, every GitHub write a request, the tool saved from the plan and checked before anything runs"
    },
    {
      "column": "built",
      "label": "Merged",
      "date": "2026-11-10",
      "ref": "PR #31",
      "note": "merged as 9af27b2"
    }
  ],
  "trail": [
    {
      "date": "2026-11-08",
      "column": "gap",
      "label": "Sized; the interview starts"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "Gap and Considered written from #2's research and architecture",
      "ref": "../architecture.md#15-decomposition"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Halted at the interview: waiting on you (the maintainer's answers to three planning questions)"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Resumed at the interview"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Research planning: 0 questions drafted"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Research started: `issue-transfer-behaviour`, `rename-visibility-archive-sequence`, `fixture-and-read-api-forms`"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Research returned: `issue-transfer-behaviour`",
      "ref": "research/issue-transfer-behaviour.md"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Research returned: `fixture-and-read-api-forms`",
      "ref": "research/fixture-and-read-api-forms.md"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Research returned: `rename-visibility-archive-sequence`",
      "ref": "research/rename-visibility-archive-sequence.md"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Verification started: 3 findings"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Research verified; the plan next",
      "ref": "research/README.md"
    },
    {
      "date": "2026-11-09",
      "column": "verdict",
      "label": "Plan accepted",
      "ref": "plan.md"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Branch `chore/issue-22-transfer-rehearsal` cut; implementation starts at S0"
    },
    {
      "date": "2026-11-09",
      "column": "gap",
      "label": "Gap column extended from this unit's research",
      "ref": "research/README.md"
    },
    {
      "date": "2026-11-09",
      "column": "verdict",
      "label": "Considered and Verdict written from the plan, with the consequences",
      "ref": "plan.md"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "S0 done; S1 current: Repositories, labels and milestone"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "S1 done; S2 current: The fixture"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "S2 done; S3 current: The walk"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Halted at implementation: waiting on you (the maintainer's decision on the item check)"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Resumed at implementation"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "S4 done; S5 current: The rename swap"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Halted at implementation: waiting on you (the maintainer's decision on the web check)"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Implementation done (7 stages); Quality Review next"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Quality Review 1: running"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Quality Review 1: changes requested, 16 findings (13 minor, 3 other)"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Quality Review 2: running"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Quality Review 2: changes requested, 6 findings (6 minor)"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Document: 0 of 6 tasks done"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Document: Documentation review current"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Document: Reconcile documentation current"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Document: Reconcile plan current"
    },
    {
      "date": "2026-11-09",
      "column": "built",
      "label": "Document: State boards current"
    },
    {
      "date": "2026-11-10",
      "column": "built",
      "label": "Document: Document commit current"
    },
    {
      "date": "2026-11-10",
      "column": "built",
      "label": "Document: every task done"
    },
    {
      "date": "2026-11-10",
      "column": "built",
      "label": "Landing: the land accepted"
    },
    {
      "date": "2026-11-10",
      "column": "built",
      "label": "Merge: merging it in PR #31",
      "ref": "PR #31"
    },
    {
      "date": "2026-11-10",
      "column": "built",
      "label": "Landed in PR #31, merge 9af27b2",
      "ref": "PR #31"
    }
  ],
  "rows": [
    {
      "id": "rehearsal-tool",
      "group": "The tool and its checks",
      "name": "The rehearsal tool and its checks",
      "system": "repository-swap",
      "where": "`BotWS/tools/rehearsal/rehearsal.py` · `rehearsal-step.sh`",
      "gap": {
        "kind": "missing",
        "summary": "Nothing exists to build the fixture, walk it and prove each step. The ready-made commands do not fit: `gh issue view --json` truncates \"blocked by\" and \"blocking\" at 50, and a recursive read of the hierarchy assumes a traversal bound and costs many more calls.",
        "evidence": [
          "`research/README.md:203` — the reads are one GraphQL query per page, flat, each issue stating its own links, compared as sets, so no depth is assumed",
          "`research/README.md:213` — what does not fit: `gh issue transfer`, `gh issue edit --add-sub-issue` and `--parent`, `gh issue view --json`, a recursive read",
          "`research/README.md:208` — one request at a time, paced, reading back before any retry"
        ],
        "source": "research/README.md §3",
        "link": "research/README.md#3-the-api-forms"
      },
      "options": [
        {
          "id": "flat-read-tool",
          "name": "One standard-library tool, reading flat by node id and comparing edges as sets",
          "verdict": "accepted",
          "why": "It works at any depth, so nothing needs a traversal bound, and every read survives a rename because it goes by node id.",
          "source": "research/README.md §3",
          "link": "research/README.md#3-the-api-forms"
        },
        {
          "id": "recursive-read",
          "name": "A recursive walk of the hierarchy",
          "verdict": "declined",
          "why": "It assumes a traversal bound and costs many more calls than a flat read.",
          "source": "research/README.md §3",
          "link": "research/README.md#3-the-api-forms"
        },
        {
          "id": "gh-issue-view",
          "name": "`gh issue view --json` for the links",
          "verdict": "declined",
          "why": "It truncates \"blocked by\" and \"blocking\" at 50.",
          "source": "research/README.md §3",
          "link": "research/README.md#3-the-api-forms"
        }
      ],
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "One Python file, standard library only, stays in the workspace and is saved from the plan, checked by size and hash before anything runs.",
            "ref": "plan.md#how-the-scripts-reach-the-machine",
            "excerpt": {
              "ref": "plan.md#how-the-scripts-reach-the-machine",
              "heading": "How the scripts reach the machine",
              "paragraph": "The scripts live in this plan and in the workspace, never in a repository. Appendix A holds `rehearsal.py` and `rehearsal-step.sh` in fenced blocks whose info string carries `file=<name>`. The S0 bootstrap saves each block byte for byte with carriage returns stripped, and checks each against its recorded size and sha256 before anything runs. · The runner is unit 1's `run-stage.sh`: `bash \"$TOOLS/run-stage.sh\" rehearsal-step <subcommand> [args]` runs `$TOOLS/rehearsal-step.sh`, which sources `env.sh` and runs the tool; the runner writes a start line, the output and `== rehearsal-step exit=<n>` …",
              "hash": "54e7b6df7a3a"
            }
          },
          {
            "text": "It reads both repositories flat by node id and holds the links as sets of edges, so nothing assumes a depth.",
            "ref": "plan.md#the-tool",
            "excerpt": {
              "ref": "plan.md#the-tool",
              "heading": "The tool",
              "paragraph": "One Python 3 file, `rehearsal.py`, standard library only, run as `python -X utf8 -I` by `rehearsal-step.sh` (Appendix A). Subcommands (a key carries its number: `transfer-5`, `comment-1-2`):",
              "hash": "de6168799672"
            }
          },
          {
            "text": "Its `selftest` and a read-only `smoke` of KotlinBottools pass before any request is generated.",
            "ref": "plan.md#s0--local-readiness",
            "excerpt": {
              "ref": "plan.md#s0--local-readiness",
              "heading": "S0 — Local readiness",
              "paragraph": "Bootstrap: one call, typed exactly as written. It saves the two files of Appendix A from this plan and checks each by size and sha256. It must run from inside the working tree that holds this plan.",
              "hash": "d8aa9db2d05f"
            }
          },
          {
            "text": "It prints counts, ids, fixture text and fixed markers, never a token, and records nothing from a real repository.",
            "ref": "plan.md#the-output-rule",
            "excerpt": {
              "ref": "plan.md#the-output-rule",
              "heading": "The output rule",
              "paragraph": "The tool prints counts, ids, fixture text, fixed markers and exit statuses. The only read of a real repository is `smoke`, and it prints counts. Nothing in `DATA/run/rehearsal/` comes from a real repository. A reply's text, kept whole, is GitHub's answer about the throwaway repositories. `rehearsal.py` never prints a token: the `--verbose` output of `gh api` is filtered to its `< HTTP` and `< Location` lines.",
              "hash": "25427d566f7a"
            }
          }
        ],
        "defense": "The tool is written for every outcome of a transfer rather than a forecast of it. It stays out of every repository, and the next unit reuses its reads and comparisons.",
        "steps": [
          {
            "id": "S0",
            "what": "Save the tool and its runner from the plan, check both, then run the self-test, the smoke read and the names and rate checks.",
            "check": "`STAGE S0 OK`",
            "link": "plan.md#s0--local-readiness"
          }
        ],
        "tests": [
          "L1 gating — the size and hash check of the saved files",
          "L2 component — `selftest`'s 71 checks against an in-memory stand-in of GitHub",
          "L3 integration — `smoke`, reading KotlinBottools through the real `gh`"
        ],
        "risks": [
          "The stand-in proves the tool's logic and nothing about GitHub's timing or undocumented behaviour"
        ],
        "source": "plan.md Design (The tool), §7.4 S0",
        "link": "plan.md#the-tool"
      },
      "asBuilt": {
        "state": "as-planned",
        "statements": [
          {
            "text": "`rehearsal.py` and `rehearsal-step.sh` were saved from the plan into the workspace, and each matched its recorded size and sha256, so the tool is the plan's single standard-library Python file.",
            "state": "as-planned"
          },
          {
            "text": "The saved file is the plan's unchanged, so it reads a repository flat by node id and holds the links as sets of edges; `smoke` ran that read on KotlinBottools.",
            "state": "as-planned"
          },
          {
            "text": "`selftest` passed and `smoke` read KotlinBottools, and S0 closed before any request was generated.",
            "state": "as-planned"
          },
          {
            "text": "The saved file keeps the plan's output rule: counts, ids, fixture text and fixed markers, never a token; its one read of a real repository, `smoke`, prints counts.",
            "state": "as-planned"
          }
        ]
      }
    },
    {
      "id": "rehearsal-repositories",
      "group": "Repositories and fixture",
      "name": "The two throwaway repositories",
      "system": "repository-swap",
      "where": "`phase0-rehearsal-a` · `phase0-rehearsal-b`",
      "gap": {
        "kind": "missing",
        "summary": "No repository exists to try a transfer on. The research could not exercise one, being allowed no mutation, and the swap needs its behaviour proved before anything touches KotlinBottools.",
        "evidence": [
          "`../research/github-residual-exposure-and-visibility.md:829` — `gh issue transfer` was not exercised, no mutation being allowed",
          "`../architecture.md:756` — a public source and a private, empty target prove the transfer mechanics on the shapes the real walk meets",
          "`research/README.md:163` — public into private is not refused by the documented rule, and one report shows it working on 2026-11-08"
        ],
        "source": "../architecture.md §7.2",
        "link": "../architecture.md#72-the-rehearsal"
      },
      "options": [
        {
          "id": "public-source-private-target",
          "name": "A public source with an initial commit, and a private, empty target",
          "verdict": "accepted",
          "why": "KotlinBottools has been public since 2026-11-08 and stays so until the swap, so the rehearsal proves the real direction, public into private.",
          "source": "../architecture.md §7.2, dated note of 2026-11-09",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "two-repositories",
          "name": "Two throwaway private repositories, the target empty",
          "verdict": "declined",
          "why": "The design as first signed off. With KotlinBottools public, two private repositories would not prove the direction the real walk takes.",
          "source": "../architecture.md §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "three-repositories",
          "name": "Three repositories, with a stand-alone \"foreign\" one",
          "verdict": "declined",
          "why": "The issue that stays in the source repository already gives the cross-repository shape after the transfer, and the real walk reads and re-creates every link regardless.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        },
        {
          "id": "private-again-first",
          "name": "Make KotlinBottools private again before the first write, the rehearsal as designed",
          "verdict": "declined",
          "why": "The maintainer kept the repository public until the swap, so the rehearsal takes the public source instead."
        },
        {
          "id": "rewrite-in-place",
          "name": "Drop the swap and rewrite in place",
          "verdict": "declined",
          "why": "It would re-plan the parent design, and the maintainer kept the swap."
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "`phase0-rehearsal-a`, id 1450917603, was created public with an initial commit and `phase0-rehearsal-b`, id 1450918337, private and empty, and each was read back.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The tool and its runner, the text of the plan's Appendix A, each equal to the size and sha256 the plan's bootstrap checks:",
              "hash": "c6eb1398146a"
            }
          },
          {
            "text": "The walk ran in the real direction, public into private: 35 link statuses spanned the public source and the private target, and every one of them was kept.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-links",
            "excerpt": {
              "ref": "final-implementation.md#34-links",
              "heading": "3.4 Links",
              "paragraph": "At each transfer. After each of the eight transfers all 11 fixture links read `kept`: the seven sub-issue links 56 times in all and the four \"blocked by\" links 32 times. None read dropped, repointed, stale or unsettled. The first read after each transfer already held every link, and a second equal read followed (15 to 17 seconds per settle); each of the 14 snapshots settled after two reads, with no inconsistent edge. · Across a public and a private repository. 35 of those statuses were of a link with one end in each repository, while the source was public and the target private, and all were …",
              "hash": "fc99f3431b47"
            }
          },
          {
            "text": "Both repositories ended private and archived, as `phase0-rehearsal-a-legacy` and `phase0-rehearsal-a`, read back by id; unauthenticated requests to each answer 404, and neither was deleted.",
            "state": "as-planned",
            "ref": "final-implementation.md#36-the-rename-swap",
            "excerpt": {
              "ref": "final-implementation.md#36-the-rename-swap",
              "heading": "3.6 The rename swap",
              "paragraph": "The rename onto the freed name was accepted, about six minutes after the source released it (the reads after the two renames were taken at 06:50:45 and 06:56:32). · Identity. Each read-back by id matched at its first read: at each step each repository read by id carried its expected name and flags, and each name it held answered its id. From the source's privacy step on, unauthenticated requests to it by name, by id and on the web answered 404; the target answered 404 throughout. · The released names. Before the swap `phase0-rehearsal-a-legacy` did not exist. After the source's rename, …",
              "hash": "5a267921590f"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "`phase0-rehearsal-a` is created public with an initial commit and `phase0-rehearsal-b` private and truly empty, each read back.",
            "ref": "plan.md#s1--repositories-labels-and-milestone",
            "excerpt": {
              "ref": "plan.md#s1--repositories-labels-and-milestone",
              "heading": "S1 — Repositories, labels and milestone",
              "paragraph": "STEPs, in this order: `repo-a`, `repo-b`, `labels-a`, `labels-b`, `milestone-a`, `milestone-b`. Then:",
              "hash": "ad43cc2b3b16"
            }
          },
          {
            "text": "The source is public because the real walk's source is, so the walk runs in the real direction.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "Goals",
              "hash": "0057c623b76c"
            }
          },
          {
            "text": "Both repositories end private and archived, read back by id, and neither is deleted.",
            "ref": "plan.md#s6--close-out",
            "excerpt": {
              "ref": "plan.md#s6--close-out",
              "heading": "S6 — Close-out",
              "paragraph": "STEPs, in this order: `private-src`, `archive-src`, `archive-tgt`. After S5 the first two print `SKIP` (their checks still run); after a stop in S5 they finish what is left. Then:",
              "hash": "185b8dc4254e"
            }
          }
        ],
        "defense": "The three names were confirmed unused before any write, and the pair is throwaway: it holds made-up text only.",
        "steps": [
          {
            "id": "S1",
            "what": "Create both repositories through requests, each read back by id and by name.",
            "check": "`STAGE S1 OK`",
            "link": "plan.md#s1--repositories-labels-and-milestone"
          },
          {
            "id": "S6",
            "what": "Archive what is left and read both repositories private and archived.",
            "check": "`STAGE S6 OK`",
            "link": "plan.md#s6--close-out"
          }
        ],
        "tests": [
          "L3 integration — the post-checks of S1 and S6, reading both repositories by id"
        ],
        "risks": [
          "The throwaway source is public until S5, and holds made-up text only"
        ],
        "source": "plan.md Requirements 1, §7.4 S1 and S6",
        "link": "plan.md#s1--repositories-labels-and-milestone"
      }
    },
    {
      "id": "fixture",
      "group": "Repositories and fixture",
      "name": "The fixture in the source",
      "system": "repository-swap",
      "where": "`phase0-rehearsal-a`",
      "gap": {
        "kind": "missing",
        "summary": "A rehearsal proves only the shapes it is given. The real walk meets a pull request numbered between issues, a closed issue, comments, sub-issue and \"blocked by\" links, and links that turn cross-repository, and no repository holds that set to try.",
        "evidence": [
          "`../architecture.md:752` — the fixture: a tracking issue with sub-issues, one with a label and the milestone, one with neither, one closed",
          "`../architecture.md:757` — an issue that stays behind makes some links cross-repository, the real shape of the MagicBot and WebTools links",
          "`../research/README.md:800` — 21 of the real links are across repositories",
          "`research/README.md:43` — sub-issues in this work nest to more than one level, with branches of different depths",
          "`research/README.md:159` — whether a link may span a public and a private repository is not documented, and the fixture's stay-behind issue measures it"
        ],
        "source": "../architecture.md §7.2",
        "link": "../architecture.md#72-the-rehearsal"
      },
      "options": [
        {
          "id": "every-shape",
          "name": "One fixture carrying every shape the real walk meets, an issue that stays behind included",
          "verdict": "accepted",
          "why": "Each shape it carries is one the rehearsal can then report on by itself: number, placeholder, closed issue, link kind.",
          "source": "../architecture.md §7.2, §7.6",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "one-level",
          "name": "One level of sub-issues, as specified",
          "verdict": "declined",
          "why": "Sub-issues in this work nest to more than one level, with branches of different depths, so a fixture of one level would not show what the real walk meets.",
          "source": "research/README.md question 1",
          "link": "research/README.md#the-questions"
        },
        {
          "id": "middle-node",
          "name": "Add a middle node",
          "verdict": "partial",
          "why": "Taken and deepened: the fixture has a middle node and a further child under it, so the nesting is of mixed depth and the walk handles any depth.",
          "source": "plan.md Requirements 3",
          "link": "plan.md#requirements"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "statements": [
          {
            "text": "The numbers 1 to 10 came out as specified, nine issues and one merged pull request numbered between them.",
            "state": "as-planned"
          },
          {
            "text": "The seven sub-issue links equalled the specification's hierarchy, three levels deep on one branch and one on the others, and the tool that compared them is the plan's unchanged file, which assumes no depth.",
            "state": "as-planned"
          },
          {
            "text": "The four blocked-by links equalled the specification, two of them joining the issue that stays in the source both ways to issues the walk moves, so those two are the links that go cross-repository.",
            "state": "as-planned"
          },
          {
            "text": "The text was the tool's generated text, with non-ASCII and one body of about 9 KB, and the whole fixture, its four comments and two closed issues included, equalled the specification before the walk began.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "One fixture of ten numbers, nine issues and one merged pull request numbered between them, is built strictly serially so the numbers come out as specified.",
            "ref": "plan.md#s2--the-fixture",
            "excerpt": {
              "ref": "plan.md#s2--the-fixture",
              "heading": "S2 — The fixture",
              "paragraph": "STEPs, in this order: `issues-1`, `pr-4`, `issues-5`, `comment-1-1`, `comment-1-2`, `comment-2-1`, `comment-7-1`, `links-fixture`, `close-5`, `close-7`. The numbers must come out exactly as the fixture table says, so nothing else is created in A and nothing in B. Then:",
              "hash": "80f123b3530a"
            }
          },
          {
            "text": "Sub-issues nest to mixed depth, three levels on one branch and one on the others, and the checks assume no depth.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "Goals",
              "hash": "0057c623b76c"
            }
          },
          {
            "text": "An issue that stays in the source is linked both ways to moved ones, so two links cross repositories, and until the swap a public and a private one.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "Goals",
              "hash": "0057c623b76c"
            }
          },
          {
            "text": "The text is made up and deterministic, with non-ASCII and one 9 KB body, and the whole is verified against the spec before the walk.",
            "ref": "plan.md#s2--the-fixture",
            "excerpt": {
              "ref": "plan.md#s2--the-fixture",
              "heading": "S2 — The fixture",
              "paragraph": "STEPs, in this order: `issues-1`, `pr-4`, `issues-5`, `comment-1-1`, `comment-1-2`, `comment-2-1`, `comment-7-1`, `links-fixture`, `close-5`, `close-7`. The numbers must come out exactly as the fixture table says, so nothing else is created in A and nothing in B. Then:",
              "hash": "80f123b3530a"
            }
          }
        ],
        "defense": "Each shape it carries is one the rehearsal can then report on by itself. Nothing real goes into it.",
        "steps": [
          {
            "id": "S2",
            "what": "Build the fixture's numbers, comments, links and closes through requests in order, then verify it whole and record the baseline.",
            "check": "`STAGE S2 OK`",
            "link": "plan.md#s2--the-fixture"
          }
        ],
        "tests": [
          "L4a deterministic — the fixture's text and sizes and its 11 expected edges"
        ],
        "risks": [
          "A number that comes out wrong cannot be repaired: the pair is abandoned, made private and archived, and the unit hands back"
        ],
        "source": "plan.md Requirements 3, §7.4 S2",
        "link": "plan.md#s2--the-fixture"
      }
    },
    {
      "id": "number-walk",
      "group": "The walk",
      "name": "Issues transferred in numeric order, each on its own number",
      "system": "repository-swap",
      "where": "`phase0-rehearsal-a` to `phase0-rehearsal-b`",
      "gap": {
        "kind": "risk",
        "summary": "Nothing says a transfer keeps an issue's number. GitHub documents nothing about numbers, the only evidence is three public reports of a transfer taking the next number of the target's sequence, 25 into an empty private repository among them, and about 180 text citations stay correct only if the numbers survive.",
        "evidence": [
          "`../architecture.md:272` — nothing is documented about numbers",
          "`../architecture.md:293` — the assumption that issues transferred in numeric order land on their source numbers, shown by the rehearsal",
          "`research/README.md:142` — a transfer takes the next number of the target's sequence: three public reports, undocumented",
          "`research/README.md:143` — 25 transfers from a public repository into an empty private one landed on #1 to #25",
          "`../research/README.md:802` — about 180 text citations depend on the numbers"
        ],
        "source": "../architecture.md §2.4, §3",
        "link": "../architecture.md#3-assumptions"
      },
      "options": [
        {
          "id": "numeric-order-checked",
          "name": "Transfer into the empty target in numeric order, one step at a time, checking each item lands on its own number",
          "verdict": "accepted",
          "why": "An item on the wrong number fails the pass condition, and the per-step results say which number it was.",
          "source": "../architecture.md §7.2, §7.6",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "gh-issue-transfer",
          "name": "`gh issue transfer`",
          "verdict": "declined",
          "why": "It makes three requests, addresses its target by name and returns only a URL, where the walk pins the target by node id.",
          "source": "research/README.md §3",
          "link": "research/README.md#3-the-api-forms"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The walk took numbers 1 to 9 in order with the plan's requests, which pin the target by repository id, and all nine are in the target on their own numbers.",
            "state": "as-planned"
          },
          {
            "text": "Each step ran on the census of the target's highest number and was checked on its landed number, and no number landed elsewhere.",
            "state": "as-planned"
          },
          {
            "text": "The walk ran on the plan's tool, whose procedures pause 10 seconds after a transfer and read back before a retry; the as-built record lists no deviation from it.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "Issues 1 to 9 are transferred in numeric order with the GraphQL mutation, the target pinned by repository node id.",
            "ref": "plan.md#s3--the-walk",
            "excerpt": {
              "ref": "plan.md#s3--the-walk",
              "heading": "S3 — The walk",
              "paragraph": "STEPs, in this order: `transfer-1`, `transfer-2`, `transfer-3`, `placeholder-4`, `transfer-5`, `transfer-6`, `transfer-7`, `transfer-8`, `transfer-9`. For every transfer, `request` first checks that A holds the number, that B's highest number is n−1, and that n is not already in B; `PROCEED` is the only go-ahead. After each STEP the check prints, for a transfer:",
              "hash": "acde2f993a99"
            }
          },
          {
            "text": "Before each step the target's highest number is one less, and after it the item must be on its own number; a wrong number ends the walk.",
            "ref": "plan.md#s3--the-walk",
            "excerpt": {
              "ref": "plan.md#s3--the-walk",
              "heading": "S3 — The walk",
              "paragraph": "STEPs, in this order: `transfer-1`, `transfer-2`, `transfer-3`, `placeholder-4`, `transfer-5`, `transfer-6`, `transfer-7`, `transfer-8`, `transfer-9`. For every transfer, `request` first checks that A holds the number, that B's highest number is n−1, and that n is not already in B; `PROCEED` is the only go-ahead. After each STEP the check prints, for a transfer:",
              "hash": "acde2f993a99"
            }
          },
          {
            "text": "Each transfer runs alone, at least 10 seconds after the last, reading back before any retry.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "Every write is one request to the request protocol, sent under a job. A job is a named, scoped grant recorded under `SpartanLaboratories/KotlinBottools`: its scope lists the repositories its requests may touch and the actions they may use; each request names it in `permissionReason`, and the job is open while the grant is in force. An action is a named kind of write that the request protocol carries out (`create-repo`, `transfer-issue`, `rename-repo` and the rest of the table below); an action is defined when the protocol has it. A request is a JSON document that the tool generates into …",
              "hash": "15a802f7607f"
            }
          }
        ],
        "defense": "A wrong number cannot be repaired, so it is checked before and after every step rather than assumed. The results say which number it was.",
        "steps": [
          {
            "id": "S3",
            "what": "Take the walk's steps in numeric order, each guarded by the census and checked on its landed number.",
            "check": "`STAGE S3 OK`, or `STAGE S3 RECORDED walk-stopped-at=<n>`",
            "link": "plan.md#s3--the-walk"
          }
        ],
        "tests": [
          "L4b end-to-end — every item on its number in the target",
          "L4c non-functional — the pacing of every procedure and the four-attempt throttle rule"
        ],
        "risks": [
          "A transfer into a commit-less private repository may be refused: the first step then ends the walk with the refusal recorded",
          "The fixture has ten numbers and the real walk thirty and more, so its pacing is rehearsed only at this scale"
        ],
        "source": "plan.md Requirements 4, §7.4 S3",
        "link": "plan.md#s3--the-walk"
      }
    },
    {
      "id": "pull-request-placeholder",
      "group": "The walk",
      "name": "A closed placeholder at the pull request's number",
      "system": "repository-swap",
      "where": "`phase0-rehearsal-b`",
      "gap": {
        "kind": "risk",
        "summary": "A pull request cannot be transferred, yet it holds a number in the sequence issues share. That a placeholder issue created at that number keeps the sequence aligned is an assumption the rehearsal has to show.",
        "evidence": [
          "`../research/README.md:900` — a pull request cannot be transferred and is reproduced by a closed placeholder",
          "`../architecture.md:722` — issues and pull requests share one number sequence",
          "`../architecture.md:293` — the assumption that a placeholder keeps the sequence aligned",
          "`research/README.md:206` — the number census uses REST, because GraphQL `issues` omits pull requests"
        ],
        "source": "../architecture.md §3, §7.1",
        "link": "../architecture.md#3-assumptions"
      },
      "options": [
        {
          "id": "closed-placeholder",
          "name": "Reproduce the pull request by a closed placeholder issue at its number",
          "verdict": "accepted",
          "why": "It keeps every number at the cost of one closed issue per pull request.",
          "source": "../architecture.md §7.2, §14",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "renumber-after-the-issues",
          "name": "Transfer only the issues and renumber everything after them",
          "verdict": "declined",
          "why": "On the real walk it changes the numbers of #2's sub-issues, and with them their plan-folder names and every citation of them.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Number 4 is in the target on its own number, as the placeholder issue of the plan's request, whose body points to the pull request in the legacy repository.",
            "state": "as-planned"
          },
          {
            "text": "The placeholder took its step between the third and fifth numbers, on the census that requires the target's highest number to be 3, and S3 ended with it on number 4.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "Number 4 is reproduced in the target by an issue created at that number and closed, its body pointing to the pull request in the legacy repository.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "Every write is one request to the request protocol, sent under a job. A job is a named, scoped grant recorded under `SpartanLaboratories/KotlinBottools`: its scope lists the repositories its requests may touch and the actions they may use; each request names it in `permissionReason`, and the job is open while the grant is in force. An action is a named kind of write that the request protocol carries out (`create-repo`, `transfer-issue`, `rename-repo` and the rest of the table below); an action is defined when the protocol has it. A request is a JSON document that the tool generates into …",
              "hash": "15a802f7607f"
            }
          },
          {
            "text": "The step runs only when the target's highest number is 3, and the stage passes only with the placeholder on its number.",
            "ref": "plan.md#s3--the-walk",
            "excerpt": {
              "ref": "plan.md#s3--the-walk",
              "heading": "S3 — The walk",
              "paragraph": "STEPs, in this order: `transfer-1`, `transfer-2`, `transfer-3`, `placeholder-4`, `transfer-5`, `transfer-6`, `transfer-7`, `transfer-8`, `transfer-9`. For every transfer, `request` first checks that A holds the number, that B's highest number is n−1, and that n is not already in B; `PROCEED` is the only go-ahead. After each STEP the check prints, for a transfer:",
              "hash": "acde2f993a99"
            }
          }
        ],
        "defense": "One closed issue keeps every number after it where it was, and the census sees it because it counts issues and pull requests alike.",
        "steps": [
          {
            "id": "S3",
            "what": "Take the placeholder's step between the third and fifth numbers, guarded by the census.",
            "check": "the target's number 4 exists, closed, with the placeholder's title",
            "link": "plan.md#s3--the-walk"
          }
        ],
        "tests": [
          "L4b end-to-end — the placeholder on its number"
        ],
        "risks": [
          "One merged pull request only: placeholders next to each other and at the top number are not rehearsed"
        ],
        "source": "plan.md Requirements 4, Design (The requests), §7.4 S3",
        "link": "plan.md#s3--the-walk"
      }
    },
    {
      "id": "closed-issue",
      "group": "The walk",
      "name": "The closed issue's route through a transfer",
      "system": "repository-swap",
      "where": "the fixture's closed sub-issue",
      "gap": {
        "kind": "risk",
        "summary": "How a transfer treats a closed issue is undocumented. The transfer page speaks only of open issues, the one report found says closed issues transfer, and nothing states the state on arrival.",
        "evidence": [
          "`../research/github-residual-exposure-and-visibility.md:297` — the documented command transfers \"an open issue\"",
          "`research/README.md:147` — the one report found says closed issues transfer, and nothing states the state on arrival",
          "`../consequences.md:234` — how a transfer treats closed issues is a known gap the rehearsal settles",
          "`../architecture.md:821` — the real walk transfers an issue, open or closed, by the route the rehearsal found"
        ],
        "source": "../consequences.md §5",
        "link": "../consequences.md#5-known-gaps"
      },
      "options": [
        {
          "id": "transfer-as-closed",
          "name": "Transfer it as it stands, closed, in its place in the numeric order",
          "verdict": "accepted",
          "why": "The design's first route; every item, the closed one included, is checked on its number and its state.",
          "source": "../architecture.md §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "reopen-transfer-close",
          "name": "Reopen it, transfer it and close it again",
          "verdict": "deferred",
          "why": "The design's fallback if a closed issue cannot be transferred as closed. The rehearsal decides it, and the route is recorded for the real walk.",
          "source": "../architecture.md §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "close-on-target",
          "name": "Close it on the target when it arrives open",
          "verdict": "deferred",
          "why": "Kept for an arrival as open, one of the three outcomes the rehearsal measures; which of them happens is known only once a transfer runs.",
          "source": "research/README.md §1",
          "link": "research/README.md#1-what-a-transfer-does-to-numbers-closed-issues-and-links"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Both closed issues, #5 and #7, moved to the target on their own numbers. How each arrived is not yet stated in the as-built record.",
            "state": "as-planned"
          },
          {
            "text": "Whether either needed correcting on the target is not yet stated in the as-built record, which lists no deviation here.",
            "state": "as-planned"
          },
          {
            "text": "Whether either transfer took the route of reopening is not yet stated in the as-built record, which lists no deviation here.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "A closed issue is transferred as it stands, and its arrival is recorded: closed with its reason, closed otherwise, or open.",
            "ref": "plan.md#the-tool",
            "excerpt": {
              "ref": "plan.md#the-tool",
              "heading": "The tool",
              "paragraph": "One Python 3 file, `rehearsal.py`, standard library only, run as `python -X utf8 -I` by `rehearsal-step.sh` (Appendix A). Subcommands (a key carries its number: `transfer-5`, `comment-1-2`):",
              "hash": "de6168799672"
            }
          },
          {
            "text": "One that arrives open or with another reason is corrected on the target, as a recorded result and not a failure.",
            "ref": "plan.md#the-tool",
            "excerpt": {
              "ref": "plan.md#the-tool",
              "heading": "The tool",
              "paragraph": "One Python 3 file, `rehearsal.py`, standard library only, run as `python -X utf8 -I` by `rehearsal-step.sh` (Appendix A). Subcommands (a key carries its number: `transfer-5`, `comment-1-2`):",
              "hash": "de6168799672"
            }
          },
          {
            "text": "A refused transfer of a closed issue takes the route of reopening, transferring and closing again, once per issue.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "Every write is one request to the request protocol, sent under a job. A job is a named, scoped grant recorded under `SpartanLaboratories/KotlinBottools`: its scope lists the repositories its requests may touch and the actions they may use; each request names it in `permissionReason`, and the job is open while the grant is in force. An action is a named kind of write that the request protocol carries out (`create-repo`, `transfer-issue`, `rename-repo` and the rest of the table below); an action is defined when the protocol has it. A request is a JSON document that the tool generates into …",
              "hash": "15a802f7607f"
            }
          }
        ],
        "defense": "The research could not predict the arrival, so the walk is built for each outcome and records which one happened for the real walk to follow.",
        "steps": [
          {
            "id": "S3",
            "what": "Take the two closed issues' steps, following any `NEXT` or `ROUTE` the check prints, then check them again.",
            "check": "the item check passes on number and state",
            "link": "plan.md#s3--the-walk"
          }
        ],
        "tests": [
          "L2 component — the refusal routes against the stand-in",
          "L4b end-to-end — the closed issues' state and reason in the target"
        ],
        "risks": [
          "A refusal's text is undocumented, so a closed-issue refusal is told by a pattern; one that matches nothing stops the step with its whole body kept"
        ],
        "source": "plan.md Requirements 7, Design (The tool), §7.4 S3",
        "link": "plan.md#the-tool"
      }
    },
    {
      "id": "item-content",
      "group": "The walk",
      "name": "Body, state, comments, labels and milestone on every item",
      "system": "repository-swap",
      "where": "`phase0-rehearsal-b`",
      "gap": {
        "kind": "risk",
        "summary": "A transfer keeps labels and milestones only when the target already holds them. Labels match by name and a milestone by name and due date, so an item could arrive having lost either.",
        "evidence": [
          "`../research/purge-blast-radius.md:318` — what a transfer keeps, labels and milestones only if present in the target",
          "`research/README.md:138` — comments and assignees stay, labels stay by name and milestones by name and due date if the target has them",
          "`../architecture.md:760` — the milestone and labels exist in the target before the walk",
          "`../architecture.md:764` — each item is checked on its body, state, comments, labels and milestone"
        ],
        "source": "../architecture.md §2.4, §7.2",
        "link": "../architecture.md#72-the-rehearsal"
      },
      "options": [
        {
          "id": "metadata-first",
          "name": "Create the `1.0.0` milestone, with no due date, and the labels in the target before the walk, and check each item after its step",
          "verdict": "accepted",
          "why": "An item that loses anything stops the rehearsal, before the same loss can reach KotlinBottools.",
          "source": "../architecture.md §7.2, §7.6",
          "link": "../architecture.md#72-the-rehearsal"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "text": "Both repositories hold both labels and the milestone `1.0.0`, with no due date, in place before the fixture and the walk.",
            "state": "as-planned"
          },
          {
            "text": "Each moved item was compared on its number: title, state and reason, labels, milestone, and each comment's author and order, as planned. Its body and comment hashes were compared with the text read before any transfer, after mapping every reference that names a fixture repository back to bare `#N`, and byte for byte otherwise.",
            "state": "amended"
          },
          {
            "text": "A transfer rewrites references, so the first and third transfers each differed from the expected text and stopped the walk at that step. Each time the item check was revised and the walk went on, on the same repositories, reaching number 9 with no further stop.",
            "state": "amended"
          }
        ],
        "changes": [
          {
            "what": "The item check maps references naming the source's full name back to bare `#N` before comparing a moved item's text, against the text read before any transfer.",
            "why": "The first transfer turned each bare `#N` in the moved text into the source's full name, which GitHub does not document, so a comparison of the bytes as they stand differed. The plan's item check was revised at the maintainer's decision and the walk continued.",
            "link": "plan.md#the-tool"
          },
          {
            "what": "The item check maps every reference that names a fixture repository back to bare `#N`, the target's name included, and the swap reads what those references reach after each rename.",
            "why": "The third transfer's text named the target for an issue already moved, which the first revision's mapping did not cover. The item check was revised a second time at the maintainer's decision, and the reference reads were added to measure what those names reach after the swap.",
            "link": "plan.md#the-tool"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The labels and the `1.0.0` milestone, with no due date, are created in both repositories before the fixture and the walk.",
            "ref": "plan.md#s1--repositories-labels-and-milestone",
            "excerpt": {
              "ref": "plan.md#s1--repositories-labels-and-milestone",
              "heading": "S1 — Repositories, labels and milestone",
              "paragraph": "STEPs, in this order: `repo-a`, `repo-b`, `labels-a`, `labels-b`, `milestone-a`, `milestone-b`. Then:",
              "hash": "ad43cc2b3b16"
            }
          },
          {
            "text": "After each transfer the item is compared on its number: title, body hash, state and reason, labels, milestone, and each comment's hash, author and order.",
            "ref": "plan.md#s3--the-walk",
            "excerpt": {
              "ref": "plan.md#s3--the-walk",
              "heading": "S3 — The walk",
              "paragraph": "STEPs, in this order: `transfer-1`, `transfer-2`, `transfer-3`, `placeholder-4`, `transfer-5`, `transfer-6`, `transfer-7`, `transfer-8`, `transfer-9`. For every transfer, `request` first checks that A holds the number, that B's highest number is n−1, and that n is not already in B; `PROCEED` is the only go-ahead. After each STEP the check prints, for a transfer:",
              "hash": "acde2f993a99"
            }
          },
          {
            "text": "An item that differs ends the walk at that step.",
            "ref": "plan.md#s3--the-walk",
            "excerpt": {
              "ref": "plan.md#s3--the-walk",
              "heading": "S3 — The walk",
              "paragraph": "STEPs, in this order: `transfer-1`, `transfer-2`, `transfer-3`, `placeholder-4`, `transfer-5`, `transfer-6`, `transfer-7`, `transfer-8`, `transfer-9`. For every transfer, `request` first checks that A holds the number, that B's highest number is n−1, and that n is not already in B; `PROCEED` is the only go-ahead. After each STEP the check prints, for a transfer:",
              "hash": "acde2f993a99"
            }
          }
        ],
        "defense": "An item that loses anything stops the rehearsal, before the same loss can reach KotlinBottools.",
        "steps": [
          {
            "id": "S1",
            "what": "Create the labels and the milestone in both repositories, each read back.",
            "check": "`STAGE S1 OK`",
            "link": "plan.md#s1--repositories-labels-and-milestone"
          },
          {
            "id": "S3",
            "what": "Compare each transferred item with its source on the target's number.",
            "check": "the check's line for the item's title, body bytes, state, labels, milestone and comments",
            "link": "plan.md#s3--the-walk"
          }
        ],
        "tests": [
          "L4b end-to-end — the item check on every number",
          "L4c non-functional — the 9 KB non-ASCII body and its hashes"
        ],
        "risks": [
          "How GitHub stores line ends is undocumented, so against the spec a body is compared after normalising them; between source and target it is compared as bytes"
        ],
        "source": "plan.md Requirements 2 and 4, §7.4 S1 and S3",
        "link": "plan.md#s3--the-walk"
      }
    },
    {
      "id": "links",
      "group": "The walk",
      "name": "Sub-issue and \"blocked by\" links, kept or re-created",
      "system": "repository-swap",
      "where": "`phase0-rehearsal-a` and `phase0-rehearsal-b`",
      "gap": {
        "kind": "risk",
        "summary": "Nothing says a transfer keeps an issue's links. GitHub documents nothing about sub-issue or \"blocked by\" links; reports agree a moved child keeps its parent as a cross-repository link that settles asynchronously, one report disagrees, and nothing covers a parent moving while its children stay, \"blocked by\" links, or a link across a public and a private repository.",
        "evidence": [
          "`../architecture.md:272` — nothing is documented about sub-issue and \"blocked by\" links",
          "`research/README.md:151` — what the reports show on links, and what they do not cover",
          "`research/README.md:159` — both link kinds may span repositories of one owner; a public and a private one is undocumented",
          "`../architecture.md:273` — GraphQL has `addSubIssue` and `addBlockedBy`",
          "`../architecture.md:770` — a parent that cannot move with its links in place is the design's open case"
        ],
        "source": "../architecture.md §2.4, §7.2",
        "link": "../architecture.md#72-the-rehearsal"
      },
      "options": [
        {
          "id": "read-back-and-re-create",
          "name": "Read the links back after each step and re-create every dropped one, the cross-repository ones included",
          "verdict": "accepted",
          "why": "The final link set must equal the fixture's, and the real walk reads and re-creates every link regardless.",
          "source": "../architecture.md §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "unlink-then-transfer",
          "name": "Remove and record a parent's links, transfer it, and re-create them afterwards",
          "verdict": "deferred",
          "why": "The design's retry if a parent cannot be transferred with its sub-issue links in place. Both paths are acceptable, as the real walk re-creates dropped links anyway; the rehearsal shows which applies.",
          "source": "../architecture.md §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "gh-issue-edit",
          "name": "`gh issue edit --add-sub-issue` and `--parent` for the links",
          "verdict": "declined",
          "why": "They silently re-parent a child, through `replaceParent: true`.",
          "source": "research/README.md §3",
          "link": "research/README.md#3-the-api-forms"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Links were read back after each step on the plan's settle rule, and every one of the eleven was kept across the walk.",
            "state": "as-planned"
          },
          {
            "text": "With all eleven kept, S4 had none to re-create and the links stand as the fixture's.",
            "state": "as-planned"
          },
          {
            "text": "Nothing was left to converge, so the recording of links not converged after three rounds did not arise.",
            "state": "as-planned"
          },
          {
            "text": "No parent's links were removed: all eleven were kept with none to re-create, so the route for a link-related refusal was not taken.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "Links are read back after each step, after two equal reads at least 6 seconds apart, and each is recorded as kept, dropped, repointed, stale or unsettled.",
            "ref": "plan.md#the-tool",
            "excerpt": {
              "ref": "plan.md#the-tool",
              "heading": "The tool",
              "paragraph": "One Python 3 file, `rehearsal.py`, standard library only, run as `python -X utf8 -I` by `rehearsal-step.sh` (Appendix A). Subcommands (a key carries its number: `transfer-5`, `comment-1-2`):",
              "hash": "de6168799672"
            }
          },
          {
            "text": "Up to three rounds of reconciliation remove what is stale and add what is missing, until the settled edge set equals the fixture's, cross-repository links included.",
            "ref": "plan.md#s4--link-reconciliation",
            "excerpt": {
              "ref": "plan.md#s4--link-reconciliation",
              "heading": "S4 — Link reconciliation",
              "paragraph": "prints one `PROCEED REQUEST links-r1-a …` and/or `PROCEED REQUEST links-r1-b …` line (the writes on A's issues, then on B's; removes first, then adds), or `SKIP links r1: nothing to add or remove`. For each printed key, in that order: the run sends the file; the implementer stores the reply (`rs reply <key> done` or `failed`; a failed link request prints `ROUTE read back` and is not a stop). Then:",
              "hash": "1ab7120b15c1"
            }
          },
          {
            "text": "Links not converged after three rounds are recorded, and the unit goes on to the swap.",
            "ref": "plan.md#s4--link-reconciliation",
            "excerpt": {
              "ref": "plan.md#s4--link-reconciliation",
              "heading": "S4 — Link reconciliation",
              "paragraph": "prints one `PROCEED REQUEST links-r1-a …` and/or `PROCEED REQUEST links-r1-b …` line (the writes on A's issues, then on B's; removes first, then adds), or `SKIP links r1: nothing to add or remove`. For each printed key, in that order: the run sends the file; the implementer stores the reply (`rs reply <key> done` or `failed`; a failed link request prints `ROUTE read back` and is not a stop). Then:",
              "hash": "1ab7120b15c1"
            }
          },
          {
            "text": "Removing and recording a parent's links runs only for a transfer refused for a link-related reason, a refusal nothing yet suggests.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "Every write is one request to the request protocol, sent under a job. A job is a named, scoped grant recorded under `SpartanLaboratories/KotlinBottools`: its scope lists the repositories its requests may touch and the actions they may use; each request names it in `permissionReason`, and the job is open while the grant is in force. An action is a named kind of write that the request protocol carries out (`create-repo`, `transfer-issue`, `rename-repo` and the rest of the table below); an action is defined when the protocol has it. A request is a JSON document that the tool generates into …",
              "hash": "15a802f7607f"
            }
          }
        ],
        "defense": "Whatever GitHub does at a transfer, the final link set is what is compared, so reconciliation is a step of the design and not a repair.",
        "steps": [
          {
            "id": "S3",
            "what": "After each step, settle the read and classify every expected link.",
            "check": "the check's line of link statuses",
            "link": "plan.md#s3--the-walk"
          },
          {
            "id": "S4",
            "what": "Reconcile in up to three rounds from a settled read.",
            "check": "`STAGE S4 OK`, or `STAGE S4 RECORDED links missing=… stale=…`",
            "link": "plan.md#s4--link-reconciliation"
          }
        ],
        "tests": [
          "L2 component — the edge mapping and the five statuses against the stand-in",
          "L4b end-to-end — the final edge set equal to the expected one"
        ],
        "risks": [
          "A transfer may drop, keep or repoint any link; reconciliation handles each, and a stale parent is removed in the next round",
          "Settle time is unbounded in the reports, so the settle is bounded at eight reads and a moving link is recorded as `unsettled`"
        ],
        "source": "plan.md Requirements 5 and 6, Design (The tool), §7.4 S3 and S4",
        "link": "plan.md#s4--link-reconciliation"
      }
    },
    {
      "id": "rename-swap",
      "group": "The rename swap",
      "name": "The rename swap, its ids read back at each name",
      "system": "repository-swap",
      "where": "`phase0-rehearsal-a-legacy` · `phase0-rehearsal-a`",
      "gap": {
        "kind": "risk",
        "summary": "Whether a repository can be renamed onto a name freed moments earlier is unproved. GitHub documents the redirect ending only when a repository is created under the old name, one step short of what the swap does, and a refusal has no remedy but a request to GitHub Support.",
        "evidence": [
          "`../architecture.md:274` — a repository created or renamed under an old name takes it, and the redirect stops working",
          "`research/README.md:186` — a rename onto a name freed moments earlier is the swap's central unknown",
          "`../architecture.md:294` — the assumption that the new repository takes over the name at once, shown by the rehearsal's rename step",
          "`research/README.md:178` — `gh api` follows a renamed repository's redirect silently, so proof is by id",
          "`../architecture.md:776` — the ids are read back at each name, and a transferred issue's old URL must redirect to its new home"
        ],
        "source": "../architecture.md §3, §7.2",
        "link": "../architecture.md#3-assumptions"
      },
      "options": [
        {
          "id": "rename-private-archive-rename",
          "name": "Rename the source, make it private, archive it, rename the target onto the old name, archive the target",
          "verdict": "accepted",
          "why": "An archived repository refuses other changes, a visibility change on one being refused with a 403, so archiving comes last on each.",
          "source": "research/README.md §2",
          "link": "research/README.md#2-the-rename-swap-with-the-source-made-private"
        },
        {
          "id": "rename-and-archive",
          "name": "Rename the source away and archive it, then rename the target to the source's name",
          "verdict": "declined",
          "why": "The design's order while the source was to be private. With a public source a privacy step has to come before the archive.",
          "source": "../architecture.md §3, §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "private-before-rename",
          "name": "Make the source private before renaming it",
          "verdict": "declined",
          "why": "Nothing forces that order, and renaming first keeps every failure state reversible and matches the design.",
          "source": "research/README.md §2",
          "link": "research/README.md#2-the-rename-swap-with-the-source-made-private"
        },
        {
          "id": "delete-and-recreate",
          "name": "Delete and recreate under the same name",
          "verdict": "declined",
          "why": "It needs the `delete_repo` scope, and keeps nothing the rename does not keep.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "changes": [
          {
            "what": "The `urls pre` and `refs pre` reads were taken although `ids pre` had stopped.",
            "why": "`ids pre` stopped on a transient 504 from GitHub's web page for the source repository, and the three reads had been issued together, before its result was known. Both reads record their results only and change nothing on GitHub, and their results stand as of their time: every followed URL resolved to its new home and every reference's name resolved to the same item.",
            "when": "S5",
            "link": "final-implementation.md#4-deviations-from-the-plan"
          }
        ],
        "summary": null,
        "statements": [
          {
            "text": "The five writes ran in the planned order: the source renamed `phase0-rehearsal-a-legacy`, made private and archived, then the target renamed onto the old name and archived.",
            "state": "as-planned",
            "ref": "final-implementation.md#36-the-rename-swap",
            "excerpt": {
              "ref": "final-implementation.md#36-the-rename-swap",
              "heading": "3.6 The rename swap",
              "paragraph": "The rename onto the freed name was accepted, about six minutes after the source released it (the reads after the two renames were taken at 06:50:45 and 06:56:32). · Identity. Each read-back by id matched at its first read: at each step each repository read by id carried its expected name and flags, and each name it held answered its id. From the source's privacy step on, unauthenticated requests to it by name, by id and on the web answered 404; the target answered 404 throughout. · The released names. Before the swap `phase0-rehearsal-a-legacy` did not exist. After the source's rename, …",
              "hash": "5a267921590f"
            }
          },
          {
            "text": "Each step was read back by id and matched at its first read, and from the source's privacy step on, unauthenticated requests to it by name, by id and on the web answered 404.",
            "state": "as-planned",
            "ref": "final-implementation.md#36-the-rename-swap",
            "excerpt": {
              "ref": "final-implementation.md#36-the-rename-swap",
              "heading": "3.6 The rename swap",
              "paragraph": "The rename onto the freed name was accepted, about six minutes after the source released it (the reads after the two renames were taken at 06:50:45 and 06:56:32). · Identity. Each read-back by id matched at its first read: at each step each repository read by id carried its expected name and flags, and each name it held answered its id. From the source's privacy step on, unauthenticated requests to it by name, by id and on the web answered 404; the target answered 404 throughout. · The released names. Before the swap `phase0-rehearsal-a-legacy` did not exist. After the source's rename, …",
              "hash": "5a267921590f"
            }
          },
          {
            "text": "A transferred issue's old URL, for the open #1 and the closed #5, answered the issue's new home at every point, by the original and the `-legacy` names. The reads before any rename were taken while the identity read stood stopped on a 504 from GitHub's web page, and their results stand as of their time.",
            "state": "amended",
            "ref": "final-implementation.md#37-old-urls",
            "excerpt": {
              "ref": "final-implementation.md#37-old-urls",
              "heading": "3.7 Old URLs",
              "paragraph": "A transferred issue's old REST URL, followed for the open #1 and the closed #5 alike. Every answer's number and repository were the issue's new home:",
              "hash": "74be85ec59a3"
            }
          },
          {
            "text": "The rename onto the freed name was accepted, about six minutes after the source released it, so there was no refusal to record, and the unit went on to close-out.",
            "state": "as-planned",
            "ref": "final-implementation.md#36-the-rename-swap",
            "excerpt": {
              "ref": "final-implementation.md#36-the-rename-swap",
              "heading": "3.6 The rename swap",
              "paragraph": "The rename onto the freed name was accepted, about six minutes after the source released it (the reads after the two renames were taken at 06:50:45 and 06:56:32). · Identity. Each read-back by id matched at its first read: at each step each repository read by id carried its expected name and flags, and each name it held answered its id. From the source's privacy step on, unauthenticated requests to it by name, by id and on the web answered 404; the target answered 404 throughout. · The released names. Before the swap `phase0-rehearsal-a-legacy` did not exist. After the source's rename, …",
              "hash": "5a267921590f"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "numbered",
        "statements": [
          {
            "text": "The source is renamed `phase0-rehearsal-a-legacy`, made private and archived, then the target is renamed onto the old name and archived.",
            "ref": "plan.md#the-rename-swap",
            "excerpt": {
              "ref": "plan.md#the-rename-swap",
              "heading": "The rename swap",
              "paragraph": "Order: rename the source, make it private, archive it, rename the target onto the old name, archive the target (research `rename-visibility-archive-sequence.md` §6). An archive comes after every other change to a repository, because an archived repository refuses them; the target's rename comes after the source's rename frees the name. After each write, `check post` reads the repository by id and records its name; then `ids LABEL` reads:",
              "hash": "baa9c79a96ef"
            }
          },
          {
            "text": "Each step is read back by repository id, never by name alone, and after the privacy change an unauthenticated request answers 404.",
            "ref": "plan.md#the-rename-swap",
            "excerpt": {
              "ref": "plan.md#the-rename-swap",
              "heading": "The rename swap",
              "paragraph": "Order: rename the source, make it private, archive it, rename the target onto the old name, archive the target (research `rename-visibility-archive-sequence.md` §6). An archive comes after every other change to a repository, because an archived repository refuses them; the target's rename comes after the source's rename frees the name. After each write, `check post` reads the repository by id and records its name; then `ids LABEL` reads:",
              "hash": "baa9c79a96ef"
            }
          },
          {
            "text": "A transferred issue's old URL is followed at each point, by the original and `-legacy` names, and must answer the issue's new home.",
            "ref": "plan.md#the-rename-swap",
            "excerpt": {
              "ref": "plan.md#the-rename-swap",
              "heading": "The rename swap",
              "paragraph": "Order: rename the source, make it private, archive it, rename the target onto the old name, archive the target (research `rename-visibility-archive-sequence.md` §6). An archive comes after every other change to a repository, because an archived repository refuses them; the target's rename comes after the source's rename frees the name. After each write, `check post` reads the repository by id and records its name; then `ids LABEL` reads:",
              "hash": "baa9c79a96ef"
            }
          },
          {
            "text": "A refused rename onto the freed name is the result, recorded whole, and the unit goes on to close-out.",
            "ref": "plan.md#s5--the-rename-swap",
            "excerpt": {
              "ref": "plan.md#s5--the-rename-swap",
              "heading": "S5 — The rename swap",
              "paragraph": "First the reads before any rename:",
              "hash": "b2ea6023599c"
            }
          }
        ],
        "defense": "It is the real swap's sequence on the same pair, so the real swap stops before any rename of KotlinBottools if it does not hold.",
        "steps": [
          {
            "id": "S5",
            "what": "Take the four swap steps in order, reading identity and old URLs after each.",
            "check": "`STAGE S5 OK`, or `STAGE S5 RECORDED swap-incomplete`",
            "link": "plan.md#s5--the-rename-swap"
          }
        ],
        "tests": [
          "L3 integration — the identity reads by id and by name, and the unauthenticated probes",
          "L4b end-to-end — the swap and the old URLs at each point"
        ],
        "risks": [
          "The rename onto the freed name may be refused: the only documented remedy is a request to GitHub Support, which the phase does not include, and the real swap does not start"
        ],
        "source": "plan.md Requirements 8, Design (The rename swap), §7.4 S5",
        "link": "plan.md#the-rename-swap"
      }
    },
    {
      "id": "pass-condition",
      "group": "Outcome and access",
      "name": "The pass condition and the per-step results",
      "system": "repository-swap",
      "where": "`DATA/run/rehearsal`",
      "gap": {
        "kind": "missing",
        "summary": "Nothing yet decides whether the swap may start. The swap rests on what this rehearsal shows, so a failure has to be defined, and the results have to say which shape failed.",
        "evidence": [
          "`../architecture.md:778` — the pass condition: every item on its number, every link present, the renames resolving by id",
          "`../architecture.md:875` — a failed rehearsal hands back the per-step results and which shape failed",
          "`../architecture.md:912` — on failure, KotlinBottools is untouched and unit 3 does not start"
        ],
        "source": "../architecture.md §7.2, §7.6, §8",
        "link": "../architecture.md#76-stop-and-hand-back-points-of-the-swap"
      },
      "options": [
        {
          "id": "all-or-hand-back",
          "name": "Pass only when every item is on its number, every link is present and the renames resolve by id; otherwise stop and hand back",
          "verdict": "accepted",
          "why": "Anything else stops the unit with the per-step results, and the swap does not start.",
          "source": "../architecture.md §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Every criterion was met: the nine numbers on their own numbers in the target, the placeholder included, the 11 links present at the end, the renames resolved by id, and both repositories private and archived.",
            "state": "as-planned",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "`result.txt` passes all eight shapes (numbers, placeholder, closed issues, links, cross-repository links, rename, private and archived, old URLs) with no refusal recorded, and the procedure ends with `UNIT OK`. The results above are read from the records the shapes rest on as well, since that gate has known gaps of its own (consequences §5).",
              "hash": "cf5856f32650"
            }
          },
          {
            "text": "`result.txt` passed all eight shapes with no refusal recorded, and the procedure ended with `UNIT OK`. The gate has known gaps of its own, so the acceptance is also read from the records the shapes rest on (`consequences.md` §5).",
            "state": "as-planned",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "`result.txt` passes all eight shapes (numbers, placeholder, closed issues, links, cross-repository links, rename, private and archived, old URLs) with no refusal recorded, and the procedure ends with `UNIT OK`. The results above are read from the records the shapes rest on as well, since that gate has known gaps of its own (consequences §5).",
              "hash": "cf5856f32650"
            }
          },
          {
            "text": "Nothing was handed back: the result passed, so the next unit may start.",
            "state": "as-planned",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "`result.txt` passes all eight shapes (numbers, placeholder, closed issues, links, cross-repository links, rename, private and archived, old URLs) with no refusal recorded, and the procedure ends with `UNIT OK`. The results above are read from the records the shapes rest on as well, since that gate has known gaps of its own (consequences §5).",
              "hash": "cf5856f32650"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The unit passes only when every item is on its number, every link is present at the end, the renames resolve by id and both repositories are private and archived.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "Goals",
              "hash": "0057c623b76c"
            }
          },
          {
            "text": "`result` writes the per-shape outcome, and `UNIT OK` comes only when every shape passed.",
            "ref": "plan.md#s6--close-out",
            "excerpt": {
              "ref": "plan.md#s6--close-out",
              "heading": "S6 — Close-out",
              "paragraph": "STEPs, in this order: `private-src`, `archive-src`, `archive-tgt`. After S5 the first two print `SKIP` (their checks still run); after a stop in S5 they finish what is left. Then:",
              "hash": "185b8dc4254e"
            }
          },
          {
            "text": "Anything else hands back with the per-step results, and the next unit does not start.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "Goals",
              "hash": "0057c623b76c"
            }
          }
        ],
        "defense": "The result is what a person reads to decide whether the swap may start, so it is said per shape, not as a single flag.",
        "steps": [
          {
            "id": "S6",
            "what": "Read the final state and write the per-shape result.",
            "check": "`UNIT OK` with exit 0, or a hand-back with the result files",
            "link": "plan.md#s6--close-out"
          }
        ],
        "tests": [
          "L4b end-to-end — `result` over S2 to S6"
        ],
        "risks": [
          "The real target receives a pushed history before its walk, and this target is commit-less"
        ],
        "source": "plan.md Requirements (acceptance criteria), §7.4 S6",
        "link": "plan.md#s6--close-out"
      }
    },
    {
      "id": "failure-behaviour",
      "group": "Outcome and access",
      "name": "What still runs after a failed step",
      "system": "repository-swap",
      "where": "S3 to S6, `DATA/run/rehearsal`",
      "gap": {
        "kind": "missing",
        "summary": "The design left a failed step's effect on the rest of the rehearsal open. Its pass condition said only that anything else stops the unit, and a stop at the first failure would leave the links that moved and the rename swap unmeasured.",
        "evidence": [
          "`../architecture.md:793` — anything else stops the rehearsal unit, which hands back with the per-step results",
          "`../architecture.md:796` — the dated note: a failed step stops the walk there, and the link re-creation and the rename swap still run on what exists"
        ],
        "source": "../architecture.md §7.2",
        "link": "../architecture.md#72-the-rehearsal"
      },
      "options": [
        {
          "id": "walk-stops-rest-runs",
          "name": "Stop the walk at the failure, still run link re-creation and the rename swap, archive both, hand back every result",
          "verdict": "accepted",
          "why": "Every shape then has a result, even when the walk ended early, and the swap's central unknown is still measured.",
          "source": "../architecture.md §7.2, dated note of 2026-11-09",
          "link": "../architecture.md#72-the-rehearsal"
        },
        {
          "id": "stop-everything",
          "name": "Stop at the first failed step, archive both, hand back",
          "verdict": "declined",
          "why": "It would hand back nothing about the links already moved or the rename swap."
        }
      ],
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "A failed walk step stops the walk at that step, and link re-creation on what moved and the rename swap still run, then both repositories are archived.",
            "ref": "plan.md#shape-of-the-procedure",
            "excerpt": {
              "ref": "plan.md#shape-of-the-procedure",
              "heading": "Shape of the procedure",
              "paragraph": "Seven stages, run in order, each ending with a `STAGE <id> OK` line, a `STAGE <id> RECORDED <what>` line (a recorded failure: the unit goes on along the failure arrows) or a `STOP`:",
              "hash": "e4474f35a547"
            }
          },
          {
            "text": "A failure before the walk starts stops the unit with the repositories as they are, and its re-run skips every write already done.",
            "ref": "plan.md#75-re-running",
            "excerpt": {
              "ref": "plan.md#75-re-running",
              "heading": "7.5 Re-running",
              "paragraph": "A stop is fixed first; then the unit is continued as the table says. Every `request` runs its pre-check, so a write that is already done prints `SKIP` and is never repeated; no duplicate issue can be created.",
              "hash": "ae6c1909ed22"
            }
          },
          {
            "text": "Every shape's result is recorded, each refusal's whole body included.",
            "ref": "plan.md#error-handling-and-logging",
            "excerpt": {
              "ref": "plan.md#error-handling-and-logging",
              "heading": "Error handling and logging",
              "paragraph": "Failure path. The tool has one failure type for expected failures (a GitHub error, a mismatch, a missing earlier step): it prints `STOP <why>` and exits 1. A bug in the tool is an ordinary exception with a traceback and exit 1. There is no retry inside the tool: retry is an instruction the tool prints (`ROUTE retry`), and the implementer carries it out. · Recorded, not stopped. Printed as `RECORD` or `NEXT`, exit 0: a refusal that a route follows; a closed issue's arrival; links that did not converge after three rounds; a released name's answer; a URL that did not resolve to the new home; no …",
              "hash": "bc8b1b8709c6"
            }
          }
        ],
        "defense": "A rehearsal that stops at its first failure says nothing about the shapes after it, and those are what the real walk needs to know.",
        "steps": [
          {
            "id": "S3",
            "what": "On a stop, record where the walk ended and go on to the reconciliation.",
            "check": "`STAGE S3 RECORDED walk-stopped-at=<n>`",
            "link": "plan.md#s3--the-walk"
          },
          {
            "id": "S6",
            "what": "Hand back with the per-shape result.",
            "check": "the result files, and exit 0 only if every shape passed",
            "link": "plan.md#s6--close-out"
          }
        ],
        "tests": [
          "L2 component — a step that fails and ends the walk there, among the variants run on the stand-in"
        ],
        "risks": [
          "A wrong number cannot be repaired: the walk ends there, and the rest of the unit runs on what exists"
        ],
        "source": "plan.md Requirements 9, Design (Shape of the procedure)",
        "link": "plan.md#shape-of-the-procedure"
      },
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "text": "The walk stopped twice at the item check, at the first and the third transfer. Each time the check was revised to map the rewritten references back and the walk went on, so all nine numbers moved, the path that ends the walk early was not taken, and the reconciliation, the swap and the archiving ran on the full walk.",
            "state": "amended",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The tool and its runner, the text of the plan's Appendix A, each equal to the size and sha256 the plan's bootstrap checks:",
              "hash": "c6eb1398146a"
            }
          },
          {
            "text": "No failure came before the walk. Each of the 30 requests was answered `done` at its first attempt, and the close-out's `private-src` and `archive-src`, already done in the swap, were skipped by their pre-write checks.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-the-procedures-record",
            "excerpt": {
              "ref": "final-implementation.md#31-the-procedures-record",
              "heading": "3.1 The procedure's record",
              "paragraph": "Each of the 30 requests was answered `done` at its first attempt. The close-out's `private-src` and `archive-src` were already done and were skipped. No refusal, throttle or fallback route occurred.",
              "hash": "c72e6c7a171f"
            }
          },
          {
            "text": "Every shape's result is in `result.json` and `result.txt`, and `steps.jsonl` keeps the two item-check stops with their records. No refusal occurred, so keeping a refusal's whole body was not exercised (`consequences.md` §5).",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The tool and its runner, the text of the plan's Appendix A, each equal to the size and sha256 the plan's bootstrap checks:",
              "hash": "c6eb1398146a"
            }
          }
        ],
        "changes": [
          {
            "what": "A stop at the item check did not end the walk: the check was revised and the walk resumed on the same repositories, twice.",
            "why": "A transfer rewrites the issue references in the moved text, which the plan's byte comparison read as a difference. On the decision taken at each stop, the check maps the references back before comparing, and the walk went on instead of taking the stopped-walk path.",
            "when": "S3",
            "link": "research/README.md#did-not-hold-in-the-build"
          }
        ]
      }
    },
    {
      "id": "requested-writes",
      "group": "Outcome and access",
      "name": "The GitHub writes the unit depends on",
      "system": "repository-swap",
      "where": "repository creation, renames and archiving · issue transfers and placeholders · relationships",
      "gap": {
        "kind": "risk",
        "summary": "The unit's writes to GitHub go through requests the phase recorded as not yet existing. Creating, renaming and archiving a repository, transferring issues, creating placeholders and writing relationships each need one, and the unit waits without them.",
        "evidence": [
          "`../architecture.md:296` — a request must exist for each write the units need before unit 2 runs",
          "`../consequences.md:218` — the requests units 2 to 8 need do not exist yet",
          "`consequences.md:96` — six of the request actions this unit needs are not defined yet"
        ],
        "source": "../architecture.md §3, §11",
        "link": "../architecture.md#11-version-control"
      },
      "options": [
        {
          "id": "requested-and-read-back",
          "name": "Every write sent as a request carrying the plan's procedure and checks, and verified by reading GitHub before the next step",
          "verdict": "accepted",
          "why": "The run does its local work itself and verifies each write; a unit that meets a missing request stops before the write and hands back.",
          "source": "../architecture.md §3, §11",
          "link": "../architecture.md#11-version-control"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Every write went as one generated request with its commands and checks, 30 in all, each answered `done` at its first attempt, and no command of the procedure wrote to GitHub itself.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-the-procedures-record",
            "excerpt": {
              "ref": "final-implementation.md#31-the-procedures-record",
              "heading": "3.1 The procedure's record",
              "paragraph": "Each of the 30 requests was answered `done` at its first attempt. The close-out's `private-src` and `archive-src` were already done and were skipped. No refusal, throttle or fallback route occurred.",
              "hash": "c72e6c7a171f"
            }
          },
          {
            "text": "The pre-write checks skipped the close-out's `private-src` and `archive-src`, already done in the swap, and no issue was created twice.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-the-procedures-record",
            "excerpt": {
              "ref": "final-implementation.md#31-the-procedures-record",
              "heading": "3.1 The procedure's record",
              "paragraph": "Each of the 30 requests was answered `done` at its first attempt. The close-out's `private-src` and `archive-src` were already done and were skipped. No refusal, throttle or fallback route occurred.",
              "hash": "c72e6c7a171f"
            }
          },
          {
            "text": "S0 found the job open with every action defined, the six the plan proposed among them, before the first write was sent.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-the-procedures-record",
            "excerpt": {
              "ref": "final-implementation.md#31-the-procedures-record",
              "heading": "3.1 The procedure's record",
              "paragraph": "Each of the 30 requests was answered `done` at its first attempt. The close-out's `private-src` and `archive-src` were already done and were skipped. No refusal, throttle or fallback route occurred.",
              "hash": "c72e6c7a171f"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "Every write is one request carrying its literal commands and its checks, generated immediately before it is sent, and no command of the plan writes to GitHub itself.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "Every write is one request to the request protocol, sent under a job. A job is a named, scoped grant recorded under `SpartanLaboratories/KotlinBottools`: its scope lists the repositories its requests may touch and the actions they may use; each request names it in `permissionReason`, and the job is open while the grant is in force. An action is a named kind of write that the request protocol carries out (`create-repo`, `transfer-issue`, `rename-repo` and the rest of the table below); an action is defined when the protocol has it. A request is a JSON document that the tool generates into …",
              "hash": "15a802f7607f"
            }
          },
          {
            "text": "Each request runs a pre-write check, so a write already done is skipped and no duplicate issue can be created.",
            "ref": "plan.md#75-re-running",
            "excerpt": {
              "ref": "plan.md#75-re-running",
              "heading": "7.5 Re-running",
              "paragraph": "A stop is fixed first; then the unit is continued as the table says. Every `request` runs its pre-check, so a write that is already done prints `SKIP` and is never repeated; no duplicate issue can be created.",
              "hash": "ae6c1909ed22"
            }
          },
          {
            "text": "Nothing is sent until the job is open and every action is defined, and a missing one stops the unit before its first write.",
            "ref": "plan.md#s0--local-readiness",
            "excerpt": {
              "ref": "plan.md#s0--local-readiness",
              "heading": "S0 — Local readiness",
              "paragraph": "Bootstrap: one call, typed exactly as written. It saves the two files of Appendix A from this plan and checks each by size and sha256. It must run from inside the working tree that holds this plan.",
              "hash": "d8aa9db2d05f"
            }
          }
        ],
        "defense": "The local work is the run's own and every write is read back before the next step, so a write that errored can never be repeated blindly.",
        "steps": [
          {
            "id": "S0",
            "what": "Confirm the job is open and every action is defined, and record the answer.",
            "check": "the protocol check's `ok` line, then `STAGE S0 OK`",
            "link": "plan.md#s0--local-readiness"
          }
        ],
        "tests": [
          "L2 component — the 20 request forms `selftest` builds, checked for form"
        ],
        "risks": [
          "The fields of six actions are this plan's proposal: if the real field names differ, only the table of requests and its builders change"
        ],
        "source": "plan.md Design (The requests), Assumptions, §7.4 S0",
        "link": "plan.md#the-requests"
      }
    },
    {
      "id": "real-walk",
      "group": "Left for later",
      "name": "The walk and the swap on KotlinBottools itself",
      "system": "repository-swap",
      "where": "unit 3, #23",
      "gap": {
        "kind": "risk",
        "summary": "The rehearsal proves the mechanics only on its own fixture. KotlinBottools' own numbers, links and renames are still to be walked, by the unit this one gates.",
        "evidence": [
          "`../architecture.md:1303` — this unit's writes are its two repositories with their fixture",
          "`../architecture.md:1304` — unit 3 carries the walk, the link reconciliation and the renames"
        ],
        "source": "../architecture.md §15",
        "link": "../architecture.md#15-decomposition"
      },
      "options": [
        {
          "id": "in-unit-3",
          "name": "Left to unit 3, #23, which starts only once this unit has passed",
          "verdict": "accepted",
          "why": "A failure here then stops the swap before it starts, with KotlinBottools untouched.",
          "source": "../architecture.md §7.6, §15",
          "link": "../architecture.md#15-decomposition"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The walk and the swap on KotlinBottools were left to `kotlinbottools-rewrite-and-swap`, which may start: this unit's result passed.",
            "state": "as-planned",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "`result.txt` passes all eight shapes (numbers, placeholder, closed issues, links, cross-repository links, rename, private and archived, old URLs) with no refusal recorded, and the procedure ends with `UNIT OK`. The results above are read from the records the shapes rest on as well, since that gate has known gaps of its own (consequences §5).",
              "hash": "cf5856f32650"
            }
          },
          {
            "text": "That unit takes the measured results, the tool once its known gaps are closed, and the pattern of the requests (`consequences.md` §4).",
            "state": "as-planned",
            "ref": "final-implementation.md#3-measurements",
            "excerpt": {
              "ref": "final-implementation.md#3-measurements",
              "heading": "3. Measurements",
              "paragraph": "",
              "hash": "1e898ccb58d1"
            }
          }
        ]
      },
      "verdict": {
        "kind": "leave",
        "statements": [
          {
            "text": "The walk and the swap on KotlinBottools are left to `kotlinbottools-rewrite-and-swap`, which starts only when this unit's result passes.",
            "ref": "plan.md#sequencing-and-follow-ups",
            "excerpt": {
              "ref": "plan.md#sequencing-and-follow-ups",
              "heading": "Sequencing and follow-ups",
              "paragraph": "Order: S0 → S1 → S2 → S3 → S4 → S5 → S6. The unit is continued from the first step that did not take after any stop (§7.5). It starts once unit 1 has landed, which it has; `kotlinbottools-rewrite-and-swap` starts only when `result.json` passes. · Follow-ups this work leaves, recorded in `consequences.md`: · the two rehearsal repositories (private and archived) for the organisation administrator to delete when they are not wanted; · the real walk's inherited results (Interfaces), including any `unsettled` link status and any refusal text, to be read before that unit's plan is written; · a …",
              "hash": "a4a744e992e9"
            }
          },
          {
            "text": "This unit hands that unit its measured results, its tools and the pattern of its requests.",
            "ref": "plan.md#interfaces-with-sibling-units",
            "excerpt": {
              "ref": "plan.md#interfaces-with-sibling-units",
              "heading": "Interfaces with sibling units",
              "paragraph": "Expects from `preparation` (unit 1): · `%USERPROFILE%\\BotWS\\tools` holding `env.sh` (exports `WS`, `DATA`, `TOOLS`, `KBT` and the rest; defines `gitnet`), `lib.sh` (`expect LABEL WANT GOT`), `plib.sh` and `run-stage.sh`; · `bash \"$TOOLS/run-stage.sh\" <name> [args]` running `$TOOLS/<name>.sh` and appending its output to `DATA/run/as-run.log`; · `DATA/run/` as unit 1 left it. This unit creates `DATA/run/rehearsal/`; · `gh` signed in with the `repo` scope. This unit does not use `lib.sh`, `plib.sh` or `gitnet`: it does no git network read. · Provides to `kotlinbottools-rewrite-and-swap` (#23): · …",
              "hash": "db0b592ed8da"
            }
          }
        ],
        "defense": "A failure here then stops the swap before it starts, with KotlinBottools untouched.",
        "source": "plan.md Interfaces with sibling units, Sequencing and follow-ups",
        "link": "plan.md#interfaces-with-sibling-units"
      }
    },
    {
      "id": "rehearsal-repositories-deletion",
      "group": "Left for later",
      "name": "Deleting the two rehearsal repositories",
      "system": "repository-swap",
      "where": "a follow-up of #2",
      "gap": {
        "kind": "debt",
        "summary": "The two repositories remain after the rehearsal. Deleting them needs the `delete_repo` scope, which the phase neither has nor uses.",
        "evidence": [
          "`../architecture.md:314` — no repository is deleted, the two rehearsal repositories included",
          "`../architecture.md:786` — both remain, private and archived, as a follow-up",
          "`../consequences.md:266` — the follow-up to delete them if they are not wanted"
        ],
        "source": "../architecture.md §4, §7.2",
        "link": "../architecture.md#4-non-goals"
      },
      "options": [
        {
          "id": "left-private-and-archived",
          "name": "Leave both private and archived, listed as a follow-up",
          "verdict": "accepted",
          "why": "The phase neither has nor needs the scope a deletion takes.",
          "source": "../architecture.md §7.2",
          "link": "../architecture.md#72-the-rehearsal"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Both repositories stay, private and archived, and deleting them is a follow-up for the residual report and cleanup unit (`consequences.md` §6).",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The tool and its runner, the text of the plan's Appendix A, each equal to the size and sha256 the plan's bootstrap checks:",
              "hash": "c6eb1398146a"
            }
          },
          {
            "text": "Nothing was deleted, and no request needed the `delete_repo` scope.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-the-procedures-record",
            "excerpt": {
              "ref": "final-implementation.md#31-the-procedures-record",
              "heading": "3.1 The procedure's record",
              "paragraph": "Each of the 30 requests was answered `done` at its first attempt. The close-out's `private-src` and `archive-src` were already done and were skipped. No refusal, throttle or fallback route occurred.",
              "hash": "c72e6c7a171f"
            }
          }
        ]
      },
      "verdict": {
        "kind": "leave",
        "statements": [
          {
            "text": "The two repositories stay, private and archived, and deleting them is a follow-up.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No change to KotlinBottools or to any of the other five repositories: not an issue, a number, a label, a milestone, a setting or a ref. The only KotlinBottools read is `smoke`, which prints counts. · No real text, no real data and no real identity in the fixture or in the results. · No deletion of the rehearsal repositories. Deleting them needs the `delete_repo` scope, which the phase neither has nor needs; they are a follow-up (Sequencing and follow-ups). · No rewriting of references by this unit. GitHub qualifies them during a transfer; the item check maps the qualified form back before …",
              "hash": "3736cc226a8f"
            }
          },
          {
            "text": "Deleting them needs the `delete_repo` scope, which the phase neither has nor needs.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No change to KotlinBottools or to any of the other five repositories: not an issue, a number, a label, a milestone, a setting or a ref. The only KotlinBottools read is `smoke`, which prints counts. · No real text, no real data and no real identity in the fixture or in the results. · No deletion of the rehearsal repositories. Deleting them needs the `delete_repo` scope, which the phase neither has nor needs; they are a follow-up (Sequencing and follow-ups). · No rewriting of references by this unit. GitHub qualifies them during a transfer; the item check maps the qualified form back before …",
              "hash": "3736cc226a8f"
            }
          }
        ],
        "defense": "Nothing in the phase needs them gone, and the scope a deletion takes is not one it holds.",
        "source": "plan.md Non-goals",
        "link": "plan.md#non-goals"
      }
    }
  ],
  "impact": {
    "basis": "as-built",
    "summary": "Two throwaway repositories and nothing else on GitHub: no module is published, no version moves, and the landing changes documents and generated boards only. KotlinBottools and every other repository stay as they are. The tool and the results outlive this unit, and the next unit takes them, with what the run measured and the tool's known gaps (`consequences.md` §4, §5).",
    "none": null,
    "release": {
      "bump": "none",
      "version": null,
      "note": "no module is published and no version moves"
    },
    "downstream": [
      {
        "who": "`phase0-rehearsal-a` and `phase0-rehearsal-b`",
        "kind": "repository",
        "system": "repository-swap",
        "effect": "additive",
        "summary": "Two new throwaway repositories of the organisation, the source created public and the target private and empty, holding made-up text only. They end as `phase0-rehearsal-a-legacy` and `phase0-rehearsal-a`, both private and archived, and neither is deleted.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "KotlinBottools and every other repository",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "No issue, number, label, milestone, setting or ref changes. The only read of KotlinBottools beyond the landing prints counts.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "This machine",
        "kind": "operator",
        "system": null,
        "effect": "additive",
        "summary": "The tool, its runner and the results are added under the user profile, outside every repository. They hold made-up fixture text and the ids of the two throwaway repositories, and they outlive this unit.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The two clones on this machine",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "Neither changes: the procedure reads this checkout only to save its tool from the plan.",
        "link": "consequences.md#23-the-two-clones-on-this-machine"
      },
      {
        "who": "The parent's documents and the generated boards",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "The landing carries this unit's documents, the dated notes on the parent's design and consequences, one line in the parent's consequences, and the regenerated boards.",
        "link": "consequences.md#24-documents-and-generated-boards"
      },
      {
        "who": "`kotlinbottools-rewrite-and-swap` (#23)",
        "kind": "consumer",
        "system": null,
        "effect": "additive",
        "summary": "May start: this unit's result passed. It takes the measured behaviour of a public-to-private transfer, what a transfer does to the references in the moved text, the rename order with its privacy step, the tool once its known gaps are closed, and the pattern of the requests; it needs a job of its own and decides what happens to the moved text that names `KotlinBottools-next`.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "`residual-report-and-cleanup` (#28)",
        "kind": "consumer",
        "system": null,
        "effect": "additive",
        "summary": "Takes the two rehearsal repositories as a follow-up and carries KotlinBottools' public window in its report.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "The other units of the phase",
        "kind": "consumer",
        "system": null,
        "effect": "none",
        "summary": "`repository-hygiene`, `kotlinbottools-publish`, `gkb2-gkb-rewrite` and `bottools-trumpbot-support-rewrite` take nothing beyond what the units before them hand on.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      }
    ],
    "adaptation": [
      {
        "who": "Existing code and mechanisms",
        "system": null,
        "need": "none",
        "summary": "No existing code adopts anything from this unit; its read, comparison, settle rule and pacing are built for the next unit to reuse.",
        "link": "consequences.md#3-adoption"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md §1 to §6; final-implementation.md §2 to §4",
    "link": "consequences.md#2-blast-radius",
    "changes": [
      {
        "what": "The next unit also takes what a transfer does to issue references, the tool's known gaps to close before reusing it, a job of its own, and the decision on the moved text that names `KotlinBottools-next`.",
        "why": "The run measured the rewriting of references, which the documentation omits, and what those references reach after the renames; the tool's gaps were recorded rather than fixed, as it ran exactly as planned.",
        "when": "S3 to S5",
        "entry": "downstream.5",
        "ref": "consequences.md#4-sibling-units-and-neighbouring-issues"
      }
    ]
  },
  "tests": {
    "base": "main",
    "updated": "2026-11-09T04:11:44Z",
    "added": [],
    "amended": []
  },
  "roadmap": {
    "issue": 2,
    "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
    "asOf": "2026-11-08",
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
        "state": "OPEN"
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
        "title": "Phase 0 · 7 — Rewrite BotTools, TrumpBot and Support, and replace the TrumpBot clone",
        "state": "OPEN"
      },
      {
        "issue": 28,
        "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
        "state": "OPEN"
      }
    ]
  },
  "followUps": [
    {
      "issue": 23,
      "title": "Phase 0 · 3 — KotlinBottools: rewrite with path scrub, fresh repository, number-preserving swap and clone realignment",
      "note": "takes a job of its own, the tool's known gaps to close before reuse, the inherited results, and the decision on the moved text that names `KotlinBottools-next` (`consequences.md` §6)"
    },
    {
      "issue": 28,
      "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
      "note": "takes the two rehearsal repositories, private and archived; deleting them needs the `delete_repo` scope (`consequences.md` §6)"
    }
  ],
  "documents": [
    {
      "label": "Issue #22",
      "path": "https://github.com/SpartanLaboratories/KotlinBottools/issues/22",
      "note": "the unit as #2 filed it: its scope and what done means"
    },
    {
      "label": "plan.md",
      "path": "plan.md",
      "note": "the procedure: the requirements, the design, the seven stages with their checks and stops (§7.4), re-running (§7.5), and the tool in Appendix A"
    },
    {
      "label": "final-implementation.md",
      "path": "final-implementation.md",
      "note": "what the unit built (§1), the acceptance (§2), the measurements: numbers, closed issues, links, references, the rename swap, old URLs (§3), and the one deviation (§4)"
    },
    {
      "label": "consequences.md",
      "path": "consequences.md",
      "note": "the blast radius on GitHub and on this machine (§2), what the later units take from this one (§4), the known gaps, the tool's among them (§5), and the follow-ups (§6)"
    },
    {
      "label": "research/README.md",
      "path": "research/README.md",
      "note": "the three questions, the verification of the load-bearing claims, the summary the plan rests on, and what did not hold in the build"
    },
    {
      "label": "#2 architecture",
      "path": "../architecture.md",
      "note": "§2.4 the verified facts on transfers and renames, §3 the assumptions the rehearsal shows, §7.2 the rehearsal, §7.4 what a transfer does to references, §7.6 what a failure hands back, §11 the requested writes, §14 the alternatives, §15 unit 2"
    },
    {
      "label": "#2 research",
      "path": "../research/README.md",
      "note": "the questions, verification and summary the Gap column rests on; the transfer behaviour is in `purge-blast-radius.md` §3.D and `github-residual-exposure-and-visibility.md`"
    },
    {
      "label": "#2 consequences",
      "path": "../consequences.md",
      "note": "§4 the sibling units, §5 the known gaps, §6 the follow-up on the rehearsal repositories"
    },
    {
      "label": "#2 tracking board",
      "path": "../dashboard.html",
      "note": "the eight units in landing order"
    }
  ],
  "notes": {
    "corrections": [
      {
        "what": "The function, the Row's name and its accepted option said two private repositories, as the design first signed off did; the design's dated note and the plan make the source public until the swap. The function and the name are corrected in place, and the private-pair option stands declined beside the accepted public source. Rows: rehearsal-repositories.",
        "when": "2026-11-09"
      },
      {
        "what": "The Row's accepted option named renaming and archiving the source with no privacy step; the design's dated note and the plan add one for the public source, so that option stands declined beside the accepted order. Rows: rename-swap.",
        "when": "2026-11-09"
      },
      {
        "what": "The Row's Gap said GitHub documents that a repository takes a name just vacated by a rename; the research finds that documented only for creating a repository under the old name. Rows: rename-swap.",
        "when": "2026-11-09"
      },
      {
        "what": "Two accepted options cited the design's §7.2 dated note as of 2026-11-08; the note is dated 2026-11-09, and both citations are corrected in place. Rows: rehearsal-repositories, failure-behaviour.",
        "when": "2026-11-09"
      }
    ]
  },
  "issueBoards": {
    "21": "../21-preparation/dashboard.html",
    "23": "../23-kotlinbottools-rewrite-and-swap/dashboard.html"
  },
  "links": {
    "workBoard": "../../../index.html",
    "repoBoard": "../../../../dashboards/index.html"
  }
}
);
