import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

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
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title as="h3">Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Step 4: Connect the form and its inputs to the state and functions */}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </Col>
            <Col md={4}>
              <Form.Control type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </Col>
            <Col md={4}>
              <Form.Control type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
            </Col>
            <Col md={6}>
              <Form.Select name="menu" value={formData.menu} onChange={handleChange} required>
                <option value="" disabled>--Select Menu--</option>
                <option value="Site Visit">Site Visit</option>
                <option value="Sales Enquiry">Sales Enquiry</option>
                <option value="General Information">General Information</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control as="textarea" name="message" placeholder="Message" rows={4} value={formData.message} onChange={handleChange} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button variant="warning" type="submit" className="fw-bold">
                Make an Appointment via WhatsApp
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EnquiryModal;