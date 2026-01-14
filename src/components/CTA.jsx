import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CTA = () => {
  const { t } = useLanguage();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50 dark:bg-[#14151b] border-t border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto px-2 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-black dark:text-white mb-3 sm:mb-4 tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="inline-block w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-primary text-white rounded-lg font-semibold text-sm sm:text-base transition-colors hover:bg-primary/90 active:bg-primary/80 touch-manipulation"
          >
            {t('cta.button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
