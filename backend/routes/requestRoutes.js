// routes/requestRoutes.js
const express = require('express');
const { createRequest, getAllRequests, updateRequest, deleteRequest, getRequestById } = require('../controllers/requestController');

const router = express.Router();

router.post('/', createRequest);
router.get('/', getAllRequests);
router.get('/:id', getRequestById);  // Ruta para obtener una solicitud específica
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);

module.exports = router;