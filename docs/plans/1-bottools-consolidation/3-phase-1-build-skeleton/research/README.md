# Phase 1 — Build skeleton: research

This file holds the questions this unit's plan rests on that need evidence from outside this repository, and the earlier
findings that already answer the others. Each new question is answered by its own findings file in this folder. The
verification of the claims those findings rest on, and the summary of what they establish, follow below.

**What is already established and not asked again.** The following findings are current: the versions they name are the
ones this build pins, and nothing newer contradicts them. They are cited instead of researched again.

| What the plan needs | Answered by |
|---|---|
| JDA 6.7.0 with jda-ktx 0.14.2: the pairing, the Kotlin metadata 2.3.0 that a 2.2.x compiler reads, the coroutines version it needs, and the one-line compile check in `bottools-core` that proves the pairing | [`../../research/jda-and-coroutine-bridge.md`](../../research/jda-and-coroutine-bridge.md) §3 F3, F5, F6 and §6. JDA 6.7.0 is still JDA's newest tag on 2026-11-18. |
| kotlinx-serialization-json 1.9.0, built for Kotlin 2.2, and the compiler plugin at the Kotlin version | [`../../research/http-client-stack.md`](../../research/http-client-stack.md) §3 F4 |
| vanniktech's `coordinates()` against Gradle's `group` and `version`, and its signing rule: signing is not required for a `-SNAPSHOT` version | [`../../research/unreleased-build-consumption.md`](../../research/unreleased-build-consumption.md) §3 F3, F4 |
| The Gradle range documented for each Kotlin Gradle plugin line, and the organisation's builds on Kotlin Gradle plugin 2.2.0 with Gradle 9.7.1 | [`../../research/README.md`](../../research/README.md) §2.1 (P2) and §3.12 |
| The foojay resolver 1.0.0 that Gradle 9 needs | [`../../research/webtools-consumption.md`](../../research/webtools-consumption.md), claim WTC-35 |
| What `strictly` in a library costs a consumer, and Gradle ordering `1.0.0a` below `1.0.0` | the same file, §3 F5 and claim WTC-10 |
| Explicit API mode, the binary-compatibility validator's maintenance mode and `nonPublicMarkers`, the Kotlin Gradle plugin's own ABI validation being experimental in 2.2.0, Dokka's `reportUndocumented` with `failOnWarning`, and detekt's `SuspendFunSwallowedCancellation` being inactive by default | [`../../research/idiomatic-kotlin-api-shape.md`](../../research/idiomatic-kotlin-api-shape.md) §3 F7, F8 |
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

- **The build.** It is one module at `7.5-SNAPSHOT`, on Kotlin 2.1.10, a JDK 23 toolchain, JDA 5.6.1 and Gradle 8.10. It has no
  convention plugins, no group, no documentation, ABI or static-analysis gate, and one test task.
- **The target.** Six artifacts under `io.github.spartanlaboratories` share one version, `1.0.0-SNAPSHOT`: `bottools-core`,
  `bottools-data-sqlite`, `bottools-http`, `bottools-stats`, `bottools-plugins` and the `bottools` umbrella. Each module directory
  equals its artifact id. `build-logic` holds the convention plugins `bottools.kotlin-library` and `bottools.published-library`;
  the second sets `group` and `version`. The build runs on a JDK 21 toolchain with a Java floor of 21, the Kotlin Gradle plugin
  2.2.x and Gradle 9.7.1.
- **The gates.** Every module compiles with `explicitApi()`. Dokka runs with `reportUndocumented` and `failOnWarning` on every
  configuration. The binary-compatibility validator runs in `check`, with the Experimental marker in `nonPublicMarkers`. detekt
  runs with `SuspendFunSwallowedCancellation` on. Each of the seven test sets has its own folder and task.
- **The modules' content.** In this unit, `bottools-core` holds the two stability markers, `@SupportedExtension` and
  `@ExperimentalBotToolsApi` (`@RequiresOptIn(level = ERROR)`, binary retention). The other four feature modules hold no main
  source yet, and the umbrella holds none at all.
- **The repository.** It is public. It has no Pages site, no ruleset and no branch protection, and squash and rebase merging are
  on. The only workflow is the secret scan, whose job is named `Secret scan (gitleaks)`.

---

## The questions

### 1. Which detekt release, run in which way, gives this build type-resolved analysis on the Kotlin Gradle plugin 2.2.x and Gradle 9.7.1?

