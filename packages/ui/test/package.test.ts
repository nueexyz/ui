import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";
import { build } from "vite";

const execFile = promisify(execFileCallback);
const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
const testDirectory = dirname(fileURLToPath(import.meta.url));

test("@nuee/ui CLI builds every added component in a Vite app", async () => {
  const projectDirectory = await mkdtemp(join(testDirectory, ".vite-app-"));

  try {
    await Promise.all([
      writeFile(
        join(projectDirectory, "package.json"),
        JSON.stringify({ name: "nuee-vite-app", private: true, type: "module" }),
      ),
      writeFile(
        join(projectDirectory, "tsconfig.json"),
        JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
      ),
      writeFile(
        join(projectDirectory, "vite.config.ts"),
        [
          'import { defineConfig } from "vite";',
          'import stylex from "@stylexjs/unplugin";',
          "",
          "function react() {",
          '  return { name: "react" };',
          "}",
          "",
          "export default defineConfig({",
          '  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },',
          "  plugins: [",
          "    stylex.vite({",
          '      aliases: { "@/styles/*": [new URL("./src/styles/*", import.meta.url).pathname] },',
          '      unstable_moduleResolution: { type: "commonJS" },',
          "    }),",
          "    react(),",
          "  ],",
          "});",
          "",
        ].join("\n"),
      ),
      writeFile(
        join(projectDirectory, "index.html"),
        '<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n',
      ),
    ]);
    await mkdir(join(projectDirectory, "src"));
    await Promise.all([
      writeFile(join(projectDirectory, "src/index.css"), "body { margin: 0; }\n"),
      writeFile(join(projectDirectory, "src/main.tsx"), 'import "./index.css";\n'),
    ]);

    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--framework",
      "vite",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    const packageJson = JSON.parse(await readFile(join(projectDirectory, "package.json"), "utf8"));
    assert.equal(packageJson.dependencies?.["@nuee/ui"], undefined);
    assert.equal(packageJson.devDependencies?.["@nuee/ui"], undefined);
    const { stdout } = await execFile(process.execPath, [cliPath, "list"]);
    const componentNames = stdout.trim().split("\n");
    await execFile(process.execPath, [
      cliPath,
      "add",
      ...componentNames,
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);

    const componentFileNames = await readdir(join(projectDirectory, "src/components/ui"));
    await writeFile(
      join(projectDirectory, "src/main.tsx"),
      [
        'import "./index.css";',
        ...componentFileNames
          .filter((fileName) => fileName.endsWith(".tsx"))
          .map((fileName) => `import "./components/ui/${fileName.replace(/\.tsx$/, "")}";`),
        "",
      ].join("\n"),
    );

    const viteConfig = await readFile(join(projectDirectory, "vite.config.ts"), "utf8");
    assert.ok(viteConfig.indexOf("stylex.vite") < viteConfig.indexOf("    react(),"));
    assert.match(
      await readFile(join(projectDirectory, "src/index.css"), "utf8"),
      /@import "\.\/styles\/reset\.css"/,
    );

    await build({ configFile: join(projectDirectory, "vite.config.ts"), root: projectDirectory });
    await access(join(projectDirectory, "dist/index.html"));
  } finally {
    await rm(projectDirectory, { recursive: true, force: true });
  }
});

test("@nuee/ui CLI keeps the UI package out of a generated Vite app", async () => {
  const projectDirectory = await mkdtemp(join(testDirectory, ".vite-app-"));

  try {
    await Promise.all([
      writeFile(
        join(projectDirectory, "package.json"),
        JSON.stringify({ name: "nuee-vite-app", private: true, type: "module" }),
      ),
      writeFile(
        join(projectDirectory, "tsconfig.json"),
        JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
      ),
      writeFile(
        join(projectDirectory, "vite.config.ts"),
        [
          'import { defineConfig } from "vite";',
          'import stylex from "@stylexjs/unplugin";',
          "",
          "export default defineConfig({",
          '  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },',
          '  plugins: [stylex.vite({ aliases: { "@/styles/*": [new URL("./src/styles/*", import.meta.url).pathname] } })],',
          "});",
          "",
        ].join("\n"),
      ),
      writeFile(
        join(projectDirectory, "index.html"),
        '<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n',
      ),
    ]);
    await mkdir(join(projectDirectory, "src"));
    await Promise.all([
      writeFile(join(projectDirectory, "src/index.css"), "body { margin: 0; }\n"),
      writeFile(
        join(projectDirectory, "src/main.tsx"),
        'import "./index.css";\nimport { Message } from "@/components/ui/message";\nvoid Message;\n',
      ),
    ]);

    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--framework",
      "vite",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "message",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);

    const packageJson = JSON.parse(await readFile(join(projectDirectory, "package.json"), "utf8"));
    assert.equal(packageJson.dependencies?.["@nuee/ui"], undefined);
    assert.equal(packageJson.devDependencies?.["@nuee/ui"], undefined);
    await access(join(projectDirectory, "src/components/ui/message.tsx"));
    await build({ configFile: join(projectDirectory, "vite.config.ts"), root: projectDirectory });
    await access(join(projectDirectory, "dist/index.html"));
  } finally {
    await rm(projectDirectory, { recursive: true, force: true });
  }
});

test("@nuee/ui CLI initializes a project and adds a card", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nuee-ui-cli-"));

  try {
    await writeFile(
      join(projectDirectory, "tsconfig.json"),
      JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
    );
    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "card",
      "--cwd",
      projectDirectory,
      "--skip-dependencies",
    ]);

    const config = JSON.parse(await readFile(join(projectDirectory, "nuee.json"), "utf8"));
    assert.equal(config.aliases.ui, "@/components/ui");
    assert.equal(config.aliases.styles, "@/styles");
    await access(join(projectDirectory, "src/styles/semantic.stylex.ts"));
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/card.tsx"), "utf8"),
      /Card/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("published package keeps Base UI primitive escape hatches for documentation", async () => {
  const buttonSource = await readFile(
    fileURLToPath(new URL("../dist/button.js", import.meta.url)),
    "utf8",
  );
  assert.match(buttonSource, /react\/compiler-runtime/);

  const primitives = await import("../dist/primitives.js");
  assert.ok(primitives.Popover);
});

test("production StyleX CSS contains no invalid numeric declarations", async () => {
  const css = await readFile(new URL("../dist/stylex.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /:\s*[^;}]*\b(?:(?:NaN|Infinity)[a-z%]*|undefined\b)/);
});
