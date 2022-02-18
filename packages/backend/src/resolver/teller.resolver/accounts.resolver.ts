import { Request } from 'express';
import axios from 'axios';

const baseUrl = 'https://api.teller.io';

export const tellerAccounts = async (_: void, req: Request) => {
  console.debug('[Resolve] teller accounts called');

  try {
    const accessToken = req.headers.authorization;
    console.log(accessToken);
    if (!accessToken)
      return {
        success: false,
        message: 'invalid access token provided'
      };
    const accountsRes = await axios.get(`${baseUrl}/accounts`, {
      headers: { Authorization: accessToken }
    });
    console.log(accountsRes);
  } catch (err) {}
};
