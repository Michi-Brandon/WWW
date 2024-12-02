import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home_page';
import SolidPage from '../pages/solicitud_page';
import NavBar from '../components/nav_bar';
import UserPage from '../pages/user_page';

const Layout = ({ onLogout }) => {
  return (
    <div className='layout'>
      <NavBar />
      <div className='layout__page'>
        <button onClick={onLogout}>Logout</button> {/* Botón de logout */}
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='solicitudes' element={<SolidPage />} />
          <Route path='usuario' element={<UserPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
