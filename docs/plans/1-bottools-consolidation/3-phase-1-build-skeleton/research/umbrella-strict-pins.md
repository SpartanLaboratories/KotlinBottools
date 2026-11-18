# How the `bottools` umbrella publishes a strict pin on each of its five modules, and how a check reads the pins back before any publish

## 1. Question

How does the umbrella `bottools` (re-exporting `bottools-core`, `bottools-data-sqlite`, `bottools-http`, `bottools-stats` and
`bottools-plugins` as `api`, all six artifacts at one version) publish Gradle Module Metadata whose five module edges carry
`strictly` equal to that version, while the edges still resolve to the sibling projects inside the build and under a composite
(`includeBuild`)? How does a task read the generated metadata as inputs, configuration-cache safe, and run before every publish
task, Maven Local included, asserting the five strict edges and (only for a non-snapshot version) no `-SNAPSHOT` dependency? How
do the umbrella's sources and javadoc jars fold in its modules' content, and how are their guards adapted when the modules hold
little or no source? Applies to Gradle 9.7.1, Kotlin Gradle plugin 2.2.x, vanniktech `com.vanniktech.maven.publish` 0.37.0,
Dokka 2.2.0 (the versions the build pins), JDK 21 toolchain, configuration cache on.

## 2. Bottom line

- **Declare the pin as a dependency constraint by coordinates beside each project dependency.** For each module `m`:
  `api(project(":m"))` plus `constraints { api("$group:m") { version { strictly(<shared version>) } } }`. Gradle 9.7.1 publishes
  it in `variants[].dependencyConstraints[]` of both `apiElements` and `runtimeElements` as `"version": {"strictly": "<v>",
  "requires": "<v>"}`; the matching `variants[].dependencies[]` entry stays `"requires": "<v>"`. Inside the build the constraint
  matches the project component (resolution reasons show `requested|constraint`), no repository is consulted, and vanniktech
  changes nothing about it. Observed in a reproduction build on Gradle 9.7.1.
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
  `dependencyConstraints[]` as well as `dependencies[]`.
- **Umbrella jars.** MyGameTools' fold (a resolvable `reexportedModuleSources` configuration over each module's
  `sourcesElements`, `zipTree` into the umbrella `sourcesJar`; `dokka(project(...))` into `dokkaGeneratePublicationHtml`, which
  feeds `JavadocJar.Dokka`) works unchanged on vanniktech 0.37.0 and Dokka 2.2.0. Its two guards do not carry over: a module with
  no source contributes nothing to either jar (no `<module>/` pages at all in the javadoc), and a tiny module yields about 5 HTML
  pages, so a fixed floor of 20 and hard-coded package names fail. Derive the expectation from the modules' real source files
  and loop over one module list.

## 3. Findings

Observed behaviour below comes from a reproduction build run on Gradle 9.7.1 (JDK 23, Kotlin Gradle plugin 2.2.0, vanniktech
0.37.0, Dokka 2.2.0, two feature modules plus empty ones, one umbrella per declaration variant). Evidence tier for each: **common
practice, reproduced**; the cited Gradle documents and source back the mechanism.

### F1. A constraint by coordinates beside the project dependency publishes `strictly` and resolves to the project (reproduced; Gradle 9.7.1)

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
- An umbrella that applies the Kotlin plugin also publishes `org.jetbrains.kotlin:kotlin-stdlib` `requires 2.2.0` as an edge;
  an umbrella on `java-library` alone does not (not exercised with vanniktech's `JavaLibrary` platform).
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

### F7. Reading the generated metadata as inputs, and running before every publish (prototyped; Gradle 9.7.1, vanniktech 0.37.0)

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
later `bottools-http` to WebTools edge); that variation is not prototyped.

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

### F8. The umbrella's sources and javadoc jars (reproduced; vanniktech 0.37.0, Dokka 2.2.0)

MyGameTools' umbrella (`gametools/build.gradle.kts`, below) builds on these pieces, and each works on the pinned versions:

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
does not apply. A seventh artifact (a platform) would carry the same constraint and add a coordinate; the settled six-artifact
layout rules it out.

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
  `publishAndReleaseToMavenCentral`), `EndOfBuildAction.Upload.runAfterFailure = false`.

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

## 6. Recommendation for this repository

