import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home_page';
import SolidPage from '../pages/solicitud_page';
import NavBar from '../components/nav_bar';
import UserPage from '../pages/user_page';

import materials from '../data/card_data';
import requests from '../data/solicitud_data';



const Layout = ({ onLogout }) => {

  // Función para manejar el clic en el botón de MaterialCard
  const handleMaterialCardClick = (itemName) => {
    const userName = 'Usuario Ejemplo'; // Puedes modificar esto para obtener el usuario real
    const date = new Date().toLocaleString(); // Fecha y hora actual

    console.log(`Artículo: ${itemName}, Usuario: ${userName}, Fecha: ${date}`);
    // Aquí podrías añadir lógica para registrar el préstamo en tu base de datos o sistema
  };

  // Función para generar un ticket en SolidPage
  const generarTicket = (article, status, date) => {
    console.log(`Artículo: ${article}, Estado: ${status}, Fecha: ${date}`);
    // Lógica adicional para generar el ticket
  };

// ---------------------- section user --------------------------
  const [user, setUser] = useState({
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || '',
    role: localStorage.getItem('role') || 'Usuario', // Valor por defecto
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleEditClick = () => {
    setFormData({ name: user.name, email: user.email, password: '' });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);

    localStorage.setItem('name', formData.name);
    localStorage.setItem('email', formData.email);

    // Aquí puedes agregar la lógica para enviar los datos al backend si es necesario
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className='layout'>
      <NavBar onButtonClick={onLogout}/>
      <div className='layout__page'>
        <Routes>
          <Route path='' element={
            <HomePage materials={materials} handleMaterialCardClick={handleMaterialCardClick} />} 
          />
          <Route path='solicitudes' element={
            <SolidPage data={requests} generarTicket={generarTicket} />} 
          />
          <Route path='usuario' element={
            <UserPage
            user={user}
            isEditing={isEditing}
            formData={formData}
            onEditClick={handleEditClick}
            onInputChange={handleInputChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
            } />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
