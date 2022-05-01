import axios from 'axios';
import {BASE_URL} from '@env';

export const createWaitlist = ({email, firstName, lastName, referral}) => {
  const mutation = `mutation {
        createWaitlist(arg: {
          email: "${email}"
          ${firstName?.length ? `, firstName: "${firstName}"` : ''}
          ${lastName?.length ? `, lastName: "${lastName}"` : ''}
          ${referral?.length ? `referralCode: "${referral}"` : ''}
        }) {
            success
            message
            level
            referralCode
        }
    }`;

  return axios.post(`${BASE_URL}/api/v1`, {query: mutation});
};

export default {
  createWaitlist,
};
