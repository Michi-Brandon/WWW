import React, { useState, useEffect } from 'react';

const UserList = ({ users, selectedUser, onSelect, page, setPage, itemsPerPage }) => {
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="card h-100">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h5 className="mb-0">Usuarios</h5>
        <div>
          <button
            className="btn btn-sm btn-light me-1"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            &lt;
          </button>
          <button
            className="btn btn-sm btn-light"
            onClick={() => setPage((prev) => (startIndex + itemsPerPage < users.length ? prev + 1 : prev))}
            disabled={startIndex + itemsPerPage >= users.length}
          >
            &gt;
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {paginatedUsers.map((user) => (
          <li
            key={user._id}
            className={`list-group-item ${
              selectedUser?._id === user._id ? 'active' : ''
            }`}
            onClick={() => onSelect(user)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between">
              <span>{user.name} {user.lastName}</span>
              <small className="text-muted">{user.email}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserDetails = ({ selectedUser, onBlock }) => {
  if (!selectedUser) {
    return <p>Selecciona un usuario para ver los detalles.</p>;
  }

  const { lastName, name, email, rut, career, requests, estado } = selectedUser;

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">Detalles del Usuario</h5>
        <p>
          <strong>Apellidos:</strong> {lastName || 'N/A'}
        </p>
        <p>
          <strong>Nombre:</strong> {name || 'N/A'}
        </p>
        <p>
          <strong>Correo:</strong> {email || 'N/A'}
        </p>
        <p>
          <strong>RUT:</strong> {rut || 'N/A'}
        </p>
        <p>
          <strong>Carrera:</strong> {career || 'N/A'}
        </p>
        <div className="my-4">
          <h6>Solicitudes</h6>
          <ul>
            <li>Pendientes: {requests?.pending || 0}</li>
            <li>Aceptadas: {requests?.accepted || 0}</li>
            <li>Atrasadas: {requests?.overdue || 0}</li>
          </ul>
        </div>
        <button
          className={`btn ${estado ? 'btn-success' : 'btn-danger'}`}
          onClick={() => onBlock(selectedUser._id)}
        >
          {estado ? 'Desbloquear Usuario' : 'Bloquear Usuario'}
        </button>
      </div>
    </div>
  );
};

const AdminUser = ({ users, onButtonClick }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Efecto para actualizar el usuario seleccionado cuando cambien los usuarios
  useEffect(() => {
    if (selectedUser) {
      const updatedUser = users.find((user) => user._id === selectedUser._id);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  }, [users]);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna izquierda: Lista de usuarios */}
        <div className="col-lg-4 col-md-5 mb-3">
          <UserList
            users={users}
            selectedUser={selectedUser}
            onSelect={setSelectedUser}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
          />
        </div>

        {/* Columna derecha: Detalles del usuario */}
        <div className="col-lg-8 col-md-7">
          <UserDetails selectedUser={selectedUser} onBlock={onButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
