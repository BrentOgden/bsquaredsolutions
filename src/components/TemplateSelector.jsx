// src/components/TemplateSelector.jsx
import React, { useEffect, useState } from 'react';
import { GiShoppingCart } from 'react-icons/gi';

/**
 * @typedef {Object} Template
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} thumbnail
 * @property {string=} fullImage  // optional: use for hi-res modal image
 * @property {string} downloadUrl
 * @property {string} price
 */

/**
 * Renders a grid of downloadable templates.
 *
 * @param {{ templates: Template[], thumbHeight?: number }} props
 */
export default function TemplateSelector({ templates, thumbHeight = 250 }) {
  const [lightbox, setLightbox] = useState({
    open: false,
    src: '',
    alt: '',
  });

  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox({ open: false, src: '', alt: '' });

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => e.key === 'Escape' && closeLightbox();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open]);

  return (
    <section id="template-gallery" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-3">Choose a Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our pre-built site templates to find the starter package that’s right for you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl) => {
          const full = tpl.fullImage || tpl.thumbnail;
          return (
            <div
              key={tpl.id}
              className="flex flex-col bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              {/* THUMBNAIL: fixed-height, scrollable area */}
              <div
                className="relative bg-gray-100"
                style={{ height: `${thumbHeight}px`, overflow: 'auto' }}
              >
                {/* Image is non-interactive; click is handled by the overlay button */}
                <img
                  src={tpl.thumbnail}
                  alt={`${tpl.name} template thumbnail`}
                  className="w-full h-auto select-none pointer-events-none"
                  loading="lazy"
                />
                {/* Full-image trigger overlay */}
                <button
                  type="button"
                  onClick={() => openLightbox(full, `${tpl.name} full image`)}
                  className="absolute inset-0 w-full h-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary/60"
                  aria-label={`View ${tpl.name} larger`}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-primary mb-2">{tpl.name}</h3>
                <p className="text-gray-700 flex-1">{tpl.description}</p>

                {/* Price */}
                <div className="mt-4 text-xl font-bold text-primary">{tpl.price}</div>

                {/* Download button */}
                <a
                  href={`/checkoutvenmo?plan=${encodeURIComponent(tpl.name)}&amount=${tpl.price.replace(/[^0-9.]/g, '')}`}
                  className="mt-6 inline-flex items-center text-lg justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-5 rounded-lg transition-colors"
                >
                  <GiShoppingCart className="mr-2 text-2xl" />
                  Buy Now
                </a>




              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Lightbox */}
      {lightbox.open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100]"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeLightbox}
          />
          {/* Content */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-[95vw] max-h-[90vh] rounded-xl shadow-2xl"
            />
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/90 hover:text-white text-3xl leading-none"
              aria-label="Close"
              title="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
