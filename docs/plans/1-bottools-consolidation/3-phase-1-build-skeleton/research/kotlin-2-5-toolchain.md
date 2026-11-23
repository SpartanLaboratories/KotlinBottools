# Kotlin 2.5 on the build: Gradle range, `kotlin-dsl`, compiler configuration, resolution and release timing

Currency date of every finding: 2026-11-22 (local) / 2026-11-23 UTC. Releases, tags, metadata files and issues were read on that
date. Nothing was built or run: every statement below comes from source files at pinned tags, published metadata read as text, and
documentation. Where a statement is an inference from those sources, it says so.

## 1. Question

Which Gradle versions does the Kotlin Gradle plugin `2.5.0-RC` support, is the Gradle 9.7.1 wrapper the repository carries inside
that range, and what do Kotlin 2.5 and the later move from the release candidate to 2.5.0 change in the build's own
configuration?

The answer has to meet these requirements, all stated as facts about the build:

- The build pins the Kotlin Gradle plugin `2.5.0-RC` (published 2026-11-11 as a pre-release; 2.5.0 is not out) and the
  serialization compiler plugin at the same version, and moves to 2.5.0 when it is released.
- It compiles at language version 2.5 and API version 2.5. The JDK toolchain and the Java floor stay at 21: one constant sets
  `jvmTarget` (through `JvmTarget.fromTarget("21")`) and `-Xjdk-release=21`; `explicitApi()` is on.
- The repository carries the Gradle 9.7.1 wrapper. `build-logic` is an included build applying `kotlin-dsl`; it declares the
  plugins it applies as `implementation` dependencies by their plugin-marker coordinates, and the root `settings.gradle.kts` names
  the Kotlin plugins' versions in `pluginManagement`. Gradle 9.7.1 embeds Kotlin 2.4.0 for `kotlin-dsl`.
- Plugins and compiler artifacts resolve from Maven Central and the Gradle Plugin Portal only.

## 2. Bottom line

- **Gradle 9.7.1 is inside the range the Kotlin Gradle plugin 2.5.0-RC supports. Keep the wrapper.** The plugin enforces only a
  minimum, Gradle 8.14: below it the plugin fails the build; above it nothing checks. Its integration tests cover Gradle 8.14.5
  through 9.8.1, and 9.7.0 is a named entry in that matrix (9.7.1 is the same minor release; that 9.7.1 behaves as 9.7.0 is an
  inference). On Gradle 9.6 and newer the plugin loads its `gradle96` variant. No Gradle release embeds Kotlin 2.5 yet (9.8 embeds
  2.4.10, 9.9 embeds 2.4.21), so moving the wrapper would not remove the gap between the embedded Kotlin and the plugin.
- **`kotlin-dsl` on 9.7.1 raises no version warning for this layout (inference from Gradle's source, not observed).** The warning
  "Unsupported Kotlin plugin version" is emitted when `kotlin-dsl` is applied, and it compares Gradle's own embedded Kotlin plugin
  with the embedded version, not the external 2.5.0-RC plugin on `build-logic`'s `implementation` classpath. `build-logic`'s
  sources compile at language and API version 2.2 with Gradle's 2.4.0 compiler, which reads class files up to metadata 2.5.0. The
  plugin's own classes are compiled at language and API 2.1 with `-Xskip-prerelease-check` so that Gradle's older compiler can
  read them. WebTools and MyGameTools run this same layout on Gradle 9.7.1 with a Kotlin plugin (2.2.0) different from the
  embedded one, with green CI.
- **The build's compiler configuration survives unchanged.** `-Xjdk-release` still exists in 2.5.0-RC, without deprecation
  (and still sets `-jvm-target` to the same release); `JvmTarget.fromTarget("21")` and `JVM_21` are present; `explicitApi()` is
  not deprecated; `kotlin { compilerOptions { … } }` is unchanged. The plugin's compiler-options DSL has no replacement
  property for `-Xjdk-release`, so it stays a free compiler argument.
- **Language version 2.5 is the compiler's default at 2.5.0-RC.** `LanguageVersion.LATEST_STABLE` and the plugin's
  `KotlinVersion.DEFAULT` are both 2.5; `languageVersion` and `apiVersion` carry no plugin default, so the compiler picks 2.5. The
  build needs no setting to reach 2.5, but setting both explicitly in the convention plugin makes the choice reproducible when
  2.5.20 or 2.6 changes the compiler's default.
- **Three Kotlin 2.5 changes reach this build.** (1) The unused return value checker is on by default at language version 2.5, in
  `check` mode: it prints warnings, not errors (the build sets no all-warnings-as-errors). (2) "Plugin loaded in multiple
  projects" is an error from 2.5.0-Beta1, where it was a warning. (3) The compiler's JDK-17 minimum becomes an error (opt-out
  `-Xallow-pre-17-runtime-jdk`); a JDK 21 toolchain and a JDK 21 Gradle daemon are unaffected.
- **Resolution needs no extra repository, and 2.5.0 is planned for December 2026.** The markers and `kotlin-gradle-plugin` 2.5.0-RC
  are on Maven Central and the Gradle Plugin Portal; the compiler artifacts are on Maven Central. Kotlin's release page plans 2.5.0
  for December 2026 (2.5.20 for March 2027). The move from the release candidate to 2.5.0 changes version strings only: the plugin and
  serialization-plugin pins in two places, which the gating test keeps equal. I found nothing that changes the Gradle range
  between the release candidate and 2.5.0, but no source states it.

## 3. Findings

### F1. The plugin enforces a minimum Gradle of 8.14 and no maximum (Established: source at the tag)

- `GradleCompatibilityCheck` holds `minSupportedGradleVersionString = "8.14"`, and `runGradleCompatibilityCheck` reports
  `IncompatibleGradleVersionTooLowFatalError` only when `currentVersion < minSupportedGradleVersion`. There is no upper bound
  check. Source: [`GradleCompatibilityCheck.kt` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/internal/diagnostics/GradleCompatibilityCheck.kt).
