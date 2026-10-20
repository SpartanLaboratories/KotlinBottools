=== YOUR QUESTION (Question 3 of the research plan) ===

How do established Discord bot frameworks give one command both a slash and a typed form, and what should this library's command model take from them?

Findings file (write exactly here): %PROJECTS%/KotlinBottools/docs/plans/1-bottools-consolidation/research/command-framework-prior-art.md

What your answer informs (use it to aim; keep it out of the file): the command model of bottools-core. That covers:
- how the command tree is represented;
- how it maps to Discord's slash structure;
- the grammar of the typed fallback and how typed arguments map to declared options;
- how aliases map to canonical paths;
- the per-invocation context abstraction;
- the acknowledgement/deferral policy;
- permission checks;
- error presentation;
- generated help;
- component interactions;
- how handlers are tested without Discord.

Frameworks to compare (pin each to a release and say which). Add or swap one if it is clearly more relevant:
- discord.py: commands.hybrid_command / HybridGroup (one definition, slash plus prefix).
- Sapphire Framework (discord.js): a Command class with messageRun and chatInputRun, plus its Args parser.
- Kord Extensions (Kotlin, on Kord): chat commands and slash commands, and its argument converters.
- BotCommands (freya022, Kotlin, on JDA): text commands and application commands, and its declaration styles.
- JDA-Chewtils (fork of jda-utilities): CommandClient with prefix commands plus SlashCommand.
- DIH4JDA.

For each framework, establish:
1. Definitions:
   - the types that define a command and its options;
   - whether definitions are immutable and shared across invocations;
   - annotations versus builders versus class hierarchies.
2. One definition, two forms: how a single definition yields both a slash registration and a typed parser, and what the typed form can do that the slash form cannot (and the reverse).
3. Typed-argument grammar:
   - positional versus named arguments;
   - quoting;
   - greedy or "rest" strings;
   - mention resolution for users, channels and roles;
   - type coercion and its errors.
4. Aliases: typed-only, or also registered as slash commands? Deeper typed paths versus Discord's command -> group -> subcommand limit.
5. The invocation context handlers receive:
   - how it unifies reply, defer, edit and follow-up across slash, typed and context-menu invocations;
   - how it exposes the guild, member, channel and target member.
6. Automatic deferral within Discord's acknowledgement deadline.
7. Preconditions and permission checks, and per-guild enable/disable.
8. Error handling and user-facing error messages.
9. Generated help (sources of text, brief versus detailed descriptions).
10. Component (button, select, modal) handlers: routing by custom id, state, persistence across restarts.
11. How handlers and commands are tested without a Discord connection.

The kept surface to land your recommendation on: read today's command types.
- KotlinBottools, src/main/kotlin/bottools/commands/:
  - Command
  - SubCommand
  - OrganizationCommand
  - MethodCommand
  - PropertyCommand / TargetablePropertyCommand
  - Option
  - GameStatsCommand
  - HelpCommand
  - MessageInteractionCommand
  - and bottools.main.Parser
- GKB2's newer copies, src/jvmMain/kotlin/com/spartanlabs/bottools/commands/:
  - brief/details;
  - the lambda MethodCommand;
  - OrganizationCommand's `and … becomes`;
  - PropertyCommand's `with getters`;
  - DataAccessCommand;
  - InteractionHook use.
- Note today's defects as evidence of what the rebuild must avoid. Cite them by symbol:
  - per-instance invocation state shared across concurrent users (KotlinBottools' Bot.commands holds singletons whose fields are the current invocation's guild, member, channel, args and embed builder);
  - Command.invoke(CommandContainer) in KotlinBottools runs a subcommand and then the parent;
  - SubCommand.getParent recursion;
  - GKB2's CommandFactory casting every event to GenericCommandInteractionEvent and holding it in a static field.

Requirements specific to your question:
- One immutable definition per command serves concurrent invocations.
- The typed fallback (default prefix `!`, per guild; possibly limited to @-mentions on a public bot, which Question 1 covers) reaches the same handler as the slash form.
- Context-menu commands are supported.
- Help is generated from the tree.
- The old Dota 2 names (setid, getid, lastgame, showstats) live on as typed aliases of new canonical paths.
- Discord's command limits apply. Question 1's findings file, discord-platform-rules.md in the same folder, may already exist; use it if so.

Sources:
- Each framework's docs and source on GitHub at a pinned release (raw files or shallow clone).
- discord.py's docs on hybrid commands.
- Sapphire's guide.

Lenses:
- Best systems: what the strongest frameworks got right, and what they regret (look at issues and migration guides).
- Conventions: what JDA/Kotlin bot authors expect.
- Idiomatic Kotlin: only where the frameworks' Kotlin APIs illuminate the model. Question 4 covers the public API's Kotlin idioms in depth, so do not duplicate it.
