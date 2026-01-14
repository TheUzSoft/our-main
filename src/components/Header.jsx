import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'clients', 'about', 'contact'];
      const scrollPosition = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'clients', href: '#clients' },
    { key: 'about', href: '#about' },
    { key: 'blog', href: '/blog', isRoute: true },
    { key: 'contact', href: '#contact' },
  ];

  const handleNavClick = (e, href, isRoute = false) => {
    e.preventDefault();
    
    // If it's a route (like /blog), navigate directly
    if (isRoute) {
      navigate(`/${language}${href}`);
      setIsMobileMenuOpen(false);
      return;
    }
    
    // If it's home, navigate to language root
    if (href === '#home') {
      navigate(`/${language}/`);
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Check if we're on the home page
    const isOnHomePage = location.pathname === `/${language}/` || location.pathname === `/${language}`;
    
    const element = document.querySelector(href);
    
    // If element exists and we're on home page, scroll to it
    if (element && isOnHomePage) {
      const headerOffset = isScrolled ? 70 : 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
      return;
    }
    
    // If element doesn't exist or we're on a different page, navigate to home first
    navigate(`/${language}/`);
    setIsMobileMenuOpen(false);
    
    // Wait for navigation and then scroll to the section
    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = isScrolled ? 70 : 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // If still not found, try again after a longer delay
        setTimeout(() => {
          const retryElement = document.querySelector(href);
          if (retryElement) {
            const headerOffset = isScrolled ? 70 : 90;
            const elementPosition = retryElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 200);
      }
    }, 150);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-[#14151b] shadow-sm backdrop-blur-md h-16 md:h-20' 
          : 'bg-white/95 dark:bg-[#14151b]/95 backdrop-blur-sm h-20 md:h-28'
      }`}
    >
      <nav className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a
            href={`/${language}/`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${language}/`);
            }}
            className="flex items-center flex-shrink-0"
            aria-label="TheUzSoft Home"
          >
            <img 
              src={isDarkMode ? "/logodark.png" : "/logo.png"} 
              alt="TheUzSoft Logo - IT Kompaniya Toshkent" 
              className={`transition-all duration-300 ${
                isScrolled ? 'w-32 h-32 md:w-[160px] md:h-[160px]' : 'w-[160px] h-[160px] md:w-[180px] md:h-[180px]'
              }`}
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hidden">
              <span className="text-white font-bold text-xl">T</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-0.5" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.key || (item.isRoute && location.pathname.includes('/blog'));
              return (
                <a
                  key={item.key}
                  href={item.isRoute ? `/${language}${item.href}` : `/${language}${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-700 dark:text-white hover:text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(`nav.${item.key}`)}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Language Switcher, Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Switcher - Always visible on mobile */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5" role="group" aria-label="Language selector">
              <button
                onClick={() => changeLanguage('uz')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  language === 'uz'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-700 dark:text-white hover:text-primary'
                }`}
                aria-pressed={language === 'uz'}
                aria-label="Switch to Uzbek"
              >
                UZ
              </button>
              <button
                onClick={() => changeLanguage('ru')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  language === 'ru'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-700 dark:text-white hover:text-primary'
                }`}
                aria-pressed={language === 'ru'}
                aria-label="Switch to Russian"
              >
                RU
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-1.5 sm:p-2 text-gray-700 dark:text-white hover:text-primary transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <motion.svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#14151b]"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="py-2 space-y-0.5" aria-label="Mobile navigation">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.key || (item.isRoute && location.pathname.includes('/blog'));
                  return (
                    <motion.a
                      key={item.key}
                      href={item.isRoute ? `/${language}${item.href}` : `/${language}${item.href}`}
                      onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.15 }}
                      className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors touch-manipulation ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 dark:text-white active:bg-gray-50 dark:active:bg-gray-800'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {t(`nav.${item.key}`)}
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
