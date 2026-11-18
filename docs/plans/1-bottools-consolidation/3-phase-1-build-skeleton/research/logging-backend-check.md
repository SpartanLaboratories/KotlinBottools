# Logging dependency and the no-backend check

## 1. Question

Which logging dependencies does the library declare under the organisation's logging policy (all Kotlin code logs through
kotlin-logging 8.0.7, an internal dependency; a library publishes no logging backend; logback is the backend for tests), and how does
a build check tell that a published module's resolved runtime classpath carries a logging backend?

An answer must meet these requirements: the check runs per published module over its resolved runtime classpath, joins `check`, is
configuration-cache safe, passes for kotlin-logging plus slf4j-api alone and fails for each common backend; kotlin-logging is readable by a
Kotlin 2.2.x compiler (consumers stay on Kotlin 2.2.x) and runs on Java 21; the answer states what kotlin-logging does on the JVM with no
slf4j provider and what a test classpath with logback looks like. Facts are as of 2026-11-18.

## 2. Bottom line

- **kotlin-logging 8.0.7 does not bring slf4j-api.** Its JVM artifact `io.github.oshai:kotlin-logging-jvm:8.0.7` declares one dependency,
  `kotlin-stdlib` 2.1.21, in both its POM and its Gradle Module Metadata; slf4j-api is `compileOnly` in its build. Its Kotlin metadata is
  `mv=[2,0,0]` (a 2.2.x compiler reads it), its class files are Java 8 (major 52), so Java 21 runs it. A module that logs therefore declares
  both `io.github.oshai:kotlin-logging-jvm:8.0.7` and `org.slf4j:slf4j-api` itself, each as `implementation`, never `api`, and neither with
  `strictly`. The slf4j-api version to declare is 2.0.19, the version JDA 6.7.0 and logback-classic 1.6.7 already ask for, so the declaration
  moves no consumer's resolution. Any slf4j-api 2.0.x satisfies kotlin-logging's source (it uses only `org.slf4j` types present since 2.0.0).
- **With no slf4j provider, kotlin-logging 8.0.7 on the JVM still runs, silently.** It selects slf4j by default
  (`-Dkotlin-logging-to-jul`, `-Dkotlin-logging-to-logback=true` and `-Dkotlin-logging-to-direct=true` select JUL, logback or its own
  console appender instead); slf4j-api prints one `SLF4J: No SLF4J providers were found.` warning to stderr and discards every event. Without
  slf4j-api on the classpath, the first `KotlinLogging.logger` call fails with `NoClassDefFoundError` (derived from the source and the POM,
  not run). Separately, the first use of `KotlinLogging` prints `kotlin-logging: initializing... active logger factory: Slf4jLoggerFactory` to
  stdout unless `-Dkotlin-logging.logStartupMessage=false` or `KOTLIN_LOGGING_STARTUP_MESSAGE=false` is set; a library must not set that
  global itself.
- **The check detects by the provider mechanism and by a coordinate list, both.** The mechanism is exact for slf4j: a jar or directory on the
  classpath that holds `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` (slf4j 2.x) or `org/slf4j/impl/StaticLoggerBinder.class`
  (slf4j 1.x) is a provider or binding. It was verified on 21 real jars (section 3, F4): every provider, and no bridge, kotlin-logging or
  slf4j-api, carries one of the two entries. It also catches shaded and unknown providers. The coordinate list is needed for what the
  mechanism cannot see: `log4j-core` (a backend with no slf4j provider), `logback-core`, `reload4j`/`log4j:log4j` and `tinylog-impl`.
  `log4j-core` alone does not make slf4j log anywhere (slf4j falls back to NOP), but it is a logging backend in the sense of the policy, so the
  list bars it.
- **Implementation shape.** A task class `VerifyNoLoggingBackend` in the convention plugin that publishes a module, mirroring the
  organisation's `VerifyJavaFloor` (WebTools): `@Classpath ConfigurableFileCollection` over the module's `runtimeClasspath` artifact files and
  its own jar, plus an `@Input ListProperty<String>` of resolved `group:module:version` strings built from
  `configurations.runtimeClasspath.incoming.artifacts.resolvedArtifacts.map { ... }`; no `Project` or `Configuration` at execution time. It
  is registered per published module, wired into `check`, and written with component tests over generated jars (one pass, one fail per
  barred entry). It must pass on an empty classpath (the modules with no logging yet), unlike a floor check that fails on "nothing to check".
