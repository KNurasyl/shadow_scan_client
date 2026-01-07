import type { IUser } from './user';

export type AuthMode = 'login' | 'register';

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: IUser;
  accessToken: string;
};
