const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const alertRoutes = require('./routes/alertRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const requestRoutes = require('./routes/requestRoutes');
const loanRoutes = require('./routes/loanRoutes');

dotenv.config();  // Cargar las variables de entorno
connectDB();  // Conectar a la base de datos

const app = express();

// Configuración de CORS para permitir solicitudes desde localhost:3000
const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:5050'],  // Permite solicitudes desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  credentials: true,  // Permite enviar cookies si es necesario
};

app.use(cors(corsOptions));  // Habilitar CORS con las opciones definidas
app.use(express.json());  // Permite que el servidor reciba datos en formato JSON
app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);  // Usar las rutas de autenticación
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/loan', loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
