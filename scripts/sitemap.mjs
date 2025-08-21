// scripts/sitemap.mjs
import { writeFileSync } from "node:fs";

const SITE = "https://bsquaredsolutions.io";

// TODO: keep this list current (no trailing slashes if your live URLs don't use them)
const routes = [
  "/", 
  "/services",
  "/portfolio",
  "/about",
  "/contact",
  // add blog/category/post URLs if you have them
];

const today = new Date().toISOString().split("T")[0];

const urls = routes.map(p => `
  <url>
    <loc>${SITE}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.7"}</priority>
  </url>`).join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

writeFileSync("./public/sitemap.xml", xml);
console.log("✅ Wrote public/sitemap.xml");
