// src/components/Navbar.jsx
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from '../assets/bsquaredlogo2.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  
  // Added "FAQ" at the end
  const links = ["Home", "Services", "Pricing", "About", "FAQ", "Contact", ];

  const slugMap = {
    Home: "hero",
    Services: "services",
    Pricing: "pricing",
    About: "about",
    Contact: "contact",
    // no slugMap entry for FAQ
  };

  const handleClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);

    // FAQ is a standalone page
    if (link === "FAQ") {
      window.location.href = "/faq";
      return;
    }

    // For the others, scroll or navigate back home  hash
    const slug = slugMap[link];
    if (window.location.pathname === "/") {
      if (slug === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(slug);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.location.href = `/#${slug}`;
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo always to home top */}
        <a
          href="/#hero"
          onClick={(e) => handleClick(e, "Home")}
          className="flex items-center text-2xl font-bold text-primary"
        >
          <img src={logo} className="h-18 md:h-26 w-auto" alt="B² Solutions Logo" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link}
              href={
                link === "FAQ"
                  ? "/faq"
                  : `/#${slugMap[link]}`
              }
              onClick={(e) => handleClick(e, link)}
              className="text-gray-700 text-xl hover:text-accent hover:border-b transition"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700 text-4xl"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile tray */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-40">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {links.map((link) => (
              <a
                key={link}
                href={
                  link === "FAQ"
                    ? "/faq"
                    : `/#${slugMap[link]}`
                }
                onClick={(e) => handleClick(e, link)}
                className="text-gray-700 text-2xl hover:text-accent transition"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
