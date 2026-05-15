import { useLanguage } from '../context/LanguageContext';
import {
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildGoogleMapsOpenUrl,
} from '../utils/googleMapsLinks';

/**
 * Google Maps embed + ishlaydigan «Xaritada ochish» va «Yo'nalish» tugmalari.
 * Xarita o'zi siljmaydi (overlay), faqat yuqoridagi kartochka bosiladi.
 */
const SiteLocationMap = ({
  latitude,
  longitude,
  zoom = 16,
  address = '',
  mapEmbed = null,
  className = '',
}) => {
  const { t } = useLanguage();

  const lat = Number(latitude);
  const lng = Number(longitude);
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const embedSrc =
    mapEmbed ||
    (hasCoords ? buildGoogleMapsEmbedUrl(lat, lng, zoom) : null);

  const openUrl = buildGoogleMapsOpenUrl(lat, lng, address);
  const directionsUrl = buildGoogleMapsDirectionsUrl(lat, lng, address);

  if (!embedSrc) return null;

  const shortAddress =
    address.length > 42 ? `${address.slice(0, 42)}…` : address;

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={embedSrc}
        title={address || 'Location map'}
        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Xarita bilan o'zaro aloqa bloklanadi; kartochka va tugmalar ustida */}
      <div
        className="absolute inset-0 z-[5] cursor-default"
        aria-hidden="true"
        onWheel={(e) => e.preventDefault()}
      />

      <div className="absolute top-3 left-3 z-20 max-w-[min(100%,18rem)] sm:max-w-xs pointer-events-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200/80 overflow-hidden">
          <div className="px-3 py-2.5 pr-2 flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 leading-snug truncate">
                {shortAddress.split(',')[0] || address}
              </p>
              {shortAddress && (
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                  {shortAddress}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              {openUrl && (
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  title={t('contact.openInMaps')}
                  aria-label={t('contact.openInMaps')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#4285F4] text-white hover:bg-[#3367d6] transition-colors shadow-sm"
                  title={t('contact.getDirections')}
                  aria-label={t('contact.getDirections')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLocationMap;
