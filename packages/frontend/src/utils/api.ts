import axios, { AxiosInstance } from "axios";

class API {
  private token: string | null;
  private axios: AxiosInstance;

  constructor() {
    this.token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    this.axios = axios.create({
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
  }

  get baseURL() {
    return (typeof window !== "undefined" &&
    sessionStorage.getItem("environment") &&
    sessionStorage.getItem("environment") === "development"
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL
      : process.env.NEXT_PUBLIC_PROD_BASE_URL) as string;
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
}

export default new API();
