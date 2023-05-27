import express from 'express';
import { stripeInstance } from '@/apis/stripe';
import { messages } from '@/config/messages';
import { JWT } from '@/config/jwt';
import { User } from '@/database';

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  if (!req.headers.authorization) return res.json(messages.failed.invalidToken);

  const payload = await new JWT().authorize(req.headers.authorization);

  if (!payload || payload.type !== 'verified') {
    return null;
  }

  const user = await User.findOne({ _id: payload.userId });
  let { amount } = req.body;

  const session = await stripeInstance.checkout.sessions.create({
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Redxam deposit',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      setup_future_usage: 'off_session',
    },
    mode: 'payment',
    success_url: `${req.headers.origin}/deposit`,
    cancel_url: `${req.headers.origin}/deposit`,
    metadata: {
      user_id: payload.userId,
    },
  });

  res.json({ url: session.url });
});

export default router;
