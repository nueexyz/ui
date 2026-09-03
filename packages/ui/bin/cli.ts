#!/usr/bin/env node

import { run } from "@nuee/cli";

if (!(await run())) process.exitCode = 1;
