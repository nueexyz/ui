import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { defaultConfig, readConfig } from "../dist/config.js";
import { init } from "../dist/init.js";

test("init stores a custom UI alias", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await init(projectDirectory, {
      "skip-dependencies": true,
      "ui-alias": "~/design/ui",
    });

    assert.deepEqual(await readConfig(projectDirectory), {
      ...defaultConfig,
      aliases: { ui: "~/design/ui" },
    });
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init creates framework-neutral theme files without changing an entry point", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await writeFile(join(projectDirectory, "src/main.tsx"), "export {};\n");
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });

    assert.equal(
      await readFile(join(projectDirectory, "src/styles/nooeh.css"), "utf8"),
      '@import "@nooeh/ui/global.css";\n',
    );
    assert.match(
      await readFile(join(projectDirectory, "src/styles/nooeh/theme.ts"), "utf8"),
      /root\.dataset\.theme = mode/,
    );
    await access(join(projectDirectory, "src/styles/nooeh/color-palette.stylex.ts"));
    await access(join(projectDirectory, "src/styles/nooeh/tokens.stylex.ts"));
    await access(join(projectDirectory, "src/styles/nooeh/themes.stylex.ts"));
    assert.equal(await readFile(join(projectDirectory, "src/main.tsx"), "utf8"), "export {};\n");
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init keeps existing local nooeh files", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src/styles"), { recursive: true });
    await writeFile(join(projectDirectory, "src/styles/nooeh.css"), "/* custom */\n");
    await mkdir(join(projectDirectory, "src/styles/nooeh"), { recursive: true });
    await writeFile(join(projectDirectory, "src/styles/nooeh/theme.ts"), "/* custom */\n");
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });

    assert.equal(
      await readFile(join(projectDirectory, "src/styles/nooeh.css"), "utf8"),
      "/* custom */\n",
    );
    assert.equal(
      await readFile(join(projectDirectory, "src/styles/nooeh/theme.ts"), "utf8"),
      "/* custom */\n",
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init configures a standard Vite project", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeFile(
      join(projectDirectory, "vite.config.ts"),
      'import { defineConfig } from "vite";\n\nexport default defineConfig({ plugins: [] });\n',
    );
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await writeFile(join(projectDirectory, "src/main.tsx"), "export {};\n");
    await init(projectDirectory, { defaults: true, framework: "vite", "skip-dependencies": true });

    assert.equal(
      await readFile(join(projectDirectory, "src/styles/nooeh.css"), "utf8"),
      '@import "@nooeh/ui/global.css";\n',
    );
    assert.match(
      await readFile(join(projectDirectory, "vite.config.ts"), "utf8"),
      /stylex\(\{ useCSSLayers: true \}\)/,
    );
    assert.match(
      await readFile(join(projectDirectory, "src/main.tsx"), "utf8"),
      /applyNooehTheme\(\)/,
    );
    assert.match(
      await readFile(join(projectDirectory, "src/styles/nooeh/theme.ts"), "utf8"),
      /root\.dataset\.theme = mode/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init does not change a Vite project when its plugin array cannot be updated safely", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    const configSource = "export default { plugins: createPlugins() };\n";
    await writeFile(join(projectDirectory, "vite.config.ts"), configSource);
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await writeFile(join(projectDirectory, "src/main.tsx"), "export {};\n");

    await assert.rejects(
      () =>
        init(projectDirectory, { defaults: true, framework: "vite", "skip-dependencies": true }),
      /Could not safely update/,
    );
    assert.equal(await readFile(join(projectDirectory, "vite.config.ts"), "utf8"), configSource);
    await assert.rejects(() => access(join(projectDirectory, "src/styles/nooeh/theme.ts")));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init writes tokens to a configured project-local directory", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await init(projectDirectory, {
      defaults: true,
      "skip-dependencies": true,
      tokens: "src/design-system/nooeh",
    });

    const config = await readConfig(projectDirectory);
    assert.equal(config.tokens, "src/design-system/nooeh");
    await access(join(projectDirectory, "src/design-system/nooeh/tokens.stylex.ts"));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});
