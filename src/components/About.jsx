import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '7+', key: 'experience', suffix: '' },
    { value: '100+', key: 'projects', suffix: '' },
    { value: '85+', key: 'clients', suffix: '' },
    { value: '15+', key: 'team', suffix: '' },
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
      id="about"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-black dark:text-white mb-3 sm:mb-4 md:mb-5 tracking-tight px-2 sm:px-0">
            {t('about.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed px-2 sm:px-0">
            {t('about.description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.key}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative bg-white dark:bg-[#14151b] p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary transition-all duration-300 text-center md:hover:shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.2, 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 15 
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-2 sm:mb-3 md:mb-4"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-700 dark:text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                {t(`about.${stat.key}`)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
