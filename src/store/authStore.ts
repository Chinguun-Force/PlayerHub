import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  user: {
    _id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  iat: number;
  exp: number;
}

type InnerUser = DecodedToken['user'];

interface User extends InnerUser {
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: { token: string }) => void;
  logout: () => void;
  checkAuth: () => void;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: ({ token }) => {
        const decoded = jwtDecode<DecodedToken>(token);
        set({
          user: {
            ...decoded.user,
            token,
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        localStorage.removeItem('auth-storage');
        set({ user: null, isAuthenticated: false });
      },
      checkAuth: () => {
        const state = get();
        if (state.user?.token && isTokenExpired(state.user.token)) {
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state?.user?.token && isTokenExpired(state.user.token)) {
          state.logout();
        }
      },
    }
  )
);

