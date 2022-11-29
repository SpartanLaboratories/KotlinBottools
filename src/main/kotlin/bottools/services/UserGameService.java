package bottools.services;

import java.util.function.Consumer;
import BotTools.main.Bot;
import net.dv8tion.jda.api.entities.Guild;

public class UserGameService extends UserBasedService {
	String gameName;
	
	public static void createService(String gameName, Consumer<String> onChange, int interval) {
		createService(new UserGameService(gameName), onChange, interval);
	}
	
	UserGameService(String gameName) {
		super("game services/" + gameName + " user games");
		this.gameName = gameName;
	}
	@Override
	protected void checkGuild(Guild guild){
		
	}
	@Override
	protected String getUserId() {
		return Bot.gdp.getID(getGuild(), getMember(), gameName);
	}
}
