import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { createInterface } from "node:readline/promises";

import { defaultConfig, hasConfig, resolveConfigAlias, writeConfig } from "./config.js";
import { configureVite } from "./source.js";
import { getMissingDependencies, installDependencies } from "./dependencies.js";
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

function getRelativeImportPath(from: string, to: string) {
  const path = relative(dirname(from), to).split(sep).join("/");
  return path.startsWith(".") ? path : `./${path}`;
}

type PlannedFile = { path: string; source: string; flag: "w" | "wx" };

async function prepareFoundationFiles(tokenDirectory: string, refreshLegacyTokens: boolean) {
  const files: PlannedFile[] = [];
  for (const file of await getFoundationFiles()) {
    const path = join(tokenDirectory, file.name);
    let currentSource: string;
    try {
      currentSource = await readFile(path, "utf8");
    } catch (error) {
      if (
        typeof error !== "object" ||
        error === null ||
        !("code" in error) ||
        error.code !== "ENOENT"
      )
        throw error;
      files.push({ path, source: file.content, flag: "wx" });
      continue;
    }
    if (
      refreshLegacyTokens &&
      file.name === "semantic.stylex.ts" &&
      currentSource.includes('bgCanvas: "initial"') &&
      currentSource.includes('overlay: "initial"')
    ) {
      files.push({ path, source: file.content, flag: "w" });
    }
  }
  return files;
}

async function prepareResetImport(
  projectDirectory: string,
  tokenDirectory: string,
): Promise<PlannedFile | undefined> {
  const path = join(projectDirectory, "src/index.css");
  const resetImport = `@import "${getRelativeImportPath(path, join(tokenDirectory, "reset.css"))}";`;
  let source: string;
  try {
    source = await readFile(path, "utf8");
  } catch (error) {
    if (
      typeof error !== "object" ||
      error === null ||
      !("code" in error) ||
      error.code !== "ENOENT"
    )
      throw error;
    return { path, source: `${resetImport}\n`, flag: "wx" };
  }
  if (source.includes(resetImport)) return undefined;
  return { path, source: `${resetImport}\n\n${source}`, flag: "w" };
}

export async function prepareInitialization(projectDirectory: string, options: CliOptions) {
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
    const viteConfig =
      options.framework === "vite" ? await readViteConfig(projectDirectory) : undefined;
    const configuredVite = viteConfig ? configureVite(viteConfig.source) : undefined;
    const files = await prepareFoundationFiles(tokenDirectory, Boolean(options.force));
    if (viteConfig && configuredVite !== undefined) {
      const resetFile = await prepareResetImport(projectDirectory, tokenDirectory);
      if (resetFile) files.push(resetFile);
      files.push({ path: viteConfig.path, source: configuredVite, flag: "w" });
    }
    const runtimeDependencies = await getMissingDependencies(projectDirectory, [
      "@stylexjs/stylex",
    ]);
    const buildDependencies = await getMissingDependencies(projectDirectory, [
      "@stylexjs/unplugin",
    ]);
    return {
      files,
      runtimeDependencies: options["skip-dependencies"] ? [] : runtimeDependencies,
      buildDependencies:
        options["skip-dependencies"] || options.framework !== "vite" ? [] : buildDependencies,
      config: {
        accessibility: defaultConfig.accessibility,
        aliases: { ui: uiAlias, styles: stylesAlias },
      },
    };
  } finally {
    readline?.close();
  }
}

export async function applyInitialization(
  projectDirectory: string,
  plan: Awaited<ReturnType<typeof prepareInitialization>>,
) {
  await installDependencies(projectDirectory, plan.runtimeDependencies);
  await installDependencies(projectDirectory, plan.buildDependencies, true);
  for (const file of plan.files) {
    await mkdir(dirname(file.path), { recursive: true });
    await writeFile(file.path, file.source, { encoding: "utf8", flag: file.flag });
  }
  await writeConfig(projectDirectory, plan.config);
}

export async function init(projectDirectory: string, options: CliOptions, shouldLog = true) {
  const plan = await prepareInitialization(projectDirectory, options);
  await applyInitialization(projectDirectory, plan);
  if (shouldLog) console.log("✔ Initialized Nuee.");
}
