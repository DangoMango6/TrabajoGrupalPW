const crypto = require('crypto');
const db = require('../database/db');

exports.registro = (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  // Verifica que los datos requeridos estén presentes
  if (!nombre || !correo || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Crear hash de la contraseña
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // Consulta para insertar el usuario en la base de datos
    const query = `
      INSERT INTO usuario (nombre, correo, password, rol)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [nombre, correo, hash, rol || 'user'], function (err) {
      if (err) {
        // Si el error es de restricción de unicidad (correo duplicado)
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        // Otros errores
        console.error('Error al registrar usuario:', err.message);
        return res.status(500).json({ message: 'Error al registrar usuario' });
      }

      // Respuesta exitosa
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  } catch (error) {
    console.error('Error al procesar el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
