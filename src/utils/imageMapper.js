// Image mapper that converts database filenames to importable asset paths
// This approach uses dynamic imports to load images on demand

const imageImportCache = new Map();

export const getImageSrc = async (imageName) => {
  // Check cache first
  if (imageImportCache.has(imageName)) {
    return imageImportCache.get(imageName);
  }

  try {
    let imagePath;
    
    // Determine the correct path based on filename patterns
    if (imageName.startsWith('spf') && imageName.endsWith('.webp')) {
      imagePath = await import(`../assets/images/products/specialOffer/${imageName}`);
    } else if (imageName.startsWith('newArr') && imageName.endsWith('.webp')) {
      imagePath = await import(`../assets/images/products/newArrival/${imageName}`);
    } else if (imageName.startsWith('bestSeller') && imageName.endsWith('.webp')) {
      imagePath = await import(`../assets/images/products/bestSeller/${imageName}`);
    } else if (imageName === 'productOfTheYear.webp') {
      imagePath = await import(`../assets/images/products/${imageName}`);
    } else if (imageName.startsWith('IMPRIMANTE_PANTUM_') && imageName.endsWith('.webp')) {
      imagePath = await import(`../assets/images/products/imprimante/${imageName}`);
    } else if (imageName.match(/^(espson|hp|ricoh)\d+\.webp$/)) {
      imagePath = await import(`../assets/images/products/imprimante/${imageName}`);
    } else if (imageName.endsWith('.webp') && (
      imageName.startsWith('bac') || 
      imageName.startsWith('encre') || 
      imageName.startsWith('ruban') || 
      imageName.startsWith('imprimante')
    )) {
      imagePath = await import(`../assets/images/products/bestSeller/${imageName}`);
    } else if (imageName.endsWith('.png')) {
      imagePath = await import(`../assets/images/products/${imageName}`);
    } else {
      // Fallback
      imagePath = await import(`../assets/images/products/${imageName}`);
    }
    
    const imageUrl = imagePath.default;
    imageImportCache.set(imageName, imageUrl);
    return imageUrl;
  } catch (error) {
    console.warn(`Could not load image: ${imageName}`, error);
    return imageName; // Fallback to original name
  }
};

// Synchronous version for immediate use (returns a placeholder initially)
export const getImageSrcSync = (imageName) => {
  if (imageImportCache.has(imageName)) {
    return imageImportCache.get(imageName);
  }
  
  // Load async in background
  getImageSrc(imageName).catch(console.warn);
  
  // Return a placeholder or the filename as fallback
  return `/assets/images/products/${imageName}`;
};