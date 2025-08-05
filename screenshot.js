// screenshot.js (ES Module)

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// List of sites you want to capture
const sites = [
  // 'https://sustainablegeospatial.com',
  // 'https://denversocials.com/#hero',
  // 'https://www.a-denverroofing.com/residential-roofing-lp/',
  // 'https://rangergoldenstud.com',
  // 'https://www.pspcompass.com',
  'https://fantasycentral.co/#/home',
  // 'https://www.milehighmashup.com',
  // 'https://www.jbsimplyclean.com',
];

(async () => {
  // Ensure output directory exists
  const outDir = path.resolve(process.cwd(), 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Set a consistent viewport
  await page.setViewport({ width: 1440, height: 900 });

  for (const url of sites) {
    const filename = url
      .replace(/^https?:\/\//, '')
      .replace(/\W+/g, '_')
      .toLowerCase() + '.png';

    console.log(`→ Capturing ${url} as ${filename}`);
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.screenshot({
      path: path.join(outDir, filename),
      fullPage: true,
    });
  }

  await browser.close();
  console.log('All screenshots saved to /screenshots');
})();
