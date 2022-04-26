import axios from 'axios';
import walletQuery from './wallets';
const baseURL = 'http://YOURLOCALIP:5005';

export const login = async email => {
  const mutation = `mutation {
    updateToken(arg: {
        email: "${email}"
      }) {
          success
          message
      }
    }`;

  return axios.post(`${baseURL}/api/v1`, {query: mutation});
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
    `${baseURL}/api/v1`,
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
