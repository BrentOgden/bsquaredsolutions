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
  return (
    <>
      {/* HERO (no CTAs, no right image) */}
      <section className="relative isolate overflow-hidden mt-10 bg-gray-900">
        {/* Background photo (parallax) */}
        <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
          <img
            alt="Portfolio backdrop"
            src= {hero}
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
            style={{ clipPath: 'polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)' }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3d86ca] to-[#0185e4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </Parallax>

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center lg:max-w-4xl lg:text-left"
          >
            <div className="hidden sm:flex sm:justify-center lg:justify-start">
              <span className="relative inline-flex items-center rounded-full mb-2 px-3 py-1 text-lg text-white ring-2 ring-white/90">
                Our Recent Projects
              </span>
            </div>

            {/* <h2 className="mt-6 text-xl font-semibold text-primary">Our Recent Work</h2> */}
            <h1 className="mt-2 text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">
              Custom Websites & Web Apps Built for Performance
            </h1>
            <p className="mt-6 text-lg/8 text-white text-shadow-lg/50 sm:text-xl/8">
              Explore real projects for businesses — React & Tailwind builds, fast load times,
              clean CMS editing, and SEO baked in.
            </p>
          </motion.div>
        </div>
      </section>

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
