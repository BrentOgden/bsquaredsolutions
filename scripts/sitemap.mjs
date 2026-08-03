// scripts/sitemap.mjs
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import {
  STATIC_INDEXABLE_ROUTES,
  getBlogEntries,
} from "./site-routes.mjs";

const SITE_URL = "https://bsquaredsolutions.io";

const ROUTE_SOURCE_FILES = {
  "/": [
    "src/components/Hero.jsx",
    "src/components/Services.jsx",
    "src/components/Pricing.jsx",
    "src/components/Quotes.jsx",
    "src/components/About.jsx",
    "src/components/ContactForm.jsx",
  ],
  "/portfolio": ["src/components/Portfolio.jsx"],
  "/packages": ["src/components/Packages.jsx"],
  "/products": ["src/pages/Products.jsx"],
  "/templates": ["src/components/Templates.jsx"],
  "/basictemplate": ["src/pages/BasicTemplate.jsx"],
  "/simpletemplate": ["src/pages/SimpleTemplate.jsx"],
  "/smallbusinesstemplate": ["src/pages/SmallBusinessTemplate.jsx"],
  "/faq": ["src/components/FAQ.jsx"],
  "/blog": ["src/pages/Blog.jsx"],
  "/contact": ["src/pages/Contact.jsx"],
  "/terms": ["src/pages/Terms.jsx"],
  "/privacy": ["src/pages/Privacy.jsx"],
};

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

function getStaticLastmod(route) {
  const sourceFiles = [
    "src/data/seoData.js",
    ...(ROUTE_SOURCE_FILES[route] || []),
  ];

  try {
    const date = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", ...sourceFiles],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();

    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
  } catch {
    return undefined;
  }
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

const staticEntries = STATIC_INDEXABLE_ROUTES.map((route) =>
  urlEntry(route, getStaticLastmod(route))
);
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
