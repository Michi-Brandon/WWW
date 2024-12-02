import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [role, setRole] = useState('superAdministrador');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-link'];
    if (isActive) classes.push('active');
    return classes.join(' ');
  };

  const menuOptions = {
    superAdministrador: [
      { label: 'Administrar Usuario', path: 'administrar-usuario' },
      { label: 'Administrar Inventario', path: 'administrar-inventario' },
      { label: 'Generar Reportes', path: 'generar-reportes' },
    ],
    Coordinador: [
      { label: 'Administrar Usuario', path: 'administrar-usuario' },
      { label: 'Administrar Solicitudes', path: 'administrar-solicitudes' },
      { label: 'Administrar Préstamo', path: 'administrar-prestamo' },
    ],
    Penolero: [
      { label: 'Administrar Inventario', path: 'administrar-inventario' },
      { label: 'Administrar Solicitudes', path: 'administrar-solicitudes' },
      { label: 'Administrar Préstamos', path: 'administrar-prestamos' },
      { label: 'Generar Reportes', path: 'generar-reportes' },
    ],
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <img
            src="/boxicon.png"
            style={{ height: '40px' }}
          />
          <button
            className="navbar-toggler d-lg-none ms-auto"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="offcanvasMenu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav me-auto">
              {menuOptions[role]?.map((option, index) => (
                <li key={index} className="nav-item">
                  <NavLink className={navLinkClass} to={option.path}>
                    {option.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center ms-auto">
              <label htmlFor="role" className="text-white me-2">
                Rol:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="superAdministrador">Super Administrador</option>
                <option value="Coordinador">Coordinador</option>
                <option value="Penolero">Penolero</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="offcanvas-menu">
          <div className="offcanvas-header">
            <button
              className="btn-close btn-close-white"
              onClick={() => setIsMenuOpen(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="list-unstyled">
              {menuOptions[role]?.map((option, index) => (
                <li key={index} className="nav-item">
                  <NavLink
                    className={navLinkClass}
                    to={option.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <label htmlFor="role-mobile" className="text-white">
                Rol:
              </label>
              <select
                id="role-mobile"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select"
              >
                <option value="superAdministrador">Super Administrador</option>
                <option value="Coordinador">Coordinador</option>
                <option value="Penolero">Penolero</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;