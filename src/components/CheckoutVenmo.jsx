// src/pages/CheckoutVenmo.jsx
import React, { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import { IoLogoVenmo } from 'react-icons/io5';

// Static QR codes for each plan
import logoDesignQR from '../assets/qr-logo-design.png';
import maintenanceQR from '../assets/qr-website-maintenance.png';
import customSiteQR from '../assets/qr-small-business-template.png';
import basicSiteQR from '../assets/qr-basic-template.png';
import simpleSiteQR from '../assets/qr-simple-template.png';
import fallbackQR from '../assets/venmoqr.png'; // fallback image

export default function CheckoutVenmo() {
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  const plan = params.get('plan') || 'Template';
  const amount = params.get('amount') || '';
  const note = `Template: ${plan}`;

  const venmoLink = `https://venmo.com/u/bsquaredsolutions?txn=pay&amount=${amount}&note=${encodeURIComponent(note)}`;

  // Match QR image to plan name
  const qrMap = {
    'Logo Design': logoDesignQR,
    'Basic Single-Page': basicSiteQR,
    'Small Business Site': customSiteQR,
    'Website Maintenance': maintenanceQR,
    'Simple Multi-Page': simpleSiteQR,
  };

  const qrImage = qrMap[plan] || fallbackQR;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note);
      alert('Note copied to clipboard!');
    } catch {
      alert('Failed to copy. Please copy manually.');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <section className="min-h-screen py-16 mt-20 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Checkout with Venmo</h1>

        <p className="text-lg mb-4 text-gray-700">
          You’re purchasing <strong>{plan}</strong> for <strong>${amount}</strong>
        </p>

        {/* QR Image */}
        <div className="my-6">
          <img
            src={qrImage}
            alt={`Scan to pay for ${plan}`}
            className="w-48 mx-auto rounded-lg border border-gray-200 shadow-md"
          />
          <p className="text-sm text-gray-600 mt-2">Scan this code in the Venmo app</p>
        </div>

        {/* OR link */}
        <p className="mt-4 text-gray-700">or</p>
        <a
          href={venmoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg text-white font-semibold bg-primary px-6 py-3 rounded-lg hover:bg-primary-dark mt-4"
        >
          <IoLogoVenmo className="text-2xl" />
          Pay on Venmo
        </a>

        {/* Copyable Note */}
        <div className="mt-8 text-left">
          <p className="font-semibold text-gray-800 mb-2">Include this in the Venmo note:</p>
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
            <code className="text-sm text-gray-700">{note}</code>
            <button
              onClick={handleCopy}
              className="ml-4 text-primary font-semibold hover:underline"
              title="Copy to clipboard"
            >
              <FaCopy />
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Once payment is received, we’ll email you the download link within 1 business day.
        </p>
      </div>
    </section>
  );
}
