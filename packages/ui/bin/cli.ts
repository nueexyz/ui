#!/usr/bin/env node

import { fileURLToPath } from "node:url";

import { run } from "@dumo/cli";

const uiSourceDirectory = fileURLToPath(new URL("../src", import.meta.url));

if (!(await run(process.argv.slice(2), { uiSourceDirectory }))) process.exitCode = 1;
