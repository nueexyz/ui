import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { add } from "../dist/add.js";
import { configFileName, defaultConfig, readConfig } from "../dist/config.js";
import { docs } from "../dist/docs.js";
import { doctor } from "../dist/doctor.js";
import { init } from "../dist/init.js";
import { newComponent } from "../dist/new-component.js";

async function writeTsconfig(projectDirectory) {
  await writeFile(
    join(projectDirectory, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
  );
}

test("add creates the default config and copies a component with its foundation", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await add(projectDirectory, "button", { defaults: true, skipDependencyInstall: true });
    assert.deepEqual(await readConfig(projectDirectory), defaultConfig);
    await access(join(projectDirectory, configFileName));

    const buttonSource = await readFile(
      join(projectDirectory, "src/components/ui/button.tsx"),
      "utf8",
    );
    assert.match(buttonSource, /export function Button/);
    assert.match(buttonSource, /from "@nooeh\/tokens\/tokens\.stylex"/);
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init stores a custom UI alias", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await init(projectDirectory, {
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
    await init(projectDirectory, { defaults: true });

    assert.equal(
      await readFile(join(projectDirectory, "src/styles/nooeh.css"), "utf8"),
      '@import "@nooeh/ui/global.css";\n',
    );
    assert.match(
      await readFile(join(projectDirectory, "src/nooeh-theme.ts"), "utf8"),
      /lightShadowTheme/,
    );
    assert.equal(await readFile(join(projectDirectory, "src/main.tsx"), "utf8"), "export {};\n");
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init keeps existing nooeh integration files", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src/styles"), { recursive: true });
    await writeFile(join(projectDirectory, "src/styles/nooeh.css"), "/* custom */\n");
    await writeFile(join(projectDirectory, "src/nooeh-theme.ts"), "/* custom */\n");
    await init(projectDirectory, { defaults: true });

    assert.equal(
      await readFile(join(projectDirectory, "src/styles/nooeh.css"), "utf8"),
      "/* custom */\n",
    );
    assert.equal(
      await readFile(join(projectDirectory, "src/nooeh-theme.ts"), "utf8"),
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
    await init(projectDirectory, { defaults: true, framework: "vite" });

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
      await readFile(join(projectDirectory, "src/nooeh-theme.ts"), "utf8"),
      /darkColorTheme/,
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
      () => init(projectDirectory, { defaults: true, framework: "vite" }),
      /Could not safely update/,
    );
    assert.equal(await readFile(join(projectDirectory, "vite.config.ts"), "utf8"), configSource);
    await assert.rejects(() => access(join(projectDirectory, "src/nooeh-theme.ts")));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("doctor verifies the compiler, CSS import, and theme application", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await writeFile(
      join(projectDirectory, "package.json"),
      JSON.stringify({
        dependencies: { "@stylexjs/stylex": "1.0.0" },
        devDependencies: { "@stylexjs/unplugin": "1.0.0" },
      }),
    );
    await writeFile(
      join(projectDirectory, "vite.config.ts"),
      'import stylex from "@stylexjs/unplugin/vite";\nexport default { plugins: [stylex()] };\n',
    );
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await writeFile(join(projectDirectory, "src/main.tsx"), "export {};\n");
    await init(projectDirectory, { defaults: true, framework: "vite" });

    assert.equal(await doctor(projectDirectory), true);
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add resolves component and icon dependencies", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await add(projectDirectory, "message-scroller", { skipDependencyInstall: true });

    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/button.tsx"), "utf8"),
      /export function Button/,
    );
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/Icon.tsx"), "utf8"),
      /iconRegistry/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add uses packaged registry content without a UI source directory", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await add(projectDirectory, "card", { skipDependencyInstall: true });

    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/card.tsx"), "utf8"),
      /export function Card/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add installs renamed and new components", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await add(projectDirectory, "banner", { skipDependencyInstall: true });
    await add(projectDirectory, "link", { skipDependencyInstall: true });

    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/banner.tsx"), "utf8"),
      /export function Banner/,
    );
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/link.tsx"), "utf8"),
      /export const Link/,
    );
    await assert.rejects(
      () => add(projectDirectory, "alert", { skipDependencyInstall: true }),
      /Unknown component: alert/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add dry-run does not write files", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await add(projectDirectory, "card", { "dry-run": true, skipDependencyInstall: true });
    await assert.rejects(() => access(join(projectDirectory, configFileName)));
    await assert.rejects(() => access(join(projectDirectory, "src/components/ui/card.tsx")));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add installs a component from a registry URL", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));
  const item = {
    dependencies: [],
    files: [{ path: "notice.ts", content: "export const notice = true;\n" }],
    name: "notice",
    registryDependencies: [],
  };

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await add(
      projectDirectory,
      `data:application/json,${encodeURIComponent(JSON.stringify(item))}`,
      {
        skipDependencyInstall: true,
      },
    );
    assert.equal(
      await readFile(join(projectDirectory, "src/components/ui/notice.ts"), "utf8"),
      item.files[0].content,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add rejects a registry file path that escapes the UI directory", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));
  const item = {
    dependencies: [],
    files: [{ path: "../outside.ts", content: "export const outside = true;\n" }],
    name: "outside",
    registryDependencies: [],
  };

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await assert.rejects(
      () =>
        add(projectDirectory, `data:application/json,${encodeURIComponent(JSON.stringify(item))}`, {
          skipDependencyInstall: true,
        }),
      /must stay inside the UI directory/,
    );
    await assert.rejects(() => access(join(projectDirectory, "src/components/outside.ts")));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("new creates a StyleX component without overwriting an existing file", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await newComponent(projectDirectory, "status-chip");

    const componentPath = join(projectDirectory, "src/components/ui/status-chip.tsx");
    assert.match(await readFile(componentPath, "utf8"), /export function StatusChip/);
    await assert.rejects(
      () => newComponent(projectDirectory, "status-chip"),
      /will not be overwritten/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("docs prints the component installation contract", () => {
  const output = [];
  const write = console.log;
  console.log = (value) => output.push(value);

  try {
    docs("button");
  } finally {
    console.log = write;
  }

  assert.match(output.join("\n"), /pnpm dlx @nooeh\/ui add button/);
  assert.match(output.join("\n"), /@base-ui\/react/);
});
