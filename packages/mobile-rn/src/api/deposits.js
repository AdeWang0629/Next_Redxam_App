import axios from 'axios';
import {BASE_URL} from '@env';

export const getUserDeposits = async token => {
  const query = `
    query {
      userDeposits {
        _id
        type
        amount
        index
        currency
        timestamp
        processedByRedxam
        status
        hash
        address
        bankIcon
        bankName
        bankType
      }
    }`;

  return axios.post(
    `${BASE_URL}/api/v1`,
    {query},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export default {
  getUserDeposits,
};
