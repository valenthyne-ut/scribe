import type { Message, OmitPartialGroupDMChannel } from "discord.js";
import { createWriteStream } from "fs";
import { join } from "path";
import { pipeline } from "stream/promises";

async function handler(message: OmitPartialGroupDMChannel<Message>) {
	// TODO: Make this ignore people who don't opt into having their
	// voice messages automatically transcribed.
	if (message.author.bot) { return; }

	// As of October 27th of 2025, only voice messages have the waveform property.
	const messageVoiceComponent = message.attachments.find(attachment => attachment.waveform);
	if (!messageVoiceComponent) { return; }

	// Got a voice message!
	try {
		console.info("Fetching voice message data..");

		const response = await fetch(messageVoiceComponent.url);
		if (!response.ok) { throw new Error("Request failed!"); }
		if (!response.body) { throw new Error("Response has no data!"); }

		const destinationPath = join(process.cwd(), "/whisper/samples/", messageVoiceComponent.name);
		await pipeline(response.body, createWriteStream(destinationPath));
	} catch (error) {
		// Quietly error out
		console.error(error);
	}
}

export { handler };
