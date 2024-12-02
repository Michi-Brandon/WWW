import React, { useState, useEffect } from 'react';

const InventoryTable = ({ inventoryData, darDeBaja }) => {
  console.log(inventoryData)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detectar tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // True para pantallas menores a 768px (SM)
    };

    handleResize(); // Ejecutar en el primer render
    window.addEventListener('resize', handleResize); // Escuchar cambios de tamaño de pantalla

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">Inventario de la Biblioteca</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => darDeBaja(item.title, index)}
                  >
                    Dar de baja
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
