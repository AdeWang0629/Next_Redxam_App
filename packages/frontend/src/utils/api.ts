import axios, { AxiosInstance } from "axios";

class API {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  get baseURL() {
    return (typeof window !== "undefined" &&
    sessionStorage.getItem("environment") &&
    sessionStorage.getItem("environment") === "development"
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL
      : process.env.NEXT_PUBLIC_PROD_BASE_URL) as string;
  }

  getToken() {
    return typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;
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

  createWaitlist(email: string, firstName?: string, lastName?: string) {
    let mutation = `mutation {
        createWaitlist(arg: {
          email: "${email}"${
      firstName?.length ? `, firstName: "${firstName}"` : ""
    }${lastName?.length ? `, lastName: "${lastName}"` : ""}
        }) {
            success
            message
        }
    }`;

    return this.axios.post(`${this.baseURL}/api/v1?query=${mutation}`);
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

  getUserData() {
    const query = `query {
        user {
          firstName
          email
          phone
          contribution
          level
          deposited
          withdrawn
          wallet {
            address
          }
        }
      }
    `;

    return this.axios.post(`${this.baseURL}/api/v1?query=${query}`, null, {
      headers: { ...this.getAuthorizationHeader() },
    });
  }
}

export default new API();
