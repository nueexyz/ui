#!/usr/bin/env node

import { run } from "@nooeh/cli";

if (!(await run())) process.exitCode = 1;
