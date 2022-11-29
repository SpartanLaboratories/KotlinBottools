package bottools.services

import bottools.dataprocessing.XMLReader
import org.w3c.dom.Node
import java.util.function.Consumer

class ServicePacketReader(packetName: String) : XMLReader() {
    init {
        setDocument(packetName)
    }

    val uRL: String
        get() = value("url")
    val skipLineData: ArrayList<String>
        get() {
            val lines = ArrayList<String>()
            val skipLines: Node = getChild(root, "skiplines")
            getChildren(skipLines).forEach { line -> lines.add(getValue(line)) }
            return lines
        }

    fun keyName(): String {
        return value("keyname")
    }

    fun oldValue(): String {
        return value("oldvalue")
    }

    private fun value(name: String): String {
        return getValue(getChild(root, name))
    }

    fun writeValue(data: String?) {
        setValue(getChild(root, "oldvalue"), data)
    }

    override fun setDocument(pathName: String) {
        super.setDocument("bottools/services/$pathName.xml")
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val test = ServicePacketReader("game services/Dota 2.xml")
            println(test.uRL)
            test.skipLineData.forEach(Consumer { key: String? -> println(key) })
        }
    }
}