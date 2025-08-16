// src/components/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
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

  return (
    <>
      {/* HERO */}
      <section id="contact-hero" className="relative mt-10 pb-10 isolate overflow-hidden bg-gray-900">
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
              Share a few details and we’ll get back to you with next steps.
            </p>
          </motion.div>
        </div>
      </section>

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
              className="rounded-3xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/20 backdrop-blur-2xl p-6 lg:sticky lg:top-6 h-max"
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
              className="lg:col-span-2 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/20 backdrop-blur-2xl p-6 sm:p-8"
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
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition disabled:opacity-70"
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
