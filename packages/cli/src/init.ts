import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { createInterface } from "node:readline/promises";

import { defaultConfig, hasConfig, resolveConfigAlias, writeConfig } from "./config.js";
import { installDependencies } from "./dependencies.js";
import type { CliOptions } from "./arguments.js";
import { getFoundationFiles } from "@nuee/registry";

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
  const stylexPlugin = 'stylex.vite({ unstable_moduleResolution: { type: "commonJS" } })';

  if (!source.includes("stylex.vite(") && !pluginPattern.test(source)) {
    throw new Error("Could not safely update the Vite plugins array. Add stylex.vite() manually.");
  }

  if (source.includes("stylex.vite(")) return source;

  return (source.includes(importLine) ? source : `${importLine}\n${source}`).replace(
    pluginPattern,
    (_, plugins: string) => {
      const prefix = plugins.trim() ? `${stylexPlugin}, ${plugins}` : stylexPlugin;
      return `plugins: [${prefix}]`;
    },
  );
}

async function writeViteFiles(
  projectDirectory: string,
  tokenDirectory: string,
  refreshLegacyTokens: boolean,
) {
  const { path: configPath, source: configSource } = await readViteConfig(projectDirectory);
  const configuredVite = configureVite(configSource);
  await writeNueeFiles(projectDirectory, tokenDirectory, refreshLegacyTokens);
  await addResetImport(projectDirectory, tokenDirectory);
  await writeFile(configPath, configuredVite, "utf8");
}

function getRelativeImportPath(from: string, to: string) {
  const path = relative(dirname(from), to).split(sep).join("/");
  return path.startsWith(".") ? path : `./${path}`;
}

async function addResetImport(projectDirectory: string, tokenDirectory: string) {
  const cssPath = join(projectDirectory, "src/index.css");
  const resetImport = `@import "${getRelativeImportPath(cssPath, join(tokenDirectory, "reset.css"))}";`;

  try {
    const source = await readFile(cssPath, "utf8");
    if (source.includes(resetImport)) return;
    await writeFile(cssPath, `${resetImport}\n\n${source}`, "utf8");
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      await writeFile(cssPath, `${resetImport}\n`, "utf8");
      return;
    }
    throw error;
  }
}

async function writeNueeFiles(
  projectDirectory: string,
  tokenDirectory: string,
  refreshLegacyTokens = false,
) {
  await mkdir(tokenDirectory, { recursive: true });
  for (const file of await getFoundationFiles()) {
    await writeTokenFile(
      join(tokenDirectory, file.name),
      file.content,
      refreshLegacyTokens,
      file.name,
    );
  }
}

function isLegacySemanticSource(fileName: string, source: string) {
  return (
    fileName === "semantic.stylex.ts" &&
    source.includes('bgCanvas: "initial"') &&
    source.includes('overlay: "initial"')
  );
}

async function writeTokenFile(
  path: string,
  source: string,
  shouldRefreshLegacySources: boolean,
  fileName: string,
) {
  try {
    const currentSource = await readFile(path, "utf8");
    if (shouldRefreshLegacySources && isLegacySemanticSource(fileName, currentSource)) {
      await writeFile(path, source, "utf8");
    }
  } catch {
    await writeFile(path, source, "utf8");
  }
}

export async function init(projectDirectory: string, options: CliOptions, shouldLog = true) {
  if ((await hasConfig(projectDirectory)) && !options.force) {
    throw new Error("nuee.json already exists. Use --force to create it again.");
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
      await writeViteFiles(projectDirectory, tokenDirectory, Boolean(options.force));
    } else {
      await writeNueeFiles(projectDirectory, tokenDirectory, Boolean(options.force));
    }
    await writeConfig(projectDirectory, {
      accessibility: defaultConfig.accessibility,
      aliases: { ui: uiAlias, styles: stylesAlias },
    });
  } finally {
    readline?.close();
  }

  if (shouldLog) console.log("✔ Initialized Nuee.");
}
