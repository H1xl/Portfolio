import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { content } from '../data/content';

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === 'undefined') return 'ru';
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'ru' || stored === 'en') return stored;
  } catch (e) {}
  const nav = (navigator.language || 'ru').toLowerCase();
  return nav.startsWith('en') ? 'en' : 'ru';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {}
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: content[lang] }),
    [lang, toggleLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
