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

- One stack serves every stats provider, the weather plugin and the feeds plugin.
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

*Pending.*

---

## Part 3 — Summary

*Pending.*

---

## Known gaps

*Pending research.*
