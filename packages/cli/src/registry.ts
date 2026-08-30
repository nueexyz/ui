import { dependencyVersions, getRegistryItem, type RegistryItem } from "@nooeh/registry";

type RegistryFile = RegistryItem["files"][number];

export async function resolveComponent(name: string) {
  if (URL.canParse(name)) return resolveRemoteComponent(name);

  const components = new Set<string>();
  const externalDependencies = new Set<string>();
  const files = new Map<string, RegistryFile>();

  async function visit(componentName: string) {
    if (components.has(componentName)) return;
    const item = await getRegistryItem(componentName);

    components.add(componentName);
    for (const file of item.files) files.set(file.path, file);
    for (const dependency of item.dependencies) externalDependencies.add(dependency);
    for (const dependency of item.registryDependencies) {
      await visit(dependency);
    }
  }

  await visit(name);

  return {
    components: [...components],
    files: [...files.values()],
    externalDependencies: [...externalDependencies].map(
      (dependency) =>
        `${dependency}@${(dependencyVersions as Record<string, string>)[dependency] ?? "latest"}`,
    ),
    primaryExport: (await getRegistryItem(name)).primaryExport,
  };
}

async function resolveRemoteComponent(url: string) {
  const components = new Set<string>();
  const externalDependencies = new Set<string>();
  const files = new Map<string, RegistryFile>();

  async function visitLocal(name: string) {
    if (components.has(name)) return;
    const item = await getRegistryItem(name);
    components.add(name);
    for (const file of item.files) files.set(file.path, file);
    for (const dependency of item.dependencies) externalDependencies.add(dependency);
    for (const dependency of item.registryDependencies) await visitLocal(dependency);
  }

  async function visitRemote(itemUrl: string) {
    const response = await fetch(itemUrl);
    if (!response.ok) throw new Error(`Could not load the registry: ${response.status}`);

    const item = (await response.json()) as Partial<RegistryItem>;
    if (
      !Array.isArray(item.files) ||
      !Array.isArray(item.dependencies) ||
      !item.files.every(
        (file) =>
          typeof file === "object" &&
          file !== null &&
          typeof file.path === "string" &&
          typeof file.content === "string",
      )
    ) {
      throw new Error("This is not a valid Nooeh registry item.");
    }

    const itemName = item.name ?? itemUrl;
    if (components.has(itemName)) return;
    components.add(itemName);
    for (const file of item.files) files.set(file.path, file);
    for (const dependency of item.dependencies) externalDependencies.add(dependency);
    for (const dependency of item.registryDependencies ?? []) {
      if (URL.canParse(dependency)) await visitRemote(dependency);
      else await visitLocal(dependency);
    }

    return item.primaryExport ?? item.name ?? "Component";
  }

  const primaryExport = (await visitRemote(url)) ?? "Component";

  return {
    components: [...components],
    externalDependencies: [...externalDependencies].map(
      (dependency) =>
        `${dependency}@${(dependencyVersions as Record<string, string>)[dependency] ?? "latest"}`,
    ),
    files: [...files.values()],
    primaryExport,
  };
}
