import bottools.botactions.contains
import bottools.botactions.online.save
import bottools.botactions.say
import bottools.commands.GameStatsCommand
import bottools.main.Bot
import bottools.services.CheckValueService
import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel
import java.awt.Color
import java.awt.image.BufferedImage
import java.io.File
import java.io.IOException
import javax.imageio.ImageIO


class DotaCommand: GameStatsCommand("dota2") {
    private val dotabuffURL = "http://www.dotabuff.com"
    private val patchNoteURL = "https://steamdb.info/api/PatchnotesRSS/?appid=570"
    init {
        //createPatchNotesService()
        createdUserGamesService()
    }
    override fun invoke(args: Array<String>) {}
    protected fun openDB(urlSuffix: String, actions:()->Unit) = open("$dotabuffURL/$urlSuffix", actions)
    override fun lastGame(args: Array<String>, auto: Boolean) = showLastGameStats(auto)
    override fun showStats(args: Array<String>) {
        println("show stats test proc")
    }


    override fun postPatchNotes(value: Array<String>){
        println("post patch notes test proc")
        open(patchNoteURL){
            //skipLines(1)
            
        }
    }

    private fun showLastGameStats(auto: Boolean = false) {
        openDB("players/$userID") {
            mapValueByKey("dbicon")
        }
        openDB("players/$userID/matches") {
            mapValueByKey("steam name");
            mapValueByKey("hero name")
            "hero image".let { valueMap.put(it, getValueFromKey(it))}
            mapValueByKey("match outcome", "kills", "deaths", "assists")
        }
        openDB("players/$userID/matches"){
            mapValueByKey("match id");
        }
        val matchID = valueMap["match id"]
        openDB("matches/$matchID") {
            mapValueByKey("duration", "radiant score", "dire score")
            cutToAfter(valueMap["steam name"]!!)
            mapValueByKey("net worth", "lasthit", "deny", "gpm", "xpm", "damage", "healing")
            if (valueMap["healing"]!!.startsWith("<"))
                valueMap["healing"] = ""
            mapValueByKey("building damage")
        }
        getImageLine()

        // Talents
        var talentName: String
        var isActive: Boolean
        valueMap["talents description"] = ""
        openDB("matches/$matchID") {
            //Navigate to the talents line
            cutToAfter("talents cell-divider")
            cutToAfter(valueMap["hero name"]!!)
            for (i in 0..7) {
                cutToAfter("talent-cell")
                isActive = data.startsWith(" active")
                talentName = getValueFromKey("talent")
                if (isActive) talentName = "**$talentName**"
                talentName += if (i % 2 == 0) " vs " else "\n"
                valueMap["talents description"] += talentName
            }
        }

        // Decide which channel to post the match info in
        // Automatic posts in the auto channel and requested posts in the same channel as the command
        val channel:MessageChannel =
            if (auto) {
                if(matchesChannel == null || matchesChannel == "" || matchesChannel == "none") guild.defaultChannel as MessageChannel
                else guild.getTextChannelById(matchesChannel!!) as MessageChannel
            }
            else this.channel

        // State who played the game
        if (auto) Bot say "${member.asMention} played a DOTA2 game" in channel

        valueMap.let {eb
            .setColor(if(it["match outcome"]!!.lowercase() == "won") Color.GREEN else Color.RED)
            .setAuthor(it["steam name"], "$dotabuffURL/players/$userID", it["dbicon"])
            .setTitle(it["hero name"], "https://www.dotabuff.com/matches/$matchID")
            .setThumbnail("http://dotabuff.com${it["hero image"]}")
            .setTitle(it["match outcome"]!!.uppercase(),"https://www.dotabuff.com/matches/$matchID")
            .setDescription("Radiant  ${it["radiant score"]} : ${it["dire score"]}  Dire\nDuration: ${it["duration"]}")
            .addField("K/D/A", "${it["kills"]}\n${it["deaths"]}\n${it["assists"]}", true)
            .addField("Farm", "LH/DN:           ${it["lasthit"]}/${it["deny"]}\nGPM/XPM:   ${it["gpm"]}/${it["xmp"]}\nNet Worth:  ${it["gold earned"]}", true)
            .addField("Damage", "Hero Damage:     ${it["damage"]}\nHealing:      ${it["healing"]}\nTower Damage:  ${it["tower damage"]}", true) //.addField("Talents", talentDesc, true)
            .setImage("attachment://itemline.png")
            .setFooter(// Make sure that the footer states whether this is an automatic post or not, and if not then who requested it
                if (auto) "Automated message" else "Requested by " + member.effectiveName,
                if (auto) Bot.jda!!.selfUser.avatarUrl else member.user.avatarUrl
            )
        }
        sendEmbed(channel, "res/itemline.png")
        eb.setAuthor("Talents").setDescription(valueMap["talents description"])
        sendEmbed(channel)

    }
    private fun getImageLine() {
        val itemline: BufferedImage
        try {
            val numImages = getImages()
            val imgSize = 48
            itemline = BufferedImage(numImages * imgSize, imgSize, BufferedImage.TYPE_INT_ARGB)
            val g = itemline.graphics

            // Draw images
            var itemImage: BufferedImage
            for (i in 1..numImages) {
                itemImage = ImageIO.read(File("res/img$i.png"))
                g.drawImage(
                    itemImage,
                    imgSize * (i - 1),
                    0,
                    imgSize * i,
                    imgSize,
                    0,
                    0,
                    itemImage.width,
                    itemImage.height,
                    null
                )
            }
            ImageIO.write(itemline, "png", File("res/itemline.png"))
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    private fun getImages(): Int {
        for (i in 1..6) {
            Bot save ("https://www.dotabuff.com${getValueFromKey("item image")}") to "res/img$i.png"
            cutToAfter("</a></div></div>")
            if (!data.startsWith("<div class=\"match-item-with-time")) return i
        }
        return 6
    }
}