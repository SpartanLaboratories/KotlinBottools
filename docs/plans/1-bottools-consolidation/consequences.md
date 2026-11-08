# BotTools consolidation and MagicBot — consequences

## Header / Association

- **Covers:** [SpartanLaboratories/KotlinBottools#1](https://github.com/SpartanLaboratories/KotlinBottools/issues/1),
  *"BotTools consolidation & MagicBot (tracking)"*.
- **What this document is:** the fallout of the work: what is adopted, what it touches, and what
  is left to do outside the phases. It is written before implementation starts, and brought up
  to date beside the as-built record once implementation ends.
- **Related:**
  - [`architecture.md`](architecture.md): §10 gives the verdict for every existing part, and
    §11 covers the history rewrite;
  - [`roadmap.md`](roadmap.md): the phases;
  - [`research/README.md`](research/README.md): the evidence.

---

## 1. Adoption

Both codebases are superseded as a whole. No class carries over into the new modules.

- **What carries over:** the command surface, which is rebuilt, and the plugins' behaviour, which
  is re-implemented.
- **What does not:** everything that holds state on singletons. That state is the cause of
  today's concurrency defects (architecture §2.1).
- **Where the full verdicts are:** architecture §10 gives a verdict for every part. It agrees
  with [`research/codebase-inventory-and-fate.md`](research/codebase-inventory-and-fate.md) §5.

| Existing part (KotlinBottools and GKB2) | Verdict | What replaces it lands in |
|---|---|---|
| `Command`, `SubCommand`, `OrganizationCommand` and the alias DSL, `PropertyCommand`, `TargetablePropertyCommand`, `MethodCommand`, `Option`, `MessageInteractionCommand` | rebuilt on immutable definitions with a per-invocation context | Phase 3 |
| `HelpCommand`, `CommandFactory` | replaced by generated help and the plugin host | Phases 3 and 5 |
| `DataAccessCommand` and GKB2's `admin` | replaced by the admin plugin | Phase 10 |
| `GameStatsCommand` | replaced by `GameCommands`; the old names become aliases | Phase 7; MagicBot Phase 14 |
| `Bot`, `BotListener`, `Responder.java`, `EventAction`, `ResponderInfixExtensions`, `Parser`, `plugins/Plugins` | replaced by the runtime, the event registry, the typed parser and the plugin contract | Phases 3 and 5 |
| `botactions/BotAction.kt` | its sending carried into the reply surface and the `ChannelMessenger` | Phases 3 and 5 |
| Spring wiring (`internals.xml`, `plugins.xml`, `commands.xml`, `spring-context`) | deleted | — |
| `BaseXMLReader`, `XMLReader`, `KotGDP`, `D`/`B`, GKB2's `Database.kt` | replaced by the snowflake-keyed storage ports and the SQLite implementation | Phases 2 and 4 |
| `GuildDataParser`, which is commented out | deleted; its schema informs the importer | MagicBot Phase 15 |
| `OnlineCommand`, `Connector`, `OnlineAction`, `STest`, `SourceKeyParser`, `WebParseKeys.xml` | replaced by typed providers over JSON, through `bottools-http`'s call surface with WebTools' stack behind it | Phases 6a, 6b and 7 |
| `CheckValueService`, `ServiceCommand`, `UserBasedService`, `UserGameService`, `ServicePacketReader` | replaced by `MatchTracker` and `NewsJob` on the job runner | Phases 5 and 7 |
| `RssService`, which nothing calls | deleted; the feeds plugin is new | Phase 12 |
| The reaction-roles, math and weather plugins | behaviour carried over and re-implemented | Phases 8, 9 and 11 |
| GKB2's `plugins/poker` | the table, seat and button flow carried over as the idea | Phase 19 |
| GKB2's `manager/*`, `ViewModel.kt`, `MyLogger.kt` and Compose | deleted; there is no UI | — |
| Secrets and data files (`key.txt`, `BotData.xml`, `WebParseKeys.xml`, `guildData/`, `services/**.xml`, `res/`) | removed from the tree and from history | Phase 0 |
| The old tests (`TestBot.kt`, `DotaCommand.kt`, `PalOfExile.kt` and their resources) | deleted; MagicBot's Dota 2 is written new | MagicBot Phase 14 |
| The build files | replaced by the convention-plugin build | Phase 1 |
| The Gradle wrapper | kept, and upgraded to Gradle 9.7.1 | Phase 1 |
| `.gitignore` | rewritten, root-anchored | Phase 0 |
| KotlinBottools' `README.md` | a stub, then rewritten for `1.0.0` | Phases 1 and 17 |

The old code leaves `main` no later than the phase that replaces it. Its history, and the
archived GKB2, keep it for reference.

- **Post-roadmap potential features.** These leave the roadmap and are listed in roadmap §7:
  - activity points and promotion ranks;
  - playlists and channel duplication;
  - channel-reserving conversations;
  - spam control;
  - the stdin console;
  - the daily-update hook.
- **Adoption across the organisation.**
  - GKB2's `Connector` delegated to `webtools-scraping`'s `Connector`. The library does not
    consume that class; on WebTools' side, #55's stack supersedes it.
  - No other repository uses the superseded mechanisms (§2.2).

---

## 2. Blast radius

### 2.1 The six repositories and their history

- **Phase 0 rewrites six histories:** KotlinBottools, GKB2, GKB, BotTools, TrumpBot and Support.
- **Hashes change, and clones are replaced.**
  - Every commit hash in the five bot repositories changes, because each root commit holds a
    purged path.
  - So documents cite code by symbol and commits by subject.
  - The planning branch is rewritten with `main`, and the planning pull request is opened from
    it afterwards.
  - Every existing clone is deleted and cloned again, never pulled. That includes the
    maintainer's working copies of KotlinBottools and TrumpBot.
- **No forks.** None of the six repositories has a fork (checked 2026-10-20).
  - So the force-push reaches every copy GitHub hosts, with two exceptions, both left to GitHub
    Support (architecture §11):
    - the pull-request refs: GKB2 #6, and BotTools #2 and #3;
    - cached views of rewritten commits.
- **Visibility.**
  - **Today:** GKB2, GKB and BotTools are public; KotlinBottools, TrumpBot and Support are
    private.
  - **KotlinBottools** becomes public at the end of Phase 0.
  - **The other five** are archived in Phase 17, after their open issues are closed. An archived
    repository is read-only.
- **The open issues being closed.**
  - **GKB2 #2 to #5** are obsolete
    ([`research/codebase-inventory-and-fate.md`](research/codebase-inventory-and-fate.md) §7).
  - **BotTools #1** asks for event-data getters and setters. The typed event registry replaces
    them.
  - **TrumpBot #1** reports that Dota 2's automatic reports do not work. MagicBot's tracker
    replaces them.

> **Dated note, 2026-11-07** ([`2-phase-0-history-rewrite/consequences.md`](2-phase-0-history-rewrite/consequences.md) §2).
>
> - KotlinBottools is not force-pushed in place. Its rewritten history becomes a fresh public
>   repository under the same name, with every number reproduced, and the pre-rewrite repository
>   stays private and archived as `KotlinBottools-legacy`.
> - No Support ticket is filed. GKB2's and BotTools' pull-request refs and every cached view stay,
>   and the residual is measured and reported.
> - KotlinBottools' main working copy is realigned in place rather than cloned again; the TrumpBot
>   clone is cloned again.

### 2.2 Consumers

- **Nobody outside the bot repositories uses either codebase.**
  - Neither KotlinBottools nor GKB2 has ever published to Maven Central. There is no
    `bottools*`, `KotlinBottools` or `GKB2` metadata under `io.github.spartanlaboratories`.
  - No repository in `SpartanLaboratories` or `SpartanLabsGaming` references either codebase,
    apart from the bot repositories themselves (GitHub code search).
  - Both checks were made on 2026-10-20.
- **So the move breaks no consumer.** That covers ending the `7.x` line without a release, the
  new coordinates (`io.github.spartanlaboratories:bottools-*`, six artifacts) and the new
  packages (`com.spartanlabs.bottools.*`).
- **MagicBot is the first consumer.**
  - It codes against `bottools` only.
  - WebTools reaches it only as part of the library's runtime. A change inside WebTools can
    break `bottools-http`'s adapter, but never MagicBot's code.

### 2.3 Other repositories in the organisation

- **WebTools.**
  - **How the library uses it:**
    - an `implementation` dependency of `bottools-http` only;
    - pinned exactly with `strictly`;
    - built from a sibling checkout until it releases.
  - **What gates `1.0.0`:**
    - #55, the stack;
    - #47, its Java 23 bytecode;
    - #58, its CI, contributing guide, changelog, tags and foojay resolver.
  - **CI:**
    - the library's CI is the first CI to build WebTools' code;
    - a scheduled drift build tracks WebTools' `master`.
- **`SpartanLaboratories/.github`.**
  - Its `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` and `SECURITY.md` are the baseline for both
    KotlinBottools and MagicBot.
  - Its versioning rule, with the "Lettered versions in dependency graphs" section, is what the
    library's `strictly` pins follow.
  - On versioning, each repository's own guide only follows that rule.
- **MyGameTools.**
  - Unchanged. Its `build-logic`, workflows, stability markers and `CONTRIBUTING.md` are the
    pattern.
  - One difference stays on record: its published-library convention sets coordinates but not
    `group` and `version`. A composite consumer of MyGameTools would need both (architecture
    §10.7). No change is made there.
- **GeneralTools.**
  - KotlinBottools' `GeneralTools:1.2.0c` dependency has no importer and is dropped.
  - Nothing in the new library consumes GeneralTools.
- **SpartanUI and SpartanGraphics.**
  - Phase 23 waits for them. Today both hold documents only.
  - No management seam is promised before then.
- **SpartanLaboratories/MagicBot.**
  - New, and public from creation.
  - It has its own tracking issue and its own `docs/plans/`.

### 2.4 Outside GitHub

- **Maven Central.**
  - The `bottools-*` artifact ids under `io.github.spartanlaboratories` are new.
  - Snapshots need "Enable SNAPSHOTs" on the namespace, and a republish at least every 90 days.
  - Releases are published by hand, and signed.
- **Discord.**
  - **Applications:** a new MagicBot application, and a development application for live checks.
  - **`GUILD_MEMBERS`:** a Portal toggle below 10,000 users.
  - **App Verification:** required before 100 servers, including the identity check of the
    Developer Team's owner.
  - **The legacy servers:** MagicBot is invited to them before the import.
- **Data providers** that MagicBot's privacy policy names:
  - OpenDota, used keyless at 3,000 calls a day, or with a key;
  - Steam's news API;
  - Open-Meteo, on its non-commercial free tier;
  - Zippopotam;
  - poe.ninja;
  - the Marvel Rivals community API;
  - the hosts of the feeds administrators subscribe to.
- **Personal data in the legacy copies.**
  - The copies are kept access-restricted and are read once, by the import.
  - The older copies are deleted once the import report has been checked.
  > **Dated note, 2026-11-07.** The copies sit in an ordinary local folder under the user
  > profile, `%USERPROFILE%\BotLegacyData`, not in an access-restricted location.

### 2.5 Documentation

- **KotlinBottools.**
  - **The README:** a stub in Phase 1, and the `1.0.0` description in Phase 17. It is kept
    current with every phase that changes the external shape.
  - **`CONTRIBUTING.md`:** commit scopes, module layout, build and test commands, and publishing.
    On versioning it follows the organisation standard.
  - **`CHANGELOG.md`:** in the Keep a Changelog format.
  - **Dokka,** on Pages.
  - **The boundary-ring documents** in `docs/` (architecture §9):
    - the registration payload;
    - the `custom_id` scheme;
    - the storage schema;
    - the provider wire contracts.
- **MagicBot.**
  - A README, `CONTRIBUTING.md` and `CHANGELOG.md`.
  - The privacy policy and terms, on its GitHub Pages.
- **The archived repositories:** a README pointer to `bottools` in each.
- **Issue #1** differs from the design in three places:
  - its settled requirements list five artifacts; the design has six (`bottools-http`);
  - its stage list has ten phases;
  - its cross-initiative section puts MagicBot's bootstrap in Phase 0.

  All three are brought in line when the sub-issues are filed.

---

## 3. Follow-ups

### 3.1 For the maintainer

1. **Once the roadmap is approved, file and create, together:**
   - the library's 18 sub-issues under #1;
   - `SpartanLaboratories/MagicBot`. It is public. Either it has no commits until Phase 13, or
     its first commit carries `.gitleaks.toml`, with secret scanning on from the start
     (architecture §7.7);
   - MagicBot's tracking issue and its seven issues.

   At the same time, edit #1: its artifact list, its stage list and its cross-initiative
   section.
2. **WebTools, before Phase 17:**
   - #55 delivered;
   - #47 fixed, for a JVM target of 21 or lower;
   - #58's practices in place;
   - a tagged release of the stack that meets the conditions recorded on #55.
3. **The Central Portal:**
   - turn on "Enable SNAPSHOTs" for `io.github.spartanlaboratories` before the first snapshot, at
     the end of Phase 1;
   - republish snapshots at least every 90 days.
4. **Phase 0's owner actions:**
   - the access-restricted location for the legacy data copies;
   - the force-pushes;
   - the GitHub Support tickets;
   - KotlinBottools' change to public.
   > **Dated note, 2026-11-07.** There is no access-restricted location and there are no Support
   > tickets: the data goes to an ordinary local folder, and the force-pushes, the repository swap
   > and the visibility change are carried out by #2's sub-issues ([`2-phase-0-history-rewrite/architecture.md`](2-phase-0-history-rewrite/architecture.md) §15). What
   > remains for the maintainer is listed in [`2-phase-0-history-rewrite/consequences.md`](2-phase-0-history-rewrite/consequences.md) §6.
5. **Discord:**
   - the development application;
   - MagicBot's new application, under a Developer Team whose owner completes App
     Verification's identity check before MagicBot passes 100 servers.
6. **MagicBot's contact e-mail address,** for the report route, needed by Phase 16.
7. **Hosting for MagicBot:**
   - the host itself;
   - encryption at rest;
   - a written service-provider agreement;
   - the country the privacy policy names.
8. **Optional keys:**
   - an OpenDota key, if the keyless budget is too small;
   - a Steam Web API key, for vanity names and for Phase 22.
9. **Architecture §17 C1, the published test fixtures.** It is decided after `1.0.0`, and
   Phase 18 waits for it.

### 3.2 Recorded for later phases

- **Phase 20** opens by reading the Marvel Rivals API's pricing and terms.
- **Graduations:** `EconomyCapability` graduates after Phase 21, and `AchievementsCapability`
  after Phase 22, each in the library's next feature release.
- **Poker:** MagicBot installs the plugin after Phase 19.
- **Level 5 (UAT)** is deferred to a separate, later plan.
- **Closed surfaces:** reopening a surface that shipped closed is weighed per surface, and batched
  into the next major release.
