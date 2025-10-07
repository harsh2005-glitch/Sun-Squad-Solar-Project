import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import '../../styles/PageLayout.css'; // <-- IMPORT THE NEW STYLES

function MyDirectsPage() {
  const [directs, setDirects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDirects = async () => {
      try {
        const response = await userService.getDirects();
        setDirects(response.data);
      } catch (err) {
        setError('Failed to fetch directs data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDirects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-header">My Direct Team</h1>
      <div className="content-box">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Associate Name</th>
              <th>Associate ID</th>
              <th>Date of Joining</th>
              <th>Self Business</th>
              <th>Team Business</th>
              <th>Total Business</th>
            </tr>
          </thead>
          <tbody>
            {directs.length > 0 ? (
              directs.map((direct, index) => (
                <tr key={direct._id}>
                  <td>{index + 1}</td>
                  <td>{direct.name}</td>
                  <td>{direct.associateId}</td>
                  <td>{new Date(direct.dateOfJoining).toLocaleDateString()}</td>
                  <td>Rs. {direct.selfBusiness}</td>
                  <td>Rs. {direct.teamBusiness}</td>
                  <td>Rs. {direct.totalBusiness}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>You have no direct associates yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyDirectsPage;