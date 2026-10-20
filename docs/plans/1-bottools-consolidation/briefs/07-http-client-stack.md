=== YOUR QUESTION (Question 7 of the research plan) ===

Which HTTP, JSON, caching and call-budget stack should the stats providers and plugins share?

Findings file (write exactly here): %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/research/http-client-stack.md

What your answer informs (use it to aim; keep it out of the file):
- the shared client stack in bottools-stats, which the weather and feeds plugins in bottools-plugins also use;
- its module dependencies;
- how every outbound call is cached and budgeted;
- how it is tested against recorded responses.

Options to compare:
1. HTTP client:
   - Ktor client 3.x, with each engine's trade-offs: CIO, OkHttp, Java;
   - OkHttp used directly, if it is already on the classpath through JDA (establish from JDA's POM which OkHttp version JDA brings);
   - the JDK's java.net.http.HttpClient.
2. JSON:
   - kotlinx-serialization (with its Gradle plugin, and the Kotlin 2.2.x compatibility of the plugin and runtime);
   - Jackson with the Kotlin module, if JDA already brings Jackson (establish from JDA's POM).
3. Response caching: Caffeine versus a small in-house TTL cache. Cover per-endpoint TTLs and memory bounds.
4. Call budgets:
   - a token-bucket library (for example Bucket4j) versus an in-house budget;
   - per-provider budgets covering both per-minute and per-day limits;
   - adapting to 429 responses and Retry-After headers.
5. RSS/Atom parsing for the feeds plugin: Rome (com.rometools:rome; current version, maintenance, Kotlin use) versus alternatives.
6. Testing: Ktor MockEngine versus OkHttp MockWebServer versus WireMock, for Level-2/3 tests against recorded JSON fixtures; live calls stay opt-in.

Requirements specific to your question:
- One stack serves every stats provider (OpenDota first, then Marvel Rivals, Path of Exile 2, No More Room in Hell), the weather plugin and the feeds plugin.
- Every provider call passes through a cache and a per-provider budget.
- JSON maps to Kotlin types.
- The library's runtime classpath stays lean and free of version conflicts with JDA's own transitive dependencies.
- Versions are current on Maven Central and work with Kotlin 2.2.x and JDK 21. If the latest release of a library needs a newer Kotlin than 2.2.x, give the newest release that does not.
- slf4j logging only in library code.
- Today's code uses unirest, jsoup, skrapeit and Rome for scraping. All but a feed parser go away.

Sources:
- Maven Central metadata and POMs: io.ktor (ktor-client-core, engines, content-negotiation), org.jetbrains.kotlinx:kotlinx-serialization-json, com.squareup.okhttp3, com.fasterxml.jackson, com.github.ben-manes.caffeine, com.bucket4j, com.rometools:rome, and net.dv8tion:JDA's POM for its dependency tree.
- Each project's documentation, changelog and Kotlin compatibility statements (GitHub releases).

Lenses:
- Best systems: what JVM and Kotlin API clients of this size use.
- Conventions: the expectations of Kotlin library consumers about transitive dependencies.
- Idiomatic Kotlin: suspend clients, serialization models, Result at the provider boundary.
