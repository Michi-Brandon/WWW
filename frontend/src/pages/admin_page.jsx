import React from 'react';

const AdminSection = () => {
  return (
    <div className="admin-section-container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="mb-4">Sección de Administración</h1>
        <p className="mb-4">Bienvenido al panel de administración. Selecciona una opción:</p>
        <ul className="list-unstyled">
          <li className="mb-2">
            <a href="/admin/usuarios" className="btn btn-primary w-100">
              Administrar Usuarios
            </a>
          </li>
          <li className="mb-2">
            <a href="/admin/solicitudes" className="btn btn-secondary w-100">
              Administrar Solicitudes
            </a>
          </li>
          <li>
            <a href="/admin/reportes" className="btn btn-info w-100">
              Ver Reportes
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSection;
