import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { createInterface } from "node:readline/promises";

import { defaultConfig, hasConfig, readConfig, resolveConfigAlias } from "./config.js";
import { installDependencies } from "./dependencies.js";
import { init } from "./init.js";
import { resolveComponent } from "./registry.js";

export type AddOptions = {
  defaults?: boolean;
  "dry-run"?: boolean;
  skipDependencyInstall?: boolean;
  "skip-dependencies"?: boolean;
} & Record<string, boolean | string | undefined>;

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

function resolveTargetPath(uiDirectory: string, filePath: string) {
  if (isAbsolute(filePath)) throw new Error(`Registry file path must be relative: ${filePath}`);

  const targetPath = resolve(uiDirectory, filePath);
  const relativePath = relative(uiDirectory, targetPath);
  if (relativePath === ".." || relativePath.startsWith(`..${"/"}`) || isAbsolute(relativePath)) {
    throw new Error(`Registry file path must stay inside the UI directory: ${filePath}`);
  }

  return targetPath;
}

function replaceTokenImport(source: string, targetPath: string, stylesDirectory: string) {
  const tokenPath = join(stylesDirectory, "semantic.stylex");
  const importPath = relative(dirname(targetPath), tokenPath).split(sep).join("/");
  const relativeImportPath = importPath.startsWith(".") ? importPath : `./${importPath}`;

  return source.replaceAll("@nuee/tokens/semantic.stylex", relativeImportPath);
}

function removeReducedMotionStyles(source: string) {
  const mediaQuery = '"@media (prefers-reduced-motion: reduce)":';
  let transformedSource = source;
  let mediaQueryIndex = transformedSource.indexOf(mediaQuery);

  while (mediaQueryIndex !== -1) {
    const propertyStart = transformedSource.lastIndexOf("\n", mediaQueryIndex) + 1;
    const openingBraceIndex = transformedSource.indexOf("{", mediaQueryIndex + mediaQuery.length);
    let depth = 0;
    let propertyEnd = openingBraceIndex;

    for (let index = openingBraceIndex; index < transformedSource.length; index += 1) {
      if (transformedSource[index] === "{") depth += 1;
      if (transformedSource[index] === "}") depth -= 1;
      if (depth !== 0) continue;

      propertyEnd = index + 1;
      if (transformedSource[propertyEnd] === ",") propertyEnd += 1;
      if (transformedSource[propertyEnd] === "\n") propertyEnd += 1;
      break;
    }

    transformedSource =
      transformedSource.slice(0, propertyStart) + transformedSource.slice(propertyEnd);
    mediaQueryIndex = transformedSource.indexOf(mediaQuery);
  }

  return transformedSource;
}

export async function add(
  projectDirectory: string,
  componentName: string,
  options: AddOptions = {},
) {
  if (!componentName) throw new Error("Enter a component name to add.");

  const shouldInitialize = !(await hasConfig(projectDirectory));
  if (shouldInitialize && !options["dry-run"]) {
    await init(projectDirectory, {
      ...options,
      "skip-dependencies": options.skipDependencyInstall || options["skip-dependencies"],
    });
  }
  const config =
    options["dry-run"] && shouldInitialize ? defaultConfig : await readConfig(projectDirectory);
  const resolved = await resolveComponent(componentName);
  const uiDirectory = await resolveConfigAlias(projectDirectory, config.aliases.ui, "aliases.ui");
  const stylesDirectory = await resolveConfigAlias(
    projectDirectory,
    config.aliases.styles,
    "aliases.styles",
  );
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
    const targetPath = resolveTargetPath(uiDirectory, file.path);
    if (options["dry-run"]) {
      console.log(`Will add: ${targetPath}`);
      continue;
    }
    await writeSource(
      config.accessibility.respectReducedMotion
        ? replaceTokenImport(file.content, targetPath, stylesDirectory)
        : removeReducedMotionStyles(replaceTokenImport(file.content, targetPath, stylesDirectory)),
      targetPath,
      confirmOverwrite,
    );
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

  const primaryExport = resolved.primaryExport;
  if (options["dry-run"]) {
    console.log(`Will add ${componentName}.`);
    return;
  }

  console.log(`Added ${componentName}.`);
  console.log(`Export: ${primaryExport}`);
  console.log(`Location: ${relative(projectDirectory, join(uiDirectory, `${componentName}.tsx`))}`);
}
