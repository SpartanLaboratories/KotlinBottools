=== YOUR QUESTION (Question 8 of the research plan) ===

What can OpenDota and Steam provide for Dota 2 account links, profiles, match history, match detail and patch notes, and at what call budget for a public bot?

Findings file (write exactly here): /home/user/KotlinBottools/docs/plans/1-bottools-consolidation/research/dota2-data-sources.md

What your answer informs (use it to aim; keep it out of the file):
- the Dota 2 provider: endpoints, models and account resolution;
- the match tracker's polling and budget model;
- the patch-notes source;
- the shape of the generic provider interface, as far as Dota 2 shapes it.

Options to compare:
1. OpenDota endpoints:
   - player profile;
   - recent matches;
   - match list with parameters;
   - match detail;
   - heroes and items constants;
   - parse requests.
   OpenDota is the provider. STRATZ's API is a comparison point only: what it would add or cost.
2. Account resolution:
   - accepting a Steam64 id, a 32-bit account id or a profile URL. Give the conversion between Steam64 and the account id;
   - versus also resolving vanity names through the Steam Web API's ISteamUser/ResolveVanityURL, which needs a Steam Web API key. Cover that key's terms and limits for a public bot.
3. Patch notes:
   - Steam's ISteamNews/GetNewsForApp (appid 570);
   - versus Dota 2's own patch-notes data feed, if documented;
   - versus SteamDB's patch-notes RSS (today's code uses https://steamdb.info/api/PatchnotesRSS/?appid=570; establish its terms).
   Only documented, permitted sources qualify; no HTML scraping.
4. Images:
   - hero and item icon URLs from Valve's CDN as OpenDota's constants (odota/dotaconstants) reference them;
   - today's item line is composited from downloaded icons into a temp file shared between requests.

Must cover:
- Rate limits for anonymous use and with an API key (per minute and per day), the current price of a key, and how limits are signalled (headers, 429).
- OpenDota's terms of use for a public bot: attribution, caching, commercial use.
- How fresh "recent matches" are after a match ends, which fields need a parsed match (lane, laning outcome, item timings), how parse requests work and what they cost.
- A calls-per-tracked-account model for automatic match posts. Example:
  - one recent-matches call per account per interval, plus one match-detail call per new match;
  - what interval keeps N tracked accounts within the anonymous and the keyed limits;
  - how prioritisation (recently active accounts first) changes it.
- What data today's last-match post uses, and whether OpenDota's JSON covers each field: K/D/A, last hits/denies, GPM/XPM, net worth, hero/tower damage, healing, lane and role, lane outcome, talents chosen, the item line, radiant/dire score, duration, outcome.
  Read KotlinBottools' test-source DotaCommand.showLastGameStats and GKB2's src/jvmTest/kotlin/com/spartanlabs/bot/commands/DotaCommand.kt.

Sources:
- OpenDota's documentation (docs.opendota.com) and site (www.opendota.com, api.opendota.com).
- If those are unreachable, use odota/core on GitHub at a pinned commit: its API specification (OpenAPI spec and route definitions) and its rate-limit configuration (config defaults for free and keyed limits).
- odota/dotaconstants.
- Steam Web API documentation: partner.steamgames.com/doc/webapi and developer.valvesoftware.com/wiki/Steam_Web_API, whichever is reachable.
- STRATZ's API documentation (api.stratz.com / stratz.com).
- Mark every limit or term you could not read at its source as unverified, naming the host. This question's budget model depends on those numbers.

Lenses:
- Best systems: how existing Dota 2 Discord bots and trackers poll without being throttled.
- Conventions: provider attribution in embeds.
- Idiomatic Kotlin: typed models for JSON, and capability flags versus optional methods for what a provider can do. Light.
