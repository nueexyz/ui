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
  const stylexPlugin = 'stylex.vite({ unstable_moduleResolution: { type: "commonJS" } })';
  const legacyStylexPluginPattern = /stylex\.vite\(\{\s*useCSSLayers:\s*true\s*\}\)/;
  const emptyStylexPluginPattern = /stylex\.vite\(\)/;
  const moduleResolutionPluginPattern =
    /stylex\.vite\(\{\s*unstable_moduleResolution:\s*\{\s*type:\s*["']commonJS["']\s*\},?\s*\}\)/s;
  const nooehStylexPluginPattern =
    /stylex\.vite\(\{\s*(?:\/\/[^\n]*\s*)?(?:useCSSLayers:\s*true,?\s*)?aliases:\s*\{[^}]*\},\s*unstable_moduleResolution:\s*\{\s*type:\s*["']commonJS["'],\s*rootDir:\s*new URL\(["']\.["'],\s*import\.meta\.url\)\.pathname,?\s*\},\s*\}\)/s;

  if (!source.includes("stylex.vite(") && !pluginPattern.test(source)) {
    throw new Error("Could not safely update the Vite plugins array. Add stylex.vite() manually.");
  }

  if (nooehStylexPluginPattern.test(source)) {
    return source.replace(nooehStylexPluginPattern, stylexPlugin);
  }

  if (moduleResolutionPluginPattern.test(source)) return source;

  if (source.includes("unstable_moduleResolution")) {
    throw new Error(
      "Could not safely simplify the existing StyleX plugin. Remove Nooeh's aliases and unstable_moduleResolution manually, then use stylex.vite().",
    );
  }

  let withStylex = source;
  if (legacyStylexPluginPattern.test(source)) {
    withStylex = source.replace(legacyStylexPluginPattern, stylexPlugin);
  } else if (emptyStylexPluginPattern.test(source)) {
    withStylex = source.replace(emptyStylexPluginPattern, stylexPlugin);
  } else if (source.includes("stylex.vite(")) {
    throw new Error(
      "Could not safely update the existing StyleX plugin. Configure stylex.vite() manually.",
    );
  } else {
    withStylex = (source.includes(importLine) ? source : `${importLine}\n${source}`).replace(
      pluginPattern,
      (_, plugins: string) => {
        const prefix = plugins.trim() ? `${stylexPlugin}, ${plugins}` : stylexPlugin;
        return `plugins: [${prefix}]`;
      },
    );
  }
  return withStylex;
}

async function writeViteFiles(
  projectDirectory: string,
  tokenDirectory: string,
  refreshLegacyTokens: boolean,
) {
  const { path: configPath, source: configSource } = await readViteConfig(projectDirectory);
  const configuredVite = configureVite(configSource);
  await addResetImport(projectDirectory);
  await writeNooehFiles(projectDirectory, tokenDirectory, refreshLegacyTokens);
  await writeFile(configPath, configuredVite, "utf8");
  console.log(`Configured Vite and created ${relative(projectDirectory, tokenDirectory)}.`);
}

async function addResetImport(projectDirectory: string) {
  const cssPath = join(projectDirectory, "src/index.css");
  const resetImport = '@import "@nooeh/ui/reset.css";';

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

async function writeNooehFiles(
  projectDirectory: string,
  tokenDirectory: string,
  refreshLegacyTokens = false,
) {
  await mkdir(tokenDirectory, { recursive: true });
  for (const file of await getTokenFiles()) {
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
        await installDependencies(projectDirectory, ["@nooeh/ui", "@stylexjs/unplugin"], true);
      }
    }
    if (options.framework === "vite") {
      await writeViteFiles(projectDirectory, tokenDirectory, Boolean(options.force));
    } else {
      await writeNooehFiles(projectDirectory, tokenDirectory, Boolean(options.force));
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
