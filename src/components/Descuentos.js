import React, { useEffect, useState } from 'react';
import './Productos.css';
import { calcularPrecioConDescuento } from '../utils';
import axios from 'axios';

const Descuentos = ({ onAddToCart }) => {
  const [productosConDescuento, setProductosConDescuento] = useState([]);

  useEffect(() => {
    // Llamada al backend para obtener productos con descuento
    const fetchProductosConDescuento = async () => {
      try {
        const response = await axios.get('http://localhost:8080/productos/descuentos');
        setProductosConDescuento(response.data);
      } catch (error) {
        console.error('Error al obtener productos con descuento:', error);
      }
    };

    fetchProductosConDescuento();
  }, []);

  return (
    <section className="productos">
      <h2>Nuestros mejores descuentos!</h2>
      <div className="productos-grid">
        {productosConDescuento.length > 0 ? (
          productosConDescuento.map((producto) => {
            const precioConDescuento = calcularPrecioConDescuento(producto.precio, producto.descuento);

            return (
              <div key={producto.id} className="producto-card">
                <img src={producto.img} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <div className="precios">
                  <p className="precio-original">S/ {producto.precio.toFixed(2)}</p>
                  <p className="precio-con-descuento">
                    S/ {precioConDescuento.toFixed(2)} <span>({producto.descuento}% Dcto.)</span>
                  </p>
                </div>
                <button className="btn" onClick={() => onAddToCart(producto)}>
                  Agregar al carrito
                </button>
              </div>
            );
          })
        ) : (
          <p>No se encontraron productos con descuento.</p>
        )}
      </div>
    </section>
  );
};

export default Descuentos;
