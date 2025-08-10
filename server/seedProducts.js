const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample product data based on the existing constants
const products = [
  {
    _id: 1001,
    img: "spfOne.webp",
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    category: "accessories",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1002,
    img: "spfTwo.webp",
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    category: "furniture",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1003,
    img: "spfThree.webp",
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    category: "electronics",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1004,
    img: "spfFour.webp",
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    category: "accessories",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1005,
    img: "bestSellerOne.webp",
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    category: "accessories",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1006,
    img: "bestSellerTwo.webp",
    productName: "New Backpack",
    price: "180.00",
    color: "Gray",
    badge: false,
    category: "bags",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1007,
    img: "bestSellerThree.webp",
    productName: "Household materials",
    price: "25.00",
    color: "Mixed",
    badge: true,
    category: "homeAppliances",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1008,
    img: "bestSellerFour.webp",
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    category: "bags",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1009,
    img: "newArrOne.webp",
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    category: "accessories",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  },
  {
    _id: 1010,
    img: "newArrTwo.webp",
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    category: "electronics",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    brand: "Generic"
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orebishop');

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();