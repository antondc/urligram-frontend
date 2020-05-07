import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';

class Http {
  private static instance: AxiosInstance;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: process.env.ENDPOINT_API,
    });

    axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axiosInstance.defaults.paramsSerializer = this.paramsSerializer;
    axiosInstance.defaults.withCredentials = true;

    Http.instance = axiosInstance;
  }

  public static getInstance = () => {
    if (!Http.instance) new Http();

    return Http.instance;
  };

  private paramsSerializer = (params) => {
    return stringify(params, { arrayFormat: 'repeat' });
  };
}

export default Http.getInstance();
