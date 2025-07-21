// src/components/Privacy.jsx
import React from "react";

export default function Privacy() {
  return (
    <section
      id="privacy"
      className="container mx-auto md:w-7xl px-8 md:px-40 text-justified mt-30 mb-30 md:mt-20 md:py-20 scroll-mt-20"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-800">
        <p><strong>Last updated:</strong> July 21, 2025</p>

        <h2 className="text-2xl font-semibold mt-8">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Personal Data:</strong> Name, email, phone, address you provide when
            requesting quotes or placing orders.
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, time on site, referral source—collected
            via cookies and analytics.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">2. How We Use Your Data</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>To Provide Services:</strong> Build and maintain your site, send invoices, support you.</li>
          <li><strong>To Communicate:</strong> Confirm appointments, send updates, newsletters (opt‑in).</li>
          <li><strong>To Improve Our Site:</strong> Analyze trends to optimize content and performance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">3. Data Sharing</h2>
        <p>
          We share data only with service providers (e.g. payment processors, email platforms,
          hosting) under confidentiality agreements or as legally required.
        </p>

        <h2 className="text-2xl font-semibold mt-8">4. Cookies &amp; Tracking</h2>
        <p>
          We use cookies to remember preferences and track usage. You can disable cookies in
          your browser, but some features may break.
        </p>

        <h2 className="text-2xl font-semibold mt-8">5. Your Rights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You may request access to or deletion of your personal data.</li>
          <li>You can correct or update your data at any time.</li>
          <li>You may unsubscribe from marketing emails via the link in any email.</li>
        </ul>
        <p>
          To exercise these rights, email us at{" "}
          <a
            href="mailto:support@bsquaredsolutions.io"
            className="text-primary hover:underline"
          >
            support@bsquaredsolutions.io
          </a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8">6. Data Security</h2>
        <p>
          We implement industry‑standard measures to protect your data from loss or unauthorized
          access.
        </p>

        <h2 className="text-2xl font-semibold mt-8">7. Children’s Privacy</h2>
        <p>
          Our site is not directed to children under 16. We do not knowingly collect data from
          minors.
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Changes to This Policy</h2>
        <p>
          We may update this policy periodically. Continued use after updates indicates your
          acceptance.
        </p>

        <h2 className="text-2xl font-semibold mt-8">9. Contact Us</h2>
        <p>
          B Squared Solutions<br/>
          Email:{" "}
          <a
            href="mailto:support@bsquaredsolutions.io"
            className="text-[#0187e3] hover:text-gray-700"
          >
            support@bsquaredsolutions.io
          </a><br/>
          Phone:{" "}
          <a
            href="tel:7202545354"
            className="text-[#0187e3] hover:text-gray-700"
          >
            720.254.5354
          </a>
        </p>
      </div>
    </section>
  );
}
