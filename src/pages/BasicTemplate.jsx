import React, { useEffect, useState, useCallback } from 'react'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { FaThumbsUp } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoTicket } from "react-icons/io5";
import { GiShoppingCart } from 'react-icons/gi'

// ✅ SEO (head-only; no visual changes)
import SEO from '../components/SEO'

// Replace with your actual assets
import hero from '../assets/Basic-Template-min.png'
import img1 from '../assets/basic-1.png'
import img2 from '../assets/basic-2.png'
import img3 from '../assets/basic-3.png'
import img4 from '../assets/basic-4.png'

const ACCENT = '#0185e4'; // brand accent
const PRIMARY = '#3d86ca'; // brand accent

// Your product(s)
const tpl = [
  { name: 'Basic Single Page', price: '$49' }
]

const features = [
  {
    name: 'Simple - Out of the Box. Easy to Customize.',
    description:
      "This template includes all of the basic sections of a simple one page site to get you off and running. To make it easy for anyone, the site colors can be changed in one location and will propogate throughout the site. Our photo grid is built so that all you have to do is drop photos in a folder and it takes care of the rest. And we even built in an effect to have replacement images fade in randomly, so the grid is always fresh. ",
    icon: FaThumbsUp,
  },
  {
    name: 'Multi-purpose Events Component .',
    description: 'The template comes with a ready to use events grid to showcase upcoming events and provide links to more information/buy tickets. It is built to make it easy to repurpose this grid for any purpose - if events are not your need, feel free to use it to showcase products or services.',
    icon: IoTicket,
  },
  {
    name: 'Multiple CTA Options and Minimalist Subscription Function.',
    description: 'This template comes standard with two CTA buttons in the hero section, and several CTA buttons in the subscription section, but if you would like even more visibility we can include two CTA buttons in the navigation for a more modern and efficient feel. The subscription form is built to allow subscriptions to an email list or newsletter, but with a little work you can grow it into any level of form submission that you may need.',
    icon: IoShareSocialSharp,
  },
]

