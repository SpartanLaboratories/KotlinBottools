=== YOUR QUESTION (Question 6 of the research plan) ===

Which persistence stack should bottools-data-sqlite use to implement the storage ports on SQLite?

Findings file (write exactly here): /home/user/KotlinBottools/docs/plans/1-bottools-consolidation/research/sqlite-persistence-stack.md

What your answer informs (use it to aim; keep it out of the file):
- the SQLite implementation's access layer;
- migrations;
- connection and concurrency model;
- coroutine integration;
- schema conventions;
- the shape constraints the ports in bottools-core must respect.

Options to compare:
1. Access layer:
   - JetBrains Exposed: its current release line, and whether 1.0 is final and what changed from 0.x; DSL versus DAO.
   - Plain JDBC with a thin Kotlin layer.
   - SQLDelight with its JVM SQLite driver.
   - jOOQ.
2. Migrations: Flyway (SQLite support and its licence/edition), Liquibase, Exposed's migration tooling (exposed-migration or MigrationUtils), or hand-written versioned scripts keyed by PRAGMA user_version.
3. Connections: a single connection versus a pool (for example HikariCP) with SQLite. Cover WAL mode, busy_timeout, synchronous settings, and SQLite's one-writer rule.
4. Coroutines: suspend transactions offered by the library (for example Exposed's suspended transactions or its R2DBC line) versus blocking calls on a dedicated single-writer dispatcher plus a read dispatcher.

Requirements specific to your question:
- The ports live in bottools-core with no database dependency. They are suspend functions returning Result.
- bottools-data-sqlite implements them, and an in-memory implementation exists for tests and development.
- Keys are 64-bit Discord snowflakes.
- What is stored:
  - game account links are global per Discord user: (user, game) -> account;
  - tracking subscriptions are per guild: (guild, user, game) -> channel;
  - typed guild settings (prefix, default role, welcome message, matches channel, patch-notes channel, plugin toggles);
  - job state (for example the last seen match id per tracked account);
  - private key-value storage for each plugin (reaction-role mappings; poker chip balances later).
- Everything stored about one Discord user can be erased on request, because a public bot carries a delete-my-data command.
- Schema changes across releases migrate existing database files.
- A one-off legacy importer writes into the same ports.
- Level-3 tests run against temporary SQLite files.
- JDK 21 and Kotlin 2.2.x. Every library must be on Maven Central, and current.

Today's storage, for grounding (cite by symbol):
- KotlinBottools: bottools.dataprocessing.KotGDP, BaseXMLReader, XMLReader, GuildDataParser. One shared reader switches files with setDocument() and rewrites the whole file on every write. Names, not snowflakes, are the keys.
- GKB2: dataprocessing.Database, a port-like interface returning Result.
Today's data files are in /home/user/KotlinBottools/guildData/ (structure only: never copy member names or ids into your file).

Sources:
- Maven Central metadata, POMs and release notes for each library (org.jetbrains.exposed, org.xerial:sqlite-jdbc, app.cash.sqldelight, org.flywaydb, org.liquibase, com.zaxxer:HikariCP).
- Their documentation and GitHub repositories on SQLite and coroutines.
- sqlite-jdbc's README on WAL and concurrency.
- SQLite's own documentation (sqlite.org) on WAL, busy_timeout and user_version.

Lenses:
- Best systems: how small-to-medium bots and desktop apps use SQLite safely under concurrency.
- Conventions: what Kotlin JVM projects commonly pick, and why.
- Idiomatic Kotlin: suspend APIs over blocking JDBC, Result at the port boundary, value classes for keys.
