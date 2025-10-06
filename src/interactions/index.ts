import config from "@/config/index.js";
import echo from "@/interactions/echo/index.js";
import { REST, Routes, type ChatInputCommandInteraction } from "discord.js";

const interactions = [echo];

const handlers = new Map<string, (interaction: ChatInputCommandInteraction) => Promise<void>>();

for (const interaction of interactions) {
	if (interaction.enabled) {
		handlers.set(interaction.data.name, interaction.handler);
	}
}

try {
	const rest = new REST().setToken(config.TOKEN);

	await rest.put(Routes.applicationGuildCommands(config.APPLICATION_ID, config.GUILD_ID), {
		body: interactions.filter(interaction => interaction.enabled).map(interaction => interaction.data)
	});
}
catch (error) {
	console.error("Something went wrong whilst submitting the bot's commands.");
	console.error(error);
	process.exit(-1);
}

export { handlers };
