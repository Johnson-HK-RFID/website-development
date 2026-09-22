import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const manifest = JSON.parse(await readFile(new URL("../../docs/frontend/field-media-manifest.json", import.meta.url), "utf8"));
for (const asset of manifest) {
  const bytes = await readFile(new URL(`../../${asset.file}`, import.meta.url));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256);
  assert.equal(asset.license, "Pexels License");
}
const executablePath = process.env.TEST_BROWSER_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
try {
  for (const [route, width] of [["/", 1440], ["/zh-HK", 375]]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const requests = [];
    page.on("request", request => { if (request.url().includes(".mp4")) requests.push(request.url()); });
    await page.goto(base + route);
    await page.locator(".site-film").scrollIntoViewIfNeeded();
    assert.equal(requests.length, 0, "Film must not download before interaction");
    const video = page.locator(".site-film video");
    assert.equal(await video.getAttribute("src"), null);
    assert.equal(await video.getAttribute("autoplay"), null);
    await page.locator(".film-play").focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.querySelector("video").currentTime > .1);
    assert(requests.length > 0);
    assert(await video.evaluate(v => v.controls && !v.paused && v.duration >= 17.5 && v.duration < 19));
    assert.equal(await video.evaluate(v => document.activeElement === v), true);
    await video.evaluate(v => v.pause());
    assert(await video.evaluate(v => v.paused));
    await page.close();
  }
  const failed = await browser.newPage();
  await failed.route("**/media/construction-crew.mp4", route => route.abort());
  await failed.goto(base);
  await failed.locator(".film-play").click();
  await failed.getByRole("status").filter({ hasText: "could not load" }).waitFor();
  assert(await failed.getByRole("button", { name: /Retry film/ }).isVisible());
  await failed.unroute("**/media/construction-crew.mp4");
  await failed.getByRole("button", { name: /Retry film/ }).click();
  await failed.waitForFunction(() => document.querySelector("video").currentTime > .1);
  await failed.close();
  const staticPage = await browser.newPage({ javaScriptEnabled: false });
  await staticPage.goto(base);
  const noScriptMessage = staticPage.locator(".site-film noscript p");
  assert.equal(await noScriptMessage.textContent(), "Enable JavaScript to play the film. The scene is shown above.");
  assert(await noScriptMessage.isVisible());
  await staticPage.locator(".site-film img").evaluate(image => image.decode());
  await staticPage.close();
  console.log("PASS: 4 licensed asset hashes; no initial video download; keyboard playback in both locales; native controls; pause; failure/retry; no-JavaScript poster.");
} finally { await browser.close(); }
