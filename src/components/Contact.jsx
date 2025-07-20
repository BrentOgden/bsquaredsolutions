// src/components/Contact.jsx
import React, { useState, useEffect } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let timer;
    if (submitted) {
      // reload the page after 2 seconds
      timer = setTimeout(() => {
        window.location.reload();
        window.screenTop();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire up real submission...
    setSubmitted(true);
  };

  return (
    <section id="contact" className="container relative scroll-mt-20 mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-8"> Get Your Free Web Development Quote Today!</h2>
      {submitted ? (
        <p className="text-primary text-center text-4xl">
          Thanks for contacting us! We’ll be in touch shortly.
        </p>
      ) : (
        <form netlify onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <input
            required
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            required
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <textarea
            required
            rows="4"
            placeholder="How can we help?"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="w-full bg-[#3d86ca] text-white font-semibold px-4 py-3 rounded-lg hover:bg-accent transition-colors duration-200"
          >
            Send Message
          </button>

        </form>
      )}
    </section>
  );
}
