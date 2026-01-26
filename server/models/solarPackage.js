const mongoose = require('mongoose');

const solarPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['On-Grid', 'Off-Grid', 'Hybrid'],
    required: true,
  },
  systemSize: {
    type: Number,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

module.exports = mongoose.model('SolarPackage', solarPackageSchema);
