// src/components/Privacy.jsx
import React from "react";
import SEO from "../components/SEO";
import SiteHero from "../components/SiteHero";
import hero from "../assets/privacyHero.jpg";


export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | B Squared Solutions"
        description="How B Squared Solutions collects, uses, and protects your information—read our full Privacy Policy and your rights."
        path="/privacy"
        image="https://bsquaredsolutions.io/og-default.svg"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: "https://bsquaredsolutions.io/privacy",
          },
        ]}
      />
      <SiteHero
        id="privacy-hero"
        imageSrc={hero}
        kicker="Privacy"
        title="Privacy Policy"
        subtitle="How B Squared Solutions collects, uses, and protects your information, with full transparency about data handling and your privacy rights."
        subtitle2="Effective Date: August 27, 2025"
      />
      {/* Brand background */}


      {/* ⬇ preserves your original outer spacing exactly */}
      <section
        id="privacy-policy"
        className="mx-auto px-8 md:px-40 pt-10 pb-20 scroll-mt-20 bg-gradient-to-br from-[#04223f] to-[#023c72]"
      >
        {/* Header */}
        

        {/* Glass card with generous spacing */}
        <div className="mt-10 rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_1px_rgba(255,255,255,0.5),0_20px_60px_rgba(0,0,0,0.55)]">
          <div className="px-6 py-8 sm:px-10 md:px-12 md:py-12 text-white/90 leading-relaxed">
            {/* Your exact content, just spaced nicely */}
            <h2 className="text-2xl font-semibold text-white mt-0 mb-4">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Personal information (e.g., name, email, phone) submitted via forms</li>
              <li>Usage data (e.g., browser type, pages visited, time spent)</li>
              <li>Cookies and tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>To provide and improve our services</li>
              <li>To respond to inquiries and support requests</li>
              <li>To send updates, newsletters, or promotional content (with consent)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. Sharing Your Information</h2>
            <p className="mb-8">
              We do not sell your data. We may share it with trusted third-party providers who assist in
              operating our website or delivering services, under confidentiality agreements.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. Data Security</h2>
            <p className="mb-8">
              We implement industry-standard security measures to protect your data. However, no method of
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">5. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>You may request access to, correction of, or deletion of your personal data.</li>
              <li>You may opt out of marketing communications at any time.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">6. Cookies</h2>
            <p className="mb-8">
              We use cookies to enhance user experience. You can disable cookies via your browser settings,
              though some features may not function properly.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">7. Third-Party Links</h2>
            <p className="mb-8">
              Our site may contain links to external websites. We are not responsible for their privacy
              practices.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">8. Changes to This Policy</h2>
            <p className="mb-8">
              We may update this Privacy Policy. Changes will be posted on this page with an updated effective
              date.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">9. Contact Us</h2>
            <p className="space-y-2">
              <span>
                Email:{" "}
                <a href="mailto:info@bsquaredsolutions.io" className="text-white hover:text-primary">
                  info@bsquaredsolutions.io
                </a>
              </span>
              <br />
              <span>
                Phone:{" "}
                <a href="tel:17202545354" className="text-white hover:text-primary">
                  720.254.5354
                </a>
              </span>

            </p>
          </div>
        </div>

        {/* Small footer row, optional */}
        <div className="mx-auto mt-6 flex flex-wrap items-center justify-between gap-4 text-white/70">
          <p className="text-sm">
            Need more details about data handling? See our{" "}
            <a href="/terms" className="text-white hover:text-primary">
              Terms &amp; Conditions
            </a>
            .
          </p>
          <a
            href="mailto:support@bsquaredsolutions.io"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 ring-1 ring-white/20 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    
    </>
  );
}
