// src/components/FAQ.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import faqHero from "../assets/packageHero.jpg";
// Optionally import a main-section background image and pass it in via props
// import faqMainBg from "../assets/faqMainBg.jpg";

/* ✅ SEO (no style changes) */
import SEO from "./SEO";

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

/* ── Data (links now use Markdown) ───────────────────────────────────── */
const faqs = [
  {
    question: "How long does it take to build a custom website?",
    answer:
      "Typical turnaround for a standard 5–7 page site is 2–4 weeks, depending on complexity, feedback cycles, and content readiness. We’ll provide a detailed timeline in your proposal. Upon agreement to begin a project, an estimated timeline will be given and we will do our best to meet that timeline. If there are any delays we will notify you as soon as they arise.",
  },
  {
    question: "What technologies do you use for your custom sites?",
    answer:
      "We build primarily in React for dynamic UIs and can accomodate either single-page applications or multi-page sites. We use Tailwind CSS for efficiency and utility-first styling, and can integrate with headless CMS platforms like Contentful or Sanity on request. For e-commerce sites, we often choose to work with Shopify.",
  },
  {
    question: "Which CMS platforms are available if I choose a CMS site build?",
    answer:
      "Our specialty is WordPress, Shopify, AEM and Duda but we have experience working and building in many other CMS platforms and are happy to discuss other CMS options with you during your initial consultation. NOTE: With the CMS option, the cost of any custom plugins or themes (if you choose one that is prebuilt) that require monthly subscription fees will be your responsibility.",
  },
  {
    question: "Do I need to purchase a domain or hosting before you build my site?",
    answer:
      "If you have already secured a domain that you prefer we will be happy to set up the DNS with whichever provider you would like (or point your new site to the existing service). If you have a domain in mind, but have not yet purchased it, we will secure that domain for you before the build process begins. NOTE: You are responsible for the yearly domain and hosting fees.",
  },
  {
    question: "Why are the domain and hosting fees not included in the initial cost?",
    answer:
      "We require you to handle the domain and hosting fees so that we can provide you a quality product without a monthly or yearly subscription. By keeping those costs and recurring charges with you, we provide the flexibility for you to handle your new site moving forward with no disruptions or hassle. Once your site is completed, YOU are in control. If we included those costs, we would have to charge a monthy or yearly subscription, and we prefer to give you the freedom to own your finished site on your terms.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes! We include 6 months of support with all of our custom build plans and 3 months with our CMS sites. After that, we offer various maintenance plans that start at $50/hr and include content updates, performance tuning, security patches, and feature enhancements. If you want the confidence of knowing we are always available, we also offer [monthly maintenance](/packages#maintenance) options (you can cancel at any time).",
  },
  {
    question: "Can I purchase a maintenance plan even if you don't build my site?",
    answer:
      "Absolutely! We are experienced across several frameworks and CMS providers and are happy to provide support for existing sites. If you need content updates, a new plugin built, layout updates or anything else on an existing site, our [maintenance plan](/packages#maintenance) option is for you.",
  },
  {
    question: "How does payment work?",
    answer:
      "For a brand new site build (custom or CMS) we require a 50% deposit to get started and will collect the remaining 50% upon final delivery. For hourly projects (such as maintenance plans or general web administration), we bill a minimum of 2 hours. We will always give you the maintenance and support for the full time that you are billed. We prefer to accept payment via Venmo so that we can provide services without having to charge a processing fee.",
  },
  {
    question: "Can you help with SEO and marketing?",
    answer:
      "Absolutely! Our website build packages include intitial custom SEO integration and Google Analytics. We also offer on-page SEO audits, keyword research, Google Analytics/Tag Manager setup, and basic content strategy for existing sites to help your site rank and convert (for existing sites, you would select the [maintenance plan](/packages#maintenance) option).",
  },
  {
    question: "Once the site is complete, do you charge a monthy fee for maintenance or monitoring?",
    answer:
      "All site builds include maintenance (content updates, asset updates, requested enhancements, etc.) for the specified period (3 months for CMS and 6 months for custom). Once that period has expired, you can choose one of our [maintenance and support](/packages#maintenance) options if desired and we will continue to provide updates and support. NOTE: For CMS hosted sites, you will receive a login to the dashboard so that you may make updates yourself if you prefer.",
  },
  {
    question: "What if I need a service that is not listed on your site?",
    answer:
      "We have years of experience across multiple technology channels and are happy to provide our services for any web project that you need. If you need a service that is not explicity mentioned on the site, send us an email or fill out the [contact form](/contact) and we will see if we can help.",
  },
  {
    question: "After my maintenance period has expired, can I choose to make updates on my own?",
    answer:
      "Absolutely! Unlike many of the other guys, we do not charge a monthly or yearly fee to manage or maintain your site. After the included maintenance period you are free to take full control of your site and do with it as you wish. Your site is YOUR site. No matter what you decide, we will always be here with our [maintenance and support](/packages#maintenance) options should the need arise in the future.",
  },
  {
    question: "Do you provide standalone design services, or am I required to have you build my site if you do the design?",
    answer:
      "We are more than happy to work with you to design a site that meets your needs whether you want us to build the site or not. However, we feel like we are best qualified to bring that design to fruition and would love to do the entire project for you. If you want standalone design services only, [send us an email](mailto:info@bsquaredsolutions.io?subject=Design%20Inquiry) or fill out the [contact form](/contact) and we will provide a free initial consultation.",
  },
  {
    question: "How do you determine the custom price to build my website?",
    answer:
      "The quote that we provide will be based on several factors including complexity of the site (how many pages, backend functionality, etc.), estimated time to complete the project, amount of assets/volume of copy and whether or not integrations are needed (i.e. Shopify). There is no specific hourly rate for these sites, but an estimate of the # of hours needed is factored into the quote. If the project takes significantly less time than quoted, we can work with you to adjust the final payment. To see the general base prices for our different packages, you can check out our [package pricing](/packages).",
  },
  {
    question: "Why do you charge 50% of the fee upfront? Can't I just pay the entire amount when the site is completed?",
    answer:
      "We charge 50% of the total cost as a deposit so that we can assure that we devote the time necessary to provide you with the best product possible. This deposit ensures that our time (and yours) is given the respect and priority that it deserves. Once the project is finished and you have reviewed and approved the final product, we will collect the final payment and give you full access to the site and any other tools that were used.",
  },
];

