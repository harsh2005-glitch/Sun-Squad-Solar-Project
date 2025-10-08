import React, { useEffect } from 'react';
// Import the Bootstrap components we need
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactPage = () => {
  // Add and remove a class from the body tag to apply our background
  useEffect(() => {
    document.body.classList.add('contact-page-bg');
    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('contact-page-bg');
    };
  }, []); // Empty array ensures this runs only on mount and unmount

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Functionality to be added)");
  };

  return (
    <main>
      <section className="contact-section">
        <Container>
          <div className="text-center">
            <h2 className="section-title">Get In Touch</h2>
            <div className="title-underline"></div>
            <p className="section-subtitle">Have a question? We'd love to hear from you. Contact us, and we’ll get back to you shortly.</p>
          </div>

          {/* Bootstrap Grid Layout */}
          <Row className="mt-5 align-items-center">
            
            {/* --- Left Column: Info Cards --- */}
            <Col md={5} lg={4}>
              <div className="info-card-contact">
                <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="info-text">
                  <h3>Our Office</h3>
                  <p>Sant Nagar Colony, Chitaipur, Varanasi, 221106</p>
                </div>
              </div>
              <div className="info-card-contact">
                <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p>sunsquadsolar4@gmail.com</p>
                </div>
              </div>
              <div className="info-card-contact">
                <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <p>+91 9278450045</p>
                </div>
              </div>
            </Col>
            
            {/* --- Right Column: Contact Form --- */}
            <Col md={7} lg={8}>
              <Form onSubmit={handleSubmit} className="p-4 p-md-5">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="Your Name" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control type="email" placeholder="Your Email" required />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Subject" required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control as="textarea" rows={6} placeholder="Your Message" required />
                </Form.Group>
                <Button type="submit" className="btn-submit-green">
                  Send Message
                </Button>
              </Form>
            </Col>

          </Row>
        </Container>
      </section>
      
      {/* The Map Section is now completely removed */}
    </main>
  );
};

export default ContactPage;