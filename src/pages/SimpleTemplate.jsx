import React, { useEffect, useState, useCallback } from 'react'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { FaThumbsUp } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";


import { GiShoppingCart } from 'react-icons/gi'

// Replace with your actual assets
import hero from '../assets/multi-template.png'
import img1 from '../assets/multi-1.png'
import img2 from '../assets/multi-2.png'
import img3 from '../assets/multi-3.png'
import img4 from '../assets/multi-4.png'

const ACCENT = '#0185e4'; // brand accent
const PRIMARY = '#3d86ca'; // brand accent

// Your product(s)
const tpl = [
  { name: 'Simple Multipage', price: '$69' }
]

const features = [
  {
    name: 'Simple. Easy to Customize.',
    description:
      "This template includes all of the standard sections to get your site up and running. If you don't like the color scheme, we have made it easy to modify to fit your brand's vibe.",
    icon: FaThumbsUp,
  },
  {
    name: 'Blog and Image Grid Included.',
    description: 'Unlike the basic template, this one provides a fully-wired blog component. Simply add blog content via markdown and enjoy blog functionality. There are also multiple image grid components to tweak to your needs.',
    icon: FaBookOpen,
  },
  {
    name: 'Contact Options are Front and Center.',
    description: 'Each page of this template includes a contact box that can be customized to your needs, and simply needs to be connected to your favorite form submission platform.',
    icon: IoIosContact,
  },
]

// ───────────────────────────────────────────────────────────────────────────────
// Shot: arbitrary object-position via `position`, object-fit via `fit`
// position examples: 'center', 'top', '50% 35%', '40% 60%', 'left 30%', etc.
// fit: 'cover' (default) or 'contain'
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
// Simple modal/lightbox (Esc to close, click backdrop to close, arrows to nav)
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
// Hero (takes buyHref to render the Buy Now CTA)
// ───────────────────────────────────────────────────────────────────────────────
function Hero({
  title = 'Simple Multi-Page Template',
  subtitle = 'Slightly more robust version of the basic template with multi-page functionality and ready-to-use UI components. Brand colors can be set in one place.',
  bgImage = hero,
  heroPosition = 'center', // e.g., '50% 35%'
  buyHref,                 // injected from parent
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
            <div className='sm:col-span-6 col-span-12 mt-12 items-center'>
            <a
              href="#screenshots"
              className="sm:col-span-4 col-span-6 w-full rounded-lg px-5 py-3 mr-2 text-center text-white font-medium shadow ring-1 ring-black/5"
              style={{ backgroundColor: ACCENT }}
            >
              View Screenshots
            </a>

            <a
              href="#features"
              className="sm:col-span-4 col-span-6 w-full rounded-lg px-5 py-3 text-center font-medium text-white/90 ring-1"
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
// Main export — staggered 4-image grid with arbitrary per-image positions
// ───────────────────────────────────────────────────────────────────────────────
export default function Example({
  screenshots = [
    { src: img1, alt: 'Screenshot A', position: 'top', fit: 'cover' },
    { src: img2, alt: 'Screenshot B', position: '40% 30%', fit: 'cover' },
    { src: img3, alt: 'Screenshot C', position: 'top', fit: 'cover' },
    { src: img4, alt: 'Screenshot D', position: '40% 25%', fit: 'cover' },
  ],
  heroPosition = '40% 35%',
}) {
  const shots = screenshots.slice(0, 4)
  const [modalIndex, setModalIndex] = useState(null) // null = closed

  // Build Buy Now href from tpl[0]
  const plan = tpl[0]
  const amount = String(plan.price).replace(/[^0-9.]/g, '') // "69"
  const buyHref = `/checkoutvenmo?plan=${encodeURIComponent(plan.name)}&amount=${encodeURIComponent(amount)}`

  return (
    <>
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
                  For the more savvy user
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  A simple way to get up and running with all the most important functionality - but with those little extras that help set you apart
                </p>
                <p className="mt-6 text-lg/8 text-gray-700">
                  This template provides all of the basics of the beginner template, with added functionality to publish blog posts, add customized image grids, and can include an optional chatbot (must set up a ReAmaze account to use this feature).
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
    </>
  )
}
