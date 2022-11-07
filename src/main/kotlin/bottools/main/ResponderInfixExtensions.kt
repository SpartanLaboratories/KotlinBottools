package bottools.main

import net.dv8tion.jda.api.events.Event
import net.dv8tion.jda.api.events.guild.GuildJoinEvent
import kotlin.reflect.KFunction1

infix fun Responder.reactTo(event : Event) = Responder::actOn
infix fun Responder.newGuildJoinAction(onEventAction: EventAction.GuildJoinAction) = Responder::addOnGuildJoinAction
infix fun Responder.newGuildUpdateNameAction(onEventAction : EventAction.GuildUpdateNameAction) = Responder::addOnGuildUpdateNameAction
infix fun Responder.newGuildMemberJoinAction(onEventAction : EventAction.GuildMemberJoinAction) = Responder::addOnGuildMemberJoinAction
infix fun Responder.newUserUpdateOnlineStatusAction(onEventAction : EventAction.UserUpdateOnlineStatusAction) = Responder::addOnUserUpdateOnlineStatusAction
infix fun Responder.newMessageReactionAddAction(onEventAction : EventAction.MessageReactionAddAction) = Responder::addOnMessageReactionAddAction
infix fun Responder.newMessageReceivedAction(onEventAction : EventAction.MessageReceivedAction) = Responder::addOnMessageReceivedAction
infix fun Responder.newMessageDeleteAction(onEventAction : EventAction.MessageDeleteAction) = Responder::addOnMessageDeleteAction
infix fun Responder.newSlashCommandInteractionAction(onEventAction : EventAction.SlashCommandInteractionAction) = Responder::addOnSlashCommandInteractionAction
infix fun Responder.newUserContextInteractionAction(onEventAction : EventAction.UserContextInteractionAction) = Responder::addOnUserContextInteractionAction
infix fun Responder.newMessageContextInteractionAction(onEventAction : EventAction.MessageContextInteractionAction) = Responder::addOnMessageContextInteractionAction