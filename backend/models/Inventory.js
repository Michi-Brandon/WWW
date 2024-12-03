// models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Disponible', 'Prestado'],
    default: 'Disponible'
  },
  borrower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);