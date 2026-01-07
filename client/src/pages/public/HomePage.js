import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';

// --- NEW IMPORTS for animations ---
import CountUp from 'react-countup';
import AnimatedSection from '../../components/common/AnimatedSection';
import PowerFutureSection from '../../components/home/PowerFutureSection';
import PrioritySection from '../../components/home/PrioritySection';
import TestimonialsSection from '../../components/home/TestimonialsSection';

// --- Import your images ---
import sliderImg1 from '../../assets/images/gallery/industrial-plant-1.jpg';
import sliderImg2 from '../../assets/images/hero-slider-2.jpg';
import sliderImg3 from '../../assets/images/hero-slider-3.jpg';
import teamAbhishek from '../../assets/images/team-abhishek.jpg';
import teamShivam from '../../assets/images/team-shivam.jpg';

const HomePage = () => {
  return (
    <>
      {/* === Carousel Section (No scroll animation needed here) === */}
      <Carousel fade className="content-beneath-navbar">
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={sliderImg1} alt="First slide" style={{ height: '85vh', objectFit: 'cover' }} />
          <Carousel.Caption className="d-none d-md-block">
            <h3>Powerful Solar Solutions</h3>
            <p>Harness the power of the sun for a brighter future.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={sliderImg2} alt="Second slide" style={{ height: '85vh', objectFit: 'cover' }} />
          <Carousel.Caption className="d-none d-md-block">
            <h3>Sustainable Energy for Everyone</h3>
            <p>Join us in the renewable energy revolution.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={sliderImg3} alt="Third slide" style={{ height: '85vh', objectFit: 'cover' }} />
          <Carousel.Caption className="d-none d-md-block">
            <h3>Expert Installation & Service</h3>
            <p>Quality and reliability you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* === Power Future Section === */}
      <PowerFutureSection />

      {/* === About Us Section (Wrapped for animation) === */}
      <AnimatedSection className="about-us py-5 section-bg">
        <Container>
          <Row className="align-items-center g-lg-5">
            <Col lg={6}>
              <div className="about-video">
                <div className="embed-responsive embed-responsive-16by9" style={{borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                  <iframe className="embed-responsive-item" width="100%" height="315" src="https://www.youtube.com/embed/TzfnlPxCZv0?si=NMhAnttXOROafKJs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-content mt-4 mt-lg-0">
                <h2 className="section-title">About Us</h2>
                <p>Sun Squad Solar is a leading renewable energy company in India. We provide system integration support for turn-key projects. We assist in building customised systems from multiple sources which have been garnered from our expertise. As our firm name suggests, our priority relies in providing alternate power solutions at affordable prices.</p>
                <p>* On-time at services<br />* Verified professionals</p>
                <Button as={Link} to="/about" variant="success" size="lg">Learn More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </AnimatedSection>

      {/* === Customer Priority Section (Wrapped for animation) === */}
      <PrioritySection />

      {/* === Values & Vision Section (Wrapped for animation) === */}
      <AnimatedSection className="values-section py-5 section-bg">
        <Container>
            <Row className="g-4">
                <Col xs={12} lg={3}><Card className="h-100 text-white" style={{ backgroundColor: '#33A1E0' }}><Card.Body className="d-flex flex-column"><Card.Title as="h3">Why Choose Us</Card.Title><Card.Text>Sun Squad Solar. We use a combination of both online and offline marketing...</Card.Text><Button as={Link} to="/about" variant="outline-light" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
                <Col xs={12} md={4} lg={3}><Card className="h-100 text-center shadow-sm"><Card.Body className="d-flex flex-column"><div className="value-icon"><i className="fa-solid fa-eye"></i></div><Card.Title as="h3">Our Vision</Card.Title><Card.Text>Promoting renewable energy adoption, and ensuring a cleaner, greener, and brighter future...</Card.Text><Button as={Link} to="/about" variant="outline-primary" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
                <Col xs={12} md={4} lg={3}><Card className="h-100 text-center shadow-sm"><Card.Body className="d-flex flex-column"><div className="value-icon"><i className="fa-solid fa-bullseye"></i></div><Card.Title as="h3">Our Mission</Card.Title><Card.Text>We Mission to offer added value to our customers by providing a "whole of life" client support...</Card.Text><Button as={Link} to="/about" variant="outline-primary" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
                <Col xs={12} md={4} lg={3}><Card className="h-100 text-center shadow-sm"><Card.Body className="d-flex flex-column"><div className="value-icon"><i className="fa-solid fa-people-group"></i></div><Card.Title as="h3">Our Strategy</Card.Title><Card.Text>Manufacturing specialized solar accessories like brackets and junction boxes...</Card.Text><Button as={Link} to="/about" variant="outline-primary" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
            </Row>
        </Container>
      </AnimatedSection>

      {/* === Expert Consultation Section === */}
      <AnimatedSection className="expert-consultation-section py-5">
        <Container>
          <div className="expert-consultation-wrapper">
            <Row className="align-items-center">
              <Col lg={6} className="position-relative mb-4 mb-lg-0">
                <div className="consultation-image-container">
                  <img src={sliderImg3} alt="Solar Installation" className="img-fluid rounded-4 shadow-lg" />
                  <div className="badge-expert">
                    <span className="dot"></span> Expert Available
                  </div>
                  <div className="badge-support">
                    <strong>24/7</strong><br/>Support
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="consultation-content ps-lg-4">
                  <div className="guidance-pill mb-3">
                    <i className="fa-regular fa-comments me-2"></i> Need Solar Guidance?
                  </div>
                  <h2 className="text-white fw-bold mb-3">
                    Get Expert Solar Consultation <span className="text-warning">Absolutely Free!</span>
                  </h2>
                  <p className="text-white-50 mb-4">
                    Whether you're exploring solar options or ready to make the switch, our certified experts provide personalized guidance on system sizing, financing options, and installation timelines - all tailored to your specific needs and budget.
                  </p>
                  
                  <Row className="g-3 mb-4">
                    <Col sm={6}>
                      <div className="d-flex align-items-center text-white">
                        <div className="feature-check me-2"><i className="fa-solid fa-check"></i></div>
                        <span>Free Site Assessment</span>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex align-items-center text-white">
                        <div className="feature-check me-2"><i className="fa-solid fa-wallet"></i></div>
                        <span>Custom Financing</span>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex align-items-center text-white">
                        <div className="feature-check me-2"><i className="fa-solid fa-certificate"></i></div>
                        <span>MNRE Certified</span>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex align-items-center text-white">
                        <div className="feature-check me-2"><i className="fa-solid fa-shield-halved"></i></div>
                        <span>25-Year Warranty</span>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex flex-wrap gap-3">
                    <Button variant="light" size="lg" className="rounded-pill fw-bold px-4">
                      <i className="fa-solid fa-phone me-2"></i> Call Now: +91 6306693936
                    </Button>
                    <Button variant="outline-light" size="lg" className="rounded-pill fw-bold px-4">
                      <i className="fa-brands fa-whatsapp me-2"></i> WhatsApp Chat
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </AnimatedSection>

      {/* === Team Member Section (Wrapped for animation) === */}
      <AnimatedSection className="team-section py-5">
        <Container className="text-center">
          <h2 className="section-title">Our Directors</h2>
          <div className="title-underline"></div>
          <Row className="justify-content-center g-4">
            <Col sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm"><Card.Img variant="top" src={teamAbhishek} /><Card.Body><Card.Title as="h3" className="fs-5">MR. ABHISHEK MAURYA</Card.Title><Card.Text className="fw-bold">Managing Director</Card.Text></Card.Body></Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm"><Card.Img variant="top" src={teamShivam} /><Card.Body><Card.Title as="h3" className="fs-5">MR. SHIVAM MAURYA</Card.Title><Card.Text className="fw-bold">Operation Head</Card.Text></Card.Body></Card>
            </Col>
          </Row>
        </Container>
      </AnimatedSection>

      {/* === Statistics Section (Wrapped and with CountUp) === */}
      <AnimatedSection className="stats-section py-5 section-bg">
          <Container>
              <Row className="g-4 text-center">
                  <Col md={4}><div className="stat-card p-4"><div className="stat-icon"><i className="fa-regular fa-user"></i></div>
                    <span className="stat-number">
                        <CountUp end={1000} duration={3} enableScrollSpy />+
                    </span>
                    <p className="stat-label">Our Customer</p>
                  </div></Col>
                  <Col md={4}><div className="stat-card p-4"><div className="stat-icon"><i className="fa-solid fa-warehouse"></i></div>
                    <span className="stat-number">
                        <CountUp end={2} duration={3} enableScrollSpy />+
                    </span>
                    <p className="stat-label">Our Branch</p>
                  </div></Col>
                  <Col md={4}><div className="stat-card p-4"><div className="stat-icon"><i className="fa-solid fa-people-roof"></i></div>
                    <span className="stat-number">
                        <CountUp end={100} duration={3} enableScrollSpy />+
                    </span>
                    <p className="stat-label">Our Agent</p>
                  </div></Col>
              </Row>
          </Container>
      </AnimatedSection>

      {/* === Amenities Section (Wrapped for animation) === */}
      <AnimatedSection className="amenities-section py-5">
          <Container className="text-center">
              <h2 className="section-title amenities-title"><span>Exclusivity</span> | <span>High Quality</span> | <span>Amenities</span></h2>
              <div className="title-underline"></div>
              <Row className="g-3 mt-4">
                  <Col xs={6} sm={4} lg={2}><div className="amenity-card"><div className="amenity-icon"><i className="fa-solid fa-school"></i></div><h4>School</h4></div></Col>
                  <Col xs={6} sm={4} lg={2}><div className="amenity-card"><div className="amenity-icon"><i className="fa-solid fa-cart-shopping"></i></div><h4>Shopping Mall</h4></div></Col>
                  <Col xs={6} sm={4} lg={2}><div className="amenity-card"><div className="amenity-icon"><i className="fa-solid fa-house"></i></div><h4>Houses</h4></div></Col>
                  <Col xs={6} sm={4} lg={2}><div className="amenity-card"><div className="amenity-icon"><i className="fa-solid fa-road"></i></div><h4>Street</h4></div></Col>
                  <Col xs={6} sm={4} lg={2}><div className="amenity-card"><div className="amenity-icon"><i className="fa-solid fa-industry"></i></div><h4>Complexes</h4></div></Col>
                  <Col xs={6} sm={4} lg={2}><div className="amenity-card"><div className="amenity-icon"><i className="fa-solid fa-bullseye"></i></div><h4>Government Project</h4></div></Col>
              </Row>
          </Container>
      </AnimatedSection>

      {/* === Map & Contact Section === */}
      <AnimatedSection className="map-contact-section">
        <div className="map-container position-relative">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.206116901794!2d82.96070707516577!3d25.26365087766825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e332fdf328f73%3A0x1a5c35f7c55c3ffa!2sSUN%20SQUAD%20SOLAR!5e0!3m2!1sen!2sin!4v1759347768628!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 4, filter: 'grayscale(0%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sun Squad Solar Location Map"
            ></iframe>
            
            {/* Overlay Buttons Container */}
            <Container className="contact-overlay-container">
                <Row className="justify-content-center g-4">
                    <Col md={4}>
                        <a href="tel:+91 9278450045" className="contact-action-card">
                            <div className="icon-box"><i className="fa-solid fa-phone"></i></div>
                            <h3>Call Now</h3>
                            <p>Instant Response</p>
                        </a>
                    </Col>
                    <Col md={4}>
                        <a href="https://wa.me/9278450045" target="_blank" rel="noopener noreferrer" className="contact-action-card">
                            <div className="icon-box"><i className="fa-brands fa-whatsapp"></i></div>
                            <h3>WhatsApp</h3>
                            <p>Quick Chat</p>
                        </a>
                    </Col>
                    <Col md={4}>
                        <a href="sunsquadsolar4@gmail.com" className="contact-action-card">
                            <div className="icon-box"><i className="fa-solid fa-envelope"></i></div>
                            <h3>Email Us</h3>
                            <p>Detailed Inquiry</p>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
      </AnimatedSection>

      {/* === Testimonials Section (New Grid Layout) === */}
      <TestimonialsSection />
    </>
  );
};

export default HomePage;