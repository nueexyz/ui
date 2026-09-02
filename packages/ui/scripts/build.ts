import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { build } from "esbuild";
import reactCompiler from "babel-plugin-react-compiler";
import stylex from "@stylexjs/unplugin/esbuild";

const sourceDirectory = "src";
const outputDirectory = "dist";
type StylexCompilerOptions = NonNullable<Parameters<typeof stylex>[0]> & {
  babelConfig: { plugins: [typeof reactCompiler] };
};

const stylexCompilerOptions: StylexCompilerOptions = {
  babelConfig: { plugins: [reactCompiler] },
  useCSSLayers: true,
};

async function getEntryPoints() {
  const entries: Record<string, string> = {
    Icon: join(sourceDirectory, "Icon.tsx"),
    cli: join("bin", "cli.ts"),
    index: join(sourceDirectory, "index.ts"),
    primitives: join(sourceDirectory, "primitives.ts"),
  };
  const files = await readdir(sourceDirectory, { withFileTypes: true });

  for (const file of files) {
    if (!file.isFile() || !file.name.endsWith(".tsx") || file.name === "Icon.tsx") continue;
    entries[file.name.replace(/\.tsx$/, "")] = join(sourceDirectory, file.name);
  }

  return entries;
}

await rm(outputDirectory, { force: true, recursive: true });

await build({
  bundle: true,
  entryPoints: await getEntryPoints(),
  format: "esm",
  jsx: "automatic",
  outdir: outputDirectory,
  packages: "external",
  platform: "browser",
  plugins: [stylex(stylexCompilerOptions)],
  metafile: true,
  sourcemap: true,
  target: "es2022",
});

const globalCss = await readFile(join(sourceDirectory, "global.css"), "utf8");
const resetCss = await readFile(join(sourceDirectory, "reset.css"), "utf8");
await writeFile(join(outputDirectory, "global.css"), `@import "./stylex.css";\n\n${globalCss}`);
await writeFile(join(outputDirectory, "reset.css"), resetCss);
