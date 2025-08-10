const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  badge: {
    type: Boolean,
    default: false
  },
  des: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  _id: false
});

module.exports = mongoose.model('Product', productSchema);