- **Test classpaths carry logback; main classpaths never do.** Declare `testRuntimeOnly("ch.qos.logback:logback-classic:1.6.7")` once in the
  library convention plugin (logback-classic brings `logback-core` and slf4j-api 2.0.19; its jar holds
  `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` naming `ch.qos.logback.classic.spi.LogbackServiceProvider`). The old single-module
  build's `implementation("ch.qos.logback:logback-classic:1.5.6")` (`build.gradle.kts`) and its packaged `src/main/resources/logback.xml` are
  exactly what the check exists to refuse; the new build drops both from a published module.

## 3. Findings

**F1. kotlin-logging 8.0.7: coordinates, dependencies, metadata, target.** *Evidence: primary artifacts and source, read directly. Applies
to 8.0.7 (tag `8.0.7`, commit `4996228c21f5b53d002440aa5d95234815198b91`, GitHub release 2026-11-10).*
- The multiplatform root is `io.github.oshai:kotlin-logging:8.0.7`; its Gradle Module Metadata redirects the JVM variants with
  `available-at` to `io.github.oshai:kotlin-logging-jvm:8.0.7`. The README's Maven and Gradle snippets use `kotlin-logging-jvm`. For a
  JVM-only Kotlin consumer, declare the `-jvm` artifact: a Maven-POM consumer sees real content there, while the root POM is an empty
  shell.
- The `-jvm` POM lists one dependency, `org.jetbrains.kotlin:kotlin-stdlib:2.1.21` (`compile`). The `.module` file has
  `jvmApiElements-published` and `jvmRuntimeElements-published`, each with one dependency, `kotlin-stdlib` `requires 2.1.21`, and no slf4j-api.
  The README's sentence "kotlin-logging depends on slf4j-api (in the JVM artifact)" is out of date; its ChangeLog says for version 5 "Slf4j
  dependency is not provided anymore (users have to provide it)".
- In the tag's `build.gradle.kts`, `javaMain` (shared by JVM and Android) has `compileOnly(libs.slf4j.api)` and
  `compileOnly(libs.kotlinx.coroutines.slf4j)`; `jvmMain` adds `compileOnly(libs.logback.classic)`. It builds with Kotlin 2.1.21
  (`gradle/libs.versions.toml`), `languageVersion` and `apiVersion` 2.0, `jvmTarget` 1.8, and slf4j 2.0.20 / logback 1.6.6 as the
  compile-time versions.
- Class files in `kotlin-logging-jvm-8.0.7.jar`: `kotlin.Metadata` `mv=[2,0,0]` (read from `KotlinLogging.class` with `javap -v`); class-file
  major 52 (Java 8). The jar also holds a `module-info.class` (major 61) and `Automatic-Module-Name: io.github.oshai.kotlinlogging`.
  Its variants publish no `org.gradle.jvm.version`, so Gradle's attribute matching does not constrain the Java level.
- Selection of the backend (`KotlinLoggingConfiguration.detectLogger`, `jvmMain`): `-Dkotlin-logging-to-jul` (any value) selects
  `JulLoggerFactory`; `-Dkotlin-logging-to-logback=true` selects `LogbackLoggerFactory` (needs logback on the classpath; throws "Logger
  factory is not a Logback LoggerContext" otherwise); `-Dkotlin-logging-to-direct=true` selects `DirectLoggerFactory` (its own console
  appender); otherwise `Slf4jLoggerFactory`. `KotlinLoggingConfiguration.loggerFactory` is a `@Volatile var`, so code can swap it.
- `Slf4jLoggerFactory.logger(name)` wraps `LoggerFactory.getLogger(name)`; it imports `org.slf4j.Logger`, `LoggerFactory`, `MDC`, `Marker`,
  `MarkerFactory`, `event.EventConstants`, `event.KeyValuePair`, `helpers.MessageFormatter`, `spi.CallerBoundaryAware` and
  `spi.LocationAwareLogger`. `CallerBoundaryAware` is present in `slf4j-api` 2.0.0, 2.0.9, 2.0.13, 2.0.17 and 2.0.19 (checked in each jar),
  so slf4j-api 2.0.13 or later satisfies the code; slf4j-api 1.7 does not (no fluent API).
- `KotlinLogging`'s `init` block runs `println("kotlin-logging: initializing... active logger factory: ${factory::class.simpleName}")` when
  `logStartupMessage` is true; on the JVM it defaults from `-Dkotlin-logging.logStartupMessage` or `KOTLIN_LOGGING_STARTUP_MESSAGE`, else true.
