import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimatedSection from '../common/AnimatedSection';
import illustrationImg from '../../assets/images/illustration.png'; // Using existing image as fallback

const PowerFutureSection = () => {
  return (
    <AnimatedSection className="power-future-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="content-wrapper pe-lg-5">
              <div className="badge-pill mb-4">
                <span className="dot"></span> India's Premium Solar Solutions
              </div>
              <h2 className="display-3 fw-bolder mb-4 lh-1 section-title-large">
                Power Your <br />
                Future <span className="dot-separator"></span> with <br />
                <span className="text-orange">Sun </span><span className="text-green">Squad</span> <br />
                <span className="text-green">Solar</span>
              </h2>
              <p className="lead text-muted mb-5">
                Transform your energy consumption with our premium solar solutions. From residential rooftops to commercial installations, we deliver sustainable power systems designed for maximum efficiency and long-term performance.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Button as={Link} to="/contact" variant="success" size="lg" className="rounded-pill px-4 py-3 fw-bold shadow-sm">
                  <i className="fa-regular fa-comment me-2"></i> Get Free Consultation
                </Button>
                <Button as={Link} to="/about" variant="outline-dark" size="lg" className="rounded-pill px-4 py-3 fw-bold">
                  <i className="fa-regular fa-circle-question me-2"></i> Why Choose Us
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6}>
             <div className="illustration-wrapper position-relative">
                <div className="image-container">
                    <img src={illustrationImg} alt="Solar Illustration" className="img-fluid rounded-4 shadow-lg main-img" />
                </div>
                
                {/* Floating cards */}
                <div className="floating-card card-efficiency">
                    <div className="icon-box bg-success text-white">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div>
                        <h4 className="mb-0 fw-bold">95%</h4>
                        <small className="text-muted">Efficiency Rate</small>
                    </div>
                </div>
                
                <div className="floating-card card-projects">
                    <div className="icon-box text-white">
                        <i className="fa-solid fa-briefcase"></i>
                    </div>
                    <div>
                        <h4 className="mb-0 fw-bold">100+</h4>
                        <small>Projects</small>
                    </div>
                </div>
                
                 <div className="floating-card card-savings">
                    <div className="icon-box bg-warning text-white">
                        <i className="fa-solid fa-sun"></i>
                    </div>
                    <div>
                        <h4 className="mb-0 fw-bold">₹2.5L+</h4>
                        <small className="text-muted">Savings/Year</small>
                    </div>
                </div>
             </div>
          </Col>
        </Row>
      </Container>
    </AnimatedSection>
  );
};

export default PowerFutureSection;
