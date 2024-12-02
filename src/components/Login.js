import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para mostrar un indicador de carga
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia el estado de carga
    try {
      const response = await axios.post('http://localhost:8080/usuarios/login', {
        correo: email,
        password,
      });

      setUser(response.data.user); // Guarda el usuario en el estado global
      alert(response.data.message); // Mensaje del backend
      navigate('/'); // Redirige al inicio
    } catch (error) {
      alert(error.response?.data?.message || 'Error al iniciar sesión'); // Mensaje del error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
      <div className="signup-link">
        <p>
          ¿No tienes cuenta? <Link to="/signup">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
