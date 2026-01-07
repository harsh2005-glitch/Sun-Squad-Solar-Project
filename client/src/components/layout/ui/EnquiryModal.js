import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

const EnquiryModal = ({ show, handleClose }) => {
  // Step 1: Add state to manage the form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    menu: '',
    message: '',
  });

  // Step 2: Create a function to update the state as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Step 3: Implement the WhatsApp submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Your company's WhatsApp number
    const companyWhatsAppNumber = '919278450045';


    // Create the pre-filled message from the form state
    const message = `
      New Appointment Request from Website:
      -------------------------------------
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Preferred Date: ${formData.date}
      Enquiry Type: ${formData.menu}
      Message: ${formData.message}
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${companyWhatsAppNumber}&text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Close the modal after submission
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="enquiry-modal">
      <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)', borderBottom: 'none' }}>
        <Modal.Title as="h3" className="w-100 text-center text-white fw-bold">
            <i className="fa-solid fa-calendar-check me-2"></i> Book an Appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4" style={{ backgroundColor: '#f9f9f9' }}>
        <p className="text-center text-muted mb-4">
            Fill in the details below and we will get back to you shortly via WhatsApp.
        </p>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={12} className="mb-2">
                 <h6 className="text-primary fw-bold"><i className="fa-solid fa-user-tag me-2"></i>Personal Details</h6>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 text-warning">
                    <i className="fa-solid fa-user"></i>
                </InputGroup.Text>
                <Form.Control 
                    className="border-start-0 ps-0" 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
              </InputGroup>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 text-warning">
                    <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control 
                    className="border-start-0 ps-0" 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 text-warning">
                    <i className="fa-solid fa-phone"></i>
                </InputGroup.Text>
                <Form.Control 
                    className="border-start-0 ps-0" 
                    type="tel" 
                    name="phone" 
                    placeholder="Your Phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                />
              </InputGroup>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col md={12} className="mb-2 mt-2">
                 <h6 className="text-primary fw-bold"><i className="fa-solid fa-clipboard-list me-2"></i>Service Details</h6>
            </Col>
            <Col md={6} className="mb-3 mb-md-0">
               <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 text-success">
                    <i className="fa-regular fa-calendar-days"></i>
                </InputGroup.Text>
                 <Form.Control 
                    className="border-start-0 ps-0"
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                 />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 text-success">
                    <i className="fa-solid fa-bars"></i>
                </InputGroup.Text>
                <Form.Select 
                    className="border-start-0 ps-0"
                    name="menu" 
                    value={formData.menu} 
                    onChange={handleChange} 
                    required
                >
                    <option value="" disabled>-- Select Enquiry Type --</option>
                    <option value="Site Visit">Site Visit</option>
                    <option value="Sales Enquiry">Sales Enquiry</option>
                    <option value="General Information">General Information</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
          
          <Row className="mb-4">
             <Col>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0 text-info">
                    <i className="fa-solid fa-message"></i>
                </InputGroup.Text>
                <Form.Control 
                    className="border-start-0 ps-0"
                    as="textarea" 
                    name="message" 
                    placeholder="Your Message (Optional)" 
                    rows={4} 
                    value={formData.message} 
                    onChange={handleChange} 
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button 
                variant="success" 
                type="submit" 
                className="fw-bold px-4 py-2 rounded-pill shadow"
                style={{ background: 'linear-gradient(45deg, #25D366, #128C7E)', border: 'none' }}
              >
                <i className="fa-brands fa-whatsapp fa-lg me-2"></i> Make an Appointment via WhatsApp
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EnquiryModal;