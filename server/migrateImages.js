const mongoose = require('mongoose');
const GridFS = require('gridfs-stream');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orebishop');
    console.log('Connected to MongoDB for image migration');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize GridFS
const initGridFS = () => {
  const gfs = GridFS(mongoose.connection.db, mongoose.mongo);
  gfs.collection('images');
  return gfs;
};

// Function to get all image files recursively
const getAllImageFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (stat.isFile() && /\.(png|jpg|jpeg|webp|pdf|svg|gif)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
};

// Function to upload a single image to GridFS
const uploadImageToGridFS = (gfs, filePath) => {
  return new Promise((resolve, reject) => {
    const filename = path.basename(filePath);
    const relativePath = path.relative(path.join(__dirname, '../src/assets/images'), filePath);
    
    // Create metadata with category and path info
    const metadata = {
      originalPath: relativePath,
      category: relativePath.includes('products/') ? 'product' : 
                relativePath.includes('banner/') ? 'banner' : 
                relativePath.includes('sale/') ? 'sale' : 'ui',
      uploadedAt: new Date()
    };
    
    console.log(`Uploading: ${filename} from ${relativePath}`);
    
    const writeStream = gfs.createWriteStream({
      filename: filename,
      metadata: metadata
    });
    
    const readStream = fs.createReadStream(filePath);
    
    readStream.pipe(writeStream);
    
    writeStream.on('close', (file) => {
      console.log(`✅ Uploaded: ${filename} (${file.length} bytes)`);
      resolve(file);
    });
    
    writeStream.on('error', (error) => {
      console.error(`❌ Error uploading ${filename}:`, error);
      reject(error);
    });
  });
};

// Main migration function
const migrateAllImages = async () => {
  try {
    await connectToMongoDB();
    const gfs = initGridFS();
    
    // Get all image files from src/assets/images
    const srcImagesDir = path.join(__dirname, '../src/assets/images');
    console.log(`Scanning for images in: ${srcImagesDir}`);
    
    const imageFiles = getAllImageFiles(srcImagesDir);
    console.log(`Found ${imageFiles.length} image files to migrate`);
    
    // Clear existing images in GridFS to avoid duplicates
    console.log('Checking for existing images in GridFS...');
    try {
      const existingFiles = await new Promise((resolve, reject) => {
        gfs.files.find({}).toArray((err, files) => {
          if (err) reject(err);
          else resolve(files || []);
        });
      });
      
      if (existingFiles.length > 0) {
        console.log(`Found ${existingFiles.length} existing images, clearing...`);
        for (const file of existingFiles) {
          await new Promise((resolve, reject) => {
            gfs.remove({ _id: file._id }, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
        console.log('✅ Cleared existing images');
      } else {
        console.log('✅ No existing images found');
      }
    } catch (error) {
      console.log('ℹ️  Skipping cleanup (no existing images or GridFS not initialized)');
    }
    
    // Upload all images
    let uploadCount = 0;
    let errorCount = 0;
    
    for (const filePath of imageFiles) {
      try {
        await uploadImageToGridFS(gfs, filePath);
        uploadCount++;
      } catch (error) {
        errorCount++;
        console.error(`Failed to upload ${filePath}:`, error);
      }
    }
    
    console.log(`\n🎉 Migration completed!`);
    console.log(`✅ Successfully uploaded: ${uploadCount} images`);
    console.log(`❌ Failed uploads: ${errorCount} images`);
    
    if (uploadCount > 0) {
      console.log(`\n📁 All images are now stored in MongoDB GridFS`);
      console.log(`🚀 You can now safely delete the /src/assets/images directory`);
    }
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

// Run migration if called directly
if (require.main === module) {
  migrateAllImages();
}

module.exports = { migrateAllImages };