/* JSON-LD built from your existing data (no style changes) */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.answer
    }
  }))
};

/* ── Item ────────────────────────────────────────────────────────────── */
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const contentId = `faq-${question.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="border-b border-white/10 last:border-none">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex justify-between items-center p-5 sm:p-6 hover:bg-[linear-gradient(120deg,_#0B3E73_0%,_#145DA0_50%,_#3D86CA_100%)] transition"
      >
        <span className="text-base sm:text-lg font-semibold text-white">
          {question}
        </span>
        <span className="ml-4 text-white">
          {open ? <IoIosArrowUp className="text-2xl" /> : <IoIosArrowDown className="text-2xl" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 text-white mt-2 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children, ...props }) => {
                    const external = /^https?:\/\//i.test(href || "");
                    return (
                      <a
                        href={href}
                        {...props}
                        className="text-blue-300 hover:text-blue-200"
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {children}
                      </a>
                    );
                  },
                  p: (props) => <p className="mb-3" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
/**
 * Props:
 * - contentBgImage: string | undefined (URL or imported asset) to show behind the main FAQ section
 * - overlayOpacity: number (0.0–1.0) for a subtle dark overlay above the image/gradient (default 0.15)
 *
 * Example:
 * <FAQ contentBgImage={faqMainBg} overlayOpacity={0.12} />
 */
export default function FAQ({ contentBgImage, overlayOpacity = 0.15 }) {
  return (
    <>
      {/* SEO only; no style changes anywhere */}
      <SEO
        title="Website FAQs | B Squared Solutions"
        description="Answers to common questions about timelines, pricing, tech stack, maintenance plans, and support for your new website."
        path="/faq"
        image="https://bsquaredsolutions.io/og-default.svg"
        schema={faqSchema}
      />

      {/* HERO (image-based, unchanged) */}
      <section id="faq-hero" className="relative mt-10 pb-10 isolate overflow-hidden bg-gray-900">
        {/* Background image (parallax) */}
        <Parallax speed={0.45} respectPRM={false} className="absolute inset-0 -z-20">
          <img
            alt="FAQ backdrop"
            src={faqHero}
            className="size-full object-cover object-center"
          />
        </Parallax>

        {/* Brand gradient overlay */}
        <Parallax speed={0.07} respectPRM={false} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-black/80 to-black/70" />
        </Parallax>

        {/* Accent blob */}
        <Parallax speed={0.04} respectPRM={false} className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-[linear-gradient(120deg,_#0B3E73_0%,_#145DA0_50%,_#3D86CA_100%)] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </Parallax>

        {/* Copy */}
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center lg:text-left">
            <span className="hidden sm:inline-flex items-center rounded-full mb-3 px-3 py-1 text-lg text-white ring-2 ring-white/90">
              FAQ
            </span>
            <h1 className="text-5xl font-semibold text-shadow-lg/50 tracking-tight text-pretty text-white sm:text-6xl">
              Frequently Asked Questions
            </h1>
            <h4 className="text-white text-2xl mt-4 text-shadow-lg/50">
              Your questions on timelines, costs, and maintenance—answered.
            </h4>
          </div>
        </div>
      </section>

      {/* CONTENT — optional background image with low-opacity overlay */}
      <section className="relative">
        {/* Background (image if provided, otherwise gradient) */}
        {contentBgImage ? (
          <Parallax speed={0.2} respectPRM={false} className="absolute inset-0 -z-20">
            <img
              alt="FAQ section background"
              src={contentBgImage}
              className="h-full w-full object-cover object-center"
            />
          </Parallax>
        ) : (
          <div
            className="absolute inset-0 -z-20"
            style={{
              background:
                "linear-gradient(120deg, #0B3E73 0%, #145DA0 50%, #3D86CA 100%)",
            }}
          />
        )}

        {/* Low-opacity dark overlay */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
          {/* Glass wrapper */}
          <div className="rounded-3xl bg-black/65 ring-1 ring-black/10 glow backdrop-blur-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)] p-2 sm:p-4">
            {/* Inner panel */}
            <div className="bg-black/65 rounded-2xl ring-1 ring-black/10 overflow-hidden">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
