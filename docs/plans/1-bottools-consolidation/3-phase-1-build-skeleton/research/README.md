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

---

## Verification results

Every load-bearing claim of the five findings files was re-opened at its source on 2026-11-18: sources quoted at a tag or a
commit were read there, release lists and Maven Central metadata were read on that day, and the jar and metadata claims were
checked by reading the published artifacts themselves. All 97 hold; none fails and none is unclear.

| Findings file | Claims | Result |
|---|---|---|
| [`detekt-on-the-toolchain.md`](detekt-on-the-toolchain.md#7-load-bearing-claims) | 24 | Hold. The rule's type-resolution requirement in both lines, the plugin joining only the plain task to `check`, 1.23.8's Kotlin 2.0.21 build and its metadata reader limit, 2.0.0-alpha.6 as the newest 2.x release with no stable 2.0.0, its Kotlin 2.4.10 build, JDK 17 floor and language-version range, the public builds on Kotlin 2.2.21, and the cited issues' states (#9793, #9121 and #9297 open; #8865 and #9742 closed; #9311 merged). |
| [`umbrella-strict-pins.md`](umbrella-strict-pins.md#7-load-bearing-claims) | 15 | Hold, each quote verbatim at Gradle v9.7.1, vanniktech 0.37.0, and the cited MyGameTools, WebTools and OkHttp commits. vanniktech 0.37.0 states Gradle 9.6.0 and 9.7.0-milestone-1 as tested, so 9.7.1 sits just above its tested range. |
| [`documentation-abi-and-publishing-gates.md`](documentation-abi-and-publishing-gates.md#7-load-bearing-claims) | 21 | Hold. Dokka 2.3.0 is the newest release (2026-11-05) and its issue 4620 is open; the Kotlin Gradle plugin 2.2.21 is the newest 2.2.x; the validator 0.18.2 is the newest (2026-09-02) and in maintenance mode; the validator reads binary-retention annotations for `nonPublicMarkers`. |
| [`github-workflows-and-settings.md`](github-workflows-and-settings.md#7-load-bearing-claims) | 23 | Hold. All seven action commits match their tags, and each named release is the newest of its line. This repository's secret-scan check reports `Secret scan (gitleaks)` from GitHub Actions (app id 15368). |
| [`logging-backend-check.md`](logging-backend-check.md#7-load-bearing-claims) | 14 | Hold. kotlin-logging-jvm 8.0.7's POM and module metadata depend on `kotlin-stdlib` 2.1.21 only; its class files are Java 8 with Kotlin metadata 2.0.0. Every provider, binding and bridge in the file's table is classified as the jars themselves show. |

Four details differ from the files' wording and change no conclusion:

- **Logging, claim 13.** The cited WebTools links named a `main` branch; WebTools' default branch is `master`. The links now point
  at commit `d68ec81e`, the head of `master` on 2026-11-18, which holds both quoted passages.
- **GitHub, claim 2.** `actions/checkout`'s test workflow declares six jobs, not two; the naming rule it illustrates holds.
- **GitHub, claim 22.** The quoted concurrency sentence comes from one of two variants of GitHub's documentation source; the
  other variant says the same in other words.
- **detekt, claim 11.** The sentence on alpha.6's build versions is in the release notes, which the file cites first, not in the
  changelog page at the tag.

**Observed, not quoted.** Several behaviours in the findings come from reproduction builds run outside this repository on
Gradle 9.7.1, not from a citable source, and are on no claims list:

- the published shape of the umbrella's strict constraints, their resolution inside the build and under a composite, the
  conflict matrix a consumer meets, and the release-metadata check passing, failing and reusing the configuration cache
  ([umbrella findings, F1 and F5 to F8](umbrella-strict-pins.md#3-findings));
- Dokka, the validator and vanniktech on modules with no main source, Dokka failing `build` on an undocumented declaration once
  joined to `check`, and the empty aggregate a root without the Kotlin plugin renders
  ([gates findings, F5 and F6](documentation-abi-and-publishing-gates.md#3-findings)).

The build's own checks repeat each of them on the real modules.

---

## Summary

### 1. Static analysis with detekt

- **What was found.**
  - `SuspendFunSwallowedCancellation` needs type resolution in both detekt lines. Without a classpath the rule is skipped, with a
    debug message only. The Gradle plugin joins only the plain `detekt` task to `check`, and that task has no classpath, so a
    build that applies detekt and runs `check` passes with the rule never run
    ([detekt findings, F1 to F3](detekt-on-the-toolchain.md#3-findings)).
  - detekt 1.23.8, the last 1.x release, is built on Kotlin 2.0.21. Its compiler reads Kotlin metadata only up to 2.1.0, while the
    standard library of Kotlin 2.2 carries 2.2.0, so on this build its type-resolved rules cannot see `kotlin.runCatching`, and the
    maintainers plan no further 1.x release (F4).
  - detekt 2.0.0-alpha.6 (2026-08-04) is the newest 2.x release, with no stable 2.0.0. It runs on JDK 17 or newer, accepts
    Kotlin language versions 2.0 to 2.5 and declares configuration-cache compatibility. Public builds run it on Kotlin 2.2.21 and
    Gradle 9.5 to 9.9 (F5 to F7).
- **The approach.**
  - **Pin and apply.** Pin `dev.detekt` 2.0.0-alpha.6 exactly in `build-logic`, and apply it in `bottools.kotlin-library` with
    `buildUponDefaultConfig = true`. `config/detekt/detekt.yml` holds only the rule's activation. A new code base needs no
    baseline, and `parallel` stays off. A module with no main source passes, its task skipped as `NO-SOURCE` (F8, F9).
  - **Wire the type-resolving tasks.** `check` depends on the type-resolving task of every Kotlin compilation: `detektMain`, and
    `detektTest`. The seven test sets are packages inside the one `test` source set, as in the organisation's builds, so
    `detektTest` covers them all.
  - **Prove the wiring.** A convention-plugin test with a seeded `runCatching { suspendCall() }` must fail `check`, while the plain
    `detekt` task passes.
  - **The stricter rule.** The 2.x rule also flags a `catch` of `CancellationException`, or of a supertype, around a suspend
    call, unless the clause rethrows `CancellationException` first or starts with `ensureActive()`. The internal
    `suspendCatching` is written in a shape the rule accepts (F10).
- **Where sources disagree.** detekt's migration guide lists Kotlin 2.4 as the 2.x minimum. The accepted language versions (2.0
  to 2.5) and the public builds on Kotlin 2.2.21 contradict it, so the guide's row reads as detekt's own build version.
- **What does not fit.**
  - 1.23.8 is silent on the one rule it is adopted for.
  - The command-line tool duplicates the classpath, toolchain and friend-path wiring the plugin already derives.
  - The plain task cannot run the rule.
- **The cost.** The build's detekt is a pre-release. It adds nothing to a published artifact, so a bump can break only `check`.
  Three open issues touch this build: #9793 (a stale jar view in a warm local daemon; a clean CI build is unaffected), #9121
  (`parallel`) and #9297 (the ktlint wrapper with `ignoreAnnotated`) (F11).

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
- **The umbrella's jars.** MyGameTools' fold of the modules' sources and Dokka output works on vanniktech 0.37.0 and Dokka 2.2.0.
  Its guards do not fit, because they use a fixed page count and hard-coded package names. Each guard instead derives its
  expectation from the modules' real source files, from the same module list:
  - presence is required for each module that has source;
  - a module with no source contributes nothing, and is not required to;
  - when no module has source at all, the guard fails (F8).
- **Where sources disagree.** Gradle advises a library to prefer a range with a preferred version over a bare strict version.
  Common practice aligns a library's own modules with a BOM, and no public library was found that publishes strict constraints
  between its own modules (F9). The organisation's versioning rule decides here: a bug fix may take a letter, Gradle orders a
  lettered version below the plain one, and only a strict pin keeps such a fix effective in a consumer's graph.

### 3. Versions, the documentation and ABI gates, and modules with no source yet

- **Versions** ([gates findings, F1 to F3](documentation-abi-and-publishing-gates.md#3-findings)). The published `kotlin-stdlib`
  requirement follows the Kotlin plugin's patch, 2.2.21.

  | Tool | Pin | Why |
  |---|---|---|
  | Kotlin Gradle plugin | 2.2.21 | the newest 2.2.x |
  | Dokka | 2.2.0 | 2.3.0 works on this stack but has an open regression, issue 4620: under `failOnWarning` it fails a documented subclass whose superclass holds private members typed from an `implementation` dependency, a shape the library's modules will have. 2.3.0's gains reach no published artifact and no gate. |
  | vanniktech | 0.37.0 | its changes since 0.36.0 touch only Central checksum files and logging. `SourcesJar.Sources()` replaces the deprecated boolean option. |
  | binary-compatibility validator | 0.18.2 | the newest release; it is in maintenance mode |

- **Dokka.**
  - V2 is already the default mode. `org.jetbrains.dokka.experimental.gradle.pluginMode=V2Enabled` in the root `gradle.properties`
    sets the finished state and keeps V1 unselectable (F4).
  - `dokkaGeneratePublicationHtml` joins `check` in the published-library convention and on the root. An undocumented public
    declaration then fails `./gradlew build` (F6).
  - The root needs the Kotlin plugin with `apply false`. Without it the aggregate renders empty and the build still passes, so
    the site check asserts that the aggregate holds a module page (F4, F5).
- **Modules with no main source** pass every gate with no placeholder declaration (F5):
  - Dokka warns nothing and writes no pages;
  - the validator writes a zero-byte dump, and `apiCheck` fails until that dump is committed;
  - vanniktech builds valid jars holding only a manifest;
  - signing is skipped for the snapshot version.

  So every module commits its `api/<module>.api` dump. It is zero bytes for the four feature modules that have no source yet and
  for the umbrella.
- **`nonPublicMarkers`.** Declarations marked `@ExperimentalBotToolsApi` leave the dump. The marker class itself and
  `@SupportedExtension` stay in it (F7).
- **Gradle 9 and test sources.** Gradle 9 fails `test` when a module has test sources but discovers no test, so a module's test
  source set holds a discoverable test or nothing (F5).
- **Where sources disagree.** The organisation's builds pin Dokka 2.3.0 (WebTools) and 2.2.0 (MyGameTools), and both pin vanniktech
  0.36.0. Dokka 2.2.0 and vanniktech 0.37.0 hold here for the reasons above.

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
- **Merge settings and Pages** (F6 to F8).
  - **Merge settings.** One repository update turns off squash and rebase merging and keeps merge commits.
  - **Pages.** The site is created with GitHub Actions as its source (`build_type: workflow`) before the first `pages.yml` run on
    `main`, and read back. The `github-pages` environment allows deployments from the default branch.
- **Actions, pinned by commit** (F9 to F11):

  | Action | Release | Note |
  |---|---|---|
  | `actions/checkout` | v7.0.1 | |
  | `actions/setup-java` | v6.3.0 | |
  | `gradle/actions/setup-gradle` | v5.0.2 | v5 is MIT-licensed. v6 moves its caching into a separately licensed component whose terms must be accepted, which is why WebTools stays on v5. Wrapper validation is on by default. |
  | `actions/upload-pages-artifact` | v5.0.0 | it drops dot files unless `include-hidden-files: true` is set, which `.nojekyll` needs |
  | `actions/deploy-pages` | v5.0.1 | |
  | `actions/upload-artifact` | v7.0.2 | |

- **Permissions** (F12). Each workflow defaults to `contents: read`. Only the Pages deploy job holds `pages: write` and
  `id-token: write`, and a job-level block sets every scope it does not list to none.
- **`release.yml`** (F13, F14).
  - **Trigger.** It matches a version tag with or without the leading `v`. The organisation's version scheme lets a bug fix carry a
    trailing letter, so the lettered forms are matched as well.
  - **The job.** A shell guard re-checks the tag. The job holds `contents: read`, builds the tagged commit from a clean checkout
    with `./gradlew build verifyReleasableMetadata`, and creates nothing.
- **Concurrency** (F15). CI cancels runs in progress on pull requests only. Pages deploys in one fixed group that never cancels a
  deployment in progress.
- **What does not fit:**
  - floating action tags;
  - an aggregate gate job;
  - required checks without the integration id, which a plain commit status could satisfy;
  - workflow-level Pages permissions, as the organisation's two earlier sites have them.

### 5. Logging

- **kotlin-logging 8.0.7** ([logging findings](logging-backend-check.md#3-findings)).
  - **Its dependencies.** The artifact is `io.github.oshai:kotlin-logging-jvm`, and it depends on `kotlin-stdlib` 2.1.21 alone.
    slf4j-api is compile-only in its build, so it does not bring slf4j-api with it.
  - **Compatibility.** Its class files are Java 8 with Kotlin metadata 2.0.0, so a Kotlin 2.2.x compiler reads them and Java 21
    runs them.
  - **On the JVM.** slf4j is its default backend.
    - With no slf4j provider present, slf4j prints one warning and discards every event.
    - With no slf4j-api at all, kotlin-logging cannot load.
    - Its first use prints a start-up line, which only the application switches off.
- **What a logging module declares.** Each module that logs declares `kotlin-logging-jvm` 8.0.7 and `org.slf4j:slf4j-api` 2.0.19,
  both `implementation`; 2.0.19 is the version JDA 6.7.0 and logback 1.6.7 ask for. Tests get `ch.qos.logback:logback-classic`
  1.6.7 as `testRuntimeOnly`.
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
