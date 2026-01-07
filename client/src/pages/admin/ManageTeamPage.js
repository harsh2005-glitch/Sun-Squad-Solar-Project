import React, { useState, useEffect } from 'react';
import teamService from '../../services/teamService';
import { Container, Card, Form, Button, Row, Col, Spinner, Modal, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ManageTeamPage = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    
    // State for the new member form
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [file, setFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const fetchTeamMembers = async () => {
        setLoading(true);
        try {
            const data = await teamService.getTeamMembers();
            setMembers(data);
        } catch (error) {
            toast.error("Failed to fetch team members.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.warn("Please select an image file.");
            return;
        }
        if (!name || !role) {
            toast.warn("Please enter Name and Role.");
            return;
        }

        setUploading(true);
        
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('role', role);
        formData.append('bio', bio);

        try {
            await teamService.addTeamMember(formData);
            toast.success("Team member added successfully!");
            // Clear form and refresh list
            setFile(null);
            setName('');
            setRole('');
            setBio('');
            e.target.reset(); // Resets the file input
            fetchTeamMembers();
        } catch (error) {
            console.error("Add Team Member Error:", error.response || error);
            const errMsg = error.response?.data?.message || "Failed to add team member. Please try again.";
            toast.error(errMsg);
        } finally {
            setUploading(false);
        }
    };

    const confirmDelete = (member) => {
        setMemberToDelete(member);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!memberToDelete) return;
        try {
            await teamService.deleteTeamMember(memberToDelete._id);
            toast.success("Team member removed successfully.");
            setMembers(members.filter(m => m._id !== memberToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            toast.error("Failed to delete team member.");
        }
    };

    return (
        <>
            <h1 className="mb-4 fw-bold text-primary">Manage Team Members</h1>

            <Row className="mb-4">
                <Col lg={4} className="mb-3 mb-lg-0">
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-primary text-white fw-bold">
                            <i className="fa-solid fa-user-plus me-2"></i> Add New Member
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpload}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold">NAME</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Full Name" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold">JOB ROLE</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="e.g. Senior Install Technician" 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)} 
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small fw-bold">BIO (OPTIONAL)</Form.Label>
                                    <Form.Control 
                                        as="textarea"
                                        rows={3}
                                        placeholder="Brief description about the member..." 
                                        value={bio} 
                                        onChange={(e) => setBio(e.target.value)} 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-muted small fw-bold">PROFILE PHOTO</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        required 
                                    />
                                    <Form.Text className="text-muted">
                                        Max size: 5MB.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={uploading} className="w-100 fw-bold">
                                    {uploading ? <><Spinner size="sm" animation="border" className="me-2"/> Adding...</> : 'Add Team Member'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0 fw-bold text-secondary"><i className="fa-solid fa-users me-2"></i> Current Team</h5>
                        </Card.Header>
                        <Card.Body className="bg-light">
                            {loading ? (
                                <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
                            ) : members.length === 0 ? (
                                <div className="text-center p-5 text-muted">
                                    <i className="fa-solid fa-user-slash fa-3x mb-3"></i>
                                    <p>No team members found.</p>
                                </div>
                            ) : (
                                <Row xs={1} md={2} className="g-3">
                                    {members.map(member => (
                                        <Col key={member._id}>
                                            <Card className="h-100 shadow-sm border-0 overflow-hidden">
                                                <div className="d-flex p-3 align-items-center">
                                                    <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                                                        <img 
                                                            src={member.imageUrl} 
                                                            alt={member.name}
                                                            className="w-100 h-100 rounded-circle object-fit-cover border" 
                                                        />
                                                    </div>
                                                    <div className="ms-3 flex-grow-1 overflow-hidden">
                                                        <h6 className="mb-0 fw-bold text-truncate">{member.name}</h6>
                                                        <small className="text-primary fw-bold text-uppercase d-block mb-1">{member.role}</small>
                                                        <p className="text-muted small mb-0 text-truncate">{member.bio || 'No Bio'}</p>
                                                    </div>
                                                </div>
                                                <Card.Footer className="bg-white border-top-0 pt-0 text-end">
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm" 
                                                        onClick={() => confirmDelete(member)}
                                                    >
                                                        <i className="fa-solid fa-trash-can me-2"></i> Remove
                                                    </Button>
                                                </Card.Footer>
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
                    Are you sure you want to remove <strong>{memberToDelete?.name}</strong> from the team?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete Member</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageTeamPage;
