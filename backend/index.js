const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos'); // Agregar rutas de productos

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes); // Nueva ruta para productos

// Ruta base para verificar el servidor
app.get('/', (req, res) => {
  res.send('API activa y funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
