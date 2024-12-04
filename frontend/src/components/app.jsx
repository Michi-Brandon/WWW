import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login_page';
import Layout from './Layout';
import Layout_admin from './layout_admin';
import Register from '../pages/register_page';

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: localStorage.getItem('token') ? true : false,  // Corregido
    role: localStorage.getItem('role'),  // 'usuario' o 'admin'
  });

  const handleLogin = (role) => {
    setAuth({ isAuthenticated: true, role });
    localStorage.setItem('token', 'userToken');  // Guarda el token en el localStorage
    localStorage.setItem('role', role);  // Guarda el rol en el localStorage
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, role: null });
    localStorage.removeItem('token');  // Elimina el token de localStorage
    localStorage.removeItem('role');  // Elimina el rol de localStorage
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para el login */}
        <Route
          path="/login"
          element={
            auth.isAuthenticated ? (
              auth.role === 'admin' ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/home" />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Ruta para el register */}
        <Route path="/register" element={<Register/>} />


        {/* Ruta para los administradores */}
        {auth.isAuthenticated && auth.role === 'admin' && (
          <Route path="/admin/*" element={<Layout_admin onLogout={handleLogout} />} />
        )}

        {/* Ruta para los usuarios */}
        {auth.isAuthenticated && auth.role === 'usuario' && (
          <Route path="/home/*" element={<Layout onLogout={handleLogout} />} />
        )}

        {/* Ruta de redirección para no autenticados */}
        {!auth.isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
