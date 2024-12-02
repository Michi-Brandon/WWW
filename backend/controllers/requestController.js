// controllers/requestController.js
const Request = require('../models/Request');

// Crear una nueva solicitud
const createRequest = async (req, res) => {
  const { requesterId, resourceId } = req.body;
  try {
    const newRequest = new Request({ requesterId, resourceId, requestDate: new Date() });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la solicitud' });
  }
};

// Obtener una solicitud por ID
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('requesterId .resourceId');
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la solicitud' });
  }
};

// Obtener todas las solicitudes
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('requesterId resourceId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las solicitudes' });
  }
};

// Actualizar una solicitud
const updateRequest = async (req, res) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la solicitud' });
  }
};

// Eliminar una solicitud
const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: 'Solicitud eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la solicitud' });
  }
};

module.exports = {
  createRequest,
  getRequestById,
  getAllRequests,
  updateRequest,
  deleteRequest,
};