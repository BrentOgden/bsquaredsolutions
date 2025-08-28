// src/components/Products.jsx
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { HiPaintBrush } from "react-icons/hi2";
import { IoAnalyticsOutline, IoHeadsetOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import hero from "../assets/packageHero.jpg";
import Slider from "../components/Slider";
import SiteHero from "../components/SiteHero";
import chat from "../assets/IMG_1036.png";
import web from "../assets/smb-2.png";
import seoimg from "../assets/IMG_1037.png";
import design from "../assets/IMG_1033.png";
import SEO from "../components/SEO";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.52, 1, 0.66, 1] },
  },
};

export default function Products() {
  // --- JSON-LD (same style as other pages) ---
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bsquaredsolutions.io/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bsquaredsolutions.io/products" }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Web Development & Technical Consulting Services",
    "url": "https://bsquaredsolutions.io/products",
    "description": "Custom React/Tailwind builds, UX design, SEO & analytics, and ongoing support—fast, scalable, and easy to manage."
  };

  const servicesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "B Squared Solutions Services",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Web Development",
        "description": "Custom React & Tailwind builds, CMS integration (WordPress, Shopify, headless), performance and accessibility focused.",
        "areaServed": "US",
        "url": "https://bsquaredsolutions.io/services#web-development",
        "provider": { "@type": "Organization", "name": "B Squared Solutions" }
      },
      {
        "@type": "Service",
        "name": "Design & Consulting",
        "description": "UX/UI design, audits, architecture, wireframes, and implementation roadmaps to de-risk delivery.",
        "areaServed": "US",
        "url": "https://bsquaredsolutions.io/services#design-consulting",
        "provider": { "@type": "Organization", "name": "B Squared Solutions" }
      },
      {
        "@type": "Service",
        "name": "SEO & Marketing",
        "description": "Keyword research, on-page SEO, structured data, analytics configuration, and content optimization.",
        "areaServed": "US",
        "url": "https://bsquaredsolutions.io/services#seo-marketing",
        "provider": { "@type": "Organization", "name": "B Squared Solutions" }
      },
      {
        "@type": "Service",
        "name": "Ongoing Comprehensive Support",
        "description": "Updates, backups, uptime monitoring, bug fixes, and continuous improvements.",
        "areaServed": "US",
        "url": "https://bsquaredsolutions.io/services#ongoing-support",
        "provider": { "@type": "Organization", "name": "B Squared Solutions" }
      }
    ]
  };

  return (
    <>
      {/* ✅ SEO (head-only) */}
      <SEO
        title="Web Development & Technical Consulting Services | B Squared Solutions"
        description="Custom React/Tailwind builds, UX design, SEO & analytics, and ongoing support—fast, scalable, and easy to manage."
        path="/products"
        image="https://bsquaredsolutions.io/og-default.svg"
        schema={[breadcrumbSchema, webPageSchema, servicesItemListSchema]}
      />

      {/* HERO */}
      <SiteHero
        id="services-hero"
        imageSrc={hero}
        kicker="Our Services"
        title="Web Development & Technical Consulting That Drives Results."
        subtitle="Custom React/Tailwind builds, UX design, SEO & analytics, and ongoing support—fast, scalable, and easy to manage."
      />

      {/* CONTENT — blue gradient + glossy cards */}
      <section
        className="relative"
        style={{ background: "linear-gradient(120deg, #0B3E73 0%, #145DA0 50%, #3D86CA 100%)" }}
      >
        <div className="bg-gray-50 py-12 sm:py-12">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="mx-auto mt-2 max-w-2xl text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
              Build Faster. <span className="text-primary">Rank Higher.</span> Convert More.
            </h2>

            {/* Staggered reveal container */}
            <motion.div
              className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.17, margin: "0px 0px -10% 0px" }}
            >
              {/* Web Development */}
              <motion.div id="web-development" className="relative lg:row-span-2" variants={item}>
                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-xl font-bold tracking-tight text-accent max-lg:text-center">
                      Web Development
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Launch a custom site that looks great, loads instantly, and scales with your business. We build modern front-ends in React and Tailwind CSS, can integrate the CMS you prefer, and ship production-ready code tuned for performance, accessibility, and SEO.
                    </p>
                  </div>
                  <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                    <div className="absolute inset-x-3 top-10 bottom-20 overflow-hidden rounded-[12cqw] border-x-[3cqw] border-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                      <img alt="Website UI preview" src={web} className="object-contain object-top" />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg outline outline-black/5 lg:rounded-l-4xl" />
              </motion.div>

              {/* Design & Consulting */}
              <motion.div id="design-consulting" className="relative max-lg:row-start-1" variants={item}>
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-xl font-bold tracking-tight text-accent max-lg:text-center">
                      Design & Consulting
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Whether you’re redesigning or planning a new build, get expert guidance on structure, usability, and tech choices. We turn goals into a clear architecture, wireframes, and an implementation plan that saves time and avoids rework.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                    <img alt="Wireframe example" src={design} className="object-center object-contain mx-auto my-4" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg outline outline-black/5 max-lg:rounded-t-4xl" />
              </motion.div>

              {/* SEO & Marketing */}
              <motion.div id="seo-marketing" className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2" variants={item}>
                <div className="absolute inset-px rounded-lg bg-white" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-xl font-bold tracking-tight text-accent max-lg:text-center">SEO & Marketing</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Rank for the terms your customers actually search. We configure analytics, research keywords, optimize content and structure, and add structured data so search engines understand—and reward—your pages.
                    </p>
                  </div>
                  <div className="items-center max-lg:py-6 lg:pb-2">
                    <img alt="SEO analytics mockup" src={seoimg} className="object-center object-contain mx-auto my-4" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg outline outline-black/5" />
              </motion.div>

              {/* Ongoing Support */}
              <motion.div id="ongoing-support" className="relative lg:row-span-2" variants={item}>
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-xl font-bold tracking-tight text-accent max-lg:text-center">
                      Ongoing Comprehensive Support
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Keep your site secure, fast, and up-to-date. We handle plugin/theme updates, backups, uptime monitoring, bug fixes, and content updates & site enhancements—so you can focus on the business.
                    </p>
                  </div>
                  <div className="relative min-h-150 w-full grow">
                    <div className="absolute top-10 right-10 bottom-30 left-10 rounded-tl-xl">
                      <div className="flex outline outline-white/5">
                        <img alt="Chat support mockup" src={chat} className="object-contain object-center mt-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-lg outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Slider />
      </section>
    </>
  );
}
