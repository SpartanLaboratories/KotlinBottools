package bottools.main

import bottools.botactions.contains
import bottools.botactions.say
import bottools.commands.Command
import bottools.commands.HelpCommand
import bottools.dataprocessing.BaseXMLReader
import bottools.dataprocessing.D
import bottools.main.Parser.CommandContainer
import net.dv8tion.jda.api.JDA
import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.events.interaction.command.MessageContextInteractionEvent
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent
import net.dv8tion.jda.api.events.interaction.command.UserContextInteractionEvent
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import net.dv8tion.jda.api.exceptions.InsufficientPermissionException
import net.dv8tion.jda.api.interactions.commands.build.CommandData
import net.dv8tion.jda.api.requests.GatewayIntent
import net.dv8tion.jda.api.utils.MemberCachePolicy
import net.dv8tion.jda.api.utils.cache.CacheFlag
import org.slf4j.LoggerFactory
import org.w3c.dom.Node
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.io.IOException
import java.time.Instant
import java.time.ZoneOffset
import java.util.*
import java.util.function.Predicate

abstract class Bot : Runnable {
    var log = LoggerFactory.getLogger(Bot::class.java)
    init {
        /* In case I want to see logger status messages
		LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
	    StatusPrinter.print(lc);
	    */
        log.info("Begun bot initialization")
        running = true
        debug = false
        startTime = System.currentTimeMillis() + 18 * 3600000

        // My systems
        console = Console()
        console.start()

        // Bot setup
        initializeBotExistence()

        // My Systems again
        D.updateServerDatabase() //Must be after bot and console initialization

        //Commands
        createCommand(HelpCommand())
        listCommands()
        createAllSlashCommands()

        reader.setDocument("BotData.xml")
        //new Thread(this).start();
    }

    private fun initializeBotExistence() {
        log.info("Starting bot creation")
        try {
            BufferedReader(FileReader(File("key.txt"))).use { keyReader ->
                for (i in keys.indices) keys[i] = keyReader.readLine()
            }
        } catch (e: IOException) {
            e.printStackTrace()
        } catch (e: Exception) {
            log.error("An unknown error has occurred while parsing the bot's key file.")
        }
        log.debug("Successfully read bot key.\nStarting jda building.")
        try {
            jda = JDABuilder.createDefault(keys[0], EnumSet.allOf(GatewayIntent::class.java))
                .addEventListeners(BotListener().also { listener = it })
                //.enableCache(CacheFlag.)
                .enableCache(CacheFlag.VOICE_STATE)
                .enableCache(CacheFlag.EMOJI)
                .enableCache(CacheFlag.ONLINE_STATUS)
                .enableCache(CacheFlag.FORUM_TAGS)
                .setMemberCachePolicy(MemberCachePolicy.ALL)
                .build().awaitReady()
            responder = listener.responder
            //jda.getPresence().setGame(Game.of(Game.GameType.DEFAULT, "/help for info"));
        } catch (e: IllegalArgumentException) {
            e.printStackTrace()
        } catch (e: Exception) {
            log.error("An unknown error has occurred with the bot builder.")
            e.printStackTrace()
        }
        log.info("Completed bot creation")
    }

    protected abstract fun listCommands()
    override fun run() {
        val second: Long = 1000
        val minute = 60 * second
        val hour = 60 * minute
        val day = 24 * hour
        do {
            try {
                log.info("Starting central process")
                val dateNode: Node = reader.getChild(reader.root, "lastdailyupdate")!!
                val lastDate: String = reader.getValue(dateNode)!!
                log.info("The last daily update was on $lastDate")
                val now = Instant.now().atOffset(ZoneOffset.ofHours(-8))
                val currentDay = now.dayOfMonth
                val currentMonth = now.monthValue
                val currentDate = "$currentMonth/$currentDay"
                log.info("The current date is: $currentDate")
                if (lastDate != currentDate) applyDailyUpdate(currentDate) else log.info("no update is needed")
                Thread.sleep(day)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }
        } while (true)
    }

    protected abstract fun applyDailyUpdate(currentDate: String?)

    companion object {
        @JvmField
        var jda: JDA? = null
        var commands = HashMap<String, Command>()
            protected set
        private val interactions = ArrayList<CommandData>()
        @JvmField
        var responder: Responder? = null
        //var guildManager: GuildManager = GuildManager
        var commandNameList = ArrayList<String>()
        var keys = arrayOfNulls<String>(3)
        private lateinit var console: Console

        //private static Console guiConsole = new GuiConsole();
        protected val reader = BaseXMLReader()
        private lateinit var listener: BotListener
        private var running = false
        private var debug = false
        private var startTime: Long = 0
        private fun createAllSlashCommands() = jda!!.updateCommands().addCommands(interactions).complete()

        fun handleCommand(commandText: CommandContainer, event: MessageReceivedEvent) {
            val commandName = commandText.commandName
            val channel = event.channel
            if(commands.containsKey(commandName)){
                try {
                    commands[commandName]!!.setEvent(event).invoke(commandText)
                } catch (ipe: InsufficientPermissionException) {
                    ipe.printStackTrace()
                    Bot say "Insufficient permissions to perform this command" in channel
                } catch (e: Exception) {
                    e.printStackTrace()
                    Bot say "An error occured while trying to execute this command" in channel
                }
            } else {
                Bot say "This command does not exist" in channel
            }
        }

        fun stop() {
            jda!!.shutdown()
            console.interrupt()
            running = false
        }

        val uptime: Long
            get() = if (running) System.currentTimeMillis() - startTime else -18 * 3600000

        infix fun handleCommand(event: SlashCommandInteractionEvent) = commands[event.name]!!(event)

        infix fun handleCommand(event: UserContextInteractionEvent) = commands[event.name]!!(event)

        fun handleCommand(event: MessageContextInteractionEvent) {
            val name = event.name.lowercase(Locale.getDefault()).replace(" ".toRegex(), "")
            commands[name]!!(event)
        }

        infix fun createCommand(command: Command) {
            commands[command.name] = command
            if (command.isInteractible) interactions.add(command.commandData)
        }

        fun getCommand(name: String): Command = commands[name]!!
    }
}
fun <T>evaluateList(list:Iterable<T>, validator: Predicate<T>):Boolean{
    for(t in list)if(validator.test(t))return true
    return false
}