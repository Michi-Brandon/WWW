import React from 'react';

const UserPage = ({ user, isEditing, formData, onEditClick, onInputChange, onSave, onCancel }) => {
  return (
    <div className="user-page-container">
      <h1>Información del Usuario</h1>

      <div className="user-details">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <button onClick={onEditClick} className="edit-button">Editar Datos</button>
      </div>

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Editar Información</h2>
            <form onSubmit={onSave}>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onInputChange}
                  placeholder="Dejar en blanco para no cambiar"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="save-button">Guardar</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
