// src/components/Footer.jsx
import React from 'react';
import { Link, useInRouterContext } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { SiVenmo } from 'react-icons/si';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoIosPhonePortrait } from 'react-icons/io';
import logo from '../assets/bsquaredlogowhite.png';

const ACCENT = '#3d86ca';

/** Use <Link> for internal routes when Router is available; <a> otherwise */
function SmartLink({ to, children, className = '', ...props }) {
  const inRouter = useInRouterContext?.() ?? false;
  const isExternal = /^https?:\/\//i.test(to);
  const isHashOnly = to?.startsWith('#');
  if (!inRouter || isExternal || isHashOnly) {
    return (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const slugMap = { Services: 'services', Pricing: 'pricing', About: 'about'};

  /** Smooth-scroll to sections on the home page; otherwise navigate to /#slug */
  const handleAnchor = (e, slug) => {
    e.preventDefault();
    const onHome = window.location.pathname === '/';
    if (onHome) {
      const el = document.getElementById(slug);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (slug === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = `/#${slug}`;
    }
  };

  return (
    <footer className="footer relative isolate overflow-hidden bg-neutral-950">
      {/* Accent glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: `radial-gradient(60rem 40rem at 110% -10%, ${ACCENT}22, transparent 60%)` }}
      />
      {/* Soft gradient shard */}
      <div aria-hidden="true" className="absolute -top-24 left-1/2 -z-10 -translate-x-1/2 blur-3xl">
        <div
          className="aspect-[1155/678] w-[72rem] opacity-20"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #0b1220)`,
            clipPath:
              'polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Top content grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Branding + contact */}
          <div>
            <img src={logo} alt="B Squared Solutions" className="h-16 w-auto mb-6 select-none" draggable="false" />
            <div className="space-y-3 text-white">
              <div className="flex items-center">
                <MdOutlineMailOutline className="mr-2 text-xl" />
                <a href="mailto:info@bsquaredsolutions.io">info@bsquaredsolutions.io</a>
              </div>
              <div className="flex items-center">
                <IoIosPhonePortrait className="mr-2 text-xl" />
                <a href="tel:7202545354">720.254.5354</a>
              </div>
            </div>
          </div>

          {/* Explore links */}
          <div className="flex md:justify-between">
            <div>
              <h4 className="text-white text-xl font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-white/90">
                {['Services', 'Pricing', 'About'].map((label) => {
                  const slug = slugMap[label];
                  return (
                    <li key={label}>
                      <a href={`/#${slug}`} onClick={(e) => handleAnchor(e, slug)}>
                        {label}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <SmartLink to="/faq">FAQs</SmartLink>
                </li>
                 <li>
                  <SmartLink to="/blog">Blog</SmartLink>
                </li>
                <li>
                  <SmartLink to="/contact">Contact</SmartLink>
                </li>
              </ul>
            </div>

            {/* Socials + payments */}
            <div className="ml-16 md:ml-0">
              <h4 className="text-white text-xl font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4 text-white">
                <a href="#" aria-label="Twitter" className="icon-link" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={28} />
                </a>
                <a href="#" aria-label="YouTube" className="icon-link" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={28} />
                </a>
                <a href="#" aria-label="Instagram" className="icon-link" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={28} />
                </a>
              </div>
              <div className="text-white mt-6">
                <div className="text-sm mb-2">Payments accepted via</div>
                <SiVenmo className="text-6xl leading-none -mt-5" />
              </div>
            </div>
          </div>

          {/* Accent card (optional CTA) */}
          <div className="glow glow-strong rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-lg">
            <h3 className="text-lg font-semibold text-white">Need a hand?</h3>
            <p className="mt-2 text-sm text-white/80">
              Have questions about templates or want something custom? We’re happy to help.
            </p>
            <button
              href="/#contact"
              onClick={(e) => handleAnchor(e, 'contact')}
              className="glow-hover mt-4 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: ACCENT }}
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} B Squared Solutions. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 text-sm">
            <SmartLink to="/terms">Terms</SmartLink>
            <span className="text-white/20">|</span>
            <SmartLink to="/privacy">Privacy</SmartLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
