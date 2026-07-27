import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { ROUTE_SEO } from "../src/data/seoData.js";

export const STATIC_INDEXABLE_ROUTES = Object.entries(ROUTE_SEO)
  .filter(([, metadata]) => !metadata.noindex)
  .map(([route]) => route);

export const NON_INDEXABLE_ROUTES = Object.entries(ROUTE_SEO)
  .filter(([, metadata]) => metadata.noindex)
  .map(([route]) => route);

export function parseFrontMatter(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes(":"))
      .map((line) => {
        const separator = line.indexOf(":");
        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        return [key, value];
      })
  );
}

function toIsoDate(value) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString().slice(0, 10);
}

export function getBlogEntries(postsDirectory = "./src/posts") {
  return readdirSync(postsDirectory)
    .filter((fileName) => extname(fileName).toLowerCase() === ".md")
    .map((fileName) => {
      const raw = readFileSync(join(postsDirectory, fileName), "utf8");
      const frontMatter = parseFrontMatter(raw);
      const fileSlug = fileName.replace(/\.md$/i, "");
      const slug = frontMatter.slug || fileSlug;

      return {
        route: `/blog/${slug}`,
        lastmod: toIsoDate(frontMatter.date),
        title: frontMatter.title || fileSlug,
        description:
          frontMatter.seoDescription || frontMatter.description || "",
        image: frontMatter.hero || frontMatter.image || frontMatter.cover,
        imageAlt: frontMatter.heroAlt || frontMatter.heroalt || frontMatter.title,
        author: frontMatter.author || frontMatter.authorname,
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
}

export function getIndexableRoutes(postsDirectory) {
  return [
    ...STATIC_INDEXABLE_ROUTES,
    ...getBlogEntries(postsDirectory).map(({ route }) => route),
  ];
}

export function getPrerenderRoutes(postsDirectory) {
  return [...getIndexableRoutes(postsDirectory), ...NON_INDEXABLE_ROUTES];
}
