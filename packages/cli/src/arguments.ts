import { parseArgs } from "node:util";

export type CliOptions = {
  cwd?: string;
  defaults?: boolean;
  framework?: string;
  "dry-run"?: boolean;
  force?: boolean;
  "skip-dependencies"?: boolean;
  styles?: string;
  tokens?: string;
  ui?: string;
};

export function parseArguments(arguments_: readonly string[]) {
  const [command, ...args] = arguments_;
  const { values: options, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      cwd: { type: "string" },
      defaults: { type: "boolean" },
      framework: { type: "string" },
      "dry-run": { type: "boolean" },
      force: { type: "boolean" },
      "skip-dependencies": { type: "boolean" },
      styles: { type: "string" },
      tokens: { type: "string" },
      ui: { type: "string" },
    },
  });
  return { command, options, positionals };
}
