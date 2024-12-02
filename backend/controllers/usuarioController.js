const db = require('../database/db'); // Conexión a SQLite

// Registro de usuarios
exports.registro = (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  // Validar que los campos requeridos no estén vacíos
  if (!nombre || !correo || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Consulta para insertar el usuario en la base de datos
    const query = `
      INSERT INTO usuario (nombre, correo, password, rol)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [nombre, correo, password, rol || 'user'], function (err) {
      if (err) {
        // Manejar errores de duplicidad (correo único)
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
    console.error('Error interno:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Login de usuarios
exports.login = (req, res) => {
  const { correo, password } = req.body;

  // Validar que ambos campos estén presentes
  if (!correo || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  try {
    // Consulta para buscar al usuario por correo y contraseña
    const query = `
      SELECT * FROM usuario WHERE correo = ? AND password = ?
    `;

    db.get(query, [correo, password], (err, row) => {
      if (err) {
        console.error('Error al consultar usuario:', err.message);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }

      if (!row) {
        // Si no se encuentra un usuario con las credenciales dadas
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Si las credenciales son correctas
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: row.id,
          nombre: row.nombre,
          correo: row.correo,
          rol: row.rol,
        },
      });
    });
  } catch (error) {
    console.error('Error interno:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
