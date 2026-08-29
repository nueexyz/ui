import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { readConfig, resolveAliasPath } from "./config.js";

function toPascalCase(name: string) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase()}${part.slice(1)}`)
    .join("");
}

export async function newComponent(projectDirectory: string, name: string | undefined) {
  if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
    throw new Error("컴포넌트 이름은 kebab-case로 입력해 주세요. 예: status-chip");
  }

  const config = await readConfig(projectDirectory);
  const uiDirectory = await resolveAliasPath(projectDirectory, config.aliases.ui);
  const componentName = toPascalCase(name);
  const componentDirectory = join(uiDirectory, name);
  const componentPath = join(componentDirectory, `${componentName}.tsx`);
  const files = [
    componentPath,
    join(componentDirectory, `${name}.stylex.ts`),
    join(componentDirectory, "index.ts"),
  ];

  for (const file of files) {
    try {
      await access(file);
      throw new Error(`${file}이 이미 있습니다. 기존 컴포넌트를 덮어쓰지 않습니다.`);
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes("이미 있습니다")) continue;
      throw error;
    }
  }

  await mkdir(componentDirectory, { recursive: true });
  await Promise.all([
    writeFile(
      componentPath,
      `import * as stylex from "@stylexjs/stylex";\nimport type { ComponentProps } from "react";\n\nimport { styles } from "./${name}.stylex";\n\nexport type ${componentName}Props = ComponentProps<"div"> & {\n  xstyle?: stylex.StyleXStyles;\n};\n\nexport function ${componentName}({ className, style, xstyle, ...props }: ${componentName}Props) {\n  const stylexProps = stylex.props(styles.root, xstyle);\n\n  return (\n    <div\n      {...props}\n      className={[stylexProps.className, className].filter(Boolean).join(" ")}\n      style={{ ...stylexProps.style, ...style }}\n    />\n  );\n}\n`,
      { flag: "wx" },
    ),
    writeFile(
      join(componentDirectory, `${name}.stylex.ts`),
      `import { colorVars, radiusVars, spacingVars } from "@cachette/tokens/tokens.stylex";\nimport * as stylex from "@stylexjs/stylex";\n\nexport const styles = stylex.create({\n  root: {\n    backgroundColor: colorVars.bgSurface,\n    borderRadius: radiusVars.sm,\n    padding: spacingVars.space3,\n  },\n});\n`,
      { flag: "wx" },
    ),
    writeFile(
      join(componentDirectory, "index.ts"),
      `export { ${componentName} } from "./${componentName}";\nexport type { ${componentName}Props } from "./${componentName}";\n`,
      { flag: "wx" },
    ),
  ]);

  console.log(`${name} 컴포넌트 뼈대를 만들었습니다: ${componentDirectory}`);
}
