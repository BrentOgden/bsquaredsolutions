// src/components/Contact.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
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
  useEffect(() => {
    const scriptSrc = "https://myformflow.io/embed/widget.js";
    let cancelled = false;

    const initialize = () => {
      if (!cancelled) window.FormflowWidget?.init();
    };

    // The current widget observes dynamically mounted containers in multi-form
    // mode and marks each one initialized, making repeated init calls safe.
    if (window.FormflowWidget?.init) {
      initialize();
      return () => { cancelled = true; };
    }

    let script = document.querySelector(`script[src="${scriptSrc}"]`);
    const isNewScript = !script;
    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
    }
    script.addEventListener("load", initialize);
    if (isNewScript) document.body.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener("load", initialize);
    };
  }, []);

  return (
    <>
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
                Share some background on what you’d like to build—whether it’s a custom website, a CMS solution, an eCommerce platform, or ongoing maintenance on your existing site. Your answers help us prepare for a productive consultation.
              </p>
              <p className="text-white text-sm">
                Once submitted, we’ll schedule a complimentary consultation to review your goals and recommend the best path forward.
              </p>

              <div className="mt-6 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                <h3 className="text-white text-xl font-bold mb-3">Share Your Vision</h3>
                <p className="text-white text-sm">
                  Include links to websites you admire directly in the form. If you have design mockups or additional materials, you can email them to us anytime.
                </p>
                <a
                  href="mailto:info@bsquaredsolutions.io"
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
                <div
                  id="formflow-embed"
                  data-multiple-form="true"
                  data-instance-id="homepage-contact"
                  data-form-id="13586481-0748-484e-9956-ca195467f084"
                  className="bg-white rounded-2xl p-4 sm:p-6"
                />
                <style>{`
                  #formflow-embed, #formflow-embed * { font-family: inherit; }
                  #formflow-embed button[type="submit"] {
                    background: var(--primary);
                    border-radius: 0.75rem;
                    padding: 0.75rem 1.25rem;
                    font-weight: 600;
                    color: #fff;
                  }
                  #formflow-embed button[type="submit"]:hover { filter: brightness(0.95); }
                  #formflow-embed input, #formflow-embed textarea, #formflow-embed select {
                    border-radius: 0.5rem;
                  }
                  #formflow-embed a { color: #0ea5e9; }
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
