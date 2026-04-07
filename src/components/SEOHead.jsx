import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const BASE_URL = 'https://theuzsoft.uz';

const SEO_DATA = {
  uz: {
    title: 'TheUzSoft - IT Kompaniya Toshkent | Veb-saytlar, Mobil Ilovalar, CRM, Telegram Bot',
    description: "TheUzSoft — O'zbekistondagi professional IT kompaniya. Veb-saytlar, mobil ilovalar (Android/iOS), CRM tizimlar, Telegram botlar va AI loyihalar. Bepul konsultatsiya.",
    locale: 'uz_UZ',
    htmlLang: 'uz',
  },
  ru: {
    title: 'TheUzSoft - IT Компания Ташкент | Сайты, Мобильные Приложения, CRM, Telegram Боты',
    description: 'TheUzSoft — профессиональная IT компания в Узбекистане. Веб-сайты, мобильные приложения (Android/iOS), CRM системы, Telegram боты и AI проекты. Бесплатная консультация.',
    locale: 'ru_RU',
    htmlLang: 'ru',
  },
  en: {
    title: 'TheUzSoft - IT Company Tashkent | Websites, Mobile Apps, CRM, Telegram Bots',
    description: 'TheUzSoft — professional IT company in Uzbekistan. Websites, mobile apps (Android/iOS), CRM systems, Telegram bots and AI projects. Free consultation.',
    locale: 'en_US',
    htmlLang: 'en',
  },
};

const setMeta = (selector, attr, value) => {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const parts = selector.match(/\[(\w+)="([^"]+)"\]/g) || [];
    parts.forEach((part) => {
      const [, k, v] = part.match(/\[(\w+)="([^"]+)"\]/);
      el.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const setLink = (selector, attr, value) => {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    const parts = selector.match(/\[(\w+)="([^"]+)"\]/g) || [];
    parts.forEach((part) => {
      const [, k, v] = part.match(/\[(\w+)="([^"]+)"\]/);
      el.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const SEOHead = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const seo = SEO_DATA[language] || SEO_DATA.ru;
    const ogImage = `${BASE_URL}/logo.png`;
    const pageUrl = `${BASE_URL}/${language}/`;

    // html lang
    document.documentElement.lang = seo.htmlLang;

    // title
    document.title = seo.title;

    // description
    setMeta('meta[name="description"]', 'content', seo.description);

    // Open Graph
    setMeta('meta[property="og:title"]',       'content', seo.title);
    setMeta('meta[property="og:description"]',  'content', seo.description);
    setMeta('meta[property="og:type"]',         'content', 'website');
    setMeta('meta[property="og:url"]',          'content', pageUrl);
    setMeta('meta[property="og:image"]',        'content', ogImage);
    setMeta('meta[property="og:image:width"]',  'content', '1200');
    setMeta('meta[property="og:image:height"]', 'content', '630');
    setMeta('meta[property="og:image:alt"]',    'content', 'TheUzSoft - IT Kompaniya Toshkent');
    setMeta('meta[property="og:site_name"]',    'content', 'TheUzSoft');
    setMeta('meta[property="og:locale"]',       'content', seo.locale);

    // og:locale:alternate — remove old ones, add fresh
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove());
    Object.entries(SEO_DATA)
      .filter(([lang]) => lang !== language)
      .forEach(([, data]) => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:locale:alternate');
        el.setAttribute('content', data.locale);
        document.head.appendChild(el);
      });

    // Twitter Card
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
    setMeta('meta[name="twitter:site"]',        'content', '@theuzsoft');
    setMeta('meta[name="twitter:title"]',       'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:image"]',       'content', ogImage);
    setMeta('meta[name="twitter:image:alt"]',   'content', 'TheUzSoft - IT Kompaniya Toshkent');

    // Canonical
    setLink('link[rel="canonical"]', 'href', pageUrl);

    // Hreflang alternates
    setLink('link[rel="alternate"][hreflang="uz"]',        'href', `${BASE_URL}/uz/`);
    setLink('link[rel="alternate"][hreflang="ru"]',        'href', `${BASE_URL}/ru/`);
    setLink('link[rel="alternate"][hreflang="en"]',        'href', `${BASE_URL}/en/`);
    setLink('link[rel="alternate"][hreflang="x-default"]', 'href', `${BASE_URL}/ru/`);

  }, [language]);

  return null;
};

export default SEOHead;
