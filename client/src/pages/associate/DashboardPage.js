import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import './DashboardPage.css'; // <-- IMPORT THE CSS FILE

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getDashboardData();
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>

      {/* User Info Section */}
      <div className="user-info-card">
        <h3>Welcome, {dashboardData.userInfo.name}</h3>
        <p>ID: {dashboardData.userInfo.associateId}</p>
        <p>Mobile: {dashboardData.userInfo.mobile}</p>
        <p>Address: {dashboardData.userInfo.address}</p>
        <p className="level">Current Level: {dashboardData.userInfo.level}%</p>
      </div>

      {/* Business & Team Stats Section */}
      <div className="stats-grid">
        <div className="stat-card self-business">
          <h4>Self Business</h4>
          <p>Rs. {dashboardData.businessStats.selfBusiness}</p>
        </div>
        <div className="stat-card team-business">
          <h4>Team Business</h4>
          <p>Rs. {dashboardData.businessStats.teamBusiness}</p>
        </div>
        <div className="stat-card total-business">
          <h4>Total Business</h4>
          <p>Rs. {dashboardData.businessStats.totalBusiness}</p>
        </div>
      </div>
      <div className="stats-grid">
         <div className="stat-card total-team">
            <h4>Total Team Members</h4>
            <p>{dashboardData.teamStats.totalTeamMember}</p>
        </div>
         <div className="stat-card direct-team">
            <h4>Total Direct Team</h4>
            <p>{dashboardData.teamStats.totalDirectTeam}</p>
        </div>
      </div>

      {/* My Direct Sponsor Table */}
      <div className="directs-section">
        <h3>My Direct Sponsors</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Associate Name</th>
              <th>Associate ID</th>
              <th>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.directSponsors.length > 0 ? (
              dashboardData.directSponsors.map((direct, index) => (
                <tr key={direct._id}>
                  <td>{index + 1}</td>
                  <td>{direct.name}</td>
                  <td>{direct.associateId}</td>
                  <td>{new Date(direct.dateOfJoining).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>You have no direct associates yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;