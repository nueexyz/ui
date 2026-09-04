import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, relative, resolve } from "node:path";
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

async function writeSource(source: string, targetPath: string) {
  try {
    const currentSource = await readFile(targetPath, "utf8");
    if (currentSource === source) return "unchanged";
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

function replaceTokenImport(source: string, stylesAlias: string) {
  return source.replaceAll("@nuee/tokens/semantic.stylex", `${stylesAlias}/semantic.stylex`);
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
    if (isNotFoundError(error)) return dependencies;
    throw error;
  }
}

export async function add(
  projectDirectory: string,
  componentNames: string | readonly string[],
  options: AddOptions = {},
) {
  const componentNameList = [
    ...new Set(typeof componentNames === "string" ? [componentNames] : componentNames),
  ];
  if (componentNameList.length === 0 || componentNameList.some((componentName) => !componentName)) {
    throw new Error("Enter at least one component name to add.");
  }

  const shouldInitialize = !(await hasConfig(projectDirectory));
  if (shouldInitialize && !options["dry-run"]) {
    await init(
      projectDirectory,
      {
        ...options,
        "skip-dependencies": options.skipDependencyInstall || options["skip-dependencies"],
      },
      false,
    );
  }
  const config =
    options["dry-run"] && shouldInitialize ? defaultConfig : await readConfig(projectDirectory);
  const resolvedList = await Promise.all(componentNameList.map(resolveComponent));
  const uiDirectory = await resolveConfigAlias(projectDirectory, config.aliases.ui, "aliases.ui");
  const sources = resolvedList.flatMap((resolved) =>
    resolved.files.map((file) => ({
      source: config.accessibility.respectReducedMotion
        ? replaceTokenImport(file.content, config.aliases.styles)
        : removeReducedMotionStyles(replaceTokenImport(file.content, config.aliases.styles)),
      targetPath: resolveTargetPath(uiDirectory, file.path),
    })),
  );
  const overwriteFileNames: string[] = [];

  if (!options["dry-run"]) {
    for (const { source, targetPath } of sources) {
      try {
        if ((await readFile(targetPath, "utf8")) !== source)
          overwriteFileNames.push(basename(targetPath));
      } catch (error) {
        if (!isNotFoundError(error)) throw error;
      }
    }

    if (overwriteFileNames.length > 0) {
      const fileLabel = overwriteFileNames.join(", ");
      const shouldOverwrite = await askYesNo(
        `Overwrite ${overwriteFileNames.length} existing file${overwriteFileNames.length === 1 ? "" : "s"} (${fileLabel})?`,
        false,
      );
      if (!shouldOverwrite) throw new Error("Component installation canceled.");
    }
  }

  for (const { source, targetPath } of sources) {
    if (options["dry-run"]) continue;
    await writeSource(source, targetPath);
  }

  const externalDependencySet = new Set<string>();
  for (const resolved of resolvedList) {
    for (const dependency of resolved.externalDependencies) externalDependencySet.add(dependency);
  }
  const externalDependencies = await getMissingDependencies(projectDirectory, [
    ...externalDependencySet,
  ]);
  const shouldInstallDependencies =
    externalDependencies.length > 0 &&
    !options.skipDependencyInstall &&
    !options["skip-dependencies"] &&
    !options["dry-run"];

  if (shouldInstallDependencies) {
    await installDependencies(projectDirectory, externalDependencies);
  }

  const primaryExportList = resolvedList.map((resolved) => resolved.primaryExport);
  if (options["dry-run"]) {
    console.log(`✔ Would add ${primaryExportList.join(", ")}.`);
    return;
  }

  console.log(`✔ Added ${primaryExportList.join(", ")}.`);
}
