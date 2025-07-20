// server.js
import dotenv from "dotenv";
import express from "express";
import braintree from "braintree";
import cors from "cors";

// Load .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure Braintree gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,      // or .Production
  merchantId:   process.env.BT_MERCHANT_ID,
  publicKey:    process.env.BT_PUBLIC_KEY,
  privateKey:   process.env.BT_PRIVATE_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Generate client token
app.get("/client_token", async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.json({ clientToken: response.clientToken });
  } catch (err) {
    console.error("Braintree Token Error:", err);
    res.status(500).json({ error: "Failed to generate client token" });
  }
});

// Process checkout
app.post("/checkout", async (req, res) => {
  const { paymentMethodNonce, amount } = req.body;
  try {
    const result = await gateway.transaction.sale({
      amount,
      paymentMethodNonce,
      options: { submitForSettlement: true },
    });
    if (result.success) {
      return res.json({ success: true, id: result.transaction.id });
    } else {
      return res.status(400).json({ success: false, error: result.message });
    }
  } catch (err) {
    console.error("Braintree Sale Error:", err);
    res.status(500).json({ success: false, error: "Transaction failed" });
  }
});

app.listen(port, () => {
  console.log(`Braintree server listening on http://localhost:${port}`);
});
