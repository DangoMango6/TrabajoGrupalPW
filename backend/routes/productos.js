const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Ruta para agregar un producto
router.post('/agregar', productoController.agregarProducto);

router.get('/descuentos', productoController.getProductosConDescuento);

module.exports = router;
