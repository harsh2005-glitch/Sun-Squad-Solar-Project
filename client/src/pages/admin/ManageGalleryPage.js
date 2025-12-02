import React, { useState, useEffect } from 'react';
import galleryService from '../../services/galleryService';
import { Container, Card, Form, Button, Row, Col, Spinner, Modal, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ManageGalleryPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    
    // State for the new item form
    const [category, setCategory] = useState('residential');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const fetchGalleryItems = async () => {
        setLoading(true);
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

    const confirmDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            await galleryService.deleteGalleryItem(itemToDelete._id);
            toast.success("Image deleted successfully.");
            setItems(items.filter(item => item._id !== itemToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            toast.error("Failed to delete image.");
        }
    };

    return (
        <>
            <h1 className="mb-4 fw-bold text-primary">Manage Gallery</h1>

            <Row className="mb-4">
                <Col lg={4} className="mb-3 mb-lg-0">
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-primary text-white fw-bold">
                            <i className="fa-solid fa-cloud-arrow-up me-2"></i> Upload New Image
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpload}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold">CATEGORY</Form.Label>
                                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="industrial">Industrial</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold">IMAGE TITLE (OPTIONAL)</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="e.g., Solar Panel Installation" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-muted small fw-bold">SELECT FILE</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        required 
                                    />
                                    <Form.Text className="text-muted">
                                        Supported formats: JPG, PNG. Max size: 5MB.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={uploading} className="w-100 fw-bold">
                                    {uploading ? <><Spinner size="sm" animation="border" className="me-2"/> Uploading...</> : 'Upload Image'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0 fw-bold text-secondary"><i className="fa-solid fa-images me-2"></i> Gallery Items</h5>
                        </Card.Header>
                        <Card.Body className="bg-light">
                            {loading ? (
                                <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
                            ) : items.length === 0 ? (
                                <div className="text-center p-5 text-muted">
                                    <i className="fa-regular fa-image fa-3x mb-3"></i>
                                    <p>No images found in the gallery.</p>
                                </div>
                            ) : (
                                <Row xs={1} md={2} lg={3} className="g-3">
                                    {items.map(item => (
                                        <Col key={item._id}>
                                            <Card className="h-100 shadow-sm border-0 overflow-hidden gallery-card">
                                                <div className="position-relative" style={{ height: '180px' }}>
                                                    <Card.Img 
                                                        variant="top" 
                                                        src={item.imageUrl} 
                                                        style={{ height: '100%', objectFit: 'cover' }} 
                                                    />
                                                    <Badge bg="dark" className="position-absolute top-0 end-0 m-2 opacity-75">
                                                        {item.category.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title className="h6 fw-bold text-truncate" title={item.title || 'No Title'}>
                                                        {item.title || 'No Title'}
                                                    </Card.Title>
                                                    <div className="mt-auto pt-2">
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm" 
                                                            className="w-100"
                                                            onClick={() => confirmDelete(item)}
                                                        >
                                                            <i className="fa-solid fa-trash-can me-2"></i> Delete
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
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
                    Are you sure you want to delete this image? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete Image</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageGalleryPage;