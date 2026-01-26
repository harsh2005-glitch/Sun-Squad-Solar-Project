import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import calculatorService from '../../services/calculatorService';
import './SolarCalculatorPage.css';

const SolarCalculatorPage = () => {
    // Data State
    const [data, setData] = useState({ packages: [], panels: [], inverters: [], batteries: [], wires: [] });
    const [loading, setLoading] = useState(true);

    // User Selection State
    const [gridType, setGridType] = useState('On-Grid');
    const [selectedPackageId, setSelectedPackageId] = useState('');
    
    // Component Selections
    const [selectedPanelId, setSelectedPanelId] = useState('');
    const [selectedInverterId, setSelectedInverterId] = useState('');
    const [selectedBatteryId, setSelectedBatteryId] = useState('');
    const [selectedWireId, setSelectedWireId] = useState('');

    // Results State
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedComponents, setSelectedComponents] = useState({});

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

    // Filter Logic
    const filteredPackages = (data.packages || []).filter(p => p.type === gridType);
    
    // Filter components based on Grid Type (strict filtering based on schema)
    // Note: If no specific type matches, you might want to show all or specific 'Universal' types if your schema supported it.
    const filteredPanels = (data.panels || []).filter(i => i.type === gridType);
    const filteredInverters = (data.inverters || []).filter(i => i.type === gridType);
    // Batteries are usually for Off-Grid or Hybrid
    const filteredBatteries = (data.batteries || []); // Show all batteries if relevant mode is selected
    const filteredWires = (data.wires || []); // Wires are usually universal

    const handleCalculate = (e) => {
        e.preventDefault();
        const pkg = filteredPackages.find(p => p._id === selectedPackageId);
        
        if (!pkg) {
            alert("Please select a system size.");
            return;
        }

        // Gather full objects for selected components
        const panel = (data.panels || []).find(i => i._id === selectedPanelId);
        const inverter = (data.inverters || []).find(i => i._id === selectedInverterId);
        const battery = (data.batteries || []).find(i => i._id === selectedBatteryId);
        const wire = (data.wires || []).find(i => i._id === selectedWireId);

        setSelectedPackage(pkg);
        setSelectedComponents({
            panel,
            inverter,
            battery,
            wire
        });
    };

    const handleGridTypeChange = (type) => {
        setGridType(type);
        // Reset selections
        setSelectedPackageId('');
        setSelectedPanelId('');
        setSelectedInverterId('');
        setSelectedBatteryId('');
        setSelectedWireId('');
        setSelectedPackage(null);
        setSelectedComponents({});
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
                    <Col lg={10} xl={8}>
                        <Card className="border-0 shadow-lg overflow-hidden calculator-card">
                            <Row className="g-0">
                                <Col md={selectedPackage ? 6 : 12} className="bg-white p-4 p-md-5 transition-col">
                                    <h4 className="fw-bold mb-4">System Requirements</h4>
                                    <Form onSubmit={handleCalculate}>
                                        
                                        {/* Grid Type */}
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-bold small text-muted text-uppercase mb-3">Grid Type</Form.Label>
                                            <div className="d-flex gap-3 flex-wrap">
                                                {['On-Grid', 'Off-Grid', 'Hybrid'].map((type) => (
                                                     <Form.Check 
                                                        key={type}
                                                        type="radio"
                                                        label={type}
                                                        name="gridType"
                                                        id={type.toLowerCase().replace(' ', '')}
                                                        checked={gridType === type}
                                                        onChange={() => handleGridTypeChange(type)}
                                                        className="fw-bold fs-5"
                                                    />
                                                ))}
                                            </div>
                                        </Form.Group>

                                        {/* System Size Select */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold small text-muted text-uppercase">System Size (kW)</Form.Label>
                                            <Form.Select 
                                                size="lg"
                                                value={selectedPackageId} 
                                                onChange={(e) => setSelectedPackageId(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Capacity</option>
                                                {filteredPackages.map(p => (
                                                    <option key={p._id} value={p._id}>{p.systemSize} kW {p.name ? `- ${p.name}` : ''}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        {/* Component Selections */}
                                        <Row className="mb-3">
                                            <Col md={12} className="mb-3">
                                                <Form.Label className="fw-bold small text-muted text-uppercase">Solar Panel</Form.Label>
                                                <Form.Select value={selectedPanelId} onChange={(e) => setSelectedPanelId(e.target.value)}>
                                                    <option value="">Select Panel Preference (Optional)</option>
                                                    {filteredPanels.map(item => (
                                                        <option key={item._id} value={item._id}>{item.brand} - {item.watt}W ({item.type})</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>

                                            <Col md={12} className="mb-3">
                                                <Form.Label className="fw-bold small text-muted text-uppercase">Inverter</Form.Label>
                                                <Form.Select value={selectedInverterId} onChange={(e) => setSelectedInverterId(e.target.value)}>
                                                    <option value="">Select Inverter Preference (Optional)</option>
                                                    {filteredInverters.map(item => (
                                                        <option key={item._id} value={item._id}>{item.brand} - {item.capacity}W ({item.type})</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>

                                            {gridType !== 'On-Grid' && (
                                                <Col md={12} className="mb-3">
                                                    <Form.Label className="fw-bold small text-muted text-uppercase">Battery</Form.Label>
                                                    <Form.Select value={selectedBatteryId} onChange={(e) => setSelectedBatteryId(e.target.value)}>
                                                        <option value="">Select Battery Preference (Optional)</option>
                                                        {filteredBatteries.map(item => (
                                                            <option key={item._id} value={item._id}>{item.brand} - {item.capacity}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            )}

                                            <Col md={12} className="mb-4">
                                                <Form.Label className="fw-bold small text-muted text-uppercase">Wire / Cabling</Form.Label>
                                                <Form.Select value={selectedWireId} onChange={(e) => setSelectedWireId(e.target.value)}>
                                                    <option value="">Select Wiring Preference (Optional)</option>
                                                    {filteredWires.map(item => (
                                                        <option key={item._id} value={item._id}>{item.type} {item.description ? `- ${item.description}` : ''}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>

                                        <div className="d-grid mt-4">
                                            <Button 
                                                variant="success" 
                                                size="lg" 
                                                type="submit" 
                                                className="fw-bold text-uppercase py-3"
                                                disabled={!selectedPackageId}
                                            >
                                                Calculate Pricing
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>

                                {selectedPackage && (
                                    <Col md={6} className="bg-light p-4 p-md-5 d-flex flex-column border-start animate-fade-in">
                                        <h4 className="fw-bold mb-4">Estimated Quote</h4>
                                        <div className="breakdown-content flex-grow-1 d-flex flex-column justify-content-center">
                                            
                                            <div className="text-center mb-4">
                                                <h5 className="text-muted text-uppercase small fw-bold mb-2">Package</h5>
                                                <h3 className="fw-bold">{selectedPackage.name}</h3>
                                                <Badge bg="success" className="mb-3">{selectedPackage.systemSize} kW {gridType}</Badge>
                                            </div>

                                            <div className="bg-white p-4 rounded-3 shadow-sm text-center mb-4 border">
                                                <small className="text-uppercase text-muted fw-bold d-block mb-1">Total Package Price</small>
                                                <div className="display-4 fw-bold text-success">₹{selectedPackage.price.toLocaleString()}</div>
                                                <small className="text-muted d-block mt-2">*Includes Standard Components</small>
                                            </div>

                                            {/* selected components display */}
                                            {(selectedComponents.panel || selectedComponents.inverter || selectedComponents.battery || selectedComponents.wire) && (
                                                <div className="mb-4">
                                                     <h6 className="fw-bold border-bottom pb-2">Your Preferences:</h6>
                                                     <ul className="list-unstyled small text-muted">
                                                        {selectedComponents.panel && <li><strong>Panel:</strong> {selectedComponents.panel.brand} ({selectedComponents.panel.watt}W)</li>}
                                                        {selectedComponents.inverter && <li><strong>Inverter:</strong> {selectedComponents.inverter.brand} ({selectedComponents.inverter.capacity}W)</li>}
                                                        {selectedComponents.battery && <li><strong>Battery:</strong> {selectedComponents.battery.brand} ({selectedComponents.battery.capacity})</li>}
                                                        {selectedComponents.wire && <li><strong>Wire:</strong> {selectedComponents.wire.type}</li>}
                                                     </ul>
                                                </div>
                                            )}

                                            {selectedPackage.description && (
                                                <div className="alert alert-info border-0 bg-info-soft mb-4">
                                                    <small>{selectedPackage.description}</small>
                                                </div>
                                            )}
                                            
                                            <div className="mt-auto text-center">
                                                <Button as={Link} to="/contact" variant="dark" size="lg" className="w-100 mb-2">Book Now</Button>
                                                <small className="text-muted">Need a custom size? <Link to="/contact">Contact Us</Link></small>
                                            </div>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SolarCalculatorPage;
