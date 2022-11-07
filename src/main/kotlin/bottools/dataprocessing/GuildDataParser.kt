package bottools.dataprocessing

import BotTools.main.Botmain
import net.dv8tion.jda.api.entities.*
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel
import net.dv8tion.jda.api.entities.emoji.Emoji
import net.dv8tion.jda.internal.utils.tuple.ImmutablePair
import net.dv8tion.jda.internal.utils.tuple.Pair
import org.w3c.dom.Element
import org.w3c.dom.Node
import java.io.File
import java.io.IOException
import java.nio.charset.Charset
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*
import java.util.function.Consumer

class GuildDataParser {
    private val reader: XMLReader = XMLReader()
    private var guildPath: String? = null
    private val playlistDecoder = PlaylistDecoder()
    private val debug = false
    fun getPromotionPoints(guild: Guild, memberName: String): Double {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val person = getPersonNode(memberName)
        //Botmain.debug("The retrived person node is: " + (if (person == null) "" else "not ") + "null")
        val points = getPointsNode(person)
        //Botmain.debug("Retrieved the points node: $points")
        return reader.getValue(points).toDouble()
    }

    @Synchronized
    fun updateServerDatabase() {
        // DO NOT DELETE    use if the infinite whitespace in xml files bug occurs again
        //for(Guild g: Botmain.jda.getGuilds())Trimmer.trim("%USERPROFILE%\\OneDrive\\Documents\\Programming\\workspace\\TrumpBotTest\\guildData\\" + g.getName() + "\\MemberData.xml");
        Botmain.jda!!.guilds.forEach(Consumer { guild: Guild ->
            updateServerDatabase(
                guild
            )
        })
        //Botmain.out("Finished updating server member database")
    }

    private fun updateServerDatabase(guild: Guild) {
        val filedMembers = attemptRetrieveNames(guild)
        val actualMembers = guild.loadMembers().get()
        for (m in actualMembers) {
            val personName = m.user.name
            //Botmain.debug("Found guild member named: $personName")
            val isInSystem = filedMembers.contains(personName)
            //Botmain.debug("This member is " + (if (isInSystem) "" else "not ") + "in the system")
            if (!isInSystem) {
                val personTag: Element = reader.newChild(reader.root, "Person")
                reader.newChild(personTag, "tName", personName)
                reader.newChild(personTag, "keyid")
                reader.newChild(personTag, "nPoints", "0.0")
                reader.newChild(personTag, "time", "")
                val timeNode: Node = reader.getChild(personTag, "time")!!
                reader.newChild(timeNode, "timezone", "none")
                reader.newChild(timeNode, "dston", "false")
                reader.newChild(timeNode, "dststart", "none")
                reader.newChild(timeNode, "dstend", "none")
                reader.newChild(personTag, "match", "none")
                reader.newChild(personTag, "requestedby", "none")
                reader.newChild(personTag, "money", "1000")
                reader.newChild(personTag, "IDs")
            }
        }
    }

    fun setDSTon(guild: Guild, member: Member, on: Boolean) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val person = getPersonNode(member.user.name)
        val dston: Node = reader.getChild(reader.getChild(person, "time"), "dston")
        reader.setValue(dston, if (on) "on" else "off")
    }

    fun isDSTTrackingOn(guild: Guild, member: Member): Boolean {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val person = getPersonNode(member.user.name)
        val dston: Node = reader.getChild(reader.getChild(person, "time"), "dston")
        return reader.getValue(dston).toLowerCase().equals("on")
    }

    private infix fun attemptRetrieveNames(guild: Guild): ArrayList<String> {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        return try {
            retriveNames()
        } catch (e: Exception) {
            println("Could not retrieve names for the guild " + guild.name)
            e.printStackTrace()
            ArrayList(1)
        }
    }

    fun getRankReqs(guild: Guild): HashMap<Int, ImmutablePair<String, Double>> {
        setGuildString(guild)
        reader.setDocument(guildPath + "autopromotionranks.xml")
        val reqs = HashMap<Int, ImmutablePair<String, Double>>()
        var rank: Node = reader.stepDown(reader.root) ?: return reqs
        var rankName: String
        var pointReq: Double
        var nameNode: Node
        var i = 0
        reqs[i++] = ImmutablePair(getDefaultRole(guild).name, 0.0)
        do {
            nameNode = reader.stepDown(rank)
            rankName = reader.getValue(nameNode)
            pointReq = reader.getValue(reader.stepOver(nameNode)).toDouble()
            Botmain.debug("Putting: $rankName, $pointReq")
            reqs[i++] = ImmutablePair(rankName, pointReq)
        } while (reader.stepOver(rank).also { rank = it } != null)
        return reqs
    }

    fun addPoints(user: User, amount: Double): Double {
        Botmain.debug("Starting addPoints() with: " + user.name)
        val person = getPersonNode(user.name)
        Botmain.debug("Person: " + person!!.nodeName)
        val pointsNode = getPointsNode(person)
        val currentAmount: Double = reader.getValue(pointsNode).toDouble()
        Botmain.debug("Points: $currentAmount")
        reader.setValue(pointsNode, (amount + currentAmount).toString())
        val finalValue: Double = reader.getValue(pointsNode).toDouble()
        Botmain.debug("Final value: $finalValue")
        return finalValue
    }

    fun setPoints(user: User, amount: Double) {
        val person = getPersonNode(user.name)
        val pointsNode = getPointsNode(person)
        val currentAmount: Double = reader.getValue(pointsNode).toDouble()
        reader.setValue(pointsNode, amount.toString())
    }

    fun getDefaultRole(guild: Guild): Role {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        val roleList = guild.getRolesByName(reader.getValue(reader.stepDown(reader.root)), true)
        return if (roleList.size > 0) roleList[0] else guild.publicRole
    }

    fun getWelcomeMessage(guild: Guild): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        val root: Node = reader.root
        val defaultRole: Node = reader.stepDown(root)
        val welcomeMessage: Node = reader.stepOver(defaultRole)
        return reader.getValue(welcomeMessage)
    }

    fun getWelcomeMessageChannel(guild: Guild): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        val index = 3
        var node: Node = reader.stepDown(reader.root)
        for (i in 1 until index) node = reader.stepOver(node)
        return reader.getValue(node)
    }

    fun setWelcomeMessage(guild: Guild, message: String) {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        var node: Node = reader.stepDown(reader.root)
        node = reader.stepOver(node, 2)
        reader.setValue(node, message)
    }

    private fun retriveNames(): ArrayList<String> {
        val names = ArrayList<String>()
        val root: Node = reader.root // The top level element in the document
        Botmain.debug("Root: " + root.nodeName) // Debug info
        var person: Node = reader.stepDown(root)
        var memberName: Node
        do {
            memberName = reader.stepDown(person) // Gets the <name> tag
            val nodeValue: String = reader.getValue(memberName) // Gets the name text value
            names.add(nodeValue) // Adds the name to the list of names
            if (debug) println("Found person: $nodeValue in the database")
        } while (reader.stepOver(person).also { person = it } != null)
        return names
    }

    private fun getPersonNode(username: String): Node {
        var username = username
        username = username.lowercase(Locale.getDefault())
        Botmain.debug(31.toChar().toString() + "Starting getPersonNode function with: " + username)
        reader.setDocument(guildPath + "MemberData.xml")
        var person = firstPerson
        Botmain.debug(32.toChar().toString() + "First person is: " + reader.getValue(reader.stepDown(person)))
        while (person != null) {
            val nameNode: Node = reader.stepDown(person)
            val name: String = reader.getValue(nameNode).toLowerCase()
            Botmain.debug("Found person: $name")
            if (name.lowercase(Locale.getDefault()) == username) break
            person = reader.stepOver(person)
        }
        Botmain.debug("Ending getPersonNode function with: $username")
        return person
    }

    private val firstPerson: Node
        private get() = reader.stepDown(reader.root)

    private fun getPointsNode(personNode: Node): Node {
        Botmain.debug("Starting getPointsNode function with: $personNode")
        val nameTag: Node = reader.stepDown(personNode)
        Botmain.debug("getPointsNode() Teh naem of the person is: " + reader.getValue(nameTag))
        val pointsNode: Node = reader.stepOver(nameTag)
        Botmain.debug("getPointsNode() returning $pointsNode")
        return pointsNode
    }

    private fun setGuildString(guild: Guild) {
        guildPath = "guildData/" + guild.name + "/"
    }

    fun setPlaylist(guild: Guild, playlistName: String?) {
        playlistDecoder.setPlayList(guild, playlistName)
    }

    fun nextSong(): String? {
        return playlistDecoder.nextSong
    }

    fun makePlaylist(guild: Guild, playlistName: String?) {
        playlistDecoder.makePlaylist(guild, playlistName)
    }

    fun addSong(guild: Guild, name: String?) {
        playlistDecoder.addSong(guild, name)
    }

    internal inner class PlaylistDecoder {
        private var playlist: String? = null
        private var onSong = 0
        fun setPlayList(guild: Guild, playlist: String?) {
            this.playlist = playlist
            onSong = 0
            setDoc(guild)
        }

        val nextSong: String?
            get() {
                var node = findPlaylist(playlist)
                node = reader.stepDown(node)
                node = reader.stepOver(node, onSong++)
                return if (node == null) null else reader.getValue(node)
            }

        fun makePlaylist(guild: Guild, playlist: String) {
            setDoc(guild)
            reader.newChild(reader.root, "Playlist", playlist)
        }

        fun addSong(guild: Guild, name: String) {
            setDoc(guild)
            reader.newChild(findPlaylist(playlist), "song", name)
        }

        fun listPlaylists(guild: Guild): ArrayList<String> {
            val playlists = ArrayList<String>()
            setDoc(guild)
            var playlist: Node = reader.stepDown(reader.root)
            while (playlist != null) {
                playlists.add(reader.getValue(playlist))
                playlist = reader.stepOver(playlist)
            }
            return playlists
        }

        private fun findPlaylist(name: String?): Node {
            var name = name
            var node: Node
            name = name!!.lowercase(Locale.getDefault())
            node = reader.stepDown(reader.root)
            while (node != null && !reader.getValue(node).toLowerCase().startsWith(name)) {
                Botmain.debug("Found playlist: " + reader.getValue(node))
                node = reader.stepOver(node)
            }
            return node
        }

        private fun setDoc(guild: Guild) {
            setGuildString(guild)
            reader.setDocument(guildPath + "Playlists.xml")
        }

        fun listSongs(guild: Guild, playlistName: String?): ArrayList<String> {
            setDoc(guild)
            val songNames = ArrayList<String>()
            val playlist = findPlaylist(playlistName)
            var song: Node = reader.stepDown(playlist)
            while (song != null) {
                songNames.add(reader.getValue(song))
                song = reader.stepOver(song)
            }
            return songNames
        }
    }

    fun listPlaylists(guild: Guild): ArrayList<String> {
        return playlistDecoder.listPlaylists(guild)
    }

    fun listSongs(guild: Guild, string: String?): ArrayList<String> {
        return playlistDecoder.listSongs(guild, string)
    }

    fun getTimeZone(guild: Guild, member: Member): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        val timeNode: Node = reader.getChild(personNode, "time")
        val timezone: Node = reader.getChild(timeNode, "timezone")
        return reader.getValue(timezone)
    }

    fun setTimeZone(guild: Guild, member: Member, timezone: Int) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        val timeNode: Node = reader.getChild(personNode, "time")
        val timezoneNode: Node = reader.getChild(timeNode, "timezone")
        reader.setValue(timezoneNode, timezone.toString())
    }

    fun setDST(guild: Guild, member: Member, start: Boolean, rawInput: String) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        val timeNode: Node = reader.getChild(personNode, "time")
        val dstNode: Node = reader.getChild(timeNode, if (start) "dststart" else "dstend")
        reader.setValue(dstNode, rawInput)
    }

    fun getDST(guild: Guild, member: Member, start: Boolean): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        val timeNode: Node = reader.getChild(personNode, "time")
        val dstNode: Node = reader.getChild(timeNode, if (start) "dststart" else "dstend")
        return reader.getValue(dstNode)
    }

    fun addDuplicatedChannel(own: Guild, source: Guild, channel: TextChannel) {
        setGuildString(own)
        reader.setDocument(guildPath + "DuplicatedChannels.xml")
        val root: Node = reader.root
        val id = source.id.replace("\n".toRegex(), "")
        lateinit var sourceGuildNode: Node
        var foundExisting = false
        for (child in reader.getChildren(reader.root)) if (reader.getValue(child).replace("\n", "").equals(id)) {
            foundExisting = true
            sourceGuildNode = child
            break
        }
        if (!foundExisting) sourceGuildNode = reader.newChild(root, "Server", id)
        reader.newChild(sourceGuildNode, "Channel", channel.id)
    }

    val duplicates: HashMap<Guild, HashMap<Guild, ArrayList<TextChannel>>>
        get() {
            val duplicates = HashMap<Guild, HashMap<Guild, ArrayList<TextChannel>>>()
            for (g in Botmain.jda!!.guilds) {
                duplicates[g] = HashMap()
                setGuildString(g)
                reader.setDocument(guildPath + "DuplicatedChannels.xml")
                for (n in reader.getChildren(reader.root)) {
                    val sourceGuild: Guild = Botmain.jda.getGuildById(reader.getValue(n).replace("\n", "").trim())!!
                    duplicates[g]!![sourceGuild] = ArrayList()
                    for (channelNode in reader.getChildren(n)) {
                        duplicates[g]!![sourceGuild]!!.add(sourceGuild.getTextChannelById(reader.getValue(channelNode)))
                    }
                }
            }
            return duplicates
        }

    fun addTag(fileName: String, name: String?, value: String?) {
        for (guild in Botmain.jda!!.guilds) {
            setGuildString(guild)
            reader.setDocument("$guildPath$fileName.xml")
            var parentNode: Node? = null
            parentNode = when (fileName.lowercase(Locale.getDefault())) {
                "memberdata" -> reader.stepDown(reader.getRoot())
                "guilddata" -> reader.getRoot()
                else -> throw IllegalArgumentException("invalid file name")
            }
            do {
                reader.newChild(parentNode, name, value)
            } while (reader.stepOver(parentNode).also { parentNode = it } != null)
        }
    }

    fun removeTag(fileName: String, tag: String?) {
        for (guild in Botmain.jda!!.guilds) {
            setGuildString(guild)
            reader.setDocument("$guildPath$fileName.xml")
            var parentNode: Node? = null
            parentNode = when (fileName.lowercase(Locale.getDefault())) {
                "memberdata" -> reader.stepDown(reader.getRoot())
                "guilddata" -> reader.getRoot()
                else -> throw IllegalArgumentException("invalid file name")
            }
            do {
                reader.removeTag(parentNode, tag)
            } while (reader.stepOver(parentNode).also { parentNode = it } != null)
        }
    }

    fun getLastMatchID(guild: Guild, member: Member): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val person = getPersonNode(member.user.name)
        val id: Node = reader.getChild(person, "match")
        return reader.getValue(id)
    }

    fun setMatch(guild: Guild, member: Member, newID: String?) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val person = getPersonNode(member.user.name)
        val id: Node = reader.getChild(person, "match")
        reader.setValue(id, newID)
    }

    fun getD2MatchChannel(guild: Guild): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        val channelIDNode: Node = reader.getChild(reader.getRoot(), "d2matchinfochannel")
        return reader.getValue(channelIDNode)
    }

    fun setD2MatchChannel(guild: Guild, channelName: String?) {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        val channelIDNode: Node = reader.getChild(reader.getRoot(), "d2matchinfochannel")
        System.out.println("Before: " + reader.getValue(channelIDNode))
        reader.setValue(channelIDNode, channelName)
        System.out.println("After: " + reader.getValue(channelIDNode))
    }

    fun addRequest(guild: Guild, requested: Member, requester: Member) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val requestedName = requested.user.name
        val requesterName = requester.user.name
        val requestedPersonNode = getPersonNode(requestedName)
        val requestedby: Node = reader.getChild(requestedPersonNode, "requestedby")
        if (reader.getValue(requestedby).equals("none") || reader.getValue(requestedby).equals("")) reader.setValue(
            requestedby,
            "$requesterName "
        ) else reader.setValue(requestedby, reader.getValue(requestedby).concat("$requesterName "))
    }

    fun removeRequest(guild: Guild, requested: Member, requester: Member) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val requestedName = requested.user.name
        val requesterName = requester.user.name
        val personNode = getPersonNode(requestedName)
        val requestedby: Node = reader.getChild(personNode, "requestedby")
        val requests: String = reader.getValue(requestedby)
        requests.replaceFirst("$requesterName ".toRegex(), "")
    }

    fun getRequesters(guild: Guild, requested: User): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(requested.name)
        return reader.getValue(reader.getChild(personNode, "requestedby"))
    }

    fun getContents(guild: Guild, person: String): Array<String?> {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(person)
        val contents = personNode!!.childNodes
        val names = arrayOfNulls<String>(contents.length)
        for (i in 0 until contents.length) names[i] = contents.item(i).nodeName
        return names
    }

    fun removeSongFromPlaylist(guild: Guild, song: String?, playlist: String?) {
        setGuildString(guild)
        reader.setDocument(guildPath + "Playlists.xml")
        val root: Node = reader.getRoot()
        var playlistNode: Node? = null
        for (node in reader.getChildren(root)) if (reader.getValue(node).equals(playlist)) playlistNode = node
        reader.removeTagByText(playlistNode, song)
    }

    var recordedPatch: String?
        get() {
            reader.setDocument("BotData.xml")
            val root: Node = reader.getRoot()
            val patchNode: Node = reader.getChild(root, "dotapatch")
            return reader.getValue(patchNode)
        }
        set(patch) {
            reader.setDocument("BotData.xml")
            val root: Node = reader.getRoot()
            val patchNode: Node = reader.getChild(root, "dotapatch")
            reader.setValue(patchNode, patch)
        }

    fun getDotaPatchNotesChannel(guild: Guild): String {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        val root: Node = reader.getRoot()
        val channel: Node = reader.getChild(root, "dotapatchnoteschannel")
        return reader.getValue(channel)
    }

    fun setDotaPatchNotesChannel(guild: Guild, channelName: String?) {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        val root: Node = reader.getRoot()
        val channel: Node = reader.getChild(root, "dotapatchnoteschannel")
        reader.setValue(channel, channelName)
    }

    val catCounter: String
        get() {
            reader.setDocument("Botdata.xml")
            val counterNode: Node = reader.getChild(reader.getRoot(), "catcounter")
            val counterText: String = reader.getValue(counterNode)
            val counter = counterText.toInt() + 1
            reader.setValue(counterNode, counter.toString())
            return counterText
        }

    fun setGreetActive(guild: Guild, valueOf: String?) {
        setGuildString(guild)
        reader.setDocument(guildPath + "GuildData.xml")
        var greetingActive: Node
    }

    fun setGameID(guild: Guild, member: Member, gameName: String?, memberID: String?) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        val id: Node = reader.getChild(personNode, "IDs")
        val gameNode: Node = reader.getChild(id, gameName)
        if (gameNode == null) reader.newChild(id, gameName, memberID) else reader.setValue(gameNode, memberID)
    }

    fun getID(guild: Guild, member: Member, gameName: String?): String? {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        val id: Node = reader.getChild(personNode, "IDs")
        val gameNode: Node = reader.getChild(id, gameName)
        return if (gameNode == null) null else reader.getValue(gameNode)
    }

    fun setMoney(guild: Guild, member: Member, value: Int) {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        reader.setValue(reader.getChild(personNode, "money"), value.toString())
    }

    fun getMoney(guild: Guild, member: Member): Int {
        setGuildString(guild)
        reader.setDocument(guildPath + "MemberData.xml")
        val personNode = getPersonNode(member.user.name)
        if (!reader.nodeHasChild(personNode, "money")) reader.newChild(personNode, "money", "1000")
        return reader.getValue(reader.getChild(personNode, "money")).toInt()
    }

    fun setWelcomeMessageID(guild: Guild, channel: TextChannel, message: Message) {
        setDocument(guild, "GuildData.xml")
        val parent: Node = reader.getChild(reader.getRoot(), "welcomeMessages")
        val id: Node = reader.newChild(parent, "welcomeMessage")
        reader.newChild(id, "channel", channel.id)
        reader.newChild(id, "message", message.id)
    }

    fun getWelcomeMessageIDs(guild: Guild): List<Pair<String, String>> {
        setDocument(guild, "GuildData.xml")
        val welcomeMessageIDs = ArrayList<Pair<String, String>>()
        reader.getChildren(reader.getChild(reader.getRoot(), "welcomeMessages")).forEach { parent ->
            val channel: Node = reader.getChild(parent, "channel")
            val message: Node = reader.getChild(parent, "message")
            welcomeMessageIDs.add(
                Pair.of(
                    reader.getValue(channel),
                    reader.getValue(message)
                )
            )
        }
        return welcomeMessageIDs
    }

    fun addReactionRole(guild: Guild, emote: Emoji, role: Role) {
        setDocument(guild, "GuildData.xml")
        val rrsNode: Node = reader.getChild(reader.getRoot(), "reactionRoles")
        val rrNode: Node = reader.newChild(rrsNode, "reactionRole")
        reader.newChild(rrNode, "emote", emote.name)
        reader.newChild(rrNode, "role", role.id)
    }

    fun getGameEmoteIDs(guild: Guild): List<String> {
        setDocument(guild, "GuildData.xml")
        val rrsNode: Node = reader.getChild(reader.getRoot(), "reactionRoles")
        val emoteIDs = ArrayList<String>()
        reader.getChildren(rrsNode).forEach { combination ->
            emoteIDs.add(
                reader.getValue(
                    reader.getChild(
                        combination,
                        "emote"
                    )
                )
            )
        }
        return emoteIDs
    }

    fun getCorrespondingRoleID(guild: Guild, emote: Emoji): String? {
        setDocument(guild, "GuildData.xml")
        val rrsNode: Node = reader.getChild(reader.getRoot(), "reactionRoles")
        for (n in reader.getChildren(rrsNode)) if (reader.getValue(reader.getChild(n, "emote"))
                .equals(emote.name)
        ) return reader.getValue(reader.getChild(n, "role"))
        return null
    }

    protected fun setDocument(guild: Guild, docName: String) {
        setGuildString(guild)
        reader.setDocument(guildPath + docName)
    }

    fun createGuildDatabase(guild: Guild) {
        setGuildString(guild)
        File(guildPath).mkdirs()
        val guildData = Arrays.asList(
            "<data>",
            "<defaultRole>online</defaultRole>",
            "<welcomeMessage>hello</welcomeMessage>",
            "<d2matchinfochannel>none</d2matchinfochannel>",
            "<dotapatchnoteschannel>none</dotapatchnoteschannel>",
            "</data>",
            "<welcomeMessages></welcomeMessages>",
            "<reactionRoles></reactionRoles>"
        )
        val guildDataPath = Paths.get(guildPath + "GuildData.xml")
        val people = Arrays.asList("<People>\n", "</People>")
        val peoplePath = Paths.get(guildPath + "MemberData.xml")
        val ranks = Arrays.asList("<Enlisted>\n", "</Enlisted>")
        val ranksPath = Paths.get(guildPath + "AutoPromotionRanks.xml")
        val duplicatedChannels = Arrays.asList("<Duplicates>\n", "</Duplicates>")
        val duplicatesPath = Paths.get(guildPath + "DuplicatedChannels.xml")
        try {
            Files.write(guildDataPath, guildData, Charset.forName("UTF-8"))
            Files.write(peoplePath, people, Charset.forName("UTF-8"))
            Files.write(ranksPath, ranks, Charset.forName("UTF-8"))
            Files.write(duplicatesPath, duplicatedChannels, Charset.forName("UTF-8"))
        } catch (e: IOException) {
            e.printStackTrace()
        }
        updateServerDatabase(guild)
    }

    fun modBotDataValue(name: String, value: String) {
        reader.setDocument("BotData.xml")
        modCurrentDocValue(name, value)
    }

    fun getBotDataValue(name: String): String {
        reader.setDocument("BotData.xml")
        return getCurrentDocValue(name)
    }

    fun modGuildDataValue(guild: Guild, name: String, value: String) {
        setDocument(guild, "GuildData.xml")
        modCurrentDocValue(name, value)
    }

    fun getGuildDataValue(guild: Guild, name: String): String {
        setDocument(guild, "GuildData.xml")
        return getCurrentDocValue(name)
    }

    fun getUserValue(guild: Guild, member: Member, name: String?): String {
        val person = goToPerson(guild, member)
        return reader.getValue(reader.getChild(person, name))
    }

    fun setUserValue(guild: Guild, member: Member, name: String?, value: String?) {
        val person = goToPerson(guild, member)
        reader.setValue(reader.getChild(person, name), value)
    }

    private fun goToPerson(guild: Guild, member: Member): Node? {
        setDocument(guild, "MemberData.xml")
        return getPersonNode(member.user.name)
    }

    private fun modCurrentDocValue(name: String, value: String) {
        val node: Node = reader.getChild(reader.getRoot(), name)
        reader.setValue(node, value)
    }

    private fun getCurrentDocValue(name: String): String {
        val node: Node = reader.getChild(reader.getRoot(), name)
        return reader.getValue(node)
    }

    fun removeWelcomeMessage(guild: Guild, messageId: String) {
        setDocument(guild, "GuildData.xml")
        val welcomeMessages: Node = reader.getChild(reader.getRoot(), "welcomeMessages")
        var deletedMessage: Node? = null
        for (welcomeMessage in reader.getChildren(welcomeMessages)) {
            val messageNode: Node = reader.getChild(welcomeMessage, "message")
            val messageID: String = reader.getValue(messageNode)
            if (messageID == messageId) {
                deletedMessage = welcomeMessage
                break
            }
        }
        reader.removePossibleTag(welcomeMessages, deletedMessage)
    }
}