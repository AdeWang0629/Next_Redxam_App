import { getLeanCustomerId } from './getCustomerId.resolver';
import { createPaymentIntent } from './createPaymentIntent.resolver';

export const leanResolver = {
  getLeanCustomerId,
  createPaymentIntent
};
