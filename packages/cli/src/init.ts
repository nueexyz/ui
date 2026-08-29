import { createInterface } from "node:readline/promises";

import { configFileName, defaultConfig, hasConfig, writeConfig } from "./config.js";
import type { CliOptions } from "./arguments.js";

async function ask(
  question: string,
  defaultValue: string,
  readline: ReturnType<typeof createInterface>,
) {
  const answer = await readline.question(`${question} (${defaultValue}) `);
  return answer.trim() || defaultValue;
}

export async function init(projectDirectory: string, options: CliOptions) {
  if ((await hasConfig(projectDirectory)) && !options.force) {
    throw new Error("dumo.json already exists. Use --force to create it again.");
  }

  const isInteractive = process.stdin.isTTY && process.stdout.isTTY && !options.defaults;
  const readline = isInteractive
    ? createInterface({ input: process.stdin, output: process.stdout })
    : null;

  try {
    const uiAlias =
      options["ui-alias"] ??
      (readline
        ? await ask("Enter the UI alias.", defaultConfig.aliases.ui, readline)
        : defaultConfig.aliases.ui);
    await writeConfig(projectDirectory, { aliases: { ui: uiAlias } });
  } finally {
    readline?.close();
  }

  console.log(`Created configuration: ${configFileName}`);
}
