import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

type Language = 'en' | 'ar';
type Translations = typeof enTranslations;

interface I18nContextType {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize language from localStorage or default to English
    const saved = localStorage.getItem('language') as Language;
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const getNestedTranslation = (obj: any, path: string): string | null => {
    return path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return current[key];
      }
      return null;
    }, obj);
  };

  const t = (key: string): string => {
    const translation = getNestedTranslation(translations[language], key);

    // Fallback to English if translation not found
    if (translation === null && language !== 'en') {
      const fallback = getNestedTranslation(translations.en, key);
      if (fallback !== null) return fallback;
    }

    return translation || key;
  };

  const value: I18nContextType = { language, t, setLanguage, isRTL };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nContext;
