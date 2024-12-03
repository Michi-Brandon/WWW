import React, { useState } from 'react';

const AdminSolid = ({ solidData, onButtonClick }) => {
  const [selectedSolid, setSelectedSolid] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Administrar Solicitudes</h2>
      <div className="row">
        {/* Lista de solicitudes */}
        <div className="col-md-4">
          <h4>Solicitudes</h4>
          <ul className="list-group">
            {solidData.map((solid) => (
              <li
                key={solid.id}
                className={`list-group-item ${selectedSolid?.id === solid.id ? 'active' : ''}`}
                onClick={() => setSelectedSolid(solid)}
                style={{ cursor: 'pointer' }}
              >
                <strong>Fecha:</strong> {solid.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Detalle de la solicitud */}
        <div className="col-md-8">
          {selectedSolid ? (
            <div className="card">
              <div className="card-header">
                <h4>Detalle de la Solicitud</h4>
              </div>
              <div className="card-body">
                <p><strong>Producto:</strong> {selectedSolid.product}</p>
                <p><strong>Usuario:</strong> {selectedSolid.user.name}</p>
                <p><strong>Correo:</strong> {selectedSolid.user.email}</p>
                <p><strong>Fecha de Solicitud:</strong> {selectedSolid.date}</p>
                <button
                  className="btn btn-success"
                  onClick={() => onButtonClick(selectedSolid)}
                >
                  Aprobar Préstamo
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">Seleccione una solicitud para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSolid;
