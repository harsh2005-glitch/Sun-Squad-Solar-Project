import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Container, Row, Col, Card, Table, Spinner, Alert, Badge } from 'react-bootstrap';
import './UserShared.css';

function IncomeDetailPage() {
  const [payoutData, setPayoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getPayoutDetails();
        setPayoutData(response.data);
      } catch (err) {
        setError('Failed to fetch payout details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

  // Use optional chaining (?) for safety in case payoutData is null
  const { balances, incomes, transactions } = payoutData || {};

  return (
    <Container fluid className="p-4 user-page-container">
      <h1 className="page-header-title">Payout / Income</h1>
      
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="modern-card h-100">
            <Card.Header>
                <i className="fas fa-wallet me-2 text-primary"></i>
                Account Summary
            </Card.Header>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <span className="text-muted">Current Self Balance</span>
                    <span className="fs-5 fw-bold text-dark">₹{(balances?.currentSelfBalance || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <span className="text-muted">Current Team Balance</span>
                    <span className="fs-5 fw-bold text-dark">₹{(balances?.currentTeamBalance || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Total Income Earned</span>
                    <span className="fs-4 fw-bold text-success">₹{(incomes?.totalIncome || 0).toLocaleString('en-IN')}</span>
                </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
             {/* Placeholder for future charts or more stats */}
             <Card className="modern-card h-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center text-muted p-4">
                    <i className="fas fa-chart-pie fa-3x mb-3 opacity-50"></i>
                    <p>Income Analysis Chart Coming Soon</p>
                </div>
             </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="modern-card">
            <Card.Header>
                <i className="fas fa-history me-2 text-primary"></i>
                Transaction History (Self)
            </Card.Header>
            <div className="modern-table-container">
              <Table hover className="modern-table mb-0" responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                     <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.length > 0 ? (
                    transactions.map(tx => (
                      <tr key={tx._id}>
                        <td>{new Date(tx.createdAt).toLocaleString()}</td>
                        <td>
                          <Badge bg={tx.type === 'deposit' ? 'success' : 'danger'} className="status-badge">
                            {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                          </Badge>
                        </td>
                      
                        <td className={tx.type === 'deposit' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                            {tx.type === 'deposit' ? '+' : '-'} ₹{(tx.amount || 0).toLocaleString('en-IN')}
                        </td>
                        <td>{tx.description || '-'}</td> 
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="text-center py-4 text-muted">No transactions found.</td></tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default IncomeDetailPage;