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

      <div className={`admin-sidebar-wrapper ${sidebarActive ? 'active' : ''}`}>
        <AdminSidebar onLinkClick={() => setSidebarActive(false)} />
      </div>
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