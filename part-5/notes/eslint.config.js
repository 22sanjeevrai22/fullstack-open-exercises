import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{js,jsx}"],
    plugins: { react: pluginReact },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Disable prop-types for now
      "react/display-name": "off", // Disable display-name for now
    },
  },
  {
    files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}", "testSetup.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.vitest,
      },
    },
  },
]);
