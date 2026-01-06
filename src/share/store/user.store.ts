import { create } from 'zustand';
import type { IUser } from '../types/user';

interface UserStore {
  user: IUser | null;
  accessToken: string | null;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  setAuth: (user: IUser, token: string) => void;
  logout: () => void;
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  authModalOpen: false,
  openAuthModal: () => set({ authModalOpen: true }),
  closeAuthModal: () => set({ authModalOpen: false }),
  setAuth: (user, token) => {
    localStorage.setItem('accessToken', token);
    set({ user, accessToken: token, authModalOpen: false });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, accessToken: null });
  },
}));
