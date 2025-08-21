// src/components/Services.jsx
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { IoShieldCheckmarkOutline, IoAnalyticsOutline, IoHeadsetOutline } from "react-icons/io5";
import { HiPaintBrush } from "react-icons/hi2";
import SEO from "../components/SEO"; // ✅ add

const items = [
  {
    title: "Web Development",
    desc: "Launch blazing-fast, responsive sites with bespoke React & TailwindCSS builds, seamless CMS integration, and expert UI design support.",
    icon: CgWebsite,
  },
  {
    title: "Design & Consulting",
    desc: "Get a rock-solid architecture audit, performance tuning, and a clear, actionable roadmap to take your project from concept to scale.",
    icon: HiPaintBrush,
  },
  {
    title: "SEO & Marketing",
    desc: "Drive more traffic and conversions with on-page SEO optimization, full analytics setup, and a data-driven content strategy tailored to your audience.",
    icon: IoAnalyticsOutline,
  },
  {
    title: "Ongoing Support",
    desc: "Keep your site running smoothly with proactive maintenance, monitoring, and rapid feature roll-outs as your needs evolve.",
    icon: IoHeadsetOutline,
  },
];

export default function Services() {
  return (
    <>
      {/* ✅ Head-only SEO injection; no visual changes */}
      <SEO
        /* omit title/canonical to avoid overriding the home page <head> */
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "B Squared Solutions Services",
            "itemListElement": [
              {
                "@type": "Service",
                "name": "Web Development",
                "description":
                  "Blazing-fast responsive sites with React & TailwindCSS, CMS integration, and expert UI design.",
                "areaServed": "US",
                "provider": { "@type": "Organization", "name": "B Squared Solutions" }
              },
              {
                "@type": "Service",
                "name": "Design & Consulting",
                "description":
                  "Architecture audits, performance tuning, and roadmaps from concept to scale.",
                "areaServed": "US",
                "provider": { "@type": "Organization", "name": "B Squared Solutions" }
              },
              {
                "@type": "Service",
                "name": "SEO & Marketing",
                "description":
                  "On-page SEO, analytics setup, and data-driven content strategy to grow traffic and conversions.",
                "areaServed": "US",
                "provider": { "@type": "Organization", "name": "B Squared Solutions" }
              },
              {
                "@type": "Service",
                "name": "Ongoing Support",
                "description":
                  "Proactive maintenance, monitoring, and rapid feature roll-outs.",
                "areaServed": "US",
                "provider": { "@type": "Organization", "name": "B Squared Solutions" }
              }
            ]
          }
        ]}
      />

      <section id="services" className="container relative scroll-mt-20 mx-auto px-6 py-10 md:py-30">
        <h2 className="text-3xl font-bold text-center mb-12"> Comprehensive Web Development & Technical Consulting Services
</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="p-6 bg-white rounded-xl shadow-lg shadow-[#0185e4]/50 border border-[#0185e4]/40 hover:shadow-lg transition flex flex-col items-center text-center"
            >
              {/* render the icon component */}
              <Icon className="mb-4 text-3xl text-accent" />

              <h3 className="text-xl text-primary font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
