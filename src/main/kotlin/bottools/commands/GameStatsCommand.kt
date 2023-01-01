package bottools.commands

import bottools.commands.OrganizationCommand.orgData
import bottools.dataprocessing.*
import bottools.main.Bot
import bottools.services.ServiceCommand

abstract class GameStatsCommand protected constructor(protected var gameName: String) : OnlineCommand(gameName) {
    protected var tagSymbol = "#"
    protected val userOption            = Option("user", "name", "the server member whose game you want to see", false);
    protected val targetMemberOption    = Option("user", "person", "the person whose game id you want to set", false)
    protected val show = this + "show"
    protected val id = this + "id"
    protected val last = this + "last"
    protected val showStats: SubCommand =
        MethodCommand(::showStats, "showstats", "Show the target player's stats", this)
            .also {this + (it + userOption) }
    protected val lastGame: SubCommand =
        MethodCommand(::lastGame, "lastgame", "Show the stats from the last game that was played",this)
            .also{this + (it + userOption) }
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

    protected inner class SCSetID() : SubCommand("setid", this@GameStatsCommand) {
        init {
            helpMessage = ("""sets the game id of the mentioned user"
                    "For example:"
                    ${this@GameStatsCommand.name} setid *in-game id* @forthisperson` to set the ID for the mentioned user. Or"
                    ${this@GameStatsCommand.name} setid *in-game id*` to set the ID for yourself""".trimIndent())
        }

        fun init() {
            val id = Option("string", "id", "the steam/dotabuff id", true)
            val tagline = Option("string", "tagline", "the tag number associated with this id", false)
            this + id + tagline + targetMemberOption
        }

        override fun invoke(args: Array<String>){
            var tagline = getOption("tagline").asString
            if (Character.isDigit(tagline[0]))  //if the first character of the tagline is numeric
                tagline = tagSymbol + tagline   //then add tag symbol to the beginning of it
            val fullTag = args[0] + tagline
            userID = fullTag
            reply("The $gameName ID of ${targetMember!!.effectiveName} has been set to $fullTag")
        }
    }

    inner class SCGetID() : SubCommand("getid", this@GameStatsCommand) {
        init {
            helpMessage = "Shows the recorded game ID for the mentioned user or for yourself if no user is mentioned"
            this + targetMemberOption
        }

        override operator fun invoke(args: Array<String>){
            if(userID.isNullOrBlank())  sendNoIDMessage()
            else                        reply("The in-game ID of " + (targetMember!!.user.name) + " is " + userID)
        }
    }
    /**
     * Returns the in-game username of the guild member that is the target of this command
     * @return In-game username of the target member
     */
    protected var userID: String?
        get()       = D/guild/targetMember!!/"IDs"-gameName
        set(value)  = D/guild/targetMember!!/"IDs"/gameName+value!!

    protected fun sendNoIDMessage() {
        reply(
            "This person's " + gameName + " ID has not been set. Use:\n"
                    + "`/" + name + " setid *in-game id* @forthisperson` to set someone's ID"
        )
    }

    protected abstract fun showStats(args: Array<String>)
    protected abstract fun lastGame(args: Array<String>)
    protected open infix fun postPatchNotes(value: String){}
    protected fun createPatchNotesService() {
        ServiceCommand.createService(
            "game services/$gameName",
            ::postPatchNotes, 10
        )
    }
}

