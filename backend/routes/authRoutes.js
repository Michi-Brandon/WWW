const express = require('express');
const { registerUser, loginUser, protect, admin, updateUser, blockUser, getAllUsers } = require('../controllers/authController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para login de usuario
router.post('/login', loginUser);

// Ruta para actualizar usuario
router.put('/:id', updateUser);

// Ruta para cambiar estado de usuario
router.put('/block/:id', blockUser);

// Ruta para obtener a todos los usuarios
router.get('/', getAllUsers);

// Ruta protegida solo para admin
router.get('/admin', protect, admin, (req, res) => {
  res.json({ message: 'Acceso permitido a admin' });
});

module.exports = router;
