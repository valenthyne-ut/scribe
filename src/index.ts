import { ActivityType, Client, Events, GatewayIntentBits } from "discord.js";
import config from "@/config/index.js";
import { handlers } from "@/interactions/commands/index.js";
import { handler as handleMessage } from "./interactions/messageCreate/index.js";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
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
		console.error("Something went wrong whilst processing an interaction.");
		console.error(error);
	}
});

client.on(Events.MessageCreate, async (message) => {
	if (message.author.bot || message.guildId !== config.GUILD_ID) { return; }

	try {
		await handleMessage(message);
	}
	catch (error) {
		console.error("Something went wrong whilst processing a message.");
		console.error(error);
	}
});

client.login(config.TOKEN);
