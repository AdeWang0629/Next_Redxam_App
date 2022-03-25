import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';

class AdminAPI {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  // eslint-disable-next-line class-methods-use-this
  get baseURL() {
    return (
      typeof window !== 'undefined' &&
      getCookie('environment') &&
      getCookie('environment') === 'development'
        ? process.env.NEXT_PUBLIC_DEV_BASE_URL
        : process.env.NEXT_PUBLIC_PROD_BASE_URL
    ) as string;
  }

  updateReferralScript(adminToken: String) {
    const query = `query {
          updateReferral {
              message
              success
              updatedUsers {
                  userId
                  referralCode
                  waitlistToken
              }
              amount
          }
      }`;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
  }

  updateWalletsScript(adminToken: String) {
    const mutation = `mutation {
          updateWallets{
              message
              success
          }
      }`;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query: mutation },
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
  }

  updateUserStatusScript(
    adminToken: String,
    email: String,
    status: 'invited' | 'accepted'
  ) {
    const mutation = `mutation {
          updateUserStatus (arg: {email: "${email}", status: "${status}"}) {
            message
            success
          }
        }`;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query: mutation },
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
  }

  inviteUser(adminToken: String, email: String) {
    const mutation = `mutation {
      inviteUser(arg:{email: "${email}"}){
          message
          success
      }
  }`;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query: mutation },
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
  }
}

export default new AdminAPI();
