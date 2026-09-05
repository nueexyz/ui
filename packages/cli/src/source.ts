import { parse } from "@babel/parser";
import { traverseFast } from "@babel/types";

const parserOptions = { sourceType: "module", plugins: ["typescript", "jsx"] } as const;

export function parseSource(source: string) {
  return parse(source, { ...parserOptions, tokens: true, plugins: [...parserOptions.plugins] });
}

export function inspectViteConfig(source: string) {
  const file = parseSource(source);
  const exported = file.program.body.find((node) => node.type === "ExportDefaultDeclaration");
  if (!exported || exported.type !== "ExportDefaultDeclaration") return undefined;
  let config = exported.declaration;
  if (config.type === "CallExpression" && config.arguments.length === 1) {
    const argument = config.arguments[0];
    if (argument.type !== "ObjectExpression") return undefined;
    // Only the imported Vite defineConfig helper has a known configuration contract.
    const callee = config.callee;
    const isDefineConfig = file.program.body.some(
      (node) =>
        node.type === "ImportDeclaration" &&
        node.source.value === "vite" &&
        node.specifiers.some(
          (specifier) =>
            specifier.type === "ImportSpecifier" &&
            specifier.imported.type === "Identifier" &&
            specifier.imported.name === "defineConfig" &&
            callee.type === "Identifier" &&
            specifier.local.name === callee.name,
        ),
    );
    if (!isDefineConfig) return undefined;
    config = argument;
  }
  if (config.type !== "ObjectExpression") return undefined;
  const properties = config.properties.filter(
    (node) =>
      node.type === "ObjectProperty" &&
      !node.computed &&
      ((node.key.type === "Identifier" && node.key.name === "plugins") ||
        (node.key.type === "StringLiteral" && node.key.value === "plugins")),
  );
  if (
    properties.length !== 1 ||
    config.properties.some((node) => node.type === "SpreadElement" || node.computed)
  )
    return undefined;
  const property = properties[0];
  if (property.type !== "ObjectProperty" || property.value.type !== "ArrayExpression")
    return undefined;
  const plugins = property.value;
  const imports = file.program.body.flatMap((node) => {
    if (
      node.type !== "ImportDeclaration" ||
      !["@stylexjs/unplugin", "@stylexjs/unplugin/vite"].includes(node.source.value)
    )
      return [];
    return node.specifiers
      .filter((specifier) => specifier.type === "ImportDefaultSpecifier")
      .map((specifier) => ({
        name: specifier.local.name,
        direct: node.source.value.endsWith("/vite"),
      }));
  });
  const hasCompiler = plugins.elements.some(
    (node) =>
      node?.type === "CallExpression" &&
      imports.some((binding) => {
        const callee = node.callee;
        if (binding.direct) return callee.type === "Identifier" && callee.name === binding.name;
        return (
          callee.type === "MemberExpression" &&
          !callee.computed &&
          callee.object.type === "Identifier" &&
          callee.object.name === binding.name &&
          callee.property.type === "Identifier" &&
          callee.property.name === "vite"
        );
      }),
  );
  return { plugins, imports, hasCompiler };
}

export function configureVite(source: string) {
  const inspected = inspectViteConfig(source);
  if (!inspected || inspected.plugins.elements.some((node) => node?.type === "SpreadElement")) {
    throw new Error(
      "Could not safely update the Vite plugins array. Add the StyleX compiler manually.",
    );
  }
  if (inspected.hasCompiler) return source;
  const binding = inspected.imports[0];
  // An unused name avoids colliding with a user variable or an existing import.
  let name = "nueeStylex";
  while (source.includes(name)) name += "_";
  const factory = binding ? `${binding.name}${binding.direct ? "" : ".vite"}` : `${name}.vite`;
  const plugin = `${factory}({ unstable_moduleResolution: { type: "commonJS" } })`;
  const offset = inspected.plugins.start! + 1;
  const configured =
    source.slice(0, offset) +
    plugin +
    (inspected.plugins.elements.length ? ", " : "") +
    source.slice(offset);
  const result = binding ? configured : `import ${name} from "@stylexjs/unplugin";\n${configured}`;
  parseSource(result);
  return result;
}

export function removeReducedMotionStyles(source: string) {
  const file = parseSource(source);
  const removals: { start: number; end: number }[] = [];
  traverseFast(file, (node) => {
    if (
      node.type !== "ObjectProperty" ||
      node.computed ||
      node.key.type !== "StringLiteral" ||
      node.key.value !== "@media (prefers-reduced-motion: reduce)"
    )
      return;
    const start = node.start!;
    let end = node.end!;
    const nextToken = file.tokens?.find(
      (token) => token.start >= end && typeof token.type !== "string",
    );
    if (nextToken && source.slice(nextToken.start, nextToken.end) === ",") end = nextToken.end;
    removals.push({ start, end });
  });
  let result = source;
  let boundary = source.length;
  for (const removal of removals
    .sort((a, b) => a.start - b.start)
    .filter((entry, index, list) => !list.slice(0, index).some((parent) => parent.end >= entry.end))
    .reverse()) {
    if (removal.end > boundary) continue;
    result = result.slice(0, removal.start) + result.slice(removal.end);
    boundary = removal.start;
  }
  parseSource(result);
  return result;
}
