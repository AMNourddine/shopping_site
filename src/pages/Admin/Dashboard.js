import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../contexts/ProductContext";
import { getImageSrc } from "../../utils/imageMapper";

const Dashboard = () => {
  const { t } = useTranslation();
  const { products } = useProducts();
  
  const stats = [
    {
      name: "Total Products",
      value: products.length,
      icon: "📦",
      color: "bg-blue-500",
    },
    {
      name: "Categories",
      value: [...new Set(products.map(item => item.category))].length,
      icon: "🏷️",
      color: "bg-green-500",
    },
    {
      name: "With Badges",
      value: products.filter(item => item.badge).length,
      icon: "🏆",
      color: "bg-yellow-500",
    },
    {
      name: "Average Price",
      value: `$${products.length > 0 ? (products.reduce((sum, item) => sum + parseFloat(item.price), 0) / products.length).toFixed(2) : '0.00'}`,
      icon: "💰",
      color: "bg-purple-500",
    },
  ];

  const recentProducts = products
    .sort((a, b) => b._id - a._id)
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your product management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/products/new"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl mr-3">➕</span>
              <div>
                <p className="font-medium text-gray-900">Add New Product</p>
                <p className="text-sm text-gray-600">Create a new product listing</p>
              </div>
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
            >
              <span className="text-2xl mr-3">📋</span>
              <div>
                <p className="font-medium text-gray-900">Manage Products</p>
                <p className="text-sm text-gray-600">View and edit existing products</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Products</h2>
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div key={product._id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <img
                  src={getImageSrc(product.img)}
                  alt={product.productName}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.productName}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;