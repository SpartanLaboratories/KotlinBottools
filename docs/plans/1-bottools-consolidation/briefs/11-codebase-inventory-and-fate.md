=== YOUR QUESTION (Question 11 of the research plan) ===

What does each part of KotlinBottools and GKB2 do today, which copy is better where both have one, and where does each part go in the new library or MagicBot?

Findings file (write exactly here): /home/user/KotlinBottools/docs/plans/1-bottools-consolidation/research/codebase-inventory-and-fate.md

What your answer informs (use it to aim; keep it out of the file):
- the adoption verdicts and blast radius of the consolidation;
- which systems own each surviving behaviour;
- the list of features that leave the roadmap (to be listed as potential later features).

This is a codebase question. Your main evidence is the two codebases, read-only, plus git history. External research is limited to whatever you need to judge a defect.

Codebases:
- /home/user/KotlinBottools: src/main/kotlin/bottools/**, src/test/kotlin/** (TestBot, DotaCommand), src/main/resources/**, the build files, README.md.
  The untracked docs/ folder holds a superseded draft. Ignore it; do not cite it.
- /home/user/GKB2: src/jvmMain/**, src/jvmTest/**, resources (internals.xml, plugins.xml, commands.xml, ReactionRoles.xml, logback.xml), build files, pom.xml.
- Lineage only: /home/user/spartanlaboratories/gkb and /home/user/spartanlaboratories/bottools.
- GKB2's open issues #2–#5: read them on github.com (https://github.com/SpartanLaboratories/GKB2/issues/2 and so on) through WebFetch, if reachable.

Produce:
1. An inventory table covering every type or top-level file in both repositories (group trivially related files). Columns:
   - what it does;
   - whether it is live or dead, with evidence: its callers or the absence of them;
   - the defects that matter, cited by symbol;
   - where both repositories hold a copy, which copy is better and why;
   - its fate: port onto the new model, fold into a plugin, replace with a new system, drop, or list as a potential later feature;
   - its destination: bottools-core, bottools-data-sqlite, bottools-stats, bottools-plugins, MagicBot, or nowhere.
2. The live features both repositories actually provide today, as a list. Examples:
   - slash, typed and context-menu commands;
   - help;
   - default role on member join;
   - guild data creation on join;
   - welcome message and reaction roles;
   - Dota 2 id set/get, last game, and automatic match posts;
   - patch notes;
   - math;
   - the weather stub;
   - the poker skeleton;
   - the admin data access;
   - the Compose manager;
   - the stdin console;
   - the daily-update hook.
3. For each feature that leaves the roadmap, one line on what it did today:
   - activity points and promotion ranks;
   - playlists and channel duplication;
   - channel-reserving conversations;
   - spam control;
   - the stdin console;
   - the daily-update hook;
   - any other dead code you find.
4. Resources, tests, build files and the README: what each holds and its fate.
5. GKB2's open issues #2–#5: what each asks, and whether the consolidation makes it obsolete.

Requirements specific to your question:
- The kept surface (command tree, alias DSL, property get/set commands, inline handlers, Option helpers) is rebuilt on the new model.
- Replaced by new systems: HTML scraping (OnlineCommand, Connector, OnlineAction, STest, SourceKeyParser, WebParseKeys.xml, cookie capture), the XML storage layer, Spring wiring, the classpath-scanning Responder, and the Compose manager.
- Not carried into the roadmap, but listed as potential later features: activity points and promotion ranks, playlists and channel duplication, channel-reserving conversations, spam control, the stdin console, the daily-update hook.
- Plugins at 1.0.0: reaction roles (with default role on join and welcome message), math, weather, admin. Poker comes later.
- MagicBot carries the Dota 2 command and the legacy importer.

Known facts you may use, re-checked against the code before you rely on them:
- KotlinBottools' Command.invoke(CommandContainer) runs a subcommand and then the parent (a missing else).
- SubCommand.getParent recurses without end for steps <= 1.
- Every KotlinBottools Command singleton in Bot.commands holds the current invocation's guild, member, channel, args and embed builder as fields.
- GKB2's CommandFactory.getCommand casts every event to GenericCommandInteractionEvent and keeps it in a static lateinit var. Its Spring beans are prototype-scoped.
- GKB2's GameStatsCommand.targetGameNode uses member instead of the target member.
- GKB2's HelpCommand reads Bot.commands, which GKB2 never fills.
- GKB2's Command spells the enable subcommand "enFable".
- In KotlinBottools, GuildManager is never instantiated, and GuildDataParser has no callers.
- ChannelReservingCommand has no subclass in either repository.
- Spam control is never enabled, and its result is ignored.
- src/main/kotlin/Main.kt holds one infix function and does not reference DotaCommand.

Lenses: mainly lens 2, the conventions these repositories follow and should keep. Lenses 1 and 3 only where they decide a verdict.

Never copy member names, guild names or ids out of the data files into your findings file. Refer to data files by path and structure only.
