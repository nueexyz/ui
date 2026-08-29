import { access, readFile, readdir, rm, writeFile } from "node:fs/promises";
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
  const entries = [
    join(sourceDirectory, "index.ts"),
    join(sourceDirectory, "Icon.tsx"),
    join(sourceDirectory, "primitives.ts"),
  ];
  const files = await readdir(sourceDirectory, { withFileTypes: true });

  for (const file of files) {
    if (!file.isDirectory()) continue;
    const entry = join(sourceDirectory, file.name, "index.ts");

    try {
      await access(entry);
      entries.push(entry);
    } catch {
      continue;
    }
  }

  return entries;
}

await rm(outputDirectory, { force: true, recursive: true });

await build({
  bundle: true,
  entryPoints: await getEntryPoints(),
  format: "esm",
  jsx: "automatic",
  outbase: sourceDirectory,
  outdir: outputDirectory,
  packages: "external",
  platform: "browser",
  plugins: [stylex(stylexCompilerOptions)],
  metafile: true,
  sourcemap: true,
  target: "es2022",
});

const globalCss = await readFile(join(sourceDirectory, "global.css"), "utf8");
await writeFile(join(outputDirectory, "global.css"), `@import "./stylex.css";\n\n${globalCss}`);
