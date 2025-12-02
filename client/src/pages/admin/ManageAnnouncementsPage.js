import React, { useState, useEffect } from 'react';
import announcementService from '../../services/announcementService';
import { Container, Card, Form, Button, Row, Col, Spinner, ListGroup, Image, Modal, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ManageAnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State for the new announcement form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const response = await announcementService.getAdminAnnouncements();
            setAnnouncements(response.data);
        } catch (error) {
            toast.error("Failed to fetch announcements.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setUploading(true);
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('announcementImage', file);
        }

        try {
            await announcementService.createAnnouncement(formData);
            toast.success("Announcement created successfully!");
            // Clear form and refresh list
            setTitle('');
            setContent('');
            setFile(null);
            e.target.reset(); // Resets the file input
            fetchAnnouncements();
        } catch (error) {
            toast.error("Failed to create announcement.");
        } finally {
            setUploading(false);
        }
    };

    const confirmDelete = (announcement) => {
        setItemToDelete(announcement);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            await announcementService.deleteAnnouncement(itemToDelete._id);
            toast.success("Announcement deleted.");
            setAnnouncements(announcements.filter(a => a._id !== itemToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            toast.error("Failed to delete announcement.");
        }
    };

    return (
        <>
            <h1 className="mb-4 fw-bold text-primary">Manage Announcements</h1>

            <Row className="mb-4">
                <Col lg={5} className="mb-3 mb-lg-0">
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-primary text-white fw-bold">
                            <i className="fa-solid fa-bullhorn me-2"></i> Post New Announcement
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleCreate}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold">TITLE</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter title..." 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold">CONTENT</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={5} 
                                        placeholder="Write your announcement here..." 
                                        value={content} 
                                        onChange={(e) => setContent(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-muted small fw-bold">IMAGE (OPTIONAL)</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={uploading} className="w-100 fw-bold">
                                    {uploading ? <><Spinner size="sm" animation="border" className="me-2"/> Publishing...</> : 'Publish Announcement'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={7}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0 fw-bold text-secondary"><i className="fa-solid fa-list me-2"></i> Active Announcements</h5>
                        </Card.Header>
                        <Card.Body className="p-0">
                            {loading ? (
                                <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
                            ) : announcements.length === 0 ? (
                                <div className="text-center p-5 text-muted">
                                    <i className="fa-regular fa-newspaper fa-3x mb-3"></i>
                                    <p>No announcements posted yet.</p>
                                </div>
                            ) : (
                                <ListGroup variant="flush">
                                    {announcements.map(ann => (
                                        <ListGroup.Item key={ann._id} className="p-4 border-bottom">
                                            <Row>
                                                {ann.imageUrl && (
                                                    <Col xs={12} md={3} className="mb-3 mb-md-0">
                                                        <Image src={ann.imageUrl} thumbnail className="w-100" style={{ height: '100px', objectFit: 'cover' }} />
                                                    </Col>
                                                )}
                                                <Col xs={12} md={ann.imageUrl ? 9 : 12}>
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h5 className="mb-1 fw-bold text-dark">{ann.title}</h5>
                                                            <div className="text-muted small">
                                                                <i className="fa-regular fa-clock me-1"></i>
                                                                {new Date(ann.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm" 
                                                            onClick={() => confirmDelete(ann)}
                                                            title="Delete Announcement"
                                                        >
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </Button>
                                                    </div>
                                                    <p className="mb-0 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
                                                        {ann.content}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger fw-bold">Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the announcement <strong>"{itemToDelete?.title}"</strong>? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete Announcement</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageAnnouncementsPage;