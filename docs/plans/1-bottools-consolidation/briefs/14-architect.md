You are the architect for Stage 3 of a planning pipeline. You design at the systems level: which systems and subsystems must exist, what each owns, and how they relate to and interact with each other and with what already exists. You do not write implementation plans, and you do not write the phased roadmap (a planner writes roadmap.md after you, from your decomposition).

=== The work ===

SpartanLaboratories/KotlinBottools#1, "BotTools consolidation & MagicBot (tracking)". Consolidate KotlinBottools and GKB2 into one modern Discord-bot library, published to Maven Central as io.github.spartanlaboratories:bottools-* (bottools-core, bottools-data-sqlite, bottools-stats, bottools-plugins, and the bottools umbrella). Also deliver MagicBot, a public game-stats bot in its own repository, SpartanLaboratories/MagicBot (to be created; it does not exist yet).

Repositories and references (all read-only for you; a location written `github:<owner>/<repo>@<ref>` is not on disk — read it through `gh api repos/<owner>/<repo>/contents/<path>?ref=<ref>` or `https://raw.githubusercontent.com/<owner>/<repo>/<ref>/<path>`, and do not clone it):
- %PROJECTS%/KotlinBottools — the target repository, branch docs/issue-1-bottools-consolidation checked out (tip: `git -C %PROJECTS%/KotlinBottools rev-parse --short HEAD`). Today: one Gradle module, version 7.5-SNAPSHOT, Kotlin 2.1.10, JDA 5.6.1, Gradle 8.10.
- github:SpartanLaboratories/GKB2@9422f85 — the source to port from: Kotlin 1.7.20 multiplatform with Compose, JDA 5.0.0-beta.2, Spring XML wiring.
- %PROJECTS%/MyGameTools — the organisation's conventions: build-logic convention plugins, .github/workflows (ci.yml, pages.yml, release.yml), CONTRIBUTING.md, CHANGELOG.md, and the SupportedExtension / ExperimentalGameToolsApi markers in gametools-core.
- %PROJECTS%/GeneralTools/docs/plans/7-kotlin-multiplatform/research/ — Kotlin Gradle plugin and Gradle compatibility, Maven Central publishing. The checkout is on branch feat/issue-7-kotlin-multiplatform, where this folder is committed in full.
- %PROJECTS%/WebTools — per-level test-task wiring in its root build.gradle.kts, and the architecture precedent named below. The checkout is on a feature branch; both files are identical to master.
- Organisation rules: %USERPROFILE%/.claude/CLAUDE.md (global rules, including "Library Design — Open-Ended by Default", the Audience-Reach documentation model and the 5-level testing hierarchy); the organisation's `.github` repository, github:SpartanLaboratories/.github@main (CONTRIBUTING.md, the health files CODE_OF_CONDUCT.md and SECURITY.md, and anything else you need from it); and these memory notes (that repository's `claude/memory/` folder mirrors them; the local files are the source): under %USERPROFILE%/.claude/projects/%PROJECTS%-MyGameTools/memory/ — prefer-result-over-nullable.md, library-design-open-ended.md, testing-5-level-hierarchy.md, level-5-uat-deferred.md, references-by-section.md; under %USERPROFILE%/.claude/projects/%PROJECTS%-WebTools/memory/ — api-evolution-clean-break.md, feedback_versioning_convention.md.

=== Read this first ===

%PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/research/README.md
- Part 1 §1.1 states the work as facts.
- Part 2 holds the verification results: 299 outside-world claims, 285 hold, 14 unclear (all behind unreachable hosts), none fail.
- Part 3 is the research summary, topic by topic (3.2 to 3.15). Each section names the findings file and the sections it rests on. Read Part 3 in full, then open the cited findings files (same folder) wherever you need detail.
- Known gaps lists what is unfinished, including three "Unfinished — needs a planner re-pass" notes.
Every user decision the research raised is settled; the answers are folded into Part 3 and restated below.

=== Binding constraints ===

Every item here is binding. The design may not re-open any of them. If one cannot be met, say so in Risks and in your reply.

Library
- Home: KotlinBottools. GKB2 is a source to port from, then archived.
- Kept surface, rebuilt: the hierarchical command tree, the alias DSL (get and "city" becomes "getcity"), property-backed get/set commands, inline handlers and the Option helpers. They are rebuilt on immutable definitions with a per-invocation context, so one definition serves concurrent invocations. Everything else may be reworked.
- Replaced:
  - HTML scraping, by typed providers over documented JSON APIs only;
  - the XML storage layer, by storage ports in bottools-core with a SQLite implementation in bottools-data-sqlite, keyed by Discord snowflakes;
  - Spring wiring and the classpath-scanning Responder, by a plugin API and a typed event registry;
  - the Compose manager, by nothing: there is no UI.
- Invocation: slash commands first. Typed messages reach the same handlers, with a default prefix of "!" that each guild can override. Context-menu commands are supported.
- The library offers three typed modes: @-mention (always on), the bare prefix in DMs (always on), and the bare prefix in servers (a configuration switch that needs the privileged MESSAGE_CONTENT intent).
- Private replies: a typed command cannot reply ephemerally. A reply marked private therefore goes to the invoker by DM, with a short public note that a DM was sent. If the user's DMs are closed, the public reply holds nothing personal and points to the slash command. One handler serves both forms.
- Account links are global per Discord user. Tracking subscriptions are per guild.
- Coroutines are bridged to JDA through jda-ktx, kept internal to bottools-core.
- No UI and no Compose. No management seam is promised for 1.0.0: lifecycle status and events stay internal or Experimental, and are not documented as a seam. A desktop manager on SpartanUI and SpartanGraphics is an unscheduled last phase, not designed here.
- Plugins at 1.0.0:
  - Reaction roles, including the default role on member join and the server welcome message.
  - Math.
  - Weather: current conditions plus a forecast, from a free API that needs no key.
  - Admin: typed get/set over every registered guild setting, admin-only.
  - Feeds: a general RSS/Atom plugin in bottools-plugins. Server administrators subscribe a channel to any feed URL. It brings:
    - the feed parser (Rome behind a FeedParser port);
    - a guard against server-side request forgery on the HTTP transport for administrator-supplied URLs;
    - feed-subscription storage and admin commands.
  - MagicBot installs every plugin, feeds included.
- Game news is separate from the feeds plugin. Dota 2's patch notes come from Steam's JSON news API through a news source in bottools-stats, with no feed parser.
- Poker is its own phase after 1.0.0: playable Texas hold 'em, shipped as a 1.N.0 feature release, Experimental until one full game has been played.
- Platform: a JDK 21 toolchain; Kotlin 2.2.x (the organisation's pin, as in MyGameTools' build-logic); Kotlin consumers on the JVM only, with no Java-facing variants; Apache-2.0. The Kotlin Gradle plugin 2.2.x on Gradle 9 is an undocumented pairing that MyGameTools already uses; carry it as a risk (research README §3.12), with the GeneralTools 3.0.0 shape as the documented fallback.
- Versions: new artifact ids bottools-* start at 1.0.0, and every build before that is 1.0.0-SNAPSHOT. Later additions ship as 1.N.0. The 7.x line ends with no further release.
- Conventions:
  - Trunk-based, a PR per change, merge commits, Conventional Commits.
  - Major.Feature.MinorChange versioning, with a letter suffix only for bug fixes.
  - The five-level test hierarchy, in com.spartanlabs.testing.<level>.bottools.* packages.
    - Discord and game APIs are simulated at Levels 2 and 3. Live checks are opt-in, env-gated and never run in CI.
    - Level 5 (UAT) is deferred to a separate, later plan. Say so; do not design it.
  - Result for expected failures and for lookups that can miss — never a nullable return.
  - The slf4j API only, in library code. KDoc on every public declaration.
  - Open-ended library design, with three stability tiers: Stable Core, @SupportedExtension, and Experimental behind @RequiresOptIn.
  - Maven Central under io.github.spartanlaboratories, published with com.vanniktech.maven.publish.
  - Keep a Changelog. The README kept current.
  - Cite documents by section and code by symbol, never by line number.
- KotlinBottools goes public after its history rewrite, with Dokka on GitHub Pages.

MagicBot
- A public bot anyone can invite. It runs as a new MagicBot Discord application, which is invited to the legacy servers before --import-legacy can resolve names.
- Privileged intents: MagicBot holds GUILD_MEMBERS, for the default role and welcome message on join. It does not hold MESSAGE_CONTENT.
- Typed form: in servers it is reached by @-mention (@MagicBot setid 123), in DMs by the prefix (!setid 123).
- Games:
  - Dota 2 comes first, through OpenDota: link an account, show a profile and the last match, post new matches automatically to subscribed guild channels, and post patch notes. setid, getid, lastgame and showstats stay as typed aliases.
  - Then, in order and one per release, each offering what its source honestly supports. Each of their phases opens with a re-pass of its sources.
    - Marvel Rivals: an Experimental, on-demand provider over the community API. It offers profile with rank, match history and match detail, and no automatic posts.
    - Path of Exile 2: economy data only, from poe.ninja. Profiles and ladders wait until GGG reopens application registration.
    - No More Room in Hell: profile, playtime and achievements, through an operator Steam key, on commands only.
- Public-bot obligations: privacy-policy and terms pages; a delete-my-data command; the mention-only typed form above; sharding-ready configuration; a tracker call budget that scales with the audience.
- Backups are short-lived. The privacy policy states the retention window within which deleted data leaves backups. No erasure log is kept.
- MagicBot consumes the library through a Gradle composite build when checked out beside it, and through -SNAPSHOT builds from main otherwise.
- A one-off --import-legacy step imports the old guildData/*.xml links and settings, resolving names to ids through the running bot. It reads the KotlinBottools and GKB2 copies merged, with the newer value winning for each server and member. TrumpBot's older-layout copy is not imported. All three copies are archived out of the repositories before the history rewrite and kept access-restricted. The older copies are deleted once the import report has been checked.
- Hosting is not decided: no host, container or deploy pipeline is part of this work. Deployment is a Known gap, and encryption at rest is a requirement on whatever host is chosen.

History and repositories
- Before anything else, secrets, data, IDE and build files leave the tree and the history of every bot repository: KotlinBottools, GKB2, GKB, BotTools, TrumpBot, and Support (TrumpBot's companion project). Use git filter-repo with root-anchored path lists from mirror clones, then a force-push (research README §3.14). No leaked token is current: this is hygiene before archiving and before KotlinBottools goes public.
- KotlinBottools' rewrite is the first act of Phase 0, and it rewrites the planning branch too. No pull request is opened from the planning branch before that rewrite; the planning PR is opened afterwards, from the rewritten branch.
- After the 1.0.0 release, GKB2, GKB, BotTools, TrumpBot and Support are archived with README pointers to bottools, and GKB2's issues #2 to #5 are closed.

Dropped features. The roadmap lists these as post-roadmap potential features; do not design them: activity points and promotion ranks; playlists and channel duplication; channel-reserving conversations; spam control; the stdin console; the daily-update hook.

=== What to produce ===

Write exactly one file: %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/architecture.md. It does not exist yet.

Form:
- Match the organisation's precedents:
  - %PROJECTS%/WebTools/docs/plans/14-reliable-ordered-channel/architecture.md, an architecture document;
  - §2 "Target architecture" of %PROJECTS%/MyGameTools/docs/framework-vision-and-roadmap.md, for module layout, cross-cutting principles and Mermaid diagrams.
- Open with a Header / Association block that ties the document to SpartanLaboratories/KotlinBottools#1 and names the branch docs/issue-1-bottools-consolidation.
- Use British spelling. Use short bullets with bold lead-ins where they help, and tables where they compare.
- Keep it proportional: a document a maintainer can read in one sitting. Point to the research README and the findings files for evidence rather than repeating it.

It must cover, at the systems level:
1. Context: what exists today (by symbol, from research/codebase-inventory-and-fate.md) and what the target is.
2. Module layout:
   - the five artifacts plus MagicBot, and what each owns;
   - the dependency direction between them, with a Mermaid diagram;
   - what each exposes, and at which stability tier;
   - which third-party libraries each carries, in which scope (api or implementation) and at which version, as research settled them.
3. The systems and subsystems. At least:
   - the command model: definitions, registration and its validator, typed parsing and the prefix policy, the alias table, the dispatcher and context, acknowledgement and reply visibility (including private replies by DM for typed commands), preconditions, errors, help, components;
   - the bot runtime: event registry and router, plugin host, gateway and intent resolution, jobs, configuration, sharding, lifecycle;
   - storage: ports in core, the SQLite implementation, migrations, erasure, backups;
   - the stats framework: the provider SPI and capabilities, the HTTP transport with its request-forgery guard, cache, call budget, account links, the match tracker, news sources for patch notes;
   - the plugins: reaction roles, math, weather, admin, feeds;
   - MagicBot: the Dota 2 provider and commands, the legacy importer, the public-bot obligations and configuration.

   For each system, cover:
   - what it owns, and what it must not own;
   - its main types by name (illustrative, not final signatures);
   - how it interacts with the others;
   - its failure model.

   Include a Mermaid sequence diagram for at least: a slash invocation; a typed invocation, including a private reply by DM; a tracker tick that posts a match; a feed poll that posts new items; delete-my-data.
4. Cross-cutting principles:
   - Result and the failure hierarchy;
   - where JDA types appear, and where they do not;
   - coroutine ownership;
   - logging events;
   - configuration and secrets;
   - testing by level (Levels 1 to 4; Level 5 deferred);
   - stability tiers and ABI checks.
5. Adoption: a verdict for every existing part of both codebases — carry the behaviour, rebuild, replace, delete, or list as a post-roadmap feature. It must agree with research/codebase-inventory-and-fate.md, and include tests, resources, build files and the README.
6. The history rewrite as a system boundary: what it removes, its order relative to everything else, and its exit criterion (research/bot-repository-history-purge.md).
7. Risks. At least:
   - the KGP 2.2.x-on-Gradle-9 pairing;
   - jda-ktx 0.14.2's behaviour on JDA 6.7.0;
   - the automatic-deferral timer;
   - JDA's minor-release breakage;
   - OpenDota's limits and terms;
   - the community Marvel Rivals API;
   - the feeds plugin's exposure, as a public bot fetching URLs that administrators supply;
   - GitHub Support's handling of pull-request refs and cached views.
8. Considerations: any trade-off that still needs the user's call, each with its options and a recommendation. The settled items above are not Considerations.
9. Known gaps. Include the three notes from the research README's Known gaps, in substance. Head each one "Unfinished — needs a planner re-pass", and name the question, the unreachable hosts and what is provisional:
   - Question 8, the Dota 2 data sources;
   - Question 9, the later games and weather;
   - Discord's current Developer Terms and Developer Policy (Question 1).

   Mark every dependent design point "provisional" inline where it appears.

Do not write the phased roadmap: phases, sub-issues and target versions belong to roadmap.md. The document may state the landing order of the systems.

=== What to return (your reply, not a file) ===

A short report:
- the path of architecture.md;
- the decomposition: the plannable units, each with:
  - a slug;
  - its scope in two or three lines;
  - its dependencies on other units;
  - the landing order.

  Include as units the build and CI skeleton, the history rewrite and the 1.0.0 release with archiving, alongside the systems. These units become the roadmap's phases and stages.
- the Considerations you wrote, verbatim;
- any binding constraint you could not satisfy, and why;
- anything in the research summary you found wrong or contradictory, with the evidence.

=== Write the design, not its history (applies to architecture.md in full) ===

Every document in the issue folder states what is true and what will be built. None of them records how the plan was developed: no interview questions, no user answers, no "the user chose" or "it was decided", no binding-constraint or decision tables, no decision IDs, no stage narration, and no account of what a review changed.

An answer or a settled call shows up as the design itself: a requirement, a current-state fact, an assumption, a non-goal, or a system's shape. Rationale is welcome when it argues from the subject ("X is not used because Y"), never from the process ("per the interview", "decision D3", "as the user asked").

Where something is still open, it goes in one of two sections, written as plainly as the rest:
- Known gaps: information that could not be established, or work the documents knowingly leave undone.
- Considerations: trade-offs that need the user's call, each with the options and a recommendation. Unresolved Considerations block execution.

=== Boundaries (read-only) ===

Investigate and report. Change no file except the one Markdown document you own: %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/architecture.md.

Run nothing that mutates:
- no build that writes into a repository;
- no git commit, add, push, branch, stash, checkout or reset;
- no issue or pull-request action;
- no edit to source, tests, build scripts, configuration or any other document.

Read-only commands (git log, git show, git blame, grep, reading files) are fine.

Other rules:
- Do not commit architecture.md. The coordinator commits it later, with the user's approval.
- Never read, cite or rely on %PROJECTS%/KotlinBottools/docs/bottools-vision-and-roadmap.md, a superseded draft.
- Never print, copy or quote a secret value; refer to secrets by path and commit only.
- Do not quote member names, guild names or ids from any legacy data file.
