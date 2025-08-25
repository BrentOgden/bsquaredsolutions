// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ContactPage from "./pages/Contact";

import RouteSEO from "./components/RouteSEO";
import GA4Listener from "./analytics/GA4Listener";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <GA4Listener />
        <RouteSEO /> {/* 🔗 route-aware canonicals & JSON-LD */}
        <div className="flex flex-col overflow-x-hidden min-h-screen">
          <NavBar />
          <ScrollManager />
          <HashScroll />

          <main className="flex-grow">
            <Routes>
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

              {/* Full-page routes */}
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

              {/* Optional: client-side catch-all back to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
