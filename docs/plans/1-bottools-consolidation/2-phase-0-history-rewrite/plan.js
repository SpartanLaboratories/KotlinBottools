/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 2,
  "slug": "2-phase-0-history-rewrite",
  "folder": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite",
  "kind": "tracking",
  "title": "Phase 0 history rewrite",
  "issueTitle": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
  "function": "Phase 0 of the BotTools consolidation purges secrets and legacy data from the histories of the six bot repositories: KotlinBottools, GKB2, GKB, BotTools and the private repositories. The legacy data is first copied out byte-exactly, with a manifest of the blobs to purge; then each repository is rewritten with `git filter-repo` in a mirror clone, in a fixed order, and must pass its exit tests on a fresh mirror. KotlinBottools gains a root-anchored `.gitignore` and a gitleaks CI job and becomes public with secret scanning and push protection; what GitHub still serves of the old histories is measured and reported. The phase moves no version.",
  "status": "built",
  "sized": "2026-11-07T07:05:00Z",
  "parent": {
    "issue": 1,
    "board": "../dashboard.html"
  },
  "fixOf": null,
  "branch": "docs/issue-1-bottools-consolidation",
  "baseline": {
    "ref": "main",
    "sha": "221350d",
    "date": "2026-10-21"
  },
  "asBuilt": {
    "sha": "3625163c1a1177afca20488e421a5f44778724e0",
    "merge": "3625163c1a1177afca20488e421a5f44778724e0",
    "pr": 49,
    "date": "2026-11-17",
    "at": "2026-11-17T01:13:11Z"
  },
  "systems": [],
  "wip": {
    "step": "landed",
    "since": "2026-11-17T01:13:11Z",
    "updated": "2026-11-17T01:13:11Z",
    "detail": "Landed: 8 of 8 units, the last #28 in PR #49.",
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
    "interview": [],
    "plan": null,
    "stages": [],
    "remediation": null,
    "open": [],
    "event": {
      "name": "landed",
      "at": "2026-11-17T01:13:11Z",
      "note": "#28, its last unit, landed in PR #49"
    },
    "history": {
      "sizing": [
        {
          "since": null,
          "ended": "2026-11-07T07:05:00Z",
          "endedBy": "sized",
          "to": "plan"
        }
      ],
      "plan": [
        {
          "since": "2026-11-07T07:05:00Z",
          "ended": "2026-11-07T07:11:27Z",
          "endedBy": "researched",
          "to": "architecture",
          "event": {
            "name": "sized",
            "at": "2026-11-07T07:05:00Z"
          },
          "detail": "History rewrite of six repositories, planned to the architecture; each unit becomes a sub-issue. Research is verified; the architecture draft awaits revision and sign-off.",
          "plan": {
            "state": "re-pass",
            "from": "parent",
            "since": "2026-11-07T07:05:00Z"
          }
        }
      ],
      "architecture": [
        {
          "since": "2026-11-07T07:11:27Z",
          "ended": "2026-11-07T07:25:54Z",
          "endedBy": "halted",
          "to": "architecture",
          "event": {
            "name": "researched",
            "at": "2026-11-07T07:11:27Z"
          },
          "detail": "Research verified (five findings files and the summary). The architecture draft is being revised: every unit becomes a sub-issue, and the Known gaps section moves into consequences.md before sign-off.",
          "held": true,
          "asked": [
            {
              "text": "Sign off the architecture and the eight sub-issues?",
              "options": [
                "Approve as proposed",
                "Approve with changes"
              ],
              "answer": "Approved as proposed.",
              "asked": "2026-11-07T07:25:54Z",
              "answered": "2026-11-07T07:29:01Z"
            },
            {
              "text": "The KotlinBottools rewrite, fresh repository, swap and clone realignment form one unit that spans three parts of the design: keep it as one unit?",
              "answer": "Yes, one unit.",
              "asked": "2026-11-07T07:25:54Z",
              "answered": "2026-11-07T07:29:01Z"
            },
            {
              "text": "Remove the machine-local paths already committed in the planning documents from the history too?",
              "answer": "Yes: folder paths and account-name paths, in every file and commit.",
              "asked": "2026-11-07T07:25:54Z",
              "answered": "2026-11-07T07:29:01Z"
            },
            {
              "text": "How should the writes the request protocol has no action for yet be enabled (repository creation, transfers, renames, visibility, mirror pushes)?",
              "answer": "Directed by the maintainer.",
              "asked": "2026-11-07T07:25:54Z",
              "answered": "2026-11-07T07:29:01Z"
            }
          ]
        }
      ],
      "document": [
        {
          "since": "2026-11-07T07:29:01Z",
          "ended": "2026-11-07T07:51:13Z",
          "endedBy": "run-restarted",
          "to": "document",
          "event": {
            "name": "state-boards",
            "at": "2026-11-07T07:51:13Z",
            "note": "the state boards; 1 of 3 tasks done"
          },
          "detail": "Document: 1 of 3 tasks done; State boards with the planned units drawn dashed current.",
          "document": {
            "tasks": [
              {
                "id": "reconcile-plan",
                "name": "Architecture and consequences confirmed final",
                "state": "done"
              },
              {
                "id": "state-boards",
                "name": "State boards with the planned units drawn dashed",
                "state": "current"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "todo"
              }
            ]
          },
          "outage": "run resumed from its handoff after the previous session ended"
        },
        {
          "since": "2026-11-08T01:12:00Z",
          "ended": "2026-11-08T01:41:50Z",
          "endedBy": "landing",
          "to": "landing",
          "event": {
            "name": "document",
            "at": "2026-11-08T01:40:22Z",
            "note": "3 of 3 tasks done"
          },
          "detail": "Document: 3 of 3 tasks done; every task done.",
          "document": {
            "tasks": [
              {
                "id": "reconcile-plan",
                "name": "Architecture and consequences confirmed final",
                "state": "done"
              },
              {
                "id": "state-boards",
                "name": "State boards with the planned units drawn dashed",
                "state": "done"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "done"
              }
            ]
          }
        }
      ],
      "landing": [
        {
          "since": "2026-11-08T01:41:50Z",
          "ended": "2026-11-08T01:42:49Z",
          "endedBy": "merge",
          "to": "merge",
          "event": {
            "name": "landing",
            "at": "2026-11-08T01:41:50Z",
            "note": "land accepted"
          },
          "detail": "Landing: the land accepted; the branch carries the code, the version bump, the reconciled documents and the state boards."
        }
      ],
      "merge": [
        {
          "since": "2026-11-08T01:42:49Z",
          "ended": "2026-11-08T01:45:25Z",
          "endedBy": "sub-issues-filed",
          "to": "sub-issues",
          "event": {
            "name": "landed",
            "at": "2026-11-08T01:42:58Z"
          },
          "detail": "The plan landed in PR #20; its units are filed next."
        }
      ],
      "sub-issues": [
        {
          "since": "2026-11-08T01:45:25Z",
          "ended": "2026-11-08T21:15:43Z",
          "endedBy": "sized",
          "to": "implementation",
          "event": {
            "name": "sub-issues-filed",
            "at": "2026-11-08T01:46:36Z",
            "note": "final: filing done"
          },
          "detail": "8 of 8 units filed as sub-issues; each unit's board appears when its run starts.",
          "units": {
            "done": 8,
            "total": 8
          }
        }
      ],
      "implementation": [
        {
          "since": "2026-11-08T21:15:43Z",
          "ended": "2026-11-17T01:13:11Z",
          "endedBy": "landed",
          "to": "landed",
          "event": {
            "name": "sub-issues-filed",
            "at": "2026-11-08T01:46:36Z",
            "note": "final: filing done"
          },
          "detail": "8 of 8 units landed."
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
      "pr": 20,
      "merge": "1a74516a28c14f22d642d6adb3000aca264b6731"
    },
    "asked": [
      {
        "step": "architecture",
        "text": "Sign off the architecture and the eight sub-issues?",
        "options": [
          "Approve as proposed",
          "Approve with changes"
        ],
        "answer": "Approved as proposed.",
        "asked": "2026-11-07T07:25:54Z",
        "answered": "2026-11-07T07:29:01Z"
      },
      {
        "step": "architecture",
        "text": "The KotlinBottools rewrite, fresh repository, swap and clone realignment form one unit that spans three parts of the design: keep it as one unit?",
        "answer": "Yes, one unit.",
        "asked": "2026-11-07T07:25:54Z",
        "answered": "2026-11-07T07:29:01Z"
      },
      {
        "step": "architecture",
        "text": "Remove the machine-local paths already committed in the planning documents from the history too?",
        "answer": "Yes: folder paths and account-name paths, in every file and commit.",
        "asked": "2026-11-07T07:25:54Z",
        "answered": "2026-11-07T07:29:01Z"
      },
      {
        "step": "architecture",
        "text": "How should the writes the request protocol has no action for yet be enabled (repository creation, transfers, renames, visibility, mirror pushes)?",
        "answer": "Directed by the maintainer.",
        "asked": "2026-11-07T07:25:54Z",
        "answered": "2026-11-07T07:29:01Z"
      }
    ],
    "waits": [
      {
        "step": "architecture",
        "since": "2026-11-07T07:25:54Z",
        "ended": "2026-11-07T07:29:01Z",
        "by": "halted"
      }
    ],
    "document": {
      "tasks": [
        {
          "id": "reconcile-plan",
          "name": "Architecture and consequences confirmed final",
          "state": "done"
        },
        {
          "id": "state-boards",
          "name": "State boards with the planned units drawn dashed",
          "state": "done"
        },
        {
          "id": "document-landing",
          "name": "Document commit",
          "state": "done"
        }
      ]
    },
    "outages": [
      {
        "step": "document",
        "since": "2026-11-07T07:51:13Z",
        "ended": "2026-11-08T01:12:00Z",
        "reason": "run resumed from its handoff after the previous session ended"
      }
    ]
  },
  "milestones": [
    {
      "column": "gap",
      "label": "Research verified",
      "date": "2026-10-21",
      "ref": "research/README.md",
      "note": "five questions and findings files; all 122 load-bearing claims re-opened at their sources on 2026-10-21 hold, none fails or is unclear"
    },
    {
      "column": "considered",
      "label": "Architecture signed off",
      "date": "2026-11-07",
      "ref": "architecture.md",
      "note": "§14 alternatives, §15 decomposition into eight units; the KotlinBottools rewrite also replaces machine-local folder paths and account-name paths, which the architecture is being updated for"
    },
    {
      "column": "verdict",
      "label": "Architecture final",
      "date": "2026-11-07",
      "ref": "architecture.md#15-decomposition",
      "note": "eight units in landing order, each with its scope, blockers, requested writes and the repository it lands on (§15); the KotlinBottools rewrite carries the path scrub with its fidelity check and zero count (§6.4)"
    },
    {
      "column": "built",
      "label": "Merged",
      "date": "2026-11-17",
      "ref": "PR #49",
      "note": "merged as 3625163"
    }
  ],
  "trail": [
    {
      "date": "2026-11-07",
      "column": "gap",
      "label": "Sized; the plan starts"
    },
    {
      "date": "2026-11-07",
      "column": "gap",
      "label": "Research verified; the architecture next",
      "ref": "research/README.md"
    },
    {
      "date": "2026-11-07",
      "column": "considered",
      "label": "Halted at the architecture: waiting on you (The revised architecture decomposes Phase 0 into eight units, each to become a sub-issue of #2.)"
    },
    {
      "date": "2026-11-07",
      "column": "considered",
      "label": "Architecture signed off",
      "ref": "architecture.md"
    },
    {
      "date": "2026-11-07",
      "column": "verdict",
      "label": "Architecture final, with its units",
      "ref": "architecture.md"
    },
    {
      "date": "2026-11-07",
      "column": "verdict",
      "label": "Planning branch `docs/issue-1-bottools-consolidation` confirmed"
    },
    {
      "date": "2026-11-07",
      "column": "built",
      "label": "Document: 1 of 3 tasks done"
    },
    {
      "date": "2026-11-07",
      "column": "built",
      "label": "Document: State boards with the planned units drawn dashed current"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "Document: Document commit current"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "Document: every task done"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "Landing: the land accepted"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "Merge: merging it in PR #20",
      "ref": "PR #20"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "The plan landed in PR #20, merge 1a74516",
      "ref": "PR #20"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "1 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "2 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "3 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "4 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "5 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "6 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "7 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "8 of 8 units filed as sub-issues"
    },
    {
      "date": "2026-11-08",
      "column": "considered",
      "label": "8 of 8 units filed as sub-issues; filing done"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "#21 started"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "#21 landed"
    },
    {
      "date": "2026-11-08",
      "column": "built",
      "label": "#22 started"
    },
    {
      "date": "2026-11-10",
      "column": "built",
      "label": "#22 landed"
    },
    {
      "date": "2026-11-10",
      "column": "built",
      "label": "#23 started"
    },
    {
      "date": "2026-11-11",
      "column": "built",
      "label": "#23 landed"
    },
    {
      "date": "2026-11-11",
      "column": "built",
      "label": "#24 started"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "#24 landed"
    },
    {
      "date": "2026-11-12",
      "column": "built",
      "label": "#25 started"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "#25 landed"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "#26 started"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "#26 landed"
    },
    {
      "date": "2026-11-13",
      "column": "built",
      "label": "#27 started"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "#27 landed"
    },
    {
      "date": "2026-11-16",
      "column": "built",
      "label": "#28 started"
    },
    {
      "date": "2026-11-17",
      "column": "built",
      "label": "#28 landed"
    },
    {
      "date": "2026-11-17",
      "column": "built",
      "label": "Landed: every unit, the last #28 in PR #49, merge 3625163",
      "ref": "PR #49"
    }
  ],
  "rows": [
    {
      "id": "preparation",
      "group": "Preparation",
      "name": "Preparation",
      "system": "workspace-lifecycle",
      "where": "the six repositories, read only · the workspace and the data folder",
      "unit": {
        "n": 1,
        "slug": "preparation",
        "title": "Phase 0 · 1 — Preparation: pinned tools, workspace, backup mirrors, legacy data copy and manifests",
        "blockedBy": [],
        "issue": 21,
        "board": "21-preparation/dashboard.html",
        "folder": "21-preparation/",
        "landing": {
          "pr": 30,
          "merge": "3b62b678be429c4a59ac0d08c5449a0bd6c50ea8"
        }
      },
      "gap": {
        "kind": "missing",
        "summary": "Nothing the rewrite needs is in place. Neither `git filter-repo` nor `gitleaks` is installed, the legacy data has not been copied out, and no backup or manifest exists to judge a rewrite against. Both tools exit 0 in cases that are failures, so their checks have to be proven before they are trusted.",
        "evidence": [
          "`architecture.md:235` — neither `git filter-repo` nor `gitleaks` is installed",
          "`architecture.md:97` — the legacy data is to be preserved before any rewrite",
          "`architecture.md:244` — filter-repo exits 0 even when nothing matched",
          "`architecture.md:254` — gitleaks exits 0 with \"no leaks found\" when its internal `git log` fails"
        ],
        "source": "architecture.md §2.3, §2.4",
        "link": "architecture.md#23-tools-on-the-machine"
      },
      "options": [
        {
          "id": "pinned-prep",
          "name": "Pinned, verified tools, untouched backup mirrors and a byte-exact data copy before any rewrite",
          "verdict": "accepted",
          "why": "Every later gate is judged against the backups and manifests, and `COPY-VERIFIED` is the precondition of every step that deletes or rewrites anything.",
          "source": "architecture.md §6.1–§6.3",
          "link": "architecture.md#61-toolchain"
        },
        {
          "id": "exit-status",
          "name": "Rely on gitleaks' exit status, or on `git reset` and `git gc` exit status on Windows",
          "verdict": "declined",
          "why": "Each is 0 on failure in the cases the phase meets; counts and proofs decide instead.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "drive-root",
          "name": "The workspace at a drive's root, for short paths",
          "verdict": "declined",
          "why": "Folders at a drive's root grant `Authenticated Users` modify, and the backups hold what the rewrite removes.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "git-archive",
          "name": "`git archive` for the data copy",
          "verdict": "declined",
          "why": "It converts line endings under `core.autocrlf=true`; each file is written from `git cat-file blob` and verified by `git hash-object --no-filters`.",
          "source": "architecture.md §6.3",
          "link": "architecture.md#63-legacy-data-copy"
        },
        {
          "id": "scrub-unreleased",
          "name": "Run the scrub with filter-repo's unreleased `main`, or under Python 3.13",
          "verdict": "declined",
          "why": "`main` brings every unreleased change since 2.47.0 into all six rewrites and a second interpreter adds an install to verify; the scrub uses `regex:` lines only, outside the Python 3.14 defect. Python 3.13 stays the fallback the fixture rehearsal can call for.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "scrub-glob",
          "name": "Express the scrub as `glob:` lines, or name this machine's account in the expression file",
          "verdict": "declined",
          "why": "`glob:` lines hit the Python 3.14 defect, and an account-specific line would put the account name into a file that must stay unshared; a generic account segment matches every user-profile path.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "An operational unit that changes nothing on GitHub and nothing in either clone: it installs, proves and records, so every later unit starts from proven tools, backups and a verified data copy.",
        "statements": [
          {
            "text": "Pin git, install git-filter-repo and gitleaks by hash, and prove each check on the canary and the filter-repo fixture before any real scan counts.",
            "ref": "architecture.md#61-toolchain",
            "excerpt": {
              "ref": "architecture.md#61-toolchain",
              "heading": "6.1 Toolchain",
              "paragraph": "git stays at 2.55.0.windows.5. The toolchain unit records `git --version` and stops if it differs: git 2.56 exists, and the procedures were verified against 2.55. Python 3.14.7, pip 26.2.1 and gh 2.100.0 are recorded too; a different Python minor or gh major stops. · git-filter-repo 2.47.0 comes from PyPI into the user scheme, hash-pinned (`--require-hashes --only-binary=:all: --no-deps`) (findings 1 §6.1, §6.2). · It is verified by two independent values, the `--version` blob-id prefix and the module's sha256, both equal to the upstream tag's script. · A throwaway fixture run confirms, on …",
              "hash": "113e1d278471"
            }
          },
          {
            "text": "Write the six path lists and prove them byte-wise, and prove non-interactive authentication against all six repositories.",
            "ref": "architecture.md#61-toolchain",
            "excerpt": {
              "ref": "architecture.md#61-toolchain",
              "heading": "6.1 Toolchain",
              "paragraph": "git stays at 2.55.0.windows.5. The toolchain unit records `git --version` and stops if it differs: git 2.56 exists, and the procedures were verified against 2.55. Python 3.14.7, pip 26.2.1 and gh 2.100.0 are recorded too; a different Python minor or gh major stops. · git-filter-repo 2.47.0 comes from PyPI into the user scheme, hash-pinned (`--require-hashes --only-binary=:all: --no-deps`) (findings 1 §6.1, §6.2). · It is verified by two independent values, the `--version` blob-id prefix and the module's sha256, both equal to the upstream tag's script. · A throwaway fixture run confirms, on …",
              "hash": "113e1d278471"
            }
          },
          {
            "text": "Write the path-scrub expression file, `regex:` lines only and naming no account, and prove the scrub on the fixture: every path form replaced, nothing else changed.",
            "ref": "architecture.md#61-toolchain",
            "excerpt": {
              "ref": "architecture.md#61-toolchain",
              "heading": "6.1 Toolchain",
              "paragraph": "git stays at 2.55.0.windows.5. The toolchain unit records `git --version` and stops if it differs: git 2.56 exists, and the procedures were verified against 2.55. Python 3.14.7, pip 26.2.1 and gh 2.100.0 are recorded too; a different Python minor or gh major stops. · git-filter-repo 2.47.0 comes from PyPI into the user scheme, hash-pinned (`--require-hashes --only-binary=:all: --no-deps`) (findings 1 §6.1, §6.2). · It is verified by two independent values, the `--version` blob-id prefix and the module's sha256, both equal to the upstream tag's script. · A throwaway fixture run confirms, on …",
              "hash": "113e1d278471"
            }
          },
          {
            "text": "Take a mirror and an untouched backup of each repository, recording its `ls-remote` listing.",
            "ref": "architecture.md#62-backups-and-manifests",
            "excerpt": {
              "ref": "architecture.md#62-backups-and-manifests",
              "heading": "6.2 Backups and manifests",
              "paragraph": "Each repository gets one `git clone --mirror`, copied at once (`cp -a`) to `WS/backup/<repo>.git` before any other git command runs in it. The clone itself becomes the mirror the rewrite later runs in (findings 1 §6.4).",
              "hash": "bcb5d278749e"
            }
          },
          {
            "text": "Copy the legacy data from its three sources byte-exactly and mark it verified.",
            "ref": "architecture.md#63-legacy-data-copy",
            "excerpt": {
              "ref": "architecture.md#63-legacy-data-copy",
              "heading": "6.3 Legacy data copy",
              "paragraph": "Before any rewrite, the data is copied from the backup mirrors:",
              "hash": "b44b418656ba"
            }
          },
          {
            "text": "Derive the manifests, expectation rows and positive-control scans of the five static repositories.",
            "ref": "architecture.md#62-backups-and-manifests",
            "excerpt": {
              "ref": "architecture.md#62-backups-and-manifests",
              "heading": "6.2 Backups and manifests",
              "paragraph": "Each repository gets one `git clone --mirror`, copied at once (`cp -a`) to `WS/backup/<repo>.git` before any other git command runs in it. The clone itself becomes the mirror the rewrite later runs in (findings 1 §6.4).",
              "hash": "bcb5d278749e"
            }
          },
          {
            "text": "Starts first, blocked by no other unit, and lands on the pre-rewrite repository.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "The canary's exact per-rule file counts; the filter-repo fixture run, with a UTF-16 list as the negative control",
          "Each data copy verified against its blob ids",
          "The scrub's fixture cases: every path form replaced in text files and a commit message, a fixture binary untouched, the before and after counts as predicted"
        ],
        "risks": [
          "A token shape outside the token rule shows in the positive control; it is recorded as a gap and the path rules still flag the files"
        ],
        "source": "architecture.md §15 unit 1",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "Built as planned, with no deviation, and all of it local to this machine: the toolchain at its pins (git-filter-repo 2.47.0, gitleaks 8.30.1), the saved tools, the six proved path lists, six mirrors with untouched backups, the legacy data copy verified by blob id, and the five static repositories' manifests, expectation rows and positive controls. Nothing on GitHub changed but this unit's own documents and boards."
      }
    },
    {
      "id": "transfer-rehearsal",
      "group": "Preparation",
      "name": "Transfer rehearsal",
      "system": "repository-swap",
      "where": "two throwaway private repositories",
      "unit": {
        "n": 2,
        "slug": "transfer-rehearsal",
        "title": "Phase 0 · 2 — Transfer rehearsal on two throwaway repositories",
        "blockedBy": [
          21
        ],
        "issue": 22,
        "board": "22-transfer-rehearsal/dashboard.html",
        "folder": "22-transfer-rehearsal/",
        "landing": {
          "pr": 31,
          "merge": "9af27b286ede1c153ff4e0d6f034fbc872996c15"
        }
      },
      "gap": {
        "kind": "risk",
        "summary": "Nobody knows how an issue transfer treats numbers and links. GitHub documents that a transfer keeps comments, labels and milestones, but nothing about numbers, closed issues, or sub-issue and \"blocked by\" links, and the number-preserving swap rests on them.",
        "evidence": [
          "`architecture.md:267` — nothing is documented about numbers, or about sub-issue and \"blocked by\" links",
          "`architecture.md:288` — the assumption that transfers land on their source numbers, shown by the rehearsal",
          "`consequences.md:232` — the issue transfers' behaviour is a known gap the rehearsal settles"
        ],
        "source": "architecture.md §2.4, §3",
        "link": "architecture.md#3-assumptions"
      },
      "options": [
        {
          "id": "two-repo-rehearsal",
          "name": "Rehearse the walk and the rename swap on two throwaway private repositories",
          "verdict": "accepted",
          "why": "It proves the transfer mechanics on the shapes the real walk meets, a pull request between issues, a closed issue and cross-repository links included, before anything touches KotlinBottools.",
          "source": "architecture.md §7.2",
          "link": "architecture.md#72-the-rehearsal"
        },
        {
          "id": "three-repo-rehearsal",
          "name": "Rehearse with three repositories (a stand-alone \"foreign\" one)",
          "verdict": "declined",
          "why": "The issue that stays in the source repository already gives the cross-repository shape after the transfer, and the real walk reads and re-creates every link regardless.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "An operational unit on two repositories of its own: it proves the transfer and rename mechanics and leaves KotlinBottools untouched, so a failure stops the swap before it starts.",
        "statements": [
          {
            "text": "Build the fixture in the source repository: a tracking issue with sub-issues, one closed, comments, \"blocked by\" links both ways, a merged pull request between issues, and an issue that stays behind.",
            "ref": "architecture.md#72-the-rehearsal",
            "excerpt": {
              "ref": "architecture.md#72-the-rehearsal",
              "heading": "7.2 The rehearsal",
              "paragraph": "Two throwaway repositories, A (the source, public) and B (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "b237a818cb8a"
            }
          },
          {
            "text": "Walk the numbers in order, transferring each issue and reproducing the pull request by a closed placeholder, and re-create every dropped link.",
            "ref": "architecture.md#72-the-rehearsal",
            "excerpt": {
              "ref": "architecture.md#72-the-rehearsal",
              "heading": "7.2 The rehearsal",
              "paragraph": "Two throwaway repositories, A (the source, public) and B (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "b237a818cb8a"
            }
          },
          {
            "text": "Rehearse the rename swap on the same pair and read the ids back at each name.",
            "ref": "architecture.md#72-the-rehearsal",
            "excerpt": {
              "ref": "architecture.md#72-the-rehearsal",
              "heading": "7.2 The rehearsal",
              "paragraph": "Two throwaway repositories, A (the source, public) and B (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "b237a818cb8a"
            }
          },
          {
            "text": "Pass only when every item is on its number, every link is present and the renames resolve by id; both repositories stay, private and archived.",
            "ref": "architecture.md#72-the-rehearsal",
            "excerpt": {
              "ref": "architecture.md#72-the-rehearsal",
              "heading": "7.2 The rehearsal",
              "paragraph": "Two throwaway repositories, A (the source, public) and B (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "b237a818cb8a"
            }
          },
          {
            "text": "Starts once unit 1 has landed, and lands on the pre-rewrite repository.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "The pass condition: every item on its number, the final link set equal to the fixture's, the renames resolving by id"
        ],
        "risks": [
          "A closed issue or a parent with sub-issues cannot be transferred as it is; the alternative routes are recorded for the real walk"
        ],
        "source": "architecture.md §15 unit 2",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "The rehearsal ran on two throwaway repositories and passed: every item landed on its own number with the placeholder at #4, the closed issues arrived closed, all 11 links were kept with none re-created, and the rename swap held by id, both repositories left private and archived. It measured what a transfer does to issue references, and leaves the tool, its known gaps recorded, and the results for the next unit. One deviation: two reads before the swap were taken while a third had stopped on GitHub's web page answering 504. Nothing changed in KotlinBottools or any other repository."
      }
    },
    {
      "id": "kotlinbottools-rewrite-and-swap",
      "group": "KotlinBottools",
      "name": "KotlinBottools rewrite and swap",
      "system": "internal-tooling",
      "where": "KotlinBottools, a fresh repository and the legacy repository · this working directory",
      "unit": {
        "n": 3,
        "slug": "kotlinbottools-rewrite-and-swap",
        "title": "Phase 0 · 3 — KotlinBottools: rewrite with path scrub, fresh repository, number-preserving swap and clone realignment",
        "blockedBy": [
          22
        ],
        "issue": 23,
        "board": "23-kotlinbottools-rewrite-and-swap/dashboard.html",
        "folder": "23-kotlinbottools-rewrite-and-swap/",
        "tests": {
          "base": "main",
          "updated": "2026-11-11T14:31:17Z",
          "added": [],
          "amended": [
            {
              "class": "kselftest.sh",
              "module": "tools",
              "tests": 131,
              "result": {
                "state": "passed",
                "passed": 131,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-11T14:31:17Z"
              },
              "stage": "s16"
            },
            {
              "class": "swap.py selftest",
              "module": "tools",
              "tests": 564,
              "result": {
                "state": "passed",
                "passed": 564,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-11T14:31:17Z"
              },
              "stage": "s16"
            }
          ],
          "relevant": [
            {
              "class": "scrub_check.py selftest",
              "module": "tools",
              "tests": 17,
              "result": {
                "state": "passed",
                "passed": 17,
                "failed": 0,
                "skipped": 0,
                "pass": 1,
                "at": "2026-11-11T14:08:08Z"
              }
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
                "pass": 1,
                "at": "2026-11-11T14:08:08Z"
              }
            }
          ]
        },
        "landing": {
          "pr": 32,
          "merge": "9e61aa5"
        }
      },
      "gap": {
        "kind": "risk",
        "summary": "KotlinBottools' history holds the data to purge, and GitHub would keep serving it. The repository is private with 346 purged blobs at the research baseline; GitHub serves unreferenced objects by id with no documented expiry and publishes a repository's activity when it becomes public, so a force-push followed by a visibility change would publish the old history. This working directory tracks 41 of the files to purge.",
        "evidence": [
          "`architecture.md:172` — KotlinBottools: private, 346 purged blobs at the research baseline",
          "`architecture.md:259` — GitHub serves unreferenced objects by id on every route",
          "`architecture.md:261` — GitHub publishes a repository's activity when it becomes public",
          "`architecture.md:219` — the purge list removes 41 tracked files from this working tree",
          "`architecture.md:77` — machine-local folder and account-name paths are replaced in every file and commit message of KotlinBottools"
        ],
        "source": "architecture.md §2.1, §2.2, §2.4",
        "link": "architecture.md#2-current-state"
      },
      "options": [
        {
          "id": "fresh-repo-swap",
          "name": "Rewrite in a mirror, push to a fresh repository, reproduce every number, rename the old one to its legacy name and realign this clone in place",
          "verdict": "accepted",
          "why": "The fresh repository's object store starts empty, the name and every number survive, and the pre-rewrite repository stays private and archived as the resolver of the dated citations.",
          "source": "architecture.md §7.1, §9.1",
          "link": "architecture.md#71-shape"
        },
        {
          "id": "public-in-place",
          "name": "Make KotlinBottools public in place after the force-push",
          "verdict": "declined",
          "why": "It publishes every pre-rewrite object to anyone with one old id, which the activity feed and a four-digit prefix supply.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "other-name",
          "name": "A new public repository under another name, KotlinBottools kept private",
          "verdict": "declined",
          "why": "It breaks the name and every `KotlinBottools#N` citation and URL in MagicBot, WebTools, the `.github` mirror and the documents.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "delete-recreate",
          "name": "Delete and recreate under the same name",
          "verdict": "declined",
          "why": "It needs the `delete_repo` scope and keeps nothing the rename does not; the rename keeps the old repository as the private resolver of the dated citations.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "renumber",
          "name": "Transfer only issues #1 to #19 and renumber everything after them",
          "verdict": "declined",
          "why": "It changes the numbers of #2's sub-issues, their plan-folder names and every citation of them; placeholders keep every number at the cost of one closed issue per pull request.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "split-units",
          "name": "Separate units for the KotlinBottools rewrite, the swap and the realignment",
          "verdict": "declined",
          "why": "Every landing adds commits to KotlinBottools, so a landing between its mirror clone and its push would be lost from the rewritten history, and the swap's own landing cannot precede the realignment.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "sibling-clone",
          "name": "Realign this clone by cloning the fresh repository to a sibling path",
          "verdict": "declined",
          "why": "It leaves a dead clone holding the old objects, while the IDE project and the working notes on this machine stay keyed to this path.",
          "source": "architecture.md §9.1",
          "link": "architecture.md#91-choice-in-place"
        },
        {
          "id": "replace-dotgit",
          "name": "Replace this clone's `.git` with a fresh clone's",
          "verdict": "declined",
          "why": "The tracked files the rewrite removes would stay behind as untracked files, and it renames `.git` while the IDE holds it.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "rewrite-old-ids",
          "name": "Rewrite the pre-rewrite ids out of the older documents, or map the maintainer's address with `--mailmap`",
          "verdict": "declined",
          "why": "It changes the verified invocation; the ids resolve only in the private legacy repository, and the address is already public in three repositories.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "keep-local-paths",
          "name": "Leave the machine-local folder paths and account-name paths in the committed documents",
          "verdict": "declined",
          "why": "Settled at the architecture's sign-off: the KotlinBottools rewrite also replaces them in every file and commit. The architecture's non-goal that kept them is being updated.",
          "source": "architecture.md §1.1 item 3",
          "link": "architecture.md#11-what-the-phase-must-achieve"
        },
        {
          "id": "scrub-all-six",
          "name": "Scrub the other five repositories as well",
          "verdict": "declined",
          "why": "GKB2, GKB and BotTools are public already, and the private repositories stay private; only KotlinBottools becomes newly public.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "The phase's central unit on KotlinBottools, kept whole because nothing may land on the repository between its mirror clone and its push: the rewrite, the swap and this clone's realignment, with nothing public at any point.",
        "statements": [
          {
            "text": "Take a fresh mirror and backup at the start, with its manifest, expectation and positive control, and run the pipeline's stages 1 to 5 and the first privacy gate.",
            "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
            "excerpt": {
              "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
              "heading": "6.4 The rewrite pipeline (per repository)",
              "paragraph": "The same pipeline serves all six repositories. KotlinBottools differs in three ways: its push target (§7), the path scrub that runs in the same invocation, and the privacy gate that runs before its push. Each stage is a gate. A failure stops the repository before its push and discards its mirror; the backup stays.",
              "hash": "6c634d18186f"
            }
          },
          {
            "text": "In the same rewrite, replace the machine-local folder paths and account-name paths in every file of every commit and in every commit message, proved by the scrub's before-counts, its fidelity check and a zero count on every ref.",
            "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
            "excerpt": {
              "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
              "heading": "6.4 The rewrite pipeline (per repository)",
              "paragraph": "The same pipeline serves all six repositories. KotlinBottools differs in three ways: its push target (§7), the path scrub that runs in the same invocation, and the privacy gate that runs before its push. Each stage is a gate. A failure stops the repository before its push and discards its mirror; the backup stays.",
              "hash": "6c634d18186f"
            }
          },
          {
            "text": "Create the fresh repository with the old one's settings, push the rewritten mirror to it, and prove it on a fresh mirror and by the probe that no old id resolves.",
            "ref": "architecture.md#73-the-fresh-repository",
            "excerpt": {
              "ref": "architecture.md#73-the-fresh-repository",
              "heading": "7.3 The fresh repository",
              "paragraph": "Creation: it is created private, with no README. · Settings: it is set to the old repository's tuple (§2.1) and verified: · default branch `main`, set explicitly after the push; · issues and projects on, wiki and discussions off; · merge, squash and rebase merges allowed; auto-merge off; delete-branch-on-merge off; · Actions enabled for all actions; · no description, homepage or topics; · the organisation administrator the only direct collaborator, and no team. · Its id is recorded. It is the key of every later check that `origin` is the fresh repository. · The mirror push must tally `new = …",
              "hash": "e8e602bd8934"
            }
          },
          {
            "text": "Walk every number in order, transferring issues and reproducing pull requests by placeholders, then reconcile every link and pass the second privacy gate.",
            "ref": "architecture.md#74-the-number-walk-and-the-links",
            "excerpt": {
              "ref": "architecture.md#74-the-number-walk-and-the-links",
              "heading": "7.4 The number walk and the links",
              "paragraph": "Before the walk:",
              "hash": "f5cdb73198b5"
            }
          },
          {
            "text": "Rename the old repository to its legacy name and archive it, then give the fresh one the name, verified by id.",
            "ref": "architecture.md#75-renames-archive-visibility-scanning",
            "excerpt": {
              "ref": "architecture.md#75-renames-archive-visibility-scanning",
              "heading": "7.5 Renames, archive, visibility, scanning",
              "paragraph": "The renames:",
              "hash": "056d243c4614"
            }
          },
          {
            "text": "Realign this working directory in place; the push-safety proof is the precondition of the unit's own landing, the first on the fresh repository, and an object deletion the IDE blocks is recorded as deferred.",
            "ref": "architecture.md#92-procedure-and-the-push-safety-proof",
            "excerpt": {
              "ref": "architecture.md#92-procedure-and-the-push-safety-proof",
              "heading": "9.2 Procedure and the push-safety proof",
              "paragraph": "The realignment is the last step of unit 3 before its own landing. It is carried out on request (§11), with the procedure below from the unit's plan, and the unit verifies its outcome.",
              "hash": "cd6e823e1fa1"
            }
          },
          {
            "text": "Starts once unit 2 has landed with its pass condition met.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "The pipeline's post-run checks and exit tests on a fresh mirror; Gates 1 and 2",
          "Every number on its own number with its state, body, labels, milestone and comment count; the link totals equal the table's",
          "The push-safety proof: no ref, reflog or text in `.git` names a changed or pruned commit, and `origin` is the fresh repository by id",
          "The scrub's checks: a zero count for every expression over every file, commit message and ref, again on the fresh mirror; every changed text blob equal to its origin with the expressions applied, every binary unchanged; the changed-blob count as predicted"
        ],
        "risks": [
          "A landing or a new numbered item reaches KotlinBottools while the unit runs; heads and the highest number are checked before the push and the renames",
          "The rename window, when the name resolves to the legacy repository; every check compares ids",
          "The path scrub replaces text it should not, or misses a form of a path; the fixture rehearsal, the fidelity check and the zero count stop the unit before the push"
        ],
        "source": "architecture.md §15 unit 3",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "Built and landed: the history purged and scrubbed in one rewrite, 87 commits to 85; KotlinBottools is now a fresh private repository holding the rewritten history and every number, 1 to 31, with all 91 links kept by the transfers; the pre-rewrite repository is kept under its legacy name, private and archived, which ended its public window on 2026-11-11; and this working directory is realigned, its old objects deleted with nothing deferred. Thirteen tools were corrected during the run, the accepted pre-rewrite ids are 26 occurrences of 3 distinct ids, and a default-rule finding of gitleaks in one kept file holds the publication unit's change to public."
      }
    },
    {
      "id": "repository-hygiene",
      "group": "KotlinBottools",
      "name": "Repository hygiene",
      "system": "internal-tooling",
      "where": "`.gitignore`, `.gitleaks.toml`, `.github/` · `README.md`, `CHANGELOG.md`",
      "unit": {
        "n": 4,
        "slug": "repository-hygiene",
        "title": "Phase 0 · 4 — KotlinBottools repository hygiene: .gitignore, gitleaks configuration and CI, README and CHANGELOG",
        "blockedBy": [
          23
        ],
        "issue": 24,
        "board": "24-repository-hygiene/dashboard.html",
        "folder": "24-repository-hygiene/",
        "tests": {
          "updated": "2026-11-12T03:54:41Z",
          "added": [
            {
              "class": "S3 workflow",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 23,
              "rows": [
                "secret-scan-workflow"
              ],
              "stage": "S3",
              "result": {
                "state": "passed",
                "passed": 23,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:17:00Z"
              },
              "testLevel": "1"
            },
            {
              "class": "S4 negatives",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 64,
              "rows": [
                "secret-scan-workflow",
                "landing-checks"
              ],
              "stage": "S4",
              "result": {
                "state": "passed",
                "passed": 64,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              },
              "testLevel": "2"
            },
            {
              "class": "S3 python",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 4,
              "rows": [
                "allowlist-controls",
                "secret-scan-workflow"
              ],
              "stage": "S3",
              "testLevel": "1",
              "result": {
                "state": "passed",
                "passed": 4,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:17:00Z"
              }
            },
            {
              "class": "S4 mutations",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 42,
              "rows": [
                "allowlist-controls",
                "gitleaks-config"
              ],
              "stage": "S4",
              "testLevel": "3",
              "result": {
                "state": "passed",
                "passed": 42,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              }
            },
            {
              "class": "S4 workflow-run",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 22,
              "rows": [
                "secret-scan-workflow"
              ],
              "stage": "S4",
              "testLevel": "3",
              "result": {
                "state": "passed",
                "passed": 22,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              }
            },
            {
              "class": "S4 log-filter",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 4,
              "rows": [
                "landing-checks"
              ],
              "stage": "S4",
              "testLevel": "4a",
              "result": {
                "state": "passed",
                "passed": 4,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              }
            }
          ],
          "amended": [
            {
              "class": "S3 ignore-list",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 83,
              "rows": [
                "gitignore"
              ],
              "stage": "S3",
              "result": {
                "state": "passed",
                "passed": 83,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:17:00Z"
              },
              "testLevel": "1"
            },
            {
              "class": "S4 clone",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 13,
              "rows": [
                "landing-checks"
              ],
              "stage": "S4",
              "result": {
                "state": "passed",
                "passed": 13,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              },
              "testLevel": "3"
            },
            {
              "class": "S4 scans",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 14,
              "rows": [
                "landing-checks"
              ],
              "stage": "S4",
              "result": {
                "state": "passed",
                "passed": 14,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              },
              "testLevel": "3"
            },
            {
              "class": "S4 canary",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 21,
              "rows": [
                "landing-checks"
              ],
              "stage": "S4",
              "result": {
                "state": "passed",
                "passed": 21,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              },
              "testLevel": "3"
            },
            {
              "class": "S4 controls",
              "module": "plan procedure",
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "tests": 42,
              "rows": [
                "allowlist-controls"
              ],
              "stage": "S4",
              "result": {
                "state": "passed",
                "passed": 42,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              },
              "testLevel": "3"
            },
            {
              "class": "S3 sources",
              "module": "plan procedure",
              "tests": 12,
              "result": {
                "state": "passed",
                "passed": 12,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:17:00Z"
              },
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "rows": [
                "landing-checks",
                "gitleaks-config"
              ],
              "stage": "S3",
              "testLevel": "1"
            },
            {
              "class": "S5 gate",
              "module": "plan procedure",
              "tests": 5,
              "result": {
                "state": "passed",
                "passed": 5,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:54:41Z"
              },
              "path": "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md",
              "rows": [
                "landing-checks"
              ],
              "stage": "S5",
              "testLevel": "4c"
            }
          ],
          "relevant": [
            {
              "class": "S3 bytes",
              "module": "plan procedure",
              "tests": 7,
              "result": {
                "state": "passed",
                "passed": 7,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:17:00Z"
              },
              "rows": [
                "gitignore",
                "gitleaks-config",
                "secret-scan-workflow",
                "allowlist-controls",
                "readme-correction",
                "changelog"
              ],
              "testLevel": "1"
            },
            {
              "class": "S3 toml",
              "module": "plan procedure",
              "tests": 2,
              "result": {
                "state": "passed",
                "passed": 2,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:17:00Z"
              },
              "rows": [
                "gitleaks-config"
              ],
              "testLevel": "1"
            },
            {
              "class": "S3 pem",
              "module": "plan procedure",
              "tests": 2,
              "result": {
                "state": "passed",
                "passed": 2,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-12T03:17:00Z"
              },
              "rows": [
                "landing-checks"
              ],
              "testLevel": "1"
            }
          ],
          "rowNames": {
            "gitignore": "A root-anchored `.gitignore`",
            "gitleaks-config": "The scan's configuration, `.gitleaks.toml`",
            "secret-scan-workflow": "The scan wrapper and the `Secret scan` workflow",
            "readme-correction": "The README's correction",
            "changelog": "The first `CHANGELOG.md`",
            "landing-checks": "The checks before the landing, and the merge after the workflow's first run",
            "allowlist-controls": "The allowlist controls, `allowlist_controls.py`"
          }
        },
        "landing": {
          "pr": 34,
          "merge": "3d1b89007f253d11bdee08174c1d7f21621cc386"
        }
      },
      "gap": {
        "kind": "missing",
        "summary": "KotlinBottools has no guard against committing its data again. It has no secret scan and no `.github/` directory, its README describes files the rewrite removes from the repository, and it has no changelog.",
        "evidence": [
          "`architecture.md:221` — no `.github/` directory exists on either branch",
          "`architecture.md:1073` — the README's project-structure entries that become false",
          "`architecture.md:1074` — `CHANGELOG.md` would be the repository's first changelog"
        ],
        "source": "architecture.md §2.2, §10",
        "link": "architecture.md#10-repository-hygiene-artefacts"
      },
      "options": [
        {
          "id": "hygiene-files",
          "name": "A root-anchored `.gitignore`, `.gitleaks.toml`, the scan wrapper and a dedicated secret-scan workflow, with the README correction and a new `CHANGELOG.md`",
          "verdict": "accepted",
          "why": "A pinned, checksum-verified binary behind a wrapper that proves the scan ran, with counts-only logs; the change merges only once that workflow has passed on its own pull request.",
          "source": "architecture.md §10",
          "link": "architecture.md#10-repository-hygiene-artefacts"
        },
        {
          "id": "gitleaks-action",
          "name": "The gitleaks GitHub Action",
          "verdict": "declined",
          "why": "It needs an organisation licence.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "shared-ci",
          "name": "A job inside a shared `ci.yml`",
          "verdict": "declined",
          "why": "A shared file collides with Phase 1's.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        },
        {
          "id": "global-allowlist",
          "name": "A global allowlist, or gitleaks' `-v`",
          "verdict": "declined",
          "why": "A path allowlist disables every rule for the paths it names, and `-v` prints paths and identities.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "Repository infrastructure on the rewritten `main`: no module is published and no version moves.",
        "statements": [
          {
            "text": "Add the root-anchored `.gitignore`, keeping the existing `bin/` block and the editor lines.",
            "ref": "architecture.md#10-repository-hygiene-artefacts",
            "excerpt": {
              "ref": "architecture.md#10-repository-hygiene-artefacts",
              "heading": "10. Repository hygiene artefacts",
              "paragraph": "The unit authors these four files and two edits on its own branch, cut from the rewritten `main` of the fresh repository:",
              "hash": "47474fba5175"
            }
          },
          {
            "text": "Add `.gitleaks.toml` with MagicBot's three rules and the two legacy path rules, with no allowlist, and the scan wrapper and the `Secret scan` workflow.",
            "ref": "architecture.md#10-repository-hygiene-artefacts",
            "excerpt": {
              "ref": "architecture.md#10-repository-hygiene-artefacts",
              "heading": "10. Repository hygiene artefacts",
              "paragraph": "The unit authors these four files and two edits on its own branch, cut from the rewritten `main` of the fresh repository:",
              "hash": "47474fba5175"
            }
          },
          {
            "text": "Correct only what becomes false in the README, and create `CHANGELOG.md` with this change's entry.",
            "ref": "architecture.md#10-repository-hygiene-artefacts",
            "excerpt": {
              "ref": "architecture.md#10-repository-hygiene-artefacts",
              "heading": "10. Repository hygiene artefacts",
              "paragraph": "The unit authors these four files and two edits on its own branch, cut from the rewritten `main` of the fresh repository:",
              "hash": "47474fba5175"
            }
          },
          {
            "text": "Scan the tree clean, check the CI files byte for byte and pass the privacy gate before the landing; merge once the workflow passes.",
            "ref": "architecture.md#10-repository-hygiene-artefacts",
            "excerpt": {
              "ref": "architecture.md#10-repository-hygiene-artefacts",
              "heading": "10. Repository hygiene artefacts",
              "paragraph": "The unit authors these four files and two edits on its own branch, cut from the rewritten `main` of the fresh repository:",
              "hash": "47474fba5175"
            }
          },
          {
            "text": "Starts once unit 3 has landed, on the fresh repository.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "The tree scan prints `RESULT: CLEAN`; the workflow's first run on GitHub passes on the pull request"
        ],
        "risks": [
          "The workflow's first run fails for a reason unrelated to secrets; the check gates the merge and the run hands back with its counts"
        ],
        "source": "architecture.md §15 unit 4",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "Built and landed through PR #34 as `3d1b890`, with no deviation from its plan: the seven files at their recorded bytes, namely the root-anchored `.gitignore`, the configuration with its one scoped allowlist table, the scan wrapper, the allowlist controls, the secret-scan workflow, the README correction and the first `CHANGELOG.md`. The workflow's first run, on the pull request, and the push run on `main` both passed, the allowlist controls included, on the `ubuntu-26.04` image. The default-rule finding unit 3 recorded is settled, so the publication unit's change to public no longer waits on it; the workspace configuration now holds `main`'s bytes, and the two workspace pins that still name the old value are left for #26 and #27.",
        "changes": [
          {
            "what": "`.gitleaks.toml` holds one scoped `[[allowlists]]` table rather than none: the rule `curl-auth-user`, one research document's path and its exact text, all three required, with its reason in `description`; there is still no global allowlist, and the header comment names the allowlist controls and says how a `dir` scan must be run.",
            "why": "The research configuration reports that default rule on this repository's own history and tree, three findings in one kept research document whose command example passes a token through a shell command substitution, not a literal credential; a table scoped to that rule, path and text settles it without hiding anything else.",
            "when": "#24's plan, its stage S2 and its Document step, which added the header's two sentences",
            "ref": "0b64c47",
            "link": "architecture.md#10-repository-hygiene-artefacts"
          },
          {
            "what": "A fifth CI file, `.github/scripts/allowlist_controls.py`, the table's own test, and one more workflow step that runs it after the canary on every push and pull request: the change set is seven files, and the workflow no longer equals the research text.",
            "why": "Gitleaks ignores a misspelled key without an error, so only a scan of fixtures shows that the table exempts its one match and nothing else.",
            "when": "#24's plan revision and its stage S2",
            "ref": "6dfa32a",
            "link": "architecture.md#10-repository-hygiene-artefacts"
          }
        ]
      }
    },
    {
      "id": "kotlinbottools-publish",
      "group": "KotlinBottools",
      "name": "Make KotlinBottools public",
      "system": "internal-tooling",
      "where": "KotlinBottools' visibility and security settings",
      "unit": {
        "n": 5,
        "slug": "kotlinbottools-publish",
        "title": "Phase 0 · 5 — Make KotlinBottools public with secret scanning and push protection",
        "blockedBy": [
          24
        ],
        "issue": 25,
        "board": "25-kotlinbottools-publish/dashboard.html",
        "folder": "25-kotlinbottools-publish/",
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
        "landing": {
          "pr": 36,
          "merge": "96eba228ddd753f3b176f965c4ffa332f2187369"
        }
      },
      "gap": {
        "kind": "missing",
        "summary": "KotlinBottools is private and unscanned. GitHub enables no scanning setting on its own for an organisation-owned repository, and the setting exists only once the repository is public.",
        "evidence": [
          "`architecture.md:172` — KotlinBottools is private",
          "`architecture.md:262` — no scanning setting is enabled on its own, and it exists only once the repository is public"
        ],
        "source": "architecture.md §2.1, §2.4",
        "link": "architecture.md#24-verified-outside-world-facts"
      },
      "options": [
        {
          "id": "gated-flip",
          "name": "The third privacy gate and the id-reference check, then the visibility change, then a separate `PATCH` enabling secret scanning and push protection",
          "verdict": "accepted",
          "why": "Nothing becomes public that a gate has not passed, and the scanning settings are set in the same minute and verified by `GET` and by the alerts endpoint.",
          "source": "architecture.md §7.5",
          "link": "architecture.md#75-renames-archive-visibility-scanning"
        },
        {
          "id": "paid-scanning",
          "name": "Generic patterns and validity checks",
          "verdict": "declined",
          "why": "Both need a paid plan; they stay off.",
          "source": "architecture.md §7.5",
          "link": "architecture.md#75-renames-archive-visibility-scanning"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One irreversible setting on KotlinBottools, behind every gate the phase has: a failed gate, or a default-rule finding in a kept file, leaves the repository private.",
        "statements": [
          {
            "text": "Run the third privacy gate over the fresh repository, its issues and placeholders and every file the phase's landings put on it, and the id-reference check, which must find no resolving id.",
            "ref": "architecture.md#65-privacy-gate-and-id-reference-check",
            "excerpt": {
              "ref": "architecture.md#65-privacy-gate-and-id-reference-check",
              "heading": "6.5 Privacy gate and id-reference check",
              "paragraph": "The gate works as follows (findings 5 §3.B, §6.3):",
              "hash": "0a8066571d34"
            }
          },
          {
            "text": "Pass the pre-flip gate, then make the repository public and enable secret scanning and push protection, verified.",
            "ref": "architecture.md#75-renames-archive-visibility-scanning",
            "excerpt": {
              "ref": "architecture.md#75-renames-archive-visibility-scanning",
              "heading": "7.5 Renames, archive, visibility, scanning",
              "paragraph": "The renames:",
              "hash": "056d243c4614"
            }
          },
          {
            "text": "Measure anonymously that no old id resolves, check the access, and confirm the secret scan green on `main`.",
            "ref": "architecture.md#66-residual-exposure-measurement",
            "excerpt": {
              "ref": "architecture.md#66-residual-exposure-measurement",
              "heading": "6.6 Residual-exposure measurement",
              "paragraph": "Each repository is measured after its push, with inputs from `DATA/rewrite/<repo>/` and the backup (findings 3 §6.3). Every result is a tally; no id or body is printed.",
              "hash": "f8e15bff6f3f"
            }
          },
          {
            "text": "Starts once unit 4 has landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "Gate 3 and the id-reference check at 0; the scanning settings read back; every old id answering not found anonymously"
        ],
        "risks": [
          "The scanning `PATCH` fails after the flip, leaving the repository public and unscanned; it is reported and re-run at once"
        ],
        "source": "architecture.md §15 unit 5",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "Built and landed through PR #36 as `96eba22`: KotlinBottools is public with secret scanning and push protection on, its rewritten history, its issues and pull requests with the earlier revisions of edited texts, and its Actions runs. The bodies of #1 to #19 point their 39 planning-branch links at `main`; Gate 3 and the id-reference check found nothing to stop the change; every one of the 87 pre-rewrite commits answers \"not found\" anonymously; the three alert reads found none; and the `Secret scan` push run on `main` at the merge completed with success. The 16 links in MagicBot and 1 in WebTools remain a follow-up, and MagicBot's Phase 13 may start now that the unit has landed.",
        "changes": [
          {
            "what": "The unit's scope included the edits of the bodies of #1 to #19, which point their links at `main` and correct #1's clause on the planning branch and #2's plan-folder line.",
            "why": "The links and the two lines had to be right before the texts became public, and Gate 3 read the edited bodies with their earlier revisions.",
            "when": "#25's plan, its stage S2",
            "ref": "25-kotlinbottools-publish/final-implementation.md#1-what-was-built",
            "link": "architecture.md#15-decomposition"
          },
          {
            "what": "The change to public followed the pre-flip gate by 58 minutes, and the gate was not run again; the scanning request came as the next request, 74 s after the visibility read-back.",
            "why": "The visibility request waited with the service that carries out the writes; its own guards, the repository's id at its name and its private state, ran immediately before it, and authenticated reads afterwards show no drift.",
            "when": "#25's stages S7 and S8",
            "ref": "25-kotlinbottools-publish/final-implementation.md#43-the-change-to-public-followed-the-pre-flip-gate-by-58-minutes",
            "link": "architecture.md#75-renames-archive-visibility-scanning"
          }
        ]
      }
    },
    {
      "id": "gkb2-gkb-rewrite",
      "group": "Legacy repositories",
      "name": "Rewrite GKB2 and GKB",
      "system": "internal-tooling",
      "where": "GKB2 and GKB, public",
      "unit": {
        "n": 6,
        "slug": "gkb2-gkb-rewrite",
        "title": "Phase 0 · 6 — Rewrite GKB2 and GKB",
        "blockedBy": [
          23
        ],
        "issue": 26,
        "board": "26-gkb2-gkb-rewrite/dashboard.html",
        "folder": "26-gkb2-gkb-rewrite/",
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
        "landing": {
          "pr": 37,
          "merge": "416f36bda66c2050e320504d999a46e71ea18557"
        }
      },
      "gap": {
        "kind": "risk",
        "summary": "GKB2 and GKB still carry purged paths in their histories. GKB2 holds 81 purged blobs, 70 of them reachable through its pull-request ref, and GKB 58; both are public.",
        "evidence": [
          "`architecture.md:173` — GKB2: public, 81 purged blobs, 70 reachable through `refs/pull/6/head`",
          "`architecture.md:174` — GKB: public, 58 purged blobs"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-the-six-repositories"
      },
      "options": [
        {
          "id": "pipeline-in-place",
          "name": "The per-repository pipeline, GKB2 then GKB, force-pushed in place from their mirrors",
          "verdict": "accepted",
          "why": "The same gated pipeline as every repository, each repository stopping on its own gate with a hand-back of its own.",
          "source": "architecture.md §6.4",
          "link": "architecture.md#64-the-rewrite-pipeline-per-repository"
        },
        {
          "id": "one-unit-each",
          "name": "One unit per legacy repository (five)",
          "verdict": "declined",
          "why": "The same procedure five times; two grouped units keep a hand-back per repository with less duplication.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "An operational unit on two public repositories: their histories are rewritten and force-pushed, and their visibility does not change.",
        "statements": [
          {
            "text": "Run the full pipeline, stages 1 to 9, for GKB2, then GKB, from their mirrors, checked unchanged since the backup.",
            "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
            "excerpt": {
              "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
              "heading": "6.4 The rewrite pipeline (per repository)",
              "paragraph": "The same pipeline serves all six repositories. KotlinBottools differs in three ways: its push target (§7), the path scrub that runs in the same invocation, and the privacy gate that runs before its push. Each stage is a gate. A failure stops the repository before its push and discards its mirror; the backup stays.",
              "hash": "6c634d18186f"
            }
          },
          {
            "text": "Measure and record GKB2's pull-request residual.",
            "ref": "architecture.md#66-residual-exposure-measurement",
            "excerpt": {
              "ref": "architecture.md#66-residual-exposure-measurement",
              "heading": "6.6 Residual-exposure measurement",
              "paragraph": "Each repository is measured after its push, with inputs from `DATA/rewrite/<repo>/` and the backup (findings 3 §6.3). Every result is a tally; no id or body is printed.",
              "hash": "f8e15bff6f3f"
            }
          },
          {
            "text": "Starts once unit 3 has landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "Each repository's post-run checks, per-ref verification and exit tests on a fresh mirror"
        ],
        "risks": [
          "A gitleaks default-rule finding in a kept file; it is recorded by rule id and count and becomes a follow-up"
        ],
        "source": "architecture.md §15 unit 6",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "Built and landed through PR #37 as `416f36b`: GKB2, then GKB, rewritten, each `master` force-pushed once under a lease on its recorded tip, neither push refused, and verified ref by ref; both fresh mirrors are clean on their branches and tags, with no default-rule finding in a kept file, and the `Secret scan` push run on `main` at the merge completed with success. GitHub still serves every old id the unit probed, and GKB2's pull-request ref keeps 15 old commits and 70 of its 81 purged blobs fetchable, as predicted. #27 takes the tools as they ran, with their known gaps and the follow-ups to close before its run, and may start now that the unit has landed.",
        "changes": [
          {
            "what": "GKB2 and GKB were pushed by a refspec push of their one branch, `master`, with an explicit lease on the tip the clone recorded and a dry run first, not by `--force --mirror`: the expected tally `forced=1` and `done=1`, every other count 0, and each push classed `pushed`, every refusal marker at 0, and read back at its new tip.",
            "why": "Under `--mirror`, `--force` or a refspec with a leading `+`, git ignores a lease, and `--mirror` would delete a server branch created after the clone.",
            "when": "#26's plan, its push steps",
            "ref": "26-gkb2-gkb-rewrite/final-implementation.md#33-the-pushes"
          },
          {
            "what": "For GKB2 and GKB the post-run checks end with a gitleaks scan of the rewritten mirror's branches and tags, before the push: a custom-rule finding stops the repository there, and a default-rule finding in a kept file is recorded as the exit tests record one. Both scans read `RESULT: CLEAN`.",
            "why": "The push is the one write that cannot be undone: a finding caught on the rewritten mirror stops the repository with nothing on GitHub changed, where one found on the fresh mirror stops the unit with the remote already rewritten.",
            "when": "#26's plan, its post-run checks",
            "ref": "26-gkb2-gkb-rewrite/final-implementation.md#32-the-rewrites"
          },
          {
            "what": "For GKB2 and GKB the per-ref verification's equality is over heads and tags: `git ls-remote --refs` over heads and tags, and the REST branch listing, which carries heads only, each equal the rewritten heads, with no tag; no head points at a pre-rewrite commit; and the pull-request refs equal their record from the push preparation. Both repositories passed.",
            "why": "A push cannot change the pull-request refs, and GKB2's `refs/pull/6/head` keeps its pre-rewrite commit, so they are held to their record rather than to the rewritten refs.",
            "when": "#26's plan, its per-ref verification",
            "ref": "26-gkb2-gkb-rewrite/final-implementation.md#33-the-pushes"
          },
          {
            "what": "Each force-push was requested by reference to its request file in the data folder, checked by the file's sha256, with the procedure's entries to run as one shell and every printed line given back; the procedure that ran was the file's, unchanged. The design's requests carry the procedure, its inputs and its checks in the request itself.",
            "why": "The request file is carried out byte for byte, with nothing transcribed.",
            "when": "#26's run, each push requested",
            "ref": "26-gkb2-gkb-rewrite/final-implementation.md#4-deviations-from-the-plan"
          },
          {
            "what": "The unit's scope included the corrected stage runner, which replaced the preparation unit's before the rewrites, so that a run's start line in the run log shows its arguments only when they are plain words.",
            "why": "It closes the gap the rewrite and swap unit recorded: the runner wrote every argument of a run into the run log, where a manual run's argument can be a machine path.",
            "when": "#26's plan, its readiness stage",
            "ref": "26-gkb2-gkb-rewrite/consequences.md#3-adoption"
          }
        ]
      }
    },
    {
      "id": "rewrite-bottools-and-the-private-repositories",
      "group": "Legacy repositories",
      "name": "Rewrite BotTools and the private repositories",
      "system": "internal-tooling",
      "where": "BotTools, public · the private repositories · the private repository clone",
      "unit": {
        "n": 7,
        "slug": "rewrite-bottools-and-the-private-repositories",
        "title": "Phase 0 · 7 — Rewrite BotTools and the private repositories, and replace the private repository clone",
        "blockedBy": [
          26
        ],
        "issue": 27,
        "board": "27-rewrite-bottools-and-the-private-repositories/dashboard.html",
        "folder": "27-rewrite-bottools-and-the-private-repositories/",
        "landing": {
          "pr": 48,
          "merge": "053288047b6410bf22fca990cafc17d55051bf6d"
        }
      },
      "gap": {
        "kind": "risk",
        "summary": "BotTools and the private repositories still carry purged paths in their histories. BotTools holds 39 purged blobs, all reachable through its pull-request refs; the first private repository 199 and the second 7,259. The local private repository clone holds the old history.",
        "evidence": [
          "`architecture.md:175` — BotTools: public, 39 purged blobs, all reachable through its pull-request refs",
          "`architecture.md:176` — the first private repository: private, 199 purged blobs",
          "`architecture.md:177` — the second private repository: private, 7,259 purged blobs",
          "`architecture.md:224` — the local private repository clone"
        ],
        "source": "architecture.md §2.1, §2.2",
        "link": "architecture.md#21-the-six-repositories"
      },
      "options": [
        {
          "id": "pipeline-then-clone",
          "name": "The same pipeline for BotTools and the private repositories, then the private repository clone replaced at the same path",
          "verdict": "accepted",
          "why": "Each repository stops on its own gate, and the private repository clone is replaced only once the first private repository's push is proven, its untracked files kept.",
          "source": "architecture.md §6.4, §9.5",
          "link": "architecture.md#95-the-private-repository-clone"
        },
        {
          "id": "one-unit-each",
          "name": "One unit per legacy repository (five)",
          "verdict": "declined",
          "why": "The same procedure five times; two grouped units keep a hand-back per repository with less duplication.",
          "source": "architecture.md §14",
          "link": "architecture.md#14-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "An operational unit on three repositories and one clone: histories rewritten and force-pushed, visibility unchanged.",
        "statements": [
          {
            "text": "Run the full pipeline for BotTools and the private repositories, in that order.",
            "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
            "excerpt": {
              "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
              "heading": "6.4 The rewrite pipeline (per repository)",
              "paragraph": "The same pipeline serves all six repositories. KotlinBottools differs in three ways: its push target (§7), the path scrub that runs in the same invocation, and the privacy gate that runs before its push. Each stage is a gate. A failure stops the repository before its push and discards its mirror; the backup stays.",
              "hash": "6c634d18186f"
            }
          },
          {
            "text": "Measure and record BotTools' pull-request residual.",
            "ref": "architecture.md#66-residual-exposure-measurement",
            "excerpt": {
              "ref": "architecture.md#66-residual-exposure-measurement",
              "heading": "6.6 Residual-exposure measurement",
              "paragraph": "Each repository is measured after its push, with inputs from `DATA/rewrite/<repo>/` and the backup (findings 3 §6.3). Every result is a tally; no id or body is printed.",
              "hash": "f8e15bff6f3f"
            }
          },
          {
            "text": "Replace the private repository clone with a fresh one at the same path, restoring its untracked files, the old clone deleted last.",
            "ref": "architecture.md#95-the-private-repository-clone",
            "excerpt": {
              "ref": "architecture.md#95-the-private-repository-clone",
              "heading": "9.5 The private repository clone",
              "paragraph": "The private repository clone is replaced once the first private repository's push is proven, as the last step of unit 7. It is carried out on request (§11), with the procedure from the unit's plan (findings 4 §6.5):",
              "hash": "6ab141c154ae"
            }
          },
          {
            "text": "Starts once unit 6 has landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "Each repository's exit tests on a fresh mirror; the clone's untracked set, refs, pack count, `fsck` and the \"all missing\" proofs"
        ],
        "risks": [
          "A scan or rewrite of either private repository outgrows one run; the unit's plan splits it across stages"
        ],
        "source": "architecture.md §15 unit 7",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "#27 landed with its last unit, #42, through PR #48 as `0532880`; its plan landed through PR #38 as `9f22646`, its four units through PRs #44, #45, #46 and #48, and #27 is closed. BotTools (public), then the private repositories, were force-pushed in place, one atomic push each under a lease on every branch's recorded tip, five branches in all, 16 commits to 15, 11 to 9 and 2 to 1; each kept its visibility, each fresh mirror is clean, and no default-rule finding arose. GitHub still serves every old object probed, BotTools' pull-request refs keep its 39 purged blobs fetchable, as predicted, and the events listed the push of 1 of the 5 branches. The private repository clone was replaced by a fresh clone with its four `.idea/` files, the old clone deleted at its recorded path outside the workspace, and its graph rebuilt from the rewritten tree. #47, filed against the tools' request builder, stays open. #28 takes the three report rows, every unit's records with their checksum lists, both tool folders and the stage runner, and the record that no old-clone path remains, and may start now that the unit has landed.",
        "changes": [
          {
            "what": "The private repository clone is replaced by a unit of its own, the clone replacement, after the rewrites: of the 59 files git does not track in it, only the four under `.idea/` are carried and restored; the graph's 55 files, its exclude entry, its two hooks and the two extra configuration keys are not. The old clone is renamed aside on its own volume and deleted once the fresh clone has been read back, and a code-only graph build from the rewritten tree follows the deletion.",
            "why": "The graph was built from the pre-rewrite tree and names files the rewrite removes, so the fresh clone gets a graph built from the rewritten tree instead; and the workspace sits on another volume than the clone, so a move into it would be a copy followed by a deletion, with no lock probe and the irreversible step first.",
            "when": "#27's design, its clone replacement",
            "ref": "27-rewrite-bottools-and-the-private-repositories/architecture.md#103-what-is-carried-and-what-is-not",
            "link": "architecture.md#95-the-private-repository-clone"
          },
          {
            "what": "BotTools and the private repositories were not pushed with `--force --mirror`: each was pushed once, every branch in one `git push --porcelain --atomic` with an explicit lease per branch on the tip the clone recorded, to the repository's URL, after the same line run as a dry run; 2, 2 and 1 branches.",
            "why": "Under `--mirror`, `--force` or a refspec with a leading `+`, git ignores a lease, and `--mirror` would delete a server branch created after the clone; without `--atomic`, a failure that concerns one branch would leave a half-rewritten repository, whose only repair is a second force-push.",
            "when": "#27's design, its push",
            "ref": "27-rewrite-bottools-and-the-private-repositories/architecture.md#82-the-push",
            "link": "architecture.md#11-what-the-phase-must-achieve"
          },
          {
            "what": "The tools that run BotTools' and the private repositories' rewrites, their residual measurement and the private repository clone's replacement are a new, self-contained folder derived from the GKB2 and GKB unit's, beside it, saved and pinned by #27's tools unit; the clone scripts are rebuilt there as request procedures with a builder.",
            "why": "Nearly every file changes for these three repositories, and the earlier folder stays as it ran: its pins are the GKB2 and GKB unit's record, which an edit in place would make false.",
            "when": "#27's design, its tools",
            "ref": "27-rewrite-bottools-and-the-private-repositories/architecture.md#71-the-folder",
            "link": "architecture.md#61-toolchain"
          },
          {
            "what": "#27 was carried out as four units, its sub-issues, in this order: the tools (#39), the rewrites (#40), then the residual measurement of all three repositories (#41), a unit of its own, and the clone replacement (#42), each of those two blocked by the rewrites alone.",
            "why": "The work spans four systems with different gates and different writes: the tools must be proven before any push, with no write at all; the residual measurement waits for the last push and has a time window; the clone replacement writes to a checkout, not to GitHub. One unit would hold one landing hostage to four kinds of stop.",
            "when": "#27's design, its decomposition",
            "ref": "27-rewrite-bottools-and-the-private-repositories/architecture.md#16-decomposition",
            "link": "architecture.md#15-decomposition"
          }
        ]
      }
    },
    {
      "id": "residual-report-and-cleanup",
      "group": "Report and cleanup",
      "name": "Residual report and cleanup",
      "system": "internal-tooling",
      "where": "the report on #2 · the workspace and the data folder",
      "unit": {
        "n": 8,
        "slug": "residual-report-and-cleanup",
        "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
        "blockedBy": [
          25,
          27
        ],
        "issue": 28,
        "board": "28-residual-report-and-cleanup/dashboard.html",
        "folder": "28-residual-report-and-cleanup/",
        "tests": {
          "base": "0532880",
          "updated": "2026-11-17T00:40:17Z",
          "added": [],
          "amended": [],
          "relevant": [
            {
              "class": "the workspace tools' quick gate",
              "module": "workspace tools",
              "testSet": "deterministic",
              "tests": 63,
              "result": {
                "state": "passed",
                "passed": 63,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:25:19Z"
              }
            },
            {
              "class": "the data folder's checksum lists, blob ids and census",
              "module": "data folder",
              "testSet": "e2e",
              "tests": 3,
              "result": {
                "state": "passed",
                "passed": 3,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:26:02Z"
              }
            },
            {
              "class": "the follow-ups read on GitHub and in the records",
              "module": "data folder and GitHub",
              "testSet": "integration",
              "tests": 34,
              "result": {
                "state": "passed",
                "passed": 34,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:26:36Z"
              }
            },
            {
              "class": "the tools copy against its list, the four pin lists and the runner's pin",
              "module": "tools copy",
              "testSet": "gating",
              "tests": 9,
              "result": {
                "state": "passed",
                "passed": 9,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:27:33Z"
              }
            },
            {
              "class": "the id-source proof against the backups",
              "module": "tools copy",
              "testSet": "integration",
              "tests": 12,
              "result": {
                "state": "passed",
                "passed": 12,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:28:19Z"
              }
            },
            {
              "class": "both routes of the document checks over the same documents",
              "module": "tools copy",
              "testSet": "integration",
              "tests": 13,
              "result": {
                "state": "passed",
                "passed": 13,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:28:19Z"
              }
            },
            {
              "class": "the report's source lines, fill and checks",
              "module": "report",
              "testSet": "nonfunctional",
              "tests": 3,
              "result": {
                "state": "passed",
                "passed": 3,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:50:06Z"
              }
            },
            {
              "class": "the report read back from GitHub",
              "module": "report",
              "testSet": "e2e",
              "tests": 1,
              "result": {
                "state": "passed",
                "passed": 1,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:50:06Z"
              }
            },
            {
              "class": "the close-out reads of the old clone's path, the package and the lists",
              "module": "data folder",
              "testSet": "e2e",
              "tests": 3,
              "result": {
                "state": "passed",
                "passed": 3,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:50:59Z"
              }
            },
            {
              "class": "the output rule over the step outputs, the body, the reply and the request",
              "module": "data folder",
              "testSet": "nonfunctional",
              "tests": 5,
              "result": {
                "state": "passed",
                "passed": 5,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:50:59Z"
              }
            },
            {
              "class": "the unit's checksum list",
              "module": "data folder",
              "testSet": "gating",
              "tests": 1,
              "result": {
                "state": "passed",
                "passed": 1,
                "failed": 0,
                "skipped": 0,
                "at": "2026-11-16T23:50:59Z"
              }
            },
            {
              "class": "selftest-1.sh",
              "module": "g28",
              "testSet": "component",
              "tests": 17,
              "result": {
                "state": "passed",
                "passed": 17,
                "failed": 0,
                "skipped": 0,
                "pass": 2,
                "at": "2026-11-17T00:40:17Z"
              }
            },
            {
              "class": "selftest-2.sh",
              "module": "g28",
              "testSet": "component",
              "tests": 24,
              "result": {
                "state": "passed",
                "passed": 24,
                "failed": 0,
                "skipped": 0,
                "pass": 2,
                "at": "2026-11-17T00:40:17Z"
              }
            },
            {
              "class": "selftest-3.sh",
              "module": "g28",
              "testSet": "component",
              "tests": 22,
              "result": {
                "state": "passed",
                "passed": 22,
                "failed": 0,
                "skipped": 0,
                "pass": 2,
                "at": "2026-11-17T00:40:17Z"
              }
            },
            {
              "class": "selftest-4.sh",
              "module": "g28",
              "testSet": "integration",
              "tests": 16,
              "result": {
                "state": "passed",
                "passed": 16,
                "failed": 0,
                "skipped": 0,
                "pass": 2,
                "at": "2026-11-17T00:40:17Z"
              }
            }
          ]
        },
        "landing": {
          "pr": 49,
          "merge": "3625163c1a1177afca20488e421a5f44778724e0"
        }
      },
      "gap": {
        "kind": "missing",
        "summary": "No record says what GitHub still serves of the old histories. The phase requires the residual exposure measured and reported rather than assumed away, and its workspace holds a copy of everything the rewrite removes for as long as the units take.",
        "evidence": [
          "`architecture.md:119` — the residual exposure is measured and reported, not assumed away",
          "`architecture.md:742` — the expected pull-request residual: 70 of 81 for GKB2, 39 of 39 for BotTools",
          "`architecture.md:1469` — the workspace holds the old objects until the last unit deletes it"
        ],
        "source": "architecture.md §1.1, §6.6, §16",
        "link": "architecture.md#11-what-the-phase-must-achieve"
      },
      "options": [
        {
          "id": "report-and-delete",
          "name": "One report in counts posted on #2, then the data re-verified, the tools copied and the workspace deleted",
          "verdict": "accepted",
          "why": "It states what the exit tests proved and what they cannot prove, and leaves nothing of the phase on the machine but the data folder, the two realigned clones and the installed package.",
          "source": "architecture.md §6.7, §12.4",
          "link": "architecture.md#124-the-report"
        },
        {
          "id": "support-ticket",
          "name": "Ask GitHub Support to remove the old objects and the pull-request refs",
          "verdict": "declined",
          "why": "A non-goal of the phase: the pull-request refs of GKB2 and BotTools and every cached view stay, and the residual is measured instead.",
          "source": "architecture.md §4",
          "link": "architecture.md#4-non-goals"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "The phase's close: it reports in counts, deletes the workspace and closes #2 with its landing.",
        "statements": [
          {
            "text": "Compile the report table from the units' records and post it on #2.",
            "ref": "architecture.md#124-the-report",
            "excerpt": {
              "ref": "architecture.md#124-the-report",
              "heading": "12.4 The report",
              "paragraph": "Each rewrite unit's as-built record carries its repositories' rows. Unit 8 compiles them into one table and posts it on #2.",
              "hash": "b7d7a842646b"
            }
          },
          {
            "text": "Confirm the follow-ups: the rehearsal repositories, any deferred object deletion, any token-rule gap and any default-rule finding.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          },
          {
            "text": "Re-verify the data, copy the tools to the data folder and delete the workspace, confirming its deletion.",
            "ref": "architecture.md#67-cleanup",
            "excerpt": {
              "ref": "architecture.md#67-cleanup",
              "heading": "6.7 Cleanup",
              "paragraph": "Cleanup runs in this order:",
              "hash": "16eb3a1c3069"
            }
          },
          {
            "text": "Starts once units 5 and 7 have landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "4690d3998690"
            }
          }
        ],
        "tests": [
          "The data re-verified against its checksum lists before the deletion, which a mismatch stops"
        ],
        "risks": [],
        "source": "architecture.md §15 unit 8",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "#28 landed through PR #49 as 3625163. It posted the residual-exposure report on #2 as one comment, 17,602 bytes in 148 lines, read back as the newest comment with the title line and equal to its body. The data folder verified (47 of 47 checksum lists, 91 of 91 data-copy files) and gained the tools copy, 139 files byte for byte, and a list over its 344 unlisted files; the landing's document checks run from that copy. The workspace, 10,234 files in 5,966 folders, was renamed on its first try and removed, both paths absent with nothing left over; the owner permitted each deletion command as it ran, so no allow line was placed. The old private repository clone's recorded path is absent, and every follow-up of the phase is recorded with who carries it out. #2 is closed as completed by the owner by hand after the landing."
      }
    }
  ],
  "impact": {
    "basis": "as-built",
    "summary": "As built, no module was published and no version moved. Every commit id changed in all six repositories, ten commits pruned: GKB2, GKB, BotTools and the private repositories were force-pushed in place, and KotlinBottools became public as a fresh repository with every number reproduced, the pre-rewrite repository kept private and archived under its legacy name. On `main`, the path scrub replaced the machine-local paths in two KotlinBottools source files, and the rest is repository infrastructure. GitHub still serves the old objects by id, as the residual-exposure report on #2 states; on this machine the workspace is deleted and the data folder keeps the legacy data, the records and the tools copy.",
    "release": {
      "bump": "none",
      "version": null,
      "note": "a tracking plan moves no version, and no unit publishes a module",
      "nothingPublished": true
    },
    "none": null,
    "downstream": [
      {
        "who": "The six repositories' histories",
        "kind": "repository",
        "system": null,
        "effect": "breaking",
        "summary": "Every commit id changed, as each root commit held a purged path: ten commits were pruned (KotlinBottools 87 to 85, GKB2 32 to 30, GKB 11 to 9, BotTools 16 to 15, the first private repository 11 to 9, the second 2 to 1) and every branch stands at its rewritten tip. Pre-rewrite ids already cited stay as dated citations that resolve only in the private legacy repository. KotlinBottools was public from 2026-11-08, so its pre-rewrite objects were anonymously readable until the swap made the pre-rewrite repository private on 2026-11-11, a window the residual-exposure report states.",
        "link": "consequences.md#21-the-six-repositories"
      },
      {
        "who": "KotlinBottools' commit content",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "Every file and commit message that named a machine-local path was rewritten: the project-checkouts folder became `%PROJECTS%` and a user-profile folder `%USERPROFILE%`. On `main` that changed the local Maven repository line of `build.gradle.kts`, which resolved only on this machine, and a commented-out line of `GuildDataParser.kt`; the legacy repository keeps the original text, and the other five repositories were not scrubbed.",
        "link": "consequences.md#1-published-artifacts"
      },
      {
        "who": "KotlinBottools on GitHub",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "The public `KotlinBottools` is a new repository with a new id, public with secret scanning and push protection on, and the old settings and access but the wiki, off, and GitHub Actions' default workflow permissions, read-only; stars and watchers started empty. The pre-rewrite repository was public under its name until the swap made it private on 2026-11-11, between its rename and its archiving; the legacy repository keeps the pre-rewrite history, its pull requests, milestone and labels, private and archived.",
        "link": "consequences.md#22-kotlinbottools-the-public-repository-and-the-legacy-repository"
      },
      {
        "who": "Issue numbers, links and citations",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "Every number was reproduced, 1 to 31, pull requests by closed placeholders, and the transfers kept all 91 links, so no relationship was re-created and citations keep resolving. The moved texts keep the references the transfers wrote, naming `KotlinBottools-next`, which stays reserved. Of the 56 links that named the planning branch, the 39 in the bodies of #1 to #19 point at `main`; the 16 in MagicBot #1 to #8, the 1 in WebTools #55 and a plain mention in a comment on #1 remain, the owner's to fix.",
        "link": "consequences.md#23-issue-numbers-and-links"
      },
      {
        "who": "GKB2, GKB, BotTools and the private repositories",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "Force-pushed in place, each keeping its visibility. GitHub keeps serving every old object probed by id, and GKB2's and BotTools' pull-request refs keep old history fetchable, 70 of GKB2's 81 purged blobs and all 39 of BotTools'; for the three public ones that exposure is not new. Nothing of it was removed, as the residual-exposure report states.",
        "link": "consequences.md#21-the-six-repositories"
      },
      {
        "who": "MagicBot and WebTools",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "No code or document changed. The transfers rewrote their references to KotlinBottools issues to name `KotlinBottools-next`, all 76 in MagicBot's texts and 4 of the 6 in WebTools', and kept every relationship. Their planning-branch links, 16 in MagicBot #1 to #8 and 1 in WebTools #55, were not repointed and remain the owner's to fix; MagicBot issue 2 has had its comment on its secret-scan configuration since 2026-11-08.",
        "link": "consequences.md#24-other-repositories-in-the-organisation"
      },
      {
        "who": "Two rehearsal repositories",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "Both remain, private and archived: the source under its legacy name, the target under the source's original name. Deleting them, if they are unwanted, is the owner's, and needs the `delete_repo` scope the signed-in token lacks.",
        "link": "consequences.md#24-other-repositories-in-the-organisation"
      },
      {
        "who": "This machine",
        "kind": "operator",
        "system": null,
        "effect": "behaviour",
        "summary": "The data folder remains with the legacy data, the records and the tools copy, verified and listed in full; the workspace was deleted, and no copy of the old objects remains on this machine. This working directory was realigned in place, 41 tracked files leaving its tree, its old objects deleted with nothing deferred. The private repository clone was replaced by a fresh clone that keeps only its four `.idea/` files, its code knowledge graph rebuilt from the rewritten tree, and the old clone, set aside on its own volume outside the workspace, was deleted there; git-filter-repo stays installed, and gitleaks lives only in the tools copy.",
        "link": "consequences.md#25-this-machine"
      }
    ],
    "adaptation": [
      {
        "who": "Phase 1",
        "system": null,
        "need": "required",
        "summary": "Starts from the rewritten `main` of the public repository, extends its `CHANGELOG.md` and adds its `ci.yml` beside the secret-scan workflow, as a second workflow with its own name, job id and concurrency group.",
        "link": "architecture.md#123-phase-1s-starting-point"
      },
      {
        "who": "MagicBot's secret-scan configuration",
        "system": null,
        "need": "optional",
        "summary": "Should come into line with KotlinBottools': drop its global allowlist and add the two path rules. KotlinBottools' one allowlist table, scoped to one default rule, one of its own research documents and one exact text, is not part of that alignment, and there is still no global allowlist. Its own CI, Phase 13's, can adopt the same workflow pattern.",
        "link": "consequences.md#3-adoption"
      },
      {
        "who": "Phase 17",
        "system": null,
        "need": "none",
        "summary": "Archives the five predecessor repositories on top of their purged histories, and decides BotTools' webhook.",
        "link": "consequences.md#3-adoption"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md §1 to §6, reconciled with the eight units' landings; their consequences.md and final-implementation.md",
    "link": "consequences.md#2-blast-radius",
    "units": [
      {
        "unit": "preparation",
        "basis": "as-built",
        "summary": "Local preparation: no module was published and no version moved. The unit wrote nothing to GitHub but its own documents and boards, read the six repositories, and left the tools, backups, lists, manifests and verified data copy the later units consume.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "21-preparation/consequences.md §1 to §4; 21-preparation/final-implementation.md",
        "link": "21-preparation/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "CPython 3.13 was not added on this machine.",
            "why": "The fixture rehearsal passed on Python 3.14.7, so the fallback that would install it did not run.",
            "when": "Implementation",
            "ref": "21-preparation/consequences.md#22-this-machine"
          },
          {
            "what": "The landing edits the parent's documents and carries generated boards.",
            "why": "It adds one line to the parent's `consequences.md` and a dated note on the generated boards' commit ids to its `architecture.md`, and ten generated board files record this unit's state.",
            "when": "Document",
            "ref": "21-preparation/consequences.md#24-documents-and-generated-boards"
          },
          {
            "what": "`transfer-rehearsal` (#22) consumes this unit's results.",
            "why": "It is blocked by this unit and takes what every later unit takes, plus the proven authentication and the scan tools at their fixed names.",
            "when": "Document",
            "ref": "21-preparation/consequences.md#4-sibling-units-and-neighbouring-issues"
          },
          {
            "what": "What each of the four later units consumes is stated unit by unit.",
            "why": "Only `gkb2-gkb-rewrite` and `rewrite-bottools-and-the-private-repositories` consume the backups, manifests and expectation rows the planned entry named for all four.",
            "when": "Document",
            "ref": "21-preparation/consequences.md#4-sibling-units-and-neighbouring-issues"
          },
          {
            "what": "`kotlinbottools-rewrite-and-swap` (#23) also consumes the runner, the log and the fixture's expected scrub counts.",
            "why": "The reconciled consequences list them beside the expression file; the planned entry left them out.",
            "when": "Landing",
            "ref": "21-preparation/consequences.md#4-sibling-units-and-neighbouring-issues"
          },
          {
            "what": "`repository-hygiene` (#24) consumes what every later unit does, and the proven authentication.",
            "why": "The reconciled consequences list them; the planned entry named only `secret_scan.py` and `gitleaks.toml`.",
            "when": "Landing",
            "ref": "21-preparation/consequences.md#4-sibling-units-and-neighbouring-issues"
          }
        ]
      },
      {
        "unit": "transfer-rehearsal",
        "basis": "as-built",
        "summary": "Two throwaway repositories and nothing else on GitHub: no module was published and no version moved, and KotlinBottools and every other repository stayed as they were. The rehearsal passed, measured how a transfer treats numbers, closed issues, links and references and that the rename swap holds, and leaves the tool, with its known gaps, and the results for the next unit.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "22-transfer-rehearsal/consequences.md §1 to §6; 22-transfer-rehearsal/final-implementation.md §2 to §4",
        "link": "22-transfer-rehearsal/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "The next unit also takes what a transfer does to issue references, the tool's known gaps to close before reusing it, a job of its own, and the decision on the moved text that names `KotlinBottools-next`.",
            "why": "The run measured the rewriting of references, which the documentation omits, and what those references reach after the renames; the tool's gaps were recorded rather than fixed, as it ran exactly as planned.",
            "when": "S3 to S5",
            "ref": "22-transfer-rehearsal/consequences.md#4-sibling-units-and-neighbouring-issues"
          }
        ]
      },
      {
        "unit": "kotlinbottools-rewrite-and-swap",
        "basis": "as-built",
        "summary": "No module was published and no version moved; the landing changed documents and generated boards only. KotlinBottools is a fresh private repository holding the rewritten history and every number, the pre-rewrite repository is kept under its legacy name, private and archived, which ended its public window, and this working directory is realigned with its old objects deleted. The moved issue texts, and MagicBot's and WebTools' issue texts the transfers rewrote, name `KotlinBottools-next`, so that name stays reserved; public links to KotlinBottools issues answer \"not found\" until the publication unit, whose change to public also waits on a default-rule finding in one kept file.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "compat": "notable",
        "source": "23-kotlinbottools-rewrite-and-swap/consequences.md §1 to §6; 23-kotlinbottools-rewrite-and-swap/final-implementation.md §3, §4",
        "link": "23-kotlinbottools-rewrite-and-swap/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "The transfers also rewrote MagicBot's and WebTools' issue texts: every reference to a KotlinBottools issue in MagicBot's, and 4 of the 6 in WebTools', now names `KotlinBottools-next`, so the reserved name carries them too.",
            "why": "The plan left open whether a transfer rewrites text in other repositories that cites a moved issue (assumption A7); the reads before and after the walk show that it does.",
            "when": "Implementation, S12",
            "ref": "23-kotlinbottools-rewrite-and-swap/consequences.md#21-github"
          },
          {
            "what": "A default-rule finding of gitleaks in one kept file holds the publication unit's change to public until it is judged.",
            "why": "The exit tests found 2 findings of one default rule in 1 kept file, where assumption A13 expected none; the plan's rule records it by rule id and count and holds the visibility change, not this unit.",
            "when": "Implementation, S7",
            "ref": "23-kotlinbottools-rewrite-and-swap/consequences.md#5-known-gaps"
          },
          {
            "what": "The accepted pre-rewrite ids in the moved resolution comments are 26 occurrences of 3 distinct ids, which the publication unit's id-reference check accounts for.",
            "why": "The plan's figure of 26 counted the occurrences; Gate 1 and the read before the walk found the same 3 ids in the same 3 comments.",
            "when": "Implementation, S5 and S9",
            "ref": "23-kotlinbottools-rewrite-and-swap/final-implementation.md#4-deviations-from-the-plan"
          },
          {
            "what": "No deferred step is left: the old objects in this working directory were deleted, with the deletion proven.",
            "why": "The plan provides for either outcome; the proofs passed at the realignment, so nothing was recorded or deferred.",
            "when": "Implementation, S15",
            "ref": "23-kotlinbottools-rewrite-and-swap/consequences.md#23-this-checkout"
          },
          {
            "what": "The later units take the tools as corrected during the run, among them this unit's copy of the privacy gate, saved over the preparation unit's in the workspace.",
            "why": "Thirteen tools were corrected during the run, and the corrected versions are the plan's Appendix A; the gate's copy makes the order of names that differ only in case total, so its record repeats in every process.",
            "when": "Implementation",
            "ref": "23-kotlinbottools-rewrite-and-swap/consequences.md#4-sibling-units-and-neighbouring-issues"
          }
        ]
      },
      {
        "unit": "repository-hygiene",
        "basis": "as-built",
        "summary": "No module was published and no version moved. KotlinBottools has its first workflow, `Secret scan`, with its wrapper, a configuration whose one scoped allowlist table settles the default-rule finding unit 3 recorded, and the allowlist controls that test that table on every run; a root-anchored `.gitignore`, the README correction and its first `CHANGELOG.md`. The workflow's first two runs passed, and the workspace configuration took the committed bytes after the merge; two workspace scripts still pin the old value, for #26 and #27.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "24-repository-hygiene/consequences.md §1 to §6; 24-repository-hygiene/final-implementation.md §1, §4",
        "link": "24-repository-hygiene/consequences.md#2-blast-radius"
      },
      {
        "unit": "kotlinbottools-publish",
        "basis": "as-built",
        "summary": "No module was published and no version moved; the landing carried documents and generated boards only. KotlinBottools is public with secret scanning and push protection on: its rewritten history, its issues and pull requests with the earlier revisions of edited texts, and its Actions runs. The bodies of #1 to #19 point at `main` instead of the deleted planning branch, and MagicBot's and WebTools' references to KotlinBottools issues resolve for everyone. #26 and #27 take the corrected anonymous probe rules, and #28 KotlinBottools' row of the residual report, the three alert reads and the follow-ups.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "compat": "notable",
        "source": "25-kotlinbottools-publish/consequences.md §1 to §6; 25-kotlinbottools-publish/final-implementation.md §1, §3, §4",
        "link": "25-kotlinbottools-publish/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "The activity feeds were read a third time, at the landing, for at most 6 more anonymous REST calls: that read, 0 old ids in each of the three feeds, is the one past the feeds' caches.",
            "why": "The second feed read fell inside the events feed's 300 s cache, so it was not an independent read.",
            "when": "Implementation, S9; the landing's reads",
            "ref": "25-kotlinbottools-publish/final-implementation.md#44-the-second-feed-read-fell-inside-the-events-feeds-cache"
          }
        ]
      },
      {
        "unit": "gkb2-gkb-rewrite",
        "basis": "as-built",
        "summary": "No module was published and no version moved; the landing carried documents and generated boards only. `master` of GKB2 and of GKB was replaced by its rewritten history through one push of that ref under a lease on its recorded tip, and neither push was refused; both stay public and unarchived, GitHub keeps serving every old object the unit probed, and GKB2's pull-request ref keeps 15 old commits and 70 of its 81 purged blobs fetchable. #27 takes the corrected runner, the tools with their parameter table, their known gaps and the follow-ups to close before its run, and the lease push; #28 the two report rows with GKB2's residual, with no default-rule finding to confirm.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "26-gkb2-gkb-rewrite/consequences.md §1 to §6; 26-gkb2-gkb-rewrite/final-implementation.md §3, §4",
        "link": "26-gkb2-gkb-rewrite/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "#27 also takes the tools' known gaps and the follow-ups to close before its run, edits to the two tools that name GKB2 and GKB outside the parameter table, and the one-shell form of a push request's procedure as the request's to ask for.",
            "why": "Two tools name the repositories outside the table, the tools as they ran keep gaps in their stored-reply reading, untested stops, output rule and close-out, and each push request ran as one shell because it asked for it (the as-built record, deviations 7, 9 and 10).",
            "when": "#26's as-built record and consequences",
            "ref": "26-gkb2-gkb-rewrite/consequences.md#4-sibling-units-and-neighbouring-issues"
          },
          {
            "what": "#28 has no default-rule finding to confirm for GKB2 or GKB.",
            "why": "The scan before each push and both fresh mirrors' scans of branches and tags read clean, with no default-rule finding in a kept file.",
            "when": "#26's stages S1 and S2, the exit tests",
            "ref": "26-gkb2-gkb-rewrite/final-implementation.md#34-the-exit-tests"
          },
          {
            "what": "On this machine the run log in the data folder holds 7 lines that name a file of the data folder or of the self-test's sandbox, and the landing's document checks and the preparation unit's removal proof leave files in the earlier units' gate folder and the workspace's `tmp/` folder.",
            "why": "Two reads in the push step redirect from files that do not exist before its first run, and the self-test calls a tool before its output folder exists (the as-built record, deviations 3 and 6); the gate and the removal proof write where they always do. None of it is committed.",
            "when": "#26's stages S0 to S2 and the landing's document checks",
            "ref": "26-gkb2-gkb-rewrite/consequences.md#22-this-machine"
          }
        ]
      },
      {
        "unit": "rewrite-bottools-and-the-private-repositories",
        "basis": "as-built",
        "summary": "No module was published and no version moved; every landing of #27 and its four units carried documents and generated boards only. BotTools (public), then the private repositories, were force-pushed in place, one atomic push each under a lease on every branch's recorded tip, five branches in all: every commit id changed, the purged files left every commit, and each kept its visibility and default branch. GitHub keeps serving every old object probed, BotTools' pull-request refs keep its 39 purged blobs fetchable, and the events listed the push of 1 of the 5 branches. The private repository clone was replaced by a fresh clone with its four `.idea/` files, the old clone deleted at its recorded path outside the workspace, and its graph rebuilt from the rewritten tree. #47 stays open against the tools; #28 takes the three report rows, every unit's records with their checksum lists, both tool folders and the stage runner, and the record that no old-clone path remains.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "27-rewrite-bottools-and-the-private-repositories/consequences.md §1 to §6; its four units' consequences.md and final-implementation.md",
        "link": "27-rewrite-bottools-and-the-private-repositories/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "The events did not list every rewritten branch's push: after each push's 6 hours they listed the push of 1 of BotTools' 2 branches and none of the first private repository's 2 or the second's 1, while every activity feed lists each force push.",
            "why": "The unit's impact took one event per rewritten branch; the residual measurement read the events until 6 hours had passed since each push and recorded what they listed. Whether GitHub lists the other pushes later is not established.",
            "when": "#41 landing",
            "ref": "27-rewrite-bottools-and-the-private-repositories/41-residual-measurement/consequences.md#5-known-gaps"
          },
          {
            "what": "The old clone held two exclude entries, the second the board files' ignore: that ignore is part of a graph's footprint, was taken out before the census and not carried, and the rebuilt graph placed it again with its own entry.",
            "why": "The unit's impact took the old graph's footprint as one exclude entry, two hooks and two keys; the replacement's census recorded the ignore, and #27's design took a dated note stating it as part of a graph's footprint.",
            "when": "#42 landing",
            "ref": "27-rewrite-bottools-and-the-private-repositories/42-clone-replacement/consequences.md#22-this-machine"
          },
          {
            "what": "One issue, #47, was filed in KotlinBottools against the workspace tools, for the clone set's request builder; it stays open outside #27's units.",
            "why": "The deletion request carried the replacement's check sentences. The defect changed no outcome, and the tool folder stays at its pins, so its fix is a new version of the pinned file under the tools' defect rule.",
            "when": "#42 landing",
            "ref": "27-rewrite-bottools-and-the-private-repositories/42-clone-replacement/final-implementation.md#4-deviations-from-the-plan"
          }
        ]
      },
      {
        "unit": "residual-report-and-cleanup",
        "basis": "as-built",
        "summary": "As built, no module is published and no version moves; the landing carries documents and generated boards only. The residual-exposure report was posted on #2 as one comment and read back equal to its body; #2 is closed as completed after the landing, by the owner by hand, as the section for its closing was not given. On this machine the data folder was re-verified and gained the tools copy, 139 files, and a list over its 344 unlisted files; the workspace, 10,234 files in 5,966 folders, was deleted, the owner permitting each command as it ran; the old private repository clone's recorded path is absent; and every follow-up of the phase is recorded with who carries it out.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "28-residual-report-and-cleanup/consequences.md §1 to §6, reconciled with the build; 28-residual-report-and-cleanup/final-implementation.md",
        "link": "28-residual-report-and-cleanup/consequences.md",
        "changes": [
          {
            "what": "#2's closing falls to the owner by hand, unless the owner gives the closing's section and places its allow line first.",
            "why": "Readiness recorded the section for the closing as not given, and the closing's allow line, which the unit cannot read, is not known to be placed; the plan has the owner close #2 by hand in that case.",
            "when": "#28 landing",
            "ref": "28-residual-report-and-cleanup/final-implementation.md#2-acceptance"
          },
          {
            "what": "The workspace's deletion ran without its allow line: the owner permitted each of its commands as it ran, so none is left to remove.",
            "why": "The owner chose to permit each command at the moment it ran instead of placing the line ahead of the stage; the first removal was refused before it ran and ran once permitted, the commands, the script and their outputs as the plan gives them.",
            "when": "#28 landing",
            "ref": "28-residual-report-and-cleanup/final-implementation.md#5-deviations-from-the-plan"
          },
          {
            "what": "The workspace held 10,234 files in 5,966 folders, the root counted, 791 MB, at its deletion, where the plan read 10,195 files in 5,955 folders, 787 MB.",
            "why": "The plan's figures are its reading of the workspace when it was written; the deletion's guards recorded the census just before the rename, and the posted report states that census.",
            "when": "#28 landing",
            "ref": "28-residual-report-and-cleanup/final-implementation.md#35-the-workspaces-deletion-s5"
          }
        ]
      }
    ],
    "changes": [
      {
        "unit": "preparation",
        "when": "#21 landing",
        "none": true,
        "why": "The unit built what its plan set out, with no deviation, and changed nothing outside this machine but its own documents and boards. The dated note on the generated boards' commit ids treats them as the older documents' ids, which the initiative's impact already records.",
        "ref": "21-preparation/final-implementation.md#4-deviations-from-the-plan"
      },
      {
        "unit": "transfer-rehearsal",
        "entry": "downstream.0",
        "when": "#22 landing",
        "what": "KotlinBottools' pre-rewrite objects are anonymously readable until the swap.",
        "why": "KotlinBottools has been public since 2026-11-08 and stays so until the swap; the window cannot be undone, so the residual report states it.",
        "ref": "consequences.md#21-the-six-repositories"
      },
      {
        "unit": "transfer-rehearsal",
        "entry": "downstream.2",
        "when": "#22 landing",
        "what": "The pre-rewrite repository is public until the swap, which makes it private between its rename and its archiving.",
        "why": "The repository became public on 2026-11-08, and the rehearsal proved the order rename, private, archive on a public source and a private target.",
        "ref": "consequences.md#22-kotlinbottools-the-public-repository-and-the-legacy-repository"
      },
      {
        "unit": "transfer-rehearsal",
        "entry": "downstream.3",
        "when": "#22 landing",
        "what": "The moved issues' bodies and comments change: a transfer rewrites their references to full names.",
        "why": "The rehearsal measured it, which the documentation omits; after the renames the references naming the target's temporary name still reached their items, through the redirect the rename leaves on that name. Whether to leave them on it is the rewrite-and-swap unit's decision.",
        "ref": "consequences.md#23-issue-numbers-and-links"
      },
      {
        "unit": "kotlinbottools-rewrite-and-swap",
        "entry": "downstream.2",
        "when": "#23 landing",
        "what": "The fresh `KotlinBottools` carries the old settings except the wiki, off, and GitHub Actions' default workflow permissions, read-only, and stays private until the publication unit, so from the swap until then every public link to a KotlinBottools issue answers \"not found\" to anyone without access. The pre-rewrite repository's public window ended on 2026-11-11, when the swap made it private.",
        "why": "The unit created the fresh repository private and applied the old settings with those two exceptions; making it public is the publication unit's, after the hygiene change.",
        "ref": "23-kotlinbottools-rewrite-and-swap/consequences.md#21-github"
      },
      {
        "unit": "kotlinbottools-rewrite-and-swap",
        "entry": "downstream.3",
        "when": "#23 landing",
        "what": "Every number was reproduced, 1 to 31, and no relationship was re-created: the transfers kept all 91 links. The moved texts keep the references the transfers wrote, naming `KotlinBottools-next`, which stays reserved. The 26 occurrences of 3 pre-rewrite ids in the moved resolution comments of #2, #21 and #22 stay, accepted. The 56 planning-branch links are still to be pointed at `main`, before the publication unit.",
        "why": "No transfer dropped a link, so link reconciliation wrote nothing; the unit's plan chose to leave the moved texts on the temporary name; the issue-text edits need a pass this unit did not send.",
        "ref": "23-kotlinbottools-rewrite-and-swap/consequences.md#21-github"
      },
      {
        "unit": "kotlinbottools-rewrite-and-swap",
        "entry": "downstream.5",
        "when": "#23 landing",
        "what": "MagicBot's and WebTools' issue texts did change: the transfers rewrote their references to KotlinBottools issues to name `KotlinBottools-next` (all 76 in MagicBot's, 4 of the 6 in WebTools'). Their relationships were all kept, and none was written again. Counted before the walk, the citations were 50 in MagicBot, 6 in WebTools and none in `SpartanLaboratories/.github`, where the plan counted 49, 6 and 5.",
        "why": "Whether text in other repositories citing a moved issue is rewritten was unmeasured until this walk; the reads before and after it show that it is.",
        "ref": "23-kotlinbottools-rewrite-and-swap/final-implementation.md#38-references"
      },
      {
        "unit": "repository-hygiene",
        "entry": "adaptation.1",
        "when": "#24 landing",
        "what": "KotlinBottools' configuration, which MagicBot's comes into line with, holds one allowlist table, scoped to one default rule, one of its own research documents and one exact text, with the allowlist controls that test it; there is still no global allowlist, and the table is not part of MagicBot's alignment.",
        "why": "The default-rule finding unit 3 recorded in one kept research document is a command example that passes a token through a shell command substitution, not a literal credential; a table scoped to that rule, path and text settles it without hiding anything else, so the publication unit's change to public no longer waits on it.",
        "ref": "consequences.md#3-adoption"
      },
      {
        "unit": "kotlinbottools-publish",
        "entry": "downstream.3",
        "when": "#25 landing",
        "what": "39 of the 56 planning-branch links, those in the bodies of #1 to #19, now point at `main`, and #1's clause on the planning branch and #2's plan-folder line are corrected; a comment on #1 still names the branch in plain text, as no request edits an existing comment.",
        "why": "The publication unit edited KotlinBottools' issue bodies only; existing comments and the other repositories' texts were outside its writes.",
        "ref": "consequences.md#23-issue-numbers-and-links"
      },
      {
        "unit": "kotlinbottools-publish",
        "entry": "downstream.5",
        "when": "#25 landing",
        "what": "Their planning-branch links, 16 in MagicBot #1 to #8 and 1 in WebTools #55, are not repointed yet: they remain a follow-up.",
        "why": "They were outside the publication unit's writes, which reached KotlinBottools' issue bodies only.",
        "ref": "25-kotlinbottools-publish/consequences.md#6-follow-ups"
      },
      {
        "unit": "gkb2-gkb-rewrite",
        "when": "#26 landing",
        "none": true,
        "why": "GKB2 and GKB were force-pushed in place, public and unarchived with every setting as it was, as the initiative's impact states; GitHub serves their old objects, and GKB2's pull-request ref keeps 70 of its 81 purged blobs fetchable, the research baseline's figure. Neither has a default-rule finding in a kept file, and what the run left on this machine stays in the data folder and the workspace.",
        "ref": "26-gkb2-gkb-rewrite/final-implementation.md#3-measurements"
      },
      {
        "unit": "rewrite-bottools-and-the-private-repositories",
        "entry": "downstream.7",
        "when": "#27 landing",
        "what": "The private repository clone was replaced by a fresh clone that keeps only its four `.idea/` files: its code knowledge graph, built from the pre-rewrite tree, was not carried and was rebuilt from the rewritten tree, and the old clone was set aside on its own volume, outside the workspace, and deleted there, so the workspace's deletion does not reach it and no old-clone path remains.",
        "why": "The old graph named files the rewrite removes, and the clone and the workspace are on different volumes, so a move into the workspace would have been a copy followed by a deletion; #27's design said so in dated notes on this phase's design and consequences, and its clone replacement carried it out.",
        "ref": "27-rewrite-bottools-and-the-private-repositories/42-clone-replacement/consequences.md#22-this-machine"
      },
      {
        "unit": "residual-report-and-cleanup",
        "when": "#28 landing",
        "none": true,
        "why": "The workspace was deleted and the data folder kept with the legacy data, the records and the tools copy, as the initiative's impact states for this machine, and the residual-exposure report states what GitHub still serves and KotlinBottools' public window, as planned. The follow-ups the earlier units left are confirmed in their final state: the remaining planning-branch traces, the rehearsal repositories and the credentials stay open, the owner's.",
        "ref": "28-residual-report-and-cleanup/consequences.md#4-sibling-units-and-neighbouring-issues"
      }
    ]
  },
  "tests": null,
  "roadmap": {
    "issue": 1,
    "title": "BotTools consolidation & MagicBot (tracking)",
    "asOf": "2026-11-08",
    "items": [
      {
        "issue": 2,
        "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
        "state": "OPEN",
        "ref": "../roadmap.md#phase-0--history-rewrite",
        "section": "Phase 0 — History rewrite"
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
  "followUps": [
    {
      "name": "MagicBot's secret-scan configuration",
      "note": "With this plan's landing: a comment on MagicBot issue 2 on its global allowlist and its missing path rules."
    },
    {
      "name": "Planning-branch links",
      "note": "With this plan's landing: the 56 links that name the planning branch pointed at `main`."
    },
    {
      "name": "Issue edits",
      "note": "With this plan's landing: #1's Phase 0 line, and #2's body with its plan-folder line."
    },
    {
      "name": "Rehearsal repositories",
      "note": "Delete them if they are not wanted; that needs the `delete_repo` scope, which the phase does not use."
    },
    {
      "name": "Deferred object deletion",
      "note": "If unit 3 recorded it as deferred, run it in this working directory with the IDE closed (architecture §9.4)."
    },
    {
      "name": "Credentials",
      "note": "Rotate the 2023 session cookie and the first private repository's private key if either could still be live."
    },
    {
      "name": "Token rule",
      "note": "If a positive control showed it missing a real token, change the token regex in KotlinBottools' and MagicBot's configurations."
    },
    {
      "name": "Default-rule findings",
      "note": "Each finding recorded in a kept file of a legacy repository needs a decision: a one-rule allowlist for that path, or acceptance as recorded."
    },
    {
      "name": "Machine-local paths in issue texts",
      "note": "If the third privacy gate counts any in the public repository's issues, pull-request texts or comments, edit those texts: the scrub covers files and commits only."
    }
  ],
  "documents": [
    {
      "label": "Issue #2",
      "path": "https://github.com/SpartanLaboratories/KotlinBottools/issues/2",
      "note": "the phase's scope, what it unblocks and when it is done"
    },
    {
      "label": "Research",
      "path": "research/README.md",
      "note": "five questions, the verification of their load-bearing claims at source, and the summary; findings in `git-filter-repo-on-windows.md`, `gitleaks-local-and-ci.md`, `github-residual-exposure-and-visibility.md`, `clone-realignment-and-data-extraction.md`, `purge-blast-radius.md`"
    },
    {
      "label": "Architecture",
      "path": "architecture.md",
      "note": "the phase's systems design, signed off: requirements and acceptance, the systems and their gates, the order they run in, the alternatives weighed (§14) and the eight units (§15)"
    },
    {
      "label": "Consequences",
      "path": "consequences.md",
      "note": "blast radius, adoption, the sibling units, neighbouring issues, known gaps and follow-ups"
    },
    {
      "label": "Parent architecture",
      "path": "../architecture.md",
      "note": "the consolidation's design; this phase is unit 0 of its decomposition (§14)"
    },
    {
      "label": "Roadmap",
      "path": "../roadmap.md",
      "note": "the consolidation's phases; \"Phase 0 — History rewrite\" (§4)"
    },
    {
      "label": "Parent consequences",
      "path": "../consequences.md",
      "note": "the consolidation's consequences, which this phase's design draws on"
    }
  ],
  "notes": {
    "corrections": [
      {
        "what": "The halt at the architecture and the sign-off that answered it were stamped 07:40 and 08:00 UTC, later than when they happened and, for the sign-off, later than the events that followed it. They are recorded at 07:25:54 and 07:29:01 UTC, when each update arrived: the architecture's first visit, the wait on the answers and the Document step's start move with them.",
        "when": "2026-11-08"
      },
      {
        "what": "The sizing was recorded at 2026-11-07 00:00:00 UTC: the run sent its sizing time as midnight. It is recorded at 07:05:00 UTC; the run's start and the visits it bounds (sizing, plan) move with it.",
        "when": "2026-11-08",
        "retime": {
          "event": "sized",
          "from": "2026-11-07T00:00:00Z",
          "to": "2026-11-07T07:05:00Z"
        }
      },
      {
        "what": "The units were recorded with no dependencies on one another, though the architecture's end-to-end order (§8) and the filed issues' blocked-by links give them: #22 after #21, #23 after #22, #24 and #26 after #23, #25 after #24, #27 after #26, and #28 after #25 and #27. Each unit now names its blockers.",
        "when": "2026-11-08"
      },
      {
        "what": "The Row for #28 cited the design at lines 106, 680 and 1330, which no longer hold what it cites. It cites lines 119, 742 and 1469, where the residual exposure's measurement and report, the expected pull-request residual and the workspace's holding of the old objects stand.",
        "when": "2026-11-16"
      },
      {
        "what": "The pre-rewrite repository and the rehearsal repositories were named by their names on GitHub in the rewrite-and-swap Row, an excerpt and the impact. They are named by what they are, the legacy repository and the rehearsal's source and target, as the documents now name them; no fact changes. Rows: transfer-rehearsal, kotlinbottools-rewrite-and-swap.",
        "when": "2026-11-20"
      },
      {
        "what": "#27's Row listed one of its departures from this design, the clone replacement. It lists the three others too, each from its dated note on this design: the one atomic lease push of each repository (§1.1), the new tool folder beside the GKB2 and GKB unit's (§6.1), and the four units, the residual measurement one of its own (§15). No other fact changes. Rows: rewrite-bottools-and-the-private-repositories.",
        "when": "2026-11-22"
      }
    ]
  },
  "links": {
    "workBoard": "../../index.html",
    "repoBoard": "../../../dashboards/index.html"
  },
  "issueBoards": {
    "39": "27-rewrite-bottools-and-the-private-repositories/39-workspace-tools/dashboard.html",
    "40": "27-rewrite-bottools-and-the-private-repositories/40-rewrites/dashboard.html",
    "41": "27-rewrite-bottools-and-the-private-repositories/41-residual-measurement/dashboard.html",
    "42": "27-rewrite-bottools-and-the-private-repositories/42-clone-replacement/dashboard.html"
  }
}
);
