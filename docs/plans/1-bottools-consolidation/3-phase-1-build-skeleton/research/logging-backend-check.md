# Logging dependency and the no-backend check

## 1. Question

Which logging dependencies does the library declare under the organisation's logging policy (all Kotlin code logs through
kotlin-logging 8.0.7, an internal dependency; a library publishes no logging backend; logback is the backend for tests), and how does
a build check tell that a published module's resolved runtime classpath carries a logging backend?

An answer must meet these requirements: the check runs per published module over its resolved runtime classpath, joins `check`, is
configuration-cache safe, passes for kotlin-logging plus slf4j-api alone and fails for each common backend; kotlin-logging 8.0.7 is
readable by the Kotlin 2.5 compiler at language version 2.5 and API version 2.5 (the build pins the Kotlin Gradle plugin 2.5.0-RC and moves
to 2.5.0 when it is released), runs on Java 21, and asks for a `kotlin-stdlib` no newer than the module's own; the answer states what
kotlin-logging does on the JVM with no slf4j provider and what a test classpath with logback looks like. Each module that logs declares
`io.github.oshai:kotlin-logging-jvm` 8.0.7 and `org.slf4j:slf4j-api` 2.0.19 as `implementation`; tests get
`ch.qos.logback:logback-classic` 1.6.7 as `testRuntimeOnly`. Facts are as of 2026-11-22.

## 2. Bottom line

- **kotlin-logging 8.0.7 works with a Kotlin 2.5 compiler at language and API version 2.5; nothing in the evidence says otherwise.** Its JVM
  artifact carries Kotlin metadata `mv=[2,0,0]` and Java 8 class files. Kotlin's published binary-compatibility protocol is that "a newer
  compiler can read older binaries", and on the JVM it supports setting the language and API version to the compiler's own latest. Its only
  declared dependency, `kotlin-stdlib` `requires 2.1.21`, resolves to the module's own `kotlin-stdlib` at the plugin's version (2.5.0-RC now,
  2.5.0 later), because Gradle selects the highest requested version and the Kotlin Gradle plugin adds the standard library at its own
  version to every source set. kotlin-logging's open issues report no problem with Kotlin 2.4 or 2.5 on the JVM. This was established from
  documentation, metadata and source; no compiler was run (see Gaps).
- **kotlin-logging 8.0.7 does not bring slf4j-api.** Its JVM artifact `io.github.oshai:kotlin-logging-jvm:8.0.7` declares one dependency,
  `kotlin-stdlib` 2.1.21, in both its POM and its Gradle Module Metadata; slf4j-api is `compileOnly` in its build. A module that logs
  therefore declares both `io.github.oshai:kotlin-logging-jvm:8.0.7` and `org.slf4j:slf4j-api` itself, each as `implementation`, never
  `api`, and neither with `strictly`. The slf4j-api version to declare is 2.0.19, the version JDA 6.7.0 and logback-classic 1.6.7 already
  ask for, so the declaration moves no consumer's resolution. Any slf4j-api 2.0.x satisfies kotlin-logging's source (it uses only
  `org.slf4j` types present since 2.0.0). 8.0.7 is the newest kotlin-logging release on Maven Central; its maintainers plan a 9.0.0 that
  raises its own Kotlin baseline, with no date.
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
  `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` naming `ch.qos.logback.classic.spi.LogbackServiceProvider`). A published module
  declares `logback-classic` only as `testRuntimeOnly` and packages no `logback.xml`; those two are what the check exists to refuse.

## 3. Findings

**F1. kotlin-logging 8.0.7: coordinates, dependencies, metadata, target.** *Evidence: primary artifacts and source, read directly. Applies
to 8.0.7 (tag `8.0.7`, commit `4996228c21f5b53d002440aa5d95234815198b91`, GitHub release 2026-11-10; POM and module metadata re-read 2026-11-22).*
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

**F3. Latest versions on Maven Central.** *Evidence: `maven-metadata.xml` and directory listings read on 2026-11-22.* slf4j-api latest stable
is 2.0.20 (an `2.1.0-alpha1` exists, 2026-09-22). logback-classic latest is 1.6.8 (2026-11-19); 1.6.7 (2026-11-14) is the version the build
uses, and the parent POMs of both manage slf4j-api 2.0.19 (`<slf4j.version>2.0.19</slf4j.version>`), so the two have the same slf4j-api
requirement. The logback 1.5 line ends at 1.5.38 (2026-07-09, slf4j-api 2.0.17); log4j-slf4j2-impl and log4j-core latest 2.x is 2.26.1.
JDA 6.7.0 (latest, 2026-09-20) declares `org.slf4j:slf4j-api:2.0.19` (`compile`) in its POM, so 2.0.19 is unchanged for both JDA and
logback 1.6.7.

**F4. Which artifacts are providers (read from the jars).** *Evidence: each jar downloaded from Maven Central and listed with `unzip -l`
on 2026-11-18; versions in the table. Jar contents are immutable per version.*

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

**F5. Prior art for the check, and what the organisation's builds declare.** *Evidence tier: one source each for the check; common practice
(three repositories) for the declarations. No source found for a published slf4j 2 provider-mechanism check.*
- A Gradle task `checkSlf4j` (robots.org.uk, slf4j 1.x era): over `configurations.runtime`, it opens each jar with `zipTree` and matches
  `org/slf4j/impl/StaticLoggerBinder.class`; it fails when more than one binding is found; `check.dependsOn checkSlf4j`. It is the same
  mechanism as the 1.x half of this check, not updated for `SLF4JServiceProvider`, and it fails on *multiple* bindings, not on *any*.
- `dev.jacomet.logging-capabilities` (0.10.0; source repository `ljacomet/logging-capabilities` archived, last push 2024-04-28) assigns the
  capability `dev.jacomet.logging:slf4j-impl` to slf4j-simple, slf4j-log4j12, slf4j-jcl, slf4j-jdk14, logback-classic and log4j-slf4j-impl so
  that Gradle fails a graph holding two. It detects *two*, not *one*: a single backend is not a capability conflict, so it cannot enforce
  "none", and its list does not name the slf4j 2 provider `log4j-slf4j2-impl`. It is a coordinate list by another mechanism.
- Within the organisation (default branches read 2026-11-22), WebTools, MyGameTools and GeneralTools each keep logback out of the main
  classpath and depend on slf4j-api alone: WebTools' modules declare `api("org.slf4j:slf4j-api:2.0.13")` (or `implementation` in its
  multiplatform modules) and its `webtools.kotlin-jvm-library` convention plugin declares `testImplementation("ch.qos.logback:logback-classic:1.5.6")`
  with the comment that logback "must never leak onto a module's runtime classpath"; MyGameTools' `gametools.kotlin-library` convention plugin
  declares `api("org.slf4j:slf4j-api:2.0.16")` and `testImplementation("ch.qos.logback:logback-classic:1.5.18")`; GeneralTools' build declares
  `api("org.slf4j:slf4j-api:2.0.16")` and `testImplementation("ch.qos.logback:logback-classic:1.5.13")`. None of the three build files names
  kotlin-logging (the build files were searched; sources were not), and none declares logback outside a test configuration. This library
  differs in two declared points: `implementation` rather than `api` for slf4j-api, and `testRuntimeOnly` rather than `testImplementation`
  for logback.
- WebTools' `VerifyJavaFloor` takes the module's `runtimeClasspath` as a `ConfigurableFileCollection` annotated `@Classpath`, plus the
  module's jar, and writes a one-line report as `@OutputFile`. That is the shape this check takes. No MyGameTools or GeneralTools build
  has a no-backend check.

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

