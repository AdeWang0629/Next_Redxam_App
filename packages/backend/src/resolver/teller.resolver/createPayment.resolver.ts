import { Request } from 'express';
import axios from 'axios';
import { Deposits, DepositsCurrencyType, DepositsType } from '@/database';

const baseUrl = 'https://api.teller.io';

export const tellerPayment = async (
  {
    arg
  }: {
    arg: {
      accountId: string;
      amount: string;
      memo: string;
      payee_id: string;
      bankName: string;
      userId: string;
    };
  },
  req: Request
) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken)
      return {
        success: false,
        message: 'invalid access token provided'
      };

    const payeeRes = await axios.post(
      `${baseUrl}/accounts/${arg.accountId}/payments/zelle`,
      {
        ...arg
      },
      {
        auth: {
          username: accessToken,
          password: ''
        }
      }
    );

    const paymentId = payeeRes.data.id;
    const connect_token = payeeRes.data.connect_token;

    if (!connect_token) {
      await saveDeposit(paymentId, arg.amount, arg.userId, arg.bankName);
    }

    return {
      success: true,
      paymentId,
      connect_token
    };
  } catch (err) {
    return { message: err.response.data.error.message, success: false };
  }
};

export const tellerPaymentVerified = async (
  {
    arg
  }: {
    arg: {
      amount: string;
      paymentId: string;
      bankName: string;
      userId: string;
    };
  },
  req: Request
) => {
  try {
    await saveDeposit(arg.paymentId, arg.amount, arg.userId, arg.bankName);
    return {
      success: true,
      message: ''
    };
  } catch (err) {
    return { message: err.message, success: false };
  }
};

const saveDeposit = async (
  paymentId: string,
  amount: string,
  userId: string,
  bankName: string
) => {
  await Deposits.create({
    type: DepositsType.FIAT,
    currency: DepositsCurrencyType.USD,
    amount,
    processedByRedxam: false,
    userId,
    status: 'completed',
    bankName,
    timestamp: new Date().getTime(),
    stripeChargeId: paymentId
  });
};
