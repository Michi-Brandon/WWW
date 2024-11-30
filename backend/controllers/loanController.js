// controllers/loanController.js
const Loan = require('../models/Loan');

// Crear un nuevo préstamo
const createLoan = async (req, res) => {
  const { borrowerId, resources, requestDate } = req.body;
  try {
    const newLoan = new Loan({ borrowerId, resources, requestDate, loanDate: new Date() });
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el préstamo' });
  }
};

// Obtener un préstamo por ID
const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('borrowerId resources.resourceId');
    if (!loan) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el préstamo' });
  }
};

// Obtener todos los préstamos
const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('borrowerId resources.resourceId');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los préstamos' });
  }
};

// Actualizar un préstamo
const updateLoan = async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el préstamo' });
  }
};

// Eliminar un préstamo
const deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Préstamo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el préstamo' });
  }
};

module.exports = {
  createLoan,
  getLoanById,
  getAllLoans,
  updateLoan,
  deleteLoan,
};