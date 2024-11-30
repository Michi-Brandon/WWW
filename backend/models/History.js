// models/History.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['loan', 'return', 'request'],
    required: true
  },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  date: { type: Date, required: true },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);