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
 * Gets the list of client logos from the assets directory
 * @returns {Array<{name: string, logoPath: string}>} Array of client objects
 */
export const getClientLogos = () => {
  try {
    // Use Vite's import.meta.glob to get all images from the clients directory
    const logoFiles = import.meta.glob('../assets/clients/*.{jpg,jpeg,png,svg,webp,avif}', { eager: true });
    const clients = [];

    // Process each logo module
    Object.entries(logoFiles).forEach(([path, module]) => {
      // Extract filename without extension
      const filename = path.split('/').pop().replace(/\.[^/.]+$/, "");
      
      clients.push({
        name: formatClientName(filename),
        logoPath: module.default // Use the imported image URL
      });
    });

    // Sort clients by name
    return clients.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error getting client logos:', error);
    console.error('Error details:', error.message);
    return [];
  }
}; 