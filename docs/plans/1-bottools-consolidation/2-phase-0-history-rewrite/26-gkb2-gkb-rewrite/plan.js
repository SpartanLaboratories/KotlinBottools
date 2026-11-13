/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 26,
  "slug": "26-gkb2-gkb-rewrite",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite",
  "kind": "issue",
  "title": "Rewrite GKB2 and GKB",
  "issueTitle": "Phase 0 · 6 — Rewrite GKB2 and GKB",
  "function": "GKB2 and GKB, two public repositories, still hold in their histories the files the phase purges: 81 purged blobs in GKB2, 70 of them also reachable through its pull-request ref, and 58 in GKB. This run takes each through the rewrite pipeline, GKB2 first, from the mirror the preparation unit took, checked unchanged: the purge with its checks before and after, the force-push with its dry run and per-ref verification, the exit tests on a fresh mirror, and the residual probes, with GKB2's pull-request residual counted. Unit 6 of #2, with no version moved; both repositories stay public, and GitHub keeps serving their old objects by id.",
  "status": "building",
  "sized": "2026-11-13T02:57:18Z",
  "parent": {
    "issue": 2,
    "board": "../dashboard.html"
  },
  "fixOf": null,
  "branch": "chore/issue-26-rewrite-gkb2-and-gkb",
  "baseline": {
    "ref": "main",
    "sha": "96eba228ddd753f3b176f965c4ffa332f2187369",
    "date": "2026-11-12"
  },
  "asBuilt": null,
  "systems": [
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
    }
  ],
  "wip": {
    "step": "document",
    "since": "2026-11-13T08:15:08Z",
    "updated": "2026-11-13T09:34:35Z",
    "detail": "Document: 6 of 6 tasks done; every task done.",
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
          "inputs-unchanged",
          "tools-handed-on"
        ],
        "brief": "The tools, pins, inputs, grant and both repositories are as recorded, the self-tests pass, and nothing is written yet.",
        "kind": "check",
        "steps": [
          {
            "id": "S0.save",
            "name": "Save the tools",
            "state": "done",
            "finished": "2026-11-13T05:44:07Z"
          },
          {
            "id": "S0.runner",
            "name": "The corrected runner",
            "state": "done",
            "finished": "2026-11-13T05:44:39Z"
          },
          {
            "id": "S0.tools",
            "name": "The tools and the configuration at their recorded bytes",
            "state": "done",
            "finished": "2026-11-13T05:44:56Z"
          },
          {
            "id": "S0.pins",
            "name": "The version pins",
            "state": "done",
            "finished": "2026-11-13T05:45:10Z"
          },
          {
            "id": "S0.inputs",
            "name": "Lists, data copy, mirrors, backups and records",
            "state": "done",
            "finished": "2026-11-13T05:45:23Z"
          },
          {
            "id": "S0.repos",
            "name": "Both repositories read",
            "state": "done",
            "finished": "2026-11-13T05:45:47Z"
          },
          {
            "id": "S0.grant",
            "name": "The grant read",
            "state": "done",
            "finished": "2026-11-13T05:45:58Z"
          },
          {
            "id": "S0.selftest",
            "name": "The self-tests",
            "state": "done",
            "finished": "2026-11-13T05:53:03Z"
          }
        ],
        "ref": "plan.md#s0--readiness",
        "started": "2026-11-13T05:21:49Z",
        "finished": "2026-11-13T05:53:30Z",
        "report": "Readiness passed; nothing was written to GitHub. The 22 tool files were saved from the plan and, with the 21 reused tools, hold their recorded sizes and checksums (46 checks). The corrected runner replaced the first one and holds its new pin. The version pins match (7 checks). The purge lists, mirrors, backups, manifests and the six earlier records of GKB2 and GKB are as recorded (40 checks). Both repositories read from GitHub as recorded (22 checks; activity entries 19 and 9, no events). The grant is in place: eight checks passed, and its wording differs from the plan's text by one further line, which is recorded. The self-test passed 132 checks, its request tool's own 59 among them. One deviation is logged: the grant step prints eight ok lines and one RECORD line where the plan expects seven and one.",
        "result": "passed"
      },
      {
        "id": "S1",
        "name": "GKB2",
        "state": "done",
        "rows": [
          "inputs-unchanged",
          "gkb2-purge",
          "force-push",
          "exit-tests",
          "default-rule-findings",
          "residual-probes"
        ],
        "brief": "GKB2's history is rewritten, force-pushed on request, verified ref by ref and proven clean on a fresh mirror, and what GitHub still serves is measured.",
        "kind": "work",
        "steps": [
          {
            "id": "S1.1",
            "name": "List proof and pre-run checks",
            "state": "done",
            "finished": "2026-11-13T05:54:01Z"
          },
          {
            "id": "S1.2",
            "name": "Positive control on the untouched backup",
            "state": "done",
            "finished": "2026-11-13T05:54:18Z"
          },
          {
            "id": "S1.3",
            "name": "The rewrite",
            "state": "done",
            "finished": "2026-11-13T05:54:30Z"
          },
          {
            "id": "S1.4",
            "name": "Post-run checks and the scan before the push",
            "state": "done",
            "finished": "2026-11-13T05:54:49Z"
          },
          {
            "id": "S1.5",
            "name": "Push preparation",
            "state": "done",
            "finished": "2026-11-13T05:55:02Z"
          },
          {
            "id": "S1.6",
            "name": "The force-push, on request",
            "steps": [
              {
                "id": "S1.6.request",
                "name": "The request read, rebuilt and checked",
                "state": "done",
                "finished": "2026-11-13T05:55:15Z"
              },
              {
                "id": "S1.6.send",
                "name": "The request sent",
                "state": "done",
                "finished": "2026-11-13T05:56:50Z"
              },
              {
                "id": "S1.6.reply",
                "name": "The reply stored",
                "state": "done",
                "finished": "2026-11-13T06:17:13Z"
              },
              {
                "id": "S1.6.check",
                "name": "The outcome classified and read back",
                "state": "done",
                "finished": "2026-11-13T06:17:35Z"
              }
            ],
            "state": "done",
            "finished": "2026-11-13T06:17:35Z"
          },
          {
            "id": "S1.7",
            "name": "Per-ref verification",
            "state": "done",
            "finished": "2026-11-13T06:18:04Z"
          },
          {
            "id": "S1.8",
            "name": "Fresh mirror and exit tests",
            "state": "done",
            "finished": "2026-11-13T06:18:21Z"
          },
          {
            "id": "S1.9",
            "name": "Residual probes",
            "state": "done",
            "finished": "2026-11-13T06:20:43Z"
          }
        ],
        "started": "2026-11-13T05:53:30Z",
        "finished": "2026-11-13T06:21:02Z",
        "report": "GKB2 passed all nine steps. The rewrite turned 32 commits into 30 (2 pruned); the rewritten mirror keeps 82 paths and 211 blobs, the largest 60,756 bytes, and none of the 81 manifest blobs. The control on the untouched backup equalled its record line for line (31 commits scanned, 79 findings), and the scan before the push was clean. The push was one forced update of master under the lease: class pushed, the expected tally in the dry run and in the push, the same ref and flag, and no refusal marker. The request ran under one id as two attempts, the first of which was not carried out and changed nothing. On two channels the server holds 1 rewritten head, no tag and 1 pull-request ref, as recorded. A fresh mirror holds 45 commits on every ref and is clean on branches and tags, with every count equal to its expectation. Through the pull-request ref 70 of the 81 manifest blobs stay reachable (11 missing, 281 distinct blobs on every ref), as predicted, and the scan of every ref reads 66 findings of the five custom rules in that old history. GitHub still serves every old id probed, authenticated and anonymous: 2 commits, 2 trees and 41 of 41 sampled manifest blobs; no answer differed from the expectation. The activity feed lists 18 old ids; 2 of 3 anonymous feed reads were valid, the events listing nothing yet. No default-rule finding. The steps ran as the integration checks against the real repository: 135 checks passed, none failed. Five deviations are logged in the as-built record: the grant step's line count, the wording of the request-written line, two shell error lines at the first request step, the request's two attempts under one id, and the stored form of the reply (its printed lines, one per line)."
      },
      {
        "id": "S2",
        "name": "GKB",
        "state": "done",
        "rows": [
          "inputs-unchanged",
          "gkb-purge",
          "force-push",
          "exit-tests",
          "default-rule-findings",
          "residual-probes"
        ],
        "brief": "The same for GKB, once GKB2 has passed every step.",
        "kind": "work",
        "steps": [
          {
            "id": "S2.1",
            "name": "List proof and pre-run checks",
            "state": "done",
            "finished": "2026-11-13T06:21:29Z"
          },
          {
            "id": "S2.2",
            "name": "Positive control on the untouched backup",
            "state": "done",
            "finished": "2026-11-13T06:21:47Z"
          },
          {
            "id": "S2.3",
            "name": "The rewrite",
            "state": "done",
            "finished": "2026-11-13T06:22:01Z"
          },
          {
            "id": "S2.4",
            "name": "Post-run checks and the scan before the push",
            "state": "done",
            "finished": "2026-11-13T06:22:17Z"
          },
          {
            "id": "S2.5",
            "name": "Push preparation",
            "state": "done",
            "finished": "2026-11-13T06:22:30Z"
          },
          {
            "id": "S2.6",
            "name": "The force-push, on request",
            "steps": [
              {
                "id": "S2.6.request",
                "name": "The request read, rebuilt and checked",
                "state": "done",
                "finished": "2026-11-13T06:22:44Z"
              },
              {
                "id": "S2.6.send",
                "name": "The request sent",
                "state": "done",
                "finished": "2026-11-13T06:23:53Z"
              },
              {
                "id": "S2.6.reply",
                "name": "The reply stored",
                "state": "done",
                "finished": "2026-11-13T06:25:32Z"
              },
              {
                "id": "S2.6.check",
                "name": "The outcome classified and read back",
                "state": "done",
                "finished": "2026-11-13T06:25:44Z"
              }
            ],
            "state": "done",
            "finished": "2026-11-13T06:25:44Z"
          },
          {
            "id": "S2.7",
            "name": "Per-ref verification",
            "state": "done",
            "finished": "2026-11-13T06:26:05Z"
          },
          {
            "id": "S2.8",
            "name": "Fresh mirror and exit tests",
            "state": "done",
            "finished": "2026-11-13T06:26:21Z"
          },
          {
            "id": "S2.9",
            "name": "Residual probes",
            "state": "done",
            "finished": "2026-11-13T06:29:03Z"
          }
        ],
        "started": "2026-11-13T06:21:02Z",
        "finished": "2026-11-13T06:29:37Z",
        "report": "GKB passed all nine steps, started once GKB2 had passed its ninth. The rewrite turned 11 commits into 9 (2 pruned); the rewritten mirror keeps 60 paths and 113 blobs, the largest 60,756 bytes, and none of the 58 manifest blobs. The control on the untouched backup equalled its record line for line (10 commits scanned, 59 findings), and the scan before the push was clean. The push was one forced update of master under the lease, carried out on its first attempt: class pushed, the expected tally in the dry run and in the push, the same ref and flag, and no refusal marker. On two channels the server holds 1 rewritten head, no tag and no pull-request ref, as recorded. A fresh mirror holds 9 commits on every ref and 113 distinct blobs, reaches no manifest blob from any ref, and is clean on branches and tags and on every ref, with every count equal to its expectation. GitHub still serves every old id probed, authenticated and anonymous: 2 commits, 2 trees and 58 of 58 manifest blobs; no answer differed from the expectation. The activity feed lists 9 old ids; 2 of 3 anonymous feed reads were valid, the events listing nothing yet. No default-rule finding. The steps ran as the integration checks against the real repository: 135 checks passed, none failed. No new deviation beyond those already logged: the two shell error lines at the first request step were seen again, and the stored reply is its printed lines, one per line."
      },
      {
        "id": "S3",
        "name": "Close-out",
        "state": "done",
        "rows": [
          "inputs-unchanged",
          "residual-probes"
        ],
        "brief": "Both repositories are read again, and the report rows and records are written with their checksums.",
        "kind": "check",
        "steps": [
          {
            "id": "S3.feeds",
            "name": "The second feed reads",
            "state": "done",
            "finished": "2026-11-13T06:35:11Z"
          },
          {
            "id": "S3.reads",
            "name": "Final reads of both repositories",
            "state": "done",
            "finished": "2026-11-13T06:35:27Z"
          },
          {
            "id": "S3.record",
            "name": "Report rows and checksums",
            "state": "done",
            "finished": "2026-11-13T06:35:39Z"
          }
        ],
        "ref": "plan.md#s3--close-out",
        "started": "2026-11-13T06:29:37Z",
        "finished": "2026-11-13T06:35:55Z",
        "report": "The close-out passed its three steps. The second feed reads, each more than 6 minutes after the first, repeat the first: the activity feed lists 18 old ids for GKB2 and 9 for GKB with 1 current id each, on the authenticated read, the web page and the anonymous read; the events list nothing yet, so 2 of 3 anonymous reads are valid for each repository; the anonymous budget covered both reads without a wait. The final reads show each repository's one branch at its rewritten tip, no tag, the pull-request refs as recorded (1 for GKB2, none for GKB), public, not archived, default branch master, and the six earlier records of each repository unchanged since the readiness stage. Both report rows are completed with the second feed reads, and the checksum lists are written: 40 record files for each repository and 33 run records, each list verifying against its files. Across the unit every count equals its expectation, GKB2's pull-request residual is 70 of 81 manifest blobs as predicted, and no default-rule finding exists in either repository. The close-out's 19 checks passed, none failed. No new deviation.",
        "result": "passed"
      }
    ],
    "remediation": {
      "pass": 2,
      "route": "on-the-spot",
      "steps": [
        {
          "name": "Consequences: three statements corrected, the list of untested paths completed",
          "state": "done",
          "started": "2026-11-13T08:10:40Z",
          "finished": "2026-11-13T08:15:08Z",
          "report": "The consequences now state the classifier's gap as the tool text gives it (a reply with neither status line is read as a refusal by the service under a refused header and as a guard's stop otherwise; after a push that landed the check stops, and after a push that ran and was refused the request could be sent again, with the guards and the lease keeping the remote safe), say that no self-test case reaches the probes' stop on a status outside a route's answers, and give the anonymous budget's real thresholds (28 to 35 completes, 26 or 27 cuts a feed read, 25 or less stops a set). The list of untested paths is completed and says it is not exhaustive, with the rule the next rewrite unit applies. The as-built record lists a tenth departure: each push request was sent as a reference to its file with the file's checksum, and asked for the one-shell run. No tool, mirror or remote changed."
        },
        {
          "name": "The as-built record: the request sent by reference to its file",
          "state": "done",
          "started": "2026-11-13T08:10:40Z",
          "finished": "2026-11-13T08:15:08Z",
          "report": "The consequences now state the classifier's gap as the tool text gives it (a reply with neither status line is read as a refusal by the service under a refused header and as a guard's stop otherwise; after a push that landed the check stops, and after a push that ran and was refused the request could be sent again, with the guards and the lease keeping the remote safe), say that no self-test case reaches the probes' stop on a status outside a route's answers, and give the anonymous budget's real thresholds (28 to 35 completes, 26 or 27 cuts a feed read, 25 or less stops a set). The list of untested paths is completed and says it is not exhaustive, with the rule the next rewrite unit applies. The as-built record lists a tenth departure: each push request was sent as a reference to its file with the file's checksum, and asked for the one-shell run. No tool, mirror or remote changed."
        }
      ]
    },
    "open": [
      {
        "text": "The permission for the two force-pushes is not in place; the readiness stage cannot start without it.",
        "raised": "halted",
        "ref": "plan.md, Design, The grant",
        "shownOpen": "2026-11-13T05:21:49Z",
        "resolved": "2026-11-13T05:42:28Z"
      },
      {
        "text": "The GKB2 push request was not carried out; the branch is unchanged at its old tip, and the request waits to be run again.",
        "raised": "halted",
        "ref": "plan.md, Design, The push",
        "shownOpen": "2026-11-13T06:01:41Z",
        "resolved": "2026-11-13T06:13:26Z"
      },
      {
        "text": "The plan does not say what is stored when a push's reply arrives as one document with its printed lines as list entries; stored as it came, the classifier would misread a successful push as a guard's stop.",
        "raised": "halted",
        "ref": "plan.md, Procedure, Conventions, A request STEP",
        "shownOpen": "2026-11-13T06:16:20Z",
        "resolved": "2026-11-13T06:16:48Z"
      },
      {
        "text": "The first check of the tests and the change asks for changes: entries missing from the as-built record, and gaps and defects in the tools; whether the tool findings are recorded for the next rewrite unit or fixed now is undecided.",
        "raised": "halted",
        "ref": "plan.md, Test plan",
        "shownOpen": "2026-11-13T07:10:24Z",
        "resolved": "2026-11-13T07:26:38Z"
      }
    ],
    "event": {
      "name": "document",
      "at": "2026-11-13T09:34:35Z",
      "note": "6 of 6 tasks done"
    },
    "history": {
      "sizing": [
        {
          "since": null,
          "ended": "2026-11-13T02:57:18Z",
          "endedBy": "sized",
          "to": "plan"
        }
      ],
      "plan": [
        {
          "since": "2026-11-13T02:57:18Z",
          "ended": "2026-11-13T03:14:37Z",
          "endedBy": "research-planning",
          "to": "research",
          "event": {
            "name": "sized",
            "at": "2026-11-13T02:57:18Z"
          },
          "detail": "Unit 6 of the history rewrite: the full pipeline (design §6.4, stages 1 to 9) for GKB2, then GKB, each from its workspace mirror checked unchanged, and the residual-exposure measurement (§6.6), GKB2's pull-request residual included. Baseline: main at 96eba22. The unit lands documents only in this repository and moves no version. Next: the unit's detailed plan, re-validated against the design and the units already landed.",
          "plan": {
            "state": "re-pass",
            "from": "parent",
            "since": "2026-11-13T02:57:18Z"
          }
        },
        {
          "since": "2026-11-13T03:39:56Z",
          "ended": "2026-11-13T05:18:52Z",
          "endedBy": "plan-accepted",
          "to": "branch",
          "event": {
            "name": "researched",
            "at": "2026-11-13T03:39:56Z"
          },
          "detail": "All 27 load-bearing claims hold at source. Each repository's master is pushed by a refspec push with an explicit lease on its old tip, after the guard and a dry run, because git ignores a lease under a mirror push; GitHub's push protection for users can refuse a secret it recognises, and every refusal leaves the remote unchanged and stops the unit.",
          "plan": {
            "state": "writing",
            "since": "2026-11-13T03:39:56Z"
          }
        }
      ],
      "research": [
        {
          "since": "2026-11-13T03:14:37Z",
          "ended": "2026-11-13T03:39:56Z",
          "endedBy": "researched",
          "to": "plan",
          "event": {
            "name": "verification-started",
            "at": "2026-11-13T03:34:43Z"
          },
          "detail": "The 27 load-bearing claims of the force-push findings are being re-opened at their sources.",
          "research": {
            "phase": "complete",
            "drafted": 0,
            "since": {
              "planning": "2026-11-13T03:14:37Z",
              "research": "2026-11-13T03:16:06Z",
              "verification": "2026-11-13T03:34:43Z",
              "complete": "2026-11-13T03:39:56Z"
            }
          },
          "questions": [
            {
              "question": "force-push-and-push-protection",
              "rows": [
                "force-push"
              ],
              "findings": "research/force-push-and-push-protection.md",
              "state": "complete",
              "started": "2026-11-13T03:16:06Z",
              "returned": "2026-11-13T03:33:43Z"
            }
          ]
        }
      ],
      "branch": [
        {
          "since": "2026-11-13T05:18:52Z",
          "ended": "2026-11-13T05:21:49Z",
          "endedBy": "branch-cut",
          "to": "implementation",
          "event": {
            "name": "plan-accepted",
            "at": "2026-11-13T05:18:52Z"
          },
          "detail": "The plan runs the design's nine pipeline stages per repository, GKB2 first and GKB only once GKB2 has passed every step, between a readiness stage that writes nothing and a close-out that reads both repositories again. The push updates the one branch each repository has, bound to its recorded old tip, after a guard and a dry run; a refusal leaves the remote unchanged and stops the unit, and a push is never repeated without a read-back. The stage runner's argument logging is corrected first, and the readiness check takes the current scanner configuration. The parent design still fits; dated notes on its push form are listed for the landing.",
          "branch": "chore/issue-26-rewrite-gkb2-and-gkb"
        }
      ],
      "implementation": [
        {
          "since": "2026-11-13T05:42:28Z",
          "ended": "2026-11-13T06:01:41Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "step-complete",
            "at": "2026-11-13T05:56:50Z"
          },
          "detail": "Readiness passed; nothing was written to GitHub. The 22 tool files were saved from the plan and, with the 21 reused tools, hold their recorded sizes and checksums (46 checks). The corrected runner replaced the first one and holds its new pin. The version pins match (7 checks). The purge lists, mirrors, backups, manifests and the six earlier records of GKB2 and GKB are as recorded (40 checks). Both repositories read from GitHub as recorded (22 checks; activity entries 19 and 9, no events). The grant is in place: eight checks passed, and its wording differs from the plan's text by one further line, which is recorded. The self-test passed 132 checks, its request tool's own 59 among them. One deviation is logged: the grant step prints eight ok lines and one RECORD line where the plan expects seven and one.",
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "done",
              "rows": [
                "inputs-unchanged",
                "tools-handed-on"
              ],
              "brief": "The tools, pins, inputs, grant and both repositories are as recorded, the self-tests pass, and nothing is written yet.",
              "kind": "check",
              "steps": [
                {
                  "id": "S0.save",
                  "name": "Save the tools",
                  "state": "done",
                  "finished": "2026-11-13T05:44:07Z"
                },
                {
                  "id": "S0.runner",
                  "name": "The corrected runner",
                  "state": "done",
                  "finished": "2026-11-13T05:44:39Z"
                },
                {
                  "id": "S0.tools",
                  "name": "The tools and the configuration at their recorded bytes",
                  "state": "done",
                  "finished": "2026-11-13T05:44:56Z"
                },
                {
                  "id": "S0.pins",
                  "name": "The version pins",
                  "state": "done",
                  "finished": "2026-11-13T05:45:10Z"
                },
                {
                  "id": "S0.inputs",
                  "name": "Lists, data copy, mirrors, backups and records",
                  "state": "done",
                  "finished": "2026-11-13T05:45:23Z"
                },
                {
                  "id": "S0.repos",
                  "name": "Both repositories read",
                  "state": "done",
                  "finished": "2026-11-13T05:45:47Z"
                },
                {
                  "id": "S0.grant",
                  "name": "The grant read",
                  "state": "done",
                  "finished": "2026-11-13T05:45:58Z"
                },
                {
                  "id": "S0.selftest",
                  "name": "The self-tests",
                  "state": "done",
                  "finished": "2026-11-13T05:53:03Z"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "started": "2026-11-13T05:21:49Z",
              "finished": "2026-11-13T05:53:30Z",
              "report": "Readiness passed; nothing was written to GitHub. The 22 tool files were saved from the plan and, with the 21 reused tools, hold their recorded sizes and checksums (46 checks). The corrected runner replaced the first one and holds its new pin. The version pins match (7 checks). The purge lists, mirrors, backups, manifests and the six earlier records of GKB2 and GKB are as recorded (40 checks). Both repositories read from GitHub as recorded (22 checks; activity entries 19 and 9, no events). The grant is in place: eight checks passed, and its wording differs from the plan's text by one further line, which is recorded. The self-test passed 132 checks, its request tool's own 59 among them. One deviation is logged: the grant step prints eight ok lines and one RECORD line where the plan expects seven and one.",
              "result": "passed"
            },
            {
              "id": "S1",
              "name": "GKB2",
              "state": "current",
              "rows": [
                "inputs-unchanged",
                "gkb2-purge",
                "force-push",
                "exit-tests",
                "default-rule-findings",
                "residual-probes"
              ],
              "brief": "GKB2's history is rewritten, force-pushed on request, verified ref by ref and proven clean on a fresh mirror, and what GitHub still serves is measured.",
              "kind": "work",
              "steps": [
                {
                  "id": "S1.1",
                  "name": "List proof and pre-run checks",
                  "state": "done",
                  "finished": "2026-11-13T05:54:01Z"
                },
                {
                  "id": "S1.2",
                  "name": "Positive control on the untouched backup",
                  "state": "done",
                  "finished": "2026-11-13T05:54:18Z"
                },
                {
                  "id": "S1.3",
                  "name": "The rewrite",
                  "state": "done",
                  "finished": "2026-11-13T05:54:30Z"
                },
                {
                  "id": "S1.4",
                  "name": "Post-run checks and the scan before the push",
                  "state": "done",
                  "finished": "2026-11-13T05:54:49Z"
                },
                {
                  "id": "S1.5",
                  "name": "Push preparation",
                  "state": "done",
                  "finished": "2026-11-13T05:55:02Z"
                },
                {
                  "id": "S1.6",
                  "name": "The force-push, on request",
                  "steps": [
                    {
                      "id": "S1.6.request",
                      "name": "The request read, rebuilt and checked",
                      "state": "done",
                      "finished": "2026-11-13T05:55:15Z"
                    },
                    {
                      "id": "S1.6.send",
                      "name": "The request sent",
                      "state": "done",
                      "finished": "2026-11-13T05:56:50Z"
                    },
                    {
                      "id": "S1.6.reply",
                      "name": "The reply stored"
                    },
                    {
                      "id": "S1.6.check",
                      "name": "The outcome classified and read back"
                    }
                  ]
                },
                {
                  "id": "S1.7",
                  "name": "Per-ref verification"
                },
                {
                  "id": "S1.8",
                  "name": "Fresh mirror and exit tests"
                },
                {
                  "id": "S1.9",
                  "name": "Residual probes"
                }
              ],
              "started": "2026-11-13T05:53:30Z"
            },
            {
              "id": "S2",
              "name": "GKB",
              "state": "todo",
              "rows": [
                "inputs-unchanged",
                "gkb-purge",
                "force-push",
                "exit-tests",
                "default-rule-findings",
                "residual-probes"
              ],
              "brief": "The same for GKB, once GKB2 has passed every step.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.1",
                  "name": "List proof and pre-run checks"
                },
                {
                  "id": "S2.2",
                  "name": "Positive control on the untouched backup"
                },
                {
                  "id": "S2.3",
                  "name": "The rewrite"
                },
                {
                  "id": "S2.4",
                  "name": "Post-run checks and the scan before the push"
                },
                {
                  "id": "S2.5",
                  "name": "Push preparation"
                },
                {
                  "id": "S2.6",
                  "name": "The force-push, on request",
                  "steps": [
                    {
                      "id": "S2.6.request",
                      "name": "The request read, rebuilt and checked"
                    },
                    {
                      "id": "S2.6.send",
                      "name": "The request sent"
                    },
                    {
                      "id": "S2.6.reply",
                      "name": "The reply stored"
                    },
                    {
                      "id": "S2.6.check",
                      "name": "The outcome classified and read back"
                    }
                  ]
                },
                {
                  "id": "S2.7",
                  "name": "Per-ref verification"
                },
                {
                  "id": "S2.8",
                  "name": "Fresh mirror and exit tests"
                },
                {
                  "id": "S2.9",
                  "name": "Residual probes"
                }
              ]
            },
            {
              "id": "S3",
              "name": "Close-out",
              "state": "todo",
              "rows": [
                "inputs-unchanged",
                "residual-probes"
              ],
              "brief": "Both repositories are read again, and the report rows and records are written with their checksums.",
              "kind": "check",
              "steps": [
                {
                  "id": "S3.feeds",
                  "name": "The second feed reads"
                },
                {
                  "id": "S3.reads",
                  "name": "Final reads of both repositories"
                },
                {
                  "id": "S3.record",
                  "name": "Report rows and checksums"
                }
              ],
              "ref": "plan.md#s3--close-out"
            }
          ],
          "held": true
        },
        {
          "since": "2026-11-13T06:13:26Z",
          "ended": "2026-11-13T06:16:20Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "resumed",
            "at": "2026-11-13T06:13:26Z"
          },
          "detail": "The owner acted, and the same request for GKB2's push is being carried out again; its guards read the server first.",
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "done",
              "rows": [
                "inputs-unchanged",
                "tools-handed-on"
              ],
              "brief": "The tools, pins, inputs, grant and both repositories are as recorded, the self-tests pass, and nothing is written yet.",
              "kind": "check",
              "steps": [
                {
                  "id": "S0.save",
                  "name": "Save the tools",
                  "state": "done",
                  "finished": "2026-11-13T05:44:07Z"
                },
                {
                  "id": "S0.runner",
                  "name": "The corrected runner",
                  "state": "done",
                  "finished": "2026-11-13T05:44:39Z"
                },
                {
                  "id": "S0.tools",
                  "name": "The tools and the configuration at their recorded bytes",
                  "state": "done",
                  "finished": "2026-11-13T05:44:56Z"
                },
                {
                  "id": "S0.pins",
                  "name": "The version pins",
                  "state": "done",
                  "finished": "2026-11-13T05:45:10Z"
                },
                {
                  "id": "S0.inputs",
                  "name": "Lists, data copy, mirrors, backups and records",
                  "state": "done",
                  "finished": "2026-11-13T05:45:23Z"
                },
                {
                  "id": "S0.repos",
                  "name": "Both repositories read",
                  "state": "done",
                  "finished": "2026-11-13T05:45:47Z"
                },
                {
                  "id": "S0.grant",
                  "name": "The grant read",
                  "state": "done",
                  "finished": "2026-11-13T05:45:58Z"
                },
                {
                  "id": "S0.selftest",
                  "name": "The self-tests",
                  "state": "done",
                  "finished": "2026-11-13T05:53:03Z"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "started": "2026-11-13T05:21:49Z",
              "finished": "2026-11-13T05:53:30Z",
              "report": "Readiness passed; nothing was written to GitHub. The 22 tool files were saved from the plan and, with the 21 reused tools, hold their recorded sizes and checksums (46 checks). The corrected runner replaced the first one and holds its new pin. The version pins match (7 checks). The purge lists, mirrors, backups, manifests and the six earlier records of GKB2 and GKB are as recorded (40 checks). Both repositories read from GitHub as recorded (22 checks; activity entries 19 and 9, no events). The grant is in place: eight checks passed, and its wording differs from the plan's text by one further line, which is recorded. The self-test passed 132 checks, its request tool's own 59 among them. One deviation is logged: the grant step prints eight ok lines and one RECORD line where the plan expects seven and one.",
              "result": "passed"
            },
            {
              "id": "S1",
              "name": "GKB2",
              "state": "current",
              "rows": [
                "inputs-unchanged",
                "gkb2-purge",
                "force-push",
                "exit-tests",
                "default-rule-findings",
                "residual-probes"
              ],
              "brief": "GKB2's history is rewritten, force-pushed on request, verified ref by ref and proven clean on a fresh mirror, and what GitHub still serves is measured.",
              "kind": "work",
              "steps": [
                {
                  "id": "S1.1",
                  "name": "List proof and pre-run checks",
                  "state": "done",
                  "finished": "2026-11-13T05:54:01Z"
                },
                {
                  "id": "S1.2",
                  "name": "Positive control on the untouched backup",
                  "state": "done",
                  "finished": "2026-11-13T05:54:18Z"
                },
                {
                  "id": "S1.3",
                  "name": "The rewrite",
                  "state": "done",
                  "finished": "2026-11-13T05:54:30Z"
                },
                {
                  "id": "S1.4",
                  "name": "Post-run checks and the scan before the push",
                  "state": "done",
                  "finished": "2026-11-13T05:54:49Z"
                },
                {
                  "id": "S1.5",
                  "name": "Push preparation",
                  "state": "done",
                  "finished": "2026-11-13T05:55:02Z"
                },
                {
                  "id": "S1.6",
                  "name": "The force-push, on request",
                  "steps": [
                    {
                      "id": "S1.6.request",
                      "name": "The request read, rebuilt and checked",
                      "state": "done",
                      "finished": "2026-11-13T05:55:15Z"
                    },
                    {
                      "id": "S1.6.send",
                      "name": "The request sent",
                      "state": "done",
                      "finished": "2026-11-13T05:56:50Z"
                    },
                    {
                      "id": "S1.6.reply",
                      "name": "The reply stored"
                    },
                    {
                      "id": "S1.6.check",
                      "name": "The outcome classified and read back"
                    }
                  ]
                },
                {
                  "id": "S1.7",
                  "name": "Per-ref verification"
                },
                {
                  "id": "S1.8",
                  "name": "Fresh mirror and exit tests"
                },
                {
                  "id": "S1.9",
                  "name": "Residual probes"
                }
              ],
              "started": "2026-11-13T05:53:30Z"
            },
            {
              "id": "S2",
              "name": "GKB",
              "state": "todo",
              "rows": [
                "inputs-unchanged",
                "gkb-purge",
                "force-push",
                "exit-tests",
                "default-rule-findings",
                "residual-probes"
              ],
              "brief": "The same for GKB, once GKB2 has passed every step.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.1",
                  "name": "List proof and pre-run checks"
                },
                {
                  "id": "S2.2",
                  "name": "Positive control on the untouched backup"
                },
                {
                  "id": "S2.3",
                  "name": "The rewrite"
                },
                {
                  "id": "S2.4",
                  "name": "Post-run checks and the scan before the push"
                },
                {
                  "id": "S2.5",
                  "name": "Push preparation"
                },
                {
                  "id": "S2.6",
                  "name": "The force-push, on request",
                  "steps": [
                    {
                      "id": "S2.6.request",
                      "name": "The request read, rebuilt and checked"
                    },
                    {
                      "id": "S2.6.send",
                      "name": "The request sent"
                    },
                    {
                      "id": "S2.6.reply",
                      "name": "The reply stored"
                    },
                    {
                      "id": "S2.6.check",
                      "name": "The outcome classified and read back"
                    }
                  ]
                },
                {
                  "id": "S2.7",
                  "name": "Per-ref verification"
                },
                {
                  "id": "S2.8",
                  "name": "Fresh mirror and exit tests"
                },
                {
                  "id": "S2.9",
                  "name": "Residual probes"
                }
              ]
            },
            {
              "id": "S3",
              "name": "Close-out",
              "state": "todo",
              "rows": [
                "inputs-unchanged",
                "residual-probes"
              ],
              "brief": "Both repositories are read again, and the report rows and records are written with their checksums.",
              "kind": "check",
              "steps": [
                {
                  "id": "S3.feeds",
                  "name": "The second feed reads"
                },
                {
                  "id": "S3.reads",
                  "name": "Final reads of both repositories"
                },
                {
                  "id": "S3.record",
                  "name": "Report rows and checksums"
                }
              ],
              "ref": "plan.md#s3--close-out"
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "GKB2's push succeeded, but its reply arrived as one document holding the printed lines as list entries, and the plan's classifier reads status lines only at the start of a line. In which form is the reply stored, for GKB2 and for GKB?",
              "options": [
                "Store the printed lines alone, one per line, in order (tried on a scratch copy: classified as pushed)",
                "Store the reply as it came, followed by the printed lines one per line (tried on a scratch copy first)",
                "Settle the form in the plan first, then store",
                "Stop the unit here as it stands"
              ],
              "answer": null,
              "asked": "2026-11-13T06:16:20Z",
              "answered": "2026-11-13T06:16:48Z"
            }
          ]
        },
        {
          "since": "2026-11-13T06:16:48Z",
          "ended": "2026-11-13T06:37:05Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-13T06:35:55Z",
            "note": "S3 reported done; Quality Review next"
          },
          "detail": "The close-out passed its three steps. The second feed reads, each more than 6 minutes after the first, repeat the first: the activity feed lists 18 old ids for GKB2 and 9 for GKB with 1 current id each, on the authenticated read, the web page and the anonymous read; the events list nothing yet, so 2 of 3 anonymous reads are valid for each repository; the anonymous budget covered both reads without a wait. The final reads show each repository's one branch at its rewritten tip, no tag, the pull-request refs as recorded (1 for GKB2, none for GKB), public, not archived, default branch master, and the six earlier records of each repository unchanged since the readiness stage. Both report rows are completed with the second feed reads, and the checksum lists are written: 40 record files for each repository and 33 run records, each list verifying against its files. Across the unit every count equals its expectation, GKB2's pull-request residual is 70 of 81 manifest blobs as predicted, and no default-rule finding exists in either repository. The close-out's 19 checks passed, none failed. No new deviation.",
          "stages": [
            {
              "id": "S0",
              "name": "Readiness",
              "state": "done",
              "rows": [
                "inputs-unchanged",
                "tools-handed-on"
              ],
              "brief": "The tools, pins, inputs, grant and both repositories are as recorded, the self-tests pass, and nothing is written yet.",
              "kind": "check",
              "steps": [
                {
                  "id": "S0.save",
                  "name": "Save the tools",
                  "state": "done",
                  "finished": "2026-11-13T05:44:07Z"
                },
                {
                  "id": "S0.runner",
                  "name": "The corrected runner",
                  "state": "done",
                  "finished": "2026-11-13T05:44:39Z"
                },
                {
                  "id": "S0.tools",
                  "name": "The tools and the configuration at their recorded bytes",
                  "state": "done",
                  "finished": "2026-11-13T05:44:56Z"
                },
                {
                  "id": "S0.pins",
                  "name": "The version pins",
                  "state": "done",
                  "finished": "2026-11-13T05:45:10Z"
                },
                {
                  "id": "S0.inputs",
                  "name": "Lists, data copy, mirrors, backups and records",
                  "state": "done",
                  "finished": "2026-11-13T05:45:23Z"
                },
                {
                  "id": "S0.repos",
                  "name": "Both repositories read",
                  "state": "done",
                  "finished": "2026-11-13T05:45:47Z"
                },
                {
                  "id": "S0.grant",
                  "name": "The grant read",
                  "state": "done",
                  "finished": "2026-11-13T05:45:58Z"
                },
                {
                  "id": "S0.selftest",
                  "name": "The self-tests",
                  "state": "done",
                  "finished": "2026-11-13T05:53:03Z"
                }
              ],
              "ref": "plan.md#s0--readiness",
              "started": "2026-11-13T05:21:49Z",
              "finished": "2026-11-13T05:53:30Z",
              "report": "Readiness passed; nothing was written to GitHub. The 22 tool files were saved from the plan and, with the 21 reused tools, hold their recorded sizes and checksums (46 checks). The corrected runner replaced the first one and holds its new pin. The version pins match (7 checks). The purge lists, mirrors, backups, manifests and the six earlier records of GKB2 and GKB are as recorded (40 checks). Both repositories read from GitHub as recorded (22 checks; activity entries 19 and 9, no events). The grant is in place: eight checks passed, and its wording differs from the plan's text by one further line, which is recorded. The self-test passed 132 checks, its request tool's own 59 among them. One deviation is logged: the grant step prints eight ok lines and one RECORD line where the plan expects seven and one.",
              "result": "passed"
            },
            {
              "id": "S1",
              "name": "GKB2",
              "state": "done",
              "rows": [
                "inputs-unchanged",
                "gkb2-purge",
                "force-push",
                "exit-tests",
                "default-rule-findings",
                "residual-probes"
              ],
              "brief": "GKB2's history is rewritten, force-pushed on request, verified ref by ref and proven clean on a fresh mirror, and what GitHub still serves is measured.",
              "kind": "work",
              "steps": [
                {
                  "id": "S1.1",
                  "name": "List proof and pre-run checks",
                  "state": "done",
                  "finished": "2026-11-13T05:54:01Z"
                },
                {
                  "id": "S1.2",
                  "name": "Positive control on the untouched backup",
                  "state": "done",
                  "finished": "2026-11-13T05:54:18Z"
                },
                {
                  "id": "S1.3",
                  "name": "The rewrite",
                  "state": "done",
                  "finished": "2026-11-13T05:54:30Z"
                },
                {
                  "id": "S1.4",
                  "name": "Post-run checks and the scan before the push",
                  "state": "done",
                  "finished": "2026-11-13T05:54:49Z"
                },
                {
                  "id": "S1.5",
                  "name": "Push preparation",
                  "state": "done",
                  "finished": "2026-11-13T05:55:02Z"
                },
                {
                  "id": "S1.6",
                  "name": "The force-push, on request",
                  "steps": [
                    {
                      "id": "S1.6.request",
                      "name": "The request read, rebuilt and checked",
                      "state": "done",
                      "finished": "2026-11-13T05:55:15Z"
                    },
                    {
                      "id": "S1.6.send",
                      "name": "The request sent",
                      "state": "done",
                      "finished": "2026-11-13T05:56:50Z"
                    },
                    {
                      "id": "S1.6.reply",
                      "name": "The reply stored",
                      "state": "done",
                      "finished": "2026-11-13T06:17:13Z"
                    },
                    {
                      "id": "S1.6.check",
                      "name": "The outcome classified and read back",
                      "state": "done",
                      "finished": "2026-11-13T06:17:35Z"
                    }
                  ],
                  "state": "done",
                  "finished": "2026-11-13T06:17:35Z"
                },
                {
                  "id": "S1.7",
                  "name": "Per-ref verification",
                  "state": "done",
                  "finished": "2026-11-13T06:18:04Z"
                },
                {
                  "id": "S1.8",
                  "name": "Fresh mirror and exit tests",
                  "state": "done",
                  "finished": "2026-11-13T06:18:21Z"
                },
                {
                  "id": "S1.9",
                  "name": "Residual probes",
                  "state": "done",
                  "finished": "2026-11-13T06:20:43Z"
                }
              ],
              "started": "2026-11-13T05:53:30Z",
              "finished": "2026-11-13T06:21:02Z",
              "report": "GKB2 passed all nine steps. The rewrite turned 32 commits into 30 (2 pruned); the rewritten mirror keeps 82 paths and 211 blobs, the largest 60,756 bytes, and none of the 81 manifest blobs. The control on the untouched backup equalled its record line for line (31 commits scanned, 79 findings), and the scan before the push was clean. The push was one forced update of master under the lease: class pushed, the expected tally in the dry run and in the push, the same ref and flag, and no refusal marker. The request ran under one id as two attempts, the first of which was not carried out and changed nothing. On two channels the server holds 1 rewritten head, no tag and 1 pull-request ref, as recorded. A fresh mirror holds 45 commits on every ref and is clean on branches and tags, with every count equal to its expectation. Through the pull-request ref 70 of the 81 manifest blobs stay reachable (11 missing, 281 distinct blobs on every ref), as predicted, and the scan of every ref reads 66 findings of the five custom rules in that old history. GitHub still serves every old id probed, authenticated and anonymous: 2 commits, 2 trees and 41 of 41 sampled manifest blobs; no answer differed from the expectation. The activity feed lists 18 old ids; 2 of 3 anonymous feed reads were valid, the events listing nothing yet. No default-rule finding. The steps ran as the integration checks against the real repository: 135 checks passed, none failed. Five deviations are logged in the as-built record: the grant step's line count, the wording of the request-written line, two shell error lines at the first request step, the request's two attempts under one id, and the stored form of the reply (its printed lines, one per line)."
            },
            {
              "id": "S2",
              "name": "GKB",
              "state": "done",
              "rows": [
                "inputs-unchanged",
                "gkb-purge",
                "force-push",
                "exit-tests",
                "default-rule-findings",
                "residual-probes"
              ],
              "brief": "The same for GKB, once GKB2 has passed every step.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.1",
                  "name": "List proof and pre-run checks",
                  "state": "done",
                  "finished": "2026-11-13T06:21:29Z"
                },
                {
                  "id": "S2.2",
                  "name": "Positive control on the untouched backup",
                  "state": "done",
                  "finished": "2026-11-13T06:21:47Z"
                },
                {
                  "id": "S2.3",
                  "name": "The rewrite",
                  "state": "done",
                  "finished": "2026-11-13T06:22:01Z"
                },
                {
                  "id": "S2.4",
                  "name": "Post-run checks and the scan before the push",
                  "state": "done",
                  "finished": "2026-11-13T06:22:17Z"
                },
                {
                  "id": "S2.5",
                  "name": "Push preparation",
                  "state": "done",
                  "finished": "2026-11-13T06:22:30Z"
                },
                {
                  "id": "S2.6",
                  "name": "The force-push, on request",
                  "steps": [
                    {
                      "id": "S2.6.request",
                      "name": "The request read, rebuilt and checked",
                      "state": "done",
                      "finished": "2026-11-13T06:22:44Z"
                    },
                    {
                      "id": "S2.6.send",
                      "name": "The request sent",
                      "state": "done",
                      "finished": "2026-11-13T06:23:53Z"
                    },
                    {
                      "id": "S2.6.reply",
                      "name": "The reply stored",
                      "state": "done",
                      "finished": "2026-11-13T06:25:32Z"
                    },
                    {
                      "id": "S2.6.check",
                      "name": "The outcome classified and read back",
                      "state": "done",
                      "finished": "2026-11-13T06:25:44Z"
                    }
                  ],
                  "state": "done",
                  "finished": "2026-11-13T06:25:44Z"
                },
                {
                  "id": "S2.7",
                  "name": "Per-ref verification",
                  "state": "done",
                  "finished": "2026-11-13T06:26:05Z"
                },
                {
                  "id": "S2.8",
                  "name": "Fresh mirror and exit tests",
                  "state": "done",
                  "finished": "2026-11-13T06:26:21Z"
                },
                {
                  "id": "S2.9",
                  "name": "Residual probes",
                  "state": "done",
                  "finished": "2026-11-13T06:29:03Z"
                }
              ],
              "started": "2026-11-13T06:21:02Z",
              "finished": "2026-11-13T06:29:37Z",
              "report": "GKB passed all nine steps, started once GKB2 had passed its ninth. The rewrite turned 11 commits into 9 (2 pruned); the rewritten mirror keeps 60 paths and 113 blobs, the largest 60,756 bytes, and none of the 58 manifest blobs. The control on the untouched backup equalled its record line for line (10 commits scanned, 59 findings), and the scan before the push was clean. The push was one forced update of master under the lease, carried out on its first attempt: class pushed, the expected tally in the dry run and in the push, the same ref and flag, and no refusal marker. On two channels the server holds 1 rewritten head, no tag and no pull-request ref, as recorded. A fresh mirror holds 9 commits on every ref and 113 distinct blobs, reaches no manifest blob from any ref, and is clean on branches and tags and on every ref, with every count equal to its expectation. GitHub still serves every old id probed, authenticated and anonymous: 2 commits, 2 trees and 58 of 58 manifest blobs; no answer differed from the expectation. The activity feed lists 9 old ids; 2 of 3 anonymous feed reads were valid, the events listing nothing yet. No default-rule finding. The steps ran as the integration checks against the real repository: 135 checks passed, none failed. No new deviation beyond those already logged: the two shell error lines at the first request step were seen again, and the stored reply is its printed lines, one per line."
            },
            {
              "id": "S3",
              "name": "Close-out",
              "state": "done",
              "rows": [
                "inputs-unchanged",
                "residual-probes"
              ],
              "brief": "Both repositories are read again, and the report rows and records are written with their checksums.",
              "kind": "check",
              "steps": [
                {
                  "id": "S3.feeds",
                  "name": "The second feed reads",
                  "state": "done",
                  "finished": "2026-11-13T06:35:11Z"
                },
                {
                  "id": "S3.reads",
                  "name": "Final reads of both repositories",
                  "state": "done",
                  "finished": "2026-11-13T06:35:27Z"
                },
                {
                  "id": "S3.record",
                  "name": "Report rows and checksums",
                  "state": "done",
                  "finished": "2026-11-13T06:35:39Z"
                }
              ],
              "ref": "plan.md#s3--close-out",
              "started": "2026-11-13T06:29:37Z",
              "finished": "2026-11-13T06:35:55Z",
              "report": "The close-out passed its three steps. The second feed reads, each more than 6 minutes after the first, repeat the first: the activity feed lists 18 old ids for GKB2 and 9 for GKB with 1 current id each, on the authenticated read, the web page and the anonymous read; the events list nothing yet, so 2 of 3 anonymous reads are valid for each repository; the anonymous budget covered both reads without a wait. The final reads show each repository's one branch at its rewritten tip, no tag, the pull-request refs as recorded (1 for GKB2, none for GKB), public, not archived, default branch master, and the six earlier records of each repository unchanged since the readiness stage. Both report rows are completed with the second feed reads, and the checksum lists are written: 40 record files for each repository and 33 run records, each list verifying against its files. Across the unit every count equals its expectation, GKB2's pull-request residual is 70 of 81 manifest blobs as predicted, and no default-rule finding exists in either repository. The close-out's 19 checks passed, none failed. No new deviation.",
              "result": "passed"
            }
          ]
        }
      ],
      "qa": [
        {
          "since": "2026-11-13T06:37:05Z",
          "ended": "2026-11-13T07:10:24Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-13T06:37:05Z",
            "note": "Quality Review 1: running"
          },
          "detail": "Both repositories are rewritten, pushed and verified, and every measured value equals its expectation. The checkout's change set is documents only. The tests and the change are checked against the plan next.",
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
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/ca070e8d/tests/index.html"
            }
          ]
        },
        {
          "since": "2026-11-13T07:37:48Z",
          "ended": "2026-11-13T08:10:40Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-13T07:37:48Z",
            "note": "Quality Review 2: running"
          },
          "detail": "The records asked for are written and the document checks passed; the tests and the change are checked again.",
          "qa": [
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
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/949b5d33/tests/index.html"
            }
          ]
        }
      ],
      "remediation": [
        {
          "since": "2026-11-13T07:26:38Z",
          "ended": "2026-11-13T07:37:48Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-13T07:37:48Z",
            "note": "3 of 3 sub-steps done"
          },
          "detail": "The landing's four document checks passed over the 15 pending files: no token in a document resolves to a commit from before the rewrite or names a purged blob; the three path expressions match nothing; the privacy gate reports 0 blocking hits; the secret scan of the documents is clean.",
          "remediation": {
            "pass": 1,
            "route": "remediation",
            "steps": [
              {
                "name": "The as-built record: the missing entries",
                "state": "done",
                "started": "2026-11-13T07:27:17Z",
                "finished": "2026-11-13T07:37:03Z",
                "report": "The as-built record now lists nine departures from the plan: three have their evidence added (the request-written line seen at both repositories, where the evidence of the first push request's two attempts lies, and the stored form of a reply), and four are new (a passing self-test prints traceback lines that carry a sandbox path; two scripts besides the parameter table name the repositories; the run records hold each request's key file; each request's procedure ran as one shell). The consequences now carry the tools' gaps as they ran and the follow-ups for the next rewrite unit: the classifier's dependence on a reply's stored form, the stops no self-test case reaches (first the stop that keeps a push from being sent twice and the closing controls of a probe set), a self-test that cannot be run by test level, the output rule asserted for one step only, an anonymous budget reading that is not explained, and a close-out that is not safe to run twice. No tool, mirror or remote changed."
              },
              {
                "name": "Consequences: follow-ups and known gaps for the next rewrite unit",
                "state": "done",
                "started": "2026-11-13T07:27:17Z",
                "finished": "2026-11-13T07:37:03Z",
                "report": "The as-built record now lists nine departures from the plan: three have their evidence added (the request-written line seen at both repositories, where the evidence of the first push request's two attempts lies, and the stored form of a reply), and four are new (a passing self-test prints traceback lines that carry a sandbox path; two scripts besides the parameter table name the repositories; the run records hold each request's key file; each request's procedure ran as one shell). The consequences now carry the tools' gaps as they ran and the follow-ups for the next rewrite unit: the classifier's dependence on a reply's stored form, the stops no self-test case reaches (first the stop that keeps a push from being sent twice and the closing controls of a probe set), a self-test that cannot be run by test level, the output rule asserted for one step only, an anonymous budget reading that is not explained, and a close-out that is not safe to run twice. No tool, mirror or remote changed."
              },
              {
                "name": "The landing's document checks",
                "state": "done",
                "started": "2026-11-13T07:37:03Z",
                "finished": "2026-11-13T07:37:48Z",
                "report": "The landing's four document checks passed over the 15 pending files: no token in a document resolves to a commit from before the rewrite or names a purged blob; the three path expressions match nothing; the privacy gate reports 0 blocking hits; the secret scan of the documents is clean."
              }
            ]
          },
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
            }
          ]
        },
        {
          "since": "2026-11-13T08:10:40Z",
          "ended": "2026-11-13T08:15:08Z",
          "endedBy": "document",
          "to": "document",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-13T08:15:08Z",
            "note": "2 of 2 sub-steps done"
          },
          "detail": "The consequences now state the classifier's gap as the tool text gives it (a reply with neither status line is read as a refusal by the service under a refused header and as a guard's stop otherwise; after a push that landed the check stops, and after a push that ran and was refused the request could be sent again, with the guards and the lease keeping the remote safe), say that no self-test case reaches the probes' stop on a status outside a route's answers, and give the anonymous budget's real thresholds (28 to 35 completes, 26 or 27 cuts a feed read, 25 or less stops a set). The list of untested paths is completed and says it is not exhaustive, with the rule the next rewrite unit applies. The as-built record lists a tenth departure: each push request was sent as a reference to its file with the file's checksum, and asked for the one-shell run. No tool, mirror or remote changed.",
          "remediation": {
            "pass": 2,
            "route": "on-the-spot",
            "steps": [
              {
                "name": "Consequences: three statements corrected, the list of untested paths completed",
                "state": "done",
                "started": "2026-11-13T08:10:40Z",
                "finished": "2026-11-13T08:15:08Z",
                "report": "The consequences now state the classifier's gap as the tool text gives it (a reply with neither status line is read as a refusal by the service under a refused header and as a guard's stop otherwise; after a push that landed the check stops, and after a push that ran and was refused the request could be sent again, with the guards and the lease keeping the remote safe), say that no self-test case reaches the probes' stop on a status outside a route's answers, and give the anonymous budget's real thresholds (28 to 35 completes, 26 or 27 cuts a feed read, 25 or less stops a set). The list of untested paths is completed and says it is not exhaustive, with the rule the next rewrite unit applies. The as-built record lists a tenth departure: each push request was sent as a reference to its file with the file's checksum, and asked for the one-shell run. No tool, mirror or remote changed."
              },
              {
                "name": "The as-built record: the request sent by reference to its file",
                "state": "done",
                "started": "2026-11-13T08:10:40Z",
                "finished": "2026-11-13T08:15:08Z",
                "report": "The consequences now state the classifier's gap as the tool text gives it (a reply with neither status line is read as a refusal by the service under a refused header and as a guard's stop otherwise; after a push that landed the check stops, and after a push that ran and was refused the request could be sent again, with the guards and the lease keeping the remote safe), say that no self-test case reaches the probes' stop on a status outside a route's answers, and give the anonymous budget's real thresholds (28 to 35 completes, 26 or 27 cuts a feed read, 25 or less stops a set). The list of untested paths is completed and says it is not exhaustive, with the rule the next rewrite unit applies. The as-built record lists a tenth departure: each push request was sent as a reference to its file with the file's checksum, and asked for the one-shell run. No tool, mirror or remote changed."
              }
            ]
          },
          "qa": [
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
              "note": "The rewrite, both pushes and every acceptance criterion stand, all nine recorded departures hold, and nothing outside the stated writes changed; `gdocs.sh` ran again with 22 passed. 12 findings (12 minor; 8 test, 4 code), every one small and on the records: three statements in the consequences that do not hold against the tools (when the classifier's gap lets a request be sent again, which probe stop a self-test case reaches, and the budget thresholds), a list of untested paths that is not complete, one departure not yet listed in the as-built record (each push request sent as a reference to its file with a checksum, asking for the one-shell run), and the document checks, which ran before the boards were last regenerated and run again before the documents are committed. They touch the push, the residual probes and the tools handed on. This review counts 20 test findings in Quality Review 1, where that pass's record holds 19."
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
        "note": "The rewrite, both pushes and every acceptance criterion stand, all nine recorded departures hold, and nothing outside the stated writes changed; `gdocs.sh` ran again with 22 passed. 12 findings (12 minor; 8 test, 4 code), every one small and on the records: three statements in the consequences that do not hold against the tools (when the classifier's gap lets a request be sent again, which probe stop a self-test case reaches, and the budget thresholds), a list of untested paths that is not complete, one departure not yet listed in the as-built record (each push request sent as a reference to its file with a checksum, asking for the one-shell run), and the document checks, which ran before the boards were last regenerated and run again before the documents are committed. They touch the push, the residual probes and the tools handed on. This review counts 20 test findings in Quality Review 1, where that pass's record holds 19."
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
        "step": "implementation",
        "since": "2026-11-13T05:21:49Z",
        "ended": "2026-11-13T05:42:28Z",
        "by": "halted"
      },
      {
        "step": "implementation",
        "since": "2026-11-13T06:01:41Z",
        "ended": "2026-11-13T06:13:26Z",
        "by": "halted"
      },
      {
        "step": "implementation",
        "since": "2026-11-13T06:16:20Z",
        "ended": "2026-11-13T06:16:48Z",
        "by": "halted"
      },
      {
        "step": "remediation",
        "since": "2026-11-13T07:10:24Z",
        "ended": "2026-11-13T07:26:38Z",
        "by": "halted"
      }
    ],
    "asked": [
      {
        "step": "implementation",
        "text": "GKB2's push succeeded, but its reply arrived as one document holding the printed lines as list entries, and the plan's classifier reads status lines only at the start of a line. In which form is the reply stored, for GKB2 and for GKB?",
        "options": [
          "Store the printed lines alone, one per line, in order (tried on a scratch copy: classified as pushed)",
          "Store the reply as it came, followed by the printed lines one per line (tried on a scratch copy first)",
          "Settle the form in the plan first, then store",
          "Stop the unit here as it stands"
        ],
        "answer": null,
        "asked": "2026-11-13T06:16:20Z",
        "answered": "2026-11-13T06:16:48Z"
      },
      {
        "step": "remediation",
        "text": "The check of the tests and the change confirmed both rewrites and asks for changes: missing entries in the as-built record, and gaps and defects in the tools (a reply's form misread by the classifier, untested stops, one self-test script that cannot be run by test level). The tools' bytes are recorded by the plan and their one run is made. How are the findings on the tools handled?",
        "options": [
          "Record them: the missing entries go into the as-built record, the tool findings become follow-ups and known gaps for the next rewrite unit, and the landing's document checks are run",
          "Fix the tools now: the plan is revised, the tools changed, recorded anew and self-tested again, with the run already made standing against the earlier bytes",
          "Fix now only the defect that misreads a reply's form and its missing test case, and record the rest"
        ],
        "answer": null,
        "asked": "2026-11-13T07:10:24Z",
        "answered": "2026-11-13T07:26:38Z"
      }
    ],
    "document": {
      "tasks": [
        {
          "id": "documentation-review",
          "name": "Documentation review",
          "state": "done",
          "started": "2026-11-13T08:22:24Z",
          "finished": "2026-11-13T08:32:16Z",
          "report": "The documentation check found 19 points. Thirteen are in the tools' own comments, headers and usage lines (contracts that lag the code, embedded shell and wire-format fragments with no line comment, no folding regions): the tools' bytes are recorded and their run is made, so these become documentation follow-ups for the next rewrite unit. Six are in the plan's prose (a request field missing from its table, the output rule's sentence on paths in a request, which status one class reads, the ring map, a missing diagram of the request flow as built, two edges of the flowchart): they are recorded in the as-built record and the consequences, and the plan's text stays as the tools were saved from it."
        },
        {
          "id": "reconcile-documentation",
          "name": "Reconcile documentation",
          "state": "done",
          "started": "2026-11-13T08:32:16Z",
          "finished": "2026-11-13T09:19:14Z",
          "report": "The as-built record is complete: what was built, the acceptance against the plan's criteria, the measurements and sixteen departures from the plan, each with the plan section it departs from, and a sequence diagram of the request flow as it ran. The consequences carry every assumption's outcome, the known gaps and the follow-ups for the next rewrite unit, the documentation follow-ups on the tools included. Dated notes of 2026-11-13 are in the design (the push form, the scan before the push, the per-ref verification, the request sent by reference, the corrected runner in this unit's scope), in the phase's consequences and in the consequences of the preparation, rewrite-and-swap, hygiene and publication units. A second documentation check found every earlier point recorded and thirteen points in the new text, all corrected. The README needs no change and the CHANGELOG no entry: the landing carries documents and boards only, and no version moves. The heading of the record's departures section changed, so links to it are to be regenerated."
        },
        {
          "id": "reconcile-plan",
          "name": "Reconcile plan",
          "state": "done",
          "started": "2026-11-13T08:35:01Z",
          "finished": "2026-11-13T09:19:14Z",
          "report": "The as-built record is complete: what was built, the acceptance against the plan's criteria, the measurements and sixteen departures from the plan, each with the plan section it departs from, and a sequence diagram of the request flow as it ran. The consequences carry every assumption's outcome, the known gaps and the follow-ups for the next rewrite unit, the documentation follow-ups on the tools included. Dated notes of 2026-11-13 are in the design (the push form, the scan before the push, the per-ref verification, the request sent by reference, the corrected runner in this unit's scope), in the phase's consequences and in the consequences of the preparation, rewrite-and-swap, hygiene and publication units. A second documentation check found every earlier point recorded and thirteen points in the new text, all corrected. The README needs no change and the CHANGELOG no entry: the landing carries documents and boards only, and no version moves. The heading of the record's departures section changed, so links to it are to be regenerated."
        },
        {
          "id": "readme-changelog",
          "name": "README and CHANGELOG",
          "state": "done",
          "finished": "2026-11-13T09:19:14Z",
          "report": "The as-built record is complete: what was built, the acceptance against the plan's criteria, the measurements and sixteen departures from the plan, each with the plan section it departs from, and a sequence diagram of the request flow as it ran. The consequences carry every assumption's outcome, the known gaps and the follow-ups for the next rewrite unit, the documentation follow-ups on the tools included. Dated notes of 2026-11-13 are in the design (the push form, the scan before the push, the per-ref verification, the request sent by reference, the corrected runner in this unit's scope), in the phase's consequences and in the consequences of the preparation, rewrite-and-swap, hygiene and publication units. A second documentation check found every earlier point recorded and thirteen points in the new text, all corrected. The README needs no change and the CHANGELOG no entry: the landing carries documents and boards only, and no version moves. The heading of the record's departures section changed, so links to it are to be regenerated."
        },
        {
          "id": "state-boards",
          "name": "State boards",
          "state": "done",
          "started": "2026-11-13T09:20:33Z",
          "finished": "2026-11-13T09:31:39Z"
        },
        {
          "id": "document-landing",
          "name": "Document commit",
          "state": "done",
          "started": "2026-11-13T09:31:39Z",
          "finished": "2026-11-13T09:34:35Z"
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
      "note": "one question, on the force-push: what GitHub can refuse, how a refusal reads and which form of the push makes the update conditional on the old tip, with its findings file; 27 load-bearing claims re-opened at their sources and two experiment rows observed again, all holding; every other input cited from the earlier findings, at the same tool versions"
    },
    {
      "column": "gap",
      "label": "Research verified, in #2's run",
      "date": "2026-10-21",
      "ref": "../research/README.md",
      "note": "written on this board when the run started, from #2's research and its architecture's current state (§2.1), the pipeline (§6.4) and the residual measurement (§6.6), with this unit's row in §15 and what units 1, 3, 4 and 5 hand on"
    },
    {
      "column": "considered",
      "label": "Architecture signed off, in #2's run",
      "date": "2026-11-07",
      "ref": "../architecture.md",
      "note": "the options #2's architecture weighed for this unit: §4, §6.4, §6.6, §14 and §16; the unit's own plan adds to them at plan acceptance"
    },
    {
      "column": "verdict",
      "label": "Plan accepted",
      "date": "2026-11-13",
      "ref": "plan.md",
      "note": "four stages: a readiness stage that writes nothing, GKB2's nine pipeline steps, then GKB's once GKB2 has passed every step, and a close-out that reads both repositories again; two force-pushes, each of the one branch with a lease on its old tip, read back on two channels; nothing else written to GitHub"
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
      "label": "Research planning: 0 questions drafted"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research started: `force-push-and-push-protection`"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research returned: `force-push-and-push-protection`",
      "ref": "research/force-push-and-push-protection.md"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Verification started: 1 finding"
    },
    {
      "date": "2026-11-13",
      "column": "gap",
      "label": "Research verified; the plan next",
      "ref": "research/README.md"
    },
    {
      "date": "2026-11-13",
      "column": "verdict",
      "label": "Plan accepted",
      "ref": "plan.md"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Branch `chore/issue-26-rewrite-gkb2-and-gkb` cut; implementation starts at S0"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Halted at implementation: waiting on you (The owner: the permission for the unit's two force-pushes, as the plan words it (Design, \"The grant\").)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Resumed at implementation"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Open point resolved: The permission for the two force-pushes is not in place; the readiness stage cannot start without it.",
      "ref": "plan.md, Design, The grant"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "S0 done; S1 current: GKB2"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Halted at implementation: waiting on you (The owner: what the request service needs before it can carry out the GKB2 push.)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Open point resolved: The GKB2 push request was not carried out; the branch is unchanged at its old tip, and the request waits to be run again.",
      "ref": "plan.md, Design, The push"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Halted at implementation: waiting on you (The owner: the form in which the push's reply is stored, for GKB2 and for GKB.)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Open point resolved: The plan does not say what is stored when a push's reply arrives as one document with its printed lines as list entries; stored as it came, the classifier would misread a successful push as a guard's stop.",
      "ref": "plan.md, Procedure, Conventions, A request STEP"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "S1 done; S2 current: GKB"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "S2 done; S3 current: Close-out"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Implementation done (4 stages); Quality Review next"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Quality Review 1: running"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Quality Review 1: changes requested, 23 findings (17 minor, 6 other; 19 test, 4 code)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Halted at Correction: waiting on you (The owner: whether the findings on the tools are recorded for the next rewrite unit or fixed in this one.)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Resumed at the Correction"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Open point resolved: The first check of the tests and the change asks for changes: entries missing from the as-built record, and gaps and defects in the tools; whether the tool findings are recorded for the next rewrite unit or fixed now is undecided.",
      "ref": "plan.md, Test plan"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Correction: 2 sub-steps current in parallel: The as-built record: the missing entries | Consequences: follow-ups and known gaps for the next rewrite unit"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Correction: 2 sub-steps done; The landing's document checks current"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Correction: 3 sub-steps done; every sub-step done"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Quality Review 2: running"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Quality Review 2: changes requested, 12 findings (12 minor; 8 test, 4 code)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Correction of Quality Review 2: 2 sub-steps done; every sub-step done"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: 0 of 6 tasks done"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: Documentation review current"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: Reconcile documentation current"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: Reconcile documentation, Reconcile plan in parallel"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: 4 of 6 tasks done"
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
    }
  ],
  "rows": [
    {
      "id": "inputs-unchanged",
      "group": "Start",
      "name": "The preparation unit's mirrors, backups and expectation rows, checked unchanged",
      "system": "rewrite-pipeline",
      "where": "`BotWS/mirror` · `BotWS/backup` · `BotLegacyData/manifests`, GKB2 and GKB",
      "gap": {
        "kind": "risk",
        "summary": "The rewrite starts from inputs taken at the start of the phase. GKB2's and GKB's mirrors, backups, manifests and expectation rows were made by the preparation unit at the start of the phase, and the rewrite is judged against them, so they hold only while nothing has been pushed to either repository since. Read on 2026-11-13, each server's refs still equal the listing recorded when the mirrors were cloned, and each mirror and backup is byte for byte as recorded then.",
        "evidence": [
          "`../architecture.md:510` — the five static repositories are mirrored in the toolchain unit, at the start of the phase",
          "`../architecture.md:514` — the `ls-remote` listing at clone time is recorded, and every later push first checks the server's heads against `ref-map`'s old column",
          "`../21-preparation/consequences.md:111` — this unit consumes the five static repositories' backups, manifests and expectation rows",
          "`../21-preparation/final-implementation.md:121` — GKB2's row: 32 commits, 2 pruned, 30 after; 82 paths and 211 blobs kept; 81 in the manifest",
          "`../21-preparation/final-implementation.md:122` — GKB's row: 11 commits, 2 pruned, 9 after; 60 paths and 113 blobs kept; 58 in the manifest",
          "`research/README.md:30` — read on 2026-11-13: each server's refs equal the listing recorded at clone time, and each mirror and backup is byte for byte as recorded then"
        ],
        "source": "../architecture.md §6.2; ../21-preparation/final-implementation.md §3.5; research/README.md, current state",
        "link": "../architecture.md#62-backups-and-manifests"
      },
      "options": [
        {
          "id": "preparation-mirrors-checked",
          "name": "Rewrite from the preparation unit's mirrors, the backup untouched, with the server's branch and tag tips checked against `ref-map`'s old column before the push",
          "verdict": "accepted",
          "why": "The check makes the gap between clone and push safe however long it is; the backup stays the control of every \"all missing\" proof and the source of the probes' id lists.",
          "source": "../architecture.md §6.2, §6.4 stage 5, §15",
          "link": "../architecture.md#62-backups-and-manifests"
        },
        {
          "id": "re-derive-inputs",
          "name": "Re-derive the manifests and the expectation rows",
          "verdict": "declined",
          "why": "They are re-verified against their recorded values only, and the preparation unit's records are never overwritten: this unit's files go beside them.",
          "source": "plan.md Non-goals; Records and where they live",
          "link": "plan.md#non-goals"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "text": "At readiness, with nothing written yet, both repositories' purge lists, mirrors, backups, manifests and six earlier records held their recorded values (40 checks), and both repositories read from GitHub as recorded, the server's refs equal to the clone's listing (22 checks).",
            "state": "as-planned"
          },
          {
            "text": "Each repository's first step proved its list and its mirror's and backup's checksums again, reading only: GKB2's, and then GKB's.",
            "state": "as-planned"
          },
          {
            "text": "Before each push the server's branches, tags and pull-request refs equalled the clone's record, at the push preparation and again at the push's guards before its dry run, so neither repository stopped. At the close-out each read back as its push left it: its one branch at its rewritten tip, no tag, the pull-request refs as recorded (1 for GKB2, none for GKB), public, not archived, default branch `master`.",
            "state": "as-planned"
          },
          {
            "text": "The preparation unit's six records of each repository were never written: at the close-out they read as at readiness. The unit's own files lie beside them under checksum lists of their own, one in each repository's record folder and one over the 33 run records; 2 of the run records are the requests' key files, which the plan's list of the run records does not name.",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          }
        ],
        "changes": [
          {
            "what": "The run records hold each request's key file, `push-<repo>.key`, the key of the last request, which the push step's request writes and the close-out's record step checksums: 2 of the 33 run records. The plan's list of the run-record folder's contents does not name it.",
            "why": "The push step's request reads the last attempt's key before it sends, so it keeps that key among the run records, and the close-out checksums every run record.",
            "when": "Stages S1 and S2 · the request steps; S3 · the record"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Prove each repository's list, mirror, backup, earlier records and the clone's listing against their recorded values at readiness, before anything is written.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written to GitHub; everything is a read, a local check or a self-test. The only files written are the tools, the corrected runner, the one record `records-at-s0.<repo>.sums` and the folders the scripts create.",
              "hash": "f67e33c6dbdb"
            }
          },
          {
            "text": "Prove the list and the mirror's and backup's checksums again at each repository's first step, which reads only.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Compare the server's branches, tags and pull-request refs with the clone's record at the push preparation, and again inside the push's own procedure just before the dry run; a difference stops the repository with nothing sent, for a fresh clone and rewrite by a later run.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The form. Per repository, from its bare mirror, after the rewrite's checks and the push preparation:",
              "hash": "1ea6d20d9d6f"
            }
          },
          {
            "text": "Never write the preparation unit's records: the unit's own files go beside them.",
            "ref": "plan.md#records-and-where-they-live",
            "excerpt": {
              "ref": "plan.md#records-and-where-they-live",
              "heading": "Records and where they live",
              "paragraph": "`DATA/rewrite/<repo>/` holds this unit's new files beside the preparation unit's six, which are never written: `entries-before.txt`, `entries-after.txt`, `g26-prerun.env`, `g26-control-scan.txt`, `g26-control.txt`, `g26-control-kept.txt`, `filter-repo.log`, `commit-map`, `ref-map`, `changed-refs`, `first-changed-commits`, `suboptimal-issues`, `next-steps.txt`, `purge-list.txt`, `expect-check.txt`, `gitleaks-prepush.txt`, `default-rule-findings-prepush.txt` (if any), `push-expect.txt`, `server-pull-refs.txt`, `push-dry.txt`, `push-dry.err`, `push.txt`, `push.err`, `heads-after-push.txt`, …",
              "hash": "e5c80f9ef5a9"
            }
          }
        ],
        "defense": "The rewrite is judged against inputs taken at the start of the phase, so each is proven unchanged before it is used, and the server's state is read again wherever a write follows.",
        "steps": [
          {
            "id": "S0",
            "what": "Check each row of the parameter table against the data: the list, the mirror's and backup's checksums, the earlier records, the clone's listing, the control probes and the every-ref commit count.",
            "check": "`STAGE S0.inputs OK`",
            "link": "plan.md#s0--readiness"
          },
          {
            "id": "S1.5, S2.5",
            "what": "Read the server's heads, tags and pull-request refs against the clone's record before the push is prepared.",
            "check": "`STAGE <repo>.p5 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          }
        ],
        "tests": [
          "L1 gating — the readiness checks, then each repository's first and fifth steps: reads that write nothing",
          "L2 component — the self-test's stops on a backup, a list and an earlier record that differ, and on a server that moved"
        ],
        "risks": [
          "Something pushed to GKB2 or GKB since the clone stops that repository before its push; it is cloned and rewritten again by a later run"
        ],
        "source": "plan.md Assumptions A1; S0 — Readiness; Steps 1 to 9 of a repository; The push",
        "link": "plan.md#s0--readiness"
      }
    },
    {
      "id": "gkb2-purge",
      "group": "The rewrite",
      "name": "GKB2: the purge, with the pipeline's checks before and after",
      "system": "rewrite-pipeline",
      "where": "`BotWS/mirror/GKB2.git` · `BotLegacyData/rewrite/GKB2`",
      "gap": {
        "kind": "risk",
        "summary": "GKB2's history still holds the files the phase purges, on a public repository. Its manifest lists 81 purged blobs; the rewrite is expected to turn 32 commits into 30 and keep 82 paths and 211 blobs. At the tip, 14 of its 86 files lie under a purged path.",
        "evidence": [
          "`../architecture.md:190` — GKB2: public, `master`, `refs/pull/6/head`; 32 → 30 commits; 82 paths and 211 blobs survive; 81 purged blobs, 70 of them reachable through the pull-request ref",
          "`../21-preparation/final-implementation.md:121` — GKB2's expectation row, re-derived from the backup",
          "`research/README.md:32` — the rewrite changes `master`: GKB2's 32 commits become 30, and 14 of the tip's 86 files leave its tree"
        ],
        "source": "../architecture.md §2.1, §6.4; research/README.md, current state",
        "link": "../architecture.md#21-the-six-repositories"
      },
      "options": [
        {
          "id": "pipeline-stages-1-4",
          "name": "The pipeline's stages 1 to 4 in GKB2's mirror: list proof and pre-run checks, positive control, one `git filter-repo --sensitive-data-removal --invert-paths` invocation, post-run checks",
          "verdict": "accepted",
          "why": "Each stage is a gate: a failure stops the repository before its push and discards its mirror, the backup kept, with nothing changed on GitHub.",
          "source": "../architecture.md §6.4, §8",
          "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
        },
        {
          "id": "scrub-gkb2",
          "name": "Scrub the machine-local paths in GKB2 as well",
          "verdict": "declined",
          "why": "GKB2 is public already; only KotlinBottools became newly public, so the path scrub runs there alone.",
          "source": "../architecture.md §4, §14",
          "link": "../architecture.md#14-alternatives-considered"
        },
        {
          "id": "exit-status-gkb2",
          "name": "Rely on the tools' exit status",
          "verdict": "declined",
          "why": "gitleaks, and `git reset` and `git gc` on Windows, exit 0 on failure in the cases the phase meets; counts and proofs decide.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The positive control run again on GKB2's untouched backup equalled the preparation unit's record line for line: 31 commits scanned, 79 findings.",
            "state": "as-planned"
          },
          {
            "text": "GKB2's mirror was purged in one rewrite, which turned its 32 commits into 30 (2 pruned).",
            "state": "as-planned"
          },
          {
            "text": "The result matched GKB2's expectation row: 82 paths and 211 blobs kept, the largest 60,756 bytes, and none of the 81 manifest blobs; the scan of its branches before the push was clean.",
            "state": "as-planned"
          },
          {
            "text": "No stop came before the push, so the mirror was never restored from the backup and GKB2 did not start again.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "numbered",
        "statements": [
          {
            "text": "Run the positive control again on GKB2's untouched backup with the current scan configuration, into new files that must equal the preparation unit's records line for line.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Purge GKB2's mirror with one `git filter-repo --sensitive-data-removal --invert-paths --paths-from-file` invocation, from no input and with no other option.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Check the result against GKB2's expectation row (32 commits to 30, 82 paths and 211 blobs kept, every one of the 81 manifest blobs missing), then scan its branches before the push, expecting `RESULT: CLEAN`.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "A stop before the push restores the mirror from the untouched backup, and GKB2 starts again at its first step.",
            "ref": "plan.md#stops-and-the-state-each-leaves",
            "excerpt": {
              "ref": "plan.md#stops-and-the-state-each-leaves",
              "heading": "Stops and the state each leaves",
              "paragraph": "",
              "hash": "b774141a4409"
            }
          }
        ],
        "defense": "The rewrite is the pipeline the earlier rewrite ran, read from a parameter table; each check is a gate, and nothing reaches GitHub before the push step.",
        "steps": [
          {
            "id": "S1.2",
            "what": "Run the positive control on the untouched backup and compare it with the recorded one.",
            "check": "the three equalities, `STAGE GKB2.p2 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          },
          {
            "id": "S1.3",
            "what": "Run the one filter-repo invocation in GKB2's mirror.",
            "check": "`You rewrote 32 (of 32)`, `STAGE GKB2.p3 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          },
          {
            "id": "S1.4",
            "what": "Run every post-run check, copy the outputs to the data folder and scan the branches.",
            "check": "`expect_check.py` ending `PASS`, `RESULT: CLEAN`, `STAGE GKB2.p4 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          }
        ],
        "tests": [
          "L1 gating — the list proof, the pre-run checks and the positive control",
          "L2 component — the self-test runs steps 1 to 9 on a made-up repository with a pull-request ref inside its branch, with each stop before the push and the reset",
          "L3 integration — the rewrite on the real mirror",
          "L4a deterministic — the expected counts from the row"
        ],
        "risks": [
          "A control that differs means the configuration's change is not inert for GKB2: it stops before anything is rewritten",
          "A post-run count that differs stops GKB2 before its push"
        ],
        "source": "plan.md Steps 1 to 9 of a repository; Expected values; Stops and the state each leaves",
        "link": "plan.md#steps-1-to-9-of-a-repository"
      }
    },
    {
      "id": "gkb-purge",
      "group": "The rewrite",
      "name": "GKB: the purge, with the pipeline's checks before and after",
      "system": "rewrite-pipeline",
      "where": "`BotWS/mirror/GKB.git` · `BotLegacyData/rewrite/GKB`",
      "gap": {
        "kind": "risk",
        "summary": "GKB's history still holds the files the phase purges, on a public repository. Its manifest lists 58 purged blobs; the rewrite is expected to turn 11 commits into 9 and keep 60 paths and 113 blobs, and GKB has no pull-request ref. At the tip, 54 of its 114 files lie under a purged path.",
        "evidence": [
          "`../architecture.md:191` — GKB: public, `master`, no pull-request ref; 11 → 9 commits; 60 paths and 113 blobs survive; 58 purged blobs",
          "`../21-preparation/final-implementation.md:122` — GKB's expectation row, re-derived from the backup",
          "`research/README.md:32` — the rewrite changes `master`: GKB's 11 commits become 9, and 54 of the tip's 114 files leave its tree"
        ],
        "source": "../architecture.md §2.1, §6.4; research/README.md, current state",
        "link": "../architecture.md#21-the-six-repositories"
      },
      "options": [
        {
          "id": "pipeline-stages-1-4-gkb",
          "name": "The same stages 1 to 4 in GKB's mirror, after GKB2",
          "verdict": "accepted",
          "why": "The repositories run one by one, each stopping on its own gate with a state of its own to hand back; a stop in GKB2 leaves GKB waiting.",
          "source": "../architecture.md §6.4, §8, §15",
          "link": "../architecture.md#15-decomposition"
        },
        {
          "id": "one-unit-each",
          "name": "One unit per legacy repository (five)",
          "verdict": "declined",
          "why": "The same procedure five times; two grouped units keep a stop per repository with less duplication.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        },
        {
          "id": "scrub-gkb",
          "name": "Scrub the machine-local paths in GKB as well",
          "verdict": "declined",
          "why": "GKB is public already; only KotlinBottools became newly public.",
          "source": "../architecture.md §4, §14",
          "link": "../architecture.md#14-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "GKB started only once GKB2 had passed all nine steps, its residual probes included.",
            "state": "as-planned"
          },
          {
            "text": "The positive control run again on GKB's untouched backup equalled its record line for line: 10 commits scanned, 59 findings.",
            "state": "as-planned"
          },
          {
            "text": "GKB's mirror was purged in one rewrite, which turned its 11 commits into 9 (2 pruned).",
            "state": "as-planned"
          },
          {
            "text": "The result matched GKB's expectation row: 60 paths and 113 blobs kept, the largest 60,756 bytes, and none of the 58 manifest blobs; the scan of its branches before the push was clean.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "numbered",
        "statements": [
          {
            "text": "Start GKB only once GKB2 has passed every step, its residual probes included, so the first real force-push is answered on GKB2 before the second is made.",
            "ref": "plan.md#shape-of-the-procedure",
            "excerpt": {
              "ref": "plan.md#shape-of-the-procedure",
              "heading": "Shape of the procedure",
              "paragraph": "Four stages. `S0` reads and checks and writes nothing to GitHub or to any repository. `S1` rewrites, pushes and measures GKB2 in nine steps, one per stage of the architecture's pipeline; `S2` does the same for GKB and starts only when `S1` has passed every step. `S3` reads both repositories again and writes the records. The table is the board's list of the unit's stages.",
              "hash": "eba6faf9f17f"
            }
          },
          {
            "text": "Run the same positive control on GKB's untouched backup, which must equal its record line for line.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Purge GKB's mirror with the same one invocation.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Check the result against GKB's expectation row (11 commits to 9, 60 paths and 113 blobs kept, every one of the 58 manifest blobs missing), then scan its branches before the push, expecting `RESULT: CLEAN`.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          }
        ],
        "defense": "The same steps from the same tools, with GKB's own row of the parameter table; GKB has no pull-request ref, so its checks are the simpler case.",
        "steps": [
          {
            "id": "S2.2 to S2.4",
            "what": "The positive control, the rewrite and the post-run checks with the scan, as for GKB2.",
            "check": "`You rewrote 11 (of 11)`, `RESULT: CLEAN`, `STAGE GKB.p4 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          }
        ],
        "tests": [
          "L2 component — the self-test runs steps 1 to 9 on a made-up repository without a pull-request ref",
          "L3 integration — the rewrite on the real mirror"
        ],
        "risks": [
          "A stop in GKB2 leaves GKB waiting"
        ],
        "source": "plan.md Shape of the procedure; Steps 1 to 9 of a repository; Expected values",
        "link": "plan.md#shape-of-the-procedure"
      }
    },
    {
      "id": "force-push",
      "group": "The push",
      "name": "Each rewritten mirror force-pushed, then verified ref by ref",
      "system": "rewrite-pipeline",
      "where": "GKB2 and GKB on GitHub, `master` · GKB2's `refs/pull/6/head`",
      "gap": {
        "kind": "risk",
        "summary": "A force-push in place cannot be taken back. After it, a failed verification means the remote may be partly updated; GitHub hides `refs/pull/*` from a push, so GKB2's pull-request ref stays as it is. The research finds that the mirror push the earlier findings give cannot make the update conditional on the old tip: git ignores a lease under `--mirror`, so a branch moved since the clone is overwritten with exit status 0, and a lease holds only on a push that names its ref and carries nothing that forces it. GitHub's push protection for users, on by default, is taken to apply whatever the repository's own setting, disabled on both: it refuses a push carrying a supported secret, the Discord bot token among them, and a dry run never shows that refusal. Every refusal leaves the remote unchanged.",
        "evidence": [
          "`../architecture.md:965` — units 6 and 7: each repository's force-push is irreversible once made; after a failed per-ref verification, stop, report the tally, no blind repeat",
          "`../architecture.md:279` — GitHub hides `refs/pull/*` from `receive-pack`",
          "`../architecture.md:621` — the local `refs/pull/*` are deleted before the push, so every remaining `!` is a real failure",
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:137` — this unit takes the pipeline as the rewrite and swap unit ran it, with its mirror push proven",
          "`research/README.md:133` — under `--mirror`, as under `--force` or a refspec with a leading `+`, git ignores the lease; the documentation says so and the source makes force win over the stale check",
          "`research/README.md:109` — observed again with git 2.55.0.windows.5: a mirror push with a wrong expected value overwrote the branch and exited 0; a refspec push with a lease against a moved branch printed `[rejected]` and `(stale info)`, exited 1 and left it unchanged",
          "`research/README.md:28` — secret scanning and push protection are disabled on both repositories",
          "`research/README.md:146` — push protection for users is on by default for every account and stops a supported secret pushed to a public repository whatever the repository's setting; the Discord bot token is one; a dry run never shows a refusal made on the server",
          "`research/force-push-and-push-protection.md:149` — GitHub's list of supported secrets marks the Discord bot token with push protection",
          "`research/README.md:152` — a refusal reads as one `!` line and exit status 1, and every refusal leaves the remote unchanged"
        ],
        "source": "../architecture.md §6.4 stages 5 to 7, §8; research/README.md, summary §1; research/force-push-and-push-protection.md §2, §3.1 to §3.3",
        "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
      },
      "options": [
        {
          "id": "dry-run-push-verify",
          "name": "Push preparation, then a dry run and the push, both `--porcelain --force --mirror` and tallied against `ref-map`, then per-ref verification on two channels",
          "verdict": "partial",
          "why": "Taken: the push preparation, the dry run before the push, the tally against `ref-map`, the read-back and the per-ref verification on two channels. Not taken: the `--force --mirror` form, under which git ignores a lease, so a branch moved since the clone would be overwritten with exit status 0; a mirror push would also delete a server branch created after the clone.",
          "source": "../architecture.md §6.4 stages 5 to 7, §11; plan.md The push",
          "link": "plan.md#the-push"
        },
        {
          "id": "lease-refspec-push",
          "name": "A push of `refs/heads/master` alone, with a lease on its old tip read from `ref-map` at run time, to the repository's URL, after the guards and a dry run of the same line",
          "verdict": "accepted",
          "why": "The lease makes the update conditional on the old tip, and one ref cannot create or delete anything or touch the pull-request refs. The guard stays beside it: it catches any ref created, moved or deleted since the clone.",
          "source": "plan.md The push; research/README.md, summary §1",
          "link": "plan.md#the-push"
        },
        {
          "id": "mirror-with-lease",
          "name": "`--mirror` with a lease",
          "verdict": "declined",
          "why": "The lease is inert under `--mirror`: observed again, a mirror push with a wrong expected value overwrote the branch and exited 0.",
          "source": "research/README.md, Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "mirror-without-force",
          "name": "`--mirror` without `--force`",
          "verdict": "declined",
          "why": "The same push as with it: `--mirror` force-updates the remote refs anyway.",
          "source": "research/README.md, Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "atomic",
          "name": "`--atomic`",
          "verdict": "declined",
          "why": "One ref makes it redundant.",
          "source": "plan.md The push; research/README.md, Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "guard-or-lease-alone",
          "name": "The guard alone, or the lease alone",
          "verdict": "declined",
          "why": "Each covers what the other cannot: the guard reads every ref against the clone's record, the lease binds `master` at the push's own ref advertisement; together they cost nothing for a repository with one branch.",
          "source": "research/README.md, summary §1",
          "link": "research/README.md#1-the-force-push"
        },
        {
          "id": "test-push",
          "name": "A test push to see whether push protection blocks",
          "verdict": "declined",
          "why": "It would itself be a write to a public repository.",
          "source": "research/README.md, Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "account-protection-off",
          "name": "Turning off the pushing account's push protection beforehand",
          "verdict": "declined",
          "why": "It weakens the account's own guard on a forecast the evidence does not support, and an account setting is not the procedure's to change.",
          "source": "research/README.md, Options that do not fit; plan.md Non-goals",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "bypass-block",
          "name": "Bypassing a push-protection block",
          "verdict": "declined",
          "why": "A refusal leaves the remote unchanged and stops the unit; the procedure never bypasses a block.",
          "source": "plan.md The push; Non-goals",
          "link": "plan.md#the-push"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "changes": [
          {
            "what": "The confirmation line of the push preparation, and of each request step that rebuilt the request, names the push by its key, beside its command count and expected tally, where the plan's procedure shows the file it wrote: at GKB2's and at GKB's, 4 lines in all. Each step ended with status 0 and its closing line.",
            "why": "The tool, as saved from the plan's appendix, prints the key where the procedure's text of the line shows the file's path: the two differ in the line's wording only.",
            "when": "Stages S1 and S2 · the push preparation and the request steps"
          },
          {
            "what": "The force-push's first step printed two shell error lines naming files of the data folder, where the plan prints no machine-local path, at GKB2's and again at GKB's (2 lines each). They reached the console and the run log in the data folder, which is never committed; the step's result was unaffected and it ended with status 0.",
            "why": "Two reads of files the push itself writes redirect from files that do not exist before its first run, and the shell reports each failed redirection, with the file's path, before the command's own redirection of errors applies. Both values are empty, as a first run needs.",
            "when": "Stages S1 and S2 · the force-push, its first step"
          },
          {
            "what": "GKB2's push request ran under one id as two attempts: the first was stopped before any of its entries started, so no guard, dry run or push ran and `master` read back at its old tip; the second carried out the six entries once, with status 0. The request was sent once, so its one stored reply reports attempt 2 where the request's line said attempt 1. The read-back after the first attempt was made directly against the remote and the record folder, outside the stage runner, so the run log does not hold it; the run holds the equivalent: the second attempt's stored reply carries the third guard's marker, `SERVER-HEADS-AND-TAGS-ARE-THE-OLD-COLUMN`, printed before its push, and the activity feed, 19 entries at readiness, held 20 with exactly 1 forced update after the close-out (GKB's 9, then 10 with exactly 1).",
            "why": "The plan counts an attempt as the number of stored replies plus one and names no second run of a request that was not carried out; the first attempt's answer is of a kind the plan does not store.",
            "when": "Stage S1 · the force-push, its request sent"
          },
          {
            "what": "The push's result is kept as its printed lines alone, one per line and in order, nothing added or dropped, where the plan's procedure keeps the text as it comes: 11 lines after its status header for each repository, GKB2's and GKB's alike, with no history id and no path. With it the outcome check printed the expected `CLASS pushed` for each repository.",
            "why": "The result comes as one document holding the printed lines as list entries on a single line, and the classifier reads a status line only where it starts a line: on the text as it comes it finds no status and would class a successful push as a guard's stop.",
            "when": "Stages S1 and S2 · the force-push, its result stored"
          },
          {
            "what": "Each request's procedure ran as its six entries in one shell, once, with status 0, as each request asked, where the self-test's stand-in for carrying out a request, on which the plan's component self-test rests, runs each entry in a shell of its own.",
            "why": "The result is the same for this procedure: every entry sets the values it uses, as the plan's design of the requests requires, and every guard ends the shell, so no entry runs after a guard's stop either way. A procedure that carried a value from one entry to the next would behave differently under the two (`consequences.md` §4).",
            "when": "Stages S1 and S2 · the force-push, each request carried out"
          },
          {
            "what": "Each push request named its request file and carried the file's sha256 and a note, where the plan's design sends the file's contents as the request; the note asked for the six entries to run as one shell, unchanged and in order, in a single call, with every printed line in the reply. The checksum sent equals each request file as it stands and as the run records' checksum list holds it: GKB2's file of 9,199 bytes and GKB's of 9,154.",
            "why": "The request file is then carried out byte for byte, with nothing transcribed.",
            "when": "Stages S1 and S2 · the force-push, each request sent"
          },
          {
            "what": "The request file carries the expected tally at its top level as well as inside its inputs, ten fields in all, the two copies equal in each repository's file; the plan's field table lists it only among the inputs.",
            "why": "The request tool, as saved from the plan's appendix, writes it at both places, and its own self-test asserts the ten fields in their order: the table is one field short of the tool.",
            "when": "Stages S1 and S2 · the push preparation and the request steps",
            "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
          },
          {
            "what": "Each request carries machine-local paths: the mirror's, the paths under the mirror, the record folder and the tools folder that its procedure names, and the request file's own. The plan's output rule names a machine-local path among what a request never carries. What holds for a request: no history id, no line of a push's or a scan's streams and no secret, and the request file stays in the data folder, never committed.",
            "why": "Each entry of the procedure must say where it runs and what it reads, and the plan's own field table makes the mirror's path a field; the request is sent by reference to its file.",
            "when": "Stages S1 and S2 · the force-push, each request",
            "link": "../architecture.md#11-what-the-phase-must-achieve"
          },
          {
            "what": "The classifier gives `stopped-by-guard` only to a reply that holds neither a dry-run nor a push status; a reply with a push status is classed from the push, one with a dry-run status alone from the dry run, a lost connection at the dry run reading `transport` and a guard's stop after a passing dry run `unclassified`, which hands back. The plan's table gives `stopped-by-guard` to any procedure that stopped on a guard with no push status.",
            "why": "The tool as saved reads the statuses by stage. This is read from the tool's text, not from a run: neither request stopped on a guard. The difference errs toward a stop, never toward a push repeated.",
            "when": "Stages S1 and S2 · the force-push, its outcome classed",
            "link": "research/force-push-and-push-protection.md#6-recommendation-for-this-repository"
          },
          {
            "what": "The tool allows a request to be sent again after `stopped-by-guard` and after `refused-by-service`, each with the branch at its old tip and the pull-request refs unchanged, as the plan's table of classes and the text beneath it do; the plan's flowchart draws a resend only after a lost connection with the branch at its old tip, and a failed guard only as a hand-back.",
            "why": "The tool follows the class table. No resend was needed: each push was classed `pushed` from its one stored reply.",
            "when": "Stages S1 and S2 · the force-push, the request step",
            "link": "research/force-push-and-push-protection.md#6-recommendation-for-this-repository"
          }
        ],
        "statements": [
          {
            "text": "Each repository's push preparation passed: the mirror's local pull-request refs removed, the expected tally written and the server's refs equal to the clone's record. Its confirmation line names the push by its key where the plan's procedure shows the file it wrote, at GKB2's and at GKB's preparation and again where each request step rebuilt the request (4 lines in all). The request file it writes carries the expected tally at its top level as well as among its inputs, the two copies equal, a field more than the plan's table of a request lists.",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          },
          {
            "text": "For each repository `master` alone was pushed once, under the lease on its recorded old tip, after the guards and a dry run of the same line; the dry run and the push each showed the expected tally, the same ref and flag. Each push request named its request file with the file's sha256 in place of the file's contents, and asked for its six entries to run in one shell, as they ran, where the self-test's stand-in runs each in a shell of its own, with the same result. The first request step of each repository printed two shell error lines naming files of the data folder, which reached only the console and the run log kept there. Each request carried machine-local paths, the mirror's, its record and tools folders' and its request file's, as the plan's own design of a request needs, where the plan's output rule names a path among what a request never carries; neither request held a history id, a line of a push's or a scan's streams or a secret, and both stay in the data folder.",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          },
          {
            "text": "Each outcome was read from the tally, the exit status and the fixed markers counted in the kept streams, from the push's result kept as its printed lines alone, one per line and in order, where the plan keeps the text as it comes: 11 lines after the status header for each repository, with no history id and no path. Kept as it comes, a reply holding neither status line reads as a guard's stop, or as a refusal under a refused status: after a push that landed the check stops falsely, and after one refused it offers the request again where the plan hands a refusal back. It never reads a false `pushed`, and the guards and the lease keep the remote safe either way; the tools hand that reading on (`consequences.md` §5).",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          },
          {
            "text": "Both outcomes took the class `pushed`, with no refusal marker; no refusal came, so no stop was taken. The classifier as saved reads statuses by stage where the plan's table classes a guard's stop: a reply with neither a dry-run nor a push status is `stopped-by-guard`, any other is classed from its push status, else from its dry run's, and a guard's stop after a passing dry run reads `unclassified`, which hands back. Read from the tool, as no request stopped on a guard, it errs toward a stop, never toward a push repeated.",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          },
          {
            "text": "GKB2's push was carried out on the second attempt of one request: the first ran none of its entries and changed nothing, and a read-back showed `master` still at its old tip; its one stored reply reports attempt 2 where the request's line said attempt 1. The run's records bear it out: the second attempt's reply carries the guard's marker that the server's heads and tags still equalled the old ones before its push, and the activity feed went from 19 entries to 20 with exactly 1 forced update. GKB's push was carried out on its first attempt (its feed 9 entries, then 10 with exactly 1). The tool allows a request again after a guard's stop and after the request's refusal (`refused-by-service`), each with the branch at its old tip and the pull-request refs unchanged, as the plan's table of classes does, where the plan's flowchart draws one only after a lost connection; none was needed.",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          },
          {
            "text": "On two channels each server read back as recorded: GKB2 holds 1 rewritten head, no tag and 1 pull-request ref, and GKB 1 rewritten head, no tag and no pull-request ref.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "numbered",
        "statements": [
          {
            "text": "Delete the mirror's local pull-request refs, write the expected tally and compare the server's refs with the clone's record before the push is prepared.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Push `refs/heads/master` alone, with a lease on its old tip read from `ref-map` at run time, to the repository's URL, after the guards repeated in the procedure and a dry run of the same line; no `--force`, `--mirror`, `--atomic` or `+` refspec.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The form. Per repository, from its bare mirror, after the rewrite's checks and the push preparation:",
              "hash": "1ea6d20d9d6f"
            }
          },
          {
            "text": "Read the outcome from the tally, the exit status and fixed markers counted in the kept streams, never from `Done` and never by printing the streams.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The form. Per repository, from its bare mirror, after the rewrite's checks and the push preparation:",
              "hash": "1ea6d20d9d6f"
            }
          },
          {
            "text": "Give every outcome a class; every refusal leaves the remote unchanged and stops the unit.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The form. Per repository, from its bare mirror, after the rewrite's checks and the push preparation:",
              "hash": "1ea6d20d9d6f"
            }
          },
          {
            "text": "Send a push again only where it never ran or never reached the server and a read-back shows the branch still at its old tip; never repeat it blindly.",
            "ref": "plan.md#the-push",
            "excerpt": {
              "ref": "plan.md#the-push",
              "heading": "The push",
              "paragraph": "The form. Per repository, from its bare mirror, after the rewrite's checks and the push preparation:",
              "hash": "1ea6d20d9d6f"
            }
          },
          {
            "text": "Verify each push on two channels, `git ls-remote` and the REST branch listing, against the rewritten heads, with no tag and the pull-request refs as recorded; a failure stops the unit with the tally, and the other repository waits.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          }
        ],
        "defense": "A force-push in place cannot be taken back. The one-branch form with a lease cannot create, delete or touch the pull-request refs and cannot overwrite a branch that moved, which a mirror push cannot promise; the guard beside it catches any ref changed since the clone.",
        "steps": [
          {
            "id": "S1.5, S2.5",
            "what": "Prepare the push: local pull-request refs deleted, the expected tally written, the server read against the clone's record.",
            "check": "`forced=1 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0 done=1`, `STAGE <repo>.p5 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          },
          {
            "id": "S1.6, S2.6",
            "what": "Send the push with its guards and dry run, store the reply, classify the outcome and read the branch back.",
            "check": "`CLASS pushed`, the branch at its new tip, `STAGE <repo>.p6 OK`",
            "link": "plan.md#the-push"
          },
          {
            "id": "S1.7, S2.7",
            "what": "Verify the remote's refs on two channels.",
            "check": "`STAGE <repo>.p7 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          }
        ],
        "tests": [
          "L2 component — `g26_req.py` self-test (59 checks, every row of the class table); the self-test's lease refusing a moved branch, a push-protection refusal, a transport failure and its resend, and an answer lost after a push that landed",
          "L3 integration — the dry run, the push and the two-channel verification on GitHub, once per repository",
          "L4a deterministic — the expected tally from `ref-map`"
        ],
        "risks": [
          "Push protection for users refuses a supported secret in a rewritten history: the remote stays unchanged and the unit stops",
          "A dry run never shows a refusal made on the server",
          "Whether GitHub's receive path checks the update's old value cannot be observed; the guard and the reads after the push stand either way"
        ],
        "source": "plan.md The push; Steps 1 to 9 of a repository; Risks and edge cases",
        "link": "plan.md#the-push"
      }
    },
    {
      "id": "exit-tests",
      "group": "After the push",
      "name": "A fresh mirror of each repository and its exit tests",
      "system": "rewrite-pipeline",
      "where": "`BotWS/fresh/GKB2.git` · `BotWS/fresh/GKB.git`",
      "gap": {
        "kind": "missing",
        "summary": "Nothing yet shows, from what GitHub serves, that GKB2's and GKB's branches and tags are clean. The unit is done when each has every branch and tag clean on a fresh mirror and every count equal to its expectation; the workspace's scan configuration has changed since the backups were scanned.",
        "evidence": [
          "`../architecture.md:643` — the fresh mirror and exit tests: the expectation check, the gitleaks branches-and-tags scan, the all-refs scan measured where a pull-request ref exists, the manifest against what branches and tags and all refs reach",
          "`../24-repository-hygiene/consequences.md:158` — the new workspace configuration; its one table is inert in these repositories, so their scans report as before",
          "`../24-repository-hygiene/consequences.md:160` — the two stale pins: the readiness checks take the new value"
        ],
        "source": "../architecture.md §6.4 stage 8; ../24-repository-hygiene/consequences.md §4",
        "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
      },
      "options": [
        {
          "id": "fresh-mirror-exit-tests",
          "name": "On a fresh mirror: `expect_check.py` with `--scope heads`, plus `--all-commits` for GKB2; the branches-and-tags scan reading `RESULT: CLEAN`; the all-refs scan equal to it for GKB and measured for GKB2; the manifest reached by branches and tags 0 times",
          "verdict": "accepted",
          "why": "The fresh mirror is what GitHub serves after the push, so the proof does not rest on the local mirror the rewrite ran in.",
          "source": "../architecture.md §6.4 stage 8",
          "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "A fresh mirror of each repository was taken after its push was verified.",
            "state": "as-planned"
          },
          {
            "text": "Each fresh mirror's heads, tags, pull-request refs and commits on every ref equalled the table: 45 commits on every ref for GKB2, 9 for GKB.",
            "state": "as-planned"
          },
          {
            "text": "Both passed the expectation check on branches and tags, reached no manifest blob from them, and scanned clean on branches and tags.",
            "state": "as-planned"
          },
          {
            "text": "GKB's scan of every ref was clean, as its branches' was, and no manifest blob is reachable from any of its refs (113 distinct blobs). GKB2's read 66 findings of the five custom rules in the old history behind the pull-request ref, recorded by rule; through that ref 70 of its 81 manifest blobs stay reachable (11 missing, 281 distinct blobs on every ref), as predicted.",
            "state": "as-planned"
          },
          {
            "text": "No custom-rule finding came on either fresh mirror's branches and tags, so the unit did not stop.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Take a fresh mirror of each repository after its verification, anew on every run.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Check its heads, tags, pull-request refs and its commits on every ref against the table: 45 for GKB2, 9 for GKB.",
            "ref": "plan.md#expected-values",
            "excerpt": {
              "ref": "plan.md#expected-values",
              "heading": "Expected values",
              "paragraph": "",
              "hash": "deb7918786e9"
            }
          },
          {
            "text": "Run the expectation check on branches and tags, find no manifest blob reachable from them, and scan branches and tags, expecting `RESULT: CLEAN`.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Scan every ref too: for GKB its verdict must equal the branches', and for GKB2 it reads the old history behind the pull-request ref and is recorded by rule.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "A custom-rule finding after the push stops the unit, since the remote already holds the rewrite.",
            "ref": "plan.md#stops-and-the-state-each-leaves",
            "excerpt": {
              "ref": "plan.md#stops-and-the-state-each-leaves",
              "heading": "Stops and the state each leaves",
              "paragraph": "",
              "hash": "b774141a4409"
            }
          }
        ],
        "defense": "The fresh mirror is what GitHub serves after the push, so the proof does not rest on the mirror the rewrite ran in.",
        "steps": [
          {
            "id": "S1.8, S2.8",
            "what": "Take the fresh mirror and run the exit tests.",
            "check": "GKB2 `residual_blobs=70 manifest=81`, GKB `residual_blobs=0 manifest=58`, `RESULT: CLEAN` on branches and tags, `STAGE <repo>.p8 OK`",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          }
        ],
        "tests": [
          "L2 component — the self-test's steps 1 to 9 end to end on two made-up repositories",
          "L3 integration — the fresh mirror from GitHub, its expectation check and its scans",
          "L4b end-to-end — the readiness stage to the close-out as one run"
        ],
        "risks": [
          "GKB2's pull-request ref keeps its old history on every ref, so its all-refs scan finds the purged files there: recorded, not a stop"
        ],
        "source": "plan.md Steps 1 to 9 of a repository; Expected values; Test plan",
        "link": "plan.md#steps-1-to-9-of-a-repository"
      }
    },
    {
      "id": "default-rule-findings",
      "group": "After the push",
      "name": "A gitleaks default-rule finding in a kept file",
      "system": "rewrite-pipeline",
      "where": "the kept files of GKB2 and GKB",
      "gap": {
        "kind": "risk",
        "summary": "gitleaks' default rules have not yet been run on the rewritten histories' kept files. A finding there lies outside every purged path, so the rewrite cannot remove it; the positive controls on the untouched backups counted none in a kept file.",
        "evidence": [
          "`../architecture.md:653` — a default-rule finding in a kept file of a legacy repository is recorded by rule id and file count, and the unit continues",
          "`../consequences.md:264` — gitleaks' default rules have not been run on the legacy repositories' kept sources",
          "`../21-preparation/final-implementation.md:142` — findings in kept files: 0 in all five static repositories' backups"
        ],
        "source": "../architecture.md §6.4 stage 8, §16; ../consequences.md §5",
        "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
      },
      "options": [
        {
          "id": "record-and-follow-up",
          "name": "Record it in the as-built record by rule id and file count, with no path and no value, and make it a follow-up in the unit's consequences",
          "verdict": "accepted",
          "why": "The kept files of the public repositories are already public as they are, so the unit continues; nothing is pre-allowed and the rule set is not edited mid-run.",
          "source": "../architecture.md §6.4 stage 8, §16",
          "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
        },
        {
          "id": "stop-on-finding",
          "name": "Stop the work on such a finding, as KotlinBottools' change to public did",
          "verdict": "declined",
          "why": "In KotlinBottools the file would have become newly public; in GKB2 and GKB it is public already, and the rewrite cannot remove it.",
          "source": "../architecture.md §6.4 stage 8",
          "link": "../architecture.md#64-the-rewrite-pipeline-per-repository"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Neither repository had a default-rule finding, in the scan before its push or on its fresh mirror.",
            "state": "as-planned"
          },
          {
            "text": "With none, no follow-up came of it; the consequences keep that follow-up for a run that meets one.",
            "state": "as-planned"
          },
          {
            "text": "No finding of the five custom rules came on either repository's branches and tags, before the push or after it, so neither stop was taken.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Record a default-rule finding in a kept file by rule id and count, before the push and on the fresh mirror, and continue.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Make it a follow-up in the unit's consequences.",
            "ref": "plan.md#sequencing-and-follow-ups",
            "excerpt": {
              "ref": "plan.md#sequencing-and-follow-ups",
              "heading": "Sequencing and follow-ups",
              "paragraph": "Order. The owner's grant; `S0` (the plan's tools saved, the runner replaced, the readiness checks and the self-test); `S1` for GKB2 and, only when it has passed `S1.9`, `S2` for GKB; `S3`; then the landing's document checks and the documents. The unit starts after #25 has landed (it has) and blocks #27 and #28.",
              "hash": "7449f128dffb"
            }
          },
          {
            "text": "A finding of one of the five custom rules is a stop instead: before the push it discards the mirror, after it the unit stops with the tally.",
            "ref": "plan.md#stops-and-the-state-each-leaves",
            "excerpt": {
              "ref": "plan.md#stops-and-the-state-each-leaves",
              "heading": "Stops and the state each leaves",
              "paragraph": "",
              "hash": "b774141a4409"
            }
          }
        ],
        "defense": "The kept files of both repositories are public as they are, so such a finding exposes nothing new, and the rewrite cannot remove it.",
        "steps": [
          {
            "id": "S1.4, S2.4, S1.8, S2.8",
            "what": "Count default-rule findings in kept files in the scans before the push and on the fresh mirror.",
            "check": "a `RECORD` line per finding kind, rule ids and counts only",
            "link": "plan.md#steps-1-to-9-of-a-repository"
          }
        ],
        "tests": [
          "L2 component — the self-test records a default-rule finding and stops on a custom-rule one"
        ],
        "risks": [
          "A finding in a kept file is settled after the run: an allowlist for that one rule and path, or acceptance as recorded, with the credential rotated if it could still be live"
        ],
        "source": "plan.md Steps 1 to 9 of a repository; Sequencing and follow-ups",
        "link": "plan.md#steps-1-to-9-of-a-repository"
      }
    },
    {
      "id": "residual-probes",
      "group": "After the push",
      "name": "What GitHub still serves of the old histories, GKB2's pull-request residual included",
      "system": "residual-exposure",
      "where": "GKB2 and GKB, authenticated and anonymous · `BotLegacyData/rewrite/<repo>`",
      "gap": {
        "kind": "risk",
        "summary": "A force-push does not take the old histories out of reach. GitHub keeps serving unreferenced objects by id with no documented expiry, and GKB2's pull-request ref keeps 70 of its 81 purged blobs fetchable; for these two public repositories that exposure is not new, but it has not been measured.",
        "evidence": [
          "`../architecture.md:278` — GitHub serves unreferenced objects by id on every route, with no documented expiry",
          "`../architecture.md:709` — the expected pull-request residual is 70 of 81 for GKB2",
          "`../consequences.md:61` — 70 of GKB2's 81 purged blobs stay fetchable through its pull-request ref; for the public repositories this exposure is not new",
          "`../25-kotlinbottools-publish/consequences.md:108` — this unit takes the corrected anonymous probe rules for its public repositories"
        ],
        "source": "../architecture.md §2.4, §6.6; ../consequences.md §2.1",
        "link": "../architecture.md#66-residual-exposure-measurement"
      },
      "options": [
        {
          "id": "status-only-probes",
          "name": "Status-only probes, authenticated and anonymous, of every old branch tip, every first-changed commit, their trees and a sample of at most 60 manifest blobs, with a positive and a negative control; a protocol-v2 `want` of each old tip; the activity feed's ids; the fresh mirror's reachability counts",
          "verdict": "accepted",
          "why": "Every result is a tally, with no id or body printed; every old object is expected to be still served, and the residual is measured and reported, never claimed removed.",
          "source": "../architecture.md §6.6, §16",
          "link": "../architecture.md#66-residual-exposure-measurement"
        },
        {
          "id": "support-ticket",
          "name": "A GitHub Support ticket to drop the pull-request ref and the cached views",
          "verdict": "declined",
          "why": "The phase opens no Support ticket for any repository: GKB2's pull-request ref and every cached view stay, and the residual is measured instead.",
          "source": "../architecture.md §4",
          "link": "../architecture.md#4-non-goals"
        },
        {
          "id": "reuse-probe-sh",
          "name": "Reuse the rewrite and swap unit's `probe.sh` and `k14-residual.sh`",
          "verdict": "declined",
          "why": "They read every 422 as absent and never checked the HTTP status of a `want`; the corrected route rules read a 422 from `git/trees` as present and need HTTP 200 with the body read.",
          "source": "plan.md The tools",
          "link": "plan.md#the-tools"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "Each repository's old branch tip, first-changed commit, their trees and its sample of manifest blobs (41 of GKB2's 81, 58 of GKB's 58) were probed authenticated and anonymous, each batch between its controls. GitHub still serves every id probed, 2 commits, 2 trees and the whole sample for each repository, and no answer differed from the expectation. No self-test case reaches the probes' own stop on a status outside a route's answers: the case meant for it ends as a void on the opening controls (`consequences.md` §5).",
            "state": "as-planned"
          },
          {
            "state": "as-planned",
            "text": "The anonymous budget was read before each repository's step 9 and before each second feed read at the close-out, and no set waited or met a budget stop. The readings, 60, 60, 18 and 16, did not all agree with the calls made: the second 60 came after GKB2's step 9 had made 21 anonymous calls, which left 39; why it read high is not established (`consequences.md` §5). Every gate held on the true values as well. Under a reading that passes the gate, a true value of 28 to 35 completes a step 9, 26 or 27 cuts one or both anonymous feed reads, and 25 or less stops a set."
          },
          {
            "text": "The activity feed and the events were read at each repository's probe step and again at the close-out, each second read more than 6 minutes after the first, and the second repeated the first: the activity feed lists 18 old GKB2 ids and 9 old GKB ids with 1 current id each, authenticated, on the web page and anonymous; the events list nothing yet, so 2 of 3 anonymous reads are valid for each repository.",
            "state": "as-planned"
          },
          {
            "text": "GKB2's pull-request residual was recorded as measured, a result and no stop: through the ref 70 of its 81 manifest blobs stay reachable (11 missing, 281 distinct blobs on every ref), as predicted.",
            "state": "as-planned"
          },
          {
            "text": "Each repository's report row was written in counts only, with what the probes cannot prove, and completed at the close-out with the second feed reads.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Probe each repository's old branch tip, first-changed commit, their trees and an evenly spaced sample of at most 60 manifest blobs (41 of GKB2's 81, 58 of GKB's 58), authenticated and anonymous, each batch between controls.",
            "ref": "plan.md#the-probes-step-9",
            "excerpt": {
              "ref": "plan.md#the-probes-step-9",
              "heading": "The probes (step 9)",
              "paragraph": "Every result is a tally; nothing is printed but counts, statuses and fixed markers.",
              "hash": "1f6fded21b8e"
            }
          },
          {
            "text": "Read the anonymous REST budget first, and wait for its reset when it does not cover the set.",
            "ref": "plan.md#the-probes-step-9",
            "excerpt": {
              "ref": "plan.md#the-probes-step-9",
              "heading": "The probes (step 9)",
              "paragraph": "Every result is a tally; nothing is printed but counts, statuses and fixed markers.",
              "hash": "1f6fded21b8e"
            }
          },
          {
            "text": "Read the activity feed and the events for the old ids, and again at least 6 minutes later at the close-out.",
            "ref": "plan.md#s3--close-out",
            "excerpt": {
              "ref": "plan.md#s3--close-out",
              "heading": "S3 — Close-out",
              "paragraph": "After both repositories have passed step 9.",
              "hash": "8b7ff8549af9"
            }
          },
          {
            "text": "Record GKB2's pull-request residual as measured, 70 of 81 expected: a result, not a stop.",
            "ref": "plan.md#steps-1-to-9-of-a-repository",
            "excerpt": {
              "ref": "plan.md#steps-1-to-9-of-a-repository",
              "heading": "Steps 1 to 9 of a repository",
              "paragraph": "The nine steps are the same for both repositories: run them for GKB2 (`S1.1` to `S1.9`) and then, when GKB2 has passed `S1.9`, for GKB (`S2.1` to `S2.9`). `<repo>` is `GKB2` or `GKB`. A step marks its success in `$DATA/run/g26/status/`, and each step starts by requiring the marker of the one before; GKB's first step requires GKB2's last. A stop before `S?.6` discards the mirror: `g preset <repo>` copies the untouched backup back (`cp -a`), checks it against `backup.SHA256SUMS`, removes this unit's outputs of the repository and clears its markers, and the repository restarts at `S?.1`. …",
              "hash": "0798d5b14d88"
            }
          },
          {
            "text": "Write each repository's report row in counts only, with what the probes cannot prove.",
            "ref": "plan.md#the-probes-step-9",
            "excerpt": {
              "ref": "plan.md#the-probes-step-9",
              "heading": "The probes (step 9)",
              "paragraph": "Every result is a tally; nothing is printed but counts, statuses and fixed markers.",
              "hash": "1f6fded21b8e"
            }
          }
        ],
        "defense": "Every old object is expected to be still served: the unit measures the residual and claims no removal, and prints counts, statuses and fixed markers only.",
        "steps": [
          {
            "id": "S1.9, S2.9",
            "what": "Run the authenticated and anonymous probe sets, the feeds and the report row.",
            "check": "a tally line per batch, `STAGE <repo>.p9 OK`",
            "link": "plan.md#the-probes-step-9"
          },
          {
            "id": "S3",
            "what": "Read the feeds a second time, read both repositories again and complete the report rows with their checksums.",
            "check": "`STAGE S3.feeds OK`, `STAGE S3.reads OK`, `STAGE S3.record OK`",
            "link": "plan.md#s3--close-out"
          }
        ],
        "tests": [
          "L2 component — the self-test's route classification (14 cases), a void control, a bad status, the budget wait and the feeds",
          "L3 integration — the probes against the public site",
          "L4c non-functional — the anonymous budget and its wait, the pace and the feed spacing; the step's output holds no id and no path"
        ],
        "risks": [
          "The feeds lag: a read that lists no current id is not counted, and the events can lag up to 6 hours",
          "A throttle on a web or `want` route stops the set, which is run again later with fresh controls"
        ],
        "source": "plan.md The probes (step 9); Steps 1 to 9 of a repository; S3 — Close-out",
        "link": "plan.md#the-probes-step-9"
      }
    },
    {
      "id": "tools-handed-on",
      "group": "Tools",
      "name": "The workspace tools as the earlier units left them",
      "system": "rewrite-pipeline",
      "where": "`BotWS/tools`: `run-stage.sh`, `anon.sh` and the stage scripts",
      "gap": {
        "kind": "debt",
        "summary": "The tools this unit reuses carry gaps the earlier units left for it. The stage runner writes a run's arguments into the run log, to be fixed before GKB2 and GKB are rewritten; the anonymous helpers' stand-in cases write in the live scratch folder; and some reused tools' comments state less than the tools do.",
        "evidence": [
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:168` — `run-stage.sh` writes a run's arguments into the run log, fixed before GKB2 and GKB are rewritten",
          "`../25-kotlinbottools-publish/consequences.md:178` — the anonymous helpers' stand-in cases write and delete files in the live scratch folder, so a unit that reuses `anon.sh` runs them in a scratch folder of its own",
          "`../25-kotlinbottools-publish/consequences.md:181` — the tools' comments and docstrings change when a later unit saves a tool it reuses again"
        ],
        "source": "../23-kotlinbottools-rewrite-and-swap/consequences.md §5; ../25-kotlinbottools-publish/consequences.md §6",
        "link": "../23-kotlinbottools-rewrite-and-swap/consequences.md#5-known-gaps"
      },
      "options": [
        {
          "id": "parameter-table",
          "name": "The pipeline instantiated per repository from a parameter table holding the list, the expectation row, the control probes and the pull-request refs",
          "verdict": "accepted",
          "why": "Policy stays in files and constants, never inline in a command, and each repository keeps a stop of its own.",
          "source": "../architecture.md §13, §15",
          "link": "../architecture.md#15-decomposition"
        },
        {
          "id": "reuse-anon-sh",
          "name": "Reuse the publication unit's `anon.sh` as it is",
          "verdict": "declined",
          "why": "Its batch treats a served id as the trigger to revert and appends to that unit's record, and its stand-in cases write in the live scratch folder; the unit derives `ganon.sh`, with the same route rules, \"served\" as the expected answer and its stand-in cases in a scratch folder of their own.",
          "source": "plan.md The tools",
          "link": "plan.md#the-tools"
        },
        {
          "id": "update-stale-pins",
          "name": "Change `k0-ready.sh` and `save-tools.sh` to the current scan configuration",
          "verdict": "declined",
          "why": "Neither is run, and nothing re-saves the earlier configuration; this unit's own readiness check pins the current one, so a re-save is caught before any rewrite.",
          "source": "plan.md Current state; Non-goals",
          "link": "plan.md#non-goals"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "text": "The 22 tool files were saved from the plan and, with the 21 reused tools, held their recorded sizes and checksums (46 checks) before any step. One readiness step printed one `ok` line more than the plan's procedure expects.",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          },
          {
            "text": "The corrected runner replaced the first one before any stage it logs, and holds its new pin.",
            "state": "as-planned"
          },
          {
            "text": "The saved tools read each repository's policy from the parameter table and the expectation rows, and every step script takes the repository as its argument; the readiness inputs check read both repositories' rows against the data. Two tools besides the table name GKB2 and GKB: the readiness check's grant step, which looks for both targets by name, and the self-test, which selects the table's two rows by name for its fixtures; two header comments name them too.",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          },
          {
            "text": "The readiness check pinned the current scan configuration by size and checksum, and the version pins matched (7 checks); no readiness step ran the two workspace scripts that pin the earlier one.",
            "state": "as-planned"
          },
          {
            "text": "The self-test, whose stand-in cases run in a scratch folder of their own, passed 132 checks, the request tool's own 59 among them. On every run it prints an eight-line traceback on the way, three lines of which carry a path of its sandbox; they reach the console and the run log kept in the data folder. It runs as one script, which cannot be run by test level, and its cases leave stops and branches of every tool unreached, two of which guard the one irreversible write or carry a correction made for the phase: the push step's stop for a branch still at its old tip whose last attempt allows no resend, and the void tally when a probe batch's closing controls fail. The list is not exhaustive; the next rewrite unit adds a case for every `expect` and every `STOP` of a step script (`consequences.md` §5).",
            "state": "amended",
            "ref": "final-implementation.md#4-deviations-from-the-plan",
            "excerpt": {
              "ref": "final-implementation.md#4-deviations-from-the-plan",
              "heading": "4. Deviations from the plan",
              "paragraph": "Each deviation names the section of `plan.md` it departs from, why, and what that part of the plan rested on.",
              "hash": "b05b100ca30d"
            }
          }
        ],
        "changes": [
          {
            "what": "One readiness step printed eight `ok` lines and one `RECORD` line, where the plan's procedure expects seven `ok` lines and one `RECORD` line (eight `ok` lines when its wording matches); it ended with status 0 and its `STAGE` line.",
            "why": "The tool, as saved from the plan, makes eight checks before it compares the wording, so it prints one `ok` line more than the procedure's text counts; the `RECORD` line is the plan's own case of a wording that differs from its text.",
            "when": "Stage S0 · readiness"
          },
          {
            "what": "A passing self-test prints an eight-line traceback, three lines of which carry a path of its sandbox under the workspace, where the plan prints no machine-local path. The lines reach the console and the run log in the data folder, which is never committed; the self-test ended with 132 checks passed and status 0.",
            "why": "Where it prepares a made-up checkout for the landing's document checks, the self-test's first call of the expression scrubber runs before the folder of its output file exists, with only its standard output discarded: the tool ends with a traceback, and the alternative branch then makes the folder and runs it again, which succeeds. It happens on every run.",
            "when": "Stage S0 · the self-test, and every run of it"
          },
          {
            "what": "Two tools besides the parameter table name GKB2 and GKB: the readiness check's grant step holds both target names, to check that the grant's scope names both, and the self-test selects the table's two rows by those names for its fixtures' probe arguments and names one target where it makes a grant lack it; two header comments name them as well. Every step script takes the repository as its argument, as the plan says.",
            "why": "The plan has no script but the parameter table name the repositories; the as-built record gives the places, outside the step scripts. A new repository therefore needs edits in those two tools as well as rows in the table (`consequences.md` §4).",
            "when": "Stage S0 · the tools saved from the plan"
          },
          {
            "what": "The tools' comments as built: the probe route rules that the authenticated and the anonymous probes share are in `g26lib.sh`, as `ganon.sh`'s own header says, where the plan's documentation map places them in `ganon.sh`, which holds the anonymous calls, the budget read and the feed reads; and the tools' scripts carry a header comment and line comments on some of their steps, `g26_req.py` one folding region (its self-test) and five shell scripts `# ---` section comments, which do not fold, where the map says nothing of the tools' own comments.",
            "why": "The map spoke of the repository's code, in which no Kotlin changes; the tool files are saved to the workspace from the plan's appendix and are in no repository. The route rules come from the publication unit's research.",
            "when": "Stage S0 · the tools saved from the plan",
            "link": "../25-kotlinbottools-publish/research/README.md#2-the-anonymous-measurements-and-the-access-check"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Save the unit's tools from the plan into the workspace and check each by size and sha256 before any step.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written to GitHub; everything is a read, a local check or a self-test. The only files written are the tools, the corrected runner, the one record `records-at-s0.<repo>.sums` and the folders the scripts create.",
              "hash": "f67e33c6dbdb"
            }
          },
          {
            "text": "Replace the stage runner first with a version whose log start line names the stage and shows an argument only when it is a plain word, every other as `<arg>`.",
            "ref": "plan.md#the-corrected-runner",
            "excerpt": {
              "ref": "plan.md#the-corrected-runner",
              "heading": "The corrected runner",
              "paragraph": "`run-stage.sh` is replaced by a version whose only change is the start line of the log: it names the stage, and shows an argument verbatim only when it is a plain word (1 to 40 characters from `A-Z a-z 0-9 . _ = -` that are not a hexadecimal word of 7 or more digits); every other argument is shown as `<arg>`. The script still receives each argument unchanged, and the exit status, the output and the end line are as before. `S0.runner` checks that the runner in place is the recorded original, saves the corrected one over it and checks the new pin; it runs directly, not through the runner it …",
              "hash": "6e0807e3e00e"
            }
          },
          {
            "text": "Read each repository's policy from a parameter table and the preparation unit's expectation rows; no script but the table names GKB2 or GKB.",
            "ref": "plan.md#parameters",
            "excerpt": {
              "ref": "plan.md#parameters",
              "heading": "Parameters",
              "paragraph": "Policy is a file, not a command (architecture §13). `params.txt` holds one row per repository: its id, its branch, the repository whose step 9 must have passed first, the purge list's line count, byte count and sha256, the refs the server advertised at the clone (branches and pull-request refs), the commits a fresh mirror holds on every ref, the expected residual, the bound on the manifest sample and the positive control's probe arguments. The expectation rows (commits, pruned commits, paths, blobs, the bound on the largest blob, the wrapper jar and the pinned variant) are read from …",
              "hash": "605467b44d63"
            }
          },
          {
            "text": "Pin the current scan configuration in the readiness check; the two workspace scripts that pin the earlier one are neither changed nor run.",
            "ref": "plan.md#s0--readiness",
            "excerpt": {
              "ref": "plan.md#s0--readiness",
              "heading": "S0 — Readiness",
              "paragraph": "Nothing is written to GitHub; everything is a read, a local check or a self-test. The only files written are the tools, the corrected runner, the one record `records-at-s0.<repo>.sums` and the folders the scripts create.",
              "hash": "f67e33c6dbdb"
            }
          },
          {
            "text": "Run the anonymous helper's stand-in cases in a scratch folder of their own.",
            "ref": "plan.md#the-tools",
            "excerpt": {
              "ref": "plan.md#the-tools",
              "heading": "The tools",
              "paragraph": "All new tools live in `$WS/tools/g26/`, saved from Appendix A by `S0.save` and checked by size and sha256 in `S0.tools`. They are copied with the workspace tools at the phase's cleanup. Each step is a script run through the corrected runner, `bash \"$TOOLS/run-stage.sh\" g26/<script> <repo> [argument]`, so its output reaches `DATA/run/as-run.log` with the repository's name shown. No script but the parameter table names GKB2 or GKB.",
              "hash": "13e3acfcd802"
            }
          }
        ],
        "defense": "The tools serve the next rewrite unit too, which adds its rows instead of copying scripts; the runner is corrected before the first stage it logs.",
        "steps": [
          {
            "id": "S0",
            "what": "Save the tools, replace the runner, check the tools and the configuration at their recorded bytes and the version pins, and run the self-tests.",
            "check": "`STAGE S0.runner OK`, `STAGE S0.tools OK`, `ok    gselftest: 132 checks passed`",
            "link": "plan.md#s0--readiness"
          }
        ],
        "tests": [
          "L1 gating — the tools' sizes and sha256 values, the parse checks and the version pins",
          "L2 component — the runner's masking of a path, an id, a word with a space, a 41-character word and a newline, and its refusal of a runner that is neither the original nor the corrected one"
        ],
        "risks": [
          "A tool that no longer matches its recorded bytes stops the readiness stage: it is not the tested one"
        ],
        "source": "plan.md The tools; The corrected runner; Parameters; S0 — Readiness",
        "link": "plan.md#the-corrected-runner"
      }
    },
    {
      "id": "archiving",
      "group": "Left for later",
      "name": "GKB2 and GKB archived, with a README pointer",
      "system": "rewrite-pipeline",
      "where": "Phase 17, #16",
      "gap": {
        "kind": "missing",
        "summary": "The two repositories stay live and public after the rewrite. Their archiving with README pointers, and any new `.gitignore`, belong to Phase 17, once all six purges are done.",
        "evidence": [
          "`../architecture.md:344` — no new `.gitignore` and no README pointer commit for the five legacy repositories; the pointer commits belong to Phase 17",
          "`../consequences.md:49` — their archiving with README pointers is Phase 17's",
          "`../consequences.md:231` — #16, Phase 17, archives GKB2, GKB, BotTools, TrumpBot and Support once all six purges are done"
        ],
        "source": "../architecture.md §4; ../consequences.md §2.1, §4",
        "link": "../architecture.md#4-non-goals"
      },
      "options": [
        {
          "id": "left-to-phase-17",
          "name": "Left to Phase 17, #16",
          "verdict": "accepted",
          "why": "The visibility of GKB2 and GKB does not change in this phase; Phase 17 archives the predecessor repositories on top of their purged histories.",
          "source": "../architecture.md §4; ../consequences.md §2.1",
          "link": "../architecture.md#4-non-goals"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "GKB2 and GKB were left live and public, and nothing was committed to either beyond its rewritten history: at the close-out each read its one branch at its rewritten tip, public, not archived, default branch `master`.",
            "state": "as-planned"
          },
          {
            "text": "Their archiving with README pointers was left to Phase 17, #16, which archives the predecessor repositories once every purge of the phase is done.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "leave",
        "list": "bullets",
        "statements": [
          {
            "text": "Leave GKB2 and GKB live and public with every setting as it was: no commit in either repository, and no README, `.gitignore` or CHANGELOG.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No secret scanning or push protection on GKB2 or GKB. Both repositories are archived by Phase 17, not made scanned here. · No commit in a legacy repository, and none to add a README, a `.gitignore` or a CHANGELOG: Phase 17 archives them with README pointers (architecture §4). · No path scrub: the machine-local paths are replaced in KotlinBottools only. · No Support ticket, and `refs/pull/6/head` stays: GKB2's residual is measured, not removed. · No edit of GKB2's issues or its pull request, and no edit of #26's body. · No re-derivation of the manifests or the rows. They are re-verified …",
              "hash": "8769cd1a4df4"
            }
          },
          {
            "text": "Their archiving with README pointers stays with Phase 17.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No secret scanning or push protection on GKB2 or GKB. Both repositories are archived by Phase 17, not made scanned here. · No commit in a legacy repository, and none to add a README, a `.gitignore` or a CHANGELOG: Phase 17 archives them with README pointers (architecture §4). · No path scrub: the machine-local paths are replaced in KotlinBottools only. · No Support ticket, and `refs/pull/6/head` stays: GKB2's residual is measured, not removed. · No edit of GKB2's issues or its pull request, and no edit of #26's body. · No re-derivation of the manifests or the rows. They are re-verified …",
              "hash": "8769cd1a4df4"
            }
          }
        ],
        "defense": "The unit writes exactly two pushes to GitHub; Phase 17 archives the predecessor repositories once every purge of the phase is done.",
        "steps": [],
        "tests": [],
        "risks": [],
        "source": "plan.md Non-goals; What the unit writes to GitHub",
        "link": "plan.md#non-goals"
      }
    },
    {
      "id": "residual-report",
      "group": "Left for later",
      "name": "The phase's residual report",
      "system": "residual-exposure",
      "where": "unit 8, #28 · the report on #2",
      "gap": {
        "kind": "missing",
        "summary": "The residual report of the phase is compiled once every rewrite unit has run. Each rewrite unit's as-built record carries its repositories' rows, GKB2's pull-request residual among them, and unit 8 compiles them into one table posted on #2.",
        "evidence": [
          "`../architecture.md:1297` — each rewrite unit's as-built record carries its repositories' rows; unit 8 compiles them into one table and posts it on #2"
        ],
        "source": "../architecture.md §12.4",
        "link": "../architecture.md#124-the-report"
      },
      "options": [
        {
          "id": "rows-in-as-built",
          "name": "GKB2's and GKB's rows in this unit's as-built record; the table compiled and posted by `residual-report-and-cleanup`, #28",
          "verdict": "accepted",
          "why": "The report states what the exit tests proved and what they cannot prove: that GitHub has dropped the old objects, that cached views are gone, that no third-party copy exists.",
          "source": "../architecture.md §12.4, §15",
          "link": "../architecture.md#124-the-report"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "GKB2's and GKB's report rows, GKB2's pull-request residual among them, were completed and put under their checksum lists in the records the residual report and cleanup unit, #28, takes them from; with no default-rule finding, no such follow-up goes with them.",
            "state": "as-planned"
          },
          {
            "text": "No report was posted on #2: the phase's table waits for the remaining rewrite unit, #27, and is compiled and posted by #28.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "leave",
        "list": "bullets",
        "statements": [
          {
            "text": "Hand GKB2's and GKB's report rows, GKB2's pull-request residual and any default-rule follow-up to the residual report and cleanup unit, #28.",
            "ref": "plan.md#interfaces-with-sibling-units",
            "excerpt": {
              "ref": "plan.md#interfaces-with-sibling-units",
              "heading": "Interfaces with sibling units",
              "paragraph": "Expects from `preparation` (#21, landed):",
              "hash": "7d67c1e6d6bf"
            }
          },
          {
            "text": "Post no report on #2: it belongs to that unit.",
            "ref": "plan.md#non-goals",
            "excerpt": {
              "ref": "plan.md#non-goals",
              "heading": "Non-goals",
              "paragraph": "No secret scanning or push protection on GKB2 or GKB. Both repositories are archived by Phase 17, not made scanned here. · No commit in a legacy repository, and none to add a README, a `.gitignore` or a CHANGELOG: Phase 17 archives them with README pointers (architecture §4). · No path scrub: the machine-local paths are replaced in KotlinBottools only. · No Support ticket, and `refs/pull/6/head` stays: GKB2's residual is measured, not removed. · No edit of GKB2's issues or its pull request, and no edit of #26's body. · No re-derivation of the manifests or the rows. They are re-verified …",
              "hash": "8769cd1a4df4"
            }
          }
        ],
        "defense": "The phase's report is compiled once every rewrite unit has run, from each unit's rows.",
        "steps": [],
        "tests": [],
        "risks": [],
        "source": "plan.md Interfaces with sibling units; Non-goals",
        "link": "plan.md#interfaces-with-sibling-units"
      }
    }
  ],
  "impact": {
    "basis": "plan",
    "summary": "No module is published and no version moves: the landing carries documents and generated boards only. What changes in public is the history of two repositories: `master` of GKB2 and of GKB is replaced by its rewritten history through one push of that ref, made only while the branch is at its recorded tip. GitHub keeps serving the old objects, and GKB2's pull-request ref keeps its old history fetchable (`consequences.md` §1 to §4; the known gaps, the tools' gaps as they ran among them, in §5; the follow-ups in §6).",
    "none": null,
    "release": {
      "bump": "none",
      "version": null,
      "note": "no module is published and no version moves",
      "nothingPublished": true
    },
    "downstream": [
      {
        "who": "GKB2 on GitHub",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "`master` holds the rewritten history: every commit id changes, 32 commits become 30, and 14 of the tip's 86 files leave. It stays public and unarchived with every setting as it was; `refs/pull/6/head` keeps 15 old commits and, by the prediction, 70 of the 81 purged blobs fetchable, and pull request #6 keeps showing its old commits.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "GKB on GitHub",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "`master` holds the rewritten history: every commit id changes, 11 commits become 9, and 54 of the tip's 114 files leave. It stays public and unarchived with every setting as it was, and has no pull-request ref.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Clones taken before the push",
        "kind": "consumer",
        "system": null,
        "effect": "behaviour",
        "summary": "They keep the old history, and their `master` shares no commit with the server's afterwards. Neither repository has a fork.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Links into the two histories",
        "kind": "consumer",
        "system": null,
        "effect": "behaviour",
        "summary": "A link to a pre-rewrite commit keeps resolving, since GitHub keeps serving the old objects; a link to a purged file on `master` no longer finds it. KotlinBottools' documents link GKB2's issues only, which the rewrite does not touch.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "The activity feed and the events",
        "kind": "repository",
        "system": "residual-exposure",
        "effect": "additive",
        "summary": "Each records the push with the old tip as its `before`: one more published pre-rewrite id, as every earlier entry already holds.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "The machine that runs the procedure",
        "kind": "operator",
        "system": "rewrite-pipeline",
        "effect": "additive",
        "summary": "The two mirrors are rewritten beside their untouched backups, a fresh mirror of each is taken, the unit's tools are saved and the stage runner replaced by its corrected version; the records go to the data folder, never committed, printed or quoted. The run log there gains this unit's lines, 7 of which name a file of the data folder or of the self-test's sandbox, and none a 40-digit id.",
        "link": "consequences.md#22-this-machine"
      },
      {
        "who": "KotlinBottools' documents and boards",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "The unit's research, plan, as-built record and consequences, dated notes on the parent design and on the earlier units' consequences, and the regenerated boards; no README change and no CHANGELOG entry.",
        "link": "consequences.md#23-documents-and-generated-boards"
      }
    ],
    "adaptation": [
      {
        "who": "The phase's remaining force-pushes",
        "system": "rewrite-pipeline",
        "need": "required",
        "summary": "A rewritten history is pushed by a refspec push with an explicit lease on each branch's recorded old tip, after the guard and a dry run, never by a mirror push, with the table of classes that reads a refusal by counting fixed markers.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "The next rewrite unit, #27",
        "system": null,
        "need": "required",
        "summary": "It takes the corrected runner, the tools with the parameter table, to which it adds its rows, the lease push with its guards, tally and classes, the readiness pattern and `ganon.sh`. Two tools name GKB2 and GKB outside the table, so a new repository needs edits there too, and before its run it closes the tools' gaps the follow-ups name. BotTools has two branches and two pull-request refs, so its push needs one request per branch or `--atomic`; TrumpBot and Support are private, so they have no anonymous probes.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "The residual report and cleanup, #28",
        "system": null,
        "need": "required",
        "summary": "It takes GKB2's and GKB's report rows with GKB2's pull-request residual, any default-rule finding by rule id and count, the tools to copy at cleanup and the records with their checksum lists.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md §1 to §6; plan.md Interfaces with sibling units",
    "link": "consequences.md#2-blast-radius",
    "changes": [
      {
        "entry": "downstream.5",
        "system": "rewrite-pipeline",
        "what": "The run log in the data folder holds 7 lines that name a file of the data folder or of the self-test's sandbox: 4 from the push step's first request, 2 at each repository, and 3 from the self-test's traceback, where the plan prints no machine-local path.",
        "why": "Two reads in the push step redirect from files that do not exist before its first run, and the self-test calls a tool before its output folder exists; the shell and the tool report each with its path (the as-built record, deviations 3 and 6).",
        "when": "Stages S0 to S2 · the self-test and the push step's first request"
      },
      {
        "entry": "adaptation.1",
        "what": "The next rewrite unit's adoption grows: two tools besides the parameter table name the repositories, so a new repository needs edits there as well as rows, and the tools carry gaps it closes before its run (the stored reply's form, the untested stops, the self-test by test level, the output rule everywhere, the budget's reading, the close-out run twice).",
        "why": "The as-built record's deviation 7 and the tools' gaps as they ran (`consequences.md` §5, §6).",
        "when": "Correction · the as-built record and the consequences"
      }
    ]
  },
  "tests": {
    "updated": "2026-11-13T08:22:24Z",
    "added": [
      {
        "class": "s0-ready.sh",
        "module": "tools/g26",
        "testLevel": "1",
        "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/plan.md",
        "tests": 128,
        "stage": "S0",
        "result": {
          "state": "passed",
          "passed": 128,
          "failed": 0,
          "skipped": 0,
          "at": "2026-11-13T05:53:30Z"
        }
      },
      {
        "class": "gselftest.sh",
        "module": "tools/g26",
        "testLevel": "2",
        "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/plan.md",
        "tests": 132,
        "stage": "S0",
        "result": {
          "state": "passed",
          "passed": 132,
          "failed": 0,
          "skipped": 0,
          "at": "2026-11-13T07:10:24Z",
          "pass": 1
        }
      },
      {
        "class": "g26_req.py selftest",
        "module": "tools/g26",
        "testLevel": "2",
        "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/26-gkb2-gkb-rewrite/plan.md",
        "tests": 59,
        "stage": "S0",
        "result": {
          "state": "passed",
          "passed": 59,
          "failed": 0,
          "skipped": 0,
          "pass": 1,
          "at": "2026-11-13T07:10:24Z"
        }
      }
    ],
    "amended": [],
    "relevant": [
      {
        "class": "GKB2 steps 1 to 9 (p1-prerun.sh to p9-residual.sh)",
        "module": "tools/g26",
        "tests": 135,
        "result": {
          "state": "passed",
          "passed": 135,
          "failed": 0,
          "skipped": 0,
          "at": "2026-11-13T06:21:02Z"
        }
      },
      {
        "class": "GKB steps 1 to 9 (p1-prerun.sh to p9-residual.sh)",
        "module": "tools/g26",
        "tests": 135,
        "result": {
          "state": "passed",
          "passed": 135,
          "failed": 0,
          "skipped": 0,
          "at": "2026-11-13T06:29:37Z"
        }
      },
      {
        "class": "s3-close.sh",
        "module": "tools/g26",
        "tests": 19,
        "result": {
          "state": "passed",
          "passed": 19,
          "failed": 0,
          "skipped": 0,
          "at": "2026-11-13T06:35:55Z"
        }
      },
      {
        "class": "gdocs.sh",
        "module": "tools/g26",
        "tests": 22,
        "result": {
          "state": "passed",
          "passed": 22,
          "failed": 0,
          "skipped": 0,
          "at": "2026-11-13T08:22:24Z"
        }
      }
    ]
  },
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
  },
  "followUps": [
    {
      "issue": 27,
      "title": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
      "note": "reuses this unit's tools and, before its run, takes the follow-ups `consequences.md` §6 names: the stored reply read in its delivered form, a case for each untested stop, the self-test by test level, the output rule asserted everywhere, the budget's reading checked, the close-out safe to run twice, and its test plan filed by test level."
    }
  ],
  "documents": [],
  "notes": {
    "corrections": [
      {
        "what": "Eight As built statements referred to the as-built record's departures section by an anchor the record no longer has, `#deviations`: the section is now \"4. Deviations from the plan\", and the statements refer to `#4-deviations-from-the-plan`, their excerpts copied again from it. Rows: inputs-unchanged, force-push, tools-handed-on.",
        "when": "2026-11-13"
      }
    ]
  },
  "issueBoards": {
    "21": "../21-preparation/dashboard.html",
    "22": "../22-transfer-rehearsal/dashboard.html",
    "23": "../23-kotlinbottools-rewrite-and-swap/dashboard.html",
    "24": "../24-repository-hygiene/dashboard.html",
    "25": "../25-kotlinbottools-publish/dashboard.html"
  },
  "links": {
    "workBoard": "../../../index.html",
    "repoBoard": "../../../../dashboards/index.html"
  }
}
);
