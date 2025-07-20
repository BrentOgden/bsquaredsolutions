// api/client_token.js
import braintree from "braintree";
import dotenv from "dotenv";
dotenv.config();

// Choose the Braintree environment from an env var (set this in Vercel)
const btEnv = process.env.BRAINTREE_ENV === "Production"
  ? braintree.Environment.Production
  : braintree.Environment.Sandbox;

console.log("▶️ Braintree using environment:", btEnv === braintree.Environment.Production ? "Production" : "Sandbox");

const gateway = new braintree.BraintreeGateway({
  environment: btEnv,
  merchantId:  process.env.BT_MERCHANT_ID,
  publicKey:   process.env.BT_PUBLIC_KEY,
  privateKey:  process.env.BT_PRIVATE_KEY,
});

export default async function handler(req, res) {
  try {
    const { clientToken } = await gateway.clientToken.generate({});
    return res.status(200).json({ clientToken });
  } catch (err) {
    console.error("🔥 Braintree token error:", err);
    return res.status(500).json({ error: err.message || "token_error" });
  }
}
