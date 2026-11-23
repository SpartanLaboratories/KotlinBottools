# Dokka, publishing and API-validation versions on Kotlin 2.5, and how the gates behave on modules with no source

Evidence as of 2026-11-22. Every source below was read on that date unless a finding says otherwise.

"Observed" below means: run in a scratch build of the same shape as this repository's target (an included `build-logic` with a
Kotlin-library and a published-library convention plugin, three published modules, one of them with the two stability
annotations, an umbrella with no source, a root that aggregates), on Gradle 9.7.1 with a JDK 21 toolchain, with
`explicitApi()`, the configuration cache on and no signing key in the Gradle user home. The scratch build ran with two
toolchains: Kotlin Gradle plugin 2.2.21 + Dokka 2.3.0 + vanniktech 0.37.0 + validator 0.18.2, and Kotlin Gradle plugin 2.2.0 +
Dokka 2.2.0 + vanniktech 0.36.0 + validator 0.18.2. Both behaved identically on every observed point unless a finding says
otherwise. **No reproduction has run on Kotlin 2.5.** Finding F8 says, from sources, which observed behaviours depend on the
Kotlin version.

## 1. Question

Which versions of Dokka, `com.vanniktech.maven.publish` and the binary-compatibility validator (or the Kotlin Gradle plugin's own
ABI validation) work with the Kotlin Gradle plugin 2.5.0-RC compiling at language version 2.5 and API version 2.5, on Gradle
9.7.1, a JDK 21 toolchain and a Java floor of 21 with the configuration cache usable; how does a Dokka task join `check` so that
`./gradlew build` fails on an undocumented public declaration; and do the modules that hold no main source pass the
documentation, ABI and publishing gates as they are, or does each need one minimal declaration?

