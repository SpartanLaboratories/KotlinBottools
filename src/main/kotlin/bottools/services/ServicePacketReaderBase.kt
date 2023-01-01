package bottools.services

import bottools.dataprocessing.*
import org.w3c.dom.Node
import java.util.function.Consumer

class ServicePacketReaderBase(packetName: String) : BaseXMLReader() {
    init {
        setDocument(packetName)
    }

    val uRL: String
        get() = root-"url"
    val skipLineData: List<String>
        get() = (root/"skiplines").children().map { it.getValue() }
    val keyName:String
        get() = root-"keyname"
    var oldValue:String
        get() = root-"oldvalue"
        set(data) = setValue(root/"oldvalue", data).let{Unit}
    override fun setDocument(pathName: String) = super.setDocument("services/$pathName.xml")

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val test = ServicePacketReaderBase("game services/Dota 2.xml")
            println(test.uRL)
            test.skipLineData.forEach(Consumer { key: String? -> println(key) })
        }
    }
}