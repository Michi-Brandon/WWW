import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ onButtonClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado simulado para el indicador dinámico
  const debtStatus = "Sin Deudas"; //Acepta "Moroso" y "Sin Deudas"
  
  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-link'];
    if (isActive) classes.push('active');
    return classes.join(' ');
  };

  return (
    <div>
      <nav className="navbar navbar-custom navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <img
            src="/boxicon.png"
            style={{ height: '40px' }}
            alt="Logo"
          />

          {/* Indicador dinámico */}
          <div className="navbar-debt-status text-center">
            {debtStatus === "Moroso" ? (
              <div className="status-box status-warning">
                Moroso
              </div>
            ) : (
              <div className="status-box status-success">
                Sin Deudas
              </div>
            )}
          </div>

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
              <li className="nav-item">
                <NavLink className={navLinkClass} to="">
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="solicitudes">
                  Mis Solicitudes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="usuario">
                  Usuario
                </NavLink>
              </li>
            </ul>
            <button className="btn btn-danger ms-auto" onClick={onButtonClick}>
              Logout
            </button>
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
              <li className="nav-item">
                <NavLink
                  className={navLinkClass}
                  to=""
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={navLinkClass}
                  to="solicitudes"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mis Solicitudes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={navLinkClass}
                  to="usuario"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Usuario
                </NavLink>
              </li>
            </ul>
          </div>
          <button className="btn btn-danger w-100 mt-3" onClick={onButtonClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
