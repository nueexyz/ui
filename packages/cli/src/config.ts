import { access, readFile, writeFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";

export const configFileName = "nooeh.json";

export type NooehConfig = {
  aliases: {
    ui: string;
    styles: string;
  };
};

export const defaultConfig: NooehConfig = {
  aliases: {
    ui: "@/components/ui",
    styles: "@/styles",
  },
};

export async function hasConfig(projectDirectory: string) {
  try {
    await access(resolve(projectDirectory, configFileName));
    return true;
  } catch {
    return false;
  }
}

function ensureRelativePath(projectDirectory: string, path: string, name: string) {
  const absolutePath = resolve(projectDirectory, path);
  const relativePath = relative(projectDirectory, absolutePath);
  if (isAbsolute(relativePath) || relativePath.startsWith("..")) {
    throw new Error(`${name} must be inside the project directory.`);
  }
}

export function validateConfig(config: unknown): NooehConfig {
  const candidate = config as {
    aliases?: unknown;
    paths?: { ui?: unknown; tokens?: unknown };
    tokens?: unknown;
  };
  if (candidate.paths || candidate.tokens) {
    throw new Error(
      "This nooeh.json uses an older format. Run `nooeh init --force` to create alias-based configuration.",
    );
  }
  if (!candidate.aliases || typeof candidate.aliases !== "object") {
    throw new Error("Configure aliases.");
  }
  const aliases = candidate.aliases as { ui?: unknown; styles?: unknown };
  if (typeof aliases.ui !== "string" || !aliases.ui.trim()) {
    throw new Error("Configure aliases.ui.");
  }
  if (typeof aliases.styles !== "string" || !aliases.styles.trim()) {
    throw new Error("Configure aliases.styles.");
  }

  return {
    aliases: {
      ui: aliases.ui,
      styles: aliases.styles,
    },
  };
}

function isNotFoundError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

export async function readConfig(projectDirectory: string) {
  const configPath = resolve(projectDirectory, configFileName);

  try {
    const config = JSON.parse(await readFile(configPath, "utf8"));
    return validateConfig(config);
  } catch (error) {
    if (isNotFoundError(error)) {
      throw new Error("nooeh.json was not found. Run `nooeh init` first.");
    }
    throw error;
  }
}

export async function writeConfig(projectDirectory: string, config: NooehConfig) {
  const validatedConfig = validateConfig(config);
  const configPath = resolve(projectDirectory, configFileName);
  await writeFile(configPath, `${JSON.stringify(validatedConfig, null, 2)}\n`, "utf8");
  return configPath;
}

export function resolveConfigPath(projectDirectory: string, path: string, name: string) {
  ensureRelativePath(projectDirectory, path, name);
  return resolve(projectDirectory, path);
}

type TsConfig = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
};

async function readTsConfig(projectDirectory: string) {
  for (const fileName of ["tsconfig.json", "jsconfig.json"]) {
    try {
      return JSON.parse(await readFile(resolve(projectDirectory, fileName), "utf8")) as TsConfig;
    } catch (error) {
      if (!isNotFoundError(error)) {
        continue;
      }
    }
  }

  return undefined;
}

function resolvePathAlias(alias: string, paths: Record<string, string[]>) {
  for (const [pattern, targets] of Object.entries(paths)) {
    const wildcardIndex = pattern.indexOf("*");
    if (wildcardIndex === -1) {
      if (pattern === alias) return targets[0];
      continue;
    }

    const prefix = pattern.slice(0, wildcardIndex);
    const suffix = pattern.slice(wildcardIndex + 1);
    if (!alias.startsWith(prefix) || !alias.endsWith(suffix)) continue;

    const wildcard = alias.slice(prefix.length, alias.length - suffix.length);
    return targets[0]?.replace("*", wildcard);
  }

  return undefined;
}

export async function resolveConfigAlias(projectDirectory: string, alias: string, name: string) {
  if (alias.startsWith("@/")) {
    return resolveConfigPath(projectDirectory, join("src", alias.slice(2)), name);
  }

  const tsConfig = await readTsConfig(projectDirectory);
  const target = tsConfig?.compilerOptions?.paths
    ? resolvePathAlias(alias, tsConfig.compilerOptions.paths)
    : undefined;
  if (!target) {
    throw new Error(
      `Could not resolve ${name} (${alias}). Add it to tsconfig.json or jsconfig.json compilerOptions.paths.`,
    );
  }

  return resolveConfigPath(
    projectDirectory,
    join(tsConfig?.compilerOptions?.baseUrl ?? ".", target),
    name,
  );
}
