import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Minimal parallax (matches your pages) ───────────────────────────── */
function useParallax({ speed = 0.45, axis = "y", respectPRM = true } = {}) {
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

/* ── Exact style hero (as requested) ─────────────────────────────────── */
export default function SiteHero({
  id,
  imageSrc,
  imageAlt = "Page backdrop",
  kicker = "Our Recent Projects",
  title = "Custom Websites & Web Apps Built for Performance",
  subtitle = "Explore real projects for businesses — React & Tailwind builds, fast load times, clean CMS editing, and SEO baked in.",
  subtitle2 = "",
}) {
  return (
    <section id={id} className="relative isolate overflow-hidden mt-10 bg-gray-900">
      {/* Background photo (parallax) */}
      <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
        <img alt={imageAlt} src={imageSrc} className="size-full object-cover object-center" />
      </Parallax>

      {/* Full-cover brand gradient @ 70% */}
      <Parallax speed={0.07} respectPRM={false} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
      </Parallax>

      {/* Top accent blob */}
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
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3d86ca] to-[#0185e4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          aria-hidden="true"
        />
      </Parallax>

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
          className="mx-auto max-w-3xl text-center lg:max-w-4xl lg:text-left"
        >
          {kicker ? (
            <div className="hidden sm:flex sm:justify-center lg:justify-start">
              <span className="relative inline-flex items-center rounded-full mb-2 px-3 py-1 text-lg text-white ring-2 ring-white/90">
                {kicker}
              </span>
            </div>
          ) : null}

          <h1 className="mt-2 text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 text-lg/8 text-white text-shadow-lg/50 sm:text-xl/8">{subtitle}</p>
            
          ) : null}
          
            <p className="mt-6 text-sm text-white text-shadow-lg/50 sm:text-sm">{subtitle2}</p>
            
         
        </motion.div>
      </div>
    </section>
  );
}
