import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryTable = ({ inventoryData }) => {
  const handleTrack = (item) => {
    if (item.borrower) {
      alert(`El artículo "${item.name}" está prestado a:\nNombre: ${item.borrower.name}\nCorreo: ${item.borrower.email}`);
    } else {
      alert(`El artículo "${item.name}" está disponible.`);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">Inventario de la Biblioteca</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleTrack(item)}
                  >
                    Rastrear
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
