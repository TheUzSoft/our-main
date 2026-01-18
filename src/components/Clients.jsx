import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchBrandLogos } from '../utils/brandsApi';

const Clients = () => {
  const { t } = useLanguage();
  const [dynamicLogos, setDynamicLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic logos from API
  useEffect(() => {
    const loadDynamicLogos = async () => {
      try {
        setLoading(true);
        const logos = await fetchBrandLogos();
        setDynamicLogos(logos);
      } catch (error) {
        console.error('Failed to load dynamic logos:', error);
        setDynamicLogos([]);
      } finally {
        setLoading(false);
      }
    };

    loadDynamicLogos();
  }, []);

  // Use only dynamic logos from database
  const allClients = dynamicLogos;

  // Duplicate clients for seamless infinite loop (only if we have clients)
  const duplicatedClients = allClients.length > 0 ? [...allClients, ...allClients] : [];

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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
          ) : allClients.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600 dark:text-gray-400">No brands available</div>
            </div>
          ) : (
            <div className="flex clients-carousel">
              {duplicatedClients.map((client, index) => {
                // Ensure logo URL is properly formatted
                const logoUrl = client.logo 
                  ? (client.logo.startsWith('http') 
                      ? client.logo 
                      : `https://api.theuzsoft.uz${client.logo.startsWith('/') ? client.logo : '/' + client.logo}`)
                  : null;

                const logoCard = (
                  <div className="w-[180px] h-[100px] sm:w-[200px] sm:h-[110px] md:w-[220px] md:h-[120px] lg:w-[250px] lg:h-[140px] flex items-center justify-center bg-white dark:bg-[#14151b] border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={client.name || 'Brand logo'}
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                        loading="lazy"
                        width="250"
                        height="140"
                        onError={(e) => {
                          console.error('Failed to load image:', logoUrl);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image</div>
                    )}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Clients;
