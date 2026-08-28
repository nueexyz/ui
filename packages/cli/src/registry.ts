import { dependencyVersions, registryItems } from "@cachette/registry";

type RegistryFile = { content?: string; path: string };

type LocalRegistryItem = {
  dependencies: readonly string[];
  files: readonly string[];
  registryDependencies: readonly string[];
};

type RegistryItem = {
  dependencies: readonly string[];
  files: readonly RegistryFile[];
  name?: string;
  registryDependencies: readonly string[];
};

export async function resolveComponent(name: string) {
  if (URL.canParse(name)) return resolveRemoteComponent(name);

  const components = new Set<string>();
  const externalDependencies = new Set<string>();
  const files = new Map<string, RegistryFile>();

  function visit(componentName: string) {
    if (components.has(componentName)) return;
    const item = registryItems[componentName as keyof typeof registryItems] as
      | LocalRegistryItem
      | undefined;
    if (!item) throw new Error(`알 수 없는 컴포넌트입니다: ${componentName}`);

    components.add(componentName);
    for (const path of item.files) files.set(path, { path });
    for (const dependency of item.dependencies) externalDependencies.add(dependency);
    for (const dependency of item.registryDependencies) {
      visit(dependency);
    }
  }

  visit(name);

  return {
    components: [...components],
    files: [...files.values()],
    externalDependencies: [...externalDependencies].map(
      (dependency) =>
        `${dependency}@${(dependencyVersions as Record<string, string>)[dependency] ?? "latest"}`,
    ),
  };
}

async function resolveRemoteComponent(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`레지스트리를 불러오지 못했습니다: ${response.status}`);

  const item = (await response.json()) as RegistryItem;
  if (!Array.isArray(item.files) || !Array.isArray(item.dependencies)) {
    throw new Error("올바른 Cachette 레지스트리 항목이 아닙니다.");
  }

  return {
    components: [item.name ?? url],
    externalDependencies: item.dependencies.map(
      (dependency) =>
        `${dependency}@${(dependencyVersions as Record<string, string>)[dependency] ?? "latest"}`,
    ),
    files: item.files,
  };
}
