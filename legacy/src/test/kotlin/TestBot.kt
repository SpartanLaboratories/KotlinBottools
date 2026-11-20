import bottools.main.Bot
import bottools.plugins.Plugins

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