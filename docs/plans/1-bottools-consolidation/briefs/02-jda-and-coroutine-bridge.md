=== YOUR QUESTION (Question 2 of the research plan) ===

Which JDA release line should bottools-core build on, and does jda-ktx meet the library's needs as its internal coroutine bridge?

Findings file (write exactly here): %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/research/jda-and-coroutine-bridge.md

What your answer informs (use it to aim; keep it out of the file):
- the JDA version pin and how JDA is exposed (api versus implementation);
- whether jda-ktx can serve as the required internal bridge, at which version;
- what that means for consumers' classpaths, Kotlin 2.2.x and JDK 21.

Options to compare:
- JDA: the latest 5.x release versus JDA 6.x (if released). Cover what changed, the migration cost from 5.6.1 (today's KotlinBottools) and 5.0.0-beta.2 (today's GKB2), and the support status of each line.
- Bridge: jda-ktx at its latest release. If jda-ktx fails a requirement below, describe the gap and the smallest thing the library would need in its place (for example await for RestAction and a coroutine event manager). Report it; do not design a replacement in detail.

Requirements specific to your question:
- jda-ktx is an implementation dependency of bottools-core. It is not on a consumer's compile classpath, but it IS on every consumer's runtime classpath, so it must resolve from Maven Central with no extra repository.
  - Confirm its real coordinates and where it is published: Maven Central or JitPack. Look at maven-metadata.xml on repo1.maven.org.
- Both must work for consumers compiling with Kotlin 2.2.x on JDK 21. Establish:
  - the Kotlin version jda-ktx is compiled with (read its build file at the release tag);
  - if possible, the @Metadata metadata version in its published jar classes;
  - the kotlin-stdlib and kotlinx-coroutines versions its POM requires.
  A consumer on Kotlin 2.2.x can read class metadata up to 2.3.x only. The GeneralTools research at %PROJECTS%/GeneralTools/docs/plans/7-kotlin-multiplatform/research/kmp-build-and-kotlin-compat.md explains the rule; reuse it.
- JDA must support:
  - slash commands with subcommand groups;
  - user and message context menus;
  - components (buttons, select menus, modals);
  - autocomplete;
  - sharding (ShardManager).
- JDA's transitive dependencies (for example OkHttp, Jackson, nv-websocket-client, slf4j) and their versions matter for conflicts with an HTTP/JSON stack chosen elsewhere. List them from the POM.
- Cover the licences of JDA and jda-ktx, and their maintenance activity (release cadence, last release date).

Sources:
- Maven Central (https://repo1.maven.org/maven2/net/dv8tion/JDA/ and the jda-ktx path you find), for metadata and POMs.
- GitHub: discord-jda/JDA and MinnDevelopment/jda-ktx at pinned tags, for READMEs, build files, changelogs, release notes and migration guides.
- JDA's wiki or docs site, if reachable.

Lenses:
- Best systems: how other Kotlin JDA frameworks (for example BotCommands) depend on JDA and on a coroutine bridge.
- Conventions: api versus implementation exposure of a platform library.
- Idiomatic Kotlin: what jda-ktx's API looks like (await, coroutine event manager, listener builders), and which parts a library would use internally.

If jda-ktx is not on Maven Central, or cannot be consumed by Kotlin 2.2.x consumers, say so in the FIRST bullet of your Bottom line. That would reopen a settled requirement.
