# What a library built by Kotlin 2.5.0-RC at language and API version 2.5 asks of its consumers

Currency date of every finding: 2026-11-22 (releases, Maven Central metadata, documentation and compiler source read that day; the
compiler source is read at the tag `v2.5.0-RC`, and at `v2.4.0`, `v2.4.21` and `v2.3.21` where a comparison is stated).

## 1. Question

What do consumers of the six published modules (`bottools-core`, `bottools-data-sqlite`, `bottools-http`, `bottools-stats`,
`bottools-plugins`, `bottools`) need, if the modules are built by the Kotlin Gradle plugin 2.5.0-RC at language version 2.5 and API
version 2.5, and again once the build moves to Kotlin 2.5.0?

The answer has to meet these requirements, all stated as facts about the build:

- The modules are published with Gradle Module Metadata, to Maven Local in this unit, and a consumer-side build compiles against what
  was published there. A consumer may instead build the library's source through a composite build (`includeBuild`).
- Consumers are Kotlin consumers on Gradle on the JVM. The JDK toolchain and the Java floor stay 21.
- Kotlin 2.5.0-RC (published 2026-11-11 as a pre-release) is the compiler now. Kotlin 2.5.0 is not released.
- The answer states, from sources: which Kotlin compilers read the class files, what an older one reports, the `kotlin-stdlib` a
  consumer ends up with at compile and run time, whether the release candidate marks its output pre-release and what a stable compiler
  does with such output, and which stable language features a public signature can lean on.

## 2. Bottom line

- **Oldest consumer Kotlin: 2.4.0, on the release candidate and after 2.5.0, with no flag.** A class file compiled at language version
  2.5 carries Kotlin metadata 2.5.0. A compiler whose own metadata version is X reads metadata up to X+1 (minor), so Kotlin 2.4.x
  reads it and Kotlin 2.3.x and older does not (source at `v2.3.21`, `v2.4.0`, `v2.4.21`, `v2.5.0-RC`; Kotlin's library guidance
  says the same in words: "consumers can use any compiler version from the previous language version onwards"). Kotlin states the
  one-version-ahead reading as preferred, not guaranteed. An older compiler reports `class '…' was compiled with an incompatible
  version of Kotlin. The actual metadata version is 2.5.0, but the compiler version 2.3.0 [with language version 2.3] can read
  versions up to 2.4.0.` (the template is Kotlin's test expectation; the filled-in numbers are an inference).
- **`kotlin-stdlib` at compile and run time: 2.5.0-RC now, 2.5.0 after the move, or newer if the consumer's own Kotlin plugin brings a
  newer one.** The Kotlin Gradle plugin adds `kotlin-stdlib` at the plugin's own version to every module, so the published Gradle
  Module Metadata asks for `kotlin-stdlib` 2.5.0-RC (the way kotlinx.serialization 1.13.0, kotlinx.coroutines 1.11.0 and Ktor 3.6.1
  each ask for the stdlib of the Kotlin they were built with). Gradle takes the highest requested version onto both the compile and
  the runtime classpath, and `2.5.0-RC` sorts below `2.5.0`. API version 2.5 means the run-time standard library must be at least
  2.5; a consumer on Kotlin 2.4.x therefore has its stdlib lifted from 2.4.x to 2.5.0-RC by the resolution, and its stable 2.4 compiler
  then reads stdlib classes whose metadata is 2.5.0 (readable, one ahead).
- **The release candidate does not mark its output pre-release, and language version 2.5 is stable in it.** At `v2.5.0-RC` the compiler
  has `LATEST_STABLE = KOTLIN_2_5` and `KotlinCompilerVersion.IS_PRE_RELEASE = false`; the pre-release flag is written only when the
  language version is not stable, or when an experimental feature that forces pre-release binaries is enabled. Kotlin 2.4.x and
  2.5.0 therefore load the classes without the pre-release error. This is the behaviour of every release candidate since Kotlin 2.0
  (the global pre-release switch was removed in 2021 and last used for 2.0 betas). Whether the `kotlin-stdlib` 2.5.0-RC jar carries
  the flag was not read from the jar; by the same rule it does not (inference; see Gaps).
- **Two things would break that.** Enabling, in the library's own compilation, an experimental language feature that the compiler declares as forcing pre-release
  binaries marks the whole output pre-release, and a stable compiler then rejects it ("is compiled by a pre-release version of Kotlin and cannot be loaded by
  this version of the compiler"; override `-Xskip-prerelease-check`, which marks the consumer's own output pre-release in turn).
  And Kotlin does not guarantee compatibility between an EAP build and the final release, so the artifacts built on the RC are
  republished from 2.5.0, not reused.
- **Context parameters are stable from 2.4.0, except context arguments and callable references.** A public signature that uses them
  asks a consumer for Kotlin 2.4 at language version 2.4 or newer (below that, the call is an error asking for
  `-Xcontext-parameters`), and a consumer cannot take a callable reference to such a function. Language features introduced since
  2.2 that are stable at 2.5 ask nothing else of a consumer's compiler (table in F9). The library's design rule of no context
  parameters in public signatures stays sound on these facts.
- **Composite builds read the same bytes.** An included build is configured in isolation (its own plugins, so its own Kotlin 2.5.0-RC),
  and the consumer compiles against its output as it would against Maven Local; the same floor, the same stdlib lift, the same absence
  of a pre-release mark apply.

## 3. Findings

### F1. A newer language version raises the consumer's compiler floor, and Kotlin says by how much (Established: Kotlin's own guidance and source agree)

- Kotlin's library guidance: the language version "determines which Kotlin compiler versions can compile code that directly uses your
  library", and the API version "determines the minimum Kotlin standard library version required at runtime". "On the JVM, consumers
  can use any compiler version from the previous language version onwards. For example, if your library uses language version 2.2,
  consumers can use compiler version 2.1.x, 2.2.x or later." For language version 2.5 that is compiler 2.4.x or later. Source:
  [Kotlin/api-guidelines, `api-guidelines-backward-compatibility.md`](https://github.com/Kotlin/api-guidelines/blob/113c6ab3a5a358af6259fea0abd3ee04657f6f44/docs/topics/api-guidelines-backward-compatibility.md)
  (head of the repository, 2026-09-07), published at
  [kotlinlang.org](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html). Applies to Kotlin 2.x on the JVM.
- Kotlin's binary-compatibility statement for a stable compiler: all binaries are backward compatible; "Older compilers reject
  binaries that rely on new features"; and the format is "Preferably (but we can't guarantee it) … mostly forwards compatible with the
  next language release, but not later ones (in the cases when new features are not used, for example, 1.9 can understand most
  binaries from 2.0, but not 2.1)". So the one-version-ahead reading is a stated preference, not a guarantee, and holds "mostly" for
  binaries that do not use new features. Source:
  [Kotlin evolution principles](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/kotlin-evolution-principles.md)
  (`kotlin-web-site` head 2026-11-20).

### F2. The metadata check in the compiler: what it reads and what it reports (Established: source at four tags)

- `MetadataVersion.lastSupportedVersionWithThisLanguageVersion` documents the rule: "Compiler of deployVersion X (INSTANCE) with LV Y
  (metadataVersionFromLanguageVersion) can read metadata with version <= max(X+1, Y)", with `INSTANCE_NEXT = INSTANCE.next()` (the
  next minor). Comparison is on major and minor only. `INSTANCE` is `MetadataVersion(2, 2, 0)` at `v2.2.21`, `(2, 3, 0)` at
  `v2.3.21`, `(2, 4, 0)` at `v2.4.0` and `v2.4.21`, `(2, 5, 0)` at `v2.5.0-RC`; the rule's code is identical at all of them.
  Source: [`MetadataVersion.kt` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt).
- The metadata version a compilation writes is derived from the language version: `LANGUAGE_TO_METADATA_VERSION` maps
  `KOTLIN_2_2` to `2.2.0`, `KOTLIN_2_4` to `2.4.0` and `KOTLIN_2_5` to `MetadataVersion.INSTANCE` (2.5.0), and
  `CompilerConfiguration.metadataVersion()` returns `languageVersion.toMetadataVersion()` unless overridden. A 2.5 compiler
  held at language version 2.2 would therefore write 2.2.0; at language version 2.5 it writes 2.5.0. Source:
  [`metadataHelpers.kt` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/frontend.common/src/org/jetbrains/kotlin/util/metadataHelpers.kt).
- Consequence (from the two rules above): metadata 2.5.0 is readable by compilers with `INSTANCE` 2.4 (limit 2.5), 2.5 and later,
  and not by `INSTANCE` 2.3 or older (limit 2.4). The oldest such release is **2.4.0**.
- Strict semantics narrow this: a class compiled with `-Xgenerate-strict-metadata-version` gets `extraInt` flag 3, and the limit is
  then `INSTANCE` itself, so only a compiler of the same minor reads it ([`Metadata.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/stdlib/jvm/runtime/kotlin/Metadata.kt),
  [`CommonCompilerArguments.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/arguments/src/org/jetbrains/kotlin/arguments/description/CommonCompilerArguments.kt):
  the option defaults to `false`). The build does not set it.
- What the older compiler reports: an error per use site, then a summary. Kotlin's own test expectation
  (`wrongMetadataVersion/output.txt`) reads: `error: incompatible classes were found in dependencies. Remove them from the classpath or
  use '-Xskip-metadata-version-check' to suppress errors`, and per class `class 'a.A' was compiled with an incompatible version of
  Kotlin. The actual metadata version is 42.0.0, but the compiler version $ABI_VERSION$ [with language version 1.9.0] can read versions
  up to $ABI_VERSION_NEXT$.` plus `The class is loaded from <jar>!/<class file>`. A real report of the same text on a stdlib class:
  `Class 'kotlin.sequences.Sequence' was compiled with an incompatible version of Kotlin. The actual metadata version is 2.1.0, but the
  compiler version 1.9.0 can read versions up to 2.0.0.` ([fwcd/kotlin-language-server#609](https://github.com/fwcd/kotlin-language-server/issues/609),
  2025-01-18). The option's own description is "Allow loading classes with bad metadata versions and pre-release classes."; no source
  read says it makes a newer binary format work, only that it silences the check.
- Tools that embed their own, older Kotlin (a language server, an analysis tool, an IDE's bundled compiler) apply the same limit to
  their own version, which is the report in the language-server issue above.

### F3. Which standard library the published modules ask for, and what resolution puts on the classpaths (Established for the mechanism; the exact RC resolution is inference)

- The Kotlin Gradle plugin adds the standard library itself: "A dependency on the standard library (`stdlib`) is added automatically to
  each source set. The version of the standard library used is the same as the version of the Kotlin Gradle plugin." An explicit
  declaration is not overridden. Source: [Kotlin Gradle documentation](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/gradle/gradle-configure-project.md)
  (section "Dependency on the standard library"). So the six modules built by plugin 2.5.0-RC publish a requirement on
  `kotlin-stdlib:2.5.0-RC`, and on `2.5.0` after the move.
- What published Gradle Module Metadata of libraries built this way looks like: `kotlinx-serialization-core-jvm` 1.13.0 (built on Kotlin
  2.4.10) lists `kotlin-stdlib` with `"requires": "2.4.10"` in both `jvmApiElements-published` and `jvmRuntimeElements-published`;
  `kotlinx-coroutines-core-jvm` 1.11.0 requires `2.2.20`; `ktor-client-core-jvm` 3.6.1 requires `2.3.21`. The requirement appears on the
  API variant, so it reaches a consumer's compile classpath as well as its runtime classpath.
- Resolution: "Gradle will consider all requested versions, wherever they appear in the dependency graph. By default, it will select
  the highest one out of these versions." Version ordering: "A version with an extra non-numeric part is lower: `1.1.a < 1.1`", so
  `2.5.0-RC` is lower than `2.5.0` and a consumer on 2.5.0 is never held at the RC. A consumer on Kotlin 2.4.21 has its own default
  `kotlin-stdlib:2.4.21` and the library's `2.5.0-RC`; Gradle selects `2.5.0-RC`, on compile and runtime classpaths alike (inference
  from the two quoted rules; no build was run). Source: Gradle 9.7.1 documentation,
  [`dependency_constraints_conflicts.adoc`](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/reference/dependency-management/basics/dependency_constraints_conflicts.adoc),
  [`dependency_versions.adoc`](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/reference/dependency-management/declaring-dependencies/dependency_versions.adoc).
- What API version 2.5 asks at run time: "The API version determines the minimum Kotlin standard library version required at runtime"
  and "Your consumers also need to provide a Kotlin standard library version that is at least as new as your library's configured API
  version" (library guidance above). The compiler's option text: "if you use Kotlin compiler version 2.4.0 with `-api-version=2.1`, your
  code remains compatible with Kotlin standard library 2.1.0". The compiler source shows the mechanism: some features gate on an API
  version and emit calls to standard-library members that exist only from that version (`WrapContinuationForTailCallFunctions`,
  `NoWhenBranchMatchedExceptionWithMessage` and `DnnTypeForUnboundedReifiedTypeParameters` carry `sinceApiVersion = ApiVersion.KOTLIN_2_5`
  in [`LanguageVersionSettings.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt)).
  A consumer whose run-time stdlib is older than 2.5 can hit a missing-member error in library code (inference from `sinceApiVersion`).
  Public `inline` functions copy the library's compiled body into the consumer's classes, so they pull the same requirement into the
  consumer's own bytecode (inference).
- On the compile side, the standard library classes themselves carry the metadata of the Kotlin that built them (the language-server
  report above is on `kotlin.sequences.Sequence`). `kotlin-stdlib` 2.5.0-RC is on Maven Central (published 2026-11-11; `2.5.0` is
  absent from `maven-metadata.xml`), and by F2 its classes carry metadata 2.5.0 (inference: the jar was not opened). A 2.4.x consumer
  reads it for the same reason it reads the library; a 2.3.x consumer would fail on the stdlib classes first, before it reaches any
  library class. A consumer's own `-api-version` still hides stdlib declarations newer than it: "The compiler ignores declarations that
  use Kotlin standard library APIs introduced in later versions".
- Lowering the language version to 2.2 would not lower this requirement. The default stdlib dependency is the plugin's version, and the
  API version governs which stdlib members compiled code may call, not what the published metadata requests. Only an explicit stdlib
  declaration at an older version changes the request (documented as not being overridden), and that conflicts with API version 2.5.

### F4. The release candidate does not mark what it compiles as pre-release (Established: source at `v2.5.0-RC`; the stdlib jar is inference)

- `KotlinCompilerVersion.IS_PRE_RELEASE` is `false` at `v2.5.0-Beta1`, `v2.5.0-Beta2`, `v2.5.0-RC`, `v2.4.21`, `v2.4.0-RC`, `v2.4.0`,
  `v2.3.0-RC`, `v2.3.0` and `master`. Its comment: "True if the latest stable language version supported by this compiler has not yet been
  released. Binaries produced by this compiler with that language version (or any future language version) are going to be marked as
  "pre-release" and will not be loaded by release versions of the compiler." Source:
  [`KotlinCompilerVersion.java` at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/compiler.version/src/org/jetbrains/kotlin/config/KotlinCompilerVersion.java).
- Language version 2.5 is stable in the release candidate: `LATEST_STABLE = KOTLIN_2_5`, and the table in the source reads
  "2.3..2.5 STABLE, 2.6..2.7 EXPERIMENTAL", with `FIRST_SUPPORTED = KOTLIN_2_2`. (At `v2.4.21` `LATEST_STABLE` is `KOTLIN_2_4`: a
  2.4 compiler asked for language version 2.5 would produce pre-release output; no consumer does that.) The rule that sets the flag:
  `fun LanguageVersion.isPreRelease()` returns `true` if `!isStable`, and otherwise `KotlinCompilerVersion.isPreRelease() && this ==
  LanguageVersion.LATEST_STABLE`, which is `false` at the release candidate. `LanguageVersionSettingsImpl.isPreRelease()` adds a
  second route: any enabled feature for which `forcesPreReleaseBinariesIfEnabled(languageVersion)` holds, that is a feature with
  `forcesPreReleaseBinaries = true` whose `sinceVersion` is not yet stable. At the tag that set includes `CompanionExtensions`,
  `FullValueClasses`, `LocalTypeAliases`, `ContractSyntaxV2` and `LateinitVals`; `ExplicitContextArguments` and the context-sensitive
  resolution feature are not in it.
- The flag is written by `writeKotlinMetadata`: `if (config.languageVersionSettings.isPreRelease()) { flags = flags or
  JvmAnnotationNames.METADATA_PRE_RELEASE_FLAG }`, stored in the `@Metadata` annotation's `xi` value (flag 1: "this class file is
  compiled by a pre-release version of Kotlin and is not visible to release versions"). Sources:
  [`LanguageVersionSettings.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt),
  [`writeKotlinMetadata.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/backend/src/org/jetbrains/kotlin/codegen/writeKotlinMetadata.kt),
  [`Metadata.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/stdlib/jvm/runtime/kotlin/Metadata.kt).
- The history that explains it: the global switch was removed in 2021 ("milestones of major Kotlin releases (e.g. 1.6.0-M1) will NOT
  generate prerelease binaries anymore … Compiler will still generate prerelease binaries if a non-stable language version is used"),
  restored for the 2.0 betas ([KT-62058](https://youtrack.jetbrains.com/issue/KT-62058): "`2.0.0-rc*` or `2.0.*` can compile against
  `1.9 with LV 1.9`, `2.0.0-rc*`, or `2.0.*`, but cannot compile against `2.0.0-dev*` or `2.0.0-beta*`"), and dropped before 2.0.0-RC
  ([KT-62063](https://youtrack.jetbrains.com/issue/KT-62063), commit "K2: drop poisoning flag due to upcoming 2.0.0-RC"). The rule
  since then: a release candidate and the release are mutually readable; an experimental feature poisons the output.
- The poisoning route is real and has bitten library authors: a library compiled with `-Xannotation-default-target` (then
  experimental) made a same-version compiler report "is compiled by a pre-release version of Kotlin"; the maintainers' answer was "You're
  using `-Xannotation-default-target` which is an unstable feature, so it causes binaries to be marked as pre-release"
  ([KT-75588](https://youtrack.jetbrains.com/issue/KT-75588), 2.1.20-RC; fixed in 2.1.21 for that flag only).
- `kotlin-stdlib` 2.5.0-RC: no source read states whether its class files carry the flag. By the rule above it is not marked unless its
  build enabled a forcing feature; the stdlib's build file at the tag sets no language version of its own
  (`libraries/stdlib/jvm/build.gradle.kts` has only commented placeholders). Marked as inference; see Gaps.

### F5. What a stable compiler does with a pre-release class, and the override (Established: source and Kotlin's test expectations)

- On the loading side, `DeserializedDescriptorResolver.isPreReleaseInvisible` is true when `reportErrorsOnPreReleaseDependencies` holds
  and the class header has the flag; `reportErrorsOnPreReleaseDependencies = !skipPrereleaseCheck &&
  !languageVersionSettings.isPreRelease() && !KotlinCompilerVersion.isPreRelease()`. A consumer compiled at a stable language version
  by a non-pre-release compiler (2.4.x, and 2.5.0 once out) reports it; a consumer whose own settings are pre-release does not. Source:
  [`CommonCompilerDeserializationConfiguration.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/frontend.common/src/org/jetbrains/kotlin/resolve/CommonCompilerDeserializationConfiguration.kt),
  [`DeserializedDescriptorResolver.kt`](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/descriptors.jvm/src/org/jetbrains/kotlin/load/kotlin/DeserializedDescriptorResolver.kt).
- Error text (Kotlin's expectation `releaseCompilerAgainstPreReleaseLibrary/output.txt`): `class 'a.A' is compiled by a pre-release
  version of Kotlin and cannot be loaded by this version of the compiler`, with the summary `error: pre-release declarations were found
  in dependencies. Please exclude the dependencies with such declarations and recompile with a release compiler, or use
  '-Xskip-prerelease-check' to suppress errors. Note that in the latter case the compiled declarations will also be marked as
  pre-release.` Source: [test data at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/testData/compileKotlinAgainstCustomBinaries/releaseCompilerAgainstPreReleaseLibrary/output.txt).
- The overriding options: `-Xskip-prerelease-check` ("Allow loading pre-release classes.") and `-Xskip-metadata-version-check` ("Allow
  loading classes with bad metadata versions and pre-release classes."). In a Gradle consumer both go through
  `compilerOptions.freeCompilerArgs`. They are suppression, and the first one infects the consumer's own output (above).
- What this means here: with no experimental flag in the library's compilation, the RC-built modules are not pre-release for any
  consumer, stable or not. Enabling one of that set (for example an opt-in language feature for a convenience) would make every 2.4.x and 2.5.0
  consumer fail until it adds the override. A consumer on the release candidate itself is unaffected either way, because a compiler
  whose language version is pre-release does not report it.

### F6. Consumers of a library built on a pre-release Kotlin: what Kotlin says about the risk (Established: Kotlin documentation)

- Kotlin encourages it for library authors: "Working with EAP versions allows you to support the latest Kotlin versions in your library
  almost immediately with the Stable release". It also disclaims stability: "We don't guarantee compatibility between EAP and final
  versions of the same release." Source: [Kotlin EAP page](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/eap.md),
  which lists `2.5.0-RC` (2026-11-11) as the only EAP build, as does `v.list` (`kotlinEapVersion` = `2.5.0-RC`).
- Release state read on 2026-11-22: `v2.5.0-RC` is marked pre-release (published 2026-11-11), the newest stable is `v2.4.21`
  (2026-10-08), and `kotlin-stdlib`'s `maven-metadata.xml` (last updated 2026-11-11) ends at `2.5.0-RC`.
- Both consequences for a consumer are therefore: it can use the artifacts with Kotlin 2.4.x or 2.5.0-RC, and it runs on a
  pre-release standard library (2.5.0-RC) until the library republishes on 2.5.0. Kotlin's EAP note says such a build "may not be
  reliable".

### F7. Composite builds (Established for isolation; the rest follows from F2 to F5)

- "Each included build is configured in isolation — included builds do not share repositories, plugins, or properties with one another
  or with the root build, but they can be executed together and depend on each other's tasks"; and "Gradle automatically substitutes
  the external dependency with a local source" ([Gradle 9.7.1, composite builds](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/structuring-builds/composite_builds.adoc)).
- So the included library compiles with its own Kotlin plugin (2.5.0-RC), and the consumer compiles its own sources with its own Kotlin.
  The class files the consumer reads are the same as from Maven Local, with the same metadata and no pre-release flag, and the library's
  `kotlin-stdlib:2.5.0-RC` request joins the consumer's graph by substitution. Nothing in F2 to F5 changes; nothing in the consumer's
  Kotlin version has to equal the library's. The one coupling is Gradle itself: both builds run in one Gradle, so that Gradle must be
  one the library's Kotlin plugin supports (the supported range is another question's subject).
- After the move to 2.5.0 the included build compiles with 2.5.0 and requests `kotlin-stdlib:2.5.0`; the floor stays 2.4.0.

### F8. What changes at the move from 2.5.0-RC to 2.5.0 (Established for the compiler rules; the final jars are not yet published)

- The compiler rules that fix the floor do not depend on the patch version: metadata version `2.5.0` for language version 2.5, limit by
  minor. The floor stays Kotlin 2.4.0.
- The stdlib request rises from `2.5.0-RC` to `2.5.0`; consumers resolve to `2.5.0` (higher by Gradle's ordering).
- Artifacts published from the release candidate remain in any Maven Local that holds them until they are rebuilt and republished; the
  rebuilt ones are what the consumer-side build should read. The EAP page above gives no compatibility promise between the two.
- No source read says the 2.5.0 compiler will set `IS_PRE_RELEASE`; at every tag read it is `false`.

### F9. Language features stable at 2.5 that were not at 2.2, and what a public signature using one asks of a consumer (Established: What's new pages and compiler source)

Stable-since versions come from the "What's new" pages ([2.3](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/whatsnew/whatsnew23.md),
[2.4](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/whatsnew/whatsnew24.md),
[2.5 EAP](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/whatsnew/whatsnew-eap.md));
`sinceVersion` and the consumer asks come from `LanguageFeature` and the checkers at `v2.5.0-RC`.
Features that were already stable in 2.2 (guard conditions, non-local `break` and `continue`, multi-dollar interpolation) are not listed.
The 2.3.20 and 2.4.20 tooling releases promoted no language feature (2.4.20 made `when` compilation with `invokedynamic` on JVM 21 and
later stable and the default: a code-generation default, and the floor of 21 already covers it).

| Feature | Stable since | Still experimental part | What a public signature using it asks of a consumer |
|---|---|---|---|
| Nested type aliases | 2.3.0 | local type aliases (`LocalTypeAliases`, no stable version) | A nested alias carries a metadata requirement "language version 2.3" (serializer: `if (typeAlias.classId.isNestedClass) … NestedTypeAliases`); met by compiler 2.4. |
| Data-flow-based `when` exhaustiveness; `return` in an expression body with an explicit return type | 2.3.0 | none | Nothing: library-source only. |
| Context parameters | 2.4.0 | context arguments (`-Xexplicit-context-arguments`; `ExplicitContextArguments` has `sinceVersion = KOTLIN_2_6`) and callable references to contextual declarations (`CallableReferencesToContextual`, no stable version) | Compiler 2.4 at language version 2.4 or newer to call it. At a lower language version the call fails: "To call contextual declarations, specify the '-Xcontext-parameters' compiler option." A callable reference to it fails: "Callable reference to '{0}' is unsupported because it has context parameters." Overloads that differ only by context parameters can be ambiguous at a call site (2.3.20 change) and cannot be disambiguated without the experimental context arguments. |
| Explicit backing fields | 2.4.0 | none | Nothing found: the consumer sees the declared property type. |
| `@all` meta-target and the new use-site defaulting rules for annotations | 2.4.0 | none | Nothing for a Kotlin compiler; the annotations on emitted members differ for reflection and Java callers. |
| Name-based destructuring (`only-syntax` mode, default) | 2.5.0 | the short form and other modes (`EnableNameBasedDestructuringShortForm`, no stable version) | Nothing: library-source only; position-based `val (a, b)` is unchanged. |
| Unused return value checker, on by default | 2.5.0 | none | A consumer compiling at 2.5 gets warnings for ignored results of declarations the library marks `@MustUseReturnValues` (inference from the mode description); older compilers ignore the marking. |
| Improved compile-time constants | 2.5.0 | none | Nothing: constants are evaluated when the library compiles. |
| `@IntroducedAt` version-based overloads | 2.5.0 (introduced experimental in 2.4.0 with an opt-in) | none stated | Nothing: the compiler emits the hidden overloads in the library. |

- A public signature that uses nothing from the table needs nothing beyond F2 and F3. The only rows with a consumer-visible demand are
  nested type aliases and context parameters, and both are met by the 2.4.0 floor; context parameters add the callable-reference and
  language-version cases above.
- Opt-in annotations are a separate demand: a public signature that uses an experimental standard-library or library API requires the
  consumer to opt in, regardless of Kotlin version. The library keeps such surface behind its own marker.

## 4. How comparable projects do it

- **kotlinx.coroutines 1.11.0** (2026-05-08): built on Kotlin 2.2.20 (`kotlin_version=2.2.20` in `gradle.properties` at the tag), its
  published module requires `kotlin-stdlib` 2.2.20. Its build only overrides language and API version through a property
  (`getOverriddenKotlinLanguageVersion`), so the default, the plugin's, is what it publishes. Floor stated by the artifact, not by a
  separate line of prose I found.
- **kotlinx.serialization 1.13.0** (2026-11-11): "This release is based on Kotlin 2.4.10"; module requires `kotlin-stdlib` 2.4.10.
- **Ktor 3.6.1** (2026-10-30): module requires `kotlin-stdlib` 2.3.21.
- **Pattern (common practice, three mature libraries):** the stdlib requirement equals the Kotlin version that built the release; the
  consumer floor follows from the language version at that Kotlin; whether any of them was built on a Kotlin release candidate was not checked. The Kotlin team nonetheless recommends library authors test on EAP builds (F6).
- **Organisation builds:** WebTools builds on Kotlin Gradle plugin 2.2.0 with no explicit `languageVersion` or `apiVersion`, and its README
  states the floor in prose: "Requires JDK 11 or newer … Built with Kotlin 2.2." and, for a dependency, that "a consumer's Kotlin standard
  library resolves to 2.2.21 or newer" ([WebTools README at 98b774966](https://github.com/SpartanLaboratories/WebTools/blob/98b774966/README.md)).
  MyGameTools builds on plugin 2.2.0 (`build-logic/build.gradle.kts`, `jvmToolchain(23)`) with no language or API version set
  ([at 46697c15f](https://github.com/SpartanLabsGaming/MyGameTools/blob/46697c15f/build-logic/build.gradle.kts)), and GeneralTools uses
  `kotlin("jvm") version "2.2.0"` ([at c196d1a80](https://github.com/SpartanLaboratories/GeneralTools/blob/c196d1a80/build.gradle.kts)).
  None sets a language version below the compiler's, and none builds on a pre-release Kotlin. The WebTools README sentence shape (the
  Kotlin the library is built with, and the stdlib a consumer's graph resolves to) is the one this library's statement can follow.

## 5. Pitfalls and regrets

- **One flag of the forcing set poisons the whole output** (F4, F5): the failure appears in consumers, not in the library's own build, and the
  consumer's only escape (`-Xskip-prerelease-check`) spreads the mark to the consumer's output. The documented regret is KT-75588
  ("This is really kind of a mess for library maintainers").
- **The stdlib lift is silent.** A consumer on Kotlin 2.4.x gets a 2.5.0-RC standard library at run time by resolution alone; a Maven
  consumer's "nearest wins" mediation could keep an older one, and API version 2.5 then risks missing-member errors at run time
  (inference; consumers here are Gradle consumers).
- **Older compilers fail on the stdlib first**, with a message that names a `kotlin.*` class, not the library, so a 2.3.x consumer will not
  recognise the library as the cause (language-server issue above). The statement in the library's README has to say so.
- **Tools with an embedded Kotlin** (analysis tools, IDE-bundled compilers) have their own limit (F2). A consumer whose tooling is older
  than its compiler can see the error from the tool only.
- **RC to final is not a no-op**: no compatibility promise between EAP and final (F6). Rebuild and republish from 2.5.0, and read nothing
  published from the RC as releasable.
- **Dropping the language version does not drop the stdlib request** (F3); a lower floor would need both a lower language version and an
  explicit older stdlib declaration, which conflicts with API version 2.5.
- **Public signatures with context parameters** are stable from 2.4.0 but still shut out callable references and ambiguous overloads for
  consumers (F9); changing a function's context parameters later is a JVM signature change.

## 6. Recommendation for this repository

**State the consumer floor as Kotlin 2.4.0 or newer and `kotlin-stdlib` 2.5.0 or newer (2.5.0-RC while the build is on the release
candidate), in the README, the way the WebTools README states its Kotlin and stdlib floor.** Say what a consumer on 2.3.x or older meets
(the incompatible-metadata error, first on a `kotlin.*` class) and that consumers on 2.4.x have their stdlib lifted by resolution. Keep the
change as the cost of moving to language and API version 2.5: it raises the consumer compiler floor from 2.1 to 2.4 for a library at 2.2
and the stdlib floor from 2.2 to 2.5.

Reasoning: the floor comes from Kotlin's own rule (limit = compiler's metadata version plus one minor), read identically at four tags and
matching Kotlin's library guidance; the stdlib request comes from the plugin's default dependency, which only an explicit older stdlib
would change, and that contradicts API version 2.5. The release candidate adds no pre-release restriction in itself.

Concrete shape:

- **Keep the library's compilation free of experimental language flags**, above all those that enable a feature in the forcing set
  (companion blocks and extensions, full value classes, local type aliases, the second contract syntax, late-initialised `val`s), so the
  output is not marked pre-release; the other experimental flags do not mark it at the tag read, but they are experimental and the
  library does not need them. A check that reads the `xi` value of `@Metadata` in the published jars and fails when bit 1 is set
  would turn the rule into a gate (option; not measured here).
- **Run the consumer-side build on the Kotlin the library builds with (2.5.0-RC), and add one consumer compile on 2.4.21**, the newest
  stable 2.4 release, against the same Maven Local artifacts. The second compile is what turns the floor from a source-derived statement
  into a measured one, and it also settles the open question about the stdlib 2.5.0-RC jar (Gaps). The composite-build consumer needs the
  same two compiles; it reads the same bytes.
- **Keep context parameters out of public signatures** (the library's existing design rule), and keep `@IntroducedAt`, name-based
  destructuring and the other table rows to library-internal use. The reason now is concrete: callable references and
  overload disambiguation stay unavailable to consumers (F9).
- **Rebuild and republish from 2.5.0** when it is released; the floor statement then loses only the "-RC".

Options that do not fit:

- *Compile with the 2.5 compiler at language and API version 2.2 or 2.4.* It would lower the consumer compiler floor (to 2.1 or 2.3,
  by the same rule) and let the library use only the stable features of that version, but the stdlib request would stay at the plugin's
  version unless an older stdlib is declared explicitly. It is not the build the library has.
- *Consumers add `-Xskip-metadata-version-check`.* Documented only as a suppression; no source read says it makes unreadable metadata
  usable, and it also disables the pre-release check. Not offered to consumers as a way to use the library on Kotlin 2.3.
- *`-Xgenerate-strict-metadata-version`.* It would raise the floor to the 2.5 compiler itself (flag 3), removing the one-ahead
  reading. Not used.
- *Waiting for 2.5.0 before publishing at all.* Unnecessary for this unit: it publishes only to Maven Local, and the rules above hold
  for the release candidate.

## 7. Load-bearing claims

1. **Kotlin states what a newer language version asks of JVM consumers.** "On the JVM, consumers can use any compiler version from the
   previous language version onwards. For example, if your library uses language version\n2.2, consumers can use compiler version 2.1.x,
   2.2.x or later." (source line break after "version") Link:
   [Kotlin/api-guidelines `api-guidelines-backward-compatibility.md` at 113c6ab](https://github.com/Kotlin/api-guidelines/blob/113c6ab3a5a358af6259fea0abd3ee04657f6f44/docs/topics/api-guidelines-backward-compatibility.md).
   Read 2026-11-22.
2. **API version and the run-time standard library.** "The [API version](compiler-reference.md#api-version-version) determines the minimum
   Kotlin standard library version required at runtime." and "Your consumers also need to provide a Kotlin standard library version that
   is at least as new as your library's configured API version." Same link as claim 1. Read 2026-11-22.
3. **The one-version-ahead reading is a preference, not a guarantee.** "Older compilers reject binaries that rely on new features" and
   "Preferably (but we can't guarantee it), the binary format is mostly forwards compatible with the next language release, but not later
   ones". Link: [kotlin-evolution-principles.md at kotlin-web-site f410032](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/kotlin-evolution-principles.md).
   Read 2026-11-22.
4. **The compiler's metadata limit.** `// * Compiler of deployVersion X (INSTANCE) with LV Y (metadataVersionFromLanguageVersion)` /
   `//   * can read metadata with version <= max(X+1, Y)`; `val INSTANCE = MetadataVersion(2, 5, 0)`; `val INSTANCE_NEXT =
   INSTANCE.next()`. Link: [MetadataVersion.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt);
   `INSTANCE` is `MetadataVersion(2, 4, 0)` at [v2.4.0](https://github.com/JetBrains/kotlin/blob/v2.4.0/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt)
   and [v2.4.21](https://github.com/JetBrains/kotlin/blob/v2.4.21/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt),
   `MetadataVersion(2, 3, 0)` at [v2.3.21](https://github.com/JetBrains/kotlin/blob/v2.3.21/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt).
   Read 2026-11-22.
5. **The metadata version written follows the language version.** `this[LanguageVersion.KOTLIN_2_2] = MetadataVersion(2, 2, 0)`,
   `this[LanguageVersion.KOTLIN_2_5] = MetadataVersion.INSTANCE`, and `): MetadataVersion = this.metadataVersion as? MetadataVersion ?:
   languageVersion.toMetadataVersion()`. Link: [metadataHelpers.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/frontend.common/src/org/jetbrains/kotlin/util/metadataHelpers.kt).
   Read 2026-11-22.
6. **Error text of an incompatible class.** `class 'a.A' was compiled with an incompatible version of Kotlin. The actual metadata version is
   42.0.0, but the compiler version $ABI_VERSION$ [with language version 1.9.0] can read versions up to $ABI_VERSION_NEXT$.` and `error:
   incompatible classes were found in dependencies. Remove them from the classpath or use '-Xskip-metadata-version-check' to suppress
   errors`. Link: [wrongMetadataVersion/output.txt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/testData/compileKotlinAgainstCustomBinaries/wrongMetadataVersion/output.txt).
   Real report: `Class 'kotlin.sequences.Sequence' was compiled with an incompatible version of Kotlin. The actual metadata version is 2.1.0,
   but the compiler version 1.9.0 can read versions up to 2.0.0.` ([kotlin-language-server#609](https://github.com/fwcd/kotlin-language-server/issues/609)).
   Read 2026-11-22.
7. **The pre-release switch is off at the release candidate.** `private static final boolean IS_PRE_RELEASE = false;` and the comment
   `// True if the latest stable language version supported by this compiler has not yet been released.` Link:
   [KotlinCompilerVersion.java at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/compiler.version/src/org/jetbrains/kotlin/config/KotlinCompilerVersion.java).
   Same value at `v2.5.0-Beta1`, `v2.5.0-Beta2`, `v2.4.21`, `v2.4.0-RC`, `v2.4.0`, `v2.3.0-RC`, `v2.3.0`. Read 2026-11-22.
8. **Language version 2.5 is stable in the release candidate, and what sets the flag.** `val LATEST_STABLE = KOTLIN_2_5`;
   `// Language:  UNSUPPORTED --> DEPRECATED ---> STABLE ---> EXPERIMENTAL`; `if (!isStable) return true`; `return
   KotlinCompilerVersion.isPreRelease() && this == LanguageVersion.LATEST_STABLE`; and `val isFeatureNotReleasedYet = sinceVersion?.isStable
   != true` / `return isFeatureNotReleasedYet && forcesPreReleaseBinaries && forcesPreReleaseBinariesBefore.let { it == null ||
   languageVersion < it }`. Link: [LanguageVersionSettings.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt).
   At `v2.4.21` `LATEST_STABLE` is `KOTLIN_2_4`. Read 2026-11-22.
9. **Where the flag is written.** `if (config.languageVersionSettings.isPreRelease()) {` / `flags = flags or
   JvmAnnotationNames.METADATA_PRE_RELEASE_FLAG`. Link: [writeKotlinMetadata.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/backend/src/org/jetbrains/kotlin/codegen/writeKotlinMetadata.kt).
   And flag 1: "this class file is compiled by a pre-release version of Kotlin and is not visible to release versions." Link:
   [Metadata.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/libraries/stdlib/jvm/runtime/kotlin/Metadata.kt). Read 2026-11-22.
10. **When a consumer reports it.** `override val reportErrorsOnPreReleaseDependencies =` / `!skipPrereleaseCheck &&
    !languageVersionSettings.isPreRelease() && !KotlinCompilerVersion.isPreRelease()`. Link:
    [CommonCompilerDeserializationConfiguration.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/frontend.common/src/org/jetbrains/kotlin/resolve/CommonCompilerDeserializationConfiguration.kt).
    Read 2026-11-22.
11. **Pre-release error text and override.** `class 'a.A' is compiled by a pre-release version of Kotlin and cannot be loaded by this version
    of the compiler` and `error: pre-release declarations were found in dependencies. Please exclude the dependencies with such declarations
    and recompile with a release compiler, or use '-Xskip-prerelease-check' to suppress errors. Note that in the latter case the compiled
    declarations will also be marked as pre-release.` Link: [releaseCompilerAgainstPreReleaseLibrary/output.txt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/testData/compileKotlinAgainstCustomBinaries/releaseCompilerAgainstPreReleaseLibrary/output.txt).
    Option texts: `description = "Allow loading pre-release classes."` and `description = "Allow loading classes with bad metadata versions and
    pre-release classes."` Link: [CommonCompilerArguments.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/arguments/src/org/jetbrains/kotlin/arguments/description/CommonCompilerArguments.kt).
    Read 2026-11-22.
12. **The pre-release policy history.** Commit message: "Compiler will still generate prerelease binaries if a non-stable language version is
    used." ([4f29c113](https://github.com/JetBrains/kotlin/commit/4f29c113b), 2021-08-24). KT-62058: "`2.0.0-rc*` or `2.0.*` can compile against
    `1.9 with LV 1.9`, `2.0.0-rc*`, or `2.0.*`, but cannot compile against `2.0.0-dev*` or `2.0.0-beta*` or `1.9 with LV 2.0`"
    ([issue](https://youtrack.jetbrains.com/issue/KT-62058)). KT-62063 title: "K2: drop pre-release flag in 2.0-RC"
    ([issue](https://youtrack.jetbrains.com/issue/KT-62063)). Read 2026-11-22.
13. **An experimental flag poisons binaries.** "You're using `-Xannotation-default-target` which is an unstable feature, so it causes binaries
    to be marked as pre-release" ([KT-75588](https://youtrack.jetbrains.com/issue/KT-75588), 2025-03); and the source's own doc: "If 'true', then
    enabling this feature (e.g. by '-XXLanguage:', or dedicated '-X'-flag) will force generation of pre-release binaries". Link:
    [LanguageVersionSettings.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt).
    Read 2026-11-22.
14. **The plugin's default stdlib dependency.** "A dependency on the standard library (`stdlib`) is added automatically to each source set. The
    version of the standard library used is the same as the version of the Kotlin Gradle plugin." and "If you declare a standard library
    dependency explicitly (for example, if you need a different version), the Kotlin Gradle plugin won't override it or add a second standard
    library." Link: [gradle-configure-project.md at kotlin-web-site f410032](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/gradle/gradle-configure-project.md).
    Read 2026-11-22.
15. **Published modules of libraries built by the plugin request the stdlib of their Kotlin.** In
    `kotlinx-serialization-core-jvm-1.13.0.module`: `"module": "kotlin-stdlib",` / `"version": {` / `"requires": "2.4.10"`, in both
    `jvmApiElements-published` and `jvmRuntimeElements-published` ([file](https://repo1.maven.org/maven2/org/jetbrains/kotlinx/kotlinx-serialization-core-jvm/1.13.0/kotlinx-serialization-core-jvm-1.13.0.module));
    `kotlinx-coroutines-core-jvm-1.11.0.module` requires `2.2.20` ([file](https://repo1.maven.org/maven2/org/jetbrains/kotlinx/kotlinx-coroutines-core-jvm/1.11.0/kotlinx-coroutines-core-jvm-1.11.0.module));
    `ktor-client-core-jvm-3.6.1.module` requires `2.3.21` ([file](https://repo1.maven.org/maven2/io/ktor/ktor-client-core-jvm/3.6.1/ktor-client-core-jvm-3.6.1.module)).
    kotlinx.serialization 1.13.0 release note: "This release is based on Kotlin 2.4.10" ([release](https://github.com/Kotlin/kotlinx.serialization/releases/tag/v1.13.0)).
    Read 2026-11-22.
16. **Gradle resolves to the highest requested version, and orders `2.5.0-RC` below `2.5.0`.** "Gradle will consider _all_ requested versions,
    wherever they appear in the dependency graph. By default, it will select the _highest_ one out of these versions." Link:
    [dependency_constraints_conflicts.adoc at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/reference/dependency-management/basics/dependency_constraints_conflicts.adoc).
    "**Extra Non-numeric Part:** A version with an extra non-numeric part is lower: `1.1.a < 1.1`." Link:
    [dependency_versions.adoc at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/reference/dependency-management/declaring-dependencies/dependency_versions.adoc).
    Read 2026-11-22.
17. **Composite builds are configured in isolation and substitute local source.** "Each included build is *configured* in isolation —
    included builds do not share repositories, plugins, or properties with one another or with the root build, but they can be *executed*
    together and depend on each other's tasks." and "Gradle automatically substitutes the external dependency with a local source".
    Link: [composite_builds.adoc at v9.7.1](https://github.com/gradle/gradle/blob/v9.7.1/platforms/documentation/docs/src/docs/userguide/structuring-builds/composite_builds.adoc).
    Read 2026-11-22.
18. **Release state.** Releases of JetBrains/kotlin read through the GitHub API on 2026-11-22: `"tagName":"v2.5.0-RC","isPrerelease":true,
    "publishedAt":"2026-11-11T10:19:34Z"`; `"tagName":"v2.4.21","isPrerelease":false,"publishedAt":"2026-10-08T09:25:15Z"`; no `v2.5.0`.
    `kotlin-stdlib` metadata on Maven Central ends `<version>2.5.0-RC</version>` / `</versions>` / `<lastUpdated>20261111082541</lastUpdated>`
    ([maven-metadata.xml](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-stdlib/maven-metadata.xml)). kotlin-web-site `v.list`:
    `<var name="kotlinEapVersion" value="2.5.0-RC"/>` ([file](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/v.list)).
    Read 2026-11-22.
19. **EAP builds carry no compatibility promise; Kotlin recommends libraries test on them.** "We don't guarantee compatibility between EAP and
    final versions of the same release." and "Working with EAP versions allows you to support the latest Kotlin versions in your library
    almost immediately with the Stable release, which makes your users happier and your library more popular." Link:
    [eap.md at kotlin-web-site f410032](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/eap.md).
    Read 2026-11-22.
20. **Context parameters stable in 2.4.0 except context arguments and callable references.** "[Context parameters](context-parameters.md),
    except for [context arguments](#explicit-context-arguments-for-context-parameters) and [callable
    references](https://github.com/Kotlin/KEEP/blob/context-parameters/proposals/context-parameters.md#callable-references)" under
    "The following features have now graduated to Stable in Kotlin 2.4.0". Link:
    [whatsnew24.md at f410032](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/whatsnew/whatsnew24.md).
    Explicit context arguments: "This feature is [Experimental](components-stability.md#stability-levels-explained). To opt in, add the following
    compiler option to your build file" with `-Xexplicit-context-arguments` (same file); the compiler lists
    `ExplicitContextArguments(sinceVersion = KOTLIN_2_6, issue = "KT-81684")` and `ContextParameters(sinceVersion = KOTLIN_2_4, "KT-72222")`
    in [LanguageVersionSettings.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/core/language.version-settings/src/org/jetbrains/kotlin/config/LanguageVersionSettings.kt).
    Read 2026-11-22.
21. **What a consumer sees at a lower language version or with a callable reference.** `"To call contextual declarations, specify the
    '-Xcontext-parameters' compiler option."` and `"Callable reference to ''{0}'' is unsupported because it has context parameters."`
    ([FirErrorsDefaultMessages.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/fir/checkers/src/org/jetbrains/kotlin/fir/analysis/diagnostics/FirErrorsDefaultMessages.kt));
    the checks: `if (LanguageFeature.ContextParameters.isEnabled() || LanguageFeature.ContextReceivers.isEnabled()) { return }` then
    `reporter.reportOn(expression.source, FirErrors.UNSUPPORTED_CONTEXTUAL_DECLARATION_CALL)`
    ([FirContextParameterInCalledSignatureChecker.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/fir/checkers/src/org/jetbrains/kotlin/fir/analysis/checkers/expression/FirContextParameterInCalledSignatureChecker.kt));
    `if (referredSymbol.hasContextParameters && LanguageFeature.ContextParameters.isEnabled() &&
    LanguageFeature.CallableReferencesToContextual.isDisabled())`
    ([FirCallableReferenceChecker.kt](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/fir/checkers/src/org/jetbrains/kotlin/fir/analysis/checkers/expression/FirCallableReferenceChecker.kt)).
    Read 2026-11-22.
22. **Other features stable by 2.5.** 2.3.0: "The following features have now graduated to Stable in Kotlin 2.3.0: Support for nested type
    aliases, Data-flow-based exhaustiveness checks for `when` expressions" ([whatsnew23.md](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/whatsnew/whatsnew23.md)).
    2.5: "Kotlin 2.3.0−2.4.0 introduced a few language features as Experimental. We're happy to announce that the following language features are now
    Stable in this release:" then improved compile-time constants, `@IntroducedAt`, the unused return value checker, and name-based destructuring
    in `only-syntax` mode ([whatsnew-eap.md](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/whatsnew/whatsnew-eap.md),
    the page for 2.5.0-RC per `v.list`). A nested type alias gets a version requirement:
    `if (typeAlias.classId.isNestedClass) {` / `builder.addVersionRequirement(writeLanguageVersionRequirement(LanguageFeature.NestedTypeAliases,
    versionRequirementTable))` ([FirElementSerializer.kt at v2.5.0-RC](https://github.com/JetBrains/kotlin/blob/v2.5.0-RC/compiler/fir/fir-serialization/src/org/jetbrains/kotlin/fir/serialization/FirElementSerializer.kt)).
    Read 2026-11-22.
23. **The compiler's own option text on API version and supported language versions.** "if you use Kotlin compiler version 2.4.0 with
    `-api-version=2.1`, your code remains compatible with Kotlin standard library 2.1.0." and "Kotlin 2.5.0 supports language versions as old
    as 2.2." Link: [compiler-reference.md at f410032](https://github.com/JetBrains/kotlin-web-site/blob/f4100328bb403bb0df8673942d5974790c6e2c50/docs/topics/compiler/compiler-reference.md).
    Read 2026-11-22.
24. **Organisation precedent.** WebTools README: "Requires JDK 11 or newer (`webtools-scraping` and `webtools-browser` 1.0.0: JDK 23 or newer).
    Built with Kotlin 2.2." and "so a consumer's Kotlin standard library resolves to 2.2.21 or newer." Link:
    [README.md at WebTools 98b774966](https://github.com/SpartanLaboratories/WebTools/blob/98b774966/README.md). Read 2026-11-22.

## 8. Gaps

- **No build or compile was run (by rule).** The floor of 2.4.0 and the stdlib lift are read from compiler source at four tags, Kotlin's
  guidance and Gradle's documented rules; none was measured by compiling a consumer on 2.4.x against RC-built artifacts. What would change
  if wrong: the floor statement. The consumer compile on 2.4.21 recommended in section 6 settles it.
- **Whether the `kotlin-stdlib` 2.5.0-RC jar carries the pre-release flag was not read** (jars are not opened by rule). The source rule says it
  does not unless the stdlib's own build enabled a forcing feature or an unstable language version, and the stdlib build file read sets
  neither, but the build scripts that feed it were not read in full. If it were marked, a stable 2.4.x consumer would get the pre-release
  error on stdlib classes whenever the library lifts its stdlib to 2.5.0-RC; the 2.4.21 consumer compile detects that.
- **The older-compiler message with 2.3 and 2.5 numbers is constructed** from Kotlin's test template and the `can read versions up to`
  rule, not quoted from a run.
- **Maven (non-Gradle) consumers** were not analysed, and the claim that "nearest wins" could keep an older stdlib is general knowledge
  of Maven mediation, not read here; consumers are Gradle consumers.
- **The Gradle range of the Kotlin Gradle plugin 2.5.0-RC** was not established here; a composite build runs both builds in one Gradle,
  so the consumer's Gradle must suit the library's plugin (the toolchain question's subject).
- **Kotlin's 2.5.0 release date and final binaries** do not exist yet. Nothing read says the final compiler will differ from the RC in
  `IS_PRE_RELEASE`, `LATEST_STABLE` or `MetadataVersion.INSTANCE`, but that is an absence of evidence at `v2.5.0-RC`, not a statement
  about 2.5.0.
- **Tools embedding their own Kotlin** (IDE bundles, analysis tools, symbol processors) were not surveyed beyond the language-server report;
  their limits are their own.
- **Consumer-side effect of the unused return value checker** is stated from the mode description in the What's new page, not from a
  checker source read.
- Sources were read on 2026-11-22; the machine clock passed midnight UTC during the later reads, which changes no date-dependent fact.
