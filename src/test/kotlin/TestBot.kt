import bottools.main.Bot
import bottools.plugins.Plugins
import it.marplex.cloudflarebypass.CloudflareHTTPClient
import it.skrape.fetcher.*
import kotlinx.coroutines.runBlocking
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull
import org.jsoup.Jsoup

fun main() {
    KotBot()
}
class KotBot : Bot() {
    override fun listCommands() {
        Plugins.REACTIONROLES()
        Bot createCommand DotaCommand()
    }

    override fun applyDailyUpdate(currentDate: String?) {
    }

}