import "dotenv/config";

/**
 * Fetches the environment. Halts the program if no environment is found or an invalid one is provided.
 */
function getEnvironment(): "development" | "production" {
	const environment = process.env.ENVIRONMENT;
	if (!environment) {
		console.error("Environment not set ('ENVIRONMENT' in .env file.)");
		process.exit(-1);
	}

	switch (environment.toLowerCase()) {
		case "development": return "development";
		case "production": return "production";
		default: {
			console.error("Invalid environment provided (must be either 'development' or 'production'.");
			process.exit(-1);
		}
	}
}

const environment = getEnvironment();

/**
 * Allows you to fetch a value from the .env file based on a key. Fetches `environment_key` first, and falls back to
 * just `key` if the first one isn't found. This lets you have multiple configurations for different environments in the
 * same file.
 * @param key The key in the .env file.
 * @param required If the value is required for the program to function. Will halt the program if set to true and key is
 * undefined.
 */
function getValueFromKey(key: string, required: false | never): string | undefined;
function getValueFromKey(key: string, required: true): string;
function getValueFromKey(key: string, required?: boolean): string | undefined {
	key = key.toUpperCase();
	let value = process.env[`${environment.toUpperCase()}_${key}`];

	if (!value) {
		value = process.env[key];
		if (!value && required) {
			console.error(`${key} is required in .env file.`);
			process.exit(-1);
		}
	}

	return value;
}

function getToken() {
	return getValueFromKey("TOKEN", true);
}

function getApplicationId() {
	return getValueFromKey("APPLICATION_ID", true);
}

function getGuildId() {
	return getValueFromKey("GUILD_ID", true);
}

export default {
	ENVIRONMENT: environment,

	TOKEN: getToken(),
	APPLICATION_ID: getApplicationId(),
	GUILD_ID: getGuildId()
};
