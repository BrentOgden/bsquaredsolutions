// scripts/sitemap.mjs
import { writeFileSync } from "node:fs";
import {
  STATIC_INDEXABLE_ROUTES,
  getBlogEntries,
} from "./site-routes.mjs";

const SITE_URL = "https://bsquaredsolutions.io";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function canonicalRoute(route) {
  if (route === "/") return "/";
  return `${route.replace(/\/+$/, "")}/`;
}

function urlEntry(route, lastmod) {
  const location = `${SITE_URL}${canonicalRoute(route)}`;

  return [
    "  <url>",
    `    <loc>${escapeXml(location)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

const staticEntries = STATIC_INDEXABLE_ROUTES.map((route) => urlEntry(route));
const blogEntries = getBlogEntries().map(({ route, lastmod }) =>
  urlEntry(route, lastmod)
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join("\n")}
</urlset>
`;

writeFileSync("./public/sitemap.xml", xml);
console.log(
  `Wrote public/sitemap.xml with ${staticEntries.length + blogEntries.length} URLs.`
);
