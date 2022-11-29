package bottools.commands

import bottools.main.Parser.CommandContainer
import net.dv8tion.jda.api.interactions.commands.OptionMapping
import net.dv8tion.jda.api.interactions.commands.OptionType
import net.dv8tion.jda.api.interactions.commands.build.OptionData
import net.dv8tion.jda.api.interactions.commands.build.SlashCommandData
import net.dv8tion.jda.api.interactions.commands.build.SubcommandData
import net.dv8tion.jda.api.interactions.commands.build.SubcommandGroupData
import java.util.*

abstract class SubCommand protected constructor(name: String) : Command(name) {
    lateinit var parent : Command
    var nestLevel = 0
        get() = getNestLevel(parent)
    private var subcommandData: SubcommandData? = null
    private var subcommandGroupData: SubcommandGroupData? = null
    private val options = ArrayList<Option>()
    override var guild by parent::guild
    override var targetMember by parent::targetMember
    override var channel by parent::channel

    internal fun orient(parent: Command){
        this.parent = parent
        var helpMessage: String? = """$name is a sub-command of the ${parent.name} command
"""
        helpMessage = helpMessage
        generateSlashSubcommandData()
    }

    protected fun getParent(steps: Int): Command {
        var steps = steps
        return if (--steps > 0) parent else getParent(steps)
    }

    protected val parentCommand: Command
        protected get() = if (SubCommand::class.java.isAssignableFrom(parent.javaClass)) (parent as SubCommand).parentCommand else parent

    protected infix fun getNestLevel(command: Command): Int = if (!SubCommand::class.java.isAssignableFrom(command.javaClass)) 1 else getNestLevel((command as SubCommand).parent) + 1

    override fun generateSlashCommandData() {}
    fun addOrganization(org: OrganizationCommand, suffix: String) {
        generateSlashSubcommandData(org, suffix)
        subcommandData!!.addOptions(options)
    }

    private fun generateSlashSubcommandData(parent: Command = this.parent, name: String = this.name) {
        var name = name.lowercase()

        if (nestLevel == 1) parent.addToSlashCommandData(SubcommandGroupData(name, description!!).also {
            subcommandGroupData = it
        })
        else if (nestLevel == 2) (parent as SubCommand) .addToSlashCommandData(SubcommandData(
            name,
            description!!
        ).also {
            subcommandData = it
        })
        else if (nestLevel > 2) (parent as SubCommand).addToSlashCommandData(getOptionData(name))
        else assert(false)
    }

    override fun addToSlashCommandData(subcommandData: SubcommandData)  = subcommandGroupData!!.addSubcommands(subcommandData) as SlashCommandData
    override fun addToSlashCommandData(optionData: OptionData)          = subcommandData!!.addOptions(optionData) as SlashCommandData

    private fun getOptionData(name: String): OptionData {
        return OptionData(OptionType.STRING, name, description!!)
    }

    override infix fun getOption(optionName: String): OptionMapping = parent.getOption(optionName)

    override fun addOption(option: Option): Command {
        when (val nestLevel = getNestLevel(parent)) {
            1 -> options.add(option)
            2 -> this + option
            else -> getParent(nestLevel - 2) + option
        }
        return this
    }

    override infix fun reply(message: String) = parentCommand reply message
}