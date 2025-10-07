import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for user data in local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // If user and token exist, allow access to the page (Outlet).
  // Otherwise, redirect to the login page.
  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;