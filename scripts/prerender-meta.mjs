import {
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, normalize } from "node:path";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";
import { getPrerenderRoutes } from "./site-routes.mjs";

const DIST_DIRECTORY = normalize(join(process.cwd(), "dist"));
const BASE_HTML_PATH = join(DIST_DIRECTORY, "index.html");
const HOST = "127.0.0.1";
const PORT = 4173;
const PREVIEW_URL = `http://${HOST}:${PORT}`;

function canonicalRoute(route) {
  if (route === "/") return "/";
  return `${route.replace(/\/+$/, "")}/`;
}

function outputPathForRoute(route) {
  if (route === "/") return BASE_HTML_PATH;
  if (route === "/404") return join(DIST_DIRECTORY, "404.html");
  return join(
    DIST_DIRECTORY,
    canonicalRoute(route).replace(/^\//, ""),
    "index.html"
  );
}

async function waitForPreview(timeoutMs = 30000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(PREVIEW_URL);
      if (response.ok) return;
    } catch {
      // The preview server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Timed out while starting the Vite preview server.");
}

function signalPreviewProcess(previewProcess, signal) {
  if (!previewProcess || previewProcess.exitCode !== null) return;

  if (process.platform !== "win32" && previewProcess.pid) {
    try {
      process.kill(-previewProcess.pid, signal);
      return;
    } catch {
      // Fall back to signaling the direct child process.
    }
  }

  try {
    previewProcess.kill(signal);
  } catch {
    // The process has already exited.
  }
}

async function waitForProcessExit(previewProcess, timeoutMs) {
  if (!previewProcess || previewProcess.exitCode !== null) return true;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      previewProcess.removeListener("exit", handleExit);
      resolve(false);
    }, timeoutMs);

    function handleExit() {
      clearTimeout(timeout);
      resolve(true);
    }

    previewProcess.once("exit", handleExit);
  });
}

async function stopPreview(previewProcess) {
  if (!previewProcess || previewProcess.exitCode !== null) return;

  signalPreviewProcess(previewProcess, "SIGTERM");
  const exitedGracefully = await waitForProcessExit(previewProcess, 5000);

  if (!exitedGracefully && previewProcess.exitCode === null) {
    signalPreviewProcess(previewProcess, "SIGKILL");
    await waitForProcessExit(previewProcess, 2000);
  }
}

async function main() {
  if (!existsSync(BASE_HTML_PATH)) {
    throw new Error("dist/index.html does not exist. Run vite build first.");
  }

  const previewProcess = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["vite", "preview", "--host", HOST, "--port", String(PORT)],
    {
      cwd: process.cwd(),
      detached: process.platform !== "win32",
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  previewProcess.stdout.on("data", (chunk) => process.stdout.write(chunk));
  previewProcess.stderr.on("data", (chunk) => process.stderr.write(chunk));

  let browser;

  try {
    await waitForPreview();

    browser = await puppeteer.launch({
      headless: true,
      timeout: 60000,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      const url = request.url();
      const isThirdParty =
        !url.startsWith(PREVIEW_URL) &&
        !url.startsWith("data:") &&
        !url.startsWith("blob:");

      if (isThirdParty) {
        request.abort();
      } else {
        request.continue();
      }
    });

    for (const route of getPrerenderRoutes()) {
      const url = `${PREVIEW_URL}${canonicalRoute(route)}`;
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForSelector("#root > *", { timeout: 15000 });
      await page.evaluate(() => document.fonts?.ready);

      const html = await page.content();
      const outputPath = outputPathForRoute(route);
      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, html);
      console.log(`Prerendered complete HTML for ${canonicalRoute(route)}`);
    }
  } finally {
    try {
      if (browser) await browser.close();
    } finally {
      await stopPreview(previewProcess);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
