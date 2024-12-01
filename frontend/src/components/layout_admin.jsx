import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from '../components/nav_bar_admin'
import AdminSection from '../pages/admin_page'
import AdminUser from '../pages/admin_user_page'

const Layout_admin = () => {
  return (
    <div className='layout'>
      <h1 className='layout__title'>escula prestigiosa</h1>
      <NavBar />
      <div className='layout__page'>
        <Routes>
          <Route path='' element={<AdminSection />} />
          <Route path='autenticar-usuario' element={<AdminSection />} />
          <Route path='administrar-usuario' element={<AdminUser />} />
          <Route path='administrar-inventario' element={<AdminSection />} />
          <Route path='generar-reportes' element={<AdminSection />} />
          <Route path='administrar-solicitudes' element={<AdminSection />} />
          <Route path='administrar-prestamo' element={<AdminSection />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout_admin
