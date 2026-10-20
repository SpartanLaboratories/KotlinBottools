# Research — BotTools consolidation and MagicBot

## Header / Association

- **For:** [SpartanLaboratories/KotlinBottools#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1),
  *"BotTools consolidation & MagicBot (tracking)"*.
- **Committed on:** branch `ccr-2c690a64-fz5whf`, as `docs(plans):` commits that reference #1.
- **Maintained by:** the planner. Each `<question-slug>.md` file beside this one belongs to the
  researcher who wrote it and is not edited here.
- **Date:** 2026-10-20.
- **Baselines:**
  - `KotlinBottools` `main` @ `b2f2078`: one Gradle module, version `7.5-SNAPSHOT`, Kotlin
    2.1.10, JDA 5.6.1, Gradle 8.10.
  - `GKB2` `master` @ `9422f85`: Kotlin 1.7.20 multiplatform with Compose desktop, JDA
    5.0.0-beta.2, Spring XML wiring, Gradle 7.5.1.
  - These commit hashes predate the history rewrite planned for both repositories. After the
    rewrite, find the commits by subject.
- **Citations:** documents by section and code by symbol, never by line number.
- **Related:** [`../architecture.md`](../architecture.md) and [`../roadmap.md`](../roadmap.md)
  are designed from the summary in Part 3.

This file holds three things:

1. the research questions;
2. the verification results for the outside-world claims their answers rest on;
3. the summary that the architecture is designed from.

---

## Part 1 — Research plan

### 1.1 The work these questions serve

**The library.** `KotlinBottools` becomes the single Discord-bot library.

- **Publishing.** It is published to Maven Central under `io.github.spartanlaboratories` as five
  artifacts: `bottools-core`, `bottools-data-sqlite`, `bottools-stats`, `bottools-plugins`
  and the `bottools` umbrella.
- **Versions.** The first published version is `1.0.0`; every build before it is
  `1.0.0-SNAPSHOT`. Later additions ship as `1.N.0` feature releases. The `7.x` line ends
  without a further release.
- **Sources.** `GKB2` supplies the features being ported. `GKB2` and the earlier bot
  repositories `GKB`, `BotTools` and `TrumpBot` are archived with pointers to `bottools`.

The library is built as follows:

- **Command system.** It keeps today's shape: a hierarchical command tree, the alias DSL
  (`get and "city" becomes "getcity"`), property-backed get/set commands, inline handlers and
  the `Option` helpers. These are rebuilt on immutable definitions with a per-invocation
  context, so one definition serves any number of concurrent invocations.
- **Invocation.** Slash commands come first. Typed messages that start with a prefix (`!` by
  default, overridable per guild) reach the same handlers. Context-menu commands are supported.
- **Game data.** It comes only from documented JSON APIs through typed providers, never from
  HTML scraping.
- **Coroutines.** JDA is bridged to coroutines through `jda-ktx`, which stays internal to
  `bottools-core`.
- **Storage.**
  - Data goes through storage ports in `bottools-core`. A SQLite implementation lives in
    `bottools-data-sqlite`, keyed by Discord snowflakes.
  - Game account links are global per Discord user. Tracking subscriptions are per guild.
- **Wiring.** A plugin API and a typed event registry replace Spring bean wiring and the
  responder that scans the classpath for JDA event classes.
- **No UI.** There is no Compose or other UI dependency, and no management seam is part of
  `1.0.0`. A desktop manager built on SpartanUI / SpartanGraphics is an unscheduled last phase.
- **Platform and conventions.**
  - JDK 21, Kotlin 2.2.x, Kotlin consumers on the JVM only, Apache-2.0.
  - Expected failures and lookups that can miss return `Result`.
  - Library code logs through the slf4j API only.
  - Every public declaration has KDoc.
  - The public surface is open-ended and sorted into three stability tiers.
  - Tests follow the organisation's five-level hierarchy. Discord and game APIs are simulated at
    Levels 2 and 3, and live checks are opt-in and never run in CI.

**Plugins at `1.0.0`:**

- **Reaction roles**, with the default role on member join and the server welcome message.
- **Math.**
- **Weather:** current conditions and a forecast, from a free API that needs no key.
- **Admin:** get and set for every registered guild setting, restricted to server
  administrators.

Poker follows after `1.0.0` as playable Texas hold 'em.

**MagicBot.** MagicBot is a separate application in `SpartanLaboratories/MagicBot`.

- **Identity.** It is a public bot that anyone can invite, and it runs as its own Discord
  application. It installs every plugin the library ships.
- **Dota 2.** The first game, through OpenDota. MagicBot links accounts, shows profiles and
  last matches, posts new matches automatically to subscribed guild channels, and posts patch
  notes. Its old Dota 2 subcommand names (`setid`, `getid`, `lastgame`, `showstats`) remain as
  typed aliases.
- **Later games.** Marvel Rivals, Path of Exile 2 and No More Room in Hell follow, one per
  release.
- **Public-bot obligations:**
  - a privacy policy and terms;
  - a command that deletes a user's data;
  - either message-content approval or a prefix fallback limited to @-mentions;
  - sharding-ready configuration;
  - a tracker call budget that scales with the audience.
- **Consuming the library.** It uses this repository through a Gradle composite build when the
  two checkouts sit side by side, and through `-SNAPSHOT` builds from `main` otherwise.
- **Legacy import.** A one-off `--import-legacy` step imports the old `guildData/*.xml` account
  links and settings. Those files hold names, not ids, so the step resolves the names through
  the running bot once the bot has been invited to those servers.
- **Hosting.** Where MagicBot is hosted is outside this work.

**History cleanup.** Before any of this, secrets, data, IDE and build files leave the tree and
the history of every bot repository: `KotlinBottools`, `GKB2`, `GKB`, `BotTools`, `TrumpBot`,
and `Support` if it turns out to be bot-related.

- `git filter-repo` rewrites each repository, followed by a force-push.
- No token found in these histories is current. The rewrite is hygiene before the repositories
  are archived, and before `KotlinBottools` becomes public.

### 1.2 Reuse first

This repository has no earlier research.

`SpartanLaboratories/GeneralTools` holds current findings, dated 2026-10-15, that are reused
here instead of being researched again:

- **[`kmp-maven-central-publishing.md`](https://github.com/SpartanLaboratories/GeneralTools/blob/master/docs/plans/7-kotlin-multiplatform/research/kmp-maven-central-publishing.md):**
  - It covers how `com.vanniktech.maven.publish` 0.37.0 signs, uploads and releases to the
    Central Portal, with the claims that rest on it.
  - It answers how `1.0.0` is released. A single-platform JVM library is the simpler case of
    what it researched.
  - It also records that `-SNAPSHOT` publishing needs snapshots enabled on the namespace.
    Question 10 covers the rest of snapshot consumption.
- **[`kmp-build-and-kotlin-compat.md`](https://github.com/SpartanLaboratories/GeneralTools/blob/master/docs/plans/7-kotlin-multiplatform/research/kmp-build-and-kotlin-compat.md):**
  - It covers the Kotlin Gradle plugin and Gradle compatibility matrix, and how a library stays
    readable by Kotlin 2.2.0 consumers.
  - It informs the Kotlin and Gradle pins of the build skeleton.

The build follows conventions already in use in the organisation, so they are not research
questions:

- `MyGameTools`' `build-logic` convention plugins: Kotlin 2.2.0, vanniktech 0.36.0, Dokka 2.2.0,
  Gradle 9.7.1, foojay resolver 1.0.0.
- `MyGameTools`' `ci.yml`, `pages.yml` and `release.yml`.
- `WebTools`' per-level test tasks.

### 1.3 Questions

Each question informs a choice the architecture has to make. Every findings file ends with the
outside-world claims its recommendation rests on.

#### 1. What does the Discord platform require of a public bot, and what limits does it put on commands?

**Options to compare:**

- **Typed fallback:** message-content approval versus a prefix fallback limited to @-mentions
  (and direct messages), which needs no privileged intent.
- **Registration:** global versus per-guild command registration.
- **Installation:** guild installation only, or user installation as well.
- **Gateway:** a single session versus sharding from the start.

**Requirements:**

- MagicBot is a public bot that anyone can invite.
- Typed messages reach the same handlers as slash commands.
- The default role on member join and reaction roles are plugin features.
- The legacy import resolves member names through the running bot.
- The match tracker posts into many guild channels.
- A user can have all their data deleted.
- Configuration is ready for sharding.

**The answer establishes:**

- The current limits on application commands: names, descriptions, option counts and types,
  depth of subcommand groups, numbers of global and guild commands, context-menu commands,
  choices, permissions, contexts and integration types.
- The acknowledgement and follow-up windows for interactions.
- Which features need which privileged intents, and what a bot receives without
  `MESSAGE_CONTENT`.
- The current thresholds and process for approval of privileged intents and for bot
  verification.
- What Discord's developer terms and policy require of a public bot's privacy policy,
  retention and deletion.
- The rate limits that matter when a bot posts into many channels.
- When sharding is required.

**Evidence that settles it:**

- Discord's developer documentation (also published as the `discord/discord-api-docs`
  repository).
- Discord's Developer Terms of Service, Developer Policy and support articles.
- JDA's documentation and source on intents and sharding.

**Findings:** [`discord-platform-rules.md`](discord-platform-rules.md)

#### 2. Which JDA release and which coroutine bridge should the library build on?

**Options to compare:**

- The latest JDA 5 release versus JDA 6, if released.
- `jda-ktx` as the coroutine bridge, versus what the library would need if `jda-ktx` failed a
  requirement.

**Requirements:**

- `jda-ktx` is an `implementation` dependency of `bottools-core`. It is never on a consumer's
  compile classpath, but it reaches every consumer's runtime, so it must resolve from Maven
  Central.
- Both libraries work for Kotlin 2.2.x consumers on JDK 21.
- JDA supports slash commands with subcommand groups, context menus, components (buttons,
  select menus, modals) and sharding.
- JDA's own dependencies must not conflict with the rest of the stack.

**Evidence that settles it:**

- Maven Central metadata and POMs for `net.dv8tion:JDA` and `jda-ktx`.
- Both projects' release notes, migration guides and build files at pinned tags.
- The Kotlin metadata version of the published `jda-ktx` artifact.

**Findings:** [`jda-and-coroutine-bridge.md`](jda-and-coroutine-bridge.md)

#### 3. How do established bot frameworks give one command both a slash and a typed form, and what should the command model take from them?

**Options to compare:**

- **The frameworks:**
  - discord.py's hybrid commands;
  - Sapphire's commands for discord.js, which define a message and a chat-input entry point on
    one class;
  - Kord Extensions;
  - BotCommands for JDA;
  - JDA-Chewtils;
  - DIH4JDA.
- **Ways of defining commands:** annotations, class hierarchies and builder DSLs.
- **How aliases relate to Discord's single canonical path.**

**Requirements:**

- The kept surface: the command tree, the alias DSL, property get/set commands, inline handlers
  and typed options.
- One immutable definition serves concurrent invocations.
- The typed fallback reaches the same handler as the slash form.
- Context-menu commands are supported, and help is generated from the tree.
- The old Dota 2 names live on as typed aliases.
- Discord's command limits from Question 1 apply.

**The answer establishes, per framework:**

- the types that define a command and its options;
- how one definition yields both a slash registration and a typed parser;
- typed-argument grammar: positional and named arguments, quoting, mentions, type coercion;
- the invocation context and how it unifies reply, defer and follow-up;
- automatic deferral;
- permission checks;
- error presentation;
- generated help;
- component handlers;
- how handlers are tested without a Discord connection.

**Evidence that settles it:**

- Each framework's documentation and source at a pinned release.
- Today's command types in `KotlinBottools` and `GKB2`.

**Findings:** [`command-framework-prior-art.md`](command-framework-prior-art.md)

#### 4. What shape should the library's public Kotlin API take?

**Options to compare:**

- **Command definitions:** a builder DSL with `@DslMarker`, class-per-command inheritance, or
  annotations.
- **Handler signatures:** the invocation context as a receiver, as a parameter, or as a
  context parameter.
- **Option access:** typed accessors (delegates, reified generics) versus lookup by name
  returning `Result`.
- **Snowflakes:** value classes versus raw `Long` versus JDA's own types.
- **JDA types:** exposed in the public API, or behind library-owned types.
- **Failures:** `Result` with typed stackless exceptions versus sealed outcome types.
- **Stability tiers:** how `@SupportedExtension` and an Experimental `@RequiresOptIn` marker
  are expressed; explicit API mode.
- **Binary compatibility:** the Kotlin Gradle plugin's ABI validation versus the
  binary-compatibility-validator plugin.
- **Coroutines:** who owns the bot's coroutine scope, and how supervision and cancellation work.

**Requirements:**

- The public API uses only stable features of Kotlin 2.2.x. Anything still in preview stays out
  or sits behind the Experimental marker.
- Consumers are Kotlin on the JVM only.
- The design is open-ended, with the organisation's three stability tiers.
- Expected failures and lookups that can miss return `Result`, never a nullable value.
- Definitions are immutable and safe for concurrent invocations.
- Every public declaration has KDoc.

**Evidence that settles it:**

- Kotlin's documentation and KEEPs on context parameters, value classes, type-safe builders,
  opt-in requirements, explicit API mode and ABI validation.
- Kotlin's guidelines for library authors.
- The public APIs of comparable Kotlin libraries (Ktor, kotlinx.coroutines, Kord Extensions,
  BotCommands) at pinned versions.

**Findings:** [`idiomatic-kotlin-api-shape.md`](idiomatic-kotlin-api-shape.md)

#### 5. How should the bot runtime handle events, plugins, scheduled jobs, configuration and sharding?

**Options to compare:**

- **Event dispatch:** a single JDA listener feeding a typed registry on the bot's scope;
  `jda-ktx`'s coroutine event manager; or event flows.
- **Plugins:** installation in code, `ServiceLoader` discovery, or plugins named in
  configuration.
- **Jobs:** coroutine loops with persisted state versus a scheduling library.
- **Configuration:** environment variables plus an optional file read through a configuration
  library, or plain properties.
- **Sharding:** JDA's `ShardManager` from the start, or a single connection behind an
  abstraction that can switch.

**Requirements:**

- A plugin adds commands, event handlers, jobs and settings without touching core.
- Gateway intents and member caching follow from what the installed features declare.
- Jobs such as the match tracker and the patch-notes feed survive handler failures and
  restarts, with their state persisted through the storage ports.
- A job posts once per guild, not once per shard.
- The token comes from the environment or a file outside the repository.
- Lifecycle status and events stay internal or Experimental.

**Evidence that settles it:**

- JDA's documentation and source for sharding, event managers, intents and cache policies.
- `jda-ktx`'s event manager.
- The extension systems of comparable frameworks.
- kotlinx.coroutines' guidance on supervision and cancellation.
- Documentation for scheduling and configuration libraries.

**Findings:** [`bot-runtime-design.md`](bot-runtime-design.md)

#### 6. Which persistence stack should implement the storage ports on SQLite?

**Options to compare:**

- **Access layer:** Exposed (its current release line, and whether `1.0` is final), plain JDBC
  with a thin Kotlin layer, SQLDelight's JVM driver, or jOOQ.
- **Migrations:** Flyway, Liquibase, Exposed's migration tooling, or scripts keyed by
  `PRAGMA user_version`.
- **Connections:** a single connection versus a pool, WAL mode and busy timeouts.
- **Coroutines:** how database access integrates with them.

**Requirements:**

- The ports live in `bottools-core` with no database dependency. They are `suspend` and
  return `Result`.
- Keys are 64-bit Discord snowflakes.
- Account links are global per user, and tracking subscriptions are per guild.
- Plugins get private key-value storage.
- Everything stored about one user can be erased.
- The schema migrates existing files across releases.
- Level-3 tests run against temporary SQLite files.

**Evidence that settles it:**

- Maven Central metadata and release notes for each library.
- Their documentation on SQLite and coroutines.
- sqlite-jdbc's documentation on concurrency and WAL.
- The migration tools' lists of supported databases.

**Findings:** [`sqlite-persistence-stack.md`](sqlite-persistence-stack.md)

#### 7. Which HTTP, JSON, caching and call-budget stack should providers and plugins share?

**Options to compare:**

- **HTTP client:** the Ktor 3 client, OkHttp directly (if JDA already brings it), or the JDK's
  HTTP client.
- **JSON:** kotlinx-serialization versus Jackson.
- **Caching:** Caffeine versus a small in-house cache.
- **Budgets:** a token-bucket library versus an in-house budget.
- **Feeds:** Rome or an alternative for RSS and Atom.
- **Testing:** each option's support for tests against recorded responses.

**Requirements:**

- One stack serves every stats provider and the weather plugin, and any feed fetching.
- Every provider call passes through a cache and a per-provider budget.
- JSON maps to Kotlin types.
- The library's classpath stays lean and free of conflicts with JDA's dependencies.
- Versions are current and work with Kotlin 2.2.x and JDK 21.

**Evidence that settles it:**

- Maven Central metadata and POMs, including JDA's dependency tree.
- Each library's documentation, changelog and compatibility statements.

**Findings:** [`http-client-stack.md`](http-client-stack.md)

#### 8. What can OpenDota and Steam provide for Dota 2 account links, profiles, match history and patch notes, and at what call budget?

**Options to compare:**

- **Data source:** OpenDota's endpoints for players, recent matches, match details and
  constants, with STRATZ's API as a comparison point only.
- **Account resolution:** accepting Steam64 ids, profile URLs and vanity names (vanity
  resolution goes through the Steam Web API, which needs a key), versus numeric ids only.
- **Patch notes:** Steam's news API, Dota 2's own patch-notes feed, or an RSS feed.

**Requirements:**

- No HTML scraping.
- Today's last-match post keeps its layout where the data allows: K/D/A, farm, damage, lane,
  talents and item line.
- New matches reach subscribed channels automatically.
- A public bot's tracker stays within the provider's limits as its audience grows. The answer
  therefore gives:
  - the free and keyed limits and the price of a key;
  - the terms of use (attribution, caching, commercial use);
  - how fresh recent matches are, and which data needs a parse request;
  - a model of calls per tracked account.

**Evidence that settles it:**

- OpenDota's documentation, and its open-source server `odota/core`, which holds the API
  specification and the rate-limit configuration.
- `odota/dotaconstants` for heroes, items and image paths.
- The Steam Web API documentation.
- STRATZ's documentation.

**Findings:** [`dota2-data-sources.md`](dota2-data-sources.md)

#### 9. What public data sources exist for Marvel Rivals, Path of Exile 2, No More Room in Hell and weather, and what does each allow?

**Options to compare:**

- **Marvel Rivals:** any official API, community APIs, and Tracker Network.
- **Path of Exile 2:** Grinding Gear Games' official API (OAuth scopes for characters and
  ladders) and poe.ninja's economy data.
- **No More Room in Hell:** the Steam Web API's user stats and achievements, if the game
  publishes any.
- **Weather:** Open-Meteo (forecast and geocoding) versus MET Norway's API versus other free
  services that need no key.

**Requirements:**

- Documented JSON APIs only, used by a free public bot.
- For each source, the answer establishes:
  - which provider capabilities it can honestly support (profile, match history, match detail,
    ladder, economy, achievements);
  - authentication and keys;
  - rate limits;
  - terms for a public bot (attribution, commercial use, caching);
  - whether the source is official or community-run, and how stable it is.
- For weather, the answer also covers current conditions plus a short forecast, a geocoder that
  replaces today's local zip-code file, and attribution.

**Evidence that settles it:**

- Each provider's official documentation and terms.
- Their public repositories, where they exist.

**Findings:** [`game-and-weather-data-sources.md`](game-and-weather-data-sources.md)

#### 10. How should MagicBot consume builds of the library that are not yet released?

**Options to compare:**

- **Composite build:** applied only when the sibling checkout exists, with substitution by
  coordinates.
- **Snapshot sources:**
  - `-SNAPSHOT` publishing from `main` to the Central Portal's snapshot repository, by hand or
    from CI;
  - GitHub Packages;
  - JitPack;
  - Gradle source dependencies.
- **CI:** MagicBot's CI checking out this repository beside it.

**Requirements:**

- MagicBot builds through the composite build when the checkouts sit side by side, and against
  `-SNAPSHOT` builds from `main` otherwise.
- Publishing to a package registry is a deliberate manual act, and no registry credentials live
  in CI. The organisation's staging analogue for libraries is a `-SNAPSHOT` from the default
  branch.
- Publishing uses `com.vanniktech.maven.publish` under the `io.github.spartanlaboratories`
  namespace.
- The GeneralTools publishing findings in 1.2 are reused.

**Evidence that settles it:**

- Gradle's documentation on composite builds, dependency substitution and source dependencies.
- The vanniktech plugin's documentation and source for `-SNAPSHOT` versions.
- Sonatype's Central Portal documentation on snapshots: namespace enablement, retention and token
  scopes.
- GitHub Packages' documentation on anonymous Maven reads.
- JitPack's documentation.

**Findings:** [`unreleased-build-consumption.md`](unreleased-build-consumption.md)

#### 11. What does each part of `KotlinBottools` and `GKB2` do today, which copy is better, and where does it go?

**Options to compare, per type:** port it onto the new model, fold it into a plugin, replace
it with a new system, drop it, or list it as a potential feature after the roadmap.

**Requirements:**

- The kept surface in 1.1 is rebuilt.
- These are replaced: HTML scraping, the XML storage layer, Spring wiring, the
  classpath-scanning responder and the Compose manager.
- These are not carried into the roadmap but are listed, one line each, as potential later
  features:
  - activity points and promotion ranks;
  - playlists and channel duplication;
  - channel-reserving conversations;
  - spam control;
  - the stdin console;
  - the daily-update hook.
- Where both repositories hold a copy, the better one is named with the defect that decides it.
- Tests, resources, build files and the README are covered too.
- `GKB2`'s open issues #2–#5 close when `GKB2` is archived.

**Evidence that settles it:**

- Both codebases at the baselines, with `git log` and `git blame` for intent.
- `GKB2`'s open issues.
- `GKB` and `BotTools`, for lineage only.

**Findings:** [`codebase-inventory-and-fate.md`](codebase-inventory-and-fate.md)

#### 12. What must the history rewrite remove from each bot repository, and how is it done safely on GitHub?

**Options to compare:**

- **Rewrite method:** `git filter-repo` by path, by content (`--replace-text`), or both, with
  BFG Repo-Cleaner as a comparison.
- **Ordering:** relative to open branches, archiving, and `KotlinBottools` becoming public.
- **What GitHub keeps after a force-push** (pull-request refs, forks, cached views), and how to
  clear it.

**Requirements:**

- No secret or data file remains in the history of `KotlinBottools`, `GKB2`, `GKB`,
  `BotTools` or `TrumpBot`, or of `Support` if it is bot-related.
- `KotlinBottools`' known paths are `key.txt`, `guildData/`, `BotData.xml`,
  `WebParseKeys.xml`, `services/`, `res/`, `.gradle/` and `.idea/`.
- `guildData/` is copied outside the repository first, because the legacy importer reads it.
- Each repository's `main` (or `master`) is force-pushed once.
- `.gitignore` covers secrets, data directories, build output and IDE files afterwards.
- The answer lists every tracked secret, data, IDE and build path per repository, with the
  commits that add and remove it, without reproducing any secret value.

**Evidence that settles it:**

- Every repository's full history.
- GitHub's documentation on removing sensitive data.
- `git filter-repo`'s documentation.

**Findings:** [`bot-repository-history-purge.md`](bot-repository-history-purge.md)

### 1.4 Lenses

Each researcher applies three lenses inside its own question, wherever they bear on it:

1. **The best systems for the purpose:** how this class of problem is solved well, what mature
   libraries in the same space expose, and which approaches fail at scale.
2. **Common practice and convention:** what a consumer of a library like this expects, and the
   conventions these repositories already follow.
3. **Idiomatic Kotlin:** the constructs that genuinely suit the design, grounded in the
   organisation's paradigm. That means OOP for domain modelling, FP for data transformation,
   and `Result` for expected failures.

Question 4 is the dedicated idiomatic-Kotlin question, because the shape of the public API is
itself being designed.

### 1.5 Source reachability

The research environment's network policy can refuse a primary source's host. When that
happens:

- The researcher reads the same primary content from a reachable mirror. Discord's API
  documentation is the `discord/discord-api-docs` repository, and OpenDota's API specification
  is in `odota/core`.
- Every claim that could not be opened at its source is marked unverified. Nothing is guessed in
  its place.
- A question left incomplete for that reason is marked **Unfinished — needs a planner re-pass**
  in this file's Known gaps. The note names the unreachable hosts and the decisions and phases
  that stay provisional. Every document that depends on the question carries the same note.

### 1.6 Verification plan

- **Outside-world claims.** Every findings file ends with its load-bearing claims, each with a
  verbatim quote, its link and the version or date it applies to. One verifier re-opens every
  source.
  - A claim that **fails** leaves the design inputs, and any decision resting on it opens again.
  - A claim that is **unclear** may stay, with its weakness stated wherever it is used.
- **Claims about these codebases** are spot-checked against the code by the planner.

---

## Part 2 — Verification results

Every load-bearing claim in the twelve findings files was re-opened at its source on
2026-10-20, at the pin or version its file names. Two claims that this summary rests on
directly, P1 and P2 (2.1), were checked the same way.

| Findings file | Claims | Hold | Unclear | Fail |
|---|---|---|---|---|
| [discord-platform-rules](discord-platform-rules.md) | 36 | 36 | 0 | 0 |
| [jda-and-coroutine-bridge](jda-and-coroutine-bridge.md) | 16 | 16 | 0 | 0 |
| [command-framework-prior-art](command-framework-prior-art.md) | 35 | 35 | 0 | 0 |
| [idiomatic-kotlin-api-shape](idiomatic-kotlin-api-shape.md) | 34 | 34 | 0 | 0 |
| [bot-runtime-design](bot-runtime-design.md) | 26 | 26 | 0 | 0 |
| [sqlite-persistence-stack](sqlite-persistence-stack.md) | 27 | 27 | 0 | 0 |
| [http-client-stack](http-client-stack.md) | 28 | 27 | 1 | 0 |
| [dota2-data-sources](dota2-data-sources.md) | 20 | 16 | 4 | 0 |
| [game-and-weather-data-sources](game-and-weather-data-sources.md) | 27 | 18 | 9 | 0 |
| [unreleased-build-consumption](unreleased-build-consumption.md) | 20 | 20 | 0 | 0 |
| [codebase-inventory-and-fate](codebase-inventory-and-fate.md) | 4 | 4 | 0 | 0 |
| [bot-repository-history-purge](bot-repository-history-purge.md) | 24 | 24 | 0 | 0 |
| P1 and P2 | 2 | 2 | 0 | 0 |
| **Total** | **299** | **285** | **14** | **0** |

No claim fails, so nothing in Part 3 rests on a refuted claim.

### 2.1 P1 and P2

- **P1: OpenDota counts a request before it refuses it.** In `odota/core` @ `449fb7b`
  (`svc/web.ts`), the middleware increments both counters first
  (`command.hincrby("rate_limit", …)`, `command.hincrby("daily_rate_limit", …)`) and compares
  afterwards (`if (remMinute < 0) { return res.status(429)… }`,
  `if (!res.locals.isAPIRequest && remDay < 0) { … }`). A `POST /api/request/{id}` costs 10
  (`rateCost = 10`). Three qualifiers hold: the block runs only when `ENABLE_API_LIMIT` is set
  (empty by default in the repository); the daily refusal applies only without a key; keyed
  requests increment both counters too. A refused request therefore still spends quota.
  404, 429 and 500 responses are not billed, but they count toward the rate limits.
- **P2: the Gradle range documented for each Kotlin Gradle plugin (KGP) line**, from Kotlin's
  compatibility table (`kotlinlang.org/docs/gradle-configure-project.html`, source
  `docs/topics/gradle/gradle-configure-project.md` in `JetBrains/kotlin-web-site`, read
  2026-10-20): KGP 2.2.0 to 2.2.21 on Gradle 7.6.3 to 8.14; 2.3.0 and 2.3.10 on 7.6.3 to
  9.0.0; 2.3.20 and 2.3.21 on 7.6.3 to 9.3.0; 2.4.0 and 2.4.10 on 7.6.3 to 9.5.0; 2.4.20 and
  2.4.21 on 7.6.3 to 9.7.0. KGP 2.3.0 is the first line documented on any Gradle 9 release.

### 2.2 Claims that could not be opened at their source

All 14 sit behind hosts the environment refuses. Each stays in its findings file with its
weakness stated, and what rests on it is provisional (Known gaps).

| Claim | What it says | Unreachable host | What rests on it |
|---|---|---|---|
| http-client-stack 20 | Path of Exile declares its rate limits in `X-Rate-Limit-*` headers, which "may change without notice" | www.pathofexile.com | a budget that takes rules from headers (PoE 2) |
| dota2-data-sources 17; game-and-weather-data-sources 25 | The Steam Web API allows 100,000 calls a day, and Steam data about a user is retrieved only "as requested by the end user" | steamcommunity.com | vanity names resolved only on request; the No More Room in Hell provider |
| dota2-data-sources 18 | SteamDB offers no API and disallows scraping | steamdb.info | not using SteamDB's feed |
| dota2-data-sources 19 | OpenDota asks for credit when its code is reused | blog.opendota.com | the attribution wording |
| dota2-data-sources 20 | STRATZ's token tiers | stratz.medium.com | nothing (comparison only) |
| game-and-weather-data-sources 11 | Zippopotam.us needs no key and serves GeoNames data "as-is" | docs.zippopotam.us | the fallback postal-code geocoder |
| game-and-weather-data-sources 12 | Nominatim allows at most one request a second | operations.osmfoundation.org | nothing (not used) |
| game-and-weather-data-sources 15 | The Marvel Rivals community API is "non-official" and keyed, with 3,000 free requests a day and a player refresh at most every 30 minutes | marvelrivalsapi.com | the Marvel Rivals provider |
| game-and-weather-data-sources 16 | Tracker Network lists no Marvel Rivals API | tracker.gg | the absence of another source |
| game-and-weather-data-sources 17 and 18 | GGG's API needs per-user authorization and "may change without notice"; it has a ladder scope and a `poe2` realm | www.pathofexile.com | the PoE 2 provider's capabilities |
| game-and-weather-data-sources 21, second part | poe.ninja's economy endpoints are its supported public surface (the first part, that its other endpoints are internal, holds) | poe.ninja | the PoE 2 economy provider |
| game-and-weather-data-sources 26 | No More Room in Hell lists 115 achievements, and private profiles hide data | steamcommunity.com, developer.valvesoftware.com | the No More Room in Hell provider |

### 2.3 Claims that hold with a caveat

- **discord-platform-rules 30 to 32** (privacy policy, deletion, encryption at rest, use of API
  data) hold for the Developer Terms and Developer Policy effective 2022-10-01. A version
  effective 2024-07-08 exists on support-dev.discord.com, which the environment refuses, so the
  public-bot obligations built on them are provisional (Known gaps).
- **P2:** Gradle 9.0.0 is the upper end of the KGP 2.3.0 and 2.3.10 ranges, not a lower bound.
- **jda-and-coroutine-bridge 7:** JDA 6.2.1's "start migrating to JDA 6 as soon as possible"
  concerns Discord's DAVE voice protocol. JDA 6.7.0's own release notes are what tie channel
  obfuscation (mandatory 2026-11-16) to the 6.x line.
- **sqlite-persistence-stack C20:** the SQLite commit that fixes the WAL-reset race is
  confirmed; the affected range (3.7.0 to 3.51.2) and the first fixed release (3.51.3) rest on
  secondary articles.
- **unreleased-build-consumption 16:** JitPack's text lives at `building/_index.en.md` and
  `faq/_index.en.md`, worded slightly differently ("JitPack compiles projects using OpenJDK
  Java 8 by default for legacy compatibility").
- **idiomatic-kotlin-api-shape C6 and C15** quote shortened sentences; the full sentences say
  the same thing.
- **jda-and-coroutine-bridge 6 and 7, and http-client-stack 16 and 25,** were read from
  rendered pages, not raw text.

### 2.4 Currency and reachability

- **Pins.** None of the pinned sources had moved: Discord's documentation at `fd75e22`,
  `odota/core` at `449fb7b`, `jda-ktx` at `4fc12af`.
- **Newest releases on 2026-10-20:** JDA 6.7.0, jda-ktx 0.15.0, Exposed 1.6.0, sqlite-jdbc
  3.53.4.0, Ktor 3.6.0, OkHttp 5.5.0, kotlinx.coroutines 1.11.0, kotlinx-serialization 1.12.0,
  vanniktech 0.37.0, binary-compatibility-validator 0.18.2, Hoplite 3.0.4, Caffeine 3.3.1,
  Quartz 2.5.2 and Rome 2.1.0. Gradle 9.8.2 exists; its composite-build and
  configuration-cache documentation reads the same as 9.7.1's.
- **Refused hosts.** At verification: steamcommunity.com, steamdb.info, blog.opendota.com,
  stratz.medium.com, docs.zippopotam.us, operations.osmfoundation.org, marvelrivalsapi.com,
  tracker.gg, www.pathofexile.com and poe.ninja. The findings could not reach discord.com,
  docs.discord.com, support-dev.discord.com, OpenDota's and Steam's API and documentation
  hosts, Sonatype's Central Portal pages, sqlite.org or docs.gradle.org either.

### 2.5 Claims about these codebases

These were checked against the code at the baselines:

- `GuildDataParser` sits entirely inside one block comment, and `GuildManager` is never
  created. GKB2 never calls `Parser.addTrigger`, so its typed path is dead.
- KotlinBottools' `ReactionRoleActions.giveReactionRole` grants the mapped role for a reaction
  on any message, and neither repository checks a member's permissions before an
  administrative command.
- `BotListener` passes the stored default role to `getRoleById`, while `KotGDP` seeds that
  value as a role name. GKB2's `Test.testRead` prints the content of the token file it reads.
- KotlinBottools' history holds a second data copy at `src/test/guildData/`. TrumpBot tracks
  key files, data files and binaries, and its `.classpath` names the `Support` project. The
  three copies of the legacy data cover the same six servers (3.13).
- MyGameTools' `build-logic` applies KGP 2.2.0 and vanniktech 0.36.0 on Gradle 9.7.1.

---

## Part 3 — Summary

Citations name the findings file and its section. A point marked *provisional* depends on a
source that could not be read; Known gaps names the source and what would settle it.

### 3.1 Findings files

| # | File | What it settles | State |
|---|---|---|---|
| 1 | [discord-platform-rules.md](discord-platform-rules.md) | Command limits, interaction timing, intents per feature, privileged-intent approval, sharding, rate limits, public-bot obligations | Complete except the current Developer Terms and Policy (Known gaps) |
| 2 | [jda-and-coroutine-bridge.md](jda-and-coroutine-bridge.md) | The JDA release line and the jda-ktx pairing | Complete |
| 3 | [command-framework-prior-art.md](command-framework-prior-art.md) | One command with a slash and a typed form: definitions, parsing, aliases, context, deferral, errors, help, components, tests | Complete |
| 4 | [idiomatic-kotlin-api-shape.md](idiomatic-kotlin-api-shape.md) | Public API shape, failures, stability tiers, ABI checks, coroutine ownership | Complete |
| 5 | [bot-runtime-design.md](bot-runtime-design.md) | Events, plugins, jobs, configuration, intents, sharding, lifecycle | Complete |
| 6 | [sqlite-persistence-stack.md](sqlite-persistence-stack.md) | Access layer, connections, migrations, port shape, erasure | Complete |
| 7 | [http-client-stack.md](http-client-stack.md) | HTTP client, JSON, cache, call budget, feed parsing, tests | Complete |
| 8 | [dota2-data-sources.md](dota2-data-sources.md) | OpenDota and Steam for Dota 2: endpoints, limits, budget model, patch notes | **Unfinished — needs a planner re-pass** |
| 9 | [game-and-weather-data-sources.md](game-and-weather-data-sources.md) | Marvel Rivals, Path of Exile 2, No More Room in Hell, weather | **Unfinished — needs a planner re-pass** |
| 10 | [unreleased-build-consumption.md](unreleased-build-consumption.md) | Composite build and snapshots for MagicBot | Complete |
| 11 | [codebase-inventory-and-fate.md](codebase-inventory-and-fate.md) | What each part of both codebases does, and where it goes | Complete |
| 12 | [bot-repository-history-purge.md](bot-repository-history-purge.md) | What the history rewrite removes, and how | Complete |

### 3.2 Discord platform rules

Source: [discord-platform-rules](discord-platform-rules.md) §2, §3.

- **A bare prefix in a server needs the privileged `MESSAGE_CONTENT` intent.** Without it,
  guild message content arrives empty, except in messages that @-mention the bot, DMs to the
  bot, replies to the bot's messages and the target of a message context-menu command. So the
  typed form that always works is `@Bot command …` in servers and `!command …` in DMs; a bare
  `!` in servers is a mode that needs the intent.
- **Privileged intents are approved by audience size** (Discord's rule since 2026-06-10).
  Below 10,000 unique users who can see the app, each is a Developer Portal toggle. At 10,000
  the app has 90 days to apply and must re-apply every year, and Discord may deny a use case
  that "can be accomplished through interactions or other means without privileged intents".
  Pages that still say 100 servers are superseded. App Verification is a separate process
  whose criteria are unverified.
- **Intents by feature.** Slash commands, context menus, components and modals need none.
  Typed commands by mention or DM need `GUILD_MESSAGES` and `DIRECT_MESSAGES`. Reaction roles
  need `GUILD_MESSAGE_REACTIONS`. The default role and welcome message on join need the
  privileged `GUILD_MEMBERS`. Posting needs only channel permissions. The legacy import needs
  none, because a member search by prefix (up to 100 results) works without it. An intent
  requested in code but not enabled in the portal closes the connection with code 4014.
- **Registration limits the library checks itself**, because JDA checks neither the
  8,000-character total nor Discord's exact name pattern:
  - names match `^[-_ʼ\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$`, in lower case where it
    exists; descriptions are 1 to 100 characters;
  - at most 25 options or subcommands per level, required options first, at most 25 choices,
    and no autocomplete on a choice option;
  - nesting stops at command, group, subcommand, and a command with subcommands cannot be
    invoked itself;
  - at most 100 slash, 15 user and 15 message commands, globally and per guild; at most 8,000
    characters of names, descriptions and values per slash command; at most 200 command
    creates per guild per day.

  Every alias published as a slash command spends these limits, so aliases are typed-only by
  default, and registration runs once per bot and is skipped when nothing changed.
- **Interactions.** Acknowledge within 3 seconds; the token then lasts 15 minutes. Whether a
  reply is ephemeral is fixed at the first acknowledgement. Components keep arriving after a
  restart as ordinary interactions, so they are routed by `custom_id` (1 to 100 characters)
  with no state held in memory.
- **Sharding and once-per-bot work.** Sharding is mandatory at 2,500 guilds; JDA's
  `ShardManager` fetches Discord's recommended count, fixed at login. `ReadyEvent` fires per
  shard and DMs reach shard 0 only. Identify is limited to 1,000 calls a day across all shards,
  and exceeding it resets the token, so login is never retried in a loop. Registration,
  trackers and the import run at bot level once every shard is ready
  ([discord-platform-rules](discord-platform-rules.md) §3.8).
- **Rate limits and dead channels.** REST allows 50 requests a second (interactions exempt);
  per-route limits come from headers, and JDA queues per bucket. 401, 403 and 429 responses
  count toward a temporary IP ban at 10,000 per 10 minutes, so a subscription that keeps
  failing with missing access, missing permissions or an unknown channel is disabled. From
  2026-11-16, channels the bot cannot view are omitted and obfuscated, so subscriptions carry a
  health state.
- **Installation.** Guild installation is the product mode, because subscriptions and posting
  need the bot in the guild. User-installable commands are a later, additive option.
- The public-bot obligations that follow from Discord's terms are in 3.15.

### 3.3 JDA and the coroutine bridge

Source: [jda-and-coroutine-bridge](jda-and-coroutine-bridge.md) §2, §6.

- **`bottools-core` builds on JDA 6.7.0, declared `api` with an exact version.**
  - 5.6.1 (2025-06-08) is the last 5.x release; the 6.x line has shipped 16 stable releases
    since, and 6.7.0 is the release that handles channel obfuscation.
  - All 41 JDA classes KotlinBottools imports exist in 6.7.0. GKB2 loses two, `ActionRow` and
    `Button`, used only by its poker code.
  - JDA ships breaking changes in minor releases, so the version is pinned exactly and bumped
    as one reviewed change. Consumers may exclude the audio libraries `opus-java` and `tink`.
  - `api` rather than `compileOnly` (BotCommands' choice), because the library also runs
    MagicBot and must resolve a tested JDA by itself.
- **The bridge is `club.minnced:jda-ktx` 0.14.2, declared `implementation`.** It is on Maven
  Central under Apache-2.0, its classes carry metadata 2.3.0 (the newest a Kotlin 2.2.x
  compiler reads), and it links fully against JDA 6.7.0. 0.15.0 needs a Kotlin 2.4 compiler,
  and 0.13.0 pairs only with JDA 5.6.1. jda-ktx declares JDA at runtime scope, so a mismatched
  pair compiles against one JDA, runs on another and fails at class loading: the two move
  together.
- **Only the coroutine core is used** (`RestAction.await`, `Task.await`,
  `PaginationAction.asFlow`, `CoroutineEventManager`), all in one internal file. No jda-ktx
  type appears in a public signature, public inline body, supertype or default argument.
  `bottools-core` declares `kotlinx-coroutines-core` 1.10.2 as `api` itself.
- **The event manager is installed per shard with
  `setEventManagerProvider { CoroutineEventManager(scope = handlerScope, timeout = INFINITE) }`.**
  [jda-and-coroutine-bridge](jda-and-coroutine-bridge.md) §6 names `injectKTX()` instead, but
  [bot-runtime-design](bot-runtime-design.md) §3 F1 shows that on `DefaultShardManagerBuilder`
  it builds each shard's manager on jda-ktx's own default scope and takes no scope. The jda-ktx
  source confirms this, so the provider form holds.
- **Not established:** the linkage check proves symbols, not behaviour. Running 0.14.2 on
  6.7.0 is the walking skeleton's first check.

### 3.4 Command model

Source: [command-framework-prior-art](command-framework-prior-art.md) §2, §5, §6.

- **One handler and one context, reached from two directions.** discord.py is the only
  surveyed framework that unifies the slash and typed forms; the ones that unify them partly
  run two pipelines that drift. So one dispatcher turns every invocation into a
  `CommandContext` and runs path resolution, argument binding, preconditions, the handler and
  error presentation once. One option schema feeds the slash registration, the typed parser
  and help.
- **Definitions.** A sealed, immutable tree (`Group`, `Leaf`, `UserMenu`, `MessageMenu`) built
  by DSL builders whose `build()` runs the platform validator and returns `Result`. The slash
  payload is a pure function of the tree. A group has no handler; its bare typed name shows
  its help.
- **Typed parser.** A pure function `(tree, aliases, text, resolver) -> Result`. Tokens are
  quote-aware (smart quotes included), never lowercased, and keep `@` and `#` tokens, which
  today's `Parser` drops. Binding is positional in declaration order, with `name=value` and
  `--name value` for any option, one trailing greedy string, and mentions or snowflakes for
  entity options. Choices are validated; autocomplete has no typed form. Failures are a sealed
  `ArgumentError`. BotCommands' regex grammar is rejected: it breaks beyond a certain
  complexity.
- **Aliases.** An immutable table maps token sequences to canonical paths;
  `x and "y" becomes "z"` adds `[x, y] → [z]`. Aliases are typed-only unless explicitly marked
  for slash, and a marked alias counts toward Discord's limits. No surveyed framework maps a
  multi-token alias to a different path, so the resolution rule (longest match, and what wins
  when an alias equals a canonical path) is the library's own and gets its own tests. The old
  Dota 2 names become aliases of MagicBot's canonical paths.
- **Prefix policy.** A hook turns a message into a typed trigger, with three built-in modes:
  mention (always on), bare prefix in DMs (always on), and bare prefix in servers (per-guild
  prefix, `!` by default). The server mode is opt-in and needs `MESSAGE_CONTENT`; without it,
  start-up logs a warning and falls back to mention mode.
- **Context and acknowledgement.**
  - A `CommandContext` is created per event and never shared. It carries the invocation kind,
    invoker, location, target (menus), path, alias used, bound values and locale.
  - Its reply surface (`reply`, `defer`, `edit`, `followUp`) follows discord.py's sequencing,
    and an atomic acknowledgement state stops two parties both acknowledging. Each leaf
    declares a public or ephemeral reply.
  - In automatic mode the dispatcher defers with the declared visibility if the handler has
    not answered after about two seconds. No surveyed framework does this (Kord Extensions
    removed its automatic acknowledgement), so it gets a Level 2 test on a controllable clock
    before anything relies on it.
  - In typed form `defer` shows a typing indicator, and a reply cannot be ephemeral
    (Considerations, "Private replies to typed commands").
- **Preconditions** run once for both forms: guild-only, user and bot permissions, owner,
  cooldown and guild-enabled. A user-permission precondition also sets
  `default_member_permissions`, but enforcement never relies on it, because server
  administrators can change it and typed invocations bypass it.
- **Errors** are data (`Denial`, `ArgumentError`), rendered by one replaceable
  `CommandMessages` interface. An unknown command gets suggestions in mention mode and silence
  under a shared bare prefix. The dispatcher catches, logs and answers handler exceptions, and
  rethrows `CancellationException`.
- **Help** is a pure renderer of the tree, a path and the context: the usage line from the
  options, the aliases, and only the nodes the invoker passes. It serves `/help [path]` and
  typed help.
- **Components.** `custom_id` is a route plus an escaped key, with a codec enforcing 100
  characters. Handlers register at start-up, state that does not fit lives in storage under a
  short id, and an unknown route answers "expired".
- **Tests.** A `FakeCommandContext` records acknowledgements and replies, the parser and help
  are pure, and the registration payload is snapshot-tested against JDA's JSON. All of this
  runs at Level 2, without Discord.

### 3.5 Public API shape

Source: [idiomatic-kotlin-api-shape](idiomatic-kotlin-api-shape.md) §2, §5, §6.

- **Definitions.** A `@DslMarker` builder produces the immutable tree, and handlers are
  `suspend CommandContext.() -> Unit` (Ktor's idiom). Plugins contribute through
  `CommandTreeBuilder` extensions. Annotations are rejected (they put `kotlin-reflect` on
  consumers' API and bind by name at start-up), and so is a class per command (the source of
  today's shared-state defects).
- **Options are typed keys.** An `Option<T>` is declared once, created by a named factory
  (`stringOption`, `userOption`, …) and read as `ctx[option]`. No name-inferring delegates (a
  Kotlin rename would silently rename a Discord-visible option) and no public `reified`
  factories (their bodies leak into consumers through `@PublishedApi`).
- **No public read returns `T?`**, following the organisation's rule that reads which can
  miss return `Result`. A required option is bound before the handler runs. An optional option
  either declares a default (`orInvoker()` on a user option, for example) or is read through
  an accessor returning `Result<T>` with a typed "not supplied" failure. A lookup by name
  returns `Result`. The location is a sealed `Guild(guildId, channelId)` or
  `DirectMessage(channelId)`, and guild-only commands get a `GuildCommandContext` whose guild
  is never null.
- **Identifiers** are `@JvmInline value class`es over `Long` (`GuildId`, `UserId`,
  `ChannelId`, `RoleId`, `MessageId`), printed unsigned. Every port takes them, never JDA
  types.
- **Where JDA appears.**
  - Free of JDA: the context, ids, tree, alias table, `ArgumentError`, help, prefix policy and
    every port in `bottools-core`; all of `bottools-data-sqlite`; the stats providers.
  - JDA-visible, in three documented places: the typed event registry's event types;
    entity-valued options and reply payloads (JDA data types such as `MessageEmbed` and
    `MessageCreateData`); and one native accessor on the context, marked `@SupportedExtension`
    or Experimental because JDA minors can break it.
  - A JDA major release is a bottools major release. A JDA minor that breaks a JDA-visible
    signature ships as a bottools feature release, with the JDA pin recorded.
  - A full wrapper over JDA is rejected. A stricter, ids-only line is the fallback if the
    reaction-roles plugin shows the lighter line leaking.
- **Failures.**
  - `kotlin.Result<T>` carries stackless failures under one open `BotToolsException` base, to
    which modules and plugins add their own. Sealed sets cover only closed protocols (node
    kinds, invocation kinds, location, acknowledgement state, `ArgumentError` kinds); `Denial`
    stays open for plugins.
  - Kotlin's `Result` KEEP prefers nullable or sealed outcomes for failures handled locally.
    The organisation's rule takes precedence, and narrow helpers such as `foldFailure`
    contain the cost.
  - No library code wraps a suspend call in `runCatching`, which swallows cancellation
    (kotlinx.coroutines #1814, open since 2020). An internal `suspendCatching` rethrows
    `CancellationException`, and detekt's `SuspendFunSwallowedCancellation` is on.
  - Ports are tested with hand-written fakes, because MockK #1073 mishandles
    `suspend … : Result<T>`.
- **Stability tiers and gates.** `@SupportedExtension` and `ExperimentalBotToolsApi`
  (`@RequiresOptIn(level = ERROR)`), modelled on MyGameTools; `explicitApi()`; Dokka with
  `reportUndocumented` and `failOnWarning`; binary-compatibility-validator 0.18.2 in `check`,
  with the Experimental marker in `nonPublicMarkers` (untested). KGP's own ABI validation is
  experimental in 2.2.0 and is not used. `@SubclassOptInRequired` marks interfaces the library
  will extend (`CommandContext`, the ports), so "stable to call" and "stable to implement" can
  differ. No `data class` appears in API that must evolve.
- **Coroutines.** The library owns one
  `CoroutineScope(SupervisorJob(parent) + dispatcher + name + handler)`, built from an
  injected context, shared with the event manager and cancelled on close. Handlers run on
  `Dispatchers.Default`; blocking work sits behind main-safe ports on an injected
  `Dispatchers.IO.limitedParallelism(n)`. No `GlobalScope`, and no `complete()` or JDBC call
  on a gateway or handler thread.
- **Not in the API:** Kotlin context parameters. They are a preview in 2.2.x and stable only
  from 2.4.0, and adopting them later would break signatures, so the API is designed without
  them.

### 3.6 Bot runtime

Source: [bot-runtime-design](bot-runtime-design.md) §2, §5, §6.

- **Dispatch.** One router per bot is the only JDA listener. Each shard's
  `CoroutineEventManager` runs on the bot's handler scope (3.3). The router looks events up in
  an immutable typed registry frozen at login, and runs each matching handler as its own child
  under `supervisorScope` with a per-handler timeout. Events have no guaranteed order, so
  handlers are idempotent against stored state; a keyed serial lane is available per handler.
  A `SharedFlow` per event type is rejected: a slow collector suspends the emitter, drop
  policies lose events, and a collector that throws stops listening silently.
- **Plugins are installed in code, and only there,** in declared order with `dependsOn`. A
  plugin contributes commands, typed handlers, jobs, settings, requirements (intents, cache
  flags, member policy), lifecycle hooks and data-erasure hooks, all before login, so the
  union of intents is exact. An install failure fails start-up and lists every problem.
  Automatic discovery through `ServiceLoader` is not offered (classpath presence would widen
  intents and registrations, the umbrella artifact contains every plugin, and fat jars need
  merged service files); it can be added later as an opt-in. Enabling a plugin per guild is a
  stored setting checked by a gate in the router.
- **Intents and caches are derived, never listed:** `GatewayIntent.fromEvents` over the
  registered handler types, plus `fromCacheFlags`, plus explicit declarations such as
  `MESSAGE_CONTENT` for the server prefix mode.
  - **A trap.** `DefaultShardManagerBuilder.create(token, intents)` silently sets
    `MemberCachePolicy.ALL` and `ChunkingFilter.ALL` when `GUILD_MEMBERS` is present, so both
    are set explicitly afterwards: `NONE` by default, never `ALL`.
  - **Privileged intents need an explicit allowance in configuration.** A feature whose intent
    is not allowed is switched off with a named log event if it is optional (the join features
    are) and fails start-up if it is required. The connection is never left to close with 4014.
- **Jobs** are sequential coroutine loops under their own supervisor: a fixed delay from
  completion, jitter at start-up, full-jitter exponential backoff and a timeout per run. A
  small persisted `JobState` holds next due, last started, last succeeded, consecutive failures
  and a cursor. An overdue job runs once at start; missed ticks are never replayed, because the
  cursor catches up. Jobs run at bot level, never per shard. Quartz is rejected (thread-based,
  its own JDBC schema next to the ports, misfire replay); krontab and cron-utils only compute
  times. Schedules use `java.time`, because `kotlin.time.Clock` is stable only from Kotlin
  2.3.0.
- **Configuration.** A typed `BotConfig` with no dependencies reads environment variables and
  an optional `.properties` file, and returns `Result` listing every problem. The token comes
  from `…_TOKEN_FILE` or `…_TOKEN` and is held in a masking `Secret`, never in the file source
  or `toString`. Hoplite (it puts `kotlin-reflect` and an old coroutines on consumers' runtime),
  Lightbend Config and the kotlinx-serialization formats stay out of `bottools-core`; an
  application may feed the builder from any of them.
- **Sharding.** Always `DefaultShardManagerBuilder`, not `createDefault`, with the shard total
  `-1` (Discord's recommendation) unless configuration overrides the total or range.
  `bot.ready` fires once every shard has reported ready; that rule is inference, proven in the
  walking skeleton. Login is never retried in-process. Multi-process deployments are not
  supported beyond pinning bot-level jobs to one process, because storage is SQLite on one host.
- **Start order:** configuration; storage, opened and migrated; plugin installation; gateway
  resolution (intents, caches, a validated registration payload); scopes; the shard manager;
  all shards ready; command registration, skipped when unchanged; plugin ready hooks; jobs. A
  failure before login returns `Result.failure`, closes in reverse whatever was opened, and
  connects nothing.
- **Stop order** (idempotent): close intake; stop jobs; drain in-flight handlers within a
  grace period; plugin stop hooks in reverse order, each bounded; cancel the scopes;
  `ShardManager.shutdown()` and `awaitShutdown` on each shard; close storage. JDA's own shutdown
  hook is disabled so that the library owns this order. The timeouts (10-second grace,
  5-second cancel, 10-second JDA shutdown) are proposals, not measurements.
- **Lifecycle state** is an internal `StateFlow`, not a management seam.

### 3.7 Storage

Source: [sqlite-persistence-stack](sqlite-persistence-stack.md) §2, §5, §6.

- **Plain JDBC on `org.xerial:sqlite-jdbc` 3.53.4.0, behind a thin internal layer.** No
  Exposed, SQLDelight, jOOQ, R2DBC or connection pool: the work is about six tables and a few
  dozen fixed statements, and the hard parts are SQLite-specific and below any access layer.
  - Exposed's JDBC `suspendTransaction` does not leave the calling thread, it has no R2DBC
    dialect for SQLite, and from 1.3.0 it puts stdlib 2.3.20, coroutines 1.11.0,
    `kotlin-reflect` and `kotlinx-datetime` on every consumer.
  - Liquibase 5.x is under the Functional Source License. Flyway works but adds a history
    table, Jackson annotations and a `ServiceLoader` registry.
  - SQLDelight is the next step if the schema outgrows hand-written SQL.
- **Connections.** One writer with `transaction_mode=IMMEDIATE`, confined to
  `Dispatchers.IO.limitedParallelism(1)`, plus a small set of read-only connections. WAL mode,
  a `busy_timeout`, `foreign_keys=ON`, and `synchronous` from a `Durability` policy (`NORMAL`
  by default). Each port call is one transaction, and no transaction spans a suspension point.
  The file needs a local disk: WAL relies on shared memory, so a network file system will not
  do.
- **Migrations** are hand-written, forward-only and keyed by `PRAGMA user_version`, each in
  one `BEGIN IMMEDIATE` that also sets the version. The store refuses a file newer than it
  knows and backs up a non-empty file before migrating it. A released migration never changes;
  a checksum test guards this.
- **Port shape** (in `bottools-core`, with no database dependency):
  - every method is a complete unit of work; read-modify-write is a named atomic operation or a
    pure `update` function run inside the write section;
  - a miss is `Result.failure(NotFound)`; the failure kinds are `NotFound`, `Conflict`,
    `Busy`, `SchemaTooNew`, `Corrupt` and `Unexpected`;
  - unbounded reads are paged; parameters and results are value-class ids and immutable data;
  - a `Setting<T>(key, codec, default)` types each setting while storage holds encoded text,
    so a new setting needs no migration;
  - the importer writes with idempotent upserts, and implementing a port needs the
    `@SubclassOptInRequired` opt-in.
- **Erasure is a property of the schema.** Every table that can hold user data has an indexed
  `user_id`; plugin key-value rows carry `guild_id` and `user_id` owner columns (0 when
  absent). `eraseUser` and `eraseGuild` are single atomic operations over every table and owner
  scope and return counts per table; a plugin keeping data elsewhere erases it through its
  hook. SQLite keeps deleted bytes in free pages and the WAL until reused (`secure_delete` is
  available), and a backup taken before an erasure still holds the user (Considerations,
  "Backups and data deletion").
- **Schema.** `STRICT` tables with composite natural keys: `account_link`,
  `tracking_subscription` (each row with its own cursor and health), `guild_setting`,
  `job_state` and `plugin_kv`. Timestamps are epoch milliseconds.
- **Version floor.** A WAL-reset race can corrupt data when two connections write and
  checkpoint at once. It is reported in SQLite 3.7.0 to 3.51.2 and fixed in 3.51.3 (secondary
  sources), so the pinned sqlite-jdbc must bundle a fixed SQLite, and CI checks the version.
- **Tests.** One contract suite per port runs against the in-memory implementation and
  against SQLite on a temporary file, plus migration fixtures for every released schema
  version, a schema-drift test, a concurrency test and an erasure test. Multi-connection tests
  never use `:memory:`, where each connection is a separate database.

### 3.8 HTTP, JSON, cache and call budget

Source: [http-client-stack](http-client-stack.md) §2, §5, §6. The shared stack lives in
`bottools-stats`, and `bottools-plugins` uses it through its ports.

- **HTTP: OkHttp directly, at the version JDA brings (`okhttp-jvm` 5.5.0),** behind an
  internal `HttpTransport`. The suspend bridge copies OkHttp's 15-line `executeAsync`
  pattern, because the `okhttp-coroutines` artifact needs coroutines 1.11.0. Ktor 3.6.0 would
  add 19 artifacts and raise the runtime to coroutines 1.11.0 and stdlib 2.3.21; the JDK client
  has no DNS hook and saves nothing while JDA keeps OkHttp on the classpath. The OkHttp version
  moves only with JDA's.
- **JSON: kotlinx-serialization-json 1.9.0,** built for Kotlin 2.2, with the compiler plugin
  at the Kotlin version. Internal `@Serializable` wire types map to public domain types, and
  decoding starts from a size-capped string and ignores unknown keys. 1.12.0 needs a 2.4
  compiler. Jackson is rejected: JDA's copy is runtime-only, and `jackson-module-kotlin` needs
  `kotlin-reflect`.
- **Cache: one Caffeine 3.3.1 `AsyncCache` per provider,** with a time to live per endpoint
  and a size bound. Loads run in a library-owned scope and are awaited with
  `asDeferred().await()`, because `CompletionStage.await()` cancels a shared load for every
  caller. Failures are not cached; confirmed misses are, briefly. The key is the provider,
  endpoint and canonical parameters, with no guild in it.
- **Budget: an in-house `CallBudget` per provider,** shaped like Kord's acquire and complete.
  - Several windows (per minute, per day) sit below the published limits. Reservation happens
    under a mutex, and waiting outside it.
  - Lanes separate interactive and tracker calls, with a reserved interactive share and a wait
    cap per call.
  - A 429 pauses the provider until `Retry-After`, or until the provider's window boundary when
    no header comes. A remaining count reported by the server can only lower the local balance.
    A keyed provider has a hard daily stop. A utilisation reading lets the tracker stretch its
    intervals.
  - The client never retries in a loop: a 429 reaches the job as `RetryAfter`.
  - Layering is cache, then budget, then transport, so a hit costs nothing and coalesced
    callers share one call. Bucket4j 8.21.0 could replace the arithmetic only.
- **Settings and clocks.** OkHttp's `callTimeout` is set (none by default) and
  `maxRequestsPerHost` is sized from the budget (5 by default); responses are size-capped
  before reading. In tests, Caffeine's ticker, the budget's clock and coroutine `delay` share
  one injected time source.
- **Feeds.** Game news arrives as JSON (3.9), so it needs no feed parser. Whether a general RSS
  or Atom plugin exists is open (Considerations, "Feeds"). If it does, Rome 2.1.0 (last
  released 2023-03-12) sits behind a `FeedParser` port with DOCTYPEs disallowed, fetching goes
  through the shared client with a DNS guard against private addresses and caps on redirects
  and size, and `rssreader` 3.12.0 is the named replacement for Rome.
- **Tests.** Level 2 uses a fake transport serving recorded fixtures with scripted statuses and
  headers, on fake time. Level 3 runs the real transport against `mockwebserver3` 5.5.0. A
  fixture recorder runs only when an environment variable is set, never in CI, and strips keys.

### 3.9 Dota 2 *(provisional: Question 8 needs a re-pass)*

Source: [dota2-data-sources](dota2-data-sources.md) §2, §5, §6.

- **Source: OpenDota, without a key to start.** The repository defaults are 60 calls a minute
  and 3,000 a day per client IP without a key, and 300 a minute with no daily cap at $0.0001 a
  call with a key (404, 429 and 500 responses are not billed). `X-Rate-Limit-Remaining-Minute`
  is always sent and `X-Rate-Limit-Remaining-Day` only without a key; a refusal is a 429 with a
  JSON error and no `Retry-After`; a parse request costs 10 (P1). The deployed values could not
  be read, so every number is configuration, not a constant.
- **The daily allowance is the binding limit.** With labelled assumptions (three matches per
  account a day, a 20 % margin, 500 calls a day reserved for commands), uniform polling fits 6
  accounts at 5 minutes, 19 at 15, 37 at 30 and 70 at 60. Polling by activity (every 5 minutes
  within 2 hours of the last match, every 30 within 24 hours, otherwise every 3 hours) costs as
  much as a 30-minute interval while seeing active players within about 5 minutes. With a key,
  that mix costs about $0.15 per tracked account a month, and the minute limit binds near 8,000
  accounts. The budget is configured in calls a day; when demand exceeds it, intervals stretch
  rather than accounts being dropped. Buying a key is an operating choice that configuration
  absorbs.
- **Calls.** One `recentMatches` call per distinct account per tick, so many guilds following
  one account cost one poll; one `matches/{id}` call per new match, shared by every follower.
  Parse requests are never automatic (about 17 calls against 2 for an unparsed post), so an
  unparsed match shows "lane unavailable". `recentMatches` carries K/D/A, GPM/XPM, last hits,
  hero and tower damage, healing, duration, result and hero; denies, net worth, items, talents
  and the score need the detail call; OpenDota has no lane-outcome field. A "last match" call
  needs `significant=0` to include turbo and similar modes.
- **Accounts.** Steam64 ids, 32-bit account ids, and OpenDota, Dotabuff and
  `steamcommunity.com/profiles/` URLs need no key (`account_id = steam64 − 76561197960265728`).
  Vanity names need a Steam Web API key and are resolved only on the user's own request,
  through an optional capability present only when a key is configured. A 404 means "OpenDota
  has not seen this account"; an empty history means "turn on Expose Public Match Data".
- **Patch notes** come from Steam's keyless `ISteamNews/GetNewsForApp` (JSON) behind a
  `PatchNoteSource` port, polled hourly and deduplicated by item id per subscription cursor;
  posts carry the title, link and a trimmed excerpt. `dotaconstants`' `patchnotes.json` is
  optional enrichment. Which feed name or tag marks a Dota patch could not be observed.
  SteamDB's RSS (no API; scraping disallowed) and the undocumented `dota2.com/datafeed`
  endpoints are rejected.
- **Constants and images.** `odota/dotaconstants` (MIT) supplies heroes and items, refreshed
  daily, with `Hero #N` for unknown ids. Images come from `cdn.cloudflare.steamstatic.com` plus
  the constants' paths, and the item line is composed in memory per invocation.
- **Attribution.** Posts say "Data: OpenDota" and link to the match page; OpenDota's terms of
  use could not be read. STRATZ is not used: its terms could not be verified, and nothing needs
  it.

### 3.10 Weather and the later games

Source: [game-and-weather-data-sources](game-and-weather-data-sources.md) §2, §5, §6.

- **Weather: Open-Meteo for both forecast and geocoding.** The shape comes from Open-Meteo's
  own website and server source; live behaviour is provisional (Question 9).
  - No key. The free tier is non-commercial (under 10,000 calls a day, 5,000 an hour and 600 a
    minute, per IP); ads or subscriptions on the bot would make it commercial, so the base URL
    and a key stay configurable. The data is CC BY 4.0, so embeds link "Weather data by
    Open-Meteo.com".
  - Two ports, `Geocoder` and `WeatherProvider`. One call returns current conditions and five
    days; units are set per guild or user. A sealed `WeatherCode` has an `Unknown(code)` case;
    failures are `NoMatch`, `Ambiguous(candidates)`, `RateLimited` and `UpstreamError`.
    Geocodes are cached for days, forecasts for 10 to 15 minutes.
  - The old `getcity` and `getzip` become aliases of one `weather` command that takes a name
    or a postal code. Whether the geocoder resolves US ZIP codes as well as the old 4.3 MB file
    did is not established; if not, a Zippopotam.us `Geocoder` sits behind the same port. MET
    Norway (its own geocoder and strict etiquette) and the US National Weather Service (US only)
    are not used.
- **The later games** *(provisional: Question 9 needs a re-pass; scope in Considerations,
  "Later games")*.
  - **Marvel Rivals.** No official API exists in any source read. One community API
    (`marvelrivalsapi.com`, non-official, keyed, about 3,000 free requests a day, a player
    refresh at most every 30 minutes) covers profile with rank, match history and match
    detail. Its terms could not be read.
  - **Path of Exile 2.** GGG's API covers PoE 2 but needs per-user OAuth, and registration of
    new applications was reported closed on 2026-10-14. poe.ninja's economy endpoints are its
    supported public surface.
  - **No More Room in Hell.** Steam only, with an operator Steam key: profile, playtime (with
    `include_played_free_games`) and achievements; no matches and no economy.
- **What the provider model must allow, whichever games ship.**
  - A capability is account-scoped (profile, history, detail) or global (economy, an
    achievement catalogue, weather).
  - Account identity is a sealed set, each kind validated by its provider: Steam64, a Marvel
    Rivals id or name, a PoE account name.
  - Authentication is per provider (none, an operator key, an operator Steam key, per-user
    OAuth), and a provider that cannot authenticate at start-up is not registered.
  - A call can carry a season or league, and a `LADDER` capability exists because two sources
    offer one.
  - Lookups that can miss return distinct `Result` failures; a private Steam profile is an
    outcome for the user to fix, not an error.

### 3.11 Consuming builds that are not released

Source: [unreleased-build-consumption](unreleased-build-consumption.md) §2, §5, §6.

- **Composite build first, snapshots as the fallback, behind one dependency declaration.**
  MagicBot's settings include `../KotlinBottools` when it is a Gradle build (a property can
  override this); otherwise MagicBot resolves `1.0.0-SNAPSHOT` from
  `https://central.sonatype.com/repository/maven-snapshots/`, limited to the library's group.
  MagicBot's CI checks out both repositories side by side, pins the library by a commit SHA in
  a one-line `bottools.ref` file, and runs a scheduled build against `main` to warn of drift.
  No registry credential lives in CI.
- **Snapshots are published by hand** from a clean `main` with
  `./gradlew publishToMavenCentral`, at the end of each phase. vanniktech switches to the
  snapshot repository for a `-SNAPSHOT` version, where signing is optional. Unverified
  prerequisites: "Enable SNAPSHOTs" on the namespace, anonymous read, and a retention of about
  90 days.
- **The library's published-library convention plugin sets `group` and `version`,** because
  vanniktech's `coordinates()` changes only the publication coordinates while Gradle's
  automatic substitution matches `project.group:project.name`. Module directories equal the
  artifact ids, and `build-logic` gets a distinct `rootProject.name`. MyGameTools' plugin sets
  coordinates only; copied unchanged it would make the composite substitute nothing, so a check
  guards against that.
- **Gradle behaviour.** The included build runs on MagicBot's Gradle, so the two wrappers stay
  within one minor of each other. Plugin classpaths stay separate, and the library's tests run
  in its own CI.
- **Rejected.** GitHub Packages (a token even for public packages); Gradle source dependencies
  (they assume a `master` branch and have no current user-guide chapter); publishing from CI
  (a Portal token has no scope narrower than the account). JitPack is credential-free but uses
  other coordinates and needs a `jitpack.yml` for JDK 21; it stays in reserve.

### 3.12 Build toolchain

- **Base.** The build follows the organisation's `build-logic` in MyGameTools: a JDK 21
  toolchain, KGP 2.2.x, Dokka 2.2.0, the foojay resolver 1.0.0, Gradle 9.7.1 and vanniktech
  publishing.
- **KGP 2.2.x on Gradle 9 is not a documented pairing.** KGP 2.2.x is documented only up to
  Gradle 8.14 (P2), while vanniktech 0.36.0 and 0.37.0 require Gradle 9.0.0 or newer
  ([unreleased-build-consumption](unreleased-build-consumption.md) §3 F2; GeneralTools'
  `kmp-build-and-kotlin-compat.md` §3 F11).
  MyGameTools builds and publishes on exactly this pairing, so it works in practice; the
  walking skeleton proves it for this build (compile, Dokka, the ABI check, a publish to Maven
  Local). The documented alternative is the GeneralTools 3.0.0 shape: KGP 2.4.x with
  `languageVersion = apiVersion = 2.2`, `kotlin-stdlib` pinned at 2.2.x, and a compile check
  from a Kotlin 2.2.0 consumer. It moves the build compiler off the organisation's Kotlin
  2.2.x pin.
- **First compile-level checks:** jda-ktx 0.14.2 (metadata 2.3.0, the newest a 2.2.x compiler
  reads); the serialization plugin against runtime 1.9.0; how `okhttp-jvm` resolves beside
  JDA's copy; binary-compatibility-validator 0.18.2 on Gradle 9.7.1.
- **Not established:** whether a 2.4 compiler at `languageVersion = 2.2` reads metadata 2.4.0,
  which would admit jda-ktx 0.15.0. Nothing depends on it while the pin stays at 2.2.x.

### 3.13 What carries over from the two codebases

Source: [codebase-inventory-and-fate](codebase-inventory-and-fate.md) §2, §3, §7.

- **The surface carries over; the code does not.** Of about 8,000 lines, the command classes
  survive only as the surface rebuilt in 3.4 and 3.5. Everything that holds state (`Command`
  fields, the XML singletons, `Parser.triggers`, the `Bot` companion) is replaced, because it
  causes today's concurrency defects.
- **The better copy differs per part, so a file-level merge is wrong.** GKB2 is better for the
  command model: the alias DSL (`and`, `becomes`), `brief` and `details` as data, the `else`
  in `Command.invoke`, a `Result`-returning storage port, and the only math, weather, poker and
  admin code. KotlinBottools is better for what runs: the working typed path, the correct
  `targetMember` in `GameStatsCommand`, reaction-role welcome-message records and slf4j
  logging.
- **Defects the rebuild must not repeat:**
  - command model: invocation state in singleton `Command` fields; a blocking `complete()` in
    `Command.reply`; KotlinBottools' missing `else` in `Command.invoke(CommandContainer)`;
    `SubCommand.getParent` with no base case; open members read during `init`;
    `OrganizationCommand.invoke` asserting non-null on an unknown alias; `PropertyCommand`'s
    string reflection; GKB2's shared `DataAccessCommand.path`; `Parser` lowercasing input and
    dropping `@` and `#` tokens;
  - runtime: GKB2's `CommandFactory` cast and static event; `Responder`'s classpath scan and
    polling thread; `CheckValueService.run` dying on its first exception;
  - data and plugins: XML keyed by names; no permission check on `AddReactionRole`,
    `CreateMainWelcomeMessage` or GKB2's `admin`; `BotListener` reading a role id from a value
    seeded as a role name; KotlinBottools' `giveReactionRole` acting on any message (GKB2 has
    the guard but never wires it).
- **Not what it looks like.** Dota 2 lives in test scope in both repositories; only `setid`,
  `getid` and `lastgame` behave, and `showstats` is a stub, so it is built new. GKB2's typed
  path, `HelpCommand` and `admin` are dead; context menus have plumbing but no command;
  `GuildDataParser` is commented out; spam control is never switched on.
- **Plugins carry over behaviour, not classes.** Reaction roles combine KotlinBottools'
  message record with GKB2's welcome-message guard, and add permission checks and removal of
  the role when the reaction is removed. Math and weather are rewritten against their
  specification. Admin becomes typed get and set over the registered settings. Poker is rebuilt
  in its own phase; GKB2's table, seat and button flow is the reusable idea, and its
  `ActionRow` and `Button` code does not compile on JDA 6.
- **Legacy data.** Three copies cover the same six servers and the same two linked members.
  KotlinBottools' copy is the newest (2025-09-24) and holds one of the links; GKB2's
  (2023-09-17) holds both; TrumpBot's (2022-10-31) uses an older layout and links one of the
  two members to a different account. The six-entry Steam id list is the same in all three, and
  the server settings differ for one server only.
- **The importer.** Folders and members are keyed by names, so the importer resolves guilds by
  name among the bot's guilds and members with `retrieveMembersByPrefix` plus an exact match,
  reports what it cannot resolve rather than guessing, and does not import the seeded defaults
  (`defaultRole` "online", `welcomeMessage` "hello") as choices. Which copies it reads is open
  (Considerations, "Legacy data").
- **GKB2's open issues #2 to #5 are obsolete** after the consolidation: their components
  leave, or the rebuilt definitions carry their intent.
- **Six features leave the roadmap**, one line each in
  [codebase-inventory-and-fate](codebase-inventory-and-fate.md) §3.3: activity points and
  promotion ranks; playlists and channel duplication; channel-reserving conversations; spam
  control; the stdin console; the daily-update hook.
- **The rest is deleted:** the XML layer, the Spring files, the Compose manager, `MyLogger`,
  the scraping classes, `Date` and `DateTimeParser`, `GuildDataParser`, `RssService`, the
  ZIP-code file, the generated images, and build dependencies that nothing imports.

### 3.14 History rewrite

Source: [bot-repository-history-purge](bot-repository-history-purge.md) §2, §5, §6.

- **Scope.** The five bot repositories (KotlinBottools, GKB2, GKB, BotTools, TrumpBot) and
  `Support`, which is bot-related: it is TrumpBot's Eclipse companion (TrumpBot's `.classpath`
  names `/Support`, and its `TimeCommand` imports Support's `Date`) and vendors a lavaplayer
  native and a ForecastIO client. Support holds no secret and no data, so its pass removes
  binaries and IDE files only; what becomes of it afterwards is open (Considerations,
  "Support").
- **Secrets are confined to whole files** (`key.txt`, `keys.txt`, `key.pem`, `BotData.xml`)
  across all six histories; 34 candidate strings were searched in every blob, commit message,
  author field and ref name. So a rewrite by path is enough:
  `git filter-repo --sensitive-data-removal --invert-paths --paths-from-file <list>`, with one
  root-anchored literal list per repository
  ([bot-repository-history-purge](bot-repository-history-purge.md) §6.2), run in a mirror
  clone and followed by `git push --force --mirror`.
  - BFG is rejected: it matches names anywhere, which would delete the `services` source
    packages, and it protects the current commit.
  - Root anchoring matters because `services/`, `res/` and `bin/` are also source or build
    directories, and nested copies such as `src/test/guildData/`, `lib/bin/` and
    `lib/.settings/` exist.
- **Order.** First, copy the legacy data out of every repository, access-restricted because it
  is personal data, and record a manifest of the blob ids to purge. Then KotlinBottools (it
  blocks later work and goes public), then GKB2 and GKB (public, with personal data), then
  BotTools, TrumpBot and Support. Each goes through: rewrite and push; a Support ticket where
  one applies; the exit tests; a README pointer commit for the archived ones; then archive or
  make public.
- **What a force-push cannot reach.** `refs/pull/*` (today GKB2 #6, BotTools #2 and #3), cached
  views and forks keep the old objects until GitHub Support dereferences the pull requests and
  collects garbage. Support helps where rotating credentials cannot mitigate the risk; every
  token here is dead, so the credible ground is the personal data in GKB2's and GKB's public
  histories, and in KotlinBottools before it goes public. Any pull request merged into
  KotlinBottools before its rewrite adds such a ref (Considerations, "The planning pull request
  and the rewrite").
- **Branches, hashes and clones.** Two remote branches are not on disk (BotTools
  `Working-Branch`, TrumpBot `feature/pokercommand`); the mirror clone covers them. Every commit
  hash changes in all five bot repositories, because each root commit holds a purged path, so
  documents citing baselines are updated from `commit-map`. Existing clones, including those in
  this environment, are deleted and cloned again, never pulled.
- **Exit criterion,** per repository, on a fresh mirror with pull-request refs fetched: no
  purged path anywhere; every manifest blob id missing; no binary except the Gradle wrapper
  jar; `gitleaks` with the repository's configuration finds nothing; no pull-request ref
  reaches a purged blob. For KotlinBottools the tests run again after any Support ticket and
  before the visibility change.
- **Afterwards.** `.gitignore` covers secrets, data, build output and IDE files, root-anchored.
  CI runs the `gitleaks` binary (MIT; the GitHub Action needs a licence for organisations) with
  a custom rule for bare token files (the default Discord rule needs the word "discord" nearby)
  and with `--redact`, because Actions logs are public once the repository is. GitHub secret
  scanning is on.

### 3.15 Public-bot obligations for MagicBot *(provisional: the Developer Terms need a re-pass)*

Source: [discord-platform-rules](discord-platform-rules.md) §3.6, §6.

- **Privacy policy and terms.** The policy states what is collected, how it is used and
  shared, and how to request deletion, and names the third parties (OpenDota, Steam,
  Open-Meteo, and later providers). Both URLs sit on the application profile
  (`privacy_policy_url`, `terms_of_service_url`) and in the bot's help.
- **Deletion.** A delete-my-data command runs `eraseUser`, deleting the user's global account
  links and every subscription they created, and reports the counts. Removing the bot from a
  guild runs `eraseGuild`. Data is deleted promptly on request and when it is no longer needed
  for the bot's stated function.
- **Data use.** Ids and game links only, never message content, used only for the stated
  function. No unsolicited DMs: notifications go to the subscribed channel.
- **Deployment.** Encryption at rest is a requirement on the deployment, whose host is not
  decided.
- **Scale.** The configuration is ready for sharding (3.6), and the tracker's budget grows with
  the audience (3.8, 3.9).
- **Owner tasks.** The application's owner handles App Verification and any privileged-intent
  review; the library only reports an intent that is missing. MagicBot holds `GUILD_MEMBERS`
  for the join features; whether it also holds `MESSAGE_CONTENT` is open (Considerations,
  "MagicBot's typed form in servers").

---

## Considerations

Each of these choices changes what is built, and each blocks execution until it is settled.

1. **Feeds.** Does `1.0.0` carry a general feeds plugin, or only game news?
   - **(a) Game news only.** The stats framework gains a news-source capability, and Dota 2's
     patch notes post from Steam's JSON news API. There is no RSS or Atom parser, and the bot
     fetches no URL a user supplies.
   - **(b) Also a general feeds plugin in `bottools-plugins`.** Server administrators subscribe
     a channel to any RSS or Atom URL. This adds Rome behind a `FeedParser` port, fetching
     guarded against server-side request forgery, storage for feed subscriptions and admin
     commands. MagicBot installs it like every other plugin.
   - **Recommendation: (a).** The `1.0.0` plugins are reaction roles, math, weather and admin;
     today's `RssService` has no caller; and a public bot that fetches URLs supplied by its
     users takes on a new attack surface. A general feeds plugin can follow as a later feature
     release.
2. **Private replies to typed commands.** Discord hides a reply from everyone but the invoker
   only for interactions, so a typed command (`@MagicBot …`, `!…`) cannot reply privately.
   Commands whose reply is meant for the invoker alone, such as the delete-my-data confirmation
   and its report, need a rule for their typed form.
   - **(a)** Send the private part by DM, with a short public note that a DM was sent. If the
     user's DMs are closed, reply publicly with a message that holds nothing personal and points
     to the slash command.
   - **(b)** Reply publicly, and keep the reply free of personal detail.
   - **(c)** Make such commands slash-only; the typed form answers with a pointer to the slash
     command.
   - **Recommendation: (a).** One handler serves both forms, and a DM sent in answer to the
     user's own command is not unsolicited. The library models this as a reply visibility: an
     ephemeral reply to an interaction, a DM to a typed command.
3. **MagicBot's typed form in servers.** MagicBot holds `GUILD_MEMBERS` either way, because
   the join features need it. Each privileged intent is a Developer Portal toggle below 10,000
   users and needs a review, renewed every year, from 10,000; Discord's guide names welcome
   messages as a standard reason for `GUILD_MEMBERS`.
   - **(a) Mention only.** Typed commands are reached by @-mention in servers and by `!` in
     DMs, and the old Dota 2 names stay as aliases reached through a mention. MagicBot holds no
     `MESSAGE_CONTENT`.
   - **(b) A bare `!` in servers too.** MagicBot also holds `MESSAGE_CONTENT`, which needs its
     own review from 10,000 users; Discord may deny it when slash commands can do the job.
   - **Recommendation: (a).** It holds at any audience size with one routine review, and the
     bare-prefix mode stays a configuration switch the library offers.
4. **Backups and data deletion.** An erasure removes a user from the live database, but a
   backup taken earlier still holds them, and restoring it brings them back.
   - **(a)** Keep backups short-lived, and state the retention window in the privacy policy:
     deleted data leaves the backups within that window.
   - **(b)** Keep an erasure log in the database and replay it after any restore. This adds a
     table and a restore step to the storage design.
   - **(c)** Never restore user data from a backup; restore settings only.
   - **Recommendation: (a).** It needs no extra machinery. The library offers the backup call
     and a close that checkpoints, and the host, once chosen, sets the schedule.
5. **Later games.** Each later game ships what its source honestly supports, waits for a better
   source, or is dropped. Every such phase starts with a re-pass of its sources.
   - **Marvel Rivals** (a community API only): (a) an Experimental, on-demand provider with
     profile and rank, match history and match detail, and no automatic posts; or (b) defer
     until an official API exists.
   - **Path of Exile 2:** (a) an economy-only provider from poe.ninja; or (b) defer until GGG
     reopens application registration, which would allow profiles and ladders.
   - **No More Room in Hell:** (a) profile, playtime and achievements through a Steam key; or
     (b) drop the game.
   - **Recommendation: (a) for all three, in the existing order.**
6. **The planning pull request and the rewrite.** A pull request on KotlinBottools opened before
   its history is rewritten creates `refs/pull/N/*`. Those refs keep the old history fetchable
   after the force-push, and only GitHub Support can clear them.
   - **(a)** Open no pull request from this planning branch until KotlinBottools' history is
     rewritten. The rewrite opens Phase 0 and rewrites this branch too; the pull request is
     then opened from the rewritten branch.
   - **(b)** Merge the planning pull request now, and before the repository goes public ask
     GitHub Support to clear the ref. Support may decline, since no token is current.
   - **Recommendation: (a).** KotlinBottools' path to going public then depends on nobody
     outside the organisation.
7. **Legacy data.** Which copies does the importer read? All three are copied out before the
   rewrite either way (3.13).
   - **(a)** KotlinBottools' copy only: the newest, holding one of the two links.
   - **(b)** KotlinBottools' and GKB2's copies, merged. They share a layout, and for each
     server and member the newer value wins.
   - **(c)** All three, merged. This adds a reader for TrumpBot's older layout and its
     conflicting older link.
   - **Recommendation: (b).** It keeps both links with one reader. The older copies are deleted
     once the import report has been checked.
8. **`Support` after its purge.**
   - **(a)** Archive it with a README pointer, alongside TrumpBot, its only known consumer.
   - **(b)** Keep it active, and move its vendored libraries to a dependency manager.
   - **(c)** Delete it.
   - **Recommendation: (a).**

---

## Known gaps

### Unfinished — needs a planner re-pass

1. **Question 8, Dota 2 ([dota2-data-sources](dota2-data-sources.md)).**
   - **Unreachable hosts:** `api.opendota.com`, `docs.opendota.com`, `www.opendota.com`,
     `blog.opendota.com`, `api.steampowered.com`, `steamcommunity.com`,
     `partner.steamgames.com`, `developer.valvesoftware.com`, `cdn.cloudflare.steamstatic.com`,
     `steamdb.info`, `www.dota2.com`, `api.stratz.com`, `stratz.com`.
   - **Not established:** OpenDota's deployed limits, key price and terms of use (one call to
     `/api/metadata` and a read of its terms settle them); the Steam Web API terms and key
     registration; what Steam's news feed for app 570 carries, and which feed name or tag marks
     a patch; the terms for Valve's CDN images; how soon a finished match appears.
   - **Provisional until then:** the tracker's budget numbers and polling tiers; the
     patch-notes filter; the attribution text; the OpenDota and Steam clauses of MagicBot's
     privacy policy; Phase 4's Dota 2 provider, match tracker and patch-notes stages, and
     MagicBot's Dota 2 features (3.9).
2. **Question 9, later games and weather
   ([game-and-weather-data-sources](game-and-weather-data-sources.md)).**
   - **Unreachable hosts:** `marvelrivalsapi.com`, `docs.marvelrivalsapi.com`,
     `www.marvelrivals.com`, `developer.marvelrivals.com`, `tracker.gg`, `www.pathofexile.com`,
     `fr.pathofexile.com`, `s3.pathofexile.com`, `poe.ninja`, `poe2.ninja`, `www.poewiki.net`,
     `poedb.tw`, `store.steampowered.com`, `api.steampowered.com`, `partner.steamgames.com`,
     `steamcommunity.com`, `open-meteo.com`, `api.open-meteo.com`,
     `geocoding-api.open-meteo.com`, `api.met.no`, `api.weather.gov`, `nominatim.org`.
   - **Not established:** the Marvel Rivals community API's terms, limits and response shapes;
     GGG's developer reference, its registration status, and whether a bot's web callback is
     allowed; poe.ninja's API reference; which Steam stats No More Room in Hell defines;
     Open-Meteo's live behaviour (US ZIP codes, ordering of ambiguous names, 429 headers) and
     the licence wording for its geocoding data.
   - **Provisional until then:** the fallback postal-code geocoder, and the Marvel Rivals,
     Path of Exile 2 and No More Room in Hell providers and their phases (3.10). The weather
     plugin's shape stands.
3. **Discord's current Developer Terms and Developer Policy (Question 1,
   [discord-platform-rules](discord-platform-rules.md)).**
   - **Unreachable hosts:** `support-dev.discord.com`, `discord.com`, `docs.discord.com`.
   - **Not established:** the wording of the terms effective 2024-07-08 against the 2022-10-01
     snapshot; App Verification's criteria and when verification becomes required; the review
     policy for the message-content intent; a reported rule against training AI models on
     message content.
   - **Provisional until then:** the public-bot obligations (3.15), the contents of MagicBot's
     privacy policy and terms, and the stage that opens MagicBot to the public.

### Other gaps

- **Nothing was built or run.** The walking skeleton settles these first: the compile-level
  checks in 3.12; one `CoroutineEventManager` per shard feeding one router, including a
  restarted shard; the all-shards-ready rule; the stop sequence; automatic deferral on a
  controllable clock; composite substitution, nested `build-logic` naming and the
  configuration cache.
- **Central Portal snapshots.** Anonymous read, a retention of about 90 days, and whether a
  Portal token can be scoped are unverified. "Enable SNAPSHOTs" on the
  `io.github.spartanlaboratories` namespace is a maintainer action not yet taken.
- **SQLite's own documentation** (`sqlite.org`) could not be read; WAL, `busy_timeout`,
  `user_version` and `synchronous` rest on SQLite's source comments. The SQLite version bundled
  in sqlite-jdbc 3.53.4.0 is still to be confirmed.
- **Kord Extensions' source** (`codeberg.org`) could not be read; every comparison with it rests
  on its documentation repository.
- **User-installed commands.** Whether one receives `member` in a guild without the bot is not
  established; it matters only once user installation is added.
- **Hosting is not decided,** and with it: where MagicBot runs, encryption at rest, the backup
  schedule, a local disk for the database, and where the privacy policy and terms pages are
  served.
- **GitHub Support.** The outcome of a request to clear pull-request refs cannot be known in
  advance.
- **Kotlin 2.4 at language version 2.2.** Whether such a compiler reads metadata 2.4.0 is not
  established (3.12).
- **Level 5 (UAT)** is deferred to a separate, later plan.
