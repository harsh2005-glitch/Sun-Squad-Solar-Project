import React from 'react';
import { Container, Row, Col, Badge, Button, Card } from 'react-bootstrap';
import { FaBookOpen, FaMedal, FaUsers, FaCalendarAlt, FaBullseye, FaEye } from 'react-icons/fa'; // Importing icons
import './AboutPage.css';
import headerImage from '../../assets/images/project.jpg'; // Using an existing image as placeholder

const AboutPage = () => {
  return (
    <div className="page-container">
      {/* === Hero Section (Existing) === */}
      <div className="about-page-wrapper">
        <Container className="py-5">
          <Row className="align-items-center">
            {/* Left Column: Text Content */}
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="about-content">
                <Badge bg="light" text="success" className="mb-3 px-3 py-2 rounded-pill about-badge">
                  <span className="badge-dot me-2">●</span> About Sun Squad Solar
                </Badge>
                
                <h1 className="display-4 fw-bold mb-4 about-title">
                  Empowering <br />
                  India with <br />
                  <span className="text-warning">Sustainable</span> <br />
                  <span className="text-success">Energy</span>
                </h1>
                
                <p className="lead text-muted mb-4 about-description">
                  We are on a mission to power a sustainable future through premium solar solutions. 
                  Discover our story, values, achievements, and the dedicated team making Uttar Pradesh's
                  clean energy revolution possible.
                </p>
                
                <div className="d-flex gap-3">
                  <Button variant="success" size="lg" className="px-4 py-2 rounded-pill fw-bold btn-our-story">
                    <FaBookOpen className="me-2" /> Our Story
                  </Button>
                  <Button variant="outline-dark" size="lg" className="px-4 py-2 rounded-pill fw-bold btn-achievements">
                    <FaMedal className="me-2" /> Our Achievements
                  </Button>
                </div>
              </div>
            </Col>
            
            {/* Right Column: Image & Stats */}
            <Col lg={6}>
              <div className="about-image-container position-relative">
                <div className="image-wrapper rounded-4 overflow-hidden shadow-lg">
                  <img 
                    src={headerImage} 
                    alt="Solar Panels Field" 
                    className="img-fluid w-100 object-fit-cover" 
                    style={{ minHeight: '400px', maxHeight: '500px' }}
                  />
                </div>
                
                {/* Floating Stat Card - Top Right */}
                <div className="stat-card stat-card-top-right position-absolute bg-white p-3 rounded-4 shadow d-flex align-items-center">
                  <div className="icon-box bg-success bg-opacity-10 text-success rounded-3 p-2 me-3">
                    <FaUsers size={24} />
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold text-success">500+</h5>
                    <small className="text-muted fw-bold">Happy Customers</small>
                  </div>
                </div>

                {/* Floating Stat Card - Bottom Left */}
                <div className="stat-card stat-card-bottom-left position-absolute bg-white p-3 rounded-4 shadow d-flex align-items-center">
                  <div className="icon-box bg-warning bg-opacity-10 text-warning rounded-3 p-2 me-3">
                    <FaCalendarAlt size={24} />
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold text-warning">5+</h5>
                    <small className="text-muted fw-bold">Years Experience</small>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* === Mission & Vision Section (New) === */}
      <div className="mission-vision-wrapper py-5">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-5">
            <Badge bg="light" text="success" className="mb-3 px-3 py-2 rounded-pill mv-badge mx-auto">
              <FaBullseye className="me-2" /> Our Purpose
            </Badge>
            <h2 className="display-5 fw-bold mv-title">
              Mission & <br />
              <span className="text-warning">Vision</span>
            </h2>
          </div>

          <Row className="g-4">
            {/* Mission Card */}
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm p-4 mv-card">
                <Card.Body>
                  <div className="mb-4">
                    <div className="mv-icon-box mv-icon-mission">
                      <FaBullseye size={32} />
                    </div>
                  </div>
                  <Card.Title className="fw-bold fs-3 mb-3 text-dark mv-card-title">Our Mission</Card.Title>
                  <Card.Text className="text-muted mv-card-text">
                    To accelerate the adoption of clean solar energy by delivering reliable, efficient, and affordable solutions with unmatched service quality across Maharashtra and beyond.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Vision Card */}
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm p-4 mv-card">
                <Card.Body>
                  <div className="mb-4">
                    <div className="mv-icon-box mv-icon-vision">
                      <FaEye size={32} />
                    </div>
                  </div>
                  <Card.Title className="fw-bold fs-3 mb-3 text-warning mv-card-title">Our Vision</Card.Title>
                  <Card.Text className="text-muted mv-card-text">
                   To empower every community with sustainable power and become a benchmark for excellence in renewable energy across India, creating a cleaner future for generations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AboutPage;
