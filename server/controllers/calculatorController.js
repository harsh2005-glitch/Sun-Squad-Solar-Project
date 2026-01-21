const SolarPanel = require('../models/solarPanel');
const Inverter = require('../models/inverter');
const Battery = require('../models/battery');
const Wire = require('../models/wire');
const InstallationCharge = require('../models/installationCharge');

// Helper to get model by type
const getModel = (type) => {
    switch (type) {
        case 'panel': return SolarPanel;
        case 'inverter': return Inverter;
        case 'battery': return Battery;
        case 'wire': return Wire;
        case 'installation': return InstallationCharge;
        default: return null;
    }
};

// Get all items for a component type (Admin)
exports.getAllItems = async (req, res) => {
    const { type } = req.params;
    const Model = getModel(type);
    
    if (!Model) return res.status(400).json({ msg: 'Invalid component type' });

    try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get active items (Public)
exports.getActiveItems = async (req, res) => {
    // For the public calculator, we probably want to fetch all active data at once 
    // or provide endpoints for each. 
    // Let's provide a combined endpoint for efficiency or individual ones.
    // The requirement says "The system must automatically decide...".
    // So the frontend needs the list of active components to apply logic.
    
    try {
        const [panels, inverters, batteries, wires, installation] = await Promise.all([
            SolarPanel.find({ status: 'Active' }),
            Inverter.find({ status: 'Active' }),
            Battery.find({ status: 'Active' }),
            Wire.find({ status: 'Active' }),
            InstallationCharge.find({ status: 'Active' })
        ]);

        res.json({
            panels,
            inverters,
            batteries,
            wires,
            installation
        });
    } catch (err) {
         console.error(err);
        res.status(500).send('Server Error');
    }
};

// Add item (Admin)
exports.addItem = async (req, res) => {
    const { type } = req.params;
    const Model = getModel(type);

    if (!Model) return res.status(400).json({ msg: 'Invalid component type' });

    try {
        const newItem = new Model(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update item (Admin)
exports.updateItem = async (req, res) => {
    const { type, id } = req.params;
    const Model = getModel(type);

    if (!Model) return res.status(400).json({ msg: 'Invalid component type' });

    try {
        let item = await Model.findById(id);
        if (!item) return res.status(404).json({ msg: 'Item not found' });

        item = await Model.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete item (Admin)
exports.deleteItem = async (req, res) => {
    const { type, id } = req.params;
    const Model = getModel(type);

    if (!Model) return res.status(400).json({ msg: 'Invalid component type' });

    try {
        await Model.findByIdAndDelete(id);
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
