import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { createInterface } from "node:readline/promises";

import { configFileName, defaultConfig, hasConfig, writeConfig } from "./config.js";
import { installDependencies } from "./dependencies.js";
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

async function writeViteFiles(projectDirectory: string) {
  const { path: configPath, source: configSource } = await readViteConfig(projectDirectory);
  const configuredVite = configureVite(configSource);
  const { entryPath, stylePath } = getNooehPaths(projectDirectory);
  const entrySource = await readFile(entryPath, "utf8");
  const styleImport = 'import "./styles/nooeh.css";';
  const themeImport = 'import { applyNooehTheme } from "./nooeh-theme";';
  const themeApply = "applyNooehTheme();";

  const imports = [styleImport, themeImport].filter((line) => !entrySource.includes(line));
  const nextEntrySource = `${imports.join("\n")}\n${entrySource}`;
  await writeNooehFiles(projectDirectory);
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

function getNooehPaths(projectDirectory: string) {
  const sourceDirectory = getSourceDirectory(projectDirectory);
  return {
    entryPath: join(sourceDirectory, "main.tsx"),
    stylePath: join(sourceDirectory, "styles", "nooeh.css"),
    themePath: join(sourceDirectory, "nooeh-theme.ts"),
  };
}

async function writeNooehFiles(projectDirectory: string) {
  const { entryPath, stylePath, themePath } = getNooehPaths(projectDirectory);

  await mkdir(dirname(stylePath), { recursive: true });
  await writeFileIfMissing(stylePath, '@import "@nooeh/ui/global.css";\n');
  await writeFileIfMissing(
    themePath,
    `import { darkColorTheme, darkShadowTheme, lightColorTheme, lightShadowTheme } from "@nooeh/tokens/themes.stylex";\nimport * as stylex from "@stylexjs/stylex";\n\nexport type NooehColorMode = "light" | "dark";\n\nlet activeThemeClassName = "";\n\nexport function applyNooehTheme(mode: NooehColorMode = "light") {\n  const colorTheme = mode === "dark" ? darkColorTheme : lightColorTheme;\n  const shadowTheme = mode === "dark" ? darkShadowTheme : lightShadowTheme;\n  const nextThemeClassName = stylex.props(colorTheme, shadowTheme).className ?? "";\n  const root = document.documentElement;\n\n  root.classList.remove(...activeThemeClassName.split(" ").filter(Boolean));\n  root.classList.add(...nextThemeClassName.split(" ").filter(Boolean));\n  activeThemeClassName = nextThemeClassName;\n}\n`,
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
    const uiAlias =
      options["ui-alias"] ??
      (readline
        ? await ask("Enter the UI alias.", defaultConfig.aliases.ui, readline)
        : defaultConfig.aliases.ui);
    if (!options["skip-dependencies"]) {
      await installDependencies(projectDirectory, ["@nooeh/tokens", "@stylexjs/stylex"]);
      await installDependencies(projectDirectory, ["@stylexjs/unplugin"], true);
    }
    if (options.framework === "vite") {
      await writeViteFiles(projectDirectory);
    } else {
      const { stylePath, themePath } = await writeNooehFiles(projectDirectory);
      console.log(
        `Created ${relative(projectDirectory, stylePath)} and ${relative(projectDirectory, themePath)}.`,
      );
      console.log("Import the CSS and call applyNooehTheme() from your application entry point.");
    }
    await writeConfig(projectDirectory, { aliases: { ui: uiAlias } });
  } finally {
    readline?.close();
  }

  console.log(`Created configuration: ${configFileName}`);
}
