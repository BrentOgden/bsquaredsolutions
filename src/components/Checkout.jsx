// src/components/Checkout.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dropin from "braintree-web-drop-in";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan") || "";
  const amountParam = searchParams.get("amount") || "0.00";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [clientToken, setClientToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropinError, setDropinError] = useState(null);
  const dropinInstance = useRef(null);
  const dropinContainer = useRef();

  // Fetch the Braintree client token
  useEffect(() => {
    fetch("/api/client_token")
      .then((res) => {
        if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
        return res.json();
      })
      .then(({ clientToken }) => {
        setClientToken(clientToken);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Client token error:", err);
        setDropinError("Unable to initialize payment gateway.");
        setLoading(false);
      });
  }, []);

  // Initialize Drop‑In with PayPal & Venmo
  useEffect(() => {
    if (!clientToken) return;
    let instance;
    dropin
      .create({
        authorization: clientToken,
        container: dropinContainer.current,
        paypal: { flow: "vault" },
        venmo: { allowNewBrowserTab: true },
        paymentOptionPriority: ["venmo", "paypal", "card"],
      })
      .then((dropinInst) => {
        instance = dropinInst;
        dropinInstance.current = dropinInst;
        setDropinError(null);
      })
      .catch((err) => {
        console.error("Drop‑In create error:", err);
        setDropinError("Failed to load payment form.");
      });

    return () => {
      if (instance) {
        instance.teardown().catch((teardownErr) => console.error("Teardown error:", teardownErr));
      }
    };
  }, [clientToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!dropinInstance.current) return;
    try {
      const { nonce } = await dropinInstance.current.requestPaymentMethod();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodNonce: nonce,
          amount: amountParam,
          billing: formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Payment successful! Transaction ID: " + data.id);
      } else {
        alert("Payment failed: " + data.error);
      }
    } catch (err) {
      console.error("Payment submission error:", err);
      alert("Error processing payment.");
    }
  };

  return (
    <section id="checkout" className="container mx-auto px-6 mt-20 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        Secure Checkout
      </h2>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Billing Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-primary">Billing Information</h3>

          <input
            name="name"
            required
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            name="email"
            required
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            name="address"
            required
            type="text"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="city"
              required
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              name="state"
              required
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <input
            name="zip"
            required
            type="text"
            placeholder="ZIP / Postal Code"
            value={formData.zip}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <h3 className="text-xl font-semibold text-primary">Payment Details</h3>
          {loading && <p className="text-center">Loading payment form…</p>}
          {dropinError && <p className="text-red-600 text-center">{dropinError}</p>}
          <div ref={dropinContainer} className="mb-6"></div>
        </div>

        {/* Order Summary & Submit */}
        <div>
          <div className="border rounded-lg p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary">Order Summary</h3>
            <ul className="divide-y divide-gray-200 mb-4">
              <li className="flex justify-between py-2">
                {planParam}
                <span className="font-semibold">${amountParam}</span>
              </li>
            </ul>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${amountParam}</span>
            </div>
            <button
              type="submit"
              disabled={loading || !!dropinError}
              className="w-full bg-primary text-white font-semibold px-4 py-3 rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
            >
              Place Order
            </button>
            <p className="text-lg mt-6">Once payment has been received you will receive an email confirming that your project has been approved. </p>
          </div>
        </div>
      </form>
    </section>
  );
}
