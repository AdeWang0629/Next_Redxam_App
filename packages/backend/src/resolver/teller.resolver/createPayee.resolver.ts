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
        name: 'payee-otp_error',
        type: 'person'
      },
      {
        auth: {
          username: accessToken,
          password: ''
        }
      }
    );
    console.log(payeeRes.data);
    const payeeId = payeeRes.data.id;
    return {
      success: true,
      payeeId
    };
  } catch (err) {
    return { message: err.response.data.error.message };
  }
};
