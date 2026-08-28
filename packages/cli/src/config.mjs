import { access, readFile, writeFile } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

export const configFileName = "cachette.config.json";

export const defaultConfig = {
  paths: {
    ui: "src/components/ui",
    tokens: "src/styles/cachette",
    globalCss: "src/styles/cachette/global.css",
  },
  aliases: {
    ui: "@/components/ui",
    tokens: "@/styles/cachette",
  },
};

export async function hasConfig(projectDirectory) {
  try {
    await access(resolve(projectDirectory, configFileName));
    return true;
  } catch {
    return false;
  }
}

function ensureRelativePath(projectDirectory, path, name) {
  const absolutePath = resolve(projectDirectory, path);
  const relativePath = relative(projectDirectory, absolutePath);
  if (isAbsolute(relativePath) || relativePath.startsWith("..")) {
    throw new Error(`${name} 경로는 프로젝트 안에 있어야 합니다.`);
  }
}

export function validateConfig(config, projectDirectory) {
  if (!config.paths?.ui || !config.paths?.tokens || !config.paths?.globalCss) {
    throw new Error("paths.ui, paths.tokens, paths.globalCss를 모두 설정해 주세요.");
  }
  if (!config.aliases?.ui || !config.aliases?.tokens) {
    throw new Error("aliases.ui와 aliases.tokens를 모두 설정해 주세요.");
  }

  ensureRelativePath(projectDirectory, config.paths.ui, "UI");
  ensureRelativePath(projectDirectory, config.paths.tokens, "토큰");
  ensureRelativePath(projectDirectory, config.paths.globalCss, "전역 CSS");
  return config;
}

export async function readConfig(projectDirectory) {
  const configPath = resolve(projectDirectory, configFileName);

  try {
    const config = JSON.parse(await readFile(configPath, "utf8"));
    return validateConfig(config, projectDirectory);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("cachette.config.json이 없습니다. 먼저 `cachette init`을 실행해 주세요.");
    }
    throw error;
  }
}

export async function writeConfig(projectDirectory, config) {
  validateConfig(config, projectDirectory);
  const configPath = resolve(projectDirectory, configFileName);
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  return configPath;
}
