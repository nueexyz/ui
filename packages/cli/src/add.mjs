import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { spawn } from "node:child_process";

import { hasConfig, readConfig } from "./config.mjs";
import { init } from "./init.mjs";
import { resolveComponent, tokensSourceDirectory, uiSourceDirectory } from "./registry.mjs";

async function writeSource(sourcePath, targetPath, transform, overwrite) {
  const source = transform(await readFile(sourcePath, "utf8"));

  try {
    const currentSource = await readFile(targetPath, "utf8");
    if (currentSource === source) return "unchanged";
    if (!overwrite)
      throw new Error(
        `파일이 이미 있습니다: ${targetPath}\n덮어쓰려면 --overwrite를 사용해 주세요.`,
      );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
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

function installDependencies(projectDirectory, dependencies) {
  if (dependencies.length === 0) return Promise.resolve();
  const packageManager = detectPackageManager();
  const arguments_ =
    packageManager === "npm" ? ["install", ...dependencies] : ["add", ...dependencies];

  return new Promise((resolvePromise, reject) => {
    const child = spawn(packageManager, arguments_, { cwd: projectDirectory, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`의존성 설치가 종료 코드 ${code}로 실패했습니다.`));
    });
  });
}

async function getPrimaryExport(componentName) {
  const indexSource = await readFile(join(uiSourceDirectory, componentName, "index.ts"), "utf8");
  return indexSource.match(/export\s*{\s*([A-Za-z0-9]+)/)?.[1] ?? componentName;
}

export async function add(projectDirectory, componentName, options) {
  if (!componentName) throw new Error("추가할 컴포넌트 이름을 입력해 주세요.");

  if (!(await hasConfig(projectDirectory))) await init(projectDirectory, options);
  const config = await readConfig(projectDirectory);
  const resolved = await resolveComponent(componentName);
  const uiDirectory = resolve(projectDirectory, config.paths.ui);
  const tokensDirectory = resolve(projectDirectory, config.paths.tokens);
  const transform = (source) => source.replaceAll("@cachette/tokens/", `${config.aliases.tokens}/`);

  for (const component of resolved.components) {
    const sourceDirectory = join(uiSourceDirectory, component);
    const entries = await readdir(sourceDirectory, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      await writeSource(
        join(sourceDirectory, entry.name),
        join(uiDirectory, component, entry.name),
        transform,
        options.overwrite,
      );
    }
  }

  if (resolved.needsIcon) {
    await writeSource(
      join(uiSourceDirectory, "Icon.tsx"),
      join(uiDirectory, "Icon.tsx"),
      transform,
      options.overwrite,
    );
  }

  if (resolved.needsTokens) {
    const entries = await readdir(tokensSourceDirectory, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      await writeSource(
        join(tokensSourceDirectory, entry.name),
        join(tokensDirectory, entry.name),
        transform,
        options.overwrite,
      );
    }
  }

  await writeSource(
    join(uiSourceDirectory, "global.css"),
    resolve(projectDirectory, config.paths.globalCss),
    transform,
    options.overwrite,
  );

  if (!options["no-install"]) {
    await installDependencies(projectDirectory, resolved.externalDependencies);
  }

  const primaryExport = await getPrimaryExport(componentName);
  console.log(`${componentName} 컴포넌트를 추가했습니다.`);
  console.log(`import { ${primaryExport} } from "${config.aliases.ui}/${componentName}"`);
}
