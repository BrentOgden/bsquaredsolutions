// src/pages/BlogPost.jsx
import React, { useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import heroFallback from "../../assets/aboutHero.png";
import { FaArrowLeft } from "react-icons/fa";

/* ── Minimal parallax ───────────────────────────────────────────────── */
function useParallax({ speed = 0.7, axis = "y", respectPRM = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (respectPRM && reduce) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const r = el.getBoundingClientRect();
        const offset = r.top + r.height / 2 - window.innerHeight / 2;
        const d = -offset * speed;
        el.style.transform =
          axis === "x" ? `translate3d(${d}px,0,0)` : `translate3d(0,${d}px,0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, axis, respectPRM]);
  return ref;
}
function Parallax({ speed, axis, respectPRM = true, className = "", children }) {
  const ref = useParallax({ speed, axis, respectPRM });
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ── Load markdown files ────────────────────────────────────────────── */
const postFiles = import.meta.glob("../../posts/*.md", { as: "raw", eager: true });
const posts = {};
for (const path in postFiles) {
  const slug = path.match(/\/([^/]+)\.md$/)[1];
  posts[slug] = postFiles[path];
}

/* ── Preload local hero images in src/assets/blog/* ─────────────────── */
const heroAssets = import.meta.glob("../../assets/blog/*", { eager: true, as: "url" });
const heroByName = Object.fromEntries(
  Object.entries(heroAssets).map(([path, url]) => [path.split("/").pop(), url])
);

/* ── Markdown components (site style) ───────────────────────────────── */
const markdownComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-6" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-white/90 text-lg leading-relaxed mb-5" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-[#3d86ca] hover:text-[#0185e4] underline-offset-2 hover:underline"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 my-6 space-y-2 text-white/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 my-6 space-y-2 text-white/90" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-white/90 marker:text-white/70" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="my-8 border-l-4 border-[#3d86ca] pl-4 italic text-white/80" {...props}>
      {children}
    </blockquote>
  ),
  img: (props) => <img className="my-6 rounded-xl ring-1 ring-white/10 max-w-full" {...props} />,
  hr: () => <hr className="my-10 border-white/10" />,
  code: ({ inline, className, children, ...props }) =>
    inline ? (
      <code className="bg-white/10 text-white px-1.5 py-0.5 rounded" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-black/90 text-white p-4 rounded-xl ring-1 ring-white/10 overflow-x-auto text-sm">
        <code className={className}>{children}</code>
      </pre>
    ),
  /* GFM checkboxes + tables */
  input: (props) => {
    if (props.type === "checkbox") {
      return (
        <input
          {...props}
          className={`accent-[#3d86ca] align-[-2px] mr-2 h-4 w-4 rounded-sm bg-transparent ${
            props.className || ""
          }`}
        />
      );
    }
    return <input {...props} />;
  },
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full text-left border-separate border-spacing-0 rounded-lg ring-1 ring-white/10"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-white/10 text-white" {...props}>{children}</thead>
  ),
  tbody: ({ children, ...props }) => <tbody className="text-white/90" {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => (
    <tr className="border-b border-white/10 last:border-b-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="px-3 py-2 text-sm font-semibold border-b border-white/10" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-3 py-2 align-top border-b border-white/10" {...props}>
      {children}
    </td>
  ),
};

/* ── Helpers ────────────────────────────────────────────────────────── */
function parseFrontMatter(raw) {
  // Strip BOM and leading whitespace, then capture first front-matter block.
  const s = raw.replace(/^\uFEFF/, "").replace(/^\s+/, "");
  const m = s.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!m) return [{}, raw]; // no front matter — return original
  const fm = m[1];
  const body = s.slice(m[0].length);

  const data = {};
  fm.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf(":");
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    // Store original and lowercased keys for flexibility
    data[key] = value;
    data[key.toLowerCase()] = value;
  });
  return [data, body];
}

function resolveHero(src) {
  if (!src) return heroFallback;
  // Absolute URL or /public
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  // File in src/assets/blog/*
  if (heroByName[src]) return heroByName[src];
  const base = src.split("/").pop();
  if (base && heroByName[base]) return heroByName[base];
  return heroFallback;
}

/* ── Allow FA classes ───────────────────────────────────────────────── */
const faSanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "i", "span"],
  attributes: {
    ...(defaultSchema.attributes || {}),
    i: ["class", "className", "aria-hidden", "aria-label", "role", "title"],
    span: ["class", "className", "aria-hidden", "aria-label", "role", "title"],
    "*": [...(defaultSchema.attributes?.["*"] || []), "class", "className"],
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const raw = posts[slug];
  if (!raw) return <Navigate to="/404" replace />;

  // Robust front-matter parse (handles BOM/whitespace/CRLF)
  const [data, content] = parseFrontMatter(raw);

  // Accept common aliases (case-insensitive thanks to parse)
  const heroSrc = data.hero || data.image || data.cover;
  const title = data.title;
  const description = data.description;
  const date = data.date;
  const heroAlt = data.heroAlt || data.heroalt || "Blog post backdrop";
  const heroPosition = data.heroPosition || data.heroposition || "center";

  const heroUrl = resolveHero(heroSrc);
  const objectPosition = heroPosition;

  return (
    <>
      <Helmet>
        <title>{title} | B Squared Solutions Blog</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://bsquaredsolutions.io/blog/${slug}`} />
        <meta property="og:title" content={`${title} | B Squared Solutions Blog`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://bsquaredsolutions.io/blog/${slug}`} />
        <meta property="og:image" content={heroUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* HERO */}
      <section id="post-hero" className="relative mt-10 pb-12 isolate overflow-hidden bg-gray-900">
        <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
          <img
            alt={heroAlt}
            src={heroUrl}
            className="size-full object-cover"
            style={{ objectPosition }}
            fetchpriority="high"
          />
        </Parallax>
        <Parallax speed={0.07} respectPRM={false} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
        </Parallax>
        <Parallax
          speed={0.04}
          respectPRM={false}
          className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-br from-[#3d86ca] to-[#0185e4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </Parallax>

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-8 sm:pt-36 sm:pb-10 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full mb-3 px-3 py-1 text-white ring-2 ring-white/90">
              Article
            </span>
            <h1 className="text-5xl font-semibold tracking-tight text-pretty text-white sm:text-6xl">
              {title}
            </h1>
            {date && <p className="mt-3 text-white/80">{date}</p>}
          </div>
        </div>
      </section>

      {/* BACK LINK + CONTENT (single gradient section) */}
      <section className="relative pb-20 bg-gradient-to-br from-[#04223f] to-[#023c72]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 sm:pt-8">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-md font-semibold text-white hover:text-white underline-offset-2 glow-hover"
          >
            <FaArrowLeft />
            Back to Blog
          </a>

          <div className="mt-4 sm:mt-6 glow rounded-3xl bg-gradient-to-b from-black/65 to-black/60 backdrop-blur-2xl ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] p-6 md:p-10">
            {/* Force dark theme styles inside markdown */}
            <style>{`
              .blog-prose :where(h1,h2,h3,h4,h5,h6,p,li,blockquote,em,strong,th,td) { color: #fff !important; }
              .blog-prose :where(a) { color: #3d86ca; }
              .blog-prose :where(a:hover) { color: #0185e4; }
              .blog-prose :where(code):not(pre code) { background: rgba(255,255,255,0.12); color:#fff; }
              .blog-prose :where(pre) { background: rgba(0,0,0,0.9); color:#fff; }
              .blog-prose :where(hr) { border-color: rgba(255,255,255,0.1); }
              .blog-prose :where(table) { border-color: rgba(255,255,255,0.15); }
              .blog-prose :where(th,td) { border-color: rgba(255,255,255,0.15); }
              .blog-prose :where(.task-list-item){ list-style: none; }
              .blog-prose :where(input[type="checkbox"]){
                accent-color: #3d86ca;
                background: transparent;
                inline-size: 1rem; block-size: 1rem;
              }
            `}</style>

            <article className="blog-prose prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, faSanitizeSchema]]}
                components={markdownComponents}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
