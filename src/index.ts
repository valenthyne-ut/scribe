import { ActivityType, Client, Events, GatewayIntentBits } from "discord.js";
import config from "@/config/index.js";
import { handlers } from "@/interactions/commands/index.js";

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

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.inCachedGuild()
		|| !interaction.isChatInputCommand()
		|| interaction.guildId !== config.GUILD_ID) { return; }

	if (!interaction.isChatInputCommand()) { return; }

	const handleInteraction = handlers.get(interaction.commandName);

	try {
		if (!handleInteraction) {
			return await interaction.reply("Unknown command.");
		}

		await handleInteraction(interaction);
	}
	catch (error) {
		console.error(error);
	}
});

client.login(config.TOKEN);
