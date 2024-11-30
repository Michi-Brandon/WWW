const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');  // Importar las rutas

dotenv.config();  // Cargar las variables de entorno
connectDB();  // Conectar a la base de datos

const app = express();
app.use(express.json());  // Permite que el servidor reciba datos en formato JSON
app.use('/api/auth', authRoutes);  // Usar las rutas de autenticación

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
