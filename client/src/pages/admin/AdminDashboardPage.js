import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Card, Row, Col, Spinner } from 'react-bootstrap';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardStats()
      .then(response => {
        setStats(response.data);
      })
      .catch(error => console.error("Failed to fetch stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <div className="fs-1 text-primary mb-2"><i className="fa-solid fa-users"></i></div>
              <Card.Title>Total Associates</Card.Title>
              <Card.Text as="h2" className="fw-bold">{stats ? stats.totalUsers : 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <div className="fs-1 text-success mb-2"><i className="fa-solid fa-hand-holding-dollar"></i></div>
              <Card.Title>Total Business Volume</Card.Title>
              <Card.Text as="h2" className="fw-bold">
                Rs. {stats ? stats.totalBusiness.toLocaleString('en-IN') : 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboardPage;