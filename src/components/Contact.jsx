// src/components/Contact.jsx
import React, { useState, useEffect } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // After showing “thanks”, reload page in 2s
  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setTimeout(() => window.location.reload(), 2000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = (e) => {
    // Let the browser do the POST, then show our thank‑you
    e.preventDefault();
    const form = e.target;
    fetch(form.action, {
      method: form.method,
      headers: { "Accept": "application/json" },
      body: new FormData(form),
    }).then((res) => {
      if (res.ok) {
        setSubmitted(true);
      } else {
        res.json().then(data => {
          console.error(data);
          alert("Submission failed. Please try again.");
        });
      }
    });
  };

  return (
    <section
      id="contact"
      className="container relative scroll-mt-20 mx-auto px-6 py-20"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
         Get Your Free Web Development Quote Today!
      </h2>

      {submitted ? (
        <p className="text-primary text-center text-4xl">
          Thanks for contacting us! We’ll be in touch shortly.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/xgvzonaq"
          method="POST"
          className="max-w-xl mx-auto space-y-6"
        >
          {/* honeypot to catch bots */}
          <p style={{ display: "none" }}>
            <label>
              Don’t fill this out if you’re human:{" "}
              <input name="_gotcha" />
            </label>
          </p>

          {/* your Reply‑To header */}
          <input type="hidden" name="_replyto" />

          <input
            name="name"
            required
            type="text"
            placeholder="Your Name*"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            name="email"
            required
            type="email"
            placeholder="Your Email*"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            name="phone"
            type="phone"
            placeholder="Your Phone Number"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <textarea
            name="message"
            required
            rows="4"
            placeholder="How can we help?*"
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
