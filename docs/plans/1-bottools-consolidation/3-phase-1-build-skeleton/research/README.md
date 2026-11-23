# Phase 1 — Build skeleton: research

This file holds the questions this unit's plan rests on that need evidence from outside this repository, and the earlier
findings that already answer the others. Each new question is answered by its own findings file in this folder. The
verification of the claims those findings rest on, and the summary of what they establish, follow below.

**What is already established and not asked again.** The following findings are current: the versions they name are the
ones this build pins, and nothing newer contradicts them. They are cited instead of researched again.

| What the plan needs | Answered by |
|---|---|
| The one-line compile check in `bottools-core` that proves the JDA and jda-ktx pairing | [`../../research/jda-and-coroutine-bridge.md`](../../research/jda-and-coroutine-bridge.md) §6. The versions it checks are question 8's. |
| vanniktech's `coordinates()` against Gradle's `group` and `version`, and its signing rule: signing is not required for a `-SNAPSHOT` version | [`../../research/unreleased-build-consumption.md`](../../research/unreleased-build-consumption.md) §3 F3, F4 |
| The foojay resolver 1.0.0 that Gradle 9 needs | [`../../research/webtools-consumption.md`](../../research/webtools-consumption.md), claim WTC-35 |
| What `strictly` in a library costs a consumer, and Gradle ordering `1.0.0a` below `1.0.0` | the same file, §3 F5 and claim WTC-10 |
| Explicit API mode, the binary-compatibility validator's maintenance mode and `nonPublicMarkers`, Dokka's `reportUndocumented` with `failOnWarning`, and detekt's `SuspendFunSwallowedCancellation` being inactive by default | [`../../research/idiomatic-kotlin-api-shape.md`](../../research/idiomatic-kotlin-api-shape.md) §3 F7, F8. Where the Kotlin Gradle plugin's own ABI validation stands on Kotlin 2.5 is question 3's. |
| How the secret-scan workflow, its scan wrapper and its allowlist controls behave; this unit changes only their comments and message text | [`../../2-phase-0-history-rewrite/24-repository-hygiene/research/README.md`](../../2-phase-0-history-rewrite/24-repository-hygiene/research/README.md) |

