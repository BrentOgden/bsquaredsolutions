// src/pages/Blog.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import hero from "../assets/aboutHero.png";

/* ── Minimal parallax util ──────────────────────────────────────────── */
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

/* ── Posts (sample) ─────────────────────────────────────────────────── */
const posts = [
  {
    slug: "how-to-scope-a-website",
    title: "How to Scope a Website That Actually Meets Business Goals",
    date: "August 17, 2025",
    excerpt:
      "Learn how to write a website scope and requirements that tie directly to business goals, budget, and timeline—plus a free checklist.",
    image: "https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg",
  },
  {
    slug: "small-business-website-pricing",
    title: "Small Business Website Pricing: What It Costs (and Why)",
    date: "July 27, 2025",
    excerpt:
      "A transparent breakdown of small business website costs—design, development, CMS, hosting, SEO, and ongoing maintenance.",
    image: "https://images.pexels.com/photos/20142092/pexels-photo-20142092.jpeg",
  },
  {
    slug: "seo-basics",
    title: "Small Business SEO: A Practical Starter Checklist",
    date: "July 17, 2025",
    excerpt:
      "Remote sensing is one of the most powerful tools in modern environmental science, GIS, and planning — but many people are still unsure what it actually means.",
    image: "https://images.pexels.com/photos/326518/pexels-photo-326518.jpeg",
  },
  {
    slug: "website-speed-core-vitals",
    title: "Website Speed Matters: How to Pass Core Web Vitals",
    date: "June 24, 2025",
    excerpt:
      "Remote sensing is one of the most powerful tools in modern environmental science, GIS, and planning — but many people are still unsure what it actually means.",
    image: "https://images.pexels.com/photos/15543042/pexels-photo-15543042.jpeg",
  },
  {
    slug: "diy-vs-custom-sites",
    title: "DIY vs. Custom Website: How to Choose the Right Path",
    date: "June 17, 2025",
    excerpt:
      "Remote sensing is one of the most powerful tools in modern environmental science, GIS, and planning — but many people are still unsure what it actually means.",
    image: "https://images.pexels.com/photos/10988366/pexels-photo-10988366.jpeg",
  },
  {
    slug: "website-maintenance",
    title: "What’s Typically Included in a Website Maintenance Plan (and What’s Not",
    date: "June 2, 2025",
    excerpt:
      "A clear breakdown of what a professional website maintenance plan covers—security updates, backups, uptime monitoring, performance, SEO basics—and what typically requires a separate scope.",
    image: "https://images.pexels.com/photos/3912976/pexels-photo-3912976.jpeg",
  },
  {
    slug: "web-accessibility-wcag-22-small-business",
    title: "Small Business Web Accessibility: WCAG 2.2 Checklist & ADA Compliance Basics",
    date: "May 24, 2025",
    excerpt:
      "A practical, plain-English guide to making your small business website accessible—WCAG 2.2 essentials, ADA considerations, quick wins, and tools.",
    image: "https://images.pexels.com/photos/6980183/pexels-photo-6980183.jpeg",
  },
  {
    slug: "website-redesign-without-losing-seo",
    title: "Website Redesign Without Losing SEO: A Step-by-Step Migration Checklist",
    date: "May 17, 2025",
    excerpt:
      "Prevent traffic drops during a redesign. Map URLs, preserve on-page SEO, ship clean 301s, and monitor Core Web Vitals with this practical launch plan.",
    image: "https://images.pexels.com/photos/3912976/pexels-photo-3912976.jpeg",
  },
  {
    slug: "ga4-setup-small-business-conversion-tracking",
    title: "GA4 Setup for Small Businesses: Conversion Tracking with Google Tag Manager",
    date: "April 30, 2025",
    excerpt:
      "A practical guide to setting up Google Analytics 4, configuring events with Google Tag Manager, and tracking real conversions like form submissions, phone clicks, and email leads.",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
  },
  // Add more posts and pagination will expand automatically
];

const SITE_URL = "https://bsquaredsolutions.io";

