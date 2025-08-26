// src/components/Templates.jsx
import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import TemplateSelector from './TemplateSelector'
import { templatesData } from '../data/templatesData'
import hero from '../assets/templateHero.png'
import SiteHero from './SiteHero'

/* ✅ SEO (added; head-only, no style changes) */
import SEO from './SEO'

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

export default function TemplatesPage() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  /* JSON-LD (no visual impact) */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bsquaredsolutions.io/" },
      { "@type": "ListItem", "position": 2, "name": "Templates", "item": "https://bsquaredsolutions.io/templates" }
    ]
  }
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Template Library",
    "url": "https://bsquaredsolutions.io/templates",
    "hasPart": templatesData.map((t) => ({
      "@type": "CreativeWork",
      "name": t.title || t.name || `Template ${t.id}`,
      "url": `https://bsquaredsolutions.io/templates#${t.id}`
    }))
  }

  return (
    <div>
      {/* ✅ SEO */}
      <SEO
        title="React Website Templates | B Squared Solutions"
        description="Ready-made React + Tailwind templates with clean structure, SEO basics, and quick setup so you can launch fast."
        path="/templates"
        image="https://bsquaredsolutions.io/og-default.svg"
        schema={[breadcrumbSchema, collectionSchema]}
      />

      {/* HERO (matches other sections) */}
      <section id="templates-hero" className="relative mt-10 isolate overflow-hidden bg-gray-900">
        <SiteHero
          id="templates-hero"
          imageSrc={hero}
          kicker="Template Library"
          title="Ready-Made React Templates"
          subtitle="Download a clean, SEO-friendly React + Tailwind starter. Clear comments, simple setup, and production-ready structure to launch fast."
          subtitle2=<>Every template includes TailwindCSS, helpful code comments, and easy installation instructions. The templates below are standalone templates built in React, however they can be used as the basis for a CMS-hosted site with a little bit of effort. We'd be happy to build a <a href="/packages#build">CMS site</a> based on one or these if you would like.</>
              
              />


    </section>

      {/* The grid itself */ }
  <TemplateSelector templates={templatesData} />
    </div >
  )
}
