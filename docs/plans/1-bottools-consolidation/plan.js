/* plan.js: plan.json as a script, written by plan/scripts/embed.js beside the board for its live view (plan/RULES.md §1). Do not edit: edit plan.json and re-embed. */
window.dashboardLive&&window.dashboardLive("plan",
{
  "schema": "plan-board/1",
  "repo": "SpartanLaboratories/KotlinBottools",
  "issue": 1,
  "slug": "1-bottools-consolidation",
  "folder": "docs/plans/1-bottools-consolidation",
  "kind": "tracking",
  "title": "BotTools consolidation",
  "issueTitle": "BotTools consolidation & MagicBot (tracking)",
  "function": "KotlinBottools #1 consolidates the organisation's bot code into one modern Discord-bot library, published to Maven Central as `io.github.spartanlaboratories:bottools-*`, with MagicBot, a public game-stats bot in its own repository, as its first consumer. The work is eighteen units, each a sub-issue planned and landed on its own: the history rewrite of the six bot repositories first, then the build skeleton, the core foundation, the command model, SQLite storage, the bot runtime, outbound HTTP in two halves, the stats framework and five plugins, then the `1.0.0` release with the predecessor repositories archived, and after it published test fixtures, a poker plugin and an unscheduled desktop manager. MagicBot's own units are planned and tracked in its repository.",
  "status": "building",
  "sized": null,
  "parent": null,
  "fixOf": null,
  "branch": "docs/issue-1-bottools-consolidation",
  "baseline": {
    "ref": "main",
    "sha": "ffddfc7",
    "date": "2026-09-03"
  },
  "asBuilt": null,
  "systems": [],
  "wip": {
    "step": "implementation",
    "since": "2026-11-07T07:05:00Z",
    "updated": "2026-11-20T20:50:51Z",
    "detail": "1 of 18 units landed; #3 in progress; #4 up next.",
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
      "build-skeleton.built"
    ],
    "questions": [],
    "research": null,
    "interview": [],
    "plan": null,
    "stages": [],
    "remediation": null,
    "open": [],
    "event": null,
    "history": {},
    "next": "core-foundation",
    "qa": [],
    "qaMax": 3,
    "waitingOn": null,
    "resume": null,
    "blockers": {
      "waitsOn": [],
      "blocks": []
    },
    "landing": null
  },
  "milestones": [
    {
      "column": "gap",
      "label": "Research verified",
      "date": "2026-10-20",
      "ref": "research/README.md",
      "note": "411 claims opened at their sources on 2026-10-20: 408 hold, 2 unclear, 1 fails in part"
    },
    {
      "column": "considered",
      "label": "Systems design",
      "date": "2026-10-20",
      "ref": "architecture.md",
      "note": "the systems, the alternatives weighed (§13) and the decomposition into units (§14)"
    },
    {
      "column": "verdict",
      "label": "Roadmap",
      "date": "2026-10-20",
      "ref": "roadmap.md",
      "note": "one phase per unit, in landing order, each with what it waits for and the version it targets"
    }
  ],
  "trail": [
    {
      "date": "2026-11-07",
      "column": "built",
      "label": "#2 started"
    },
    {
      "date": "2026-11-17",
      "column": "built",
      "label": "#2 landed"
    },
    {
      "date": "2026-11-18",
      "column": "built",
      "label": "#3 started"
    }
  ],
  "rows": [
    {
      "id": "history-rewrite",
      "group": "History",
      "name": "History rewrite",
      "system": "internal-tooling",
      "where": "the six bot repositories · KotlinBottools' hygiene files",
      "unit": {
        "n": 1,
        "slug": "history-rewrite",
        "title": "Phase 0 — History rewrite: purge secrets and data from the six bot repositories",
        "blockedBy": [],
        "issue": 2,
        "board": "2-phase-0-history-rewrite/dashboard.html",
        "folder": "2-phase-0-history-rewrite/",
        "landing": {
          "pr": 49,
          "merge": "3625163c1a1177afca20488e421a5f44778724e0"
        }
      },
      "gap": {
        "kind": "risk",
        "summary": "Secrets and legacy data sit in the histories of the six bot repositories, so none of them can be made public or archived as it is. The secrets are confined to whole files, and pull-request refs survive a force-push.",
        "evidence": [
          "`architecture.md:286` — the secrets are whole files, and pull-request refs survive a force-push",
          "`architecture.md:1636` — the purge comes first, and KotlinBottools' step is the only part later units wait for"
        ],
        "source": "architecture.md §2.2, §11",
        "link": "architecture.md#11-the-history-rewrite-as-a-system-boundary"
      },
      "options": [
        {
          "id": "filter-repo-in-mirrors",
          "name": "Purge each repository with git filter-repo in a mirror clone, in a fixed order, each proven by its exit tests",
          "verdict": "accepted",
          "source": "architecture.md §11",
          "link": "architecture.md#11-the-history-rewrite-as-a-system-boundary"
        },
        {
          "id": "bfg",
          "name": "BFG for the purge",
          "verdict": "declined",
          "why": "It matches names anywhere, deleting the `services` source packages, and protects the current commit.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "The gate for everything public: KotlinBottools' own rewrite comes first and is the only part later units wait for, while the other five purges finish inside the unit.",
        "statements": [
          {
            "text": "Copy the legacy data out, then purge and force-push the six repositories in the order of §11, each passing its exit tests on a fresh mirror.",
            "ref": "architecture.md#14-decomposition",
            "excerpt": {
              "ref": "architecture.md#14-decomposition",
              "heading": "14. Decomposition",
              "paragraph": "Each unit is one system or one coherent cluster that can be planned and implemented on its own. The roadmap turns this list into phases, sub-issues and target versions; the landing order below is a dependency order, not a schedule.",
              "hash": "a80b8e007f78"
            }
          },
          {
            "text": "Give KotlinBottools a root-anchored `.gitignore` and a gitleaks CI job, and make it public with secret scanning and push protection once its exit tests pass.",
            "ref": "roadmap.md#phase-0--history-rewrite",
            "excerpt": {
              "ref": "roadmap.md#phase-0--history-rewrite",
              "heading": "Phase 0 — History rewrite",
              "paragraph": "> Dated note, 2026-11-07 — Phase 0 as designed (`2-phase-0-history-rewrite/architecture.md`). > > - Scope changes: > - no GitHub Support ticket; > - the legacy data in an ordinary local folder; > - KotlinBottools made public as a fresh repository, with every number reproduced and the > pre-rewrite repository kept private and archived under its legacy name; > - machine-local paths replaced in KotlinBottools' history; > - the planning pull request lands before the rewrite, as #2's own landing. > - Units, sub-issues of #2: preparation; transfer rehearsal; KotlinBottools rewrite and swap; > …",
              "hash": "b8d1b1d06980"
            }
          },
          {
            "text": "Run as eight units of its own, under its own tracking board.",
            "ref": "architecture.md#14-decomposition",
            "excerpt": {
              "ref": "architecture.md#14-decomposition",
              "heading": "14. Decomposition",
              "paragraph": "Each unit is one system or one coherent cluster that can be planned and implemented on its own. The roadmap turns this list into phases, sub-issues and target versions; the landing order below is a dependency order, not a schedule.",
              "hash": "a80b8e007f78"
            }
          }
        ],
        "source": "architecture.md §14 unit 0",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "landed",
        "summary": "The history rewrite landed through PR #49 as 3625163 on 2026-11-17, with its eight units landed. Every commit id changed in all six repositories and ten commits were pruned: KotlinBottools became public as a fresh repository with every number reproduced and secret scanning and push protection on, its pre-rewrite repository private and archived under its legacy name, and GKB2, GKB, BotTools and the private repositories were force-pushed in place. GitHub still serves the old objects by id and through GKB2's and BotTools' pull-request refs, as the residual-exposure report states. No module was published and no version moved."
      }
    },
    {
      "id": "build-skeleton",
      "group": "Foundation",
      "name": "Build skeleton",
      "system": "build-and-ci-skeleton",
      "where": "build-logic, the root build, .github/workflows, the repository files",
      "unit": {
        "n": 2,
        "slug": "build-skeleton",
        "title": "Phase 1 — Build skeleton: multi-module build, conventions, CI and repository scaffolding",
        "blockedBy": [
          2
        ],
        "issue": 3
      },
      "gap": {
        "kind": "missing",
        "summary": "There is no build a library can be published from. Today's build is one module on `jvmToolchain(23)` with `application`, `jcenter()`, a local repository and unused `api` dependencies.",
        "evidence": [
          "`architecture.md:242` — one module, a JDK 23 toolchain, `jcenter()`, a local repository, unused `api` dependencies"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "multi-module-build",
          "name": "A multi-module build with `build-logic` convention plugins, a JDK 21 toolchain, KGP 2.2.x on Gradle 9.7.1, and the documentation, ABI and release-metadata gates",
          "verdict": "accepted",
          "source": "architecture.md §5, §14 unit 1",
          "link": "architecture.md#14-decomposition"
        },
        {
          "id": "ci-snapshots",
          "name": "CI publishing of snapshots",
          "verdict": "declined",
          "why": "It needs a Portal token in CI with no scope narrower than the account.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "packages-or-source-deps",
          "name": "GitHub Packages, or Gradle source dependencies",
          "verdict": "declined",
          "why": "A token even for public reads; source dependencies assume `master` and lack a current user-guide chapter.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One build for the six artifacts, set up once so every later unit lands into it with its checks already running.",
        "statements": [
          {
            "text": "Replace the single-module build with the multi-module one: `build-logic` with `bottools.kotlin-library` and `bottools.published-library`, a JDK 21 toolchain, KGP 2.2.x on the Gradle 9.7.1 wrapper, Dokka, the binary-compatibility validator, detekt and one test task per test set.",
            "ref": "roadmap.md#phase-1--build-skeleton",
            "excerpt": {
              "ref": "roadmap.md#phase-1--build-skeleton",
              "heading": "Phase 1 — Build skeleton",
              "paragraph": "Scope (architecture §5, §9, §10.6, §14 unit 1): · The multi-module build, in place of the single-module one: · `build-logic` with `bottools.kotlin-library` and `bottools.published-library`, which sets `group` and `version`; · a JDK 21 toolchain; · KGP 2.2.x on the Gradle 9.7.1 wrapper; · Dokka, the binary-compatibility validator and detekt; · one test task per level. · Workflows: `ci.yml`, `pages.yml` and `release.yml`. · Repository files: · `CONTRIBUTING.md`, covering commit scopes, module layout, build and test commands, and publishing. On versioning it says only that the repository follows …",
              "hash": "89b174840d82"
            }
          },
          {
            "text": "Add `ci.yml`, `pages.yml` and `release.yml`, and `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE` and the README stub.",
            "ref": "roadmap.md#phase-1--build-skeleton",
            "excerpt": {
              "ref": "roadmap.md#phase-1--build-skeleton",
              "heading": "Phase 1 — Build skeleton",
              "paragraph": "Scope (architecture §5, §9, §10.6, §14 unit 1): · The multi-module build, in place of the single-module one: · `build-logic` with `bottools.kotlin-library` and `bottools.published-library`, which sets `group` and `version`; · a JDK 21 toolchain; · KGP 2.2.x on the Gradle 9.7.1 wrapper; · Dokka, the binary-compatibility validator and detekt; · one test task per level. · Workflows: `ci.yml`, `pages.yml` and `release.yml`. · Repository files: · `CONTRIBUTING.md`, covering commit scopes, module layout, build and test commands, and publishing. On versioning it says only that the repository follows …",
              "hash": "89b174840d82"
            }
          },
          {
            "text": "Add the `bottools` umbrella with its jar guards and its `strictly` pins on the five modules, asserted by `verifyReleasableMetadata`, and the stability markers.",
            "ref": "roadmap.md#phase-1--build-skeleton",
            "excerpt": {
              "ref": "roadmap.md#phase-1--build-skeleton",
              "heading": "Phase 1 — Build skeleton",
              "paragraph": "Scope (architecture §5, §9, §10.6, §14 unit 1): · The multi-module build, in place of the single-module one: · `build-logic` with `bottools.kotlin-library` and `bottools.published-library`, which sets `group` and `version`; · a JDK 21 toolchain; · KGP 2.2.x on the Gradle 9.7.1 wrapper; · Dokka, the binary-compatibility validator and detekt; · one test task per level. · Workflows: `ci.yml`, `pages.yml` and `release.yml`. · Repository files: · `CONTRIBUTING.md`, covering commit scopes, module layout, build and test commands, and publishing. On versioning it says only that the repository follows …",
              "hash": "89b174840d82"
            }
          },
          {
            "text": "Done when `./gradlew build` passes on CI from a clean clone and the build publishes to Maven Local.",
            "ref": "roadmap.md#phase-1--build-skeleton",
            "excerpt": {
              "ref": "roadmap.md#phase-1--build-skeleton",
              "heading": "Phase 1 — Build skeleton",
              "paragraph": "Scope (architecture §5, §9, §10.6, §14 unit 1): · The multi-module build, in place of the single-module one: · `build-logic` with `bottools.kotlin-library` and `bottools.published-library`, which sets `group` and `version`; · a JDK 21 toolchain; · KGP 2.2.x on the Gradle 9.7.1 wrapper; · Dokka, the binary-compatibility validator and detekt; · one test task per level. · Workflows: `ci.yml`, `pages.yml` and `release.yml`. · Repository files: · `CONTRIBUTING.md`, covering commit scopes, module layout, build and test commands, and publishing. On versioning it says only that the repository follows …",
              "hash": "89b174840d82"
            }
          }
        ],
        "source": "architecture.md §14 unit 1",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #3; its run started on 2026-11-18 and is under way, its board on its own branch."
      }
    },
    {
      "id": "core-foundation",
      "group": "Foundation",
      "name": "Core foundation",
      "system": "kotlinbottools",
      "where": "bottools-core",
      "unit": {
        "n": 3,
        "slug": "core-foundation",
        "title": "Phase 2 — Core foundation: ids, failures, settings, storage ports and configuration",
        "blockedBy": [
          3
        ],
        "issue": 4
      },
      "gap": {
        "kind": "missing",
        "summary": "Nothing a library can stand on exists: no storage port, configuration or failure model. Today's state is held on singletons, and only GKB2's `Database` returns a `Result`.",
        "evidence": [
          "`architecture.md:238` — XML readers and parsers, and GKB2's `Database`, the only port with `Result` returns",
          "`architecture.md:246` — every defect that decides a verdict comes from state held on singletons"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "core-foundation",
          "name": "Ids, the failure kinds, the `Result` helpers, `Setting<T>`, the storage ports with `InMemoryStorage` and its contract suite, and `BotConfig` with `Secret`",
          "verdict": "accepted",
          "source": "architecture.md §7.3, §9, §14 unit 2",
          "link": "architecture.md#14-decomposition"
        },
        {
          "id": "hoplite-config",
          "name": "Hoplite or Lightbend Config in core",
          "verdict": "declined",
          "why": "`kotlin-reflect` and an old coroutines on every consumer; home-directory sources change a public bot's behaviour.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "What every later module of the library builds on, with no Discord behaviour of its own.",
        "statements": [
          {
            "text": "Build the ids, `BotToolsException` and its failure kinds, the `Result` helpers and `suspendCatching`, and `Setting<T>` with its codecs.",
            "ref": "roadmap.md#phase-2--core-foundation",
            "excerpt": {
              "ref": "roadmap.md#phase-2--core-foundation",
              "heading": "Phase 2 — Core foundation",
              "paragraph": "Scope (architecture §7.3, the core half, §9 and §14 unit 2): · ids; · `BotToolsException` and the failure kinds; · the `Result` helpers and `suspendCatching`; · `Setting<T>` and its codecs; · the storage ports, plus `InMemoryStorage` with the port contract suite; · `BotConfig` and `Secret`; · the closed list of logging events. · Depends on: Phase 1. · Version: `1.0.0-SNAPSHOT`. · Done when: · the port contract suite passes against `InMemoryStorage` (Level 2); · `BotConfig.load` returns every configuration problem in one `Result` (Level 2).",
              "hash": "f46e139f73eb"
            }
          },
          {
            "text": "Define the storage ports and `InMemoryStorage`, proven by the port contract suite.",
            "ref": "architecture.md#73-storage",
            "excerpt": {
              "ref": "architecture.md#73-storage",
              "heading": "7.3 Storage",
              "paragraph": "Owns (core). The ports and their shape: `AccountLinkStore` (global per user), `SubscriptionStore` (per guild channel, with a `SubscriptionKind` namespace — `MatchFeed(game, userId)`, `GameNews(game)`, `Feed(url)` — each row carrying its own cursor and health), `GuildSettingStore` (encoded text under `Setting<T>` keys), `JobStateStore`, `PluginKvStore` (owner columns `guildId` and `userId`, 0 when absent; paged scan per plugin and per guild), `UserDataEraser` (`eraseUser`, `eraseGuild` as single atomic operations returning per-table counts), and `InMemoryStorage`, the pure-Kotlin reference …",
              "hash": "b1ddb8428188"
            }
          },
          {
            "text": "Add `BotConfig` and `Secret`, `BotConfig.load` returning every configuration problem in one `Result`, and the closed list of logging events.",
            "ref": "roadmap.md#phase-2--core-foundation",
            "excerpt": {
              "ref": "roadmap.md#phase-2--core-foundation",
              "heading": "Phase 2 — Core foundation",
              "paragraph": "Scope (architecture §7.3, the core half, §9 and §14 unit 2): · ids; · `BotToolsException` and the failure kinds; · the `Result` helpers and `suspendCatching`; · `Setting<T>` and its codecs; · the storage ports, plus `InMemoryStorage` with the port contract suite; · `BotConfig` and `Secret`; · the closed list of logging events. · Depends on: Phase 1. · Version: `1.0.0-SNAPSHOT`. · Done when: · the port contract suite passes against `InMemoryStorage` (Level 2); · `BotConfig.load` returns every configuration problem in one `Result` (Level 2).",
              "hash": "f46e139f73eb"
            }
          }
        ],
        "source": "architecture.md §14 unit 2",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #4; its run has not started. It starts once #3 has landed."
      }
    },
    {
      "id": "command-model",
      "group": "Foundation",
      "name": "Command model",
      "system": "command-model",
      "where": "bottools-core, com.spartanlabs.bottools.command",
      "unit": {
        "n": 4,
        "slug": "command-model",
        "title": "Phase 3 — Command model: definitions, validation, typed invocation, dispatch and help",
        "blockedBy": [
          4
        ],
        "issue": 5
      },
      "gap": {
        "kind": "debt",
        "summary": "The command surface is worth keeping and its code is not. Invocation state is held on `Command` and `Parser` singletons, context menus have plumbing and no command, and GKB2's typed path and `HelpCommand` are dead.",
        "evidence": [
          "`architecture.md:236` — two copies of the command family, each better in different parts",
          "`architecture.md:253` — context menus without a command; GKB2's typed path, `HelpCommand` and `admin` dead"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "one-definition",
          "name": "One immutable definition projected to slash, typed and context-menu invocations, run through one handler and one context",
          "verdict": "accepted",
          "source": "architecture.md §7.1",
          "link": "architecture.md#71-command-model"
        },
        {
          "id": "two-handlers",
          "name": "Two handlers per command, slash and typed",
          "verdict": "declined",
          "why": "Every plugin command is written twice and the two pipelines drift.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "typed-as-slash-subset",
          "name": "The typed form as the slash subset",
          "verdict": "declined",
          "why": "MagicBot's mention mode is a real path and keeps greedy strings and named arguments.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "annotations",
          "name": "Annotations or a class per command",
          "verdict": "declined",
          "why": "Reflection on consumers' API and binding by name at start-up; the class-per-command shape is today's shared-state defect.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One system of the library, the one every plugin and consumer writes against.",
        "statements": [
          {
            "text": "Build the command model in full: the tree and its DSL, the validator and slash projection, the alias table, the typed parser and prefix policy, and the context with its three acknowledgement modes.",
            "ref": "architecture.md#71-command-model",
            "excerpt": {
              "ref": "architecture.md#71-command-model",
              "heading": "7.1 Command model",
              "paragraph": "Owns. The definition language and the immutable tree; the platform validator; the alias table; the typed parser and prefix policy; the per-invocation context with its reply surface and acknowledgement state; the dispatcher (path resolution, binding, preconditions, handler, error presentation, automatic deferral); help; the component route registry.",
              "hash": "258af2fc568f"
            }
          },
          {
            "text": "Add the dispatcher with automatic deferral, preconditions, `CommandMessages`, help, components and `FakeCommandContext`.",
            "ref": "roadmap.md#phase-3--command-model",
            "excerpt": {
              "ref": "roadmap.md#phase-3--command-model",
              "heading": "Phase 3 — Command model",
              "paragraph": "Scope (architecture §7.1, §14 unit 3): · the tree and its DSL; · the validator and the slash projection; · the alias table; · the typed parser and the prefix policy; · the context, with its three acknowledgement modes: `Automatic`, `Manual` and `Immediate`; · the dispatcher and automatic deferral; · preconditions, `CommandMessages`, help and components; · `FakeCommandContext`. · Depends on: Phase 2. · Version: `1.0.0-SNAPSHOT`. · Done when: · Level 2: · the parser, alias resolution, the validator and help pass as pure functions; · the deferral timer passes on a controllable clock. · Level 4a: …",
              "hash": "50e5a4759262"
            }
          }
        ],
        "source": "architecture.md §14 unit 3",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #5; its run has not started. It starts once #4 has landed."
      }
    },
    {
      "id": "storage-sqlite",
      "group": "Foundation",
      "name": "SQLite storage",
      "system": "storage",
      "where": "bottools-data-sqlite",
      "unit": {
        "n": 5,
        "slug": "storage-sqlite",
        "title": "Phase 4 — SQLite storage: migrations, erasure and backups",
        "blockedBy": [
          4
        ],
        "issue": 6
      },
      "gap": {
        "kind": "missing",
        "summary": "Nothing stores a bot's data durably. Data lives in XML files read through readers that share one document, and `GuildDataParser` is commented out.",
        "evidence": [
          "`architecture.md:238` — the XML readers, `GuildDataParser` commented out whole",
          "`architecture.md:248` — the shared `doc` and `currentNode` of `BaseXMLReader`"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "sqlite-handwritten",
          "name": "`SqliteStorage` on sqlite-jdbc with hand-written, forward-only migrations keyed by `user_version`, `VACUUM INTO` backups and atomic erasure",
          "verdict": "accepted",
          "source": "architecture.md §7.3",
          "link": "architecture.md#73-storage"
        },
        {
          "id": "orm-or-migration-tool",
          "name": "Exposed, SQLDelight, jOOQ, Flyway or Liquibase",
          "verdict": "declined",
          "why": "Six tables and a few dozen statements; Exposed 1.3+ raises the Kotlin and coroutines floor on every consumer; Liquibase 5 is FSL-licensed.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "The durable half of one system, storage, behind the ports the core foundation defines.",
        "statements": [
          {
            "text": "Build `SqliteStorage` and its connections, the schema with migrations keyed by `user_version`, atomic erasure, `VACUUM INTO` backups and `BackupJob` with a 14-day retention by default.",
            "ref": "roadmap.md#phase-4--sqlite-storage",
            "excerpt": {
              "ref": "roadmap.md#phase-4--sqlite-storage",
              "heading": "Phase 4 — SQLite storage",
              "paragraph": "Scope (architecture §7.3, the `bottools-data-sqlite` half, §14 unit 4): · `SqliteStorage` and its connections; · the schema, with migrations keyed by `user_version`; · atomic erasure; · `VACUUM INTO` backups; · `BackupJob`, with a 14-day retention by default. · Depends on: Phase 2, alongside Phase 3. · Version: `1.0.0-SNAPSHOT`. · Done when: · Level 3, on temporary files: · the port contract suite; · the migration fixtures; · the drift, concurrency, erasure, backup-and-prune and `sqlite_version()` floor tests. · Level 4c: storage under parallel writers.",
              "hash": "20d664d51571"
            }
          },
          {
            "text": "Prove it on temporary files with the port contract suite, the migration fixtures and the drift, concurrency, erasure and backup tests.",
            "ref": "roadmap.md#phase-4--sqlite-storage",
            "excerpt": {
              "ref": "roadmap.md#phase-4--sqlite-storage",
              "heading": "Phase 4 — SQLite storage",
              "paragraph": "Scope (architecture §7.3, the `bottools-data-sqlite` half, §14 unit 4): · `SqliteStorage` and its connections; · the schema, with migrations keyed by `user_version`; · atomic erasure; · `VACUUM INTO` backups; · `BackupJob`, with a 14-day retention by default. · Depends on: Phase 2, alongside Phase 3. · Version: `1.0.0-SNAPSHOT`. · Done when: · Level 3, on temporary files: · the port contract suite; · the migration fixtures; · the drift, concurrency, erasure, backup-and-prune and `sqlite_version()` floor tests. · Level 4c: storage under parallel writers.",
              "hash": "20d664d51571"
            }
          }
        ],
        "source": "architecture.md §14 unit 4",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #6; its run has not started. It starts once #4 has landed."
      }
    },
    {
      "id": "bot-runtime",
      "group": "Foundation",
      "name": "Bot runtime",
      "system": "bot-runtime",
      "where": "bottools-core, com.spartanlabs.bottools.runtime",
      "unit": {
        "n": 6,
        "slug": "bot-runtime",
        "title": "Phase 5 — Bot runtime: plugins, events, gateway, jobs, registration and built-in commands",
        "blockedBy": [
          4,
          5
        ],
        "issue": 7
      },
      "gap": {
        "kind": "debt",
        "summary": "The runtime is tied to global state, so no two bots can share it. `Bot` reads `key.txt` and turns on every intent, `Responder` scans the classpath for event classes, and GKB2's `Bot` companion is coupled to Compose state.",
        "evidence": [
          "`architecture.md:237` — the runtime of both codebases, held on singletons"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "plugin-host-runtime",
          "name": "A plugin host with an event registry and router, gateway resolution and a shard manager, lifecycle, registrar, jobs and messenger over the jda-ktx bridge",
          "verdict": "accepted",
          "source": "architecture.md §7.2",
          "link": "architecture.md#72-bot-runtime"
        },
        {
          "id": "sharedflow-events",
          "name": "A `SharedFlow` per event type",
          "verdict": "declined",
          "why": "A slow collector suspends the emitter, drop policies lose events, and a throwing collector stops listening silently.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "serviceloader-plugins",
          "name": "`ServiceLoader` plugin discovery",
          "verdict": "declined",
          "why": "The umbrella puts every plugin on the classpath, so discovery would widen intents by adding a dependency; fat jars need merged service files.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "job-libraries",
          "name": "Quartz, krontab or cron-utils for jobs",
          "verdict": "declined",
          "why": "Thread-based with its own JDBC schema and misfire replay; the others only compute times.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One system of the library: what runs a bot, which every plugin installs into.",
        "statements": [
          {
            "text": "Build the plugin host, the event registry and router, gateway resolution and the shard manager, the lifecycle, the registrar, jobs and the channel messenger, over the jda-ktx bridge.",
            "ref": "architecture.md#72-bot-runtime",
            "excerpt": {
              "ref": "architecture.md#72-bot-runtime",
              "heading": "7.2 Bot runtime",
              "paragraph": "Owns. `BotConfig` and `Secret`; the plugin host; the frozen event registry and the single router; gateway resolution (intents, cache flags, member policy, chunking) and the `DefaultShardManagerBuilder`; the lifecycle and its order; the registrar; jobs; the channel messenger; the built-in `help` and `privacy` commands; the jda-ktx bridge.",
              "hash": "349364103dbc"
            }
          },
          {
            "text": "Add the built-in `help` and `privacy` commands and the fake `Gateway`; done when one definition answers a slash, a typed and a context-menu invocation through one handler.",
            "ref": "roadmap.md#phase-5--bot-runtime",
            "excerpt": {
              "ref": "roadmap.md#phase-5--bot-runtime",
              "heading": "Phase 5 — Bot runtime",
              "paragraph": "Scope (architecture §7.2, §14 unit 5): · the plugin host; · the event registry and router; · gateway resolution and the shard manager; · the lifecycle; · the registrar; · jobs and the channel messenger; · the jda-ktx bridge; · the built-in `help` and `privacy` commands; · the fake `Gateway`. · Depends on: Phases 2 and 3. · Version: `1.0.0-SNAPSHOT`. · Done when: · against the fake `Gateway`, the runtime starts, answers a command, ticks a job and stops within its timeouts (Level 4b); · one definition answers a slash, a typed and a context-menu invocation through one handler (acceptance …",
              "hash": "aa962ef3946c"
            }
          }
        ],
        "source": "architecture.md §14 unit 5",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #7; its run has not started. It starts once #4 and #5 have landed."
      }
    },
    {
      "id": "http-call-surface",
      "group": "Outbound HTTP",
      "name": "HTTP call surface",
      "system": "outbound-http",
      "where": "bottools-http, its public half",
      "unit": {
        "n": 7,
        "slug": "http-call-surface",
        "title": "Phase 6a — HTTP call surface: the bottools-http API, endpoint vocabulary, failures and test fake",
        "blockedBy": [
          4
        ],
        "issue": 8
      },
      "gap": {
        "kind": "missing",
        "summary": "No HTTP surface owned by the library exists. Online access today is `Connector`, `OnlineAction` and the services family, with page cutting and cookie capture, and GKB2 delegates its `Connector` to WebTools.",
        "evidence": [
          "`architecture.md:239` — the online and services family of both codebases"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "own-call-surface",
          "name": "`bottools-http`'s public half — `ApiClient`, endpoint descriptors, lanes, typed failures, the `Trusted` and `Untrusted` choice and `FakeApiClient` — buildable with no WebTools checkout",
          "verdict": "accepted",
          "source": "architecture.md §7.4",
          "link": "architecture.md#74-outbound-http-bottools-http"
        },
        {
          "id": "surface-in-core",
          "name": "The call surface in `bottools-core`",
          "verdict": "declined",
          "why": "Every bot would carry WebTools and the stack on its runtime classpath, including one that makes no HTTP call; the runtime must not own HTTP.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "surface-in-stats",
          "name": "The call surface in `bottools-stats`",
          "verdict": "declined",
          "why": "The plugins would depend on the stats module for HTTP, and the provider framework's changes would couple to every plugin release.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "expose-webtools-types",
          "name": "WebTools' types exposed to providers and plugins",
          "verdict": "declined",
          "why": "WebTools' tiers and majors would become the library's, and every consumer would pin two coordinates.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "The public half of one system, outbound HTTP, so the stats framework and the plugins can be written against it before WebTools' stack exists.",
        "statements": [
          {
            "text": "Build `ApiClient` and `ApiClientFactory`, `ApiClientSpec` and `HttpConfig`, `Endpoint<T>`, `Lane` and `UrlTrust`, the `RateSignals` reader, `HttpFailure` and the request and response views.",
            "ref": "roadmap.md#phase-6a--http-call-surface",
            "excerpt": {
              "ref": "roadmap.md#phase-6a--http-call-surface",
              "heading": "Phase 6a — HTTP call surface",
              "paragraph": "Scope (architecture §5.2, §7.4, §12, §14 unit 6a). The public half of `bottools-http`: · `ApiClient` and `ApiClientFactory`; · `ApiClientSpec` and `HttpConfig`; · `Endpoint<T>`, `Lane` and `UrlTrust`; · `RateSignalsReader` and `RateSignals`; · `HttpFailure`; · the request and response views; · `FakeApiClient`, in the module's test-fixtures source set. That source set is unpublished and is consumed by the sibling modules' tests inside the build; · the module's Dokka and ABI dump, and the check that the dump names no WebTools package. · Depends on: Phase 2. It needs no WebTools checkout. · …",
              "hash": "16db58c30c2e"
            }
          },
          {
            "text": "Add `FakeApiClient` in the module's unpublished test-fixtures source set, and the check that the ABI dump names no WebTools package.",
            "ref": "roadmap.md#phase-6a--http-call-surface",
            "excerpt": {
              "ref": "roadmap.md#phase-6a--http-call-surface",
              "heading": "Phase 6a — HTTP call surface",
              "paragraph": "Scope (architecture §5.2, §7.4, §12, §14 unit 6a). The public half of `bottools-http`: · `ApiClient` and `ApiClientFactory`; · `ApiClientSpec` and `HttpConfig`; · `Endpoint<T>`, `Lane` and `UrlTrust`; · `RateSignalsReader` and `RateSignals`; · `HttpFailure`; · the request and response views; · `FakeApiClient`, in the module's test-fixtures source set. That source set is unpublished and is consumed by the sibling modules' tests inside the build; · the module's Dokka and ABI dump, and the check that the dump names no WebTools package. · Depends on: Phase 2. It needs no WebTools checkout. · …",
              "hash": "16db58c30c2e"
            }
          }
        ],
        "source": "architecture.md §14 unit 6a",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #8; its run has not started. It starts once #4 has landed."
      }
    },
    {
      "id": "webtools-adapter",
      "group": "Outbound HTTP",
      "name": "WebTools adapter",
      "system": "kotlinbottools",
      "where": "bottools-http, its internal half · the build that consumes WebTools · CI lanes",
      "unit": {
        "n": 8,
        "slug": "webtools-adapter",
        "title": "Phase 6b — WebTools adapter: the internal adapter, composite build, strict pin, alignment checks and CI lanes",
        "blockedBy": [
          8
        ],
        "issue": 9
      },
      "gap": {
        "kind": "missing",
        "summary": "Nothing puts WebTools' stack behind the call surface, and no build consumes WebTools. WebTools' published artifacts are Java 23 bytecode and it publishes no snapshots, so the library builds against a sibling checkout until WebTools releases its stack.",
        "evidence": [
          "`architecture.md:279` — Java 23 bytecode, no CI, changelog or tags",
          "`architecture.md:281` — WebTools publishes no snapshots"
        ],
        "source": "architecture.md §2.2",
        "link": "architecture.md#22-verified-outside-world-facts-the-design-rests-on"
      },
      "options": [
        {
          "id": "internal-adapter-composite",
          "name": "An internal adapter onto WebTools' facade, transport, cache and budget, built through the nested composite with an exact `strictly` pin",
          "verdict": "accepted",
          "source": "architecture.md §5.2, §7.4",
          "link": "architecture.md#74-outbound-http-bottools-http"
        },
        {
          "id": "own-http-stack",
          "name": "Owning the HTTP stack in the library",
          "verdict": "declined",
          "why": "HTTP is WebTools' domain, and a bot also using `webtools-scraping` would carry two transports and two budgets on one classpath.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "webtools-snapshot",
          "name": "A WebTools `-SNAPSHOT` from Central as the development route",
          "verdict": "declined",
          "why": "WebTools publishes none, and Central cleans snapshots up after about 90 days.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "version-ranges",
          "name": "Version ranges or a shorthand floor for the WebTools pin",
          "verdict": "declined",
          "why": "Unreproducible POMs; Gradle may raise a floor through conflict resolution.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "The internal half of outbound HTTP and the build and CI that consume WebTools, provisional where WebTools#55's open questions reach it.",
        "statements": [
          {
            "text": "Build the internal adapter onto WebTools' facade, transport, cache and budget, with the bridge from the library's clock and the mapping of WebTools' failures to `HttpFailure`.",
            "ref": "roadmap.md#phase-6b--webtools-adapter",
            "excerpt": {
              "ref": "roadmap.md#phase-6b--webtools-adapter",
              "heading": "Phase 6b — WebTools adapter",
              "paragraph": "Scope (architecture §5.2, §5.4, §7.4, §9, §10.7, §14 unit 6b): · The adapter, which is internal. It puts WebTools' facade, transport, cache and budget behind the call surface, with: · the bridge from the library's clock; · the mapping of WebTools' failures to `HttpFailure`. · The build that consumes WebTools: · the nested composite include, with its `-D` switches; · `webtools.ref`; · the exact `strictly` pin, and its assertion in `verifyReleasableMetadata`; · the `build-logic` constraints, and `verifyClasspathAlignment`. · CI: the composite lane, the published lane and the drift build. · …",
              "hash": "fb0cf0319a4f"
            }
          },
          {
            "text": "Consume WebTools through the nested composite include with its `-D` switches, `webtools.ref` and an exact `strictly` pin, with `verifyClasspathAlignment`, the composite and published CI lanes and the drift build.",
            "ref": "roadmap.md#phase-6b--webtools-adapter",
            "excerpt": {
              "ref": "roadmap.md#phase-6b--webtools-adapter",
              "heading": "Phase 6b — WebTools adapter",
              "paragraph": "Scope (architecture §5.2, §5.4, §7.4, §9, §10.7, §14 unit 6b): · The adapter, which is internal. It puts WebTools' facade, transport, cache and budget behind the call surface, with: · the bridge from the library's clock; · the mapping of WebTools' failures to `HttpFailure`. · The build that consumes WebTools: · the nested composite include, with its `-D` switches; · `webtools.ref`; · the exact `strictly` pin, and its assertion in `verifyReleasableMetadata`; · the `build-logic` constraints, and `verifyClasspathAlignment`. · CI: the composite lane, the published lane and the drift build. · …",
              "hash": "fb0cf0319a4f"
            }
          },
          {
            "text": "Starts once the call surface has landed and WebTools' code from WebTools#55 is in a sibling checkout.",
            "ref": "architecture.md#14-decomposition",
            "excerpt": {
              "ref": "architecture.md#14-decomposition",
              "heading": "14. Decomposition",
              "paragraph": "Each unit is one system or one coherent cluster that can be planned and implemented on its own. The roadmap turns this list into phases, sub-issues and target versions; the landing order below is a dependency order, not a schedule.",
              "hash": "a80b8e007f78"
            }
          }
        ],
        "source": "architecture.md §14 unit 6b",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #9; its run has not started. It starts once #8 has landed."
      }
    },
    {
      "id": "stats-provider-framework",
      "group": "Stats and plugins",
      "name": "Stats provider framework",
      "system": "stats-framework",
      "where": "bottools-stats",
      "unit": {
        "n": 9,
        "slug": "stats-provider-framework",
        "title": "Phase 7 — Stats provider framework: provider SPI, account links, match tracker and game news",
        "blockedBy": [
          7,
          8
        ],
        "issue": 10
      },
      "gap": {
        "kind": "missing",
        "summary": "Game statistics exist only as scrape-based test code. Dota 2 lives in test scope with `showStats` a stub, and GKB2's Path of Exile code takes screenshots of poe.ninja.",
        "evidence": [
          "`architecture.md:241` — Dota 2 in test scope, scrape-based, with `showStats` a stub"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "capability-spi",
          "name": "A capability-based provider SPI, `AccountRef`, the link service, `MatchTracker` with `PollingPolicy` and `GameNewsSource`, every call through an `ApiClient`",
          "verdict": "accepted",
          "source": "architecture.md §7.5",
          "link": "architecture.md#75-stats-framework"
        },
        {
          "id": "sealed-accountref",
          "name": "A sealed `AccountRef`",
          "verdict": "declined",
          "why": "The library would have to know every game's identity scheme, and MagicBot's later games live outside it.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        },
        {
          "id": "tracking-table",
          "name": "A dedicated `tracking_subscription` table plus ad-hoc feed storage",
          "verdict": "declined",
          "why": "Match feeds, game news and RSS feeds share one shape, served by one `SubscriptionStore` with a kind namespace and erased in one place.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One system of the library: what every game provider, MagicBot's first among them, is written against.",
        "statements": [
          {
            "text": "Build the provider SPI and its capabilities, `AccountRef`, the link service, `GameRegistration` and `GameCommands`, `MatchTracker` with its `PollingPolicy`, `GameNewsSource` with `SteamNewsSource`, and `NewsJob`.",
            "ref": "roadmap.md#phase-7--stats-provider-framework",
            "excerpt": {
              "ref": "roadmap.md#phase-7--stats-provider-framework",
              "heading": "Phase 7 — Stats provider framework",
              "paragraph": "Scope (architecture §7.5, §14 unit 7): · the provider SPI and its capabilities; · `AccountRef`; · the link service; · `GameRegistration` and `GameCommands`; · `MatchTracker`, with its `PollingPolicy`; · `GameNewsSource`, with `SteamNewsSource`; · `NewsJob`.",
              "hash": "adde6ca26531"
            }
          },
          {
            "text": "Every call goes through an `ApiClient`, tested on `FakeApiClient` until the adapter exists.",
            "ref": "architecture.md#75-stats-framework",
            "excerpt": {
              "ref": "architecture.md#75-stats-framework",
              "heading": "7.5 Stats framework",
              "paragraph": "Consumes. `ApiClient` from `bottools-http` (§7.4); no WebTools type. Per provider the framework or the provider supplies the `ApiClientSpec` (budget windows from the published limits, lanes' shares), the `Endpoint<T>` descriptors, the `UrlTrust` (always `Trusted` for a game API), the `RateSignalsReader`, and the decode functions over the provider's own `internal` wire types.",
              "hash": "ed7365290c75"
            }
          }
        ],
        "source": "architecture.md §14 unit 7",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #10; its run has not started. It starts once #7 and #8 have landed."
      }
    },
    {
      "id": "plugin-reaction-roles",
      "group": "Stats and plugins",
      "name": "Reaction-roles plugin",
      "system": "plugins",
      "where": "bottools-plugins, reactionroles",
      "unit": {
        "n": 10,
        "slug": "plugin-reaction-roles",
        "title": "Phase 8 — Reaction-roles plugin, with the default role and welcome message on join",
        "blockedBy": [
          7
        ],
        "issue": 11
      },
      "gap": {
        "kind": "missing",
        "summary": "Reaction roles exist in both codebases and in neither as a plugin. GKB2's welcome-message record is broken, and KotlinBottools keeps its records in `ReactionRoles.xml`.",
        "evidence": [
          "`architecture.md:240` — reaction roles in both codebases, GKB2's welcome-message record broken"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "reaction-roles-plugin",
          "name": "A reaction-roles plugin, with the default role and welcome message as an optional feature that needs `GUILD_MEMBERS`",
          "verdict": "accepted",
          "source": "architecture.md §7.6",
          "link": "architecture.md#76-plugins"
        },
        {
          "id": "full-jda-wrapper",
          "name": "A full wrapper over JDA",
          "verdict": "declined",
          "why": "A second API to maintain for every JDA feature; the lighter line is JDA-visible in three documented places.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One plugin over the runtime's contracts, carrying over the behaviour of both codebases and none of their code.",
        "statements": [
          {
            "text": "Build the reaction-roles plugin, with its join features — the default role and the welcome message — as an optional feature that needs `GUILD_MEMBERS`.",
            "ref": "roadmap.md#phase-8--reaction-roles-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-8--reaction-roles-plugin",
              "heading": "Phase 8 — Reaction-roles plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 8): · the plugin; · its join features (the default role and the welcome message), as an optional feature that needs `GUILD_MEMBERS`. · Depends on: Phase 5. · Version: `1.0.0-SNAPSHOT`. · Done when (Levels 2 and 4b): · roles are granted and revoked on recorded welcome messages only; · nothing acts on join until both settings are configured; · a role the bot cannot assign is reported, never thrown.",
              "hash": "efae378f1ab2"
            }
          },
          {
            "text": "Grant and revoke roles on recorded welcome messages only, act on join only once both settings are configured, and report a role the bot cannot assign, never throw.",
            "ref": "roadmap.md#phase-8--reaction-roles-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-8--reaction-roles-plugin",
              "heading": "Phase 8 — Reaction-roles plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 8): · the plugin; · its join features (the default role and the welcome message), as an optional feature that needs `GUILD_MEMBERS`. · Depends on: Phase 5. · Version: `1.0.0-SNAPSHOT`. · Done when (Levels 2 and 4b): · roles are granted and revoked on recorded welcome messages only; · nothing acts on join until both settings are configured; · a role the bot cannot assign is reported, never thrown.",
              "hash": "efae378f1ab2"
            }
          }
        ],
        "source": "architecture.md §14 unit 8",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #11; its run has not started. It starts once #7 has landed."
      }
    },
    {
      "id": "plugin-math",
      "group": "Stats and plugins",
      "name": "Math plugin",
      "system": "plugins",
      "where": "bottools-plugins, math",
      "unit": {
        "n": 11,
        "slug": "plugin-math",
        "title": "Phase 9 — Math plugin",
        "blockedBy": [
          7
        ],
        "issue": 12
      },
      "gap": {
        "kind": "missing",
        "summary": "Math exists only as GKB2's `MathCommand`, on the old command family.",
        "evidence": [
          "`architecture.md:240` — GKB2's `plugins/math/MathCommand`"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "math-plugin",
          "name": "`ExpressionEvaluator`, a precedence-correct parser with bounded evaluation, and the `math` command as a plugin",
          "verdict": "accepted",
          "source": "architecture.md §7.6",
          "link": "architecture.md#76-plugins"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One small plugin over the runtime's contracts.",
        "statements": [
          {
            "text": "Build `ExpressionEvaluator` and the `math` command.",
            "ref": "roadmap.md#phase-9--math-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-9--math-plugin",
              "heading": "Phase 9 — Math plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 9): `ExpressionEvaluator` and the `math` command. · Depends on: Phase 5. · Version: `1.0.0-SNAPSHOT`. · Done when: · these pass as tables (Level 4a): · precedence; · right-associative `^`; · radians, with degree variants; · the depth and length caps; · a parse error names its position.",
              "hash": "db31d045d926"
            }
          },
          {
            "text": "Precedence, right-associative `^`, radians with degree variants and the depth and length caps pass as tables, and a parse error names its position.",
            "ref": "roadmap.md#phase-9--math-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-9--math-plugin",
              "heading": "Phase 9 — Math plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 9): `ExpressionEvaluator` and the `math` command. · Depends on: Phase 5. · Version: `1.0.0-SNAPSHOT`. · Done when: · these pass as tables (Level 4a): · precedence; · right-associative `^`; · radians, with degree variants; · the depth and length caps; · a parse error names its position.",
              "hash": "db31d045d926"
            }
          }
        ],
        "source": "architecture.md §14 unit 9",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #12; its run has not started. It starts once #7 has landed."
      }
    },
    {
      "id": "plugin-admin",
      "group": "Stats and plugins",
      "name": "Admin plugin",
      "system": "plugins",
      "where": "bottools-plugins, admin",
      "unit": {
        "n": 12,
        "slug": "plugin-admin",
        "title": "Phase 10 — Admin plugin: typed get and set over guild settings",
        "blockedBy": [
          7
        ],
        "issue": 13
      },
      "gap": {
        "kind": "missing",
        "summary": "A guild's administrators cannot read or change its settings. GKB2's `admin` command is dead.",
        "evidence": [
          "`architecture.md:253` — GKB2's `admin` is dead"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "admin-plugin",
          "name": "Typed get and set over the settings registry the plugins contribute, and plugins enabled or disabled per guild, for administrators only",
          "verdict": "accepted",
          "source": "architecture.md §7.6",
          "link": "architecture.md#76-plugins"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One plugin over the runtime's contracts and the settings port.",
        "statements": [
          {
            "text": "Build typed get and set over the settings registry the plugins contribute, and enabling and disabling plugins per guild, for administrators only.",
            "ref": "roadmap.md#phase-10--admin-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-10--admin-plugin",
              "heading": "Phase 10 — Admin plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 10): · typed get and set over the settings registry the plugins contribute; · enabling and disabling plugins per guild; · available to administrators only. · Depends on: Phase 5. · Version: `1.0.0-SNAPSHOT`. · Done when (Levels 2 and 4b): · every registered setting reads and writes through its codec; · a non-administrator is denied.",
              "hash": "e4a016c8d771"
            }
          },
          {
            "text": "Every registered setting reads and writes through its codec, and a non-administrator is denied.",
            "ref": "roadmap.md#phase-10--admin-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-10--admin-plugin",
              "heading": "Phase 10 — Admin plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 10): · typed get and set over the settings registry the plugins contribute; · enabling and disabling plugins per guild; · available to administrators only. · Depends on: Phase 5. · Version: `1.0.0-SNAPSHOT`. · Done when (Levels 2 and 4b): · every registered setting reads and writes through its codec; · a non-administrator is denied.",
              "hash": "e4a016c8d771"
            }
          }
        ],
        "source": "architecture.md §14 unit 10",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #13; its run has not started. It starts once #7 has landed."
      }
    },
    {
      "id": "plugin-weather",
      "group": "Stats and plugins",
      "name": "Weather plugin",
      "system": "plugins",
      "where": "bottools-plugins, weather",
      "unit": {
        "n": 13,
        "slug": "plugin-weather",
        "title": "Phase 11 — Weather plugin: conditions and forecast from Open-Meteo",
        "blockedBy": [
          7,
          8
        ],
        "issue": 14
      },
      "gap": {
        "kind": "missing",
        "summary": "Weather exists only as GKB2's `WeatherCommand`, with a zip-code lookup alone.",
        "evidence": [
          "`architecture.md:240` — GKB2's `plugins/weather/WeatherCommand` with a zip-code lookup only"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "weather-plugin",
          "name": "`Geocoder` and `WeatherProvider` ports with Open-Meteo and Zippopotam over `Trusted` `ApiClient`s, the `weather` command and its aliases",
          "verdict": "accepted",
          "source": "architecture.md §7.6",
          "link": "architecture.md#76-plugins"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One plugin over the runtime's contracts and the call surface.",
        "statements": [
          {
            "text": "Build the `Geocoder` and `WeatherProvider` ports, the Open-Meteo and Zippopotam implementations over `Trusted` `ApiClient`s, and the `weather` command and its aliases, with attribution in every reply.",
            "ref": "roadmap.md#phase-11--weather-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-11--weather-plugin",
              "heading": "Phase 11 — Weather plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 11): · the `Geocoder` and `WeatherProvider` ports; · the Open-Meteo and Zippopotam implementations, each over a `Trusted` `ApiClient`; · the `weather` command and its aliases; · attribution in every reply. · Depends on: Phases 5 and 6a. Its Level 3 tests wait for Phase 6b. · Version: `1.0.0-SNAPSHOT`. · Done when: · both sources pass against `mockwebserver3` (Level 3); · an ambiguous name or a bare postal code asks the user to choose; · an unknown weather code is kept, not dropped.",
              "hash": "2be3c8b1401f"
            }
          },
          {
            "text": "An ambiguous name or a bare postal code asks the user to choose, and an unknown weather code is kept, not dropped.",
            "ref": "roadmap.md#phase-11--weather-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-11--weather-plugin",
              "heading": "Phase 11 — Weather plugin",
              "paragraph": "Scope (architecture §7.6, §14 unit 11): · the `Geocoder` and `WeatherProvider` ports; · the Open-Meteo and Zippopotam implementations, each over a `Trusted` `ApiClient`; · the `weather` command and its aliases; · attribution in every reply. · Depends on: Phases 5 and 6a. Its Level 3 tests wait for Phase 6b. · Version: `1.0.0-SNAPSHOT`. · Done when: · both sources pass against `mockwebserver3` (Level 3); · an ambiguous name or a bare postal code asks the user to choose; · an unknown weather code is kept, not dropped.",
              "hash": "2be3c8b1401f"
            }
          }
        ],
        "source": "architecture.md §14 unit 11",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #14; its run has not started. It starts once #7 and #8 have landed."
      }
    },
    {
      "id": "plugin-feeds",
      "group": "Stats and plugins",
      "name": "Feeds plugin",
      "system": "plugins",
      "where": "bottools-plugins, feeds",
      "unit": {
        "n": 14,
        "slug": "plugin-feeds",
        "title": "Phase 12 — Feeds plugin: RSS and Atom subscriptions with content safeguards",
        "blockedBy": [
          7,
          8
        ],
        "issue": 15
      },
      "gap": {
        "kind": "missing",
        "summary": "Feeds exist only as `RssService` on the old services family, built on Rome 1.18.0.",
        "evidence": [
          "`architecture.md:239` — `RssService` on the services family"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "feeds-plugin",
          "name": "`FeedParser` with Rome, `FeedUrlPolicy`, the subscription commands and `FeedPollJob` over an `Untrusted` `ApiClient`, with the content safeguards",
          "verdict": "accepted",
          "source": "architecture.md §7.6, §8.4",
          "link": "architecture.md#76-plugins"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "One plugin over the runtime's contracts and the call surface; where `FeedParser` lives is provisional on WebTools#55.",
        "statements": [
          {
            "text": "Build `FeedParser` with Rome behind it, `FeedUrlPolicy`, the subscription commands and `FeedPollJob` over an `Untrusted` `ApiClient`.",
            "ref": "roadmap.md#phase-12--feeds-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-12--feeds-plugin",
              "heading": "Phase 12 — Feeds plugin",
              "paragraph": "Scope (architecture §7.6, §8.4, §14 unit 12): · `FeedParser`, with Rome behind it. Where it lives is *provisional* (#55). · `FeedUrlPolicy`. · The subscription commands. · `FeedPollJob`, over an `Untrusted` `ApiClient`. · The content safeguards: · only administrators subscribe; · every post names its source host and carries no media; · any administrator can remove a subscription; · the report route covers feed content. · Depends on: Phases 5 and 6a. Its Level 3 tests wait for Phase 6b. · Version: `1.0.0-SNAPSHOT`. · Done when: · these pass against `mockwebserver3` (Level 3): · the `Untrusted` …",
              "hash": "6e8a057d1467"
            }
          },
          {
            "text": "Only administrators subscribe, every post names its source host and carries no media, any administrator can remove a subscription, and the report route covers feed content.",
            "ref": "roadmap.md#phase-12--feeds-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-12--feeds-plugin",
              "heading": "Phase 12 — Feeds plugin",
              "paragraph": "Scope (architecture §7.6, §8.4, §14 unit 12): · `FeedParser`, with Rome behind it. Where it lives is *provisional* (#55). · `FeedUrlPolicy`. · The subscription commands. · `FeedPollJob`, over an `Untrusted` `ApiClient`. · The content safeguards: · only administrators subscribe; · every post names its source host and carries no media; · any administrator can remove a subscription; · the report route covers feed content. · Depends on: Phases 5 and 6a. Its Level 3 tests wait for Phase 6b. · Version: `1.0.0-SNAPSHOT`. · Done when: · these pass against `mockwebserver3` (Level 3): · the `Untrusted` …",
              "hash": "6e8a057d1467"
            }
          }
        ],
        "source": "architecture.md §14 unit 12",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #15; its run has not started. It starts once #7 and #8 have landed."
      }
    },
    {
      "id": "release-1-0-0-and-archive",
      "group": "Release",
      "name": "Release 1.0.0 and archive the predecessors",
      "system": "kotlinbottools",
      "where": "the release · Maven Central · the predecessor repositories",
      "unit": {
        "n": 15,
        "slug": "release-1.0.0-and-archive",
        "title": "Phase 17 — Release 1.0.0 to Maven Central and archive the predecessor repositories",
        "blockedBy": [
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15
        ],
        "issue": 16
      },
      "gap": {
        "kind": "missing",
        "summary": "Nothing of the library is released, and the predecessor repositories stay open. The library's `1.0.0` waits on WebTools' release of WebTools#55, and the predecessors' open issues are still open.",
        "evidence": [
          "`architecture.md:1655` — the release order, the predecessors' open issues closed, then the archiving",
          "`architecture.md:301` — the library's `1.0.0` waits for WebTools' release"
        ],
        "source": "architecture.md §3, §14 unit 17",
        "link": "architecture.md#14-decomposition"
      },
      "options": [
        {
          "id": "release-in-order",
          "name": "Release in order — WebTools first, then the published lane, then `bottools` `1.0.0` by hand — and archive the predecessors once their open issues are closed",
          "verdict": "accepted",
          "source": "architecture.md §14 unit 17",
          "link": "architecture.md#14-decomposition"
        },
        {
          "id": "plain-require-pins",
          "name": "A plain `require` on the pins the library controls",
          "verdict": "declined",
          "why": "A lettered bug fix sorts below its plain version in Gradle and would be dropped silently by conflict resolution; `strictly` is what the organisation's guide prescribes.",
          "source": "architecture.md §13",
          "link": "architecture.md#13-alternatives-considered"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "The release of the whole library and the end of its predecessors: complete when MagicBot `1.0.0` runs on the published `bottools` `1.0.0`.",
        "statements": [
          {
            "text": "Wait for WebTools' release of WebTools#55 to resolve from Maven Central, then pass the published lane with `verifyReleasableMetadata` confirming the `strictly` pins and no `-SNAPSHOT`.",
            "ref": "roadmap.md#phase-17--release-100-and-archive-the-predecessors",
            "excerpt": {
              "ref": "roadmap.md#phase-17--release-100-and-archive-the-predecessors",
              "heading": "Phase 17 — Release 1.0.0 and archive the predecessors",
              "paragraph": "Scope (architecture §10.7, §11, §14 unit 17), in this order: · The WebTools release. WebTools releases #55's stack: · tagged, with a changelog entry (WebTools#58); · meeting the three conditions recorded on #55: · a JVM target of 21 or lower (WebTools#47); · Kotlin metadata readable by 2.2.x; · no `-SNAPSHOT`.",
              "hash": "d51db33e8ad1"
            }
          },
          {
            "text": "Finish the release documents, publish `bottools` `1.0.0` by hand and tag it `v1.0.0`.",
            "ref": "roadmap.md#phase-17--release-100-and-archive-the-predecessors",
            "excerpt": {
              "ref": "roadmap.md#phase-17--release-100-and-archive-the-predecessors",
              "heading": "Phase 17 — Release 1.0.0 and archive the predecessors",
              "paragraph": "Scope (architecture §10.7, §11, §14 unit 17), in this order: · The WebTools release. WebTools releases #55's stack: · tagged, with a changelog entry (WebTools#58); · meeting the three conditions recorded on #55: · a JVM target of 21 or lower (WebTools#47); · Kotlin metadata readable by 2.2.x; · no `-SNAPSHOT`.",
              "hash": "d51db33e8ad1"
            }
          },
          {
            "text": "Close the predecessors' open issues, each pointing to what replaces it, commit a README pointer in each, then archive GKB2, GKB, BotTools and the private repositories.",
            "ref": "roadmap.md#phase-17--release-100-and-archive-the-predecessors",
            "excerpt": {
              "ref": "roadmap.md#phase-17--release-100-and-archive-the-predecessors",
              "heading": "Phase 17 — Release 1.0.0 and archive the predecessors",
              "paragraph": "Scope (architecture §10.7, §11, §14 unit 17), in this order: · The WebTools release. WebTools releases #55's stack: · tagged, with a changelog entry (WebTools#58); · meeting the three conditions recorded on #55: · a JVM target of 21 or lower (WebTools#47); · Kotlin metadata readable by 2.2.x; · no `-SNAPSHOT`.",
              "hash": "d51db33e8ad1"
            }
          },
          {
            "text": "Starts once every earlier unit, MagicBot's units 13 to 16 and WebTools' release have landed.",
            "ref": "architecture.md#14-decomposition",
            "excerpt": {
              "ref": "architecture.md#14-decomposition",
              "heading": "14. Decomposition",
              "paragraph": "Each unit is one system or one coherent cluster that can be planned and implemented on its own. The roadmap turns this list into phases, sub-issues and target versions; the landing order below is a dependency order, not a schedule.",
              "hash": "a80b8e007f78"
            }
          }
        ],
        "source": "architecture.md §14 unit 17",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #16; its run has not started. It starts once #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14 and #15 have landed."
      }
    },
    {
      "id": "test-fixtures-artifact",
      "group": "After 1.0.0",
      "name": "Published test fixtures",
      "system": "kotlinbottools",
      "where": "the test fixtures of bottools-http, bottools-core and bottools-stats",
      "unit": {
        "n": 16,
        "slug": "test-fixtures-artifact",
        "title": "Phase 18 — Published test fixtures for plugin and provider authors (Experimental)",
        "blockedBy": [
          16
        ],
        "issue": 17
      },
      "gap": {
        "kind": "missing",
        "summary": "Plugin and provider authors outside the library have no published fakes. `FakeApiClient`, `FakeCommandContext` and the fake `Gateway` stay unpublished in test sources until the decision on publishing them is made after `1.0.0`.",
        "evidence": [
          "`architecture.md:1656` — every fake stays unpublished in test sources until then"
        ],
        "source": "architecture.md §14 unit 18, §17",
        "link": "architecture.md#14-decomposition"
      },
      "options": [
        {
          "id": "publish-fixtures",
          "name": "Publish the test fixtures of `bottools-http`, `bottools-core` and `bottools-stats`, Experimental",
          "verdict": "accepted",
          "source": "architecture.md §14 unit 18",
          "link": "architecture.md#14-decomposition"
        },
        {
          "id": "scripted-transport-factory",
          "name": "A scripted-transport `ApiClientFactory` that runs the real adapter over WebTools' fake transport",
          "verdict": "deferred",
          "why": "It ships under one of the two options of the decision on publishing the fakes and is left out under the other; that decision is taken after `1.0.0`.",
          "source": "architecture.md §17",
          "link": "architecture.md#17-considerations"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "A feature release after `1.0.0`, blocked until the decision on publishing the fakes is made.",
        "statements": [
          {
            "text": "Publish `FakeApiClient`, `FakeCommandContext` with the fake `Gateway`, and the provider test helpers as Experimental test fixtures, with MagicBot as their first consumer.",
            "ref": "roadmap.md#phase-18--published-test-fixtures",
            "excerpt": {
              "ref": "roadmap.md#phase-18--published-test-fixtures",
              "heading": "Phase 18 — Published test fixtures",
              "paragraph": "Scope (architecture §14 unit 18, §17 C1): · Publish the test fixtures, Experimental: · `FakeApiClient`, from `bottools-http`; · `FakeCommandContext` and the fake `Gateway`, from `bottools-core`; · the provider test helpers, from `bottools-stats`. · A scripted-transport `ApiClientFactory`. It runs the real adapter over WebTools' fake transport. Under C1 option (a) it ships; under (b) it is left out. · The first consumer is MagicBot, which proves the seam. · Depends on: · Phase 17; · architecture §17 C1, which is deferred until after `1.0.0`. It blocks this phase until it is decided. · Version: …",
              "hash": "35dac452602e"
            }
          },
          {
            "text": "Starts after the `1.0.0` release, once the decision on publishing the fakes is made.",
            "ref": "roadmap.md#phase-18--published-test-fixtures",
            "excerpt": {
              "ref": "roadmap.md#phase-18--published-test-fixtures",
              "heading": "Phase 18 — Published test fixtures",
              "paragraph": "Scope (architecture §14 unit 18, §17 C1): · Publish the test fixtures, Experimental: · `FakeApiClient`, from `bottools-http`; · `FakeCommandContext` and the fake `Gateway`, from `bottools-core`; · the provider test helpers, from `bottools-stats`. · A scripted-transport `ApiClientFactory`. It runs the real adapter over WebTools' fake transport. Under C1 option (a) it ships; under (b) it is left out. · The first consumer is MagicBot, which proves the seam. · Depends on: · Phase 17; · architecture §17 C1, which is deferred until after `1.0.0`. It blocks this phase until it is decided. · Version: …",
              "hash": "35dac452602e"
            }
          }
        ],
        "source": "architecture.md §14 unit 18",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #17; its run has not started. It starts once #16 has landed."
      }
    },
    {
      "id": "poker",
      "group": "After 1.0.0",
      "name": "Poker plugin",
      "system": "plugins",
      "where": "bottools-plugins, poker",
      "unit": {
        "n": 17,
        "slug": "poker",
        "title": "Phase 19 — Poker plugin: playable Texas hold 'em (Experimental)",
        "blockedBy": [
          5,
          16
        ],
        "issue": 18
      },
      "gap": {
        "kind": "missing",
        "summary": "Poker is only a table-and-seat skeleton in GKB2.",
        "evidence": [
          "`architecture.md:240` — GKB2's `plugins/poker/*`, a table and seat skeleton"
        ],
        "source": "architecture.md §2.1",
        "link": "architecture.md#21-what-exists-today-by-symbol"
      },
      "options": [
        {
          "id": "poker-plugin",
          "name": "Playable Texas hold 'em as a plugin, Experimental until one full game has been played",
          "verdict": "accepted",
          "source": "architecture.md §10.5, §14 unit 19",
          "link": "architecture.md#105-plugins"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "A feature release after `1.0.0`: one plugin, its systems named and not designed.",
        "statements": [
          {
            "text": "Build playable Texas hold 'em as a plugin, Experimental until one full game has been played, with GKB2's table, seat and button flow as the idea carried over.",
            "ref": "roadmap.md#phase-19--poker-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-19--poker-plugin",
              "heading": "Phase 19 — Poker plugin",
              "paragraph": "Scope (architecture §10.5, §14 unit 19): · playable Texas hold 'em as a plugin; · Experimental until one full game has been played; · GKB2's table, seat and button flow is the idea carried over.",
              "hash": "71bb2708537a"
            }
          },
          {
            "text": "Starts after the `1.0.0` release, on the command model's component routes.",
            "ref": "roadmap.md#phase-19--poker-plugin",
            "excerpt": {
              "ref": "roadmap.md#phase-19--poker-plugin",
              "heading": "Phase 19 — Poker plugin",
              "paragraph": "Scope (architecture §10.5, §14 unit 19): · playable Texas hold 'em as a plugin; · Experimental until one full game has been played; · GKB2's table, seat and button flow is the idea carried over.",
              "hash": "71bb2708537a"
            }
          }
        ],
        "source": "architecture.md §14 unit 19",
        "link": "architecture.md#14-decomposition"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #18; its run has not started. It starts once #5 and #16 have landed."
      }
    },
    {
      "id": "desktop-manager",
      "group": "After 1.0.0",
      "name": "Desktop manager",
      "system": "kotlinbottools",
      "where": "SpartanUI and SpartanGraphics · not designed",
      "unit": {
        "n": 18,
        "slug": "desktop-manager",
        "title": "Phase 23 — Desktop manager on SpartanUI and SpartanGraphics (unscheduled)",
        "blockedBy": [],
        "issue": 19
      },
      "gap": {
        "kind": "missing",
        "summary": "No management interface exists, and none is designed. No management seam is promised at `1.0.0`.",
        "evidence": [
          "`architecture.md:312` — a desktop manager is an unscheduled last phase, not designed"
        ],
        "source": "architecture.md §4",
        "link": "architecture.md#4-non-goals"
      },
      "options": [
        {
          "id": "unscheduled-last-phase",
          "name": "An unscheduled last phase, designed once SpartanUI and SpartanGraphics hold something usable",
          "verdict": "accepted",
          "source": "architecture.md §4",
          "link": "architecture.md#4-non-goals"
        }
      ],
      "verdict": {
        "kind": "build",
        "defense": "Unscheduled: it waits on two other repositories holding something usable, and moves no version.",
        "statements": [
          {
            "text": "Build a desktop manager on SpartanUI and SpartanGraphics once both hold something usable; it is not designed here.",
            "ref": "roadmap.md#phase-23--desktop-manager",
            "excerpt": {
              "ref": "roadmap.md#phase-23--desktop-manager",
              "heading": "Phase 23 — Desktop manager",
              "paragraph": "Scope: · a desktop manager on SpartanUI and SpartanGraphics; · not designed (architecture §4); · no management seam is promised before it. · Depends on: SpartanUI and SpartanGraphics holding something usable. Today both hold documents only. · Version: none; it is unscheduled.",
              "hash": "36caec42854e"
            }
          }
        ],
        "source": "roadmap.md §4",
        "link": "roadmap.md#phase-23--desktop-manager"
      },
      "asBuilt": {
        "state": "pending",
        "summary": "Filed as #19; its run has not started. It is unscheduled: it waits on SpartanUI and SpartanGraphics holding something usable."
      }
    }
  ],
  "impact": {
    "basis": "plan",
    "summary": "The library is new: six artifacts under `io.github.spartanlaboratories:bottools-*` and the packages `com.spartanlabs.bottools.*`, released as `1.0.0` by the release unit, with nothing but snapshots published before it. Both codebases are superseded whole and the `7.x` line ends without a release, which breaks no consumer, as none exists outside the bot repositories. The history rewrite changes every commit id in the six bot repositories, and the five predecessors are archived once their open issues are closed.",
    "release": {
      "bump": "none",
      "version": null,
      "note": "the tracking issue moves no version itself: the release unit publishes `1.0.0`, every build before it is `1.0.0-SNAPSHOT`, and later units ship as feature releases"
    },
    "none": null,
    "downstream": [
      {
        "who": "The six bot repositories' histories",
        "kind": "repository",
        "system": null,
        "effect": "breaking",
        "summary": "Every commit id changes in all six. KotlinBottools becomes public as a fresh repository with every number reproduced, its pre-rewrite repository private and archived under its legacy name; GKB2's and BotTools' pull-request refs and every cached view stay, measured and reported.",
        "link": "consequences.md#21-the-six-repositories-and-their-history"
      },
      {
        "who": "The predecessor repositories",
        "kind": "repository",
        "system": null,
        "effect": "breaking",
        "summary": "GKB2, GKB, BotTools and the private repositories are archived by the release unit, read-only, after their open issues are closed, each with a README pointer to `bottools`.",
        "link": "consequences.md#21-the-six-repositories-and-their-history"
      },
      {
        "who": "The `7.x` line of KotlinBottools",
        "kind": "artifact",
        "system": null,
        "effect": "none",
        "summary": "Both codebases are superseded whole and no class carries over, but neither has ever been published or is referenced outside the bot repositories, so ending the line without a release breaks no consumer.",
        "link": "consequences.md#22-consumers"
      },
      {
        "who": "Maven Central",
        "kind": "artifact",
        "system": null,
        "effect": "additive",
        "summary": "New artifact ids, `io.github.spartanlaboratories:bottools-*`, six sharing one version; snapshots once they are enabled on the namespace, republished at least every 90 days; releases published by hand and signed.",
        "link": "consequences.md#24-outside-github"
      }
    ],
    "adaptation": [
      {
        "who": "WebTools",
        "system": null,
        "need": "required",
        "summary": "WebTools#55's stack, a JVM target of 21 or lower and its CI, changelog and tags gate `1.0.0`. The library consumes it as an `implementation` dependency of `bottools-http` alone, pinned exactly with `strictly` and built from a sibling checkout until it releases.",
        "link": "consequences.md#23-other-repositories-in-the-organisation"
      },
      {
        "who": "MagicBot",
        "system": null,
        "need": "required",
        "summary": "New, and public from creation: the first consumer, coding against `bottools` alone, with its own tracking issue and plans in its repository.",
        "link": "consequences.md#22-consumers"
      }
    ],
    "api": [],
    "conversion": [],
    "source": "consequences.md",
    "link": "consequences.md#2-blast-radius",
    "units": [
      {
        "unit": "history-rewrite",
        "basis": "as-built",
        "summary": "No module was published and no version moved. Every commit id changed in all six repositories, ten commits pruned: GKB2, GKB, BotTools and the private repositories were force-pushed in place, and KotlinBottools became public as a fresh repository with every number reproduced, the pre-rewrite repository private and archived under its legacy name. On `main`, the path scrub replaced the machine-local paths in two KotlinBottools source files, and the rest is repository infrastructure. GitHub still serves the old objects by id, as the residual-exposure report states.",
        "release": {
          "bump": "none",
          "version": null,
          "note": "no module was published and no version moved",
          "nothingPublished": true
        },
        "source": "2-phase-0-history-rewrite/consequences.md §1, §2",
        "link": "2-phase-0-history-rewrite/consequences.md#2-blast-radius",
        "changes": [
          {
            "what": "KotlinBottools' pre-rewrite objects were anonymously readable from 2026-11-08 until the swap made the pre-rewrite repository private on 2026-11-11.",
            "why": "KotlinBottools was public before the swap, and the window cannot be undone, so the residual-exposure report states it.",
            "when": "#22 landing",
            "ref": "2-phase-0-history-rewrite/consequences.md#21-the-six-repositories"
          },
          {
            "what": "Every number was reproduced, 1 to 31, and the transfers kept all 91 links; the moved texts, and other repositories' references to moved issues, name `KotlinBottools-next`.",
            "why": "No transfer dropped a link, and a transfer rewrites references to full names, as the rehearsal and the walk measured.",
            "when": "#23 landing",
            "ref": "2-phase-0-history-rewrite/consequences.md#23-issue-numbers-and-links"
          },
          {
            "what": "The 17 planning-branch links in MagicBot's and WebTools' issues are not repointed yet, and remain a follow-up.",
            "why": "The publication unit edited KotlinBottools' issue bodies only.",
            "when": "#25 landing",
            "ref": "2-phase-0-history-rewrite/25-kotlinbottools-publish/consequences.md#6-follow-ups"
          }
        ]
      },
      {
        "unit": "build-skeleton",
        "basis": "plan",
        "summary": "Planned: the single-module build is replaced by the convention-plugin build of the six artifacts at `1.0.0-SNAPSHOT`, the Gradle wrapper is upgraded to 9.7.1, and `ci.yml`, `pages.yml`, `release.yml`, `CONTRIBUTING.md`, `LICENSE` and the README stub are added, with `CHANGELOG.md` extended. Nothing is released. Written from this folder's roadmap and consequences, as the unit's own documents are on its branch.",
        "release": {
          "bump": "none",
          "version": null,
          "unreleased": true,
          "note": "the artifacts are new and build as `1.0.0-SNAPSHOT`; nothing is released before `1.0.0`"
        },
        "source": "roadmap.md §4, Phase 1; consequences.md §1; 2-phase-0-history-rewrite/consequences.md §3",
        "link": "roadmap.md#phase-1--build-skeleton"
      }
    ],
    "changes": [
      {
        "unit": "history-rewrite",
        "when": "#2 landing",
        "entry": "downstream.0",
        "what": "KotlinBottools was not force-pushed in place: it became public as a fresh repository with every number reproduced, its pre-rewrite repository private and archived under its legacy name.",
        "why": "Phase 0's design replaced the in-place force-push with a fresh repository holding the rewritten history, and #2's landing carried it out.",
        "ref": "2-phase-0-history-rewrite/consequences.md#22-kotlinbottools-the-public-repository-and-the-legacy-repository"
      },
      {
        "unit": "history-rewrite",
        "when": "#2 landing",
        "entry": "downstream.0",
        "what": "No Support ticket was filed: GKB2's and BotTools' pull-request refs keep old history fetchable, and GitHub still serves the old objects by id.",
        "why": "Phase 0's design dropped the Support ticket and measures the residual instead, which the residual-exposure report on #2 states.",
        "ref": "2-phase-0-history-rewrite/consequences.md#21-the-six-repositories"
      },
      {
        "unit": "history-rewrite",
        "when": "#2 landing",
        "what": "The rewrite also replaced machine-local paths in KotlinBottools' history: on `main`, a line of `build.gradle.kts` and a commented-out line of `GuildDataParser.kt` changed.",
        "why": "Phase 0's design added the path scrub to KotlinBottools' rewrite.",
        "ref": "2-phase-0-history-rewrite/consequences.md#1-published-artifacts"
      }
    ]
  },
  "tests": null,
  "roadmap": null,
  "followUps": [],
  "documents": [
    {
      "label": "Issue #1",
      "path": "https://github.com/SpartanLaboratories/KotlinBottools/issues/1",
      "note": "the consolidation's scope and when it is done"
    },
    {
      "label": "Research",
      "path": "research/README.md",
      "note": "the questions, the verification of their claims at source, and the summary the design is built from"
    },
    {
      "label": "Architecture",
      "path": "architecture.md",
      "note": "the systems design: requirements, the systems and their boundaries, the alternatives weighed (§13) and the units (§14)"
    },
    {
      "label": "Roadmap",
      "path": "roadmap.md",
      "note": "the phases, one per unit, with their dependencies and target versions"
    },
    {
      "label": "Consequences",
      "path": "consequences.md",
      "note": "adoption, blast radius and follow-ups"
    }
  ],
  "notes": {
    "corrections": [
      {
        "what": "#2's start at 2026-11-07T07:05:00Z recorded on 2026-11-20, after the fact: this board was laid after the unit's run started; its landing at 2026-11-17T01:13:11Z (merge 3625163, PR #49) recorded with it, as its own board records it.",
        "when": "2026-11-20",
        "backfill": {
          "event": "sized",
          "unit": 2,
          "at": "2026-11-07T07:05:00Z",
          "landed": "2026-11-17T01:13:11Z"
        }
      },
      {
        "what": "#3's start at 2026-11-18T02:31:30Z recorded on 2026-11-20, after the fact: this board was laid after the unit's run started.",
        "when": "2026-11-20",
        "backfill": {
          "event": "sized",
          "unit": 3,
          "at": "2026-11-18T02:31:30Z"
        }
      }
    ]
  },
  "links": {
    "workBoard": "../index.html",
    "repoBoard": "../../dashboards/index.html"
  }
}
);
