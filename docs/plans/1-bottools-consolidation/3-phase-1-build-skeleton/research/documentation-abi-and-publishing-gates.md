# Dokka, publishing and API-validation versions, and how the gates behave on modules with no source

Evidence as of 2026-11-18. "Observed" below means: run in a scratch build of the same shape as this repository's target
(an included `build-logic` with a Kotlin-library and a published-library convention plugin, three published modules, one of
them with the two stability annotations, an umbrella with no source, a root that aggregates), on Gradle 9.7.1 with a JDK 21
toolchain, with `explicitApi()`, the configuration cache on and no signing key in the Gradle user home. The scratch build was
run with two toolchains: Kotlin Gradle plugin 2.2.21 + Dokka 2.3.0 + vanniktech 0.37.0 + validator 0.18.2, and Kotlin Gradle
plugin 2.2.0 + Dokka 2.2.0 + vanniktech 0.36.0 + validator 0.18.2. Both behaved identically on every point below unless a
finding says otherwise.

## 1. Question

Which versions of Dokka, `com.vanniktech.maven.publish`, the binary-compatibility validator and the Kotlin Gradle plugin 2.2.x
patch should the build pin on Gradle 9.7.1, a JDK 21 toolchain and a Java floor of 21 with the configuration cache usable; how
does a Dokka task join `check` so that `./gradlew build` fails on an undocumented public declaration; and do the modules that
hold no main source pass the documentation, ABI and publishing gates as they are, or does each need one minimal declaration?

Requirements an answer meets: Dokka 2 in V2 plugin mode with one aggregate publication at the root (`dokka(project(":<module>"))`,
Kotlin plugins on the root with `apply false`, theme per module and at the root, `reportUndocumented` and `failOnWarning` on
every configuration, the umbrella's own source sets suppressed); `JavadocJar.Dokka("dokkaGeneratePublicationHtml")`; the
validator in `check` with `@ExperimentalBotToolsApi` in `nonPublicMarkers`; `publishToMavenLocal` at `1.0.0-SNAPSHOT` with no
signing key while releases stay signed; nothing that needs a Kotlin compiler newer than 2.2.x.

## 2. Bottom line

- **Pin Kotlin Gradle plugin 2.2.21** (the newest 2.2.x; the line is 2.2.0, 2.2.10, 2.2.20, 2.2.21), **vanniktech 0.37.0**
  and **validator 0.18.2** (still the newest validator; maintenance mode). **Pin Dokka 2.2.0, not 2.3.0, for now.** Dokka
  2.3.0 (2026-11-05) works on this stack, but it has an open regression that fires under `failOnWarning = true` for a documented
  class that inherits private members whose types come from a library's `implementation` dependency (Dokka issue 4620, open
  2026-11-11; "Dokka 2.2.0 doesn't report them"). The build's modules will extend each other's classes and hold logger fields, which
  is that shape. 2.3.0's gains (Project Isolation support, fixes of vulnerabilities in the generator's own libraries) do not
  reach any published artifact or this build's gates. Re-evaluate at the first Dokka release after 2.3.0.
- **Nothing here needs the `pluginMode` property to get V2**: in Dokka 2.3.0's source the default is `V2EnabledWithHelpers`
  (V2 plus disabled stand-ins for the V1 tasks). Set `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled` in the root
  `gradle.properties` anyway: it is what Dokka's migration guide prescribes as the finished state, it drops the V1 stand-ins, and
  it was observed to work with the precompiled convention plugin's generated `dokka {}` accessors. `V1Enabled` still exists in
  2.3.0's source, so the property is also what stops a stray value from selecting V1.
- **Join Dokka to `check` with `tasks.named("check") { dependsOn("dokkaGeneratePublicationHtml") }` in
  `bottools.published-library`, and the same line on the root** (so the aggregate's own `failOnWarning` and theme run under
  `./gradlew build`). Observed: with an undocumented public class, `build` fails with
  `w: [:bottools-core:dokkaGeneratePublicationHtml] Undocumented: bottools.core/Undocumented/ (jvm)` and the task `FAILED`;
  the configuration cache entry is stored and reused on the next run.
