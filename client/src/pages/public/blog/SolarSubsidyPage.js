import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SolarSubsidyPage = () => {
    return (
        <div style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm p-4">
                            <Card.Body>
                                <div className="text-success fw-bold mb-2">UPDATED 2025</div>
                                <h1 className="fw-bold mb-4">Solar Subsidy in UP/India 2025</h1>
                                
                                <h5 className="fw-bold mt-4">PM Surya Ghar: Muft Bijli Yojana</h5>
                                <p>
                                    The Government of India has launched the 'PM Surya Ghar: Muft Bijli Yojana' to promote rooftop solar installations in residential households. Under this scheme, households can get subsidies for installing solar panels on their roofs.
                                    The scheme aims to provide free electricity up to 300 units per month for 1 crore households.
                                </p>

                                <h5 className="fw-bold mt-4">Central Financial Assistance (Subsidy) Structure</h5>
                                <p>The subsidy structure is as follows:</p>
                                <ul>
                                    <li>For systems up to 2 kW: Rs. 90,000 per kW.</li>
                                    {/* <li>For systems between 2 kW and 3 kW: Rs. 30,000 for the first 2 kW + Rs. 18,000 for the additional kW.</li> */}
                                    <li>For systems above 3 kW: Total subsidy is capped at Rs. 108,000.</li>
                                </ul>

                                <h5 className="fw-bold mt-4">Uttar Pradesh State Subsidy</h5>
                                <p>
                                    In addition to the Central Subsidy, the Uttar Pradesh government provides an additional state subsidy (often referred to as 'Surcharge').
                                    This can be around Rs. 15,000 per kW (up to a certain limit like 3kW), which further reduces the net cost for the consumer.
                                    (Note: State policies are subject to updates, so it's always good to check the official UPNEDA website or consult with our experts).
                                </p>

                                <h5 className="fw-bold mt-4">How to Apply?</h5>
                                <p>
                                    The application process is now streamlined through the National Portal for Rooftop Solar.
                                    1. Register on the portal.
                                    2. Submit your application.
                                    3. Get feasibility approval from your DISCOM.
                                    4. Install the system through a registered vendor like Sun Squad Solar.
                                    5. Submit installation details and apply for net metering.
                                    6. Once commissioned, the subsidy is released directly to your bank account within 30 days.
                                </p>
                                
                                <p className="mt-5 text-muted fst-italic">
                                    Disclaimer: Subsidy rates and policies are subject to change by the government. Please contact Sun Squad Solar for the most current information and assistance with your application.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SolarSubsidyPage;
