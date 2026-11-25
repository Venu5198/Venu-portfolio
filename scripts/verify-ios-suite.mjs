import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function run() {
  const outputDir = path.resolve(process.cwd(), "portfolio-screenshots");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log("Launching Chromium for iOS Mechanics & Dual Appearance Suite...");
  const browser = await chromium.launch({ headless: true });

  const targetUrl = process.env.TEST_URL || "http://localhost:3016";

  // 1. Desktop Context (1440x900)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.toString()));

  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // A. iOS Dark Mode Overview
  console.log("Capturing ios-01-dark-desktop.png...");
  await page.screenshot({ path: path.join(outputDir, "ios-01-dark-desktop.png") });

  // B. Interact with 0.25x Slow-Mo & Deployment Switcher
  console.log("Testing 0.25x Slow-Mo and Blue-Green cutover...");
  const slowMoBtn = page.locator("button:has-text('Slow-Mo')").first();
  if (await slowMoBtn.isVisible()) {
    await slowMoBtn.click();
    await page.waitForTimeout(400);
  }
  const blueGreenBtn = page.locator("button:has-text('Blue-Green Cutover')").first();
  if (await blueGreenBtn.isVisible()) {
    await blueGreenBtn.click();
    await page.waitForTimeout(600);
  }

  // C. Test Stack Filter Pill (Backend)
  const backendPill = page.locator("button:has-text('Backend')").first();
  if (await backendPill.isVisible()) {
    await backendPill.click();
    await page.waitForTimeout(500);
  }

  // D. Open SyncRivo Sheet Modal to verify Background Recession & Grabber Handle
  console.log("Opening SyncRivo sheet modal to verify recession & grabber handle...");
  const syncrivoBtn = page.locator("button:has-text('Inspect Architecture & Safeguards')").first();
  if (await syncrivoBtn.isVisible()) {
    await syncrivoBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, "ios-02-dark-modal-recession.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
  }

  // E. Toggle to iOS Light Appearance
  console.log("Switching appearance to iOS Light...");
  const themeToggle = page.locator("button[aria-label='Toggle iOS Appearance']").first();
  if (await themeToggle.isVisible()) {
    await themeToggle.click();
    await page.waitForTimeout(800);
  }

  // F. Capture iOS Light Desktop
  console.log("Capturing ios-03-light-desktop.png...");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDir, "ios-03-light-desktop.png") });

  // G. Test FinOps toggle & Stack filter in Light Mode
  console.log("Testing FinOps toggle & Stack filter in Light mode...");
  const finopsUnopt = page.locator("button:has-text('Unoptimized')").first();
  if (await finopsUnopt.isVisible()) {
    await finopsUnopt.click();
    await page.waitForTimeout(400);
  }
  const finopsRight = page.locator("button:has-text('Rightsized')").first();
  if (await finopsRight.isVisible()) {
    await finopsRight.click();
    await page.waitForTimeout(400);
  }

  // H. Open OCNORA Sheet Modal in Light Mode
  console.log("Opening OCNORA sheet modal in Light mode...");
  const ocnoraBtn = page.locator("button:has-text('Inspect DAG & Guardrails')").first();
  if (await ocnoraBtn.isVisible()) {
    await ocnoraBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, "ios-04-light-modal.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
  }

  await context.close();

  // 2. Mobile Viewport (390x844) in Dark and Light
  console.log("Testing Mobile (390x844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(800);

  // Capture Mobile Dark
  console.log("Capturing ios-05-dark-mobile.png...");
  await mobilePage.screenshot({ path: path.join(outputDir, "ios-05-dark-mobile.png") });

  // Switch to Light on Mobile
  const mobileThemeToggle = mobilePage.locator("button[aria-label='Toggle iOS Appearance']").first();
  if (await mobileThemeToggle.isVisible()) {
    await mobileThemeToggle.click();
    await mobilePage.waitForTimeout(800);
  }
  console.log("Capturing ios-06-light-mobile.png...");
  await mobilePage.screenshot({ path: path.join(outputDir, "ios-06-light-mobile.png") });

  await mobileContext.close();
  await browser.close();

  console.log("--- iOS Suite Verification Summary ---");
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors found:", consoleErrors);
  } else {
    console.log("0 runtime errors detected across iOS Dark & Light!");
  }
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
