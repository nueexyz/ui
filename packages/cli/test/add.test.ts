import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { registryItems } from "@nooeh/registry";
import { add } from "../dist/add.js";
import { configFileName, defaultConfig, readConfig } from "../dist/config.js";
import { init } from "../dist/init.js";
import { writeTsconfig } from "./helpers.ts";

test("add creates the default config and copies a component with its foundation", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await add(projectDirectory, "button", { defaults: true, skipDependencyInstall: true });
    assert.deepEqual(await readConfig(projectDirectory), defaultConfig);
    await access(join(projectDirectory, configFileName));

    const buttonSource = await readFile(
      join(projectDirectory, "src/components/ui/button.tsx"),
      "utf8",
    );
    assert.match(buttonSource, /export function Button/);
    assert.match(buttonSource, /from "\.\.\/\.\.\/styles\/semantic\.stylex"/);
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add uses the configured local token directory", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await init(projectDirectory, {
      defaults: true,
      "skip-dependencies": true,
      ui: "@/design/ui",
      tokens: "@/design-system/nooeh",
    });
    await add(projectDirectory, "card", { skipDependencyInstall: true });

    assert.match(
      await readFile(join(projectDirectory, "src/design/ui/card.tsx"), "utf8"),
      /from "\.\.\/\.\.\/design-system\/nooeh\/semantic\.stylex"/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add resolves aliases from tsconfig paths", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeFile(
      join(projectDirectory, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          paths: {
            "~shared/*": ["./src/shared/*"],
          },
        },
      }),
    );
    await init(projectDirectory, {
      defaults: true,
      "skip-dependencies": true,
      styles: "~shared/styles",
      ui: "~shared/ui",
    });
    await add(projectDirectory, "card", { skipDependencyInstall: true });

    await access(join(projectDirectory, "src/shared/ui/card.tsx"));
    assert.match(
      await readFile(join(projectDirectory, "src/shared/ui/card.tsx"), "utf8"),
      /from "\.\.\/styles\/semantic\.stylex"/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add resolves component and icon dependencies", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });
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
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });
    await add(projectDirectory, "card", { skipDependencyInstall: true });

    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/card.tsx"), "utf8"),
      /export function Card/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("every registry component uses the project's local StyleX tokens", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });

    for (const componentName of Object.keys(registryItems)) {
      await add(projectDirectory, componentName, { skipDependencyInstall: true });
    }

    for (const item of Object.values(registryItems)) {
      for (const file of item.files) {
        if (!file.endsWith(".tsx")) continue;

        const source = await readFile(join(projectDirectory, "src/components/ui", file), "utf8");
        assert.doesNotMatch(source, /@nooeh\/tokens/);
      }
    }
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("add installs renamed and new components", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-cli-"));

  try {
    await writeTsconfig(projectDirectory);
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });
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
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });
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
    await init(projectDirectory, { defaults: true, "skip-dependencies": true });
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
