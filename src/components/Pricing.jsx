// src/pages/Pricing.jsx
import React, { useEffect, useState } from 'react';
import { IoShieldCheckmarkOutline, IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import pricingHero from '../assets/pricingHero2.jpg';
import SEO from '../components/SEO'; // ✅ SEO

/* ── Helper: smart link (internal vs external) ─────────────────────── */
function SmartLink({ to, className = '', children, onClick }) {
  const isExternal = /^https?:\/\//i.test(to);
  if (isExternal) {
    return (
      <a
        href={to}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/* ── Data ──────────────────────────────────────────────────────────── */
const tiers = [
  {
    name: 'CMS Site Build',
    price: 'From $1500',
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
    action: 'contact', // primary CTA (existing behavior)
    // Secondary CTA
    action2Label: 'Get Started',
    action2Href: '/#contactform',
    category: '/packages#build',
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
    action2Label: 'Get Started',
    action2Href: '/#contactform',
    category: '/packages#build',
  },
  {
    name: 'Website Maintenance',
    price: '$50/hr',
    disclaimer: '(2 hr minimum - new or existing sites)',
    features: [
      'Content revisions/additions',
      'Troubleshooting & site fixes',
      'Code enhancements',
      'Feature additions/updates',
      'Monthly plans available for dedicated support',
    ],
    details:
      'Keep your site running smoothly and up-to-date. From content tweaks to bug fixes and new feature roll-outs, our $50/hr maintenance service ensures your web presence evolves with your needs.',
    action: 'contact',
    action2Label: 'Discuss a Plan',
    // This external link will open in a modal instead of a new page
    action2Href: 'https://myformflow.io/b-squared-solutions/w',
    category: '/packages#maintenance'
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
    action: 'checkout', // will still route to checkoutvenmo
    action2Label: "Let's Chat",
    action2Href: '/contact',
  },
];

/* ── Modal for embedding external forms (iframe) ───────────────────── */
function Modal({ open, onClose, url, title = 'Website Maintenance' }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    // Lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/10">
        <div className="flex items-center justify-between px-4 py-3 bg-black">
          <h3 className="text-white font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-white/80 hover:text-white"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="bg-white">
          {/* 80vh viewport height iframe */}
          <iframe
            title="Maintenance Form"
            src={url}
            className="w-full"
            style={{ height: '80vh', border: '0' }}
            // Some providers require these:
            allow="clipboard-write; geolocation *; microphone *; camera *"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
          <span className="text-sm text-gray-600">
            Having trouble in the modal?
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Open full page ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Card ──────────────────────────────────────────────────────────── */
function FlipCard({ tier, openModal }) {
  const [flipped, setFlipped] = useState(false);

  // Preserve your amount logic for checkout
  const numericAmount =
    tier.name === 'Website Maintenance'
      ? '100'
      : tier.price.replace(/[^0-9.]/g, '');

  const isExternalAction2 = !!tier.action2Href && /^https?:\/\//i.test(tier.action2Href);
  const openInModal =
    tier.name === 'Website Maintenance' && isExternalAction2 && typeof openModal === 'function';

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

              <p className="text-2xl text-center font-bold mb-2 text-primary">
                {tier.price}
              </p>
              <p className="text-sm text-center mb-4 italic text-gray-700">
                {tier.disclaimer}
              </p>

              {/* Primary CTA (existing behavior) */}
              {tier.action === 'checkout' ? (
                <Link
                  to={`/checkoutvenmo?plan=${encodeURIComponent(
                    tier.name
                  )}&amount=${numericAmount}`}
                  className="block w-full text-center py-3 font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  Purchase
                </Link>
              ) : (
                <SmartLink
                  to={tier.category}
                  className="block w-full text-center py-3 font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  Choose a Package
                </SmartLink>
              )}

              {/* Secondary CTA (opens modal for Website Maintenance external link) */}
              {tier.action2Href && tier.action2Label && (
                openInModal ? (
                  <button
                    type="button"
                    className="mt-2 block w-full text-center py-2.5 font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(tier.action2Href);
                    }}
                  >
                    {tier.action2Label}
                  </button>
                ) : (
                  <SmartLink
                    to={tier.action2Href}
                    className="mt-2 block w-full text-center py-2.5 font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {tier.action2Label}
                  </SmartLink>
                )
              )}
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 flex flex-col bg-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="bg-accent text-white py-4 text-center">
              <h3 className="text-xl font-extrabold">{tier.name}</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-700 mb-6">{tier.details}</p>

              <a
                href="/contact"
                className="mt-auto block w-full text-center py-3 font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition"
                onClick={(e) => e.stopPropagation()}
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

/* ── Page ───────────────────────────────────────────────────────────── */
export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const openModal = (url) => {
    setModalUrl(url);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalUrl('');
  };

  return (
    <>
      {/* ✅ SEO (head-only; no UI changes) */}
      <SEO
        title="Pricing | B Squared Solutions"
        description="Transparent pricing for CMS sites, custom React builds, maintenance, and logo design. No monthly fees on builds, SEO included, and flexible support plans."
        path="/pricing"
        type="website"
        image={pricingHero}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Pricing",
            "url": "https://bsquaredsolutions.io/pricing",
            "description": "Transparent pricing for CMS sites, custom React builds, maintenance, and logo design.",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bsquaredsolutions.io/" },
              { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://bsquaredsolutions.io/pricing" }
            ]
          }
        ]}
      />

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
                <FlipCard key={tier.name} tier={tier} openModal={openModal} />
              ))}
            </div>

            <p className="mt-6 text-shadow-xl/50 text-center text-sm text-gray-200">
              * Click a card to see more details.{' '}
              <a href="#contactform" className="font-semibold hover:text-primary">
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

        {/* Modal */}
        <Modal open={modalOpen} onClose={closeModal} url={modalUrl} title="Website Maintenance" />
      </section>
    </>
  );
}
