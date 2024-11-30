const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Importar archivos de rutas
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const requestRoutes = require('./routes/requestRoutes');
const loanRoutes = require('./routes/loanRoutes');
const alertRoutes = require('./routes/alertRoutes');

dotenv.config();  // Cargar las variables de entorno
connectDB();  // Conectar a la base de datos

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/alerts', alertRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));