- **The modules with no main source pass every gate as they are; none needs a placeholder declaration.** Observed on a module with
  no source, with only a test source, and on the umbrella: Dokka runs with `failOnWarning` and logs no warning (it writes no pages);
  `apiBuild` runs and `apiDump` writes a zero-byte `<module>/api/<module>.api`; `apiCheck` fails with "Expected file with API
  declarations ... does not exist" until that file is committed, and passes against the zero-byte file; vanniktech builds a
  valid jar, sources jar, javadoc jar, POM and module file (each jar holds only `META-INF/MANIFEST.MF`); `explicitApi()` and the
  toolchain have nothing to act on (`compileKotlin` is `NO-SOURCE`). The work has to commit one zero-byte dump per module with no
  source (and the umbrella), made by `apiDump`.
- **The validator drops `@ExperimentalBotToolsApi` declarations from the dump** (class and member), reading binary-retention
  annotations; the marker annotation class itself stays in the dump, as does `@SupportedExtension`.
- **Two silent failures to guard.** A root without the Kotlin plugin on its classpath renders an empty aggregate and the build
  still succeeds under `failOnWarning` (observed); and Gradle 9 fails `test` when a module has test sources but discovers no test.

## 3. Findings

### F1. Newest releases and pairings (established consensus: release feeds and Central metadata)

