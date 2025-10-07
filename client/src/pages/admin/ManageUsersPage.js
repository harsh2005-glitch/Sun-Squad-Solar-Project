import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import '../../styles/PageLayout.css'; // <-- IMPORT THE SHARED STYLES

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminService.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-header">Manage Users</h1>
      <div className="content-box">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Associate ID</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.associateId || 'N/A'}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsersPage;