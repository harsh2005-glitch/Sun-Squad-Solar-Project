const mongoose = require('mongoose');

const solarPanelSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['On-Grid', 'Off-Grid'],
    required: true,
  },
  watt: {
    type: Number,
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

module.exports = mongoose.model('SolarPanel', solarPanelSchema);
