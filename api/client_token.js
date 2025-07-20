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
  try {
    const { clientToken } = await gateway.clientToken.generate({});
    res.status(200).json({ clientToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "token_error" });
  }
}
