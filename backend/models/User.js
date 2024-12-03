// models/User.js
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

// Subdocumento para solicitudes
const solicitudSchema = new mongoose.Schema({
  pendientes: { type: Number, default: 0 },
  aceptadas: { type: Number, default: 0 },
  atrasadas: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname : {type: String, required: false},
  email: { type: String, required: true, unique: true },
  rut: { type: String},
  carrera: { type: String, required: false },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'StoreroomManager', 'Coordinator', 'Teacher', 'Student'],
    required: false
  },
  solicitudes: { type: solicitudSchema, default: () => ({}), required: false},
  estado: {
    type: String,
    enum: ['Habilitado', 'Bloqueado'], // Solo permite estos valores
    required: false,
  },
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
