import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Container, Row, Col, Card, Table, Spinner, Alert, Badge } from 'react-bootstrap';

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
    <Container fluid className="p-4" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 className="mb-4">Payout / Income</h1>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header as="h5">Account Summary</Card.Header>
            <Table striped bordered className="mb-0">
              <tbody>
                <tr>
                  <td>Current Self Balance</td>
                  <td><strong>Rs. {balances?.currentSelfBalance.toLocaleString('en-IN') || 0}</strong></td>
                </tr>
                <tr>
                  <td>Current Team Balance</td>
                  <td><strong>Rs. {balances?.currentTeamBalance.toLocaleString('en-IN') || 0}</strong></td>
                </tr>
                <tr>
                  <td>Total Income Earned (Self + Team)</td>
                  <td><strong>Rs. {incomes?.totalIncome.toLocaleString('en-IN') || 0}</strong></td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header as="h5">Transaction History (Self)</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount (Rs.)</th>
                     <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.length > 0 ? (
                    transactions.map(tx => (
                      <tr key={tx._id}>
                        <td>{new Date(tx.createdAt).toLocaleString()}</td>
                        <td>
                          <Badge bg={tx.type === 'deposit' ? 'success' : 'danger'}>
                            {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                          </Badge>
                        </td>
                      
                        <td>{tx.amount.toLocaleString('en-IN')}</td>
                        <td>{tx.description || '-'}</td> 
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="text-center">No transactions found.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default IncomeDetailPage;