// src/components/CheckoutVenmo.jsx
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SiVenmo } from "react-icons/si";

export default function CheckoutVenmo() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan") || "Your Plan";
  const amountParam = searchParams.get("amount") || "0.00";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const venmoUsername = "bsquaredsolutions";
  const note = encodeURIComponent(`Payment for ${planParam} - $${amountParam}`);
  const venmoLink = `venmo://paycharge?txn=pay&recipients=${venmoUsername}&amount=${amountParam}&note=${note}`;
  const fallbackLink = `https://venmo.com/${venmoUsername}?txn=pay&amount=${amountParam}&note=${note}`;

  return (
    <section id="checkout-venmo" className="container mx-auto px-6 mt-20 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Instructions */}
        <div className="px-8">
          <p className="mb-6">
            To help us receive the full amount of your payment without Venmo’s transaction fees,
            we request you send your payment as a <strong>GIFT</strong> in the Venmo app.
          </p>
          <p>
            When you open the Venmo payment screen, choose Pay, enter the exact amount shown above,
            select the Friends option (or Business if you’re using a business profile), and in the
            What’s it for? field begin your note with <strong>GIFT</strong> – (for example:
            GIFT – Payment for Custom Site Build). This ensures that Venmo treats the transaction as
            a gift, sparing B Squared Solutions from any additional fees that we would have to pass
            on to you. Once you’ve confirmed the details, tap <strong>Pay</strong> to complete your
            gift payment.
          </p>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Order Summary
            </h3>
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
            <div className="text-center">
              <a
                href={venmoLink}
                onClick={(e) => {
                  // Attempt deep link
                  window.location.href = venmoLink;
                  // Fallback to web after short delay
                  setTimeout(() => {
                    window.location.href = fallbackLink;
                  }, 100);
                  e.preventDefault();
                }}
                className="inline-flex items-center justify-center bg-[#3D86CA] text-white font-semibold px-6 py-1 rounded-lg hover:bg-[#0185e4] transition-colors"
              >
                Pay ${amountParam} via
                <SiVenmo className="ml-2 text-6xl flex-shrink-0" />
              </a>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              You will be prompted to complete payment in the Venmo app or web.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
