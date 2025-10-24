// eslint.config.mjs
import antfu from "@antfu/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";

export default antfu(
    {
        type: "app",
        react: true,
        typescript: true,
        formatters: true,
        stylistic: {
            indent: 4,
            quotes: "double",
            semi: true,
        },
        ignores: [
            "**/dist",
            "**/node_modules",
            "!.storybook",
            "storybook-static",
            "**/.github",
            "**/next.config.ts",
            "**/pnpm-lock.yaml",
            "**/package-lock.json",
        ],
    },
    {
        plugins: {
            "@next/next": nextPlugin,
            // Register the classic plugin name so file-level comments like
            // `@typescript-eslint/no-explicit-any` are recognized.
            "@typescript-eslint": tsEslintPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
        },
    },
    {
        rules: {
            "antfu/top-level-function": "off",
            "eslint-comments/no-unlimited-disable": "off",
            "unused-imports/no-unused-imports": "warn",
            "no-redeclare": "off",
            "ts/consistent-type-definitions": ["error", "type"],
            "no-console": ["warn"],
            "antfu/no-top-level-await": ["off"],
            "node/prefer-global/process": ["off"],
            "node/no-process-env": ["warn"],

            // Keep both names safe:
            "@typescript-eslint/no-explicit-any": "off",
            "ts/no-explicit-any": "warn",

            "perfectionist/sort-imports": [
                "error",
                { tsconfigRootDir: "." },
            ],
            "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
        },
    },
);
