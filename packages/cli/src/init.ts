import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { createInterface } from "node:readline/promises";

import {
  configFileName,
  defaultConfig,
  hasConfig,
  resolveConfigAlias,
  writeConfig,
} from "./config.js";
import { installDependencies } from "./dependencies.js";
import type { CliOptions } from "./arguments.js";
import { getTokenFiles } from "@nooeh/registry";

async function ask(
  question: string,
  defaultValue: string,
  readline: ReturnType<typeof createInterface>,
) {
  const answer = await readline.question(`${question} (${defaultValue}) `);
  return answer.trim() || defaultValue;
}

async function readViteConfig(projectDirectory: string) {
  const configFileNames = [
    "vite.config.ts",
    "vite.config.mts",
    "vite.config.js",
    "vite.config.mjs",
  ];

  for (const fileName of configFileNames) {
    const path = join(projectDirectory, fileName);
    try {
      await access(path);
      return { path, source: await readFile(path, "utf8") };
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        continue;
      }
      throw error;
    }
  }

  throw new Error("Could not find a Vite config file.");
}

function configureVite(source: string) {
  const importLine = 'import stylex from "@stylexjs/unplugin";';
  const pluginPattern = /plugins:\s*\[([^\]]*)\]/s;
  const configPattern = /defineConfig\(\{\s*/;

  if (!source.includes("stylex.vite(") && !pluginPattern.test(source)) {
    throw new Error(
      "Could not safely update the Vite plugins array. Add stylex.vite({ useCSSLayers: true }) manually.",
    );
  }

  const withStylex = source.includes("stylex.vite(")
    ? source
    : (source.includes(importLine) ? source : `${importLine}\n${source}`).replace(
        pluginPattern,
        (_, plugins: string) => {
          const prefix = plugins.trim()
            ? `stylex.vite({ useCSSLayers: true }), ${plugins}`
            : "stylex.vite({ useCSSLayers: true })";
          return `plugins: [${prefix}]`;
        },
      );
  if (withStylex.includes("alias:")) return withStylex;
  if (!configPattern.test(withStylex)) {
    throw new Error('Could not safely add the "@" Vite alias. Add resolve.alias["@"] manually.');
  }

  return withStylex.replace(
    configPattern,
    'defineConfig({\n  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },\n  ',
  );
}

async function writeViteFiles(projectDirectory: string, tokenDirectory: string) {
  const { path: configPath, source: configSource } = await readViteConfig(projectDirectory);
  const configuredVite = configureVite(configSource);
  await writeNooehFiles(projectDirectory, tokenDirectory);
  await writeFile(configPath, configuredVite, "utf8");
  console.log(`Configured Vite and created ${relative(projectDirectory, tokenDirectory)}.`);
}

async function writeNooehFiles(projectDirectory: string, tokenDirectory: string) {
  await mkdir(tokenDirectory, { recursive: true });
  for (const file of await getTokenFiles()) {
    await writeFileIfMissing(join(tokenDirectory, file.name), file.content);
  }
}

async function writeFileIfMissing(path: string, source: string) {
  try {
    await access(path);
  } catch {
    await writeFile(path, source, "utf8");
  }
}

export async function init(projectDirectory: string, options: CliOptions) {
  if ((await hasConfig(projectDirectory)) && !options.force) {
    throw new Error("nooeh.json already exists. Use --force to create it again.");
  }

  const isInteractive = process.stdin.isTTY && process.stdout.isTTY && !options.defaults;
  const readline = isInteractive
    ? createInterface({ input: process.stdin, output: process.stdout })
    : null;

  try {
    if (options.framework && options.framework !== "vite") {
      throw new Error(`Unsupported framework: ${options.framework}. Use vite or omit --framework.`);
    }
    const uiAlias =
      options.ui ??
      (readline
        ? await ask("Enter the UI import alias.", defaultConfig.aliases.ui, readline)
        : defaultConfig.aliases.ui);
    const stylesAlias =
      options.styles ??
      options.tokens ??
      (readline
        ? await ask("Enter the styles import alias.", defaultConfig.aliases.styles, readline)
        : defaultConfig.aliases.styles);
    const tokenDirectory = await resolveConfigAlias(
      projectDirectory,
      stylesAlias,
      "aliases.styles",
    );
    await resolveConfigAlias(projectDirectory, uiAlias, "aliases.ui");
    if (!options["skip-dependencies"]) {
      await installDependencies(projectDirectory, ["@stylexjs/stylex"]);
      if (options.framework === "vite") {
        await installDependencies(projectDirectory, ["@stylexjs/unplugin"], true);
      }
    }
    if (options.framework === "vite") {
      await writeViteFiles(projectDirectory, tokenDirectory);
    } else {
      await writeNooehFiles(projectDirectory, tokenDirectory);
      console.log(`Created ${relative(projectDirectory, tokenDirectory)}.`);
      console.log(
        "Configure the StyleX compiler for your bundler before importing added components.",
      );
    }
    await writeConfig(projectDirectory, { aliases: { ui: uiAlias, styles: stylesAlias } });
  } finally {
    readline?.close();
  }

  console.log(`Created configuration: ${configFileName}`);
}
