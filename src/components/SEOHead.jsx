import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SEOHead = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Update document title
    const titles = {
      uz: 'TheUzSoft - Zamonaviy IT Yechimlar | Veb-saytlar, Mobil Ilovalar, Telegram Botlar',
      ru: 'TheUzSoft - Современные IT Решения | Веб-сайты, Мобильные Приложения, Telegram Боты'
    };

    const descriptions = {
      uz: 'TheUzSoft - O\'zbekistondagi professional IT kompaniya. Veb-saytlar, mobil ilovalar, Telegram botlar va AI loyihalar yaratish xizmatlari.',
      ru: 'TheUzSoft - профессиональная IT компания в Узбекистане. Услуги по созданию веб-сайтов, мобильных приложений, Telegram ботов и AI проектов.'
    };

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    document.title = titles[language] || titles.uz;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptions[language] || descriptions.uz);

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', titles[language] || titles.uz);
    updateOGTag('og:description', descriptions[language] || descriptions.uz);
    updateOGTag('og:type', 'website');
    updateOGTag('og:locale', language === 'uz' ? 'uz_UZ' : 'ru_RU');
    updateOGTag('og:url', `${baseUrl}/${language}/`);
    updateOGTag('og:image', `${baseUrl}/logo.png`);
    updateOGTag('og:site_name', 'TheUzSoft');

    // Update Twitter Card
    const updateTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', titles[language] || titles.uz);
    updateTwitterTag('twitter:description', descriptions[language] || descriptions.uz);
    updateTwitterTag('twitter:image', `${baseUrl}/logo.png`);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}/${language}/`);

    // Update alternate language links
    const updateAlternate = (lang, href) => {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.setAttribute('rel', 'alternate');
        alternate.setAttribute('hreflang', lang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute('href', href);
    };

    updateAlternate('uz', `${baseUrl}/uz/`);
    updateAlternate('ru', `${baseUrl}/ru/`);
    updateAlternate('x-default', `${baseUrl}/ru/`);

  }, [language]);

  return null;
};

export default SEOHead;
