import React from 'react';
import TemplateSelector from './TemplateSelector';
import { templatesData } from '../data/templatesData';

export default function TemplatesPage() {
  return (
    <div>
      {/* Optional page header/banner */}
      <section className="py-20 mt-20 bg-primary scroll-mt-20 text-white text-center">
        <h1 className="text-5xl font-bold">Download a Site Template</h1>
        <p className="mt-4 max-w-xl mx-auto">
          Pick one of our starter templates, grab the ZIP, and get building.
        </p>
      </section>

      {/* The grid itself */}
      <TemplateSelector templates={templatesData} />
    </div>
  );
}
