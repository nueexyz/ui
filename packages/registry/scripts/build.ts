import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { registryItems } from "../src/items.ts";

const outputDirectory = "dist/items";
const uiSourceDirectory = "../ui/src";

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

for (const [name, item] of Object.entries(registryItems)) {
  const files = await Promise.all(
    item.files.map(async (path) => ({
      content: await readFile(join(uiSourceDirectory, path), "utf8"),
      path,
    })),
  );
  const componentFile = files.find((file) => file.path === `${name}.tsx`);
  const primaryExport = componentFile?.content.match(
    /export\s+(?:async\s+)?(?:function|const|class)\s+([A-Za-z0-9]+)/,
  )?.[1];

  if (!primaryExport) {
    throw new Error(`Could not determine the primary export for ${name}.`);
  }

  await writeFile(
    join(outputDirectory, `${name}.json`),
    `${JSON.stringify({ name, primaryExport, ...item, files }, null, 2)}\n`,
  );
}
