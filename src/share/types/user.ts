export type UserRole = 'user' | 'admin';

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  name?: string;
}
