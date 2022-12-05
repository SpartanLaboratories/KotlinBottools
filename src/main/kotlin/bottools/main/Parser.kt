package bottools.main

import net.dv8tion.jda.api.entities.Message
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import net.dv8tion.jda.api.interactions.commands.OptionMapping
import java.util.*
import java.util.function.Consumer

object Parser {
    private val triggers = ArrayList<String>()
    @JvmStatic
    internal infix fun parse(event: MessageReceivedEvent) : CommandContainer = parse(event.message.contentRaw)
    @JvmStatic
    internal infix fun parse(raw: String): CommandContainer {
        var beheaded = raw
        for (trigger in triggers) {
            if (raw.startsWith(trigger)) {
                beheaded = raw.replaceFirst(trigger.toRegex(), "").lowercase(Locale.getDefault())
                break
            }
        }
        // Turn multiple spaces into single space
        while (beheaded.replace("  ".toRegex(), " ").also { beheaded = it }.contains("  "));

        // The index of the first whitespace (marking the end of the command name and the start of possible arguments)
        val commandNameEndIndex = beheaded.indexOf(" ")
        val command: String
        val nonTagArgs = ArrayList<String>()
        if (commandNameEndIndex == -1) {
            command = beheaded
        } else {
            command = beheaded.substring(0, commandNameEndIndex)
            val argsString = beheaded.substring(commandNameEndIndex + 1)
            for (arg in argsString.split(" ".toRegex()).dropLastWhile { it.isEmpty() }
                .toTypedArray()) if (!arg.startsWith("#") && !arg.startsWith("@")) nonTagArgs.add(arg)
        }
        val args = nonTagArgs.toTypedArray()
        return CommandContainer(raw, beheaded, command) with args
    }
    @JvmStatic
    internal infix fun parse(event: SlashCommandInteractionEvent): CommandContainer {
        val commandName = event.name
        val sscgName = event.subcommandGroup
        val sscName = event.subcommandName
        val options = event.options
        val hasSSCG = sscgName != null
        val hasSSC = sscName != null
        val hasOptions = options.size > 0
        val args = ArrayList<String>()
        var index = 0
        if (hasSSCG) args.add(sscgName!!)
        if (hasSSC) args.add(sscName!!)
        if (hasOptions) options.forEach(Consumer { option: OptionMapping ->
            args.add(
                option.asString
            )
        })
        return CommandContainer("", "", commandName) with args as Array<String>
    }
    @JvmStatic
    internal infix fun startsWithTrigger(message: String): Boolean {
        for (trigger in triggers) if (message.startsWith(trigger)) return true
        return false
    }

    internal infix fun addTrigger(newTrigger: String) {
        triggers.add(newTrigger)
    }

    internal infix fun removeTrigger(trigger: String) {
        triggers.remove(trigger)
    }

    internal infix fun removeMentions(message: Message): String {
        var command = message.contentRaw
        for (mentioned in message.mentions.members) command = command.replace(mentioned.asMention.toRegex(), "")
        return command
    }

    data class CommandContainer(
        var raw: String,
        var beheaded: String,
        var commandName: String,
    ){
        lateinit var args : Array<String>
        internal infix fun with(args : Array<String>) : CommandContainer {
            this.args = args
            return this
        }
    }
}