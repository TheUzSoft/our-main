import { getContactIcon } from '../utils/contactIcons';

/**
 * @param {{ items: Array, compact?: boolean }} props
 */
const ContactInfoList = ({ items, compact = false }) => {
  if (!items?.length) return null;

  const addressItem = items.find((item) => item.type === 'address');
  const mapEmbed = addressItem?.map_embed;

  return (
    <>
      <div className={compact ? 'space-y-3' : 'space-y-4 sm:space-y-5'}>
        {items.map((item) => (
          <div
            key={item.id}
            className={
              compact
                ? 'flex items-start space-x-2'
                : 'flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors'
            }
          >
            <div
              className={
                compact
                  ? 'text-primary mt-0.5 flex-shrink-0'
                  : 'w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary'
              }
            >
              {getContactIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={
                  compact
                    ? 'text-xs text-gray-500 mb-0.5'
                    : 'text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1'
                }
              >
                {item.label}
              </p>
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={
                    compact
                      ? 'text-sm text-gray-400 hover:text-primary transition-colors break-words'
                      : 'text-sm sm:text-base font-semibold text-black dark:text-white break-words hover:text-primary transition-colors'
                  }
                >
                  {item.value}
                </a>
              ) : (
                <p
                  className={
                    compact
                      ? 'text-sm text-gray-400 break-words'
                      : 'text-sm sm:text-base font-semibold text-black dark:text-white break-words'
                  }
                >
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {mapEmbed && !compact && (
        <div className="mt-6 sm:mt-8 w-full h-56 sm:h-72 md:h-80 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50">
          <iframe
            src={mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={addressItem?.value || 'Location map'}
          />
        </div>
      )}
    </>
  );
};

export default ContactInfoList;