`SuspendFunSwallowedCancellation` is one of the rules the build must run, and the library's failure model depends on it: no
library code may swallow a coroutine's cancellation. Whether the rule needs type resolution, and which detekt release runs
type-resolved analysis on this toolchain, decide how detekt is applied and how it is wired into `check`.

- **Options worth comparing.**
  - The newest detekt 1.23.x release, with its type-resolving tasks (`detektMain`, `detektTest`).
  - A detekt 2.x release, if one is released and usable on this toolchain.
  - detekt's command-line tool run against the module's compile classpath.
  - detekt without type resolution, if the rule does not need it.
- **Requirements an answer must meet.**
  - It runs on Gradle 9.7.1 on JDK 21, with the configuration cache usable, against sources the Kotlin Gradle plugin 2.2.x
    compiles. The answer states any constraint detekt puts on the project's Kotlin version, and what happens when the two
    differ.
  - A convention plugin applies it to every module. It fails `check` on a finding, and nothing of detekt reaches a published
    module's classpath.
  - `SuspendFunSwallowedCancellation` is active, with the rest of the default rule set. The answer says where the configuration
    file lives, whether a new code base needs a baseline, and what detekt does on a module with no main source.
- **Evidence that would settle it.** detekt's release notes and changelogs; its Gradle plugin's documented compatibility and its
  source; issues on Gradle 9 and Kotlin 2.2 support; the rule's documentation; builds that run detekt on this toolchain today.
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
- **Evidence that would settle it.** Gradle 9.7.1's user guide on dependency constraints, rich versions and publishing Gradle
  Module Metadata; Gradle's source for how project dependencies and constraints are mapped into published metadata; the Gradle
  Module Metadata specification; vanniktech's publication setup; multi-module libraries that publish strict constraints between
  their own modules.
- **Findings file:** [`umbrella-strict-pins.md`](umbrella-strict-pins.md).

### 3. Which Dokka, publishing and API-validation versions does the build pin, and how do the documentation, ABI and publishing gates behave on modules that have no source yet?

The design names Dokka 2.2.0, vanniktech 0.37.0 and the binary-compatibility validator 0.18.2. The organisation's builds on this
stack differ: MyGameTools pins Dokka 2.2.0 and vanniktech 0.36.0, and WebTools pins Dokka 2.3.0, vanniktech 0.36.0 and the validator
0.18.2. Both build on the Kotlin Gradle plugin 2.2.0 and Gradle 9.7.1. In this unit, four of the five feature modules hold no
main source yet.

- **Options worth comparing.**
  - Dokka 2.2.0, or 2.3.0.
  - vanniktech 0.36.0, 0.37.0, or a later release.
  - The Kotlin Gradle plugin 2.2.0, or a later 2.2.x patch.
  - The validator 0.18.2, confirmed or replaced.
  - For a module with no main source: no source at all, or one minimal declaration per module.
- **Requirements an answer must meet.**
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
  Kotlin Gradle plugin; their source where empty modules are handled; WebTools' and MyGameTools' `build-logic` and WebTools'
  integration tests of its conventions, read through the GitHub API.
- **Findings file:** [`documentation-abi-and-publishing-gates.md`](documentation-abi-and-publishing-gates.md).

### 4. How are the CI, Pages and release workflows, and the repository's settings, configured on GitHub for this build?

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
    - the Pages source switched to GitHub Actions before the first deployment.
  - **Facts the answer establishes.**
    - The context name a job's check run reports, to require it in a ruleset.
    - What a required check does when its workflow does not run on a change.
    - Whether a ruleset's required checks also bind direct pushes.
    - The fields the rulesets and Pages APIs take for these settings.
    - Whether the Pages artifact action drops dot files, and how `.nojekyll` survives it.
    - The current releases, and their commits, of the actions the workflows use.
- **Evidence that would settle it.** GitHub's documentation of rulesets and required status checks, the Pages REST API and the
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
  - kotlin-logging 8.0.7 is readable by a Kotlin 2.2.x compiler (its metadata version), runs on Java 21, and its coordinates and
    the slf4j-api version it brings are known.
  - The answer says what kotlin-logging does on the JVM with no slf4j provider present, and what a test classpath with logback
    looks like.
- **Evidence that would settle it.** slf4j's documentation of providers and bindings; kotlin-logging's README, release notes,
  POM, module metadata and class files at 8.0.7; the slf4j providers of logback, log4j and slf4j's own simple and JUL bindings;
  builds that run such a check.
- **Findings file:** [`logging-backend-check.md`](logging-backend-check.md).