// ───────────────────────────────────────────────────────────────────────────────
// Shot: arbitrary object-position via `position`, object-fit via `fit`
// ───────────────────────────────────────────────────────────────────────────────
function Shot({ src, alt, onOpen, position = '50% 50%', fit = 'cover' }) {
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-400/10">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ '--tw-ring-color': ACCENT }}
        aria-label={`Open ${alt || 'screenshot'}`}
      >
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src={src}
            alt={alt}
            className={`h-full w-full ${fitClass} transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-100`}
            style={{ objectPosition: position }}
            loading="lazy"
            draggable="false"
          />
        </div>
      </button>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// Simple modal/lightbox
// ───────────────────────────────────────────────────────────────────────────────
function ImageModal({ images, index, onClose, setIndex, accent = ACCENT }) {
  const total = images?.length || 0
  const canNav = total > 1

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [setIndex, total])
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [setIndex, total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (canNav && (e.key === 'ArrowLeft' || e.key === 'Left')) prev()
      if (canNav && (e.key === 'ArrowRight' || e.key === 'Right')) next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [canNav, next, onClose, prev])

  if (index == null || !images?.[index]) return null
  const { src, alt } = images[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 ring-1 ring-white/10 hover:bg-white/10 focus:outline-none focus-visible:ring-2"
        style={{ '--tw-ring-color': accent }}
      >
        <XMarkIcon className="size-6 text-white" />
      </button>

      {/* Image */}
      <div className="relative mx-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-[min(100vw-2rem,1200px)] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
          draggable="false"
        />

        {/* Nav */}
        {canNav && (
          <>
            <button
              aria-label="Previous"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 ring-1 ring-white/15 hover:bg-white/20 focus:outline-none focus-visible:ring-2"
              style={{ '--tw-ring-color': accent }}
            >
              <ChevronLeftIcon className="size-6 text-white" />
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 ring-1 ring-white/15 hover:bg-white/20 focus:outline-none focus-visible:ring-2"
              style={{ '--tw-ring-color': accent }}
            >
              <ChevronRightIcon className="size-6 text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// Hero
// ───────────────────────────────────────────────────────────────────────────────
function Hero({
  title = 'Basic Single Page Template',
  subtitle = 'Simple single page React application using TailwindCSS and is mobile responsive - perfect for event or photo sites. This is the easiest way to get your site up and out there. Includes an About, Event Grid, Photo Grid, and Subscribe section. ',
  bgImage = hero,
  heroPosition = '50% 35%', 
  buyHref,                 
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: heroPosition }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(90rem 50rem at 80% -10%, rgba(61,134,202,0.25), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="pt-10 px-6 max-w-3xl">
          <h1 className="mt-6 text-4xl text-shadow-lg/50 font-semibold tracking-tight text-white sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg/8 text-shadow-lg/50 text-white">{subtitle}</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-6 gap-4">
            {/* Top row: each spans 6/12 */}
            

            {/* Bottom row: spans 12/12 (same width as the two above together) */}
            {buyHref && (
              <a
                href={buyHref}
                className="sm:col-span-6 md:w-1/3 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-white font-semibold ring-1 ring-black/5 transition hover:brightness-110"
                style={{ backgroundColor: ACCENT }}
              >
                <GiShoppingCart className="size-5" />
                <span>Buy Now</span>
              </a>
            )}
            </div>
            <div className='md:col-span-6 mt-12 items-center'>
            <a
              href="#screenshots"
              className="sm:col-span-4 w-full rounded-lg px-5 py-3 mr-2 text-center text-white font-medium shadow ring-1 ring-black/5"
              style={{ backgroundColor: ACCENT }}
            >
              View Screenshots
            </a>

            <a
              href="#features"
              className="sm:col-span-4 w-full rounded-lg px-5 py-3 text-center font-medium text-white/90 ring-1"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              View Features
            </a>
          </div>


        </div>
      </div>
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section >
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// Main export
// ───────────────────────────────────────────────────────────────────────────────
export default function Example({
  screenshots = [
    { src: img1, alt: 'Screenshot A', position: 'top', fit: 'cover' },
    { src: img2, alt: 'Screenshot B', position: '40% 30%', fit: 'cover' },
    { src: img3, alt: 'Screenshot C', position: 'top', fit: 'cover' },
    { src: img4, alt: 'Screenshot D', position: '40% 25%', fit: 'cover' },
  ],
  heroPosition = '30% 10%',
}) {
  const shots = screenshots.slice(0, 4)
  const [modalIndex, setModalIndex] = useState(null) // null = closed

  // Build Buy Now href from tpl[0]
  const plan = tpl[0]
  const amount = String(plan.price).replace(/[^0-9.]/g, '') // "49"
  const buyHref = `/checkoutvenmo?plan=${encodeURIComponent(plan.name)}&amount=${encodeURIComponent(amount)}`

  // ✅ SEO schemas (head-only; do not affect UI)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bsquaredsolutions.io/" },
      { "@type": "ListItem", "position": 2, "name": "Basic Template", "item": "https://bsquaredsolutions.io/basictemplate" }
    ]
  }
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": plan.name,
    "description": "A simple one-page React + Tailwind template with About, Events grid, Photo grid, and Subscribe section. Mobile-responsive and easy to customize.",
    "brand": { "@type": "Brand", "name": "B Squared Solutions" },
    "image": ["https://bsquaredsolutions.io/og-default.svg"],
    "url": "https://bsquaredsolutions.io/basictemplate",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": amount,
      "availability": "https://schema.org/InStock",
      "url": "https://bsquaredsolutions.io/basictemplate"
    }
  }

  return (
    <>
      {/* ✅ SEO */}
      <SEO
        title="Basic Single Page React Template | B Squared Solutions"
        description="Ready-made one-page React + Tailwind template with events and photo grids, subscribe form, and mobile-first design—launch fast."
        path="/basictemplate"
        image="https://bsquaredsolutions.io/og-basic-template.jpg"
        type="product"
        schema={[breadcrumbSchema, productSchema]}
      />

      <section className='scroll-mt-20'>
        {/* HERO with Buy Now */}
        <Hero heroPosition={heroPosition} bgImage={hero} buyHref={buyHref} />

        {/* FEATURES + STAGGERED GRID */}
        <div id="features" className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {/* Left: copy */}
              <div className="lg:pt-4 lg:pr-8">
                <div className="lg:max-w-lg">
                  <h2 className="text-2xl font-semibold" style={{ color: ACCENT }}>
                    For the novice who needs a site up quickly
                  </h2>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                    A simple way to get up and running with the basics
                  </p>
                  <p className="mt-6 text-lg/8 text-gray-700">
                    This is a simple, single page React template that gives anyone - regardless of skill level - a simple way to get up and running. It includes an About section as well as an Events section and Subscription functionality with CTAs for all social platforms. 
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <feature.icon
                            aria-hidden="true"
                            className="absolute top-1 left-1 size-5"
                            style={{ color: ACCENT }}
                          />
                          {feature.name}
                        </dt>{' '}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Right: staggered 4-image grid (zoom + modal) */}
              <div id="screenshots" className="md:-ml-4 lg:-ml-0">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                    {shots[0] && (
                      <Shot
                        src={shots[0].src}
                        alt={shots[0].alt}
                        position={shots[0].position}
                        fit={shots[0].fit}
                        onOpen={() => setModalIndex(0)}
                      />
                    )}
                    {shots[2] && (
                      <Shot
                        src={shots[2].src}
                        alt={shots[2].alt}
                        position={shots[2].position}
                        fit={shots[2].fit}
                        onOpen={() => setModalIndex(2)}
                      />
                    )}
                  </div>

                  {/* Column 2 (staggered down) */}
                  <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:gap-6 lg:gap-8">
                    {shots[1] && (
                      <Shot
                        src={shots[1].src}
                        alt={shots[1].alt}
                        position={shots[1].position}
                        fit={shots[1].fit}
                        onOpen={() => setModalIndex(1)}
                      />
                    )}
                    {shots[3] && (
                      <Shot
                        src={shots[3].src}
                        alt={shots[3].alt}
                        position={shots[3].position}
                        fit={shots[3].fit}
                        onOpen={() => setModalIndex(3)}
                      />
                    )}
                  </div>
                </div>

                {/* subtle accent underline */}
                {/* <div
                  className="mt-8 h-0.5 w-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, rgba(61,134,202,0))` }}
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <ImageModal
          images={shots}
          index={modalIndex}
          setIndex={setModalIndex}
          onClose={() => setModalIndex(null)}
          accent={ACCENT}
        />
      </section>
    </>
  )
}
