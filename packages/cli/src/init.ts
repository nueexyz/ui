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
    throw new Error("dumo.json이 이미 있습니다. 다시 만들려면 --force를 사용해 주세요.");
  }

  const isInteractive = process.stdin.isTTY && process.stdout.isTTY && !options.defaults;
  const readline = isInteractive
    ? createInterface({ input: process.stdin, output: process.stdout })
    : null;

  try {
    const uiAlias =
      options["ui-alias"] ??
      (readline
        ? await ask("UI 별칭을 입력해 주세요.", defaultConfig.aliases.ui, readline)
        : defaultConfig.aliases.ui);
    await writeConfig(projectDirectory, { aliases: { ui: uiAlias } });
  } finally {
    readline?.close();
  }

  console.log(`설정을 만들었습니다: ${configFileName}`);
}
