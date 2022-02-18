import { Request } from 'express';
import axios from 'axios';

const baseUrl = 'https://api.teller.io';

export const tellerAccounts = async (_: void, req: Request) => {
  console.debug('[Resolve] teller accounts called');
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
    const checkingAccount = accountsRes.data.find(
      acc => acc.subtype === 'checking'
    );

    if (!checkingAccount)
      return {
        success: false,
        message: 'no checking account'
      };

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