Requirements an answer meets: the build pins the Kotlin Gradle plugin 2.5.0-RC now (published 2026-11-11 as a pre-release; 2.5.0
is not out) and moves to 2.5.0 when it is released; language and API version are both 2.5; Dokka 2 in V2 plugin mode with one
aggregate publication at the root (`dokka(project(":<module>"))`, Kotlin plugins on the root with `apply false`, theme per module
and at the root, `reportUndocumented` and `failOnWarning` on every configuration, the umbrella's own source sets suppressed);
`JavadocJar.Dokka("dokkaGeneratePublicationHtml")`; the validator in `check` with `@ExperimentalBotToolsApi` in
`nonPublicMarkers`; `publishToMavenLocal` at `1.0.0-SNAPSHOT` with no signing key while releases stay signed.

## 2. Bottom line

- **Pin Dokka 2.3.0, not 2.2.0.** Dokka analyses with its own embedded Kotlin compiler and ignores the project's language
  version. 2.3.0 embeds compiler 2.5.0-dev-3229, whose default (and newest stable) language version is 2.5 and whose metadata
  version is 2.5.0, the version `kotlin-stdlib` 2.5.0-RC and every module compiled by the 2.5 plugin carry. 2.2.0 embeds compiler
  2.3.20-dev-7064: its default language version is 2.3, it cannot be told to use 2.5 (an unknown version falls back to its latest
  stable), and by the compiler's own rule it reads metadata only up to 2.4. **Dokka 2.2.0 is therefore expected not to work on this
  stack** (the 2.5.0-RC `kotlin-stdlib` on its analysis classpath is unreadable to it). That is an expectation from sources;
  it was not observed, and a build is the decider. Set `languageVersion` and `apiVersion` to `"2.5"` on every Dokka source set so a
  later Dokka that embeds compiler 2.6 does not drift.
- **Dokka issue 4620 is fixed on Dokka's `master` (pull request 4628, merged 2026-11-20) but in no release.** 2.3.0 is still the
  newest Dokka. 4620 under `failOnWarning` needs a documented class in one module that inherits a private member, from a class in
  another module, whose type comes from that other module's `implementation` dependency. In this phase only `bottools-core` has
  source (two annotations), so nothing can trigger it yet; it becomes live when a feature module subclasses a `bottools-core`
  class that holds a private logger. Guard it with the real modules' `dokkaGeneratePublicationHtml` the first time such a subclass
  lands, and move to the first Dokka release that carries pull request 4628.
- **vanniktech 0.37.0 works with the Kotlin Gradle plugin 2.5.0-RC.** On the `KotlinJvm` path it uses only
  `KotlinBasePlugin.pluginVersion` and `KotlinToolingVersion`, both present at 2.5.0-RC; its integration-test matrix includes
  Kotlin Gradle plugin 2.5.0-RC since 2026-11-11 and its `main` build is green on 2026-11-22; no plugin source changed since 0.37.0
  and no newer release exists.
- **The binary-compatibility validator 0.18.2 works with the Kotlin Gradle plugin 2.5.0-RC by its source, and no public build was
  found that proves it.** At run time it resolves `kotlin-metadata-jvm` at the project's Kotlin plugin version
  (`2.5.0-RC`, which is on Maven Central) and reads class files with `readLenient`; `nonPublicMarkers` filters annotations
  read from the class file and is independent of Kotlin metadata. Its repository has two open issues, both about Android. The option
  beside it is the Kotlin Gradle plugin's own ABI validation, `kotlin { abiValidation() }`: still **experimental** at
  2.5.0-RC (it needs `@OptIn(ExperimentalAbiValidation::class)`), with the same `api/<module>.api` location and tasks `checkKotlinAbi`
  and `updateKotlinAbi`. ktlint runs it on Kotlin 2.5.0-RC today. It is a fallback, not the pick: the validator is in maintenance
  mode but not experimental.
- **Each published module's `kotlin-stdlib` requirement is the plugin's version**: `2.5.0-RC` now, `2.5.0` after the move. Gradle
  orders `2.5.0-RC` below `2.5.0`. Binaries compiled at language 2.5 by 2.5.0-RC are not marked pre-release by the compiler.
- **The modules with no main source pass every gate as they are, on the observed toolchains; none needs a placeholder
  declaration.** Observed on a module with no source, with only a test source, and on the umbrella: Dokka runs with
  `failOnWarning` and logs no warning (it writes no pages); `apiBuild` runs and `apiDump` writes a zero-byte
  `<module>/api/<module>.api`; `apiCheck` fails with "Expected file with API declarations ... does not exist" until that file is
  committed, and passes against the zero-byte file; vanniktech builds a valid jar, sources jar, javadoc jar, POM and module file
  (each jar holds only `META-INF/MANIFEST.MF`); `explicitApi()` and the toolchain have nothing to act on. None of these paths
  reads a Kotlin class or metadata, so none is expected to depend on the Kotlin version (F8, an inference). The work commits one
  zero-byte dump per module with no source (and the umbrella), made by `apiDump`.
- **Join Dokka to `check` with `tasks.named("check") { dependsOn("dokkaGeneratePublicationHtml") }` in
  `bottools.published-library`, and the same line on the root.** Nothing here needs the `pluginMode` property to get V2 (the
  default is `V2EnabledWithHelpers`); set `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled` in the root
  `gradle.properties` as Dokka's migration guide prescribes.
- **Two silent failures to guard.** A root without the Kotlin plugin on its classpath renders an empty aggregate and the build
  still succeeds under `failOnWarning` (observed); and Gradle 9 fails `test` when a module has test sources but discovers no test.

## 3. Findings

### F1. Newest releases and pairings (established consensus: release feeds and Central metadata)

| Tool | Newest on 2026-11-22 | Previous | Source |
|---|---|---|---|
| Kotlin Gradle plugin | 2.5.0-RC (2026-11-11, GitHub pre-release); no 2.5.0 | 2.4.21 (2026-10-08, stable), 2.5.0-Beta2 (2026-10-21) | [Kotlin releases](https://github.com/JetBrains/kotlin/releases), [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/maven-metadata.xml) |
| Dokka | 2.3.0 (2026-11-05) | 2.2.0 (2026-03-26) | [GitHub releases](https://github.com/Kotlin/dokka/releases), [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/dokka/dokka-gradle-plugin/maven-metadata.xml) |
| vanniktech maven publish | 0.37.0 (2026-06-21) | 0.36.0 (2026-01-18) | [releases](https://github.com/vanniktech/gradle-maven-publish-plugin/releases) |
| binary-compatibility-validator | 0.18.2 (2026-09-02) | 0.18.1 (2025-07-09) | [releases](https://github.com/Kotlin/binary-compatibility-validator/releases), [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlinx/binary-compatibility-validator/maven-metadata.xml) |

Gradle itself is at 9.9.x; the build pins 9.7.1. `kotlin-gradle-plugin`, `kotlin-metadata-jvm` and `kotlin-stdlib` each list
`2.5.0-Beta1`, `2.5.0-Beta2` and `2.5.0-RC` on Central with `<release>2.5.0-RC</release>`.

Documented compatibility:

- vanniktech 0.37.0: minimum JDK 17, Gradle 9.0.0, Kotlin Gradle plugin 2.2.0; "compatibility tested up to" JDK 26, Gradle 9.6.0
  and 9.7.0-milestone-1, Kotlin Gradle plugin 2.4.0 ([0.37.0 changelog](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md)).
  The changelog's ceiling names Kotlin 2.4.0; F9 shows its test matrix runs 2.5.0-RC. Neither names Gradle 9.7.1; both 0.36.0 and
  0.37.0 were observed to run on it.
- Dokka: states no Kotlin or Kotlin Gradle plugin minimum or maximum for 2.2 or 2.3 in its docs or release notes (searched the
  docs folder and the notes at v2.3.0). The 2.3.0 notes declare configuration-cache compatibility and add Project Isolation support;
  its integration-test matrix tops out at Kotlin Gradle plugin 2.3.21 (claim 29). Dokka analyses source with its embedded
  compiler, so the project's Kotlin plugin patch does not select it (F2).
- Gradle 9.0 and later: the minimum supported Kotlin Gradle plugin is 2.0.0 ([upgrade guide](https://docs.gradle.org/9.7.1/userguide/upgrading_major_version_9.html)).
  The Gradle-compatibility findings in this folder cover the documented range of each Kotlin line against Gradle.
- Validator 0.18.2: requires Gradle 6.1.1 and Kotlin 1.6.20 or newer; it reads class files with ASM and was observed to dump
  Java 21 class files (class-file major 65) compiled by Kotlin 2.2.0 and 2.2.21 (the major version follows the JDK release target,
  which stays 21). Its only change since 0.18.1 is "Prevent configuration crash on hosts unrecognized by Kotlin/Native"
  ([README](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/README.md),
  [0.18.2 notes](https://github.com/Kotlin/binary-compatibility-validator/releases/tag/0.18.2)). It is in maintenance mode
  ("The implementation of new features has been stopped"); the repository's last commit is the 0.18.2 release and its only open
  issues (315, 312) are about Android with AGP 9.

### F2. Dokka's Kotlin analysis: which compiler, which language version (established: Dokka and Kotlin source at tags)

- **What it embeds.** Dokka's version catalog names the compiler it analyses with: at v2.2.0 `kotlin-compiler-k2 = "2.3.20-dev-7064"`,
  at v2.3.0 `kotlin-compiler-k2 = "2.5.0-dev-3229"`; its `master` has `kotlin-compiler-k2 = "2.5.0-RC"` (pull request 4624,
  2026-11-18, unreleased) ([v2.2.0 catalog](https://github.com/Kotlin/dokka/blob/v2.2.0/gradle/libs.versions.toml),
  [v2.3.0 catalog](https://github.com/Kotlin/dokka/blob/v2.3.0/gradle/libs.versions.toml)). K1 analysis is removed in 2.3.0
  ([notes](https://github.com/Kotlin/dokka/releases/tag/v2.3.0)); K2 has been the default since 2.1.0, so on both releases the
  analysis is K2.
- **How it picks the language version.** Dokka's Gradle plugin does not read the project's Kotlin `languageVersion`,
  `apiVersion` or compiler options (the Kotlin adapter has no reference to them). A source set's `languageVersion` and `apiVersion`
  are optional strings; when `languageVersion` is unset or unknown to the embedded compiler, analysis uses that compiler's
  `LanguageVersion.LATEST_STABLE`, and `apiVersion` defaults from it
  ([KotlinAnalysis.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-subprojects/analysis-kotlin-symbols/src/main/kotlin/org/jetbrains/dokka/analysis/kotlin/symbols/plugin/KotlinAnalysis.kt),
  [DokkaSourceSetSpec.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-runners/dokka-gradle-plugin/src/main/kotlin/engine/parameters/DokkaSourceSetSpec.kt)).
  `LATEST_STABLE` is `KOTLIN_2_3` in compiler `2.3.20-dev-7064` and `KOTLIN_2_5` in `2.5.0-dev-3229` (and in 2.5.0-Beta1,
  2.5.0-Beta2 and 2.5.0-RC). So Dokka 2.2.0 analyses at language 2.3 and Dokka 2.3.0 at language 2.5, by default.
- **What it can read.** The Kotlin compiler reads metadata up to the larger of its own metadata version plus one minor and the
  language version of the reading compilation: `MetadataVersion.INSTANCE` is 2.3.0 at `2.3.20-dev-7064` and 2.5.0 at
  `2.5.0-dev-3229` and at 2.5.0-RC ([MetadataVersion.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt)).
  Dokka's JVM source sets take their analysis classpath from the compilation's `compileDependencyFiles`, so `kotlin-stdlib` 2.5.0-RC
  and every module jar or class directory compiled by the 2.5 plugin (metadata 2.5.0) are on it. **Inference:** Dokka 2.2.0's
  compiler reads up to 2.4 at language 2.3, so those classes are incompatible to it, and Dokka cannot be told to analyse at 2.5
  (`2.5` is an unknown language version to it); the consequence is expected to be unresolved `kotlin.*` and module types, which
  `failOnWarning` turns into a failure. No source states the exact message and no run was made. Dokka 2.3.0's compiler has
  the same metadata version as the classes it reads.
- **No Kotlin-version-caused warning is documented for 2.3.0.** No issue in Kotlin/dokka names Kotlin 2.5 or an incompatible-metadata
  message (searched issues for "Kotlin 2.5", "Kotlin 2.4", "incompatible version", "binary version of its metadata"; one
  open issue, 4212, concerns the Maven plugin on Kotlin 2.2). Dokka's integration matrix for 2.3.0 runs Kotlin Gradle plugin
  2.3.21 at most. Nothing establishes how 2.3.0's `2.5.0-dev-3229` compiler treats the `2.5.0-RC` stdlib beyond the equal metadata
  version (Gaps).

### F3. Dokka 2.3.0 against 2.2.0: gains, regressions and issue 4620 (common practice split; one regression fixed but unreleased)

2.3.0 adds: Project Isolation support, configuration-cache declaration, `suppressAnnotatedWith`, removal of K1 analysis, and
security updates of libraries "that ship with Dokka's published artifacts" (FreeMarker 2.3.32 to 2.3.35, jsoup 1.16.1 to 1.23.2,
Jackson 2.15.3 to 2.22.2) ([2.3.0 notes](https://github.com/Kotlin/dokka/releases/tag/v2.3.0)). Those libraries run inside the
documentation generator on the build machine; they are not on any published artifact's classpath.

2.3.0 regressions on 2026-11-22:

- **Issue 4620** (opened 2026-11-11, **closed 2026-11-20**): with `failOnWarning = true`, "Dokka 2.3.0 reports `is unresolved`
  warnings for the types of private members that a documented class inherits from a library class", for a subclass in module `app`
  (with an `api` dependency on `lib`) of a class in module `lib` whose private field's type comes from an `implementation`
  dependency of `lib`. Dokka 2.2.0 does not report them. A Dokka maintainer: "it's now being reported because we improved the
  'unresolved references' reporting to cover more issues" and the analyzer's classpath "doesn't contain those transitive
  `implementation` dependencies". The fix is pull request 4628, "Do not warn about unresolved types of private declarations (with
  transformer)", merged to `master` on 2026-11-20 together with a regression test and a jar fixture named `base-lib-4620`. **It is in no
  release:** the newest tag is v2.3.0 (2026-11-05), `master` is 13 commits ahead, and no later tag exists. Dokka's release spacing
  (2.1.0 on 2025-10-15, 2.2.0 on 2026-03-26, 2.3.0 on 2026-11-05) gives no date for the next one.
- **Issues 4618, 4621 and 4516** concern Java sources only (closed 2026-11-18 by pull requests 4624 and 4625, which update the
  analysis to 2.5.0-RC on `master`); this build is Kotlin only, so they do not apply.
- Issue 4554 (open): `java.io.Serializable` unresolved in `commonMain` of a multiplatform build; this build is JVM only.

Why 4620 matters here: the target has `bottools-core` classes that other modules extend, and the organisation's logging rule has
each module hold a kotlin-logging logger as a dependency. A public subclass in another module of a class that holds a private
instance logger field is the issue's shape if the logger library is an `implementation` dependency of the base class's module, and
`failOnWarning` turns it into a build failure. This is an inference from the issue's reproducer, not something observed in this
repository: no such class exists yet.

Prior art splits: WebTools pins Dokka 2.3.0 (and uses `failOnWarning`); MyGameTools pins 2.2.0 (and sets neither `failOnWarning`
nor `reportUndocumented`); both build on Kotlin Gradle plugin 2.2.0, where either Dokka reads the stdlib metadata (F2).

### F4. vanniktech 0.37.0 (established: changelog and source at the tag)

0.37.0's two changes are: redundant checksum files (`.asc` signature checksums, `sha256`/`sha512`) are excluded when publishing to
Maven Central, configurable through `checksums(...)` or the `mavenCentralChecksums` property; and the Maven Central deployment id is
logged after upload ([0.37.0 changelog](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md)).
Nothing in either touches `JavadocJar.Dokka`, `KotlinJvm`/`JavaLibrary`, sources jars, `signAllPublications()` or
`publishToMavenLocal`. Source at 0.37.0: `KotlinJvm(javadocJar, sourcesJar)` requires the `org.jetbrains.kotlin.jvm` plugin, builds a
publication from the `java` component and wires the jars; a `JavadocJar.Dokka` registers a task `dokkaJavadocJar` that depends on
and copies the named Dokka task ([Platform.kt](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/Platform.kt),
[JavadocJar.kt](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/tasks/JavadocJar.kt)).
Observed on both versions: the same task names, the same published files; `signMavenPublication` is `SKIPPED` for a `-SNAPSHOT`
version, so `publishToMavenLocal` needs no key. The build-logic classpath resolved the Kotlin Gradle plugin to the declared
version (2.2.21 in the reproduction), not to vanniktech's tested 2.4.0, on both the compile and the runtime classpath (observed with
`dependencyInsight`).

### F5. Dokka V2 mode (established: Dokka source and migration guide at 2.3.0)

- `PluginFeaturesService` reads `org.jetbrains.dokka.experimental.gradle.pluginMode` with values `V1Enabled`,
  `V2EnabledWithHelpers` and `V2Enabled`; the default is `V2EnabledWithHelpers`. The helpers register disabled V1 task stand-ins so
  old scripts compile; `V2Enabled` registers none. The migration guide's finished state is `V2Enabled`. When Gradle generates the
  accessors of a precompiled script plugin it runs in a temporary project with no Gradle properties; Dokka then walks up the
  directories to find a `gradle.properties` and reads the mode from it, so a root `gradle.properties` also reaches the convention
  plugin's `dokka {}` accessor. Observed: with `V2Enabled` set, `dokkaGenerate`, `dokkaGenerateHtml`, `dokkaGenerateModuleHtml` and
  `dokkaGeneratePublicationHtml` exist and the build passes with the configuration cache.
- Root aggregation: `dependencies { dokka(project(":module")) }` in the root; output at `build/dokka/html` (the documented default
  of `outputDirectory`); a module's own `dokkaGeneratePublicationHtml` writes `<module>/build/dokka/html`. Observed.
- The Kotlin plugins on the root with `apply false`: Dokka 2.3.0's own warning text says "Apply the Dokka and Kotlin plugins to the
  root project using the `plugins {}` DSL. (If the root project does not need the plugins, use 'apply false')". Observed without it:
  every module logs "Dokka could not load KotlinBasePlugin", the aggregate contains no module page, and the build still succeeds
  under `failOnWarning`.
- `failOnWarning` is a property of the publication (`dokkaPublications.configureEach { failOnWarning.set(true) }`) and
  `reportUndocumented` of the source set (`dokkaSourceSets.configureEach { reportUndocumented.set(true) }`); the docs say each "works
  well with" the other. Observed: set in the convention plugin they reach every module, and an undocumented public class fails the
  module's `dokkaGeneratePublicationHtml`.
- Language and API version on the source set: `dokkaSourceSets.configureEach { languageVersion.set("2.5"); apiVersion.set("2.5") }`
  are documented source-set options ([options page at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/docs/topics/dokka-gradle-configuration-options.md)).
- Theme per module: `pluginsConfiguration.html { customStyleSheets.from(...); customAssets.from(...); footerMessage.set(...) }`
  with the paths resolved from `isolated.rootProject.projectDirectory` (as WebTools and MyGameTools do). Observed: a stylesheet at
  the root resolved from a module's convention plugin builds; a missing theme file fails the task (WebTools' integration test asserts
  `NoSuchFileException`).
- Suppressing the umbrella's source sets: `dokka { dokkaSourceSets.configureEach { suppress.set(true) } }` is accepted. With no
  source it changes nothing, since a module with no source already produces no pages.

### F6. Gates on a module with no main source (observed; two items backed by source)

| Tool | Module with no source |
|---|---|
| Dokka | `dokkaGeneratePublicationHtml` runs and succeeds with `failOnWarning`; no `w:` line; no pages; `<module>/build/dokka` is empty; the root aggregate holds an empty folder for it and no page. A test source alone changes nothing. |
| Validator | `apiBuild` runs (it throws only when neither a classes directory nor a jar is set); `apiDump` writes a zero-byte file; `apiCheck` fails when no dump file exists and passes against a zero-byte one. |
| vanniktech | publishes `.jar`, `-sources.jar`, `-javadoc.jar`, `.pom` and `.module`; each jar holds only `META-INF/MANIFEST.MF`. With `JavadocJar.Dokka`, an empty module's javadoc jar equals what `JavadocJar.Empty()` registers (a `JavadocJar` task with no inputs). |
| `explicitApi()`, toolchain | `compileKotlin` and `compileJava` are `NO-SOURCE`; nothing is checked or provisioned for them. |
| Gradle 9 `test` | A test source with no discoverable test fails `test`: "There are test sources present and no filters are applied, but the test task did not discover any tests to execute." |

Validator source for the first two rows: `KotlinApiBuildTask` writes `filteredSignatures.dump(writer)` for whatever classes it
found, and `KotlinApiCompareTask` errors "Expected file with API declarations '...' does not exist" when the committed dump is
missing ([source at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/KotlinApiCompareTask.kt)).
Where the dump goes: `<module directory>/api/<project name>.api`.

An umbrella that aggregates (`dokka(project(":bottools-core"))` and the others in the umbrella's own `dependencies`, as MyGameTools'
umbrella does) gets a javadoc jar holding the modules' pages (observed: the modules with source appear; one with no source adds
nothing). That mechanism, and its guard, belong to the umbrella question; it is noted here only because it shows the umbrella's
javadoc jar is manifest-only without it.

### F7. How Dokka joins `check` (observed; common practice in the organisation's builds)

- The validator joins `check` itself: for a Kotlin/JVM module `configureCheckTasks` runs
  `project.tasks.named("check").configure { it.dependsOn(apiCheck) }` ([source at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/BinaryCompatibilityValidatorPlugin.kt)).
- Dokka registers no `check` dependency. Neither WebTools' nor MyGameTools' convention plugins joins a Dokka task to `check`: the
  organisation's standard runs `./gradlew dokkaGeneratePublicationHtml` in a CI job, and a module's javadoc jar runs it at
  publication. The one exception read is MyGameTools' umbrella, whose `verifyUmbrellaJavadocJar` in `check` takes the javadoc jar
  as an input and so runs Dokka. This build must fail `./gradlew build` on an undocumented declaration, so it adds the dependency
  itself.
- Observed dry run with the line in the convention plugin and on the root: `build` schedules
  `:<module>:dokkaGeneratePublicationHtml` for each module and then the root's `:dokkaGeneratePublicationHtml`, after each module's
  `:<module>:dokkaGenerateModuleHtml`.

### F8. Which observations depend on the Kotlin version (inference from sources; nothing here was run on Kotlin 2.5)

The reproduction builds used Kotlin Gradle plugin 2.2.0 and 2.2.21 with Dokka 2.2.0 and 2.3.0. Reading each tool's source:

| Observed behaviour | Depends on the Kotlin version? | Basis |
|---|---|---|
| Dokka silent on a module with no source; empty aggregate without `apply false`; theme, `failOnWarning`, `reportUndocumented` wiring; `check` dependency; V2 mode | No. These act on Gradle configuration and source roots, not on Kotlin metadata. (The empty-module silence was not traced to a line of Dokka source.) | F5, F6 |
| Dokka reading `kotlin-stdlib` and module jars without a warning | **Yes.** It held when stdlib metadata (2.2.x) was within the embedded compiler's range. With stdlib 2.5.0-RC (metadata 2.5.0), Dokka 2.2.0 (reads up to 2.4) falls out of range and Dokka 2.3.0 (reads 2.5.0) is in range. | F2 |
| `apiDump` zero-byte file; `apiCheck` failing with no dump | No. With no class there is no metadata to read. | `KotlinApiBuildTask`, `KotlinApiCompareTask` |
| Marker declarations dropped from the dump; marker annotation class kept | Not on the filter itself, which reads annotations from the ASM class node (visible and invisible). Class and member visibility are read from Kotlin metadata, with a `kotlin-metadata-jvm` of the project's plugin version (F9). | `KotlinSignaturesLoading.kt`, `BinaryCompatibilityValidatorPlugin.kt` |
| Java 21 class files (major 65) dumped by ASM | No. The class-file major follows the JDK release target, which stays 21. | F1 |
| vanniktech's jars, POM, module file, `signMavenPublication` `SKIPPED` at `-SNAPSHOT` | No. It uses the `java` component and Gradle's signing rule; Kotlin enters only through a version check (F9). | F4, F9 |
| `kotlin-stdlib` `requires` the plugin's version (observed `2.2.21` with plugin 2.2.21) | Yes, by construction: it is the plugin version, here `2.5.0-RC`. | F10 |
| Gradle 9 failing `test` with sources and no test | No. | F6 |

### F9. The validator and the Kotlin Gradle plugin's ABI validation on 2.5 (established for source; no public run found for the validator)

**Validator 0.18.2.**
- It builds against Kotlin 1.9.22 with `compileOnly` Kotlin libraries (`kotlin-metadata-jvm` 2.0.0 at compile time). At run time
  `prepareJvmValidationClasspath` adds `org.jetbrains.kotlin:kotlin-metadata-jvm:<version>` where `<version>` is the project's Kotlin
  plugin version, read from the plugin's own `project.properties` resource, and `asm` / `asm-tree` 9.6
  ([BinaryCompatibilityValidatorPlugin.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/BinaryCompatibilityValidatorPlugin.kt)).
  The Kotlin Gradle plugin at 2.5.0-RC still ships `project.properties` with `project.version=${projectVersion}`
  ([resource](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/resources/project.properties)),
  and `kotlin-metadata-jvm:2.5.0-RC` is on Maven Central. So on this build the metadata reader is 2.5.0-RC, the same version
  as the classes it reads.
- It reads each class's metadata with `KotlinClassMetadata.readLenient`
  ([KotlinMetadataVisibilities.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/api/KotlinMetadataVisibilities.kt)).
  `kotlin-metadata-jvm`'s strict reader accepts metadata up to its own version plus one minor; the lenient reader "makes best effort to
  read unsupported metadata versions". With the reader at 2.5.0-RC and metadata at 2.5.0 neither mode is out of range.
- `nonPublicMarkers` is applied by `filterOutAnnotated`, which reads `visibleAnnotations` and `invisibleAnnotations`; it does
  not depend on Kotlin metadata (F8).
- Two of the Kotlin Gradle plugin types it links on the JVM path, `KotlinTarget` and `KotlinPlatformType`, still exist at
  2.5.0-RC (the other JVM-path types were not checked). Its Native and JS references are in code paths a JVM-only build does not run (an inference: no run was made).
- No public build on Kotlin 2.5.0-RC that applies the validator was found (the 2.5.0-RC builds listed in F11 either do not use it or use the
  Kotlin Gradle plugin's own validation). The validator's open issues name Android only.

**Kotlin Gradle plugin's own ABI validation, as it stands at 2.5.0-RC.**
- **Status: experimental.** The interface is annotated `@ExperimentalAbiValidation` and its KDoc says "Note that this DSL is
  experimental, and it will likely change in future versions until it is stable" ([AbiValidationExtension.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/abi/AbiValidationExtension.kt));
  the documentation page carries the experimental label and was last changed on 2026-04-28 for Kotlin 2.4.0
  ([page source](https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/gradle/gradle-binary-compatibility-validation.md));
  the 2.5.0-RC release notes name no change to it. When it first shipped (2.2.0) the notes said "we don't recommend using it in production yet" and that the
  validator "continues to be maintained during this experimental phase"; the validator's README says its new features are
  stopped "in favor of adding them to the experimental binary compatibility validation in the Kotlin Gradle plugin".
- **DSL.** `kotlin { @OptIn(ExperimentalAbiValidation::class) abiValidation { filters { excluded { annotatedWith.add("<fqn>") } } } }`
  (`exclude {}`/`include {}` and `excluded {}`/`included {}` both exist); `annotatedWith` "must" name an annotation with `BINARY` or
  `RUNTIME` retention, which `@ExperimentalBotToolsApi` has. Properties `referenceDumpDir`, `checkTaskProvider`, `updateTaskProvider`.
  The `enabled` property (2.2.0) and the `legacyDump {}` block now fail with an error if used.
- **Tasks and location.** `checkKotlinAbi` and `updateKotlinAbi`; `check` runs `checkKotlinAbi` once `abiValidation()` has been
  called; default reference directory `api`, JVM file `<project name>.api`
  ([AbiValidationPaths.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/abi/internal/AbiValidationPaths.kt)).
- **Same engine.** Its JVM dump code (`abi-tools`) has the same file names as the validator's (`AsmMetadataLoading`,
  `KotlinMetadataVisibilities`, `KotlinSignaturesLoading`), reads metadata with `readLenient`, and uses the in-repository
  `kotlin-metadata-jvm`, so it always matches the compiler's metadata version.
- **Module with no source.** By source: the dump task creates its output directory and writes `<project>.api` for the class files
  it finds, empty set included; the check task fails with "Expected file with ABI declarations '...' does not exist" for an actual
  dump that has no reference file, and compares the text otherwise
  ([KotlinAbiDumpTaskImpl.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/tasks/abi/KotlinAbiDumpTaskImpl.kt),
  [KotlinAbiCheckTaskImpl.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/tasks/abi/KotlinAbiCheckTaskImpl.kt)).
  That is the validator's flow; whether the dump of an empty class set is zero bytes was not observed.
- **Dump format.** Same directory, file name and line format. ktlint's migration from the validator (pull request 3344, merged
  2026-08-01) changed its `.api` files by only a few removed lines each: `public static final field ... Ljava/lang/String;` lines
  and `public synthetic fun <init> (... Lkotlin/jvm/internal/DefaultConstructorMarker;)V` lines. So the formats are close but not
  byte-identical on the same code; a project switching re-dumps once.

**vanniktech 0.37.0.** On the `KotlinJvm` path the only Kotlin Gradle plugin API it uses is `KotlinBasePlugin.pluginVersion` (a
version gate through `KotlinToolingVersion`, 2.2.0 minimum), which exists unchanged at 2.5.0-RC; `KotlinMultiplatformExtension` and
`KotlinAndroidTarget` appear only in the multiplatform path
([ProjectExtensions.kt](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/ProjectExtensions.kt)).
Its integration-test matrix (`KgpVersion.VERSIONS`) lists minimum, stable, RC, beta and alpha Kotlin versions; the RC, beta and
alpha entries moved to 2.5.0-RC on 2026-11-11 (pull request 1472) and the `Build` workflow on `main` is green on 2026-11-22.
Nothing under `plugin/src/main` changed between 0.37.0 and `main`. Open issues (1466, 1416, 1369) are unrelated to Kotlin 2.5.

### F10. The `kotlin-stdlib` requirement of each published module (established: Kotlin documentation; one observation)

The Kotlin Gradle plugin adds `kotlin-stdlib` to each source set at "the same version as the version of the Kotlin Gradle plugin",
and does not override a declared one. Language and API version do not enter that choice. So each published module's POM and module
metadata require `kotlin-stdlib` `2.5.0-RC` now and `2.5.0` after the move (the reproduction showed `requires 2.2.21` with
plugin 2.2.21). In Gradle's ordering `2.5.0-RC` is below `2.5.0` ("A version with an extra non-numeric part is lower", `rc` ordered
below `release`), so a consumer resolving to 2.5.0 is not downgraded by the RC floor. The compiler does not mark binaries
produced at language 2.5 by 2.5.0-RC as pre-release: `IS_PRE_RELEASE` is `false` at 2.5.0-Beta1, Beta2 and RC, and it only marks
binaries when it is true or when the language version is newer than `LATEST_STABLE` (2.5).

### F11. Public builds on Kotlin 2.5.0-RC today (common practice; read 2026-11-22)

| Build | Versions | What its CI shows |
|---|---|---|
| ktlint (`ktlint/ktlint`) | Kotlin 2.5.0-RC, Dokka 2.3.0 (`org.jetbrains.dokka-javadoc`), vanniktech 0.37.0, KGP `abiValidation()` | Pull request 3436 "Update to Kotlin 2.5.0" merged 2026-11-22 with every `build`, `tests` and native-image check green; the build runs `ktlintCheck detekt build` (which includes `checkKotlinAbi`). It compiles at language and API version 2.2, not 2.5, and sets no `failOnWarning`. |
| FlowMVI (`respawn-llc/FlowMVI`) | Kotlin 2.5.0-RC, Dokka 2.3.0, vanniktech 0.37.0 | Multiplatform; `CI` and `docs` workflows green on 2026-11-22; the docs workflow runs `./gradlew dokkaGenerate`. No `failOnWarning`. |
| Kilua (`rjaros/kilua`) | Kotlin 2.5.0-RC, Dokka 2.3.0 | Dependency refresh 2026-11-14; CI not read. |
| vanniktech's own tests | Kotlin Gradle plugin 2.5.0-RC in its integration matrix | green on `main` 2026-11-22 (F9). |

No public build found combines Kotlin 2.5.0-RC, Dokka 2.3.0 and `failOnWarning`, nor Kotlin 2.5.0-RC and the validator.

## 4. How comparable projects do it

- **WebTools** (`build-logic/src/main/kotlin/webtools.published-library.gradle.kts`, `webtools.kotlin-jvm-library.gradle.kts`, root
  `build.gradle.kts`, `settings.gradle.kts`): the published-library plugin applies Dokka and vanniktech, `signAllPublications()`, and
  sets `dokka { dokkaPublications.configureEach { failOnWarning.set(true) }; dokkaSourceSets.configureEach { reportUndocumented.set(true) } }`
  plus the per-module theme from `isolated.rootProject.projectDirectory`. The JVM plugin sets
  `configure(KotlinJvm(javadocJar = JavadocJar.Dokka(...), sourcesJar = SourcesJar.Sources()))`. The root applies
  `id("org.jetbrains.kotlin.jvm") apply false` beside `id("org.jetbrains.dokka")`, aggregates with `dokka(project(...))`, and sets
  `failOnWarning` and the theme again. Plugin versions live twice, in `settings.gradle.kts` `pluginManagement.plugins` and in
  build-logic's marker dependencies, with a gating test that they agree. Versions: Kotlin 2.2.0, Dokka 2.3.0, vanniktech 0.36.0,
  validator 0.18.2. It sets no `pluginMode` property. Its validator is applied only in the multiplatform convention plugin.
  Tests: `DokkaConventionIntegrationTest` (TestKit) asserts an undocumented public function and a broken KDoc link each fail
  `dokkaGeneratePublicationHtml`, and a missing theme file fails it with `NoSuchFileException`;
  `ApiValidationIntegrationTest` asserts `apiCheck` fails before a dump exists ("Expected file with API declarations"), `apiDump`
  writes `api/<name>.api`, `apiCheck` then passes and `check` depends on `apiCheck`.
- **MyGameTools** (`build-logic/.../gametools.published-library.gradle.kts`, root `build.gradle.kts`, `gradle.properties`,
  `gametools/build.gradle.kts`): `JavaLibrary(javadocJar = JavadocJar.Dokka("dokkaGeneratePublicationHtml"), sourcesJar = true)`;
  `gradle.properties` sets `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled` and its `.noWarn=true`; Kotlin plugins
  `apply false` on the root; the umbrella `gametools` has no source, aggregates its modules with `dokka(project(...))`, suppresses its
  own source sets, and guards its sources and javadoc jars with `verifyUmbrella*Jar` tasks in `check`. Versions: Kotlin 2.2.0,
  Dokka 2.2.0, vanniktech 0.36.0. It sets neither `failOnWarning` nor `reportUndocumented`, and no validator.
- **GeneralTools** (`build.gradle.kts`): `kotlin("jvm") version "2.2.0"` and `id("com.vanniktech.maven.publish") version "0.36.0"`
  with `publishToMavenCentral()`; no Dokka, validator or convention plugin. It has no 2.5 evidence.
- **ktlint** (`build-logic/src/main/kotlin/KotlinCommonPlugin.kt` on `master`): `explicitApi()`, then
  `@OptIn(ExperimentalAbiValidation::class) abiValidation()` for every published project, `compilerOptions { apiVersion.set(KotlinVersion.KOTLIN_2_2);
  languageVersion.set(KotlinVersion.KOTLIN_2_2) }` and `-Xjdk-release` from one catalog entry, on Kotlin Gradle plugin 2.5.0-RC.
  The closest public build to this one's ABI setup, with the difference that it compiles at 2.2.
- **Dokka's own guidance** (migration guide and troubleshooting page at 2.3.0): aggregate with `dokka(project(":sub"))` and finish
  on `V2Enabled`; per-subproject settings (its example is the generator's heap) are advised in "a convention plugin applied to all
  subprojects".

## 5. Pitfalls and regrets

- **A Dokka that embeds an older compiler than the stdlib it reads.** Dokka's language version is its embedded compiler's, never
  the project's, and a compiler reads metadata only one minor beyond its own. A build on a newer Kotlin than Dokka's embedded
  compiler by two or more minors is outside that rule; Dokka 2.2.0 (compiler 2.3) on Kotlin 2.5 is such a pair. The Dokka pin has to
  follow the Kotlin line, not lag it.
- **Language version drift in Dokka.** With `languageVersion` unset, Dokka analyses at its compiler's latest stable version. A later
  Dokka that embeds compiler 2.6 would analyse a language 2.5 source tree at 2.6. Setting it explicitly costs one line.
- **A silently empty site.** Without the Kotlin plugin on the root's classpath the aggregate renders no module page and the build
  passes, even under `failOnWarning` (the warning is logged, not counted). WebTools' root comment records the same failure, and that
  naming a source set the modules lack turns it into a configuration error. A GitHub Pages job that only fails when
  `build/dokka/html` is missing does not catch it: `index.html` exists. A guard has to look for a page of a module that has
  source (for example the `bottools-core` package page).
- **Two version homes.** The root's `pluginManagement.plugins` versions and build-logic's marker dependencies must name the same
  Dokka and Kotlin versions, or the root and the modules load different plugin copies (WebTools guards this with a test). With a
  pre-release plugin both homes change again at the move to 2.5.0.
- **Dokka 2.3.0 under `failOnWarning`.** Issue 4620 above (fixed on `master`, not released); 2.3.0 also reports more unresolved
  references than 2.2.0 in general (a reply on that issue), so the first generation can fail on existing KDoc.
- **A pre-release floor on a library's dependency.** Every published module requires `kotlin-stdlib` 2.5.0-RC until the build moves
  to 2.5.0. A snapshot published in that window carries the RC requirement.
- **`test` with test sources and no test.** Gradle 9 fails the task ("This behavior can be disabled by setting the
  `failOnNoDiscoveredTests` property to `false`"). A module whose only test source is a placeholder with no test class breaks
  `./gradlew build`; a real, discovered test, or no test source, does not.
- **Zero-byte dump files.** `apiCheck` fails on a module with no committed dump, so the build fails at first `build` until `apiDump`
  has been run once for every module including the umbrella. A zero-byte file is a normal committed file; the first declaration added
  to such a module fails `apiCheck` until `apiDump` is run, which is the intended review point.
- **Javadoc jar of a module with no source is manifest-only.** It equals vanniktech's placeholder (`JavadocJar.Empty()`); whether
  Maven Central's validation accepts a release of such a jar was not checked (see Gaps). In this unit nothing is released.
- **Dokka's `suppress` on the umbrella is inert while it has no source** and does not stop the umbrella's own aggregation; it only
  matters if the umbrella later gains source.
- **Choosing the experimental ABI validation for a published library.** Its DSL is documented as likely to change; ktlint accepted
  that. The validator is frozen but not experimental.

## 6. Recommendation for this repository

1. **Versions.** Kotlin Gradle plugin 2.5.0-RC (2.5.0 on release); **Dokka 2.3.0**; vanniktech 0.37.0; validator 0.18.2, each stated
   once as a marker dependency in `build-logic/build.gradle.kts` and once in the root `settings.gradle.kts`
   `pluginManagement.plugins` for the two ids the root applies (Kotlin JVM and Dokka), with a check that the pairs agree. Dokka 2.3.0
   is chosen because it is the only released Dokka whose embedded compiler (2.5.0-dev-3229) matches the 2.5.0 metadata of the
   stdlib and the modules and analyses at language 2.5; 2.2.0 is expected not to read them (F2) and cannot be set to language 2.5.
   The cost is issue 4620, which cannot fire while only `bottools-core` has source. vanniktech 0.37.0 and validator 0.18.2 stay.
2. **Root `gradle.properties`:** `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled`.
3. **`bottools.published-library`:** apply Dokka and vanniktech; `group`, `version`; in `dokka {}` the theme (paths from
   `isolated.rootProject.projectDirectory`), `dokkaPublications.configureEach { failOnWarning.set(true) }`,
   `dokkaSourceSets.configureEach { reportUndocumented.set(true); languageVersion.set(<the build's language version string>);
   apiVersion.set(<the same>) }` with the string taken from the one Kotlin constant the compiler options use
   (`KotlinVersion.KOTLIN_2_5`), not typed twice; and `tasks.named("check") { dependsOn("dokkaGeneratePublicationHtml") }`. The
   Kotlin-library convention sets `explicitApi()`, applies the validator and sets
   `apiValidation { nonPublicMarkers.add("<package>.ExperimentalBotToolsApi") }`; the platform line is
   `configure(KotlinJvm(javadocJar = JavadocJar.Dokka("dokkaGeneratePublicationHtml"), sourcesJar = SourcesJar.Sources()))`.
4. **Root:** `id("org.jetbrains.kotlin.jvm") apply false`, `id("org.jetbrains.dokka")`, `dokka(project(":<module>"))` for the five
   feature modules (the umbrella aggregates through its own dependency, or is listed too, per the umbrella question),
   `failOnWarning`, the theme, and the same `check` dependency. Add a gate that asserts the aggregate holds a module page.
5. **Empty modules:** no placeholder declaration. Run `apiDump` once and commit `api/<module>.api` for all six modules (zero-byte for
   `bottools-data-sqlite`, `bottools-http`, `bottools-stats`, `bottools-plugins` and `bottools`; the two annotation classes for
   `bottools-core`). A feature module's test source must contain a discoverable test, or be left out until it does.
6. **Issue 4620 guard.** When the first feature-module class extends a `bottools-core` class that holds a private logger field,
   run the real `dokkaGeneratePublicationHtml` with `failOnWarning` on. If 4620 fires and no Dokka release carrying pull request 4628
   exists, the options are: declare the logging library as an `api` dependency of the base class's module (the maintainer says the
   missing types are the transitive `implementation` dependencies; this is an inference, not a documented workaround, and it widens
   the module's API surface), or hold the subclass in the same module as its base class. Dropping `failOnWarning` is outside the
   requirements.
7. **If the validator fails on the first real build** (nothing found says it will), the fallback is the Kotlin Gradle plugin's own
   ABI validation: `kotlin { @OptIn(ExperimentalAbiValidation::class) abiValidation { filters { excluded { annotatedWith.add("<package>.ExperimentalBotToolsApi") } } } }`,
   tasks `checkKotlinAbi` / `updateKotlinAbi`, the same `api/<module>.api` files re-dumped once. It costs an experimental DSL that
   is documented as subject to change; it saves a frozen third-party plugin. It is not the first choice because the validator's
   source reads 2.5 metadata with a matching reader and because the Kotlin plugin's feature is still experimental at 2.5.0-RC.
8. **Rejected: Dokka 2.2.0** (expected not to read 2.5.0 metadata, no way to set language 2.5), **rejected: a stub class per empty
   module** (it would put a throwaway declaration into the dump and the javadoc), and **rejected: leaving the validator off the
   empty modules** (the zero-byte dump is what makes the first real declaration reviewable).

## 7. Load-bearing claims

1. Dokka 2.3.0 is newest, released 2026-11-05, and its notes describe it. Source: [Dokka releases](https://github.com/Kotlin/dokka/releases/tag/v2.3.0)
   (read 2026-11-22). Quote: "Support Project Isolation in DGPv2 (#4497)" and "Update `com.gradle.publish:plugin-publish-plugin` and declare Gradle Configuration Cache compatibility (#4484)". The release feed lists v2.3.0 (2026-11-05) above v2.3.0-Beta and v2.2.0; Central metadata ends `<version>2.3.0</version>`.
2. Dokka 2.3.0's security updates are to libraries of the generator. [2.3.0 notes](https://github.com/Kotlin/dokka/releases/tag/v2.3.0).
   Quote: "Updated dependencies that ship with Dokka's published artifacts, resolving vulnerabilities:".
3. Dokka issue 4620 is closed on 2026-11-20 by a fix on `master` that no release contains. [Issue](https://github.com/Kotlin/dokka/issues/4620) and [pull request 4628](https://github.com/Kotlin/dokka/pull/4628) (read 2026-11-22; merged 2026-11-20T14:38:37Z). Quote (issue): "Dokka 2.3.0 reports `is unresolved` warnings for the types of private members that a documented class inherits from a library class. Dokka doesn't document these members, so it must not report their types. With `failOnWarning = true`, the build fails." and "Dokka 2.2.0 doesn't report them." Quote (pull request): title "Do not warn about unresolved types of private declarations (with transformer)", body "fixes https://github.com/Kotlin/dokka/issues/4620". The newest release tag is v2.3.0 ([releases](https://github.com/Kotlin/dokka/releases)), and `master` is 13 commits ahead of it ([compare v2.3.0...master](https://github.com/Kotlin/dokka/compare/v2.3.0...master)).
4. Dokka's plugin-mode default and values in 2.3.0: [PluginFeaturesService.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-runners/dokka-gradle-plugin/src/main/kotlin/internal/PluginFeaturesService.kt).
   Quote: "val Default: PluginMode = V2EnabledWithHelpers" and the values `V1Enabled,`, `V2EnabledWithHelpers,`, `V2Enabled` of the `when (pluginMode)` that decides `v2PluginEnabled`.
5. The finished state of a migration is `V2Enabled`: [dokka-migration.md at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/docs/topics/dokka-migration.md).
   Quote: "After successful migration, set the following opt-in flag without helpers in the project's `gradle.properties` file:" followed by "org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled".
6. Dokka finds `gradle.properties` while Gradle generates precompiled-plugin accessors: PluginFeaturesService.kt (same link as 4).
   Quote: "Because Gradle is generating accessors, it won't give us access to Gradle properties" and "defined for the main project. So, we must discover `gradle.properties` ourselves."
7. The root needs the Kotlin plugin on its classpath: [KotlinAdapter.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-runners/dokka-gradle-plugin/src/main/kotlin/adapters/KotlinAdapter.kt).
   Quote: "1. Apply the Dokka and Kotlin plugins to the root project using the `plugins {}` DSL." and "(If the root project does not need the plugins, use 'apply false')".
8. `failOnWarning` and `reportUndocumented` are documented as a pair: [dokka-gradle-configuration-options.md at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/docs/topics/dokka-gradle-configuration-options.md).
   Quote: "Whether to emit warnings about visible undocumented declarations, that is declarations without KDocs after they have been filtered by <code>documentedVisibilities</code> and other filters." and "This setting works well with <code>failOnWarning</code>." and "Default: <code>build/dokka/html</code>".
9. vanniktech 0.37.0 changes: [CHANGELOG at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md) (2026-06-21).
   Quote: "When publishing to Maven Central, redundant checksum files are now excluded by default" and "Maven Central deployment id is being logged after upload."
10. vanniktech 0.37.0 supported range: same file. Quote: "#### Minimum supported versions", "- Kotlin Gradle Plugin 2.2.0", "- Gradle 9.6.0" and "- Gradle 9.7.0-milestone-1".
11. vanniktech 0.36.0 removed Dokka V1 and defaults `configure(...)` without `javadocJar` to an empty jar: [0.36.0 notes](https://github.com/vanniktech/gradle-maven-publish-plugin/releases/tag/0.36.0).
    Quote: "Removed support for Dokka v1, it's now required to use Dokka in v2 mode." and "the plugin now defaults to publishing an empty javadoc jar." (read 2026-11-18; not Kotlin-version dependent).
12. `KotlinJvm` configuration and the Dokka javadoc jar task: [Platform.kt at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/Platform.kt)
    and [JavadocJar.kt at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/tasks/JavadocJar.kt).
    Quote: "Calling configure(KotlinJvm(...)) requires the org.jetbrains.kotlin.jvm plugin to be applied" and "tasks.register(prefixedTaskName(\"dokkaJavadocJar\", prefix), JavadocJar::class.java)".
13. Validator 0.18.2 is newest and in maintenance mode: [README at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/README.md) and [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlinx/binary-compatibility-validator/maven-metadata.xml).
    Quote: "This plugin is in maintenance mode." and "The implementation of new features has been stopped in favor of adding them to the [experimental binary compatibility validation in the Kotlin Gradle plugin]"; metadata `<version>0.18.2</version>` last, `<lastUpdated>20260902154228</lastUpdated>`. The repository's issue list holds two open issues, 315 and 312, both about Android.
14. Validator joins `check`: [BinaryCompatibilityValidatorPlugin.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/BinaryCompatibilityValidatorPlugin.kt).
    Quote: "null -> project.tasks.named(\"check\").configure { it.dependsOn(apiCheck) }" and "allprojects {".
15. A missing dump fails `apiCheck`: [KotlinApiCompareTask.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/KotlinApiCompareTask.kt).
    Quote: "Expected file with API declarations '${projectApiFile.relativeTo(rootDir)}' does not exist."
16. The dump is built from the classes found, empty list included, and drops marked declarations: [KotlinApiBuildTask.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/KotlinApiBuildTask.kt).
    Quote: ".filterOutAnnotated(nonPublicMarkers.map(::replaceDots).toSet())" and "filteredSignatures.dump(writer)".
17. Both visible and invisible annotations are read: [KotlinSignaturesLoading.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/api/KotlinSignaturesLoading.kt).
    Quote: "visibleAnnotations.orEmpty() + invisibleAnnotations.orEmpty()".
18. Gradle 9 fails `test` with sources and no discovered test: [upgrading to Gradle 9.0.0](https://docs.gradle.org/9.7.1/userguide/upgrading_major_version_9.html) (read 2026-11-22).
    Quote: "When test sources are present and no filters are applied, the `test` task will now fail with an error" and "This behavior can be disabled by setting the `failOnNoDiscoveredTests` property to `false`".
19. Gradle 9 minimum Kotlin Gradle plugin: same page. Quote: "Starting with Gradle 9.0.0, the minimum supported Kotlin Gradle plugin version is 2.0.0."
20. Does not apply: the build's plugin is 2.5.0-RC, not the 2.2.x line. Replaced by claim 22 (the 2.5.x line on Central).
21. WebTools' Dokka and validator tests (prior art behaviour the recommendation copies): [DokkaConventionIntegrationTest.kt](https://github.com/SpartanLaboratories/WebTools/blob/master/build-logic/src/test/kotlin/com/spartanlabs/testing/integration/webtools/buildlogic/DokkaConventionIntegrationTest.kt)
    and [ApiValidationIntegrationTest.kt](https://github.com/SpartanLaboratories/WebTools/blob/master/build-logic/src/test/kotlin/com/spartanlabs/testing/integration/webtools/buildlogic/ApiValidationIntegrationTest.kt) (read 2026-11-22).
    Quote: "an undocumented public function fails the task" and "apiCheck fails before any dump exists".
22. Kotlin 2.5.0-RC is the newest 2.5 release, a pre-release published 2026-11-11, with no 2.5.0. [Kotlin releases](https://github.com/JetBrains/kotlin/releases/tag/v2.5.0-RC) (GitHub release `v2.5.0-RC`, `prerelease: true`, `published_at` 2026-11-11T10:19:34Z; newer tags: none; the list shows v2.5.0-Beta2 (2026-10-21), v2.4.21 stable (2026-10-08)) and [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/maven-metadata.xml). Quote: `<release>2.5.0-RC</release>` and `<version>2.5.0-Beta2</version>` `<version>2.5.0-RC</version>`; the same for `kotlin-metadata-jvm` ([metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-metadata-jvm/maven-metadata.xml)) and `kotlin-stdlib`.
23. Dokka embeds a Kotlin compiler for analysis: v2.2.0 [catalog](https://github.com/Kotlin/dokka/blob/v2.2.0/gradle/libs.versions.toml) and v2.3.0 [catalog](https://github.com/Kotlin/dokka/blob/v2.3.0/gradle/libs.versions.toml). Quote: `kotlin-compiler-k2 = "2.3.20-dev-7064"` (v2.2.0) and `kotlin-compiler-k2 = "2.5.0-dev-3229"` (v2.3.0); `master` ([catalog](https://github.com/Kotlin/dokka/blob/master/gradle/libs.versions.toml)): `kotlin-compiler-k2 = "2.5.0-RC"`. K2 is the default analysis and K1 is gone: [2.2.0 notes](https://github.com/Kotlin/dokka/releases/tag/v2.2.0) "Starting from [Dokka 2.1.0](https://github.com/Kotlin/dokka/releases/tag/v2.1.0), the K2 analysis is enabled by default." and [2.3.0 notes](https://github.com/Kotlin/dokka/releases/tag/v2.3.0) "Remove K1 analysis (#4532)".
24. Dokka picks the language version from its embedded compiler, not from the project: [KotlinAnalysis.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-subprojects/analysis-kotlin-symbols/src/main/kotlin/org/jetbrains/dokka/analysis/kotlin/symbols/plugin/KotlinAnalysis.kt) and [options page at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/docs/topics/dokka-gradle-configuration-options.md). Quote: "val languageVersion = LanguageVersion.fromVersionString(languageVersionString)" / "?: LanguageVersion.LATEST_STABLE" and "By default, the latest language version available to Dokka's embedded compiler is used." and (apiVersion) "By default, it is deduced from <code>languageVersion</code>."
25. The embedded compilers' newest stable language version: [LanguageVersionSettings.kt at build-2.3.20-dev-7064](https://github.com/JetBrains/kotlin/blob/build-2.3.20-dev-7064/compiler/util/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt) and [at build-2.5.0-dev-3229](https://github.com/JetBrains/kotlin/blob/build-2.5.0-dev-3229/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt) and [at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt). Quote: `val LATEST_STABLE = KOTLIN_2_3` (dev-7064) and `val LATEST_STABLE = KOTLIN_2_5` (dev-3229 and 2.5.0-RC).
26. A compiler reads metadata up to its own version plus one minor, and the embedded compilers' versions: [MetadataVersion.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt). Quote: "Compiler of deployVersion X (INSTANCE) with LV Y (metadataVersionFromLanguageVersion)" / "can read metadata with version <= max(X+1, Y)" and `val INSTANCE = MetadataVersion(2, 5, 0)`; the same file at `build-2.3.20-dev-7064` has `val INSTANCE = MetadataVersion(2, 3, 0)` and at `build-2.5.0-dev-3229` `val INSTANCE = MetadataVersion(2, 5, 0)`.
27. Dokka's JVM analysis classpath is the compilation's dependency files and the Kotlin adapter does not read Kotlin language settings: [KotlinAdapter.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-runners/dokka-gradle-plugin/src/main/kotlin/adapters/KotlinAdapter.kt). Quote: "compilationClasspath.from({ compilation.compileDependencyFiles })"; the file contains no `languageVersion`, `apiVersion` or `compilerOptions` (searched the file at that tag).
28. Issue 4620's maintainer analysis: [issue 4620 comments](https://github.com/Kotlin/dokka/issues/4620) (read 2026-11-22). Quote: "I believe it's now being reported because we improved the \"unresolved references\" reporting to cover more issues." and "it just doesn't contain those transitive `implementation` dependencies in it".
29. Dokka 2.3.0's own matrix does not include Kotlin Gradle plugin 2.4 or 2.5: [TestedVersions.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-integration-tests/gradle/src/main/kotlin/org/jetbrains/dokka/it/gradle/TestedVersions.kt) (the same lines on `master`). Quote: `val LATEST = BuildVersions("8.14.5", "2.3.21")`.
30. The validator resolves `kotlin-metadata-jvm` at the project's Kotlin plugin version: [BinaryCompatibilityValidatorPlugin.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/BinaryCompatibilityValidatorPlugin.kt). Quote: "project.dependencies.add(configName, \"org.jetbrains.kotlin:kotlin-metadata-jvm:$result\")" and "else -> version"; the version is read from the Kotlin plugin's resource, "properties.getProperty(\"project.version\")". The Kotlin Gradle plugin's resource at v2.5.0-RC ([project.properties](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/resources/project.properties)): "project.version=${projectVersion}".
31. The validator reads metadata leniently; the metadata library's modes: [KotlinMetadataVisibilities.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/api/KotlinMetadataVisibilities.kt) and [JvmMetadataVersion.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/kotlinx-metadata/jvm/src/kotlin/metadata/jvm/JvmMetadataVersion.kt) and [KotlinClassMetadata.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/kotlinx-metadata/jvm/src/kotlin/metadata/jvm/KotlinClassMetadata.kt). Quote: "return KotlinClassMetadata.readLenient(header)"; "The library can read in strict mode Kotlin metadata produced by Kotlin compilers from 1.0 up to and including this version + 1 minor."; "This method makes best effort to read unsupported metadata versions."
32. The Kotlin Gradle plugin's ABI validation is experimental at 2.5.0-RC: [AbiValidationExtension.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/abi/AbiValidationExtension.kt) and the [documentation page source](https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/gradle/gradle-binary-compatibility-validation.md) (last changed 2026-04-28). Quote: "An *experimental* plugin DSL extension to configure Application Binary Interface (ABI) validation." and "Note that this DSL is experimental, and it will likely change in future versions until it is stable." and `<primary-label ref="experimental-general"/>`; and "By default, [when binary compatibility validation is enabled](#how-to-enable) in your project and you run the `check` task, Gradle also runs the `checkKotlinAbi` task."
33. The ABI validation's filters, tasks, directory and file name: [AbiFiltersSpec.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/abi/AbiFiltersSpec.kt), [AbiValidationPaths.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/abi/internal/AbiValidationPaths.kt), [KotlinAbiCheckTaskImpl.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/tasks/abi/KotlinAbiCheckTaskImpl.kt), all at v2.5.0-RC. Quote: "The annotation **must** have a [Retention] of [BINARY][AnnotationRetention.BINARY] or [RUNTIME][AnnotationRetention.RUNTIME] type." (the text is on the `annotatedWith` property of `AbiFilterSetSpec`; searched for `BINARY` there); `internal const val LEGACY_DEFAULT_REFERENCE_DUMP_DIR = "api"` and `internal const val LEGACY_JVM_DUMP_EXTENSION = ".api"`; `const val NAME: String = "checkKotlinAbi"`; "Expected file with ABI declarations '${referenceDump.relativeTo(rootDir)}' does not exist."
34. The Kotlin Gradle plugin's validation descends from the validator and its first release was marked non-production: [What's new in Kotlin 2.2.0](https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/whatsnew/whatsnew22.md). Quote: "we're experimenting with moving the \nfunctionality of the [binary compatibility validator](https://github.com/Kotlin/binary-compatibility-validator) into the Kotlin Gradle plugin (KGP)." and "You can try it out in toy projects, but we don't recommend using it in production yet." and "continues to \nbe maintained during this experimental phase." (line breaks as in the source).
35. ktlint runs the Kotlin Gradle plugin's ABI validation on Kotlin 2.5.0-RC, and the dump differs from the validator's only slightly: [pull request 3344 "Migrate BCV"](https://github.com/ktlint/ktlint/pull/3344) (merged 2026-08-01), [KotlinCommonPlugin.kt](https://github.com/ktlint/ktlint/blob/master/build-logic/src/main/kotlin/KotlinCommonPlugin.kt), [libs.versions.toml](https://github.com/ktlint/ktlint/blob/master/gradle/libs.versions.toml) and [pull request 3436](https://github.com/ktlint/ktlint/pull/3436) (merged 2026-11-22T15:27:47Z, checks green). Quote: "@OptIn(ExperimentalAbiValidation::class)" / "abiValidation()"; `kotlin = "2.5.0-RC"`; `dokka = "org.jetbrains.dokka:dokka-gradle-plugin:2.3.0"`; `gradle-maven-publish-plugin = "com.vanniktech:gradle-maven-publish-plugin:0.37.0"`; the migration diff removes lines such as "-	public static final field UNKNOWN_CAUSE_MESSAGE Ljava/lang/String;" from `.api` files.
36. vanniktech uses only `KotlinBasePlugin.pluginVersion` and `KotlinToolingVersion` on the JVM path, and `KotlinBasePlugin.pluginVersion` exists at 2.5.0-RC: [ProjectExtensions.kt at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/ProjectExtensions.kt) and [KotlinBasePlugin.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/KotlinBasePlugin.kt). Quote: "val actual = (plugins.getPlugin(id) as KotlinBasePlugin).pluginVersion" / "return KotlinToolingVersion(actual) >= KotlinToolingVersion(version)" and "val pluginVersion: String".
37. vanniktech's test matrix runs Kotlin 2.5.0-RC and its `main` build is green; no release after 0.37.0 and no plugin source change: [TestOptions.kt at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/integrationTest/kotlin/com/vanniktech/maven/publish/util/TestOptions.kt), [pull request 1472](https://github.com/vanniktech/gradle-maven-publish-plugin/pull/1472) (merged 2026-11-11), [releases](https://github.com/vanniktech/gradle-maven-publish-plugin/releases) and [compare 0.37.0...main](https://github.com/vanniktech/gradle-maven-publish-plugin/compare/0.37.0...main) (read 2026-11-22). Quote: "KgpVersion(Versions.KOTLIN_RC)," and (rc.versions.toml in pull request 1472) `kotlin = "2.5.0-RC"`; the compare lists no file under `plugin/src/main`; the newest release is 0.37.0.
38. The stdlib dependency is at the plugin's version: [Configure a Gradle project](https://kotlinlang.org/docs/gradle-configure-project.html) (read 2026-11-22). Quote: "The version of the standard library used is the same as the version of the Kotlin Gradle plugin." and "If you declare a standard library dependency explicitly (for example, if you need a different version), the Kotlin Gradle plugin won't override it or add a second standard library."
39. The compiler's pre-release marking: [KotlinCompilerVersion.java at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/compiler.version/src/org/jetbrains/kotlin/config/KotlinCompilerVersion.java) (the same constant is `false` at v2.5.0-Beta1, v2.5.0-Beta2, `build-2.5.0-dev-3229`). Quote: "True if the latest stable language version supported by this compiler has not yet been released." / "Binaries produced by this compiler with that language version (or any future language version) are going to be marked" / "private static final boolean IS_PRE_RELEASE = false;".
40. Gradle orders `2.5.0-RC` below `2.5.0`: [Gradle 9.7.1, dependency versions](https://docs.gradle.org/9.7.1/userguide/dependency_versions.html) (read 2026-11-22). Quote: "A version with an extra non-numeric part is lower: `1.1.a < 1.1`." and "`1.0-zeta < 1.0-rc < 1.0-snapshot < 1.0-final < 1.0-ga < 1.0-release < 1.0-sp`".
41. Public builds on Kotlin 2.5.0-RC with Dokka 2.3.0 and vanniktech 0.37.0: [FlowMVI libs.versions.toml](https://github.com/respawn-llc/FlowMVI/blob/master/gradle/libs.versions.toml) and its [docs workflow](https://github.com/respawn-llc/FlowMVI/blob/master/.github/workflows/docs.yml) (read 2026-11-22). Quote: `dokka = "2.3.0"`, `kotlin = "2.5.0-RC"`, `maven-publish-plugin = "0.37.0"`; `run: ./gradlew dokkaGenerate`. The `docs` and `CI` workflow runs on `master` on 2026-11-22 concluded `success`.

## 8. Gaps

- **Observed results rest on a scratch build on Kotlin Gradle plugin 2.2.x, not on a citable source**, and no build has run on 2.5.0-RC: Dokka's silence and empty output on a module with no source, the zero-byte dump, the manifest-only jars,
  `signMavenPublication` `SKIPPED` at a `-SNAPSHOT` version, configuration-cache store and reuse, the silent empty aggregate without
  `apply false`, and the dump contents with the marker. F8 says from sources which of these can depend on the Kotlin version (only
  Dokka's reading of stdlib and module metadata, and the validator's metadata reader); that table is an inference. The Dokka behaviour
  on an empty module was not traced to a line of Dokka's source.
- **What Dokka 2.2.0 does with `kotlin-stdlib` 2.5.0-RC on its classpath was not observed.** The conclusion that it cannot read it
  rests on the compiler's metadata rule (claims 23, 25, 26) and on Dokka's classpath being the compilation's dependency files
  (claim 27). The exact diagnostic, and whether any warning that survives is counted by `failOnWarning`, are not established. If it
  were false, Dokka 2.2.0 would avoid issue 4620 at no other cost except language version 2.3 analysis of 2.5 source.
- **What Dokka 2.3.0 does with `kotlin-stdlib` 2.5.0-RC and with source at language version 2.5 under `failOnWarning` was not
  observed**, and no public build combines them (F11). The embedded compiler is a development build (`2.5.0-dev-3229`) older than the
  2.5.0-RC stdlib; the metadata version is equal, but no source says the two are free of other incompatibilities. Dokka's
  integration matrix runs no Kotlin Gradle plugin newer than 2.3.21. Dokka `master` moves its analysis to 2.5.0-RC (pull request 4624)
  and is unreleased. If this fails on the first real run, the options are Dokka built from `master` (not published to Maven Central as
  far as was found; a development-build repository was not located) or the next Dokka release.
- **When the next Dokka release carrying pull request 4628 ships** is unknown: no milestone beyond 2.3.0 exists and no date is
  stated. Issue 4620's reach on this code base is an inference from its reproducer; no class here exercises it yet. Whether making
  the logging dependency `api` avoids it is an inference from the maintainer's comment, not a documented workaround.
- **The validator on Kotlin 2.5.0-RC was not seen running anywhere.** Its source resolves a matching `kotlin-metadata-jvm` and reads
  leniently, and its issue list holds no Kotlin-version issue, but no public build using it on 2.5.0-RC was found (the sample of
  seven 2.5.0-RC repositories checked had none), so a first real run decides. Whether its links to Kotlin Gradle plugin Native and JS
  types are harmless in a JVM-only build was not tested.
- **The Kotlin Gradle plugin's ABI validation on a module with no source** was not observed; the zero-byte dump and the passing
  check against it are inferred from the dump and check tasks' source. Its dump text differs slightly from the validator's (ktlint's
  migration), but no complete comparison on a sample with annotations like `@RequiresOptIn` markers was made.
- **Whether Maven Central accepts a release whose javadoc jar holds only a manifest** was not checked. vanniktech's own default
  (`JavadocJar.Empty()`) produces the same jar, and no module is released empty in this unit, so it does not block anything.
- **vanniktech 0.37.0 and Dokka 2.3.0 name no tested pairing with Gradle 9.7.1**; both ran on it in the scratch build, but a
  documented pairing was not found. Dokka states no Gradle maximum. vanniktech's changelog names Kotlin 2.4.0 as its tested
  ceiling; the 2.5.0-RC coverage comes from its test source and CI, not from its documentation.
- **Release-time behaviour of the signing path** (a non-SNAPSHOT local publish without keys) was not re-run; the signing rule is
  covered by the unreleased-build research on vanniktech's `coordinates()` and signing.
- **Which Kotlin-library convention applies the validator** is left to the plan: the validator may be applied in the shared
  convention (as observed here) or per module; either was supported by its source (it configures `allprojects` of the project that
  applies it). The extension must then be set in each project that applies it.
