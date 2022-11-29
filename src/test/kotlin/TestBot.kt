import bottools.main.Bot
import bottools.plugins.Plugins
import java.util.ArrayList

fun main() {
    KotBot()
}
class KotBot : Bot() {
    override fun listCommands() {
        //Plugins.REACTIONROLES()
    }

    override fun applyDailyUpdate(currentDate: String?) {
        TODO("Not yet implemented")
    }

}