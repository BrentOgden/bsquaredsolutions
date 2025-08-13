// src/components/Packages.jsx
import React, { useEffect, useRef, useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import hero from '../assets/packageHero.jpg'

/* ── Minimal parallax util (no deps) ─────────────────────────────────── */
function useParallax({ speed = 0.7, axis = 'y', respectPRM = true } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (respectPRM && reduce) return

    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const r = el.getBoundingClientRect()
        const offset = r.top + r.height / 2 - window.innerHeight / 2
        const d = -offset * speed
        el.style.transform = axis === 'x'
          ? `translate3d(${d}px,0,0)`
          : `translate3d(0,${d}px,0)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed, axis, respectPRM])
  return ref
}
function Parallax({ speed, axis, respectPRM = true, className = '', children }) {
  const ref = useParallax({ speed, axis, respectPRM })
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>
}

/* ── Data ────────────────────────────────────────────────────────────── */
const packagesData = [
  { id: 'startercms', title: 'CMS Starter', price: '$1,500',
    blurb: 'Ideal for solo entrepreneurs or small businesses needing a clean, conversion-focused site.',
    subtitle: '', features: [
      'Up to 5 custom-designed pages','Mobile-first, responsive layout','Contact form with email notifications',
      'Basic on-page SEO (titles, meta descriptions)','Google Analytics setup & Search Console submission',
      '1 round of design & content revisions','Deployment guidance & launch support','1 month post-launch support',
    ], cta: 'Get Started', path: '/#contact', popular: false },
  { id: 'starter', title: 'Starter', price: '$2000',
    blurb: 'Ideal for solo entrepreneurs or small businesses needing a clean, conversion-focused site.',
    subtitle: '', features: [
      'Up to 5 custom-designed pages','Mobile-first, responsive layout','Contact form with email notifications',
      'Basic on-page SEO (titles, meta descriptions)','Google Analytics setup & Search Console submission',
      '1 round of design & content revisions','Deployment guidance & launch support','1 month post-launch support',
    ], cta: 'Get Started', path: '/#contact', popular: false },
  { id: 'growth', title: 'Growth', price: '$3,000',
    blurb: 'For growing teams ready to scale traffic, leads and content.',
    subtitle: 'Everything in Starter plus:', features: [
      'Up to 10 pages, plus optional blog or news section','Optional CMS integration (WordPress, Headless CMS, etc.)',
      'Advanced on-page SEO & schema markup','Performance optimization & page-speed tuning',
      '2 rounds of revisions','3 months post-launch support','Basic accessibility compliance (WCAG AA)',
    ], cta: 'Get Started', path: '/#contact', popular: true },
  { id: 'platinum', title: 'Professional', price: 'Starts at $6,000',
    blurb: 'Complex sites with custom integrations, dashboards or e-commerce.',
    subtitle: 'All Growth features plus:', features: [
      'Unlimited pages & custom components','Custom API integrations & automations','E-commerce or membership system setup',
      'Design system / UI component library','Advanced accessibility & security hardening','6 months dedicated support & maintenance',
    ], cta: 'Get Started', path: '/#contact', popular: false },
  { id: 'diy', title: 'DIY Starter', price: '$99',
    blurb: 'Choose our pre-built, fully-functional basic starter template and we will provide an hour of dedicated support to get you up and running fast.',
    subtitle: '$49 - Template only (w/out support)', features: [
      'Pre-designed 5-page basic template','Full access to HTML/CSS for easy customization',
      'Installation & setup documentation','Includes 1 hour of installation/customization support',
    ], cta: 'View Template', path: '/basictemplate', popular: false },
  { id: 'diypro', title: 'DIY Professional', price: '$119',
    blurb: 'Choose our pre-built, fully-functional multi-page starter template with additional features and we will provide an hour of dedicated support to get you up and running fast.',
    subtitle: '$69 - Template only (w/out support)', features: [
      'Up to 8 pages with custom styling tweaks','Domain install & hosting configuration',
      'Includes 1 hour of installation/customization support','Access to premium components & plugins',
    ], cta: 'View Template', path: '/simpletemplate', popular: false },
  { id: 'diybusiness', title: 'DIY Small Business', price: '$149',
    blurb: 'Launch fast with our feature-packed, multi-page small-business template.',
    subtitle: '$99 - Template only (w/out support)', features: [
      'Up to 8 pages with custom styling tweaks','Domain install & hosting configuration',
      'Priority email support & 1×1 tutorial session','Access to premium components & plugins',
    ], cta: 'View Template', path: '/smallbusinesstemplate', popular: false },
]

/* ── Helpers ─────────────────────────────────────────────────────────── */
const inGroup = (ids) => (p) => ids.includes(p.id)
const BUILD_IDS = ['startercms','starter', 'growth', 'platinum', 'allinclusive']
const DIY_IDS   = ['diy', 'diypro', 'diybusiness']

/* ── Presentational components ───────────────────────────────────────── */
function PackageCard({ pkg, onCtaClick }) {
  return (
    <div
      className={`pkg-card relative flex flex-col rounded-2xl shadow-xl overflow-hidden bg-white/90 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0185e4]/60
        ${pkg.popular ? 'ring-2 ring-[#3d86ca]' : 'ring-1 ring-gray-200/60'}`}
    >
      {pkg.popular && (
        <span className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-2xl">
          Most Popular
        </span>
      )}

      <div className="p-8 pb-6">
        <h3 className="text-2xl font-semibold mb-2">{pkg.title}</h3>
        <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
        <p className="text-gray-700">{pkg.blurb}</p>
        {pkg.subtitle && <p className="text-gray-700 font-semibold italic pt-4">{pkg.subtitle}</p>}
      </div>

      <ul className="px-8 flex-1 space-y-3 mb-8">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-700">
            <FiCheck className="mt-1 flex-shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="px-8 pb-8">
        {onCtaClick ? (
          <button
            onClick={() => onCtaClick(pkg.path)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition"
          >
            {pkg.cta}
          </button>
        ) : (
          <Link
            to={pkg.path}
            className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition"
          >
            {pkg.cta}
          </Link>
        )}
      </div>
    </div>
  )
}

/* ── Continuous scroll speed ─────────────────────────────────────────── */
const MARQUEE_PX_PER_SEC = 40

/* ── Section block ───────────────────────────────────────────────────── */
/**
 * marquee=true => auto-scrolling row on ≥640px screens, 1-column grid on mobile.
 * marquee=false => standard responsive grid everywhere (1-col on mobile).
 */
function SectionBlock({
  id,
  kicker,
  title,
  blurb,
  variant = 'primary',
  items = [],
  onCtaClick,
  marquee = false,
}) {
  const ringColor = variant === 'accent' ? 'ring-[#04223f]/80' : 'ring-white/95'
  const bgGrad = 'bg-gradient-to-b from-black/65 to-black/60'

  // Detect mobile (Tailwind "sm" breakpoint: <640px)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)')
    const handler = (e) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    try { mql.addEventListener('change', handler) } catch { mql.addListener(handler) }
    return () => {
      try { mql.removeEventListener('change', handler) } catch { mql.removeListener(handler) }
    }
  }, [])

  /* Shared: equalize card heights */
  const equalizeHeights = (rootEl) => {
    const cards = rootEl ? Array.from(rootEl.querySelectorAll('.pkg-card')) : []
    if (!cards.length) return
    cards.forEach((c) => (c.style.height = 'auto'))
    const max = Math.max(...cards.map((c) => c.offsetHeight))
    cards.forEach((c) => (c.style.height = `${max}px`))
  }

  /* Marquee-specific refs/state */
  const containerRef = useRef(null)
  const rowRef = useRef(null)
  const pausedRef = useRef(false)
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const rafRef = useRef(0)
  const roRef = useRef(null)

  // Measure width of first set + one gap so the seam equals internal gaps
  const measureLoopWidth = () => {
    const row = rowRef.current
    if (!row) return 0
    const originals = Array.from(row.children).filter((el) => el.dataset.rep === '0')
    if (!originals.length) return 0
    const first = originals[0]
    const last = originals[originals.length - 1]
    const styles = getComputedStyle(row)
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0
    const left = first.offsetLeft
    const right = last.offsetLeft + last.offsetWidth
    const loopWidth = (right - left) + gap
    loopWidthRef.current = loopWidth
    return loopWidth
  }

  const startLoop = () => {
    let last = performance.now()
    const step = (now) => {
      const dt = Math.max(0.001, (now - last) / 1000)
      last = now
      const L = loopWidthRef.current
      if (!isMobile && L > 1 && !pausedRef.current) {
        offsetRef.current += MARQUEE_PX_PER_SEC * dt
        if (offsetRef.current >= L) offsetRef.current -= L
        rowRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }

  /* Effects only when marquee is enabled and not on mobile */
  useEffect(() => {
    if (!marquee) return
    const container = containerRef.current

    const t = setTimeout(() => {
      if (!isMobile) {
        measureLoopWidth()
      }
      equalizeHeights(rowRef.current || container)
      startLoop()
    }, 0)

    const onEnter = () => { pausedRef.current = true }
    const onLeave = () => { pausedRef.current = false }
    container?.addEventListener('mouseenter', onEnter)
    container?.addEventListener('mouseleave', onLeave)
    container?.addEventListener('touchstart', onEnter, { passive: true })
    container?.addEventListener('touchend', onLeave)

    const onResize = () => {
      if (!isMobile) {
        const prevL = loopWidthRef.current
        const L = measureLoopWidth()
        if (L > 0 && prevL > 0) offsetRef.current = offsetRef.current % L
      } else {
        offsetRef.current = 0
        if (rowRef.current) rowRef.current.style.transform = 'translate3d(0,0,0)'
      }
      equalizeHeights(rowRef.current || container)
    }
    window.addEventListener('resize', onResize)

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => {
        if (!isMobile) measureLoopWidth()
        equalizeHeights(rowRef.current || container)
      })
      roRef.current = ro
      const cards = (rowRef.current || container)?.querySelectorAll?.('.pkg-card') ?? []
      cards.forEach((c) => ro.observe(c))
    }

    return () => {
      clearTimeout(t)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      container?.removeEventListener('mouseenter', onEnter)
      container?.removeEventListener('mouseleave', onLeave)
      container?.removeEventListener('touchstart', onEnter)
      container?.removeEventListener('touchend', onLeave)
      window.removeEventListener('resize', onResize)
      if (roRef.current) roRef.current.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marquee, items.length, isMobile])

  // Build repeated list (only for marquee on non-mobile)
  const repeated = (!isMobile && marquee)
    ? [...items, ...items].map((pkg, idx) => ({
        ...pkg,
        _key: `${pkg.id}__rep${idx >= items.length ? '1' : '0'}_${idx}`,
        _rep: idx >= items.length ? '1' : '0',
      }))
    : items.map((pkg) => ({ ...pkg, _key: pkg.id }))

  return (
    <div
      id={id}
      className={`scroll-mt-28 md:scroll-mt-32 rounded-3xl ${bgGrad} glow glow-strong backdrop-blur-2xl ring-1 ${ringColor} shadow-[0_0_0_1px_rgba(255,255,255,0.04)] p-6 md:p-10`}
    >
      <div className="mb-6 text-center">
        {kicker && (
          <span className="inline-block text-xs tracking-widest uppercase font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90 ring-1 ring-white/20">
            {kicker}
          </span>
        )}
        <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-white text-shadow-xl/50">
          {title}
        </h3>
        {blurb && (
          <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-white text-shadow-lg/50">
            {blurb}
          </p>
        )}
      </div>

      {/* Top marquee on ≥sm screens; 1-col grid on mobile OR plain grid when marquee=false */}
      {marquee && !isMobile ? (
        // Continuous marquee with uniform gap (first set + one gap)
        <div ref={containerRef} className="relative overflow-hidden" aria-label={`${title} packages`}>
          <div
            ref={rowRef}
            className="
              grid grid-flow-col auto-cols-[minmax(18rem,22rem)]
              md:auto-cols-[minmax(20rem,24rem)]
              gap-8 pr-1 will-change-transform
            "
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            {repeated.map((pkg) => (
              <div key={pkg._key} data-rep={pkg._rep} className="snap-start">
                <PackageCard pkg={pkg} onCtaClick={onCtaClick} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Standard responsive grid: 1-col on mobile, 2-col on sm, 3-col on lg
        <div className="relative" aria-label={`${title} packages`}>
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              gap-8
            "
          >
            {repeated.map((pkg) => (
              <div key={pkg._key}>
                <PackageCard pkg={pkg} onCtaClick={onCtaClick} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Sticky nav with sliding pill (shared layout) ─────────────────────── */
function MiniStickyNav({ active }) {
  const items = [
    { id: 'build', label: 'Build' },
    { id: 'templates', label: 'Templates' },
  ]

  const handleClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeSafe = active || 'build'

  return (
    <div className="sticky top-4 z-30">
      <nav
        aria-label="Package sections"
        className="mx-auto max-w-md rounded-full bg-white/10 backdrop-blur-xl ring-1 ring-white/20 shadow-lg"
      >
        <LayoutGroup id="packagesNav">
          <ul className="relative flex items-center justify-between p-1">
            {items.map((item) => {
              const isActive = activeSafe === item.id
              return (
                <li key={item.id} className="relative flex-1">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className="block"
                  >
                    <motion.span
                      className="relative flex items-center justify-center px-5 py-3 text-sm font-semibold"
                      animate={{ scale: isActive ? 1 : 0.98 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navPill"
                          className="absolute inset-0 mx-1 rounded-full bg-gradient-to-r from-[#0185e4] to-[#3d86ca] shadow z-0"
                          transition={{ type: 'spring', stiffness: 420, damping: 40, mass: 0.3 }}
                        />
                      )}
                      <span className={isActive ? 'relative z-10 text-white' : 'relative z-10 text-white/80 hover:text-white'}>
                        {item.label}
                      </span>
                    </motion.span>
                  </a>
                </li>
              )
            })}
          </ul>
        </LayoutGroup>
      </nav>
    </div>
  )
}

/* ── Page component ───────────────────────────────────────────────────── */
export default function Packages({ packages = packagesData, onCtaClick }) {
  const [activeSection, setActiveSection] = useState('build')

  const buildPackages = packages.filter(inGroup(BUILD_IDS))
  const diyPackages   = packages.filter(inGroup(DIY_IDS))

  useEffect(() => { setActiveSection('build') }, [])

  // ScrollSpy
  useEffect(() => {
    const ids = ['build', 'templates']
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!targets.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveSection(visible.target.id)
      },
      { root: null, rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* HERO */}
      <section id="packages-hero" className="relative mt-10 pb-20 isolate overflow-hidden bg-gray-900">
        <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
          <img alt="Packages backdrop" src={hero} className="size-full object-cover object-center" />
        </Parallax>

        <Parallax speed={0.07} respectPRM={false} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
        </Parallax>

        <Parallax speed={0.04} respectPRM={false} className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{ clipPath: 'polygon(74.1%_44.1%,100%_61.6%,97.5%_26.9%,85.5%_0.1%,80.7%_2%,72.5%_32.5%,60.2%_62.4%,52.4%_68.1%,47.5%_58.3%,45.2%_34.5%,27.5%_76.7%,0.1%_64.9%,17.9%_100%,27.6%_76.8%,76.1%_97.7%,74.1%_44.1%)' }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-br from-[#3d86ca] to-[#0185e4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </Parallax>

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-12 lg:px-8">
          <motion.div
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto max-w-3xl lg:max-w-4xl text-center lg:text-left"
          >
            <div className="hidden sm:flex sm:justify-center lg:justify-start">
              <span className="relative inline-flex items-center rounded-full mb-2 px-3 py-1 text-lg text-white ring-2 ring-white/90">
                Pricing & Packages
              </span>
            </div>

            <h1 className="mt-2 text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">
              Transparent pricing, clear deliverables.
            </h1>
            <p className="mt-6 text-lg/8 text-white text-shadow-lg/50 sm:text-xl/8">
              Choose the path that fits your goals — <strong>Custom Build</strong>: hand-crafted to your brand, search-ready and performance-tuned; or <strong>Pre-designed Template</strong>: quick, flexible, and budget-friendly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative pt-20 bg-gradient-to-br from-[#04223f] to-[#023c72]">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="relative -mt-28 mb-10 px-0">
            <MiniStickyNav active={activeSection} />
          </div>

          {/* SECTION 1: Custom Builds — marquee ON (desktop), 1-col grid on mobile */}
          <div className="pt-6 pb-8">
            <SectionBlock
              id="build"
              kicker="Custom Builds"
              title="Crafted From Scratch"
              blurb="Have us build a polished, performance-focused site — designed and developed for your brand. We translate your brand vision into a cohesive, expertly built website with full setup and support."
              variant="primary"
              items={packages.filter(inGroup(BUILD_IDS))}
              onCtaClick={onCtaClick}
              marquee
            />
          </div>

          {/* SECTION 2: DIY Templates — standard responsive grid */}
          <div className="pt-10 pb-16">
            <SectionBlock
              id="templates"
              kicker="DIY Templates"
              title="Launch Fast With Our Professional Templates"
              blurb="Get moving quickly with a professional template you can evolve over time. Pick a prebuilt site, brand it your way, and go live with 1 hour of included support."
              variant="accent"
              items={packages.filter(inGroup(DIY_IDS))}
              onCtaClick={onCtaClick}
              marquee={false}
            />
          </div>
        </div>
      </section>
    </>
  )
}
