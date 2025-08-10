const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Helper function to get content type based on file extension
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.pdf': return 'application/pdf';
    default: return 'application/octet-stream';
  }
}

// GET all images endpoint for debugging (must come BEFORE the /:filename route)
router.get('/', (req, res) => {
  const imageDir = path.join(__dirname, '../../src/assets/images');
  
  // Recursively get all image files
  const getAllImageFiles = (dir, fileList = []) => {
    try {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          getAllImageFiles(filePath, fileList);
        } else if (/\.(png|jpg|jpeg|webp|pdf|svg|gif)$/i.test(file)) {
          fileList.push({
            filename: file,
            path: path.relative(imageDir, filePath),
            size: stat.size,
            url: `/api/serve-images/${file}`
          });
        }
      });
    } catch (error) {
      console.warn(`Error reading directory ${dir}:`, error.message);
    }
    
    return fileList;
  };
  
  try {
    const imageFiles = getAllImageFiles(imageDir);
    res.json({
      message: `Found ${imageFiles.length} image files`,
      images: imageFiles
    });
  } catch (error) {
    res.status(500).json({ error: 'Error scanning image directory', details: error.message });
  }
});

// GET /:filename - Serve image by filename
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Define possible image paths to check
  const possiblePaths = [
    path.join(__dirname, '../../src/assets/images/products', filename),
    path.join(__dirname, '../../src/assets/images/products/specialOffer', filename),
    path.join(__dirname, '../../src/assets/images/products/newArrival', filename),
    path.join(__dirname, '../../src/assets/images/products/bestSeller', filename),
    path.join(__dirname, '../../src/assets/images/products/imprimante', filename),
    path.join(__dirname, '../../src/assets/images/banner', filename),
    path.join(__dirname, '../../src/assets/images/sale', filename),
    path.join(__dirname, '../../src/assets/images', filename),
  ];
  
  // Try to find the image file
  let foundPath = null;
  for (const imagePath of possiblePaths) {
    if (fs.existsSync(imagePath)) {
      foundPath = imagePath;
      break;
    }
  }
  
  if (foundPath) {
    // Set appropriate headers for caching
    res.set({
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      'Content-Type': getContentType(filename)
    });
    
    // Serve the image
    res.sendFile(foundPath);
  } else {
    res.status(404).json({ error: 'Image not found', filename: filename, searchedPaths: possiblePaths });
  }
});

module.exports = router;