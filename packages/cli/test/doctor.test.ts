import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { doctor } from "../dist/doctor.js";
import { init } from "../dist/init.js";
import { writeTsconfig } from "./helpers.ts";

test("doctor verifies local StyleX sources, the compiler, and a CSS entry point", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nuee-cli-"));

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
      'import { unplugin } from "@stylexjs/unplugin";\nimport { defineConfig } from "vite";\nexport default defineConfig({ plugins: [unplugin.vite()] });\n',
    );
    await mkdir(join(projectDirectory, "src"), { recursive: true });
    await writeFile(join(projectDirectory, "src/main.tsx"), 'import "./index.css";\n');
    await init(projectDirectory, { defaults: true, vite: true, "skip-dependencies": true });

    assert.equal(await doctor(projectDirectory), true);
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});
