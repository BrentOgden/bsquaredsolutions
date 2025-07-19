// src/components/Navbar.jsx
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from '../assets/bsquaredlogo2.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Home","Services","Pricing","About","Contact"];

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center text-2xl font-bold text-primary">
          <img src={logo} className="h-26 w-auto" alt="B² Solutions Logo" />
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) =>
            link === "Home" ? (
              <a
                key={link}
                href="#"
                onClick={handleHomeClick}
                className="text-gray-700 text-xl hover:text-[#3B82F6] transition"
              >
                {link}
              </a>
            ) : (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 text-xl hover:text-[#3B82F6] transition"
              >
                {link}
              </a>
            )
          )}
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
            {/* Optional close icon inside tray */}
            {/* <button
              className="self-end text-gray-700 text-2xl"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button> */}
            {links.map((link) =>
              link === "Home" ? (
                <a
                  key={link}
                  href="#"
                  onClick={handleHomeClick}
                  className="text-gray-700 text-2xl hover:text-[#3B82F6] transition"
                >
                  {link}
                </a>
              ) : (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 text-2xl hover:text-[#3B82F6] transition"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
