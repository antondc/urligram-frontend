import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';

class HttpClient {
  private static instance: AxiosInstance;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: process.env.ENDPOINT_API,
    });

    axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axiosInstance.defaults.paramsSerializer = this.paramsSerializer;
    axiosInstance.defaults.withCredentials = true;

    HttpClient.instance = axiosInstance;
  }

  public static getInstance = () => {
    if (!HttpClient.instance) new HttpClient();

    return HttpClient.instance;
  };

  private paramsSerializer = (params) => {
    return stringify(params, { arrayFormat: 'repeat' });
  };
}

export default HttpClient.getInstance();