**F7. A Kotlin 2.5 compiler at language and API version 2.5 reads kotlin-logging 8.0.7's class files.** *Evidence tier: established
(Kotlin's own documentation of its binary-compatibility protocol); the observed metadata version is from F1. Kotlin 2.5.0-RC on Maven Central
since 2026-11-11 (2.5.0 is not out); the documentation page was read on 2026-11-22 at `JetBrains/kotlin-web-site` commit
`f4100328bb403bb0df8673942d5974790c6e2c50`.*
- The protocol, from "Kotlin evolution principles": "All binaries are backwards compatible; that means a newer compiler can read older
  binaries (for example, 1.3 understands 1.0 through 1.2)." The page adds that Kotlin/JVM has reached this level of stability. The Kotlin
  metadata in kotlin-logging-jvm 8.0.7 is 2.0.0 (F1) and the compiler reading it is 2.5, five minor versions later, so the guarantee covers
  it by its wording; no sentence names 2.0.0 against 2.5 specifically.
- The metadata version equals the language version it was compiled at ("Starting from Kotlin 1.4, the metadata version is equal to the
  language version"), so 2.0.0 is exactly what a library compiled at language version 2.0 carries: kotlin-logging's `languageVersion` is 2.0 (F1).
- `-language-version` and `-api-version` are "compatibility mode" options that make the compiler emulate an older version; setting both to
  the compiler's own version (2.5) is the default behaviour and restricts nothing about which binaries it reads. The page's statement that
  "on the JVM we support at least three previous language and API versions in addition to the latest stable version" concerns the version
  a library is compiled *at*, i.e. who can consume its output; it is not a limit on what the compiler reads.
- The Kotlin 2.4 compatibility guide (the newest on the documentation site; no 2.5 guide or "what's new" page existed at the commit
  above) lists no change to the reading of older JVM binaries.

**F8. Dependency resolution: kotlin-logging's `kotlin-stdlib` 2.1.21 beside the module's own.** *Evidence tier: established (Kotlin and
Gradle documentation). Kotlin Gradle plugin docs at the commit in F7; Gradle 9.9.2 user guide read 2026-11-22.*
- The Kotlin Gradle plugin adds the standard library itself: "A dependency on the standard library (`stdlib`) is added automatically to
  each source set. The version of the standard library used is the same as the version of the Kotlin Gradle plugin." So each module has
  `kotlin-stdlib` 2.5.0-RC (then 2.5.0) in its graph without declaring it. `kotlin.stdlib.default.dependency=false` switches this off; an
  explicitly declared stdlib is not overridden and not duplicated.
- kotlin-logging's edge is `requires 2.1.21`, a rich-version lower bound, not a strict pin (F1). Gradle: "Gradle considers all requested
  versions across the dependency graph and, by default, selects the highest version." With 2.1.21 and 2.5.0-RC requested, 2.5.0-RC is
  selected for both the compile and runtime classpaths; the module does not see two stdlibs. The same holds for 2.5.0. Nothing in the
  build should set `strictly` on `kotlin-stdlib`.
- The reverse direction needs no action: kotlin-logging 8.0.7 was compiled against stdlib 2.1.21 at API version 2.0 and runs on a newer
  stdlib (the same drop-in-replacement rule, "upgrading a binary dependency should not break anything"). The module compiled at API
  version 2.5 against stdlib 2.5 is consistent; the case of an older stdlib winning does not occur while the default dependency is on.

**F9. Newer kotlin-logging releases and issues about Kotlin 2.4 and 2.5.** *Evidence: Maven Central metadata and the GitHub issue tracker,
read 2026-11-22.*
- The newest kotlin-logging release on Maven Central is 8.0.7 (`maven-metadata.xml`: `<latest>8.0.7</latest>`, `lastUpdated` 2026-11-10;
  GitHub releases list 8.0.7 as "Latest", then 8.0.6, 8.0.5 and 8.0.4). The default branch has later commits (up to 2026-11-21, including
  a logback test-dependency bump from 1.6.6 to 1.6.7) but no release after 8.0.7. The organisation's version stays 8.0.7.
- No issue in `oshai/kotlin-logging`, open or closed, reports a failure with a Kotlin 2.4 or 2.5 compiler on the JVM. Searches for "kotlin
  2.4" and "kotlin 2.5" return one issue, #638 (open, 2026-11-14, "v9.0.0 toolchain upgrade plan: Kotlin 2.2+, Coroutines 1.11+, Gradle 9, and
  AGP 9"). It states that 8.x keeps `apiVersion` and `languageVersion` at 2.0 and pins Kotlin 2.1.21 so that projects on Kotlin 2.0.x can
  use it, and that "Kotlin `2.4+` also changes Native file-initializer symbols (`$init_global$<File>.kt`) and Wasm `() -> Unit` lambda
  lowering (`Function0`)": both concern `src/nativeMain` and `src/wasmWasiMain`, not the JVM artifact. The plan raises the Kotlin
  baseline in the next major (9.0.0), with no date. Issue #546 (closed) is the other direction: a newer stdlib's metadata cannot be read
  by an older compiler.
- Absence of a report is not evidence that a Kotlin 2.5 compile was tried; it shows only that nobody has filed a problem.

## 4. How comparable projects do it

- **kotlin-logging itself** (`oshai/kotlin-logging` 8.0.7): `compileOnly` on slf4j-api and logback in the shipped library; the backends
  (`logback-classic`, `log4j-slf4j2-impl`, `log4j-core`) appear only in its test source sets (`jvmLogbackTest`, `jvmTest`), where it runs
  one test set per backend. A library that wraps slf4j ships no provider. It compiles at language and API version 2.0 on Kotlin 2.1.21 so
  that consumers on older compilers read its output; this is the mechanism F7 describes, applied by the library.
- **WebTools** (organisation): `api(slf4j-api)` per module; the logback test dependency lives in the library convention plugin; the
  runtime-classpath scan is a `@Classpath` file collection input to a task registered by a `WebToolsBuild.registerVerifyJavaFloor(project,
  jars, runtimeClasspath)` function and wired with `tasks.named("check") { dependsOn(...) }`. Its tests are component tests over generated
  jars (`JarClasses`, `ResolutionReport` support classes).
- **MyGameTools and GeneralTools** (organisation): `api(slf4j-api:2.0.16)` and a `testImplementation` logback; no check (F5).
- **slf4j's own guidance** (manual, "Basic rule"): a library depends on slf4j-api only; a provider is a deployment decision and, where a
  library needs one for its own tests, it is declared in test scope.

## 5. Pitfalls and regrets

- **kotlin-logging does not declare slf4j-api.** A module that logs through kotlin-logging with no slf4j-api of its own gets it only if
  another dependency happens to bring it (JDA does, `bottools-core` only). A module without JDA (for example one that holds only the SQLite
  persistence) fails at runtime with `NoClassDefFoundError` unless it declares slf4j-api. Declare it in each logging module, not by
  accident of a transitive edge.
- **A library packaging `logback.xml` configures its consumers.** A consumer on logback would load it first or collide with its own file.
  Published jars carry no backend configuration file. (Suggested extension to the check, see section 6; a third-party jar's own
  `logback.xml` is outside the module's control.)
- **Two providers.** With more than one provider on a classpath, slf4j uses the first found and warns; a test classpath that holds logback
  plus a framework's `slf4j-simple` shows `Class path contains multiple SLF4J providers.` Keep exactly one provider on every test classpath:
  logback via the convention plugin, and exclude any other a test dependency brings.
- **No provider in a consumer.** One stderr warning, then total silence, including the library's own and JDA's events. This is the cost of
  the policy and cannot be fixed by the library; the module's README states that a consumer chooses a backend.
- **Startup `println` from a library.** The first `KotlinLogging` use writes a line to stdout. WebTools' own research notes rejected
  kotlin-logging for common code for this reason (relayed from those notes, not re-read here). A library setting `logStartupMessage = false`
  mutates global state shared with the consumer and depends on init order; leave the switch to the consumer.
- **`strictly` on slf4j-api, kotlin-logging or kotlin-stdlib in a library** would make consumers' conflicting graphs fail; all are plain
  requirements. Gradle resolves to the highest version in the graph. A `strictly` on `kotlin-stdlib` 2.1.21 would also pin the module below
  its own API version 2.5.
- **Turning the default standard-library dependency off** (`kotlin.stdlib.default.dependency=false`) would leave kotlin-logging's
  `requires 2.1.21` as the only stdlib request and put the module on 2.1.21 while it is compiled at API version 2.5. Inference from F8, not
  tested; the build does not set that property.
- **kotlin-logging 9.0.0 is planned and raises its Kotlin baseline** (issue #638). The organisation's version stays 8.0.7; a later move to
  a 9.x release is a change to the policy's version, to be taken with its own metadata and stdlib requirements read at that time.
- **A coordinate-only check goes stale** (a new provider, a relocated or shaded jar passes); a mechanism-only check misses `log4j-core`.
- **`testImplementation` vs `testRuntimeOnly` for logback**: `testImplementation` puts logback's API on the test compile classpath for
  programmatic configuration; neither reaches the main runtime classpath. `testRuntimeOnly` is enough, and is what the library declares.
- **Empty modules.** The check must pass on a module with no dependency but kotlin-stdlib. A copy of `VerifyJavaFloor`'s "nothing to check"
  failure would fail the four modules that hold no source yet.

## 6. Recommendation for this repository

Declare, in the version catalog and in each module that logs (first `bottools-core`):

```kotlin
implementation("io.github.oshai:kotlin-logging-jvm:8.0.7")   // the organisation's single kotlin-logging version
implementation("org.slf4j:slf4j-api:2.0.19")                  // kotlin-logging does not bring it; JDA 6.7.0 asks for 2.0.19 too
```

and, once, in the `bottools.kotlin-library` convention plugin: `testRuntimeOnly("ch.qos.logback:logback-classic:1.6.7")` (the 1.6 line is what kotlin-logging
8.0.7 tests against, 1.6.6, and its default branch now tests 1.6.7; logback-classic's slf4j-api 2.0.19 equals the declared one; 1.6.8 is newer
with the same slf4j-api requirement, 1.5.38 is the last of the 1.5 line). Neither logging dependency is `api`:
no kotlin-logging or slf4j type appears in the library's public API. No published module declares `logback-classic` outside `testRuntimeOnly` or
packages a `logback.xml`.

Do not declare `kotlin-stdlib` for kotlin-logging's sake, and do not constrain it: the Kotlin Gradle plugin's own `kotlin-stdlib` at the
plugin's version outranks kotlin-logging's `requires 2.1.21` (F8), and the compiler at language and API version 2.5 reads kotlin-logging's
2.0.0 metadata (F7). No exclusion, substitution or `-Xskip-metadata-version-check` is needed. The build's compile of the first logging module
is the proof that F7 holds on 2.5.0-RC; if it failed on kotlin-logging's metadata, the options would be (a) a report to oshai/kotlin-logging,
or (b) the compiler's `-Xskip-metadata-version-check` as a stop-gap for that one dependency, with the build otherwise unchanged; nothing in
the evidence points there, and no newer kotlin-logging release exists to move to (F9).

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
  `log4j2-test.xml`, `log4j.properties` or `simplelogger.properties` at its root, the cost of a packaged backend configuration.
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
   https://repo1.maven.org/maven2/io/github/oshai/kotlin-logging-jvm/8.0.7/kotlin-logging-jvm-8.0.7.pom and `.module`; 8.0.7, 2026-11-10; module file re-read 2026-11-22.
2. slf4j-api is `compileOnly` in kotlin-logging's JVM build. Quote (`build.gradle.kts` at tag 8.0.7): `val javaMain by creating { dependsOn(commonMain) dependencies { compileOnly(libs.slf4j.api) compileOnly(libs.kotlinx.coroutines.slf4j) } }`;
   ChangeLog: "Slf4j dependency is not provided anymore (users have to provide it). It means that >= 5.x can work with both slf4j 1 or 2."
   https://github.com/oshai/kotlin-logging/blob/8.0.7/build.gradle.kts and https://github.com/oshai/kotlin-logging/blob/8.0.7/ChangeLog.md; 8.0.7.
3. kotlin-logging's class files carry Kotlin metadata 2.0.0 and are Java 8. `javap -v` on `io/github/oshai/kotlinlogging/KotlinLogging.class` in
   `kotlin-logging-jvm-8.0.7.jar`: `major version: 52` and `kotlin.Metadata( mv=[2,0,0] k=1 xi=48`.
   https://repo1.maven.org/maven2/io/github/oshai/kotlin-logging-jvm/8.0.7/kotlin-logging-jvm-8.0.7.jar; 8.0.7. That a Kotlin 2.5 compiler reads
   metadata 2.0.0 rests on claims 15 and 16, not on this one.
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
12. Latest versions: logback-classic latest is 1.6.8 (directory dated 2026-11-19); 1.6.7 (2026-11-14) and 1.6.8 both have `<slf4j.version>2.0.19</slf4j.version>` in their parent POMs; slf4j-api latest stable 2.0.x is 2.0.20 (`<latest>2.1.0-alpha1</latest>`).
    https://repo1.maven.org/maven2/ch/qos/logback/logback-classic/maven-metadata.xml (`<latest>1.6.8</latest>`, `lastUpdated` 20261119111748),
    https://repo1.maven.org/maven2/ch/qos/logback/logback-parent/1.6.7/logback-parent-1.6.7.pom and https://repo1.maven.org/maven2/ch/qos/logback/logback-parent/1.6.8/logback-parent-1.6.8.pom,
    https://repo1.maven.org/maven2/org/slf4j/slf4j-api/maven-metadata.xml (versions 2.0.17 to 2.0.20, 2.1.0-alpha0, 2.1.0-alpha1; `lastUpdated` 20260922145706); read 2026-11-22.
13. The organisation's own precedent for the task shape. Quote (WebTools `VerifyJavaFloor`): "The module's resolved runtime classpath: the jars and class directories a consumer loads." on `@get:Classpath abstract val runtimeClasspath: ConfigurableFileCollection`;
    and in `webtools.kotlin-jvm-library.gradle.kts`: "logback is a logging *implementation*, so it is test-only - it must never leak onto a module's runtime classpath."
    https://github.com/SpartanLaboratories/WebTools/blob/98b7749669f99bded453f7293609317677e4cb05/build-logic/src/main/kotlin/VerifyJavaFloor.kt and
    https://github.com/SpartanLaboratories/WebTools/blob/98b7749669f99bded453f7293609317677e4cb05/build-logic/src/main/kotlin/webtools.kotlin-jvm-library.gradle.kts; WebTools' default branch, `master`, at commit `98b77496`, as read 2026-11-22
    (the same text is at commit `d68ec81e` of 2026-11-18).
14. The organisation's logging policy. Quote: "A library publishes no logging backend among its dependencies. logback is the backend for tests." and "The organization uses one kotlin-logging version, 8.0.7. It is an internal dependency and never appears in a library's public API."
    https://github.com/SpartanLaboratories/.github/blob/main/policy/logging/README.md; `main` as read 2026-11-22 (last changed 2026-11-14).
15. Kotlin's binary-compatibility protocol: a newer compiler reads older binaries, on the JVM. Quote: "All binaries are backwards compatible; that means a newer compiler can read older binaries (for example, 1.3 understands 1.0 through 1.2)." and "Note that not all target platforms have reached this level of stability, but Kotlin/JVM has."
    https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/kotlin-evolution-principles.md ("Evolving the binary format"); the Kotlin documentation site's current page, read 2026-11-22 (it carries no Kotlin 2.5-specific text; Kotlin 2.5.0-RC, 2026-11-11).
16. Language and API version options and the metadata version. Quote: "`-language-version X.Y` – compatibility mode for Kotlin language version X.Y. The compiler reports errors when your code uses language features introduced in later versions." and "In most projects, set both options to the same version."
    Same page and commit as claim 15 ("Compatibility options"). Metadata equals the language version: "Starting from Kotlin 1.4, the metadata version is equal to the language version."
    https://kotlinlang.org/api/kotlinx-metadata-jvm/kotlin-metadata-jvm/kotlin.metadata.jvm/-jvm-metadata-version/index.html; read 2026-11-22.
17. The Kotlin Gradle plugin adds the standard library at its own version. Quote: "A dependency on the standard library (`stdlib`) is added automatically to each source set. The version of the standard library used is the same as the version of the Kotlin Gradle plugin."
    and "If you declare a standard library dependency explicitly (for example, if you need a different version), the Kotlin Gradle plugin won't override it or add a second standard library."
    https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/gradle/gradle-configure-project.md ("Dependency on the standard library"); read 2026-11-22.
18. Gradle picks the highest requested version. Quote: "Gradle considers all requested versions across the dependency graph and, by default, selects the highest version." and "If a `strictly` version is declared that is lower than the highest, resolution will fail."
    https://docs.gradle.org/current/userguide/graph_resolution.html; Gradle 9.9.2 user guide, read 2026-11-22.
19. The newest kotlin-logging release is 8.0.7. Quote (`maven-metadata.xml`): `<latest>8.0.7</latest> <release>8.0.7</release> ... <lastUpdated>20261110161645</lastUpdated>`; GitHub releases: 8.0.7 marked "Latest", published 2026-11-10T18:55:56Z.
    https://repo1.maven.org/maven2/io/github/oshai/kotlin-logging-jvm/maven-metadata.xml and https://github.com/oshai/kotlin-logging/releases; read 2026-11-22.
20. kotlin-logging's own account of its Kotlin baseline and of Kotlin 2.4. Quote (issue #638, open): "In `8.x`, `kotlin-logging` keeps `apiVersion` and `languageVersion` at Kotlin `2.0` so projects still on Kotlin `2.0.x` can upgrade safely."
    and "Kotlin `2.4+` also changes Native file-initializer symbols (`$init_global$<File>.kt`) and Wasm `() -> Unit` lambda lowering (`Function0`)."
    https://github.com/oshai/kotlin-logging/issues/638; created 2026-11-14, read 2026-11-22.
21. JDA 6.7.0 asks for slf4j-api 2.0.19. POM: `<artifactId>slf4j-api</artifactId> <version>2.0.19</version> <scope>compile</scope>`.
    https://repo1.maven.org/maven2/net/dv8tion/JDA/6.7.0/JDA-6.7.0.pom; JDA 6.7.0 (`<latest>6.7.0</latest>`, 2026-09-20), read 2026-11-22.
22. Kotlin 2.5.0-RC is the newest Kotlin Gradle plugin and standard library on Maven Central; 2.5.0 is not published. `maven-metadata.xml` of `org.jetbrains.kotlin:kotlin-stdlib` and `kotlin-gradle-plugin`: `<latest>2.5.0-RC</latest> <release>2.5.0-RC</release>` with `lastUpdated` 20261111082541 / 20261111082538.
    https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib/maven-metadata.xml and https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/maven-metadata.xml; read 2026-11-22.
23. The organisation's other builds declare slf4j-api as a dependency and logback only for tests. Quote (GeneralTools `build.gradle.kts`): "The library only needs the slf4j API - consumers choose their own logging backend." and "Logback is only needed to actually see log output while running the test suite."
    https://github.com/SpartanLaboratories/GeneralTools/blob/c196d1a80d60fca16a95a6bc69526564b14918b6/build.gradle.kts; MyGameTools `gametools.kotlin-library.gradle.kts` (`api("org.slf4j:slf4j-api:2.0.16")`, `testImplementation("ch.qos.logback:logback-classic:1.5.18")`) at
    https://github.com/SpartanLabsGaming/MyGameTools/blob/46697c15f4c2386b6cfd17eadefd1bfa1f6d54cd/build-logic/src/main/kotlin/gametools.kotlin-library.gradle.kts; default branches `master`, read 2026-11-22.

## 8. Gaps

- **No Kotlin 2.5 compile was run.** That a 2.5 compiler at language and API version 2.5 reads kotlin-logging 8.0.7's metadata 2.0.0 rests on
  Kotlin's general binary-compatibility protocol, written for stable compilers; Kotlin 2.5.0-RC is a pre-release and the documentation site
  has no 2.5 compatibility guide or "what's new" page at the commit read. The first compile of a logging module on 2.5.0-RC is the proof. If
  it fails on kotlin-logging's metadata, the options are those in section 6; the evidence gives no sign of it.
- **No resolution was run either.** That Gradle selects `kotlin-stdlib` at the plugin's version over kotlin-logging's `requires 2.1.21` is
  derived from the two documented rules (claims 17 and 18) and the module metadata (claim 1); the Gradle page read does not discuss `requires`
  separately, only the highest-version rule and `strictly`. The version string comparison 2.5.0-RC against 2.1.21 is taken as ordinary
  (5 above 1 in the second component), not checked against Gradle's version ordering.
- **kotlin-logging's issue tracker was searched by keyword and by recent listing (40 newest issues), not read in full.** "No problem reported
  with Kotlin 2.4 or 2.5 on the JVM" holds for what the search and the listing returned.
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
- **JDA's runtime classpath was read from its POM only** (JDA 6.7.0: slf4j-api 2.0.19, nv-websocket-client, okhttp-jvm, opus-java and
  commons-collections4 at compile scope; trove4j, jackson-core, jackson-databind and tink at runtime scope); no jar of it was scanned and
  its transitive graph was not resolved. Running the check against the real `bottools-core` classpath is the proof that it passes.
- **WebTools' HTTP stack** (a later module) brings slf4j-api 2.0.13 per its build file; I did not resolve its runtime classpath, so a provider in it is not ruled out.
- **The three other organisation builds were searched in their Gradle build files only**, for logging coordinates; the statement that none
  uses kotlin-logging yet covers those files, not their sources.
- **The logback and slf4j-api versions are requirements of the build.** The policy text names only the kotlin-logging version; logback 1.6.7
  (1.6.8 is newer) and slf4j-api 2.0.19 were checked for existence and for agreeing with each other and with JDA 6.7.0, not for being the best choices.
