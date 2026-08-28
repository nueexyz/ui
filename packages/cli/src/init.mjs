import { createInterface } from "node:readline/promises";

import { configFileName, defaultConfig, hasConfig, writeConfig } from "./config.mjs";

async function ask(question, defaultValue, readline) {
  const answer = await readline.question(`${question} (${defaultValue}) `);
  return answer.trim() || defaultValue;
}

export async function init(projectDirectory, options) {
  if ((await hasConfig(projectDirectory)) && !options.force) {
    throw new Error("cachette.config.json이 이미 있습니다. 다시 만들려면 --force를 사용해 주세요.");
  }

  const isInteractive = process.stdin.isTTY && process.stdout.isTTY && !options.defaults;
  const readline = isInteractive
    ? createInterface({ input: process.stdin, output: process.stdout })
    : null;

  try {
    const ui =
      options.ui ??
      (readline
        ? await ask("UI 컴포넌트를 어디에 저장할까요?", defaultConfig.paths.ui, readline)
        : defaultConfig.paths.ui);
    const tokens =
      options.tokens ??
      (readline
        ? await ask("디자인 토큰을 어디에 저장할까요?", defaultConfig.paths.tokens, readline)
        : defaultConfig.paths.tokens);
    const globalCss =
      options["global-css"] ??
      (readline
        ? await ask("전역 CSS를 어디에 저장할까요?", defaultConfig.paths.globalCss, readline)
        : defaultConfig.paths.globalCss);
    const uiAlias =
      options["ui-alias"] ??
      (readline
        ? await ask("UI 별칭을 입력해 주세요.", defaultConfig.aliases.ui, readline)
        : defaultConfig.aliases.ui);
    const tokensAlias =
      options["tokens-alias"] ??
      (readline
        ? await ask("토큰 별칭을 입력해 주세요.", defaultConfig.aliases.tokens, readline)
        : defaultConfig.aliases.tokens);

    await writeConfig(projectDirectory, {
      paths: { ui, tokens, globalCss },
      aliases: { ui: uiAlias, tokens: tokensAlias },
    });
  } finally {
    readline?.close();
  }

  console.log(`설정을 만들었습니다: ${configFileName}`);
}
