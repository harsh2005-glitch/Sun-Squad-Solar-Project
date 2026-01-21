const mongoose = require('mongoose');

const installationChargeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['PerkW', 'Fixed'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
      type: String, 
      required: false,
      default: 'Installation Charge'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

module.exports = mongoose.model('InstallationCharge', installationChargeSchema);
