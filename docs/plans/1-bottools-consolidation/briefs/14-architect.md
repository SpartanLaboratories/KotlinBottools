You are the architect for Stage 3 of a planning pipeline. You design at the systems level: which systems and subsystems must exist, what each owns, and how they relate to and interact with each other and with what already exists. You do not write implementation plans, and you do not write the phased roadmap (a planner writes roadmap.md after you, from your decomposition).

=== The work ===

SpartanLaboratories/KotlinBottools#1, "BotTools consolidation & MagicBot (tracking)". Consolidate KotlinBottools and GKB2 into one modern Discord-bot library, published to Maven Central as io.github.spartanlaboratories:bottools-* (bottools-core, bottools-data-sqlite, bottools-stats, bottools-plugins, and the bottools umbrella). Also deliver MagicBot, a public game-stats bot in its own repository, SpartanLaboratories/MagicBot (to be created; it does not exist yet).

Repositories and references (all read-only for you; a location written `github:<owner>/<repo>@<ref>` is not on disk — read it through `gh api repos/<owner>/<repo>/contents/<path>?ref=<ref>` or `https://raw.githubusercontent.com/<owner>/<repo>/<ref>/<path>`, and do not clone it):
- %PROJECTS%/KotlinBottools — the target repository, branch docs/issue-1-bottools-consolidation checked out (tip: `git -C %PROJECTS%/KotlinBottools rev-parse --short HEAD`). Today: one Gradle module, version 7.5-SNAPSHOT, Kotlin 2.1.10, JDA 5.6.1, Gradle 8.10.
- github:SpartanLaboratories/GKB2@9422f85 — the source to port from: Kotlin 1.7.20 multiplatform with Compose, JDA 5.0.0-beta.2, Spring XML wiring.
- %PROJECTS%/MyGameTools — the organisation's conventions: build-logic convention plugins, .github/workflows (ci.yml, pages.yml, release.yml), CONTRIBUTING.md, CHANGELOG.md, and the SupportedExtension / ExperimentalGameToolsApi markers in gametools-core.
- %PROJECTS%/GeneralTools/docs/plans/7-kotlin-multiplatform/research/ — Kotlin Gradle plugin and Gradle compatibility, Maven Central publishing. The checkout is on branch feat/issue-7-kotlin-multiplatform, where this folder is committed in full.
- %PROJECTS%/WebTools — per-level test-task wiring in its root build.gradle.kts, and the architecture precedent named below. The checkout is on a feature branch; both files are identical to master. WebTools is also where the library's HTTP stack comes from (see "HTTP from WebTools" below). Read its current state from github:SpartanLaboratories/WebTools@master. Facts: it builds on Kotlin 2.2.0 and Gradle 9.7.1; it sets group io.github.spartanlaboratories and its version at the root, so a composite build substitutes it; it publishes webtools-udp, webtools-scraping and webtools-browser; webtools-scraping today is one Connector class on skrapeit 1.1.5, jsoup 1.15.4 and unirest-java 1.4.9. WebTools is public; KotlinBottools is private until its history rewrite.
- SpartanLaboratories/WebTools#55 (https://github.com/SpartanLaboratories/WebTools/issues/55; read it with `gh issue view 55 --repo SpartanLaboratories/WebTools`) — what the library requires of WebTools' HTTP stack, with the library's former design of the stack offered as a draft. It is the contract the design consumes.
- Organisation rules: %USERPROFILE%/.claude/CLAUDE.md (global rules, including "Library Design — Open-Ended by Default", the Audience-Reach documentation model and the 5-level testing hierarchy); the organisation's `.github` repository, github:SpartanLaboratories/.github@main (CONTRIBUTING.md, the health files CODE_OF_CONDUCT.md and SECURITY.md, and anything else you need from it); and these memory notes (that repository's `claude/memory/` folder mirrors them; the local files are the source): under %USERPROFILE%/.claude/projects/%PROJECTS%-MyGameTools/memory/ — prefer-result-over-nullable.md, library-design-open-ended.md, testing-5-level-hierarchy.md, level-5-uat-deferred.md, references-by-section.md; under %USERPROFILE%/.claude/projects/%PROJECTS%-WebTools/memory/ — api-evolution-clean-break.md, feedback_versioning_convention.md.

