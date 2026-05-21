import { create } from 'zustand';
import type { User, UserRole } from '@/lib/firebase/types';

// ─── State shape ────────────────────────────────────────────────────────────

interface AuthState {
  /** Currently signed-in user profile (null when logged out) */
  user: User | null;
  /** True while Firebase auth state is being resolved on app boot */
  loading: boolean;
  /** Shorthand for user.role; defaults to 'anonymous' when no user */
  role: UserRole;
  /** Derived: true when `user` is not null */
  isAuthenticated: boolean;
}

interface AuthActions {
  /** Populate auth state after successful sign-in */
  setUser: (user: User) => void;
  /** Clear auth state on sign-out */
  clearUser: () => void;
  /** Update loading flag (used during auth initialisation) */
  setLoading: (loading: boolean) => void;
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  // Initial state
  user: null,
  loading: true,
  role: 'anonymous',
  isAuthenticated: false,

  // Actions
  setUser: (user) =>
    set({
      user,
      role: user.role,
      isAuthenticated: true,
      loading: false,
    }),

  clearUser: () =>
    set({
      user: null,
      role: 'anonymous',
      isAuthenticated: false,
      loading: false,
    }),

  setLoading: (loading) => set({ loading }),
}));
