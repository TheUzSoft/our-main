const API_BASE_URL = 'https://api.theuzsoft.uz/api';

/**
 * Fetch all articles from API (admin panel)
 * @param {string} lang - Language code (uz/ru/en)
 * @returns {Promise<Array>}
 */
export const fetchArticles = async (lang = 'uz') => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?lang=${lang}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404: Articles not found');
      } else if (response.status === 500) {
        throw new Error('500: Server error');
      } else if (response.status >= 400 && response.status < 500) {
        throw new Error(`HTTP ${response.status}: Client error`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    return data.data || data;
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
        throw new Error('500: Server error');
      } else if (response.status >= 400 && response.status < 500) {
        throw new Error(`HTTP ${response.status}: Client error`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
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
