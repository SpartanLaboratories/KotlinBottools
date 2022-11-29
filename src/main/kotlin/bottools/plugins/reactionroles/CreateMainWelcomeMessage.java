package bottools.plugins.reactionroles;

import java.util.ArrayList;
import java.util.List;

import bottools.commands.Command;
import bottools.main.Bot;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.channel.concrete.TextChannel;
import net.dv8tion.jda.api.entities.emoji.Emoji;
import net.dv8tion.jda.api.exceptions.ErrorResponseException;
import net.dv8tion.jda.internal.utils.tuple.Pair;

public class CreateMainWelcomeMessage extends Command {
	public CreateMainWelcomeMessage() {
		super("createmainwelcomemessage");
		makeInteractible();
	}
	
	@Override
	public boolean invoke(String[] args) {
		ReactionRoleActions.createWelcomeMessage(getGuild());
		return true;
	}
	
	public boolean executeInChannel(TextChannel channel) {

		setGuild(channel.getGuild());
		return invoke(new String[0]);
	}
	
	
	static void updateMessages(Guild guild, Emoji emote) {
		List<Message> welcomeMessages = getGuildWelcomeMessages(guild);
		if(welcomeMessages != null)
			welcomeMessages.forEach(message -> message.addReaction(emote).complete());
	}
	
	
	public static List<Message> getGuildWelcomeMessages(Guild guild){
		ArrayList<Message> messages = new ArrayList<Message>();
		
		for(Pair<String, String> id: Bot.data.getWelcomeMessageIDs(guild))try {
			Message message = guild.getTextChannelById(id.getLeft()).retrieveMessageById(id.getRight()).complete();
			messages.add(message);
		}catch(ErrorResponseException e) {
			//log.warn("There are deleted messages still marked as welcome messages in guild data");
		}
		return messages;
	}
}
