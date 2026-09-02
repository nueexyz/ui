import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { configFileName, defaultConfig, readConfig } from "../dist/config.js";
import { init } from "../dist/init.js";

test("init stores a custom UI path", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await init(projectDirectory, {
      "skip-dependencies": true,
      ui: "@/design/ui",
    });

    assert.deepEqual(await readConfig(projectDirectory), {
      ...defaultConfig,
      aliases: { ...defaultConfig.aliases, ui: "@/design/ui" },
    });
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("readConfig explains how to replace an older configuration", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeFile(
      join(projectDirectory, configFileName),
      JSON.stringify({ paths: { ui: "src/components/ui", tokens: "src/styles/nooeh" } }),
    );

    await assert.rejects(
      () => readConfig(projectDirectory),
      /uses an older format\. Run `nooeh init --force`/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init creates local StyleX sources without changing an entry point", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await writeFile(join(projectDirectory, "src/main.tsx"), "export {};\n");
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });

    await access(join(projectDirectory, "src/styles/color-palette.stylex.ts"));
    await access(join(projectDirectory, "src/styles/semantic.stylex.ts"));
    await access(join(projectDirectory, "src/styles/themes.stylex.ts"));
    assert.equal(await readFile(join(projectDirectory, "src/main.tsx"), "utf8"), "export {};\n");
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init keeps existing local token files", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src/styles"), { recursive: true });
    await writeFile(join(projectDirectory, "src/styles/semantic.stylex.ts"), "/* custom */\n");
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });

    assert.equal(
      await readFile(join(projectDirectory, "src/styles/semantic.stylex.ts"), "utf8"),
      "/* custom */\n",
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init --force refreshes legacy semantic defaults", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src/styles"), { recursive: true });
    await writeFile(
      join(projectDirectory, "src/styles/semantic.stylex.ts"),
      'export const colorVars = { bgCanvas: "initial" };\nexport const shadowVars = { overlay: "initial" };\n',
    );
    await init(projectDirectory, { defaults: true, force: true, "skip-dependencies": true });

    assert.doesNotMatch(
      await readFile(join(projectDirectory, "src/styles/semantic.stylex.ts"), "utf8"),
      /bgCanvas: "initial"/,
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

    assert.match(
      await readFile(join(projectDirectory, "vite.config.ts"), "utf8"),
      /unstable_moduleResolution: \{ type: "commonJS" \}/,
    );
    assert.doesNotMatch(
      await readFile(join(projectDirectory, "vite.config.ts"), "utf8"),
      /aliases:|resolve:/,
    );
    assert.equal(await readFile(join(projectDirectory, "src/main.tsx"), "utf8"), "export {};\n");
    await access(join(projectDirectory, "src/styles/themes.stylex.ts"));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init --force simplifies the legacy Nooeh StyleX plugin", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeFile(
      join(projectDirectory, "vite.config.ts"),
      `import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      aliases: { "@/styles/*": ["/ROOT/src/styles/*"] },
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: new URL(".", import.meta.url).pathname,
      },
    }),
  ],
});
`,
    );
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await init(projectDirectory, {
      defaults: true,
      force: true,
      framework: "vite",
      "skip-dependencies": true,
    });

    assert.doesNotMatch(
      await readFile(join(projectDirectory, "vite.config.ts"), "utf8"),
      /useCSSLayers|aliases:/,
    );
    assert.match(
      await readFile(join(projectDirectory, "vite.config.ts"), "utf8"),
      /unstable_moduleResolution: \{ type: "commonJS" \}/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init does not change a Vite project when its plugin array cannot be updated safely", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    const configSource = "export default defineConfig({});\n";
    await writeFile(join(projectDirectory, "vite.config.ts"), configSource);
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await writeFile(join(projectDirectory, "src/main.tsx"), "export {};\n");

    await assert.rejects(
      init(projectDirectory, { defaults: true, framework: "vite", "skip-dependencies": true }),
      /Could not safely update/,
    );
    assert.equal(await readFile(join(projectDirectory, "vite.config.ts"), "utf8"), configSource);
    await assert.rejects(() => access(join(projectDirectory, "src/styles/semantic.stylex.ts")));
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
      tokens: "@/design-system/nooeh",
    });

    const config = await readConfig(projectDirectory);
    assert.equal(config.aliases.styles, "@/design-system/nooeh");
    await access(join(projectDirectory, "src/design-system/nooeh/semantic.stylex.ts"));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init rejects a path outside the project", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await assert.rejects(
      () =>
        init(projectDirectory, {
          defaults: true,
          "skip-dependencies": true,
          tokens: "../outside",
        }),
      /Could not resolve aliases\.styles/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});
