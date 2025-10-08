import React, {useState } from 'react';
import adminService from '../../services/adminService';
// Import all the Bootstrap components we will use
import { Form, Button, Card, Alert, InputGroup, Spinner } from 'react-bootstrap';

const ManageDepositsPage = () => {
  const [formData, setFormData] = useState({ associateId: '', amount: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading feedback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true); // Start loading

    if (!formData.associateId || !formData.amount) {
        setError('Both fields are required.');
        setLoading(false);
        return;
    }

    try {
      const response = await adminService.addDeposit(formData.associateId, formData.amount);
      setMessage(response.data.message);
      setFormData({ associateId: '', amount: '' }); // Clear form on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add deposit.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <h1 className="mb-4">Manage Deposits</h1>
      
      {/* The Card component is responsive by default */}
      <Card className="shadow-sm">
        <Card.Header as="h5">Add New Deposit</Card.Header>
        <Card.Body>
          <Card.Text className="text-muted">
            This will update business numbers and calculate commissions for the entire upline.
          </Card.Text>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="associateId">
              <Form.Label>Associate ID</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="fa-solid fa-hashtag"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  name="associateId"
                  placeholder="Enter the member's ID"
                  value={formData.associateId}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="amount">
              <Form.Label>Deposit Amount</Form.Label>
              <InputGroup>
                 <InputGroup.Text>Rs.</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="amount"
                  placeholder="e.g., 50000"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
            
            {/* Use Bootstrap Alerts for better visual feedback */}
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  {' '}Processing...
                </>
              ) : (
                'Add Deposit'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ManageDepositsPage;