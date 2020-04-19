import axios from 'axios';

export const apiBase = axios.create({
  baseURL: process.env.ENDPOINT_API,
  responseType: 'json',
  withCredentials: true,
});