- The `module-info.class` has `requires org.slf4j`, `requires kotlinx.coroutines.core`, `requires kotlin.stdlib` and `requires java.logging`
  (non-static) and static requires for logback and others. Only a consumer on the module path sees this; `kotlinx-coroutines-core` is not in
  the POM, so a module-path consumer without it fails to resolve. The classpath is unaffected.

**F2. How slf4j finds a provider.** *Evidence tier: established consensus (the project's manual and `LoggerFactory` source). slf4j 2.0.x.*
- slf4j-api 2.0.x finds a provider with `ServiceLoader.load(SLF4JServiceProvider.class, ...)` over `META-INF/services/org.slf4j.spi.SLF4JServiceProvider`;
  since 2.0.9 the `slf4j.provider` system property names a provider class explicitly and bypasses the loader. It uses the first provider found
  and, if several exist, prints `Class path contains multiple SLF4J providers.` with `Found provider [...]` per candidate.
- With none found it prints `SLF4J: No SLF4J providers were found.`, `SLF4J: Defaulting to no-operation (NOP) logger implementation` and a
  pointer to `codes.html#noProviders`, then discards events. It then scans the classpath for `org/slf4j/impl/StaticLoggerBinder.class` and, when
  it finds one, prints `Class path contains SLF4J bindings targeting slf4j-api versions 1.7.x or earlier.` and ignores it: a 1.x binding on a
  2.x API is not a working backend, but it is still a backend that the library must not publish.
- slf4j 1.x (1.6 and later) detected a binding by loading `org.slf4j.impl.StaticLoggerBinder`, and fell back to NOP when it was missing.
- The manual's rule: "Embedded components such as libraries or frameworks should not declare a dependency on any SLF4J binding/provider but
  only depend on slf4j-api." A provider version should match the API's (the manual's example pairs slf4j-api 2.0.20 with slf4j-simple 2.0.20).

**F3. Latest versions on Maven Central.** *Evidence: `maven-metadata.xml` read on 2026-11-18.* slf4j-api latest stable is 2.0.20 (an
`2.1.0-alpha1` exists); logback-classic latest is 1.6.7 (2026-11-14; Java 11 class files, its parent POM manages slf4j-api 2.0.19); the 1.5 line
ends at 1.5.38 (2026-07-09, slf4j-api 2.0.17); log4j-slf4j2-impl and log4j-core latest 2.x is 2.26.1.

**F4. Which artifacts are providers (read from the jars).** *Evidence: each jar downloaded from Maven Central and listed with `unzip -l`
on 2026-11-18; versions in the table.*

| Artifact | Version read | `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` | `org/slf4j/impl/StaticLoggerBinder.class` | Role |
|---|---|---|---|---|
| `ch.qos.logback:logback-classic` | 1.6.7, 1.5.6 | yes (`ch.qos.logback.classic.spi.LogbackServiceProvider`) | no | provider |
| `ch.qos.logback:logback-classic` | 1.2.13 | no | yes | 1.x binding |
| `org.slf4j:slf4j-simple` | 2.0.20 / 1.7.36 | yes / no | no / yes | provider / binding |
| `org.slf4j:slf4j-jdk14` | 2.0.20 / 1.7.36 | yes / no | no / yes | provider / binding |
| `org.slf4j:slf4j-reload4j` | 2.0.20 | yes | no | provider |
| `org.slf4j:slf4j-nop` | 2.0.20 | yes (`org.slf4j.nop.NOPServiceProvider`) | no | provider that discards |
| `org.slf4j:slf4j-jcl` | 1.7.36 | no | yes | 1.x binding |
| `org.apache.logging.log4j:log4j-slf4j2-impl` | 2.26.1 | yes (`org.apache.logging.slf4j.SLF4JServiceProvider`) | no | provider |
| `org.apache.logging.log4j:log4j-slf4j-impl` | 2.26.1, 2.17.2 | no | yes | 1.x binding |
| `org.tinylog:slf4j-tinylog` | 2.8.1 | yes | yes | provider and binding |
| `org.jboss.slf4j:slf4j-jboss-logmanager` | 2.1.0.Final | yes | yes | provider and binding |
| `org.slf4j:slf4j-api` | 2.0.20, 2.0.19, 1.7.36 | no | no | API |
| `org.slf4j:jul-to-slf4j`, `jcl-over-slf4j`, `log4j-over-slf4j` | 2.0.20 | no | no | bridges (`jcl-over-slf4j` has a commons-logging `LogFactory` services file, not slf4j's) |
| `org.apache.logging.log4j:log4j-to-slf4j` | 2.26.1 | no | no | bridge (it has log4j's own `spi.Provider` services file) |
| `org.apache.logging.log4j:log4j-core`, `log4j-api` | 2.26.1 | no | no | log4j backend and API; not slf4j providers |
| `ch.qos.logback:logback-core` | 1.6.7 | no | no | logback's engine, no provider |
| `io.github.oshai:kotlin-logging-jvm` | 8.0.7 | no | no | facade |

Two consequences. First, the entry `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` is specific: no bridge, API or facade carries it,
so the mechanism has no false positive on the artifacts a library may legitimately use. Do not generalise to "any `META-INF/services` entry
about logging": `log4j-to-slf4j` (a bridge) and `log4j-core` both carry log4j's `org.apache.logging.log4j.spi.Provider`. Second, `log4j-core`
alone has no slf4j entry, so only a coordinate list catches it.

**F5. Prior art for the check.** *Evidence tier: one source each; no source found for a published slf4j 2 provider-mechanism check.*
- A Gradle task `checkSlf4j` (robots.org.uk, slf4j 1.x era): over `configurations.runtime`, it opens each jar with `zipTree` and matches
  `org/slf4j/impl/StaticLoggerBinder.class`; it fails when more than one binding is found; `check.dependsOn checkSlf4j`. It is the same
  mechanism as the 1.x half of this check, not updated for `SLF4JServiceProvider`, and it fails on *multiple* bindings, not on *any*.
- `dev.jacomet.logging-capabilities` (0.10.0; source repository `ljacomet/logging-capabilities` archived, last push 2024-04-28) assigns the
  capability `dev.jacomet.logging:slf4j-impl` to slf4j-simple, slf4j-log4j12, slf4j-jcl, slf4j-jdk14, logback-classic and log4j-slf4j-impl so
  that Gradle fails a graph holding two. It detects *two*, not *one*: a single backend is not a capability conflict, so it cannot enforce
  "none", and its list does not name the slf4j 2 provider `log4j-slf4j2-impl`. It is a coordinate list by another mechanism.
- Within the organisation, WebTools' `build-logic` (`webtools.kotlin-jvm-library`) declares `testImplementation("ch.qos.logback:logback-classic:1.5.6")`
  in its convention plugin with the comment that logback "must never leak onto a module's runtime classpath", and its `VerifyJavaFloor` task
  takes the module's `runtimeClasspath` as a `ConfigurableFileCollection` annotated `@Classpath`, plus the module's jar, and writes a one-line
  report as `@OutputFile`. That is the shape this check takes.

**F6. Configuration-cache-safe resolution of the classpath.** *Evidence tier: established (Gradle documentation, 9.9.1 user guide;
the build's Gradle 9.7.1 documents the same rules).*
- Gradle: "Use ArtifactCollection.getResolvedArtifacts(), which returns a Provider<Set<ResolvedArtifactResult>>, for artifact metadata and
  files." The provider "is Configuration Cache-compatible, and the ResolvedArtifactResult type is itself serializable".
  `Configuration` is not to be a task input ("they contain unnecessary state"); a task declares a `FileCollection` instead. Tasks must not
  use `Project` at execution time.
- `ArtifactCollection.getArtifactFiles()` is "primarily useful to wire this artifact collection as a task input", and the collection resolves "on
  demand when the collection is queried", so `configurations.getByName("runtimeClasspath").incoming.artifacts` can be wired lazily at configuration
  time without resolving it then.
- `ResolvedArtifactResult.id.componentIdentifier` is a `ModuleComponentIdentifier` (group, module, version) for a repository module, and a
  `ProjectComponentIdentifier` for a sibling project; the coordinate list applies to the first kind.

## 4. How comparable projects do it

- **kotlin-logging itself** (`oshai/kotlin-logging` 8.0.7): `compileOnly` on slf4j-api and logback in the shipped library; the backends
  (`logback-classic`, `log4j-slf4j2-impl`, `log4j-core`) appear only in its test source sets (`jvmLogbackTest`, `jvmTest`), where it runs
  one test set per backend. A library that wraps slf4j ships no provider.
- **WebTools** (organisation): `api(slf4j-api)` per module; the logback test dependency lives in the library convention plugin; the
  runtime-classpath scan is a `@Classpath` file collection input to a task registered by a `WebToolsBuild.registerVerifyJavaFloor(project,
  jars, runtimeClasspath)` function and wired with `tasks.named("check") { dependsOn(...) }`. Its tests are component tests over generated
  jars (`JarClasses`, `ResolutionReport` support classes).
- **slf4j's own guidance** (manual, "Basic rule"): a library depends on slf4j-api only; a provider is a deployment decision and, where a
  library needs one for its own tests, it is declared in test scope.

## 5. Pitfalls and regrets

- **kotlin-logging does not declare slf4j-api.** A module that logs through kotlin-logging with no slf4j-api of its own gets it only if
  another dependency happens to bring it (JDA does, `bottools-core` only). A module without JDA (for example one that holds only the SQLite
  persistence) fails at runtime with `NoClassDefFoundError` unless it declares slf4j-api. Declare it in each logging module, not by
  accident of a transitive edge.
- **A library packaging `logback.xml` configures its consumers.** The old build jar carried `src/main/resources/logback.xml`; a consumer on
  logback would load it first or collide with its own file. Published jars carry no backend configuration file. (Suggested extension to the
  check, see section 6; a third-party jar's own `logback.xml` is outside the module's control.)
- **Two providers.** With more than one provider on a classpath, slf4j uses the first found and warns; a test classpath that holds logback
  plus a framework's `slf4j-simple` shows `Class path contains multiple SLF4J providers.` Keep exactly one provider on every test classpath:
  logback via the convention plugin, and exclude any other a test dependency brings.
- **No provider in a consumer.** One stderr warning, then total silence, including the library's own and JDA's events. This is the cost of
  the policy and cannot be fixed by the library; the module's README states that a consumer chooses a backend.
- **Startup `println` from a library.** The first `KotlinLogging` use writes a line to stdout. An earlier piece of WebTools' own research
  rejected kotlin-logging for common code for this reason. A library setting `logStartupMessage = false` mutates global state shared with the
  consumer and depends on init order; leave the switch to the consumer.
- **`strictly` on slf4j-api or kotlin-logging in a library** would make consumers' conflicting graphs fail; both are plain `implementation`
  requirements. Gradle resolves to the highest version in the graph.
- **A coordinate-only check goes stale** (a new provider, a relocated or shaded jar passes); a mechanism-only check misses `log4j-core`.
- **`testImplementation` vs `testRuntimeOnly` for logback**: `testImplementation` puts logback's API on the test compile classpath for
  programmatic configuration; neither reaches the main runtime classpath. `testRuntimeOnly` is enough.
- **Empty modules.** The check must pass on a module with no dependency but kotlin-stdlib. A copy of `VerifyJavaFloor`'s "nothing to check"
  failure would fail the four modules that hold no source yet.

## 6. Recommendation for this repository

Declare, in the version catalog and in each module that logs (first `bottools-core`):

```kotlin
implementation("io.github.oshai:kotlin-logging-jvm:8.0.7")   // the organisation's single kotlin-logging version
implementation("org.slf4j:slf4j-api:2.0.19")                  // kotlin-logging does not bring it; JDA 6.7.0 asks for 2.0.19 too
```

and, once, in the `bottools.kotlin-library` convention plugin: `testRuntimeOnly("ch.qos.logback:logback-classic:1.6.7")` (the 1.6 line is what kotlin-logging
8.0.7 tests against, 1.6.6; its slf4j-api 2.0.19 equals the declared one; 1.5.38 is the alternative on the 1.5 line). Neither logging dependency is `api`:
no kotlin-logging or slf4j type appears in the library's public API. Remove `logback-classic` and `logback.xml` from every published module.

Add a `VerifyNoLoggingBackend` task to the `bottools.published-library` convention plugin, registered in every published module (the
umbrella included) and wired into `check`:

- **Rule.** Fail when any entry on the module's resolved runtime classpath, or its own jar, (a) holds
  `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` or `org/slf4j/impl/StaticLoggerBinder.class` (jar or directory; the same two paths under
  `META-INF/versions/<n>/` are cheap to include), or (b) resolves to a barred module: `ch.qos.logback:logback-classic`,
  `ch.qos.logback:logback-core`, `org.slf4j:slf4j-simple`, `slf4j-jdk14`, `slf4j-reload4j`, `slf4j-log4j12`, `slf4j-nop`, `slf4j-jcl`,
  `org.apache.logging.log4j:log4j-slf4j-impl`, `log4j-slf4j2-impl`, `log4j-core`, `ch.qos.reload4j:reload4j`, `log4j:log4j`,
  `org.tinylog:slf4j-tinylog`, `org.tinylog:tinylog-impl`, `org.jboss.slf4j:slf4j-jboss-logmanager`. Never bar `slf4j-api`, `jul-to-slf4j`,
  `jcl-over-slf4j`, `log4j-over-slf4j`, `log4j-to-slf4j`, `log4j-api` or kotlin-logging. The list is a `SetProperty<String>` input with this
  default, so a later backend is a one-line addition.
- **Failure message.** Name the module, the offending jar and its `group:module:version`, which rule matched, and the one-line fix ("move it to
  `testRuntimeOnly`").
- **Optional, my suggestion:** also fail when the module's own jar contains `logback.xml`, `logback-test.xml`, `log4j2.xml`,
  `log4j2-test.xml`, `log4j.properties` or `simplelogger.properties` at its root, the cost of the old build's packaged `logback.xml`.
- **Inputs, configuration-cache safe.** `@get:Classpath ConfigurableFileCollection` for the files (the runtime classpath's `artifactFiles` plus the
  module's `jar` archive file); `@get:Input ListProperty<String>` of `group:module:version` for module components, derived with
  `resolvedArtifacts.map { ... }` from `configurations.getByName("runtimeClasspath").incoming.artifacts`; an `@get:OutputFile` report so an
  unchanged module is not scanned again. No `Project`, no `Configuration` at execution time. Sketch (not compiled here):

```kotlin
val artifacts = configurations.getByName("runtimeClasspath").incoming.artifacts
tasks.register<VerifyNoLoggingBackend>("verifyNoLoggingBackend") {
    runtimeClasspath.from(artifacts.artifactFiles, tasks.named<Jar>("jar").flatMap { it.archiveFile })
    resolvedModules.set(artifacts.resolvedArtifacts.map { set ->
        set.mapNotNull { r -> (r.id.componentIdentifier as? ModuleComponentIdentifier)?.let { "${it.group}:${it.module}:${it.version}" } }.sorted()
    })
}
tasks.named("check") { dependsOn("verifyNoLoggingBackend") }
```

- **Tests of the check** (component tests with generated jars, as WebTools tests `VerifyJavaFloor`): a pass for kotlin-logging plus slf4j-api plus
  the bridges; a fail for each of the providers and bindings in section 3 F4 (one fixture each: a jar with the services file; a jar with
  `StaticLoggerBinder.class`; a resolved coordinate of each barred module); a pass on an empty classpath. One end-to-end build with the check
  applied to a module whose `runtimeOnly` carries logback must fail, and the same logback as `testRuntimeOnly` must pass.

I would reject a Gradle-capabilities rule (the `logging-capabilities` approach): it fails on two backends and says nothing about one, and
the requirement is "none". I would reject a coordinate-only check: the provider mechanism is what slf4j itself loads, and it is exact on the
artifacts above.

## 7. Load-bearing claims

1. kotlin-logging-jvm 8.0.7 declares only kotlin-stdlib 2.1.21; no slf4j-api. POM: `<artifactId>kotlin-stdlib</artifactId> <version>2.1.21</version> <scope>compile</scope>`
   (the only `<dependency>`). Module metadata: `"dependencies": [ { "group": "org.jetbrains.kotlin", "module": "kotlin-stdlib", "version": { "requires": "2.1.21" } } ]`
   on `jvmApiElements-published` and `jvmRuntimeElements-published`.
   https://repo1.maven.org/maven2/io/github/oshai/kotlin-logging-jvm/8.0.7/kotlin-logging-jvm-8.0.7.pom and `.module`; 8.0.7, 2026-11-10.
2. slf4j-api is `compileOnly` in kotlin-logging's JVM build. Quote (`build.gradle.kts` at tag 8.0.7): `val javaMain by creating { dependsOn(commonMain) dependencies { compileOnly(libs.slf4j.api) compileOnly(libs.kotlinx.coroutines.slf4j) } }`;
   ChangeLog: "Slf4j dependency is not provided anymore (users have to provide it). It means that >= 5.x can work with both slf4j 1 or 2."
   https://github.com/oshai/kotlin-logging/blob/8.0.7/build.gradle.kts and https://github.com/oshai/kotlin-logging/blob/8.0.7/ChangeLog.md; 8.0.7.
3. kotlin-logging's class files carry Kotlin metadata 2.0.0 and are Java 8. `javap -v` on `io/github/oshai/kotlinlogging/KotlinLogging.class` in
   `kotlin-logging-jvm-8.0.7.jar`: `major version: 52` and `kotlin.Metadata( mv=[2,0,0] k=1 xi=48`.
   https://repo1.maven.org/maven2/io/github/oshai/kotlin-logging-jvm/8.0.7/kotlin-logging-jvm-8.0.7.jar; 8.0.7. (A Kotlin 2.2.x compiler reads metadata
   up to 2.3.0, per the earlier finding cited in this unit's research index.)
4. Backend selection on the JVM. Quote (`KotlinLoggingConfiguration.detectLogger`): `if (System.getProperty("kotlin-logging-to-jul") != null) { return JulLoggerFactory } else if (System.getProperty("kotlin-logging-to-logback") == "true") { return LogbackLoggerFactory } else if (System.getProperty("kotlin-logging-to-direct") == "true") { return DirectLoggerFactory } // default to SLF4J return Slf4jLoggerFactory`.
   https://github.com/oshai/kotlin-logging/blob/8.0.7/src/jvmMain/kotlin/io/github/oshai/kotlinlogging/KotlinLoggingConfiguration.kt; 8.0.7.
5. The startup line. Quote (`KotlinLogging` `init`): `println("kotlin-logging: initializing... active logger factory: ${factory::class.simpleName}")` guarded by `if (KotlinLoggingConfiguration.logStartupMessage)`;
   JVM default: `System.getProperty("kotlin-logging.logStartupMessage")?.toBoolean() ?: System.getenv("KOTLIN_LOGGING_STARTUP_MESSAGE")?.toBoolean() ?: true`.
   https://github.com/oshai/kotlin-logging/blob/8.0.7/src/commonMain/kotlin/io/github/oshai/kotlinlogging/KotlinLogging.kt; 8.0.7.
6. slf4j 2.0 finds providers by `ServiceLoader`. Quote: "SLF4J API version 2.0.0 relies on the ServiceLoader mechanism to find its logging backend."
   https://www.slf4j.org/manual.html; slf4j 2.0.20 manual, read 2026-11-18.
7. slf4j with no provider falls back to NOP with a warning. Quote: "SLF4J: No SLF4J providers were found. SLF4J: Defaulting to no-operation (NOP) logger implementation SLF4J: See https://www.slf4j.org/codes.html#noProviders for further details."
   https://www.slf4j.org/manual.html; 2.0.20, read 2026-11-18.
8. slf4j's rule for libraries. Quote: "Embedded components such as libraries or frameworks should not declare a dependency on any SLF4J binding/provider but only depend on slf4j-api."
   https://www.slf4j.org/manual.html; 2.0.20, read 2026-11-18.
9. slf4j 1.x binding detection and the 2.x legacy-binding warning. Quote (manual): "As of SLF4J version 1.6.0, if no binding is found on the class path, then slf4j-api will default to a no-operation implementation discarding all log requests."
   The legacy-binding warning text "Class path contains SLF4J bindings targeting slf4j-api versions 1.7.x or earlier." is in `LoggerFactory.bind()` of slf4j-api 2.0.x:
   https://github.com/qos-ch/slf4j/blob/master/slf4j-api/src/main/java/org/slf4j/LoggerFactory.java (read 2026-11-18, master; this page was read through a summarising fetch,
   so the message text is relayed, not copied from the raw source).
10. The provider and binding entries of the artifacts in F4. Evidence: `unzip -l` of each jar; for example `logback-classic-1.6.7.jar` holds `META-INF/services/org.slf4j.spi.SLF4JServiceProvider`
    whose content is `ch.qos.logback.classic.spi.LogbackServiceProvider`; `log4j-slf4j2-impl-2.26.1.jar` holds it with `org.apache.logging.slf4j.SLF4JServiceProvider`;
    `slf4j-api-2.0.20.jar`, `jul-to-slf4j-2.0.20.jar`, `log4j-over-slf4j-2.0.20.jar` and `kotlin-logging-jvm-8.0.7.jar` hold neither entry.
    Jars under https://repo1.maven.org/maven2/ (`ch/qos/logback/logback-classic/1.6.7/`, `org/apache/logging/log4j/log4j-slf4j2-impl/2.26.1/`, `org/slf4j/slf4j-api/2.0.20/` and the others in F4); read 2026-11-18.
11. Configuration-cache rule for resolved artifacts. Quote: "The Provider returned by getResolvedArtifacts() is Configuration Cache-compatible, and the ResolvedArtifactResult type is itself serializable, so you can wire the provider directly into a SetProperty<ResolvedArtifactResult> task property."
    Also: "Some dependency management types, such as Configuration and SourceDirectorySet, should not be used as task inputs because they contain unnecessary state and are not precise."
    https://docs.gradle.org/current/userguide/configuration_cache_requirements.html; Gradle 9.9.1 user guide, read 2026-11-18.
12. Latest versions: logback-classic 1.6.7 (directory dated 2026-11-14) with `<slf4j.version>2.0.19</slf4j.version>` in `logback-parent-1.6.7.pom`; slf4j-api latest 2.0.x is 2.0.20.
    https://repo1.maven.org/maven2/ch/qos/logback/logback-classic/maven-metadata.xml, https://repo1.maven.org/maven2/ch/qos/logback/logback-parent/1.6.7/logback-parent-1.6.7.pom,
    https://repo1.maven.org/maven2/org/slf4j/slf4j-api/maven-metadata.xml; read 2026-11-18.
13. The organisation's own precedent for the task shape. Quote (WebTools `VerifyJavaFloor`): "The module's resolved runtime classpath: the jars and class directories a consumer loads." on `@get:Classpath abstract val runtimeClasspath: ConfigurableFileCollection`;
    and in `webtools.kotlin-jvm-library.gradle.kts`: "logback is a logging *implementation*, so it is test-only - it must never leak onto a module's runtime classpath."
    https://github.com/SpartanLaboratories/WebTools/blob/d68ec81e82828911f373bc4940da34580786aaee/build-logic/src/main/kotlin/VerifyJavaFloor.kt and
    https://github.com/SpartanLaboratories/WebTools/blob/d68ec81e82828911f373bc4940da34580786aaee/build-logic/src/main/kotlin/webtools.kotlin-jvm-library.gradle.kts; WebTools' default branch, `master`, at commit `d68ec81e`, as read 2026-11-18.
14. The organisation's logging policy. Quote: "A library publishes no logging backend among its dependencies. logback is the backend for tests." and "The organization uses one kotlin-logging version, 8.0.7. It is an internal dependency and never appears in a library's public API."
    https://github.com/SpartanLaboratories/.github/blob/main/policy/logging/README.md; `main` as read 2026-11-18.

## 8. Gaps

- **The metadata version was read from one class only.** The Kotlin metadata version was read from `KotlinLogging.class`; I did not read
  every class file. The compiler of the jar is Kotlin 2.1.21 at language version 2.0, so all classes share one `mv`, but that is inferred.
- **The sketch in section 6 was not compiled or run**, and no configuration-cache run was made. The pattern follows the Gradle documentation and
  the organisation's `VerifyJavaFloor`; whether `ResolvedArtifactResult` mapped to strings gives stable up-to-date fingerprints was not tested.
- **Runtime failure modes were derived, not run.** `NoClassDefFoundError` with no slf4j-api, and the NOP warning with kotlin-logging on top, follow from the source and from
  slf4j's documented behaviour; no program was executed.
- **The list of providers is what I could read, not exhaustive.** Providers not read: logback-android, slf4j-android, pax-logging, Quarkus and
  other container-specific ones. The provider-mechanism half of the check covers those if they follow the standard entry; the coordinate list
  does not.
- **Providers selected only with `-Dslf4j.provider`** (no services file) are not detected by the mechanism; the coordinate list covers the named ones.
- **No source found for another build that checks slf4j 2 providers by the services file**; the 1.x-era `checkSlf4j` and the capabilities plugin are the
  nearest prior art. Maven Enforcer's `bannedDependencies` is the usual Maven-side equivalent of the coordinate list, but I read none of its
  documentation, so it is not cited above.
- **JDA's runtime classpath was taken from the unit's earlier finding** (JDA 6.7.0: okhttp-jvm, slf4j-api, nv-websocket-client, opus-java, commons-collections4, and
  trove4j, jackson, tink at runtime); no jar of it was scanned here. Running the check against the real `bottools-core` classpath is the proof that it passes.
- **WebTools' HTTP stack** (a later module) brings slf4j-api 2.0.13 per the brief; I did not resolve its runtime classpath, so a provider in it is not ruled out.
- **The organisation's chosen logback version for tests** is not stated in the policy; 1.6.7 versus 1.5.38 is a recommendation on weak evidence (opinion), not a requirement.
