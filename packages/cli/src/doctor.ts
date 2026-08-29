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
      detail: "`dumo init`을 실행하면 기본 UI 별칭을 설정합니다.",
      name: "dumo.json",
      status: "warn",
    });
  } else {
    const config = await readConfig(projectDirectory);
    const uiDirectory = await resolveAliasPath(projectDirectory, config.aliases.ui);
    checks.push({
      detail: `${config.aliases.ui} → ${uiDirectory}`,
      name: "UI 별칭",
      status: "pass",
    });
  }

  checks.push(
    hasDependency(packageJson, "@stylexjs/stylex")
      ? { detail: "@stylexjs/stylex가 설치되어 있습니다.", name: "StyleX 런타임", status: "pass" }
      : {
          detail:
            "첫 `dumo add`에서 자동 설치됩니다. 설치를 건너뛰려면 --skip-dependencies를 사용하세요.",
          name: "StyleX 런타임",
          status: "warn",
        },
  );
  checks.push(
    hasDependency(packageJson, "@stylexjs/unplugin")
      ? {
          detail: "@stylexjs/unplugin이 설치되어 있습니다.",
          name: "StyleX 빌드 플러그인",
          status: "pass",
        }
      : {
          detail: "Vite, esbuild 등 번들러 설정에 @stylexjs/unplugin을 추가해야 합니다.",
          name: "StyleX 빌드 플러그인",
          status: "warn",
        },
  );

  for (const check of checks) {
    console.log(`${check.status === "pass" ? "✓" : "!"} ${check.name}: ${check.detail}`);
  }

  return checks.every((check) => check.status === "pass");
}
