package bottools.commands

import net.dv8tion.jda.api.interactions.commands.OptionType
import net.dv8tion.jda.api.interactions.commands.build.OptionData

class Option(type: String, name: String?, description: String?, required: Boolean) :
    OptionData(getOptionType(type), name!!, description!!, required) {
    internal constructor(type: String, name: String?, description: String?) : this(type, name, description, false) {}

    companion object {
        private fun getOptionType(type: String): OptionType {
            when (type) {
                "user" -> return OptionType.USER
            }
            return OptionType.STRING
        }
    }
}