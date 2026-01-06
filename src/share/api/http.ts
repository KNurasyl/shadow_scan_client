import axios from 'axios';
import { userStore } from '../store/user.store';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

http.interceptors.request.use((config) => {
  const token = userStore.getState().accessToken;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
