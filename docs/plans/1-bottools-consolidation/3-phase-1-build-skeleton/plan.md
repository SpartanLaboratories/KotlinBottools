# Phase 1 — Build skeleton: multi-module build, conventions, CI and repository scaffolding — implementation plan

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#3](https://github.com/SpartanLaboratories/KotlinBottools/issues/3),
  *"Phase 1 — Build skeleton: multi-module build, conventions, CI and repository scaffolding"*, a sub-issue of
  [#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1). Folded into it and closed by the same change:
  - [#29](https://github.com/SpartanLaboratories/KotlinBottools/issues/29), *"Adopt the organization's Dokka and project site
    standard"* (its documents: [`29-dokka-and-project-site/plan.md`](29-dokka-and-project-site/plan.md));
  - [#33](https://github.com/SpartanLaboratories/KotlinBottools/issues/33), *"Library ships a logging backend: logback-classic is
    an implementation dependency"* (its documents: [`33-logging-backend/plan.md`](33-logging-backend/plan.md)).
- **Architecture:** [`../architecture.md`](../architecture.md), unit `build-skeleton` (§14, unit 1), with §1.1, §1.4, §3, §4, §5,
  §6, §9, §10.6, §10.7, §12, §15 and §16. Roadmap: [`../roadmap.md`](../roadmap.md), "Phase 1 — Build skeleton".
- **Branch:** `feat/issue-3-build-skeleton`, cut from `main` before this plan was written. This document is committed in the
  same commit as the first stage it describes (S1), so `git log --follow` binds the two.
- **What this plans:** the six-artifact Gradle build in place of the single-module 7.x build, the `build-logic` convention
  plugins and their checks, the gates (explicit API, Dokka, the ABI check, detekt, the Java floor, the logging-backend check,
  the release-metadata check), the three workflows, the project site, the repository files, the move of the 7.x sources to an
  unbuilt `legacy/` folder, and the repository settings that follow the landing.
- **Status:** planning only.
- **Version:** `1.0.0-SNAPSHOT`. Nothing is released and nothing is published.
- **Research:** [`research/README.md`](research/README.md) and the five findings files beside it. Each fact below that rests on
  the outside world cites its finding.

---

## Requirements

1. **Six artifacts** under `io.github.spartanlaboratories`, one version, `1.0.0-SNAPSHOT`: `bottools-core`,
   `bottools-data-sqlite`, `bottools-http`, `bottools-stats`, `bottools-plugins`, and the umbrella `bottools`, which re-exports
   the five as `api` and holds no source. Module directories equal artifact ids. Package roots are `com.spartanlabs.bottools.*`.
   JVM only, not multiplatform.
2. **`build-logic`**, an included build, with the convention plugins `bottools.kotlin-library` and `bottools.published-library`.
   The second sets `group` and `version`, so Gradle's composite substitution matches `group:name`.
3. **Toolchain.** A JDK 21 toolchain, the Kotlin Gradle plugin 2.2.21, Gradle 9.7.1, the foojay resolver 1.0.0. A **Java floor of
   21**, set apart from the toolchain: one constant sets the Kotlin `jvmTarget` and `-Xjdk-release`, the floor is published as the
   `org.gradle.jvm.version` attribute of the variants, and a `verifyJavaFloor` task guards it in `check`.
4. **Gates.** Every module compiles with `explicitApi()`. Dokka 2 in V2 mode with `reportUndocumented` and `failOnWarning` on every
   Dokka configuration (root and modules) and one aggregated publication at the root. The binary-compatibility validator in
   `check`, with `com.spartanlabs.bottools.annotation.ExperimentalBotToolsApi` in `nonPublicMarkers`. detekt with
   `SuspendFunSwallowedCancellation` on. `./gradlew build` passes on CI from a clean clone and covers compiling with
   `explicitApi()`, Dokka with no undocumented public declaration, the ABI check, detekt and the test tasks.
5. **Test sets.** One task per test set over the packages `com.spartanlabs.testing.<set>.bottools.*`: `gatingTest`,
   `componentTest`, `integrationTest`, `deterministicTest`, `e2eTest`, `nonfunctionalTest`, `uatTest`. The sets are packages inside
   the one `test` source set.
6. **Stability markers** in `bottools-core`, package `com.spartanlabs.bottools.annotation`: `@SupportedExtension` and
   `@ExperimentalBotToolsApi` (`@RequiresOptIn(level = ERROR)`, binary retention).
7. **The umbrella** with its jar guards, its `strictly` pins on the five modules in its published Gradle Module Metadata, and
   `verifyReleasableMetadata` asserting them before any publish.
8. **The walking skeleton's compile-level checks**, committed and run on every build: jda-ktx 0.14.2 against JDA 6.7.0,
   kotlinx-serialization-json 1.9.0 with the compiler plugin at the Kotlin version, the validator on Gradle 9.7.1, and a publish to
   Maven Local. A module with no public API yet gets no placeholder declaration: `bottools-core` holds the two markers, and the
   other four feature modules and the umbrella hold no main source.
9. **Workflows.** `ci.yml` (shares no name with the secret-scan workflow), `pages.yml` (the organisation's Dokka and project-site
   standard) and `release.yml` (verify only; `contents: read`; a pushed version tag in either form, the lettered bug-fix forms
   included; creates nothing).
10. **Repository files.** `CONTRIBUTING.md`, `CHANGELOG.md` (extended under `## [Unreleased]`, its header gaining the versioning
    statement), `LICENSE` (Apache-2.0, "Copyright 2026 Spartan Laboratories"), and a README stub in place of the 7.x description.
11. **The project site.** A hand-written `website/` landing page; the Spartan Laboratories logo in `docs/brand/` and the Dokka
    stylesheet in `docs/dokka/styles/`, applied in each module's Dokka configuration and at the root; the Dokka output shipped as
    each module's javadoc jar (`JavadocJar.Dokka("dokkaGeneratePublicationHtml")`); a CI job running
    `./gradlew dokkaGeneratePublicationHtml`; the repository's GitHub Pages source set to GitHub Actions before the first deployment.
12. **The old sources.** The 46 tracked files under `src/` move to an unbuilt `legacy/` folder, deleted in Phase 17 (#16).
    "Unbuilt" means: no settings file includes it and no module compiles it; detekt, Dokka and the validator, which run per module,
    never see it; the secret scan still reads it, at the new paths, and scans it clean. The old build files are replaced in place.
13. **Logging (the organisation's logging policy).** No library module publishes a logging backend; logback 1.6.7 is the tests'
    backend (`testRuntimeOnly`). A build check, `verifyNoLoggingBackend`, fails when a published module's resolved runtime
    dependencies carry a logging backend, by slf4j provider and binding files and by a barred-coordinate list; it reads the runtime
    classpath only and passes on an empty classpath. No library code logs in this unit, so it declares no logging API.
14. **Repository settings after the landing.** One ruleset on `main` requiring `Secret scan (gitleaks)` and the CI workflow's
    checks (each pinned to GitHub Actions' integration id 15368), a pull request with the branch up to date, no force-push, no
    deletion, no bypass actor; squash and rebase merging off, so merges are merge commits only. The GitHub Pages source is set
    before the landing merges, because `pages.yml`'s first run is the merge's push to `main`.
15. **The follow-ups this change carries:** the comment, docstring and message-text changes to `.github/scripts/secret_scan.py`,
    `.github/scripts/allowlist_controls.py` and `.github/workflows/secret-scan.yml`; a comment in `.gitignore` saying the leading
    `/` on the root-only names is deliberate; the loose "counts by rule id only" wording in `CHANGELOG.md` and the workflow's
    header; a `__pycache__/` pattern in `.gitignore`. None changes what a scan does. The hygiene procedure's checks run again for a
    change to those files.
16. **Issue text.** After the landing, the plan-folder line of #3's body (`1-<slug>`) reads `3-phase-1-build-skeleton`.
17. **Nothing is released.** The landing moves no further version and publishes nothing. Changelog entries go under
    `## [Unreleased]`.

---

## Current state

**Baseline.** `feat/issue-3-build-skeleton` descends from `main` at the merge of PR #53 and holds only the unit's research
documents and boards under `docs/plans/`. The Phase 0 history rewrite has landed: the repository is public, `main` has the
secret-scan workflow, and no ruleset, branch protection or GitHub Pages site exists
([hygiene consequences §6](../2-phase-0-history-rewrite/24-repository-hygiene/consequences.md#6-follow-ups),
[publication consequences §6](../2-phase-0-history-rewrite/25-kotlinbottools-publish/consequences.md#6-follow-ups)).

**What the change replaces and moves** (surveyed in the working tree):

| Path | Today | What happens |
|---|---|---|
| `build.gradle.kts` | one module, Kotlin 2.1.10, `jvmToolchain(23)`, `application`, JDA 5.6.1, `jcenter()`, a `%PROJECTS%` repository, `logback-classic` as `implementation`, Spring, skrapeit, unirest, `version = "7.5-SNAPSHOT"` | replaced in place by the root build script of the new build |
| `settings.gradle.kts` | foojay 0.8.0, `rootProject.name = "KotlinBottools"` | replaced in place: foojay 1.0.0, `pluginManagement`, six `include`s |
| `gradle.properties` | `kotlin.code.style=official` | replaced in place |
| `gradle/wrapper/*`, `gradlew`, `gradlew.bat` | Gradle 8.10 | regenerated for Gradle 9.7.1; the wrapper jar stays the repository's one binary |
| `src/` (46 tracked files: 42 under `src/main/kotlin`, which hold `Main.kt` and one Java file, `Responder.java`; `src/main/resources/ReactionRoles.xml` and `logback.xml`; `src/test/kotlin/DotaCommand.kt` and `TestBot.kt`) | the 7.x framework | moves to `legacy/src/...` |
| `README.md` | describes the 7.x framework, 7.5-SNAPSHOT, Java 23, "No license specified" | replaced by a stub |
| `CHANGELOG.md` | the hygiene change's `[Unreleased]` entry | extended; its header gains the versioning statement |
| `.gitignore`, the three CI files | the Phase 0 versions | comment-only edits and one added pattern ([the CI files' follow-ups](#the-ci-files-follow-ups)) |
| `.gitleaks.toml` | Phase 0's | **unchanged**: its path rules are anchored at the root (`^(logs\|services)/`) or match file names that `legacy/` does not hold (`key.txt`, `BotData.xml`, `guildData/*.xml`, `WebParseKeys.xml`, `keys.txt`, `key.pem`), so the 46 moved files hit none of them |

Neither `LICENSE`, `CONTRIBUTING.md`, `build-logic/`, `.github/workflows/ci.yml`, `pages.yml`, `release.yml`, `website/`,
`docs/brand/` nor `docs/dokka/` exists. The organisation's `.gitignore` entries that matter here are already present (`.gradle/`,
`.kotlin/`, `build/`, the wrapper jar exception); none ignores a path this plan adds (`build-logic/`, `api/*.api`,
`config/detekt/detekt.yml`, `docs/brand/*.png`, `legacy/`, `website/`).

**Verified outside-world facts the plan rests on** (all re-opened at their sources on 2026-11-18; see
[the verification results](research/README.md#verification-results)):

| Fact | Source |
|---|---|
| `SuspendFunSwallowedCancellation` needs type resolution; the plugin joins only the classpath-less `detekt` task to `check`; detekt 1.23.8 reads Kotlin metadata only up to 2.1.0, so `kotlin.runCatching` of Kotlin 2.2 is unresolvable; `dev.detekt` 2.0.0-alpha.6 is the newest 2.x, runs on JDK 17+, accepts language versions 2.0 to 2.5 and is run on Kotlin 2.2.21 by public builds | [detekt findings F1–F7](research/detekt-on-the-toolchain.md#3-findings) |
| The umbrella's strict pin is an `api` dependency constraint by coordinates beside `api(project(...))`; Gradle publishes it in `dependencyConstraints[]` of `apiElements` and `runtimeElements` with `strictly`, the edge in `dependencies[]` stays `requires`; a composite substitutes it; the POM shows no `strictly` | [umbrella findings F1–F7](research/umbrella-strict-pins.md#3-findings) |
| Kotlin Gradle plugin 2.2.21 is the newest 2.2.x; Dokka 2.3.0 has an open regression (issue 4620) under `failOnWarning`, so Dokka 2.2.0; vanniktech 0.37.0; validator 0.18.2; Dokka's V2 mode, the root needing the Kotlin plugin with `apply false`, the zero-byte dump, Gradle 9's failure of `test` on test sources with no discovered test | [gates findings F1–F7](research/documentation-abi-and-publishing-gates.md#3-findings) |
| A check run is named by its job; a skipped workflow leaves its required checks pending; a run started on demand never satisfies one; the bodies of the ruleset, the merge settings and the GitHub Pages site; the six action commits; `upload-pages-artifact` drops dot files; the lettered tag globs | [GitHub findings F1–F15](research/github-workflows-and-settings.md#3-findings) |
| kotlin-logging-jvm 8.0.7 depends on `kotlin-stdlib` 2.1.21 only and brings no slf4j-api; the slf4j provider and binding files separate a backend from an API or a bridge; `log4j-core`, `logback-core`, `reload4j` and `tinylog-impl` need a coordinate list | [logging findings F1–F6](research/logging-backend-check.md#3-findings) |
| JDA 6.7.0 pairs with jda-ktx 0.14.2 (metadata 2.3.0, readable by a 2.2.x compiler; coroutines 1.10.2); kotlinx-serialization-json 1.9.0 is built for Kotlin 2.2 | [earlier findings](../research/jda-and-coroutine-bridge.md), [HTTP stack findings](../research/http-client-stack.md) |
| vanniktech skips signing for a `-SNAPSHOT` version | [earlier findings](../research/unreleased-build-consumption.md) |

**The worked examples.** WebTools at commit `d68ec81e82828911f373bc4940da34580786aaee`
(`build-logic/src/main/kotlin/WebToolsBuild.kt`, `VerifyJavaFloor.kt`, `JavaFloorScan.kt`, `webtools.kotlin-jvm-library.gradle.kts`,
`webtools.published-library.gradle.kts`, `build-logic/build.gradle.kts`, `build-logic/src/test/kotlin/**`, `ci.yml`, `pages.yml`,
`website/`) and MyGameTools at commit `46697c15f4c2386b6cfd17eadefd1bfa1f6d54cd` (`gametools/build.gradle.kts`, the two marker
annotations, `CONTRIBUTING.md`, `LICENSE`, `ci.yml`). The implementer reads each with `gh api repos/<owner>/<repo>/contents/<path>?ref=<commit>`
and never clones them. Where this plan says "adapted from", it means: take the file, change what the plan names, keep the rest.

**Where the architecture's text differs from the organisation's later standards** ([Documentation impact](#documentation-impact)):
- §1.1 and §9 say "the slf4j API only in library code" and "slf4j's fluent API"; the organisation's logging policy makes
  kotlin-logging the logging API of all Kotlin code, internal and never in a public signature. A dated callout records it.
- §1.1 "Platform" names the JDK 21 toolchain but no Java floor; the organisation's Java floor standard asks for one set apart from
  the toolchain. A dated callout records the floor of 21.
- §1.1 and §9 say "the five-level test hierarchy" and list five tasks; the organisation's testing standard names seven sets, and
  WebTools registers the same seven. This unit registers seven tasks, and a dated callout records it.
- The parent `consequences.md` §1 says the old code leaves `main` no later than the phase that replaces it. With `legacy/` it leaves in
  Phase 17, and a dated callout records that too.

---

## Assumptions

| Assumption | If false |
|---|---|
| Every dependency of `bottools-core` on its runtime classpath (JDA 6.7.0 and its transitives, jda-ktx 0.14.2, coroutines 1.10.2, kotlin-stdlib up to 2.3.10 through jda-ktx) has class files of Java 21 or lower, so `verifyJavaFloor` passes. Only JDA's and jda-ktx's published metadata were read, not their class files | the floor check names the jar; the floor stays 21 and the dependency pairing is revisited in this unit (a different jda-ktx pairing, or an in-house bridge as the architecture's first assumption provides) |
| Dokka 2.2.0, the validator 0.18.2, vanniktech 0.37.0 and detekt 2.0.0-alpha.6 run on Gradle 9.7.1 with the configuration cache on, as the reproduction builds showed; vanniktech names no Gradle above 9.6.0 and Dokka states no maximum | the plugin that reports the problem is fixed in `build-logic` (a different patch release, a workaround the plugin documents); the cache stays on and is not switched off to hide it |
| Dokka's aggregate lays modules out as `build/dokka/html/<module>/index.html` | `verifyDocsAggregate` and the umbrella's javadoc guard read the tree Dokka really writes; the implementer reads it in S8 and changes the one path function in `build-logic` (the guard has one place for it) |
| The type `BotToolsBuild` of the included `build-logic` is visible to a module build script that applies one of its plugins (WebTools' `webtools-http/build.gradle.kts` reads `WebToolsBuild.JAVA_FLOOR` the same way) | the umbrella's module list moves into a `bottools.umbrella` convention plugin of `build-logic`; no module's published shape changes |
| `./gradlew -p build-logic <task>` runs the included build's own test tasks with the root wrapper | the job runs `./gradlew :build-logic:<task>` as MyGameTools' CI does; the check names and the ruleset do not change |
| The `github-pages` environment either does not exist before the first deployment or exists without a branch restriction, or with a policy that [P1](#the-repository-settings) can extend | P1's read-back shows which; one more request adds the `main` policy before the merge |
| The rulesets API takes the four check names as given, and each is satisfied by a successful run of its job on a pull request's latest commit | the ruleset is created only after all four have succeeded on `main`'s head (S16's precondition); a context that never reports holds every merge pending, and the ruleset is then edited, never bypassed |
| Nothing else writes to `main` between S15's merge and S16's ruleset | S16 reads `main`'s head and the four check runs on it first and stops on a mismatch |

---

## Non-goals

Left to `webtools-adapter` (#9, unit 6b), everything the architecture puts there:

- the WebTools composite include in `settings.gradle.kts` with its `-D` switches (`-Dbottools.webtools.composite=false` and the
  environment equivalent), and `webtools.ref`;
- the WebTools pin and its strict edge, and that edge's entry in `verifyReleasableMetadata`'s edge map;
- the `build-logic` constraints of `okhttp-jvm`, `kotlinx-coroutines-core`, Caffeine and okio, and `verifyClasspathAlignment`;
- the composite and published CI lanes and the scheduled drift build;
- the walking skeleton's checks of nested substitution, OkHttp alignment and the composite configuration cache.

Also not here:

- Any library code: ids, failures, `Result` helpers, `suspendCatching`, storage ports, `BotConfig` (`core-foundation`, #4).
- A logging API: no kotlin-logging, no slf4j-api declaration, no logging events (the first module that logs, in #4, adds them).
- MockK and `kotlinx-coroutines-test` (declared by the first test that needs them), the `java-test-fixtures` source set of
  `bottools-http` (#8), a published test-fixtures artifact (unit 18).
- Publishing: no snapshot, no release, no Central credential, no signing key. The first snapshot waits for the namespace's
  "Enable SNAPSHOTs" switch, which belongs to the maintainer and lies outside this change.
- The full README rewrite (at `1.0.0`), the deletion of `legacy/` (Phase 17, #16), MagicBot's repository (MagicBot#2).
- A baseline file for detekt, a Dependabot configuration, `sha_pinning_required` on the repository, and a required review count.
- Any change to `.gitleaks.toml`, the scan wrapper's behaviour, the allowlist table or the controls' fixtures.

---

## Design

### The multi-module build and convention plugins

**Layout.**

```
settings.gradle.kts              pluginManagement { includeBuild("build-logic") }, foojay 1.0.0, the six includes
build.gradle.kts                 root: base, Kotlin JVM (apply false), Dokka aggregate, verifyDocsAggregate
gradle.properties                configuration cache, Dokka V2 mode
gradle/libs.versions.toml        the library versions module scripts use
gradle/wrapper/*, gradlew*       Gradle 9.7.1
config/detekt/detekt.yml         the one rule override
build-logic/                     included build "bottools-build-logic" (its own settings, its own tests)
bottools-core/  bottools-data-sqlite/  bottools-http/  bottools-stats/  bottools-plugins/   feature modules
bottools/                        umbrella
legacy/                          the unbuilt 7.x sources
website/  docs/brand/  docs/dokka/styles/   the site and its theme
.github/workflows/               secret-scan.yml (existing), ci.yml, pages.yml, release.yml
```

**Convention plugins** (precompiled script plugins in `build-logic/src/main/kotlin`, ids by file name):

| Plugin | Applies | Sets |
|---|---|---|
| `bottools.kotlin-library` | Kotlin JVM, `java-library`, the validator, `dev.detekt` | toolchain, Java floor flags, `explicitApi()`, the validator's `nonPublicMarkers`, detekt and its wiring into `check`, JUnit 5 and logback test dependencies, the seven test-set tasks |
| `bottools.published-library` | `bottools.kotlin-library`, Dokka, vanniktech | `group` and `version`, Maven Central publishing (signed releases), POM, the Dokka theme and gates, the javadoc and sources jars, and `verifyJavaFloor`, `verifyNoLoggingBackend`, `verifyReleasableMetadata` |

Every feature module's build file applies `bottools.published-library` and adds its dependencies, its POM name and description,
and nothing else. The umbrella applies it too.

**`build-logic` classes** (`build-logic/src/main/kotlin`, no package, as WebTools'): `BotToolsBuild` (constants, the test-set list,
the registration helpers), `JavaFloorScan` and `VerifyJavaFloor`, `LoggingBackendScan` and `VerifyNoLoggingBackend`,
`ReleasableMetadataScan` and `VerifyReleasableMetadata`, `UmbrellaJarScan`, `VerifyUmbrellaSourcesJar` and
`VerifyUmbrellaJavadocJar`. Each task is a thin typed wrapper over a pure scan object; the scan returns a `Result`, the task is
the one place that unwraps it.

**Build identity.** `build-logic/settings.gradle.kts` sets `rootProject.name = "bottools-build-logic"`, which names the included
build plainly in logs and IDE imports. Gradle identifies an included build by its path, so a same-named `build-logic` of another
repository in one composite (MagicBot's) does not collide with it whatever either is called
([earlier findings, F2](../research/unreleased-build-consumption.md)).

**Where the version and group live.** `BotToolsBuild.GROUP` (`io.github.spartanlaboratories`) and `BotToolsBuild.VERSION`
(`1.0.0-SNAPSHOT`), read by `bottools.published-library` in the project's own `group`/`version` and in vanniktech's `coordinates`.
No module sets a version. `CONTRIBUTING.md` says so.

**Version homes.** Kotlin, the serialization compiler plugin and Dokka are each stated twice: as marker dependencies in
`build-logic/build.gradle.kts` and in the root `settings.gradle.kts` `pluginManagement.plugins`. A gating test asserts the pairs
agree, so the root and the convention plugins load one plugin version.

**Dependency versions.** `gradle/libs.versions.toml` holds `jda` 6.7.0, `jda-ktx` 0.14.2, `kotlinx-coroutines` 1.10.2 and
`kotlinx-serialization` 1.9.0 as library aliases for module scripts. Versions the convention plugins use (logback 1.6.7, the
`junit-bom` 5.11.4) are constants in `BotToolsBuild`, because a precompiled script plugin of an included build cannot read the root
catalog. Every third-party pin is a plain `require`; nothing the library does not control is `strictly`.

**Failure design (the build's own code).** Pure scans return `Result<…>` for expected failures: an unreadable or malformed input
file, or a jar that cannot be opened. A scan that finds the build in violation returns a success carrying violations, not a
failure. The tasks unwrap: an unreadable input and a violation each throw `GradleException` with a message that names the task
path and the offender; "nothing to check" is a `GradleException` where the task's subject must exist (library variants) and is
not one where an empty subject is legitimate (zero classes in a module with no source, an empty runtime classpath). Programmer
error (a blank test-set id, a duplicate task name) is `require`/`InvalidUserDataException`, thrown at registration. No task reads
`Project` at execution time; every input is a task property, so the configuration cache stores and reuses the entry.

**Logging of the build's own code.** `logger.info` once per registration of the seven test-set tasks and once per passed
`verify*` task (the one-line report also written to `build/reports/<check>/<task>.txt`); failures are exceptions, not log lines.
Library modules log nothing in this unit.

### The toolchain and Java floor

- `bottools.kotlin-library` sets `kotlin { jvmToolchain(21) }` (`BotToolsBuild.JDK_TOOLCHAIN`). `settings.gradle.kts` applies
  `org.gradle.toolchains.foojay-resolver-convention` 1.0.0, which Gradle 9 needs.
- **One constant, `BotToolsBuild.JAVA_FLOOR = 21`,** sets the Kotlin `jvmTarget`, `-Xjdk-release=21` (it fails unless `jvmTarget`
  is the same, because the Kotlin plugin always passes `-jvm-target`) and the Java `sourceCompatibility`/`targetCompatibility`,
  which write `org.gradle.jvm.version` on the `apiElements` and `runtimeElements` variants. Both constants are 21 and are separate
  on purpose: the floor can stay at 21 when the toolchain moves up. `-Xjdk-release` is an experimental flag, so `verifyJavaFloor`
  is the backstop.
- **`verifyJavaFloor`** (adapted from WebTools'): fails when a class of the module's jar, or of any jar on its runtime classpath,
  has a class-file major above 65 (`META-INF/versions/` ignored), or a library variant of the module's metadata declares an
  `org.gradle.jvm.version` other than 21. Two differences from WebTools': a module whose `src/main/kotlin` holds no file has
  zero classes legitimately, so the "no class to verify" failure applies only when the module's `src/main/kotlin` tree is non-empty
  (the tree is a task input, read at execution); "no library variant in the metadata" still fails everywhere.
  It writes `build/reports/java-floor/verifyJavaFloor.txt` on success only.

### The documentation, ABI and static-analysis gates

**Explicit API.** `kotlin { explicitApi() }` in `bottools.kotlin-library`: a public declaration without a visibility modifier or an
explicit return type fails `compileKotlin`. Tests are not subject to it.

**Dokka** (`bottools.published-library` for each module; the root for the aggregate):
- `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled` and `…pluginMode.noWarn=true` in `gradle.properties`.
- Per module, in `dokka { }`: the theme (`customStyleSheets` = `docs/dokka/styles/dokka-styles.css`, `customAssets` =
  `docs/brand/spartan-laboratories-logo.png`, `footerMessage` = `&copy; 2026 Spartan Laboratories`, all resolved from
  `isolated.rootProject.projectDirectory`), `dokkaPublications.configureEach { failOnWarning.set(true) }`,
  `dokkaSourceSets.configureEach { reportUndocumented.set(true); sourceLink { … } }` with `remoteUrl` pointing at
  `https://github.com/SpartanLaboratories/KotlinBottools/blob/main/<module>/src/<set>/kotlin`.
- `tasks.named("check") { dependsOn("dokkaGeneratePublicationHtml") }` in `bottools.published-library` and on the root, so an
  undocumented public declaration fails `./gradlew build` (Dokka registers no `check` dependency of its own).
- **Root.** `base` (so `check` and `build` exist), `id("org.jetbrains.kotlin.jvm") apply false` (without it every module renders
  empty and the build still passes), `id("org.jetbrains.dokka")`, `dokka(project(":<module>"))` for the five feature modules,
  the same `failOnWarning` and theme, `moduleName` `BotTools`, `moduleVersion` read lazily from the umbrella's `version`.
  The umbrella is not listed at the root: it suppresses its own source sets and aggregates through its own `dokka(...)`
  dependencies for its javadoc jar.
- **`verifyDocsAggregate`** (root, joins `check`, inline task with captured providers only): for each feature module whose
  `src/main/kotlin` holds a `.kt` file (the source trees are task inputs, read at execution), `build/dokka/html/<module>/index.html`
  exists; when no module has source it fails ("nothing to check"). This catches the silently empty aggregate.
- **Javadoc jars.** `mavenPublishing { configure(KotlinJvm(javadocJar = JavadocJar.Dokka("dokkaGeneratePublicationHtml"),
  sourcesJar = SourcesJar.Sources())) }`. A module with no source publishes an empty-content jar equal to vanniktech's placeholder;
  nothing is released here.

**The ABI check.** `bottools.kotlin-library` applies `org.jetbrains.kotlinx.binary-compatibility-validator` 0.18.2 and sets
`apiValidation { nonPublicMarkers.add(BotToolsBuild.EXPERIMENTAL_MARKER) }` in each module that applies it. `apiCheck` joins
`check` by the plugin itself. Every module commits `api/<module>.api`: the two annotation interfaces for `bottools-core`, a zero-byte
file for the four feature modules with no source and for the umbrella (a missing dump fails `apiCheck`; a zero-byte dump passes).
Declarations marked `@ExperimentalBotToolsApi` leave the dump; the marker class and `@SupportedExtension` stay in it. The first
declaration added to a zero-byte module fails `apiCheck` until `apiDump` is run and its diff reviewed: that is the intended review
point, and CONTRIBUTING says so.

**detekt** (research: [detekt findings](research/detekt-on-the-toolchain.md)). `dev.detekt` pinned at exactly `2.0.0-alpha.6` as a
marker dependency of `build-logic` only, applied in `bottools.kotlin-library`:
- `detekt { buildUponDefaultConfig = true; config.setFrom(<root>/config/detekt/detekt.yml) }`, `parallel` left off, no baseline.
- `config/detekt/detekt.yml` holds only `coroutines: SuspendFunSwallowedCancellation: active: true`. Without
  `buildUponDefaultConfig`, a config file would replace the defaults.
- **`check` depends by name on the type-resolving task of every Kotlin compilation** (`kotlin.target.compilations.configureEach {
  tasks.named("check") { dependsOn("detekt" + name.replaceFirstChar(Char::uppercaseChar)) } }`: `detektMain`, `detektTest`, and one for each later
  compilation such as `testFixtures`). A by-name dependency fails loudly when a task is absent. The plain `detekt` task, which the
  plugin joins to `check`, runs without type resolution and cannot run the rule.
- A module with no main source finishes `detektMain` as `NO-SOURCE`.
- The pin touches no published artifact (the plugin is a build-logic dependency and adds only resolvable, non-consumable
  configurations); a bump can break only `check`, and goes with the seeded-violation test passing. It is the only release whose
  type-resolved analysis reads Kotlin 2.2 classes: 1.23.8 reads Kotlin metadata only up to 2.1.0 and would be blind to the rule here.
- The 2.x rule also flags a `catch` of `CancellationException` or a supertype around a suspend call unless the clause rethrows
  `CancellationException` first or starts with `ensureActive()`; the first internal `suspendCatching` (in #4) is written in that
  shape.
- Known alpha issues that touch the build: #9793 (a stale jar view in a warm local daemon; a clean CI run is unaffected), #9121
  (`parallel`), #9297 (the ktlint wrapper). None is used.

### The stability markers

`bottools-core/src/main/kotlin/com/spartanlabs/bottools/annotation/SupportedExtension.kt` and `ExperimentalBotToolsApi.kt`,
modelled on MyGameTools' `SupportedExtension` and `ExperimentalGameToolsApi`, with `public` explicit:

- `@SupportedExtension`: `@MustBeDocumented`, `@Retention(AnnotationRetention.BINARY)`, `@Target(CLASS, FUNCTION, PROPERTY,
  CONSTRUCTOR, TYPEALIAS)`, no `@RequiresOptIn`, no members. KDoc: a Supported Extension tier seam of a likely but non-core need,
  carrying the same semver guarantee as Stable Core; its shipped implementations double as worked examples.
- `@ExperimentalBotToolsApi`: the same meta-annotations plus `@RequiresOptIn(level = RequiresOptIn.Level.ERROR, message = "…")`.
  KDoc: an unproven seam that may change incompatibly in a feature release until it graduates; how a consumer opts in
  (`@OptIn(ExperimentalBotToolsApi::class)` at the narrowest scope, or `-opt-in=com.spartanlabs.bottools.annotation.ExperimentalBotToolsApi`);
  never deleted, because a consumer's `@OptIn` would stop compiling.
- The fully qualified name of the second is `BotToolsBuild.EXPERIMENTAL_MARKER`, which `nonPublicMarkers` reads; a gating test asserts
  that `bottools-core/src/main/kotlin/<the constant's package as a path>/<its simple name>.kt` exists and declares that package, and
  `ExperimentalBotToolsApiTest` asserts the class's `java.name` equals the same literal, so a rename cannot leave the marker list stale.

### The test sets and their tasks

`BotToolsBuild.TEST_SETS` lists the organisation's seven sets (`gating`, `component`, `integration`, `deterministic`, `e2e`,
`nonfunctional`, `uat`) with the standard's names; `registerTestSetTasks(project, classesDirs, classpath)` registers one `Test`
task per set (`gatingTest` … `uatTest`, group `verification`) over `sourceSets["test"]`, on the JUnit Platform, selecting by
`includeTestsMatching("com.spartanlabs.testing.<set>.bottools.*")` with `isFailOnNoMatchingTests = false`, so a set with no test
passes. The tasks are not added to `check`; `test` runs every set, so `./gradlew build` runs them all. The seven sets are packages
inside the one `test` source set, so `detektTest` covers them all. The package under a set mirrors the production package:
`com.spartanlabs.testing.component.bottools.annotation.*` tests `com.spartanlabs.bottools.annotation.*`. A module's test source set
holds a discoverable test or no test file: Gradle 9 fails `test` for test sources with no discovered test.

`build-logic`'s own tests use the same seven packages under `com.spartanlabs.testing.<set>.bottools.buildlogic`, with tasks
registered in `build-logic/build.gradle.kts` (the way WebTools does), each failing on an empty run. `./gradlew build` does not
reach an included build's own tests: they run in their own CI job ([the workflows](#the-workflows)).

### The walking skeleton's checks

Every one is committed and runs on every build, with no placeholder declaration in any main source:

| Check | Where | How it runs |
|---|---|---|
| jda-ktx 0.14.2 against JDA 6.7.0 (and coroutines 1.10.2) | `bottools-core`'s integration tests, `JdaKtxLinkageTest` | compiles references to `RestAction.await()` and `JDABuilder.injectKTX()` and loads jda-ktx's event manager against JDA's `IEventManager`; part of `test` |
| kotlinx-serialization-json 1.9.0 with the compiler plugin at the Kotlin version | `bottools-stats`'s integration tests, `SerializationLinkageTest`; the module applies `org.jetbrains.kotlin.plugin.serialization` and declares `implementation(libs.kotlinx.serialization.json)` as the architecture's table gives stats | a `@Serializable` probe encodes and decodes |
| The validator on Gradle 9.7.1 | `apiCheck` of all six modules, in `check`; the TestKit `ApiValidationIntegrationTest` | every build |
| A publish to Maven Local | the `Build (gradlew build)` job runs `./gradlew publishToMavenLocal` after `build` and checks that six artifact folders hold their `.jar`, `-sources.jar`, `-javadoc.jar`, `.pom` and `.module`; the TestKit end-to-end test publishes a generated build the same way | every CI run |

`mavenLocal()` is never among this build's `repositories`; a published snapshot can never be mistaken for a project edge
(umbrella findings, pitfall 1).

### The repository files

- **`CONTRIBUTING.md`** (new): follows the organisation's guide and adds what is specific here: coding rules (test packages
  `com.spartanlabs.testing.<set>.bottools.*`, the marker `@ExperimentalBotToolsApi`), module layout (the six artifacts, directories
  equal ids, package roots, the build-logic plugins), commit scopes, build and test commands, the `legacy/` folder, publishing
  (by hand from the merged default branch, Central, the release process pushes the tag and creates the GitHub release), and
  **versioning in three sentences**: the repository follows the organisation's standard; the version lives in
  `BotToolsBuild.VERSION` in `build-logic/src/main/kotlin/BotToolsBuild.kt` and the build sets it on every module; the six
  artifacts share it. Nothing on lettered versions or `strictly`.
- **`CHANGELOG.md`**: header gains the versioning statement; `[Unreleased]` gains this change's entries; two wordings of the
  hygiene entry are corrected.
- **`LICENSE`**: the Apache-2.0 text as MyGameTools has it ("Copyright 2026 Spartan Laboratories").
- **`README.md`**: a stub that names the project and its pre-release state, the six artifacts, the build commands, the site, the
  licence, and says what `legacy/` is and that it goes in Phase 17.

Full text of each is in [File-by-file changes](#file-by-file-changes).

### The project site

- `website/`: `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `assets/styles.css`, `assets/site.js`, `assets/favicon.svg`,
  `README.md` (notes for maintainers, not published). The stylesheet, script, favicon and 404 page are copied from WebTools'
  `website/` and retitled; `index.html` is hand-written for this library.
- `docs/brand/spartan-laboratories-logo.png` and `docs/dokka/styles/dokka-styles.css`, copied from WebTools byte for byte and
  verified by blob id.
- The Dokka theme is applied in every module's configuration and at the root ([the gates](#the-documentation-abi-and-static-analysis-gates)).
- `pages.yml` assembles `_site`: `website/` at the root, `docs/brand/` under `assets/brand/`, `build/dokka/html` at `/api/`,
  `.nojekyll`.
- The page is honest about the state: the library is pre-release, nothing is published, the API reference is generated from the
  build. It shows no install snippet.

### The workflows

Four workflow files stand after this change: the existing `secret-scan.yml` and the three new ones. Names never collide: `CI`,
`Pages`, `Release` against `Secret scan`; jobs `Build (gradlew build)`, `API docs (Dokka)`, `build-logic (TestKit)`, `Build site`,
`Deploy to GitHub Pages`, `Verify tagged build` against `Secret scan (gitleaks)`; the concurrency groups `ci-…`, `pages` against
`secret-scan-…`.

**The four required checks:** `Secret scan (gitleaks)`, `Build (gradlew build)`, `API docs (Dokka)`, `build-logic (TestKit)`. A check
run carries its job's name; the workflow's name never enters it. None of the four has a `paths:` filter, a branch filter beyond
`main`, or an `if:`: a workflow skipped by a filter leaves its required checks pending, and a job skipped by `if:` reports success.
A run started on demand never satisfies a required check, so `workflow_dispatch` is for debugging only. A renamed job needs the
ruleset edited with it; a gating test asserts the three names are present in `ci.yml`.

**Actions, pinned by commit** (a comment with the release beside each, which a bump tool reads):

| Action | Release | Commit |
|---|---|---|
| `actions/checkout` | v7.0.1 | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
| `actions/setup-java` | v6.3.0 | `d1374f8ac74474200d16ef8ecee22c7ae7a51880` |
| `gradle/actions/setup-gradle` | v5.0.2 | `0723195856401067f7a2779048b490ace7a47d7c` |
| `actions/upload-pages-artifact` | v5.0.0 | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
| `actions/deploy-pages` | v5.0.1 | `368f82528645a54fb793d4d04e342629a3f51346` |
| `actions/upload-artifact` | v7.0.2 | `cf430e030ddbb5b0abf93d22962f4752f3646cd9` |

`setup-gradle` stays on v5: v6 moves its caching into a separately licensed component whose terms must be accepted, which is why
WebTools stays on v5 too. Wrapper validation is on by default in it. `upload-pages-artifact` needs `include-hidden-files: true`, or
`.nojekyll` is lost.

**`ci.yml`** triggers `push` and `pull_request` on `main`, and `workflow_dispatch`; group `ci-${{ github.ref }}` with
`cancel-in-progress: ${{ github.event_name == 'pull_request' }}`; `permissions: contents: read`. Three jobs in parallel, JDK 21
(temurin), `timeout-minutes`, `--stacktrace`:
- `Build (gradlew build)`: `./gradlew build`, then `./gradlew publishToMavenLocal`, then a shell check of the six published
  folders; uploads `*/build/reports/` and `build/reports/` on failure.
- `API docs (Dokka)`: `./gradlew dokkaGeneratePublicationHtml`.
- `build-logic (TestKit)`: `./gradlew -p build-logic test integrationTest e2eTest nonfunctionalTest`; uploads
  `build-logic/build/reports/tests/` on failure. It is a required check too.

**`pages.yml`** triggers `push` on `main` and `workflow_dispatch`; `permissions: contents: read` at the workflow; group `pages` with
`cancel-in-progress: false`. Job `Build site` (inherits `contents: read`): Gradle `dokkaGeneratePublicationHtml verifyDocsAggregate`,
assemble `_site`, fail when `build/dokka/html/index.html` is missing, `touch _site/.nojekyll`, upload with
`include-hidden-files: true`. Job `Deploy to GitHub Pages` (`needs: build`): `permissions: { pages: write, id-token: write }` only,
`environment: github-pages`, `actions/deploy-pages`.

**`release.yml`** triggers on `push` of tags matching `v[0-9]+.[0-9]+.[0-9]+`, `[0-9]+.[0-9]+.[0-9]+`,
`v[0-9]+.[0-9]+.[0-9]+[a-z]` and `[0-9]+.[0-9]+.[0-9]+[a-z]` (no `branches:`); `permissions: contents: read`. One job,
`Verify tagged build`: a first step re-checks the tag name with a shell regex (the glob grammar is easy to misread), then Gradle
`build verifyReleasableMetadata -Pbottools.releaseTag="$TAG"`. It creates no release, uploads no artifact, holds no write scope and
has no concurrency group. Releases are made by hand from the merged default branch; the release process itself pushes the tag and
creates the GitHub release.

### The umbrella and its strict pins

`bottools/build.gradle.kts` applies `bottools.published-library` and drives everything from one list,
`BotToolsBuild.FEATURE_MODULES`:

- For each module `m`: `api(project(":m"))` plus `constraints { api("$group:m") { version { strictly(pin) } } }`, with `pin` taken from
  the project's own `version`. Gradle publishes the constraint in `dependencyConstraints[]` of `apiElements` and `runtimeElements`
  as `strictly` and `requires`; the edge in `dependencies[]` stays a plain `requires`. Inside the build the edge resolves to the
  sibling project; a composite that includes the build still substitutes it and ignores the requested version. A constraint on the
  project dependency itself cannot carry a version (Gradle throws), and an external-coordinate edge with a substitution rule breaks
  every other project that consumes the umbrella: neither is used.
- The POM shows plain versions and a `dependencyManagement` block, with no `strictly`: a Maven consumer gets a soft version; the
  strict pin exists for Gradle consumers reading the `.module` file. What a Gradle consumer meets: another version of a pinned
  module asked for by a plain request fails resolution, naming the strict constraint; a lower request is no conflict; the
  consumer's own `strictly` or `force` overrides the pin. This is the organisation's rule for a lettered bug fix (`1.0.0a` sorts
  below `1.0.0`) and is carried by its guide, not repeated here.
- **`verifyReleasableMetadata`** (registered in `bottools.published-library` for all six projects, with an empty edge map; the
  umbrella script fills it with the five pins). Inputs: `moduleMetadata` (`tasks.withType<GenerateModuleMetadata>()`, which carries
  the task dependency and the file), `publishedVersion`, `strictEdges` (`MapProperty<String,String>`, `group:module` → version),
  optional `releaseTag`, output `report`. It reads only the library variants (`org.gradle.category = library`; the sources variant
  also carries the runtime usage). The rules:
  1. the metadata's `component.version` equals the published version;
  2. each expected edge appears in `dependencies[]` of at least one library variant;
  3. in every library variant where an expected edge appears in `dependencies[]` or `dependencyConstraints[]`, its `strictly`
     equals the pin (so an `api` edge carries it in both `apiElements` and `runtimeElements`, and a later `implementation` edge
     such as the WebTools one carries it where it exists);
  4. when the published version does not end in `-SNAPSHOT`, no `requires`, `strictly` or `prefers` string in either array ends in
     `-SNAPSHOT`;
  5. when `releaseTag` is set, `releaseTag.removePrefix("v")` equals the published version;
  6. at least one library variant was checked, and every input file exists.
  It deletes its report first and writes it only on success. It is wired into `check` and onto every `AbstractPublishToMaven` task
  (`tasks.withType<AbstractPublishToMaven>().configureEach { dependsOn(verify) }`), so Maven Local, any repository and Central's
  staging all wait for it; vanniktech's upload to Central is an end-of-build action that does not run after a failure.
- **The umbrella's jars.** The sources jar folds in the modules' sources (a resolvable, non-transitive `reexportedModuleSources`
  configuration over each module's `sourcesElements`, `zipTree` into `sourcesJar`, `META-INF/**` excluded,
  `DuplicatesStrategy.EXCLUDE`); the javadoc jar is `dokkaGeneratePublicationHtml` over `dokka(project(":m"))` for each module,
  with the umbrella's own source sets suppressed. MyGameTools' guards do not fit (a fixed page count of 20, hard-coded package
  names), so each guard is a typed task whose expectation comes from the modules' real source files, from the same module list:
  - `verifyUmbrellaSourcesJar`: every `.kt` file of every module is in the sources jar by relative path, no `.kt` is in the jar that
    no module owns, and when no module has any `.kt` file the task fails ("nothing to fold");
  - `verifyUmbrellaJavadocJar`: for each module that has at least one source file, `<module>/index.html` and at least one further
    page under `<module>/` are in the jar, and more than the two chrome pages exist once any module has source; a module with no
    source is neither required nor allowed to make the check pass vacuously.
  Both are in the umbrella's `check`.
- The umbrella's own `apiCheck` dump is a zero-byte file. Its `verifyNoLoggingBackend` and `verifyJavaFloor` run on its runtime
  classpath, which holds the five module jars and their dependencies.

### Logging and the backend check

- **Policy met by the build.** No library module declares a logging backend; `bottools.kotlin-library` declares
  `testRuntimeOnly("ch.qos.logback:logback-classic:1.6.7")` once (it brings `logback-core` and slf4j-api 2.0.19; its jar holds
  `META-INF/services/org.slf4j.spi.SLF4JServiceProvider`). The 7.x build's `implementation("ch.qos.logback:logback-classic:1.5.6")`
  and its packaged `logback.xml` are exactly what the check refuses; the new build has neither in a published module.
- **No logging API is declared in this unit.** The first module that logs (`core-foundation`, #4) declares
  `io.github.oshai:kotlin-logging-jvm:8.0.7` and `org.slf4j:slf4j-api:2.0.19`, both `implementation`, neither `strictly`
  ([logging findings](research/logging-backend-check.md#2-bottom-line): kotlin-logging does not bring slf4j-api, so each logging
  module declares it itself; 2.0.19 is the version JDA 6.7.0 and logback 1.6.7 already ask for).
- **`verifyNoLoggingBackend`** (registered in `bottools.published-library`, in `check`, per published module). It reads the
  resolved runtime classpath only. Inputs: `files` (`@Classpath`, the artifact files of `runtimeClasspath.incoming.artifacts`),
  `coordinates` (`MapProperty<String,String>`: file name → `group:module:version`, from
  `runtimeClasspath.incoming.artifacts.resolvedArtifacts.map { … }`, module components only), `barredModules`
  (`SetProperty<String>` of `group:module`), output `report`. It fails on:
  - a jar or class directory holding `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` (slf4j 2) or
    `org/slf4j/impl/StaticLoggerBinder.class` (slf4j 1), the same two paths under `META-INF/versions/<n>/` included;
  - a resolved module in the barred list: `ch.qos.logback:logback-classic`, `ch.qos.logback:logback-core`,
    `org.slf4j:slf4j-simple`, `org.slf4j:slf4j-jdk14`, `org.slf4j:slf4j-reload4j`, `org.slf4j:slf4j-log4j12`, `org.slf4j:slf4j-nop`,
    `org.slf4j:slf4j-jcl`, `org.apache.logging.log4j:log4j-slf4j-impl`, `org.apache.logging.log4j:log4j-slf4j2-impl`,
    `org.apache.logging.log4j:log4j-core`, `ch.qos.reload4j:reload4j`, `log4j:log4j`, `org.tinylog:slf4j-tinylog`,
    `org.tinylog:tinylog-impl`, `org.jboss.slf4j:slf4j-jboss-logmanager`.
  It never bars `slf4j-api`, `jul-to-slf4j`, `jcl-over-slf4j`, `log4j-over-slf4j`, `log4j-to-slf4j`, `log4j-api` or kotlin-logging. The
  message names the module, the jar, its coordinates and the rule that matched, with the one-line fix ("move it to
  `testRuntimeOnly`"). It passes on an empty classpath; it checks no file of the module's own jar (a logging configuration file in
  a module's own jar is outside a module's runtime dependencies and is not part of this check).

### The `legacy/` folder

- `git mv src legacy/src`: all 46 tracked files, content unchanged, so each is a pure rename (similarity 100%).
- Unbuilt: `settings.gradle.kts` includes six modules and nothing named `legacy`; no module build file names a path under it;
  detekt, Dokka and the validator run per module and never see it. `.idea`, IDE imports and the graph tool may index it; nothing in
  the build does.
- **The secret scan still reads it**, at the new paths. The scan wrapper counts the move commit's added files like any other change;
  `.gitleaks.toml`'s path rules do not match any moved path (the table in [Current state](#current-state)), so the history and tree
  scans stay clean. [S13](#the-stages) proves it.
- **The five files with their own verdicts.** These move with the other 41:
  - `Main.kt`, `TestBot.kt` and `DotaCommand.kt` (verdict "delete");
  - `ReactionRoles.xml` ("replace");
  - `logback.xml` ("moves to test scope and MagicBot").

  The architecture's §10 defines its verdicts as fates ("delete means nothing carries"; "replace means a new system takes the role"). Each
  file follows its verdict when its phase arrives:
  - nothing carries the three "delete" files, which leave with `legacy/` in Phase 17;
  - the reaction-roles plugin's stored defaults take over `ReactionRoles.xml`'s role in Phase 8;
  - logback configuration reaches a module's test resources when its tests first need one, and MagicBot's own arrives in Phase 13.
- The README stub says what `legacy/` is and that it goes in Phase 17 (#16). No file is added inside `legacy/`.
- Files that mention the old layout and are not changed: the planning documents under `docs/plans/` (history), and the README's
  project-structure section, which the stub replaces.

### The CI files' follow-ups

All edits are to comments, docstrings, help text and message text; none changes what a scan does. The sources of the reasons are
cited so the wording is written from them:

- **`.github/scripts/secret_scan.py`.**
  1. Module docstring: exit statuses of `scan` — 0 clean, 1 findings present *or an uncaught exception* (no `RESULT` line is
     printed then), 2 a consistency check failed; `canary-check` — 0 or 2; `control` — 0 (it prints facts and never decides);
     `canary-make` — 0. Add usage and "needs Python 3.11 or newer" (`tomllib`).
  2. Comments for the reasons behind constants and patterns, taken from
     [`../2-phase-0-history-rewrite/research/gitleaks-local-and-ci.md`](../2-phase-0-history-rewrite/research/gitleaks-local-and-ci.md)
     (lines 35, 92, 135–147 and the claims they cite) and the hygiene research: the two ref selections in `REFS` (`all` = every ref,
     pull-request refs included; `branches` = branches and tags); each option in `log_opts` (`--full-history`, `--no-renames`,
     `-m`, `--diff-filter=tuxdb`) and that `git_numstat` must select the same changes so the commit counts agree, and why
     `--full-history` is in the first and not the second; the `%x01` sentinel and `core.quotepath=false` in `git_numstat`;
     `--exit-code 2` and `--redact=100`; what each of the four regular expressions reads in gitleaks 8.30.1's log wording; what each
     canary commit proves (rename, side branch, merge-only secret, pull-request ref) and how `CANARY_EXPECTED` follows from the
     planted files.
  3. Command-line contract: `help=` text on every option, a docstring on each of the four `cmd_*` functions, usage in the module
     docstring.
- **`.github/scripts/allowlist_controls.py`.** The module docstring's output rule says `CONTROLS FAILED` may carry the exception
  class name (`FileExistsError`, `FileNotFoundError`, `CalledProcessError`) besides the fixed reasons; `--repo`, `--config` and
  `--wrapper` default to paths relative to the working directory, so the script runs from the repository root; it needs git and
  Python 3 (the wrapper's 3.11); a comment each for `core.autocrlf=false` in the fixtures' git calls, for running the wrapper from
  each fixture's root with `--repo .` (the table's path is root-relative), and for making the paths absolute; and a comment on the
  order of the checks made before the work directory is created, which is deliberate (a failed check leaves no directory).
- **`.github/workflows/secret-scan.yml`.** The header names the canary, the controls step and why the controls run after the
  canary and before the history scan; the comment above the constants gains the rest of the upgrade rule (re-run the canary, confirm
  the hash on a second channel) and the version named in the first line of `.gitleaks.toml`; the `GITLEAKS_CONFIG` check and the
  canary's `--mirror --no-local` clone get a stated reason; the two `::error` annotations keep their prefix
  (`history scan status $rc ` and `tree scan status $rc `) and replace the parenthetical with
  `(1 = findings, or an uncaught error of the wrapper, see its traceback; 2 = the scan could not be verified)`; the header's
  "counts by rule id only" becomes "counts, rule ids, exit statuses and fixed markers only, and never a path, a match or a secret".
- **`.gitignore`.** A comment above the root-only names (`/key.txt` … `/logs/`): the leading `/` is deliberate, so source packages of
  the same name (`bottools/services`) stay tracked; and a `__pycache__/` pattern under "build output".
- **`CHANGELOG.md`.** The same "counts by rule id only" correction in the hygiene entry.

Because the wrapper's bytes change, the hygiene procedure's recorded size and sha256 of the wrapper no longer apply; the re-runs
use the committed wrapper from a scratch clone, never a pinned copy ([S13](#the-stages)).

### The repository settings

Every write is a request the run sends; the implementer runs none of them. Read-backs are reads. Repository
`SpartanLaboratories/KotlinBottools`; default branch `main`.

| Id | When | Request | Read-back and expected result |
|---|---|---|---|
| P1 | before the landing merges | `POST /repos/SpartanLaboratories/KotlinBottools/pages` with `build_type=workflow` (`gh api -X POST … -f build_type=workflow`) | `GET …/pages`: `build_type` is `workflow`, `html_url` is `https://spartanlaboratories.github.io/KotlinBottools/`; `GET …/environments/github-pages`: the environment exists or the 404 is recorded; if it exists with custom branch policies and none is `main`, a second request `POST …/environments/github-pages/deployment-branch-policies` with `{"name":"main","type":"branch"}`, then `GET …/deployment-branch-policies` lists `main` |
| P2 | after the landing | `PATCH /repos/SpartanLaboratories/KotlinBottools` with `allow_squash_merge=false`, `allow_rebase_merge=false`, `allow_merge_commit=true` (`-F`, so the values are JSON booleans) | `GET …` `--jq '{allow_squash_merge,allow_rebase_merge,allow_merge_commit}'` is `false`, `false`, `true` |
| P3 | after the landing, once the four checks have each succeeded on `main`'s head | `POST …/rulesets` with the body below | `GET …/rulesets/<id>` and `GET …/rules/branches/main` list the four rules as below |
| P4 | after the landing | edit #3's body: replace the token `1-<slug>` with `3-phase-1-build-skeleton`, nothing else (`gh issue edit 3 --body-file`) | `gh issue view 3 --json body` holds `docs/plans/1-bottools-consolidation/3-phase-1-build-skeleton/` and no `1-<slug>` |

P3's body:

```json
{
  "name": "main",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false,
        "allowed_merge_methods": ["merge"] } },
    { "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "do_not_enforce_on_create": false,
        "required_status_checks": [
          { "context": "Secret scan (gitleaks)",  "integration_id": 15368 },
          { "context": "Build (gradlew build)",   "integration_id": 15368 },
          { "context": "API docs (Dokka)",        "integration_id": 15368 },
          { "context": "build-logic (TestKit)",   "integration_id": 15368 } ] } }
  ]
}
```

Read-back expectations for P3: `GET …/rules/branches/main` returns four rules; `required_status_checks` holds exactly the four
contexts, each with `integration_id` 15368, and `strict_required_status_checks_policy` true; `pull_request` holds
`allowed_merge_methods` `["merge"]`; `bypass_actors` is empty (an admin read; a non-admin read returns `null`, which is not an empty
list, so the read is made with the token that created the ruleset). Rulesets are available on public repositories of a free-plan
organisation (the organisation's plan is `free`).

Consequences the settings carry: with no bypass actor and `non_fast_forward` on, the default branch cannot be renamed or
rewritten until the ruleset is edited; a job rename needs the ruleset edited first; `strict` costs a CI re-run after every other
merge. The `github-pages` environment limits deployment to `main`, so a manual `pages.yml` run from another ref is refused at the
deploy job.

### The stages

The build is staged so that each stage is self-contained, ends on a check with a stated result, and lands in the commit named in
[Version control](#version-control). Commands run in Git Bash from the repository root (`$KB`) unless a stage says otherwise.
`$SCRATCH` is a folder outside the repository that the stage that needs it creates empty; nothing in it is committed.

| id | name | brief | kind | steps |
|---|---|---|---|---|
| S1 | Gradle wrapper | The repository builds on the Gradle 9.7.1 wrapper | work | generate: Generate the wrapper in a scratch folder; install: Copy it into the repository; verify: Check the version and the files |
| S2 | The legacy folder | The 7.x sources sit under an unbuilt `legacy/` folder, all 46 files as pure renames | work | move: Move `src/` to `legacy/src/`; verify: Check the renames and that nothing builds from it |
| S3 | build-logic foundation | `build-logic` holds the constants, the pure scans and the typed check tasks, each with component tests | work | build-files: The included build's settings and build file; constants: `BotToolsBuild`; floor: The Java floor scan and task; logging: The logging-backend scan and task; metadata: The release-metadata scan and task; umbrella-jars: The umbrella jar scans and tasks; support: The test harness |
| S4 | The convention plugins | The two convention plugins configure a module and are proven by Gradle TestKit builds | work | kotlin-library: `bottools.kotlin-library`; published-library: `bottools.published-library`; integration-tests: The convention plugins' TestKit tests; e2e-and-cache-tests: Aggregation, composite and configuration-cache tests |
| S5 | build-logic tests | `build-logic`'s own test tasks pass | check | fast: The gating, component and deterministic tests; nested: The integration, end-to-end and non-functional tests |
| S6 | Modules and root build | Five feature modules, the root aggregate, the markers and the walking skeleton's checks exist | work | settings: Root settings; root: Root build script; catalog-and-properties: Version catalog and properties; detekt-config: The detekt override; theme-assets: Logo and Dokka stylesheet; core: The markers and the JDA check; stats: The serialization check; empty-modules: The three modules with no source; dumps: The committed ABI dumps |
| S7 | The umbrella | `bottools` re-exports the five modules with strict pins, guarded jars and a committed dump | work | build-script: The umbrella build file; settings-include: The sixth include; dump: The zero-byte dump; agreement-test: The root-scripts agreement test |
| S8 | The real build | The whole build passes from a clean clone and its gates fail where they should | check | clean-clone: `./gradlew build` from a clean clone; publish: Publish to a scratch Maven Local; consumer: Resolve and compile against the published artifacts; mutations: Break each gate once and restore; configuration-cache: Reuse the configuration cache |
| S9 | The project site | `website/` holds the landing page and its assets | work | website: The site files; check: Check the files and the links |
| S10 | The workflows | `ci.yml`, `pages.yml` and `release.yml` exist, pinned, with fixed required-job names | work | ci: `ci.yml`; pages: `pages.yml`; release: `release.yml`; agreement-test: The workflows agreement test; local-checks: Parse and read the three files |
| S11 | The repository files | `LICENSE`, `CONTRIBUTING.md`, the README stub and the changelog entries are in place | work | license: `LICENSE`; contributing: `CONTRIBUTING.md`; readme: `README.md`; changelog: `CHANGELOG.md` |
| S12 | The CI files' follow-ups | The comments, docstrings and message text of the secret-scan files and the ignore list are corrected | work | scan-script: `secret_scan.py`; controls-script: `allowlist_controls.py`; workflow: `secret-scan.yml`; gitignore: `.gitignore` |
| S13 | The secret-scan re-runs | The scans, the canary, the controls, the mutations, the wrapper's failure paths and the workflow's blocks pass on the change set | check | env: The scratch environment; clone: A scratch clone of the change set; scans: History and tree scans; canary: The canary; controls: The allowlist controls; mutations: The ten mutated configurations; negatives: The wrapper's failure paths; workflow-run: The workflow's run blocks; log-filter: The log filter |
| S14 | The parent documents | The parent documents carry their dated callouts and the folded-in issues' documents sit beside this plan | check | architecture-callouts: Read the callouts on the architecture; consequences-callout: Read the callout on the parent consequences; folded-in-links: Read the two folded-in issues' documents |
| S15 | The landing | The branch is pushed, the GitHub Pages source is set, the pull request passes its checks and is merged, and `main`'s runs pass | check | push: Commit the change set and sync the branch; pages-source: P1; pull-request: Open the pull request with its merge condition; ci-reads: Read the four checks; merge: Merge with a merge commit; main-reads: Read `main`'s runs and the site |
| S16 | Settings after the landing | The merge settings, the ruleset and #3's plan-folder line are applied and read back | work | merge-settings: P2; ruleset: P3; issue-text: P4; read-backs: Read every setting back |

#### S1 — Gradle wrapper

*Do.* The old wrapper runs Gradle 8.10; the new build files need 9.7.1 and must not be configured by 8.10, so the wrapper is generated
away from the repository.
1. `generate`:
   ```bash
   KB="$(git rev-parse --show-toplevel)"
   export SCRATCH="$(cygpath -m "$TEMP")/bottools-s1"; rm -rf "$SCRATCH"; mkdir -p "$SCRATCH/w"
   printf 'rootProject.name = "w"\n' > "$SCRATCH/w/settings.gradle.kts"
   SUM="$(curl -sL https://services.gradle.org/distributions/gradle-9.7.1-bin.zip.sha256)"; echo "${#SUM}"     # 64
   "$KB/gradlew" -p "$SCRATCH/w" wrapper --gradle-version 9.7.1 --distribution-type bin --gradle-distribution-sha256-sum "$SUM"
   (cd "$SCRATCH/w" && ./gradlew wrapper --gradle-version 9.7.1 --distribution-type bin --gradle-distribution-sha256-sum "$SUM")
   ```
   The second run, made under 9.7.1, regenerates the jar from the 9.7.1 distribution. Expected: both end `BUILD SUCCESSFUL`.
   The checksum read on 2026-11-18 is `acd53f1edaf02f1a8ff99879f8a34b302661a057d9b063ae9e35b552f804d20a`; a different value
   today is recorded and used, not an error.
2. `install`: copy `gradle/wrapper/gradle-wrapper.jar`, `gradle/wrapper/gradle-wrapper.properties`, `gradlew` and `gradlew.bat`
   from `$SCRATCH/w` over the repository's; `git update-index --chmod=+x gradlew`.

*Check* (`verify`):
```bash
cd "$(git rev-parse --show-toplevel)" && ./gradlew --version | sed -n 's/^Gradle //p'     # 9.7.1
grep -c 'gradle-9.7.1-bin.zip' gradle/wrapper/gradle-wrapper.properties    # 1
grep -c '^distributionSha256Sum=[0-9a-f]\{64\}$' gradle/wrapper/gradle-wrapper.properties   # 1
git status --short -- gradle gradlew gradlew.bat                           # up to four modified paths (jar, properties, gradlew, gradlew.bat), nothing else
git ls-files '*.jar'                                                       # exactly gradle/wrapper/gradle-wrapper.jar
```

#### S2 — The legacy folder

*Do* (`move`): `mkdir legacy && git mv src legacy/src`.

*Check* (`verify`):
```bash
git ls-files src | wc -l                                  # 0
git ls-files legacy | wc -l                               # 46
git diff --cached -M --name-status | awk '$1=="R100"' | wc -l      # 46
git diff --cached -M --name-status | awk '$1!="R100"' | wc -l      # 0
grep -n 'legacy\|src/' settings.gradle.kts build.gradle.kts       # no match on legacy; the old build files still name src/ until S6 replaces them
```
Nothing else changes in the stage, and the old build files are not run again: they are replaced in S6.

#### S3 — build-logic foundation

Test-first for every class in this stage: write the component test (named in the [Test plan](#test-plan)), watch it fail to
compile or fail, write the class, watch it pass. All commands run the included build as its own root.

| Step | Files (all under `build-logic/`) | Check |
|---|---|---|
| `build-files` | `settings.gradle.kts`, `build.gradle.kts` | `./gradlew -p build-logic help` ends `BUILD SUCCESSFUL`; `./gradlew -p build-logic tasks --all \| grep -c -E '^(gating\|component\|integration\|deterministic\|e2e\|nonfunctional)Test '` is `6` |
| `constants` | `src/main/kotlin/BotToolsBuild.kt` | `./gradlew -p build-logic componentTest deterministicTest --tests '*BotToolsBuild*'` ends `BUILD SUCCESSFUL`, with one test per behaviour named in the Test plan for those two classes |
| `floor` | `JavaFloorScan.kt`, `VerifyJavaFloor.kt` | `./gradlew -p build-logic componentTest --tests '*JavaFloor*'` passes |
| `logging` | `LoggingBackendScan.kt`, `VerifyNoLoggingBackend.kt` | `… --tests '*LoggingBackend*'` passes |
| `metadata` | `ReleasableMetadataScan.kt`, `VerifyReleasableMetadata.kt` | `… --tests '*ReleasableMetadata*'` passes |
| `umbrella-jars` | `UmbrellaJarScan.kt`, `VerifyUmbrellaSourcesJar.kt`, `VerifyUmbrellaJavadocJar.kt` | `… --tests '*UmbrellaJar*'` passes |
| `support` | `src/test/kotlin/com/spartanlabs/testing/support/bottools/buildlogic/*.kt` | compiles with the first TestKit test of S4 |

End of stage: `./gradlew -p build-logic componentTest deterministicTest` ends `BUILD SUCCESSFUL`, `grep -rl '<failure\|<error'
build-logic/build/test-results` prints nothing.

#### S4 — The convention plugins

*Do:* `bottools.kotlin-library.gradle.kts`, then `bottools.published-library.gradle.kts` (contents in
[File-by-file changes](#file-by-file-changes)), each test-first with the TestKit tests of the Test plan: a generated project applies
the plugin through a composite that includes the `build-logic` sources (`BuildLogicSource`), so the plugin under test is the one in
the working tree.

*Check:* the same commands as S5 over the classes written so far; the step ends when every class of the Test plan's integration, end-to-end and
non-functional sections for the two plugins passes, in particular:
- the **seeded-violation test**: a generated module whose main source holds `suspend fun f() = runCatching { delay(1) }` fails
  `./gradlew check` at `:detektMain` with `SuspendFunSwallowedCancellation` in the output, while `./gradlew detekt` on the same
  project passes;
- a generated module with an undocumented public class fails `dokkaGeneratePublicationHtml` and `check`;
- a generated module with a `public` declaration lacking a visibility modifier fails `compileKotlin` under explicit API mode.

#### S5 — build-logic tests

```bash
./gradlew -p build-logic test --stacktrace
# gating + component + deterministic; BUILD SUCCESSFUL; no <failure> or <error> in build-logic/build/test-results
./gradlew -p build-logic integrationTest e2eTest nonfunctionalTest --stacktrace
# nested Gradle builds; the first run downloads (network), under 30 minutes; BUILD SUCCESSFUL
grep -rl '<failure\|<error\|<skipped' build-logic/build/test-results | wc -l        # 0
```
`test` fails on an empty run, as do the other five tasks (`isFailOnNoMatchingTests = true`), so a lost test class or a broken filter is
a failure here.

#### S6 — Modules and root build

1. `settings`: root `settings.gradle.kts` (below), with the five feature modules included.
2. `root`: root `build.gradle.kts`.
3. `catalog-and-properties`: `gradle/libs.versions.toml`, `gradle.properties`.
4. `detekt-config`: `config/detekt/detekt.yml`.
5. `theme-assets`: `docs/brand/spartan-laboratories-logo.png` and `docs/dokka/styles/dokka-styles.css`, copied from WebTools at
   commit `d68ec81e82828911f373bc4940da34580786aaee`:
   ```bash
   C=d68ec81e82828911f373bc4940da34580786aaee; B=repos/SpartanLaboratories/WebTools/contents
   mkdir -p docs/brand docs/dokka/styles
   gh api "$B/docs/brand/spartan-laboratories-logo.png?ref=$C" -H 'Accept: application/vnd.github.raw' > docs/brand/spartan-laboratories-logo.png
   gh api "$B/docs/dokka/styles/dokka-styles.css?ref=$C" -H 'Accept: application/vnd.github.raw' > docs/dokka/styles/dokka-styles.css
   git hash-object docs/brand/spartan-laboratories-logo.png    # 6b680404171c361cdbcda35e51a45a87776f5f74 (324247 bytes)
   git hash-object docs/dokka/styles/dokka-styles.css          # d6d78e956e8daa6b8096e61b8b68c22114b11002 (8929 bytes)
   ```
   (the CSS is text: `git hash-object` reads its LF bytes, which equal the blob; a CRLF working copy still hashes as the blob only
   after normalisation, so the file is written with `gh api` redirect, which keeps LF.)
6. `core`, `stats`, `empty-modules`: the module build files, the two markers and the linkage tests (below).
7. `dumps`: `./gradlew apiDump`, then review each new file.

*Check:*
```bash
./gradlew :bottools-core:compileKotlin :bottools-core:componentTest :bottools-core:integrationTest :bottools-stats:integrationTest --stacktrace
# BUILD SUCCESSFUL. :bottools-core:componentTest runs the marker tests, :bottools-core:integrationTest the JDA check,
# :bottools-stats:integrationTest the serialization check; :bottools-stats:compileKotlin prints NO-SOURCE (its only source is the test).
./gradlew apiDump
git status --short -- '*/api/*.api'          # five new files
wc -c bottools-core/api/bottools-core.api    # > 0: holds exactly the two annotation interfaces
wc -c bottools-data-sqlite/api/*.api bottools-http/api/*.api bottools-stats/api/*.api bottools-plugins/api/*.api   # 0 each
./gradlew apiCheck                           # BUILD SUCCESSFUL
./gradlew build --stacktrace                 # BUILD SUCCESSFUL: five modules and the root; the umbrella arrives in S7
```

#### S7 — The umbrella

*Do:* `bottools/build.gradle.kts`; add `:bottools` to `settings.gradle.kts`; `./gradlew :bottools:apiDump`
(a zero-byte `bottools/api/bottools.api`); write `RootScriptsAgreementGatingTest`.

*Check:*
```bash
./gradlew :bottools:build --stacktrace          # BUILD SUCCESSFUL; the run includes :bottools:verifyUmbrellaSourcesJar
                                                # and :bottools:verifyUmbrellaJavadocJar and :bottools:verifyReleasableMetadata
./gradlew -p build-logic gatingTest --tests '*RootScriptsAgreement*'     # passes: the lists, versions and directories agree
```

#### S8 — The real build

1. `clean-clone`: a clean copy of the change set, made from the working tree so that nothing has to be committed first: every tracked
   and every new, non-ignored file of the checkout, copied into an empty folder, which then gets its own scratch repository so that
   a mutation (step 4) can be undone there:
   ```bash
   KB="$(git rev-parse --show-toplevel)"; export SCRATCH="$(cygpath -m "$TEMP")/bottools-s8"; rm -rf "$SCRATCH"; mkdir -p "$SCRATCH/clean"
   (cd "$KB" && git ls-files -z -c -o --exclude-standard | tar --null -T - -cf -) | tar -C "$SCRATCH/clean" -xf -
   cd "$SCRATCH/clean" && git init -q && git add -A && git -c user.name=scratch -c user.email=scratch@example.invalid commit -qm "scratch: the change set"
   test ! -e src && test -d legacy/src && echo "copy holds legacy/ and no src/"      # copy holds legacy/ and no src/
   ./gradlew build --stacktrace
   ```
   Expected: `BUILD SUCCESSFUL`; `./gradlew build --dry-run | grep -c ':apiCheck SKIPPED$'` is `6`;
   the log (or `--dry-run`) holds, for each of the six projects, `verifyJavaFloor`, `verifyNoLoggingBackend`,
   `verifyReleasableMetadata`, `dokkaGeneratePublicationHtml`, `apiCheck`, `detektMain`, `detektTest`; the root holds
   `dokkaGeneratePublicationHtml` and `verifyDocsAggregate`; the four feature modules without main source (`bottools-data-sqlite`,
   `bottools-http`, `bottools-stats`, `bottools-plugins`) and the umbrella print `compileKotlin NO-SOURCE` and `detektMain NO-SOURCE`.
   The files `*/build/reports/java-floor/verifyJavaFloor.txt` exist for all six modules. Steps 2 to 5 run in `$SCRATCH/clean` too;
   the checkout itself is never mutated.
2. `publish`: `./gradlew publishToMavenLocal -Dmaven.repo.local="$SCRATCH/m2" --console=plain`. Expected: `BUILD SUCCESSFUL`; for each
   project the order is `generateMetadataFileForMavenPublication`, `verifyReleasableMetadata`,
   `publishMavenPublicationToMavenLocal`; signing tasks are `SKIPPED`; `ls "$SCRATCH/m2/io/github/spartanlaboratories"` lists the six
   artifact ids; each version folder (`1.0.0-SNAPSHOT`) holds `.jar`, `-sources.jar`, `-javadoc.jar`, `.pom`, `.module` and no `.asc`;
   `grep -c '"strictly"' "$SCRATCH/m2/io/github/spartanlaboratories/bottools/1.0.0-SNAPSHOT/bottools-1.0.0-SNAPSHOT.module"` is `10`
   (five modules, two library variants); the same file's `"strictly": "1.0.0-SNAPSHOT"` appears only inside `dependencyConstraints`;
   `grep -c strictly …/bottools-1.0.0-SNAPSHOT.pom` is `0`.
3. `consumer`: a throwaway build in `$SCRATCH/consumer` with `repositories { maven { url = uri("file:$SCRATCH/m2") }; mavenCentral() }`,
   Kotlin JVM 2.2.21, `implementation("io.github.spartanlaboratories:bottools:1.0.0-SNAPSHOT")`, and one source file
   `@SupportedExtension class Probe`. Expected: `./gradlew compileKotlin` succeeds;
   `./gradlew dependencyInsight --dependency bottools-core --configuration compileClasspath` shows `1.0.0-SNAPSHOT` selected with a
   `strictly 1.0.0-SNAPSHOT` constraint; JDA 6.7.0 and coroutines 1.10.2 are on the compile classpath and jda-ktx is not
   (`dependencies --configuration compileClasspath | grep -c jda-ktx` is `0`). Adding `@ExperimentalBotToolsApi class Marked` and a
   call to it without `@OptIn` fails `compileKotlin` with a message that names the opt-in requirement; with
   `@OptIn(ExperimentalBotToolsApi::class)` it compiles.
4. `mutations`: each of the following is made in the clean copy `$SCRATCH/clean`, never in the checkout, run once, expected to fail as
   stated, then undone there with `git checkout -- . && git clean -fdq` (a clean `git status --short` in the copy afterwards is part of the
   check):

   | Mutation | Command | Expected failure |
   |---|---|---|
   | a `public class Undocumented` in `bottools-core` | `./gradlew build` | `:bottools-core:dokkaGeneratePublicationHtml` fails with `Undocumented`; `:bottools-core:apiCheck` also fails until `apiDump` |
   | a top-level `val x = 1` (no visibility modifier) in `bottools-core` | `./gradlew :bottools-core:compileKotlin` | an explicit-API error naming the missing visibility modifier |
   | `suspend fun f() = runCatching { kotlinx.coroutines.delay(1) }` in core | `./gradlew check` | `:bottools-core:detektMain` fails naming `SuspendFunSwallowedCancellation`; `./gradlew :bottools-core:detekt` passes |
   | `implementation("ch.qos.logback:logback-classic:1.6.7")` in core | `./gradlew :bottools-core:verifyNoLoggingBackend` | fails naming the module, the jar, `ch.qos.logback:logback-classic:1.6.7` and the fix |
   | the umbrella constraint `strictly(pin)` replaced by `require(pin)` | `./gradlew :bottools:verifyReleasableMetadata` | fails naming `apiElements`, the edge and the missing `strictly` |
   | `id("org.jetbrains.kotlin.jvm") apply false` removed from the root build script | `./gradlew verifyDocsAggregate` | fails naming `bottools-core/index.html` |
   | `-Xjdk-release=21` removed from `bottools.kotlin-library` and the toolchain left at 21 | `./gradlew :bottools-core:verifyJavaFloor` | still passes (the toolchain is 21): this row shows the floor check reads bytes and metadata, not flags; the failure path (a class above major 65, a variant that declares another `org.gradle.jvm.version`) is proved by the TestKit tests on generated jars, and is not mutated in the real build |
5. `configuration-cache`: `./gradlew build --configuration-cache` twice; the second prints `Reusing configuration cache.` and neither
   prints a configuration-cache problem.

Also record, from the reproduction checks the research left for the real modules: the published shape of the umbrella (step 2), the
in-build resolution (the umbrella's consumers inside the build resolve `project :bottools-core`, shown by
`./gradlew :bottools:dependencies --configuration compileClasspath | grep 'project :bottools-core'`), the composite substitution (the
end-to-end test of S4), the conflict matrix (the integration test of S4, which publishes two versions of a generated library), and the check wiring
(step 2). Any difference from the research is a deviation to record, not to hide.

#### S9 — The project site

*Do* (`website`): copy from WebTools at `d68ec81e…` `website/404.html`, `website/assets/styles.css`, `website/assets/site.js`,
`website/assets/favicon.svg`, retitle the 404 page; hand-write `website/index.html`, `website/robots.txt`, `website/sitemap.xml`,
`website/README.md` (below).

*Check* (`check`):
```bash
test -f website/index.html && test -f website/404.html && test -f website/assets/styles.css && echo present          # present
grep -c 'assets/brand/spartan-laboratories-logo.png' website/index.html                      # >= 1 (the page shows the logo)
grep -o 'href="[^"#:][^"]*"\|src="[^"#:][^"]*"' website/index.html | sed 's/^[a-z]*="//;s/"$//' | sort -u   # every relative target
# each target except api/ and assets/brand/... exists under website/; api/ is produced by pages.yml and assets/brand/ is copied from docs/brand/
python -I -c "import html.parser,sys; p=html.parser.HTMLParser(); p.feed(open('website/index.html',encoding='utf-8').read()); print('parsed')"   # parsed
```
No Dokka output is needed for this stage; the assembled site is read in S15.

#### S10 — The workflows

*Do:* the three files and the `WorkflowsAgreementGatingTest` (contents below).

*Local checks* (`local-checks`): no YAML parser is installed, so the files are read by shape:
```bash
for f in ci pages release; do test -f .github/workflows/$f.yml && echo "$f present"; done            # three lines
grep -hoE 'uses: [^ ]+' .github/workflows/ci.yml .github/workflows/pages.yml .github/workflows/release.yml | sort | uniq -c
# every action is pinned to a 40-hex commit; the six commits of the table are the only ones
grep -c 'contents: write' .github/workflows/release.yml                    # 0
grep -n 'pages: write\|id-token: write' .github/workflows/pages.yml        # both lines sit under the deploy job, none at workflow level
grep -nE '^(  |    )(paths|paths-ignore|branches-ignore|if):|^    if:' .github/workflows/ci.yml    # no match: no filter on the workflow, no job-level if (a step-level `if: failure()` sits deeper and is allowed)
./gradlew -p build-logic gatingTest --tests '*WorkflowsAgreement*'          # passes
```
The hosted run is the real check of a workflow file; it is read in S15.

#### S11 — The repository files

`LICENSE` copied from MyGameTools at `46697c15…` (`gh api repos/SpartanLabsGaming/MyGameTools/contents/LICENSE?ref=46697c15f4c2386b6cfd17eadefd1bfa1f6d54cd -H
'Accept: application/vnd.github.raw' > LICENSE`); `CONTRIBUTING.md`, `README.md` and `CHANGELOG.md` per the file-by-file section.

*Check:*
```bash
tail -n 16 LICENSE | grep -c 'Copyright 2026 Spartan Laboratories'     # 1
head -n 1 LICENSE | grep -c 'Apache License'                           # 1 (the first non-blank line is the title)
grep -c 'No license' README.md                                         # 0
grep -n 'legacy/' README.md | head -n 3                                # the stub names the folder and Phase 17
grep -c 'counts by rule id only' CHANGELOG.md .github/workflows/secret-scan.yml   # 0 and 0 (after S12 for the workflow)
```

#### S12 — The CI files' follow-ups

Edits in the four files (the list is in [the CI files' follow-ups](#the-ci-files-follow-ups)). *Check:*
```bash
python -I -B -c "import ast,sys; [ast.parse(open(p,encoding='utf-8').read()) for p in sys.argv[1:]]; print('parse ok')" .github/scripts/secret_scan.py .github/scripts/allowlist_controls.py   # parse ok
git diff --stat -- .github .gitignore                    # only comments, docstrings, help text, message text, one ignore pattern
git check-ignore -q .github/scripts/__pycache__/x.pyc && echo ignored                                  # ignored
```
and, to show no behaviour changed, the diff of every non-comment, non-docstring, non-help-text, non-message line is empty: for the two
scripts, `python -I -B` compiles each to a code object before and after and compares `co_code` of every function
(`ast`-level comparison with the docstrings and `help=` keyword values removed):

```bash
python -I -B - <<'PY'
import ast, subprocess
def norm(src):
    t = ast.parse(src)
    for n in ast.walk(t):
        if isinstance(n, (ast.Module, ast.FunctionDef, ast.ClassDef)) and ast.get_docstring(n, clean=False) is not None:
            n.body = n.body[1:] or [ast.Pass()]
        if isinstance(n, ast.Call):
            n.keywords = [k for k in n.keywords if k.arg != "help"]
    return ast.dump(t)
for p in (".github/scripts/secret_scan.py", ".github/scripts/allowlist_controls.py"):
    old = subprocess.run(["git", "show", "main:" + p], capture_output=True, text=True, check=True).stdout
    print(p, norm(old) == norm(open(p, encoding="utf-8").read()))
PY
```
Expected: two lines, each `True` (the printed message strings of `GATE FAILED`, `CONTROLS FAILED` and the like are not edited; only the
docstrings and `help=` text are, so the comparison holds). The workflow's changed message text and comments are covered by S13's
`workflow-run` block.

#### S13 — The secret-scan re-runs

The hygiene change's checks that bear on this change run again from that change's own text, in a scratch folder outside the repository,
because the workspace they ran in no longer exists. Sources: the hygiene plan,
`docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/24-repository-hygiene/plan.md` (`$HPLAN`), step S4 and the helper
block of step S1; the gitleaks binary and `p25/logshapes.py` in the data folder's tools copy,
`%USERPROFILE%\BotLegacyData\run\tools\`. Why each runs:

| Change | Hygiene check that runs again | Why |
|---|---|---|
| `secret_scan.py` docstrings, comments and help text | `negatives` | the wrapper changed |
| `allowlist_controls.py` docstring and comments | `controls`, `mutations` | the controls changed |
| `secret-scan.yml` comments and annotation text | `workflow-run`, `log-filter` | the workflow changed |
| the 46 moved files, the new binary logo, the new files | `scans`, `canary` | requirement 12: the scan reads `legacy/` at its new paths and scans clean |

`negatives` needs the report `canary` writes, and `workflow-run` needs the files `mutations` writes, so the order is `clone`,
`scans`, `canary`, `controls`, `mutations`, `negatives`, `workflow-run`, `log-filter`. Each block is saved to a file outside the
checkout and run with `bash <file>`, never passed as a long command line (a command of about 7.6 KB was cut on this machine; the
longest block is 7.9 KB), and the three long ones run with a ten-minute timeout and may run in the background: `controls` (about two
and a half minutes), `mutations` (about six) and `workflow-run` (about three, which downloads the release archive twice).

`env` (written to `$W/env.sh`, sourced first by every block; the first call removes any earlier `$SCRATCH` and creates it empty, so the folder
holds nothing from an earlier run):

```bash
SCRATCH="$(cygpath -m "$TEMP")/bottools-s13"; W="$SCRATCH/h3"; mkdir -p "$W"
KB="$(git rev-parse --show-toplevel)"; cd "$KB" || exit 1
TOOLS="$(cygpath -m "$USERPROFILE")/BotLegacyData/run/tools"; GL="$TOOLS/gitleaks-8.30.1/gitleaks.exe"
DOC=docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite
HPLAN=$DOC/24-repository-hygiene/plan.md
ok()     { echo "ok    $*"; }
stop()   { echo "STOP  $*"; exit 1; }
expect() { if [ "$2" = "$3" ]; then ok "$1"; else stop "$1: expected '$2', got '$3'"; fi; }
yn()     { [ -e "$1" ] && echo 1 || echo 0; }
gitnet() { git -c credential.helper= -c 'credential.helper=!gh auth git-credential' "$@"; }
export GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never
heredoc() { awk -v n="$2" 'index($0,"cat > \"$W/" n "\" <<")==1 {split($0,a,"<<"); e=a[2]; gsub(/\047/,"",e); f=1; next} f && $0==e {f=0} f' "$1"; }
stepblock() { awk -v n="$1" 'index($0,"### S4")==1{s=1;next} s&&index($0,"### S5")==1{exit} s&&index($0,"**`" n "`**")==1{g=1;next} g==1&&/^```bash/{g=2;next} g==2&&/^```/{exit} g==2{print}' "$HPLAN"; }
```

Steps:

1. **Tools, as the hygiene plan's S1 `tools` step recorded them** (reads only): the binary hashes to
   `17157e2ee8b76fc8b1d8bee607a250e34b8a8023c8bc81822d4b5ee4d78fcb7c` and `"$GL" version` prints `8.30.1`. The step's other two lines
   (the workspace wrapper and configuration) are not used: the wrapper is the committed one, in the clone, and the configuration is
   `.gitleaks.toml` in the clone, which this change does not edit.
2. **Helpers**, extracted from the hygiene plan's S1 `helpers` block, not retyped:
   `heredoc "$HPLAN" h24lib.sh > "$W/h3lib.sh"` (1,976 bytes, 16 lines, counting one final newline) and `heredoc "$HPLAN" logshapes.py > "$W/logshapes.py"`
   (2,181 bytes, 39 lines; it equals `p25/logshapes.py` of the data folder: `diff` prints nothing; any difference is reported and the
   plan's text is used). Also `runblocks.py` (947 bytes), `mutate.py` (1,475) and `mklog.py` (2,476) the same way. `. "$W/h3lib.sh"` defines
   `fence`, `blobsum`, `gscan`, `errbytes`, `rules`, `shapes` and `SHAPES`. `gscan` runs the wrapper as `python -I "$SS"`, so `SS` is set
   after the clone to the clone's committed wrapper: `SS="$W/clone/.github/scripts/secret_scan.py"`.
3. **Each S4 block, extracted and edited, not retyped.** `stepblock NAME > "$W/NAME.sh"`; prefix each with
   `. "$W/env.sh"; . "$W/h3lib.sh"; SS="$W/clone/.github/scripts/secret_scan.py"`. The block sizes (counting one final newline) are
   `clone` 1,784, `scans` 1,019, `canary` 2,521, `controls` 5,034, `mutations` 3,778, `negatives` 7,923, `workflow-run` 7,000 and `log-filter`
   3,382 bytes. Only `clone` changes, because it names the old branch and the old change set, and because its copy line carries only
   modified and untracked files, which would leave out every staged rename into `legacy/` and keep the old `src/` in the clone:
   - `sed 's#chore/issue-24-repository-hygiene#feat/issue-3-build-skeleton#'`;
   - the copy line `git ls-files -m -o --exclude-standard -z | while …; done` is replaced by two lines that make the clone's tree equal the
     checkout's working change set, renames and new files included:
     `git -C "$CL" rm -rq --ignore-unmatch -- . >/dev/null` (the clone's tracked files leave its index and tree), then
     `git ls-files -c -o --exclude-standard -z | while IFS= read -r -d '' p; do [ -f "$KB/$p" ] || continue; mkdir -p "$CL/$(dirname "$p")"; cp "$KB/$p" "$CL/$p"; done`;
     the block's next line (`git -C "$CL" add -A …; … commit … "scratch: the pending change set"`) stays, and one added line checks the
     result: `expect "the clone holds legacy/ and no src/" "46 0" "$(git -C "$CL" ls-tree -r --name-only HEAD -- legacy | wc -l | tr -d ' ') $(git -C "$CL" ls-tree -r --name-only HEAD -- src | wc -l | tr -d ' ')"`;
   - the `ls-tree` count: `7` becomes `10` and "the seven files" becomes "the ten files" (the pathspec `.gitignore .gitleaks.toml .github
     README.md CHANGELOG.md` now covers `.gitignore`, `.gitleaks.toml`, two scripts, four workflows, `README.md` and `CHANGELOG.md`);
   - the loop `for p in …; do expect "the clone holds this checkout's $p" …` gains the three paths `.github/workflows/ci.yml`,
     `.github/workflows/pages.yml` and `.github/workflows/release.yml`.
   The other seven blocks run as extracted. The scratch commit carries the whole change set, so `scans` reads `legacy/` at its new paths,
   the new files and the logo.

Expected, per block (the number of `ok` lines, and the one fact each prints):

| Block | `ok` lines | Expected |
|---|---|---|
| `clone` | 17 | the clone's tip holds `legacy/` (46 files) and no `src/`, and the ten files, each equal to the checkout's blob; no `.gitleaksignore`; no gitleaks configuration in the environment; `earlier.toml` from `main`'s findings is 2373 bytes with sha256 `4e68f75c709bd2937253ee9efee3f8fd28f891aa3eb7b00de7b830a28f5396eb`; a `RECORD` of the GitHub branches fetched (2 or more) |
| `scans` | 14 | for history `all`, history `branches` and the tree: every line a fixed shape, nothing on standard error, `commits_scanned=N expected_commits=N` equal (N is the branch's commits plus the one scratch commit) or `bytes_scanned=<n>`, `gitleaks_exit=0 error_lines=0 findings=0`, `RESULT: CLEAN`, status 0 |
| `canary` | 21 | `commits_scanned=6 expected_commits=6` for `all` and `5`/`5` for `branches`; each rule finds its planted secrets; `CANARY OK` twice |
| `controls` | 42 | committed run `CONTROLS OK` with 22 controls as expected, each fixture in each mode with its status and one finding, in order; the eleven failure cases give their fixed reasons |
| `mutations` | 42 | the ten mutated configurations each fail with `CONTROLS FAILED: <n> unexpected`: 18, 7, 22, 8, 10, 2, 2, 2, 2, 6 in the table's order, with the named controls |
| `negatives` | 64 | every case prints its exact marker line; the uncaught exceptions exit 1 with no verdict line |
| `workflow-run` | 22 | the six `run:` blocks of the clone's workflow each pass on the change set and stop on each failure they guard against; the two `::error title=Secret scan::` annotations are found by their unchanged prefix |
| `log-filter` | 4 | `6 62 0`, `6 63 1`, `5 39 0`, `6 62 0` |

226 `ok` lines in all, no `STOP`. A `STOP` ends the call: record the block and the marker, never content, and fix the cause in the change (a
hit in `scans` on a moved path means a path rule matched `legacy/`; the plan expects none). The scratch folder holds history and
reports and is deleted after the stage; nothing in it is committed or printed.

*Not re-run, and why:* the hygiene plan's `before`, `tools` wrapper/configuration lines and the privacy gate (no secret-bearing file
is added); the S3 checks of the ignore list and the README text (this change replaces the README, and the ignore list's only change is
a comment and a pattern, checked in S12); the P and LR reads of that change's own landing.

#### S14 — The parent documents

The documents of this stage are written with this plan, not by the implementer, and stand in the working tree beside it; the stage reads
them. Each callout is a dated note, and nothing else in its document changes.

**`architecture.md`**, three notes dated 2026-11-18:
- at the end of §1.1:
  - "Platform": a Java floor of 21, set apart from the toolchain;
  - "Conventions": logging through kotlin-logging under the organisation's logging policy;
  - the tests: the organisation's seven test sets, each with its task, in place of "the five-level test hierarchy";
- under §5.4's table:
  - the `slf4j-api` row becomes `kotlin-logging-jvm` 8.0.7 and `slf4j-api` 2.0.19, both `implementation`, neither in a public signature;
  - the `logback-classic` row reads 1.6.7, `testRuntimeOnly`;
- at the end of §9:
  - "Logging events": through kotlin-logging, not slf4j's fluent API;
  - "Testing by level": seven tasks, `gatingTest` and `uatTest` beside the five it lists.

**`../consequences.md` §1**, one note dated 2026-11-18: the old code leaves `main` in Phase 17, from the `legacy/` folder, not in the phase
that replaces each part.

**This folder's `consequences.md` and the two folded-in issues' documents.** These are
[`29-dokka-and-project-site/plan.md`](29-dokka-and-project-site/plan.md) and [`33-logging-backend/plan.md`](33-logging-backend/plan.md),
which this plan's header links.

**Written later, with the build's record, before the landing (S15):** a dated note in each Phase 0 document whose follow-up this change
closes, marking it closed with a link to this change's documents. Nothing else in those documents changes. The documents are:
- the hygiene consequences §6 (the CI files' comment and message-text changes, the `__pycache__/` pattern), with the residual-report
  consequences §6, which confirmed them;
- the publication consequences §6 (the required status check);
- the hygiene consequences §3 (the changelog's versioning statement).

*Check* (a read):
- `git diff -- docs/plans/1-bottools-consolidation/architecture.md` adds lines only, in three `> **Dated note, 2026-11-18` blocks, and removes
  none;
- `git diff -- docs/plans/1-bottools-consolidation/consequences.md` adds one such block and removes nothing.

#### S15 — The landing

Requests are sent by the run; the implementer reads. Order:
1. `push`: request: commit the working change set on `feat/issue-3-build-skeleton` (the commits of [Version control](#version-control),
   without the boards' files), bring the branch up to date with `main`, and push it. No version moves: `BotToolsBuild.VERSION` already reads
   `1.0.0-SNAPSHOT`.
2. `pages-source`: request P1; read-back as in [the repository settings](#the-repository-settings). It precedes the merge.
3. `pull-request`: the landing request opens the pull request to `main`. The body ends with `Closes #3`, `Closes #29` and `Closes #33` on separate
   lines and `Part of #1` (never a closing keyword for #1). The request carries the merge condition: it merges only after the four checks below have
   each completed with success on the pull request; a failure, a pending check or a missing run stops the landing with the pull request open. No
   ruleset enforces this yet, so the condition is the request's.
4. `ci-reads`: the four checks of the pull request, read with `gh pr checks <n>`: `Secret scan (gitleaks)`, `Build (gradlew build)`,
   `API docs (Dokka)`, `build-logic (TestKit)` each `pass`, none pending. The secret-scan run's log is read with `logshapes.py` as the hygiene
   change did: `python -I "$W/logshapes.py" <log> "$SHAPES"` prints `6 62 0` (six step headers, 62 lines, none of another shape). `gh run view
   <ci run> --log` of `Build (gradlew build)` shows `BUILD SUCCESSFUL`, the publish step, and the six-folder check. A pull request with a
   merge conflict starts no run, and a missing run is not a pass.
5. `merge`: the same request merges with a merge commit once its condition holds, and deletes the branch (merge commits are the only
   method the ruleset will allow; the repository setting still allows all three until P2).
6. `main-reads`: on `main`'s head: `gh api repos/SpartanLaboratories/KotlinBottools/commits/<sha>/check-runs` lists `Secret scan (gitleaks)`,
   `Build (gradlew build)`, `API docs (Dokka)`, `build-logic (TestKit)` each `success`, app id 15368; the `Pages` run is `success`. The site:
   `curl -s -o /dev/null -w '%{http_code}' https://spartanlaboratories.github.io/KotlinBottools/` is `200`, and `…/api/` is `200`. The
   deployed artifact: `gh run download <pages run> -n github-pages -D "$SCRATCH/pages"`, then `tar -tf "$SCRATCH/pages/artifact.tar" |
   grep -cx './.nojekyll'` is `1` and `… | grep -c '^./api/index.html$'` is `1`. A failed run is a stop, with the branch merged: the fix lands by a
   new pull request, and S16 waits for green.

#### S16 — Settings after the landing

P2, P3 and P4 in that order, each followed by its read-back ([the repository settings](#the-repository-settings)). Before P3: `main`'s head
equals the sha S15 read, and the four check runs on it succeeded. After P3:
```bash
gh api repos/SpartanLaboratories/KotlinBottools/rules/branches/main --jq '[.[].type]|sort|join(",")'
# deletion,non_fast_forward,pull_request,required_status_checks
gh api repos/SpartanLaboratories/KotlinBottools/rules/branches/main --jq '.[]|select(.type=="required_status_checks")|.parameters|[.strict_required_status_checks_policy,([.required_status_checks[]|.context]|sort|join("|")),([.required_status_checks[]|.integration_id]|unique|join(","))]|@tsv'
# true<TAB>API docs (Dokka)|Build (gradlew build)|Secret scan (gitleaks)|build-logic (TestKit)<TAB>15368
gh api repos/SpartanLaboratories/KotlinBottools --jq '[.allow_squash_merge,.allow_rebase_merge,.allow_merge_commit]|@csv'     # false,false,true
```
The issue-closing is done by the merged pull request's keywords; #1 stays open.

---

## File-by-file changes

Paths are repository-relative. "Adapted" means taken from the WebTools or MyGameTools file named, with the changes listed.

### Root

**`gradle/wrapper/gradle-wrapper.properties`, `gradle/wrapper/gradle-wrapper.jar`, `gradlew`, `gradlew.bat`** — regenerated for Gradle 9.7.1
(`distributionUrl` `…gradle-9.7.1-bin.zip`, `distributionSha256Sum` the published value). The jar remains the repository's one binary.

**`settings.gradle.kts`** — replaced:
```kotlin
pluginManagement {
    includeBuild("build-logic")
    // Kotlin, the serialization compiler plugin and Dokka equal the marker dependencies in build-logic/build.gradle.kts;
    // RootScriptsAgreementGatingTest checks it, so the root and the convention plugins load one plugin version.
    plugins {
        id("org.jetbrains.kotlin.jvm") version "2.2.21"
        id("org.jetbrains.kotlin.plugin.serialization") version "2.2.21"
        id("org.jetbrains.dokka") version "2.2.0"
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
}

rootProject.name = "KotlinBottools"

include(
    ":bottools-core", ":bottools-data-sqlite", ":bottools-http", ":bottools-stats", ":bottools-plugins", ":bottools",
)
```
(S6 includes the first five; S7 adds `:bottools`.) The opening `pluginManagement {` line and its closing brace stay at column 0, because the
gating test reads the block. The WebTools composite include is the next unit's.

**`build.gradle.kts`** — replaced (root has no source):
```kotlin
import java.io.File

plugins {
    base
    // Dokka and the Kotlin Gradle plugin must share one plugin classloader. Without the Kotlin plugin on the root classpath the
    // aggregate renders every module empty and the build still passes; verifyDocsAggregate guards the page.
    id("org.jetbrains.kotlin.jvm") apply false
    id("org.jetbrains.dokka")
}

repositories { mavenCentral() }

val featureModules = listOf("bottools-core", "bottools-data-sqlite", "bottools-http", "bottools-stats", "bottools-plugins")
dependencies { featureModules.forEach { dokka(project(":$it")) } }

dokka {
    moduleName.set("BotTools")
    moduleVersion.set(provider { project(":bottools-core").version.toString() })   // all six share one version
    dokkaPublications.configureEach { failOnWarning.set(true) }
    pluginsConfiguration.html {
        customStyleSheets.from(file("docs/dokka/styles/dokka-styles.css"))
        customAssets.from(file("docs/brand/spartan-laboratories-logo.png"))
        footerMessage.set("&copy; 2026 Spartan Laboratories")
    }
}

// The aggregate holds a page for every feature module that has source. The source trees are task inputs, read at execution, so
// adding a first source file to a module changes the check without a stale configuration-cache entry; only captured locals are used.
val moduleSources: Map<String, FileTree> = featureModules.associateWith { m ->
    fileTree(layout.projectDirectory.dir("$m/src/main/kotlin")) { include("**/*.kt") }
}
val verifyDocsAggregate = tasks.register("verifyDocsAggregate") {
    group = "verification"
    description = "Fails when the aggregated Dokka output lacks a page for a module that has source."
    val html = layout.buildDirectory.dir("dokka/html")
    val sources = moduleSources
    dependsOn("dokkaGeneratePublicationHtml")
    inputs.files(sources.values).withPropertyName("moduleSources").withPathSensitivity(PathSensitivity.RELATIVE)
    inputs.dir(html)
    doLast {
        val withSource = sources.filterValues { !it.isEmpty }.keys
        check(withSource.isNotEmpty()) { "$path: no feature module has source, nothing to check" }
        val missing = withSource.filterNot { File(html.get().asFile, "$it/index.html").isFile }
        check(missing.isEmpty()) { "$path: the aggregated Dokka output has no page for $missing (is the Kotlin plugin on the root classpath?)" }
    }
}
tasks.named("check") { dependsOn("dokkaGeneratePublicationHtml", verifyDocsAggregate) }
```
`dokka(project(":…"))` and the module list are literals here because the root applies no convention plugin and so cannot see `BotToolsBuild`;
`RootScriptsAgreementGatingTest` asserts the list equals `BotToolsBuild.FEATURE_MODULES`. Failure design: `check(…)` throws
`IllegalStateException` with the task path; a failed task fails the build.

**`gradle.properties`** — replaced:
```properties
kotlin.code.style=official
org.gradle.jvmargs=-Xmx2g -Dfile.encoding=UTF-8
org.gradle.configuration-cache=true
org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled
org.jetbrains.dokka.experimental.gradle.pluginMode.noWarn=true
```
A configuration-cache problem is fixed in the plugin that reports it; the cache is not switched off.

**`gradle/libs.versions.toml`** — new:
```toml
[versions]
jda = "6.7.0"
jda-ktx = "0.14.2"
kotlinx-coroutines = "1.10.2"
kotlinx-serialization = "1.9.0"

[libraries]
jda = { module = "net.dv8tion:JDA", version.ref = "jda" }
jda-ktx = { module = "club.minnced:jda-ktx", version.ref = "jda-ktx" }
kotlinx-coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinx-coroutines" }
kotlinx-serialization-json = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "kotlinx-serialization" }
```

**`config/detekt/detekt.yml`** — new:
```yaml
# Only the override lives here: buildUponDefaultConfig keeps the rest of detekt's default rule set.
# SuspendFunSwallowedCancellation is inactive by default and needs type resolution, which only
# detektMain and detektTest have; the convention plugin puts both on `check`.
coroutines:
  SuspendFunSwallowedCancellation:
    active: true
```

### `build-logic/`

**`settings.gradle.kts`** — adapted from WebTools': `dependencyResolutionManagement { repositories { mavenCentral(); gradlePluginPortal() } }` and
`rootProject.name = "bottools-build-logic"`.

**`build.gradle.kts`** — adapted from WebTools': `` `kotlin-dsl` ``; the marker dependencies

```kotlin
implementation("org.jetbrains.kotlin.jvm:org.jetbrains.kotlin.jvm.gradle.plugin:2.2.21")
implementation("org.jetbrains.kotlin.plugin.serialization:org.jetbrains.kotlin.plugin.serialization.gradle.plugin:2.2.21")
implementation("org.jetbrains.dokka:org.jetbrains.dokka.gradle.plugin:2.2.0")
implementation("com.vanniktech.maven.publish:com.vanniktech.maven.publish.gradle.plugin:0.37.0")
implementation("org.jetbrains.kotlinx.binary-compatibility-validator:org.jetbrains.kotlinx.binary-compatibility-validator.gradle.plugin:0.18.2")
implementation("dev.detekt:dev.detekt.gradle.plugin:2.0.0-alpha.6")   // exact: a pre-release; a bump goes with the seeded-violation test
testImplementation(platform("org.junit:junit-bom:5.11.4")); testImplementation("org.junit.jupiter:junit-jupiter")
testRuntimeOnly("org.junit.platform:junit-platform-launcher")
```
and the test-task region with seven packages `com.spartanlabs.testing.<set>.bottools.buildlogic` (WebTools' `registerBuildLogicLevelTest`,
renamed): `gatingTest`, `componentTest`, `integrationTest`, `deterministicTest`, `e2eTest`, `nonfunctionalTest`, each
`isFailOnNoMatchingTests = true`, the nested-build ones (integration, e2e, nonfunctional) taking the single-permit `TestKitHomeLock`,
the shared TestKit home under `build/testkit/home`, a 30-minute timeout and the system properties of WebTools' harness
(`bottools.testkit.projects`, `bottools.testkit.home`, `bottools.buildlogic.dir`, `bottools.root.dir`); `test` selects gating, component
and deterministic. There is no `uatTest` here: `build-logic` has no uat tests. `readsRootScripts()` declares as task inputs the root
scripts the gating tests read: `../settings.gradle.kts`, `../build.gradle.kts`, `../bottools*/build.gradle.kts`, `../gradle/libs.versions.toml`,
`../.github/workflows/*.yml`.

**`src/main/kotlin/BotToolsBuild.kt`** — new. Public API of the build, KDoc on every member:

```kotlin
/** One of the organisation's seven test sets, as a test task selects it. */
data class TestSet(val id: String, val description: String) {
    init { require(id.isNotBlank()) { "A test set needs a non-blank id" } }      // programmer error: thrown
    val taskName: String get() = "${id}Test"
    val packagePattern: String get() = "${BotToolsBuild.TEST_PACKAGE_ROOT}.$id.bottools.*"
    val taskDescription: String get() = "$description."
}

object BotToolsBuild {
    const val GROUP: String = "io.github.spartanlaboratories"
    const val VERSION: String = "1.0.0-SNAPSHOT"
    const val JDK_TOOLCHAIN: Int = 21
    const val JAVA_FLOOR: Int = 21
    const val TEST_PACKAGE_ROOT: String = "com.spartanlabs.testing"
    const val EXPERIMENTAL_MARKER: String = "com.spartanlabs.bottools.annotation.ExperimentalBotToolsApi"
    const val UMBRELLA: String = "bottools"
    const val LOGBACK_VERSION: String = "1.6.7"
    const val JUNIT_BOM_VERSION: String = "5.11.4"
    const val DOKKA_PUBLICATION_TASK: String = "dokkaGeneratePublicationHtml"
    const val VERIFY_JAVA_FLOOR_TASK: String = "verifyJavaFloor"
    const val VERIFY_NO_LOGGING_BACKEND_TASK: String = "verifyNoLoggingBackend"
    const val VERIFY_RELEASABLE_METADATA_TASK: String = "verifyReleasableMetadata"
    val FEATURE_MODULES: List<String>      // immutable: the five feature modules, in this order
    val TEST_SETS: List<TestSet>           // immutable: gating, component, integration, deterministic, e2e, nonfunctional, uat

    fun classFileMajor(javaRelease: Int): Int                                     // release + 44; throws IllegalArgumentException below 5
    fun registerTestSetTasks(project: Project, classesDirs: FileCollection, classpath: FileCollection): List<TaskProvider<Test>>
    fun registerVerifyJavaFloor(project: Project, jars: FileCollection, runtimeClasspath: FileCollection, sources: FileCollection): TaskProvider<VerifyJavaFloor>
    fun registerVerifyNoLoggingBackend(project: Project, runtimeClasspath: Configuration): TaskProvider<VerifyNoLoggingBackend>
    fun registerVerifyReleasableMetadata(project: Project): TaskProvider<VerifyReleasableMetadata>
}
```
The test-set descriptions use the standard's names in full ("Local development gating / pre-commit validation tests", "Isolated component
behaviour / business-logic tests", "Integration and external-interface tests", "Deterministic input-to-output tests", "End-to-end system
integration tests", "Non-functional validation tests", "User-acceptance and exploratory evaluation (manual; mostly disabled)"). Each
`register…` throws `InvalidUserDataException` when a task of that name exists (Gradle's own error, not caught) and logs one `logger.info`.
`registerVerifyNoLoggingBackend` reads the `Configuration` at configuration time only, to build the lazy `ArtifactCollection` providers.

**`src/main/kotlin/JavaFloorScan.kt`, `VerifyJavaFloor.kt`** — adapted from WebTools': `WebToolsBuild` → `BotToolsBuild`; the `label` and
messages say BotTools; `VerifyJavaFloor` gains `@get:InputFiles @get:PathSensitive(PathSensitivity.RELATIVE) abstract val sources:
ConfigurableFileCollection` (the module's `src/main/kotlin` tree) and throws "no class to verify" only when `sources` is non-empty. `JavaFloorScan.classFiles(root: File, maxMajor: Int): Result<FloorScan>` and `moduleMetadata(file: File, javaFloor:
Int): Result<FloorScan>` keep their signatures: a failure is an unreadable or missing file, a violation is inside the success. The task
unwraps with `getOrElse { throw GradleException("$path: cannot read $file: …", it) }`, deletes its report first, and writes
`java floor 21 (class-file major <= 65): …` only on success.

**`src/main/kotlin/LoggingBackendScan.kt`** — new:
```kotlin
object LoggingBackendScan {
    val DEFAULT_BARRED_MODULES: Set<String>                    // the sixteen group:module ids of the design, immutable
    fun providerEntries(root: File): Result<List<String>>       // entry names found in a jar or a directory: the two provider/binding paths, also under META-INF/versions/<n>/
    fun barredBy(coordinates: String, barred: Set<String>): String?   // "group:module:version" -> the matching "group:module", or null
    fun scan(file: File, coordinates: String?, barred: Set<String>): Result<List<String>>  // finding lines; empty = clean; failure = unreadable input
}
```
A finding line is `"<file name> (<coordinates or 'no module coordinates'>): <rule>"` where the rule is `holds META-INF/services/org.slf4j.spi.SLF4JServiceProvider`, `holds org/slf4j/impl/StaticLoggerBinder.class`
or `is the barred module <group:module>`.

**`src/main/kotlin/VerifyNoLoggingBackend.kt`** — new typed task: `@get:Classpath files: ConfigurableFileCollection`, `@get:Input
coordinates: MapProperty<String, String>` (file name → `group:module:version`), `@get:Input barredModules: SetProperty<String>` (convention
`LoggingBackendScan.DEFAULT_BARRED_MODULES`), `@get:OutputFile report: RegularFileProperty`, `@TaskAction verify()`. Unwraps each
`LoggingBackendScan.scan` with `getOrElse { throw GradleException("$path: cannot read $file: …", it) }`; throws `GradleException` listing the
findings (at most 20, then a count) and the fix; passes on empty `files`; writes
`build/reports/logging-backend/verifyNoLoggingBackend.txt` (one line: the artifacts checked) only on success.

**`src/main/kotlin/ReleasableMetadataScan.kt`** — new:
```kotlin
data class MetadataScan(val checkedVariants: Int, val violations: List<String>) {
    operator fun plus(other: MetadataScan): MetadataScan
    companion object { val EMPTY: MetadataScan }
}
object ReleasableMetadataScan {
    /** Reads one module.json: rules 1–4 of the design. A failure is an unreadable file, non-JSON, or no `variants` list. */
    fun scan(file: File, publishedVersion: String, strictEdges: Map<String, String>): Result<MetadataScan>
    /** Rule 5: null when [releaseTag] is null or equals the version after dropping a leading `v`; else the violation text. */
    fun tagViolation(releaseTag: String?, publishedVersion: String): String?
}
```
Parsing: Groovy's `JsonSlurper` (from `gradleApi()`), as WebTools' scan does. Library variants: `attributes["org.gradle.category"] == "library"`.
Entries compared by `"$group:$module"`. `-SNAPSHOT` is looked for in `version.requires`, `version.strictly`, `version.prefers` of every entry of
`dependencies[]` and `dependencyConstraints[]` when `!publishedVersion.endsWith("-SNAPSHOT")`.

**`src/main/kotlin/VerifyReleasableMetadata.kt`** — new typed task: `@get:InputFiles @get:PathSensitive(NAME_ONLY) moduleMetadata:
ConfigurableFileCollection`, `@get:Input publishedVersion: Property<String>`, `@get:Input strictEdges: MapProperty<String, String>`,
`@get:Input @get:Optional releaseTag: Property<String>`, `@get:OutputFile report: RegularFileProperty`. `verify()`: deletes the report;
for each metadata file (sorted) unwraps `scan(...)` or throws `GradleException("$path: cannot read $file: …", cause)`; adds
`tagViolation`; throws when `checkedVariants == 0` ("no library variant to verify"); throws listing the violations (at most 20); writes
`verified <n> library variant(s) in <m> metadata file(s) at <version>` on success only. `registerVerifyReleasableMetadata(project)` sets
`publishedVersion` from `project.version.toString()` read once at registration (the plugin has set the version before it registers the task; a lambda
capturing `project` would not serialize), `strictEdges.empty()`, `releaseTag` from
`providers.gradleProperty("bottools.releaseTag")`, `moduleMetadata.from(project.tasks.withType(GenerateModuleMetadata::class.java))`.

**`src/main/kotlin/UmbrellaJarScan.kt`, `VerifyUmbrellaSourcesJar.kt`, `VerifyUmbrellaJavadocJar.kt`** — new. `UmbrellaJarScan.entries(archive:
File): Result<List<String>>` (jar entry names); `sources(entries, moduleSources): JarScan` and `javadoc(entries, moduleSources): JarScan` are
pure, over `moduleSources: Map<String, List<String>>` (module → its `.kt` paths relative to `src/main/kotlin`), `JarScan(val violations:
List<String>)`. Rules as in the design. The two tasks take `@get:InputFile archive`, `@get:Input modules: ListProperty<String>`, `@get:Internal rootDirectory: DirectoryProperty`
(the repository root), `@get:InputFiles @get:PathSensitive(RELATIVE) sourceFiles: ConfigurableFileCollection` (the union of every module's
`src/main/kotlin/**/*.kt` tree) and `@get:OutputFile report`. At execution each builds `moduleSources` (module → its `.kt` paths relative to
`<rootDirectory>/<module>/src/main/kotlin`) from `sourceFiles`, calls the pure scan, unwraps the `Result` and throws `GradleException`. The
umbrella script supplies the trees from the file system, never from another project's model, and a module's first source file changes the
inputs, so no configuration-cache entry goes stale.

**`src/main/kotlin/bottools.kotlin-library.gradle.kts`** — new:
```kotlin
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    id("org.jetbrains.kotlin.jvm")
    `java-library`
    id("org.jetbrains.kotlinx.binary-compatibility-validator")
    id("dev.detekt")
}

repositories { mavenCentral() }

kotlin {
    jvmToolchain(BotToolsBuild.JDK_TOOLCHAIN)
    explicitApi()
    compilerOptions {
        jvmTarget.set(JvmTarget.fromTarget(BotToolsBuild.JAVA_FLOOR.toString()))
        freeCompilerArgs.add("-Xjdk-release=${BotToolsBuild.JAVA_FLOOR}")
    }
}
java {
    sourceCompatibility = JavaVersion.toVersion(BotToolsBuild.JAVA_FLOOR)
    targetCompatibility = JavaVersion.toVersion(BotToolsBuild.JAVA_FLOOR)
}

apiValidation { nonPublicMarkers.add(BotToolsBuild.EXPERIMENTAL_MARKER) }

detekt {
    buildUponDefaultConfig = true
    config.setFrom(isolated.rootProject.projectDirectory.file("config/detekt/detekt.yml"))
}
// the plain `detekt` task, which the plugin joins to check, has no classpath and cannot run SuspendFunSwallowedCancellation
kotlin.target.compilations.configureEach {
    val detektTask = "detekt" + name.replaceFirstChar(Char::uppercaseChar)
    tasks.named("check") { dependsOn(detektTask) }
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:${BotToolsBuild.JUNIT_BOM_VERSION}"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation(kotlin("test-junit5"))
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    // logback is the tests' backend only; it must never reach a module's runtime classpath
    testRuntimeOnly("ch.qos.logback:logback-classic:${BotToolsBuild.LOGBACK_VERSION}")
}

tasks.withType<Test>().configureEach { useJUnitPlatform() }
BotToolsBuild.registerTestSetTasks(project, sourceSets["test"].output.classesDirs, sourceSets["test"].runtimeClasspath)
```
No `parallel`, no baseline. A Gradle property, not a script edit, would be needed to change the detekt config path: it is fixed.

**`src/main/kotlin/bottools.published-library.gradle.kts`** — new:
```kotlin
import com.vanniktech.maven.publish.JavadocJar
import com.vanniktech.maven.publish.KotlinJvm
import com.vanniktech.maven.publish.SourcesJar
import org.gradle.api.publish.maven.tasks.AbstractPublishToMaven

plugins {
    id("bottools.kotlin-library")
    id("org.jetbrains.dokka")
    id("com.vanniktech.maven.publish")
}

group = BotToolsBuild.GROUP
version = BotToolsBuild.VERSION

mavenPublishing {
    publishToMavenCentral()
    signAllPublications()                       // signing is skipped for a -SNAPSHOT version; releases are signed
    coordinates(BotToolsBuild.GROUP, project.name, BotToolsBuild.VERSION)
    configure(KotlinJvm(javadocJar = JavadocJar.Dokka(BotToolsBuild.DOKKA_PUBLICATION_TASK), sourcesJar = SourcesJar.Sources()))
    pom {   // inceptionYear 2026; url, scm: https://github.com/SpartanLaboratories/KotlinBottools; Apache-2.0; developer SpaSinghOut (as WebTools')
    }
}

dokka {
    pluginsConfiguration.html {
        val root = isolated.rootProject.projectDirectory
        customStyleSheets.from(root.file("docs/dokka/styles/dokka-styles.css"))
        customAssets.from(root.file("docs/brand/spartan-laboratories-logo.png"))
        footerMessage.set("&copy; 2026 Spartan Laboratories")
    }
    dokkaPublications.configureEach { failOnWarning.set(true) }
    dokkaSourceSets.configureEach {
        reportUndocumented.set(true)
        sourceLink {
            localDirectory.set(file("src/$name/kotlin"))
            remoteUrl("https://github.com/SpartanLaboratories/KotlinBottools/blob/main/${project.name}/src/$name/kotlin")
            remoteLineSuffix.set("#L")
        }
    }
}

val verifyJavaFloor = BotToolsBuild.registerVerifyJavaFloor(
    project,
    files(tasks.named<Jar>("jar").flatMap { it.archiveFile }),
    configurations.getByName("runtimeClasspath"),
    fileTree("src/main/kotlin"),
)
val verifyNoLoggingBackend = BotToolsBuild.registerVerifyNoLoggingBackend(project, configurations.getByName("runtimeClasspath"))
val verifyReleasableMetadata = BotToolsBuild.registerVerifyReleasableMetadata(project)

tasks.withType<AbstractPublishToMaven>().configureEach { dependsOn(verifyReleasableMetadata) }
tasks.named("check") {
    dependsOn(BotToolsBuild.DOKKA_PUBLICATION_TASK, verifyJavaFloor, verifyNoLoggingBackend, verifyReleasableMetadata)
}
```
`verifyJavaFloor` reads its `sources` tree at execution, so a module's first source file changes its inputs and no
configuration-cache entry goes stale. Failure behaviour is the tasks'.

### Modules

**`bottools-core/build.gradle.kts`** — new: `plugins { id("bottools.published-library") }`; `dependencies { api(libs.jda); api(libs.kotlinx.coroutines.core);
implementation(libs.jda.ktx) }`; `mavenPublishing { pom { name.set("BotTools core"); description.set("…") } }`. JDA is a plain `require` of 6.7.0, never a range.

**`bottools-core/src/main/kotlin/com/spartanlabs/bottools/annotation/SupportedExtension.kt`, `ExperimentalBotToolsApi.kt`** — new, as in
[the stability markers](#the-stability-markers). Signatures:
```kotlin
@MustBeDocumented
@Retention(AnnotationRetention.BINARY)
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY, AnnotationTarget.CONSTRUCTOR, AnnotationTarget.TYPEALIAS)
public annotation class SupportedExtension

@MustBeDocumented
@Retention(AnnotationRetention.BINARY)
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY, AnnotationTarget.CONSTRUCTOR, AnnotationTarget.TYPEALIAS)
@RequiresOptIn(level = RequiresOptIn.Level.ERROR, message = "This declaration is Experimental: it may change incompatibly in a feature release until it graduates.")
public annotation class ExperimentalBotToolsApi
```
Neither throws nor returns; both have full KDoc (the Dokka gate fails on a missing one). Level-1 documentation: in-editor navigation (the KDoc names the tiers and the opt-in), KDoc API contract.

**`bottools-core/api/bottools-core.api`** — new, written by `apiDump`: exactly the two `public abstract interface annotation class … : java/lang/annotation/Annotation` entries.

**`bottools-data-sqlite/build.gradle.kts`** — `plugins { id("bottools.published-library") }`, `dependencies { api(project(":bottools-core")) }`, a POM name and description. No source.
**`bottools-http/build.gradle.kts`** — the same, `api(project(":bottools-core"))`. **`bottools-stats/build.gradle.kts`** — `plugins { id("bottools.published-library");
id("org.jetbrains.kotlin.plugin.serialization") }`, `api(project(":bottools-core"))`, `api(project(":bottools-http"))`,
`implementation(libs.kotlinx.serialization.json)`. **`bottools-plugins/build.gradle.kts`** — `api(project(":bottools-core"))`, `api(project(":bottools-http"))`.
Each of the four modules except stats has no `src/` directory at all; each of the five has `api/<module>.api` (zero bytes for the four).

**`bottools-core/src/test/kotlin/…` and `bottools-stats/src/test/kotlin/…`** — the tests named in the [Test plan](#test-plan).

**`bottools/build.gradle.kts`** — new:
```kotlin
plugins { id("bottools.published-library") }

val pin = version.toString()                      // the one version every pin and the metadata check read
val reexportedModuleSources: Configuration = configurations.create("reexportedModuleSources") {
    isCanBeConsumed = false; isCanBeResolved = true; isTransitive = false
}
dependencies {
    BotToolsBuild.FEATURE_MODULES.forEach { m ->
        api(project(":$m"))
        constraints { api("${BotToolsBuild.GROUP}:$m") { version { strictly(pin) } } }   // published in dependencyConstraints[]
        reexportedModuleSources(project(path = ":$m", configuration = "sourcesElements"))
        dokka(project(":$m"))
    }
}
dokka { dokkaSourceSets.configureEach { suppress.set(true) } }      // the umbrella has no API of its own

tasks.named<VerifyReleasableMetadata>(BotToolsBuild.VERIFY_RELEASABLE_METADATA_TASK) {
    strictEdges.putAll(BotToolsBuild.FEATURE_MODULES.associate { "${BotToolsBuild.GROUP}:$it" to pin })
}
tasks.named<Jar>("sourcesJar") {
    dependsOn(reexportedModuleSources)
    from(provider { reexportedModuleSources.files.map(::zipTree) })
    exclude("META-INF/**"); duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}
// the two guards: typed tasks from build-logic, expectations from each module's real source files (see the design)
// … register VerifyUmbrellaSourcesJar (archive = sourcesJar) and VerifyUmbrellaJavadocJar (archive = dokkaJavadocJar), both in `check`
mavenPublishing { pom { name.set("BotTools"); description.set("Umbrella: re-exports every BotTools module.") } }
```
`dokkaJavadocJar` is fetched as `org.gradle.jvm.tasks.Jar` (vanniktech's `JavadocJar` extends it, not the narrower bundling `Jar`). `mavenLocal()`
is not among the repositories: a version mismatch between pin and project would otherwise take a published binary silently.

**`bottools/api/bottools.api`** — a zero-byte file.

### Workflows

**`.github/workflows/ci.yml`** — new:
```yaml
name: CI

# The three jobs below are required checks of the ruleset on main, by these exact names. Rename one only together with the
# ruleset. None has a paths filter or an `if:`: a skipped workflow leaves its required checks pending, and a skipped job reports success.
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:       # for debugging only: a run started on demand never satisfies a required check

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}

permissions:
  contents: read

jobs:
  build:
    name: Build (gradlew build)
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      # actions/checkout v7.0.1
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
        with:
          persist-credentials: false
      # actions/setup-java v6.3.0
      - uses: actions/setup-java@d1374f8ac74474200d16ef8ecee22c7ae7a51880
        with:
          distribution: temurin
          java-version: "21"
      # gradle/actions v5.0.2 (MIT; v6 bundles a separately licensed caching component). Validates the wrapper jar by default.
      - uses: gradle/actions/setup-gradle@0723195856401067f7a2779048b490ace7a47d7c
      - run: ./gradlew build --stacktrace
      - name: Publish to Maven Local
        run: ./gradlew publishToMavenLocal --stacktrace
      - name: Check the six published artifacts
        run: |
          set -euo pipefail
          base="$HOME/.m2/repository/io/github/spartanlaboratories"
          ver="$(ls "$base/bottools")"                          # the version folder: the build's own version, not a copy of it here
          test "$(echo "$ver" | wc -l)" -eq 1
          for m in bottools bottools-core bottools-data-sqlite bottools-http bottools-stats bottools-plugins; do
            for suffix in .jar -sources.jar -javadoc.jar .pom .module; do
              test -f "$base/$m/$ver/$m-$ver$suffix" || { echo "::error::missing $m$suffix"; exit 1; }
            done
          done
      # actions/upload-artifact v7.0.2
      - if: failure()
        uses: actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9
        with:
          name: build-reports
          path: |
            */build/reports/
            build/reports/

  docs:
    name: API docs (Dokka)
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      # checkout, setup-java, setup-gradle as above
      - run: ./gradlew dokkaGeneratePublicationHtml --stacktrace

  build-logic:
    name: build-logic (TestKit)
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      # checkout, setup-java, setup-gradle as above
      # build-logic is an included build: ./gradlew build does not run its own tests, so this job does.
      - run: ./gradlew -p build-logic test integrationTest e2eTest nonfunctionalTest --stacktrace
      - if: failure()
        uses: actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9
        with:
          name: build-logic-reports
          path: build-logic/build/reports/tests/
```
The implementer writes each job's three setup steps out in full (the comments stand for the same three pinned steps). `publishToMavenLocal`
on the runner needs no key: signing is skipped at a `-SNAPSHOT` version.

**`.github/workflows/pages.yml`** — new:
```yaml
name: Pages

# Publishes website/ with the aggregated Dokka reference at /api/. The repository's Pages source is GitHub Actions, set once before
# the first deployment:
#   gh api -X POST repos/SpartanLaboratories/KotlinBottools/pages -f build_type=workflow
on:
  push:
    branches: [main]
  workflow_dispatch:

# A cancelled deployment can leave the site out of date, so deployments never cancel one another.
concurrency:
  group: pages
  cancel-in-progress: false

# The Gradle-running job holds no deploy token: the Pages scopes are on the deploy job only.
permissions:
  contents: read

jobs:
  build:
    name: Build site
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      # checkout (persist-credentials: false), setup-java 21 (temurin), setup-gradle: the pinned steps of ci.yml
      - run: ./gradlew dokkaGeneratePublicationHtml verifyDocsAggregate --stacktrace
      - name: Assemble _site
        run: |
          set -euo pipefail
          rm -rf _site; mkdir -p _site
          cp -R website/. _site/
          rm -f _site/README.md                       # notes for maintainers, not part of the site
          mkdir -p _site/assets/brand
          cp -R docs/brand/. _site/assets/brand/
          docs="build/dokka/html"
          if [ ! -f "$docs/index.html" ]; then
            echo "::error::No Dokka output found - expected build/dokka/html/index.html"
            exit 1
          fi
          cp -R "$docs" _site/api
          touch _site/.nojekyll                       # Dokka writes names that start with an underscore
      # actions/upload-pages-artifact v5.0.0
      - uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9
        with:
          path: _site
          include-hidden-files: true                  # since v4 the artifact drops dotfiles; .nojekyll must ship

  deploy:
    name: Deploy to GitHub Pages
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      # actions/deploy-pages v5.0.1
      - id: deployment
        uses: actions/deploy-pages@368f82528645a54fb793d4d04e342629a3f51346
```

**`.github/workflows/release.yml`** — new:
```yaml
name: Release

# Verify only. It builds the tagged commit from a clean checkout and checks the release metadata; it creates nothing. A release is made
# by hand from the merged default branch, and that release process itself pushes the tag and creates the GitHub release.
on:
  push:
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+'
      - '[0-9]+.[0-9]+.[0-9]+'
      - 'v[0-9]+.[0-9]+.[0-9]+[a-z]'       # the lettered bug-fix forms of the organisation's version scheme
      - '[0-9]+.[0-9]+.[0-9]+[a-z]'

permissions:
  contents: read

jobs:
  verify:
    name: Verify tagged build
    runs-on: ubuntu-latest
    timeout-minutes: 45
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1          # v7.0.1
        with:
          persist-credentials: false
      - name: Check the tag name
        env:
          TAG: ${{ github.ref_name }}      # attacker-influenced text: through env, never inline
        run: |
          set -euo pipefail
          [[ "$TAG" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+[a-z]?$ ]] || { echo "::error::not a version tag"; exit 1; }
      # setup-java 21 (temurin) and setup-gradle: the pinned steps of ci.yml
      - name: Build and verify the release metadata
        env:
          TAG: ${{ github.ref_name }}
        run: ./gradlew build verifyReleasableMetadata "-Pbottools.releaseTag=$TAG" --stacktrace
```
The quotes around each glob are required (a bare scalar beginning with `[` is a YAML flow sequence). A push that creates both `vX.Y.Z` and bare
`X.Y.Z` runs the workflow twice; more than three tags pushed at once create no event. The build step's `-P` carries the tag to the
check, which fails when the tag and the build's version disagree.

### The project site

**`website/index.html`** — hand-written. Sections: header with the logo (`assets/brand/spartan-laboratories-logo.png`) and nav (Libraries, API
reference, GitHub); a hero stating that BotTools is a Kotlin library for Discord bots on JDA, pre-release (`1.0.0-SNAPSHOT`, nothing
published yet); the six artifacts with one line each (the coordinates `io.github.spartanlaboratories:<artifact>`, labelled "planned
coordinates"); a "Build status" strip linking the CI workflow badge; a link to `api/`; licence Apache-2.0. `<title>`, description, canonical
`https://spartanlaboratories.github.io/KotlinBottools/`, Open Graph tags as WebTools' page has. No install snippet, no claim about Maven
Central. Every relative link target exists under `website/`, or is `api/` or `assets/brand/…`, which `pages.yml` supplies.

**`website/404.html`, `website/assets/styles.css`, `website/assets/site.js`, `website/assets/favicon.svg`** — copied from WebTools at `d68ec81e…`;
only the 404 page's text names BotTools. **`website/robots.txt`**: `User-agent: *`, `Allow: /`, `Sitemap: https://spartanlaboratories.github.io/KotlinBottools/sitemap.xml`.
**`website/sitemap.xml`**: the root page and `api/`. **`website/README.md`**: how the site is assembled (`pages.yml`), that it is not published, where the
brand assets come from.

### Repository files

**`LICENSE`** — copied from MyGameTools at `46697c15…` (11,351 bytes there; the Apache License 2.0 text, the appendix ending with
"Copyright 2026 Spartan Laboratories"). `.gitattributes`'s `text=auto` normalises line endings.

**`CONTRIBUTING.md`** — new. Sections and content:
- *Opening:* BotTools follows the organisation's [contributing guide](https://github.com/SpartanLaboratories/.github/blob/main/CONTRIBUTING.md) (issues,
  branching, Conventional Commits, pull requests, merge commits, versioning, deployment environments); this file adds what is specific here.
- *Coding rules:* the organisation's policy and design manifesto; test packages `com.spartanlabs.testing.<set>.bottools.*`; the Experimental tier's opt-in
  marker is `@ExperimentalBotToolsApi`, the Supported Extension tier's `@SupportedExtension`; every public declaration has KDoc (Dokka fails on a missing one);
  a library module declares no logging backend (`verifyNoLoggingBackend`).
- *Module layout:* the table of the six artifacts (directory, coordinate, package root, contents today, depends on); module directories equal artifact ids;
  shared build configuration lives in `build-logic/` (`bottools.kotlin-library`, `bottools.published-library`); a new module is added by a directory, a line in
  `settings.gradle.kts`, a `plugins {}` block and a POM name and description; the zero-byte ABI dump and the first declaration's `apiDump` review.
  `legacy/` holds the 7.x sources, is unbuilt and goes in Phase 17.
- *Commit scopes:* `core`, `sqlite`, `http`, `stats`, `plugins`, `umbrella`, `build`, `ci`, `site`, `scan`, `legacy`, `docs`, `deps`, `release` — for example
  `feat(core): add the command tree`. Branch names follow the organisation guide.
- *Build and test commands:* a table: `./gradlew build` (everything below, every module); `./gradlew gatingTest componentTest deterministicTest` (fast, run
  before every push); `./gradlew integrationTest e2eTest nonfunctionalTest uatTest`; `./gradlew test` (every set); `./gradlew dokkaGeneratePublicationHtml`
  (API docs, fails on an undocumented declaration or a broken KDoc link); `./gradlew apiDump` (after an intended API change; review the diff);
  `./gradlew verifyReleasableMetadata`; `./gradlew publishToMavenLocal -Dmaven.repo.local=<folder>` (no signing key needed at a snapshot version);
  `./gradlew -p build-logic test integrationTest e2eTest nonfunctionalTest` (the included build's own tests, which `build` does not run). Requires a JDK 21 or newer
  to run Gradle; the toolchain and the Java floor are both 21. A note: the build-logic nested tests need the network on their first run.
- *Publishing:* by hand from the merged default branch with `./gradlew publishAndReleaseToMavenCentral`, with the Central credentials and a signing key as Gradle
  properties, never committed; the release process itself pushes the tag and creates the GitHub release; `release.yml` only verifies the tagged commit; the
  first snapshot waits for the namespace's snapshots switch.
- *Versioning (three sentences):* "BotTools follows the organization's [versioning standard](https://github.com/SpartanLaboratories/.github/blob/main/policy/version/README.md).
  The version lives in `BotToolsBuild.VERSION` in `build-logic/src/main/kotlin/BotToolsBuild.kt`; the build sets it on every module. The six artifacts
  (`bottools-core`, `bottools-data-sqlite`, `bottools-http`, `bottools-stats`, `bottools-plugins` and `bottools`) share it." Nothing more.

**`README.md`** — replaced by:
```markdown
# KotlinBottools

BotTools: a Kotlin library for Discord bots, built on [JDA](https://github.com/discord-jda/JDA). It is **pre-release**: the build is
`1.0.0-SNAPSHOT` and nothing is published yet.

## Artifacts

Six artifacts under `io.github.spartanlaboratories`, one version:

| Artifact | Contents |
|---|---|
| `bottools-core` | the command model, bot runtime, storage ports and the stability markers |
| `bottools-data-sqlite` | the SQLite storage implementation |
| `bottools-http` | the outbound HTTP call surface |
| `bottools-stats` | the game-statistics framework |
| `bottools-plugins` | the built-in plugins |
| `bottools` | the umbrella: re-exports the five |

This describes the planned shape; each module's code arrives phase by phase ([roadmap](docs/plans/1-bottools-consolidation/roadmap.md)). Today
`bottools-core` holds the two stability markers, `@SupportedExtension` and `@ExperimentalBotToolsApi`.

## The old framework

The 7.x framework this repository used to hold is in [`legacy/`](legacy/). It is not built, tested or documented, and it is deleted in
Phase 17 ([#16](https://github.com/SpartanLaboratories/KotlinBottools/issues/16)). Do not build on it.

## Build

JDK 21 or newer runs Gradle; the toolchain and the Java floor are 21.

    ./gradlew build

See [CONTRIBUTING.md](CONTRIBUTING.md) for the commands, the module layout and publishing. Every push and pull request to `main` runs the
`Secret scan` workflow (`.github/workflows/secret-scan.yml`), which scans the full history and the working tree with gitleaks and the
rules in `.gitleaks.toml`, and the `CI` workflow.

## Documentation

- [Project site](https://spartanlaboratories.github.io/KotlinBottools/) and its [API reference](https://spartanlaboratories.github.io/KotlinBottools/api/)
- [`docs/dashboards/`](docs/dashboards/index.html): the state boards
- [`docs/plans/`](docs/plans/index.html): the plans and the work boards

## License

Apache-2.0. See [LICENSE](LICENSE).
```
The stub is replaced by the full rewrite at `1.0.0`.

**`CHANGELOG.md`** — the header gains, after the Keep a Changelog sentence: "This repository follows the organization's [versioning
standard](https://github.com/SpartanLaboratories/.github/blob/main/policy/version/README.md): `Major.Feature.MinorChange`, with an optional trailing letter for
a bug fix." The hygiene entry's "Its log shows counts by rule id only." becomes "Its log shows counts, rule ids, exit statuses and fixed markers only,
and never a path, a match or a secret." Under `## [Unreleased]`:
- *Added:* the six-artifact multi-module build (`bottools-core`, `bottools-data-sqlite`, `bottools-http`, `bottools-stats`, `bottools-plugins` and the `bottools`
  umbrella) at `1.0.0-SNAPSHOT`, with the `build-logic` convention plugins `bottools.kotlin-library` and `bottools.published-library`; the stability markers
  `@SupportedExtension` and `@ExperimentalBotToolsApi`; a JDK 21 toolchain with a Java floor of 21 and `verifyJavaFloor`; explicit API mode, Dokka with
  `reportUndocumented` and `failOnWarning`, the binary-compatibility validator, and detekt with `SuspendFunSwallowedCancellation` on the type-resolving tasks;
  the seven test-set tasks; `verifyNoLoggingBackend` and `verifyReleasableMetadata`, and the umbrella's strict pins on its five modules; the `CI`, `Pages` and
  `Release` workflows; the project site; `CONTRIBUTING.md` and `LICENSE`; compile-level checks of JDA 6.7.0 with jda-ktx 0.14.2 and of kotlinx-serialization 1.9.0.
- *Changed:* the build moves to Gradle 9.7.1 and Kotlin 2.2.21, with JDA 6.7.0, jda-ktx 0.14.2 and kotlinx-coroutines 1.10.2 pinned as one set; the README is a stub
  until `1.0.0`; the version line of the 7.x framework (`7.5-SNAPSHOT`) ends with no further release, and its sources move, unbuilt, to `legacy/` until Phase 17.
- *Removed:* the 7.x build: its build files, its `application` entry point and its dependencies, the logging backend among them.

### The CI files, `.gitignore`

Edits per [the CI files' follow-ups](#the-ci-files-follow-ups): `.github/scripts/secret_scan.py`, `.github/scripts/allowlist_controls.py`,
`.github/workflows/secret-scan.yml`, `.gitignore` (the comment and the `__pycache__/` pattern). The CHANGELOG records them under *Changed* in one line:
"Comments, docstrings and message text of the secret-scan files corrected; `__pycache__/` ignored. No scan behaviour changed."

---

## Documentation impact

The standard is the organisation's four documentation levels (`policy/documentation/README.md` in `SpartanLaboratories/.github`).

| Level | What this change touches |
|---|---|
| 1, inline | **In-editor navigation:** `//region` groups in the convention plugins and in `BotToolsBuild`; imports grouped as the organisation's commenting rule sets out. **API contracts:** KDoc, with `@param`, `@return` and `@throws`, on every public declaration of `bottools-core` (the two markers) and on every public or `internal` top-level declaration of `build-logic` (`BotToolsBuild`, `TestSet`, the scans, the tasks); the Dokka gate fails on a missing one in the modules. **System integration:** the KDoc and comments of the build's boundaries: the published Gradle Module Metadata (what `verifyReleasableMetadata` reads, and that the POM carries no `strictly`), the Maven Local and Central publication, the workflows' trigger and permission contracts. **System topology:** the convention plugins' header comments (what each applies and sets, what a module adds) and the root script's comment on the Dokka plugin classloader. **Line comments:** the reason beside each non-obvious setting (`-Xjdk-release`, the by-name `detekt<Compilation>` dependency, the `strictly` constraint beside the project edge, the tag globs and their quotes, `include-hidden-files`). |
| 2, the API reference | Dokka generates it in this change for the first time: per module, aggregated at the root, shipped as each module's javadoc jar and served at `/api/` |
| 3, hand-written documents | `README.md` (stub), `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, the site's landing page, this plan, the unit's `consequences.md` and `final-implementation.md`, and the dated callouts below |
| 4, boards | the state boards under `docs/dashboards/` and the issue's work boards are regenerated by the run's document step, not edited by hand; the boards' uncommitted files in the working tree are not part of this change's commits |

**README currency.** This change adds modules, a build, commands, workflows and a dependency set, so the same change replaces the
README (S11). It is a stub; the full rewrite is `1.0.0`'s (Phase 17).

**Documents that move with the change:**

- The dated callouts on the parent architecture (S14), written outside this file, one per place:
  - §1.1 "Platform": a Java floor of 21, set apart from the toolchain, guarded by `verifyJavaFloor`.
  - §1.1 "Conventions":
    - library code logs through kotlin-logging under the organisation's logging policy (internal, never in a public signature, no backend),
      not "the slf4j API only";
    - the tests follow the organisation's seven test sets, each with its task, in place of "the five-level test hierarchy".
  - §5.4's `slf4j-api` row: `io.github.oshai:kotlin-logging-jvm` 8.0.7 and `org.slf4j:slf4j-api` 2.0.19, both `implementation` (kotlin-logging brings
    no slf4j-api), neither in a public signature, neither `strictly`. The `logback-classic` row: 1.6.7, `testRuntimeOnly`.
  - §9:
    - "Logging events": logged through kotlin-logging's API, not slf4j's fluent API, with the same event names and rules;
    - "Testing by level": seven tasks, `gatingTest` … `uatTest`.

  The Build row of §5.4 needs none: Kotlin Gradle plugin 2.2.21 is a 2.2.x, Dokka stays 2.2.0, and detekt carries no version there.
- The dated callout on the parent `consequences.md` §1: the old code leaves `main` in Phase 17, from `legacy/`.
- The dated notes that mark closed the Phase 0 follow-ups this change closes. They are written with the build's record, before the landing
  ([S14](#s14--the-parent-documents)).
- This folder's `consequences.md`: the blast radius (the repository settings, the new required checks, `legacy/`, the new binary logo, MagicBot and
  WebTools adoption), the outcome of this plan's assumptions, and the follow-ups below.
- The two folded-in issues' documents, which link back here: [`29-dokka-and-project-site/`](29-dokka-and-project-site/plan.md) and
  [`33-logging-backend/`](33-logging-backend/plan.md). #29's text says to check the organisation's standard when it is planned, because
  `SpartanLaboratories/.github` #6 is expected to change it; read at planning time, the standard already asks for `failOnWarning` on every Dokka
  configuration, which this plan sets, so nothing here waits for that issue.
- `docs/plans/board.json` and the other boards: untouched by hand.

---

## Test plan

Sets and packages as in [the test sets](#the-test-sets-and-their-tasks). One test class per file, JUnit 5; component tests mock external calls (here: none
exists, so no MockK). Production tests run in the module's `test`; `build-logic`'s tests run by `./gradlew -p build-logic …`, as S5 and the `build-logic
(TestKit)` job do. `<bl>` below is `build-logic/src/test/kotlin/com/spartanlabs/testing`, and a test's package is its path.

### Production modules

| Set | Path | Behaviours it locks down |
|---|---|---|
| component | `bottools-core/src/test/kotlin/com/spartanlabs/testing/component/bottools/annotation/SupportedExtensionTest.kt` | applies to a class, function, property, constructor and type alias (compiles and runs); carries `@MustBeDocumented` (the JVM `Documented` annotation is present); binary retention (the JVM `Retention` is `CLASS`, and a use is invisible at runtime); declares no members; its class file holds no `RequiresOptIn` constant (no opt-in gate); its JVM targets include `TYPE`, `METHOD` and `CONSTRUCTOR` |
| component | `bottools-core/src/test/kotlin/com/spartanlabs/testing/component/bottools/annotation/ExperimentalBotToolsApiTest.kt` | the same facts, and: its class file's constant pool holds `kotlin/RequiresOptIn` and `ERROR` and not `WARNING` (the opt-in level is `ERROR`, which runtime reflection cannot show: the test reads the class bytes as text); its `java.name` equals `com.spartanlabs.bottools.annotation.ExperimentalBotToolsApi`, the literal `BotToolsBuild.EXPERIMENTAL_MARKER` holds |
| integration | `bottools-core/src/test/kotlin/com/spartanlabs/testing/integration/bottools/linkage/JdaKtxLinkageTest.kt` | `RestAction<*>.await()` and `JDABuilder.injectKTX()` resolve and compile against JDA 6.7.0; jda-ktx's `CoroutineEventManager` loads and implements JDA's `IEventManager` at run time; `JDAInfo.VERSION` starts with `6.7.0`; kotlinx-coroutines 1.10.2 is the version on the test classpath (`kotlinx.coroutines.CoroutineScope` loads, and the jar's `Implementation-Version` or the resolved artifact name says 1.10.2) |
| integration | `bottools-stats/src/test/kotlin/com/spartanlabs/testing/integration/bottools/linkage/SerializationLinkageTest.kt` | a private `@Serializable` probe (`id: Long`, `name: String`) encodes to exactly `{"id":7,"name":"probe"}` and decodes back equal, so kotlinx-serialization-json 1.9.0 and the compiler plugin at the Kotlin version work together |

The linkage tests have no production counterpart, so their package is `…integration.bottools.linkage`. `bottools-data-sqlite`, `bottools-http`, `bottools-plugins` and
the umbrella have no test source: Gradle 9 fails `test` for test sources with no discovered test.

### `build-logic`

| Set | Path (under `<bl>/<set>/bottools/buildlogic/`) | Behaviours |
|---|---|---|
| gating | `gating/…/RootScriptsAgreementGatingTest.kt` | the root settings' `pluginManagement.plugins` versions of Kotlin JVM, the serialization plugin and Dokka equal the marker dependencies in `build-logic/build.gradle.kts`; the settings' `include` list equals `BotToolsBuild.FEATURE_MODULES` plus `:bottools`; the root script's `dokka(project(...))` modules equal `FEATURE_MODULES` and its `featureModules` literal equals it; each module directory exists and equals its artifact id; every module build file applies `bottools.published-library`; the catalog's versions are the four of the design; `BotToolsBuild.EXPERIMENTAL_MARKER` names an existing file and package; `config/detekt/detekt.yml` activates the rule |
| gating | `gating/…/BuildLogicPluginsGatingTest.kt` | both convention plugin ids exist as files; `bottools.published-library` applies `bottools.kotlin-library`; the build identity is `bottools-build-logic` |
| gating | `gating/…/WorkflowsAgreementGatingTest.kt` | `ci.yml` holds the jobs named `Build (gradlew build)`, `API docs (Dokka)` and `build-logic (TestKit)`, and `secret-scan.yml` holds `Secret scan (gitleaks)`; no job name, workflow name or concurrency group is shared across the four files; `ci.yml` has no `paths:`, no job-level `if:`; every `uses:` is a 40-hex commit and the six commits of the plan's table are the only ones; `release.yml` holds no `write` permission, the four tag globs and no `branches:`; `pages.yml` grants `contents: read` at the workflow and `pages: write` and `id-token: write` only inside the deploy job, `cancel-in-progress: false`, `include-hidden-files: true` |
| component | `component/…/BotToolsBuildComponentTest.kt` | `registerTestSetTasks` registers seven `Test` tasks named `gatingTest` … `uatTest`, group `verification`, on the JUnit Platform, each filtered by its package pattern with `isFailOnNoMatchingTests` false; a second registration throws `InvalidUserDataException`; `TestSet` rejects a blank id; the three `register…` helpers wire the inputs their tasks declare (metadata from every `GenerateModuleMetadata`, the runtime classpath, the sources) |
| component | `component/…/JavaFloorScanComponentTest.kt` | WebTools' behaviours: a class at the floor passes; above the floor fails naming the entry; `META-INF/versions/` ignored; a non-class `.class` fails; a variant at the floor passes, another version or none fails; documentation variants ignored; an unreadable file is a `Result` failure |
| component | `component/…/VerifyJavaFloorComponentTest.kt` | passes on a clean module and writes its one-line report; fails and writes none on a violation; **zero classes pass when `sources` is empty and fail when it is not**; no library variant fails in both cases; a stale report is deleted by a failing run |
| component | `component/…/LoggingBackendScanComponentTest.kt` | over generated jars: a slf4j 2 provider file and a slf4j 1 `StaticLoggerBinder.class` are found, also under `META-INF/versions/<n>/` and in a directory; slf4j-api, a bridge, a `log4j-to-slf4j`-shaped jar (log4j's own provider file) and a kotlin-logging-shaped jar are clean; every barred module is found by coordinates and no non-barred one; the version part is ignored by `barredBy`; an unreadable jar is a `Result` failure |
| component | `component/…/VerifyNoLoggingBackendComponentTest.kt` | an empty file collection passes and writes the report; a provider jar fails with the module, jar, coordinates, rule and the fix in the message; a barred coordinate with a clean jar fails; the report is written only on success |
| component | `component/…/ReleasableMetadataScanComponentTest.kt` | over JSON fixtures: strict edges in both library variants pass; a plain `requires` fails naming the variant and edge; a missing edge fails; the pin in `dependencyConstraints[]` or `dependencies[]` both count; an edge present in only one variant passes when its `strictly` is right; a `-SNAPSHOT` requirement at a non-snapshot version fails in either array; the same at a snapshot version passes; the sources variant (category `documentation`, runtime usage) is ignored; `component.version` other than the published version fails; no library variant counts zero; a non-JSON file is a `Result` failure; `tagViolation` accepts `v1.0.0` and `1.0.0` for `1.0.0`, `1.0.0a` for `1.0.0a`, rejects `1.0.0` for `1.0.1`, and null passes |
| component | `component/…/VerifyReleasableMetadataComponentTest.kt` | no metadata files fails ("nothing to check"); a clean file passes and writes the report; a violation fails and leaves no report; a release tag that disagrees fails; the edge map reaches the scan |
| component | `component/…/UmbrellaJarScanComponentTest.kt` | sources: every module `.kt` present passes; a missing one fails naming it; an unowned `.kt` fails; no `.kt` anywhere fails ("nothing to fold"); a module with no source is neither required nor an excuse. javadoc: `<module>/index.html` plus a further page per module with source passes; a missing module fails; only the two chrome pages fails; a module with no source adds no requirement |
| component | `component/…/VerifyUmbrellaJarsComponentTest.kt` | each task builds its module-to-sources map from `sourceFiles` and `rootDirectory`, calls the scan and unwraps it; an unreadable archive fails |
| deterministic | `deterministic/…/BotToolsBuildDeterministicTest.kt` | `classFileMajor(21)` is 65 and `classFileMajor(8)` 52; the seven set ids, task names and package patterns in order; `FEATURE_MODULES` is the five directory names; `JAVA_FLOOR` and `JDK_TOOLCHAIN` are 21 and are separate constants |
| integration | `integration/…/KotlinLibraryConventionIntegrationTest.kt` | in a generated module: main source without a visibility modifier fails `compileKotlin`; the compiled class has major 65; `check --dry-run` lists `:detektMain` and `:detektTest`; a module with no main source runs `compileKotlin` and `detektMain` as `NO-SOURCE`; JUnit 5 runs a test; logback is on the test runtime classpath and not on `runtimeClasspath` |
| integration | `integration/…/DetektSuspendFunSwallowedCancellationIntegrationTest.kt` | the seeded `suspend fun f() = runCatching { delay(1) }` fails `check` at `:detektMain` naming the rule, while `detekt` (plain) passes; the same file with the rule's compliant shape passes `check`; with `config/detekt/detekt.yml` absent the rule does not run (the test states it, so the config's role is proved) |
| integration | `integration/…/ApiValidationIntegrationTest.kt` | `apiCheck` fails before a dump exists ("Expected file with API declarations"); `apiDump` writes `api/<module>.api` (zero bytes for a module with no source); `apiCheck` then passes and `check` depends on it; a declaration marked `@ExperimentalBotToolsApi` leaves the dump while the marker class stays |
| integration | `integration/…/DokkaConventionIntegrationTest.kt` | an undocumented public class fails `dokkaGeneratePublicationHtml` and `check`; a broken KDoc link fails it; a missing theme file fails it (`NoSuchFileException`); the module's javadoc jar holds the Dokka output |
| integration | `integration/…/TestSetSelectionIntegrationTest.kt` | each of the seven tasks runs exactly the tests of its package and no others; a set with no test passes; `test` runs every set |
| integration | `integration/…/PublishedJvmVersionAttributeIntegrationTest.kt` | the published `module.json` declares `org.gradle.jvm.version` 21 on `apiElements` and `runtimeElements` |
| integration | `integration/…/LoggingBackendCheckIntegrationTest.kt` | a module with logback as `implementation` fails `check` at `:verifyNoLoggingBackend`; with it as `testRuntimeOnly` passes; with slf4j-api and kotlin-logging alone passes; with no dependency at all passes |
| integration | `integration/…/ReleasableMetadataIntegrationTest.kt` | in a generated umbrella-shaped build: the published `module.json` carries `strictly` in `dependencyConstraints[]` of both variants and a plain `requires` in `dependencies[]`; the POM shows no `strictly` and a `dependencyManagement` block; `verifyReleasableMetadata` passes; with the constraint declared as `require` it fails; at a release version with a `-SNAPSHOT` dependency it fails; `publishToMavenLocal` runs it first; `-Pbottools.releaseTag` mismatching the version fails |
| integration | `integration/…/UmbrellaJarsIntegrationTest.kt` | a generated umbrella with two modules holding source and one with none: both jar guards pass, and fail when a module's source file is removed from the sources jar |
| e2e | `e2e/…/DokkaAggregationEndToEndTest.kt` | the real root script's Dokka block and `verifyDocsAggregate` (read from the repository root) in a generated build: the aggregate holds `<module>/index.html` for a module with source; with the Kotlin plugin missing from the root classpath the build still succeeds under `failOnWarning` and `verifyDocsAggregate` fails; with no module source it fails |
| e2e | `e2e/…/IncludedBuildEndToEndTest.kt` | this `build-logic`'s sources included through `pluginManagement` in a generated build apply both plugins; a consumer build that includes the generated library build as a composite resolves `group:name` of the umbrella and every module to projects, ignoring a different requested version |
| e2e | `e2e/…/StrictPinConsumerEndToEndTest.kt` | two versions of a generated pinned library are published to a folder repository: the umbrella alone resolves; a plain request for the other version fails naming the strict constraint; a lower request resolves to the pin; the consumer's own `strictly` and `force` override it |
| e2e | `e2e/…/PublishToMavenLocalEndToEndTest.kt` | a generated multi-module build publishes every module to a scratch Maven Local with no signing key, each with `.jar`, `-sources.jar`, `-javadoc.jar`, `.pom`, `.module` and no `.asc`; `mavenLocal()` is not a repository of the generated build |
| nonfunctional | `nonfunctional/…/ConfigurationCacheReuseNonFunctionalTest.kt` | in a generated multi-module build, `check` and then `publishToMavenLocal` store a configuration-cache entry and the second run of each reuses it, with no cache problem reported (covers detekt, Dokka, the validator, vanniktech and the four `verify*` tasks) |

`<bl>/support/bottools/buildlogic/` holds the harness, adapted from WebTools': `ProjectWorkspace` (generated projects under
`build/testkit/projects`), `NestedBuild` (TestKit with the shared home `bottools.testkit.home`), `BuildLogicSource` (this build's sources, for a
generated composite), `SampleProject` and `ModuleSource` (generated modules), `JarClasses` (jars with chosen entries and class-file versions),
`ModuleMetadata` (JSON fixtures), `TestReports`.

**Not automated.** The hosted behaviour: whether GitHub parses the three workflow files, whether the four required checks satisfy the ruleset, the
GitHub Pages deployment and the live site (read in S15 and S16, once, from the runs); that a direct push to `main` is refused after P3 (no push is attempted); the
rendered look of the Dokka theme and of the landing page (a human reads `/api/` and the page once after the first deployment); the "Enable SNAPSHOTs" switch
and any real publish; the validator's and detekt's behaviour on dependency bumps beyond the pinned versions.

**The hygiene procedure's re-runs** are in S13; their expected results are stated there.

---

## Risks and edge cases

- **A pre-release detekt in `check`.** It adds nothing to a published artifact, so a bump can break only `check`; a bump goes with the seeded-violation test
  passing; known issues #9793, #9121 and #9297 do not apply to a clean CI run with `parallel` off and no ktlint wrapper. If a later alpha renames the rule or
  its config key, `DetektSuspendFunSwallowedCancellationIntegrationTest` is the test that goes red.
- **Dokka 2.2.0, not 2.3.0.** 2.3.0 fails a documented subclass whose superclass holds private members typed from an `implementation` dependency (the logger
  field of #4's classes will be that shape). Re-evaluate at the first Dokka release after 2.3.0, with the real modules and `failOnWarning` on.
- **Untested pairings.** vanniktech 0.37.0 states Gradle 9.6.0 as its newest tested release and Dokka states no maximum; both ran clean on 9.7.1 in the
  reproductions. A failure is fixed in the plugin that reports it.
- **Required-check coupling and flakiness.** Four required checks, no bypass actor: a flaky job blocks every merge until re-run, and a renamed job needs the
  ruleset edited first. `build-logic (TestKit)` runs nested Gradle builds that download on a cold cache (about 83 seconds on one host for WebTools'; the job's
  timeout is 60 minutes). `strict` makes every other merge cost a CI re-run.
- **`strictly` in published metadata.** Gradle documents it as a public commitment: a consumer that asks for a newer version of a pinned module gets a
  resolution failure and declares `strictly` itself until the pin moves. A composite consumer sees no conflict. Maven consumers see plain versions. The
  organisation's guide carries the explanation; this repository's documents do not repeat it.
- **A new binary.** `docs/brand/spartan-laboratories-logo.png` (324,247 bytes) is tracked beside the wrapper jar. The organisation's branding standard asks for it;
  the scan reads it in S13 and finds nothing; the Phase 0 exit criterion ("no binary except the Gradle wrapper jar") described the rewritten history and is not
  re-stated for new work.
- **`legacy/` stays in the tree.** Tools that index the whole repository (an IDE, the code graph) will see it; the build and the three per-module gates will not.
  It is dead weight until Phase 17.
- **Wrapper replacement.** The new `gradle-wrapper.jar` is validated on every CI run by `setup-gradle`'s default wrapper validation; a locally built jar that
  disagrees with the published checksums fails there.
- **Local setups.** The build needs a JDK of 17 or newer to start Gradle; the JDK 21 toolchain is provisioned by foojay when absent. `gradlew` must keep its
  executable bit (`git update-index --chmod=+x`), and `.gitattributes` normalises line endings.
- **Cross-repository impact.** MagicBot (#2) consumes this build by composite: module directories equal ids, the plugin sets `group` and `version`, and
  its included `build-logic` sits beside MagicBot's own in one composite without a clash. WebTools (#9's work) is untouched here. `SpartanLaboratories/.github` is untouched; its issue #6 is expected to change
  the Dokka standard in a direction this build already follows.
- **Concurrency and performance.** No task shares mutable state; every task input is a task property, so the configuration cache holds. `./gradlew build`
  on CI is dominated by Dokka per module and by detekt's type resolution; neither is measured here.
- **Failure modes of the settings.** If P3 is sent before a check has run on `main`, the ruleset waits for a context nothing reports and blocks every merge;
  S16's precondition read prevents it. If the GitHub Pages site does not exist when `pages.yml` first runs on `main`, the deploy job fails; P1 precedes the merge for
  that reason. If `github-pages` limits deployment to a branch other than `main`, the deploy job is refused; P1's read-back checks it.

---

## Version control

- **Branch:** `feat/issue-3-build-skeleton` (exists, cut from `main`). The change is a feature: `feat` for what adds capability, `build`, `refactor`, `docs` and
  `chore` where they fit. Scopes are the ones `CONTRIBUTING.md` defines. Every commit message ends with the attribution lines the run's instructions give.
- **Commit sequence**, each a coherent unit (the stage that produces it in parentheses). This plan document is committed in the first one:
  1. `build(build): move the Gradle wrapper to 9.7.1` — S1, and `plan.md` (this document).
  2. `refactor(legacy): move the 7.x sources under legacy/` — S2.
  3. `feat(build): add build-logic with the convention plugins, the check tasks and their tests` — S3 and S4.
  4. `feat(core): add the six-module build, the stability markers and the walking skeleton's checks` — S6 (settings, root, catalog, properties, detekt config, theme
     assets, the five modules, the markers, the linkage tests, the dumps).
  5. `feat(umbrella): add the bottools umbrella with its strict pins and jar guards` — S7.
  6. `feat(site): add the project site` — S9.
  7. `feat(ci): add the CI, Pages and Release workflows` — S10.
  8. `docs: add CONTRIBUTING, LICENSE, the README stub and the changelog entries` — S11.
  9. `docs(scan): correct the comments, docstrings and message text of the secret-scan files and ignore __pycache__` — S12.
  10. `docs: add the dated callouts on the architecture and the parent consequences` — S14, with this folder's `consequences.md` and the folded-in issues' plans.
- **Kept out of every commit:** the boards' uncommitted files (`docs/plans/board.js`, `board.json`, `index.html`, the Phase 0 boards' `dashboard.html`, `plan.js`,
  `plan.json`, and this folder's `dashboard.html`, `plan.js`, `plan.json`) belong to the boards and are committed with them, separately; any pre-existing
  working-tree change not listed here is flagged, not carried. `docs/plans/.live/` and `graphify-out/` are ignored by the checkout already.
- **Landing:** one pull request from the branch to `main`, merged with a merge commit; its body closes #3, #29 and #33 and never #1. The landing request
  carries the merge condition of [S15](#s15--the-landing): the four checks succeed on the pull request before the merge. The first `Pages` run is the merge's
  push to `main`, so P1 precedes it.
- **The version.** This change sets `1.0.0-SNAPSHOT` in `BotToolsBuild.VERSION` (the 7.x build said `7.5-SNAPSHOT`); the landing moves no further version,
  and its requests say so. The changelog entries stay under `## [Unreleased]`.
- **Nothing is tagged or published by this change.**

---

## Interfaces with sibling units

**`core-foundation` (#4) takes from this unit:**
- `bottools-core` with JDA 6.7.0 (`api`), kotlinx-coroutines 1.10.2 (`api`) and jda-ktx 0.14.2 (`implementation`) declared, its package root
  `com.spartanlabs.bottools.*`, and the two markers in `com.spartanlabs.bottools.annotation`.
- The conventions every module gets from `bottools.published-library`: explicit API mode, KDoc enforced by Dokka (`reportUndocumented`, `failOnWarning`), the
  validator with `@ExperimentalBotToolsApi` in `nonPublicMarkers` (the first declaration added to a zero-byte dump fails `apiCheck` until `apiDump` is run
  and the diff reviewed), detekt with `SuspendFunSwallowedCancellation` on `detektMain` and `detektTest` (so `suspendCatching` is written to rethrow
  `CancellationException` first or start with `ensureActive()`), the JDK 21 toolchain and the Java floor of 21.
- The seven test-set tasks and their packages `com.spartanlabs.testing.<set>.bottools.<production package>`, JUnit 5 and kotlin-test on the test classpath, and
  logback 1.6.7 as the tests' backend. MockK and `kotlinx-coroutines-test` are not declared: #4 adds each with the first test that needs it.
- **How a logging module declares logging:** add `kotlin-logging = "8.0.7"` (`io.github.oshai:kotlin-logging-jvm`) and `slf4j-api = "2.0.19"`
  (`org.slf4j:slf4j-api`) to `gradle/libs.versions.toml` and declare both `implementation`, never `api`, never `strictly`; kotlin-logging brings no
  slf4j-api, so each logging module declares both itself. No backend in any main configuration. `verifyNoLoggingBackend` fails a published module whose
  resolved runtime classpath carries one, naming the jar and the rule.
- `verifyNoLoggingBackend`, `verifyJavaFloor` and `verifyReleasableMetadata` on `check` for its module.

**`http-call-surface` (#8) takes:**
- The `bottools-http` module (directory = artifact id, `api(project(":bottools-core"))` declared, zero-byte dump, no source).
- Dokka and the ABI dump per module, as above; the module's check that its dump names no WebTools package is #8's (a task of the module, not of the
  convention).
- **The test-fixtures source set's place:** the convention does not apply `java-test-fixtures`. #8 applies it in `bottools-http/build.gradle.kts` and keeps the
  fixtures unpublished (it skips the fixtures variants of the `java` component); the convention's per-compilation wiring already makes `check` depend on
  `detektTestFixtures`, and `verifyReleasableMetadata` reads only library variants, so an unpublished fixtures variant changes nothing for the checks.

**`webtools-adapter` (#9) takes:**
- **`verifyReleasableMetadata`'s edge map:** `strictEdges: MapProperty<String,String>` (`group:module` → version), empty on the feature modules and set with five entries
  by the umbrella. #9 adds one entry on `bottools-http`: `tasks.named<VerifyReleasableMetadata>("verifyReleasableMetadata") { strictEdges.put("<webtools group:module>",
  "<version>") }`, and declares the strict pin so that `strictly` appears in `dependencies[]` or `dependencyConstraints[]` of the library variants where the edge
  appears (the check accepts either; an `implementation` edge appears only in `runtimeElements`, and the check requires the edge in at least one library variant and
  the pin in every variant that carries it).
- **`settings.gradle.kts` ready for the include:** `pluginManagement { includeBuild("build-logic") }`, the foojay resolver 1.0.0, the six `include`s. #9 adds the
  nested `../WebTools` include, its `-Dbottools.webtools.composite=false` switch, `webtools.ref`, the catalog pin and `build-logic`'s constraints and
  `verifyClasspathAlignment`.
- **The CI workflow it adds lanes to:** `ci.yml` with the three required jobs by fixed names; a new required lane needs the ruleset edited with it, and a lane that
  is not required needs no ruleset change. `ci.yml`'s conventions (pinned commits, `contents: read`, group `ci-${{ github.ref }}`) are the pattern.
- The `build-logic` identity `bottools-build-logic` and the composite behaviour the end-to-end test proves (a composite includes the umbrella and substitutes every module).

**MagicBot's skeleton (SpartanLaboratories/MagicBot#2) takes:**
- Module directories equal artifact ids, and `bottools.published-library` sets `group` `io.github.spartanlaboratories` and `version` `1.0.0-SNAPSHOT`, so Gradle's composite
  substitution matches `io.github.spartanlaboratories:bottools` and each module.
- An included build at `build-logic/` whose root project name is `bottools-build-logic`. Gradle identifies an included build by its path, so MagicBot's own
  `build-logic` needs no particular name to sit in the same composite. The root project name is `KotlinBottools`.
- No WebTools include yet (that is #9): a composite beside the library builds without a WebTools checkout until then.

**`release-1.0.0-and-archive` (#16) takes:**
- `release.yml`: verify only, on a pushed tag in either form (`vX.Y.Z`, `X.Y.Z`) and the lettered forms; it runs `build` and `verifyReleasableMetadata` with
  `-Pbottools.releaseTag`; it creates nothing and holds `contents: read`. The release process pushes the tag and creates the GitHub release by hand.
- `verifyReleasableMetadata` at a release version: every pin equals the version, no `-SNAPSHOT` in either array, the tag equals the version. Signing is on for a
  non-snapshot version (a key and the Central credentials are the release process's).
- **Where the version lives:** `BotToolsBuild.VERSION` in `build-logic/src/main/kotlin/BotToolsBuild.kt`; the release changes that line (the pins follow, as they read the
  project's own version) and moves `CHANGELOG.md`'s `[Unreleased]` entries under the new version heading.
- **Deleting `legacy/`** (`git rm -r legacy`), removing the README's `legacy/` paragraph and writing the full README; nothing else in the build refers to `legacy/`.

---

## Sequencing and follow-ups

**Order.** S1 to S16 in order. S1 and S2 touch nothing the others read except the wrapper; S3 to S5 can be built without any module; S6 and S7 need S3 and S4; S8
needs S7; S9 to S12 are independent of one another after S8; S13 needs S1 to S12 written in the working tree (its scratch clone carries the
working change set; nothing has to be committed first); S14 may run any time after S8; S15
needs S13 and S14; S16 needs S15's green `main`. Siblings: `core-foundation` (#4) starts after this unit lands; Phase 0's residual-report unit (#28) is not
touched.

**Left for later:**
- The first snapshot, after the namespace's "Enable SNAPSHOTs" switch (the maintainer's), by hand from a clean `main`.
- Re-evaluating Dokka 2.3.0 (or its successor) against the real modules under `failOnWarning`; moving detekt to a stable 2.x, or dropping the pre-release pin, with
  the seeded-violation test passing.
- The full README at `1.0.0`; deleting `legacy/` (Phase 17, #16).
- Optional repository hardening this change leaves open: `sha_pinning_required`, a Dependabot configuration for the six action pins, a required review count.
- A test of the ruleset's refusal of a direct push, if the maintainer wants one (it needs a push attempt, which no stage makes).
- MockK, `kotlinx-coroutines-test`, kotlin-logging and slf4j-api: #4.
- The WebTools composite and its checks: #9.

---

## Considerations

None.
