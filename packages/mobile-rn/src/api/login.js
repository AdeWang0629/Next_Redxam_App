import axios from 'axios';
import walletQuery from './wallets';

import {BASE_URL} from '@env';

export const login = async email => {
  console.log(BASE_URL);
  console.log('hola bebe');
  const mutation = `mutation {
    updateToken(arg: {
        email: "${email}",
        isMobile: ${true}
      }) {
          success
          message
      }
    }`;

  return axios.post(`${BASE_URL}/api/v1`, {query: mutation});
};

export const getUserData = async token => {
  const query = `query {
    user {
      _id
      firstName
      email
      phone
      contribution
      level
      deposited
      balance
      accountStatus
      referralCode
      withdrawn
      ${walletQuery}
      pending_balance
    }
  }
`;

  return axios.post(
    `${BASE_URL}/api/v1`,
    {query},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export default {
  login,
  getUserData,
};
