import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";

const source = new URL("../src/foundations/", import.meta.url);
const output = new URL("../public/", import.meta.url);
const order = JSON.parse(await readFile(new URL("order.json", source), "utf8"));
const patterns = new URL("../src/patterns/", import.meta.url);
const patternOrder = JSON.parse(await readFile(new URL("order.json", patterns), "utf8"));
const components = new URL("../src/components/", import.meta.url);
const componentNames = (await readdir(components)).sort();
const links = [];
await rm(new URL("guidelines/", output), { recursive: true, force: true });
await mkdir(new URL("guidelines/", output), { recursive: true });
for (const locale of ["ko", "en"]) {
  const suffix = locale === "ko" ? "" : ".en";
  const entries = [];
  for (const { slug } of order) {
    const content = await readFile(new URL(`${slug}/guidelines${suffix}.md`, source), "utf8");
    const title = content.split("\n")[0].slice(2);
    entries.push(content);
    links.push(`- [${title} (${locale})](./guidelines/${slug}${suffix}.md)`);
    await writeFile(new URL(`guidelines/${slug}${suffix}.md`, output), content);
  }
  for (const { slug } of patternOrder) {
    const overview = await readFile(new URL(`${slug}/overview${suffix}.md`, patterns), "utf8");
    const detail = await readFile(new URL(`${slug}/guidelines${suffix}.md`, patterns), "utf8");
    const content = `${overview.trim()}\n\n${detail}`;
    const title = content.split("\n")[0].slice(2);
    entries.push(content);
    links.push(`- [${title} (${locale})](./guidelines/pattern-${slug}${suffix}.md)`);
    await writeFile(new URL(`guidelines/pattern-${slug}${suffix}.md`, output), content);
  }
  for (const slug of componentNames) {
    const overview = await readFile(new URL(`${slug}/overview${suffix}.md`, components), "utf8");
    const files = await readdir(new URL(`${slug}/`, components));
    const detailName = `guidelines${suffix}.md`;
    const detail = files.includes(detailName)
      ? await readFile(new URL(`${slug}/${detailName}`, components), "utf8")
      : "";
    const content = [overview.trim(), detail.trim()].filter(Boolean).join("\n\n") + "\n";
    const title = overview.split("\n")[0].slice(2);
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
