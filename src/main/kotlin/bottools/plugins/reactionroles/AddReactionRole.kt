package bottools.plugins.reactionroles

import bottools.commands.Command
import bottools.commands.Option
import bottools.dataprocessing.D
import bottools.main.Bot
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Role
import net.dv8tion.jda.api.entities.emoji.Emoji
import org.slf4j.LoggerFactory
import java.util.function.Consumer

class AddReactionRole : Command("addreactionrole") {
    private val log = LoggerFactory.getLogger(this::class.java)
    init {
        helpMessage = "Use this command to tie a server emote to a role"
        makeInteractible()
        this + Option("integer", "emote", "the reaction emote that you want tied to a role", true)
        this + Option("role", "role", "the role that you want to be given on reaction", true)
    }

    public override fun invoke(args: Array<String>){
        val emote = getEmote(args[0])
        log.trace("The emote has been recognized as ${emote.name}")
        val role = getRole(args[1])
        log.trace("The role has been recognized as ${role.name}")
        makeReactionRole(guild, emote, role)
        val creationMessage = "A reaction role has been created for the guild $guild. " +
                "Emote ${emote.name} is now tied to the role: ${role.asMention}"
        log.info(creationMessage)
        reply(creationMessage)
        CreateMainWelcomeMessage.updateMessages(guild, emote)
    }

    private fun getEmote(emoteString: String): Emoji {
        val emojis = guild.emojis
        val emote: Emoji? = guild.getEmojisByName(args[0].split(":".toRegex()).dropLastWhile { it.isEmpty() }
            .toTypedArray()[1], true)[0]
        return emote ?: invalidEmoteMessage()!!
    }

    private fun invalidEmoteMessage(): Emoji? = null.also{
        say("Emote was not found. First option must be an emote that is found in this server.")
    }

    private fun getRole(roleString: String): Role {
        val roleID = args[1]
        val role = guild.getRoleById(roleID)
        return role ?: invalidRoleMessage()!!
    }

    private fun invalidRoleMessage(): Role? = null.also{
        say("Role was not found. Second option must be a role that is found in this server")
    }

    private fun makeReactionRole(guild: Guild, emote: Emoji, role: Role) = Bot.data.addReactionRole(guild, emote, role)

    companion object {
        fun getCorrespondingRole(guild: Guild, emote: Emoji) = guild.getRoleById((D/guild).getCorrespondingRoleID(emote)!!)

        @JvmStatic
		fun getEmoteList(guild: Guild): List<Emoji> {
            val emotes = ArrayList<Emoji>()
            Bot.data.getGameEmoteIDs(guild).forEach(Consumer { emoteID: String ->
                emotes.add(guild.getEmojisByName(emoteID, true)[0])
            })
            return emotes
        }
    }
}