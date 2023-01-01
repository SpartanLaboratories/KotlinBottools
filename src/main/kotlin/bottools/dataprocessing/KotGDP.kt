package bottools.dataprocessing

import bottools.main.Bot
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Member
import org.slf4j.LoggerFactory
import org.w3c.dom.Node
import java.io.File
import java.nio.charset.Charset
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*
import kotlin.collections.HashMap
import kotlin.io.path.pathString

val D = KotGDP()

class KotGDP(private val reader : BaseXMLReader = BaseXMLReader()) : XMLReader by reader {
    private val log = LoggerFactory.getLogger(KotGDP::class.java)
    private val customPersonNodes = HashMap<String, String>()
    private val customGuildNodes = HashMap<String,String>()

    operator fun div(guild: Guild) = this inServer guild
    infix fun inServer(guild:Guild) = GuildDataAccessPoint(guild)

    fun createGuildDatabase(guild: Guild) {
        val guildPath = "guildData/${guild.name}"
        File(guildPath).mkdirs()
        val guildData = listOf(
            "<data>",
            "<defaultRole>online</defaultRole>",
            "<welcomeMessage>hello</welcomeMessage>",
            "</data>",
        )
        val guildDataPath = Paths.get("$guildPath/GuildData.xml")
        val people = Arrays.asList("<People>\n", "</People>")
        val peoplePath = Paths.get("$guildPath/MemberData.xml")
        Files.write(guildDataPath, guildData, Charset.forName("UTF-8"))
        Files.write(peoplePath, people, Charset.forName("UTF-8"))
        updateServerDatabase(guild)
        reader setDocument guildDataPath.pathString
        reader at root
        customGuildNodes.forEach {
            reader create it.key containing it.value
        }
        write()
    }

    internal fun updateServerDatabase() : Unit = Bot.jda!!.guilds.forEach(::updateServerDatabase)
    private infix fun updateServerDatabase(guild: Guild) {
        for (member in guild.loadMembers().get()) {
            log.debug("Found guild member named: ${member.user.name}")
            with(member.user.name){
                if (this !in filedMembers(guild))
                    createMemberEntry(this)
            }
        }
    }
    private fun filedMembers(guild: Guild):List<String>{
        reader setDocument "guildData/${guild.name}/MemberData.xml"
        return root.children().map{ it-"tName"}
    }
    private fun createMemberEntry(username:String){
        log.debug("This member is not yet in the database. Creating new data node...")
        val personNode =
        reader at reader.root createCategory "Person"
            reader create "tName"       containing username
            reader create "keyid"
            reader create "nPoints"     containing "0.0"
            reader create "match"       containing "none"
            reader create "requestedby" containing "none"
            reader create "money"       containing "1000"
            reader create "IDs"

            reader createCategory "time"
                reader create "timezone"    containing "none"
                reader create "dston"       containing "false"
                reader create "dststart"    containing "none"
                reader create "dstend"      containing "none"
        reader at personNode
        customPersonNodes.forEach { reader create it.key containing it.value }
        write()
    }

    inner class GuildDataAccessPoint internal constructor(private val guild: Guild)
        :DataAccessPoint(reader setDocument "guildData/${guild.name}/GuildData.xml"){
        operator fun div(member: Member) = this forMember member
        infix fun forMember(member: Member):DataAccessPoint = DataAccessPoint(getNodeOf(guild,member)!!)
    }
    open inner class DataAccessPoint internal constructor(private val node:Node){
        operator fun div(groupName: String)     = this getGroup groupName
        infix fun getGroup(groupName:String)    = DataAccessPoint(node/groupName)
        operator fun minus(nodeName: String)    = this getValue nodeName
        infix fun getValue(nodeName:String)     = node-nodeName
        operator fun plus(newValue: String)     = this setTo newValue
        infix fun setTo(newValue:String)        = Unit.also{ reader.setValue(node, newValue)}
        fun readAll() = node.children()
        infix fun create(childNodeName:String)  = reader at node create childNodeName
        infix fun createCategory(childNodeName:String) = reader at node createCategory childNodeName
    }
    private fun getNodeOf(guild:Guild, member: Member): Node? {
        reader setDocument "guildData/${guild.name}/MemberData.xml"
        for (personNode in root.children())
            if (personNode - "tName" == member.user.name.lowercase())
                return personNode
        return null
    }
    fun addTagFile(localFilePath:String) {
        reader setDocument localFilePath
        (root/"person").children().forEach{customNode -> customPersonNodes.put(customNode.nodeName, customNode.getValue())}
        customGuildNodes.putAll((root/"data").children().map { it.nodeName to it.getValue() }.toMap())
    }
    internal fun addTag(fileName:String, node: String, value:String = "")   = performActionInFile(fileName, node, ::addTag, value)
    internal fun removeTag(fileName: String, node:String) :Unit             = performActionInFile(fileName, node, ::removeTag)
    private fun performActionInFile(fileName:String,  node:String, action : (parent:Node, child:String, value:String) -> Unit, value:String=""){
        Bot.jda?.guilds!!.forEach {
            reader setDocument "guildData/${it.name}/$fileName"
            when(fileName.lowercase()){
                "guilddata.xml" -> action.invoke(root, node, value)
                "memberdata.xml" -> root.children().forEach{personNode -> action.invoke(personNode, node, value)}
                else -> throw IllegalArgumentException("Invalid file name")
            }
            write()
        }
    }
    private fun addTag(parent: Node, child: String, value: String) = reader at parent create child containing value
    private fun removeTag(parent:Node, child:String, value:String) = reader.removeTag(parent, child)
}
