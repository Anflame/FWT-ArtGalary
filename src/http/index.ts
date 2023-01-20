import axios, { RawAxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../constants';
import { TTokens } from '../store/types';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  (config.headers as Partial<RawAxiosRequestHeaders>).Authorization = `Bearer ${
    JSON.parse(Cookies.get('token') as string).accessToken
  }`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<TTokens>(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
          params: {
            refreshToken: JSON.parse(Cookies.get('token') as string)
              .refreshToken,
            fingerprint: 'string',
          },
        });
        Cookies.set('token', JSON.stringify(response.data));
        return await $api.request(originalRequest);
      } catch (e) {
        Cookies.remove('token');
      }
    }
    throw error;
  },
);

export default $api;
