const API_BASE_URL = 'https://api.theuzsoft.uz/api';

/**
 * @param {string} lang - uz | ru | en
 * @returns {Promise<Array>}
 */
export const fetchContacts = async (lang = 'uz') => {
  const response = await fetch(`${API_BASE_URL}/contacts?lang=${lang}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load contacts: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};
