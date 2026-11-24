import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function record() {
  const videoDir = path.resolve(process.cwd(), "portfolio-videos");
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  console.log("Launching Chromium for video recording...");
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();
  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000); // Hero entrance and breathing glow

  // 1. Slow deliberate scroll down Hero
  console.log("Viewing Hero section...");
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await page.waitForTimeout(1500);

  // 2. Scroll to Flagship Projects
  console.log("Scrolling to Flagship Projects...");
  const projects = page.locator("#projects");
  await projects.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  // 3. Open and Inspect SyncRivo Modal
  console.log("Opening SyncRivo modal...");
  const syncrivoBtn = page.locator("text=Inspect Blueprint & Specs").first();
  if (await syncrivoBtn.isVisible()) {
    await syncrivoBtn.click();
    await page.waitForTimeout(2500); // View architecture tabs
    const closeBtn = page.locator('button[aria-label="Close modal"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await page.keyboard.press("Escape");
    }
    await page.waitForTimeout(1000);
  }

  // 4. Scroll down to OCNORA and Inspect Modal
  console.log("Scrolling to OCNORA showcase...");
  const ocnoraHeading = page.locator("text=OCNORA").first();
  await ocnoraHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  console.log("Opening OCNORA modal...");
  const ocnoraBtn = page.locator("text=Inspect Engine Specifications").first();
  if (await ocnoraBtn.isVisible()) {
    await ocnoraBtn.click();
    await page.waitForTimeout(2500);
    const closeBtn = page.locator('button[aria-label="Close modal"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await page.keyboard.press("Escape");
    }
    await page.waitForTimeout(1000);
  }

  // 5. Scroll to Systems Architecture (Observe Pulse & Auto-cycle)
  console.log("Scrolling to Systems Architecture flow...");
  const arch = page.locator("#architecture");
  await arch.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000); // Watch pulse and auto-cycling stages

  // Switch to OCNORA Engine
  console.log("Switching to OCNORA Engine mode...");
  const ocnoraToggle = page.locator("button:has-text('OCNORA Engine')");
  if (await ocnoraToggle.isVisible()) {
    await ocnoraToggle.click();
    await page.waitForTimeout(3000); // Watch amber pulse and inspect stage
  }

  // Switch back to SyncRivo Bridge
  console.log("Switching back to SyncRivo Bridge mode...");
  const syncrivoToggle = page.locator("button:has-text('SyncRivo Bridge')");
  if (await syncrivoToggle.isVisible()) {
    await syncrivoToggle.click();
    await page.waitForTimeout(2000);
  }

  // 6. Scroll through Tech Arsenal
  console.log("Scrolling through Engineering Arsenal...");
  const arsenal = page.locator("#arsenal");
  await arsenal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  // 7. Scroll through Credentials & Plaque
  console.log("Scrolling through Credentials & Honors...");
  const certs = page.locator("#certifications");
  await certs.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  // 8. Scroll to Terminal Contact Footer
  console.log("Scrolling to Contact section...");
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);

  // Finalize video
  console.log("Closing browser and finalizing video...");
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const finalPath = path.join(videoDir, "portfolio-walkthrough.webm");
    fs.copyFileSync(videoPath, finalPath);
    console.log(`Video recorded successfully at: ${finalPath}`);
  }
}

record().catch((err) => {
  console.error("Recording error:", err);
  process.exit(1);
});
