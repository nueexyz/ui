import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { add } from "../src/add.mjs";
import { defaultConfig, readConfig } from "../src/config.mjs";
import { init } from "../src/init.mjs";

test("add creates the default config and copies a component with its foundation", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));

  try {
    await add(projectDirectory, "button", { defaults: true, "no-install": true });
    assert.deepEqual(await readConfig(projectDirectory), defaultConfig);

    const buttonSource = await readFile(
      join(projectDirectory, "src/components/ui/button/Button.tsx"),
      "utf8",
    );
    const buttonStyleSource = await readFile(
      join(projectDirectory, "src/components/ui/button/button.stylex.ts"),
      "utf8",
    );
    const tokensSource = await readFile(
      join(projectDirectory, "src/styles/cachette/tokens.stylex.ts"),
      "utf8",
    );

    assert.match(buttonSource, /export function Button/);
    assert.match(buttonStyleSource, /from "@\/styles\/cachette\/tokens\.stylex"/);
    assert.match(tokensSource, /export const colorVars/);
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("init stores custom paths and aliases", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-cli-"));

  try {
    await init(projectDirectory, {
      "global-css": "app/cachette.css",
      "tokens-alias": "~/design/tokens",
      "ui-alias": "~/design/ui",
      tokens: "app/design/tokens",
      ui: "app/design/ui",
    });

    assert.deepEqual(await readConfig(projectDirectory), {
      paths: {
        globalCss: "app/cachette.css",
        tokens: "app/design/tokens",
        ui: "app/design/ui",
      },
      aliases: {
        tokens: "~/design/tokens",
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
    await init(projectDirectory, { defaults: true });
    await add(projectDirectory, "message-scroller", { "no-install": true });

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
    await init(projectDirectory, { defaults: true });
    await add(projectDirectory, "banner", { "no-install": true });
    await add(projectDirectory, "link", { "no-install": true });

    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/banner/Banner.tsx"), "utf8"),
      /export function Banner/,
    );
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/link/Link.tsx"), "utf8"),
      /export const Link/,
    );
    await assert.rejects(
      () => add(projectDirectory, "alert", { "no-install": true }),
      /알 수 없는 컴포넌트입니다: alert/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});
