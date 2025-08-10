const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Static file serving FIRST
const publicPath = path.join(__dirname, '../public');
console.log('Setting up static file serving from:', publicPath);
app.use(express.static(publicPath));

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orebishop');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// API Routes
try {
  app.use('/api/products', require('./routes/products'));
  console.log('Products routes loaded successfully');
} catch (error) {
  console.error('Error loading products routes:', error);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served from: ${publicPath}`);
  console.log(`Test image: http://localhost:${PORT}/images/orebiLogo.png`);
});