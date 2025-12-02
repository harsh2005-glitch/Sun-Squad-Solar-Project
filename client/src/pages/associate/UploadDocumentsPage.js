import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Container, Card, Form, Button, Alert, Image, Spinner, Row, Col, Tabs, Tab } from 'react-bootstrap';
import './UserShared.css';

// A single, powerful, reusable component for each document type
const DocumentUploader = ({ docType, title, description, onUpload, onUpdate, existingDocUrl }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setMessage('');
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await onUpload(file);
            // Call the parent's update function to refresh the profile state
            onUpdate(response.data);
            setMessage(response.data.message);
            setFile(null);
            setPreview(null);
        } catch (err) {
            setError(`Upload failed for ${title}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4 p-3 border rounded bg-light">
            <h5 className="text-primary">{title}</h5>
            <p className="text-muted small">{description}</p>
            <Form.Group controlId={`formFile-${docType}`} className="mb-3">
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} className="modern-form-control" />
            </Form.Group>
            
            {preview && <Image src={preview} fluid thumbnail className="mb-3 shadow-sm" style={{maxHeight: '200px', borderRadius: '10px'}} />}
            {error && <Alert variant="danger" className="small">{error}</Alert>}
            {message && <Alert variant="success" className="small">{message}</Alert>}

            <Button variant="primary" onClick={handleUpload} disabled={!file || loading} className="modern-btn modern-btn-primary w-100">
                {loading ? 'Uploading...' : `Upload ${title}`}
            </Button>
        </div>
    );
};


const UploadDocumentsPage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchProfile = async () => {
        try {
            const response = await userService.getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error("Could not fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // This function will be called by the child component after a successful upload
    const handleDocumentUpdate = () => {
        // Re-fetch the profile to get the latest document URLs
        fetchProfile();
    };

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

    return (
        <Container fluid className="p-4 user-page-container">
            <h1 className="page-header-title">Upload Documents</h1>
            
            <Row>
                {/* Left Column: Upload Forms */}
                <Col lg={7}>
                    <Card className="modern-card">
                        <Card.Body>
                            <Tabs defaultActiveKey="aadhar" id="document-upload-tabs" className="mb-3 nav-pills nav-fill">
                                <Tab eventKey="aadhar" title="Aadhar Card">
                                    <DocumentUploader 
                                        docType="aadhar"
                                        title="Aadhar Card"
                                        description="Upload a clear image of the front of your Aadhar Card."
                                        onUpload={userService.uploadAadharCard}
                                        onUpdate={handleDocumentUpdate}
                                    />
                                </Tab>
                                <Tab eventKey="pan" title="PAN Card">
                                    <DocumentUploader 
                                        docType="pan"
                                        title="PAN Card"
                                        description="Upload a clear image of your PAN Card."
                                        onUpload={userService.uploadPanCard}
                                        onUpdate={handleDocumentUpdate}
                                    />
                                </Tab>
                                <Tab eventKey="bank" title="Bank Document">
                                    <DocumentUploader 
                                        docType="bank"
                                        title="Cancelled Cheque / Passbook"
                                        description="Upload a clear image for payout verification."
                                        onUpload={userService.uploadBankDocument}
                                        onUpdate={handleDocumentUpdate}
                                    />
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
                
                {/* Right Column: Currently Uploaded Documents */}
                <Col lg={5}>
                    <Card className="modern-card">
                        <Card.Header>Your Uploaded Documents</Card.Header>
                        <Card.Body>
                            <div className="mb-4">
                                <h6 className="text-muted text-uppercase small fw-bold mb-2">Aadhar Card</h6>
                                <div className="p-2 border rounded bg-light text-center">
                                    <Image src={profile?.aadharCardUrl || "https://via.placeholder.com/400x250.png?text=Not+Uploaded"} fluid className="rounded shadow-sm" style={{maxHeight: '150px'}} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <h6 className="text-muted text-uppercase small fw-bold mb-2">PAN Card</h6>
                                <div className="p-2 border rounded bg-light text-center">
                                    <Image src={profile?.panCardUrl || "https://via.placeholder.com/400x250.png?text=Not+Uploaded"} fluid className="rounded shadow-sm" style={{maxHeight: '150px'}} />
                                </div>
                            </div>
                            <div>
                                <h6 className="text-muted text-uppercase small fw-bold mb-2">Bank Document</h6>
                                <div className="p-2 border rounded bg-light text-center">
                                    <Image src={profile?.bankDocumentUrl || "https://via.placeholder.com/400x250.png?text=Not+Uploaded"} fluid className="rounded shadow-sm" style={{maxHeight: '150px'}} />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UploadDocumentsPage;