import { create } from "zustand";
import {type User } from "firebase/auth";

interface AuthState {
  user: User | null;
  role: string | null;
  setUser: (user: User | null, role: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user, role) => set({ user, role }),
  clearAuth: () => set({ user: null, role: null }),
}));