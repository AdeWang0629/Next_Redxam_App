import express from 'express';
import { stripeInstance } from '@/apis/stripe';
import { Deposits, DepositsCurrencyType, DepositsType } from '@/database';
import Stripe from 'stripe';
import cardsBrands from '@/assets/cardsBrands';

const router = express.Router();

/**
 * Stripe Webhook
 * Receives transaction & other event status changes from Stripe
 * ref: Stripe
 */
const stripeWebhook = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripeInstance.webhooks.constructEvent(
      // @ts-ignore
      req.rawBody,
      sig,
      process.env.NODE_ENV === 'production'
        ? process.env.STRIPE_WEBHOOK_SECRET_PROD
        : process.env.STRIPE_WEBHOOK_SECRET_DEV,
    );

    if (event.type === 'checkout.session.completed') {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      if (checkoutSession.payment_status === 'paid') {
        let paymentIntent = await stripeInstance.paymentIntents.retrieve(
          checkoutSession.payment_intent.toString(),
          {
            expand: ['payment_method'],
          },
        );

        let paymentMethod =
          paymentIntent.payment_method as Stripe.PaymentMethod;

        await Deposits.create({
          userId: checkoutSession.metadata.user_id,
          type: DepositsType.FIAT,
          currency: DepositsCurrencyType.USD,
          amount: checkoutSession.amount_total / 100,
          timestamp: new Date().getTime(),
          status: 'completed',
          stripeChargeId: checkoutSession.id,
          bankName: 'Card',
          bankIcon: cardsBrands?.[paymentMethod.card.brand] || '',
          bankType: paymentMethod.card.brand,
        });
      }
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      if (charge.status === 'succeeded') {
        Deposits.updateOne(
          { userId: charge.metadata.user_id, stripeChargeId: charge.id },
          { $set: { status: 'completed' } },
        );
      }
    }

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
        stack: error.stack,
      },
    });
  }
};

export default stripeWebhook;
