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
  "function": "Phase 0 of the BotTools consolidation purges secrets and legacy data from the histories of the six bot repositories: KotlinBottools, GKB2, GKB, BotTools, TrumpBot and Support. The legacy data is first copied out byte-exactly, with a manifest of the blobs to purge; then each repository is rewritten with `git filter-repo` in a mirror clone, in a fixed order, and must pass its exit tests on a fresh mirror. KotlinBottools gains a root-anchored `.gitignore` and a gitleaks CI job and becomes public with secret scanning and push protection; what GitHub still serves of the old histories is measured and reported. The phase moves no version.",
  "status": "building",
  "sized": "2026-11-07T07:05:00Z",
  "parent": {
    "issue": 1,
    "board": null
  },
  "fixOf": null,
  "branch": "docs/issue-1-bottools-consolidation",
  "baseline": {
    "ref": "main",
    "sha": "221350d",
    "date": "2026-10-21"
  },
  "asBuilt": null,
  "systems": [],
  "wip": {
    "step": "implementation",
    "since": "2026-11-08T21:15:43Z",
    "updated": "2026-11-13T02:57:18Z",
    "detail": "5 of 8 units landed; #26 in progress; #27 up next.",
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
    "current": [
      "gkb2-gkb-rewrite.built"
    ],
    "questions": [],
    "research": null,
    "interview": [],
    "plan": null,
    "stages": [],
    "remediation": null,
    "open": [],
    "event": {
      "name": "sub-issues-filed",
      "at": "2026-11-08T01:46:36Z",
      "note": "final: filing done"
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
      ]
    },
    "next": "bottools-trumpbot-support-rewrite",
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
    }
  ],
  "rows": [
    {
      "id": "preparation",
      "group": "Preparation",
      "name": "Preparation",
      "system": "kotlinbottools",
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
              "hash": "cd517bc81caf"
            }
          },
          {
            "text": "Write the six path lists and prove them byte-wise, and prove non-interactive authentication against all six repositories.",
            "ref": "architecture.md#61-toolchain",
            "excerpt": {
              "ref": "architecture.md#61-toolchain",
              "heading": "6.1 Toolchain",
              "paragraph": "git stays at 2.55.0.windows.5. The toolchain unit records `git --version` and stops if it differs: git 2.56 exists, and the procedures were verified against 2.55. Python 3.14.7, pip 26.2.1 and gh 2.100.0 are recorded too; a different Python minor or gh major stops. · git-filter-repo 2.47.0 comes from PyPI into the user scheme, hash-pinned (`--require-hashes --only-binary=:all: --no-deps`) (findings 1 §6.1, §6.2). · It is verified by two independent values, the `--version` blob-id prefix and the module's sha256, both equal to the upstream tag's script. · A throwaway fixture run confirms, on …",
              "hash": "cd517bc81caf"
            }
          },
          {
            "text": "Write the path-scrub expression file, `regex:` lines only and naming no account, and prove the scrub on the fixture: every path form replaced, nothing else changed.",
            "ref": "architecture.md#61-toolchain",
            "excerpt": {
              "ref": "architecture.md#61-toolchain",
              "heading": "6.1 Toolchain",
              "paragraph": "git stays at 2.55.0.windows.5. The toolchain unit records `git --version` and stops if it differs: git 2.56 exists, and the procedures were verified against 2.55. Python 3.14.7, pip 26.2.1 and gh 2.100.0 are recorded too; a different Python minor or gh major stops. · git-filter-repo 2.47.0 comes from PyPI into the user scheme, hash-pinned (`--require-hashes --only-binary=:all: --no-deps`) (findings 1 §6.1, §6.2). · It is verified by two independent values, the `--version` blob-id prefix and the module's sha256, both equal to the upstream tag's script. · A throwaway fixture run confirms, on …",
              "hash": "cd517bc81caf"
            }
          },
          {
            "text": "Take a mirror and an untouched backup of each repository, recording its `ls-remote` listing.",
            "ref": "architecture.md#62-backups-and-manifests",
            "excerpt": {
              "ref": "architecture.md#62-backups-and-manifests",
              "heading": "6.2 Backups and manifests",
              "paragraph": "Each repository gets one `git clone --mirror`, copied at once (`cp -a`) to `WS/backup/<repo>.git` before any other git command runs in it. The clone itself becomes the mirror the rewrite later runs in (findings 1 §6.4).",
              "hash": "bd13807717b1"
            }
          },
          {
            "text": "Copy the legacy data from its three sources byte-exactly and mark it verified.",
            "ref": "architecture.md#63-legacy-data-copy",
            "excerpt": {
              "ref": "architecture.md#63-legacy-data-copy",
              "heading": "6.3 Legacy data copy",
              "paragraph": "Before any rewrite, the data is copied from the backup mirrors:",
              "hash": "26538322410d"
            }
          },
          {
            "text": "Derive the manifests, expectation rows and positive-control scans of the five static repositories.",
            "ref": "architecture.md#62-backups-and-manifests",
            "excerpt": {
              "ref": "architecture.md#62-backups-and-manifests",
              "heading": "6.2 Backups and manifests",
              "paragraph": "Each repository gets one `git clone --mirror`, copied at once (`cp -a`) to `WS/backup/<repo>.git` before any other git command runs in it. The clone itself becomes the mirror the rewrite later runs in (findings 1 §6.4).",
              "hash": "bd13807717b1"
            }
          },
          {
            "text": "Starts first, blocked by no other unit, and lands on the pre-rewrite repository.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "5d4b31d65eb6"
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
      "system": "kotlinbottools",
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
              "paragraph": "Two throwaway repositories, `phase0-rehearsal-a` (the source, public) and `phase0-rehearsal-b` (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "07fbdf11fac6"
            }
          },
          {
            "text": "Walk the numbers in order, transferring each issue and reproducing the pull request by a closed placeholder, and re-create every dropped link.",
            "ref": "architecture.md#72-the-rehearsal",
            "excerpt": {
              "ref": "architecture.md#72-the-rehearsal",
              "heading": "7.2 The rehearsal",
              "paragraph": "Two throwaway repositories, `phase0-rehearsal-a` (the source, public) and `phase0-rehearsal-b` (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "07fbdf11fac6"
            }
          },
          {
            "text": "Rehearse the rename swap on the same pair and read the ids back at each name.",
            "ref": "architecture.md#72-the-rehearsal",
            "excerpt": {
              "ref": "architecture.md#72-the-rehearsal",
              "heading": "7.2 The rehearsal",
              "paragraph": "Two throwaway repositories, `phase0-rehearsal-a` (the source, public) and `phase0-rehearsal-b` (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "07fbdf11fac6"
            }
          },
          {
            "text": "Pass only when every item is on its number, every link is present and the renames resolve by id; both repositories stay, private and archived.",
            "ref": "architecture.md#72-the-rehearsal",
            "excerpt": {
              "ref": "architecture.md#72-the-rehearsal",
              "heading": "7.2 The rehearsal",
              "paragraph": "Two throwaway repositories, `phase0-rehearsal-a` (the source, public) and `phase0-rehearsal-b` (the target, private and empty), prove the transfer mechanics on the shapes the real walk meets.",
              "hash": "07fbdf11fac6"
            }
          },
          {
            "text": "Starts once unit 1 has landed, and lands on the pre-rewrite repository.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "5d4b31d65eb6"
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
      "system": "kotlinbottools",
      "where": "KotlinBottools, a fresh repository and `KotlinBottools-legacy` · this working directory",
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
          "name": "Rewrite in a mirror, push to a fresh repository, reproduce every number, rename the old one to `KotlinBottools-legacy` and realign this clone in place",
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
          "why": "GKB2, GKB and BotTools are public already, and TrumpBot and Support stay private; only KotlinBottools becomes newly public.",
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
              "hash": "bff49c000f41"
            }
          },
          {
            "text": "In the same rewrite, replace the machine-local folder paths and account-name paths in every file of every commit and in every commit message, proved by the scrub's before-counts, its fidelity check and a zero count on every ref.",
            "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
            "excerpt": {
              "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
              "heading": "6.4 The rewrite pipeline (per repository)",
              "paragraph": "The same pipeline serves all six repositories. KotlinBottools differs in three ways: its push target (§7), the path scrub that runs in the same invocation, and the privacy gate that runs before its push. Each stage is a gate. A failure stops the repository before its push and discards its mirror; the backup stays.",
              "hash": "bff49c000f41"
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
            "text": "Rename the old repository to `KotlinBottools-legacy` and archive it, then give the fresh one the name, verified by id.",
            "ref": "architecture.md#75-renames-archive-visibility-scanning",
            "excerpt": {
              "ref": "architecture.md#75-renames-archive-visibility-scanning",
              "heading": "7.5 Renames, archive, visibility, scanning",
              "paragraph": "The renames:",
              "hash": "765b48b8c136"
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
              "hash": "5d4b31d65eb6"
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
        "summary": "Built and landed: the history purged and scrubbed in one rewrite, 87 commits to 85; KotlinBottools is now a fresh private repository holding the rewritten history and every number, 1 to 31, with all 91 links kept by the transfers; the pre-rewrite repository is `KotlinBottools-legacy`, private and archived, which ended its public window on 2026-11-11; and this working directory is realigned, its old objects deleted with nothing deferred. Thirteen tools were corrected during the run, the accepted pre-rewrite ids are 26 occurrences of 3 distinct ids, and a default-rule finding of gitleaks in one kept file holds the publication unit's change to public."
      }
    },
    {
      "id": "repository-hygiene",
      "group": "KotlinBottools",
      "name": "Repository hygiene",
      "system": "kotlinbottools",
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
              "hash": "5d4b31d65eb6"
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
      "system": "kotlinbottools",
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
              "hash": "765b48b8c136"
            }
          },
          {
            "text": "Measure anonymously that no old id resolves, check the access, and confirm the secret scan green on `main`.",
            "ref": "architecture.md#66-residual-exposure-measurement",
            "excerpt": {
              "ref": "architecture.md#66-residual-exposure-measurement",
              "heading": "6.6 Residual-exposure measurement",
              "paragraph": "Each repository is measured after its push, with inputs from `DATA/rewrite/<repo>/` and the backup (findings 3 §6.3). Every result is a tally; no id or body is printed.",
              "hash": "92da9a9547a1"
            }
          },
          {
            "text": "Starts once unit 4 has landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "5d4b31d65eb6"
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
      "system": "kotlinbottools",
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
        "live": {
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
          "waitingOn": null,
          "resume": null,
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
          "status": "building",
          "branch": "chore/issue-26-rewrite-gkb2-and-gkb",
          "event": {
            "name": "document",
            "at": "2026-11-13T09:34:35Z",
            "note": "6 of 6 tasks done"
          },
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
          "rowNames": {
            "inputs-unchanged": "The preparation unit's mirrors, backups and expectation rows, checked unchanged",
            "gkb2-purge": "GKB2: the purge, with the pipeline's checks before and after",
            "gkb-purge": "GKB: the purge, with the pipeline's checks before and after",
            "force-push": "Each rewritten mirror force-pushed, then verified ref by ref",
            "exit-tests": "A fresh mirror of each repository and its exit tests",
            "default-rule-findings": "A gitleaks default-rule finding in a kept file",
            "residual-probes": "What GitHub still serves of the old histories, GKB2's pull-request residual included",
            "tools-handed-on": "The workspace tools as the earlier units left them"
          },
          "recon": {
            "interview": {
              "reconstructed": true,
              "ended": null,
              "trail": [],
              "milestones": []
            }
          }
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
              "hash": "bff49c000f41"
            }
          },
          {
            "text": "Measure and record GKB2's pull-request residual.",
            "ref": "architecture.md#66-residual-exposure-measurement",
            "excerpt": {
              "ref": "architecture.md#66-residual-exposure-measurement",
              "heading": "6.6 Residual-exposure measurement",
              "paragraph": "Each repository is measured after its push, with inputs from `DATA/rewrite/<repo>/` and the backup (findings 3 §6.3). Every result is a tally; no id or body is printed.",
              "hash": "92da9a9547a1"
            }
          },
          {
            "text": "Starts once unit 3 has landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "5d4b31d65eb6"
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
        "state": "pending",
        "summary": "Filed as #26; its run started on 2026-11-13 from `main` at 96eba22 and carried the unit out: GKB2, then GKB, rewritten, each `master` force-pushed once under a lease on its recorded tip and verified ref by ref, and both fresh mirrors clean on their branches and tags. GitHub still serves every old id the unit probed, and GKB2's pull-request ref keeps 70 of its 81 purged blobs reachable, as predicted. It has not landed yet; unit 7 starts after it.",
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
      "id": "bottools-trumpbot-support-rewrite",
      "group": "Legacy repositories",
      "name": "Rewrite BotTools, TrumpBot and Support",
      "system": "kotlinbottools",
      "where": "BotTools, public · TrumpBot and Support, private · the TrumpBot clone",
      "unit": {
        "n": 7,
        "slug": "bottools-trumpbot-support-rewrite",
        "title": "Phase 0 · 7 — Rewrite BotTools, TrumpBot and Support, and replace the TrumpBot clone",
        "blockedBy": [
          26
        ],
        "issue": 27
      },
      "gap": {
        "kind": "risk",
        "summary": "BotTools, TrumpBot and Support still carry purged paths in their histories. BotTools holds 39 purged blobs, all reachable through its pull-request refs; TrumpBot 199 and Support 7,259. The local TrumpBot clone holds the old history.",
        "evidence": [
          "`architecture.md:175` — BotTools: public, 39 purged blobs, all reachable through its pull-request refs",
          "`architecture.md:176` — TrumpBot: private, 199 purged blobs",
          "`architecture.md:177` — Support: private, 7,259 purged blobs",
          "`architecture.md:224` — the local TrumpBot clone"
        ],
        "source": "architecture.md §2.1, §2.2",
        "link": "architecture.md#21-the-six-repositories"
      },
      "options": [
        {
          "id": "pipeline-then-clone",
          "name": "The same pipeline for BotTools, TrumpBot and Support, then the TrumpBot clone replaced at the same path",
          "verdict": "accepted",
          "why": "Each repository stops on its own gate, and the TrumpBot clone is replaced only once TrumpBot's push is proven, its untracked files kept.",
          "source": "architecture.md §6.4, §9.5",
          "link": "architecture.md#95-the-trumpbot-clone"
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
            "text": "Run the full pipeline for BotTools, TrumpBot and Support, in that order.",
            "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
            "excerpt": {
              "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
              "heading": "6.4 The rewrite pipeline (per repository)",
              "paragraph": "The same pipeline serves all six repositories. KotlinBottools differs in three ways: its push target (§7), the path scrub that runs in the same invocation, and the privacy gate that runs before its push. Each stage is a gate. A failure stops the repository before its push and discards its mirror; the backup stays.",
              "hash": "bff49c000f41"
            }
          },
          {
            "text": "Measure and record BotTools' pull-request residual.",
            "ref": "architecture.md#66-residual-exposure-measurement",
            "excerpt": {
              "ref": "architecture.md#66-residual-exposure-measurement",
              "heading": "6.6 Residual-exposure measurement",
              "paragraph": "Each repository is measured after its push, with inputs from `DATA/rewrite/<repo>/` and the backup (findings 3 §6.3). Every result is a tally; no id or body is printed.",
              "hash": "92da9a9547a1"
            }
          },
          {
            "text": "Replace the TrumpBot clone with a fresh one at the same path, restoring its untracked files, the old clone deleted last.",
            "ref": "architecture.md#95-the-trumpbot-clone",
            "excerpt": {
              "ref": "architecture.md#95-the-trumpbot-clone",
              "heading": "9.5 The TrumpBot clone",
              "paragraph": "The TrumpBot clone is replaced once TrumpBot's push is proven, as the last step of unit 7. It is carried out on request (§11), with the procedure from the unit's plan (findings 4 §6.5):",
              "hash": "ed09c31d423b"
            }
          },
          {
            "text": "Starts once unit 6 has landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "5d4b31d65eb6"
            }
          }
        ],
        "tests": [
          "Each repository's exit tests on a fresh mirror; the clone's untracked set, refs, pack count, `fsck` and the \"all missing\" proofs"
        ],
        "risks": [
          "A scan or rewrite of TrumpBot or Support outgrows one run; the unit's plan splits it across stages"
        ],
        "source": "architecture.md §15 unit 7",
        "link": "architecture.md#15-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #27; its run has not started. It starts after unit 6."
      }
    },
    {
      "id": "residual-report-and-cleanup",
      "group": "Report and cleanup",
      "name": "Residual report and cleanup",
      "system": "kotlinbottools",
      "where": "the report on #2 · the workspace and the data folder",
      "unit": {
        "n": 8,
        "slug": "residual-report-and-cleanup",
        "title": "Phase 0 · 8 — Residual-exposure report and workspace cleanup",
        "blockedBy": [
          25,
          27
        ],
        "issue": 28
      },
      "gap": {
        "kind": "missing",
        "summary": "No record says what GitHub still serves of the old histories. The phase requires the residual exposure measured and reported rather than assumed away, and its workspace holds a copy of everything the rewrite removes for as long as the units take.",
        "evidence": [
          "`architecture.md:106` — the residual exposure is measured and reported, not assumed away",
          "`architecture.md:680` — the expected pull-request residual: 70 of 81 for GKB2, 39 of 39 for BotTools",
          "`architecture.md:1330` — the workspace holds the old objects until the last unit deletes it"
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
              "hash": "c364e8c63ba3"
            }
          },
          {
            "text": "Confirm the follow-ups: the rehearsal repositories, any deferred object deletion, any token-rule gap and any default-rule finding.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "5d4b31d65eb6"
            }
          },
          {
            "text": "Re-verify the data, copy the tools to the data folder and delete the workspace, confirming its deletion.",
            "ref": "architecture.md#67-cleanup",
            "excerpt": {
              "ref": "architecture.md#67-cleanup",
              "heading": "6.7 Cleanup",
              "paragraph": "Cleanup runs in this order:",
              "hash": "40782d337e89"
            }
          },
          {
            "text": "Starts once units 5 and 7 have landed.",
            "ref": "architecture.md#15-decomposition",
            "excerpt": {
              "ref": "architecture.md#15-decomposition",
              "heading": "15. Decomposition",
              "paragraph": "Each unit is a sub-issue of #2, planned and carried out by its own run in this working tree, and landing through its own pull request. Each unit's GitHub writes are requested (§11). The columns:",
              "hash": "5d4b31d65eb6"
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
        "state": "pending",
        "summary": "Filed as #28; its run has not started. It starts after units 5 and 7, and its landing closes #2."
      }
    }
  ],
  "impact": {
    "basis": "plan",
    "summary": "No module is published and no version moves. Every commit id changes in all six repositories: GKB2, GKB, BotTools, TrumpBot and Support are force-pushed in place, and KotlinBottools becomes public as a fresh repository with every number reproduced, the pre-rewrite repository kept private and archived as `KotlinBottools-legacy`. On `main`, the path scrub replaces the machine-local paths in two KotlinBottools source files, and the rest is repository infrastructure.",
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
        "summary": "Every commit id changes, as each root commit holds a purged path; ten commits are pruned and every branch survives. Pre-rewrite ids already cited stay as dated citations that resolve only in the private legacy repository. KotlinBottools has been public since 2026-11-08, so its pre-rewrite objects stay anonymously readable until the swap, a window the residual report states.",
        "link": "consequences.md#21-the-six-repositories"
      },
      {
        "who": "KotlinBottools' commit content",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "Every file and commit message that names a machine-local path is rewritten: the project-checkouts folder becomes `%PROJECTS%` and a user-profile folder `%USERPROFILE%`. On `main` that changes the local Maven repository line of `build.gradle.kts`, which resolved only on this machine, and a commented-out line of `GuildDataParser.kt`; the legacy repository keeps the original text, and the other five repositories are not scrubbed.",
        "link": "consequences.md#1-published-artifacts"
      },
      {
        "who": "KotlinBottools on GitHub",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "The public `KotlinBottools` is a new repository with a new id and the old settings and access; stars and watchers start empty. Until the swap the pre-rewrite repository stays public under its current name; the swap makes it private between its rename and its archiving, and `KotlinBottools-legacy` keeps the pre-rewrite history, its pull requests, milestone and labels, private and archived.",
        "link": "consequences.md#22-kotlinbottools-the-public-repository-and-the-legacy-repository"
      },
      {
        "who": "Issue numbers, links and citations",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "Every number is reproduced, pull requests by closed placeholders, and dropped relationships are re-created, so citations keep resolving. A transfer rewrites the references in the moved text to full names: after the walk they name `KotlinBottools-next` for the issues that moved, which keep resolving through the rename's redirect while no repository takes that name. The 56 links that name the planning branch stop resolving when it is deleted and are pointed at `main`.",
        "link": "consequences.md#23-issue-numbers-and-links"
      },
      {
        "who": "GKB2, GKB, BotTools, TrumpBot and Support",
        "kind": "repository",
        "system": null,
        "effect": "behaviour",
        "summary": "Force-pushed in place with their visibility unchanged. GitHub keeps serving their old objects by id, and GKB2's and BotTools' pull-request refs keep old history fetchable; for the three public ones that exposure is not new.",
        "link": "consequences.md#21-the-six-repositories"
      },
      {
        "who": "MagicBot and WebTools",
        "kind": "repository",
        "system": null,
        "effect": "none",
        "summary": "No code or document changes. Their relationships to KotlinBottools issues are re-created where the walk drops them and their planning-branch links repointed; MagicBot issue 2 gets a comment on its secret-scan configuration.",
        "link": "consequences.md#24-other-repositories-in-the-organisation"
      },
      {
        "who": "Two rehearsal repositories",
        "kind": "repository",
        "system": null,
        "effect": "additive",
        "summary": "`phase0-rehearsal-a-legacy` and `phase0-rehearsal-a` remain, private and archived.",
        "link": "consequences.md#24-other-repositories-in-the-organisation"
      },
      {
        "who": "This machine",
        "kind": "operator",
        "system": null,
        "effect": "behaviour",
        "summary": "The data folder remains with the legacy data and records; the workspace is deleted. This working directory is realigned in place, 41 tracked files leaving its tree, and the TrumpBot clone is replaced; git-filter-repo stays installed.",
        "link": "consequences.md#25-this-machine"
      }
    ],
    "adaptation": [
      {
        "who": "Phase 1",
        "system": null,
        "need": "required",
        "summary": "Starts from the rewritten `main` of the fresh repository, extends the new `CHANGELOG.md` and adds its `ci.yml` as a second workflow with its own name, job id and concurrency group.",
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
        "summary": "Archives the five predecessor repositories on top of their purged histories.",
        "link": "consequences.md#3-adoption"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md",
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
            "why": "Only `gkb2-gkb-rewrite` and `bottools-trumpbot-support-rewrite` consume the backups, manifests and expectation rows the planned entry named for all four.",
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
        "summary": "No module was published and no version moved; the landing changed documents and generated boards only. KotlinBottools is a fresh private repository holding the rewritten history and every number, the pre-rewrite repository is `KotlinBottools-legacy`, private and archived, which ended its public window, and this working directory is realigned with its old objects deleted. The moved issue texts, and MagicBot's and WebTools' issue texts the transfers rewrote, name `KotlinBottools-next`, so that name stays reserved; public links to KotlinBottools issues answer \"not found\" until the publication unit, whose change to public also waits on a default-rule finding in one kept file.",
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
        "basis": "plan",
        "summary": "No module is published and no version moves; the landing carries documents and generated boards only. `master` of GKB2 and of GKB is replaced by its rewritten history through one push of that ref, made only while the branch is at its recorded tip; both stay public, GitHub keeps serving the old objects, and GKB2's pull-request ref keeps its old history fetchable. #27 takes the corrected runner, the tools with their parameter table and the lease push, and #28 the two report rows with GKB2's residual.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "26-gkb2-gkb-rewrite/consequences.md §1 to §6; 26-gkb2-gkb-rewrite/plan.md",
        "link": "26-gkb2-gkb-rewrite/consequences.md#2-blast-radius"
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
      "note": "Rotate the 2023 session cookie and TrumpBot's private key if either could still be live."
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
      }
    ]
  },
  "links": {
    "workBoard": "../../index.html",
    "repoBoard": "../../../dashboards/index.html"
  }
}
);
