import { Request } from 'express';
import { User } from '@/database';
import axios from 'axios';
import https from 'https';
import fs from 'fs';

const baseUrl = 'https://api.teller.io';
const httpsAgent = new https.Agent({
  cert: fs.readFileSync(__dirname + '/certificates/certificate.pem'),
  key: fs.readFileSync(__dirname + '/certificates/private_key.pem')
});

export const tellerAccounts = async (
  { userId }: { userId: string },
  req: Request
) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken)
      return {
        success: false,
        message: 'invalid access token provided'
      };

    const accountsRes = await axios.get(`${baseUrl}/accounts`, {
      auth: {
        username: accessToken,
        password: ''
      },
      httpsAgent
    });
    // TODO: Add multiple accounts
    const accounts = accountsRes.data
      .filter(acc => acc.subtype === 'checking')
      .map(acc => ({
        id: acc.id,
        name: acc.institution.name,
        type: acc.subtype
      }));

    if (accounts.length < 1) {
      return {
        success: false,
        message: 'no checking account'
      };
    }

    const user = await User.findOne({ _id: userId }, { bankAccounts: 1 });

    await user.updateOne({
      $set: {
        bankAccounts: [
          ...user.bankAccounts,
          {
            accessToken,
            accounts
          }
        ]
      }
    });

    const checkingAccount = accounts[0];

    const accountId = checkingAccount.id;
    const bankName = checkingAccount.name;

    const balanceRes = await axios.get(
      `${baseUrl}/accounts/${accountId}/balances`,
      {
        auth: {
          username: accessToken,
          password: ''
        },
        httpsAgent
      }
    );
    const balance = balanceRes.data.available;

    await user.updateOne({
      $set: {
        bankAccounts: [
          ...user.bankAccounts,
          {
            accessToken,
            accounts
          }
        ]
      }
    });

    return {
      success: true,
      accountId,
      balance,
      bankName
    };
  } catch (err) {
    console.error(err);
    return { message: err.response.data.error.message };
  }
};
