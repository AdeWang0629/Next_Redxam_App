import Stripe from 'stripe';

export const stripeInstance = new Stripe(
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_SECRET_KEY_TEST,
  {
    apiVersion: '2020-08-27',
  },
);
