# Consuming unreleased bottools builds from MagicBot

For: SpartanLaboratories/KotlinBottools#1
Date read: 2026-10-20.
Applies to:

- Gradle 9.7.1 (`gradle/gradle` tag `v9.7.1`, commit `92f0512e7f06d84621afba191f75e265363890cf`; user guide at `docs.gradle.org/9.7.1/userguide/`). `docs.gradle.org/current` serves Gradle 9.8.2 (released 2026-10-19); its composite-builds chapter is word-for-word the 9.7.1 text.
- `com.vanniktech.maven.publish` 0.37.0 (tag `0.37.0`, commit `7017e3d3d1e8c2df57db1e9a216997e46a3b7e88`, published 2026-06-21; the newest release on Maven Central and in the tag list).
- Sonatype Central documentation at `central.sonatype.org` (pages "Publish Portal Snapshots", "Generating a Portal Token for Publishing", "Maven Central Publishing Limits", FAQ "Does the Portal support SNAPSHOT releases?"), and the live snapshot repository `central.sonatype.com/repository/maven-snapshots/` (Sonatype Nexus Repository 3.76.1-01).
- JitPack documentation at `docs.jitpack.io` and `jitpack/jitpack.io` commit `3a144724e2fc42d5d745b7f3050c2f6810746e1e`.
- GitHub Docs (`docs.github.com`, GitHub Packages Gradle registry page; `github/docs` commit `666463860bec200da6c8db9cb9334e7335d9b753`).
- JetBrains IntelliJ IDEA documentation 2026.2 ("Gradle projects").
- `KotlinBottools` branch `ccr-2c690a64-fz5whf` @ `5ad9522` (`main` @ `b2f2078`); `MyGameTools` working tree on disk.

Nothing was built, published or run. Code shown below is a sketch to be proven in the walking skeleton.

## 1. Question

How does MagicBot, a separate public repository on GitHub Actions, build against bottools builds that are not released, when:

- the only pre-1.0.0 version is `1.0.0-SNAPSHOT`;
- publishing uses `com.vanniktech.maven.publish` under `io.github.spartanlaboratories`;
- registry publishing is a deliberate manual act with no registry credentials in CI;
- a `-SNAPSHOT` publish from the default branch is the organisation's staging analogue for downstream projects;
- MagicBot builds through a composite build when the two checkouts sit side by side, and against `-SNAPSHOT` builds otherwise?

A second library, WebTools, is consumed by the bottools build itself; how an unreleased WebTools module is consumed is a separate question and is not covered here.

## 2. Bottom line

- **The snapshot path can serve MagicBot, with one obligation: someone must republish.**
  - Sonatype documents the snapshot repository's consumer configuration without credentials, and an unauthenticated request for another project's snapshot metadata returned HTTP 200 (2026-10-20).
  - Sonatype states that snapshots "are cleaned up after a period of time (currently 90 days)". The page does not say whether the 90 days run from the first upload or from the latest upload of a component.
  - A snapshot that nobody republishes therefore disappears, and the lone-checkout fallback breaks with a plain resolution error. The maintainer's publish cadence has to be shorter than 90 days.
- **Use both mechanisms, in layers, and make the composite the one CI uses.**
  - MagicBot's `settings.gradle.kts` includes `../KotlinBottools` when that directory is a Gradle build, and falls back to the Central Portal snapshot repository when it is not.
  - MagicBot's GitHub Actions job checks this repository out beside its own checkout (`actions/checkout` documents the "side by side" layout), so CI always takes the composite path, needs no snapshot and no credential, and can pin the library to a commit.
  - The snapshot repository serves contributors who clone MagicBot alone.
- **Publish `1.0.0-SNAPSHOT` to the Central Portal by hand, from a clean checkout of `main`, with `./gradlew publishToMavenCentral`.**
  - The vanniktech plugin switches to `https://central.sonatype.com/repository/maven-snapshots/` by itself when the version ends in `-SNAPSHOT`, and does not require signing for snapshots. Sonatype performs no validation on snapshots.
  - This honours both organisation rules: the publish is a human act, CI holds no registry credential, and the artifact is the staging analogue.
  - One maintainer-side prerequisite remains unproven: "Enable SNAPSHOTs" on the `io.github.spartanlaboratories` namespace (Gap G2). Sonatype documents it as a per-namespace menu action in the Portal, and uploads fail with HTTP 403 without it.
- **The library build must set `group` and use module directory names equal to the artifactIds, or declare substitutions.**
  - vanniktech's `coordinates(...)` changes only the publication coordinates, not `project.group`.
  - Gradle's automatic composite substitution matches `project.group:project.name` (the source keys on group and module name only, so the requested version is ignored), and its documentation lists "publication coordinates don't match" as a case that needs declared substitutions.
  - MyGameTools' convention plugin sets coordinates only, so copying it unchanged would leave the composite without automatic substitution.
- **Reject GitHub Packages, Gradle source dependencies and CI-held Central tokens.**
  - GitHub Packages requires a personal access token (classic) even to install public packages.
  - Source dependencies hard-code `master` as the default branch (this repository uses `main`), run the library as an included build anyway, have no chapter in the user guide, and were announced as incubating and unfit for production; their 2018 announcement also says a source dependency cannot target a build that contains included builds, which `build-logic` is.
  - A CI-held Central token breaks the "no credentials in CI" rule, and Sonatype documents a Portal user token with only a display name and an expiry, so no narrower scope exists to limit it to snapshots.
- **JitPack is the only credential-free automated option, and is held in reserve.** It serves different coordinates (`com.github.SpartanLaboratories.KotlinBottools`), needs a `jitpack.yml` to select JDK 21, and adds a third-party build service. Adopt it only if manual snapshots prove too stale.
- **Snapshots cannot be pinned reliably; the commit pin in CI is the reproducibility mechanism.**
  - Gradle's own guide says dependency locking "should not be used" with `-SNAPSHOT` versions.
  - A composite checkout at a recorded SHA reproduces exactly; a floating `main` checkout gives the earliest warning of drift.

## 3. Findings

### F1. Composite build: mechanics (established consensus, Gradle docs 9.7.1)

