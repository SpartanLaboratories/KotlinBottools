package bottools.main

import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel
import net.dv8tion.jda.api.events.guild.GuildJoinEvent
import net.dv8tion.jda.api.events.guild.member.GuildMemberJoinEvent
import net.dv8tion.jda.api.events.guild.update.GuildUpdateNameEvent
import net.dv8tion.jda.api.events.interaction.command.MessageContextInteractionEvent
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent
import net.dv8tion.jda.api.events.interaction.command.UserContextInteractionEvent
import net.dv8tion.jda.api.events.message.MessageDeleteEvent
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import net.dv8tion.jda.api.events.message.react.MessageReactionAddEvent
import net.dv8tion.jda.api.events.user.update.UserUpdateOnlineStatusEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import org.slf4j.LoggerFactory
import java.io.File


internal class BotListener : ListenerAdapter() {
    private final val log = LoggerFactory.getLogger(BotListener::class.java)
    private val ignoredChannels = ArrayList<MessageChannel>()
    internal val responder = Responder()

    init {
        Parser addTrigger "/"
        responder newGuildJoinAction this::defaultOnGuildJoinAction
        responder newGuildUpdateNameAction this::defaultOnGuildUpdateNameAction
        responder newGuildMemberJoinAction this::defaultOnGuildMemberJoinAction
        responder newMessageReceivedAction this::defaultOnMessageReceivedAction
        responder newSlashCommandInteractionAction Bot::handleCommand
        responder newUserContextInteractionAction Bot::handleCommand
        responder newMessageContextInteractionAction Bot::handleCommand
    }

    private infix fun defaultOnGuildJoinAction(event: GuildJoinEvent) {
        val joinedServer = event.guild
        val serverName = joinedServer.name
        log.info("Successfully joined the server: {}", serverName)
    }

    private fun defaultOnGuildMemberJoinAction(event: GuildMemberJoinEvent) {
        log.info("The user {} has joined the guild {}", event.user.name, event.guild.name)
        Bot.data.updateServerDatabase()
        log.info("Guild member database has been updated")

        // Gives the new guild member the specified default role
        log.info("Adding the default role to the new member")
        //event.guild.addRoleToMember(event.member, Botmain.gdp.getDefaultRole(event.guild)).complete()
    }

    private fun defaultOnGuildUpdateNameAction(event: GuildUpdateNameEvent) =
        File("guildData/${event.oldName}").renameTo(File("guildData/${event.newName}"))

    private fun defaultOnMessageReceivedAction(event: MessageReceivedEvent) =
        if (startsWithTrigger(event) and (event.channel !in ignoredChannels))
            Bot.handleCommand(Parser parse event, event)
        else log.debug("The message did not start with a trigger")
    private fun startsWithTrigger(event: MessageReceivedEvent) = Parser startsWithTrigger event.message.contentRaw
    fun ignoreChannel   (channel: MessageChannel) = ignoredChannels.add(channel)
    fun unignoreChannel (channel: MessageChannel) = ignoredChannels.remove(channel)
    infix fun ignore    (channel: MessageChannel) = ignoreChannel(channel)
    infix fun listenTo  (channel: MessageChannel) = unignoreChannel(channel)
    operator fun minus  (channel: MessageChannel) = this ignore channel
    operator fun plus   (channel: MessageChannel) = this listenTo channel
    override fun onGuildJoin                (event: GuildJoinEvent)                 = responder reactTo event
    override fun onGuildMemberJoin          (event: GuildMemberJoinEvent)           = responder reactTo event
    override fun onGuildUpdateName          (event: GuildUpdateNameEvent)           = responder reactTo event
    override fun onMessageReceived          (event: MessageReceivedEvent)           = responder reactTo event
    override fun onMessageReactionAdd       (event: MessageReactionAddEvent)        = responder reactTo event
    override fun onMessageDelete            (event: MessageDeleteEvent)             = responder reactTo event
    override fun onUserUpdateOnlineStatus   (event: UserUpdateOnlineStatusEvent)    = responder reactTo event
    override fun onSlashCommandInteraction  (event: SlashCommandInteractionEvent)   = responder reactTo event
    override fun onMessageContextInteraction(event: MessageContextInteractionEvent) = responder reactTo event
    override fun onUserContextInteraction   (event: UserContextInteractionEvent)    = responder reactTo event
}