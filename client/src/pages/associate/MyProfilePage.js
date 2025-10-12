import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
// Import all necessary Bootstrap components
import { Container, Form, Button, Card, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const MyProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    userService.getProfile()
      .then(response => setProfile(response.data))
      .catch(error => setMessage('Failed to load profile.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setMessage('Updating...');
    try {
      const response = await userService.updateProfile(profile);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed.');
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setUploadMessage('Please select an image first.');
      return;
    }
    setUploading(true);
    setUploadMessage('Uploading...');
    try {
      const response = await userService.uploadProfilePicture(imageFile);
      setUploadMessage(response.data.message);
      // Update the profile state to show the new image immediately
      setProfile(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
    } catch (error) {
      setUploadMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-5"><Spinner animation="border" /></div>;
  }

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">My Profile</h1>
      <Row>
        {/* --- Profile Picture Column --- */}
        <Col lg={4} className="mb-4">
          <Card className="text-center shadow-sm h-100">
            <Card.Header as="h5">Profile Picture</Card.Header>
            <Card.Body>
              <Image
                 src={profile.profilePicture || 'https://...placeholder.png'}
                roundedCircle
                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid #eee' }}
                className="mb-3"
              />
              <Form onSubmit={handleImageUpload}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Picture'}
                </Button>
              </Form>
              {uploadMessage && <Alert variant="info" className="mt-3 small">{uploadMessage}</Alert>}
            </Card.Body>
          </Card>
        </Col>

        {/* --- Profile Details Column --- */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header as="h5">Update Your Details</Card.Header>
            <Card.Body>
              <Form onSubmit={handleDetailsSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Associate's ID</Form.Label>
                      <Form.Control type="text" value={profile.associateId || ''} readOnly disabled />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile No</Form.Label>
                      <Form.Control type="text" value={profile.phone || ''} readOnly disabled />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Associate's Name</Form.Label>
                      <Form.Control type="text" name="name" value={profile.name || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={profile.email || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={2} name="address" value={profile.address || ''} onChange={handleChange} />
                </Form.Group>
                <hr />
                <h5 className="mb-3">Bank Details</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bank's Name</Form.Label>
                      <Form.Control type="text" name="bankName" value={profile.bankName || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>A/c No</Form.Label>
                      <Form.Control type="text" name="accountNumber" value={profile.accountNumber || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>IFSC Code</Form.Label>
                      <Form.Control type="text" name="ifscCode" value={profile.ifscCode || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="success">Save Changes</Button>
                {message && <Alert variant="info" className="mt-3 small">{message}</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfilePage;