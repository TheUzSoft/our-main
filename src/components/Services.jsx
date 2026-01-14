import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ServiceModal from './ServiceModal';

const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      key: 'web',
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      key: 'mobile',
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
    },
    {
      key: 'telegram',
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.22-1.387 3.884-1.627 4.32-1.636z"/>
        </svg>
      ),
    },
    {
      key: 'ai',
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-black dark:text-white mb-3 sm:mb-4 tracking-tight px-2 sm:px-0">
            {t('services.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              onHoverStart={() => setHoveredService(service.key)}
              onHoverEnd={() => setHoveredService(null)}
              whileHover={{ y: -4 }}
              className="group relative bg-white dark:bg-[#14151b] p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary transition-all duration-300 cursor-pointer touch-manipulation md:hover:shadow-lg"
            >
              <motion.div
                className="text-primary mb-4 sm:mb-5 md:mb-6"
                animate={{
                  scale: hoveredService === service.key ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-200">
                {t(`services.${service.key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
                {t(`services.${service.key}.description`)}
              </p>
              <motion.button
                onClick={() => setSelectedService(service.key)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-primary font-semibold text-sm sm:text-base group-hover:text-primary/80 transition-colors touch-manipulation"
              >
                {t('services.learnMore') || 'Batafsil'}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <ServiceModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        serviceKey={selectedService}
      />
    </section>
  );
};

export default Services;
