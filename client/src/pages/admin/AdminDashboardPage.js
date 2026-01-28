import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Card, Row, Col, Spinner, Table, Badge, Container } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for visualization demo (since API update might be needed for real history)
  const mockGrowthData = [
    { name: 'Jan', users: 40, deposits: 2400 },
    { name: 'Feb', users: 30, deposits: 1398 },
    { name: 'Mar', users: 20, deposits: 9800 },
    { name: 'Apr', users: 27, deposits: 3908 },
    { name: 'May', users: 18, deposits: 4800 },
    { name: 'Jun', users: 23, deposits: 3800 },
  ];

  useEffect(() => {
    adminService.getDashboardStats()
      .then(response => {
        setStats(response.data);
      })
      .catch(error => console.error("Failed to fetch stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
        <Container fluid className="p-4">
             <h1 className="mb-4"><SkeletonLoader type="title" width="300px" /></h1>
             <Row className="mb-4">
                {[1,2,3,4].map(i => (
                    <Col md={3} className="mb-3" key={i}>
                        <div className="skeleton-card">
                            <div className="d-flex justify-content-center mb-3"><SkeletonLoader type="circle" /></div>
                            <div className="text-center"><SkeletonLoader type="text" width="60%" /> <SkeletonLoader type="title" width="80%" /></div>
                        </div>
                    </Col>
                ))}
             </Row>
             <Row>
                 <Col md={8}><div className="skeleton-card"><SkeletonLoader type="rect" height={300} /></div></Col>
                 <Col md={4}><div className="skeleton-card"><SkeletonLoader type="rect" height={300} /></div></Col>
             </Row>
        </Container>
    );
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
      
      {/* --- CHARTS SECTION --- */}
      <Row className="mb-4">
        <Col md={8}>
            <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                    <Card.Title>Business Growth & User Acquisition (Last 6 Months)</Card.Title>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={mockGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="deposits" stroke="#8884d8" activeDot={{ r: 8 }} name="Deposits (Rs)" />
                                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#82ca9d" name="New Users" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col md={4}>
            <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                    <Card.Title>Transaction Volume</Card.Title>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={[{name: 'Finance', Deposit: stats ? stats.totalBusiness : 0, Withdrawal: stats ? stats.totalWithdrawals : 0}]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Legend />
                                <Bar dataKey="Deposit" fill="#198754" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Withdrawal" fill="#dc3545" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
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