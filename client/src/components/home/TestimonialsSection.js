import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AnimatedSection from '../common/AnimatedSection';

// Import placeholder images (using available images for demo)
import avatar1 from '../../assets/images/user-avatar.png'; 
import avatar2 from '../../assets/images/user-avatar.png';
import avatar3 from '../../assets/images/user-avatar.png';
import avatar4 from '../../assets/images/user-avatar.png';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Sigra, Varanasi',
    image: avatar1,
    rating: 5,
    quote: "Sun Squad Solar transformed our home's energy consumption completely. The installation was seamless, and we're already seeing 65% reduction in our electricity bills. The team was professional and the after-sales support is excellent!",
    saved: '₹4.2L Saved',
    system: '6kW System',
    icon: 'fa-check'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Rajatalab, Varanasi',
    image: avatar2,
    rating: 5,
    quote: "As a Customer, ROI is crucial. Sun Squad Solar delivered beyond expectations with their commercial solar solution. Professional installation, transparent pricing, and the monitoring system helps us track our savings in real-time.",
    saved: '₹7.8L Saved',
    system: '10kW System',
    icon: 'fa-bookmark'
  },
  {
    id: 3,
    name: 'Dr. Amit Patil',
    role: 'School, Mirzapur',
    image: avatar3,
    rating: 5,
    quote: "Installing solar at our school was the best decision. Not only are we saving significantly on electricity costs, but we're also teaching our students about renewable energy. Sun Squad Solar made the entire process educational and engaging.",
    saved: '₹8L Saved',
    system: '8kW System',
    icon: 'fa-share'
  },
  {
    id: 4,
    name: 'Aarav Kulkarni',
    role: 'Society Secretary, Varanasi',
    image: avatar4,
    rating: 5,
    quote: "Managing a 10+ flat society's energy needs was challenging until Sun Squad Solar installed our solar system. The residents are thrilled with the reduced maintenance charges and the society is now energy independent during peak hours.",
    saved: '₹15L Saved',
    system: '15kW System',
    icon: 'fa-user'
  },
  {
    id: 5,
    name: 'Sunita Joshi',
    role: 'Retired Teacher, Mugalsarai',
    image: avatar2,
    rating: 5,
    quote: "At my age, I was skeptical about solar technology, but Sun Squad Solar's team explained everything clearly. The installation was quick, and now I barely have any electricity bills. It's wonderful to contribute to a cleaner environment too!",
    saved: '₹2.8L Saved',
    system: '4kW System',
    icon: 'fa-heart'
  },
  {
    id: 6,
    name: 'Vikram Industries',
    role: 'Manufacturing, Bhadohi',
    image: avatar1,
    rating: 5,
    quote: "Sun Squad Solar handled our large-scale industrial installation with remarkable expertise. The system performance exceeds projections, and the energy cost savings have significantly improved our bottom line. Highly recommended for industrial applications.",
    saved: '₹8.5L Saved',
    system: '10kW System',
    icon: 'fa-industry'
  }
];

const TestimonialsSection = () => {
  return (
    <AnimatedSection className="testimonials-section-new py-5">
      <Container>
        <div className="text-center mb-5">
          <div className="badge-pill-green mb-3">
            <i className="fa-solid fa-star me-2"></i> Customer Testimonials
          </div>
          <h2 className="display-4 fw-bold text-dark-green mb-2">Voices of Trust</h2>
          <h2 className="display-4 fw-bold mb-4">
            <span className="text-orange">Real Stories</span>, <span className="text-green">Real Savings</span>
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Don't just take our word for it. Hear from our satisfied customers who have transformed their energy consumption and are enjoying significant savings with Sun Squad Solar solutions.
          </p>
        </div>

        <Row className="g-4">
          {testimonials.map((item) => (
            <Col lg={4} md={6} key={item.id}>
              <Card className="testimonial-card-new h-100 border-0">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-4">
                    <div className="profile-img-wrapper position-relative me-3">
                      <img src={item.image} alt={item.name} className="profile-img rounded-3" />
                      <div className="profile-icon-badge">
                        <i className={`fa-solid ${item.icon}`}></i>
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1 text-dark-green">{item.name}</h5>
                      <small className="text-muted">{item.role}</small>
                      <div className="text-warning mt-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star small me-1"></i>
                        ))}
                        <small className="text-muted ms-1">{item.rating}.0</small>
                      </div>
                    </div>
                  </div>
                  
                  <Card.Text className="text-muted mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>
                    "{item.quote}"
                  </Card.Text>
                  
                  <div className="testimonial-footer pt-3 border-top d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-green fw-bold">
                      <i className="fa-solid fa-circle small me-2" style={{ fontSize: '8px' }}></i>
                      {item.saved}
                    </div>
                    <div className="text-muted small">
                      {item.system}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </AnimatedSection>
  );
};

export default TestimonialsSection;
