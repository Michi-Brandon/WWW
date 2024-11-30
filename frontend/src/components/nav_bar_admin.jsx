import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [role, setRole] = useState('superAdministrador'); // Estado inicial con el rol por defecto

  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-bar__link'];
    if (isActive) classes.push('nav-bar__link--active');
    return classes.join(' ');
  };

  // Opciones de navegación por rol
  const menuOptions = {
    superAdministrador: [
      { label: 'Autenticar Usuario', path: 'autenticar-usuario' },
      { label: 'Administrar Usuario', path: 'administrar-usuario' },
      { label: 'Administrar Inventario', path: 'administrar-inventario' },
      { label: 'Generar Reportes', path: 'generar-reportes' },
    ],
    Coordinador: [
      { label: 'Autenticar Usuario', path: 'autenticar-usuario' },
      { label: 'Administrar Usuario', path: 'administrar-usuario' },
      { label: 'Administrar Solicitudes', path: 'administrar-solicitudes' },
      { label: 'Administrar Préstamo', path: 'administrar-prestamo' },
    ],
    Penolero: [
      { label: 'Autenticar Usuario', path: 'autenticar-usuario' },
      { label: 'Administrar Inventario', path: 'administrar-inventario' },
      { label: 'Administrar Solicitudes', path: 'administrar-solicitudes' },
      { label: 'Administrar Préstamos', path: 'administrar-prestamos' },
      { label: 'Generar Reporte', path: 'generar-reporte' },
    ],
  };

  return (
    <div>
      <nav className='nav-bar'>
        {menuOptions[role]?.map((option, index) => (
          <NavLink key={index} className={navLinkClass} to={option.path}>
            {option.label}
          </NavLink>
        ))}
      </nav>

      {/* Selector para cambiar de rol */}
      <div className='role-selector'>
        <label htmlFor='role'>Selecciona un rol: </label>
        <select id='role' value={role} onChange={(e) => setRole(e.target.value)}>
          <option value='superAdministrador'>Super Administrador</option>
          <option value='Coordinador'>Coordinador</option>
          <option value='Penolero'>Penolero</option>
        </select>
      </div>
    </div>
  );
};

export default NavBar;

