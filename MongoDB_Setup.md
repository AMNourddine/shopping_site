# MongoDB Integration Setup

This guide explains how to set up MongoDB locally and run the separated frontend/backend architecture.

## Prerequisites

1. **Install MongoDB Community Edition**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for your operating system
   - Make sure MongoDB service is running

2. **Verify MongoDB Installation**
   ```bash
   mongo --version
   # or for newer versions
   mongosh --version
   ```

## Project Setup

1. **Install Dependencies** (already done)
   ```bash
   npm install
   ```

2. **Environment Variables**
   The project includes a `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/orebishop
   PORT=5000
   ```

3. **Seed Database with Sample Data**
   ```bash
   npm run seed
   ```

4. **Run Development Servers**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run them separately:
   npm run server  # Backend only (port 5000)
   npm start       # Frontend only (port 3000)
   ```

## Project Structure

```
├── server/
│   ├── models/
│   │   └── Product.js          # MongoDB Product model
│   ├── routes/
│   │   └── products.js         # API routes for products
│   ├── server.js               # Express server setup
│   └── seedProducts.js         # Database seeding script
├── src/
│   ├── services/
│   │   └── api.js              # API service for frontend
│   ├── contexts/
│   │   └── ProductContext.js   # Updated to use API
│   └── ...                     # Rest of React app
└── .env                        # Environment variables
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/brand/:brand` - Get products by brand
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Features

- **Graceful Fallback**: If MongoDB is not available, the app falls back to localStorage
- **Real-time Updates**: Changes are reflected across the application
- **API Integration**: Frontend communicates with backend via REST API
- **Data Persistence**: Products are stored in MongoDB instead of static files

## Troubleshooting

1. **MongoDB Connection Issues**:
   - Ensure MongoDB service is running
   - Check the connection string in `.env`
   - Verify port 27017 is not blocked

2. **API Connection Issues**:
   - Make sure backend server is running on port 5000
   - Check CORS settings in server.js

3. **Seeding Issues**:
   - Ensure MongoDB is running before running `npm run seed`
   - Check database connection in the console