import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Tabs, Tab, Modal, Form, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import calculatorService from '../../services/calculatorService';

const ManageCalculatorPage = () => {
    const [key, setKey] = useState('panel');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form State
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line
    }, [key]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const data = await calculatorService.getItems(key);
            setItems(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch items");
        }
        setLoading(false);
    };

    const handleShow = (item = null) => {
        setEditingItem(item);
        if (item) {
            setFormData(item);
        } else {
            setFormData({ status: 'Active' }); // Default active
        }
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await calculatorService.updateItem(key, editingItem._id, formData);
                toast.success("Item updated successfully");
            } else {
                await calculatorService.addItem(key, formData);
                toast.success("Item added successfully");
            }
            handleClose();
            fetchItems();
        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await calculatorService.deleteItem(key, id);
                toast.success("Item deleted");
                fetchItems();
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    const renderFormFields = () => {
        switch (key) {
            case 'panel':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" name="brand" value={formData.brand || ''} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Panel Type</Form.Label>
                            <Form.Select name="type" value={formData.type || ''} onChange={handleChange} required>
                                <option value="">Select Type</option>
                                <option value="On-Grid">On-Grid</option>
                                <option value="Off-Grid">Off-Grid</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Watt Rating</Form.Label>
                            <Form.Control type="number" name="watt" value={formData.watt || ''} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price (₹)</Form.Label>
                            <Form.Control type="number" name="price" value={formData.price || ''} onChange={handleChange} required />
                        </Form.Group>
                    </>
                );
            case 'inverter':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" name="brand" value={formData.brand || ''} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Supported Type</Form.Label>
                            <Form.Select name="type" value={formData.type || ''} onChange={handleChange} required>
                                <option value="">Select Type</option>
                                <option value="On-Grid">On-Grid</option>
                                <option value="Off-Grid">Off-Grid</option>
                                <option value="Hybrid">Hybrid</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Capacity (kW)</Form.Label>
                            <Form.Control type="number" name="capacity" value={formData.capacity || ''} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price (₹)</Form.Label>
                            <Form.Control type="number" name="price" value={formData.price || ''} onChange={handleChange} required />
                        </Form.Group>
                    </>
                );
            case 'battery':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control type="text" name="brand" value={formData.brand || ''} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Capacity (Ah / kWh)</Form.Label>
                            <Form.Control type="text" name="capacity" value={formData.capacity || ''} onChange={handleChange} required placeholder="e.g. 150Ah" />
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Voltage (V) - Optional</Form.Label>
                            <Form.Control type="number" name="voltage" value={formData.voltage || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price (₹)</Form.Label>
                            <Form.Control type="number" name="price" value={formData.price || ''} onChange={handleChange} required />
                        </Form.Group>
                    </>
                );
            case 'wire':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Wire Type</Form.Label>
                            <Form.Control type="text" name="type" value={formData.type || ''} onChange={handleChange} required placeholder="Copper / Aluminium"/>
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={formData.description || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price per Meter (₹)</Form.Label>
                            <Form.Control type="number" name="pricePerMeter" value={formData.pricePerMeter || ''} onChange={handleChange} required />
                        </Form.Group>
                    </>
                );
            case 'installation':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Charge Type</Form.Label>
                            <Form.Select name="type" value={formData.type || ''} onChange={handleChange} required>
                                <option value="">Select Type</option>
                                <option value="PerkW">Price Per kW</option>
                                <option value="Fixed">Fixed Price</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                             <Form.Label>Description</Form.Label>
                             <Form.Control type="text" name="description" value={formData.description || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price (₹)</Form.Label>
                            <Form.Control type="number" name="price" value={formData.price || ''} onChange={handleChange} required />
                        </Form.Group>
                    </>
                );
            default: return null;
        }
    };

    const renderTableHeaders = () => {
        switch (key) {
            case 'panel': return <tr><th>Brand</th><th>Type</th><th>Watt</th><th>Price</th><th>Status</th><th>Actions</th></tr>;
            case 'inverter': return <tr><th>Brand</th><th>Type</th><th>Capacity (kW)</th><th>Price</th><th>Status</th><th>Actions</th></tr>;
            case 'battery': return <tr><th>Brand</th><th>Capacity</th><th>Price</th><th>Status</th><th>Actions</th></tr>;
            case 'wire': return <tr><th>Type</th><th>Description</th><th>Price/Meter</th><th>Status</th><th>Actions</th></tr>;
            case 'installation': return <tr><th>Type</th><th>Description</th><th>Price</th><th>Status</th><th>Actions</th></tr>;
            default: return null;
        }
    };

    const renderTableRows = () => {
        return items.map((item) => (
            <tr key={item._id}>
                {key === 'panel' && <>
                    <td>{item.brand}</td>
                    <td><Badge bg={item.type === 'On-Grid' ? 'info' : 'warning'}>{item.type}</Badge></td>
                    <td>{item.watt} W</td>
                    <td>₹{item.price}</td>
                </>}
                {key === 'inverter' && <>
                    <td>{item.brand}</td>
                    <td><Badge bg={item.type === 'Hybrid' ? 'success' : item.type === 'On-Grid' ? 'info' : 'warning'}>{item.type}</Badge></td>
                    <td>{item.capacity} kW</td>
                    <td>₹{item.price}</td>
                </>}
                {key === 'battery' && <>
                    <td>{item.brand}</td>
                    <td>{item.capacity}</td>
                    <td>₹{item.price}</td>
                </>}
                {key === 'wire' && <>
                    <td>{item.type}</td>
                    <td>{item.description}</td>
                    <td>₹{item.pricePerMeter}</td>
                </>}
                {key === 'installation' && <>
                    <td>{item.type === 'PerkW' ? 'Per kW' : 'Fixed'}</td>
                    <td>{item.description}</td>
                    <td>₹{item.price}</td>
                </>}
                
                <td>
                    <Badge bg={item.status === 'Active' ? 'success' : 'secondary'}>{item.status}</Badge>
                </td>
                <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(item)}><i className="fa-solid fa-pen"></i></Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash"></i></Button>
                </td>
            </tr>
        ));
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4">Calculator Settings</h2>
            
            <Tabs
                id="calculator-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="panel" title="Solar Panels"></Tab>
                <Tab eventKey="inverter" title="Inverters"></Tab>
                <Tab eventKey="battery" title="Batteries"></Tab>
                <Tab eventKey="wire" title="Wires"></Tab>
                <Tab eventKey="installation" title="Installation"></Tab>
            </Tabs>

            <div className="d-flex justify-content-end mb-3">
                <Button onClick={() => handleShow()} variant="success"><i className="fa-solid fa-plus me-2"></i>Add New</Button>
            </div>

            <Table hover responsive striped className="align-middle shadow-sm bg-white">
                <thead className="bg-light">
                   {renderTableHeaders()}
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
                    ) : (items.length === 0 ? (
                        <tr><td colSpan="6" className="text-center py-4">No items found.</td></tr>
                    ) : (
                        renderTableRows()
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingItem ? 'Edit Item' : 'Add New Item'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {renderFormFields()}
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" value={formData.status || 'Active'} onChange={handleChange}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default ManageCalculatorPage;
