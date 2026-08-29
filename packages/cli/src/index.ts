import { resolve } from "node:path";

import { add } from "./add.js";
import { parseArguments, type CliOptions } from "./arguments.js";
import { doctor } from "./doctor.js";
import { docs, list } from "./docs.js";
import { init } from "./init.js";
import { newComponent } from "./new-component.js";

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
    } else if (command === "doctor") {
      await doctor(projectDirectory);
    } else if (command === "docs") {
      docs(positionals[0]);
    } else if (command === "list") {
      list();
    } else if (command === "new") {
      await newComponent(projectDirectory, positionals[0]);
    } else {
      console.log(`Dumo CLI

사용법:
  dumo init
  dumo add <component> [--skip-dependencies] [--dry-run]
  dumo doctor
  dumo list
  dumo docs [component]
  dumo new <kebab-case-name>`);
    }

    return true;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}
