# How the `bottools` umbrella publishes a strict pin on each of its five modules, and how a check reads the pins back before any publish

## 1. Question

How does the umbrella `bottools` (re-exporting `bottools-core`, `bottools-data-sqlite`, `bottools-http`, `bottools-stats` and
`bottools-plugins` as `api`, all six artifacts at one version) publish Gradle Module Metadata whose five module edges carry
`strictly` equal to that version, while the edges still resolve to the sibling projects inside the build and under a composite
(`includeBuild`)? How does a task read the generated metadata as inputs, configuration-cache safe, and run before every publish
task, Maven Local included, asserting the five strict edges and (only for a non-snapshot version) no `-SNAPSHOT` dependency? How
do the umbrella's sources and javadoc jars fold in its modules' content, and how are their guards adapted when the modules hold
little or no source? Applies to Gradle 9.7.1, the Kotlin Gradle plugin 2.5.0-RC (a pre-release published 2026-11-11; the build
moves to 2.5.0 when it is released) compiling at language version 2.5 and API version 2.5, vanniktech
`com.vanniktech.maven.publish` 0.37.0, Dokka 2.2.0, a JDK 21 toolchain with a Java floor of 21, configuration cache on.

Two further requirements follow from the Kotlin pin. The answer has to say whether the plugin, against the 2.2 line, changes
anything in the published variants, edges or constraints the check reads, and what the published metadata and POM carry for
`kotlin-stdlib` while the plugin is a release candidate. And it has to say how a check tells a pre-release requirement of that
kind (`2.5.0-RC`, `2.5.0-Beta2`, `2.5.0-dev-...`) apart from one of the organisation's lettered versions (`1.0.0a`), so that a
version which is not a snapshot can refuse it the way it refuses a `-SNAPSHOT`.

## 2. Bottom line

- **Declare the pin as a dependency constraint by coordinates beside each project dependency.** For each module `m`:
  `api(project(":m"))` plus `constraints { api("$group:m") { version { strictly(<shared version>) } } }`. Gradle 9.7.1 publishes
  it in `variants[].dependencyConstraints[]` of both `apiElements` and `runtimeElements` as `"version": {"strictly": "<v>",
  "requires": "<v>"}`; the matching `variants[].dependencies[]` entry stays `"requires": "<v>"`. Inside the build the constraint
  matches the project component (resolution reasons show `requested|constraint`), no repository is consulted, and vanniktech
  changes nothing about it. Observed in a reproduction build on Gradle 9.7.1 with the Kotlin Gradle plugin 2.2.0.
- **The Kotlin Gradle plugin 2.5.0-RC changes nothing the check reads, on the evidence available.** For a JVM-only module the
  plugin publishes through Gradle's own `java` component (`apiElements`, `runtimeElements`, `sourcesElements`), adds the
  `api` configuration to `apiElements` and the `org.gradle.category = library` attribute to both elements; the source of those
  three pieces is the same at tag `v2.2.0` and tag `v2.5.0-RC` apart from a rename of an internal helper. The Kotlin 2.3, 2.4
  and 2.5 release notes and compatibility guides name no change to a JVM library's published variants, attributes, edges or
  constraints; the one new publication format in 2.5 is for Kotlin Multiplatform libraries and is opt-in. The reproduction ran on
  2.2.0 and was not repeated on 2.5.0-RC (no build was run for this reading), so the claim rests on sources.
- **The one visible consequence of the release candidate is the `kotlin-stdlib` edge.** The plugin adds `kotlin-stdlib` to the
  `api` scope at the plugin's own version, so every module and the umbrella publish `org.jetbrains.kotlin:kotlin-stdlib`
  `requires 2.5.0-RC` in `dependencies[]` of both library variants and `<version>2.5.0-RC</version>` in the POM (derived from
  the plugin's source and its documentation; the reproduction observed the same edge as `requires 2.2.0`). That is correct for
  a `-SNAPSHOT` publication. For a version that is not a snapshot, the check must refuse it, which makes the move to Kotlin 2.5.0
  a precondition of the first release: `kotlin-stdlib:2.5.0-RC` is on Maven Central with `org.gradle.status = release`, so the
  published status does not mark it as a pre-release.
- **A check tells `2.5.0-RC` from `1.0.0a` by the version string, never by Gradle's ordering.** Gradle splits both into
  numeric and non-numeric parts and sorts both below the plain release (`1.0.0a < 1.0.0`, `2.5.0-RC < 2.5.0`), ignores separators
  (`1.0.0a`, `1.0.0-a` and `1.0.0.a` are one version), and sorts `2.5.0-Beta2 < 2.5.0a < 2.5.0-RC` but `2.5.0a < 2.5.0-beta2`
  (case-sensitive comparison, `rc` special). The organisation's form is exactly `Major.Feature.MinorChange` plus one trailing
  letter. So: classify first by an exact match against `\d+\.\d+\.\d+[a-z]`, then by a pre-release token list (`dev`, `alpha`,
  `beta`, `rc`, `cr`, `m<digits>`, `milestone`, `ea`, `eap`, `preview`, `pre`) at a token boundary. F12 gives the rule and its cases.
- **vanniktech 0.37.0 is the latest release and is stated tested up to the Kotlin Gradle plugin 2.4.0, not 2.5.** Its minimum is
  2.2.0. Its JVM path (`KotlinJvm`) touches no Kotlin Gradle plugin API: it creates a publication from Gradle's `java` component.
  Its default branch moved its release-candidate test catalog to Kotlin 2.5.0-RC on 2026-11-11, and no issue about Kotlin 2.5 is
  open. Nothing found says it fails on 2.5.0-RC; nothing found says it was run on it in a released build either.
- **A constraint on the project dependency itself is not possible**: `DefaultProjectDependencyConstraint.version(...)` throws
  `UnsupportedOperationException("Cannot change version constraint on a project dependency")`, and a project constraint
  without a version publishes `requires` only. **Declaring the edge by external coordinates with `strictly` plus a substitution
  rule is broken**: the umbrella's own variants resolve, but every other project in the build that consumes the umbrella fails
  with `lab.g:lib-a:{strictly 1.0.0-SNAPSHOT} -> ... FAILED`, because "By default, substitutions are not registered for the main
  build". Rewriting the generated JSON was not tested and is not needed.
- **A composite that includes this build still substitutes every edge with the constraints present** (reasons
  `requested|constraint|composite build substitution`), and ignores the requested version, including a different one.
- **Consumers.** Another version of a strictly pinned module, asked for by a plain `require` (directly, or transitively through
  another library), fails resolution ("Cannot find a version of 'lab.g:lib-a' that satisfies the version constraints", with the
  strict constraint path named). A request for a *lower* version is not a conflict: the pin stands. A consumer's own `strictly`
  (or `force`) on the same module overrides the library's pin. A library that pins with no `strictly` is silently moved up by a
  newer request.
- **`verifyReleasableMetadata` is a typed task** (build-logic, `@InputFiles` = `tasks.withType<GenerateModuleMetadata>()`, which
  carries the task dependency and the `module.json` output; `@Input` version and edge map; `@OutputFile` report; JSON read with
  Groovy's `JsonSlurper`, which `gradleApi()` provides), wired with
  `tasks.withType<AbstractPublishToMaven>().configureEach { dependsOn(verify) }`. That one hook covers Maven Local and every
  repository publication, vanniktech's Central staging repository among them. Prototyped: it passes and fails correctly and
  reuses the configuration cache entry. Two details that fail a naive version: select variants by `org.gradle.category ==
  library` (the `sourcesElements` variant carries `org.gradle.usage = java-runtime`), and read `strictly` from
  `dependencyConstraints[]` as well as `dependencies[]`. With a non-snapshot version it also refuses a pre-release requirement
  (F12), the `kotlin-stdlib` edge of a release-candidate plugin among them.
- **Umbrella jars.** MyGameTools' fold (a resolvable `reexportedModuleSources` configuration over each module's
  `sourcesElements`, `zipTree` into the umbrella `sourcesJar`; `dokka(project(...))` into `dokkaGeneratePublicationHtml`, which
  feeds `JavadocJar.Dokka`) works unchanged on vanniktech 0.37.0 and Dokka 2.2.0 (reproduced with Kotlin Gradle plugin 2.2.0; how
  Dokka 2.2.0 behaves on a Kotlin 2.5.0-RC build is not part of this question). Its two guards do not carry over: a module with
  no source contributes nothing to either jar (no `<module>/` pages at all in the javadoc), and a tiny module yields about 5 HTML
  pages, so a fixed floor of 20 and hard-coded package names fail. Derive the expectation from the modules' real source files
  and loop over one module list.

## 3. Findings

Observed behaviour in F1 to F8 comes from a reproduction build run on Gradle 9.7.1 (JDK 23, Kotlin Gradle plugin 2.2.0,
vanniktech 0.37.0, Dokka 2.2.0, two feature modules plus empty ones, one umbrella per declaration variant). Evidence tier for each:
**common practice, reproduced**; the cited Gradle documents and source back the mechanism. Which of these findings depend on the
Kotlin Gradle plugin's version is stated in F10: F2, F3, F4, F5, F6 and F9 do not involve the plugin at all; F1, F7 and F8 do, in
the way F10 sets out. F10 to F13 are read from sources and release notes; nothing in them was run.

### F1. A constraint by coordinates beside the project dependency publishes `strictly` and resolves to the project (reproduced; Gradle 9.7.1, Kotlin Gradle plugin 2.2.0)

```kotlin
// umbrella build script; `group` and `version` are set by the convention plugin before this runs
val pin = version.toString()
dependencies {
    for (m in modules) {
        api(project(":$m"))
        constraints { api("$group:$m") { version { strictly(pin) } } }
    }
}
```

Published `module.json`, for each of `apiElements` and `runtimeElements` (the `sourcesElements` variant, category
`documentation`, carries no dependencies):

```json
"dependencies": [
  { "group": "g", "module": "bottools-core", "version": { "requires": "1.0.0-SNAPSHOT" } },
  { "group": "org.jetbrains.kotlin", "module": "kotlin-stdlib", "version": { "requires": "2.2.0" } }
],
"dependencyConstraints": [
  { "group": "g", "module": "bottools-core", "version": { "strictly": "1.0.0-SNAPSHOT", "requires": "1.0.0-SNAPSHOT" } }
]
```

(The `kotlin-stdlib` version is the plugin's: `2.2.0` in the reproduction, `2.5.0-RC` on the pinned plugin, F11.)

- `strictly` and `requires` both appear on a strict constraint. The edge in `dependencies[]` stays a plain `requires`; the strict
  pin lives only in `dependencyConstraints[]`. A check that looks for `strictly` in `dependencies[]` alone finds nothing.
- Inside the build, a project that consumes the umbrella resolves `project ':lib-a'` with reason `requested|constraint`, on
  `compileClasspath` and `runtimeClasspath`. The reproduction restricted its repository to exclude the group, so a repository
  lookup would have failed; none happened.
- The spec: version constraint fields are `requires`, `prefers`, `strictly`, `rejects`, and `dependencyConstraints[]` may carry
  `reason` ([Gradle Module Metadata spec at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/design/gradle-module-metadata-latest-specification.md)).
  `because("...")` on the constraint maps to `reason` (not exercised).
- **POM for the same publication** (default `maven-publish` and vanniktech alike): each edge is a plain
  `<dependency>... <version>1.0.0-SNAPSHOT</version> <scope>compile</scope>`, and the constraints appear as plain
  `<dependencyManagement><dependencies><dependency>...<version>1.0.0-SNAPSHOT</version>` entries. No `strictly`, no bracket
  range. The POM carries the marker `do_not_remove: published-with-gradle-metadata`. A Maven or POM-only consumer gets a soft
  version; the strict pin exists only for Gradle consumers reading `.module`
  ([Gradle: "Dependency constraints are only published when using Gradle Module Metadata."](https://docs.gradle.org/9.7.1/userguide/dependency_constraints.html)).
- **vanniktech** changes none of this: the same build published with plain `maven-publish` and with vanniktech 0.37.0 gave
  identical `dependencies[]` and `dependencyConstraints[]`. vanniktech adds the sources and javadoc artifacts and, for Central,
  a staging repository (F7).
- An umbrella that applies the Kotlin plugin also publishes `org.jetbrains.kotlin:kotlin-stdlib` as an edge, at the plugin's
  version (F11); an umbrella on `java-library` alone does not (not exercised with vanniktech's `JavaLibrary` platform).
- The constraint must be declared in `api` (constraints in `api` land in both `apiElements` and `runtimeElements`).
  A constraint in `implementation` was not exercised.

### F2. A constraint on the project dependency cannot carry a version (source and reproduction; Gradle 9.7.1)

`constraints { api(project(":lib-a")) { version { strictly("...") } } }` fails at configuration with "Cannot change version
constraint on a project dependency", thrown by `DefaultProjectDependencyConstraint.version`
([source at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/software/dependency-management/src/main/java/org/gradle/api/internal/artifacts/dependencies/DefaultProjectDependencyConstraint.java)).
The version-less form `constraints { api(project(":lib-a")) }` is accepted and publishes `"version": {"requires":
"1.0.0-SNAPSHOT"}` in `dependencyConstraints[]`: a plain requirement, the shape OkHttp's BOM uses (F9 below). A plain
`constraints { api("g:m:1.0.0-SNAPSHOT") }` publishes the same `requires` only.

### F3. External coordinates with `strictly` as the edge, plus `dependencySubstitution`, fails for the rest of the build (reproduced)

`api("g:lib-a") { version { strictly(v) } }` publishes `strictly` directly on the `dependencies[]` entry, which reads
attractively (no constraints block, a check reads one place). With a substitution rule (`substitute(module("g:lib-a")).using
(project(":lib-a"))`) in the umbrella's configurations, the umbrella's own compile works, but `project(":umb")` consumed from
another project of the same build resolves to `lab.g:lib-a:{strictly 1.0.0-SNAPSHOT} -> 1.0.0-SNAPSHOT FAILED` and the module is
missing from the classpath (only `kotlin-stdlib` resolves). Gradle's composite documentation says the automatic substitution
covers included builds: "By default, substitutions are not registered for the main build." Making it work needs the rule
installed in every project's configurations, which also leaves the umbrella's edges as external coordinates in IDE import.
Rejected.

### F4. Rewriting the generated metadata (not tested; rejected on design grounds)

Editing `module.json` after `GenerateModuleMetadata` would make the published graph differ from the graph the build resolved,
leaves the build itself with plain `requires` edges, and still needs the same read-back check. Since F1 gives the published
shape from supported declarations, there is nothing to rewrite. Not exercised.

### F5. Composite builds still substitute the edges, constraints present (reproduced; Gradle 9.7.1)

A separate build with `includeBuild("<this build>")` that depends on `g:bottools:1.0.0-SNAPSHOT` (repository excluded for the
group) resolved every module as `project ':<included>:<module>'` with reasons `requested|constraint|composite build
substitution`. The version is ignored: a request for `g:bottools:7.7.7`, or `g:bottools-core:1.0.1` beside the umbrella, still
resolves to the included build's projects, and the strict constraint raises no conflict. So a composite consumer gets no
pin-conflict signal; pins matter only for published-artifact consumers
([Gradle: "Gradle will inspect the group and name for the projects in the included build and substitute project dependencies for any external dependency matching ${project.group}:${project.name}."](https://docs.gradle.org/9.7.1/userguide/composite_builds.html)).
The substitution keys on `group:name`, so the convention plugin's `group` must be set on all six projects and every module
directory must equal its artifact id.

### F6. What a consumer sees (reproduced against a file repository holding the published artifacts; Gradle 9.7.1)

`lib-a` is pinned `strictly 1.0.0-SNAPSHOT` by the umbrella; `lib-a:1.0.1` also exists.

| Consumer asks for | Result |
|---|---|
| the umbrella only | resolves; `lib-a:1.0.0-SNAPSHOT`, `lib-b:1.0.0-SNAPSHOT` |
| umbrella + `lib-a:1.0.1` (plain require, direct) | **fails**: "Cannot find a version of 'lab.g:lib-a' that satisfies the version constraints" with the dependency paths and "Constraint path: ... --> 'lab.g:lib-a:{strictly 1.0.0-SNAPSHOT}'" |
| umbrella + a third library whose metadata requires `lib-a:1.0.1` (transitive) | **fails**, the same message naming both paths |
| umbrella + `lib-a:0.9` (plain require, lower) | resolves to the pin; a lower requirement is no conflict |
| umbrella + `lib-a { strictly("1.0.1") }` (consumer's own strict) | resolves to `1.0.1`: the consumer's strict overrides the library's |
| umbrella + `lib-a { strictly("0.9") }` | resolves to `0.9` (the consumer's strict wins; it fails only because that version is unpublished) |
| umbrella + `resolutionStrategy.force("g:lib-a:1.0.1")` | resolves to `1.0.1` |
| umbrella + `lib-a { strictly(<same version>) }` | resolves |
| a variant of the umbrella pinned with plain `requires` (no `strictly`), + `lib-a:1.0.1` | resolves silently to `1.0.1` (the pin does not hold) |

So a conflict is a failure, never a silent change, and the consumer's escape is a `strictly` of their own on that module.
Gradle documents the same: "If a strict version conflicts with a consumer’s version requirement, it will trigger a resolution
error" and "Using strictly in a library requires careful consideration, as it affects downstream consumers"
([dependency versions](https://docs.gradle.org/9.7.1/userguide/dependency_versions.html)). What `strictly` costs a consumer in
general, and how `1.0.0a` orders below `1.0.0`, are covered by earlier findings and not repeated.

### F7. Reading the generated metadata as inputs, and running before every publish (prototyped; Gradle 9.7.1, vanniktech 0.37.0, Kotlin Gradle plugin 2.2.0)

**Inputs.** `GenerateModuleMetadata` (`generateMetadataFileForMavenPublication`) writes
`build/publications/maven/module.json`. A `ConfigurableFileCollection` filled with
`tasks.withType<GenerateModuleMetadata>()` takes each task's outputs as files and carries the task dependency; it is lazy, so
a publication vanniktech or the Kotlin plugin registers after evaluation is still included. WebTools' build uses exactly this
(`WebToolsBuild.registerVerifyJavaFloor`: `moduleMetadata.from(project.tasks.withType(GenerateModuleMetadata::class.java))`) for
its `VerifyJavaFloor` typed task, which declares `@get:InputFiles @get:PathSensitive(PathSensitivity.NAME_ONLY)` on it. With
`NAME_ONLY` every label is `module.json`; add the project path to the failure message (the task's `path`) so a failure names
the module. Gradle notes the generating task "is currently never marked UP-TO-DATE", so the check re-runs whenever the file's
content changes, and is skipped (`UP-TO-DATE`) otherwise.

**The task.** No `Project` is touched at execution time; everything is a task input property:

```kotlin
abstract class VerifyReleasableMetadata : DefaultTask() {
    @get:InputFiles @get:PathSensitive(PathSensitivity.NAME_ONLY) abstract val moduleMetadata: ConfigurableFileCollection
    @get:Input abstract val publishedVersion: Property<String>
    /** `group:module` -> the version it must be pinned to with `strictly` */
    @get:Input abstract val strictEdges: MapProperty<String, String>
    @get:OutputFile abstract val report: RegularFileProperty
    @TaskAction fun verify() { /* parse with groovy.json.JsonSlurper; see below */ }
}
```

The prototype (a `Set<String>` of edges against one shared version) ran this logic per file: `component.version ==
publishedVersion`; for each variant whose `attributes["org.gradle.category"] == "library"`: every expected edge present in
`dependencies[]`, and a `dependencies[]` or `dependencyConstraints[]` entry for it with `version.strictly == expected`; when
`publishedVersion` does not end in `-SNAPSHOT`, no `version.requires/strictly/prefers` string anywhere in those two arrays ends in
`-SNAPSHOT`; at least one library variant was checked; the report is deleted at the start and written only on success. Run with
`--configuration-cache`: first run "Configuration cache entry stored", second "Reusing configuration cache ... entry reused",
no problems. A map (`group:module` to version) replaces the set where an edge pins a version other than the shared one (the
later `bottools-http` to WebTools edge); that variation is not prototyped. The `-SNAPSHOT` rule generalises to the pre-release
rule of F12 by replacing one string test with a classification; nothing else in the task changes.

Observed outcomes: the umbrella with constraints passed; a variant with plain `requires` failed with
`apiElements: edge to lab.g:lib-a has no strictly 1.0.0-SNAPSHOT` for each variant and edge; at version `1.0.0` with an extra
`x.y:z:1.0-SNAPSHOT` dependency it failed with `x.y:z is 1.0-SNAPSHOT in a 1.0.0 release`; at a snapshot version with the same
dependency it passed.

**Wiring before every publish.** `tasks.withType<AbstractPublishToMaven>().configureEach { dependsOn(verify) }`.
`AbstractPublishToMaven` is the common superclass of `PublishToMavenLocal` and `PublishToMavenRepository`, so
`publishToMavenLocal` and every `publish<Pub>To<Repo>Repository` are covered. vanniktech 0.37.0 makes Central publication a
`PublishToMavenRepository` too: `publishToMavenCentral()` registers a repository named `mavenCentral` (a local staging directory
for a release, the snapshots URL for `-SNAPSHOT`) and configures the `publish...ToMavenCentralRepository` tasks. A dry run of
`:umb:publishToMavenCentral` showed the order `generateMetadataFile...`, `prepareMavenCentralPublishing`,
`verifyReleasableMetadata`, `publishMavenPublicationToMavenCentralRepository`. The actual upload to the Central Portal happens in
an end-of-build action whose `Upload` step has `runAfterFailure = false`, so a failed check anywhere in the invocation
prevents the Central upload (Maven Local writes of modules that already finished are not undone). The task has the same name in
every published module, so `./gradlew verifyReleasableMetadata` from the root runs all six.

### F8. The umbrella's sources and javadoc jars (reproduced; vanniktech 0.37.0, Dokka 2.2.0, Kotlin Gradle plugin 2.2.0)

MyGameTools' umbrella (`gametools/build.gradle.kts`, below) builds on these pieces, and each works on the versions of the
reproduction:

- `configurations.create("reexportedModuleSources") { isCanBeConsumed = false; isCanBeResolved = true; isTransitive = false }`,
  filled with `project(path = ":m", configuration = "sourcesElements")`, then
  `tasks.named<Jar>("sourcesJar") { dependsOn(reexportedModuleSources); from(provider { reexportedModuleSources.files.map(::zipTree) });
  exclude("META-INF/**"); duplicatesStrategy = EXCLUDE }`. In the reproduction the umbrella sources jar held exactly the
  modules' `.kt` files (plus the umbrella's own `META-INF/MANIFEST.MF`). An empty module's `sourcesJar` was built and
  contributed nothing.
- `dokka(project(":m"))` per module and `dokka { dokkaSourceSets.configureEach { suppress.set(true) } }`: the umbrella's
  `dokkaGeneratePublicationHtml` aggregated the modules, and vanniktech's `dokkaJavadocJar` task (class
  `com.vanniktech.maven.publish.tasks.JavadocJar`, which extends `org.gradle.jvm.tasks.Jar`, so it is fetched with that type)
  packed it. The aggregated HTML had `index.html` and `navigation.html` at the root and a `<module>/` folder per module **with
  source**; the empty module had no folder. A module with one public class produced 5 pages (`<module>/index.html`,
  `navigation.html`, the package `index.html`, the class page and class `index.html`).
- `KotlinJvm(javadocJar = ..., sourcesJar = true)` compiles with a deprecation warning in 0.37.0 ("Use the option with
  SourcesJar instead of a boolean"); the `SourcesJar.Sources()` option is the replacement
  ([`Platform.kt` at 0.37.0](https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/Platform.kt)).

MyGameTools' guards, and why they do not fit modules with little or no source:

- `verifyUmbrellaSourcesJar` requires `.kt` count `>= 2` and two hard-coded substrings (`gameobjects`, `networking`), one per
  module. A module with no source has no substring to find, and a hard-coded package name breaks on a rename.
- `verifyUmbrellaJavadocJar` requires `>= 20` HTML files ("an empty Dokka jar is just index.html + navigation.html") and the
  same substring pair. With the unit's content (two annotation classes in one module, nothing in four), a correct jar has about
  a dozen pages at most, so a fixed floor fails a healthy build.
- Both repeat the module list three times in the script (dependencies, source configuration, Dokka) with the substrings a
  fourth time.

Adaptation: keep one list of module names in the umbrella script and drive `api`, the constraints, `reexportedModuleSources`,
`dokka(...)` and both guards from it. Make each guard a typed task whose inputs are (a) the archive and (b) per module, the
relative paths of its real source files, read at configuration from `sourceSets.main` (as `FileTree`/list-of-strings
providers, not the `Project`). The sources guard asserts every module's source file path occurs in the umbrella jar and that no
`.kt` occurs that no module owns; the javadoc guard asserts, for each module that has at least one source file, that
`<module>/index.html` and at least one further page under `<module>/` exist, and that more than the two chrome pages exist
once any module has source. A module with no source must contribute nothing and must not be required to; when the total number
of source files across all modules is zero, fail loudly ("nothing to fold") rather than pass. Page counts are a Dokka output
detail: assert presence per module, not a count derived from this measurement (5 per one-class module is one reading at Dokka
2.2.0).

WebTools has no umbrella; its `build-logic` is the reference for the shape of the typed task and its tests (below).

### F9. Common practice for aligning a multi-module library's own modules (established practice for BOMs; one-source opinion on `strictly`)

The dominant mechanism is a BOM or platform artifact with `api`/constraint entries per module, not strict edges. OkHttp's
`okhttp-bom` is a `java-platform` whose build script adds `api(subproject)` for every project and `api("...:okhttp-jvm:${project.version}")`
for two further names (project constraints, so plain `requires`)
([`okhttp-bom/build.gradle.kts`](https://github.com/square/okhttp/blob/c0e010f662771b67dc2b9494bf6fcc6c1b45e584/okhttp-bom/build.gradle.kts)).
Gradle's own advice for libraries is to avoid a bare strict version in favour of a range with a preferred version
([dependency versions](https://docs.gradle.org/9.7.1/userguide/dependency_versions.html)). Searches of public code found no
mature multi-module library that publishes `strictly` between its own modules through constraints; the pattern here is
unusual and is justified by the lettered-version rule, not by precedent. The Gradle Module Metadata 1.1 field
`endorseStrictVersions` ("all strict versions of the target module will be treated as if they were defined on the variant
defining this dependency") imports the *target's* own strict pins; it does not make the umbrella pin the target itself, so it
does not apply. A seventh artifact (a platform) would carry the same constraint and add a coordinate; the six-artifact
layout rules it out.

### F10. What the Kotlin Gradle plugin 2.5 changes, against the 2.2 line, in what the check reads (sources and release notes; read 2026-11-22)

**Evidence tier: common practice for the mechanism (the plugin publishes through Gradle's `java` component), one-source for
the absence of change (JetBrains' own release notes and compatibility guides, plus a comparison of the plugin source at two
tags).**

What the check reads is: the `org.gradle.category = library` attribute on `apiElements` and `runtimeElements`, the edges in
`dependencies[]`, and the constraints in `dependencyConstraints[]`. Where the plugin touches each, at tag `v2.5.0-RC` against
`v2.2.0`:

| What the check reads | Where the plugin sets it | Change from 2.2.0 to 2.5.0-RC |
|---|---|---|
| The variants themselves (`apiElements`, `runtimeElements`) | `KotlinWithJavaTarget` returns `JavaPlugin.API_ELEMENTS_CONFIGURATION_NAME` and `JavaPlugin.RUNTIME_ELEMENTS_CONFIGURATION_NAME`: Gradle's own `java` elements | none (the file is byte-identical at both tags) |
| `org.gradle.category = library` on both | `AbstractKotlinPlugin.configureAttributes` sets `Category.CATEGORY_ATTRIBUTE` to `library` on both elements, and `usesPlatformOf(kotlinTarget)` | none in those lines |
| The `api` dependencies and constraints reaching `apiElements` | `AbstractKotlinPlugin` makes `apiElements` extend the main compilation's `api` configuration, "so that the 'api' dependencies are properly published with the 'compile' scope (KT-28355)" | the call reads the configuration through an internal `legacyApiConfigurationName`, which is `KotlinCompilation.apiConfigurationName` (now deprecated at warning level in the API) under another name; same configuration |
| The `kotlin-stdlib` edge | `configureStdlibDefaultDependency`, F11 | none (the file is byte-identical at both tags); the version is the plugin's |
| The publication | none: the plugin creates none for a JVM project; vanniktech's `KotlinJvm` creates it from `components["java"]` (F13) | not applicable |

Release notes, read for the three releases between the 2.2 line and the pin:

- **2.3.0**: the Gradle section covers Gradle and Android Gradle plugin support and a new Experimental API for registering
  generated sources. The breaking changes touching Gradle are: the `testApi` configuration is deprecated ("Kotlin 2.3.0
  deprecates the `testApi` configuration"; use `testImplementation`, or Gradle test fixtures on the JVM), the `kotlin-dsl` plus
  `kotlin("jvm")` combination reports an unsupported-plugin-version warning, and Android and Ant items. `kotlin.publishJvmEnvironmentAttribute`
  is deprecated in 2.3.20; it concerns "the publication of the `org.gradle.jvm.environment` attribute for multiplatform libraries".
- **2.4.0**: the Gradle section covers Gradle 7.6.3 through 9.5.0 support, an AGP minimum, consistent default module names
  (`{group}:{project_name}` on every platform, which sets the JVM `-module-name`, so the name of the `.kotlin_module` file in the
  jar; it does not touch Gradle metadata), and compiler messages in Gradle's Problems API. The compatibility guide removes a
  list of deprecated plugin APIs (`KotlinJvmCompile.moduleName`, `KotlinCompilation.compileKotlinTask`, `KotlinDependencyHandler.platform()`
  and others) and streamlines the ABI-validation DSL. None of these is a published-variant change.
- **2.5.0-RC** (the 2.5 notes are the current pre-release page; there is no 2.5 compatibility guide yet): the stated changes are
  language, standard library, Kotlin/JVM (Java 28 bytecode), Native, Multiplatform (an experimental compilation scheme and a new,
  opt-in `.kar` publication format for Kotlin Multiplatform libraries), JS and compiler items, plus an error on running the
  compiler on a JDK older than 17 (opt out with `-Xallow-pre-17-runtime-jdk`; the build runs on 21). The release-candidate changelog's
  "Tools. Gradle" section lists items for Android, JS, Multiplatform and Swift export and none for JVM publication.

No release note for 2.3, 2.4 or 2.5.0-RC names a change to a JVM-only library's published variants, attributes, edges or
constraints. This is an absence in the notes and a comparison of three source files, not a run on 2.5.0-RC.

### F11. What the published metadata and POM carry for `kotlin-stdlib` on the 2.5.0-RC plugin (source, documentation, Maven Central; read 2026-11-22)

**Evidence tier: documented behaviour (Kotlin's Gradle documentation) confirmed in the plugin source; the resulting published
text is derived, not observed.**

- Kotlin's documentation: the dependency "is added automatically to each source set. The version of the standard library used
  is the same as the version of the Kotlin Gradle plugin." An explicit `kotlin-stdlib` dependency is not overridden.
- The plugin source (`configureStdlibDefaultDependency` and `addStdlibDependency` in `stdlibDependencyManagement.kt`, identical at
  `v2.2.0` and `v2.5.0-RC`): the dependency goes to `KotlinDependencyScope.API_SCOPE` for every non-test compilation (the test
  compilation gets `IMPLEMENTATION_SCOPE`), at the version in `coreLibrariesVersion`, which the documentation equates with the
  plugin's. On a JVM module that is `org.jetbrains.kotlin:kotlin-stdlib`.
- Derived result on 2.5.0-RC: in `module.json`, `dependencies[]` of `apiElements` and `runtimeElements` of every module and of the
  umbrella contains `{"group": "org.jetbrains.kotlin", "module": "kotlin-stdlib", "version": {"requires": "2.5.0-RC"}}`
  (the reproduction observed the same edge as `requires 2.2.0` on the 2.2.0 plugin); in the POM it is a `compile`-scope
  `<dependency>` with `<version>2.5.0-RC</version>`. It is a plain `requires`, not `strictly`, so it adds nothing to
  `dependencyConstraints[]`. The `sourcesElements` variant carries no dependencies.
- `kotlin-stdlib:2.5.0-RC` is on Maven Central (published 2026-11-11; the artifact's `maven-metadata.xml` lists `2.5.0-Beta1`,
  `2.5.0-Beta2` and `2.5.0-RC`, and names `2.5.0-RC` as `release`). Its Gradle Module Metadata declares
  `"org.gradle.status": "release"` and its own `dependencyConstraints[]` use `"requires": "2.5.0-RC"` for `kotlin-stdlib-common`.
  Nothing in its published metadata marks it as a pre-release, so a check cannot rely on a status attribute; the version string
  is the only signal (F12).
- Gradle resolves a plain requirement by taking the highest requested version, and `2.5.0-RC` orders below `2.5.0` (F12), so a
  consumer that also requests `kotlin-stdlib:2.5.0` or later gets that. A consumer on an older Kotlin gets the library's
  `2.5.0-RC` standard library through the `api` edge. What compiling at language version 2.5 asks of consumers is a separate question.
- One option the metadata allows and this design does not take: declaring `kotlin-stdlib` explicitly at a stable version, which
  the plugin then leaves alone. It would publish a standard library older than the API version the code is compiled at; whether
  the compiler accepts that is not established here.

### F12. Telling a pre-release requirement (`2.5.0-RC`) from a lettered version (`1.0.0a`) (documentation; the classification is an inference to be covered by tests; read 2026-11-22)

**Evidence tier: established (Gradle's documented ordering and the organisation's version rule); the regular expressions below
are this file's inference and are not run.**

What the rules say:

- The organisation's scheme is `Major.Feature.MinorChange`, "optionally a trailing letter for a bug fix (e.g. `1.5.2a`)", and a
  library pins a lettered version with `strictly`. The lettered form is exactly one letter attached to the third number.
- Gradle splits a version at `.`, `-`, `_` and `+` and at a digit/letter boundary ("`1a1` becomes `1.a.1`"), compares the parts and
  not the separators, orders "A version with an extra non-numeric part" below the one without, and gives `dev` the lowest rank and
  `rc`, `snapshot`, `final`, `ga`, `release`, `sp` the highest, in that order, case-insensitively. `alpha`, `beta`, `eap`, `m`,
  `cr` and `preview` have no special rank: they are ordinary strings, compared case-sensitively.
- Kotlin names its pre-releases `Beta1`, `Beta2`, `RC`, `RC2`, appended after a hyphen, and its bug-fix releases with a number
  (`2.4.21`), never a letter. Development builds carry `-dev-<n>`.

What follows (derived from the documented rules; not run):

- Ordering cannot classify. `1.0.0a`, `1.0.0-a` and `1.0.0.a` are one version to Gradle, and `1.0.0a < 1.0.0` by the same rule as
  `2.5.0-RC < 2.5.0`. Between the two kinds the order depends on case and on the special `rc` rank: `2.5.0-Beta2 < 2.5.0a <
  2.5.0-RC`, but `2.5.0a < 2.5.0-beta2`. A comparison against the plain release says only "below"; it does not say which kind.
- The distinguishing facts are lexical: the lettered form has no separator before the letter, exactly one letter, and nothing
  after it. A pre-release token (`rc`, `beta`, ...) is two or more letters, or a letter followed by digits (`M1`), usually after a
  separator.

Classification, applied to every `version.requires`, `version.strictly` and `version.prefers` string of the two arrays, and to
the bounds of a range if one appears, in this order:

| Class | Test | Examples | Non-snapshot publication |
|---|---|---|---|
| Snapshot | ends in `-SNAPSHOT`, case-insensitively | `1.0.0-SNAPSHOT` | refuse |
| Lettered fix | whole string matches `\d+\.\d+\.\d+[a-z]` | `1.0.0a`, `1.5.2b` | accept |
| Plain | whole string matches `\d+(\.\d+)*` | `2.4.21`, `1.0.0` | accept |
| Pre-release | a token from the list below at a boundary (start, a separator, or directly after a digit) and followed by a separator, a digit or the end | `2.5.0-RC`, `2.5.0-RC2`, `2.5.0-Beta2`, `2.5.0-dev-12345`, `1.0.0-M1`, `1.0.0rc1` | refuse |
| Other qualifier | everything else | `33.0.0-jre`, `1.0.0.Final` | accept, list in the report |

Token list: `dev`, `alpha`, `beta`, `rc`, `cr`, `m`, `milestone`, `ea`, `eap`, `preview`, `pre`, `snapshot`. The lettered test runs
before the pre-release test, so `1.0.0m` (a lettered fix `m`) is not read as the token `m`, while `1.0.0-M1` is. Rejecting
unlisted qualifiers instead would flag legitimate third-party versions (`-jre`, `-android`); listing them in the report keeps them
visible without failing the release.

Idiomatic shape in this repository's paradigm: a sealed type for the class and one pure function, with the task mapping every
published version through it and collecting violations before one failure:

```kotlin
sealed interface VersionClass {
    data object Snapshot : VersionClass
    data object LetteredFix : VersionClass
    data object Plain : VersionClass
    data object PreRelease : VersionClass
    data object OtherQualifier : VersionClass
}

fun classify(version: String): VersionClass = /* the table above, top to bottom */
```

The component tests of the check are a table of these strings with their classes (the examples above, plus `2.4.21`, `1.5.2a`,
`1.0.0-a`) and one assembled `module.json` per class. A string of the lettered form that carries a separator (`1.0.0-a`) is
"other qualifier" under this table; whether the organisation wants that form accepted for its own artifacts is a question for
its version rule, which names the glued form only.

### F13. vanniktech 0.37.0 with the Kotlin Gradle plugin 2.5.0-RC (changelog, source, repository history; read 2026-11-22)

**Evidence tier: common practice (what the plugin's own project states and tests); nothing shows a run on 2.5.0-RC in a release.**

- Releases: `0.37.0` (2026-06-21) is the newest tag and release; `0.37.0-rc1` precedes it. The changelog of `0.37.0` states
  "Kotlin Gradle Plugin 2.2.0" as the minimum supported version and "Kotlin Gradle Plugin 2.4.0" as the newest version tested
  (with Gradle 9.6.0 and 9.7.0-milestone-1, JDK 26 and Android Gradle plugin 9.2.1 to 9.4.0-alpha01). The build's Gradle is 9.7.1
  and its Kotlin plugin 2.5.0-RC, both beyond that list.
- The JVM path is `KotlinJvm.configure`: it requires the `org.jetbrains.kotlin.jvm` plugin to be applied, then creates a
  `MavenPublication` with `from(project.components.getByName("java"))`, a sources jar and a javadoc jar. The Kotlin Gradle plugin
  API it imports is only in `KotlinMultiplatform` (`KotlinMultiplatformExtension`, `KotlinAndroidTarget`), a path the build does not
  use. So the Kotlin plugin's 2.4 removals and 2.5 changes do not reach the JVM path by its source.
- The default branch (unreleased) has version catalogs `alpha`, `beta` and `rc` in `gradle/`; on 2026-11-11 its `rc` catalog was
  moved from Kotlin 2.4.21 to `2.5.0-RC` (commit "Update dependency org.jetbrains.kotlin.jvm to v2.5.0-RC (#1472)"), its `beta`
  and `alpha` catalogs likewise from `2.5.0-Beta2`. Its default catalog is Kotlin `2.4.21` and Dokka `2.3.0`. The build workflow
  shown in the repository does not name those catalogs, so that they are run against 2.5.0-RC in CI is not established.
- No open or closed issue in the repository mentions Kotlin 2.5 other than the dependency-update pull requests (searched by title
  and body on 2026-11-22).

## 4. How comparable projects do it

- **MyGameTools umbrella** (commit `46697c15`, `gametools/build.gradle.kts`): `api(project(...))` for each module,
  `reexportedModuleSources` from `sourcesElements` into `sourcesJar`, `dokka(project(...))` into the umbrella publication,
  `umbrellaJavadocJar = tasks.named<org.gradle.jvm.tasks.Jar>("dokkaJavadocJar")`, `verifyUmbrellaSourcesJar` and
  `verifyUmbrellaJavadocJar` (configuration-cache safe: they read the archives with `java.util.zip.ZipFile` and capture only the
  archive `Provider`), both in `check`. It publishes no strict constraint and has no metadata check
  ([file](https://github.com/SpartanLabsGaming/MyGameTools/blob/46697c15f4c2386b6cfd17eadefd1bfa1f6d54cd/gametools/build.gradle.kts)).
  Its convention plugin sets `configure(JavaLibrary(javadocJar = JavadocJar.Dokka("dokkaGeneratePublicationHtml"), sourcesJar = true))`.
- **WebTools `build-logic`** (commit `d68ec81e`): `VerifyJavaFloor` is an abstract `DefaultTask` with `@Input`,
  `@Classpath`, `@InputFiles`, `@OutputFile` properties, no `Project` at execution, throws `GradleException`, deletes its report
  first so a failing run leaves none, and fails when "there is nothing to check"; `WebToolsBuild.registerVerifyJavaFloor` feeds
  it `moduleMetadata.from(project.tasks.withType(GenerateModuleMetadata::class.java))`. It has component, integration, e2e and
  configuration-cache-reuse tests of its conventions under `build-logic/src/test/kotlin`. This is the shape to copy for
  `VerifyReleasableMetadata`
  ([`VerifyJavaFloor.kt`](https://github.com/SpartanLaboratories/WebTools/blob/d68ec81e82828911f373bc4940da34580786aaee/build-logic/src/main/kotlin/VerifyJavaFloor.kt),
  [`WebToolsBuild.kt`](https://github.com/SpartanLaboratories/WebTools/blob/d68ec81e82828911f373bc4940da34580786aaee/build-logic/src/main/kotlin/WebToolsBuild.kt)).
- **OkHttp** (commit `c0e010f6`): BOM with project constraints (F9).
- **vanniktech 0.37.0**: `MavenPublishBaseExtension.publishToMavenCentral` (staging repository, `publishToMavenCentral`,
  `publishAndReleaseToMavenCentral`), `EndOfBuildAction.Upload.runAfterFailure = false`; `KotlinJvm.configure` publishes
  Gradle's `java` component (F13).
- **Kotlin Gradle plugin, JVM-only modules** (tags `v2.2.0` and `v2.5.0-RC`): the plugin adds no publication and no variant of its
  own; Gradle's `java` elements carry the dependencies, with `kotlin-stdlib` added to `api` at the plugin's version (F10, F11).
- **Kotlin's own pre-release naming** (`Beta1`, `Beta2`, `RC`, `RC2`, `-dev-<n>`; bug fixes numeric) against the organisation's
  lettered bug fixes (F12): the two schemes never share a token, which is what makes the lexical classification safe.

## 5. Pitfalls and regrets

- **A mismatch inside the build goes to a repository.** The in-build edge is the project only while `strictly` equals the
  project's version. A constraint of `9.9.9` on a project at `1.0.0-SNAPSHOT` fails with "Could not find lab.g:lib-a:9.9.9";
  if that version existed in a configured repository (Maven Local or Central), Gradle would take the published binary instead
  of the project. Take the version string from the same `version` the convention plugin sets, and keep `mavenLocal()` out of
  the repositories of this build.
- **Pins and the project version drift together or not at all.** A lettered release (`1.0.0a`) changes `version`, and with it
  every pin, in one place; the check then compares against the same value, so a stale hard-coded pin cannot pass.
- **The check must select variants by category.** `sourcesElements` has `org.gradle.usage = java-runtime` but category
  `documentation` and no dependencies; filtering by usage reports "no dependency edge" on it.
- **`strictly` sits in a different array than the edge.** Read both `dependencies[]` and `dependencyConstraints[]`; assert the
  edge exists in `dependencies[]` so a constraint cannot hide a dropped dependency.
- **Maven Local is written module by module.** A failed umbrella check can leave the five modules already written locally;
  only the Central upload is all-or-nothing (end-of-build, not after failure). The check runs per project; the root task name
  runs all six.
- **Composite consumers see no conflict** (F5): do not rely on the strict pin to catch a bad version in a development
  composite.
- **A skipped metadata task fails loudly only if the check does.** If `GenerateModuleMetadata` were disabled the input file would
  not exist; the check must treat a missing file or zero library variants as a failure (WebTools does).
- **`strictly` in a library is a public commitment** (Gradle's own wording); consumers who hit a conflict add their own
  `strictly` or `force` until the library bumps its pin (F6).
- **The Maven-visible shape is soft.** The POM shows plain versions and a `dependencyManagement` block; anything verifying
  "strict" must read `.module`, never the POM.
- **A release-candidate plugin publishes a release-candidate standard library edge.** Every module's metadata and POM name
  `kotlin-stdlib:2.5.0-RC` while the pin is the RC, and a consumer on an older Kotlin receives it through the `api` edge. A
  `-SNAPSHOT` publication tolerates this; a non-snapshot one must not. Keep the Kotlin pin in one place so that the move to 2.5.0
  changes the plugin and the stdlib edge together, and let the check, not memory, stop a release made before it.
- **Do not decide "pre-release" from `org.gradle.status` or from ordering.** `kotlin-stdlib:2.5.0-RC` declares
  `org.gradle.status = release`, and ordering puts `1.0.0a` and `2.5.0-RC` on the same side of the plain release (F11, F12).
- **Do not use the compilation-level configuration names.** `KotlinCompilation.apiConfigurationName` is deprecated in the plugin's
  API at warning level, and its own source marks the compilation-level configurations for removal under KT-81136; the build's
  project-level `api(...)` and `constraints { api(...) }` are the supported spelling and are what F1 uses.
- **Classifying by a token list is only as good as the list.** An unlisted pre-release spelling (`-nightly`, `-SNAP2`) passes as
  "other qualifier" and appears in the report only. The component test table is where a new spelling is added.

## 6. Recommendation for this repository

Declare each umbrella edge as `api(project(":<module>"))` plus an `api` dependency constraint by coordinates with
`version { strictly(<shared version>) }`, generated from one list of the five module names, and nothing else (no external-coordinate
edge, no substitution rule, no metadata rewriting). Reject the "constraint on the project dependency" (Gradle forbids a version
there) and the "external coordinate plus substitution" (breaks other projects in the same build). Build
`verifyReleasableMetadata` in build-logic as a typed task shaped like WebTools' `VerifyJavaFloor`: inputs
`tasks.withType<GenerateModuleMetadata>()`, the published version, and a map of `group:module` to the version it must be
strictly pinned to (five entries on the umbrella, empty on the feature modules, a sixth for the WebTools edge later). It fails on a
missing strict pin, on nothing to check, and, when the version is not a snapshot, on any dependency version that the F12
classification calls a snapshot or a pre-release; it lists "other qualifier" versions in its report without failing. Register it
in `bottools.published-library` for all six modules and hang it on every `AbstractPublishToMaven` task so Maven Local, any
repository and Central are all behind it; have the release workflow run `./gradlew verifyReleasableMetadata` from the root.
Keep the Kotlin Gradle plugin 2.5.0-RC and vanniktech 0.37.0 as pinned: the sources show no change the check reads and no JVM-path
dependency of vanniktech on a Kotlin plugin API the 2.4 and 2.5 notes remove, and the implementer re-runs the five checks of the
gaps on the real six modules to turn that into an observation. Expect, and allow while the version is `1.0.0-SNAPSHOT`, a
`kotlin-stdlib` `requires 2.5.0-RC` edge on every artifact; the first non-snapshot publication is blocked by the check until the
plugin is moved to 2.5.0. For the umbrella jars, keep MyGameTools' fold (it works on the versions of the reproduction) but replace both
guards with source-derived expectations as in F8, so that modules with no source are neither required nor allowed to make the
check pass vacuously.
Reasoning: this is the only declaration that publishes `strictly` from a supported API, keeps `project` resolution in the build
and in composites, and leaves the POM harmlessly soft; the typed-task check reads exactly the bytes a consumer receives; and a
lexical classification is the only test that separates a lettered fix from a release candidate, because Gradle's ordering and
published status treat them alike.

## 7. Load-bearing claims

Sources were read on 2026-11-22 unless a claim says otherwise.

1. **A project dependency constraint cannot take a version.** Quote: `throw new UnsupportedOperationException("Cannot change version constraint on a project dependency");` in `DefaultProjectDependencyConstraint.version(Action<? super MutableVersionConstraint>)`. Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/software/dependency-management/src/main/java/org/gradle/api/internal/artifacts/dependencies/DefaultProjectDependencyConstraint.java>. Gradle v9.7.1.
2. **Dependency constraints are published only in Gradle Module Metadata.** Quote: "Dependency constraints are only published when using Gradle Module Metadata." Source: <https://docs.gradle.org/9.7.1/userguide/dependency_constraints.html>. Gradle 9.7.1.
3. **Constraints can be strict.** Quote: "You can make them strict or use rich versions (e.g., ranges, prefer, reject, strictly) when needed." Source: same page. Gradle 9.7.1.
4. **The module metadata format carries `strictly` in `dependencyConstraints`.** Quote: "`strictly`: optional. A strictly enforced version requirement for this dependency." and "This value, nested in elements of the `dependencies` or `dependencyConstraints` nodes, defines the version constraint of a dependency or dependency constraint." Source: <https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/design/gradle-module-metadata-latest-specification.md>. Gradle v9.7.1 (format 1.1).
5. **`endorseStrictVersions` imports the target's strict versions, not a pin of the target itself.** Quote: "If set to `true`, all strict versions of the target module will be treated as if they were defined on the variant defining this dependency." Source: same spec. Gradle v9.7.1.
6. **A strict version conflicting with a consumer's requirement is a resolution error; `strictly` in a library affects consumers.** Quote: "If a strict version conflicts with a consumer’s version requirement, it will trigger a resolution error." and "Using strictly in a library requires careful consideration, as it affects downstream consumers." Source: <https://docs.gradle.org/9.7.1/userguide/dependency_versions.html>. Gradle 9.7.1.
7. **A library's strict version overrides other strict versions found transitively (the consumer must declare its own to move it).** Quote: "They take precedence over transitive dependencies and override any other strict versions found transitively. This could lead to build failures if the consumer project requires a different version." Source: same page. Gradle 9.7.1. (The consumer-side override case in F6 is observed, not quoted.)
8. **Composite substitution matches on group and name, and is not registered for the main build.** Quote: "Gradle will inspect the group and name for the projects in the included build and substitute project dependencies for any external dependency matching ${project.group}:${project.name}. By default, substitutions are not registered for the main build." Source: <https://docs.gradle.org/9.7.1/userguide/composite_builds.html>. Gradle 9.7.1.
9. **Gradle Module Metadata is published automatically by `maven-publish`, by a task that is never up to date.** Quote: "Gradle Module Metadata is automatically published when using the Maven Publish plugin or the Ivy Publish plugin." and "The task generating the module metadata files is currently never marked `UP-TO-DATE`". Source: <https://docs.gradle.org/9.7.1/userguide/publishing_gradle_module_metadata.html>. Gradle 9.7.1.
10. **vanniktech publishes to Central through `PublishToMavenRepository` tasks and uploads at end of build, not after a failure.** Quote: `project.tasks.withType(PublishToMavenRepository::class.java).configureEach { publishTask ->` / `if (publishTask.name.endsWith("ToMavenCentralRepository")) {` in `MavenPublishBaseExtension.publishToMavenCentral`; and `data object Upload : EndOfBuildAction { override val runAfterFailure: Boolean = false }`. Sources: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/MavenPublishBaseExtension.kt> and <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/central/EndOfBuildAction.kt>. vanniktech 0.37.0.
11. **vanniktech 0.37.0's supported range.** Quote, from the `0.37.0` section of the changelog: "#### Minimum supported versions" ... "- Kotlin Gradle Plugin 2.2.0" and "#### Compatibility tested up to" ... "- Gradle 9.6.0" ... "- Gradle 9.7.0-milestone-1" ... "- Kotlin Gradle Plugin 2.4.0". Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md>. 0.37.0 (2026-06-21). The Kotlin Gradle plugin 2.5.0-RC and Gradle 9.7.1 are both above the stated tested range; the reproduction ran clean on Gradle 9.7.1 with Kotlin Gradle plugin 2.2.0, and nothing was run on 2.5.0-RC.
12. **vanniktech's javadoc jar task type.** Quote: `public abstract class JavadocJar : Jar() {` with `import org.gradle.jvm.tasks.Jar` and `archiveClassifier.set("javadoc")`; Dokka variant registered as `dokkaJavadocJar`. Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/tasks/JavadocJar.kt>. 0.37.0.
13. **MyGameTools' umbrella fold and guards.** Quote: "`val reexportedModuleSources: Configuration = configurations.create("reexportedModuleSources") {`", "`from(provider { reexportedModuleSources.files.map(::zipTree) })`" and "`check(html.size >= 20) { "Umbrella javadoc jar has only ${html.size} html files: ${jar.get().asFile}" }`". Source: <https://github.com/SpartanLabsGaming/MyGameTools/blob/46697c15f4c2386b6cfd17eadefd1bfa1f6d54cd/gametools/build.gradle.kts>. Commit 46697c15.
14. **WebTools feeds the generated metadata to a typed check this way.** Quote: "`moduleMetadata.from(project.tasks.withType(GenerateModuleMetadata::class.java))`". Source: <https://github.com/SpartanLaboratories/WebTools/blob/d68ec81e82828911f373bc4940da34580786aaee/build-logic/src/main/kotlin/WebToolsBuild.kt>. Commit d68ec81e.
15. **OkHttp's BOM uses project constraints.** Quote: "`project.rootProject.subprojects.forEach { subproject ->`" ... "`api(subproject)`". Source: <https://github.com/square/okhttp/blob/c0e010f662771b67dc2b9494bf6fcc6c1b45e584/okhttp-bom/build.gradle.kts>. Commit c0e010f6.
16. **The Kotlin Gradle plugin's default standard-library dependency is at the plugin's version.** Quote: "A dependency on the standard library (`stdlib`) is added automatically to each source set. The version of the standard library used is the same as the version of the Kotlin Gradle plugin." and "If you declare a standard library dependency explicitly (for example, if you need a different version), the Kotlin Gradle plugin won't override it or add a second standard library." Source: section "Dependency on the standard library" of <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/gradle/gradle-configure-project.md> (file last changed 2026-10-08; read from the default branch on 2026-11-22; rendered at kotlinlang.org/docs/gradle-configure-project.html).
17. **The plugin adds the standard library to the `api` scope of non-test compilations, at the requested version.** Quote: `KotlinDependencyScope.IMPLEMENTATION_SCOPE` / `} else {` / `KotlinDependencyScope.API_SCOPE`, and `dependencies.kotlinDependency(stdlibModule, it)` inside `dependencySet.addLater(coreLibrariesVersion.map {`. Source: `addStdlibDependency` in <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/internal/stdlibDependencyManagement.kt>; the file is identical at tag `v2.2.0`. Kotlin Gradle plugin 2.5.0-RC.
18. **A JVM module's published variants are Gradle's `java` elements.** Quote: `override val apiElementsConfigurationName: String get() = JavaPlugin.API_ELEMENTS_CONFIGURATION_NAME` and `override val runtimeElementsConfigurationName: String get() = JavaPlugin.RUNTIME_ELEMENTS_CONFIGURATION_NAME` in `KotlinWithJavaTarget`. Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/targets/jvm/KotlinWithJavaTarget.kt>; byte-identical at tag `v2.2.0`.
19. **The plugin publishes `api` dependencies through `apiElements` and sets the library category.** Quote: "add the API dependencies of the main compilation directly to the 'apiElements' configuration, so that the 'api' dependencies are properly published with the 'compile' scope (KT-28355)" and `attributes.attribute(Category.CATEGORY_ATTRIBUTE, project.categoryByName(Category.LIBRARY))`. Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/AbstractKotlinPlugin.kt>. At `v2.2.0` the same, except the call reads `mainCompilation.apiConfigurationName` where `v2.5.0-RC` reads `mainCompilation.legacyApiConfigurationName`.
20. **`legacyApiConfigurationName` is the deprecated `apiConfigurationName` under another name, and compilation-level configurations are slated for removal.** Quote: "After KT-81136 is implemented, and compilation-level configurations are removed, replace these methods to use [KotlinCompilation.defaultSourceSet] configurations directly." and `internal val KotlinCompilation<*>.legacyApiConfigurationName: String get() { @Suppress("DEPRECATION") return apiConfigurationName }`. Source: <https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/tools/kotlin-gradle-plugin/src/common/kotlin/org/jetbrains/kotlin/gradle/plugin/mpp/InternalKotlinCompilation.kt>. Tag `v2.5.0-RC`.
21. **Kotlin 2.5's new publication format is for Multiplatform libraries and opt-in; the other breaking item is the compiler's JDK.** Quote: "Kotlin %kotlinEapVersion% introduces a new publication format for Kotlin Multiplatform libraries that significantly decreases the size of a published library." and "Kotlin %kotlinEapVersion% introduces an error as the next step to raising the minimum JDK version required to run the Kotlin compiler from JDK 8 to JDK 17." (`%kotlinEapVersion%` renders as 2.5.0-RC.) Source: <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/whatsnew/whatsnew-eap.md>, "What's new in Kotlin 2.5.0-RC"; the build-details table of <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/eap.md> lists "2.5.0-RC" "Released: November 11, 2026". Read 2026-11-22.
22. **Kotlin 2.4.0 changed the default module name and removed deprecated plugin APIs; none is a published-variant change.** Quote: "Kotlin 2.4.0 standardizes the default names to `{group}:{project_name}` across all platforms." and "Kotlin 2.4.0 removes the following deprecated Kotlin Gradle plugin APIs:". Sources: <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/whatsnew/whatsnew24.md> and <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/compatibility-guides/compatibility-guide-24.md>. Kotlin 2.4.0. (That no 2.4 item concerns published variants is an absence across both documents.)
23. **Kotlin 2.3.0's Gradle-relevant deprecations.** Quote: "Kotlin 2.3.0 deprecates the `testApi` configuration." and "In Kotlin 2.3.20, the `kotlin.publishJvmEnvironmentAttribute` property is deprecated. This property allowed disabling the publication of the `org.gradle.jvm.environment` attribute for multiplatform libraries." Source: <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/compatibility-guides/compatibility-guide-23.md>. Kotlin 2.3.0 and 2.3.20.
24. **`kotlin-stdlib:2.5.0-RC` is on Maven Central and declares status `release`.** Quote: `"version": "2.5.0-RC",` with `"org.gradle.status": "release"` in its Gradle Module Metadata, and `<release>2.5.0-RC</release>` in the artifact's `maven-metadata.xml`. Sources: <https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib/2.5.0-RC/kotlin-stdlib-2.5.0-RC.module> and <https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib/maven-metadata.xml> (`lastUpdated` 20261111082541). Read 2026-11-22.
25. **Gradle's version ordering.** Quote: "Versions are divided into parts using the characters [. - _ +]." / "Parts containing both digits and letters are split further, e.g., 1a1 becomes 1.a.1." / "Only the parts are compared, not the separators, so 1.a.1, 1-a+1, 1.a-1, and 1a1 are equivalent." / "Extra Non-numeric Part: A version with an extra non-numeric part is lower: 1.1.a < 1.1." / "Non-numeric vs. Non-numeric: Parts are compared alphabetically and case-sensitively: 1.A < 1.B < 1.a < 1.b." / "dev is lower than any other non-numeric part: 1.0-dev < 1.0-ALPHA < 1.0-alpha < 1.0-rc." / "rc, snapshot, final, ga, release, and sp are higher than any other string part, in this order: 1.0-zeta < 1.0-rc < 1.0-snapshot < 1.0-final < 1.0-ga < 1.0-release < 1.0-sp." / "These special values are not case-sensitive and their ordering does not depend on the separator used: 1.0-RC-1 == 1.0.rc.1." Source: "Understanding version ordering", <https://docs.gradle.org/9.7.1/userguide/dependency_versions.html>. Gradle 9.7.1.
26. **The organisation's version scheme and lettered-pin rule.** Quote: "`Major.Feature.MinorChange`, optionally a trailing letter for a bug fix (e.g. `1.5.2a`)." and "**A library pins a lettered version with `strictly`.** When a Spartan Labs library depends on a lettered version of another Spartan Labs artifact, including a multi-module library's umbrella on its own modules, it declares the pin with Gradle's `strictly`". Source: <https://github.com/SpartanLaboratories/.github/blob/main/policy/version/README.md> (R-25, read on the default branch 2026-11-22).
27. **Kotlin's pre-release names.** Quote: "| **Beta1** |", "| **Beta2** |", "| **RC**    |" and "| **RC2**   |" in the table "Kotlin EAP builds typically include the following stages", and "Before every language (_2.x.0_) and tooling (_2.x.20_) release, we ship Early Access Preview (EAP) builds". Source: <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/eap.md>. Read 2026-11-22. Bug-fix releases carry a number: "_Bug fix releases_ (2._x_._yz_)" in <https://github.com/JetBrains/kotlin-web-site/blob/master/docs/topics/releases.md>.
28. **vanniktech's JVM path creates its publication from Gradle's `java` component and uses no Kotlin plugin API.** Quote: `it.from(project.components.getByName("java"))` inside `KotlinJvm.configure`, preceded by `check(project.plugins.hasPlugin("org.jetbrains.kotlin.jvm")) {`. Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/Platform.kt>. 0.37.0. (That the file imports Kotlin plugin types only for `KotlinMultiplatform` is read from its import list: `org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension`, `org.jetbrains.kotlin.gradle.plugin.mpp.KotlinAndroidTarget`.)
29. **vanniktech's default branch moved its release-candidate catalog to Kotlin 2.5.0-RC.** Quote: `-kotlin = "2.4.21"` / `+kotlin = "2.5.0-RC"` in `gradle/rc.versions.toml`, commit message "Update dependency org.jetbrains.kotlin.jvm to v2.5.0-RC (#1472)" (2026-11-11). Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/commits/main> and `gradle/rc.versions.toml` on the default branch. Read 2026-11-22. The newest release is `0.37.0`, published 2026-06-21 (<https://github.com/vanniktech/gradle-maven-publish-plugin/releases>).

## 8. Gaps

- **The behaviours in F1, F3, F5, F6, F7 and F8 are observed in a reproduction build, not quoted from documentation.** The build
  used JDK 23 (not the JDK 21 toolchain), Gradle 9.7.1, Kotlin Gradle plugin 2.2.0 (not the pinned 2.5.0-RC), vanniktech 0.37.0,
  Dokka 2.2.0, a `buildSrc` for the task class (the mechanics are the same as an included `build-logic`), two feature modules plus
  empty ones, and no signing. **Nothing was run on Kotlin Gradle plugin 2.5.0-RC.** F10 to F13 are read from sources and release
  notes: the absence of a change to the published variants is an absence in JetBrains' notes and a comparison of three plugin
  source files, not an observation. The implementer should re-run the five checks (published shape, in-build resolution,
  composite, conflict matrix, check wiring) against the real six modules on the 2.5.0-RC plugin once they exist; if any differs, it
  is a finding for this document.
- **No Kotlin 2.5 compatibility guide exists yet** (the guide folder stops at 2.4, and the 2.5 "What's new" page states that it does
  not cover all changes). The 2.5.0-RC GitHub changelog was read for its Gradle section only. A change to JVM publication that is in
  neither would not be seen here.
- **The published `kotlin-stdlib` edge on 2.5.0-RC is derived, not observed** (F11): the plugin source and documentation give the
  version and scope; the exact JSON and POM text is inferred from the 2.2.0 reproduction. Whether the plugin's `kotlin-stdlib` edge
  appears in the umbrella's metadata when the umbrella has no source at all (no compilation) was not tested; the reproduction's
  umbrella applied the Kotlin plugin and published the edge.
- **The classification of F12 is an inference.** The regular expressions and the token list are not run; they follow from Gradle's
  documented splitting rule and Kotlin's pre-release names. Open: whether the organisation's lettered form allows more than one
  letter or a separator (`1.5.2ab`, `1.5.2-a`); its rule names one trailing letter, glued. How third-party dependencies of the
  library are versioned in practice (and so how many land in "other qualifier") is not known until the modules' dependencies
  exist.
- **Whether the Kotlin compiler marks classes compiled by a release-candidate compiler as pre-release, and what that asks of
  consumers on a stable compiler, is not covered here.** It bears on whether a `1.0.0-SNAPSHOT` built on the RC can be consumed by
  a stable-Kotlin project; it is a separate question.
- **Whether vanniktech runs its `rc` catalog against Kotlin 2.5.0-RC in CI is not established** (F13); the catalog change is the only
  evidence. 0.37.0's stated tested range is Kotlin Gradle plugin 2.4.0, Gradle 9.6.0 / 9.7.0-milestone-1; Gradle 9.7.1 ran without
  problems in the reproduction (on Kotlin plugin 2.2.0) but is beyond what the plugin states. Whether a vanniktech release newer
  than 0.37.0 is due is unknown.
- Not tested: rewriting the metadata (F4); constraints declared in `implementation`; an umbrella that applies only `java-library` with
  vanniktech's `JavaLibrary` platform; `because(...)` mapping to `reason`; the `Map`-valued edge input (the prototype used a `Set`);
  the classification of F12 inside the task; a custom included `build-logic` publication of the task class; Dokka under
  `failOnWarning` on an empty module and Dokka 2.2.0 on a Kotlin 2.5.0-RC build (they belong to the documentation-gates
  question); how vanniktech signing interacts with the check's ordering (the check hangs on the publish task, signing tasks run
  before it independently).
- No public multi-module library was found that publishes `strictly` between its own modules by constraint; "common practice" for
  alignment is a BOM (one example read, OkHttp). The recommendation therefore rests on Gradle's documented behaviour and the
  reproduction, not on precedent.
- The reproduction's `sourcesElements`/Dokka page counts (5 pages per one-class module) are one reading at Dokka 2.2.0 and may change
  with the Dokka version; the guards should assert presence, not that count.
