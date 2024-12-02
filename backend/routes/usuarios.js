const express = require('express');
const { registro, login } = require('../controllers/usuarioController');

const router = express.Router();

// Ruta para registrar usuarios
router.post('/registro', registro);

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router;
