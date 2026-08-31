import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { doctor } from "../dist/doctor.js";
import { init } from "../dist/init.js";
import { writeTsconfig } from "./helpers.ts";

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
    await init(projectDirectory, { defaults: true, framework: "vite", "skip-dependencies": true });

    assert.equal(await doctor(projectDirectory), true);
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});
