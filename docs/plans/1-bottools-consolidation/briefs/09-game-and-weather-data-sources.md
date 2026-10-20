=== YOUR QUESTION (Question 9 of the research plan) ===

What public data sources exist for Marvel Rivals, Path of Exile 2, No More Room in Hell and weather, and what does each allow a free public Discord bot to do?

Findings file (write exactly here): /home/user/KotlinBottools/docs/plans/1-bottools-consolidation/research/game-and-weather-data-sources.md

What your answer informs (use it to aim; keep it out of the file):
- whether each later game can have a provider at all;
- which capabilities each provider can honestly offer: profile, match history, match detail, ladder/rank, economy, achievements/playtime;
- the shape the generic provider model must accommodate;
- the weather plugin's data source and geocoder.

This is a survey: establish what exists and its terms. Each game's own phase researches its provider in depth later.

Options to compare:
1. Marvel Rivals:
   - any official API from NetEase or Marvel;
   - community APIs (for example marvelrivalsapi.com and similar): keys, limits, documentation, stability;
   - Tracker Network's API (application required?).
   Say plainly if no documented API exists.
2. Path of Exile 2:
   - Grinding Gear Games' official developer API: OAuth, the scopes for characters, profile and ladders, which endpoints cover PoE 2 versus PoE 1, and the application/registration process;
   - poe.ninja's economy data for PoE 2: documented API or not, and its terms.
   Today's GKB2 test command PalOfExile (src/jvmTest/kotlin/com/spartanlabs/bot/commands/PalOfExile.kt) scrapes PoE 1 currency data. Read it only to see what it wanted.
3. No More Room in Hell (Steam app 224260):
   - the Steam Web API's ISteamUserStats (GetUserStatsForGame, GetPlayerAchievements, GetSchemaForGame);
   - IPlayerService (owned games, playtime);
   - whether the game publishes any per-player stats, or only achievements and playtime;
   - the key requirements and limits.
4. Weather, free with no key:
   - Open-Meteo: forecast and geocoding APIs, terms for non-commercial and free bots, attribution, limits;
   - MET Norway's api.met.no: terms, required User-Agent identification, attribution;
   - any other credible free, no-key service.
   Also: a geocoder that turns a city name or postal code into coordinates, replacing today's 4 MB local "res/zip codes.txt" in GKB2.

For each source, establish:
- which capabilities it can honestly support;
- authentication and keys;
- rate limits;
- terms for a free public bot (attribution, commercial-use clauses, caching, redistribution of data in Discord messages);
- whether it is official or community-run, versioned or not, and how stable it has been.

Requirements specific to your question:
- Documented JSON APIs only; no HTML scraping.
- MagicBot is a free public bot anyone can invite.
- The weather plugin gives current conditions and a short forecast.
- The provider model is open: a game whose only public data is achievements or playtime still gets a provider with the subcommands its capabilities allow.

Sources:
- Each provider's official documentation and terms pages.
- Their GitHub repositories where they exist.
- Steam Web API documentation (partner.steamgames.com or the Valve developer wiki, whichever is reachable).
- Mark every source you could not reach.

Lenses:
- Best systems: how existing multi-game stat bots structure providers.
- Conventions: attribution in embeds.
- Idiomatic Kotlin: light.
