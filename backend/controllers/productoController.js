const db = require('../database/db');

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
  db.all('SELECT * FROM producto', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los productos.' });
    }
    res.status(200).json(rows);
  });
};

// Agregar un nuevo producto
exports.agregarProducto = (req, res) => {
  const { nombre, precio, descuento, img } = req.body;

  if (!nombre || !precio || descuento === undefined || !img) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const query = 'INSERT INTO producto (nombre, precio, descuento, img) VALUES (?, ?, ?, ?)';
  db.run(query, [nombre, precio, descuento, img], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error al agregar el producto.' });
    }
    res.status(200).json({ message: 'Producto agregado correctamente.', id: this.lastID });
  });
};

exports.getProductosConDescuento = (req, res) => {
  const query = 'SELECT * FROM producto WHERE descuento > 0';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al obtener productos con descuento' });
    } else {
      res.json(rows);
    }
  });
};

