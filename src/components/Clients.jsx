import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchBrandLogos } from '../utils/brandsApi';

const Clients = () => {
  const { t } = useLanguage();
  const [dynamicLogos, setDynamicLogos] = useState([]);

  // Static brand logos - ALWAYS visible, never removed
  const staticClients = [
    { id: 'static-1', name: 'BioClean', logo: '/images/bioclean.jpg', link: null },
    { id: 'static-2', name: 'BuyPin', logo: '/images/buypin.jpg', link: null },
    { id: 'static-3', name: 'ChustBurger', logo: '/images/chustburger.jpg', link: null },
    { id: 'static-4', name: 'Elbop', logo: '/images/elbop.jpg', link: null },
    { id: 'static-5', name: 'FazoLive', logo: '/images/fazolive.PNG', link: null },
    { id: 'static-6', name: 'Frossh', logo: '/images/frossh.png', link: null },
    { id: 'static-7', name: 'FTTextile', logo: '/images/fttextile.jpg', link: null },
    { id: 'static-8', name: 'IDonate', logo: '/images/idonate.png', link: null },
    { id: 'static-9', name: 'Kebyo', logo: '/images/kebyo.png', link: null },
    { id: 'static-10', name: 'KSM', logo: '/images/ksm.png', link: null },
    { id: 'static-11', name: 'OSAGO', logo: '/images/osago.png', link: null },
    { id: 'static-12', name: 'RoyalTaxi', logo: '/images/royaltaxi.jpg', link: null },
    { id: 'static-13', name: 'SeenSMS', logo: '/images/seensms.png', link: null },
    { id: 'static-14', name: 'UzTelecom', logo: '/images/uztelecom.png', link: null },
    { id: 'static-15', name: 'SofyMart', logo: '/images/sofymart.png', link: null },
  ];

  // Fetch dynamic logos from API
  useEffect(() => {
    const loadDynamicLogos = async () => {
      try {
        const logos = await fetchBrandLogos();
        setDynamicLogos(logos);
      } catch (error) {
        // Silently fail - static logos will still be displayed
        console.warn('Failed to load dynamic logos:', error);
      }
    };

    loadDynamicLogos();
  }, []);

  // Combine static and dynamic logos
  // Static logos always come first, then dynamic logos
  const allClients = [...staticClients, ...dynamicLogos];

  // Duplicate clients for seamless infinite loop
  const duplicatedClients = [...allClients, ...allClients];

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
            {duplicatedClients.map((client, index) => {
              const logoCard = (
                <div className="w-[180px] h-[100px] sm:w-[200px] sm:h-[110px] md:w-[220px] md:h-[120px] lg:w-[250px] lg:h-[140px] flex items-center justify-center bg-white dark:bg-[#14151b] border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <img
                    src={client.logo}
                    alt={client.name || 'Brand logo'}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                    width="250"
                    height="140"
                  />
                </div>
              );

              return (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 mx-1.5 sm:mx-2 md:mx-3 lg:mx-4 xl:mx-6"
                >
                  {client.link ? (
                    <a
                      href={client.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Visit ${client.name || 'brand'} website`}
                    >
                      {logoCard}
                    </a>
                  ) : (
                    logoCard
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
