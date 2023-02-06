package bottools.services

import bottools.dataprocessing.D
import bottools.dataprocessing.div
import bottools.dataprocessing.minus
import net.dv8tion.jda.api.entities.Guild
import java.util.function.Consumer

class UserGameService internal constructor(var gameName: String) :
    UserBasedService("game services/$gameName/UserGames") {
    override fun checkGuild(guild: Guild) {}
    override val userId: String
        get() = D/guild/member/"Games"/gameName-"id"

    companion object {
        fun createService(gameName: String, onChange: Consumer<Array<String>>, interval: Int) =
            createService(UserGameService(gameName), onChange, interval)
    }
}