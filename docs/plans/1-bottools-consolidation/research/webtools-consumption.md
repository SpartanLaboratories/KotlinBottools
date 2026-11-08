# Consuming an unreleased WebTools module from the bottools library

For: SpartanLaboratories/KotlinBottools#1
Date read: 2026-10-20.
Applies to:

- Gradle 9.7.1 (`gradle/gradle` tag `v9.7.1`; user guide and Javadoc at `docs.gradle.org/9.7.1`). `docs.gradle.org/current` serves 9.8.2 with the same composite-builds chapter.
- WebTools `master` @ `85cfbbeb657812472b34ec7b047a53d780b5a157` (default branch `master`, public), its issues #47 and #55, and `io.github.spartanlaboratories:webtools-*` on Maven Central.
- `SpartanLaboratories/.github` @ `caec90a1171d316e763be7129f73853602f2f9d9` (`CONTRIBUTING.md`).
- Sonatype Central documentation (`central.sonatype.org`) and the live snapshot repository `central.sonatype.com/repository/maven-snapshots/`.
- JDA 6.7.0, jda-ktx 0.14.2, OkHttp 5.5.0, kotlinx-coroutines 1.10.2 and 1.11.0, Caffeine 3.3.1.

Nothing was built, published or run. Code shown is a sketch to be proven in the walking skeleton.
The MagicBot edge (composite beside the library, `-SNAPSHOT` fallback, `bottools.ref` pin) is settled in [`unreleased-build-consumption.md`](unreleased-build-consumption.md) and is not repeated here.

## 1. Question

How does the bottools library consume a WebTools module that has not been released, and what does that dependency require of both builds?

Facts about the work that an answer must fit:

- `bottools-stats`, the weather plugin and the feeds plugin consume WebTools' HTTP stack (transport, outbound-URL policy, response cache, call budget, call facade, failure model, test fakes), as WebTools#55 states. The game-provider framework stays in the library.
- bottools 1.0.0 depends on a WebTools release that carries the stack. During development the library consumes WebTools through a Gradle composite build.
- Both builds are on Kotlin 2.2.x and Gradle 9.7.1. The library uses a JDK 21 toolchain and JDA 6.7.0 (which brings `okhttp-jvm` 5.5.0). Consumers are Kotlin on the JVM.
- Publishing to a registry is a deliberate manual act and no registry credential lives in CI. A `-SNAPSHOT` from the default branch is the organisation's staging analogue.
- WebTools is public. KotlinBottools is private until its history rewrite, then public. MagicBot consumes the library and is public.
- WebTools#55's open points (module placement, where the fakes ship, OkHttp version policy, feed parsing, reach, tiers, versioning) are WebTools' to decide. This report states their effect on the library and does not choose among them.

## 2. Bottom line

- **No requirement fails; two conditions on the WebTools release are hard.** Every currently published WebTools artifact is Java 23 bytecode and declares `org.gradle.jvm.version: 23`, so a build on a JDK 21 toolchain cannot use any of them (WebTools#47, open). The composite hides this, because an included WebTools is compiled by the consuming build's own JDK. The release that carries the HTTP stack must publish with a JVM target of 21 or lower, and the library's release gate must resolve the published artifact (composite off) on JDK 21. The second condition is that the release's Kotlin metadata and `kotlin-stdlib` requirement stay readable by a 2.2.x compiler.
- **Composite build: use it, nested, with automatic substitution.** Gradle 9.7.1 supports nested included builds: the build tree is recursive and flattened, substitution rules live in one build-tree-wide registry, and an include of the same directory from two settings files yields one build. WebTools' modules already match `group:name` (group set at the root, project name equal to the artifactId), so no `dependencySubstitution` block is needed. The library's `settings.gradle.kts` includes `../WebTools` when it exists; MagicBot needs no WebTools line and may add its own. Substitution ignores the requested version, so the library can declare the version it will release against from the first commit, and no WebTools `-SNAPSHOT` is needed (WebTools publishes none today). Opt-out switches must be system properties or environment variables: Gradle does not copy `-P` properties into included builds.
- **Release: WebTools first, and the release build runs with the composite off.** Central's validation rejects a release whose POM depends on a `-SNAPSHOT` version (three independent public reports from October 2025 on; Sonatype's requirements page does not state it). Gradle publishes the versions as declared, so the composite does not leak into the POM, but a declared `-SNAPSHOT` string would. Order: release WebTools, wait for it to resolve from `repo1.maven.org` (10 to 30 minutes after publishing), run the library against it with the composite off on JDK 21, then release bottools. Guard the release with a check on the generated POM and module metadata.
- **Pin WebTools exactly (a Gradle `require`), never a range; avoid depending on a lettered fix version.** A shorthand version is a floor that conflict resolution may raise; ranges are dynamic and make the POM unreproducible. Gradle orders `1.0.0a` below `1.0.0`: its comparator treats an extra non-numeric part as lower. A WebTools bug-fix published as a letter suffix therefore loses to the plain release in any graph that also asks for the plain one. This reaches beyond WebTools to the organisation's versioning rule.
- **Classpath alignment: assert it with a targeted check task, not `failOnVersionConflict`.** Gradle picks the highest requested version per module. `com.squareup.okhttp3:okhttp` (root) and `okhttp-jvm` are different modules joined only by a metadata redirect, with no shared capability and no `okhttp-jvm` entry in `okhttp-bom`, so a 4.x/5.x mix on the classpath is not detected by Gradle. `failOnVersionConflict()` fails on any conflict, and the graph already holds one benign conflict (WebTools' `slf4j-api` 2.0.13 against JDA's 2.0.19). The check asserts, per resolved classpath, the selected version of `okhttp-jvm`, `kotlinx-coroutines-core-jvm`, `caffeine`, `okio-jvm` and `kotlin-stdlib`, the absence of legacy `okhttp` 4.x, and, through `ComponentSelectionReason.isCompositeSubstitution`, that the composite substituted exactly when intended.
- **CI: sibling checkout at a pinned commit, plus a published lane and a drift build.** WebTools has no workflow, no `CONTRIBUTING.md`, no `CHANGELOG.md` and no tags, so the library's CI is the first CI to build WebTools code. The library holds `webtools.ref` (one commit SHA); MagicBot's CI reads that file from the checked-out library, so there is one pin for the chain. A scheduled drift build against WebTools' default branch is the early warning; scheduled workflows on a public repository switch themselves off after 60 days without repository activity.

## 3. Findings

### F1. WebTools' publishing state (observed 2026-10-20; established fact)

| Item | State | Source |
|---|---|---|
| Artifacts on Central | `webtools-udp` 1.0.0, 1.1.0, 2.0.0; `webtools-scraping` 1.0.0; `webtools-browser` 1.0.0; legacy single artifact `WebTools` 1.0.0 to 2.0.1a (retired). No `webtools-http`. | `repo1.maven.org/maven2/io/github/spartanlaboratories/<artifact>/maven-metadata.xml` |
| Versions | Per module. Root `allprojects { version = "1.0.0" }` is the default; `webtools-udp` overrides with `version = "2.0.0"`. A new module defaults to `1.0.0`. | `build.gradle.kts`, `webtools-udp/build.gradle.kts` @ `85cfbbe` |
| Coordinates | `group = "io.github.spartanlaboratories"` for all projects; each module calls `coordinates(group.toString(), "webtools-<x>", version.toString())`, so project name, directory and artifactId agree. | same |
| Toolchain pins | Kotlin `2.2.0`, vanniktech `0.36.0` (`apply false` at the root), Gradle wrapper `9.7.1`, foojay resolver `0.8.0`; no `jvmToolchain`, no `jvmTarget`. | `build.gradle.kts`, `settings.gradle.kts`, `gradle/wrapper/gradle-wrapper.properties` @ `85cfbbe` |
| Bytecode and variant | All published modules: class-file major 67 (Java 23) and `org.gradle.jvm.version: 23`. README says "Requires JDK 11 or newer". | `webtools-*-<v>.module`, jar class headers; WebTools#47 |
| `-SNAPSHOT` | None published. `.../maven-snapshots/io/github/spartanlaboratories/webtools-udp/maven-metadata.xml` (and `-scraping`, `-browser`, `-http`) answers 404; the namespace has no directory in the snapshot repository. | `central.sonatype.com/repository/maven-snapshots/` |
| Release process files | None on `master`: no `.github/` (so no workflow), no `CONTRIBUTING.md`, no `CHANGELOG.md`; no git tags and no GitHub releases. Release versions are set by commits such as "build: bump webtools-udp to 2.0.0"; with no workflow, publishing necessarily happened from a maintainer machine. | GitHub contents API (404), `git ls-remote --tags` |
| Organisation rules that apply | Versioning `Major.Feature.MinorChange` with an optional trailing letter for a bug fix; release steps 1 to 6; "Publishing to a package registry ... is manual"; the staging analogue is a `-SNAPSHOT` from the default branch; each repository's `CONTRIBUTING.md` says where its version lives. | `SpartanLaboratories/.github` `CONTRIBUTING.md`, sections "Versioning", "Releasing", "Deployment environments" |

