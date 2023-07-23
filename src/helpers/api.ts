import axios from 'axios';

export const config = {
  baseURL: 'https://dummyjson.com',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const API = axios.create(config);

API.interceptors.request.use(
  conf => {
    const token = undefined;
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    return conf;
  },
  error => {
    console.error('request interceptor error', error);
    return Promise.reject(error);
  },
);

export default API;
