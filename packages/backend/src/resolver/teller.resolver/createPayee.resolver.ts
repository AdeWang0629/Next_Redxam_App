import { Request } from 'express';
import axios from 'axios';

const baseUrl = 'https://api.teller.io';

export const tellerPayee = async (
  { accountId }: { accountId: string },
  req: Request
) => {
  console.debug('[Resolve] teller payees called');

  try {
    const accessToken = req.headers.authorization;

    if (!accessToken)
      return {
        success: false,
        message: 'invalid access token provided'
      };

    const payeeRes = await axios.post(
      `${baseUrl}/accounts/${accountId}/payments/zelle/payees`,
      {
        address: {
          type: 'email',
          value: 'max@redxam.com'
        },
        name: 'jhoseph-otp',
        type: 'person'
      },
      {
        auth: {
          username: accessToken,
          password: ''
        }
      }
    );

    const payeeId = payeeRes.data.id;
    const connect_token = payeeRes.data.connect_token;

    return {
      success: true,
      payeeId,
      connect_token
    };
  } catch (err) {
    return { message: err.response.data.error.message };
  }
};
