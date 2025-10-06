import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: {
			js,
			"@stylistic": stylistic
		},
		extends: ["js/recommended"],
		languageOptions: { globals: globals.node }
	},
	tseslint.configs.recommended,
	stylistic.configs.customize({
		indent: "tab",
		quotes: "double",
		semi: true,
		jsx: false,
		commaDangle: "never"
	}),
	{
		rules: {
			"@stylistic/max-statements-per-line": "off"
		}
	}
]);
