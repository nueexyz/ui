import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent ?? "";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("yarn")) return "yarn";
  if (userAgent.startsWith("bun")) return "bun";
  return "npm";
}

export function installDependencies(
  projectDirectory: string,
  dependencies: readonly string[],
  isDevelopmentDependency = false,
) {
  if (dependencies.length === 0) return Promise.resolve();
  const packageManager = detectPackageManager();
  const developmentFlag = isDevelopmentDependency ? "-D" : undefined;
  const arguments_ =
    packageManager === "npm"
      ? ["install", developmentFlag, ...dependencies].filter((argument): argument is string =>
          Boolean(argument),
        )
      : ["add", developmentFlag, ...dependencies].filter((argument): argument is string =>
          Boolean(argument),
        );

  return new Promise<void>((resolvePromise, reject) => {
    const child = spawn(packageManager, arguments_, { cwd: projectDirectory, stdio: "ignore" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`Dependency installation failed with exit code ${code}.`));
    });
  });
}

function getPackageName(dependency: string) {
  const versionStart = dependency.lastIndexOf("@");
  return versionStart > 0 ? dependency.slice(0, versionStart) : dependency;
}

export async function getMissingDependencies(
  projectDirectory: string,
  dependencies: readonly string[],
) {
  try {
    const packageJson = JSON.parse(
      await readFile(resolve(projectDirectory, "package.json"), "utf8"),
    ) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const installedDependencies = new Set([
      ...Object.keys(packageJson.dependencies ?? {}),
      ...Object.keys(packageJson.devDependencies ?? {}),
    ]);

    return dependencies.filter(
      (dependency) => !installedDependencies.has(getPackageName(dependency)),
    );
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT")
      return dependencies;
    throw error;
  }
}
