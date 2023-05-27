import { Request } from 'express';
import { User } from '@/database';
import axios from 'axios';

const {
  LEAN_DEV_BASE_URL,
  LEAN_BASE_URL,
  LEAN_APP_TOKEN,
  LEAN_DEV_DESTINATION_ID,
  NODE_ENV
} = process.env;
const baseUrl = NODE_ENV === 'production' ? LEAN_BASE_URL : LEAN_DEV_BASE_URL;

export const createPaymentIntent = async (
  { arg }: { arg: { amount: number; userId: string } },
  req: Request
) => {
  try {
    const user = await User.findOne({ _id: arg.userId });
    const customerId = user.leanCustomerId;

    const res = await axios.post(
      `${baseUrl}/payments/v1/intents`,
      {
        amount: arg.amount,
        currency: 'USD',
        payment_destination_id: LEAN_DEV_DESTINATION_ID,
        customer_id: customerId
      },
      {
        headers: {
          'lean-app-token': LEAN_APP_TOKEN
        }
      }
    );

    const paymentIntentId = res.data.payment_intent_id;

    return {
      success: true,
      message: '',
      paymentIntentId
    };
  } catch (err) {
    return { message: err.message };
  }
};
