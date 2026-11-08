# Codebase inventory and fate of every part of KotlinBottools and GKB2

For: SpartanLaboratories/KotlinBottools#1
Date read: 2026-10-20.
Applies to: KotlinBottools `main` @ b2f2078 (7.5-SNAPSHOT, Kotlin 2.1.10, JDA 5.6.1; the branch adds only `docs/` commits, and the untracked `docs/bottools-vision-and-roadmap.md` was not read); GKB2 `master` @ 9422f85 (Kotlin 1.7.20 multiplatform with Compose desktop, JDA 5.0.0-beta.2, Spring XML wiring). Lineage only: `spartanlaboratories/gkb` (11 commits, 2023-03-25 to 2023-05-09), `spartanlaboratories/bottools` (Java, 15 commits, last 2022-10-31), `/home/user/trumpbot` (Java, 9 commits). Nothing was built or run; every "live/dead" verdict is from callers and wiring read in the source.

Short names: **KB** is KotlinBottools, **G2** is GKB2. Paths are relative to `src/main/kotlin/bottools/` (KB) and `src/jvmMain/kotlin/com/spartanlabs/bottools/` (G2) unless stated. Data files are described by path and structure only; no member names, guild names, ids or secrets are quoted.

## 1. Question

What does each part of KB and G2 do today, which copy is better where both have one, and where does each part go in the consolidated library (`bottools-core`, `bottools-data-sqlite`, `bottools-stats`, `bottools-plugins`) or in MagicBot? The answer must hold these facts about the work:

- The command surface (hierarchical tree, alias DSL, property-backed get/set, inline handlers, `Option` helpers) is rebuilt on immutable definitions with a per-invocation context.
- HTML scraping, XML storage, Spring wiring, the classpath-scanning `Responder` and the Compose manager are replaced by new systems.
- Plugins at 1.0.0 are reaction roles (with default role on join and the welcome message), math, weather and admin. Poker is a separate post-1.0.0 phase.
- MagicBot carries the Dota 2 command and the legacy importer.
- Points/promotions, playlists/channel duplication, channel-reserving conversations, spam control, the stdin console and the daily-update hook are not on the roadmap and are listed as potential later features.

## 2. Bottom line

- **Almost nothing is carried as code; the carried part is behaviour and shape.** Of ~8,000 lines across the two repositories, the command classes (about 850 lines in KB, 970 in G2) survive only as a surface that is rewritten. Everything that touches state (`Command` fields, `D`/`B` XML singletons, `Parser.triggers`, `Bot` companion) is replaced because it is the source of the concurrency defects.
- **G2 is the better copy for the command model, KB for everything that actually runs.**
  - G2 has the alias DSL (`OrganizationCommand.and`/`becomes`; KB has only `orgData`), `brief`/`details` as data, the `else this(args)` fix in `Command.invoke(CommandContainer)`, `Result` returns on the storage port, and the only math/weather/poker/admin code.
  - KB has the only working runtime. Its typed path is wired, `GameStatsCommand` resolves the target member correctly, reaction-role welcome messages record channel and id, and logging is slf4j. G2's typed path is dead (`CommandFactory.getCommand` casts a `MessageReceivedEvent` to `GenericCommandInteractionEvent`; `Parser.addTrigger` is never called), `HelpCommand` is dead, `admin` is dead, and `MyLogger` writes into the Compose view model.
- **Dota 2 lives in test scope in both repositories** (`src/test/kotlin/DotaCommand.kt`, `src/jvmTest/.../DotaCommand.kt`). `showStats` is a `println` stub in both. Of the four old names, only `setid`, `getid` and `lastgame` have behaviour today (KB `GameStatsCommand.SCSetID`/`SCGetID`/`manualLastGame`). G2 dropped `setid`/`getid`: its `PropertyCommand(::user_ID, …)` registers `getuserid`/`setuserid`. `showstats` is an alias to a feature that must be built new.
- **Four things that look like features are not live as described:**
  - `GuildDataParser` (points, playlists, duplicated channels, requests, money, DST) is entirely inside one `/* … */` comment.
  - Spam control is never enabled (`"spamcontrol"` is absent from `activeplugins`) and its Boolean result is ignored.
  - The G2 `admin` bean is commented out in `internals.xml`.
  - The G2 Compose manager runs only from a test `main`; G2's `mainClass = "MainKt"` names a class that does not exist.
- **Context menus have plumbing but no command in either repository** (`MessageInteractionCommand` has no subclass; `UserContextInteractionEvent` is handled in `Command.invoke` but nothing declares a user menu).
- **GKB2's open issues #2–#5 are all obsolete.** #2 and #3 concern components that leave (the channel-reserving listener, the scraped services), #4 the `Bot` companion and Compose clutter, and #5 is Spring-bean help text whose intent (brief/details as data on the definition) the rebuilt definitions satisfy.
- **Legacy data is small.** `guildData/` holds 6 folders, 5 with member files, 260 member entries, and only 2 entries with a linked game id. The importer's real value is the guild settings (channels, welcome-message records, default role) rather than the links.

## 3. Findings

Evidence tier for every finding in this section: **repository fact** (read directly from the source at the commits above); the issue texts are **external primary** (section 7).

### 3.1 Live features today

"Live" means reachable from a started bot in the repository's own entry point. Both entry points are in test scope (KB `src/test/kotlin/TestBot.kt` `KotBot`; G2 `src/jvmTest/.../TestBot.kt` `KotBot` via the Compose `start`). `src/main/kotlin/Main.kt` in KB holds one infix function (`Boolean.and`) and does not reference `DotaCommand`.

| # | Feature | KB | G2 | Notes (evidence) |
|---|---|---|---|---|
| 1 | Slash commands | live | live | KB `Bot.handleCommand(SlashCommandInteractionEvent)` → `commands[event.name]`. G2 `CommandFactory.getCommand` resolves a Spring prototype bean by name. Every reply is deferred. |
| 2 | Typed messages | live, prefix `/` | dead | KB `BotListener` init calls `Parser addTrigger "/"`. G2 never calls `addTrigger`, and `Bot.handleCommand(MessageReceivedEvent)` calls `CommandFactory.getCommand(event)`, which casts to `GenericCommandInteractionEvent` and never invokes the command. |
| 3 | Context-menu commands | plumbing only | plumbing only | `MessageInteractionCommand` has no subclass in either repository. |
| 4 | Help | live, partial | dead | KB `HelpCommand` registered by `Bot` init; `/help <name>` via slash dereferences the null `messageEvent`. G2 `HelpCommand` reads `Bot.commands` (never filled) and its bean is commented out in `internals.xml`. |
| 5 | Guild data creation on join | live | live | `KotGDP.createGuildDatabase` on `GuildJoinEvent` (KB via `BotListener`; G2 via `KotGDP.init`). Also member entries for every member of every guild at startup (`updateServerDatabase`), and a folder rename on `GuildUpdateNameEvent`. |
| 6 | Default role on member join | live but unconfigurable | same | `getRoleById(D/guild-"defaultrole")`: the seeded value is the literal `online` (a name, not an id) so the lookup returns null and `!!` throws. No command in either repository sets `defaultRole` (the G2 `admin` that could is disabled). |
| 7 | Welcome message and reaction roles | live | live, partly broken | `AddReactionRole`, `CreateMainWelcomeMessage`, `ReactionRoleActions`. KB records `channel` + `id` per welcome message; G2 records the message id as both key and value (`D/message.guild/"welcomeMessages"/message.id to message.id`) so `getGuildWelcomeMessages` looks up a channel by message id and throws. |
| 8 | Dota 2: set/get id, last game, channel setting | test scope | test scope | `DotaCommand : GameStatsCommand` in tests; KB registers it in `KotBot.listCommands`, G2 via test `commands.xml`. |
| 9 | Dota 2: automatic match posts | test scope, live | test scope, disabled | KB `DotaCommand.init` calls `createdUserGamesService()` (60 s loop over every member of every guild, scraping dotabuff). G2's call is commented out. |
| 10 | Dota 2: patch notes | disabled | test scope, live | KB comments out `createPatchNotesService()`; G2 enables it (10 s poll of a steamdb RSS feed through a skraped page). Both post with TTS to a guild named by a literal. |
| 11 | Math | absent | live plugin | G2 `plugins/math/MathCommand`, listed in `activeplugins`. |
| 12 | Weather | absent | live stub | G2 `WeatherCommand` returns a latitude/longitude from `res/zip codes.txt`; it calls no weather service. |
| 13 | Poker | absent | live skeleton | G2 `PokerCommand`: tables, seats, blinds, buttons; no deck, no hands, no betting rounds, no winner by hand. |
| 14 | Admin data access | absent | dead | G2 `admin` + `DataAccessCommand`; bean commented out. |
| 15 | Path of Exile currency prices | absent | test scope | G2 `PalOfExile` takes screenshots of poe.ninja through WebTools' `WebViewer`. |
| 16 | Compose manager | absent | test-scope entry | G2 `manager/Manager.kt` `start` (window, Start button, log list). |
| 17 | stdin console | live | absent | KB `Bot` init starts `Console` (a `Thread` reading `System.in`). |
| 18 | Daily-update hook | live | declared, never called | KB `Bot.CentralProcess` thread calls the abstract `applyDailyUpdate` once, then sleeps 24 h in a loop (test `KotBot` overrides it empty). G2 declares `applyDailyUpdate` and has no caller. |
| 19 | Points, promotion ranks, playlists, channel duplication | dead | dead | See 3.3. |
| 20 | Channel reservation | dead | dead | No subclass of `ChannelReservingCommand` in either repository. |
| 21 | Spam control | dead | dead | See 3.3. |

### 3.2 Defects that decide verdicts (all by symbol)

Command model (KB and G2 share most of these; the prior-art findings list the rest):

