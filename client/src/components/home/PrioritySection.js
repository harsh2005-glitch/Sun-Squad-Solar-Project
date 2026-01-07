import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AnimatedSection from '../common/AnimatedSection';

const PrioritySection = () => {
  return (
    <AnimatedSection className="priority-section py-5">
      <Container>
        <Row className="align-items-center g-lg-5">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="priority-content text-center text-lg-start">
              <h2 className="display-4 fw-bold text-dark-green mb-4">
                WE ALWAYS PROVIDE <br />
                PRIORITY TO OUR <br />
                CUSTOMER
              </h2>
              <p className="lead text-muted">
                The reason why Sun Squad Solar has been able to achieve such steep success is due to our diligence toward ensuring customer satisfaction in every way possible. Right from the selection of solar for our projects to our vast and growing network, we always ensure that the process is transparent and customer friendly.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="priority-features-list">
              
              {/* Feature 1 */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-circle">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                  </div>
                </div>
                <div className="feature-text-content">
                  <h3 className="h4 fw-bold text-dark-green">Low Cost</h3>
                  <p className="text-muted mb-0">Designing, developing and managing solar properties at affordable prices.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-circle">
                    <i className="fa-solid fa-store"></i>
                  </div>
                </div>
                <div className="feature-text-content">
                  <h3 className="h4 fw-bold text-dark-green">Good Marketing</h3>
                  <p className="text-muted mb-0">Preparing studies and providing consultations regarding solar uses and sales.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-circle">
                    <i className="fa-solid fa-handshake"></i>
                  </div>
                </div>
                <div className="feature-text-content">
                  <h3 className="h4 fw-bold text-dark-green">Reliable</h3>
                  <p className="text-muted mb-0">To be an optimum business template for the solar Industry.</p>
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </AnimatedSection>
  );
};

export default PrioritySection;
