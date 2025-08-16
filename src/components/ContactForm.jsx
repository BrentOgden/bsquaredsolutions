// src/components/Contact.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import hero from "../assets/contactHero.jpg";

/* ── Minimal parallax util (same as other pages) ─────────────────────── */
function useParallax({ speed = 0.7, axis = "y", respectPRM = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (respectPRM && reduce) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const r = el.getBoundingClientRect();
        const offset = r.top + r.height / 2 - window.innerHeight / 2;
        const d = -offset * speed;
        el.style.transform =
          axis === "x" ? `translate3d(${d}px,0,0)` : `translate3d(0,${d}px,0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, axis, respectPRM]);
  return ref;
}
function Parallax({ speed, axis, respectPRM = true, className = "", children }) {
  const ref = useParallax({ speed, axis, respectPRM });
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export default function Contact() {
  const didInitRef = useRef(false);
  const embedRef = useRef(null);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const SCRIPT_SRC = "https://myformflow.io/embed/widget.js";

    function initFormflow() {
      try {
        // If Formflow exposes an API, try common entry points; otherwise it will auto-scan.
        if (window.Formflow?.render) window.Formflow.render();
        else if (window.Formflow?.init) window.Formflow.init();
      } catch { }
    }

    // Reuse existing script if present
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        initFormflow();
      } else {
        existing.addEventListener("load", initFormflow, { once: true });
      }
      return;
    }

    // Inject script once
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      s.setAttribute("data-loaded", "true");
      initFormflow();
    };
    s.onerror = () => console.error("Failed to load Formflow script:", SCRIPT_SRC);
    document.body.appendChild(s);

    // Optional cleanup if supported
    return () => {
      try {
        if (window.Formflow?.unmount && embedRef.current) {
          window.Formflow.unmount(embedRef.current);
        }
      } catch { }
    };
  }, []);

  return (
    <>
      {/* HERO */}
      {/* <section id="contact-hero" className="relative mt-10 pb-10 isolate overflow-hidden bg-gray-900">
        <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
          <img alt="Contact backdrop" src={hero} className="size-full object-cover object-center" />
        </Parallax>
        <Parallax speed={0.07} respectPRM={false} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
        </Parallax>
        <Parallax
          speed={0.04}
          respectPRM={false}
          className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-br from-[#3d86ca] to-[#0185e4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </Parallax>

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center lg:text-left"
          >
            <span className="hidden sm:inline-flex items-center rounded-full mb-3 px-3 py-1 text-lg text-white ring-2 ring-white/90">
              Contact Us
            </span>
            <h1 className="text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">
              Let’s talk about your project.
            </h1>
            <p className="mt-6 text-lg/8 text-white text-shadow-lg/50 sm:text-xl/8">
              Answer a few questions so that we can learn a little more about your vision and be prepared to discuss a plan that works for you.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* CONTENT */}<div id="contactform"></div>
      <section className="relative bg-[linear-gradient(120deg,_#0B3E73_0%,_#145DA0_50%,_#3D86CA_100%)]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Description / contact details */}
            <motion.aside
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl bg-gradient-to-b from-black/10 to-black/5 ring-1 ring-white/5 backdrop-blur-2xl p-6 lg:sticky lg:top-6 h-max"
            >
              <h3 className="text-white text-2xl font-bold mb-3">Tell Us About Your Project</h3>
              <p className="text-white text-sm mb-2">
                Share some background on what you’d like to build — whether it’s a custom website, a CMS solution, an eCommerce platform, or ongoing maintenance on your existing site. Your answers will give our team the insight we need to prepare for a productive consultation.
              </p>
              <p className="text-white text-sm">Once submitted, we’ll schedule a complimentary consultation call to review your goals and discuss the best path forward.</p>
              {/* <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FiMail className="mt-1 text-white/90" />
                  <div>
                    <div className="text-white/80 text-sm">Email</div>
                    <a href="mailto:support@bsquaredsolutions.com" className="text-white font-semibold hover:underline">
                      support@bsquaredsolutions.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FiPhone className="mt-1 text-white/90" />
                  <div>
                    <div className="text-white/80 text-sm">Phone</div>
                    <a href="tel:+17202545354" className="text-white font-semibold hover:underline">
                      (720) 254-5354
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-1 text-white/90" />
                  <div>
                    <div className="text-white/80 text-sm">Location</div>
                    <div className="text-white font-semibold">US-based</div>
                  </div>
                </li>
              </ul> */}

              <div className="mt-6 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                
                  <h3 className="text-white text-xl font-bold mb-3">Share Your Vision</h3>
                  <p className="text-white text-sm">
                   To help us better understand your vision, feel free to include links to websites you admire directly in the form. If you have design mockups or additional materials that convey your vision, feel free to email them to us at the link below.
                  </p>

                  <a
                    href="mailto:support@bsquaredsolutions.com"
                    className="inline-flex mt-4 items-center gap-2 rounded-lg bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90 transition"
                  >
                    <FiMail className="h-5 w-5" />
                    Send Us Your Files
                  </a>
              </div>
            </motion.aside>

            {/* Right: Formflow embed */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
              className="lg:col-span-2 rounded-3xl bg-gradient-to-b from-black/10 to-black/5 ring-1 ring-white/5 backdrop-blur-2xl p-4 sm:p-6"
            >
              <div className="max-w-6xl ml-auto">
                {/* Formflow host node */}
                <div
                  ref={embedRef}
                  id="formflow-embed"
                  data-form-id="13586481-0748-484e-9956-ca195467f084"
                  className="bg-white rounded-2xl p-4 sm:p-6"
                />
                {/* Theme nudge: inherit fonts & primary color */}
                <style>{`
                  #formflow-embed, #formflow-embed * { font-family: inherit; }
                  #formflow-embed button[type="submit"] {
                    background: var(--primary);
                    border-radius: 0.75rem; /* 12px to match rounded-2xl vibe */
                    padding: 0.75rem 1.25rem;
                    font-weight: 600;
                    color: #fff;
                  }
                  #formflow-embed button[type="submit"]:hover { filter: brightness(0.95); }
                  #formflow-embed input, #formflow-embed textarea, #formflow-embed select {
                    border-radius: 0.5rem;
                  }
                  #formflow-embed a { color: #0ea5e9; } /* subtle link color inside form */
                `}</style>
              </div>
              <noscript>
                <p className="text-center text-red-200 mt-4">
                  Please enable JavaScript to load the contact form.
                </p>
              </noscript>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
