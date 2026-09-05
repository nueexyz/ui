import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { chromium, type Browser, type Page } from "playwright";

const consumerDirectory = fileURLToPath(new URL("./", import.meta.url));

const reservation = createServer();
reservation.listen(0, "127.0.0.1");
await once(reservation, "listening");
const address = reservation.address();
assert.ok(address && typeof address !== "string");
await new Promise<void>((resolve, reject) =>
  reservation.close((error) => {
    if (error) reject(error);
    else resolve();
  }),
);
const origin = `http://127.0.0.1:${address.port}`;
const server = spawn(
  process.execPath,
  [
    fileURLToPath(new URL("./node_modules/next/dist/bin/next", import.meta.url)),
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(address.port),
  ],
  { cwd: consumerDirectory, stdio: ["ignore", "pipe", "pipe"] },
);
let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk;
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk;
});
const stopped = once(server, "exit");
let browser: Browser | undefined;

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(serverOutput);
    try {
      ready = (await fetch(origin)).ok;
    } catch {
      /* The local server is still starting. */
    }
    if (ready) break;
    await setTimeout(100);
  }
  assert.ok(ready, serverOutput);
  const manifest = JSON.parse(
    await readFile(new URL("./.next/prerender-manifest.json", import.meta.url), "utf8"),
  );
  assert.equal(manifest.routes["/static"].initialRevalidateSeconds, false);
  assert.equal(manifest.routes["/revalidate"].initialRevalidateSeconds, 1);

  browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  });
  const initialColor = await verifyInitialHtml(browser, origin);

  const context = await browser.newContext();
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await verifyHydration(page, origin, initialColor);

  await verifyServerComponentsAndStreaming(page, origin);

  await verifyRegeneration(origin);
  assert.deepEqual(errors, [], "No browser or hydration errors are allowed.");
  console.log("PASS RSC payload, progressive Suspense stream, streamed CSS, ISR regeneration");
} finally {
  try {
    await browser?.close();
  } finally {
    server.kill("SIGTERM");
    await stopped;
  }
}

async function verifyInitialHtml(browser: Browser, origin: string) {
  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const initialPage = await noScript.newPage();
  await initialPage.goto(origin);
  assert.equal(await initialPage.getByTestId("server-card").textContent(), "Server card");
  const initialColor = await initialPage
    .getByRole("button", { name: "Count 0", exact: true })
    .evaluate((button) => getComputedStyle(button).backgroundColor);
  assert.notEqual(
    initialColor,
    "rgba(0, 0, 0, 0)",
    "Server HTML must have compiled CSS before hydration.",
  );
  await noScript.close();
  return initialColor;
}

async function verifyHydration(page: Page, origin: string, initialColor: string) {
  for (const route of ["/", "/static", "/revalidate"]) {
    const response = await page.goto(origin + route);
    assert.equal(response?.status(), 200);
    await page.locator('[data-hydrated="true"]').waitFor();
    await page.getByRole("button", { name: "Count 0", exact: true }).click();
    await page.getByRole("button", { name: "Count 1", exact: true }).waitFor();
    const hydratedColor = await page
      .getByRole("button", { name: "Count 1", exact: true })
      .evaluate((button) => getComputedStyle(button).backgroundColor);
    assert.equal(hydratedColor, initialColor);
    await page.getByRole("textbox", { name: "Name" }).fill("Hydrated");
    assert.equal(await page.getByRole("textbox", { name: "Name" }).inputValue(), "Hydrated");
    await page.getByRole("switch", { name: "Notifications" }).click();
    assert.equal(
      await page.getByRole("switch", { name: "Notifications" }).getAttribute("aria-checked"),
      "false",
    );
    await page.getByRole("tab", { name: "Second", exact: true }).click();
    await page.getByRole("tabpanel", { name: "Second", exact: true }).waitFor();
    await page.getByRole("button", { name: "Open dialog" }).click();
    await page.getByRole("dialog", { name: "Details" }).waitFor();
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "hidden" });
    console.log(`PASS ${route}: initial HTML, CSS, hydration, controls, portal`);
  }
}

async function verifyServerComponentsAndStreaming(page: Page, origin: string) {
  const flight = await fetch(origin, { headers: { RSC: "1" } });
  assert.match(flight.headers.get("content-type") ?? "", /text\/x-component/);
  assert.match(await flight.text(), /Server card/);

  const stream = await fetch(origin + "/stream");
  assert.ok(stream.body);
  const decoder = new TextDecoder();
  let content = "";
  let sawFallbackBeforeCompletion = false;
  for await (const chunk of stream.body) {
    content += decoder.decode(chunk, { stream: true });
    if (content.includes("Stream pending") && !content.includes("Stream complete"))
      sawFallbackBeforeCompletion = true;
  }
  assert.ok(sawFallbackBeforeCompletion, "Suspense fallback must arrive before delayed content.");
  assert.match(content, /Stream complete/);
  await page.goto(origin + "/stream");
  await page.getByRole("button", { name: "Stream button" }).waitFor();
  assert.notEqual(
    await page
      .getByRole("button", { name: "Stream button" })
      .evaluate((button) => getComputedStyle(button).backgroundColor),
    "rgba(0, 0, 0, 0)",
  );
}

async function verifyRegeneration(origin: string) {
  async function getGeneratedAt() {
    const response = await fetch(origin + "/revalidate");
    const html = await response.text();
    const value = html.match(/data-testid="generated-at">(\d+)/)?.[1];
    assert.ok(value);
    return value;
  }
  const previous = await getGeneratedAt();
  let regenerated = false;
  for (let attempt = 0; attempt < 10; attempt++) {
    await setTimeout(1100);
    if ((await getGeneratedAt()) !== previous) {
      regenerated = true;
      break;
    }
  }
  assert.ok(regenerated, "ISR must regenerate the page after its interval.");
}
