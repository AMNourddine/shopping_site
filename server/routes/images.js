const express = require('express');
const mongoose = require('mongoose');
const GridFS = require('gridfs-stream');

const router = express.Router();

// Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = GridFS(mongoose.connection.db, mongoose.mongo);
  gfs.collection('images');
});

// GET /api/images/:filename - Serve image by filename
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  
  if (!gfs) {
    return res.status(500).json({ error: 'GridFS not initialized' });
  }
  
  // Find file in GridFS
  gfs.files.findOne({ filename: filename }, (err, file) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    
    if (!file) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Check if it's an image
    if (file.contentType && file.contentType.match(/^image\//)) {
      // Set appropriate headers
      res.set({
        'Content-Type': file.contentType,
        'Content-Length': file.length,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'ETag': file.md5
      });
      
      // Stream the image
      const readStream = gfs.createReadStream({ filename: filename });
      readStream.pipe(res);
    } else {
      res.status(400).json({ error: 'Not an image file' });
    }
  });
});

// GET /api/images - List all images with metadata
router.get('/', (req, res) => {
  if (!gfs) {
    return res.status(500).json({ error: 'GridFS not initialized' });
  }
  
  gfs.files.find({}).toArray((err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    
    if (!files || files.length === 0) {
      return res.json({ message: 'No images found', images: [] });
    }
    
    // Return file metadata
    const imageList = files.map(file => ({
      filename: file.filename,
      contentType: file.contentType,
      size: file.length,
      uploadDate: file.uploadDate,
      metadata: file.metadata,
      url: `/api/images/${file.filename}`
    }));
    
    res.json({
      message: `Found ${files.length} images`,
      images: imageList
    });
  });
});

// GET /api/images/category/:category - Get images by category
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  
  if (!gfs) {
    return res.status(500).json({ error: 'GridFS not initialized' });
  }
  
  gfs.files.find({ 'metadata.category': category }).toArray((err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    
    const imageList = files.map(file => ({
      filename: file.filename,
      contentType: file.contentType,
      size: file.length,
      uploadDate: file.uploadDate,
      metadata: file.metadata,
      url: `/api/images/${file.filename}`
    }));
    
    res.json({
      message: `Found ${files.length} images in category '${category}'`,
      images: imageList
    });
  });
});

module.exports = router;