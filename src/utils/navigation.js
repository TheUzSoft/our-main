import { useLanguage } from '../context/LanguageContext';

/**
 * Hook to get language-aware navigation functions
 */
export const useNavigation = () => {
  const { language } = useLanguage();

  /**
   * Get language-prefixed URL for hash navigation
   * Since we're using hash-based navigation (#home, #services), 
   * we just need to ensure the base path includes the language
   */
  const getLangPath = (hash = '') => {
    return `/${language}${hash}`;
  };

  /**
   * Get full URL with language prefix
   */
  const getFullPath = (path = '') => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${language}${cleanPath}`;
  };

  return { getLangPath, getFullPath, language };
};

