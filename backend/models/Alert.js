// models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['delinquent', 'low-stock'],
    required: true
  },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);