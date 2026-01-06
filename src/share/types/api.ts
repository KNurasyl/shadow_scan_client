import type { IUser } from './user';

export interface LoginResponse {
  accessToken: string;
  user: IUser;
}

export interface AuthPayload {
  email: string;
  password: string;
}
