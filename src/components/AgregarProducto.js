import React, { useState } from 'react';
import axios from 'axios';
import './AgregarProducto.css';

const AgregarProducto = ({ onProductAdded }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/productos/agregar', {
        nombre,
        precio: parseFloat(precio),
        descuento: parseInt(descuento) || 0,
        img,
      });
      alert(response.data.message);
      setNombre('');
      setPrecio('');
      setDescuento('');
      setImg('');
      onProductAdded(); // Llama a la función para actualizar la lista de productos
    } catch (error) {
      console.error(error.response?.data || 'Error desconocido');
      alert(error.response?.data?.error || 'Error al agregar el producto');
    }
  };

  return (
    <div className="agregar-producto-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descuento</label>
          <input
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>URL de la Imagen</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AgregarProducto;
