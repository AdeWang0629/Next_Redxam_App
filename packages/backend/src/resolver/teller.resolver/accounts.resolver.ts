import { Request } from 'express';
import { User } from '@/database';
import axios from 'axios';

const baseUrl = 'https://api.teller.io';

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
      }
    });

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

    const user = await User.findOne({ _id: userId });

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

    const checkingAccount = accountsRes.data.find(
      acc => acc.subtype === 'checking'
    );

    const accountId = checkingAccount.id;
    const bankName = checkingAccount.institution.name;

    const balanceRes = await axios.get(
      `${baseUrl}/accounts/${accountId}/balances`,
      {
        auth: {
          username: accessToken,
          password: ''
        }
      }
    );
    const balance = balanceRes.data.available;
    return {
      success: true,
      accountId,
      balance,
      bankName
    };
  } catch (err) {
    return { message: err.response.data.error.message };
  }
};
