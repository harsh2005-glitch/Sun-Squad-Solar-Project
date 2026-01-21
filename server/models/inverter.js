const mongoose = require('mongoose');

const inverterSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['On-Grid', 'Off-Grid', 'Hybrid'],
    required: true,
  },
  capacity: {
    type: Number, // in kW
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Inverter', inverterSchema);
