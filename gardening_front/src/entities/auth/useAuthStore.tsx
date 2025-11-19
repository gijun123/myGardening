import { create } from 'zustand';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,

  setTokens: (access, refresh) =>
    set({ accessToken: access, refreshToken: refresh, isLoggedIn: true }),

  logout: () =>
    set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
}));