import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="menu-container">
      <img
        src='./imagenes/menulogo.png'
        alt="MenuRip"
        className="menu-button"
        onClick={toggleMenu}
      />

      {isMenuOpen && (
        <div className="menu-options">
          <Link to="/" onClick={closeMenu}>
            <button className="menu-option">Ripley</button>
          </Link>
          <Link to="/login" onClick={closeMenu}>
            <button className="menu-option">Iniciar sesión</button>
          </Link>
          <Link to="/descuentos" onClick={closeMenu}>
            <button className="menu-option">¡Grandes Ofertas!</button>
          </Link>
          <Link to="/Signup" onClick={closeMenu}>
            <button className="menu-option">Regístrate con nosotros</button>
          </Link>
          <Link to="/Carrito" onClick={closeMenu}>
            <button className="menu-option">Tu carrito de compra</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
