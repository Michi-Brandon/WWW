import React, { useState } from 'react';

const AdminInventory = ({ initialInventory }) => {
  const [inventory, setInventory] = useState(initialInventory);

  // Estado para los valores del formulario
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, status: 'Disponible' });

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Añadir un nuevo producto al inventario
  const addItem = () => {
    if (!newItem.name || newItem.quantity <= 0) {
      alert('Por favor, ingrese un nombre válido y una cantidad mayor a 0.');
      return;
    }

    setInventory((prev) => [
      ...prev,
      { id: prev.length + 1, name: newItem.name, quantity: parseInt(newItem.quantity), status: newItem.status },
    ]);
    setNewItem({ name: '', quantity: 0, status: 'Disponible' });
  };

  // Eliminar un producto del inventario
  const removeItem = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  // Alternar el estado de un producto
  const toggleStatus = (id) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Disponible' ? 'No disponible' : 'Disponible' }
          : item
      )
    );
  };

  return (
    <div className="admin-inventory">
      <h2>Administración de Inventario de Pañol</h2>

      {/* Formulario para añadir un nuevo producto */}
      <div className="add-item-form">
        <h3>Añadir nuevo producto</h3>
        <input
          type="text"
          name="name"
          value={newItem.name}
          placeholder="Nombre del producto"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          placeholder="Cantidad"
          onChange={handleInputChange}
        />
        <select name="status" value={newItem.status} onChange={handleInputChange}>
          <option value="Disponible">Disponible</option>
          <option value="No disponible">No disponible</option>
        </select>
        <button onClick={addItem}>Añadir</button>
      </div>

      {/* Tabla del inventario */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => toggleStatus(item.id)}>
                  {item.status === 'Disponible' ? 'Marcar como No disponible' : 'Marcar como Disponible'}
                </button>
                <button onClick={() => removeItem(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInventory;
