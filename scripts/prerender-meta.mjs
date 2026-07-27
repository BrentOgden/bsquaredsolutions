import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, normalize } from "node:path";
import {
  DEFAULT_OG_IMAGE,
  ROUTE_SEO,
  SITE_NAME,
  SITE_URL,
} from "../src/data/seoData.js";
import { getBlogEntries } from "./site-routes.mjs";

const DIST_DIRECTORY = normalize(join(process.cwd(), "dist"));
const BASE_HTML_PATH = join(DIST_DIRECTORY, "index.html");

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toAbsoluteUrl(value) {
  if (!value) return DEFAULT_OG_IMAGE;

  try {
    return new URL(value, `${SITE_URL}/`).toString();
  } catch {
    return DEFAULT_OG_IMAGE;
  }
}

function canonicalUrl(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function stripSeoMarkup(html) {
  return html
    .replace(/\s*<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(
      /\s*<meta[^>]+(?:name|property)=["'](?:description|robots|googlebot|og:[^"']+|twitter:[^"']+|article:[^"']+)["'][^>]*>/gi,
      ""
    )
    .replace(/\s*<link[^>]+rel=["']canonical["'][^>]*>/gi, "")
    .replace(
      /\s*<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
      ""
    );
}

function metadataMarkup(metadata) {
  const path = metadata.path || "/";
  const pageUrl = canonicalUrl(path);
  const imageUrl = toAbsoluteUrl(metadata.image);
  const robots = `${metadata.noindex ? "noindex" : "index"}, ${
    metadata.nofollow ? "nofollow" : "follow"
  }`;
  const type = metadata.type || "website";
  const tags = [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(type)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    '<meta property="og:locale" content="en_US" />',
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}" />`,
    metadata.imageAlt
      ? `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`
      : null,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    metadata.imageAlt
      ? `<meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`
      : null,
    type === "article" && metadata.publishedTime
      ? `<meta property="article:published_time" content="${escapeHtml(
          metadata.publishedTime
        )}" />`
      : null,
    type === "article" && metadata.author
      ? `<meta property="article:author" content="${escapeHtml(metadata.author)}" />`
      : null,
  ];

  if (imageUrl === DEFAULT_OG_IMAGE) {
    tags.push('<meta property="og:image:width" content="1200" />');
    tags.push('<meta property="og:image:height" content="630" />');
    tags.push('<meta property="og:image:type" content="image/png" />');
  }

  return tags.filter(Boolean).join("\n    ");
}

function injectSeoMarkup(baseHtml, metadata) {
  const stripped = stripSeoMarkup(baseHtml);
  return stripped.replace(
    "</head>",
    `    ${metadataMarkup(metadata)}\n  </head>`
  );
}

function outputPathForRoute(route) {
  if (route === "/") return BASE_HTML_PATH;
  return join(DIST_DIRECTORY, route.replace(/^\//, ""), "index.html");
}

function writeRouteHtml(baseHtml, metadata) {
  const outputPath = outputPathForRoute(metadata.path);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, injectSeoMarkup(baseHtml, metadata));
  console.log(`Prerendered metadata for ${metadata.path}`);
}

function main() {
  if (!existsSync(BASE_HTML_PATH)) {
    throw new Error("dist/index.html does not exist. Run vite build first.");
  }

  const baseHtml = readFileSync(BASE_HTML_PATH, "utf8");

  Object.values(ROUTE_SEO).forEach((metadata) => {
    writeRouteHtml(baseHtml, metadata);
  });

  getBlogEntries().forEach((post) => {
    writeRouteHtml(baseHtml, {
      title: post.title,
      description: post.description,
      path: post.route,
      image: post.image || DEFAULT_OG_IMAGE,
      imageAlt: post.imageAlt || post.title,
      type: "article",
      publishedTime: post.lastmod,
      author: post.author || SITE_NAME,
    });
  });
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
