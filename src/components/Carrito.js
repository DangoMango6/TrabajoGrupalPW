import React from 'react';
import './Carrito.css';
import { calcularPrecioConDescuento } from '../utils'; // Asegúrate de importar correctamente

const Carrito = ({ carrito, onRemove, onConfirm, user }) => {
  // Calcula el total del carrito
  const calcularTotal = () => {
    return carrito
      .reduce((total, item) => {
        const precioFinal = calcularPrecioConDescuento(item.precio, item.descuento);
        return total + (typeof precioFinal === 'number' ? precioFinal : 0);
      }, 0)
      .toFixed(2);
  };

  // Maneja la confirmación de compra
  const handleConfirmPurchase = () => {
    if (!user) {
      alert('Debes iniciar sesión para confirmar la compra.');
      return;
    }
    onConfirm();
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="carrito-list">
            {carrito.map((producto, index) => {
              const precioFinal = calcularPrecioConDescuento(producto.precio, producto.descuento);

              return (
                <li key={index} className="carrito-item">
                  <img
                    src={producto.img || 'https://via.placeholder.com/150'}
                    alt={producto.nombre || 'Producto sin nombre'}
                    className="carrito-item-image"
                  />
                  <div className="item-info">
                    <p className="item-name">{producto.nombre || 'Producto sin nombre'}</p>
                    {producto.descuento > 0 ? (
                      <p className="item-price">
                        <span className="precio-original">${producto.precio?.toFixed(2) || '0.00'}</span>{' '}
                        <span className="precio-con-descuento">
                          ${precioFinal?.toFixed(2) || '0.00'} ({producto.descuento}% Dcto.)
                        </span>
                      </p>
                    ) : (
                      <p className="item-price">${producto.precio?.toFixed(2) || '0.00'}</p>
                    )}
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => onRemove(producto.id)}
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="carrito-total">
            <h3>Total: ${calcularTotal()}</h3>
          </div>
          <button className="confirm-button" onClick={handleConfirmPurchase}>
            Confirmar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
