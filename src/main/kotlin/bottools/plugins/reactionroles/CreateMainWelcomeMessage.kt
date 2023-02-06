package bottools.plugins.reactionroles

import bottools.commands.Command
import bottools.dataprocessing.D
import bottools.dataprocessing.minus
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

    public override fun invoke(args: Array<String>) = ReactionRoleActions.createWelcomeMessage(guild, channel)

    companion object {



    }
}