import axios from 'axios';
import express from 'express';
import { render } from 'mustache';
import { readFileSync } from 'fs';
import { Attachment } from 'nodemailer/lib/mailer';
import { resolve } from 'path';
import { JWT } from '@/config/jwt';
import sendGrid from '@/apis/sendgrid';
import { stripeInstance } from '@/apis/stripe';
import { messages } from '@/config/messages';
import {
  Transactions,
  TransactionTypes,
  TransactionStatus,
  DepositsCurrencyType,
  DepositsType,
  User
} from '@/database';

import { handleEmail } from '../utils/emailHandler';

const router = express.Router();

/**
 *  Stripe Deposit
 *  references plaidClient
 */
router.post('/deposit', async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.json(messages.failed.invalidToken);

    const payload = await new JWT().authorize(req.headers.authorization);

    if (!payload || payload.type !== 'verified') {
      return null;
    }

    let { account_id, amount } = req.body;

    const user = await User.findOne({ _id: payload.userId });

    let usedAccount;
    let accountInfo = user.bankAccounts.find(bankAcc =>
      bankAcc.accounts.find(acc => {
        if (acc.id === account_id) usedAccount = acc;
        return acc.id === account_id;
      })
    );

    const accountDetails = await getAccountDetails(
      account_id,
      accountInfo.accessToken as string
    );

    console.log(accountDetails);

    try {
      const bankToken = await stripeInstance.tokens.create({
        bank_account: {
          country: 'US',
          currency: DepositsCurrencyType.USD,
          routing_number: '110000000' || accountDetails.routing_numbers.ach,
          account_number: '000999999991' || accountDetails.account_number
        }
      });

      const charge = await stripeInstance.charges.create({
        amount: amount * 100,
        currency: 'usd',
        source: bankToken.id,
        description: 'Redxam deposit',
        metadata: {
          user_id: payload.userId
        }
      });

      await Transactions.create({
        userId: payload.userId,
        type: DepositsType.FIAT,
        currency: DepositsCurrencyType.USD,
        direction: TransactionTypes.DEPOSIT,
        amount,
        timestamp: new Date().getTime(),
        status: TransactionStatus.PENDING,
        stripeChargeId: charge.id,
        bankName: usedAccount.name,
        bankIcon: usedAccount.logo,
        bankType: usedAccount.type
      });

      handleEmail(user.email, 'plaid', `Your deposit on it's way 💸 | redxam`, {
        amount
      });

      res.json({ success: 1 });
    } catch (error) {
      res.status(500).json({ success: 0, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: error.message });
  }
});

const getAccountDetails = async (accountId: string, accessToken: string) => {
  const res = await axios.get(
    `https://api.teller.io/accounts/${accountId}/details`,

    {
      auth: {
        username: accessToken,
        password: ''
      }
    }
  );
  return res.data;
};

export default router;
