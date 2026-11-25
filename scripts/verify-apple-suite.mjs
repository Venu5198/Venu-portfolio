import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function run() {
  const outputDir = path.resolve(process.cwd(), "portfolio-screenshots");
  const videoDir = path.resolve(outputDir, "videos");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

  console.log("Launching Chromium for Apple Suite Verification...");
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Context with Video Recording
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.toString());
  });

  const targetUrl = process.env.TEST_URL || "http://localhost:3012";
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 01-hero
  console.log("Capturing apple-01-hero.png...");
  await page.screenshot({ path: path.join(outputDir, "apple-01-hero.png") });

  // 02-bento
  console.log("Capturing apple-02-bento.png...");
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDir, "apple-02-bento.png") });

  // 03-syncrivo
  console.log("Capturing apple-03-syncrivo.png...");
  const projectsSec = await page.$("#projects");
  if (projectsSec) {
    await projectsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outputDir, "apple-03-syncrivo.png") });
  }

  // 04-ocnora
  console.log("Capturing apple-04-ocnora.png...");
  const ocnoraHeading = page.locator("text=OCNORA").first();
  if (await ocnoraHeading.isVisible()) {
    await ocnoraHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outputDir, "apple-04-ocnora.png") });
  }

  // 05-modal
  console.log("Opening SyncRivo modal & capturing apple-05-modal.png...");
  const syncrivoInspectBtn = page.locator("button:has-text('Inspect Blueprint')").first();
  if (await syncrivoInspectBtn.isVisible()) {
    await syncrivoInspectBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, "apple-05-modal.png") });

    // Switch modal tab to Architecture Decisions
    const archDecisionsTab = page.locator("text=Architecture Decisions").first();
    if (await archDecisionsTab.isVisible()) {
      await archDecisionsTab.click();
      await page.waitForTimeout(500);
    }
    // Close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
  } else {
    console.warn("Could not find Inspect Blueprint button!");
  }

  // 06-3d-architecture
  console.log("Capturing apple-06-3d-architecture.png...");
  const archSec = await page.$("#architecture");
  if (archSec) {
    await archSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // allow Three.js rendering
    await page.screenshot({ path: path.join(outputDir, "apple-06-3d-architecture.png") });
  }

  // 07-arsenal
  console.log("Capturing apple-07-arsenal.png...");
  const arsenalSec = await page.$("#arsenal");
  if (arsenalSec) {
    await arsenalSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outputDir, "apple-07-arsenal.png") });
  }

  // 08-credentials
  console.log("Capturing apple-08-credentials.png...");
  const credSec = await page.$("#credentials");
  if (credSec) {
    await credSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outputDir, "apple-08-credentials.png") });
  }

  // 09-contact
  console.log("Capturing apple-09-contact.png...");
  const contactSec = await page.$("#contact");
  if (contactSec) {
    await contactSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outputDir, "apple-09-contact.png") });
  }

  // Complete video scroll pass
  console.log("Recording video scroll pass...");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
  await page.waitForTimeout(2500);

  // Close context to save video
  await context.close();

  // Find the video and rename/move to portfolio-screenshots/apple-walkthrough.webm
  const videoFiles = fs.readdirSync(videoDir);
  if (videoFiles.length > 0) {
    const latestVideo = videoFiles[videoFiles.length - 1];
    const sourceVideoPath = path.join(videoDir, latestVideo);
    const targetVideoPath = path.join(outputDir, "apple-walkthrough.webm");
    fs.copyFileSync(sourceVideoPath, targetVideoPath);
    console.log(`Video saved to ${targetVideoPath}`);
  }

  // 2. Mobile Context (390x844)
  console.log("Capturing apple-10-mobile.png...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(outputDir, "apple-10-mobile.png") });
  await mobileContext.close();

  await browser.close();

  console.log("--- Visual Verification Summary ---");
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors found:", consoleErrors);
  } else {
    console.log("0 runtime errors detected!");
  }
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
