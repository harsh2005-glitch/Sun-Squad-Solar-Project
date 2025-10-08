import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

// `show` is a boolean to control visibility
// `handleClose` is a function to close the modal
const EnquiryModal = ({ show, handleClose }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could add logic to submit the form data, e.g., via WhatsApp
    alert("Appointment form submitted!");
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title as="h3">Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control type="text" placeholder="Your Name" required />
            </Col>
            <Col md={4}>
              <Form.Control type="email" placeholder="Your Email" required />
            </Col>
            <Col md={4}>
              <Form.Control type="tel" placeholder="Your Phone" required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control type="date" required />
            </Col>
            <Col md={6}>
              <Form.Select required>
                <option value="" disabled>--Select Menu--</option>
                <option value="site-visit">Site Visit</option>
                <option value="sales-enquiry">Sales Enquiry</option>
                <option value="general-info">General Information</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control as="textarea" placeholder="Message" rows={4} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button variant="warning" type="submit" className="fw-bold">
                Make an Appointment
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EnquiryModal;