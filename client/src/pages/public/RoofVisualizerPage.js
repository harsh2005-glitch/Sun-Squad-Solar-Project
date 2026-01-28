import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/RoofVisualizer.css';

const RoofVisualizerPage = () => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('search'); // search, analyzing, results
    const [progress, setProgress] = useState(0);

    const handleSearch = (e) => {
        e.preventDefault();
        if(!address) return;

        setStep('analyzing');
        setLoading(true);

        // Simulate Analysis Process
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
                setLoading(false);
                setStep('results');
            }
        }, 300); // 3 seconds total
    };

    return (
        <div className="roof-visualizer-page">
            {/* Hero / Search Section */}
            <div className="visualizer-hero">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <h1 className="display-4 fw-bold text-white mb-3">
                                See Your Roof's <span className="text-warning">Solar Potential</span>
                            </h1>
                            <p className="lead text-white-50 mb-5">
                                Our AI-powered tool analyzes your roof's sunlight exposure to estimate your savings.
                            </p>

                            {step === 'search' && (
                                <Card className="border-0 shadow-lg p-4 search-card">
                                    <Form onSubmit={handleSearch}>
                                        <div className="d-flex gap-2">
                                            <Form.Control 
                                                size="lg" 
                                                type="text" 
                                                placeholder="Enter your street address..." 
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="border-0 bg-light"
                                            />
                                            <Button variant="success" size="lg" type="submit" className="px-4 fw-bold">
                                                Analyze <i className="fa-solid fa-arrow-right ms-2"></i>
                                            </Button>
                                        </div>
                                    </Form>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Analysis Loading State */}
            {step === 'analyzing' && (
                <Container className="py-5 text-center">
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <div className="mb-4">
                                <i className="fa-solid fa-satellite-dish fa-spin fa-3x text-primary mb-3"></i>
                                <h3>Scanning Satellite Data...</h3>
                                <p className="text-muted">Analyzing roof geometry and sun position for: <strong>{address}</strong></p>
                            </div>
                            <ProgressBar animated now={progress} variant="success" className="mb-2" style={{height: '10px'}} />
                            <small className="text-muted">{progress}% Complete</small>
                        </Col>
                    </Row>
                </Container>
            )}

            {/* Simulated Results State */}
            {step === 'results' && (
                <Container className="py-5 animate-fade-in">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                             <h2 className="fw-bold mb-1">Solar Analysis Report</h2>
                             <p className="text-muted mb-0"><i className="fa-solid fa-location-dot me-2 text-primary"></i>{address}</p>
                        </div>
                        <Button variant="outline-dark" onClick={() => {setStep('search'); setAddress(''); setProgress(0);}}>New Search</Button>
                    </div>

                    <Row className="g-4 mb-5">
                        <Col lg={8}>
                            {/* Simulated Map View */}
                            <div className="map-placeholder-container position-relative rounded-4 overflow-hidden shadow-sm mb-4">
                                <iframe 
                                    width="100%" 
                                    height="450" 
                                    frameBorder="0" 
                                    scrolling="no" 
                                    marginHeight="0" 
                                    marginWidth="0" 
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=k&z=19&ie=UTF8&iwloc=&output=embed`}
                                    title="Satellite View"
                                ></iframe>
                                <div className="overlay-analysis position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center pointer-events-none">
                                    <div className="analysis-grid"></div>
                                </div>
                                <div className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 fw-bold">
                                    <i className="fa-regular fa-sun"></i> High Solar Potential
                                </div>
                            </div>
                        </Col>
                        
                        <Col lg={4}>
                            <Card className="border-0 shadow-sm h-100 bg-dark text-white result-card-gradient">
                                <Card.Body className="p-4 d-flex flex-column">
                                    <div className="mb-4 text-center">
                                        <h5 className="text-white-50 text-uppercase letter-spacing-1">Est. Annual Savings</h5>
                                        <h1 className="display-4 fw-bold text-success mb-0">₹82,500</h1>
                                        <small className="text-white-50">Based on standard usage</small>
                                    </div>

                                    <div className="specs-list flex-grow-1">
                                         <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                                            <span><i className="fa-solid fa-maximize me-2"></i>Usable Roof Area</span>
                                            <span className="fw-bold">450 sq.ft</span>
                                         </div>
                                         <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                                            <span><i className="fa-solid fa-bolt me-2"></i>Recommended System</span>
                                            <span className="fw-bold">5.2 kW</span>
                                         </div>
                                         <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                                            <span><i className="fa-solid fa-leaf me-2"></i>CO2 Offset</span>
                                            <span className="fw-bold">4.1 Tons/yr</span>
                                         </div>
                                    </div>

                                    <Button as={Link} to="/contact" variant="success" size="lg" className="w-100 fw-bold mt-3">
                                        Get Official Quote
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default RoofVisualizerPage;
