// src/components/Terms.jsx
import React from "react";

export default function Terms() {
  return (
    <section
      id="terms"
      className="container mx-auto md:w-7xl px-8 md:px-40 text-justified mt-30 mb-30 md:mt-20 md:py-20 scroll-mt-20"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
        Terms &amp; Conditions
      </h1>

      <div className="space-y-6 text-gray-800">
        <p><strong>Last updated:</strong> July 21, 2025</p>

        <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
        <p>
          Welcome to B Squared Solutions, LLC. (“we,” “us,” “our”). By accessing or using our website
          and services (“Services”), you agree to these Terms &amp; Conditions (“Terms”). If you
          don’t agree, please do not use our Services.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Services</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Custom website design &amp; development</li>
          <li>Technical consulting &amp; architecture reviews</li>
          <li>SEO &amp; digital marketing strategy</li>
          <li>Ongoing maintenance &amp; support</li>
        </ul>
        <p>All work is scoped and quoted on a per‑project basis. We’ll issue a written proposal before starting.</p>

        <h2 className="text-2xl font-semibold mt-8">3. Project Terms</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Scope &amp; Estimates:</strong> Deliverables, timelines, and fees are in
            your proposal. Out‑of‑scope changes will be quoted separately.
          </li>
          <li>
            <strong>Revisions:</strong> Each package includes up to two rounds of revisions.
            Additional revisions billed at our hourly rate.
          </li>
          <li>
            <strong>Payment Terms:</strong> 50% deposit due at start, 50% on delivery. Hourly
            services are invoiced net 15; late payments incur a 1.5% monthly fee.
          </li>
          <li>
            <strong>Cancellation:</strong> You may cancel anytime in writing; you remain
            responsible for work performed up to that date.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">4. Intellectual Property</h2>
        <p>
          <strong>Client‑Provided Materials:</strong> You warrant you own or have license to use them.<br/>
          <strong>Deliverables:</strong> Upon full payment, all custom code, designs, and assets we create
          are yours, except third‑party libraries which remain under their own licenses.
        </p>

        <h2 className="text-2xl font-semibold mt-8">5. Confidentiality</h2>
        <p>
          We agree not to disclose any non‑public information you provide, and you agree likewise
          for any proprietary processes or tooling we share.
        </p>

        <h2 className="text-2xl font-semibold mt-8">6. Warranties &amp; Liability</h2>
        <p>
          <strong>No Warranty:</strong> We follow industry best practices but make no guarantees
          about traffic, rankings, or performance.<br/>
          <strong>Limitation of Liability:</strong> Our total liability shall not exceed the fees
          you paid us in the prior six months.
        </p>

        <h2 className="text-2xl font-semibold mt-8">7. Governing Law</h2>
        <p>
          These Terms are governed by Colorado law. Any dispute will be resolved in Denver,
          Colorado courts.
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use after changes means you accept them.
        </p>
      </div>
    </section>
  );
}
