import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
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

function getStylexPlugin(stylesAlias: string, tokenDirectory: string, projectDirectory: string) {
  const tokenPath = relative(projectDirectory, tokenDirectory).split(sep).join("/");
  const aliasPattern = `${stylesAlias}/*`;
  const aliasTarget = `/ROOT/${tokenPath}/*`;

  return `stylex.vite({
    aliases: { ${JSON.stringify(aliasPattern)}: [${JSON.stringify(aliasTarget)}] },
    unstable_moduleResolution: {
      type: "commonJS",
      rootDir: new URL(".", import.meta.url).pathname,
    },
  })`;
}

function configureVite(
  source: string,
  stylesAlias: string,
  tokenDirectory: string,
  projectDirectory: string,
) {
  const importLine = 'import stylex from "@stylexjs/unplugin";';
  const pluginPattern = /plugins:\s*\[([^\]]*)\]/s;
  const configPattern = /defineConfig\(\{\s*/;
  const stylexPlugin = getStylexPlugin(stylesAlias, tokenDirectory, projectDirectory);
  const legacyStylexPluginPattern = /stylex\.vite\(\{\s*useCSSLayers:\s*true\s*\}\)/;
  const emptyStylexPluginPattern = /stylex\.vite\(\)/;

  if (!source.includes("stylex.vite(") && !pluginPattern.test(source)) {
    throw new Error("Could not safely update the Vite plugins array. Add stylex.vite() manually.");
  }

  let withStylex = source;
  if (source.includes("unstable_moduleResolution")) {
    withStylex = source.replace(/\s*useCSSLayers:\s*true,?/, "");
  } else if (legacyStylexPluginPattern.test(source)) {
    withStylex = source.replace(legacyStylexPluginPattern, stylexPlugin);
  } else if (emptyStylexPluginPattern.test(source)) {
    withStylex = source.replace(emptyStylexPluginPattern, stylexPlugin);
  } else if (source.includes("stylex.vite(")) {
    throw new Error(
      "Could not safely update the existing StyleX plugin. Add Nooeh's aliases and unstable_moduleResolution manually.",
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
  if (withStylex.includes("alias:")) return withStylex;
  if (!configPattern.test(withStylex)) {
    throw new Error('Could not safely add the "@" Vite alias. Add resolve.alias["@"] manually.');
  }

  return withStylex.replace(
    configPattern,
    'defineConfig({\n  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },\n  ',
  );
}

async function writeViteFiles(
  projectDirectory: string,
  tokenDirectory: string,
  stylesAlias: string,
  refreshLegacyTokens: boolean,
) {
  const { path: configPath, source: configSource } = await readViteConfig(projectDirectory);
  const configuredVite = configureVite(configSource, stylesAlias, tokenDirectory, projectDirectory);
  await writeNooehFiles(projectDirectory, tokenDirectory, refreshLegacyTokens);
  await writeFile(configPath, configuredVite, "utf8");
  console.log(`Configured Vite and created ${relative(projectDirectory, tokenDirectory)}.`);
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

function isLegacyNooehSource(fileName: string, source: string) {
  if (fileName === "semantic.stylex.ts") {
    return source.includes('bgCanvas: "initial"') && source.includes('overlay: "initial"');
  }

  return (
    fileName === "theme-provider.tsx" &&
    source.includes("const styles = stylex.create({") &&
    source.includes("data-theme={resolvedTheme}")
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
    if (shouldRefreshLegacySources && isLegacyNooehSource(fileName, currentSource)) {
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
        await installDependencies(projectDirectory, ["@stylexjs/unplugin"], true);
      }
    }
    if (options.framework === "vite") {
      await writeViteFiles(projectDirectory, tokenDirectory, stylesAlias, Boolean(options.force));
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
