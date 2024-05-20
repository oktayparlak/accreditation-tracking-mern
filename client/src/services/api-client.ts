import axios from 'axios';
import { getToken } from './localTokenService';
import {} from 'react-router-dom';

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

axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      ['invalid token', 'jwt expired'].includes(
        error.response.data.error.message
      ) ||
      [401].includes(error.response.status)
    ) {
      window.location.href = '/login';
      localStorage.clear();
    }
    return error;
  }
);

export default axiosRequest;
