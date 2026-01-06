import type { UserRole } from './user';

export interface UserDto {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  isActive: boolean;
}

export interface LoginResponse {
  accessToken: string;
  user: UserDto;
}

export interface AuthPayload {
  email: string;
  password: string;
}
