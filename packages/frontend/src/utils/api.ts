import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';
import admin from './apis/admin';
import walletQuery from './wallets';

class API {
  axios: AxiosInstance;

  constructor() {
    let currentUrlHeader: Record<string, string> = {};
    if (window) {
      currentUrlHeader.currenturl = window.location.toString();
    }

    this.axios = axios.create({
      headers: {
        ...currentUrlHeader
      }
    });
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

  // eslint-disable-next-line class-methods-use-this
  get admin() {
    return admin;
  }

  // eslint-disable-next-line class-methods-use-this
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
    const mutation = `mutation {
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

  signup(email: string, firstName?: string, lastName?: string) {
    const query = `query {
      signup(arg:{firstName:"${firstName}" lastName: "${lastName}" email: "${email}"}) {
          message
          success
      }
  }`;

    return this.axios.post(`${this.baseURL}/api/v1`, { query });
  }

  contactform(form: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    question: string;
  }) {
    const query = `{
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
    const mutation = `mutation {
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
    const mutation = `mutation {
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
    const mutation = `mutation {
        verifyToken(arg: {token: "${token}"}) {
            message
            success
            token
        }
      }`;

    return this.axios.post(`${this.baseURL}/api/v1`, { query: mutation });
  }

  invite(invitationCode: string) {
    const mutation = `mutation {
      invitationCode(code: "${invitationCode}"){
          message
          success
          token
      }
  }`;

    return this.axios.post(`${this.baseURL}/api/v1`, { query: mutation });
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
          referralCode
          withdrawn
          ${walletQuery}
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
    const query = 'query { admin { email } }';

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  getDeposits(adminToken: string) {
    const query = `
    query { 
      getDeposits {
        deposits {
          _id
          userId
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
          network
          email
        }
        success
        message
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

  adminLogin(email: string, password: string) {
    const query = 'query { adminLogin { token } }';

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

  updateDepositStatus(adminToken: string, depositId: string, status: string) {
    const mutation = `mutation {
      updateDepositStatus (arg: {depositId: "${depositId}", status: "${status}"}) {
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

  addContributionFromValue(
    adminToken: string,
    dolarAmount: number,
    email: string
  ) {
    const mutation = `mutation {
      addContributionFromValue (arg: {amount: ${dolarAmount}, email: "${email}"}) {
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

    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query },
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  deposit(accountId: string, amount: number) {
    switch ('TELLER' as string) {
      case 'PLAID':
        return this.axios.post(
          `${this.baseURL}/api/v2/plaid/deposit`,
          {
            account_id: accountId,
            amount
          },
          { headers: { ...this.getAuthorizationHeader() } }
        );

      case 'TELLER':
        return this.axios.post(
          `${this.baseURL}/api/v2/teller/deposit`,
          {
            account_id: accountId,
            amount
          },
          { headers: { ...this.getAuthorizationHeader() } }
        );

      default:
        return null;
    }
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

  invitationCode(invitationCode: string) {
    const mutation = `mutation {
      invitationCode(code: "${invitationCode}"){
          message
          success
      }
  }}`;
    return this.axios.post(
      `${this.baseURL}/api/v1`,
      { query: mutation },
      { headers: { ...this.getAuthorizationHeader() } }
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
    bankName: string,
    userId: string,
    memo?: string
  ) {
    const query = `
    query {
      tellerPayment (arg: {
        accountId: "${accountId}", 
        amount: "${amount}", 
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
        headers: { ...this.getAuthorizationHeader() }
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

  getPayee(accountId: string, tellerAccessToken: string) {
    const query = `
    query {
      getPayee (accountId: "${accountId}") {
          message
          success
          payeeId
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

  getLeanCustomerId(userId: string) {
    const query = `
    query {
      getLeanCustomerId (userId: "${userId}") {
          message
          success
          customerId
      }
  }
  `;
    return this.axios.post(`${this.baseURL}/api/v1`, { query });
  }

  createPaymentIntent(userId: string, amount: number) {
    const query = `
    query {
      createPaymentIntent (arg: {amount: ${amount}, userId: "${userId}"}) {
          message
          success
          paymentIntentId
      }
  }
  `;
    return this.axios.post(`${this.baseURL}/api/v1`, { query });
  }

  getFeatureStatus(feature: string) {
    const query = `
      query {
        featureFlag {
          status
        }
      }`;

    return this.axios.post(
      `${this.baseURL}/api/v1?featureName=${feature}&query=${query}`,
      null,
      {
        headers: { ...this.getAuthorizationHeader() }
      }
    );
  }

  getMediumBlogs() {
    return this.axios.get(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@redxam'
    );
  }
}

export default new API();
