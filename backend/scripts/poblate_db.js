// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Inventory = require('../models/Inventory');
const Request = require('../models/Request');
const Loan = require('../models/Loan');
const Alert = require('../models/Alert');

const getUsersWithHashedPasswords = require('./data/user_data');
const inv_data = require('./data/inventory_data.js');

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
    const usersWithHashedPasswords = await getUsersWithHashedPasswords();
    const users = await User.insertMany(usersWithHashedPasswords);

    // Modificar inventoryData para usar los ObjectId de los usuarios
    const updatedInventoryData = inv_data.map(item => {
      // Asignar un usuario aleatorio (o específico) a los campos 'borrower'
      if (item.borrower) {
        // Asegúrate de asignar un ObjectId válido, si no existe puedes hacer referencia al primer usuario (ejemplo)
        const user = users.find(user => user.email === item.borrower.email);
        if (user) {
          item.borrower = user._id;  // Asigna el ObjectId del usuario
        } else {
          item.borrower = null;  // Si no hay un usuario, asigna null
        }
      }
      return item;
    });

    // Crear Inventario con los datos actualizados
    const inventoryItems = await Inventory.insertMany(updatedInventoryData);

    const requests = await Request.insertMany([
      {
        requesterId: users[0]._id,  // Juan Pérez
        resourceId: inventoryItems[0]._id,  // 'El Quijote'
        requestDate: new Date(),
        status: 'pending',
        inventoryName: inventoryItems[0].name,
        inventoryDescription: inventoryItems[0].description,
      },
      {
        requesterId: users[1]._id,  // María Gómez
        resourceId: inventoryItems[1]._id,  // 'Matemáticas Avanzadas'
        requestDate: new Date(),
        status: 'pending',
        inventoryName: inventoryItems[1].name,
        inventoryDescription: inventoryItems[1].description,
      },
    ]);

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
    ])

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