package bottools.services

import bottools.dataprocessing.D
import bottools.dataprocessing.div
import bottools.dataprocessing.minus
import net.dv8tion.jda.api.entities.Guild
import java.util.function.Consumer

class UserGameService internal constructor(var gameName: String) :
    UserBasedService("game services/$gameName user games") {
    override fun checkGuild(guild: Guild) {}
    override val userId: String
        protected get() = D/guild/member/"IDs"-gameName

    companion object {
        fun createService(gameName: String, onChange: Consumer<String>, interval: Int) =
            createService(UserGameService(gameName), onChange, interval)
    }
}