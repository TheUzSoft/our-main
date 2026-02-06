import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchArticleBySlug, extractTextFromHTML } from '../utils/articlesApi';

const ArticlePost = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const { lang } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentLang = lang || language;
        const data = await fetchArticleBySlug(slug, currentLang);
        if (data) {
          setArticle(data);
        } else {
          setError('not_found');
        }
      } catch (err) {
        console.error('Failed to load article:', err);
        const currentLang = lang || language;
        if (err.message && err.message.includes('404')) {
          setError('not_found');
        } else {
          const errorMessage = currentLang === 'uz'
            ? 'Maqolani yuklashda xatolik. Sahifani yangilang yoki keyinroq qayta urinib ko\'ring.'
            : currentLang === 'en'
            ? 'An error occurred while loading the article. Please refresh or try again later.'
            : 'Произошла ошибка при загрузке статьи. Обновите страницу или попробуйте позже.';
          setError(errorMessage);
        }
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadArticle();
  }, [slug, lang, language]);

  useEffect(() => {
    if (article) {
      const currentLang = lang || language;
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const body = article.body || article.content || '';
      const description = article.short || extractTextFromHTML(body, 150);

      document.title = `${article.title} | TheUzSoft`;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      const updateOGTag = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      const imageField = article.image || article.cover_image || article.thumbnail;
      const ogImage = imageField
        ? (imageField.startsWith('http') ? imageField : `https://api.theuzsoft.uz${imageField}`)
        : `${baseUrl}/logo.png`;

      updateOGTag('og:title', `${article.title} | TheUzSoft`);
      updateOGTag('og:description', description);
      updateOGTag('og:type', 'article');
      updateOGTag('og:url', `${baseUrl}/${currentLang}/articles/${slug}`);
      updateOGTag('og:image', ogImage);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${baseUrl}/${currentLang}/articles/${slug}`);
    }
  }, [article, slug, lang, language]);

  const getImageUrl = () => {
    if (!article) return null;
    const img = article.image || article.cover_image || article.thumbnail;
    if (!img) return null;
    return img.startsWith('http') ? img : `https://api.theuzsoft.uz${img}`;
  };

  if (loading) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {language === 'uz' ? 'Yuklanmoqda...' : language === 'en' ? 'Loading...' : 'Загрузка...'}
          </p>
        </div>
      </section>
    );
  }

  if (error === 'not_found' || (!article && !loading)) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            {language === 'uz' ? 'Maqola topilmadi' : language === 'en' ? 'Article not found' : 'Статья не найдена'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {language === 'uz'
              ? 'Kechirasiz, siz qidirayotgan maqola topilmadi.'
              : language === 'en'
              ? 'Sorry, the article you are looking for was not found.'
              : 'Извините, запрашиваемая статья не найдена.'}
          </p>
          <Link
            to={`/${lang || language}/articles`}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('articles.backToArticles')}
          </Link>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            {language === 'uz' ? 'Xatolik yuz berdi' : language === 'en' ? 'An error occurred' : 'Произошла ошибка'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mr-4"
          >
            {language === 'uz' ? 'Qayta urinish' : language === 'en' ? 'Try again' : 'Попробовать снова'}
          </button>
          <Link
            to={`/${lang || language}/articles`}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {t('articles.backToArticles')}
          </Link>
        </div>
      </section>
    );
  }

  const body = article.body || article.content || '';
  const coverImageUrl = getImageUrl();

  return (
    <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-24">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 pt-2 sm:pt-4"
        >
          <Link
            to={`/${lang || language}/articles`}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('articles.backToArticles')}
          </Link>
        </motion.div>

        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-[#14151b]"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter text-black dark:text-white mb-6 tracking-tight leading-tight">
            {article.title}
          </h1>

          {coverImageUrl && (
            <div className="mb-10 max-w-2xl mx-auto">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                <img
                  src={coverImageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {body && (
            <div
              className="prose prose-lg max-w-none mb-12 dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary prose-img:rounded-xl prose-img:max-w-full prose-img:h-auto prose-img:mx-auto"
              style={{ lineHeight: '1.8', letterSpacing: '0.01em' }}
            >
              {body.includes('<') && body.includes('>') ? (
                <div dangerouslySetInnerHTML={{ __html: body }} />
              ) : (
                <div className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white leading-relaxed whitespace-pre-line space-y-6">
                  {body.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4">
                {t('articles.contactUsTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {t('articles.contactUsSubtitle')}
              </p>
              <Link
                to={`/${lang || language}/#contact`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${lang || language}/#contact`);
                  setTimeout(() => {
                    const element = document.querySelector('#contact');
                    if (element) {
                      const headerOffset = 100;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold text-base transition-colors hover:bg-primary/90"
              >
                {t('articles.contactUs')}
              </Link>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default ArticlePost;
