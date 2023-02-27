import bottools.main.Bot
import bottools.plugins.Plugins
import it.marplex.cloudflarebypass.CloudflareHTTPClient
import it.skrape.fetcher.*
import kotlinx.coroutines.runBlocking
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull
import org.jsoup.Jsoup

fun main() {
    runBlocking {
        val client = CloudflareHTTPClient()

        //Returns an OkHttp Response object
        val url = "https://www.google.com"//.toHttpUrlOrNull()!!
        val response = client.get(url)
        println(response)
    }
}
class KotBot : Bot() {
    override fun listCommands() {
        Plugins.REACTIONROLES()
        Bot createCommand DotaCommand()
    }

    override fun applyDailyUpdate(currentDate: String?) {
    }

}