import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import './HomePage.css'; // Importing custom styles
import './HomePageMap.css'; // Importing map section styles
import EligibilityModal from '../../components/public/EligibilityModal'; // Import the Modal

// --- NEW IMPORTS for animations ---
import CountUp from 'react-countup';
import AnimatedSection from '../../components/common/AnimatedSection';
import PartnersStrip from '../../components/common/PartnersStrip'; // Import Partners Strip
import PowerFutureSection from '../../components/home/PowerFutureSection';
import PrioritySection from '../../components/home/PrioritySection';
// import TestimonialsSection from '../../components/home/TestimonialsSection'; // Replaced by new Google Widget
import CertificationStrip from '../../components/common/CertificationStrip';
import GoogleReviewsWidget from '../../components/common/GoogleReviewsWidget';
import CaseStudiesSection from '../../components/home/CaseStudiesSection'; // Import the new Case Studies Section


// --- Import your images ---
import sliderImg1 from '../../assets/images/gallery/industrial-plant-1.jpg';
import sliderImg2 from '../../assets/images/hero-slider-2.jpg';
import sliderImg3 from '../../assets/images/hero-slider-3.jpg';

const HomePage = () => {
    const [showQuiz, setShowQuiz] = useState(false); // State for Quiz Modal

  return (
    <>
      {/* === Carousel Section (No scroll animation needed here) === */}
      <Carousel fade className="content-beneath-navbar">
        <Carousel.Item interval={3000}>
          <img className="d-block w-100 hero-image" src={sliderImg1} alt="First slide" />
          <Carousel.Caption className="d-none d-md-block">
            <h3>Powerful Solar Solutions</h3>
            <p>Harness the power of the sun for a brighter future.</p>
            {/* Added Interactive Buttons */}
            <div className="mt-3">
                <Button variant="warning" size="lg" className="me-3 fw-bold rounded-pill" onClick={() => setShowQuiz(true)}>Am I Eligible?</Button>
                <Button as={Link} to="/calculator" variant="outline-light" size="lg" className="fw-bold rounded-pill">Calculate Savings</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100 hero-image" src={sliderImg2} alt="Second slide" />
          <Carousel.Caption className="d-none d-md-block">
            <h3>Sustainable Energy for Everyone</h3>
            <p>Join us in the renewable energy revolution.</p>
             <div className="mt-3">
                <Button variant="warning" size="lg" className="me-3 fw-bold rounded-pill" onClick={() => setShowQuiz(true)}>Start My Solar Journey</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100 hero-image" src={sliderImg3} alt="Third slide" />
          <Carousel.Caption className="d-none d-md-block">
            <h3>Expert Installation & Service</h3>
            <p>Quality and reliability you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* === Trusted Partners Strip === */}
      <PartnersStrip />
      
      {/* === Certification Strip (New) === */}
      <CertificationStrip />
Case Studies Section (Interactive Slider) === */}
      <CaseStudiesSection />

      {/* === 
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
                {/* Card 1: Why Choose Us */}
                <Col xs={12} lg={3}>
                    <Card className="value-card-enhanced">
                        <Card.Body className="d-flex flex-column align-items-center w-100">
                             {/* Added Icon for consistency, even if not originally there, fits the layout better */}
                            <div className="value-icon-enhanced"><i className="fa-regular fa-thumbs-up"></i></div> 
                            <Card.Title as="h3">Why Choose Us</Card.Title>
                            <Card.Text>Sun Squad Solar. We use a combination of both online and offline marketing...</Card.Text>
                            <Button as={Link} to="/about" variant="outline-light">Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 2: Vision */}
                <Col xs={12} md={4} lg={3}>
                    <Card className="value-card-enhanced">
                        <Card.Body className="d-flex flex-column align-items-center w-100">
                            <div className="value-icon-enhanced"><i className="fa-solid fa-eye"></i></div>
                            <Card.Title as="h3">Our Vision</Card.Title>
                            <Card.Text>Promoting renewable energy adoption, and ensuring a cleaner, greener, and brighter future...</Card.Text>
                            <Button as={Link} to="/about" variant="outline-light">Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 3: Mission */}
                <Col xs={12} md={4} lg={3}>
                    <Card className="value-card-enhanced">
                        <Card.Body className="d-flex flex-column align-items-center w-100">
                             <div className="value-icon-enhanced"><i className="fa-solid fa-bullseye"></i></div>
                            <Card.Title as="h3">Our Mission</Card.Title>
                            <Card.Text>We Mission to offer added value to our customers by providing a "whole of life" client support...</Card.Text>
                            <Button as={Link} to="/about" variant="outline-light">Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 4: Strategy */}
                <Col xs={12} md={4} lg={3}>
                    <Card className="value-card-enhanced">
                        <Card.Body className="d-flex flex-column align-items-center w-100">
                            <div className="value-icon-enhanced"><i className="fa-solid fa-people-group"></i></div>
                            <Card.Title as="h3">Our Strategy</Card.Title>
                            <Card.Text>Manufacturing specialized solar accessories like brackets and junction boxes...</Card.Text>
                            <Button as={Link} to="/about" variant="outline-light">Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>
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
                      <i className="fa-solid fa-phone me-2"></i> Call Now: +91 9278450045
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

      {/* === Premium Services Section (NEW) === */}
      <AnimatedSection id="premium-services" className="premium-services-section py-5">
        <Container>
            <div className="text-center mb-5">
                <h2 className="section-title display-5 fw-bold mb-3">Premium Solar <span className="text-highlight-green">Services</span></h2>
                <p className="text-muted fs-5 mx-auto" style={{maxWidth: '800px'}}>
                    Comprehensive solar solutions designed for maximum efficiency, reliability, and long-term performance across India.
                </p>
            </div>
            
            <Row className="g-4">
                {/* Service 1 */}
                <Col lg={4} md={6}>
                    <div className="premium-service-card">
                        <div className="service-icon-wrapper icon-success">
                            <i className="fa-regular fa-sun"></i>
                        </div>
                        <h3 className="service-title">Solar Panel Installation</h3>
                        <p className="service-description">
                            Custom rooftop and ground-mount systems optimized for peak performance and longevity with premium-grade panels.
                        </p>
                        <ul className="service-list">
                            <li><i className="fa-solid fa-check"></i> Premium Tier-1 panels</li>
                            <li><i className="fa-solid fa-check"></i> 25-year warranty</li>
                        </ul>
                    </div>
                </Col>

                {/* Service 2 */}
                <Col lg={4} md={6}>
                    <div className="premium-service-card">
                        <div className="service-icon-wrapper icon-warning">
                            <i className="fa-solid fa-bolt"></i>
                        </div>
                        <h3 className="service-title text-warning">Hybrid Solar Solutions</h3>
                        <p className="service-description">
                            Seamlessly integrate grid-tie and battery backup systems for uninterrupted power supply and maximum savings.
                        </p>
                        <ul className="service-list">
                            <li><i className="fa-solid fa-check"></i> Grid-tie + Battery backup</li>
                            <li><i className="fa-solid fa-check"></i> Smart energy management</li>
                        </ul>
                    </div>
                </Col>

                {/* Service 3 */}
                <Col lg={4} md={6}>
                    <div className="premium-service-card">
                        <div className="service-icon-wrapper icon-success">
                            <i className="fa-solid fa-screwdriver-wrench"></i>
                        </div>
                        <h3 className="service-title">Solar Maintenance</h3>
                        <p className="service-description">
                            Comprehensive maintenance, performance audits, and cleaning services for sustained efficiency and longevity.
                        </p>
                        <ul className="service-list">
                            <li><i className="fa-solid fa-check"></i> Annual maintenance plans</li>
                            <li><i className="fa-solid fa-check"></i> Performance monitoring</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
      </AnimatedSection>

      {/* === Statistics Section (Wrapped and with CountUp) === */}
      <AnimatedSection className="stats-section py-5 section-bg">
          <Container>
              <Row className="g-4 text-center">
                  <Col md={4}><div className="stat-card"><div className="stat-icon"><i className="fa-regular fa-user"></i></div>
                    <span className="stat-number">
                        <CountUp end={1000} duration={3} enableScrollSpy />+
                    </span>
                    <p className="stat-label">Our Customer</p>
                  </div></Col>
                  <Col md={4}><div className="stat-card"><div className="stat-icon"><i className="fa-solid fa-warehouse"></i></div>
                    <span className="stat-number">
                        <CountUp end={2} duration={3} enableScrollSpy />+
                    </span>
                    <p className="stat-label">Our Branch</p>
                  </div></Col>
                  <Col md={4}><div className="stat-card"><div className="stat-icon"><i className="fa-solid fa-people-roof"></i></div>
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

      {/* === Solar Knowledge Hub / Blog Section === */}
      <AnimatedSection className="blog-section py-5">
        <Container>
            <div className="text-center mb-5">
                <h2 className="section-title display-5 fw-bold mb-3">Solar Knowledge <span className="text-highlight-green">Hub</span></h2>
                <p className="text-muted fs-5 mx-auto" style={{maxWidth: '800px'}}>
                    Stay informed with the latest insights, tips, and news about solar energy.
                </p>
            </div>
            <Row className="g-4">
                {/* Blog 1 */}
                <Col md={4}>
                    <Card className="h-100 blog-card">
                        <Card.Body>
                            <div className="blog-date mb-2 text-muted fw-bold small">UPDATED 2024</div>
                            <Card.Title as="h4" className="mb-3">Solar Subsidy in UP/India 2024</Card.Title>
                            <Card.Text>
                                Discover the latest government subsidies available for solar installations in Uttar Pradesh and across India. Save significantly on your green energy investment.
                            </Card.Text>
                            <Button as={Link} to="/blog/solar-subsidy" variant="link" className="px-0 text-success fw-bold text-decoration-none learn-more-btn">Read Article <i className="fa-solid fa-arrow-right ms-2"></i></Button>
                        </Card.Body>
                    </Card>
                </Col>
                 {/* Blog 2 */}
                <Col md={4}>
                    <Card className="h-100 blog-card">
                        <Card.Body>
                             <div className="blog-date mb-2 text-muted fw-bold small">GUIDE</div>
                            <Card.Title as="h4" className="mb-3">On-Grid vs Off-Grid Solar</Card.Title>
                            <Card.Text>
                                Confused between On-Grid and Off-Grid systems? 
                                We break down the differences, pros, and cons to help you choose the right setup for your home.
                            </Card.Text>
                            <Button as={Link} to="/blog/on-grid-vs-off-grid" variant="link" className="px-0 text-success fw-bold text-decoration-none learn-more-btn">Read Article <i className="fa-solid fa-arrow-right ms-2"></i></Button>
                        </Card.Body>
                    </Card>
                </Col>
                 {/* Blog 3 */}
                <Col md={4}>
                    <Card className="h-100 blog-card">
                        <Card.Body>
                             <div className="blog-date mb-2 text-muted fw-bold small">MAINTENANCE</div>
                            <Card.Title as="h4" className="mb-3">Solar Maintenance Tips</Card.Title>
                            <Card.Text>
                                Keep your solar panels operating at peak efficiency with these simple maintenance tips. Learn how to clean and care for your system effectively.
                            </Card.Text>
                            <Button as={Link} to="/blog/maintenance-tips" variant="link" className="px-0 text-success fw-bold text-decoration-none learn-more-btn">Read Article <i className="fa-solid fa-arrow-right ms-2"></i></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
      </AnimatedSection>

      {/* === FAQ Section === */}
      <AnimatedSection className="faq-section py-5 section-bg">
        <Container>
             <div className="text-center mb-5">
                <h2 className="section-title display-5 fw-bold mb-3">Frequently Asked <span className="text-highlight-green">Questions</span></h2>
                <p className="text-muted fs-5 mx-auto" style={{maxWidth: '800px'}}>
                    Have questions? We have answers. Check out our most common queries below.
                </p>
            </div>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Accordion defaultActiveKey="0" className="custom-accordion">
                        <Accordion.Item eventKey="0" className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden">
                            <Accordion.Header>How much does a solar system cost?</Accordion.Header>
                            <Accordion.Body>
                                The cost of a solar system depends on various factors such as the capacity (kW), type of system (On-Grid, Off-Grid, or Hybrid), and the brand of components used. Generally, a residential system can range from ₹50,000 to ₹80,000 per kW. We offer free consultations to provide a precise quote tailored to your needs.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden">
                            <Accordion.Header>Is there a government subsidy available?</Accordion.Header>
                            <Accordion.Body>
                                Yes! The Government of India and various state governments offer subsidies for residential rooftop solar installations. Under the PM Surya Ghar: Muft Bijli Yojana, you can avail significant financial assistance. Our team assists you with the entire documentation and application process to ensure you get the benefits.
                            </Accordion.Body>
                        </Accordion.Item>
                         <Accordion.Item eventKey="2" className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden">
                            <Accordion.Header>What happens at night or during cloudy days?</Accordion.Header>
                            <Accordion.Body>
                                Solar panels do not generate electricity at night. However, if you have an On-Grid system, you draw power from the grid during the night. The units you exported during the day are adjusted against this usage (Net Metering). For Off-Grid or Hybrid systems with batteries, the stored energy powers your home at night or during power cuts.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
      </AnimatedSection>
      {/* === Google Reviews Section (Replaces Old Testimonials) === */}
      <GoogleReviewsWidget />

      {/* === Map & Contact Section === */}
      <AnimatedSection className="location-connect-section">
        <Container className="py-5">
            {/* Google Map */}
            <div className="map-frame-wrapper mb-5">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.206116901794!2d82.96070707516577!3d25.26365087766825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e332fdf328f73%3A0x1a5c35f7c55c3ffa!2sSUN%20SQUAD%20SOLAR!5e0!3m2!1sen!2sin!4v1759347768628!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sun Squad Solar Location Map"
                ></iframe>
            </div>
            
            {/* Contact Action Cards */}
            <Row className="g-4 justify-content-center">
                <Col md={4}>
                    <a href="tel:+919278450045" className="contact-action-card">
                        <div className="action-icon-box">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <h3>Call Now</h3>
                        <p>Instant Response</p>
                    </a>
                </Col>
                <Col md={4}>
                    <a href="https://wa.me/919278450045" target="_blank" rel="noopener noreferrer" className="contact-action-card">
                        <div className="action-icon-box">
                            <i className="fa-brands fa-whatsapp"></i>
                        </div>
                        <h3>WhatsApp</h3>
                        <p>Quick Chat</p>
                    </a>
                </Col>
                <Col md={4}>
                    <a href="mailto:sunsquadsolar4@gmail.com" className="contact-action-card">
                        <div className="action-icon-box">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <h3>Email Us</h3>
                        <p>Detailed Inquiry</p>
                    </a>
                </Col>
            </Row>
        </Container>
      </AnimatedSection>

      {/* Global Modals in HomePage context */}
      <EligibilityModal show={showQuiz} handleClose={() => setShowQuiz(false)} />
    </>
  );
};


export default HomePage;