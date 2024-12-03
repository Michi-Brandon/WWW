// models/Request.js
const mongoose = require('mongoose');
const Inventory = require('./Inventory'); // Asegúrate de importar el modelo de Inventory
const requestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  requestDate: { type: Date, required: true },
  inventoryName: {type: String},
  inventoryDescription: {type: String},
  status: {
    type: String,
    enum: ['pending', 'validated', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

requestSchema.pre('save', async function (next) {
  if (!this.isModified('resourceId')) {
    // Si el resourceId no ha cambiado, no hacemos nada
    return next();
  }

  try {
    // Buscar el inventario relacionado
    const inventory = await Inventory.findById(this.resourceId);
    if (!inventory) {
      return next(new Error('El recurso relacionado no existe en el inventario.'));
    }

    // Asignar los valores del inventario al request
    this.inventoryName = inventory.name;
    this.inventoryDescription = inventory.description;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Request', requestSchema);