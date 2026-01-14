import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const TrustBadges = () => {
  const { t } = useLanguage();

  const badges = [
    { icon: '✓', key: 'projects' },
    { icon: '✓', key: 'clients' },
    { icon: '✓', key: 'experience' },
    { icon: '✓', key: 'support' },
  ];

  return (
    <section className="relative py-12 sm:py-14 md:py-16 bg-white dark:bg-[#14151b] border-y border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.03, ease: 'easeOut' }}
              className="text-center px-2 sm:px-0"
            >
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-black dark:text-white block">
                {t(`trustBadges.${badge.key}`)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
