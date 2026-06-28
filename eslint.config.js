import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-trailing-spaces": "warn",
      "eol-last": ["warn", "always"],
      semi: ["warn", "always"],
      indent: ["warn", 2],
      quotes: ["warn", "double", { avoidEscape: true }],
      "object-curly-spacing": ["warn", "always"],
    },
  },
]);
