import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Button } from 'react-bootstrap';

const AdminLayout = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className="admin-wrapper">
      {/* Overlay for mobile view */}
      <div 
        className={`sidebar-overlay ${sidebarActive ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>

      {/* Pass the toggle function to the sidebar so links can close it */}
      <AdminSidebar onLinkClick={() => setSidebarActive(false)} />
      
      <main className="admin-content">
        {/* Hamburger button for mobile, hidden on larger screens */}
        <Button 
          variant="light" 
          className="d-lg-none mb-3" 
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-bars"></i> Menu
        </Button>
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;