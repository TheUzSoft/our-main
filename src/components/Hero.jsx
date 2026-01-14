import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#14151b] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1476FF 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto px-2 sm:px-0"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-inter text-black dark:text-white mb-3 sm:mb-4 md:mb-5 leading-[1.2] tracking-tight"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            {t('hero.subtitle')}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2 sm:px-0">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-primary text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors hover:bg-primary/90 active:bg-primary/80 touch-manipulation text-center"
            >
              {t('hero.cta')}
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, '#services')}
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-transparent text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors active:bg-gray-100 dark:active:bg-gray-800 touch-manipulation text-center"
            >
              {t('hero.learnMore')}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
