import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const execFile = promisify(execFileCallback);
const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));

test("@cachette/ui CLI initializes a project and adds a card", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "cachette-ui-cli-"));

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
    ]);

    const config = JSON.parse(await readFile(join(projectDirectory, "cachette.json"), "utf8"));
    assert.equal(config.aliases.ui, "@/components/ui");
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/card/Card.tsx"), "utf8"),
      /Card/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});
