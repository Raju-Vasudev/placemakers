/**
 * Formats a filename into a proper title
 * @param {string} filename - The filename without extension
 * @returns {string} Formatted title
 */
export const formatGalleryTitle = (filename) => {
  return filename
    .replace(/-/g, ' ')  // Replace hyphens with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Gets the list of gallery images from the assets directory
 * @returns {Array<{title: string, src: string, gradient: string}>} Array of gallery image objects
 */
export const getGalleryImages = () => {
  try {
    // Use Vite's import.meta.glob to get all images from the gallery directory
    const imageFiles = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png}', { eager: true });
    const galleryImages = [];

    // Process each image module
    Object.entries(imageFiles).forEach(([path, module]) => {
      // Extract filename without extension
      const filename = path.split('/').pop().replace(/\.[^/.]+$/, "");
      
      // Generate a deterministic gradient based on the filename
      const hash = filename.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      
      const color1 = `hsl(${Math.abs(hash) % 360}, 70%, 60%)`;
      const color2 = `hsl(${(Math.abs(hash) + 120) % 360}, 70%, 60%)`;

      galleryImages.push({
        title: formatGalleryTitle(filename),
        src: module.default, // Use the imported image URL
        gradient: `linear-gradient(45deg, ${color1} 30%, ${color2} 90%)`
      });
    });

    // Sort images by title
    return galleryImages.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error getting gallery images:', error);
    console.error('Error details:', error.message);
    return [];
  }
}; 