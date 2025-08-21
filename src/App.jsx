// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "@dr.pogodin/react-helmet";

import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import QuoteScroller from "./components/Quotes";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import HashScroll from "./components/HashScroll";
import ContactForm from "./components/ContactForm";
import Checkout from "./components/Checkout";
import CheckoutVenmo from "./components/CheckoutVenmo";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import FAQ from "./components/FAQ";
import Portfolio from "./components/Portfolio";
import Packages from "./components/Packages";
import Templates from "./components/Templates";
import Blog from "./pages/Blog";
import BlogPostTest from "./pages/Blogs/BlogPostTest";
import SimpleTemplate from "./pages/SimpleTemplate";
import BasicTemplate from "./pages/BasicTemplate";
import SmallBusinessTemplate from "./pages/SmallBusinessTemplate";
import ContactPage from "./pages/Contact"; // renamed to avoid conflict

/* ✅ Site-wide SEO (head-only; no UI changes) */
import SEO from "./components/SEO";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col overflow-x-hidden min-h-screen">
          {/* Global defaults */}
          <SEO
            title="B Squared Solutions | Custom Websites, Templates & Maintenance"
            description="Denver-based web studio building fast, SEO-friendly React & CMS sites. Custom builds, ready-made templates, and ongoing maintenance to keep you speedy and secure."
            path="/"
            type="website"
            image="https://bsquaredsolutions.io/bsquaredlogo2.png"
            schema={[
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "B Squared Solutions",
                "url": "https://bsquaredsolutions.io",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target":
                    "https://bsquaredsolutions.io/blog?query={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "B Squared Solutions",
                "url": "https://bsquaredsolutions.io",
                "logo": "https://bsquaredsolutions.io/bsquaredlogo2.png",
                "sameAs": [
                  "https://www.linkedin.com/company/b-squared-solutions",
                  "https://github.com/"
                ],
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+1-720-254-5354",
                    "contactType": "customer service",
                    "areaServed": "US",
                  },
                ],
              },
            ]}
          />

          <NavBar />
          <ScrollManager />
          <HashScroll />

          <main className="flex-grow">
            <Routes>
              {/* Home (all sections on one page) */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Services />
                    <Pricing />
                    <QuoteScroller />
                    <About />
                    <ContactForm />
                  </>
                }
              />

              {/* Full‐page routes */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkoutvenmo" element={<CheckoutVenmo />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/basictemplate" element={<BasicTemplate />} />
              <Route path="/simpletemplate" element={<SimpleTemplate />} />
              <Route path="/smallbusinesstemplate" element={<SmallBusinessTemplate />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostTest />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
