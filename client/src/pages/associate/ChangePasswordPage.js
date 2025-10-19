import React, { useState } from 'react';
import userService from '../../services/userService';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.newPassword !== formData.confirmNewPassword) {
        setError("New passwords do not match.");
        return;
    }

    setLoading(true);
    try {
        const response = await userService.changePassword(formData.oldPassword, formData.newPassword);
        setMessage(response.data.message);
        setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col lg={6}>
          <h1 className="mb-4">Change Password</h1>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="oldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                    placeholder="Enter your current password"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="Enter your new password (min. 6 characters)"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="confirmNewPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your new password"
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Change Password'}
                    </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePasswordPage;