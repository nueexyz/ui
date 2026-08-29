import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { hasConfig, readConfig, resolveAliasPath } from "./config.js";

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

function hasDependency(packageJson: PackageJson | undefined, dependency: string) {
  return Boolean(
    packageJson?.dependencies?.[dependency] ?? packageJson?.devDependencies?.[dependency],
  );
}

export async function doctor(projectDirectory: string) {
  const checks: Check[] = [];
  const packageJson = await readPackageJson(projectDirectory);

  if (!(await hasConfig(projectDirectory))) {
    checks.push({
      detail: "Run `dumo init` to configure the default UI alias.",
      name: "dumo.json",
      status: "warn",
    });
  } else {
    const config = await readConfig(projectDirectory);
    const uiDirectory = await resolveAliasPath(projectDirectory, config.aliases.ui);
    checks.push({
      detail: `${config.aliases.ui} → ${uiDirectory}`,
      name: "UI alias",
      status: "pass",
    });
  }

  checks.push(
    hasDependency(packageJson, "@stylexjs/stylex")
      ? { detail: "@stylexjs/stylex is installed.", name: "StyleX runtime", status: "pass" }
      : {
          detail:
            "It is installed automatically by the first `dumo add`. Use --skip-dependencies to skip installation.",
          name: "StyleX runtime",
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
