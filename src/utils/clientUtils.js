/**
 * Formats a filename into a proper client name
 * @param {string} filename - The filename without extension
 * @returns {string} Formatted client name
 */
export const formatClientName = (filename) => {
  return filename
    .replace(/-/g, ' ')  // Replace hyphens with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Gets the list of client logos from the public directory
 * @returns {Array<{name: string, logoPath: string}>} Array of client objects
 */
export const getClientLogos = () => {
  try {
    // In a production environment, you would typically fetch this from an API
    // For now, we'll return a static array that you'll need to update manually
    // when adding new client logos to the /public/images/clients directory
    return [
      // Add your clients here in the format:
      { name: 'SAMPLE CLIENT NAME', logoPath: 'ClientName.jpg' },
      { name: 'SAMPLE CLIENT NAME', logoPath: 'clientname.avif' },
      { name: 'SAMPLE CLIENT NAME', logoPath: 'ClientName.jpg' },
      { name: 'SAMPLE CLIENT NAME', logoPath: 'clientname.avif' },
      { name: 'SAMPLE CLIENT NAME', logoPath: 'ClientName.jpg' },
      { name: 'SAMPLE CLIENT NAME', logoPath: 'clientname.avif' },
      { name: 'SAMPLE CLIENT NAME', logoPath: 'ClientName.jpg' },
      { name: 'SAMPLE CLIENT NAME', logoPath: 'clientname.avif' },
    ];
  } catch (error) {
    console.error('Error getting client logos:', error);
    return [];
  }
}; 