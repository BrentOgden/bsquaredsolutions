import React from 'react';
import { MdOutlineAttachMoney } from "react-icons/md";


/**
 * @typedef {Object} Template
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} thumbnail
 * @property {string} downloadUrl
 */

/**
 * Renders a grid of downloadable templates.
 *
 * @param {{ templates: Template[] }} props
 */
export default function TemplateSelector({ templates }) {
  return (
    <section id="template-gallery" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-3">Choose a Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our pre-built site templates and download the starter package that’s right for you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="flex flex-col bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            {/* Thumbnail */}
            <img
              src={tpl.thumbnail}
              alt={`${tpl.name} template thumbnail`}
              className="h-40 w-full object-cover"
            />

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold mb-2">{tpl.name}</h3>
              <p className="text-gray-700 flex-1">{tpl.description}</p>

              {/* Download button */}
              <a
                href={tpl.downloadUrl}
                download
                className="mt-6 inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-5 rounded-lg transition-colors"
              >
                <MdOutlineAttachMoney className="mr-2" /> Buy Template 
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