**What is read directly in the plan, not researched.** The organisation's Java floor
([R-134 in `SpartanLaboratories/.github`](https://github.com/SpartanLaboratories/.github/blob/main/policy/build/jvm/java-floor.md))
names WebTools as its worked example: one constant sets the Kotlin `jvmTarget` and `-Xjdk-release`, the floor is published as
the `TargetJvmVersion` attribute, and a `verifyJavaFloor` task guards it in `check`. The plan takes that mechanism from
WebTools' `build-logic` as it stands. The library's floor is 21, the same release as its toolchain; the floor check's scan of
each module's runtime classpath is what guards the floors of its dependencies.

**The unit's blast radius needs no research.** It is surveyed directly in the plan: the build files the change replaces, the
tracked files under `src/` that move to an unbuilt `legacy/` folder (the path rules of `.gitleaks.toml` are anchored at the
root, or match file names that folder does not hold), the README and the changelog, the comment and message-text changes to the
three CI files, the ignore list, and the documents and boards that describe the build.

**The current state the questions start from.**

- **The build.** The repository carries the Gradle 9.7.1 wrapper, and the 7.x sources sit under an unbuilt `legacy/` folder. The
  root build files still describe the one 7.x module, at `7.5-SNAPSHOT` on Kotlin 2.1.10, a JDK 23 toolchain and JDA 5.6.1, with
  no convention plugins, no group, no documentation, ABI or static-analysis gate, and one test task.
- **The target.** Six artifacts under `io.github.spartanlaboratories` share one version, `1.0.0-SNAPSHOT`: `bottools-core`,
  `bottools-data-sqlite`, `bottools-http`, `bottools-stats`, `bottools-plugins` and the `bottools` umbrella. Each module directory
  equals its artifact id. `build-logic` is an included build applying `kotlin-dsl`, with the plugins it applies as dependencies;
  it holds the convention plugins `bottools.kotlin-library` and `bottools.published-library`, and the second sets `group` and
  `version`. The build runs on a JDK 21 toolchain with a Java floor of 21. It compiles with the Kotlin Gradle plugin 2.5.0-RC, at
  language and API version 2.5, and moves to Kotlin 2.5.0 when that is released.
- **The gates.** Every module compiles with `explicitApi()`. Dokka runs with `reportUndocumented` and `failOnWarning` on every
  configuration. The binary-compatibility validator runs in `check`, with the Experimental marker in `nonPublicMarkers`. detekt
  runs with `SuspendFunSwallowedCancellation` on. Each of the seven test sets has its own folder and task.
- **The modules' content.** In this unit, `bottools-core` holds the two stability markers, `@SupportedExtension` and
  `@ExperimentalBotToolsApi` (`@RequiresOptIn(level = ERROR)`, binary retention). The other four feature modules hold no main
  source yet, and the umbrella holds none at all.
- **The repository.** It is public. It has no GitHub Pages site, no ruleset and no branch protection, and squash and rebase merging are
  on. The only workflow is the secret scan, whose job is named `Secret scan (gitleaks)`.

---

## The questions

### 1. Which detekt release, run in which way, gives this build type-resolved analysis on the Kotlin Gradle plugin 2.5.0-RC, at language version 2.5, on Gradle 9.7.1?

`SuspendFunSwallowedCancellation` is one of the rules the build must run, and the library's failure model depends on it: no
library code may swallow a coroutine's cancellation. Whether the rule needs type resolution, and which detekt release runs
type-resolved analysis on this toolchain, decide how detekt is applied and how it is wired into `check`. The sources detekt
analyses are compiled at language and API version 2.5, and every module's classpath carries `kotlin-stdlib` 2.5.0-RC.

- **Options worth comparing.**
  - `dev.detekt` 2.0.0-alpha.6, with its type-resolving tasks (`detektMain`, `detektTest`).
  - A newer detekt 2.x release, if one is out.
  - detekt's analysis held at a lower language or API version than the build's, if its Gradle plugin allows that.
  - The newest detekt 1.23.x release, and detekt without type resolution, each only as far as the rule allows them.
- **Requirements an answer must meet.**
  - It runs on Gradle 9.7.1 on JDK 21, with the configuration cache usable, against sources the Kotlin Gradle plugin 2.5.0-RC
    compiles at language version 2.5. The answer states which Kotlin compiler detekt is built on, which language and API
    versions it accepts, and what it does when the project's are newer than its own compiler's: on a language version it knows
    only as a preview, on `kotlin-stdlib` 2.5.0-RC on the classpath (its metadata version, and any pre-release marking
    question 7 establishes), and on a source file that uses a language feature its compiler does not know.
  - Type resolution still sees the standard library there, so that `SuspendFunSwallowedCancellation` finds a
    `runCatching { … }` around a suspend call.
  - A convention plugin applies it to every module. It fails `check` on a finding, and nothing of detekt reaches a published
    module's classpath.
  - `SuspendFunSwallowedCancellation` is active, with the rest of the default rule set. The answer says where the configuration
    file lives, whether a new code base needs a baseline, and what detekt does on a module with no main source.
- **Evidence that would settle it.** detekt's release notes and changelogs; its Gradle plugin's documented compatibility and its
  source; issues on Kotlin 2.5 and on language versions newer than detekt's compiler; the rule's documentation; builds that run
  detekt on a Kotlin 2.5 pre-release today.
- **Findings file:** [`detekt-on-the-toolchain.md`](detekt-on-the-toolchain.md).

### 2. How does the umbrella publish a strict pin on each of its five modules, and how does a check read those pins back before any publish?

The organisation's versioning rule
([R-25, "Lettered versions in dependency graphs"](https://github.com/SpartanLaboratories/.github/blob/main/policy/version/README.md))
has a library pin a lettered version of another Spartan Labs artifact with Gradle's `strictly`, a multi-module library's umbrella
on its own modules included. The design pins every edge the library controls that way, because a bug fix may take a letter.

- **Options worth comparing.**
  - A dependency constraint by coordinates beside each project dependency, with a strict version.
  - A constraint on the project dependency itself, with a strict version.
  - The project dependencies alone, with the generated module metadata rewritten at publication.
  - Any further mechanism Gradle documents for publishing a strict version between modules of one build.
- **Requirements an answer must meet.**
  - The umbrella `bottools` re-exports the five modules as `api`, and all six share one version. Its published Gradle Module
    Metadata carries `strictly` equal to that version on each of the five edges.
  - Inside the build, the edges still resolve to the sibling projects, never to a repository. A build that includes this one as
    a composite still substitutes them.
  - `verifyReleasableMetadata` reads the generated metadata as task inputs, configuration-cache safe, and runs before every
    publish task, Maven Local included. It asserts the five strict edges, and it asserts that no dependency is a `-SNAPSHOT` only
    when the version being published is not one itself.
  - The answer says what the POM shows for each edge, and what Gradle does for a consumer whose graph also asks for another
    version of a strictly pinned module.
  - The answer covers the umbrella's sources and javadoc jars, which fold in its modules' content, and their guards, as
    MyGameTools' umbrella does it, on modules that hold little or no source yet.
  - The build compiles with the Kotlin Gradle plugin 2.5.0-RC. The answer says whether that plugin, against the 2.2 line, changes
    anything in the published variants, edges or constraints the check reads, and what the published metadata carries for
    `kotlin-stdlib` while the plugin is a release candidate, and how a check would tell a pre-release requirement of that kind
    (`-RC`, `-Beta`) apart from one of the organisation's lettered versions (`1.0.0a`).
- **Evidence that would settle it.** Gradle 9.7.1's user guide on dependency constraints, rich versions and publishing Gradle
  Module Metadata; Gradle's source for how project dependencies and constraints are mapped into published metadata; the Gradle
  Module Metadata specification; vanniktech's publication setup; the Kotlin Gradle plugin's release notes and source for what it
  adds to a JVM library's published variants; multi-module libraries that publish strict constraints between their own modules.
- **Findings file:** [`umbrella-strict-pins.md`](umbrella-strict-pins.md).

### 3. Which Dokka, publishing and API-validation versions does the build pin on the Kotlin Gradle plugin 2.5.0-RC, and how do the documentation, ABI and publishing gates behave on modules that have no source yet?

The design names Dokka 2.2.0, vanniktech 0.37.0 and the binary-compatibility validator 0.18.2. Dokka 2.3.0 is newer but has an
open regression under `failOnWarning` (issue 4620). The organisation's builds on this stack, MyGameTools and WebTools, build on the
Kotlin Gradle plugin 2.2.0 and Gradle 9.7.1. This build compiles with the Kotlin Gradle plugin 2.5.0-RC, at language and API
version 2.5, so each tool here meets sources at language version 2.5 and class files whose Kotlin metadata is 2.5.0. In this
unit, four of the five feature modules hold no main source yet.

- **Options worth comparing.**
  - Dokka 2.2.0, 2.3.0, or a later release.
  - vanniktech 0.37.0, or a later release.
  - The validator 0.18.2, or the Kotlin Gradle plugin's own ABI validation as it stands in 2.5.
  - For a module with no main source: no source at all, or one minimal declaration per module.
- **Requirements an answer must meet.**
  - Each tool works with the Kotlin Gradle plugin 2.5.0-RC. For each, the answer states the Kotlin version it is built on or
    reads, its stated compatibility, its known issues with Kotlin 2.5 pre-releases, and what it does with sources at language
    version 2.5 and with `kotlin-stdlib` 2.5.0-RC on the classpath:
    - whether Dokka's analysis reads them with `failOnWarning` on and reports no warning or error the Kotlin version causes;
    - whether the validator reads class files whose Kotlin metadata is 2.5.0, and keeps `nonPublicMarkers` working;
    - whether vanniktech's publication setup works against the 2.5 plugin's API.
  - Whether issue 4620 is fixed in a Dokka release by now.
  - The `kotlin-stdlib` requirement each published module then carries.
  - The build runs on Gradle 9.7.1, the JDK 21 toolchain and the Java floor of 21, with the configuration cache usable.
  - Dokka 2 runs in its V2 plugin mode, with one aggregated publication at the root built from `dokka(project(":<module>"))`.
    The Kotlin plugins sit on the root project's plugin classpath with `apply false`. The organisation's theme is applied in each
    module's Dokka configuration and at the root. Every Dokka configuration sets `reportUndocumented` and `failOnWarning`. The
    umbrella's own source sets are suppressed.
  - Each published module's javadoc jar is its Dokka output, `JavadocJar.Dokka("dokkaGeneratePublicationHtml")`.
  - `./gradlew build` covers Dokka with no undocumented public declaration. The answer says how a Dokka task joins `check` or
    `build`.
  - The validator runs in `check`, with `@ExperimentalBotToolsApi` in `nonPublicMarkers`.
  - `publishToMavenLocal` at `1.0.0-SNAPSHOT` runs with no signing key, while releases stay signed.
  - The answer says, for each tool, what it does on a module with no main source: whether Dokka warns, and so fails under
    `failOnWarning`; whether the validator fails `apiCheck` or writes an empty dump; whether vanniktech builds valid jars.
- **Evidence that would settle it.** The release notes and compatibility statements of Dokka, vanniktech, the validator and the
  Kotlin Gradle plugin; their source where empty modules are handled and where Kotlin metadata or analysis versions are read;
  their issues on Kotlin 2.5 pre-releases; builds that run them on a Kotlin 2.5 pre-release today; WebTools' and MyGameTools'
  `build-logic` and WebTools' integration tests of its conventions, read through the GitHub API.
- **Findings file:** [`documentation-abi-and-publishing-gates.md`](documentation-abi-and-publishing-gates.md).

### 4. How are the CI, GitHub Pages and release workflows, and the repository's settings, configured on GitHub for this build?

- **Options worth comparing.**
  - CI split into jobs by concern, as MyGameTools' is, or one job running `./gradlew build` with a few jobs beside it.
  - Actions pinned by commit, as the secret-scan workflow pins its checkout, or by tag.
  - The required checks named job by job, or one aggregate job whose name never changes.
  - A repository ruleset, or classic branch protection.
- **Requirements an answer must meet.**
  - **`ci.yml`.** It runs on pushes to `main`, pull requests to `main` and on demand. It shares no name with the secret-scan
    workflow: not the workflow name `Secret scan`, the job id `secret-scan`, the job name `Secret scan (gitleaks)` or the
    concurrency group `secret-scan-…`. It runs `./gradlew build` from a clean checkout on JDK 21, and a job runs
    `./gradlew dokkaGeneratePublicationHtml`.
  - **`pages.yml`.** It follows the organisation's standard
    ([R-104](https://github.com/SpartanLaboratories/.github/blob/main/policy/documentation/dokka.md)):
    - it deploys on each push to `main`;
    - it grants `contents: read` by default, and `pages: write` and `id-token: write` on the deploy job only;
    - it puts `website/` at the site root and `build/dokka/html` at `/api/`, and fails when that output is missing;
    - it ships `.nojekyll`, and never cancels a deployment in progress.
  - **`release.yml`.** It runs on a pushed version tag in either form, `vX.Y.Z` or a bare `X.Y.Z`. It builds that tagged commit
    from a clean checkout with `./gradlew build` and the release-metadata check. It creates nothing, and holds `contents: read`.
  - **The settings, applied after the landing:**
    - one ruleset on `main`, requiring:
      - `Secret scan (gitleaks)` and the CI workflow's checks;
      - a pull request, with the branch up to date;
      - no force-push and no deletion;
    - no bypass actor;
    - squash and rebase merging turned off, so merges are merge commits only;
    - the GitHub Pages source switched to GitHub Actions before the first deployment.
  - **Facts the answer establishes.**
    - The context name a job's check run reports, to require it in a ruleset.
    - What a required check does when its workflow does not run on a change.
    - Whether a ruleset's required checks also bind direct pushes.
    - The fields the rulesets and GitHub Pages APIs take for these settings.
    - Whether the GitHub Pages artifact action drops dot files, and how `.nojekyll` survives it.
    - The current releases, and their commits, of the actions the workflows use.
- **Evidence that would settle it.** GitHub's documentation of rulesets and required status checks, the GitHub Pages REST API and the
  repository merge settings; the READMEs and releases of `actions/checkout`, `actions/setup-java`, `gradle/actions`,
  `actions/upload-pages-artifact`, `actions/deploy-pages` and `actions/upload-artifact`; WebTools' and MyGameTools' workflows.
- **Findings file:** [`github-workflows-and-settings.md`](github-workflows-and-settings.md).

### 5. Which logging dependency does the library declare under the organisation's logging policy, and how does a build check tell that a runtime classpath carries a logging backend?

The organisation's logging policy
([R-30](https://github.com/SpartanLaboratories/.github/blob/main/policy/logging/README.md)) has all Kotlin code log through
kotlin-logging, one organisation version (8.0.7), internal and never in a public API. A library publishes no logging backend, and
logback is the backend for tests. The build's own check enforces the second rule: it fails when a published module's runtime
dependencies carry a logging backend.

- **Options worth comparing.**
  - Detection by the provider mechanism: slf4j 2's `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` in a jar on the
    resolved runtime classpath, and slf4j 1's `org/slf4j/impl/StaticLoggerBinder.class`.
  - Detection by a list of known backend coordinates.
  - Both together.
- **Requirements an answer must meet.**
  - The check runs per published module over its resolved runtime classpath, joins `check`, and is configuration-cache safe.
  - It passes for kotlin-logging and slf4j-api alone, and fails for each common backend.
  - kotlin-logging 8.0.7 is readable by the Kotlin 2.5 compiler at language and API version 2.5 (its metadata version), runs on
    Java 21, requires a `kotlin-stdlib` no newer than the build's, and its coordinates and the slf4j-api version it brings are
    known.
  - The answer says what kotlin-logging does on the JVM with no slf4j provider present, and what a test classpath with logback
    looks like.
- **Evidence that would settle it.** slf4j's documentation of providers and bindings; kotlin-logging's README, release notes,
  POM, module metadata and class files at 8.0.7; the slf4j providers of logback, log4j and slf4j's own simple and JUL bindings;
  builds that run such a check.
- **Findings file:** [`logging-backend-check.md`](logging-backend-check.md).

### 6. Which Gradle versions does the Kotlin Gradle plugin 2.5.0-RC support, and what does the move from 2.2.21 to 2.5.0-RC change in the build's own configuration?

The build pins the Kotlin Gradle plugin 2.5.0-RC, with the serialization compiler plugin at the same version, and compiles at
language and API version 2.5. The repository already carries the Gradle 9.7.1 wrapper, and Gradle 9.7.1 compiles `build-logic`'s
precompiled script plugins with the Kotlin it embeds, 2.4.0. `bottools.kotlin-library` sets `jvmTarget` 21 through `JvmTarget`,
adds `-Xjdk-release=21` and calls `explicitApi()`.

- **Options worth comparing.**
  - The Gradle 9.7.1 wrapper the repository carries.
  - A newer Gradle release the plugin supports, up to 9.9.2.
- **Requirements an answer must meet.**
  - The Gradle range the Kotlin Gradle plugin 2.5.0-RC documents, tests or enforces, and whether 9.7.1 is inside it. If it is
    not, the lowest release that is, and what moving the wrapper changes.
  - What `kotlin-dsl` on Gradle 9.7.1 does when `build-logic` compiles against the 2.5.0-RC plugin's API and applies that plugin
    to the main build: any version check, warning or failure, and when Gradle's warning about an unsupported Kotlin plugin
    version appears.
  - What Kotlin 2.5 changes in the compiler configuration above: whether `-Xjdk-release` is still accepted or has a stable
    replacement, whether `JvmTarget` 21 and `explicitApi()` are unchanged, which `languageVersion` and `apiVersion` the plugin
    sets by default, and any deprecation the build would print. The answer reads Kotlin 2.5's breaking changes and deprecations
    for what bears on a JVM library built this way.
  - Where the 2.5.0-RC plugins and the compiler artifacts resolve from, with no repository beyond Maven Central and the Gradle
    Plugin Portal.
  - When Kotlin 2.5.0 is planned for release, and what the later move from the release candidate to 2.5.0 changes in a build
    configured this way.
- **Evidence that would settle it.** Kotlin's release notes and "What's new" page for 2.5, with its breaking-changes section;
  the plugin's source for its supported Gradle range and its default language and API versions; Kotlin's release schedule and
  its pre-release page; Gradle's compatibility notes and `kotlin-dsl` documentation for 9.7; issues on the 2.5 pre-releases with
  Gradle 9.
- **Findings file:** [`kotlin-2-5-toolchain.md`](kotlin-2-5-toolchain.md).

### 7. What does a library compiled by Kotlin 2.5.0-RC at language and API version 2.5 ask of its consumers, on the release candidate and after the move to 2.5.0?

The library's consumers are Kotlin consumers on Gradle on the JVM. A consumer-side build in this unit compiles against the
modules published to Maven Local, and a consumer may also build against the library's source through a composite build. The
published modules depend on `kotlin-stdlib`.

- **Options worth comparing.**
  - For the consumer-side build: the oldest Kotlin that reads the published modules, or the Kotlin the library builds with.
  - While the library builds on the release candidate: what a consumer on a stable Kotlin can and cannot do with what it
    compiles.
- **Requirements an answer must meet.**
  - Which Kotlin compilers read class files whose Kotlin metadata is 2.5.0, what an older compiler reports, and how far that
    holds for a library's public signatures, stated from Kotlin's own documentation.
  - Which `kotlin-stdlib` the published modules require, and what a consumer's dependency resolution then puts on its compile
    and runtime classpaths; what an API version of 2.5 asks of the standard library at run time.
  - Whether Kotlin 2.5.0-RC marks what it compiles as pre-release, the `kotlin-stdlib` 2.5.0-RC artifact included, and whether
    language version 2.5 counts as stable in the release candidate; what a stable compiler, 2.4.x or 2.5.0, does with such
    classes, and the option that overrides it; what this means for a consumer of artifacts built on the release candidate, and
    for one that builds the library's source through a composite build.
  - Which language features are stable at language version 2.5 that were not at 2.2, context parameters among them with
    whatever part of them is still experimental, and what a public signature that uses one asks of a consumer's compiler.
- **Evidence that would settle it.** Kotlin's documentation of compatibility, its evolution principles and its compiler
  options; its pre-release and early-access pages; the compiler's source where the pre-release flag and the metadata version are
  written and checked; the "What's new" pages of 2.4 and 2.5; issues on consumers of pre-release binaries.
- **Findings file:** [`kotlin-2-5-consumers.md`](kotlin-2-5-consumers.md).

### 8. Which jda-ktx, kotlinx-serialization-json and kotlinx-coroutines versions are the newest that work together on Kotlin 2.5 with JDA 6.7.0?

The library pins JDA 6.7.0. jda-ktx, kotlinx-serialization-json and kotlinx-coroutines were held at 0.14.2, 1.9.0 and 1.10.2, the
newest a Kotlin 2.2 compiler reads; on Kotlin 2.5 they are the newest versions that work together on that Kotlin and with JDA
6.7.0. `bottools-core` declares JDA and kotlinx-coroutines as `api` and jda-ktx as `implementation`; `bottools-stats` and
`bottools-plugins` use kotlinx-serialization-json with the compiler plugin at the Kotlin version; tests use kotlinx-coroutines-test.
WebTools, a later dependency of `bottools-http`, brings kotlinx-coroutines 1.10.2.

- **Options worth comparing.** For each library, its newest release, and the newest release the others' requirements allow.
- **Requirements an answer must meet.**
  - **jda-ktx.** For each release after 0.14.2: the JDA version it builds against and declares, the kotlinx-coroutines version
    it requires, the Kotlin it is built with and the `kotlin-stdlib` it requires. The newest release that works with JDA 6.7.0;
    if it needs a newer JDA, which one, and what moves with it.
  - **kotlinx-serialization-json.** The newest release, the Kotlin compiler it requires, whether the serialization compiler
    plugin at 2.5.0-RC works with it, and the `kotlin-stdlib` it requires.
  - **kotlinx-coroutines**, core and test. The newest release, the Kotlin it requires, and whether jda-ktx's and WebTools'
    requirements resolve to it.
  - Each library's class files are Java 21 or lower, read from its published Gradle Module Metadata or its build, and the
    `kotlin-stdlib` each requires is no newer than 2.5.0.
  - Whether JDA 6.7.0 is still JDA's newest release.
- **Evidence that would settle it.** Maven Central's metadata, POMs and Gradle Module Metadata for each release; the libraries'
  release notes, changelogs and build files; jda-ktx's repository.
- **Findings file:** [`kotlin-2-5-library-set.md`](kotlin-2-5-library-set.md).

---

## Verification results

Every load-bearing claim of the seven findings files that bear on the move to Kotlin 2.5 was re-opened at its source on
2026-11-23: sources quoted at a tag or a commit were read there, and release lists, issue states and the metadata of Maven Central
and the Gradle Plugin Portal were read on that day. Of their 203 claims, 199 hold and none fails. Three rest on the contents of
published jars, which were read from the jars on 2026-11-18 and not again; the text sources read now agree with each of them. One
is withdrawn by its own file in favour of another. The findings on the workflows and the repository's settings do not depend on
the Kotlin version; their 23 claims were re-opened on 2026-11-18 and all hold.

| Findings file | Claims | Result |
|---|---|---|
| [`kotlin-2-5-toolchain.md`](kotlin-2-5-toolchain.md#7-load-bearing-claims) | 20 | Hold. The Kotlin Gradle plugin 2.5.0-RC enforces Gradle 8.14 as its minimum and checks no maximum, and its tests run Gradle 8.14.5 to 9.8.1 with 9.7.0 named; `-Xjdk-release` is present and not deprecated; language version 2.5 is the release candidate's default; Kotlin 2.5.0 is planned for December 2026. |
| [`kotlin-2-5-consumers.md`](kotlin-2-5-consumers.md#7-load-bearing-claims) | 24 | Hold. At `v2.5.0-RC` the compiler is not a pre-release (`IS_PRE_RELEASE = false`) and language version 2.5 is its newest stable one; a compiler reads Kotlin metadata up to its own minor version plus one; context parameters are stable from 2.4.0 except context arguments and callable references, unchanged in 2.5.0-RC. |
| [`kotlin-2-5-library-set.md`](kotlin-2-5-library-set.md#7-load-bearing-claims) | 20 | Hold. jda-ktx 0.15.0, kotlinx-coroutines 1.11.0 and kotlinx-serialization-json 1.13.0 are each their library's newest release, with the requirements the file gives; JDA 6.7.0 is JDA's newest release. |
| [`detekt-on-the-toolchain.md`](detekt-on-the-toolchain.md#7-load-bearing-claims) | 46 | 45 hold, among them: alpha.6 is detekt's newest release and embeds Kotlin 2.4.10, which knows language version 2.5 as experimental and reads metadata up to 2.5.0; detekt's move to Kotlin 2.5.0 is open and blocked (#9786, draft #9888); a public Kotlin 2.5.0-RC build running alpha.6's type-resolving task passes while printing "There were 9 compiler errors found during analysis". Claim 10, the metadata version inside the `kotlin-stdlib` 2.2.21 jar, rests on the jar; the compiler's source at `v2.2.21` agrees. |
| [`documentation-abi-and-publishing-gates.md`](documentation-abi-and-publishing-gates.md#7-load-bearing-claims) | 41 | 40 hold; claim 20 is withdrawn by the file in favour of claim 22. Dokka 2.2.0 embeds compiler 2.3.20-dev-7064 and Dokka 2.3.0 embeds 2.5.0-dev-3229; issue 4620 is closed by pull request 4628, merged on 2026-11-20 and in no release; the validator resolves `kotlin-metadata-jvm` at the project's Kotlin plugin version and reads it leniently; the Kotlin Gradle plugin's own ABI validation is still experimental at 2.5.0-RC. |
| [`umbrella-strict-pins.md`](umbrella-strict-pins.md#7-load-bearing-claims) | 29 | Hold. The plugin's standard-library dependency handling and its JVM target class are byte-identical at `v2.2.0` and `v2.5.0-RC`; `kotlin-stdlib` 2.5.0-RC is published with `org.gradle.status: release`; the organisation's version rule and Gradle's version ordering read as quoted. |
| [`logging-backend-check.md`](logging-backend-check.md#7-load-bearing-claims) | 23 | 21 hold. Claims 3 and 10, kotlin-logging 8.0.7's class-file version and metadata and the provider files inside the backend jars, rest on the jars; kotlin-logging's build file and the backends' sources agree. |
| [`github-workflows-and-settings.md`](github-workflows-and-settings.md#7-load-bearing-claims) | 23 | Hold, as re-opened on 2026-11-18. All seven action commits match their tags, and each named release was the newest of its line. This repository's secret-scan check reports `Secret scan (gitleaks)` from GitHub Actions (app id 15368). |

Details that differ from the files' wording and change no conclusion:

- **detekt, claim 38.** KT-91146 is marked obsolete rather than fixed; its fix is KT-89902, merged on 2026-11-05 and contained in
  `v2.5.0-RC`.
- **Library set, claim 7.** JDA's `JDAInfo` source moved out of `src/main` into a build resource and is generated at build time;
  the public class still exists.
- **Gates, claim 37.** vanniktech's test matrix runs Kotlin 2.5.0-RC on its main branch after 0.37.0, whose own tag tested 2.4.0;
  no plugin source changed after 0.37.0.
- **Gates, claim 32.** The documentation page of the plugin's ABI validation last changed on 2026-06-03.
- **Umbrella, claim 19.** `AbstractKotlinPlugin` differs between `v2.2.0` and `v2.5.0-RC` in more than the renamed call, none of
  it in the quoted logic.
- **Toolchain, claim 7.** Gradle's compile-time check of the Kotlin version was confirmed at Gradle 9.9.2, not at 9.8.
- **detekt, claim 7, and consumers, claim 12.** A release note's heading and its publication date, and a commit's author and
  committer dates, are a day apart; the claims hold on either date.
- **GitHub, claim 2.** `actions/checkout`'s test workflow declares six jobs, not two; the naming rule it illustrates holds.
- **GitHub, claim 22.** The quoted concurrency sentence comes from one of two variants of GitHub's documentation source; the other
  variant says the same in other words.

**Observed, not quoted.** Several behaviours in the findings come from reproduction builds run outside this repository on Gradle
9.7.1 with the Kotlin Gradle plugin 2.2.x, not from a citable source, and are on no claims list:

- the published shape of the umbrella's strict constraints, their resolution inside the build and under a composite, the
  conflict matrix a consumer meets, and the release-metadata check passing, failing and reusing the configuration cache
  ([umbrella findings, F1 and F5 to F8](umbrella-strict-pins.md#3-findings));
- Dokka, the validator and vanniktech on modules with no main source, Dokka failing `build` on an undocumented declaration once
  joined to `check`, and the empty aggregate a root without the Kotlin plugin renders
  ([gates findings, F6 and F7](documentation-abi-and-publishing-gates.md#3-findings)).

None of these paths reads Kotlin metadata, so none is expected to change on Kotlin 2.5 (an inference from the sources). The
build's own checks repeat each of them on the real modules.

---

## Summary

### 1. Static analysis with detekt

- **What was found.**
  - `SuspendFunSwallowedCancellation` needs type resolution in both detekt lines. Without a classpath the rule is skipped, with a
    debug message only. The Gradle plugin joins only the plain `detekt` task to `check`, and that task has no classpath, so a
    build that applies detekt and runs `check` passes with the rule never run
    ([detekt findings, F1 to F3](detekt-on-the-toolchain.md#3-findings)).
  - detekt 1.23.8, the last 1.x release, is built on Kotlin 2.0.21 and reads Kotlin metadata only up to 2.1.0, so it cannot read
    this build's classpath (F4).
  - detekt 2.0.0-alpha.6 (2026-08-04) is the newest release, with no stable 2.0.0. It embeds the Kotlin 2.4.10 compiler. No
    release or snapshot is built on Kotlin 2.5: detekt's move to Kotlin 2.5.0 is an open draft change, blocked on other work, with
    no date (F5).
  - Its Gradle plugin copies the compile task's language and API version, 2.5, into each `detekt<Compilation>` task. Kotlin 2.4.10
    knows 2.5 as an experimental language version and accepts it, and it reads metadata up to 2.5.0, so `kotlin-stdlib` 2.5.0-RC
    and the modules' own classes are readable to it; the release candidate marks nothing it compiles as pre-release (F12 to F14).
  - What goes wrong in that analysis does not fail the build. Every compiler error detekt meets, an unresolved class or a
    language feature its compiler does not know, is counted into one line, "There were N compiler errors found during analysis.
    This affects accuracy of reporting.", and the rules run on regardless. A public Kotlin 2.5.0-RC build running alpha.6's
    type-resolving task prints that line and passes (F15, F16).
  - A language feature that exists only from Kotlin 2.5, such as name-based destructuring written `(val x, val y)`, is unknown to
    detekt's compiler: each use is such an error, and the file is analysed with reduced accuracy (F13, F17).
- **The approach.**
  - **Pin and apply.** Pin `dev.detekt` 2.0.0-alpha.6 exactly in `build-logic`, and apply it in `bottools.kotlin-library` with
    `buildUponDefaultConfig = true`. `config/detekt/detekt.yml` holds only the rule's activation. A new code base needs no
    baseline, and `parallel` stays off. A module with no main source passes, its task skipped as `NO-SOURCE` (F8, F9).
  - **One language version.** The language and API version are set once, on `kotlin { compilerOptions { … } }`, and detekt
    follows them; the detekt tasks get no version of their own (F12).
  - **Wire the type-resolving tasks.** `check` depends on the type-resolving task of every Kotlin compilation: `detektMain`, and
    `detektTest`. The seven test sets are packages inside the one `test` source set, so `detektTest` covers them all.
  - **Prove the rule on the real toolchain.** The convention plugin's tests compile their fixtures at language version 2.5 against
    `kotlin-stdlib` 2.5.0-RC, with no language feature that exists only from Kotlin 2.5: a seeded `runCatching { suspendCall() }`
    fails `check` while the plain `detekt` task passes; a second fixture whose suspend callee lives in another module fails `check`
    too; and the fixtures' analysis prints no "compiler errors found during analysis" line, which shows that detekt reads the
    standard library and the modules' own classes.
  - **Language features that exist only from Kotlin 2.5.** Library code may use them. In a file that uses one, detekt's
    type-resolved analysis is less accurate: each use is counted into the line "There were N compiler errors found during
    analysis. This affects accuracy of reporting.", the rules run on with reduced accuracy in that file, and the build does not
    fail. That is an accepted consequence of the version skew, and nothing in the build bars the features. No experimental
    compiler flag is enabled. The pin moves to the first detekt release built on Kotlin 2.5.0
    ([#9786](https://github.com/detekt/detekt/issues/9786), [#9888](https://github.com/detekt/detekt/pull/9888)).
  - **The stricter rule.** The 2.x rule also flags a `catch` of `CancellationException`, or of a supertype, around a suspend
    call, unless the clause rethrows `CancellationException` first or starts with `ensureActive()`. The internal
    `suspendCatching` is written in a shape the rule accepts (F10).
- **Where sources disagree.** detekt's migration guide lists Kotlin 2.4 as the 2.x minimum. The accepted language versions (2.0
  to 2.5) and the public builds on Kotlin 2.2.21 contradict it, so the guide's row reads as detekt's own build version.
- **What does not fit.**
  - 1.23.8 cannot read the classpath of the one rule it would be adopted for.
  - `main-SNAPSHOT` is on Kotlin 2.4.10 as well, floats, and needs a snapshot repository.
  - A lower language version on the detekt tasks gains nothing: detekt reads libraries at its own compiler's stable version
    regardless, and the features of 2.5 would then be off in the sources too.
  - The command-line tool duplicates the classpath, toolchain and friend-path wiring the plugin already derives, and the plain
    task cannot run the rule.
- **The cost.** The build's detekt is a pre-release on a compiler one minor version older than the build's, so a file that uses a
  language feature of Kotlin 2.5 is analysed with reduced accuracy until detekt moves to Kotlin 2.5.0. It adds nothing to a
  published artifact, so a bump can break only `check`. Three open issues touch this build: #9793 (a stale jar view in a warm
  local daemon; a clean CI build is unaffected), #9121 (`parallel`) and #9297 (the ktlint wrapper with `ignoreAnnotated`) (F11).

### 2. The umbrella's strict pins and the release-metadata check

- **The declaration.** Each of the five edges is `api(project(":<module>"))` plus an `api` dependency constraint by coordinates with
  `version { strictly(<the shared version>) }`, generated from one module list.
  - **What is published.** Gradle 9.7.1 publishes the constraint in `dependencyConstraints[]` of the `apiElements` and
    `runtimeElements` variants, with `strictly` and `requires`. The edge itself in `dependencies[]` stays a plain `requires`.
  - **How it resolves.** Inside the build the edge resolves to the sibling project. A composite that includes the build still
    substitutes it, and ignores the requested version.
  - **The POM** shows plain versions and a `dependencyManagement` block, with no `strictly`. vanniktech changes none of this
    ([umbrella findings, F1, F5](umbrella-strict-pins.md#3-findings)).
- **What does not work.** A constraint on the project dependency itself cannot carry a version: Gradle throws. Declaring the edge
  by coordinates with a substitution rule breaks every other project of the build that consumes the umbrella (F2, F3).
- **What a consumer meets** (F6):
  - a plain request for another version of a pinned module fails resolution, naming the strict constraint;
  - a request for a lower version is no conflict;
  - the consumer's own `strictly` or `force` overrides the pin.
- **On the Kotlin Gradle plugin 2.5.0-RC** nothing the check reads changes. A JVM module still publishes through Gradle's `java`
  component, and the plugin's standard-library handling is byte-identical to 2.2.0's. Every published module, the umbrella
  included, carries a plain `requires 2.5.0-RC` edge to `kotlin-stdlib`, a `compile`-scope dependency in the POM. vanniktech 0.37.0
  publishes a JVM module through Gradle's `java` component alone (F10, F11, F13).
- **A pre-release requirement in a release.** `kotlin-stdlib` 2.5.0-RC is published with `org.gradle.status: release`, so no status
  attribute marks it, and Gradle's ordering cannot tell `2.5.0-RC` from a lettered `1.0.0a`: each sorts below its plain version.
  Only a lexical reading of the version string would tell them apart (F12). The check refuses a `-SNAPSHOT` only, and reads no
  pre-release token, so a version that is not a snapshot passes it with `kotlin-stdlib` 2.5.0-RC in its metadata. The Kotlin pin
  moving to 2.5.0 before the first release is a step of the release, checked by hand.
- **`verifyReleasableMetadata`** is a typed task in `build-logic`, shaped like WebTools' `VerifyJavaFloor` (F7).
  - **Inputs:**
    - the outputs of every `GenerateModuleMetadata` task, collected lazily, so they carry the task dependency;
    - the published version;
    - a map of `group:module` to the version each must be pinned to: five entries on the umbrella, none on a feature module, one
      more later for the WebTools edge.
  - **Checks:**
    - it reads only the library variants (category `library`; the sources variant also carries the runtime usage);
    - it finds each edge in `dependencies[]` and its `strictly` in `dependencyConstraints[]`;
    - for a version that is not a snapshot, it refuses any `-SNAPSHOT` in either array;
    - it fails on a missing file or on nothing to check, and writes its report only on success.
  - **Wiring.** It hangs on every `AbstractPublishToMaven` task, so Maven Local, any repository and Central's staging all wait for
    it. vanniktech's upload to Central is an end-of-build action that does not run after a failure.
- **The umbrella's jars.** MyGameTools' fold of the modules' sources and Dokka output works on vanniktech 0.37.0. Its guards do not
  fit, because they use a fixed page count and hard-coded package names. Each guard instead derives its expectation from the
  modules' real source files, from the same module list:
  - presence is required for each module that has source;
  - a module with no source contributes nothing, and is not required to;
  - when no module has source at all, the guard fails (F8).
- **Where sources disagree.** Gradle advises a library to prefer a range with a preferred version over a bare strict version.
  Common practice aligns a library's own modules with a BOM, and no public library was found that publishes strict constraints
  between its own modules (F9). The organisation's versioning rule decides here: a bug fix may take a letter, Gradle orders a
  lettered version below the plain one, and only a strict pin keeps such a fix effective in a consumer's graph.

### 3. Versions, the documentation and ABI gates, and modules with no source yet

- **Versions** ([gates findings, F1 to F4, F9, F10](documentation-abi-and-publishing-gates.md#3-findings)). Each published module
  requires `kotlin-stdlib` at the Kotlin plugin's version: 2.5.0-RC, then 2.5.0.

  | Tool | Pin | Why |
  |---|---|---|
  | Kotlin Gradle plugin | 2.5.0-RC, then 2.5.0 | the newest Kotlin line; 2.5.0 is planned for December 2026 |
  | Dokka | 2.3.0 | Dokka analyses with the compiler it embeds and ignores the project's language version. 2.3.0 embeds 2.5.0-dev-3229, whose default language version is 2.5 and which reads metadata 2.5.0. 2.2.0 embeds 2.3.20-dev-7064: it falls back to language version 2.3 and reads metadata only up to 2.4.0, so the 2.5.0-RC standard library on its analysis classpath is unreadable to it. |
  | vanniktech | 0.37.0 | on the `KotlinJvm` path it uses only the plugin's version and `KotlinToolingVersion`, both present at 2.5.0-RC; its test matrix runs the 2.5.0-RC plugin, and no plugin source changed after 0.37.0 |
  | binary-compatibility validator | 0.18.2 | it resolves `kotlin-metadata-jvm` at the project's Kotlin plugin version and reads class files leniently; `nonPublicMarkers` reads annotations from the class file, apart from Kotlin metadata |

- **Dokka.**
  - Every Dokka source set sets `languageVersion` and `apiVersion` to `"2.5"`, so a later Dokka embedding a newer compiler
    analyses at the build's version (F2).
  - Issue 4620 is fixed on Dokka's `master` (pull request 4628, merged 2026-11-20) and in no release. Under `failOnWarning` it fails
    a documented class in one module that inherits a private member, from a class in another module, typed from that module's
    `implementation` dependency. In this unit only `bottools-core` has source, so nothing can trigger it; the first such subclass
    in a later unit would. Until the pin moves to the first Dokka release that carries pull request 4628, a later unit avoids
    that shape: no documented class inherits, from a class in another module, a private member whose type comes from that
    module's `implementation` dependency, such as a class-level logger (F3).
  - V2 is already the default mode. `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled` in the root `gradle.properties`
    sets the finished state and keeps V1 unselectable (F5).
  - `dokkaGeneratePublicationHtml` joins `check` in the published-library convention and on the root. An undocumented public
    declaration then fails `./gradlew build` (F7).
  - The root needs the Kotlin plugin with `apply false`. Without it the aggregate renders empty and the build still passes, so
    the site check asserts that the aggregate holds a module page (F5, F6).
- **The validator** is proved by the build's own `apiCheck` on `bottools-core`'s markers; no public build on 2.5.0-RC was found
  that runs it. Beside it stands the Kotlin Gradle plugin's own ABI validation, `kotlin { abiValidation() }`, with the same
  `api/<module>.api` location: still experimental at 2.5.0-RC, behind `@OptIn(ExperimentalAbiValidation::class)` (F9).
- **Modules with no main source** pass every gate with no placeholder declaration (F6), and none of these paths reads Kotlin
  metadata (F8):
  - Dokka warns nothing and writes no pages;
  - the validator writes a zero-byte dump, and `apiCheck` fails until that dump is committed;
  - vanniktech builds valid jars holding only a manifest;
  - signing is skipped for the snapshot version.

  So every module commits its `api/<module>.api` dump. It is zero bytes for the four feature modules that have no source yet and
  for the umbrella.
- **`nonPublicMarkers`.** Declarations marked `@ExperimentalBotToolsApi` leave the dump. The marker class itself and
  `@SupportedExtension` stay in it.
- **Gradle 9 and test sources.** Gradle 9 fails `test` when a module has test sources but discovers no test, so a module's test
  source set holds a discoverable test or nothing (F6).
- **Where sources disagree.** The organisation's builds, both on the Kotlin Gradle plugin 2.2.0, pin Dokka 2.3.0 (WebTools) and
  2.2.0 (MyGameTools). On Kotlin 2.5 only 2.3.0 reads the build's classes.
- **What does not fit.** Dokka 2.2.0, for the reason in the table. A Dokka build from `master`, which carries the fix for 4620 and
  the 2.5.0-RC compiler: it is no release, floats, and needs a repository beyond Maven Central and the Gradle Plugin Portal.

### 4. The workflows and the repository's settings

- **Required checks** ([GitHub findings, F1 to F3](github-workflows-and-settings.md#3-findings)).
  - **What a check is named.** A check run carries its job's name.
  - **What satisfies one.** A workflow skipped by a filter leaves its required checks pending. A job skipped by `if:` reports
    success. A run started on demand never satisfies a required check. So the required jobs have fixed names, and carry no path
    filter and no `if:`.
  - **What it binds.** A ruleset's required checks apply before a ref is updated. With the pull-request rule, direct pushes to
    `main` are refused. Tag pushes are not touched.
- **The ruleset** targets `~DEFAULT_BRANCH`, with enforcement active and no bypass actor (F4, F5). Its rules:
  - `deletion` and `non_fast_forward`;
  - `pull_request`, with no required approval and merge commits as the only merge method;
  - `required_status_checks`, with the strict, up-to-date policy, each check pinned to GitHub Actions' integration id, 15368.

  Rulesets apply on public repositories of free-plan organisations.
- **Merge settings and GitHub Pages** (F6 to F8).
  - **Merge settings.** One repository update turns off squash and rebase merging and keeps merge commits.
  - **GitHub Pages.** The site is created with GitHub Actions as its source (`build_type: workflow`) before the first `pages.yml`
    run on `main`, and read back. The `github-pages` environment allows deployments from the default branch.
- **Actions, pinned by commit** (F9 to F11):

  | Action | Release | Note |
  |---|---|---|
  | `actions/checkout` | v7.0.1 | |
  | `actions/setup-java` | v6.3.0 | |
  | `gradle/actions/setup-gradle` | v5.0.2 | v5 is MIT-licensed. v6 moves its caching into a separately licensed component whose terms must be accepted, which is why WebTools stays on v5. Wrapper validation is on by default. |
  | `actions/upload-pages-artifact` | v5.0.0 | it drops dot files unless `include-hidden-files: true` is set, which `.nojekyll` needs |
  | `actions/deploy-pages` | v5.0.1 | |
  | `actions/upload-artifact` | v7.0.2 | |

- **Permissions** (F12). Each workflow defaults to `contents: read`. Only the GitHub Pages deploy job holds `pages: write` and
  `id-token: write`, and a job-level block sets every scope it does not list to none.
- **`release.yml`** (F13, F14).
  - **Trigger.** It matches a version tag with or without the leading `v`. The organisation's version scheme lets a bug fix carry a
    trailing letter, so the lettered forms are matched as well.
  - **The job.** A shell guard re-checks the tag. The job holds `contents: read`, builds the tagged commit from a clean checkout
    with `./gradlew build verifyReleasableMetadata`, and creates nothing.
- **Concurrency** (F15). CI cancels runs in progress on pull requests only. The GitHub Pages deployment runs in one fixed group
  that never cancels a deployment in progress.
- **What does not fit:**
  - floating action tags;
  - an aggregate gate job;
  - required checks without the integration id, which a plain commit status could satisfy;
  - workflow-level GitHub Pages permissions, as the organisation's two earlier sites have them.

### 5. Logging

- **kotlin-logging 8.0.7** ([logging findings](logging-backend-check.md#3-findings)).
  - **Its dependencies.** The artifact is `io.github.oshai:kotlin-logging-jvm`, and it depends on `kotlin-stdlib` 2.1.21 alone.
    slf4j-api is compile-only in its build, so it does not bring slf4j-api with it. Its `kotlin-stdlib` 2.1.21 is a lower bound:
    resolution takes the module's own `kotlin-stdlib` at the Kotlin plugin's version.
  - **Compatibility.** Its class files are Java 8 with Kotlin metadata 2.0.0. A newer compiler reads older binaries, so the Kotlin
    2.5 compiler reads them at language and API version 2.5, and Java 21 runs them.
  - **Its releases.** 8.0.7 is the newest release. Its next major, 9.0.0, will raise its own Kotlin baseline, with no date; no
    issue reports a problem with Kotlin 2.4 or 2.5 on the JVM.
  - **On the JVM.** slf4j is its default backend.
    - With no slf4j provider present, slf4j prints one warning and discards every event.
    - With no slf4j-api at all, kotlin-logging cannot load.
    - Its first use prints a start-up line, which only the application switches off.
- **What a logging module declares.** Each module that logs declares `kotlin-logging-jvm` 8.0.7 and `org.slf4j:slf4j-api` 2.0.19,
  both `implementation`; 2.0.19 is the version JDA 6.7.0 and logback 1.6.7 ask for. Tests get `ch.qos.logback:logback-classic`
  1.6.7 as `testRuntimeOnly`. logback 1.6.8 (2026-11-19) asks for the same slf4j-api.
- **Telling a backend apart.**
  - **Providers and bindings.** slf4j 2 loads its provider through `META-INF/services/org.slf4j.spi.SLF4JServiceProvider`, and an
    slf4j 1 binding carries `org/slf4j/impl/StaticLoggerBinder.class`. Of the 21 jars read, every provider and binding carries one
    of the two, and every API and bridge carries neither.
  - **Backends outside slf4j.** `log4j-core` is a backend without being an slf4j provider, and so are `logback-core`, `reload4j`
    and `tinylog-impl`. A list of barred coordinates covers them.
- **The check, `verifyNoLoggingBackend`.**
  - **Where it runs.** It runs per published module over the module's resolved runtime classpath, and is configuration-cache safe.
  - **What it fails on.** It fails on a provider or binding file, or on a barred coordinate. Its message names the module, the jar,
    its coordinates and the rule that matched.
  - **What it passes.** It passes on an empty classpath, since modules hold no source yet, and it never bars slf4j-api, the
    bridges or kotlin-logging.
- **What does not fit.**
  - Gradle capabilities: the `logging-capabilities` approach fails on only two backends, and its repository is archived.
  - A coordinate-only check goes stale and misses a shaded provider.
  - A check of logging configuration files packed into a module's own jar reaches past the check's subject, a module's runtime
    dependencies, and is not part of it.

### 6. The Kotlin 2.5.0-RC toolchain

- **Gradle** ([toolchain findings, F1, F2](kotlin-2-5-toolchain.md#3-findings)). The Kotlin Gradle plugin 2.5.0-RC enforces only a
  minimum, Gradle 8.14, and checks no maximum. Its tests run Gradle 8.14.5 through 9.8.1, 9.7.0 among them, and on Gradle 9.6 and
  newer it loads its `gradle96` variant. The build stays on its Gradle 9.7.1 wrapper. No Gradle release embeds Kotlin 2.5 (9.8
  embeds 2.4.10, 9.9 embeds 2.4.21), so a newer wrapper would not close the gap between Gradle's own Kotlin and the build's.
- **`build-logic` under `kotlin-dsl`** (F3). Gradle's "Unsupported Kotlin plugin version" warning compares the Kotlin plugin Gradle
  itself applies with the version Gradle embeds; the 2.5.0-RC plugin on `build-logic`'s `implementation` classpath is not what it
  checks. `build-logic`'s own sources compile at language and API version 2.2 with Gradle's Kotlin 2.4.0, which reads metadata up to
  2.5.0, and the plugin's own classes are compiled at language and API version 2.1 so that an older compiler reads them. WebTools
  and MyGameTools run this layout on Gradle 9.7.1 with a Kotlin plugin other than Gradle's own.
- **The compiler configuration is unchanged** (F4, F5). `-Xjdk-release` is present in 2.5.0-RC and not deprecated, and the plugin's
  compiler options have no property in its place, so it stays a free compiler argument. `JvmTarget.fromTarget("21")`,
  `explicitApi()` and the `compilerOptions` DSL are unchanged. Language and API version 2.5 are the release candidate's default;
  `bottools.kotlin-library` sets both to 2.5 explicitly, so the build stays at 2.5 when a later compiler changes its default.
- **Three changes of Kotlin 2.5 reach the build** (F6).
  - The unused return value checker is on by default at language version 2.5, in its checking mode: it prints warnings, and the
    build does not turn warnings into errors.
  - A Kotlin plugin loaded by more than one class loader in one build is an error, where it was a warning; the property
    `kotlin.pluginLoadedInMultipleProjects.ignore=true` silences it. The plugin requested at the root with `apply false` is shared
    by the subprojects, and the clean-clone build and the convention plugin's builds prove that layout.
  - The compiler's JDK 17 minimum is an error; the JDK 21 toolchain and a JDK 21 Gradle daemon meet it.
- **Resolution and timing** (F7, F8). The plugin markers and `kotlin-gradle-plugin` 2.5.0-RC resolve from Maven Central and the
  Gradle Plugin Portal, and the compiler artifacts from Maven Central. Kotlin 2.5.0 is planned for December 2026, on a schedule the
  release page calls approximate. The move from the release candidate to 2.5.0 changes version strings only, in each place the
  build names the Kotlin version.
- **What does not fit.** A newer Gradle wrapper, for the reason above; it would also change the Kotlin `build-logic` compiles
  and tests with.

### 7. What the move asks of consumers

- **The oldest Kotlin a consumer compiles with: 2.4.0, while the build is on the release candidate and after 2.5.0**
  ([consumer findings, F1, F2](kotlin-2-5-consumers.md#3-findings)). A class compiled at language version 2.5 carries Kotlin metadata
  2.5.0, and a compiler reads metadata up to its own minor version plus one, so Kotlin 2.4 reads it and Kotlin 2.3 does not. Kotlin's
  guidance for libraries says the same: consumers can use any compiler from the previous language version onwards. Kotlin states the
  one-version-ahead reading as preferred, not guaranteed. An older compiler fails with "compiled with an incompatible version of
  Kotlin", naming the highest metadata version it reads.
- **The standard library** (F3). Each published module asks for `kotlin-stdlib` at the plugin's version, 2.5.0-RC now and 2.5.0
  after the move, and Gradle puts the highest requested version on the consumer's compile and runtime classpaths. API version 2.5
  needs a standard library of at least 2.5 at run time, so a consumer on Kotlin 2.4 has its standard library raised to 2.5.
- **Nothing is marked pre-release** (F4 to F6). At `v2.5.0-RC` the compiler is not a pre-release and language version 2.5 is
  stable, so the classes it compiles carry no pre-release flag, and Kotlin 2.4 and 2.5.0 load them. The flag would appear if the
  build enabled an experimental language feature that forces it; the build enables none. Kotlin promises no compatibility between a
  pre-release build and the release, so what the release candidate built is rebuilt on 2.5.0, never reused.
- **Composite builds** read the same classes as a published artifact, so the same floor and the same standard library apply (F7).
- **Language features** (F9). Context parameters are stable from Kotlin 2.4.0, except context arguments and callable references,
  and 2.5.0-RC leaves them so. A public signature that uses them asks a consumer for Kotlin 2.4 at language version 2.4 or newer,
  and a consumer cannot take a callable reference to such a function. The other features stabilised since 2.2 ask nothing more of a
  consumer's compiler.
- **How the floor is proved.** The consumer-side build compiles against the modules published to Maven Local with the Kotlin
  Gradle plugin 2.4.21, the newest release of the floor's line, and reads Kotlin metadata as 2.4.0 does.

### 8. The library set on Kotlin 2.5

- **The set** ([library-set findings, F1 to F7](kotlin-2-5-library-set.md#3-findings)):

  | Library | Version | Why |
  |---|---|---|
  | JDA | 6.7.0 | still JDA's newest release |
  | jda-ktx | 0.15.0 | its only release after 0.14.2. It asks for JDA 6.5.0 as a plain runtime requirement, which resolution raises to 6.7.0, and for kotlinx-coroutines 1.11.0 and `kotlin-stdlib` 2.4.0; `RestAction.await()`, `JDABuilder.injectKTX()` and `CoroutineEventManager` are in its source |
  | kotlinx-coroutines-core and kotlinx-coroutines-test | 1.11.0 | the newest stable release, built on Kotlin 2.2.20; WebTools' 1.10.2 is a plain requirement, so the graph resolves to 1.11.0 |
  | kotlinx-serialization-json | 1.13.0 | the newest release, built on Kotlin 2.4.10; 1.12.0's own notes say to skip it for an exception-wrapping change 1.13.0 reverts |

- **Requirements.** The highest `kotlin-stdlib` any of them asks for is 2.4.10, below the plugin's 2.5.0-RC, which resolution takes.
  The 2.5 compiler reads all of their metadata. All four compile to JVM target 1.8. kotlinx-coroutines and kotlinx-serialization
  publish no `org.gradle.jvm.version`, so `verifyJavaFloor` reads their class files.
- **What the build proves.** The serialization compiler plugin at 2.5.0-RC with the 1.13.0 runtime is the usual pairing, not one
  documented as supported; the `@Serializable` probe proves it. jda-ktx 0.15.0 against JDA 6.7.0 rests on JDA's diff from 6.5.0 to
  6.7.0, which removes no public source file; the linkage test proves it (F3, F5).
