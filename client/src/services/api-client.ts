import axios from 'axios';
import { getToken } from './localTokenService';

const axiosRequest = axios.create({
  baseURL: 'http://localhost:3000/api',
});

axiosRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosRequest;
