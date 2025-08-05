// src/components/Packages.jsx
import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const packagesData = [
  {
    id: 'starter',
    title: 'Starter',
    price: '$1,500',
    blurb: 'Ideal for solo entrepreneurs or small businesses needing a clean, conversion-focused site.',
    subtitle: '',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first, responsive layout',
      'Contact form with email notifications',
      'Basic on-page SEO (titles, meta descriptions)',
      'Google Analytics setup & Search Console submission',
      '1 round of design & content revisions',
      'Deployment guidance & launch support',
    ],
    cta: 'Get Started',
    path: '/#contact',
    popular: false,
  },
  {
    id: 'growth',
    title: 'Growth',
    price: '$3,000',
    blurb: 'For growing teams ready to scale traffic, leads and content.',
    subtitle: 'Everything in Starter plus:',
    features: [
      'Up to 10 pages, plus optional blog or news section',
      'Optional CMS integration (WordPress, Headless CMS, etc.)',
      'Advanced on-page SEO & schema markup',
      'Performance optimization & page-speed tuning',
      '2 rounds of revisions',
      '3 months post-launch support',
      'Basic accessibility compliance (WCAG AA)',
    ],
    cta: 'Most Popular – Let’s Talk',
    path: '/#contact',
    popular: true,
  },
  {
    id: 'platinum',
    title: 'Professional',
    price: 'Starts at $6,000',
    blurb: 'Complex sites with custom integrations, dashboards or e-commerce.',
    subtitle: 'All Growth features plus:',
    features: [
      'Unlimited pages & custom components',
      'Custom API integrations & automations',
      'E-commerce or membership system setup',
      'Design system / UI component library',
      'Advanced accessibility & security hardening',
      '6 months dedicated support & maintenance',
    ],
    cta: 'Book a Discovery Call',
    path: '/#contact',
    popular: false,
  },
  {
    id: 'diy',
    title: 'DIY Starter',
    price: '$299',
    blurb: 'Pre-built, fully-functional template to get you up and running fast.',
    subtitle: '',
    features: [
      'Pre-designed 5-page template',
      'Full access to HTML/CSS for easy customization',
      'Installation & setup documentation',
      'Optional add-on templates & components',
    ],
    cta: 'Choose Template',
    path: '/templates',
    popular: false,
  },
  {
    id: 'diypro',
    title: 'DIY Pro',
    price: '$1,999',
    blurb: 'Enhanced template with professional configuration and support.',
    subtitle: 'Everything in DIY Starter plus:',
    features: [
      'Up to 8 pages with custom styling tweaks',
      'Domain install & hosting configuration',
      'Priority email support & 1×1 tutorial session',
      'Access to premium components & plugins',
    ],
    cta: 'Customize DIY Pro',
    path: '/#contact',
    popular: false,
  },
  {
    id: 'allinclusive',
    title: 'The Works',
    price: 'Custom Pricing',
    blurb: 'Our full-service, end-to-end solution: strategy, design, build & beyond.',
    subtitle: '',
    features: [
      'Unlimited pages, features & custom code',
      'Brand design, logo & content writing',
      'Full SEO & digital marketing strategy',
      'All custom integrations, automations & analytics dashboards',
      'Dedicated project manager',
      '12 months of premium support & maintenance',
    ],
    cta: 'Book a Discovery Call',
    path: '/#contact',
    popular: false,
  },
];

export default function Packages({
  packages = packagesData,
  onCtaClick, // optional callback instead of href
}) {
  return (
    <section id="packages" className="py-16 px-4 mt-30 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-3">Web Packages</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transparent pricing and deliverables so you know exactly what you’re getting.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={[
              'relative flex flex-col rounded-2xl shadow-xl overflow-hidden bg-white',
              'transition-transform duration-300 hover:-translate-y-1',
              pkg.popular ? 'ring-2 ring-primary' : '',
            ].join(' ')}
          >
            {pkg.popular && (
              <span className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-2xl">
                Most Popular
              </span>
            )}

            {/* Header */}
            <div className="p-8 pb-6">
              <h3 className="text-2xl font-semibold mb-2">{pkg.title}</h3>
              <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
              <p className="text-gray-600">{pkg.blurb}</p>
              <p className="text-gray-600 font-bold pt-6">{pkg.subtitle}</p>
            </div>

            {/* Feature list */}
            <ul className="px-8 flex-1 space-y-3 mb-8">
              {pkg.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <FiCheck className="mt-1 flex-shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="px-8 pb-8">
              {onCtaClick ? (
                <button
                  onClick={() => onCtaClick(pkg.path)}
                  className="w-full bg-primary hover:bg-[#8D3202] text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors"
                >
                  {pkg.cta}
                </button>
              ) : (
                <Link
                  to={pkg.path}
                  className="block w-full text-center bg-primary hover:bg-[#8D3202] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {pkg.cta}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
