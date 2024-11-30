import React, { useState } from 'react';
import Login from './components/Login';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <h1>Bienvenido al Sistema de Pañol</h1>
      <p>Token: {token}</p>
    </div>
  );
};

export default App;
