import { registryItems } from "@dumo/registry";

function getComponentNames() {
  return Object.keys(registryItems).sort();
}

export function list() {
  console.log(getComponentNames().join("\n"));
}

export function docs(componentName: string | undefined) {
  if (!componentName) {
    list();
    return;
  }

  const item = registryItems[componentName as keyof typeof registryItems];
  if (!item) throw new Error(`알 수 없는 컴포넌트입니다: ${componentName}`);

  console.log(`${componentName}\n`);
  console.log(`설치: pnpm dlx @dumo/ui add ${componentName}`);
  console.log(`파일:\n${item.files.map((file) => `  ${file}`).join("\n")}`);
  console.log(`의존성:\n${item.dependencies.map((dependency) => `  ${dependency}`).join("\n")}`);
  if (item.registryDependencies.length) {
    console.log(`함께 설치:\n${item.registryDependencies.map((dependency) => `  ${dependency}`).join("\n")}`);
  }
}
