import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import './Navbar.css';
import Menu from './Menu';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <button onClick={closeMenu}>
              <Link to="/">
                <img src="/imagenes/logo2.png" alt="Logo" className="logo-img" />
              </Link>
          </button>
        </div>

        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        <div className="login-cart">
          {user ? (
            <button className="btn logout-btn" onClick={onLogout}>
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login" className="btn login-btn">
              Iniciar sesión
            </Link>
          )}
          <div className="cart">
            <button onClick={closeMenu}>
              <span role="img" aria-label="cart">
                <Link to="/Carrito" className="btn login-btn">
                  🛒
                </Link>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
