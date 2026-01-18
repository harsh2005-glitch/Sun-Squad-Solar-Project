import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Card } from 'react-bootstrap';
import { FaBookOpen, FaMedal, FaUsers, FaCalendarAlt, FaBullseye, FaEye } from 'react-icons/fa'; // Importing icons
import './AboutPage.css';
import headerImage from '../../assets/images/project.jpg'; // Using an existing image as placeholder
import teamService from '../../services/teamService';
import teamAbhishek from '../../assets/images/team-abhishek.jpg';
import teamShivam from '../../assets/images/team-shivam.jpg';

const AboutPage = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                // Simulate a slight delay to show off the skeleton (optional, remove setTimeout in prod if fast)
                // setTimeout(async () => { 
                    const data = await teamService.getTeamMembers();
                    setTeamMembers(data);
                    setLoading(false);
                // }, 1000);
            } catch (error) {
                console.error("Failed to load team members", error);
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

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
                  <Button variant="success" size="lg" className="px-4 py-2 rounded-pill fw-bold btn-our-story hover-lift hover-shine">
                    <FaBookOpen className="me-2" /> Our Story
                  </Button>
                  <Button variant="outline-dark" size="lg" className="px-4 py-2 rounded-pill fw-bold btn-achievements hover-lift">
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

      {/* === Our Leaders & Experts Section (Moved from Home) === */}
      <section className="team-section-about py-5">
        <Container>
            <div className="text-center mb-5">
                <Badge bg="light" text="success" className="mb-3 px-3 py-2 rounded-pill mv-badge mx-auto">
                    <FaUsers className="me-2" /> Leadership
                </Badge>
                <h2 className="display-5 fw-bold mv-title">
                    Meet Our <span className="text-success">Experts</span>
                </h2>
                <p className="text-muted lead mx-auto" style={{maxWidth: '700px'}}>
                    The visionaries and technically skilled professionals driving our mission forward.
                </p>
            </div>

            <Row className="justify-content-center g-4">
                {loading ? (
                    // Skeleton Loader Loop (Show 4 placeholder cards)
                    [1, 2, 3, 4].map((n) => (
                        <Col key={n} sm={6} md={4} lg={3}>
                            <div className="skeleton-card">
                                <div className="skeleton-card-img"></div>
                                <div className="skeleton-card-body">
                                    <div className="skeleton-card-title"></div>
                                    <div className="skeleton-card-role"></div>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                        <Col key={member._id} sm={6} md={4} lg={3}>
                            <div className="team-card-modern h-100 hover-lift"> {/* Added hover-lift */}
                                <div className="team-img-modern">
                                    <img src={member.imageUrl} alt={member.name} />
                                    <div className="team-social-overlay">
                                        {/* Placeholder social links - you can make these dynamic later */}
                                        <a href="#!"><i className="fa-brands fa-linkedin-in"></i></a>
                                        <a href="#!"><i className="fa-brands fa-twitter"></i></a>
                                    </div>
                                </div>
                                <div className="team-content-modern text-center">
                                    <h4 className="team-name-modern">{member.name}</h4>
                                    <span className="team-role-modern">{member.role}</span>
                                    {member.bio && <p className="team-bio-modern mt-3">{member.bio}</p>}
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <>
                        {/* Fallback Static Content with Hover Effect */}
                        <Col sm={6} md={4} lg={3}>
                            <div className="team-card-modern h-100 hover-lift">
                                <div className="team-img-modern">
                                    <img src={teamAbhishek} alt="Mr. Abhishek Maurya" />
                                </div>
                                <div className="team-content-modern text-center">
                                    <h4 className="team-name-modern">MR. ABHISHEK MAURYA</h4>
                                    <span className="team-role-modern">Managing Director</span>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={4} lg={3}>
                            <div className="team-card-modern h-100 hover-lift">
                                <div className="team-img-modern">
                                    <img src={teamShivam} alt="Mr. Shivam Maurya" />
                                </div>
                                <div className="team-content-modern text-center">
                                    <h4 className="team-name-modern">MR. SHIVAM MAURYA</h4>
                                    <span className="team-role-modern">Operation Head</span>
                                </div>
                            </div>
                        </Col>
                    </>
                )}
            </Row>
        </Container>
      </section>

    </div>
  );
};

export default AboutPage;
