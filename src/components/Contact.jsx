import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchContacts } from '../utils/contactsApi';
import ContactInfoList from './ContactInfoList';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [contactItems, setContactItems] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setContactsLoading(true);
        const items = await fetchContacts(language);
        if (!cancelled) setContactItems(items);
      } catch (err) {
        console.error('Failed to load contacts:', err);
        if (!cancelled) setContactItems([]);
      } finally {
        if (!cancelled) setContactsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [language]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.errors.phoneRequired');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Google Ads Conversion Tracking
  const gtag_report_conversion = () => {
    if (typeof window.gtag !== 'undefined') {
      // Generate unique transaction ID
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17663610609/Y4A2CPfTg78bEPGd1eZB',
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': transactionId
      });
    }
  };

  const sendToTelegram = async (data) => {
    const BOT_TOKEN = '8253940437:AAF3XU7S0fah_c1JU_CcTsWrb4azjsrfT60';
    const CHAT_ID = '-1003449059692';
    
    const langText = language === 'uz' ? 'O\'zbek' : 'Русский';
    const dateTime = new Date().toLocaleString('uz-UZ', { 
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const message = `🆕 <b>Yangi xabar</b>\n\n` +
      `👤 <b>Ism:</b> ${data.name}\n` +
      `📞 <b>Telefon:</b> ${data.phone}\n` +
      `💬 <b>Xabar:</b>\n${data.message}\n\n` +
      `🌐 <b>Til:</b> ${langText}\n` +
      `⏰ <b>Vaqt:</b> ${dateTime}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const result = await response.json();
      if (!result.ok) {
        console.error('Telegram API error:', result);
      }
      return result.ok;
    } catch (error) {
      console.error('Telegram API error:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const submitData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    try {
      const success = await sendToTelegram(submitData);
      
      if (success) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        setErrors({});
        
        // Track Google Ads conversion
        gtag_report_conversion();
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 md:py-24 bg-white dark:bg-[#14151b] px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-black dark:text-white mb-2 sm:mb-3 md:mb-4 tracking-tight px-2 sm:px-0">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2"
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm sm:text-base bg-white dark:bg-[#14151b] text-black dark:text-white ${
                      errors.name ? 'border-red-300' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    placeholder={t('contact.name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2"
                  >
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm sm:text-base bg-white dark:bg-[#14151b] text-black dark:text-white ${
                      errors.phone ? 'border-red-300' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none text-sm sm:text-base bg-white dark:bg-[#14151b] text-black dark:text-white ${
                      errors.message ? 'border-red-300' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    placeholder={t('contact.message')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      {t('contact.success')}
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">
                      {t('contact.error') || (language === 'uz' ? 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.' : 'Произошла ошибка. Пожалуйста, попробуйте снова.')}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-semibold text-sm sm:text-base transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t('contact.sending')}</span>
                    </>
                  ) : (
                    t('contact.send')
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {contactsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : (
                <ContactInfoList
                  items={contactItems}
                  mapLinkLabel={t('contact.viewLocation')}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
