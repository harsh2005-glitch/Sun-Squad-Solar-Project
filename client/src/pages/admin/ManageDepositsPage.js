import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { Form, Button, Card, Alert, Table, Tabs, Tab, InputGroup, Spinner, Badge } from 'react-bootstrap';

const ManageDepositsPage = () => {
  const [depositData, setDepositData] = useState({ associateId: '', amount: '' });
  const [withdrawalData, setWithdrawalData] = useState({ associateId: '', amount: '' });
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const fetchTransactions = async () => {
    setHistoryLoading(true);
    try {
      const response = await adminService.getTransactionHistory();
      setTransactions(response.data);
    } catch (err) {
      setError('Failed to fetch transaction history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      const response = await adminService.addDeposit(depositData.associateId, depositData.amount);
      setMessage(response.data.message);
      setDepositData({ associateId: '', amount: '' }); // Clear form
      fetchTransactions(); // Refresh the history table
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add deposit.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      const response = await adminService.addWithdrawal(withdrawalData.associateId, withdrawalData.amount);
      setMessage(response.data.message);
      setWithdrawalData({ associateId: '', amount: '' }); // Clear form
      fetchTransactions(); // Refresh the history table
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record withdrawal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-4">Manage Transactions</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Tabs defaultActiveKey="deposit" id="transaction-actions" className="mb-3" onSelect={clearMessages}>
            <Tab eventKey="deposit" title="Add Deposit">
              <p className="text-muted">This will update business numbers and calculate commissions.</p>
              <Form onSubmit={handleDepositSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Associate ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter the member's ID" value={depositData.associateId} onChange={(e) => setDepositData({...depositData, associateId: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Deposit Amount</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>Rs.</InputGroup.Text>
                    <Form.Control type="number" placeholder="e.g., 50000" value={depositData.amount} onChange={(e) => setDepositData({...depositData, amount: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading} style={{width: '100%'}}>
                  {loading ? 'Processing...' : 'Add Deposit'}
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="withdrawal" title="Add Withdrawal">
              <p className="text-muted">This will record a withdrawal for an associate. It does not affect business volume.</p>
              <Form onSubmit={handleWithdrawalSubmit}>
                 {/* Withdrawal Form is identical to Deposit Form */}
                 <Form.Group className="mb-3">
                  <Form.Label>Associate ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter the member's ID" value={withdrawalData.associateId} onChange={(e) => setWithdrawalData({...withdrawalData, associateId: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Withdrawal Amount</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>Rs.</InputGroup.Text>
                    <Form.Control type="number" placeholder="e.g., 10000" value={withdrawalData.amount} onChange={(e) => setWithdrawalData({...withdrawalData, amount: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading} style={{width: '100%'}}>
                  {loading ? 'Processing...' : 'Record Withdrawal'}
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm">
        <Card.Header as="h5">Transaction History</Card.Header>
        <Card.Body>
          {historyLoading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Associate</th>
                  <th>Type</th>
                  <th>Amount (Rs.)</th>
                  <th>Processed By</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx._id}>
                    <td>{new Date(tx.createdAt).toLocaleString()}</td>
                    <td>{tx.user ? `${tx.user.name} (${tx.user.associateId})` : 'N/A'}</td>
                    <td>
                      <Badge bg={tx.type === 'deposit' ? 'success' : 'danger'}>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                    </td>
                    <td>{tx.amount.toLocaleString('en-IN')}</td>
                    <td>{tx.adminResponsible ? tx.adminResponsible.name : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ManageDepositsPage;