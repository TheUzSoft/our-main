import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: 'Akmal Karimov',
      role: 'CEO, TechStart',
      content: 'TheUzSoft jamoasi bizga ajoyib CRM tizim yaratdi. Mijozlar bilan ishlash endi ancha oson bo\'ldi.',
      rating: 5,
    },
    {
      name: 'Dilshoda Yusupova',
      role: 'Marketing Director',
      content: 'Mobil ilovamiz App Store va Google Play\'da muvaffaqiyatli chiqdi. Professional yondashuv va sifatli kod.',
      rating: 5,
    },
    {
      name: 'Farrukh Toshmatov',
      role: 'E-commerce Owner',
      content: 'Veb-saytimiz endi mobil qurilmalarda mukammal ishlaydi. Trafik va sotuvlar sezilarli darajada oshdi.',
      rating: 5,
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
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-black dark:text-white mb-3 sm:mb-4 tracking-tight px-2 sm:px-0">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative bg-white dark:bg-[#14151b] p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary transition-all duration-300 md:hover:shadow-lg"
            >
              <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.15 }}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-white mb-6 sm:mb-7 md:mb-8 leading-relaxed text-sm sm:text-base md:text-lg italic">
                "{testimonial.content}"
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-5 md:pt-6">
                <p className="font-bold text-black dark:text-white text-base sm:text-lg">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
