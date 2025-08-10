import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../contexts/ProductContext";
import { getImageSrc } from "../../utils/imageMapper";

const ProductForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, createProduct, updateProduct } = useProducts();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    color: "",
    category: "",
    brand: "",
    description: "",
    badge: false,
    imageFile: null,
    imagePreview: ""
  });

  const [customInputs, setCustomInputs] = useState({
    showCustomCategory: false,
    showCustomBrand: false,
    customCategory: "",
    customBrand: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "accessories",
    "furniture", 
    "electronics",
    "bags",
    "homeAppliances",
    "gadgets"
  ];

  const brands = [
    "HP", "Canon", "Epson", "Samsung", "Brother", "Ricoh", "Pantum", "Other"
  ];

  const colors = [
    "Black", "White", "Gray", "Red", "Blue", "Green", "Yellow", "Mixed"
  ];

  useEffect(() => {
    if (isEditing) {
      const product = products.find(p => p._id === parseInt(id));
      if (product) {
        setFormData({
          productName: product.productName,
          price: product.price,
          color: product.color,
          category: product.category,
          brand: product.brand || "",
          description: product.des || "",
          badge: product.badge,
          imageFile: null,
          imagePreview: product.img
        });

        // Check if category/brand are custom (not in predefined lists)
        if (product.category && !categories.includes(product.category)) {
          setCustomInputs(prev => ({
            ...prev,
            showCustomCategory: true,
            customCategory: product.category
          }));
        }

        if (product.brand && !brands.includes(product.brand)) {
          setCustomInputs(prev => ({
            ...prev,
            showCustomBrand: true,
            customBrand: product.brand
          }));
        }
      }
    }
  }, [id, isEditing, products, categories, brands]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!formData.color.trim()) {
      newErrors.color = "Color is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!isEditing && !formData.imageFile && !formData.imagePreview) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle special cases for custom inputs
    if (name === 'category' && value === '__custom__') {
      setCustomInputs(prev => ({ ...prev, showCustomCategory: true }));
      return;
    }
    if (name === 'brand' && value === '__custom__') {
      setCustomInputs(prev => ({ ...prev, showCustomBrand: true }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleCustomInputChange = (e) => {
    const { name, value } = e.target;
    setCustomInputs(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update the main form data with custom value
    if (name === 'customCategory') {
      setFormData(prev => ({ ...prev, category: value }));
    } else if (name === 'customBrand') {
      setFormData(prev => ({ ...prev, brand: value }));
    }
  };

  const cancelCustomInput = (type) => {
    if (type === 'category') {
      setCustomInputs(prev => ({ 
        ...prev, 
        showCustomCategory: false, 
        customCategory: "" 
      }));
      setFormData(prev => ({ ...prev, category: "" }));
    } else if (type === 'brand') {
      setCustomInputs(prev => ({ 
        ...prev, 
        showCustomBrand: false, 
        customBrand: "" 
      }));
      setFormData(prev => ({ ...prev, brand: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          image: "Image size must be less than 5MB"
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);

      // Clear image error
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ""
        }));
      }
    }
  };

  const generateId = () => {
    if (products.length > 0) {
      const maxId = Math.max(...products.map(p => p._id));
      return maxId + 1;
    }
    return 1001; // Starting ID
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        _id: isEditing ? parseInt(id) : generateId(),
        productName: formData.productName.trim(),
        price: parseFloat(formData.price).toFixed(2),
        color: formData.color,
        category: formData.category,
        brand: formData.brand,
        des: formData.description.trim(),
        badge: formData.badge,
        img: formData.imageFile ? "placeholder.png" : formData.imagePreview || "placeholder.png" // Use filename for image
      };

      if (isEditing) {
        // Update existing product via API
        await updateProduct(parseInt(id), productData);
      } else {
        // Create new product via API
        await createProduct(productData);
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ submit: 'Failed to save product. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-gray-600">
          {isEditing ? "Update product information" : "Create a new product listing"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              {formData.imagePreview && (
                <img
                  src={formData.imageFile ? formData.imagePreview : getImageSrc(formData.imagePreview)}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                />
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
            </div>
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.productName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-600 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color *
            </label>
            <select
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.color ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a color</option>
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
            {errors.color && (
              <p className="text-red-600 text-sm mt-1">{errors.color}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            {!customInputs.showCustomCategory ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
                <option value="__custom__" className="font-semibold text-blue-600">
                  ➕ Add New Category
                </option>
              </select>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="customCategory"
                  value={customInputs.customCategory}
                  onChange={handleCustomInputChange}
                  placeholder="Enter new category name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => cancelCustomInput('category')}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md"
                  title="Cancel"
                >
                  ✕
                </button>
              </div>
            )}
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            {!customInputs.showCustomBrand ? (
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.brand ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
                <option value="__custom__" className="font-semibold text-blue-600">
                  ➕ Add New Brand
                </option>
              </select>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="customBrand"
                  value={customInputs.customBrand}
                  onChange={handleCustomInputChange}
                  placeholder="Enter new brand name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => cancelCustomInput('brand')}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md"
                  title="Cancel"
                >
                  ✕
                </button>
              </div>
            )}
            {errors.brand && (
              <p className="text-red-600 text-sm mt-1">{errors.brand}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Badge */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="badge" 
              checked={formData.badge}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Show "New" badge on this product
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>
                {isLoading ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;