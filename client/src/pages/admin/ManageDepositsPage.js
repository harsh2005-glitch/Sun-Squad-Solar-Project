import React, { useState, useEffect, useMemo } from 'react';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';
import { Form, Button, Card, Table, Tabs, Tab, InputGroup, Spinner, Badge, Row, Col, Pagination } from 'react-bootstrap';

const ManageDepositsPage = () => {
  const [depositData, setDepositData] = useState({ associateId: '', amount: '', description: '' });
  const [withdrawalData, setWithdrawalData] = useState({ associateId: '', amount: '', description: '' });
  const [transactions, setTransactions] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      const response = await adminService.addDeposit(depositData.associateId, depositData.amount, depositData.description);
      toast.success(response.data.message);
      setDepositData({ associateId: '', amount: '', description: '' });
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add deposit.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      const response = await adminService.addWithdrawal(withdrawalData.associateId, withdrawalData.amount, withdrawalData.description);
      toast.success(response.data.message);
      setWithdrawalData({ associateId: '', amount: '', description: '' });
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to record withdrawal.');
    } finally {
      setLoadingAction(false);
    }
  };

  // Filter and Pagination Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => 
      (tx.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.user?.associateId?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.type?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [transactions, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <>
      <h1 className="mb-4 fw-bold text-primary">Manage Transactions</h1>
      
      <Row className="mb-4">
        <Col lg={6} className="mb-3 mb-lg-0">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-success text-white fw-bold">
                <i className="fa-solid fa-plus-circle me-2"></i> Add Deposit
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleDepositSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small fw-bold">ASSOCIATE ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light"><i className="fa-solid fa-user"></i></InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter Member ID" value={depositData.associateId} onChange={(e) => setDepositData({...depositData, associateId: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small fw-bold">AMOUNT</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">₹</InputGroup.Text>
                    <Form.Control type="number" placeholder="0.00" value={depositData.amount} onChange={(e) => setDepositData({...depositData, amount: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small fw-bold">DESCRIPTION</Form.Label>
                  <Form.Control type="text" placeholder="Optional note" value={depositData.description} onChange={(e) => setDepositData({...depositData, description: e.target.value})} />
                </Form.Group>
                <Button variant="success" type="submit" disabled={loadingAction} className="w-100 fw-bold">
                  {loadingAction ? <Spinner size="sm" animation="border" /> : 'Process Deposit'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-danger text-white fw-bold">
                <i className="fa-solid fa-minus-circle me-2"></i> Record Withdrawal
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleWithdrawalSubmit}>
                 <Form.Group className="mb-3">
                  <Form.Label className="text-muted small fw-bold">ASSOCIATE ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light"><i className="fa-solid fa-user"></i></InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter Member ID" value={withdrawalData.associateId} onChange={(e) => setWithdrawalData({...withdrawalData, associateId: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small fw-bold">AMOUNT</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">₹</InputGroup.Text>
                    <Form.Control type="number" placeholder="0.00" value={withdrawalData.amount} onChange={(e) => setWithdrawalData({...withdrawalData, amount: e.target.value})} required />
                  </InputGroup>
                </Form.Group>
                 <Form.Group className="mb-3">
                  <Form.Label className="text-muted small fw-bold">DESCRIPTION</Form.Label>
                  <Form.Control type="text" placeholder="Optional note" value={withdrawalData.description} onChange={(e) => setWithdrawalData({...withdrawalData, description: e.target.value})} />
                </Form.Group>
                <Button variant="danger" type="submit" disabled={loadingAction} className="w-100 fw-bold">
                  {loadingAction ? <Spinner size="sm" animation="border" /> : 'Process Withdrawal'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-secondary"><i className="fa-solid fa-clock-rotate-left me-2"></i> Transaction History</h5>
            <div style={{ width: '250px' }}>
                <InputGroup size="sm">
                    <InputGroup.Text className="bg-light border-end-0"><i className="fa-solid fa-search text-muted"></i></InputGroup.Text>
                    <Form.Control 
                        type="text" 
                        placeholder="Search transactions..." 
                        className="border-start-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>
        </Card.Header>
        <Card.Body className="p-0">
          {historyLoading ? (
            <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
          ) : (
            <>
            <Table hover responsive className="mb-0 align-middle">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="ps-4">Date</th>
                  <th>Associate</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th className="text-end pe-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                    currentItems.map(tx => (
                    <tr key={tx._id}>
                        <td className="ps-4 text-muted small">{new Date(tx.createdAt).toLocaleString()}</td>
                        <td>
                            <div className="fw-bold text-dark">{tx.user?.name || 'Unknown'}</div>
                            <div className="small text-muted">{tx.user?.associateId || 'N/A'}</div>
                        </td>
                        <td>
                        <Badge bg={tx.type === 'deposit' ? 'success' : 'danger'} className="px-3 py-2 rounded-pill">
                            {tx.type.toUpperCase()}
                        </Badge>
                        </td>
                        <td className="text-muted small">{tx.description || '-'}</td>
                        <td className={`text-end pe-4 fw-bold ${tx.type === 'deposit' ? 'text-success' : 'text-danger'}`}>
                            {tx.type === 'deposit' ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN')}
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">No transactions found matching your search.</td>
                    </tr>
                )}
              </tbody>
            </Table>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center py-3">
                    <Pagination>
                        <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, i) => (
                            <Pagination.Item key={i+1} active={i+1 === currentPage} onClick={() => setCurrentPage(i+1)}>
                                {i+1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            )}
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ManageDepositsPage;