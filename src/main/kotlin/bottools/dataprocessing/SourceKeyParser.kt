package bottools.dataprocessing

import org.w3c.dom.Node
import java.util.*

class SourceKeyParser {
    private val reader: XMLReader = XMLReader()

    init {
        reader.setDocument("WebParseKeys.xml")
    }

    fun getKeys(searchedName: String): KeySet {
        val root: Node = reader.root // Keys
        var key: Node = reader.stepDown(root) // Key
        var nameNode: Node = reader.stepDown(key)
        try {
            while (true) {
                if (nameNode.nodeName != "name") {
                    key = reader.stepOver(key)
                    nameNode = reader.stepDown(key)
                    continue
                }
                if (compare(nameNode, searchedName)) {
                    val keySet: KeySet = KeySet()
                    var keyTerm: Node = reader.stepOver(nameNode)
                    while (true) {
                        when (keyTerm.nodeName.lowercase(Locale.getDefault())) {
                            "initial" -> keySet.addInitial(reader.getValue(keyTerm))
                            "alternate" -> keySet.addAlternative(reader.getValue(keyTerm))
                            "validation" -> keySet.addValidation(reader.getValue(keyTerm))
                            "terminal" -> keySet.terminal = reader.getValue(keyTerm)
                        }
                        if (keyTerm.nodeName == "terminal") return keySet
                        keyTerm = reader.stepOver(keyTerm)
                    }
                } else nameNode = reader.stepOver(nameNode)
            }
        } catch (e: Exception) {
            println("Unable to find web key: $searchedName")
            e.printStackTrace()
            throw IllegalArgumentException()
        }
    }

    private fun compare(nameNode: Node, searchedName: String): Boolean {
        return reader.getValue(nameNode).equals(searchedName)
    }

    inner class KeySet internal constructor() {
        internal var initial = ArrayList<String>()
        internal var validation = ArrayList<String>()
        internal var alternative = ArrayList<String>()
        internal var terminal = ""
        internal infix fun addInitial(initial: String) =
            this.initial.add(initial)

        internal infix fun addValidation(validation: String) =
            this.validation.add(validation)

        internal infix fun addAlternative(alternative: String) =
            this.alternative.add(alternative)

    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val finder = SourceKeyParser()
            val keys = finder.getKeys("duration")
            println("Initial")
            for (s in keys.initial) println(s)
            println("Alternative")
            for (s in keys.alternative) println(s)
            System.out.printf("Terminal: %s\n", keys.terminal)
        }
    }
}