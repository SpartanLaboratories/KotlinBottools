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
    "updated": "2026-11-11T18:54:18Z",
    "detail": "3 of 8 units landed; #24 in progress; #25 up next.",
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
      "repository-hygiene.built"
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
    "next": "kotlinbottools-publish",
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
              "hash": "9bb2a18d3c1b"
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
              "hash": "9bb2a18d3c1b"
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
              "hash": "f579c5d6d5f8"
            }
          },
          {
            "text": "In the same rewrite, replace the machine-local folder paths and account-name paths in every file of every commit and in every commit message, proved by the scrub's before-counts, its fidelity check and a zero count on every ref.",
            "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
            "excerpt": {
              "ref": "architecture.md#64-the-rewrite-pipeline-per-repository",
              "heading": "6.4 The rewrite pipeline (per repository)",
              "paragraph": "The same pipeline serves all six repositories. KotlinBottools differs in three ways: its push target (§7), the path scrub that runs in the same invocation, and the privacy gate that runs before its push. Each stage is a gate. A failure stops the repository before its push and discards its mirror; the backup stays.",
              "hash": "f579c5d6d5f8"
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
              "hash": "54b888b5aa08"
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
              "hash": "9bb2a18d3c1b"
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
        "live": {
          "step": "document",
          "since": "2026-11-12T02:10:54Z",
          "updated": "2026-11-12T03:59:05Z",
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
              "note": "The code check found nothing: the seven files hold the plan's recorded bytes, and the code finding of Quality Review 2 is answered: evaluated against the rule and the table themselves, the committed table fails none of the controls' eleven expectations, and each of the four de-anchorings of the pinned text fails exactly its own fixture in both modes. All 334 checks passed (local checks 130, scans 199, privacy gate 5), and 13 of Quality Review 2's 15 findings are answered in full. 7 findings remain, all minor test findings, each an edit to the plan's procedure or its wording and none to the seven files: one call at the end of the canary step leaves its standard error unasserted; in two places the verdict is asserted before the shape check; one case is filed under the component row of the test levels though it runs git; three failing-side cases lack a shape and standard-error value; the 22 control lines and the controls each mutation turns are asserted as counts only, and reading the document from the last commit has no case; three more uncaught exits of the scan wrapper have no case; and the generated word's form and two helpers have no check of their own. They touch the checks before the landing, the allowlist controls, and the scan wrapper with its workflow. They are fixed on the spot and the steps they touch run again; no further review follows."
            }
          ],
          "qaMax": 3,
          "status": "building",
          "branch": "chore/issue-24-repository-hygiene",
          "event": {
            "name": "document",
            "at": "2026-11-12T03:59:05Z",
            "note": "6 of 6 tasks done"
          },
          "asked": [
            {
              "step": "plan",
              "text": "How is the curl-auth-user finding handled so the secret-scan workflow can pass?",
              "options": [
                "A (recommended): one scoped allowlist table in .gitleaks.toml, limited to the rule, the one research document and the exact command-substitution text",
                "A': the same, scoped to the rule and the one file only, with no exact text pinned",
                "B: the wrapper and the workflow tolerate default-rule findings and fail only on the custom rules and private-key",
                "C: keep the configuration as designed and merge with the run red; the finding is judged later, before the visibility change",
                "D: a commit-scoped entry for the two commits that carry the line, plus rewording the line on main"
              ],
              "answer": null,
              "asked": "2026-11-11T19:12:25Z",
              "answered": "2026-11-11T19:20:17Z"
            },
            {
              "step": "plan",
              "text": "If the configuration changes: does the workspace copy of gitleaks.toml follow the committed file?",
              "options": [
                "a (recommended): it follows; the workspace copy is replaced by the committed bytes at this unit's landing, with the new size and sha256 recorded",
                "b: it stays at the research bytes; the committed file then differs by exactly one table"
              ],
              "answer": null,
              "asked": "2026-11-11T19:12:25Z",
              "answered": "2026-11-11T19:20:17Z"
            },
            {
              "step": "remediation",
              "text": "Where do the scoped allowlist table's negative controls live?",
              "options": [
                "1: record both findings as known gaps in consequences.md; no new file and no change to the six files; the controls stay in the plan's procedure and are repeated by hand whenever the table, the rule set or the gitleaks pin changes",
                "2: a committed controls script (.github/scripts/allowlist_controls.py), run locally only; a seventh file, the workflow unchanged, CHANGELOG.md gains a line; the Linux observation stays a recorded gap",
                "3 (recommended): the same script, also run by the workflow after the canary on every push and pull request; the workflow no longer equals the research text and takes new recorded bytes and an extended dated note on architecture section 10; the first hosted run proves the controls on Linux"
              ],
              "answer": null,
              "asked": "2026-11-11T20:52:29Z",
              "answered": "2026-11-11T21:21:39Z"
            },
            {
              "step": "document",
              "text": "The header of .gitleaks.toml does not say that the allowlist table and the controls script change together. Is that fixed in this change?",
              "options": [
                "Fix it now, with a note that a directory scan must run from the repository root: .gitleaks.toml takes new recorded bytes, the plan's records and the workspace copy's expected values change, and the checks run again",
                "Record it as a follow-up in consequences.md; the rule stays documented in the plan documents only"
              ],
              "answer": null,
              "asked": "2026-11-12T01:59:34Z",
              "answered": "2026-11-12T02:10:54Z"
            },
            {
              "step": "document",
              "text": "Eight further improvements are comments or wording in the other byte-pinned files (the scan wrapper, the controls script, the workflow, .gitignore, CHANGELOG.md). Are they made in this change?",
              "options": [
                "Record them as follow-ups in consequences.md, for a later comment-only change",
                "Make them all now: five files take new bytes, the scan wrapper stops matching the workspace copy and the research text (a change to the phase design), the plan is revised again and every stage is run again",
                "Make them now in every file except the scan wrapper, which stays byte-identical; its comments are recorded as a follow-up"
              ],
              "answer": null,
              "asked": "2026-11-12T01:59:34Z",
              "answered": "2026-11-12T02:10:54Z"
            }
          ],
          "plan": {
            "state": "re-pass",
            "from": "qa",
            "pass": 2,
            "since": "2026-11-11T22:22:42Z"
          },
          "stages": [
            {
              "id": "S1",
              "name": "Baseline",
              "state": "done",
              "rows": [
                "landing-checks"
              ],
              "brief": "The branch, the paths of the change set on `main`, the workspace tools and the repository's settings are as recorded, and the scans of the branch with the workspace configuration report only the one known finding",
              "kind": "check",
              "steps": [
                {
                  "id": "branch",
                  "name": "The branch and the paths of the change set"
                },
                {
                  "id": "helpers",
                  "name": "The scratch helpers"
                },
                {
                  "id": "tools",
                  "name": "The workspace tools"
                },
                {
                  "id": "github",
                  "name": "The repository's settings and branches"
                },
                {
                  "id": "before",
                  "name": "The scans before the change"
                }
              ],
              "ref": "plan.md#s1--baseline",
              "started": "2026-11-11T20:20:36Z",
              "finished": "2026-11-12T01:44:46Z",
              "report": "The steps the fixes touch ran with no stop; nothing is committed and the seven files are unchanged at their recorded bytes, so the stage that writes them was not run again. S1 Baseline: helpers 8 of 8 and the before-scans 13 of 13, ended 01:23:35Z. S3 Local checks: 130 of 130, ended 01:26:15Z. S4 Scans: 222 of 222, ended 01:41:26Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice, its last call's output in fixed shapes; CONTROLS OK three times, the run from a bare clone among them, with the 22 control lines as expected in order; the nine failure paths of the controls each end in CONTROLS FAILED; all ten mutated tables fail the controls at their counts and turn exactly the controls the plan names; thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answer as designed; every shell block of the workflow passes and stops as designed; the log filter reads its four samples as recorded. S5 Privacy gate: selftest 50 checks, 0 blocking hits, ended 01:42:58Z. No deviation. No bytecode file under .github/.",
              "result": "passed"
            },
            {
              "id": "S2",
              "name": "The seven files",
              "state": "done",
              "rows": [
                "gitignore",
                "gitleaks-config",
                "secret-scan-workflow",
                "allowlist-controls",
                "readme-correction",
                "changelog"
              ],
              "brief": "The seven files are written from their sources, each with its recorded size, sha256 and blob id",
              "kind": "work",
              "steps": [
                {
                  "id": "ignore",
                  "name": "The .gitignore"
                },
                {
                  "id": "config",
                  "name": "The .gitleaks.toml"
                },
                {
                  "id": "wrapper",
                  "name": "The scan wrapper"
                },
                {
                  "id": "controls",
                  "name": "The allowlist controls"
                },
                {
                  "id": "workflow",
                  "name": "The workflow with its controls step"
                },
                {
                  "id": "readme",
                  "name": "The README correction"
                },
                {
                  "id": "changelog",
                  "name": "The CHANGELOG"
                }
              ],
              "ref": "plan.md#s2--the-seven-files",
              "finished": "2026-11-11T23:59:45Z",
              "report": "All five stages of the plan's second revision ran in full with no stop; nothing is committed. S1 Baseline: 36 of 36 checks, ended 23:38:38Z. S2 The seven files: 11 of 11, ended 23:39:39Z; the controls script is now 8482 bytes at its recorded sha256 and blob id, and the other six files were rewritten to the same bytes. S3 Local checks: 130 of 130, ended 23:41:52Z; 48 paths ignored and 32 not ignored; no bytecode file appeared under .github/. S4 Scans: 199 of 199, ended 23:56:31Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice; CONTROLS OK twice with 22 controls each; nine failure paths of the controls script each end in CONTROLS FAILED with status 2; ten mutated tables each fail the controls with the recorded count (18, 7, 22, 8, 10, 2, 2, 2, 2, 6), both de-anchorings of the pinned text among them; thirteen GATE FAILED conditions of the scan wrapper each with status 2; every shell block of the workflow passes and stops as designed; the filter for the hosted logs reads its samples as 6 62 0, 6 63 1, 5 39 0 and 6 62 0. S5 Privacy gate: its selftest passes 50 checks and the gate reports 0 blocking hits, ended 23:58:02Z. No deviation from the revised plan."
            },
            {
              "id": "S3",
              "name": "Local checks",
              "state": "done",
              "rows": [
                "landing-checks",
                "allowlist-controls",
                "secret-scan-workflow"
              ],
              "brief": "The seven files match their recorded bytes and sources, the configuration and both Python files parse, the pure parts give their recorded results, the workflow's shell blocks parse and its settings and pins hold, the ignore list behaves as designed and no file holds both PEM markers",
              "kind": "check",
              "steps": [
                {
                  "id": "bytes",
                  "name": "Sizes, hashes and blob ids"
                },
                {
                  "id": "sources",
                  "name": "The sources, the workspace wrapper and the README's list"
                },
                {
                  "id": "toml",
                  "name": "The configuration parses"
                },
                {
                  "id": "python",
                  "name": "The Python files and their pure parts"
                },
                {
                  "id": "workflow",
                  "name": "The workflow's shell, settings and pins"
                },
                {
                  "id": "ignore-list",
                  "name": "The ignore-list tests"
                },
                {
                  "id": "pem",
                  "name": "No file holds both PEM markers"
                }
              ],
              "ref": "plan.md#s3--local-checks",
              "finished": "2026-11-12T01:44:46Z",
              "report": "The steps the fixes touch ran with no stop; nothing is committed and the seven files are unchanged at their recorded bytes, so the stage that writes them was not run again. S1 Baseline: helpers 8 of 8 and the before-scans 13 of 13, ended 01:23:35Z. S3 Local checks: 130 of 130, ended 01:26:15Z. S4 Scans: 222 of 222, ended 01:41:26Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice, its last call's output in fixed shapes; CONTROLS OK three times, the run from a bare clone among them, with the 22 control lines as expected in order; the nine failure paths of the controls each end in CONTROLS FAILED; all ten mutated tables fail the controls at their counts and turn exactly the controls the plan names; thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answer as designed; every shell block of the workflow passes and stops as designed; the log filter reads its four samples as recorded. S5 Privacy gate: selftest 50 checks, 0 blocking hits, ended 01:42:58Z. No deviation. No bytecode file under .github/.",
              "result": "passed"
            },
            {
              "id": "S4",
              "name": "Scans",
              "state": "done",
              "rows": [
                "landing-checks",
                "allowlist-controls",
                "secret-scan-workflow"
              ],
              "brief": "The history and the tree of the change set scan clean with the committed configuration, the canary shows the rules fire, the allowlist controls pass and fail on each mutation of the table, the controls' and the scan wrapper's failure paths answer as designed, the workflow's shell blocks pass and stop as designed, and the filter for the hosted logs reads their form",
              "kind": "check",
              "steps": [
                {
                  "id": "clone",
                  "name": "The scratch clone of the change set"
                },
                {
                  "id": "scans",
                  "name": "History and tree"
                },
                {
                  "id": "canary",
                  "name": "The canary"
                },
                {
                  "id": "controls",
                  "name": "The allowlist controls and their failure paths"
                },
                {
                  "id": "mutations",
                  "name": "The table's mutations"
                },
                {
                  "id": "negatives",
                  "name": "The wrapper's failure paths"
                },
                {
                  "id": "workflow-run",
                  "name": "The workflow's shell blocks, run on both sides"
                },
                {
                  "id": "log-filter",
                  "name": "The filter for the hosted logs"
                }
              ],
              "ref": "plan.md#s4--scans",
              "finished": "2026-11-12T01:44:46Z",
              "report": "The steps the fixes touch ran with no stop; nothing is committed and the seven files are unchanged at their recorded bytes, so the stage that writes them was not run again. S1 Baseline: helpers 8 of 8 and the before-scans 13 of 13, ended 01:23:35Z. S3 Local checks: 130 of 130, ended 01:26:15Z. S4 Scans: 222 of 222, ended 01:41:26Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice, its last call's output in fixed shapes; CONTROLS OK three times, the run from a bare clone among them, with the 22 control lines as expected in order; the nine failure paths of the controls each end in CONTROLS FAILED; all ten mutated tables fail the controls at their counts and turn exactly the controls the plan names; thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answer as designed; every shell block of the workflow passes and stops as designed; the log filter reads its four samples as recorded. S5 Privacy gate: selftest 50 checks, 0 blocking hits, ended 01:42:58Z. No deviation. No bytecode file under .github/.",
              "result": "passed"
            },
            {
              "id": "S5",
              "name": "Privacy gate",
              "state": "done",
              "rows": [
                "landing-checks"
              ],
              "brief": "The privacy gate over the change set reports no blocking hit",
              "kind": "check",
              "steps": [
                {
                  "id": "gate",
                  "name": "The gate over the scratch clone"
                }
              ],
              "ref": "plan.md#s5--privacy-gate",
              "finished": "2026-11-12T01:44:46Z",
              "report": "The steps the fixes touch ran with no stop; nothing is committed and the seven files are unchanged at their recorded bytes, so the stage that writes them was not run again. S1 Baseline: helpers 8 of 8 and the before-scans 13 of 13, ended 01:23:35Z. S3 Local checks: 130 of 130, ended 01:26:15Z. S4 Scans: 222 of 222, ended 01:41:26Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice, its last call's output in fixed shapes; CONTROLS OK three times, the run from a bare clone among them, with the 22 control lines as expected in order; the nine failure paths of the controls each end in CONTROLS FAILED; all ten mutated tables fail the controls at their counts and turn exactly the controls the plan names; thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answer as designed; every shell block of the workflow passes and stops as designed; the log filter reads its four samples as recorded. S5 Privacy gate: selftest 50 checks, 0 blocking hits, ended 01:42:58Z. No deviation. No bytecode file under .github/.",
              "result": "passed"
            }
          ],
          "remediation": {
            "pass": 3,
            "route": "on-the-spot",
            "steps": [
              {
                "name": "Apply the seven minor fixes to the plan's checks",
                "state": "done",
                "started": "2026-11-12T00:38:33Z",
                "finished": "2026-11-12T01:20:33Z",
                "report": "The seven minor fixes are applied to the plan's checks in place; the design and the seven files' recorded bytes are unchanged, so the stage that writes the files is not run again. The canary's last call has its output and standard error asserted; the shape check runs before every verdict; the commit-count case is filed under the integration row; the failing-side cases assert shape and standard error; the 22 control lines are asserted in order, each mutation asserts which controls it turns, and a run from a bare clone shows the document is read from the last commit; four more uncaught exits of the scan wrapper have a case; the generated word is asserted as 12 hexadecimal characters over 200 draws, and two more helpers have a check of their own. A convention is added: each block is saved to a file and run from it, because the longest blocks are cut when handed to the shell as one command. Expected checks now: 38 in S1 (helpers 8), 130 in S3, 222 in S4 (canary 21, controls 42, mutations 42, negatives 64). Two possible later changes are recorded in consequences.md, neither planned: the escape of one dot in the table's path pattern, and an ignore pattern for Python bytecode. The baseline's helpers and before-scans, the local checks, the scans and the privacy gate are run again."
              },
              {
                "name": "Run the steps the fixes touch",
                "state": "done",
                "started": "2026-11-12T01:20:33Z",
                "finished": "2026-11-12T01:44:46Z",
                "report": "The steps the fixes touch ran with no stop; nothing is committed and the seven files are unchanged at their recorded bytes, so the stage that writes them was not run again. S1 Baseline: helpers 8 of 8 and the before-scans 13 of 13, ended 01:23:35Z. S3 Local checks: 130 of 130, ended 01:26:15Z. S4 Scans: 222 of 222, ended 01:41:26Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice, its last call's output in fixed shapes; CONTROLS OK three times, the run from a bare clone among them, with the 22 control lines as expected in order; the nine failure paths of the controls each end in CONTROLS FAILED; all ten mutated tables fail the controls at their counts and turn exactly the controls the plan names; thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answer as designed; every shell block of the workflow passes and stops as designed; the log filter reads its four samples as recorded. S5 Privacy gate: selftest 50 checks, 0 blocking hits, ended 01:42:58Z. No deviation. No bytecode file under .github/."
              }
            ]
          },
          "document": {
            "tasks": [
              {
                "id": "documentation-review",
                "name": "Documentation review",
                "state": "done",
                "started": "2026-11-12T01:49:28Z",
                "finished": "2026-11-12T01:59:34Z",
                "report": "The documentation check ended at 01:59:34Z with 13 points: four gaps and nine improvements. Being done now, in one pass over the documents: the header of .gitleaks.toml is specified with its new recorded bytes; the three gaps in the plan documents are corrected; the eight improvements in the other pinned files are recorded as follow-ups; and the plan is reconciled with the build, with the as-built record, the consequences and the dated notes in the earlier units' documents. The corrected configuration is then written and the checks run again, and the documentation is checked a second time."
              },
              {
                "id": "reconcile-documentation",
                "name": "Reconcile documentation",
                "state": "done",
                "started": "2026-11-12T01:59:34Z",
                "finished": "2026-11-12T03:23:04Z",
                "report": "The second documentation check found all 13 earlier points answered or recorded as follow-ups, the two new header sentences of .gitleaks.toml accurate, every recorded value correct, and all 233 relative links and anchors resolving across the 13 files checked, the three superseded copies among them. Three points remained, all in the plan documents and none in the seven files, and are corrected: consequences.md no longer restates what the as-built record says about the seven files and links to it instead; the follow-up on comments now says it also covers the options' help text and the workflow's two error annotations, with the annotations listed under the workflow; and one sentence of the dated note on architecture section 10 is reworded. The plan's list of later changes uses the same wording."
              },
              {
                "id": "reconcile-plan",
                "name": "Reconcile plan",
                "state": "done",
                "started": "2026-11-12T02:10:54Z",
                "finished": "2026-11-12T03:17:00Z",
                "report": "The corrected .gitleaks.toml is committed and pushed; the branch head, 0b64c47, is the commit the code lands at. The file is 3824 bytes at its recorded blob id; the change is five comment lines and nothing else, and the parsed configuration is unchanged: five rules, one table, no global allowlist. Before the commit the checks were run again over the final documents with no stop: the configuration step 3 of 3 (ended 02:51:22Z); local checks 133 of 133 (ended 02:53:57Z); scans 222 of 222 (ended 03:11:13Z), with the history (97 commits, both ref sets) and the tree clean, CANARY OK twice, CONTROLS OK three times, all ten mutated tables failing the controls at their recorded counts, thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answering as designed, every shell block of the workflow passing and stopping as designed, and the log filter reading its samples as recorded; privacy gate 0 blocking hits after its 50-check selftest (ended 03:12:56Z). The other six files are unchanged. The as-built record's counts are confirmed by this run, so the plan is reconciled. One sentence of the plan's expected text no longer names a commit count, which grows with the branch. The documentation is being checked a second time; the README and CHANGELOG are being confirmed against the as-built record."
              },
              {
                "id": "readme-changelog",
                "name": "README and CHANGELOG",
                "state": "done",
                "started": "2026-11-12T03:17:00Z",
                "finished": "2026-11-12T03:18:57Z",
                "report": "The README and the CHANGELOG, as committed, hold what the change calls for and take no addition: the README marks the bot's local files and guildData/, lists the files a clone must supply and names the Secret scan workflow and .gitleaks.toml; the CHANGELOG has its entry under Unreleased for the workflow with the scan wrapper, the configuration with its one allowlist entry, the allowlist controls and the root-anchored .gitignore. Both files are at their recorded bytes. The second documentation check is still running, and the state boards are being built."
              },
              {
                "id": "state-boards",
                "name": "State boards",
                "state": "done",
                "started": "2026-11-12T03:19:27Z",
                "finished": "2026-11-12T03:34:49Z"
              },
              {
                "id": "document-landing",
                "name": "Document commit",
                "state": "done",
                "started": "2026-11-12T03:34:49Z",
                "finished": "2026-11-12T03:59:05Z"
              }
            ]
          },
          "open": [
            {
              "text": "The secret scan with the designed configuration reports a default-rule finding (curl-auth-user) in one kept research document, so the workflow cannot pass as designed; the handling needs the maintainer's decision and amends architecture sections 10, 15 and 16.",
              "raised": "halted",
              "ref": "../23-kotlinbottools-rewrite-and-swap/consequences.md",
              "shownOpen": "2026-11-11T19:12:25Z",
              "resolved": "2026-11-11T19:20:17Z"
            },
            {
              "text": "Three places where the plan's prose and its code blocks disagree, none of which changed the result: the README script is described as ASCII but holds seven non-ASCII lines; the canary step's expected text names commit-count lines its commands do not print; the privacy gate's expected text says confirmation lines where the tool prints one. The code blocks were run as written. To be settled when the plan is reconciled with the build.",
              "raised": "implementation-stage S5",
              "ref": "plan.md",
              "shownOpen": "2026-11-11T20:26:39Z",
              "resolved": "2026-11-11T21:46:17Z"
            },
            {
              "text": "A fourth place where the plan's prose and its text disagree: the assumption on the ignore list says the new file drops only four IDE lines and the section comments, while the specified text also narrows three patterns to directory-only form. No practical effect; the file matches the plan's exact text. To be settled when the plan is revised.",
              "raised": "Quality Review 1",
              "ref": "plan.md",
              "shownOpen": "2026-11-11T20:46:16Z",
              "resolved": "2026-11-11T21:46:17Z"
            },
            {
              "text": "The revised plan's expected text for the history scans gives 95 commits as the count when the plan was written; the scans counted 94, the branch's 93 commits plus the one scratch commit. The step asserts only that the two counts are equal and above zero, and it passed. To be corrected when the plan is reconciled with the build.",
              "raised": "implementation-stage S5",
              "ref": "plan.md",
              "shownOpen": "2026-11-11T21:54:56Z",
              "resolved": "2026-11-11T23:34:04Z"
            },
            {
              "text": "The plan's table of stops names only the README script's count as a stop of the stage that writes the seven files; the workflow step of that stage has a script stop of its own, which the error-handling table does list. Wording only; to be corrected when the plan is reconciled with the build.",
              "raised": "implementation-stage S5",
              "ref": "plan.md",
              "shownOpen": "2026-11-11T23:59:45Z",
              "resolved": "2026-11-12T00:51:37Z"
            },
            {
              "text": "The plan's convention on running a block names three blocks as longer than the size at which a command is cut; measured with their prelude, only one of them is (the negatives block). The rule itself, every block run from a saved file, was applied to every block. Wording only; to be corrected when the plan is reconciled with the build.",
              "raised": "implementation-stage S5",
              "ref": "plan.md",
              "shownOpen": "2026-11-12T01:44:46Z",
              "resolved": "2026-11-12T02:30:19Z"
            }
          ],
          "history": {
            "sizing": [
              {
                "since": null,
                "ended": "2026-11-11T18:54:18Z",
                "endedBy": "sized",
                "to": "plan"
              }
            ],
            "plan": [
              {
                "since": "2026-11-11T18:54:18Z",
                "ended": "2026-11-11T19:12:25Z",
                "endedBy": "halted",
                "to": "plan",
                "event": {
                  "name": "sized",
                  "at": "2026-11-11T18:54:18Z"
                },
                "detail": "Unit 4 of the history-rewrite phase: the root-anchored .gitignore, .gitleaks.toml, the secret-scan wrapper and workflow, the README correction and the first CHANGELOG.md, on a branch cut from the rewritten main. No version change. The unit uses the privacy gate as a pre-landing check and does not change it.",
                "plan": {
                  "state": "re-pass",
                  "from": "parent",
                  "since": "2026-11-11T18:54:18Z"
                },
                "held": true,
                "asked": [
                  {
                    "text": "How is the curl-auth-user finding handled so the secret-scan workflow can pass?",
                    "options": [
                      "A (recommended): one scoped allowlist table in .gitleaks.toml, limited to the rule, the one research document and the exact command-substitution text",
                      "A': the same, scoped to the rule and the one file only, with no exact text pinned",
                      "B: the wrapper and the workflow tolerate default-rule findings and fail only on the custom rules and private-key",
                      "C: keep the configuration as designed and merge with the run red; the finding is judged later, before the visibility change",
                      "D: a commit-scoped entry for the two commits that carry the line, plus rewording the line on main"
                    ],
                    "answer": null,
                    "asked": "2026-11-11T19:12:25Z",
                    "answered": "2026-11-11T19:20:17Z"
                  },
                  {
                    "text": "If the configuration changes: does the workspace copy of gitleaks.toml follow the committed file?",
                    "options": [
                      "a (recommended): it follows; the workspace copy is replaced by the committed bytes at this unit's landing, with the new size and sha256 recorded",
                      "b: it stays at the research bytes; the committed file then differs by exactly one table"
                    ],
                    "answer": null,
                    "asked": "2026-11-11T19:12:25Z",
                    "answered": "2026-11-11T19:20:17Z"
                  }
                ]
              },
              {
                "since": "2026-11-11T19:20:17Z",
                "ended": "2026-11-11T19:21:34Z",
                "endedBy": "research-planning",
                "to": "research",
                "event": {
                  "name": "resumed",
                  "at": "2026-11-11T19:20:17Z"
                },
                "detail": "Answers: the finding is handled by one scoped allowlist table in .gitleaks.toml, limited to the curl-auth-user rule, the one research document and the exact command-substitution text, with no global allowlist (option A); and the workspace copy of gitleaks.toml follows the committed file at this unit's landing, with the new size and sha256 recorded (option a). The Phase 0 architecture takes dated callouts on sections 5.2, 10, 15 and 16. Research and the plan continue.",
                "plan": {
                  "state": "re-pass",
                  "from": "parent",
                  "since": "2026-11-11T18:54:18Z"
                }
              },
              {
                "since": "2026-11-11T19:42:46Z",
                "ended": "2026-11-11T20:17:03Z",
                "endedBy": "plan-accepted",
                "to": "branch",
                "event": {
                  "name": "researched",
                  "at": "2026-11-11T19:42:46Z"
                },
                "detail": "Two questions were researched: the workflow on the hosted runner, and the scoped allowlist's semantics at gitleaks 8.30.1. All 42 claims the design rests on hold. With the new configuration the history and the tree scan clean, the canary still fires and the negative controls are still reported. Two points are proved only by the first hosted run: the runner image is moving from Ubuntu 24.04 to 26.04 until 2026-11-19, and the Linux gitleaks binary was not run locally.",
                "plan": {
                  "state": "writing",
                  "since": "2026-11-11T19:42:46Z"
                }
              }
            ],
            "research": [
              {
                "since": "2026-11-11T19:21:34Z",
                "ended": "2026-11-11T19:42:46Z",
                "endedBy": "researched",
                "to": "plan",
                "event": {
                  "name": "verification-started",
                  "at": "2026-11-11T19:39:02Z"
                },
                "detail": "Research: verifying 2 findings.",
                "research": {
                  "phase": "complete",
                  "drafted": 0,
                  "since": {
                    "planning": "2026-11-11T19:21:34Z",
                    "research": "2026-11-11T19:24:02Z",
                    "verification": "2026-11-11T19:39:02Z",
                    "complete": "2026-11-11T19:42:46Z"
                  }
                },
                "questions": [
                  {
                    "question": "workflow-on-the-hosted-runner",
                    "rows": [
                      "secret-scan-workflow",
                      "landing-checks"
                    ],
                    "findings": "research/workflow-on-the-hosted-runner.md",
                    "state": "complete",
                    "started": "2026-11-11T19:24:02Z",
                    "returned": "2026-11-11T19:33:33Z"
                  },
                  {
                    "question": "scoped-allowlist-semantics",
                    "rows": [
                      "gitleaks-config",
                      "landing-checks"
                    ],
                    "findings": "research/scoped-allowlist-semantics.md",
                    "state": "complete",
                    "started": "2026-11-11T19:24:02Z",
                    "returned": "2026-11-11T19:38:27Z"
                  }
                ]
              }
            ],
            "branch": [
              {
                "since": "2026-11-11T20:17:03Z",
                "ended": "2026-11-11T20:20:36Z",
                "endedBy": "branch-cut",
                "to": "implementation",
                "event": {
                  "name": "plan-accepted",
                  "at": "2026-11-11T20:17:03Z"
                },
                "detail": "Six files on this branch: the root-anchored .gitignore; .gitleaks.toml with one allowlist table scoped to the curl-auth-user rule, the one research document and the exact text; the scan wrapper and the workflow, byte-identical to the earlier findings; the README correction; the new CHANGELOG.md. Each file has a recorded size, sha256 and blob id. Five stages: baseline, the six files, local checks, scans, the privacy gate. The change merges only after the workflow's first run on the pull request succeeds; after the merge the workspace copy of the configuration takes main's bytes. The phase architecture carries four dated notes, on sections 5.2, 10, 15 and 16.",
                "branch": "chore/issue-24-repository-hygiene"
              }
            ],
            "implementation": [
              {
                "since": "2026-11-11T20:20:36Z",
                "ended": "2026-11-11T20:27:00Z",
                "endedBy": "qa-pass",
                "to": "qa",
                "event": {
                  "name": "implementation-stage",
                  "at": "2026-11-11T20:26:39Z",
                  "note": "S5 reported done; Quality Review next"
                },
                "detail": "All five stages ran to their last ok line with no stop; nothing is committed. S1 Baseline: 25 of 25 checks, ended 20:21:58Z; the before-scans with the workspace configuration report only the one known finding (history 2, tree 1, rule curl-auth-user, 93 commits). S2 The six files: 8 of 8, ended 20:23:09Z; each file is at its recorded size, sha256 and blob id. S3 Local checks: 38 of 38, ended 20:23:55Z. S4 Scans: 33 of 33, ended 20:25:02Z; with the committed configuration the history (94 commits, both ref sets) and the tree print RESULT: CLEAN, the canary prints CANARY OK twice, and the negative controls A and B are still reported while D is clean. S5 Privacy gate: 3 of 3, ended 20:25:39Z; GATE: 0 blocking hit(s), the allow-list is the recorded one with 4 confirmed keys. No deviation from the plan, so no as-built record of deviations was started.",
                "open": [
                  {
                    "text": "Three places where the plan's prose and its code blocks disagree, none of which changed the result: the README script is described as ASCII but holds seven non-ASCII lines; the canary step's expected text names commit-count lines its commands do not print; the privacy gate's expected text says confirmation lines where the tool prints one. The code blocks were run as written. To be settled when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T20:26:39Z"
                  }
                ],
                "stages": [
                  {
                    "id": "S1",
                    "name": "Baseline",
                    "state": "done",
                    "rows": [
                      "landing-checks"
                    ],
                    "brief": "The branch, the six paths, the workspace tools and the repository's settings are as recorded, and the scans of the branch with the workspace configuration report only the one known finding",
                    "kind": "check",
                    "steps": [
                      {
                        "id": "branch",
                        "name": "The branch and the six paths"
                      },
                      {
                        "id": "helpers",
                        "name": "The scratch helpers"
                      },
                      {
                        "id": "tools",
                        "name": "The workspace tools"
                      },
                      {
                        "id": "github",
                        "name": "The repository's settings"
                      },
                      {
                        "id": "before",
                        "name": "The scans before the change"
                      }
                    ],
                    "ref": "plan.md#s1--baseline",
                    "started": "2026-11-11T20:20:36Z",
                    "finished": "2026-11-11T20:26:39Z",
                    "report": "All five stages ran to their last ok line with no stop; nothing is committed. S1 Baseline: 25 of 25 checks, ended 20:21:58Z; the before-scans with the workspace configuration report only the one known finding (history 2, tree 1, rule curl-auth-user, 93 commits). S2 The six files: 8 of 8, ended 20:23:09Z; each file is at its recorded size, sha256 and blob id. S3 Local checks: 38 of 38, ended 20:23:55Z. S4 Scans: 33 of 33, ended 20:25:02Z; with the committed configuration the history (94 commits, both ref sets) and the tree print RESULT: CLEAN, the canary prints CANARY OK twice, and the negative controls A and B are still reported while D is clean. S5 Privacy gate: 3 of 3, ended 20:25:39Z; GATE: 0 blocking hit(s), the allow-list is the recorded one with 4 confirmed keys. No deviation from the plan, so no as-built record of deviations was started."
                  },
                  {
                    "id": "S2",
                    "name": "The six files",
                    "state": "done",
                    "rows": [
                      "gitignore",
                      "gitleaks-config",
                      "secret-scan-workflow",
                      "readme-correction",
                      "changelog"
                    ],
                    "brief": "The six files are written from their sources, each with its recorded size, sha256 and blob id",
                    "kind": "work",
                    "steps": [
                      {
                        "id": "ignore",
                        "name": "The .gitignore"
                      },
                      {
                        "id": "config",
                        "name": "The .gitleaks.toml"
                      },
                      {
                        "id": "wrapper",
                        "name": "The scan wrapper"
                      },
                      {
                        "id": "workflow",
                        "name": "The workflow"
                      },
                      {
                        "id": "readme",
                        "name": "The README correction"
                      },
                      {
                        "id": "changelog",
                        "name": "The CHANGELOG"
                      }
                    ],
                    "ref": "plan.md#s2--the-six-files",
                    "finished": "2026-11-11T20:26:39Z",
                    "report": "All five stages ran to their last ok line with no stop; nothing is committed. S1 Baseline: 25 of 25 checks, ended 20:21:58Z; the before-scans with the workspace configuration report only the one known finding (history 2, tree 1, rule curl-auth-user, 93 commits). S2 The six files: 8 of 8, ended 20:23:09Z; each file is at its recorded size, sha256 and blob id. S3 Local checks: 38 of 38, ended 20:23:55Z. S4 Scans: 33 of 33, ended 20:25:02Z; with the committed configuration the history (94 commits, both ref sets) and the tree print RESULT: CLEAN, the canary prints CANARY OK twice, and the negative controls A and B are still reported while D is clean. S5 Privacy gate: 3 of 3, ended 20:25:39Z; GATE: 0 blocking hit(s), the allow-list is the recorded one with 4 confirmed keys. No deviation from the plan, so no as-built record of deviations was started."
                  },
                  {
                    "id": "S3",
                    "name": "Local checks",
                    "state": "done",
                    "rows": [
                      "landing-checks"
                    ],
                    "brief": "The six files match their recorded bytes and sources, the configuration parses, the ignore list behaves as designed and no file holds both PEM markers",
                    "kind": "check",
                    "steps": [
                      {
                        "id": "bytes",
                        "name": "Sizes, hashes and blob ids"
                      },
                      {
                        "id": "sources",
                        "name": "The sources and the workspace wrapper"
                      },
                      {
                        "id": "toml",
                        "name": "The configuration parses"
                      },
                      {
                        "id": "ignore-list",
                        "name": "The ignore-list tests"
                      },
                      {
                        "id": "pem",
                        "name": "No file holds both PEM markers"
                      }
                    ],
                    "ref": "plan.md#s3--local-checks",
                    "finished": "2026-11-11T20:26:39Z",
                    "report": "All five stages ran to their last ok line with no stop; nothing is committed. S1 Baseline: 25 of 25 checks, ended 20:21:58Z; the before-scans with the workspace configuration report only the one known finding (history 2, tree 1, rule curl-auth-user, 93 commits). S2 The six files: 8 of 8, ended 20:23:09Z; each file is at its recorded size, sha256 and blob id. S3 Local checks: 38 of 38, ended 20:23:55Z. S4 Scans: 33 of 33, ended 20:25:02Z; with the committed configuration the history (94 commits, both ref sets) and the tree print RESULT: CLEAN, the canary prints CANARY OK twice, and the negative controls A and B are still reported while D is clean. S5 Privacy gate: 3 of 3, ended 20:25:39Z; GATE: 0 blocking hit(s), the allow-list is the recorded one with 4 confirmed keys. No deviation from the plan, so no as-built record of deviations was started."
                  },
                  {
                    "id": "S4",
                    "name": "Scans",
                    "state": "done",
                    "rows": [
                      "landing-checks"
                    ],
                    "brief": "The history and the tree of the change set scan clean with the committed configuration, the canary shows the rules fire, and the negative controls are still reported",
                    "kind": "check",
                    "steps": [
                      {
                        "id": "clone",
                        "name": "The scratch clone of the change set"
                      },
                      {
                        "id": "scans",
                        "name": "History and tree"
                      },
                      {
                        "id": "canary",
                        "name": "The canary"
                      },
                      {
                        "id": "controls",
                        "name": "The negative controls"
                      }
                    ],
                    "ref": "plan.md#s4--scans",
                    "finished": "2026-11-11T20:26:39Z",
                    "report": "All five stages ran to their last ok line with no stop; nothing is committed. S1 Baseline: 25 of 25 checks, ended 20:21:58Z; the before-scans with the workspace configuration report only the one known finding (history 2, tree 1, rule curl-auth-user, 93 commits). S2 The six files: 8 of 8, ended 20:23:09Z; each file is at its recorded size, sha256 and blob id. S3 Local checks: 38 of 38, ended 20:23:55Z. S4 Scans: 33 of 33, ended 20:25:02Z; with the committed configuration the history (94 commits, both ref sets) and the tree print RESULT: CLEAN, the canary prints CANARY OK twice, and the negative controls A and B are still reported while D is clean. S5 Privacy gate: 3 of 3, ended 20:25:39Z; GATE: 0 blocking hit(s), the allow-list is the recorded one with 4 confirmed keys. No deviation from the plan, so no as-built record of deviations was started."
                  },
                  {
                    "id": "S5",
                    "name": "Privacy gate",
                    "state": "done",
                    "rows": [
                      "landing-checks"
                    ],
                    "brief": "The privacy gate over the change set reports no blocking hit",
                    "kind": "check",
                    "steps": [
                      {
                        "id": "gate",
                        "name": "The gate over the scratch clone"
                      }
                    ],
                    "ref": "plan.md#s5--privacy-gate",
                    "finished": "2026-11-11T20:26:39Z",
                    "report": "All five stages ran to their last ok line with no stop; nothing is committed. S1 Baseline: 25 of 25 checks, ended 20:21:58Z; the before-scans with the workspace configuration report only the one known finding (history 2, tree 1, rule curl-auth-user, 93 commits). S2 The six files: 8 of 8, ended 20:23:09Z; each file is at its recorded size, sha256 and blob id. S3 Local checks: 38 of 38, ended 20:23:55Z. S4 Scans: 33 of 33, ended 20:25:02Z; with the committed configuration the history (94 commits, both ref sets) and the tree print RESULT: CLEAN, the canary prints CANARY OK twice, and the negative controls A and B are still reported while D is clean. S5 Privacy gate: 3 of 3, ended 20:25:39Z; GATE: 0 blocking hit(s), the allow-list is the recorded one with 4 confirmed keys. No deviation from the plan, so no as-built record of deviations was started.",
                    "result": "passed"
                  }
                ]
              }
            ],
            "qa": [
              {
                "since": "2026-11-11T20:27:00Z",
                "ended": "2026-11-11T20:46:16Z",
                "endedBy": "qa-pass",
                "to": "remediation",
                "event": {
                  "name": "qa-pass",
                  "at": "2026-11-11T20:27:00Z",
                  "note": "Quality Review 1: running"
                },
                "detail": "Quality Review 1 running.",
                "open": [
                  {
                    "text": "Three places where the plan's prose and its code blocks disagree, none of which changed the result: the README script is described as ASCII but holds seven non-ASCII lines; the canary step's expected text names commit-count lines its commands do not print; the privacy gate's expected text says confirmation lines where the tool prints one. The code blocks were run as written. To be settled when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T20:26:39Z"
                  }
                ],
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
                    "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/ca070e8d/tests/index.html"
                  }
                ]
              },
              {
                "since": "2026-11-11T21:55:23Z",
                "ended": "2026-11-11T22:22:42Z",
                "endedBy": "qa-pass",
                "to": "remediation",
                "event": {
                  "name": "implementation-stage",
                  "at": "2026-11-11T21:57:10Z",
                  "note": "S5 reported done"
                },
                "detail": "The check stages each passed in the revised run: S1 Baseline 28 of 28, S3 Local checks 108 of 108, S4 Scans 90 of 90, S5 Privacy gate with 0 blocking hits.",
                "open": [
                  {
                    "text": "The revised plan's expected text for the history scans gives 95 commits as the count when the plan was written; the scans counted 94, the branch's 93 commits plus the one scratch commit. The step asserts only that the two counts are equal and above zero, and it passed. To be corrected when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T21:54:56Z"
                  }
                ],
                "qa": [
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
                    "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/949b5d33/tests/index.html"
                  }
                ]
              },
              {
                "since": "2026-11-12T00:00:17Z",
                "ended": "2026-11-12T00:38:33Z",
                "endedBy": "qa-pass",
                "to": "remediation",
                "event": {
                  "name": "qa-pass",
                  "at": "2026-11-12T00:00:17Z",
                  "note": "Quality Review 3: running"
                },
                "detail": "Quality Review 3 running.",
                "open": [
                  {
                    "text": "The plan's table of stops names only the README script's count as a stop of the stage that writes the seven files; the workflow step of that stage has a script stop of its own, which the error-handling table does list. Wording only; to be corrected when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T23:59:45Z"
                  }
                ],
                "qa": [
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
                    "reportCopy": "1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/dda89436/tests/index.html"
                  }
                ]
              }
            ],
            "remediation": [
              {
                "since": "2026-11-11T20:46:16Z",
                "ended": "2026-11-11T20:52:29Z",
                "endedBy": "halted",
                "to": "remediation",
                "event": {
                  "name": "qa-pass",
                  "at": "2026-11-11T20:46:16Z",
                  "note": "Quality Review 1: changes-requested"
                },
                "detail": "The code review passes with no finding: the six files hold the plan's recorded bytes, nothing else changed, and the workflow, the wrapper, the allowlist table and the ignore list are correct as written. The checks that exercise the change ran green: 74 passed, 0 failed, 0 skipped (local checks 38, scans 33, privacy gate 3). Eleven findings on test coverage, three of them not minor: no check reaches the scan wrapper's fail-closed branches (status 2); the negative controls of the allowlist table exist only as a plan code block and scratch fixtures, with no committed repeatable check; and the two controls that must still be reported are never observed on the hosted Linux platform. Eight minor ones: more ignore-list membership tests and an isolated user-level ignore file, an assertion that no ignore file for findings is present in the clone, anchor fixtures for the table, a counts-only assertion over the scan output, assertions around the two hosted-run reads, optional shell-syntax checks of the workflow's run blocks, and one row of the test plan table re-attributed. Every fix is in the plan's own procedure, so the plan is revised first and the revised checks are then run.",
                "open": [
                  {
                    "text": "Three places where the plan's prose and its code blocks disagree, none of which changed the result: the README script is described as ASCII but holds seven non-ASCII lines; the canary step's expected text names commit-count lines its commands do not print; the privacy gate's expected text says confirmation lines where the tool prints one. The code blocks were run as written. To be settled when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T20:26:39Z"
                  },
                  {
                    "text": "A fourth place where the plan's prose and its text disagree: the assumption on the ignore list says the new file drops only four IDE lines and the section comments, while the specified text also narrows three patterns to directory-only form. No practical effect; the file matches the plan's exact text. To be settled when the plan is revised.",
                    "raised": "Quality Review 1",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T20:46:16Z"
                  }
                ],
                "remediation": {
                  "pass": 1,
                  "route": "re-plan-then-remediation"
                },
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
                  }
                ],
                "held": true,
                "asked": [
                  {
                    "text": "Where do the scoped allowlist table's negative controls live?",
                    "options": [
                      "1: record both findings as known gaps in consequences.md; no new file and no change to the six files; the controls stay in the plan's procedure and are repeated by hand whenever the table, the rule set or the gitleaks pin changes",
                      "2: a committed controls script (.github/scripts/allowlist_controls.py), run locally only; a seventh file, the workflow unchanged, CHANGELOG.md gains a line; the Linux observation stays a recorded gap",
                      "3 (recommended): the same script, also run by the workflow after the canary on every push and pull request; the workflow no longer equals the research text and takes new recorded bytes and an extended dated note on architecture section 10; the first hosted run proves the controls on Linux"
                    ],
                    "answer": null,
                    "asked": "2026-11-11T20:52:29Z",
                    "answered": "2026-11-11T21:21:39Z"
                  }
                ]
              },
              {
                "since": "2026-11-11T21:21:39Z",
                "ended": "2026-11-11T21:55:23Z",
                "endedBy": "qa-pass",
                "to": "qa",
                "event": {
                  "name": "implementation-stage",
                  "at": "2026-11-11T21:54:56Z",
                  "note": "S5"
                },
                "detail": "All five stages of the revised plan ran in full with no stop; nothing is committed. S1 Baseline: 28 of 28 checks, ended 21:49:10Z. S2 The seven files: 11 of 11, ended 21:50:11Z; the seven files are at their recorded size, sha256 and blob id (the controls script 7472 bytes, the workflow 4820, CHANGELOG.md 1465; the other four unchanged). S3 Local checks: 108 of 108, ended 21:51:27Z. S4 Scans: 90 of 90, ended 21:53:15Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; the canary prints CANARY OK twice with 6 and 5 commits; the controls print CONTROLS OK with the committed configuration and CONTROLS FAILED: 14 unexpected on a widened table; the negatives reach ten GATE FAILED conditions, each with status 2, plus CANARY FAILED, IMPOSSIBLE, an argument error and a missing binary. S5 Privacy gate: GATE: 0 blocking hit(s), ended 21:53:59Z. No deviation from the revised plan.",
                "open": [
                  {
                    "text": "The revised plan's expected text for the history scans gives 95 commits as the count when the plan was written; the scans counted 94, the branch's 93 commits plus the one scratch commit. The step asserts only that the two counts are equal and above zero, and it passed. To be corrected when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T21:54:56Z"
                  }
                ],
                "remediation": {
                  "pass": 1,
                  "route": "re-plan-then-remediation",
                  "steps": [
                    {
                      "name": "Revise the plan",
                      "state": "done",
                      "finished": "2026-11-11T21:47:07Z",
                      "report": "The plan is revised; the replaced version is kept under superseded/. The change set is now seven files: the allowlist table's controls are a committed script, .github/scripts/allowlist_controls.py (nine fixtures, each in git and dir mode), run locally and by the workflow as one step between the canary and the history scan. The workflow and CHANGELOG.md take new recorded bytes; the other four files are unchanged. All eleven findings are answered by checks and none by a recorded gap: the scan wrapper's failure paths are each reached once by a new negatives step; the workflow's run blocks, triggers and pins are checked locally; the ignore-list tests grow to 48 ignored and 27 not-ignored paths and run with an empty user-level ignore file; every scan asserts that its output holds counts and fixed markers only; the two reads of the hosted runs assert the conclusion and the marker counts. The stages keep their ids; S2 is now The seven files. All five stages are run again in full: 28, 11, 108 and 90 checks expected in S1 to S4."
                    },
                    {
                      "name": "Run the revised checks",
                      "state": "done",
                      "started": "2026-11-11T21:47:07Z",
                      "finished": "2026-11-11T21:54:56Z",
                      "report": "All five stages of the revised plan ran in full with no stop; nothing is committed. S1 Baseline: 28 of 28 checks, ended 21:49:10Z. S2 The seven files: 11 of 11, ended 21:50:11Z; the seven files are at their recorded size, sha256 and blob id (the controls script 7472 bytes, the workflow 4820, CHANGELOG.md 1465; the other four unchanged). S3 Local checks: 108 of 108, ended 21:51:27Z. S4 Scans: 90 of 90, ended 21:53:15Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; the canary prints CANARY OK twice with 6 and 5 commits; the controls print CONTROLS OK with the committed configuration and CONTROLS FAILED: 14 unexpected on a widened table; the negatives reach ten GATE FAILED conditions, each with status 2, plus CANARY FAILED, IMPOSSIBLE, an argument error and a missing binary. S5 Privacy gate: GATE: 0 blocking hit(s), ended 21:53:59Z. No deviation from the revised plan."
                    }
                  ]
                },
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
                  }
                ]
              },
              {
                "since": "2026-11-11T22:22:42Z",
                "ended": "2026-11-12T00:00:17Z",
                "endedBy": "qa-pass",
                "to": "qa",
                "event": {
                  "name": "implementation-stage",
                  "at": "2026-11-11T23:59:45Z",
                  "note": "S5"
                },
                "detail": "All five stages of the plan's second revision ran in full with no stop; nothing is committed. S1 Baseline: 36 of 36 checks, ended 23:38:38Z. S2 The seven files: 11 of 11, ended 23:39:39Z; the controls script is now 8482 bytes at its recorded sha256 and blob id, and the other six files were rewritten to the same bytes. S3 Local checks: 130 of 130, ended 23:41:52Z; 48 paths ignored and 32 not ignored; no bytecode file appeared under .github/. S4 Scans: 199 of 199, ended 23:56:31Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice; CONTROLS OK twice with 22 controls each; nine failure paths of the controls script each end in CONTROLS FAILED with status 2; ten mutated tables each fail the controls with the recorded count (18, 7, 22, 8, 10, 2, 2, 2, 2, 6), both de-anchorings of the pinned text among them; thirteen GATE FAILED conditions of the scan wrapper each with status 2; every shell block of the workflow passes and stops as designed; the filter for the hosted logs reads its samples as 6 62 0, 6 63 1, 5 39 0 and 6 62 0. S5 Privacy gate: its selftest passes 50 checks and the gate reports 0 blocking hits, ended 23:58:02Z. No deviation from the revised plan.",
                "open": [
                  {
                    "text": "The plan's table of stops names only the README script's count as a stop of the stage that writes the seven files; the workflow step of that stage has a script stop of its own, which the error-handling table does list. Wording only; to be corrected when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-11T23:59:45Z"
                  }
                ],
                "remediation": {
                  "pass": 2,
                  "route": "re-plan-then-remediation",
                  "steps": [
                    {
                      "name": "Revise the plan",
                      "state": "done",
                      "finished": "2026-11-11T23:35:14Z",
                      "report": "The plan is revised a second time; the replaced version is kept under superseded/. The second review's one code finding was in the controls script, .github/scripts/allowlist_controls.py: its two fixtures for the pinned text's anchors could not fail when an anchor was dropped. It is fixed by two more fixtures, after-quotes and before-quotes, which put a generated word outside the quotes and inside the captured secret; the script now has eleven fixtures (22 controls) and takes new recorded bytes (8482). The other six files are unchanged. All fourteen test findings are answered by checks held as steps: ten mutated tables each fail the controls with a recorded count, both de-anchorings among them; the controls script's own failure paths, three more cases of the scan wrapper and every shell block of the workflow are run on their failing side; the workflow's names, timeout and concurrency group are asserted; both scripts are parsed and their pure parts checked directly; standard error is asserted empty; and the logs of the two hosted runs are checked line by line for the fixed shapes. Three limits stay accepted, each failing closed: the hosted runner's install step and tools, the form of the real log until the first run, and two triggers no run exercises. All five stages are run again in full: 36, 11, 130 and 199 checks expected in S1 to S4."
                    },
                    {
                      "name": "Run the revised checks",
                      "state": "done",
                      "started": "2026-11-11T23:35:14Z",
                      "finished": "2026-11-11T23:59:45Z",
                      "report": "All five stages of the plan's second revision ran in full with no stop; nothing is committed. S1 Baseline: 36 of 36 checks, ended 23:38:38Z. S2 The seven files: 11 of 11, ended 23:39:39Z; the controls script is now 8482 bytes at its recorded sha256 and blob id, and the other six files were rewritten to the same bytes. S3 Local checks: 130 of 130, ended 23:41:52Z; 48 paths ignored and 32 not ignored; no bytecode file appeared under .github/. S4 Scans: 199 of 199, ended 23:56:31Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice; CONTROLS OK twice with 22 controls each; nine failure paths of the controls script each end in CONTROLS FAILED with status 2; ten mutated tables each fail the controls with the recorded count (18, 7, 22, 8, 10, 2, 2, 2, 2, 6), both de-anchorings of the pinned text among them; thirteen GATE FAILED conditions of the scan wrapper each with status 2; every shell block of the workflow passes and stops as designed; the filter for the hosted logs reads its samples as 6 62 0, 6 63 1, 5 39 0 and 6 62 0. S5 Privacy gate: its selftest passes 50 checks and the gate reports 0 blocking hits, ended 23:58:02Z. No deviation from the revised plan."
                    }
                  ]
                },
                "qa": [
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
                    "note": "All 202 checks passed, as in the build's own run, and the seven files hold the revised plan's recorded bytes; every finding of Quality Review 1 is answered. 15 findings (14 test, 1 code), 2 not minor. First, the two controls fixtures meant to test the anchors of the table's pinned text put the extra character inside the quotes, which the pinned pattern includes, so both stay reported even if an anchor is dropped: a later edit removing an anchor would leave the controls green (found by evaluating the patterns, not by a run with the binary). Second, on the hosted runs the log's counts-only property is read through four marker counts only, so a line of another shape in a scan step would go unnoticed in a log that becomes public with the repository. The 13 minor ones: the controls script's own failure paths and three more table mutations as repeatable steps; three sub-cases of the scan wrapper; assertions on the workflow's timeout, names and concurrency group; a parse check of the two scripts; standard error asserted empty; the workflow's failing shell branches run locally; more not-ignored paths for five root-anchored patterns; a direct check of the pure functions; and wording in the plan (a count of 95 commits that should read 94, seven lines that should read six, two rows of the test plan table, some check labels). The plan is revised first, then the revised checks run."
                  }
                ]
              },
              {
                "since": "2026-11-12T00:38:33Z",
                "ended": "2026-11-12T01:45:29Z",
                "endedBy": "document",
                "to": "document",
                "event": {
                  "name": "implementation-stage",
                  "at": "2026-11-12T01:44:46Z",
                  "note": "S5"
                },
                "detail": "The steps the fixes touch ran with no stop; nothing is committed and the seven files are unchanged at their recorded bytes, so the stage that writes them was not run again. S1 Baseline: helpers 8 of 8 and the before-scans 13 of 13, ended 01:23:35Z. S3 Local checks: 130 of 130, ended 01:26:15Z. S4 Scans: 222 of 222, ended 01:41:26Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice, its last call's output in fixed shapes; CONTROLS OK three times, the run from a bare clone among them, with the 22 control lines as expected in order; the nine failure paths of the controls each end in CONTROLS FAILED; all ten mutated tables fail the controls at their counts and turn exactly the controls the plan names; thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answer as designed; every shell block of the workflow passes and stops as designed; the log filter reads its four samples as recorded. S5 Privacy gate: selftest 50 checks, 0 blocking hits, ended 01:42:58Z. No deviation. No bytecode file under .github/.",
                "open": [
                  {
                    "text": "The plan's convention on running a block names three blocks as longer than the size at which a command is cut; measured with their prelude, only one of them is (the negatives block). The rule itself, every block run from a saved file, was applied to every block. Wording only; to be corrected when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-12T01:44:46Z"
                  }
                ],
                "remediation": {
                  "pass": 3,
                  "route": "on-the-spot",
                  "steps": [
                    {
                      "name": "Apply the seven minor fixes to the plan's checks",
                      "state": "done",
                      "started": "2026-11-12T00:38:33Z",
                      "finished": "2026-11-12T01:20:33Z",
                      "report": "The seven minor fixes are applied to the plan's checks in place; the design and the seven files' recorded bytes are unchanged, so the stage that writes the files is not run again. The canary's last call has its output and standard error asserted; the shape check runs before every verdict; the commit-count case is filed under the integration row; the failing-side cases assert shape and standard error; the 22 control lines are asserted in order, each mutation asserts which controls it turns, and a run from a bare clone shows the document is read from the last commit; four more uncaught exits of the scan wrapper have a case; the generated word is asserted as 12 hexadecimal characters over 200 draws, and two more helpers have a check of their own. A convention is added: each block is saved to a file and run from it, because the longest blocks are cut when handed to the shell as one command. Expected checks now: 38 in S1 (helpers 8), 130 in S3, 222 in S4 (canary 21, controls 42, mutations 42, negatives 64). Two possible later changes are recorded in consequences.md, neither planned: the escape of one dot in the table's path pattern, and an ignore pattern for Python bytecode. The baseline's helpers and before-scans, the local checks, the scans and the privacy gate are run again."
                    },
                    {
                      "name": "Run the steps the fixes touch",
                      "state": "done",
                      "started": "2026-11-12T01:20:33Z",
                      "finished": "2026-11-12T01:44:46Z",
                      "report": "The steps the fixes touch ran with no stop; nothing is committed and the seven files are unchanged at their recorded bytes, so the stage that writes them was not run again. S1 Baseline: helpers 8 of 8 and the before-scans 13 of 13, ended 01:23:35Z. S3 Local checks: 130 of 130, ended 01:26:15Z. S4 Scans: 222 of 222, ended 01:41:26Z; the history (94 commits, both ref sets) and the tree print RESULT: CLEAN; CANARY OK twice, its last call's output in fixed shapes; CONTROLS OK three times, the run from a bare clone among them, with the 22 control lines as expected in order; the nine failure paths of the controls each end in CONTROLS FAILED; all ten mutated tables fail the controls at their counts and turn exactly the controls the plan names; thirteen GATE FAILED conditions and seven uncaught exits of the scan wrapper answer as designed; every shell block of the workflow passes and stops as designed; the log filter reads its four samples as recorded. S5 Privacy gate: selftest 50 checks, 0 blocking hits, ended 01:42:58Z. No deviation. No bytecode file under .github/."
                    }
                  ]
                },
                "qa": [
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
                    "note": "The code check found nothing: the seven files hold the plan's recorded bytes, and the code finding of Quality Review 2 is answered: evaluated against the rule and the table themselves, the committed table fails none of the controls' eleven expectations, and each of the four de-anchorings of the pinned text fails exactly its own fixture in both modes. All 334 checks passed (local checks 130, scans 199, privacy gate 5), and 13 of Quality Review 2's 15 findings are answered in full. 7 findings remain, all minor test findings, each an edit to the plan's procedure or its wording and none to the seven files: one call at the end of the canary step leaves its standard error unasserted; in two places the verdict is asserted before the shape check; one case is filed under the component row of the test levels though it runs git; three failing-side cases lack a shape and standard-error value; the 22 control lines and the controls each mutation turns are asserted as counts only, and reading the document from the last commit has no case; three more uncaught exits of the scan wrapper have no case; and the generated word's form and two helpers have no check of their own. They touch the checks before the landing, the allowlist controls, and the scan wrapper with its workflow. They are fixed on the spot and the steps they touch run again; no further review follows."
                  }
                ]
              }
            ],
            "document": [
              {
                "since": "2026-11-12T01:45:29Z",
                "ended": "2026-11-12T01:59:34Z",
                "endedBy": "halted",
                "to": "document",
                "event": {
                  "name": "document",
                  "at": "2026-11-12T01:49:28Z",
                  "note": "0 of 6 tasks done"
                },
                "detail": "The seven files are committed in three commits and pushed; the branch head is 40357d4. main had not moved, so there is no merge commit, and no version changes. All seven blob ids equal the plan's records. The documentation of the change set is being checked.",
                "open": [
                  {
                    "text": "The plan's convention on running a block names three blocks as longer than the size at which a command is cut; measured with their prelude, only one of them is (the negatives block). The rule itself, every block run from a saved file, was applied to every block. Wording only; to be corrected when the plan is reconciled with the build.",
                    "raised": "implementation-stage S5",
                    "ref": "plan.md",
                    "shownOpen": "2026-11-12T01:44:46Z"
                  }
                ],
                "document": {
                  "tasks": [
                    {
                      "id": "documentation-review",
                      "name": "Documentation review",
                      "state": "done",
                      "started": "2026-11-12T01:49:28Z",
                      "finished": "2026-11-12T01:59:34Z"
                    },
                    {
                      "id": "reconcile-documentation",
                      "name": "Reconcile documentation",
                      "state": "current",
                      "started": "2026-11-12T01:59:34Z"
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
                    "text": "The header of .gitleaks.toml does not say that the allowlist table and the controls script change together. Is that fixed in this change?",
                    "options": [
                      "Fix it now, with a note that a directory scan must run from the repository root: .gitleaks.toml takes new recorded bytes, the plan's records and the workspace copy's expected values change, and the checks run again",
                      "Record it as a follow-up in consequences.md; the rule stays documented in the plan documents only"
                    ],
                    "answer": null,
                    "asked": "2026-11-12T01:59:34Z",
                    "answered": "2026-11-12T02:10:54Z"
                  },
                  {
                    "text": "Eight further improvements are comments or wording in the other byte-pinned files (the scan wrapper, the controls script, the workflow, .gitignore, CHANGELOG.md). Are they made in this change?",
                    "options": [
                      "Record them as follow-ups in consequences.md, for a later comment-only change",
                      "Make them all now: five files take new bytes, the scan wrapper stops matching the workspace copy and the research text (a change to the phase design), the plan is revised again and every stage is run again",
                      "Make them now in every file except the scan wrapper, which stays byte-identical; its comments are recorded as a follow-up"
                    ],
                    "answer": null,
                    "asked": "2026-11-12T01:59:34Z",
                    "answered": "2026-11-12T02:10:54Z"
                  }
                ]
              }
            ]
          },
          "rowNames": {
            "gitignore": "A root-anchored `.gitignore`",
            "gitleaks-config": "The scan's configuration, `.gitleaks.toml`",
            "secret-scan-workflow": "The scan wrapper and the `Secret scan` workflow",
            "readme-correction": "The README's correction",
            "changelog": "The first `CHANGELOG.md`",
            "landing-checks": "The checks before the landing, and the merge after the workflow's first run",
            "allowlist-controls": "The allowlist controls, `allowlist_controls.py`"
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
              "hash": "9bb2a18d3c1b"
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
        "state": "pending",
        "summary": "#24's run is in its Document step: the seven files are committed on its branch at their recorded bytes, the configuration's two header sentences included, at `0b64c47`, the commit the code lands at, and the checks before the landing ran again over the final documents with no stop; its documents are not committed yet, its workflow has not run on GitHub (the first run is the pull request's), and it is not merged.",
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
        "issue": 25
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
              "hash": "bf20450c13ea"
            }
          },
          {
            "text": "Pass the pre-flip gate, then make the repository public and enable secret scanning and push protection, verified.",
            "ref": "architecture.md#75-renames-archive-visibility-scanning",
            "excerpt": {
              "ref": "architecture.md#75-renames-archive-visibility-scanning",
              "heading": "7.5 Renames, archive, visibility, scanning",
              "paragraph": "The renames:",
              "hash": "54b888b5aa08"
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
              "hash": "9bb2a18d3c1b"
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
        "state": "pending",
        "summary": "To be filed as a sub-issue of #2 once this plan lands; starts after unit 4, and MagicBot's Phase 13 may start once it has landed."
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
        "issue": 26
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
              "hash": "f579c5d6d5f8"
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
              "hash": "9bb2a18d3c1b"
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
        "summary": "To be filed as a sub-issue of #2 once this plan lands; starts after unit 3."
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
              "hash": "f579c5d6d5f8"
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
              "hash": "9bb2a18d3c1b"
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
        "summary": "To be filed as a sub-issue of #2 once this plan lands; starts after unit 6."
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
              "hash": "9bb2a18d3c1b"
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
              "hash": "9bb2a18d3c1b"
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
        "summary": "To be filed as a sub-issue of #2 once this plan lands; starts after units 5 and 7, and its landing closes #2."
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
        "summary": "Should come into line with KotlinBottools': drop its global allowlist and add the two path rules. Its own CI, Phase 13's, can adopt the same workflow pattern.",
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
        "basis": "plan",
        "summary": "No module is published and no version moves. KotlinBottools gets its first workflow, `Secret scan`, with its wrapper, a configuration whose one scoped allowlist table settles the default-rule finding unit 3 recorded, and the allowlist controls that test that table on every run; a root-anchored `.gitignore`, the README correction and its first `CHANGELOG.md`; the workspace configuration takes the committed bytes after the merge.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module is published and no version moves",
          "nothingPublished": true
        },
        "source": "24-repository-hygiene/consequences.md §1 to §5",
        "link": "24-repository-hygiene/consequences.md#2-blast-radius"
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
