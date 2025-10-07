import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function MainLayout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        {/* The actual page component (e.g., DashboardPage) will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;