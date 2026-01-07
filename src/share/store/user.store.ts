import { create } from 'zustand';
import type { IUser } from '../types/user';

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

interface UserStore {
  user: IUser | null;
  accessToken: string | null;
  hydrated: boolean;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  setAuth: (user: IUser, token: string) => void;
  logout: () => void;
  restoreSession: () => void;
}

function safeReadToken(): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

function safeReadUser(): IUser | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as IUser;
  } catch {
    return null;
  }
}

function safeWriteAuth(user: IUser, token: string) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
}

function safeClearAuth() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error(e);
  }
}

const initialToken = safeReadToken();
const initialUser = safeReadUser();

export const userStore = create<UserStore>((set, get) => ({
  user: initialUser,
  accessToken: initialToken,
  hydrated: true,
  authModalOpen: false,
  openAuthModal: () => set({ authModalOpen: true }),
  closeAuthModal: () => set({ authModalOpen: false }),
  setAuth: (user, token) => {
    safeWriteAuth(user, token);
    set({ user, accessToken: token, authModalOpen: false });
  },
  logout: () => {
    safeClearAuth();
    set({ user: null, accessToken: null, authModalOpen: false });
  },
  restoreSession: () => {
    const token = safeReadToken();
    const user = safeReadUser();

    set({
      accessToken: token,
      user: user,
      hydrated: true,
    });

    if (!token) get().logout();
  },
}));
