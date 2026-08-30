import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { access, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const execFile = promisify(execFileCallback);
const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));

test("@nooeh/ui CLI initializes a project and adds a card", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-ui-cli-"));

  try {
    await writeFile(
      join(projectDirectory, "tsconfig.json"),
      JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
    );
    await execFile(process.execPath, [cliPath, "init", "--defaults", "--cwd", projectDirectory]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "card",
      "--cwd",
      projectDirectory,
      "--skip-dependencies",
    ]);

    const config = JSON.parse(await readFile(join(projectDirectory, "nooeh.json"), "utf8"));
    assert.equal(config.aliases.ui, "@/components/ui");
    assert.equal(config.version, 1);
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/card.tsx"), "utf8"),
      /Card/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("published package keeps compiled UI, CSS, and Base UI primitive escape hatch", async () => {
  await access(fileURLToPath(new URL("../dist/global.css", import.meta.url)));

  const buttonSource = await readFile(
    fileURLToPath(new URL("../dist/button.js", import.meta.url)),
    "utf8",
  );
  assert.match(buttonSource, /react\/compiler-runtime/);

  const primitives = await import("../dist/primitives.js");
  assert.ok(primitives.Popover);
});
