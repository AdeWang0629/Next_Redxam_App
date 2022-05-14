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
  DepositsCurrencyType,
  DepositsType,
  User
} from '@/database';
const { SERVICE_EMAIL } = process.env;

const templatePath = resolve(__dirname, '../emails/plaid.hjs');
const templateData = readFileSync(templatePath, 'utf-8');

const facebookIcon: Readonly<Attachment> = Object.freeze({
  filename: 'facebook.png',
  content: readFileSync(`${__dirname}/../emails/facebook.png`).toString(
    'base64'
  ),
  content_id: 'facebook@login',
  disposition: 'inline'
});

const twitterIcon: Readonly<Attachment> = Object.freeze({
  filename: 'twitter.png',
  content: readFileSync(`${__dirname}/../emails/twitter.png`).toString(
    'base64'
  ),
  content_id: 'twitter@login',
  disposition: 'inline'
});

const linkedInIcon: Readonly<Attachment> = Object.freeze({
  filename: 'linkedin.png',
  content: readFileSync(`${__dirname}/../emails/linkedin.png`).toString(
    'base64'
  ),
  content_id: 'linkedin@login',
  disposition: 'inline'
});

const telegramIcon: Readonly<Attachment> = Object.freeze({
  filename: 'telegram.png',
  content: readFileSync(`${__dirname}/../emails/telegram.png`).toString(
    'base64'
  ),
  content_id: 'telegram@login',
  disposition: 'inline'
});

const discordIcon: Readonly<Attachment> = Object.freeze({
  filename: 'discord.png',
  content: readFileSync(`${__dirname}/../emails/discord.png`).toString(
    'base64'
  ),
  content_id: 'discord@login',
  disposition: 'inline'
});

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
        status: 'pending',
        stripeChargeId: charge.id,
        bankName: usedAccount.name,
        bankIcon: usedAccount.logo,
        bankType: usedAccount.type
      });

      await sendGrid.sendMail({
        from: `redxam.com <${SERVICE_EMAIL}>`,
        to: user.email,
        subject: ' Your deposit on it’s way 💸 | redxam',
        html: render(templateData, { amount }),
        attachments: [
          facebookIcon,
          twitterIcon,
          linkedInIcon,
          telegramIcon,
          discordIcon
        ]
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
