import { Request } from 'express';
import axios from 'axios';
import { User, Deposits, DepositsCurrencyType, DepositsType } from '@/database';
import { getPayee } from './getPayee.resolver';
import https from 'https';
import fs from 'fs';

const baseUrl = 'https://api.teller.io';
const httpsAgent = new https.Agent({
  cert: fs.readFileSync(__dirname + '/certificates/certificate.pem'),
  key: fs.readFileSync(__dirname + '/certificates/private_key.pem')
});

export const tellerPayment = async (
  {
    arg
  }: {
    arg: {
      accountId: string;
      amount: string;
      memo: string;
      bankName: string;
      userId: string;
    };
  },
  req: Request
) => {
  try {
    const user = await User.findOne({ _id: arg.userId });

    const bankAccount = user.bankAccounts.find(bank =>
      bank.accounts.find(acc => acc.id === arg.accountId)
    );

    const { accessToken } = bankAccount;

    const payee_id = await getPayee({ accountId: arg.accountId, accessToken });

    const payeeRes = await axios.post(
      `${baseUrl}/accounts/${arg.accountId}/payments/zelle`,
      {
        ...arg,
        payee_id
      },
      {
        auth: {
          username: accessToken as string,
          password: ''
        },
        httpsAgent
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
  await User.updateOne(
    { _id: userId },
    { $inc: { pending_balance: parseFloat(amount) } }
  );
  await Deposits.create({
    type: DepositsType.FIAT,
    currency: DepositsCurrencyType.USD,
    amount,
    processedByRedxam: false,
    userId,
    status: 'pending',
    bankName,
    timestamp: new Date().getTime(),
    stripeChargeId: paymentId
  });
};
