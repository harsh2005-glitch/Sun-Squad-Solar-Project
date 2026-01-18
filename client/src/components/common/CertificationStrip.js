import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CertificationStrip.css';

// Placeholder or real icons. 
// Ideally you would import images like:
// import isoLogo from '../../assets/images/cert/iso.png';

const CertificationStrip = () => {
    return (
        <div className="certification-strip-wrapper">
            <Container>
                <div className="cert-strip-inner">
                    <Row className="align-items-center justify-content-center g-4 text-center">
                         <Col xs={4} md={2} className="cert-item">
                            <div className="cert-icon">
                                <i className="fa-solid fa-certificate"></i>
                            </div>
                            <span className="cert-text">ISO 9001:2015<br/>Certified</span>
                        </Col>
                        {/* Divider */}
                        <Col xs="auto" className="d-none d-md-block"><div className="cert-divider"></div></Col>

                        <Col xs={4} md={2} className="cert-item">
                            <div className="cert-icon">
                                <i className="fa-solid fa-solar-panel"></i>
                            </div>
                            <span className="cert-text">MNRE<br/>Approved</span>
                        </Col>
                         {/* Divider */}
                         <Col xs="auto" className="d-none d-md-block"><div className="cert-divider"></div></Col>

                        <Col xs={4} md={2} className="cert-item">
                            <div className="cert-icon">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>
                            <span className="cert-text">BIS<br/>Standards</span>
                        </Col>
                         {/* Divider */}
                         <Col xs="auto" className="d-none d-md-block"><div className="cert-divider"></div></Col>

                        <Col xs={4} md={2} className="cert-item">
                            <div className="cert-icon">
                                <i className="fa-solid fa-award"></i>
                            </div>
                            <span className="cert-text">Tier-1<br/>Partners</span>
                        </Col>
                         {/* Divider */}
                         <Col xs="auto" className="d-none d-md-block"><div className="cert-divider"></div></Col>

                        <Col xs={4} md={2} className="cert-item">
                            <div className="cert-icon">
                                <i className="fa-solid fa-leaf"></i>
                            </div>
                            <span className="cert-text">Green Energy<br/>Leader</span>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default CertificationStrip;
