const mongoose = require('mongoose');

const wireSchema = new mongoose.Schema({
  type: {
    type: String, // e.g., "Copper", "Aluminium"
    required: true,
  },
  description: {
      type: String, // e.g., "4mm DC Wire", "10mm AC Wire"
      required: false
  },
  pricePerMeter: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Wire', wireSchema);
