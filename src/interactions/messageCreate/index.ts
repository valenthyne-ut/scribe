import type { Message, OmitPartialGroupDMChannel } from "discord.js";

async function handler(message: OmitPartialGroupDMChannel<Message>) {
	await message.reply("wip");
}

export { handler };
