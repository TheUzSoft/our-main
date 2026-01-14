import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Clients = () => {
  const { t } = useLanguage();

  // Client brand logos
  const clients = [
    { id: 1, name: 'BioClean', logo: '/images/bioclean.jpg' },
    { id: 2, name: 'BuyPin', logo: '/images/buypin.jpg' },
    { id: 3, name: 'ChustBurger', logo: '/images/chustburger.jpg' },
    { id: 4, name: 'Elbop', logo: '/images/elbop.jpg' },
    { id: 5, name: 'FazoLive', logo: '/images/fazolive.PNG' },
    { id: 6, name: 'Frossh', logo: '/images/frossh.png' },
    { id: 7, name: 'FTTextile', logo: '/images/fttextile.jpg' },
    { id: 8, name: 'IDonate', logo: '/images/idonate.png' },
    { id: 9, name: 'Kebyo', logo: '/images/kebyo.png' },
    { id: 10, name: 'KSM', logo: '/images/ksm.png' },
    { id: 11, name: 'OSAGO', logo: '/images/osago.png' },
    { id: 12, name: 'RoyalTaxi', logo: '/images/royaltaxi.jpg' },
    { id: 13, name: 'SeenSMS', logo: '/images/seensms.png' },
    { id: 14, name: 'UzTelecom', logo: '/images/uztelecom.png' },
    { id: 15, name: 'SofyMart', logo: '/images/sofymart.png' },
  ];

  // Duplicate clients for seamless infinite loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section
      id="clients"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-black dark:text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-2 sm:px-0">
            {t('clients.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            {t('clients.subtitle')}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-r from-white dark:from-[#14151b] via-white dark:via-[#14151b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-l from-white dark:from-[#14151b] via-white dark:via-[#14151b] to-transparent z-10 pointer-events-none" />

          {/* Sliding carousel */}
          <div className="flex clients-carousel">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 mx-1.5 sm:mx-3 md:mx-4 lg:mx-6 xl:mx-8"
              >
                <div className="w-[180px] h-[100px] sm:w-[250px] sm:h-[140px] flex items-center justify-center bg-white dark:bg-[#14151b] border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-5 transition-colors duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
                    loading="lazy"
                    width="250"
                    height="140"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
