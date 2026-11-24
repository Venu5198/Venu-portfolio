import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function run() {
  const outputDir = path.resolve(process.cwd(), "portfolio-screenshots");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Launching Chromium...");
  const browser = await chromium.launch({
    headless: true,
  });

  // Desktop Context (1440x900, deviceScaleFactor 2 for crisp Retina resolution)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // Allow animations to settle

  // 01-full-page.png
  console.log("Capturing 01-full-page.png...");
  await page.screenshot({
    path: path.join(outputDir, "01-full-page.png"),
    fullPage: true,
  });

  // 02-hero.png
  console.log("Capturing 02-hero.png...");
  const heroElement = await page.$("#hero");
  if (heroElement) {
    await heroElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await heroElement.screenshot({
      path: path.join(outputDir, "02-hero.png"),
    });
  }

  // 03-projects-bento.png
  console.log("Capturing 03-projects-bento.png...");
  const projectsElement = await page.$("#projects");
  if (projectsElement) {
    await projectsElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await projectsElement.screenshot({
      path: path.join(outputDir, "03-projects-bento.png"),
    });
  }

  // 04-syncrivo-modal.png
  console.log("Capturing 04-syncrivo-modal.png...");
  const syncrivoCard = page.locator("text=SyncRivo").first();
  await syncrivoCard.click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outputDir, "04-syncrivo-modal.png"),
  });
  const closeBtn = page.locator('button[aria-label="Close modal"]');
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  } else {
    await page.keyboard.press("Escape");
  }
  await page.waitForTimeout(600);

  // 05-ocnora-modal.png
  console.log("Capturing 05-ocnora-modal.png...");
  const ocnoraCard = page.locator("text=OCNORA").first();
  await ocnoraCard.click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outputDir, "05-ocnora-modal.png"),
  });
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  } else {
    await page.keyboard.press("Escape");
  }
  await page.waitForTimeout(600);

  // 06-architecture.png
  console.log("Capturing 06-architecture.png...");
  const archElement = await page.$("#architecture");
  if (archElement) {
    await archElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await archElement.screenshot({
      path: path.join(outputDir, "06-architecture.png"),
    });
  }

  // 07-arsenal.png
  console.log("Capturing 07-arsenal.png...");
  const arsenalElement = await page.$("#arsenal");
  if (arsenalElement) {
    await arsenalElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await arsenalElement.screenshot({
      path: path.join(outputDir, "07-arsenal.png"),
    });
  }

  // 08-certifications-contact.png
  console.log("Capturing 08-certifications-contact.png...");
  const contactElement = await page.$("#contact");
  if (contactElement) {
    await contactElement.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await contactElement.screenshot({
      path: path.join(outputDir, "08-certifications-contact.png"),
    });
  }

  await context.close();

  // 09-mobile-view.png (Mobile Viewport 390x844)
  console.log("Capturing 09-mobile-view.png...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(outputDir, "09-mobile-view.png"),
    fullPage: true,
  });
  await mobileContext.close();

  await browser.close();
  console.log("All screenshots captured successfully in portfolio-screenshots/!");
}

run().catch((err) => {
  console.error("Error during screenshot capture:", err);
  process.exit(1);
});
