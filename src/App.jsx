// src/App.jsx
import React, { Suspense, lazy } from "react";
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
import RouteSEO from "./components/RouteSEO";
import GA4Listener from "./analytics/GA4Listener";

const Checkout = lazy(() => import("./components/Checkout"));
const CheckoutVenmo = lazy(() => import("./components/CheckoutVenmo"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const FAQ = lazy(() => import("./components/FAQ"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Packages = lazy(() => import("./components/Packages"));
const Products = lazy(() => import("./pages/Products"));
const Templates = lazy(() => import("./components/Templates"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostTest = lazy(() => import("./pages/Blogs/BlogPostTest"));
const SimpleTemplate = lazy(() => import("./pages/SimpleTemplate"));
const BasicTemplate = lazy(() => import("./pages/BasicTemplate"));
const SmallBusinessTemplate = lazy(() => import("./pages/SmallBusinessTemplate"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatAssistant = lazy(() => import("./components/ChatAssistant"));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <GA4Listener />
        <RouteSEO />
        <div className="flex flex-col overflow-x-hidden min-h-screen">
          <NavBar />
          <ScrollManager />
          <HashScroll />

          <main className="flex-grow">
            <Suspense fallback={null}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero title="Custom Web Design & Development for Denver Small Businesses" />
                      <Services />
                      <Pricing />
                      <QuoteScroller />
                      <About />
                      <ContactForm />
                    </>
                  }
                />

                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkoutvenmo" element={<CheckoutVenmo />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/products" element={<Products />} />
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
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <Suspense fallback={null}>
            <ChatAssistant />
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}
