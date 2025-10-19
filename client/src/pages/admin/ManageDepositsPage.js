import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
// Import toast for notifications
import { toast } from 'react-toastify';
// Import Bootstrap components
import { Form, Button, Card, Table, Tabs, Tab, InputGroup, Spinner, Badge } from 'react-bootstrap';

const ManageDepositsPage = () => {
  const [depositData, setDepositData] = useState({ associateId: '', amount: '', description: '' });
  const [withdrawalData, setWithdrawalData] = useState({ associateId: '', amount: '', description: '' });
  const [transactions, setTransactions] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false); // For deposit/withdrawal actions
  const [historyLoading, setHistoryLoading] = useState(true);

  // Function to fetch the latest transaction history
  const fetchTransactions = async () => {
    setHistoryLoading(true);
    try {
      const response = await adminService.getTransactionHistory();
      setTransactions(response.data);
    } catch (err) {
      toast.error('Failed to fetch transaction history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  // Fetch history when the component first loads
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      const response = await adminService.addDeposit(depositData.associateId, depositData.amount, depositData.description);
      toast.success(response.data.message); // Success toast
      setDepositData({ associateId: '', amount: '', description: '' }); // Clear form
      fetchTransactions(); // Refresh the history table
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add deposit.'); // Error toast
    } finally {
      setLoadingAction(false);
    }
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      const response = await adminService.addWithdrawal(withdrawalData.associateId, withdrawalData.amount, withdrawalData.description);
      toast.success(response.data.message); // Success toast
      setWithdrawalData({ associateId: '', amount: '', description: '' }); // Clear form
      fetchTransactions(); // Refresh the history table
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to record withdrawal.'); // Error toast
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <>
      <h1 className="mb-4">Manage Transactions</h1>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Tabs defaultActiveKey="deposit" id="transaction-actions" className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>Reason for Transaction (Optional)</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Monthly Investment" value={depositData.description} onChange={(e) => setDepositData({...depositData, description: e.target.value})} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loadingAction} className="w-100">
                  {loadingAction ? 'Processing...' : 'Add Deposit'}
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="withdrawal" title="Add Withdrawal">
              <p className="text-muted">This records a withdrawal. It affects balances and income calculations.</p>
              <Form onSubmit={handleWithdrawalSubmit}>
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
                 <Form.Group className="mb-3">
                  <Form.Label>Reason for Transaction (Optional)</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Commission Payout" value={withdrawalData.description} onChange={(e) => setWithdrawalData({...withdrawalData, description: e.target.value})} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loadingAction} className="w-100">
                  {loadingAction ? 'Processing...' : 'Record Withdrawal'}
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
            <div className="text-center p-3"><Spinner animation="border" /></div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Associate</th>
                  <th>Type</th>
                  <th>Description</th>
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
                    <td>{tx.description || '-'}</td>
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