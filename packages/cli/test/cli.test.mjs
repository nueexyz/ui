import assert from "node:assert/strict";
import { access, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { add } from "../dist/add.js";
import { configFileName, defaultConfig, readConfig } from "../dist/config.js";
import { init } from "../dist/init.js";

async function writeTsconfig(projectDirectory) {
  await writeFile(
    join(projectDirectory, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
  );
}

test("add creates the default config and copies a component with its foundation", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await add(projectDirectory, "button", { defaults: true, skipDependencyInstall: true });
    assert.deepEqual(await readConfig(projectDirectory), defaultConfig);
    await access(join(projectDirectory, configFileName));

    const buttonSource = await readFile(
      join(projectDirectory, "src/components/ui/button/Button.tsx"),
      "utf8",
    );
    const buttonStyleSource = await readFile(
      join(projectDirectory, "src/components/ui/button/button.stylex.ts"),
      "utf8",
    );
    assert.match(buttonSource, /export function Button/);
    assert.match(buttonStyleSource, /from "@cachette\/tokens\/tokens\.stylex"/);
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init stores a custom UI alias", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));

  try {
    await init(projectDirectory, {
      "ui-alias": "~/design/ui",
    });

    assert.deepEqual(await readConfig(projectDirectory), {
      aliases: {
        ui: "~/design/ui",
      },
    });
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add resolves component and icon dependencies", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await add(projectDirectory, "message-scroller", { skipDependencyInstall: true });

    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/button/Button.tsx"), "utf8"),
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

test("add installs renamed and new components", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true });
    await add(projectDirectory, "banner", { skipDependencyInstall: true });
    await add(projectDirectory, "link", { skipDependencyInstall: true });

    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/banner/Banner.tsx"), "utf8"),
      /export function Banner/,
    );
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/link/Link.tsx"), "utf8"),
      /export const Link/,
    );
    await assert.rejects(
      () => add(projectDirectory, "alert", { skipDependencyInstall: true }),
      /알 수 없는 컴포넌트입니다: alert/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add dry-run does not write files", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await add(projectDirectory, "card", { "dry-run": true, skipDependencyInstall: true });
    await assert.rejects(() => access(join(projectDirectory, configFileName)));
    await assert.rejects(() => access(join(projectDirectory, "src/components/ui/card/Card.tsx")));
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add installs a component from a registry URL", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));
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
