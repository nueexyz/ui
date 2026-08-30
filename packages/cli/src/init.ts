import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
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

function getSourceDirectory(projectDirectory: string) {
  return join(projectDirectory, "src");
}

async function configureVite(projectDirectory: string) {
  const configPath = join(projectDirectory, "vite.config.ts");
  const source = await readFile(configPath, "utf8");
  const importLine = 'import stylex from "@stylexjs/unplugin/vite";';
  const pluginPattern = /plugins:\s*\[/;

  if (!pluginPattern.test(source)) {
    throw new Error("Could not find a Vite plugins array. Add the StyleX plugin manually.");
  }

  const withImport = source.includes(importLine) ? source : `${importLine}\n${source}`;
  const updated = withImport.includes("stylex({ useCSSLayers: true })")
    ? withImport
    : withImport.replace(pluginPattern, "plugins: [stylex({ useCSSLayers: true }), ");

  await writeFile(configPath, updated, "utf8");
}

async function writeViteFiles(projectDirectory: string) {
  const sourceDirectory = getSourceDirectory(projectDirectory);
  const stylePath = join(sourceDirectory, "styles", "dumo.css");
  const entryPath = join(sourceDirectory, "main.tsx");
  const relativeStylePath = relative(projectDirectory, stylePath);

  await mkdir(dirname(stylePath), { recursive: true });
  await writeFile(stylePath, '@import "@dumo/ui/global.css";\n', "utf8");
  const entrySource = await readFile(entryPath, "utf8");
  const styleImport = 'import "./styles/dumo.css";';
  if (!entrySource.includes(styleImport)) {
    await writeFile(entryPath, `${styleImport}\n${entrySource}`, "utf8");
  }
  await configureVite(projectDirectory);
  console.log(`Configured Vite and created ${relativeStylePath}.`);
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
    if (options.framework && options.framework !== "vite") {
      throw new Error(
        `Unsupported framework: ${options.framework}. Use vite or configure StyleX manually.`,
      );
    }
    const uiAlias =
      options["ui-alias"] ??
      (readline
        ? await ask("Enter the UI alias.", defaultConfig.aliases.ui, readline)
        : defaultConfig.aliases.ui);
    await writeConfig(projectDirectory, { aliases: { ui: uiAlias } });
    if (options.framework === "vite") await writeViteFiles(projectDirectory);
  } finally {
    readline?.close();
  }

  console.log(`Created configuration: ${configFileName}`);
}
