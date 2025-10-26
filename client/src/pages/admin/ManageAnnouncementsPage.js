import React, { useState, useEffect } from 'react';
import announcementService from '../../services/announcementService';
import { Container, Card, Form, Button, Row, Col, Spinner, Alert, ListGroup, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ManageAnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State for the new announcement form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchAnnouncements = async () => {
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this announcement?")) return;
        try {
            await announcementService.deleteAnnouncement(id);
            toast.success("Announcement deleted.");
            fetchAnnouncements();
        } catch (error) {
            toast.error("Failed to delete announcement.");
        }
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Container fluid className="p-4">
            <h1 className="mb-4">Manage Announcements</h1>

            <Card className="shadow-sm mb-4">
                <Card.Header as="h5">Create New Announcement</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleCreate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Image (Optional)</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={uploading}>
                            {uploading ? 'Publishing...' : 'Publish Announcement'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Header as="h5">Existing Announcements</Card.Header>
                <ListGroup variant="flush">
                    {announcements.map(ann => (
                        <ListGroup.Item key={ann._id}>
                            <Row className="align-items-center">
                                {ann.imageUrl && (
                                    <Col xs="auto">
                                        <Image src={ann.imageUrl} thumbnail style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    </Col>
                                )}
                                <Col>
                                    <h5>{ann.title}</h5>
                                    <p>{ann.content.substring(0, 100)}...</p>
                                    <small className="text-muted">
                                        Posted on: {new Date(ann.createdAt).toLocaleDateString()}
                                    </small>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(ann._id)}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </Container>
    );
};

export default ManageAnnouncementsPage;