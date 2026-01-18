import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Badge, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ManageInquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchInquiries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    const fetchInquiries = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            // Ensure this URL matches your backend route structure
            const response = await axios.get(`${API_URL}/contact`, config);
            setInquiries(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            const msg = error.response && error.response.data.message ? error.response.data.message : error.message;
            toast.error(`Failed to load: ${msg}`);
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${API_URL}/contact/${id}`, { status: newStatus }, config);
            fetchInquiries(); // Refresh
            toast.success("Status updated");
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure?")) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`${API_URL}/contact/${id}`, config);
                setInquiries(inquiries.filter(i => i._id !== id));
                toast.success("Deleted successfully");
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    const openDetails = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Leads & Inquiries</h2>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    {loading ? <p>Loading...</p> : (
                        <div className="table-responsive">
                            <Table hover className="align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Source</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inquiries.map((inquiry) => (
                                        <tr key={inquiry._id}>
                                            <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                                            <td className="fw-bold">{inquiry.name}</td>
                                            <td>
                                                <div>{inquiry.email}</div>
                                                <small className="text-muted">{inquiry.phone}</small>
                                            </td>
                                            <td><Badge bg="info">{inquiry.source}</Badge></td>
                                            <td>
                                                <select 
                                                    className="form-select form-select-sm" 
                                                    value={inquiry.status}
                                                    onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                                                    style={{width: '120px'}}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Closed">Closed</option>
                                                    <option value="Spam">Spam</option>
                                                </select>
                                            </td>
                                            <td>
                                                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => openDetails(inquiry)}>
                                                    View
                                                </Button>
                                                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(inquiry._id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {inquiries.length === 0 && <tr><td colSpan="6" className="text-center py-4">No inquiries yet.</td></tr>}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Inquiry Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInquiry && (
                        <div>
                             <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Name:</strong> <p>{selectedInquiry.name}</p>
                                </div>
                                <div className="col-md-6">
                                    <strong>Date:</strong> <p>{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Email:</strong> <p><a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a></p>
                                </div>
                                <div className="col-md-6">
                                    <strong>Phone:</strong> <p><a href={`tel:${selectedInquiry.phone}`}>{selectedInquiry.phone}</a></p>
                                </div>
                            </div>
                             <div className="mb-3">
                                <strong>Subject:</strong> <p>{selectedInquiry.subject}</p>
                            </div>
                            <div className="p-3 bg-light rounded">
                                <strong>Message:</strong>
                                <p className="mt-2" style={{whiteSpace: 'pre-wrap'}}>{selectedInquiry.message}</p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" href={`mailto:${selectedInquiry?.email}`}>Reply via Email</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageInquiriesPage;
