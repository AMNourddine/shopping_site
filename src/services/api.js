const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get products by brand
  getProductsByBrand: async (brand) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/brand/${brand}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by brand');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }
  }
};