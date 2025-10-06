import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

// A test command meant to exemplify the data/handler structure of the interaction files.

const data = new SlashCommandBuilder()
	.setName("echo")
	.setDescription("Echoes back whatever is provided as the first argument.")
	.addStringOption(option =>
		option
			.setName("echoback")
			.setDescription("The text to echo back.")
			.setRequired(true)
	);

async function handler(interaction: ChatInputCommandInteraction) {
	const echoText = interaction.options.getString("echoback", true);
	await interaction.reply({ content: echoText, options: { flags: [MessageFlags.Ephemeral] } });
}

export default {
	enabled: false,
	data,
	handler
};