- The minimum was raised in 2.5.0-Beta1: "KT-84114 Bump the minimal supported Gradle version to 8.14.x"
  ([Beta1 changelog](https://github.com/JetBrains/kotlin/releases/tag/v2.5.0-Beta1); YouTrack [KT-84114](https://youtrack.jetbrains.com/issue/KT-84114), fixed, available in 2.5.0-Beta1).
  The stable documentation page, which still describes 2.4.x, lists 7.6.3 as the minimum for 2.4.20 to 2.4.21 and has no row for
  2.5 ([gradle-configure-project.md](https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/gradle/gradle-configure-project.md)).
  Where the two disagree, the plugin's source is the authority for 2.5.0-RC.
- The tested range: `TestVersions.Gradle` has `MIN_SUPPORTED = G_8_14` (8.14.5) and `MAX_SUPPORTED = G_9_8` (9.8.1), with `G_9_0` to
  `G_9_8` as named entries, among them `G_9_7 = "9.7.0"`. Source: [`TestVersions.kt` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-integration-tests/src/test/kotlin/org/jetbrains/kotlin/gradle/testbase/TestVersions.kt).
  Beta2 added "KT-88594 Compatibility with Gradle 9.8 release"; Beta1 compiled the plugin against Gradle API 9.7 and ran the
  integration and functional tests on 9.7 (KT-87993, KT-87994, KT-87995, Beta1 changelog).
- Gradle 9.7.1 is therefore inside the tested range (8.14 to 9.8). Gradle 9.8.2 and 9.9.x are above the tested maximum; nothing
  enforces it, and public builds run 9.9.x (F9).

### F2. On Gradle 9.6 and newer the plugin uses its `gradle96` variant (Established: source and published metadata)

- The published Gradle module metadata of `kotlin-gradle-plugin` 2.5.0-RC has the variants `gradle96ApiElements` and
  `gradle96RuntimeElements` with attribute `org.gradle.plugin.api-version` = `9.6`, next to the base variants. Source:
  [`kotlin-gradle-plugin-2.5.0-RC.module`](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/2.5.0-RC/kotlin-gradle-plugin-2.5.0-RC.module)
  (the Central listing also holds `kotlin-gradle-plugin-2.5.0-RC-gradle96.jar`).
- The integration test `properPluginVariantIsUsed` expects `gradle96` for Gradle 9.6, 9.7 and 9.8 and `gradle813` for 9.0 to 9.5 and
  8.14, asserting the output line "Using Kotlin Gradle Plugin $expectedVariant variant". Source:
  [`GradleCompatibilityIT.kt` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-integration-tests/src/test/kotlin/org/jetbrains/kotlin/gradle/GradleCompatibilityIT.kt).
  No variant exists above `gradle96`, so 9.8 and 9.9 would take the same one (inference from the variant list).
- The plugin and its API modules declare no `kotlin-stdlib` dependency (the metadata lists only plugin-internal modules; the POM
  excludes the standard library), so the plugin runs on the standard library Gradle provides.

### F3. What `kotlin-dsl` does on Gradle 9.7.1, and when Gradle prints its warning (Established for the source; the absence of a warning here is an inference)

- `kotlin-dsl` configures the Kotlin compile tasks of the project that applies it with `apiVersion` and `languageVersion` set to
  `KotlinVersion.KOTLIN_2_2`, plus `-java-parameters`, `-jvm-default=enable`, `-Xsam-conversions=class`, `-Xjsr305=strict` and
  `-Xjspecify-annotations=strict`. Source: [`KotlinDslCompilerPlugins.kt` at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/core-configuration/kotlin-dsl-plugins/src/main/kotlin/org/gradle/kotlin/dsl/plugins/dsl/KotlinDslCompilerPlugins.kt),
  [Kotlin DSL reference at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/reference/dsl-apis/kotlin_dsl.adoc).
  Gradle's compatibility table lists embedded Kotlin 2.4.0 with "Kotlin Language version" 2.2 from Gradle 9.7.0
  ([compatibility.adoc at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/releases/compatibility.adoc)).
- The warning is defined in `EmbeddedKotlinPlugin` (applied by `kotlin-dsl`): `EmbeddedKotlinPlugin.apply` calls
  `logger.warnOnDifferentKotlinVersion(getKotlinPluginVersion())`, and `warnOnDifferentKotlinVersion` prints "WARNING: Unsupported Kotlin
  plugin version." when that version differs from the embedded Kotlin. Source: [`EmbeddedKotlinPlugin.kt` at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/core-configuration/kotlin-dsl-plugins/src/main/kotlin/org/gradle/kotlin/dsl/plugins/embedded/EmbeddedKotlinPlugin.kt).
  It runs once, when the plugin is applied, in the project that applies `kotlin-dsl` (here `build-logic`), and the plugin it
  inspects is the one `kotlin-dsl` itself applies, which is the Kotlin plugin Gradle embeds. `build-logic`'s `implementation`
  dependency on the 2.5.0-RC plugin is not that plugin: it is on the compile and runtime classpath of the convention plugins, and
  the root build loads it. Inference: no "Unsupported Kotlin plugin version" line appears for this layout on 9.7.1. Not observed.
- From Gradle 9.8 the check is a task, `checkKotlinCompilerVersion`, that every `KotlinCompile` task of the `kotlin-dsl` project
  depends on, comparing the compiler version of that project with the embedded version ([`CheckKotlinCompilerVersion.kt` at v9.9.2](https://github.com/gradle/gradle/blob/v9.9.2/platforms/core-configuration/kotlin-dsl-plugins/src/main/kotlin/org/gradle/kotlin/dsl/plugins/embedded/CheckKotlinCompilerVersion.kt)).
  The same inference applies; moving the wrapper to 9.8 or newer changes where the check runs, not the outcome expected here.
- `kotlin-dsl` also warns "This version of Gradle expects version '…' of the `kotlin-dsl` plugin but version '…' has been applied"
  when the plugin's own version differs; the build does not set a `kotlin-dsl` version, so this does not apply.
- Gradle's compatibility page says: "Gradle is tested with Kotlin 2.0.0 through 2.4.20-Beta1. Beta and RC versions may or may not
  work." on 9.7.1 (and "through 2.5.0-Beta1" on 9.9.2). The 2.5.0-RC plugin is beyond Gradle 9.7.1's own tested range and inside the
  plugin's own tested range (F1). Gradle's documented concern: "The primary compatibility concern lies between the external
  `kotlin-gradle-plugin` version and the `kotlin-stdlib` version shipped with Gradle."
- Why that concern is met: the plugin's main compile task is configured by `configureGradleCompatibility()`, which sets
  `languageVersion` and `apiVersion` to `GradlePluginVariant.COMPILE_KOTLIN_VERSION` (`"2.1"`) with the comment "we should keep
  control of the language version for compatibility with bundled Kotlin compiler for Gradle Kotlin scripts" and passes
  `-Xskip-prerelease-check`. Source: [`GradleCommon.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/repo/gradle-build-conventions/gradle-plugins-common/src/main/kotlin/gradle/GradleCommon.kt),
  [`GradlePluginVariant.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/repo/gradle-build-conventions/gradle-plugins-common/src/main/kotlin/gradle/GradlePluginVariant.kt),
  [`kotlin-gradle-plugin/build.gradle.kts`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/build.gradle.kts) (calls `configureGradleCompatibility()`). That the
  API modules and the `gradle96` variant are compiled the same way, and at which metadata version, I did not read (see Gaps);
  a Kotlin 2.4.0 reader accepts metadata up to 2.5.0 (its own plus one minor; the rule is shown for 2.0.21 in the detekt findings'
  F4 and in `JvmMetadataVersion`), so even metadata 2.5.0 would be readable (inference).
- The 2.5 compiler does not compile `build-logic`: Gradle 9.7.1 compiles the precompiled script plugins with its own 2.4.0
  compiler. The 2.5 compiler runs only for the library modules, through the plugin the convention plugins apply.

### F4. The compiler configuration: what is unchanged in 2.5.0-RC (Established: source at the tag)

All from the compiler's argument descriptions and the plugin's API at `v2.5.0-RC`:

- **`-Xjdk-release`** is declared in `JvmCompilerArguments.kt`: "Compile against the specified JDK API version, similarly to javac's
  '-release'. This requires JDK 9 or newer. … This also sets the value of '-jvm-target' to be equal to the selected JDK version."
  Its lifecycle is `introducedVersion = v1_7_0` with no deprecation and no removal; it is not in the removed-arguments file. The
  supported range for JDK 17+ is now "1.8 and 9–28". There is no typed property for it in `KotlinJvmCompilerOptions` (which
  has `javaParameters`, `jvmDefault`, `jvmTarget`, `moduleName`, `noJdk`), so `freeCompilerArgs.add("-Xjdk-release=21")` stays. Sources:
  [`JvmCompilerArguments.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/arguments/src/org/jetbrains/kotlin/arguments/description/JvmCompilerArguments.kt),
  [`removedJvmCompilerArguments.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/arguments/src/org/jetbrains/kotlin/arguments/description/removed/removedJvmCompilerArguments.kt),
  [`KotlinJvmCompilerOptions.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/KotlinJvmCompilerOptions.kt).
- **`JvmTarget`**: `JVM_21("21")` exists and `JvmTarget.fromTarget(String)` is unchanged; 27 and 28 are new; `DEFAULT = JVM_1_8` is unchanged
  ([`JvmTarget.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-compiler-types/src/generated/kotlin/org/jetbrains/kotlin/gradle/dsl/JvmTarget.kt)).
- **`explicitApi()`**: `KotlinTopLevelExtensionConfig` declares `fun explicitApi()` ("Sets [explicitApi] option to report issues as
  errors.") without a deprecation; `-Xexplicit-api` is unchanged (introduced 1.3.70, no deprecation). The type
  `KotlinTopLevelExtension` is `@Deprecated("Replaced with 'KotlinBaseExtension'")` (since 2.1.0), which only matters to code that
  names that type
  ([`kotlinTopLevelExtensionConfig.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/kotlinTopLevelExtensionConfig.kt),
  [`KotlinTopLevelExtension.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/KotlinTopLevelExtension.kt)).
- **`compilerOptions` DSL**: `languageVersion`, `apiVersion`, `optIn`, `progressiveMode` and `freeCompilerArgs` are still
  `Property`/`ListProperty` members. The documentation says of `freeCompilerArgs`: "We are going to deprecate the attribute
  `freeCompilerArgs` in future releases"; that is documentation of intent, not a 2.5 change
  ([gradle-compiler-options.md](https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/gradle/gradle-compiler-options.md)).
- **No compiler argument the build uses is removed in 2.5.0.** Arguments removed in 2.5.0 include `-Xcontext-receivers`,
  `-Xsuppress-deprecated-jvm-target-warning`, `-Xuse-fir-experimental-checkers` and `-Xno-check-actual`
  ([`removedCommonCompilerArguments.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/arguments/src/org/jetbrains/kotlin/arguments/description/removed/removedCommonCompilerArguments.kt)).

### F5. Language and API version 2.5 are the compiler's default and are stable in 2.5.0-RC (Established: source at the tag)

- `LanguageVersion.LATEST_STABLE = KOTLIN_2_5`; the source's status table, "Language: UNSUPPORTED --> DEPRECATED ---> STABLE ---> EXPERIMENTAL" over the columns
  "1.0..2.1", "2.2..2.2", "2.3..2.5", "2.6..2.7", puts 2.5 in the stable column and 2.2 in the deprecated one. The plugin's `KotlinVersion.DEFAULT = KOTLIN_2_5`, and `KOTLIN_2_2` carries
  `@Deprecated("Will be removed soon")`, `KOTLIN_2_0` and `KOTLIN_2_1` are deprecation level ERROR. Sources:
  [`LanguageVersionSettings.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt),
  [`KotlinVersion.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-compiler-types/src/generated/kotlin/org/jetbrains/kotlin/gradle/dsl/KotlinVersion.kt).
- `languageVersion` and `apiVersion` in `CommonCompilerArguments.kt` are declared with `defaultValue = null`, so when the build sets
  neither the compiler uses its latest stable language version, 2.5. The documentation's property table, written for 2.4.21, still
  labels "2.5" as "(EXPERIMENTAL)" with an empty default; the compiler source at the 2.5.0-RC tag has 2.5 as the latest stable.
- Consequence for `build-logic`: `kotlin-dsl` pins its own compile at 2.2 (F3) on Gradle's 2.4.0 compiler. Language version 2.2 is
  deprecated only on the 2.5 compiler; it does not run there.
- Whether binaries compiled at 2.5 by the release candidate carry the pre-release marker is another question's subject. For
  reference only: `KotlinCompilerVersion.IS_PRE_RELEASE` is `false` at the `v2.5.0-RC` tag, and `LanguageVersion.isPreRelease()` is
  `!isStable`, or `KotlinCompilerVersion.isPreRelease() && this == LATEST_STABLE` otherwise; the constant's comment says "Change this value
  before and after every major release" ([`KotlinCompilerVersion.java`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/compiler.version/src/org/jetbrains/kotlin/config/KotlinCompilerVersion.java)).
  That is read from source, not observed on a compiled class.

### F6. Kotlin 2.5 changes that reach a JVM library built this way (Established: source, documentation, issues)

- **The unused return value checker is on by default at language version 2.5.** The plugin's DSL says: "Until Kotlin `2.5`, the
  checker is disabled by default, and starting from Kotlin `2.5` it is enabled in the check mode"; the 2.5 "What's new" lists it
  among the stable language features "now enabled by default". The compiler's argument text agrees: "'default' mode is based on the
  current language version: Since Kotlin 2.5, checker is enabled by default." In `check` mode it warns for a discarded result of
  a declaration marked `@MustUseReturnValues` (most of the standard library), as `w: … Unused return value of 'annotated'. If this is
  intentional, use 'val _ = ' to ignore the value explicitly.` (from [KT-91772](https://youtrack.jetbrains.com/issue/KT-91772)). These are
  warnings; the build does not set `allWarningsAsErrors`, so nothing fails. The DSL to change the mode is
  `kotlin { returnValueCheckerMode.set(ReturnValueCheckerMode.Disabled | Check | Full) }` and
  `returnValueCheckerModeForTests`, both `@ExperimentalKotlinGradlePluginApi` (opt-in needed). Open issue
  [KT-90962](https://youtrack.jetbrains.com/issue/KT-90962): `-Xreturn-value-checker` in `freeCompilerArgs` overrides the DSL value. Sources:
  [`KotlinBaseExtension.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/KotlinBaseExtension.kt),
  [`CommonCompilerArguments.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/arguments/src/org/jetbrains/kotlin/arguments/description/CommonCompilerArguments.kt),
  [whatsnew-eap.md](https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/whatsnew/whatsnew-eap.md).
- **"Plugin loaded in multiple projects" is an error.** KT-61225, "Turn 'Kotlin Gradle plugin was loaded multiple times' warnings into
  error", is fixed in 2.5.0-Beta1. `KotlinToolingDiagnostics.PluginLoadedInMultipleProjectsError` has severity `ERROR`; it fires when a
  project applies the plugin in a class loader other than the first project's, typically through `plugins { kotlin("jvm") version … }`
  in subprojects. The detector's own documentation says the plugin applied at the root (for example
  `plugins { kotlin(...) apply false }`) is shared by the subprojects. The escape hatch is the Gradle property
  `kotlin.pluginLoadedInMultipleProjects.ignore=true`. Sources:
  [`KotlinPluginLoadedInMultipleProjectsDetectorService.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/KotlinPluginLoadedInMultipleProjectsDetectorService.kt),
  [`KotlinToolingDiagnostics.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/diagnostics/KotlinToolingDiagnostics.kt),
  [KT-61225](https://youtrack.jetbrains.com/issue/KT-61225). In this build every module gets the plugin from the convention plugin
  (one class loader, `build-logic`'s) and the root build script applies it with `apply false`; whether the root's `plugins {}` request and the
  convention plugin's `id()` end up in one class loader in this exact layout is not read from source and is a first-run check (Gaps).
- **The JDK-17 floor for running the compiler becomes an error** in 2.5.0 ("Opt out of the error with the `-Xallow-pre-17-runtime-jdk`
  compiler option. This option will be removed in Kotlin 2.5.20 or 2.6.0 when JDK 17 becomes mandatory."). The build's toolchain is
  JDK 21 and Gradle 9.7.1 runs on JDK 17 to 26 ([compatibility.adoc](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/releases/compatibility.adoc)), so it is not hit.
- **The non-Build-Tools-API compiler mode is dropped** (KT-85434, Beta2). The build sets no `kotlin.compiler.runViaBuildToolsApi`
  property (the repository's `gradle.properties` holds only `kotlin.code.style=official`), so it is unaffected.
- **Type inference changes** ("Improved type inference performance", enabled by default; restore with
  `-XXLanguage:-EliminateSecondKindIncorporation`) and the stricter equality checks (opt-in only) do not touch the build
  configuration; they matter only if library source later meets one of the edge cases.
- The 2.5 "What's new" page has no separate compatibility guide yet: the kotlin-web-site folder
  `docs/topics/compatibility-guides/` ends at `compatibility-guide-24.md` on 2026-11-22. The "Breaking changes and deprecations"
  section of `whatsnew-eap.md` holds only the JDK-17 item.

### F7. Where the release candidate resolves from (Established: repository metadata read as text)

- Maven Central `maven-metadata.xml` for `org.jetbrains.kotlin.jvm:org.jetbrains.kotlin.jvm.gradle.plugin` and for
  `org.jetbrains.kotlin.plugin.serialization:org.jetbrains.kotlin.plugin.serialization.gradle.plugin`: `<latest>2.5.0-RC</latest>`,
  `<release>2.5.0-RC</release>`, `<lastUpdated>` 20261111082533 and 20261111082541; the Gradle Plugin Portal's metadata for the same
  two markers has `<release>2.5.0-RC</release>`, `<lastUpdated>` 20261111093615 and 20261111093621. The marker POM's single
  dependency is `org.jetbrains.kotlin:kotlin-gradle-plugin:2.5.0-RC`
  ([Central](https://repo1.maven.org/maven2/org/jetbrains/kotlin/jvm/org.jetbrains.kotlin.jvm.gradle.plugin/maven-metadata.xml),
  [Portal](https://plugins.gradle.org/m2/org/jetbrains/kotlin/jvm/org.jetbrains.kotlin.jvm.gradle.plugin/maven-metadata.xml)).
- `kotlin-gradle-plugin` 2.5.0-RC (jar, `-gradle96` jar, `.module`, POM) is on Maven Central, published 2026-11-11 08:15; its Gradle
  component status is `release`. `kotlin-compiler-embeddable`, `kotlin-stdlib`, `kotlin-build-tools-impl`,
  `kotlin-serialization-compiler-plugin-embeddable` and `kotlin-reflect` each have `2.5.0-RC` as `<release>` on Maven Central. The Portal answers a request for the
  `kotlin-gradle-plugin` POM with a redirect (HTTP 303), which is how it proxies Central.
- Kotlin's own instructions for an early-access build: change the version in the `plugins` block or in `pluginManagement`; "The EAP
  version of Kotlin may not work with the libraries of the previously released version", and the sample uses `mavenCentral()` only
  ([configure-build-for-eap.md](https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/configure-build-for-eap.md)). No repository beyond Central and the Portal
  is needed for the compiler, standard library or plugins.

### F8. Release timing and what the move to 2.5.0 changes (Established for the schedule; the change list is partly inference)

- "2.5.0: Planned for December 2026; 2.5.20: Planned for March 2027" ([Kotlin release process](https://kotlinlang.org/docs/releases.html), read 2026-11-22). The
  schedule says "approximate". Kotlin's cadence: language releases every six months, tooling releases (2.x.20) three months later.
  Release history: 2.5.0-Beta1 2026-09-23, Beta2 2026-10-21, RC 2026-11-11
  ([JetBrains/kotlin releases](https://github.com/JetBrains/kotlin/releases)). The early-access page lists RC as "The first release
  candidate" and RC2 as the stage that "Includes important fixes to finalize the release", so an RC2 between the RC and 2.5.0 is
  possible.
- What the move changes in this build: the plugin version string in `build-logic/build.gradle.kts` (the two marker dependencies) and in
  `settings.gradle.kts` (`pluginManagement.plugins`), which the gating test already keeps equal. Nothing in the configuration of
  F4 to F6 depends on the suffix: a qualifier such as `RC` orders below the release in Gradle's version ordering (not re-read for this file), so no dependency
  constraint in the build resolves a final 2.5.0 below the release candidate.
- Still to re-read at 2.5.0 (not knowable now): the documented Gradle range table's 2.5 row, the 2.5.0 compatibility guide, and
  `KotlinCompilerVersion.IS_PRE_RELEASE` (F5).

### F9. Public builds on the release candidate (Common practice, observed in repositories; no run by me)

- `ktlint/ktlint` (pure JVM): `kotlin = "2.5.0-RC"` in `gradle/libs.versions.toml`, Gradle 9.9.2, `dev.detekt` 2.0.0-alpha.6, plugin
  repositories `mavenCentral()` and `gradlePluginPortal()`. Its pull-request run on the branch that moved to 2.5.0-RC (2026-11-22,
  jobs `[build] … Kotlin=stable`, `[build] … Kotlin=dev`, tests on Java 17 and 21) succeeded. One run on the merge commit failed in
  seconds with "Plugin [id: 'org.jetbrains.kotlin.jvm', version: '2.5.0-RC', apply: false] was not found … could not resolve plugin
  artifact"; the markers were on both repositories on that date and I could not establish why that run failed (Gaps). Afterwards the
  project skips its CI build while its catalog says `2.5.0-RC`, for a reason specific to ktlint: "Ktlint now requires the Kotlin
  Analysis API which is only exposed as from Kotlin 2.5.0", and builds the release with a `-PkotlinDev` plugin until 2.5.0 is out
  ([commit b41489f](https://github.com/ktlint/ktlint/commit/b41489f1), [catalog](https://github.com/ktlint/ktlint/blob/master/gradle/libs.versions.toml)). A library that does not use the Analysis API is not
  affected by that reason.
- `JakeWharton/prerelease-testing` (`kotlin = "2.5.0-RC"`, `org.jetbrains.kotlin:kotlin-gradle-plugin`, Gradle 9.9.2),
  `respawn-llc/FlowMVI` (2.5.0-RC, Gradle 9.9.2), `rjaros/kvision` (2.5.0-RC, Gradle 9.9.1-all). Kotlin/dokka uses the 2.5.0-RC compiler artifact
  ("kotlin-compiler-k2") on Gradle 8.14.5.
- I found no public build on Gradle 9.7.x with the 2.5.0-RC or 2.5.0-Beta plugin. Of sixteen repositories (a sample of code-search hits for `2.5.0-RC`, not exhaustive) whose wrapper
  I read, none was on 9.7.x; most were on 9.9.x. So the 9.7.1 plus 2.5.0-RC pairing rests on the plugin's own tests (F1) and not on a public
  build.
- The organisation's builds: WebTools and MyGameTools run `kotlin-dsl` build-logic on Gradle 9.7.1 with the plugin markers pinned at 2.2.0
  as `implementation` dependencies and `pluginManagement.plugins` carrying the same versions; the latest CI run of WebTools on its
  default branch (2026-11-22) was green. GeneralTools is on Gradle 9.0.0 and has no such build-logic read here. None of the three is on a
  2.5 pre-release.

## 4. How comparable projects do it

| Project (pinned) | Gradle | Kotlin plugin | Notes |
|---|---|---|---|
| WebTools default branch, `build-logic/build.gradle.kts` and `settings.gradle.kts` | 9.7.1 | markers at `2.2.0`, equal to `pluginManagement.plugins` | `kotlin-dsl` build-logic with `implementation("org.jetbrains.kotlin.jvm:org.jetbrains.kotlin.jvm.gradle.plugin:2.2.0")`; the Kotlin plugin differs from Gradle's embedded 2.4.0 |
| MyGameTools default branch | 9.7.1 | markers at `2.2.0` (jvm and serialization) | same shape |
| `ktlint/ktlint` @ `b41489f` | 9.9.2 | `kotlin-jvm` 2.5.0-RC from the catalog | `pluginManagement.repositories`: Central and Plugin Portal only; skips its CI build on the RC for an Analysis-API reason |
| JetBrains' own tests | 8.14.5 to 9.8.1 | the plugin under test | `TestVersions.Gradle.MIN_SUPPORTED`, `MAX_SUPPORTED`; 9.7.0 listed |

Code symbols read: `GradleCompatibilityCheck.runGradleCompatibilityCheck`, `GradlePluginVariant.COMPILE_KOTLIN_VERSION`,
`KotlinPluginLoadedInMultipleProjectsDetectorService.detect`, `KotlinBaseExtension.returnValueCheckerMode`
(Kotlin v2.5.0-RC); `EmbeddedKotlinPlugin.warnOnDifferentKotlinVersion`, `KotlinDslCompilerPlugins.apply` (Gradle v9.7.1),
`CheckKotlinCompilerVersion` (Gradle v9.8.2 and v9.9.2).

## 5. Pitfalls and regrets

- **Setting a Kotlin version on a subproject.** With the plugin as an error on a second class loader (F6), a module build script that
  writes `kotlin("jvm") version "…"` in its own `plugins {}` fails the build. Keep every module on the convention plugin.
- **Reading the stable documentation page as the range for 2.5.** It lists 7.6.3 as the minimum for 2.4.20 to 2.4.21; 2.5.0-RC refuses
  anything below 8.14.
- **Silent warnings turned into noise or into failures.** The default-on return value checker adds warnings to a library's first compile.
  If the build later adopts `allWarningsAsErrors`, each such warning fails `compileKotlin`. Decide the checker mode at the same time.
- **Combining `-Xreturn-value-checker` in `freeCompilerArgs` with the DSL property** makes the free argument win (KT-90962, open).
- **`-Xjdk-release` is an advanced `-X` argument.** It is stable in practice (present since 1.7.0, never deprecated), but
  the compiler's rule that it also sets `-jvm-target` remains: the two constants must stay equal, as the build's single constant
  guarantees.
- **A release candidate is not a patch release.** ktlint shows the two ways it fails projects: a downstream tool that is not yet available
  for the candidate (its Analysis API need) and an unexplained plugin-resolution failure on one CI run (F9). Both argue for a first
  clean-clone CI run of the build skeleton on the exact pin before anything depends on it.
- **A forced Kotlin version across all configurations** (a `resolutionStrategy.eachDependency` over `org.jetbrains.kotlin`) would also
  rewrite `kotlin-dsl`'s embedded-version expectations and detekt's own configuration; the build sets none, and should not add one.

## 6. Recommendation for this repository

Keep the Gradle 9.7.1 wrapper and pin the Kotlin Gradle plugin and the serialization plugin at `2.5.0-RC`, as markers in
`build-logic/build.gradle.kts` and in `pluginManagement.plugins`, with the gating test continuing to assert the pairs equal. The
plugin tests Gradle 9.7 itself, enforces nothing above 8.14, and loads its `gradle96` variant on 9.7.1; the organisation's other two
builds already run `kotlin-dsl` build-logic on 9.7.1 with a Kotlin plugin that differs from the embedded one. No Gradle release
embeds Kotlin 2.5, so a wrapper change would neither remove the embedded-Kotlin gap nor give the build any capability it lacks, and it
would invalidate the version pairings the other findings of this unit were read against.

The convention plugin keeps its planned shape. Set the language and API version explicitly, next to the Java-floor constants:

```kotlin
kotlin {
    jvmToolchain(BotToolsBuild.JDK_TOOLCHAIN)
    explicitApi()
    compilerOptions {
        languageVersion.set(KotlinVersion.KOTLIN_2_5)   // the 2.5 compiler's default too; stated so that 2.5.20 or 2.6 cannot move it
        apiVersion.set(KotlinVersion.KOTLIN_2_5)
        jvmTarget.set(JvmTarget.fromTarget(BotToolsBuild.JAVA_FLOOR.toString()))
        freeCompilerArgs.add("-Xjdk-release=${BotToolsBuild.JAVA_FLOOR}")
    }
}
```

(`org.jetbrains.kotlin.gradle.dsl.KotlinVersion`, illustrative, not run.) `-Xjdk-release`, `JvmTarget.fromTarget("21")` and
`explicitApi()` need no change; `-Xjdk-release` stays a free argument because the plugin has no typed property for it.

Three things to settle in the same unit, none of which changes the pin:

- **The return value checker.** Leave it at the default (`check` mode, warnings only): it flags a dropped `Result` and a dropped
  standard-library result, which suits a code base that models expected failure as `Result`. If the build ever sets
  all-warnings-as-errors, set `returnValueCheckerMode` deliberately at the same time. `Full` (every declaration is must-use)
  is an option worth trying once there is library source; it was not evaluated here.
- **A clean-clone first run.** The build has to be run once from a clean clone on the exact pin to settle what this research reads but
  does not observe: no "Unsupported Kotlin plugin version" line from `build-logic`, no "loaded multiple times" error, and a
  `-Xjdk-release=21` compile (Gaps).
- **The move to 2.5.0.** Change the two version strings (markers and `pluginManagement.plugins`, for both plugins) and re-run the
  clean-clone build; re-read the documented Gradle range, the compatibility guide and `IS_PRE_RELEASE` for 2.5.0. Keep the wrapper unless
  the 2.5.0 range excludes 9.7.1.

**Options that do not fit.**

- *A newer Gradle (9.8.1, the plugin's newest tested; 9.8.2 or 9.9.2, newest).* It is supported by the same evidence plus the
  absence of a ceiling, but gains nothing: embedded Kotlin stays 2.4.10 (9.8) or 2.4.21 (9.9), and Gradle's tested Kotlin range moves
  only to 2.5.0-Beta1 on 9.9.2. What moving changes: `gradle/wrapper/gradle-wrapper.properties` (`distributionUrl` and
  `distributionSha256Sum`), `gradle/wrapper/gradle-wrapper.jar`, and `gradlew` and `gradlew.bat`, all regenerated by Gradle's `wrapper`
  task. The distribution checksums are: 9.7.1 `acd53f1e…d20a` (current), 9.8.2 `21bd5da2…9607`, 9.9.2 `971fcd71…c76b`; the wrapper jar changes
  checksum between 9.7.1 (`7a9ce74c…2c5d`), 9.8.x (`3b8a2577…8e98`) and 9.9.2 (`621008af…daf8`). Held in reserve in case a clean-clone run shows a
  9.7.1-specific problem; nothing read indicates one.
- *Holding the Kotlin plugin at an older version with a newer `compilerVersion`.* Excluded by the requirement to build with the 2.5 plugin;
  it also carries an open defect (KT-91772: an explicit argument equal to the plugin's own default is dropped when the compiler is newer).
- *Setting nothing for language and API version.* Works at 2.5.0-RC and 2.5.0, but leaves the level to the compiler's default, which
  moves with the next language release.

## 7. Load-bearing claims

1. **The plugin's minimum Gradle is 8.14, enforced as a fatal error, with no upper check.** Quote: "`internal const val minSupportedGradleVersionString = "8.14"`" and "`if (currentVersion < minSupportedGradleVersion) {` … `IncompatibleGradleVersionTooLowFatalError(`". Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/internal/diagnostics/GradleCompatibilityCheck.kt>. Applies to tag `v2.5.0-RC` (read 2026-11-23).
2. **The plugin's tests cover Gradle 8.14.5 to 9.8.1 and list 9.7.0.** Quote: "`const val G_9_7 = "9.7.0"`", "`const val MIN_SUPPORTED = G_8_14`", "`const val MAX_SUPPORTED = G_9_8`" (with `G_8_14 = "8.14.5"`, `G_9_8 = "9.8.1"`). Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-integration-tests/src/test/kotlin/org/jetbrains/kotlin/gradle/testbase/TestVersions.kt>. Applies to `v2.5.0-RC`.
3. **The `gradle96` variant is selected on Gradle 9.7.** Quote: "`GradleVersion.version(TestVersions.Gradle.G_9_7) -> "gradle96"`" and "`assertOutputContains("Using Kotlin Gradle Plugin $expectedVariant variant")`". Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-integration-tests/src/test/kotlin/org/jetbrains/kotlin/gradle/GradleCompatibilityIT.kt>. Published metadata: `"name": "gradle96ApiElements"` with `"org.gradle.plugin.api-version": "9.6"` in <https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-gradle-plugin/2.5.0-RC/kotlin-gradle-plugin-2.5.0-RC.module>. Applies to 2.5.0-RC.
4. **The minimum Gradle was raised in 2.5.0-Beta1.** Quote: "KT-84114 Bump the minimal supported Gradle version to 8.14.x" (Beta1 and Beta2 changelogs) and the issue text "we want to bump our minimum required Gradle version in Kotlin Gradle plugins to the latest in the 8.x series - 8.14.x." Sources: <https://github.com/JetBrains/kotlin/releases/tag/v2.5.0-Beta1>, <https://youtrack.jetbrains.com/issue/KT-84114>. Applies to 2.5.0-Beta1 and later.
5. **Gradle's embedded Kotlin and tested range on 9.7.1.** Quote: "Gradle is tested with Kotlin 2.0.0 through 2.4.20-Beta1. Beta and RC versions may or may not work." and the table row "| 2.4.0  | 9.7.0 | 2.2". Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/releases/compatibility.adoc>. Applies to Gradle 9.7.1. (On 9.8.2 the same file has "| 2.4.10 | 9.8.0 | 2.2"; on 9.9.2 "| 2.4.21 | 9.9.0 | 2.2" and "through 2.5.0-Beta1".)
6. **`kotlin-dsl` compiles at language and API version 2.2.** Quote: "`apiVersion.set(KotlinVersion.KOTLIN_2_2)`" and "`languageVersion.set(KotlinVersion.KOTLIN_2_2)`". Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/core-configuration/kotlin-dsl-plugins/src/main/kotlin/org/gradle/kotlin/dsl/plugins/dsl/KotlinDslCompilerPlugins.kt>. Applies to Gradle 9.7.1.
7. **Gradle's "Unsupported Kotlin plugin version" warning is raised when `embedded-kotlin`/`kotlin-dsl` is applied, comparing the plugin applied in that project.** Quote: "`logger.warnOnDifferentKotlinVersion(getKotlinPluginVersion())`" and "`WARNING: Unsupported Kotlin plugin version.`". Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/core-configuration/kotlin-dsl-plugins/src/main/kotlin/org/gradle/kotlin/dsl/plugins/embedded/EmbeddedKotlinPlugin.kt>. Applies to Gradle 9.7.1. From 9.8 it is a compile-task dependency: "`kotlinCompile.dependsOn(checkKotlinCompilerVersion)`" in <https://github.com/gradle/gradle/blob/v9.9.2/platforms/core-configuration/kotlin-dsl-plugins/src/main/kotlin/org/gradle/kotlin/dsl/plugins/embedded/EmbeddedKotlinPlugin.kt> (v9.9.2).
8. **Gradle's own statement of the compatibility concern.** Quote: "The primary compatibility concern lies between the external `kotlin-gradle-plugin` version and the `kotlin-stdlib` version shipped with Gradle." Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/reference/dsl-apis/kotlin_dsl.adoc>. Applies to Gradle 9.7.1.
9. **The plugin is compiled at language and API version 2.1 with `-Xskip-prerelease-check` for Gradle's bundled compiler.** Quote: "`// we should keep control of the language version for compatibility with bundled Kotlin compiler for Gradle Kotlin scripts.`", "`const val COMPILE_KOTLIN_VERSION = "2.1"`", "`"-Xskip-prerelease-check",`". Sources: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/repo/gradle-build-conventions/gradle-plugins-common/src/main/kotlin/gradle/GradleCommon.kt>, <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/repo/gradle-build-conventions/gradle-plugins-common/src/main/kotlin/gradle/GradlePluginVariant.kt>. Applies to `v2.5.0-RC`.
10. **`-Xjdk-release` exists in 2.5.0-RC, undeprecated.** Quote: "Compile against the specified JDK API version, similarly to javac's '-release'. This requires JDK 9 or newer." with `lifecycle(introducedVersion = KotlinReleaseVersion.v1_7_0,)` and no `deprecatedVersion`. Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/arguments/src/org/jetbrains/kotlin/arguments/description/JvmCompilerArguments.kt>. Applies to `v2.5.0-RC`.
11. **`JvmTarget` 21 and `fromTarget` exist.** Quote: "`JVM_21("21"),`" and "`fun fromTarget(target: String): JvmTarget =`". Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-compiler-types/src/generated/kotlin/org/jetbrains/kotlin/gradle/dsl/JvmTarget.kt>. Applies to `v2.5.0-RC`.
12. **`explicitApi()` is a non-deprecated member.** Quote: "`fun explicitApi()`" preceded by "Sets [explicitApi] option to report issues as errors." Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/kotlinTopLevelExtensionConfig.kt>. Applies to `v2.5.0-RC`.
13. **Language version 2.5 is the latest stable and the plugin's default constant.** Quote: "`val LATEST_STABLE = KOTLIN_2_5`" and "Language:  UNSUPPORTED --> DEPRECATED ---> STABLE ---> EXPERIMENTAL" over "1.0..2.1       2.2..2.2      2.3..2.5       2.6..2.7"; and "`val DEFAULT = KOTLIN_2_5`". Sources: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt>, <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-compiler-types/src/generated/kotlin/org/jetbrains/kotlin/gradle/dsl/KotlinVersion.kt>. Applies to `v2.5.0-RC`.
14. **The unused return value checker is on by default from Kotlin 2.5, in check mode.** Quote: "Until Kotlin `2.5`, the checker is disabled by default, and starting from Kotlin `2.5` it is enabled in the check mode." Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin-api/src/common/kotlin/org/jetbrains/kotlin/gradle/dsl/KotlinBaseExtension.kt>. Corroborated by "The unused return value checker …, which is now enabled by default." in <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/whatsnew/whatsnew-eap.md> (2.5.0-RC page, read 2026-11-22).
15. **"Plugin loaded in multiple projects" is an error from 2.5.0-Beta1.** Quote: "`internal object PluginLoadedInMultipleProjectsError : ToolingDiagnosticFactory(` `ERROR,`" and "set the kotlin.pluginLoadedInMultipleProjects.ignore=true property to suppress the error". Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/diagnostics/KotlinToolingDiagnostics.kt>; issue KT-61225 (state Fixed, available in 2.5.0-Beta1): <https://youtrack.jetbrains.com/issue/KT-61225>. Applies to 2.5.0-Beta1 and later.
16. **The compiler's JDK-17 floor becomes an error in 2.5.** Quote: "Opt out of the error with the `-Xallow-pre-17-runtime-jdk` compiler option." Source: <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/whatsnew/whatsnew-eap.md> ("Breaking changes and deprecations"). Applies to 2.5.0-RC.
17. **The markers and the plugin are on Maven Central and the Gradle Plugin Portal at 2.5.0-RC.** Quote (Central, both markers): "`<release>2.5.0-RC</release>`"; (Portal): "`<release>2.5.0-RC</release>`". Sources: <https://repo1.maven.org/maven2/org/jetbrains/kotlin/jvm/org.jetbrains.kotlin.jvm.gradle.plugin/maven-metadata.xml>, <https://repo1.maven.org/maven2/org/jetbrains/kotlin/plugin/serialization/org.jetbrains.kotlin.plugin.serialization.gradle.plugin/maven-metadata.xml>, <https://plugins.gradle.org/m2/org/jetbrains/kotlin/jvm/org.jetbrains.kotlin.jvm.gradle.plugin/maven-metadata.xml>, <https://plugins.gradle.org/m2/org/jetbrains/kotlin/plugin/serialization/org.jetbrains.kotlin.plugin.serialization.gradle.plugin/maven-metadata.xml>. Read 2026-11-23.
18. **Kotlin 2.5.0 is planned for December 2026.** Quote: "2.5.0: Planned for December 2026". Source: <https://kotlinlang.org/docs/releases.html> (source file <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/releases.md>). Read 2026-11-22; the page calls the schedule "approximate".
19. **The 2.5.0-RC release exists and is a pre-release; no 2.5.0.** Evidence: the GitHub releases list has `v2.5.0-RC` published 2026-11-11T10:19:34Z with `prerelease: true`, and no `v2.5.0` tag as the newest entry (`v2.4.21` is the newest stable, 2026-10-08). Source: <https://github.com/JetBrains/kotlin/releases>. Read 2026-11-22.
20. **The organisation's builds run this layout on Gradle 9.7.1.** Quote (WebTools `build-logic/build.gradle.kts`): "`implementation("org.jetbrains.kotlin.jvm:org.jetbrains.kotlin.jvm.gradle.plugin:2.2.0")`" under "`kotlin-dsl`"; wrapper "`distributionUrl=https\://services.gradle.org/distributions/gradle-9.7.1-bin.zip`". Sources: <https://github.com/SpartanLaboratories/WebTools/blob/master/build-logic/build.gradle.kts>, <https://github.com/SpartanLabsGaming/MyGameTools/blob/master/build-logic/build.gradle.kts>. Read 2026-11-22.

## 8. Gaps

- **Nothing was run.** No build, no Gradle invocation. The three behaviours the recommendation relies on without observation are: no "Unsupported
  Kotlin plugin version" warning from `build-logic` on 9.7.1 with the 2.5.0-RC plugin as an `implementation` dependency (inferred from
  `EmbeddedKotlinPlugin` and the structure of the WebTools build; I grepped one WebTools CI log for the warning text and found none,
  which is weak evidence because that log is of a documentation job); no "plugin loaded in multiple projects" error with the root's
  `plugins { … apply false }` request, the `pluginManagement.plugins` version and the convention plugin's `id()` in one build; and
  `-Xjdk-release=21` accepted together with `jvmTarget` 21 on the 2.5 compiler (the argument is present and undeprecated in source). If any
  fails, the options are: for the warning, none needed (it is informational); for the error, the property
  `kotlin.pluginLoadedInMultipleProjects.ignore=true` or a layout change; for the flag, dropping it and relying on `verifyJavaFloor`.
- **Gradle 9.7.1 specifically.** The plugin's tests name 9.7.0; no source I found names 9.7.1, a patch release of the same minor.
  No public build on 9.7.x with a 2.5 pre-release plugin was found (F9).
- **The compile metadata of the plugin's API modules and of the `gradle96` variant.** Only `kotlin-gradle-plugin`'s main compile is shown
  to go through `configureGradleCompatibility()`. If any class on `build-logic`'s compile classpath had metadata above 2.5.0, Gradle's 2.4.0
  compiler would refuse it; the plugin is built to avoid that, and WebTools shows the layout works with an older plugin, but no
  source here shows a 2.5.0-RC plugin compiling in a `kotlin-dsl` project. This is the main thing the first run settles.
- **ktlint's one failed run** ("Plugin … 2.5.0-RC … was not found" on the merge commit, 2026-11-22T15:28Z) is unexplained: the same
  markers are on both repositories, and the pull-request run before it resolved the plugin. I could not tell a transient network failure from a
  repository-state cause. If it were a repository-state cause (for example a lag in either repository), the build would fail on a clean
  clone until it cleared.
- **The 2.5.0 release date is approximate** and no source gives a day. An RC2 may precede it.
- **Whether the Gradle range changes between the release candidate and 2.5.0** is not stated anywhere I read; the documented range table for 2.5
  does not exist yet.
- **Binaries built by the release candidate and their pre-release marking** are read from source only (F5) and are the subject of another
  question; the pre-release status also governs what the build's own tools (the static-analysis and ABI tools, which read the library's
  classes) accept, and is not established here.
- **Dokka, the binary-compatibility validator, the static-analysis plugin and the publishing plugin on the 2.5.0-RC plugin** are other questions'
  subjects; nothing here says they work on it.
- **YouTrack open issues against 2.5.0-RC** were listed for the "Tools. Gradle" subsystem on 2026-11-22 (nine unresolved, among them KT-91772,
  KT-90962 and KT-91609, "leftovers after dropping the non-BTA JVM compilation mode"); none concerns a plain JVM library on Gradle 9.7.
  The list is of reported issues and is not a test result.
