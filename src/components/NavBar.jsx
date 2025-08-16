// src/components/Navbar.jsx
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/bsquaredlogo2.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Order shown in the UI
  const links = ["Home", "Services", "Pricing", "About", "FAQ", "Contact"];

  // Sections that live on the home page
  const slugMap = {
    Home: "hero",
    Services: "services",
    Pricing: "pricing",
    About: "about",
    // Contact is a standalone route; FAQ too (no slug here)
  };

  const handleClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);

    // Standalone pages (no hash scroll)
    if (link === "FAQ") {
      navigate("/faq");
      return;
    }
    if (link === "Contact") {
      navigate("/contact");
      return;
    }

    // In-page sections on the Home route
    const slug = slugMap[link];
    if (!slug) return;

    if (location.pathname === "/") {
      if (slug === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(slug);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.hash = `#${slug}`; // fallback
      }
    } else {
      // Let the browser jump to the anchor on the home page
      navigate(`/#${slug}`);
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
          <img src={logo} className="h-18 md:h-22 w-auto" alt="B² Solutions Logo" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link}
              href={
                link === "FAQ"
                  ? "/faq"
                  : link === "Contact"
                  ? "/contact"
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
          aria-expanded={isOpen}
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
                    : link === "Contact"
                    ? "/contact"
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
