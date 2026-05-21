'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import bn, { type TranslationKeys } from './bn';
import en from './en';

// ─── Types ──────────────────────────────────────────────────────────────────

export type Language = 'bn' | 'en';

/**
 * Dot-notation path through the translation object.
 * e.g. 'nav.home', 'status.no_action', 'profile.badges.first_post'
 */
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'.' | ''}${P}`
    : never
  : never;

type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : '';

type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

export type TranslationPath = Paths<TranslationKeys>;

// ─── Dictionaries map ───────────────────────────────────────────────────────

const dictionaries: Record<Language, TranslationKeys> = { bn, en };

// ─── Context ────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  /** Current active language */
  language: Language;
  /** Toggle between 'bn' and 'en' */
  toggleLanguage: () => void;
  /** Set language explicitly */
  setLanguage: (lang: Language) => void;
  /**
   * Translate a dot-path key.
   * @example t('nav.home') → 'হোম' | 'Home'
   */
  t: (path: TranslationPath) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

// ─── Provider ───────────────────────────────────────────────────────────────

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

/**
 * Wrap your app (or a subtree) with <LanguageProvider> to enable
 * the `useLanguage()` hook everywhere below.
 */
export function LanguageProvider({
  children,
  defaultLanguage = 'bn',
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'bn' ? 'en' : 'bn'));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (path: TranslationPath): string => {
      const dict = dictionaries[language];
      const keys = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let result: any = dict;
      for (const key of keys) {
        if (result == null || typeof result !== 'object') {
          return path; // fallback: return the path itself
        }
        result = result[key];
      }
      return typeof result === 'string' ? result : path;
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, toggleLanguage, setLanguage, t }),
    [language, toggleLanguage, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

/**
 * Access the current language, toggle function, and `t()` translator.
 * Must be used within a <LanguageProvider>.
 *
 * @example
 * const { t, language, toggleLanguage } = useLanguage();
 * return <h1>{t('nav.home')}</h1>;
 */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error(
      'useLanguage() must be used within a <LanguageProvider>. ' +
        'Wrap your app or layout with <LanguageProvider> first.',
    );
  }
  return ctx;
}
