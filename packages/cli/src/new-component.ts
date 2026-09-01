import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { readConfig, resolveConfigAlias } from "./config.js";

function toPascalCase(name: string) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase()}${part.slice(1)}`)
    .join("");
}

export async function newComponent(projectDirectory: string, name: string | undefined) {
  if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
    throw new Error("Enter a component name in kebab-case. For example: status-chip.");
  }

  const config = await readConfig(projectDirectory);
  const uiDirectory = await resolveConfigAlias(projectDirectory, config.aliases.ui, "aliases.ui");
  const componentName = toPascalCase(name);
  const componentPath = join(uiDirectory, `${name}.tsx`);
  const tokenImport = `${config.aliases.styles}/semantic.stylex`;
  const files = [componentPath];

  for (const file of files) {
    try {
      await access(file);
      throw new Error(`${file} already exists. Existing components will not be overwritten.`);
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes("already exists")) continue;
      throw error;
    }
  }

  await mkdir(uiDirectory, { recursive: true });
  await writeFile(
    componentPath,
    `import { colorVars, radiusVars, spacingVars } from "${tokenImport}";\nimport * as stylex from "@stylexjs/stylex";\nimport type { ComponentProps } from "react";\n\nconst styles = stylex.create({\n  root: {\n    backgroundColor: colorVars.bgSurface,\n    borderRadius: radiusVars.sm,\n    padding: spacingVars.space3,\n  },\n});\n\nexport type ${componentName}Props = ComponentProps<"div"> & {\n  xstyle?: stylex.StyleXStyles;\n};\n\nexport function ${componentName}({ className, style, xstyle, ...props }: ${componentName}Props) {\n  const stylexProps = stylex.props(styles.root, xstyle);\n\n  return (\n    <div\n      {...props}\n      className={[stylexProps.className, className].filter(Boolean).join(" ")}\n      style={{ ...stylexProps.style, ...style }}\n    />\n  );\n}\n`,
    { flag: "wx" },
  );

  console.log(`Created a ${name} component scaffold: ${componentPath}`);
}
