import braintree from "braintree";
import dotenv from "dotenv";
dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:  process.env.BT_MERCHANT_ID,
  publicKey:   process.env.BT_PUBLIC_KEY,
  privateKey:  process.env.BT_PRIVATE_KEY,
});

export default async function handler(req, res) {
  const { paymentMethodNonce, amount } = req.body;
  try {
    const result = await gateway.transaction.sale({
      amount,
      paymentMethodNonce,
      options: { submitForSettlement: true },
    });
    if (result.success) {
      res.status(200).json({ success: true, id: result.transaction.id });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "transaction_error" });
  }
}
