# Consuming unreleased bottools builds from MagicBot

For: SpartanLaboratories/KotlinBottools#1
Date read: 2026-10-20.
Applies to: Gradle 9.7.1 (`gradle/gradle` tag `v9.7.1`, commit `92f0512e7f06d84621afba191f75e265363890cf`); `com.vanniktech.maven.publish` 0.37.0 (tag `0.37.0`, commit `7017e3d3d1e8c2df57db1e9a216997e46a3b7e88`, the newest tag as of this date); JitPack docs at `jitpack/jitpack.io` commit `3a144724e2fc42d5d745b7f3050c2f6810746e1e`; GitHub Docs at `github/docs` commit `666463860bec200da6c8db9cb9334e7335d9b753`; `KotlinBottools` branch `ccr-2c690a64-fz5whf` @ `5ad9522` (`main` @ `b2f2078`); `MyGameTools` working tree on disk.

Nothing was built, published or run. Code shown below is a sketch to be proven in the walking skeleton.

## 1. Question

How does MagicBot, a separate repository on GitHub Actions, build against bottools builds that are not released, when:

- the only pre-1.0.0 version is `1.0.0-SNAPSHOT`;
- publishing uses `com.vanniktech.maven.publish` under `io.github.spartanlaboratories`;
- registry publishing is a deliberate manual act with no registry credentials in CI;
- a `-SNAPSHOT` publish from the default branch is the organisation's staging analogue for downstream projects;
- MagicBot builds through a composite build when the two checkouts sit side by side, and against `-SNAPSHOT` builds otherwise?

## 2. Bottom line

- **Use both mechanisms, in layers, and make the composite the one CI uses.**
  - MagicBot's `settings.gradle.kts` includes `../KotlinBottools` when that directory is a Gradle build, and falls back to the Central Portal snapshot repository when it is not.
  - MagicBot's GitHub Actions job checks this repository out beside its own checkout (`actions/checkout` documents the "side by side" layout), so CI always takes the composite path, needs no snapshot and no credential, and can pin the library to a commit.
  - The snapshot repository serves contributors who clone MagicBot alone.
- **Publish `1.0.0-SNAPSHOT` to the Central Portal by hand, from a clean checkout of `main`, with `./gradlew publishToMavenCentral`.**
  - The vanniktech plugin switches to `https://central.sonatype.com/repository/maven-snapshots/` by itself when the version ends in `-SNAPSHOT`, and does not require signing for snapshots.
  - This honours both organisation rules: the publish is a human act, CI holds no registry credential, and the artifact is the staging analogue.
  - Two maintainer-side prerequisites are unproven here: "Enable SNAPSHOTs" on the `io.github.spartanlaboratories` namespace, and anonymous read of the snapshot repository (Gaps G1, G2).
- **The library build must set `group` and use module directory names equal to the artifactIds, or declare substitutions.**
  - vanniktech's `coordinates(...)` changes only the publication coordinates, not `project.group`.
  - Gradle's automatic composite substitution matches `project.group:project.name` and its documentation lists "publication coordinates don't match" as a case that needs declared substitutions.
  - MyGameTools' convention plugin sets coordinates only, so copying it unchanged would leave the composite without automatic substitution.
- **Reject GitHub Packages, Gradle source dependencies and CI-held Central tokens.**
  - GitHub Packages requires a personal access token even to install public packages.
  - Source dependencies hard-code `master` as the default branch (this repository uses `main`), run the library as an included build anyway, and have no chapter left in the 9.7.1 user guide.
  - A CI-held Central token breaks the "no credentials in CI" rule, and no scoping of a Portal token to snapshots was found.
- **JitPack is the only credential-free automated option, and is held in reserve.** It serves different coordinates (`com.github.SpartanLaboratories.KotlinBottools`), needs a `jitpack.yml` to select JDK 21, and adds a third-party build service. Adopt it only if manual snapshots prove too stale.
- **Snapshots cannot be pinned reliably; the commit pin in CI is the reproducibility mechanism.**
  - Gradle's own guide says dependency locking "should not be used" with `-SNAPSHOT` versions.
  - Central deletes snapshots after about 90 days (one project's report and a search-tool paraphrase of Sonatype's page; the Sonatype page itself was unreachable).
  - A composite checkout at a recorded SHA reproduces exactly; a floating `main` checkout gives the earliest warning of drift.

## 3. Findings

### F1. Composite build: mechanics (established consensus, Gradle docs v9.7.1)

- A composite build is the documented way to develop a library and its consumer together: "composite builds let you work across both at the same time without publishing the library first. Gradle automatically substitutes the external dependency with a local source" (`composite_builds.adoc`, section "When to Use Composite Builds"). The same document's "Co-development Layout Example" shows exactly `includeBuild("../my-utils")` in the consumer's settings.
- Substitution is automatic by coordinates: Gradle "will inspect the group and name for the projects in the included build and substitute project dependencies for any external dependency matching `${project.group}:${project.name}`" (section "Dependency Substitution in Composite Builds"). The requested version is not part of that match, so MagicBot can declare `io.github.spartanlaboratories:bottools:1.0.0-SNAPSHOT` once and have it satisfied by the composite or by the snapshot repository. (The match rule says group and name only; I did not run it to confirm that a differing version is ignored.)
- Declared substitution is required when "the `maven-publish` or `ivy-publish` plugins are used for publishing and the publication coordinates don't match `${project.group}:${project.name}`" (section "When to Declare Substitutions Explicitly"). Declared form, in the consumer's settings: `includeBuild("../KotlinBottools") { dependencySubstitution { substitute(module("io.github.spartanlaboratories:bottools-core")).using(project(":bottools-core")) } }`.
- Limits: a substituted project dependency "will always point to the `default` configuration of the target project", so builds whose published metadata differs from the project (custom publication logic, POM tweaks, capabilities only in publication metadata) may behave differently included than published (section "When Substitutions Won't Work"). The vanniktech setup (`JavaLibrary` with Dokka javadoc jar and sources jar) adds artifacts, not variants, so none of those cases applies at first sight; the walking skeleton should still resolve the umbrella both ways and compare classpaths.
- Included builds are `project()`-opaque: "It is a common mistake to attempt to use `project()` notation to depend on a module that resides in an included build"; external coordinates are used instead (section "Referencing Projects").
- IDE: "Interacting with a composite build is generally similar to a regular multi-project build. Tasks can be executed, tests can be run, and builds can be imported into the IDE" (section "Interacting with a Composite Build"). A search-tool summary of JetBrains' help says IntelliJ IDEA imports included builds as modules; that page was unreachable (G5).

### F2. Composite build: build-logic and plugin-version differences (established consensus for isolation; inference for the consequences)

- "Each included build is *configured* in isolation — included builds do not share repositories, plugins, or properties with one another or with the root build" (section "Composite Build Layout"). User-defined `gradle.properties` of the root are not visible to included builds, and "Gradle runtime properties (such as `org.gradle.configuration-cache`) ... are only read from the *root build*".
- Consequence 1 (documentation plus inference): the library's own `settings.gradle.kts` `pluginManagement` and its `build-logic` run for the library's projects, so the library may pin Kotlin, Dokka and vanniktech versions that differ from MagicBot's. Plugin classpaths are separate per build. Gradle runtime settings (version, configuration cache, parallelism) come from MagicBot, because the Gradle that runs is MagicBot's wrapper. The library's wrapper is ignored. Both builds therefore need a Gradle version that satisfies the strictest plugin: vanniktech 0.37.0 documents "Gradle 9.0.0" and "Kotlin Gradle Plugin 2.2.0" as minimums (CHANGELOG, section 0.37.0).
- Consequence 2: Kotlin compatibility is a compile-time concern between the two builds' outputs. A compiler reads metadata up to one language version ahead of itself (GeneralTools finding F1 in `kmp-build-and-kotlin-compat.md`), so MagicBot's Kotlin must not be older than the library's `languageVersion`. Both pin 2.2.x, which makes this moot until one side moves.
- Build paths: "Unique Build Paths: No two included builds can share the same build path" (section "Requirements for Composite Builds"), and since Gradle 8.0 nested included builds are addressed by directory hierarchy (`upgrading_version_7.adoc`, "Changes to paths of included builds": "if you have the following hierarchy ... In Gradle 8.0 the invocation changes to `gradle :nested:nestedNested:compileJava`"). MyGameTools names its convention build `build-logic`; MagicBot and KotlinBottools will both do so. By the 8.0 rule they sit at `:build-logic` and `:KotlinBottools:build-logic`, which do not collide. The composite document's section on the same topic describes nesting as flattened; the two statements are not reconciled in the docs, so the collision case needs one test (G4). Giving each `build-logic` a distinct `rootProject.name` (for example `bottools-build-logic`) removes the doubt at no cost.
- Configuration cache: "File system state checked at configuration time (file presence, directory contents, etc.)" is a recorded configuration input (`configuration_cache.adoc`). A conditional `includeBuild` keyed on a directory check therefore invalidates the cache correctly when the sibling appears or disappears.

### F3. Library-side conventions needed for the composite to substitute (established consensus on the mechanism; MyGameTools gap observed locally)

- vanniktech `coordinates(groupId, artifactId, version)` sets the publications' coordinates only. Source at tag `0.37.0`, `MavenPublishBaseExtension.groupId(...)` and `artifactId(...)`: they assign `it.groupId` / `it.artifactId` on `mavenPublicationsWithoutPluginMarker`. The extension reads `project.group`, `project.name` and `project.version` only as defaults.
- MyGameTools: `gametools-core/build.gradle.kts` calls `coordinates("io.github.spartanlabsgaming", "gametools-core", "5.1.0")` and its convention plugins (`gametools.published-library.gradle.kts`, `gametools.kotlin-library.gradle.kts`) never set `group`. Its module directories already equal the artifactIds, which is half of what substitution needs.
- Consequence for this repository: the shared published-library convention plugin sets `group = "io.github.spartanlaboratories"` and `version` once (the `1.0.0-SNAPSHOT` literal lives in one place, which the release branch bumps), module directories are named exactly like the artifactIds (`bottools-core`, `bottools-data-sqlite`, `bottools-stats`, `bottools-plugins`, `bottools`), and `coordinates()` is then needed only for the POM. This is a convention for the build-logic plugin, not a MagicBot concern. The alternative, declared substitutions in MagicBot's settings, couples MagicBot to the library's module list and rots when a module is added.

### F4. Snapshot publishing with vanniktech 0.37.0 (established consensus, plugin docs and source)

- Procedure: "Snapshots can be published by setting the version to something ending with `-SNAPSHOT` and then running the following Gradle task: `./gradlew publishToMavenCentral`. The snapshot will be automatically available in the Central Portal snapshot repository directly after the task finished." (`docs/central.md` at tag `0.37.0`, section "Publishing snapshots").
- Repository URL, from source: `MavenPublishBaseExtension.publishToMavenCentral` sets `repository.setUrl("https://central.sonatype.com/repository/maven-snapshots/")` and `repository.credentials(PasswordCredentials::class.java)` when the version ends in `-SNAPSHOT`; otherwise it writes a local repository for the release bundle. The credentials are the Gradle properties `mavenCentralUsername` and `mavenCentralPassword`, the same user-token pair used for releases (the plugin's `registerMavenCentralBuildService` reads those two properties; changelog 0.33.0 step 4 says to use the generated token's "Username" and "Password" for them).
- Signing: "Signing is not required for snapshot builds, but if the configuration is present the build will still be signed." Source agrees: `signAllPublications` calls `setRequired(version.map { !it.endsWith("-SNAPSHOT") })`. The GeneralTools research (`kmp-maven-central-publishing.md`, F3) records the same behaviour for local `publishToMavenLocal`.
- Snapshots do not use the release bundle upload: `MavenCentralBuildService.registerProject` returns immediately for `-SNAPSHOT` versions, so no deployment id, no zip, no validation, no Portal click. A snapshot publish takes effect as soon as the Gradle task ends.
- Namespace enablement: "If you want to publish snapshots of your project tap the 3 dots next to your namespace and select 'Enable SNAPSHOTs'" (CHANGELOG, section 0.33.0). Snapshot support arrived in 0.31.0: "Make sure to enable snapshots for your namespace on central.sonatype.com" (CHANGELOG, section 0.31.0). Without it the upload fails with HTTP 403 (reported on the plugin's issue tracker, `vanniktech/gradle-maven-publish-plugin` issue 891, read through `WebFetch`, one source).
- Mixed publishing was fixed in 0.34.0: "It's now possible to mix SNAPSHOT versions and release versions when running `publish` tasks." Not needed here, since every pre-1.0.0 build is a snapshot.
- Retention: Sonatype's page was unreachable. A search-tool paraphrase of it says snapshots "are cleaned up after a period of time (currently 90 days)" and that "no validation is performed"; the `eisop/checker-framework` issue 2109 says "Central deletes snapshots after ~90 days". Treat 90 days as likely, not verified (G2).
- Token scoping: nothing found. The Portal's token page, as paraphrased by a search tool, lists only a display name and an expiry. One account-level token covers snapshots and releases (G3).

### F5. Consuming the snapshot repository from Gradle (common practice for the URL; Gradle docs for the declaration)

- Square's Moshi README (commit `889013ec2edb8d8034902662a1dc8c4f3b3f8111`) points users at "the Central Portal Snapshots repository" with `https://central.sonatype.com/repository/maven-snapshots/`, with no credentials mentioned. No Gradle snippet was found in a primary Sonatype source.
- The Gradle declaration uses documented filtering: `mavenContent { snapshotsOnly() }` and `content { includeGroup(...) }` (Gradle docs snippet `declaringRepositories-filtering`, tag `v9.7.1`). Restricting the repository to `io.github.spartanlaboratories` means the snapshot host is never asked for other groups, and the `snapshotsOnly()` call means releases are never taken from it.
- Gradle treats Maven `-SNAPSHOT` versions as changing modules: "By default, Gradle caches these dependencies (including dynamic versions and changing modules) for 24 hours, meaning it does not contact remote repositories for new versions during this time" (`dependency_caching.adoc`). `--refresh-dependencies` or `cacheChangingModulesFor(0, "seconds")` shortens that.
- Anonymous read of that repository is assumed from the Moshi README and Maven convention; the Sonatype page that would state it was unreachable (G1).

### F6. Options that honour "no registry credentials in CI" (assessment)

| Option | Credential in CI? | Verdict |
|---|---|---|
| Maintainer publishes `-SNAPSHOT` by hand to the Central Portal | None; the token sits in the maintainer's `~/.gradle/gradle.properties` | **Adopt.** Matches the working agreement's staging analogue. Cost: staleness (see F8). |
| CI publishes `-SNAPSHOT` from `main` with a Portal token | Yes | Common practice (Moshi's `.github/workflows/build.yml` runs `./gradlew publish` on its default branch with `ORG_GRADLE_PROJECT_mavenCentralUsername` / `...Password` secrets) but contradicts the agreement. Rejected. |
| GitHub Packages (Maven) | `GITHUB_TOKEN` in CI for publishing; consumers need a PAT | Rejected: "You need an access token to publish, install, and delete private, internal, and public packages", and "GitHub Packages only supports authentication using a personal access token (classic)" (`github/docs` reusables `authenticate-packages`, `packages-classic-pat-only`). Anonymous reads are not offered, so every MagicBot contributor would need a PAT. |
| JitPack | None; JitPack builds from the public repository | Viable fallback; see F7. |
| Gradle source dependencies | None | Rejected; see F7. |
| MagicBot CI checks out this repository beside its own | None; a public repository needs no token | **Adopt as the CI path.** |

### F7. JitPack and source dependencies in detail

**JitPack** (documentation read from the `jitpack/jitpack.io` repository, commit `3a144724`):

- Coordinates for any consumer: group `com.github.Username`, version "Release tag, commit hash or `master-SNAPSHOT`", and "Adding `-SNAPSHOT` will build the latest commit on the master branch" (README, "Building with JitPack" and "Snapshots"). Branch names with slashes use `~`. For this repository the version is `main-SNAPSHOT` or a short commit hash.
- Multi-module Gradle builds are supported: "If the project builds multiple modules JitPack publish all of them. It will also generate a module that includes all of repository's modules" and "To get individual artifacts of multi-module builds use `com.github.User.Repo` as group Id and `ModuleName` as the artifact Id" (BUILDING.md, "Multi-module projects"). So the artifacts would be `com.github.SpartanLaboratories.KotlinBottools:bottools-core:main-SNAPSHOT`, which is not the `io.github.spartanlaboratories` group the composite substitutes. MagicBot would need either a conditional dependency notation or a resolution-time substitution `substitute(module("io.github.spartanlaboratories:bottools")).using(module("com.github.SpartanLaboratories.KotlinBottools:bottools:main-SNAPSHOT"))`. JitPack's custom-domain feature maps a DNS name to an organisation and does not cover `io.github.*`. Whether JitPack also rewrites inter-module dependencies inside the generated POMs is not documented in what I read (G6).
- JDK: "JitPack will compile projects using OpenJDK Java 8" by default (BUILDING.md, "Java version"). A `jitpack.yml` with `jdk: - openjdk9` selects another JDK, and SDKMAN commands in `before_install` select any other. A public project that targets 21 does it with both: libgdx-library-template's `jitpack.yml` (commit `97a1188bf2e68dc591bd2d04e2ded37ecba7674d`) lists `sdk install java 21-open`, `sdk use java 21-open` and `jdk: - openjdk21`. That shows the recipe exists, not that it works for Kotlin 2.2 plus Gradle 9.7 here (G6).
- Behaviour: builds run on demand, "Up to 15 minutes" (FAQ), so the first request of a new commit can hit Gradle's HTTP timeouts (FAQ gives `systemProp.org.gradle.internal.http.connectionTimeout=180000`); `-SNAPSHOT` "will always provide the latest build therefore its only recommended during development" (FAQ); a Gradle dependency on `main-SNAPSHOT` is cached as a changing module (24 hours by default). Builds run `./gradlew build publishToMavenLocal` when a Gradle build is detected, so the library's tests run on JitPack unless `jitpack.yml` overrides `install`. vanniktech's snapshot rule applies there because the project version is a `-SNAPSHOT`, so unsigned `publishToMavenLocal` works; a release-style version would demand a key.
- Why held back: a third party builds and hosts the artifacts, the coordinates differ from the final ones, and the build environment (JDK 21, Gradle 9.7, Dokka) is untested on it.

**Gradle source dependencies** (`sourceControl { gitRepository(uri) { producesModule("group:name") } }`):

- Status: the feature exists in Gradle 9.7.1 (`platforms/software/version-control`, package `org.gradle.vcs`), but the 9.7.1 user guide has no chapter on it (searching the user-guide sources for `sourceControl`, `gitRepository` and "source dependenc" finds only the dependency-locking limitation "Dependency locking does not currently apply to source dependencies"). Its 2018 introduction called it incubating; that blog was unreachable (G6).
- Hard limit seen in source: `GitVersionControlSystem.getDefaultBranch` accepts only `refs/heads/master` ("`// TODO: Default branch can be different from just master`"), so a `main` repository needs an explicit `branch("main")` version constraint.
- Floating refs are re-resolved on every build: `DefaultVcsVersionWorkingDirResolver` sets an always-expired cache entry for dynamic selectors. Every MagicBot build would therefore contact GitHub and compile the library.
- It adds nothing over the composite: Gradle builds the checked-out repository as an included build, and substitution matches `producesModule` coordinates. It would also compile the library on every contributor machine and every CI run.

### F8. Behaviour when the library's `main` moves faster than MagicBot (assessment)

| Mechanism | Pin possible? | Reproducible? | Failure mode |
|---|---|---|---|
| Composite, sibling checkout at a SHA | Yes: a recorded SHA is checked out | Exactly | None until the pin is bumped; bump PR shows the breaking change in MagicBot's CI |
| Composite, sibling at `main` | No | No | MagicBot PRs fail when library `main` breaks, even for unrelated changes |
| Central snapshot, floating `1.0.0-SNAPSHOT` | No | No; Gradle's guide: "Using dynamic versions and changing modules can lead to unreproducible builds"; locking "should not be used with changing versions (e.g., `-SNAPSHOT`)" (`dependency_locking.adoc`) | The newest manual publish wins; the cache holds a stale one for 24 hours |
| Central snapshot, timestamped version | Possible in principle | Until Central removes it (about 90 days, G2) | Pin disappears silently |
| JitPack commit hash | Yes (`<short-sha>` as the version) | Yes: "Once JitPack builds a project it keeps the build artifacts" (FAQ) | Third-party dependency; hash coordinates differ from the final ones |
| Source dependency at a commit | Yes | Yes | See F7 |

The tension is real: the cheapest mechanism (floating) is the least reproducible, and the reproducible ones (SHA pin, JitPack hash) cost a bump per library change. The composite with a recorded SHA gets both for free in CI because the checkout is a Git operation, and the bump is a one-line PR.

## 4. How comparable projects do it

- **Gradle's own guidance** treats the composite as the answer to this exact problem: "Developing libraries and consumers together" is the first of three listed use cases, with `includeBuild("../my-utils")` as the example (`composite_builds.adoc`, `gradle/gradle` tag `v9.7.1`), and a separate how-to, "How to Use a Local Fork of a Module Dependency with Gradle" (`how_to_use_local_forks.adoc`), says "Work with an **unreleased** version of a library" and "You don't need explicit substitution statements".
- **Moshi (Square)** publishes snapshots from CI on every default-branch build (`.github/workflows/build.yml` at commit `889013ec`: step "Publish (default branch only)", `./gradlew publish`, with `ORG_GRADLE_PROJECT_mavenCentralUsername`, `...mavenCentralPassword`, `...signingInMemoryKey` as secrets) and documents the Central Portal snapshot repository in its README. This is the common practice for libraries that accept CI credentials; it is the option the organisation's agreement excludes.
- **MyGameTools** (this organisation) runs no CI publishing: `ci.yml` has `contents: read` permissions and its jobs only test, document and assemble; its `CONTRIBUTING.md` gives `./gradlew publishAndReleaseToMavenCentral` as the manual release step. Its conventions (`build-logic` included build; Kotlin, serialization and Dokka versions declared once in `pluginManagement`; vanniktech 0.36.0; Gradle 9.7.1) are the base for this repository's. It has no downstream consumer yet, so it is no precedent for snapshot consumption.
- **GitHub Actions** documents a "Checkout multiple repos (side by side)" recipe: two `actions/checkout@v4` steps with distinct `path:` values, the second with `repository:` (`actions/checkout` tag `v4`, commit `11d5960a326750d5838078e36cf38b85af677262`, README). `path` is "Relative path under $GITHUB_WORKSPACE", so the sibling layout is `<workspace>/MagicBot` and `<workspace>/KotlinBottools`, and the Gradle step runs with `working-directory: MagicBot`.

## 5. Pitfalls and regrets

- **Silent coordinate mismatch.** If the library build only calls `coordinates(...)`, the composite includes the build but substitutes nothing: Gradle resolves `io.github.spartanlaboratories:bottools:1.0.0-SNAPSHOT` from the snapshot repository and the developer edits the sibling in vain. Guard with a MagicBot build check (a task that fails if `bottools-core` resolves to a non-project component while the composite is active) or a test in the library's build-logic TestKit suite.
- **Snapshot staleness and expiry.** A snapshot that nobody republishes ages out of Central (about 90 days) and the no-sibling fallback breaks with a plain resolution error. Mitigation: publish at the end of every phase and before announcing a MagicBot release; note the date of the last publish in `CONTRIBUTING.md`; consider a scheduled reminder, not a scheduled publish.
- **Publishing the wrong tree.** A manual publish from a feature branch puts unreviewed code on the staging analogue. Put a guard in the convention plugin (fail `publishToMavenCentral` for a `-SNAPSHOT` unless the checkout is on `main` with a clean tree), or document it in the exact command.
- **403 on first upload.** The namespace's "Enable SNAPSHOTs" switch is separate from the ability to publish releases (plugin issue 891; eisop issue 2109). Flip it before the first attempt and check the badge on the namespace if downloads stop (the Sonatype page was unreachable, G1).
- **Cache surprises.** 24 hours of caching means a fresh snapshot is invisible to a developer who built yesterday; document `--refresh-dependencies`.
- **Included build runs with MagicBot's Gradle.** A library change that raises its plugin minimums (for example a vanniktech release requiring Gradle 9.x) breaks the composite in MagicBot until MagicBot's wrapper moves. Keep the two wrappers within one minor.
- **Properties do not travel.** The library's `gradle.properties` (for example MyGameTools' Dokka `pluginMode` switches) applies to the library's own build and is not seen by MagicBot, and the reverse holds. Do not put values MagicBot also needs only in the library's properties file.
- **CI test scope.** The composite build compiles the library; MagicBot's `./gradlew build` does not run the library's tests. They stay in the library's own CI.

## 6. Recommendation for this repository

**Shape**

1. Composite first, snapshots as the fallback, one dependency declaration for both. MagicBot's `settings.gradle.kts` includes the sibling when present and registers the snapshot repository for the library's group:

   ```kotlin
   // settings.gradle.kts (MagicBot) -- sketch, not run
   val bottoolsDir = file(providers.gradleProperty("bottools.dir").getOrElse("../KotlinBottools"))
   val useSibling = providers.gradleProperty("bottools.composite").map(String::toBoolean).getOrElse(true)
   if (useSibling && bottoolsDir.resolve("settings.gradle.kts").isFile) includeBuild(bottoolsDir)

   dependencyResolutionManagement {
       repositories {
           mavenCentral()
           maven("https://central.sonatype.com/repository/maven-snapshots/") {
               name = "centralSnapshots"
               mavenContent { snapshotsOnly() }
               content { includeGroup("io.github.spartanlaboratories") }
           }
       }
   }
   // build.gradle.kts: implementation("io.github.spartanlaboratories:bottools:1.0.0-SNAPSHOT")
   ```

   `-Pbottools.composite=false` is the opt-out for reproducing the no-sibling path locally; `-Pbottools.dir=...` points at a checkout elsewhere. After 1.0.0 the declaration becomes `bottools:1.0.0` with no other change, and the composite stays a development override.
2. The library's shared published-library convention plugin sets `group` and `version` once, module directories equal artifactIds, `build-logic` gets a distinct `rootProject.name`, and the toolchain is JDK 21 in both repositories. `signAllPublications()` stays as in MyGameTools because signing is optional for snapshots and mandatory for 1.0.0.
3. The maintainer publishes `1.0.0-SNAPSHOT` with `./gradlew publishToMavenCentral` from a clean `main`, using the token in `~/.gradle/gradle.properties` (names `mavenCentralUsername`, `mavenCentralPassword`). `CONTRIBUTING.md` carries the exact command, the "Enable SNAPSHOTs" prerequisite, the 90-day expiry note, and the consumer repository declaration above. No workflow in either repository holds a registry credential.
4. MagicBot CI checks out both repositories side by side and runs Gradle in the MagicBot directory. The library ref is read from a one-line file in MagicBot (for example `bottools.ref`, holding a commit SHA); a scheduled workflow builds against `main` to warn when the pin lags. Sketch, not run:

   ```yaml
   - uses: actions/checkout@v4
     with: { path: MagicBot }
   - uses: actions/checkout@v4
     with:
       repository: SpartanLaboratories/KotlinBottools
       path: KotlinBottools
       ref: ${{ env.BOTTOOLS_REF }}   # from MagicBot/bottools.ref; 'main' in the scheduled drift job
   - uses: actions/setup-java@v4
     with: { distribution: temurin, java-version: "21" }
   - uses: gradle/actions/setup-gradle@v4
   - run: ./gradlew build
     working-directory: MagicBot
   ```

**Why this and not the obvious alternative.** The obvious alternative is "CI publishes snapshots on every merge to main", which is common practice and removes staleness. It is rejected because it needs a Portal token in CI and the Portal token has no documented scope narrower than the account (G3); the composite already gives CI an exact, credential-free build of the library, so the snapshot path only needs to serve the occasional lone checkout, where weekly-grade freshness is enough. If staleness hurts in practice, add JitPack for that path (a `jitpack.yml` with JDK 21 and a conditional substitution) before adding a CI credential.

## 7. Load-bearing claims

1. **Composite builds are the documented route for developing a library and its consumer together, with automatic substitution.**
   Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/structuring-builds/composite_builds.adoc>, section "When to Use Composite Builds", Gradle 9.7.1.
   Quote: "If you maintain a library that another project depends on, composite builds let you work across both at the same time without publishing the library first." and "Gradle automatically substitutes the external dependency with a local source".
2. **Automatic substitution matches `project.group:project.name`, and publication coordinates that differ need declared substitutions.**
   Source: same file, sections "Dependency Substitution in Composite Builds" and "When to Declare Substitutions Explicitly", Gradle 9.7.1.
   Quote: "Gradle will inspect the group and name for the projects in the included build and substitute project dependencies for any external dependency matching `${project.group}:${project.name}`." and "When the `maven-publish` or `ivy-publish` plugins are used for publishing and the publication coordinates don't match `${project.group}:${project.name}`."
3. **Included builds are configured in isolation; Gradle runtime properties come from the root build only.**
   Source: same file, sections "Composite Build Layout" and "Configuring a Composite Build", Gradle 9.7.1.
   Quote: "Each included build is *configured* in isolation — included builds do not share repositories, plugins, or properties with one another or with the root build" and "Gradle runtime properties (such as `org.gradle.configuration-cache`) are a special case — they are only read from the *root build* and applied to the entire invocation."
4. **Build paths must be unique, and nested included builds are addressed by directory hierarchy since Gradle 8.0.**
   Source: same composite file, section "Requirements for Composite Builds"; and <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/releases/upgrading/upgrading_version_7.adoc>, "Changes to paths of included builds".
   Quote: "*Unique Build Paths:* No two included builds can share the same build path." and "In order to handle conflicts between nested included build names better, Gradle now uses the directory hierarchy of included builds to assign the build path."
5. **The configuration cache records file-system state read at configuration time.**
   Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/optimizing-builds/configuration-cache/configuration_cache.adoc>, Gradle 9.7.1.
   Quote: "File system state checked at configuration time (file presence, directory contents, etc.)".
6. **The vanniktech plugin publishes snapshots with `publishToMavenCentral` to the Central Portal snapshot repository, signing optional.**
   Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/docs/central.md>, section "Publishing snapshots", tag 0.37.0.
   Quote: "Snapshots can be published by setting the version to something ending with `-SNAPSHOT` and then running the following Gradle task:" ... "The snapshot will be automatically available in the Central Portal snapshot repository directly after the task finished." and "Signing is not required for snapshot builds, but if the configuration is present the build will still be signed."
7. **The plugin selects the snapshot URL and password credentials for `-SNAPSHOT` versions and skips the release bundle.**
   Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/MavenPublishBaseExtension.kt>, symbol `MavenPublishBaseExtension.publishToMavenCentral`; and `.../central/MavenCentralBuildService.kt`, symbol `MavenCentralBuildService.registerProject`, tag 0.37.0.
   Quote: `repository.setUrl("https://central.sonatype.com/repository/maven-snapshots/")` followed by `repository.credentials(PasswordCredentials::class.java)`; and `if (version.endsWith("-SNAPSHOT")) { return }`.
8. **`coordinates(...)` sets publication coordinates only; `project.group`/`project.name` are mere defaults.**
   Source: same `MavenPublishBaseExtension.kt`, symbols `groupId`, `artifactId` (property conventions) and `coordinates`, tag 0.37.0.
   Quote: `.convention(project.provider { project.group.toString() })` and `project.mavenPublicationsWithoutPluginMarker { it.groupId = this.groupId.get() }`.
9. **Signing is not required for snapshot versions.**
   Source: same file, symbol `signAllPublications`, tag 0.37.0.
   Quote: `project.gradleSigning.setRequired(version.map { !it.endsWith("-SNAPSHOT") })`.
10. **Snapshots must be enabled per namespace in the Portal; snapshot support exists since plugin 0.31.0.**
    Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md>, sections 0.33.0 and 0.31.0.
    Quote: "Optional: If you want to publish snapshots of your project tap the 3 dots next to your namespace and select "Enable SNAPSHOTs"." and "Add support for publishing snapshots to Central Portal. Make sure to enable snapshots for your namespace on central.sonatype.com."
11. **vanniktech 0.37.0 is the newest release and requires Gradle 9.0.0 and KGP 2.2.0 at minimum.**
    Source: same CHANGELOG, section 0.37.0 (2026-06-21); tag list of `vanniktech/gradle-maven-publish-plugin` shows `0.37.0` as newest (read 2026-10-20).
    Quote: "#### Minimum supported versions - JDK 17 - Gradle 9.0.0 - Android Gradle Plugin 8.13.0 - Kotlin Gradle Plugin 2.2.0".
12. **Another project documents the Central Portal snapshot URL for consumers, and publishes snapshots from CI.**
    Source: <https://github.com/square/moshi/blob/889013ec2edb8d8034902662a1dc8c4f3b3f8111/README.md> and <https://github.com/square/moshi/blob/889013ec2edb8d8034902662a1dc8c4f3b3f8111/.github/workflows/build.yml>.
    Quote: "Snapshots of the development version are available in [the Central Portal Snapshots repository][snap]." with `[snap]: https://central.sonatype.com/repository/maven-snapshots/`; and in the workflow, `name: Publish (default branch only)` ... `run: ./gradlew publish` ... `ORG_GRADLE_PROJECT_mavenCentralUsername: ${{ secrets.SONATYPE_CENTRAL_USERNAME }}`.
13. **Gradle repository filtering supports snapshot-only and group-restricted repositories.**
    Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/snippets/reference/dependency-management/declaring-repositories/declaringRepositories-filtering/kotlin/build.gradle.kts>, Gradle 9.7.1.
    Quote: `mavenContent { snapshotsOnly() }` and `includeGroup("my.company")`.
14. **Gradle caches changing modules for 24 hours; locking should not be used with `-SNAPSHOT`; dynamic/changing versions are unreproducible.**
    Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/reference/dependency-management/dependency-management/dependency_caching.adoc> and `dependency_locking.adoc` and `.../declaring-dependencies/dependency_versions.adoc`, Gradle 9.7.1.
    Quote: "By default, Gradle caches these dependencies (including dynamic versions and changing modules) for 24 hours, meaning it does not contact remote repositories for new versions during this time." and "it **should not be used** with changing versions (e.g., `-SNAPSHOT`)" and "Using dynamic versions and changing modules can lead to unreproducible builds."
15. **GitHub Packages Maven needs an access token to install, even public packages, and accepts only a classic PAT.**
    Source: <https://github.com/github/docs/blob/666463860bec200da6c8db9cb9334e7335d9b753/data/reusables/package_registry/authenticate-packages.md> and `.../packages-classic-pat-only.md`.
    Quote: "You need an access token to publish, install, and delete private, internal, and public packages." and "only supports authentication using a {% data variables.product.pat_v1 %}" (the variable is GitHub Docs' template for "personal access token (classic)").
16. **JitPack coordinates, snapshots, multi-module and JDK facts.**
    Source: <https://github.com/jitpack/jitpack.io/blob/3a144724e2fc42d5d745b7f3050c2f6810746e1e/README.md>, <.../BUILDING.md>, <.../FAQ.md>.
    Quote: "*Version:* Release tag, commit hash or `master-SNAPSHOT`"; "If the project builds multiple modules JitPack publish all of them."; "To get individual artifacts of multi-module builds use `com.github.User.Repo` as group Id and `ModuleName` as the artifact Id."; "JitPack will compile projects using OpenJDK Java 8."; "Note that -SNAPSHOT version will always provide the latest build therefore its only recommended during development and not in production."; "Up to 15 minutes".
17. **A public project selects JDK 21 on JitPack with SDKMAN plus `jdk: openjdk21`.**
    Source: <https://github.com/tommyettinger/libgdx-library-template/blob/97a1188bf2e68dc591bd2d04e2ded37ecba7674d/jitpack.yml>.
    Quote: `before_install: - sdk install java 21-open - sdk use java 21-open jdk: - openjdk21`.
18. **Gradle source dependencies resolve the default branch as `master` only.**
    Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/software/version-control/src/main/java/org/gradle/vcs/git/internal/GitVersionControlSystem.java>, symbol `GitVersionControlSystem.getDefaultBranch`, tag v9.7.1.
    Quote: `// TODO: Default branch can be different from just master` followed by `if (ref.getName().equals("refs/heads/master"))`.
19. **GitHub's checkout action documents the side-by-side layout.**
    Source: <https://github.com/actions/checkout/blob/v4/README.md>, section "Checkout multiple repos (side by side)", tag `v4`.
    Quote: `path: main` ... `repository: my-org/my-tools` ... `path: my-tools`; and the input description "Relative path under $GITHUB_WORKSPACE to place the repository".
20. **Snapshot publishing 403s without namespace enablement; retention is about 90 days (single reports).**
    Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/issues/891> and <https://github.com/eisop/checker-framework/issues/2109> (both read through `WebFetch` on 2026-10-20).
    Quote (issue 891, advice to a reporter): "make sure that snapshots are enabled for your namespace". Quote (eisop 2109): "Central deletes snapshots after ~90 days". Both are paraphrases returned by `WebFetch`, not verbatim page text; the verbatim primary page is unreachable, so treat claim 20 as unverified.

## 8. Gaps

- **G1. Sonatype's snapshot page is unreachable (`central.sonatype.org` and `central.sonatype.com` refused by the environment).** Unverified (source unreachable: central.sonatype.org, central.sonatype.com): that the snapshot repository can be read anonymously, the retention figure and whether it counts per build or per version, and whether snapshots are unvalidated and unsigned on arrival. Evidence used instead: the plugin's source and docs (URL, signing optional), Moshi's README (consumers use the URL), a search-tool paraphrase of the Sonatype page (90 days, no validation), and two GitHub issues. Test before relying on it: from a machine with network access, `curl -I` on a published snapshot's `maven-metadata.xml` without credentials.
- **G2. The namespace `io.github.spartanlaboratories` has not been checked for "Enable SNAPSHOTs".** This is a maintainer action in the Portal; the GeneralTools research carries the same open item. First publish will 403 until it is done.
- **G3. Token scoping.** No source found that a Portal user token can be limited to snapshots, a namespace or publish-only use. The plugin uses the single account token for both. Treat any token placed in CI as able to upload release bundles for every namespace on the account.
- **G4. Nested `build-logic` naming.** Two Gradle documents are not reconciled (nested builds "flattened" versus addressed by directory hierarchy since 8.0). Same-named `build-logic` builds in MagicBot and the library are expected to be fine; one TestKit or CI check in the walking skeleton settles it. Distinct `rootProject.name` values remove the question.
- **G5. IDE behaviour.** Only Gradle's statement that composite builds can be imported was read. JetBrains' help page (`www.jetbrains.com`) was unreachable (G-host: www.jetbrains.com); a search-tool summary says IntelliJ IDEA imports included builds as modules and offers a "Composite Build Configuration" action. Switching between composite and snapshot modes needs a Gradle re-sync; not tested.
- **G6. JitPack and source-dependency specifics.** Unverified (source unreachable: jitpack.io, docs.gradle.org, blog.gradle.org): the current JDK list on JitPack's builders; whether JitPack rewrites inter-module POM dependencies to its group; whether Gradle 9.7.1 plus Kotlin 2.2 plus Dokka build there; the official status label (incubating or not) of Gradle source dependencies. Facts used come from the JitPack documentation repository and the Gradle source at `v9.7.1`.
- **G7. Substitution not exercised.** Nothing was built. In particular the claim that the composite ignores the requested version, that the `isFile` check in the settings sketch behaves under configuration cache, and that the umbrella's classpath is identical included versus published, all need the walking skeleton.
- **G8. Hosts unreachable from this environment (HTTP refused by the proxy):** `docs.gradle.org`, `blog.gradle.org`, `central.sonatype.org`, `central.sonatype.com`, `jitpack.io`, `docs.github.com`, `www.jetbrains.com`, `dev.to`, `code.cash.app`, `eclipse.dev`, `docs.webforj.com`. `repo1.maven.org` answered 429 for the plugin's metadata; the newest release was taken from the repository's tag list instead.
- **G9. MagicBot's repository was not available.** Its build files, wrapper and CI are assumed to follow the MyGameTools shape; nothing about it was read.
