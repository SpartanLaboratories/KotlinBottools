package bottools.plugins.reactionroles

import bottools.botactions.say
import bottools.dataprocessing.D
import bottools.dataprocessing.containing
import bottools.dataprocessing.minus
import bottools.main.Bot
//import bottools.plugins.reactionroles.AddReactionRole.Companion.getEmoteList
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Message
import net.dv8tion.jda.api.entities.Role
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel
import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel
import net.dv8tion.jda.api.entities.emoji.Emoji
import net.dv8tion.jda.api.events.message.MessageDeleteEvent
import net.dv8tion.jda.api.events.message.react.MessageReactionAddEvent
import java.util.function.Consumer

object ReactionRoleActions {
    fun giveReactionRole(event: MessageReactionAddEvent) {
        val role = getCorrespondingRole(event.guild, event.emoji)
        event.guild.addRoleToMember(event.member!!.user, role!!).complete()
    }

    fun removeDeletedWelcomeMessage(event: MessageDeleteEvent) =
        Bot.data.removeWelcomeMessage(event.guild, event.messageId)

    fun createWelcomeMessage(guild: Guild, channel: MessageChannel) {
        D/guild-"welcomemessage".let {
            say(channel, it).let {
                setGuildWelcomeMessageID(it)
                addGameEmotes(it)
            }
        }
    }

    private fun setGuildWelcomeMessageID(message: Message) {
        val welcomeMessages = D / message.guild / "welcomeMessages"
        welcomeMessages createCategory "welcomeMessage"
            welcomeMessages create "channel"    containing message.channel.id
            welcomeMessages create "id"         containing message.id
    }

    private fun addGameEmotes(welcomeMessage: Message) =
        getEmoteList(welcomeMessage.guild).forEach(Consumer { emote: Emoji? ->
            welcomeMessage.addReaction(emote!!).complete()
        })
    private fun getCorrespondingRole(guild: Guild, emote: Emoji) : Role?{
        (D/guild/"reactionRoles").readAll().forEach {
            if(it-"reaction" == emote.asReactionCode)
                return guild.getRoleById(it-"role")
        }
        return null
    }
}