/* ── Pagination helpers ─────────────────────────────────────────────── */
const PAGE_SIZE = 6;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function usePageState(totalPages) {
  const [params, setParams] = useSearchParams();
  const raw = parseInt(params.get("page") || "1", 10);
  const current = clamp(Number.isNaN(raw) ? 1 : raw, 1, Math.max(totalPages, 1));

  const setPage = (p) => {
    const page = clamp(p, 1, Math.max(totalPages, 1));
    const next = new URLSearchParams(params);
    if (page === 1) next.delete("page");
    else next.set("page", String(page));
    setParams(next, { replace: false });
  };

  return [current, setPage];
}

function getPageNumbers(current, total) {
  // Show up to 5 numbers with ellipses when needed
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function Pagination({ totalPages, currentPage, onChange }) {
  if (totalPages <= 1) return null;

  const numbers = getPageNumbers(currentPage, totalPages);

  const baseBtn =
    "inline-flex items-center justify-center h-10 min-w-10 px-3 rounded-lg font-semibold transition " +
    "ring-1 ring-white/20 backdrop-blur-md";

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-10 flex items-center justify-center gap-2 text-white"
    >
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${baseBtn} bg-white/10 hover:bg-white/15 disabled:opacity-50`}
      >
        ← Prev
      </button>

      {numbers.map((n, i) =>
        n === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-white/70 select-none"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={n}
            onClick={() => onChange(n)}
            aria-current={n === currentPage ? "page" : undefined}
            className={
              n === currentPage
                ? `${baseBtn} bg-gradient-to-r from-[#0185e4] to-[#3d86ca] text-white`
                : `${baseBtn} bg-white/10 hover:bg-white/15`
            }
          >
            {n}
          </button>
        )
      )}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${baseBtn} bg-white/10 hover:bg-white/15 disabled:opacity-50`}
      >
        Next →
      </button>
    </nav>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function Blog() {
  const canonical = `${SITE_URL}/blog`;
  const ogImage = posts[0]?.image || `${SITE_URL}/og/blog.jpg`;

  const totalPages = Math.ceil(posts.length / PAGE_SIZE) || 1;
  const [currentPage, setCurrentPage] = usePageState(totalPages);

  const pagePosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  return (
    <>
      <Helmet>
        <title>Blog | B Squared Solutions</title>
        <meta
          name="description"
          content="Insights on web development, performance, UX, SEO, and growing your business online."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | B Squared Solutions" />
        <meta
          property="og:description"
          content="Insights on web development, performance, UX, SEO, and growing your business online."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | B Squared Solutions" />
        <meta
          name="twitter:description"
          content="Insights on web development, performance, UX, SEO, and growing your business online."
        />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* HERO */}
      <section id="blog-hero" className="relative mt-10 pb-12 isolate overflow-hidden bg-gray-900">
        {/* Backdrop image */}
        <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
          <img
            alt="Blog backdrop"
            src={hero}
            className="size-full object-cover"
            style={{ objectPosition: "50% 35%" }}
            fetchPriority="high"
          />
        </Parallax>

        {/* Dark gradient overlay */}
        <Parallax
          speed={0.07}
          respectPRM={false}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
        </Parallax>

        {/* Blurred accent shape */}
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

        {/* Hero copy — LEFT aligned */}
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-12 lg:px-8">
          <div className="max-w-3xl lg:max-w-4xl text-left">
            <span className="hidden sm:inline-flex items-center rounded-full mb-2 px-3 py-1 text-lg text-white ring-2 ring-white/90">
              From the Blog
            </span>
            <h1 className="mt-2 text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">
              Practical insights for better websites.
            </h1>
            <p className="mt-6 text-lg/8 text-white text-shadow-lg/50 sm:text-xl/8">
              Web performance, UX, SEO, and real-world development tips to help you grow.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative bg-[linear-gradient(120deg,_#0B3E73_0%,_#145DA0_50%,_#3D86CA_100%)]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="mx-auto max-w-2xl lg:mx-0 mb-6">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">
              Latest articles
            </h2>
            <p className="mt-2 text-white/80">
              Learn how to accelerate your site and convert more visitors.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-b from-black/65 to-black/60 glow glow-strong backdrop-blur-2xl ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] p-6 md:p-10">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {pagePosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </>
  );
}
