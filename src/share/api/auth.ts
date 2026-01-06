import type { AuthPayload, LoginResponse } from '../types/api';
import { http } from './http';

export const loginRequest = async (payload: AuthPayload): Promise<LoginResponse> => {
  const { data } = await http.post<LoginResponse>('/auth/login', payload);
  return data;
};

export const registerRequest = async (payload: AuthPayload): Promise<LoginResponse> => {
  const { data } = await http.post<LoginResponse>('/auth/register', payload);
  return data;
};
