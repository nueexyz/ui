import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function writeTsconfig(projectDirectory: string) {
  await writeFile(
    join(projectDirectory, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
  );
}
