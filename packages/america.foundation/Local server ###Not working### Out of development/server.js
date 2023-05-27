require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post("/signup.stripe", async (req, res) => {
  const {
    uid,
    email,
    firstname,
    lastname,
    phonenumber,
    usertype,
    // tax_id_type,
    // tax_id_data_value,
    address_line1,
    address_line2,
    address_city,
    address_state,
    address_postal_code,
    address_country,
  } = req.body;
  try {
    const customer = await stripe.customers.create({
      id: uid,
      name: firstname + lastname,
      email: email,
      phone: phonenumber,
      address: {
        line1: address_line1,
        line2: address_line2,
        city: address_city,
        state: address_state,
        postal_code: address_postal_code,
        country: address_country,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
  try {
    const account = await stripe.accounts.create({
      email: email,
      country: address_country,
      type: "custom",
      business_type: usertype,
      capabilities: {
        treasury: { requested: true },
        card_payments: { requested: true },
        us_bank_account_ach_payments: { requested: true },
        transfers: { requested: true },
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

app.post("/setupIntent.stripe", async (req, res) => {
  const { uid } = req.body;
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: uid,
      payment_method_types: [
        // "bancontact",
        "card",
        // "ideal",
        // "wechat_pay",
        "us_bank_account",
        // "sofort",
        // "sepa_debit",
        // "promptpay",
        // "pix",
        // "paynow",
        // "p24",
        // "oxxo",
        // "link",
        // "konbini",
        // "klarna",
        // "interac_present",
        // "grabpay",
        // "giropay",
        // "fpx",
        // "eps",
        // "customer_balance",
        // "card_present",
        // "boleto",
        // "blik",
        // "bancontact",
        // "bacs_debit",
        // "au_becs_debit",
        // "alipay",
        // "afterpay_clearpay",
        // "affirm",
        // "acss_debit",
      ],
    });
    res.json({ client_secret: setupIntent.client_secret });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

app.post("/paymentMethods.list.stripe", async (req, res) => {
  const { uid } = req.body;
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: uid,
    });
    res.json(paymentMethods.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

app.post("/paymentIntents.create.stripe", async (req, res) => {
  const { uid, amountstripe, payment_method } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountstripe,
      currency: "usd",
      customer: uid,
      payment_method: payment_method,
      payment_method_types: ["card", "us_bank_account"],
      off_session: false,
      confirm: true,
    });
    console.log("Transfer successful with PaymentIntent: ", paymentIntent.id);
  } catch (err) {
    console.log("Error code is: ", err.code);
    if (err.code === "authentication_required") {
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
        err.raw.payment_intent.id
      );
      console.log("PI retrieved: ", paymentIntentRetrieved.id);
    }
  }
});

app.listen(8000);
