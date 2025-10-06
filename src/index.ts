import { ActivityType, Client, Events, GatewayIntentBits } from "discord.js";
import config from "@/config/index.js";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates
	]
});

client.once(Events.ClientReady, (client) => {
	console.info(`${client.user.tag} ready!`);
	client.user.setActivity({ type: ActivityType.Listening, name: "you." });
});

client.login(config.TOKEN);
