import type { AuthPayload, LoginResponse } from '../types/api';
import { http } from './http';

export const loginRequest = async (payload: AuthPayload): Promise<LoginResponse> => {
  const { data } = await http.post('/auth/login', payload);
  return data;
};

export const registerRequest = async (payload: AuthPayload): Promise<LoginResponse> => {
  const { data } = await http.post('/auth/register', payload);
  return data;
};
