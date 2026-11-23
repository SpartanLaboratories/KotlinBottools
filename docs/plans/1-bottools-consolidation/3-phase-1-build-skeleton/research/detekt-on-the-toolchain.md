# detekt on the toolchain: which release, run how, for type-resolved analysis

Currency date of the findings: 2026-11-22 (releases, changelogs, source and open issues read that day). Findings that were not
re-opened on that day carry their own reading date (2026-11-18).

## 1. Question

Which detekt release, run in which way, gives type-resolved analysis of sources compiled by the Kotlin Gradle plugin 2.5.0-RC
(moving to 2.5.0 when it is released) at language version 2.5 and API version 2.5, on Gradle 9.7.1 and a JDK 21 toolchain, so that
`SuspendFunSwallowedCancellation` (inactive in detekt's default configuration) runs and fails `check` on a finding?

The answer has to meet these requirements, all stated as facts about the build:

- The build runs on Gradle 9.7.1, a JDK 21 toolchain (Java floor 21) and the Kotlin Gradle plugin 2.5.0-RC, with the configuration
  cache usable. Every module compiles at language version 2.5 and API version 2.5, and every module's classpath carries
  `kotlin-stdlib` 2.5.0-RC. The serialization compiler plugin is at the same version.
- A convention plugin applies the tool to every module; it fails `check` on a finding; nothing of it reaches a published
  module's classpath.
- `SuspendFunSwallowedCancellation` is active together with the rest of the default rule set.
- Four of the five feature modules and the umbrella hold no main source in this unit; `bottools-core` holds two annotation
  classes.

## 2. Bottom line

- **`SuspendFunSwallowedCancellation` needs type resolution, in both detekt lines.** It is annotated `@RequiresTypeResolution` in
  1.23.8 and implements `RequiresAnalysisApi` in 2.0.0-alpha.6. Without a classpath, detekt skips the rule with a debug-level
  message only. The plain `detekt` task has no classpath, and it is the only detekt task the plugin joins to `check`; `detektMain`
  and `detektTest` are not on `check` in either line. A build that applies detekt and runs `check` therefore passes with the rule
  never having run. The convention plugin must add the type-resolving tasks to `check` itself.
- **Pin detekt `2.0.0-alpha.6` (plugin id `dev.detekt`), not 1.23.8, and nothing newer exists.** 1.23.8 embeds Kotlin 2.0.21, whose
  compiler reads class metadata only up to 2.1.0, so it cannot read a 2.2 or 2.5 classpath. 2.0.0-alpha.6 (2026-08-04) is the newest
  2.x release; it embeds the Kotlin 2.4.10 Analysis API. No detekt release or snapshot is built on Kotlin 2.5: the published
  `main-SNAPSHOT` is still on 2.4.10, and the update to Kotlin 2.5.0 is an open draft change blocked on other work. detekt therefore
  analyses the build's Kotlin 2.5 sources with a Kotlin 2.4.10 compiler, for the whole life of this pin.
- **As pinned, detekt accepts language and API version 2.5 and, by reading its source, should still resolve `runCatching { … }`; it
  does not fail loudly if something goes wrong.** Its Gradle plugin copies the compile task's language and API version into each
  `detekt<Compilation>` task, so the build's 2.5 reaches detekt's embedded compiler, which knows 2.5 as an experimental version:
  its command-line check accepts it, and its "experimental language version" warning goes to a stream that is discarded unless
  `debug` is on. That compiler reads metadata up to `max(own + 1, language version)`, which is 2.5.0 here, so `kotlin-stdlib`
  2.5.0-RC is readable; the 2.5.0-RC compiler itself is not flagged as a pre-release compiler, so its output carries no
  pre-release flag that a release compiler would refuse. Everything that goes wrong instead (an unresolved class, a 2.5-only language
  feature the 2.4.10 compiler has switched off) is counted into one info-level line, "There were N compiler errors found during
  analysis. This affects accuracy of reporting.", and the build stays green. A public library build on Kotlin 2.5.0-RC with
  alpha.6 and type-resolved tasks already prints that line (2 to 12 per module, cause not shown) and passes.
- **Nothing in the evidence says alpha.6 cannot do this build's job, and nothing proves it can.** No run on Kotlin 2.5.0-RC was
  made here, and no public pure-JVM build runs the type-resolving tasks on 2.5.0-RC. The build must carry its own proof: a fixture
  compiled at language version 2.5 against `kotlin-stdlib` 2.5.0-RC whose seeded `runCatching { suspendCall() }` makes `check` fail,
  a second fixture whose suspend callee is in another module, and an assertion that the analysis prints no "compiler errors found"
  line. Until those pass on the real toolchain the rule is unproven.
- **Run it through its Gradle plugin's own `detekt<Compilation>` tasks, not the CLI and not the plain task.** The plugin derives
  classpath, `friendPaths`, language and API version, `jvmTarget`, `jdkHome` (from the toolchain) and `explicitApi` from the Kotlin
  compile task. The build's language and API version are set once on `kotlin { compilerOptions { … } }` and detekt follows. Do not
  set a different version on the detekt tasks.
- **Wire it by compilation in the convention plugin:** apply `dev.detekt` (build-logic depends on
  `dev.detekt:detekt-gradle-plugin:2.0.0-alpha.6`), set `buildUponDefaultConfig = true`, and for every Kotlin compilation make `check`
  depend on `detekt<CompilationName>` (`detektMain`, `detektTest`, and one per further test-set compilation). Configuration is by
  name and `Property` API only, so it is configuration-cache safe. Detekt adds only the resolvable, non-consumable configurations
  `detekt` and `detektPlugins`, so nothing reaches a published classpath.
- **Configuration file: `config/detekt/detekt.yml` at the repository root**, picked up automatically, holding only the override
  `coroutines: SuspendFunSwallowedCancellation: active: true`. Without `buildUponDefaultConfig = true`, a config file replaces the
  defaults and only the rules the file lists run; a full copy of the default file keeps the rule at `active: false`. A new code base
  needs no baseline (an absent baseline is optional). On a module with no main source the detekt tasks are skipped as `NO-SOURCE`.
- **2.x's rule is stricter than 1.x's:** besides `runCatching { <suspend call> }` it reports a `catch` of `CancellationException`
  or any supertype (`Exception`, `Throwable`) around a suspend call inside a suspend function unless `CancellationException` is
  rethrown first or `ensureActive()` is called first. The internal `suspendCatching` must be written in a shape the rule accepts.
- **Source rule that follows from the version skew:** the code detekt analyses must not use a language feature that exists only
  from Kotlin 2.5 (for example the `(val x, val y)` name-based destructuring form) while detekt's compiler is 2.4.10; each use is a
  counted compiler error in detekt, and the files are analysed with reduced accuracy. Move the pin to the first detekt built on
  Kotlin 2.5.0 when it ships.
- **Neither organisation build that was searched runs detekt**, so there is no organisation precedent to copy.

## 3. Findings

### F1. The rule needs type resolution (Established: source and documentation agree)

- 1.23.8: `SuspendFunSwallowedCancellation` is annotated `@RequiresTypeResolution` and calls `expression.getResolvedCall(bindingContext)`
  to identify `kotlin.runCatching` and every suspend call inside it. Source: [`SuspendFunSwallowedCancellation.kt` at v1.23.8](https://github.com/detekt/detekt/blob/v1.23.8/detekt-rules-coroutines/src/main/kotlin/io/gitlab/arturbosch/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt).
- 2.0.0-alpha.6: the class implements `RequiresAnalysisApi` and uses `analyze { resolveToCall() }`. Source: [`SuspendFunSwallowedCancellation.kt` at v2.0.0-alpha.6](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-rules-coroutines/src/main/kotlin/dev/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt).
  The rule page lists "Requires Type Resolution: Yes" and "Active by default: No" ([detekt.dev rules/coroutines](https://detekt.dev/docs/rules/coroutines), 2.0.0-alpha.6).
  The default branch has no commit touching the coroutines rule set's `SuspendFunSwallowedCancellation` after alpha.6 (the only recent addition there is `MissingStackTraceRecoverable`, 2026-11-04; read 2026-11-22).
- Default state: `SuspendFunSwallowedCancellation: active: false` under `coroutines:` in both lines'
  [`default-detekt-config.yml` (v2.0.0-alpha.6)](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/resources/default-detekt-config.yml).

### F2. Without a classpath the rule is skipped silently (Established: source)

- 1.23.8 filters out any `@RequiresTypeResolution` rule when `bindingContext == BindingContext.EMPTY` and logs "The rule '…' requires
  type resolution but it was run without it." through `settings.debug` only
  ([`Analyzer.kt` at v1.23.8](https://github.com/detekt/detekt/blob/v1.23.8/detekt-core/src/main/kotlin/io/gitlab/arturbosch/detekt/core/Analyzer.kt)).
- 2.0.0-alpha.6 does the same in "light" mode: `executable = … AnalysisMode.light -> rule !is RequiresAnalysisApi`, and `active && executable` decides
  whether the rule runs ([`RuleDescriptor.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/RuleDescriptor.kt)).
  The Gradle plugin passes `--analysis-mode light` when the task's classpath is empty and `full` otherwise
  ([`CliArgument.kt`, `ClasspathArgument`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/invoke/CliArgument.kt)).
- Consequence: no exit code or report line tells a reader the rule did not run. Only a seeded violation proves it runs.

### F3. Which tasks have a classpath, and which are on `check` (Established: docs and source, both lines)

- The documentation: "`detekt` - Runs detekt WITHOUT type resolution", "`detektMain` - Runs detekt with type resolution on the `main`
  source set", "`detektTest` - … on the `test` source set"
  ([type-resolution.mdx at v2.0.0-alpha.6](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/gettingstarted/type-resolution.mdx)).
- In 2.x the type-resolving tasks are generated per Kotlin compilation (`DetektJvmCompilations.registerTasks` iterates
  `KotlinJvmExtension.target.compilations`; the task name is `detekt` plus the capitalised compilation name), so a compilation for each
  extra test set gets its own `detekt<Name>` task
  ([`DetektJvmCompilations.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/internal/DetektJvmCompilations.kt),
  [`SharedTasks.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/internal/SharedTasks.kt)).
  That a Gradle JVM test suite's source set becomes a Kotlin compilation is read from this code, not run (see Gaps).
- The only `check` wiring in the plugin is `DetektPlain`: `tasks.matching { it.name == LifecycleBasePlugin.CHECK_TASK_NAME }.configureEach { it.dependsOn(detektTaskProvider) }`
  for the plain `detekt` task ([`DetektPlain.kt` at v2.0.0-alpha.6](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/internal/DetektPlain.kt);
  identical in [v1.23.8](https://github.com/detekt/detekt/blob/v1.23.8/detekt-gradle-plugin/src/main/kotlin/io/gitlab/arturbosch/detekt/internal/DetektPlain.kt)).
- `detektMain` compiles first on its own: its `classpath` convention is `compilation.output.classesDirs` plus the compile task's `libraries`,
  so Gradle orders `compileKotlin` before it.
- The Kotlin Gradle plugin API the detekt plugin calls is unchanged by 2.5.0-RC: the ABI dump of `kotlin-gradle-plugin-api` lists
  `KotlinJvmExtension.getTarget`; `KotlinCompilation.getCompileTaskProvider`, `getAllKotlinSourceSets` and `getOutput`;
  `KotlinCompileTool.getLibraries`; `BaseKotlinCompile.getFriendPaths` and `getMultiPlatformEnabled`; and `ExplicitApiMode.Strict`, in both 2.4.21 and 2.5.0-RC. The members that
  disappear between the two are limited to the multiplatform DSL's experimental dependency collectors and a few related members (for example `withWatchosArm32` and `DisableCacheInKotlinVersion$2_3_20`)
  ([`kotlin-gradle-plugin-api.api` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/api/kotlin-gradle-plugin-api.api),
  compared with the same file at v2.4.21). That is a public-API comparison, not a run (Gaps).

### F4. Kotlin version skew: 1.23.8 cannot read a Kotlin 2.2 or 2.5 classpath; 2.x embeds Kotlin 2.4.10 (Established for the mechanism; the effect on this rule is inference)

- detekt's own compatibility table: `1.23.8 | Gradle 8.12.1 | Kotlin 2.0.21 | AGP 8.8.1 | target 1.8 | JDK 21`; 2.0.0-alpha.6 is built
  against Kotlin 2.4.10 and Gradle 9.6.1 ([compatibility](https://detekt.dev/docs/introduction/compatibility), page documents 2.0.0-alpha.6).
  The same page: "we commit to support only the **latest stable versions** and related RC versions".
- The 1.x line's type resolution runs the K1 compiler of its own version inside the isolated `detekt` configuration. The project's
  libraries (including kotlin-stdlib) are passed as the classpath, together with `-no-stdlib`. Kotlin's metadata reader accepts the
  compiler's own metadata version plus one minor: in 2.0.21 `INSTANCE = JvmMetadataVersion(2, 0, 0)` and `INSTANCE_NEXT` is 2.1.0
  ([`JvmMetadataVersion.kt` at v2.0.21](https://github.com/JetBrains/kotlin/blob/v2.0.21/core/metadata.jvm/src/org/jetbrains/kotlin/metadata/jvm/deserialization/JvmMetadataVersion.kt)).
  `kotlin-stdlib` 2.5.0-RC carries metadata at most 2.5.0 (its compiler's own version is 2.5.0, F14), so a 2.0.21 reader is two minors short.
- Measured on 2026-11-18: the classes of `kotlin-stdlib-2.2.21.jar` from Maven Central (`kotlin/Unit.class`, `kotlin/ResultKt.class`, the
  latter holding `runCatching`) carry `mv=[2,2,0]` (`javap -v` of the class files). Metadata 2.2.0 is above 2.1.0. No equivalent
  measurement exists for the 2.5.0-RC jar (Gaps).
- The symptom is documented for the same mechanism one minor later: with 1.23.8 on Kotlin 2.3.0 the reporter sees "hundreds of
  these errors: error: class 'kotlin.Unit' was compiled with an incompatible version of Kotlin. The actual metadata version is 2.3.0, but the
  compiler version 2.0.0 can read versions up to 2.1.0", "a ton of false positives across many different rules", and the maintainer closes
  the issue: "there are unfortunately no updates planned for the 1.x line" ([detekt#8865](https://github.com/detekt/detekt/issues/8865), 2025-11).
  The same arithmetic holds for 2.2.0 or 2.5.0 metadata against a 2.1.0 reader. I found no first-hand run of 1.23.8 on Kotlin 2.2 or later.
  The consequence for this rule (an unresolved `kotlin.runCatching` produces no `getResolvedCall`, so no finding) is an inference from the rule's
  source, not an observation. That is the worst failure mode for this build: a green `check` and a rule that sees nothing.
- 2.x's own constraint on the project's Kotlin version is only what its command line accepts: "it only accepts API & language versions that are supported by
  the compiler (currently 2.0 to 2.5)" ([detekt#9410](https://github.com/detekt/detekt/pull/9410), merged 2026-06-17). The build's 2.5 is the top of that
  range (F12, F13).
- The Gradle plugin is compiled against `kotlin-gradle-plugin-api` 2.1.0 as `compileOnly`
  ([`libs.versions.toml`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/gradle/libs.versions.toml), `kotlin-gradlePluginApi`), so it calls KGP types that exist in
  2.2.x and, by F3, in 2.5.0-RC. Its own build and tests run KGP 2.4.10 to 2.4.21.
- What a mismatch looks like in the other direction: if the build forces a Kotlin version onto every configuration (for example a
  `resolutionStrategy.eachDependency` over `org.jetbrains.kotlin`), the `detekt` configuration's compiler changes and the CLI aborts with
  "detekt was compiled with Kotlin X but is currently running with Y". The documented remedy is to exclude that configuration:
  `configurations.matching { it.name != "detekt" }.all` ([gradle.mdx, "Gradle runtime dependencies"](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/gettingstarted/gradle.mdx)).
  This matters more now: aligning the build's Kotlin 2.5.0-RC onto the `detekt` configuration would replace detekt's 2.4.10 compiler with the RC.
- One documentation conflict: the 2.x migration guide's "Minimum supported versions" table lists Kotlin "2.4" for detekt 2.0.x
  ([migrationguide.mdx](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/introduction/migrationguide.mdx)), while the compatibility page shows 2.4.10 as the version
  detekt is built against, and public builds run alpha.6 on Kotlin 2.2.21 and 2.5.0-RC (F6, F18). Read the table's "2.4" as the build version of detekt's own analysis engine, not a ceiling on the project (inference).

### F5. detekt 2.0.0-alpha.6 is the newest 2.x release; no stable 2.0.0; no release or snapshot on Kotlin 2.5 (Established: releases, Maven metadata, repository state, read 2026-11-22)

- GitHub releases, newest first: `v2.0.0-alpha.6` 2026-08-04, `alpha.5` 2026-06-17, `alpha.4` 2026-06-13, `alpha.3` 2026-04-24, `alpha.2` 2026-01-27, `alpha.1` 2025-10-21,
  `alpha.0` 2025-09-04; the last stable is `v1.23.8` 2025-02-21 ([releases](https://github.com/detekt/detekt/releases)).
  The Gradle plugin portal metadata for `dev.detekt:dev.detekt.gradle.plugin` lists `2.0.0-alpha.0` to `2.0.0-alpha.6`, `release` = alpha.6, last updated 2026-08-04
  ([maven-metadata.xml](https://plugins.gradle.org/m2/dev/detekt/dev.detekt.gradle.plugin/maven-metadata.xml)). The default branch's latest commits (up to 2026-11-20) are rule changes and dependency updates.
- The default branch still pins the engine to Kotlin 2.4.10: `kotlin-analysisApi = "2.4.10"`, with `kotlin-compiler` on `version.ref = "kotlin-analysisApi"`
  ([`gradle/libs.versions.toml`, default branch](https://github.com/detekt/detekt/blob/main/gradle/libs.versions.toml), read 2026-11-22).
- Snapshots: the `Deploy Snapshot` workflow publishes on every push to the default branch (`./gradlew publishToMavenCentral -Dsnapshot=true`), and the Central snapshot repository lists one
  floating version, `main-SNAPSHOT` (last updated 2026-11-20 19:06 UTC, for `dev.detekt:detekt-core`, `detekt-gradle-plugin` and `dev.detekt.gradle.plugin`)
  ([deploy-snapshot.yaml](https://github.com/detekt/detekt/blob/main/.github/workflows/deploy-snapshot.yaml),
  [detekt-core metadata](https://central.sonatype.com/repository/maven-snapshots/dev/detekt/detekt-core/maven-metadata.xml)). It is built from the default branch, so it is on Kotlin 2.4.10 as well.
- The move to Kotlin 2.5 is open work: [#9786 "Update to Kotlin 2.5.0"](https://github.com/detekt/detekt/issues/9786) says "Project depends on 2.4.10 due to incompatible changes introduced in 2.4.20." and "The supported path is to migrate to official Kotlin Analysis API artifacts which will be available in 2.5.0 for the first time."
  Its blockers are a ktlint release on Kotlin 2.5.0, KT-91146 in a release ("Currently scheduled for 2.5.0-RC") and the Maven Central publication of the Analysis API artifacts (ticked).
  The change itself, [#9888 "Update to Kotlin 2.5.0 and migrate to official Analysis API dependencies"](https://github.com/detekt/detekt/pull/9888), is a draft labelled `blocked` and `breaking change`, last updated 2026-11-14, "Blocked by: ktlint2 including an update to 2.5.0 … detekt updating to ktlint2: #9708 …".
  ktlint's own update to Kotlin 2.5.0 ([ktlint#3436](https://github.com/ktlint/ktlint/pull/3436)) merged on 2026-11-22; [detekt#9708](https://github.com/detekt/detekt/pull/9708) (ktlint2) is open. No date for a detekt release is stated anywhere I found.
- KT-91146 is a Kotlin Analysis API regression in 2.5.0-Beta2 that detekt's maintainer reported as "a blocker for upgrading to 2.5.0"; JetBrains replies "The issue should be fixed in the upcoming 2.5.0-RC" ([KT-91146](https://youtrack.jetbrains.com/issue/KT-91146)). It affects detekt only once detekt embeds Kotlin 2.5.
- The 2.0.0 milestone is open (30 open, 1302 closed issues on 2026-11-18) ([milestone 42](https://github.com/detekt/detekt/milestone/42)).
- The project's changelog: "Detekt 2.0.0 is still in alpha. While it's stable enough to use in your projects, you can expect further breaking changes before we
  reach a stable release." ([changelog-2.0.0.mdx](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/src/pages/changelog-2.0.0.mdx)). The 2.5.0 migration is tagged `breaking change` because third-party rule sets depend on the Analysis API packages; this build uses only built-in rule sets.
- The alpha line changes the rule's behaviour between releases: `SuspendFunSwallowedCancellation` was revised in alpha.2 (#8950), alpha.4 (#9208, #9256) of the same changelog.
- alpha.6's own toolchain: "It's built against Kotlin 2.4.10, Gradle 9.6.1, AGP 9.3.1 and is tested against JDK 25." ([release notes](https://github.com/detekt/detekt/releases/tag/v2.0.0-alpha.6)).
  It requires JDK 17 to run (migration guide table "JDK (to run detekt) | 8 | 17"), so JDK 21 is fine.
- Kotlin itself: the Maven Central metadata of `kotlin-gradle-plugin` lists `2.5.0-Beta1`, `2.5.0-Beta2` and `2.5.0-RC` with `<release>2.5.0-RC</release>`, last updated 2026-11-11; there is no 2.5.0
  ([maven-metadata.xml](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/maven-metadata.xml), read 2026-11-22).

### F6. Public builds run alpha.6 on Kotlin 2.2.x and on Gradle 9.7 or newer (Common practice, three repositories, read 2026-11-18)

- `kpavlov/kt-schema`: `detekt = "2.0.0-alpha.6"`, `kotlin = "2.2.21"` in `gradle/libs.versions.toml`, Gradle `9.9.1`, `org.gradle.configuration-cache=true` and `detekt.use.worker.api = true` in
  `gradle.properties`; its convention script has `tasks.named("detekt").configure { dependsOn("detektMainJvm", "detektTestJvm") }`. Its `Build` workflow (`make ci`, which runs `check`) is
  green on 2026-11-14 ([libs.versions.toml](https://github.com/kpavlov/kt-schema/blob/f24bb24/gradle/libs.versions.toml)). Its run of 2026-11-21 prints no "compiler errors found during analysis" line (read 2026-11-22).
- `DataDog/dd-sdk-kotlin-multiplatform`: `kotlin = "2.2.21"`, `detekt = "2.0.0-alpha.6"`, Gradle 9.5.1.
- `modelcontextprotocol/kotlin-sdk`: `detekt = "2.0.0-alpha.6"`, Kotlin 2.4.21, Gradle 9.8.2; its convention script `mcp.detekt.gradle.kts` makes `detekt` depend on `detektMainJvm`, and its build-logic
  declares `implementation(libs.detekt.gradle)` for `dev.detekt:detekt-gradle-plugin`. Its run of 2026-11-20 prints the "compiler errors" line once, so the line is not specific to Kotlin 2.5.
- `ReactiveCircus/cache4k` (Kotlin 2.4.20, alpha.6, Gradle 9.9.1) applies `DetektPlugin` from a convention plugin and runs `./gradlew check && ./gradlew -p build-logic detekt` in CI.
- I did not run any of these builds. The Kotlin 2.2.21 plus alpha.6 facts are from their version files and CI status, and kt-schema's configuration is the closest match to this build.

### F7. Gradle 9.7.1, JDK 21 and the configuration cache (Established for the cache; Common practice for Gradle 9.7)

- The plugin declares configuration-cache compatibility ("Declare DGP compatibility with Gradle's configuration cache", #9311, alpha.4) and has a TestKit spec that stores and reuses a cache entry
  for `detekt`, `detektBaseline` and `detektGenerateConfig`
  ([`ConfigurationCacheSpec.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/functionalTest/kotlin/dev/detekt/gradle/ConfigurationCacheSpec.kt)). It does not test `detektMain`
  on its own; the generated per-compilation tasks use the same `Detekt` class. The alpha.4 and alpha.5 publication problems that surfaced as configuration-cache errors
  (#9390, #9415) were a POM dependency that did not exist and a slow publication, closed within a day each.
- Gradle 9.7: one open-then-closed report, [detekt#9742](https://github.com/detekt/detekt/issues/9742) (closed 2026-11-07), concerns a Gradle 9.7 deprecation for an Android build's artifact transform, not a pure JVM module.
  `Configuration.setVisible()` will be deprecated in Gradle 9.8 ([#9558](https://github.com/detekt/detekt/issues/9558), closed 2026-08-07, to be gated by version). I found no Gradle 9.7.1 problem for a plain JVM module.
- The documentation says the plugin needs Gradle 6.8.3 or higher; nothing in alpha.6 sets a ceiling.
- The `Detekt` task reads `project.providers` only in its constructor, which is configuration time, so it adds no execution-time `Project` access.
- The Worker API flag is read through `providers.gradleProperty("detekt.use.worker.api").getOrElse("false")`, so it defaults to off in alpha.6; the 2.x docs say "`false` by default". The migration guide's
  sentence "The Worker API is now used by default" contradicts the source; the source and `gradle.mdx` agree with each other.

### F8. Configuration file location, defaults, baseline (Established: source and docs)

- The plugin looks for `config/detekt/detekt.yml` at the root of the build: `CONFIG_DIR_NAME = "config/detekt"`, `CONFIG_FILE = "detekt.yml"`, and sets `extension.config` to it when the file exists
  ([`DetektBasePlugin.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/DetektBasePlugin.kt)).
- `buildUponDefaultConfig` is `false` by default. "When using a custom config file, the default values are ignored unless you also set the `--build-upon-default-config` flag"
  ([configurations.mdx](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/introduction/configurations.mdx)). In `ProcessingSpecSettingsBridge.workaroundConfiguration` the default configuration is
  merged only `if (configSpec.useDefaultConfig || config === Config.empty)`. A config file without that flag therefore runs only the rules it lists.
  `modelcontextprotocol/kotlin-sdk` shows the trap in practice: its `config/detekt/detekt.yml` is a copy of the defaults with `SuspendFunSwallowedCancellation: active: false`.
- Severity: "By default, all findings have a severity of `error`" and "_detekt_ will fail your build if there is at least one issue with a severity of error"; the plugin's `failOnSeverity` defaults to `Error` and
  `ignoreFailures` to `false` (same page; `DetektBasePlugin.kt` constants). The 1.x `maxIssues` threshold is gone in 2.x.
- Baseline: `baseline` is `@Optional`; the plugin resolves a file named `detekt-baseline.xml` in the module directory, or its per-compilation variant `detekt-baseline-main.xml`, and passes none when neither exists
  (`existingVariantOrBaseFile` returns `null`). A new code base has no findings to record and needs no baseline.

### F9. Modules with no main source (Established: source)

- `Detekt.getSource()` is annotated `@InputFiles @SkipWhenEmpty @IgnoreEmptyDirectories`, so a task whose source tree is empty finishes `NO-SOURCE` with success and writes no report
  ([`Detekt.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/Detekt.kt)). The plain task's source is only the default directories that exist
  (`existingInputDirectoriesProvider`). `detektMain` takes its source from `compilation.allKotlinSourceSets`, so a module with no `src/main/kotlin` skips both. The same annotation is on the 1.23.8 task.
- The task still depends on `compileKotlin` through its classpath input, which is itself `NO-SOURCE` for such a module.

### F10. The 2.x rule is stricter than the 1.x rule (Established: source)

- 1.23.8 only visits `runCatching` calls. 2.0.0-alpha.6 also visits every `try` expression inside a suspend function whose `try` block contains a suspend call. If a `catch` parameter's type is `CancellationException` or a
  supertype of it (`Exception`, `Throwable`), the clause is reported unless it rethrows that exception first or begins with `if (e is CancellationException) currentCoroutineContext().ensureActive()`.
  The rule's own documentation lists `catch (e: IllegalStateException) { … }` as non-compliant ("catches CancellationException implicitly, since IllegalStateException is a super-class. Should be explicit")
  ([rule source, `visitTryExpression`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-rules-coroutines/src/main/kotlin/dev/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt)).
- The rule matches `runCatching` by callable id `kotlin.runCatching`, so an internal `suspendCatching` is not flagged for its name; its own `try`/`catch` is checked when the enclosing function is a `suspend` function.

### F11. Known problems of the alpha that touch this build (Established: open issues, states read 2026-11-22)

- [detekt#9793](https://github.com/detekt/detekt/issues/9793) (open, 2026-10-11): with the daemon reused and `kotlin.environment.keepalive` set, a project dependency's jar rebuilt between two builds is read as the
  first build left it, and `detektMain` reports a new class as unresolved. The reporter's account: "With the Worker API, detekt runs in a worker process, where neither tool sets the property, and the reproducer passed every time."
  A fix, [#9794](https://github.com/detekt/detekt/pull/9794), is open and unmerged. Effect here: local multi-module runs in a warm daemon can report false findings; a CI run from a clean clone starts a fresh daemon and is unaffected.
- [detekt#9121](https://github.com/detekt/detekt/issues/9121) (open): random compiler failures with `parallel = true`; the plugin default is `false`.
- [detekt#9297](https://github.com/detekt/detekt/issues/9297) (open): `findFirCompiledSymbol only works on compiled declarations` in `detektTest`, traced in the thread to the ktlint-wrapper rule set with an `ignoreAnnotated` option in full mode.
  Neither applies unless the ktlint wrapper is added.
- [detekt#9362](https://github.com/detekt/detekt/issues/9362) (open, updated 2026-11-22): "ArrayPrimitive rule crashes with InvalidFirElementTypeException when analysis has unresolved types — regression from v1". It shows that
  a classpath with unresolved types can make a rule throw instead of skip; the crash needs unresolved types, which is the condition F16 counts.

### F12. The language and API version reach detekt's compiler from the compile task (Established: source; the settable-from-the-build part is read from the task's public properties)

- Each `detekt<Compilation>` task (and each `detektBaseline<Compilation>` task) takes `apiVersion` and `languageVersion` from the sibling compile task's `compilerOptions`:
  `detektTask.languageVersion.convention(siblingTask.flatMap { task -> task.compilerOptions.languageVersion.map { it.version } })`, and the same for `apiVersion`, `jvmTarget`, `freeCompilerArgs`, `optIn` and `noJdk`
  ([`SharedTasks.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/internal/SharedTasks.kt)).
  A convention yields no value when the compile task's property is unset (inference: the Kotlin Gradle plugin gives `languageVersion` no default, and the Kotlin documentation's default cell for it is blank), and then detekt passes no `-language-version`.
- The Kotlin documentation says "`kotlin.compilerOptions` configures every Kotlin compilation task in the project", so one `kotlin { compilerOptions { languageVersion = KOTLIN_2_5; apiVersion = KOTLIN_2_5 } }`
  reaches every compile task and, through the convention above, every detekt task ([gradle-compiler-options](https://kotlinlang.org/docs/gradle-compiler-options.html), read 2026-11-22).
- The properties are public and optional inputs of the task: `@get:Input @get:Optional abstract val languageVersion: Property<String>` and `apiVersion`, next to `jvmTarget`, `freeCompilerArgs`, `optIn` and a `debug: Property<Boolean>`
  ([`Detekt.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/Detekt.kt)). A build can therefore set them on the detekt tasks; the plugin's documentation page does not describe them.
- The task passes them as `--language-version <v>` and `--api-version <v>` ([`CliArgument.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/invoke/CliArgument.kt)),
  the CLI checks each with `LanguageVersion.fromFullVersionString` and `!isUnsupported` and fails the task with `"…" passed to --language-version, expected one of […]` otherwise
  ([`ArgumentConverters.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-cli/src/main/kotlin/dev/detekt/cli/ArgumentConverters.kt)), and the core then hands the values, with `-jvm-target` and the free arguments, to the embedded compiler's own argument parser
  and `setupLanguageVersionSettings` ([`KotlinEnvironmentUtils.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/parser/KotlinEnvironmentUtils.kt)).
  The result becomes the source module's `languageVersionSettings` in the Analysis API session
  ([`EnvironmentAware.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/settings/EnvironmentAware.kt)).

### F13. Language version 2.5 under a Kotlin 2.4.10 compiler: accepted, a warning, silent by default (Established: source of Kotlin v2.4.10 and detekt alpha.6; behaviour not run)

- Kotlin 2.4.10 knows 2.5 as a language version and calls it experimental: the `LanguageVersion` enum has `KOTLIN_2_5(2, 5)`, `LATEST_STABLE = KOTLIN_2_4`, and the status comment reads "2.2..2.4 … 2.5 / STABLE ---> EXPERIMENTAL"
  ([`LanguageVersionSettings.kt` at v2.4.10](https://github.com/JetBrains/kotlin/blob/v2.4.10/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt)).
  detekt's CLI check therefore accepts `2.5` (it rejects only unsupported versions, F12). The detekt change that set the accepted range says "currently 2.0 to 2.5" (#9410).
- For an experimental version the compiler's configurator reports the diagnostic `EXPERIMENTAL_LANGUAGE_VERSION` ("Language version 2.5 is experimental, there are no backwards compatibility guarantees for new language and library features. Use the stable version 2.4 instead."),
  declared `strongWarningWithoutSource()`, so it is a warning and not an error
  ([`CommonCompilerArgumentsConfigurator.kt`](https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/cli/cli-base/src/org/jetbrains/kotlin/cli/common/arguments/CommonCompilerArgumentsConfigurator.kt),
  [`CliDiagnostics.kt`](https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/cli/cli-base/src/org/jetbrains/kotlin/cli/CliDiagnostics.kt)).
- detekt routes the compiler's messages to a `PrintingMessageCollector` on a stream that is a no-op unless `debug` is on: `private val printStream = if (loggingSpec.debug) loggingSpec.errorChannel.asPrintStream() else NullPrintStream`.
  So by default the warning is not shown; with `detekt { debug = true }` it is. That it is not counted in F16's total is an inference from the two code paths being separate.
- Unknown `-X…` flags in the compile task's `freeCompilerArgs` do not stop detekt: the Kotlin 2.4.10 argument parser records them as `unknownExtraFlags`, and `validateArguments`, which detekt calls and turns into an exception, reports only `unknownArgs` ("Invalid argument: …"), i.e. unknown arguments that do not start with `-X`
  ([`parseCommandLineArguments.kt` at v2.4.10](https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/cli/cli-base/src/org/jetbrains/kotlin/cli/common/arguments/parseCommandLineArguments.kt)).
  A flag that Kotlin 2.5 adds and 2.4.10 lacks is tolerated as long as it is an `-X` flag.
- A source file that uses a Kotlin 2.5 language feature the embedded compiler has switched off: Kotlin 2.5.0-RC enables `NameBasedDestructuring(sinceVersion = KOTLIN_2_5)`, while Kotlin 2.4.10 has `NameBasedDestructuring(sinceVersion = null)`, i.e. off at every language version without a flag
  ([RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt)). The Kotlin documentation lists name-based destructuring (`(val x, val y)`, "`only-syntax` mode, which is now the default") as stable in 2.5.0-RC,
  and companion blocks and extensions, and full value classes, as experimental behind flags ([What's new in Kotlin 2.5.0-RC](https://kotlinlang.org/docs/whatsnew-eap.html), read 2026-11-22).
  Using a feature that 2.4.10 has off yields a compiler error diagnostic in detekt's session; F16 shows what detekt does with it. What the 2.4.10 parser does with a syntax form it does not know is not established (Gaps).

### F14. Reading `kotlin-stdlib` 2.5.0-RC and the project's own 2.5 classes from a 2.4.10 compiler (Established: source for the rules; their application to the RC jar is inference, nothing was run or measured)

- Metadata window: Kotlin 2.4.10 has `MetadataVersion.INSTANCE = MetadataVersion(2, 4, 0)` and the comment "Compiler of deployVersion X (INSTANCE) with LV Y (metadataVersionFromLanguageVersion) can read metadata with version <= max(X+1, Y)"
  ([`MetadataVersion.kt` at v2.4.10](https://github.com/JetBrains/kotlin/blob/v2.4.10/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt)). Kotlin 2.5.0-RC has `INSTANCE = MetadataVersion(2, 5, 0)`, so the classes the RC compiler writes carry at most 2.5.0
  (inference: a compiler writes its own version or the language version's, whichever is lower). A 2.4.10 reader's limit is `INSTANCE_NEXT` = 2.5.0, so metadata 2.5.0 is readable.
- Pre-release classes: the class-file provider reports an error on pre-release classes only when `!getFlag(AnalysisFlags.skipPrereleaseCheck) && !isPreRelease() && !KotlinCompilerVersion.isPreRelease()`
  ([`JvmClassFileBasedSymbolProvider.kt` at v2.4.10](https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/fir/fir-jvm/src/org/jetbrains/kotlin/fir/java/deserialization/JvmClassFileBasedSymbolProvider.kt)), where for a language version `isPreRelease` is true if the version is not stable,
  and otherwise only when the compiler itself is flagged pre-release and the version is its latest stable ([`LanguageVersionSettings.kt`](https://github.com/JetBrains/kotlin/blob/v2.4.10/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt)).
- A classpath library is read in a library session whose language version settings are the project-global ones for libraries, which default to `LanguageVersionSettingsImpl.DEFAULT`, the latest stable version of the embedded compiler (2.4);
  detekt's session builder sets the language version settings only on the source module, and no override of `libraryLanguageVersionSettings` or `globalLanguageVersionSettings` appears in detekt
  ([`KotlinProjectStructureProvider.kt` at v2.4.10](https://github.com/JetBrains/kotlin/blob/v2.4.10/analysis/analysis-api-platform-interface/src/org/jetbrains/kotlin/analysis/api/platform/projectStructure/KotlinProjectStructureProvider.kt);
  absence in detekt established by code search on 2026-11-22). So for classpath classes the pre-release check is active (2.4.10 is a release compiler and 2.4 is stable): a class flagged pre-release is invisible and its uses are unresolved.
  The module's own 2.5 setting does not lift it for libraries (inference from the two defaults above).
- Whether the classes the build and the RC produce carry that flag: the RC tag sets `IS_PRE_RELEASE = false` in `KotlinCompilerVersion`, with the comment "Binaries produced by this compiler with that language version (or any future language version) are going to be marked as "pre-release" and will not be loaded by release versions of the compiler."
  ([`KotlinCompilerVersion.java` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/compiler.version/src/org/jetbrains/kotlin/config/KotlinCompilerVersion.java)), and the RC's `LATEST_STABLE` is `KOTLIN_2_5`
  ([`LanguageVersionSettings.kt` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt)).
  By the rule above, output compiled by the RC at language version 2.5 is therefore not flagged, unless a feature that forces pre-release binaries is on (experimental features such as companion blocks do; the build uses none). This is inference from the source; the flag in the RC's own `kotlin-stdlib` classes was not measured.
- Evidence that a pre-release flag does cost detekt analysis: [detekt#8639](https://github.com/detekt/detekt/issues/8639) (2.0.0-alpha.0) reports "There were 158 compiler errors found during analysis" with hundreds of "was compiled by a pre-release version of Kotlin" messages from the reporter's own modules, which enabled several experimental compiler flags;
  a maintainer says the unstable features mark binaries pre-release and that "some rules could not catch some errors because of that"; the reporter's `-Xskip-prerelease-check` did not remove them; the report was closed as stale (2026-02-06).

### F15. A non-fatal signal is all detekt gives (Established: source)

- When the analysis mode is `full`, `Lifecycle.analyze` runs `validateClasspath`, which collects every error-severity diagnostic of every file (`KaDiagnosticCheckerFilter.ONLY_COMMON_CHECKERS`) into a `DetektMessageCollector`, prints each message at debug level, and at the end prints, through the info channel,
  "There were $messages compiler errors found during analysis. This affects accuracy of reporting." plus, when `debug` is off, a hint to turn it on
  ([`Lifecycle.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/tooling/Lifecycle.kt),
  [`DetektMessageCollector.kt`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/parser/DetektMessageCollector.kt)).
  The rules then run regardless; no exit code or finding comes from the count. I found no setting that turns the count into a failure.
- That makes every cause F13 and F14 name (a 2.5-only feature switched off, an unresolvable class) invisible to `check`'s result and visible only as that line in the task output, and with `debug = true` as the full messages.

### F16. A public Kotlin 2.5.0-RC build with detekt alpha.6 and type-resolved tasks (Common practice, one repository; CI read 2026-11-22)

- `respawn-llc/FlowMVI` (multiplatform library, `kotlin = "2.5.0-RC"`, `detekt = "2.0.0-alpha.6"`, no explicit language version) applies `dev.detekt` to its published modules and makes `detektAll` depend on
  `it.name == "detektMainJvm" || it.name == "detektMainAndroid"` ([`build.gradle.kts`](https://github.com/respawn-llc/FlowMVI/blob/0a11cd94/build.gradle.kts), [`gradle/libs.versions.toml`](https://github.com/respawn-llc/FlowMVI/blob/0a11cd94/gradle/libs.versions.toml)).
  Its CI run `./gradlew detektAll` on 2026-11-22 passes and prints "There were 9 compiler errors found during analysis. This affects accuracy of reporting." and the same line with 9, 12, 12, 2, 2, 3 and 3
  ([CI run 45072755595](https://github.com/respawn-llc/FlowMVI/actions/runs/45072755595)). The cause is not shown (no `debug`), the build is multiplatform, and the repository moved to Kotlin 2.5.0-RC two commits after moving to detekt 2, so the counts cannot be attributed to Kotlin 2.5.
- Because that build leaves the language version unset, detekt receives none and its 2.4.10 compiler defaults to 2.4 (F12): it is the case F14 describes as the one with the pre-release check active for the classpath. This build sets the language version explicitly, which only changes what the *source* module is analysed at (F12, F14).
- `teobaranga/monica`, `ReactiveCircus/kstreamlined-mobile` and `fenakhay/kwikibot` also pair Kotlin 2.5.0-RC with alpha.6, but their CI runs only the plain `detekt` task (no type resolution), so they say nothing about this build.
  I found no public pure-JVM (`kotlin("jvm")`) build running `detektMain` on 2.5.0-RC.

### F17. Kotlin 2.5.0-RC's own language-level changes that touch the analysed code (Common practice from the release notes)

- 2.5.0-RC stabilises name-based destructuring, an unused-return-value checker and improved compile-time constants, and adds experimental companion blocks and extensions and full value classes behind `-Xcompanion-blocks-and-extensions` and `-Xfull-value-classes`
  ([What's new in Kotlin 2.5.0-RC](https://kotlinlang.org/docs/whatsnew-eap.html), published 2026-11-11). The repository's paradigm needs none of them (OOP for the domain model, functional transformation of data, `Result` for expected failures); the build should not enable the experimental flags.

## 4. How comparable projects do it

| Project (pinned) | detekt | How it joins `check` | Config |
|---|---|---|---|
| `kpavlov/kt-schema` @ `f24bb24` | `dev.detekt` 2.0.0-alpha.6, Kotlin 2.2.21, Gradle 9.9.1, configuration cache on, worker API on | `tasks.named("detekt").configure { dependsOn("detektMainJvm", "detektTestJvm") }`; the plain `detekt` task is already on `check` | `detekt.yml` at root, `buildUponDefaultConfig = true`, `failOnSeverity = Warning` |
| `modelcontextprotocol/kotlin-sdk` (default branch) | `dev.detekt` 2.0.0-alpha.6, Kotlin 2.4.21, Gradle 9.8.2; build-logic `implementation(libs.detekt.gradle)` | `tasks.named("detekt") { dependsOn("detektMainJvm") }` inside `pluginManager.withPlugin("org.jetbrains.kotlin.multiplatform")` | `config/detekt/detekt.yml` (full copy, `buildUponDefaultConfig = false`), `SuspendFunSwallowedCancellation` inactive, `parallel = true` |
| `ReactiveCircus/cache4k` (default branch) | `dev.detekt` 2.0.0-alpha.6 applied from a build-logic convention plugin, Kotlin 2.4.20 | plain `detekt` through `check`; CI also runs `./gradlew -p build-logic detekt` | `detekt.yml` at root, `buildUponDefaultConfig = true` |
| `respawn-llc/FlowMVI` @ `0a11cd94` | `dev.detekt` 2.0.0-alpha.6, Kotlin 2.5.0-RC (language version unset), Gradle 9.9 | a whole-tree plain pass plus `detektMainJvm` / `detektMainAndroid` for the published modules, both reached by the `detektAll` task CI runs | `detekt-libraries.yml` with the library rule set, `buildUponDefaultConfig = true`, `parallel = true` |
| `ReactiveCircus/kstreamlined-mobile`, `teobaranga/monica`, `fenakhay/kwikibot` | `dev.detekt` 2.0.0-alpha.6, Kotlin 2.5.0-RC | plain `detekt` only | not read |
| `MyGameTools`, `WebTools`, `GeneralTools` (default branches) | none | none | none |

The organisation builds were searched for `detekt` across every file of the `build-logic/` directories, root `build.gradle.kts` and `settings.gradle.kts`, version catalogs and workflow files of WebTools and MyGameTools
(read 2026-11-18, zero matches in build files; WebTools' documents mention detekt in research notes only); a GitHub code search of `GeneralTools` for `detekt` on 2026-11-22 returns no match.
The plain-task-depends-on-type-resolved-tasks pattern is what two libraries do; wiring `check` directly to each compilation's task achieves the same effect and keeps the intent visible in the convention plugin.

## 5. Pitfalls and regrets

- **A green `check` with the rule never run.** The plain `detekt` task is the only detekt task on `check`; it analyses in light mode, so the rule is skipped with a debug message. Teams find out when a deliberately seeded violation
  does not fail. The build needs its own regression test: a fixture module with `runCatching { suspendCall() }` must make `check` fail with `SuspendFunSwallowedCancellation`.
- **A green `check` with the rule half-blind.** With a newer language version than detekt's compiler, or a classpath detekt's compiler refuses, the analysis continues and prints one info line (F15). FlowMVI's CI shows the line on a green Kotlin 2.5.0-RC build and nobody fails on it. The test must look for that line.
- **A config file replaces the defaults.** With `buildUponDefaultConfig = false`, only the listed rules run. Copying the whole default file makes the rule `active: false` again (kotlin-sdk's does exactly this).
- **1.23.8 on a Kotlin 2.2 or newer classpath fails silently** (F4). Users of 1.x on Kotlin 2.3 reported the failure mode only after investigating false positives; the maintainers closed the report with "no updates planned for the 1.x line".
- **The alpha moves.** Rule names, config keys, plugin id (`io.gitlab.arturbosch.detekt` to `dev.detekt`), report ids and baseline format changed between 1.x and 2.x, and the changelog warns of further breaking changes; the next release is the Kotlin 2.5 migration, tagged `breaking change`. Bump deliberately, one release at a time, with the seeded-violation test.
- **Flags forwarded to detekt's embedded compiler.** `freeCompilerArgs` and `optIn` of the Kotlin compile task are passed to detekt's own parser (`parseCommandLineArguments(args, K2JVMCompilerArguments())`, with `validateArguments(errors)` throwing).
  The build's `-Xjdk-release` and `-Xexplicit-api=strict` are standard flags, and unknown `-X` flags are tolerated (F13); a non-`-X` argument that 2.4.10 does not know would stop every detekt task. A TestKit run catches that.
- **Experimental flags poison analysis.** Enabling experimental compiler features marks the output as pre-release, and a release compiler then refuses it (F14, detekt#8639, where `-Xskip-prerelease-check` did not help). Keep the experimental flags off in this build.
- **Aligning Kotlin onto detekt's configuration.** Forcing Kotlin 2.5.0-RC onto the `detekt` configuration replaces the embedded 2.4.10 compiler and the CLI aborts; keep that configuration out of any alignment rule (F4).
- **Do not set `parallel = true`** (open #9121) and do not add the ktlint wrapper with `ignoreAnnotated` (open #9297) until those close.
- **Warm-daemon staleness** (#9793, F11) can make local multi-module `detektMain` runs report false unresolved references until the fix lands; CI is unaffected. Setting `detekt.use.worker.api=true` in `gradle.properties` is the reporter's workaround and is what kt-schema runs;
  it is untested here (Gaps).
- **Do not set a lower language version on the detekt tasks to quiet the experimental-version warning.** At 2.4 detekt's compiler would treat 2.5-only features as off in the *source* too, and nothing is gained for the classpath, whose language version is fixed by detekt (F14).

## 6. Recommendation for this repository

Pin `dev.detekt` `2.0.0-alpha.6` exactly (build-logic `implementation("dev.detekt:detekt-gradle-plugin:2.0.0-alpha.6")`, applied as `id("dev.detekt")` inside `bottools.kotlin-library`), and run the type-resolving
`detekt<Compilation>` tasks as part of `check`. Set the language and API version once on `kotlin { compilerOptions { … } }` and let detekt inherit them. Do not run the 1.23.8 line: it is stable but built on Kotlin 2.0.21, so on a Kotlin 2.2 or newer classpath it cannot read the standard library's metadata and the rule it is
being adopted for would be unreliable and silent about it. Do not use the CLI (it duplicates the plugin's classpath, jvm-target, toolchain and friend-path wiring) or the plain task (it cannot run the rule). Do not take `main-SNAPSHOT`: it is on Kotlin 2.4.10 like alpha.6, it floats, and it adds a snapshot repository to the build for no gain.

Shape of the convention plugin, as a precompiled script plugin that holds no `Project` reference at execution time (illustrative; not run):

```kotlin
plugins { id("dev.detekt") }

detekt {
    buildUponDefaultConfig = true            // default rule set stays on; config/detekt/detekt.yml only overrides
    // config file: config/detekt/detekt.yml at the repository root is picked up by default; baseline: none
}

kotlin {
    target.compilations.configureEach {
        val detektTask = "detekt" + name.replaceFirstChar { it.uppercase() }   // detektMain, detektTest, detekt<TestSet>
        tasks.named("check") { dependsOn(detektTask) }
    }
}
```

and `config/detekt/detekt.yml`:

```yaml
coroutines:
  SuspendFunSwallowedCancellation:
    active: true
```

Reasoning: (1) the rule needs a classpath, and a detekt release that reads a Kotlin 2.2 or newer classpath is only available on the 2.x line, whose newest release embeds Kotlin 2.4.10, one minor below the build; by the sources read that is enough
(language version 2.5 is accepted as experimental, metadata 2.5.0 is inside the window, and the RC does not flag its output as pre-release), but only a run can show it; (2) the plugin joins only the classpath-less task to `check`, so the wiring has to be written, once, per compilation, by name;
(3) a small override file over the defaults keeps "the rest of the default rule set" and makes the one switch visible; a copy of the defaults would hide it and would be wrong at the next alpha. Do not enable `parallel`. Keep the
reports at the plugin defaults. Leave the plain `detekt` task on `check` as the plugin wires it (it adds a quick syntax-only pass); alternatively, as kt-schema does, make `detekt` depend on the type-resolving tasks.

The build also needs these checks, which belong in the convention plugin's own tests (TestKit, as WebTools' build-logic tests its conventions). They must run on the real toolchain (Kotlin 2.5.0-RC, language and API version 2.5), because the evidence for that combination is source reading only:

- a fixture with a seeded `runCatching { suspendCall() }` makes `./gradlew check` fail and names `SuspendFunSwallowedCancellation`; `./gradlew detekt` alone does not, which proves the wiring is what makes the rule run;
- a second fixture module whose `runCatching` wraps a suspend function declared in another module of the same build also fails `check`, which proves classes compiled by the RC are resolved in detekt's library session (F14);
- the fixtures' detekt output (with `detekt { debug = true }` in the test project so that the messages show) contains no "compiler errors found during analysis" line; a non-empty count fails the test and the messages say which cause (F15);
- `./gradlew check` on a module with no main source passes (`NO-SOURCE`);
- the configuration cache stores and reuses an entry for `check`;
- the internal `suspendCatching` (and any `catch (Exception|Throwable)` around a suspend call) passes the 2.x rule: rethrow `CancellationException` in its own first `catch`, or begin the clause with the `ensureActive()` idiom.

Until detekt ships on Kotlin 2.5.0, the code detekt analyses must use no Kotlin 2.5-only language feature and no experimental compiler flag; the unit's sources (two annotation classes) use none. Move the pin to the first detekt release built on Kotlin 2.5.0 (follow
[#9786](https://github.com/detekt/detekt/issues/9786) and [#9888](https://github.com/detekt/detekt/pull/9888)) when it exists, and when the build itself moves from 2.5.0-RC to 2.5.0.

Acceptance of an alpha as the build's detekt is a build-time risk only: detekt adds no dependency to any published artifact, and `check` is the only thing a bump can break.

If a check above fails on Kotlin 2.5.0-RC, the options the evidence leaves, with their costs:

| Option | What it costs |
|---|---|
| Keep alpha.6 and wait for the first detekt built on Kotlin 2.5.0 | The rule is unproven or blind for that period; the failure model (no swallowed cancellation) would rest on review until then. No release date is stated by detekt. |
| Take `main-SNAPSHOT` | No gain: it embeds Kotlin 2.4.10 as well (F5); it floats and needs a snapshot repository. |
| Change the language version given to the detekt tasks (`languageVersion`, `apiVersion` on `Detekt`) | Does not help: libraries are read at the embedded compiler's stable version regardless (F14), and 2.5-only features would then be off in the sources too. It also splits detekt's view from the compiler's. |
| `-Xskip-prerelease-check` in the detekt tasks' `freeCompilerArgs` | The flag is honoured by the 2.4.10 class provider (F14), but the one report that tried it saw no change (detekt#8639); untested here. Useful only if a pre-release flag turns out to be the cause. |
| Analysis without type resolution | The rule does not run (F2); only a syntax-level substitute (a project-owned `suspendCatching` plus a review rule) remains. |

## 7. Load-bearing claims

1. **`SuspendFunSwallowedCancellation` needs type resolution (2.x).** Quote (source): "`class SuspendFunSwallowedCancellation(config: Config) :` … `RequiresAnalysisApi {`", and the rule page: "Requires Type Resolution" listed "Yes". Sources:
   <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-rules-coroutines/src/main/kotlin/dev/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt>, <https://detekt.dev/docs/rules/coroutines>. Applies to 2.0.0-alpha.6.
2. **The same rule needs it in 1.23.8.** Quote: "`@RequiresTypeResolution` `class SuspendFunSwallowedCancellation(config: Config) : Rule(config) {`". Source: <https://github.com/detekt/detekt/blob/v1.23.8/detekt-rules-coroutines/src/main/kotlin/io/gitlab/arturbosch/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt>. Applies to 1.23.8.
3. **Without type resolution the rules do not run.** Quote: "If you're running detekt **without** type resolution, all the rules that require type resolution **will not run**." Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/gettingstarted/type-resolution.mdx>. Applies to 2.0.0-alpha.6.
4. **Plain `detekt` is without type resolution; `detektMain` and `detektTest` are with it.** Quote: "`detekt` - Runs detekt WITHOUT type resolution" and "`detektMain` - Runs detekt with type resolution on the `main` source set". Same source as 3.
5. **Only the plain task joins `check`.** Quote: "`tasks.matching { it.name == LifecycleBasePlugin.CHECK_TASK_NAME }.configureEach {` `it.dependsOn(detektTaskProvider)`". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/internal/DetektPlain.kt>. Applies to 2.0.0-alpha.6; identical in <https://github.com/detekt/detekt/blob/v1.23.8/detekt-gradle-plugin/src/main/kotlin/io/gitlab/arturbosch/detekt/internal/DetektPlain.kt>.
6. **The rule's default is inactive.** Quote: "`SuspendFunSwallowedCancellation:` `active: false`". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/resources/default-detekt-config.yml>. Applies to 2.0.0-alpha.6 and 1.23.8.
7. **1.23.8 is built against Kotlin 2.0.21.** Quote: "This is a point release for Detekt `1.23.0`, built against Kotlin `2.0.21`". Source: <https://github.com/detekt/detekt/releases/tag/v1.23.8> (2025-02-20 notes). Corroborated by the compatibility table row "1.23.8 | 8.12.1 | 2.0.21 | 8.8.1 | 1.8 | 21" at <https://detekt.dev/docs/introduction/compatibility>.
8. **A Kotlin 2.0.x compiler reads only its own metadata version plus one minor, and the skew produces unresolved-class errors with false findings.** Quote: "error: class 'kotlin.Unit' was compiled with an incompatible version of Kotlin. The actual metadata version is 2.3.0, but the compiler version 2.0.0 can read versions up to 2.1.0." and "I see a ton of false positives across many different rules". Source: <https://github.com/detekt/detekt/issues/8865> (2025-11-18); maintainer: "there are unfortunately no updates planned for the 1.x line." Applies to 1.23.8.
9. **Kotlin 2.0.21's reader window.** Quote: "`val INSTANCE = JvmMetadataVersion(2, 0, 0)`" and "`val INSTANCE_NEXT = INSTANCE.next()`" with `next()` being `JvmMetadataVersion(major, minor + 1, 0)`. Source: <https://github.com/JetBrains/kotlin/blob/v2.0.21/core/metadata.jvm/src/org/jetbrains/kotlin/metadata/jvm/deserialization/JvmMetadataVersion.kt>. Applies to Kotlin 2.0.21.
10. **kotlin-stdlib 2.2.21 carries metadata 2.2.0.** Measurement (2026-11-18): `javap -v` of `kotlin/Unit.class` and `kotlin/ResultKt.class` from <https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib/2.2.21/kotlin-stdlib-2.2.21.jar> prints `mv=[2,2,0]`. Applies to kotlin-stdlib 2.2.21. It shows the 1.23.8 reader is short of a 2.2 classpath; it says nothing about the 2.5.0-RC jar (no measurement exists, Gaps).
11. **2.0.0-alpha.6 is the newest 2.x release and no stable 2.0.0 exists.** Quote: "This is an alpha release of Detekt 2.0.0. It's built against Kotlin 2.4.10, Gradle 9.6.1, AGP 9.3.1 and is tested against JDK 25." and "Detekt 2.0.0 is still in alpha. While it's stable enough to use in your projects, you can expect further breaking changes before we reach a stable release." Sources: <https://github.com/detekt/detekt/releases/tag/v2.0.0-alpha.6> (2026-08-04), <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/src/pages/changelog-2.0.0.mdx>, <https://plugins.gradle.org/m2/dev/detekt/dev.detekt.gradle.plugin/maven-metadata.xml> (`<release>2.0.0-alpha.6</release>`, `lastUpdated` 20260804222720, re-read 2026-11-22).
12. **The CLI accepts language versions 2.0 to 2.5, which includes the build's 2.5.** Quote: "it only accepts API & language versions that are supported by the compiler (currently 2.0 to 2.5)." Source: <https://github.com/detekt/detekt/pull/9410> (merged 2026-06-17, in alpha.5). Applies to 2.0.0-alpha.5 and alpha.6. Backed in source by `require(languageVersion != null && !languageVersion.isUnsupported)` in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-cli/src/main/kotlin/dev/detekt/cli/ArgumentConverters.kt>.
13. **detekt needs JDK 17 to run (2.x).** Quote (table row): "JDK (to run detekt) | 8 | 17". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/introduction/migrationguide.mdx>. Applies to 2.0.0-alpha.6. (Same file's "Kotlin | 1.9 / 2.0 | 2.4" row is read as detekt's own build version; see Gaps.)
14. **Public builds run alpha.6 on Kotlin 2.2.21.** Quote from `gradle/libs.versions.toml`: "`detekt = "2.0.0-alpha.6"`" and "`kotlin = "2.2.21"`" at <https://github.com/kpavlov/kt-schema/blob/f24bb24/gradle/libs.versions.toml>; `gradle.properties` has "`org.gradle.configuration-cache=true`". Also <https://github.com/DataDog/dd-sdk-kotlin-multiplatform> (`kotlin = "2.2.21"`, `detekt = "2.0.0-alpha.6"`). Applies to 2026-11-18.
15. **Configuration-cache compatibility is declared and tested.** Quote: "Declare DGP compatibility with Gradle's configuration cache - [#9311]" (alpha.4 changelog) and the spec `` `detekt task can be loaded from the configuration cache` `` asserting "Reusing configuration cache.". Sources: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/src/pages/changelog-2.0.0.mdx>, <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/functionalTest/kotlin/dev/detekt/gradle/ConfigurationCacheSpec.kt>.
16. **A config file replaces the defaults unless `buildUponDefaultConfig` is on.** Quote: "_Note:_ When using a custom config file, the default values are ignored unless you also set the `--build-upon-default-config` flag." Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/introduction/configurations.mdx>. Applies to 2.0.0-alpha.6.
17. **The default config file location.** Quote: "`internal const val CONFIG_DIR_NAME = "config/detekt"`" and "`internal const val CONFIG_FILE = "detekt.yml"`". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/DetektBasePlugin.kt>. Applies to 2.0.0-alpha.6.
18. **A finding fails the build by default.** Quote: "By default, all findings have a severity of `error`" and "_detekt_ will fail your build if there is at least one issue with a severity of error." Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/introduction/configurations.mdx>. Applies to 2.0.0-alpha.6.
19. **A task with no source is skipped.** Quote: "`@InputFiles` `@SkipWhenEmpty` `@IgnoreEmptyDirectories` … `override fun getSource(): FileTree = super.getSource()`". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/Detekt.kt>. Applies to 2.0.0-alpha.6.
20. **Detekt's own configurations are not consumable, so nothing reaches a published classpath.** Quote: "`configuration.isCanBeResolved = true`" and "`configuration.isCanBeConsumed = false`". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/DetektPlugin.kt> (`configurePluginDependencies`). Applies to 2.0.0-alpha.6.
21. **The 2.x rule also flags `catch` of `CancellationException` or a supertype around a suspend call in a suspend function.** Quote: "catches CancellationException implicitly, since IllegalStateException is a super-class. Should be explicit". Source: the rule's KDoc in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-rules-coroutines/src/main/kotlin/dev/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt>. Applies to 2.0.0-alpha.6.
22. **The type-resolving tasks are registered per Kotlin compilation.** Quote: "`project.extensions.getByType(KotlinJvmExtension::class.java).target.compilations.configureEach { compilation ->`". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/internal/DetektJvmCompilations.kt>. Applies to 2.0.0-alpha.6.
23. **The neighbouring-library wiring.** Quote (kt-schema, `buildSrc/src/main/kotlin/kotlin-multiplatform-convention.gradle.kts`): "`tasks.named("detekt").configure {` `dependsOn("detektMainJvm", "detektTestJvm")` `}`". Source: <https://github.com/kpavlov/kt-schema> at `f24bb24`. Applies to 2026-11-18.
24. **1.x has no further releases planned and 1.x type resolution silently skips rules without a classpath.** Quote (maintainer, #8865): "there are unfortunately no updates planned for the 1.x line."; (source) "`bindingContext != BindingContext.EMPTY || !rule::class.hasAnnotation<RequiresTypeResolution>()`" in <https://github.com/detekt/detekt/blob/v1.23.8/detekt-core/src/main/kotlin/io/gitlab/arturbosch/detekt/core/Analyzer.kt>. Applies to 1.23.8.
25. **detekt embeds Kotlin 2.4.10, on the release and on the default branch.** Quote (compatibility table row): "| `2.0.0-alpha.6` | `9.6.1`        | `2.4.10`       | `9.3.1`     | `1.8`             | `25`        |" at <https://detekt.dev/docs/introduction/compatibility> (read 2026-11-22); and in `gradle/libs.versions.toml` of the default branch: "`kotlin-analysisApi = "2.4.10"`" and "`kotlin-compiler = { module = "org.jetbrains.kotlin:kotlin-compiler", version.ref = "kotlin-analysisApi" }`" at <https://github.com/detekt/detekt/blob/main/gradle/libs.versions.toml> (read 2026-11-22).
26. **Kotlin 2.4.10 knows 2.5 only as an experimental language version.** Quote: "`val LATEST_STABLE = KOTLIN_2_4`", "`KOTLIN_2_5(2, 5),`" and the comment "// Language:  UNSUPPORTED --> DEPRECATED ---> STABLE ---> EXPERIMENTAL" over the column heads "1.0..1.9         2.0..2.1      2.2..2.4         2.5". Source: <https://github.com/JetBrains/kotlin/blob/v2.4.10/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt>. Applies to Kotlin 2.4.10.
27. **detekt's Gradle plugin copies the compile task's language and API version into each `detekt<Compilation>` task, and the task's properties are public.** Quote: "`detektTask.languageVersion.convention(`" "`siblingTask.flatMap { task -> task.compilerOptions.languageVersion.map { it.version } }`" in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/plugin/internal/SharedTasks.kt>; and "`@get:Input @get:Optional abstract val languageVersion: Property<String>`" in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-gradle-plugin/src/main/kotlin/dev/detekt/gradle/Detekt.kt> (the annotations and the property are on consecutive lines). Applies to 2.0.0-alpha.6.
28. **The Kotlin Gradle plugin's project-level compiler options reach every compile task.** Quote: "`kotlin.compilerOptions` configures every Kotlin compilation task in the project." Source: <https://kotlinlang.org/docs/gradle-compiler-options.html> (read 2026-11-22; the page lists values "2.0" through "2.5", with "2.5" experimental, and gives no default for `languageVersion`).
29. **detekt hands the versions to the embedded compiler's argument parser, and discards the compiler's messages unless `debug` is on.** Quote: "`add("-language-version")`" "`add(languageVersion)`" and "`parseCommandLineArguments(args, jvmCompilerArguments)`" in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/parser/KotlinEnvironmentUtils.kt>; and "`private val printStream = if (loggingSpec.debug) loggingSpec.errorChannel.asPrintStream() else NullPrintStream`" in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/settings/EnvironmentAware.kt>. Applies to 2.0.0-alpha.6.
30. **An experimental language version is a warning in Kotlin 2.4.10.** Quote: "`Language version ${languageVersion.versionString} is experimental, there are no backwards compatibility guarantees for `" in <https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/cli/cli-base/src/org/jetbrains/kotlin/cli/common/arguments/CommonCompilerArgumentsConfigurator.kt>; and "`val EXPERIMENTAL_LANGUAGE_VERSION: KtSourcelessDiagnosticFactory by strongWarningWithoutSource()`" in <https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/cli/cli-base/src/org/jetbrains/kotlin/cli/CliDiagnostics.kt>. Applies to Kotlin 2.4.10.
31. **Kotlin 2.4.10 reads metadata up to `max(own + 1, language version)`.** Quote: "`// * Compiler of deployVersion X (INSTANCE) with LV Y (metadataVersionFromLanguageVersion)`" "`//   * can read metadata with version <= max(X+1, Y)`" and "`val INSTANCE = MetadataVersion(2, 4, 0)`". Source: <https://github.com/JetBrains/kotlin/blob/v2.4.10/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt>. Kotlin 2.5.0-RC: "`val INSTANCE = MetadataVersion(2, 5, 0)`" at the same path under `v2.5.0-RC`. Applies to those tags.
32. **Pre-release classes are refused only by a release compiler on a stable language version.** Quote: "`!getFlag(AnalysisFlags.skipPrereleaseCheck) && !isPreRelease() && !KotlinCompilerVersion.isPreRelease()`" in <https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/fir/fir-jvm/src/org/jetbrains/kotlin/fir/java/deserialization/JvmClassFileBasedSymbolProvider.kt>; and "`fun LanguageVersion.isPreRelease(): Boolean {`" "`if (!isStable) return true`" in <https://github.com/JetBrains/kotlin/blob/v2.4.10/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt>. Applies to Kotlin 2.4.10.
33. **Library sessions of the Analysis API use the latest stable language version unless the platform overrides it.** Quote: "`public val libraryLanguageVersionSettings: LanguageVersionSettings`" "`get() = globalLanguageVersionSettings`" and "`public val globalLanguageVersionSettings: LanguageVersionSettings`" "`get() = LanguageVersionSettingsImpl.DEFAULT`", with "`val DEFAULT = LanguageVersionSettingsImpl(LanguageVersion.LATEST_STABLE, ApiVersion.LATEST_STABLE)`". Sources: <https://github.com/JetBrains/kotlin/blob/v2.4.10/analysis/analysis-api-platform-interface/src/org/jetbrains/kotlin/analysis/api/platform/projectStructure/KotlinProjectStructureProvider.kt>, <https://github.com/JetBrains/kotlin/blob/v2.4.10/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt>. Applies to Kotlin 2.4.10. That detekt and the standalone provider do not override it is an absence found by code search on 2026-11-22 (Gaps).
34. **The Kotlin 2.5.0-RC compiler is not flagged pre-release, and 2.5 is its latest stable language version.** Quote: "`private static final boolean IS_PRE_RELEASE = false;`" under the comment "Binaries produced by this compiler with that language version (or any future language version) are going to be marked as "pre-release" and will not be loaded by release versions of the compiler." in <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/compiler.version/src/org/jetbrains/kotlin/config/KotlinCompilerVersion.java>; and "`val LATEST_STABLE = KOTLIN_2_5`" in <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt>. Applies to tag v2.5.0-RC.
35. **Unknown `-X` flags do not stop detekt; other unknown arguments do.** Quote: "`// Unknown -X argument`" "`arg.startsWith(ADVANCED_ARGUMENT_PREFIX) -> errors.value.unknownExtraFlags.add(arg)`" and, in `validateArgumentsAllErrors`, "`errors.unknownArgs.forEach {`" "`add("Invalid argument: $it")`". Source: <https://github.com/JetBrains/kotlin/blob/v2.4.10/compiler/cli/cli-base/src/org/jetbrains/kotlin/cli/common/arguments/parseCommandLineArguments.kt>. Applies to Kotlin 2.4.10.
36. **Compiler errors in detekt's session are counted into one non-failing info line.** Quote: "`if (settings.spec.projectSpec.analysisMode == AnalysisMode.full) {`" "`measure(Phase.ValidateClasspath) { validateClasspath(filesToAnalyze) }`" in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/tooling/Lifecycle.kt>; and "`There were $messages compiler errors found during analysis. This affects accuracy of reporting.`" in <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-core/src/main/kotlin/dev/detekt/core/parser/DetektMessageCollector.kt>. Applies to 2.0.0-alpha.6.
37. **detekt's move to Kotlin 2.5 is open and blocked.** Quote (#9786, read 2026-11-22): "Project depends on 2.4.10 due to incompatible changes introduced in 2.4.20." and "The supported path is to migrate to official Kotlin Analysis API artifacts which will be available in 2.5.0 for the first time." Source: <https://github.com/detekt/detekt/issues/9786>. And (#9888, draft, `blocked`): "Blocked by: * ktlint2 including an update to 2.5.0 …" at <https://github.com/detekt/detekt/pull/9888>.
38. **KT-91146 blocks detekt on 2.5.0 and is fixed in 2.5.0-RC.** Quote (issue description): "This issue is a blocker for upgrading to 2.5.0."; (JetBrains, comment): "The issue should be fixed in the upcoming 2.5.0-RC". Source: <https://youtrack.jetbrains.com/issue/KT-91146> (read 2026-11-22 through the YouTrack REST API).
39. **A detekt snapshot exists and is built from the default branch.** Quote: "`<latest>main-SNAPSHOT</latest>`" (Central snapshot metadata of `dev.detekt:detekt-core`, `<lastUpdated>20261120190626</lastUpdated>`) at <https://central.sonatype.com/repository/maven-snapshots/dev/detekt/detekt-core/maven-metadata.xml>; and "`run: ./gradlew publishToMavenCentral -Dsnapshot=true --stacktrace --no-configuration-cache`" in <https://github.com/detekt/detekt/blob/main/.github/workflows/deploy-snapshot.yaml>, triggered on "`push:` `branches:` `- main`". Read 2026-11-22.
40. **Kotlin 2.5.0 is not released; 2.5.0-RC is the newest.** Quote: "`<release>2.5.0-RC</release>`" and "`<lastUpdated>20261111082538</lastUpdated>`". Source: <https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/maven-metadata.xml> (read 2026-11-22).
41. **The Kotlin Gradle plugin API detekt calls is unchanged in 2.5.0-RC.** Quote (ABI dump line, identical at v2.4.21 and v2.5.0-RC): "`public abstract fun getTarget ()Lorg/jetbrains/kotlin/gradle/plugin/KotlinTarget;`" under `KotlinJvmExtension`, and "`public static final field KOTLIN_2_5 Lorg/jetbrains/kotlin/gradle/dsl/KotlinVersion;`". Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/api/kotlin-gradle-plugin-api.api>. Applies to v2.4.21 and v2.5.0-RC.
42. **A public Kotlin 2.5.0-RC build runs alpha.6's type-resolved tasks and passes, with the accuracy line printed.** Quote (`libs.versions.toml`): "`detekt = "2.0.0-alpha.6"`" and "`kotlin = "2.5.0-RC"`"; (`build.gradle.kts`): "`it.name == "detektMainJvm" || it.name == "detektMainAndroid"`"; (CI log, 2026-11-22): "There were 9 compiler errors found during analysis. This affects accuracy of reporting." Sources: <https://github.com/respawn-llc/FlowMVI/blob/0a11cd94/gradle/libs.versions.toml>, <https://github.com/respawn-llc/FlowMVI/blob/0a11cd94/build.gradle.kts>, <https://github.com/respawn-llc/FlowMVI/actions/runs/45072755595> (conclusion `success`).
43. **Kotlin 2.5.0-RC's new language features, and what 2.4.10 has off.** Quote (release notes): "Name-based destructuring in `only-syntax` mode, which is now the default." and "Companion extensions and blocks are Experimental." at <https://kotlinlang.org/docs/whatsnew-eap.html> (2.5.0-RC, 2026-11-11); (source) "`NameBasedDestructuring(sinceVersion = KOTLIN_2_5, "KT-19627"),`" at v2.5.0-RC versus "`NameBasedDestructuring(sinceVersion = null, "KT-19627"),`" at v2.4.10, both in `core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt` (<https://github.com/JetBrains/kotlin/blob/v2.4.10/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt>, <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt>).
44. **detekt supports only the latest stable Kotlin and its RCs.** Quote: "we commit to support only the **latest stable versions** and related RC versions." Source: <https://detekt.dev/docs/introduction/compatibility> (read 2026-11-22).
45. **Pre-release-flagged classes degraded detekt's analysis in a public report.** Quote (reporter): "There were 158 compiler errors found during analysis. This affects accuracy of reporting."; (maintainer): "No, it shouldn't. But some rules could not catch some errors because of that."; and "Upstream told me to add `-Xskip-prerelease-check` to my `freeCompilerArgs`, but that did not work". Source: <https://github.com/detekt/detekt/issues/8639> (2.0.0-alpha.0, closed as stale 2026-02-06).
46. **A classpath with unresolved types can crash a rule.** Quote (issue title, open, updated 2026-11-22): "ArrayPrimitive rule crashes with InvalidFirElementTypeException when analysis has unresolved types — regression from v1". Source: <https://github.com/detekt/detekt/issues/9362>.

## 8. Gaps

- **Nothing was run.** No build was executed against this toolchain (no Gradle project with KGP 2.5.0-RC, Gradle 9.7.1 and detekt alpha.6 was set up, and no jar was downloaded). Every statement about how detekt behaves on Kotlin 2.5.0-RC is read from the sources of Kotlin 2.4.10 and 2.5.0-RC and of detekt alpha.6.
  The seeded-violation, cross-module and no-compiler-errors tests in Section 6 are the first-hand evidence this build still needs; build and run them before the pin is relied on. If any fails, the options table lists what is left.
- **The metadata version and any pre-release or strict-semantics flag in the `kotlin-stdlib` 2.5.0-RC classes are not measured.** The window arithmetic (2.5.0 against a limit of 2.5.0) and the RC's `IS_PRE_RELEASE = false` make a refusal unlikely, but whether the RC's stdlib was compiled with the flag, or with the strict-metadata-version-semantics option (which would lower a 2.4.10 reader's limit to 2.4.0 for those classes), was not established.
  If the stdlib were flagged or strict, `kotlin.runCatching` would be unresolved and the rule silent, which the first test catches. The same applies to the build's own classes compiled by the RC.
- **That library sessions use detekt-independent default language version settings** rests on the default in `KotlinProjectStructureProvider` and on code searches finding no override in detekt or in the standalone provider; a search that finds nothing is weak evidence. If detekt in fact passes its language version to library sessions, the pre-release check would be lifted for classpath classes (a benefit, not a risk).
- **The cause of the compiler-error counts in FlowMVI's CI is unknown.** They coincide with Kotlin 2.5.0-RC and a multiplatform build; kotlin-sdk (Kotlin 2.4.21) prints the line once and kt-schema (2.2.21) never. A first-hand run with `debug = true` on a Kotlin 2.5.0-RC module of this build is the only way to know what, if anything, Kotlin 2.5 adds.
- **What the Kotlin 2.4.10 parser does with a syntax form it does not know** (versus a feature it knows and has switched off, which F13 reads as a counted error diagnostic) was not established; it may be a syntax-error finding or a thrown exception. The unit's sources use no 2.5-only syntax, so it does not bite today.
- **No public pure-JVM build runs `detektMain` on Kotlin 2.5.0-RC.** The Kotlin Gradle plugin API comparison (F3) removes the obvious worry about the detekt plugin's `KotlinJvmExtension.target.compilations` path, but it compares the API dump, not behaviour.
- **No date is stated for a detekt release on Kotlin 2.5.0.** #9888 is a draft last updated 2026-11-14, blocked on ktlint2 (#9708, open) among others; ktlint's Kotlin 2.5.0 update merged on 2026-11-22. When it lands the move is a breaking change for third-party rule sets only.
- **Whether a Gradle JVM test suite's source set (the seven test sets) becomes a Kotlin compilation with its own `detekt<Name>` task** is read from `DetektJvmCompilations` and KGP's behaviour as I remember it, not run. If the test sets are registered another way, the compilation-driven wiring may miss them.
- **Gradle 9.7.1 specifically.** No report of a pure JVM problem on 9.7.x was found; the one 9.7 report (#9742) is Android-only and closed. Public builds run alpha.6 on Gradle 9.5.1 to 9.9.1. If the build runs with `org.gradle.warning.mode=fail`, any deprecation the plugin raises on 9.7.1 would fail it; not checked.
- **`detekt.use.worker.api`:** the default is off in alpha.6 (source and docs agree; the migration guide says the opposite). Whether turning it on is safe on this build and cures #9793 is untested; two public builds run with it on.
- **The migration guide's "Kotlin | 2.4" minimum** conflicts with public builds on Kotlin 2.2.21 and 2.5.0-RC; I read it as detekt's own build version. No maintainer statement settles it.
- **Whether `-Xjdk-release=21`, `-Xexplicit-api=strict` and the build's other compiler flags pass `validateArguments` in the embedded Kotlin 2.4 parser** is read from the code path (F13, claim 35), not run.
- **Whether the "experimental language version" warning is counted in the "compiler errors" line** is inference from the two code paths being separate (F13, F15); it is a warning and the count takes error-severity diagnostics only.
- **The organisation's policy on pre-release build tooling** is not in this brief. If an alpha pin is not allowed, there is no detekt release that gives type-resolved analysis on Kotlin 2.2 or newer today (an untested fallback, `-Xskip-metadata-version-check` passed to 1.23.8's K1 compiler, would bypass the version check without any guarantee the metadata is read correctly, and is not recommended).
- **No Kotlin-version alignment in the build's resolution rules was checked,** since the build-logic does not exist yet; F4 states the one condition under which the `detekt` configuration needs excluding.
- **WebTools' and MyGameTools' build files were read on 2026-11-18, not re-opened on 2026-11-22;** only a GitHub code search for `GeneralTools` was run on the later date.
