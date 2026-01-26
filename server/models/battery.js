const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  capacity: {
    type: String, // e.g., "150Ah" or "5kWh" - store as string to allow units, or number if strictly defined. 
    // Requirement says "Ah / kWh". Let's stick to string for flexibility or add a unit field.
    // Let's use string for display purposes usually, but maybe separate fields are better?
    // User requirement: "Capacity (Ah / kWh)".
    required: true,
  },
  voltage: {
      type: Number, // Optional but good for calculations
      required: false
  },
  price: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Battery', batterySchema);
