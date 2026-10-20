=== YOUR QUESTION (Question 1 of the research plan) ===

What does the Discord platform require of a public bot that is reached by slash commands, context menus and typed messages, and what limits does it put on commands, intents, sharding and data handling?

Findings file (write exactly here): /home/user/KotlinBottools/docs/plans/1-bottools-consolidation/research/discord-platform-rules.md

What your answer informs (use it to aim; keep it out of the file):
- the limits the library's command model must enforce when it turns a command tree into slash registrations;
- which gateway intents each feature needs, and how the typed fallback can work without the privileged message-content intent;
- what MagicBot owes Discord as a public bot;
- when and how the runtime must shard.

Options to compare:
- Typed fallback: approval for the privileged MESSAGE_CONTENT intent, versus a prefix fallback limited to @-mentions of the bot (and direct messages) that needs no privileged intent. What does a bot receive without MESSAGE_CONTENT, exactly?
- Registration: global versus per-guild commands, including the per-guild form used for a development guild. How each propagates and is limited.
- Installation: guild installation only, versus also user installation ("user-installable apps"): integration types, interaction contexts, and what is missing from an interaction in each case (no guild, no member).
- Gateway: a single session versus sharding from the start. When sharding becomes mandatory, how the shard count is chosen, session-start limits.

Must cover:
1. Application-command limits:
   - name rules (pattern, length, case) and description lengths;
   - options per command, option types, required-before-optional ordering, choices and autocomplete;
   - depth: command -> subcommand group -> subcommand;
   - maximum numbers of global and per-guild chat-input commands, and of user and message context-menu commands;
   - default_member_permissions, contexts / integration_types, NSFW, and name/description localisation.
2. Interaction responses:
   - the deadline for the initial acknowledgement and the deferral types;
   - the lifetime of the interaction token for follow-ups and edits;
   - ephemeral messages;
   - component interactions (buttons, select menus, modals): their timing, and whether components still work after a restart.
3. Gateway intents:
   - which intents are privileged;
   - which features need which intent. Map these concrete features:
     - reading typed commands;
     - giving a default role on member join (member-join events);
     - resolving members by name for a one-off legacy import (member lists, chunking);
     - reaction-role assignment (reaction events);
     - posting into guild channels;
   - what is delivered without MESSAGE_CONTENT (mentions of the bot, DMs, the bot's own messages, interactions).
4. Approval and verification:
   - the CURRENT thresholds and process for privileged-intent access and for bot verification;
   - whether access is renewed periodically;
   - what verification asks for.
   Some secondary sources say the threshold moved from 100 servers to a count of unique users who can see the app. Establish the current rule and its date from Discord's own text, and do not repeat secondary sources as fact.
5. Policies for a public bot:
   - from Discord's Developer Terms of Service and Developer Policy: privacy-policy and terms URLs, data minimisation, retention, deleting a user's data on request, storing message content, and caching Discord data;
   - anything the app's profile in the developer portal must carry.
6. Rate limits that matter when one process posts match results into many channels:
   - global and per-route limits, and how JDA queues and handles them;
   - whether there is an invalid-request penalty.
7. Sharding:
   - the guild count at which it is required, and the recommended shard count from the gateway;
   - max_concurrency and session start limits;
   - what JDA's ShardManager handles for you;
   - how one process should treat work that must happen once per bot rather than once per shard.

Sources:
- Discord's developer documentation. If discord.com or docs.discord.com is unreachable, use the discord/discord-api-docs repository on GitHub at a pinned commit (raw files).
- Discord's Developer Terms of Service and Developer Policy, if reachable. If not, say so in Gaps.
- Discord support articles (support-dev.discord.com) through search, if reachable.
- JDA's documentation, wiki and source (discord-jda/JDA on GitHub) for intents, cache flags, chunking and ShardManager.

Lenses:
- How mature public bots and frameworks meet these obligations (for example auto-deferral, mention prefixes, data-deletion commands).
- What conventions consumers expect.
- Idiomatic Kotlin is light here; skip it if it does not bear.
