package bottools.main

import bottools.botactions.contains
import bottools.botactions.say
import bottools.commands.Command
import bottools.commands.HelpCommand
import bottools.dataprocessing.B
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
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.io.IOException
import java.time.Instant
import java.time.ZoneOffset
import java.util.*
import java.util.function.Predicate


abstract class Bot{
    var log = LoggerFactory.getLogger(Bot::class.java)
    init {
        /* In case I want to see logger status messages
		LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
	    StatusPrinter.print(lc);
	    */
        log.info("Begun bot initialization")
        running = true
        startTime = System.currentTimeMillis() + 18 * 3600000

        // My systems
        console = Console()
        console.start()

        // Bot setup
        initializeBotExistence()
        addInteractionResponses()

        // My Systems again
        D.updateServerDatabase() //Must be after bot and console initialization

        //Commands
        createCommand(HelpCommand())
        listCommands()
        createAllSlashCommands()

        CentralProcess.start(::applyDailyUpdate)
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
            //jda.getPresence().setGame(Game.of(Game.GameType.DEFAULT, "/help for info"));
        } catch (e: IllegalArgumentException) {
            e.printStackTrace()
        } catch (e: Exception) {
            log.error("An unknown error has occurred with the bot builder.")
            e.printStackTrace()
        }
        log.info("Completed bot creation")
    }
    private fun addInteractionResponses(){
        responder newMessageReceivedAction              ::handleCommand
        responder newSlashCommandInteractionAction      ::handleCommand
        responder newMessageContextInteractionAction    ::handleCommand
        responder newUserContextInteractionAction       ::handleCommand
    }

    protected abstract fun listCommands()
    private object CentralProcess:Runnable{
        private val log = LoggerFactory.getLogger(CentralProcess::class.java)
        private val second: Long = 1000
        private val minute = 60 * second
        private val hour = 60 * minute
        private val day = 24 * hour
        private lateinit var externalUpdate: (date:String) -> Unit
        fun start(externalUpdate:(date:String)->Unit) = Thread(this).also {this.externalUpdate=externalUpdate }.start()
        override fun run() = doDaily {
            val lastDailyUpdate = B-"lastdailyupdate"
            log.info("The last daily update was on $lastDailyUpdate")
            val currentDate = Instant.now().atOffset(ZoneOffset.ofHours(-6))
                .let{"${it.dayOfMonth}/${it.monthValue}"}
            log.info("The current date is: $currentDate")
            externalUpdate.invoke(currentDate)
            B/"lastDailyUpdate" + currentDate
        }
        private fun doDaily(dailyUpdate:()->Unit){
            do{
                try{
                    dailyUpdate.invoke()
                    Thread.sleep(day)
                }catch (e:InterruptedException){
                    log.error("The central update process has terminated")
                    e.printStackTrace()
                }
            }while (true)
        }

    }
    protected abstract fun applyDailyUpdate(currentDate: String?)

    companion object {
        var jda: JDA? = null
        var commands = HashMap<String, Command>()
            protected set
        private val interactions = ArrayList<CommandData>()
        val responder by lazy{ listener.responder}
        //var guildManager: GuildManager = GuildManager
        var commandNameList = ArrayList<String>()
        var keys = arrayOfNulls<String>(3)
        private lateinit var console: Console

        //private static Console guiConsole = new GuiConsole();
        private lateinit var listener: BotListener
        private var running = false
        private var startTime: Long = 0
        private fun createAllSlashCommands() = jda!!.updateCommands().addCommands(interactions).complete()

        private fun handleCommand(commandText: CommandContainer, event: MessageReceivedEvent) {
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
        private infix fun handleCommand(event: MessageReceivedEvent) = handleCommand(Parser parse event, event)
        private infix fun handleCommand(event: SlashCommandInteractionEvent) = commands[event.name]!!(event)

        private infix fun handleCommand(event: UserContextInteractionEvent) = commands[event.name]!!(event)

        private fun handleCommand(event: MessageContextInteractionEvent) {
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