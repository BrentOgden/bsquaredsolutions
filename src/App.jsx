// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";

import Navbar from "./components/NavBar";
import Hero      from "./components/Hero";
import Services  from "./components/Services";
import Pricing   from "./components/Pricing";
import QuoteScroller from "./components/Quotes";
import About     from "./components/About";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Checkout  from "./components/Checkout";
import HashScroll from "./components/HashScroll";

export default function App() {
  return (
    // Use HashRouter if you’re hosting statically and want anchor‐only routing,
    // otherwise BrowserRouter is fine if your host rewrites 404→index.html.
    <Router>
      <div className="flex flex-col overflow-x-hidden min-h-screen">
        <Navbar />
        <ScrollToTop />
        <HashScroll />

        <main className="flex-grow">
          <Routes>
            {/* “Home” route: all your anchor‐scroll sections */}
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

            {/* Checkout route: full page navigation */}
            <Route
              path="/checkout"
              element={
                <>
                  {/* you can still show the same Navbar & Footer for consistency */}
                  <Checkout />
                </>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
