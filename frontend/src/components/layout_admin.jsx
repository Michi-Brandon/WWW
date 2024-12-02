import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../components/nav_bar_admin'
import AdminSection from '../pages/admin_page'
import AdminUser from '../pages/admin_user_page'
import InventoryTable from '../pages/inventory_page'
import AdminSolid from '../pages/solid_aprobate_page'
import GenerateReports from '../pages/reports_page'

import inventoryData from '../data/inventory_data'
import solidData from '../data/admin_solid_data'
import users from '../data/user_data'; // Suponiendo que tienes un archivo con los datos de usuarios


const Layout_admin = ({ onLogout }) => {
  // ---------------------adminUser------------------------------------------------
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleBlockUser = (userId) => {
    // Aquí actualizas el estado del usuario (bloqueado o desbloqueado)
    console.log(`Bloqueando o desbloqueando al usuario con ID: ${userId}`);
  };

  // ------------------------------------inventoruTable------------------------------
  // Función para dar de baja productos
  const darDeBaja = (article, id) => {
    console.log(`Artículo: ${article}, con id: ${id || 1}, fue dado de baja`);
    // Lógica adicional para generar el ticket
  };

  return (
    <div className='layout'>
      <NavBar onButtonClick={onLogout}/>
      <div className='layout__page'>
        <Routes>
          <Route path='' element={<AdminSection />} />
          <Route path='administrar-usuario' element={
            <AdminUser users={users} onButtonClick={handleBlockUser}/>} 
            />
          <Route path='administrar-inventario' element={
            <InventoryTable inventoryData={inventoryData} darDeBaja={darDeBaja}/>} 
          />
          <Route path='generar-reportes' element={
            <GenerateReports />} 
          />
          <Route path='administrar-solicitudes' element={<AdminSolid solidData={solidData} />} />
          <Route path='administrar-prestamo' element={<AdminSection />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout_admin