const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config(); // Cargar las variables de entorno desde .env

// Registrar nuevo usuario
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Crear el nuevo usuario (la contraseña será cifrada automáticamente por el middleware pre('save'))
    const user = await User.create({ name, email, password, role });
    
    // Crear un token JWT para el usuario
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Responder con el token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario 2' });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales no válidas' });
    }

    // Comparar la contraseña ingresada con la contraseña cifrada almacenada
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales no válidas' });
    }

    // Crear un token JWT para el usuario
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Responder con el token
    res.json({ token,user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el login' });
  }
};

// Verificar token (middleware)
const protect = (req, res, next) => {
  // Obtener el token del encabezado 'x-auth-token'
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No hay token, acceso denegado' });
  }

  try {
    // Verificar el token y agregar el usuario al request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // ID del usuario a actualizar
  const { name, lastName, email, carrera, estado, password } = req.body; // Nuevos datos

  try {
    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.carrera = carrera || user.carrera;
    user.estado = estado || user.estado;
    if (password != "") {
      user.password = password; // Asignar la nueva contraseña hasheada
    }

    // Guardar el usuario actualizado
    await user.save();

    return res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// Toggle block user
const blockUser = async (req, res) => {
  const { id } = req.params; // ID del usuario a bloquear/desbloquear

  try {
    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.estado = user.estado === 0 ? 1 : 0; // Cambiar el estado
    await user.save(); // Guardar el usuario actualizado

    return res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al bloquear/desbloquear usuario' });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // Obtiene todos los usuarios
    res.status(200).json(users);  // Devuelve la lista de usuarios
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Solo para admin
const admin = (req, res, next) => {
  // Verificar si el usuario tiene rol de admin
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};

module.exports = { registerUser, loginUser, updateUser, blockUser , protect, admin, getAllUsers };
