import React from 'react';
import { Link } from 'react-router-dom';
// Import all the Bootstrap components we will use throughout the page
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';

// --- Import your images ---
import sliderImg1 from '../../assets/images/hero-slider-1.jpg';
import sliderImg2 from '../../assets/images/hero-slider-2.jpg';
import sliderImg3 from '../../assets/images/hero-slider-3.jpg';
import teamAbhishek from '../../assets/images/team-abhishek.jpg';
import teamShivam from '../../assets/images/team-shivam.jpg';

const HomePage = () => {
  return (
    <>
      {/* === Carousel Section (Already Responsive) === */}
      <Carousel fade>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={sliderImg1} alt="First slide" style={{ height: '85vh', objectFit: 'cover' }} />
          <Carousel.Caption className="d-none d-md-block"> {/* Hide caption on small screens */}
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

      {/* === About Us Section === */}
      <section className="about-us py-5 bg-light">
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
               <p>
              Sun Squad Solar is a leading renewable energy company in India. We provide system integration support for turn-key projects. We assist in building customised systems from multiple sources which have been garnered from our expertise. As our firm name suggests, our priority relies in providing alternate power solutions at affordable prices.
            </p>
                <p>* On-time at services<br />* Verified professionals</p>
                <Button as={Link} to="/about" variant="success" size="lg">Learn More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* === Customer Priority Section === */}
      <section className="priority-section py-5">
        <Container>
          <Row className="align-items-center g-lg-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="priority-content">
                <h2 className="section-title">WE ALWAYS PROVIDE PRIORITY TO OUR CUSTOMER</h2>
                <p>The reason why Sun Squad Solar has been able to achieve such steep success...</p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="priority-features">
                <div className="feature-item"><div className="feature-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div><div className="feature-text"><h3>Low Cost</h3><p>Designing, developing and managing solar properties at affordable prices.</p></div></div>
                <div className="feature-item"><div className="feature-icon"><i className="fa-solid fa-store"></i></div><div className="feature-text"><h3>Good Marketing</h3><p>Preparing studies and providing consultations regarding solar uses and sales.</p></div></div>
                <div className="feature-item"><div className="feature-icon"><i className="fa-solid fa-handshake"></i></div><div className="feature-text"><h3>Reliable</h3><p>To be an optimum business template for the solar Industry.</p></div></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* === Values & Vision Section === */}
      <section className="values-section py-5 bg-light">
        <Container>
            <Row className="g-4">
                <Col xs={12} lg={3}><Card className="h-100 text-white" style={{ backgroundColor: '#33A1E0' }}><Card.Body className="d-flex flex-column"><Card.Title as="h3">Why Choose Us</Card.Title><Card.Text>Sun Squad Solar. We use a combination of both online and offline marketing...</Card.Text><Button as={Link} to="/about" variant="outline-light" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
                <Col xs={12} md={4} lg={3}><Card className="h-100 text-center shadow-sm"><Card.Body className="d-flex flex-column"><div className="value-icon"><i className="fa-solid fa-eye"></i></div><Card.Title as="h3">Our Vision</Card.Title><Card.Text>Promoting renewable energy adoption, and ensuring a cleaner, greener, and brighter future...</Card.Text><Button as={Link} to="/about" variant="outline-primary" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
                <Col xs={12} md={4} lg={3}><Card className="h-100 text-center shadow-sm"><Card.Body className="d-flex flex-column"><div className="value-icon"><i className="fa-solid fa-bullseye"></i></div><Card.Title as="h3">Our Mission</Card.Title><Card.Text>We Mission to offer added value to our customers by providing a "whole of life" client support...</Card.Text><Button as={Link} to="/about" variant="outline-primary" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
                <Col xs={12} md={4} lg={3}><Card className="h-100 text-center shadow-sm"><Card.Body className="d-flex flex-column"><div className="value-icon"><i className="fa-solid fa-people-group"></i></div><Card.Title as="h3">Our Strategy</Card.Title><Card.Text>Manufacturing specialized solar accessories like brackets and junction boxes...</Card.Text><Button as={Link} to="/about" variant="outline-primary" className="mt-auto">Learn More</Button></Card.Body></Card></Col>
            </Row>
        </Container>
      </section>

      {/* === Team Member Section === */}
      <section className="team-section py-5">
        <Container className="text-center">
          <h2 className="section-title">Our Team Member</h2>
          <div className="title-underline"></div>
          <Row className="justify-content-center g-4">
            <Col sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm"><Card.Img variant="top" src={teamAbhishek} /><Card.Body><Card.Title as="h3" className="fs-5">MR. ABHISHEK MAURYA</Card.Title><Card.Text className="fw-bold">Owner</Card.Text></Card.Body></Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm"><Card.Img variant="top" src={teamShivam} /><Card.Body><Card.Title as="h3" className="fs-5">MR. SHIVAM MAURYA</Card.Title><Card.Text className="fw-bold">Operation Head</Card.Text></Card.Body></Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* === Statistics Section === */}
      <section className="stats-section py-5 bg-light">
          <Container>
              <Row className="g-4 text-center">
                  <Col md={4}><div className="stat-card p-4"><div className="stat-icon"><i className="fa-regular fa-user"></i></div><span className="stat-number">1000+</span><p className="stat-label">Our Customer</p></div></Col>
                  <Col md={4}><div className="stat-card p-4"><div className="stat-icon"><i className="fa-solid fa-warehouse"></i></div><span className="stat-number">2+</span><p className="stat-label">Our Branch</p></div></Col>
                  <Col md={4}><div className="stat-card p-4"><div className="stat-icon"><i className="fa-solid fa-people-roof"></i></div><span className="stat-number">100+</span><p className="stat-label">Our Agent</p></div></Col>
              </Row>
          </Container>
      </section>

      {/* === Amenities Section === */}
      <section className="amenities-section py-5">
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
      </section>

      {/* === Testimonials Section === */}
      <section className="testimonials-section py-5 bg-light">
          <Container className="text-center">
              <h2 className="section-title">What Our Customer Says</h2>
              <div className="title-underline"></div>
              <Row className="justify-content-center g-4 mt-3">
                  <Col lg={5}>
                      <Card className="testimonial-card shadow-sm"><Card.Body><Card.Title as="h4">Mr. Jatin Singh</Card.Title><Card.Text className="testimonial-quote">Ever since I got the solar installed, the tension regarding the electricity bill has ended...</Card.Text></Card.Body></Card>
                  </Col>
                  <Col lg={5}>
                      <Card className="testimonial-card shadow-sm"><Card.Body><Card.Title as="h4">Mr. Suresh</Card.Title><Card.Text className="testimonial-quote">From the initial installation to the final installation, the staff was extremely helpful and professional...</Card.Text></Card.Body></Card>
                  </Col>
              </Row>
          </Container>
      </section>
    </>
  );
};

export default HomePage;