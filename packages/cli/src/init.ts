import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { createInterface } from "node:readline/promises";

import {
  configFileName,
  defaultConfig,
  hasConfig,
  resolveConfigPath,
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

function getSourceDirectory(projectDirectory: string) {
  return join(projectDirectory, "src");
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
  const importLine = 'import stylex from "@stylexjs/unplugin/vite";';
  const pluginPattern = /plugins:\s*\[([^\]]*)\]/s;

  if (source.includes("stylex(")) return source;
  if (!pluginPattern.test(source)) {
    throw new Error(
      "Could not safely update the Vite plugins array. Add stylex({ useCSSLayers: true }) manually.",
    );
  }

  const withImport = source.includes(importLine) ? source : `${importLine}\n${source}`;
  return withImport.replace(pluginPattern, (_, plugins: string) => {
    const prefix = plugins.trim()
      ? `stylex({ useCSSLayers: true }), ${plugins}`
      : "stylex({ useCSSLayers: true })";
    return `plugins: [${prefix}]`;
  });
}

function toModuleSpecifier(fromDirectory: string, path: string) {
  const source = relative(fromDirectory, path).replace(/\.ts$/, "").split(sep).join("/");
  return source.startsWith(".") ? source : `./${source}`;
}

async function writeViteFiles(projectDirectory: string, tokenDirectory: string) {
  const { path: configPath, source: configSource } = await readViteConfig(projectDirectory);
  const configuredVite = configureVite(configSource);
  const { entryPath, stylePath, themePath } = getNooehPaths(projectDirectory, tokenDirectory);
  const entrySource = await readFile(entryPath, "utf8");
  const styleImport = `import "${toModuleSpecifier(dirname(entryPath), stylePath)}";`;
  const themeImport = `import { applyNooehTheme } from "${toModuleSpecifier(dirname(entryPath), themePath)}";`;
  const themeApply = "applyNooehTheme();";

  const imports = [styleImport, themeImport].filter((line) => !entrySource.includes(line));
  const nextEntrySource = `${imports.join("\n")}\n${entrySource}`;
  await writeNooehFiles(projectDirectory, tokenDirectory);
  await writeFile(
    entryPath,
    nextEntrySource.includes(themeApply)
      ? nextEntrySource
      : `${imports.length ? `${imports.join("\n")}\n` : ""}${themeApply}\n${entrySource}`,
    "utf8",
  );
  await writeFile(configPath, configuredVite, "utf8");
  console.log(`Configured Vite and created ${relative(projectDirectory, stylePath)}.`);
}

function getNooehPaths(projectDirectory: string, tokenDirectory: string) {
  const sourceDirectory = getSourceDirectory(projectDirectory);
  return {
    entryPath: join(sourceDirectory, "main.tsx"),
    stylePath: join(dirname(tokenDirectory), "nooeh.css"),
    themePath: join(tokenDirectory, "theme.ts"),
  };
}

async function writeNooehFiles(projectDirectory: string, tokenDirectory: string) {
  const { entryPath, stylePath, themePath } = getNooehPaths(projectDirectory, tokenDirectory);

  await mkdir(dirname(stylePath), { recursive: true });
  await mkdir(tokenDirectory, { recursive: true });
  await writeFileIfMissing(stylePath, '@import "@nooeh/ui/global.css";\n');
  for (const file of await getTokenFiles()) {
    await writeFileIfMissing(join(tokenDirectory, file.name), file.content);
  }
  await writeFileIfMissing(
    themePath,
    `import { darkColorTheme, darkShadowTheme, lightColorTheme, lightShadowTheme } from "./themes.stylex";\nimport * as stylex from "@stylexjs/stylex";\n\nexport type NooehColorMode = "light" | "dark";\n\nconst themeClassNames = [\n  stylex.props(lightColorTheme, lightShadowTheme).className,\n  stylex.props(darkColorTheme, darkShadowTheme).className,\n]\n  .filter(Boolean)\n  .flatMap((className) => className.split(" "));\n\nexport function applyNooehTheme(mode: NooehColorMode = "light") {\n  const colorTheme = mode === "dark" ? darkColorTheme : lightColorTheme;\n  const shadowTheme = mode === "dark" ? darkShadowTheme : lightShadowTheme;\n  const themeClassName = stylex.props(colorTheme, shadowTheme).className ?? "";\n  const root = document.documentElement;\n\n  root.dataset.theme = mode;\n  root.classList.remove(...themeClassNames);\n  root.classList.add(...themeClassName.split(" ").filter(Boolean));\n}\n`,
  );

  return { entryPath, stylePath, themePath };
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
    const uiPath =
      options.ui ??
      (readline
        ? await ask("Enter the UI directory.", defaultConfig.paths.ui, readline)
        : defaultConfig.paths.ui);
    const tokens =
      options.tokens ??
      (readline
        ? await ask("Enter the token directory.", defaultConfig.paths.tokens, readline)
        : defaultConfig.paths.tokens);
    const tokenDirectory = resolveConfigPath(projectDirectory, tokens, "paths.tokens");
    resolveConfigPath(projectDirectory, uiPath, "paths.ui");
    if (!options["skip-dependencies"]) {
      await installDependencies(projectDirectory, ["@stylexjs/stylex"]);
      await installDependencies(projectDirectory, ["@stylexjs/unplugin"], true);
    }
    if (options.framework === "vite") {
      await writeViteFiles(projectDirectory, tokenDirectory);
    } else {
      const { stylePath, themePath } = await writeNooehFiles(projectDirectory, tokenDirectory);
      console.log(
        `Created ${relative(projectDirectory, stylePath)} and ${relative(projectDirectory, themePath)}.`,
      );
      console.log("Import the CSS and call applyNooehTheme() from your application entry point.");
    }
    await writeConfig(projectDirectory, { paths: { ui: uiPath, tokens } });
  } finally {
    readline?.close();
  }

  console.log(`Created configuration: ${configFileName}`);
}
