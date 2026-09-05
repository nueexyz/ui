import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const consumerDirectory = fileURLToPath(new URL("./", import.meta.url));
const cliPath = fileURLToPath(new URL("../../packages/ui/dist/cli.js", import.meta.url));
const executionOptions = { cwd: consumerDirectory, stdio: "inherit" } as const;

// Recreate only the component sources generated for this test consumer.
rmSync(join(consumerDirectory, "src/components"), { recursive: true, force: true });
execFileSync(
  process.execPath,
  [cliPath, "init", "--defaults", "--force", "--skip-dependencies"],
  executionOptions,
);

const componentList = execFileSync(process.execPath, [cliPath, "list"], {
  cwd: consumerDirectory,
  encoding: "utf8",
});
const componentNames = componentList.trim().split("\n");

execFileSync(
  process.execPath,
  [cliPath, "add", ...componentNames, "--skip-dependencies"],
  executionOptions,
);
