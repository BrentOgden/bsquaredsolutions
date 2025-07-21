// src/components/Navbar.jsx
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from '../assets/bsquaredlogo2.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Home","Services","Pricing","About","Contact"];
  const slugMap = {
    Home:     "hero",
    Services: "services",
    Pricing:  "pricing",
    About:    "about",
    Contact:  "contact",
  };

  const handleClick = (e, slug) => {
    e.preventDefault();
    setIsOpen(false);

    // If we're already on the home route, just scroll
    if (window.location.pathname === "/") {
      if (slug === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(slug);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      // If on any other route, navigate back to home + hash
      window.location.href = `/#${slug}`;
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo always scrolls to top */}
        <a
          href="/#hero"
          onClick={(e) => handleClick(e, slugMap.Home)}
          className="flex items-center text-2xl font-bold text-primary"
        >
          <img
            src={logo}
            className="h-18 md:h-26 w-auto"
            alt="B² Solutions Logo"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link}
              href={`/#${slugMap[link]}`}
              onClick={(e) => handleClick(e, slugMap[link])}
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

      {/* Mobile tray below navbar */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-40">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {links.map((link) => (
              <a
                key={link}
                href={`/#${slugMap[link]}`}
                onClick={(e) => handleClick(e, slugMap[link])}
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
