import React, { useState } from 'react';
// import './UserPage.css';

const UserPage = () => {
  console.log('UserPage');
  console.log(localStorage);
  const [user, setUser] = useState({
    name: localStorage.name,
    email: localStorage.email,
    password: '',
    role: localStorage.role,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleEditClick = () => {
    setFormData({ name: user.name, email: user.email, password: '' });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    localStorage.setItem('name', formData.name);
    localStorage.setItem('email', formData.email);
    //Falta mandar consulta al backend para actualizar la información
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-page-container">
      <h1>Información del Usuario</h1>

      <div className="user-details">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        {/* <p><strong>Estado:</strong> {user.estado}</p> */}
        <button onClick={handleEditClick} className="edit-button">Editar Datos</button>
      </div>

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Editar Información</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
