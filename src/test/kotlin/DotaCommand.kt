import bottools.commands.GameStatsCommand

class DotaCommand: GameStatsCommand("DOTA2") {
    init{
        createPatchNotesService()
    }
    override fun showStats(args: Array<String>) {
        println("show stats test proc")
    }

    override fun lastGame(args: Array<String>) {
        println("last game test proc")
    }

    override fun postPatchNotes(value: String){
        println("post patch notes test proc")
    }

    override fun invoke(args: Array<String>) {}

}