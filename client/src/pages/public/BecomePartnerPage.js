import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/common/AnimatedSection';
import './BecomePartnerPage.css';

// You might want to use some images. I'll use placeholders or existing ones if appropriate, 
// but since I don't know all image paths, I'll rely on CSS backgrounds or font-awesome icons.

const BecomePartnerPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="become-partner-page">
            
            {/* === Hero Section === */}
            <div className="partner-hero-section d-flex align-items-center text-white">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={7}>
                            <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeInLeft">
                                Turn Your Network Into <span className="text-warning">Net Worth</span>
                            </h1>
                            <p className="lead mb-4 animate__animated animate__fadeInLeft animate__delay-1s">
                                Join Sun Squad Solar as a Partner. Help people switch to green energy and earn attractive commissions on every installation.
                            </p>
                            <div className="d-flex gap-3 animate__animated animate__fadeInUp animate__delay-2s">
                                <Button as={Link} to="/signup" variant="warning" size="lg" className="fw-bold px-4 rounded-pill">
                                    Join Our Squad
                                </Button>
                                <Button href="#how-it-works" variant="outline-light" size="lg" className="fw-bold px-4 rounded-pill">
                                    How It Works
                                </Button>
                            </div>
                        </Col>
                        {/* You could add a hero image here on the right side if available */}
                    </Row>
                </Container>
            </div>

            {/* === Why Join Us Section === */}
            <AnimatedSection className="py-5 section-bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="section-title fw-bold">Why Become a <span className="text-highlight-green">Sun Squad Partner?</span></h2>
                        <p className="text-muted fs-5">Empower your career while empowering the planet.</p>
                    </div>

                    <Row className="g-4">
                        <Col md={4}>
                            <Card className="h-100 feature-card text-center p-4 border-0 shadow-sm hover-lift">
                                <div className="icon-wrapper mx-auto mb-3 bg-soft-success text-success rounded-circle d-flex align-items-center justify-content-center" style={{width: '70px', height: '70px', fontSize: '1.8rem'}}>
                                    <i className="fa-solid fa-sack-dollar"></i>
                                </div>
                                <Card.Title as="h4" className="fw-bold">High Earning Potential</Card.Title>
                                <Card.Text className="text-muted">
                                    Earn industry-leading commissions on every successful solar installation you refer. The sky is the limit for your income.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 feature-card text-center p-4 border-0 shadow-sm hover-lift">
                                <div className="icon-wrapper mx-auto mb-3 bg-soft-primary text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '70px', height: '70px', fontSize: '1.8rem'}}>
                                    <i className="fa-solid fa-briefcase"></i>
                                </div>
                                <Card.Title as="h4" className="fw-bold">Zero Investment Business</Card.Title>
                                <Card.Text className="text-muted">
                                    Start your own solar business with zero capital. We handle the inventory, installation, and support. You just focus on networking.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 feature-card text-center p-4 border-0 shadow-sm hover-lift">
                                <div className="icon-wrapper mx-auto mb-3 bg-soft-warning text-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '70px', height: '70px', fontSize: '1.8rem'}}>
                                    <i className="fa-solid fa-chalkboard-user"></i>
                                </div>
                                <Card.Title as="h4" className="fw-bold">Expert Training & Support</Card.Title>
                                <Card.Text className="text-muted">
                                    Don't know solar? No problem. We provide comprehensive training on solar technology, sales pitches, and technical queries.
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </AnimatedSection>

            {/* === How It Works Section === */}
            <AnimatedSection id="how-it-works" className="py-5 bg-white">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="section-title fw-bold">How It <span className="text-highlight-green">Works</span></h2>
                    </div>

                    <div className="process-timeline position-relative">
                        <div className="timeline-line d-none d-md-block"></div>
                        
                        <Row className="g-5">
                            <Col md={3} className="text-center position-relative">
                                <div className="step-circle bg-success text-white mx-auto d-flex align-items-center justify-content-center mb-3 fw-bold fs-3 rounded-circle shadow">1</div>
                                <h5 className="fw-bold">Register</h5>
                                <p className="text-muted small">Sign up as a partner on our platform. It's free and takes 2 minutes.</p>
                            </Col>
                             <Col md={3} className="text-center position-relative">
                                <div className="step-circle bg-success text-white mx-auto d-flex align-items-center justify-content-center mb-3 fw-bold fs-3 rounded-circle shadow">2</div>
                                <h5 className="fw-bold">Learn</h5>
                                <p className="text-muted small">Access our training materials and understand the solar products.</p>
                            </Col>
                             <Col md={3} className="text-center position-relative">
                                <div className="step-circle bg-success text-white mx-auto d-flex align-items-center justify-content-center mb-3 fw-bold fs-3 rounded-circle shadow">3</div>
                                <h5 className="fw-bold">Refer</h5>
                                <p className="text-muted small">Connect with homeowners/businesses interested in solar and submit leads.</p>
                            </Col>
                             <Col md={3} className="text-center position-relative">
                                <div className="step-circle bg-success text-white mx-auto d-flex align-items-center justify-content-center mb-3 fw-bold fs-3 rounded-circle shadow">4</div>
                                <h5 className="fw-bold">Earn</h5>
                                <p className="text-muted small">Get paid directly to your bank account once the installation is complete.</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </AnimatedSection>

            {/* === FAQ for Partners === */}
            <AnimatedSection className="py-5 section-bg-light">
                <Container>
                     <div className="text-center mb-5">
                        <h2 className="section-title fw-bold">Partner <span className="text-highlight-green">FAQs</span></h2>
                    </div>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Accordion className="custom-accordion">
                                <Accordion.Item eventKey="0" className="mb-3 border-0 shadow-sm rounded-3">
                                    <Accordion.Header>Do I need technical knowledge to join?</Accordion.Header>
                                    <Accordion.Body>
                                        No prior technical knowledge is required. We provide all the necessary training to help you understand the basics of solar energy and how to explain it to customers.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className="mb-3 border-0 shadow-sm rounded-3">
                                    <Accordion.Header>Is there any registration fee?</Accordion.Header>
                                    <Accordion.Body>
                                        No, joining the Sun Squad Solar partner program is completely free. There are no hidden charges or investment required to start.
                                    </Accordion.Body>
                                </Accordion.Item>
                                 <Accordion.Item eventKey="2" className="mb-3 border-0 shadow-sm rounded-3">
                                    <Accordion.Header>When do I get paid?</Accordion.Header>
                                    <Accordion.Body>
                                        Commissions are processed and transferred to your registered bank account once the customer's solar installation is successfully completed and payment is received.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </AnimatedSection>            

            {/* === Call to Action === */}
            <AnimatedSection className="py-5 bg-dark text-white text-center cta-section">
                <Container>
                    <h2 className="fw-bold mb-3">Ready to Start Your Journey?</h2>
                    <p className="lead mb-4 text-white-50">Join hundreds of successful partners transforming the energy landscape of India.</p>
                    <Button as={Link} to="/signup" variant="success" size="lg" className="rounded-pill px-5 py-3 fw-bold shadow-lg partner-cta-btn">
                        Become a Partner Now
                    </Button>
                </Container>
            </AnimatedSection>

        </div>
    );
};

export default BecomePartnerPage;
