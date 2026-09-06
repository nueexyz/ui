import { mkdir, readFile, writeFile } from "node:fs/promises";

const source = new URL("../src/foundations/", import.meta.url);
const output = new URL("../public/", import.meta.url);
const order = JSON.parse(await readFile(new URL("order.json", source), "utf8"));
const links = [];
await mkdir(new URL("guidelines/", output), { recursive: true });
for (const locale of ["ko", "en"]) {
  const suffix = locale === "ko" ? "" : ".en";
  const entries = [];
  for (const { slug } of order) {
    if (slug === "tokens") continue;
    const content = await readFile(new URL(`${slug}/guidelines${suffix}.md`, source), "utf8");
    const title = content.split("\n")[0].slice(2);
    entries.push(content);
    links.push(`- [${title} (${locale})](./guidelines/${slug}${suffix}.md)`);
    await writeFile(new URL(`guidelines/${slug}${suffix}.md`, output), content);
  }
  await writeFile(new URL(`llms-full${suffix}.txt`, output), entries.join("\n\n---\n\n"));
}
await writeFile(
  new URL("llms.txt", output),
  [
    "# nuée",
    "",
    "> Read these rules before composing screens with nuée. Verify component APIs against the installed source.",
    "",
    "- [전체 규칙 (한국어)](./llms-full.txt)",
    "- [Complete guidelines (English)](./llms-full.en.txt)",
    ...links,
    "",
  ].join("\n"),
);
console.log("Exported nuée guidelines in Korean and English.");
