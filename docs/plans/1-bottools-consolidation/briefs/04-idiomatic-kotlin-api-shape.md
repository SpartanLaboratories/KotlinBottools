=== YOUR QUESTION (Question 4 of the research plan) ===

What shape should the library's public Kotlin API take? That covers the command DSL, handler signatures, option access, identifiers, failures, stability tiers and coroutine ownership. The shape must be idiomatic, evolvable without breaking consumers, and safe for concurrent use.

Findings file (write exactly here): %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/research/idiomatic-kotlin-api-shape.md

What your answer informs (use it to aim; keep it out of the file): the Kotlin idioms of the public API across bottools-core, bottools-data-sqlite, bottools-stats and bottools-plugins.

Options to compare:
1. Command definitions: a builder DSL with @DslMarker, versus class-per-command inheritance (today's style), versus annotations.
2. Handler signature:
   - a suspend lambda with the invocation context as receiver;
   - versus the context as a parameter;
   - versus Kotlin context parameters. Establish their exact status in Kotlin 2.2.x (stable or preview, compiler flag) from Kotlin's own documentation and release notes.
3. Option access: declared typed options with typed accessors (property delegates such as `val id by string("id")`, reified generics), versus lookup by name returning Result.
4. Identifiers: @JvmInline value classes for snowflakes (GuildId, UserId, ChannelId), versus raw Long, versus JDA's own entity types. Cover boxing in generic positions and collections, equality and hashing, and interop with JDA.
5. JDA types in the public API (Member, Guild, MessageChannel), versus library-owned types or interfaces. Cover how each couples the library's semantic versioning to JDA's majors, and what testing each allows.
6. Failures:
   - Result<T> with typed, stackless exception subclasses for expected failures, versus sealed outcome types;
   - how each composes with coroutines and cancellation (Result and CancellationException pitfalls);
   - the rule here: expected failures and lookups that can miss return Result, never a nullable T?.
7. Stability tiers:
   - how to express @SupportedExtension (a documentation and purpose marker carrying the same semver guarantee as stable) and an Experimental marker with @RequiresOptIn;
   - explicit API mode;
   - binary-compatibility checking: the Kotlin Gradle plugin's built-in ABI validation in 2.2.x versus the kotlinx binary-compatibility-validator plugin. Cover the status of each.
8. Systems as interfaces with supplied default implementations, versus open classes. Where sealed/final is right (closed protocol sets, exhaustive results) versus where an open hierarchy is needed.
9. Coroutine ownership:
   - who owns the bot's CoroutineScope;
   - SupervisorJob and exception handlers;
   - cancellation on shutdown;
   - dispatcher choice for handlers versus blocking I/O (SQLite, HTTP);
   - structured concurrency for scheduled jobs;
   - never blocking JDA's gateway threads.

Requirements specific to your question:
- Kotlin 2.2.x. Only stable language features appear in the public API; anything in preview stays out or sits behind the Experimental marker.
- Consumers are Kotlin on the JVM only; no Java-facing variants are needed.
- The design is open-ended (see "Library Design — Open-Ended by Default" in %USERPROFILE%/.claude/CLAUDE.md):
  - interface plus default implementation for systems, inheritance for domain types;
  - policy parameterised, hooks exposed, additions opt-in;
  - three stability tiers.
- KDoc on every public declaration.
- Command definitions are immutable, and every invocation gets its own context.
- jda-ktx stays internal to bottools-core (never on a consumer's compile classpath). Whether JDA itself is part of the public API is something your answer informs.

Today's code, for grounding:
- KotlinBottools' operator-heavy DSL: `Bot say x in channel`, `D / guild / member / "Games" - "id"`, `this + Option(...)`, `get and "city" becomes "getcity"`.
- GKB2's Database interface (dataprocessing/Database.kt), which returns Result.
Say what of that style is worth keeping in a rebuilt API and what is cargo-culted.

Sources:
- kotlinlang.org documentation: type-safe builders/@DslMarker, value classes, context parameters, opt-in requirements, explicit API mode, binary compatibility validation in the Kotlin Gradle plugin, and the "Library authors' guidelines" (API guidelines: backward compatibility, minimising mental complexity, predictability).
- KEEPs on GitHub (Kotlin/KEEP).
- Kotlin release notes for 2.2.x.
- Public APIs of comparable Kotlin libraries at pinned versions: Ktor (routing DSL, plugin API), kotlinx.coroutines (structured-concurrency guidance), Kord Extensions, BotCommands. Read their source on GitHub.

Lenses: this is the dedicated idiomatic-Kotlin question; go deep on lens 3. Also cover lens 1 (what the best Kotlin libraries expose) and lens 2 (what Kotlin consumers expect).
