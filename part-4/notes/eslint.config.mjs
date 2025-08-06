import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node }, // Add Node.js globals here
    rules: {
      "no-unused-vars": "warn",
      eqeqeq: "error",
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      // Add more rules as needed
    },
  },

  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
]);

// import eslintRecommended from "eslint/conf/eslint-recommended.js";

// export default [
//   {
//     files: ["**/*.js"],
//     languageOptions: {
//       ecmaVersion: 2021,
//       sourceType: "script",
//       globals: {
//         require: "readonly",
//         module: "readonly",
//         __dirname: "readonly",
//         process: "readonly",
//         console: "readonly",
//       },
//     },
//     linterOptions: {
//       reportUnusedDisableDirectives: true,
//     },
//     rules: {
//       ...eslintRecommended.rules,
//       "no-unused-vars": "warn",
//       "no-console": "off",
//       eqeqeq: "error",
//       semi: ["error", "always"],
//       quotes: ["error", "single"],
//     },
//   },
// ];
