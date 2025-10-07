import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import '../../styles/PageLayout.css'; // Re-use our great styles
import '../../pages/associate/DashboardPage.css'; // Re-use the stat card styles

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <h1 className="page-header">Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card total-team">
          <h4>Total Associates</h4>
          <p>{stats ? stats.totalUsers : 0}</p>
        </div>
        <div className="stat-card total-business">
          <h4>Total Business Volume</h4>
          <p>Rs. {stats ? stats.totalBusiness : 0}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;