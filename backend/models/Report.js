// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);