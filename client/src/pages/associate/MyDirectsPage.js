import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Container, Spinner, Alert, Badge } from 'react-bootstrap';
import './UserShared.css'; // Import shared modern styles

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

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

  return (
    <Container fluid className="p-4 user-page-container">
      <h1 className="page-header-title">My Direct Team</h1>
      
      <div className="modern-table-container">
        <table className="table modern-table table-hover">
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
                  <td>
                    <div className="d-flex align-items-center">
                        <div className="bg-light rounded-circle p-2 me-2 text-primary fw-bold" style={{width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {direct.name.charAt(0)}
                        </div>
                        {direct.name}
                    </div>
                  </td>
                  <td><Badge bg="light" text="dark" className="border">{direct.associateId}</Badge></td>
                  <td>{new Date(direct.dateOfJoining).toLocaleDateString()}</td>
                  <td>₹{(direct.selfBusiness || 0).toLocaleString('en-IN')}</td>
                  <td>₹{(direct.teamBusiness || 0).toLocaleString('en-IN')}</td>
                  <td className="fw-bold text-success">₹{(direct.totalBusiness || 0).toLocaleString('en-IN')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="fas fa-users fa-3x mb-3 d-block"></i>
                    You have no direct associates yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default MyDirectsPage;