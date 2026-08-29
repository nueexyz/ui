import { access, cp, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

import { build } from "esbuild";
import reactCompiler from "babel-plugin-react-compiler";
import stylex from "@stylexjs/unplugin";

const sourceDirectory = "src";
const outputDirectory = "dist";

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
  plugins: [
    stylex.esbuild({
      babelConfig: { plugins: [reactCompiler] },
      useCSSLayers: true,
    }),
  ],
  metafile: true,
  sourcemap: true,
  target: "es2022",
});

await cp(join(sourceDirectory, "global.css"), join(outputDirectory, "global.css"));
