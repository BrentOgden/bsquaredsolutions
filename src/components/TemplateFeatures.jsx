// ProductScreensSection.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import img1 from '../assets/multi-1.png';
import img2 from '../assets/multi-2.png';
import img3 from '../assets/multi-3.png';
import img4 from '../assets/multi-4.png';
/* -------------------------------------------
   Feature bullets (left column) — customize
-------------------------------------------- */
const features = [
  {
    name: "Push to deploy.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: LockClosedIcon,
  },
  {
    name: "Database backups.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ServerIcon,
  },
];

/* -------------------------------------------
   Helper: clamp index in [0..n)
-------------------------------------------- */
const wrapIndex = (i, n) => (n ? (i + n) % n : 0);

/* -------------------------------------------
   Laptop Device Frame
-------------------------------------------- */
function LaptopFrame({ children, accentHex }) {
  return (
    <div
      className="relative w-full"
      style={{ ["--accent"]: accentHex }}
    >
      {/* Laptop body */}
      <div className="relative rounded-[18px] border border-white/10 bg-neutral-950 shadow-2xl overflow-hidden ring-1 ring-white/10">
        {/* Browser chrome bar */}
        <div className="flex items-center gap-1.5 h-8 px-3 border-b border-white/10 bg-neutral-900/60 backdrop-blur">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          <div className="ml-3 h-3 w-28 rounded bg-white/10" />
        </div>

        {/* Screen */}
        <div className="aspect-[16/10] bg-black">{children}</div>
      </div>

      {/* Laptop base */}
      <div className="mx-auto mt-1 h-2 w-[92%] rounded-b-[16px] bg-gradient-to-b from-white/10 to-transparent" />
      <div className="mx-auto h-1 w-1/3 rounded-full bg-white/10" />
    </div>
  );
}

/* -------------------------------------------
   Phone Device Frame
-------------------------------------------- */
function PhoneFrame({ children }) {
  return (
    <div className="relative rounded-[26px] border border-white/10 bg-neutral-950 shadow-xl overflow-hidden ring-1 ring-white/10">
      {/* Top sensor/notch hint */}
      <div className="absolute left-1/2 top-1 -translate-x-1/2 h-4 w-24 rounded-b-2xl bg-black/60 z-10" />
      <div className="aspect-[9/19] bg-black">{children}</div>
      {/* Bottom bar hint */}
      <div className="absolute left-1/2 bottom-1 -translate-x-1/2 h-1.5 w-16 rounded bg-white/10" />
    </div>
  );
}

/* -------------------------------------------
   Screenshot Carousel (with thumbnails)
-------------------------------------------- */
function ScreenshotCarousel({
  images = [],
  index,
  setIndex,
  autoPlayMs = 0,
  accentHex = "#f43f5e",
}) {
  const timerRef = useRef(null);

  const next = () => setIndex((i) => wrapIndex(i + 1, images.length));
  const prev = () => setIndex((i) => wrapIndex(i - 1, images.length));
  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resume = () => {
    if (autoPlayMs && images.length > 1) {
      timerRef.current = setInterval(next, autoPlayMs);
    }
  };

  useEffect(() => {
    resume();
    return pause;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayMs, images.length]);

  if (!images.length) return null;

  return (
    <div className="relative" onMouseEnter={pause} onMouseLeave={resume}>
      <div className="relative h-full w-full">
        {images.map((img, i) => (
          <img
            key={img.src + i}
            src={img.src}
            alt={img.alt || `Screenshot ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
        ))}

        {/* Prev/Next controls */}
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous screenshot"
              onClick={prev}
              className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/15 bg-white/5 backdrop-blur px-2.5 py-2 hover:bg-white/10"
            >
              <ChevronLeftIcon className="size-5 text-white" />
            </button>
            <button
              aria-label="Next screenshot"
              onClick={next}
              className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/15 bg-white/5 backdrop-blur px-2.5 py-2 hover:bg-white/10"
            >
              <ChevronRightIcon className="size-5 text-white" />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-4 rounded-full transition-all"
                style={{ background: i === index ? accentHex : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto rounded-xl p-2 ring-1 ring-white/10 bg-neutral-950/60">
          {images.map((img, i) => (
            <button
              key={img.src + "thumb" + i}
              onClick={() => setIndex(i)}
              className={`relative flex-none overflow-hidden rounded-lg ring-2 transition ${
                i === index ? "ring-[color:var(--accent)]" : "ring-white/10 hover:ring-white/20"
              }`}
              style={{
                width: 120,
                height: 72,
                ["--accent"]: accentHex,
              }}
              aria-label={`Show screenshot ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt || `Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                draggable="false"
              />
              <span className="sr-only">{img.alt || `Screenshot ${i + 1}`}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------
   Main Section (dark, B-Squared vibe)
   Props:
     - screenshots: desktop images [{src, alt}]
     - mobileShots: mobile images [{src, alt}] (optional)
     - autoPlayMs: number (ms)
     - accentHex: brand accent color (e.g., "#ef4444")
-------------------------------------------- */
export default function ProductScreensSection({
  screenshots = [
    {
      src: img1,
      alt: "Dashboard overview",
    },
    {
      src: img2,
      alt: "Inbox messages",
    },
    {
      src: img3,
      alt: "Account settings",
    },
    {
      src: img4,
      alt: "Account settings",
    },
  ],
  mobileShots, // optional; if omitted, phone mirrors current desktop slide
  autoPlayMs = 0,
  // Default accent: rich red in the B-Squared family. Swap to your exact hex if needed.
  accentHex = "#ef4444", // Tailwind red-500
}) {
  const [index, setIndex] = useState(0);
  const currentMobile =
    mobileShots?.[wrapIndex(index, mobileShots.length || 0)] ||
    screenshots[wrapIndex(index, screenshots.length)];

  return (
    <section
      className="relative overflow-hidden bg-neutral-950 py-24 sm:py-32"
      style={{ ["--accent"]: accentHex }}
    >
      {/* Soft radial glow like B-Squared sections */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_60rem_at_120%_-10%,rgba(239,68,68,0.15),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Left column: copy + features */}
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2
                className="text-base/7 font-semibold"
                style={{ color: accentHex }}
              >
                Deploy faster
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                A better workflow
              </p>
              <p className="mt-6 text-lg/8 text-white/70">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
                impedit perferendis suscipit eaque, iste dolor cupiditate
                blanditiis ratione.
              </p>

              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-white/80 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5"
                        style={{ color: accentHex }}
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right column: devices */}
          <div className="relative">
            {/* Laptop with carousel */}
            <LaptopFrame accentHex={accentHex}>
              <ScreenshotCarousel
                images={screenshots}
                index={index}
                setIndex={setIndex}
                autoPlayMs={autoPlayMs}
                accentHex={accentHex}
              />
            </LaptopFrame>

            {/* Phone overlay (optional) */}
            <div className="hidden md:block">
              <div className="pointer-events-none absolute -right-6 bottom-0 translate-y-6 md:-right-10 lg:-right-6 xl:right-0">
                <div className="pointer-events-auto w-40 lg:w-48 xl:w-56 rotate-3">
                  <PhoneFrame>
                    <img
                      src={currentMobile?.src}
                      alt={currentMobile?.alt || "Mobile screenshot"}
                      className="h-full w-full object-cover"
                      draggable="false"
                    />
                  </PhoneFrame>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom border accent */}
        <div
          className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
