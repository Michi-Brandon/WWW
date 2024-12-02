import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../components/nav_bar_admin'
import AdminSection from '../pages/admin_page'
import AdminUser from '../pages/admin_user_page'
import InventoryTable from '../pages/inventory_page'

import inventoryData from '../data/inventory_data'

const Layout_admin = ({ onLogout }) => {
  return (
    <div className='layout'>
      <NavBar />
      <button onClick={onLogout}>Logout</button> {/* Botón de logout */}
      <div className='layout__page'>
        <Routes>
          <Route path='' element={<AdminSection />} />
          <Route path='administrar-usuario' element={<AdminUser />} />
          {/* <Route path='administrar-inventario' element={<AdminUser />} /> */}
          <Route path='administrar-inventario' element={<InventoryTable inventoryData={inventoryData} />} />
          <Route path='generar-reportes' element={<AdminSection />} />
          <Route path='administrar-solicitudes' element={<AdminSection />} />
          <Route path='administrar-prestamo' element={<AdminSection />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout_admin