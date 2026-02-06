import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchArticles, extractTextFromHTML, sortArticlesByDate } from '../utils/articlesApi';

const ArticlesList = () => {
  const { language, t } = useLanguage();
  const { lang } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentLang = lang || language || 'ru';
        const data = await fetchArticles(currentLang);
        if (data && data.length > 0) {
          setArticles(sortArticlesByDate(data));
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error('Failed to load articles:', err);
        const currentLang = lang || language;
        let errorMessage = 'Failed to load articles';
        if (err.message && err.message.includes('404')) {
          errorMessage = currentLang === 'uz'
            ? 'Maqolalar topilmadi'
            : currentLang === 'en'
            ? 'Articles not found'
            : 'Статьи не найдены';
        } else if (err.message && (err.message.includes('Network') || err.message.includes('fetch'))) {
          errorMessage = currentLang === 'uz'
            ? 'Internet aloqasi bilan muammo. Iltimos, internet aloqasini tekshiring.'
            : currentLang === 'en'
            ? 'Network connection problem. Please check your internet connection.'
            : 'Проблема с подключением к сети. Пожалуйста, проверьте подключение к интернету.';
        } else {
          errorMessage = currentLang === 'uz'
            ? 'Maqolalarni yuklashda xatolik. Sahifani yangilang yoki keyinroq qayta urinib ko\'ring.'
            : currentLang === 'en'
            ? 'An error occurred while loading articles. Please refresh or try again later.'
            : 'Произошла ошибка при загрузке статей. Обновите страницу или попробуйте позже.';
        }
        setError(errorMessage);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [lang, language]);

  useEffect(() => {
    const currentLang = lang || language;
    const title = currentLang === 'uz'
      ? 'Maqolalar | TheUzSoft'
      : currentLang === 'en'
      ? 'Articles | TheUzSoft'
      : 'Статьи | TheUzSoft';
    const description = currentLang === 'uz'
      ? 'Foydali maqolalar va materiallar. TheUzSoft.'
      : currentLang === 'en'
      ? 'Useful articles and materials. TheUzSoft.'
      : 'Полезные статьи и материалы. TheUzSoft.';

    document.title = title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:type', 'website');
    updateOGTag('og:url', `${baseUrl}/${currentLang}/articles`);
    updateOGTag('og:image', `${baseUrl}/logo.png`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}/${currentLang}/articles`);
  }, [lang, language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const getImageUrl = (article) => {
    const img = article.image || article.cover_image || article.thumbnail;
    if (!img) return null;
    return img.startsWith('http') ? img : `https://api.theuzsoft.uz${img}`;
  };

  if (loading) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-24 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {language === 'uz' ? 'Yuklanmoqda...' : language === 'en' ? 'Loading...' : 'Загрузка...'}
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-24 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            {language === 'uz' ? 'Xatolik yuz berdi' : language === 'en' ? 'An error occurred' : 'Произошла ошибка'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {language === 'uz' ? 'Qayta urinish' : language === 'en' ? 'Try again' : 'Попробовать снова'}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter text-black dark:text-white mb-4 tracking-tight">
            {t('articles.title')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('articles.subtitle')}
          </p>
        </motion.div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {language === 'uz' ? 'Maqolalar topilmadi' : language === 'en' ? 'No articles found' : 'Статьи не найдены'}
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {articles.map((article, index) => {
              const body = article.body || article.content || '';
              const shortDescription = article.short || extractTextFromHTML(body, 120);
              const imageUrl = getImageUrl(article);

              return (
                <motion.article
                  key={article.id || article.slug || index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white dark:bg-[#14151b] rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary transition-all duration-300 overflow-hidden md:hover:shadow-lg"
                >
                  {imageUrl && (
                    <Link to={`/${lang || language}/articles/${article.slug}`} className="block aspect-[16/10] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                  )}
                  <div className="p-6 sm:p-7 md:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      <Link to={`/${lang || language}/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    {shortDescription && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {shortDescription}
                      </p>
                    )}
                    <Link
                      to={`/${lang || language}/articles/${article.slug}`}
                      className="inline-flex items-center text-primary font-semibold text-sm sm:text-base group-hover:text-primary/80 transition-colors"
                    >
                      {t('articles.readMore')}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            to={`/${lang || language}/`}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('articles.backToHome')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesList;
