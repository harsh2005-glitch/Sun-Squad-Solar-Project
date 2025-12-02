import React, { useState, useEffect, useRef } from 'react';
import userService from '../../services/userService';
import './UserShared.css'; // Import shared modern styles
import './MyProfilePage.css'; // Keep specific styles if needed, but override with shared
import { Container, Form, Button, Card, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import defaultAvatar from '../../assets/images/user-avatar.png';

const MyProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const fetchProfile = () => {
    userService.getProfile()
      .then(response => setProfile(response.data))
      .catch(error => setMessage('Failed to load profile.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
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
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setUploadMessage('Please select an image first.');
      return;
    }
    setUploading(true);
    setUploadMessage('Uploading...');
    try {
      const response = await userService.uploadProfilePicture(imageFile);
      setUploadMessage(response.data.message);
      setProfile(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
      setImageFile(null);
      setPreview(null);
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
    <Container fluid className="p-4 user-page-container">
      <h1 className="page-header-title">My Profile</h1>
      <Row>
        {/* --- Profile Picture Column --- */}
        <Col lg={4} className="mb-4">
          <Card className="modern-card h-100 text-center">
            <Card.Header>Profile Picture</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              
              <div className="profile-picture-container mb-4 shadow-sm" onClick={() => fileInputRef.current.click()} style={{cursor: 'pointer', position: 'relative', width: '150px', height: '150px'}}>
                <Image
                  src={preview || profile.profilePicture || defaultAvatar}
                  className="profile-image rounded-circle w-100 h-100 object-fit-cover border"
                />
                <div className="edit-overlay position-absolute top-0 start-0 w-100 h-100 rounded-circle d-flex align-items-center justify-content-center" style={{background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.3s'}}>
                  <i className="fa-solid fa-pencil text-white fs-4"></i>
                </div>
                <style>{`
                    .profile-picture-container:hover .edit-overlay { opacity: 1 !important; }
                `}</style>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                className="d-none" 
                onChange={handleImageChange}
                accept="image/*"
              />
              
              {imageFile && (
                <Button variant="primary" onClick={handleImageUpload} disabled={uploading} className="mb-3 modern-btn modern-btn-primary w-100">
                  {uploading ? 'Uploading...' : 'Save Picture'}
                </Button>
              )}

              {uploadMessage && <Alert variant="info" className="small w-100">{uploadMessage}</Alert>}
              
              <div className="text-muted small mt-2">
                Click the image to change your profile picture.
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* --- Profile Details Column --- */}
        <Col lg={8}>
          <Card className="modern-card">
            <Card.Header>Update Your Details</Card.Header>
            <Card.Body>
              <Form onSubmit={handleDetailsSubmit}>
                <Row>
                   <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-muted small fw-bold text-uppercase">Associate ID</Form.Label>
                      <Form.Control className="modern-form-control bg-light" type="text" value={profile.associateId || ''} readOnly disabled />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-muted small fw-bold text-uppercase">Mobile No</Form.Label>
                      <Form.Control className="modern-form-control bg-light" type="text" value={profile.phone || ''} readOnly disabled />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-muted small fw-bold text-uppercase">Associate Name</Form.Label>
                      <Form.Control className="modern-form-control" type="text" name="name" value={profile.name || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-muted small fw-bold text-uppercase">Email</Form.Label>
                      <Form.Control className="modern-form-control" type="email" name="email" value={profile.email || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted small fw-bold text-uppercase">Address</Form.Label>
                  <Form.Control className="modern-form-control" as="textarea" rows={2} name="address" value={profile.address || ''} onChange={handleChange} />
                </Form.Group>
                
                <div className="my-4 border-bottom"></div>
                
                <h5 className="mb-3 text-primary">Personal Details</h5>
                <Row>
                   <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">Aadhar Card Number</Form.Label>
                            <Form.Control className="modern-form-control" type="text" name="aadharNumber" value={profile.aadharNumber || ''} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold text-uppercase">PAN Card Number</Form.Label>
                            <Form.Control className="modern-form-control" type="text" name="panNumber" value={profile.panNumber || ''} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end mt-3">
                    <Button type="submit" className="modern-btn modern-btn-primary px-4">Save Changes</Button>
                </div>
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