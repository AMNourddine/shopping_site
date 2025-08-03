import React, { createContext, useContext, useState, useEffect } from 'react';
import { paginationItems as defaultProducts } from '../constants';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    // Load products from localStorage if available
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);
    } else {
      // Initialize localStorage with default products
      localStorage.setItem('adminProducts', JSON.stringify(defaultProducts));
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
  }, []);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('adminProductsChanged', {
      detail: { key: 'adminProducts', value: newProducts }
    }));
  };

  return (
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
};