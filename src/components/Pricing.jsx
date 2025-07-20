// src/components/Pricing.jsx
import React, { useState } from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import pricingHero from "../assets/pricingHero.png";
import { Parallax } from "react-parallax";

const tiers = [
  {
    name: "CMS Site Build",
    price: "From $2000",
    disclaimer: "(price based on complexity - no recurring fees)",
    features: [
      "1 website",
      "Basic support",
      "2 free updates/revisions",
      "No monthly maintenance fees",
      "SEO and Google Search optimization",
    ],
    details:
      "Get online fast with a powerful, easy-to-manage CMS site—complete with custom templates, built‑in SEO optimization, and two free rounds of revisions. Enjoy full control without any monthly fees.",
  },
  {
    name: "Custom Site Build",
    price: "From $3000",
    disclaimer: "(price based on complexity - no recurring fees)",
    features: [
      "Complete build from scratch",
      "React w/TailwindCSS",
      "2 free updates/revisions",
      "No monthly maintenance fees",
      "SEO and Google Search optimization",
    ],
    details:
      "Experience a fully bespoke React application styled with TailwindCSS. Includes two complimentary revision rounds, on‑page SEO setup, and zero recurring fees—your brand, your way.",
  },
  {
    name: "Website Maintenance",
    price: "$50/hr",
    disclaimer: "(ad hoc maintenance - separate from included site support)",
    features: [
      "Content revisions/additions",
      "Troubleshooting & site fixes",
      "Code enhancements",
      "Feature additions/updates",
    ],
    details:
      "Keep your site running smoothly and up‑to‑date. From content tweaks to bug fixes and new feature roll‑outs, our $50/hr maintenance service ensures your web presence evolves with your needs.",
  },
  {
    name: "Logo Design",
    price: "$80",
    disclaimer: "(one‑time charge - covers all formats)",
    features: [
      "3 revisions",
      "Dedicated design support",
      "Follows your brand guidelines",
      "Files are yours to use however you wish",
    ],
    details:
      "Stand out with a custom logo crafted to your brand vision. Enjoy unlimited revisions, expert design guidance, and receive all final files—web and print ready—yours to own forever.",
  },
];

function FlipCard({ tier }) {
  const [flipped, setFlipped] = useState(false);

  // extract numeric amount (e.g. "2000" or "50")
  const numericAmount = tier.price.replace(/[^0-9.]/g, "");

  return (
    <div
      className="cursor-pointer h-full"
      onClick={() => setFlipped((f) => !f)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: 1000 }}
    >
      <div className="overflow-hidden rounded-xl bg-white hover:shadow-xl hover:shadow-[#0185e4] h-full">
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div
            className="flex flex-col h-full"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="bg-primary text-white py-4 text-center">
              <h3 className="text-xl font-extrabold">{tier.name}</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <ul className="flex-1 mb-6 space-y-2 text-gray-600">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center">
                    <IoShieldCheckmarkOutline className="mr-2 text-2xl text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-2xl text-center font-bold mb-2 text-primary">
                {tier.price}
              </p>
              <p className="text-sm text-center mb-2 italic text-gray-700">
                {tier.disclaimer}
              </p>
              <button className="mt-auto w-full py-3 font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition">
                <Link
                  to={`/checkout?plan=${encodeURIComponent(
                    tier.name
                  )}&amount=${numericAmount}`}
                  className="block w-full h-full"
                >
                  Choose Plan
                </Link>
              </button>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 flex flex-col bg-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="bg-accent text-white py-4 text-center">
              <h3 className="text-xl font-extrabold">{tier.name}</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-700 mb-6">{tier.details}</p>
              <button className="mt-auto w-full py-3 font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition">
                <a href="#contact">Get a Quote</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-20">
      <Parallax
        bgImage={pricingHero}
        strength={600}
        bgImageStyle={{ minHeight: "100vh", objectFit: "cover" }}
        bgClassName="bg-cover bg-center"
        className="bg-cover bg-center md:bg-top-right h-auto py-20 flex items-center justify-center"
        renderLayer={() => <div className="md:absolute inset-0 bg-black opacity-60" />}
      >
        <div className="md:relative z-10 md:container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Find Your Ideal Web Solution
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div key={tier.name} className="h-full">
                <FlipCard tier={tier} />
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-white">
            * Click a card to see more details.{" "}
            <a href="#contact" className="font-semibold hover:text-primary">
              Contact us
            </a>{" "}
            for a custom quote to fit your needs.
          </p>
        </div>
      </Parallax>
    </section>
  );
}
