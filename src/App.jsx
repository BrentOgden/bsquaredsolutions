import React from "react";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Services  from "./components/Services";
import About     from "./components/About";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";
import Pricing   from "./components/Pricing"
import QuoteScroller from "./components/Quotes";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    
    <div className="flex flex-col overflow-x-hidden min-h-screen">
      
      <Navbar />
      <ScrollToTop />
       

      <main className="flex-grow">
        <Hero />
        <Services />
        <Pricing />
        <QuoteScroller />
        <About />
       
        <Contact />
      </main>

      <Footer />
      
    </div>
    
  );
}
