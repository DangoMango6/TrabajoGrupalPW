import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Productos.css';
import { calcularPrecioConDescuento } from '../utils';
import axios from 'axios';

const Productos = ({ searchTerm, onAddToCart, user }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  // Función para obtener productos desde el backend
  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos(); // Llama a la función cuando el componente se monte
  }, []);

  // Filtrar productos según el término de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="productos">
      <div className="productos-header">
        <h2>Nuestros Productos</h2>
        {user?.rol === 'admin' && (
          <div className="header-action">
            <button
              className="add-product-button"
              onClick={() => navigate('/agregar-producto')}
            >
              Agregar Productos
            </button>
          </div>
        )}
      </div>
      <div className="productos-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => {
            const precioConDescuento = calcularPrecioConDescuento(producto.precio, producto.descuento);

            return (
              <div key={producto.id} className="producto-card">
                <img src={producto.img} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <div
                  className={`precios ${
                    producto.descuento === 0 ? 'no-descuento' : ''
                  }`}
                >
                  {producto.descuento > 0 ? (
                    <>
                      <p className="precio-original">S/ {producto.precio.toFixed(2)}</p>
                      <p className="precio-con-descuento">
                        S/ {precioConDescuento.toFixed(2)} <span>({producto.descuento}% Dcto.)</span>
                      </p>
                    </>
                  ) : (
                    <p className="precio-sin-descuento">S/ {producto.precio.toFixed(2)}</p>
                  )}
                </div>
                <button className="btn" onClick={() => onAddToCart(producto)}>
                  Agregar al carrito
                </button>
              </div>
            );
          })
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </section>
  );
};

export default Productos;
