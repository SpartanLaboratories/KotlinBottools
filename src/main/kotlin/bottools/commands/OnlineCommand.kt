package bottools.commands

import bottools.botactions.online.OnlineAction
import bottools.botactions.online.OnlineAction.closeConnection
import bottools.botactions.online.OnlineAction.nextLine
import bottools.dataprocessing.SourceKeyParser
import org.json.JSONObject
import java.io.IOException

abstract class OnlineCommand
/**
 * Use this if you plan on having a primary address that you want to be
 * opened with the pen() function.
 * @param primaryAddress the primary URL that will be accessed by this command
 */ protected constructor(name: String?, protected var primaryAddress: String = "") : Command(
    name!!
) {
    private val keyParser = SourceKeyParser()
    protected var data : String? = null
        protected get() =
        try {
            data = nextLine
            data
        } catch (e: IOException) {
            println("The online command: $name has failed to aquire data")
            e.printStackTrace()
            data
        }

    protected fun cutToAfter(searchTerm: String) {
        data = cutToAfter(data, searchTerm)
    }

    protected fun cutToAfter(data: String?, searchTerm: String): String {
        return data!!.substring(data.indexOf(searchTerm) + searchTerm.length)
    }

    protected fun skipLines(amount: Int) {
        for (i in 0 until amount) data
    }

    @Throws(IOException::class)
    protected fun skipLinesTo(lineStartSearchTerm: String?) {
        data = OnlineAction.skipLinesTo(lineStartSearchTerm)
    }

    @Throws(IOException::class)
    protected fun skipToContains(partOfData: String?) {
        while (!data!!.contains(partOfData!!));
    }

    protected fun getValueFromKey(key: String?): String {
        val keySet = keyParser.getKeys(key!!)
        for (searchTerm in keySet.initial) cutToAfter(searchTerm)
        if (!validate(keySet.validation)) for (alternate in keySet.alternative) {
            cutToAfter(alternate)
            if (validate(keySet.validation)) break
        }
        return data!!.substring(0, data!!.indexOf(keySet.terminal))
    }

    private fun validate(correctEntries: ArrayList<String>): Boolean {
        if (correctEntries.size == 0) return true
        for (validationString in correctEntries) when (validationString) {
            "digit" -> if (Character.isDigit(
                    data!![0]
                ) || data!![0] == '-'
            ) return true

            "alphabetic" -> if (Character.isAlphabetic(data!![0].code)) return true
            else -> if (data!!.startsWith(validationString)) return true
        }
        return false
    }

    /**
     * Opens a new connection with the primary address of this command.
     * @return whether the connection was successfully established.
     */
    protected open fun connect(): Boolean {
        return connect(primaryAddress)
    }

    protected fun disconnect() {
        closeConnection()
    }

    @Synchronized
    protected fun connect(address: String?): Boolean {
        return OnlineAction.connect(address)
    }

    protected operator fun get(URL: String? = primaryAddress): JSONObject {
        return OnlineAction[URL!!]
    }
}