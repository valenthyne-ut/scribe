import config from "@/config/index.js";
import echo from "@/interactions/commands/echo/index.js";
import { REST, Routes, type ChatInputCommandInteraction } from "discord.js";

// Everytime you add another interaction, you'll have to import it and add it to this array yourself.
// Hacky, but works for now. Needs a better system in the future.
const interactions = [echo];

const handlers = new Map<string, (interaction: ChatInputCommandInteraction) => Promise<void>>();

for (const interaction of interactions) {
	if (interaction.enabled) {
		handlers.set(interaction.data.name, interaction.handler);
	}
}

try {
	const rest = new REST().setToken(config.TOKEN);

	// Iterate through every command in the interactions array, filter for enabled ones, extract their data, and
	// submit it to Discord.
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