=== Read this first ===

%PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/research/README.md
- Part 1 §1.1 states the work as facts.
- Part 2 holds the verification results: 411 outside-world claims, 408 hold, 2 unclear (both behind hosts that refuse automated clients; neither is a design input), and 1 fails in part. That one is webtools-consumption 24: `okhttp-bom` 5.5.0 does list `okhttp-jvm`. The classpath check it fed stands, and importing the BOM as a platform becomes one way to align OkHttp.
- Part 3 is the research summary, topic by topic (3.2 to 3.15). Each section names the findings file and the sections it rests on. Read Part 3 in full, then open the cited findings files (same folder) wherever you need detail.
- §3.9, §3.10 and §3.15 rest on sources read at their own hosts: OpenDota's deployed limits and published terms, Steam's news feed and Web API terms, the later games' data sources, Open-Meteo's live behaviour, and Discord's current Developer Terms of Service and Developer Policy (effective 2024-07-08). §3.15 includes obligations that the binding list below does not name: a way for users to report issues, server automation that stays off until an administrator configures it, safeguards on the open feeds plugin, nothing but a game account id or a place name sent to third parties, and the identity check of the application owner before MagicBot passes 100 servers. Design for them; where one leaves a choice that is the user's, raise it in Considerations.
- Question 13 and its findings file, research/webtools-consumption.md, cover how the library consumes WebTools before and at release. §3.8 states what the library requires of the HTTP stack, which now comes from WebTools.
- §3.7 and research/sqlite-persistence-stack.md rest on SQLite's own documentation. Backups are `VACUUM INTO` copies pruned after 14 days.
- §3.4 records that Kord Extensions acknowledges every interaction immediately, with no timer. An `Immediate` acknowledgement mode is the research's third option, beside the automatic timer and the manual mode.
- §3.11 rests on Sonatype's and Gradle's own documentation:
  - snapshots are cleaned up after about 90 days, so they are republished at least that often;
  - same-named `build-logic` builds do not collide.
