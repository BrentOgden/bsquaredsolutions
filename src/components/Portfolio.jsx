// src/components/Portfolio.jsx
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Screenshots
import socials from '../assets/screenshots/denversocials_com_hero.png'
import geo from '../assets/screenshots/sustainablegeospatial_com.png'
import adenver from '../assets/screenshots/www_a_denverroofing_com_residential_roofing_lp_.png'
import ranger from '../assets/screenshots/rangergoldenstud_com.png'
import psp from '../assets/screenshots/www_pspcompass_com.png'
import milehigh from '../assets/screenshots/www_milehighmashup_com.png'
import fantasy from '../assets/screenshots/fantasycentral_co_home.png'
import jb from '../assets/screenshots/www_jbsimplyclean_com.png'
import hero from '../assets/portfolioHero.jpg'
import SiteHero from './SiteHero'

/* ✅ SEO (added; no style changes) */
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

/* ── Data ────────────────────────────────────────────────────────────── */
const projects = [
  { id: 1, title: 'Denver Socials', description: 'A community-first networking hub that curates and promotes local social gatherings to support Denver nonprofits and impact organizations. The homepage showcases upcoming mixers, volunteer events, and fundraisers—each with RSVP links and event highlights—making it easy for professionals and changemakers to connect, give back, and stay plugged into the city’s social good scene.', imageUrl: socials, url: 'https://denversocials.com' },
  { id: 2, title: 'Sustainable Geospatial', description: 'A Denver-based GIS consulting firm delivering end-to-end geospatial solutions for environmental and planning projects. The site highlights services like remote sensing & spectral analysis, LiDAR & photogrammetric 3D modeling, custom web mapping, and cartographic design—all underpinned by a commitment to sustainability, people, planet, and profit. Clients can explore case-study galleries, download spec sheets, and schedule consultations directly through the streamlined contact form.', imageUrl: geo, url: 'https://sustainablegeospatial.com' },
  { id: 3, title: 'A-Denver Roofing', description: 'A lead-focused landing page for a full-service roofing contractor in Denver, optimized for conversions with sticky CTAs, testimonial sliders, and clear breakdowns of residential & commercial roofing, gutter, siding, and exterior painting services. Built on WordPress with SEO-friendly schema markup, fast load speeds, and mobile-first design, it drives free estimates via an above-the-fold contact form and highlights their Weather Stopper Guarantee and A+ BBB rating.', imageUrl: adenver, url: 'https://www.a-denverroofing.com/residential-roofing-lp/' },
  { id: 4, title: 'Ranger Golden Stud', description: 'An AKC-registered Golden Retriever stud service site, showcasing “Ranger of the Rocky Mountains”—a health-tested, OFA-certified male with champion bloodlines. The simple brochure layout features a photo gallery, pedigree and health information, service details (including pricing and booking), and contact info for breeders seeking top-quality litters.', imageUrl: ranger, url: 'https://rangergoldenstud.com' },
  { id: 5, title: 'PSP Compass Solutions', description: 'A Denver digital marketing agency that guides businesses through every step of the online landscape. The homepage (“Find True North”) presents their People+Service=Profit philosophy, and outlines core offerings—Google Ads, email campaigns, social media management, website design, and local SEO—alongside a free online presence scan tool. Each service section includes quick consultation CTAs, client success stories, and a clear process flow from research to support.', imageUrl: psp, url: 'https://www.pspcompass.com' },
  { id: 6, title: 'Mile High Mashup', description: 'A custom-built, mobile-first sports hub for Denver fans, Mile High Mashup delivers non-stop coverage of the Broncos, Nuggets, Avalanche and Mammoth. The site opens with a bold hero and calls-to-action, then breaks content into clear, tabbed sections—News, Videos, Classic Moments and “Did You Know?” team-fact cards—each powered by high-res logos and imagery. An interactive scoreboard preview surfaces recent game results, while deep-dive team stat panels showcase division titles, playoff runs and championship histories. All wrapped in a vibrant, responsive layout that keeps Mile High City supporters connected to every headline, highlight and historic moments.', imageUrl: milehigh, url: 'https://milehighmashup.com' },
  { id: 7, title: 'Fantasy Central', description: 'A custom-built React/Tailwind web app that serves as the central hub for two fantasy-football leagues, featuring real-time standings, league awards and statistics, and a live countdown to draft day. Integrated with MyFantasyLeague and CBS Sports for up-to-the-minute stats, it offers managers an intuitive dashboard of team records, weekly awards, and dynasty-league insights—all wrapped in a modern, responsive design optimized for both desktop and mobile.', imageUrl: fantasy, url: 'https://fantasycentral.co' },
  { id: 8, title: 'J & B Simplyclean', description: 'J & B Simply Clean’s site is a polished, mobile-first build for a family-owned cleaning business in Berthoud, CO, showcasing their core offerings—carpet cleaning, air-duct cleaning, water extraction and more—in a clear, service-focused layout. A prominent “Request a Quote” form and click-to-call button drive lead capture, while dedicated pages dive into each service with SEO-optimized copy, pricing transparency (“soft quotes” followed by firm bids), and trust signals like competitive pricing, timely arrival windows, and honest estimates. The site also includes a secure client login portal, an about section that reinforces their family-run ethos, and a footer with full contact details and site navigation—all wrapped in a responsive, user-friendly design that performs seamlessly on desktop and mobile.', imageUrl: jb, url: 'https://jbsimplyclean.com' },
]

/* ── Component ───────────────────────────────────────────────────────── */
export default function Portfolio() {
  /* Build JSON-LD from the projects (head-only, no visual changes) */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bsquaredsolutions.io/" },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://bsquaredsolutions.io/portfolio" }
    ]
  }
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio",
    "url": "https://bsquaredsolutions.io/portfolio",
    "hasPart": projects.map(p => ({
      "@type": "CreativeWork",
      "name": p.title,
      "url": p.url,
      "description": p.description
    }))
  }

  return (
    <>
      {/* ✅ SEO */}
      <SEO
        title="Recent Projects & Case Studies | B Squared Solutions"
        description="Browse real client results—faster load times, higher conversions, and clean, maintainable code."
        path="/portfolio"
        image="https://bsquaredsolutions.io/og-default.svg"
        schema={[breadcrumbSchema, collectionSchema]}
      />

      <SiteHero
        id="portfolio-hero"
        imageSrc={hero}
        kicker="Our Recent Projects"
        title=" Custom Websites & Web Apps Built for Performance"
        subtitle="Explore real projects for businesses — React & Tailwind builds, fast load times,
              clean CMS editing, and SEO baked in."
      />


      {/* GRID */}
      <section id="work" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl bg-white shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* IMAGE */}
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-auto w-full object-cover object-top transition-transform duration-1000 ease-in-out"
                    whileHover={{ y: '-30%' }}
                  />
                </div>

                {/* TEXT */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-primary">{project.title}</h3>
                  <p className="mb-4 text-gray-700">{project.description}</p>
                  <span className="inline-block rounded bg-primary px-4 py-2 font-medium text-white">
                    View Live →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
