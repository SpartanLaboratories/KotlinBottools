# Discord platform rules for a public bot (slash, context menu, typed)

- **For:** SpartanLaboratories/KotlinBottools#1
- **Date read:** 2026-10-20
- **Applies to:**
  - Discord developer documentation: `discord/discord-api-docs` @ `fd75e22e8c327f60c3ceaa366878c8b223043142` (2026-10-19), directory `developers/`. The change log in it runs to 2026-10-14. This is the source of the rendered docs.discord.com site. The privileged-intent guides, the Create DM text and the error-code list were also read at docs.discord.com on 2026-10-20.
  - Developer Terms of Service and Developer Policy: the current texts, both effective 2024-07-08 (last updated 2024-06-06), read at support-dev.discord.com on 2026-10-20. `docs.discord.com/developers/policies/developer-terms-of-service` and `.../developer-policy` redirect there. The 2022-10-01 versions (`discord/discord-api-docs` @ `e5cd463cd1412df2e55fce8ecb81e7d1ed5755b0`) are superseded.
  - App Verification, privileged-intent access and Stripe identity-check articles: support-dev.discord.com Help Centre, read 2026-10-20. The Developer Portal's App Verification checklist is behind a sign-in and was not read.
  - JDA: source read at tag `v6.7.0` (`7c900019ca511a994087320ce98d19cd79a2c4b0`, 2026-09-20, latest on Maven Central). The repository pins 5.6.1; every JDA symbol cited below also exists at tag `v5.6.1`.
  - discord.py: tag `v2.7.1` (`dfd1144b2246a7adafe3f1c64a4dd9bc2187fcee`), as a comparison.
  - Kord Extensions: tag `v2.6.0` (`f86bef8eedc9db7f2f62aa56ce0a3bb62a86437d`, 2026-08-26), source at `https://codeberg.org/Kord-Extensions/kord-extensions`, read 2026-10-20, as a comparison for acknowledgement behaviour.

Doc links below are GitHub blob links at the pinned commit. `D` = `https://github.com/discord/discord-api-docs/blob/fd75e22e8c327f60c3ceaa366878c8b223043142/developers`. `TOS` = `https://support-dev.discord.com/hc/en-us/articles/8562894815383-Discord-Developer-Terms-of-Service`; `POL` = `https://support-dev.discord.com/hc/en-us/articles/8563934450327-Discord-Developer-Policy`; `HC` = `https://support-dev.discord.com/hc/en-us/articles`.

## 1. Question

What does the Discord platform require of a public bot reached by slash commands, context menus and typed messages, and what limits does it impose on commands, intents, sharding and data handling? The answer must meet these facts about the work:

- Slash commands are primary; typed messages with a prefix are a fallback reaching the same handlers; context-menu commands are supported.
- The command tree, alias DSL and option helpers are rebuilt as immutable definitions, so the library must turn a tree into valid Discord registrations itself.
- The library runs on JDA with JDK 21 and Kotlin 2.2.
- The public application (MagicBot) carries privacy-policy and terms pages, a delete-my-data command, sharding-ready configuration and a tracker call budget that scales with its audience.
- MagicBot holds the privileged `GUILD_MEMBERS` intent, for the default role and the welcome message on member join, and does not hold `MESSAGE_CONTENT`. Its typed form is reached by @-mention in servers (`@MagicBot setid 123`) and by the prefix in DMs (`!setid 123`). The library keeps the bare prefix in servers as a configuration switch for other bots; that mode needs `MESSAGE_CONTENT`.
- A typed command cannot reply ephemerally, so a reply marked private goes to the invoker by DM, with a short public note that a DM was sent. If the user's DMs are closed, the public reply holds nothing personal and points to the slash command.
- Backups are short-lived. The privacy policy states the retention window within which deleted data leaves backups. No erasure log is kept.
- Where MagicBot is hosted is not decided. Encryption at rest is a requirement on whatever host is chosen.
- MagicBot installs every plugin the library ships: reaction roles (with the default role on member join and the welcome message), math, weather, admin, and a general RSS/Atom feeds plugin through which server administrators subscribe a channel to any feed URL.
- MagicBot's privacy policy and terms name the third parties whose data it uses (OpenDota, Valve and Steam, Open-Meteo, and later game-data providers).

## 2. Bottom line

- **Nothing in the current Developer Terms of Service or Developer Policy (both effective 2024-07-08) makes a listed requirement impossible.** Two obligations bear on MagicBot's scope:
  - App Verification: Discord's Help Centre article still says "Verification is required for your app to scale past 100 servers", and its one named requirement is an identity check of the Developer Team owner through Stripe. That gate arrives long before the 10,000-user intent gate and falls on the person who owns the team.
  - The open feeds plugin: the Terms make the operator "solely responsible" for the application's content and the Policy forbids distributing adult content to under-18s or without age-restricted labels. A plugin that posts whatever an arbitrary feed URL returns needs a user-report path (a Policy duty), admin-only subscription and a way to remove a feed.
- **A `!` prefix cannot reach the handlers in guild channels without the privileged `MESSAGE_CONTENT` intent.**
  - Without it, `content` arrives empty in guild messages, except for messages that mention the bot, DMs to the bot, the bot's own messages and replies to the bot's messages. Interactions are unaffected.
  - Below 10,000 unique users the intent is a Developer Portal toggle with no review. Above that it needs a reviewed application, renewed every year, and Discord's own guidance steers text commands to slash commands.
  - The library should therefore make "mention or DM" the always-on typed mode (`@Bot setid 123`, and `!setid 123` in DMs). Treat the bare prefix in guilds as an opt-in mode that requires the intent and a deployment that holds it.
- **Command limits the library must enforce when registering** (all current, Discord docs):
  - Names: regex `^[-_ʼ\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$`, lowercase where a lowercase variant exists. Descriptions are 1-100 characters.
  - At most 25 options, or 25 subcommands/groups, per level. Required options precede optional ones.
  - At most 25 choices, and a choice option cannot also be `autocomplete`.
  - Nesting is command, then group, then subcommand, and no deeper. A command with subcommands is not itself invocable, and options cannot be mixed with subcommands.
  - At most 100 slash, 15 user and 15 message commands, global and per guild each.
  - At most 8,000 characters of combined name, description and value text per slash command (only the longest localisation per field counts).
  - At most 200 command creates per day per guild.
  - JDA's builders check names, lengths, 25-item counts, ordering and the 100/15/15 counts, but not the 8,000-character total and not Discord's exact name regex. The library validates these itself.
- **Interactions:** acknowledge within 3 seconds (otherwise the token is invalidated); the token then lives 15 minutes for edits and follow-ups. A deferral fixes ephemerality, so decide it at acknowledgement time. Components keep arriving after a restart because they are delivered as ordinary interactions, so handlers must be keyed by `custom_id` (1-100 characters) and hold no in-memory state.
- **Intents by feature:**
  - Slash, context-menu, component and modal interactions need none.
  - Mention/DM typed commands need `GUILD_MESSAGES` and `DIRECT_MESSAGES`, both standard.
  - Reaction roles need `GUILD_MESSAGE_REACTIONS`, which is standard. The event carries `member`, and the role change is a REST call.
  - Posting to channels needs no intent, only channel permissions.
  - Default role and welcome message on join need the privileged `GUILD_MEMBERS`.
  - The one-off legacy name-to-id import does not need `GUILD_MEMBERS`: a prefix member search (max 100 per query) works without it.
  - The repository's current `EnumSet.allOf(GatewayIntent)` plus `MemberCachePolicy.ALL` requests all three privileged intents and should go.
