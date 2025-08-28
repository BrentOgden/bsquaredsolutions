// src/components/HalfImageTextSlider.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function HalfImageTextSlider({
  slides = DEFAULT_SLIDES,
  auto = true,
  interval = 5000,
  imageFirst = true,
  showBackground = true,
  height = "min-h-[320px]",
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0); // -1 left, +1 right
  const reduce = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
    []
  );
  const canAuto = auto && !reduce && slides.length > 1;

  const go = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex((i) => (next + slides.length) % slides.length);
  };
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // autoplay + hover pause
  const timerRef = useRef(0);
  const clearTimer = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = 0;
  };
  useEffect(() => {
    clearTimer();
    if (canAuto) timerRef.current = window.setInterval(next, interval);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, canAuto, interval]);

  const onEnter = () => clearTimer();
  const onLeave = () => {
    if (canAuto && !timerRef.current) timerRef.current = window.setInterval(next, interval);
  };

  // keyboard nav
  const wrapRef = useRef(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // swipe
  const startX = useRef(0);
  const onPointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onPointerUp = (e) => {
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const dx = endX - startX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
  };

  if (!slides.length) return null;
  const slide = slides[index];

  return (
    <section
      ref={wrapRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Showcase"
      className={`relative mx-auto w-full max-w-8xl pb-10 px-6 md:pb-10 pt-8 focus:outline-none ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {showBackground && (
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[radial-gradient(120%_120%_at_10%_10%,#1b6fff_0%,#0c2a51_35%,#0a0f1c_75%,#080b12_100%)]" />
        </div>
      )}

      {/* Glass container */}
      <div
        className={`rounded-3xl ring-1 ring-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_0_1px_rgba(255,255,255,0.6),0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden ${height}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 h-full ${
            imageFirst ? "" : "lg:[&>*:first-child]:col-start-2"
          }`}
        >
          {/* IMAGE */}
          {/* Ensure height on small screens so absolute child is visible */}
          <div className="relative h-64 sm:h-80 md:h-full">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ x: dir > 0 ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir > 0 ? -40 : 40, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-black/10 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
              <>
                {/* Hide nav buttons on mobile; show from md+ */}
                <button
                  aria-label="Previous slide"
                  onClick={prev}
                  className="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 place-items-center size-11 rounded-full bg-black/40 hover:bg-black/60 ring-1 ring-white/20 text-white transition"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>
                <button
                  aria-label="Next slide"
                  onClick={next}
                  className="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 place-items-center size-11 rounded-full bg-black/40 hover:bg-black/60 ring-1 ring-white/20 text-white transition"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
              </>
            )}
          </div>

          {/* TEXT */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.article
                key={index}
                custom={dir}
                initial={{ x: dir > 0 ? -30 : 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir > 0 ? 30 : -30, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
                className="h-full flex flex-col justify-center px-6 py-8 sm:px-10 md:px-12"
              >
                {slide.kicker && (
                  <span className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase text-white/90 ring-1 ring-white/20 bg-white/10 mb-3">
                    {slide.kicker}
                  </span>
                )}
                <h3 className="text-white text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.08)]">
                  {slide.title}
                </h3>
                {slide.body && (
                  <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed">
                    {slide.body}
                  </p>
                )}
                {slide.ctaLabel && slide.ctaHref && (
                  <div className="mt-6">
                    <a
                      href={slide.ctaHref}
                      className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-white/10 hover:bg-white/15 ring-1 ring-white/20 transition"
                    >
                      {slide.ctaLabel}
                    </a>
                  </div>
                )}

                {slides.length > 1 && (
                  <div className="mt-8 flex items-center gap-2">
                    {slides.map((_, i) => {
                      const active = i === index;
                      return (
                        <button
                          key={i}
                          aria-label={`Go to slide ${i + 1}`}
                          onClick={() => go(i)}
                          className={`h-2.5 rounded-full transition ring-1 ring-white/30 ${
                            active ? "w-7 bg-white" : "w-2.5 bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/5 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Default demo slides (replace as needed) */
const DEFAULT_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Laptop with code",
    kicker: "Web Development",
    title: "Blazing-fast websites built with React & Tailwind.",
    body: (
      <ul className="space-y-2">
        {[
          "Custom React + Tailwind UI built for your brand",
          "Mobile-first, responsive layouts and components",
          "Optional CMS integration (WordPress, headless, etc.) for easy editing",
          "Technical SEO baked in: clean markup, schema, meta, sitemaps",
          "Page-speed optimization (Core Web Vitals) and accessibility checks",
        ].map((text) => (
          <li key={text} className="flex items-start gap-2 leading-7">
            <IoMdCheckmarkCircleOutline
              className="relative top-[2px] shrink-0 text-[1.15em]"
              aria-hidden="true"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    ),
    ctaLabel: "View Pricing & Packages",
    ctaHref: "/packages#build",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&auto=format&fit=crop",
    alt: "Design system",
    kicker: "Design & Consulting",
    title: "UI systems, audits, and clear roadmaps",
    body: (
      <ul className="space-y-2">
        {[
          "UX research, sitemap, and wireframes that align to goals",
          "Visual design system (colors, type, components) for consistency",
          "Architecture & performance audits of existing sites/apps",
          "Recommendations for stack, hosting, analytics, and integrations",
          "Implementation roadmap with milestones and estimates",
        ].map((text) => (
          <li key={text} className="flex items-start gap-2 leading-7">
            <IoMdCheckmarkCircleOutline
              className="relative top-[2px] shrink-0 text-[1.15em]"
              aria-hidden="true"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    ),
    ctaLabel: "Work With Us",
    ctaHref: "/contact",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    alt: "Analytics dashboard",
    kicker: "SEO & Analytics",
    title: "Ongoing support to keep you fast, secure, and optimized",
    body: (
      <ul className="space-y-2">
        {[
          "Keyword research mapped to pages and user intent",
          "On-page SEO (titles, meta, headings, internal linking)",
          "Technical SEO fixes (indexing, redirects, schema markup)",
          "GA4 + Search Console setup and conversion tracking",
          "Content briefs and recommendations to expand rankings",
        ].map((text) => (
          <li key={text} className="flex items-start gap-2 leading-7">
            <IoMdCheckmarkCircleOutline
              className="relative top-[2px] shrink-0 text-[1.15em]"
              aria-hidden="true"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    ),
    ctaLabel: "Explore Maintenance Plans",
    ctaHref: "/packages#maintenance",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    alt: "Analytics dashboard",
    kicker: "Ongoing Support",
    title: "Proactive maintenance, monitoring, and quick turnarounds on updates.",
    body: (
      <ul className="space-y-2">
        {[
          "Monthly updates and security patches",
          "Uptime & performance monitoring with alerts",
          "Content edits and minor feature requests",
          "Priority support with clear SLAs",
          "Regular reviews and update recommendations",
        ].map((text) => (
          <li key={text} className="flex items-start gap-2 leading-7">
            <IoMdCheckmarkCircleOutline
              className="relative top-[2px] shrink-0 text-[1.15em]"
              aria-hidden="true"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    ),
    ctaLabel: "Support Packages",
    ctaHref: "/packages#maintenance",
  },
];
