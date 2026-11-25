import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3010;
const URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.resolve(process.cwd(), "portfolio-screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 304) {
        return true;
      }
    } catch (e) {}
    await wait(400);
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
}

async function smoothScrollTo(page, targetY, step = 50, delay = 25) {
  const currentY = await page.evaluate(() => window.scrollY);
  const distance = targetY - currentY;
  const numSteps = Math.ceil(Math.abs(distance) / step);
  const stepAmount = distance / numSteps;

  for (let i = 0; i < numSteps; i++) {
    await page.evaluate((delta) => window.scrollBy(0, delta), stepAmount);
    await wait(delay);
  }
  await wait(300);
}

async function run() {
  console.log(`Starting next server on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    shell: true,
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  const cleanup = () => {
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"]);
      } else {
        server.kill();
      }
    } catch (e) {}
  };

  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  try {
    await waitForServer(URL);
    console.log(`Server healthy at ${URL}`);

    const browser = await chromium.launch({ headless: true });

    // ==========================================
    // DESKTOP (1440x900) WALKTHROUGH & VIDEO
    // ==========================================
    console.log("Recording Desktop Walkthrough Video...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
      recordVideo: {
        dir: SCREENSHOT_DIR,
        size: { width: 1440, height: 900 },
      },
    });

    const page = await desktopContext.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.goto(URL, { waitUntil: "networkidle" });
    await wait(2000); // Allow ShaderGradient to settle

    // Capture 1: Hero
    console.log("Capturing apple-01-hero.png...");
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "apple-01-hero.png"),
      fullPage: false,
    });

    // Smooth scroll through Hero to Bento Grid
    await smoothScrollTo(page, 500);
    await wait(800);

    // Smooth scroll to Projects Section
    console.log("Scrolling to Projects...");
    const projectsSection = page.locator("#projects");
    const projectsBox = await projectsSection.boundingBox();
    if (projectsBox) {
      await smoothScrollTo(page, projectsBox.y - 80);
    }
    await wait(800);

    // Capture 2: Projects
    console.log("Capturing apple-02-projects.png...");
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "apple-02-projects.png"),
      fullPage: false,
    });

    // Open Modal to demonstrate fluid spring entrance
    console.log("Opening ProjectModal...");
    const inspectBtn = page.locator('button:has-text("Inspect Blueprint & Specs")').first();
    if (await inspectBtn.isVisible()) {
      await inspectBtn.click();
      await wait(800);

      // Switch tabs in modal with spring animation
      const archTab = page.locator('button:has-text("Architecture")').first();
      if (await archTab.isVisible()) {
        await archTab.click();
        await wait(600);
      }

      const relTab = page.locator('button:has-text("Reliability & Guards")').first();
      if (await relTab.isVisible()) {
        await relTab.click();
        await wait(600);
      }

      // Close modal
      await page.keyboard.press("Escape");
      await wait(700);
      console.log("Modal closed smoothly.");
    }

    // Smooth scroll to Architecture Section
    console.log("Scrolling to 3D Architecture...");
    const archSection = page.locator("#architecture");
    const archBox = await archSection.boundingBox();
    if (archBox) {
      await smoothScrollTo(page, archBox.y - 80);
    }
    await wait(1500); // Allow 3D canvas to render

    // Capture 3: 3D Architecture
    console.log("Capturing apple-03-3d-architecture.png...");
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "apple-03-3d-architecture.png"),
      fullPage: false,
    });

    // Test Segmented pill animation
    const stagesTab = page.locator('button:has-text("Pipeline Stages")');
    if (await stagesTab.isVisible()) {
      await stagesTab.click();
      await wait(800);
      const top3dTab = page.locator('button:has-text("3D Topology")');
      await top3dTab.click();
      await wait(800);
    }

    // Smooth scroll to Arsenal
    const arsenalSection = page.locator("#arsenal");
    const arsenalBox = await arsenalSection.boundingBox();
    if (arsenalBox) {
      await smoothScrollTo(page, arsenalBox.y - 80);
    }
    await wait(800);

    // Switch Arsenal domain tab
    const cloudFilter = page.locator('button:has-text("Cloud")').first();
    if (await cloudFilter.isVisible()) {
      await cloudFilter.click();
      await wait(600);
      const allFilter = page.locator('button:has-text("All Domains")').first();
      await allFilter.click();
      await wait(600);
    }

    // Smooth scroll to Credentials & Contact
    const contactSection = page.locator("#contact");
    const contactBox = await contactSection.boundingBox();
    if (contactBox) {
      await smoothScrollTo(page, contactBox.y - 80);
    }
    await wait(1000);

    // Test Email copy button
    const copyEmailBtn = page.locator('button[aria-label="Copy email address"]');
    if (await copyEmailBtn.isVisible()) {
      await copyEmailBtn.click();
      await wait(600);
    }

    // Close page to save video
    const video = page.video();
    await desktopContext.close();
    if (video) {
      const videoPath = await video.path();
      const targetVideoPath = path.join(SCREENSHOT_DIR, "apple-walkthrough.webm");
      if (fs.existsSync(videoPath)) {
        fs.copyFileSync(videoPath, targetVideoPath);
        console.log(`Walkthrough video saved: ${targetVideoPath}`);
      }
    }

    // ==========================================
    // MOBILE (390x844) AUDIT
    // ==========================================
    console.log("Auditing Mobile (390x844)...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      colorScheme: "dark",
    });

    const mobilePage = await mobileContext.newPage();
    mobilePage.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(`[Mobile] ${msg.text()}`);
    });

    await mobilePage.goto(URL, { waitUntil: "networkidle" });
    await wait(1500);

    console.log("Capturing apple-04-mobile.png...");
    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, "apple-04-mobile.png"),
      fullPage: false,
    });

    await mobileContext.close();
    await browser.close();

    console.log("==========================================");
    console.log(`Walkthrough & Audit Complete!`);
    console.log(`Console errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log(consoleErrors);
    }
    console.log(`Page errors: ${pageErrors.length}`);
    if (pageErrors.length > 0) {
      console.log(pageErrors);
    }
    console.log("==========================================");
  } finally {
    cleanup();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
