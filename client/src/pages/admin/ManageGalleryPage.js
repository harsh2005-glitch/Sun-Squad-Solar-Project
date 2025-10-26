import React, { useState, useEffect } from 'react';
import galleryService from '../../services/galleryService';
import { Container, Card, Form, Button, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ManageGalleryPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    
    // State for the new item form
    const [category, setCategory] = useState('residential');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const fetchGalleryItems = async () => {
        try {
            const response = await galleryService.getAdminGallery();
            setItems(response.data);
        } catch (error) {
            toast.error("Failed to fetch gallery items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.warn("Please select an image file.");
            return;
        }
        setUploading(true);
        
        const formData = new FormData();
        formData.append('galleryImage', file);
        formData.append('category', category);
        formData.append('title', title);

        try {
            await galleryService.addGalleryItem(formData);
            toast.success("Image uploaded successfully!");
            // Clear form and refresh list
            setFile(null);
            setTitle('');
            e.target.reset(); // Resets the file input
            fetchGalleryItems();
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (itemId) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            await galleryService.deleteGalleryItem(itemId);
            toast.success("Image deleted successfully.");
            fetchGalleryItems(); // Refresh the list
        } catch (error) {
            toast.error("Failed to delete image.");
        }
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Container fluid className="p-4">
            <h1 className="mb-4">Manage Gallery</h1>

            {/* Upload Form */}
            <Card className="shadow-sm mb-4">
                <Card.Header as="h5">Upload New Image</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleUpload}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="industrial">Industrial</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image Title (Optional)</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image File</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Existing Images Grid */}
            <Card className="shadow-sm">
                <Card.Header as="h5">Existing Gallery Items</Card.Header>
                <Card.Body>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {items.map(item => (
                            <Col key={item._id}>
                                <Card>
                                    <Card.Img variant="top" src={item.imageUrl} style={{ height: '180px', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Title className="small">{item.title || 'No Title'}</Card.Title>
                                        <Card.Text>Category: <span className="fw-bold">{item.category}</span></Card.Text>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item._id)}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ManageGalleryPage;