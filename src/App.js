import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Productos from './components/Productos';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Descuentos from './components/Descuentos';
import Carrito from './components/Carrito';
import AgregarProducto from './components/AgregarProducto'; // Importar el nuevo componente

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Televisión UHD 4K Sony', precio: 299.99, descuento: 15, img: 'https://via.placeholder.com/200' },
    { id: 2, nombre: 'PS5 Pro', precio: 199.99, descuento: 0, img: 'https://via.placeholder.com/200' },
  ]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleLogout = () => {
    setUser(null);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== productoId));
  };

  const confirmarCompra = () => {
    if (carrito.length > 0) {
      alert('¡Compra confirmada! Gracias por tu pedido.');
      setCarrito([]);
    } else {
      alert('El carrito está vacío.');
    }
  };

  const agregarProducto = (producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                {user && <p className="welcome-message">Bienvenido, {user.nombre}</p>}
                <Productos
                  productos={productos}
                  searchTerm={searchTerm}
                  onAddToCart={agregarAlCarrito}
                  user={user}
                />
              </>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/descuentos" element={<Descuentos onAddToCart={agregarAlCarrito} />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                onRemove={eliminarDelCarrito}
                onConfirm={confirmarCompra}
                user={user}
              />
            }
          />
          <Route
            path="/agregar-producto"
            element={<AgregarProducto agregarProducto={agregarProducto} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
