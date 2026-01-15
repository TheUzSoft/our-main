const API_BASE_URL = 'https://api.theuzsoft.uz/api';

/**
 * Fetch brand logos from API
 * API returns only logo images (URLs)
 * @returns {Promise<Array>} Array of logo objects with image URL and optional link
 */
export const fetchBrandLogos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // If API fails, return empty array (static logos will still show)
      if (response.status === 404) {
        return [];
      }
      // For other errors, also return empty array to not break UI
      return [];
    }

    const data = await response.json();
    // Handle Laravel API response format (data property or direct array)
    const logos = data.data || data;
    
    // Ensure we return an array
    if (!Array.isArray(logos)) {
      return [];
    }
    
    // Map API response to our format
    // API returns: [{ image: 'url', link: 'optional_url' }] or just ['url', 'url']
    return logos.map((logo, index) => {
      if (typeof logo === 'string') {
        // If logo is just a string URL
        return {
          id: `dynamic-${index}`,
          logo: logo,
          link: null,
        };
      } else if (logo && logo.image) {
        // If logo is an object with image property
        return {
          id: `dynamic-${logo.id || index}`,
          logo: logo.image,
          link: logo.link || null,
        };
      } else if (logo && logo.logo) {
        // If logo is an object with logo property
        return {
          id: `dynamic-${logo.id || index}`,
          logo: logo.logo,
          link: logo.link || null,
        };
      }
      return null;
    }).filter(Boolean); // Remove any null values
  } catch (error) {
    // Silently fail - static logos will still be displayed
    console.warn('Error fetching brand logos from API:', error);
    return [];
  }
};

