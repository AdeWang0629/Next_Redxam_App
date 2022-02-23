import { Request } from 'express';
import axios from 'axios';

const baseUrl = 'https://api.teller.io';

export const getPayee = async ({ accountId, accessToken }, req: Request) => {
  console.debug('[Resolve] teller payees called');

  try {
    if (!accessToken)
      return {
        success: false,
        message: 'invalid access token provided'
      };

    const payeeRes = await axios.get(
      `${baseUrl}/accounts/${accountId}/payments/zelle/payees`,
      {
        auth: {
          username: accessToken,
          password: ''
        }
      }
    );

    const payee = payeeRes.data.find(
      payeeI =>
        payeeI.address.type === 'email' &&
        payeeI.address.value === 'max@redxam.com'
    );

    if (!payee)
      return {
        success: false,
        message: 'Bank account has not payee asigned'
      };

    return {
      success: true,
      payeeId: payee.id
    };
  } catch (err) {
    return { message: err.response.data.error.message, success: false };
  }
};
