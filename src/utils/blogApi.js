const API_BASE_URL = 'https://api.theuzsoft.uz/api';

/**
 * Fetch all blogs from API
 * @param {string} lang - Language code (uz/ru)
 * @returns {Promise<Array>}
 */
export const fetchBlogs = async (lang = 'uz') => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs?lang=${lang}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Handle Laravel API response format (data property or direct array)
    return data.data || data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

/**
 * Fetch single blog by slug from API
 * @param {string} slug - Blog slug
 * @param {string} lang - Language code (uz/ru)
 * @returns {Promise<Object>}
 */
export const fetchBlogBySlug = async (slug, lang = 'uz') => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${slug}?lang=${lang}`, {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Handle Laravel API response format
    return data.data || data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

/**
 * Extract text from HTML and truncate
 * @param {string} html - HTML content
 * @param {number} maxLength - Maximum length
 * @returns {string}
 */
export const extractTextFromHTML = (html, maxLength = 150) => {
  if (!html) return '';
  
  // Create temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content and strip whitespace
  let text = tempDiv.textContent || tempDiv.innerText || '';
  text = text.trim().replace(/\s+/g, ' ');
  
  // Truncate if needed
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...';
  }
  
  return text;
};

/**
 * Sort blogs by date (newest first)
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Sorted array
 */
export const sortBlogsByDate = (blogs) => {
  if (!blogs || !Array.isArray(blogs)) return blogs;
  
  return [...blogs].sort((a, b) => {
    // Try created_at first
    if (a.created_at && b.created_at) {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    
    // Try updated_at
    if (a.updated_at && b.updated_at) {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
    
    // Try id (higher ID = newer, if numeric)
    if (a.id && b.id && typeof a.id === 'number' && typeof b.id === 'number') {
      return b.id - a.id;
    }
    
    // Keep original order if no date/id fields
    return 0;
  });
};