- **Approval, current rule (Discord's own text):**
  - Since 2026-06-10 the review threshold is 10,000 unique users who can see the app, not 100 servers.
  - Below it the three privileged intents are portal toggles, and you may enable only what you need.
  - At or above it the app has 90 days from notification to apply; access already granted must be re-applied for annually.
  - App Verification and the intent review are now separate processes. Discord's current Help Centre article still describes verification as required to scale past 100 servers (article text last edited 2024-08-30, before the split). Its checklist is inside the Developer Portal and was not read; the one named requirement is the Developer Team owner's identity check through Stripe, repeated every three years.
  - No separate "Message Content Intent Review Policy" article exists in the Help Centre. The review criteria are in the two docs.discord.com privileged-intent guides, and some pages still carry the superseded 100-server wording for intents (see Findings 3.4).
- **Public-bot obligations (Terms and Policy effective 2024-07-08, read at their own host):**
  - Maintain a privacy policy that complies with privacy law and states what is collected, how it is used and shared with Discord and third parties, and how to request deletion. Link it in the Developer Portal and make it easily accessible from the app.
  - Share API Data with third parties only through a written-agreement Service Provider, where the law requires it, or when the user expressly directs it.
  - Give users an easy way to have their data modified and deleted, and delete it promptly when it is no longer needed for the stated function, when the user or Discord asks, or when the app stops. The text sets no number of days and no backup exemption.
  - Encrypt data at rest, keep tokens encrypted, never embed credentials in an open-source project, and notify Discord of security incidents.
  - Do not contact users on Discord without explicit permission or send DMs unrelated to the app's functionality; Discord's docs say "DMs should generally be initiated by a user action". A DM sent in reply to the user's own command fits that wording (my reading; the text does not address it).
  - Do not use message content to train machine-learning or AI models without Discord's permission.
  - Provide users a way to report issues and act on reports.
  - The application object carries `privacy_policy_url` and `terms_of_service_url`; only the privacy-policy link is required by the Terms' text.
- **Rate limits and sharding:**
  - The documented global limit is 50 REST requests per second per bot; per-route limits come from response headers and must not be hard-coded. Interaction endpoints are exempt from the global limit.
  - 401/403/429 responses (429 with `X-RateLimit-Scope: shared` excepted) count toward an IP ban at 10,000 per 10 minutes, so a feed that keeps posting to channels it can no longer see is a ban risk.
  - Sharding is mandatory at 2,500 guilds. Each shard holds at most 2,500 guilds. The shard count comes from `GET /gateway/bot`, and JDA's `ShardManager` fetches it when `shardsTotal` is `-1`.
  - Identify is limited to 1,000 per 24 hours across all shards, and exceeding it resets the bot token.
  - Run jobs that must happen once per bot (command registration, trackers, import) at bot level, never in a per-shard handler.

## 3. Findings

Evidence tiers: **Consensus** = Discord's own current documentation, terms or spec (the platform is the authority, and the library behaves the same way); **Practice** = what mature libraries visibly do; **Opinion** = one source's view; **Unverified** = source unreachable.

### 3.1 Application commands

| Rule | Value | Tier / source |
|---|---|---|
| Chat-input command and option name | regex above, 1-32 chars, lowercase variant required; user and message commands may be mixed case with spaces | Consensus. `D/interactions/application-commands.mdx`, "Application Command Naming" |
| Command and option description | 1-100 chars for chat-input; empty for user/message commands (not allowed on create) | Consensus. same file, "Application Command Structure", "User Commands" |
| Options per command / per subcommand | max 25; `options` only on chat-input | Consensus. same file |
| Required before optional | required options must come first | Consensus. same file, "Application Command Option Structure" |
| Choices | max 25, name 1-100, string value up to 100; choices are the only valid values; `autocomplete` not allowed with `choices`; autocomplete result max 25 choices | Consensus. same file; `D/interactions/receiving-and-responding.mdx` "Autocomplete" |
| String length bounds | `min_length` 0-6000, `max_length` 1-6000 | Consensus. same file |
| Option types | subcommand, group, string, integer (±2^53-1), boolean, user, channel, role, mentionable, number, attachment | Consensus. same file |
| Depth | command, group, subcommand; nothing deeper; base command unusable once it has subcommands/groups; in the picker, subcommands currently appear at the top level | Consensus. same file, "Subcommands and Subcommand Groups" |
| Counts | 100 global slash, 15 global user, 15 global message; the same per guild; 1 global primary entry point (Activities only) | Consensus. same file, "Registering a Command" |
| Size | 8,000 chars combined name/description/value over command, options, subcommands, groups and choices | Consensus. same file, "Slash Commands" |
| Create budget | 200 command creates per day per guild; bulk overwrite counts only commands that do not already exist | Consensus. same file; "Bulk Overwrite Global Application Commands" |
| Uniqueness | per application, per type, per scope; a global and a guild command may share a name | Consensus. same file |
| `default_member_permissions` | permission bit set as a string; `"0"` = nobody but admins; guild admins can still change per-command permissions in the client | Consensus. same file, "Permissions" |
| `nsfw` | age-restricted; apps with Discovery enabled may not contain any age-restricted command | Consensus. same file, "Age-Restricted Commands" |
| `integration_types` / `contexts` | global commands only; contexts `GUILD`(0), `BOT_DM`(1), `PRIVATE_CHANNEL`(2); new apps support guild install only | Consensus. same file "Contexts"; `D/resources/application.mdx` "Installation Context" |
| Localisation | `name_localizations` / `description_localizations` for commands, options, subcommands and choice names; same restrictions as the base value; interaction payloads keep the default names; the default value should be included under its own locale (en-US falls back to en-GB) | Consensus. same file, "Localization" |
| Propagation | guild commands update "instantly"; global commands have "read-repair" (a stale version is rejected and reloaded). No numeric global delay is documented | Consensus. same file, "Making a Guild Command", "Making a Global Command" |

Registration is HTTP only (`PUT` bulk overwrite per scope, or per-command `POST`/`PATCH`). A command needs the `applications.commands` scope, which the `bot` scope includes.

**Typed fallback and these limits.** Every alias in the DSL (`get and "city" becomes "getcity"`) that is also published as a slash command is one more top-level command and counts toward 100 and 8,000 characters. Names with capitals or punctuation outside the regex cannot be slash names, so `!`-only aliases must stay typed-only.

### 3.2 Interactions and responses (Consensus; `D/interactions/receiving-and-responding.mdx`)

- Initial response within **3 seconds**, else the token is invalidated. Tokens are valid **15 minutes** for original-response edits, follow-ups and deletes.
- Deferral types: `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` (5; the user sees a loading state) for commands; `DEFERRED_UPDATE_MESSAGE` (6; no loading state) for components. For type 5 the only valid message flag is `EPHEMERAL`.
- `EPHEMERAL` (`1 << 6`) makes the message visible only to the invoker. A follow-up sent directly after a type-5 deferral edits the loading message instead of creating a new one.
- Modals are an acknowledgement type (9), allowed in response to commands and components but not to modal submissions; the modal `custom_id` is 1-100 chars and the title at most 45; a modal holds 1-5 components.
- Component interactions arrive like any other interaction, with a fresh token. `custom_id` is 1-100 characters and is described as usable "to maintain state or pass through other important data" (`D/components/reference.mdx`).
- Interaction responses are not bound by the bot's global REST limit, and interaction webhooks share normal webhook limits.
- **Restarts (inference from the above):** nothing in the documentation expires a component on bot restart. Discord keeps the message and its components. After a restart a click still reaches the gateway as a new interaction. Only handlers registered in memory (for example, awaiting a specific message) are lost. The tier is Consensus for the delivery model and my inference for "survives restart".
- `member` is present when invoked in a guild and `user` when invoked in a DM; `guild_id`, `channel_id`, `app_permissions`, `locale` and `guild_locale` are provided, and `authorizing_integration_owners` plus `context` say how the app was authorised.

### 3.3 Installation: guild only versus user-installable (Consensus)

- Guild install needs `MANAGE_GUILD` from the installer and gives the bot a presence in the guild. A user-installed app is "visible *only* to the authorizing user" across their servers, DMs and group DMs, and is bound by the user's permissions where it is used (`D/resources/application.mdx`, "Installation Context").
- For a user-installed interaction, `authorizing_integration_owners` carries the user id under `USER_INSTALL` (`"1"`), and the guild-install key is absent unless the app is also installed there. The command must list `USER_INSTALL` in `integration_types` and the surface in `contexts` (`PRIVATE_CHANNEL` is meaningful only for user-installed commands) (`D/interactions/receiving-and-responding.mdx`).
- JDA exposes these as `IntegrationType` (`GUILD_INSTALL`, `USER_INSTALL`), `InteractionContextType` (`GUILD`, `BOT_DM`, `PRIVATE_CHANNEL`), `Interaction.getContext()` and `Interaction.getIntegrationOwners()`, and documents `getGuild()`/`getMember()` as nullable (JDA `Interaction`).
- What a handler can assume in a user-installed interaction (my inference from the "visible only to the authorizing user" model and from JDA documenting `getGuild()`/`getMember()` as nullable): no cached guild, no bot permissions in the channel, no member list, and no ability to post outside the interaction. For guilds where the bot is absent the documentation does not say whether `member` is populated. This is a gap.
- MagicBot's guild-scoped subscriptions and channel posting require the bot in the guild, so guild install is the product mode. User install remains an opt-in per command (global account link and profile commands are the candidates).

### 3.4 Gateway intents and privileged access

**Which intents are privileged (Consensus).** Three: `GUILD_PRESENCES`, `GUILD_MEMBERS`, `MESSAGE_CONTENT` (`D/events/gateway.mdx`, "Privileged Intents"; `D/gateway/getting-started-with-privileged-intent-review.mdx`).

**Current approval rule (Consensus, Discord's own text, change log entry dated 2026-06-10; the same rule is stated in the Help Centre articles "Changes to Privileged Intent Access for Discord Apps" and "How do I get Privileged Intents for my bot?", both dated 2026-06-11).**

- Threshold: "the number of unique users who can see your app across all the servers it's in"; more than 10,000 means review. Under 10,000 the intents are portal toggles. Discord says "you may only enable what you actually need".
- Notification and window: at 10,000 with a privileged intent enabled (or an attempt to enable one) the app gets a notification and **90 days** to apply. If it does not apply, current access is removed and the app can still apply later. The app keeps working and may keep joining servers while in review.
- Renewal: granted access must be re-applied for **annually**, with advance notice and a 90-day window.
- Process: portal application per intent, with a specific use case, data handling and retention described, and evidence (screenshots or video). Discord says requests can be denied when the use case "can be accomplished through interactions or other means without privileged intents".
- Separation: "App Verification and Privileged Intent review are now separate".
- **Conflicting text still in the docs.** `D/events/gateway.mdx` "Gateway Intents" still says "For verified apps (required for apps in 100+ guilds)", and `D/resources/application.mdx` "Application Flags" still describes `GATEWAY_*` flags as applying to bots "in 100 or more servers" versus "under 100 servers". The same wording is on the rendered docs.discord.com pages (2026-10-20). The June 2026 change log and the review guide supersede these for the intents. The secondary claim ("moved from 100 servers to unique users") is confirmed by Discord's own change log and guide, as dated above.

**What is delivered without `MESSAGE_CONTENT` (Consensus).** Content-bearing fields (`content`, `embeds`, `attachments`, `components`, `poll`) are empty, with four exceptions: messages the app sends; DMs sent to the app; messages that @mention the app; and replies to the app's own (non-interaction) messages, when "ping on reply" is on. The gateway docs add one more: the message a message context-menu command is used on (`D/events/gateway.mdx`, "Message Content Intent"; `D/gateway/you-might-not-need-a-privileged-intent.mdx`). The `MESSAGE_CREATE` event still arrives (needs `GUILD_MESSAGES` or `DIRECT_MESSAGES`), so the bot sees that a message was sent, by whom and where, but not what it says.

**Feature to intent map.**

| Feature | Gateway intent | Privileged? | Other requirement |
|---|---|---|---|
| Slash, user/message context menu, buttons, selects, modals, autocomplete | none | no | `applications.commands` scope |
| Typed command via @-mention (`@Bot setid 123`) or DM | `GUILD_MESSAGES` (+ `DIRECT_MESSAGES` for DMs) | no | content delivered by the mention/DM exception; DMs and other guild-less events reach only shard 0 |
| Typed command via bare prefix in a guild (`!setid`) | `GUILD_MESSAGES` + `MESSAGE_CONTENT` | **yes** | toggle in portal and in code; review at 10,000 users |
| Default role on member join, welcome message on join | `GUILD_MEMBERS` (`GUILD_MEMBER_ADD`) | **yes** | `MANAGE_ROLES` and a bot role above the target role; `SEND_MESSAGES` for the welcome post |
| Reaction-role add/remove | `GUILD_MESSAGE_REACTIONS` (`MESSAGE_REACTION_ADD`/`REMOVE`) | no | event carries `user_id` and `member`; assigning is REST with `MANAGE_ROLES` and hierarchy; `GUILDS` keeps JDA's channel and role caches |
| One-off resolution of member names to ids (legacy import) | none for a prefix search | no | gateway "Request Guild Members" with `query` returns at most 100 members and is allowed without `GUILD_MEMBERS`; the entire-list form needs `GUILD_MEMBERS` and is limited to one request per guild per 30 seconds |
| Post into guild channels | none | no | `VIEW_CHANNEL` and `SEND_MESSAGES` (+ `EMBED_LINKS` for embeds); `GUILDS` for JDA's channel cache |
| Resolve one member by id, or search by name prefix, at run time | none | no | REST "Get Guild Member", "Search Guild Members" (limit 1-1000) |

Sources: `D/events/gateway.mdx` "List of Intents"; `D/events/gateway-events.mdx` "Request Guild Members", "Message Reaction Add"; `D/gateway/you-might-not-need-a-privileged-intent.mdx`; `D/resources/guild.mdx` "Search Guild Members".

- Discord's own review guide names the welcome-message and text-command cases as the standard reasons for `GUILD_MEMBERS` and `MESSAGE_CONTENT`, so a request for either is a normal one if a reviewed application is ever needed.
- `GUILD_MEMBERS` membership events: `GUILD_MEMBER_UPDATE` for the bot itself arrives regardless of the intent.
- The intent must be requested in code and enabled in the portal. A mismatch closes the connection with code 4014 (`DISALLOWED_INTENTS` in JDA), and an unrecognised combination with 4013.
- **Member cache without `GUILD_MEMBERS`.** JDA documents that chunking needs the privileged intent and that `ChunkingFilter.NONE` must be used when it is off. With `MemberCachePolicy.ALL` and no member events, members stay cached forever, so do not use `ALL` as a default.

### 3.5 App Verification, and what sits behind it (Consensus for the article text; the checklist itself unread)

- **Trigger.** The Help Centre article "How Do I Get My App Verified?" (`HC/23926564536471`, text last edited 2024-08-30, read 2026-10-20) says: "Verification is required for your app to scale past 100 servers." The June 2026 change separated verification from the intent review but does not restate or change the verification trigger, and the rendered gateway docs still say "required for apps in 100+ guilds". As published on 2026-10-20 every Discord text that names a verification trigger names 100 servers. What an unverified app can and cannot do at 100 servers is not described in the texts read.
- **What it asks for.**
  - The article: a checklist in the Developer Portal's "App Verification" tab, with a "Verify App" button once every item is green. "The most noteworthy requirement is that the owner of the development team which owns the app will need to verify their identity through Stripe, our identity verification provider. ... You may be asked to periodically reverify your id with stripe."
  - The bot-verification FAQ for sponsors (`HC/6275923204375`, 2024-06-10): "the bot needing verification will need to be part of a Developer Team. This is a requirement for verification", and "Any verified bot will be asked to submit a qualifying identity document and meet other criteria outlined in the developer portal." The ID-holder must be 16 or older.
  - The Stripe FAQ (`HC/6226051178775`, edited 2026-06-23): reverification "once every three years"; Discord removes the identification information "a year after the bot that it is connected with has been deleted"; access is limited to "a small number of employees who are involved in security and legal".
  - The remaining checklist items are in the portal, behind a sign-in, and were not read.
- **Also gated on verification.** Discovery (App Directory) and monetisation require "identity and application verification" (`D/discovery/enabling-discovery.mdx`, and the same page at docs.discord.com). MagicBot does not need Discovery to be installable by invite link.
- **Message Content Intent Review Policy.** No Help Centre article by that name exists: the Help Centre API lists 54 articles on 2026-10-20 and none matches. The docs' old message-content link (`HC/4404772028055`) answers HTTP 301 to "What are Privileged Intents?". The review criteria are therefore the two docs.discord.com guides: "Getting Started with Privileged Intent Review" (Path B: be specific about the use case, request only what is needed, "Explain how you handle the data responsibly") and "You Might Not Need a Privileged Intent" (the mention, DM, own-message and reply exceptions above).
- Practical consequence: verification is a separate gate that arrives at 100 servers, before the 10,000-user intent gate. The library does not depend on either; the MagicBot application owner does. The Developer Team that owns the application must exist before verification and its owner is the person whose identity is checked.

### 3.6 Policies for a public bot (Consensus; Terms and Policy effective 2024-07-08)

The Developer Terms of Service (`TOS`, "Terms") and Developer Policy (`POL`, "Policy") are binding on every application. The Policy is incorporated into the Terms.

**Privacy policy and terms pages.**
- Terms 5(a): the privacy policy must be "compliant with applicable privacy laws" (the section names GDPR, ePrivacy, UK GDPR, LGPD, CCPA and CPRA) and must "clearly, accurately, and fully" describe "what data you collect, how you use and share such data with us and third parties, and how users can request deletion of such data". "How you use data includes how you access, collect, store, retain, transmit, share, and otherwise process it." The policy may not contradict the Terms.
- Links: "publicly available, up-to-date links to your privacy policy in the Developer Portal" and "easily accessible to users from your Application".
- A terms-of-service URL is a field on the application object (`terms_of_service_url`) but the Terms do not require one. If an app has its own user terms, they "may not and will not supersede, modify, or be inconsistent with" Discord's Terms (Terms 3(b)).
- Application description: Terms 1(b) require "a clear and accurate description of your Application in its user-facing profiles" and forbid misrepresenting identity.

**Sharing with third parties (Terms 5(b)).** No sharing of API Data except with a Service Provider, where law requires it, or when "a user of your Application expressly directs you to share their API Data with the third party (and you will provide us proof thereof upon request)". A Service Provider must "first agree in writing to only access and use the APIs and API Data for you and at your direction" and must delete the data when you stop using it (Terms 12(a)). The hosting provider is a Service Provider.

**What counts as API Data.** "Any data, information, or other content you obtain through the APIs (including personal data). API Data includes your developer credentials and access tokens." (Terms 13). Discord user, guild and channel ids, member objects held in JDA's caches, and text a user types into a command option all arrive through the APIs. Data a bot did not obtain through the APIs, such as the legacy XML files' names, falls outside that definition, but the ids resolved from those names through the running bot are API Data, and Terms 5(a) still requires the privacy policy to cover everything collected. Whether a Steam account id or a location typed into a command is "API Data" is not stated; the conservative treatment is to cover it as such. (Inference from the definition.)

**Deletion, retention and update (Terms 5(b)).**
- "Promptly delete the API Data when: (a) retaining it is no longer necessary for your Application's stated ... functionality ...; (b) you stop operating your Application ...; (c) we request you delete it; (d) the applicable user requests you delete it; or (e) required by applicable laws or regulations", and "give users an easily accessible way to ask for their API Data to be modified and deleted". Laws that require retention are an exception.
- "Promptly" has no number in the text, and the text carries no backup exemption. A stated, short backup retention window in the privacy policy is therefore the operator's own commitment, not a Discord rule.
- Proof of deletion is required only for data "received in error". No deletion log is required. Discord may "periodically ... request information, certifications, and attestations relating to your access to or use of the APIs or API Data" (Terms 6), which the operator answers from its design.
- The "promptly update the API Data upon request" duty is small for a store that keeps snowflake ids and no names.
- Removing the app from a guild ends the need for that guild's data (5(b)(a), (b)); the Policy adds that the app "must respect users' ability to remove the Application from spaces (e.g., servers or channels) where it is present" (Policy 3).

**Security (Terms 5(c), 2(d), 9(a)).**
- "Commercially reasonable efforts to protect API Data", including "encryption of the data at rest" and administrative, physical and technical safeguards; "promptly notify us ... about any incidents of unauthorized access or use of any API Data"; report to users when law requires. This binds any host.
- Credentials: "keep API keys and tokens encrypted in any files or other materials accessible by third parties", and "developer credentials may not be embedded in open source projects". Both bear on a public repository and its history.
- Discord may suspend tokens "not used or accessed within at least the prior 30-day period", so a rarely run development application loses its token.
- International transfers (Terms 11): when API Data includes personal data controlled by Discord Netherlands BV and moves to a territory without a European adequacy decision, the controller-to-controller standard contractual clauses apply to the operator. This turns on where the host is.

**Caching.** The Terms set no cache lifetime. Cached Discord data is API Data, so the rule is the deletion rule above plus "Do not use API Data for any purpose outside of what is necessary to provide your stated functionality" (Policy 15). Discord's gateway docs advise caching only what the app needs (`D/events/gateway.mdx`, "Tracking State").

**Message content.** Neither document sets a rule on storing message content. The review guide asks an applicant that stores it to "describe your retention policy and security measures". Policy 21: "Do not use message content obtained through the APIs to train machine learning or AI models (including large language models) unless express permission is granted by Discord." A bot that reads only mention and DM content for command parsing and keeps nothing is outside the concern.

**Direct messages (Policy 5; Create DM documentation).**
- Policy 5: "Do not contact users on Discord without their explicit permission. This includes frequently sending unsolicited direct messages and/or sending direct messages not directly related to maintaining or improving an Application's functionality."
- Create DM: "DMs should generally be initiated by a user action. If you open a significant amount of DMs too quickly, your bot may be rate limited or blocked from opening new ones."
- A DM answering the user's own command is user-initiated and tied to the app's function; that fits both texts, though neither names the case. A user can close DMs: the API returns error 50007 "Cannot send messages to this user", and 50278 when the bot and user share no guild. The public fallback reply must therefore stand alone.
- Policy 6 also bars marketing messages unrelated to the app's function, and Policy 7 bars contacting users outside Discord using API Data.

**Other Policy rules that bear on MagicBot's plugins.**
- Policy 1-2: no modifying a user's account and no "initiat[ing] processes on a user or server's behalf without first obtaining their permission", with a clearly labelled opt-in. A default role granted on join and a welcome message are server-wide automation; they should be configured by a server administrator and off until then. (Inference from Policy 2; guild roles are not an "account" change, but the permission principle covers them.)
- Policy 10, Terms 3(b): the operator is "solely responsible for your Application (including its ... content)"; adult content may not go to under-18s or be distributed "without age-restricted labels". An arbitrary-feed plugin takes this on.
- Policy, closing duties: "provide users of their Application with a way to report issues or violations relating to the Application or its use ... and, (2.) review such reports and take appropriate action", and make "commercially reasonable efforts" to be available for feedback or user support. The text does not require a website or a particular contact channel.
- Policy 16-18, 20: no profiling users, no disclosure to data brokers, no selling API Data, and no mining or scraping of data available on or through Discord services.

**Thresholds in the texts.**
- Terms 6: Discord "may also require that you submit your Application for our review and approval ... when use of your Application reaches certain thresholds". An approved app may not "materially change" its reviewed purpose without resubmitting.
- The concrete thresholds published are 100 servers (verification, 3.5) and 10,000 unique users (privileged-intent review, 3.4).

**Developer Portal profile (Consensus; `D/resources/application.mdx`).** The application object has `terms_of_service_url`, `privacy_policy_url`, `description`, `tags` (max 5), `install_params`/`integration_types_config` and a `custom_install_url`. No install link means no "Add App" button and no App Directory eligibility. `bot_public` must be true for anyone to add the bot (`D/topics/oauth2.mdx`). The Terms add that the privacy-policy link must be in the Developer Portal.

**What follows for MagicBot (my reading of the above).**
- The privacy policy names: Discord user, guild and channel ids; game account links; subscription records; settings; the retention windows (live data, backups); the deletion command and how to reach the operator; the third parties (OpenDota, Valve and Steam, Open-Meteo, later providers) and why each receives what it receives.
- Calls to third parties carry the game account id or the place name and never a Discord id or guild id, so the "sharing" is the user's own directed request.
- The delete-my-data command covers Terms 5(b)(d); a guild-leave handler covers 5(b)(a)/(b). Storing only snowflakes means no user-name data goes stale.
- Private replies to typed commands go by DM only in response to that command, with a public note that holds nothing personal and a pointer to the slash command when error 50007 or 50278 comes back. No DMs for notifications or marketing.
- Whichever host is chosen needs encryption at rest, a written Service Provider agreement and, outside the EEA and UK, the transfer clauses.
- The feeds plugin is subscribed by administrators only, shows the feed's source in each post, offers removal, and the bot offers a report route.
- The default role and welcome message are opt-in per guild.
- The Developer Team owner expects an identity check once the bot approaches 100 servers.

### 3.7 Rate limits (Consensus; `D/topics/rate-limits.mdx`)

- Global: 50 requests per second per bot; interaction endpoints are exempt. Per-route limits exist, shared across similar endpoints (`X-RateLimit-Bucket`), and calculated per top-level resource (channel, guild, webhook). "Rate limits should not be hard coded into your app": parse headers.
- 429 body carries `retry_after`, `global`; `X-RateLimit-Scope` is `user`, `global` or `shared`.
- **Invalid-request penalty:** an IP exceeding **10,000 invalid requests per 10 minutes** (401, 403 or 429; 429 with scope `shared` is excluded) is temporarily blocked (a "Cloudflare ban"). Discord advises stopping after a token goes invalid, checking permissions before 403s, and not retrying a 404 webhook.
- Gateway: 120 sent events per 60 seconds per connection, with disconnection on excess; Request Guild Members for all members is limited to one request per guild per 30 seconds.
- **JDA:** `SequentialRestRateLimiter` queues requests per bucket (route hash plus major parameter) and moves them as headers reveal hashes; on 429 it records global or Cloudflare limits in a `GlobalRateLimit` store shared via the `SessionController`, so shards in one `ShardManager` share it. It reacts to headers and 429s and has no proactive 50-per-second counter. `RestConfig.setRateLimiterFactory` replaces the limiter.
- JDA surfaces failures as `ErrorResponseException` with `ErrorResponse` codes including `MISSING_ACCESS` (50001), `MISSING_PERMISSIONS` (50013), `UNKNOWN_CHANNEL` (10003) and `UNKNOWN_GUILD` (10004). These are the signals for disabling a dead feed subscription (see Pitfalls).
- **Upcoming change:** from 2026-11-16 the HTTP channel list omits channels the bot cannot view, and gateway channel payloads for such channels are obfuscated (`CHANNEL_OBFUSCATED` flag, name `___hidden___`). A stored channel id that the bot loses access to will stop resolving, so subscription records need a health state.

### 3.8 Sharding (Consensus; `D/events/gateway.mdx` "Sharding", "Get Gateway Bot", "Session Start Limit Object")

- Required at **2,500 guilds**; each shard supports at most 2,500 guilds. Below that it is optional. Over 150,000 guilds Discord migrates the bot to "large bot sharding" with shard counts in multiples of an assigned number.
- Count: `GET /gateway/bot` returns `shards` (recommended count), `url` and `session_start_limit {total, remaining, reset_after, max_concurrency}`. The formula behind the recommendation is not documented. The endpoint should not be cached for long.
- Routing: `shard_id = (guild_id >> 22) % num_shards`. Events without a `guild_id`, including DMs, go to shard 0. `num_shards` only routes traffic, so sessions need not be evenly distributed.
- Starting: `rate_limit_key = shard_id % max_concurrency`; start up to `max_concurrency` shards per bucket per 5 seconds, buckets in order. Exceeding it yields Invalid Session. The documented example shows `max_concurrency: 1` and total 1,000 session starts per window for a small bot.
- **1,000 Identify calls per 24 hours across all shards** (resumes excluded). On hitting it "all active sessions for the app will be terminated, the bot token will be reset, and the owner will receive an email". A crash-restart loop is the main way to hit this.
- **JDA `ShardManager` (`DefaultShardManagerBuilder`):** `setShardsTotal(-1)` (the default) fetches the recommended count; `setShards(min, max)` runs a subset for multi-process deployments. At login it asks the session controller for the gateway and sets `max_concurrency` on the `SessionController`. `ConcurrentSessionController` implements the bucket start-up with a 5-second delay. It also routes by `MiscUtil.getShardForGuild`, aggregates guild/channel caches across shards (`getGuildCache`, `getShardsRunning`) and can restart one shard. Close code 4011 (`SHARDING_REQUIRED`) is mapped. I found no automatic resharding: the total is fixed at login, so growth needs a restart.
- **Once per bot, not once per shard.** `ReadyEvent` and any `onReady` handler fire once per shard. Events with no guild go only to shard 0. So these must run at bot level, after the shard manager reports started:
  - command registration;
  - the match tracker and patch-note pollers (post through the owning guild's shard, resolved by `ShardManager` caches);
  - the legacy import.
  `ShardManager.retrieveApplicationInfo()` picks any shard because the answer is identical. In a multi-process deployment, one process must own such jobs (for example, the process that owns shard 0).

## 4. How comparable projects do it

- **JDA 6.7.0** (`https://github.com/discord-jda/JDA/tree/v6.7.0`)
  - `Commands.MAX_SLASH_COMMANDS = 100`, `MAX_USER_COMMANDS = 15`, `MAX_MESSAGE_COMMANDS = 15`; `CommandData.MAX_NAME_LENGTH = 32`, `MAX_DESCRIPTION_LENGTH = 100`, `MAX_OPTIONS = 25`; `OptionData.MAX_CHOICES = 25`, `MAX_STRING_OPTION_LENGTH = 6000`.
  - `CommandDataImpl` throws on mixing options with subcommands, on required-after-optional ("Cannot add required options after non-required options!"), and on duplicate names. `checkName` uses `Checks.ALPHANUMERIC_WITH_DASH` (`[\w-]+` with Unicode classes) plus lowercase, which is looser than Discord's regex. I found no check of the 8,000-character aggregate.
  - `GatewayIntent.DEFAULT` excludes `GUILD_MEMBERS`, `GUILD_PRESENCES`, `MESSAGE_CONTENT`, `GUILD_WEBHOOKS` and the typing intents. `JDABuilder.createDefault(token)` and `DefaultShardManagerBuilder.createDefault` use it.
  - `MemberCachePolicy.DEFAULT = VOICE.or(OWNER)`.
  - `Guild.retrieveMembersByPrefix(String prefix, int limit)` takes a limit of 1-100, times out after 10 seconds and has no intent check.
- **discord.py 2.7.1** (`Rapptz/discord.py`, `discord/ext/commands/bot.py`, `hybrid.py`)
  - `when_mentioned` and `when_mentioned_or(*prefixes)` are first-class prefix callables. `Bot.setup_hook` logs "Privileged message content intent is missing, commands may not work as expected." unless the prefix is exactly `when_mentioned`.
  - `HybridCommand` is "both an application command and a regular text command" with one callback, restricted to what application commands support. This is the same "one handler, two front doors" shape the library needs.
  - `Context.defer()` is a no-op for text invocations, so one handler can defer without knowing its origin.
  - `CommandTree.sync()` is an explicit call ("This must be called for the application commands to show up"), not an implicit action at start-up.
- **Kord Extensions `v2.6.0`** (`https://codeberg.org/Kord-Extensions/kord-extensions`): acknowledges immediately and unconditionally, with no timer. `PublicSlashCommand.run` and `EphemeralSlashCommand.run` run the checks, then answer with the definition's `initialResponse` or open a modal or call `deferPublicResponseUnsafe()` / `deferEphemeralResponseUnsafe()`, and only then check bot permissions, parse the arguments and run the body; the visibility is fixed by the class. A check that fails with a message is answered with an ephemeral initial response. Buttons and selects do the same (`deferredAck`). The one way to leave an interaction unanswered is the opt-in `UnsafeSlashCommand` (`InitialSlashCommandResponse.None`) [55]. This is the precedent for an acknowledge-first design; none of the frameworks read for this file defers on a timer, and the 2-second timer in section 6 is this file's own design margin.
- **This repository today:**
  - `Bot` builds `JDABuilder.createDefault(token, EnumSet.allOf(GatewayIntent::class.java))` with `MemberCachePolicy.ALL` and `CacheFlag.ONLINE_STATUS`.
  - It registers commands with `jda.updateCommands().addCommands(interactions).complete()` at start-up.
  - `BotListener` reads `event.message.contentRaw` for prefix commands.
  - GKB2 has the same `allOf` pattern.
  - That combination fails the connection with 4014 on any bot whose portal toggles are off, needs review above 10,000 users, and, if moved naively to a `ShardManager`, would run registration once per shard.

## 5. Pitfalls & regrets

- **Requesting all intents "just in case".** Discord states that it may be enabled only if the use case requires it, and a rejected or lapsed privileged intent removes access (4014 on connect). Compute the intent set from the features actually installed.
- **Prefix commands in a public bot.** Content is empty without the intent; the failure is silent (no error, the bot just never reacts). Log a start-up warning when a bare prefix is configured without the intent, as discord.py does.
- **Treating the 100-server rule as current.** Several places in the docs still say it; the June 2026 text is the rule.
- **Registering on every start.** Each bulk overwrite can consume the 200-creates-per-day-per-guild budget when commands are new, and doing it per shard or per crash-restart loop multiplies it. Register explicitly, once, and skip when the payload is unchanged.
- **Aliases flooding the namespace.** One slash command per alias exhausts 100 and 8,000 characters quickly; fold aliases into typed-only handling.
- **Assuming `default_member_permissions` secures a command.** Guild administrators can change per-command permissions in Server Settings, and typed invocations bypass them. The admin plugin must also check the invoker's permissions in the handler.
- **Missing the 3-second deadline.** Autocomplete, database or HTTP calls to a game API before the first reply are the usual cause. Defer first, then work; ephemeral is chosen at deferral.
- **State in memory for components.** A restart drops the waiters, not the buttons. Encode the route and a short key in `custom_id` (100 characters) and look up state in storage.
- **Crash-restart loops.** At 1,000 Identify calls per 24 hours the token is reset. Back off on repeated failures.
- **Dead feeds.** Posting to a channel after the bot lost access or the channel was deleted yields 403/404 and counts toward the 10,000-per-10-minutes ban. With channel obfuscation from 2026-11-16, lost access is also silent in listings. Disable a subscription after repeated `MISSING_ACCESS`, `MISSING_PERMISSIONS` or `UNKNOWN_CHANNEL`.
- **`MemberCachePolicy.ALL` without member events.** Departed members stay cached forever.
- **Blocking calls on JDA threads.** JDA documents that `Task#get()` must not be used on the event thread; the start-up `complete()` calls in the current `Bot` should not carry into a coroutine bridge.
- **Contacting users outside the API or by unsolicited DM.** The Developer Policy forbids both; subscription notifications go to the subscribed guild channel.

## 6. Recommendation for this repo

Make the platform rules data in the command model and the runtime configuration, not scattered `if`s. Shape:

1. **Registration validator in `bottools-core`.**
   - The immutable command tree compiles to Discord registration payloads through a function returning `Result`, failing at start-up with every violation listed.
   - It checks: name regex and lowercase; description length; at most 25 options or subcommands; required before optional; at most 25 choices and `autocomplete` XOR `choices`; depth of 2; no options beside subcommands; 100/15/15 counts per scope; 8,000-character size with localisations counted by the longest value; and unique names per type and scope.
   - Do not rely on JDA's checks, which are looser on names and absent for the size total.
   - Typed-only aliases are marked in the DSL and excluded from the registration payload. This keeps `!getid`, `!setid`, `!lastgame` and `!showstats` available as typed aliases without spending slash slots.
2. **Registrar.**
   - One component registers commands.
   - It runs at bot level once all shards are up, never in `onReady`.
   - The scope is configurable: a development guild for development, global in production.
   - It computes a stable hash of the payload and skips the PUT when unchanged.
3. **Typed fallback as two modes.**
   - `MENTION` (the default, standard intents only): accept `<@bot> command ...` anywhere and `!command ...` in DMs. Optionally accept `<@bot> !command`.
   - `PREFIX` (opt-in): the per-guild prefix, default `!`, only if the deployment configures `MESSAGE_CONTENT`.
   - Both reach the same handler through one invocation context. The context offers `defer()` that is a no-op for typed input, as in discord.py. At start-up, `PREFIX` without the intent logs a warning and falls back to `MENTION`.
   - MagicBot ships `MENTION`. Self-hosters below 10,000 users may enable `PREFIX` at no review cost.
4. **Intent set derived from installed features.**
   - The baseline is `GUILDS`, `GUILD_MESSAGES`, `DIRECT_MESSAGES`. Reaction roles add `GUILD_MESSAGE_REACTIONS`. The join-time default role and welcome message add `GUILD_MEMBERS`. `PREFIX` adds `MESSAGE_CONTENT`.
   - Plugins declare required intents and cache flags. The runtime unions them, and the plugin reports at start-up if a required intent is not granted rather than letting JDA fail with 4014.
   - Member cache: `MemberCachePolicy.NONE`/`DEFAULT` with `ChunkingFilter.NONE`; never `ALL`.
   - The join feature should be separately switchable. It is the one MagicBot feature that needs a privileged intent. It can be enabled below 10,000 users and needs a reviewed application above that.
5. **Responses.**
   - The runtime acknowledges before the deadline with a short timer (about 2 seconds) and a deferral whose ephemerality comes from the command definition. Kord Extensions acknowledges every interaction immediately instead (claim 55); the timer is this design, and immediate acknowledgement is its simpler alternative.
   - Component and modal `custom_id`s encode a route plus a short key and are dispatched by registry, so nothing depends on memory across restarts.
   - Admin and other privileged commands set `default_member_permissions` and re-check `Member.permissions` in the handler.
6. **Legacy import.** Resolve names with `retrieveMembersByPrefix(name, 100)` plus an exact-match filter. It needs no privileged intent, does not trigger the whole-guild request limit, and the import then needs no `GUILD_MEMBERS` toggle.
7. **Sharding.**
   - Always build through `DefaultShardManagerBuilder`, with `shardsTotal = -1` by default and an optional configuration override of total and `setShards(min, max)`. One code path then works at 1 shard and at many.
   - Jobs (registrar, trackers, import, scheduled patch-note checks) hang off a bot-level coroutine scope started when `ShardManager` reports all shards running.
   - Posting resolves the guild through the shard manager and uses stored `(guildId, channelId)`.
   - Persist a health state per subscription; disable after repeated 403/404 results.
   - Back off on login failure to protect the 1,000-Identify budget.
8. **MagicBot obligations.**
   - Privacy policy and terms URLs set on the application profile, and linked from the bot's about/help command.
   - A delete-my-data command that removes the user's global account links and their data in every guild subscription they created, and a documented guild-removal path: delete a guild's settings and subscriptions when the bot is removed (a `GuildLeaveEvent` handler).
   - SQLite file encrypted at rest or stored on an encrypted volume (Terms 5(c); hosting is outside this work, so this is a requirement on the deployment).
   - Store ids and game links only, no message content.
   - Mention-based fallback, with `MESSAGE_CONTENT` left off.
   - Verification and any intent review handled by the application owner outside the library. The library only reports when an intent is missing.
   - Posting budget: spread tracker posts over time, reserve headroom under 50 requests per second, and rely on JDA's per-bucket queues rather than parallel bursts.

I would reject "default to message-content approval" as the plan for MagicBot: it works only below 10,000 users without review, Discord's own review guide classes text commands as the leading intent request to be replaced by slash commands, and the intent adds an annual renewal and a retention story. I would also reject an automatic `!` prefix in guilds as the library default for the same reason.

## 7. Load-bearing claims

Links use `D` = `https://github.com/discord/discord-api-docs/blob/fd75e22e8c327f60c3ceaa366878c8b223043142/developers` (read 2026-10-20), `TOS` = `https://support-dev.discord.com/hc/en-us/articles/8562894815383-Discord-Developer-Terms-of-Service`, `POL` = `https://support-dev.discord.com/hc/en-us/articles/8563934450327-Discord-Developer-Policy`, `HC` = `https://support-dev.discord.com/hc/en-us/articles`.

1. **Slash name rule.** "`CHAT_INPUT` command names and command option names must match the following regex `^[-_ʼ\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set. If there is a lowercase variant of any letters used, you must use those." (`D/interactions/application-commands.mdx`)
2. **Command counts.** "An app can have the following number of commands: - 100 global `CHAT_INPUT` commands - 15 global `USER` commands - 15 global `MESSAGE` commands" and "For all command types except `PRIMARY_ENTRY_POINT`, you can have the same amount of guild-specific commands per guild." (same file, "Registering a Command")
3. **Create budget.** "There is a global rate limit of 200 application command creates per day, per guild" and, for bulk overwrite, "Commands that do not already exist will count toward daily application command create limits." (same file)
4. **Size.** "Slash commands can have a maximum of 8000 characters for combined name, description, and value properties for each command, its options (including subcommands and groups), and choices. When localization fields are present, only the longest localization for each field (including the default value) is counted towards the size limit." (same file, "Slash Commands")
5. **Depth.** "We support nesting one level deep within a group, meaning your top level command can contain subcommand groups, and those groups can contain subcommands. **That is the only kind of nesting supported.**" and "Using subcommands or subcommand groups will make your base command unusable." (same file)
6. **Options and choices.** "Required `options` must be listed before optional options"; "Parameters for the command, max of 25"; "Choices for the user to pick from, max 25"; "`autocomplete` may not be set to true if `choices` are present." (same file, option structure)
7. **Guild versus global.** "Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use." (same file, "Making a Guild Command")
8. **Contexts and install.** "There are three interaction context types that correspond to different surfaces: `GUILD` (`0`), `BOT_DM` (`1`), and `PRIVATE_CHANNEL` (`2`). However, the `PRIVATE_CHANNEL` interaction context is only meaningful for commands installed to a user" (same file, "Interaction Contexts"). "By default, newly-created apps only support installation to guilds." (`D/resources/application.mdx`, "Setting Supported Installation Contexts")
9. **User-installed visibility.** "Apps installed in a user context (user-installed apps) are visible *only* to the authorizing user, and therefore don't require any server-specific permissions." (`D/resources/application.mdx`, "User Context")
10. **Default permissions.** "Setting it to `"0"` will prohibit anyone in a guild from using the command unless a specific overwrite is configured or the user has admin permissions." and "Command permissions can also be updated by users in the client if they have the necessary permissions." (`D/interactions/application-commands.mdx`, "Permissions")
11. **Interaction timing.** "Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages but you **must send an initial response within 3 seconds of receiving the event**. If the 3 second deadline is exceeded, the token will be invalidated." (`D/interactions/receiving-and-responding.mdx`)
12. **Deferral and ephemeral.** "If you create a callback with the type `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` the only valid message flag you may use is `EPHEMERAL`." (same file, "Messages" footnote) and `EPHEMERAL` "this message is only visible to the user who invoked the Interaction" (`D/resources/message.mdx`, message flags).
13. **Component state.** "`custom_id` is only available on interactive components and must be unique per component. ... This field is a string of 1 to 100 characters and can be used flexibly to maintain state or pass through other important data." (`D/components/reference.mdx`)
14. **Privileged intents list.** "Currently, there are three of them: **Guild Presences** ... **Guild Members**: member join/leave/update events and the ability to list all members in a server; **Message Content**: the `content`, `embeds`, `attachments`, `components`, and `poll` fields in message objects" (`D/gateway/getting-started-with-privileged-intent-review.mdx`, "What are Privileged Intents?")
15. **Threshold.** "Previously, apps in fewer than 100 servers could access Privileged Intents by toggling them on in the Developer Portal, and apps in 100+ servers needed to apply for access. That threshold is now based on the number of unique users who can see your app across all the servers it's in. If that number exceeds 10,000, your app needs to apply for Privileged Intent access." (same file, "What's changed?", effective "As of June 10th, 2026")
16. **Annual renewal and window.** "Apps that already have Privileged Intent access granted from a prior review must reapply each year through the Developer Portal for their continued access." and "You will have **90 days** from the date of the notification to apply." (same file)
17. **Verification separate.** "With this change, we have separated App Verification and the Privileged Intent review process." (`D/change-log.mdx`, entry "Changes to Privileged Intent Access for Discord Apps", 2026-06-10)
18. **Stale 100-server text.** "For verified apps (required for apps in 100+ guilds), the intent must also be approved after the verification process to use the intent." (`D/events/gateway.mdx`, "Gateway Intents"; the same sentence is on `https://docs.discord.com/developers/events/gateway.md`, read 2026-10-20), superseded by claims 15 and 17 for the intents.
19. **Content exceptions.** "Apps **without** the intent will receive empty values in fields that contain user-inputted content with a few exceptions: - Content in messages that an app sends - Content in DMs with the app - Content in which the app is mentioned - Content of the message a message context menu command is used on" (`D/events/gateway.mdx`, "Message Content Intent"). The review guide adds replies: "Replies to your app's messages. Note: this applies to replies sent using Discord's reply feature to a regular bot message (not an interaction response) and the user has "ping on reply" enabled." (`D/gateway/you-might-not-need-a-privileged-intent.mdx`)
20. **Welcome and join events.** "For a bot to send a message in real-time when new members join, it needs to be able to receive `GUILD_MEMBER_ADD` events. **Fix:** Enable and request the Guild Members intent" (`D/gateway/getting-started-with-privileged-intent-review.mdx`, "My welcome messages stopped firing")
21. **Reaction events.** In the intent list: "GUILD_MESSAGE_REACTIONS (1 << 10) - MESSAGE_REACTION_ADD - MESSAGE_REACTION_REMOVE" (`D/events/gateway.mdx`, "List of Intents"), where `GUILD_MESSAGE_REACTIONS` is not among the three privileged intents (claim 14); and the add event has "member? ... Member who reacted if this happened in a guild" (`D/events/gateway-events.mdx`, "Message Reaction Add").
22. **Member requests.** "`GUILD_MEMBERS` intent is required to request the entire member list—`(query=‘’, limit=0<=n)`" and "Requesting a prefix (`query` parameter) will return a maximum of 100 members" (`D/events/gateway-events.mdx`, "Request Guild Members"). Whole-list limit: "Rate Limit: 1 request per guild per bot every 30 seconds" (`D/change-log.mdx`, "Introducing Rate Limit When Requesting All Guild Members").
23. **Close codes and enabling.** "If you pass a privileged intent in the `intents` parameter without configuring it in your app's settings, or being approved for it during verification, your Gateway connection will be closed with a (`4014` close code)." (`D/events/gateway.mdx`, "Gateway Restrictions")
24. **REST limits.** "All bots can make up to 50 requests per second to our API." and "[Interaction endpoints] are not bound to the bot's Global Rate Limit." (`D/topics/rate-limits.mdx`, "Global Rate Limit"). "Because rate limits depend on a variety of factors and are subject to change, **rate limits should not be hard coded into your app**."
25. **Invalid requests.** "Currently, this limit is **10,000 per 10 minutes**. An invalid request is one that results in **401**, **403**, or **429** statuses." and "*429 errors returned with `X-RateLimit-Scope: shared` are not counted against you.*" (same file, "Invalid Request Limit aka Cloudflare bans")
26. **Sharding thresholds.** "Each shard can only support a maximum of 2500 guilds, and apps that are in 2500+ guilds *must* enable sharding." and "The [Get Gateway Bot] endpoint provides a recommended number of shards for your app in the `shards` field" (`D/events/gateway.mdx`, "Sharding"). Routing: `shard_id = (guild_id >> 22) % num_shards`; "Gateway events that do not contain a `guild_id` will only be sent to the first shard (`shard_id: 0`). This includes Direct Message (DM), subscription and entitlement events."
27. **Concurrency and Identify budget.** "`rate_limit_key = shard_id % max_concurrency`" and "Clients are limited to 1000 `IDENTIFY` calls to the websocket in a 24-hour period. This limit is global and across all shards, but does not include `RESUME` calls. Upon hitting this limit, all active sessions for the app will be terminated, the bot token will be reset, and the owner will receive an email notification." (same file, "Max Concurrency", "Identifying")
28. **Channel obfuscation.** "This becomes mandatory for all bots on November 16, 2026." and "`GET /guilds/{guild.id}/channels` will omit those channels from the response entirely." (`D/change-log.mdx`, "Channel Obfuscation for Users and Bots", 2026-08-12)
29. **Application profile fields.** `terms_of_service_url?` "URL of the app's Terms of Service" and `privacy_policy_url?` "URL of the app's Privacy Policy" (`D/resources/application.mdx`, "Application Structure"); "If you don't configure an install link (by selecting "None"), the "Add App" button will not appear for your app, and your app will not be eligible for the App Directory." (same file, "Types of Install Links")
30. **Terms 5(a) and 5(b) (effective 2024-07-08).** "You will maintain publicly available, up-to-date links to your privacy policy in the Developer Portal and make it easily accessible to users from your Application." and "You will give users an easily accessible way to ask for their API Data to be modified and deleted." (`TOS`, Section 5.a and 5.b; read 2026-10-20). The first sentence of 5(a) adds: "You will provide and adhere to a privacy policy for your Application that is compliant with applicable privacy laws and clearly, accurately, and fully describes to users of your Application what data you collect, how you use and share such data with us and third parties, and how users can request deletion of such data."
31. **Terms 5(c) (effective 2024-07-08).** "These efforts will include: (i) encryption of the data at rest and (ii) maintaining administrative, physical, and technical safeguards that are designed to prevent unauthorized access and use and comply with applicable laws and regulations" (`TOS`, Section 5.c; read 2026-10-20).
32. **Developer Policy (effective 2024-07-08).** "Do not use API Data for any purpose outside of what is necessary to provide your stated functionality." (Policy 15) and "Do not contact users on Discord without their explicit permission. This includes frequently sending unsolicited direct messages and/or sending direct messages not directly related to maintaining or improving an Application's functionality." (Policy 5) (`POL`; read 2026-10-20).
33. **JDA limits and defaults** (tag `v6.7.0`, `https://github.com/discord-jda/JDA/blob/v6.7.0/src/main/java/net/dv8tion/jda/`): `Commands.MAX_SLASH_COMMANDS = 100`, `MAX_USER_COMMANDS = 15`, `MAX_MESSAGE_COMMANDS = 15` (`api/interactions/commands/build/Commands.java`); `GatewayIntent.DEFAULT` "All intents with some disabled: GUILD_MEMBERS (because its privileged), GUILD_PRESENCES (because its privileged), MESSAGE_CONTENT (because its privileged)" (`api/requests/GatewayIntent.java`); "You must use ChunkingFilter.NONE if GUILD_MEMBERS is disabled." (same file; Javadoc link tags stripped); `CommandDataImpl.checkName` matches `Checks.ALPHANUMERIC_WITH_DASH` and `Checks.isLowercase` (`internal/interactions/CommandDataImpl.java`).
34. **JDA sharding.** `DefaultShardManagerBuilder.setShardsTotal`: "If this is set to -1 JDA will automatically retrieve the recommended amount of shards from discord (default behavior)." (`api/sharding/DefaultShardManagerBuilder.java`); `ConcurrentSessionController`: "The concurrency model works through a modulo over the concurrency limit. bucket = shard_id % concurrency ... Each bucket has a 5 second delay between logins." (`api/utils/ConcurrentSessionController.java`); `SessionController.getRateLimitHandle`: "This can be used to share the global rate-limit information between shards on the same IP." (`api/utils/SessionController.java`).
35. **JDA member search.** `Guild.retrieveMembersByPrefix`: "The max amount of members to retrieve (1-100)" and "The requests automatically timeout after 10 seconds." (`api/entities/Guild.java`). The `v5.6.1` tag also defines the symbol (checked by presence in `https://raw.githubusercontent.com/discord-jda/JDA/v5.6.1/src/main/java/net/dv8tion/jda/api/entities/Guild.java`).
36. **discord.py mention prefix.** "A callable that implements when mentioned or other prefixes provided." (`when_mentioned_or`) and the warning "Privileged message content intent is missing, commands may not work as expected." (`https://github.com/Rapptz/discord.py/blob/v2.7.1/discord/ext/commands/bot.py`). `HybridCommand`: "A class that is both an application command and a regular text command." (`.../discord/ext/commands/hybrid.py`).
37. **Current Terms and Policy dates.** "Effective date: July 8, 2024 Last updated: June 6, 2024" (`TOS` and `POL`, page headers; read 2026-10-20). `https://docs.discord.com/developers/policies/developer-terms-of-service` and `.../developer-policy` answer HTTP 308 to these two support-dev.discord.com URLs.
38. **Verification trigger and identity check.** "Verification is required for your app to scale past 100 servers." and "The most noteworthy requirement is that the owner of the development team which owns the app will need to verify their identity through Stripe, our identity verification provider. ... You may be asked to periodically reverify your id with stripe." (`HC/23926564536471-How-Do-I-Get-My-App-Verified`, "Getting Your App Verified"; text last edited 2024-08-30; read 2026-10-20)
39. **Verification prerequisites.** "First, the bot needing verification will need to be part of a Developer Team. This is a requirement for verification." and "Any verified bot will be asked to submit a qualifying identity document and meet other criteria outlined in the developer portal." (`HC/6275923204375-Bot-Verification-FAQ-for-Parents-Legal-Guardians-and-Other-Sponsors`, edited 2024-06-10; read 2026-10-20)
40. **Stripe reverification and retention.** "users will be asked to reverify their ID once every three years to keep their ID information on file and up to date." and "our retention policy is that we'll remove the identification information a year after the bot that it is connected with has been deleted." (`HC/6226051178775-Stripe-Identity-Verification-FAQ`, edited 2026-06-23; read 2026-10-20)
41. **June 2026 intent rule at the Help Centre.** "If your app is accessible to fewer than 10,000 users, you can enable Privileged Intents in the Developer Portal. Once your app reaches 10,000 users, your app now requires review for continued access to Privileged Intents." (`HC/6205754771351-How-do-I-get-Privileged-Intents-for-my-bot`, "TL;DR", dated 2026-06-11; read 2026-10-20)
42. **Review criteria for stored data.** "If you're storing the data, explain why it's necessary and describe your retention policy and security measures. If you're processing it in memory and discarding it, say so." (`https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review.md`, "Step 3", Path B; read 2026-10-20)
43. **No model training on message content.** "Do not use message content obtained through the APIs to train machine learning or AI models (including large language models) unless express permission is granted by Discord." (`POL`, Handle Data with Care, item 21; effective 2024-07-08)
44. **API Data definition and third-party sharing.** "“API Data” means any data, information, or other content you obtain through the APIs (including personal data). API Data includes your developer credentials and access tokens." (`TOS`, Section 13) and "You will not share API Data with any third party, except in the following circumstances, subject to compliance with the Terms and applicable laws or regulations: (i) with a Service Provider; (ii) to the extent required under applicable laws or regulations; and (iii) when a user of your Application expressly directs you to share their API Data with the third party (and you will provide us proof thereof upon request)." (`TOS`, Section 5.b)
45. **Deletion triggers.** "(2) promptly delete the API Data when: (a) retaining it is no longer necessary for your Application’s stated (and approved through App Review, as applicable) functionality that is permitted under the Terms; (b) you stop operating your Application ...; (c) we request you delete it; (d) the applicable user requests you delete it; or (e) required by applicable laws or regulations." and "If you have received API Data in error, you will immediately tell us, delete it, and provide proof of deletion upon our request." (`TOS`, Section 5.b)
46. **Service Providers.** "Before using a Service Provider, you will require them to first agree in writing to only access and use the APIs and API Data for you and at your direction to provide you services to develop or operate your Application in compliance with the Terms, and for no other purpose (including their own)." (`TOS`, Section 12.a)
47. **Credentials.** "you will keep API keys and tokens encrypted in any files or other materials accessible by third parties (other than your Service Providers, subject to Section 12(a)). For the avoidance of doubt, developer credentials may not be embedded in open source projects." (`TOS`, Section 2.d) and "we may also limit, suspend, or terminate your Application’s access tokens or any other means of access to the APIs that have not been used or accessed within at least the prior 30-day period, with or without notice to you." (`TOS`, Section 9.a)
48. **Incident notice.** "You will also promptly notify us and provide us with requested information about any incidents of unauthorized access or use of any API Data or any incidents that are reasonably likely to compromise the security, confidentiality, or integrity of your systems" (`TOS`, Section 5.c)
49. **International transfers.** "In each instance of an EEA Data Transfer, your use of Discord EU Data is subject to your compliance with the standard contractual clauses in European Commission Decision (EU) 2021/914 (“Clauses”) as they relate to controller-to-controller transfers as described in Module One." (`TOS`, Section 11.a)
50. **App Review thresholds and attestations.** "we may also require that you submit your Application for our review and approval in various circumstances (e.g., to approve access to certain APIs or API Data, when use of your Application reaches certain thresholds, ..." and "Periodically, we may also request (including through the Developer Portal) information, certifications, and attestations relating to your access to or use of the APIs or API Data" (`TOS`, Section 6)
51. **DMs should be user-initiated.** "You should not use this endpoint to DM everyone in a server about something. DMs should generally be initiated by a user action. If you open a significant amount of DMs too quickly, your bot may be rate limited or blocked from opening new ones." (`https://docs.discord.com/developers/resources/user.md`, "Create DM"; read 2026-10-20). Error codes: "| 50007 | Cannot send messages to this user |" and "| 50278 | Cannot send messages to this user due to having no mutual guilds |" (`https://docs.discord.com/developers/topics/opcodes-and-status-codes.md`, JSON error codes; read 2026-10-20).
52. **Reporting, support and permission.** "developers must: (1.) provide users of their Application with a way to report issues or violations relating to the Application or its use (including violations of our platform rules and other Terms); and, (2.) review such reports and take appropriate action." and "Do not initiate processes on a user or server’s behalf without first obtaining their permission." (`POL`, "Protect Discord Users", item 2 and the closing duties)
53. **Content responsibility.** "You are solely responsible for your Application (including its development, operation, maintenance, support, distribution, use, and content)." (`TOS`, Section 3.b) and, among prohibited behaviours, "Distribute adult content to users under the age of 18, or without age-restricted labels (where applicable) to users ages 18 and older" (`POL`, item 10).
54. **Removal from spaces.** "Your Application must respect users’ ability to remove the Application from spaces (e.g., servers or channels) where it is present." (`POL`, item 3)
55. **Kord Extensions acknowledgement** (`v2.6.0`; base `https://codeberg.org/Kord-Extensions/kord-extensions/src/tag/v2.6.0/kord-extensions/src/main/kotlin/dev/kordex/core/`). "Call this to open with a response, omit it to ack instead." and `event.interaction.deferEphemeralResponseUnsafe()` (`commands/application/slash/EphemeralSlashCommand.kt`, `initialResponse` and `run`); `event.interaction.deferPublicResponseUnsafe()` (`commands/application/slash/PublicSlashCommand.kt`, `run`); "Whether to use a deferred ack, which will prevent Discord's "Thinking..." message." (`components/ComponentWithAction.kt`, `deferredAck`); "Don't respond. Warning: You may not be able to respond in time!" (`InitialSlashCommandResponse.None` in module `dev-unsafe`, `https://codeberg.org/Kord-Extensions/kord-extensions/src/tag/v2.6.0/modules/dev/dev-unsafe/src/main/kotlin/dev/kordex/modules/dev/unsafe/commands/slash/InitialSlashCommandResponse.kt`). The statement order in `run` (checks, acknowledgement, permission check, argument parsing, body) is read from the code.

## 8. Gaps

**Hosts that did not answer or were not opened:**
- `discord.com` (the Developer Portal, including the App Verification checklist and the application-profile pages): behind a sign-in. No sign-in was made, so the checklist items beyond the Stripe identity check, and any portal field Discord requires on the application profile, are unread. Every other Discord page was read at docs.discord.com or support-dev.discord.com.
- `web.archive.org`, `discordpy.readthedocs.io` and `api.github.com`: not reachable from the environment that read the library sources. None of the claims above depends on them.

**Not established:**
- **The complete App Verification checklist.** Only the Stripe identity check, the Developer Team requirement and "other criteria outlined in the developer portal" are public. Whether the checklist requires a privacy-policy URL, a terms URL or a support contact is unknown.
- **What happens to an unverified app at 100 servers.** The article says verification "is required to scale past 100 servers"; no text read says whether joins are blocked, and the article's last edit (2024-08-30) predates the June 2026 split. A Discord statement on whether the trigger moved to the user-count basis was not found.
- **Whether Discord treats a Steam account id, or a location typed into a command, as API Data.** The definition ("obtain through the APIs") is broad enough to cover command arguments; the Terms do not say. The design treats them as covered.
- **Whether a DM answering the user's own command is "explicit permission" under Policy 5.** Neither the Policy nor the Create DM text addresses it; the reading in 3.6 rests on "unsolicited" and "initiated by a user action".
- **How long "promptly" is, and whether backups may lag.** No number and no backup carve-out in the Terms; the retention window in MagicBot's privacy policy is the operator's commitment.
- **Whether `member` is present when a user-installed command is run in a guild the bot is not in.** The documentation is ambiguous; JDA models such guilds as "detached" entities. Test against a real application when user install is added.
- **Numeric propagation time for global commands.** Not documented in the current text (only "read-repair").
- **Per-channel message-create rate limit.** Not stated in the documentation; JDA learns it from headers.
- **How Discord computes the recommended shard count.** Not documented.
- **Kord Extensions' acknowledgement** was read from source at `v2.6.0` and not run; that a slow check can use up the 3-second window before its acknowledgement follows from the statement order and is not measured.
- **Component survival across restarts** is my inference from the documented delivery model (claims 11 and 13), not a sentence in the documentation.
- The 2.0-second acknowledgement timer in the recommendation is a design margin I chose, not a Discord number.

**Cross-cutting note for the design (outside this question):** `club.minnced:jda-ktx:0.15.0` (latest on Maven Central, `lastUpdated` 2026-07-05) declares a runtime dependency on JDA 6.5.0 and a compile dependency on `kotlin-stdlib` 2.4.0 and `kotlinx-coroutines-core-jvm` 1.11.0 (its POM). The repository pins JDA 5.6.1 and the build targets Kotlin 2.2.x. The version pairing needs checking where the dependency question is answered. The Discord findings above hold at JDA 5.6.1 and 6.7.0 alike.
