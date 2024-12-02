import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../components/nav_bar_admin'
import AdminSection from '../pages/admin_page'
import AdminUser from '../pages/admin_user_page'
import InventoryTable from '../pages/inventory_page'

import inventoryData from '../data/inventory_data'

const Layout_admin = ({ onLogout }) => {
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
          <Route path='administrar-usuario' element={<AdminUser />} />
          <Route path='administrar-inventario' element={
            <InventoryTable inventoryData={inventoryData} darDeBaja={darDeBaja}/>} 
          />
          <Route path='generar-reportes' element={<AdminSection />} />
          <Route path='administrar-solicitudes' element={<AdminSection />} />
          <Route path='administrar-prestamo' element={<AdminSection />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout_admin