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
    const child = spawn(packageManager, arguments_, { cwd: projectDirectory, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`Dependency installation failed with exit code ${code}.`));
    });
  });
}
