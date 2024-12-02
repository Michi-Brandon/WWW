import React from "react";

const GenerateReports = () => {
  const generalInventory = [
    { id: 1, name: "Recurso A", quantity: 10, status: "Disponible" },
    { id: 2, name: "Recurso B", quantity: 5, status: "No disponible" },
  ];

  const mostRequestedResources = [
    { id: 1, name: "Recurso A", requests: 50 },
    { id: 2, name: "Recurso B", requests: 30 },
  ];

  const lateReturns = [
    { resource: "Recurso A", user: "Usuario 1", lateDays: 3 },
    { resource: "Recurso B", user: "Usuario 2", lateDays: 2 },
  ];

  const highLossResources = [
    { name: "Recurso C", losses: 20 },
    { name: "Recurso D", losses: 15 },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Reportes</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">Reporte General</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {generalInventory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              Recursos Más Solicitados
            </div>
            <div className="card-body">
              <ul className="list-group">
                {mostRequestedResources.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.name}
                    <span className="badge bg-success rounded-pill">{item.requests} solicitudes</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-warning text-dark">Devoluciones Fuera de Plazo</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Recurso</th>
                    <th>Usuario</th>
                    <th>Días Tarde</th>
                  </tr>
                </thead>
                <tbody>
                  {lateReturns.map((item, index) => (
                    <tr key={index}>
                      <td>{item.resource}</td>
                      <td>{item.user}</td>
                      <td>{item.lateDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-danger text-white">Recursos con Más Pérdidas</div>
            <div className="card-body">
              <ul className="list-group">
                {highLossResources.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.name}
                    <span className="badge bg-danger rounded-pill">{item.losses} pérdidas</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReports;