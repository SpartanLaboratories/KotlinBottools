=== YOUR QUESTION (Question 5 of the research plan) ===

How should the bot runtime in bottools-core dispatch Discord events, install plugins, run scheduled jobs, read configuration and prepare for sharding?

Findings file (write exactly here): %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/research/bot-runtime-design.md

What your answer informs (use it to aim; keep it out of the file): the runtime architecture of bottools-core. That covers:
- the event registry;
- the plugin lifecycle;
- the job scheduler;
- configuration;
- how gateway intents and member caching are derived;
- the shard abstraction;
- error isolation;
- startup and shutdown ordering.

Options to compare:
1. Event dispatch:
   - one JDA listener feeding a typed registry on the bot's coroutine scope;
   - jda-ktx's CoroutineEventManager;
   - event flows (SharedFlow per event type);
   - how each isolates a failing handler and avoids blocking JDA's threads.
2. Plugins: installation in code by the application, ServiceLoader discovery, or plugins named in configuration. Plus per-guild enable/disable consulted at dispatch time, and a plugin's declared needs (intents, settings, jobs, commands).
3. Scheduled jobs:
   - coroutine loops with jitter and state persisted through storage ports, versus a scheduling library (for example Quartz, krontab, cron-utils);
   - misfires after downtime, restarts, backoff on failures;
   - a job that must run once per bot rather than once per shard (the match tracker posts each match once).
4. Configuration:
   - environment variables plus an optional file, read through a configuration library (Hoplite; Lightbend/Typesafe Config; kotlinx-serialization with TOML, YAML or HOCON), versus plain properties;
   - how secrets (the bot token, provider keys) are supplied without touching the repository;
   - validation errors at startup as Result.
5. Sharding:
   - JDA's ShardManager (DefaultShardManagerBuilder) from the start, versus a single JDA behind an abstraction that can switch;
   - how command registration, events and jobs behave across shards in one process;
   - how gateway intents, MemberCachePolicy, ChunkingFilter and cache flags derive from installed features' declared needs. Today's code requests every intent and caches every member; a public bot must not.
6. Lifecycle:
   - startup order (configuration -> storage -> plugins -> login -> command registration -> jobs);
   - graceful shutdown (drain handlers, stop jobs, close storage);
   - lifecycle status and events. These stay internal or Experimental; no management seam is promised.

Requirements specific to your question:
- A plugin adds commands, event handlers, jobs and settings without touching core.
- Gateway intents are the union of what installed features declare.
- Jobs survive handler failures and restarts, with their state persisted through the storage ports.
- MagicBot is a public bot: sharding-ready configuration, and a tracker call budget that scales with its audience.
- The token comes from the environment or a file outside the repository.
- slf4j logging with named lifecycle events.
- No UI.

Today's code, for grounding (cite by symbol):
- KotlinBottools: bottools.main.Bot (static initialisation, key.txt, EnumSet.allOf(GatewayIntent), MemberCachePolicy.ALL, CentralProcess daily loop), BotListener, Responder.java (classpath scan of JDA event classes), EventAction, ResponderInfixExtensions, SingleChannelListener, bottools.services.* (CheckValueService and subclasses on raw threads).
- GKB2: the same, plus CommandFactory (Spring ClassPathXmlApplicationContext), plugins/Plugins.kt, Plugin, and resources plugins.xml / internals.xml.

Sources:
- JDA docs, wiki and source at a pinned release (discord-jda/JDA): ShardManager, DefaultShardManagerBuilder, IEventManager, GatewayIntent, MemberCachePolicy, ChunkingFilter, CacheFlag.
- jda-ktx's CoroutineEventManager (MinnDevelopment/jda-ktx).
- Comparable frameworks' extension and plugin systems: Kord Extensions' extensions; BotCommands' services; Red-DiscordBot's cogs; discord.py's extensions and cogs.
- kotlinx.coroutines documentation on supervision, exception handling and cancellation.
- Maven Central metadata and docs for any scheduling or configuration library you consider.

Lenses:
- Best systems: runtime architectures of mature bot frameworks at scale.
- Conventions: what bot developers expect from plugins and configuration.
- Idiomatic Kotlin: structured concurrency, Flow, DSLs for installation. Question 4 covers the public API style in depth, so stay on runtime mechanics.
