// controllers/alertController.js
const Alert = require('../models/Alert');

// Crear una nueva alerta
const createAlert = async (req, res) => {
  const { type, message, userId } = req.body;
  try {
    const newAlert = new Alert({ type, message, userId, createdAt: new Date() });
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la alerta' });
  }
};

// Obtener una alerta por ID
const getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id).populate('userId');
    if (!alert) {
      return res.status(404).json({ message: 'Alerta no encontrada' });
    }
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la alerta' });
  }
};

// Obtener todas las alertas
const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().populate('userId');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las alertas' });
  }
};

// Actualizar una alerta
const updateAlert = async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAlert);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la alerta' });
  }
};

// Eliminar una alerta
const deleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alerta eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la alerta' });
  }
};

module.exports = {
  createAlert,
  getAlertById,
  getAllAlerts,
  updateAlert,
  deleteAlert,
};