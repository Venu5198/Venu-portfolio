import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3009;
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
    } catch (e) {
      // wait and retry
    }
    await wait(400);
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
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
    console.log(`Server is healthy and ready at ${URL}`);

    const browser = await chromium.launch({ headless: true });

    // ==========================================
    // DESKTOP (1440x900) AUDIT
    // ==========================================
    console.log("Auditing Desktop (1440x900)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
    });

    const page = await desktopContext.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.goto(URL, { waitUntil: "networkidle" });
    await wait(2000); // Allow WebGL shaders to settle

    // Capture 1: Hero
    console.log("Capturing apple-01-hero.png...");
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "apple-01-hero.png"),
      fullPage: false,
    });

    // Capture 2: Projects
    console.log("Capturing apple-02-projects.png...");
    const projectsSection = page.locator("#projects");
    await projectsSection.scrollIntoViewIfNeeded();
    await wait(1000);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "apple-02-projects.png"),
      fullPage: false,
    });

    // Capture 3: 3D Architecture
    console.log("Capturing apple-03-3d-architecture.png...");
    const archSection = page.locator("#architecture");
    await archSection.scrollIntoViewIfNeeded();
    await wait(1500);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "apple-03-3d-architecture.png"),
      fullPage: false,
    });

    // Verify Modal Interaction
    console.log("Testing project modal interaction...");
    const inspectBtn = page.locator('button:has-text("Inspect Blueprint & Specs")').first();
    if (await inspectBtn.isVisible()) {
      await inspectBtn.click();
      await wait(600);
      const modal = page.locator('[role="dialog"]');
      const isModalVisible = await modal.isVisible();
      console.log(`Modal visible: ${isModalVisible}`);
      
      await page.keyboard.press("Escape");
      await wait(600);
      console.log("Modal closed with Escape key.");
    }

    // Verify Copy Email Button
    console.log("Testing email copy button...");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await wait(600);
    const copyEmailBtn = page.locator('button[aria-label="Copy email address"]');
    if (await copyEmailBtn.isVisible()) {
      await copyEmailBtn.click();
      await wait(300);
      console.log("Email copy clicked successfully.");
    }

    await desktopContext.close();

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
      if (msg.type() === "error") {
        consoleErrors.push(`[Mobile] ${msg.text()}`);
      }
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
    console.log(`Audit Complete!`);
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
