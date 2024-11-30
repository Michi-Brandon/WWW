// models/Loan.js
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resources: [
    {
      resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  requestDate: { type: Date, required: true },
  loanDate: { type: Date },
  returnDate: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'returned', 'not-returned'],
    default: 'pending'
  },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);