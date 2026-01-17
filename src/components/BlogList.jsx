import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchBlogs, extractTextFromHTML, sortBlogsByDate } from '../utils/blogApi';

const BlogList = () => {
  const { language, t } = useLanguage();
  const { lang } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentLang = lang || language || 'ru';
        
        const blogData = await fetchBlogs(currentLang);
        if (blogData && blogData.length > 0) {
          // Sort blogs by date (newest first)
          const sortedBlogs = sortBlogsByDate(blogData);
          setBlogs(sortedBlogs);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
        const currentLang = lang || language;
        // Provide user-friendly error messages in the current language
        let errorMessage = 'Failed to load blogs';
        if (err.message && err.message.includes('404')) {
          errorMessage = currentLang === 'uz' 
            ? 'Blog maqolalari topilmadi'
            : currentLang === 'en'
            ? 'Blog articles not found'
            : 'Статьи блога не найдены';
        } else if (err.message && err.message.includes('Network') || err.message && err.message.includes('fetch')) {
          errorMessage = currentLang === 'uz'
            ? 'Internet aloqasi bilan muammo. Iltimos, internet aloqasini tekshiring.'
            : currentLang === 'en'
            ? 'Network connection problem. Please check your internet connection.'
            : 'Проблема с подключением к сети. Пожалуйста, проверьте подключение к интернету.';
        } else {
          errorMessage = currentLang === 'uz'
            ? 'Maqolalarni yuklashda xatolik yuz berdi. Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko\'ring.'
            : currentLang === 'en'
            ? 'An error occurred while loading articles. Please refresh the page or try again later.'
            : 'Произошла ошибка при загрузке статей. Пожалуйста, обновите страницу или попробуйте позже.';
        }
        setError(errorMessage);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [lang, language]);

  // Update SEO meta tags
  useEffect(() => {
    const currentLang = lang || language;
    const title = currentLang === 'uz' 
      ? 'Blog | TheUzSoft — IT yechimlar va loyihalar'
      : currentLang === 'en'
      ? 'Blog | TheUzSoft — IT Solutions and Projects'
      : 'Блог | TheUzSoft — IT решения и проекты';
    const description = currentLang === 'uz'
      ? 'IT sohasidagi eng so\'nggi yangiliklar, loyihalar va texnologiyalar. TheUzSoft kompaniyasining professional blogi.'
      : currentLang === 'en'
      ? 'Latest news, projects, and technologies in the IT field. Professional blog of TheUzSoft company.'
      : 'Последние новости, проекты и технологии в сфере IT. Профессиональный блог компании TheUzSoft.';
    
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Open Graph
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
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    updateOGTag('og:url', `${baseUrl}/${currentLang}/blog`);
    updateOGTag('og:image', `${baseUrl}/logo.png`);

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}/${currentLang}/blog`);
  }, [lang, language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-24 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            {language === 'uz' ? 'Xatolik yuz berdi' : language === 'en' ? 'An error occurred' : 'Произошла ошибка'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              const currentLang = lang || language;
              fetchBlogs(currentLang)
                .then((blogData) => {
                  if (blogData && blogData.length > 0) {
                    const sortedBlogs = sortBlogsByDate(blogData);
                    setBlogs(sortedBlogs);
                  } else {
                    setBlogs([]);
                  }
                })
                .catch((err) => {
                  console.error('Failed to load blogs:', err);
                  const errorMessage = currentLang === 'uz'
                    ? 'Maqolalarni yuklashda xatolik yuz berdi. Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko\'ring.'
                    : currentLang === 'en'
                    ? 'An error occurred while loading articles. Please refresh the page or try again later.'
                    : 'Произошла ошибка при загрузке статей. Пожалуйста, обновите страницу или попробуйте позже.';
                  setError(errorMessage);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter text-black dark:text-white mb-4 tracking-tight">
            {t('blog.title') || (language === 'uz' ? 'Blog' : language === 'en' ? 'Blog' : 'Блог')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('blog.subtitle') || (language === 'uz' 
              ? 'IT sohasidagi eng so\'nggi yangiliklar, loyihalar va texnologiyalar'
              : language === 'en'
              ? 'Latest news, projects, and technologies in the IT field'
              : 'Последние новости, проекты и технологии в сфере IT')}
          </p>
        </motion.div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
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
            {blogs.map((blog, index) => {
              // Extract short description from HTML content
              const shortDescription = blog.short || extractTextFromHTML(blog.content || '', 120);
              
              // Get duration field - check multiple possible field names
              const duration = blog.duration || blog.development_time || blog.production_time || blog.time;
              
              return (
                <motion.article
                  key={blog.id || blog.slug || index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white dark:bg-[#14151b] p-6 sm:p-7 md:p-8 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary transition-all duration-300 cursor-pointer md:hover:shadow-lg"
                >
                  {/* Category Badge */}
                  {blog.category && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  {/* Short Description */}
                  {shortDescription && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {shortDescription}
                    </p>
                  )}
                  
                  {/* Duration */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    {duration ? (
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {duration}
                      </span>
                    ) : (
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {language === 'uz' ? 'Ishlab chiqish vaqti: to\'liq ma\'lumot' : 'Время разработки: полная информация'}
                      </span>
                    )}
                    <Link
                      to={`/${lang || language}/blog/${blog.slug}`}
                      className="inline-flex items-center text-primary font-semibold text-sm sm:text-base group-hover:text-primary/80 transition-colors"
                    >
                      {t('blog.readMore') || (language === 'uz' ? 'Batafsil' : 'Читать далее')}
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

        {/* Back to Home */}
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
            {t('blog.backToHome') || (language === 'uz' ? 'Bosh sahifaga qaytish' : language === 'en' ? 'Back to home' : 'Вернуться на главную')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;
