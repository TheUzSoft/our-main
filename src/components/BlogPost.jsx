import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import uzBlogs from '../../data/blogs/uz.json';
import ruBlogs from '../../data/blogs/ru.json';

const BlogPost = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const { lang } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Load blog based on current language
    const currentLang = lang || language;
    const blogData = currentLang === 'ru' ? ruBlogs : uzBlogs;
    const foundBlog = blogData.find((b) => b.slug === slug);
    
    if (foundBlog) {
      setBlog(foundBlog);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [slug, lang, language]);

  // Update SEO meta tags
  useEffect(() => {
    if (blog) {
      const currentLang = lang || language;
      const baseUrl = window.location.origin;
      
      // Title
      document.title = `${blog.title} | TheUzSoft`;
      
      // Description - first 150 characters of content
      const description = blog.content.replace(/\n\n/g, ' ').substring(0, 150).trim() + '...';
      
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

      updateOGTag('og:title', `${blog.title} | TheUzSoft`);
      updateOGTag('og:description', description);
      updateOGTag('og:type', 'article');
      updateOGTag('og:url', `${baseUrl}/${currentLang}/blog/${slug}`);
      updateOGTag('og:image', `${baseUrl}/logo.png`);
      updateOGTag('og:locale', currentLang === 'uz' ? 'uz_UZ' : 'ru_RU');

      // Update canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${baseUrl}/${currentLang}/blog/${slug}`);

      // Update alternate language links
      const updateAlternate = (hreflang, href) => {
        let alternate = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
        if (!alternate) {
          alternate = document.createElement('link');
          alternate.setAttribute('rel', 'alternate');
          alternate.setAttribute('hreflang', hreflang);
          document.head.appendChild(alternate);
        }
        alternate.setAttribute('href', href);
      };

      // Find corresponding blog in other language
      const otherLangData = currentLang === 'ru' ? uzBlogs : ruBlogs;
      const correspondingBlog = otherLangData.find((b) => {
        // Try to match by similar slug or title
        return b.title.toLowerCase().includes(blog.title.split(' ')[0].toLowerCase()) ||
               blog.title.toLowerCase().includes(b.title.split(' ')[0].toLowerCase());
      });

      if (correspondingBlog) {
        const otherLang = currentLang === 'ru' ? 'uz' : 'ru';
        updateAlternate(currentLang, `${baseUrl}/${currentLang}/blog/${slug}`);
        updateAlternate(otherLang, `${baseUrl}/${otherLang}/blog/${correspondingBlog.slug}`);
      } else {
        updateAlternate(currentLang, `${baseUrl}/${currentLang}/blog/${slug}`);
        updateAlternate('x-default', `${baseUrl}/uz/blog/${slug}`);
      }
    }
  }, [blog, slug, lang, language]);

  if (notFound) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            {language === 'uz' ? 'Maqola topilmadi' : 'Статья не найдена'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {language === 'uz' 
              ? 'Kechirasiz, siz qidirayotgan maqola topilmadi.' 
              : 'Извините, запрашиваемая статья не найдена.'}
          </p>
          <Link
            to={`/${lang || language}/blog`}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {language === 'uz' ? 'Blogga qaytish' : 'Вернуться в блог'}
          </Link>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center pt-32 md:pt-40">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-24">
      <div className="container mx-auto max-w-3xl">
        {/* Back Button - Fixed spacing to avoid header overlap */}
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
          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-full">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter text-black dark:text-white mb-6 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Duration */}
          <div className="mb-10 pb-6 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {blog.duration}
            </p>
          </div>

          {/* Content - Improved typography */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white leading-relaxed whitespace-pre-line space-y-6"
              style={{
                lineHeight: '1.8',
                letterSpacing: '0.01em'
              }}
            >
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 last:mb-0">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="bg-gray-50 dark:bg-[#14151b] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4">
                {language === 'uz' 
                  ? 'Loyihangizni boshlashga tayyormisiz?' 
                  : 'Готовы начать свой проект?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {language === 'uz'
                  ? 'Bizning mutaxassislarimiz bilan bog\'laning va loyihangizni muhokama qiling.'
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
                {t('blog.contactUs') || (language === 'uz' ? 'Bog\'lanish' : 'Связаться с нами')}
              </Link>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost;
