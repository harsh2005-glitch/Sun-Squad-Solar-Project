import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import contactService from '../../services/contactService';
import { toast } from 'react-toastify';

const QuoteModal = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Preparing message for backend 
            // The backend expects: name, email, subject, message.
            // We append phone and city to the message body since backend email template might not show them otherwise.
            const payload = {
                name: formData.name,
                email: formData.email,
                subject: "New Free Quote Request",
                message: `
------------------------------------------------
New Quote Request Details:
------------------------------------------------
Phone: ${formData.phone}
City: ${formData.city}
------------------------------------------------
User Message:
${formData.message}
------------------------------------------------
Source: Get A Quote Button
` 
            };
            
            await contactService.submitContactForm(payload);
            toast.success("Quote request sent! We will contact you soon.");
            setFormData({ name: '', email: '', phone: '', city: '', message: '' });
            handleClose();
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to submit request.");
            toast.error("Failed to submit. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static" className="quote-modal-custom">
            <div className="position-relative">
                <Button 
                    variant="link" 
                    className="position-absolute top-0 end-0 m-2 text-white text-decoration-none fs-4" 
                    onClick={handleClose}
                    style={{ zIndex: 10, lineHeight: 0.5 }}
                >
                    &times;
                </Button>
                <div className="bg-success text-white p-4 text-center" style={{borderRadius: '0.3rem 0.3rem 0 0'}}>
                    <h3 className="mb-0 fw-bold"><i className="fa-solid fa-bolt me-2 text-warning"></i> Get Your Free Solar Quote</h3>
                    <p className="mb-0 mt-2 small opacity-75">Start saving on your electricity bills today!</p>
                </div>
                <div className="bg-white p-4" style={{borderRadius: '0 0 0.3rem 0.3rem'}}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Full Name" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required 
                                className="bg-light border-0 py-2"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="tel" 
                                placeholder="Phone Number" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required 
                                className="bg-light border-0 py-2"
                            />
                        </Form.Group>
                        <div className="row g-2 mb-3">
                             <div className="col-6">
                                <Form.Group>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Email Address" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="bg-light border-0 py-2"
                                    />
                                </Form.Group>
                             </div>
                             <div className="col-6">
                                 <Form.Group>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="City / Location" 
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required 
                                        className="bg-light border-0 py-2"
                                    />
                                </Form.Group>
                             </div>
                        </div>
                       
                        <Form.Group className="mb-4">
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
                                placeholder="Any specific requirements? (e.g. Roof size, Monthly Bill)" 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="bg-light border-0 py-2"
                            />
                        </Form.Group>
                        <Button variant="warning" size="lg" type="submit" className="w-100 fw-bolder text-dark shadow-sm" disabled={loading}>
                            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "REQUEST FREE QUOTE"}
                        </Button>
                        <p className="text-center text-muted small mt-3 mb-0">
                            <i className="fa-solid fa-lock me-1"></i> No spam. Your data is safe with us.
                        </p>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default QuoteModal;
