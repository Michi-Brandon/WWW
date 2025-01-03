import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar las credenciales al backend

      console.log(email,password);

      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Si el login es exitoso, guarda el token en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('id', data.user._id);

      console.log(localStorage);
      
      // Llama a onLogin pasando el rol del usuario
      onLogin(role);
    } catch (error) {
      console.error('Error de login 2', error);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className='login-title'>Iniciar Sesión</h2>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            className='form-imput'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            className='form-imput'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Rol</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit" className="login-button">
          Ingresar
        </button>

        <button type="button" className="register-button" onClick={() => navigate("/register")}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;
