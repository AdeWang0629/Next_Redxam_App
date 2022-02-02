import axios, { AxiosInstance } from 'axios';
import { getCookie, setCookies } from 'cookies-next';

class API {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  get baseURL() {
    return (typeof window !== 'undefined' &&
    getCookie('environment') &&
    getCookie('environment') === 'development'
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL
      : process.env.NEXT_PUBLIC_PROD_BASE_URL) as string;
  }

  getToken() {
    return typeof window !== 'undefined' ? getCookie('token') : null;
  }

  getAuthorizationHeader() {
    return (this.getToken()
      ? { Authorization: `Bearer ${this.getToken()}` }
      : {}) as
      | {
          Authorization: string;
        }
      | {};
  }

  validateEmail(
    email: string,
    firstName?: string,
    lastName?: string,
    referralCode?: string
  ) {
    const query = `query {
      emailValidation(arg:{firstName:"${firstName}" lastName: "${lastName}" email: "${email}" referralCode: "${referralCode}"}) {
          message
          success
      }
  }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`);
  }

  validateEmailToken(token: string) {
    console.log(token);
    let mutation = `mutation {
      emailValidateToken {
          message
          success
      }
  }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${mutation}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createWaitlist(
    email: string,
    firstName?: string,
    lastName?: string,
    referralCode?: string
  ) {
    let mutation = `mutation {
        createWaitlist(arg: {
          email: "${email}"
          ${firstName?.length ? `, firstName: "${firstName}"` : ''}
          ${lastName?.length ? `, lastName: "${lastName}"` : ''}
          ${referralCode?.length ? `referralCode: "${referralCode}"` : ''}
        }) {
            success
            message
        }
    }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${mutation}`);
  }

  getWaitlistLevel(waitlistToken: String) {
    const query = `
    query{
      waitlistLevel (waitlistToken: "${waitlistToken}")
        {
          message
          success
          level
          referralCode
        }
      }
    `;
    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`);
  }

  login(email: string) {
    let mutation = `mutation {
        updateToken(arg: {
            email: "${email}"
          }) {
              success
              message
          }
        }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${mutation}`);
  }

  verify(token: string) {
    let mutation = `mutation {
        verifyToken(arg: {token: "${token}"}) {
            message
            success
            token
        }
      }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${mutation}`);
  }

  invite(code: string) {
    let mutation = `mutation {
      changeAccountStatus(arg: "${code}") {
        success,
        message
      }
    }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${mutation}`, null, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  getUserData() {
    const query = `query {
        user {
          firstName
          email
          phone
          contribution
          level
          deposited
          balance
          accountStatus
          withdrawn
          wallet {
            address
          }
          pending_balance
        }
      }
    `;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  getHomeData() {
    const query = `query {
      home {
        balance
        dolarChange
        percentChange
      }
    }
  `;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  getAdminDetails(token: string) {
    const query = `query { admin { email } }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  adminLogin(email: string, password: string) {
    const query = `query { adminLogin { token } }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, {
      email,
      password,
    });
  }

  getAllUsers(token: string) {
    const query = `
      query FetchUsers {
        users {
          ... {
            _id
            email
            firstName
            lastName
            accountStatus
            referralId
          }
        }
      }
    `;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getOverview(token: string) {
    const query = `
      query {
        overview {
          totalUsers
          invitedUsers
          acceptedUsers
          usersWithBalance
        }
      }
    `;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getApplicantData() {
    return this.axios.post(`${this.baseURL}/api/v2/applicantData`, {
      userToken: this.getToken(),
    });
  }

  getSumsubAccessToken() {
    return this.axios.post(`${this.baseURL}/api/v2/sumsubAccesToken`, {
      userToken: this.getToken(),
    });
  }

  getMXWidgetUrl() {
    const query = `
      query {
        mxWidgetConnect {
          widgetUrl
        }
      }
    `;
    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  getPlaidToken() {
    return this.axios.get(`${this.baseURL}/api/v2/plaid`, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  linkPlaidAccount(publicToken: string, metadata: any) {
    return this.axios.post(
      `${this.baseURL}/api/v2/plaid`,
      { public_token: publicToken, metadata },
      {
        headers: { ...this.getAuthorizationHeader() },
      }
    );
  }

  getBankAccounts() {
    return this.axios.get(`${this.baseURL}/api/v2/plaid/accounts`, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  getUserDeposits() {
    const query = `
      query {
        userDeposits {
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

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }

  deposit(accountId: string, amount: number) {
    return this.axios.post(
      `${this.baseURL}/api/v2/plaid/deposit`,
      {
        account_id: accountId,
        amount,
      },
      { headers: { ...this.getAuthorizationHeader() } }
    );
  }

  deleteBankAccounts(IDs: [string]) {
    return this.axios.post(
      `${this.baseURL}/api/v2/plaid/accounts/unlink`,
      {
        IDs,
      },
      { headers: { ...this.getAuthorizationHeader() } }
    );
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
    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
  }
}

export default new API();
