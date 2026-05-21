import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Types ──────────────────────────────────────────────────────────────────

type Language = 'bn' | 'en';

interface ThemeState {
  /** True when dark mode is active */
  isDarkMode: boolean;
  /** Current UI language */
  language: Language;
}

interface ThemeActions {
  /** Flip dark mode on/off */
  toggleDarkMode: () => void;
  /** Set dark mode explicitly */
  setDarkMode: (dark: boolean) => void;
  /** Set language explicitly */
  setLanguage: (lang: Language) => void;
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set) => ({
      isDarkMode: false,
      language: 'bn',

      toggleDarkMode: () =>
        set((state) => {
          const next = !state.isDarkMode;
          // Sync Tailwind's 'dark' class on <html>
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', next);
          }
          return { isDarkMode: next };
        }),

      setDarkMode: (dark) =>
        set(() => {
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', dark);
          }
          return { isDarkMode: dark };
        }),

      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'sakkhi-theme',
      storage: createJSONStorage(() => {
        // Guard against SSR where localStorage is unavailable
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Noop storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      /**
       * Re-apply the persisted dark-mode class to <html> on hydration
       * so Tailwind dark: variants work immediately.
       */
      onRehydrateStorage: () => (state) => {
        if (state?.isDarkMode && typeof document !== 'undefined') {
          document.documentElement.classList.add('dark');
        }
      },
    },
  ),
);
