// src/components/Templates.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TemplateSelector from './TemplateSelector';
import { templatesData } from '../data/templatesData';
import hero from '../assets/templateHero.png';

export default function TemplatesPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    // scroll instantly to top whenever this page is rendered
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div>
      {/* Optional page header/banner */}
      <section className="relative bg-cover bg-no-repeat bg-top-right h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 mt-26 text-center text-white px-4 max-w-5xl">
          <h1 className="text-5xl font-bold text-shadow-lg/30">Template Library</h1>
          <p className="mt-4 max-w-xl text-2xl text-shadow-lg/30 mx-auto">
            Choose from one of our starter templates, complete the purchase, grab the ZIP file, and get building!
          </p>
          <p className='mt-6 text-sm text-shadow-lg/30 italic font-semibold'>All templates are built in React and include TailwindCSS, easy to understand code comments and easy to follow installation instructions.</p>
        </div>
      </section>

      {/* The grid itself */}
      <TemplateSelector templates={templatesData} />
    </div>
  );
}
