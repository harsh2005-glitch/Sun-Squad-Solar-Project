import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/common/AnimatedSection';
import './SolarCalculatorPage.css';

const SolarCalculatorPage = () => {
    const [monthlyBill, setMonthlyBill] = useState('');
    const [results, setResults] = useState(null);

    const calculateSavings = (e) => {
        e.preventDefault();
        const bill = parseFloat(monthlyBill);

        if (isNaN(bill) || bill <= 0) {
            alert("Please enter a valid monthly bill amount.");
            return;
        }

        // Assumptions
        const avgUnitRate = 8; // Rs per unit
        const unitsPerKWPerMonth = 120; // 1kW generates ~120 units/month
        const carbonFactor = 0.82; // kg CO2 per kWh
        
        const monthlyUnits = bill / avgUnitRate;
        const requiredSystemSize = monthlyUnits / unitsPerKWPerMonth;
        
        // Rounding to nearest 0.5 kW for practical sizing, min 1kW
        let recommendedSize = Math.ceil(requiredSystemSize * 2) / 2;
        if (recommendedSize < 1) recommendedSize = 1;

        const annualGeneraton = recommendedSize * unitsPerKWPerMonth * 12;
        const annualSavings = annualGeneraton * avgUnitRate;
        const carbonReduction = (annualGeneraton * carbonFactor) / 1000; // in Tonnes

        const treesPlanted = Math.round(carbonReduction * 45); // Approx 45 trees absorb 1 tonne CO2

        setResults({
            recommendedSize: recommendedSize.toFixed(1),
            annualSavings: Math.round(annualSavings).toLocaleString('en-IN'),
            monthlySavings: Math.round(annualSavings / 12).toLocaleString('en-IN'),
            carbonReduction: carbonReduction.toFixed(2),
            treesPlanted: treesPlanted,
            roiYears: (recommendedSize * 60000 / annualSavings).toFixed(1) // Approx cost 60k/kW
        });
    };

    return (
        <div className="calculator-page pt-5 pb-5">
            <Container>
                <div className="text-center mb-5 mt-5">
                    <h1 className="fw-bold display-5">Solar Savings <span className="text-warning">Calculator</span></h1>
                    <p className="lead text-muted">See how much you can save by switching to solar.</p>
                </div>

                <Row className="justify-content-center">
                    <Col lg={10} xl={8}>
                        <Card className="border-0 shadow-lg overflow-hidden calculator-card">
                            <Row className="g-0">
                                <Col md={6} className="bg-white p-4 p-md-5">
                                    <h4 className="fw-bold mb-4">Enter Your Details</h4>
                                    <Form onSubmit={calculateSavings}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-bold text-muted small text-uppercase">Average Monthly Electricity Bill (₹)</Form.Label>
                                            <InputGroup size="lg">
                                                <InputGroup.Text className="bg-light border-end-0 fw-bold">₹</InputGroup.Text>
                                                <Form.Control 
                                                    type="number" 
                                                    placeholder="e.g. 2500" 
                                                    className="border-start-0 bg-light"
                                                    value={monthlyBill}
                                                    onChange={(e) => setMonthlyBill(e.target.value)}
                                                    required
                                                />
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Enter your average bill amount for accurate estimation.
                                            </Form.Text>
                                        </Form.Group>

                                      {/* Future inputs like State, Roof Area could go here */}

                                        <div className="d-grid">
                                            <Button variant="success" size="lg" type="submit" className="fw-bold text-uppercase py-3">
                                                Calculate Savings
                                            </Button>
                                        </div>
                                    </Form>

                                    {results && (
                                         <div className="mt-4 text-center">
                                             <p className="small text-muted mb-2">Ready to start saving?</p>
                                             <Button as={Link} to="/contact" variant="outline-dark" className="w-100 fw-bold">Request a Detailed Quote</Button>
                                         </div>
                                    )}
                                </Col>

                                <Col md={6} className="bg-success text-white p-4 p-md-5 d-flex flex-column justify-content-center position-relative overflow-hidden result-panel">
                                    {!results ? (
                                        <div className="text-center opacity-75">
                                            <i className="fa-solid fa-calculator display-1 mb-3"></i>
                                            <h3>Your Savings Await!</h3>
                                            <p>Enter your bill amount to see your potential solar savings and environmental impact.</p>
                                        </div>
                                    ) : (
                                        <div className="results-content animate__animated animate__fadeIn">
                                            <div className="mb-4 text-center">
                                                <span className="text-white-50 text-uppercase small fw-bold tracking-wider">Estimated Annual Savings</span>
                                                <div className="display-4 fw-bold">₹{results.annualSavings}</div>
                                            </div>

                                            <div className="row g-3 mb-4">
                                                <div className="col-6">
                                                    <div className="p-3 bg-white bg-opacity-10 rounded-3 text-center h-100">
                                                        <i className="fa-solid fa-solar-panel mb-2 fs-4"></i>
                                                        <div className="fw-bold fs-5">{results.recommendedSize} kW</div>
                                                        <div className="small text-white-50">System Size</div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                     <div className="p-3 bg-white bg-opacity-10 rounded-3 text-center h-100">
                                                        <i className="fa-solid fa-chart-line mb-2 fs-4"></i>
                                                        <div className="fw-bold fs-5">{results.roiYears} Yrs</div>
                                                        <div className="small text-white-50">Payback Period</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="environmental-impact pt-3 border-top border-white border-opacity-25">
                                                <h6 className="fw-bold mb-3"><i className="fa-solid fa-earth-americas me-2"></i>Environmental Impact</h6>
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="me-2 fs-5">🌿</span>
                                                    <span><strong>{results.treesPlanted}</strong> Trees Planted</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2 fs-5">☁️</span>
                                                    <span><strong>{results.carbonReduction}</strong> Tonnes CO₂ Saved/Yr</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Abstract Circles for design */}
                                    <div className="circle-1"></div>
                                    <div className="circle-2"></div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            <AnimatedSection className="mt-5 py-5 section-bg">
                <Container className="text-center">
                    <h3 className="fw-bold mb-3">Not sure about specific details?</h3>
                    <p className="lead text-muted mb-4">Our experts can perform a detailed site survey to give you an exact quote.</p>
                    <div className="d-flex justify-content-center gap-3">
                         <Button as={Link} to="/contact" variant="primary" size="lg" className="rounded-pill px-5">Book Free Site Survey</Button>
                         <Button href="tel:+916306693936" variant="outline-dark" size="lg" className="rounded-pill px-5"><i className="fa-solid fa-phone me-2"></i>Call Expert</Button>
                    </div>
                </Container>
            </AnimatedSection>
        </div>
    );
};

export default SolarCalculatorPage;
