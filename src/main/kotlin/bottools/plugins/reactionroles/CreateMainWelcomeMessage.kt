package bottools.plugins.reactionroles

import bottools.commands.Command
import bottools.main.Bot
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Message
import net.dv8tion.jda.api.entities.emoji.Emoji
import net.dv8tion.jda.api.exceptions.ErrorResponseException
import java.util.function.Consumer

class CreateMainWelcomeMessage : Command("createmainwelcomemessage") {
    init {
        makeInteractible()
    }

    public override fun invoke(args: Array<String>) = Unit//ReactionRoleActions.createWelcomeMessage(guild, channel)

    companion object {
        fun updateMessages(guild: Guild, emote: Emoji?) {
            val welcomeMessages = getGuildWelcomeMessages(guild)
            if (welcomeMessages.isNotEmpty())
                welcomeMessages.forEach(Consumer { message: Message ->
                message.addReaction(emote!!).complete()
            })
        }

        fun getGuildWelcomeMessages(guild: Guild): List<Message> {
            val messages = ArrayList<Message>()
            /*
            for (id in Bot.data.getWelcomeMessageIDs(guild)) try {
                val message = guild.getTextChannelById(id.left!!)!!
                    .retrieveMessageById(id.right!!).complete()
                messages.add(message)
            } catch (e: ErrorResponseException) {
                //log.warn("There are deleted messages still marked as welcome messages in guild data");
            }

             */
            return messages
        }
    }
}