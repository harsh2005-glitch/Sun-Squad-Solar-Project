import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const MaintenanceTipsPage = () => {
    return (
        <div style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm p-4">
                            <Card.Body>
                                <div className="text-info fw-bold mb-2">MAINTENANCE</div>
                                <h1 className="fw-bold mb-4">Solar Maintenance Tips: Keep Your System Sparkling</h1>
                                
                                <p className="lead">
                                    Solar panels are generally low maintenance, but a little care goes a long way in ensuring they operate at maximum efficiency for their 25+ year lifespan. Here are some essential tips.
                                </p>

                                <div className="mt-5">
                                    <h4 className="fw-bold text-dark"><i className="fa-solid fa-broom me-2 text-primary"></i>1. Keep Panels Clean</h4>
                                    <p>
                                        Dust, dirt, bird droppings, and pollen can accumulate on the glass surface of your panels, blocking sunlight and reducing efficiency by 5-15%.
                                    </p>
                                    <ul>
                                        <li><strong>How often?</strong> Clean them 2-4 times a year, or more frequently if you live in a dusty area.</li>
                                        <li><strong>How?</strong> Use a soft sponge or cloth with mild soapy water. Avoid abrasive materials that scratches the glass. A garden hose sprayer works well for loose dust.</li>
                                        <li><strong>Safety First:</strong> If your roof is high or steep, hire a professional service rather than risking a fall.</li>
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <h4 className="fw-bold text-dark"><i className="fa-solid fa-tree me-2 text-success"></i>2. Monitor Potential Shading</h4>
                                    <p>
                                        Trees grow! A sapling that wasn't a problem 5 years ago might now be casting a shadow on your array during peak sun hours.
                                    </p>
                                    <ul>
                                        <li>Check for new shading from nearby trees or new construction annually.</li>
                                        <li>Trim overhanging branches to keep the path to the sun clear.</li>
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <h4 className="fw-bold text-dark"><i className="fa-solid fa-laptop-medical me-2 text-info"></i>3. Check Inverter Display</h4>
                                    <p>
                                        Your inverter is the brain of the system.
                                    </p>
                                    <ul>
                                        <li>Glance at the inverter display or its LED indicators occasionally.</li>
                                        <li>Look for any red lights or error codes.</li>
                                        <li>Confirm that it shows the system is "Generating" or "Online" during the day.</li>
                                    </ul>
                                </div>

                                <div className="mt-4">
                                    <h4 className="fw-bold text-dark"><i className="fa-solid fa-clipboard-check me-2 text-warning"></i>4. Professional Inspection</h4>
                                    <p>
                                        It's a good idea to have a professional inspection every 3-5 years.
                                    </p>
                                    <ul>
                                        <li>They checking electrical connections for tightness and corrosion.</li>
                                        <li>Inspect the mounting hardware ensuring panels are secure.</li>
                                        <li>Verify voltage and current readings are within expected ranges.</li>
                                    </ul>
                                </div>

                                <p className="mt-5 border-top pt-4">
                                    <strong>Need Help?</strong> Sun Squad Solar offers Annual Maintenance Contracts (AMC) to take all the hassle off your hands. Contact us today to learn more!
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MaintenanceTipsPage;
