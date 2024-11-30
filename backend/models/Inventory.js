// models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  image: { type: String }, // Can be a URL or file path
  status: {
    type: String,
    enum: ['active', 'decommissioned'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);