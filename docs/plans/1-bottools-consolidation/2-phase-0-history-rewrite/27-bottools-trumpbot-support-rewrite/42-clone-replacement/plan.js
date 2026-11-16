/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 42,
  "slug": "42-clone-replacement",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/42-clone-replacement",
  "kind": "issue",
  "title": "Replace the TrumpBot clone",
  "issueTitle": "Phase 0 · 7.4 — Replace the TrumpBot clone",
  "function": "The local TrumpBot clone still holds TrumpBot's history from before the rewrite, which the server's branches no longer share, and a code knowledge graph built from that old tree. This unit has it replaced once TrumpBot's push is proven: the old clone renamed aside on its own volume as the lock probe, behind guards and with a bounded retry; a fresh clone made at the same path, with the four `.idea/` files restored and nothing else git does not track carried; the fresh clone proven to reach no pre-rewrite commit or purged blob, and read back by the unit before the old clone is deleted at its recorded path; then the graph rebuilt from the rewritten tree by a code-only build, with its two hooks, and read back. Unit 4 of #27, the last, with no version moved: every change to the clone is a request carried out under the grant for this unit's job, nothing is written to GitHub, this working tree changes only by the landing, and the landing carries documents only.",
  "status": "building",
  "sized": "2026-11-16T03:31:47Z",
  "parent": {
    "issue": 27,
    "board": "../dashboard.html"
  },
  "fixOf": null,
  "branch": "docs/issue-42-replace-trumpbot-clone",
  "baseline": {
    "ref": "main",
    "sha": "f11f7abecdc68f1153e5904c325ff6bfb0709ea0",
    "date": "2026-11-15"
  },
  "asBuilt": null,
  "systems": [
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
    "step": "document",
    "since": "2026-11-16T20:04:58Z",
    "updated": "2026-11-16T20:32:24Z",
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
    "current": [
      "built"
    ],
    "questions": [],
    "research": null,
    "interview": [],
    "plan": null,
    "stages": [
      {
        "id": "S0",
        "name": "Readiness",
        "state": "done",
        "rows": [
          "readiness",
          "grant"
        ],
        "brief": "The unit's data file and grant wording are written, the tools are at their pins, the rewrites' records equal their checksum lists, the grant is in place, and the clone passes its guards with its census recorded.",
        "kind": "check",
        "steps": [
          {
            "id": "S0.unit",
            "name": "The unit's data file and grant wording",
            "state": "done",
            "finished": "2026-11-16T06:04:04Z"
          },
          {
            "id": "S0.tools",
            "name": "The tools at their pins",
            "state": "done",
            "finished": "2026-11-16T06:04:20Z"
          },
          {
            "id": "S0.quick",
            "name": "The quick gate",
            "state": "done",
            "finished": "2026-11-16T06:04:36Z"
          },
          {
            "id": "S0.pins",
            "name": "The tool versions",
            "state": "done",
            "finished": "2026-11-16T06:04:45Z"
          },
          {
            "id": "S0.records",
            "name": "The rewrites' records, the backup and the manifest",
            "state": "done",
            "finished": "2026-11-16T06:04:59Z"
          },
          {
            "id": "S0.grant",
            "name": "The grant read",
            "state": "done",
            "finished": "2026-11-16T06:05:08Z"
          },
          {
            "id": "S0.checks",
            "name": "The clone's guards",
            "state": "done",
            "finished": "2026-11-16T06:05:31Z"
          },
          {
            "id": "S0.census",
            "name": "The clone's census recorded",
            "state": "done",
            "finished": "2026-11-16T06:05:39Z"
          }
        ],
        "ref": "plan.md#s0--readiness",
        "started": "2026-11-16T04:35:47Z",
        "finished": "2026-11-16T06:05:39Z",
        "report": "Readiness passed: the unit's data file and grant wording written (the run log held 16157 lines before the unit); the tools at their pins (96 ok); the quick gate 63 of 63; the tool versions 7 ok; the rewrites' records, the earlier records, the untouched backup (22 files), the manifest (199 blobs) and the stage-8 marker equal their lists; the grant read with 11 ok and one RECORD (the section holds no Settings line, every action, the issue, the branch, the targets and the end as needed); the clone's guards 17 ok with the two expected RECORD lines and the server's heads at the new column; the census recorded: untracked 59 (carried 4, not carried 55, elsewhere 0), hooks 2, exclude lines 2, config keys 12. One deviation is logged in final-implementation.md: the grant's wording differs by its Settings line.",
        "result": "passed"
      },
      {
        "id": "S1",
        "name": "The replacement",
        "state": "done",
        "rows": [
          "move",
          "carried",
          "fresh-clone"
        ],
        "brief": "The old clone is renamed aside, a fresh clone of the rewritten repository is made at its path with the four carried files restored, and the unit's own reads prove the fresh clone and the old clone aside.",
        "kind": "work",
        "steps": [
          {
            "id": "S1.request",
            "name": "The replacement request built and handed off",
            "state": "done",
            "finished": "2026-11-16T06:06:41Z"
          },
          {
            "id": "S1.send",
            "name": "The request sent",
            "state": "done",
            "finished": "2026-11-16T19:23:43Z"
          },
          {
            "id": "S1.reply",
            "name": "The reply stored",
            "state": "done",
            "finished": "2026-11-16T19:29:17Z"
          },
          {
            "id": "S1.outcome",
            "name": "The outcome read",
            "state": "done",
            "finished": "2026-11-16T19:29:35Z"
          },
          {
            "id": "S1.proofs",
            "name": "The fresh clone proven",
            "state": "done",
            "finished": "2026-11-16T19:30:01Z"
          },
          {
            "id": "S1.carried",
            "name": "The four restored files read against their checksums",
            "state": "done",
            "finished": "2026-11-16T19:30:16Z"
          },
          {
            "id": "S1.aside",
            "name": "The old clone read whole at the recorded path",
            "state": "done",
            "finished": "2026-11-16T19:30:35Z"
          },
          {
            "id": "S1.back",
            "name": "The move back, only after a stop that follows the rename",
            "steps": [
              {
                "id": "S1.back.request",
                "name": "The move-back request built and handed off"
              },
              {
                "id": "S1.back.send",
                "name": "The request sent"
              },
              {
                "id": "S1.back.reply",
                "name": "The reply stored"
              },
              {
                "id": "S1.back.outcome",
                "name": "The outcome read"
              },
              {
                "id": "S1.back.census",
                "name": "The old clone's census read at the clone's path"
              },
              {
                "id": "S1.back.checks",
                "name": "The clone's guards read again"
              }
            ]
          }
        ],
        "ref": "plan.md#s1--the-replacement",
        "started": "2026-11-16T06:05:39Z",
        "finished": "2026-11-16T19:30:35Z",
        "report": "The replacement passed: the request ran once and its reply was stored as done (88 printed lines: the 84 of the eight entries and the 4 check sentences the reply carries), OUTCOME complete entries=8 of 8 stops=0 status=done. The unit's own reads: the fresh clone's proofs 18 ok (the old commits and the 199 manifest blobs missing, the untouched backup's control whole, ten local keys, no hook, a comment-only exclude file, no FETCH_HEAD); the four restored files equal their checksums and are the only untracked files, and the same checksums hold for the old clone aside; the old clone aside equals its recorded census (differing lines 0: untracked 59, hooks 2, exclude lines 2, config keys 12). The move back was not needed. A second deviation is logged in final-implementation.md: the reply was saved as a byte-for-byte copy of the delivered file."
      },
      {
        "id": "S2",
        "name": "The deletion",
        "state": "done",
        "rows": [
          "deletion",
          "leftover"
        ],
        "brief": "The old clone is deleted at its recorded path, and no old-clone path remains.",
        "kind": "work",
        "steps": [
          {
            "id": "S2.request",
            "name": "The deletion request built and handed off",
            "state": "done",
            "finished": "2026-11-16T19:31:14Z"
          },
          {
            "id": "S2.send",
            "name": "The request sent",
            "state": "done",
            "finished": "2026-11-16T19:31:53Z"
          },
          {
            "id": "S2.reply",
            "name": "The reply stored",
            "state": "done",
            "finished": "2026-11-16T19:36:31Z"
          },
          {
            "id": "S2.outcome",
            "name": "The outcome read",
            "state": "done",
            "finished": "2026-11-16T19:36:40Z"
          },
          {
            "id": "S2.gone",
            "name": "No old-clone path remains",
            "state": "done",
            "finished": "2026-11-16T19:36:57Z"
          }
        ],
        "ref": "plan.md#s2--the-deletion",
        "started": "2026-11-16T19:30:35Z",
        "finished": "2026-11-16T19:36:57Z",
        "report": "The deletion ended: the request ran once and its reply was stored as done (16 printed lines), OUTCOME complete entries=3 of 3 stops=0 status=done; the unit's own read finds no old-clone path left and the fresh clone in place (2 ok, STAGE K1.gone OK). A third deviation is logged in final-implementation.md: the deletion request carries the replacement's four check sentences, as the pinned request builder writes one list for every kind; the deletion's own markers all printed."
      },
      {
        "id": "S3",
        "name": "The graph",
        "state": "done",
        "rows": [
          "graph",
          "grant"
        ],
        "brief": "The graph service builds a code-only graph of the fresh clone with its two hooks, and the unit reads the graph and its hooks back.",
        "kind": "work",
        "steps": [
          {
            "id": "S3.notice",
            "name": "The graph service told",
            "state": "done",
            "finished": "2026-11-16T19:38:03Z"
          },
          {
            "id": "S3.wait",
            "name": "The build waited for",
            "state": "done",
            "finished": "2026-11-16T19:47:31Z"
          },
          {
            "id": "S3.graph",
            "name": "The graph read back",
            "state": "done",
            "finished": "2026-11-16T19:47:54Z"
          }
        ],
        "ref": "plan.md#s3--the-graph",
        "started": "2026-11-16T19:36:57Z",
        "finished": "2026-11-16T19:47:54Z",
        "report": "The graph is rebuilt and read back: the first read after the notice waited, and after one wait of 9 minutes the graph file and both hooks were present. The read-back gave 9 ok and the one expected RECORD (one untracked file outside the two folders, the board files' ignore at the root), then STAGE K1.graph OK: the graph's folder exists and holds files, the hooks beyond the samples are exactly the graph's, the exclude file holds the graph's entry, no extra key but at most lfs.repositoryformatversion, the carried files unchanged, the remote-tracking refs at the new column and the old commits and manifest blobs still missing."
      },
      {
        "id": "S4",
        "name": "Close-out",
        "state": "done",
        "rows": [
          "leftover"
        ],
        "brief": "The earlier records and this unit's equal their checksum lists, the tools and the earlier tool folder are at their pins, and the unit's outputs and records hold nothing sensitive.",
        "kind": "check",
        "steps": [
          {
            "id": "S4.records",
            "name": "The checksum lists",
            "state": "done",
            "finished": "2026-11-16T19:48:22Z"
          },
          {
            "id": "S4.tools",
            "name": "The tools at their pins",
            "state": "done",
            "finished": "2026-11-16T19:49:10Z"
          },
          {
            "id": "S4.g26",
            "name": "The earlier tool folder at its pins",
            "state": "done",
            "finished": "2026-11-16T19:49:57Z"
          },
          {
            "id": "S4.outputs",
            "name": "The output rule over the unit's outputs",
            "state": "done",
            "finished": "2026-11-16T19:50:17Z"
          }
        ],
        "ref": "plan.md#s4--close-out",
        "started": "2026-11-16T19:47:54Z",
        "finished": "2026-11-16T19:50:17Z",
        "report": "The close-out passed: the rewrites' run records (49 files), TrumpBot's rewrite records (29), the 6 earlier records and the untouched backup (22) still equal their lists, and this unit's 9 records are written under their checksum list and verify; the tools are at their pins (96 ok); the earlier tool folder holds 21 of 21 pinned files and the runner its recorded size and hash; the output rule holds over the unit's 370 lines of the run log (STOP 0, WAIT 0, NEXT 0, RECORD 4: the grant's wording, the two of the clone's guards and the graph's expected one), the 2 stored replies and the 2 request files. Only the unit's own 11 runner steps are in its part of the log.",
        "result": "passed"
      }
    ],
    "remediation": {
      "pass": 1,
      "route": "on-the-spot",
      "steps": [
        {
          "name": "State the replacement reply as stored: 88 lines, the procedure's lines and the four check strings",
          "state": "done",
          "finished": "2026-11-16T20:04:42Z",
          "report": "Both wording fixes are made in the as-built record; no further pass of the quality review is needed."
        },
        {
          "name": "Rest the third deviation on the facts of the deletion instead of a reading of the stop rule",
          "state": "done",
          "finished": "2026-11-16T20:04:42Z",
          "report": "Both wording fixes are made in the as-built record; no further pass of the quality review is needed."
        }
      ]
    },
    "open": [],
    "event": {
      "name": "document",
      "at": "2026-11-16T20:32:24Z",
      "note": "4 of 4 tasks done"
    },
    "history": {
      "sizing": [
        {
          "since": null,
          "ended": "2026-11-16T03:31:47Z",
          "endedBy": "sized",
          "to": "plan"
        }
      ],
      "plan": [
        {
          "since": "2026-11-16T03:31:47Z",
          "ended": "2026-11-16T04:31:50Z",
          "endedBy": "plan-accepted",
          "to": "branch",
          "event": {
            "name": "plan-stage",
            "at": "2026-11-16T04:25:27Z"
          },
          "detail": "The consequences record that the unit writes nothing to GitHub, that the clone is replaced with its four carried files and its graph rebuilt, that the old clone sits aside on its own volume until its deletion, what the residual report and cleanup takes, and the known gaps of a fresh clone, the rename and the graph build.",
          "plan": {
            "state": "re-pass",
            "from": "parent",
            "since": "2026-11-16T03:31:47Z",
            "stages": [
              {
                "id": "re-pass",
                "state": "done",
                "started": "2026-11-16T03:31:47Z",
                "finished": "2026-11-16T04:03:28Z",
                "report": "The slice holds against the clone, the rewrites' records, the tools and the request service as they are now, but for one file: the graph service's board files' ignore at the clone's root, which the owner takes out before the unit's census, as the parent design's dated note now says; no question about the intent remains open."
              },
              {
                "id": "write",
                "state": "done",
                "started": "2026-11-16T04:03:28Z",
                "finished": "2026-11-16T04:19:08Z",
                "report": "The draft holds five stages: readiness with the clone's checks and census, the replacement as one request read back by the unit, the deletion as a second request, the graph's build at the owner's word and its read-back, and a close-out, with every expected line taken from the clone set's code and the move back only after a stop that follows the rename."
              },
              {
                "id": "check",
                "state": "done",
                "started": "2026-11-16T04:19:08Z",
                "finished": "2026-11-16T04:23:38Z",
                "report": "The check found the plan in line with the clone set's code, the rewrites' records as built and the parent design's section 10, and fixed small points in place: the status line, the rule for a shell beside the clone, a request's attempt number and resend key, and the state a stop before the rename leaves.",
                "result": "accepted"
              },
              {
                "id": "consequences",
                "state": "done",
                "started": "2026-11-16T04:23:38Z",
                "finished": "2026-11-16T04:25:27Z",
                "report": "The consequences record that the unit writes nothing to GitHub, that the clone is replaced with its four carried files and its graph rebuilt, that the old clone sits aside on its own volume until its deletion, what the residual report and cleanup takes, and the known gaps of a fresh clone, the rename and the graph build."
              },
              {
                "id": "report",
                "state": "done",
                "started": "2026-11-16T04:25:27Z",
                "finished": "2026-11-16T04:31:50Z",
                "report": "The report gives a five-stage procedure over the pinned clone set, the grant section with three allow lines, the graph-build word, the removal of the board files' ignore and a second section for closing #27, all asked of the owner up front."
              }
            ]
          }
        }
      ],
      "branch": [
        {
          "since": "2026-11-16T04:31:50Z",
          "ended": "2026-11-16T04:35:47Z",
          "endedBy": "branch-cut",
          "to": "implementation",
          "event": {
            "name": "plan-accepted",
            "at": "2026-11-16T04:31:50Z"
          },
          "detail": "The report gives a five-stage procedure over the pinned clone set, the grant section with three allow lines, the graph-build word, the removal of the board files' ignore and a second section for closing #27, all asked of the owner up front.",
          "branch": "docs/issue-42-replace-trumpbot-clone"
        }
      ],
      "implementation": [
        {
          "since": "2026-11-16T04:35:47Z",
          "ended": "2026-11-16T04:35:59Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "branch-cut",
            "at": "2026-11-16T04:35:47Z"
          },
          "detail": "Branch `docs/issue-42-replace-trumpbot-clone` cut; implementation starts at S0: Readiness.",
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "current",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S0.unit",
                  "name": "The unit's data file and grant wording"
                },
                {
                  "id": "S0.tools",
                  "name": "The tools at their pins"
                },
                {
                  "id": "S0.quick",
                  "name": "The quick gate"
                },
                {
                  "id": "S0.pins",
                  "name": "The tool versions"
                },
                {
                  "id": "S0.records",
                  "name": "The rewrites' records, the backup and the manifest"
                },
                {
                  "id": "S0.grant",
                  "name": "The grant read"
                },
                {
                  "id": "S0.checks",
                  "name": "The clone's guards"
                },
                {
                  "id": "S0.census",
                  "name": "The clone's census recorded"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "brief": "The unit's data file and grant wording are written, the tools are at their pins, the rewrites' records equal their checksum lists, the grant is in place, and the clone passes its guards with its census recorded.",
              "started": "2026-11-16T04:35:47Z"
            },
            {
              "id": "S1",
              "name": "The replacement",
              "state": "todo",
              "rows": [],
              "kind": "work",
              "steps": [
                {
                  "id": "S1.request",
                  "name": "The replacement request built and handed off"
                },
                {
                  "id": "S1.send",
                  "name": "The request sent"
                },
                {
                  "id": "S1.reply",
                  "name": "The reply stored"
                },
                {
                  "id": "S1.outcome",
                  "name": "The outcome read"
                },
                {
                  "id": "S1.proofs",
                  "name": "The fresh clone proven"
                },
                {
                  "id": "S1.carried",
                  "name": "The four restored files read against their checksums"
                },
                {
                  "id": "S1.aside",
                  "name": "The old clone read whole at the recorded path"
                },
                {
                  "id": "S1.back",
                  "name": "The move back, only after a stop that follows the rename",
                  "steps": [
                    {
                      "id": "S1.back.request",
                      "name": "The move-back request built and handed off"
                    },
                    {
                      "id": "S1.back.send",
                      "name": "The request sent"
                    },
                    {
                      "id": "S1.back.reply",
                      "name": "The reply stored"
                    },
                    {
                      "id": "S1.back.outcome",
                      "name": "The outcome read"
                    },
                    {
                      "id": "S1.back.census",
                      "name": "The old clone's census read at the clone's path"
                    },
                    {
                      "id": "S1.back.checks",
                      "name": "The clone's guards read again"
                    }
                  ]
                }
              ],
              "ref": "plan.md#s1--the-replacement",
              "brief": "The old clone is renamed aside, a fresh clone of the rewritten repository is made at its path with the four carried files restored, and the unit's own reads prove the fresh clone and the old clone aside."
            },
            {
              "id": "S2",
              "name": "The deletion",
              "state": "todo",
              "rows": [],
              "kind": "work",
              "steps": [
                {
                  "id": "S2.request",
                  "name": "The deletion request built and handed off"
                },
                {
                  "id": "S2.send",
                  "name": "The request sent"
                },
                {
                  "id": "S2.reply",
                  "name": "The reply stored"
                },
                {
                  "id": "S2.outcome",
                  "name": "The outcome read"
                },
                {
                  "id": "S2.gone",
                  "name": "No old-clone path remains"
                }
              ],
              "ref": "plan.md#s2--the-deletion",
              "brief": "The old clone is deleted at its recorded path, and no old-clone path remains."
            },
            {
              "id": "S3",
              "name": "The graph",
              "state": "todo",
              "rows": [],
              "kind": "work",
              "steps": [
                {
                  "id": "S3.notice",
                  "name": "The graph service told"
                },
                {
                  "id": "S3.wait",
                  "name": "The build waited for"
                },
                {
                  "id": "S3.graph",
                  "name": "The graph read back"
                }
              ],
              "ref": "plan.md#s3--the-graph",
              "brief": "The graph service builds a code-only graph of the fresh clone with its two hooks, and the unit reads the graph and its hooks back."
            },
            {
              "id": "S4",
              "name": "Close-out",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S4.records",
                  "name": "The checksum lists"
                },
                {
                  "id": "S4.tools",
                  "name": "The tools at their pins"
                },
                {
                  "id": "S4.g26",
                  "name": "The earlier tool folder at its pins"
                },
                {
                  "id": "S4.outputs",
                  "name": "The output rule over the unit's outputs"
                }
              ],
              "ref": "plan.md#s4--close-out",
              "brief": "The earlier records and this unit's equal their checksum lists, the tools and the earlier tool folder are at their pins, and the unit's outputs and records hold nothing sensitive."
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "Place the three allow lines for the replacement, the deletion and the move back (and a fourth for closing #27) in the global settings file before the first call?",
              "answer": null,
              "asked": "2026-11-16T04:35:59Z",
              "answered": "2026-11-16T05:57:48Z"
            },
            {
              "text": "Delete the board files' ignore at the root of the TrumpBot clone, leaving its exclude line, and run no graph job on that checkout until the replacement is complete?",
              "answer": null,
              "asked": "2026-11-16T04:35:59Z",
              "answered": "2026-11-16T05:57:48Z"
            },
            {
              "text": "Give the word for the code-only graph build of the fresh clone with its two hooks, once the clone is replaced and proven and the old clone deleted?",
              "answer": null,
              "asked": "2026-11-16T04:35:59Z",
              "answered": "2026-11-16T05:57:48Z"
            },
            {
              "text": "Give the section phase-0-tracking-27-close, so that #27 is closed by request after the landing; otherwise #27 is closed by hand?",
              "options": [
                "Give the section",
                "Close #27 by hand"
              ],
              "answer": null,
              "asked": "2026-11-16T04:35:59Z",
              "answered": "2026-11-16T05:57:48Z"
            }
          ]
        },
        {
          "since": "2026-11-16T05:57:48Z",
          "ended": "2026-11-16T06:07:27Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "step-complete",
            "at": "2026-11-16T06:06:41Z"
          },
          "detail": "Readiness passed: the unit's data file and grant wording written (the run log held 16157 lines before the unit); the tools at their pins (96 ok); the quick gate 63 of 63; the tool versions 7 ok; the rewrites' records, the earlier records, the untouched backup (22 files), the manifest (199 blobs) and the stage-8 marker equal their lists; the grant read with 11 ok and one RECORD (the section holds no Settings line, every action, the issue, the branch, the targets and the end as needed); the clone's guards 17 ok with the two expected RECORD lines and the server's heads at the new column; the census recorded: untracked 59 (carried 4, not carried 55, elsewhere 0), hooks 2, exclude lines 2, config keys 12. One deviation is logged in final-implementation.md: the grant's wording differs by its Settings line.",
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "done",
              "rows": [
                "readiness",
                "grant"
              ],
              "brief": "The unit's data file and grant wording are written, the tools are at their pins, the rewrites' records equal their checksum lists, the grant is in place, and the clone passes its guards with its census recorded.",
              "kind": "check",
              "steps": [
                {
                  "id": "S0.unit",
                  "name": "The unit's data file and grant wording",
                  "state": "done",
                  "finished": "2026-11-16T06:04:04Z"
                },
                {
                  "id": "S0.tools",
                  "name": "The tools at their pins",
                  "state": "done",
                  "finished": "2026-11-16T06:04:20Z"
                },
                {
                  "id": "S0.quick",
                  "name": "The quick gate",
                  "state": "done",
                  "finished": "2026-11-16T06:04:36Z"
                },
                {
                  "id": "S0.pins",
                  "name": "The tool versions",
                  "state": "done",
                  "finished": "2026-11-16T06:04:45Z"
                },
                {
                  "id": "S0.records",
                  "name": "The rewrites' records, the backup and the manifest",
                  "state": "done",
                  "finished": "2026-11-16T06:04:59Z"
                },
                {
                  "id": "S0.grant",
                  "name": "The grant read",
                  "state": "done",
                  "finished": "2026-11-16T06:05:08Z"
                },
                {
                  "id": "S0.checks",
                  "name": "The clone's guards",
                  "state": "done",
                  "finished": "2026-11-16T06:05:31Z"
                },
                {
                  "id": "S0.census",
                  "name": "The clone's census recorded",
                  "state": "done",
                  "finished": "2026-11-16T06:05:39Z"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "started": "2026-11-16T04:35:47Z",
              "finished": "2026-11-16T06:05:39Z",
              "report": "Readiness passed: the unit's data file and grant wording written (the run log held 16157 lines before the unit); the tools at their pins (96 ok); the quick gate 63 of 63; the tool versions 7 ok; the rewrites' records, the earlier records, the untouched backup (22 files), the manifest (199 blobs) and the stage-8 marker equal their lists; the grant read with 11 ok and one RECORD (the section holds no Settings line, every action, the issue, the branch, the targets and the end as needed); the clone's guards 17 ok with the two expected RECORD lines and the server's heads at the new column; the census recorded: untracked 59 (carried 4, not carried 55, elsewhere 0), hooks 2, exclude lines 2, config keys 12. One deviation is logged in final-implementation.md: the grant's wording differs by its Settings line.",
              "result": "passed"
            },
            {
              "id": "S1",
              "name": "The replacement",
              "state": "current",
              "rows": [
                "move",
                "carried",
                "fresh-clone"
              ],
              "brief": "The old clone is renamed aside, a fresh clone of the rewritten repository is made at its path with the four carried files restored, and the unit's own reads prove the fresh clone and the old clone aside.",
              "kind": "work",
              "steps": [
                {
                  "id": "S1.request",
                  "name": "The replacement request built and handed off",
                  "state": "done",
                  "finished": "2026-11-16T06:06:41Z"
                },
                {
                  "id": "S1.send",
                  "name": "The request sent"
                },
                {
                  "id": "S1.reply",
                  "name": "The reply stored"
                },
                {
                  "id": "S1.outcome",
                  "name": "The outcome read"
                },
                {
                  "id": "S1.proofs",
                  "name": "The fresh clone proven"
                },
                {
                  "id": "S1.carried",
                  "name": "The four restored files read against their checksums"
                },
                {
                  "id": "S1.aside",
                  "name": "The old clone read whole at the recorded path"
                },
                {
                  "id": "S1.back",
                  "name": "The move back, only after a stop that follows the rename",
                  "steps": [
                    {
                      "id": "S1.back.request",
                      "name": "The move-back request built and handed off"
                    },
                    {
                      "id": "S1.back.send",
                      "name": "The request sent"
                    },
                    {
                      "id": "S1.back.reply",
                      "name": "The reply stored"
                    },
                    {
                      "id": "S1.back.outcome",
                      "name": "The outcome read"
                    },
                    {
                      "id": "S1.back.census",
                      "name": "The old clone's census read at the clone's path"
                    },
                    {
                      "id": "S1.back.checks",
                      "name": "The clone's guards read again"
                    }
                  ]
                }
              ],
              "ref": "plan.md#s1--the-replacement",
              "started": "2026-11-16T06:05:39Z"
            },
            {
              "id": "S2",
              "name": "The deletion",
              "state": "todo",
              "rows": [
                "deletion",
                "leftover"
              ],
              "brief": "The old clone is deleted at its recorded path, and no old-clone path remains.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.request",
                  "name": "The deletion request built and handed off"
                },
                {
                  "id": "S2.send",
                  "name": "The request sent"
                },
                {
                  "id": "S2.reply",
                  "name": "The reply stored"
                },
                {
                  "id": "S2.outcome",
                  "name": "The outcome read"
                },
                {
                  "id": "S2.gone",
                  "name": "No old-clone path remains"
                }
              ],
              "ref": "plan.md#s2--the-deletion"
            },
            {
              "id": "S3",
              "name": "The graph",
              "state": "todo",
              "rows": [
                "graph"
              ],
              "brief": "The graph service builds a code-only graph of the fresh clone with its two hooks, and the unit reads the graph and its hooks back.",
              "kind": "work",
              "steps": [
                {
                  "id": "S3.notice",
                  "name": "The graph service told"
                },
                {
                  "id": "S3.wait",
                  "name": "The build waited for"
                },
                {
                  "id": "S3.graph",
                  "name": "The graph read back"
                }
              ],
              "ref": "plan.md#s3--the-graph"
            },
            {
              "id": "S4",
              "name": "Close-out",
              "state": "todo",
              "rows": [
                "leftover"
              ],
              "brief": "The earlier records and this unit's equal their checksum lists, the tools and the earlier tool folder are at their pins, and the unit's outputs and records hold nothing sensitive.",
              "kind": "check",
              "steps": [
                {
                  "id": "S4.records",
                  "name": "The checksum lists"
                },
                {
                  "id": "S4.tools",
                  "name": "The tools at their pins"
                },
                {
                  "id": "S4.g26",
                  "name": "The earlier tool folder at its pins"
                },
                {
                  "id": "S4.outputs",
                  "name": "The output rule over the unit's outputs"
                }
              ],
              "ref": "plan.md#s4--close-out"
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "Place the four checked allow lines (the replacement, the deletion, the move back, the closing of #27) in the global settings file?",
              "answer": null,
              "asked": "2026-11-16T06:07:27Z",
              "answered": "2026-11-16T19:23:43Z"
            }
          ]
        },
        {
          "since": "2026-11-16T19:23:43Z",
          "ended": "2026-11-16T19:52:03Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-16T19:50:17Z",
            "note": "S4 reported done; Quality Review next"
          },
          "detail": "The close-out passed: the rewrites' run records (49 files), TrumpBot's rewrite records (29), the 6 earlier records and the untouched backup (22) still equal their lists, and this unit's 9 records are written under their checksum list and verify; the tools are at their pins (96 ok); the earlier tool folder holds 21 of 21 pinned files and the runner its recorded size and hash; the output rule holds over the unit's 370 lines of the run log (STOP 0, WAIT 0, NEXT 0, RECORD 4: the grant's wording, the two of the clone's guards and the graph's expected one), the 2 stored replies and the 2 request files. Only the unit's own 11 runner steps are in its part of the log.",
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "done",
              "rows": [
                "readiness",
                "grant"
              ],
              "brief": "The unit's data file and grant wording are written, the tools are at their pins, the rewrites' records equal their checksum lists, the grant is in place, and the clone passes its guards with its census recorded.",
              "kind": "check",
              "steps": [
                {
                  "id": "S0.unit",
                  "name": "The unit's data file and grant wording",
                  "state": "done",
                  "finished": "2026-11-16T06:04:04Z"
                },
                {
                  "id": "S0.tools",
                  "name": "The tools at their pins",
                  "state": "done",
                  "finished": "2026-11-16T06:04:20Z"
                },
                {
                  "id": "S0.quick",
                  "name": "The quick gate",
                  "state": "done",
                  "finished": "2026-11-16T06:04:36Z"
                },
                {
                  "id": "S0.pins",
                  "name": "The tool versions",
                  "state": "done",
                  "finished": "2026-11-16T06:04:45Z"
                },
                {
                  "id": "S0.records",
                  "name": "The rewrites' records, the backup and the manifest",
                  "state": "done",
                  "finished": "2026-11-16T06:04:59Z"
                },
                {
                  "id": "S0.grant",
                  "name": "The grant read",
                  "state": "done",
                  "finished": "2026-11-16T06:05:08Z"
                },
                {
                  "id": "S0.checks",
                  "name": "The clone's guards",
                  "state": "done",
                  "finished": "2026-11-16T06:05:31Z"
                },
                {
                  "id": "S0.census",
                  "name": "The clone's census recorded",
                  "state": "done",
                  "finished": "2026-11-16T06:05:39Z"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "started": "2026-11-16T04:35:47Z",
              "finished": "2026-11-16T06:05:39Z",
              "report": "Readiness passed: the unit's data file and grant wording written (the run log held 16157 lines before the unit); the tools at their pins (96 ok); the quick gate 63 of 63; the tool versions 7 ok; the rewrites' records, the earlier records, the untouched backup (22 files), the manifest (199 blobs) and the stage-8 marker equal their lists; the grant read with 11 ok and one RECORD (the section holds no Settings line, every action, the issue, the branch, the targets and the end as needed); the clone's guards 17 ok with the two expected RECORD lines and the server's heads at the new column; the census recorded: untracked 59 (carried 4, not carried 55, elsewhere 0), hooks 2, exclude lines 2, config keys 12. One deviation is logged in final-implementation.md: the grant's wording differs by its Settings line.",
              "result": "passed"
            },
            {
              "id": "S1",
              "name": "The replacement",
              "state": "done",
              "rows": [
                "move",
                "carried",
                "fresh-clone"
              ],
              "brief": "The old clone is renamed aside, a fresh clone of the rewritten repository is made at its path with the four carried files restored, and the unit's own reads prove the fresh clone and the old clone aside.",
              "kind": "work",
              "steps": [
                {
                  "id": "S1.request",
                  "name": "The replacement request built and handed off",
                  "state": "done",
                  "finished": "2026-11-16T06:06:41Z"
                },
                {
                  "id": "S1.send",
                  "name": "The request sent",
                  "state": "done",
                  "finished": "2026-11-16T19:23:43Z"
                },
                {
                  "id": "S1.reply",
                  "name": "The reply stored",
                  "state": "done",
                  "finished": "2026-11-16T19:29:17Z"
                },
                {
                  "id": "S1.outcome",
                  "name": "The outcome read",
                  "state": "done",
                  "finished": "2026-11-16T19:29:35Z"
                },
                {
                  "id": "S1.proofs",
                  "name": "The fresh clone proven",
                  "state": "done",
                  "finished": "2026-11-16T19:30:01Z"
                },
                {
                  "id": "S1.carried",
                  "name": "The four restored files read against their checksums",
                  "state": "done",
                  "finished": "2026-11-16T19:30:16Z"
                },
                {
                  "id": "S1.aside",
                  "name": "The old clone read whole at the recorded path",
                  "state": "done",
                  "finished": "2026-11-16T19:30:35Z"
                },
                {
                  "id": "S1.back",
                  "name": "The move back, only after a stop that follows the rename",
                  "steps": [
                    {
                      "id": "S1.back.request",
                      "name": "The move-back request built and handed off"
                    },
                    {
                      "id": "S1.back.send",
                      "name": "The request sent"
                    },
                    {
                      "id": "S1.back.reply",
                      "name": "The reply stored"
                    },
                    {
                      "id": "S1.back.outcome",
                      "name": "The outcome read"
                    },
                    {
                      "id": "S1.back.census",
                      "name": "The old clone's census read at the clone's path"
                    },
                    {
                      "id": "S1.back.checks",
                      "name": "The clone's guards read again"
                    }
                  ]
                }
              ],
              "ref": "plan.md#s1--the-replacement",
              "started": "2026-11-16T06:05:39Z",
              "finished": "2026-11-16T19:30:35Z",
              "report": "The replacement passed: the request ran once and its reply was stored as done (88 printed lines: the 84 of the eight entries and the 4 check sentences the reply carries), OUTCOME complete entries=8 of 8 stops=0 status=done. The unit's own reads: the fresh clone's proofs 18 ok (the old commits and the 199 manifest blobs missing, the untouched backup's control whole, ten local keys, no hook, a comment-only exclude file, no FETCH_HEAD); the four restored files equal their checksums and are the only untracked files, and the same checksums hold for the old clone aside; the old clone aside equals its recorded census (differing lines 0: untracked 59, hooks 2, exclude lines 2, config keys 12). The move back was not needed. A second deviation is logged in final-implementation.md: the reply was saved as a byte-for-byte copy of the delivered file."
            },
            {
              "id": "S2",
              "name": "The deletion",
              "state": "done",
              "rows": [
                "deletion",
                "leftover"
              ],
              "brief": "The old clone is deleted at its recorded path, and no old-clone path remains.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.request",
                  "name": "The deletion request built and handed off",
                  "state": "done",
                  "finished": "2026-11-16T19:31:14Z"
                },
                {
                  "id": "S2.send",
                  "name": "The request sent",
                  "state": "done",
                  "finished": "2026-11-16T19:31:53Z"
                },
                {
                  "id": "S2.reply",
                  "name": "The reply stored",
                  "state": "done",
                  "finished": "2026-11-16T19:36:31Z"
                },
                {
                  "id": "S2.outcome",
                  "name": "The outcome read",
                  "state": "done",
                  "finished": "2026-11-16T19:36:40Z"
                },
                {
                  "id": "S2.gone",
                  "name": "No old-clone path remains",
                  "state": "done",
                  "finished": "2026-11-16T19:36:57Z"
                }
              ],
              "ref": "plan.md#s2--the-deletion",
              "started": "2026-11-16T19:30:35Z",
              "finished": "2026-11-16T19:36:57Z",
              "report": "The deletion ended: the request ran once and its reply was stored as done (16 printed lines), OUTCOME complete entries=3 of 3 stops=0 status=done; the unit's own read finds no old-clone path left and the fresh clone in place (2 ok, STAGE K1.gone OK). A third deviation is logged in final-implementation.md: the deletion request carries the replacement's four check sentences, as the pinned request builder writes one list for every kind; the deletion's own markers all printed."
            },
            {
              "id": "S3",
              "name": "The graph",
              "state": "done",
              "rows": [
                "graph",
                "grant"
              ],
              "brief": "The graph service builds a code-only graph of the fresh clone with its two hooks, and the unit reads the graph and its hooks back.",
              "kind": "work",
              "steps": [
                {
                  "id": "S3.notice",
                  "name": "The graph service told",
                  "state": "done",
                  "finished": "2026-11-16T19:38:03Z"
                },
                {
                  "id": "S3.wait",
                  "name": "The build waited for",
                  "state": "done",
                  "finished": "2026-11-16T19:47:31Z"
                },
                {
                  "id": "S3.graph",
                  "name": "The graph read back",
                  "state": "done",
                  "finished": "2026-11-16T19:47:54Z"
                }
              ],
              "ref": "plan.md#s3--the-graph",
              "started": "2026-11-16T19:36:57Z",
              "finished": "2026-11-16T19:47:54Z",
              "report": "The graph is rebuilt and read back: the first read after the notice waited, and after one wait of 9 minutes the graph file and both hooks were present. The read-back gave 9 ok and the one expected RECORD (one untracked file outside the two folders, the board files' ignore at the root), then STAGE K1.graph OK: the graph's folder exists and holds files, the hooks beyond the samples are exactly the graph's, the exclude file holds the graph's entry, no extra key but at most lfs.repositoryformatversion, the carried files unchanged, the remote-tracking refs at the new column and the old commits and manifest blobs still missing."
            },
            {
              "id": "S4",
              "name": "Close-out",
              "state": "done",
              "rows": [
                "leftover"
              ],
              "brief": "The earlier records and this unit's equal their checksum lists, the tools and the earlier tool folder are at their pins, and the unit's outputs and records hold nothing sensitive.",
              "kind": "check",
              "steps": [
                {
                  "id": "S4.records",
                  "name": "The checksum lists",
                  "state": "done",
                  "finished": "2026-11-16T19:48:22Z"
                },
                {
                  "id": "S4.tools",
                  "name": "The tools at their pins",
                  "state": "done",
                  "finished": "2026-11-16T19:49:10Z"
                },
                {
                  "id": "S4.g26",
                  "name": "The earlier tool folder at its pins",
                  "state": "done",
                  "finished": "2026-11-16T19:49:57Z"
                },
                {
                  "id": "S4.outputs",
                  "name": "The output rule over the unit's outputs",
                  "state": "done",
                  "finished": "2026-11-16T19:50:17Z"
                }
              ],
              "ref": "plan.md#s4--close-out",
              "started": "2026-11-16T19:47:54Z",
              "finished": "2026-11-16T19:50:17Z",
              "report": "The close-out passed: the rewrites' run records (49 files), TrumpBot's rewrite records (29), the 6 earlier records and the untouched backup (22) still equal their lists, and this unit's 9 records are written under their checksum list and verify; the tools are at their pins (96 ok); the earlier tool folder holds 21 of 21 pinned files and the runner its recorded size and hash; the output rule holds over the unit's 370 lines of the run log (STOP 0, WAIT 0, NEXT 0, RECORD 4: the grant's wording, the two of the clone's guards and the graph's expected one), the 2 stored replies and the 2 request files. Only the unit's own 11 runner steps are in its part of the log.",
              "result": "passed"
            }
          ]
        }
      ],
      "qa": [
        {
          "since": "2026-11-16T19:52:03Z",
          "ended": "2026-11-16T20:03:47Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-16T19:52:03Z",
            "note": "Quality Review 1: running"
          },
          "detail": "Quality Review 1 running.",
          "qa": [
            {
              "pass": 1,
              "verdict": "changes-requested",
              "date": "2026-11-16",
              "at": "2026-11-16T20:03:47Z",
              "findings": {
                "test": 0,
                "code": 2
              },
              "severity": {
                "minor": 2,
                "other": 0
              },
              "route": "on-the-spot",
              "note": "Every item the issue asks was verified on the clone; the two fixes are wordings in the as-built record: the replacement reply's stored line count, and the reason the run went on past the request builder's defect.",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/42-clone-replacement/ca070e8d/tests/index.html"
            }
          ]
        }
      ],
      "remediation": [
        {
          "since": "2026-11-16T20:03:47Z",
          "ended": "2026-11-16T20:04:58Z",
          "endedBy": "document",
          "to": "document",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-16T20:04:42Z",
            "note": "2 of 2 sub-steps done"
          },
          "detail": "Both wording fixes are made in the as-built record; no further pass of the quality review is needed.",
          "remediation": {
            "pass": 1,
            "route": "on-the-spot",
            "steps": [
              {
                "name": "State the replacement reply as stored: 88 lines, the procedure's lines and the four check strings",
                "state": "done",
                "finished": "2026-11-16T20:04:42Z",
                "report": "Both wording fixes are made in the as-built record; no further pass of the quality review is needed."
              },
              {
                "name": "Rest the third deviation on the facts of the deletion instead of a reading of the stop rule",
                "state": "done",
                "finished": "2026-11-16T20:04:42Z",
                "report": "Both wording fixes are made in the as-built record; no further pass of the quality review is needed."
              }
            ]
          },
          "qa": [
            {
              "pass": 1,
              "verdict": "changes-requested",
              "date": "2026-11-16",
              "at": "2026-11-16T20:03:47Z",
              "findings": {
                "test": 0,
                "code": 2
              },
              "severity": {
                "minor": 2,
                "other": 0
              },
              "route": "on-the-spot",
              "note": "Every item the issue asks was verified on the clone; the two fixes are wordings in the as-built record: the replacement reply's stored line count, and the reason the run went on past the request builder's defect.",
              "report": "build/reports/tests/index.html",
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/42-clone-replacement/ca070e8d/tests/index.html"
            }
          ]
        }
      ]
    },
    "next": null,
    "qa": [
      {
        "pass": 1,
        "verdict": "changes-requested",
        "date": "2026-11-16",
        "at": "2026-11-16T20:03:47Z",
        "findings": {
          "test": 0,
          "code": 2
        },
        "severity": {
          "minor": 2,
          "other": 0
        },
        "route": "on-the-spot",
        "note": "Every item the issue asks was verified on the clone; the two fixes are wordings in the as-built record: the replacement reply's stored line count, and the reason the run went on past the request builder's defect.",
        "report": "build/reports/tests/index.html",
        "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/27-bottools-trumpbot-support-rewrite/42-clone-replacement/ca070e8d/tests/index.html"
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
    "asked": [
      {
        "step": "implementation",
        "text": "Place the three allow lines for the replacement, the deletion and the move back (and a fourth for closing #27) in the global settings file before the first call?",
        "answer": null,
        "asked": "2026-11-16T04:35:59Z",
        "answered": "2026-11-16T05:57:48Z"
      },
      {
        "step": "implementation",
        "text": "Delete the board files' ignore at the root of the TrumpBot clone, leaving its exclude line, and run no graph job on that checkout until the replacement is complete?",
        "answer": null,
        "asked": "2026-11-16T04:35:59Z",
        "answered": "2026-11-16T05:57:48Z"
      },
      {
        "step": "implementation",
        "text": "Give the word for the code-only graph build of the fresh clone with its two hooks, once the clone is replaced and proven and the old clone deleted?",
        "answer": null,
        "asked": "2026-11-16T04:35:59Z",
        "answered": "2026-11-16T05:57:48Z"
      },
      {
        "step": "implementation",
        "text": "Give the section phase-0-tracking-27-close, so that #27 is closed by request after the landing; otherwise #27 is closed by hand?",
        "options": [
          "Give the section",
          "Close #27 by hand"
        ],
        "answer": null,
        "asked": "2026-11-16T04:35:59Z",
        "answered": "2026-11-16T05:57:48Z"
      },
      {
        "step": "implementation",
        "text": "Place the four checked allow lines (the replacement, the deletion, the move back, the closing of #27) in the global settings file?",
        "answer": null,
        "asked": "2026-11-16T06:07:27Z",
        "answered": "2026-11-16T19:23:43Z"
      }
    ],
    "waits": [
      {
        "step": "implementation",
        "since": "2026-11-16T04:35:59Z",
        "ended": "2026-11-16T05:57:48Z",
        "by": "halted"
      },
      {
        "step": "implementation",
        "since": "2026-11-16T06:07:27Z",
        "ended": "2026-11-16T19:23:43Z",
        "by": "halted"
      }
    ],
    "document": {
      "tasks": [
        {
          "id": "reconcile-plan",
          "name": "Reconcile the plan with the build",
          "state": "done",
          "started": "2026-11-16T20:04:58Z",
          "finished": "2026-11-16T20:13:55Z"
        },
        {
          "id": "readme-changelog",
          "name": "README and CHANGELOG",
          "state": "done",
          "finished": "2026-11-16T20:13:55Z"
        },
        {
          "id": "state-boards",
          "name": "State boards",
          "state": "done",
          "started": "2026-11-16T20:13:55Z",
          "finished": "2026-11-16T20:28:28Z"
        },
        {
          "id": "document-landing",
          "name": "Document commit",
          "state": "done",
          "started": "2026-11-16T20:28:28Z",
          "finished": "2026-11-16T20:32:24Z"
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
      "note": "written on this board when the run started, from #27's research question on moving the old clone aside and its summary, and its architecture's current state of the clone, the volumes, the tools and the request service (§2.2 to §2.5), this unit's design in §10 and its row in §16, with #27's consequences (§2.2, §5, §6); and from the state the earlier units left: the tools unit's clone set and the assumptions it left to this unit's run, and the rewrites' records for TrumpBot"
    },
    {
      "column": "considered",
      "label": "Architecture signed off, in #27's run",
      "date": "2026-11-13",
      "ref": "../architecture.md",
      "note": "the options #27's architecture weighed for this unit: §10, §12, §15, its non-goals in §4 and its risks in §17, with its consequences' §6 for what is left to #28; the unit's own plan adds to them at plan acceptance"
    },
    {
      "column": "verdict",
      "label": "Plan accepted",
      "date": "2026-11-16",
      "ref": "plan.md",
      "note": "five stages: readiness at once, then the replacement and the unit's read of the fresh clone, the deletion at the recorded path, the graph waited for and read back, and a close-out; two requests, a third only after a stop that follows the rename; the owner's asks all given up front, with the removal of the board files' ignore before the census and a second section for closing #27 after the landing; the plan weighs no option beyond the parent design's"
    }
  ],
  "trail": [
    {
      "date": "2026-11-16",
      "column": "gap",
      "label": "Sized; the plan starts"
    },
    {
      "date": "2026-11-16",
      "column": "gap",
      "label": "Nothing to research; the plan next"
    },
    {
      "date": "2026-11-16",
      "column": "verdict",
      "label": "Plan stage: write · re-pass: done — The slice holds against the clone, the rewrites' records, the tools and the request service as they are now, but for one file: the graph service's board files' ignore at the clone's root, which the owner takes out before the unit's census, as the parent design's dated note now says; no question about the intent remains open."
    },
    {
      "date": "2026-11-16",
      "column": "verdict",
      "label": "Plan stage: check/accept · write: done — The draft holds five stages: readiness with the clone's checks and census, the replacement as one request read back by the unit, the deletion as a second request, the graph's build at the owner's word and its read-back, and a close-out, with every expected line taken from the clone set's code and the move back only after a stop that follows the rename."
    },
    {
      "date": "2026-11-16",
      "column": "verdict",
      "label": "Plan stage: write consequences · check/accept: accepted — The check found the plan in line with the clone set's code, the rewrites' records as built and the parent design's section 10, and fixed small points in place: the status line, the rule for a shell beside the clone, a request's attempt number and resend key, and the state a stop before the rename leaves."
    },
    {
      "date": "2026-11-16",
      "column": "verdict",
      "label": "Plan stage: report · write consequences: done — The consequences record that the unit writes nothing to GitHub, that the clone is replaced with its four carried files and its graph rebuilt, that the old clone sits aside on its own volume until its deletion, what the residual report and cleanup takes, and the known gaps of a fresh clone, the rename and the graph build."
    },
    {
      "date": "2026-11-16",
      "column": "verdict",
      "label": "Plan accepted",
      "ref": "plan.md"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Branch `docs/issue-42-replace-trumpbot-clone` cut; implementation starts at S0"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Halted at implementation: waiting on you (The owner's asks before the readiness: the allow lines, the removal of the board files' ignore from the clone, the word for the graph build and the section for closing #27.)"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Resumed at implementation"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "S0 done; S1 current: The replacement"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Halted at implementation: waiting on you (The owner placing the four checked allow lines in the global settings file; the replacement request is built and is sent once they are in.)"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "S1 done; S2 current: The deletion"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "S2 done; S3 current: The graph"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "S3 done; S4 current: Close-out"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Implementation done (5 stages); Quality Review next"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Quality Review 1: running"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Quality Review 1: changes requested, 2 findings (2 minor; 2 code)"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Correction: 2 sub-steps done; every sub-step done"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Document: Reconcile the plan with the build current"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Document: State boards current"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Document: Document commit current"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "Document: every task done"
    }
  ],
  "rows": [
    {
      "id": "readiness",
      "group": "Readiness",
      "name": "Readiness: TrumpBot proven, the clone set at its pins, the read-only checks and the census of the clone",
      "system": "clone-realignment",
      "where": "the clone set's checks and census · the unit's data file, following the rewrites' records",
      "gap": {
        "kind": "missing",
        "summary": "Nothing yet starts the replacement from what the rewrites left. It runs once TrumpBot holds its stage-8 marker and the server's heads equal `ref-map`'s new column, which the rewrites hand on with TrumpBot's maps, manifest and untouched backup; the clone set's checks and census ran only on made-up clones and the self-test's stand-ins, and the real clone was neither read nor touched.",
        "evidence": [
          "`../architecture.md:584` — the unit runs once TrumpBot's push is proven: its stage-8 marker, and the server's heads equal to `ref-map`'s new column",
          "`../40-rewrites/consequences.md:126` — the clone replacement takes TrumpBot's stage-8 marker, its `ref-map` and `commit-map`, its manifest and its untouched backup",
          "`../39-workspace-tools/consequences.md:174` — the census ran on made-up clones only; the clone replacement's census of the real clone is the check",
          "`../39-workspace-tools/consequences.md:175` — the clone checks ran against stand-ins for `stat` and `tasklist`; the clone replacement's checks are the check",
          "`../architecture.md:156` — the preparation unit's clone scripts move the clone into the workspace, archive every file git does not track and stop on its hooks and exclude entry"
        ],
        "source": "../architecture.md §2.3, §5.1, §10; ../40-rewrites/consequences.md §4; ../39-workspace-tools/consequences.md §5",
        "link": "../architecture.md#10-the-clone-replacement"
      },
      "options": [
        {
          "id": "clone-set-readiness",
          "name": "The clone set at its pins, the quick gate run again, then the read-only checks of the clone and its census, recorded, following the rewrites' records read only",
          "verdict": "accepted",
          "why": "The tools unit delivers the clone set for this unit, and each later unit proves the folder equal to its pins first; the checks stop on what would make the move unsafe, while the hooks, the exclude entries and the extra keys are recorded, never stops.",
          "source": "../architecture.md §5.1, §10.1; ../39-workspace-tools/plan.md, The clone set",
          "link": "../39-workspace-tools/plan.md#the-clone-set"
        },
        {
          "id": "preparation-scripts",
          "name": "The preparation unit's clone scripts",
          "verdict": "declined",
          "why": "They move the clone into the workspace, archive every file git does not track, stop on the clone's two hooks and its exclude entry, and reach the private repository through the system's credential helper rather than `gh`; the clone set replaces them and they are never run.",
          "source": "../architecture.md §2.3; ../consequences.md §3",
          "link": "../architecture.md#23-the-workspace-tools-and-records"
        },
        {
          "id": "last-step-of-rewrites",
          "name": "The clone replacement as the last step of the rewrites",
          "verdict": "declined",
          "why": "A stop in the replacement would hold the rewrites' landing and the residual measurement, although neither depends on the clone; its write and its grant are of another kind.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The unit's data file named the rewrites' records, and those records, the preparation unit's earlier TrumpBot records, the untouched backup's 22 files, the manifest's 199 blobs and TrumpBot's stage-8 marker all equalled their lists and counts.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-readiness-s0",
            "excerpt": {
              "ref": "final-implementation.md#31-readiness-s0",
              "heading": "3.1 Readiness (`S0`)",
              "paragraph": "`S0.unit` (typed): one `ok` line; the run log held 16,157 lines before the unit's steps. · `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`. · `S0.quick`, the quick gate (the deterministic tests of the self-test): 63 case lines and `ok gselftest deterministic: 63 checks passed`, status 0, in about 15 seconds. · `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`. · `S0.records` (typed): 7 `ok` lines and `STAGE S0.records OK`: the rewrites' run records (49 files) and TrumpBot's rewrites' records (29 files) equal their lists, the preparation unit's 6 earlier TrumpBot records equal those recorded at …",
              "hash": "d91ff889e5de"
            }
          },
          {
            "text": "The tools held their pins (96 checks), the quick gate passed 63 of 63 and the tool versions were as recorded (7 checks), before anything was requested.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-readiness-s0",
            "excerpt": {
              "ref": "final-implementation.md#31-readiness-s0",
              "heading": "3.1 Readiness (`S0`)",
              "paragraph": "`S0.unit` (typed): one `ok` line; the run log held 16,157 lines before the unit's steps. · `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`. · `S0.quick`, the quick gate (the deterministic tests of the self-test): 63 case lines and `ok gselftest deterministic: 63 checks passed`, status 0, in about 15 seconds. · `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`. · `S0.records` (typed): 7 `ok` lines and `STAGE S0.records OK`: the rewrites' run records (49 files) and TrumpBot's rewrites' records (29 files) equal their lists, the preparation unit's 6 earlier TrumpBot records equal those recorded at …",
              "hash": "d91ff889e5de"
            }
          },
          {
            "text": "The clone's guards passed with 17 checks and the two expected records, the server's heads at `ref-map`'s new column, and the census was recorded before the first request.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-readiness-s0",
            "excerpt": {
              "ref": "final-implementation.md#31-readiness-s0",
              "heading": "3.1 Readiness (`S0`)",
              "paragraph": "`S0.unit` (typed): one `ok` line; the run log held 16,157 lines before the unit's steps. · `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`. · `S0.quick`, the quick gate (the deterministic tests of the self-test): 63 case lines and `ok gselftest deterministic: 63 checks passed`, status 0, in about 15 seconds. · `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`. · `S0.records` (typed): 7 `ok` lines and `STAGE S0.records OK`: the rewrites' run records (49 files) and TrumpBot's rewrites' records (29 files) equal their lists, the preparation unit's 6 earlier TrumpBot records equal those recorded at …",
              "hash": "d91ff889e5de"
            }
          },
          {
            "text": "The census read 59 files git does not track, 4 carried, 55 not carried and none elsewhere, with 2 hooks, 2 exclude lines and 12 local keys: the board files' ignore had been taken out.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-readiness-s0",
            "excerpt": {
              "ref": "final-implementation.md#31-readiness-s0",
              "heading": "3.1 Readiness (`S0`)",
              "paragraph": "`S0.unit` (typed): one `ok` line; the run log held 16,157 lines before the unit's steps. · `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`. · `S0.quick`, the quick gate (the deterministic tests of the self-test): 63 case lines and `ok gselftest deterministic: 63 checks passed`, status 0, in about 15 seconds. · `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`. · `S0.records` (typed): 7 `ok` lines and `STAGE S0.records OK`: the rewrites' run records (49 files) and TrumpBot's rewrites' records (29 files) equal their lists, the preparation unit's 6 earlier TrumpBot records equal those recorded at …",
              "hash": "d91ff889e5de"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The replacement starts from the rewrites' records through the unit's data file, `from=g40`: TrumpBot's stage-8 marker, its maps, its manifest and its untouched backup, each proved against its checksum list or its count.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written to GitHub; everything is a read, a local check or the quick gate. The owner has given the four asks of \"The grant\" before `S0.grant` runs; the other steps do not wait for them except `S0.census`, which stops on `.graphifyignore`.",
              "hash": "ef74b257c34f"
            }
          },
          {
            "text": "The clone set runs at its pins, after the quick gate, before anything is requested.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written to GitHub; everything is a read, a local check or the quick gate. The owner has given the four asks of \"The grant\" before `S0.grant` runs; the other steps do not wait for them except `S0.census`, which stops on `.graphifyignore`.",
              "hash": "ef74b257c34f"
            }
          },
          {
            "text": "The clone's read-only checks and its census are recorded before the first request.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written to GitHub; everything is a read, a local check or the quick gate. The owner has given the four asks of \"The grant\" before `S0.grant` runs; the other steps do not wait for them except `S0.census`, which stops on `.graphifyignore`.",
              "hash": "ef74b257c34f"
            }
          },
          {
            "text": "The census proves the owner took the graph service's board files' ignore out of the clone: 59 files git does not track, none outside the two folders.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written to GitHub; everything is a read, a local check or the quick gate. The owner has given the four asks of \"The grant\" before `S0.grant` runs; the other steps do not wait for them except `S0.census`, which stops on `.graphifyignore`.",
              "hash": "ef74b257c34f"
            }
          }
        ],
        "defense": "The tools stay at the pins the tools unit tested them at, and the rewrites' records are only compared, so readiness changes nothing in the clone: a stop there leaves only the unit's data file, its wording, its scratch folder and the run log's lines, and the census record is written only by a census that passed.",
        "steps": [
          {
            "id": "S0.tools",
            "what": "The unit's data file and the grant's wording written, then the tools at their pins, the quick gate and the tool versions.",
            "check": "96 `ok` lines at the pins, the quick gate's 63 case lines and its total, and `STAGE S0.pins OK`",
            "link": "plan.md#s0--readiness"
          },
          {
            "id": "S0.records",
            "what": "The rewrites' records, the preparation unit's TrumpBot records, the untouched backup and the manifest compared with their lists, read only.",
            "check": "lists of 49, 29, 6 and 22 files equal, 199 manifest blobs, 11 `commit-map` rows, the stage-8 marker, and `STAGE S0.records OK`",
            "link": "plan.md#s0--readiness"
          },
          {
            "id": "S0.checks",
            "what": "The clone's guards read, as the replacement's first entry runs them again.",
            "check": "17 `ok` lines, among them the same volume, no open handle and the server's heads at `ref-map`'s new column, two `RECORD` lines, and `STAGE K1.checks OK`",
            "link": "plan.md#s0--readiness"
          },
          {
            "id": "S0.census",
            "what": "The old clone's census recorded, its closed-set guard proving the board files' ignore removed.",
            "check": "`census: untracked 59 (carried 4, not carried 55, elsewhere 0), hooks 2, exclude lines 2, config keys 12` and `STAGE K1.census OK`",
            "link": "plan.md#s0--readiness"
          }
        ],
        "tests": [
          "gating — `S0.tools` and `S0.pins`, the folder at its pins and the tool versions, and `S0.records` against the earlier records' lists",
          "deterministic — `S0.quick`, the quick gate: 63 case lines and its total",
          "integration — the unit's own reads of the real clone and GitHub at `S0.checks` and `S0.census`; the component and integration kinds of the self-test are not run again, no tool having changed"
        ],
        "risks": [
          "The board files' ignore is back at the clone's root, or a graph job runs before the replacement is complete: the census stops before the rename, nothing has changed, and the step runs again once the cause is removed (assumption A1)",
          "The real clone differs from the shape the tools unit's made-up clones had: a count inside the two folders that differs is recorded, a file outside them stops before the rename (assumption A14)"
        ],
        "source": "plan.md S0 — Readiness; Stops and the state each leaves",
        "link": "plan.md#s0--readiness"
      }
    },
    {
      "id": "move",
      "group": "The replacement",
      "name": "The old clone moved aside by one rename on its own volume",
      "system": "clone-realignment",
      "where": "the TrumpBot clone, renamed to the folder beside it · the replacement procedure's guards and rename",
      "gap": {
        "kind": "risk",
        "summary": "The earlier procedure's move of the clone is no rename on this machine. The clone and the workspace sit on volumes with different device numbers, so a move into the workspace is a copy followed by a deletion, which with one file held open leaves a full copy and a mostly deleted source; and the open-file count alone misses a working directory or a directory handle inside the clone.",
        "evidence": [
          "`../architecture.md:135` — the clone and the workspace on volumes with different device numbers: a move is a copy followed by a deletion",
          "`../architecture.md:199` — a directory rename refuses with no effect while anything inside is open, and cannot cross volumes; across volumes `mv` copies and then removes",
          "`../research/README.md:287` — the open-file probe counts open files only, so a working directory or a directory handle inside the clone scores 0 on it"
        ],
        "source": "../architecture.md §2.2, §2.5; ../research/README.md, Summary §2",
        "link": "../research/clone-move-aside-on-windows.md#31-what-a-move-is-on-windows-and-in-git-bash"
      },
      "options": [
        {
          "id": "rename-aside",
          "name": "One rename beside the clone on its own volume, as the lock probe, behind guards (target absent, same volume, no open file, no git process, the shell outside, the census recorded), in a bounded retry read from whether each of the two paths exists; a stop after it moves the clone back by the same rename",
          "verdict": "accepted",
          "why": "A rename refuses with no effect while anything inside is open, and keeps the tree's access entries; reading the outcome from the two paths, never from `mv`'s status, tells a refusal from a half move, which is a stop and never retried.",
          "source": "../architecture.md §10.2",
          "link": "../architecture.md#102-the-move"
        },
        {
          "id": "move-into-workspace",
          "name": "Moving the old clone into the workspace",
          "verdict": "declined",
          "why": "The workspace is on another volume, so the move is a copy followed by a deletion: no lock probe, a mostly deleted source when a file is held, and the irreversible step first.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The replacement request ran once and completed its eight entries, the rename aside among them, and the old clone aside equalled its recorded census, with 0 differing lines.",
            "state": "as-planned",
            "ref": "final-implementation.md#32-the-replacement-s1",
            "excerpt": {
              "ref": "final-implementation.md#32-the-replacement-s1",
              "heading": "3.2 The replacement (`S1`)",
              "paragraph": "`S1.request` (typed), at 06:06:41Z: `ok request written: requests/replace-TrumpBot.json (key clone-replace-TrumpBot, 8 commands)`, no reply stored before, 8 entries. · `S1.send`: one `replace-clone` request by file, id `SpartanLaboratories-KotlinBottools-42/42/clone-replace-TrumpBot`, attempt · The request service carried it out on that attempt, at about 19:26Z; its own check refused no call. · `S1.reply`: delivered as a file of 4,835 bytes and stored at 19:29:17Z as `ok stored reply 1 for clone-replace-TrumpBot as done (88 printed lines)`: the 84 lines the procedure printed and the 4 check …",
              "hash": "2edb41a6fa8c"
            }
          },
          {
            "text": "The rename ran behind the procedure's guards and succeeded on its first try, with 0 error lines.",
            "state": "as-planned",
            "ref": "final-implementation.md#32-the-replacement-s1",
            "excerpt": {
              "ref": "final-implementation.md#32-the-replacement-s1",
              "heading": "3.2 The replacement (`S1`)",
              "paragraph": "`S1.request` (typed), at 06:06:41Z: `ok request written: requests/replace-TrumpBot.json (key clone-replace-TrumpBot, 8 commands)`, no reply stored before, 8 entries. · `S1.send`: one `replace-clone` request by file, id `SpartanLaboratories-KotlinBottools-42/42/clone-replace-TrumpBot`, attempt · The request service carried it out on that attempt, at about 19:26Z; its own check refused no call. · `S1.reply`: delivered as a file of 4,835 bytes and stored at 19:29:17Z as `ok stored reply 1 for clone-replace-TrumpBot as done (88 printed lines)`: the 84 lines the procedure printed and the 4 check …",
              "hash": "2edb41a6fa8c"
            }
          },
          {
            "text": "The outcome was read as `OUTCOME complete entries=8 of 8 stops=0 status=done`, from the reply stored as 88 lines: the lines the procedure printed and the 4 check strings the request service returned with them, which the plan stores too.",
            "state": "as-planned",
            "ref": "final-implementation.md#32-the-replacement-s1",
            "excerpt": {
              "ref": "final-implementation.md#32-the-replacement-s1",
              "heading": "3.2 The replacement (`S1`)",
              "paragraph": "`S1.request` (typed), at 06:06:41Z: `ok request written: requests/replace-TrumpBot.json (key clone-replace-TrumpBot, 8 commands)`, no reply stored before, 8 entries. · `S1.send`: one `replace-clone` request by file, id `SpartanLaboratories-KotlinBottools-42/42/clone-replace-TrumpBot`, attempt · The request service carried it out on that attempt, at about 19:26Z; its own check refused no call. · `S1.reply`: delivered as a file of 4,835 bytes and stored at 19:29:17Z as `ok stored reply 1 for clone-replace-TrumpBot as done (88 printed lines)`: the 84 lines the procedure printed and the 4 check …",
              "hash": "2edb41a6fa8c"
            }
          },
          {
            "text": "No stop came, so the move back was not needed.",
            "state": "as-planned",
            "ref": "final-implementation.md#32-the-replacement-s1",
            "excerpt": {
              "ref": "final-implementation.md#32-the-replacement-s1",
              "heading": "3.2 The replacement (`S1`)",
              "paragraph": "`S1.request` (typed), at 06:06:41Z: `ok request written: requests/replace-TrumpBot.json (key clone-replace-TrumpBot, 8 commands)`, no reply stored before, 8 entries. · `S1.send`: one `replace-clone` request by file, id `SpartanLaboratories-KotlinBottools-42/42/clone-replace-TrumpBot`, attempt · The request service carried it out on that attempt, at about 19:26Z; its own check refused no call. · `S1.reply`: delivered as a file of 4,835 bytes and stored at 19:29:17Z as `ok stored reply 1 for clone-replace-TrumpBot as done (88 printed lines)`: the 84 lines the procedure printed and the 4 check …",
              "hash": "2edb41a6fa8c"
            }
          }
        ],
        "changes": [
          {
            "what": "The replacement's reply, delivered as a file, was saved as a byte-for-byte copy of that file, compared equal with it (4,835 bytes), and stored from the copy as the plan's block stores it: 88 lines, the lines the procedure printed and the 4 check strings the request service returned with them.",
            "why": "The plan writes the reply text into its scratch file through a quoted heredoc so that nothing in it is expanded or altered, and a copy keeps that; the reply's text was never opened or quoted, and the plan stores a further list of strings a delivered reply carries.",
            "when": "S1",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "link": "../40-rewrites/plan.md#the-push"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The old clone is moved aside by one rename, on its own volume, to the folder `TrumpBot-old` beside the clone, as the lock probe.",
            "ref": "plan.md#risks-and-edge-cases",
            "excerpt": {
              "ref": "plan.md#risks-and-edge-cases",
              "heading": "Risks and edge cases",
              "paragraph": "A process holds something inside the clone. The rename refuses with no effect and the retry (5 tries, 2 seconds apart) outlasts a scanner; the procedure stops with nothing changed, and the class table allows one resend after one wait. The first guards (open files, a running `git.exe`) stop earlier. A rename is never retried after any state but the clean refusal: a second `mv` would move the folder inside the target. · A cross-volume move by accident. The same-volume guard and the absent-target guard come before the rename, and the outcome is read from the two paths, never from `mv`'s status; …",
              "hash": "1dffcaec7ecc"
            }
          },
          {
            "text": "The rename runs behind its guards in a retry of five tries, two seconds apart.",
            "ref": "plan.md#the-units-data-file",
            "excerpt": {
              "ref": "plan.md#the-units-data-file",
              "heading": "The unit's data file",
              "paragraph": "`WS\\tmp\\g27\\units\\g42.txt` is the data file the tools read through `G27_UNIT` (format). `S0.unit` writes it with exactly these lines:",
              "hash": "579ca6de506f"
            }
          },
          {
            "text": "The rename's outcome is read from the two paths, never from its status.",
            "ref": "plan.md#outcome-state-and-resend",
            "excerpt": {
              "ref": "plan.md#outcome-state-and-resend",
              "heading": "Outcome, state and resend",
              "paragraph": "Markers decide first (`outcome`); the state is then read from the two paths, never from the reply. The class table (replacement):",
              "hash": "ab24d1a3323c"
            }
          },
          {
            "text": "A stop that follows the rename is followed by the move back and a hand-back, with no second replacement in the run.",
            "ref": "plan.md#outcome-state-and-resend",
            "excerpt": {
              "ref": "plan.md#outcome-state-and-resend",
              "heading": "Outcome, state and resend",
              "paragraph": "Markers decide first (`outcome`); the state is then read from the two paths, never from the reply. The class table (replacement):",
              "hash": "ab24d1a3323c"
            }
          }
        ],
        "defense": "A rename that refuses changes nothing, and one that succeeds leaves the old clone whole at the folder beside the clone, so every stop before the deletion has the move back; reading the outcome from the two paths tells a clean refusal, the one state a retry follows, from a half move.",
        "steps": [
          {
            "id": "S1.outcome",
            "what": "The replacement request built, sent by the run, its reply stored and its outcome read, then the state read from the two paths.",
            "check": "`OUTCOME complete entries=8 of 8 stops=0 status=done`, the reply holding `MOVED-ASIDE` among its 84 printed lines",
            "link": "plan.md#s1--the-replacement"
          },
          {
            "id": "S1.aside",
            "what": "The old clone read whole at the recorded path, its census compared with the record.",
            "check": "`the census equals the recorded census (differing lines: 0)`, the census line of S0, and `STAGE K1.census OK`",
            "link": "plan.md#s1--the-replacement"
          },
          {
            "id": "S1.back",
            "what": "Only after a stop that follows the rename: the move back requested once, then the census and the guards read again at the clone's path, and a hand-back.",
            "check": "`OUTCOME complete entries=4 of 4 stops=0 status=done`, then the census and the checks",
            "link": "plan.md#outcome-state-and-resend"
          }
        ],
        "tests": [
          "e2e — the real replacement request, its outcome and the state read from the two paths",
          "nonfunctional — the rename's tries, read from the reply, recorded as a reading"
        ],
        "risks": [
          "A process holds something inside the clone: the rename refuses with no effect, the retry of five tries outlasts a scanner, and the class table allows one resend after one wait (assumption A2)",
          "A cross-volume move by accident: the same-volume and absent-target guards come before the rename, so a copy and a mostly deleted source cannot arise (assumption A9)",
          "A second `mv` after any state but the clean refusal would move the folder inside the target: such a state is a stop, never retried"
        ],
        "source": "plan.md The requests; Outcome, state and resend; S1 — The replacement",
        "link": "plan.md#outcome-state-and-resend"
      }
    },
    {
      "id": "carried",
      "group": "The replacement",
      "name": "What is carried: the four `.idea/` files, and nothing else git does not track",
      "system": "clone-realignment",
      "where": "the replacement procedure's archive and restore · the clone's `.idea/` and graph folders",
      "gap": {
        "kind": "risk",
        "summary": "Most of what git does not track in the clone must not reach the fresh one. Of its 60 such files, 4 are under `.idea/`, 55 are a graph built from the pre-rewrite tree, 6 of whose nodes are drawn from two purged files, and one is the graph service's board files' ignore at the root, with a second exclude entry; its local configuration holds two keys a plain clone does not write.",
        "evidence": [
          "`../architecture.md:128` — 59 files git does not track: 4 under `.idea/`, 55 under the graph's folder, built from the pre-rewrite tree",
          "`../architecture.md:630` — the graph service now places its board files' ignore at the root, with an exclude entry: 60 files git does not track and two exclude entries",
          "`../architecture.md:132` — 12 local configuration keys: the ten a plain clone writes, plus `submodule.active` and `lfs.repositoryformatversion`",
          "`../consequences.md:99` — the old graph has 6 of its nodes drawn from two purged files"
        ],
        "source": "../architecture.md §2.2, §10.3 (its dated note of 2026-11-16); ../consequences.md §2.2",
        "link": "../architecture.md#22-the-trumpbot-clone-and-the-two-volumes"
      },
      "options": [
        {
          "id": "four-files",
          "name": "The four `.idea/` files archived with a checksum list behind a closed-set guard over the 59 files, and restored without overwriting; the graph, its exclude entry, its two hooks and the two extra keys recorded by name, size and checksum and not carried",
          "verdict": "accepted",
          "why": "A file outside the two folders would be dropped silently, so it is a stop; the restored set must equal the four-file list byte for byte, and nothing runs the hooks during the replacement.",
          "source": "../architecture.md §10.3, §10.4",
          "link": "../architecture.md#103-what-is-carried-and-what-is-not"
        },
        {
          "id": "carry-graph",
          "name": "Carrying the old clone's graph into the fresh clone",
          "verdict": "declined",
          "why": "The graph was built from the pre-rewrite tree and names files the rewrite removes; a code-only build from the rewritten tree costs no model and installs the hooks.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The four `.idea/` files were archived from the old clone and restored into the fresh clone by the replacement's entries, which completed.",
            "state": "as-planned",
            "ref": "final-implementation.md#32-the-replacement-s1",
            "excerpt": {
              "ref": "final-implementation.md#32-the-replacement-s1",
              "heading": "3.2 The replacement (`S1`)",
              "paragraph": "`S1.request` (typed), at 06:06:41Z: `ok request written: requests/replace-TrumpBot.json (key clone-replace-TrumpBot, 8 commands)`, no reply stored before, 8 entries. · `S1.send`: one `replace-clone` request by file, id `SpartanLaboratories-KotlinBottools-42/42/clone-replace-TrumpBot`, attempt · The request service carried it out on that attempt, at about 19:26Z; its own check refused no call. · `S1.reply`: delivered as a file of 4,835 bytes and stored at 19:29:17Z as `ok stored reply 1 for clone-replace-TrumpBot as done (88 printed lines)`: the 84 lines the procedure printed and the 4 check …",
              "hash": "2edb41a6fa8c"
            }
          },
          {
            "text": "The unit's own read found the four restored files equal to their checksums, and the same checksums held for the four files of the old clone aside.",
            "state": "as-planned",
            "ref": "final-implementation.md#32-the-replacement-s1",
            "excerpt": {
              "ref": "final-implementation.md#32-the-replacement-s1",
              "heading": "3.2 The replacement (`S1`)",
              "paragraph": "`S1.request` (typed), at 06:06:41Z: `ok request written: requests/replace-TrumpBot.json (key clone-replace-TrumpBot, 8 commands)`, no reply stored before, 8 entries. · `S1.send`: one `replace-clone` request by file, id `SpartanLaboratories-KotlinBottools-42/42/clone-replace-TrumpBot`, attempt · The request service carried it out on that attempt, at about 19:26Z; its own check refused no call. · `S1.reply`: delivered as a file of 4,835 bytes and stored at 19:29:17Z as `ok stored reply 1 for clone-replace-TrumpBot as done (88 printed lines)`: the 84 lines the procedure printed and the 4 check …",
              "hash": "2edb41a6fa8c"
            }
          },
          {
            "text": "Nothing else was carried: the four restored files are the fresh clone's only untracked files, beside ten local keys, no hook and an exclude file of comment lines only.",
            "state": "as-planned",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "The plan's further criteria are met as well: the earlier records equal their checksum lists and this unit's records carry theirs (`S0.records` and `S4.records`, §3.1 and §3.5), and no output or record holds a pre-rewrite commit id, a purged blob id or a secret (`S4.outputs`, §3.5). The landing's four document checks run over every pending document before it is committed (plan, The landing's document checks).",
              "hash": "4ed8e5c7fbdc"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The four `.idea/` files are archived with a checksum list behind the closed-set guard and restored without overwriting.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "Goals",
              "hash": "b21642de4483"
            }
          },
          {
            "text": "The unit reads the four restored files against their checksums.",
            "ref": "plan.md#s1--the-replacement",
            "excerpt": {
              "ref": "plan.md#s1--the-replacement",
              "heading": "S1 — The replacement",
              "paragraph": "Starts when `S0` has passed. Nothing of `S1` runs before the owner's four asks are in place.",
              "hash": "55e8cb1d41a4"
            }
          },
          {
            "text": "The old graph, its exclude entries, its hooks, the board files' ignore and the two extra local keys are not carried.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No write to GitHub but the closing of #27 after the landing. No commit to TrumpBot: no `.gitignore`, no README pointer, no archive (Phase 17). · No change to the tools. `tools\\g27` stays at its pins; `tools\\g26`, `k0-ready.sh`, `save-tools.sh` and the runner are never edited, saved or run. · No carrying of the old clone's graph, its exclude entries, its hooks, the board files' ignore or its two extra configuration keys (`lfs.repositoryformatversion`, `submodule.active`) into the fresh clone. · No narrowing of the old clone's access entries while it is aside; a rename widens access by nobody, …",
              "hash": "2195286dc37d"
            }
          }
        ],
        "defense": "The closed-set guard stops on any file outside the two folders, since it would be dropped silently, and the restore refuses to overwrite, so the fresh clone holds exactly the four carried files; the unit checks them against the same list in both clones before it asks for the deletion.",
        "steps": [
          {
            "id": "S1.carried",
            "what": "The four restored files of the fresh clone, and the four of the old clone aside, read against the archive's checksum list.",
            "check": "4 `ok` lines, among them `the 4 restored files of the fresh clone equal their recorded checksums`, and `STAGE S1.carried OK`",
            "link": "plan.md#s1--the-replacement"
          }
        ],
        "tests": [
          "integration — the unit's own read of the restored files at `S1.carried`",
          "e2e — the replacement's `archive` and `restore` entries, `CARRIED-ARCHIVED 4` and `CARRIED-RESTORED 4`"
        ],
        "risks": [
          "A carried file tracked in the rewritten tree: the restore refuses to overwrite and stops, and the old clone, still whole, is moved back; the rewritten `main` holds nothing under `.idea/`",
          "The board files' ignore returns after the build, with its exclude entry: the fresh clone stays clean, and the graph's read-back records it as one difference"
        ],
        "source": "plan.md The requests; S1 — The replacement; Risks and edge cases",
        "link": "plan.md#s1--the-replacement"
      }
    },
    {
      "id": "fresh-clone",
      "group": "Proofs",
      "name": "The fresh clone at the same path, and its proofs",
      "system": "clone-realignment",
      "where": "the TrumpBot clone's path · the replacement procedure's fresh clone, restore and proofs, and the unit's read-back",
      "gap": {
        "kind": "missing",
        "summary": "No clone on this machine is proven free of TrumpBot's old history. Since TrumpBot's push the clone shares no commit with the server's branches; what a fresh clone from GitHub writes into `.git` is known only from a clone of a stand-in repository here, and TrumpBot, being private, needs a credential for the clone.",
        "evidence": [
          "`../40-rewrites/consequences.md:70` — since TrumpBot's push the clone shares no commit with the server's branches; the clone replacement replaces it",
          "`../architecture.md:202` — a plain clone here writes ten local keys, no hook beyond the samples, an exclude file of comment lines only, one pack and no `FETCH_HEAD`",
          "`../consequences.md:213` — what a fresh clone from GitHub writes into `.git` is taken from a stand-in repository's clone",
          "`../architecture.md:632` — the fresh clone made from TrumpBot's URL with `gh` as the only credential helper, the repository being private"
        ],
        "source": "../architecture.md §2.5, §10.4; ../consequences.md §5; ../40-rewrites/consequences.md §2.1",
        "link": "../architecture.md#104-the-fresh-clone-its-proofs-and-the-deletion"
      },
      "options": [
        {
          "id": "proofs-twice",
          "name": "A fresh clone from TrumpBot's URL with `gh` as the only credential helper, proven by the procedure and again by the unit: refs equal to `ref-map`'s new column, one pack and a clean `fsck`, every pre-rewrite commit and manifest blob missing, a plain clone's ten keys, no extra hook, no exclude entry, no `FETCH_HEAD`, and only the four carried files untracked",
          "verdict": "accepted",
          "why": "Each proof is an exact set, so a difference from the stand-in's clone stops the proofs before the old clone is deleted, while the old clone is still whole and can be moved back.",
          "source": "../architecture.md §10.4",
          "link": "../architecture.md#104-the-fresh-clone-its-proofs-and-the-deletion"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "A fresh clone of TrumpBot was made at the clone's path by the replacement's clone entry, which completed.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The TrumpBot clone. `%PROJECTS%\\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to `%PROJECTS%\\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's access entries were left as they were: the rename on its own volume kept them, and nothing changed …",
              "hash": "bc927d422f90"
            }
          },
          {
            "text": "The procedure's proofs passed, and the unit's own read passed its 18 checks: the old commits and the 199 manifest blobs missing, the untouched backup's control whole, ten local keys, no hook, a comment-only exclude file and no `FETCH_HEAD`.",
            "state": "as-planned",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "The plan's further criteria are met as well: the earlier records equal their checksum lists and this unit's records carry theirs (`S0.records` and `S4.records`, §3.1 and §3.5), and no output or record holds a pre-rewrite commit id, a purged blob id or a secret (`S4.outputs`, §3.5). The landing's four document checks run over every pending document before it is committed (plan, The landing's document checks).",
              "hash": "4ed8e5c7fbdc"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The fresh clone of TrumpBot is made at the same path with `gh` as the only credential helper.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "Each of the three procedures is one `replace-clone` request by file. `g27_clone.py build KIND TrumpBot [KEY]` writes `DATA\\run\\g42\\requests\\<kind>-TrumpBot.json` and prints one `ok` line; the request holds six fields:",
              "hash": "600c5361da67"
            }
          },
          {
            "text": "The procedure proves the fresh clone and the unit proves it again: its refs, one pack, a clean `fsck`, every pre-rewrite commit and manifest blob missing, and exactly a plain clone's keys, hooks and exclude file.",
            "ref": "plan.md#s1--the-replacement",
            "excerpt": {
              "ref": "plan.md#s1--the-replacement",
              "heading": "S1 — The replacement",
              "paragraph": "Starts when `S0` has passed. Nothing of `S1` runs before the owner's four asks are in place.",
              "hash": "55e8cb1d41a4"
            }
          }
        ],
        "defense": "The proofs run twice, inside the request and again by the unit's own read, before the deletion is asked for, while the old clone is still whole at its recorded path: a fresh clone that differs from what a plain clone writes here, or that reaches any pre-rewrite object, ends in the move back.",
        "steps": [
          {
            "id": "S1.proofs",
            "what": "The procedure's proofs run again by the unit over the fresh clone.",
            "check": "18 `ok` lines, among them the seven of the removal proof with their controls on the untouched backup, the ten keys, no hook, no `FETCH_HEAD`, and `STAGE K1.proofs OK`",
            "link": "plan.md#s1--the-replacement"
          }
        ],
        "tests": [
          "e2e — the replacement's own `proofs` entry and the unit's read at `S1.proofs`; the last proof again in the graph's read-back",
          "integration — the removal proof's controls: none of the ids is missing from the untouched backup"
        ],
        "risks": [
          "A fresh clone from GitHub writes something else into `.git` than the stand-in clone did, or starts git-lfs: the proofs stop after the rename and the move back is requested (assumptions A4, A5)",
          "The account the request service runs as cannot read the private TrumpBot through `gh`: the clone step stops after the rename, and the move back follows (assumption A7)",
          "TrumpBot's heads move after the fresh clone is made: the proofs stop and the move back is requested (assumption A10)"
        ],
        "source": "plan.md S1 — The replacement; Assumptions; Risks and edge cases",
        "link": "plan.md#s1--the-replacement"
      }
    },
    {
      "id": "deletion",
      "group": "The deletion",
      "name": "The old clone deleted at its recorded path",
      "system": "clone-realignment",
      "where": "the old clone's recorded path · the deletion procedure's guards, removal and check",
      "gap": {
        "kind": "risk",
        "summary": "Once moved aside, the old clone holds every pre-rewrite object of TrumpBot outside the workspace. It keeps the clone's own access entries until it is deleted, and the workspace's deletion never reaches it.",
        "evidence": [
          "`../consequences.md:103` — the old clone sits beside the clone, outside the workspace, with the clone's own access entries and every pre-rewrite object until it is deleted",
          "`../architecture.md:643` — the deletion is requested only after the unit's read-back, at the recorded path, behind guards; its outcome is the path's absence",
          "`../architecture.md:904` — the old clone's objects between the move and the deletion, no wider than today's clone"
        ],
        "source": "../architecture.md §10.4, §17; ../consequences.md §2.2",
        "link": "../architecture.md#104-the-fresh-clone-its-proofs-and-the-deletion"
      },
      "options": [
        {
          "id": "second-request",
          "name": "The deletion as a second request, sent only after the unit's read of the fresh clone, at the recorded path on the clone's volume, behind guards that the path is the recorded one and its census the old clone's, its outcome read from the path's absence",
          "verdict": "accepted",
          "why": "The unit's own read of the fresh clone stands between the last reversible step and the irreversible one, and no old-clone path remaining is this unit's own acceptance.",
          "source": "../architecture.md §10.1, §10.4",
          "link": "../architecture.md#101-shape"
        },
        {
          "id": "one-request",
          "name": "The replacement and the deletion as one request",
          "verdict": "declined",
          "why": "The unit's own read of the fresh clone would come after the irreversible step; two requests put that read between them.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        },
        {
          "id": "workspace-deletion",
          "name": "Leaving the old clone's deletion to the workspace's deletion",
          "verdict": "declined",
          "why": "The old clone is outside the workspace, so that deletion never reaches it, and the pre-rewrite objects would outlive this work on the clone's volume.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The old clone was deleted by the second request, sent once the unit's own reads of the fresh clone and of the old clone aside had passed; it ran once, and its reply was stored as done with 16 printed lines.",
            "state": "as-planned",
            "ref": "final-implementation.md#33-the-deletion-s2",
            "excerpt": {
              "ref": "final-implementation.md#33-the-deletion-s2",
              "heading": "3.3 The deletion (`S2`)",
              "paragraph": "`S2.request` (typed), at 19:31:12Z: `ok request written: requests/delete-TrumpBot.json (key clone-delete-TrumpBot, 3 commands)`. · `S2.send`: id `SpartanLaboratories-KotlinBottools-42/42/clone-delete-TrumpBot`, attempt 1, carried out on that attempt; its own check refused no call. · `S2.reply`: delivered as a file of 2,832 bytes and stored at 19:36:30Z as 16 printed lines: `DELETE-GUARDS-OK`, `rm` with 0 error lines, `OLD-CLONE-REMOVED` and `STAGE K1.gone OK`; no `STOP`. · `S2.outcome` (typed): `OUTCOME complete entries=3 of 3 stops=0 status=done`. · `S2.gone`, at 19:36:54Z: 2 `ok` lines and …",
              "hash": "289f03d54ab8"
            }
          },
          {
            "text": "Its three entries, the guards, the removal at the recorded path and the check, completed: `OUTCOME complete entries=3 of 3 stops=0 status=done`.",
            "state": "as-planned",
            "ref": "final-implementation.md#33-the-deletion-s2",
            "excerpt": {
              "ref": "final-implementation.md#33-the-deletion-s2",
              "heading": "3.3 The deletion (`S2`)",
              "paragraph": "`S2.request` (typed), at 19:31:12Z: `ok request written: requests/delete-TrumpBot.json (key clone-delete-TrumpBot, 3 commands)`. · `S2.send`: id `SpartanLaboratories-KotlinBottools-42/42/clone-delete-TrumpBot`, attempt 1, carried out on that attempt; its own check refused no call. · `S2.reply`: delivered as a file of 2,832 bytes and stored at 19:36:30Z as 16 printed lines: `DELETE-GUARDS-OK`, `rm` with 0 error lines, `OLD-CLONE-REMOVED` and `STAGE K1.gone OK`; no `STOP`. · `S2.outcome` (typed): `OUTCOME complete entries=3 of 3 stops=0 status=done`. · `S2.gone`, at 19:36:54Z: 2 `ok` lines and …",
              "hash": "289f03d54ab8"
            }
          },
          {
            "text": "The unit's own read found no old-clone path left and the fresh clone in place (2 checks and `STAGE K1.gone OK`).",
            "state": "as-planned",
            "ref": "final-implementation.md#33-the-deletion-s2",
            "excerpt": {
              "ref": "final-implementation.md#33-the-deletion-s2",
              "heading": "3.3 The deletion (`S2`)",
              "paragraph": "`S2.request` (typed), at 19:31:12Z: `ok request written: requests/delete-TrumpBot.json (key clone-delete-TrumpBot, 3 commands)`. · `S2.send`: id `SpartanLaboratories-KotlinBottools-42/42/clone-delete-TrumpBot`, attempt 1, carried out on that attempt; its own check refused no call. · `S2.reply`: delivered as a file of 2,832 bytes and stored at 19:36:30Z as 16 printed lines: `DELETE-GUARDS-OK`, `rm` with 0 error lines, `OLD-CLONE-REMOVED` and `STAGE K1.gone OK`; no `STOP`. · `S2.outcome` (typed): `OUTCOME complete entries=3 of 3 stops=0 status=done`. · `S2.gone`, at 19:36:54Z: 2 `ok` lines and …",
              "hash": "289f03d54ab8"
            }
          }
        ],
        "changes": [
          {
            "what": "The deletion request carried the replacement's four check sentences, word for word, in its `checks` field: the clone set's request builder at its pin writes one list for every kind of request. The request service reported the first sentence not applicable as written, and every marker of the deletion's own three entries printed.",
            "why": "The defect showed only in the deletion's reply, after its write: the deletion's markers had all printed and the unit's read that no old-clone path remains had passed before the defect was filed for the tools as #47, no later step uses the request builder, and the markers and the outcome, which decide the deletion, are as the plan specifies. The builder stays at its pin, a correction being a new version of the file under the tools' defect rule.",
            "when": "S2",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "link": "../39-workspace-tools/plan.md#appendix-a--the-tools"
          },
          {
            "what": "The deletion's reply, delivered as a file, was saved as a byte-for-byte copy of that file, compared equal with it (2,832 bytes), and stored from the copy as 16 lines, as the plan's block stores it.",
            "why": "The plan writes the reply text into its scratch file through a quoted heredoc so that nothing in it is expanded or altered, and a copy keeps that; the reply's text was never opened or quoted.",
            "when": "S2",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "link": "../40-rewrites/plan.md#the-push"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The old clone is deleted by a second request, sent only after the unit's own read of the fresh clone.",
            "ref": "plan.md#s2--the-deletion",
            "excerpt": {
              "ref": "plan.md#s2--the-deletion",
              "heading": "S2 — The deletion",
              "paragraph": "Starts when `S1.outcome`, `S1.proofs`, `S1.carried` and `S1.aside` have all passed, and no later than the end of `S1`: the deletion is requested at once and does not wait for the graph.",
              "hash": "82c36636f29a"
            }
          },
          {
            "text": "The deletion runs at the recorded path behind its guards.",
            "ref": "plan.md#s2--the-deletion",
            "excerpt": {
              "ref": "plan.md#s2--the-deletion",
              "heading": "S2 — The deletion",
              "paragraph": "Starts when `S1.outcome`, `S1.proofs`, `S1.carried` and `S1.aside` have all passed, and no later than the end of `S1`: the deletion is requested at once and does not wait for the graph.",
              "hash": "82c36636f29a"
            }
          },
          {
            "text": "The unit reads back that no old-clone path remains.",
            "ref": "plan.md#s2--the-deletion",
            "excerpt": {
              "ref": "plan.md#s2--the-deletion",
              "heading": "S2 — The deletion",
              "paragraph": "Starts when `S1.outcome`, `S1.proofs`, `S1.carried` and `S1.aside` have all passed, and no later than the end of `S1`: the deletion is requested at once and does not wait for the graph.",
              "hash": "82c36636f29a"
            }
          }
        ],
        "defense": "The deletion is the one step that cannot be undone, so it is its own request, sent only after the unit's read of the fresh clone and the old clone aside, and only at the path the move recorded, behind guards that the old clone there is whole and the fresh clone in place.",
        "steps": [
          {
            "id": "S2.outcome",
            "what": "The deletion request built, sent by the run, its reply stored and its outcome read.",
            "check": "`OUTCOME complete entries=3 of 3 stops=0 status=done`, 16 printed lines",
            "link": "plan.md#s2--the-deletion"
          },
          {
            "id": "S2.gone",
            "what": "The unit's own read that no old-clone path remains.",
            "check": "`no old-clone path remains`, `the fresh clone is in place` and `STAGE K1.gone OK`",
            "link": "plan.md#s2--the-deletion"
          }
        ],
        "tests": [
          "e2e — the real deletion request and the unit's read at `S2.gone`"
        ],
        "risks": [
          "The deletion's guards stop: nothing is deleted, and the unit hands back with the state read, the grant sending the deletion again only after a refusal by the request service",
          "The deletion leaves entries at the recorded path: the unit hands back with the path and the count, and does not land while a path remains (assumption A6)"
        ],
        "source": "plan.md S2 — The deletion; Outcome, state and resend",
        "link": "plan.md#s2--the-deletion"
      }
    },
    {
      "id": "graph",
      "group": "The graph",
      "name": "The graph rebuilt from the rewritten tree, and read back",
      "system": "clone-realignment",
      "where": "the fresh clone's graph folder, its two hooks and its exclude entry · the clone set's graph read-back",
      "gap": {
        "kind": "missing",
        "summary": "The fresh clone will have no graph until one is built from the rewritten tree. The old graph and its two hooks are not carried, the build is the graph service's at the owner's word, and what a code-only build leaves is inferred from the old clone's state.",
        "evidence": [
          "`../architecture.md:650` — the build runs once the replacement is complete: the fresh clone proven and the old clone deleted",
          "`../architecture.md:653` — the graph service makes a code-only build from the rewritten tree and installs the two hooks, at the owner's word",
          "`../consequences.md:215` — what the code-only graph build leaves is inferred from the old clone's state; the read-back records what it left"
        ],
        "source": "../architecture.md §10.5; ../consequences.md §5",
        "link": "../architecture.md#105-the-graph-rebuild"
      },
      "options": [
        {
          "id": "code-only-build",
          "name": "A code-only build by the graph service once the replacement is complete, at the owner's word asked for up front, then the unit's read-back: the graph's folder, exactly the two hooks, the one exclude entry, at most `lfs.repositoryformatversion` beside the ten keys, and refs and objects unchanged",
          "verdict": "accepted",
          "why": "The graph then describes the rewritten tree; every difference in the read-back is recorded, and the replacement stands whatever the build left.",
          "source": "../architecture.md §10.5",
          "link": "../architecture.md#105-the-graph-rebuild"
        },
        {
          "id": "graph-before-deletion",
          "name": "The graph build before the old clone's deletion",
          "verdict": "declined",
          "why": "The build waits on another service's lane, and the old clone is no fallback for it, so waiting would only keep the pre-rewrite objects outside the workspace for longer.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The graph service was told once the old clone was deleted; the first read after the notice found the build not yet finished and waited.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-graph-s3",
            "excerpt": {
              "ref": "final-implementation.md#34-the-graph-s3",
              "heading": "3.4 The graph (`S3`)",
              "paragraph": "`S3.notice`: one `status` request to the request service, id `SpartanLaboratories-KotlinBottools-42/42/graph-notice`, after `S2.gone`, carrying the plan's notice. · The build: the graph service's code-only build, no model spent, with its two hooks, from 19:41Z to 19:42Z; 725 nodes, 1,431 edges and 42 communities. · `S3.wait` (typed): one `WAIT` line, one wait of 9 minutes, then `ok the graph's build has finished: graph.json present, both hooks present`. · `S3.graph`, at 19:47:42Z: 9 `ok` lines, the one `RECORD` the plan expects, `RECORD no untracked file lies outside the carried folder and …",
              "hash": "386cc0e8f984"
            }
          },
          {
            "text": "The graph was built and its two hooks installed: after the wait the graph file and both hooks were present.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-graph-s3",
            "excerpt": {
              "ref": "final-implementation.md#34-the-graph-s3",
              "heading": "3.4 The graph (`S3`)",
              "paragraph": "`S3.notice`: one `status` request to the request service, id `SpartanLaboratories-KotlinBottools-42/42/graph-notice`, after `S2.gone`, carrying the plan's notice. · The build: the graph service's code-only build, no model spent, with its two hooks, from 19:41Z to 19:42Z; 725 nodes, 1,431 edges and 42 communities. · `S3.wait` (typed): one `WAIT` line, one wait of 9 minutes, then `ok the graph's build has finished: graph.json present, both hooks present`. · `S3.graph`, at 19:47:42Z: 9 `ok` lines, the one `RECORD` the plan expects, `RECORD no untracked file lies outside the carried folder and …",
              "hash": "386cc0e8f984"
            }
          },
          {
            "text": "The build finished within one wait of 9 minutes, of the 12 the plan allows.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-graph-s3",
            "excerpt": {
              "ref": "final-implementation.md#34-the-graph-s3",
              "heading": "3.4 The graph (`S3`)",
              "paragraph": "`S3.notice`: one `status` request to the request service, id `SpartanLaboratories-KotlinBottools-42/42/graph-notice`, after `S2.gone`, carrying the plan's notice. · The build: the graph service's code-only build, no model spent, with its two hooks, from 19:41Z to 19:42Z; 725 nodes, 1,431 edges and 42 communities. · `S3.wait` (typed): one `WAIT` line, one wait of 9 minutes, then `ok the graph's build has finished: graph.json present, both hooks present`. · `S3.graph`, at 19:47:42Z: 9 `ok` lines, the one `RECORD` the plan expects, `RECORD no untracked file lies outside the carried folder and …",
              "hash": "386cc0e8f984"
            }
          },
          {
            "text": "The read-back gave 9 checks and the one expected record, the board files' ignore at the root, then `STAGE K1.graph OK`: the graph's folder exists and holds files, the hooks beyond the samples are exactly the graph's, the exclude file holds the graph's entry, no extra key but at most `lfs.repositoryformatversion`, the carried files unchanged, the remote-tracking refs at the new column, and the old commits and manifest blobs still missing.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-graph-s3",
            "excerpt": {
              "ref": "final-implementation.md#34-the-graph-s3",
              "heading": "3.4 The graph (`S3`)",
              "paragraph": "`S3.notice`: one `status` request to the request service, id `SpartanLaboratories-KotlinBottools-42/42/graph-notice`, after `S2.gone`, carrying the plan's notice. · The build: the graph service's code-only build, no model spent, with its two hooks, from 19:41Z to 19:42Z; 725 nodes, 1,431 edges and 42 communities. · `S3.wait` (typed): one `WAIT` line, one wait of 9 minutes, then `ok the graph's build has finished: graph.json present, both hooks present`. · `S3.graph`, at 19:47:42Z: 9 `ok` lines, the one `RECORD` the plan expects, `RECORD no untracked file lies outside the carried folder and …",
              "hash": "386cc0e8f984"
            }
          },
          {
            "text": "Nothing was missing, so no build was asked for again.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-graph-s3",
            "excerpt": {
              "ref": "final-implementation.md#34-the-graph-s3",
              "heading": "3.4 The graph (`S3`)",
              "paragraph": "`S3.notice`: one `status` request to the request service, id `SpartanLaboratories-KotlinBottools-42/42/graph-notice`, after `S2.gone`, carrying the plan's notice. · The build: the graph service's code-only build, no model spent, with its two hooks, from 19:41Z to 19:42Z; 725 nodes, 1,431 edges and 42 communities. · `S3.wait` (typed): one `WAIT` line, one wait of 9 minutes, then `ok the graph's build has finished: graph.json present, both hooks present`. · `S3.graph`, at 19:47:42Z: 9 `ok` lines, the one `RECORD` the plan expects, `RECORD no untracked file lies outside the carried folder and …",
              "hash": "386cc0e8f984"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "The run tells the request service once the old clone is deleted.",
            "ref": "plan.md#the-graph",
            "excerpt": {
              "ref": "plan.md#the-graph",
              "heading": "The graph",
              "paragraph": "After `S2.gone`:",
              "hash": "35aca220b85f"
            }
          },
          {
            "text": "The graph service makes the code-only build with its two hooks at the owner's word given up front.",
            "ref": "plan.md#the-graph",
            "excerpt": {
              "ref": "plan.md#the-graph",
              "heading": "The graph",
              "paragraph": "After `S2.gone`:",
              "hash": "35aca220b85f"
            }
          },
          {
            "text": "The unit waits for the build for at most twelve waits of nine minutes.",
            "ref": "plan.md#s3--the-graph",
            "excerpt": {
              "ref": "plan.md#s3--the-graph",
              "heading": "S3 — The graph",
              "paragraph": "Starts when `S2.gone` has passed.",
              "hash": "1d18516b524a"
            }
          },
          {
            "text": "The unit reads the graph and its hooks back, with the board files' ignore as the one difference it records.",
            "ref": "plan.md#s3--the-graph",
            "excerpt": {
              "ref": "plan.md#s3--the-graph",
              "heading": "S3 — The graph",
              "paragraph": "Starts when `S2.gone` has passed.",
              "hash": "1d18516b524a"
            }
          },
          {
            "text": "A graph or hooks the read-back finds missing are asked for again once.",
            "ref": "plan.md#the-graph",
            "excerpt": {
              "ref": "plan.md#the-graph",
              "heading": "The graph",
              "paragraph": "After `S2.gone`:",
              "hash": "35aca220b85f"
            }
          }
        ],
        "defense": "The build is the graph service's, at the owner's word given up front, and it waits for the notice so that no graph job meets the clone during the replacement; the read-back records every difference, and the replacement stands whatever the build leaves.",
        "steps": [
          {
            "id": "S3.wait",
            "what": "The graph service told by one status request, then the build waited for, the clone read after each wait of nine minutes.",
            "check": "`the graph's build has finished: graph.json present, both hooks present`, within 12 waits",
            "link": "plan.md#s3--the-graph"
          },
          {
            "id": "S3.graph",
            "what": "The graph and its hooks read back from the fresh clone.",
            "check": "9 `ok` lines, the one expected `RECORD` for the board files' ignore, and `STAGE K1.graph OK`",
            "link": "plan.md#s3--the-graph"
          }
        ],
        "tests": [
          "integration — the unit's read of the graph service's build at `S3.wait` and `S3.graph`",
          "nonfunctional — the number of waits recorded as a reading"
        ],
        "risks": [
          "The build does not start or does not finish within 12 waits: the unit hands back with a proven fresh clone and no graph, and the build is asked for again (assumption A13)",
          "The build leaves another footprint: each difference is recorded, and a missing graph or hook is asked for again once (assumption A12)"
        ],
        "source": "plan.md The graph; S3 — The graph",
        "link": "plan.md#the-graph"
      }
    },
    {
      "id": "leftover",
      "group": "Left for later",
      "name": "A leftover of the old clone, and #28's confirmation that no old-clone path remains",
      "system": "clone-realignment",
      "where": "the recorded path of the old clone · #28, the residual report and cleanup",
      "gap": {
        "kind": "risk",
        "summary": "A deletion can leave something behind at the old clone's path. The design assumes the account that runs the procedure can delete every file of the old clone, and #28 confirms the recorded path absent at its cleanup.",
        "evidence": [
          "`../architecture.md:226` — if the account cannot delete every file, the deletion leaves a leftover at the recorded path, named in the hand-back and requested again",
          "`../consequences.md:233` — a leftover of the old clone is deleted at its recorded path; #28's cleanup confirms the path absent",
          "`../architecture.md:803` — #28 takes the record that no old-clone path remains, with the recorded path"
        ],
        "source": "../architecture.md §3, §13.4; ../consequences.md §4, §6",
        "link": "../architecture.md#134-28s-inputs"
      },
      "options": [
        {
          "id": "handed-to-28",
          "name": "A leftover named in the hand-back and its deletion requested again at the recorded path; the record that no old-clone path remains, with that path, handed to #28, whose cleanup confirms it",
          "verdict": "accepted",
          "why": "The deletion is never made anywhere but at the recorded path, and the workspace's deletion does not reach it, so the record carries the path to the cleanup.",
          "source": "../architecture.md §11, §13.4; ../consequences.md §6",
          "link": "../consequences.md#6-follow-ups"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "No leftover arose: the deletion left no old-clone path, so none was named in a hand-back.",
            "state": "as-planned",
            "ref": "final-implementation.md#33-the-deletion-s2",
            "excerpt": {
              "ref": "final-implementation.md#33-the-deletion-s2",
              "heading": "3.3 The deletion (`S2`)",
              "paragraph": "`S2.request` (typed), at 19:31:12Z: `ok request written: requests/delete-TrumpBot.json (key clone-delete-TrumpBot, 3 commands)`. · `S2.send`: id `SpartanLaboratories-KotlinBottools-42/42/clone-delete-TrumpBot`, attempt 1, carried out on that attempt; its own check refused no call. · `S2.reply`: delivered as a file of 2,832 bytes and stored at 19:36:30Z as 16 printed lines: `DELETE-GUARDS-OK`, `rm` with 0 error lines, `OLD-CLONE-REMOVED` and `STAGE K1.gone OK`; no `STOP`. · `S2.outcome` (typed): `OUTCOME complete entries=3 of 3 stops=0 status=done`. · `S2.gone`, at 19:36:54Z: 2 `ok` lines and …",
              "hash": "289f03d54ab8"
            }
          },
          {
            "text": "No old-clone path remains, so none holds the landing back.",
            "state": "as-planned",
            "ref": "final-implementation.md#2-acceptance",
            "excerpt": {
              "ref": "final-implementation.md#2-acceptance",
              "heading": "2. Acceptance",
              "paragraph": "The plan's further criteria are met as well: the earlier records equal their checksum lists and this unit's records carry theirs (`S0.records` and `S4.records`, §3.1 and §3.5), and no output or record holds a pre-rewrite commit id, a purged blob id or a secret (`S4.outputs`, §3.5). The landing's four document checks run over every pending document before it is committed (plan, The landing's document checks).",
              "hash": "4ed8e5c7fbdc"
            }
          },
          {
            "text": "At the close-out this unit's 9 records, the recorded path of the old clone among them, were written under their checksum list and verify, for #28; the earlier records still equal their lists, and the output rule held over the unit's 370 lines of the run log with 4 records, the one more than planned being the grant's wording.",
            "state": "as-planned",
            "ref": "final-implementation.md#35-the-close-out-s4-and-the-run-log",
            "excerpt": {
              "ref": "final-implementation.md#35-the-close-out-s4-and-the-run-log",
              "heading": "3.5 The close-out (`S4`) and the run log",
              "paragraph": "`S4.records` (typed): 5 `ok` lines and `STAGE S4.records OK`: the rewrites' run records (49 files), TrumpBot's rewrites' records (29), the preparation unit's 6 earlier records and the untouched backup's 22 files still equal their lists, and `SHA256SUMS`, written at 19:48:21Z, verifies over this unit's 9 records: the 2 request files, the 2 stored replies, the census, the archive with its two lists, and the recorded path. · `S4.tools`, at 19:48:33Z: 96 `ok` lines and `STAGE S0.tools OK`. · `S4.g26` (typed): 3 `ok` lines: 21 of 21 pinned files equal their pins, 22 files in the folder; the 21 …",
              "hash": "4c54d82242a4"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "A leftover at the recorded path is named in the hand-back with its count.",
            "ref": "plan.md#outcome-state-and-resend",
            "excerpt": {
              "ref": "plan.md#outcome-state-and-resend",
              "heading": "Outcome, state and resend",
              "paragraph": "Markers decide first (`outcome`); the state is then read from the two paths, never from the reply. The class table (replacement):",
              "hash": "ab24d1a3323c"
            }
          },
          {
            "text": "The unit does not land while an old-clone path remains.",
            "ref": "plan.md#outcome-state-and-resend",
            "excerpt": {
              "ref": "plan.md#outcome-state-and-resend",
              "heading": "Outcome, state and resend",
              "paragraph": "Markers decide first (`outcome`); the state is then read from the two paths, never from the reply. The class table (replacement):",
              "hash": "ab24d1a3323c"
            }
          },
          {
            "text": "The record that no old-clone path remains, with its recorded path, goes to #28 under the unit's checksum list.",
            "ref": "plan.md#records-and-where-they-live",
            "excerpt": {
              "ref": "plan.md#records-and-where-they-live",
              "heading": "Records and where they live",
              "paragraph": "`DATA\\run\\g42\\` holds the unit's records, and nothing of any other unit's:",
              "hash": "bcbb80e04af3"
            }
          }
        ],
        "defense": "The deletion is never sent a second time, its guards needing the old clone whole, so a leftover is named with its path and count and the unit does not land; the recorded path goes to #28, whose cleanup confirms it absent.",
        "steps": [
          {
            "id": "S4.records",
            "what": "The close-out: the earlier records and this unit's under their checksum lists, the tools and the earlier folder at their pins, and the output rule.",
            "check": "5 `ok` lines for the lists (the unit's own of 9 files), 96 `ok` lines at the pins, and `STAGE S4.outputs OK`",
            "link": "plan.md#s4--close-out"
          }
        ],
        "tests": [
          "gating — `S4.records`, `S4.tools` and `S4.g26`",
          "nonfunctional — `S4.outputs`, the output rule over the unit's part of the run log, its stored replies and its request files"
        ],
        "risks": [
          "A leftover at the recorded path: it is deleted there, as the parent consequences' follow-up says, and the workspace's deletion never reaches that path"
        ],
        "source": "plan.md Outcome, state and resend; Records and where they live; S4 — Close-out",
        "link": "plan.md#records-and-where-they-live"
      }
    },
    {
      "id": "grant",
      "group": "Readiness",
      "name": "The grant for this unit's job, and what is asked up front",
      "system": "clone-realignment",
      "where": "the request service's grant file for KotlinBottools · the action `replace-clone`",
      "gap": {
        "kind": "missing",
        "summary": "No job of this unit has a grant yet. Every change to the TrumpBot checkout is a request carried out under a grant section for the unit's job, and the grant file has no section for it; the request service's own check can refuse a call a section covers, and the graph build needs the owner's word, since the request protocol has no action for it.",
        "evidence": [
          "`../architecture.md:165` — the grant file for this repository is empty: no job has a section",
          "`../architecture.md:717` — the clone replacement's grant: `replace-clone`, its scope, the allow line, and the owner's word for the code-only graph build",
          "`../architecture.md:723` — the allow line per procedure may be placed before its first call, and a restart is needed only if a call is refused with its line in place",
          "`../architecture.md:181` — the graph service builds a graph at the owner's word; the request protocol has no action for it"
        ],
        "source": "../architecture.md §2.4, §12",
        "link": "../architecture.md#12-version-control-and-requests"
      },
      "options": [
        {
          "id": "one-job",
          "name": "One job with its grant section for `replace-clone`, scoped to the sub-issue and branch, the checkout, the old clone's folder and TrumpBot as the source, for the three procedures; the allow lines and the owner's word for the graph build asked for once, up front",
          "verdict": "accepted",
          "why": "Each unit that writes has its own job and its own grant, and everything it needs from the owner is asked once, before it runs; no deny rule is lifted, since no procedure of the unit force-pushes or resets.",
          "source": "../architecture.md §12",
          "link": "../architecture.md#12-version-control-and-requests"
        }
      ],
      "asBuilt": {
        "state": "deviated",
        "summary": null,
        "changes": [
          {
            "what": "The grant section holds every line of the plan's text but its `Settings:` line, which names the three allow lines; readiness recorded the differing wording in place of its twelfth check and went on, so the close-out's output rule counted 4 records where the plan's expected lines count 3.",
            "why": "The plan makes a differing wording a record, never a stop, and every part the check reads (the action, the issue, the branch, the targets, the end) is present.",
            "when": "S0",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "link": "../architecture.md#12-version-control-and-requests"
          }
        ],
        "statements": [
          {
            "text": "The section `phase-0-trumpbot-clone-replacement` was given for `replace-clone` and holds the plan's wording but for its `Settings:` line: readiness read it with 11 checks and recorded the differing wording in place of the twelfth.",
            "state": "deviated",
            "ref": "final-implementation.md#31-readiness-s0",
            "excerpt": {
              "ref": "final-implementation.md#31-readiness-s0",
              "heading": "3.1 Readiness (`S0`)",
              "paragraph": "`S0.unit` (typed): one `ok` line; the run log held 16,157 lines before the unit's steps. · `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`. · `S0.quick`, the quick gate (the deterministic tests of the self-test): 63 case lines and `ok gselftest deterministic: 63 checks passed`, status 0, in about 15 seconds. · `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`. · `S0.records` (typed): 7 `ok` lines and `STAGE S0.records OK`: the rewrites' run records (49 files) and TrumpBot's rewrites' records (29 files) equal their lists, the preparation unit's 6 earlier TrumpBot records equal those recorded at …",
              "hash": "d91ff889e5de"
            }
          },
          {
            "text": "Its action, issue, branch, targets and end were as the unit needs: readiness found each in place.",
            "state": "as-planned",
            "ref": "final-implementation.md#31-readiness-s0",
            "excerpt": {
              "ref": "final-implementation.md#31-readiness-s0",
              "heading": "3.1 Readiness (`S0`)",
              "paragraph": "`S0.unit` (typed): one `ok` line; the run log held 16,157 lines before the unit's steps. · `S0.tools`: 96 `ok` lines and `STAGE S0.tools OK`. · `S0.quick`, the quick gate (the deterministic tests of the self-test): 63 case lines and `ok gselftest deterministic: 63 checks passed`, status 0, in about 15 seconds. · `S0.pins`: 7 `ok` lines and `STAGE S0.pins OK`. · `S0.records` (typed): 7 `ok` lines and `STAGE S0.records OK`: the rewrites' run records (49 files) and TrumpBot's rewrites' records (29 files) equal their lists, the preparation unit's 6 earlier TrumpBot records equal those recorded at …",
              "hash": "d91ff889e5de"
            }
          },
          {
            "text": "The three allow lines were placed by the owner in the global settings file before the replacement request was sent, so each stood before its first call.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The TrumpBot clone. `%PROJECTS%\\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to `%PROJECTS%\\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's access entries were left as they were: the rename on its own volume kept them, and nothing changed …",
              "hash": "bc927d422f90"
            }
          },
          {
            "text": "No call was refused, so the request service did not restart.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The TrumpBot clone. `%PROJECTS%\\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to `%PROJECTS%\\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's access entries were left as they were: the rename on its own volume kept them, and nothing changed …",
              "hash": "bc927d422f90"
            }
          },
          {
            "text": "The owner's word for the graph build stood and the board files' ignore had been taken out before the census, which found no file outside the two folders; the graph was built after the deletion.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The TrumpBot clone. `%PROJECTS%\\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to `%PROJECTS%\\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's access entries were left as they were: the rename on its own volume kept them, and nothing changed …",
              "hash": "bc927d422f90"
            }
          },
          {
            "text": "The section `phase-0-tracking-27-close` was given on 2026-11-16, its allow line placed with the other three, for the closing of #27 once this unit has landed.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The TrumpBot clone. `%PROJECTS%\\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to `%PROJECTS%\\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's access entries were left as they were: the rename on its own volume kept them, and nothing changed …",
              "hash": "bc927d422f90"
            }
          },
          {
            "text": "The section was given, so #27 is closed after the landing by the run's one `close-issue` request, not by hand.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The TrumpBot clone. `%PROJECTS%\\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to `%PROJECTS%\\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's access entries were left as they were: the rename on its own volume kept them, and nothing changed …",
              "hash": "bc927d422f90"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "statements": [
          {
            "text": "One job, `phase-0-trumpbot-clone-replacement`, holds a grant section for `replace-clone`.",
            "ref": "plan.md#the-grant",
            "excerpt": {
              "ref": "plan.md#the-grant",
              "heading": "The grant",
              "paragraph": "Asked of the owner at the request service's console before the unit runs, all together:",
              "hash": "2ad4477023cb"
            }
          },
          {
            "text": "The section's scope names #42 and its branch, the checkout, the old clone's folder and TrumpBot as the clone's source, for the three procedures, and the section ends when #42 lands.",
            "ref": "plan.md#the-grant",
            "excerpt": {
              "ref": "plan.md#the-grant",
              "heading": "The grant",
              "paragraph": "Asked of the owner at the request service's console before the unit runs, all together:",
              "hash": "2ad4477023cb"
            }
          },
          {
            "text": "Three allow lines, one per procedure, are placed in the global settings file before the first call.",
            "ref": "plan.md#the-grant",
            "excerpt": {
              "ref": "plan.md#the-grant",
              "heading": "The grant",
              "paragraph": "Asked of the owner at the request service's console before the unit runs, all together:",
              "hash": "2ad4477023cb"
            }
          },
          {
            "text": "The request service restarts only if a call is refused with its line in place.",
            "ref": "plan.md#the-grant",
            "excerpt": {
              "ref": "plan.md#the-grant",
              "heading": "The grant",
              "paragraph": "Asked of the owner at the request service's console before the unit runs, all together:",
              "hash": "2ad4477023cb"
            }
          },
          {
            "text": "The owner's word for the graph build and the removal of the board files' ignore are asked with the grant, up front.",
            "ref": "plan.md#the-grant",
            "excerpt": {
              "ref": "plan.md#the-grant",
              "heading": "The grant",
              "paragraph": "Asked of the owner at the request service's console before the unit runs, all together:",
              "hash": "2ad4477023cb"
            }
          },
          {
            "text": "A second section, `phase-0-tracking-27-close`, is asked with the grant, so that the run closes #27 after the landing by one `close-issue` request.",
            "ref": "plan.md#the-grant",
            "excerpt": {
              "ref": "plan.md#the-grant",
              "heading": "The grant",
              "paragraph": "Asked of the owner at the request service's console before the unit runs, all together:",
              "hash": "2ad4477023cb"
            }
          },
          {
            "text": "Without that section the owner closes #27 by hand after the landing.",
            "ref": "plan.md#after-the-landing-the-closing-of-27",
            "excerpt": {
              "ref": "plan.md#after-the-landing-the-closing-of-27",
              "heading": "After the landing: the closing of #27",
              "paragraph": "Not a stage of the run and not part of the landing: it follows the merge of this unit's pull request, which closes #42, the last open unit of #27. The run sends one `close-issue` request under the section `phase-0-tracking-27-close` (\"The grant\", item 5). When that section was not given, the owner closes #27 by hand and nothing is sent.",
              "hash": "1b3318a4da49"
            }
          }
        ],
        "defense": "Every change to the clone is a request, carried out under one grant for this unit's job, and everything the owner gives is asked once and together, so no stop for a person falls between the first request and the last; no procedure holds a push, a reset, a force or a credential setting, so no deny rule is lifted.",
        "steps": [
          {
            "id": "S0.grant",
            "what": "The grant section read from the request service's permissions file and compared with the unit's wording.",
            "check": "12 `ok` lines: the section once, its date, the action, the issue, the branch, every target as a whole word, its end line; a differing wording a `RECORD`",
            "link": "plan.md#the-grant"
          },
          {
            "id": "close-27",
            "what": "After the landing, one `close-issue` request under the second section, or the owner's own closing when that section was not given.",
            "check": "the reply's `UNITS-CLOSED`, `TRACKING-OPEN` and `TRACKING-CLOSED`, and #27 read back as `CLOSED COMPLETED`",
            "link": "plan.md#after-the-landing-the-closing-of-27"
          }
        ],
        "tests": [
          "gating — `S0.grant`'s form checks",
          "integration — the first call of each procedure shows whether its allow line is in place: a call the request service's own check refuses is the evidence that it is missing"
        ],
        "risks": [
          "The request service's own check refuses a covered call: nothing has run, the state is read, and with the line in place the service runs the same request again itself, so the unit sends nothing a second time (assumption A11)",
          "A `rejected` reply: the cause is the owner's, and the request is rebuilt under a new key; nothing has run",
          "The section for the closing of #27 is not given: the owner closes #27 by hand after the landing, and no request is sent"
        ],
        "source": "plan.md The grant; After the landing: the closing of #27",
        "link": "plan.md#the-grant"
      }
    },
    {
      "id": "access-kept",
      "group": "Left for later",
      "name": "The old clone's access entries while it is aside, left as they are",
      "system": "clone-realignment",
      "where": "the old clone's folder, between the move and the deletion",
      "gap": {
        "kind": "risk",
        "summary": "The clone's folder is readable by every local user. It inherits the entries of its volume's root, modifiable by every signed-in account, and a rename on the same volume keeps those entries as they are.",
        "evidence": [
          "`../architecture.md:138` — the clone's folder readable by every local user and modifiable by every signed-in account; a rename keeps the entries",
          "`../architecture.md:245` — no narrowing of the old clone's access entries while it is aside: a recursive rewrite of them is not proven safe"
        ],
        "source": "../architecture.md §2.2, §4",
        "link": "../research/clone-move-aside-on-windows.md#32-who-may-read-the-old-clone-afterwards"
      },
      "options": [
        {
          "id": "left-as-they-are",
          "name": "Left as they are: the rename widens access by nobody, and the deletion follows the unit's read-back without waiting for the graph build",
          "verdict": "accepted",
          "why": "The old clone is no wider open than today's clone, and it stays aside no longer than the replacement needs.",
          "source": "../architecture.md §4, §17",
          "link": "../architecture.md#4-non-goals"
        },
        {
          "id": "restricted-folder",
          "name": "A restricted folder on the clone's volume for the old clone",
          "verdict": "declined",
          "why": "A renamed tree keeps its own access entries, and every account may traverse a folder it cannot list, so the folder narrows nothing and adds a folder to remove.",
          "source": "../architecture.md §15",
          "link": "../architecture.md#15-alternatives-considered"
        },
        {
          "id": "rewrite-entries",
          "name": "A recursive rewrite of the old clone's access entries",
          "verdict": "declined",
          "why": "It is not proven safe, and the rename already widens access by nobody.",
          "source": "../architecture.md §4",
          "link": "../architecture.md#4-non-goals"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "statements": [
          {
            "text": "The old clone's access entries were left as they were while it stood aside, about ten minutes: the rename on its own volume kept them, and nothing changed them before the deletion.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The TrumpBot clone. `%PROJECTS%\\TrumpBot` is a fresh clone of the rewritten repository, made by the request service on the replacement request's first attempt, at about 19:26Z, with its four `.idea/` files restored. The old clone was renamed to `%PROJECTS%\\TrumpBot-old` on its own volume at 19:26:32Z, read whole there by the unit, and deleted at that path by the second request, whose reply was stored at 19:36:30Z; at 19:36:54Z no old-clone path remained. While it stood aside, the old clone's access entries were left as they were: the rename on its own volume kept them, and nothing changed …",
              "hash": "bc927d422f90"
            }
          },
          {
            "text": "The deletion was requested once the unit's reads of the fresh clone and of the old clone aside had passed, and the graph's build ran only after it.",
            "state": "as-planned",
            "ref": "final-implementation.md#36-timings",
            "excerpt": {
              "ref": "final-implementation.md#36-timings",
              "heading": "3.6 Timings",
              "paragraph": "`S0` ran from 06:04:15Z to 06:05:39Z, the quick gate in about 15 seconds. · The replacement request was built at 06:06:41Z and carried out at about 19:26Z; its census comparison found the clone as the census had recorded it at 06:05:39Z. · The old clone stood aside from 19:26:32Z until its deletion, whose reply was stored at 19:36:30Z: about ten minutes. · The graph's build ran from 19:41Z to 19:42Z, after the notice that followed `S2.gone` (19:36:54Z); `S3.graph` read it back at 19:47:42Z, and the close-out's last runner step began at 19:48:33Z.",
              "hash": "bf0614f169af"
            }
          }
        ]
      },
      "verdict": {
        "kind": "leave",
        "statements": [
          {
            "text": "The old clone's access entries stay as they are while it is aside: a rename on its own volume widens access by nobody.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No write to GitHub but the closing of #27 after the landing. No commit to TrumpBot: no `.gitignore`, no README pointer, no archive (Phase 17). · No change to the tools. `tools\\g27` stays at its pins; `tools\\g26`, `k0-ready.sh`, `save-tools.sh` and the runner are never edited, saved or run. · No carrying of the old clone's graph, its exclude entries, its hooks, the board files' ignore or its two extra configuration keys (`lfs.repositoryformatversion`, `submodule.active`) into the fresh clone. · No narrowing of the old clone's access entries while it is aside; a rename widens access by nobody, …",
              "hash": "2195286dc37d"
            }
          },
          {
            "text": "The deletion follows the unit's read of the fresh clone without waiting for the graph build.",
            "ref": "plan.md#s2--the-deletion",
            "excerpt": {
              "ref": "plan.md#s2--the-deletion",
              "heading": "S2 — The deletion",
              "paragraph": "Starts when `S1.outcome`, `S1.proofs`, `S1.carried` and `S1.aside` have all passed, and no later than the end of `S1`: the deletion is requested at once and does not wait for the graph.",
              "hash": "82c36636f29a"
            }
          }
        ],
        "defense": "A rename on the clone's own volume keeps the tree's access entries, so the old clone aside is no more readable than the clone was, and the deletion follows as soon as the unit has read the fresh clone back.",
        "risks": [
          "Between the rename and the deletion the old clone keeps every pre-rewrite object of TrumpBot outside the workspace, readable by every local user, as the clone is today"
        ],
        "source": "plan.md Non-goals; Risks and edge cases",
        "link": "plan.md#non-goals"
      }
    }
  ],
  "impact": {
    "basis": "as-built",
    "summary": "No module is published and no version moves: the landing carries documents and generated boards only. On GitHub one issue, #47, was filed during the run for the workspace tools, and #27 is closed after the landing. On this machine the TrumpBot clone was replaced by a fresh clone with its four `.idea/` files, the old clone deleted at its recorded path and the graph rebuilt by the graph service; the request service holds a grant section and four allow lines, each undone when its section ends (`consequences.md` §1 to §4; the known gaps in §5, the follow-ups in §6).",
    "none": null,
    "release": {
      "bump": "none",
      "version": null,
      "note": "no module is published and no version moves",
      "nothingPublished": true
    },
    "downstream": [
      {
        "who": "TrumpBot on GitHub (private)",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "Read only: the fresh clone read it through `gh`, and the guards read its two heads. Its history is the one the rewrites pushed.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "#27 on KotlinBottools' tracker",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "Closed as completed after the landing, by one `close-issue` request under its own section, which the owner gave, behind guards that every unit is closed and #27 open; #28 is then unblocked.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "The TrumpBot clone on this machine",
        "kind": "operator",
        "system": "clone-realignment",
        "effect": "behaviour",
        "summary": "Replaced by a fresh clone of the rewritten repository at the same path, its four `.idea/` files restored and equal to their checksums; the old graph, its exclude entries, its hooks and the two extra keys went with the old clone, which stood aside on its own volume for about ten minutes until its deletion. The board files' ignore was taken out before the census, and the rebuilt graph came with its two hooks, its exclude entry and the ignore with its own entry.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The data folder and the workspace",
        "kind": "operator",
        "system": "clone-realignment",
        "effect": "additive",
        "summary": "The unit's record folder with its 9 records under their checksum list, its data file, its wording, its scratch folder and 370 lines of the run log were added; the earlier records, the manifest, the untouched backup and the tool folders were read only and still equal their lists.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The request service",
        "kind": "operator",
        "system": null,
        "effect": "additive",
        "summary": "At the owner's console: the grant section for this unit's job, without its `Settings:` line, four allow lines, one per procedure and one for closing #27, each in place before its first call, and the section for closing #27; no call was refused, no restart was needed and no deny rule was lifted. Each is undone when its section moves to history.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The graph service",
        "kind": "operator",
        "system": null,
        "effect": "behaviour",
        "summary": "It ran no graph job on the TrumpBot checkout from the owner's word until the run's notice, then built the new graph, code-only with no model spent; the checkout stays one of its checkouts with a graph.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "KotlinBottools' documents and boards",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "The unit's plan, consequences and as-built record, the dated note on the parent design under §10.3, a note in the parent research's verification results, one link line in the parent consequences, and the regenerated boards; no README change and no CHANGELOG entry.",
        "link": "consequences.md#23-documents-and-generated-boards"
      },
      {
        "who": "#47 on KotlinBottools' tracker",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "One issue filed during the run against the workspace tools: the clone set's request builder writes the replacement's check sentences into every kind of request. It is not a unit of #27 and changed no outcome of this unit.",
        "link": "consequences.md#21-github"
      }
    ],
    "adaptation": [
      {
        "who": "The owner",
        "system": null,
        "need": "required",
        "summary": "Before the unit ran, all together: the grant section, the three allow lines and a fourth for closing #27, the word for the graph build and the removal of the board files' ignore, with the section for closing #27 in the same sitting.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "The residual report and cleanup, #28",
        "system": null,
        "need": "required",
        "summary": "It takes the record that no old-clone path remains with its recorded path, whose absence its cleanup confirms, the stored reply of the deletion and the unit's records under their checksum list.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "The tracking issue #27",
        "system": null,
        "need": "required",
        "summary": "Closed once this unit, its last, has landed, by one request under its own section; its consequences gain this unit's link line.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "The residual measurement, #41",
        "system": null,
        "need": "none",
        "summary": "Nothing either way; both units' runner lines share the run log.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md §1 to §6",
    "link": "consequences.md",
    "changes": [
      {
        "entry": "downstream.7",
        "what": "One issue, #47, was filed in KotlinBottools during the run, for the clone set's request builder; the plan wrote nothing to GitHub before the landing.",
        "why": "The deletion request carried the replacement's four check sentences; the defect was filed for the tools once the deletion's own markers had printed and no old-clone path remained, and it changed no outcome (the as-built record, deviation 3).",
        "when": "S2",
        "ref": "final-implementation.md#4-deviations-from-the-plan"
      },
      {
        "entry": "downstream.4",
        "what": "The grant section was given without its `Settings:` line, so it does not itself name the allow lines to remove when it moves to history; the follow-up names them.",
        "why": "The plan makes a differing wording a record, never a stop, and every part the readiness check reads was present (the as-built record, deviation 1).",
        "when": "S0",
        "ref": "final-implementation.md#4-deviations-from-the-plan"
      },
      {
        "entry": "downstream.6",
        "what": "The landing also carries a note in the verification results of the parent research, which the plan's documentation impact did not list.",
        "why": "The research's summary has the clone hold the two hooks and the one exclude entry again after the graph's build; the build also left the board files' ignore with a second exclude entry, which the read-back recorded as its one difference, and the verification results are where the research keeps what a build found against its claims.",
        "when": "Document",
        "ref": "consequences.md#23-documents-and-generated-boards"
      }
    ]
  },
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
  "roadmap": {
    "issue": 27,
    "title": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
    "asOf": "2026-11-16",
    "items": [
      {
        "issue": 39,
        "title": "Phase 0 · 7.1 — Extend the workspace tools for BotTools, TrumpBot and Support",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 40,
        "title": "Phase 0 · 7.2 — Rewrite BotTools, TrumpBot and Support",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
      },
      {
        "issue": 41,
        "title": "Phase 0 · 7.3 — Measure what GitHub still serves of BotTools, TrumpBot and Support",
        "state": "CLOSED",
        "stateReason": "COMPLETED"
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
      "name": "The request service's settings for this job",
      "note": "when the section moves to history as #42 lands, the three allow lines of the replacement, the deletion and the move back are removed from the global settings file, each read back once; the section for closing #27 and its line once #27 is closed"
    },
    {
      "name": "The closing of #27",
      "note": "once this unit has landed, by the run's one request under its own section"
    },
    {
      "issue": 47,
      "title": "Workspace clone tools: the deletion and move-back requests carry the replacement's check sentences",
      "note": "a per-kind check list for the clone set's request builder, in a new version of the pinned file made under the tools' defect rule"
    },
    {
      "issue": 28,
      "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
      "note": "takes the record that no old-clone path remains, with its recorded path, whose absence its cleanup confirms"
    },
    {
      "name": "The credentials",
      "note": "stay the parent consequences' follow-up"
    }
  ],
  "documents": [
    {
      "label": "plan.md",
      "path": "plan.md",
      "note": "the requirements, the shape of the run, the grant and the requests, the class table, the graph, the records, the stops, the procedure S0 to S4 with every expected line, the test plan and the interfaces with the sibling units"
    },
    {
      "label": "consequences.md",
      "path": "consequences.md",
      "note": "the published artifacts (none), the blast radius on GitHub, this machine and the documents, the adoption, the sibling units, the known gaps and the follow-ups"
    },
    {
      "label": "Architecture",
      "path": "../architecture.md",
      "note": "the parent design: unit `clone-replacement`, §10 the clone replacement with its dated note under §10.3, with §2.2, §5.1, §11, §12, §13.4 and §17"
    },
    {
      "label": "#27's research",
      "path": "../research/README.md",
      "note": "the research questions of the parent design, with the verification and the summary"
    },
    {
      "label": "The clone findings",
      "path": "../research/clone-move-aside-on-windows.md",
      "note": "what a move is on this machine, who may read the old clone, what a plain clone writes, the archive of the four files"
    },
    {
      "label": "#27's consequences",
      "path": "../consequences.md",
      "note": "the blast radius, known gaps and follow-ups of the whole of #27, which this unit's consequences do not restate"
    },
    {
      "label": "The workspace tools' plan",
      "path": "../39-workspace-tools/plan.md",
      "note": "the clone set this unit runs: its checks, census, three procedures, proofs and graph read-back"
    },
    {
      "label": "The rewrites' consequences",
      "path": "../40-rewrites/consequences.md",
      "note": "what this unit takes from the rewrites: TrumpBot's stage-8 marker, its maps, manifest and untouched backup"
    }
  ],
  "notes": {
    "corrections": [
      {
        "what": "The Gap of `carried` is corrected in place: at the baseline the clone held 60 files git does not track, not 59, the graph service having placed its board files' ignore at the root, with a second exclude entry, on 2026-11-15, as the parent design's dated note of 2026-11-16 under §10.3 and the plan's current state record; the summary, an evidence line and the source now say so.",
        "when": "2026-11-16"
      },
      {
        "what": "A Quality Review was recorded at 2026-11-16 19:54:22 UTC: The time was replaced by a late arrival reading; 19:52:03Z is the clock reading taken when the pass started. It is recorded at 19:52:03 UTC; the visits it bounds (qa, implementation) and the review's time move with it.",
        "when": "2026-11-16",
        "retime": {
          "event": "qa-pass",
          "from": "2026-11-16T19:54:22Z",
          "to": "2026-11-16T19:52:03Z"
        }
      },
      {
        "what": "The references of two Verdict statements are corrected in place: the first statement of `move` rests on the plan's Risks and edge cases, which hold the rename's refusal while anything inside the clone is open and its same-volume guard, and the first of `carried` on its Requirements, which hold the archive with its checksum list and the restore that overwrites nothing; both cited the plan's section on the requests, which holds only the entries that run the rename, the archive and the restore.",
        "when": "2026-11-16"
      }
    ]
  },
  "issueBoards": {
    "2": "../../dashboard.html",
    "39": "../39-workspace-tools/dashboard.html",
    "40": "../40-rewrites/dashboard.html",
    "41": "../41-residual-measurement/dashboard.html"
  },
  "links": {
    "workBoard": "../../../../index.html",
    "repoBoard": "../../../../../dashboards/index.html"
  }
}
);