| Tool | Newest as of 2026-11-18 | Previous | Source |
|---|---|---|---|
| Dokka | 2.3.0 (2026-11-05) | 2.2.0 (2026-03-26) | [GitHub releases](https://github.com/Kotlin/dokka/releases), [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/dokka/dokka-gradle-plugin/maven-metadata.xml) |
| vanniktech maven publish | 0.37.0 (2026-06-21) | 0.36.0 (2026-01-18) | [releases](https://github.com/vanniktech/gradle-maven-publish-plugin/releases) |
| binary-compatibility-validator | 0.18.2 (2026-09-02) | 0.18.1 (2025-07-09) | [releases](https://github.com/Kotlin/binary-compatibility-validator/releases), [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlinx/binary-compatibility-validator/maven-metadata.xml) |
| Kotlin Gradle plugin 2.2.x | 2.2.21 | 2.2.20, 2.2.10, 2.2.0 | [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/maven-metadata.xml) |

Gradle itself is at 9.9.1 (2026-11-10, [Gradle releases](https://github.com/gradle/gradle/releases)); the build pins 9.7.1. The
Kotlin Gradle plugin's `latest` on Central is 2.5.0-RC; no 2.2.x patch exists after 2.2.21.

Documented compatibility:

- vanniktech 0.37.0: minimum JDK 17, Gradle 9.0.0, Kotlin Gradle plugin 2.2.0; "compatibility tested up to" JDK 26, Gradle 9.6.0
  and 9.7.0-milestone-1, Kotlin Gradle plugin 2.4.0 ([0.37.0 changelog](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md)).
  0.36.0's tested range ends at Gradle 9.4.0-milestone-4 and Kotlin Gradle plugin 2.3.20-Beta1 ([0.36.0 notes](https://github.com/vanniktech/gradle-maven-publish-plugin/releases/tag/0.36.0)).
  Neither names Gradle 9.7.1; both were observed to run on it.
- Dokka: the 2.3.0 notes declare configuration-cache compatibility and add Project Isolation support; the migration guide
  at 2.3.0 says the plugin "fully supports Gradle configuration cache and build cache". Dokka's pages state no Gradle or Kotlin
  Gradle plugin minimum for 2.2 or 2.3 (the 2.1.0 notes say the minimum Gradle is 7.6.3). Dokka analyses source with its own
  embedded analysis, so the project's Kotlin plugin patch does not select it. Observed working with Kotlin Gradle plugin 2.2.0 and
  2.2.21 on Gradle 9.7.1.
- Gradle 9.0 and later: the minimum supported Kotlin Gradle plugin is 2.0.0 ([upgrade guide](https://docs.gradle.org/9.7.1/userguide/upgrading_major_version_9.html)).
  The earlier research in this folder (§2.1) covers the documented range of each Kotlin line against Gradle.
- Validator 0.18.2: requires Gradle 6.1.1 and Kotlin 1.6.20 or newer; it reads class files with ASM and was observed to dump
  Java 21 class files (class-file major 65) compiled by Kotlin 2.2.0 and 2.2.21. Its only change since 0.18.1 is "Prevent
  configuration crash on hosts unrecognized by Kotlin/Native" ([README](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/README.md),
  [0.18.2 notes](https://github.com/Kotlin/binary-compatibility-validator/releases/tag/0.18.2)). It is still in maintenance mode
  ("The implementation of new features has been stopped"); the repository's last commit is the 0.18.2 release.

### F2. Dokka 2.3.0 against 2.2.0 (common practice split; one open regression)

2.3.0 adds: Project Isolation support, configuration-cache declaration, `suppressAnnotatedWith`, removal of K1 analysis, and
security updates of libraries "that ship with Dokka's published artifacts" (FreeMarker 2.3.32 to 2.3.35, jsoup 1.16.1 to 1.23.2,
Jackson 2.15.3 to 2.22.2) ([2.3.0 notes](https://github.com/Kotlin/dokka/releases/tag/v2.3.0)). Those libraries run inside the
documentation generator on the build machine; they are not on any published artifact's classpath.

2.3.0's open regressions on 2026-11-18 ([issues list](https://github.com/Kotlin/dokka/issues)):

- Issue 4620 (opened 2026-11-11): with `failOnWarning = true`, "Dokka 2.3.0 reports `is unresolved` warnings for the types of
  private members that a documented class inherits from a library class", for a subclass in module `app` of a class in module `lib`
  whose private field's type "comes from an `implementation` dependency". Dokka 2.2.0 does not report them. A Dokka maintainer
  replies "I believe it's now being reported because we improved the 'unresolved references' reporting to cover more issues"; no
  fix is released.
- Issues 4618 and 4621 concern Java sources only; this build is Kotlin only, so they do not apply.

Why 4620 matters here: the target has `bottools-core` classes that other modules extend, and the organisation's logging rule has
each module hold a kotlin-logging logger as an `implementation` dependency. A public subclass in another module of a class that
holds a private instance logger field is exactly that shape, and `failOnWarning` turns it into a build failure. This is an
inference from the issue's reproducer, not something observed in this repository: no such class exists yet.

Prior art splits: WebTools pins Dokka 2.3.0 (and uses `failOnWarning`); MyGameTools pins 2.2.0 (and sets neither
`failOnWarning` nor `reportUndocumented`).

### F3. vanniktech 0.37.0 against 0.36.0 (established: changelog)

0.37.0's two changes are: redundant checksum files (`.asc` signature checksums, `sha256`/`sha512`) are excluded when publishing to
Maven Central, configurable through `checksums(...)` or the `mavenCentralChecksums` property; and the Maven Central deployment id is
logged after upload ([0.37.0 changelog](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md)).
Nothing in either touches `JavadocJar.Dokka`, `KotlinJvm`/`JavaLibrary`, sources jars, `signAllPublications()` or
`publishToMavenLocal`. Source at 0.37.0: `KotlinJvm(javadocJar, sourcesJar)` requires the `org.jetbrains.kotlin.jvm` plugin, builds a
publication from the `java` component and wires the jars; a `JavadocJar.Dokka` registers a task `dokkaJavadocJar` that depends on
and copies the named Dokka task ([Platform.kt](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/Platform.kt),
[JavadocJar.kt](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/tasks/JavadocJar.kt)).
Observed on both versions: the same task names, the same published files; `signMavenPublication` is `SKIPPED` for a `-SNAPSHOT`
version, so `publishToMavenLocal` needs no key. vanniktech's metadata names Kotlin Gradle plugin 2.4.0 (its tested ceiling), but the
build-logic classpath resolved the Kotlin Gradle plugin to the declared 2.2.21, on both the compile and the runtime classpath
(observed with `dependencyInsight`).

### F4. Dokka V2 mode (established: Dokka source and migration guide at 2.3.0)

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
- Theme per module: `pluginsConfiguration.html { customStyleSheets.from(...); customAssets.from(...); footerMessage.set(...) }`
  with the paths resolved from `isolated.rootProject.projectDirectory` (as WebTools and MyGameTools do). Observed: a stylesheet at
  the root resolved from a module's convention plugin builds; a missing theme file fails the task (WebTools' integration test asserts
  `NoSuchFileException`).
- Suppressing the umbrella's source sets: `dokka { dokkaSourceSets.configureEach { suppress.set(true) } }` is accepted. With no
  source it changes nothing, since a module with no source already produces no pages.

### F5. Gates on a module with no main source (observed; two items backed by source)

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

### F6. How Dokka joins `check` (observed; common practice in the organisation's builds)

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

### F7. `nonPublicMarkers` and the Experimental marker (established: source; observed)

`apiValidation { nonPublicMarkers.add("<fqn of the annotation>") }`; the extension is created in each project that applies the
plugin, which then configures `allprojects` of that project (so a convention plugin that applies it per module, and sets the
extension per module, works). `filterOutAnnotated` removes a class whose annotations refer to a marker, and a member whose
annotations do; annotations are read from both `visibleAnnotations` and `invisibleAnnotations`, so binary retention is read
([KotlinSignaturesLoading.kt](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/api/KotlinSignaturesLoading.kt)).
Observed with `@Retention(AnnotationRetention.BINARY) @RequiresOptIn(level = ERROR)`: a class annotated with it and a member
annotated with it are absent from the dump; the annotation class `ExperimentalBotToolsApi` and `SupportedExtension` are present
as `public abstract interface annotation class ... : java/lang/annotation/Annotation`. Dokka still documents the marked
declarations (they appear in the pages and in the javadoc jar); only Dokka 2.3.0's `suppressAnnotatedWith` could hide them, and
that is not wanted for a documented experimental seam.

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
- **Dokka's own guidance** (migration guide and troubleshooting page at 2.3.0): aggregate with `dokka(project(":sub"))` and finish
  on `V2Enabled`; per-subproject settings (its example is the generator's heap) are advised in "a convention plugin applied to all
  subprojects".

## 5. Pitfalls and regrets

- **A silently empty site.** Without the Kotlin plugin on the root's classpath the aggregate renders no module page and the build
  passes, even under `failOnWarning` (the warning is logged, not counted). WebTools' root comment records the same failure, and that
  naming a source set the modules lack turns it into a configuration error. A Pages job that only fails when `build/dokka/html` is
  missing does not catch it: `index.html` exists. A guard has to look for a page of a module that has source (for example the
  `bottools-core` package page).
- **Two version homes.** The root's `pluginManagement.plugins` versions and build-logic's marker dependencies must name the same
  Dokka and Kotlin versions, or the root and the modules load different plugin copies (WebTools guards this with a test).
- **Dokka 2.3.0 under `failOnWarning`.** Issue 4620 above; 2.3.0 also reports more unresolved references than 2.2.0 in general
  (a reply on that issue), so a first upgrade can fail on existing KDoc.
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
- **Kotlin standard library floor.** The Kotlin Gradle plugin's patch becomes the published `kotlin-stdlib` requirement (observed in
  the umbrella's module metadata: `kotlin-stdlib` `requires` `2.2.21` with plugin 2.2.21). A consumer on compiler 2.2.0 has its
  stdlib raised to the library's version by Gradle's resolution; that is harmless for a Gradle consumer, and plugin 2.2.0 would give
  a lower floor.

## 6. Recommendation for this repository

1. **Versions.** Kotlin Gradle plugin 2.2.21; Dokka 2.2.0; vanniktech 0.37.0; validator 0.18.2, each stated once as a marker
   dependency in `build-logic/build.gradle.kts` and once in the root `settings.gradle.kts` `pluginManagement.plugins` for the two
   ids the root applies (Kotlin JVM and Dokka), with a check that the pairs agree. Dokka 2.2.0 is chosen because its generation is
   proven here under `failOnWarning` and 2.3.0 has an open regression in exactly that mode; vanniktech 0.37.0 is chosen over 0.36.0
   because nothing the build uses changes and its tested range ends nearer Gradle 9.7.1. If 2.2.21's stdlib floor is unwanted, plugin
   2.2.0 is equally proven.
2. **Root `gradle.properties`:** `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled`.
3. **`bottools.published-library`:** apply Dokka and vanniktech; `group`, `version`; in `dokka {}` the theme (paths from
   `isolated.rootProject.projectDirectory`), `dokkaPublications.configureEach { failOnWarning.set(true) }` and
   `dokkaSourceSets.configureEach { reportUndocumented.set(true) }`; and
   `tasks.named("check") { dependsOn("dokkaGeneratePublicationHtml") }`. The Kotlin-library convention sets `explicitApi()`, applies
   the validator and sets `apiValidation { nonPublicMarkers.add("<package>.ExperimentalBotToolsApi") }`; the platform line is
   `configure(KotlinJvm(javadocJar = JavadocJar.Dokka("dokkaGeneratePublicationHtml"), sourcesJar = SourcesJar.Sources()))`.
4. **Root:** `id("org.jetbrains.kotlin.jvm") apply false`, `id("org.jetbrains.dokka")`, `dokka(project(":<module>"))` for the five
   feature modules (the umbrella aggregates through its own dependency, or is listed too, per the umbrella question),
   `failOnWarning`, the theme, and the same `check` dependency. Add a gate that asserts the aggregate holds a module page.
5. **Empty modules:** no placeholder declaration. Run `apiDump` once and commit `api/<module>.api` for all six modules (zero-byte for
   `bottools-data-sqlite`, `bottools-http`, `bottools-stats`, `bottools-plugins` and `bottools`; the two annotation classes for
   `bottools-core`). A feature module's test source must contain a discoverable test, or be left out until it does.
6. **Rejected: a stub class per empty module** (it would put a throwaway declaration into the dump and the javadoc), and **rejected:
   leaving the validator off the empty modules** (the zero-byte dump is what makes the first real declaration reviewable).

## 7. Load-bearing claims

1. Dokka 2.3.0 is newest, released 2026-11-05, and the 2.2.0 notes/2.3.0 notes describe it. Source: [Dokka releases](https://github.com/Kotlin/dokka/releases/tag/v2.3.0)
   (2026-11-05). Quote: "Support Project Isolation in DGPv2 (#4497)" and "Update `com.gradle.publish:plugin-publish-plugin` and declare Gradle Configuration Cache compatibility (#4484)".
2. Dokka 2.3.0's security updates are to libraries of the generator. [2.3.0 notes](https://github.com/Kotlin/dokka/releases/tag/v2.3.0).
   Quote: "Updated dependencies that ship with Dokka's published artifacts, resolving vulnerabilities:".
3. Dokka issue 4620 (open, 2026-11-11): [issue](https://github.com/Kotlin/dokka/issues/4620). Quote: "Dokka 2.3.0 reports `is unresolved` warnings for the types of private members that a documented class inherits from a library class. Dokka doesn't document these members, so it must not report their types. With `failOnWarning = true`, the build fails." and "Dokka 2.2.0 doesn't report them."
4. Dokka's plugin-mode default and values in 2.3.0: [PluginFeaturesService.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-runners/dokka-gradle-plugin/src/main/kotlin/internal/PluginFeaturesService.kt).
   Quote: "val Default: PluginMode = V2EnabledWithHelpers" and "V1Enabled, V2EnabledWithHelpers, V2Enabled".
5. The finished state of a migration is `V2Enabled`: [dokka-migration.md at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/docs/topics/dokka-migration.md).
   Quote: "After successful migration, set the following opt-in flag without helpers in the project's `gradle.properties` file:" followed by "org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled".
6. Dokka finds `gradle.properties` while Gradle generates precompiled-plugin accessors: PluginFeaturesService.kt (same link as 4).
   Quote: "Because Gradle is generating accessors, it won't give us access to Gradle properties" and "defined for the main project. So, we must discover `gradle.properties` ourselves."
7. The root needs the Kotlin plugin on its classpath: [KotlinAdapter.kt at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/dokka-runners/dokka-gradle-plugin/src/main/kotlin/adapters/KotlinAdapter.kt).
   Quote: "Apply the Dokka and Kotlin plugins to the root project using the `plugins {}` DSL. (If the root project does not need the plugins, use 'apply false')".
8. `failOnWarning` and `reportUndocumented` are documented as a pair: [dokka-gradle-configuration-options.md at v2.3.0](https://github.com/Kotlin/dokka/blob/v2.3.0/docs/topics/dokka-gradle-configuration-options.md).
   Quote: "Whether to emit warnings about visible undocumented declarations, that is declarations without KDocs after they have been filtered by `documentedVisibilities` and other filters." and "This setting works well with `failOnWarning`." and "Default: `build/dokka/html`".
9. vanniktech 0.37.0 changes: [CHANGELOG at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md) (2026-06-21).
   Quote: "When publishing to Maven Central, redundant checksum files are now excluded by default" and "Maven Central deployment id is being logged after upload."
10. vanniktech 0.37.0 supported range: same file. Quote: "#### Minimum supported versions - JDK 17 - Gradle 9.0.0 - Android Gradle Plugin 8.13.0 - Kotlin Gradle Plugin 2.2.0" and "Gradle 9.6.0 - Gradle 9.7.0-milestone-1".
11. vanniktech 0.36.0 removed Dokka V1 and defaults `configure(...)` without `javadocJar` to an empty jar: [0.36.0 notes](https://github.com/vanniktech/gradle-maven-publish-plugin/releases/tag/0.36.0).
    Quote: "Removed support for Dokka v1, it's now required to use Dokka in v2 mode." and "the plugin now defaults to publishing an empty javadoc jar."
12. `KotlinJvm` configuration and the Dokka javadoc jar task: [Platform.kt at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/Platform.kt)
    and [JavadocJar.kt at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/tasks/JavadocJar.kt).
    Quote: "Calling configure(KotlinJvm(...)) requires the org.jetbrains.kotlin.jvm plugin to be applied" and "prefixedTaskName(\"dokkaJavadocJar\", prefix)".
13. Validator 0.18.2 is newest and in maintenance mode: [README at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/README.md) and [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlinx/binary-compatibility-validator/maven-metadata.xml).
    Quote: "This plugin is in maintenance mode." and "The implementation of new features has been stopped"; metadata `<version>0.18.2</version>` last, `<lastUpdated>20260902154228</lastUpdated>`.
14. Validator joins `check`: [BinaryCompatibilityValidatorPlugin.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/BinaryCompatibilityValidatorPlugin.kt).
    Quote: "null -> project.tasks.named(\"check\").configure { it.dependsOn(apiCheck) }" and "allprojects {" "configureProject(it, extension)".
15. A missing dump fails `apiCheck`: [KotlinApiCompareTask.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/KotlinApiCompareTask.kt).
    Quote: "Expected file with API declarations '${projectApiFile.relativeTo(rootDir)}' does not exist."
16. The dump is built from the classes found, empty list included, and drops marked declarations: [KotlinApiBuildTask.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/KotlinApiBuildTask.kt).
    Quote: ".filterOutAnnotated(nonPublicMarkers.map(::replaceDots).toSet())" and "filteredSignatures.dump(writer)".
17. Both visible and invisible annotations are read: [KotlinSignaturesLoading.kt at 0.18.2](https://github.com/Kotlin/binary-compatibility-validator/blob/0.18.2/src/main/kotlin/api/KotlinSignaturesLoading.kt).
    Quote: "visibleAnnotations.orEmpty() + invisibleAnnotations.orEmpty()".
18. Gradle 9 fails `test` with sources and no discovered test: [upgrading to Gradle 9.0.0](https://docs.gradle.org/9.7.1/userguide/upgrading_major_version_9.html).
    Quote: "When test sources are present and no filters are applied, the `test` task will now fail with an error" and "This behavior can be disabled by setting the `failOnNoDiscoveredTests` property to `false`".
19. Gradle 9 minimum Kotlin Gradle plugin: same page. Quote: "Starting with Gradle 9.0.0, the minimum supported Kotlin Gradle plugin version is 2.0.0."
20. The 2.2.x patch line and its newest: [Central metadata](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/maven-metadata.xml), 2026-11-11 update.
    Quote: `<version>2.2.20</version>` `<version>2.2.21-RC</version>` `<version>2.2.21</version>`; no 2.2.x entry follows 2.2.21.
21. WebTools' Dokka and validator tests (prior art behaviour the recommendation copies): [DokkaConventionIntegrationTest.kt](https://github.com/SpartanLaboratories/WebTools/blob/master/build-logic/src/test/kotlin/com/spartanlabs/testing/integration/webtools/buildlogic/DokkaConventionIntegrationTest.kt)
    and [ApiValidationIntegrationTest.kt](https://github.com/SpartanLaboratories/WebTools/blob/master/build-logic/src/test/kotlin/com/spartanlabs/testing/integration/webtools/buildlogic/ApiValidationIntegrationTest.kt).
    Quote: "an undocumented public function fails the task" and "apiCheck fails before any dump exists".

## 8. Gaps

- **Observed results rest on a scratch build, not on a citable source**: Dokka's silence and empty output on a module with no source,
  the zero-byte dump, the manifest-only jars, `signMavenPublication` `SKIPPED` at a `-SNAPSHOT` version, configuration-cache store and
  reuse, the silent empty aggregate without `apply false`, and the dump contents with the marker. Each can be reproduced with a
  build of the shape described at the top; none is on the quote list above. The Dokka behaviour on an empty module was not traced to
  a line of Dokka's source.
- **Whether Maven Central accepts a release whose javadoc jar holds only a manifest** was not checked. vanniktech's own default
  (`JavadocJar.Empty()`) produces the same jar, and no module is released empty in this unit, so it does not block anything.
- **Issue 4620's reach on this code base** is an inference from its reproducer; no class here exercises it yet. A later move to
  Dokka 2.3.0 should be tried against the real modules with `failOnWarning` on before pinning. Whether a fixed 2.3.x exists after
  2026-11-18 was not checked.
- **vanniktech 0.37.0 and Dokka 2.3.0 name no tested pairing with Gradle 9.7.1**; both ran on it in the scratch build, but a
  documented pairing was not found. Dokka states no Gradle maximum.
- **Release-time behaviour of the signing path** (a non-SNAPSHOT local publish without keys) was not re-run; the earlier research
  in this folder covers vanniktech's signing rule.
- **Which Kotlin-library convention applies the validator** is left to the plan: the validator may be applied in the shared
  convention (as observed here) or per module; either was supported by its source (it configures `allprojects` of the project that
  applies it). The extension must then be set in each project that applies it.
