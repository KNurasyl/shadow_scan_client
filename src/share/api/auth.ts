import axios from 'axios';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: 'user' | 'admin';
    name?: string;
    isActive: boolean;
  };
}

export const loginRequest = async (email: string, password: string) => {
  const { data } = await axios.post<LoginResponse>('/api/auth/login', { email, password });

  return data;
};

export const registerRequest = async (email: string, password: string) => {
  const { data } = await axios.post('/auth/register', { email, password }).then((r) => r.data);

  return data;
};
