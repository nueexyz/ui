import { resolve } from "node:path";

import { add } from "./add.js";
import { parseArguments, type CliOptions } from "./arguments.js";
import { doctor } from "./doctor.js";
import { docs, list } from "./docs.js";
import { init } from "./init.js";
import { newComponent } from "./new-component.js";

export async function run(arguments_ = process.argv.slice(2)) {
  const { command, options, positionals } = parseArguments(arguments_);
  const projectDirectory = resolve(String(options.cwd ?? process.cwd()));

  try {
    if (command === "init") {
      await init(projectDirectory, options as CliOptions);
    } else if (command === "add") {
      await add(projectDirectory, positionals[0], options);
    } else if (command === "doctor") {
      await doctor(projectDirectory);
    } else if (command === "docs") {
      docs(positionals[0]);
    } else if (command === "list") {
      list();
    } else if (command === "new") {
      await newComponent(projectDirectory, positionals[0]);
    } else {
      console.log(`Nooeh CLI

Usage:
  nooeh init [--ui <path>] [--tokens <path>]
  nooeh init --framework vite
  nooeh add <component> [--skip-dependencies] [--dry-run]
  nooeh doctor
  nooeh list
  nooeh docs [component]
  nooeh new <kebab-case-name>`);
    }

    return true;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}
