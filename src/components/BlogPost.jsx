import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchBlogBySlug, extractTextFromHTML } from '../utils/blogApi';

const BlogPost = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const { lang } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentLang = lang || language;
        
        const blogData = await fetchBlogBySlug(slug, currentLang);
        if (blogData) {
          setBlog(blogData);
        } else {
          setError('not_found');
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
        if (err.message && err.message.includes('404')) {
          setError('not_found');
        } else {
          setError(err.message || 'Failed to load blog');
        }
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlog();
    }
  }, [slug, lang, language]);

  // Update SEO meta tags
  useEffect(() => {
    if (blog) {
      const currentLang = lang || language;
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      
      // Title
      document.title = `${blog.title} | TheUzSoft`;
      
      // Description - extract from HTML content
      const description = blog.short || extractTextFromHTML(blog.content || '', 150);
      
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

      const ogImage = blog.cover_image 
        ? (blog.cover_image.startsWith('http') ? blog.cover_image : `https://api.theuzsoft.uz${blog.cover_image}`)
        : `${baseUrl}/logo.png`;

      updateOGTag('og:title', `${blog.title} | TheUzSoft`);
      updateOGTag('og:description', description);
      updateOGTag('og:type', 'article');
      updateOGTag('og:url', `${baseUrl}/${currentLang}/blog/${slug}`);
      updateOGTag('og:image', ogImage);
      const localeMap = {
        uz: 'uz_UZ',
        ru: 'ru_RU',
        en: 'en_US'
      };
      updateOGTag('og:locale', localeMap[currentLang] || 'ru_RU');

      // Update canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${baseUrl}/${currentLang}/blog/${slug}`);
    }
  }, [blog, slug, lang, language]);

  // Loading state
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

  // Error state
  if (error === 'not_found' || (!blog && !loading)) {
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
            to={`/${lang || language}/blog`}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {language === 'uz' ? 'Blogga qaytish' : language === 'en' ? 'Back to blog' : 'Вернуться в блог'}
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
            to={`/${lang || language}/blog`}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {language === 'uz' ? 'Blogga qaytish' : language === 'en' ? 'Back to blog' : 'Вернуться в блог'}
          </Link>
        </div>
      </section>
    );
  }

  if (!blog) {
    return null;
  }

  // Get cover image URL
  const coverImageUrl = blog.cover_image 
    ? (blog.cover_image.startsWith('http') 
        ? blog.cover_image 
        : `https://api.theuzsoft.uz${blog.cover_image}`)
    : null;

  return (
    <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-24">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 pt-2 sm:pt-4"
        >
          <Link
            to={`/${lang || language}/blog`}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('blog.backToBlog') || (language === 'uz' ? 'Blogga qaytish' : 'Вернуться в блог')}
          </Link>
        </motion.div>

        {/* Visual Divider */}
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-[#14151b]"
        >
          {/* Category Badge */}
          {blog.category && (
          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-full">
              {blog.category}
            </span>
          </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter text-black dark:text-white mb-6 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Duration */}
          {(blog.duration || blog.development_time || blog.production_time || blog.time) && (
          <div className="mb-10 pb-6 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {blog.duration || blog.development_time || blog.production_time || blog.time}
            </p>
          </div>
          )}

          {/* Cover Image */}
          {coverImageUrl && (
            <div className="mb-10">
              <img
                src={coverImageUrl}
                alt={blog.title}
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Content - HTML or Plain Text */}
          {blog.content && (
            <div 
              className="prose prose-lg max-w-none mb-12 dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary prose-img:rounded-xl"
              style={{
                lineHeight: '1.8',
                letterSpacing: '0.01em'
              }}
            >
              {/* Check if content contains HTML tags */}
              {blog.content.includes('<') && blog.content.includes('>') ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                // Plain text content - split by paragraphs
                <div className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white leading-relaxed whitespace-pre-line space-y-6">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 last:mb-0">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
              )}
          </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4">
                {language === 'uz' 
                  ? 'Loyihangizni boshlashga tayyormisiz?'
                  : language === 'en'
                  ? 'Ready to start your project?'
                  : 'Готовы начать свой проект?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {language === 'uz'
                  ? 'Bizning mutaxassislarimiz bilan bog\'laning va loyihangizni muhokama qiling.'
                  : language === 'en'
                  ? 'Contact our specialists and discuss your project.'
                  : 'Свяжитесь с нашими специалистами и обсудите ваш проект.'}
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
                {t('blog.contactUs') || (language === 'uz' ? 'Bog\'lanish' : language === 'en' ? 'Contact us' : 'Связаться с нами')}
              </Link>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost;
