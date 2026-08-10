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
import { getBlogEntries, getPrerenderRoutes } from "./site-routes.mjs";

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

function absoluteUrl(value) {
  try {
    return new URL(value || DEFAULT_OG_IMAGE, `${SITE_URL}/`).toString();
  } catch {
    return DEFAULT_OG_IMAGE;
  }
}

function routeMetadata(route, blogByRoute) {
  if (ROUTE_SEO[route]) return ROUTE_SEO[route];

  const post = blogByRoute.get(route);
  if (post) {
    return {
      title: post.title,
      description: post.description,
      path: route,
      image: post.image || DEFAULT_OG_IMAGE,
      imageAlt: post.imageAlt || post.title,
      type: "article",
      publishedTime: post.lastmod,
      author: post.author || SITE_NAME,
    };
  }

  return {
    title: SITE_NAME,
    description: "B Squared Solutions web design and development services.",
    path: route,
    image: DEFAULT_OG_IMAGE,
  };
}

function stripManagedSeo(html) {
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
  const route = metadata.path || "/";
  const pageUrl = `${SITE_URL}${canonicalRoute(route)}`;
  const imageUrl = absoluteUrl(metadata.image);
  const robots = `${metadata.noindex ? "noindex" : "index"}, ${
    metadata.nofollow ? "nofollow" : "follow"
  }`;
  const type = metadata.type || "website";
  const schema = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    url: pageUrl,
    name: metadata.title,
    description: metadata.description,
    image: imageUrl,
    inLanguage: "en-US",
    ...(type === "article" && metadata.publishedTime
      ? { datePublished: metadata.publishedTime }
      : {}),
    ...(type === "article" && metadata.author
      ? { author: { "@type": "Organization", name: metadata.author } }
      : {}),
  };

  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(type)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt || metadata.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

function staticContent(metadata) {
  const heading = String(metadata.title || SITE_NAME).split(" | ")[0];
  return `<main data-seo-static-content style="max-width:72rem;margin:0 auto;padding:4rem 1.5rem;font-family:Lato,Arial,sans-serif;color:#0f172a;background:#fff">
    <h1>${escapeHtml(heading)}</h1>
    <p>${escapeHtml(metadata.description || "")}</p>
    <nav aria-label="B Squared Solutions pages">
      <a href="/products/">Services</a> ·
      <a href="/packages/">Packages</a> ·
      <a href="/portfolio/">Portfolio</a> ·
      <a href="/blog/">Blog</a> ·
      <a href="/contact/">Contact</a>
    </nav>
  </main>`;
}

function injectRoute(baseHtml, metadata) {
  const withSeo = stripManagedSeo(baseHtml).replace(
    "</head>",
    `    ${metadataMarkup(metadata)}\n  </head>`
  );

  return withSeo.replace(
    /<div id="root"><\/div>/,
    `<div id="root" data-seo-static="true">${staticContent(metadata)}</div>`
  );
}

export function renderStaticFallback() {
  if (!existsSync(BASE_HTML_PATH)) {
    throw new Error("dist/index.html does not exist. Run vite build first.");
  }

  const baseHtml = readFileSync(BASE_HTML_PATH, "utf8");
  const blogEntries = getBlogEntries();
  const blogByRoute = new Map(blogEntries.map((post) => [post.route, post]));

  for (const route of getPrerenderRoutes()) {
    const metadata = routeMetadata(route, blogByRoute);
    const outputPath = outputPathForRoute(route);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, injectRoute(baseHtml, metadata));
    console.log(`Generated static SEO fallback for ${canonicalRoute(route)}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  renderStaticFallback();
}
