import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user exists, has a token, AND has the role 'admin'
  return user && user.token && user.role === 'admin' ? (
    <Outlet /> // If yes, render the admin page
  ) : (
    <Navigate to="/login" /> // If no, redirect to login
  );
};

export default AdminRoute;