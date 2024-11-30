import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <Home token={token} />
    </div>
  );
};

export default App;
