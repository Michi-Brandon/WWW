const express = require('express');
const { registerUser, loginUser, protect, admin, updateUser } = require('../controllers/authController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para login de usuario
router.post('/login', loginUser);

router.put('/:id', updateUser);

// Ruta protegida solo para admin
router.get('/admin', protect, admin, (req, res) => {
  res.json({ message: 'Acceso permitido a admin' });
});

module.exports = router;
