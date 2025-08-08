import React, { useState } from 'react';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import pricingHero from '../assets/pricingHero2.jpg';

const tiers = [
  {
    name: 'CMS Site Build',
    price: 'From $2000',
    disclaimer: '(price based on complexity)',
    features: [
      '1 website',
      'Basic support',
      '2 free updates/revisions',
      'No monthly maintenance fees',
      'SEO and Google Search optimization',
    ],
    details:
      'Get online fast with a powerful, easy-to-manage CMS site—complete with custom templates, built-in SEO optimization, and two free rounds of revisions. Enjoy full control without any monthly fees.',
    action: 'contact',
  },
  {
    name: 'Custom Site Build',
    price: 'From $3000',
    disclaimer: '(price based on complexity)',
    features: [
      'Complete build from scratch',
      'React w/TailwindCSS',
      '2 free updates/revisions',
      'No monthly maintenance fees',
      'SEO and Google Search optimization',
    ],
    details:
      'Experience a fully bespoke React application styled with TailwindCSS. Includes two complimentary revision rounds, on-page SEO setup, and zero recurring fees—your brand, your way.',
    action: 'contact',
  },
  {
    name: 'Website Maintenance',
    price: '$50/hr',
    disclaimer: '(2 hr minimum - for existing sites)',
    features: [
      'Content revisions/additions',
      'Troubleshooting & site fixes',
      'Code enhancements',
      'Feature additions/updates',
    ],
    details:
      'Keep your site running smoothly and up-to-date. From content tweaks to bug fixes and new feature roll-outs, our $50/hr maintenance service ensures your web presence evolves with your needs.',
    action: 'checkout',
  },
  {
    name: 'Logo Design',
    price: '$80',
    disclaimer: '(one-time charge - covers all formats)',
    features: [
      '3 revisions',
      'Dedicated design support',
      'Follows your brand guidelines',
      'Files are yours to use however you wish',
    ],
    details:
      'Stand out with a custom logo crafted to your brand vision. Enjoy included revisions, expert design guidance, and receive all final files—web and print ready—yours to own forever.',
    action: 'checkout',
  },
];

function FlipCard({ tier }) {
  const [flipped, setFlipped] = useState(false);
  const numericAmount =
    tier.name === 'Website Maintenance'
      ? '100'
      : tier.price.replace(/[^0-9.]/g, '');

  return (
    <div
      className="cursor-pointer h-full"
      onClick={() => setFlipped((f) => !f)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: 1000 }}
    >
      <div className="overflow-hidden rounded-xl bg-white hover:scale-102 hover:shadow-lg hover:shadow-[#0185e4] h-full">
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT */}
          <div
            className="flex flex-col h-full"
            style={{ backfaceVisibility: 'hidden' }}
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
              <p className="text-2xl justify-center align-top items-center text-center font-bold mb-2 text-primary">
                {tier.price}
              </p>
              <p className="text-sm text-center mb-2 italic text-gray-700">
                {tier.disclaimer}
              </p>

              {tier.action === 'checkout' ? (
                <Link
                  to={`/checkoutvenmo?plan=${encodeURIComponent(
                    tier.name
                  )}&amount=${numericAmount}`}
                  className="mt-auto block w-full text-center py-3 font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                >
                  Choose Plan
                </Link>
              ) : (
                <a
                  href="#contact"
                  className="mt-auto block w-full text-center py-3 font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                >
                  Customize Plan
                </a>
              )}
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 flex flex-col bg-white"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="bg-accent text-white py-4 text-center">
              <h3 className="text-xl font-extrabold">{tier.name}</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-700 mb-6">{tier.details}</p>
              <a
                href="#contact"
                className="mt-auto block w-full text-center py-3 font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition"
              >
                Get a Quote
              </a>
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
        bgImageStyle={{ minHeight: '100vh', objectFit: 'cover' }}
        className="h-auto bg-cover bg-center md:bg-top-right"
        renderLayer={() => <div className="absolute inset-0 bg-black opacity-80" />}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-white text-shadow-xl/50">
            Find Your Ideal Web Solution
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <FlipCard key={tier.name} tier={tier} />
            ))}
          </div>

          <p className="mt-6 text-shadow-xl/50 text-center text-sm text-gray-200">
            * Click a card to see more details.{' '}
            <a href="#contact" className="font-semibold hover:text-primary">
              Contact us
            </a>{' '}
            for a custom quote to fit your needs.
          </p>

          <div className="flex justify-center mt-6">
            <Link
              to="/packages"
              className="py-3 px-6 font-semibold rounded-lg border-2 border-[#0185e4] text-white hover:bg-white hover:text-primary transition"
            >
              Explore Package Options
            </Link>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
