import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/common/AnimatedSection';
import calculatorService from '../../services/calculatorService';
import './SolarCalculatorPage.css';

const SolarCalculatorPage = () => {
    // Data State
    const [data, setData] = useState({
        panels: [],
        inverters: [],
        batteries: [],
        wires: [],
        installation: []
    });
    const [loading, setLoading] = useState(true);

    // User Selection State
    const [gridType, setGridType] = useState('On-Grid');
    const [systemSize, setSystemSize] = useState(3); // Default 3kW
    
    const [selectedPanelId, setSelectedPanelId] = useState('');
    const [selectedInverterId, setSelectedInverterId] = useState('');
    const [selectedBatteryId, setSelectedBatteryId] = useState('');
    const [selectedWireId, setSelectedWireId] = useState('');
    const [wireLength, setWireLength] = useState(50); // Default 50m
    
    // Results State
    const [breakdown, setBreakdown] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await calculatorService.getActiveComponents();
                setData(result);
            } catch (error) {
                console.error("Failed to load calculator data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filtered Options based on Grid Type
    const filteredPanels = data.panels.filter(p => p.type === gridType);
    
    // Inverters: hybrid works for both, otherwise match exact type
    const filteredInverters = data.inverters.filter(i => {
        if (i.type === 'Hybrid') return true;
        return i.type === gridType;
    });

    const filteredBatteries = gridType === 'Off-Grid' ? data.batteries : [];

    const handleCalculate = (e) => {
        e.preventDefault();
        
        const panel = data.panels.find(p => p._id === selectedPanelId);
        const inverter = data.inverters.find(i => i._id === selectedInverterId);
        const battery = data.batteries.find(b => b._id === selectedBatteryId);
        const wire = data.wires.find(w => w._id === selectedWireId);

        if (!panel || !inverter || !wire || (gridType === 'Off-Grid' && !battery)) {
            alert("Please select all required components.");
            return;
        }

        // Calculations
        // Required Panels = (System Size in kW * 1000) / Panel Watt
        const numberOfPanels = Math.ceil((systemSize * 1000) / panel.watt);
        const totalPanelCost = numberOfPanels * panel.price;

        const totalInverterCost = inverter.price; // Usually 1 inverter for home systems

        const totalBatteryCost = gridType === 'Off-Grid' ? battery.price : 0; 
        
        const totalWireCost = wireLength * wire.pricePerMeter;

        // Installation
        let installationCost = 0;
        const installRule = data.installation[0]; // Assume first active rule applies
        if (installRule) {
            if (installRule.type === 'PerkW') {
                installationCost = systemSize * installRule.price;
            } else {
                installationCost = installRule.price;
            }
        }

        const grandTotal = totalPanelCost + totalInverterCost + totalBatteryCost + totalWireCost + installationCost;

        setBreakdown({
            panels: {
                name: `${panel.brand} (${panel.watt}W)`,
                qty: numberOfPanels,
                cost: totalPanelCost
            },
            inverter: {
                name: `${inverter.brand} (${inverter.capacity}kW)`,
                qty: 1,
                cost: totalInverterCost
            },
            battery: gridType === 'Off-Grid' ? {
                name: `${battery.brand} (${battery.capacity})`,
                qty: 1, // Simplified
                cost: totalBatteryCost
            } : null,
            wire: {
                name: `${wire.type} (${wireLength}m)`,
                cost: totalWireCost
            },
            installation: {
                cost: installationCost
            },
            total: grandTotal
        });
    };

    if (loading) return <div className="text-center py-5">Loading calculator data...</div>;

    return (
        <div className="calculator-page pt-5 pb-5">
            <Container>
                <div className="text-center mb-5 mt-5">
                    <h1 className="fw-bold display-5">Installation Cost <span className="text-warning">Calculator</span></h1>
                    <p className="lead text-muted">Get a detailed estimate for your solar installation.</p>
                </div>

                <Row className="justify-content-center">
                    <Col lg={10} xl={9}>
                        <Card className="border-0 shadow-lg overflow-hidden calculator-card">
                            <Row className="g-0">
                                <Col md={7} className="bg-white p-4 p-md-5">
                                    <h4 className="fw-bold mb-4">System Configuration</h4>
                                    <Form onSubmit={handleCalculate}>
                                        
                                        {/* Grid Type */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold small text-muted text-uppercase">Grid Type</Form.Label>
                                            <div className="d-flex gap-3">
                                                <Form.Check 
                                                    type="radio"
                                                    label="On-Grid"
                                                    name="gridType"
                                                    id="ongrid"
                                                    checked={gridType === 'On-Grid'}
                                                    onChange={() => setGridType('On-Grid')}
                                                    className="fw-bold"
                                                />
                                                <Form.Check 
                                                    type="radio"
                                                    label="Off-Grid"
                                                    name="gridType"
                                                    id="offgrid"
                                                    checked={gridType === 'Off-Grid'}
                                                    onChange={() => setGridType('Off-Grid')}
                                                    className="fw-bold"
                                                />
                                            </div>
                                        </Form.Group>

                                        {/* System Size */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold small text-muted text-uppercase">System Size (kW)</Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                min="1" 
                                                step="0.5"
                                                value={systemSize} 
                                                onChange={(e) => setSystemSize(parseFloat(e.target.value))} 
                                                required 
                                            />
                                        </Form.Group>

                                        {/* Components Selection */}
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold small text-muted">Solar Panel</Form.Label>
                                                    <Form.Select 
                                                        value={selectedPanelId} 
                                                        onChange={(e) => setSelectedPanelId(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Brand & Watt</option>
                                                        {filteredPanels.map(p => (
                                                            <option key={p._id} value={p._id}>{p.brand} - {p.watt}W (₹{p.price})</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                 <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold small text-muted">Inverter</Form.Label>
                                                    <Form.Select 
                                                        value={selectedInverterId} 
                                                        onChange={(e) => setSelectedInverterId(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Brand & Capacity</option>
                                                        {filteredInverters.map(i => (
                                                            <option key={i._id} value={i._id}>{i.brand} - {i.capacity}kW (₹{i.price})</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {gridType === 'Off-Grid' && (
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-bold small text-muted">Battery</Form.Label>
                                                <Form.Select 
                                                    value={selectedBatteryId} 
                                                    onChange={(e) => setSelectedBatteryId(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Brand & Capacity</option>
                                                    {filteredBatteries.map(b => (
                                                        <option key={b._id} value={b._id}>{b.brand} - {b.capacity} (₹{b.price})</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        )}

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold small text-muted">Wire Type</Form.Label>
                                                    <Form.Select 
                                                        value={selectedWireId} 
                                                        onChange={(e) => setSelectedWireId(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Type</option>
                                                        {data.wires.map(w => (
                                                            <option key={w._id} value={w._id}>{w.type} (₹{w.pricePerMeter}/m)</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                 <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold small text-muted">Wire Length (Meters)</Form.Label>
                                                    <Form.Control 
                                                        type="number" 
                                                        value={wireLength} 
                                                        onChange={(e) => setWireLength(parseFloat(e.target.value))} 
                                                        required 
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <div className="d-grid mt-4">
                                            <Button variant="success" size="lg" type="submit" className="fw-bold text-uppercase">
                                                Calculate Cost
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>

                                <Col md={5} className="bg-light p-4 p-md-5 d-flex flex-column">
                                    <h4 className="fw-bold mb-4">Cost Breakdown</h4>
                                    {breakdown ? (
                                        <div className="breakdown-content flex-grow-1 d-flex flex-column">
                                            <div className="mb-3 pb-3 border-bottom">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span><strong>Solar Panels</strong> <br/><small className="text-muted">{breakdown.panels.qty} x {breakdown.panels.name}</small></span>
                                                    <span className="fw-bold">₹{breakdown.panels.cost.toLocaleString()}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span><strong>Inverter</strong> <br/><small className="text-muted">{breakdown.inverter.name}</small></span>
                                                    <span className="fw-bold">₹{breakdown.inverter.cost.toLocaleString()}</span>
                                                </div>
                                                {breakdown.battery && (
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <span><strong>Battery</strong> <br/><small className="text-muted">{breakdown.battery.name}</small></span>
                                                        <span className="fw-bold">₹{breakdown.battery.cost.toLocaleString()}</span>
                                                    </div>
                                                )}
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span><strong>Wiring</strong> <br/><small className="text-muted">{breakdown.wire.name}</small></span>
                                                    <span className="fw-bold">₹{breakdown.wire.cost.toLocaleString()}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span><strong>Installation</strong></span>
                                                    <span className="fw-bold">₹{breakdown.installation.cost.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto bg-success text-white p-3 rounded-3 text-center shadow-sm">
                                                <small className="text-uppercase text-white-50 fw-bold">Total Estimated Cost</small>
                                                <div className="display-6 fw-bold">₹{breakdown.total.toLocaleString()}</div>
                                            </div>
                                            
                                            <div className="mt-4 text-center">
                                                <Button as={Link} to="/contact" variant="outline-dark" size="sm" className="w-100">Request Official Quote</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted col my-auto opacity-50">
                                            <i className="fa-solid fa-receipt display-1 mb-3"></i>
                                            <p>Fill out the form to see the cost breakdown.</p>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SolarCalculatorPage;
