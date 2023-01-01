package bottools.main

import bottools.main.Bot
import bottools.plugins.Plugins

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