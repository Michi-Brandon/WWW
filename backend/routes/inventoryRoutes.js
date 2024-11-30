// routes/inventoryRoutes.js
const express = require('express');
const { createInventoryItem, getAllInventoryItems, updateInventoryItem, deleteInventoryItem, getInventoryItemById } = require('../controllers/inventoryController');

const router = express.Router();

router.post('/', createInventoryItem);
router.get('/', getAllInventoryItems);
router.get('/:id', getInventoryItemById);  // Ruta para obtener un item específico
router.put('/:id', updateInventoryItem);
router.delete('/:id', deleteInventoryItem);

module.exports = router;