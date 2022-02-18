import axios, { AxiosInstance } from 'axios';
import { getCookie, setCookies } from 'cookies-next';

class API {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  get baseURL() {
    return (
      typeof window !== 'undefined' &&
      getCookie('environment') &&
      getCookie('environment') === 'development'
        ? process.env.NEXT_PUBLIC_DEV_BASE_URL
        : process.env.NEXT_PUBLIC_PROD_BASE_URL
    ) as string;
  }

  getToken() {
    return typeof window !== 'undefined' ? getCookie('token') : null;
  }

  getAuthorizationHeader() {
    return (
      this.getToken() ? { Authorization: `Bearer ${this.getToken()}` } : {}
    ) as
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

    return this.axios.post(`${this.baseURL}/api/v1`, { query });
  }

  validateEmailToken(token: string) {
    let mutation = `mutation {
      emailValidateToken {
          message
          success
      }
  }`;

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query: mutation },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  contactform(form: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    question: string;
  }) {
    let query = `{
      contactForm (arg: {
        email: "${form.emailAddress}",
        firstName: "${form.firstName}",
        lastName: "${form.lastName}",
        question: "${form.question}"
      }) {
          message
          success
      }
  }`;

    return this.axios.post(`${this.baseURL}/api/v1`, { query });
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

    return this.axios.post(`${this.baseURL}/api/v1`, { query: mutation });
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
    return this.axios.post(`${this.baseURL}/api/v1`, { query });
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

    return this.axios.post(`${this.baseURL}/api/v1`, { query: mutation });
  }

  verify(token: string) {
    let mutation = `mutation {
        verifyToken(arg: {token: "${token}"}) {
            message
            success
            token
        }
      }`;

    return this.axios.post(`${this.baseURL}/api/v1`, { query: mutation });
  }

  invite(code: string) {
    let mutation = `mutation {
      changeAccountStatus(arg: "${code}") {
        success,
        message
      }
    }`;

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query: mutation },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  getUserData() {
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
          withdrawn
          wallet {
            address
          }
          pending_balance
        }
      }
    `;

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
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

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  getAdminDetails(token: string) {
    const query = `query { admin { email } }`;

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  adminLogin(email: string, password: string) {
    const query = `query { adminLogin { token } }`;

    return this.axios.post(`${this.baseURL}/api/v1`, {
      query,
      email,
      password
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

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
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

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  getApplicantData() {
    return this.axios.post(`${this.baseURL}/api/v2/applicantData`, {
      userToken: this.getToken()
    });
  }

  getSumsubAccessToken() {
    return this.axios.post(`${this.baseURL}/api/v2/sumsubAccesToken`, {
      userToken: this.getToken()
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
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  getPlaidToken() {
    return this.axios.get(`${this.baseURL}/api/v2/plaid`, {
      headers: { ...this.getAuthorizationHeader() }
    });
  }

  linkPlaidAccount(publicToken: string, metadata: any) {
    return this.axios.post(
      `${this.baseURL}/api/v2/plaid`,
      { public_token: publicToken, metadata },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  getBankAccounts() {
    return this.axios.get(`${this.baseURL}/api/v2/plaid/accounts`, {
      headers: { ...this.getAuthorizationHeader() }
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

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  deposit(accountId: string, amount: number) {
    return this.axios.post(
      `${this.baseURL}/api/v2/plaid/deposit`,
      {
        account_id: accountId,
        amount
      },
      { headers: { ...this.getAuthorizationHeader() } }
    );
  }

  stripeDeposit(amount: number) {
    return this.axios.post(
      `${this.baseURL}/api/v2/stripe/create-checkout-session`,
      {
        amount
      },
      { headers: { ...this.getAuthorizationHeader() } }
    );
  }

  deleteBankAccounts(IDs: [string]) {
    return this.axios.post(
      `${this.baseURL}/api/v2/plaid/accounts/unlink`,
      {
        IDs
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
    const query = `mutation {
      updateUserStatus (arg: {email: "${email}", status: "${status}"}) {
        message
        success
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

  getPerformanceRecords() {
    const query = `
    query {
      balanceRecords {
        balance
        timestamp
      }
    }
  `;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query, view: 'ALL' },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  tellerAccounts(tellerAccessToken: string, userId: string) {
    const query = `
    query  {
      tellerAccounts(userId: "${userId}") {
        balance
        accountId
        message
        success
        bankName
      }
    }
  `;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: tellerAccessToken }
      }
    );
  }

  tellerPayee(accountId: string, tellerAccessToken: string) {
    const query = `
    query {
      tellerPayee(accountId: "${accountId}") {
        message
        success
        payeeId
        connect_token
    }

    }
  `;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: tellerAccessToken }
      }
    );
  }

  tellerPayment(
    accountId: string,
    amount: number,
    payee_id: string,
    tellerAccessToken: string,
    bankName: string,
    userId: string,
    memo?: string
  ) {
    const query = `
    query {
      tellerPayment (arg: {
        accountId: "${accountId}", 
        amount: "${amount}", 
        payee_id: "${payee_id}", 
        bankName: "${bankName}", 
        userId: "${userId}",
        memo: "${memo}" }
      ) {
        message
        success
        paymentId
        connect_token
      }
    }
  `;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: tellerAccessToken }
      }
    );
  }

  tellerPaymentVerified(
    paymentId: string,
    amount: number,
    bankName: string,
    userId: string
  ) {
    const query = `
    query {
      tellerPaymentVerified (arg: {
        paymentId: "${paymentId}", 
        amount: "${amount}", 
        bankName: "${bankName}", 
        userId: "${userId}" 
      }
      ) {
        message
        success
      }
    }
  `;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }
}

export default new API();
