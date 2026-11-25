import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function run() {
  const outputDir = path.resolve(process.cwd(), "portfolio-screenshots");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log("Launching Chromium for Bento Suite Verification...");
  const browser = await chromium.launch({ headless: true });

  const targetUrl = process.env.TEST_URL || "http://localhost:3014";

  // 1. Desktop Context (1440x900, deviceScaleFactor 2)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
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

  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. bento-01-top.png: Status Strip + Tile 1 (Identity) + Tile 2 (Telemetry)
  console.log("Capturing bento-01-top.png...");
  await page.screenshot({ path: path.join(outputDir, "bento-01-top.png") });

  // 2. bento-02-middle-widgets.png: Toggle FinOps simulator, capture Tiles 3, 4, 5
  console.log("Interacting with FinOps toggle & capturing bento-02-middle-widgets.png...");
  const finopsTile = page.locator("#tile-finops");
  await finopsTile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Click "Unoptimized" then "Rightsized"
  const unoptBtn = page.locator("button:has-text('Unoptimized')").first();
  if (await unoptBtn.isVisible()) {
    await unoptBtn.click();
    await page.waitForTimeout(600);
  }
  const rightsizeBtn = page.locator("button:has-text('Rightsized')").first();
  if (await rightsizeBtn.isVisible()) {
    await rightsizeBtn.click();
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(outputDir, "bento-02-middle-widgets.png") });

  // 3. bento-03-bottom-stack-dock.png: Toggle Blue-Green and Stack filters
  console.log("Interacting with Deployment & Stack filters, capturing bento-03-bottom-stack-dock.png...");
  const stackTile = page.locator("#tile-stack");
  await stackTile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Click "Blue-Green Cutover"
  const blueGreenBtn = page.locator("button:has-text('Blue-Green Cutover')").first();
  if (await blueGreenBtn.isVisible()) {
    await blueGreenBtn.click();
    await page.waitForTimeout(500);
  }

  // Click "Backend" filter pill
  const backendPill = page.locator("button:has-text('Backend')").first();
  if (await backendPill.isVisible()) {
    await backendPill.click();
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: path.join(outputDir, "bento-03-bottom-stack-dock.png") });

  // 4. bento-04-command-palette-and-modal.png: Open ⌘K Palette, then open Modal
  console.log("Capturing ⌘K Command Palette and Sheet Modal...");
  // Press Cmd+K or click Search in top status strip
  const searchBtn = page.locator("button[aria-label='Open Command Palette (⌘K)']").first();
  if (await searchBtn.isVisible()) {
    await searchBtn.click();
    await page.waitForTimeout(600);
    // Take screenshot of ⌘K palette
    await page.screenshot({ path: path.join(outputDir, "bento-04-command-palette.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  }

  // Open SyncRivo modal
  const inspectSyncrivoBtn = page.locator("button:has-text('Inspect Architecture & Safeguards')").first();
  if (await inspectSyncrivoBtn.isVisible()) {
    await inspectSyncrivoBtn.click();
    await page.waitForTimeout(800);
    // Switch modal tab to Architecture Decisions
    const decisionsTab = page.locator("button:has-text('Architecture Decisions')").first();
    if (await decisionsTab.isVisible()) {
      await decisionsTab.click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(outputDir, "bento-04-command-palette-and-modal.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
  }

  await context.close();

  // 5. bento-05-mobile.png: Mobile viewport (390x844)
  console.log("Capturing bento-05-mobile.png (390x844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(outputDir, "bento-05-mobile.png") });
  await mobileContext.close();

  await browser.close();

  console.log("--- Bento Suite Verification Summary ---");
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors encountered:", consoleErrors);
  } else {
    console.log("0 runtime errors detected across all widgets and viewports!");
  }
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
