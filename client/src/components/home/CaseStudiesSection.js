import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import BeforeAfterSlider from '../common/BeforeAfterSlider';
import './CaseStudiesSection.css';

// Import existing images for demo purposes
// In a real app, these would be matched pairs of "Roof Empty" vs "Roof Solar"
import rwa1 from '../../assets/images/gallery/residential-home-1.jpg'; 
import commercial1 from '../../assets/images/gallery/commercial-roof-1.jpg';

const caseStudies = [
    {
        id: 1,
        title: "Green Valley Residential Complex",
        location: "Lucknow, Uttar Pradesh",
        systemSize: "150 kW",
        savings: "₹18,00,000",
        roi: "3.2 Years",
        co2: "120 Tons",
        beforeImg: rwa1, // Placeholder: recycling existing gallery image
        afterImg: commercial1, // Placeholder: recycling existing gallery image
        description: "A complete transformation of a 50-unit residential society. The idle rooftop space was converted into a solar power plant that now powers all common areas and elevators."
    }
];

const CaseStudiesSection = () => {
    const [activeCase] = useState(caseStudies[0]);

    return (
        <section className="case-studies-section py-5">
            <Container>
                <div className="text-center mb-5">
                    <Badge bg="success" className="mb-2 px-3 py-2 rounded-pill text-uppercase ls-1">Success Stories</Badge>
                    <h2 className="display-5 fw-bold text-dark">Real Results. <span className="text-success">Real Savings.</span></h2>
                    <p className="text-muted w-75 mx-auto">
                        See the tangible impact of switching to solar. Drag the slider to witness the transformation.
                    </p>
                </div>

                <Card className="border-0 shadow-lg overflow-hidden rounded-4">
                    <Row className="g-0">
                        <Col lg={8} className="position-relative">
                           <BeforeAfterSlider 
                                beforeImage="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2574&auto=format&fit=crop" // Generic Roof
                                afterImage="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2574&auto=format&fit=crop" // Same image for now, let's try to find a better pair or simulate
                                // Actually, let's use the sliderImg from homepage as a safe fallback if unsplash fails, but for a "Difference" we need distinct images.
                                // Let's use two unsplash images that look somewhat similar (Before/After vibe)
                                // Before: Empty Roof
                                // After: Solar Roof
                                // Since I can't browse the web for perfect matches, I'll use the placeholder logic.
                                // Better approach: Use one of the gallery images for 'After' and a blurred/grayscale version or different image for 'Before'.
                                // For the demo to look good immediately, I will use:
                                // Before: A clean roof stock photo
                                // After: A solar roof stock photo
                                altText="Rooftop Transformation"
                            />
                            {/* Overriding the props with better logical images for the purpose of the demo */}
                             <div className="absolute-slider-layer">
                                <BeforeAfterSlider 
                                    beforeImage="https://images.unsplash.com/photo-1623190823326-6d538e1a179e?q=80&w=2670&auto=format&fit=crop" /* Standard Roof */
                                    afterImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop" /* Solar Panels */
                                    altText="Solar Installation"
                                />
                             </div>
                        </Col>
                        <Col lg={4} className="bg-white">
                            <div className="p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                                <h3 className="fw-bold mb-1">{activeCase.title}</h3>
                                <div className="text-muted mb-4 small"><i className="fa-solid fa-location-dot me-2 text-warning"></i>{activeCase.location}</div>
                                
                                <p className="text-muted mb-4">
                                    {activeCase.description}
                                </p>

                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <div className="stat-label">Annual Savings</div>
                                        <div className="stat-value text-success">{activeCase.savings}</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">CO₂ Offset</div>
                                        <div className="stat-value text-info">{activeCase.co2}</div>
                                    </div>
                                    <div className="stat-item full-width">
                                        <div className="stat-label">ROI Period</div>
                                        <div className="stat-value text-dark">{activeCase.roi}</div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-top">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="d-block small text-muted text-uppercase fw-bold">System Size</span>
                                            <span className="h4 fw-bold mb-0">{activeCase.systemSize}</span>
                                        </div>
                                        <div className="text-end">
                                             <button className="btn btn-outline-dark rounded-pill fw-bold btn-sm">View Full Case Study</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </section>
    );
};

export default CaseStudiesSection;