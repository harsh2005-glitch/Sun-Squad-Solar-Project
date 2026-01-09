import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const GridVsOffGridPage = () => {
    return (
        <div style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="border-0 shadow-sm p-4">
                            <Card.Body>
                                <div className="text-warning fw-bold mb-2">GUIDE</div>
                                <h1 className="fw-bold mb-4">On-Grid vs Off-Grid Solar: Which is Right for You?</h1>
                                
                                <p className="lead mb-4">
                                    Choosing between an On-Grid and an Off-Grid solar system is one of the first and most important decisions you'll make when going solar. Both have their unique advantages and are suitable for different scenarios.
                                </p>

                                <h3 className="fw-bold mt-5 text-primary">1. On-Grid Solar System</h3>
                                <p>
                                    Also known as a Grid-Tied system. This is the most common type of solar system for homes and businesses in areas with reliable electricity supply.
                                </p>
                                <ul>
                                    <li><strong>How it works:</strong> Your solar panels generate electricity. If you generate more than you use, the excess is sent back to the public electricity grid (Net Metering). At night, you draw power from the grid.</li>
                                    <li><strong>Pros:</strong> Least expensive (no batteries), lower maintenance, you can earn credits for excess power sent to the grid.</li>
                                    <li><strong>Cons:</strong> It shuts down during a power cut for safety reasons (anti-islanding). You do not have backup power.</li>
                                    <li><strong>Best for:</strong> urban areas with rare power cuts where the goal is to reduce electricity bills.</li>
                                </ul>

                                <h3 className="fw-bold mt-5 text-success">2. Off-Grid Solar System</h3>
                                <p>
                                    This system is completely independent of the electricity grid. It relies on batteries to store energy for use at night or when the sun isn't shining.
                                </p>
                                <ul>
                                    <li><strong>How it works:</strong> Solar panels charge a battery bank. Your home draws power from these batteries through an inverter.</li>
                                    <li><strong>Pros:</strong> Complete energy independence, works during power cuts (provides backup).</li>
                                    <li><strong>Cons:</strong> More expensive due to battery cost, batteries need replacement every few years (5-10 years), system sizing is critical.</li>
                                    <li><strong>Best for:</strong> Remote areas with no grid access, or areas with frequent and long power cuts.</li>
                                </ul>

                                <h3 className="fw-bold mt-5 text-info">Comparison Table</h3>
                                <Table striped bordered hover responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Feature</th>
                                            <th>On-Grid</th>
                                            <th>Off-Grid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Connection to Grid</strong></td>
                                            <td>Yes (Required)</td>
                                            <td>No (Optional)</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Battery Backup</strong></td>
                                            <td>No</td>
                                            <td>Yes</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Cost</strong></td>
                                            <td>Lower</td>
                                            <td>Higher (due to batteries)</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Electricity Bill</strong></td>
                                            <td>Can be zero or negative</td>
                                            <td>Zero (No bill from utility)</td>
                                        </tr>
                                        <tr>
                                            <td><strong>During Power Cut</strong></td>
                                            <td>System turns OFF</td>
                                            <td>System stays ON</td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <h5 className="fw-bold mt-5">What about Hybrid?</h5>
                                <p>
                                    A <strong>Hybrid System</strong> combines the best of both worlds. It is connected to the grid (allowing you to export excess power) but also has a battery bank for backup during power cuts. This is becoming increasingly popular but is the most expensive option.
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GridVsOffGridPage;
