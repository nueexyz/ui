import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { hasConfig, readConfig, resolveConfigAlias } from "./config.js";

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type Check = {
  detail: string;
  name: string;
  status: "pass" | "warn";
};

async function readPackageJson(projectDirectory: string) {
  try {
    return JSON.parse(
      await readFile(resolve(projectDirectory, "package.json"), "utf8"),
    ) as PackageJson;
  } catch {
    return undefined;
  }
}

async function readProjectFile(projectDirectory: string, fileName: string) {
  try {
    return await readFile(resolve(projectDirectory, fileName), "utf8");
  } catch {
    return undefined;
  }
}

const entryFileNames = [
  "src/main.tsx",
  "src/main.jsx",
  "src/main.ts",
  "src/main.js",
  "src/index.tsx",
  "src/index.jsx",
  "src/index.ts",
  "src/index.js",
  "src/app/layout.tsx",
  "src/app/layout.jsx",
  "app/layout.tsx",
  "app/layout.jsx",
];

async function readEntrySources(projectDirectory: string) {
  const sources = await Promise.all(
    entryFileNames.map(async (fileName) => readProjectFile(projectDirectory, fileName)),
  );
  return sources.filter((source): source is string => source !== undefined);
}

async function hasStylexCompiler(projectDirectory: string) {
  const configFileNames = [
    "vite.config.ts",
    "vite.config.mts",
    "vite.config.js",
    "vite.config.mjs",
    "next.config.ts",
    "next.config.mjs",
    "next.config.js",
    "webpack.config.ts",
    "webpack.config.mjs",
    "webpack.config.js",
    "rsbuild.config.ts",
    "rsbuild.config.mjs",
    "rsbuild.config.js",
    "rspack.config.ts",
    "rspack.config.mjs",
    "rspack.config.js",
  ];
  const sources = await Promise.all(
    configFileNames.map(async (fileName) => readProjectFile(projectDirectory, fileName)),
  );

  return sources.some(
    (source) =>
      source?.includes("@stylexjs/unplugin") && /\b(?:stylex|unplugin)\.vite\(/.test(source),
  );
}

function hasDependency(packageJson: PackageJson | undefined, dependency: string) {
  return Boolean(
    packageJson?.dependencies?.[dependency] ?? packageJson?.devDependencies?.[dependency],
  );
}

export async function doctor(projectDirectory: string) {
  const checks: Check[] = [];
  const packageJson = await readPackageJson(projectDirectory);
  const entrySources = await readEntrySources(projectDirectory);

  if (!(await hasConfig(projectDirectory))) {
    checks.push({
      detail: "Run `nooeh init` to configure UI and styles aliases.",
      name: "nooeh.json",
      status: "warn",
    });
  } else {
    const config = await readConfig(projectDirectory);
    try {
      const uiDirectory = await resolveConfigAlias(
        projectDirectory,
        config.aliases.ui,
        "aliases.ui",
      );
      const tokenDirectory = await resolveConfigAlias(
        projectDirectory,
        config.aliases.styles,
        "aliases.styles",
      );
      checks.push({
        detail: `${config.aliases.ui} → ${uiDirectory}`,
        name: "UI path",
        status: "pass",
      });
      const tokenFiles = ["color-palette.stylex.ts", "semantic.stylex.ts", "themes.stylex.ts"];
      const hasTokenFiles = await Promise.all(
        tokenFiles.map(async (fileName) => {
          try {
            await access(resolve(tokenDirectory, fileName));
            return true;
          } catch {
            return false;
          }
        }),
      );
      checks.push(
        hasTokenFiles.every(Boolean)
          ? {
              detail: `${config.aliases.styles} contains local token sources.`,
              name: "Local tokens",
              status: "pass",
            }
          : {
              detail: `Create local token sources in ${config.aliases.styles} with \`nooeh init --force\`.`,
              name: "Local tokens",
              status: "warn",
            },
      );
    } catch (error) {
      checks.push({
        detail: error instanceof Error ? error.message : "Could not resolve nooeh aliases.",
        name: "Aliases",
        status: "warn",
      });
    }
  }

  checks.push(
    hasDependency(packageJson, "@stylexjs/stylex")
      ? { detail: "@stylexjs/stylex is installed.", name: "StyleX runtime", status: "pass" }
      : {
          detail:
            "It is installed automatically by the first `nooeh add`. Use --skip-dependencies to skip installation.",
          name: "StyleX runtime",
          status: "warn",
        },
  );
  checks.push(
    (await hasStylexCompiler(projectDirectory))
      ? {
          detail: "A supported config enables the StyleX compiler.",
          name: "StyleX compiler",
          status: "pass",
        }
      : {
          detail:
            "Configure the StyleX compiler for your bundler. Vite users can run `nooeh init --framework vite`.",
          name: "StyleX compiler",
          status: "warn",
        },
  );
  checks.push(
    entrySources.some((source) => /import\s+["'][^"']+\.css["']/.test(source))
      ? {
          detail: "An application entry imports a CSS entry point for StyleX output.",
          name: "CSS entry point",
          status: "pass",
        }
      : {
          detail: "Import an application CSS file from an entry point so StyleX can emit CSS.",
          name: "CSS entry point",
          status: "warn",
        },
  );
  checks.push(
    hasDependency(packageJson, "@stylexjs/unplugin")
      ? {
          detail: "@stylexjs/unplugin is installed.",
          name: "StyleX build plugin",
          status: "pass",
        }
      : {
          detail: "Add @stylexjs/unplugin to your bundler configuration, such as Vite or esbuild.",
          name: "StyleX build plugin",
          status: "warn",
        },
  );

  for (const check of checks) {
    console.log(`${check.status === "pass" ? "✓" : "!"} ${check.name}: ${check.detail}`);
  }

  return checks.every((check) => check.status === "pass");
}
