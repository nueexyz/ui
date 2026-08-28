import { resolve } from "node:path";

import { add } from "./add.js";
import { parseArguments, type CliOptions } from "./arguments.js";
import { init } from "./init.js";

export async function run(
  arguments_ = process.argv.slice(2),
  context: { uiSourceDirectory?: string } = {},
) {
  const { command, options, positionals } = parseArguments(arguments_);
  const projectDirectory = resolve(String(options.cwd ?? process.cwd()));

  try {
    if (command === "init") {
      await init(projectDirectory, options as CliOptions);
    } else if (command === "add") {
      await add(projectDirectory, positionals[0], { ...options, ...context });
    } else {
      console.log(`Cachette CLI

사용법:
  cachette init
  cachette add <component>`);
    }

    return true;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}
