import { spawnSync } from "node:child_process";

if (process.env.VERCEL === "1") {
  console.log("Vercel detected: skipping Puppeteer Chrome download; static SEO fallback will be used if no browser is available.");
  process.exit(0);
}

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(
  command,
  ["puppeteer", "browsers", "install", "chrome"],
  { stdio: "inherit" }
);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
