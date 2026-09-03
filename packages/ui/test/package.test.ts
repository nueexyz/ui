import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { access, copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";
import { build } from "vite";

const execFile = promisify(execFileCallback);
const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
const testDirectory = dirname(fileURLToPath(import.meta.url));

test("@nooeh/ui CLI builds copied components in a Vite app", async () => {
  const projectDirectory = await mkdtemp(join(testDirectory, ".vite-app-"));

  try {
    await Promise.all([
      writeFile(
        join(projectDirectory, "package.json"),
        JSON.stringify({ name: "nooeh-vite-app", private: true, type: "module" }),
      ),
      writeFile(
        join(projectDirectory, "tsconfig.json"),
        JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
      ),
      writeFile(
        join(projectDirectory, "vite.config.ts"),
        [
          'import { defineConfig } from "vite";',
          "",
          "function react() {",
          '  return { name: "react" };',
          "}",
          "",
          "export default defineConfig({ plugins: [react()] });",
          "",
        ].join("\n"),
      ),
      writeFile(
        join(projectDirectory, "index.html"),
        '<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n',
      ),
    ]);
    await mkdir(join(projectDirectory, "src"));
    const resetPackageDirectory = join(projectDirectory, "node_modules/@nooeh/ui");
    await mkdir(resetPackageDirectory, { recursive: true });
    await Promise.all([
      copyFile(join(testDirectory, "../dist/reset.css"), join(resetPackageDirectory, "reset.css")),
      writeFile(
        join(resetPackageDirectory, "package.json"),
        JSON.stringify({
          name: "@nooeh/ui",
          exports: { "./reset.css": "./reset.css" },
        }),
      ),
    ]);
    await Promise.all([
      writeFile(join(projectDirectory, "src/index.css"), "body { margin: 0; }\n"),
      writeFile(
        join(projectDirectory, "src/main.tsx"),
        [
          'import { createRoot } from "react-dom/client";',
          'import { Button } from "./components/ui/button";',
          'import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./components/ui/drawer";',
          'import { Toaster, toast } from "./components/ui/toast";',
          'import "./index.css";',
          "",
          "function App() {",
          "  return (",
          "    <>",
          '      <Button onClick={() => toast.add({ title: "Saved" })}>Save</Button>',
          "      <Drawer>",
          '        <DrawerTrigger render={<Button variant="secondary">Open drawer</Button>} />',
          "        <DrawerContent>",
          "          <DrawerTitle>Move to folder</DrawerTitle>",
          "        </DrawerContent>",
          "      </Drawer>",
          "      <Toaster />",
          "    </>",
          "  );",
          "}",
          "",
          'createRoot(document.getElementById("root")!).render(<App />);',
          "",
        ].join("\n"),
      ),
    ]);

    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--framework",
      "vite",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "button",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "drawer",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "toast",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);

    const viteConfig = await readFile(join(projectDirectory, "vite.config.ts"), "utf8");
    assert.ok(viteConfig.indexOf("plugins: [stylex.vite") < viteConfig.indexOf("react()]"));
    assert.match(
      await readFile(join(projectDirectory, "src/index.css"), "utf8"),
      /@import "@nooeh\/ui\/reset\.css"/,
    );

    await build({ configFile: join(projectDirectory, "vite.config.ts"), root: projectDirectory });
    await access(join(projectDirectory, "dist/index.html"));
  } finally {
    await rm(projectDirectory, { recursive: true, force: true });
  }
});

test("@nooeh/ui CLI initializes a project and adds a card", async () => {
  const projectDirectory = await mkdtemp(join(tmpdir(), "nooeh-ui-cli-"));

  try {
    await writeFile(
      join(projectDirectory, "tsconfig.json"),
      JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } }),
    );
    await execFile(process.execPath, [
      cliPath,
      "init",
      "--defaults",
      "--skip-dependencies",
      "--cwd",
      projectDirectory,
    ]);
    await execFile(process.execPath, [
      cliPath,
      "add",
      "card",
      "--cwd",
      projectDirectory,
      "--skip-dependencies",
    ]);

    const config = JSON.parse(await readFile(join(projectDirectory, "nooeh.json"), "utf8"));
    assert.equal(config.aliases.ui, "@/components/ui");
    assert.equal(config.aliases.styles, "@/styles");
    await access(join(projectDirectory, "src/styles/semantic.stylex.ts"));
    assert.match(
      await readFile(join(projectDirectory, "src/components/ui/card.tsx"), "utf8"),
      /Card/,
    );
  } finally {
    await rm(projectDirectory, { recursive: true });
  }
});

test("published package keeps Base UI primitive escape hatches for documentation", async () => {
  const buttonSource = await readFile(
    fileURLToPath(new URL("../dist/button.js", import.meta.url)),
    "utf8",
  );
  assert.match(buttonSource, /react\/compiler-runtime/);

  const primitives = await import("../dist/primitives.js");
  assert.ok(primitives.Popover);
});