- §3.16 (research Question 13) sets conditions on the WebTools release that the library's 1.0.0 needs:
  - a JVM target of 21 or lower (WebTools#47);
  - Kotlin metadata readable by 2.2.x;
  - no `-SNAPSHOT` in a release.

  It also covers the exact pin of WebTools, the classpath-alignment and release-metadata checks, and the CI lanes, including the published lane that gates release.
- §3.16 also finds that Gradle orders a letter-suffixed version below its base version (`1.0.0a` < `1.0.0`), so a bug-fix release versioned by the organisation's letter-suffix rule loses conflict resolution to its plain release. The versioning rule is binding and is not to be changed. Raise in Considerations how the library's bug-fix releases are versioned, and what the library requires of WebTools' fixes, with the options and a recommendation.
- Known gaps lists what is unfinished, including one "Unfinished — needs a planner re-pass" note: the Marvel Rivals community API's pricing and terms.
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
    - the feed parser (Rome behind a FeedParser port). Whether RSS/Atom parsing moves to WebTools is one of #55's open questions, so where the parser lives is provisional;
    - a guard against server-side request forgery for administrator-supplied URLs, which is WebTools' outbound-URL policy (#55);
    - feed-subscription storage and admin commands;
    - content safeguards: administrator-only subscription, posts that name their source and carry no media, removal by any administrator, the report route, and a FeedUrlPolicy with an operator deny and allow list that MagicBot configures.
  - MagicBot installs every plugin, feeds included.
- Game news is separate from the feeds plugin. Dota 2's patch notes come from Steam's JSON news API through a news source in bottools-stats, with no feed parser.
- HTTP from WebTools. HTTP and scraping are WebTools' domain.
  - bottools-stats, the weather plugin and the feeds plugin consume WebTools' HTTP stack instead of owning it. The stack is the transport, the outbound-URL policy, the response cache, the call budget, the call facade, the failure model and the test fakes. WebTools#55 is the contract.
  - The game-provider framework stays in the library: the provider SPI and capabilities, AccountRef, the link service, GameRegistration, GameCommands, MatchTracker, GameNewsSource and NewsJob.
  - #55's open questions are WebTools' to decide: module placement, where the test fakes ship, OkHttp version policy relative to JDA's pin, whether RSS/Atom parsing moves too, reach, stability tiers and versioning. Design the library against #55's requirements. Mark every design point that depends on one of these open questions *provisional*, naming the question, and do not resolve any of them on WebTools' behalf.
  - Nothing from skrapeit, jsoup or unirest may reach the library's consumers. That exclusion is a constraint #55 places on WebTools.
  - bottools 1.0.0 depends on a WebTools release that carries the stack. During development the library consumes WebTools through a Gradle composite build (research Question 13). The roadmap records this dependency.
  - The library's own published test-fixtures artifact is deferred. It comes towards the end of the roadmap, depends on WebTools' HTTP stack (#55), and is planned only after that WebTools update lands; until then the fakes stay in test sources. It stays in Considerations, marked deferred with that dependency.
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
  - The report route: a link to the MagicBot repository's GitHub issues and a contact e-mail address, both published in the privacy policy and the help. `privacy report` replies with both, and the bot stores no report.
  - The privacy commands (`privacy policy`, `privacy report`, `privacy delete-my-data`) are a core built-in, enabled by `privacy { }` configuration, so any bot on the library can meet Discord's obligations; a bot that does not configure it gets nothing.
  - The privacy-policy and terms pages are served from GitHub Pages of the MagicBot repository, rendered from its docs/. The MagicBot repository is therefore public.
- Backups are short-lived. The privacy policy states the retention window within which deleted data leaves backups. No erasure log is kept. The window is 14 days: BackupJob deletes older backups, so the bot itself enforces it.
- MagicBot consumes the library through a Gradle composite build when checked out beside it, and through -SNAPSHOT builds from main otherwise.
- A one-off --import-legacy step imports the old guildData/*.xml links and settings, resolving names to ids through the running bot. It reads the KotlinBottools and GKB2 copies merged, with the newer value winning for each server and member. TrumpBot's older-layout copy is not imported. All three copies are archived out of the repositories before the history rewrite and kept access-restricted. The older copies are deleted once the import report has been checked.
  - For each linked member still in a guild, the old Dota 2 matches channel becomes a MatchFeed subscription in that channel, and GKB2's patch-notes channel becomes a GameNews subscription.
  - The import writes data owned by the reaction-roles plugin, the stats framework and the Dota 2 registration, so it lands after reaction roles and Dota 2.
- Hosting is not decided: no host, container or deploy pipeline is part of this work. Deployment is a Known gap, and encryption at rest is a requirement on whatever host is chosen.

History and repositories
- Before anything else, secrets, data, IDE and build files leave the tree and the history of every bot repository: KotlinBottools, GKB2, GKB, BotTools, TrumpBot, and Support (TrumpBot's companion project). Use git filter-repo with root-anchored path lists from mirror clones, then a force-push (research README §3.14). No leaked token is current: this is hygiene before archiving and before KotlinBottools goes public.
- KotlinBottools' rewrite is the first act of Phase 0, and it rewrites the planning branch too. No pull request is opened from the planning branch before that rewrite; the planning PR is opened afterwards, from the rewritten branch.
- After the 1.0.0 release, GKB2, GKB, BotTools, TrumpBot and Support are archived with README pointers to bottools, and GKB2's issues #2 to #5 are closed.

Dropped features. The roadmap lists these as post-roadmap potential features; do not design them: activity points and promotion ranks; playlists and channel duplication; channel-reserving conversations; spam control; the stdin console; the daily-update hook.

=== What to produce ===

Write exactly one file: %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/architecture.md. It exists and is uncommitted. Revise it in place, and write no other file.

The revision:
- **Bring it in line** with "HTTP from WebTools" and the other constraints above. Fold each settled item into the design as a fact (a requirement, a system's shape, a non-goal), never as a record of who decided what.
- **Keep the review changes in the current text.** They stand:
  - Experimental tiers for the capabilities no 1.0.0 provider uses;
  - the importer's dependencies and what it writes;
  - settings typed without nullables;
  - the provisional mark in §1.2;
  - the adoption rows for Main.kt, the Gradle wrapper and .gitignore.
- **Keep the design calls already made**, unless the WebTools change forces otherwise: an open AccountRef, one SubscriptionStore with kinds, bottools-plugins depending on bottools-stats for HTTP, vanniktech 0.37.0, and the privacy built-in in core. If one moves, say so and why in your reply.
- **Revise at least these sections:**
  - §5: the module layout, the dependency graph and the exposure table. In §5.4, WebTools becomes a dependency, and the skrapeit/jsoup/unirest exclusion becomes a constraint on WebTools, as #55 states.
  - §6 and §7.4: the stack is consumed from WebTools; the game-provider framework stays.
  - §7.3: backups are VACUUM INTO copies pruned after 14 days (research/sqlite-persistence-stack.md).
  - §7.5 and §7.6: the weather and feeds plugins consume the stack; the feeds safeguards; the settled public-bot obligations and the importer's mapping.
  - §8.3 and §8.4: the flows run through WebTools' facade and transport.
  - §9: the testing lines that name FakeHttpTransport and OkHttpTransport.
  - §10.7: WebTools is now consumed.
  - §12: the tiers of the surfaces that move.
  - §13: owning the stack in the library becomes a rejected alternative, argued from the subject.
  - §14: the stats-http-stack unit becomes consumption and integration work that depends on WebTools delivering #55. Record that bottools 1.0.0 depends on a WebTools release carrying it, with a composite build during development. Place the deferred test-fixtures item towards the end, after #55 lands.
  - §15: add a cross-repository dependency risk.
  - §16: list the provisional points that depend on WebTools' open questions.
  - §17: remove the Considerations that are now settled. Keep the test-fixtures Consideration, marked deferred with its dependency on #55.
- **Mark inline, as *provisional*,** every point that depends on one of #55's open questions, naming the question.

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
   - the feeds plugin's exposure, as a public bot fetching URLs that administrators supply and posting what they return, for which the operator is solely responsible under Discord's Terms;
   - GitHub Support's handling of pull-request refs and cached views;
   - the cross-repository dependency on WebTools: when #55 is delivered, the WebTools release that bottools 1.0.0 needs, and OkHttp's alignment with JDA's pin.
8. Considerations: any trade-off that still needs the user's call, each with its options and a recommendation. The settled items above are not Considerations.
9. Known gaps. Include the note from the research README's Known gaps headed "Unfinished — needs a planner re-pass", in substance, under the same heading: Question 9's Marvel Rivals community API, whose pricing, free-tier size and terms are unread (unreachable: marvelrivalsapi.com, tracker.gg). Name the question, the unreachable hosts and what is provisional: the Marvel Rivals provider's call budget and the clauses its phase adds to MagicBot's privacy policy and terms.

   Mark every dependent design point "provisional" inline where it appears. Carry the README's other Known gaps that bear on the design, in substance. List the design points that depend on #55's open questions, each marked provisional.

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
- the provisional points that depend on WebTools' open questions, as a list;
- which of the design calls already made moved, if any, and why;
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
- Never read, cite or rely on %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/draft.md, the pre-pipeline roadmap draft.
- Never print, copy or quote a secret value; refer to secrets by path and commit only.
- Do not quote member names, guild names or ids from any legacy data file.
