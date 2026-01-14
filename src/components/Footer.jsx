import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/theuzsoft',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.22-1.387 3.884-1.627 4.32-1.636z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/theuzsoft',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/theuzsoft',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ];

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'clients', href: '#clients' },
    { key: 'blog', href: '/blog', isRoute: true },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    
    // Check if we're on the home page
    const isOnHomePage = location.pathname === `/${language}/` || location.pathname === `/${language}`;
    
    const element = document.querySelector(href);
    
    // If element exists and we're on home page, scroll to it
    if (element && isOnHomePage) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      return;
    }
    
    // If element doesn't exist or we're on a different page, navigate to home first
    navigate(`/${language}/`);
    
    // Wait for navigation and then scroll to the section
    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        // If still not found, try again after a longer delay
        setTimeout(() => {
          const retryElement = document.querySelector(href);
          if (retryElement) {
            const headerOffset = 100;
            const elementPosition = retryElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 200);
      }
    }, 150);
  };

  return (
    <footer className="relative bg-black text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-5">
              <a href={`/${language}/`}>
                <img 
                  src={isDarkMode ? "/logodark.png" : "/logo.png"} 
                  alt="TheUzSoft Logo" 
                  className="w-[180px] h-[180px]"
                />
              </a>
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mb-6">
              {t('about.description')}
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-200 border border-gray-800 hover:border-primary"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          >
            <h3 className="text-base md:text-lg font-bold mb-5 text-white">{t('nav.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.isRoute ? `/${language}${item.href}` : `/${language}${item.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isRoute) {
                        navigate(`/${language}${item.href}`);
                      } else if (item.href === '#home') {
                        navigate(`/${language}/`);
                      } else {
                        scrollToSection(e, item.href);
                      }
                    }}
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm md:text-base flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
          >
            <h3 className="text-base md:text-lg font-bold mb-5 text-white">{t('contact.title')}</h3>
            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+998882222287" className="hover:text-primary transition-colors duration-200">
                  +998 88 222 22 87
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@theuzsoft.uz" className="hover:text-primary transition-colors duration-200">
                  info@theuzsoft.uz
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Toshkent, O'zbekiston</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              © 2025 {t('footer.company')}. {t('footer.rights')}.
            </p>
            <div className="flex items-center space-x-6 text-xs md:text-sm text-gray-500">
              <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
