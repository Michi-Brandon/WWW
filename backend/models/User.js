// models/User.js
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName1: { type: String, required: true },
  lastName2: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  role: {
    type: String,
    enum: ['Admin', 'StoreroomManager', 'Coordinator', 'Teacher', 'Student'],
    required: true
  },
  idNumber: { type: String, required: true, unique: true },
  career: { type: String },
  status: {
    type: String,
    enum: ['active', 'delinquent', 'blocked'],
    default: 'active'
  },
  password: { type: String, required: true }
}, { timestamps: true });

// Middleware to hash password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    // Generate a salt and hash the password with it
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
