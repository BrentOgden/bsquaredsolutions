// src/components/Terms.jsx
import React from "react";
import SEO from "../components/SEO";
import SiteHero from "../components/SiteHero";
import hero from "../assets/termsHero.jpg";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions | B Squared Solutions"
        description="Clear guidelines on using B Squared Solutions’ website, services, and deliverables—your rights, responsibilities, and what you can expect from us."
        path="/terms"
        image="https://bsquaredsolutions.io/og-default.svg"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms & Conditions",
            url: "https://bsquaredsolutions.io/terms",
          },
        ]}
      />

      <SiteHero
        id="terms-hero"
        imageSrc={hero}
        kicker="Legal"
        title="Terms & Conditions"
        subtitle="The rules that govern your use of our website and services, including deliverables, payments, and acceptable use."
        subtitle2="Effective Date: August 27, 2025"
      />

      {/* ⬇ preserves your section pattern and spacing */}
      <section
        id="terms-and-conditions"
        className="mx-auto px-8 md:px-40 pt-10 pb-20 scroll-mt-20 bg-gradient-to-br from-[#04223f] to-[#023c72]"
      >
        {/* Glass card with generous spacing */}
        <div className="mt-10 rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_1px_rgba(255,255,255,0.5),0_20px_60px_rgba(0,0,0,0.55)]">
          <div className="px-6 py-8 sm:px-10 md:px-12 md:py-12 text-white/90 leading-relaxed">
            <h2 className="text-2xl font-semibold text-white mt-0 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-8">
              By accessing or using <a href="https://bsquaredsolutions.io" className="text-accent">bsquaredsolutions.io</a>, you agree to be bound by these Terms and Conditions.
              If you do not agree, please discontinue use.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. Services Provided</h2>
            <p className="mb-8">
              B Squared Solutions offers branding, web design, SEO, and digital strategy services. Services may be
              modified or discontinued at our discretion.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Invoices are due within 14 days unless otherwise agreed.</li>
              <li>Late payments may incur a 1.5% monthly fee or the maximum allowed by law.</li>
              <li>Project timelines may shift if payments are delayed.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. Deliverables &amp; Revisions</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Deliverables are defined in the project scope.</li>
              <li>Two rounds of revisions are included unless otherwise specified.</li>
              <li>Additional revisions may incur extra charges.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">5. Intellectual Property</h2>
            <p className="mb-8">
              Ownership of final deliverables transfers to the client upon full payment. B Squared Solutions retains
              the right to showcase work unless otherwise agreed.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">6. Privacy &amp; Data</h2>
            <p className="mb-8">
              See our{" "}
              <a href="/privacy" className="text-accent hover:opacity-90">
                Privacy Policy
              </a>{" "}
              for details on data handling.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">7. Prohibited Use</h2>
            <p className="mb-8">
              You agree not to use our services for unlawful purposes, uploading malicious code, or violating
              intellectual property rights.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">8. Limitation of Liability</h2>
            <p className="mb-8">
              We are not liable for indirect or consequential damages. Total liability is limited to the amount paid
              for services.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">9. Termination</h2>
            <p className="mb-8">
              We may suspend or terminate services at any time for violations of these terms.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">10. Governing Law</h2>
            <p className="mb-8">
              These terms are governed by the laws of the State of Colorado. Disputes will be resolved in Commerce
              City, CO.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">11. Changes to Terms</h2>
            <p className="mb-8">
              We may update these terms. Continued use constitutes acceptance of changes.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">12. Contact Us</h2>
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

        {/* Footer row to cross-link Privacy */}
        <div className="mx-auto mt-6 flex flex-wrap items-center justify-between gap-4 text-white/70">
          <p className="text-sm">
            For details on how we handle your data, see our{" "}
            <a href="/privacy" className="text-white hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
          <a
            href="mailto:info@bsquaredsolutions.io"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 ring-1 ring-white/20 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
