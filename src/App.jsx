// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/NavBar";
import Hero           from "./components/Hero";
import Services       from "./components/Services";
import Pricing        from "./components/Pricing";
import QuoteScroller  from "./components/Quotes";
import About          from "./components/About";
import Contact        from "./components/Contact";
import Footer         from "./components/Footer";
import ScrollToTop    from "./components/ScrollToTop";
import HashScroll     from "./components/HashScroll";
import Checkout       from "./components/Checkout";
import CheckoutVenmo  from "./components/CheckoutVenmo";
import Terms          from "./components/Terms";
import Privacy        from "./components/Privacy";
import FAQ from "./components/FAQ";
import Portfolio from "./components/Portfolio";
import Packages from "./components/Packages";
import Templates from "./components/Templates";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col overflow-x-hidden min-h-screen">
        <Navbar />
        <ScrollToTop />
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
                  
                  <Contact />
                </>
              }
            />

            {/* Full‐page routes */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/checkoutvenmo" element={<CheckoutVenmo />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
