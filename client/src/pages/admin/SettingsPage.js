import React, { useState, useEffect } from 'react';
import settingsService from '../../services/settingsService';
import { Form, Button, Card, Alert, Table, Row, Col, InputGroup } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

// A reusable component for rendering one of the slab tables
const SlabTable = ({ title, slabs, setSlabs }) => {

    const handleSlabChange = (index, field, value) => {
        const updatedSlabs = [...slabs];
        updatedSlabs[index][field] = Number(value);
        setSlabs(updatedSlabs);
    };

    const addSlab = () => {
        setSlabs([...slabs, { from: 0, to: 0, percentage: 0 }]);
    };
    
    const removeSlab = (index) => {
        if (slabs.length <= 1) {
            alert("You must have at least one slab.");
            return;
        }
        const updatedSlabs = slabs.filter((_, i) => i !== index);
        setSlabs(updatedSlabs);
    };

    return (
        <Card className="shadow-sm mb-4">
            <Card.Header as="h5">{title}</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>From (Rs.)</th>
                            <th>To (Rs.)</th>
                            <th>Percentage (%)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slabs.map((slab, index) => (
                            <tr key={index}>
                                <td><Form.Control type="number" value={slab.from} onChange={(e) => handleSlabChange(index, 'from', e.target.value)} /></td>
                                <td><Form.Control type="number" value={slab.to} onChange={(e) => handleSlabChange(index, 'to', e.target.value)} /></td>
                                <td><Form.Control type="number" value={slab.percentage} onChange={(e) => handleSlabChange(index, 'percentage', e.target.value)} /></td>
                                <td><Button variant="danger" size="sm" onClick={() => removeSlab(index)}>Remove</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="secondary" onClick={addSlab}>Add New Slab</Button>
            </Card.Body>
        </Card>
    );
};


const SettingsPage = () => {
    const [selfSlabs, setSelfSlabs] = useState([]);
    const [teamSlabs, setTeamSlabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await settingsService.getSettings();
                setSelfSlabs(response.data.selfIncomeSlabs);
                setTeamSlabs(response.data.teamIncomeSlabs);
            } catch (err) {
                setError('Failed to load settings.');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        setError('');
        try {
            const response = await settingsService.updateSettings({
                selfIncomeSlabs: selfSlabs,
                teamIncomeSlabs: teamSlabs,
            });
            setMessage(response.data.message);
        } catch (err) {
            setError('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Spinner animation="border" />;
    
    return (
        <>
            <h1 className="mb-4">System Settings</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            
            <SlabTable title="Self Income Commission Slabs" slabs={selfSlabs} setSlabs={setSelfSlabs} />
            <SlabTable title="Team Income Commission Slabs" slabs={teamSlabs} setSlabs={setTeamSlabs} />

            <div className="mt-3">
                <Button variant="primary" size="lg" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save All Changes'}
                </Button>
            </div>
        </>
    );
};

export default SettingsPage;