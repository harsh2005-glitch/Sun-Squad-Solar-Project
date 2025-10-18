import React, { useState } from 'react';
import userService from '../../services/userService';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

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
        // Clear the form on success
        setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Change Password</h1>
      <Card className="shadow-sm" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
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
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Change Password'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChangePasswordPage;