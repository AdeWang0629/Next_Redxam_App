import axios, { AxiosInstance } from "axios";

class API {
  private baseURL: string;
  private token: string | null;
  private axios: AxiosInstance;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_PROD_BASE_URL as string;
    this.token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });
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

    return this.axios.post(`/api/v1?query=${mutation}`);
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

    return this.axios.post(`/api/v1?query=${mutation}`);
  }
}

export default new API();
