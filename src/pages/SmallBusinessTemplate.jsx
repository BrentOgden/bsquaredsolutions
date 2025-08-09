import React, { useEffect, useState, useCallback } from 'react'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { GiStrong } from "react-icons/gi";
import { FaPaintbrush } from "react-icons/fa6";
import { PiGearSixFill } from "react-icons/pi";
import { GiShoppingCart } from 'react-icons/gi'

// Replace with your actual assets
import hero from '../assets/smb-2.png'
import img1 from '../assets/smb-1.png'
import img2 from '../assets/smb-2.png'
import img3 from '../assets/smb-3.png'
import img4 from '../assets/smb-4.png'
import img5 from '../assets/smb-5.png'
import img6 from '../assets/smb-6.png'

const ACCENT = '#0185e4' // brand accent
const PRIMARY = '#3d86ca' // brand accent

// Your product(s)
const tpl = [{ name: 'Small Business Starter', price: '$99' }]

const features = [
  {
    name: 'Robust. Perfect for Small Business Owners.',
    description:
      "This template is perfect for small business owners that need robust functionality, modern and sleek design, and additional customizable components. We get you set up with everything you need - and more.",
    icon: GiStrong,
  },
  {
    name: 'Modern and Sleek Design.',
    description:
      'Our small business starter template incorporates a modern and sleek design geared towards high-tech businesses and startups. Built entirely using TailwindCSS on the React framework, this template gives you bang for the buck right out of the gate. We still make it easy for you to tweak, add and customize to your heart\'s content.',
    icon: FaPaintbrush,
  },
  {
    name: 'Several Customizable Components.',
    description:
      'Not only does this template contain the largest selection of components we offer in any of our templates, but we also built them for easy implementation and use on any page of your site. Wanna throw the Subscribe block on a different page? Piece of cake. Wanna display some more animated stats about your business on, say the home page? Simple. ',
    icon: PiGearSixFill,
  },
]

// Shot: arbitrary object-position via `position`, object-fit via `fit`
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

// Modal/lightbox
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
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 ring-1 ring-white/10 hover:bg-white/10 focus:outline-none focus-visible:ring-2"
        style={{ '--tw-ring-color': accent }}
      >
        <XMarkIcon className="size-6 text-white" />
      </button>

      <div className="relative mx-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-[min(100vw-2rem,1200px)] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
          draggable="false"
        />
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

// Hero (takes buyHref to render the Buy Now CTA)
function Hero({
  title = 'Small Business Starter Template',
  subtitle = 'This is our most robust and feature-rich template. We have painstakingly crafted it so that no element is overlooked. With a large variety of easy-to-configure components, the only limits here are that of your imagination.',
  bgImage = hero,
  heroPosition = 'center',
  buyHref,
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: heroPosition }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(90rem 50rem at 80% -10%, rgba(61,134,202,0.25), transparent 60%)' }}
      />
      <div className="relative mx-auto max-w-7xl py-24 sm:py-30 lg:px-8">
        <div className="pt-10 px-6 max-w-3xl">
          <h1 className="mt-6 text-4xl text-shadow-lg/50 font-semibold tracking-tight text-white sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg/8 text-shadow-lg/50 text-white">{subtitle}</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-6 gap-4">
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

          <div className="sm:col-span-6 mt-12 items-center">
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
    </section>
  )
}

export default function Example({
  screenshots = [
    { src: img1, alt: 'Screenshot A', position: 'top',       fit: 'cover' },
    { src: img2, alt: 'Screenshot B', position: '40% 30%',   fit: 'cover' },
    { src: img3, alt: 'Screenshot C', position: 'top',       fit: 'cover' },
    { src: img4, alt: 'Screenshot D', position: '40% 25%',   fit: 'cover' },
    { src: img5, alt: 'Screenshot E', position: 'center',    fit: 'cover' },
    { src: img6, alt: 'Screenshot F', position: '60% 50%',   fit: 'cover' },
  ],
  heroPosition = '40% 45%',
}) {
  // ✅ use all 6 screenshots
  const shots = screenshots
  const [modalIndex, setModalIndex] = useState(null) // null = closed

  // Build Buy Now href from tpl[0]
  const plan = tpl[0]
  const amount = String(plan.price).replace(/[^0-9.]/g, '') // "69"
  const buyHref = `/checkoutvenmo?plan=${encodeURIComponent(plan.name)}&amount=${encodeURIComponent(amount)}`

  return (
    <>
      {/* HERO with Buy Now */}
      <Hero heroPosition={heroPosition} bgImage={hero} buyHref={buyHref} />

      {/* FEATURES + 6-shot staggered grid */}
      <div id="features" className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Left: copy */}
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-2xl font-semibold" style={{ color: ACCENT }}>
                  For small businesses and entreprenuers
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  A full-featured and robust template that provides all the tools for a small business to stand out
                </p>
                <p className="mt-6 text-lg/8 text-gray-700">
                  This template provides everything your business needs to get a beautiful site up and running with ease. With multiple pages geared towards running a business, and easy-to-modify components to make the site your own, you have everything you need to get your brand seen.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5" style={{ color: ACCENT }} />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right: 6-image staggered grid (zoom + modal) */}
            <div id="screenshots" className="md:-ml-4 lg:-ml-0">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Column 1: 0,2,4 */}
                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                  {[0, 2, 4].map((i) =>
                    shots[i] ? (
                      <Shot
                        key={i}
                        src={shots[i].src}
                        alt={shots[i].alt}
                        position={shots[i].position}
                        fit={shots[i].fit}
                        onOpen={() => setModalIndex(i)}
                      />
                    ) : null
                  )}
                </div>
                {/* Column 2 (staggered down): 1,3,5 */}
                <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:gap-6 lg:gap-8">
                  {[1, 3, 5].map((i) =>
                    shots[i] ? (
                      <Shot
                        key={i}
                        src={shots[i].src}
                        alt={shots[i].alt}
                        position={shots[i].position}
                        fit={shots[i].fit}
                        onOpen={() => setModalIndex(i)}
                      />
                    ) : null
                  )}
                </div>
              </div>
            </div>
            {/* /Right */}
          </div>
        </div>
      </div>

      {/* Modal over all 6 */}
      <ImageModal images={shots} index={modalIndex} setIndex={setModalIndex} onClose={() => setModalIndex(null)} accent={ACCENT} />
    </>
  )
}
