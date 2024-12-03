// user_data.js

const bcrypt = require('bcrypt');

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Genera el salt de manera asincrónica
  return await bcrypt.hash(password, salt); // Devuelve el hash de la contraseña
};
const users = [
    {
      id: 1,
      name: "Juan",
      lastName: "Pérez",
      email: "juan.perez@example.com",
      password: "",
      rut: "12345678-9",
      carrera: "Ingeniería Informática",
      solicitudes: {
        pendientes: 3,
        aceptadas: 7,
        atrasadas: 2,
      },
      estado: 1,
    },
    {
      id: 2,
      name: "María",
      lastName: "Gómez",
      email: "maria.gomez@example.com",
      password: "",
      rut: "98765432-1",
      carrera: "Ingeniería Civil",
      solicitudes: {
        pendientes: 1,
        aceptadas: 5,
        atrasadas: 0,
      },
      estado: 0,
    },
    {
      id: 3,
      name: "Carlos",
      lastName: "Lopez",
      email: "carlos.lopez@example.com",
      password: "",
      rut: "19283746-5",
      carrera: "Diseño Gráfico",
      solicitudes: {
        pendientes: 4,
        aceptadas: 3,
        atrasadas: 1,
      },
      estado: 1,
    },
    {
      id: 4,
      name: "Ana",
      lastName: "Martínez",
      email: "ana.martinez@example.com",
      password: "",
      rut: "45678912-3",
      carrera: "Medicina",
      solicitudes: {
        pendientes: 2,
        aceptadas: 6,
        atrasadas: 0,
      },
      estado: 0,
    },
    {
      id: 5,
      name: "Luis",
      lastName: "Hernández",
      email: "luis.hernandez@example.com",
      password: "",
      rut: "23456789-0",
      carrera: "Derecho",
      solicitudes: {
        pendientes: 0,
        aceptadas: 9,
        atrasadas: 1,
      },
      estado: 1,
    },
  ];
  
// Función para asignar contraseñas hasheadas a los usuarios
const assignHashedPasswords = async (users) => {
  for (let user of users) {
    user.password = await generateHashedPassword('123'); // Asigna la contraseña hasheada
  }
  return users;
};

// Exporta la función para usarla en el seed
const getUsersWithHashedPasswords = async () => {
  const usersWithHashedPasswords = await assignHashedPasswords(users);
  return usersWithHashedPasswords;
};

module.exports = getUsersWithHashedPasswords;
  