The "Enable SNAPSHOTs" switch is per namespace, so one switch covers WebTools and bottools alike (`io.github.spartanlaboratories`). Whether it is on is a Portal setting behind a sign-in and was not opened (Gap G2).

### F2. Gradle 9.7.1: nested composites and substitution through them (established consensus for the documented parts; source reading for the mechanism)

- **Supported.** The chapter defines the build tree recursively and says nested composites are flattened: all included builds share one parent whatever their nesting. A conditional `includeBuild("../WebTools")` in the library's settings therefore works whether the library is the root build or an included build of MagicBot.
- **Substitution is tree-wide.** `CompositeBuildContext` is created in the build-tree service scope (`CompositeBuildServices.registerBuildTreeServices`). `BuildInclusionCoordinator.makeSubstitutionsAvailableFor` walks `includedBuilds()` transitively and registers each child's modules, and the root registers every library build it has seen. A dependency on `io.github.spartanlaboratories:webtools-<x>` written in a build that is itself included is replaced by the WebTools project, and so is a transitive dependency reached through a published `-SNAPSHOT` bottools POM (substitution replaces external module selectors wherever they occur in the graph).
- **Automatic substitution is keyed on `group:name`, not on version.** `CompositeBuildDependencySubstitutions.getReplacementFor` looks up `selector.getModuleIdentifier()`; capability selectors of the request are carried onto the project selector. `AbstractCompositeParticipantBuildState.registerProject` registers every project of the included build, the root project included. Consequences: the version written in the library's dependency declaration plays no part in composite resolution; `testFixtures(...)` requests survive substitution; and the root project `io.github.spartanlaboratories:WebTools` (WebTools' root declares group and has name `WebTools`) is registered as a substitute for the retired single artifact `WebTools:<2.0.1a`, which is harmless unless something in a graph still asks for it.
- **Declared substitutions are not needed and are ambiguous.** The chapter says explicitly declared substitutions are "only active for the build that defines them"; the source registers them in the same tree-wide context. Relying on automatic substitution avoids having to know which reading holds.
- **Two includes of one directory are one build.** `DefaultIncludedBuildRegistry.registerBuild` keys on the root directory and returns the existing state, with a source comment "TODO: verify that the build definition is the same". MagicBot and the library may both `includeBuild("../WebTools")`; the first registration wins, so a differing `name = ...` on the second is silently ignored. The build path for a directory outside every other build is `:WebTools` (`assignPath` qualifies by the closest ancestor build directory, and none exists).
- **Each included build is configured in isolation** (repositories, plugins, `gradle.properties`); Gradle runtime properties come from the root. WebTools keeps its own Kotlin, vanniktech and foojay plugin versions, and its own `repositories { mavenCentral() }`. The library's version catalog is not visible to it.
- **Included builds do not receive `-P` properties.** `BuildDefinition.startParameterForIncludedBuildFrom` builds the included build's start parameter with `startParameter.newBuild()`. `StartParameter.prepareNewBuild` copies `systemPropertiesArgs` (`-D`) and not `projectProperties` (`-P`); only `prepareNewInstance` copies the latter. A switch read with `providers.gradleProperty` in the library's settings does not see `-P...` given to MagicBot's Gradle. Read the switch from `providers.systemProperty` or `providers.environmentVariable`. This is from source reading and is not stated in the user guide (Gap G7).
- **Configuration cache.** The documented configuration inputs include "File system state checked at configuration time", system properties and environment variables read during configuration, and settings scripts. A settings-time `isFile` check and a `providers.systemProperty` read are therefore inputs, and toggling the composite invalidates the cache entry. Since Gradle 9.0.0 the configuration cache is the preferred mode. A check task that walks a `ResolutionResult` can stay cache-compatible by taking `incoming.resolutionResult.rootComponent` (a live `Provider<ResolvedComponentResult>`) as a task input.
- **Cost.** With automatic substitution the included build "is always fully configured, even if its projects aren't needed". WebTools has three modules (four or five with the HTTP stack); configuration cost is small.
- **Parallel runs.** Gradle does not share the project lock of a shared composite build between invocations, so two builds that include the same WebTools checkout must not run at the same moment.

### F3. Development-time options compared

| | Composite (`includeBuild("../WebTools")`) | WebTools `-SNAPSHOT` from Central | Published WebTools release |
|---|---|---|---|
| Changes visible to the library | Immediately, from the working tree | After a manual publish by WebTools' maintainer; Gradle caches changing modules 24 hours | Only after a release |
| WebTools-side prerequisites | None | Version on the branch must end in `-SNAPSHOT` (WebTools bumps only at release time today); a token on the maintainer's machine; the namespace switch; republishing inside the 90-day cleanup | A release |
| Declared version in the library | May already be the release version (substitution ignores it) | Must be `X-SNAPSHOT`, edited to `X` in the release PR | `X` |
| Reproducibility | Exact when CI checks out a recorded SHA | Poor: changing module, cleaned up after "currently 90 days" | Exact |
| Lone checkout of the library, or of MagicBot beside it | Needs the WebTools sibling | Works if the snapshot exists | Works |
| Risk to a release | A leaked composite tests source that was never published | A leaked `-SNAPSHOT` string is rejected by Central | None |
| Credentials in CI | None | None if published by hand | None |

The composite is the only option that works before WebTools has any release. The snapshot route adds three new WebTools practices (snapshot versions, manual snapshot publishes, a retention clock) for the benefit of lone checkouts only; it is worth adding only if people who cannot check out WebTools need to build the library before the WebTools release.

Consequence for the MagicBot fallback: a manually published `bottools:1.0.0-SNAPSHOT` POM names the WebTools version it was built against. While that version is unreleased and no WebTools snapshot exists, MagicBot's no-sibling fallback cannot resolve it. MagicBot can still include `../WebTools` itself (substitution reaches the transitive request), but the fallback is only self-contained once WebTools has released.

### F4. The MagicBot to bottools to WebTools chain

| | Nested: MagicBot includes the library, the library includes WebTools | Flat: MagicBot includes both |
|---|---|---|
| Works on Gradle 9.7.1 | Yes (F2) | Yes (F2); the library's own include of the same directory deduplicates |
| What MagicBot must know | Nothing about WebTools | WebTools' path, a guard, a switch |
| Pin | One file in the library (`webtools.ref`) read by both CIs | Two files that can disagree |
| WebTools without the library sibling | MagicBot adds its own `includeBuild("../WebTools")`; substitution reaches the snapshot bottools' transitive request | Native |
| Failure mode | `-P` switches do not reach the library's settings (F2) | A second include with a different `name` is ignored |

The nested form is sufficient; the flat form is an additive override, not an alternative. This mirrors Gradle's two documented layouts: co-development ("an included build lives outside the consumer and is substituted temporarily") and an uber-root that "knits together a set of independent builds".

### F5. What the release requires (Central behaviour: common practice; Gradle behaviour: established consensus)

- **A release POM must not name a `-SNAPSHOT` dependency.** Central's component validation fails with `Dependencies to SNAPSHOT versions not allowed for dependency: <g:a>`. Three independent reports: a Sonatype community thread (2025-10-09; the poster says support confirmed the validation change was recent), `opensearch-project/opensearch-jvector#183` (2025-10-20, "1 failed Component Validation") and `NASA-PDS/systems-engineering#141` (2025-10-31, "publishing non-SNAPSHOT artifacts cannot be published to the new Sonatype Central Repo Portal if they have `-SNAPSHOT` dependencies"). One project note (single source, WTC-21) also reports the same refusal for `dependencyManagement` entries and that the whole deployment is refused, not a single component. Sonatype's requirements page says only that the component's own version "cannot end in -SNAPSHOT". The rule is therefore evidenced by practice, not by a documentation page.
- **Gradle publishes the dependency versions as declared** by default, so a composite substitution does not alter the POM or the `.module`; a `-SNAPSHOT` literal in a catalog does.
- **A release built while the composite is active tests unpublished source.** Substituted projects are not changing modules, so `failOnChangingVersions()` and `failOnNonReproducibleResolution()` do not trip on them either.
- **Order and timing.** WebTools first. A Portal deployment becomes downloadable 10 to 30 minutes after the Portal's publish step, and released components are never removed or modified, so a faulty WebTools release is superseded, not repaired. Sonatype also documents that a validated, unpublished deployment "can be referenced as a dependency in your build tool", authenticated with the maintainer's token; that rehearses a WebTools bundle against the library before WebTools is published and stays a local act (CI holds no credential).
- **Version string for the dependency.** Exact pin: a shorthand version is a Gradle `require` ("cannot be lower than what require accepts, but it can be higher through conflict resolution"). It is published into Gradle Module Metadata as `requires` and into the POM as a plain `<version>`. A range is dynamic; Gradle says dynamic versions "can lead to unreproducible builds", and a library that names a range hands the choice to every consumer. `strictly` in a library "affects downstream consumers".
- **The letter suffix does not order as intended.** Gradle's comparator (`StaticVersionComparator`) returns "lower" for a version with an extra non-numeric part: `1.1.a < 1.1`, and `1.0.0a` splits into `1.0.0` plus `a`. During conflict resolution Gradle also prefers versions without qualifiers. A graph that contains `webtools-x:1.0.0` and `webtools-x:1.0.0a` resolves to `1.0.0`. WebTools' own history shows lettered releases (`2.0.0a`, `2.0.0b`, `2.0.0c`, `2.0.1a` of the retired artifact, and MyGameTools declares `WebTools:2.0.0c`). Maven orders an unknown qualifier after the release; Gradle and Maven disagree. If bottools 1.0.0 needs a WebTools fix, the fix must ship as a version that sorts above the plain one (a MinorChange, `1.0.1`), or the library must be the only requester of the lettered version.

### F6. The published WebTools artifacts against the library's JDK (observed; established fact)

- Gradle's `org.gradle.jvm.version` attribute: "lower is compatible with higher". A consumer variant that needs 21 cannot select a producer variant declared 23. WebTools 1.0.0 to 2.0.0 modules declare 23 (module metadata) and contain class-file major 67; a JDK 21 JVM would also refuse to load them. WebTools#47 records the same finding for `webtools-udp` 2.0.0.
- WebTools sets neither a toolchain nor `jvmTarget`, so each published artifact takes the JDK of the maintainer's Gradle run.
- The composite does not show this. An included WebTools is compiled by the consuming build's JDK, so on a JDK 21 CI it produces Java 21 output. Only resolving the published module reveals it. The documented way to compare is a configuration with `resolutionStrategy.useGlobalDependencySubstitutionRules = false`.
- A fix in WebTools (`jvmToolchain(...)` or a `jvmTarget`/`--release` setting) touches `settings.gradle.kts`, where the foojay resolver is `0.8.0`; the foojay maintainers state that 1.0.0 is required for Gradle 9, and MyGameTools uses 1.0.0. WebTools builds on Gradle 9.7.1 today without a toolchain request; whether 0.8.0 fails once a toolchain must be provisioned was not established (Gap G5).

### F7. Classpath alignment on the library's runtime classpath (module metadata read 2026-10-20)

| Module | Requested by | Selected | Notes |
|---|---|---|---|
| `com.squareup.okhttp3:okhttp-jvm` | JDA 6.7.0 (compile): 5.5.0. WebTools (planned, #55): OkHttp, version per policy | highest | JDA's pin has moved with its minors: 5.1.0 (JDA 6.0.0), 5.3.2 (6.3.2), 5.4.0 (6.5.0), 5.5.0 (6.6.0, 6.7.0). |
| `com.squareup.okhttp3:okhttp` (root) | WebTools, if it declares the root coordinate | redirects to `okhttp-jvm` of the same version | `okhttp-5.5.0.module` has `available-at` variants pointing at `okhttp-jvm`, and no capabilities. Its POM lists only `kotlin-stdlib` and `okio`. |
| `com.squareup.okio:okio-jvm` | OkHttp 5.5.0: 3.18.1 | highest | |
| `org.jetbrains.kotlinx:kotlinx-coroutines-core-jvm` | jda-ktx 0.14.2 (compile): 1.10.2; library `api`: 1.10.2; WebTools (#55): 1.10.2 | highest | 1.11.0 would raise the `kotlin-stdlib` requirement from 2.1.0 to 2.2.20. WebTools#55 states that `okhttp-coroutines` needs 1.11.0 and rules it out. |
| `com.github.ben-manes.caffeine:caffeine` | WebTools only (planned): 3.3.1 | highest | Same coordinates across 2.x (2.9.3) and 3.x; JDK 11 baseline; brings `jspecify` 1.0.1 and `error_prone_annotations` 2.50.0 at compile scope. None of JDA 6.7.0's declared dependencies is Caffeine; the storage and configuration dependencies were not checked. |
| `org.slf4j:slf4j-api` | WebTools 2.0.13 (`api`); JDA 6.7.0: 2.0.19 | 2.0.19 | A benign conflict that already exists. |
| `org.jetbrains.kotlin:kotlin-stdlib` | WebTools module: requires 2.2.0; OkHttp: 2.1.21 / 2.2.21; jda-ktx 0.14.2: 2.3.10; coroutines 1.10.2: 2.1.0 | highest | See F8 for the compiler rule. |

- **Two requests for one module.** Gradle "considers all requested versions across the dependency graph and, by default, selects the highest version." For one module there is no conflict to alert on; the higher version simply wins, and the lower request's tested version is not what runs.
- **A mismatched major.** `okhttp:4.12.0` and `okhttp-jvm:5.5.0` are different modules. Gradle's capability mechanism exists because "build tools often can't detect the conflict" between different coordinates; neither OkHttp module declares a capability, so both jars would reach the classpath with overlapping `okhttp3.*` classes. The symptom reported by the AWS SDK for Kotlin documentation for a different OkHttp version on the application classpath is `NoClassDefFoundError` for `okhttp3` classes. That 4.x-against-5.x duplicate-jar outcome is inferred from module metadata and this symptom report, not reproduced (Gap G4). It cannot arise through JDA 6.7.0 and a WebTools on OkHttp 5.x, because both resolve into `okhttp-jvm`.
- **`okhttp-bom` does not reach the JDA edge.** The 5.5.0 BOM constrains `okhttp`, `mockwebserver3`, `logging-interceptor` and other artifacts; its `dependencyManagement` has no `okhttp-jvm` entry. A platform on the root coordinate does not constrain JDA's request for `okhttp-jvm`. A constraint must name `okhttp-jvm`.
- **Mechanisms for asserting alignment**

| Mechanism | What it gives | Limits here |
|---|---|---|
| Dependency constraint (`dependencies { constraints { ... } }`) | A floor ("usually ... at least this version") that participates in conflict resolution; published into Gradle Module Metadata only | Cannot live in a version catalog; does not stop a higher version; not preserved for Maven consumers |
| `java-platform` or imported BOM | One place for versions across the five bottools modules | A published BOM is one more artifact; the catalog already centralises versions within one build |
| `resolutionStrategy.failOnVersionConflict()` | Fails on "any version conflict" in the configuration | Fails today on `slf4j-api` 2.0.13 against 2.0.19 and will on every benign Kotlin stdlib difference |
| `failOnNonReproducibleResolution()` | Fails when the result includes dynamic or changing versions | Blind to composite-substituted projects |
| A check task over `ResolutionResult` | Asserts exact selected versions per module, the absence of legacy `okhttp`, and `isCompositeSubstitution` for `webtools-*`; names the requester through the graph | Written once in build-logic; must be CC-compatible |

### F8. Kotlin and Gradle pins moving in WebTools

- **Gradle.** WebTools' wrapper is not used when it is included: the consuming build's Gradle runs everything (see `unreleased-build-consumption.md` F2). If WebTools adopts a plugin whose minimum Gradle exceeds the library's wrapper, the composite breaks until the library's and MagicBot's wrappers move. The three wrappers (WebTools, library, MagicBot) should sit within one minor.
- **Kotlin metadata.** A 2.2.0 compiler reads metadata up to 2.3.0 (`MetadataVersion` comment: "can read metadata with version <= max(X+1, Y)", `INSTANCE = MetadataVersion(2, 2, 0)` at tag `v2.2.0`). WebTools on KGP 2.3.x writes 2.3.0, still readable; on KGP 2.4.x it writes 2.4.0, unreadable by the library's compiler, in the composite and in the published jar alike, unless WebTools sets `languageVersion`/`apiVersion` to 2.2 (GeneralTools `kmp-build-and-kotlin-compat.md` F1 to F3).
- **Kotlin stdlib requirement.** WebTools' published modules require `kotlin-stdlib` 2.2.0 today, which follows from KGP 2.2.0. A newer KGP raises the `requires` to the KGP version; resolution then puts that stdlib on the library's compile classpath, and the same readability rule applies.
- **KGP and Gradle windows.** KGP 2.2.x is documented for Gradle up to 8.14 and the repositories already run 9.7.1; KGP 2.4.20 and 2.4.21 are documented up to 9.7.0 (README of this research folder, P2). A WebTools move to a newer KGP is compatible with the library's Gradle only while both are inside such a window.
- **Reach.** If WebTools shapes the ports for common code later (WebTools#50 records this for `webtools-udp`), it adopts KGP multiplatform settings; its JVM variant is then selected by attributes, and GeneralTools' multiplatform findings (stdlib pin, `languageVersion`) apply to it.

### F9. WebTools#55's open questions: effect on the library's build, declarations and tests (no choice made)

| Question | Option | Effect on the library |
|---|---|---|
| Module placement | New `webtools-http` | A new coordinate; versioned independently from `webtools-scraping` (root default `1.0.0`); the library declares one `implementation` dependency and inherits no skrapeit, jsoup or unirest. Automatic substitution works because directory, project name and artifactId agree. |
| | Growth of `webtools-scraping` | Same coordinate as today. The published 1.0.0 module's runtime variant carries `skrapeit` 1.1.5, `jsoup` 1.15.4 and `unirest-java` 1.4.9; unless split out or excluded, the library's runtime classpath receives them (the `unirest-java` 1.4.9 POM lists Apache HttpClient 4.5.2 and `jackson-databind`; scopes not checked). The library would need `exclude` rules and a check for them. |
| Where the fakes ship | `java-test-fixtures` on the module | One publication and one version, so fakes cannot drift from the transport. Consumed as `testImplementation(testFixtures("io.github.spartanlaboratories:<module>"))`; published as extra variants in Gradle Module Metadata (capability `<module>-test-fixtures`) plus a `test-fixtures` classifier artifact; resolution fails for a consumer without Gradle Module Metadata. vanniktech 0.37.0 configures fixtures publication and carries a workaround for the missing fixtures sources jar. Substitution carries the capability selector, so the composite works. The fixtures' own dependencies (mock server, coroutines test) reach the library's test classpath. |
| | Separate testing module | An ordinary coordinate with its own version, POM, sources, javadoc and signature. The library pins it separately (a constraint or platform keeps it equal to the transport's version) and the check task asserts it. Usable from Maven consumers. |
| OkHttp version policy | Same version as JDA's | Exact equality can only be asserted by the check task; every JDA minor that moves OkHttp (four different pins in 6.0 to 6.6) requires a WebTools release before the library can follow, so the release order WebTools then bottools is exercised often. |
| | Same major (5.x) | WebTools declares a floor; the selected version can exceed what WebTools tested. OkHttp states "We don't break binary compatibility with non-alpha APIs". The check task asserts `major == 5` and a single `okhttp-jvm`; the drift build can run the library against the newest 5.x. |
| Feed parsing | Moves to WebTools | The feeds plugin loses its parser dependency; WebTools' module gains one (Rome and its XML dependency), covered by the same alignment check. |
| | Stays in the library | The library declares the parser itself; WebTools stays free of an XML stack. |
| Reach | JVM-only | Plain Gradle JVM variants; nothing changes for the library. |
| | Common code later | WebTools adopts the multiplatform plugin; JVM consumers select the `-jvm` variant by attributes, as with OkHttp's root module; Kotlin metadata and stdlib pins (F8) become mandatory; no JVM attribute is published by default for multiplatform JVM variants (GeneralTools finding F10), so a JVM target must be set explicitly. |
| Stability tiers | Seams marked Supported Extension | Same semver promise as Stable Core; the library may expose them without extra markers. |
| | Seams behind an opt-in marker | Kotlin requires "If the signature of an API element includes a type that requires opt-in, the signature itself must also require opt-in." A WebTools Experimental type in a bottools public signature makes that bottools declaration Experimental too, and puts WebTools on consumers' compile classpath (`api`). Used only inside `internal` code, `@OptIn` stays local and WebTools can remain `implementation`. |
| Versioning | `1.N.0` additive | Pin changes to a new minor; `Connector` users unaffected. |
| | `2.0.0` with the `Connector` migration | Applies to `webtools-scraping` only if the stack grows there; a graph that also holds a `1.x` requester of the module resolves to `2.0.0` for everyone. A new module has no such coupling. |

### F10. CI (conventions; Actions documentation)

- **Pinned sibling checkout.** `actions/checkout` documents the side-by-side layout (`unreleased-build-consumption.md` F6 and claim 19). WebTools is public, so checking it out needs no token. The library becomes public in the first phase, before MagicBot exists, so MagicBot's job needs none for the library either.
- **One pin for the chain.** The library keeps `webtools.ref`. MagicBot's job checks out the library at `bottools.ref`, reads `KotlinBottools/webtools.ref`, and checks out WebTools at that SHA into a sibling directory (sketch in section 6).
- **Lanes.** (1) Composite lane: WebTools at `webtools.ref`. (2) Published lane: composite off, resolves Central; it can only pass after the WebTools release and is the gate for F6. (3) Drift lane: WebTools at its default branch; scheduled.
- **Scheduled workflows.** They "will only run on the default branch", "can be delayed during periods of high loads" (schedule off the hour), and in a public repository "are automatically disabled when no repository activity has occurred in 60 days".
- **WebTools has no CI.** The pinned commit has been verified only by whatever its maintainer ran locally. The library's CI compiles it and runs the library's tests; it does not run WebTools' own level tasks unless the job asks for them (`:WebTools:<module>:componentTest` is addressable from the root through a fully qualified task path).

## 4. How comparable projects do it

- **Gradle's own guidance.** The composite-builds chapter (9.7.1), "Co-development Layout Example", includes the library from the consumer's settings; `how_to_use_local_forks` (`gradle/gradle` tag `v9.7.1`) says no explicit substitution statements are needed for an unreleased library. See `unreleased-build-consumption.md` §4.
- **HiveMQ Edge** (`hivemq/hivemq-edge` @ `c87859237e8468dd6a2843013cf94f683d2ba47d`). `hivemq-edge/settings.gradle.kts` includes sibling SDK repositories only when present (`if (file("../../hivemq-edge-extension-sdk").exists()) { includeBuild(...) } else { logger.warn(...) }`) and warns with the clone command otherwise. Its catalog (`gradle/libs.versions.toml`) declares a released SDK version (`hivemq-edge-extensionsdk = "2025.15"`) while the sibling checkout is `version=2026.15-SNAPSHOT` (`hivemq/hivemq-edge-extension-sdk` @ `524dd233ba28e4892c5bdf80f98634b71130c94f`, `gradle.properties`): the declared release version and the composite coexist because substitution ignores the version. This is the closest published match to the recommended shape.
- **AWS SDK for Kotlin** documents OkHttp as a recurring classpath conflict for applications: a different OkHttp version "can cause a `NoClassDefFoundError` for classes in the `okhttp3` namespace", resolved by choosing the newer version with a constraint.
- **OkHttp itself** publishes `okhttp-bom` for keeping its own artifacts equal, and treats 5.x as binary compatible for stable APIs.
- **MyGameTools** (this organisation) consumes WebTools as a released artifact (`api("io.github.spartanlaboratories:WebTools:2.0.0c")` in `gametools-net/build.gradle.kts`), with no composite. No organisation repository uses a cross-repository composite yet; this would be the first.

## 5. Pitfalls and regrets

- **A composite that passes while the published artifact fails.** The Java 23 case (F6) is the worked example. The same shape applies to a missing signature, a missing module metadata file or a wrong POM. Only a lane that resolves from Central finds them.
- **A release built with the composite active.** Local release machines have the sibling checkout. Make the opt-out explicit in the documented release command and refuse publication when the composite is active and the version is not a snapshot.
- **`-P` switches that stop at the root.** A nested library's settings reads `-P` as unset (F2).
- **Duplicate OkHttp jars.** Not detected by Gradle (F7). Pin and assert `okhttp-jvm`, forbid `okhttp` below 5.
- **Lettered versions that lose conflict resolution** (F5). Treat a lettered WebTools release as invisible to Gradle graphs that also hold the plain one.
- **`failOnVersionConflict` as a blanket guard.** It fails on `slf4j-api` today and trains people to silence it.
- **Substitution of the retired root artifact.** The root project `WebTools` is registered as a substitute for `io.github.spartanlaboratories:WebTools`. Harmless unless a graph asks for the retired artifact, in which case it resolves to an empty project.
- **Two builds sharing one WebTools checkout in parallel.** Gradle does not coordinate the project lock across invocations.
- **Retention.** If a WebTools `-SNAPSHOT` path is ever added, it ages out after "currently 90 days" like any other.
- **Drift workflow that switches itself off.** 60 days without repository activity disables a scheduled workflow in a public repository, and a missed schedule is silent.
- **Assuming WebTools is tested at the pinned commit.** It has no workflow (F1).

## 6. Recommendation for this repo

**Shape (all sketches are not run).**

1. **Library `settings.gradle.kts`: optional sibling include, switch by system property.**

```kotlin
// settings.gradle.kts (KotlinBottools)
val webToolsDir = file(providers.systemProperty("bottools.webtools.dir").getOrElse("../WebTools"))
val webToolsComposite = providers.systemProperty("bottools.webtools.composite")
    .map(String::toBoolean).getOrElse(true)

if (webToolsComposite && webToolsDir.resolve("settings.gradle.kts").isFile) {
    includeBuild(webToolsDir)            // automatic substitution by group:name
} else {
    logger.warn("WebTools sibling not included; resolving webtools-* from Maven Central.")
}
```

   Use `-Dbottools.webtools.composite=false` (or the environment equivalent) for the published lane and the release build. MagicBot passes the same `-D` and it reaches the nested library.
2. **Dependency declaration.** The catalog holds the WebTools version the library will release against (`webtools = "<release>"`) and every consumer module uses a plain `implementation(libs.webtools.<module>)`. Composite resolution ignores the version, so no snapshot string is needed. Pin exactly; no range; no `strictly`; never a lettered-only floor.
3. **Convention plugin (build-logic).**
   - Declares the library-level pins once as constraints taken from the catalog: `okhttp-jvm`, `kotlinx-coroutines-core`, `caffeine`, `okio`.
   - Registers `verifyClasspathAlignment`, attached to `check`. For each published module's `runtimeClasspath` it takes `incoming.resolutionResult.rootComponent` and asserts: the selected version of each pinned module equals the catalog value (or the policy chosen by WebTools for OkHttp: equal, or same major); no `com.squareup.okhttp3:okhttp` below 5; every `io.github.spartanlaboratories:webtools-*` component has `selectionReason.isCompositeSubstitution` equal to the intended composite state; no `-SNAPSHOT` version when the project version is not a snapshot. Failure messages name the requester through `ResolvedComponentResult.dependents`.
   - Registers `verifyReleasableMetadata`, a dependency of `publishToMavenCentral` and `publishAndReleaseToMavenCentral`: it reads the generated POM (`dependencies` and `dependencyManagement`) and `.module` and fails on `-SNAPSHOT`, and fails when the composite is active.
   - Does not call `failOnVersionConflict()`.
4. **Published lane.** A CI job and a documented local command with the composite off, on the JDK 21 toolchain, running Levels 1 to 3 against the published WebTools. Gate the library's 1.0.0 on it. Also resolve once with `useGlobalDependencySubstitutionRules = false` in a scratch configuration to compare classpaths with the composite lane.
5. **CI and the chain.**

```yaml
# MagicBot job (sketch); the library's own job is the same minus MagicBot
- uses: actions/checkout@v4
  with: { path: MagicBot }
- uses: actions/checkout@v4
  with: { repository: SpartanLaboratories/KotlinBottools, path: KotlinBottools, ref: "${{ env.BOTTOOLS_REF }}" }
- id: pin
  run: echo "webtools=$(tr -d '[:space:]' < KotlinBottools/webtools.ref)" >> "$GITHUB_OUTPUT"
- uses: actions/checkout@v4
  with: { repository: SpartanLaboratories/WebTools, path: WebTools, ref: "${{ steps.pin.outputs.webtools }}" }
- run: ./gradlew build
  working-directory: MagicBot
```

   `webtools.ref` is a transitional file: it exists while the library depends on unreleased WebTools source, and the drift job replaces it with `master`. After the WebTools release the composite lane becomes optional and the published lane is the default.
6. **Release order.**
   1. WebTools: Java target 21 or lower, Kotlin metadata/stdlib readable by 2.2.x, no `-SNAPSHOT`, Gradle Module Metadata published, release steps from the organisation's `CONTRIBUTING.md`, manual Portal publish.
   2. Wait until the artifact resolves from `repo1.maven.org` (10 to 30 minutes).
   3. Library: run the published lane on JDK 21; bump the pin only if the released version differs from the declared one; run the metadata check; publish.
   Optionally rehearse step 1 with Sonatype's validated-deployment download before pressing publish.

**Reasoning.** The composite is the only route that works before WebTools has a release, it needs nothing from WebTools, and Gradle's version-blind substitution lets the declared version already be the release version, so the release edits no dependency line. What the composite cannot show (published bytecode level, signatures, metadata, ordering of the version string) is exactly what the published lane and the POM check cover. The alignment check is written against this graph (JDA's `okhttp-jvm`, coroutines pinned by jda-ktx) instead of the blanket `failOnVersionConflict`, which would fail on a conflict that already exists.

**Rejected.** WebTools `-SNAPSHOT` from Central as the primary route: it adds three practices WebTools lacks, ages out, and its string must be edited at release without the safety of a guard (the release check covers it, but the composite makes it unnecessary). Version ranges: unreproducible and unnecessary. A published BOM or `enforcedPlatform`: one more artifact, and `enforcedPlatform` exports forced versions to every consumer. A CI-held token: forbidden by the working agreement and unnecessary here.

## 7. Load-bearing claims

Claim numbers are cited in the verification report as WTC-n.

**WTC-1. A build tree is recursive; nested composites are flattened.**
Source: <https://docs.gradle.org/9.7.1/userguide/composite_builds.html>, sections "Composite Build Layout" and "Requirements for Composite Builds", Gradle 9.7.1.
Quote: "For reference, a build tree consists of the root build and all of its included builds, recursively." and "When a composite build includes another composite, Gradle flattens the structure. All included builds share the same parent, regardless of how deeply they were nested."

**WTC-2. Automatic substitution is by `group:name`; rules are global in the build; declared substitutions are build-local.**
Source: same page, sections "Dependency Substitution in Composite Builds" and "Disabling Substitutions for a Configuration".
Quote: "Gradle will inspect the group and name for the projects in the included build and substitute project dependencies for any external dependency matching ${project.group}:${project.name}." and "This is necessary because the rules are globally applied in the build, and Gradle does not consider published versions during resolution by default." and "Explicitly declared substitutions are only active for the build that defines them."

**WTC-3. The substitution registry is build-tree scoped and fed transitively from nested includes.**
Source: <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/composite-builds/src/main/java/org/gradle/composite/internal/CompositeBuildServices.java>, symbols `CompositeBuildServices.registerBuildTreeServices`, `CompositeBuildTreeScopeServices.createCompositeBuildContext`; and <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/core/src/main/java/org/gradle/internal/buildtree/BuildInclusionCoordinator.java>, symbol `BuildInclusionCoordinator.makeSubstitutionsAvailableFor`; tag v9.7.1.
Quote: "registration.addProvider(new CompositeBuildTreeScopeServices());" and "public CompositeBuildContext createCompositeBuildContext() {" and "for (IncludedBuildInternal reference : current.getMutableModel().includedBuilds()) {" followed by "registerSubstitutionsFor((IncludedBuildState) child);".

**WTC-4. Including one directory twice yields one build; the second definition is not compared.**
Source: <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/composite-builds/src/main/java/org/gradle/composite/internal/DefaultIncludedBuildRegistry.java>, symbols `DefaultIncludedBuildRegistry.registerBuild`, `assignPath`; tag v9.7.1.
Quote: "IncludedBuildState includedBuild = includedBuildsByRootDir.get(buildDir);" and "// TODO: verify that the build definition is the same" and "// Get the closest ancestor build of the build directory which we are currently adding".

**WTC-5. Substitution matches the module identifier only, carries capability selectors, and registers every project including the root.**
Source: <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/composite-builds/src/main/java/org/gradle/composite/internal/CompositeBuildDependencySubstitutions.java>, symbols `getReplacementFor`, `execute`; and `.../AbstractCompositeParticipantBuildState.java`, symbols `getAvailableModules`, `registerProject`; tag v9.7.1.
Quote: "ModuleIdentifier candidateId = selector.getModuleIdentifier();" and "ImmutableSet.copyOf(requested.getCapabilitySelectors())" and "for (ProjectState project : projectRegistry.getAllProjects()) {" and "LOGGER.info(\"Registering {} in composite build. Will substitute for module '{}'.\", projectState, moduleId.getModule());".

**WTC-6. Included builds receive system properties but not project properties from the root's command line.**
Source: <https://github.com/gradle/gradle/blob/v9.7.1/subprojects/core/src/main/java/org/gradle/api/internal/BuildDefinition.java>, symbol `startParameterForIncludedBuildFrom`; and <https://github.com/gradle/gradle/blob/v9.7.1/platforms/core-runtime/start-parameter/src/main/java/org/gradle/StartParameter.java>, symbols `StartParameter.newBuild`, `prepareNewBuild`, `prepareNewInstance`; tag v9.7.1.
Quote: "StartParameterInternal includedBuildStartParam = startParameter.newBuild();" and, in `prepareNewBuild`, "p.systemPropertiesArgs = new HashMap<>(systemPropertiesArgs);" while "p.projectProperties = new HashMap<>(projectProperties);" appears only in `prepareNewInstance`.

**WTC-7. The configuration cache records file-system checks, system properties and environment variables read at configuration time; it is the preferred mode since 9.0.0.**
Source: <https://docs.gradle.org/9.7.1/userguide/configuration_cache.html>, sections "Build Configuration Inputs" and the introduction, Gradle 9.7.1.
Quote: "File system state checked at configuration time (file presence, directory contents, etc.)" and "System properties used during the configuration phase" and "Environment variables used during the configuration phase" and "Since Gradle 9.0.0, the Configuration Cache is the preferred mode of execution."

**WTC-8. Gradle selects the highest requested version; different coordinates are not detected without capabilities.**
Source: <https://docs.gradle.org/9.7.1/userguide/graph_resolution.html>, section "A. Version conflicts"; <https://docs.gradle.org/9.7.1/userguide/component_capabilities.html>, section "Selecting between different capability candidates", Gradle 9.7.1.
Quote: "Gradle considers all requested versions across the dependency graph and, by default, selects the highest version." and "Since these implementations typically reside at different group, artifact, and version (GAV) coordinates, build tools often can’t detect the conflict."

**WTC-9. Gradle orders a version with an extra non-numeric part below the plain version.**
Source: <https://docs.gradle.org/9.7.1/userguide/dependency_versions.html>, section "Version ordering"; <https://github.com/gradle/gradle/blob/v9.7.1/platforms/software/dependency-management/src/main/java/org/gradle/api/internal/artifacts/ivyservice/ivyresolve/strategy/StaticVersionComparator.java>, symbol `StaticVersionComparator.compare`; and <https://docs.gradle.org/9.7.1/userguide/graph_resolution.html>, section "Versions with qualifiers"; Gradle 9.7.1.
Quote: "Extra Non-numeric Part: A version with an extra non-numeric part is lower: 1.1.a < 1.1." and "Parts containing both digits and letters are split further, e.g., 1a1 becomes 1.a.1." and `return numericParts1[i] == null ? -1 : 1;` and "By default, Gradle gives preference to versions without qualifiers when resolving conflicts."

**WTC-10. A shorthand version is a `require`; ranges and dynamic versions are unreproducible; `strictly` in a library affects consumers.**
Source: <https://docs.gradle.org/9.7.1/userguide/dependency_versions.html>, sections "Declaring rich versions" and "Declaring dynamic versions", Gradle 9.7.1.
Quote: "When you declare a version using the shorthand notation, then the version is considered a required version:" and "This ensures that the selected version cannot be lower than what require accepts, but it can be higher through conflict resolution, even if the higher version has an exclusive upper bound." and "Using strictly in a library requires careful consideration, as it affects downstream consumers." and "Using dynamic versions and changing modules can lead to unreproducible builds."

**WTC-11. Maven publication writes declared versions by default.**
Source: <https://docs.gradle.org/9.7.1/userguide/publishing_maven.html>, section "Customizing dependencies versions", Gradle 9.7.1.
Quote: "This strategy publishes the versions that are defined by the build script author with the dependency declarations in the dependencies block." and "Any other kind of processing, for example through a rule changing the resolved version, will not be taken into account for the publication."

**WTC-12. Constraints are floors, cannot live in a catalog, and are published only in Gradle Module Metadata.**
Source: <https://docs.gradle.org/9.7.1/userguide/dependency_constraints.html>, Gradle 9.7.1.
Quote: "Constraints are not strict by default (they usually express \"at least this version\")." and "You cannot declare constraints in version catalogs." and "Dependency constraints are only published when using Gradle Module Metadata."

**WTC-13. The resolution APIs the check task uses.**
Source: <https://docs.gradle.org/9.7.1/javadoc/org/gradle/api/artifacts/ResolutionStrategy.html>; <https://docs.gradle.org/9.7.1/javadoc/org/gradle/api/artifacts/result/ComponentSelectionReason.html>; <https://docs.gradle.org/9.7.1/javadoc/org/gradle/api/artifacts/result/ResolutionResult.html>; Gradle 9.7.1.
Quote: "Use this method to configure the resolution to fail eagerly on any version conflict, e.g. multiple different versions of the same dependency (group and name are equal) in the same Configuration." and "Informs whether the selected component is a project substitute from a build participating in a composite build." and "Informs whether the component was selected by conflict resolution." and "The returned Provider is live, and tracks the producer tasks of this resolution result." and "it includes dynamic versions or changing versions and therefore the result may change depending on when the build is executed."

**WTC-14. The JVM version attribute: lower is compatible with higher.**
Source: <https://docs.gradle.org/9.7.1/userguide/variant_attributes.html>, section "JVM ecosystem specific attributes", Gradle 9.7.1.
Quote: "Defaults to the JVM version used by Gradle, lower is compatible with higher, prefers highest compatible."

**WTC-15. Every published WebTools module is Java 23.**
Source: <https://repo1.maven.org/maven2/io/github/spartanlaboratories/webtools-udp/2.0.0/webtools-udp-2.0.0.module>, `webtools-scraping/1.0.0/...module`, `webtools-browser/1.0.0/...module` (read 2026-10-20), jar class headers (major 67); <https://github.com/SpartanLaboratories/WebTools/issues/47>.
Quote (module files): `"org.gradle.jvm.version": 23`. Quote (issue 47): "The README states the library \"Requires JDK 11 or newer\", but `webtools-udp:2.0.0` ships Java 23 bytecode (class-file major version 67; its Gradle module metadata declares `org.gradle.jvm.version: 23`)."

**WTC-16. Versions of the WebTools artifacts on Central.**
Source: <https://repo1.maven.org/maven2/io/github/spartanlaboratories/webtools-udp/maven-metadata.xml>, `.../webtools-scraping/maven-metadata.xml`, `.../webtools-browser/maven-metadata.xml`, `.../WebTools/maven-metadata.xml` (read 2026-10-20); `.../webtools-http/maven-metadata.xml` answers 404.
Quote: `<release>2.0.0</release>` with versions `1.0.0`, `1.1.0`, `2.0.0` (udp); `<release>1.0.0</release>` (scraping, browser); `<release>2.0.1a</release>` (legacy `WebTools`).

**WTC-17. WebTools' build pins and layout.**
Source: <https://github.com/SpartanLaboratories/WebTools/blob/85cfbbeb657812472b34ec7b047a53d780b5a157/build.gradle.kts>, `.../settings.gradle.kts`, `.../gradle/wrapper/gradle-wrapper.properties`, `.../webtools-udp/build.gradle.kts`, `.../webtools-scraping/build.gradle.kts`.
Quote: `kotlin("jvm") version "2.2.0" apply false`; `id("com.vanniktech.maven.publish") version "0.36.0" apply false`; `group = "io.github.spartanlaboratories"` with `version = "1.0.0"` inside `allprojects`; `"api"("org.slf4j:slf4j-api:2.0.13")`; `id("org.gradle.toolchains.foojay-resolver-convention") version "0.8.0"`; `distributionUrl=https\://services.gradle.org/distributions/gradle-9.7.1-bin.zip`; `coordinates(group.toString(), "webtools-udp", version.toString())`; `implementation("it.skrape:skrapeit:1.1.5")`.

**WTC-18. WebTools has no release process files, tags or workflows; the organisation's release rules.**
Source: `gh api repos/SpartanLaboratories/WebTools/contents/<path>?ref=master` for `.github`, `CONTRIBUTING.md`, `CHANGELOG.md` (read 2026-10-20); `git ls-remote --tags` on the repository; <https://github.com/SpartanLaboratories/.github/blob/caec90a1171d316e763be7129f73853602f2f9d9/CONTRIBUTING.md>, sections "Versioning", "Releasing", "Deployment environments".
Quote (API): `{"message":"Not Found","documentation_url":"https://docs.github.com/rest/repos/contents#get-repository-content","status":"404"}`. Quote (CONTRIBUTING): "**Publishing to a package registry (e.g. Maven Central) is manual.** It is irreversible and stays a deliberate human action — no registry credentials live in CI." and "`Major.Feature.MinorChange`, optionally a trailing letter for a bug fix (e.g. `1.5.2a`)." and "a `-SNAPSHOT` publish from the default branch is the staging analogue for downstream projects."

**WTC-19. No WebTools snapshot exists on the Central snapshot repository.**
Source: `GET https://central.sonatype.com/repository/maven-snapshots/io/github/spartanlaboratories/webtools-udp/maven-metadata.xml` (also `webtools-scraping`, `webtools-browser`, `webtools-http`), unauthenticated, 2026-10-20.
Quote (status): `404` for each of the four paths; the HTML directory listing of `.../io/github/spartanlaboratories/` contains no entries.

**WTC-20. A release's own version may not be `-SNAPSHOT`; snapshots are enabled per namespace, unvalidated, and cleaned up after 90 days.**
Source: <https://central.sonatype.org/publish/requirements/> section "Correct Coordinates"; <https://central.sonatype.org/publish/publish-portal-snapshots/> sections "Publishing -SNAPSHOT Releases" and "Enabling -SNAPSHOT Releases For Your Namespace" (read 2026-10-20).
Quote: "The version can be an arbitrary string but cannot end in -SNAPSHOT, since this is the reserved string used to identify versions that are currently in development." and "Selecting \"Confirm\" on the popup will enable -SNAPSHOT publishing on that namespace." and "-SNAPSHOT releases are cleaned up after a period of time (currently 90 days)." and "As with the legacy OSSRH -SNAPSHOT publishing, no validation is performed."

**WTC-21. Central's validation rejects a release that depends on a `-SNAPSHOT` version.**
Source: <https://community.sonatype.com/t/deployment-error-dependencies-to-snapshot-versions-not-allowed/15647> (posts 2025-10-09 to 2025-10-15); <https://github.com/opensearch-project/opensearch-jvector/issues/183> (2025-10-20); <https://github.com/NASA-PDS/systems-engineering/issues/141> (2025-10-31).
Quote (thread): "Dependencies to SNAPSHOT versions not allowed for dependency: org.spigotmc:spigot-api" and "I received a reply to my e-mail that confirms this was indeed a recent change in their validation". Quote (issue 183): "1 failed Component Validation" and "Dependencies to SNAPSHOT versions not allowed for dependency: org.opensearch:opensearch". Quote (issue 141): "publishing non-SNAPSHOT artifacts cannot be published to the new Sonatype Central Repo Portal if they have `-SNAPSHOT` dependencies". A fourth, single-source item (Chinese-language project note, `ACANX/MetaOpen` @ `dec2463dcd6149048e6ee43543f3cf381a55e655`, `Docs/Release/PreReleaseChecklist.md`) reports the refusal for BOM entries and for the whole deployment: "Dependency management dependencies to SNAPSHOT versions not allowed".

**WTC-22. A validated, unpublished Portal deployment can be consumed for testing.**
Source: <https://central.sonatype.org/publish/publish-portal-api/>, section "Manually Testing a Deployment Bundle" (read 2026-10-20).
Quote: "Once a bundle has been validated it can be referenced as a dependency in your build tool of choice."

**WTC-23. Central is immutable, and publication takes 10 to 30 minutes to become downloadable.**
Source: <https://central.sonatype.org/publish/requirements/immutability/> (read 2026-10-20); <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/docs/central.md>, section "Uploading with manual publishing", tag 0.37.0.
Quote: "In order to provide reliable access to open source components we do not remove or modify components once they are publicly available." and "Step 4 can take 10 to 30 minutes and only after it completed the published artifacts will be available for download."

**WTC-24. OkHttp 5 publishes JVM artifacts behind a root redirect with no capability; the BOM lists `okhttp`, not `okhttp-jvm`; stable APIs keep binary compatibility.**
Source: <https://repo1.maven.org/maven2/com/squareup/okhttp3/okhttp/5.5.0/okhttp-5.5.0.module>; <https://repo1.maven.org/maven2/com/squareup/okhttp3/okhttp-bom/5.5.0/okhttp-bom-5.5.0.pom>; <https://raw.githubusercontent.com/square/okhttp/master/CHANGELOG.md> (repository now `lysine-dev/okhttp`), sections "Version 5.0.0" and "Version 5.0.0-alpha.17"; read 2026-10-20.
Quote (module): `"url": "../../okhttp-jvm/5.5.0/okhttp-jvm-5.5.0.module"` inside the `jvmApiElements-published` variant's `available-at`, with no `capabilities` key on any variant. Quote (BOM): `<artifactId>okhttp</artifactId>` and `<artifactId>mockwebserver3</artifactId>` among the managed artifacts; no `okhttp-jvm` entry. Quote (changelog): "OkHttp is now packaged as separate JVM and Android artifacts." and "We don't break binary compatibility with non-alpha APIs."

**WTC-25. JDA 6.7.0 requests `okhttp-jvm` 5.5.0 and `slf4j-api` 2.0.19; its OkHttp pin has moved across 6.x.**
Source: <https://repo1.maven.org/maven2/net/dv8tion/JDA/6.7.0/JDA-6.7.0.pom>; `.../6.0.0/JDA-6.0.0.pom`, `.../6.3.2/JDA-6.3.2.pom`, `.../6.5.0/JDA-6.5.0.pom`, `.../6.6.0/JDA-6.6.0.pom` (read 2026-10-20).
Quote: `<artifactId>okhttp-jvm</artifactId>` with `<version>5.5.0</version>` and `<scope>compile</scope>` (6.7.0); OkHttp versions `5.1.0` (6.0.0), `5.3.2` (6.3.2), `5.4.0` (6.5.0), `5.5.0` (6.6.0); `slf4j-api` `<version>2.0.19</version>` (6.7.0).

**WTC-26. A mixed OkHttp classpath is reported to fail with `NoClassDefFoundError` in `okhttp3`.**
Source: <https://docs.aws.amazon.com/sdk-for-kotlin/latest/developer-guide/ts-faq-dep-conflict-resolution.html>, section "Resolving OkHttp version conflicts in your application" (read 2026-10-20).
Quote: "Your application might include other dependencies or frameworks that bring in a different OkHttp version. This can cause a `NoClassDefFoundError` for classes in the `okhttp3` namespace, such as `okhttp/coroutines/ExecuteAsyncKt` or `okhttp3/ConnectionListener`."

**WTC-27. kotlinx-coroutines and jda-ktx requirements.**
Source: <https://repo1.maven.org/maven2/org/jetbrains/kotlinx/kotlinx-coroutines-core-jvm/1.10.2/kotlinx-coroutines-core-jvm-1.10.2.module>; `.../1.11.0/kotlinx-coroutines-core-jvm-1.11.0.module`; <https://repo1.maven.org/maven2/club/minnced/jda-ktx/0.14.2/jda-ktx-0.14.2.pom> (read 2026-10-20).
Quote: `"module": "kotlin-stdlib"` with `"requires": "2.1.0"` (1.10.2) and `"requires": "2.2.20"` (1.11.0); jda-ktx 0.14.2: `<artifactId>kotlinx-coroutines-core-jvm</artifactId>` with `<version>1.10.2</version>` and `<scope>compile</scope>`.

**WTC-28. Caffeine 3.3.1 has a JDK 11 baseline and two compile-scope annotation dependencies; 2.x and 3.x share coordinates.**
Source: <https://repo1.maven.org/maven2/com/github/ben-manes/caffeine/caffeine/3.3.1/caffeine-3.3.1.module> and `.../caffeine/maven-metadata.xml` (read 2026-10-20).
Quote: `"org.gradle.jvm.version": 11`; `jspecify` `"requires": "1.0.1"`; `error_prone_annotations` `"requires": "2.50.0"`; versions list contains `2.9.3`, `3.0.0` and `3.3.1`.

**WTC-29. `webtools-scraping` 1.0.0's runtime variant carries skrapeit, jsoup and unirest.**
Source: <https://repo1.maven.org/maven2/io/github/spartanlaboratories/webtools-scraping/1.0.0/webtools-scraping-1.0.0.module> (read 2026-10-20).
Quote: `"module": "skrapeit"`, `"module": "jsoup"`, `"module": "unirest-java"` in `runtimeElements`. The `unirest-java` 1.4.9 POM (`https://repo1.maven.org/maven2/com/mashape/unirest/unirest-java/1.4.9/unirest-java-1.4.9.pom`) lists `<artifactId>httpclient</artifactId>` with `<version>4.5.2</version>` and `<artifactId>jackson-databind</artifactId>`.

**WTC-30. Test fixtures are published as extra variants with a capability and a classifier artifact; vanniktech 0.37.0 handles them.**
Source: <https://docs.gradle.org/9.7.1/userguide/java_testing.html>, section "Publishing test fixtures", Gradle 9.7.1; <https://github.com/vanniktech/gradle-maven-publish-plugin/blob/0.37.0/plugin/src/main/kotlin/com/vanniktech/maven/publish/workaround/TestFixtures.kt>, symbols `addTestFixturesSourcesJar`, `fixTestFixturesMetadata`, tag 0.37.0.
Quote: "By convention, test fixtures will be published with an artifact having the test-fixtures classifier." and "test fixtures are published as additional variants in Gradle Module Metadata" and "Gradle automatically creates test fixtures variants with a capability whose name is the name of the main component, with the appendix -test-fixtures." and "Gradle currently doesn't publish a sources jar for test fixtures and the APIs to add one are internal."

**WTC-31. A signature containing an opt-in type must itself require opt-in.**
Source: <https://kotlinlang.org/docs/opt-in-requirements.html>, section "Propagate opt-in requirements" (read 2026-10-20).
Quote: "If the signature of an API element includes a type that requires opt-in, the signature itself must also require opt-in."

**WTC-32. GitHub scheduled workflows run on the default branch, can be delayed, and are disabled after 60 days of inactivity in public repositories.**
Source: <https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows>, section "schedule" (read 2026-10-20).
Quote: "Scheduled workflows will only run on the default branch." and "In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days." and "The schedule event can be delayed during periods of high loads of GitHub Actions workflow runs."

**WTC-33. HiveMQ Edge includes sibling builds only when present and declares released versions.**
Source: <https://github.com/hivemq/hivemq-edge/blob/c87859237e8468dd6a2843013cf94f683d2ba47d/hivemq-edge/settings.gradle.kts>; `.../gradle/libs.versions.toml`; <https://github.com/hivemq/hivemq-edge-extension-sdk/blob/524dd233ba28e4892c5bdf80f98634b71130c94f/gradle.properties>.
Quote: `if (file("../../hivemq-edge-extension-sdk").exists()) {` followed by `includeBuild("../../hivemq-edge-extension-sdk")`; `hivemq-edge-extensionsdk = "2025.15"`; `version=2026.15-SNAPSHOT`.

**WTC-34. A Kotlin 2.2.0 compiler reads class metadata one minor ahead.**
Source: <https://github.com/JetBrains/kotlin/blob/v2.2.0/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt>, symbols `MetadataVersion.INSTANCE`, `INSTANCE_NEXT`, tag v2.2.0; interpreted in `%PROJECTS%/GeneralTools/docs/plans/7-kotlin-multiplatform/research/kmp-build-and-kotlin-compat.md` F1.
Quote: "can read metadata with version <= max(X+1, Y)" and `val INSTANCE = MetadataVersion(2, 2, 0)`.

**WTC-35. The foojay resolver needs 1.0.0 for Gradle 9.**
Source: <https://github.com/gradle/foojay-toolchains/issues/151> (closed 2025-11-13).
Quote: "I'm creating this issue to request that the README be updated to make it clear that version 1.0.0 is required for Gradle 9" and, from the maintainers' reply, "Removed direct references to deprecated JvmVendorSpec.IBM_SEMERU, to prepare for Gradle 9 compatibility." (Reported against 0.9.0; 0.8.0 not tested, Gap G5.)

## 8. Gaps

- **G1. WebTools' Central Portal namespace switch.** Whether "Enable SNAPSHOTs" is on for `io.github.spartanlaboratories` is a Portal setting behind a sign-in; not opened. No snapshot exists in the namespace (WTC-19), so anonymous read of one of its own snapshots is unconfirmed (see `unreleased-build-consumption.md` G2).
- **G2. Nothing was built.** Not run: the nested composite, the version-blind substitution, the `testFixtures` substitution, the `isFile`/`providers.systemProperty` behaviour under the configuration cache, or the check task. They rest on the 9.7.1 documentation and source (WTC-1 to WTC-7, WTC-13). The walking skeleton should build MagicBot with a sibling library that includes a sibling WebTools and run `dependencyInsight` for a `webtools-*` and `okhttp-jvm`.
- **G3. Central's refusal of `-SNAPSHOT` dependencies is not in Sonatype's documentation.** Evidence is a forum thread, two project issues and a project note (WTC-21), all from October 2025 onward. The error text and a poster's account of Sonatype support confirming a "recent change" are the strongest items. Whether the check also covers `provided`/`test` scopes (the forum case was `provided`) and BOM entries rests on one report each.
- **G4. OkHttp 4.x next to 5.x.** The duplicate-jar consequence is inferred from module metadata (no capabilities, different module names) and a symptom report about other OkHttp mixes (WTC-24, WTC-26); no resolved graph was inspected. It does not arise on the planned path (JDA 6.7.0 plus WebTools on 5.x).
- **G5. Foojay 0.8.0 on Gradle 9.** WebTools builds and publishes on 9.7.1 with foojay 0.8.0 today; the 1.0.0 requirement was reported against 0.9.0 (WTC-35). Whether adding a toolchain request in WebTools (needed to fix #47) forces a resolver bump is not established.
- **G6. Whether the alignment check should assert OkHttp equality or the same major** depends on WebTools' decision on the OkHttp policy; this report gives both effects (F9) and does not fix the check's rule.
- **G7. `-P` propagation is from source reading.** The user guide does not state it (WTC-6). A walking-skeleton run with `-Pfoo=1` at the root and a `providers.gradleProperty("foo")` in the included build's settings would settle it.
- **G8. The letter-suffix ordering concern is about the organisation's versioning rule, not only WebTools.** It follows from Gradle's comparator (WTC-9) and was not exercised in a graph. A decision on how bug-fix releases are meant to be consumed by Gradle users (a plain MinorChange for fixes that downstream must require, or a documented caveat) belongs to the organisation's `CONTRIBUTING.md`. It affects `bottools` itself (`1.0.0a` sorts below `1.0.0`).
- **G9. Candidate issues (not filed).** (a) WebTools has no `CONTRIBUTING.md`, workflow, changelog or tags although the organisation's rules expect them. (b) The organisation's trailing-letter rule orders below the plain version in Gradle (G8). (c) WebTools#47 already records the Java 23 bytecode; its fix gates the bottools 1.0.0 release. The caller decides whether to propose them.
- **G10. IDE behaviour** with a nested conditional include (IntelliJ treats included builds as modules; nested includes not tested).
- **G11. Central publication latency** is the documented 10 to 30 minutes (WTC-23); the interval observed for WebTools' own earlier releases was not measured.
- **G12. Test fixtures with Kotlin JVM.** Gradle documents `java-test-fixtures`; vanniktech 0.37.0 has integration tests for it with the Kotlin plugin (`KotlinPluginTest`), but no Kotlin documentation page was read on `internal` visibility between main and fixtures.
- **G13. The pinned WebTools commit has no CI of its own** (F1); the library cannot rely on WebTools' levels being green at `webtools.ref`.
- **G14. WebTools#55 states constraints (coroutines 1.10.2, Kotlin 2.2.x, `explicitApi()`); none was verified against code, because the module does not exist yet.**
- **G15. Hosts.** All hosts used answered on 2026-10-20: `docs.gradle.org`, `central.sonatype.org`, `community.sonatype.com`, `central.sonatype.com` (repository paths only), `repo1.maven.org`, `raw.githubusercontent.com`, `api.github.com` via `gh`, `docs.github.com`, `kotlinlang.org`, `docs.aws.amazon.com`, `lysine.dev` (OkHttp docs, the changelog was read from `square/okhttp` instead). No unreachable source.
