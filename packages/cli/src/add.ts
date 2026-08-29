import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

import { defaultConfig, hasConfig, readConfig, resolveAliasPath } from "./config.js";
import { init } from "./init.js";
import { resolveComponent } from "./registry.js";

export type AddOptions = {
  defaults?: boolean;
  "dry-run"?: boolean;
  skipDependencyInstall?: boolean;
  "skip-dependencies"?: boolean;
  uiSourceDirectory?: string;
} & Record<string, boolean | string | undefined>;

const localUiSourceDirectory = fileURLToPath(new URL("../../ui/src", import.meta.url));

function isNotFoundError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

async function askYesNo(question: string, defaultValue: boolean) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return defaultValue;

  const readline = createInterface({ input: process.stdin, output: process.stdout });
  const defaultLabel = defaultValue ? "Y/n" : "y/N";

  try {
    const answer = (await readline.question(`${question} (${defaultLabel}) `)).trim().toLowerCase();
    if (!answer) return defaultValue;
    return answer === "y" || answer === "yes";
  } finally {
    readline.close();
  }
}

async function writeSource(
  source: string,
  targetPath: string,
  confirmOverwrite: () => Promise<boolean>,
) {
  try {
    const currentSource = await readFile(targetPath, "utf8");
    if (currentSource === source) return "unchanged";
    if (!(await confirmOverwrite())) throw new Error("Component installation canceled.");
  } catch (error) {
    if (!isNotFoundError(error)) throw error;
  }

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, source, "utf8");
  return "written";
}

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent ?? "";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("yarn")) return "yarn";
  if (userAgent.startsWith("bun")) return "bun";
  return "npm";
}

function installDependencies(projectDirectory: string, dependencies: readonly string[]) {
  if (dependencies.length === 0) return Promise.resolve();
  const packageManager = detectPackageManager();
  const arguments_ =
    packageManager === "npm" ? ["install", ...dependencies] : ["add", ...dependencies];

  return new Promise<void>((resolvePromise, reject) => {
    const child = spawn(packageManager, arguments_, { cwd: projectDirectory, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`Dependency installation failed with exit code ${code}.`));
    });
  });
}

async function getPrimaryExport(componentName: string, uiSourceDirectory: string) {
  const indexSource = await readFile(join(uiSourceDirectory, componentName, "index.ts"), "utf8");
  return indexSource.match(/export\s*{\s*([A-Za-z0-9]+)/)?.[1] ?? componentName;
}

export async function add(
  projectDirectory: string,
  componentName: string,
  options: AddOptions = {},
) {
  if (!componentName) throw new Error("Enter a component name to add.");

  const shouldInitialize = !(await hasConfig(projectDirectory));
  if (shouldInitialize && !options["dry-run"]) await init(projectDirectory, options);
  const config = shouldInitialize ? defaultConfig : await readConfig(projectDirectory);
  const resolved = await resolveComponent(componentName);
  const uiSourceDirectory = options.uiSourceDirectory ?? localUiSourceDirectory;
  const uiDirectory = await resolveAliasPath(projectDirectory, config.aliases.ui);
  let isOverwriteConfirmed = false;

  async function confirmOverwrite() {
    if (isOverwriteConfirmed) return true;

    isOverwriteConfirmed = await askYesNo(
      "Files with the same names already exist. Overwrite all?",
      false,
    );
    return isOverwriteConfirmed;
  }

  for (const file of resolved.files) {
    const source = file.content ?? (await readFile(join(uiSourceDirectory, file.path), "utf8"));
    if (options["dry-run"]) {
      console.log(`Will add: ${join(uiDirectory, file.path)}`);
      continue;
    }
    await writeSource(source, join(uiDirectory, file.path), confirmOverwrite);
  }

  const shouldInstallDependencies =
    resolved.externalDependencies.length > 0 &&
    !options.skipDependencyInstall &&
    !options["skip-dependencies"] &&
    !options["dry-run"] &&
    (await askYesNo(
      `Install external dependencies (${resolved.externalDependencies.join(", ")})?`,
      true,
    ));

  if (shouldInstallDependencies) {
    await installDependencies(projectDirectory, resolved.externalDependencies);
  }

  const primaryExport = URL.canParse(componentName)
    ? resolved.components[0]
    : await getPrimaryExport(componentName, uiSourceDirectory);
  if (options["dry-run"]) {
    console.log(`Will add ${componentName}.`);
    return;
  }

  console.log(`Added ${componentName}.`);
  console.log(`import { ${primaryExport} } from "${config.aliases.ui}/${componentName}"`);
}
