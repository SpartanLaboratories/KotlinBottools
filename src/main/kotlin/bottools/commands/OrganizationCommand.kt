package bottools.commands

import bottools.main.Parser.CommandContainer


class OrganizationCommand(name: String) : SubCommand(name) {
    private val subCommands = HashMap<String, String>()
    data class orgData(val alias: String, val trueName: String)
    init {
        isSubCommandRequired(true)
        helpMessage = "Can be followed by:"
    }

    override fun invoke(commandName: CommandContainer){
        commandName.args[0] = subCommands[commandName.args[0]]!!
        parent(commandName)
    }

    override fun invoke(args: Array<String>) {}

    fun addCommand(alias: String, command: String = alias): OrganizationCommand {
        subCommands[alias] = command
        helpMessage = "$helpMessage $command"
        parent.getSubCommand(command)!!.addOrganization(this, alias)
        return this
    }

    operator fun plus(command: orgData) = addCommand(command.alias, command.trueName)
}