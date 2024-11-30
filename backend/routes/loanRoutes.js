// routes/loanRoutes.js
const express = require('express');
const { createLoan, getAllLoans, updateLoan, deleteLoan, getLoanById } = require('../controllers/loanController');

const router = express.Router();

router.post('/', createLoan);
router.get('/', getAllLoans);
router.get('/:id', getLoanById);  // Ruta para obtener un préstamo específico
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);

module.exports = router;