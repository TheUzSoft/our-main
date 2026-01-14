import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ServiceModal = ({ isOpen, onClose, serviceKey }) => {
  const { t } = useLanguage();

  const serviceDetails = {
    web: {
      title: t('services.web.title'),
      features: t('services.web.features'),
      price: t('services.price')
    },
    mobile: {
      title: t('services.mobile.title'),
      features: t('services.mobile.features'),
      price: t('services.price')
    },
    telegram: {
      title: t('services.telegram.title'),
      features: t('services.telegram.features'),
      price: t('services.price')
    },
    ai: {
      title: t('services.ai.title'),
      features: t('services.ai.features'),
      price: t('services.price')
    }
  };

  const service = serviceDetails[serviceKey];

  if (!service) return null;

  const scrollToContact = (e) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const element = document.querySelector('#contact');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#14151b] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white pr-2">
                    {service.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all flex-shrink-0 touch-manipulation"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-black dark:text-white mb-4 sm:mb-5">{t('services.features')}</h3>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.15 }}
                        className="flex items-start space-x-2 sm:space-x-3"
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-white text-sm sm:text-base leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-5 sm:pt-6">
                  <p className="text-base sm:text-lg font-semibold text-black dark:text-white mb-4 sm:mb-5">{service.price}</p>
                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded-lg font-semibold text-sm sm:text-base transition-colors hover:bg-primary/90 active:bg-primary/80 touch-manipulation text-center"
                  >
                    {t('services.consultation')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
