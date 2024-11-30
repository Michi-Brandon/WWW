// controllers/inventoryController.js
const Inventory = require('../models/Inventory');

// Crear un nuevo item en el inventario
const createInventoryItem = async (req, res) => {
  const { name, category, description, quantity } = req.body;
  try {
    const newItem = new Inventory({ name, category, description, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el item de inventario' });
  }
};

// Obtener un item del inventario por ID
const getInventoryItemById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el item de inventario' });
  }
};

// Obtener todos los items del inventario
const getAllInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los items de inventario' });
  }
};

// Actualizar un item del inventario
const updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el item de inventario' });
  }
};

// Eliminar un item del inventario
const deleteInventoryItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el item de inventario' });
  }
};

module.exports = {
  createInventoryItem,
  getInventoryItemById,
  getAllInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
};