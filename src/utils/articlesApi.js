const API_BASE_URL = 'https://api.theuzsoft.uz/api';

const normalizeArticlesListResponse = (payload) => {
  if (!payload) return { items: [], meta: null };
  if (Array.isArray(payload)) return { items: payload, meta: null };

  const envelope = payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)
    ? payload.data
    : payload;
  const items = Array.isArray(envelope.data) ? envelope.data : (Array.isArray(envelope.items) ? envelope.items : []);
  const meta = envelope.meta || envelope.pagination || payload.meta || payload.pagination || null;
  return { items, meta };
};

const buildApiError = async (response, fallbackMessage) => {
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  const message = payload?.message || fallbackMessage || `HTTP ${response.status}`;
  const error = new Error(message);
  error.status = response.status;
  error.code = payload?.code || (response.status === 422 ? 'VALIDATION_ERROR' : null);
  error.details = payload?.errors || null;
  error.payload = payload;
  return error;
};

/**
 * Fetch all articles from API (admin panel)
 * @param {string} lang - Language code (uz/ru/en)
 * @returns {Promise<Array>}
 */
export const fetchArticles = async (params = 'uz') => {
  try {
    const isLangString = typeof params === 'string';
    const lang = isLangString ? params : (params?.lang || 'uz');
    const page = isLangString ? undefined : params?.page;
    const perPage = isLangString ? undefined : (params?.perPage ?? params?.per_page);

    const searchParams = new URLSearchParams();
    if (lang) searchParams.set('lang', lang);
    if (page) searchParams.set('page', String(page));
    if (perPage) searchParams.set('per_page', String(perPage));

    const response = await fetch(`${API_BASE_URL}/articles?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw await buildApiError(response, '404: Articles not found');
      }
      if (response.status === 500) {
        throw await buildApiError(response, '500: Server error');
      }
      if (response.status === 422) {
        throw await buildApiError(response, '422: Validation failed');
      }
      if (response.status >= 400 && response.status < 500) {
        throw await buildApiError(response, `HTTP ${response.status}: Client error`);
      }
      throw await buildApiError(response, `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return normalizeArticlesListResponse(data);
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

/**
 * Fetch single article by slug from API
 * @param {string} slug - Article slug
 * @param {string} lang - Language code (uz/ru/en)
 * @returns {Promise<Object>}
 */
export const fetchArticleBySlug = async (slug, lang = 'uz') => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}?lang=${lang}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      if (response.status === 500) {
        throw await buildApiError(response, '500: Server error');
      }
      if (response.status === 422) {
        throw await buildApiError(response, '422: Validation failed');
      }
      if (response.status >= 400 && response.status < 500) {
        throw await buildApiError(response, `HTTP ${response.status}: Client error`);
      }
      throw await buildApiError(response, `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data === 'object' && data.status && data.data) {
      return data.data;
    }
    return data.data || data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

/**
 * Extract text from HTML and truncate
 */
export const extractTextFromHTML = (html, maxLength = 150) => {
  if (!html) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  let text = (tempDiv.textContent || tempDiv.innerText || '').trim().replace(/\s+/g, ' ');
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...';
  }
  return text;
};

/**
 * Sort articles by date (newest first)
 */
export const sortArticlesByDate = (articles) => {
  if (!articles || !Array.isArray(articles)) return articles;
  return [...articles].sort((a, b) => {
    if (a.created_at && b.created_at) {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (a.updated_at && b.updated_at) {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
    if (a.id && b.id && typeof a.id === 'number' && typeof b.id === 'number') {
      return b.id - a.id;
    }
    return 0;
  });
};
