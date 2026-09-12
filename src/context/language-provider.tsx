'use client';

import { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { Translations } from '@/lib/translations';

export type Language = 'en' | 'bn';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof Translations)['en'];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load persistence after mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = useMemo(() => Translations[language], [language]);

  const value = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t,
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
