import React, { useState, useEffect, useRef } from 'react';
import userService from '../../services/userService';
import './MyProfilePage.css'; // <-- Import the custom CSS
import { Container, Form, Button, Card, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import defaultAvatar from '../../assets/images/user-avatar.png'; // A default placeholder

const MyProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(''); // For the details form
  const [uploadMessage, setUploadMessage] = useState(''); // For the image upload
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // The selected file
  const [preview, setPreview] = useState(null); // The temporary preview URL

  const fileInputRef = useRef(null); // Ref for the hidden file input

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
      // Update the profile state to show the new image immediately
      setProfile(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
      // Clear the inputs
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
    <Container fluid className="p-4">
      <h1 className="mb-4">My Profile</h1>
      <Row>
        {/* --- Profile Picture Column with New UX --- */}
        <Col lg={4} className="mb-4">
          <Card className="text-center shadow-sm h-100">
            <Card.Header as="h5">Profile Picture</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              
              {/* The clickable image container */}
              <div className="profile-picture-container mb-3" onClick={() => fileInputRef.current.click()}>
                <Image
                  src={preview || profile.profilePicture || defaultAvatar}
                  className="profile-image"
                />
                <div className="edit-overlay">
                  <i className="fa-solid fa-pencil"></i>
                </div>
              </div>

              {/* The hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden-file-input" 
                onChange={handleImageChange}
                accept="image/*"
              />
              
              {/* Show the save button only when a new file is selected */}
              {imageFile && (
                <Button variant="primary" onClick={handleImageUpload} disabled={uploading} className="mb-3">
                  {uploading ? 'Uploading...' : 'Save Picture'}
                </Button>
              )}

              {uploadMessage && <Alert variant="info" className="small">{uploadMessage}</Alert>}
            </Card.Body>
          </Card>
        </Col>

        {/* --- Profile Details Column (Your code structure) --- */}
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
                <h5 className="mb-3">Personal Details</h5>
                <Row>
                   <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Aadhar Card Number</Form.Label>
                            <Form.Control type="text" name="aadharNumber" value={profile.aadharNumber || ''} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>PAN Card Number</Form.Label>
                            <Form.Control type="text" name="panNumber" value={profile.panNumber || ''} onChange={handleChange} />
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