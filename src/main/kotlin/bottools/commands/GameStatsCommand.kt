package bottools.commands

import bottools.commands.OrganizationCommand.orgData
import bottools.dataprocessing.div
import bottools.dataprocessing.minus
import bottools.dataprocessing.setValue
import bottools.main.Bot
import bottools.services.ServiceCommand

abstract class GameStatsCommand protected constructor(protected var gameName: String) : OnlineCommand(gameName) {
    protected var tagSymbol = "#"
    protected val show by lazy { this + "show" }
    protected val id by lazy { this + "id" }
    protected val last by lazy{ this + "last" }
    protected val showStats: SubCommand by lazy {
        val showStats = MethodCommand(::showStats, "showstats", "Show the target player's stats")
        this + (showStats + userOption) as SubCommand
        showStats
    }
    protected val lastGame: SubCommand by lazy {
        val lastGame = MethodCommand(::lastGame, "lastgame", "Show the stats from the last game that was played")
        this + (lastGame + userOption) as SubCommand
        lastGame
    }
    private val userOption = Option("user", "name", "the server member whose game you want to see", false);
    init {
        isSubCommandRequired(true)
        makeInteractible()

        this + SCSetID() + SCGetID()

        last + orgData("game", "lastgame")

        set.addCommand("id", "setid")
        get.addCommand("id", "getid").addCommand("stats", "showstats")
        id.addCommand("set", "setid").addCommand("get", "getid")
            .addCommand("show", "getid")
        show.addCommand("id", "getid").addCommand("stats", "showstats")
    }
    val targetMemberOption = Option("user", "person", "the person whose game id you want to set", false)

    protected inner class SCSetID() : SubCommand("setid") {
        init {
            helpMessage = ("sets the game id of the mentioned user\n"
                    + "For example:\n"
                    + "`/" + this@GameStatsCommand.name + " setid *in-game id* @forthisperson` to set the ID for the mentioned user. Or\n"
                    + "`/" + this@GameStatsCommand.name + " setid *in-game id*` to set the ID for yourself")
        }

        fun init() {
            val id = Option("string", "id", "the steam/dotabuff id", true)
            val tagline = Option("string", "tagline", "the tag number associated with this id", false)
            this + id + tagline + targetMemberOption
        }

        override fun invoke(args: Array<String>){
            var tagline = getOption("tagline").asString
            if (Character.isDigit(tagline[0])) //if the first character of the tagline is numeric
                tagline = tagSymbol + tagline
            val fullTag = args[0] + tagline
            Bot.data/guild/targetMember!!/"IDs"/gameName setValue fullTag
            reply("The $gameName ID of ${targetMember!!.effectiveName} has been set to $fullTag")
        }
    }

    inner class SCGetID() : SubCommand("getid") {
        init {
            helpMessage = "Shows the recorded game ID for the mentioned user or for yourself if no user is mentioned"
            this + targetMemberOption
        }

        override operator fun invoke(args: Array<String>){
            val id = userID
            if(id.isNullOrBlank()) sendNoIDMessage()
            else                   reply("The in-game ID of " + (targetMember?.user?.name) + " is " + id)
        }
    }

    /**
     * Returns the in-game username of the guild member that is the target of this command
     * @return In-game username of the target member
     */
    protected val userID: String?
        protected get() = Bot.data/guild/targetMember!!/"IDs"-gameName

    protected fun sendNoIDMessage() {
        reply(
            "This person's " + gameName + " ID has not been set. Use:\n"
                    + "`/" + name + " setid *in-game id* @forthisperson` to set someone's ID"
        )
    }

    protected abstract fun showStats(args: Array<String>)
    protected abstract fun lastGame(args: Array<String>)
    protected abstract fun postPatchNotes(value: String?): Void
    private fun startPatchNotesService() {
        ServiceCommand.createService(
            "game services/$gameName",
            { value: String? -> postPatchNotes(value) }, 3600
        )
    }
}

