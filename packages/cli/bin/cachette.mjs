#!/usr/bin/env node

import { resolve } from "node:path";

import { add } from "../src/add.mjs";
import { parseArguments } from "../src/arguments.mjs";
import { init } from "../src/init.mjs";

const { command, options, positionals } = parseArguments(process.argv.slice(2));
const projectDirectory = resolve(String(options.cwd ?? process.cwd()));

try {
  if (command === "init") {
    await init(projectDirectory, options);
  } else if (command === "add") {
    await add(projectDirectory, positionals[0], options);
  } else {
    console.log(`Cachette CLI

사용법:
  cachette init [--ui <path>] [--tokens <path>] [--global-css <path>]
                [--ui-alias <alias>] [--tokens-alias <alias>]
  cachette add <component> [--overwrite] [--no-install]

공통 옵션:
  --cwd <path>  작업할 프로젝트 경로

설정 옵션:
  --defaults              기본 경로와 별칭 사용
  --force                 기존 설정 다시 만들기
  --ui <path>             UI 컴포넌트 저장 경로
  --tokens <path>         디자인 토큰 저장 경로
  --global-css <path>     전역 CSS 저장 경로
  --ui-alias <alias>      UI import 별칭
  --tokens-alias <alias>  토큰 import 별칭`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
