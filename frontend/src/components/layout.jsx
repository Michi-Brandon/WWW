import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home_page';
import SolidPage from '../pages/solicitud_page';
import NavBar from '../components/nav_bar';
import UserPage from '../pages/user_page';
import axios from 'axios';

//import materials from '../data/card_data';
//import requests from '../data/solicitud_data';

const Layout = ({ onLogout }) => {
  const [materials, setMaterials] = useState([]);
  const [requests, setRequests] = useState([]);

  // Obtener los materiales de la API
  useEffect(() => {
    console.log('Obteniendo materiales...');
    getMaterials();
  }, []);

  // Obtener las solicitudes de la API
  useEffect(() => {
    console.log('Obteniendo solicitudes...');
    getRequests();
  }, []);

  const getMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      const data = await response.data;
      //console.log('inventario: ',data);
      setMaterials(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/requests');
      const data = await response.data;
      //console.log('solicitudes: ',data);
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el clic en el botón de MaterialCard
  const handleMaterialCardClick = (item) => {
    const userName = localStorage.name; // Puedes modificar esto para obtener el usuario real
    const date = new Date().toLocaleString(); // Fecha y hora actual

    console.log(`Artículo: ${item}, Usuario: ${userName}, Fecha: ${date}`);
    // Aquí podrías añadir lógica para registrar el préstamo en tu base de datos o sistema

    const requestData = {
      "requesterId": localStorage.id,
      "resourceId": item._id,
      "requestDate": date
    };
    console.log(requestData);
    // Lógica adicional para enviar la solicitud al backend
    try {
      axios.post('http://localhost:5000/api/requests', requestData);
      console.log('Solicitud enviada');
    } catch (error) {
      console.error(error);
    }
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
    try {
      axios.put('http://localhost:5000/api/auth/'+localStorage.getItem('id'), updatedUser);
      console.log('Usuario actualizado: ', updatedUser);
    } catch (error) {
      console.error(error);
    }



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
