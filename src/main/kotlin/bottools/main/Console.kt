package BotTools.main

import BotTools.main.Parser.CommandContainer
import net.dv8tion.jda.api.OnlineStatus
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Member
import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel
import java.io.ByteArrayInputStream
import java.io.IOException
import java.io.InputStream
import java.util.*

class Console : Thread() {
    private lateinit var commandInfo: CommandContainer
    private var args = ArrayList<String>()
    private lateinit var commandName : String
    private val scanner = Scanner(System.`in`)
    private lateinit var channel : String
    private lateinit var guild : String
    private lateinit var user : Member
    private var running = false
    override fun run() {
        running = true
        Botmain.out("The console is active")
        while (running) try {
            scan()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        Botmain.out("Console thread has terminated")
    }

    @Throws(IOException::class, ImproperConsoleCommandUseException::class, InterruptedException::class)
    private fun scan() {
        sleep(100)
        if (scanner.hasNext()) {
            val command = scanner.nextLine()
            parse(command)
        }
    }

    @Throws(IOException::class, ImproperConsoleCommandUseException::class)
    private fun parse(command: String): Boolean {
        commandInfo = Parser.parse(command)
        args = commandInfo.args
        name = commandInfo!!.commandName
        return when (name) {
            "set" -> {
                if (commandInfo!!.args == null || args.size == 0) Botmain.out("Invalid command arguments") else if (args[0] == "channel") if (args.size < 2 || args[1] == null || args[1] == "") Botmain.out(
                    "No channel type specified"
                ) else if (commandInfo!!.args[1] == "text") if (commandInfo!!.args.size < 3 || commandInfo!!.args[2] == null || commandInfo!!.args[2] == "") Botmain.out(
                    "No text channel specified"
                ) else channel =
                    commandInfo!!.args[2] else if (commandInfo!!.args[1] == "voice") Botmain.jda!!.getVoiceChannelsByName(
                    commandInfo!!.args[2]!!, true
                )[0] else Botmain.out("Improper channel type") else if (commandInfo!!.args[0] == "points" || commandInfo!!.args[0] == "promotionpoints") if (commandInfo!!.args.size < 2) Botmain.out(
                    "Invalid arguments"
                )
                true
            }

            "showchat" -> {
                if (args.size != 1) throw ImproperConsoleCommandUseException(
                    "showchat",
                    "Incorrect number of arguments. Required: 1. Provided: " + args.size
                )
                val channel = user!!.user.openPrivateChannel().complete()
                val history = channel.history
                val size = args[0]!!.toInt()
                val messages = history.retrievePast(size).complete()
                var i = messages.size
                while (i > 0) {
                    Botmain.out(messages[i - 1].contentRaw)
                    i--
                }
                true
            }

            "update" -> {
                Botmain.gdp.updateServerDatabase()
                true
            }

            "listservers" -> {
                for (g in Botmain.jda!!.guilds) Botmain.out(g.name)
                true
            }

            "test" -> {
                Botmain.jda!!.presence.setStatus(OnlineStatus.IDLE)
                //TODO Botmain.jda.getPresence().setGame(Game.playing("with himself"));;
                Botmain.jda!!.presence.setStatus(OnlineStatus.ONLINE)
                true
            }

            "addtag" -> {
                if (args.size == 3) Botmain.gdp.addTag(
                    args[0],
                    args[1],
                    args[2]
                ) else if (args.size == 2) Botmain.gdp.addTag(
                    args[0], args[1], ""
                )
                true
            }

            "removetag" -> {
                Botmain.gdp.removeTag(args[0], args[1])
                true
            }

            "print" -> {
                Botmain.out(args[0])
                true
            }

            "checkpersoncontents" -> {
                for (s in Botmain.gdp.getContents(guild, args[0])) out(s)
                true
            }

            "sayemoji" -> {
                val emoji =  //guild.getEmotesByName(args[0], true).get(0).getAsMention();
                    Botmain.jda!!.getEmojisByName("dota", true)[0].asMention
                //TODO guild.getDefaultChannel().sendMessage(emoji).complete();
                true
            }

            else -> commandNotFoundMessage()
        }
    }

    internal inner class ImproperConsoleCommandUseException(var commandName: String, var issue: String) :
        Exception() {
        override fun printStackTrace() {
            Botmain.out("The command " + commandName + "was used incorrectly")
            System.err.println(issue)
            super.printStackTrace()
        }
    }

    fun out(text: String?) {
        println(text)
    }

    private fun commandNotFoundMessage(): Boolean {
        Botmain.out("The entered data was not a generic console command")
        return false
    }
}