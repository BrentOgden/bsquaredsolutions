import React, { useEffect, useRef, useState } from "react"
import hero from '../assets/smb-1.png'
import heronew from '../assets/heronew.jpg'

/* Parallax util (no deps). Set respectPRM to false to force enable. */
function useParallax({ speed = 0.7, axis = "y", respectPRM = false } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (respectPRM && reduce) return

    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const r = el.getBoundingClientRect()
        const offset = (r.top + r.height / 2) - (window.innerHeight / 2)
        const d = -offset * speed
        el.style.transform = axis === "x"
          ? `translate3d(${d}px,0,0)`
          : `translate3d(0,${d}px,0)`
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed, axis, respectPRM])
  return ref
}

function Parallax({ speed, axis, respectPRM = true, className = "", children }) {
  const ref = useParallax({ speed, axis, respectPRM })
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

/* ---- Auto-pan hook for the right image ---- */
function useAutoPan(containerRef, imgRef) {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const measure = () => {
      const ch = container.getBoundingClientRect().height
      const ih = img.getBoundingClientRect().height
      const delta = Math.max(0, ih - ch) // how far we can pan
      const duration = Math.max(14, Math.min(36, 12 + delta / 50)) // 14–36s
      container.style.setProperty('--pan', `${delta}px`)
      container.style.setProperty('--pan-duration', `${duration}s`)
    }

    // measure on load/resize
    if (img.complete) measure()
    else img.addEventListener('load', measure, { once: true })

    const ro = new ResizeObserver(measure)
    ro.observe(container)
    ro.observe(img)

    // start/stop when in view
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '0px', threshold: 0.15 }
    )
    io.observe(container)

    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [containerRef, imgRef])

  return inView
}

export default function Hero({
  eyebrow = "What We Do",
  title = "Elevate Your Online Presence with our Suite of Custom Web Development Services",
  subtitle = "From scalable React applications and TailwindCSS designs to data-driven SEO optimization and dedicated ongoing support, B Squared Solutions delivers digital experiences that attract visitors, convert leads, and fuel your business growth.",
  primaryCta = { label: "Learn How We Can Help", href: "/#contact" },
  secondaryCta = { label: "Our Recent Projects", href: "/portfolio" },
  badge = { text: "New Templates Available", href: "/templates" },

  // Background
  bgImageSrc = heronew,
  bgImageAlt = "Developer workspace",
  bgImageClassName = "object-center",

  // RIGHT: image panel
  rightImageSrc = hero,
  rightImageAlt = "Product preview",
  rightImageClassName = "object-cover",
  rightImageAspect = "aspect-[4/3]",
}) {
  const panelRef = useRef(null)
  const imgRef = useRef(null)
  const inView = useAutoPan(panelRef, imgRef)

  return (
    <section className="relative isolate overflow-hidden mt-10 bg-gray-900">
      {/* CSS for auto-pan */}
      <style>{`
        @keyframes bs-panY {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(0, calc(-1 * var(--pan, 0px)), 0); }
        }
        .bs-auto-pan {
          animation: bs-panY var(--pan-duration, 18s) ease-in-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .bs-auto-pan { animation: none !important; }
        }
      `}</style>

      {/* Parallax background image */}
      {bgImageSrc && (
        <Parallax speed={0.55} respectPRM={false} className="absolute inset-0 -z-10">
          <img alt={bgImageAlt} src={bgImageSrc} className={`size-full object-cover ${bgImageClassName}`} />
        </Parallax>
      )}

      {/* Soft radial tint (also parallax, subtle) */}
      <Parallax speed={0.07} respectPRM={false} className="absolute inset-0 -z-10 pointer-events-none">
  <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
</Parallax>

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 lg:px-8">
        {/* Top blob */}
        <Parallax speed={0.04} respectPRM={false} className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{ clipPath: "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.6%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)" }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3d86ca] to-[#0185e4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </Parallax>

        {/* Content grid */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: copy */}
          <div className="mx-auto max-w-2xl text-center lg:text-left">
            {badge && (
              <div className="hidden sm:flex sm:justify-center lg:justify-start">
                <a href={badge.href} className="relative inline-flex items-center rounded-full px-3 py-1 text-md text-white ring-2 ring-white/90 hover:bg-white/15 animate-pulse">
                  <span className="font-medium">{badge.text}</span>
                  <span aria-hidden="true" className="ml-2">→</span>
                </a>
              </div>
            )}
            <h2 className="mt-6 text-2xl font-bold text-primary">{eyebrow}</h2>
            <h1 className="mt-2 text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">{title}</h1>
            <p className="mt-6 text-lg/8 text-white text-shadow-lg/50 sm:text-xl/8">{subtitle}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a href={primaryCta.href} className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#3d86ca]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {primaryCta.label}
              </a>
              <a href={secondaryCta.href} className="text-sm/6 px-3.5 py-1.75 font-semibold border-2 rounded-md border-[#3d86ca] hover:bg-[#3d86ca]/80 text-white">
                {secondaryCta.label} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* RIGHT: image panel with auto-pan */}
          <Parallax speed={0.12} respectPRM={false} className="relative mx-auto w-full lg:max-w-none">
            <div
              ref={panelRef}
              className={`relative mx-auto ${rightImageAspect} h-full mt-6 max-w-[560px] rounded-sm glow glow-strong border border-white/10 overflow-hidden`}
            >
              {rightImageSrc ? (
                <img
                  ref={imgRef}
                  src={rightImageSrc}
                  alt={rightImageAlt}
                  className={`h-auto min-h-full w-full ${rightImageClassName} bs-auto-pan`}
                  style={{ animationPlayState: inView ? 'running' : 'paused' }}
                  loading="eager"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/50">Add an image</div>
              )}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-[#3d86ca]/30 blur-3xl opacity-40" />
          </Parallax>
        </div>

        {/* Bottom blob */}
        <Parallax speed={0.10} respectPRM={false} className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{ clipPath: "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)" }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3d86ca] to-[#0185e4] opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </Parallax>
      </div>
    </section>
  )
}
