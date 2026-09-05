import { access, readFile, writeFile } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";
import { parse, type ParseError } from "jsonc-parser";
import { createPathsMatcher, parseTsconfig } from "get-tsconfig";

export const configFileName = "nuee.json";

export type NueeConfig = {
  accessibility: {
    respectReducedMotion: boolean;
  };
  aliases: {
    ui: string;
    styles: string;
  };
};

export const defaultConfig: NueeConfig = {
  accessibility: {
    respectReducedMotion: true,
  },
  aliases: {
    ui: "@/components/ui",
    styles: "@/styles",
  },
};

export async function hasConfig(projectDirectory: string) {
  try {
    await access(resolve(projectDirectory, configFileName));
    return true;
  } catch (error) {
    if (!isNotFoundError(error)) throw error;
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

export function validateConfig(config: unknown): NueeConfig {
  if (typeof config !== "object" || config === null || Array.isArray(config)) {
    throw new Error("Configure nuee.json as an object.");
  }
  const candidate = config as {
    accessibility?: { respectReducedMotion?: unknown };
    aliases?: unknown;
    paths?: { ui?: unknown; tokens?: unknown };
    tokens?: unknown;
  };
  if (candidate.paths || candidate.tokens) {
    throw new Error(
      "This nuee.json uses an older format. Run `nuee init --force` to create alias-based configuration.",
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
  if (
    candidate.accessibility !== undefined &&
    (candidate.accessibility === null ||
      typeof candidate.accessibility !== "object" ||
      typeof candidate.accessibility.respectReducedMotion !== "boolean")
  ) {
    throw new Error("Configure accessibility.respectReducedMotion as a boolean.");
  }
  const respectReducedMotion =
    typeof candidate.accessibility?.respectReducedMotion === "boolean"
      ? candidate.accessibility.respectReducedMotion
      : true;

  return {
    accessibility: {
      respectReducedMotion,
    },
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
      throw new Error("nuee.json was not found. Run `nuee init` first.");
    }
    throw error;
  }
}

export async function writeConfig(projectDirectory: string, config: NueeConfig) {
  const validatedConfig = validateConfig(config);
  const configPath = resolve(projectDirectory, configFileName);
  await writeFile(configPath, `${JSON.stringify(validatedConfig, null, 2)}\n`, "utf8");
  return configPath;
}

export function resolveConfigPath(projectDirectory: string, path: string, name: string) {
  ensureRelativePath(projectDirectory, path, name);
  return resolve(projectDirectory, path);
}

async function readTsConfig(projectDirectory: string) {
  for (const fileName of ["tsconfig.json", "jsconfig.json"]) {
    const path = resolve(projectDirectory, fileName);
    try {
      const source = await readFile(path, "utf8");
      const errors: ParseError[] = [];
      const value: unknown = parse(source, errors, { allowTrailingComma: true });
      if (errors.length || !value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error(`Invalid configuration: ${fileName}`);
      }
      return { path, config: parseTsconfig(path) };
    } catch (error) {
      if (!isNotFoundError(error)) throw error;
    }
  }
  return undefined;
}

export async function resolveConfigAlias(projectDirectory: string, alias: string, name: string) {
  const tsConfig = await readTsConfig(projectDirectory);
  const paths = tsConfig?.config.compilerOptions?.paths;
  // Only explicit paths mappings override the conventional @/src fallback.
  const matched =
    paths &&
    Object.keys(paths).some((pattern) => {
      const wildcard = pattern.indexOf("*");
      if (wildcard === -1) return pattern === alias;
      return (
        alias.startsWith(pattern.slice(0, wildcard)) && alias.endsWith(pattern.slice(wildcard + 1))
      );
    });
  if (tsConfig && matched) {
    const targets = createPathsMatcher(tsConfig)?.(alias);
    if (targets?.[0]) return resolveConfigPath(projectDirectory, targets[0], name);
  } else if (alias.startsWith("@/")) {
    return resolveConfigPath(projectDirectory, join("src", alias.slice(2)), name);
  }
  throw new Error(
    `Could not resolve ${name} (${alias}). Add it to tsconfig.json or jsconfig.json compilerOptions.paths.`,
  );
}
