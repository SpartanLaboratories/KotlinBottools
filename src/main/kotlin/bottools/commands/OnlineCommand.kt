package bottools.commands

import bottools.botactions.online.*
import bottools.dataprocessing.SourceKeyParser
import net.dv8tion.jda.api.EmbedBuilder
import java.io.IOException

abstract class OnlineCommand
/**
 * Use this if you plan on having a primary address that you want to be
 * opened with the pen() function.
 * @param primaryAddress the primary URL that will be accessed by this command
 */
protected constructor(name: String, protected var primaryAddress: String = "") : Command(name) {
    private val keyParser = SourceKeyParser()
    protected lateinit var data : String
    protected val valueMap = HashMap<String, String>()
    protected fun nextLine() = bottools.botactions.online.nextLine.also { data = it }

    protected fun cutToAfter(searchTerm: String) {
        data = cutToAfter(data, searchTerm)
    }

    protected fun cutToAfter(data: String?, searchTerm: String) = data!!.substring(data.indexOf(searchTerm) + searchTerm.length)

    protected fun skipLines(amount: Int) {
        for (i in 0 until amount) nextLine()
    }

    @Throws(IOException::class)
    protected fun skipLinesTo(lineStartSearchTerm: String?) =
        bottools.botactions.online.skipLinesTo(lineStartSearchTerm).also { data = it }

    @Throws(IOException::class)
    protected fun skipToContains(partOfData: String?) {
        while (!data.contains(partOfData!!));
    }

    protected open fun getValueFromKey(key: String?): String {
        val keySet = keyParser.getKeys(key!!)
        for (searchTerm in keySet.initial) cutToAfter(searchTerm)
        if (!validate(keySet.validation)) for (alternate in keySet.alternative) {
            cutToAfter(alternate)
            if (validate(keySet.validation)) break
        }
        return data.substring(0, data.indexOf(keySet.terminal))
    }

    private fun validate(correctEntries: ArrayList<String>): Boolean {
        if (correctEntries.size == 0) return true
        for (validationString in correctEntries) when (validationString) {
            "digit" -> if (Character.isDigit(
                    data[0]
                ) || data[0] == '-'
            ) return true

            "alphabetic" -> if (Character.isAlphabetic(data[0].code)) return true
            else -> if (data.startsWith(validationString)) return true
        }
        return false
    }

    /**
     * Opens a new connection with the primary address of this command.
     * @return whether the connection was successfully established.
     */
    protected open fun connect() = connect(primaryAddress)

    protected fun disconnect() = closeConnection()

    @Synchronized
    protected infix fun connect(address: String) = bottools.botactions.online.open(address)
    protected fun open(address:String, executeWithURLData:()->Unit){
        data = connect(address)
        executeWithURLData()
        //disconnect()
    }
    protected operator fun get(URL: String? = primaryAddress) = bottools.botactions.online.get(URL!!)
    protected open fun mapValueByKey(vararg keyName:String) = keyName.forEach{ valueMap[it] = getValueFromKey(it)}
}