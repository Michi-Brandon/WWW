// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Inventory = require('../models/Inventory');
const Request = require('../models/Request');
const Loan = require('../models/Loan');
const Alert = require('../models/Alert');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Eliminar todos los datos actuales para evitar duplicados
    await User.deleteMany({});
    await Inventory.deleteMany({});
    await Request.deleteMany({});
    await Loan.deleteMany({});
    await Alert.deleteMany({});

    // Crear Usuarios
    const users = await User.insertMany([
      {
        firstName: 'Carlos',
        lastName1: 'Soto',
        lastName2: 'Gómez',
        email: 'carlos.soto@example.com',
        phoneNumber: '123456789',
        role: 'Student',
        idNumber: 'A1234567',
        career: 'Ingeniería Electrónica',
        password: 'password123', // La contraseña será cifrada por el middleware pre('save')
      },
      {
        firstName: 'Ana',
        lastName1: 'Martínez',
        lastName2: 'Pérez',
        email: 'ana.martinez@example.com',
        phoneNumber: '987654321',
        role: 'Student',
        idNumber: 'B2345678',
        career: 'Ingeniería Mecánica',
        password: 'password123',
      },
      {
        firstName: 'Marta',
        lastName1: 'Gómez',
        lastName2: 'Rojas',
        email: 'marta.gomez@example.com',
        phoneNumber: '567123456',
        role: 'Teacher',
        idNumber: 'T3456789',
        career: 'Ingeniería Electrónica',
        password: 'password123',
      },
      {
        firstName: 'Roberto',
        lastName1: 'Pérez',
        lastName2: 'López',
        email: 'roberto.perez@example.com',
        phoneNumber: '456789123',
        role: 'Coordinator',
        idNumber: 'C4567890',
        career: 'Ingeniería Electrónica',
        password: 'password123',
      },
      {
        firstName: 'Luis',
        lastName1: 'Hernández',
        lastName2: 'Cruz',
        email: 'luis.hernandez@example.com',
        phoneNumber: '123123123',
        role: 'StoreroomManager',
        idNumber: 'P5678901',
        password: 'password123',
      },
      {
        firstName: 'Lucía',
        lastName1: 'Ramírez',
        lastName2: 'Blanco',
        email: 'lucia.ramirez@example.com',
        phoneNumber: '789789789',
        role: 'Admin',
        idNumber: 'A6789012',
        password: 'password123',
      },
    ]);

    // Crear Inventario
    const inventoryItems = await Inventory.insertMany([
      {
        name: 'Taladro Eléctrico',
        category: 'Herramienta',
        description: 'Taladro para uso general.',
        quantity: 5,
        status: 'active',
      },
      {
        name: 'Multímetro',
        category: 'Instrumento',
        description: 'Multímetro digital para medir voltaje y resistencia.',
        quantity: 10,
        status: 'active',
      },
      {
        name: 'Cinta Métrica',
        category: 'Herramienta',
        description: 'Cinta métrica de 5 metros.',
        quantity: 20,
        status: 'active',
      },
    ]);

    // Crear Solicitudes
    const requests = await Request.insertMany([
      {
        requesterId: users[0]._id,
        requestedResources: [
          { resourceId: inventoryItems[0]._id, quantity: 1 },
          { resourceId: inventoryItems[1]._id, quantity: 1 },
        ],
        requestDate: new Date(),
        status: 'pending',
      },
      {
        requesterId: users[1]._id,
        requestedResources: [
          { resourceId: inventoryItems[2]._id, quantity: 1 },
        ],
        requestDate: new Date(),
        status: 'pending',
      },
    ]);

    // Crear Préstamos
    const loans = await Loan.insertMany([
      {
        borrowerId: users[0]._id,
        resources: [
          { resourceId: inventoryItems[0]._id, quantity: 1 },
          { resourceId: inventoryItems[1]._id, quantity: 1 },
        ],
        requestDate: requests[0].requestDate,
        loanDate: new Date(),
        status: 'in-progress',
      },
    ]);

    // Crear Alerta de Stock Bajo
    const alerts = await Alert.insertMany([
      {
        type: 'low-stock',
        message: 'El stock del Taladro Eléctrico está bajo.',
        userId: users[4]._id, // Pañolero
        status: 'active',
      },
    ]);

    console.log('Datos insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedData();