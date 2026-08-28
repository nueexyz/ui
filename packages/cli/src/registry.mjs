import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import { dependencyVersions, tokensSourceDirectory, uiSourceDirectory } from "@cachette/registry";

function getPackageName(importPath) {
  if (importPath.startsWith("@")) return importPath.split("/").slice(0, 2).join("/");
  return importPath.split("/")[0];
}

function getImports(source) {
  return [...source.matchAll(/(?:from\s+|import\s+)["']([^"']+)["']/g)].map((match) => match[1]);
}

async function getComponentFiles(name) {
  const directory = join(uiSourceDirectory, name);
  const entries = await readdir(directory, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile());
}

export async function resolveComponent(name) {
  const components = new Set();
  const externalDependencies = new Set();
  let needsIcon = false;
  let needsTokens = false;

  async function visit(componentName) {
    if (components.has(componentName)) return;
    components.add(componentName);

    let files;
    try {
      files = await getComponentFiles(componentName);
    } catch (error) {
      if (error.code === "ENOENT") throw new Error(`알 수 없는 컴포넌트입니다: ${componentName}`);
      throw error;
    }

    for (const file of files) {
      const source = await readFile(join(uiSourceDirectory, componentName, file.name), "utf8");
      for (const importPath of getImports(source)) {
        if (importPath.startsWith("@cachette/tokens")) {
          needsTokens = true;
          continue;
        }
        if (importPath === "../Icon") {
          needsIcon = true;
          continue;
        }
        if (importPath.startsWith("../")) {
          await visit(importPath.slice(3).split("/")[0]);
          continue;
        }
        if (!importPath.startsWith(".")) {
          const packageName = getPackageName(importPath);
          if (packageName !== "react") externalDependencies.add(packageName);
        }
      }
    }
  }

  await visit(name);
  if (needsIcon) externalDependencies.add("@phosphor-icons/react");

  return {
    components: [...components],
    externalDependencies: [...externalDependencies].map(
      (dependency) => `${dependency}@${dependencyVersions[dependency] ?? "latest"}`,
    ),
    needsIcon,
    needsTokens,
  };
}

export { tokensSourceDirectory, uiSourceDirectory };
