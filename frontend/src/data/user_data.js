// user_data.js

const users = [
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@example.com",
      rut: "12345678-9",
      carrera: "Ingeniería Informática",
      solicitudes: {
        pendientes: 3,
        aceptadas: 7,
        atrasadas: 2,
      },
      estado: "Habilitado",
    },
    {
      id: 2,
      firstName: "María",
      lastName: "Gómez",
      email: "maria.gomez@example.com",
      rut: "98765432-1",
      carrera: "Ingeniería Civil",
      solicitudes: {
        pendientes: 1,
        aceptadas: 5,
        atrasadas: 0,
      },
      estado: "Bloqueado",
    },
    {
      id: 3,
      firstName: "Carlos",
      lastName: "Lopez",
      email: "carlos.lopez@example.com",
      rut: "19283746-5",
      carrera: "Diseño Gráfico",
      solicitudes: {
        pendientes: 4,
        aceptadas: 3,
        atrasadas: 1,
      },
      estado: "Habilitado",
    },
    {
      id: 4,
      firstName: "Ana",
      lastName: "Martínez",
      email: "ana.martinez@example.com",
      rut: "45678912-3",
      carrera: "Medicina",
      solicitudes: {
        pendientes: 2,
        aceptadas: 6,
        atrasadas: 0,
      },
      estado: "Bloqueado",
    },
    {
      id: 5,
      firstName: "Luis",
      lastName: "Hernández",
      email: "luis.hernandez@example.com",
      rut: "23456789-0",
      carrera: "Derecho",
      solicitudes: {
        pendientes: 0,
        aceptadas: 9,
        atrasadas: 1,
      },
      estado: "Habilitado",
    },
  ];
  
  export default users;
  