- A composite build is the documented way to develop a library and its consumer together: "composite builds let you work across both at the same time without publishing the library first. Gradle automatically substitutes the external dependency with a local source" (composite builds chapter, section "When to Use Composite Builds"). The same chapter's "Co-development Layout Example" shows exactly `includeBuild("../my-utils")` in the consumer's settings.
- Substitution is automatic by coordinates: Gradle "will inspect the group and name for the projects in the included build and substitute project dependencies for any external dependency matching `${project.group}:${project.name}`" (section "Dependency Substitution in Composite Builds"). The implementation confirms that the requested version plays no part: `CompositeBuildDependencySubstitutions` builds a `Multimap<ModuleIdentifier, ProjectComponentIdentifier>` and `getReplacementFor(ModuleComponentSelector)` looks up `selector.getModuleIdentifier()` only (Gradle `v9.7.1`, `subprojects/composite-builds/.../CompositeBuildDependencySubstitutions.java`). MagicBot can therefore declare `io.github.spartanlaboratories:bottools:1.0.0-SNAPSHOT` once and have it satisfied by the composite or by the snapshot repository. Two included builds providing the same module fail loudly: "Module version '%s' is not unique in composite".
- The chapter recommends aligning coordinates so that substitution works from both directions: "(Recommended) You align the group and `rootProject.name` of `anonymous-library` to match the expected coordinates, allowing Gradle's default auto-substitution to work in both directions."
- Declared substitution is required when "the `maven-publish` or `ivy-publish` plugins are used for publishing and the publication coordinates don't match `${project.group}:${project.name}`" (section "When to Declare Substitutions Explicitly"). Declared form, in the consumer's settings: `includeBuild("../KotlinBottools") { dependencySubstitution { substitute(module("io.github.spartanlaboratories:bottools-core")).using(project(":bottools-core")) } }`. Declared substitutions are "not transitive across builds": they are active only in the build that defines them.
- Limits: a substituted project dependency "will always point to the `default` configuration of the target project", so builds whose published metadata differs from the project (custom publication logic, POM tweaks, capabilities only in publication metadata) may behave differently included than published (section "When Substitutions Won't Work"). The vanniktech setup (`JavaLibrary` with Dokka javadoc jar and sources jar) adds artifacts, not variants, so none of those cases applies at first sight. The documented way to compare is a configuration with `resolutionStrategy.useGlobalDependencySubstitutionRules = false`, which resolves the published modules ("A use-case would be to compare published and locally built JAR files"); the walking skeleton should resolve the umbrella both ways and compare classpaths.
- Included builds are `project()`-opaque: "It is a common mistake to attempt to use `project()` notation to depend on a module that resides in an included build"; external coordinates are used instead (section "Referencing Projects").
- Two ways to include: `includeBuild("../x")` in settings, or the CLI flag `./gradlew build --include-build ../x`. For builds that provide plugins the chapter says settings-file inclusion "is recommended over using the `--include-build` CLI flag, as it provides more reliable plugin resolution". A settings-file include is also what the IDE sees. The path given to `includeBuild` must be the directory holding the included build's settings file; a missing directory is a configuration error, so the include has to be guarded by an existence check.
- Cost of default substitution: "The included build is always fully configured, even if its projects aren't needed for the current task" (section "Configuration-on-Demand"); explicit `substitute(...)` rules avoid that at the price of listing modules in the consumer.
- IDE: IntelliJ IDEA's documentation (2026.2, section "Configure Gradle Composite Build") says to add `includeBuild` in `settings.gradle`, or use the Gradle tool window's "Composite Build Configuration" action, then re-import; "IntelliJ IDEA finds the included Gradle projects and treats them as IntelliJ IDEA modules." Gradle's own chapter: "builds can be imported into the IDE". Switching between composite and snapshot mode needs a Gradle re-sync.

### F2. Composite build: build-logic and plugin-version differences (established consensus for isolation; source reading for build paths)

- "Each included build is *configured* in isolation — included builds do not share repositories, plugins, or properties with one another or with the root build" (section "Composite Build Layout"). User-defined `gradle.properties` of the root are not visible to included builds, and "Gradle runtime properties (such as `org.gradle.configuration-cache`) ... are only read from the *root build*".
- Consequence 1 (documentation plus inference): the library's own `settings.gradle.kts` `pluginManagement` and its `build-logic` run for the library's projects, so the library may pin Kotlin, Dokka and vanniktech versions that differ from MagicBot's. Plugin classpaths are separate per build. Gradle runtime settings (version, configuration cache, parallelism) come from MagicBot, because the Gradle that runs is MagicBot's wrapper. The library's wrapper is ignored. Both builds therefore need a Gradle version that satisfies the strictest plugin: vanniktech 0.37.0 documents "Gradle 9.0.0" and "Kotlin Gradle Plugin 2.2.0" as minimums (CHANGELOG, section 0.37.0).
- Consequence 2: Kotlin compatibility is a compile-time concern between the two builds' outputs. A compiler reads metadata up to one language version ahead of itself (GeneralTools finding F1 in `kmp-build-and-kotlin-compat.md`), so MagicBot's Kotlin must not be older than the library's `languageVersion`. Both pin 2.2.x, which makes this moot until one side moves.
- Build paths. The chapter requires: "Unique Build Paths: No two included builds can share the same build path", and says the build path is "derived from the included build's directory name"; a collision is fixed with `includeBuild("some-included-build") { name = "other-name" }`. It also says "When a composite build includes another composite, Gradle flattens the structure. All included builds share the same parent, regardless of how deeply they were nested." The upgrade guide (Gradle 8.0, "Changes to paths of included builds") says paths follow the directory hierarchy: `:nested:nestedNested:compileJava`.
  - The implementation settles the apparent conflict: `DefaultIncludedBuildRegistry.assignPath` takes the closest ancestor build of the new build's directory and appends the build name to that ancestor's path; with no ancestor it appends to the root. A second build asking for an already-taken path fails with "has build path ... which is the same as included build ...".
  - The default build name is the directory name: `DefaultConfigurableIncludedBuild` sets `this.name = projectDir.getName()`. `rootProject.name` in the included build does not change the build path (it changes the module name, `${project.group}:${project.name}`).
  - MagicBot's `build-logic` is therefore `:build-logic`, and the library's, nested inside `../KotlinBottools`, is `:KotlinBottools:build-logic`. Same-named `build-logic` directories do not collide, and a collision, if one ever arose, would be a loud configuration error fixed with `name = ...` in MagicBot's settings. (Read from the source at `v9.7.1`; not run.)
- Configuration cache: "File system state checked at configuration time (file presence, directory contents, etc.)" is a recorded configuration input (configuration cache chapter). A conditional `includeBuild` keyed on a directory check therefore invalidates the cache correctly when the sibling appears or disappears.
- "Multiple composite builds may conflict when run in parallel if more than one includes the same build. Gradle does not share the project lock of a shared composite build between Gradle invocations" (section "Known Limitations of Composite Builds"): two consumers including the same sibling checkout should not build at the same moment.

### F3. Library-side conventions needed for the composite to substitute (established consensus on the mechanism; MyGameTools gap observed locally)

- vanniktech `coordinates(groupId, artifactId, version)` sets the publications' coordinates only. Source at tag `0.37.0`, `MavenPublishBaseExtension.groupId(...)` and `artifactId(...)`: they assign `it.groupId` / `it.artifactId` on `mavenPublicationsWithoutPluginMarker`. The extension reads `project.group`, `project.name` and `project.version` only as defaults.
- MyGameTools: `gametools-core/build.gradle.kts` calls `coordinates("io.github.spartanlabsgaming", "gametools-core", "5.1.0")` and its convention plugins (`gametools.published-library.gradle.kts`, `gametools.kotlin-library.gradle.kts`) never set `group`. Its module directories already equal the artifactIds, which is half of what substitution needs.
- Consequence for this repository: the shared published-library convention plugin sets `group = "io.github.spartanlaboratories"` and `version` once (the `1.0.0-SNAPSHOT` literal lives in one place, which the release branch bumps), module directories are named exactly like the artifactIds (`bottools-core`, `bottools-data-sqlite`, `bottools-stats`, `bottools-plugins`, `bottools`), and `coordinates()` is then needed only for the POM. This is a convention for the build-logic plugin, not a MagicBot concern. The alternative, declared substitutions in MagicBot's settings, couples MagicBot to the library's module list and rots when a module is added.

### F4. Snapshot publishing with vanniktech 0.37.0 and the Central Portal (established consensus, plugin docs and source plus Sonatype documentation)

- Procedure: "Snapshots can be published by setting the version to something ending with `-SNAPSHOT` and then running the following Gradle task: `./gradlew publishToMavenCentral`. The snapshot will be automatically available in the Central Portal snapshot repository directly after the task finished." (`docs/central.md` at tag `0.37.0`, section "Publishing snapshots").
- Repository URL, from source: `MavenPublishBaseExtension.publishToMavenCentral` sets `repository.setUrl("https://central.sonatype.com/repository/maven-snapshots/")` and `repository.credentials(PasswordCredentials::class.java)` when the version ends in `-SNAPSHOT`; otherwise it writes a local repository for the release bundle. The credentials are the Gradle properties `mavenCentralUsername` and `mavenCentralPassword`, the same user-token pair used for releases (the plugin's `registerMavenCentralBuildService` reads those two properties; changelog 0.33.0 step 4 says to use the generated token's "Username" and "Password" for them). Sonatype's page gives the same URL for a plain Gradle `maven-publish` repository.
- Signing: "Signing is not required for snapshot builds, but if the configuration is present the build will still be signed." Source agrees: `signAllPublications` calls `setRequired(version.map { !it.endsWith("-SNAPSHOT") })`. Sonatype's snapshot page says "no validation is performed", so an unsigned or signed snapshot is accepted alike. The GeneralTools research (`kmp-maven-central-publishing.md`, F3) records the same plugin behaviour for local `publishToMavenLocal`.
- Snapshots do not use the release bundle upload: `MavenCentralBuildService.registerProject` returns immediately for `-SNAPSHOT` versions, so no deployment id, no zip, no Portal validation, no Portal click. Sonatype's page gives the reason: "Because publishing -SNAPSHOT releases does not perform validation on the component(s), a `mvn deploy`-compatible API was chosen for maximum ecosystem compatibility." A snapshot publish takes effect as soon as the Gradle task ends.
- The namespace switch (Sonatype, "Publish Portal Snapshots", section "Enabling -SNAPSHOT Releases For Your Namespace"): open the Portal's namespaces page, open the namespace's dropdown, choose "Enable SNAPSHOTs", confirm; "You will then see a badge on the namespace indicating that -SNAPSHOT publishing is enabled." It is a Portal action by a namespace owner, not a build setting. Plugin side: "If you want to publish snapshots of your project tap the 3 dots next to your namespace and select 'Enable SNAPSHOTs'" (CHANGELOG 0.33.0); snapshot support arrived in 0.31.0. Without the switch uploads fail with HTTP 403: a plugin contributor reports "make sure that snapshots are enabled for your namespace" (plugin issue 891), and another project's tracking issue calls it "a per-namespace setting, separate from the ability to publish releases" (`eisop/checker-framework` issue 2109).
- Mixed publishing was fixed in 0.34.0: "It's now possible to mix SNAPSHOT versions and release versions when running `publish` tasks." Not needed here, since every pre-1.0.0 build is a snapshot.
- Retention (Sonatype, same page): "-SNAPSHOT releases are cleaned up after a period of time (currently 90 days). We believe that this should be sufficient, as projects under active development will be pushing new versions of the same -SNAPSHOT component with some frequency." The page does not define whether the clock runs per uploaded build or per component version, and "currently" marks it as adjustable. Observation, 2026-10-20: the metadata for `com.squareup.okio:okio:3.19.0-SNAPSHOT` lists a single build (`3.19.0-20261019.004738-37`), although the build number is 37; the page does not explain this.
- Anonymous read. Sonatype's consumer instructions for Maven and Gradle (same page, section "Consuming -SNAPSHOT Releases For Your Project") contain a `repositories` block with the URL and a `content { includeModule(...) }` filter and no credentials. Observation, 2026-10-20: an unauthenticated `GET https://central.sonatype.com/repository/maven-snapshots/com/squareup/okio/okio/maven-metadata.xml` returned HTTP 200 with `<latest>3.19.0-SNAPSHOT</latest>`, as did the per-version `maven-metadata.xml` and the `.pom`. That is one artifact of one project, not yet an artifact in this organisation's namespace (Gap G2).
- Token scoping: Sonatype's "Generating a Portal Token for Publishing" page describes generating a user token at `central.sonatype.com/usertoken` with the steps "Specify a display name and an expiration for the token"; the Publisher API page (section "Authentication / Authorization") authenticates with the same user token as a `Bearer` header. Neither page mentions a scope (snapshots only, one namespace, publish only). The Portal's token dialog itself sits behind sign-in and was not opened. Treat the token as account-wide.
- Volume limits (Sonatype, "Maven Central Publishing Limits"): the Portal tracks "file count, release size, and release count" per organisation per calendar month, with a 30-day grace period before enforcement, and the page notes that most community open-source projects are expected to stay unaffected. The page does not say whether snapshot uploads count towards any of the three metrics.

### F5. Consuming the snapshot repository from Gradle (Sonatype documentation for the URL; Gradle docs for the declaration)

- Sonatype's Gradle snippet: a `maven { url = ...maven-snapshots/ ; content { includeModule(group, artifact) } }` block placed before `mavenCentral()`. Square's Moshi README (commit `889013ec2edb8d8034902662a1dc8c4f3b3f8111`) points users at "the Central Portal Snapshots repository" with the same URL.
- Gradle's documented filtering lets the declaration be tighter: `mavenContent { snapshotsOnly() }` (repository returns only snapshot versions) and `content { includeGroup(...) }` (Gradle docs, "Filtering Repository Content", sections "Declaring a repository filter" and "Maven repository filtering"). Restricting the repository to `io.github.spartanlaboratories` means the snapshot host is never asked for other groups, and `snapshotsOnly()` means releases are never taken from it.
- Gradle treats Maven `-SNAPSHOT` versions as changing modules: "By default, Gradle caches these dependencies (including dynamic versions and changing modules) for 24 hours, meaning it does not contact remote repositories for new versions during this time" (dependency caching chapter). `--refresh-dependencies` or `resolutionStrategy.cacheChangingModulesFor(0, "seconds")` shortens that.

### F6. Options that honour "no registry credentials in CI" (assessment)

| Option | Credential in CI? | Verdict |
|---|---|---|
| Maintainer publishes `-SNAPSHOT` by hand to the Central Portal | None; the token sits in the maintainer's `~/.gradle/gradle.properties` | **Adopt.** Matches the working agreement's staging analogue. Cost: staleness and the 90-day cleanup (see F8). |
| CI publishes `-SNAPSHOT` from `main` with a Portal token | Yes | Common practice (Moshi's `.github/workflows/build.yml` runs `./gradlew publish` on its default branch with `ORG_GRADLE_PROJECT_mavenCentralUsername` / `...Password` secrets) but contradicts the agreement. The token has no documented scope narrower than the account (F4). Rejected. |
| GitHub Packages (Maven/Gradle) | `GITHUB_TOKEN` in CI for publishing; consumers need a PAT | Rejected: "You need an access token to publish, install, and delete private, internal, and public packages", and "GitHub Packages only supports authentication using a personal access token (classic)" (GitHub Docs, Gradle registry page, section "Authenticating to GitHub Packages"). Anonymous reads are not offered, so every MagicBot contributor would need a PAT. |
| JitPack | None; JitPack builds from the public repository | Viable fallback; see F7. |
| Gradle source dependencies | None | Rejected; see F7. |
| MagicBot CI checks out this repository beside its own | None; a public repository needs no token | **Adopt as the CI path.** |

### F7. JitPack and source dependencies in detail

**JitPack** (documentation at `docs.jitpack.io`, sections "Building with JitPack", "Building", "F.A.Q."):

- Coordinates for any consumer: group `com.github.Username`, version "Release tag, commit hash or `master-SNAPSHOT`"; the FAQ gives the general form `anyBranch-SNAPSHOT`, and branch names with slashes use `~`. For this repository the version is `main-SNAPSHOT` or a short commit hash.
- Multi-module Gradle builds are supported: "If the project builds multiple modules JitPack publishes all of them. It will also generate a module that includes all of repository's modules as dependencies" and "To get individual artifacts of multi-module builds use `com.github.User.Repo` as group Id and `ModuleName` as the artifact Id" (section "Multi-module projects"). So the artifacts would be `com.github.SpartanLaboratories.KotlinBottools:bottools-core:main-SNAPSHOT`, which is not the `io.github.spartanlaboratories` group the composite substitutes. MagicBot would need either a conditional dependency notation or a resolution-time substitution `substitute(module("io.github.spartanlaboratories:bottools")).using(module("com.github.SpartanLaboratories.KotlinBottools:bottools:main-SNAPSHOT"))`. JitPack's custom-domain feature maps a DNS name to an organisation and does not cover `io.github.*`.
- JitPack rewrites the group and version and the inter-module dependency coordinates in what it serves. Observation, 2026-10-20, on JitPack's own sample `jitpack/gradle-modular`: its `build.gradle` sets `group = 'io.jitpack.gradle-modular'` and `server` depends on `project(path: ':client')`, yet the served `server-1.5.pom` declares group `com.github.jitpack.gradle-modular` and a dependency on `com.github.jitpack.gradle-modular:client:1.5`. This sample uses plain `maven-publish`; it is not shown for a build that sets coordinates through vanniktech's `coordinates()` (Gap G6).
- JDK: "JitPack compiles projects using OpenJDK Java 8 by default for legacy compatibility. For modern JVM and Android projects (such as Gradle 7+, Gradle 8+, Spring Boot 3+, or AGP 8+), you should specify a newer LTS version (e.g. Java 17 or Java 21) in a `jitpack.yml` file." A `jitpack.yml` with `jdk: - openjdk17` selects JDK 17, and "If your project requires a specific Java version then you can use SDKMAN in `jitpack.yml`" with `sdk install java 21-open` and `sdk use java 21-open` (section "Java version"). A public project that targets 21 uses both: libgdx-library-template's `jitpack.yml` (commit `97a1188bf2e68dc591bd2d04e2ded37ecba7674d`) lists `sdk install java 21-open`, `sdk use java 21-open` and `jdk: - openjdk21`. JDK 21 is documented; that Kotlin 2.2, Gradle 9.7+ and Dokka build there has not been shown (G6).
- Behaviour: builds run on demand, "Up to 15 minutes" (FAQ), so the first request of a new commit can hit Gradle's HTTP timeouts (FAQ gives `systemProp.org.gradle.internal.http.connectionTimeout=180000`); a webhook (`https://jitpack.io/api/webhooks`) builds branches already requested on every push ("Building ahead of time"); `-SNAPSHOT` "will always provide the latest build therefore its only recommended during development and not in production" (FAQ); a Gradle dependency on `main-SNAPSHOT` is cached as a changing module (24 hours by default). With the `maven-publish` plugin JitPack runs `./gradlew build publishToMavenLocal`, so the library's tests run on JitPack unless `jitpack.yml` overrides `install`. vanniktech's snapshot rule applies there only if the Gradle `version` is a `-SNAPSHOT`; a release-style version would demand a signing key.
- Reproducibility: "Absolutely. Once JitPack builds a project it keeps the build artifacts (jar, aar, … files) and continues to serve those for all subsequent requests"; public-repository builds become immutable after 7 days.
- Why held back: a third party builds and hosts the artifacts, the coordinates differ from the final ones, and the build environment (JDK 21, Gradle 9.7, Dokka, vanniktech coordinates) is untested on it.

**Gradle source dependencies** (`sourceControl { gitRepository(uri) { producesModule("group:name") } }`):

- Status: the API is in the Gradle 9.8.2 Javadoc (`org.gradle.vcs.SourceControl`, "Since: 4.3"; `Settings.sourceControl`, "Since: 4.4") and its signature carries no incubating marker, but the user guide has no chapter on it: the only user-guide mention found is the dependency-locking limitation "Dependency locking does not currently apply to source dependencies". The feature was introduced on 2018-09-25 with the statement "this feature is currently incubating and may change in breaking ways in future releases of Gradle. Please do not use this feature in production until the feature is promoted to stable", and a list of missing features that includes "You cannot have a source dependency on a build that contains included builds" and "IDE support is mostly not yet available" (Gradle blog, "Introducing source dependencies"). Whether those 2018 limits still hold in 9.x is not documented anywhere read (G6).
- Hard limit seen in source: `GitVersionControlSystem.getDefaultBranch` accepts only `refs/heads/master` ("`// TODO: Default branch can be different from just master`"), so a `main` repository needs an explicit `branch("main")` version constraint.
- Floating refs are re-resolved on every build: `DefaultVcsVersionWorkingDirResolver` sets an always-expired cache entry for dynamic selectors. Every MagicBot build would therefore contact GitHub and compile the library.
- It adds nothing over the composite: Gradle builds the checked-out repository as an included build, and substitution matches `producesModule` coordinates. It would also compile the library on every contributor machine and every CI run.

### F8. Behaviour when the library's `main` moves faster than MagicBot (assessment)

| Mechanism | Pin possible? | Reproducible? | Failure mode |
|---|---|---|---|
| Composite, sibling checkout at a SHA | Yes: a recorded SHA is checked out | Exactly | None until the pin is bumped; bump PR shows the breaking change in MagicBot's CI |
| Composite, sibling at `main` | No | No | MagicBot PRs fail when library `main` breaks, even for unrelated changes |
| Central snapshot, floating `1.0.0-SNAPSHOT` | No | No; Gradle's guide: "Using dynamic versions and changing modules can lead to unreproducible builds"; locking "should not be used with changing versions (e.g., `-SNAPSHOT`)" (dependency locking chapter) | The newest manual publish wins; the cache holds a stale one for 24 hours; the artifact disappears if not republished within the 90-day cleanup |
| Central snapshot, timestamped version | Possible in principle | Until Central removes it (90 days, basis undefined) | Pin disappears silently |
| JitPack commit hash | Yes (`<short-sha>` as the version) | Yes: "Once JitPack builds a project it keeps the build artifacts" (FAQ) | Third-party dependency; hash coordinates differ from the final ones |
| Source dependency at a commit | Yes | Yes | See F7 |

The tension is real: the cheapest mechanism (floating) is the least reproducible, and the reproducible ones (SHA pin, JitPack hash) cost a bump per library change. The composite with a recorded SHA gets both for free in CI because the checkout is a Git operation, and the bump is a one-line PR.

## 4. How comparable projects do it

- **Gradle's own guidance** treats the composite as the answer to this exact problem: "Developing libraries and consumers together" is the first of three listed use cases, with `includeBuild("../my-utils")` as the example (composite builds chapter, `docs.gradle.org/9.7.1`), and a separate how-to, "How to Use a Local Fork of a Module Dependency with Gradle" (`how_to_use_local_forks.adoc`, `gradle/gradle` tag `v9.7.1`), says "Work with an **unreleased** version of a library" and "You don't need explicit substitution statements".
- **Moshi (Square)** publishes snapshots from CI on every default-branch build (`.github/workflows/build.yml` at commit `889013ec`: step "Publish (default branch only)", `./gradlew publish`, with `ORG_GRADLE_PROJECT_mavenCentralUsername`, `...mavenCentralPassword`, `...signingInMemoryKey` as secrets) and documents the Central Portal snapshot repository in its README. This is the common practice for libraries that accept CI credentials; it is the option the organisation's agreement excludes.
- **MyGameTools** (this organisation) runs no CI publishing: `ci.yml` has `contents: read` permissions and its jobs only test, document and assemble; its `CONTRIBUTING.md` gives `./gradlew publishAndReleaseToMavenCentral` as the manual release step. Its conventions (`build-logic` included build; Kotlin, serialization and Dokka versions declared once in `pluginManagement`; vanniktech 0.36.0; Gradle 9.7.1) are the base for this repository's. It has no downstream consumer yet, so it is no precedent for snapshot consumption.
- **GitHub Actions** documents a "Checkout multiple repos (side by side)" recipe: two `actions/checkout@v4` steps with distinct `path:` values, the second with `repository:` (`actions/checkout` tag `v4`, commit `11d5960a326750d5838078e36cf38b85af677262`, README). `path` is "Relative path under $GITHUB_WORKSPACE", so the sibling layout is `<workspace>/MagicBot` and `<workspace>/KotlinBottools`, and the Gradle step runs with `working-directory: MagicBot`.

## 5. Pitfalls and regrets

- **Silent coordinate mismatch.** If the library build only calls `coordinates(...)`, the composite includes the build but substitutes nothing: Gradle resolves `io.github.spartanlaboratories:bottools:1.0.0-SNAPSHOT` from the snapshot repository and the developer edits the sibling in vain. Guard with a MagicBot build check (a task that fails if `bottools-core` resolves to a non-project component while the composite is active) or a test in the library's build-logic TestKit suite.
- **Snapshot cleanup and staleness.** A snapshot that nobody republishes ages out of Central (documented as "currently 90 days", basis per build or per component undefined) and the no-sibling fallback breaks with a plain resolution error. Mitigation: publish at the end of every phase and before announcing a MagicBot release; note the date of the last publish in `CONTRIBUTING.md`; consider a scheduled reminder, not a scheduled publish.
- **Publishing the wrong tree.** A manual publish from a feature branch puts unreviewed code on the staging analogue. Put a guard in the convention plugin (fail `publishToMavenCentral` for a `-SNAPSHOT` unless the checkout is on `main` with a clean tree), or document it in the exact command.
- **403 on first upload.** The namespace's "Enable SNAPSHOTs" switch is separate from the ability to publish releases. Flip it before the first attempt and check for the badge on the namespace if uploads fail.
- **Cache surprises.** 24 hours of caching means a fresh snapshot is invisible to a developer who built yesterday; document `--refresh-dependencies`.
- **Included build runs with MagicBot's Gradle.** A library change that raises its plugin minimums (for example a vanniktech release requiring Gradle 9.x) breaks the composite in MagicBot until MagicBot's wrapper moves. Keep the two wrappers within one minor. Gradle 9.8.2 is current (2026-10-19) while both organisation builds sit on 9.7.1.
- **Properties do not travel.** The library's `gradle.properties` (for example MyGameTools' Dokka `pluginMode` switches) applies to the library's own build and is not seen by MagicBot, and the reverse holds. Do not put values MagicBot also needs only in the library's properties file.
- **Always-configured included build.** With default substitution the whole library build (five modules and its `build-logic`) is configured on every MagicBot invocation. The configuration cache absorbs most of that; declared substitutions would avoid it at the price of listing modules in MagicBot.
- **CI test scope.** The composite build compiles the library; MagicBot's `./gradlew build` does not run the library's tests. They stay in the library's own CI.
- **Publishing volume limits.** Sonatype's monthly limits (file count, release size, release count per organisation) are evaluated on the whole organisation and the page is silent on snapshots. A feature release of five modules is small against the stated 90th-percentile figures (1,167 files, 7 releases a month), but the Usage Center, not the page, is the source of truth for current thresholds.

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
2. The library's shared published-library convention plugin sets `group` and `version` once, module directories equal artifactIds, and the toolchain is JDK 21 in both repositories. Same-named `build-logic` directories in the two repositories need no special handling (F2); if a collision is ever reported, rename in MagicBot's settings with `includeBuild(dir) { name = ... }`. `signAllPublications()` stays as in MyGameTools because signing is optional for snapshots and mandatory for 1.0.0.
3. The maintainer publishes `1.0.0-SNAPSHOT` with `./gradlew publishToMavenCentral` from a clean `main`, using the token in `~/.gradle/gradle.properties` (names `mavenCentralUsername`, `mavenCentralPassword`). `CONTRIBUTING.md` carries the exact command, the "Enable SNAPSHOTs" prerequisite, the 90-day cleanup note with a republish cadence inside it (a judgement: at least monthly while the library is under active change, and at every phase end), and the consumer repository declaration above. No workflow in either repository holds a registry credential.
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

**Why this and not the obvious alternative.** The obvious alternative is "CI publishes snapshots on every merge to main", which is common practice and removes staleness and the cleanup risk. It is rejected because it needs a Portal token in CI and the documented Portal token has no scope narrower than the account (a display name and an expiry only); the composite already gives CI an exact, credential-free build of the library, so the snapshot path only needs to serve the occasional lone checkout, where weekly-to-monthly freshness is enough. If staleness hurts in practice, add JitPack for that path (a `jitpack.yml` with JDK 21 and a conditional substitution) before adding a CI credential.

## 7. Load-bearing claims

1. **Composite builds are the documented route for developing a library and its consumer together, with automatic substitution.**
   Source: <https://docs.gradle.org/9.7.1/userguide/composite_builds.html>, section "When to Use Composite Builds", Gradle 9.7.1 (identical at `docs.gradle.org/current`, 9.8.2).
   Quote: "If you maintain a library that another project depends on, composite builds let you work across both at the same time without publishing the library first." and "Gradle automatically substitutes the external dependency with a local source".
2. **Automatic substitution matches `project.group:project.name`, and publication coordinates that differ need declared substitutions.**
   Source: same page, sections "Dependency Substitution in Composite Builds" and "When to Declare Substitutions Explicitly", Gradle 9.7.1.
   Quote: "Gradle will inspect the group and name for the projects in the included build and substitute project dependencies for any external dependency matching `${project.group}:${project.name}`." and "When the `maven-publish` or `ivy-publish` plugins are used for publishing and the publication coordinates don't match `${project.group}:${project.name}`."
3. **Included builds are configured in isolation; Gradle runtime properties come from the root build only.**
   Source: same page, sections "Composite Build Layout" and "Configuring a Composite Build", Gradle 9.7.1.
   Quote: "Each included build is *configured* in isolation — included builds do not share repositories, plugins, or properties with one another or with the root build" and "Gradle runtime properties (such as `org.gradle.configuration-cache`) are a special case — they are only read from the *root build* and applied to the entire invocation."
4. **Build paths must be unique, and nested included builds are addressed by directory hierarchy since Gradle 8.0.**
   Source: same page, section "Requirements for Composite Builds"; and <https://docs.gradle.org/9.7.1/userguide/upgrading_version_7.html>, "Changes to paths of included builds".
   Quote: "*Unique Build Paths:* No two included builds can share the same build path." and "In order to handle conflicts between nested included build names better, Gradle now uses the directory hierarchy of included builds to assign the build path."
5. **The configuration cache records file-system state read at configuration time.**
   Source: <https://docs.gradle.org/9.7.1/userguide/configuration_cache.html>, Gradle 9.7.1.
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
    Source: same CHANGELOG, section 0.37.0 (2026-06-21); <https://repo1.maven.org/maven2/com/vanniktech/gradle-maven-publish-plugin/maven-metadata.xml> (read 2026-10-20).
    Quote: "#### Minimum supported versions - JDK 17 - Gradle 9.0.0 - Android Gradle Plugin 8.13.0 - Kotlin Gradle Plugin 2.2.0". Metadata: `<latest>0.37.0</latest>`, `<release>0.37.0</release>`.
12. **Another project documents the Central Portal snapshot URL for consumers, and publishes snapshots from CI.**
    Source: <https://github.com/square/moshi/blob/889013ec2edb8d8034902662a1dc8c4f3b3f8111/README.md> and <https://github.com/square/moshi/blob/889013ec2edb8d8034902662a1dc8c4f3b3f8111/.github/workflows/build.yml>.
    Quote: "Snapshots of the development version are available in [the Central Portal Snapshots repository][snap]." with `[snap]: https://central.sonatype.com/repository/maven-snapshots/`; and in the workflow, `name: Publish (default branch only)` ... `run: ./gradlew publish` ... `ORG_GRADLE_PROJECT_mavenCentralUsername: ${{ secrets.SONATYPE_CENTRAL_USERNAME }}`.
13. **Gradle repository filtering supports snapshot-only and group-restricted repositories.**
    Source: <https://docs.gradle.org/9.7.1/userguide/filtering_repository_content.html>, sections "Declaring a repository filter" and "Maven repository filtering", Gradle 9.7.1.
    Quote: "Gradle lets you declare what kind of artifacts are found in a repository using this DSL:" with the snippet `mavenContent { snapshotsOnly() }`; and `// this repository *only* contains artifacts with group "my.company"` followed by `includeGroup("my.company")`.
14. **Gradle caches changing modules for 24 hours; locking should not be used with `-SNAPSHOT`; dynamic/changing versions are unreproducible.**
    Source: <https://docs.gradle.org/9.7.1/userguide/dependency_caching.html>, <https://docs.gradle.org/9.7.1/userguide/dependency_locking.html> and <https://docs.gradle.org/9.7.1/userguide/dependency_versions.html>, Gradle 9.7.1.
    Quote: "By default, Gradle caches these dependencies (including dynamic versions and changing modules) for 24 hours, meaning it does not contact remote repositories for new versions during this time." and "Dependency locking is effective with dynamic versions, but it should not be used with changing versions (e.g., -SNAPSHOT)" and "Using dynamic versions and changing modules can lead to unreproducible builds."
15. **GitHub Packages needs an access token to install, even public packages, and accepts only a classic PAT.**
    Source: <https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-gradle-registry>, section "Authenticating to GitHub Packages" (read 2026-10-20).
    Quote: "GitHub Packages only supports authentication using a personal access token (classic)." and "You need an access token to publish, install, and delete private, internal, and public packages."
16. **JitPack coordinates, snapshots, multi-module and default-JDK facts.**
    Source: <https://docs.jitpack.io/> (section "Building with JitPack"), <https://docs.jitpack.io/building/> (sections "Multi-module projects", "Java version") and <https://docs.jitpack.io/faq/> (read 2026-10-20).
    Quote: "Version: Release tag, commit hash or master-SNAPSHOT"; "If the project builds multiple modules JitPack publishes all of them."; "To get individual artifacts of multi-module builds use com.github.User.Repo as group Id and ModuleName as the artifact Id."; "JitPack compiles projects using OpenJDK Java 8 by default for legacy compatibility."; "Note that -SNAPSHOT version will always provide the latest build therefore its only recommended during development and not in production."; "Up to 15 minutes".
17. **A public project selects JDK 21 on JitPack with SDKMAN plus `jdk: openjdk21`.**
    Source: <https://github.com/tommyettinger/libgdx-library-template/blob/97a1188bf2e68dc591bd2d04e2ded37ecba7674d/jitpack.yml>.
    Quote: `before_install: - sdk install java 21-open - sdk use java 21-open jdk: - openjdk21`.
18. **Gradle source dependencies resolve the default branch as `master` only.**
    Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/software/version-control/src/main/java/org/gradle/vcs/git/internal/GitVersionControlSystem.java>, symbol `GitVersionControlSystem.getDefaultBranch`, tag v9.7.1.
    Quote: `// TODO: Default branch can be different from just master` followed by `if (ref.getName().equals("refs/heads/master"))`.
19. **GitHub's checkout action documents the side-by-side layout.**
    Source: <https://github.com/actions/checkout/blob/v4/README.md>, section "Checkout multiple repos (side by side)", tag `v4`.
    Quote: `path: main` ... `repository: my-org/my-tools` ... `path: my-tools`; and the input description "Relative path under $GITHUB_WORKSPACE to place the repository".
20. **Snapshot uploads 403 without namespace enablement, as reported by plugin users; one project quotes the 90-day cleanup.**
    Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/issues/891> (comment by svenjacobs) and <https://github.com/eisop/checker-framework/issues/2109> (issue body), both read through `gh issue view` on 2026-10-20.
    Quote (issue 891): "If you're still getting 403 errors from Sonatype when deploying snapshot releases, make sure that snapshots are enabled for your namespace". Quote (eisop 2109): "This is a per-namespace setting, separate from the ability to publish releases." and "Central deletes snapshots after ~90 days".
21. **Sonatype documents the snapshot repository, the per-namespace switch, the 90-day cleanup, the absence of validation, and credential-free consumer configuration.**
    Source: <https://central.sonatype.org/publish/publish-portal-snapshots/>, sections "Publishing -SNAPSHOT Releases", "Enabling -SNAPSHOT Releases For Your Namespace", "Publishing -SNAPSHOT Releases For Your Project" and "Consuming -SNAPSHOT Releases For Your Project" (read 2026-10-20).
    Quote: "Specifically, -SNAPSHOT releases are cleaned up after a period of time (currently 90 days)." and "As with the legacy OSSRH -SNAPSHOT publishing, no validation is performed." and "Selecting "Confirm" on the popup will enable -SNAPSHOT publishing on that namespace. You will then see a badge on the namespace indicating that -SNAPSHOT publishing is enabled." and, for Gradle, `url 'https://central.sonatype.com/repository/maven-snapshots/'` inside a `maven { ... }` block with no `credentials` section.
22. **The Central snapshot repository answers unauthenticated reads (observation on another project's artifact).**
    Source: `GET https://central.sonatype.com/repository/maven-snapshots/com/squareup/okio/okio/maven-metadata.xml`, sent without credentials, 2026-10-20.
    Quote (response body): `<latest>3.19.0-SNAPSHOT</latest>` and `<lastUpdated>20261019005542</lastUpdated>`, with status `HTTP/1.1 200 OK` for the sibling `.../okio/3.19.0-SNAPSHOT/okio-3.19.0-20261019.004738-37.pom`.
23. **Sonatype's Portal user token is described with a display name and an expiry; no scope is described.**
    Source: <https://central.sonatype.org/publish/generate-portal-token/> (read 2026-10-20); <https://central.sonatype.org/publish/publish-portal-api/>, section "Authentication / Authorization".
    Quote: "Specify a display name and an expiration for the token" and "Requests to the API must be authenticated via a user token header."
24. **IntelliJ IDEA imports included builds as modules.**
    Source: <https://www.jetbrains.com/help/idea/work-with-gradle-projects.html>, section "Configure Gradle Composite Build", IntelliJ IDEA 2026.2 (read 2026-10-20).
    Quote: "Using the `includeBuild` command, specify the location of the builds you want to add as dependencies to your project." and "IntelliJ IDEA finds the included Gradle projects and treats them as IntelliJ IDEA modules."
25. **Build paths of nested included builds are qualified by the nearest ancestor build; the build name defaults to the directory name.**
    Source: <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/composite-builds/src/main/java/org/gradle/composite/internal/DefaultIncludedBuildRegistry.java>, symbol `DefaultIncludedBuildRegistry.assignPath`; and <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/core/src/main/java/org/gradle/internal/composite/DefaultConfigurableIncludedBuild.java>, constructor, tag v9.7.1.
    Quote: `// If there is an ancestor, then we use it to qualify the path of the build we are adding` ... `entry -> entry.getValue().getIdentityPath().append(Path.path(name))` and `this.name = projectDir.getName();`.
26. **Composite substitution is keyed on group and module name; the requested version is not consulted.**
    Source: <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/composite-builds/src/main/java/org/gradle/composite/internal/CompositeBuildDependencySubstitutions.java>, symbols `CompositeBuildDependencySubstitutions` and `getReplacementFor`, tag v9.7.1.
    Quote: `private final Multimap<ModuleIdentifier, ProjectComponentIdentifier> replacementMap = ArrayListMultimap.create();` and `ModuleIdentifier candidateId = selector.getModuleIdentifier();`.
27. **Gradle source dependencies: no user-guide chapter, introduced as incubating and unfit for production, with a limit against builds that contain included builds.**
    Source: <https://blog.gradle.org/introducing-source-dependencies> (2018-09-25); <https://docs.gradle.org/current/javadoc/org/gradle/vcs/SourceControl.html> (Gradle API 9.8.2); <https://docs.gradle.org/9.7.1/userguide/dependency_locking.html>, section "Understanding locking limitations".
    Quote (blog): "You should be aware that this feature is currently incubating and may change in breaking ways in future releases of Gradle. Please do not use this feature in production until the feature is promoted to stable in a future release." and "You cannot have a source dependency on a build that contains included builds." Quote (Javadoc): "Configuration that defines the source dependencies available in this build." (Since: 4.3). Quote (user guide): "Dependency locking does not currently apply to source dependencies."
28. **Settings-file inclusion is the documented recommendation for builds providing plugins; a `--include-build` flag exists; substitutions can be disabled per configuration to compare with the published module.**
    Source: <https://docs.gradle.org/9.7.1/userguide/composite_builds.html>, sections "Gradle Plugins in Composite Builds", "Defining a Composite Build via --include-build", "Disabling Substitutions for a Configuration", Gradle 9.7.1.
    Quote: "This approach is recommended over using the `--include-build` CLI flag, as it provides more reliable plugin resolution, especially when using the modern `plugins {}` block" and "The `--include-build` command-line argument turns the executed build into a composite" and "A use-case would be to compare published and locally built JAR files."
29. **JitPack documents JDK 21 through SDKMAN and an ahead-of-time webhook; its own multi-module sample is served with rewritten group, version and inter-module dependencies.**
    Source: <https://docs.jitpack.io/building/>, sections "Java version" and "Building ahead of time"; <https://github.com/jitpack/gradle-modular/blob/master/build.gradle> and <https://jitpack.io/com/github/jitpack/gradle-modular/server/1.5/server-1.5.pom> (read 2026-10-20).
    Quote: "If your project requires a specific Java version then you can use SDKMAN in `jitpack.yml`:" with `sdk install java 21-open` and `sdk use java 21-open`; "You can also build snapshots on each commit if you add GitHub or Bitbucket Webhooks."; build file `group = 'io.jitpack.gradle-modular'`; served POM `<groupId>com.github.jitpack.gradle-modular</groupId>` ... `<artifactId>client</artifactId>` ... `<version>1.5</version>`.
30. **Sonatype's publishing limits are monthly per organisation, with a grace period, and the page does not mention snapshots.**
    Source: <https://central.sonatype.org/publish/maven-central-publishing-limits/>, sections "What Are the Maven Central Publishing Limits?" and "Grace Periods" (read 2026-10-20).
    Quote: "Maven Central tracks three monthly publishing metrics per organization: file count, release size, and release count." and "Exceeding a threshold in a given month initiates a 30-day grace period rather than immediate enforcement."

## 8. Gaps

- **G1. Resolved points and their residue (Sonatype snapshot repository).** Anonymous read, the 90-day cleanup, the absence of validation and the namespace switch are documented at `central.sonatype.org` (claim 21) and anonymous read is observed on another project's artifact (claim 22). Still unestablished: whether the 90 days run from a component's first upload or from its latest upload (the page says only "a period of time (currently 90 days)"); and whether older timestamped builds of one snapshot version are removed earlier, which the single-build metadata of the sampled artifact hints at but no page states.
- **G2. The namespace `io.github.spartanlaboratories` has not been checked for "Enable SNAPSHOTs", and no snapshot exists in it yet.** This is a Portal action by a namespace owner; the Portal UI sits behind sign-in and was not opened. The GeneralTools research carries the same open item. First publish will 403 until it is done, and anonymous read of this organisation's own snapshot is to be confirmed with an unauthenticated request after the first publish.
- **G3. Token scoping.** Sonatype's token page and Publisher API page describe a user token with a display name and an expiry and no scope (claim 23). The Portal's token-creation dialog is behind sign-in and was not opened, so a scope option that only the dialog shows cannot be excluded. Treat any token placed in CI as able to upload release bundles for every namespace on the account.
- **G4. Nested `build-logic` naming.** Settled by reading the Gradle source (claims 25, 4): the nested library `build-logic` becomes `:KotlinBottools:build-logic`, MagicBot's `:build-logic`. Not exercised by a run; the walking skeleton's first composite build confirms it. The composite chapter's "flattens the structure" sentence refers to the parent relationship, not the path.
- **G5. IDE behaviour.** JetBrains' documentation says the included projects become modules (claim 24). Not tested: whether switching between composite and snapshot mode re-syncs cleanly in the IDE, and whether the library's own run configurations survive.
- **G6. JitPack and source-dependency specifics.** Unestablished: whether a build that sets its coordinates through vanniktech's `coordinates()` is rewritten by JitPack the way JitPack's plain `maven-publish` sample is (claim 29); whether Gradle 9.7+ with Kotlin 2.2 and Dokka builds on JitPack's JDK 21; whether the 2018 limits of source dependencies (no source dependency on a build that contains included builds; no IDE support) still hold in Gradle 9.x. The Javadoc for `SourceControl` carries no incubating marker and the user guide has no chapter.
- **G7. Substitution not exercised.** Nothing was built. The version-independence of substitution is read from the Gradle source (claim 26). Still unproven by a run: that the `isFile` check in the settings sketch behaves under the configuration cache, and that the umbrella's classpath is identical included versus published.
- **G8. Hosts.** All hosts used answered on 2026-10-20: `docs.gradle.org`, `blog.gradle.org`, `central.sonatype.org`, `central.sonatype.com` (repository path only; Portal UI behind sign-in), `docs.jitpack.io`, `jitpack.io`, `docs.github.com`, `www.jetbrains.com`, `repo1.maven.org`. `dev.to`, `code.cash.app`, `eclipse.dev` and `docs.webforj.com` were not needed and not retried.
- **G9. MagicBot's repository does not exist yet** (`gh repo view SpartanLaboratories/MagicBot` finds nothing). Its build files, wrapper and CI are assumed to follow the MyGameTools shape; nothing about it was read.
- **G10. Publishing limits and snapshots.** The limits page does not say whether snapshot uploads count towards file count, release size or release count, and it says the Usage Center is the source of truth for thresholds; the Usage Center is behind sign-in. The page's "commercial nature" rule (Publisher Pro from 2026-10-01) is a release-publishing matter outside this question.
