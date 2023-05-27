import axios from 'axios';
import https from 'https';
import fs from 'fs';

const baseUrl = 'https://api.teller.io';
const httpsAgent = new https.Agent({
  cert: fs.readFileSync(__dirname + '/certificates/certificate.pem'),
  key: fs.readFileSync(__dirname + '/certificates/private_key.pem')
});

export const getPayee = async ({ accountId, accessToken }) => {
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
        },
        httpsAgent
      }
    );
    const payee = payeeRes.data.find(
      payeeI =>
        payeeI.address.type === 'email' &&
        payeeI.address.value === 'max@redxam.com'
    );
    console.log(payee);
    if (!payee)
      return {
        success: false,
        message: 'Bank account has not payee asigned'
      };

    return payee.id;
  } catch (err) {
    return { message: err.response.data.error.message, success: false };
  }
};