- KB `Command` holds the invocation in fields on a singleton (`guild`, `member`, `channel`, `message`, `args`, `eb`, `reply`, private `scEvent`, `messageEvent`). `Command.reply` calls `complete()` on a single-use `ReplyCallbackAction`.
- KB `Command.invoke(CommandContainer)` runs the sub-command and then falls through to `this(args)` (missing `else`). G2 has the `else`.
- `SubCommand.getParent(steps)` has no base case for `steps <= 1`. It is reached from `SubCommand.addOption` as `getParent(nestLevel - 2)`, so adding an option to a third-level sub-command recurses without end.
- `SubCommand` delegates `guild`, `channel` (and in G2 `reply`, `hook`) to the parent's mutable fields (`by parent::guild`), so sub-commands share the singleton's state.
- `Command.init` calls the open `description`/`helpMessage` before subclass construction completes (KB). G2 moves to abstract `brief`/`details` but still reads `description` in `init`.
- `OrganizationCommand.invoke` does `commandData.args[0] = orgCommands[commandData.args[0]]!!` (throws on an unknown alias) and only aliases a direct child.
- `PropertyCommand` is `KMutableProperty<String?>` invoked by reflection; every value is a string, and the G2 getter does `value!!`. G2 `DataAccessCommand` keeps one mutable `path` field shared by every invocation.
- `Option(type: String, …)` maps any unknown type name to STRING and knows four types.
- `Parser.parse(String)` lowercases the whole message, drops every token starting with `@` or `#`, and uses a global `triggers` list. `Parser.parse(SlashCommandInteractionEvent)` flattens to `asString` values and loses option names.
- G2 `Command` spells the enable sub-command `"enFable"`.
- No `Permission`/`DefaultMemberPermissions` check exists in either repository. `AddReactionRole`, `CreateMainWelcomeMessage` and G2 `admin` are open to every member.

Runtime and events:

- `Responder` scans `net.dv8tion` at construction to build `actionMap` and then does `actionMap.get(event.getClass())` (null for any class the scan missed). G2 adds `addOnButtonInteractionAction`, which starts a thread that polls the `acting` flag every 100 ms before registering, and `on(...)`, which finds the event type by reflecting on `getMethods()[0]`.
- KB `BotListener.onMessageReceived` forwards a message only if it starts with a trigger, so no non-command message subscriber could work (this is why spam control cannot).
- KB `Bot`: requests `EnumSet.allOf(GatewayIntent)`, `MemberCachePolicy.ALL`, loads all members of every guild at start, reads the token from `key.txt` into a static `keys` array, keeps `jda` as a nullable companion field, registers slash commands with `complete()`, swallows exceptions with `printStackTrace`. `CentralProcess` sleeps a fixed 24 h after each run (drifts, cannot be cancelled, runs on a raw thread).
- G2 `Bot`: companion `init` order couples JDA creation, the listener and Compose state (`updateState`); the `commands` map is never filled.
- G2 `CommandFactory`: `lateinit var event` in the companion, unconditional `deferReply()`, prototype beans fetched by lower-cased command name (an unknown name throws `NoSuchBeanDefinitionException` with no handler), `applicationContext` created in the companion at class load. Plugin commands exist twice: once built directly by `Plugins` (whose `CommandData` is registered) and once as an inactive prototype bean in `plugins.xml` (the instance that runs).
- G2 `MyLogger.info` appends to `viewModel.logMessageList`, a `lateinit` Compose object, so a headless run throws.

Storage:

- `KotGDP`/`BaseXMLReader`: one shared `doc`/`currentNode` per reader (not thread-safe, and the polling threads and event threads both use it), a full DOM write on each change, guild folders keyed by guild *name* (`guildData/${guild.name}`), members keyed by the user name with non-alphanumerics stripped (`xmlAcceptable`, `getNodeOf`), so name changes and collisions corrupt links. `Date` validates 30-day months backwards (`if (date < 30) throw`) and omits the `throw` for 31-day months.
- G2 `Database`/`DatabaseAccessPoint` is the only storage port in either repository; it returns `Result<Unit>` for creation operations but exposes XML-shaped `div`/`minus`/`create`/`containing`.

Stats and scraping:

- `GameStatsCommand.targetGameNode` (G2) uses `member/"Games"/…`, the invoker, so `getid` for another person returns the invoker's link and `setid` for another person overwrites the invoker's. KB uses `targetMember`.
- `OnlineCommand.getValueFromKey` cuts the page string by literal `initial`/`terminal` markers from `WebParseKeys.xml` (58 `<Key>` entries; dota2 keys plus leftovers for Overwatch, Valorant, a cat-image and others with no consumer). `Connector.open` spoofs a browser user agent and `OnlineCommand.prepAddress` captures and stores cookies (`BotData.xml` `Cookies`) to pass anti-bot checks.
- `UserBasedService.checkGuild` polls every member of every guild every 60 s with one blocking HTTP call per linked member; `Connector.waitForTurn` spin-waits (100 ms sleeps) for a single open connection.
- G2 `Test.testRead` prints the content of the token file it reads (`read("keys.txt")`), and there are no assertions in any test in either repository.

Plugins:

- Both `AddReactionRole.invoke`: the confirmation text prints `guild.banner` (a URL/null) instead of the guild name; `getRole` and `invalidEmoteMessage`/`invalidRoleMessage` are unused.
- KB `ReactionRoleActions.giveReactionRole` gives the mapped role for a reaction on *any* message; there is no removal on reaction remove. G2 contains the correct guard (`onReactionAdd` checks `welcomeMessages`) but `Plugins` wires `giveReactionRole` instead, so the guard never runs.
- KB `Plugins.REACTIONROLES` loads defaults with `D.addTagFile("src/main/resources/ReactionRoles.xml")`, a path into the source tree that fails when the library is a dependency; G2 comments that call out (`//TODO`).
- G2 `MathCommand`: `println` debugging on every operation, `sweepThrough` evaluates left to right so `^` is left-associative, trig is in degrees, `factorial` and `setFirstPiece` are unused, no tests.
- G2 weather `Converter`: re-reads the 4.3 MB tab file on every call (`reader` is a getter), `convertCity` returns the first line that *contains* the text, and the `latlong` extension wraps every exception into `Result.failure`.
- G2 poker: `Table.acceptPlayerAction` prompts `player` (the one who just acted) instead of the `PlayerPromptData.player` returned by `Game`; `PokenButtonInteractions.kt` is empty (name misspelt); `PokerCommand` keeps static `tables`/`handles` maps keyed by channel/table and `Player` is identified by user name; each `createtable` registers another button listener.

### 3.3 Features that leave the roadmap (potential later features)

One line each, as the roadmap's "Post-roadmap potential features" entries (what the feature did):

- **Activity points and promotion ranks**: each member entry carried `nPoints` (+1.8 per message, +0.5 per command in `GuildManager.managePoints`) and a per-guild `AutoPromotionRanks.xml` listed `Rank`/`Name`/`Points` thresholds for `GuildManager.checkRankUp` to swap roles and announce the promotion; the rank-up call is a `TODO`, `GuildManager` is never instantiated, and `Console` could set points.
- **Playlists and channel duplication**: `GuildDataParser` kept per-guild `Playlists.xml` (named playlists of songs, `makePlaylist`/`addSong`/`nextSong`/`removeSongFromPlaylist`) for a music command and `DuplicatedChannels.xml` (`addDuplicatedChannel`: source guild, channel ids to mirror) for relaying messages between servers. The whole class is commented out in KB and absent in G2; the music and duplicate commands live only in TrumpBot (`PlaylistCommand`, `DuplicateCommand`).
- **Channel-reserving conversations**: `ChannelReservingCommand` (`reserve`/`unreserve`) made a text channel exclusive to one command so its sub-commands could be typed bare; `SingleChannelListener` told the main listener to ignore the channel and re-parsed its messages. No subclass exists in either repository.
- **Spam control**: G2's `"spamcontrol"` plugin registered `Plugins.isSpam`, which retrieved the last 10 messages and compared them with the new one; its Boolean result is ignored and the plugin is not in `activeplugins` (KB has the same private function with no caller).
- **stdin console**: KB `Console` reads operator lines from standard input (`listservers`, `update`, `addtag`/`removetag` for XML nodes, `print`, `checkpersoncontents`, `sayemoji`, `test`, `set channel|points`, `showchat`); `showchat` and `set channel` use lateinit fields nothing assigns.
- **Daily-update hook**: KB `Bot.CentralProcess` called the subclass's abstract `applyDailyUpdate("d/m")` at start and every 24 h, recording the date in `BotData.xml` (`lastDailyUpdate`); G2 declares the hook with no caller.

Other dead code found (not roadmap candidates; dropped):

- KB `Date`, `DateTimeParser` (no callers; DST/time-zone leftovers; the fields `time/timezone`, `dston`, `dststart`, `dstend`, `money`, `requestedby`, `keyid` in every member entry have no live reader).
- KB `GuildManager.sendDogeMessage` (fixed embed with two image URLs).
- KB `botactions/online/STest.kt` (a scratch `main`), `ServicePacketReader.main`, `SourceKeyParser.main`.
- The scraped-service family (`CheckValueService` and subclasses) is reached only through `GameStatsCommand`, which only test-scope commands extend.
- `RssService` (no caller in either repository), KB build dependencies with no importer (`GeneralTools` as `api`, `commons-math3` as `api`, guava).

## 4. How comparable projects do it

For this question the comparison is the repositories' own lineage, because the sibling-library findings (command frameworks, runtime, persistence) are in the other files of this folder.

- **TrumpBot (Java) is the origin of the unported features.** Its `src/commands` holds `PlaylistCommand`, `PromotionPointsCommand`, `DuplicateCommand`, `SpamCommand`, `MoneyCommand`, `ChessCommand`, `PokerCommand`, `FIOWeatherCommand` (a forecast command), `MathCommand`, and `src/gui/Console.java`. Math, poker and weather in G2 appear to be second-generation ports of these (same command names; not verified line by line).
- **BotTools (Java, `lib/src/main/java/BotTools`) is the first library extraction** and already contains `Command`, `SubCommand`, `Responder`, `GuildDataParser`, `GuildManager`, `Console` and the services. KB is its Kotlin conversion (commit "Converting to new Kotlin based Guild Data Parser", 2023-01-01).
- **GKB (2023-03-25 to 2023-05-09)** is the multiplatform/Compose line that became G2; its commit "Help Message changes and Math Command" (2023-04-04) introduced `brief`/`details` and the math plugin.
- **Two lines diverged and neither contains the other:** KB kept running behaviour and slf4j; G2 kept the cleaner command model and Compose. This is why section 5's per-part "better copy" column splits.

## 5. Inventory

Columns: **Live/dead** gives the evidence; **Better** names the stronger copy where both repositories hold one; **Fate** is port onto the new model, fold into a plugin, replace with a new system, drop, or later feature; **Dest.** is the artifact or MagicBot.

### 5.1 Command model (`commands/`, `Option`, DSL)

| Part | What it does | Live/dead | Defects | Better | Fate | Dest. |
|---|---|---|---|---|---|---|
| `Command` (KB, G2) | Mutable singleton command: name, slash data, option list, reply/embed helpers, parse-then-dispatch | live both (`Bot.commands`; G2 beans) | Per-invocation fields; `reply` `complete()`; `invoke(CommandContainer)` missing `else` (KB); `init` calls open members; `enFable` (G2) | G2 (`else`, `brief`/`details` as data); KB (slf4j) | Port the surface (tree, properties, helpers) onto immutable definitions + `CommandContext`; code replaced | bottools-core |
| `SubCommand` | Nests commands to three levels and emits slash subcommand/group data | live both | `getParent` no base case (reached from `addOption` at nest level 3); delegates state to parent via `by parent::…` | tie (G2 delegates two more fields, same flaw) | Port the nesting rule as validated tree depth; code replaced | bottools-core |
| `OrganizationCommand` + `orgData` | Alias layer: re-routes `get city` to `getcity` | live both | `!!` on unknown alias; direct children only; builds slash subcommand data a second time | G2 (`and`/`becomes` DSL, `plus(name)` reuses the node) | Port as the alias DSL onto an immutable alias table | bottools-core |
| `PropertyCommand`, `TargetablePropertyCommand` | Registers `get<name>`/`set<name>` backed by a `KMutableProperty<String?>`, optional target-user option | live both (Dota channel/id; welcome message) | Reflection `call`; string-only; G2 `value!!`; G2 `DataAccessCommand` shares `path` | G2 (custom getter/setter names, brief/details) | Port as typed property get/set over a setting/accessor; code replaced | bottools-core |
| `MethodCommand` | Inline handler `(Array<String>) -> Unit` as a sub-command | live both | untyped args; `Consumer` | G2 (`Command.MethodCommand(name, brief, fn)` helper) | Port as `suspend (CommandContext) -> Unit` leaf | bottools-core |
| `Option` (+ G2 `Command.Option(...)`, `my`) | Option factory by type name | live both | String type name; four types; unknown → STRING | G2 (retains `required`, helper with defaults) | Port the helper functions as typed option builders | bottools-core |
| `MessageInteractionCommand` | Message context-menu command | plumbing; no subclass either repo | name-only; `Commands.message(name)` | tie | Port as context-menu node (user and message) | bottools-core |
| `HelpCommand` | `/help [command]` from `Bot.commands` | KB live partial; G2 dead (empty `Bot.commands`, bean commented) | KB null `messageEvent` on slash; G2 reads empty map | KB | Replace with generated help from the tree | bottools-core |
| `CommandFactory` (G2) | Spring context, prototype lookup, event cast | live G2 | static `lateinit event`; cast; unconditional defer; unknown name throws | n/a | Replace with the plugin registry | nowhere |
| `DataAccessCommand`, `admin` (G2) | Admin `access`/`modify` on any XML path | dead (bean commented out) | shared `path`; arbitrary path write; no permission check | n/a | Replace with typed get/set over registered guild settings, administrator-only | bottools-plugins (admin) |
| `ChannelReservingCommand`, `main/SingleChannelListener` | Reserve a channel for one command | dead (no subclass) | `reserved[guild]!!`; one reservation per guild; re-parse | tie | Later feature | nowhere |
| `GameStatsCommand` | Account-link and game sub-commands: `setid`, `getid`, `lastgame`, `showstats`, channel, patch-notes channel; owns tracker services | live (via test `DotaCommand`) | G2 `targetGameNode` uses `member`; `showStats` stub; scraper base; `lastMatchID` unused | KB (target resolved; `SCSetID` tagline handling); G2 adds the patch-notes channel | Replace with the stats framework's link/profile/last-match/subscription commands; names kept as typed aliases | bottools-stats (framework), MagicBot (Dota 2 commands, aliases) |

### 5.2 Runtime, events and wiring (`main/`, `plugins/Plugins`, Spring)

| Part | What it does | Live/dead | Defects | Better | Fate | Dest. |
|---|---|---|---|---|---|---|
| `Bot` (KB) | Reads `key.txt`, builds JDA, starts console/daily thread, registers commands | live | all intents, `MemberCachePolicy.ALL`, nullable static `jda`, `printStackTrace`, fixed-sleep daily thread | KB (runs headless) | Replace with the bot runtime/builder | bottools-core |
| `Bot` (G2) | Same, with Compose state | live in tests | companion init order, UI state in core, `commands` unfilled, `applyDailyUpdate` uncalled | G2 registers commands with `queue()` | Replace | bottools-core |
| `BotListener` | JDA listener forwarding nine event kinds to `Responder`; KB also default role, join DB creation, folder rename | live both | KB filters on trigger; default-role `!!`; G2 adds Button but no filter | tie | Replace with the typed event registry; default-role and join behaviour move to the reaction-roles plugin | bottools-core, bottools-plugins |
| `Responder.java`, `EventAction`, `ResponderInfixExtensions` | Classpath-scans JDA event classes, per-class action list | live both | scan at start; null on unmapped class; G2 busy-wait thread and reflective `on` | G2 (Button support) | Replace with a typed event registry | bottools-core |
| `Parser` (+ `CommandContainer`) | Global-trigger parse of messages and slash events | live KB; typed dead G2 | see 3.2 | tie | Replace with the typed parser and prefix policy | bottools-core |
| `plugins/Plugins` | KB: `Plugin` fun interface, one plugin; G2: name registry + `Plugin(fn)` | live both | KB loads a source-tree path; G2 plugin gets `Bot.Companion` receiver | G2 (named registry, plugin returns commands) | Replace with the plugin API | bottools-core (API) |
| Spring wiring (`internals.xml`, `plugins.xml`, test `commands.xml`, `spring-context`) | Prototype beans, `activeplugins` list, DTD from a local Windows path | live G2; KB uses `spring-context` for the scan only | local DTD path; `active=false` beans duplicate `Plugins` | n/a | Drop | nowhere |
| `Console` (KB) | stdin operator console | live KB | unassigned lateinit fields; blocking scanner thread | n/a | Later feature (stdin console) | nowhere |
| `Bot.CentralProcess` + `applyDailyUpdate` | Daily hook | live KB; declared G2 | fixed sleep; unstoppable | n/a | Later feature (daily-update hook) | nowhere |
| `GuildManager` (KB) | Points, rank-up, doge embed | dead (never instantiated) | `managePoints` casts a `String` to `Double`; rank-up `TODO` | n/a | Later feature (points/promotions); doge dropped | nowhere |
| `manager/Manager.kt`, `ViewModel.kt`, `MyLogger.kt` (G2) | Compose window, status, mirrored log | live in tests | UI in core; logger mirrors into UI; unbounded list | n/a | Drop (desktop manager is an unscheduled last phase) | nowhere |

### 5.3 Storage (`dataprocessing/`, data files)

| Part | What it does | Live/dead | Defects | Better | Fate | Dest. |
|---|---|---|---|---|---|---|
| `BaseXMLReader`, `XMLReader` | DOM wrapper with a current node and write-through | live both | not thread-safe; whole-file writes; swallowed `SAXException` (KB) | G2 (`Result` on remove, `FileNotFoundException`, `writeItemsList`) | Replace with SQLite | bottools-data-sqlite |
| `KotGDP`, `D`, `B`, `DataAccessPoint` | Path-style `D/guild/member/"Games"/game - "id"` | live both | names as keys; shared reader state; `defaultRole` seeded as a name; G2 registers listeners in `init` | G2 (`Database` interface with `Result`) | The `Database` idea becomes the storage ports; the `/` path style is not carried | bottools-core (ports), bottools-data-sqlite |
| `Database.kt` (G2) | `Database`, `MemberAccessPoint`, `DatabaseAccessPoint` interfaces | live G2 | XML-shaped; `Result<Unit>` only on creation | G2 only | Replace with snowflake-keyed ports | bottools-core |
| `GuildDataParser` (KB, whole file in `/* */`) | Old XML API: points, playlists, duplicates, requests, money, DST, game ids | dead (commented out) | n/a | n/a | Drop; the schema informs the legacy importer | MagicBot importer (reads only links and settings) |
| `Date`, `DateTimeParser` | Date compare/parse | dead (no caller) | inverted month limits | tie | Drop | nowhere |
| `SourceKeyParser`, `WebParseKeys.xml` | Key lists for HTML cutting | live both (Dota) | main function; keys with no consumer | tie | Replace with typed JSON providers | nowhere |

### 5.4 Online access and services

| Part | What it does | Live/dead | Defects | Better | Fate | Dest. |
|---|---|---|---|---|---|---|
| `OnlineCommand` | Page string cutter, cookie capture, `connect` | live (Dota) | scraping, cookie storage, anti-bot header | G2 stores cookies through `DatabaseAccessPoint`; neither survives | Replace | bottools-stats (providers) |
| `botactions/online/Connector`, `OnlineAction`, `STest` | URL reader, image download, JSON get, scratch `main` | live (Dota) / `STest` dead | single-connection spin lock; `Unirest` timeouts 0 | G2 delegates `Connector` to the WebTools library | Drop (replaced by HTTP client port) | nowhere |
| `services/CheckValueService`, `ServiceCommand`, `UserBasedService`, `UserGameService`, `RssService`, `ServicePacketReader` | Polling loops that detect a changed scraped value and call back | live (tests) | per-service raw threads; per-member polling; `ServicePacketReader` state in `services/…xml` | G2 (`ServiceCommand` dedupes created services) | Replace with tracker/feed jobs | bottools-stats; MagicBot (schedule/budget) |
| `services/game services/dota2/*.xml` | Per-service URL, key and last value | live (tests) | state stored in the config file | tie | Drop | nowhere |
| `botactions/BotAction.kt` | `say`, `tts`, `sendFileInChannel`, reaction add, G2 channel/category/thread creation, `JDA.update` | live both | `complete()` everywhere; `Bot say … in channel` DSL | G2 (more helpers, `Result<Category>`) | Absorb: sending moves into the context's reply surface; `createChannel` helpers only if poker returns | bottools-core |

### 5.5 Plugins

| Part | What it does | Live/dead | Defects | Better | Fate | Dest. |
|---|---|---|---|---|---|---|
| `reactionroles` (`AddReactionRole`, `CreateMainWelcomeMessage`, `ReactionRoleActions`, `ReactionRoles.xml`) | Emote→role mapping, welcome message with reactions, default role on join | live both | see 3.2: any-message grant, `guild.banner`, G2 broken message record, template path | KB (message record) + G2 (`onReactionAdd` guard) | Fold into the reaction-roles plugin, with default role and welcome message | bottools-plugins |
| `MathCommand` (G2) | Infix expression evaluator with functions | live G2 | see 3.2 | G2 only | Fold into math plugin (behaviour, not code) | bottools-plugins |
| `WeatherCommand`, `Util.kt` (G2) | Zip/city → coordinates | live stub | see 3.2 | G2 only | Replace with weather plugin and geocoder | bottools-plugins |
| `poker/*` (G2) | Table, seats, blind prompts, buttons | live skeleton | see 3.2 | G2 only | Not ported; own phase after 1.0.0 | bottools-plugins (later) |
| `Plugins.SpamControl`, `isSpam` | Repeat-message detector | dead | result ignored; not active | n/a | Later feature | nowhere |

### 5.6 Tests, resources, build files, README

| Part | What it holds | Fate | Dest. |
|---|---|---|---|
| KB `src/test/kotlin/TestBot.kt`, `DotaCommand.kt` | Runnable demo bot; Dota 2 command (scrape-based, item-image montage in `res/`) | Drop as tests; MagicBot's Dota command is written new against OpenDota | MagicBot (replacement) |
| G2 `jvmTest/.../Test.kt`, `TestBot.kt`, `DotaCommand.kt`, `PalOfExile.kt`, resources `commands.xml`, `PoE*.xml`, `screenshot.png` | Token-file print "test", Compose entry, Dota, PoE price screenshots | Drop; no assertions exist, so no test is carried | nowhere |
| KB `src/main/resources/ReactionRoles.xml`, G2 copy | Default `welcomeMessages`/`reactionRoles` nodes | Replace with plugin defaults in storage | bottools-plugins |
| `logback.xml` (identical in both, a Spring-Boot-style rolling appender) | Console + file appender in the library | Moves to test/application scope only | MagicBot, test |
| G2 `internals.xml`, `plugins.xml` | Spring beans | Drop | nowhere |
| `res/zip codes.txt` (G2, 4.3 MB), `res/*.png` (KB, generated Dota images) | Geocoding table; scratch output of the match montage | Drop | nowhere |
| `build.gradle.kts` (KB) | Single module; Kotlin 2.1.10; `jvmToolchain(23)`; `application`; `jcenter()`, a `D:/…` local repository; `logback-classic` as `implementation`; `kotlin-reflect:1.7.21`; unused `api` deps | Replace with convention-plugin multi-module build | build |
| `build.gradle.kts`, `gradle.properties`, `settings.gradle.kts`, `pom.xml`, `.idea/*` (G2) | Kotlin 1.7.20 multiplatform, Compose 1.2.2, JDK 11, `LATEST` dynamic versions, project name `Test`, empty Maven stub, IDE files tracked | Drop | nowhere |
| `README.md` (KB) | Feature tour of the 7.5 API; documents `key.txt` in the tree; "No license specified"; Java 23 | Rewrite for 1.0.0 (Apache-2.0, plugin API, MagicBot pointer) | docs |
| G2 | No README | Archive pointer only | nowhere |
| `key.txt` (KB, tracked), `BotData.xml`, `WebParseKeys.xml` (both, tracked), `guildData/` (6 folders, 5 with member files; both histories), `services/**.xml` | Credential file; cookie cache and last-daily-update marker; scraping keys; per-guild XML data; polling state | Leave the tree and the history; `guildData/` is the importer's input and is read from a copy outside the repositories | history hygiene; MagicBot importer |
| `.gitattributes` (KB) | `* text=auto` | Keep | build |

## 6. Pitfalls & regrets

- **Porting `PropertyCommand` as written would carry the string-reflection trap.** The `get<name>`/`set<name>` pair is the valuable behaviour; the `KMutableProperty<String?>` plumbing is what makes `admin` and the Dota settings untyped.
- **The "better copy" differs per file, so a file-level merge is wrong.** G2's `OrganizationCommand` has the DSL, KB's `GameStatsCommand` has the correct target, and each repository's reaction-roles half is the other's bug. Take behaviours deliberately.
- **Do not trust a feature because the code exists.** Points, playlists, duplicates and requests are in a commented-out class; the G2 `admin` is a disabled bean; typed commands are dead in G2; `showstats` prints a debug line.
- **The importer's inputs are names.** Guild folders are named by guild name and members by an alphanumeric-stripped user name, so some entries cannot be resolved to ids once names changed or collide; the importer has to report unresolved entries rather than guess.
- **Defaults that look like data.** Every guild file was seeded with `defaultRole = online` and `welcomeMessage = hello`, so those two values in legacy files are defaults, not choices; importing them as settings would set a role lookup that cannot succeed.
- **Hidden global threads.** KB starts the console, the daily thread and the polling threads from constructors and companion initialisers; there is no stop path for them (`Bot.stop` shuts JDA down and interrupts only the console).
- **A token-printing test.** G2 `Test.testRead` prints the content of the key file; anything copied from G2 tests must not carry it.

## 7. Recommendation for this repo

- **Take the surface from both, the code from neither.** Reimplement the command tree, alias DSL, property get/set, inline handlers and `Option` helpers on immutable definitions. Use G2's spelling of the alias DSL and brief/details-as-data, and KB's logging and target resolution. This is the verdict for every part of section 5.1.
- **Carry behaviours, not classes, into plugins.** Reaction roles combine KB's message record with G2's "is this a welcome message" guard and add the missing permission checks; math and weather are rewritten against their specification; admin becomes typed settings. Poker is rebuilt in its own phase, with G2's table/seat/button flow as the only reusable idea.
- **Keep Dota 2 in MagicBot, the framework in `bottools-stats`.** The `setid`/`getid`/`lastgame`/`showstats` names are typed aliases onto the framework's link and match commands; `showstats` needs a new implementation because none exists. The auto-post loop and patch notes become tracker and feed jobs.
- **Delete the rest.** The XML layer, Spring files, Compose manager, `MyLogger`, scraping classes, `Date`/`DateTimeParser`, `GuildDataParser`, the zip-code file and the generated images carry no behaviour that the replacements lack.
- **List the six later features** in the roadmap's "Post-roadmap potential features" using the lines in 3.3. I reject keeping `Console` or the daily thread as hidden extras of the runtime: both start unconditionally from constructors and have no stop path, which conflicts with a library that a consumer starts and stops.

### GKB2 open issues #2–#5

| # | Title | What it asks | Obsolete after the consolidation? |
|---|---|---|---|
| 2 | SingleChannelListener not up to date with Spring Framework | Re-look at how `SingleChannelListener` fires commands on message events (single sentence; one linked commit, "GUI update #2") | Yes. Channel reservation leaves the roadmap and the typed path becomes one dispatcher. |
| 3 | Services not up to date with Sping Framework rework | Check that every service still works after `CheckValueService` lost its abstract `invoke()`; a comment says only `ServiceCommand` was tested | Yes. The service family is replaced by tracker and feed jobs over JSON providers. |
| 4 | Bot Companion cleanup | Remove the legacy command-creation path from `Bot`'s companion; a later comment says only the timekeeping "Central Method" clutter remains | Yes. The companion and Compose state are replaced by the runtime; the daily hook is a potential later feature. |
| 5 | Help Message briefs and details can be beans | Make help text Spring beans; "requires total project commitment" | Yes in its Spring form. Its intent, help text as data separate from the handler, is carried by `brief`/`details` on definitions. |

## 8. Load-bearing claims

The recommendation rests on repository facts (not listed here). The only outside-world claims are the GKB2 issue texts.

1. GKB2 issue #2 exists, is open, and concerns `SingleChannelListener`. Quote: "The way that single channel listener fires commands when detecting message received events needs to be relooked at." — https://github.com/SpartanLaboratories/GKB2/issues/2 — read 2026-10-20 (opened 2023-08-17; the page lists a commit "GUI update #2", hash feeebb6). The quote is as returned by the fetch tool's summary of the page.
2. GKB2 issue #5 is open and concerns help text. Quote: "So far only a test can in help command exists as proof of concept. Requires total project commitment for this change." — https://github.com/SpartanLaboratories/GKB2/issues/5 — read 2026-10-20.
3. GKB2 issue #3 is open and titled "Services not up to date with Sping Framework rework"; it asks for services to be re-checked after they stopped depending on an abstract `invoke()` in `CheckValueService`, and a comment dated 2023-09-02 says only `ServiceCommand` was tested. — https://github.com/SpartanLaboratories/GKB2/issues/3 — read 2026-10-20. The fetch tool returned a paraphrase, not a verbatim body, so this claim is **paraphrase only**; the title is verbatim.
4. GKB2 issue #4 is open and titled "Bot Companion cleanup"; comments dated 2023-08-25 and 2023-09-02 say the legacy command-creation method was removed and only "Timekeeping/Central Method" clutter remains. — https://github.com/SpartanLaboratories/GKB2/issues/4 — read 2026-10-20. **Paraphrase only**, as for claim 3.

## 9. Gaps

- **Nothing was compiled or run.** "Live" is read from callers and wiring; G2 in particular may not compile in its current state (Kotlin 1.7.20, `LATEST` dependencies on WebTools and GeneralTools that are not on disk). The G2 verdicts "broken/dead" are therefore source-level.
- **G2's external dependencies were not read:** `com.spartanlabs:WebTools` (`Connector`, `Skrapie`, `WebViewer`) and `com.spartanlabs:GeneralTools` (`read`, `time`, `evaluateList`, `forEveryIndexed`, `capitalizeEveryWord`, `cropImage`, `to`). Their behaviour is assumed from call sites. KB declares `GeneralTools:1.2.0c` as `api` but imports nothing from it.
- **Issues #3 and #4 bodies are paraphrases** (section 8, claims 3–4); their verbatim text was not obtainable through the fetch tool. The titles and obsolescence verdicts do not depend on the exact wording.
- **Legacy data semantics.** I classified values by shape only (name-like text versus numeric ids) and did not open member values. Whether the seeded `defaultRole` in the older guild files was ever edited to a real name is unknown; the structure is that defaults are non-numeric text.
- **History contents beyond file paths were not inspected.** `git log --all --name-only` shows `key.txt` (KB and, under that name and `keys.txt`, G2), `guildData/` (both), `BotData.xml` and `WebParseKeys.xml` in history; whether any blob contains a live credential is outside this question.
- **`/home/user/support` and `/home/user/trumpbot` beyond file lists were not inventoried** (TrumpBot was read for lineage only; whether `Support` is bot-related is not answered here).
- **The Dota 2 `showstats` target** (what profile fields it should show) is not defined by any existing code; the data-source findings decide it.
- **Reachability:** every source named for this question answered (the local repositories, `github.com/SpartanLaboratories/GKB2/issues/2` to `/5`). No source was unreachable.
