import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Card, Row, Col, Spinner, Table, Badge } from 'react-bootstrap';

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
      
      {/* --- STATS CARDS --- */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="text-center shadow-sm h-100 border-primary">
            <Card.Body>
              <div className="fs-1 text-primary mb-2"><i className="fa-solid fa-users"></i></div>
              <Card.Title className="text-muted">Total Associates</Card.Title>
              <Card.Text as="h2" className="fw-bold">{stats ? stats.totalUsers : 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center shadow-sm h-100 border-warning">
            <Card.Body>
              <div className="fs-1 text-warning mb-2"><i className="fa-solid fa-user-clock"></i></div>
              <Card.Title className="text-muted">Pending Onboarding</Card.Title>
              <Card.Text as="h2" className="fw-bold">{stats ? stats.pendingUsers : 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center shadow-sm h-100 border-success">
            <Card.Body>
              <div className="fs-1 text-success mb-2"><i className="fa-solid fa-hand-holding-dollar"></i></div>
              <Card.Title className="text-muted">Total Deposits</Card.Title>
              <Card.Text as="h2" className="fw-bold">
                Rs. {stats ? stats.totalBusiness.toLocaleString('en-IN') : 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center shadow-sm h-100 border-danger">
            <Card.Body>
              <div className="fs-1 text-danger mb-2"><i className="fa-solid fa-money-bill-transfer"></i></div>
              <Card.Title className="text-muted">Total Withdrawals</Card.Title>
              <Card.Text as="h2" className="fw-bold">
                Rs. {stats ? stats.totalWithdrawals.toLocaleString('en-IN') : 0}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
            <Card className="shadow-sm h-100">
                <Card.Header className="bg-white fw-bold">
                    <i className="fa-solid fa-chart-pie me-2 text-info"></i>
                    Financial Overview
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                        <span>Total Commissions Distributed:</span>
                        <span className="fw-bold text-success">Rs. {stats ? stats.totalCommissions.toLocaleString('en-IN') : 0}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                        <span>Net System Balance (Dep - With):</span>
                        <span className="fw-bold text-primary">
                            Rs. {stats ? (stats.totalBusiness - stats.totalWithdrawals).toLocaleString('en-IN') : 0}
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col md={6}>
             <Card className="shadow-sm h-100">
                <Card.Header className="bg-white fw-bold">
                    <i className="fa-solid fa-clock-rotate-left me-2 text-secondary"></i>
                    Recent Activity
                </Card.Header>
                <Card.Body className="p-0">
                    <Table hover responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats && stats.recentTransactions && stats.recentTransactions.length > 0 ? (
                                stats.recentTransactions.map(tx => (
                                    <tr key={tx._id}>
                                        <td>
                                            <small className="fw-bold d-block">{tx.user?.name || 'Unknown'}</small>
                                            <small className="text-muted">{tx.user?.associateId}</small>
                                        </td>
                                        <td>
                                            <Badge bg={tx.type === 'deposit' ? 'success' : 'danger'}>
                                                {tx.type.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className={tx.type === 'deposit' ? 'text-success' : 'text-danger'}>
                                            {tx.type === 'deposit' ? '+' : '-'} Rs. {tx.amount.toLocaleString('en-IN')}
                                        </td>
                                        <td><small>{new Date(tx.createdAt).toLocaleDateString()}</small></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted py-3">No recent activity</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboardPage;