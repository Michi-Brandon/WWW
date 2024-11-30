// routes/alertRoutes.js
const express = require('express');
const { createAlert, getAllAlerts, updateAlert, deleteAlert, getAlertById } = require('../controllers/alertController');

const router = express.Router();

router.post('/', createAlert);
router.get('/', getAllAlerts);
router.get('/:id', getAlertById);  // Ruta para obtener una alerta específica
router.put('/:id', updateAlert);
router.delete('/:id', deleteAlert);

module.exports = router;