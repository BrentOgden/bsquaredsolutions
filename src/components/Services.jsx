// src/components/Services.jsx
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { IoShieldCheckmarkOutline, IoAnalyticsOutline, IoHeadsetOutline } from "react-icons/io5";
import { HiPaintBrush } from "react-icons/hi2";

const items = [
  {
    title: "Web Development",
    desc: "Launch blazing‑fast, responsive sites with bespoke React & TailwindsCSS builds, seamless CMS integration, and expert UI design support.",
    icon: CgWebsite,
  },
  {
    title: "Design & Consulting",
    desc: "Get a rock‑solid architecture audit, performance tuning, and a clear, actionable roadmap to take your project from concept to scale.",
    icon: HiPaintBrush,
  },
  {
    title: "SEO & Marketing",
    desc: "Drive more traffic and conversions with on‑page SEO optimization, full analytics setup, and a data‑driven content strategy tailored to your audience.",
    icon: IoAnalyticsOutline,
  },
  {
    title: "Ongoing Support",
    desc: "Keep your site running smoothly with proactive maintenance, 24/7 monitoring, and rapid feature roll‑outs as your needs evolve.",
    icon: IoHeadsetOutline,
  },
];


export default function Services() {
  return (
    <section id="services" className="container relative scroll-mt-20 mx-auto px-6 py-10 md:py-30">
      <h2 className="text-3xl font-bold text-center mb-12"> Comprehensive Web Development & Technical Consulting Services
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
  );
}
