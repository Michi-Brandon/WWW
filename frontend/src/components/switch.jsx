import React, { useState } from 'react';
import Login from '../pages/login_page';
import Register from '../pages/register_page';

const Switch = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="switch-container">
      <div className="switch-buttons">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? 'active' : ''}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? 'active' : ''}
        >
          Registrarse
        </button>
      </div>
      <div className="switch-content">
        {isLogin ? <Login onLogin={onLogin} /> : <Register />}
      </div>
    </div>
  );
};


export default Switch;
