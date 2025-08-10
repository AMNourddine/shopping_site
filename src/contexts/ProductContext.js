import React, { createContext, useContext, useState, useEffect } from 'react';
import { productAPI } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from API - this is now the only data source
      const apiProducts = await productAPI.getAllProducts();
      setProducts(apiProducts || []);
    } catch (apiError) {
      console.error('Failed to fetch products from API:', apiError);
      setError('Failed to load products. Please check your connection to the server.');
      
      // Fallback to localStorage as last resort for offline functionality
      const savedProducts = localStorage.getItem('adminProducts');
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
        setError('Showing cached products. Server unavailable.');
      } else {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }

    // Listen for localStorage changes (when admin updates products)
    const handleStorageChange = (e) => {
      if (e.key === 'adminProducts' && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab localStorage changes
    const handleCustomStorageChange = (e) => {
      if (e.detail.key === 'adminProducts') {
        setProducts(e.detail.value);
      }
    };

    window.addEventListener('adminProductsChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminProductsChanged', handleCustomStorageChange);
    };
  };

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('adminProductsChanged', {
      detail: { key: 'adminProducts', value: newProducts }
    }));
  };

  const createProduct = async (productData) => {
    try {
      const newProduct = await productAPI.createProduct(productData);
      // Refresh the products list
      await loadProducts();
      return newProduct;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updatedProduct = await productAPI.updateProduct(id, productData);
      // Refresh the products list
      await loadProducts();
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productAPI.deleteProduct(id);
      // Refresh the products list
      await loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      updateProducts, 
      loading, 
      error, 
      loadProducts,
      createProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};