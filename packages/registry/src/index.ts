import { readFile } from "node:fs/promises";

export { registryItems } from "./items.js";

export type RegistryFile = {
  content: string;
  path: string;
};

export type RegistryItem = {
  dependencies: readonly string[];
  files: readonly RegistryFile[];
  name: string;
  primaryExport: string;
  registryDependencies: readonly string[];
};

export type TokenFile = {
  content: string;
  name: string;
};

function isRegistryItem(value: unknown): value is RegistryItem {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<RegistryItem>;
  return (
    typeof item.name === "string" &&
    typeof item.primaryExport === "string" &&
    Array.isArray(item.dependencies) &&
    Array.isArray(item.files) &&
    Array.isArray(item.registryDependencies) &&
    item.files.every(
      (file) =>
        typeof file === "object" &&
        file !== null &&
        typeof file.path === "string" &&
        typeof file.content === "string",
    )
  );
}

export async function getRegistryItem(name: string): Promise<RegistryItem> {
  const file = new URL(`./items/${name}.json`, import.meta.url);

  try {
    const item: unknown = JSON.parse(await readFile(file, "utf8"));
    if (!isRegistryItem(item)) throw new Error("Invalid registry item.");
    return item;
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      throw new Error(`Unknown component: ${name}`);
    }
    throw error;
  }
}

export async function getTokenFiles(): Promise<TokenFile[]> {
  const names = ["color-palette.stylex.ts", "tokens.stylex.ts", "themes.stylex.ts"];

  return Promise.all(
    names.map(async (name) => ({
      content: await readFile(new URL(`./tokens/${name}`, import.meta.url), "utf8"),
      name,
    })),
  );
}

export const dependencyVersions = {
  "@base-ui/react": "^1.7.0",
  "@phosphor-icons/react": "^2.1.10",
  "@stylexjs/stylex": "^0.19.0",
};
