import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  const loginTime = localStorage.getItem('adminLoginTime');
  
  // Session expires after 24 hours
  if (isAuthenticated && loginTime) {
    const now = new Date().getTime();
    const sessionAge = now - parseInt(loginTime);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (sessionAge > twentyFourHours) {
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminLoginTime');
      return <Navigate to="/admin/login" replace />;
    }
  }
  
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;