Declare each umbrella edge as `api(project(":<module>"))` plus an `api` dependency constraint by coordinates with
`version { strictly(<shared version>) }`, generated from one list of the five module names, and nothing else (no external-coordinate
edge, no substitution rule, no metadata rewriting). Reject the "constraint on the project dependency" (Gradle forbids a version
there) and the "external coordinate plus substitution" (breaks other projects in the same build). Build
`verifyReleasableMetadata` in build-logic as a typed task shaped like WebTools' `VerifyJavaFloor`: inputs
`tasks.withType<GenerateModuleMetadata>()`, the published version, and a map of `group:module` to the version it must be
strictly pinned to (five entries on the umbrella, empty on the feature modules, a sixth for the WebTools edge later); it fails on a
missing strict pin, on a `-SNAPSHOT` dependency when the version is not a snapshot, and on nothing to check. Register it in
`bottools.published-library` for all six modules and hang it on every `AbstractPublishToMaven` task so Maven Local, any
repository and Central are all behind it; have the release workflow run `./gradlew verifyReleasableMetadata` from the root.
For the umbrella jars, keep MyGameTools' fold (it works on these versions) but replace both guards with source-derived
expectations as in F8, so that modules with no source are neither required nor allowed to make the check pass vacuously.
Reasoning: this is the only declaration that publishes `strictly` from a supported API, keeps `project` resolution in the build
and in composites, and leaves the POM harmlessly soft; the typed-task check reads exactly the bytes a consumer receives.

## 7. Load-bearing claims

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
11. **vanniktech 0.37.0's supported range.** Quote: "#### Minimum supported versions - JDK 17 - Gradle 9.0.0 - Android Gradle Plugin 8.13.0 - Kotlin Gradle Plugin 2.2.0" and "#### Compatibility tested up to - JDK 26 - Gradle 9.6.0". Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/CHANGELOG.md>. 0.37.0 (2026-06-21). Gradle 9.7.1 is above its stated tested range; the reproduction ran clean on 9.7.1.
12. **vanniktech's javadoc jar task type.** Quote: `public abstract class JavadocJar : Jar() {` with `import org.gradle.jvm.tasks.Jar` and `archiveClassifier.set("javadoc")`; Dokka variant registered as `dokkaJavadocJar`. Source: <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/tasks/JavadocJar.kt>. 0.37.0.
13. **MyGameTools' umbrella fold and guards.** Quote: "`val reexportedModuleSources: Configuration = configurations.create("reexportedModuleSources") {`", "`from(provider { reexportedModuleSources.files.map(::zipTree) })`" and "`check(html.size >= 20) { "Umbrella javadoc jar has only ${html.size} html files: ${jar.get().asFile}" }`". Source: <https://github.com/SpartanLabsGaming/MyGameTools/blob/46697c15f4c2386b6cfd17eadefd1bfa1f6d54cd/gametools/build.gradle.kts>. Commit 46697c15.
14. **WebTools feeds the generated metadata to a typed check this way.** Quote: "`moduleMetadata.from(project.tasks.withType(GenerateModuleMetadata::class.java))`". Source: <https://github.com/SpartanLaboratories/WebTools/blob/d68ec81e82828911f373bc4940da34580786aaee/build-logic/src/main/kotlin/WebToolsBuild.kt>. Commit d68ec81e.
15. **OkHttp's BOM uses project constraints.** Quote: "`project.rootProject.subprojects.forEach { subproject ->`" ... "`api(subproject)`". Source: <https://github.com/square/okhttp/blob/c0e010f662771b67dc2b9494bf6fcc6c1b45e584/okhttp-bom/build.gradle.kts>. Commit c0e010f6.

## 8. Gaps

- **The behaviours in F1, F3, F5, F6, F7 and F8 are observed in a reproduction build, not quoted from documentation.** The build used JDK 23 (not the JDK 21 toolchain), Kotlin Gradle plugin 2.2.0, a `buildSrc` for the task class (the mechanics are the same as an included `build-logic`), two feature modules plus empty ones, and no signing. The implementer should re-run the five checks (published shape, in-build resolution, composite, conflict matrix, check wiring) against the real six modules once they exist.
- Not tested: rewriting the metadata (F4); constraints declared in `implementation`; an umbrella that applies only `java-library` with vanniktech's `JavaLibrary` platform; `because(...)` mapping to `reason`; the `Map`-valued edge input (the prototype used a `Set`); a custom included `build-logic` publication of the task class; Dokka under `failOnWarning` on an empty module (belongs to the documentation-gates question); how vanniktech signing interacts with the check's ordering (the check hangs on the publish task, signing tasks run before it independently).
- vanniktech 0.37.0's changelog lists Gradle 9.6.0 as the newest tested release; 9.7.1 ran without problems here but is beyond what the plugin states.
- No public multi-module library was found that publishes `strictly` between its own modules by constraint; "common practice" for alignment is a BOM (one example read, OkHttp). The recommendation therefore rests on Gradle's documented behaviour and the reproduction, not on precedent.
- The reproduction's `sourcesElements`/Dokka page counts (5 pages per one-class module) are one reading at Dokka 2.2.0 and may change with the Dokka version; the guards should assert presence, not that count.
