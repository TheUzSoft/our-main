import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageViewConversion } from '../utils/gtagAds';

/**
 * SPA: har yangi sahifada «Просмотр страницы» konversiyasini yuboradi.
 * Birinchi yuklanish index.html dagi snippet orqali qayd etiladi.
 */
const GoogleAdsTracker = () => {
  const { pathname } = useLocation();
  const isFirstNavigation = useRef(true);

  useEffect(() => {
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false;
      return;
    }
    trackPageViewConversion();
  }, [pathname]);

  return null;
};

export default GoogleAdsTracker;
