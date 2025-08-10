const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orebishop');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/products', require('./routes/products'));
// Removed image routes - using static file serving instead

app.get('/', (req, res) => {
  res.json({ message: 'Orebi Shop API Server' });
});

// Serve static files from public directory
const publicPath = path.join(__dirname, '../public/images');
console.log('Setting up static file serving from:', publicPath);
app.use('/images', express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});