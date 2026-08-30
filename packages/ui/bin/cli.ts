#!/usr/bin/env node

import { run } from "@dumo/cli";

if (!(await run())) process.exitCode = 1;
