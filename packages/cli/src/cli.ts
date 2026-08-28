#!/usr/bin/env node

import { run } from "./index.js";

if (!(await run())) process.exitCode = 1;
