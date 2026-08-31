import { access, readFile, writeFile } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

export const configFileName = "nooeh.json";

export type NooehConfig = {
  paths: {
    ui: string;
    tokens: string;
  };
};

export const defaultConfig: NooehConfig = {
  paths: {
    ui: "src/components/ui",
    tokens: "src/design/nooeh",
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
  if (!candidate.paths && (candidate.aliases || candidate.tokens)) {
    throw new Error(
      "This nooeh.json uses an older format. Run `nooeh init --force` to create path-based configuration.",
    );
  }
  if (!candidate.paths || typeof candidate.paths.ui !== "string" || !candidate.paths.ui.trim()) {
    throw new Error("Configure paths.ui.");
  }
  if (typeof candidate.paths.tokens !== "string" || !candidate.paths.tokens.trim()) {
    throw new Error("Configure paths.tokens.");
  }
  if (isAbsolute(candidate.paths.ui) || isAbsolute(candidate.paths.tokens)) {
    throw new Error("paths must stay inside the project directory.");
  }

  return {
    paths: {
      ui: candidate.paths.ui,
      tokens: candidate.paths.tokens,
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
  ensureRelativePath(projectDirectory, validatedConfig.paths.ui, "paths.ui");
  ensureRelativePath(projectDirectory, validatedConfig.paths.tokens, "paths.tokens");
  const configPath = resolve(projectDirectory, configFileName);
  await writeFile(configPath, `${JSON.stringify(validatedConfig, null, 2)}\n`, "utf8");
  return configPath;
}

export function resolveConfigPath(projectDirectory: string, path: string, name: string) {
  ensureRelativePath(projectDirectory, path, name);
  return resolve(projectDirectory, path);
}
