import React, { useState } from 'react';
import userService from '../../services/userService';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import './UserShared.css';

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
    <Container fluid className="p-4 user-page-container d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col lg={5} md={8}>
          <div className="text-center mb-4">
            <h1 className="page-header-title border-0 mb-0">Change Password</h1>
            <p className="text-muted">Secure your account with a new password</p>
          </div>
          <Card className="modern-card">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="oldPassword">
                  <Form.Label className="text-muted small fw-bold text-uppercase">Old Password</Form.Label>
                  <Form.Control
                    className="modern-form-control"
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                    placeholder="Enter your current password"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label className="text-muted small fw-bold text-uppercase">New Password</Form.Label>
                  <Form.Control
                    className="modern-form-control"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="Enter your new password (min. 6 characters)"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="confirmNewPassword">
                  <Form.Label className="text-muted small fw-bold text-uppercase">Confirm New Password</Form.Label>
                  <Form.Control
                    className="modern-form-control"
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your new password"
                  />
                </Form.Group>

                {error && <Alert variant="danger" className="small">{error}</Alert>}
                {message && <Alert variant="success" className="small">{message}</Alert>}

                <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading} className="modern-btn modern-btn-primary">
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