// src/components/Hero.jsx
import React from 'react';
import HeroImg from '../assets/hero.png';
import { Parallax } from 'react-parallax';

export default function Hero({ id = "hero" }) {
  return (
    <Parallax
      tag="section"
      id={id}
      bgImage={HeroImg}
      strength={300}
      bgImageStyle={{ minHeight: '100vh', objectFit: 'cover' }}
      className="relative bg-cover bg-center bg-fixed h-screen flex flex-col items-center justify-center"
      renderLayer={() => (
        <div className="absolute inset-0 bg-black opacity-60" />
      )}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl pt-30 text-shadow-lg/50">
          Elevate Your Online Presence with our Suite of Custom Web Development Services
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-shadow-lg/50">
          From scalable React applications and TailwindCSS designs to data‑driven SEO optimization and dedicated ongoing support, B Squared Solutions delivers digital experiences that attract visitors, convert leads, and fuel your business growth.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#contact"
            className="px-6 py-3 bg-[#0187e3] hover:bg-[#3B82F6] text-white font-semibold rounded animate-bounce-slow hover:bg-opacity-90"
          >
            Learn How We Can Help
          </a>
        </div>
      </div>
    </Parallax>
  );
}
