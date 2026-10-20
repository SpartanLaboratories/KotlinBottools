# Verifier report: research claims for KotlinBottools#1 (checked 2026-10-20)

Method: sources were read at the exact pins (shallow checkouts of the Discord docs, JDA, discord.py, BotCommands, Sapphire, Kord docs, odota/core, kotlin-web-site; raw files; Maven POMs, .module files and maven-metadata.xml; one class-file parse for Kotlin metadata versions). Quotes were matched after collapsing whitespace and stripping Markdown, AsciiDoc, Javadoc and link markup. A quote that differs only by markup is "holds". Where a quote differs in words, I say so.

Currency, all unchanged by newer material:
- Discord docs `main` HEAD is still the pin `fd75e22` (2026-10-19).
- odota/core HEAD is still `449fb7b`.
- jda-ktx HEAD is still `4fc12af`.
- Newest releases: JDA 6.7.0, jda-ktx 0.15.0, Exposed 1.6.0, sqlite-jdbc 3.53.4.0, Ktor 3.6.0, OkHttp 5.5.0, kotlinx.coroutines 1.11.0, kotlinx-serialization 1.12.0, vanniktech 0.37.0, BCV 0.18.2, Hoplite 3.0.4, Caffeine 3.3.1, Quartz 2.5.2, Rome 2.1.0.
- Gradle 9.8.2 exists. The composite-build and configuration-cache docs I checked there are word-for-word the same as at v9.7.1.

## 1. Per-claim table

Short code names:
- D = `https://github.com/discord/discord-api-docs/blob/fd75e22e8c327f60c3ceaa366878c8b223043142/developers`
- JDA67 = `https://github.com/discord-jda/JDA/blob/v6.7.0/src/main/java/net/dv8tion/jda`
- KWS = the JetBrains/kotlin-web-site repository, `main` as of 2026-10-20

### DPR (discord-platform-rules.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| DPR-1 | holds | `D/interactions/application-commands.mdx` line 49 has the regex. The source writes `ʼ`; the claim renders it as ʼ. Same character. | |
| DPR-2 | holds | Same file: 100 global CHAT_INPUT, 15 USER, 15 MESSAGE, and the guild-per-guild sentence. | |
| DPR-3 | holds | Same file: "200 application command creates per day, per guild" and the bulk-overwrite sentence. | |
| DPR-4 | holds | Same file, line 481. Only a link is inserted in the middle. | |
| DPR-5 | holds | Same file: the "only kind of nesting supported" and "base command unusable" sentences. | |
| DPR-6 | holds | Same file: required-before-optional, max 25, max 25, and the autocomplete/choices rule. | |
| DPR-7 | holds | Same file: "Guild commands update instantly…". | |
| DPR-8 | holds | Same file line 339 (interaction contexts); `D/resources/application.mdx`: "By default, newly-created apps only support installation to guilds." | |
| DPR-9 | holds | `D/resources/application.mdx`: user-installed apps are visible only to the authorizing user. | |
| DPR-10 | holds | `application-commands.mdx`: both Permissions sentences. | |
| DPR-11 | holds | `D/interactions/receiving-and-responding.mdx`: 15 minutes and "initial response within 3 seconds". | |
| DPR-12 | holds | Same file, line 304 footnote; `D/resources/message.mdx`: "only visible to the user who invoked the Interaction". | |
| DPR-13 | holds | `D/components/reference.mdx`: custom_id sentences. | |
| DPR-14 | holds | `D/gateway/getting-started-with-privileged-intent-review.mdx`: "Currently, there are three of them" and the three descriptions. | |
| DPR-15 | holds | Same file: the 10,000-unique-users sentence; "As of June 10th, 2026". | |
| DPR-16 | holds | Same file: annual reapplication and the 90-day window (lines 58 and 64). | |
| DPR-17 | holds | `D/change-log.mdx`, entry "June 10, 2026": "separated App Verification and the Privileged Intent review process". | |
| DPR-18 | holds | `D/events/gateway.mdx`: the stale 100+ guilds sentence is still present. | |
| DPR-19 | holds | `gateway.mdx` lines 498-501: the four exceptions, one bullet each. `D/gateway/you-might-not-need-a-privileged-intent.mdx` line 114: the replies note. | |
| DPR-20 | holds | `getting-started-with-privileged-intent-review.mdx`: GUILD_MEMBER_ADD, "Enable and request the Guild Members intent", "My welcome messages stopped firing". | |
| DPR-21 | holds | `gateway.mdx`: GUILD_MESSAGE_REACTIONS (1 << 10); `D/events/gateway-events.mdx`: "Member who reacted if this happened in a guild". | |
| DPR-22 | holds | `gateway-events.mdx`: both Request Guild Members sentences; `change-log.mdx`: the 1-per-30-seconds rate limit. | |
| DPR-23 | holds | `gateway.mdx` line 473: the 4014 sentence. | |
| DPR-24 | holds | `D/topics/rate-limits.mdx`: 50/s, interaction endpoints not bound to the global limit, "should not be hard coded". | |
| DPR-25 | holds | Same file: 10,000 per 10 minutes; 401/403/429; shared-scope 429s not counted. | |
| DPR-26 | holds | `gateway.mdx`: 2500 guilds, Get Gateway Bot shards, the `shard_id` formula, the guild_id-less events go to shard 0. | |
| DPR-27 | holds | `gateway.mdx`: `rate_limit_key = shard_id % max_concurrency`; the 1000 IDENTIFY per 24 h passage. | |
| DPR-28 | holds | `change-log.mdx`, entry "August 12, 2026": "mandatory for all bots on November 16, 2026"; "GET /guilds/{guild.id}/channels … will omit those channels from the response entirely". | |
| DPR-29 | holds | `application.mdx`: terms_of_service_url, privacy_policy_url, and the "Add App button will not appear" sentence. | |
| DPR-30 | holds (snapshot only) | `https://github.com/discord/discord-api-docs/blob/e5cd463cd1412df2e55fce8ecb81e7d1ed5755b0/docs/policies_and_agreements/Developer_Terms_of_Service.md`, "Effective date: October 1, 2022": both quotes present. That snapshot is not the current text. `D/policies/*.mdx` are redirect stubs to support-dev.discord.com (refused). A search listing shows a Developer Terms version "Effective date: July 8, 2024" (https://support-dev.discord.com/hc/articles/8562894815383). I could not read its wording. | Treat 5(a)/5(b) wording as the 2022 snapshot, and unconfirmed against the 2024 terms. |
| DPR-31 | holds (snapshot only) | Same snapshot, section 5.c: the encryption-at-rest and safeguards wording is present. Same currency caveat as DPR-30. | Unconfirmed against the 2024 terms. |
| DPR-32 | holds (snapshot only) | `.../docs/policies_and_agreements/Developer_Policy.md` at `e5cd463`: both quotes present. The same 2024 version caveat applies (https://support-dev.discord.com/hc/articles/8563934450327). | Unconfirmed against the 2024 policy. |
| DPR-33 | holds | `JDA67/api/interactions/commands/build/Commands.java`: 100/15/15. `JDA67/api/requests/GatewayIntent.java`: the DEFAULT Javadoc lists GUILD_MEMBERS, GUILD_PRESENCES and MESSAGE_CONTENT as disabled "(because its privileged)"; line 80 has the ChunkingFilter.NONE sentence. `JDA67/internal/interactions/CommandDataImpl.java` lines 93-94: `Checks.ALPHANUMERIC_WITH_DASH` and `Checks.isLowercase`. | |
| DPR-34 | holds | `JDA67/api/sharding/DefaultShardManagerBuilder.java` line 1811 (-1 means recommended shards); `JDA67/api/utils/ConcurrentSessionController.java`; `JDA67/api/utils/SessionController.java`. | |
| DPR-35 | holds | `JDA67/api/entities/Guild.java`: "(1-100)" and the 10-second timeout. `retrieveMembersByPrefix` is also present at tag v5.6.1. | |
| DPR-36 | holds | discord.py v2.7.1 `discord/ext/commands/bot.py` and `hybrid.py`: all three quotes exact. | |

### JDA (jda-and-coroutine-bridge.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| JDA-1 | holds | https://repo1.maven.org/maven2/net/dv8tion/JDA/maven-metadata.xml: 5.6.1, 6.0.0 and 6.7.0 listed; release 6.7.0; `lastUpdated` 20260920181746. | |
| JDA-2 | holds | JDA README at `v6.7.0` and `master`: the "Java SE 8" and "minor version bump" sentences. | |
| JDA-3 | holds | https://raw.githubusercontent.com/JetBrains/kotlin/v2.2.0/core/metadata/src/org/jetbrains/kotlin/metadata/deserialization/MetadataVersion.kt: `INSTANCE = MetadataVersion(2, 2, 0)` and `forwardCompatibility = if (isStrictSemantics) INSTANCE else INSTANCE_NEXT`. `next()` is `MetadataVersion(major, minor + 1, 0)`, so 2.3.0. | |
| JDA-4 | holds | The jda-ktx 0.15.0 POM has kotlin-stdlib 2.4.0 (compile), coroutines-core-jvm 1.11.0 (compile), JDA 6.5.0 (runtime). Directory date 2026-07-05. | |
| JDA-5 | holds | 0.13.0: stdlib 2.2.10, coroutines 1.10.2, JDA 5.6.1, dated 2025-09-04. 0.14.2: stdlib 2.3.10, coroutines 1.10.2, JDA 6.3.2, dated 2026-03-15. | |
| JDA-6 | holds | The release pages (v6.0.0, v6.0.0-rc.4, v6.0.0-rc.1) were read through WebFetch, which gives a rendering rather than raw text. v6.0.0 says "code that relied on the mutability of `ActionRow` will require manual adjustments". rc.4 has the ActionRow/Label sentence. rc.1 has a "Removed Deprecated Features" section. | |
| JDA-7 | holds | Same rendering caveat. v6.7.0: "aware of Channel Obfuscation, which will become mandatory on November 16, 2026" and "This is a breaking change, which affects permission handling…". v6.2.1 has the "start migrating to JDA 6 as soon as possible" sentence. In v6.2.1, "this change" refers to the DAVE voice-protocol requirement, not channel obfuscation. | |
| JDA-8 | holds | `JDA-6.7.0.pom`: slf4j-api 2.0.19, nv-websocket-client 2.14, okhttp-jvm 5.5.0, opus-java 1.1.1, commons-collections4 4.6.0 (compile); trove4j 3.1.0, jackson 2.22.2, tink 1.18.0 (runtime). `.module`: apiElements has `org.gradle.jvm.version` 8. The 5.6.1 POM matches the claim. | |
| JDA-9 | holds | All of the cited POMs (JDA 5.6.1, JDA 6.7.0, jda-ktx 0.13.0 to 0.15.0) name "The Apache Software License, Version 2.0". | |
| JDA-10 | holds | `okhttp-jvm-5.5.0.module`: kotlin-stdlib requires 2.1.21 and 2.2.21, okio 3.18.1. `okio-jvm-3.18.1.module`: stdlib 2.1.21. `okhttp-4.12.0.pom`: okio 3.6.0, kotlin-stdlib-jdk8 1.8.21. | |
| JDA-11 | holds | `ktor-client-okhttp-jvm-3.6.0.pom`: okhttp-jvm 5.5.0 (compile). `okhttp-5.5.0.module`: jvm variants are `available-at` `okhttp-jvm` and no variant has `capabilities`. | |
| JDA-12 | holds | https://repo1.maven.org/maven2/club/minnced/jda-ktx/maven-metadata.xml: release 0.15.0, lastUpdated 20260705170917. The README at `4fc12af` says "This project is available on maven central." | |
| JDA-13 | holds | `libs.versions.toml` at `4fc12af`: kotlin "2.4.0", jda "6.5.0", coroutines 1.11.0. `build.gradle.kts`: `api(libs.kotlin)`, `api(libs.coroutines)`, `implementation(libs.jda)`, `JVM_1_8`, `version = "0.15.0"`. jda-ktx HEAD is still `4fc12af`. | |
| JDA-14 | holds | 0.14.0 and 0.14.1: stdlib 2.3.0, coroutines 1.10.2, JDA 6.2.0. 0.12.0: stdlib 2.0.0, coroutines (non-jvm artifact) 1.8.1, JDA 5.0.0. | |
| JDA-15 | holds | `coroutines/coroutines.kt` has `submit().await()`. `jdabuilder/inject.kt` has both `injectKTX` lines. | |
| JDA-16 | holds | BotCommands tag `v3.4.0` (`c23a9e4`): the build lines and the "barebone listener" comment are present. `Coroutines.kt` has `submit(true).await()`. | |

### CFP (command-framework-prior-art.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| CFP-C1 | holds | discord.py v2.7.1 `hybrid.py`: both quotes exact. | |
| CFP-C2 | holds | `hybrid.py`: both docstring sentences. | |
| CFP-C3 | holds | `docs/ext/commands/commands.rst`: both limitation bullets. | |
| CFP-C4 | holds | Same file: fallback sentence. | |
| CFP-C5 | holds | `converter.py`: "7. Lookup by guild nickname." | |
| CFP-C6 | holds | `hybrid.py`: the nesting ValueError and `self.all_commands[alias] = command`. | |
| CFP-C7 | holds | `context.py`: the three `Context.send` bullets. | |
| CFP-C8 | holds | `context.py` defer sentence; `commands.rst` defer sentence. | |
| CFP-C9 | holds | `context.py`: `from_interaction` sentence. | |
| CFP-C10 | holds | `hybrid.py` lines 396-403: the check-order comment. | |
| CFP-C11 | holds | `core.py`: signature docstring. | |
| CFP-C12 | holds | `ui/view.py` and `ui/dynamic.py`: both quotes. | |
| CFP-C13 | holds | Sapphire framework v5.5.1 `Command.ts`: all three signatures. | |
| CFP-C14 | holds | `InteractionHandler.ts`: both `parse` doc sentences. | |
| CFP-C15 | holds | discord.py v2.7.1 `tests/test_app_commands_invoke.py`: `class MockCommandInteraction(discord.Interaction):` present. | |
| CFP-C16 | holds | `sapphiredev/plugins` `main` README for the subcommands plugin: both quotes. | |
| CFP-C17 | holds | `SapphireClient.ts` and `CorePreMessageParser.ts` v5.5.1: both lines. | |
| CFP-C18 | holds | BotCommands v3.4.0 README: the `@Bot ban @freya02` example, the `@JDASlashCommand(name = "ban"` and `@JDATextCommandVariation(path = ["ban"]` examples. | |
| CFP-C19 | holds | `CommandPattern.kt`: the "Failed building text command pattern…" message. | |
| CFP-C20 | holds | `JDATextCommandVariation.kt`: both sentences. | |
| CFP-C21 | holds | `TextCommandData.kt`: "must not contain any spaces" and "limited to three components". | |
| CFP-C22 | holds | `UserPermissions.kt`: the quoted sentence. | |
| CFP-C23 | holds | `TextPrefixSupplier.kt` sentence; `BTextConfig.kt` `usePingAsPrefix` description, default false. | |
| CFP-C24 | holds | `BotCommandsMessages.kt`: both quotes. | |
| CFP-C25 | holds | README sentence; `internal/components/LifetimeType.kt` has `PERSISTENT(0), EPHEMERAL(1)`. | |
| CFP-C26 | holds | JDA-Chewtils 2.2.1 `SlashCommand.java`: all three quotes. | |
| CFP-C27 | holds | DIH4JDA 1.7.0: `defaultSeparator = ":"`, the ButtonHandler sentence, `subcommand.parent = this;`. | |
| CFP-C28 | holds | Kord docs at `d4ffffc`: `chat.mdx` has the intent sentence. `config/commands.mdx` line 23 has "we disable them by default" (the file keeps the bold markers). `arguments.mdx` and `slash.mdx` have the other two. | |
| CFP-C29 | holds | `chat.mdx`: the keyword-argument styles and parse step. | |
| CFP-C30 | holds | `commands/converters/basics.mdx`: "they can only process and return a single value." | |
| CFP-C31 | holds | `config/error-responses.mdx`: the sealed-type sentence. | |
| CFP-C32 | holds | `anatomy/interactions.mdx`: both quotes. | |
| CFP-C33 | holds | `about/changelog.mdx`, section `v1.5.0-SNAPSHOT`: both quotes, with different bold/backtick markup. The section says "Published to Discord on September 6th, 2021." | |
| CFP-C34 | holds | `commands/application/base-command.mdx`: the not-enforced note. | |
| CFP-C35 | holds | `chat.mdx`: "Maintenance Status" and the quote. | |

### IKA (idiomatic-kotlin-api-shape.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| IKA-C1 | holds | KWS `whatsnew22.md`: "### Preview of context parameters"; "How to enable…" gives `-Xcontext-parameters`. | |
| IKA-C2 | holds | `whatsnew24.md` line 45 and line 47: stable except context arguments and callable references. | |
| IKA-C3 | holds | `whatsnew22.md`: experimenting/toy projects/not production; `checkLegacyAbi`. | |
| IKA-C4 | holds | `whatsnew24.md`: the sentence. `gradle-binary-compatibility-validation.md` has `ExperimentalAbiValidation`, `checkKotlinAbi`, `updateKotlinAbi`. | |
| IKA-C5 | holds | `whatsnew14.md`: both quotes and all four exemptions. | |
| IKA-C6 | holds | https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html (WebFetch rendering). Every sentence is present. The page continues "…binary and source compatibility, as users are required to provide more information…" and "Use `@Deprecated` instead, as described in…". The @JvmOverloads sentence is followed by "Instead, use the @IntroducedAt annotation or add manual overloads". The claim's quotes are truncations of these. | |
| IKA-C7 | holds | KWS `opt-in-requirements.md` lines 356-360 (a bullet list, which the claim joined into one sentence); "leave the annotation classes in modules…" exact. | |
| IKA-C8 | holds | `whatsnew21.md`: the sentence. kotlinx.coroutines 1.10.2 `SharedFlow.kt` has `@SubclassOptInRequired(ExperimentalForInheritanceCoroutinesApi::class)`. | |
| IKA-C9 | holds | `type-safe-builders.md`: the sentence. | |
| IKA-C10 | holds | `inline-classes.md`: all three quotes. | |
| IKA-C11 | holds | `lambdas.md`: the sentence. | |
| IKA-C12 | holds | The Consistency and Predictability pages (WebFetch) have the quoted sentences. The Predictability sentence continues ", without requiring an `else` statement…". | |
| IKA-C13 | holds | `Kotlin/KEEP` `proposals/stdlib/result.md` (master): all three quotes. | |
| IKA-C14 | holds | The Simplicity page has the first quote. | |
| IKA-C14b | holds | kotlinx.coroutines 1.10.2 `Dispatchers.kt`: "Elasticity for limited parallelism… has a unique property of elasticity" (line-wrapped). `CoroutineDispatcher.kt` has the `limitedParallelism(4)` sentence. | |
| IKA-C15 | holds | Backward-compatibility page (as C6): the @PublishedApi passage, with the trailing ", as these changes might affect binary compatibility". | |
| IKA-C16 | holds | The Readability and Simplicity pages (WebFetch) have all four quotes. `coding-conventions.md` has the three infix and extension quotes. | |
| IKA-C17 | holds | The Android best-practices page has the CancellationException sentence. kotlinx.coroutines issue #1814: Open, opened 2020-02-18, title is the runCatching request. | |
| IKA-C18 | holds | kotlinx.coroutines `docs/topics/exception-handling.md` has the three sentences (line-wrapped, link markup). | |
| IKA-C19 | holds | kotlinx.coroutines 1.10.2 `Timeout.kt`: `class TimeoutCancellationException internal constructor(…) : CancellationException(message)`. `CoroutineScope.kt` has the lifecycle sentence. | |
| IKA-C20 | holds | OpenJDK `jdk-21-ga` `Throwable.java`: both quotes (Javadoc markup aside). | |
| IKA-C21 | holds | `whatsnew22.md`: both quotes. | |
| IKA-C22 | holds | JDA67: Guild, Member, SlashCommandInteractionEvent, ISnowflake, EmbedBuilder, MessageCreateData declarations all match. | |
| IKA-C23 | holds | Ktor 3.6.0: `RoutingHandler` typealias, `RoutingContext(public val call: RoutingCall)` with the KTOR-8809 TODO, `Route.get(path, body: RoutingHandler)`, opt-in levels, `KtorExperimentalAPI` deprecated at ERROR, `@DslMarker KtorDsl`, `abiValidation { enabled = true }`, `explicitApi()`, Kotlin 2.3.21. Ktor 2.3.12: `PipelineInterceptor` form and `@KtorDsl open class Route(`. | |
| IKA-C24 | holds | BotCommands v3.4.0: `api(libs.kotlin.reflect)`; "This is optional if the parameter name is found" (`SlashOption.kt` line 61); the README `manager.slashCommand("say"…)`; `@RequiresOptIn(level = ERROR)` on `ExperimentalCoreApi`; `GuildSlashEvent internal constructor(`. | |
| IKA-C25 | holds | Kord docs `commands/arguments.mdx` at `d4ffffc`: all three quotes. | |
| IKA-C26 | holds | Kord `Snowflake.kt` at `db459ec`: `public class Snowflake : Comparable<Snowflake>`, `public val value: ULong`, "coerced in". | |
| IKA-C27 | holds | MockK #1073: Open, labels `bug` and `coroutines`, the ClassCastException message, a 2025-10-22 comment ("still a problem", after moving to 1.14.6). MockK #777: closed 2022-04-18 with the 1.5.10 to 1.6.10 statement. Read through WebFetch. | |
| IKA-C28 | holds | detekt `main`: `SuspendFunSwallowedCancellation.kt` has the sentence. `default-detekt-config.yml` line 156-157: `active: false`. | |
| IKA-C29 | holds | The Dokka options page (WebFetch): "Whether to emit warnings about visible undocumented declarations, that is…" and "works well with `failOnWarning`". | |
| IKA-C30 | holds | BCV `master` README: "This plugin is in maintenance mode" (an `[!IMPORTANT]` block) followed by "Fixes for critical bugs…"; "Kotlin version `1.6.20` or newer."; `nonPublicMarkers` sentence. Maven metadata: release 0.18.2, lastUpdated 20260902154228. | |
| IKA-C31 | holds | kotlinx.coroutines 1.10.2 `build.gradle.kts`: BCV plugin 0.16.2 and `ignoredPackages += "kotlinx.coroutines.internal"`. | |
| IKA-C32 | holds | `kotlin.io.path/div.html` (WebFetch): "Resolves the given other path string against this path." Since 1.5. | |
| IKA-C33 | holds | JDA67: the `setEventPool` Javadoc (wrapped over two lines), `@Blocking default T complete()` in RestAction, `JDA.shutdown` Javadoc sentences. | |

### BRD (bot-runtime-design.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| BRD-1 | holds | JDA67 `InterfacedEventManager.java` log line; `DefaultShardManagerBuilder.setEventPool` Javadoc. | |
| BRD-2 | holds | jda-ktx `4fc12af`: `CoroutineEventManager.kt` has the `log.error` line, the `launch { for (listener in listeners) try {` shape, and the constructor. `inject.kt` has the `injectKTX` line. | |
| BRD-3 | holds | JDA67 `DefaultShardManager.java` and `ShardManager.java`: all five quotes. | |
| BRD-4 | holds | kotlinx.coroutines 1.10.2 `SharedFlow.kt`: all three. | |
| BRD-5 | holds | 1.10.2 `CoroutineExceptionHandler.kt`, `Supervisor.kt`, `CoroutineScope.kt`, `Job.kt`: all quotes. | |
| BRD-6 | holds | JDA67 `GatewayIntent.java`: all six quotes. | |
| BRD-7 | holds | JDA67 `DefaultShardManagerBuilder.java`: all three strings, plus the `setShards` bold Javadoc. | |
| BRD-8 | holds | JDA67 `CloseCode.java`: `DISALLOWED_INTENTS(4014, "Disallowed intents…", false)`; the constructor is `(int code, String meaning, boolean isReconnect)`. | |
| BRD-9 | holds | JDA67 `JDA.java` (shutdown Javadoc, `awaitShutdown`); `ShardManager.java` "Shuts down all JDA shards…" and it has no `await*` method. | |
| BRD-10 | holds | JDA67 `DefaultShardManagerBuilder.setEnableShutdownHook`: both quotes. | |
| BRD-11 | holds | Kord docs at `d4ffffc`: all six quotes (`extensions.mdx`, `config/intents.mdx`, `config/plugins.mdx`, `config/sharding.mdx`, `anatomy/general.mdx`). | |
| BRD-12 | holds | JDA67 `ShardManager.java` lines 60-61: "Custom implementations may not support all methods and throw UnsupportedOperationExceptions". OpenJDK `jdk-21+35` `ServiceLoader.java`: both provider-definition sentences. | |
| BRD-13 | holds | BotCommands tag `v3.4.0` (= `c23a9e4`): all the quoted strings and symbols. | |
| BRD-14 | holds | Red-DiscordBot `004a160`: the commands.py and bot.py quotes exact. | |
| BRD-15 | holds | discord.py v2.7.1: cog.py, tasks, backoff.py, shard.py quotes exact. | |
| BRD-16 | holds | Ktor 3.6.0: the `install` signature, the 1000 and 5000 defaults, and the `gracePeriodMillis` line. | |
| BRD-17 | holds | OpenJDK `jdk-21+35` `ServiceLoader.java` (lazily-instantiated sentence, `META-INF/services`). Shadow `c08f93c` `docs/configuration/merging/README.md`: `mergeServiceFiles()`, the "'META-INF/services/foo' is matched by" text, and "duplicates may be silently dropped…". | |
| BRD-18 | holds | Quartz `741ccc3` `Trigger.java`: "misfired for 5 minutes will fire 20 times…". Maven metadata: release 2.5.2, lastUpdated 20251201172916. The DDL-directory observation is a file-existence check; I did not repeat it. | |
| BRD-19 | holds | krontab README at `e4068ce`: the quoted phrase. `krontab-jvm-3.1.0.module`: kotlinx-coroutines-core requires 1.11.0. | |
| BRD-20 | holds | JDA67: `enforce_nonce` true, `MAX_NONCE_LENGTH = 25`. Discord docs `resources/message.mdx`: the nonce-uniqueness sentence. | |
| BRD-21 | holds | KWS `whatsnew23.md`: "Kotlin 2.3.0 stabilizes the new time tracking functionality, [`kotlin.time.Clock` and `kotlin.time.Instant`]". | |
| BRD-22 | holds | Hoplite 3.0.4 (tag `14112f3`): all README quotes. The `hoplite-core-3.0.4.pom` has kotlin-reflect 2.2.21 and kotlinx-coroutines-core-jvm 1.6.4. It also has kotlinx-coroutines-jdk8 1.6.4 and kotlin-stdlib 2.2.10. | |
| BRD-23 | holds | Lightbend config `main` README: " - implemented in plain Java with no dependencies". Maven metadata: release 1.4.9, lastUpdated 20260603152425. | |
| BRD-24 | holds | docker-library/docs `fc56548` `postgres/content.md`: the `_FILE` sentence. | |
| BRD-25 | holds | slf4j `v_2.0.17` `LoggingEventBuilder.java` line 86: `LoggingEventBuilder addKeyValue(String key, Object value);`. JDA 6.7.0 uses slf4j-api 2.0.19 (see JDA-8). | |
| BRD-26 | holds | The two Discord sentences are present in `D/events/gateway.mdx` at the pin (see DPR-26 and DPR-27). | |

### SQL (sqlite-persistence-stack.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| SQL-C1 | holds | `exposed-core` maven-metadata: release 1.6.0, lastUpdated 20261016135854, and the version list as quoted. Directory listing: `exposed-core-1.0.0.pom 2026-01-22 10:55`. | |
| SQL-C2 | holds | `exposed-core` POMs: 1.0.0, 1.1.0, 1.2.0 have stdlib 2.2.20, reflect 2.2.20, coroutines-jvm 1.10.2. 1.6.0 has stdlib 2.3.20, coroutines 1.11.0, datetime-jvm 0.7.1-0.6.x-compat, reflect 2.3.20. CHANGELOG: under 1.3.0, "kotlin 2.3.20". The claim's "Kotlin is bumped to 2.3.20 in 1.3.0" is a paraphrase of that line. | |
| SQL-C3 | holds | Exposed 1.6.0 README: "Kotlin version 2.2.+", the JDBC/R2DBC sentence. The `exposed-dao` row continues "…only compatible with `exposed-jdbc`; with `exposed-r2dbc`, use `exposed-dao-r2dbc` instead". | |
| SQL-C4 | holds | `Transactions.md` line 40: the `suspendTransaction()` sentence (link markup). `Transactions.kt` lines 282-287: no dispatcher parameter; `withContext` only for `NonCancellable`. | |
| SQL-C5 | holds | `Working-with-Database.md` line 34: the R2DBC sentence. The tree page `…/r2dbc/vendors` at tag 1.6.0 lists H2, MariaDB, Mysql, Oracle, PostgreSQL, SQLServer (plus `DatabaseDialectMetadata.kt` and a `metadata/` folder), and no SQLite. The same listing-may-be-incomplete caveat applies. | |
| SQL-C6 | holds | `Migration-Guide-1-0-0.md`: both quotes. CHANGELOG: "chore!: Rename field Transaction.id to Transaction.txId" and the JDBC transaction-management refactor (lines 323-327, the rc-3 section). | |
| SQL-C7 | holds | sqlite-jdbc maven-metadata: release 3.53.4.0, lastUpdated 20260826100422. POM: Apache 2.0, slf4j-api 1.7.36 (marked `<optional>true</optional>`). Jar content-length 12002370. README.adoc: both quotes. | |
| SQL-C8 | holds | 3.53.4.0: `-DSQLITE_THREADSAFE=1` in the Makefile; `getResultCode()`; `SQLITE_BUSY(5, "The database file is locked")`. | |
| SQL-C9 | holds | `sqlite-driver` metadata: release 2.4.1, lastUpdated 20261006150126. POM: jdbc-driver 2.4.1, kotlin-stdlib 2.3.10, sqlite-jdbc 3.53.4.0. `JdbcSqliteDriver.kt` 2.4.1: the class header, `BEGIN TRANSACTION`, `ThreadLocal<Connection>`. `migrations.md` line 4: "PRAGMA user_version". | |
| SQL-C10 | holds | sqlite-jdbc 3.53.4.0 `USAGE.md`: the auto-upgrade sentences. | |
| SQL-C11 | holds | jOOQ `version-3.21.9` `SQLDialect.java`: `SQLITE("SQLite", false, true, new RequiredVersion(3, 45, null))` and "The open source jOOQ distributions only support the dialect family". POM licence Apache 2.0. Metadata lastUpdated 20260925075449. | |
| SQL-C12 | holds | kotlinx.coroutines 1.10.2 `CoroutineDispatcher.kt`: all three sentences. | |
| SQL-C13 | holds | BotCommands v3.4.0: `compileOnly(libs.hikaricp) // Optional`; `fetchConnection` and `transactional` signatures; `flyway-core` and `flyway = "13.5.0"`. README line 117: "A PostgreSQL (and H2) database abstraction, with logged queries". | |
| SQL-C14 | holds | sqlite/sqlite `master` `src/wal.c` header comments: both quotes. | |
| SQL-C15 | holds | `doc/wal-lock.md`: both quotes. | |
| SQL-C16 | holds | `src/sqlite.h.in`: both quotes. | |
| SQL-C17 | holds | 3.53.4.0 `SQLiteConfig.java`: `BUSY_TIMEOUT` default "3000", `TransactionMode`, and the five pragma names. `SQLiteConnectionConfig.java` line 147: `begin immediate;`. | |
| SQL-C18 | holds | `JDBC3Connection.java` lines 146-148: the message (string concatenated over two lines). | |
| SQL-C19 | holds | `wal.c`: both comments. | |
| SQL-C20 | holds | https://github.com/sqlite/sqlite/commits/master/src/wal.c (WebFetch): commit `fe57e14` by dan, 2026-03-03, with that subject. The version range 3.7.0 to 3.51.2 and the fix in 3.51.3 agree with web-search summaries of secondary articles (Antithesis, Tailscale reporting). Those I did not open. | |
| SQL-C21 | holds | HikariCP metadata: release 7.1.0, lastUpdated 20260614185921. `dev` README: the SQLite/xerial row and "Java 11+ (Java 6/7/8 artifacts are in maintenance mode)". POM licence: Apache Software License 2.0. | |
| SQL-C22 | holds | sqlite/sqlite `master` `src/pragma.c`: user-version sentences; lines 2335-2336 `{ OP_Transaction, 0, 1, 0}, { OP_SetCookie, 0, 0, 0}`. | |
| SQL-C23 | holds | Flyway 13.10.3: metadata release 13.10.3, lastUpdated 20261015144436. Parent POM licence Apache 2.0. The `flyway-core` jar contains `SQLiteDatabaseType.class` and lists it in `META-INF/services/org.flywaydb.core.extensibility.Plugin`. `jackson-annotations` is non-optional in the core POM. README: the "editions are not part of the Flyway open source project" note, and SQLite among the supported databases. | |
| SQL-C24 | holds | `liquibase-core-5.0.4.pom`: `FSL-1.1-ALv2`, "Functional Source License, Version 1.1, ALv2 Future License". Metadata release 5.0.4. | |
| SQL-C25 | holds | Exposed 1.6.0 `Migrations.md`: all three sentences. CHANGELOG: EXPOSED-755 and EXPOSED-758 lines. | |
| SQL-C26 | holds | `SQLiteConfig.java`: "When secure_delete is on, SQLite overwrites deleted content with zeros". | |
| SQL-C27 | holds | sqlite/sqlite `master`: `build.c` has the STRICT comment and `tabOpts & TF_Strict`; `upsert.c` line 12. The "bundled 3.53.x includes them" step remains the researcher's inference. | |

### HTTP (http-client-stack.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| HTTP-1 | holds | `JDA-6.7.0.pom`; JDA `v6.7.0` `build.gradle.kts` lines 200 and 217; `libs.versions.toml`: `okhttp = "com.squareup.okhttp3:okhttp-jvm:5.5.0"`. | |
| HTTP-2 | holds | `ktor-client-okhttp-jvm-3.6.0.pom`: okhttp-jvm 5.5.0, okio-jvm 3.18.2, coroutines-core-jvm 1.11.0, kotlin-stdlib 2.3.21, ktor-client-core-jvm 3.6.0. At 3.2.0: okhttp 4.12.0. At 3.3.0: okhttp-jvm 5.1.0. | |
| HTTP-3 | holds | ktor-documentation `c85f518` `client-engines.md`: CIO "currently supports HTTP/1.x only"; "The `Apache5` engine supports both HTTP/1.1 and HTTP/2". Still HEAD. | |
| HTTP-4 | holds | OkHttp `parent-5.5.0` README: both sentences. | |
| HTTP-5 | holds | `ExecuteAsync.kt` (`executeAsync`, `invokeOnCancellation`); `okhttp-coroutines-5.5.0.pom`: coroutines-core-jvm 1.11.0 (runtime). | |
| HTTP-6 | holds | `Dispatcher.kt`: 64 and 5. `OkHttpClient.kt`: callTimeout 0, connect/read/write 10_000. | |
| HTTP-7 | holds | `Dns.kt` (`fun interface Dns`, `lookup`) and `Headers.kt` `getInstant` sentence. | |
| HTTP-8 | holds | OpenJDK `jdk-21+35` `HttpClient.java`: all ten builder methods exist and the "No guarantee is made as to exactly when…" sentence. | |
| HTTP-9 | holds | kotlinx-serialization-json-jvm POMs: stdlib 2.2.0 (1.9.0), 2.3.0 (1.10.0), 2.3.20 (1.11.0), 2.4.10 (1.12.0). I parsed `kotlin/Metadata` `mv` from `Json.class` in each jar: [2,2,0], [2,3,0], [2,3,0], [2,4,0]. Release 1.12.0, lastUpdated 20261019182949. | |
| HTTP-10 | holds | v1.11.0 README line 78 (link markup) and the `2.3.20` plugin and jvm lines. v1.9.0 CHANGELOG: "This release updates Kotlin version to 2.2.0". | |
| HTTP-11 | holds | v1.9.0 `docs/json.md` lines 140-141 and 277 (wrapped, with link markup). | |
| HTTP-12 | holds | `JvmStreams.kt` at v1.9.0 and v1.11.0: `@ExperimentalSerializationApi` on both `decodeFromStream` overloads. v1.11.0 CHANGELOG: the input-in-messages sentence. | |
| HTTP-13 | holds | Caffeine v3.3.1: README sentence; POM jspecify 1.0.1, error_prone_annotations 2.50.0, Apache 2.0; `.module` `org.gradle.jvm.version` 11; metadata release 3.3.1, lastUpdated 20261013031251. | |
| HTTP-14 | holds | `AsyncCache.java` (v3.3.1): the atomicity and removal sentences. | |
| HTTP-15 | holds | `Async.java` lines 184-200: `AsyncExpiry implements Expiry<K, CompletableFuture<V>>`; `expireAfterCreate` returns `ASYNC_EXPIRY` until the value is ready, then the delegate's value capped at `MAXIMUM_EXPIRY`. | |
| HTTP-16 | holds | The Caffeine Eviction and Population wiki pages (WebFetch, rendering): all four sentences. | |
| HTTP-17 | holds | kotlinx.coroutines 1.10.2 `future/Future.kt`: `CompletionStage.await` doc, both halves. | |
| HTTP-18 | holds | odota/core `449fb7b` `config.ts`: the three limits. `svc/web.ts`: both header names and both error strings. `svc/util/time.ts` line 10: `endOf("day")`. These are repository defaults. | |
| HTTP-19 | holds | The text is in the Open-Meteo website source at `7083376` and at `main`: https://raw.githubusercontent.com/open-meteo/open-meteo-website/7083376e436061822f26c5becb9d41c5f87b6d58/src/routes/en/terms/+page.svelte. open-meteo.com itself is refused. | |
| HTTP-20 | unclear: source unreachable (www.pathofexile.com) | Not opened. I found no reachable mirror. | Treat as an unverified search excerpt. |
| HTTP-21 | holds | MDN content `6c2954d`: `Retry-After` page (the two syntax lines, the 429 bullet) and `status/429`. | |
| HTTP-22 | holds | Bucket4j `959d97c` `Bucket.java`: the Javadoc and the three method signatures. README sentence and "For java 17+" comment. Metadata release 8.21.0, lastUpdated 20261002191457. | |
| HTTP-23 | holds | Resilience4j v2.4.0 `RateLimiterConfig.java` lines 40-42. POM: resilience4j-core 2.4.0, slf4j-api 1.7.30. | |
| HTTP-24 | holds | JDA67 `RestRateLimiter.java` line 35 and `SequentialRestRateLimiter.java` lines 322 and 329. Kord `db459ec`: `await`, `retryAfterHeader`, `ktor = "3.4.0"`, `kotlinx-serialization = "1.10.0"`. | |
| HTTP-25 | holds | Rome metadata: release 2.1.0, lastUpdated 20230312143826. Release 2.1.0 lists "Downgrade Java from version 11 to 8 … #642" and is the newest listed (WebFetch). Newest master commit "Bump maven-failsafe-plugin … (#671)", 2023-06-21 (WebFetch). `rome-parent-2.1.0.pom`: jdom2 2.0.6.1, slf4j-api 2.0.6. The JDOM CVE-2021-33813 advisory I did not open. | |
| HTTP-26 | holds | Rome 2.1.0 `SyndFeedInput.java` line 110, `WireFeedInput.java` line 66, and README lines 38-39. | |
| HTTP-27 | holds | rssreader `3414a54` README line 21 and the InputStream usage; POM MIT; metadata release 3.12.0, lastUpdated 20251201063113. `rssparser-jvm-6.1.8.module`: stdlib 2.4.10, okhttp 5.4.0, coroutines 1.11.0. | |
| HTTP-28 | holds | OkHttp `parent-5.5.0` `mockwebserver/README.md`: the sentence. WireMock `master` README: "Record/playback of stubs". Metadata: latest 4.0.0-beta.40, newest 3.x 3.13.2, lastUpdated 20261007145436. I did not recount the `mockwebserver3` POM (only 2 `<dependency>` entries appear in it). | |

### DOTA (dota2-data-sources.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| DOTA-1 | holds | odota/core `449fb7b` `config.ts`: all five config lines exact. | |
| DOTA-2 | holds | `svc/web.ts`: the POST/regex/`rateCost = 10`, both headers, both errors, `usageIdentifier = ip`. | |
| DOTA-3 | holds | `svc/api/spec.ts` line 1573: "counts as 10 calls for rate limit (but not billing) purposes". | |
| DOTA-4 | holds | `spec.ts`: all three comments. `playerFields.ts` `recentMatchesCols` includes tower_damage, hero_healing, lane, lane_role, is_roaming, xp_per_min, gold_per_min, last_hits. | |
| DOTA-5 | holds | odota/web `91b1d42`: `premUnit = 100`, `premPrice = 0.01` in `Api.tsx`; the three strings in `en-US.json`. | |
| DOTA-6 | holds | `scanner.ts` and `fullhistory.ts`: all three comments. | |
| DOTA-7 | holds | `insert.ts` and `queries.ts`: all four. | |
| DOTA-8 | holds | `utility.ts`: both BigInt lines. MangoByte `c56f30f` `botdatatypes.py` lines 305-306. | |
| DOTA-9 | holds | `compute.ts`: `pm.lane_pos`, `getLaneFromPosData`, and the role comment lines (written one per line). | |
| DOTA-10 | holds | `json/7490235544_api.json` has player keys `net_worth`, `item_neutral`, `ability_upgrades_arr` and match keys `radiant_score`, `dire_score`. `MatchResponse.ts` has no `net_worth`. `getMatchBlob.ts` line 46: `...api,`. | |
| DOTA-11 | holds | dotaconstants `5c0242d`: `heroes.json` antimage img, `items.json` blink img, LICENSE "MIT License". odota/web `config.ts`: `https://cdn.cloudflare.steamstatic.com`. | |
| DOTA-12 | holds | SteamTracking `f885c90` `ISteamNews.json` GetNewsForApp v2: parameters appid (required), maxlength, enddate, count, feeds, tags, no key. (v1 has tags but not feeds.) `ISteamUser.json` `ResolveVanityURL`: `key` required. | |
| DOTA-13 | holds | steam-news `7373096`: `SteamNews.py` URL and `newsitems`; `database.py` has gid, is_external_url, feedlabel, feed_type. | |
| DOTA-14 | holds | dotaconstants `tasks/updateconstants.ts` lines 1172-1173. | |
| DOTA-15 | holds | MangoByte `dotastats.py`: `seconds_per_check = 20`, `seconds_till_timeout = 120`, the `/request/{jobId}` query, `is_parsed(cached_data)`, `cache.remove(url)`. | |
| DOTA-16 | holds | `svc/items.ts`: the `dota2.com/datafeed/itemlist` URL. | |
| DOTA-17 | unclear: source unreachable (steamcommunity.com) | WebFetch: DNS failure. | Treat the 100,000/day figure and the "as requested by the end user" clause as unverified. |
| DOTA-18 | unclear: source unreachable (steamdb.info) | WebFetch: DNS failure. | Unverified. |
| DOTA-19 | unclear: source unreachable (blog.opendota.com) | WebFetch: DNS failure. | Unverified. |
| DOTA-20 | unclear: source unreachable (stratz.medium.com) | WebFetch: DNS failure. | Unverified. |

### GWD (game-and-weather-data-sources.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| GWD-1 | holds | open-meteo-website `7083376` terms page: both quotes. The same quotes are on `main`. | |
| GWD-2 | holds | Same file: all three bullets. | |
| GWD-3 | holds | Same file: "applied by IP addresses and application". | |
| GWD-4 | holds | open-meteo `7afe0fd` `RateLimiter.swift` (`limitDaily` 10_000, the message) and `ForecastApiResult.swift` (the two weight lines). | |
| GWD-5 | holds | open-meteo README: the CC BY 4.0 sentence and the attribution `<a>` line. | |
| GWD-6 | holds | `forecast.yml` (three quotes) and `docs/+page.svelte` (WMO). | |
| GWD-7 | holds | `geocoding-api/+page.svelte`: both quotes. geocoding-api `b404e4d` controller: "Parameter count must be between 1 and 100." | |
| GWD-8 | holds | `GeocodingDatabaseTests.swift` line 64; README: GeoNames sentence and CC BY-NC 4.0. | |
| GWD-9 | holds | metno `23d20d9`: TermsOfService.md (three quotes), HowTO.md (403 sentence), FAQ.md ("A. You need a geocoding service."). | |
| GWD-10 | holds | weather-gov/api `694ed0f` `general-faqs.md`: both quotes. | |
| GWD-11 | unclear: source unreachable (docs.zippopotam.us) | WebFetch: DNS failure; no mirror found. | Unverified. |
| GWD-12 | unclear: source unreachable (operations.osmfoundation.org) | WebFetch: DNS failure. I did not retry the mirror host. | Unverified. |
| GWD-13 | holds | MarvelRivalsAPI-Wrapper `d6927e6`: `x-api-key`, the match-history route, the match route, "defaults to 40". | |
| GWD-14 | holds | externref/marvelrivalsapi `edb7bf0` `models.py`: `class RankSeason` docstring. | |
| GWD-15 | unclear: source unreachable (marvelrivalsapi.com, docs.marvelrivalsapi.com) | WebFetch: DNS failure; no mirror. | Unverified. |
| GWD-16 | unclear: source unreachable (tracker.gg) | WebFetch: DNS failure. | Unverified. |
| GWD-17 | unclear: source unreachable (www.pathofexile.com) | WebFetch: DNS failure. | Unverified. |
| GWD-18 | unclear: source unreachable (www.pathofexile.com) | WebFetch: DNS failure. | Unverified. |
| GWD-19 | holds | poe2-mcp `5bb92a4`: README lines 375-376; `src/auth.ts` line 12; `src/config.ts` line 156. | |
| GWD-20 | holds | poe2-mcp README lines 405-406 and poe2-forge `6be4fec` README line 23, both as secondhand quotes. | |
| GWD-21 | unclear: part 2 unreachable (poe.ninja) | Part 1 holds: yaredmax README lines 117-118 ("internal. They are undocumented, unsupported, and not available for third-party use."). The "supported public surface" excerpt on poe.ninja/docs/api: DNS failure. | Rely on part 1 only. |
| GWD-22 | holds | sergeyklay `d2c9a7e` `ninja.ts` lines 62 and 73. Davenads README says "Undocumented: These endpoints may change without notice" (no trailing period). | |
| GWD-23 | holds | SteamTracking `ISteamUserStats.json`: `key` required on GetUserStatsForGame, GetPlayerAchievements, GetSchemaForGame. `GetNumberOfCurrentPlayers` has only `appid`; `GetGlobalAchievementPercentagesForApp` has only `gameid`. | |
| GWD-24 | holds | `IPlayerService.json`: the `include_played_free_games` description (the quote has two spaces after the first period, as in the source). | |
| GWD-25 | unclear: source unreachable (steamcommunity.com) | Same as DOTA-17. | Unverified. |
| GWD-26 | unclear: source unreachable (steamcommunity.com, developer.valvesoftware.com) | Not opened. | Unverified. |
| GWD-27 | holds | `D/resources/message.mdx` lines 582 and 591. | |

### UBC (unreleased-build-consumption.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| UBC-1 | holds | Gradle `v9.7.1` `composite_builds.adoc`: both quotes. Identical at v9.8.2. | |
| UBC-2 | holds | Same file: both quotes. | |
| UBC-3 | holds | Same file: both quotes (em dashes included). | |
| UBC-4 | holds | Same file: "Unique Build Paths". `upgrading_version_7.adoc`: the directory-hierarchy sentence. | |
| UBC-5 | holds | `configuration_cache.adoc`: the file-system-state line. Same at v9.8.2. | |
| UBC-6 | holds | vanniktech `0.37.0` `docs/central.md`, "Publishing snapshots": all three sentences (the second one has a link in it). | |
| UBC-7 | holds | `MavenPublishBaseExtension.kt` has the URL and `PasswordCredentials` lines. `MavenCentralBuildService.kt` line 80 has the `-SNAPSHOT` early return. | |
| UBC-8 | holds | `MavenPublishBaseExtension.kt`: both lines. | |
| UBC-9 | holds | Line 237: `gradleSigning.setRequired(version.map { !it.endsWith("-SNAPSHOT") })`. | |
| UBC-10 | holds | `CHANGELOG.md`: 0.33.0 notice (lines 165-166) and 0.31.0 entry (lines 248-249). | |
| UBC-11 | holds | CHANGELOG 0.37.0 (2026-06-21): the minimum versions list (JDK 17, Gradle 9.0.0, AGP 8.13.0, KGP 2.2.0). The tag list shows `0.37.0` as the newest. | |
| UBC-12 | holds | Moshi `889013e` README and `build.yml`: all quotes. | |
| UBC-13 | holds | The Gradle `v9.7.1` repository-filtering snippet: `snapshotsOnly()` and `includeGroup("my.company")`. | |
| UBC-14 | holds | `dependency_caching.adoc`: the 24-hour sentence. `dependency_locking.adoc` line 50: "it **should not be used** with <<…changing versions>> (e.g., `-SNAPSHOT`)" (link markup). `dependency_versions.adoc`: the unreproducible-builds sentence. | |
| UBC-15 | holds | github/docs `6664638`: `authenticate-packages.md` sentence; `packages-classic-pat-only.md` "only supports authentication using a {% data variables.product.pat_v1 %}". Unchanged at `main`. | |
| UBC-16 | holds | jitpack.io `3a14472`: README has the `master-SNAPSHOT` line. The paths cited as `BUILDING.md` and `FAQ.md` do not exist at that commit (404). The text is in `building/_index.en.md` and `faq/_index.en.md`. It says "JitPack publishes all of them" (not "publish"), and the JDK line is "JitPack compiles projects using OpenJDK Java 8 by default for legacy compatibility" (not "will compile projects using OpenJDK Java 8."). The other quotes are exact. The substance holds. | Cite `building/_index.en.md` and `faq/_index.en.md`. |
| UBC-17 | holds | tommyettinger `97a1188` `jitpack.yml`: sdk install/use `java 21-open`, `jdk: openjdk21`. | |
| UBC-18 | holds | Gradle `v9.7.1` `GitVersionControlSystem.java`: the TODO comment and the `refs/heads/master` check. | |
| UBC-19 | holds | actions/checkout `v4` README, section at line 228: `path: main`, `repository: my-org/my-tools`, `path: my-tools`; `action.yml` input description. | |
| UBC-20 | holds | vanniktech issue #891 (reply: "make sure that snapshots are enabled for your namespace"; reporter saw 403 on POMs). eisop issue #2109: "Central deletes snapshots after ~90 days". Both read through WebFetch; single reports, and Sonatype's own page is unreachable. | |

### INV (codebase-inventory-and-fate.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| INV-1 | holds | https://github.com/SpartanLaboratories/GKB2/issues/2: Open, opened 2023-08-17, "SingleChannelListener not up to date with Spring Framework"; the body quote is exact. | |
| INV-2 | holds | Issue #5: Open, titled "Help Message briefs and details can be beans"; the body quote is exact. | |
| INV-3 | holds | Issue #3: Open, title "Services not up to date with Sping Framework rework" (typo in the title). Body: services depended on an abstract `invoke()` in `CheckValueService`. The 2023-09-02 comment: "ServiceCommand has been tested but not other service types." | |
| INV-4 | holds | Issue #4: Open, "Bot Companion cleanup". The 2023-08-25 comment: legacy command creation "completely removed"; the 2023-09-02 comment: "Only Timekeeping/"Central Method" clutter remains". | |

### PURGE (bot-repository-history-purge.md)

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| PURGE-1 | holds | github/docs `main` `removing-sensitive-data-from-a-repository.md` line 24: both sentences. HEAD `6664638`. Template variables only differ from the rendered wording. | |
| PURGE-2 | holds | Same file: the Support sentence. | |
| PURGE-3 | holds | Same file lines ~48-52 (three bullets; "cached views on {% data variables.product.github %}"). | |
| PURGE-4 | holds | Same file: the version-2.47 sentence and the command. | |
| PURGE-5 | holds | Same file: `git push --force --mirror origin` and the `refs/pull/` sentence. | |
| PURGE-6 | holds | Same file: line 152 "Dereference or delete any affected PRs on {% data variables.product.github %}." plus the other items. | |
| PURGE-7 | holds | Same file: the `grep -c '^refs/pull/.*/head$' .git/filter-repo/changed-refs` line. | |
| PURGE-8 | holds | Same file: both quotes. | |
| PURGE-9 | holds | newren/git-filter-repo `main` `Documentation/git-filter-repo.txt`: both quotes. | |
| PURGE-10 | holds | Same file: `--prune-empty` auto default. | |
| PURGE-11 | holds | Same file: the `--bare`/`--mirror`/`--no-local` sentences. | |
| PURGE-12 | holds | Same file: the delete-all-tags text, and the `git cat-file -t …` line. | |
| PURGE-13 | holds | Same file: `--replace-refs` default. | |
| PURGE-14 | holds | GitHub removal page: the `--replace-text` non-binary sentence. | |
| PURGE-15 | holds | `converting-from-bfg-repo-cleaner.md`: both quotes. | |
| PURGE-16 | holds | rtyley/bfg-repo-cleaner `gh-pages` `index.html`: the sentence (HTML tags strip out). | |
| PURGE-17 | holds | github/docs `archiving-repositories.md`: the read-only list. | |
| PURGE-18 | holds | github/docs `setting-repository-visibility.md`, "Making a repository public" (line 68): both quotes. | |
| PURGE-19 | holds | github/docs `public-docs.yml` lines 1843-1849: Discord Bot Token, `discord_bot_token`, isPublic, isPrivateWithGhas, hasPushProtection all true. | |
| PURGE-20 | holds | gitleaks-action `master` README: both quotes. | |
| PURGE-21 | holds | gitleaks `master` `config/gitleaks.toml` lines 421-424: the rule exactly as quoted. | |
| PURGE-22 | holds | gitleaks README: the `path` comment (comment lines 296-297, "#" markers aside), the `git` command line, `--redact`. LICENSE "MIT License". | |
| PURGE-23 | holds | git/git `master` `gitignore.adoc`: both quotes. | |
| PURGE-24 | holds | `git ls-remote` shows `v2.47.0` as the highest filter-repo tag. The releases page (WebFetch) shows v2.47.0 as "Latest", dated "04 Dec", year not shown. | |

### Planner-added claims

| ID | Verdict | What I found | Take as true instead |
|---|---|---|---|
| P1 | holds | odota/core `449fb7b` (HEAD, 2026-10-19), `svc/web.ts` lines 463-508. The increment comes first, the comparison second: `const command = redis.multi(); command.hincrby("rate_limit", res.locals.usageIdentifier, rateCost).expireat(...); command.hincrby("daily_rate_limit", res.locals.usageIdentifier, rateCost).expireat(...); const resp = await command.exec();`. Then `const remMinute = Number(rateLimit) - Number(incrValue); const remDay = Number(config.API_FREE_LIMIT) - Number(dailyIncrValue);`, then `if (remMinute < 0) { return res.status(429)… "minute rate limit exceeded" }` and `if (!res.locals.isAPIRequest && remDay < 0) { return res.status(429)… "daily api limit exceeded" }`. Cost: `if (req.method === "POST" && /^\/api\/request\/[^/]+\/?$/.test(req.path)) { rateCost = 10; }`. Three qualifiers: the whole block runs only when `config.ENABLE_API_LIMIT` is truthy (default ""); the daily 429 applies only to requests without an API key; both counters are incremented for keyed requests too. | |
| P2 | holds | KWS `docs/topics/gradle/gradle-configure-project.md` (same table as https://kotlinlang.org/docs/gradle-configure-project.html): `| 2.2.20–2.2.21 | 7.6.3–8.14 | 7.3.1–8.11.1 |`, `| 2.2.0–2.2.10 | 7.6.3–8.14 | 7.3.1–8.10.0 |`, `| 2.3.0 | 7.6.3–9.0.0 | 8.2.2–8.13.0 |`, `| 2.3.10 | 7.6.3–9.0.0 | 8.2.2–9.0.0 |`, `| 2.3.20–2.3.21 | 7.6.3–9.3.0 | 8.2.2–9.0.0 |`. The live page also lists `2.4.0–2.4.10 | 7.6.3–9.5.0` and `2.4.20–2.4.21 | 7.6.3–9.7.0`. Wording note: Gradle 9.0.0 is the upper bound of the 2.3.0 and 2.3.10 ranges, not the lowest version in any range. 2.3.0 is the first KGP line whose documented range reaches Gradle 9. | Read the claim as "KGP 2.3.0 is the first line documented up to Gradle 9.0.0". |

## 2. Totals

holds 285 / fails 0 / unclear 14 / out of scope 0 / not reached 0 (299 claims in total, including P1 and P2)

The 14 unclear:
- HTTP-20
- DOTA-17, DOTA-18, DOTA-19, DOTA-20
- GWD-11, GWD-12, GWD-15, GWD-16, GWD-17, GWD-18, GWD-21 (part 2 only), GWD-25, GWD-26

## 3. Fails

None. Holds that need a caveat before the planner relies on them:
- DPR-30, DPR-31, DPR-32: the quotes are true of the 2022-10-01 snapshot only. A Developer Terms and Developer Policy version "Effective date: July 8, 2024" exists on support-dev.discord.com (refused), so the 2022 wording may be superseded.
- UBC-16: the cited `BUILDING.md` and `FAQ.md` do not exist at that jitpack.io commit. The text is in `building/_index.en.md` and `faq/_index.en.md`, and two quotes are slightly reworded there.
- P2: Gradle 9.0.0 is the upper bound of the 2.3.0 and 2.3.10 ranges, not a lower bound.
- JDA-7: the "migrate to JDA 6 as soon as possible" sentence in v6.2.1 is about the DAVE voice protocol, not channel obfuscation.
- SQL-C20: the commit is verified; the affected and fixed SQLite versions rest on secondary-article summaries only.
- IKA-C6 and IKA-C15: the quotes are truncations of longer sentences.
- Release-note claims JDA-6, JDA-7, HTTP-16 and HTTP-25 were read through WebFetch renderings, not raw text.

## 4. Hosts that refused me

All failed with "getaddrinfo ENOTFOUND" through WebFetch.
- steamcommunity.com
- steamdb.info
- blog.opendota.com
- stratz.medium.com
- docs.zippopotam.us
- operations.osmfoundation.org
- marvelrivalsapi.com
- tracker.gg
- www.pathofexile.com
- poe.ninja

I did not try discord.com, docs.discord.com or support-dev.discord.com directly, because the coordinator's probe already showed them refused. I did not try the other hosts in the probe list (OpenDota's sites, docs.gradle.org, sqlite.org, Sonatype). github.com pages, raw.githubusercontent.com, repo1.maven.org (with retries on 429), and kotlinlang.org all answered.

I created no files outside my own scratch checkouts. I deleted those, and the helper scripts I wrote under the scratchpad, before replying.