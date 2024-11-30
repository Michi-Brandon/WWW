import React, { useState } from 'react';
import requests from '../data/solicitud_data';

const RequestList = ({ requests, selectedRequest, onSelect, page, setPage, itemsPerPage }) => {
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedRequests = requests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="card h-100">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h5 className="mb-0">Solicitudes</h5>
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
            onClick={() => setPage((prev) => (startIndex + itemsPerPage < requests.length ? prev + 1 : prev))}
            disabled={startIndex + itemsPerPage >= requests.length}
          >
            &gt;
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {paginatedRequests.map((request) => (
          <li
            key={request.id}
            className={`list-group-item ${
              selectedRequest?.id === request.id ? 'active' : ''
            }`}
            onClick={() => onSelect(request)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between">
              <span>{request.title}</span>
              <small className="text-muted">{request.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RequestDetails = ({ selectedRequest }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        {selectedRequest ? (
          <>
            <h5 className="card-title">Detalles de la Solicitud</h5>
            <p>
              <strong>Nombre:</strong> {selectedRequest.title}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedRequest.description}
            </p>
            <p>
              <strong>Fecha de Petición:</strong> {selectedRequest.date}
            </p>
            <p>
              <strong>Estado:</strong>{' '}
              <span
                className={`badge ${
                  selectedRequest.status === 'Pendiente'
                    ? 'bg-warning text-dark'
                    : selectedRequest.status === 'Aprobado'
                    ? 'bg-success'
                    : 'bg-danger'
                }`}
              >
                {selectedRequest.status}
              </span>
            </p>
            <a
              href={selectedRequest.ticket}
              download
              className="btn btn-primary"
            >
              Descargar Ticket
            </a>
          </>
        ) : (
          <p>Selecciona una solicitud para ver los detalles.</p>
        )}
      </div>
    </div>
  );
};

const SolidPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna izquierda: Lista de solicitudes */}
        <div className="col-lg-4 col-md-5 mb-3">
          <RequestList
            requests={requests}
            selectedRequest={selectedRequest}
            onSelect={setSelectedRequest}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
          />
        </div>

        {/* Columna derecha: Detalles de la solicitud */}
        <div className="col-lg-8 col-md-7">
          <RequestDetails selectedRequest={selectedRequest} />
        </div>
      </div>
    </div>
  );
};

export default SolidPage;
