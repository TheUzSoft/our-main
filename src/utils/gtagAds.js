/** Google Ads (gtag) conversion labels */
export const GADS_ID = 'AW-17663610609';
export const GADS_PAGE_VIEW = `${GADS_ID}/HqyECJyYoa0cEPGd1eZB`;
export const GADS_FORM_SUBMIT = `${GADS_ID}/Y4A2CPfTg78bEPGd1eZB`;

/** Просмотр страницы — sahifa ko'rildi */
export function trackPageViewConversion() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: GADS_PAGE_VIEW });
  }
}

/** Aloqa formasi yuborildi */
export function trackFormConversion() {
  if (typeof window.gtag !== 'function') return;

  const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  window.gtag('event', 'conversion', {
    send_to: GADS_FORM_SUBMIT,
    value: 1.0,
    currency: 'USD',
    transaction_id: transactionId,
  });
}
