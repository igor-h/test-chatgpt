const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const config = require('./config/config');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./utils');

// Configurar la conexión a la base de datos
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Configurar la aplicación Express
const app = express();

// Configurar los middleware de la aplicación
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Configurar las rutas de la aplicación
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Configurar el middleware para manejar los errores
app.use((err, req, res, next) => {
  errorHandler(err, res, err.status || 500);
});

// Iniciar la aplicación
app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});