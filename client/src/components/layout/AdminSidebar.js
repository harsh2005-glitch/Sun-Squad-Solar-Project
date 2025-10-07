import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function AdminSidebar() {
  // Make sure the useNavigate hook is called here
  const navigate = useNavigate();

  // This function clears the user session and redirects to the login page
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li><NavLink to="/admin/dashboard" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink></li>
        <li><NavLink to="/admin/users" className={({isActive}) => isActive ? "active" : ""}>Manage Users</NavLink></li>
        <li><NavLink to="/admin/deposits" className={({isActive}) => isActive ? "active" : ""}>Manage Deposits</NavLink></li>
      </ul>
      {/* Ensure the onClick is correctly assigned here */}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default AdminSidebar;