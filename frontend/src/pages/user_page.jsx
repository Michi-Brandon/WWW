import React, { useState } from 'react';
// import './UserPage.css';

const UserPage = () => {
  const [user, setUser] = useState({
    nombre: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    contrasena: '',
    rol: 'Estudiante',
    estado: 'Habilitado'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', correo: '', contrasena: '' });

  const handleEditClick = () => {
    setFormData({ nombre: user.nombre, correo: user.correo, contrasena: '' });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-page-container">
      <h1>Información del Usuario</h1>

      <div className="user-details">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Estado:</strong> {user.estado}</p>
        <button onClick={handleEditClick} className="edit-button">Editar Datos</button>
      </div>

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Editar Información</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="correo">Correo:</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contrasena">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  placeholder="Dejar en blanco para no cambiar"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="save-button">Guardar</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
