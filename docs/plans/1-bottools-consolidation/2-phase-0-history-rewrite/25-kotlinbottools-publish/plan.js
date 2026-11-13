/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 25,
  "slug": "25-kotlinbottools-publish",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/25-kotlinbottools-publish",
  "kind": "issue",
  "title": "Make KotlinBottools public",
  "issueTitle": "Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection",
  "function": "KotlinBottools, the fresh repository the rewrite and swap made, is private, so every public link to one of its issues answers \"not found\", and it is unscanned: GitHub enables no scanning setting on its own for an organisation-owned repository, and the setting exists only once the repository is public. This run passes the third privacy gate and the id-reference check over everything that becomes public, then the pre-flip gate, makes the repository public and enables secret scanning and push protection in a separate update, then measures anonymously that no pre-rewrite id resolves, checks the access and confirms the secret scan green on `main`. Every write to GitHub is verified by reading it back. Unit 5 of #2, with no source change and no version moved.",
  "status": "building",
  "sized": "2026-11-12T04:44:41Z",
  "parent": {
    "issue": 2,
    "board": "../dashboard.html"
  },
  "fixOf": null,
  "branch": "chore/issue-25-make-repository-public",
  "baseline": {
    "ref": "main",
    "sha": "3d1b890",
    "date": "2026-11-11"
  },
  "asBuilt": null,
  "systems": [
    {
      "slug": "kotlinbottools",
      "name": "KotlinBottools",
      "slot": 0,
      "top": "KotlinBottools",
      "status": "built",
      "board": "docs/dashboards/index.html"
    }
  ],
  "wip": {
    "step": "document",
    "since": "2026-11-13T01:05:02Z",
    "updated": "2026-11-13T02:26:45Z",
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
    "plan": {
      "state": "re-pass",
      "from": "qa",
      "pass": 1,
      "since": "2026-11-12T23:59:25Z"
    },
    "stages": [
      {
        "id": "S1",
        "name": "Readiness",
        "state": "done",
        "rows": [],
        "brief": "The tools, the grant, the data records and the repository's state are as recorded, with the repository private and nothing written.",
        "kind": "check",
        "steps": [
          {
            "id": "S1.save",
            "name": "The tools and blocks saved"
          },
          {
            "id": "S1.tools",
            "name": "The tools at their recorded bytes"
          },
          {
            "id": "S1.selftests",
            "name": "The tools' self-tests"
          },
          {
            "id": "S1.grant",
            "name": "The grant read"
          },
          {
            "id": "S1.state",
            "name": "The repository and the records read"
          },
          {
            "id": "S1.ids",
            "name": "The id sets built"
          }
        ],
        "ref": "plan.md#s1--readiness",
        "started": "2026-11-12T19:49:25Z",
        "finished": "2026-11-12T21:11:38Z",
        "report": "Readiness passed: 84 of 84 checks hold over the saved tools and blocks, the tools' recorded bytes and self-tests, the temporary grant, the repository's state and the id sets, with the repository private and nothing written. The new bodies of issues 1 to 19 are built, audited and gated with 0 blocking hits, and the first of the nineteen edits is prepared. No deviation from the plan.",
        "result": "passed"
      },
      {
        "id": "S2",
        "name": "Issue texts",
        "state": "done",
        "rows": [
          "planning-branch-links",
          "issue-text-paths"
        ],
        "brief": "The bodies of issues 1 to 19 name `main` instead of the deleted planning branch, each edit read back.",
        "kind": "work",
        "steps": [
          {
            "id": "S2.texts",
            "name": "The new bodies built and audited"
          },
          {
            "id": "S2.gate",
            "name": "The new bodies gated"
          },
          {
            "id": "S2.edits",
            "name": "The nineteen edits",
            "steps": [
              {
                "id": "S2.edits.1",
                "name": "Issue 1"
              },
              {
                "id": "S2.edits.2",
                "name": "Issue 2"
              },
              {
                "id": "S2.edits.3",
                "name": "Issue 3"
              },
              {
                "id": "S2.edits.4",
                "name": "Issue 4"
              },
              {
                "id": "S2.edits.5",
                "name": "Issue 5"
              },
              {
                "id": "S2.edits.6",
                "name": "Issue 6"
              },
              {
                "id": "S2.edits.7",
                "name": "Issue 7"
              },
              {
                "id": "S2.edits.8",
                "name": "Issue 8"
              },
              {
                "id": "S2.edits.9",
                "name": "Issue 9"
              },
              {
                "id": "S2.edits.10",
                "name": "Issue 10"
              },
              {
                "id": "S2.edits.11",
                "name": "Issue 11"
              },
              {
                "id": "S2.edits.12",
                "name": "Issue 12"
              },
              {
                "id": "S2.edits.13",
                "name": "Issue 13"
              },
              {
                "id": "S2.edits.14",
                "name": "Issue 14"
              },
              {
                "id": "S2.edits.15",
                "name": "Issue 15"
              },
              {
                "id": "S2.edits.16",
                "name": "Issue 16"
              },
              {
                "id": "S2.edits.17",
                "name": "Issue 17"
              },
              {
                "id": "S2.edits.18",
                "name": "Issue 18"
              },
              {
                "id": "S2.edits.19",
                "name": "Issue 19"
              }
            ]
          },
          {
            "id": "S2.after",
            "name": "The remaining occurrences counted"
          }
        ],
        "ref": "plan.md#s2--the-issue-texts",
        "started": "2026-11-12T21:11:38Z",
        "finished": "2026-11-12T21:44:16Z",
        "report": "The bodies of issues 1 to 19 now name main instead of the deleted planning branch: nineteen edits, each read back with the intended body byte for byte and its sub-issue and blocked-by edges unchanged; 0 occurrences of the branch's name remain in the bodies and 0 edits failed to land. The stage ended at 21:44:16Z. Two deviations are recorded: the procedures of edits 1 to 18 ran in order but not demonstrably as one shell (edit 19 did), and the comments on #1 hold one mention of the branch that is not a blob link, where one remaining link was expected. The repository is private."
      },
      {
        "id": "S3",
        "name": "Gate 3's corpus",
        "state": "done",
        "rows": [
          "gate-3"
        ],
        "brief": "Everything that becomes public is gathered: a fresh mirror, the text dumps, the earlier revisions and the run logs.",
        "kind": "work",
        "steps": [
          {
            "id": "S3.mirror",
            "name": "A fresh mirror"
          },
          {
            "id": "S3.dumps",
            "name": "The text dumps"
          },
          {
            "id": "S3.revisions",
            "name": "The earlier revisions"
          },
          {
            "id": "S3.logs",
            "name": "The run logs"
          },
          {
            "id": "S3.corpus",
            "name": "The corpus file"
          }
        ],
        "ref": "plan.md#s3--gate-3s-corpus",
        "started": "2026-11-12T21:44:16Z",
        "finished": "2026-11-12T21:48:47Z",
        "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private."
      },
      {
        "id": "S4",
        "name": "Gate 3",
        "state": "done",
        "rows": [
          "gate-3",
          "issue-text-paths"
        ],
        "brief": "The privacy gate, the path count, the secret scans, the purged-blob manifest and the scrub's count pass over the corpus.",
        "kind": "check",
        "steps": [
          {
            "id": "S4.gate",
            "name": "The privacy gate"
          },
          {
            "id": "S4.paths",
            "name": "The machine-local path count"
          },
          {
            "id": "S4.scan",
            "name": "The secret scans"
          },
          {
            "id": "S4.manifest",
            "name": "The purged-blob manifest"
          },
          {
            "id": "S4.scrub",
            "name": "The scrub's zero count"
          }
        ],
        "ref": "plan.md#s4--gate-3",
        "finished": "2026-11-12T21:48:47Z",
        "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
        "result": "passed"
      },
      {
        "id": "S5",
        "name": "The id-reference check",
        "state": "done",
        "rows": [
          "id-reference-check"
        ],
        "brief": "No token in the public material resolves to a pre-rewrite commit apart from the expected ones.",
        "kind": "check",
        "steps": [
          {
            "id": "S5.check",
            "name": "The id-reference check"
          }
        ],
        "ref": "plan.md#s5--the-id-reference-check",
        "finished": "2026-11-12T21:48:47Z",
        "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
        "result": "passed"
      },
      {
        "id": "S6",
        "name": "The run on main",
        "state": "done",
        "rows": [
          "secret-scan-on-main"
        ],
        "brief": "The latest secret-scan run on `main` passed and every run's log holds only fixed shapes.",
        "kind": "check",
        "steps": [
          {
            "id": "S6.runs",
            "name": "The runs read"
          }
        ],
        "ref": "plan.md#s6--the-secret-scan-run-on-main",
        "finished": "2026-11-12T21:48:47Z",
        "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
        "result": "passed"
      },
      {
        "id": "S7",
        "name": "The pre-flip gate",
        "state": "done",
        "rows": [
          "pre-flip-gate"
        ],
        "brief": "Immediately before the change, every read shows the repository private and unchanged since the corpus was taken.",
        "kind": "check",
        "steps": [
          {
            "id": "S7.reads",
            "name": "The pre-flip reads"
          },
          {
            "id": "S7.sets",
            "name": "The probe sets and controls"
          },
          {
            "id": "S7.anon",
            "name": "The anonymous snapshot"
          },
          {
            "id": "S7.drift",
            "name": "The drift check and the requests"
          }
        ],
        "ref": "plan.md#s7--the-pre-flip-gate",
        "started": "2026-11-12T21:48:47Z",
        "finished": "2026-11-12T22:19:34Z",
        "report": "The pre-flip gate passed at 22:19:35Z: 29 of 29 checks hold over the pre-flip reads, the probe sets and controls, the anonymous snapshot and the drift check, with no drift since Gate 3's corpus was taken and the repository private. The plan was re-passed for one command of the gate's first step, which now reads main's scan configuration without a ref-and-path argument; the replaced plan is under superseded/. The workspace's scan configuration equals the one committed on main. The visibility request was sent at 22:20:15Z.",
        "result": "passed"
      },
      {
        "id": "S8",
        "name": "The change and the scanning settings",
        "state": "done",
        "rows": [
          "visibility-change",
          "scanning-settings"
        ],
        "brief": "The repository is public with secret scanning and push protection on, each read back.",
        "kind": "work",
        "steps": [
          {
            "id": "S8.public",
            "name": "The change to public",
            "state": "done",
            "finished": "2026-11-12T23:17:54Z"
          },
          {
            "id": "S8.security",
            "name": "The scanning settings",
            "state": "done",
            "finished": "2026-11-12T23:19:08Z"
          },
          {
            "id": "S8.alerts",
            "name": "The first alert read",
            "state": "done",
            "finished": "2026-11-12T23:19:09Z"
          }
        ],
        "ref": "plan.md#s8--the-change-and-the-scanning-settings",
        "started": "2026-11-12T22:19:34Z",
        "finished": "2026-11-12T23:19:09Z",
        "report": "The repository is public with secret scanning and push protection enabled, each read back. The visibility change ran between 23:17:14Z and 23:17:24Z, sending visibility only, and its read-back held at 23:17:54Z (public false). The scanning update ran between 23:18:36Z and 23:18:46Z, and its read-back held at 23:19:08Z: secret scanning and push protection enabled, the two paid settings disabled, the others absent. The gap between the two read-backs is 74 s. The first alert read at 23:19:09Z answered with 0 alerts, which does not show a finished scan. The visibility request was first sent at 22:20:15Z; the request service declined to run it three times before anything reached GitHub, so the change followed the pre-flip gate by 58 minutes."
      },
      {
        "id": "S9",
        "name": "The anonymous measurements",
        "state": "done",
        "rows": [
          "anonymous-measurements"
        ],
        "brief": "No pre-rewrite id is served or listed anonymously; otherwise the repository is made private again.",
        "kind": "check",
        "steps": [
          {
            "id": "S9.gate",
            "name": "The readiness gate",
            "state": "done",
            "finished": "2026-11-12T23:29:24Z"
          },
          {
            "id": "S9.batches",
            "name": "The route batches",
            "state": "done",
            "finished": "2026-11-12T23:29:24Z"
          },
          {
            "id": "S9.feeds",
            "name": "The first feed read",
            "state": "done",
            "finished": "2026-11-12T23:29:24Z"
          },
          {
            "id": "S9.second",
            "name": "The second pass and feed read",
            "state": "done",
            "finished": "2026-11-12T23:27:36Z"
          },
          {
            "id": "S9.revert",
            "name": "The revert, only on the trigger"
          }
        ],
        "ref": "plan.md#s9--the-anonymous-measurements",
        "started": "2026-11-12T23:19:09Z",
        "finished": "2026-11-12T23:28:20Z",
        "report": "S9 ended at 23:27:36Z: the readiness gate was open on its first poll, and no pre-rewrite id is served or listed anonymously, with 87 commits absent on the web route and 87 on the protocol route, 3 trees and 58 blobs absent on the protocol route, 3 commits, 3 trees and 6 blobs absent on the REST route, 14 commits absent in the second pass, and 0 old ids in 6 valid feed reads; the repository stays public. S10 ended at 23:28:05Z: the access check, reading only, found 0 deviations in its anonymous half and in its authenticated half, with 0 direct collaborators and forking allowed. S11 ended at 23:28:20Z: the second alert read at 23:28:12Z answered with 0 alerts, and the record holds the unit's counts. The repository reads public with secret scanning and push protection enabled.",
        "result": "passed"
      },
      {
        "id": "S10",
        "name": "The access check",
        "state": "done",
        "rows": [
          "access-check"
        ],
        "brief": "Reading only, the repository is reachable as a public repository should be and its settings are as recorded.",
        "kind": "check",
        "steps": [
          {
            "id": "S10.anon",
            "name": "The anonymous half",
            "state": "done",
            "finished": "2026-11-12T23:27:54Z"
          },
          {
            "id": "S10.auth",
            "name": "The authenticated half",
            "state": "done",
            "finished": "2026-11-12T23:28:05Z"
          }
        ],
        "ref": "plan.md#s10--the-access-check",
        "finished": "2026-11-12T23:28:20Z",
        "report": "S9 ended at 23:27:36Z: the readiness gate was open on its first poll, and no pre-rewrite id is served or listed anonymously, with 87 commits absent on the web route and 87 on the protocol route, 3 trees and 58 blobs absent on the protocol route, 3 commits, 3 trees and 6 blobs absent on the REST route, 14 commits absent in the second pass, and 0 old ids in 6 valid feed reads; the repository stays public. S10 ended at 23:28:05Z: the access check, reading only, found 0 deviations in its anonymous half and in its authenticated half, with 0 direct collaborators and forking allowed. S11 ended at 23:28:20Z: the second alert read at 23:28:12Z answered with 0 alerts, and the record holds the unit's counts. The repository reads public with secret scanning and push protection enabled.",
        "result": "passed"
      },
      {
        "id": "S11",
        "name": "The close",
        "state": "done",
        "rows": [
          "scanning-settings"
        ],
        "brief": "The second alert read and the record of the unit's counts and its row for the residual report.",
        "kind": "check",
        "steps": [
          {
            "id": "S11.alerts",
            "name": "The second alert read",
            "state": "done",
            "finished": "2026-11-12T23:28:12Z"
          },
          {
            "id": "S11.record",
            "name": "The record",
            "state": "done",
            "finished": "2026-11-12T23:28:20Z"
          }
        ],
        "ref": "plan.md#s11--the-close",
        "finished": "2026-11-12T23:28:20Z",
        "report": "S9 ended at 23:27:36Z: the readiness gate was open on its first poll, and no pre-rewrite id is served or listed anonymously, with 87 commits absent on the web route and 87 on the protocol route, 3 trees and 58 blobs absent on the protocol route, 3 commits, 3 trees and 6 blobs absent on the REST route, 14 commits absent in the second pass, and 0 old ids in 6 valid feed reads; the repository stays public. S10 ended at 23:28:05Z: the access check, reading only, found 0 deviations in its anonymous half and in its authenticated half, with 0 direct collaborators and forking allowed. S11 ended at 23:28:20Z: the second alert read at 23:28:12Z answered with 0 alerts, and the record holds the unit's counts. The repository reads public with secret scanning and push protection enabled.",
        "result": "passed"
      }
    ],
    "remediation": {
      "pass": 2,
      "route": "on-the-spot",
      "steps": [
        {
          "name": "The plan's wording corrected",
          "state": "done",
          "finished": "2026-11-13T00:47:56Z",
          "report": "The twelve wording corrections are made in the three documents. The plan cites the requirement that defines the revert trigger, names all five of the landing's reads in its summaries with the revert path from the further feed read, names the three stages that keep a marker, and its test plan rows state which checks read GitHub, which helpers and verifying reads have no case, and what each self-test replaces. The as-built record gains the measurements of the issue-text stage, states that the three refusals left no stored reply, and cites the one stamp that straddles a second by its epoch. The consequences state the anonymous REST budget as 48 calls in the hour and extend the known gap on what the stand-in cases reach. No command block or tool text changed: the 10 tool files and 43 blocks extracted from the plan equal the saved ones."
        },
        {
          "name": "The as-built record's three statements",
          "state": "done",
          "finished": "2026-11-13T00:47:56Z",
          "report": "The twelve wording corrections are made in the three documents. The plan cites the requirement that defines the revert trigger, names all five of the landing's reads in its summaries with the revert path from the further feed read, names the three stages that keep a marker, and its test plan rows state which checks read GitHub, which helpers and verifying reads have no case, and what each self-test replaces. The as-built record gains the measurements of the issue-text stage, states that the three refusals left no stored reply, and cites the one stamp that straddles a second by its epoch. The consequences state the anonymous REST budget as 48 calls in the hour and extend the known gap on what the stand-in cases reach. No command block or tool text changed: the 10 tool files and 43 blocks extracted from the plan equal the saved ones."
        },
        {
          "name": "The consequences' budget figure and known gap",
          "state": "done",
          "finished": "2026-11-13T00:47:56Z",
          "report": "The twelve wording corrections are made in the three documents. The plan cites the requirement that defines the revert trigger, names all five of the landing's reads in its summaries with the revert path from the further feed read, names the three stages that keep a marker, and its test plan rows state which checks read GitHub, which helpers and verifying reads have no case, and what each self-test replaces. The as-built record gains the measurements of the issue-text stage, states that the three refusals left no stored reply, and cites the one stamp that straddles a second by its epoch. The consequences state the anonymous REST budget as 48 calls in the hour and extend the known gap on what the stand-in cases reach. No command block or tool text changed: the 10 tool files and 43 blocks extracted from the plan equal the saved ones."
        }
      ]
    },
    "open": [],
    "event": {
      "name": "document",
      "at": "2026-11-13T02:26:45Z",
      "note": "6 of 6 tasks done"
    },
    "history": {
      "sizing": [
        {
          "since": null,
          "ended": "2026-11-12T04:44:41Z",
          "endedBy": "sized",
          "to": "plan"
        }
      ],
      "plan": [
        {
          "since": "2026-11-12T04:44:41Z",
          "ended": "2026-11-12T05:15:36Z",
          "endedBy": "halted",
          "to": "plan",
          "event": {
            "name": "sized",
            "at": "2026-11-12T04:44:41Z"
          },
          "detail": "Unit 5 of the history rewrite: the privacy gate and id-reference check over everything that becomes public, the gate before the visibility change, the visibility change, secret scanning and push protection enabled and verified, the anonymous measurements and the access check, and the secret-scan run on main confirmed green. Baseline: main at 3d1b890. No repository source changes; the landing carries the plan and the as-built record. Next: the plan is drafted, starting with the questions for the maintainer.",
          "plan": {
            "state": "re-pass",
            "from": "parent",
            "since": "2026-11-12T04:44:41Z"
          },
          "held": true,
          "asked": [
            {
              "text": "When does the visibility change happen: does the temporary grant of the writes start it, or does the run stop for an explicit go-ahead once every check before the change has passed?",
              "options": [
                "The grant starts it: one continuous procedure through the gates, the change, the scanning update and the measurements",
                "A stop before the change: a counts-only report, then the change only on an explicit go-ahead, with a re-check that nothing drifted",
                "Either of the two, but only after a named condition (a date, another unit, a licence file on main)"
              ],
              "answer": null,
              "asked": "2026-11-12T05:15:36Z",
              "answered": "2026-11-12T05:19:24Z"
            },
            {
              "text": "If a check after the visibility change fails, is the repository made private again?",
              "options": [
                "Report only: the repository stays public",
                "Make it private again on any finding",
                "Split by kind: private again only when a pre-rewrite id is served or listed anonymously; a secret-scanning alert or another deviation is reported"
              ],
              "answer": null,
              "asked": "2026-11-12T05:15:36Z",
              "answered": "2026-11-12T05:19:24Z"
            },
            {
              "text": "Does this unit correct the old issue texts before the visibility change (40 links to the deleted planning branch in the bodies of #1 to #19, #1's body naming that branch, #2's plan-folder line)?",
              "options": [
                "KotlinBottools issue bodies only, before Gate 3",
                "Those, plus the issue bodies in MagicBot and WebTools",
                "A separate issue does it first and blocks this unit",
                "None before the change: all stay follow-ups"
              ],
              "answer": null,
              "asked": "2026-11-12T05:15:36Z",
              "answered": "2026-11-12T05:19:24Z"
            },
            {
              "text": "Should the secret-scan check become a required status check on main, and which unit sets it?",
              "options": [
                "This unit, after the scanning update",
                "Phase 1, together with its own workflow's check",
                "No unit: the landing's merge condition stays the only enforcement"
              ],
              "answer": null,
              "asked": "2026-11-12T05:15:36Z",
              "answered": "2026-11-12T05:19:24Z"
            },
            {
              "text": "The committed boards hold 10 distinct pre-rewrite commit ids, 2 of them in text fields of the rewrite-and-swap unit's board; none resolves in the repository. Are they accepted?",
              "options": [
                "Accept all 10, recorded by count in a dated note, each probed after the change",
                "Accept the generated fields only; the two text-field ids are removed from the boards' current files first",
                "Treat them as a failed check: no visibility change"
              ],
              "answer": null,
              "asked": "2026-11-12T05:15:36Z",
              "answered": "2026-11-12T05:19:24Z"
            },
            {
              "text": "What does the access check cover, and may it change a setting?",
              "options": [
                "Read-only: anonymous reachability and a read-back of who can do what; deviations are reported",
                "The same, plus one settings write: approval required for workflow runs on pull requests from outside contributors",
                "The same, plus further settings at publication: description and topics, dependency alerts, private vulnerability reporting"
              ],
              "answer": null,
              "asked": "2026-11-12T05:15:36Z",
              "answered": "2026-11-12T05:19:24Z"
            }
          ]
        },
        {
          "since": "2026-11-12T05:19:24Z",
          "ended": "2026-11-12T05:22:33Z",
          "endedBy": "research-planning",
          "to": "research",
          "event": {
            "name": "resumed",
            "at": "2026-11-12T05:19:24Z"
          },
          "detail": "All six questions are answered. The grant of the writes starts one continuous procedure, with no stop before the visibility change. After the change the repository is made private again only when a pre-rewrite id is served or listed anonymously; a secret-scanning alert or another deviation is reported. The unit corrects the KotlinBottools issue bodies of #1 to #19 before Gate 3; the comment on #1 and the texts in MagicBot and WebTools stay follow-ups. The required status check is left to Phase 1 and recorded as a follow-up. All 10 pre-rewrite ids the boards hold are accepted, recorded by count and probed after the change. The access check is read-only. Next: research on the current behaviour of the visibility and scanning writes and of anonymous measurements after a change from private to public, then the plan.",
          "plan": {
            "state": "re-pass",
            "from": "parent",
            "since": "2026-11-12T04:44:41Z"
          }
        },
        {
          "since": "2026-11-12T18:13:42Z",
          "ended": "2026-11-12T19:27:03Z",
          "endedBy": "halted",
          "to": "plan",
          "event": {
            "name": "researched",
            "at": "2026-11-12T18:13:42Z"
          },
          "detail": "35 of 36 checks hold and none fails; one single-source wording stays unclear and nothing rests on it. The publication and scanning calls are unchanged since the phase's earlier findings; the anonymous measurement uses web and git-protocol routes with bracketed controls inside the anonymous REST budget.",
          "plan": {
            "state": "writing",
            "since": "2026-11-12T18:13:42Z"
          },
          "held": true,
          "asked": [
            {
              "text": "The phase design puts the scanning settings in the same minute as the visibility change, but each write is its own request and a repository write has taken about 2 to 3 minutes, so the settings would land about 2 to 4 minutes after the change. How is that gap handled?",
              "options": [
                "Send the scanning request the moment the visibility read-back holds, record both read-back times and report the gap",
                "Carry both writes in one request, which needs a combined action added to the request protocol first"
              ],
              "answer": null,
              "asked": "2026-11-12T19:27:03Z",
              "answered": "2026-11-12T19:47:48Z"
            },
            {
              "text": "The boards hold 10 distinct pre-rewrite commit ids at the committed tips and 13 over their history; three sit only in earlier versions of the repository work board. Does the acceptance of the 10 extend to all 13?",
              "options": [
                "Accept all 13, recorded by count and each probed after the change",
                "Accept the 10 at the tips only; the three in history are settled before the change"
              ],
              "answer": null,
              "asked": "2026-11-12T19:27:03Z",
              "answered": "2026-11-12T19:47:48Z"
            }
          ]
        },
        {
          "since": "2026-11-12T19:47:48Z",
          "ended": "2026-11-12T19:48:01Z",
          "endedBy": "plan-accepted",
          "to": "branch",
          "event": {
            "name": "resumed",
            "at": "2026-11-12T19:47:48Z"
          },
          "detail": "Both questions are answered. The scanning request is sent the moment the visibility read-back holds, both read-back times are recorded and the gap between them is reported; no combined write is added. All 13 pre-rewrite ids the boards hold over their history are accepted, 10 at the committed tips and three only in earlier versions of the repository work board, recorded by count and each probed after the change. The plan needs no change for either answer.",
          "plan": {
            "state": "writing",
            "since": "2026-11-12T18:13:42Z"
          }
        }
      ],
      "research": [
        {
          "since": "2026-11-12T05:22:33Z",
          "ended": "2026-11-12T05:36:00Z",
          "endedBy": "run-restarted",
          "to": "research",
          "event": {
            "name": "research-started",
            "at": "2026-11-12T05:25:48Z"
          },
          "detail": "Two questions: the calls that make the repository public, enable secret scanning and push protection, and make it private again; and the anonymous reads and the access check after the change.",
          "research": {
            "phase": "research",
            "drafted": 0,
            "since": {
              "planning": "2026-11-12T05:22:33Z",
              "research": "2026-11-12T05:25:48Z"
            }
          },
          "questions": [
            {
              "question": "publication-and-scanning-api",
              "rows": [
                "visibility-change",
                "scanning-settings"
              ],
              "findings": null,
              "state": "researching",
              "started": "2026-11-12T05:25:48Z"
            },
            {
              "question": "anonymous-reads-after-publication",
              "rows": [
                "anonymous-measurements",
                "access-check"
              ],
              "findings": null,
              "state": "researching",
              "started": "2026-11-12T05:25:48Z"
            }
          ],
          "outage": "the session ended while the research batch was running; the same conversation was resumed and its planning is continuing"
        },
        {
          "since": "2026-11-12T17:46:25Z",
          "ended": "2026-11-12T18:13:42Z",
          "endedBy": "researched",
          "to": "plan",
          "event": {
            "name": "verification-started",
            "at": "2026-11-12T18:07:38Z"
          },
          "detail": "35 load-bearing claims of the two findings files, and five observations, re-checked at their sources.",
          "research": {
            "phase": "complete",
            "drafted": 0,
            "since": {
              "planning": "2026-11-12T05:22:33Z",
              "research": "2026-11-12T05:25:48Z",
              "verification": "2026-11-12T18:07:38Z",
              "complete": "2026-11-12T18:13:42Z"
            }
          },
          "questions": [
            {
              "question": "publication-and-scanning-api",
              "rows": [
                "visibility-change",
                "scanning-settings"
              ],
              "findings": "research/publication-and-scanning-api.md",
              "state": "complete",
              "started": "2026-11-12T05:25:48Z",
              "returned": "2026-11-12T17:47:33Z"
            },
            {
              "question": "anonymous-reads-after-publication",
              "rows": [
                "anonymous-measurements",
                "access-check"
              ],
              "findings": "research/anonymous-reads-after-publication.md",
              "state": "complete",
              "started": "2026-11-12T05:25:48Z",
              "returned": "2026-11-12T18:07:04Z"
            }
          ]
        }
      ],
      "branch": [
        {
          "since": "2026-11-12T19:48:01Z",
          "ended": "2026-11-12T19:49:25Z",
          "endedBy": "branch-cut",
          "to": "implementation",
          "event": {
            "name": "plan-accepted",
            "at": "2026-11-12T19:48:01Z"
          },
          "detail": "Plan accepted; the branch is confirmed next.",
          "branch": "chore/issue-25-make-repository-public"
        }
      ],
      "implementation": [
        {
          "since": "2026-11-12T19:49:25Z",
          "ended": "2026-11-12T19:49:56Z",
          "endedBy": "run-restarted",
          "to": "implementation",
          "event": {
            "name": "branch-cut",
            "at": "2026-11-12T19:49:25Z"
          },
          "detail": "Branch chore/issue-25-make-repository-public confirmed: base main at 3d1b890, head a7c7764 locally and on origin, five research commits ahead of main and two behind it (main at 3596cbe), checked out in the main checkout.",
          "stages": [
            {
              "id": "S1",
              "name": "Readiness",
              "state": "current",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S1.save",
                  "name": "The tools and blocks saved"
                },
                {
                  "id": "S1.tools",
                  "name": "The tools at their recorded bytes"
                },
                {
                  "id": "S1.selftests",
                  "name": "The tools' self-tests"
                },
                {
                  "id": "S1.grant",
                  "name": "The grant read"
                },
                {
                  "id": "S1.state",
                  "name": "The repository and the records read"
                },
                {
                  "id": "S1.ids",
                  "name": "The id sets built"
                }
              ],
              "ref": "plan.md#s1--readiness",
              "brief": "The tools, the grant, the data records and the repository's state are as recorded, with the repository private and nothing written.",
              "started": "2026-11-12T19:49:25Z"
            },
            {
              "id": "S2",
              "name": "Issue texts",
              "state": "todo",
              "rows": [],
              "kind": "work",
              "steps": [
                {
                  "id": "S2.texts",
                  "name": "The new bodies built and audited"
                },
                {
                  "id": "S2.gate",
                  "name": "The new bodies gated"
                },
                {
                  "id": "S2.edits",
                  "name": "The nineteen edits"
                },
                {
                  "id": "S2.after",
                  "name": "The remaining occurrences counted"
                }
              ],
              "ref": "plan.md#s2--the-issue-texts",
              "brief": "The bodies of issues 1 to 19 name `main` instead of the deleted planning branch, each edit read back."
            },
            {
              "id": "S3",
              "name": "Gate 3's corpus",
              "state": "todo",
              "rows": [],
              "kind": "work",
              "steps": [
                {
                  "id": "S3.mirror",
                  "name": "A fresh mirror"
                },
                {
                  "id": "S3.dumps",
                  "name": "The text dumps"
                },
                {
                  "id": "S3.revisions",
                  "name": "The earlier revisions"
                },
                {
                  "id": "S3.logs",
                  "name": "The run logs"
                },
                {
                  "id": "S3.corpus",
                  "name": "The corpus file"
                }
              ],
              "ref": "plan.md#s3--gate-3s-corpus",
              "brief": "Everything that becomes public is gathered: a fresh mirror, the text dumps, the earlier revisions and the run logs."
            },
            {
              "id": "S4",
              "name": "Gate 3",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S4.gate",
                  "name": "The privacy gate"
                },
                {
                  "id": "S4.paths",
                  "name": "The machine-local path count"
                },
                {
                  "id": "S4.scan",
                  "name": "The secret scans"
                },
                {
                  "id": "S4.manifest",
                  "name": "The purged-blob manifest"
                },
                {
                  "id": "S4.scrub",
                  "name": "The scrub's zero count"
                }
              ],
              "ref": "plan.md#s4--gate-3",
              "brief": "The privacy gate, the path count, the secret scans, the purged-blob manifest and the scrub's count pass over the corpus."
            },
            {
              "id": "S5",
              "name": "The id-reference check",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S5.check",
                  "name": "The id-reference check"
                }
              ],
              "ref": "plan.md#s5--the-id-reference-check",
              "brief": "No token in the public material resolves to a pre-rewrite commit apart from the expected ones."
            },
            {
              "id": "S6",
              "name": "The run on main",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S6.runs",
                  "name": "The runs read"
                }
              ],
              "ref": "plan.md#s6--the-secret-scan-run-on-main",
              "brief": "The latest secret-scan run on `main` passed and every run's log holds only fixed shapes."
            },
            {
              "id": "S7",
              "name": "The pre-flip gate",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S7.reads",
                  "name": "The pre-flip reads"
                },
                {
                  "id": "S7.sets",
                  "name": "The probe sets and controls"
                },
                {
                  "id": "S7.anon",
                  "name": "The anonymous snapshot"
                },
                {
                  "id": "S7.drift",
                  "name": "The drift check and the requests"
                }
              ],
              "ref": "plan.md#s7--the-pre-flip-gate",
              "brief": "Immediately before the change, every read shows the repository private and unchanged since the corpus was taken."
            },
            {
              "id": "S8",
              "name": "The change and the scanning settings",
              "state": "todo",
              "rows": [],
              "kind": "work",
              "steps": [
                {
                  "id": "S8.public",
                  "name": "The change to public"
                },
                {
                  "id": "S8.security",
                  "name": "The scanning settings"
                },
                {
                  "id": "S8.alerts",
                  "name": "The first alert read"
                }
              ],
              "ref": "plan.md#s8--the-change-and-the-scanning-settings",
              "brief": "The repository is public with secret scanning and push protection on, each read back."
            },
            {
              "id": "S9",
              "name": "The anonymous measurements",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S9.gate",
                  "name": "The readiness gate"
                },
                {
                  "id": "S9.batches",
                  "name": "The route batches"
                },
                {
                  "id": "S9.feeds",
                  "name": "The first feed read"
                },
                {
                  "id": "S9.second",
                  "name": "The second pass and feed read"
                },
                {
                  "id": "S9.revert",
                  "name": "The revert, only on the trigger"
                }
              ],
              "ref": "plan.md#s9--the-anonymous-measurements",
              "brief": "No pre-rewrite id is served or listed anonymously; otherwise the repository is made private again."
            },
            {
              "id": "S10",
              "name": "The access check",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S10.anon",
                  "name": "The anonymous half"
                },
                {
                  "id": "S10.auth",
                  "name": "The authenticated half"
                }
              ],
              "ref": "plan.md#s10--the-access-check",
              "brief": "Reading only, the repository is reachable as a public repository should be and its settings are as recorded."
            },
            {
              "id": "S11",
              "name": "The close",
              "state": "todo",
              "rows": [],
              "kind": "check",
              "steps": [
                {
                  "id": "S11.alerts",
                  "name": "The second alert read"
                },
                {
                  "id": "S11.record",
                  "name": "The record"
                }
              ],
              "ref": "plan.md#s11--the-close",
              "brief": "The second alert read and the record of the unit's counts and its row for the residual report."
            }
          ],
          "outage": "the session stopped while the run waited for a permission; the same conversation was resumed"
        },
        {
          "since": "2026-11-12T21:03:35Z",
          "ended": "2026-11-12T21:50:23Z",
          "endedBy": "halted",
          "to": "implementation",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-12T21:48:47Z",
            "note": "S6 reported done; S7 current"
          },
          "detail": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
          "stages": [
            {
              "id": "S1",
              "name": "Readiness",
              "state": "done",
              "rows": [],
              "brief": "The tools, the grant, the data records and the repository's state are as recorded, with the repository private and nothing written.",
              "kind": "check",
              "steps": [
                {
                  "id": "S1.save",
                  "name": "The tools and blocks saved"
                },
                {
                  "id": "S1.tools",
                  "name": "The tools at their recorded bytes"
                },
                {
                  "id": "S1.selftests",
                  "name": "The tools' self-tests"
                },
                {
                  "id": "S1.grant",
                  "name": "The grant read"
                },
                {
                  "id": "S1.state",
                  "name": "The repository and the records read"
                },
                {
                  "id": "S1.ids",
                  "name": "The id sets built"
                }
              ],
              "ref": "plan.md#s1--readiness",
              "started": "2026-11-12T19:49:25Z",
              "finished": "2026-11-12T21:11:38Z",
              "report": "Readiness passed: 84 of 84 checks hold over the saved tools and blocks, the tools' recorded bytes and self-tests, the temporary grant, the repository's state and the id sets, with the repository private and nothing written. The new bodies of issues 1 to 19 are built, audited and gated with 0 blocking hits, and the first of the nineteen edits is prepared. No deviation from the plan.",
              "result": "passed"
            },
            {
              "id": "S2",
              "name": "Issue texts",
              "state": "done",
              "rows": [
                "planning-branch-links",
                "issue-text-paths"
              ],
              "brief": "The bodies of issues 1 to 19 name `main` instead of the deleted planning branch, each edit read back.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.texts",
                  "name": "The new bodies built and audited"
                },
                {
                  "id": "S2.gate",
                  "name": "The new bodies gated"
                },
                {
                  "id": "S2.edits",
                  "name": "The nineteen edits"
                },
                {
                  "id": "S2.after",
                  "name": "The remaining occurrences counted"
                }
              ],
              "ref": "plan.md#s2--the-issue-texts",
              "started": "2026-11-12T21:11:38Z",
              "finished": "2026-11-12T21:44:16Z",
              "report": "The bodies of issues 1 to 19 now name main instead of the deleted planning branch: nineteen edits, each read back with the intended body byte for byte and its sub-issue and blocked-by edges unchanged; 0 occurrences of the branch's name remain in the bodies and 0 edits failed to land. The stage ended at 21:44:16Z. Two deviations are recorded: the procedures of edits 1 to 18 ran in order but not demonstrably as one shell (edit 19 did), and the comments on #1 hold one mention of the branch that is not a blob link, where one remaining link was expected. The repository is private."
            },
            {
              "id": "S3",
              "name": "Gate 3's corpus",
              "state": "done",
              "rows": [
                "gate-3"
              ],
              "brief": "Everything that becomes public is gathered: a fresh mirror, the text dumps, the earlier revisions and the run logs.",
              "kind": "work",
              "steps": [
                {
                  "id": "S3.mirror",
                  "name": "A fresh mirror"
                },
                {
                  "id": "S3.dumps",
                  "name": "The text dumps"
                },
                {
                  "id": "S3.revisions",
                  "name": "The earlier revisions"
                },
                {
                  "id": "S3.logs",
                  "name": "The run logs"
                },
                {
                  "id": "S3.corpus",
                  "name": "The corpus file"
                }
              ],
              "ref": "plan.md#s3--gate-3s-corpus",
              "started": "2026-11-12T21:44:16Z",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private."
            },
            {
              "id": "S4",
              "name": "Gate 3",
              "state": "done",
              "rows": [
                "gate-3",
                "issue-text-paths"
              ],
              "brief": "The privacy gate, the path count, the secret scans, the purged-blob manifest and the scrub's count pass over the corpus.",
              "kind": "check",
              "steps": [
                {
                  "id": "S4.gate",
                  "name": "The privacy gate"
                },
                {
                  "id": "S4.paths",
                  "name": "The machine-local path count"
                },
                {
                  "id": "S4.scan",
                  "name": "The secret scans"
                },
                {
                  "id": "S4.manifest",
                  "name": "The purged-blob manifest"
                },
                {
                  "id": "S4.scrub",
                  "name": "The scrub's zero count"
                }
              ],
              "ref": "plan.md#s4--gate-3",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
              "result": "passed"
            },
            {
              "id": "S5",
              "name": "The id-reference check",
              "state": "done",
              "rows": [
                "id-reference-check"
              ],
              "brief": "No token in the public material resolves to a pre-rewrite commit apart from the expected ones.",
              "kind": "check",
              "steps": [
                {
                  "id": "S5.check",
                  "name": "The id-reference check"
                }
              ],
              "ref": "plan.md#s5--the-id-reference-check",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
              "result": "passed"
            },
            {
              "id": "S6",
              "name": "The run on main",
              "state": "done",
              "rows": [
                "secret-scan-on-main"
              ],
              "brief": "The latest secret-scan run on `main` passed and every run's log holds only fixed shapes.",
              "kind": "check",
              "steps": [
                {
                  "id": "S6.runs",
                  "name": "The runs read"
                }
              ],
              "ref": "plan.md#s6--the-secret-scan-run-on-main",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
              "result": "passed"
            },
            {
              "id": "S7",
              "name": "The pre-flip gate",
              "state": "current",
              "rows": [
                "pre-flip-gate"
              ],
              "brief": "Immediately before the change, every read shows the repository private and unchanged since the corpus was taken.",
              "kind": "check",
              "steps": [
                {
                  "id": "S7.reads",
                  "name": "The pre-flip reads"
                },
                {
                  "id": "S7.sets",
                  "name": "The probe sets and controls"
                },
                {
                  "id": "S7.anon",
                  "name": "The anonymous snapshot"
                },
                {
                  "id": "S7.drift",
                  "name": "The drift check and the requests"
                }
              ],
              "ref": "plan.md#s7--the-pre-flip-gate",
              "started": "2026-11-12T21:48:47Z"
            },
            {
              "id": "S8",
              "name": "The change and the scanning settings",
              "state": "todo",
              "rows": [
                "visibility-change",
                "scanning-settings"
              ],
              "brief": "The repository is public with secret scanning and push protection on, each read back.",
              "kind": "work",
              "steps": [
                {
                  "id": "S8.public",
                  "name": "The change to public"
                },
                {
                  "id": "S8.security",
                  "name": "The scanning settings"
                },
                {
                  "id": "S8.alerts",
                  "name": "The first alert read"
                }
              ],
              "ref": "plan.md#s8--the-change-and-the-scanning-settings"
            },
            {
              "id": "S9",
              "name": "The anonymous measurements",
              "state": "todo",
              "rows": [
                "anonymous-measurements"
              ],
              "brief": "No pre-rewrite id is served or listed anonymously; otherwise the repository is made private again.",
              "kind": "check",
              "steps": [
                {
                  "id": "S9.gate",
                  "name": "The readiness gate"
                },
                {
                  "id": "S9.batches",
                  "name": "The route batches"
                },
                {
                  "id": "S9.feeds",
                  "name": "The first feed read"
                },
                {
                  "id": "S9.second",
                  "name": "The second pass and feed read"
                },
                {
                  "id": "S9.revert",
                  "name": "The revert, only on the trigger"
                }
              ],
              "ref": "plan.md#s9--the-anonymous-measurements"
            },
            {
              "id": "S10",
              "name": "The access check",
              "state": "todo",
              "rows": [
                "access-check"
              ],
              "brief": "Reading only, the repository is reachable as a public repository should be and its settings are as recorded.",
              "kind": "check",
              "steps": [
                {
                  "id": "S10.anon",
                  "name": "The anonymous half"
                },
                {
                  "id": "S10.auth",
                  "name": "The authenticated half"
                }
              ],
              "ref": "plan.md#s10--the-access-check"
            },
            {
              "id": "S11",
              "name": "The close",
              "state": "todo",
              "rows": [
                "scanning-settings"
              ],
              "brief": "The second alert read and the record of the unit's counts and its row for the residual report.",
              "kind": "check",
              "steps": [
                {
                  "id": "S11.alerts",
                  "name": "The second alert read"
                },
                {
                  "id": "S11.record",
                  "name": "The record"
                }
              ],
              "ref": "plan.md#s11--the-close"
            }
          ],
          "held": true,
          "asked": [
            {
              "text": "The plan's command for comparing the scan configuration with main's fails on this machine's shell. How does the unit go on?",
              "options": [
                "The plan's command is corrected in a re-pass of the plan, and the pre-flip gate runs again from its first step",
                "The unit stops here with the repository private"
              ],
              "answer": null,
              "asked": "2026-11-12T21:50:23Z",
              "answered": "2026-11-12T22:11:51Z"
            }
          ]
        },
        {
          "since": "2026-11-12T22:11:51Z",
          "ended": "2026-11-12T23:29:39Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-12T23:28:20Z",
            "note": "S11 reported done; Quality Review next"
          },
          "detail": "S9 ended at 23:27:36Z: the readiness gate was open on its first poll, and no pre-rewrite id is served or listed anonymously, with 87 commits absent on the web route and 87 on the protocol route, 3 trees and 58 blobs absent on the protocol route, 3 commits, 3 trees and 6 blobs absent on the REST route, 14 commits absent in the second pass, and 0 old ids in 6 valid feed reads; the repository stays public. S10 ended at 23:28:05Z: the access check, reading only, found 0 deviations in its anonymous half and in its authenticated half, with 0 direct collaborators and forking allowed. S11 ended at 23:28:20Z: the second alert read at 23:28:12Z answered with 0 alerts, and the record holds the unit's counts. The repository reads public with secret scanning and push protection enabled.",
          "stages": [
            {
              "id": "S1",
              "name": "Readiness",
              "state": "done",
              "rows": [],
              "brief": "The tools, the grant, the data records and the repository's state are as recorded, with the repository private and nothing written.",
              "kind": "check",
              "steps": [
                {
                  "id": "S1.save",
                  "name": "The tools and blocks saved"
                },
                {
                  "id": "S1.tools",
                  "name": "The tools at their recorded bytes"
                },
                {
                  "id": "S1.selftests",
                  "name": "The tools' self-tests"
                },
                {
                  "id": "S1.grant",
                  "name": "The grant read"
                },
                {
                  "id": "S1.state",
                  "name": "The repository and the records read"
                },
                {
                  "id": "S1.ids",
                  "name": "The id sets built"
                }
              ],
              "ref": "plan.md#s1--readiness",
              "started": "2026-11-12T19:49:25Z",
              "finished": "2026-11-12T21:11:38Z",
              "report": "Readiness passed: 84 of 84 checks hold over the saved tools and blocks, the tools' recorded bytes and self-tests, the temporary grant, the repository's state and the id sets, with the repository private and nothing written. The new bodies of issues 1 to 19 are built, audited and gated with 0 blocking hits, and the first of the nineteen edits is prepared. No deviation from the plan.",
              "result": "passed"
            },
            {
              "id": "S2",
              "name": "Issue texts",
              "state": "done",
              "rows": [
                "planning-branch-links",
                "issue-text-paths"
              ],
              "brief": "The bodies of issues 1 to 19 name `main` instead of the deleted planning branch, each edit read back.",
              "kind": "work",
              "steps": [
                {
                  "id": "S2.texts",
                  "name": "The new bodies built and audited"
                },
                {
                  "id": "S2.gate",
                  "name": "The new bodies gated"
                },
                {
                  "id": "S2.edits",
                  "name": "The nineteen edits",
                  "steps": [
                    {
                      "id": "S2.edits.1",
                      "name": "Issue 1"
                    },
                    {
                      "id": "S2.edits.2",
                      "name": "Issue 2"
                    },
                    {
                      "id": "S2.edits.3",
                      "name": "Issue 3"
                    },
                    {
                      "id": "S2.edits.4",
                      "name": "Issue 4"
                    },
                    {
                      "id": "S2.edits.5",
                      "name": "Issue 5"
                    },
                    {
                      "id": "S2.edits.6",
                      "name": "Issue 6"
                    },
                    {
                      "id": "S2.edits.7",
                      "name": "Issue 7"
                    },
                    {
                      "id": "S2.edits.8",
                      "name": "Issue 8"
                    },
                    {
                      "id": "S2.edits.9",
                      "name": "Issue 9"
                    },
                    {
                      "id": "S2.edits.10",
                      "name": "Issue 10"
                    },
                    {
                      "id": "S2.edits.11",
                      "name": "Issue 11"
                    },
                    {
                      "id": "S2.edits.12",
                      "name": "Issue 12"
                    },
                    {
                      "id": "S2.edits.13",
                      "name": "Issue 13"
                    },
                    {
                      "id": "S2.edits.14",
                      "name": "Issue 14"
                    },
                    {
                      "id": "S2.edits.15",
                      "name": "Issue 15"
                    },
                    {
                      "id": "S2.edits.16",
                      "name": "Issue 16"
                    },
                    {
                      "id": "S2.edits.17",
                      "name": "Issue 17"
                    },
                    {
                      "id": "S2.edits.18",
                      "name": "Issue 18"
                    },
                    {
                      "id": "S2.edits.19",
                      "name": "Issue 19"
                    }
                  ]
                },
                {
                  "id": "S2.after",
                  "name": "The remaining occurrences counted"
                }
              ],
              "ref": "plan.md#s2--the-issue-texts",
              "started": "2026-11-12T21:11:38Z",
              "finished": "2026-11-12T21:44:16Z",
              "report": "The bodies of issues 1 to 19 now name main instead of the deleted planning branch: nineteen edits, each read back with the intended body byte for byte and its sub-issue and blocked-by edges unchanged; 0 occurrences of the branch's name remain in the bodies and 0 edits failed to land. The stage ended at 21:44:16Z. Two deviations are recorded: the procedures of edits 1 to 18 ran in order but not demonstrably as one shell (edit 19 did), and the comments on #1 hold one mention of the branch that is not a blob link, where one remaining link was expected. The repository is private."
            },
            {
              "id": "S3",
              "name": "Gate 3's corpus",
              "state": "done",
              "rows": [
                "gate-3"
              ],
              "brief": "Everything that becomes public is gathered: a fresh mirror, the text dumps, the earlier revisions and the run logs.",
              "kind": "work",
              "steps": [
                {
                  "id": "S3.mirror",
                  "name": "A fresh mirror"
                },
                {
                  "id": "S3.dumps",
                  "name": "The text dumps"
                },
                {
                  "id": "S3.revisions",
                  "name": "The earlier revisions"
                },
                {
                  "id": "S3.logs",
                  "name": "The run logs"
                },
                {
                  "id": "S3.corpus",
                  "name": "The corpus file"
                }
              ],
              "ref": "plan.md#s3--gate-3s-corpus",
              "started": "2026-11-12T21:44:16Z",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private."
            },
            {
              "id": "S4",
              "name": "Gate 3",
              "state": "done",
              "rows": [
                "gate-3",
                "issue-text-paths"
              ],
              "brief": "The privacy gate, the path count, the secret scans, the purged-blob manifest and the scrub's count pass over the corpus.",
              "kind": "check",
              "steps": [
                {
                  "id": "S4.gate",
                  "name": "The privacy gate"
                },
                {
                  "id": "S4.paths",
                  "name": "The machine-local path count"
                },
                {
                  "id": "S4.scan",
                  "name": "The secret scans"
                },
                {
                  "id": "S4.manifest",
                  "name": "The purged-blob manifest"
                },
                {
                  "id": "S4.scrub",
                  "name": "The scrub's zero count"
                }
              ],
              "ref": "plan.md#s4--gate-3",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
              "result": "passed"
            },
            {
              "id": "S5",
              "name": "The id-reference check",
              "state": "done",
              "rows": [
                "id-reference-check"
              ],
              "brief": "No token in the public material resolves to a pre-rewrite commit apart from the expected ones.",
              "kind": "check",
              "steps": [
                {
                  "id": "S5.check",
                  "name": "The id-reference check"
                }
              ],
              "ref": "plan.md#s5--the-id-reference-check",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
              "result": "passed"
            },
            {
              "id": "S6",
              "name": "The run on main",
              "state": "done",
              "rows": [
                "secret-scan-on-main"
              ],
              "brief": "The latest secret-scan run on `main` passed and every run's log holds only fixed shapes.",
              "kind": "check",
              "steps": [
                {
                  "id": "S6.runs",
                  "name": "The runs read"
                }
              ],
              "ref": "plan.md#s6--the-secret-scan-run-on-main",
              "finished": "2026-11-12T21:48:47Z",
              "report": "S3 ended at 21:46:27Z: a fresh mirror, the text dumps (35 numbers, 3 pull requests), 44 earlier revisions, the logs of 4 runs and the corpus file. S4 ended at 21:48:23Z: Gate 3 holds, with 0 blocking hits of the privacy gate, 0 machine-local paths in 3019 texts, 0 findings of both history scans over 107 commits and of the tree scan, the purged-blob manifest and the scrub's zero count. S5 ended at 21:48:37Z: the id-reference check holds, with 10 distinct ids in the boards at the tips and 13 over every version, none outside the expected fields, 35 tokens of the 3 accepted ids in comments, and 0 tokens in the phase documents, the commit messages, the revisions and the run logs. S6 ended at 21:48:47Z: the latest secret-scan run on main passed and all 4 run logs hold only fixed shapes. One deviation: the revisions dump holds 44 earlier revisions where 26 were expected. The repository is private.",
              "result": "passed"
            },
            {
              "id": "S7",
              "name": "The pre-flip gate",
              "state": "done",
              "rows": [
                "pre-flip-gate"
              ],
              "brief": "Immediately before the change, every read shows the repository private and unchanged since the corpus was taken.",
              "kind": "check",
              "steps": [
                {
                  "id": "S7.reads",
                  "name": "The pre-flip reads"
                },
                {
                  "id": "S7.sets",
                  "name": "The probe sets and controls"
                },
                {
                  "id": "S7.anon",
                  "name": "The anonymous snapshot"
                },
                {
                  "id": "S7.drift",
                  "name": "The drift check and the requests"
                }
              ],
              "ref": "plan.md#s7--the-pre-flip-gate",
              "started": "2026-11-12T21:48:47Z",
              "finished": "2026-11-12T22:19:34Z",
              "report": "The pre-flip gate passed at 22:19:35Z: 29 of 29 checks hold over the pre-flip reads, the probe sets and controls, the anonymous snapshot and the drift check, with no drift since Gate 3's corpus was taken and the repository private. The plan was re-passed for one command of the gate's first step, which now reads main's scan configuration without a ref-and-path argument; the replaced plan is under superseded/. The workspace's scan configuration equals the one committed on main. The visibility request was sent at 22:20:15Z.",
              "result": "passed"
            },
            {
              "id": "S8",
              "name": "The change and the scanning settings",
              "state": "done",
              "rows": [
                "visibility-change",
                "scanning-settings"
              ],
              "brief": "The repository is public with secret scanning and push protection on, each read back.",
              "kind": "work",
              "steps": [
                {
                  "id": "S8.public",
                  "name": "The change to public",
                  "state": "done",
                  "finished": "2026-11-12T23:17:54Z"
                },
                {
                  "id": "S8.security",
                  "name": "The scanning settings",
                  "state": "done",
                  "finished": "2026-11-12T23:19:08Z"
                },
                {
                  "id": "S8.alerts",
                  "name": "The first alert read",
                  "state": "done",
                  "finished": "2026-11-12T23:19:09Z"
                }
              ],
              "ref": "plan.md#s8--the-change-and-the-scanning-settings",
              "started": "2026-11-12T22:19:34Z",
              "finished": "2026-11-12T23:19:09Z",
              "report": "The repository is public with secret scanning and push protection enabled, each read back. The visibility change ran between 23:17:14Z and 23:17:24Z, sending visibility only, and its read-back held at 23:17:54Z (public false). The scanning update ran between 23:18:36Z and 23:18:46Z, and its read-back held at 23:19:08Z: secret scanning and push protection enabled, the two paid settings disabled, the others absent. The gap between the two read-backs is 74 s. The first alert read at 23:19:09Z answered with 0 alerts, which does not show a finished scan. The visibility request was first sent at 22:20:15Z; the request service declined to run it three times before anything reached GitHub, so the change followed the pre-flip gate by 58 minutes."
            },
            {
              "id": "S9",
              "name": "The anonymous measurements",
              "state": "done",
              "rows": [
                "anonymous-measurements"
              ],
              "brief": "No pre-rewrite id is served or listed anonymously; otherwise the repository is made private again.",
              "kind": "check",
              "steps": [
                {
                  "id": "S9.gate",
                  "name": "The readiness gate",
                  "state": "done",
                  "finished": "2026-11-12T23:29:24Z"
                },
                {
                  "id": "S9.batches",
                  "name": "The route batches",
                  "state": "done",
                  "finished": "2026-11-12T23:29:24Z"
                },
                {
                  "id": "S9.feeds",
                  "name": "The first feed read",
                  "state": "done",
                  "finished": "2026-11-12T23:29:24Z"
                },
                {
                  "id": "S9.second",
                  "name": "The second pass and feed read",
                  "state": "done",
                  "finished": "2026-11-12T23:27:36Z"
                },
                {
                  "id": "S9.revert",
                  "name": "The revert, only on the trigger"
                }
              ],
              "ref": "plan.md#s9--the-anonymous-measurements",
              "started": "2026-11-12T23:19:09Z",
              "finished": "2026-11-12T23:28:20Z",
              "report": "S9 ended at 23:27:36Z: the readiness gate was open on its first poll, and no pre-rewrite id is served or listed anonymously, with 87 commits absent on the web route and 87 on the protocol route, 3 trees and 58 blobs absent on the protocol route, 3 commits, 3 trees and 6 blobs absent on the REST route, 14 commits absent in the second pass, and 0 old ids in 6 valid feed reads; the repository stays public. S10 ended at 23:28:05Z: the access check, reading only, found 0 deviations in its anonymous half and in its authenticated half, with 0 direct collaborators and forking allowed. S11 ended at 23:28:20Z: the second alert read at 23:28:12Z answered with 0 alerts, and the record holds the unit's counts. The repository reads public with secret scanning and push protection enabled.",
              "result": "passed"
            },
            {
              "id": "S10",
              "name": "The access check",
              "state": "done",
              "rows": [
                "access-check"
              ],
              "brief": "Reading only, the repository is reachable as a public repository should be and its settings are as recorded.",
              "kind": "check",
              "steps": [
                {
                  "id": "S10.anon",
                  "name": "The anonymous half",
                  "state": "done",
                  "finished": "2026-11-12T23:27:54Z"
                },
                {
                  "id": "S10.auth",
                  "name": "The authenticated half",
                  "state": "done",
                  "finished": "2026-11-12T23:28:05Z"
                }
              ],
              "ref": "plan.md#s10--the-access-check",
              "finished": "2026-11-12T23:28:20Z",
              "report": "S9 ended at 23:27:36Z: the readiness gate was open on its first poll, and no pre-rewrite id is served or listed anonymously, with 87 commits absent on the web route and 87 on the protocol route, 3 trees and 58 blobs absent on the protocol route, 3 commits, 3 trees and 6 blobs absent on the REST route, 14 commits absent in the second pass, and 0 old ids in 6 valid feed reads; the repository stays public. S10 ended at 23:28:05Z: the access check, reading only, found 0 deviations in its anonymous half and in its authenticated half, with 0 direct collaborators and forking allowed. S11 ended at 23:28:20Z: the second alert read at 23:28:12Z answered with 0 alerts, and the record holds the unit's counts. The repository reads public with secret scanning and push protection enabled.",
              "result": "passed"
            },
            {
              "id": "S11",
              "name": "The close",
              "state": "done",
              "rows": [
                "scanning-settings"
              ],
              "brief": "The second alert read and the record of the unit's counts and its row for the residual report.",
              "kind": "check",
              "steps": [
                {
                  "id": "S11.alerts",
                  "name": "The second alert read",
                  "state": "done",
                  "finished": "2026-11-12T23:28:12Z"
                },
                {
                  "id": "S11.record",
                  "name": "The record",
                  "state": "done",
                  "finished": "2026-11-12T23:28:20Z"
                }
              ],
              "ref": "plan.md#s11--the-close",
              "finished": "2026-11-12T23:28:20Z",
              "report": "S9 ended at 23:27:36Z: the readiness gate was open on its first poll, and no pre-rewrite id is served or listed anonymously, with 87 commits absent on the web route and 87 on the protocol route, 3 trees and 58 blobs absent on the protocol route, 3 commits, 3 trees and 6 blobs absent on the REST route, 14 commits absent in the second pass, and 0 old ids in 6 valid feed reads; the repository stays public. S10 ended at 23:28:05Z: the access check, reading only, found 0 deviations in its anonymous half and in its authenticated half, with 0 direct collaborators and forking allowed. S11 ended at 23:28:20Z: the second alert read at 23:28:12Z answered with 0 alerts, and the record holds the unit's counts. The repository reads public with secret scanning and push protection enabled.",
              "result": "passed"
            }
          ]
        }
      ],
      "qa": [
        {
          "since": "2026-11-12T23:29:39Z",
          "ended": "2026-11-12T23:59:25Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-12T23:29:39Z",
            "note": "Quality Review 1: running"
          },
          "detail": "Quality Review 1 running.",
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
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/25-kotlinbottools-publish/ca070e8d/tests/index.html"
            }
          ]
        },
        {
          "since": "2026-11-13T00:12:56Z",
          "ended": "2026-11-13T00:43:53Z",
          "endedBy": "qa-pass",
          "to": "remediation",
          "event": {
            "name": "qa-pass",
            "at": "2026-11-13T00:12:56Z",
            "note": "Quality Review 2: running"
          },
          "detail": "Quality Review 2 running.",
          "qa": [
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
              "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/25-kotlinbottools-publish/949b5d33/tests/index.html"
            }
          ]
        }
      ],
      "remediation": [
        {
          "since": "2026-11-12T23:59:25Z",
          "ended": "2026-11-13T00:12:56Z",
          "endedBy": "qa-pass",
          "to": "qa",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-13T00:12:55Z",
            "note": "S11"
          },
          "detail": "The as-built record now states the measurements of every stage, the acceptance against the issue's three criteria and its deviations as built: the second feed read ended 214 s after the first and fell inside the events feed's cache, the pre-flip gate passed at 22:19:34Z with the request leaving 41 s later, and the entry on the revisions count is a measurement, not a deviation. A third feed read at 00:10:19Z, past the caches, lists 0 old ids on the web page, the activity feed and the events, in three valid reads. Five of the tools' self-tests ran again with their result lines kept: 42, 10, 20, 15 and 50 checks passed. The consequences gain three known gaps and one follow-up on what the checks keep and reach. The saved blocks were refreshed from the corrected plan and equal their pins.",
          "remediation": {
            "pass": 1,
            "route": "re-plan-then-remediation",
            "steps": [
              {
                "name": "The plan's text corrected",
                "state": "done",
                "started": "2026-11-13T00:03:06Z",
                "finished": "2026-11-13T00:08:41Z",
                "report": "The plan is corrected and the version the unit worked to from the pre-flip gate to the close is kept under superseded/. The second feed read now waits six minutes from the end of the first feed read, and the landing's reads gain a third feed read past the caches and a run of the tools' self-tests whose result lines are kept, both stored apart from the closed record. The wording on stage markers names the three stages that keep one, the anonymous REST budget is stated as 48 calls in the hour, and the test plan's rows say what their checks are and what has no stand-in case. No tool pin changed."
              },
              {
                "name": "The as-built record corrected",
                "state": "done",
                "started": "2026-11-13T00:08:41Z",
                "finished": "2026-11-13T00:12:55Z",
                "report": "The as-built record now states the measurements of every stage, the acceptance against the issue's three criteria and its deviations as built: the second feed read ended 214 s after the first and fell inside the events feed's cache, the pre-flip gate passed at 22:19:34Z with the request leaving 41 s later, and the entry on the revisions count is a measurement, not a deviation. A third feed read at 00:10:19Z, past the caches, lists 0 old ids on the web page, the activity feed and the events, in three valid reads. Five of the tools' self-tests ran again with their result lines kept: 42, 10, 20, 15 and 50 checks passed. The consequences gain three known gaps and one follow-up on what the checks keep and reach. The saved blocks were refreshed from the corrected plan and equal their pins."
              },
              {
                "name": "A further spaced feed read",
                "state": "done",
                "finished": "2026-11-13T00:12:55Z",
                "report": "The as-built record now states the measurements of every stage, the acceptance against the issue's three criteria and its deviations as built: the second feed read ended 214 s after the first and fell inside the events feed's cache, the pre-flip gate passed at 22:19:34Z with the request leaving 41 s later, and the entry on the revisions count is a measurement, not a deviation. A third feed read at 00:10:19Z, past the caches, lists 0 old ids on the web page, the activity feed and the events, in three valid reads. Five of the tools' self-tests ran again with their result lines kept: 42, 10, 20, 15 and 50 checks passed. The consequences gain three known gaps and one follow-up on what the checks keep and reach. The saved blocks were refreshed from the corrected plan and equal their pins."
              }
            ]
          },
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
            }
          ]
        },
        {
          "since": "2026-11-13T00:43:53Z",
          "ended": "2026-11-13T00:47:57Z",
          "endedBy": "document",
          "to": "document",
          "event": {
            "name": "implementation-stage",
            "at": "2026-11-13T00:47:56Z",
            "note": "S11"
          },
          "detail": "The twelve wording corrections are made in the three documents. The plan cites the requirement that defines the revert trigger, names all five of the landing's reads in its summaries with the revert path from the further feed read, names the three stages that keep a marker, and its test plan rows state which checks read GitHub, which helpers and verifying reads have no case, and what each self-test replaces. The as-built record gains the measurements of the issue-text stage, states that the three refusals left no stored reply, and cites the one stamp that straddles a second by its epoch. The consequences state the anonymous REST budget as 48 calls in the hour and extend the known gap on what the stand-in cases reach. No command block or tool text changed: the 10 tool files and 43 blocks extracted from the plan equal the saved ones.",
          "remediation": {
            "pass": 2,
            "route": "on-the-spot",
            "steps": [
              {
                "name": "The plan's wording corrected",
                "state": "done",
                "finished": "2026-11-13T00:47:56Z",
                "report": "The twelve wording corrections are made in the three documents. The plan cites the requirement that defines the revert trigger, names all five of the landing's reads in its summaries with the revert path from the further feed read, names the three stages that keep a marker, and its test plan rows state which checks read GitHub, which helpers and verifying reads have no case, and what each self-test replaces. The as-built record gains the measurements of the issue-text stage, states that the three refusals left no stored reply, and cites the one stamp that straddles a second by its epoch. The consequences state the anonymous REST budget as 48 calls in the hour and extend the known gap on what the stand-in cases reach. No command block or tool text changed: the 10 tool files and 43 blocks extracted from the plan equal the saved ones."
              },
              {
                "name": "The as-built record's three statements",
                "state": "done",
                "finished": "2026-11-13T00:47:56Z",
                "report": "The twelve wording corrections are made in the three documents. The plan cites the requirement that defines the revert trigger, names all five of the landing's reads in its summaries with the revert path from the further feed read, names the three stages that keep a marker, and its test plan rows state which checks read GitHub, which helpers and verifying reads have no case, and what each self-test replaces. The as-built record gains the measurements of the issue-text stage, states that the three refusals left no stored reply, and cites the one stamp that straddles a second by its epoch. The consequences state the anonymous REST budget as 48 calls in the hour and extend the known gap on what the stand-in cases reach. No command block or tool text changed: the 10 tool files and 43 blocks extracted from the plan equal the saved ones."
              },
              {
                "name": "The consequences' budget figure and known gap",
                "state": "done",
                "finished": "2026-11-13T00:47:56Z",
                "report": "The twelve wording corrections are made in the three documents. The plan cites the requirement that defines the revert trigger, names all five of the landing's reads in its summaries with the revert path from the further feed read, names the three stages that keep a marker, and its test plan rows state which checks read GitHub, which helpers and verifying reads have no case, and what each self-test replaces. The as-built record gains the measurements of the issue-text stage, states that the three refusals left no stored reply, and cites the one stamp that straddles a second by its epoch. The consequences state the anonymous REST budget as 48 calls in the hour and extend the known gap on what the stand-in cases reach. No command block or tool text changed: the 10 tool files and 43 blocks extracted from the plan equal the saved ones."
              }
            ]
          },
          "qa": [
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
              "note": "Fifteen of Quality Review 1's seventeen findings are closed, the two that were not minor among them: the totals of five self-tests are kept (137 checks passed, 0 failed; the 18 stand-in cases of the anonymous helpers were not run again, a known gap), and the spacing of the feed reads is corrected in the plan, stated in the as-built record and answered by the third feed read. The issue's three criteria are met on fresh reads: the repository reads public with secret scanning and push protection enabled, all 87 pre-rewrite commits answer as absent, and nine feed reads list no pre-rewrite id. The closed record is untouched and the saved tools equal their pins. Nothing was run again in this pass: its test results are read from the run's kept results. 12 findings (12 minor; 9 test, 3 code), all wording: the anonymous REST budget still stated as about 45 calls in the consequences, the plan's summaries of the landing's reads naming three of its five steps, one requirement number cited for the revert trigger, test plan rows that claim slightly more than their checks reach, and three statements of the as-built record (the measurements of the issue-text stage, the refusals that left no stored reply, one time stamp that straddles a second). They touch the anonymous measurements and are fixed on the spot, with no further review."
            }
          ]
        }
      ],
      "document": [
        {
          "since": "2026-11-13T00:47:57Z",
          "ended": "2026-11-13T01:00:52Z",
          "endedBy": "halted",
          "to": "document",
          "event": {
            "name": "document",
            "at": "2026-11-13T00:51:21Z",
            "note": "0 of 6 tasks done"
          },
          "detail": "main is merged into the branch with no conflict and pushed; the branch head is 2ad91c2 and no version changes. The unit's documents are being checked.",
          "document": {
            "tasks": [
              {
                "id": "documentation-review",
                "name": "Documentation review",
                "state": "done",
                "started": "2026-11-13T00:51:21Z",
                "finished": "2026-11-13T01:00:52Z",
                "report": "The documentation check found 17 points. Two are gaps in the as-built record: it has no section on what was built, and the deviation on the 58 minutes between the pre-flip gate and the change gives no reasoning and no link to what the requirement rests on. Five are improvements in unpinned text: a missing reasoning line, two passages of the as-built record keyed to the plan's corrections rather than its versions, test plan limits worded as outcomes, and two inaccurate sentences about the shell helpers. Seven are improvements inside the recorded tool and block texts (side effects and return contracts their headers leave out, uncommented idioms), which can only become follow-ups. Every link in the eight documents resolves, both superseded copies carry their note, and no name, path or credential shape was found. The README is accurate for a public repository. Three points are choices about what the public documents say."
              },
              {
                "id": "reconcile-documentation",
                "name": "Reconcile documentation",
                "state": "current",
                "started": "2026-11-13T01:00:52Z"
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
          "held": true,
          "asked": [
            {
              "text": "The plan spells out where the temporary grant is kept and gives its text, and the as-built record describes how the request service handled the request to change the visibility before it ran. How much of this stays in the public documents?",
              "options": [
                "Keep it as written",
                "Generalise the unpinned sentences; the recorded block texts stay and are noted as a follow-up"
              ],
              "answer": null,
              "asked": "2026-11-13T01:00:52Z",
              "answered": "2026-11-13T01:05:02Z"
            },
            {
              "text": "The README is accurate for a public repository but does not say that secret scanning and push protection are now enabled. Is a sentence added?",
              "options": [
                "Add one sentence to the README",
                "No README change, as the plan states"
              ],
              "answer": null,
              "asked": "2026-11-13T01:00:52Z",
              "answered": "2026-11-13T01:05:02Z"
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
        "note": "Fifteen of Quality Review 1's seventeen findings are closed, the two that were not minor among them: the totals of five self-tests are kept (137 checks passed, 0 failed; the 18 stand-in cases of the anonymous helpers were not run again, a known gap), and the spacing of the feed reads is corrected in the plan, stated in the as-built record and answered by the third feed read. The issue's three criteria are met on fresh reads: the repository reads public with secret scanning and push protection enabled, all 87 pre-rewrite commits answer as absent, and nine feed reads list no pre-rewrite id. The closed record is untouched and the saved tools equal their pins. Nothing was run again in this pass: its test results are read from the run's kept results. 12 findings (12 minor; 9 test, 3 code), all wording: the anonymous REST budget still stated as about 45 calls in the consequences, the plan's summaries of the landing's reads naming three of its five steps, one requirement number cited for the revert trigger, test plan rows that claim slightly more than their checks reach, and three statements of the as-built record (the measurements of the issue-text stage, the refusals that left no stored reply, one time stamp that straddles a second). They touch the anonymous measurements and are fixed on the spot, with no further review."
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
        "step": "plan",
        "text": "When does the visibility change happen: does the temporary grant of the writes start it, or does the run stop for an explicit go-ahead once every check before the change has passed?",
        "options": [
          "The grant starts it: one continuous procedure through the gates, the change, the scanning update and the measurements",
          "A stop before the change: a counts-only report, then the change only on an explicit go-ahead, with a re-check that nothing drifted",
          "Either of the two, but only after a named condition (a date, another unit, a licence file on main)"
        ],
        "answer": null,
        "asked": "2026-11-12T05:15:36Z",
        "answered": "2026-11-12T05:19:24Z"
      },
      {
        "step": "plan",
        "text": "If a check after the visibility change fails, is the repository made private again?",
        "options": [
          "Report only: the repository stays public",
          "Make it private again on any finding",
          "Split by kind: private again only when a pre-rewrite id is served or listed anonymously; a secret-scanning alert or another deviation is reported"
        ],
        "answer": null,
        "asked": "2026-11-12T05:15:36Z",
        "answered": "2026-11-12T05:19:24Z"
      },
      {
        "step": "plan",
        "text": "Does this unit correct the old issue texts before the visibility change (40 links to the deleted planning branch in the bodies of #1 to #19, #1's body naming that branch, #2's plan-folder line)?",
        "options": [
          "KotlinBottools issue bodies only, before Gate 3",
          "Those, plus the issue bodies in MagicBot and WebTools",
          "A separate issue does it first and blocks this unit",
          "None before the change: all stay follow-ups"
        ],
        "answer": null,
        "asked": "2026-11-12T05:15:36Z",
        "answered": "2026-11-12T05:19:24Z"
      },
      {
        "step": "plan",
        "text": "Should the secret-scan check become a required status check on main, and which unit sets it?",
        "options": [
          "This unit, after the scanning update",
          "Phase 1, together with its own workflow's check",
          "No unit: the landing's merge condition stays the only enforcement"
        ],
        "answer": null,
        "asked": "2026-11-12T05:15:36Z",
        "answered": "2026-11-12T05:19:24Z"
      },
      {
        "step": "plan",
        "text": "The committed boards hold 10 distinct pre-rewrite commit ids, 2 of them in text fields of the rewrite-and-swap unit's board; none resolves in the repository. Are they accepted?",
        "options": [
          "Accept all 10, recorded by count in a dated note, each probed after the change",
          "Accept the generated fields only; the two text-field ids are removed from the boards' current files first",
          "Treat them as a failed check: no visibility change"
        ],
        "answer": null,
        "asked": "2026-11-12T05:15:36Z",
        "answered": "2026-11-12T05:19:24Z"
      },
      {
        "step": "plan",
        "text": "What does the access check cover, and may it change a setting?",
        "options": [
          "Read-only: anonymous reachability and a read-back of who can do what; deviations are reported",
          "The same, plus one settings write: approval required for workflow runs on pull requests from outside contributors",
          "The same, plus further settings at publication: description and topics, dependency alerts, private vulnerability reporting"
        ],
        "answer": null,
        "asked": "2026-11-12T05:15:36Z",
        "answered": "2026-11-12T05:19:24Z"
      },
      {
        "step": "plan",
        "text": "The phase design puts the scanning settings in the same minute as the visibility change, but each write is its own request and a repository write has taken about 2 to 3 minutes, so the settings would land about 2 to 4 minutes after the change. How is that gap handled?",
        "options": [
          "Send the scanning request the moment the visibility read-back holds, record both read-back times and report the gap",
          "Carry both writes in one request, which needs a combined action added to the request protocol first"
        ],
        "answer": null,
        "asked": "2026-11-12T19:27:03Z",
        "answered": "2026-11-12T19:47:48Z"
      },
      {
        "step": "plan",
        "text": "The boards hold 10 distinct pre-rewrite commit ids at the committed tips and 13 over their history; three sit only in earlier versions of the repository work board. Does the acceptance of the 10 extend to all 13?",
        "options": [
          "Accept all 13, recorded by count and each probed after the change",
          "Accept the 10 at the tips only; the three in history are settled before the change"
        ],
        "answer": null,
        "asked": "2026-11-12T19:27:03Z",
        "answered": "2026-11-12T19:47:48Z"
      },
      {
        "step": "implementation",
        "text": "The plan's command for comparing the scan configuration with main's fails on this machine's shell. How does the unit go on?",
        "options": [
          "The plan's command is corrected in a re-pass of the plan, and the pre-flip gate runs again from its first step",
          "The unit stops here with the repository private"
        ],
        "answer": null,
        "asked": "2026-11-12T21:50:23Z",
        "answered": "2026-11-12T22:11:51Z"
      },
      {
        "step": "document",
        "text": "The plan spells out where the temporary grant is kept and gives its text, and the as-built record describes how the request service handled the request to change the visibility before it ran. How much of this stays in the public documents?",
        "options": [
          "Keep it as written",
          "Generalise the unpinned sentences; the recorded block texts stay and are noted as a follow-up"
        ],
        "answer": null,
        "asked": "2026-11-13T01:00:52Z",
        "answered": "2026-11-13T01:05:02Z"
      },
      {
        "step": "document",
        "text": "The README is accurate for a public repository but does not say that secret scanning and push protection are now enabled. Is a sentence added?",
        "options": [
          "Add one sentence to the README",
          "No README change, as the plan states"
        ],
        "answer": null,
        "asked": "2026-11-13T01:00:52Z",
        "answered": "2026-11-13T01:05:02Z"
      }
    ],
    "waits": [
      {
        "step": "plan",
        "since": "2026-11-12T05:15:36Z",
        "ended": "2026-11-12T05:19:24Z",
        "by": "halted"
      },
      {
        "step": "plan",
        "since": "2026-11-12T19:27:03Z",
        "ended": "2026-11-12T19:47:48Z",
        "by": "halted"
      },
      {
        "step": "implementation",
        "since": "2026-11-12T21:50:23Z",
        "ended": "2026-11-12T22:11:51Z",
        "by": "halted"
      },
      {
        "step": "document",
        "since": "2026-11-13T01:00:52Z",
        "ended": "2026-11-13T01:05:02Z",
        "by": "halted"
      }
    ],
    "outages": [
      {
        "step": "research",
        "since": "2026-11-12T05:36:00Z",
        "ended": "2026-11-12T17:46:25Z",
        "reason": "the session ended while the research batch was running; the same conversation was resumed and its planning is continuing"
      },
      {
        "step": "implementation",
        "since": "2026-11-12T19:49:56Z",
        "ended": "2026-11-12T21:03:35Z",
        "reason": "the session stopped while the run waited for a permission; the same conversation was resumed"
      }
    ],
    "document": {
      "tasks": [
        {
          "id": "documentation-review",
          "name": "Documentation review",
          "state": "done",
          "started": "2026-11-13T00:51:21Z",
          "finished": "2026-11-13T01:00:52Z",
          "report": "The documentation check found 17 points. Two are gaps in the as-built record: it has no section on what was built, and the deviation on the 58 minutes between the pre-flip gate and the change gives no reasoning and no link to what the requirement rests on. Five are improvements in unpinned text: a missing reasoning line, two passages of the as-built record keyed to the plan's corrections rather than its versions, test plan limits worded as outcomes, and two inaccurate sentences about the shell helpers. Seven are improvements inside the recorded tool and block texts (side effects and return contracts their headers leave out, uncommented idioms), which can only become follow-ups. Every link in the eight documents resolves, both superseded copies carry their note, and no name, path or credential shape was found. The README is accurate for a public repository. Three points are choices about what the public documents say."
        },
        {
          "id": "reconcile-documentation",
          "name": "Reconcile documentation",
          "state": "done",
          "started": "2026-11-13T01:00:52Z",
          "finished": "2026-11-13T01:27:31Z",
          "report": "The documents are reconciled with the build. The as-built record states what was built, the acceptance against the issue's three criteria, the measurements of every stage and of the landing's reads, and four deviations: the procedures of edits 1 to 18 not demonstrably run as one shell, the comment on #1 holding a mention and no blob link, the change following the pre-flip gate by 58 minutes, and the second feed read inside the events feed's cache. The consequences state the outcome of each assumption, the known gaps and the follow-ups, among them one on what the tools' comments leave out. The research notes say what held in the build, and dated notes are on the phase design and on the consequences of the phase and of the two units before this one. A second documentation check found seven small points, all corrected. The documents' gate passed twice with the same counts at 01:27:02Z: 12 of 12 checks, 22 pending files, 0 blocking hits, 0 resolving tokens in the documents, the scan clean."
        },
        {
          "id": "reconcile-plan",
          "name": "Reconcile plan",
          "state": "done",
          "started": "2026-11-13T01:06:32Z",
          "finished": "2026-11-13T01:27:31Z",
          "report": "The documents are reconciled with the build. The as-built record states what was built, the acceptance against the issue's three criteria, the measurements of every stage and of the landing's reads, and four deviations: the procedures of edits 1 to 18 not demonstrably run as one shell, the comment on #1 holding a mention and no blob link, the change following the pre-flip gate by 58 minutes, and the second feed read inside the events feed's cache. The consequences state the outcome of each assumption, the known gaps and the follow-ups, among them one on what the tools' comments leave out. The research notes say what held in the build, and dated notes are on the phase design and on the consequences of the phase and of the two units before this one. A second documentation check found seven small points, all corrected. The documents' gate passed twice with the same counts at 01:27:02Z: 12 of 12 checks, 22 pending files, 0 blocking hits, 0 resolving tokens in the documents, the scan clean."
        },
        {
          "id": "readme-changelog",
          "name": "README and CHANGELOG",
          "state": "done",
          "finished": "2026-11-13T01:06:32Z",
          "report": "The third alert read at 01:05:33Z answered with 0 alerts, and the closed record still verifies. The documentation points and the plan are being reconciled in one pass: the as-built record gains a section on what was built and the reasoning its deviations lacked, the unpinned sentences on where the temporary grant is kept and on the refusals are generalised, the points inside the recorded tool texts become one follow-up, and the consequences, the research notes and the dated notes on the phase design take the outcome of the build. The README and the changelog are not changed: the README is accurate for a public repository and a documentation-only landing adds no entry. A second documentation check follows."
        },
        {
          "id": "state-boards",
          "name": "State boards",
          "state": "done",
          "started": "2026-11-13T01:27:31Z",
          "finished": "2026-11-13T01:43:10Z"
        },
        {
          "id": "document-landing",
          "name": "Document commit",
          "state": "done",
          "started": "2026-11-13T01:43:10Z",
          "finished": "2026-11-13T02:26:45Z"
        }
      ]
    }
  },
  "milestones": [
    {
      "column": "gap",
      "label": "Research verified",
      "date": "2026-11-12",
      "ref": "research/README.md",
      "note": "two questions, the calls that make the repository public and enable its scanning, and the anonymous reads and access check after the change, each with its findings file; the 35 load-bearing claims re-opened at their sources and five observations made again, none failing and one single-source wording unclear that nothing rests on; two of the earlier findings corrected: `gh repo edit` sends one body, and a 422 on `git/trees` means present"
    },
    {
      "column": "gap",
      "label": "Research verified, in #2's run",
      "date": "2026-10-21",
      "ref": "../research/README.md",
      "note": "written on this board when the run started, from #2's research (findings 3 on GitHub after the push and the visibility change, findings 5 on the privacy gate and the references) and its architecture (§6.5, §6.6, §7.5, §8), with this unit's row in §15 and what units 1, 3 and 4 hand on"
    },
    {
      "column": "considered",
      "label": "Architecture signed off, in #2's run",
      "date": "2026-11-07",
      "ref": "../architecture.md",
      "note": "the options #2's architecture weighed for this unit: §6.5, §7.5 and §14, with the research's reason for the separate scanning update (§3.4); the plan adds to them at plan acceptance"
    },
    {
      "column": "verdict",
      "label": "Plan accepted",
      "date": "2026-11-12",
      "ref": "plan.md",
      "note": "eleven stages, S1 to S11, in one continuous run after the owner's grant, then the landing's reads; the nineteen issue-body edits, the change to public and the scanning update are the only writes, each a request read back; the way back to private only on its trigger"
    }
  ],
  "trail": [
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Sized; the plan starts"
    },
    {
      "date": "2026-11-12",
      "column": "verdict",
      "label": "Halted at the plan: waiting on you (the maintainer's answers to six questions)"
    },
    {
      "date": "2026-11-12",
      "column": "verdict",
      "label": "Resumed at the plan"
    },
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Research planning: 0 questions drafted"
    },
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Research started: `publication-and-scanning-api`, `anonymous-reads-after-publication`"
    },
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Research returned: `publication-and-scanning-api`",
      "ref": "research/publication-and-scanning-api.md"
    },
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Research started: `anonymous-reads-after-publication`"
    },
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Research returned: `anonymous-reads-after-publication`",
      "ref": "research/anonymous-reads-after-publication.md"
    },
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Verification started: 2 findings"
    },
    {
      "date": "2026-11-12",
      "column": "gap",
      "label": "Research verified; the plan next",
      "ref": "research/README.md"
    },
    {
      "date": "2026-11-12",
      "column": "verdict",
      "label": "Halted at the plan: waiting on you (the maintainer's answers to two questions)"
    },
    {
      "date": "2026-11-12",
      "column": "verdict",
      "label": "Plan accepted",
      "ref": "plan.md"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "Branch `chore/issue-25-make-repository-public` cut; implementation starts at S1"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "S1 done; S2 current: Issue texts"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "S2 done; S3 current: Gate 3's corpus"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "S6 done; S7 current: The pre-flip gate"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "Halted at implementation: waiting on you (the maintainer's answer to one question)"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "Resumed at implementation"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "S7 done; S8 current: The change and the scanning settings"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "S8 done; S9 current: The anonymous measurements"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "Implementation done (11 stages); Quality Review next"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "Quality Review 1: running"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "Quality Review 1: changes requested, 17 findings (15 minor, 2 other; 12 test, 5 code)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Resolution: S11"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Quality Review 2: running"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Quality Review 2: changes requested, 12 findings (12 minor; 9 test, 3 code)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Correction of Quality Review 2: S11"
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
      "label": "Halted at the Document step: waiting on you (the maintainer's answers to two questions on the wording of the public documents)"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Resumed at the Document step"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "Document: Reconcile documentation, Reconcile plan in parallel"
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
      "id": "gate-3",
      "group": "Before the change",
      "name": "The third privacy gate",
      "system": "kotlinbottools",
      "where": "a fresh mirror of KotlinBottools · its issues, placeholders, pull-request texts and comments",
      "gap": {
        "kind": "missing",
        "summary": "The gate that stands before the change to public has not run. Its corpus is everything that becomes public: a fresh mirror of the fresh repository with the hygiene merge, its issues, placeholders, pull-request texts and comments, and every file the phase's landings put on it, the boards included. The first two gates covered the rewritten mirror before its push and the walked issues before the renames. A read on 2026-11-12 reports 0 blocking hits over `main`'s tree and those texts as they stood then.",
        "evidence": [
          "`../architecture.md:677` — Gate 3's corpus, run before the visibility change",
          "`../architecture.md:956` — a failed Gate 3 leaves the repository private",
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:127` — the corrected privacy gate in the workspace and the allow-list in the data folder, with the record of the owner's decision on each entry, handed to this unit",
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:134` — the moved texts naming `KotlinBottools-next`, which this gate reads",
          "`research/README.md:32` — read on 2026-11-12, the privacy gate reports 0 blocking hits over `main`'s tree and every issue, pull-request and comment text, and over the earlier revisions of the two edited issue bodies"
        ],
        "source": "../architecture.md §6.5, §8; ../23-kotlinbottools-rewrite-and-swap/consequences.md §4; research/README.md, current state",
        "link": "../architecture.md#65-privacy-gate-and-id-reference-check"
      },
      "options": [
        {
          "id": "gate-over-closed-corpus",
          "name": "The privacy gate over the closed corpus: whole-word hits against lists built in memory from the data folder, every match masked, counts and masked locations only, the reviewed allow-list the only suppression",
          "verdict": "accepted",
          "why": "It exits non-zero on any other hit and prints no name; a failed run leaves the repository private.",
          "source": "../architecture.md §6.5, §8",
          "link": "../architecture.md#65-privacy-gate-and-id-reference-check"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "One fresh corpus was gathered: a fresh mirror of every ref, the text dumps (35 issue numbers, 3 pull requests, their comments and reviews), the earlier revisions and titles of every edited text, and the full logs of the 4 Actions runs. The revisions dump holds 44 earlier revisions, every one of them in the corpus.",
            "state": "as-planned"
          },
          {
            "text": "The privacy gate ran over the corpus through the allow-list tool with the confirmed allow-list and reported 0 blocking hits, so no key waited on a decision and nothing was allow-listed by the run.",
            "state": "as-planned"
          },
          {
            "text": "Both history scans of the fresh mirror and the scan of the tree of `main` ran with the workspace configuration, each reporting `RESULT: CLEAN` with 0 findings.",
            "state": "as-planned"
          },
          {
            "text": "No purged blob is reachable from any ref of the fresh mirror (346 of 346 missing), and the scrub's three expressions match nothing in any file or commit message of any ref.",
            "state": "as-planned"
          },
          {
            "text": "Nothing stopped the run: the gate, the scans, the manifest and the zero count all held, and the repository stayed private.",
            "state": "as-planned"
          }
        ],
        "changes": []
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Gather one fresh corpus of everything that becomes public: a fresh mirror of every ref, the dumps of issues, placeholders, pull requests, comments and reviews, the earlier revisions and titles of every edited text, and the full log of every Actions run.",
            "ref": "plan.md#s3--gate-3s-corpus",
            "excerpt": {
              "ref": "plan.md#s3--gate-3s-corpus",
              "heading": "S3 — Gate 3's corpus",
              "paragraph": "The corpus is one fresh state of everything that becomes public. A rerun after drift uses the label `g3b`: the call starts with `G3=g3b` in front of `bash`, e.g. `G3=g3b bash \"$B/S3.mirror.sh\"`. `S3.mirror` is also the first moment from which nothing is committed or pushed.",
              "hash": "496a61247ec1"
            }
          },
          {
            "text": "Run the privacy gate over it through the allow-list tool with the confirmed allow-list; a new key waits for the owner's decision on each key, and the run never allow-lists a hit itself.",
            "ref": "plan.md#s4--gate-3",
            "excerpt": {
              "ref": "plan.md#s4--gate-3",
              "heading": "S4 — Gate 3",
              "paragraph": "`S4.gate`: the privacy gate over the corpus, through `allow_tool.py run`, which masks every corpus label. Before the run the tool's own self-test runs the real gate over made-up data and a fixture corpus with planted hits, which shows the gate is not blind.",
              "hash": "0d8f1cd7d90b"
            }
          },
          {
            "text": "Scan the fresh mirror's history on both ref sets and the tree of `main` with the workspace configuration, each expected `RESULT: CLEAN`.",
            "ref": "plan.md#s4--gate-3",
            "excerpt": {
              "ref": "plan.md#s4--gate-3",
              "heading": "S4 — Gate 3",
              "paragraph": "`S4.gate`: the privacy gate over the corpus, through `allow_tool.py run`, which masks every corpus label. Before the run the tool's own self-test runs the real gate over made-up data and a fixture corpus with planted hits, which shows the gate is not blind.",
              "hash": "0d8f1cd7d90b"
            }
          },
          {
            "text": "Check that no purged blob is reachable from any ref, and that the scrub's expressions match nothing in any file or commit message of any ref.",
            "ref": "plan.md#s4--gate-3",
            "excerpt": {
              "ref": "plan.md#s4--gate-3",
              "heading": "S4 — Gate 3",
              "paragraph": "`S4.gate`: the privacy gate over the corpus, through `allow_tool.py run`, which masks every corpus label. Before the run the tool's own self-test runs the real gate over made-up data and a fixture corpus with planted hits, which shows the gate is not blind.",
              "hash": "0d8f1cd7d90b"
            }
          },
          {
            "text": "A blocking hit, an undecided or rejected key, a scan finding, a reachable blob or a count above zero stops the run with the repository private.",
            "ref": "plan.md#stops-and-the-state-each-leaves",
            "excerpt": {
              "ref": "plan.md#stops-and-the-state-each-leaves",
              "heading": "Stops and the state each leaves",
              "paragraph": "This extends architecture §7.6 for this unit.",
              "hash": "c6edb26775e1"
            }
          }
        ],
        "defense": "Gate 3 is the last gate before a change nothing can recall, so it reads what becomes public in its final form: the issue-body edits come before it, and the earlier revisions and the run logs, which the first two gates did not read, are in its corpus.",
        "steps": [
          {
            "id": "S3",
            "what": "Take the fresh mirror, the text dumps, the earlier revisions and the run logs, and write the corpus file.",
            "check": "the mirror holds `main`, the topic branch and one head ref per closed pull request and nothing else; every run completed and its log read",
            "link": "plan.md#s3--gate-3s-corpus"
          },
          {
            "id": "S4",
            "what": "Run the privacy gate, the secret scans, the purged-blob check and the scrub's zero count over the corpus.",
            "check": "`GATE: 0 blocking hit(s)`; `RESULT: CLEAN` for each scan; 346 of 346 purged blobs unreachable; 22 `ok` lines",
            "link": "plan.md#s4--gate-3"
          }
        ],
        "tests": [
          "L2 component — `allow_tool.py` self-test (50 checks), the real gate run over made-up data and a fixture corpus with planted hits",
          "L3 integration — the gate, the scans, the manifest check and the scrub's count over the real corpus"
        ],
        "risks": [
          "A new allow-list key stops the run, with the repository private, until the owner decides each key",
          "Drift after the corpus is taken repeats S3 to S7 once; a second drift hands back, private"
        ],
        "source": "plan.md Requirements R4; S3; S4",
        "link": "plan.md#s4--gate-3"
      }
    },
    {
      "id": "id-reference-check",
      "group": "Before the change",
      "name": "The id-reference check",
      "system": "kotlinbottools",
      "where": "what the phase adds: its documents, commit messages, pull-request texts, placeholders and the generated boards",
      "gap": {
        "kind": "risk",
        "summary": "What the phase adds names pre-rewrite commit ids, and none may resolve once the repository is public. The resolution comments on #2, #21 and #22 hold 26 occurrences of 3 distinct pre-rewrite ids, and the generated boards carry pre-rewrite ids in their generated fields; the check accounts for each and must report no resolving token. Read on 2026-11-12, the committed boards cite 10 distinct pre-rewrite ids, the 3 of the resolution comments among them, and none of the 10 resolves in this repository.",
        "evidence": [
          "`../architecture.md:679` — the check runs with Gate 3 over what the phase adds: the issue folder's documents, the landings' commit messages, the pull-request texts, the placeholders and the report draft; it must report 0 resolving tokens",
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:63` — 26 occurrences of 3 distinct pre-rewrite ids in the moved resolution comments, which the check accounts for",
          "`../21-preparation/consequences.md:165` — the generated boards' pre-rewrite commit ids, which the check must account for, or its count will not reach 0",
          "`research/README.md:35` — the committed boards cite 10 distinct pre-rewrite ids, among them the 3 that three resolution comments cite; none of the 10 resolves in this repository, and the activity feed and the events hold none"
        ],
        "source": "../architecture.md §6.5; ../23-kotlinbottools-rewrite-and-swap/consequences.md §2.1; ../21-preparation/consequences.md §6; research/README.md, current state",
        "link": "../architecture.md#65-privacy-gate-and-id-reference-check"
      },
      "options": [
        {
          "id": "check-what-the-phase-adds",
          "name": "The id-reference check with Gate 3, over what the phase adds, the older documents' dated citations outside its scope",
          "verdict": "accepted",
          "why": "Its scope is the phase's own additions, which must hold no resolving token; the older documents keep their ids as dated citations by design.",
          "source": "../architecture.md §6.5, §4",
          "link": "../architecture.md#65-privacy-gate-and-id-reference-check"
        },
        {
          "id": "rewrite-old-ids",
          "name": "Rewrite the pre-rewrite ids out of the older documents",
          "verdict": "declined",
          "why": "The ids resolve only in the private legacy repository.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "statements": [
          {
            "text": "Every token of 7 to 40 hexadecimal digits that prefixes a pre-rewrite commit of any of the six repositories was checked over every version of the phase folder's files and of the repository work board, every commit message, the text dumps, the revisions and the run logs.",
            "state": "as-planned"
          },
          {
            "text": "Every result was the expected one: 0 in the phase documents, the commit messages, the revisions and the run logs; in the boards 10 distinct ids at the tips and 13 over their history, none outside the expected fields; in the comments 35 tokens of exactly the 3 accepted ids.",
            "state": "as-planned"
          },
          {
            "text": "The check printed counts, file classes, file names and field paths, never an id, and wrote the board ids for the anonymous probes, all 13 among the 87 pre-rewrite KotlinBottools commits.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Check every token of 7 to 40 hexadecimal digits that prefixes a pre-rewrite commit of any of the six repositories, over every version of the phase folder's files and of the repository work board, every commit message, the text dumps, the revisions and the run logs.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Hold the result to the measured expectations: 0 in every phase document; in the boards, 10 distinct ids at the current tips and 13 over their history, each in a recorded generated field; the 3 accepted ids only in the resolution comments of #2, #21 and #22; 0 everywhere else. Any other result fails.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Print counts, file classes, file names and field paths, never an id, and write the board ids under the data folder for the anonymous probes, checked to be among the 87 pre-rewrite KotlinBottools commits.",
            "ref": "plan.md#s5--the-id-reference-check",
            "excerpt": {
              "ref": "plan.md#s5--the-id-reference-check",
              "heading": "S5 — The id-reference check",
              "paragraph": "Expected output (counts, file classes and file names only):",
              "hash": "f7e006116860"
            }
          }
        ],
        "defense": "The phase's additions must hold no resolving token, and the generated boards' ids cannot reach 0, so the check accounts for each id by its field: under the swap the pre-rewrite objects live only in the private legacy repository, so none resolves in the public one.",
        "steps": [
          {
            "id": "S5",
            "what": "Run the id-reference check over the corpus and the phase's files in every version.",
            "check": "every count equal to the expected data and no `FAIL` line; 10 and 13 board ids, all among the 87",
            "link": "plan.md#s5--the-id-reference-check"
          }
        ],
        "tests": [
          "L2 component — `p25_idcheck.py` self-test (20 checks: planted made-up ids in a fixture repository, the expected-data failures, the path count)",
          "L4a deterministic — the expected sets: 10, 13, 35 tokens, 3 accepted ids, 87 commits"
        ],
        "risks": [
          "A count that differs while every token sits in an expected field is a result to settle before the change, since the check fails on it (assumption A8)"
        ],
        "source": "plan.md Requirements R5; S5",
        "link": "plan.md#s5--the-id-reference-check"
      }
    },
    {
      "id": "issue-text-paths",
      "group": "Before the change",
      "name": "Machine-local paths in issue texts",
      "system": "kotlinbottools",
      "where": "issue texts, placeholder bodies, pull-request texts and comments",
      "gap": {
        "kind": "risk",
        "summary": "The path scrub reaches files and commits only. A machine-local path in an issue text, a placeholder body, a pull-request text or a comment would become public with the repository as it stands. Read on 2026-11-12, none of those texts, nor the earlier revisions of the two edited issue bodies, holds one.",
        "evidence": [
          "`../architecture.md:684` — Gate 3 counts the scrub's expressions over those texts; they are not files or commits, so a hit is not a stop",
          "`../consequences.md:305` — a count above zero becomes a follow-up: those texts are edited, as the scrub covers files and commits only",
          "`research/README.md:33` — read on 2026-11-12, none of the issue, pull-request and comment texts, nor the earlier revisions of the two edited issue bodies, holds a machine-local path"
        ],
        "source": "../architecture.md §6.5; ../consequences.md §6; research/README.md, current state",
        "link": "../architecture.md#65-privacy-gate-and-id-reference-check"
      },
      "options": [
        {
          "id": "count-then-follow-up",
          "name": "Counted with Gate 3, a hit recorded by count and made a follow-up, an issue edit",
          "verdict": "accepted",
          "why": "Issue texts are neither files nor commits, so a hit does not stop the change; it is recorded by count and becomes an issue edit.",
          "source": "../architecture.md §6.5; ../consequences.md §6",
          "link": "../architecture.md#65-privacy-gate-and-id-reference-check"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The scrub's three machine-local path expressions were counted over the nineteen new bodies before the first edit request, 0 each, so the bodies sent match none.",
            "state": "as-planned"
          },
          {
            "text": "Gate 3 counted them over the public texts, the earlier revisions and the run logs, by count and never printed: 0 for each expression, so no follow-up issue edit is due.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Count the scrub's machine-local path expressions over the nineteen new issue bodies before the first edit request; the new bodies must match none.",
            "ref": "plan.md#s2--the-issue-texts",
            "excerpt": {
              "ref": "plan.md#s2--the-issue-texts",
              "heading": "S2 — The issue texts",
              "paragraph": "The bodies are edited before Gate 3, so that Gate 3 reads their final form. Of the two steps before the edits, `S2.texts` reads GitHub and writes nothing there (the bodies, their edges, and each anchored link target on `main` when it builds the new bodies; its audit is local), and `S2.gate` is local checks; the nineteen edits are requests; a failed or refused edit does not stop the run.",
              "hash": "c76f3d8886b9"
            }
          },
          {
            "text": "Count them with Gate 3 over the public texts, the earlier revisions and the run logs; a hit is recorded by count, never printed, and becomes a follow-up issue edit rather than a stop.",
            "ref": "plan.md#s4--gate-3",
            "excerpt": {
              "ref": "plan.md#s4--gate-3",
              "heading": "S4 — Gate 3",
              "paragraph": "`S4.gate`: the privacy gate over the corpus, through `allow_tool.py run`, which masks every corpus label. Before the run the tool's own self-test runs the real gate over made-up data and a fixture corpus with planted hits, which shows the gate is not blind.",
              "hash": "0d8f1cd7d90b"
            }
          }
        ],
        "defense": "Issue texts are neither files nor commits, so the path scrub never reached them; counting them closes that without holding the change on a text a later edit can correct.",
        "steps": [
          {
            "id": "S2",
            "what": "Count the expressions over the new bodies with the privacy gate and the id check, before any request.",
            "check": "every expression 0 over the new bodies",
            "link": "plan.md#s2--the-issue-texts"
          },
          {
            "id": "S4",
            "what": "Count the expressions over the texts, the revisions and the logs.",
            "check": "each expression's count recorded; 0 expected",
            "link": "plan.md#s4--gate-3"
          }
        ],
        "tests": [
          "L2 component — `p25_idcheck.py` self-test, its path-count cases",
          "L3 integration — the count over the real texts, revisions and logs"
        ],
        "risks": [
          "A hit leaves the path public until its follow-up edit lands; the read on 2026-11-12 found none"
        ],
        "source": "plan.md Requirements R3, R4; S2; S4",
        "link": "plan.md#s4--gate-3"
      }
    },
    {
      "id": "planning-branch-links",
      "group": "Before the change",
      "name": "The issue texts that still name the planning branch",
      "system": "kotlinbottools",
      "where": "#1 to #19 · MagicBot #1 to #8 · WebTools #55",
      "gap": {
        "kind": "bug",
        "summary": "Issue texts still link the planning branch, which was merged and deleted, so those links no longer resolve. 56 links name it: 3 in #1's body, 2 in each of #2 to #19, 16 in MagicBot #1 to #8 and 1 in WebTools #55; #1's body still names the branch, and #2's plan-folder line still names a `0-` folder rather than `2-phase-0-history-rewrite`.",
        "evidence": [
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:201` — one pass of issue-text edits, still open, before this unit makes the repository public",
          "`../consequences.md:285` — the follow-up of #2's landing: point the 56 planning-branch links at `main`",
          "#2 on GitHub, when this run started — its roadmap and design links still name the planning branch, and its plan-folder line still names a `0-` folder rather than `2-phase-0-history-rewrite`"
        ],
        "source": "../23-kotlinbottools-rewrite-and-swap/consequences.md §6; ../consequences.md §6",
        "link": "../23-kotlinbottools-rewrite-and-swap/consequences.md#6-follow-ups"
      },
      "options": [
        {
          "id": "point-at-main",
          "name": "Point the 56 links at `main`, and correct #1's body and #2's plan-folder line",
          "verdict": "accepted",
          "why": "The same documents live on `main` before and after the swap, so the links stay current.",
          "source": "../architecture.md §14; ../consequences.md §6",
          "link": "../consequences.md#6-follow-ups"
        },
        {
          "id": "keep-planning-branch",
          "name": "Keep the planning branch after its merge, so that the links keep resolving",
          "verdict": "declined",
          "why": "The links would show a frozen copy of the documents while `main` moves on.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        },
        {
          "id": "edit-comment-on-1",
          "name": "Edit the link in the comment on #1 as well",
          "verdict": "declined",
          "why": "No request edits an existing comment; the link stays a follow-up.",
          "source": "plan.md Non-goals",
          "link": "plan.md#non-goals"
        },
        {
          "id": "other-repositories-here",
          "name": "Edit MagicBot's and WebTools' planning-branch links in this unit",
          "verdict": "declined",
          "why": "Those repositories are outside this unit's writes; their 17 links stay a follow-up.",
          "source": "plan.md Non-goals; Sequencing and follow-ups",
          "link": "plan.md#sequencing-and-follow-ups"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "statements": [
          {
            "text": "The bodies of #1 to #19 now point the 39 links to the deleted planning branch at `main`, #1's link to the former impact document at its `consequences.md` among them; 0 occurrences of the branch's name remain in them.",
            "state": "as-planned"
          },
          {
            "text": "#1's branch clause now says the documents are on `main` and #2's plan-folder line names `2-phase-0-history-rewrite`, each replaced once; every new body equals its intended text, so nothing else changed.",
            "state": "as-planned"
          },
          {
            "text": "The nineteen new bodies were built with the expected replacement counts and no missing anchor, audited, and gated before the first request: no blocking hit from the privacy gate and no machine-local path.",
            "state": "as-planned"
          },
          {
            "text": "Each of the nineteen edits went as its own request, sent once, its guard printing `guard ok` before the write, and read back equal to its intended body byte for byte with its parent, sub-issue, \"blocked by\" and \"blocking\" edges unchanged; none failed. Edit 19's procedure ran as one shell; those of edits 1 to 18 ran in order but not demonstrably as one.",
            "state": "amended",
            "ref": "final-implementation.md#41-the-procedures-of-edits-1-to-18-were-not-demonstrably-run-as-one-shell",
            "excerpt": {
              "ref": "final-implementation.md#41-the-procedures-of-edits-1-to-18-were-not-demonstrably-run-as-one-shell",
              "heading": "4.1 The procedures of edits 1 to 18 were not demonstrably run as one shell",
              "paragraph": "Departs from: the plan's Design, \"The requests\" (the `procedure` field: \"the literal commands, in order, run in one shell\"), and its Procedure, \"Conventions\" (a STEP). · As built, from the request service's replies: · for edits 1 to 18 the request service ran each procedure's commands in order, but not demonstrably as one shell; · edit 18's repository-id check ran in one call and the remaining commands in a second; · in edits 8, 10 and 16, lines outside the procedure were added around its entries to print the old body's hash (in edit 8, an echo of the current body's hash added to the guard …",
              "hash": "0ca86445b57f"
            }
          },
          {
            "text": "The comments on #1 hold no blob link to the planning branch but one mention of its name, which stays the follow-up; MagicBot #1 to #8 hold 16 links and WebTools #55 one, left as follow-ups.",
            "state": "amended",
            "ref": "final-implementation.md#42-the-comments-on-1-hold-no-blob-link-to-the-planning-branch",
            "excerpt": {
              "ref": "final-implementation.md#42-the-comments-on-1-hold-no-blob-link-to-the-planning-branch",
              "heading": "4.2 The comments on #1 hold no blob link to the planning branch",
              "paragraph": "Departs from: the plan's Procedure, S2, step `S2.after`, whose block names 1 remaining link in the comments on #1. · As built: · the block's pattern, a blob link to the planning branch, finds 0 in the comments on #1, so the step printed two `ok` lines and one `RECORD` line for that count; · the comments on #1 hold one mention of the planning branch's name that is not a blob link, in a comment unchanged since 2026-10-20; · MagicBot #1 to #8 hold 16 such links and WebTools #55 holds 1, as expected; · 0 occurrences of the branch's name remain in the bodies of #1 to #19, and 0 edits failed to …",
              "hash": "9d3df680e6f4"
            }
          }
        ],
        "changes": [
          {
            "what": "The procedures of edits 1 to 18 ran in order but not demonstrably as one shell; edit 19's ran as one shell, its entries unchanged.",
            "why": "The request service carried out the procedures' commands in order without, at first, keeping them in one shell; from edit 19 on, and for the visibility and scanning requests, each procedure ran as one shell with its entries unchanged. In all nineteen edits the guard passed before the write and the edit's check held, so no write depended on a stopping guard.",
            "when": "S2 · Issue texts",
            "link": "../architecture.md#11-version-control"
          },
          {
            "what": "The comments on #1 hold 0 links to the planning branch and one mention of its name, where 1 remaining link was expected.",
            "why": "The step's expected 1 counted the mention of the branch's name; its pattern counts blob links only. No effect on the change: the mention stays the follow-up for the comment on #1.",
            "when": "S2 · Issue texts",
            "link": "../consequences.md#23-issue-numbers-and-links"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "In the bodies of #1 to #19 only, point the 39 links to the deleted planning branch at `main`, and #1's link to the initiative's former impact document at its `consequences.md`.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Make #1's branch clause read that the documents are on `main`, and #2's plan-folder line name `2-phase-0-history-rewrite`; nothing else in any body changes.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Build and audit the nineteen new bodies against exact replacement counts, LF-only with one final newline, and gate them before the first request.",
            "ref": "plan.md#s2--the-issue-texts",
            "excerpt": {
              "ref": "plan.md#s2--the-issue-texts",
              "heading": "S2 — The issue texts",
              "paragraph": "The bodies are edited before Gate 3, so that Gate 3 reads their final form. Of the two steps before the edits, `S2.texts` reads GitHub and writes nothing there (the bodies, their edges, and each anchored link target on `main` when it builds the new bodies; its audit is local), and `S2.gate` is local checks; the nineteen edits are requests; a failed or refused edit does not stop the run.",
              "hash": "c76f3d8886b9"
            }
          },
          {
            "text": "Send each edit as its own request, guarded by the sha256 of the body read and read back byte for byte with the issue's sub-issue and \"blocked by\" edges unchanged; a refused or failed edit is recorded and does not block the change.",
            "ref": "plan.md#s2--the-issue-texts",
            "excerpt": {
              "ref": "plan.md#s2--the-issue-texts",
              "heading": "S2 — The issue texts",
              "paragraph": "The bodies are edited before Gate 3, so that Gate 3 reads their final form. Of the two steps before the edits, `S2.texts` reads GitHub and writes nothing there (the bodies, their edges, and each anchored link target on `main` when it builds the new bodies; its audit is local), and `S2.gate` is local checks; the nineteen edits are requests; a failed or refused edit does not stop the run.",
              "hash": "c76f3d8886b9"
            }
          },
          {
            "text": "Leave the link in a comment on #1, the 16 in MagicBot #1 to #8 and the 1 in WebTools #55 as follow-ups.",
            "ref": "plan.md#sequencing-and-follow-ups",
            "excerpt": {
              "ref": "plan.md#sequencing-and-follow-ups",
              "heading": "Sequencing and follow-ups",
              "paragraph": "Order. S1 to S11 as the stage table, in one run after the owner's grant; S12 around the landing. The unit starts after #24 has landed, which it has, and blocks #28 and MagicBot#2. Nothing is written to GitHub before S2; the only writes before S8 are the body edits.",
              "hash": "c2f81a33e7b6"
            }
          }
        ],
        "defense": "The edits come before Gate 3, so that it reads the final texts, and while the repository is private, so the 40 to 60 minutes they take add nothing to the public window.",
        "steps": [
          {
            "id": "S2",
            "what": "Read the bodies and their edges, build and audit the new bodies, gate them, send the nineteen edits and count what remains.",
            "check": "19 bodies equal the intended text; 0 occurrences of the branch's name left in them",
            "link": "plan.md#s2--the-issue-texts"
          }
        ],
        "tests": [
          "L2 component — `p25_writes.py` self-test (42 checks: the replacement counts and every refusal, the anchors, each request builder and the pre-write check of an edit); an edit's verifying read has no case, and each edit was read back from GitHub",
          "L4a deterministic — exactly 39 links, 1 clause, 1 plan line and 1 impact link replaced",
          "L3 integration — each edit read back from GitHub"
        ],
        "risks": [
          "A concurrent edit of a body stops that edit only; the next request reads first",
          "Each edit leaves the old body in the issue's edit history, public with the issue; Gate 3 reads those revisions"
        ],
        "source": "plan.md Requirements R3; S2",
        "link": "plan.md#s2--the-issue-texts"
      }
    },
    {
      "id": "pre-flip-gate",
      "group": "The change",
      "name": "The pre-flip gate",
      "system": "kotlinbottools",
      "where": "KotlinBottools on GitHub",
      "gap": {
        "kind": "risk",
        "summary": "The change to public cannot be undone, and its preconditions have to hold when it is made. The repository must be private, have no fork and still reproduce every number, the administrator role must be confirmed, the rate limit must have headroom and Gate 3 must have passed; a default-rule finding in a kept KotlinBottools file also keeps the repository private.",
        "evidence": [
          "`../architecture.md:903` — the pre-flip gate: private, no fork, every number reproduced, the administrator role confirmed, rate-limit headroom, Gate 3 passed",
          "`../architecture.md:956` — the visibility change and the scanning settings are what this unit makes irreversible; a failed Gate 3, or a default-rule finding in a kept KotlinBottools file, leaves the repository private",
          "`../24-repository-hygiene/consequences.md:154` — the workspace configuration now equals `main`'s `.gitleaks.toml`, and the scan of KotlinBottools before the visibility change uses it",
          "`research/README.md:26` — read on 2026-11-12: private, `security_and_analysis` null, the organisation on the free plan, and the signed-in account one of its administrators with a classic token holding `repo`"
        ],
        "source": "../architecture.md §7.5, §8; ../24-repository-hygiene/consequences.md §4; research/README.md, current state",
        "link": "../architecture.md#75-renames-archive-visibility-scanning"
      },
      "options": [
        {
          "id": "pre-flip-checks",
          "name": "Every precondition checked before the change: private, no fork, every number reproduced, the administrator role, rate-limit headroom, Gate 3 passed",
          "verdict": "accepted",
          "why": "A failed check leaves the repository private, and no stop waits on a person: every stop is a failed verification.",
          "source": "../architecture.md §7.5, §8",
          "link": "../architecture.md#75-renames-archive-visibility-scanning"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "text": "When the gate ran, 58 minutes before the change, the repository read private by its id at the name, with no fork, numbers 1 to 31 still reproduced with their kinds, the organisation role `admin`, the core rate limit at least 1000, `security_and_analysis` null and the alerts list answering 404; the gate was not run again before the change, and an authenticated read at 23:50Z, made again at 00:33Z on 2026-11-13, found no drift between Gate 3's dump and the change.",
            "state": "amended",
            "ref": "final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes",
            "excerpt": {
              "ref": "final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes",
              "heading": "4.3 The change to public followed the pre-flip gate by 58 minutes",
              "paragraph": "Departs from: the plan's Requirements, R1 (\"One continuous procedure, with no stop for a person before the change of visibility\") and R7 (\"immediately before the change\"); its Design, \"Shape of the procedure\"; and its Procedure, S7 and S8 (\"The two requests follow each other with nothing between them but their checks\"). · As built: · the pre-flip gate passed at 22:19:34Z and the visibility request was sent 41 s later, at 22:20:15Z; · the request service declined to run the request three times between 22:21Z and 23:05Z, before anything reached GitHub: no `PATCH` was sent; · the request was …",
              "hash": "f5603a1e8851"
            }
          },
          {
            "text": "The legacy repository read private, archived and 404 anonymously by name and by id; the workspace configuration equalled `main`'s committed `.gitleaks.toml` in size, sha256 and blob id, the blob read with no ref-and-path argument; Gate 3, the id check and the run confirmation were marked passed in this run.",
            "state": "as-planned"
          },
          {
            "text": "The probe sets and controls were built from local files, and the anonymous snapshot of the private repository held: the page 404, the REST representation 404 at the anonymous limit of 60, `info/refs` 401 and the credential-less listing refused.",
            "state": "as-planned"
          },
          {
            "text": "No drift was found since Gate 3's corpus was taken: the refs equalled those of its mirror and the drift check found nothing newer, so S3 to S7 ran once; all 29 of the gate's checks held, with the repository private.",
            "state": "as-planned"
          },
          {
            "text": "The requests were written last, as the gate's final step: the visibility request written, and the scanning request, its two ordered parts and the revert prepared. The visibility request left 41 s after the gate passed, but the change followed it only 58 minutes later.",
            "state": "amended",
            "ref": "final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes",
            "excerpt": {
              "ref": "final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes",
              "heading": "4.3 The change to public followed the pre-flip gate by 58 minutes",
              "paragraph": "Departs from: the plan's Requirements, R1 (\"One continuous procedure, with no stop for a person before the change of visibility\") and R7 (\"immediately before the change\"); its Design, \"Shape of the procedure\"; and its Procedure, S7 and S8 (\"The two requests follow each other with nothing between them but their checks\"). · As built: · the pre-flip gate passed at 22:19:34Z and the visibility request was sent 41 s later, at 22:20:15Z; · the request service declined to run the request three times between 22:21Z and 23:05Z, before anything reached GitHub: no `PATCH` was sent; · the request was …",
              "hash": "f5603a1e8851"
            }
          }
        ],
        "changes": [
          {
            "what": "The gate passed at 22:19:34Z and the change to public came 58 minutes later rather than immediately after it; the gate was not run again in between.",
            "why": "The visibility request, sent 41 s after the gate, stayed with the request service, which declined to run it three times before anything reached GitHub. Its own guards, the repository id at the name and the state `private true`, ran in the same shell immediately before the `PATCH`, and nothing else wrote to the repository meanwhile; an authenticated read at 23:50Z, made again at 00:33Z on 2026-11-13, found no drift between Gate 3's dump and the change: the refs as recorded, 35 numbers, no update after the dump, no comment since, no new run and no fork.",
            "when": "S8 · The change and the scanning settings",
            "link": "../architecture.md#75-renames-archive-visibility-scanning"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Immediately before the change, read that the repository is private by its id at the name, has no fork and still reproduces numbers 1 to 31 with their kinds, the organisation role is `admin`, the core rate limit is at least 1000, `security_and_analysis` is null and the alerts list answers 404.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Read that the legacy repository is private, archived and 404 anonymously, the workspace configuration equals `main`'s `.gitleaks.toml`, and Gate 3, the id check and the run confirmation passed in this run.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Take the anonymous snapshot of the private repository: the page 404, the REST representation 404 at the anonymous limit, `info/refs` 401 and a credential-less listing refused.",
            "ref": "plan.md#s7--the-pre-flip-gate",
            "excerpt": {
              "ref": "plan.md#s7--the-pre-flip-gate",
              "heading": "S7 — The pre-flip gate",
              "paragraph": "Every item is a read. S7 runs immediately before S8; nothing is written between its last step and the `public` request.",
              "hash": "488ad0c12e2d"
            }
          },
          {
            "text": "Check for drift since Gate 3's corpus (the refs, the highest number, any update after the dump, any newer run): a first drift runs S3 to S7 once more over the new state, a second hands back with the repository private.",
            "ref": "plan.md#s7--the-pre-flip-gate",
            "excerpt": {
              "ref": "plan.md#s7--the-pre-flip-gate",
              "heading": "S7 — The pre-flip gate",
              "paragraph": "Every item is a read. S7 runs immediately before S8; nothing is written between its last step and the `public` request.",
              "hash": "488ad0c12e2d"
            }
          },
          {
            "text": "Write the requests last, so that the change follows with nothing between.",
            "ref": "plan.md#s7--the-pre-flip-gate",
            "excerpt": {
              "ref": "plan.md#s7--the-pre-flip-gate",
              "heading": "S7 — The pre-flip gate",
              "paragraph": "Every item is a read. S7 runs immediately before S8; nothing is written between its last step and the `public` request.",
              "hash": "488ad0c12e2d"
            }
          }
        ],
        "defense": "The change cannot be recalled, so every precondition is a read taken at the last moment, and a failed read is a stop with the repository private rather than a question put to a person.",
        "steps": [
          {
            "id": "S7",
            "what": "Run the pre-flip reads, build the probe sets and controls, take the anonymous snapshot, check for drift and write the requests.",
            "check": "29 `ok` lines and no `DRIFT`",
            "link": "plan.md#s7--the-pre-flip-gate"
          }
        ],
        "tests": [
          "L2 component — `p25_reads.py` self-test (15 checks: the census, the drift and the alert reads against a stand-in)",
          "L3 integration — the reads against GitHub and the anonymous snapshot"
        ],
        "risks": [
          "Something lands or is edited after the corpus is taken (assumption A1): the drift check repeats the gates once"
        ],
        "source": "plan.md Requirements R7; S7",
        "link": "plan.md#s7--the-pre-flip-gate"
      }
    },
    {
      "id": "visibility-change",
      "group": "The change",
      "name": "The change to public",
      "system": "kotlinbottools",
      "where": "KotlinBottools' visibility",
      "gap": {
        "kind": "missing",
        "summary": "KotlinBottools is private. It has stayed private since the swap, so every public link to a KotlinBottools issue answers \"not found\" to anyone without access: 76 references in MagicBot's issue texts and 6 in WebTools'. The research finds the calls unchanged since the phase's earlier findings and corrects one of them: `gh repo edit` sends a single `PATCH` body, prints nothing without a terminal and reads nothing back. The way back to private recalls nothing already copied.",
        "evidence": [
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:51` — the fresh repository stays private until this unit, and every public link to one of its issues answers \"not found\" until then",
          "`../architecture.md:147` — the phase's acceptance: KotlinBottools public, as a fresh repository, with secret scanning and push protection enabled",
          "KotlinBottools on GitHub, when this run started — its visibility reads `private`",
          "`research/README.md:166` — the change is a `PATCH` of the repository with `visibility` alone, `private` never sent; its response is a first read and a separate `GET` the verifying one",
          "`research/publication-and-scanning-api.md:25` — the calls are unchanged since 2026-10-21 and need nothing enabled first",
          "`research/README.md:186` — `gh repo edit` sends one `PATCH` body rather than concurrent edits, prints nothing without a terminal and reads nothing back",
          "`research/README.md:179` — the way back, `visibility` private, erases stars and watchers, detaches any fork made meanwhile, ends the scanning settings and recalls nothing already copied"
        ],
        "source": "../23-kotlinbottools-rewrite-and-swap/consequences.md §2.1; ../architecture.md §1.2; research/README.md, summary §1; research/publication-and-scanning-api.md §2, §3.5",
        "link": "../23-kotlinbottools-rewrite-and-swap/consequences.md#21-github"
      },
      "options": [
        {
          "id": "gh-visibility",
          "name": "The fresh repository made public with `gh repo edit --visibility public --accept-visibility-change-consequences`, after the pre-flip gate",
          "verdict": "partial",
          "why": "Taken: the fresh repository made public after the pre-flip gate, which reaches no pre-rewrite object, its object store having started empty. Not taken: the command, which sends one body, prints nothing without a terminal and reads nothing back.",
          "source": "../architecture.md §7.5, §8; ../research/README.md §3.9",
          "link": "../architecture.md#75-renames-archive-visibility-scanning"
        },
        {
          "id": "public-in-place",
          "name": "Make the pre-rewrite repository public in place after a force-push",
          "verdict": "declined",
          "why": "It publishes every pre-rewrite object, member and guild names and a session cookie among them, to anyone with one old id, which the activity feed and a four-digit prefix supply.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        },
        {
          "id": "other-name",
          "name": "A new public repository under another name, KotlinBottools kept private",
          "verdict": "declined",
          "why": "It breaks the name and every `KotlinBottools#N` citation and URL in MagicBot, WebTools, the `.github` mirror and the documents.",
          "source": "../architecture.md §14",
          "link": "../architecture.md#14-alternatives-considered"
        },
        {
          "id": "patch-visibility",
          "name": "A `PATCH` of the repository with `visibility` alone, sent as one request after the pre-flip gate and read back by a separate `GET`",
          "verdict": "accepted",
          "why": "The response is a first read and the `GET` the verifying one; a failed change is reported, not retried another way.",
          "source": "plan.md Requirements R8; research/README.md Summary §1",
          "link": "research/README.md#1-the-change-to-public-the-scanning-settings-and-the-way-back"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "statements": [
          {
            "text": "The change went as one `PATCH` that sent `visibility` alone, `private` never sent, run once as one shell between 23:17:14Z and 23:17:24Z, its guards reading the repository private by its id at the name immediately before it. Sent at 22:20:15Z, it was declined three times by the request service before anything reached GitHub, so it followed the pre-flip gate by 58 minutes.",
            "state": "amended",
            "ref": "final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes",
            "excerpt": {
              "ref": "final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes",
              "heading": "4.3 The change to public followed the pre-flip gate by 58 minutes",
              "paragraph": "Departs from: the plan's Requirements, R1 (\"One continuous procedure, with no stop for a person before the change of visibility\") and R7 (\"immediately before the change\"); its Design, \"Shape of the procedure\"; and its Procedure, S7 and S8 (\"The two requests follow each other with nothing between them but their checks\"). · As built: · the pre-flip gate passed at 22:19:34Z and the visibility request was sent 41 s later, at 22:20:15Z; · the request service declined to run the request three times between 22:21Z and 23:05Z, before anything reached GitHub: no `PATCH` was sent; · the request was …",
              "hash": "f5603a1e8851"
            }
          },
          {
            "text": "The response gave the first read and a separate `GET` the verifying read, both reading visibility public with `private` false, and the read-back held at 23:17:54Z.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-change-and-the-scanning-settings",
            "excerpt": {
              "ref": "final-implementation.md#34-the-change-and-the-scanning-settings",
              "heading": "3.4 The change and the scanning settings",
              "paragraph": "The first alert read answered with the list, and the scanning settings needed no second request. In S8 the replies were stored and checked as each arrived, by the sender of the requests, with the plan's commands in the plan's order.",
              "hash": "a033eccfbf59"
            }
          },
          {
            "text": "No 403 or 422 came back: the request reached GitHub once and the change held, so no organisation restriction was met.",
            "state": "as-planned"
          },
          {
            "text": "The way back, a `PATCH` to private, was prepared at the pre-flip gate and has not been sent; the revert trigger is read by the anonymous measurements that follow.",
            "state": "as-planned"
          }
        ],
        "changes": [
          {
            "what": "The visibility request was declined three times by the request service before anything reached GitHub and ran once, between 23:17:14Z and 23:17:24Z, so the change followed the pre-flip gate by 58 minutes, the gate not run again.",
            "why": "The request service declined to run the request three times between 22:21Z and 23:05Z, before anything reached GitHub: no `PATCH` was sent, and the three times left no stored reply. Once the request service was available again the request ran once, as one shell that sent `visibility` only. The `public-sent` stamp holds the time the request was sent.",
            "when": "S8 · The change and the scanning settings",
            "link": "research/README.md#1-the-change-to-public-the-scanning-settings-and-the-way-back"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Send the change as one request: a `PATCH` of the repository with `visibility` public alone, `private` never sent, guarded by the id at the name and the state read private.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "A request is a JSON document that `p25_writes.py request <key>` writes into `$DATA/run/publish/requests/<key>.json` immediately before it is sent; no request file is ever committed. The run sends the file's contents as one request and waits for the reply; on `done` the key's check runs.",
              "hash": "4f994ce876fd"
            }
          },
          {
            "text": "Take the response as the first read and a separate `GET` as the verifying read, both reading public, and record the time of the read-back.",
            "ref": "plan.md#s8--the-change-and-the-scanning-settings",
            "excerpt": {
              "ref": "plan.md#s8--the-change-and-the-scanning-settings",
              "heading": "S8 — The change and the scanning settings",
              "paragraph": "The two requests follow each other with nothing between them but their checks. The times of the two read-backs are recorded.",
              "hash": "fa1f6dde81e9"
            }
          },
          {
            "text": "A 403 or 422 is an organisation restriction: reported with GitHub's message, no other method tried, the repository left private.",
            "ref": "plan.md#s8--the-change-and-the-scanning-settings",
            "excerpt": {
              "ref": "plan.md#s8--the-change-and-the-scanning-settings",
              "heading": "S8 — The change and the scanning settings",
              "paragraph": "The two requests follow each other with nothing between them but their checks. The times of the two read-backs are recorded.",
              "hash": "fa1f6dde81e9"
            }
          },
          {
            "text": "Prepare the way back, a `PATCH` to private, and send it only on the revert trigger, a pre-rewrite id served on any route or listed in any feed; the forks are recorded first, and the record says it recalls nothing already copied.",
            "ref": "plan.md#s9--the-anonymous-measurements",
            "excerpt": {
              "ref": "plan.md#s9--the-anonymous-measurements",
              "heading": "S9 — The anonymous measurements",
              "paragraph": "Each call below is a block; a block ending with exit status 9 is the revert trigger. Every anonymous call sends no credential, and a batch is void unless its controls answer as expected before and after it.",
              "hash": "4c55481d5e39"
            }
          }
        ],
        "defense": "The REST call reads back what it wrote, where `gh repo edit` prints nothing without a terminal; and making the fresh repository public reaches no pre-rewrite object, because its object store started empty.",
        "steps": [
          {
            "id": "S8",
            "what": "Send the change to public and read it back.",
            "check": "public on the first read and on the `GET`; the read-back's time recorded",
            "link": "plan.md#s8--the-change-and-the-scanning-settings"
          }
        ],
        "tests": [
          "L2 component — `p25_writes.py` self-test: the `public` and `private` builders and pre-write checks against a stand-in; the verifying reads of the change have no case (the one to public was exercised against GitHub, the one to private ran nowhere)",
          "L3 integration — the request and its read-back"
        ],
        "risks": [
          "The revert is built and guarded but sent only if the trigger fires, so its path is never exercised otherwise",
          "The revert recalls nothing already copied and detaches any fork into its own public network"
        ],
        "source": "plan.md Requirements R8, R10; The requests; S8",
        "link": "plan.md#s8--the-change-and-the-scanning-settings"
      }
    },
    {
      "id": "scanning-settings",
      "group": "The change",
      "name": "Secret scanning and push protection",
      "system": "kotlinbottools",
      "where": "KotlinBottools' `security_and_analysis` settings",
      "gap": {
        "kind": "missing",
        "summary": "Secret scanning and push protection are not enabled on KotlinBottools. GitHub enables no scanning setting on its own for an organisation-owned repository, and the setting exists only once the repository is public. No read on the free plan says when the scan of the existing history has finished, and an alert carries its literal secret unless it is hidden.",
        "evidence": [
          "`../architecture.md:279` — no scanning setting is enabled on its own for an organisation-owned repository, and the setting exists only once the repository is public",
          "`../research/README.md:613` — the visibility change and the scanning settings cannot be combined, because the settings do not exist while the repository is private",
          "`../architecture.md:923` — a failed scanning update after the change leaves the repository public and unscanned",
          "`research/README.md:169` — the update is a second `PATCH` holding `secret_scanning` and `secret_scanning_push_protection` alone, `advanced_security` never sent; a public repository of a free organisation has both without a purchase",
          "`research/README.md:176` — the scan of the existing history starts with the enablement, takes an undocumented time and has no completion read on this plan, so an empty alerts list means \"no alert yet\"",
          "`research/publication-and-scanning-api.md:138` — an alert carries its literal secret by default, so alerts are read with `hide_secret=true`"
        ],
        "source": "../architecture.md §2.4, §7.6; ../research/README.md §3.4; research/README.md, summary §1; research/publication-and-scanning-api.md §3.3, §3.4",
        "link": "../architecture.md#24-verified-outside-world-facts"
      },
      "options": [
        {
          "id": "separate-patch",
          "name": "A separate `PATCH` of `security_and_analysis`, in the same minute, enabling `secret_scanning` and `secret_scanning_push_protection`, verified by `GET` and by the alerts endpoint answering 200",
          "verdict": "partial",
          "why": "Taken: the separate `PATCH` of the two settings, verified by `GET` and by the alerts list answering 200. Not taken: the same minute, since each write is its own request.",
          "source": "../architecture.md §7.5, §7.6",
          "link": "../architecture.md#75-renames-archive-visibility-scanning"
        },
        {
          "id": "one-request",
          "name": "The visibility and the scanning settings in one request",
          "verdict": "declined",
          "why": "The scanning settings do not exist while the repository is private.",
          "source": "../research/README.md §3.4",
          "link": "../research/README.md#34-github-after-the-push-and-the-visibility-change"
        },
        {
          "id": "paid-scanning",
          "name": "Generic patterns and validity checks",
          "verdict": "declined",
          "why": "Both need a paid plan; they stay off, as they are on MagicBot.",
          "source": "../architecture.md §7.5; ../research/README.md §3.4",
          "link": "../architecture.md#75-renames-archive-visibility-scanning"
        },
        {
          "id": "next-request",
          "name": "The scanning `PATCH` sent as the next request the moment the visibility read-back holds, both read-back times recorded and the gap reported",
          "verdict": "accepted",
          "why": "A repository write took about 2 to 3 minutes from request to reply in the earlier units; this is the shortest gap the requests allow.",
          "source": "plan.md Considerations (a)",
          "link": "plan.md#considerations"
        },
        {
          "id": "both-writes-one-request",
          "name": "Both writes carried in one request, after an action that carries both is added",
          "verdict": "declined",
          "why": "Each request carries one action today; adding one would be a change before the run, for a gap of minutes on content already gated.",
          "source": "plan.md Considerations (b)",
          "link": "plan.md#considerations"
        },
        {
          "id": "test-push",
          "name": "A test push to show push protection working",
          "verdict": "declined",
          "why": "A push is a protocol write, not a read.",
          "source": "plan.md Non-goals; research/README.md Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "scan-end-read",
          "name": "A webhook or the scan-history endpoint to learn when the scan ends",
          "verdict": "declined",
          "why": "Both need Advanced Security, and a webhook is itself a write.",
          "source": "research/README.md Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "changes": [],
        "statements": [
          {
            "text": "The scanning update went as one request 2 s after the visibility read-back (23:17:54Z and 23:17:56Z), enabling secret scanning and push protection, and was carried out between 23:18:36Z and 23:18:46Z.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-change-and-the-scanning-settings",
            "excerpt": {
              "ref": "final-implementation.md#34-the-change-and-the-scanning-settings",
              "heading": "3.4 The change and the scanning settings",
              "paragraph": "The first alert read answered with the list, and the scanning settings needed no second request. In S8 the replies were stored and checked as each arrived, by the sender of the requests, with the plan's commands in the plan's order.",
              "hash": "a033eccfbf59"
            }
          },
          {
            "text": "Its read-back at 23:19:08Z read secret scanning and push protection enabled, generic patterns and validity checks disabled, and AI detection and advanced security absent; both read-back times are recorded, 74 s apart.",
            "state": "as-planned",
            "ref": "final-implementation.md#34-the-change-and-the-scanning-settings",
            "excerpt": {
              "ref": "final-implementation.md#34-the-change-and-the-scanning-settings",
              "heading": "3.4 The change and the scanning settings",
              "paragraph": "The first alert read answered with the list, and the scanning settings needed no second request. In S8 the replies were stored and checked as each arrived, by the sender of the requests, with the plan's commands in the plan's order.",
              "hash": "a033eccfbf59"
            }
          },
          {
            "text": "The update did not fail and both settings read enabled at the first read-back, so the two ordered scanning requests were not sent.",
            "state": "as-planned",
            "ref": "final-implementation.md#1-what-was-built",
            "excerpt": {
              "ref": "final-implementation.md#1-what-was-built",
              "heading": "1. What was built",
              "paragraph": "The bodies of issues #1 to #19, edited by nineteen requests, each sent once: · the 39 links to the deleted planning branch point at `main`, #1's link to the initiative's former impact document pointing at its consequences document; · #1's clause about the planning branch and #2's plan-folder line are corrected; · each body equals its intended text byte for byte, with its parent, sub-issue, \"blocked by\" and \"blocking\" edges unchanged; · no occurrence of the planning branch's name is left in the bodies. · KotlinBottools is public, read back at 23:17:54Z (stamp). · Secret scanning and push …",
              "hash": "e1026261587c"
            }
          },
          {
            "text": "Three alert reads, with the secret hidden and counted by type and state: right after the update at 23:19:09Z, after the measurements and the access check at 23:28:12Z, and before the documents land at 01:05:33Z on 2026-11-13; each found 0 alerts, recorded as no alert yet, and none changed anything.",
            "state": "as-planned",
            "ref": "final-implementation.md#37-the-landings-reads",
            "excerpt": {
              "ref": "final-implementation.md#37-the-landings-reads",
              "heading": "3.7 The landing's reads",
              "paragraph": "The self-tests, run again and kept (2026-11-13, ended 00:10:06Z): `p25_writes` 42 checks passed, `p25_revisions` 10, `p25_idcheck` 20, `p25_reads` 15, `allow_tool` 50. · The third feed read (2026-11-13T00:10:19Z, stamp), 2777 s after the first feed read ended: web 0 old ids and 2 current ids, `activity` 0 and 2, `events` 0 and 1; all three reads valid. · The third alert read (2026-11-13T01:05:33Z, stamp): 0 alerts, no alert yet. The run's record, whose checksum list S11 wrote, still verifies: 11 of 11 files. · The documents gated before their commit (2026-11-13, run at 02:22:04Z over the full …",
              "hash": "71406406320e"
            }
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Send the scanning update as the next request the moment the visibility read-back holds: a second `PATCH` from a body file enabling `secret_scanning` and `secret_scanning_push_protection` and nothing else, `advanced_security` never sent.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Read it back as both enabled, with generic patterns and validity checks not enabled and AI detection and advanced security absent or not enabled; record both read-back times and report the gap.",
            "ref": "plan.md#s8--the-change-and-the-scanning-settings",
            "excerpt": {
              "ref": "plan.md#s8--the-change-and-the-scanning-settings",
              "heading": "S8 — The change and the scanning settings",
              "paragraph": "The two requests follow each other with nothing between them but their checks. The times of the two read-backs are recorded.",
              "hash": "fa1f6dde81e9"
            }
          },
          {
            "text": "A failed update, or a setting not enabled after five reads, is re-sent at once as two ordered requests, secret scanning first; a 422 is reported with its message, no other field is tried, and the run hands back with the repository public.",
            "ref": "plan.md#the-requests",
            "excerpt": {
              "ref": "plan.md#the-requests",
              "heading": "The requests",
              "paragraph": "A request is a JSON document that `p25_writes.py request <key>` writes into `$DATA/run/publish/requests/<key>.json` immediately before it is sent; no request file is ever committed. The run sends the file's contents as one request and waits for the reply; on `done` the key's check runs.",
              "hash": "4f994ce876fd"
            }
          },
          {
            "text": "Read the alerts with the secret hidden, counted by type and state only: right after the update (200 required), when the measurements end and before the documents land; an empty list is \"no alert yet\", and an alert never reverts the change.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          }
        ],
        "defense": "The settings exist only once the repository is public and one request carries one action, so the update follows the change as the next request; the gap of about 2 to 4 minutes falls on content already gated, with one collaborator and nothing else able to push.",
        "steps": [
          {
            "id": "S8",
            "what": "Send the scanning update, read it back, and read the alerts for the first time.",
            "check": "both settings enabled, the paid ones not; the alerts list 200; the gap between the read-backs recorded",
            "link": "plan.md#s8--the-change-and-the-scanning-settings"
          },
          {
            "id": "S11",
            "what": "Read the alerts a second time once the measurements and the access check have ended.",
            "check": "the counts by type and state",
            "link": "plan.md#s11--the-close"
          }
        ],
        "tests": [
          "L2 component — `p25_reads.py` self-test, its alert reads against a stand-in",
          "L3 integration — the update, its read-back and the alert reads",
          "L4c non-functional — the times of the two read-backs and their gap"
        ],
        "risks": [
          "The repository is public and unscanned for about 2 to 4 minutes",
          "No read says when GitHub's scan of the history ends: the alert reads are samples",
          "An interruption between the two writes resumes with the scanning request first"
        ],
        "source": "plan.md Requirements R8, R9; Considerations; S8; S11",
        "link": "plan.md#considerations"
      }
    },
    {
      "id": "anonymous-measurements",
      "group": "After the change",
      "name": "The anonymous measurements",
      "system": "kotlinbottools",
      "where": "KotlinBottools, anonymously · its activity feed",
      "gap": {
        "kind": "missing",
        "summary": "Whether a pre-rewrite id resolves against KotlinBottools anonymously cannot be measured while it is private. The issue asks for every pre-rewrite id to answer \"not found\" anonymously, and for the activity feed, which GitHub publishes with the change, to hold no pre-rewrite id. The research adds that no document says how soon the repository answers anonymously after the change, that the earlier probe helpers read every 422 as \"absent\" and did not check a `want` probe's HTTP status, and that the earlier REST probe set does not fit the anonymous budget of 60 calls an hour.",
        "evidence": [
          "`../architecture.md:707` — against the fresh repository every old id is expected to answer 404: authenticated before the visibility change and anonymously after it; the activity feed's `before_in_old` is expected to be 0",
          "`../research/README.md:629` — GitHub documents that a change from private to public publishes the repository's activity",
          "`../architecture.md:151` — the phase's acceptance: the activity feed holds no pre-rewrite id",
          "`research/README.md:191` — no document says how soon a repository answers anonymously after the change, and nothing could be made public to measure it",
          "`research/anonymous-reads-after-publication.md:27` — the transfer rehearsal saw a public repository's web page answer 504 for at least 11 minutes while REST answered 200",
          "`research/README.md:215` — the earlier probe helpers read every 422 as \"absent\", and their `want` probe did not check the HTTP status",
          "`research/anonymous-reads-after-publication.md:56` — run anonymously, the earlier REST probe set exceeds the 60 calls an hour several times over"
        ],
        "source": "../architecture.md §1.2, §6.6; ../research/README.md §3.4; research/README.md, summary §2; research/anonymous-reads-after-publication.md §2, §3.1 to §3.3",
        "link": "../architecture.md#66-residual-exposure-measurement"
      },
      "options": [
        {
          "id": "status-only-probes",
          "name": "Status-only probes, anonymous, of every old branch tip, every first-changed commit, their trees and a sample of at most 60 manifest blobs, with a positive and a negative control, a protocol-v2 `want` of each old tip, and the activity feed's and events' ids checked against the old-id set",
          "verdict": "accepted",
          "why": "Every result is a tally, so no id or body is printed.",
          "source": "../architecture.md §6.6",
          "link": "../architecture.md#66-residual-exposure-measurement"
        },
        {
          "id": "fixed-wait",
          "name": "A fixed wait after the change instead of a readiness gate",
          "verdict": "declined",
          "why": "No duration is documented, and a wait that happened to be long enough once proves nothing.",
          "source": "research/README.md Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "rest-main-route",
          "name": "Anonymous REST as the main probe route",
          "verdict": "declined",
          "why": "Sixty calls an hour cannot hold the commits, the trees, the blobs and the controls.",
          "source": "research/README.md Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "web-trees-blobs",
          "name": "Web routes for trees and blobs",
          "verdict": "declined",
          "why": "They cannot answer present for any id, so no control could be built.",
          "source": "research/README.md Options that do not fit",
          "link": "research/README.md#options-that-do-not-fit"
        },
        {
          "id": "earlier-helpers",
          "name": "The earlier probe helpers, unchanged",
          "verdict": "declined",
          "why": "They read every 422 as absent and did not check a `want`'s HTTP status.",
          "source": "research/README.md Summary §2",
          "link": "research/README.md#2-the-anonymous-measurements-and-the-access-check"
        }
      ],
      "asBuilt": {
        "state": "amended",
        "summary": null,
        "statements": [
          {
            "text": "The readiness gate was open on its first poll, and the anonymous reads that follow it passed with the repository public.",
            "state": "as-planned"
          },
          {
            "text": "Every route batch read absent only: 87 commits on the web route and 87 by protocol `want`, 3 trees and 58 blobs by `want`, and on the REST route 3 commits, 3 trees and 6 blobs.",
            "state": "as-planned"
          },
          {
            "text": "The batches ran under the plan's route rules, and the report names no void or stopped batch.",
            "state": "as-planned"
          },
          {
            "text": "The second web pass, after a wait of 360 s from the end of the first web batch, read 14 commits absent. The second feed read ended 214 s after the first one's end, inside the events feed's 300 s cache; the third feed read, before the landing, 2777 s after the first read's end, is the read past the caches. All nine feed reads were valid and listed 0 old ids.",
            "state": "amended",
            "ref": "final-implementation.md#44-the-second-feed-read-fell-inside-the-events-feeds-cache",
            "excerpt": {
              "ref": "final-implementation.md#44-the-second-feed-read-fell-inside-the-events-feeds-cache",
              "heading": "4.4 The second feed read fell inside the events feed's cache",
              "paragraph": "Departs from: the plan's Requirements, R10 (the feeds are \"read again at least 6 minutes after the first read ended\"), and its Procedure, S9, step `S9.second`. · As built (stamps): · the block that ran waited 360 s from the end of the first web batch (23:21:19Z) and from nothing else, then ran the second web batch and the second feed read; it ended at 23:27:36Z, 377 s after that end, so the second web batch met its six minutes; · the first feed read began after 23:23:48Z and ended at 23:24:02Z, so the second feed read ended 214 s after the first one's end and at most 228 s after its start; · …",
              "hash": "09076cb96772"
            }
          },
          {
            "text": "No pre-rewrite id was served or listed, in the third feed read either, so the revert trigger did not fire and the repository stays public.",
            "state": "as-planned"
          }
        ],
        "changes": [
          {
            "what": "The second feed read ended 214 s after the first one's end, inside the events feed's 300 s cache, so it was not an independent read. The third feed read, at 2026-11-13T00:10:19Z, 2777 s after the first read's end, listed 0 old ids in each of the three feeds, each with a current id.",
            "why": "The block that ran waited 360 s from the end of the first web batch and from nothing else, which gave the second web pass its six minutes but not the second feed read. The plan's block now waits from the first feed read, and the read past the caches is the third, before the landing.",
            "when": "S9 · The anonymous measurements",
            "link": "research/anonymous-reads-after-publication.md#64-the-feeds"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Open with a readiness gate that spends no REST budget, the page and `info/refs` answering 200 and a credential-less listing succeeding, then one anonymous REST read showing public; polled every 10 s for at most 5 minutes, a gate still closed reported with the repository public.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Probe the 87 pre-rewrite commits on the web route and by protocol-v2 `want`, the old tips' and first-changed commits' trees and at most 60 purged blobs by `want`, and a REST sample of at most 20, each batch bracketed by controls from the fresh mirror and void if its closing control fails.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Read a 422 on `git/trees` as present, require HTTP 200 and read the body of a `want`, prove every call anonymous, pace at 0.4 s and stop REST below 8 calls left.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Read the web activity page and the REST activity and events for the 87 ids, valid only when the same response lists a current id, and read them and the web route again at least 6 minutes later.",
            "ref": "plan.md#s9--the-anonymous-measurements",
            "excerpt": {
              "ref": "plan.md#s9--the-anonymous-measurements",
              "heading": "S9 — The anonymous measurements",
              "paragraph": "Each call below is a block; a block ending with exit status 9 is the revert trigger. Every anonymous call sends no credential, and a batch is void unless its controls answer as expected before and after it.",
              "hash": "4c55481d5e39"
            }
          },
          {
            "text": "Any pre-rewrite id served or listed is the revert trigger: the repository is made private again at once and read back; any other deviation is reported, never reverted.",
            "ref": "plan.md#s9--the-anonymous-measurements",
            "excerpt": {
              "ref": "plan.md#s9--the-anonymous-measurements",
              "heading": "S9 — The anonymous measurements",
              "paragraph": "Each call below is a block; a block ending with exit status 9 is the revert trigger. Every anonymous call sends no credential, and a batch is void unless its controls answer as expected before and after it.",
              "hash": "4c55481d5e39"
            }
          }
        ],
        "defense": "Every result is a tally between controls, so a delay, a cache or a rate limit is never read as an answer, and the main routes stay outside the anonymous REST budget of 60 calls an hour.",
        "steps": [
          {
            "id": "S9",
            "what": "Run the readiness gate, the route batches, the first feed read, then the second pass and feed read.",
            "check": "seven tallies, every one absent only; every feed read 0 old ids",
            "link": "plan.md#s9--the-anonymous-measurements"
          }
        ],
        "tests": [
          "L2 component — 18 stand-in cases of `anon.sh`, its network functions replaced: twelve `classify` cases reaching 6 of its 11 answers and its stop, and six batch cases (a clean, a served, a stopped and a void batch, `run_batch`'s status 9 and the feed counts)",
          "L3 integration — the batches and feeds against the public site",
          "L4c non-functional — the guards built into the blocks (the REST budget guard, the 0.4 s pace, the 5-minute gate and the 6-minute spacing), held by construction and read in the record's times, not tested"
        ],
        "risks": [
          "No document says how soon the repository answers anonymously (assumption A4)",
          "The throttles' thresholds are undocumented: a stopped set resumes with fresh controls (assumption A5)",
          "The events feed can lag up to 6 hours, so no conclusion rests on the feeds alone",
          "No measurement can exclude a copy already taken"
        ],
        "source": "plan.md Requirements R10; S9",
        "link": "plan.md#s9--the-anonymous-measurements"
      }
    },
    {
      "id": "access-check",
      "group": "After the change",
      "name": "The access check and the settings after the change",
      "system": "kotlinbottools",
      "where": "KotlinBottools' access and settings",
      "gap": {
        "kind": "missing",
        "summary": "The settings that follow the visibility have not been read after a change to public. Forking is off while the repository is private, as the organisation's policy requires, and follows the visibility once it is public; the wiki is off; and the design closes the change with an access check. The research finds that `allow_forking` governs private forks only, so it is recorded without a verdict, and that the fork pull-request approval policy cannot be read until the repository is public.",
        "evidence": [
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:48` — forking stays off while private and follows the visibility once public; the wiki is off",
          "`../23-kotlinbottools-rewrite-and-swap/consequences.md:135` — the forking and wiki settings to read again after the change to public",
          "`../architecture.md:910` — the anonymous measurements and the access check, after the scanning update",
          "`research/README.md:213` — `allow_forking` governs private forks only, so it is recorded without a verdict",
          "`research/anonymous-reads-after-publication.md:52` — the fork pull-request approval policy answers 422 while the repository is private",
          "`research/anonymous-reads-after-publication.md:503` — whether a repository made public from private starts at the defaults of one created public cannot be read while it is private"
        ],
        "source": "../architecture.md §7.5; ../23-kotlinbottools-rewrite-and-swap/consequences.md §2.1, §4; research/README.md, summary §2; research/anonymous-reads-after-publication.md §3.5",
        "link": "../architecture.md#75-renames-archive-visibility-scanning"
      },
      "options": [
        {
          "id": "read-back",
          "name": "The access check, with the forking and wiki settings read again after the change",
          "verdict": "accepted",
          "why": "Every write to GitHub is verified by reading it back, and forking follows the visibility.",
          "source": "../architecture.md §7.5; ../23-kotlinbottools-rewrite-and-swap/consequences.md §4",
          "link": "../architecture.md#75-renames-archive-visibility-scanning"
        }
      ],
      "asBuilt": {
        "state": "as-planned",
        "summary": null,
        "statements": [
          {
            "text": "The anonymous half, reading only, found 0 deviations from the answers the plan expects.",
            "state": "as-planned"
          },
          {
            "text": "The authenticated half found 0 deviations.",
            "state": "as-planned"
          },
          {
            "text": "`allow_forking` was recorded as allowed, without a verdict, beside 0 direct collaborators, the count for an organisation owner; nothing was changed.",
            "state": "as-planned"
          }
        ]
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Read, changing nothing, what an anonymous caller reaches: the page 200; the REST representation 200, public, not archived, not a fork, with no fork, the wiki off, issues on, `main` the default branch, and no `security_and_analysis` or `permissions`; the same refs listed as with the token; an issue page and the run list 200, a run's logs 403.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Read with the token: one collaborator, the organisation administrator; no team; the wiki off; the workflow token `read` with approving off; the fork pull-request approval policy at `first_time_contributors`; the private-repository fork-workflow setting answering 422.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Record `allow_forking` without a verdict, since it governs private forks only; a deviation is reported, never reverted.",
            "ref": "plan.md#s10--the-access-check",
            "excerpt": {
              "ref": "plan.md#s10--the-access-check",
              "heading": "S10 — The access check",
              "paragraph": "Reading only, changing nothing. Every deviation is a `RECORD` line that is reported.",
              "hash": "13692e83255a"
            }
          }
        ],
        "defense": "Every write is verified by reading it back, and the settings that follow the visibility can only be read once the repository is public; the same reads run while it is private as a dry run, so the check is proved before it counts.",
        "steps": [
          {
            "id": "S10",
            "what": "Run the anonymous half, then the authenticated half.",
            "check": "8 and 7 `ok` lines; 0 deviations in each half",
            "link": "plan.md#s10--the-access-check"
          }
        ],
        "tests": [
          "L1 gating — the settings read as a dry run before any write, with the two deviations expected while private",
          "L3 integration — both halves after the change"
        ],
        "risks": [
          "A converted repository's approval policy may read another value (assumption A6): reported, nothing changed"
        ],
        "source": "plan.md Requirements R11; S10",
        "link": "plan.md#s10--the-access-check"
      }
    },
    {
      "id": "secret-scan-on-main",
      "group": "Secret scan",
      "name": "The secret-scan run on `main`",
      "system": "kotlinbottools",
      "where": "the `Secret scan` workflow on `main`",
      "gap": {
        "kind": "missing",
        "summary": "The phase asks for the secret-scan workflow to have run green on `main` of the public repository, and the run's logs become public with it. Its four runs so far, every one successful, ran while the repository was private.",
        "evidence": [
          "`../architecture.md:162` — the phase's acceptance: the hygiene change merged, and the secret-scan workflow run green on `main` of the public repository",
          "`../24-repository-hygiene/consequences.md:150` — the first two runs were read after the merge, and this unit confirms the run on `main` again before the visibility change",
          "`../24-repository-hygiene/consequences.md:156` — the shape check of a run's log, which that confirmation can apply before the logs become public",
          "`research/README.md:31` — read on 2026-11-12, `Secret scan` has run four times, every run successful"
        ],
        "source": "../architecture.md §1.2, §15; ../24-repository-hygiene/consequences.md §4; research/README.md, current state",
        "link": "../24-repository-hygiene/consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      "options": [
        {
          "id": "confirm-green",
          "name": "Confirm the run on `main` green before the visibility change, with the log's shape check available to it",
          "verdict": "accepted",
          "why": "The run's log becomes public with the repository, and the shape check reads that its scan steps print only the fixed shapes.",
          "source": "../architecture.md §15; ../24-repository-hygiene/consequences.md §4, §5",
          "link": "../24-repository-hygiene/consequences.md#4-sibling-units-and-neighbouring-issues"
        }
      ],
      "asBuilt": {
        "state": "partially-built",
        "summary": "Built: the latest `Secret scan` push run on `main` is at the head Gate 3 read and completed with success, and the logs of all 4 Actions runs hold only the fixed shapes, each `6 62 0`, so nothing handed back. Left: the push run on `main` at the merge commit, read after the landing's merge and reported with the issue's resolution."
      },
      "verdict": {
        "kind": "build",
        "list": "bullets",
        "statements": [
          {
            "text": "Before the change, confirm the latest `Secret scan` run on `main` at the head Gate 3 read is `completed success`.",
            "ref": "plan.md#requirements",
            "excerpt": {
              "ref": "plan.md#requirements",
              "heading": "Requirements",
              "paragraph": "R1 — One continuous procedure, with no stop for a person before the change of visibility. The temporary permission the owner grants at the request service's console before the run starts (Preconditions, in Design) is the go-ahead for the whole run. The order is: readiness (S1); the issue-body edits (S2); Gate 3's corpus and Gate 3 (S3, S4); the id-reference check (S5); the confirmation of the secret-scan run on `main` (S6); the pre-flip gate with its drift check (S7); the change to public and the scanning settings with the first alert read (S8); the anonymous measurements (S9); the access …",
              "hash": "915091210679"
            }
          },
          {
            "text": "Read and shape-check the log of every Actions run with the repository hygiene unit's fixed shapes, since the logs become readable to anyone signed in once the repository is public: each run of the current workflow reads `6 62 0`.",
            "ref": "plan.md#s6--the-secret-scan-run-on-main",
            "excerpt": {
              "ref": "plan.md#s6--the-secret-scan-run-on-main",
              "heading": "S6 — The secret-scan run on `main`",
              "paragraph": "Expected: 1 + 3 per run: 13 `ok` lines for the four runs, and the `RECORD`. The two runs of #35 are read here for the first time. The marker counts are those of a passed run: the canary's two checks and two scans, the controls' one verdict, and the history and tree scans (the same workflow ran in every run; a run of another workflow is not covered by this shape check and is a stop). A shape that differs (`6 62 0` is the headers, the lines and the lines of another shape) hands back to the owner before the change, because the logs become visible to anyone with an account once the repository is …",
              "hash": "640aab18120c"
            }
          },
          {
            "text": "A run that is not green, or a log line of another shape, hands back with the repository private.",
            "ref": "plan.md#stops-and-the-state-each-leaves",
            "excerpt": {
              "ref": "plan.md#stops-and-the-state-each-leaves",
              "heading": "Stops and the state each leaves",
              "paragraph": "This extends architecture §7.6 for this unit.",
              "hash": "c6edb26775e1"
            }
          },
          {
            "text": "After the landing's merge, read the push run on `main` at the merge commit the same way and report it with the issue's resolution.",
            "ref": "plan.md#s12--the-landings-reads",
            "excerpt": {
              "ref": "plan.md#s12--the-landings-reads",
              "heading": "S12 — The landing's reads",
              "paragraph": "The landing is the ordinary landing of the run (a commit request for the unit's documents, then `prepare-landing` and `land`, outside the job and its grant), with no version bump. S12 is the reads and gates around it. It is not one of the stages of the change: `S12.selftests`, `S12.feeds`, `S12.alerts` and `S12.docs` run, in that order, while the unit's documents are finished, before the document commit, and `S12.landed` after the merge. S12 keeps what it reads in `$DATA/run/publish/landing/` and writes nothing into the run's record, whose checksum list S11 closed. Each step's output is kept: …",
              "hash": "ee866e60e5e4"
            }
          }
        ],
        "defense": "The logs are published with the repository, so they are gated like the rest of it before the change; the run at the merge shows the workflow green on the public repository.",
        "steps": [
          {
            "id": "S6",
            "what": "Read the latest run on `main` and shape-check every run's log.",
            "check": "13 `ok` lines for the four runs",
            "link": "plan.md#s6--the-secret-scan-run-on-main"
          }
        ],
        "tests": [
          "L4a deterministic — the shape counts `6 62 0` and the marker counts `2 1 2 2`",
          "L4c non-functional — the output rule's shape check of every log"
        ],
        "risks": [
          "A run of another workflow is not covered by the shape check, and is a stop"
        ],
        "source": "plan.md Requirements R6; S6; S12",
        "link": "plan.md#s6--the-secret-scan-run-on-main"
      }
    }
  ],
  "impact": {
    "basis": "plan",
    "summary": "No module is published and no version moves: the landing carries documents and generated boards only. What becomes public is the repository itself, its rewritten history on every ref, its issues and pull requests with their earlier revisions, and its Actions runs, with secret scanning and push protection on. References to KotlinBottools issues resolve for everyone, and the later units take the corrected anonymous probe rules (`consequences.md` §1 to §4; the known gaps in §5, the follow-ups in §6).",
    "none": null,
    "release": {
      "bump": "none",
      "version": null,
      "note": "no module is published and no version moves",
      "nothingPublished": true
    },
    "downstream": [
      {
        "who": "KotlinBottools on GitHub",
        "kind": "repository",
        "system": "kotlinbottools",
        "effect": "behaviour",
        "summary": "Public: anyone can read and clone its code and history and read its issues, pull requests and their texts, anyone signed in can read its Actions runs' logs, anyone can fork it, and its activity is published. The legacy repository stays private and archived, the only copy on GitHub of the objects from before the rewrite.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Secret scanning and push protection",
        "kind": "repository",
        "system": "kotlinbottools",
        "effect": "additive",
        "summary": "On: GitHub's scan of the history and the texts starts when they are enabled and runs for an undocumented time, an alert reaching the owner through GitHub; push protection checks every later push. Generic patterns, validity checks and AI detection stay off.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Outside contributors",
        "kind": "consumer",
        "system": "kotlinbottools",
        "effect": "additive",
        "summary": "Pull requests from forks run the `Secret scan` workflow with its read-only token, under the approval policy for first-time contributors; the repository's Actions runs are free from now on. Branch protection and rulesets become available, none set.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Issues #1 to #19",
        "kind": "repository",
        "system": "kotlinbottools",
        "effect": "behaviour",
        "summary": "Their links to the deleted planning branch point at `main`, #1's link to the former impact document at its consequences document, and #1's branch clause and #2's plan-folder line are corrected; each edit adds a revision to the issue's public edit history.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "MagicBot and WebTools issue texts",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "Their references to KotlinBottools issues, by `KotlinBottools#N` or through the reserved `KotlinBottools-next`, resolve for everyone; until the change they answered \"not found\" to anyone without access.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "Readers of the public texts",
        "kind": "consumer",
        "system": "kotlinbottools",
        "effect": "none",
        "summary": "The pre-rewrite commit ids in three resolution comments, in the boards' generated fields and texts (10 ids in the current files, 13 over their history) and in the older documents' dated citations resolve to nothing here: every one of the 87 pre-rewrite commits answers \"not found\", anonymously.",
        "link": "consequences.md#21-github"
      },
      {
        "who": "The machine that runs the procedure",
        "kind": "operator",
        "system": null,
        "effect": "additive",
        "summary": "The unit's tools are saved in the workspace beside the phase's other tools, and its records in the data folder, never committed, printed or quoted; the anonymous measurements spend at most 48 of the 60 anonymous REST calls in the hour, and the further feed read at most 6 more, the web and git-protocol probes outside that budget.",
        "link": "consequences.md#22-this-machine"
      }
    ],
    "adaptation": [
      {
        "who": "The later rewrite units, #26 and #27",
        "system": null,
        "need": "required",
        "summary": "Their anonymous measurements take the corrected route rules: a 422 from `git/trees` means the id is present, as a blob, and a protocol-v2 `want` needs HTTP 200 and its body read. They keep the two stale pins of the workspace scripts, and take the follow-ups on the tools' self-tests and texts.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "The residual report and cleanup, #28",
        "system": null,
        "need": "required",
        "summary": "It takes KotlinBottools' row of the residual report (the anonymous tallies, the activity-feed membership, the public window of the pre-rewrite repository, the time of the change), the alert reads, the third among the landing's reads, the follow-ups and this unit's tools.",
        "link": "consequences.md#4-sibling-units-and-neighbouring-issues"
      },
      {
        "who": "A later publication of a phase repository",
        "system": null,
        "need": "optional",
        "summary": "It can take Gate 3's corpus, which includes the earlier revisions of edited texts and the logs of the Actions runs.",
        "link": "consequences.md#3-adoption"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md §1 to §6; plan.md Interfaces with sibling units",
    "link": "consequences.md#2-blast-radius"
  },
  "tests": {
    "updated": "2026-11-13T00:43:53Z",
    "added": [],
    "amended": [],
    "relevant": [
      {
        "class": "p25_writes.py selftest",
        "module": "tools",
        "tests": 42,
        "result": {
          "state": "passed",
          "passed": 42,
          "failed": 0,
          "skipped": 0,
          "pass": 2,
          "at": "2026-11-13T00:43:53Z"
        },
        "testLevel": "2"
      },
      {
        "class": "p25_revisions.py selftest",
        "module": "tools",
        "tests": 10,
        "result": {
          "state": "passed",
          "passed": 10,
          "failed": 0,
          "skipped": 0,
          "pass": 2,
          "at": "2026-11-13T00:43:53Z"
        },
        "testLevel": "2"
      },
      {
        "class": "p25_idcheck.py selftest",
        "module": "tools",
        "tests": 20,
        "result": {
          "state": "passed",
          "passed": 20,
          "failed": 0,
          "skipped": 0,
          "pass": 2,
          "at": "2026-11-13T00:43:53Z"
        },
        "testLevel": "2"
      },
      {
        "class": "p25_reads.py selftest",
        "module": "tools",
        "tests": 15,
        "result": {
          "state": "passed",
          "passed": 15,
          "failed": 0,
          "skipped": 0,
          "pass": 2,
          "at": "2026-11-13T00:43:53Z"
        },
        "testLevel": "2"
      },
      {
        "class": "allow_tool.py selftest",
        "module": "tools",
        "tests": 50,
        "result": {
          "state": "passed",
          "passed": 50,
          "failed": 0,
          "skipped": 0,
          "pass": 2,
          "at": "2026-11-13T00:43:53Z"
        },
        "testLevel": "2"
      },
      {
        "class": "anon.sh stand-in cases",
        "module": "tools",
        "tests": 18,
        "result": {
          "state": "skipped",
          "passed": 0,
          "failed": 0,
          "skipped": 18,
          "pass": 2,
          "at": "2026-11-13T00:43:53Z"
        },
        "testLevel": "2"
      }
    ]
  },
  "roadmap": {
    "issue": 2,
    "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
    "asOf": "2026-11-12",
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
  },
  "followUps": [
    {
      "name": "The remaining traces of the deleted planning branch outside the bodies",
      "note": "a plain mention of the branch's name, not a link, in a comment on #1, which no request edits; sixteen links in MagicBot #1 to #8 and one in WebTools #55, outside this unit's writes"
    },
    {
      "issue": 3,
      "note": "Phase 1 makes `Secret scan (gitleaks)` a required check on `main`, with its own workflow's checks"
    },
    {
      "name": "An alert from GitHub's scan",
      "note": "if one appears, the owner rotates the secret or dismisses the alert"
    },
    {
      "name": "The stand-in cases of the anonymous helpers",
      "note": "they write and delete files in the live scratch folder, so they cannot run again once the probe sets exist; a unit that reuses `anon.sh` (#26, #27) runs them in a scratch folder of its own"
    },
    {
      "name": "The comments and docstrings of the unit's tools",
      "note": "they state less than the tools do; they change when #26 or #27 saves a tool it reuses again and records its new pins, this unit's pins staying as recorded"
    },
    {
      "name": "`KotlinBottools-next` stays reserved",
      "note": "standing, from the rewrite and swap unit's consequences (§6)"
    }
  ],
  "documents": [
    {
      "label": "Research",
      "path": "research/README.md",
      "note": "the two questions, the verification and the summary; findings in `publication-and-scanning-api.md` and `anonymous-reads-after-publication.md`"
    },
    {
      "label": "Architecture",
      "path": "../architecture.md",
      "note": "the parent design: unit `kotlinbottools-publish` in §15, with §6.5, §6.6, §7.5 and §8"
    },
    {
      "label": "plan.md",
      "path": "plan.md",
      "note": "the requirements R1 to R14, the stages S1 to S11 with every block, the requests, the stops and the state each leaves, the landing's reads, and the tools in Appendix A; two earlier versions under `superseded/`"
    },
    {
      "label": "final-implementation.md",
      "path": "final-implementation.md",
      "note": "the as-built record: what was built, the acceptance, every stage's measurements and the landing's reads, and the four deviations from the plan"
    },
    {
      "label": "consequences.md",
      "path": "consequences.md",
      "note": "the blast radius on GitHub, this machine and the documents, the adoption, the later units, the known gaps and the follow-ups"
    },
    {
      "label": "Phase research",
      "path": "../research/README.md",
      "note": "#2's research: findings 3, GitHub after the push, the visibility change and the scanning settings; findings 5, the privacy gate and the references"
    },
    {
      "label": "Phase consequences",
      "path": "../consequences.md",
      "note": "the phase's follow-ups this unit meets: the planning-branch links and machine-local paths in issue texts (§6)"
    },
    {
      "label": "Unit 3's consequences",
      "path": "../23-kotlinbottools-rewrite-and-swap/consequences.md",
      "note": "what the rewrite and swap hands this unit (§4), and the issue-text edits still open before the change to public (§6)"
    },
    {
      "label": "Unit 4's consequences",
      "path": "../24-repository-hygiene/consequences.md",
      "note": "what the repository hygiene hands this unit: the secret-scan workflow on `main`, the workspace configuration and the log's shape check (§4)"
    }
  ],
  "notes": {
    "corrections": [
      {
        "what": "An implementation stage's report was recorded at 2026-11-12 21:45:14 UTC: The second stage ended at 21:44:16Z, the time read when it ended and stated in its report; the event reporting it carried the time it was sent, 58 seconds later. It is recorded at 21:44:16 UTC.",
        "when": "2026-11-12",
        "retime": {
          "event": "implementation-stage",
          "from": "2026-11-12T21:45:14Z",
          "to": "2026-11-12T21:44:16Z"
        }
      },
      {
        "what": "An implementation stage's report was recorded at 2026-11-12 22:21:55 UTC: The seventh stage ended at 22:19:35Z, the time read when it ended; the event reporting it arrived 140 seconds later, behind another request, and was recorded at the time it arrived. It is recorded at 22:19:35 UTC.",
        "when": "2026-11-12",
        "retime": {
          "event": "implementation-stage",
          "from": "2026-11-12T22:21:55Z",
          "to": "2026-11-12T22:19:35Z"
        }
      },
      {
        "what": "The anonymous measurements' tests were copied from the plan's test plan as it first read, which said the stand-in cases of `anon.sh` cover every `classify` pair and counted the blocks' guards as non-functional tests. The plan's re-pass corrected both: the twelve `classify` cases reach 6 of its 11 answers and its stop, and the guards hold by construction, their effect read in the record's times, not tested. The two tests are corrected in place.",
        "when": "2026-11-13"
      },
      {
        "what": "The as-built record named the revisions dump's 44 earlier revisions a departure from an expected 26; the plan the run worked to from the pre-flip gate on expects 44, and the record no longer names it one. Gate 3's first as-built statement and its change are corrected in place. The pre-flip gate's pass is the record's stamp, 22:19:34Z, 41 s before the visibility request, where the board said 22:19:35Z and 40 s.",
        "when": "2026-11-13"
      },
      {
        "what": "An implementation stage's report was recorded at 2026-11-12 22:19:35 UTC: the record's stamp of the pre-flip gate's pass is 22:19:34Z; the time held was read from the clock one second later. It is recorded at 22:19:34 UTC.",
        "when": "2026-11-13",
        "retime": {
          "event": "implementation-stage",
          "from": "2026-11-12T22:19:35Z",
          "to": "2026-11-12T22:19:34Z"
        }
      },
      {
        "what": "The impact's entry for the machine that runs the procedure stated the anonymous measurements' spend as at most about 45 of the 60 anonymous REST calls an hour, as consequences.md then read. consequences.md now states at most 48 in the hour, with at most 6 more for the further feed read, and the entry is corrected in place.",
        "when": "2026-11-13"
      },
      {
        "what": "The component tests of two Rows were copied from the plan's test plan as it first read, which said the self-test of `p25_writes.py` covers each pre-write check and verifying read. The corrected plan says that of the verifying reads only the one of the scanning settings has a case: an edit's, the change to public's and the change to private's have none. The tests of the planning-branch links and of the change of visibility are corrected in place.",
        "when": "2026-11-13"
      },
      {
        "what": "The as-built record's sections were numbered when it was reconciled, so the references of six as-built statements named headings it no longer has; each now names its numbered section (§4.1 to §4.4, §3.4). The changes recorded on the planning-branch links, the pre-flip gate and the change to public link what each rests on as the record now cites it, and the wording of the refusals follows the record: the request service declined the visibility request three times before anything reached GitHub.",
        "when": "2026-11-13"
      },
      {
        "what": "Secret scanning and push protection carried a change saying the commands of S8 were run by the sender of the requests as each reply arrived. The reconciled as-built record states it among the measurements (§3.4), with the plan's commands in the plan's order, and lists no deviation for it, so the change is no longer recorded on the Row; its outcome, as planned, follows the third alert read.",
        "when": "2026-11-13"
      },
      {
        "what": "An implementation stage's report of 2026-11-12 23:19:09 UTC is reworded in the report that closed S8 and #2's mirror of it: the as-built record words this as the request service declining to run the request three times before anything reached GitHub. The passage now reads \"The visibility request was first sent at 22:20:15Z; the request service declined to run it three times before anything reached GitHub, so the change followed the pre-flip gate by 58 minutes.\"",
        "when": "2026-11-13",
        "reword": {
          "event": "implementation-stage",
          "at": "2026-11-12T23:19:09Z",
          "from": "sha256:b4b7983e99f5",
          "to": "sha256:f94e9fef7c00"
        }
      },
      {
        "what": "The halt of 2026-11-13 01:00:52 UTC is reworded in a question it put and #2's mirror of it: the as-built record describes how the request service handled the request to change the visibility, and the question now says so in its words. The passage now reads \"and the as-built record describes how the request service handled the request to change the visibility before it ran. How much of this stays in the public documents?\"",
        "when": "2026-11-13",
        "reword": {
          "event": "halted",
          "at": "2026-11-13T01:00:52Z",
          "from": "sha256:bc7612a1861b",
          "to": "sha256:88831bbfa397"
        }
      },
      {
        "what": "An implementation stage's report of 2026-11-12 21:48:47 UTC is reworded in the report that closed S3, S4, S5 and S6 and #2's mirror of it: the sentence named a data field. The passage is taken out.",
        "when": "2026-11-13",
        "reword": {
          "event": "implementation-stage",
          "at": "2026-11-12T21:48:47Z",
          "from": "sha256:745c48d37570",
          "to": "sha256:e3b0c44298fc"
        }
      },
      {
        "what": "An implementation stage's report of 2026-11-12 23:28:20 UTC is reworded in the report that closed S9, S10 and S11 and #2's mirror of it: the sentence named a data field. The passage is taken out.",
        "when": "2026-11-13",
        "reword": {
          "event": "implementation-stage",
          "at": "2026-11-12T23:28:20Z",
          "from": "sha256:16aed8cec7ab",
          "to": "sha256:e3b0c44298fc"
        }
      }
    ]
  },
  "issueBoards": {
    "21": "../21-preparation/dashboard.html",
    "22": "../22-transfer-rehearsal/dashboard.html",
    "23": "../23-kotlinbottools-rewrite-and-swap/dashboard.html",
    "24": "../24-repository-hygiene/dashboard.html"
  },
  "links": {
    "workBoard": "../../../index.html",
    "repoBoard": "../../../../dashboards/index.html",
    "boards": {
      "kotlinbottools": "../../../../dashboards/index.html"
    }
  }
}
);
