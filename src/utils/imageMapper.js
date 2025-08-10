// Image mapper that converts database filenames to public image URLs
// This approach serves images from the backend's public directory

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

// Function to determine the correct subdirectory for an image
const getImagePath = (imageName) => {
  // Determine path based on filename patterns
  if (imageName.startsWith('spf') && imageName.endsWith('.webp')) {
    return 'products/specialOffer';
  } else if (imageName.startsWith('newArr') && imageName.endsWith('.webp')) {
    return 'products/newArrival';
  } else if (imageName.startsWith('bestSeller') && imageName.endsWith('.webp')) {
    return 'products/bestSeller';
  } else if (imageName.startsWith('IMPRIMANTE_PANTUM_') && imageName.endsWith('.webp')) {
    return 'products/imprimante';
  } else if (imageName.match(/^(espson|hp|ricoh)\d+\.webp$/)) {
    return 'products/imprimante';
  } else if (imageName.endsWith('.webp') && (
    imageName.startsWith('bac') || 
    imageName.startsWith('encre') || 
    imageName.startsWith('ruban') || 
    imageName.startsWith('imprimante')
  )) {
    return 'products/bestSeller';
  } else if (imageName.startsWith('banner')) {
    return 'banner';
  } else if (imageName.startsWith('sale')) {
    return 'sale';
  } else if (imageName.includes('banner') || imageName.includes('Banner')) {
    return 'banner';
  } else if (imageName.includes('sale') || imageName.includes('Sale')) {
    return 'sale';
  } else if (imageName.endsWith('.png') && (
    imageName.startsWith('imprimante') || 
    imageName.startsWith('encre') || 
    imageName.startsWith('ruban') || 
    imageName.startsWith('bac')
  )) {
    return 'products';
  } else if (imageName === 'productOfTheYear.webp') {
    return 'products';
  } else {
    // Default fallback to root images directory
    return '';
  }
};

// Simple synchronous function that returns public image URLs
export const getImageSrc = (imageName) => {
  const imagePath = getImagePath(imageName);
  const fullPath = imagePath ? `${imagePath}/${imageName}` : imageName;
  return `${API_BASE_URL}/images/${fullPath}`;
};

// Synchronous version for immediate use (same as getImageSrc now)
export const getImageSrcSync = (imageName) => {
  return getImageSrc(imageName);
};