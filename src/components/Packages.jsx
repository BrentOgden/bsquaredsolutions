// src/components/Packages.jsx
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
  {
    id: 'starter',
    title: 'Starter',
    price: '$1,500',
    blurb:
      'Ideal for solo entrepreneurs or small businesses needing a clean, conversion-focused site.',
    subtitle: '',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first, responsive layout',
      'Contact form with email notifications',
      'Basic on-page SEO (titles, meta descriptions)',
      'Google Analytics setup & Search Console submission',
      '1 round of design & content revisions',
      'Deployment guidance & launch support',
    ],
    cta: 'Get Started',
    path: '/#contact',
    popular: false,
  },
  {
    id: 'growth',
    title: 'Growth',
    price: '$3,000',
    blurb: 'For growing teams ready to scale traffic, leads and content.',
    subtitle: 'Everything in Starter plus:',
    features: [
      'Up to 10 pages, plus optional blog or news section',
      'Optional CMS integration (WordPress, Headless CMS, etc.)',
      'Advanced on-page SEO & schema markup',
      'Performance optimization & page-speed tuning',
      '2 rounds of revisions',
      '3 months post-launch support',
      'Basic accessibility compliance (WCAG AA)',
    ],
    cta: 'Most Popular – Let’s Talk',
    path: '/#contact',
    popular: true,
  },
  {
    id: 'platinum',
    title: 'Professional',
    price: 'Starts at $6,000',
    blurb: 'Complex sites with custom integrations, dashboards or e-commerce.',
    subtitle: 'All Growth features plus:',
    features: [
      'Unlimited pages & custom components',
      'Custom API integrations & automations',
      'E-commerce or membership system setup',
      'Design system / UI component library',
      'Advanced accessibility & security hardening',
      '6 months dedicated support & maintenance',
    ],
    cta: 'Book a Discovery Call',
    path: '/#contact',
    popular: false,
  },
  {
    id: 'diy',
    title: 'DIY Starter',
    price: '$299',
    blurb: 'Pre-built, fully-functional template to get you up and running fast.',
    subtitle: '',
    features: [
      'Pre-designed 5-page template',
      'Full access to HTML/CSS for easy customization',
      'Installation & setup documentation',
      'Optional add-on templates & components',
    ],
    cta: 'Choose Template',
    path: '/templates',
    popular: false,
  },
  {
    id: 'diypro',
    title: 'DIY Pro',
    price: '$1,999',
    blurb: 'Enhanced template with professional configuration and support.',
    subtitle: 'Everything in DIY Starter plus:',
    features: [
      'Up to 8 pages with custom styling tweaks',
      'Domain install & hosting configuration',
      'Priority email support & 1×1 tutorial session',
      'Access to premium components & plugins',
    ],
    cta: 'Customize DIY Pro',
    path: '/#contact',
    popular: false,
  },
  {
    id: 'allinclusive',
    title: 'The Works',
    price: 'Custom Pricing',
    blurb:
      'Our full-service, end-to-end solution: strategy, design, build & beyond.',
    subtitle: '',
    features: [
      'Unlimited pages, features & custom code',
      'Brand design, logo & content writing',
      'Full SEO & digital marketing strategy',
      'All custom integrations, automations & analytics dashboards',
      'Dedicated project manager',
      '12 months of premium support & maintenance',
    ],
    cta: 'Book a Discovery Call',
    path: '/#contact',
    popular: false,
  },
]

/* ── Component ───────────────────────────────────────────────────────── */
export default function Packages({ packages = packagesData, onCtaClick }) {
  return (
    <>
      {/* HERO (matches other sections) */}
      <section id="packages-hero" className="relative mt-10 isolate overflow-hidden bg-gray-900">
        {/* Background image (parallax) */}
        <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
          <img
            alt="Packages backdrop"
            src={hero}
            className="size-full object-cover object-center"
          />
        </Parallax>

        {/* Full-cover brand gradient @ 70% */}
        <Parallax speed={0.07} respectPRM={false} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
        </Parallax>

        {/* Top accent blob */}
        <Parallax speed={0.04} respectPRM={false} className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{ clipPath: 'polygon(74.1%_44.1%,100%_61.6%,97.5%_26.9%,85.5%_0.1%,80.7%_2%,72.5%_32.5%,60.2%_62.4%,52.4%_68.1%,47.5%_58.3%,45.2%_34.5%,27.5%_76.7%,0.1%_64.9%,17.9%_100%,27.6%_76.8%,76.1%_97.7%,74.1%_44.1%)' }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-br from-[#3d86ca] to-[#0185e4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </Parallax>

        {/* Copy (left-aligned like the others) */}
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 lg:px-8">
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

            {/* <h2 className="mt-6 text-xl font-semibold text-primary">Web Packages</h2> */}
            <h1 className="mt-2 text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">
              Transparent pricing, clear deliverables.
            </h1>
            <p className="mt-6 text-lg/8 text-white text-shadow-lg/50 sm:text-xl/8">
              Choose a plan that fits your goals—each package includes performance, SEO basics, and launch support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section id="packages" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl shadow-xl overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0185e4]/30
                ${pkg.popular ? 'ring-2 ring-[#3d86ca]' : ''}`}
            >
              {pkg.popular && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-2xl">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="p-8 pb-6">
                <h3 className="text-2xl font-semibold mb-2">{pkg.title}</h3>
                <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                <p className="text-gray-700">{pkg.blurb}</p>
                {pkg.subtitle && (
                  <p className="text-gray-700 font-bold pt-4">{pkg.subtitle}</p>
                )}
              </div>

              {/* Feature list */}
              <ul className="px-8 flex-1 space-y-3 mb-8">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <FiCheck className="mt-1 flex-shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
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
          ))}
        </div>
      </section>
    </>
  )
}
