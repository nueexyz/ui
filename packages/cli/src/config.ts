import { access, readFile, writeFile } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

export const configFileName = "cachette.json";

export const configVersion = 1;

export type CachetteConfig = {
  aliases: {
    ui: string;
  };
  version?: number;
};

type TypeScriptConfig = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, readonly string[]>;
  };
};

type TypeScriptPaths = Record<string, readonly string[]>;

export const defaultConfig: CachetteConfig = {
  aliases: { ui: "@/components/ui" },
  version: configVersion,
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
    throw new Error(`${name} 경로는 프로젝트 안에 있어야 합니다.`);
  }
}

export function validateConfig(config: unknown): CachetteConfig {
  const candidate = config as { aliases?: { ui?: unknown }; version?: unknown };
  if (!candidate.aliases || typeof candidate.aliases.ui !== "string" || !candidate.aliases.ui) {
    throw new Error("aliases.ui를 설정해 주세요.");
  }

  if (candidate.version !== undefined && candidate.version !== configVersion) {
    throw new Error(`지원하지 않는 cachette.json 버전입니다: ${String(candidate.version)}`);
  }

  return {
    aliases: { ui: candidate.aliases.ui },
    version: configVersion,
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
      throw new Error("cachette.json이 없습니다. 먼저 `cachette init`을 실행해 주세요.");
    }
    throw error;
  }
}

export async function writeConfig(projectDirectory: string, config: CachetteConfig) {
  const validatedConfig = validateConfig(config);
  const configPath = resolve(projectDirectory, configFileName);
  await writeFile(configPath, `${JSON.stringify(validatedConfig, null, 2)}\n`, "utf8");
  return configPath;
}

function findAliasTarget(alias: string, paths?: TypeScriptPaths) {
  for (const [pattern, targets] of Object.entries(paths ?? {})) {
    const target = targets[0];
    if (!target) continue;

    const starIndex = pattern.indexOf("*");
    if (starIndex === -1) {
      if (alias === pattern) return target;
      continue;
    }

    const prefix = pattern.slice(0, starIndex);
    const suffix = pattern.slice(starIndex + 1);
    if (!alias.startsWith(prefix) || !alias.endsWith(suffix)) continue;

    const value = alias.slice(prefix.length, alias.length - suffix.length);
    return target.replaceAll("*", value);
  }

  return undefined;
}

export async function resolveAliasPath(projectDirectory: string, alias: string) {
  for (const fileName of ["tsconfig.json", "jsconfig.json"]) {
    const configPath = resolve(projectDirectory, fileName);

    try {
      const projectConfig = JSON.parse(await readFile(configPath, "utf8")) as TypeScriptConfig;
      const compilerOptions = projectConfig.compilerOptions ?? {};
      const aliasTarget = findAliasTarget(alias, compilerOptions.paths);
      if (!aliasTarget) continue;

      const baseDirectory = resolve(projectDirectory, compilerOptions.baseUrl ?? ".");
      const resolvedPath = resolve(baseDirectory, aliasTarget);
      ensureRelativePath(projectDirectory, resolvedPath, "UI");
      return resolvedPath;
    } catch (error) {
      if (isNotFoundError(error)) continue;
      throw error;
    }
  }

  throw new Error(
    `${alias} 별칭을 tsconfig.json 또는 jsconfig.json의 compilerOptions.paths에서 찾을 수 없습니다.`,
  );
}
