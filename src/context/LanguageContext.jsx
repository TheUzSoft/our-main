import { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import uzTranslations from '../i18n/uz.json';
import ruTranslations from '../i18n/ru.json';
import enTranslations from '../i18n/en.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { lang } = useParams() || {};
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get language from URL, default to 'ru' if not in URL
  const currentLang = (lang && ['uz', 'ru', 'en'].includes(lang)) ? lang : 'ru';
  const [language, setLanguage] = useState(currentLang);

  // Update language when URL changes
  useEffect(() => {
    if (currentLang !== language) {
      setLanguage(currentLang);
    }
  }, [currentLang]);

  const translations = {
    uz: uzTranslations,
    ru: ruTranslations,
    en: enTranslations,
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const changeLanguage = (newLang) => {
    if (newLang === language || !['uz', 'ru', 'en'].includes(newLang)) return;
    
    // Get current path without language prefix
    let currentPath = location.pathname.replace(/^\/(uz|ru|en)/, '') || '/';
    
    // If we're on a blog post page, redirect to blog list (since slugs differ between languages)
    if (currentPath.startsWith('/blog/')) {
      currentPath = '/blog';
    }
    
    // Navigate to new language path
    const newPath = `/${newLang}${currentPath === '/' ? '' : currentPath}`;
    navigate(newPath, { replace: true });
  };

  useEffect(() => {
    // Update HTML lang attribute
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
