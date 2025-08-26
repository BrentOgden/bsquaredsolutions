// src/components/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import hero from "../assets/contactHero.jpg";
import SiteHero from "../components/SiteHero";
/* ✅ SEO (added; head-only, no visual changes) */
import SEO from "../components/SEO";

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

/* ── Form helpers ────────────────────────────────────────────────────── */
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  botField: "", // honeypot
};

function Field({ label, children, required }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/90">
        {label} {required && <span className="text-white/80">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

/* ── Unified field styles ─────────────────────────────────────────────── */
const baseField =
  "w-full rounded-lg h-12 bg-white/90 text-gray-900 placeholder-gray-500 " +
  "ring-1 ring-gray-200 px-4 py-3 transition " +
  "focus:outline-none focus:ring-2 focus:ring-[#0185e4]";

function Input(props) {
  return <input {...props} className={`${baseField} ${props.className || ""}`} />;
}
function Select({ className = "", children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${baseField} appearance-none pr-10 ${className}`}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.2 3.33a.75.75 0 0 1-.94 0l-4.2-3.33a.75.75 0 0 1 .02-1.18z" />
      </svg>
    </div>
  );
}
function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`${baseField} min-h-[7rem] h-auto ${props.className || ""}`}
    />
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.botField) return; // honeypot
    setSubmitting(true);
    setError("");
    setSent(false);
    try {
      const payload = {
        email: form.email,
        fname: form.firstName,
        lname: form.lastName,
        phone: form.phone,
        company: form.company,
        website: form.website,
        ptype: form.projectType,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message,
      };

      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Subscribe failed");
      }

      setSent(true);
      setForm(initialForm);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ✅ JSON-LD (head-only; no UI changes) */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bsquaredsolutions.io/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://bsquaredsolutions.io/contact" }
    ]
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "B Squared Solutions",
    "url": "https://bsquaredsolutions.io",
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+1-720-254-5354",
      "contactType": "customer support",
      "areaServed": "US",
      "availableLanguage": ["English"]
    }]
  };
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact B Squared Solutions",
    "url": "https://bsquaredsolutions.io/contact",
    "mainEntity": organizationSchema
  };

  return (
    <>
      {/* ✅ SEO (added) */}
      <SEO
        title="Contact Us | B Squared Solutions"
        description="Get in touch about custom websites, CMS builds, templates, or maintenance. We’ll reply with next steps."
        path="/contact"
        image="https://bsquaredsolutions.io/og-default.svg"
        schema={[breadcrumbSchema, contactPageSchema]}
      />

      {/* HERO */}
      <SiteHero
        id="contact-hero"
        imageSrc={hero}
        kicker="Contact Us"
        title="Let’s talk about your project."
        subtitle={
          <>
            Share a few details and we’ll get back to you with next steps.
          </>

        }
        size="short"
        // or force an exact height:
        // height="70vh"
        align="center"
        parallax
      />


      {/* CONTENT */}
      <section className="relative bg-[linear-gradient(120deg,_#0B3E73_0%,_#145DA0_50%,_#3D86CA_100%)]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Contact details */}
            <motion.aside
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl bg-gradient-to-b from-black/10 to-black/5 ring-1 ring-black/20 backdrop-blur-2xl p-6 lg:sticky lg:top-6 h-max"
            >
              <h3 className="text-white text-2xl font-bold mb-4">Get in touch</h3>
              <p className="text-white/90 mb-6">
                Prefer email or a quick call? We’re happy to connect however you like.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FiMail className="mt-1 text-white/90" />
                  <div>
                    <div className="text-white/80 text-sm">Email</div>
                    <a href="mailto:support@bsquaredsolutions.com" className="text-white font-semibold hover:underline">
                      info@bsquaredsolutions.com
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
              </ul>
              <div className="mt-6 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                <p className="text-white/90 text-sm">
                  Looking for maintenance on a current site or a template install? Mention it in the form so we can route your request properly.
                </p>
              </div>
            </motion.aside>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
              className="lg:col-span-2 rounded-3xl bg-gradient-to-b from-black/10 to-black/5 ring-1 ring-black/20 backdrop-blur-2xl p-6 sm:p-8"
            >
              <form onSubmit={onSubmit} noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="botField"
                  value={form.botField}
                  onChange={onChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="First name" required>
                    <Input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                      required
                      placeholder="Jane"
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field label="Last name" required>
                    <Input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                      required
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                  </Field>

                  <Field label="Email" required>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Phone">
                    <Input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label="Company">
                    <Input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={onChange}
                      placeholder="Your company"
                      autoComplete="organization"
                    />
                  </Field>
                  <Field label="Website">
                    <Input
                      type="url"
                      name="website"
                      value={form.website}
                      onChange={onChange}
                      placeholder="https://example.com"
                      autoComplete="url"
                    />
                  </Field>

                  <Field label="Project type">
                    <Select name="projectType" value={form.projectType} onChange={onChange}>
                      <option value="">Select…</option>
                      <option>Custom Build</option>
                      <option>CMS Site</option>
                      <option>Maintenance / Updates</option>
                      <option>Template Install</option>
                      <option>Other</option>
                    </Select>
                  </Field>

                  <Field label="Budget">
                    <Select name="budget" value={form.budget} onChange={onChange}>
                      <option value="">Select…</option>
                      <option>Under $2,000</option>
                      <option>$2,000 – $5,000</option>
                      <option>$5,000 – $10,000</option>
                      <option>$10,000+</option>
                    </Select>
                  </Field>

                  <Field label="Timeline">
                    <Select name="timeline" value={form.timeline} onChange={onChange}>
                      <option value="">Select…</option>
                      <option>ASAP</option>
                      <option>2–4 weeks</option>
                      <option>1–2 months</option>
                      <option>Flexible</option>
                    </Select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="How can we help?" required>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        placeholder="Tell us about your goals, specific features you need, or links to example sites that inspire you."
                        rows={6}
                        required
                      />
                    </Field>
                  </div>
                </div>

                {error && <p className="mt-4 text-red-200">{error}</p>}
                {sent && (
                  <p className="mt-4 text-emerald-200">
                    Thanks! Your message has been sent. We’ll reply shortly.
                  </p>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-[#0185e4]/90 transition disabled:opacity-70"
                  >
                    <FiSend />
                    {submitting ? "Sending…" : "Send message"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
