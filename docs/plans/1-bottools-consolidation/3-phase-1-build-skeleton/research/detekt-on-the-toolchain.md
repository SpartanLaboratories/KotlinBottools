# detekt on the toolchain: which release, run how, for type-resolved analysis

Currency date of every finding: 2026-11-18 (releases, changelogs and open issues read that day).

## 1. Question

Which detekt release, run in which way, gives type-resolved analysis of sources compiled by the Kotlin Gradle plugin 2.2.x on
Gradle 9.7.1 and JDK 21, so that `SuspendFunSwallowedCancellation` (inactive in detekt's default configuration) runs and fails
`check` on a finding?

The answer has to meet these requirements, all stated as facts about the build:

- The build runs on Gradle 9.7.1, a JDK 21 toolchain and the Kotlin Gradle plugin 2.2.x, with the configuration cache usable.
  Consumers are on Kotlin 2.2.x, so nothing may require a newer compiler for the library's own compilation.
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
- **Pin detekt `2.0.0-alpha.6` (plugin id `dev.detekt`), not 1.23.8.** 1.23.8 is the newest stable release (2025-02-21) and was built
  against Kotlin 2.0.21. Its embedded compiler reads class metadata only up to 2.1.0; kotlin-stdlib 2.2.21 carries metadata
  2.2.0 (measured), so on a Kotlin 2.2 classpath `kotlin.runCatching` is very likely unresolvable and the rule then reports nothing.
  Maintainers state no further 1.x releases are planned. 2.0.0-alpha.6 (2026-08-04) is the newest 2.x release, uses the Kotlin
  Analysis API at Kotlin 2.4.10 (which reads 2.2 metadata), accepts language versions 2.0 to 2.5, and runs on JDK 17+. Public
  library builds already run it on Kotlin 2.2.21 with the configuration cache on (kt-schema, Gradle 9.9.1) and on Gradle 9.8.2
  (kotlin-sdk). No stable 2.0.0 exists; the alpha carries a documented warning that further breaking changes may come, so the pin is
  exact and the choice is a build-time-only risk.
- **Run it through its Gradle plugin's own `detekt<Compilation>` tasks, not the CLI and not the plain task.** The plugin derives
  classpath, `friendPaths`, language and API version, `jvmTarget`, `jdkHome` (from the toolchain) and `explicitApi` from the Kotlin
  compile task. The CLI would have to re-create all of that, and the plain task cannot run the rule.
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
- **Neither prior-art build runs detekt**, so there is no organisation precedent to copy.

## 3. Findings

### F1. The rule needs type resolution (Established: source and documentation agree)

- 1.23.8: `SuspendFunSwallowedCancellation` is annotated `@RequiresTypeResolution` and calls `expression.getResolvedCall(bindingContext)`
  to identify `kotlin.runCatching` and every suspend call inside it. Source: [`SuspendFunSwallowedCancellation.kt` at v1.23.8](https://github.com/detekt/detekt/blob/v1.23.8/detekt-rules-coroutines/src/main/kotlin/io/gitlab/arturbosch/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt).
- 2.0.0-alpha.6: the class implements `RequiresAnalysisApi` and uses `analyze { resolveToCall() }`. Source: [`SuspendFunSwallowedCancellation.kt` at v2.0.0-alpha.6](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/detekt-rules-coroutines/src/main/kotlin/dev/detekt/rules/coroutines/SuspendFunSwallowedCancellation.kt).
  The rule page lists "Requires Type Resolution: Yes" and "Active by default: No" ([detekt.dev rules/coroutines](https://detekt.dev/docs/rules/coroutines), 2.0.0-alpha.6).
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

### F4. Kotlin version skew: 1.23.8 cannot read Kotlin 2.2 classes (Established for the mechanism; the effect on this rule is inference)

- detekt's own compatibility table: `1.23.8 | Gradle 8.12.1 | Kotlin 2.0.21 | AGP 8.8.1 | target 1.8 | JDK 21`; 2.0.0-alpha.6 is built
  against Kotlin 2.4.10 and Gradle 9.6.1 ([compatibility](https://detekt.dev/docs/introduction/compatibility), page documents 2.0.0-alpha.6).
- The 1.x line's type resolution runs the K1 compiler of its own version inside the isolated `detekt` configuration. The project's
  libraries (including kotlin-stdlib 2.2.x) are passed as the classpath, together with `-no-stdlib`. Kotlin's metadata reader accepts the
  compiler's own metadata version plus one minor: in 2.0.21 `INSTANCE = JvmMetadataVersion(2, 0, 0)` and `INSTANCE_NEXT` is 2.1.0
  ([`JvmMetadataVersion.kt` at v2.0.21](https://github.com/JetBrains/kotlin/blob/v2.0.21/core/metadata.jvm/src/org/jetbrains/kotlin/metadata/jvm/deserialization/JvmMetadataVersion.kt)).
- Measured on 2026-11-18: the classes of `kotlin-stdlib-2.2.21.jar` from Maven Central (`kotlin/Unit.class`, `kotlin/ResultKt.class`, the
  latter holding `runCatching`) carry `mv=[2,2,0]` (`javap -v` of the class files). Metadata 2.2.0 is above 2.1.0.
- The symptom is documented for the same mechanism one minor later: with 1.23.8 on Kotlin 2.3.0 the reporter sees "hundreds of
  these errors: error: class 'kotlin.Unit' was compiled with an incompatible version of Kotlin. The actual metadata version is 2.3.0, but the
  compiler version 2.0.0 can read versions up to 2.1.0", "a ton of false positives across many different rules", and the maintainer closes
  the issue: "there are unfortunately no updates planned for the 1.x line" ([detekt#8865](https://github.com/detekt/detekt/issues/8865), 2025-11).
  The same arithmetic holds for 2.2.0 metadata against a 2.1.0 reader. I found no first-hand run of 1.23.8 on Kotlin 2.2 in this research.
  The consequence for this rule (an unresolved `kotlin.runCatching` produces no `getResolvedCall`, so no finding) is an inference from the rule's
  source, not an observation. That is the worst failure mode for this build: a green `check` and a rule that sees nothing.
- 2.x reads Kotlin 2.2 metadata (its compiler's metadata version is newer than 2.2.0; that a newer reader accepts all older metadata is inference from the window rule above, corroborated by the public builds in F6), and its own constraint on the project's
  Kotlin version is only what the CLI accepts: "it only accepts API & language versions that are supported by the compiler (currently 2.0 to 2.5)"
  ([detekt#9410](https://github.com/detekt/detekt/pull/9410), merged 2026-06-17). KGP 2.2.x defaults to language version 2.2, which is inside that range.
- The Gradle plugin is compiled against `kotlin-gradle-plugin-api` 2.1.0 as `compileOnly`
  ([`libs.versions.toml`](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/gradle/libs.versions.toml), `kotlin-gradlePluginApi`), so it calls KGP types that exist in
  2.2.x. Its own build and tests run KGP 2.4.10.
- What a mismatch looks like in the other direction: if the build forces a Kotlin version onto every configuration (for example a
  `resolutionStrategy.eachDependency` over `org.jetbrains.kotlin`), the `detekt` configuration's compiler changes and the CLI aborts with
  "detekt was compiled with Kotlin X but is currently running with Y". The documented remedy is to exclude that configuration:
  `configurations.matching { it.name != "detekt" }.all` ([gradle.mdx, "Gradle runtime dependencies"](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/gettingstarted/gradle.mdx)).
- One documentation conflict: the 2.x migration guide's "Minimum supported versions" table lists Kotlin "2.4" for detekt 2.0.x
  ([migrationguide.mdx](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/introduction/migrationguide.mdx)), while the compatibility page shows 2.4.10 as the version
  detekt is built against, and public builds run alpha.6 on Kotlin 2.2.21 (below). Read the table's "2.4" as the build version of detekt's own analysis engine, not a ceiling on the project (inference).

### F5. detekt 2.0.0-alpha.6 is the newest 2.x release and there is no stable 2.0.0 (Established: releases and Maven metadata)

- GitHub releases, newest first: `v2.0.0-alpha.6` 2026-08-04, `alpha.5` 2026-06-17, `alpha.4` 2026-06-13, `alpha.3` 2026-04-24, `alpha.2` 2026-01-27, `alpha.1` 2025-10-21,
  `alpha.0` 2025-09-04; the last stable is `v1.23.8` 2025-02-21 ([releases](https://github.com/detekt/detekt/releases)).
  The Gradle plugin portal metadata for `dev.detekt:dev.detekt.gradle.plugin` lists `2.0.0-alpha.0` to `2.0.0-alpha.6`, `release` = alpha.6, last updated 2026-08-04
  ([maven-metadata.xml](https://plugins.gradle.org/m2/dev/detekt/dev.detekt.gradle.plugin/maven-metadata.xml)). The default branch had only dependency-update commits on 2026-11-16 and 2026-11-17.
- The 2.0.0 milestone is open (30 open, 1302 closed issues on 2026-11-18) ([milestone 42](https://github.com/detekt/detekt/milestone/42)).
- The project's changelog: "Detekt 2.0.0 is still in alpha. While it's stable enough to use in your projects, you can expect further breaking changes before we
  reach a stable release." ([changelog-2.0.0.mdx](https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/src/pages/changelog-2.0.0.mdx)).
- The alpha line changes the rule's behaviour between releases: `SuspendFunSwallowedCancellation` was revised in alpha.2 (#8950), alpha.4 (#9208, #9256) of the same changelog.
- alpha.6's own toolchain: "It's built against Kotlin 2.4.10, Gradle 9.6.1, AGP 9.3.1 and is tested against JDK 25." ([release notes](https://github.com/detekt/detekt/releases/tag/v2.0.0-alpha.6)).
  It requires JDK 17 to run (migration guide table "JDK (to run detekt) | 8 | 17"), so JDK 21 is fine.

### F6. Public builds run alpha.6 on Kotlin 2.2.x and on Gradle 9.7 or newer (Common practice, three repositories)

- `kpavlov/kt-schema`: `detekt = "2.0.0-alpha.6"`, `kotlin = "2.2.21"` in `gradle/libs.versions.toml`, Gradle `9.9.1`, `org.gradle.configuration-cache=true` and `detekt.use.worker.api = true` in
  `gradle.properties`; its convention script has `tasks.named("detekt").configure { dependsOn("detektMainJvm", "detektTestJvm") }`. Its `Build` workflow (`make ci`, which runs `check`) is
  green on 2026-11-14 ([libs.versions.toml](https://github.com/kpavlov/kt-schema/blob/f24bb24/gradle/libs.versions.toml)).
- `DataDog/dd-sdk-kotlin-multiplatform`: `kotlin = "2.2.21"`, `detekt = "2.0.0-alpha.6"`, Gradle 9.5.1.
- `modelcontextprotocol/kotlin-sdk`: `detekt = "2.0.0-alpha.6"`, Kotlin 2.4.21, Gradle 9.8.2; its convention script `mcp.detekt.gradle.kts` makes `detekt` depend on `detektMainJvm`, and its build-logic
  declares `implementation(libs.detekt.gradle)` for `dev.detekt:detekt-gradle-plugin`.
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

### F11. Known problems of the alpha that touch this build (Established: open issues)

- [detekt#9793](https://github.com/detekt/detekt/issues/9793) (open, 2026-10-11): with the daemon reused and `kotlin.environment.keepalive` set, a project dependency's jar rebuilt between two builds is read as the
  first build left it, and `detektMain` reports a new class as unresolved. The reporter's account: "With the Worker API, detekt runs in a worker process, where neither tool sets the property, and the reproducer passed every time."
  A fix, [#9794](https://github.com/detekt/detekt/pull/9794), is open and unmerged. Effect here: local multi-module runs in a warm daemon can report false findings; a CI run from a clean clone starts a fresh daemon and is unaffected.
- [detekt#9121](https://github.com/detekt/detekt/issues/9121) (open): random compiler failures with `parallel = true`; the plugin default is `false`.
- [detekt#9297](https://github.com/detekt/detekt/issues/9297) (open): `findFirCompiledSymbol only works on compiled declarations` in `detektTest`, traced in the thread to the ktlint-wrapper rule set with an `ignoreAnnotated` option in full mode.
  Neither applies unless the ktlint wrapper is added.

## 4. How comparable projects do it

| Project (pinned) | detekt | How it joins `check` | Config |
|---|---|---|---|
| `kpavlov/kt-schema` @ `f24bb24` | `dev.detekt` 2.0.0-alpha.6, Kotlin 2.2.21, Gradle 9.9.1, configuration cache on, worker API on | `tasks.named("detekt").configure { dependsOn("detektMainJvm", "detektTestJvm") }`; the plain `detekt` task is already on `check` | `detekt.yml` at root, `buildUponDefaultConfig = true`, `failOnSeverity = Warning` |
| `modelcontextprotocol/kotlin-sdk` (default branch) | `dev.detekt` 2.0.0-alpha.6, Kotlin 2.4.21, Gradle 9.8.2; build-logic `implementation(libs.detekt.gradle)` | `tasks.named("detekt") { dependsOn("detektMainJvm") }` inside `pluginManager.withPlugin("org.jetbrains.kotlin.multiplatform")` | `config/detekt/detekt.yml` (full copy, `buildUponDefaultConfig = false`), `SuspendFunSwallowedCancellation` inactive, `parallel = true` |
| `ReactiveCircus/cache4k` (default branch) | `dev.detekt` 2.0.0-alpha.6 applied from a build-logic convention plugin, Kotlin 2.4.20 | plain `detekt` through `check`; CI also runs `./gradlew -p build-logic detekt` | `detekt.yml` at root, `buildUponDefaultConfig = true` |
| `SpartanLabsGaming/MyGameTools` and `SpartanLaboratories/WebTools` (default branches) | none | none | none |

The two organisation builds were searched for `detekt` across every file of their `build-logic/` directories, their root `build.gradle.kts` and `settings.gradle.kts`, version catalogs and workflow files at HEAD, with zero matches.
WebTools' documents mention detekt only in research notes. The plain-task-depends-on-type-resolved-tasks pattern is what two libraries do; wiring `check` directly to each compilation's task achieves the same effect and
keeps the intent visible in the convention plugin.

## 5. Pitfalls and regrets

- **A green `check` with the rule never run.** The plain `detekt` task is the only detekt task on `check`; it analyses in light mode, so the rule is skipped with a debug message. Teams find out when a deliberately seeded violation
  does not fail. The build needs its own regression test: a fixture module with `runCatching { suspendCall() }` must make `check` fail with `SuspendFunSwallowedCancellation`.
- **A config file replaces the defaults.** With `buildUponDefaultConfig = false`, only the listed rules run. Copying the whole default file makes the rule `active: false` again (kotlin-sdk's does exactly this).
- **1.23.8 on a Kotlin 2.2 classpath fails silently** (F4). Users of 1.x on Kotlin 2.3 reported the failure mode only after investigating false positives; the maintainers closed the report with "no updates planned for the 1.x line".
- **The alpha moves.** Rule names, config keys, plugin id (`io.gitlab.arturbosch.detekt` to `dev.detekt`), report ids and baseline format changed between 1.x and 2.x, and the changelog warns of further breaking changes. Bump deliberately, one release at a time, with the seeded-violation test.
- **Flags forwarded to detekt's embedded compiler.** `freeCompilerArgs` and `optIn` of the Kotlin compile task are passed to detekt's own parser (`parseCommandLineArguments(args, K2JVMCompilerArguments())`, with `validateArguments(errors)` throwing).
  The build's `-Xjdk-release` and `-Xexplicit-api=strict` are standard flags; a flag Kotlin 2.4 reports as an error would stop every detekt task. A TestKit run catches that.
- **Do not set `parallel = true`** (open #9121) and do not add the ktlint wrapper with `ignoreAnnotated` (open #9297) until those close.
- **Warm-daemon staleness** (#9793, F11) can make local multi-module `detektMain` runs report false unresolved references until the fix lands; CI is unaffected. Setting `detekt.use.worker.api=true` in `gradle.properties` is the reporter's workaround and is what kt-schema runs;
  it is untested here (Gaps).
- **Detekt's configuration is not an `api` or `implementation` dependency**, but a build that aligns Kotlin versions on all configurations breaks the CLI (F4's remedy).

## 6. Recommendation for this repository

Pin `dev.detekt` `2.0.0-alpha.6` exactly (build-logic `implementation("dev.detekt:detekt-gradle-plugin:2.0.0-alpha.6")`, applied as `id("dev.detekt")` inside `bottools.kotlin-library`), and run the type-resolving
`detekt<Compilation>` tasks as part of `check`. Do not run the 1.23.8 line: it is stable but built on Kotlin 2.0.21, so on a Kotlin 2.2.x classpath it cannot read the standard library's metadata and the rule it is
being adopted for would be unreliable and silent about it. Do not use the CLI (it duplicates the plugin's classpath, jvm-target, toolchain and friend-path wiring) or the plain task (it cannot run the rule).

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

Reasoning: (1) the rule needs a classpath, and a detekt release that reads Kotlin 2.2 metadata is only available on the 2.x line; (2) the plugin joins only the classpath-less task to `check`, so the wiring has to be written, once, per compilation, by name;
(3) a small override file over the defaults keeps "the rest of the default rule set" and makes the one switch visible; a copy of the defaults would hide it and would be wrong at the next alpha. Do not enable `parallel`. Keep the
reports at the plugin defaults. Leave the plain `detekt` task on `check` as the plugin wires it (it adds a quick syntax-only pass); alternatively, as kt-schema does, make `detekt` depend on the type-resolving tasks.

The build also needs these checks, which belong in the convention plugin's own tests (TestKit, as WebTools' build-logic tests its conventions):

- a fixture with a seeded `runCatching { suspendCall() }` makes `./gradlew check` fail and names `SuspendFunSwallowedCancellation`; `./gradlew detekt` alone does not, which proves the wiring is what makes the rule run;
- `./gradlew check` on a module with no main source passes (`NO-SOURCE`);
- the configuration cache stores and reuses an entry for `check`;
- the internal `suspendCatching` (and any `catch (Exception|Throwable)` around a suspend call) passes the 2.x rule: rethrow `CancellationException` in its own first `catch`, or begin the clause with the `ensureActive()` idiom.

Acceptance of an alpha as the build's detekt is a build-time risk only: detekt adds no dependency to any published artifact, and `check` is the only thing a bump can break. If a pre-release build tool is not acceptable, no detekt release gives
type-resolved analysis on Kotlin 2.2.x today, and the rule would have to be dropped from the gates or enforced another way.

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
10. **kotlin-stdlib 2.2.21 carries metadata 2.2.0.** Measurement: `javap -v` of `kotlin/Unit.class` and `kotlin/ResultKt.class` from <https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib/2.2.21/kotlin-stdlib-2.2.21.jar> prints `mv=[2,2,0]`. Applies to kotlin-stdlib 2.2.21 (2026-11-18).
11. **2.0.0-alpha.6 is the newest 2.x release and no stable 2.0.0 exists.** Quote: "This is an alpha release of Detekt 2.0.0. It's built against Kotlin 2.4.10, Gradle 9.6.1, AGP 9.3.1 and is tested against JDK 25." and "Detekt 2.0.0 is still in alpha. While it's stable enough to use in your projects, you can expect further breaking changes before we reach a stable release." Sources: <https://github.com/detekt/detekt/releases/tag/v2.0.0-alpha.6> (2026-08-04), <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/src/pages/changelog-2.0.0.mdx>, <https://plugins.gradle.org/m2/dev/detekt/dev.detekt.gradle.plugin/maven-metadata.xml> (`<release>2.0.0-alpha.6</release>`, `lastUpdated` 20260804222720).
12. **The CLI accepts language versions 2.0 to 2.5, so a project on language version 2.2 is accepted.** Quote: "it only accepts API & language versions that are supported by the compiler (currently 2.0 to 2.5)." Source: <https://github.com/detekt/detekt/pull/9410> (merged 2026-06-17, in alpha.5). Applies to 2.0.0-alpha.5 and alpha.6.
13. **detekt needs JDK 17 to run (2.x).** Quote (table row): "JDK (to run detekt) | 8 | 17". Source: <https://github.com/detekt/detekt/blob/v2.0.0-alpha.6/website/docs/introduction/migrationguide.mdx>. Applies to 2.0.0-alpha.6. (Same file's "Kotlin | 1.9 / 2.0 | 2.4" row conflicts with claim 14; see Gaps.)
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

## 8. Gaps

- **Nothing was run.** No build was executed against this toolchain (no Gradle project with KGP 2.2.x, Gradle 9.7.1 and detekt alpha.6 was set up). The combination is established from sources, the plugin's tests, public build files and one public CI status, not from a first-hand run.
  The seeded-violation test in Section 6 is the first-hand evidence this build still needs; it should be built and run before the pin is relied on.
- **The 1.23.8 failure on Kotlin 2.2 is inferred.** The metadata arithmetic (2.2.0 against a reader limit of 2.1.0, measured on the stdlib jar) and the documented Kotlin 2.3 symptom make it near-certain that `kotlin.runCatching` is unresolved, but I did not observe a missed finding.
  Search snippets of two Slack threads reported Kotlin 2.2 plus 1.23.8 false positives and a fix by turning off the worker API; the pages returned HTTP 403 and 429, so they are not cited as evidence.
- **Whether a Gradle JVM test suite's source set (the seven test sets) becomes a Kotlin compilation with its own `detekt<Name>` task** is read from `DetektJvmCompilations` and KGP's behaviour as I remember it, not run. If the test sets are registered another way, the compilation-driven wiring may miss them.
- **Gradle 9.7.1 specifically.** No report of a pure JVM problem on 9.7.x was found; the one 9.7 report (#9742) is Android-only and closed. Public builds run alpha.6 on Gradle 9.5.1 to 9.9.1. If the build runs with `org.gradle.warning.mode=fail`, any deprecation the plugin raises on 9.7.1 would fail it; not checked.
- **`detekt.use.worker.api`:** the default is off in alpha.6 (source and docs agree; the migration guide says the opposite). Whether turning it on is safe on this build and cures #9793 is untested; two public builds run with it on.
- **The migration guide's "Kotlin | 2.4" minimum** conflicts with public builds on Kotlin 2.2.21; I read it as detekt's own build version. No maintainer statement settles it.
- **Whether `-Xjdk-release=21`, `-Xexplicit-api=strict` and the build's other compiler flags pass `validateArguments` in the embedded Kotlin 2.4 parser** is read from the code path, not run.
- **The organisation's policy on pre-release build tooling** is not in this brief. If an alpha pin is not allowed, there is no detekt release that gives type-resolved analysis on Kotlin 2.2.x (an untested fallback, `-Xskip-metadata-version-check` passed to 1.23.8's K1 compiler, would bypass the version check without any guarantee the metadata is read correctly, and is not recommended).
- **No Kotlin-version alignment in the build's resolution rules was checked,** since the build-logic does not exist yet; F4 states the one condition under which the `detekt` configuration needs excluding.
