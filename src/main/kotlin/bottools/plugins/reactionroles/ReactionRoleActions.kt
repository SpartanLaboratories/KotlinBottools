package bottools.plugins.reactionroles

import bottools.botactions.BotAction.Companion.say
import bottools.dataprocessing.D
import bottools.main.Bot
import bottools.plugins.reactionroles.AddReactionRole.Companion.getEmoteList
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Message
import net.dv8tion.jda.api.entities.channel.Channel
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel
import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel
import net.dv8tion.jda.api.entities.emoji.Emoji
import net.dv8tion.jda.api.events.guild.member.GuildMemberJoinEvent
import net.dv8tion.jda.api.events.message.MessageDeleteEvent
import net.dv8tion.jda.api.events.message.react.MessageReactionAddEvent
import java.util.function.Consumer

object ReactionRoleActions {
    fun giveReactionRole(event: MessageReactionAddEvent) {
        val roleid = (D/event.guild).getCorrespondingRoleID(event.emoji)
        val role = Bot.jda!!.getRoleById(roleid!!)
        event.guild.addRoleToMember(event.member!!.user, role!!)
    }

    fun removeDeletedWelcomeMessage(event: MessageDeleteEvent) =
        Bot.data.removeWelcomeMessage(event.guild, event.messageId)

    fun createWelcomeMessage(guild: Guild, channel: MessageChannel) {
        val welcomeMessage = Bot.data.getWelcomeMessage(guild)
        val message = say(channel, welcomeMessage)
        setGuildWelcomeMessageID(message)
        addGameEmotes(message)
    }

    private fun setGuildWelcomeMessageID(message: Message) =
        Bot.data.setWelcomeMessageID(message.guild, (message.channel as TextChannel), message)

    private fun addGameEmotes(welcomeMessage: Message) =
        getEmoteList(welcomeMessage.guild).forEach(Consumer { emote: Emoji? ->
            welcomeMessage.addReaction(emote!!).complete()
        })
}